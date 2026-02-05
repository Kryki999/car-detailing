import { defineField, defineType } from 'sanity'

export const faq = defineType({
    name: 'faq',
    title: 'FAQ (Często Zadawane Pytania)',
    type: 'object',
    fields: [
        defineField({
            name: 'label',
            title: 'Mały Label',
            type: 'string',
            initialValue: 'FAQ'
        }),
        defineField({
            name: 'heading',
            title: 'Główny Tytuł',
            type: 'string',
            initialValue: 'Często zadawane pytania'
        }),
        defineField({
            name: 'faqList',
            title: 'Lista Pytań i Odpowiedzi',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'question',
                            title: 'Pytanie',
                            type: 'string',
                            validation: Rule => Rule.required()
                        }),
                        defineField({
                            name: 'answer',
                            title: 'Odpowiedź',
                            type: 'text',
                            rows: 4,
                            validation: Rule => Rule.required()
                        }),
                    ],
                    preview: {
                        select: {
                            question: 'question'
                        },
                        prepare({ question }) {
                            return {
                                title: question
                            }
                        }
                    }
                }
            ],
            validation: Rule => Rule.min(1).max(20)
        }),
    ],
})
