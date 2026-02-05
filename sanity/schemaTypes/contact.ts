import { defineField, defineType } from 'sanity'

export const contact = defineType({
    name: 'contact',
    title: 'Kontakt',
    type: 'object',
    fields: [
        defineField({
            name: 'label',
            title: 'Mały Label',
            type: 'string',
            initialValue: 'Kontakt'
        }),
        defineField({
            name: 'heading',
            title: 'Główny Tytuł',
            type: 'string',
            initialValue: 'Odwiedź nas'
        }),
        defineField({
            name: 'addressLine1',
            title: 'Adres - linia 1',
            type: 'string',
            initialValue: 'ul. Motoryzacyjna 15'
        }),
        defineField({
            name: 'addressLine2',
            title: 'Adres - linia 2',
            type: 'string',
            initialValue: '00-001 Warszawa'
        }),
        defineField({
            name: 'phone',
            title: 'Telefon',
            type: 'string',
            initialValue: '+48 123 456 789'
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
            initialValue: 'kontakt@elitedetailing.pl'
        }),
        defineField({
            name: 'hoursLine1',
            title: 'Godziny - linia 1',
            type: 'string',
            initialValue: 'Pon - Pt: 8:00 - 18:00'
        }),
        defineField({
            name: 'hoursLine2',
            title: 'Godziny - linia 2',
            type: 'string',
            initialValue: 'Sob: 9:00 - 15:00'
        }),
        defineField({
            name: 'socialLabel',
            title: 'Tekst nad social media',
            type: 'string',
            initialValue: 'Śledź nas'
        }),
        defineField({
            name: 'instagramUrl',
            title: 'Link do Instagram',
            type: 'url',
            initialValue: '#'
        }),
        defineField({
            name: 'facebookUrl',
            title: 'Link do Facebook',
            type: 'url',
            initialValue: '#'
        }),
        defineField({
            name: 'ctaText',
            title: 'Tekst przycisku CTA',
            type: 'string',
            initialValue: 'Umów wizytę'
        }),
        defineField({
            name: 'ctaPhone',
            title: 'Telefon CTA (tel:)',
            type: 'string',
            initialValue: 'tel:+48123456789'
        }),
        defineField({
            name: 'mapEmbedUrl',
            title: 'Google Maps Embed URL',
            type: 'url',
            description: 'Pełny URL z Google Maps Embed (iframe src)',
            initialValue: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.6891726626896!2d21.012229!3d52.229676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc669a869f01%3A0x72f0be2a88ead3fc!2sWarszawa!5e0!3m2!1spl!2spl!4v1634567890123!5m2!1spl!2spl'
        }),
    ],
})
