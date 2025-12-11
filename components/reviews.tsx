"use client"

import { useRef, useEffect, useState } from "react"
import { Star, Quote } from "lucide-react"
import { cn } from "@/lib/utils"

const reviews = [
  {
    name: "Michał K.",
    car: "BMW M4",
    rating: 5,
    text: "Fantastyczna robota! Lakier po korekcie wygląda lepiej niż prosto z salonu. Polecam wszystkim właścicielom aut premium.",
    avatar: "/professional-man-portrait.png",
  },
  {
    name: "Anna W.",
    car: "Porsche Cayenne",
    rating: 5,
    text: "Profesjonalne podejście i dbałość o każdy detal. Powłoka ceramiczna trzyma się świetnie już rok. Na pewno wrócę!",
    avatar: "/professional-woman-portrait.png",
  },
  {
    name: "Tomasz B.",
    car: "Mercedes AMG GT",
    rating: 5,
    text: "Nie wiedziałem, że mój samochód może tak wyglądać! Efekt przeszedł moje najśmielsze oczekiwania. Top klasa!",
    avatar: "/confident-businessman.png",
  },
]

export function Reviews() {
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
    <section id="opinie" ref={ref} className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">Opinie</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">Co mówią klienci</h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-muted-foreground">5.0 na Google</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className={cn(
                "bg-card border border-border rounded-2xl p-6 sm:p-8 transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Quote className="w-10 h-10 text-primary/20 mb-4" />

              <div className="flex mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-foreground leading-relaxed mb-6">{review.text}</p>

              <div className="flex items-center gap-4">
                <img
                  src={review.avatar || "/placeholder.svg"}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-foreground">{review.name}</p>
                  <p className="text-sm text-muted-foreground">{review.car}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
