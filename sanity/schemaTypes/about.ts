import { defineField, defineType } from 'sanity'

export const about = defineType({
    name: 'about',
    title: 'O Nas',
    type: 'object',
    fields: [
        defineField({
            name: 'label',
            title: 'Mały Label',
            type: 'string',
            initialValue: 'O nas'
        }),
        defineField({
            name: 'heading',
            title: 'Główny Tytuł',
            type: 'string',
            initialValue: 'Pasja do perfekcji'
        }),
        defineField({
            name: 'paragraph1',
            title: 'Pierwszy paragraf',
            type: 'text',
            rows: 3,
            initialValue: 'Elite Detailing to studio założone przez pasjonatów motoryzacji z ponad 8-letnim doświadczeniem w branży. Specjalizujemy się w kompleksowej pielęgnacji samochodów premium i sportowych.'
        }),
        defineField({
            name: 'paragraph2',
            title: 'Drugi paragraf',
            type: 'text',
            rows: 3,
            initialValue: 'Korzystamy wyłącznie z profesjonalnych produktów renomowanych marek i najnowszych technik detailingowych. Każdy pojazd traktujemy indywidualnie, dbając o najdrobniejsze szczegóły.'
        }),
        defineField({
            name: 'highlights',
            title: 'Wyróżniki (4 ikony)',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'icon',
                            title: 'Ikona',
                            type: 'string',
                            options: {
                                list: [
                                    { title: '🏆 Award (Certyfikat)', value: 'Award' },
                                    { title: '👥 Users (Ludzie)', value: 'Users' },
                                    { title: '⏰ Clock (Zegar)', value: 'Clock' },
                                    { title: '🛡️ Shield (Tarcza)', value: 'Shield' },
                                ]
                            },
                            validation: Rule => Rule.required()
                        }),
                        defineField({
                            name: 'label',
                            title: 'Tekst',
                            type: 'string',
                            validation: Rule => Rule.required()
                        }),
                    ],
                    preview: {
                        select: {
                            icon: 'icon',
                            label: 'label'
                        },
                        prepare({ icon, label }) {
                            const iconMap: Record<string, string> = {
                                Award: '🏆',
                                Users: '👥',
                                Clock: '⏰',
                                Shield: '🛡️'
                            }
                            return {
                                title: label,
                                subtitle: `${iconMap[icon] || '📌'} ${icon}`
                            }
                        }
                    }
                }
            ],
            validation: Rule => Rule.min(1).max(6)
        }),
        defineField({
            name: 'image',
            title: 'Zdjęcie studia',
            type: 'image',
            options: { hotspot: true }
        }),
        defineField({
            name: 'badgeNumber',
            title: 'Badge - liczba (np. "5+")',
            type: 'string',
            initialValue: '5+'
        }),
        defineField({
            name: 'badgeText',
            title: 'Badge - tekst (np. "lat doświadczenia")',
            type: 'string',
            initialValue: 'lat doświadczenia'
        }),
    ],
})
