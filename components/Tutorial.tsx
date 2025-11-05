'use client'

import { useState } from 'react'

const tutorialSteps = [
  {
    title: 'Welcome to DreamVerse!',
    content: 'Create and explore amazing 3D worlds with your friends.'
  },
  {
    title: 'Create Your Avatar',
    content: 'Customize your avatar in the Profile section to represent yourself.'
  },
  {
    title: 'Build Worlds',
    content: 'Use the Create tool to add objects, set backgrounds, and design your world.'
  },
  {
    title: 'Explore and Share',
    content: 'Browse other worlds in Explore and share your creations with links.'
  }
]

export default function Tutorial() {
  const [currentStep, setCurrentStep] = useState(0)
  const [showTutorial, setShowTutorial] = useState(true)

  if (!showTutorial) return null

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowTutorial(false)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const skip = () => {
    setShowTutorial(false)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-card-background p-8 rounded-lg max-w-md w-full mx-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">{tutorialSteps[currentStep].title}</h2>
          <p className="text-text-muted">{tutorialSteps[currentStep].content}</p>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
          >
            Back
          </button>

          <div className="flex space-x-2">
            {tutorialSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentStep ? 'bg-primary' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextStep}
            className="px-4 py-2 bg-primary rounded"
          >
            {currentStep === tutorialSteps.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>

        <button
          onClick={skip}
          className="mt-4 text-sm text-text-muted hover:text-white w-full text-center"
        >
          Skip Tutorial
        </button>
      </div>
    </div>
  )
}