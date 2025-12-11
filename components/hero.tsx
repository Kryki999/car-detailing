"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, Sparkles } from "lucide-react"

export function Hero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <section className="relative h-[100dvh] min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-[url('/shiny-polished-black-car-after-detailing-perfect-r.jpg')] md:bg-[url('/luxury-black-sports-car-in-dark-studio-dramatic-li.jpg')]"
      >
        {/* Darker overlays for better text readability on mobile */}
        <div className="absolute inset-0 bg-black/50 md:hidden" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background md:from-background/20 md:via-background/10" />
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-background/20 via-transparent to-background/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className={`transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-8 backdrop-blur-md transition-colors hover:bg-white/20">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </div>
            <span className="text-md text-white/90 font-medium tracking-wide">Dostępne terminy</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
            <span className="block drop-shadow-md">Perfekcja w</span>
            <span className="block text-primary drop-shadow-md">każdym detalu</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-200 mb-10 leading-relaxed drop-shadow-sm">
            Profesjonalne studio car detailingowe. Oferujemy kompleksową pielęgnację Twojego samochodu na najwyższym
            poziomie.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg" asChild>
              <a href="#kontakt">Umów wizytę</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border text-foreground hover:bg-card px-8 py-6 text-lg bg-transparent"
              asChild
            >
              <a href="#galeria">Zobacz nasze realizacje</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-muted-foreground" />
      </div>
    </section>
  )
}
