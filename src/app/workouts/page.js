"use client"
import { useState, useEffect } from 'react'
import WorkoutTrackerPopup from "@/components/WorkoutTrackerPopup"
import { motion } from 'framer-motion'
import { Filter, Clock, Activity, BarChart } from 'lucide-react'

export default function Workouts() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedLevel, setSelectedLevel] = useState('All')
  const [isLoading, setIsLoading] = useState(true)

  // Mock workout data with more details
  const workouts = [
    {
      title: 'Stress Relief Yoga',
      category: 'Yoga',
      duration: '20 min',
      level: 'Beginner',
      calories: '150-200',
      description: 'A gentle flow focusing on breathing and flexibility to help reduce stress and anxiety.',
      benefits: ['Improved flexibility', 'Stress reduction', 'Better posture'],
      equipment: ['Yoga mat', 'Optional blocks'],
      instructor: 'Sarah Chen'
    },
    {
      title: 'Quick Cardio Blast',
      category: 'Cardio',
      duration: '15 min',
      level: 'Intermediate',
      calories: '200-250',
      description: 'High-energy cardio intervals to boost your heart rate and burn calories efficiently.',
      benefits: ['Improved endurance', 'Fat burning', 'Heart health'],
      equipment: ['None required'],
      instructor: 'Mike Johnson'
    },
    {
      title: 'Full Body Strength',
      category: 'Strength',
      duration: '30 min',
      level: 'Advanced',
      calories: '300-350',
      description: 'Comprehensive strength training targeting all major muscle groups.',
      benefits: ['Muscle building', 'Increased strength', 'Better metabolism'],
      equipment: ['Dumbbells', 'Resistance bands'],
      instructor: 'Alex Torres'
    },
    {
      title: 'Mindful Morning Flow',
      category: 'Yoga',
      duration: '25 min',
      level: 'Beginner',
      calories: '100-150',
      description: 'Start your day with gentle movements and mindful breathing.',
      benefits: ['Morning energy boost', 'Mental clarity', 'Flexibility'],
      equipment: ['Yoga mat'],
      instructor: 'Emma Wilson'
    },
    {
      title: 'HIIT Power Session',
      category: 'Cardio',
      duration: '25 min',
      level: 'Advanced',
      calories: '300-400',
      description: 'Intense interval training to maximize calorie burn and improve conditioning.',
      benefits: ['Maximum calorie burn', 'Improved agility', 'Enhanced stamina'],
      equipment: ['Timer', 'Optional dumbbells'],
      instructor: 'Chris Peterson'
    },
    {
      title: 'Core Strength Basics',
      category: 'Strength',
      duration: '20 min',
      level: 'Beginner',
      calories: '150-200',
      description: 'Foundation exercises to build core strength and stability.',
      benefits: ['Core strength', 'Better balance', 'Injury prevention'],
      equipment: ['Exercise mat'],
      instructor: 'Lisa Martinez'
    }
  ]

  const categories = ['All', 'Yoga', 'Cardio', 'Strength']
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced']

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const filteredWorkouts = workouts.filter(workout => {
    const categoryMatch = selectedCategory === 'All' || workout.category === selectedCategory
    const levelMatch = selectedLevel === 'All' || workout.level === selectedLevel
    return categoryMatch && levelMatch
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
      </div>
    )
  }

  return (
    <>
      <WorkoutTrackerPopup />
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Personalized Workouts</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover workouts tailored to your fitness level and goals. Track your progress and stay motivated!
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="text-primary" size={20} />
            <h2 className="text-xl font-semibold">Filters</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm transition-colors
                      ${selectedCategory === category 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Level</label>
              <div className="flex flex-wrap gap-2">
                {levels.map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`px-4 py-2 rounded-full text-sm transition-colors
                      ${selectedLevel === level 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Workout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkouts.map((workout, index) => (
            <motion.div
              key={workout.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="bg-primary/10 h-48 flex items-center justify-center">
                <Activity size={64} className="text-primary opacity-50" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{workout.title}</h3>
                <p className="text-gray-600 mb-4">{workout.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={16} />
                    <span>{workout.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <BarChart size={16} />
                    <span>{workout.calories} calories</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {workout.category}
                  </span>
                  <span className="px-2 py-1 bg-secondary/10 text-secondary rounded-full text-sm">
                    {workout.level}
                  </span>
                </div>

                <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors">
                  Start Workout
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  )
}