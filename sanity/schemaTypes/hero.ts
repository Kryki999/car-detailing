import { defineField, defineType } from 'sanity'

export const hero = defineType({
    name: 'heroSection',
    title: 'Hero (Sekcja Powitalna)',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            title: 'Nagłówek (H1)',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'subtitle',
            title: 'Podtytuł',
            type: 'text',
            rows: 3
        }),

        // PIERWSZY PRZYCISK
        defineField({
            name: 'ctaText',
            title: 'Przycisk 1: Tekst (np. Umów wizytę)',
            type: 'string'
        }),
        defineField({
            name: 'ctaLink',
            title: 'Przycisk 1: Link (np. #kontakt)',
            type: 'string',
            initialValue: '#kontakt'
        }),

        // DRUGI PRZYCISK (tego brakowało)
        defineField({
            name: 'secondCtaText',
            title: 'Przycisk 2: Tekst (np. Zobacz realizacje)',
            type: 'string'
        }),
        defineField({
            name: 'secondCtaLink',
            title: 'Przycisk 2: Link (np. #galeria)',
            type: 'string',
            initialValue: '#galeria'
        }),

        defineField({
            name: 'backgroundImage',
            title: 'Zdjęcie w tle (Fallback)',
            type: 'image',
            description: 'Uniwersalny fallback - używany gdy brak wideo/obrazu mobilnego',
            options: { hotspot: true }
        }),

        defineField({
            name: 'desktopVideo',
            title: 'Wideo w tle (Desktop)',
            type: 'file',
            description: 'Opcjonalne wideo w tle dla dużych ekranów (zalecane: mp4, webm)',
            options: {
                accept: 'video/mp4,video/webm'
            }
        }),

        defineField({
            name: 'mobileImage',
            title: 'Zdjęcie w tle (Mobile)',
            type: 'image',
            description: 'Opcjonalne zdjęcie dedykowane dla urządzeń mobilnych',
            options: { hotspot: true }
        }),
    ],
})