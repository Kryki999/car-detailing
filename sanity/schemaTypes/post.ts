import { defineField, defineType } from 'sanity'

export const post = defineType({
    name: 'post',
    title: 'Blog Post',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Tytuł',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'slug',
            title: 'Slug (URL)',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'publishedAt',
            title: 'Data publikacji',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'mainImage',
            title: 'Zdjęcie główne',
            type: 'image',
            options: { hotspot: true },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'excerpt',
            title: 'Zajawka (krótki opis)',
            type: 'text',
            rows: 3,
            validation: Rule => Rule.required().max(200)
        }),
        defineField({
            name: 'body',
            title: 'Treść artykułu',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                        { title: 'Quote', value: 'blockquote' }
                    ],
                    marks: {
                        decorators: [
                            { title: 'Bold', value: 'strong' },
                            { title: 'Italic', value: 'em' },
                            { title: 'Underline', value: 'underline' }
                        ],
                        annotations: [
                            {
                                name: 'link',
                                type: 'object',
                                title: 'Link',
                                fields: [
                                    {
                                        name: 'href',
                                        type: 'url',
                                        title: 'URL'
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    type: 'image',
                    options: { hotspot: true }
                }
            ]
        }),
        defineField({
            name: 'additionalImages',
            title: 'Dodatkowe zdjęcia (galeria)',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
            validation: Rule => Rule.max(3)
        })
    ],
    preview: {
        select: {
            title: 'title',
            date: 'publishedAt',
            media: 'mainImage'
        },
        prepare({ title, date, media }) {
            const formattedDate = date ? new Date(date).toLocaleDateString('pl-PL') : 'Brak daty'
            return {
                title,
                subtitle: formattedDate,
                media
            }
        }
    },
    orderings: [
        {
            title: 'Data publikacji (najnowsze)',
            name: 'publishedAtDesc',
            by: [{ field: 'publishedAt', direction: 'desc' }]
        }
    ]
})
