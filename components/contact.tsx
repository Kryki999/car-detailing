"use client"

import { useRef, useEffect, useState } from "react"
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ContactProps {
  label?: string
  heading?: string
  addressLine1?: string
  addressLine2?: string
  phone?: string
  email?: string
  hoursLine1?: string
  hoursLine2?: string
  socialLabel?: string
  instagramUrl?: string
  facebookUrl?: string
  ctaText?: string
  ctaPhone?: string
  mapEmbedUrl?: string
}

export function Contact(props: ContactProps) {
  const {
    label,
    heading,
    addressLine1,
    addressLine2,
    phone,
    email,
    hoursLine1,
    hoursLine2,
    socialLabel,
    instagramUrl,
    facebookUrl,
    ctaText,
    ctaPhone,
    mapEmbedUrl
  } = props

  // Early return if no contact data at all
  const hasContactInfo = addressLine1 || phone || email || hoursLine1
  if (!hasContactInfo && !mapEmbedUrl) {
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

  const hasSocials = instagramUrl || facebookUrl

  return (
    <section id="kontakt" ref={ref} className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(label || heading) && (
          <div className="text-center mb-16">
            {label && (
              <span className="text-primary text-sm font-semibold tracking-wider uppercase">{label}</span>
            )}
            {heading && (
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">{heading}</h2>
            )}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div
            className={cn(
              "transition-all duration-700",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10",
            )}
          >
            <div className="space-y-8">
              {(addressLine1 || addressLine2) && (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Adres</h3>
                    {addressLine1 && <p className="text-muted-foreground">{addressLine1}</p>}
                    {addressLine2 && <p className="text-muted-foreground">{addressLine2}</p>}
                  </div>
                </div>
              )}

              {phone && (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Telefon</h3>
                    <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-foreground hover:text-primary transition-colors">
                      {phone}
                    </a>
                  </div>
                </div>
              )}

              {email && (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email</h3>
                    <a
                      href={`mailto:${email}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {email}
                    </a>
                  </div>
                </div>
              )}

              {(hoursLine1 || hoursLine2) && (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Godziny otwarcia</h3>
                    {hoursLine1 && <p className="text-muted-foreground">{hoursLine1}</p>}
                    {hoursLine2 && <p className="text-muted-foreground">{hoursLine2}</p>}
                  </div>
                </div>
              )}
            </div>

            {hasSocials && (
              <div className="mt-10">
                {socialLabel && <h3 className="font-semibold text-foreground mb-4">{socialLabel}</h3>}
                <div className="flex gap-4">
                  {instagramUrl && (
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Odwiedź nas na Instagramie"
                      className="w-12 h-12 rounded-xl bg-secondary hover:bg-primary/20 flex items-center justify-center transition-colors"
                    >
                      <Instagram className="w-5 h-5 text-foreground" />
                    </a>
                  )}
                  {facebookUrl && (
                    <a
                      href={facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Odwiedź nas na Facebooku"
                      className="w-12 h-12 rounded-xl bg-secondary hover:bg-primary/20 flex items-center justify-center transition-colors"
                    >
                      <Facebook className="w-5 h-5 text-foreground" />
                    </a>
                  )}
                </div>
              </div>
            )}

            {ctaText && ctaPhone && (
              <Button className="mt-10 bg-primary hover:bg-primary/90 text-black px-8 py-6 text-lg font-bold tracking-wide" asChild>
                <a href={ctaPhone}>{ctaText}</a>
              </Button>
            )}
          </div>

          {/* Map */}
          {mapEmbedUrl && (
            <div
              className={cn(
                "transition-all duration-700",
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10",
              )}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden border border-border">
                <iframe
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  title="Lokalizacja naszego studia"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.95) contrast(0.9)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
