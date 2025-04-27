/**
 * @author likhonsheikh
 * @license AGPL-3.0
 * @link https://github.com/likhonsheikhofficial
 */

"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Shield } from "lucide-react"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Access", href: "/access" },
    { name: "Blog", href: "/blog" },
    { name: "FAQ", href: "/faq" },
    {
      name: "Safety",
      href: "/education/usdt-safety",
      icon: <Shield className="h-4 w-4 text-red-500 mr-1" />,
    },
  ]

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-purple-600">Flash USDT Sender</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-purple-600 flex items-center ${
                  pathname === link.href ? "text-purple-600" : "text-gray-600"
                }`}
              >
                {link.icon && link.icon}
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link href="/access">
              <Button className="bg-purple-600 hover:bg-purple-700">Send USDT</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-purple-600 focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-purple-600 flex items-center ${
                    pathname === link.href ? "text-purple-600" : "text-gray-600"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.icon && link.icon}
                  {link.name}
                </Link>
              ))}
              <Link href="/access" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Send USDT</Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
