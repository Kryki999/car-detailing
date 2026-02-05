"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Phone, CarFront } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "#uslugi", label: "Usługi" },
  { href: "#galeria", label: "Galeria" },
  { href: "#opinie", label: "Opinie" },
  { href: "#blog", label: "Blog" },
  { href: "#cennik", label: "Cennik" },
  { href: "#o-nas", label: "O nas" },
  { href: "#kontakt", label: "Kontakt" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        (scrolled || isOpen) ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Left Side */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <CarFront className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              ELITE<span className="text-primary">DETAILING</span>
            </span>
          </Link>

          {/* Right Side - Phone Button + Hamburger Menu */}
          <div className="flex items-center gap-3">
            {/* Phone Button - Full number on desktop, icon + text on mobile */}
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full" asChild>
              <a href="tel:+48123456789" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">+48 123 456 789</span>
              </a>
            </Button>

            {/* Hamburger Menu - Visible on all screen sizes */}
            <button
              className="text-foreground p-2 hover:bg-primary/10 rounded-full transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-3 text-foreground hover:text-primary transition-colors font-medium text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
