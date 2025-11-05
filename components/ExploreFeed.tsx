'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, Eye } from 'lucide-react'

interface World {
  id: string
  title: string
  owner: string
  thumbnail: string
  likes: number
  visits: number
}

export default function ExploreFeed() {
  const [worlds, setWorlds] = useState<World[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  // Mock data for now
  const mockWorlds: World[] = [
    { id: '1', title: 'Fantasy Castle', owner: 'Alice', thumbnail: '/placeholder.jpg', likes: 42, visits: 120 },
    { id: '2', title: 'Space Station', owner: 'Bob', thumbnail: '/placeholder.jpg', likes: 28, visits: 95 },
    { id: '3', title: 'Underwater World', owner: 'Charlie', thumbnail: '/placeholder.jpg', likes: 35, visits: 78 },
  ]

  useEffect(() => {
    loadWorlds()
  }, [])

  const loadWorlds = () => {
    if (loading || !hasMore) return

    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setWorlds(prev => [...prev, ...mockWorlds])
      setLoading(false)
      setHasMore(false) // For demo
    }, 1000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Explore Worlds</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {worlds.map((world) => (
          <Link key={world.id} href={`/world/${world.id}`}>
            <div className="bg-card-background rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gray-700 flex items-center justify-center">
                <span className="text-text-muted">Thumbnail</span>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{world.title}</h3>
                <p className="text-text-muted mb-2">by {world.owner}</p>
                <div className="flex items-center space-x-4 text-sm text-text-muted">
                  <div className="flex items-center">
                    <Heart size={16} className="mr-1" />
                    {world.likes}
                  </div>
                  <div className="flex items-center">
                    <Eye size={16} className="mr-1" />
                    {world.visits}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {loading && <p className="text-center mt-8">Loading...</p>}
      {hasMore && !loading && (
        <button
          onClick={loadWorlds}
          className="block mx-auto mt-8 bg-primary px-6 py-3 rounded-lg"
        >
          Load More
        </button>
      )}
    </div>
  )
}