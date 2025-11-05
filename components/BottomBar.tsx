export default function BottomBar() {
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

  const handleParticlesChange = (density: number) => {
    console.log('Particles density', density)
    // Update particles
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
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="50"
            onChange={(e) => handleParticlesChange(Number(e.target.value))}
            className="w-20"
          />
        </div>
      </div>
    </div>
  )
}