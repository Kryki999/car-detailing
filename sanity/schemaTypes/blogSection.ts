import { defineField, defineType } from 'sanity'

export const blogSection = defineType({
    name: 'blogSection',
    title: 'Sekcja Blog',
    type: 'object',
    fields: [
        defineField({
            name: 'heading',
            title: 'Nagłówek',
            type: 'string',
            initialValue: 'Nasz Blog'
        }),
        defineField({
            name: 'subtitle',
            title: 'Podtytuł',
            type: 'text',
            rows: 2,
            initialValue: 'Porady, nowości i inspiracje ze świata car detailingu'
        })
    ],
    preview: {
        select: {
            title: 'heading'
        },
        prepare({ title }) {
            return {
                title: title || 'Sekcja Blog',
                subtitle: 'Blog Section'
            }
        }
    }
})
