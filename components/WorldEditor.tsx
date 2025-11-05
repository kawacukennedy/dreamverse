'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, TransformControls } from '@react-three/drei'
import { nanoid } from 'nanoid'
import { Mesh } from 'three'
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
  const [history, setHistory] = useState<SceneObject[][]>([[]])
  const [historyIndex, setHistoryIndex] = useState(0)
  const meshRefs = useRef<Map<string, Mesh>>(new Map())

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        if (event.key === 'z' && !event.shiftKey) {
          event.preventDefault()
          undo()
        } else if ((event.key === 'y') || (event.key === 'z' && event.shiftKey)) {
          event.preventDefault()
          redo()
        } else if (event.key === 's') {
          event.preventDefault()
          console.log('Save world')
        }
      } else if (event.key === 'Delete' && selectedObject) {
        event.preventDefault()
        deleteObject(selectedObject.id)
      } else if (event.key === 'g') {
        event.preventDefault()
        setGizmoMode(prev => {
          if (prev === 'translate') return 'rotate'
          if (prev === 'rotate') return 'scale'
          return 'translate'
        })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedObject, undo, redo, deleteObject])

  const saveToHistory = useCallback((newObjects: SceneObject[]) => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push([...newObjects])
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }, [history, historyIndex])

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setObjects([...history[historyIndex - 1]])
    }
  }, [history, historyIndex])

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setObjects([...history[historyIndex + 1]])
    }
  }, [history, historyIndex])

  const addObject = (object: SceneObject) => {
    const newObjects = [...objects, object]
    setObjects(newObjects)
    saveToHistory(newObjects)
  }

  const updateObject = (id: string, updates: Partial<SceneObject>) => {
    const newObjects = objects.map(obj => obj.id === id ? { ...obj, ...updates } : obj)
    setObjects(newObjects)
    saveToHistory(newObjects)
  }

  const deleteObject = useCallback((id: string) => {
    const newObjects = objects.filter(obj => obj.id !== id)
    setObjects(newObjects)
    if (selectedObject?.id === id) setSelectedObject(null)
    saveToHistory(newObjects)
  }, [objects, selectedObject, saveToHistory])

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
        onUndo={undo}
        onRedo={redo}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
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
                ref={(el) => {
                  if (el) meshRefs.current.set(obj.id, el)
                  else meshRefs.current.delete(obj.id)
                }}
                position={[obj.position.x, obj.position.y, obj.position.z]}
                rotation={[obj.rotation.x, obj.rotation.y, obj.rotation.z]}
                scale={[obj.scale.x, obj.scale.y, obj.scale.z]}
                onClick={() => setSelectedObject(obj)}
              >
                {obj.assetKey === 'cube' && <boxGeometry args={[1, 1, 1]} />}
                {obj.assetKey === 'sphere' && <sphereGeometry args={[0.5, 32, 32]} />}
                {obj.assetKey === 'cylinder' && <cylinderGeometry args={[0.5, 0.5, 1, 32]} />}
                {obj.assetKey === 'cone' && <coneGeometry args={[0.5, 1, 32]} />}
                {obj.assetKey === 'torus' && <torusGeometry args={[0.5, 0.2, 16, 32]} />}
                <meshStandardMaterial color={obj.color} />
              </mesh>
            ))}
            {selectedObject && (
              <TransformControls
                object={meshRefs.current.get(selectedObject.id)}
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