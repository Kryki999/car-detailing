"use client"

import { useRef, useEffect, useState } from "react"
import { ImageComparison } from "./image-comparison"
import { cn } from "@/lib/utils"
import { urlFor } from "@/sanity/lib/image"

interface GalleryItem {
  beforeImage?: any
  afterImage?: any
  title: string
  _key?: string
}

interface GalleryProps {
  label?: string
  heading?: string
  description?: string
  galleryItems?: GalleryItem[]
}

export function Gallery(props: GalleryProps) {
  const { label, heading, description, galleryItems } = props

  // Early return if no gallery items
  if (!galleryItems || galleryItems.length === 0) {
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
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  // Group items into rows of 2
  const rows: GalleryItem[][] = []
  for (let i = 0; i < galleryItems.length; i += 2) {
    rows.push(galleryItems.slice(i, i + 2))
  }

  return (
    <section id="galeria" ref={ref} className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="flex flex-col gap-8">
          {rows.map((row, rowIndex) => {
            const isEvenRow = rowIndex % 2 === 0
            return (
              <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
                {row.map((item, itemIndex) => {
                  const isFirstInRow = itemIndex === 0
                  const colSpan = isEvenRow
                    ? (isFirstInRow ? "md:col-span-7" : "md:col-span-5")
                    : (isFirstInRow ? "md:col-span-5" : "md:col-span-7")
                  const delay = (rowIndex * 2 + itemIndex) * 100

                  return (
                    <div
                      key={item._key || `${rowIndex}-${itemIndex}`}
                      className={cn(
                        colSpan,
                        "transition-all duration-700",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                      )}
                      style={{ transitionDelay: `${delay}ms` }}
                    >
                      <div className="rounded-xl overflow-hidden">
                        <ImageComparison
                          beforeImage={item.beforeImage ? urlFor(item.beforeImage).width(1600).format('webp').quality(85).url() : "/placeholder.svg"}
                          afterImage={item.afterImage ? urlFor(item.afterImage).width(1600).format('webp').quality(85).url() : "/placeholder.svg"}
                          className="aspect-[4/3]"
                        />
                      </div>
                      {item.title && (
                        <p className="mt-4 text-sm text-muted-foreground font-medium">{item.title}</p>
                      )}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
