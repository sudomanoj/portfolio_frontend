'use client'

import { useState, useEffect } from 'react'
import { api, SkillCategory } from '@/lib/api'
import { Plus, Trash2, Edit2, Loader2, Save, X, Cpu, Code } from 'lucide-react'

export default function SkillsAdminPage() {
  const [categories, setCategories] = useState<SkillCategory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [currentCategory, setCurrentCategory] = useState<Partial<SkillCategory>>({
    category: '',
    icon: 'Code',
    skills: []
  })

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      const data = await api.getSkills()
      setCategories(data)
    } catch (error) {
      console.error('Failed to fetch skills', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      if (currentCategory.id) {
        await api.updateSkill(currentCategory.id, currentCategory as Omit<SkillCategory, 'id'>)
      } else {
        await api.createSkill(currentCategory as Omit<SkillCategory, 'id'>)
      }
      setIsEditing(false)
      fetchSkills()
    } catch (error) {
      alert('Failed to save skill category')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this category?')) return
    try {
      await api.deleteSkill(id)
      fetchSkills()
    } catch (error) {
      alert('Failed to delete skill category')
    }
  }

  const openEdit = (cat?: SkillCategory) => {
    if (cat) {
      setCurrentCategory(cat)
    } else {
      setCurrentCategory({
        category: '',
        icon: 'Code',
        skills: []
      })
    }
    setIsEditing(true)
  }

  return (
    <div className="max-w-4xl space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">Skills</h1>
          <p className="text-gray-400">Organize your technical expertise by categories and tags.</p>
        </div>
        {!isEditing && (
          <button
            onClick={() => openEdit()}
            className="flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Plus size={20} /> Add Category
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-card/30 border border-white/5 p-8 rounded-3xl space-y-8 animate-in zoom-in-95 duration-300">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-accent">{currentCategory.id ? 'Edit Category' : 'New Category'}</h2>
            <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Category Name</label>
              <input
                type="text"
                required
                value={currentCategory.category}
                onChange={(e) => setCurrentCategory({ ...currentCategory, category: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-accent"
                placeholder="Frontend, Backend, etc."
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Lucide Icon Name</label>
              <input
                type="text"
                value={currentCategory.icon}
                onChange={(e) => setCurrentCategory({ ...currentCategory, icon: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-accent"
                placeholder="Database, Monitor, Cpu..."
              />
            </div>

            <div className="space-y-2 col-span-2">
              <label className="text-sm text-gray-400">Skills (comma-separated)</label>
              <textarea
                rows={4}
                required
                value={currentCategory.skills?.join(', ')}
                onChange={(e) => setCurrentCategory({ ...currentCategory, skills: e.target.value.split(',').map(s => s.trim()).filter(s => s !== '') })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-accent resize-none"
                placeholder="React, TypeScript, Next.js..."
              />
            </div>

            <div className="col-span-2 pt-4 flex gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-accent text-accent-foreground py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-accent/20"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                {currentCategory.id ? 'Update Category' : 'Create Category'}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-white/5 text-white py-4 rounded-xl font-bold border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="space-y-4">
          {isLoading ? (
            <div className="py-20 text-center text-gray-500 flex flex-col items-center gap-4">
              <Loader2 className="animate-spin" size={32} />
              Loading expertise...
            </div>
          ) : categories.length > 0 ? (
            categories.map((cat) => (
              <div key={cat.id} className="p-6 bg-card/30 border border-white/5 rounded-3xl flex items-center justify-between group hover:bg-white/5 transition-all">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-accent">
                    <Cpu size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{cat.category}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {cat.skills.map(s => (
                        <span key={s} className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(cat)} className="p-3 text-gray-400 hover:text-white transition-colors">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(cat.id)} className="p-3 text-red-500/50 hover:text-red-500 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center text-gray-500">
              No skill categories defined.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
