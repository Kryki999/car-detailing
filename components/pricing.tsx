"use client"

import { useRef, useEffect, useState } from "react"
import { Check, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PricingPlan {
  name: string
  description: string
  price: string
  popular: boolean
  isCustomPrice: boolean
  features: string[]
  _key?: string
}

interface PricingProps {
  label?: string
  heading?: string
  description?: string
  plans?: PricingPlan[]
  footerNote?: string
}

export function Pricing(props: PricingProps) {
  const { label, heading, description, plans, footerNote } = props

  // Early return if no plans
  if (!plans || plans.length === 0) {
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
    <section id="cennik" ref={ref} className="py-24 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {label && (
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">{label}</span>
          )}
          {heading && (
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">{heading}</h2>
          )}
          {description && (
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {plans.map((plan, index) => (
            <div
              key={plan._key || index}
              className={cn(
                "relative bg-card border rounded-2xl p-8 transition-all duration-700 flex flex-col h-full",
                plan.popular ? "border-primary" : "border-border",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                  Najpopularniejszy
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-muted-foreground">{plan.description}</p>
              </div>

              <div className="text-center mb-8 min-h-[80px] flex items-center justify-center">
                {plan.isCustomPrice ? (
                  <div className="flex flex-col items-center">
                    <span className="text-xl font-bold text-primary">Bezpłatna wycena</span>
                    <span className="text-sm text-muted-foreground mt-1">Dostosowana do Twoich potrzeb</span>
                  </div>
                ) : (
                  <div>
                    <span className="text-sm text-muted-foreground block mb-1">od</span>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-5xl font-bold text-foreground">{plan.price}</span>
                      <span className="text-muted-foreground">PLN</span>
                    </div>
                  </div>
                )}
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={cn(
                  "w-full py-6 mt-auto",
                  plan.popular
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/80 text-secondary-foreground",
                )}
                asChild
              >
                <a href="tel:+48123456789">
                  <Phone className="w-4 h-4 mr-2" />
                  Zadzwoń i umów
                </a>
              </Button>
            </div>
          ))}
        </div>

        {footerNote && (
          <p className="text-center mt-8 text-sm text-muted-foreground">
            {footerNote}
          </p>
        )}
      </div>
    </section>
  )
}
