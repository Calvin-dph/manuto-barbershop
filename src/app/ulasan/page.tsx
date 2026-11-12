import type { Metadata } from "next";
import ReviewCard, { Stars } from "@/components/ReviewCard";
import SectionHead from "@/components/SectionHead";
import { settings, visibleReviews } from "@/data/site";

export const metadata: Metadata = {
  title: "Ulasan",
  description: `Rating ${settings.ratingGoogle} dari ${settings.jumlahUlasan} ulasan Google untuk Manut'o Barbershop Ungaran.`,
};

export default function Ulasan() {
  return (
    <section className="wrap pb-20 pt-14 md:pb-28 md:pt-20">
      <SectionHead as="h1" title="Ulasan pelanggan" line="Sudah pernah potong di sini? Ceritakan pengalamanmu di Google." href={settings.mapsUrl} linkLabel="Tulis ulasan di Google" />
      <p className="mb-10 flex flex-wrap items-center gap-3 text-[18px]">
        <span className="font-display text-[40px] font-semibold leading-none">{settings.ratingGoogle.toLocaleString("id-ID")}</span>
        <Stars n={5} className="text-[22px]" />
        <span className="text-muted">dari {settings.jumlahUlasan} ulasan Google</span>
      </p>
      <ul className="columns-1 gap-6 md:columns-2 lg:columns-3">
        {visibleReviews().map((rv) => <li key={rv.id} className="mb-6 break-inside-avoid"><ReviewCard review={rv} /></li>)}
      </ul>
    </section>
  );
}
