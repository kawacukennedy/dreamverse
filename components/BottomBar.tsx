interface BottomBarProps {
  particles: { enabled: boolean; count: number; color: string }
  onUpdateParticles: (particles: { enabled: boolean; count: number; color: string }) => void
}

export default function BottomBar({ particles, onUpdateParticles }: BottomBarProps) {
  const handleBackgroundChange = (bg: string) => {
    console.log('Background changed to', bg)
    // Update world background
  }

  const handleMusicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      console.log('Music selected', file.name)
      // Load and play music
    }
  }



  return (
    <div className="flex items-center justify-between p-4 bg-card-background border-t border-gray-700">
      <div className="flex space-x-4">
        <div>
          <label className="block text-sm">Background</label>
          <select
            onChange={(e) => handleBackgroundChange(e.target.value)}
            className="bg-gray-700 p-1 rounded"
          >
            <option value="gradient">Gradient</option>
            <option value="image">Image</option>
            <option value="skybox">Skybox</option>
          </select>
        </div>
        <div>
          <label className="block text-sm">Music</label>
          <input
            type="file"
            accept="audio/*"
            onChange={handleMusicChange}
            className="text-sm bg-gray-700 p-1 rounded"
          />
        </div>
        <div>
          <label className="block text-sm">Particles</label>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={particles.enabled}
              onChange={(e) => onUpdateParticles({ ...particles, enabled: e.target.checked })}
            />
            <span>Enabled</span>
          </div>
          <input
            type="range"
            min="10"
            max="500"
            value={particles.count}
            onChange={(e) => onUpdateParticles({ ...particles, count: Number(e.target.value) })}
            className="w-20"
            disabled={!particles.enabled}
          />
          <input
            type="color"
            value={particles.color}
            onChange={(e) => onUpdateParticles({ ...particles, color: e.target.value })}
            disabled={!particles.enabled}
          />
        </div>
      </div>
    </div>
  )
}