import { nanoid } from 'nanoid'
import { useDrag } from 'react-dnd'

interface ObjectPaletteProps {
  onAddObject: (object: any) => void
}

interface DraggableObjectProps {
  obj: { name: string; type: string; assetKey: string }
}

function DraggableObject({ obj }: DraggableObjectProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'object',
    item: { objType: obj },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  return (
    <button
      ref={drag as any}
      className={`w-full text-left p-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 hover:scale-105 transition-all duration-300 cursor-move ${isDragging ? 'opacity-50' : ''}`}
      aria-label={`Add ${obj.name} object to scene`}
      role="button"
    >
      {obj.name}
    </button>
  )
}

export default function ObjectPalette({ onAddObject }: ObjectPaletteProps) {
  const objectTypes = [
    { name: 'Cube', type: 'static', assetKey: 'cube' },
    { name: 'Sphere', type: 'static', assetKey: 'sphere' },
    { name: 'Cylinder', type: 'static', assetKey: 'cylinder' },
    { name: 'Cone', type: 'static', assetKey: 'cone' },
    { name: 'Torus', type: 'static', assetKey: 'torus' },
    { name: 'Pyramid', type: 'static', assetKey: 'pyramid' },
    { name: 'Ring', type: 'static', assetKey: 'ring' },
    { name: 'Capsule', type: 'static', assetKey: 'capsule' },
  ]

  return (
    <div className="w-64 bg-gray-800 p-4 rounded-2xl shadow-2xl border border-gray-700">
      <h3 className="text-lg font-semibold mb-4 text-white">Object Palette</h3>
      <div className="space-y-2">
        {objectTypes.map((obj) => (
          <DraggableObject key={obj.assetKey} obj={obj} />
        ))}
      </div>
    </div>
  )
}