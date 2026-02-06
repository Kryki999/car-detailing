import { client } from "@/sanity/lib/client"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { RenderSections } from "@/components/RenderSections"

// Zapytanie GROQ: Pobierz stronę "home" i rozwiń dane w modułach
const PAGE_QUERY = `*[_type == "page" && slug.current == "home"][0]{
  modules[]{
    ...,
    // Konfiguracja dla Hero
    _type == "heroSection" => {
      ...,
      "imageUrl": backgroundImage.asset->url + "?fm=webp&q=85&w=2400",
      "videoUrl": desktopVideo.asset->url,
      "mobileImageUrl": mobileImage.asset->url + "?fm=webp&q=85&w=1200"
    },
    // Konfiguracja dla Services
    _type == "services" => {
      heading,
      label,
      description,
      servicesList[]{
        title,
        description,
        icon
      }
    },
    // Konfiguracja dla Stats
    _type == "stats" => {
      statsList[]{
        value,
        suffix,
        label
      }
    },
    // Konfiguracja dla Process
    _type == "process" => {
      label,
      heading,
      headingAccent,
      processSteps[]{
        number,
        title,
        description
      },
      ctaText,
      ctaLink,
      secondCtaText,
      secondCtaLink
    },
    // Konfiguracja dla Reviews
    _type == "reviews" => {
      label,
      heading,
      googleRating,
      reviewsList[]{
        name,
        rating,
        text
      }
    },
    // Konfiguracja dla FAQ
    _type == "faq" => {
      label,
      heading,
      faqList[]{
        question,
        answer
      }
    },
    // Konfiguracja dla Pricing
    _type == "pricing" => {
      label,
      heading,
      description,
      plans[]{
        name,
        description,
        price,
        popular,
        isCustomPrice,
        features[]
      },
      footerNote
    },
    // Konfiguracja dla Gallery
    _type == "gallery" => {
      label,
      heading,
      description,
      galleryItems[]{
        title,
        "beforeImageUrl": beforeImage.asset->url + "?fm=webp&q=85&w=1600",
        "afterImageUrl": afterImage.asset->url + "?fm=webp&q=85&w=1600"
      }
    },
    // Konfiguracja dla About
    _type == "about" => {
      label,
      heading,
      paragraph1,
      paragraph2,
      highlights[]{
        icon,
        label
      },
      "imageUrl": image.asset->url + "?fm=webp&q=85&w=1200",
      badgeNumber,
      badgeText
    },
    // Konfiguracja dla Contact
    _type == "contact" => {
      label,
      heading,
      addressLine1,
      addressLine2,
      phone,
      email,
      hoursLine1,
      hoursLine2,
      socialLabel,
      instagramUrl,
      facebookUrl,
      ctaText,
      ctaPhone,
      mapEmbedUrl
    },
    // Konfiguracja dla Partners
    _type == "partners" => {
      heading,
      logos[]{
        name,
        "logoUrl": logo.asset->url + "?fm=webp&q=85&w=400"
      }
    },
    // Konfiguracja dla Blog Section
    _type == "blogSection" => {
      heading,
      subtitle,
      "posts": *[_type == "post"] | order(publishedAt desc)[0..49]{
        title,
        "slug": slug.current,
        excerpt,
        publishedAt,
        "mainImageUrl": mainImage.asset->url + "?fm=webp&q=85&w=1200"
      }
    }
  }
}`

export default async function Home() {
  const page = await client.fetch(
    PAGE_QUERY,
    {},
    { next: { revalidate: 0 }, stega: true }
  )

  // Jeśli baza jest pusta (start projektu)
  if (!page?.modules) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="py-24 text-center container">
          <h1 className="text-3xl font-bold mb-4">CMS jest pusty!</h1>
          <p className="text-muted-foreground">
            Wejdź na <a href="/studio" className="text-primary hover:underline font-bold">/studio</a>,<br />
            stwórz stronę o slugu <strong>"home"</strong> i dodaj sekcję Hero.
          </p>
        </div>
        <Footer />
      </main>
    )
  }

  // Normalny render strony
  return (
    <main className="min-h-screen bg-background overflow-x-hidden w-full">
      <Navbar />
      <RenderSections sections={page.modules} />
      <Footer />
    </main>
  )
}
