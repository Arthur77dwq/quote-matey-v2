'use client';

import { Bot, Check, Copy, Loader2, Plus, Send, User } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { twMerge } from 'tailwind-merge';

import { ChatNavbar } from '@/components/chat-navbar';
import ImagePreview from '@/components/ui/images-preview-grid';
import UsageLimitNotification from '@/components/ui/usage-limit-notification';
import { Api } from '@/lib/api';
import { compressImage } from '@/lib/utils/compress-image';
import { fileToBase64 } from '@/lib/utils/image-to-base64';
import { Message, Part } from '@/types/chat';
import { PreviewFile } from '@/types/global';

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

  const handleSendMessage = async (text: string) => {
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || data?.message || 'Failed to get response',
        );
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        ...data,
        role: 'assistant',
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      let errorContent =
        'Sorry mate, something went wrong. Give it another go!';
      if (error instanceof Error) {
        if (
          error.message.includes('rate limit') ||
          error.message.includes('quota')
        ) {
          errorContent =
            'API rate limit reached. Please wait a moment and try again.';
        } else if (error.message.includes('Failed to fetch')) {
          errorContent =
            'Network error. Please check your connection and try again.';
        } else if (
          error.message.includes('Failed to get response') ||
          error.message.includes('All Gemini API keys failed')
        ) {
          errorContent = 'API error. Please try again in a moment.';
        }
      }
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        parts: [{ text: errorContent }],
      };
      setMessages((prev) => [...prev, errorMessage]);
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

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-orange-50/30 flex flex-col">
      <ChatNavbar />

      {isDragActive && (
        <div className="text-white fixed inset-0 bg-black/50 z-50 flex items-center justify-center  pointer-events-none ">
          <div className="flex flex-col justify-center items-center">
            <p className="text-lg font-medium">Drop images here</p>
          </div>
        </div>
      )}

      <div
        {...getRootProps()}
        className={twMerge(
          'flex flex-col h-screen w-full',
          messages?.length > 0 ? 'justify-start' : 'justify-center',
        )}
      >
        <input
          {...getInputProps({
            accept: 'image/*',
            capture: 'environment',
          })}
        />
        {/* Chat Container */}
        {messages?.length > 0 ? (
          <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full pt-20 lg:pt-24 pb-32">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
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
          </div>
        ) : null}

        {/* Fixed Input Area */}
        <div
          className={twMerge(
            'left-0 right-0 bg-linear-to-t from-white via-white to-white/80 backdrop-blur-xl',
            messages?.length > 0
              ? 'fixed bottom-0 border-t border-border/50'
              : '',
          )}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
            {messages?.length <= 0 ? (
              <h1 className="text-4xl text-center text-muted-foreground mb-16">
                What's the job about?
              </h1>
            ) : null}

            <form onSubmit={handleSubmit}>
              {/* Preview Grid */}
              <div className="flex flex-col p-2 gap-3 bg-white border border-border/80 rounded-2xl shadow-lg">
                <ImagePreview files={files} removeFile={handleRemoveFile} />
                <div className="flex items-end gap-3 w-full">
                  <button
                    onClick={open}
                    disabled={isLoading}
                    className="cursor-pointer shrink-0 w-12 h-12 rounded-full text-black flex items-center justify-center hover:opacity-90 transition-all"
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
                    className="flex-1 resize-none bg-transparent px-4 py-3 text-foreground placeholder:overflow-hidden placeholder:whitespace-nowrap placeholder:text-muted-foreground focus:outline-none min-h-12 max-h-32"
                    style={{ height: 'auto' }}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = 'auto';
                      target.style.height = `${Math.min(target.scrollHeight, 128)}px`;
                    }}
                  />
                  <button
                    type="submit"
                    disabled={
                      (!input.trim() && files.length === 0) || isLoading
                    }
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
              <p className="text-center text-xs text-muted-foreground mt-3">
                QuoteMatey provides rough estimates only. Always review before
                sending to customers.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-orange-50/30 flex items-center justify-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Loading chat...</span>
          </div>
        </div>
      }
    >
      <ChatContent />
    </Suspense>
  );
}
