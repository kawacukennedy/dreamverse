'use client'

import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, TransformControls } from '@react-three/drei'
import { nanoid } from 'nanoid'
import ObjectPalette from './ObjectPalette'
import PropertiesPanel from './PropertiesPanel'
import TopBar from './TopBar'
import BottomBar from './BottomBar'

interface SceneObject {
  id: string
  type: 'static' | 'animated' | 'interactive'
  assetKey: string
  position: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number }
  scale: { x: number; y: number; z: number }
  color: string
  props: object
}

export default function WorldEditor() {
  const [objects, setObjects] = useState<SceneObject[]>([])
  const [selectedObject, setSelectedObject] = useState<SceneObject | null>(null)
  const [gizmoMode, setGizmoMode] = useState<'translate' | 'rotate' | 'scale'>('translate')

  const addObject = (object: SceneObject) => {
    setObjects(prev => [...prev, object])
  }

  const updateObject = (id: string, updates: Partial<SceneObject>) => {
    setObjects(prev => prev.map(obj => obj.id === id ? { ...obj, ...updates } : obj))
  }

  const deleteObject = (id: string) => {
    setObjects(prev => prev.filter(obj => obj.id !== id))
    if (selectedObject?.id === id) setSelectedObject(null)
  }

  const exportWorld = () => {
    const worldData = {
      id: nanoid(),
      title: 'My World',
      objects,
      // Add other properties
    }
    const dataStr = JSON.stringify(worldData, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    const exportFileDefaultName = 'world.json'
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const importWorld = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const worldData = JSON.parse(e.target?.result as string)
          setObjects(worldData.objects || [])
        } catch (error) {
          alert('Invalid JSON file')
        }
      }
      reader.readAsText(file)
    }
  }

  const generateShareLink = () => {
    const worldId = nanoid(12)
    // Save world with this id
    const shareUrl = `${window.location.origin}/world/${worldId}`
    navigator.clipboard.writeText(shareUrl)
    alert('Share link copied to clipboard!')
  }

  return (
    <div className="h-screen flex flex-col">
      <TopBar
        onSave={() => console.log('Save world')}
        onExport={exportWorld}
        onImport={importWorld}
        onShare={generateShareLink}
      />
      <div className="flex flex-1">
        <ObjectPalette onAddObject={addObject} />
        <div className="flex-1 relative">
          <Canvas className="w-full h-full">
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            {objects.map((obj) => (
              <mesh
                key={obj.id}
                position={[obj.position.x, obj.position.y, obj.position.z]}
                rotation={[obj.rotation.x, obj.rotation.y, obj.rotation.z]}
                scale={[obj.scale.x, obj.scale.y, obj.scale.z]}
                onClick={() => setSelectedObject(obj)}
              >
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={obj.color} />
              </mesh>
            ))}
            {selectedObject && (
              <TransformControls
                object={undefined} // Need to attach to the selected mesh
                mode={gizmoMode}
              />
            )}
            <OrbitControls />
          </Canvas>
        </div>
        <PropertiesPanel
          selectedObject={selectedObject}
          onUpdateObject={updateObject}
          gizmoMode={gizmoMode}
          onSetGizmoMode={setGizmoMode}
        />
      </div>
      <BottomBar />
    </div>
  )
}