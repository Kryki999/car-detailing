import { defineField, defineType } from 'sanity'

export const partners = defineType({
    name: 'partners',
    title: 'Partnerzy',
    type: 'object',
    fields: [
        defineField({
            name: 'heading',
            title: 'Nagłówek',
            type: 'string',
            initialValue: 'Zaufali nam właściciele marek'
        }),
        defineField({
            name: 'logos',
            title: 'Logotypy',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'name',
                            title: 'Nazwa marki',
                            type: 'string',
                            validation: Rule => Rule.required()
                        }),
                        defineField({
                            name: 'logo',
                            title: 'Logo (obraz)',
                            type: 'image',
                            description: 'Opcjonalnie - jeśli puste, wyświetli się nazwa tekstowa'
                        }),
                    ],
                    preview: {
                        select: {
                            name: 'name',
                            media: 'logo'
                        },
                        prepare({ name, media }) {
                            return {
                                title: name,
                                subtitle: media ? 'Logo image' : 'Text only',
                                media
                            }
                        }
                    }
                }
            ],
            validation: Rule => Rule.min(1).max(16)
        }),
    ],
})
