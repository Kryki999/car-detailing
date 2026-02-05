import { defineField, defineType } from 'sanity'

export const services = defineType({
    name: 'services',
    title: 'Usługi (Kafelki)',
    type: 'object',
    fields: [
        // 1. Mały napis nad tytułem (np. "NASZE USŁUGI")
        defineField({
            name: 'label',
            title: 'Mały nagłówek (Label)',
            type: 'string',
            initialValue: 'Nasze usługi'
        }),
        // 2. Główny tytuł (np. "Kompleksowa pielęgnacja")
        defineField({
            name: 'heading',
            title: 'Główny Tytuł (H2)',
            type: 'string',
            initialValue: 'Kompleksowa pielęgnacja'
        }),
        // 3. Tekst pod tytułem
        defineField({
            name: 'description',
            title: 'Opis pod tytułem',
            type: 'text',
            rows: 2,
            initialValue: 'Oferujemy pełen zakres usług detailingowych dla najbardziej wymagających klientów'
        }),
        // 4. Lista usług
        defineField({
            name: 'servicesList',
            title: 'Lista Kafelków',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'title', title: 'Nazwa usługi', type: 'string' }),
                        defineField({ name: 'description', title: 'Opis kafelka', type: 'text', rows: 3 }),
                        defineField({
                            name: 'icon',
                            title: 'Ikona (Nazwa pliku)',
                            description: 'Wpisz np: ScrubBrush, Stars, Shield',
                            type: 'string'
                        }),
                    ]
                }
            ]
        }),
    ],
})