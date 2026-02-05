import { defineField, defineType } from 'sanity'

export const reviews = defineType({
    name: 'reviews',
    title: 'Opinie Klientów',
    type: 'object',
    fields: [
        defineField({
            name: 'label',
            title: 'Mały Label',
            type: 'string',
            initialValue: 'Opinie'
        }),
        defineField({
            name: 'heading',
            title: 'Główny Tytuł',
            type: 'string',
            initialValue: 'Co mówią klienci'
        }),
        defineField({
            name: 'googleRating',
            title: 'Tekst ratingu Google (np. "5.0 na Google")',
            type: 'string',
            initialValue: '5.0 na Google'
        }),
        defineField({
            name: 'reviewsList',
            title: 'Lista Opinii',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'name',
                            title: 'Imię klienta',
                            type: 'string',
                            validation: Rule => Rule.required()
                        }),
                        defineField({
                            name: 'rating',
                            title: 'Ocena (gwiazdki)',
                            type: 'number',
                            validation: Rule => Rule.required().min(1).max(5),
                            initialValue: 5
                        }),
                        defineField({
                            name: 'text',
                            title: 'Treść opinii',
                            type: 'text',
                            rows: 3,
                            validation: Rule => Rule.required()
                        }),
                    ],
                    preview: {
                        select: {
                            name: 'name',
                            rating: 'rating',
                        },
                        prepare({ name, rating }) {
                            return {
                                title: name,
                                subtitle: `${'⭐'.repeat(rating || 5)}`
                            }
                        }
                    }
                }
            ],
            validation: Rule => Rule.min(1).max(10)
        }),
    ],
})
