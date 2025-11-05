import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ClientLayout from '../components/ClientLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DreamVerse',
  description: 'A frontend-only immersive social universe for teens to create, explore, and share 3D mini-worlds',
  manifest: '/manifest.json',
  other: {
    'google-analytics': 'G-XXXXXXXXXX', // Replace with actual GA ID
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}