'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ProfilePage() {
  const [username, setUsername] = useState('User123')

  // Mock data
  const worlds = [
    { id: '1', title: 'My World 1', thumbnail: '/placeholder.jpg' },
    { id: '2', title: 'My World 2', thumbnail: '/placeholder.jpg' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl font-bold">U</span>
          </div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="text-center text-xl font-bold bg-transparent border-b border-gray-600 focus:border-primary outline-none"
          />
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">My Worlds</h2>
          <div className="grid grid-cols-2 gap-4">
            {worlds.map((world) => (
              <Link key={world.id} href={`/world/${world.id}`}>
                <div className="bg-card-background rounded-lg p-4 hover:bg-gray-700 transition-colors">
                  <div className="h-32 bg-gray-600 rounded mb-2 flex items-center justify-center">
                    <span className="text-text-muted">Thumbnail</span>
                  </div>
                  <h3 className="font-semibold">{world.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Badges</h2>
          <div className="flex space-x-2">
            <div className="bg-accent px-3 py-1 rounded-full text-sm">Creator</div>
            <div className="bg-secondary px-3 py-1 rounded-full text-sm">Explorer</div>
          </div>
        </div>
      </div>
    </div>
  )
}