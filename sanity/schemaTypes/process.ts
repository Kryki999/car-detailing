import { defineField, defineType } from 'sanity'

export const process = defineType({
    name: 'process',
    title: 'Proces (Jak Działamy)',
    type: 'object',
    fields: [
        defineField({
            name: 'label',
            title: 'Mały Label (np. Jak działamy)',
            type: 'string',
            initialValue: 'Jak działamy'
        }),
        defineField({
            name: 'heading',
            title: 'Główny Tytuł - część 1',
            type: 'string',
            description: 'np. "Prosty proces, "',
            initialValue: 'Prosty proces, '
        }),
        defineField({
            name: 'headingAccent',
            title: 'Główny Tytuł - część 2 (kolorowa)',
            type: 'string',
            description: 'np. "perfekcyjny efekt"',
            initialValue: 'perfekcyjny efekt'
        }),
        defineField({
            name: 'processSteps',
            title: 'Kroki Procesu',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'number',
                            title: 'Numer (np. 01, 02)',
                            type: 'string',
                            validation: Rule => Rule.required()
                        }),
                        defineField({
                            name: 'title',
                            title: 'Tytuł Kroku',
                            type: 'string',
                            validation: Rule => Rule.required()
                        }),
                        defineField({
                            name: 'description',
                            title: 'Opis',
                            type: 'text',
                            rows: 3
                        }),
                    ],
                    preview: {
                        select: {
                            number: 'number',
                            title: 'title'
                        },
                        prepare({ number, title }) {
                            return {
                                title: `${number}. ${title}`
                            }
                        }
                    }
                }
            ],
            validation: Rule => Rule.min(1).max(5)
        }),
        defineField({
            name: 'ctaText',
            title: 'Przycisk 1: Tekst',
            type: 'string',
            initialValue: 'Rozpocznij współpracę'
        }),
        defineField({
            name: 'ctaLink',
            title: 'Przycisk 1: Link',
            type: 'string',
            initialValue: '#kontakt'
        }),
        defineField({
            name: 'secondCtaText',
            title: 'Przycisk 2: Tekst (np. "lub zadzwoń: +48...")',
            type: 'string',
            initialValue: 'lub zadzwoń: +48 123 456 789'
        }),
        defineField({
            name: 'secondCtaLink',
            title: 'Przycisk 2: Link (tel:)',
            type: 'string',
            initialValue: 'tel:+48123456789'
        }),
    ],
})
