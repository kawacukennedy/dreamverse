'use client'

import { useState, useEffect } from 'react'
import { saveSetting, getSetting } from '../lib/dbUtils'

export default function Settings() {
  const [theme, setTheme] = useState('dark')
  const [aiKey, setAiKey] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSettings = async () => {
      const savedTheme = await getSetting('theme')
      const savedAiKey = await getSetting('aiKey')
      if (savedTheme) setTheme(savedTheme)
      if (savedAiKey) setAiKey(savedAiKey)
      setLoading(false)
    }
    loadSettings()
  }, [])

  const handleThemeChange = async (newTheme: string) => {
    setTheme(newTheme)
    await saveSetting('theme', newTheme)
  }

  const handleAiKeyChange = async (newAiKey: string) => {
    setAiKey(newAiKey)
    await saveSetting('aiKey', newAiKey)
  }

  const clearData = () => {
    if (confirm('Are you sure you want to clear all local data?')) {
      // Clear IndexedDB
      console.log('Clearing data...')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-3xl font-bold mb-8 text-center">Settings</h1>

        <div>
          <label className="block text-sm font-medium mb-2">Theme</label>
          <select
            value={theme}
            onChange={(e) => handleThemeChange(e.target.value)}
            className="w-full p-2 bg-card-background rounded"
            disabled={loading}
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">AI API Key (Optional)</label>
          <input
            type="password"
            value={aiKey}
            onChange={(e) => handleAiKeyChange(e.target.value)}
            className="w-full p-2 bg-card-background rounded"
            placeholder="Enter your AI API key"
            disabled={loading}
          />
        </div>

        <div>
          <button
            onClick={() => alert('Privacy Policy')}
            className="w-full bg-primary p-2 rounded mb-2"
          >
            View Privacy Policy
          </button>
        </div>

        <div>
          <button
            onClick={clearData}
            className="w-full bg-red-600 p-2 rounded"
          >
            Clear All Data
          </button>
        </div>
      </div>
    </div>
  )
}