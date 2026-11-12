import type { Metadata } from "next";
import Gallery from "@/components/Gallery";
import SectionHead from "@/components/SectionHead";
import { gallery, settings } from "@/data/site";

export const metadata: Metadata = {
  title: "Galeri",
  description: "Foto suasana, hasil potongan, dan tempat Manut'o Barbershop di Ungaran.",
};

export default function Galeri() {
  return (
    <section className="wrap pb-20 pt-14 md:pb-28 md:pt-20">
      <SectionHead as="h1" title="Galeri" line="Lebih banyak hasil potongan ada di Instagram dan TikTok kami." href={settings.instagram} linkLabel="Buka Instagram" />
      <Gallery photos={gallery} />
    </section>
  );
}
