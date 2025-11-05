'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useUserStore } from '../stores/userStore'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    displayName: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login, signup } = useUserStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      let success = false
      if (isLogin) {
        success = await login(formData.username, formData.password)
      } else {
        success = await signup({
          username: formData.username,
          displayName: formData.displayName || formData.username,
          password: formData.password,
          avatarData: { layers: {}, colors: {} },
          preferences: {},
          badges: [],
          worldsOwned: [],
        })
      }

      if (success) {
        onClose()
        setFormData({ username: '', password: '', displayName: '' })
      } else {
        setError(isLogin ? 'Invalid credentials' : 'Username already exists')
      }
    } catch (err) {
      setError('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-card-background p-8 rounded-lg max-w-md w-full mx-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full p-2 bg-gray-700 rounded"
              required
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium mb-1">Display Name</label>
              <input
                type="text"
                value={formData.displayName}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                className="w-full p-2 bg-gray-700 rounded"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full p-2 bg-gray-700 rounded"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary py-2 rounded disabled:opacity-50"
          >
            {loading ? 'Loading...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>

        <button
          onClick={() => setIsLogin(!isLogin)}
          className="mt-4 text-sm text-text-muted hover:text-white w-full text-center"
        >
          {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
        </button>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-text-muted hover:text-white"
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  )
}