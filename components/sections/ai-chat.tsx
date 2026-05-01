'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageSquare, Send, X, Bot, User, Loader2 } from 'lucide-react'
import { api } from '@/lib/api'

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: 'bot' | 'user'; content: string }[]>([
    { role: 'bot', content: "Hi! I'm your AI assistant. Ask me anything about my projects, skills, or experience!" }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    // Add an empty bot message that we will populate with the stream
    setMessages(prev => [...prev, { role: 'bot', content: '' }])

    try {
      const reader = await api.chatWithAIStream(userMessage)
      const decoder = new TextDecoder()
      let done = false

      while (!done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading
        const chunkValue = decoder.decode(value)
        
        setMessages(prev => {
          const newMessages = [...prev]
          const lastMessage = newMessages[newMessages.length - 1]
          if (lastMessage && lastMessage.role === 'bot') {
            lastMessage.content += chunkValue
          }
          return newMessages
        })
      }
    } catch (error) {
      console.error('Streaming error:', error)
      setMessages(prev => {
        const newMessages = [...prev]
        const lastMessage = newMessages[newMessages.length - 1]
        if (lastMessage && lastMessage.role === 'bot' && lastMessage.content === '') {
          lastMessage.content = "I'm sorry, I'm having trouble connecting to my brain right now. Please try again later!"
        }
        return newMessages
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-accent text-accent-foreground rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 animate-bounce-slow cursor-pointer"
        >
          <MessageSquare size={28} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[500px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in slide-in-from-bottom-10 duration-300">
          {/* Header */}
          <div className="p-4 bg-accent text-accent-foreground flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot size={24} />
              <span className="font-bold text-lg">AI Assistant</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="hover:rotate-90 transition-transform duration-300 cursor-pointer"
            >
              <X size={24} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-border">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl flex gap-2 ${
                  msg.role === 'user' 
                    ? 'bg-accent text-accent-foreground rounded-tr-none' 
                    : 'bg-muted text-foreground rounded-tl-none'
                }`}>
                  {msg.role === 'bot' && <Bot size={18} className="shrink-0 mt-1" />}
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  {msg.role === 'user' && <User size={18} className="shrink-0 mt-1" />}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                  <Loader2 size={18} className="animate-spin text-accent" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me something..."
                className="w-full pl-4 pr-12 py-3 bg-muted border-none rounded-xl text-sm focus:ring-1 focus:ring-accent transition-all"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-accent hover:scale-110 disabled:opacity-50 transition-transform cursor-pointer"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
