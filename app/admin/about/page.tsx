'use client'

import { useState, useEffect } from 'react'
import { api, AboutData } from '@/lib/api'
import { Save, Loader2, CheckCircle, RefreshCcw } from 'lucide-react'
import ImageUpload from '@/components/admin/image-upload'

export default function AboutAdminPage() {
  const [data, setData] = useState<AboutData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const about = await api.getAbout()
        setData(about)
      } catch (error) {
        console.error('Failed to fetch about data', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!data) return
    setIsSaving(true)
    setSuccess(false)

    try {
      await api.updateAbout(data)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      alert('Failed to update about data')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) return <div className="p-10 text-center text-gray-400 flex items-center justify-center gap-2"><Loader2 className="animate-spin" /> Loading data...</div>
  if (!data) return <div className="p-10 text-center text-red-400">Error loading data.</div>

  return (
    <div className="max-w-4xl space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">About Me</h1>
          <p className="text-gray-400">Edit your profile information, bio, and portfolio statistics.</p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isSaving}
          className="flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="animate-spin" size={20} /> : success ? <CheckCircle size={20} /> : <Save size={20} />}
          {isSaving ? 'Saving...' : success ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Personal Info */}
        <div className="bg-card/30 border border-white/5 p-8 rounded-3xl space-y-6 md:col-span-2">
          <h2 className="text-xl font-bold flex items-center gap-2 text-accent">
            <RefreshCcw size={20} /> General Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Full Name</label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-1 focus:ring-accent outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Professional Title</label>
              <input
                type="text"
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-1 focus:ring-accent outline-none"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <ImageUpload 
                label="Profile Image"
                currentImage={data.image_url}
                onUploadSuccess={(url) => setData({ ...data, image_url: url })}
              />
            </div>
          </div>
        </div>

        {/* Biography */}
        <div className="bg-card/30 border border-white/5 p-8 rounded-3xl space-y-6 md:col-span-2">
          <h2 className="text-xl font-bold text-accent">Biography</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Paragraph 1</label>
              <textarea
                rows={4}
                value={data.bio_para1}
                onChange={(e) => setData({ ...data, bio_para1: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-1 focus:ring-accent outline-none resize-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Paragraph 2</label>
              <textarea
                rows={4}
                value={data.bio_para2}
                onChange={(e) => setData({ ...data, bio_para2: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-1 focus:ring-accent outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-card/30 border border-white/5 p-8 rounded-3xl space-y-6 md:col-span-2">
          <h2 className="text-xl font-bold text-accent">Career Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Years Experience</label>
              <input
                type="text"
                value={data.stats_years}
                onChange={(e) => setData({ ...data, stats_years: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-1 focus:ring-accent outline-none text-center font-bold text-xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Projects Completed</label>
              <input
                type="text"
                value={data.stats_projects}
                onChange={(e) => setData({ ...data, stats_projects: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-1 focus:ring-accent outline-none text-center font-bold text-xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Technologies</label>
              <input
                type="text"
                value={data.stats_tech}
                onChange={(e) => setData({ ...data, stats_tech: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-1 focus:ring-accent outline-none text-center font-bold text-xl"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
