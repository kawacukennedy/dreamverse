'use client'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { useState, useEffect, Suspense } from 'react'
import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Tutorial from '../components/Tutorial'
import ErrorBoundary from '../components/ErrorBoundary'
import ShortcutsModal from '../components/ShortcutsModal'
import { useUIStore } from '../stores/uiStore'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [showTutorial, setShowTutorial] = useState(false)
  const [showShortcuts, setShowShortcuts] = useState(false)
  const { theme, setModal } = useUIStore()

  useEffect(() => {
    const tutorialCompleted = localStorage.getItem('dreamverse_tutorial_completed')
    if (!tutorialCompleted) {
      setShowTutorial(true)
    }

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => console.log('SW registered'))
        .catch((error) => console.log('SW registration failed'))
    }

    // Apply theme
    document.documentElement.classList.toggle('light', theme === 'light')

    // Global keyboard shortcuts
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '?') {
        event.preventDefault()
        setShowShortcuts(true)
      } else if (event.ctrlKey || event.metaKey) {
        if (event.key === 'k') {
          event.preventDefault()
          // Quick search - could implement later
          console.log('Quick search')
        }
      } else if (event.key === 'Escape') {
        setShowShortcuts(false)
        // Close any open modals
        setModal('auth', false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [theme, setModal])

  const handleTutorialComplete = () => {
    setShowTutorial(false)
    localStorage.setItem('dreamverse_tutorial_completed', 'true')
  }

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <ErrorBoundary>
          <div className="min-h-screen flex flex-col">
            <Header />
            <Suspense fallback={<div className="flex-1 flex items-center justify-center">Loading...</div>}>
              <main className="flex-1">{children}</main>
            </Suspense>
          <Footer />
          {showTutorial && <Tutorial onComplete={handleTutorialComplete} />}
          <ShortcutsModal isOpen={showShortcuts} onClose={() => setShowShortcuts(false)} />
        </div>
      </body>
    </html>
  )
}