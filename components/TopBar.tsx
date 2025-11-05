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
    <div className="flex items-center justify-between p-4 bg-gray-800/90 backdrop-blur-lg border-b border-white/10">
      <div className="flex space-x-2">
        <button onClick={onUndo} disabled={!canUndo} className="bg-gray-600 text-white px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-gray-500 transition-all duration-300 hover:scale-105" title="Undo last action (Ctrl+Z)">
          Undo
        </button>
        <button onClick={onRedo} disabled={!canRedo} className="bg-gray-600 text-white px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-gray-500 transition-all duration-300 hover:scale-105" title="Redo last undone action (Ctrl+Y)">
          Redo
        </button>
        <button onClick={onSave} className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-500 transition-all duration-300 hover:scale-105" title="Save world to browser storage">
          Save
        </button>
        <button onClick={onExport} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition-all duration-300 hover:scale-105" title="Download world as JSON file">
          Export JSON
        </button>
        <label className="bg-pink-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-pink-500 transition-all duration-300 hover:scale-105" title="Upload and load a JSON world file">
          Import JSON
          <input type="file" accept=".json" onChange={onImport} className="hidden" />
        </label>
      </div>
      <button onClick={onShare} className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-500 transition-all duration-300 hover:scale-105" title="Generate and copy shareable world link">
        Share Link
      </button>
    </div>
  )
}