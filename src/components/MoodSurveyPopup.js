'use client'
import { useState, useEffect } from 'react'

const MoodSurveyPopup = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedMood, setSelectedMood] = useState(null)
  const [stressFactors, setStressFactors] = useState([])
  const [notes, setNotes] = useState('')

  useEffect(() => {
    // Show popup after a short delay when component mounts
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const moodOptions = [
    { value: 1, label: 'Very Low', emoji: '😢' },
    { value: 2, label: 'Low', emoji: '😟' },
    { value: 3, label: 'Neutral', emoji: '😐' },
    { value: 4, label: 'Good', emoji: '🙂' },
    { value: 5, label: 'Excellent', emoji: '😊' }
  ]

  const stressFactorOptions = [
    'Academic Pressure',
    'Physical Appearance',
    'Social Life',
    'Financial Stress',
    'Health Concerns',
    'Family Issues'
  ]

  const handleSubmit = () => {
    // Here you would typically save the data to your database
    console.log({
      mood: selectedMood,
      stressFactors,
      notes,
      date: new Date().toISOString()
    })
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
        <h2 className="text-[23px] font-semibold mb-6">How are you feeling today?</h2>
        
        {/* Mood Selection */}
        <div className="mb-6">
          <label className="block text-[19px] mb-2">Select your mood:</label>
          <div className="grid grid-cols-5 gap-2">
            {moodOptions.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setSelectedMood(mood.value)}
                className={`p-2 rounded-lg text-center hover:bg-primary/10 transition-colors
                  ${selectedMood === mood.value ? 'bg-primary/20 ring-2 ring-primary' : 'bg-gray-50'}`}
              >
                <div className="text-2xl mb-1">{mood.emoji}</div>
                <div className="text-sm">{mood.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Stress Factors */}
        <div className="mb-6">
          <label className="block text-[19px] mb-2">What's causing stress today?</label>
          <div className="grid grid-cols-2 gap-2">
            {stressFactorOptions.map((factor) => (
              <button
                key={factor}
                onClick={() => setStressFactors(prev => 
                  prev.includes(factor) 
                    ? prev.filter(f => f !== factor)
                    : [...prev, factor]
                )}
                className={`p-2 rounded-lg text-center text-sm hover:bg-primary/10 transition-colors
                  ${stressFactors.includes(factor) ? 'bg-primary/20 ring-2 ring-primary' : 'bg-gray-50'}`}
              >
                {factor}
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
            placeholder="How are you feeling today?"
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
            disabled={!selectedMood}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default MoodSurveyPopup