import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Oswald } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";
import { settings } from "@/data/site";
import "./globals.css";

const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const instrument = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument" });

// shortcut: domain belum ada, ganti saat domain asli dibeli.
const siteUrl = "https://manutobarbershop.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Manut'o Barbershop · Barbershop di Ungaran", template: "%s · Manut'o Barbershop Ungaran" },
  description: "Barbershop di Ungaran, Kabupaten Semarang. Potong rambut pria mulai Rp25.000, buka setiap hari 10.00–22.00. Booking lewat WhatsApp.",
  openGraph: { type: "website", locale: "id_ID", siteName: settings.nama, images: ["/photos/barber-bekerja.jpg"] },
};

export const viewport: Viewport = { themeColor: "#151515" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: settings.nama,
  image: `${siteUrl}/photos/barber-bekerja.jpg`,
  url: siteUrl,
  telephone: "+" + settings.whatsapp,
  priceRange: "Rp5.000–Rp200.000",
  address: {
    "@type": "PostalAddress",
    streetAddress: settings.alamatJalan,
    addressLocality: "Ungaran",
    addressRegion: "Jawa Tengah",
    postalCode: "50511",
    addressCountry: "ID",
  },
  openingHoursSpecification: [{
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: settings.jamBuka,
    closes: settings.jamTutup,
  }],
  aggregateRating: { "@type": "AggregateRating", ratingValue: settings.ratingGoogle, reviewCount: settings.jumlahUlasan },
  sameAs: [settings.instagram, settings.tiktok],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${oswald.variable} ${instrument.variable}`}>
      <body className="min-h-dvh">
        <a href="#isi" className="sr-only z-50 bg-ink px-4 py-3 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Langsung ke isi
        </a>
        <Header />
        <main id="isi">{children}</main>
        <Footer />
        <MobileBar />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
