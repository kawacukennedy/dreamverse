'use client'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'
import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Tutorial from '../components/Tutorial'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [showTutorial, setShowTutorial] = useState(false)

  useEffect(() => {
    const tutorialCompleted = localStorage.getItem('dreamverse_tutorial_completed')
    if (!tutorialCompleted) {
      setShowTutorial(true)
    }
  }, [])

  const handleTutorialComplete = () => {
    setShowTutorial(false)
    localStorage.setItem('dreamverse_tutorial_completed', 'true')
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          {showTutorial && <Tutorial onComplete={handleTutorialComplete} />}
        </div>
      </body>
    </html>
  )
}