"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Calendar, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { urlFor } from "@/sanity/lib/image"

interface BlogPost {
    title: string
    slug: string
    excerpt: string
    publishedAt: string
    mainImage: any
}

interface BlogSectionProps {
    heading?: string
    subtitle?: string
    posts?: BlogPost[]
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

function BlogCard({
    post,
    className,
    featured = false
}: {
    post: BlogPost
    className?: string
    featured?: boolean
}) {
    return (
        <Link
            href={`/blog/${post.slug}`}
            className={cn(
                "group relative block overflow-hidden rounded-2xl",
                "transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20",
                className
            )}
        >
            {/* Background Image */}
            <Image
                src={post.mainImage ? urlFor(post.mainImage).width(1200).url() : '/placeholder.svg'}
                alt={post.title}
                fill
                sizes={featured ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 640px) 100vw, 50vw"}
                className="object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Content */}
            <div className="relative h-full flex flex-col justify-end p-6">
                {/* Date Badge */}
                <div className="flex items-center gap-2 text-white/70 text-sm mb-3">
                    <Calendar className="w-4 h-4" />
                    {formatDate(post.publishedAt)}
                </div>

                {/* Title */}
                <h3 className={cn(
                    "font-bold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors",
                    featured ? "text-2xl lg:text-3xl" : "text-lg lg:text-xl"
                )}>
                    {post.title}
                </h3>

                {/* Excerpt - only on featured */}
                {featured && (
                    <p className="text-white/80 text-sm lg:text-base line-clamp-2 mb-4">
                        {post.excerpt}
                    </p>
                )}

                {/* Read More Arrow */}
                <div className="flex items-center gap-2 text-primary font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    Czytaj więcej
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </Link>
    )
}

export function BlogSection({
    heading = "Nasz Blog",
    subtitle = "Porady, nowości i inspiracje ze świata car detailingu",
    posts = []
}: BlogSectionProps) {
    // Number of posts to show initially (3 in bento grid)
    const INITIAL_COUNT = 3
    // Number of posts to load per "show more" click
    const LOAD_MORE_COUNT = 4

    const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)

    if (!posts || posts.length === 0) {
        return null
    }

    // Posts for bento grid (first 3)
    const bentoPosts = posts.slice(0, INITIAL_COUNT)
    // Additional posts to show
    const additionalPosts = posts.slice(INITIAL_COUNT, visibleCount)
    // Check if there are more posts to load
    const hasMorePosts = visibleCount < posts.length

    const handleLoadMore = () => {
        setVisibleCount(prev => Math.min(prev + LOAD_MORE_COUNT, posts.length))
    }

    return (
        <section id="blog" className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-primary text-sm font-semibold tracking-wider uppercase">Blog</span>
                    <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                        {heading}
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                </div>

                {/* Bento Grid - First 3 Posts */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    {/* Left Column - Featured Post (3/5 width) */}
                    {bentoPosts[0] && (
                        <BlogCard
                            post={bentoPosts[0]}
                            featured
                            className="lg:col-span-3 min-h-[400px] lg:min-h-[500px]"
                        />
                    )}

                    {/* Right Column - Two Posts (2/5 width) */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        {bentoPosts[1] && (
                            <BlogCard
                                post={bentoPosts[1]}
                                className="flex-1 min-h-[200px] lg:min-h-0"
                            />
                        )}
                        {bentoPosts[2] && (
                            <BlogCard
                                post={bentoPosts[2]}
                                className="flex-1 min-h-[200px] lg:min-h-0"
                            />
                        )}
                    </div>
                </div>

                {/* Additional Posts Grid */}
                {additionalPosts.length > 0 && (
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {additionalPosts.map((post) => (
                            <BlogCard
                                key={post.slug}
                                post={post}
                                className="min-h-[250px]"
                            />
                        ))}
                    </div>
                )}

                {/* Load More Button */}
                {hasMorePosts && (
                    <div className="mt-8 text-center">
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={handleLoadMore}
                            className="group border-primary/30 hover:border-primary hover:bg-primary/10"
                        >
                            Pokaż więcej artykułów
                            <ChevronDown className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform" />
                        </Button>
                    </div>
                )}
            </div>
        </section>
    )
}
