'use client'

import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Avatar3D from './Avatar3D'
import LayerSelector from './LayerSelector'
import ColorPicker from './ColorPicker'

interface AvatarData {
  layers: {
    hair: string
    eyes: string
    mouth: string
    clothes: string
    accessories: string[]
  }
  colors: {
    skin: string
    hair: string
    eyes: string
    clothes: string
  }
}

export default function AvatarBuilder() {
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
    // Implement randomization logic
    console.log('Randomize avatar')
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
          <button onClick={randomize} className="w-full bg-secondary text-white py-2 rounded">
            Randomize
          </button>
          <button onClick={saveAvatar} className="w-full bg-primary text-white py-2 rounded">
            Save Avatar
          </button>
        </div>
      </div>
    </div>
  )
}