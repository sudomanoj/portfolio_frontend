'use client'

import { useState, useEffect } from 'react'
import { api, Experience as ExperienceType } from '@/lib/api'
import { Briefcase, Calendar, ChevronRight, Loader2 } from 'lucide-react'

export default function Experience() {
  const [experiences, setExperiences] = useState<ExperienceType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadExperiences()
  }, [])

  const loadExperiences = async () => {
    try {
      const data = await api.getExperiences()
      setExperiences(data.sort((a,b) => (a.order || 0) - (b.order || 0)))
    } catch (error) {
      console.error('Failed to load experiences:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return null
  if (experiences.length === 0) return null

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center mb-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-bold mb-4">
              <Briefcase size={16} /> Profession Timeline
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Experience</h2>
            <div className="h-1.5 w-24 bg-accent rounded-full mb-8"></div>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-white/10 to-transparent transform md:-translate-x-1/2 hidden sm:block"></div>

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div 
                  key={exp.id}
                  className={`relative flex flex-col md:flex-row items-start md:items-center group ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-[18px] md:left-1/2 top-0 h-9 w-9 bg-background border-2 border-accent rounded-full flex items-center justify-center transform md:-translate-x-1/2 z-20 group-hover:scale-125 group-hover:bg-accent transition-all duration-300">
                    <div className="w-2 h-2 bg-accent rounded-full group-hover:bg-background"></div>
                  </div>

                  {/* Content Area */}
                  <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${
                    index % 2 === 0 ? 'md:pr-12 text-left md:text-right' : 'md:pl-12'
                  }`}>
                    <div className="bg-card/20 backdrop-blur-md border border-white/5 hover:border-accent/30 p-8 rounded-[2rem] transition-all duration-500 group-hover:translate-y-[-5px]">
                      <div className={`flex flex-col mb-4 ${
                        index % 2 === 0 ? 'md:items-end' : ''
                      }`}>
                        <div className="inline-flex items-center gap-2 text-accent font-bold text-sm mb-2">
                          <Calendar size={14} /> {exp.duration}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
                        <p className="text-gray-400 font-semibold">{exp.company}</p>
                      </div>
                      
                      <p className="text-gray-400 leading-relaxed text-sm md:text-base italic">
                        "{exp.description}"
                      </p>

                      {exp.link && (
                        <a 
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1 text-accent hover:gap-2 transition-all text-sm font-bold mt-6 ${
                            index % 2 === 0 ? 'md:flex-row-reverse' : ''
                          }`}
                        >
                          Visit Company <ChevronRight size={16} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Spacer for other side */}
                  <div className="hidden md:block w-[45%]"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/5 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent/5 rounded-full blur-[100px] -z-10"></div>
    </section>
  )
}
