"use client"
import { VisualEditing } from "next-sanity/visual-editing"
import { useEffect, useState } from "react"

export default function SanityVisualEditing() {
    const [inIframe, setInIframe] = useState(false)

    useEffect(() => {
        // Sprawdzamy, czy strona jest wyświetlana wewnątrz iframe (czyli w Studio)
        if (window.parent !== window) {
            setInIframe(true)
        }
    }, [])

    if (!inIframe) return null

    // Ten komponent "rysuje" dymki edycji i obsługuje kliknięcia
    return <VisualEditing />
}