'use client';

import { SubscriptionStatus } from '@prisma/client';
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

import { ACTIONS } from '@/app/dashboard/actions';
import { DATA } from '@/app/dashboard/chat/data';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UsageLimitNotification from '@/components/ui/usage-limit-notification';
import { useAuth } from '@/context/AuthContext';
import { usePage } from '@/context/PageContext';
import { Chat } from '@/lib/api/chat';
import { cn } from '@/lib/utils';
import { compressImage } from '@/lib/utils/compress-image';
import { fileToBase64 } from '@/lib/utils/image-to-base64';
import { prepareMessage } from '@/lib/utils/message';
import type { Message, Part } from '@/types/chat';
import { HeaderType } from '@/types/dashboard';
import { PreviewFile } from '@/types/global';

import { Icon } from '../icon';
import { Badge } from '../ui/badge';
import ImagePreview from '../ui/images-preview-grid';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import { SidebarTrigger, useSidebar } from '../ui/sidebar';

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

export function InputArea({
  disabled,
  filePicker,
  isLoading,
  input,
  onChange,
}: {
  onChange?: (x: string) => void;
  filePicker: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  input: string;
}) {
  return (
    <div className="flex items-end gap-3 w-full">
      <button
        onClick={filePicker}
        disabled={disabled}
        className="cursor-pointer shrink-0 size-12 rounded-full text-black flex items-center justify-center hover:opacity-90 transition-all"
      >
        <Icon name="Plus" />
      </button>
      <textarea
        name="message"
        placeholder="Describe the job... (e.g., 'Leaking tap, need new fitting')"
        rows={1}
        value={input}
        onChange={(e) => onChange && onChange(e.target.value)}
        disabled={disabled}
        className="w-full flex-1 resize-none bg-transparent px-4 py-3 text-foreground placeholder:overflow-hidden placeholder:whitespace-nowrap placeholder:text-muted-foreground focus:outline-none min-h-12 max-h-32"
        style={{ height: 'auto' }}
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement;
          target.style.height = 'auto';
          target.style.height = `${Math.min(target.scrollHeight, 128)}px`;
        }}
      />
      <button
        type="submit"
        disabled={disabled}
        className="shrink-0 w-12 h-12 rounded-xl bg-linear-to-r from-[#0a1628] to-[#1a3a5c] text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all shadow-lg"
      >
        {isLoading ? (
          <Icon name="Loader2" className="w-5 h-5 animate-spin" />
        ) : (
          <Icon name="Send" className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}

export function ChatInput({
  input,
  onChange,
  onSubmit,
  files,
  removeFileHandler,
  disabled,
  filePicker,
  isLoading,
}: {
  onChange?: (x: string) => void;
  input: string;
  onSubmit: (data: FormData) => void;
  files: PreviewFile[];
  removeFileHandler: (i: number) => void;
  filePicker: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}) {
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    onSubmit(data);
  };
  return (
    <form
      onSubmit={submitHandler}
      className="w-full h-fit px-5 flex flex-col items-center justify-center gap-3"
    >
      <p className="text-center text-xs font-semibold text-neutral-500/40 w-full">
        AI can mistakes. Always review before sending to customers.
      </p>

      <div className="w-full flex flex-col p-2 gap-3 bg-neutral-200/10 border border-neutral-500/40 rounded-xl shadow-lg">
        {/* Preview Grid */}
        <ImagePreview files={files} removeFile={removeFileHandler} />

        <InputArea
          onChange={onChange}
          filePicker={filePicker}
          disabled={disabled}
          isLoading={isLoading}
          input={input}
        />
      </div>
    </form>
  );
}

export function Message({
  message,
  isLoading,
}: {
  message: Message[];
  isLoading: boolean;
}) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const copyToClipboard = async (text: string, messageId: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(messageId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  if (message.length <= 0) return null;

  return (
    <div className="w-full h-full overflow-y-auto scrollbar-none px-4 sm:px-6 pt-20 pb-40">
      <div className="space-y-6">
        {message.map((message) => {
          const isUser = message.role === 'user';

          return (
            <div
              key={message.id}
              className={`flex gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex flex-row items-end gap-1.5 max-w-2/3">
                {!isUser && (
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-linear-to-br from-[#0a1628] to-[#1a3a5c] flex items-center justify-center shadow-lg">
                    <Icon name="Bot" className="w-5 h-5 text-white" />
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
                                  copyToClipboard(part.text, message?.id || '')
                                }
                                className="absolute -bottom-8 left-0 flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-full text-xs font-medium text-muted-foreground hover:text-foreground hover:border-[#0a1628]/20 transition-all shadow-sm"
                              >
                                {copiedId === message.id ? (
                                  <>
                                    <Icon
                                      name="Check"
                                      className="w-3.5 h-3.5 text-green-500"
                                    />
                                    Copied!
                                  </>
                                ) : (
                                  <>
                                    <Icon name="Copy" className="w-3.5 h-3.5" />
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
                    <Icon name="User" className="w-5 h-5 text-white" />
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
              <Icon name="Bot" className="w-5 h-5 text-white" />
            </div>
            <div className="bg-white border border-border/80 shadow-lg rounded-2xl px-5 py-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon name="Loader2" className="w-4 h-4 animate-spin" />
                <span className="text-sm">Crunching the numbers...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

export function ChatContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null);
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

  const onFileRemove = (i: number) => {
    setFiles((prev) => prev.filter((_, index) => index !== i));
  };

  // Focus input after response
  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  const onSubmit = (data: FormData) => {
    setInput('');

    const preparedMessage = prepareMessage({
      text: data.get('message') as string,
      files: files as PreviewFile[],
    });

    setIsLoading(true);

    setMessages((prev) => [...prev, preparedMessage]);
    Chat({ messages: preparedMessage }).then((response) => {
      setMessages((prev) => [...prev, response]);
      setIsLoading(false);
    });
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
        <div
          {...getRootProps()}
          className={'flex flex-col items-center justify-center h-full w-full'}
        >
          {isDragActive && (
            <div className="text-white fixed inset-0 bg-black/50 z-50 flex items-center justify-center pointer-events-none">
              <p className="text-lg font-medium">Drop here</p>
            </div>
          )}

          <input
            {...getInputProps({
              accept: 'image/*',
              capture: 'environment',
            })}
          />

          <div className="flex flex-col items-center gap-5 h-full w-full">
            <Message message={messages} isLoading={isLoading} />

            <div
              className={cn(
                'w-full flex flex-col items-center justify-between py-5',
                messages?.length <= 0 ? 'h-full' : 'h-fit',
              )}
            >
              {messages?.length <= 0 && (
                <NoHistory
                  className="justify-self-start"
                  promptSetter={setInput}
                  promptSuggestion={suggestion}
                />
              )}

              {/* Fixed Input Area */}
              <ChatInput
                {...{
                  input,
                  onSubmit,
                  isLoading,
                  filePicker: open,
                  files,
                  removeFileHandler: onFileRemove,
                  onChange: setInput,
                }}
              />
            </div>
          </div>
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

export const ComponentRender = ({ name }: { name: string }) => {
  const componentMap: Record<string, () => ReactNode> = {
    ChatContent,
    AttachementView,
    JobDescription,
  };
  const Component = componentMap[name];
  return <Component />;
};

export function ChatHeader({ className }: { className?: string }) {
  const { pageInfo } = usePage();
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
          {pageInfo?.jobDetails.jobId ? (
            <span>{pageInfo?.jobDetails.jobId}</span>
          ) : (
            <Badge
              variant="secondary"
              className="rounded-full bg-neutral-200/40 shadow-xs font-semibold"
            >
              No job selected
            </Badge>
          )}
        </span>
        {pageInfo?.jobDetails.status === 'Draft' && (
          <Badge
            variant="secondary"
            className="rounded-full bg-[#62AC6F]/10 shadow-xs font-semibold text-[#62AC6F] text-xs"
          >
            {pageInfo?.jobDetails.status}
          </Badge>
        )}
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

export function ChatDescription({ className }: { className?: string }) {
  const [title, setTitle] = useState<string>('Bathroom renovation');
  const [editable, setEditable] = useState(false);
  const toggleEdit = () => setEditable((prev) => !prev);
  const changeHandler = (
    event: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => setTitle(event.currentTarget.value);

  const { pageInfo } = usePage();

  return (
    pageInfo?.jobDetails?.jobId && (
      <div
        className={cn(
          'w-full h-15 pl-5 flex flex-col justify-center bg-white border-b border-neutral-500/20',
          className,
        )}
      >
        <p className="text-sm font-semibold flex items-center gap-2">
          {editable ? (
            <form
              action={ACTIONS['changeChatTitle']}
              onSubmit={() => toggleEdit()}
              className="flex gap-2 h-full"
            >
              <input
                name="jobId"
                type="hiddden"
                value={pageInfo?.jobDetails?.jobId}
                className="hidden"
              />
              <Input
                name="title"
                type="text"
                value={title}
                onChange={changeHandler}
                className="max-w-50 h-full border border-neutral-500/30"
              />
              <div className="w-fit flex items-center justify-center">
                <button
                  type="submit"
                  className="flex items-center justify-center cursor-pointer h-full aspect-square rounded-l-md border border-neutral-500/30 bg-neutral-200/50 border-r-0"
                >
                  <Icon
                    name="Check"
                    className="size-3 text-neutral-500"
                    strokeWidth={3}
                  />
                </button>
                <button
                  onClick={toggleEdit}
                  className="flex items-center justify-center cursor-pointer h-full aspect-square rounded-r-md border border-neutral-500/30 bg-red-500/50 border-l-0"
                >
                  <Icon
                    name="X"
                    className="size-3 text-neutral-500/90"
                    strokeWidth={3}
                  />
                </button>
              </div>
            </form>
          ) : (
            <span className="max-w-50 h-full text-nowrap overflow-hidden text-ellipsis">
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
    )
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

export function CustomSideBarTrigger({ className }: { className?: string }) {
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
}

export function ChatUI({ data }: { data: typeof DATA }) {
  const { pageInfo } = usePage();
  return (
    <Tabs
      defaultValue="chat"
      className="w-full h-full flex items-center justify-center"
    >
      {pageInfo?.jobDetails.jobId && (
        <TabsList
          variant="line"
          className="w-full h-10 px-5 flex flex-col items-start bg-white border-b border-neutral-500/20 rounded-none"
        >
          <ChatNavigation link={data.navigation.link} />
        </TabsList>
      )}
      {data.navigation.link.map((each, i) => (
        <TabsContent key={i} value={each.value} className="h-full w-full">
          <ComponentRender name={each.linkTo} />
        </TabsContent>
      ))}
    </Tabs>
  );
}

export function ChatPage({
  data,
  jobId,
}: {
  data: typeof DATA;
  jobId?: string;
}) {
  const { setPageInfo } = usePage();

  useEffect(() => {
    let newData: HeaderType = {
      ...data.header,
      jobDetails: {
        jobId: null,
      },
    };

    if (jobId) {
      newData = { ...newData, ...{ jobDetails: { jobId } } };
    }

    setPageInfo(newData);
  }, [data, jobId, setPageInfo]);

  return (
    <Suspense
      fallback={
        <div className="min-h-full bg-linear-to-br from-slate-50 via-white to-orange-50/30 flex items-center justify-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon name="Loader2" className="w-5 h-5 animate-spin" />
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
        className="min-h-full w-full flex justify-center"
      >
        <div className="w-full h-full flex flex-col items-center">
          {jobId && <ChatHeader />}

          <div className="h-full w-full flex items-center">
            <div className="h-full w-full flex flex-col items-center">
              {jobId && <ChatDescription />}
              <ChatUI data={data} />
            </div>
            {jobId && (
              <>
                <CustomSideBarTrigger />
                <Sidebar side="right" className="border-none">
                  <SidebarHeader />
                  <SidebarContent>
                    <SidebarGroup />
                    <SidebarGroup />
                  </SidebarContent>
                  <SidebarFooter />
                </Sidebar>
              </>
            )}
          </div>
        </div>
      </SidebarProvider>
    </Suspense>
  );
}
