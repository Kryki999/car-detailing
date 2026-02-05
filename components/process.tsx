"use client"

import { motion } from "framer-motion"
import { ArrowRight, Phone } from "lucide-react"
import Link from "next/link"

interface ProcessStep {
  number: string
  title: string
  description: string
  _key?: string
}

interface ProcessProps {
  label?: string
  heading?: string
  headingAccent?: string
  processSteps?: ProcessStep[]
  ctaText?: string
  ctaLink?: string
  secondCtaText?: string
  secondCtaLink?: string
}

export function Process(props: ProcessProps) {
  const {
    label,
    heading,
    headingAccent,
    processSteps,
    ctaText,
    ctaLink,
    secondCtaText,
    secondCtaLink
  } = props

  // Early return if no steps
  if (!processSteps || processSteps.length === 0) {
    return null
  }

  return (
    <section className="py-24 md:py-32 bg-card relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        {(label || heading) && (
          <div className="max-w-3xl mx-auto text-center mb-16">
            {label && <p className="text-primary font-semibold mb-4">{label}</p>}
            {(heading || headingAccent) && (
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {heading}{headingAccent && <span className="text-primary">{headingAccent}</span>}
              </h2>
            )}
          </div>
        )}

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-7xl mx-auto">
          {processSteps.map((step, index) => (
            <motion.div
              key={step._key || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              {/* Arrow tylko między krokami na desktop */}
              {index < processSteps.length - 1 && (
                <div className="hidden md:block absolute top-12 -right-4 z-10">
                  <ArrowRight className="h-8 w-8 text-primary" />
                </div>
              )}

              <div className="bg-background border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow h-full">
                <div className="text-6xl font-bold text-primary/20 mb-4">{step.number}</div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        {(ctaText || secondCtaText) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
            {ctaText && ctaLink && (
              <Link
                href={ctaLink}
                className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
              >
                {ctaText} <ArrowRight className="h-5 w-5" />
              </Link>
            )}
            {secondCtaText && secondCtaLink && (
              <Link
                href={secondCtaLink}
                className="px-8 py-4 border-2 border-border rounded-lg hover:bg-accent transition-colors inline-flex items-center gap-2"
              >
                <Phone className="h-5 w-5" /> {secondCtaText}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
