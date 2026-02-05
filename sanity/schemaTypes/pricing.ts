import { defineField, defineType } from 'sanity'

export const pricing = defineType({
    name: 'pricing',
    title: 'Cennik',
    type: 'object',
    fields: [
        defineField({
            name: 'label',
            title: 'Mały Label',
            type: 'string',
            initialValue: 'Cennik'
        }),
        defineField({
            name: 'heading',
            title: 'Główny Tytuł',
            type: 'string',
            initialValue: 'Wybierz pakiet dla siebie'
        }),
        defineField({
            name: 'description',
            title: 'Opis pod tytułem',
            type: 'text',
            rows: 2,
            initialValue: 'Ceny orientacyjne - zadzwoń po szczegółową wycenę dostosowaną do Twojego pojazdu'
        }),
        defineField({
            name: 'plans',
            title: 'Plany cennikowe',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'name',
                            title: 'Nazwa pakietu',
                            type: 'string',
                            validation: Rule => Rule.required()
                        }),
                        defineField({
                            name: 'description',
                            title: 'Opis pakietu',
                            type: 'string'
                        }),
                        defineField({
                            name: 'price',
                            title: 'Cena (PLN)',
                            type: 'string',
                            description: 'Wpisz samą liczbę, np. "499"'
                        }),
                        defineField({
                            name: 'popular',
                            title: 'Czy najpopularniejszy?',
                            type: 'boolean',
                            initialValue: false
                        }),
                        defineField({
                            name: 'isCustomPrice',
                            title: 'Czy wyświetlić "Bezpłatna wycena"?',
                            type: 'boolean',
                            description: 'Jeśli tak, zamiast ceny wyświetli się "Bezpłatna wycena"',
                            initialValue: false
                        }),
                        defineField({
                            name: 'features',
                            title: 'Cechy pakietu',
                            type: 'array',
                            of: [{ type: 'string' }],
                            validation: Rule => Rule.min(1)
                        }),
                    ],
                    preview: {
                        select: {
                            name: 'name',
                            popular: 'popular'
                        },
                        prepare({ name, popular }) {
                            return {
                                title: name,
                                subtitle: popular ? '⭐ Najpopularniejszy' : 'Pakiet'
                            }
                        }
                    }
                }
            ],
            validation: Rule => Rule.min(1).max(4)
        }),
        defineField({
            name: 'footerNote',
            title: 'Notatka pod cenami',
            type: 'text',
            rows: 2,
            initialValue: 'Ostateczna cena zależy od stanu pojazdu i zakresu prac. Oferujemy bezpłatną wycenę.'
        }),
    ],
})
