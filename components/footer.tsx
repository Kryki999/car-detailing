import Link from "next/link"

const footerLinks = {
  uslugi: [
    { label: "Mycie detailingowe", href: "#uslugi" },
    { label: "Powłoki ceramiczne", href: "#uslugi" },
    { label: "Korekta lakieru", href: "#uslugi" },
    { label: "Detailing wnętrza", href: "#uslugi" },
  ],
  firma: [
    { label: "O nas", href: "#o-nas" },
    { label: "Galeria", href: "#galeria" },
    { label: "Opinie", href: "#opinie" },
    { label: "Kontakt", href: "#kontakt" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">E</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                ELITE<span className="text-primary">DETAILING</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Profesjonalne studio car detailingowe. Perfekcja w każdym detalu.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Usługi</h4>
            <ul className="space-y-3">
              {footerLinks.uslugi.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Firma</h4>
            <ul className="space-y-3">
              {footerLinks.firma.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Kontakt</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>ul. Motoryzacyjna 15</li>
              <li>00-001 Warszawa</li>
              <li>
                <a href="tel:+48123456789" className="hover:text-primary transition-colors">
                  +48 123 456 789
                </a>
              </li>
              <li>
                <a href="mailto:kontakt@elitedetailing.pl" className="hover:text-primary transition-colors">
                  kontakt@elitedetailing.pl
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Elite Detailing. Wszelkie prawa zastrzeżone.
          </p>
          <div className="flex gap-6">
            <Link href="#" aria-label="Polityka prywatności" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Polityka prywatności
            </Link>
            <Link href="#" aria-label="Regulamin" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Regulamin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
