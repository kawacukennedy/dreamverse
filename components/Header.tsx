'use client'

import { useState } from 'react'
import Link from 'next/link'
import { User, LogOut } from 'lucide-react'
import { useUserStore } from '../stores/userStore'
import AuthModal from './AuthModal'

export default function Header() {
  const { user, isLoggedIn, logout } = useUserStore()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <>
      <header className="flex items-center justify-between p-4 bg-card-background border-b border-gray-700">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            DreamVerse
          </Link>
        </div>
        <nav className="flex space-x-6">
          <Link href="/explore" className="text-text-light hover:text-accent">
            Explore
          </Link>
          {isLoggedIn && (
            <>
              <Link href="/create" className="text-text-light hover:text-accent">
                Create
              </Link>
              <Link href="/profile" className="text-text-light hover:text-accent">
                Profile
              </Link>
            </>
          )}
          <Link href="/leaderboard" className="text-text-light hover:text-accent">
            Leaderboard
          </Link>
          <Link href="/settings" className="text-text-light hover:text-accent">
            Settings
          </Link>
        </nav>
        <div className="flex items-center relative">
          {isLoggedIn ? (
            <div>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2"
              >
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <User size={20} />
                </div>
                <span>{user?.displayName || user?.username}</span>
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-card-background rounded-lg shadow-lg border border-gray-700">
                  <button
                    onClick={() => {
                      logout()
                      setShowDropdown(false)
                    }}
                    className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-700 rounded-lg"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-primary px-4 py-2 rounded"
            >
              Login
            </button>
          )}
        </div>
      </header>
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  )
}