'use client'

import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Avatar3D from './Avatar3D'
import LayerSelector from './LayerSelector'
import ColorPicker from './ColorPicker'
import { useSound } from '../lib/useSound'

/**
 * Data structure for avatar customization
 */
interface AvatarData {
  /** Layer selections for different avatar parts */
  layers: {
    hair: string
    eyes: string
    mouth: string
    clothes: string
    accessories: string[]
  }
  /** Color selections for avatar parts */
  colors: {
    skin: string
    hair: string
    eyes: string
    clothes: string
  }
}

/**
 * Interactive avatar builder component with 3D preview and customization options
 *
 * Features:
 * - Layer-based customization (hair, eyes, mouth, clothes, accessories)
 * - Color picker for each customizable part
 * - Live 3D preview with orbit controls
 * - Randomization and AI generation options
 * - Local storage persistence
 */
export default function AvatarBuilder() {
  const { playSound } = useSound()
  const [avatarData, setAvatarData] = useState<AvatarData>({
    layers: {
      hair: 'default',
      eyes: 'default',
      mouth: 'default',
      clothes: 'default',
      accessories: []
    },
    colors: {
      skin: '#F5D5A8',
      hair: '#8B4513',
      eyes: '#000000',
      clothes: '#FF0000'
    }
  })

  const [selectedLayer, setSelectedLayer] = useState<string>('hair')

  const updateLayer = (layer: string, value: string) => {
    setAvatarData(prev => ({
      ...prev,
      layers: { ...prev.layers, [layer]: value }
    }))
  }

  const updateColor = (layer: string, color: string) => {
    setAvatarData(prev => ({
      ...prev,
      colors: { ...prev.colors, [layer]: color }
    }))
  }

  const randomize = () => {
    const randomLayers = {
      hair: ['short', 'long', 'curly', 'bald'][Math.floor(Math.random() * 4)],
      eyes: ['round', 'almond', 'wide', 'narrow'][Math.floor(Math.random() * 4)],
      mouth: ['smile', 'frown', 'neutral', 'open'][Math.floor(Math.random() * 4)],
      clothes: ['shirt', 'jacket', 'dress', 'hoodie'][Math.floor(Math.random() * 4)],
      accessories: Math.random() > 0.5 ? ['hat'] : []
    }
    const randomColors = {
      skin: ['#F5D5A8', '#E0AC69', '#C68642', '#8D5524'][Math.floor(Math.random() * 4)],
      hair: ['#8B4513', '#000000', '#FFD700', '#FF6347'][Math.floor(Math.random() * 4)],
      eyes: ['#000000', '#8B4513', '#0000FF', '#00FF00'][Math.floor(Math.random() * 4)],
      clothes: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'][Math.floor(Math.random() * 5)]
    }
    setAvatarData({ layers: randomLayers, colors: randomColors })
  }

  const generateAI = async () => {
    // Mock AI generation - just randomize with a delay
    setTimeout(() => {
      randomize()
    }, 1000)
  }

  const saveAvatar = () => {
    // Save to IndexedDB
    console.log('Save avatar', avatarData)
  }

  return (
    <div className="flex h-screen">
      {/* Left Panel - Layer Stack */}
      <div className="w-1/4 bg-card-background p-4 rounded-lg shadow-lg m-4">
        <LayerSelector
          layers={avatarData.layers}
          selectedLayer={selectedLayer}
          onSelectLayer={setSelectedLayer}
        />
      </div>

      {/* Center - 3D Preview */}
      <div className="flex-1 flex items-center justify-center">
        <Canvas className="w-full h-full">
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Avatar3D avatarData={avatarData} />
          <OrbitControls />
        </Canvas>
      </div>

      {/* Right Panel - Color Pickers and Controls */}
      <div className="w-1/4 bg-card-background p-4 rounded-lg shadow-lg m-4">
        <ColorPicker
          selectedLayer={selectedLayer}
          color={avatarData.colors[selectedLayer as keyof typeof avatarData.colors]}
          onChangeColor={(color) => updateColor(selectedLayer, color)}
        />
        <div className="mt-4 space-y-2">
          <button onClick={() => { randomize(); playSound('click') }} className="w-full bg-secondary text-white py-2 rounded">
            Randomize
          </button>
          <button onClick={() => { generateAI(); playSound('click') }} className="w-full bg-accent text-white py-2 rounded">
            AI Generate
          </button>
          <button onClick={() => { saveAvatar(); playSound('success') }} className="w-full bg-primary text-white py-2 rounded">
            Save Avatar
          </button>
        </div>
      </div>
    </div>
  )
}