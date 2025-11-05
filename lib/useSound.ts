import { useCallback } from 'react'

export const useSound = () => {
  const playSound = useCallback((sound: 'click' | 'success' | 'error') => {
    // Mock sound - in real app, load audio files
    console.log(`Playing ${sound} sound`)
  }, [])

  return { playSound }
}