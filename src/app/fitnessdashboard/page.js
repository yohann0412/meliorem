'use client'
import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function Dashboard() {
  // Mock data for the past 7 days
  const mockWorkoutData = [
    {
      date: '2024-02-03',
      intensity: 4,
      exercises: ['Running', 'Cycling'],
      notes: "Had a great cardio session today. Felt strong and energetic!"
    },
    {
      date: '2024-02-04',
      intensity: 3,
      exercises: ['Weight Lifting', 'Yoga'],
      notes: "Focused on strength training. Stretching helped a lot."
    },
    {
      date: '2024-02-05',
      intensity: 5,
      exercises: ['HIIT'],
      notes: "Pushed my limits with an intense HIIT session. Feeling accomplished!"
    },
    {
      date: '2024-02-06',
      intensity: 2,
      exercises: ['Swimming'],
      notes: "Took it easy with some laps in the pool. Recovery day."
    },
    {
      date: '2024-02-07',
      intensity: 4,
      exercises: ['Running', 'Weight Lifting'],
      notes: "Great endurance training. Managed to increase my running distance!"
    },
    {
      date: '2024-02-08',
      intensity: 3,
      exercises: ['Yoga', 'Cycling'],
      notes: "Focused on flexibility and endurance. Feeling refreshed."
    },
    {
      date: '2024-02-09',
      intensity: 5,
      exercises: ['HIIT', 'Weight Lifting'],
      notes: "Maxed out on my workout today. Feeling unstoppable!"
    }
  ]

  const [workoutData, setWorkoutData] = useState([])

  useEffect(() => {
    // Simulate loading data
    setWorkoutData(mockWorkoutData)
  }, [])

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const intensityLabels = {
        1: 'Very Light',
        2: 'Light',
        3: 'Moderate',
        4: 'Intense',
        5: 'Extreme'
      }
      
      return (
        <div className="bg-white p-4 shadow-lg rounded-lg border">
          <p className="font-medium">{label}</p>
          <p className="text-primary">Intensity: {intensityLabels[payload[0].value]}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-8">
      <h1 className="text-[30px] font-bold">Your Fitness Dashboard</h1>
      
      {/* Workout Chart */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-[23px] font-semibold mb-4">Workout Intensity History</h2>
        <div className="h-[400px] w-full">
          <ResponsiveContainer>
            <LineChart data={workoutData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis 
                domain={[1, 5]} 
                ticks={[1, 2, 3, 4, 5]}
                tickFormatter={(value) => ['🧘', '🚶', '🏋️', '💪', '🔥'][value-1]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="intensity" 
                stroke="#81bef0" 
                strokeWidth={2}
                dot={{ stroke: '#81bef0', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#81bef0', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Exercises Analysis */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-[23px] font-semibold mb-4">Today's Exercises</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {workoutData.slice(-1)[0]?.exercises?.map((exercise) => (
            <div 
              key={exercise} 
              className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
            >
              <span className="font-medium">{exercise}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Journal Entries */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-[23px] font-semibold mb-4">Recent Workout Notes</h2>
        <div className="space-y-4">
          {workoutData.slice(-5).reverse().map((entry, index) => (
            entry.notes && (
              <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-sm text-gray-500 mb-1">
                  {new Date(entry.date).toLocaleDateString('en-US', { 
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <p className="text-[19px]">{entry.notes}</p>
                <div className="mt-2 flex gap-2">
                  {entry.exercises.map((exercise) => (
                    <span key={exercise} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {exercise}
                    </span>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  )
}
