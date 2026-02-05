"use client"
import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { LottieIcon } from "@/components/lottie-icon"

interface ServiceItem {
  title: string
  description: string
  icon?: string
  _key: string
}

interface ServicesProps {
  label?: string
  heading?: string
  description?: string
  servicesList?: ServiceItem[]
}

function ServiceCard({ service, index }: { service: ServiceItem; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const iconName = service.icon || "Stars"
  const iconPath = iconName.endsWith(".json") ? iconName : `/${iconName}.json`

  return (
    <div
      ref={ref}
      className={cn(
        "group relative bg-card border border-border rounded-xl p-6 sm:p-8 transition-all duration-500 hover:border-primary/50 hover:bg-secondary/50 flex flex-col items-center text-center",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="mb-6 transition-transform duration-500 group-hover:scale-110">
        <LottieIcon path={iconPath} className="w-48 h-48" />
      </div>

      <h3 className="text-xl font-bold text-foreground mb-3 uppercase tracking-wide">{service.title}</h3>
      <p className="text-muted-foreground leading-relaxed mb-4">{service.description}</p>

      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  )
}

export function Services(props: ServicesProps) {
  // Early return if no services data from CMS
  if (!props.servicesList || props.servicesList.length === 0) {
    return null
  }

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          {props.label && (
            <span className="text-primary text-sm font-semibold tracking-wider uppercase block mb-3">
              {props.label}
            </span>
          )}

          {props.heading && (
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {props.heading}
            </h2>
          )}

          {props.description && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {props.description}
            </p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {props.servicesList.map((service, index) => (
            <ServiceCard key={service._key || index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}