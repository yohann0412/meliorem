'use client'
import { useState, useEffect } from 'react'

const WorkoutTrackerPopup = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIntensity, setSelectedIntensity] = useState(null)
  const [exercises, setExercises] = useState([])
  const [notes, setNotes] = useState('')

  useEffect(() => {
    // Show popup after a short delay when component mounts
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const intensityOptions = [
    { value: 1, label: 'Very Light', emoji: '🧘' },
    { value: 2, label: 'Light', emoji: '🚶' },
    { value: 3, label: 'Moderate', emoji: '🏋️' },
    { value: 4, label: 'Intense', emoji: '💪' },
    { value: 5, label: 'Extreme', emoji: '🔥' }
  ]

  const exerciseOptions = [
    'Running',
    'Cycling',
    'Weight Lifting',
    'Yoga',
    'HIIT',
    'Swimming'
  ]

  const handleSubmit = () => {
    // Here you would typically save the data to your database
    console.log({
      intensity: selectedIntensity,
      exercises,
      notes,
      date: new Date().toISOString()
    })
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
        <h2 className="text-[23px] font-semibold mb-6">Track Your Workout</h2>
        
        {/* Intensity Selection */}
        <div className="mb-6">
          <label className="block text-[19px] mb-2">Select intensity:</label>
          <div className="grid grid-cols-5 gap-2">
            {intensityOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedIntensity(option.value)}
                className={`p-2 rounded-lg text-center hover:bg-primary/10 transition-colors
                  ${selectedIntensity === option.value ? 'bg-primary/20 ring-2 ring-primary' : 'bg-gray-50'}`}
              >
                <div className="text-2xl mb-1">{option.emoji}</div>
                <div className="text-sm">{option.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Exercises Performed */}
        <div className="mb-6">
          <label className="block text-[19px] mb-2">Exercises performed:</label>
          <div className="grid grid-cols-2 gap-2">
            {exerciseOptions.map((exercise) => (
              <button
                key={exercise}
                onClick={() => setExercises(prev => 
                  prev.includes(exercise) 
                    ? prev.filter(e => e !== exercise)
                    : [...prev, exercise]
                )}
                className={`p-2 rounded-lg text-center text-sm hover:bg-primary/10 transition-colors
                  ${exercises.includes(exercise) ? 'bg-primary/20 ring-2 ring-primary' : 'bg-gray-50'}`}
              >
                {exercise}
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="mb-6">
          <label className="block text-[19px] mb-2">Add a note (optional):</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            rows="3"
            placeholder="How did your workout go?"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Skip
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedIntensity}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default WorkoutTrackerPopup
