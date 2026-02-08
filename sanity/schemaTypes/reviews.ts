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
            title: 'Tekst ratingu Google (np. "4.9 na Google")',
            type: 'string',
            initialValue: '4.9 na Google'
        }),
        defineField({
            name: 'reviewCountText',
            title: 'Tekst liczby opinii (np. "(75 opinii)")',
            type: 'string',
            initialValue: '(75 opinii)'
        }),
        defineField({
            name: 'followersText',
            title: 'Tekst obserwujących (np. "1000+ obserwujących")',
            type: 'string',
            initialValue: '1000+ obserwujących'
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
