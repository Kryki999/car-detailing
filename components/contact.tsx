"use client"

import { useRef, useEffect, useState } from "react"
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Contact() {
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
    <section id="kontakt" ref={ref} className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">Kontakt</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">Odwiedź nas</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div
            className={cn(
              "transition-all duration-700",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10",
            )}
          >
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Adres</h3>
                  <p className="text-muted-foreground">ul. Motoryzacyjna 15</p>
                  <p className="text-muted-foreground">00-001 Warszawa</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Telefon</h3>
                  <a href="tel:+48123456789" className="text-muted-foreground hover:text-primary transition-colors">
                    +48 123 456 789
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Email</h3>
                  <a
                    href="mailto:kontakt@elitedetailing.pl"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    kontakt@elitedetailing.pl
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Godziny otwarcia</h3>
                  <p className="text-muted-foreground">Pon - Pt: 8:00 - 18:00</p>
                  <p className="text-muted-foreground">Sob: 9:00 - 15:00</p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="font-semibold text-foreground mb-4">Śledź nas</h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-12 h-12 rounded-xl bg-secondary hover:bg-primary/20 flex items-center justify-center transition-colors"
                >
                  <Instagram className="w-5 h-5 text-foreground" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 rounded-xl bg-secondary hover:bg-primary/20 flex items-center justify-center transition-colors"
                >
                  <Facebook className="w-5 h-5 text-foreground" />
                </a>
              </div>
            </div>

            <Button className="mt-10 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg" asChild>
              <a href="tel:+48123456789">Umów wizytę</a>
            </Button>
          </div>

          {/* Map */}
          <div
            className={cn(
              "transition-all duration-700",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10",
            )}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.6891726626896!2d21.012229!3d52.229676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc669a869f01%3A0x72f0be2a88ead3fc!2sWarszawa!5e0!3m2!1spl!2spl!4v1634567890123!5m2!1spl!2spl"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.95) contrast(0.9)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
