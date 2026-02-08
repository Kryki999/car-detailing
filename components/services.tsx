"use client"
import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { LottieIcon } from "@/components/lottie-icon"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface ServiceItem {
  title: string
  description: string
  icon?: string
  slug?: { current: string }
  _key?: string
  _id?: string
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
  const slug = service.slug?.current

  return (
    <div
      ref={ref}
      className={cn(
        "group relative rounded-2xl p-8 sm:p-10 transition-all duration-500 flex flex-col items-center text-center",
        // Glassmorphism effect
        "bg-white/5 backdrop-blur-sm",
        "border border-white/10",
        // Hover effects
        "hover:border-primary/40 hover:bg-white/10 hover:shadow-2xl hover:shadow-primary/10",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Icon */}
      <div className="mb-8 transition-transform duration-500 group-hover:scale-110">
        <LottieIcon path={iconPath} className="w-48 h-48" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-foreground mb-4 uppercase tracking-wide">{service.title}</h3>

      {/* Description */}
      <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">{service.description}</p>

      {/* More Button */}
      {slug && (
        <Button variant="ghost" asChild className="group/btn mt-auto">
          <Link href={`/services/${slug}`} className="flex items-center gap-2 text-primary hover:text-primary/80">
            Więcej
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </Button>
      )}

      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  )
}

export function Services(props: ServicesProps) {
  // Filter out null values (can happen during migration from inline objects to references)
  const validServices = props.servicesList?.filter((service): service is ServiceItem => service !== null) || []

  // Early return if no services data from CMS
  if (validServices.length === 0) {
    return null
  }

  return (
    <section id="services" className="py-28 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-20">
          {props.label && (
            <span className="text-primary text-sm font-semibold tracking-wider uppercase block mb-4">
              {props.label}
            </span>
          )}

          {props.heading && (
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {props.heading}
            </h2>
          )}

          {props.description && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {props.description}
            </p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {validServices.map((service, index) => (
            <ServiceCard key={service._id || service._key || index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}