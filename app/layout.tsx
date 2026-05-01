import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#0d1117' }
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export const metadata: Metadata = {
  title: 'Manoj Paudel | Full-Stack Developer & AI/ML Specialist',
  description: 'Portfolio of Manoj Paudel - Full-stack developer with expertise in Python, Django, FastAPI, React, JavaScript, and AI/ML. Building scalable applications and intelligent systems.',
  generator: 'v0.app',
  keywords: ['Full-Stack Developer', 'Python', 'Django', 'FastAPI', 'React', 'JavaScript', 'AI/ML', 'Machine Learning'],
  authors: [{ name: 'Manoj Paudel' }],
  openGraph: {
    title: 'Manoj Paudel | Full-Stack Developer & AI/ML Specialist',
    description: 'Crafting elegant solutions with Python, JavaScript, and AI/ML expertise',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
