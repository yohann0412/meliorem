"use client"
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function LearnMore() {
  const [activeTab, setActiveTab] = useState('mental')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8 py-12">
      <motion.section 
        className="text-center"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={fadeIn.transition}
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Understanding Your Health
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Knowledge is the first step towards better health. Learn about the factors that influence your well-being and discover expert advice for maintaining both mental and physical health.
        </p>
      </motion.section>

      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setActiveTab('mental')}
          className={`px-6 py-3 rounded-full font-semibold transition-all ${
            activeTab === 'mental' 
              ? 'bg-primary text-white shadow-lg' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Mental Health
        </button>
        <button
          onClick={() => setActiveTab('physical')}
          className={`px-6 py-3 rounded-full font-semibold transition-all ${
            activeTab === 'physical' 
              ? 'bg-secondary text-white shadow-lg' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Physical Health
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {activeTab === 'mental' ? (
          <>
            <motion.div 
              className="bg-primary/10 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
              initial={fadeIn.initial}
              animate={fadeIn.animate}
              transition={{ ...fadeIn.transition, delay: 0.2 }}
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Factors Affecting Your Mental Health
              </h2>
              <p className="text-gray-600">
                Several factors influence mental health, shaping how we feel, think, and cope with daily life. Biological factors, such as genetics, brain chemistry, and hormonal balance, play a key role in mental well-being. Environmental factors, including stress, trauma, or a lack of social support, can also impact mental health. Additionally, lifestyle choices, such as diet, sleep, exercise, and screen time, significantly affect mood and cognitive function.
              </p>
            </motion.div>

            <motion.div 
              className="bg-primary/10 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
              initial={fadeIn.initial}
              animate={fadeIn.animate}
              transition={{ ...fadeIn.transition, delay: 0.3 }}
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Why Mental Health Awareness Matters
              </h2>
              <p className="text-gray-600">
                Understanding mental health is essential because it affects every aspect of our lives, from how we think and feel to how we handle stress, build relationships, and make decisions. Good mental health allows us to cope with challenges, stay resilient, and lead a balanced life. Without awareness, struggles like anxiety and stress can go unnoticed, leading to more serious issues over time.
              </p>
            </motion.div>

            <motion.div 
              className="bg-primary/10 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all md:col-span-2"
              initial={fadeIn.initial}
              animate={fadeIn.animate}
              transition={{ ...fadeIn.transition, delay: 0.4 }}
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Expert Advice on Mental Health
              </h2>
              <p className="text-gray-600">
                As mental health professionals, we emphasize the importance of maintaining a balanced lifestyle to support overall well-being. Prioritizing quality sleep, regular exercise, and a nutritious diet can significantly improve mood and cognitive function. Practicing mindfulness techniques, such as meditation or journaling, helps manage stress and build emotional resilience. Remember, seeking help is not a sign of weakness but a proactive step toward better mental health.
              </p>
            </motion.div>
          </>
        ) : (
          <>
            <motion.div 
              className="bg-secondary/10 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
              initial={fadeIn.initial}
              animate={fadeIn.animate}
              transition={{ ...fadeIn.transition, delay: 0.2 }}
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Factors Affecting Your Physical Health
              </h2>
              <p className="text-gray-600">
                Several factors influence physical health, including diet, exercise, sleep, and stress management. A balanced diet provides essential nutrients for energy and overall well-being, while regular physical activity strengthens the body and improves cardiovascular health. Quality sleep is crucial for recovery and cognitive function, and managing stress effectively helps prevent chronic illnesses.
              </p>
            </motion.div>

            <motion.div 
              className="bg-secondary/10 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
              initial={fadeIn.initial}
              animate={fadeIn.animate}
              transition={{ ...fadeIn.transition, delay: 0.3 }}
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Why Physical Health Knowledge Matters
              </h2>
              <p className="text-gray-600">
                Knowing about physical health is important because it helps individuals make informed decisions that improve their overall well-being and prevent illnesses. Understanding how factors like nutrition, exercise, sleep, and stress affect the body enables people to adopt healthier lifestyles, reducing the risk of chronic diseases such as heart disease, diabetes, and obesity.
              </p>
            </motion.div>

            <motion.div 
              className="bg-secondary/10 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all md:col-span-2"
              initial={fadeIn.initial}
              animate={fadeIn.animate}
              transition={{ ...fadeIn.transition, delay: 0.4 }}
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Expert Advice on Physical Health
              </h2>
              <p className="text-gray-600">
                Maintaining optimal physical health requires a balanced approach that includes regular exercise, proper nutrition, and recovery. Aim for at least 150 minutes of moderate-intensity aerobic activity or 75 minutes of vigorous exercise per week, combined with strength training twice a week. Prioritize a diet rich in whole foods, lean proteins, healthy fats, and complex carbohydrates. Hydration is key—drink enough water throughout the day to support metabolic function and prevent fatigue.
              </p>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}