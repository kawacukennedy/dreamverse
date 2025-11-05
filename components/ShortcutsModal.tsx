'use client'

import { motion } from 'framer-motion'

interface ShortcutsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ShortcutsModal({ isOpen, onClose }: ShortcutsModalProps) {
  if (!isOpen) return null

  const shortcuts = [
    { keys: ['?'], action: 'Show this help' },
    { keys: ['Ctrl', 'K'], action: 'Quick search' },
    { keys: ['Ctrl', 'S'], action: 'Save world (in editor)' },
    { keys: ['Ctrl', 'Z'], action: 'Undo (in editor)' },
    { keys: ['Ctrl', 'Y'], action: 'Redo (in editor)' },
    { keys: ['Delete'], action: 'Delete selected object (in editor)' },
    { keys: ['G'], action: 'Cycle gizmo mode (in editor)' },
    { keys: ['Escape'], action: 'Close modals' },
  ]

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-card-background p-8 rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        <h2 className="text-2xl font-bold mb-6">Keyboard Shortcuts</h2>

        <div className="space-y-4">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-b-0">
              <span className="text-text-muted">{shortcut.action}</span>
              <div className="flex space-x-1">
                {shortcut.keys.map((key, keyIndex) => (
                  <kbd
                    key={keyIndex}
                    className="px-2 py-1 bg-gray-700 rounded text-sm font-mono"
                  >
                    {key}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-primary py-2 rounded"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  )
}