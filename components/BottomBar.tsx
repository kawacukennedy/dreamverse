export default function BottomBar() {
  return (
    <div className="flex items-center justify-between p-4 bg-card-background border-t border-gray-700">
      <div className="flex space-x-4">
        <div>
          <label className="block text-sm">Background</label>
          <select className="bg-gray-700 p-1 rounded">
            <option>Gradient</option>
            <option>Image</option>
            <option>Skybox</option>
          </select>
        </div>
        <div>
          <label className="block text-sm">Music</label>
          <input type="file" accept="audio/*" className="text-sm" />
        </div>
        <div>
          <label className="block text-sm">Particles</label>
          <input type="range" min="0" max="100" className="w-20" />
        </div>
      </div>
    </div>
  )
}