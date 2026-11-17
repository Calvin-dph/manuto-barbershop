import type { Metadata, Viewport } from "next";
import { Albert_Sans, Geist, Newsreader } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";
import Cursor from "@/components/Cursor";
import { settings } from "@/data/site";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const albert = Albert_Sans({ subsets: ["latin"], variable: "--font-albert" });
const newsreader = Newsreader({ subsets: ["latin"], weight: "500", variable: "--font-newsreader" });

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
    <html lang="id" className={`${geist.variable} ${albert.variable} ${newsreader.variable}`}>
      <body className="min-h-dvh">
        <a href="#isi" className="sr-only z-50 bg-ink px-4 py-3 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Langsung ke isi
        </a>
        <div aria-hidden className="pole pole-load" />
        <Header />
        {/* Dibungkus supaya isi dan footer mengecil bersama saat menu dibuka (lihat Header). */}
        <div id="halaman">
          {/* Margin bawah negatif (bukan -mt di footer): footer naik ke balik sudut bulat, tapi margin box footer tetap normal,
              jadi saat sticky ia tidak bisa terangkat melewati atas #halaman dan menyembul di bawah header. */}
          <main id="isi" className="relative z-10 -mb-[32px] rounded-b-[32px] bg-paper md:-mb-[48px] md:rounded-b-[48px]">{children}</main>
          <Footer />
        </div>
        <MobileBar />
        <Cursor />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
