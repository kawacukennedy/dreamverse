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
      <div className="w-64 bg-gray-800/90 backdrop-blur-lg p-4 rounded-2xl shadow-2xl border border-white/10">
        <p className="text-gray-400">Select an object to edit properties</p>
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
    <div className="w-64 bg-gray-800/90 backdrop-blur-lg p-4 rounded-2xl shadow-2xl border border-white/10">
      <h3 className="text-lg font-semibold mb-4 text-white">Properties</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-white">Gizmo Mode</label>
        <div className="flex space-x-2">
          <button
            onClick={() => onSetGizmoMode('translate')}
            className={`px-3 py-2 rounded-lg text-white transition-all duration-300 hover:scale-105 ${gizmoMode === 'translate' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'}`}
            title="Move objects (G to cycle)"
          >
            Move
          </button>
          <button
            onClick={() => onSetGizmoMode('rotate')}
            className={`px-3 py-2 rounded-lg text-white transition-all duration-300 hover:scale-105 ${gizmoMode === 'rotate' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'}`}
            title="Rotate objects (G to cycle)"
          >
            Rotate
          </button>
          <button
            onClick={() => onSetGizmoMode('scale')}
            className={`px-3 py-2 rounded-lg text-white transition-all duration-300 hover:scale-105 ${gizmoMode === 'scale' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'}`}
            title="Scale objects (G to cycle)"
          >
            Scale
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-white">Position</label>
        <div className="grid grid-cols-3 gap-2">
          <input
            type="number"
            value={selectedObject.position.x}
            onChange={(e) => updatePosition('x', parseFloat(e.target.value))}
            className="p-2 bg-gray-700 text-white rounded-lg border border-gray-600"
            placeholder="X"
          />
          <input
            type="number"
            value={selectedObject.position.y}
            onChange={(e) => updatePosition('y', parseFloat(e.target.value))}
            className="p-2 bg-gray-700 text-white rounded-lg border border-gray-600"
            placeholder="Y"
          />
          <input
            type="number"
            value={selectedObject.position.z}
            onChange={(e) => updatePosition('z', parseFloat(e.target.value))}
            className="p-2 bg-gray-700 text-white rounded-lg border border-gray-600"
            placeholder="Z"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-white">Color</label>
        <input
          type="color"
          value={selectedObject.color}
          onChange={(e) => updateColor(e.target.value)}
          className="w-full h-10 rounded-lg border border-gray-600"
        />
      </div>
    </div>
  )
}