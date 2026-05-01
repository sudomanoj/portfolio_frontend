'use client'

import { useState, useEffect } from 'react'
import { api, Project, getImageUrl } from '@/lib/api'
import { Plus, Trash2, Edit2, Loader2, Save, X, Github, ExternalLink, Image as ImageIcon } from 'lucide-react'
import ImageUpload from '@/components/admin/image-upload'

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [currentProject, setCurrentProject] = useState<Partial<Project>>({
    title: '',
    description: '',
    tech: [],
    image: '',
    link: '',
    github: '',
    featured: false
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const data = await api.getProjects()
      setProjects(data)
    } catch (error) {
      console.error('Failed to fetch projects', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      if (currentProject.id) {
        await api.updateProject(currentProject.id, currentProject as Omit<Project, 'id'>)
      } else {
        await api.createProject(currentProject as Omit<Project, 'id'>)
      }
      setIsEditing(false)
      fetchProjects()
    } catch (error) {
      alert('Failed to save project')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return
    try {
      await api.deleteProject(id)
      fetchProjects()
    } catch (error) {
      alert('Failed to delete project')
    }
  }

  const openEdit = (project?: Project) => {
    if (project) {
      setCurrentProject(project)
    } else {
      setCurrentProject({
        title: '',
        description: '',
        tech: [],
        image: '',
        link: '',
        github: '',
        featured: false
      })
    }
    setIsEditing(true)
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">Projects</h1>
          <p className="text-gray-400">Showcase your best work. Manage images, links, and technologies.</p>
        </div>
        {!isEditing && (
          <button
            onClick={() => openEdit()}
            className="flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Plus size={20} /> Add Project
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-card/30 border border-white/5 p-8 rounded-3xl space-y-8 animate-in zoom-in-95 duration-300">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-accent">{currentProject.id ? 'Edit Project' : 'New Project'}</h2>
            <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 col-span-2">
              <label className="text-sm text-gray-400">Project Title</label>
              <input
                type="text"
                required
                value={currentProject.title}
                onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-accent"
                placeholder="Awesome App"
              />
            </div>
            
            <div className="space-y-2 col-span-2">
              <label className="text-sm text-gray-400">Description</label>
              <textarea
                required
                rows={3}
                value={currentProject.description}
                onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-accent resize-none"
                placeholder="Describe your masterpiece..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">Technologies (comma-separated)</label>
              <input
                type="text"
                value={currentProject.tech?.join(', ')}
                onChange={(e) => setCurrentProject({ ...currentProject, tech: e.target.value.split(',').map(s => s.trim()).filter(s => s !== '') })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-accent"
                placeholder="Next.js, Tailwind, FastAPI"
              />
            </div>

            <div className="space-y-2 col-span-2">
              <ImageUpload 
                label="Project Thumbnail"
                currentImage={currentProject.image}
                onUploadSuccess={(url) => setCurrentProject({ ...currentProject, image: url })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">Live Demo URL</label>
              <input
                type="url"
                value={currentProject.link}
                onChange={(e) => setCurrentProject({ ...currentProject, link: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-accent"
                placeholder="https://..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">GitHub URL</label>
              <input
                type="url"
                value={currentProject.github}
                onChange={(e) => setCurrentProject({ ...currentProject, github: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-accent"
                placeholder="https://github.com/..."
              />
            </div>

            <div className="col-span-2 flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="featured"
                checked={currentProject.featured}
                onChange={(e) => setCurrentProject({ ...currentProject, featured: e.target.checked })}
                className="w-5 h-5 rounded border-white/10 bg-white/5 text-accent focus:ring-accent transition-all cursor-pointer"
              />
              <label htmlFor="featured" className="text-sm text-gray-300 font-medium cursor-pointer selects-none">
                Featured Project (Highlighted on homepage)
              </label>
            </div>

            <div className="col-span-2 pt-4 flex gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-accent text-accent-foreground py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-accent/20"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                {currentProject.id ? 'Update Project' : 'Create Project'}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isLoading ? (
            <div className="col-span-full py-20 text-center text-gray-500 flex flex-col items-center gap-4">
              <Loader2 className="animate-spin" size={32} />
              Loading your works...
            </div>
          ) : projects.length > 0 ? (
            projects.map((project) => (
              <div key={project.id} className="bg-card/30 border border-white/5 rounded-3xl overflow-hidden group hover:border-white/20 transition-all flex flex-col">
                {/* Preview Image */}
                <div className="aspect-video bg-white/5 relative overflow-hidden">
                  {project.image ? (
                    <img src={getImageUrl(project.image)} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-700">
                      <ImageIcon size={48} />
                    </div>
                  )}
                  {project.featured && (
                    <div className="absolute top-4 left-4 bg-accent text-accent-foreground text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                      Featured
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-60" />
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold truncate">{project.title}</h3>
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(project)} className="p-2 text-gray-400 hover:text-white transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(project.id)} className="p-2 text-red-500/50 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-1">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.slice(0, 3).map(t => (
                      <span key={t} className="text-[10px] bg-white/5 px-2 py-1 rounded text-gray-500 border border-white/5 capitalize">
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="text-[10px] text-gray-600">+{project.tech.length - 3} more</span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                    {project.link && (
                      <a href={project.link} target="_blank" className="flex items-center gap-1 text-xs text-accent hover:underline">
                        <ExternalLink size={14} /> Live Demo
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" className="flex items-center gap-1 text-xs text-gray-500 hover:underline">
                        <Github size={14} /> Source
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-gray-500">
              No projects found. Start by adding a new one!
            </div>
          )}
        </div>
      )}
    </div>
  )
}
