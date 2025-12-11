"use client"

import { motion } from "framer-motion"

const steps = [
  {
    number: "01",
    title: "Wyślij zapytanie",
    description:
      "Skontaktuj się z nami telefonicznie, mailowo lub przez formularz. Opisz swoje potrzeby, a my dobierzemy optymalne rozwiązanie dla Twojego pojazdu.",
  },
  {
    number: "02",
    title: "Umów wizytę",
    description:
      "Wspólnie ustalimy dogodny termin realizacji. Przed wizytą otrzymasz szczegółową wycenę i informacje o czasie trwania usługi.",
  },
  {
    number: "03",
    title: "Odbierz perfekcyjny efekt",
    description:
      "Po zakończeniu prac otrzymasz dokumentację wykonanych usług oraz gwarancję na zastosowane powłoki ochronne. Ciesz się efektem!",
  },
]

export function Process() {
  return (
    <section className="py-24 md:py-32 bg-card relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Jak działamy</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 max-w-2xl">
            Prosty proces, <span className="text-primary">perfekcyjny efekt</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-3 md:gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Card */}
              <div className="bg-background border border-border rounded-3xl p-8 md:p-10 lg:p-12 h-full transition-all duration-500 hover:border-primary/40 group">
                {/* Large number */}
                <div className="mb-8">
                  <span className="text-8xl md:text-9xl font-bold text-primary/20 group-hover:text-primary/30 transition-colors duration-500 leading-none">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{step.title}</h3>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">{step.description}</p>

                {/* Decorative line */}
                <div className="mt-8 h-1 w-16 bg-primary/20 group-hover:w-24 group-hover:bg-primary/40 transition-all duration-500 rounded-full" />
              </div>

              {/* Arrow between cards (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary/40">
                    <path
                      d="M9 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-24 flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a
            href="#kontakt"
            className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 text-lg"
          >
            Rozpocznij współpracę
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="tel:+48123456789"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-lg"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
            lub zadzwoń: +48 123 456 789
          </a>
        </motion.div>
      </div>
    </section>
  )
}
