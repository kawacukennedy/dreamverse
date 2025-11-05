'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, Eye } from 'lucide-react'
import { getAllWorlds, getUser } from '../lib/dbUtils'
import LoadingSpinner from './LoadingSpinner'

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
  const [hasMoreData, setHasMoreData] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [likedWorlds, setLikedWorlds] = useState<Set<string>>(new Set())
  const [sortBy, setSortBy] = useState<'likes' | 'visits' | 'recent'>('recent')
  const [filterBy, setFilterBy] = useState<'all' | 'liked'>('all')
  const itemsPerPage = 12

  const loadWorlds = useCallback(async () => {
    if (loading) return

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
      setHasMoreData(false)
    } catch (error) {
      console.error('Failed to load worlds', error)
    } finally {
      setLoading(false)
    }
  }, [loading])

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

  const processedWorlds = worlds
    .filter(world => {
      const matchesSearch = world.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        world.owner.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = filterBy === 'all' || likedWorlds.has(world.id)
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'likes':
          return (b.likes + (likedWorlds.has(b.id) ? 1 : 0)) - (a.likes + (likedWorlds.has(a.id) ? 1 : 0))
        case 'visits':
          return b.visits - a.visits
        case 'recent':
        default:
          return 0 // Assume already sorted by creation
      }
    })

  const displayedWorlds = processedWorlds

  const handleLike = (worldId: string) => {
    setLikedWorlds(prev => {
      const newSet = new Set(prev)
      if (newSet.has(worldId)) {
        newSet.delete(worldId)
      } else {
        newSet.add(worldId)
      }
      return newSet
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">Explore Worlds</h1>
      <div className="max-w-4xl mx-auto mb-8 space-y-4">
        <input
          type="text"
          placeholder="Search worlds or creators..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 bg-gray-800/90 backdrop-blur-lg text-white rounded-2xl border border-white/10 focus:border-purple-500 focus:outline-none transition-colors"
        />
        <div className="flex flex-wrap gap-4 justify-center">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-gray-800/90 backdrop-blur-lg text-white p-2 rounded-lg border border-white/10"
          >
            <option value="recent">Sort by Recent</option>
            <option value="likes">Sort by Likes</option>
            <option value="visits">Sort by Visits</option>
          </select>
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value as any)}
            className="bg-gray-800/90 backdrop-blur-lg text-white p-2 rounded-lg border border-white/10"
          >
            <option value="all">All Worlds</option>
            <option value="liked">Liked Worlds</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading && worlds.length === 0
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : processedWorlds.map((world, index) => (
            <motion.div
              key={world.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.05, y: -5 }}
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
                    <motion.button
                      onClick={(e) => { e.preventDefault(); handleLike(world.id) }}
                      className="flex items-center hover:text-red-400 transition-colors"
                      whileTap={{ scale: 1.2 }}
                    >
                      <motion.div
                        animate={{ scale: likedWorlds.has(world.id) ? [1, 1.2, 1] : 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Heart
                          size={16}
                          className={`mr-1 ${likedWorlds.has(world.id) ? 'text-red-500 fill-red-500' : 'text-red-400'}`}
                        />
                      </motion.div>
                      {world.likes + (likedWorlds.has(world.id) ? 1 : 0)}
                    </motion.button>
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
      {loading && worlds.length > 0 && (
        <div className="text-center mt-8">
          <LoadingSpinner />
          <p className="text-gray-400 mt-2">Loading more worlds...</p>
        </div>
      )}
    </div>
  )
}