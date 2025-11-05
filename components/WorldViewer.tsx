'use client'

import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Heart, Volume2, VolumeX, Share } from 'lucide-react'
import { useWorldStore } from '../stores/worldStore'
import { getWorld } from '../lib/dbUtils'

interface WorldViewerProps {
  worldId: string
}

export default function WorldViewer({ worldId }: WorldViewerProps) {
  const [liked, setLiked] = useState(false)
  const [muted, setMuted] = useState(false)
  const [world, setWorld] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { visitWorld, likeWorld } = useWorldStore()

  useEffect(() => {
    const loadWorld = async () => {
      try {
        const worldData = await getWorld(worldId)
        if (worldData) {
          setWorld(worldData)
        } else {
          // Mock data if not found
          setWorld({
            title: 'Shared World',
            objects: [
              { id: '1', position: [0, 0, 0], color: '#ff0000' },
              { id: '2', position: [2, 0, 0], color: '#00ff00' },
            ]
          })
        }
      } catch (error) {
        console.error('Error loading world:', error)
      } finally {
        setLoading(false)
      }
    }

    loadWorld()
    visitWorld(worldId)
  }, [worldId, visitWorld])

  const handleLike = () => {
    if (!liked) {
      likeWorld(worldId)
    }
    setLiked(!liked)
  }

  const handleMute = () => {
    setMuted(!muted)
  }

  const handleShare = () => {
    const shareUrl = window.location.href
    const shareText = `Check out this DreamVerse world: ${world?.title || 'Amazing 3D World'}\n${shareUrl}`

    if (navigator.share) {
      navigator.share({
        title: world?.title || 'DreamVerse World',
        text: world?.description || 'Check out this amazing 3D world!',
        url: shareUrl,
      })
    } else {
      navigator.clipboard.writeText(shareText)
      alert('Share link copied to clipboard!')
    }
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading world...</p>
        </div>
      </div>
    )
  }

  if (!world) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">World Not Found</h1>
          <p className="text-text-muted">This world may have been deleted or the link is invalid.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-screen">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4">
        <h1 className="text-xl font-bold">{world.title}</h1>
        <div className="flex space-x-4">
          <button onClick={handleLike} className="p-2 rounded bg-card-background">
            <Heart size={24} className={liked ? 'text-red-500 fill-current' : ''} />
          </button>
          <button onClick={handleMute} className="p-2 rounded bg-card-background">
            {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
          <button onClick={handleShare} className="p-2 rounded bg-card-background">
            <Share size={24} />
          </button>
        </div>
      </div>

      {/* 3D Scene */}
      <Canvas className="w-full h-full">
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        {world.objects?.map((obj: any) => (
          <mesh key={obj.id} position={obj.position || [0, 0, 0]}>
            {obj.assetKey === 'cube' && <boxGeometry args={[1, 1, 1]} />}
            {obj.assetKey === 'sphere' && <sphereGeometry args={[0.5, 32, 32]} />}
            {obj.assetKey === 'cylinder' && <cylinderGeometry args={[0.5, 0.5, 1, 32]} />}
            {obj.assetKey === 'cone' && <coneGeometry args={[0.5, 1, 32]} />}
            {obj.assetKey === 'torus' && <torusGeometry args={[0.5, 0.2, 16, 32]} />}
            {obj.assetKey === 'pyramid' && <coneGeometry args={[0.7, 1.2, 4]} />}
            {obj.assetKey === 'ring' && <torusGeometry args={[0.5, 0.1, 8, 16]} />}
            {obj.assetKey === 'capsule' && <capsuleGeometry args={[0.5, 1, 4, 8]} />}
            <meshStandardMaterial color={obj.color || '#ffffff'} />
          </mesh>
        ))}
        <OrbitControls />
      </Canvas>
    </div>
  )
}