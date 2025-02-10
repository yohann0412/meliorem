export default function Workouts() {
    const workouts = [
      {
        title: 'Stress Relief Yoga',
        category: 'Yoga',
        duration: '20 min',
        level: 'Beginner'
      },
      {
        title: 'Quick Cardio',
        category: 'Cardio',
        duration: '15 min',
        level: 'Intermediate'
      },
      {
        title: 'Strength Training',
        category: 'Strength',
        duration: '30 min',
        level: 'Advanced'
      }
    ]
  
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Workout Library</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((workout, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
              <h3 className="text-xl font-semibold">{workout.title}</h3>
              <div className="mt-2 text-gray-600">
                <p>Category: {workout.category}</p>
                <p>Duration: {workout.duration}</p>
                <p>Level: {workout.level}</p>
              </div>
              <button className="mt-4 bg-[#acf2b2] px-4 py-2 rounded w-full">
                Start Workout
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  }