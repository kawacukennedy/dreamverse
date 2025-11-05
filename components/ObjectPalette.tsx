import { nanoid } from 'nanoid'

interface ObjectPaletteProps {
  onAddObject: (object: any) => void
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

  const addObject = (objType: any) => {
    const newObject = {
      id: nanoid(),
      type: objType.type,
      assetKey: objType.assetKey,
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 },
      color: '#ffffff',
      props: {},
    }
    onAddObject(newObject)
  }

  return (
    <div className="w-64 bg-card-background p-4">
      <h3 className="text-lg font-semibold mb-4">Object Palette</h3>
      <div className="space-y-2">
        {objectTypes.map((obj) => (
          <button
            key={obj.assetKey}
            onClick={() => addObject(obj)}
            className="w-full text-left p-2 bg-gray-700 rounded hover:bg-gray-600"
          >
            {obj.name}
          </button>
        ))}
      </div>
    </div>
  )
}