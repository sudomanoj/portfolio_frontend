'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ExternalLink, Github } from 'lucide-react'
import { api, Project } from '@/lib/api'

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getProjects()
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30 border-y border-border min-h-[400px] flex items-center justify-center">
      <div className="animate-pulse text-accent font-semibold">Loading Projects...</div>
    </section>
  )

  const featuredProjects = projects.filter((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30 border-y border-border">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Featured Projects</h2>
          <div className="flex justify-center mb-4">
            <div className="w-20 h-1 bg-gradient-to-r from-accent to-accent/30 rounded-full"></div>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A selection of my work showcasing full-stack development and AI/ML expertise
          </p>
        </div>

        {/* Featured Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {featuredProjects.map((project, index) => (
            <div
              key={project.title}
              className="group relative bg-background border border-border rounded-lg overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/30 animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden bg-card">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-125 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background opacity-60"></div>
              </div>

              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative p-8">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <div className="text-accent text-2xl animate-pulse-accent">✨</div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-accent/10 border border-accent/30 text-accent text-sm rounded-full hover:bg-accent/20 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 pt-4 border-t border-border">
                  <a
                    href={project.link}
                    className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-semibold"
                  >
                    View Live <ExternalLink size={16} />
                  </a>
                  <a
                    href={project.github}
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors font-semibold"
                  >
                    GitHub <Github size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects Grid */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-8">Other Notable Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherProjects.map((project, index) => (
              <div
                key={project.title}
                className="group relative bg-background border border-border rounded-lg overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 animate-fade-in-up flex flex-col"
                style={{ animationDelay: `${(index + 2) * 100}ms` }}
              >
                {/* Project Thumbnail */}
                <div className="relative h-32 overflow-hidden bg-card">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80"></div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h4 className="text-lg font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 2).map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-accent/10 text-accent text-xs rounded">
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 2 && (
                      <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded">
                        +{project.tech.length - 2}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-border">
                    <a href={project.github} className="text-accent hover:text-accent/80 transition-colors">
                      <Github size={18} />
                    </a>
                    <a href={project.link} className="text-accent hover:text-accent/80 transition-colors">
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View all projects button */}
        <div className="text-center pt-8">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 border border-accent/50 text-accent rounded-lg font-semibold hover:bg-accent/10 transition-colors duration-300"
          >
            View All Projects <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </section>
  )
}
