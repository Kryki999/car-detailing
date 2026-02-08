import { client } from "@/sanity/lib/client"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { PortableText, PortableTextComponents } from "@portabletext/react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { urlFor } from "@/sanity/lib/image"

// GROQ query for single service
const SERVICE_QUERY = `*[_type == "serviceItem" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  description,
  mainImage,
  body[]{
    ...,
    _type == "image" => {
      ...,
      asset
    }
  },
  gallery
}`

// Generate static params for all services
export async function generateStaticParams() {
    const services = await client.fetch<{ slug: string }[]>(
        `*[_type == "serviceItem"]{ "slug": slug.current }`
    )
    return services.map((service) => ({ slug: service.slug }))
}

// Generate metadata
export async function generateMetadata({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const service = await client.fetch(SERVICE_QUERY, { slug })

    if (!service) {
        return { title: "Usługa nie znaleziona" }
    }

    return {
        title: `${service.title} | Elite Detailing`,
        description: service.description
    }
}

// PortableText components for rich text rendering
const portableTextComponents: PortableTextComponents = {
    block: {
        h2: ({ children }) => (
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-8 mb-4">
                {children}
            </h2>
        ),
        h3: ({ children }) => (
            <h3 className="text-xl lg:text-2xl font-semibold text-foreground mt-6 mb-3">
                {children}
            </h3>
        ),
        normal: ({ children }) => (
            <p className="text-muted-foreground leading-relaxed mb-4">
                {children}
            </p>
        ),
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary pl-4 my-6 italic text-muted-foreground">
                {children}
            </blockquote>
        ),
    },
    marks: {
        strong: ({ children }) => (
            <strong className="font-semibold text-foreground">{children}</strong>
        ),
        em: ({ children }) => <em className="italic">{children}</em>,
        underline: ({ children }) => <u className="underline">{children}</u>,
        link: ({ value, children }) => (
            <a
                href={value?.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 underline transition-colors"
            >
                {children}
            </a>
        ),
    },
    types: {
        image: ({ value }) => (
            <div className="my-8 rounded-xl overflow-hidden">
                <Image
                    src={value.asset ? urlFor(value.asset).width(1200).url() : '/placeholder.svg'}
                    alt={value.alt || "Service image"}
                    width={800}
                    height={500}
                    className="w-full h-auto object-cover"
                />
            </div>
        ),
    },
}

export default async function ServicePage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const service = await client.fetch(SERVICE_QUERY, { slug })

    if (!service) {
        notFound()
    }

    // Generate image URLs
    const mainImageUrl = service.mainImage ? urlFor(service.mainImage).width(1600).url() : undefined

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            {/* Hero Section with Main Image */}
            <section className="relative pt-20">
                {/* Back Button */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Button variant="ghost" asChild className="group">
                        <Link href="/#services" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Wróć do usług
                        </Link>
                    </Button>
                </div>

                {/* Main Image */}
                {mainImageUrl && (
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src={mainImageUrl}
                                alt={service.title}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        </div>
                    </div>
                )}
            </section>

            {/* Article Content */}
            <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                {/* Title */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-6 leading-tight">
                    {service.title}
                </h1>

                {/* Description */}
                {service.description && (
                    <p className="text-xl text-muted-foreground mb-8 leading-relaxed border-l-4 border-primary pl-4">
                        {service.description}
                    </p>
                )}

                {/* Body Content */}
                <div className="prose prose-lg max-w-none">
                    {service.body && (
                        <PortableText
                            value={service.body}
                            components={portableTextComponents}
                        />
                    )}
                </div>

                {/* Gallery */}
                {service.gallery && service.gallery.length > 0 && (
                    <div className="mt-12">
                        <h3 className="text-xl font-bold text-foreground mb-6">Galeria</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {service.gallery.map((img: any, index: number) => (
                                <div
                                    key={index}
                                    className="relative aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                                >
                                    <Image
                                        src={img ? urlFor(img).width(800).url() : '/placeholder.svg'}
                                        alt={`${service.title} - zdjęcie ${index + 1}`}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Back Button at Bottom */}
                <div className="mt-16 pt-8 border-t border-border">
                    <Button variant="outline" size="lg" asChild className="group">
                        <Link href="/#services" className="flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Wróć do wszystkich usług
                        </Link>
                    </Button>
                </div>
            </article>

            <Footer />
        </main>
    )
}
