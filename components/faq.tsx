"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface FAQItem {
  question: string
  answer: string
  _key?: string
}

interface FAQProps {
  label?: string
  heading?: string
  faqList?: FAQItem[]
}

export function FAQ(props: FAQProps) {
  const { label, heading, faqList } = props

  // Early return if no FAQs
  if (!faqList || faqList.length === 0) {
    return null
  }

  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        {(label || heading) && (
          <div className="text-center mb-16">
            {label && <p className="text-primary font-semibold mb-4">{label}</p>}
            {heading && <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">{heading}</h2>}
          </div>
        )}

        {/* FAQ List */}
        <div className="space-y-4">
          {faqList.map((faq, index) => (
            <div
              key={faq._key || index}
              className="bg-background border border-border rounded-xl overflow-hidden transition-all hover:shadow-md"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-accent/50 transition-colors"
              >
                <span className="font-semibold text-lg pr-8">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 flex-shrink-0 transition-transform duration-300",
                    openIndex === index && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "grid transition-all duration-300",
                  openIndex === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <div className="px-6 py-5 bg-accent/30 border-t border-border">
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
