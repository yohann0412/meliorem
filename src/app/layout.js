// src/app/layout.js
import "./globals.css";
import Image from "next/image";
import meliorem from "../app/Meliorem.jpeg";
import Navbar from "../components/Navbar"; // Import Navbar as a client component

export const metadata = {
  title: "Wellness Tracker",
  description: "Track your wellness journey",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#fcfcfc]">
        <Navbar /> {/* Use Navbar as a client component */}
        <main className="max-w-7xl mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
