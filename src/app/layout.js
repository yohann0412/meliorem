// src/app/layout.js
import './globals.css';
import Image from 'next/image';
import meliorem from "../app/Meliorem.jpeg"

export const metadata = {
  title: 'Wellness Tracker',
  description: 'Track your wellness journey',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#fcfcfc]">
        <nav className="bg-[#154ea8] p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="w-32 h-auto"> {/* Adjust size as needed */}
              <Image src={meliorem} alt="Wellness Tracker Logo" width={128} height={40} />
            </div>
            <div className="space-x-4">
              <a href="/" className="text-white hover:text-gray-200">Home</a>
              <a href="/dashboard" className="text-white hover:text-gray-200">Dashboard</a>
              <a href="/workouts" className="text-white hover:text-gray-200">Workouts</a>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
