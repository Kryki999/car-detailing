"use client"

import { useRef, useEffect, useState } from "react"
import { Award, Users, Clock, Shield, LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { urlFor } from "@/sanity/lib/image"

interface Highlight {
  icon: string
  label: string
  _key?: string
}

interface AboutProps {
  label?: string
  heading?: string
  paragraph1?: string
  paragraph2?: string
  highlights?: Highlight[]
  image?: any
  badgeNumber?: string
  badgeText?: string
}

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Award: Award,
  Users: Users,
  Clock: Clock,
  Shield: Shield,
}

export function About(props: AboutProps) {
  const {
    label,
    heading,
    paragraph1,
    paragraph2,
    highlights,
    image,
    badgeNumber,
    badgeText
  } = props

  // Generate image URL
  const imageUrl = image ? urlFor(image).width(1200).url() : undefined

  // Early return if no key content
  if (!heading && !paragraph1) {
    return null
  }

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
            {label && (
              <span className="text-primary text-sm font-semibold tracking-wider uppercase">{label}</span>
            )}
            {heading && (
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">{heading}</h2>
            )}
            {paragraph1 && (
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                {paragraph1}
              </p>
            )}
            {paragraph2 && (
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                {paragraph2}
              </p>
            )}

            {highlights && highlights.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mt-8">
                {highlights.map((item, index) => {
                  const Icon = iconMap[item.icon] || Award
                  return (
                    <div key={item._key || index} className="flex items-center gap-3 p-4 bg-secondary rounded-xl">
                      <Icon className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium text-foreground">{item.label}</span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {imageUrl && (
            <div
              className={cn(
                "relative transition-all duration-700",
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10",
              )}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src={imageUrl}
                  alt={heading || "About"}
                  className="w-full h-full object-cover"
                />
              </div>
              {badgeNumber && badgeText && (
                <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl">
                  <div className="text-4xl font-bold">{badgeNumber}</div>
                  <div className="text-sm">{badgeText}</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
