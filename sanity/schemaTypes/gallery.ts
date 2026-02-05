import { defineField, defineType } from 'sanity'

export const gallery = defineType({
    name: 'gallery',
    title: 'Galeria Before/After',
    type: 'object',
    fields: [
        defineField({
            name: 'label',
            title: 'Mały Label',
            type: 'string',
            initialValue: 'Galeria'
        }),
        defineField({
            name: 'heading',
            title: 'Główny Tytuł',
            type: 'string',
            initialValue: 'Nasze realizacje'
        }),
        defineField({
            name: 'description',
            title: 'Opis',
            type: 'text',
            rows: 2,
            initialValue: 'Przesuń suwak aby zobaczyć efekty naszej pracy'
        }),
        defineField({
            name: 'galleryItems',
            title: 'Zdjęcia Before/After',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'beforeImage',
                            title: 'Zdjęcie PRZED',
                            type: 'image',
                            options: { hotspot: true },
                            validation: Rule => Rule.required()
                        }),
                        defineField({
                            name: 'afterImage',
                            title: 'Zdjęcie PO',
                            type: 'image',
                            options: { hotspot: true },
                            validation: Rule => Rule.required()
                        }),
                        defineField({
                            name: 'title',
                            title: 'Tytuł realizacji',
                            type: 'string',
                            validation: Rule => Rule.required()
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'title',
                            beforeImage: 'beforeImage',
                            afterImage: 'afterImage'
                        },
                        prepare({ title, beforeImage, afterImage }) {
                            return {
                                title: title,
                                subtitle: 'Before/After',
                                media: afterImage || beforeImage
                            }
                        }
                    }
                }
            ],
            validation: Rule => Rule.min(1).max(12)
        }),
    ],
})
