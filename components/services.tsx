"use client"
import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { LottieIcon } from "@/components/lottie-icon"

const services = [
  {
    iconPath: "/ScrubBrush.json",
    title: "Mycie detailingowe",
    description: "Kompleksowe mycie z użyciem profesjonalnych środków i technik bezpiecznych dla lakieru. Stosujemy metodę dwuwiadrową z pełną dekontaminacją i bezpiecznym osuszaniem.",
  },
  {
    iconPath: "/Shield.json",
    title: "Powłoki ceramiczne",
    description: "Długotrwała ochrona lakieru z efektem hydrofobowym i głębokim połyskiem. Zapewniamy certyfikowaną ochronę do 5 lat z efektem samooczyszczania.",
  },
  {
    iconPath: "/Stars.json",
    title: "Korekta lakieru",
    description: "Profesjonalne polerowanie usuwające rysy, hologramy i oxidację lakieru. Gwarantujemy głęboki połysk i bezpieczeństwo dzięki pomiarom grubości powłoki.",
  },
  {
    iconPath: "/Cleaning.json",
    title: "Detailing wnętrza",
    description: "Kompleksowe czyszczenie i pielęgnacja wszystkich elementów wnętrza pojazdu. Obejmuje pranie tapicerki, czyszczenie skór oraz ozonowanie.",
  },
  {
    iconPath: "/WaterDrop.json",
    title: "Folie ochronne PPF",
    description: "Niewidoczna ochrona przed odpryskami, rysami i czynnikami zewnętrznymi. Oferujemy certyfikowane folie samoregenerujące z 10-letnią gwarancją.",
  },
  {
    iconPath: "/Light.json",
    title: "Renowacja reflektorów",
    description: "Przywracanie pełnej przejrzystości i blasku zmatowiałym reflektorom. Usługa obejmuje polerowanie i zabezpieczenie powłoką UV z gwarancją jakości.",
  },
]

function ServiceCard({ service, index }: { service: (typeof services)[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

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
    <div
      ref={ref}
      className={cn(
        "group relative bg-card border border-border rounded-xl p-6 sm:p-8 transition-all duration-500 hover:border-primary/50 hover:bg-secondary/50 flex flex-col items-center text-center",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="mb-6 transition-transform duration-500 group-hover:scale-110">
        <LottieIcon path={service.iconPath} className="w-50 h-50" />
      </div>

      <h3 className="text-xl font-bold text-foreground mb-3 uppercase tracking-wide">{service.title}</h3>
      <p className="text-muted-foreground leading-relaxed">{service.description}</p>

      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  )
}

export function Services() {
  return (
    <section id="uslugi" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">Nasze usługi</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">Kompleksowa pielęgnacja</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Oferujemy pełen zakres usług detailingowych dla najbardziej wymagających klientów
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
