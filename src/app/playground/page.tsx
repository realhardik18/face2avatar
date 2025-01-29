"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import { Sun, Moon, Upload, Link, X } from "lucide-react"

export default function Playground() {
  const [darkMode, setDarkMode] = useState(false)
  const [image, setImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDiscard = () => {
    setImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      {/* Navbar */}
      <nav className="w-full py-4 px-6 flex justify-between items-center border-b">
        <h1 className="text-2xl font-bold">Face2Avatar</h1>
        <div className="flex items-center space-x-4">
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-4">
              <NavigationMenuItem>
                <NavigationMenuLink href="/" className="hover:underline">
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>
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
            {darkMode ? "Dark" : "Light"}
          </Button>
        </div>
      </nav>

      {/* Playground Content */}
      <div className="flex flex-grow p-6 gap-6">
        {/* Left: Image Upload */}
        <div className="w-1/2 flex flex-col">
          <h2 className="text-2xl font-semibold mb-4">Upload Image</h2>
          <div
            className="w-full aspect-square border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 dark:hover:border-gray-600 transition-colors overflow-hidden"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            {image ? (
              <img src={image || "/placeholder.svg"} alt="Uploaded" className="w-full h-full object-cover" />
            ) : (
              <>
                <Upload size={48} className="text-gray-400 dark:text-gray-500 mb-4" />
                <p className="text-center text-gray-600 dark:text-gray-300 px-4">
                  Click to upload or drag and drop your image here
                </p>
              </>
            )}
            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} ref={fileInputRef} />
          </div>
          <div className="flex mt-4 gap-4">
            <Button
              className="flex-1 bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
              onClick={() => {
                console.log('hello');
              }}
            >
              {image ? "Create" : "Upload Image"}
            </Button>
            {image && (
              <Button
                className="flex-1 bg-red-600 text-white hover:bg-red-700 transition-colors duration-200"
                onClick={handleDiscard}
              >
                Discard
              </Button>
            )}
          </div>
        </div>

        {/* Right: Output Placeholder */}
        <div className="w-1/2 flex flex-col">
          <h2 className="text-2xl font-semibold mb-4">Generated Avatar</h2>
          <div className="border-2 border-gray-300 dark:border-gray-700 rounded-lg p-4 flex flex-col items-center justify-center aspect-square mb-4">
            <span className="text-gray-400 dark:text-gray-500">Avatar will appear here</span>
          </div>
          <Button className="flex items-center justify-center gap-2 bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 px-6 py-2 rounded text-lg font-medium transition-colors duration-200">
            <Link size={18} />
            Copy Link
          </Button>
        </div>
      </div>
    </div>
  )
}

