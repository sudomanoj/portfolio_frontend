export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export const getImageUrl = (url?: string) => {
  if (!url) return ''
  if (url.startsWith('data:')) return url
  if (url.startsWith('http://127.0.0.1:8000')) {
    return url.replace('http://127.0.0.1:8000', API_BASE_URL)
  }
  if (url.startsWith('http://localhost:8000')) {
    return url.replace('http://localhost:8000', API_BASE_URL)
  }
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return `${API_BASE_URL}${url}`
}

export interface Experience {
  id?: number
  company: string
  role: string
  duration: string
  description: string
  link?: string
  order: number
}

export interface Project {
  id: number
  title: string
  description: string
  tech: string[]
  image: string
  link: string
  github: string
  featured: boolean
}

export interface SkillCategory {
  id: number
  category: string
  icon: string
  skills: string[]
}

export interface AboutData {
  id: number
  name: string
  title: string
  bio_para1: string
  bio_para2: string
  image_url: string
  stats_years: string
  stats_projects: string
  stats_tech: string
}

export interface ContactMessage {
  name: string
  email: string
  subject: string
  message: string
}

export interface SocialMediaLink {
  id: number
  name: string
  url: string
}

export interface ContactMessageRead extends ContactMessage {
  id: number
  timestamp: string
}

const getAuthHeaders = (): Record<string, string> => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null
  return token ? { 'Authorization': `Bearer ${token}` } : {}
}

export const api = {
  async getProjects(): Promise<Project[]> {
    const res = await fetch(`${API_BASE_URL}/projects/`)
    if (!res.ok) throw new Error('Failed to fetch projects')
    return res.json()
  },

  async createProject(project: Omit<Project, 'id'>): Promise<Project> {
    const res = await fetch(`${API_BASE_URL}/projects/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(project),
    })
    if (res.status === 401) {
      this.logout()
      if (typeof window !== 'undefined') window.location.href = '/admin/login'
      throw new Error('Session expired')
    }
    if (!res.ok) throw new Error('Failed to create project')
    return res.json()
  },

  async updateProject(id: number, project: Omit<Project, 'id'>): Promise<Project> {
    const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(project),
    })
    if (res.status === 401) {
      this.logout()
      if (typeof window !== 'undefined') window.location.href = '/admin/login'
      throw new Error('Session expired')
    }
    if (!res.ok) throw new Error('Failed to update project')
    return res.json()
  },

  async deleteProject(id: number): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    })
    if (res.status === 401) {
      this.logout()
      if (typeof window !== 'undefined') window.location.href = '/admin/login'
      throw new Error('Session expired')
    }
    if (!res.ok) throw new Error('Failed to delete project')
  },

  async getSkills(): Promise<SkillCategory[]> {
    const res = await fetch(`${API_BASE_URL}/skills/`)
    if (!res.ok) throw new Error('Failed to fetch skills')
    const data = await res.json()
    // Transform skills from comma-separated string to array
    return data.map((cat: any) => ({
      ...cat,
      skills: typeof cat.skills === 'string' ? cat.skills.split(',').map((s: string) => s.trim()) : cat.skills
    }))
  },

  async createSkill(skill: Omit<SkillCategory, 'id'>): Promise<SkillCategory> {
    const res = await fetch(`${API_BASE_URL}/skills/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(skill),
    })
    if (res.status === 401) {
      this.logout()
      if (typeof window !== 'undefined') window.location.href = '/admin/login'
      throw new Error('Session expired')
    }
    if (!res.ok) throw new Error('Failed to create skill category')
    return res.json()
  },

  async updateSkill(id: number, skill: Omit<SkillCategory, 'id'>): Promise<SkillCategory> {
    const res = await fetch(`${API_BASE_URL}/skills/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(skill),
    })
    if (!res.ok) throw new Error('Failed to update skill category')
    return res.json()
  },

  async deleteSkill(id: number): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/skills/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    })
    if (!res.ok) throw new Error('Failed to delete skill category')
  },

  async getAbout(): Promise<AboutData> {
    const res = await fetch(`${API_BASE_URL}/about/`)
    if (!res.ok) throw new Error('Failed to fetch about data')
    return res.json()
  },

  async updateAbout(data: Partial<AboutData>): Promise<AboutData> {
    const res = await fetch(`${API_BASE_URL}/about/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Failed to update about data')
    return res.json()
  },

  async submitContact(message: ContactMessage): Promise<any> {
    const res = await fetch(`${API_BASE_URL}/contact/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    })
    if (!res.ok) throw new Error('Failed to send message')
    return res.json()
  },

  async chatWithAI(message: string): Promise<{ response: string }> {
    const res = await fetch(`${API_BASE_URL}/ai/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })
    if (!res.ok) throw new Error('AI Assistant is currently unavailable')
    return res.json()
  },

  async chatWithAIStream(message: string): Promise<ReadableStreamDefaultReader<Uint8Array>> {
    const res = await fetch(`${API_BASE_URL}/ai/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })
    if (!res.ok) throw new Error('AI Assistant is currently unavailable')
    if (!res.body) throw new Error('Response body is empty')
    return res.body.getReader()
  },

  async getSocialMedia(): Promise<SocialMediaLink[]> {
    const res = await fetch(`${API_BASE_URL}/social_media/`)
    if (!res.ok) throw new Error('Failed to fetch social media links')
    return res.json()
  },

  async createSocialMedia(link: Omit<SocialMediaLink, 'id'>): Promise<SocialMediaLink> {
    const res = await fetch(`${API_BASE_URL}/social_media/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(link),
    })
    if (!res.ok) throw new Error('Failed to create social media link')
    return res.json()
  },

  async updateSocialMedia(id: number, link: Omit<SocialMediaLink, 'id'>): Promise<SocialMediaLink> {
    const res = await fetch(`${API_BASE_URL}/social_media/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(link),
    })
    if (!res.ok) throw new Error('Failed to update social media link')
    return res.json()
  },

  async deleteSocialMedia(id: number): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/socials/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    })
    if (!res.ok) throw new Error('Failed to delete social media')
  },

  // Experience
  async getExperiences(): Promise<Experience[]> {
    const res = await fetch(`${API_BASE_URL}/experience/`)
    if (!res.ok) throw new Error('Failed to fetch experiences')
    return res.json()
  },

  async createExperience(experience: Experience): Promise<Experience> {
    const res = await fetch(`${API_BASE_URL}/experience/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(experience),
    })
    if (!res.ok) throw new Error('Failed to create experience')
    return res.json()
  },

  async updateExperience(id: number, experience: Experience): Promise<Experience> {
    const res = await fetch(`${API_BASE_URL}/experience/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(experience),
    })
    if (!res.ok) throw new Error('Failed to update experience')
    return res.json()
  },

  async deleteExperience(id: number): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/experience/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    })
    if (!res.ok) throw new Error('Failed to delete experience')
  },

  async getMessages(): Promise<ContactMessageRead[]> {
    const res = await fetch(`${API_BASE_URL}/contact/`, {
      headers: getAuthHeaders()
    })
    if (res.status === 401) {
      this.logout()
      if (typeof window !== 'undefined') window.location.href = '/admin/login'
      throw new Error('Session expired. Please login again.')
    }
    if (!res.ok) throw new Error('Failed to fetch messages')
    return res.json()
  },

  async login(formData: FormData): Promise<{ access_token: string }> {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      body: formData,
    })
    if (!res.ok) throw new Error('Invalid credentials')
    const data = await res.json()
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_token', data.access_token)
    }
    return data
  },

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token')
    }
  },

  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false
    return !!localStorage.getItem('admin_token')
  },

  async uploadImage(file: File): Promise<{ url: string }> {
    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch(`${API_BASE_URL}/upload/`, {
      method: 'POST',
      headers: {
        ...getAuthHeaders()
      },
      body: formData,
    })
    if (!res.ok) throw new Error('Failed to upload image')
    return res.json()
  },

  async updateUser(userData: { username?: string; password?: string }): Promise<{ message: string; access_token: string }> {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(userData),
    })

    if (res.status === 401) {
      this.logout()
      if (typeof window !== 'undefined') window.location.href = '/admin/login'
      throw new Error('Session expired')
    }

    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.detail || 'Failed to update profile')
    }

    const data = await res.json()
    if (data.access_token && typeof window !== 'undefined') {
      localStorage.setItem('admin_token', data.access_token)
    }
    return data
  }
}
