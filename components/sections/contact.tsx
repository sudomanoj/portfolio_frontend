'use client'

import { useState, useEffect } from 'react'
import { Mail, Linkedin, Github, Twitter, Facebook, Instagram, Link as LinkIcon, Loader2, CheckCircle2 } from 'lucide-react'
import { api, SocialMediaLink } from '@/lib/api'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [socialLinks, setSocialLinks] = useState<SocialMediaLink[]>([])

  useEffect(() => {
    api.getSocialMedia().then(setSocialLinks).catch(console.error)
  }, [])

  const getIconForName = (name: string) => {
    const normalized = name.toLowerCase()
    switch (normalized) {
      case 'github': return Github
      case 'linkedin': return Linkedin
      case 'twitter': return Twitter
      case 'facebook': return Facebook
      case 'instagram': return Instagram
      default: return LinkIcon
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    try {
      await api.submitContact(formData)
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error('Failed to submit contact form:', error)
      setStatus('error')
      setErrorMessage('Something went wrong. Please try again later.')
    }
  }

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -mb-48 -ml-48"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Get In Touch</h2>
          <div className="flex justify-center mb-4">
            <div className="w-20 h-1 bg-gradient-to-r from-accent to-accent/30 rounded-full"></div>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            I'm always interested in hearing about new projects and opportunities. Feel free to reach out!
          </p>
        </div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Email Card */}
          <div className="bg-card border border-border rounded-lg p-8 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 animate-slide-in-left group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <Mail className="text-accent" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Email</h3>
                <p className="text-sm text-muted-foreground">Direct communication</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">
              Drop me an email for inquiries, collaborations, or just to say hello!
            </p>
            <a
              href="mailto:manoj@example.com"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-semibold"
            >
              Send Email →
            </a>
          </div>

          {/* Let's Talk Card */}
          <div className="bg-card border border-border rounded-lg p-8 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 animate-slide-in-right group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <Linkedin className="text-accent" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Connect</h3>
                <p className="text-sm text-muted-foreground">Professional network</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">
              Connect with me on LinkedIn to stay updated with my latest work and insights.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-semibold"
            >
              Visit LinkedIn →
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto bg-background border border-border rounded-lg p-8 animate-fade-in-up">
          <h3 className="text-2xl font-bold text-foreground mb-6">Send Me a Message</h3>
          
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CheckCircle2 className="text-accent w-16 h-16 mb-4 animate-bounce" />
              <h4 className="text-xl font-bold text-foreground mb-2">Message Sent!</h4>
              <p className="text-muted-foreground mb-6">Thank you for reaching out. I'll get back to you soon.</p>
              <button
                onClick={() => setStatus('idle')}
                className="px-6 py-2 bg-accent/10 border border-accent/30 text-accent rounded-lg hover:bg-accent/20 transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-foreground font-semibold">Name</label>
                <input
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-foreground font-semibold">Email</label>
                <input
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-foreground font-semibold">Subject</label>
                <input
                  required
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  type="text"
                  placeholder="What's this about?"
                  className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-foreground font-semibold">Message</label>
                <textarea
                  required
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or opportunity..."
                  rows={5}
                  className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors resize-none"
                ></textarea>
              </div>

              {status === 'error' && (
                <p className="text-red-500 text-sm font-medium">{errorMessage}</p>
              )}

              <button
                disabled={status === 'submitting'}
                type="submit"
                className="w-full px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          )}
        </div>

        {/* Social Links */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">Or connect with me on social media</p>
          <div className="flex justify-center flex-wrap gap-6">
            {socialLinks.map((social) => {
              const Icon = getIconForName(social.name)
              return (
                <a
                  key={social.id}
                  href={social.url}
                  aria-label={social.name}
                  className="w-12 h-12 bg-card border border-border rounded-lg flex items-center justify-center text-muted-foreground transition-all duration-300 hover:bg-accent/10 hover:text-accent"
                >
                  <Icon size={20} />
                </a>
              )
            })}
            <a
              href="mailto:manoj@example.com"
              aria-label="Email"
              className="w-12 h-12 bg-card border border-border rounded-lg flex items-center justify-center text-muted-foreground transition-all duration-300 hover:bg-accent/10 hover:text-accent"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
