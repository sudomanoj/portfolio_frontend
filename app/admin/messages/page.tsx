'use client'

import { useState, useEffect } from 'react'
import { api, ContactMessageRead } from '@/lib/api'
import { MessageSquare, Clock, User, Mail, Search, Loader2, Calendar } from 'lucide-react'

export default function MessagesAdminPage() {
  const [messages, setMessages] = useState<ContactMessageRead[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMessage, setSelectedMessage] = useState<ContactMessageRead | null>(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const data = await api.getMessages()
      setMessages(data)
    } catch (error) {
      console.error('Failed to fetch messages', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredMessages = messages.filter(msg => 
    msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">Messages</h1>
          <p className="text-gray-400">View and manage inquiries from your portfolio visitors.</p>
        </div>
        <div className="relative w-64 md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 outline-none focus:ring-1 focus:ring-accent transition-all"
          />
        </div>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar List */}
        <div className="lg:col-span-1 bg-card/30 border border-white/5 rounded-3xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-white/5 bg-white/5 text-xs font-bold text-gray-400 uppercase tracking-widest">
            Inbox ({filteredMessages.length})
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-white/5 scrollbar-thin scrollbar-thumb-border">
            {isLoading ? (
              <div className="p-10 text-center text-gray-500"><Loader2 className="animate-spin mx-auto mb-2" /> Loading...</div>
            ) : filteredMessages.length > 0 ? (
              filteredMessages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => setSelectedMessage(msg)}
                  className={`w-full text-left p-6 transition-all group ${selectedMessage?.id === msg.id ? 'bg-accent/10' : 'hover:bg-white/5'}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className={`font-bold ${selectedMessage?.id === msg.id ? 'text-accent' : 'text-gray-200'}`}>
                      {msg.name}
                    </span>
                    <span className="text-[10px] text-gray-600 flex items-center gap-1">
                      <Clock size={10} /> {new Date(msg.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400 font-medium truncate mb-1">{msg.subject}</div>
                  <p className="text-xs text-gray-600 line-clamp-1">{msg.message}</p>
                </button>
              ))
            ) : (
              <div className="p-10 text-center text-gray-500">No messages found.</div>
            )}
          </div>
        </div>

        {/* Message Content */}
        <div className="lg:col-span-2 bg-card/30 border border-white/5 rounded-3xl flex flex-col overflow-hidden">
          {selectedMessage ? (
            <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
              {/* Header */}
              <div className="p-8 border-b border-white/5 space-y-4">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold text-gray-100">{selectedMessage.subject}</h2>
                  <div className="flex items-center gap-2 text-sm text-gray-500 bg-white/5 px-3 py-1.5 rounded-full">
                    <Calendar size={14} />
                    {new Date(selectedMessage.timestamp).toLocaleString()}
                  </div>
                </div>
                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <User size={16} className="text-accent" />
                    <span className="text-gray-200 font-medium">{selectedMessage.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Mail size={16} className="text-accent" />
                    <a href={`mailto:${selectedMessage.email}`} className="hover:text-accent transition-colors underline decoration-accent/30">{selectedMessage.email}</a>
                  </div>
                </div>
              </div>
              
              {/* Body */}
              <div className="flex-1 p-8 overflow-y-auto">
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>

              {/* Footer */}
              <div className="p-8 border-t border-white/5 flex gap-4">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                  className="bg-accent text-accent-foreground px-8 py-3 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Mail size={18} /> Reply via Email
                </a>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-600 space-y-4 p-12 text-center">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-gray-700 mb-2">
                <MessageSquare size={40} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-400">Select a message</h3>
                <p className="max-w-xs text-sm mt-1">Choose a message from the sidebar to read the full content and reply.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
