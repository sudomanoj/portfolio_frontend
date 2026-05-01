'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { Lock, User, Loader2, Rocket } from 'lucide-react'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('username', username)
      formData.append('password', password)

      await api.login(formData)
      router.push('/admin')
    } catch (err) {
      setError('Invalid username or password. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] animate-pulse delay-700" />

      <div className="w-full max-w-md relative">
        <div className="bg-card/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
          {/* Logo/Icon */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
              <Rocket className="text-accent" size={32} />
            </div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Admin Login
            </h1>
            <p className="text-gray-500 mt-2">Welcome back, Manoj.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all placeholder:text-gray-600"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all placeholder:text-gray-600"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-xl animate-shake">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-4 rounded-2xl shadow-lg shadow-accent/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Footer text */}
          <p className="text-center text-gray-600 text-xs mt-8">
            &copy; {new Date().getFullYear()} Manoj Paudel. Secure access only.
          </p>
        </div>
      </div>
    </div>
  )
}
