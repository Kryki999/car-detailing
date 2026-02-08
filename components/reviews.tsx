"use client"

import { useRef, useEffect, useState } from "react"
import { Star, Quote } from "lucide-react"
import { cn } from "@/lib/utils"
import { TrustBadge } from "@/components/trust-badge"

interface ReviewItem {
  name: string
  rating: number
  text: string
  _key?: string
}

interface ReviewsProps {
  label?: string
  heading?: string
  googleRating?: string
  reviewCountText?: string
  followersText?: string
  reviewsList?: ReviewItem[]
}

export function Reviews(props: ReviewsProps) {
  const { label, heading, googleRating, reviewCountText, followersText, reviewsList } = props

  // Early return if no reviews
  if (!reviewsList || reviewsList.length === 0) {
    return null
  }

  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-28 md:py-36 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          {label && <p className="text-primary font-semibold mb-4">{label}</p>}
          {heading && <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">{heading}</h2>}

          {/* Trust Badge - CMS-driven */}
          <div className="flex justify-center">
            <TrustBadge
              ratingText={googleRating}
              reviewCountText={reviewCountText}
              followersText={followersText}
            />
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {reviewsList.map((review, index) => {
            return (
              <div
                key={review._key || index}
                className={cn(
                  "relative rounded-2xl p-8 transition-all duration-700 flex flex-col h-full",
                  // Glassmorphism effect
                  "bg-white/5 backdrop-blur-sm",
                  "border border-white/10",
                  // Soft shadow on hover
                  "hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <Quote className="absolute top-6 right-6 h-10 w-10 text-primary/10" />

                <div className="flex gap-1 mb-6">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6 flex-grow text-lg italic">
                  &quot;{review.text}&quot;
                </p>

                <div className="mt-auto pt-4 border-t border-white/10">
                  <h3 className="font-bold text-lg">{review.name}</h3>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
