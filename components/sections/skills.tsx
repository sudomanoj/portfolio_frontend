'use client'

import { useEffect, useState } from 'react'
import { api, SkillCategory } from '@/lib/api'

export default function Skills() {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getSkills()
      .then(setSkillCategories)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden min-h-[400px] flex items-center justify-center">
      <div className="animate-pulse text-accent font-semibold">Loading Skills...</div>
    </section>
  )

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">My Skills</h2>
          <div className="flex justify-center mb-4">
            <div className="w-20 h-1 bg-gradient-to-r from-accent to-accent/30 rounded-full"></div>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A comprehensive toolkit spanning backend, frontend, AI/ML, and DevOps technologies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={category.category}
              className="group bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className="text-xl font-semibold text-foreground mb-4">{category.category}</h3>
              <ul className="space-y-3">
                {category.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-accent rounded-full group-hover:animate-pulse"></span>
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Skills breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-background border border-border rounded-lg p-8 animate-slide-in-left">
            <h3 className="text-lg font-semibold text-foreground mb-6">Languages</h3>
            <div className="space-y-4">
              {[
                { name: 'Python', level: 95 },
                { name: 'JavaScript', level: 90 },
                { name: 'TypeScript', level: 85 },
              ].map((lang) => (
                <div key={lang.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">{lang.name}</span>
                    <span className="text-accent text-sm">{lang.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent to-accent/70 rounded-full"
                      style={{ width: `${lang.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-background border border-border rounded-lg p-8 animate-fade-in-up">
            <h3 className="text-lg font-semibold text-foreground mb-6">Frameworks</h3>
            <div className="space-y-4">
              {[
                { name: 'Django/FastAPI', level: 92 },
                { name: 'React', level: 88 },
                { name: 'Flask', level: 85 },
              ].map((framework) => (
                <div key={framework.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">{framework.name}</span>
                    <span className="text-accent text-sm">{framework.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent to-accent/70 rounded-full"
                      style={{ width: `${framework.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-background border border-border rounded-lg p-8 animate-slide-in-right">
            <h3 className="text-lg font-semibold text-foreground mb-6">Specializations</h3>
            <div className="space-y-4">
              {[
                { name: 'Full-Stack Dev', level: 90 },
                { name: 'AI/ML', level: 85 },
                { name: 'System Design', level: 82 },
              ].map((spec) => (
                <div key={spec.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">{spec.name}</span>
                    <span className="text-accent text-sm">{spec.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent to-accent/70 rounded-full"
                      style={{ width: `${spec.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
