'use client'
import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'
import { Heart, Brain, Smile, TrendingUp, Calendar } from 'lucide-react'

export default function Dashboard() {
  // Previous mock data remains the same
  const mockMoodData = [
    {
      date: '2024-02-03',
      mood: 4,
      stressLevel: 2,
      sleepHours: 7.5,
      stressFactors: ['Academics', 'Appearance'],
      activities: ['Meditation', 'Exercise'],
      notes: "Had a tough exam today but managed to stay positive. Need to work on my study schedule."
    },


    {
      date: '2024-02-04',
      mood: 3,
      stressLevel: 4,
      sleepHours: 6.5,
      stressFactors: ['Social Life', 'Academic Pressure'],
      activities: ['Deep Breathing'],
      notes: "Feeling a bit overwhelmed with assignments. Taking deep breaths helps."
    },
    {
      date: '2024-02-05',
      mood: 5,
      stressLevel: 1,
      sleepHours: 8,
      stressFactors: ['Physical Appearance'],
      activities: ['Exercise', 'Journaling'],
      notes: "Great day! Started a new workout routine and feeling motivated."
    },
    {
      date: '2024-02-06',
      mood: 2,
      stressLevel: 5,
      sleepHours: 5.5,
      stressFactors: ['Academic Pressure', 'Financial Stress'],
      activities: ['Reading'],
      notes: "Multiple deadlines approaching. Need to better manage my time."
    },
    {
      date: '2024-02-07',
      mood: 4,
      stressLevel: 2,
      sleepHours: 7,
      stressFactors: ['Health Concerns'],
      activities: ['Meditation', 'Exercise'],
      notes: "Getting better at maintaining a work-life balance. Meditation helped today."
    },
    {
      date: '2024-02-08',
      mood: 3,
      stressLevel: 3,
      sleepHours: 6.5,
      stressFactors: ['Family Issues', 'Academic Pressure'],
      activities: ['Journaling'],
      notes: "Mixed feelings today. Need to focus on what I can control."
    },
    {
      date: '2024-02-09',
      mood: 5,
      stressLevel: 1,
      sleepHours: 8.5,
      stressFactors: ['Social Life'],
      activities: ['Exercise', 'Meditation'],
      notes: "Had a great study session with friends. Feeling productive and connected!"
    }
  ]

  const [moodData, setMoodData] = useState([])
  const [selectedMetric, setSelectedMetric] = useState('mood')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setMoodData(mockMoodData)
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Calculate aggregated data for additional charts
  const getStressFactorsData = () => {
    const factors = {}
    moodData.forEach(entry => {
      entry.stressFactors.forEach(factor => {
        factors[factor] = (factors[factor] || 0) + 1
      })
    })
    return Object.entries(factors).map(([name, value]) => ({ name, value }))
  }

  const getActivitiesData = () => {
    const activities = {}
    moodData.forEach(entry => {
      entry.activities.forEach(activity => {
        activities[activity] = (activities[activity] || 0) + 1
      })
    })
    return Object.entries(activities).map(([name, value]) => ({ name, value }))
  }

  const getAverageMetrics = () => {
    if (!moodData.length) return []
    return [
      { name: 'Mood', value: moodData.reduce((acc, curr) => acc + curr.mood, 0) / moodData.length },
      { name: 'Stress', value: moodData.reduce((acc, curr) => acc + curr.stressLevel, 0) / moodData.length },
      { name: 'Sleep', value: moodData.reduce((acc, curr) => acc + curr.sleepHours, 0) / moodData.length }
    ]
  }

  const metricConfigs = {
    mood: {
      label: 'Mood',
      color: '#81bef0',
      icon: Smile,
      domain: [1, 5],
      formatter: (value) => ['😢', '😟', '😐', '🙂', '😊'][value-1]
    },
    stressLevel: {
      label: 'Stress Level',
      color: '#ff6b6b',
      icon: Brain,
      domain: [1, 5],
      formatter: (value) => value
    },
    sleepHours: {
      label: 'Sleep Hours',
      color: '#845ef7',
      icon: Heart,
      domain: [0, 10],
      formatter: (value) => `${value}h`
    }
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const currentMetric = metricConfigs[selectedMetric]
      const value = payload[0].value
      
      return (
        <div className="bg-white p-4 shadow-lg rounded-lg border">
          <p className="font-medium">{new Date(label).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
          })}</p>
          <p className="text-primary">{currentMetric.label}: {
            selectedMetric === 'mood' 
              ? ['Very Low', 'Low', 'Neutral', 'Good', 'Excellent'][value-1]
              : value
          }</p>
          {payload[0].payload.activities && (
            <p className="text-sm text-gray-600">
              Activities: {payload[0].payload.activities.join(', ')}
            </p>
          )}
        </div>
      )
    }
    return null
  }

  const SimpleTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 shadow-lg rounded-lg border">
          <p className="font-medium">{label}</p>
          <p className="text-primary">Count: {payload[0].value}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-8">
      <h1 className="text-[30px] font-bold">Your Wellness Dashboard</h1>
      
      {/* Metric Selection */}
      <div className="flex gap-4">
        {Object.entries(metricConfigs).map(([key, config]) => (
          <button
            key={key}
            onClick={() => setSelectedMetric(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              selectedMetric === key 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <config.icon size={20} />
            <span>{config.label}</span>
          </button>
        ))}
      </div>

      {/* Main Chart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Primary Trend Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-[23px] font-semibold mb-4">
            {metricConfigs[selectedMetric].label} History
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer>
              <LineChart data={moodData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                />
                <YAxis 
                  domain={metricConfigs[selectedMetric].domain}
                  tickFormatter={metricConfigs[selectedMetric].formatter}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey={selectedMetric}
                  stroke={metricConfigs[selectedMetric].color}
                  strokeWidth={2}
                  dot={{ 
                    stroke: metricConfigs[selectedMetric].color, 
                    strokeWidth: 2, 
                    r: 4 
                  }}
                  activeDot={{ 
                    r: 6, 
                    stroke: metricConfigs[selectedMetric].color, 
                    strokeWidth: 2 
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Average Metrics Bar Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-[23px] font-semibold mb-4">Average Metrics</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer>
              <BarChart data={getAverageMetrics()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#81bef0">
                  {getAverageMetrics().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stress Factors Distribution */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-[23px] font-semibold mb-4">Stress Factors Distribution</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={getStressFactorsData()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {getStressFactorsData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activities Distribution */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-[23px] font-semibold mb-4">Activities Distribution</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer>
              <BarChart data={getActivitiesData()} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip content={<SimpleTooltip />} />
                <Bar dataKey="value" fill="#81bef0">
                  {getActivitiesData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
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

      {/* Activities */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-[23px] font-semibold mb-4">Recent Activities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {moodData.slice(-1)[0]?.activities?.map((activity) => (
            <div 
              key={activity}
              className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
            >
              <span className="font-medium">{activity}</span>
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
                <div className="mt-2 flex flex-wrap gap-2">
                  {entry.stressFactors.map((factor) => (
                    <span key={factor} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {factor}
                    </span>
                  ))}{entry.activities.map((activity) => (
                    <span key={activity} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      {activity}
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