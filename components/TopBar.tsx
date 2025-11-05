interface TopBarProps {
  onSave: () => void
  onExport: () => void
  onImport: (event: React.ChangeEvent<HTMLInputElement>) => void
  onShare: () => void
}

export default function TopBar({ onSave, onExport, onImport, onShare }: TopBarProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-card-background border-b border-gray-700">
      <div className="flex space-x-2">
        <button onClick={onSave} className="bg-primary px-4 py-2 rounded">
          Save
        </button>
        <button onClick={onExport} className="bg-accent px-4 py-2 rounded">
          Export JSON
        </button>
        <label className="bg-secondary px-4 py-2 rounded cursor-pointer">
          Import JSON
          <input type="file" accept=".json" onChange={onImport} className="hidden" />
        </label>
      </div>
      <button onClick={onShare} className="bg-primary px-4 py-2 rounded">
        Share Link
      </button>
    </div>
  )
}