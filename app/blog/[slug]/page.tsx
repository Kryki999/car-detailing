import { client } from "@/sanity/lib/client"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { PortableText, PortableTextComponents } from "@portabletext/react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { urlFor } from "@/sanity/lib/image"

// GROQ query for single post
const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  mainImage,
  body[]{
    ...,
    _type == "image" => {
      ...,
      asset
    }
  },
  additionalImages
}`

// Generate static params for all posts
export async function generateStaticParams() {
    const posts = await client.fetch<{ slug: string }[]>(
        `*[_type == "post"]{ "slug": slug.current }`
    )
    return posts.map((post) => ({ slug: post.slug }))
}

// Generate metadata
export async function generateMetadata({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const post = await client.fetch(POST_QUERY, { slug })

    if (!post) {
        return { title: "Post nie znaleziony" }
    }

    return {
        title: `${post.title} | Elite Detailing Blog`,
        description: post.excerpt
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
                    alt={value.alt || "Blog image"}
                    width={800}
                    height={500}
                    className="w-full h-auto object-cover"
                />
            </div>
        ),
    },
}

function formatDate(dateString: string): string {
    const date = new Date(dateString)
    const months = [
        'stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca',
        'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'
    ]
    const day = date.getDate()
    const month = months[date.getMonth()]
    const year = date.getFullYear()
    return `${day} ${month} ${year}`
}

function estimateReadTime(body: any[]): number {
    if (!body) return 3
    const text = body
        .filter((block) => block._type === 'block')
        .map((block) => block.children?.map((child: any) => child.text).join(' '))
        .join(' ')
    const wordCount = text.split(/\s+/).length
    return Math.ceil(wordCount / 200) || 3
}

export default async function BlogPostPage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const post = await client.fetch(POST_QUERY, { slug })

    if (!post) {
        notFound()
    }

    const readTime = estimateReadTime(post.body)

    // Generate image URLs
    const mainImageUrl = post.mainImage ? urlFor(post.mainImage).width(1600).url() : undefined

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            {/* Hero Section with Main Image */}
            <section className="relative pt-20">
                {/* Back Button */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Button variant="ghost" asChild className="group">
                        <Link href="/#blog" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Wróć do bloga
                        </Link>
                    </Button>
                </div>

                {/* Main Image */}
                {mainImageUrl && (
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src={mainImageUrl}
                                alt={post.title}
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
                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {formatDate(post.publishedAt)}
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {readTime} min czytania
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-6 leading-tight">
                    {post.title}
                </h1>

                {/* Excerpt */}
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed border-l-4 border-primary pl-4">
                    {post.excerpt}
                </p>

                {/* Body Content */}
                <div className="prose prose-lg max-w-none">
                    {post.body && (
                        <PortableText
                            value={post.body}
                            components={portableTextComponents}
                        />
                    )}
                </div>

                {/* Additional Images Gallery */}
                {post.additionalImages && post.additionalImages.length > 0 && (
                    <div className="mt-12">
                        <h3 className="text-xl font-bold text-foreground mb-6">Galeria</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {post.additionalImages.map((img: any, index: number) => (
                                <div
                                    key={index}
                                    className="relative aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                                >
                                    <Image
                                        src={img ? urlFor(img).width(800).url() : '/placeholder.svg'}
                                        alt={`${post.title} - zdjęcie ${index + 1}`}
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
                        <Link href="/#blog" className="flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Wróć do wszystkich artykułów
                        </Link>
                    </Button>
                </div>
            </article>

            <Footer />
        </main>
    )
}
