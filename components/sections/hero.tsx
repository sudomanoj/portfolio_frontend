'use client'

import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section id="hero" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-6 animate-slide-in-left">
            <div className="space-y-2">
              <div className="inline-block px-4 py-2 bg-accent/10 border border-accent/20 rounded-full">
                <p className="text-accent text-sm font-medium">Welcome to my portfolio</p>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight text-balance">
                Hey, I'm <span className="text-accent animate-pulse-accent">Manoj Paudel</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Full-stack developer crafting elegant solutions with Python, JavaScript, and AI/ML expertise
              </p>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed max-w-lg">
              I build scalable web applications and intelligent systems. Specializing in Django, FastAPI, React, and modern AI/ML technologies.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#projects"
                className="px-8 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-colors duration-300 flex items-center justify-center gap-2 group"
              >
                View My Work
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="px-8 py-3 border border-accent/50 text-accent rounded-lg font-semibold hover:bg-accent/10 transition-colors duration-300"
              >
                Get In Touch
              </a>
            </div>
          </div>

          {/* Right side - Animated code block */}
          <div className="hidden md:block animate-fade-in-up">
            <div className="bg-card border border-border rounded-lg p-6 animate-glow">
              <div className="space-y-4 font-mono text-sm">
                <div className="text-muted-foreground">
                  <span className="text-accent">const</span> <span className="text-foreground">developer</span> = {'{'}
                </div>
                <div className="pl-4 space-y-3">
                  <div className="text-muted-foreground">
                    <span className="text-foreground">name</span>: <span className="text-accent/80">'Manoj Paudel'</span>,
                  </div>
                  <div className="text-muted-foreground">
                    <span className="text-foreground">role</span>: <span className="text-accent/80">'Full-Stack Developer'</span>,
                  </div>
                  <div className="text-muted-foreground">
                    <span className="text-foreground">expertise</span>: [
                  </div>
                  <div className="pl-4 space-y-1">
                    <div className="text-accent/80">'Python', 'Django', 'FastAPI',</div>
                    <div className="text-accent/80">'JavaScript', 'React', 'TypeScript',</div>
                    <div className="text-accent/80">'AI/ML', 'Data Science'</div>
                  </div>
                  <div className="text-muted-foreground">],</div>
                  <div className="text-muted-foreground">
                    <span className="text-foreground">passionate</span>: <span className="text-accent">true</span>
                  </div>
                </div>
                <div className="text-muted-foreground">{'}'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
