import { defineField, defineType } from 'sanity'

export const serviceItem = defineType({
    name: 'serviceItem',
    title: 'Usługa (Szczegóły)',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Nazwa Usługi',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug (URL)',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Krótki Opis (do karty)',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'icon',
            title: 'Ikona (Nazwa pliku)',
            description: 'Wpisz np: ScrubBrush, Stars, Shield',
            type: 'string',
        }),
        defineField({
            name: 'mainImage',
            title: 'Główne Zdjęcie',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'body',
            title: 'Treść Strony (PortableText)',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                        { title: 'Quote', value: 'blockquote' },
                    ],
                    marks: {
                        decorators: [
                            { title: 'Bold', value: 'strong' },
                            { title: 'Italic', value: 'em' },
                            { title: 'Underline', value: 'underline' },
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
                                        title: 'URL',
                                    },
                                ],
                            },
                        ],
                    },
                },
                {
                    type: 'image',
                    options: { hotspot: true },
                },
            ],
        }),
        defineField({
            name: 'gallery',
            title: 'Galeria Zdjęć',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'mainImage',
        },
    },
})
