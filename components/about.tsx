"use client"

import { useRef, useEffect, useState } from "react"
import { Award, Users, Clock, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

const highlights = [
  { icon: Award, label: "Certyfikowani specjaliści" },
  { icon: Users, label: "Indywidualne podejście" },
  { icon: Clock, label: "Terminowość" },
  { icon: Shield, label: "Gwarancja jakości" },
]

export function About() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="o-nas" ref={ref} className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div
            className={cn(
              "transition-all duration-700",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10",
            )}
          >
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">O nas</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">Pasja do perfekcji</h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Elite Detailing to studio założone przez pasjonatów motoryzacji z ponad 8-letnim doświadczeniem w branży.
              Specjalizujemy się w kompleksowej pielęgnacji samochodów premium i sportowych.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Korzystamy wyłącznie z profesjonalnych produktów renomowanych marek i najnowszych technik detailingowych.
              Każdy pojazd traktujemy indywidualnie, dbając o najdrobniejsze szczegóły.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              {highlights.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={index} className="flex items-center gap-3 p-4 bg-secondary rounded-xl">
                    <Icon className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div
            className={cn(
              "relative transition-all duration-700",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10",
            )}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img
                src="/professional-car-detailing-studio-interior-with-lu.jpg"
                alt="Elite Detailing Studio"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl">
              <div className="text-4xl font-bold">8+</div>
              <div className="text-sm">lat doświadczenia</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
