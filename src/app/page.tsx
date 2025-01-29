"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import { Sun, Moon } from "lucide-react"

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      {/* Navbar */}
      <nav className="w-full py-4 px-6 flex justify-between items-center border-b">
        <h1 className="text-2xl font-bold">Face2Avatar</h1>
        <div className="flex items-center space-x-4">
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-4">
              <NavigationMenuItem>
                <NavigationMenuLink href="/about" className="hover:underline">
                  About
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/contact" className="hover:underline">
                  Contact
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          {/* Theme Toggle Button */}
          <Button
            variant="outline"
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-2 border-gray-300 dark:border-gray-700"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            {darkMode ? "Light" : "Dark"}
          </Button>
        </div>
      </nav>

      {/* Landing Page */}
      <section className="flex flex-grow items-center justify-between px-10">
        {/* Left: Text */}
        <div className="w-1/2">
          <h2 className="text-5xl font-bold mb-6">Hello World</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Welcome to Face2Avatar. Transform your face into an avatar effortlessly.
          </p>
          <a href="/playground">
            <Button className="mt-8 bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 px-6 py-2 rounded text-lg font-medium transition-colors duration-200">
              Get Started
            </Button>
          </a>
        </div>

        {/* Right: Image Placeholder */}
        <div className="w-1/2 flex justify-center">
          <div className="w-80 h-80 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg flex items-center justify-center">
            <span className="text-gray-400 dark:text-gray-500">Image Placeholder</span>
          </div>
        </div>
      </section>
    </div>
  )
}

