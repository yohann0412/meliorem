'use client'
import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function Dashboard() {
  // Mock data for the past 7 days
  const mockMoodData = [
    {
      date: '2024-02-03',
      mood: 4,
      stressFactors: ['Academic Pressure', 'Physical Appearance'],
      notes: "Had a tough exam today but managed to stay positive. Need to work on my study schedule."
    },
    {
      date: '2024-02-04',
      mood: 3,
      stressFactors: ['Social Life', 'Academic Pressure'],
      notes: "Feeling a bit overwhelmed with assignments. Taking deep breaths helps."
    },
    {
      date: '2024-02-05',
      mood: 5,
      stressFactors: ['Physical Appearance'],
      notes: "Great day! Started a new workout routine and feeling motivated."
    },
    {
      date: '2024-02-06',
      mood: 2,
      stressFactors: ['Academic Pressure', 'Financial Stress'],
      notes: "Multiple deadlines approaching. Need to better manage my time."
    },
    {
      date: '2024-02-07',
      mood: 4,
      stressFactors: ['Health Concerns'],
      notes: "Getting better at maintaining a work-life balance. Meditation helped today."
    },
    {
      date: '2024-02-08',
      mood: 3,
      stressFactors: ['Family Issues', 'Academic Pressure'],
      notes: "Mixed feelings today. Need to focus on what I can control."
    },
    {
      date: '2024-02-09',
      mood: 5,
      stressFactors: ['Social Life'],
      notes: "Had a great study session with friends. Feeling productive and connected!"
    }
  ]

  const [moodData, setMoodData] = useState([])

  useEffect(() => {
    // Simulate loading data
    setMoodData(mockMoodData)
  }, [])

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const moodLabels = {
        1: 'Very Low',
        2: 'Low',
        3: 'Neutral',
        4: 'Good',
        5: 'Excellent'
      }
      
      return (
        <div className="bg-white p-4 shadow-lg rounded-lg border">
          <p className="font-medium">{label}</p>
          <p className="text-primary">Mood: {moodLabels[payload[0].value]}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-8">
      <h1 className="text-[30px] font-bold">Your Wellness Dashboard</h1>
      
      {/* Mood Chart */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-[23px] font-semibold mb-4">Mood History</h2>
        <div className="h-[400px] w-full">
          <ResponsiveContainer>
            <LineChart data={moodData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis 
                domain={[1, 5]} 
                ticks={[1, 2, 3, 4, 5]}
                tickFormatter={(value) => ['😢', '😟', '😐', '🙂', '😊'][value-1]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="mood" 
                stroke="#81bef0" 
                strokeWidth={2}
                dot={{ stroke: '#81bef0', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#81bef0', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stress Factors Analysis */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-[23px] font-semibold mb-4">Today's Stress Factors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {moodData.slice(-1)[0]?.stressFactors?.map((factor) => (
            <div 
              key={factor} 
              className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
            >
              <span className="font-medium">{factor}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Journal Entries */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-[23px] font-semibold mb-4">Recent Journal Entries</h2>
        <div className="space-y-4">
          {moodData.slice(-5).reverse().map((entry, index) => (
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
                  {entry.stressFactors.map((factor) => (
                    <span key={factor} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {factor}
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