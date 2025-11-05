'use client'

import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Heart, Volume2, VolumeX, Share } from 'lucide-react'
import { useWorldStore } from '../stores/worldStore'

interface WorldViewerProps {
  worldId: string
}

export default function WorldViewer({ worldId }: WorldViewerProps) {
  const [liked, setLiked] = useState(false)
  const [muted, setMuted] = useState(false)
  const { visitWorld, likeWorld } = useWorldStore()

  useEffect(() => {
    visitWorld(worldId)
  }, [worldId, visitWorld])

  // Mock world data
  const world = {
    title: 'Sample World',
    objects: [
      { id: '1', position: [0, 0, 0], color: '#ff0000' },
      { id: '2', position: [2, 0, 0], color: '#00ff00' },
    ]
  }

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
    navigator.share?.({
      title: world.title,
      url: window.location.href
    })
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
        {world.objects.map((obj: any) => (
          <mesh key={obj.id} position={obj.position}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={obj.color} />
          </mesh>
        ))}
        <OrbitControls />
      </Canvas>
    </div>
  )
}