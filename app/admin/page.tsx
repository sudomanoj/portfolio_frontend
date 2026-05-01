'use client'

import { useState, useEffect } from 'react'
import { api, Project, SkillCategory, ContactMessageRead } from '@/lib/api'
import { Briefcase, Cpu, MessageSquare, Share2, TrendingUp, Clock } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    messages: 0,
    socials: 0
  })
  const [recentMessages, setRecentMessages] = useState<ContactMessageRead[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [p, s, m, sm] = await Promise.all([
          api.getProjects(),
          api.getSkills(),
          api.getMessages(),
          api.getSocialMedia()
        ])
        setStats({
          projects: p.length,
          skills: s.length,
          messages: m.length,
          socials: sm.length
        })
        setRecentMessages(m.slice(0, 5))
      } catch (error) {
        console.error('Failed to fetch dashboard data', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchStats()
  }, [])

  const statCards = [
    { name: 'Total Projects', value: stats.projects, icon: Briefcase, color: 'text-blue-400', href: '/admin/projects' },
    { name: 'Skill Categories', value: stats.skills, icon: Cpu, color: 'text-purple-400', href: '/admin/skills' },
    { name: 'Dynamic Links', value: stats.socials, icon: Share2, color: 'text-green-400', href: '/admin/socials' },
    { name: 'New Messages', value: stats.messages, icon: MessageSquare, color: 'text-orange-400', href: '/admin/messages' },
  ]

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome back. Here's an overview of your portfolio performance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <Link key={card.name} href={card.href}>
              <div className="bg-card/30 backdrop-blur-md border border-white/5 p-6 rounded-3xl hover:border-white/20 transition-all group cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl bg-white/5 ${card.color}`}>
                    <Icon size={24} />
                  </div>
                  <TrendingUp size={18} className="text-gray-600 group-hover:text-accent transition-colors" />
                </div>
                <div className="text-3xl font-bold mb-1">{isLoading ? '...' : card.value}</div>
                <div className="text-sm text-gray-500">{card.name}</div>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Messages */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recent Messages</h2>
            <Link href="/admin/messages" className="text-accent text-sm hover:underline">View all</Link>
          </div>
          
          <div className="bg-card/30 border border-white/5 rounded-3xl overflow-hidden divide-y divide-white/5">
            {isLoading ? (
              <div className="p-10 text-center text-gray-500">Loading messages...</div>
            ) : recentMessages.length > 0 ? (
              recentMessages.map((msg) => (
                <div key={msg.id} className="p-6 hover:bg-white/5 transition-colors group">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-bold text-gray-200">{msg.name}</div>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Clock size={12} />
                      {new Date(msg.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-sm text-accent mb-2">{msg.subject}</div>
                  <p className="text-sm text-gray-400 line-clamp-1">{msg.message}</p>
                </div>
              ))
            ) : (
              <div className="p-10 text-center text-gray-500">No messages yet.</div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4">
            <button
              onClick={() => router.push('/admin/projects?new=true')}
              className="w-full p-4 bg-accent/10 border border-accent/20 rounded-2xl text-accent font-medium hover:bg-accent/20 transition-all flex items-center justify-center gap-2"
            >
              Add New Project
            </button>
            <button
              onClick={() => router.push('/admin/about')}
              className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-gray-300 font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              Update Bio
            </button>
            <Link 
              href="/"
              target="_blank"
              className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-gray-300 font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              View Site
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
