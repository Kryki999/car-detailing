import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Stats } from "@/components/stats"
import { Services } from "@/components/services"
import { Gallery } from "@/components/gallery"
import { Process } from "@/components/process"
import { Partners } from "@/components/partners"
import { Pricing } from "@/components/pricing"
import { About } from "@/components/about"
import { Reviews } from "@/components/reviews"
import { FAQ } from "@/components/faq"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden w-full">
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <Gallery />
      <Process />
      <Reviews />
      <Partners />
      <Pricing />
      <About />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  )
}
