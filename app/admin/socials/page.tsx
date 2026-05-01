'use client'

import { useState, useEffect } from 'react'
import { api, SocialMediaLink } from '@/lib/api'
import { Plus, Trash2, Link as LinkIcon, Loader2, Save, ExternalLink } from 'lucide-react'

export default function SocialsAdminPage() {
  const [socials, setSocials] = useState<SocialMediaLink[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [newSocial, setNewSocial] = useState({ name: '', url: '' })

  useEffect(() => {
    fetchSocials()
  }, [])

  const fetchSocials = async () => {
    try {
      const data = await api.getSocialMedia()
      setSocials(data)
    } catch (error) {
      console.error('Failed to fetch socials', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newSocial.name || !newSocial.url) return
    setIsSaving(true)
    try {
      await api.createSocialMedia(newSocial)
      setNewSocial({ name: '', url: '' })
      fetchSocials()
    } catch (error) {
      alert('Failed to add social media link')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this link?')) return
    try {
      await api.deleteSocialMedia(id)
      fetchSocials()
    } catch (error) {
      alert('Failed to delete link')
    }
  }

  return (
    <div className="max-w-4xl space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-4xl font-bold mb-2">Social Media</h1>
        <p className="text-gray-400">Manage your dynamic social handles. The frontend will automatically map names to icons.</p>
      </div>

      {/* Add New */}
      <div className="bg-card/30 border border-white/5 p-8 rounded-3xl space-y-6">
        <h2 className="text-xl font-bold flex items-center gap-2 text-accent">
          <Plus size={20} /> Add New Link
        </h2>
        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Name (e.g. LinkedIn)"
            value={newSocial.name}
            onChange={(e) => setNewSocial({ ...newSocial, name: e.target.value })}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-accent"
          />
          <input
            type="url"
            placeholder="URL (https://...)"
            value={newSocial.url}
            onChange={(e) => setNewSocial({ ...newSocial, url: e.target.value })}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-accent"
          />
          <button
            type="submit"
            disabled={isSaving}
            className="bg-accent text-accent-foreground rounded-xl font-bold hover:scale-105 active:scale-95 transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
          >
            {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
            Add Link
          </button>
        </form>
      </div>

      {/* List */}
      <div className="bg-card/30 border border-white/5 rounded-3xl overflow-hidden divide-y divide-white/5">
        {isLoading ? (
          <div className="p-10 text-center text-gray-400">Loading links...</div>
        ) : socials.length > 0 ? (
          socials.map((social) => (
            <div key={social.id} className="p-6 flex items-center justify-between group hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-accent">
                  <LinkIcon size={20} />
                </div>
                <div>
                  <div className="font-bold text-gray-200 capitalize">{social.name}</div>
                  <div className="text-sm text-gray-500 truncate max-w-xs md:max-w-md">{social.url}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a 
                  href={social.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-3 text-gray-400 hover:text-white transition-colors"
                >
                  <ExternalLink size={18} />
                </a>
                <button
                  onClick={() => handleDelete(social.id)}
                  className="p-3 text-red-500/50 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all cursor-pointer"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-10 text-center text-gray-500">No social links configured yet.</div>
        )}
      </div>
    </div>
  )
}
