'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, TransformControls, Stars } from '@react-three/drei'
import { nanoid } from 'nanoid'
import { Mesh } from 'three'
import { saveWorld } from '../lib/dbUtils'
import ObjectPalette from './ObjectPalette'
import PropertiesPanel from './PropertiesPanel'
import TopBar from './TopBar'
import BottomBar from './BottomBar'

/**
 * Represents a 3D object in the scene
 */
interface SceneObject {
  /** Unique identifier for the object */
  id: string
  /** Type of object behavior */
  type: 'static' | 'animated' | 'interactive'
  /** Key identifying the 3D asset/mesh type */
  assetKey: string
  /** 3D position coordinates */
  position: { x: number; y: number; z: number }
  /** 3D rotation angles in radians */
  rotation: { x: number; y: number; z: number }
  /** 3D scale factors */
  scale: { x: number; y: number; z: number }
  /** Hex color string */
  color: string
  /** Additional properties for special behaviors */
  props: object
}

/**
 * Main 3D world editor component with object manipulation, undo/redo, and real-time controls
 *
 * Features:
 * - Drag-and-drop object placement from palette
 * - Gizmo controls for translation, rotation, and scaling
 * - Undo/redo system with history tracking
 * - Keyboard shortcuts for efficient editing
 * - Particle systems and background controls
 * - JSON export/import functionality
 * - Shareable world links
 */
export default function WorldEditor() {
  const [objects, setObjects] = useState<SceneObject[]>([])
  const [selectedObject, setSelectedObject] = useState<SceneObject | null>(null)
  const [gizmoMode, setGizmoMode] = useState<'translate' | 'rotate' | 'scale'>('translate')
  const [history, setHistory] = useState<SceneObject[][]>([[]])
  const [historyIndex, setHistoryIndex] = useState(0)
  const [particles, setParticles] = useState({ enabled: false, count: 100, color: '#ffffff' })
  const meshRefs = useRef<Map<string, Mesh>>(new Map())

  /**
   * Saves the current state of objects to the undo history
   * @param newObjects - Array of scene objects to save
   */
  const saveToHistory = useCallback((newObjects: SceneObject[]) => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push([...newObjects])
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }, [history, historyIndex])

  /**
   * Reverts to the previous state in the history
   */
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setObjects([...history[historyIndex - 1]])
    }
  }, [history, historyIndex])

  /**
   * Advances to the next state in the history
   */
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

  const generateShareLink = async () => {
    const worldId = nanoid(12)
    const worldData = {
      id: worldId,
      title: 'My DreamVerse World',
      description: 'Check out this amazing 3D world I created!',
      objects,
      createdAt: new Date().toISOString(),
      author: 'Anonymous', // Could get from user store
    }

    // Save to IndexedDB
    await saveWorld(worldData)

    const shareUrl = `${window.location.origin}/world/${worldId}`
    const shareText = `Check out my DreamVerse world: ${worldData.title}\n${shareUrl}`

    if (navigator.share) {
      navigator.share({
        title: worldData.title,
        text: worldData.description,
        url: shareUrl,
      })
    } else {
      navigator.clipboard.writeText(shareText)
      alert('Share link copied to clipboard!')
    }
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
                {obj.assetKey === 'pyramid' && <coneGeometry args={[0.7, 1.2, 4]} />}
                {obj.assetKey === 'ring' && <torusGeometry args={[0.5, 0.1, 8, 16]} />}
                {obj.assetKey === 'capsule' && <capsuleGeometry args={[0.5, 1, 4, 8]} />}
                <meshStandardMaterial color={obj.color} />
              </mesh>
            ))}
            {selectedObject && (
              <TransformControls
                object={meshRefs.current.get(selectedObject.id)}
                mode={gizmoMode}
              />
            )}
            {particles.enabled && (
              <Stars
                radius={100}
                depth={50}
                count={particles.count}
                factor={4}
                saturation={0}
                fade
                speed={1}
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
      <BottomBar particles={particles} onUpdateParticles={setParticles} />
    </div>
  )
}