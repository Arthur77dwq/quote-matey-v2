"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { ChatNavbar } from "@/components/chat-navbar"
import { Send, Sparkles, Loader2, User, Bot, Copy, Check } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

function ChatContent() {
  const searchParams = useSearchParams()
  const initialMessage = searchParams.get("message") || ""
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const hasInitializedRef = useRef(false)
  const isLoadingRef = useRef(false)

  // Auto-send initial message from landing page (only once)
  useEffect(() => {
    if (initialMessage && !hasInitializedRef.current) {
      hasInitializedRef.current = true
      handleSendMessage(initialMessage)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input after response
  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isLoading])

  const handleSendMessage = async (text: string) => {
    console.log("=== handleSendMessage called with:", text)
    const trimmedText = text.trim()
    if (!trimmedText) return
    
    // Prevent duplicate calls using ref (survives re-renders)
    if (isLoadingRef.current) return
    isLoadingRef.current = true
    setIsLoading(true)

    console.log("=== About to call API")

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: trimmedText,
    }

    // Build messages array directly instead of relying on state update
    const currentMessages = [...messages, userMessage]
    
    // Update state
    setMessages(currentMessages)

    try {
      console.log("=== Making fetch call to /api/chat")
      console.log("=== Request body:", JSON.stringify({
        messages: currentMessages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      }, null, 2))
      
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: currentMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      const data = await response.json()
      console.log("Full API Response:", JSON.stringify(data, null, 2))
      console.log("Response status:", response.status)
      console.log("Response ok:", response.ok)

      if (!response.ok) {
        console.error("Response not OK:", response.status, data)
        throw new Error(data?.error || data?.message || "Failed to get response")
      }

      console.log("Setting assistant message:", data.content)
      console.log("Content type:", typeof data.content)
      console.log("Content length:", data.content?.length)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.content,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      console.error("Error details:", {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : 'No stack trace'
      })
      
      let errorContent = "Sorry mate, something went wrong. Give it another go!"
      if (error instanceof Error) {
        if (error.message.includes("rate limit") || error.message.includes("quota")) {
          errorContent = "API rate limit reached. Please wait a moment and try again."
        } else if (error.message.includes("Failed to fetch")) {
          errorContent = "Network error. Please check your connection and try again."
        } else if (error.message.includes("Failed to get response") || error.message.includes("All Gemini API keys failed")) {
          errorContent = "API error. Please try again in a moment."
        }
      }
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: errorContent,
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      isLoadingRef.current = false
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading || isLoadingRef.current) return
    const messageToSend = input
    setInput("")
    handleSendMessage(messageToSend)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const copyToClipboard = async (text: string, messageId: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedId(messageId)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/30 flex flex-col">
      <ChatNavbar />
      
      {/* Chat Container */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full pt-20 lg:pt-24 pb-32">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
          <div className="space-y-6">
            {messages.map((message) => {
              const isUser = message.role === "user"
              
              return (
                <div
                  key={message.id}
                  className={`flex gap-4 ${isUser ? "justify-end" : "justify-start"}`}
                >
                  {!isUser && (
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#0a1628] to-[#1a3a5c] flex items-center justify-center shadow-lg">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}
                  
                  <div
                    className={`relative max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-4 ${
                      isUser
                        ? "bg-[#0a1628] text-white"
                        : "bg-white border border-border/80 shadow-lg"
                    }`}
                  >
                    <div className={`whitespace-pre-wrap leading-relaxed ${isUser ? "text-white" : "text-foreground"}`}>
                      {message.content}
                    </div>
                    
                    {/* Copy button for assistant messages */}
                    {!isUser && message.content && (
                      <button
                        onClick={() => copyToClipboard(message.content, message.id)}
                        className="absolute -bottom-3 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-white border border-border rounded-full text-xs font-medium text-muted-foreground hover:text-foreground hover:border-[#0a1628]/20 transition-all shadow-sm"
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
                  
                  {isUser && (
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#f57a0a] flex items-center justify-center shadow-lg">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              )
            })}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex gap-4 justify-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#0a1628] to-[#1a3a5c] flex items-center justify-center shadow-lg">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white border border-border/80 shadow-lg rounded-2xl px-5 py-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Crunching the numbers...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Fixed Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-white/80 border-t border-border/50 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-end gap-3 bg-white border border-border/80 rounded-2xl shadow-lg p-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder=""
                rows={1}
                disabled={isLoading}
                className="flex-1 resize-none bg-transparent px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none min-h-[48px] max-h-32"
                style={{ height: "auto" }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement
                  target.style.height = "auto"
                  target.style.height = `${Math.min(target.scrollHeight, 128)}px`
                }}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-r from-[#0a1628] to-[#1a3a5c] text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all shadow-lg"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
            <p className="text-center text-xs text-muted-foreground mt-3">
              QuoteMatey provides rough estimates only. Always review before sending to customers.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function ChatPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/30 flex items-center justify-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading chat...</span>
        </div>
      </div>
    }>
      <ChatContent />
    </Suspense>
  )
}
