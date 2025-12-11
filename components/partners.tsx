"use client"

const partners = [
  { name: "Porsche", logo: "PORSCHE" },
  { name: "BMW", logo: "BMW" },
  { name: "Mercedes", logo: "MERCEDES" },
  { name: "Audi", logo: "AUDI" },
  { name: "Ferrari", logo: "FERRARI" },
  { name: "Lamborghini", logo: "LAMBORGHINI" },
  { name: "Maserati", logo: "MASERATI" },
  { name: "Bentley", logo: "BENTLEY" },
]

export function Partners() {
  return (
    <section className="py-16 bg-background border-y border-border overflow-hidden w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-muted-foreground mb-10 uppercase tracking-wider">
          Zaufali nam właściciele marek
        </p>
      </div>

      <div className="relative">
        <div className="flex animate-scroll-left">
          {[...partners, ...partners].map((partner, index) => (
            <div key={index} className="flex-shrink-0 mx-8 sm:mx-12 lg:mx-16">
              <span className="text-2xl sm:text-3xl font-bold text-muted-foreground/50 hover:text-muted-foreground transition-colors tracking-widest">
                {partner.logo}
              </span>
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
