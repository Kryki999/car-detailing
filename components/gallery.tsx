"use client"

import { useRef, useEffect, useState } from "react"
import { ImageComparison } from "./image-comparison"
import { cn } from "@/lib/utils"

const galleryItems = [
  {
    before: "/dirty-dusty-black-car-before-detailing.jpg",
    after: "/shiny-polished-black-car-after-detailing-perfect-r.jpg",
    title: "Korekta lakieru BMW M4",
  },
  {
    before: "/scratched-car-paint-surface-before-polishing.jpg",
    after: "/flawless-glossy-car-paint-after-ceramic-coating.jpg",
    title: "Powłoka ceramiczna Porsche 911",
  },
  {
    before: "/dirty-car-interior-leather-seats-before-cleaning.jpg",
    after: "/clean-pristine-car-interior-leather-after-detailin.jpg",
    title: "Detailing wnętrza Mercedes AMG",
  },
  {
    before: "/oxidized-car-headlights-cloudy-before-restoration.jpg",
    after: "/crystal-clear-car-headlights-after-polishing-resto.jpg",
    title: "Renowacja reflektorów Audi RS6",
  },
]

export function Gallery() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="galeria" ref={ref} className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">Galeria</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">Nasze realizacje</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Przesuń suwak aby zobaczyć efekty naszej pracy
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {/* Top row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
            <div
              className={cn(
                "md:col-span-7 transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
              style={{ transitionDelay: "0ms" }}
            >
              <div className="rounded-xl overflow-hidden">
                <ImageComparison
                  beforeImage={galleryItems[0].before}
                  afterImage={galleryItems[0].after}
                  className="aspect-[4/3]"
                />
              </div>
              <p className="mt-4 text-sm text-muted-foreground font-medium">{galleryItems[0].title}</p>
            </div>
            <div
              className={cn(
                "md:col-span-5 transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
              style={{ transitionDelay: "100ms" }}
            >
              <div className="rounded-xl overflow-hidden">
                <ImageComparison
                  beforeImage={galleryItems[1].before}
                  afterImage={galleryItems[1].after}
                  className="aspect-[4/3]"
                />
              </div>
              <p className="mt-4 text-sm text-muted-foreground font-medium">{galleryItems[1].title}</p>
            </div>
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
            <div
              className={cn(
                "md:col-span-5 transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="rounded-xl overflow-hidden">
                <ImageComparison
                  beforeImage={galleryItems[2].before}
                  afterImage={galleryItems[2].after}
                  className="aspect-[4/3]"
                />
              </div>
              <p className="mt-4 text-sm text-muted-foreground font-medium">{galleryItems[2].title}</p>
            </div>
            <div
              className={cn(
                "md:col-span-7 transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
              style={{ transitionDelay: "300ms" }}
            >
              <div className="rounded-xl overflow-hidden">
                <ImageComparison
                  beforeImage={galleryItems[3].before}
                  afterImage={galleryItems[3].after}
                  className="aspect-[4/3]"
                />
              </div>
              <p className="mt-4 text-sm text-muted-foreground font-medium">{galleryItems[3].title}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
