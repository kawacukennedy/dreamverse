import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center max-w-4xl mx-auto px-4">
        <motion.h1
          className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to DreamVerse
        </motion.h1>
        <motion.p
          className="text-xl text-gray-300 mb-12 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Unleash your creativity in a immersive 3D universe. Build, explore, and share stunning mini-worlds with friends.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <motion.a
            href="/explore"
            className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            🌍 Explore Worlds
          </motion.a>
          <motion.a
            href="/create"
            className="bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(34, 197, 94, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            🎨 Create Your World
          </motion.a>
        </motion.div>
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <motion.div
            className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-2xl border border-white/10"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="text-3xl mb-4">🚀</div>
            <h3 className="text-lg font-semibold mb-2">Easy to Use</h3>
            <p className="text-gray-400">Drag-and-drop interface for quick world building</p>
          </motion.div>
          <motion.div
            className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-2xl border border-white/10"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="text-3xl mb-4">🎵</div>
            <h3 className="text-lg font-semibold mb-2">Fully Featured</h3>
            <p className="text-gray-400">Backgrounds, music, particles, and more</p>
          </motion.div>
          <motion.div
            className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-2xl border border-white/10"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="text-3xl mb-4">📱</div>
            <h3 className="text-lg font-semibold mb-2">Share Anywhere</h3>
            <p className="text-gray-400">Generate links to share your creations</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}