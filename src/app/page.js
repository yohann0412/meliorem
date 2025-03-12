"use client"
import { useState, useEffect } from 'react'
import LoadingScreen from '../components/LoadingScreen'
import MoodSurveyPopup from '../components/MoodSurveyPopup'
import { MessageCircle } from 'lucide-react'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [isChatOpen, setIsChatOpen] = useState(false)

  useEffect(() => {
    // Simulate loading time or actual data fetching
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // Show loading screen for 2 seconds

    return () => clearTimeout(timer)
  }, [])

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <>
      <MoodSurveyPopup />
      <div className="space-y-8 relative pb-16">
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
            but taking care of your mind and body doesn't have to be. This space is designed just for you—to help you track your stress, reflect on your thoughts, and find the perfect workouts to boost your well-being. Whether you're looking for balance, motivation, or just a fresh start, you're in the right place!
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
            <a href="/learnmore">Learn More</a>
          </button>
        </div>
        
        {/* Chatbot Icon Button */}
        <button 
          onClick={toggleChat}
          className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-all z-50 flex items-center justify-center"
          aria-label="Open chat assistant"
        >
          <MessageCircle size={24} />
        </button>
        
        {/* Chat Window (Hidden by default) */}
        {isChatOpen && (
          <div className="fixed bottom-20 right-6 w-80 bg-white rounded-lg shadow-xl z-40 border border-gray-200 overflow-hidden">
            <div className="bg-primary text-white p-3 flex justify-between items-center">
              <h3 className="font-medium">Meliorem Assistant</h3>
              <button onClick={toggleChat} className="text-white hover:text-gray-200">
                ✕
              </button>
            </div>
            <div className="h-80 p-3 overflow-y-auto bg-gray-50">
              <div className="bg-primary/10 p-2 rounded-lg mb-2 max-w-[80%]">
                How can I help with your wellness journey today?
              </div>
              {/* Chat messages would appear here */}
            </div>
            <div className="p-3 border-t border-gray-200 flex">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button className="bg-primary text-white p-2 rounded-r-lg">
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}