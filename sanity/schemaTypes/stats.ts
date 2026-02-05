import { defineField, defineType } from 'sanity'

export const stats = defineType({
    name: 'stats',
    title: 'Statystyki (Liczby)',
    type: 'object',
    fields: [
        defineField({
            name: 'statsList',
            title: 'Lista Statystyk',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'value',
                            title: 'Wartość (np. 500)',
                            type: 'number',
                            validation: Rule => Rule.required().min(0)
                        }),
                        defineField({
                            name: 'suffix',
                            title: 'Sufiks (np. +, %)',
                            type: 'string',
                            initialValue: '+'
                        }),
                        defineField({
                            name: 'label',
                            title: 'Etykieta (np. Zadowolonych klientów)',
                            type: 'string',
                            validation: Rule => Rule.required()
                        }),
                    ],
                    preview: {
                        select: {
                            value: 'value',
                            suffix: 'suffix',
                            label: 'label'
                        },
                        prepare({ value, suffix, label }) {
                            return {
                                title: `${value}${suffix || ''}`,
                                subtitle: label
                            }
                        }
                    }
                }
            ],
            validation: Rule => Rule.min(1).max(8)
        }),
    ],
})
