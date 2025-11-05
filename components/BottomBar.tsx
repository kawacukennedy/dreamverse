interface BottomBarProps {
  particles: { enabled: boolean; count: number; color: string }
  onUpdateParticles: (particles: { enabled: boolean; count: number; color: string }) => void
  background: { type: string; value: string }
  onUpdateBackground: (background: { type: string; value: string }) => void
  music: string | null
  onUpdateMusic: (music: string | null) => void
}

export default function BottomBar({ particles, onUpdateParticles, background, onUpdateBackground, music, onUpdateMusic }: BottomBarProps) {
  const handleBackgroundChange = (type: string) => {
    let value = background.value
    if (type === 'gradient') value = '#0B0B0F'
    else if (type === 'image') value = '' // placeholder
    else if (type === 'skybox') value = '' // placeholder
    onUpdateBackground({ type, value })
  }

  const handleMusicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      onUpdateMusic(url)
    }
  }



  return (
    <div className="flex items-center justify-between p-4 bg-card-background border-t border-gray-700">
      <div className="flex space-x-4">
        <div>
          <label className="block text-sm">Background</label>
          <select
            value={background.type}
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