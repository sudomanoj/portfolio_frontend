'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { api, AboutData } from '@/lib/api'

export default function About() {
  const [about, setAbout] = useState<AboutData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getAbout()
      .then(setAbout)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30 border-y border-border min-h-[400px] flex items-center justify-center">
      <div className="animate-pulse text-accent font-semibold">Loading About...</div>
    </section>
  )

  if (!about) return null

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30 border-y border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8 animate-fade-in-up order-2 md:order-1">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-2">About Me</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-accent to-accent/30 rounded-full"></div>
            </div>

            <div className="space-y-4">
              <p className="text-lg text-muted-foreground leading-relaxed italic border-l-4 border-accent/20 pl-4 py-1">
                {about.bio_para1}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {about.bio_para2}
              </p>
            </div>

            {/* Premium Stats Grid */}
            <div className="grid grid-cols-3 gap-6 py-6 border-y border-border/50">
              <div className="text-center group">
                <div className="text-3xl font-bold text-foreground group-hover:text-accent transition-colors">{about.stats_years}</div>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Experience</p>
              </div>
              <div className="text-center group">
                <div className="text-3xl font-bold text-foreground group-hover:text-accent transition-colors">{about.stats_projects}</div>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Projects</p>
              </div>
              <div className="text-center group">
                <div className="text-3xl font-bold text-foreground group-hover:text-accent transition-colors">{about.stats_tech}</div>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Tech Stack</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-accent/5 rounded-xl border border-accent/10">
                <div className="w-10 h-10 bg-accent text-accent-foreground rounded-lg flex items-center justify-center font-bold">FS</div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">Full-Stack</h3>
                  <p className="text-muted-foreground text-xs uppercase tracking-tight">End-to-end Solutions</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-accent/5 rounded-xl border border-accent/10">
                <div className="w-10 h-10 bg-accent text-accent-foreground rounded-lg flex items-center justify-center font-bold">AI</div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">AI Specialist</h3>
                  <p className="text-muted-foreground text-xs uppercase tracking-tight">Modern LLM Expert</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Professional Photo */}
          <div className="animate-slide-in-right order-1 md:order-2 flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl border-2 border-accent/30 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] animate-glow group bg-muted">
              <Image
                src={about.image_url}
                alt={`${about.name} - ${about.title}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
                <div className="bg-background/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-xl">
                  <h3 className="text-2xl font-bold text-foreground">{about.name}</h3>
                  <p className="text-accent font-medium text-sm tracking-wide uppercase">{about.title}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
