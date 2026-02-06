import dynamic from 'next/dynamic'
import { Hero } from '@/components/hero'
import { Services } from '@/components/services'
import { Stats } from '@/components/stats'
import { Process } from '@/components/process'

// Dynamic imports for below-fold components (lazy loaded)
const Reviews = dynamic(() => import('@/components/reviews').then(mod => ({ default: mod.Reviews })), {
    loading: () => <div className="min-h-[400px]" />
})
const FAQ = dynamic(() => import('@/components/faq').then(mod => ({ default: mod.FAQ })), {
    loading: () => <div className="min-h-[400px]" />
})
const Pricing = dynamic(() => import('@/components/pricing').then(mod => ({ default: mod.Pricing })), {
    loading: () => <div className="min-h-[400px]" />
})
const Gallery = dynamic(() => import('@/components/gallery').then(mod => ({ default: mod.Gallery })), {
    loading: () => <div className="min-h-[400px]" />
})
const About = dynamic(() => import('@/components/about').then(mod => ({ default: mod.About })), {
    loading: () => <div className="min-h-[400px]" />
})
const Contact = dynamic(() => import('@/components/contact').then(mod => ({ default: mod.Contact })), {
    loading: () => <div className="min-h-[400px]" />
})
const Partners = dynamic(() => import('@/components/partners').then(mod => ({ default: mod.Partners })), {
    loading: () => <div className="min-h-[200px]" />
})
const BlogSection = dynamic(() => import('@/components/blog-section').then(mod => ({ default: mod.BlogSection })), {
    loading: () => <div className="min-h-[400px]" />
})

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