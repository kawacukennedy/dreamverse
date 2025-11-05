import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Volume2, VolumeX, Moon, Sun } from 'lucide-react'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  if (!isOpen) return null

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gray-800/95 backdrop-blur-lg p-8 rounded-2xl max-w-md w-full mx-4 border border-white/10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {soundEnabled ? <Volume2 size={20} className="text-green-400" /> : <VolumeX size={20} className="text-gray-400" />}
              <span className="text-white">Sound Effects</span>
            </div>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`w-12 h-6 rounded-full transition-colors ${soundEnabled ? 'bg-green-500' : 'bg-gray-600'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${soundEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {theme === 'dark' ? <Moon size={20} className="text-purple-400" /> : <Sun size={20} className="text-yellow-400" />}
              <span className="text-white">Theme</span>
            </div>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as 'dark' | 'light')}
              className="bg-gray-700 text-white p-2 rounded-lg border border-gray-600"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>

          <div className="pt-4 border-t border-gray-700">
            <button
              onClick={() => {
                localStorage.clear()
                window.location.reload()
              }}
              className="w-full bg-red-600 hover:bg-red-500 text-white py-2 rounded-lg transition-colors"
            >
              Reset All Data
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}