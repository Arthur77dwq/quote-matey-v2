'use client';

import { SubscriptionStatus } from '@prisma/client';
import { Bot, Check, Copy, Loader2, Plus, Send, User } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import {
  ChangeEvent,
  ReactNode,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';

import { Icon } from '@/components/icon';
import { Badge } from '@/components/ui/badge';
import ImagePreview from '@/components/ui/images-preview-grid';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UsageLimitNotification from '@/components/ui/usage-limit-notification';
import { useAuth } from '@/context/AuthContext';
import { usePage } from '@/context/PageContext';
import { Api } from '@/lib/api';
import { cn } from '@/lib/utils';
import { compressImage } from '@/lib/utils/compress-image';
import { fileToBase64 } from '@/lib/utils/image-to-base64';
import { Message, Part } from '@/types/chat';
import { PreviewFile } from '@/types/global';

import { changeChatTitle } from '../actions/chatPage';

export function NoHistory({
  className,
  promptSetter,
  promptSuggestion,
}: {
  className?: string;
  promptSetter: (x: string) => void;
  promptSuggestion: { suggest: string; fullPrompt: string }[];
}) {
  return (
    <div
      className={cn(
        'flex flex-col justify-center items-center gap-5 w-full max-w-90',
        className,
      )}
    >
      <div className="flex flex-col justify-center items-center gap-2">
        <span className="size-20 bg-neutral-500/10 rounded-full flex items-center justify-center">
          <Icon
            name="MessageSquareMore"
            className="text-neutral-500/60 size-8"
          />
        </span>
        <h1 className="text-xl font-semibold text-center text-muted-foreground">
          No chat history yet
        </h1>
        <p className="text-center w-59 text-wrap text-xs text-neutral-500/50 font-semibold">
          Start a conversation with QuoteMatey to get your quote, ask questions
          or make changes to your job details.
        </p>
      </div>
      <div className="w-full flex bg-neutral-200/40 border border-neutral-500/10 rounded-md px-3 py-4 gap-4 text-neutral-500/85">
        <Icon name="Sparkle" className="size-4" />
        <div className="flex flex-col justify-center gap-2 font-semibold text-xs">
          <span>Try asking something like:</span>
          {promptSuggestion.map((each, i) => (
            <button
              onClick={() => promptSetter(each.fullPrompt)}
              key={i}
              className="hover:bg-neutral-500/5 cursor-pointer w-fit rounded-full flex items-center bg-white border-2 border-neutral-400/40 px-2 py-1"
            >
              {each.suggest}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChatContent() {
  const searchParams = useSearchParams();
  const initialMessage = searchParams.get('message') || '';
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const hasInitializedRef = useRef(false);
  const isLoadingRef = useRef(false);
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const [suggestion] = useState([
    {
      suggest: 'create a quote for a bathroom renovation',
      fullPrompt:
        'create a quote for a bathroom renovation. Provide dimension of bathroom, and what needs to be done and how.',
    },
    {
      suggest: 'What materials do i need for this job?',
      fullPrompt: 'What materials do i need for this job? Explain job clearly.',
    },
    {
      suggest: 'Update the job details',
      fullPrompt: 'Update the job details. Provide details here:',
    },
  ]);
  const { user } = useAuth();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const compressedFiles = await Promise.all(
      acceptedFiles.map(async (file) => {
        const compressed = await compressImage(file);

        return Object.assign(compressed, {
          preview: URL.createObjectURL(compressed),
          base64: await fileToBase64(compressed),
        });
      }),
    );
    setFiles((prev) => [...prev, ...compressedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
    accept: {
      'image/*': [],
    },
    multiple: true,
  });

  const handleRemoveFile = (i: number) => {
    setFiles((prev) => prev.filter((_, index) => index !== i));
  };

  const prepareParts = (
    images: PreviewFile[] | null,
    videos: PreviewFile[] | null,
    text: string | null,
  ) => {
    const parts: Part[] = [];

    if (text) parts.push({ text: text });
    if (images !== null && images.length > 0)
      parts.push(
        ...images.map((image) => ({
          inlineData: {
            mimeType: 'image/jpeg',
            data: image.base64,
          },
        })),
      );

    // VIDEO NOT SUPPORTED YET
    if (videos !== null && videos.length > 0)
      parts.push(
        ...videos.map((video) => ({
          inlineData: {
            mimeType: 'video/mp4',
            data: video.base64,
          },
        })),
      );

    return parts;
  };

  // TODO: Refactor below function to reduce its cognitive complexity
  const handleSendMessage = async (text: string) => {
    // TODO: Implement notification handler in chat
    const trimmedText = text.trim() || null;

    // Prevent duplicate calls using ref (survives re-renders)
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;
    setIsLoading(true);

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      parts: prepareParts(files, null, trimmedText),
    };

    // Build messages array directly instead of relying on state update
    const currentMessages = [...messages, userMessage];

    // Update state
    setMessages(currentMessages);
    setFiles([]);
    try {
      const response = await Api('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: currentMessages,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      if (!response.body) {
        throw new Error('No response body');
      }

      const assistantId = (Date.now() + 1).toString();

      if (response.status === 200) {
        setMessages((prev) => [
          ...prev,
          {
            id: assistantId,
            role: 'assistant',
            parts: [
              {
                text: '',
              },
            ],
          },
        ]);

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        let buffer = '';
        let accumulatedText = '';

        while (true) {
          const { done, value } = await reader.read();

          if (done) break;

          buffer += decoder.decode(value, {
            stream: true,
          });

          const lines = buffer.split('\n');

          buffer = lines.pop() ?? '';

          for (const line of lines) {
            if (!line.trim()) continue;

            const data = JSON.parse(line);
            if (data) accumulatedText += data.parts[0].text;

            if (accumulatedText)
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === assistantId
                    ? {
                        ...msg,
                        parts: [
                          {
                            text: accumulatedText,
                          },
                        ],
                      }
                    : msg,
                ),
              );
          }
        }
      }
    } catch (error) {
      let errorMessage: Message | null = null;
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          errorMessage = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            parts: [
              {
                text: 'Network error. Please check your connection and try again.',
              },
            ],
          };
        } else {
          errorMessage = {
            id: (Date.now() + 1).toString(),
            ...JSON.parse(error.message),
          };
        }
      }

      if (errorMessage !== null) setMessages((prev) => [...prev, errorMessage]);
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
    }
  };

  // Auto-send initial message from landing page (only once)
  useEffect(() => {
    if (initialMessage && !hasInitializedRef.current) {
      hasInitializedRef.current = true;
      handleSendMessage(initialMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input after response
  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      files.length === 0 &&
      (!input.trim() || isLoading || isLoadingRef.current)
    ) {
      return;
    }

    const messageToSend = input;
    setInput('');
    if (inputRef.current) inputRef.current.style.height = 'auto';
    handleSendMessage(messageToSend);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const copyToClipboard = async (text: string, messageId: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(messageId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  useEffect(() => {
    if (user?.subscription?.[0]?.status === SubscriptionStatus.PAST_DUE) {
      toast.warning(
        'Your subscription is past due. Please update your payment information.',
        {
          id: 'subscription-past-due',
          duration: Infinity,
          closeButton: true,
        },
      );
    }
  }, [user?.subscription]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="bg-linear-to-br from-slate-50 via-white to-orange-50/30 w-full h-full flex flex-col justify-center">
        {isDragActive && (
          <div className="text-white fixed inset-0 bg-black/50 z-50 flex items-center justify-center  pointer-events-none ">
            <div className="flex flex-col justify-center items-center">
              <p className="text-lg font-medium">Drop here</p>
            </div>
          </div>
        )}
        <div
          {...getRootProps()}
          // className={'flex flex-col items-center justify-center h-full w-full'}
        >
          <input
            {...getInputProps({
              accept: 'image/*',
              capture: 'environment',
            })}
          />
        </div>
        <div className="flex flex-col items-center gap-5 h-full w-full">
          {/* Chat Container */}
          {messages?.length > 0 ? (
            // {/* Messages Area */}
            <div className="w-full h-full overflow-y-auto px-4 sm:px-6 pt-20 pb-40">
              <div className="space-y-6">
                {messages.map((message) => {
                  const isUser = message.role === 'user';

                  return (
                    <div
                      key={message.id}
                      className={`flex gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className="flex flex-row items-end gap-1.5 max-w-2/3">
                        {!isUser && (
                          <div className="shrink-0 w-10 h-10 rounded-xl bg-linear-to-br from-[#0a1628] to-[#1a3a5c] flex items-center justify-center shadow-lg">
                            <Bot className="w-5 h-5 text-white" />
                          </div>
                        )}
                        <div className="flex flex-col-reverse gap-1 items-end">
                          {message?.notification ? (
                            <UsageLimitNotification
                              variant="compact"
                              info={message.notification.info_text}
                              link_text={message.notification.link_text}
                              href="/pricing"
                            />
                          ) : (
                            message?.parts?.map((part: Part, i: number) => {
                              if ('inlineData' in part) {
                                if (part.inlineData.mimeType === 'image/jpeg') {
                                  return (
                                    <img
                                      key={`${i}${message.id}img`}
                                      src={`data:image/jpeg;base64,${part.inlineData.data}`}
                                      className="rounded-2xl size-30 object-cover"
                                    />
                                  );
                                } else {
                                  return (
                                    <video
                                      className="rounded-2xl size-30"
                                      key={`${i}${message.id}`}
                                    >
                                      <source
                                        src={part.inlineData.data}
                                        type="video/mp4"
                                      />
                                    </video>
                                  );
                                }
                              }

                              if ('text' in part)
                                return (
                                  <div
                                    key={`${i}${message.id}`}
                                    className={`relative rounded-2xl px-5 py-2 min-h-10 flex justify-center items-center ${
                                      isUser
                                        ? 'bg-[#0a1628] text-white'
                                        : 'bg-white border border-border/80 shadow-lg'
                                    }`}
                                  >
                                    <div
                                      className={`whitespace-pre-wrap leading-relaxed ${isUser ? 'text-white' : 'text-foreground'}`}
                                    >
                                      {part?.text}
                                    </div>

                                    {/* Copy button for assistant messages */}
                                    {!isUser && part.text && (
                                      <button
                                        onClick={() =>
                                          copyToClipboard(
                                            part.text,
                                            message?.id || '',
                                          )
                                        }
                                        className="absolute -bottom-8 left-0 flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-full text-xs font-medium text-muted-foreground hover:text-foreground hover:border-[#0a1628]/20 transition-all shadow-sm"
                                      >
                                        {copiedId === message.id ? (
                                          <>
                                            <Check className="w-3.5 h-3.5 text-green-500" />
                                            Copied!
                                          </>
                                        ) : (
                                          <>
                                            <Copy className="w-3.5 h-3.5" />
                                            Copy Quote
                                          </>
                                        )}
                                      </button>
                                    )}
                                  </div>
                                );
                            })
                          )}
                        </div>

                        {isUser && (
                          <div className="shrink-0 w-10 h-10 rounded-xl bg-[#f57a0a] flex items-center justify-center shadow-lg">
                            <User className="w-5 h-5 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex gap-4 justify-start">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-linear-to-br from-[#0a1628] to-[#1a3a5c] flex items-center justify-center shadow-lg">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-white border border-border/80 shadow-lg rounded-2xl px-5 py-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">
                          Crunching the numbers...
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>
          ) : null}

          {messages?.length <= 0 && (
            <NoHistory
              className="justify-self-start"
              promptSetter={setInput}
              promptSuggestion={suggestion}
            />
          )}

          {/* Fixed Input Area */}
          <form
            onSubmit={handleSubmit}
            className="w-full h-fit px-5 flex flex-col items-center justify-center gap-3"
          >
            <p className="text-center text-xs font-semibold text-neutral-500/40 w-full">
              AI can mistakes. Always review before sending to customers.
            </p>
            {/* Preview Grid */}
            <div className="w-full flex flex-col p-2 gap-3 bg-neutral-200/10 border border-neutral-500/40 rounded-xl shadow-lg">
              <ImagePreview files={files} removeFile={handleRemoveFile} />
              <div className="flex items-end gap-3 w-full">
                <button
                  onClick={open}
                  disabled={isLoading}
                  className="cursor-pointer shrink-0 size-12 rounded-full text-black flex items-center justify-center hover:opacity-90 transition-all"
                >
                  <Plus />
                </button>
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Describe the job... (e.g., 'Leaking tap, need new fitting')"
                  rows={1}
                  disabled={isLoading}
                  className=" w-full flex-1 resize-none bg-transparent px-4 py-3 text-foreground placeholder:overflow-hidden placeholder:whitespace-nowrap placeholder:text-muted-foreground focus:outline-none min-h-12 max-h-32"
                  style={{ height: 'auto' }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = `${Math.min(target.scrollHeight, 128)}px`;
                  }}
                />
                <button
                  type="submit"
                  disabled={(!input.trim() && files.length === 0) || isLoading}
                  className="shrink-0 w-12 h-12 rounded-xl bg-linear-to-r from-[#0a1628] to-[#1a3a5c] text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all shadow-lg"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export function AttachementView() {
  return <></>;
}

export function JobDescription() {
  return <></>;
}

const ComponentRender = ({ name }: { name: string }) => {
  const componentMap: Record<string, () => ReactNode> = {
    ChatContent,
    AttachementView,
    JobDescription,
  };
  const Component = componentMap[name];
  return <Component />;
};

export function ChatHeader({
  jobDetails,
  className,
}: {
  className?: string;
  jobDetails: {
    jobId: string | null;
    status?: 'Draft' | 'Sent' | 'Approved' | 'Accepted';
  };
}) {
  return (
    <div
      className={cn(
        'w-full h-13 pl-5 flex items-center bg-white border-b border-neutral-500/20',
        className,
      )}
    >
      <div className="w-fit h-full flex items-center justify-center gap-3">
        <span className="text-xs font-semibold text-neutral-700 flex items-center gap-2">
          <span>Job ID: </span>
          {jobDetails.jobId ? (
            <span>{jobDetails.jobId}</span>
          ) : (
            <Badge
              variant="secondary"
              className="rounded-full bg-neutral-200/40 shadow-xs font-semibold"
            >
              No job selected
            </Badge>
          )}
        </span>
        <Badge
          variant="secondary"
          className="rounded-full bg-[#62AC6F]/10 shadow-xs font-semibold text-[#62AC6F] text-xs"
        >
          Draft
        </Badge>
        <Separator
          orientation="vertical"
          className="bg-neutral-500/20 h-2/3!"
        />
        <span className="w-fit flex text-xs font-semibold text-neutral-500/80 gap-2">
          <Icon name="CircleCheck" className="text-[#62AC6F] size-4.5" />
          <span>Autosaved 2 sec ago</span>
        </span>
      </div>
    </div>
  );
}

export function ChatDescription({
  className,
  jobId,
}: {
  className?: string;
  jobId: string | null;
}) {
  const [title, setTitle] = useState<string>('Bathroom renovation');
  const [editable, setEditable] = useState(false);
  const toggleEdit = () => setEditable((prev) => !prev);
  const changeHandler = (
    event: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => setTitle(event.currentTarget.value);

  return (
    <div
      className={cn(
        'w-full h-15 pl-5 flex flex-col justify-center bg-white border-b border-neutral-500/20',
        className,
      )}
    >
      <p className="text-sm font-semibold flex items-center gap-2">
        {editable ? (
          <form
            action={changeChatTitle}
            onSubmit={() => toggleEdit()}
            className="flex gap-2"
          >
            <input
              name="jobId"
              type="hiddden"
              value={jobId ? jobId : ''}
              className="hidden"
            />
            <Input
              name="title"
              type="text"
              value={title}
              onChange={changeHandler}
              className="max-w-50 border border-neutral-500/30"
            />
            <button
              type="submit"
              className="cursor-pointer px-5 rounded-md border border-neutral-500/30 bg-neutral-200/50"
            >
              <Icon
                name="Check"
                className="size-3 text-neutral-500"
                strokeWidth={3}
              />
            </button>
          </form>
        ) : (
          <span className="max-w-50 text-nowrap overflow-hidden text-ellipsis">
            {title}
          </span>
        )}

        {!editable && (
          <button onClick={toggleEdit} className="cursor-pointer">
            <Icon
              name="PencilLine"
              className="size-3 text-neutral-500/90"
              strokeWidth={3}
            />
          </button>
        )}
      </p>
      <p className="text-[0.65rem] font-bold text-neutral-500/60">
        Created today at 10:24 AM
      </p>
    </div>
  );
}

export function ChatNavigation({
  className,
  link,
}: {
  className?: string;
  link: {
    id: string;
    active: boolean;
    name: string;
    value: string;
    linkTo: string;
  }[];
}) {
  return (
    <div className={cn('max-w-fit h-15 flex gap-2', className)}>
      {link.map((each, i) => (
        <TabsTrigger
          key={i}
          value={each.value}
          className="cursor-pointer h-full min-w-fit flex items-center justify-center px-2 data-[state=active]:font-semibold border-b-3 data-[state=active]:shadow-none data-[state=active]:text-[#FF814C] data-[state=active]:border-b-[#FF814C] rounded-none hover:text-[#FF814C] transition-all ease-linear"
        >
          {each.name}
        </TabsTrigger>
      ))}
    </div>
  );
}

const CustomSideBarTrigger = ({ className }: { className?: string }) => {
  const sidebar = useSidebar();
  return (
    <div
      className={cn(
        'px-1 flex items-center justify-center',
        sidebar.open ? ' bg-neutral-300/10 h-full' : 'h-fit',
        className,
      )}
    >
      <SidebarTrigger
        className={cn(
          'rounded-full w-fit py-6 px-px bg-white shadow-sm cursor-pointer',
          // !sidebar.open &&
          'border border-neutral-500/20',
        )}
      >
        <Icon
          name="ChevronLeft"
          className="text-neutral-500"
          strokeWidth={2.5}
        />
      </SidebarTrigger>
    </div>
  );
};

export default function ChatPage() {
  const { setPageInfo } = usePage();
  const [DATA] = useState({
    header: {
      content: {
        active: true,
        title: { active: true, content: 'Chat' },
        description: {
          active: true,
          content: 'Describe the job, get the quote',
        },
      },
    },
    navigation: {
      link: [
        {
          id: '0',
          active: true,
          name: 'Chat',
          value: 'chat',
          linkTo: 'ChatContent',
        },
        {
          id: '1',
          active: true,
          name: 'Files',
          value: 'files',
          linkTo: 'AttachementView',
        },
        {
          id: '2',
          active: true,
          name: 'Job Description',
          value: 'jobdesc',
          linkTo: 'JobDescription',
        },
      ],
    },
    jobDetails: {
      jobId: null,
    },
  });

  useEffect(() => {
    setPageInfo(DATA.header);
  }, [setPageInfo, DATA]);

  return (
    <Suspense
      fallback={
        <div className="min-h-full bg-linear-to-br from-slate-50 via-white to-orange-50/30 flex items-center justify-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Loading chat...</span>
          </div>
        </div>
      }
    >
      <SidebarProvider
        defaultOpen={false}
        style={
          {
            '--sidebar-width': '40rem',
            // '--sidebar-width-mobile': '20rem',
          } as React.CSSProperties
        }
      >
        <div className="w-full h-full flex flex-col items-center">
          <ChatHeader {...{ jobDetails: DATA.jobDetails }} />

          <div className="h-full w-full flex items-center">
            <div className="h-full w-full">
              <ChatDescription jobId={DATA.jobDetails.jobId} />
              <Tabs defaultValue="chat" className="w-full h-full">
                <TabsList
                  variant="line"
                  className="w-full h-10 px-5 flex flex-col items-start bg-white border-b border-neutral-500/20 rounded-none"
                >
                  <ChatNavigation link={DATA.navigation.link} />
                </TabsList>
                {DATA.navigation.link.map((each, i) => (
                  <TabsContent
                    key={i}
                    value={each.value}
                    // className="h-full w-full flex items-center justify-center"
                  >
                    <ComponentRender name={each.linkTo} />
                  </TabsContent>
                ))}
              </Tabs>
            </div>
            <CustomSideBarTrigger />
            <Sidebar side="right" className="border-none">
              <SidebarHeader />
              <SidebarContent>
                <SidebarGroup />
                <SidebarGroup />
              </SidebarContent>
              <SidebarFooter />
            </Sidebar>
          </div>
        </div>
      </SidebarProvider>
    </Suspense>
  );
}
