import type React from "react"
import type { Metadata } from "next"
import { Inter, Figtree } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import SanityVisualEditing from "@/components/SanityVisualEditing"

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap"
})

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Elite Detailing Studio | Premium Car Care",
  description:
    "Profesjonalne studio car detailingowe. Oferujemy detailing, mycie, powłoki ceramiczne i ochronę lakieru na najwyższym poziomie.",
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pl">
      <body className={`${inter.variable} ${figtree.variable} font-sans antialiased`}>
        {children}
        <Analytics />
        <SanityVisualEditing />
      </body>
    </html>
  )
}
