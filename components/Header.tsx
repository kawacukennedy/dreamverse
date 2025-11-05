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
      <header className="flex items-center justify-between p-4 bg-gray-800/90 backdrop-blur-lg border-b border-white/10">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-purple-400 hover:text-purple-300 transition-colors">
            DreamVerse
          </Link>
        </div>
        <nav className="flex space-x-6">
          <Link href="/explore" className="text-white hover:text-green-400 transition-colors">
            Explore
          </Link>
          {isLoggedIn && (
            <>
              <Link href="/create" className="text-white hover:text-green-400 transition-colors">
                Create
              </Link>
              <Link href="/profile" className="text-white hover:text-green-400 transition-colors">
                Profile
              </Link>
            </>
          )}
          <Link href="/leaderboard" className="text-white hover:text-green-400 transition-colors">
            Leaderboard
          </Link>
          <Link href="/settings" className="text-white hover:text-green-400 transition-colors">
            Settings
          </Link>
        </nav>
        <div className="flex items-center relative">
          {isLoggedIn ? (
            <div>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-lg transition-colors"
              >
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                  <User size={20} className="text-white" />
                </div>
                <span className="text-white">{user?.displayName || user?.username}</span>
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800/95 backdrop-blur-lg rounded-lg shadow-2xl border border-white/10">
                  <button
                    onClick={() => {
                      logout()
                      setShowDropdown(false)
                    }}
                    className="flex items-center w-full px-4 py-2 text-left text-white hover:bg-gray-700 rounded-lg transition-colors"
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
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-500 transition-all duration-300 hover:scale-105"
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