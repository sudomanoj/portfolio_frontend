'use client'

import Hero from '@/components/sections/hero'
import About from '@/components/sections/about'
import Skills from '@/components/sections/skills'
import Experience from '@/components/sections/experience'
import Projects from '@/components/sections/projects'
import Contact from '@/components/sections/contact'
import Navigation from '@/components/navigation'
import AIChat from '@/components/sections/ai-chat'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/95">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <AIChat />
    </div>
  )
}
