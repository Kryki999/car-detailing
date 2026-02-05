import { defineType } from 'sanity'

export const page = defineType({
    name: 'page',
    title: 'Page',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required()
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96
            },
            validation: (Rule) => Rule.required()
        },
        {
            name: 'modules',
            title: 'Page Modules',
            type: 'array',
            of: [
                { type: 'heroSection' },
                { type: 'services' },
                { type: 'stats' },
                { type: 'process' },
                { type: 'reviews' },
                { type: 'faq' },
                { type: 'pricing' },
                { type: 'gallery' },
                { type: 'about' },
                { type: 'contact' },
                { type: 'partners' },
                { type: 'blogSection' }
            ]
        }
    ],
    preview: {
        select: {
            title: 'title',
            slug: 'slug.current'
        },
        prepare({ title, slug }) {
            return {
                title: title,
                subtitle: slug ? `/${slug}` : 'No slug'
            }
        }
    }
})
