'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, Eye } from 'lucide-react'
import { getAllWorlds, getUser } from '../lib/dbUtils'

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

  const loadWorlds = useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)
    try {
      const allWorlds = await getAllWorlds()
      const worldsWithOwners = await Promise.all(
        allWorlds.map(async (world: any) => {
          const user = await getUser(world.ownerId)
          return {
            id: world.id,
            title: world.title,
            owner: user?.username || 'Anonymous',
            thumbnail: world.thumbnail || '/placeholder.jpg',
            likes: world.likes || 0,
            visits: world.visits || 0,
          }
        })
      )
      setWorlds(worldsWithOwners)
      setHasMore(false) // For now, load all
    } catch (error) {
      console.error('Failed to load worlds', error)
    } finally {
      setLoading(false)
    }
  }, [loading, hasMore])

  useEffect(() => {
    loadWorlds()
  }, [loadWorlds])

  const SkeletonCard = () => (
    <div className="bg-card-background rounded-lg overflow-hidden shadow-lg animate-pulse">
      <div className="h-48 bg-gray-700"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-700 rounded mb-2"></div>
        <div className="h-4 bg-gray-700 rounded mb-2 w-1/2"></div>
        <div className="flex space-x-4">
          <div className="h-4 bg-gray-700 rounded w-12"></div>
          <div className="h-4 bg-gray-700 rounded w-12"></div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Explore Worlds</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading && worlds.length === 0
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : worlds.map((world, index) => (
          <motion.div
            key={world.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href={`/world/${world.id}`}>
              <div className="bg-gray-800/90 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl border border-white/10 hover:shadow-purple-500/30 hover:scale-105 transition-all duration-300">
                <div className="h-48 bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-400">Thumbnail</span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 text-white">{world.title}</h3>
                  <p className="text-gray-400 mb-2">by {world.owner}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center">
                      <Heart size={16} className="mr-1 text-red-400" />
                      {world.likes}
                    </div>
                    <div className="flex items-center">
                      <Eye size={16} className="mr-1 text-blue-400" />
                      {world.visits}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      {loading && worlds.length > 0 && <p className="text-center mt-8">Loading more...</p>}
      {!loading && hasMore && (
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