"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    question: "Jak długo trwa proces detailingu?",
    answer:
      "Czas realizacji zależy od zakresu prac i stanu pojazdu. Podstawowe mycie detailingowe to 2-3 godziny, pełna korekta lakieru z powłoką ceramiczną może zająć 2-3 dni. Zawsze informujemy o przewidywanym czasie przed rozpoczęciem prac.",
  },
  {
    question: "Czy muszę się wcześniej umówić?",
    answer:
      "Tak, rekomendujemy wcześniejszą rezerwację terminu. Dzięki temu możemy zarezerwować odpowiednią ilość czasu na Twój pojazd i zapewnić najwyższą jakość usług. Możesz umówić się telefonicznie lub przez formularz na stronie.",
  },
  {
    question: "Jak długo utrzymuje się powłoka ceramiczna?",
    answer:
      "Trwałość powłoki ceramicznej zależy od wybranego produktu i warunków eksploatacji. Nasze powłoki utrzymują się od 12 miesięcy do 5 lat. Oferujemy również pakiety konserwacyjne, które przedłużają żywotność ochrony.",
  },
  {
    question: "Czy oferujecie usługi mobilne?",
    answer:
      "Obecnie wykonujemy usługi wyłącznie w naszym studio, gdzie mamy dostęp do profesjonalnego sprzętu i kontrolowanych warunków. Zapewnia to najwyższą jakość wykonania każdej usługi.",
  },
  {
    question: "Jakie marki produktów używacie?",
    answer:
      "Korzystamy wyłącznie z profesjonalnych produktów renomowanych marek jak Gyeon, Koch Chemie, CarPro, Gtechniq i innych. Dobieramy produkty indywidualnie do każdego pojazdu i typu lakieru.",
  },
  {
    question: "Czy udzielacie gwarancji na usługi?",
    answer:
      "Tak, udzielamy gwarancji na wszystkie nasze usługi. Na powłoki ceramiczne gwarancja wynosi od 12 miesięcy do 5 lat w zależności od wybranego produktu. Szczegóły gwarancji omawiamy przed realizacją zlecenia.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-24 bg-card">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">FAQ</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">Często zadawane pytania</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-border rounded-xl overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-6 text-left bg-secondary hover:bg-secondary/80 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300",
                    openIndex === index && "rotate-180",
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  openIndex === index ? "max-h-96" : "max-h-0",
                )}
              >
                <p className="p-6 pt-0 text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
