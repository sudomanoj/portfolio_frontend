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
  metadataBase: new URL('https://manoj-paudel.com.np'), // Updated to match manual changes
  title: {
    default: 'Manoj Paudel | Full-Stack Developer & AI/ML Specialist',
    template: '%s | Manoj Paudel'
  },
  description: 'Portfolio of Manoj Paudel - Full-stack developer with expertise in Python, Django, FastAPI, React, JavaScript, and AI/ML. Building scalable applications and intelligent systems.',
  generator: 'v0.app',
  keywords: ['Full-Stack Developer', 'Python', 'Django', 'FastAPI', 'React', 'JavaScript', 'AI/ML', 'Machine Learning', 'Data Science', 'Software Engineer'],
  authors: [{ name: 'Manoj Paudel' }],
  creator: 'Manoj Paudel',
  publisher: 'Manoj Paudel',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Manoj Paudel | Full-Stack Developer & AI/ML Specialist',
    description: 'Crafting elegant solutions with Python, JavaScript, and AI/ML expertise',
    url: 'https://manoj-paudel.com.np',
    siteName: 'Manoj Paudel Portfolio',
    images: [
      {
        url: '/og-image.png', // User might need to provide this, but I'll add the tag
        width: 1200,
        height: 630,
        alt: 'Manoj Paudel Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manoj Paudel | Full-Stack Developer & AI/ML Specialist',
    description: 'Full-stack developer specializing in Python, React, and AI/ML.',
    images: ['/og-image.png'],
    creator: '@sudomanoj', // Assuming based on sudomanoj corpus name
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Manoj Paudel',
    url: 'https://manoj-paudel.com.np',
    jobTitle: 'Full-Stack Developer & AI/ML Specialist',
    sameAs: [
      'https://github.com/sudomanoj',
      'https://linkedin.com/in/sudomanoj', // Generic, might need adjustment
      'https://twitter.com/sudomanoj'
    ],
    knowsAbout: ['Python', 'Django', 'FastAPI', 'React', 'JavaScript', 'AI/ML', 'Machine Learning'],
  }

  return (
    <html lang="en">
      <head>
        <meta name="ahrefs-site-verification" content="a1a26e1ccfd4dbdf5643cdffa0b49a82629bffe7b1f188a53fea5f29c3ef7939"></meta>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
