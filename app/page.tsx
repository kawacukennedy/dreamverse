export default function Home() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center max-w-4xl mx-auto px-4">
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Welcome to DreamVerse
        </h1>
        <p className="text-xl text-gray-300 mb-12 leading-relaxed">
          Unleash your creativity in a immersive 3D universe. Build, explore, and share stunning mini-worlds with friends.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <a
            href="/explore"
            className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-purple-500/25 shadow-lg"
          >
            🌍 Explore Worlds
          </a>
          <a
            href="/create"
            className="bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-green-500/25 shadow-lg"
          >
            🎨 Create Your World
          </a>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-2xl border border-white/10">
            <div className="text-3xl mb-4">🚀</div>
            <h3 className="text-lg font-semibold mb-2">Easy to Use</h3>
            <p className="text-gray-400">Drag-and-drop interface for quick world building</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-2xl border border-white/10">
            <div className="text-3xl mb-4">🎵</div>
            <h3 className="text-lg font-semibold mb-2">Fully Featured</h3>
            <p className="text-gray-400">Backgrounds, music, particles, and more</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-2xl border border-white/10">
            <div className="text-3xl mb-4">📱</div>
            <h3 className="text-lg font-semibold mb-2">Share Anywhere</h3>
            <p className="text-gray-400">Generate links to share your creations</p>
          </div>
        </div>
      </div>
    </div>
  )
}