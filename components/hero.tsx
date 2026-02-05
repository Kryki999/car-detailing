"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

interface HeroProps {
  title?: string
  subtitle?: string
  ctaText?: string
  ctaLink?: string
  secondCtaText?: string
  secondCtaLink?: string
  imageUrl?: string
  videoUrl?: string
  mobileImageUrl?: string
}

export function Hero({
  title,
  subtitle,
  ctaText,
  ctaLink,
  secondCtaText,
  secondCtaLink,
  imageUrl,
  videoUrl,
  mobileImageUrl
}: HeroProps) {

  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setLoaded(true) }, [])

  // No background at all if no media provided
  const hasBackground = imageUrl || videoUrl || mobileImageUrl

  return (
    <section className="relative h-[100dvh] min-h-screen flex items-center justify-center overflow-hidden">
      {/* Mobile Background Image */}
      {(mobileImageUrl || imageUrl) && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
          style={{ backgroundImage: `url('${mobileImageUrl || imageUrl}')` }}
        >
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/10 to-background" />
        </div>
      )}

      {/* Desktop Background - Video or Image */}
      {videoUrl ? (
        <div className="absolute inset-0 hidden md:block">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/20 to-background" />
        </div>
      ) : imageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block"
          style={{ backgroundImage: `url('${imageUrl}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/20 to-background" />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className={`transition-all duration-1000 text-center md:text-left ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-8 backdrop-blur-md">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm text-white font-medium tracking-wide">Dostępne terminy</span>
          </div>

          {title && (
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 drop-shadow-lg font-figtree">
              {title}
            </h1>
          )}

          {subtitle && (
            <p className="max-w-2xl md:mx-0 mx-auto text-lg sm:text-xl text-white mb-10 leading-relaxed drop-shadow-md font-figtree font-semibold">
              {subtitle}
            </p>
          )}

          <div className="flex flex-col sm:flex-row items-center md:items-start md:justify-start justify-center gap-4">
            {/* Primary CTA Button */}
            {ctaText && ctaLink && (
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 rounded-full"
                asChild
              >
                <a href={ctaLink}>{ctaText}</a>
              </Button>
            )}

            {/* Secondary CTA Button */}
            {secondCtaText && secondCtaLink && (
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/50 px-8 py-6 text-lg font-semibold backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 rounded-full"
                asChild
              >
                <a href={secondCtaLink}>{secondCtaText}</a>
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white/50" />
      </div>
    </section>
  )
}