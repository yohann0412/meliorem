import { useState, useEffect } from 'react';
import Image from 'next/image';
import meliorem from "../components/Meliorem.jpeg"; // Ensure the path is correct

const LoadingScreen = () => {
  const [dots, setDots] = useState('.');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '.' : prev + '.');
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#fcfcfc] flex flex-col items-center justify-center z-50">
      {/* Logo wrapper - adjust size to match your logo */}
      <div className="w-32 mb-8 animate-pulse">
        <Image 
          src={meliorem}
          alt="Wellness Tracker Logo"
          width={128} // Adjust as needed
          height={40} // Adjust as needed
          priority
        />
      </div>

      {/* Loading spinner */}
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>

      {/* Loading text */}
      <p className="text-[23px] font-semibold text-primary">
        Loading{dots}
      </p>
    </div>
  );
};

export default LoadingScreen;
