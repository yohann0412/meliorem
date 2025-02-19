"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import meliorem from "../app/Meliorem.jpeg";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  let timeoutId = null;

  const handleMouseEnter = () => {
    clearTimeout(timeoutId); // Prevent premature closing
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = (event) => {
    timeoutId = setTimeout(() => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.relatedTarget)) {
        setIsDropdownOpen(false);
      }
    }, 200); // Small delay for smoother UX
  };

  return (
    <nav className="bg-[#154ea8] p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="w-32 h-auto">
          <Image src={meliorem} alt="Wellness Tracker Logo" width={128} height={40} />
        </div>
        <div className="space-x-4 relative flex items-center">
          <a href="/" className="text-white hover:text-gray-200">Home</a>
          <a href="/dashboard" className="text-white hover:text-gray-200">Dashboard</a>

          {/* Dropdown Container */}
          <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <button className="text-white hover:text-gray-200">
              Workouts ▼
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-10"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <a href="/workouts" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                  Recommended Exercises
                </a>
                <a href="/fitnessdashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                  Fitness Tracker
                </a>
              </div>
            )}
          </div>
          <a href="/learnmore" className="text-white hover:text-gray-200">Learn More</a>
        </div>
      </div>
    </nav>
  );
}
