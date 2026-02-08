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
        // 4. Lista usług - teraz referencje do dokumentów serviceItem
        defineField({
            name: 'servicesList',
            title: 'Lista Usług',
            description: 'Wybierz usługi z istniejących dokumentów (Usługa - Szczegóły)',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'serviceItem' }]
                }
            ]
        }),
    ],
})
