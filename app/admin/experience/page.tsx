'use client'

import { useState, useEffect } from 'react'
import { api, Experience } from '@/lib/api'
import { Plus, Trash2, Edit2, Save, X, Loader2, Briefcase, Calendar, Link as LinkIcon, Menu } from 'lucide-react'

export default function ExperienceAdmin() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<Experience>({
    company: '',
    role: '',
    duration: '',
    description: '',
    link: '',
    order: 0
  })
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    loadExperiences()
  }, [])

  const loadExperiences = async () => {
    try {
      const data = await api.getExperiences()
      setExperiences(data)
    } catch (error) {
      console.error('Failed to load experiences:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (exp: Experience) => {
    setEditingId(exp.id!)
    setEditForm(exp)
    setIsAdding(false)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this experience?')) return
    try {
      await api.deleteExperience(id)
      setExperiences(experiences.filter(exp => exp.id !== id))
    } catch (error) {
      alert('Failed to delete experience')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (isAdding) {
        const newExp = await api.createExperience(editForm)
        setExperiences([...experiences, newExp])
        setIsAdding(false)
      } else if (editingId) {
        const updated = await api.updateExperience(editingId, editForm)
        setExperiences(experiences.map(exp => exp.id === editingId ? updated : exp))
        setEditingId(null)
      }
      setEditForm({ company: '', role: '', duration: '', description: '', link: '', order: 0 })
    } catch (error) {
      alert('Failed to save experience')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20">
        <Loader2 className="animate-spin text-accent" size={40} />
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">Work Experience</h1>
          <p className="text-gray-400">Manage your professional career timeline and achievements.</p>
        </div>
        {!isAdding && !editingId && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-2xl font-bold hover:scale-105 transition-all"
          >
            <Plus size={20} /> Add Experience
          </button>
        )}
      </div>

      {(isAdding || editingId) && (
        <div className="bg-card/40 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              {isAdding ? <Plus className="text-accent" /> : <Edit2 className="text-accent" />}
              {isAdding ? 'New Experience' : 'Edit Experience'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-400 flex items-center gap-2"><Briefcase size={14} /> Company</label>
                <input
                  type="text"
                  required
                  value={editForm.company}
                  onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-1 focus:ring-accent outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400 flex items-center gap-2"><Briefcase size={14} /> Role / Title</label>
                <input
                  type="text"
                  required
                  value={editForm.role}
                  onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-1 focus:ring-accent outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400 flex items-center gap-2"><Calendar size={14} /> Duration (e.g., 2020 - Present)</label>
                <input
                  type="text"
                  required
                  value={editForm.duration}
                  onChange={(e) => setEditForm({ ...editForm, duration: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-1 focus:ring-accent outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400 flex items-center gap-2"><LinkIcon size={14} /> Company Website (Optional)</label>
                <input
                  type="url"
                  value={editForm.link || ''}
                  onChange={(e) => setEditForm({ ...editForm, link: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-1 focus:ring-accent outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400 flex items-center gap-2"><Menu size={14} /> Description / Responsibilities</label>
              <textarea
                required
                rows={4}
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-1 focus:ring-accent outline-none resize-none"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-accent text-accent-foreground px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-all"
              >
                <Save size={20} /> {isAdding ? 'Create' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => { setIsAdding(false); setEditingId(null); }}
                className="bg-white/5 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-white/10 transition-all"
              >
                <X size={20} /> Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {experiences.sort((a,b) => (a.order || 0) - (b.order || 0)).map((exp) => (
          <div 
            key={exp.id}
            className="group bg-card/20 border border-white/5 hover:border-accent/30 rounded-3xl p-6 transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors">{exp.role}</h3>
                  <span className="text-gray-500">@</span>
                  <span className="text-lg font-semibold text-gray-300">{exp.company}</span>
                </div>
                <p className="text-accent/80 text-sm font-medium flex items-center gap-2">
                  <Calendar size={14} /> {exp.duration}
                </p>
                <p className="text-gray-400 mt-2 line-clamp-2 max-w-2xl">{exp.description}</p>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEdit(exp)}
                  className="p-3 bg-white/5 hover:bg-accent hover:text-accent-foreground rounded-xl transition-all"
                  title="Edit"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(exp.id!)}
                  className="p-3 bg-white/5 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {experiences.length === 0 && !isAdding && (
          <div className="text-center py-20 bg-card/10 border border-dashed border-white/10 rounded-3xl">
            <Briefcase size={40} className="mx-auto text-gray-600 mb-4" />
            <p className="text-gray-500 italic">No work experience added yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
