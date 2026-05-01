'use client'

import { useState } from 'react'
import { api } from '@/lib/api'
import { User, Lock, Save, Loader2, CheckCircle2, ShieldAlert } from 'lucide-react'

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setStatus('loading')
    setError('')

    try {
      const updateData: { username?: string; password?: string } = {}
      if (formData.username.trim()) updateData.username = formData.username
      if (formData.password) updateData.password = formData.password

      await api.updateUser(updateData)
      setStatus('success')
      setFormData({ username: '', password: '', confirmPassword: '' })
      
      // Reset success message after 3 seconds
      setTimeout(() => setStatus('idle'), 3000)
    } catch (err: any) {
      setError(err.message || 'Failed to update credentials')
      setStatus('error')
    }
  }

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-4xl font-bold mb-2">Account Settings</h1>
        <p className="text-gray-400">Manage your administrative credentials and security preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-4">
          <div className="bg-card/30 border border-white/5 p-6 rounded-3xl">
            <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-4">
              <ShieldAlert size={24} />
            </div>
            <h3 className="text-lg font-bold mb-2">Security Notice</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Changing your username or password will invalidate your current session. You will remain logged in, but your authentication token will be refreshed.
            </p>
          </div>
        </div>

        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="bg-card/30 border border-white/10 rounded-3xl p-8 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400 flex items-center gap-2">
                  <User size={14} /> New Username
                </label>
                <input
                  type="text"
                  placeholder="Leave blank to keep current"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-1 focus:ring-accent outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 flex items-center gap-2">
                    <Lock size={14} /> New Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-1 focus:ring-accent outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 flex items-center gap-2">
                    <Lock size={14} /> Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-1 focus:ring-accent outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl text-sm italic">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full md:w-auto bg-accent text-accent-foreground px-8 py-4 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {status === 'loading' ? (
                <Loader2 className="animate-spin" size={20} />
              ) : status === 'success' ? (
                <CheckCircle2 size={20} />
              ) : (
                <Save size={20} />
              )}
              {status === 'loading' ? 'Saving Changes...' : status === 'success' ? 'Settings Saved!' : 'Update Credentials'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
