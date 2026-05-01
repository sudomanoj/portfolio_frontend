'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { api } from '@/lib/api'
import { 
  LayoutDashboard, 
  User, 
  Briefcase, 
  Cpu, 
  Share2, 
  MessageSquare, 
  LogOut, 
  Menu, 
  X,
  Bot,
  Settings
} from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check auth
    if (!api.isAuthenticated()) {
      router.push('/admin/login')
    } else {
      setIsAuthorized(true)
    }
  }, [router])

  const handleLogout = () => {
    api.logout()
    router.push('/admin/login')
  }

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { name: 'About Me', icon: User, href: '/admin/about' },
    { name: 'Projects', icon: Briefcase, href: '/admin/projects' },
    { name: 'Experience', icon: Briefcase, href: '/admin/experience' },
    { name: 'Skills', icon: Cpu, href: '/admin/skills' },
    { name: 'Social Media', icon: Share2, href: '/admin/socials' },
    { name: 'Messages', icon: MessageSquare, href: '/admin/messages' },
    { name: 'Settings', icon: Settings, href: '/admin/settings' },
  ]

  if (!isAuthorized && !pathname.includes('/login')) return null

  // Don't show sidebar on login page
  if (pathname.includes('/login')) return <>{children}</>

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      {/* Sidebar Overlay (Mobile) */}
      {!isSidebarOpen && (
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden fixed bottom-6 left-6 z-50 p-4 bg-accent rounded-full shadow-lg"
        >
          <Menu size={24} />
        </button>
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-card/40 backdrop-blur-xl border-r border-white/10 transition-transform duration-300 transform
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:block
      `}>
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-10">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-accent rounded flex items-center justify-center group-hover:rotate-12 transition-transform">
                <Bot size={20} className="text-accent-foreground" />
              </div>
              <span className="font-bold text-xl tracking-tight">Manoj<span className="text-accent">.</span>Admin</span>
            </Link>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                    ${isActive 
                      ? 'bg-accent text-accent-foreground' 
                      : 'hover:bg-white/5 text-gray-400 hover:text-white'}
                  `}
                >
                  <Icon size={20} className={isActive ? '' : 'group-hover:scale-110 transition-transform'} />
                  <span className="font-medium text-sm">{item.name}</span>
                </Link>
              )
            })}
          </nav>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all mt-auto group cursor-pointer"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  )
}
