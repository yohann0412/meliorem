"use client"
import { useState, useEffect } from 'react'
import LoadingScreen from '../components/LoadingScreen'
import MoodSurveyPopup from '../components/MoodSurveyPopup'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time or actual data fetching
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // Show loading screen for 2 seconds

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <>
    <MoodSurveyPopup />
    <div className="space-y-8">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Meliorem
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your personal companion for mental health tracking and wellness improvement.
        </p>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
  <span className="block text-4xl font-bold text-primary animate-pulse mb-4 mt-6">
    Life can be overwhelming,
  </span>
  but taking care of your mind and body doesn’t have to be. This space is designed just for you—to help you track your stress, reflect on your thoughts, and find the perfect workouts to boost your well-being. Whether you're looking for balance, motivation, or just a fresh start, you’re in the right place!
</p>

      </section>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-primary/10 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Track Your Mental Health
          </h2>
          <p className="text-gray-600">
            Monitor your daily mood, track your progress, and identify patterns to improve your mental wellbeing.
          </p>
        </div>

        <div className="bg-secondary/10 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Stay Active & Healthy
          </h2>
          <p className="text-gray-600">
            Access a variety of workout videos and wellness resources tailored to your needs and preferences.
          </p>
        </div>

        <div className="bg-secondary/10 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Daily Journal
          </h2>
          <p className="text-gray-600">
            Record your thoughts, feelings, and experiences in a private, secure digital journal.
          </p>
        </div>

        <div className="bg-primary/10 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Progress Insights
          </h2>
          <p className="text-gray-600">
            View detailed analytics and insights about your wellness journey over time.
          </p>
        </div>
      </div>
      <div className="flex justify-center mt-6">
  <button className="bg-primary text-white font-semibold px-6 py-3 rounded-2xl shadow-lg hover:bg-primary/90 transition">
  <a href="/learnmore" >Learn More</a>

  </button>
</div>
    </div>
    </>
  )
}