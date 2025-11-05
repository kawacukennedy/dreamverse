interface TopBarProps {
  onSave: () => void
  onExport: () => void
  onImport: (event: React.ChangeEvent<HTMLInputElement>) => void
  onShare: () => void
  onUndo: () => void
  onRedo: () => void
  canUndo: boolean
  canRedo: boolean
}

export default function TopBar({ onSave, onExport, onImport, onShare, onUndo, onRedo, canUndo, canRedo }: TopBarProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
      <div className="flex space-x-2">
        <button onClick={onUndo} disabled={!canUndo} className="bg-gray-600 text-white px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-gray-500 transition-all duration-300 hover:scale-105">
          Undo
        </button>
        <button onClick={onRedo} disabled={!canRedo} className="bg-gray-600 text-white px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-gray-500 transition-all duration-300 hover:scale-105">
          Redo
        </button>
        <button onClick={onSave} className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-500 transition-all duration-300 hover:scale-105">
          Save
        </button>
        <button onClick={onExport} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition-all duration-300 hover:scale-105">
          Export JSON
        </button>
        <label className="bg-pink-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-pink-500 transition-all duration-300 hover:scale-105">
          Import JSON
          <input type="file" accept=".json" onChange={onImport} className="hidden" />
        </label>
      </div>
      <button onClick={onShare} className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-500 transition-all duration-300 hover:scale-105">
        Share Link
      </button>
    </div>
  )
}