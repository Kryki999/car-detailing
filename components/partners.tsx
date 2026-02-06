"use client"

import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"

interface PartnerLogo {
  name: string
  logo?: any
  _key?: string
}

interface PartnersProps {
  heading?: string
  logos?: PartnerLogo[]
}

export function Partners(props: PartnersProps) {
  const { heading, logos } = props

  // Early return if no logos
  if (!logos || logos.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-background border-y border-border overflow-hidden w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {heading && (
          <p className="text-center text-sm text-muted-foreground mb-10 uppercase tracking-wider">
            {heading}
          </p>
        )}
      </div>

      <div className="relative">
        <div className="flex animate-scroll-left">
          {[...logos, ...logos].map((partner, index) => (
            <div key={`${partner._key || partner.name}-${index}`} className="flex-shrink-0 mx-8 sm:mx-12 lg:mx-16">
              {partner.logo ? (
                <div className="relative h-12 sm:h-14 lg:h-16 w-32 sm:w-40 lg:w-48">
                  <Image
                    src={urlFor(partner.logo).width(400).format('webp').quality(85).url()}
                    alt={partner.name}
                    fill
                    className="object-contain grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all"
                  />
                </div>
              ) : (
                <span className="text-2xl sm:text-3xl font-bold text-muted-foreground/50 hover:text-muted-foreground transition-colors tracking-widest">
                  {partner.name}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
    </section>
  )
}
