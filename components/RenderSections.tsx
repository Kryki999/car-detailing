import { Hero } from '@/components/hero'
import { Services } from '@/components/services'
import { Stats } from '@/components/stats'
import { Process } from '@/components/process'
import { Reviews } from '@/components/reviews'
import { FAQ } from '@/components/faq'
import { Pricing } from '@/components/pricing'
import { Gallery } from '@/components/gallery'
import { About } from '@/components/about'
import { Contact } from '@/components/contact'
import { Partners } from '@/components/partners'
import { BlogSection } from '@/components/blog-section'

// Mapa: Jakiej nazwie w Sanity odpowiada jaki komponent w kodzie
const componentsMap: Record<string, any> = {
    heroSection: Hero,
    services: Services,
    stats: Stats,
    process: Process,
    reviews: Reviews,
    faq: FAQ,
    pricing: Pricing,
    gallery: Gallery,
    about: About,
    contact: Contact,
    partners: Partners,
    blogSection: BlogSection,
}

interface SectionProps {
    _type: string
    _key: string
    [key: string]: any
}

export function RenderSections({ sections }: { sections: SectionProps[] | null }) {
    if (!sections) return null

    return (
        <div className="flex flex-col">
            {sections.map((section) => {
                const Component = componentsMap[section._type]

                if (!Component) {
                    // Zabezpieczenie: Jeśli dodasz w CMS coś, czego nie ma w kodzie
                    return (
                        <div key={section._key} className="p-4 bg-red-100 text-red-600 text-center">
                            ⚠️ Nieznany moduł: <strong>{section._type}</strong>
                        </div>
                    )
                }

                return <Component key={section._key} {...section} />
            })}
        </div>
    )
}