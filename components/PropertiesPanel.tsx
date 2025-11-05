interface PropertiesPanelProps {
  selectedObject: any
  onUpdateObject: (id: string, updates: any) => void
  gizmoMode: 'translate' | 'rotate' | 'scale'
  onSetGizmoMode: (mode: 'translate' | 'rotate' | 'scale') => void
}

export default function PropertiesPanel({
  selectedObject,
  onUpdateObject,
  gizmoMode,
  onSetGizmoMode
}: PropertiesPanelProps) {
  if (!selectedObject) {
    return (
      <div className="w-64 bg-card-background p-4">
        <p className="text-text-muted">Select an object to edit properties</p>
      </div>
    )
  }

  const updatePosition = (axis: string, value: number) => {
    onUpdateObject(selectedObject.id, {
      position: { ...selectedObject.position, [axis]: value }
    })
  }

  const updateColor = (color: string) => {
    onUpdateObject(selectedObject.id, { color })
  }

  return (
    <div className="w-64 bg-card-background p-4">
      <h3 className="text-lg font-semibold mb-4">Properties</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Gizmo Mode</label>
        <div className="flex space-x-2">
          <button
            onClick={() => onSetGizmoMode('translate')}
            className={`px-2 py-1 rounded ${gizmoMode === 'translate' ? 'bg-primary' : 'bg-gray-700'}`}
          >
            Move
          </button>
          <button
            onClick={() => onSetGizmoMode('rotate')}
            className={`px-2 py-1 rounded ${gizmoMode === 'rotate' ? 'bg-primary' : 'bg-gray-700'}`}
          >
            Rotate
          </button>
          <button
            onClick={() => onSetGizmoMode('scale')}
            className={`px-2 py-1 rounded ${gizmoMode === 'scale' ? 'bg-primary' : 'bg-gray-700'}`}
          >
            Scale
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Position</label>
        <div className="grid grid-cols-3 gap-2">
          <input
            type="number"
            value={selectedObject.position.x}
            onChange={(e) => updatePosition('x', parseFloat(e.target.value))}
            className="p-1 bg-gray-700 rounded"
            placeholder="X"
          />
          <input
            type="number"
            value={selectedObject.position.y}
            onChange={(e) => updatePosition('y', parseFloat(e.target.value))}
            className="p-1 bg-gray-700 rounded"
            placeholder="Y"
          />
          <input
            type="number"
            value={selectedObject.position.z}
            onChange={(e) => updatePosition('z', parseFloat(e.target.value))}
            className="p-1 bg-gray-700 rounded"
            placeholder="Z"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Color</label>
        <input
          type="color"
          value={selectedObject.color}
          onChange={(e) => updateColor(e.target.value)}
          className="w-full"
        />
      </div>
    </div>
  )
}