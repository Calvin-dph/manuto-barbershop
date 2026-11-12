import type { Metadata } from "next";
import Image from "next/image";
import PriceList from "@/components/PriceList";
import SectionHead from "@/components/SectionHead";
import { member, rupiah, waLink } from "@/data/site";

export const metadata: Metadata = {
  title: "Layanan & Harga",
  description: "Daftar harga Manut'o Barbershop Ungaran: potong rambut pria Rp25.000, perawatan, bleaching, perming, semir, dan produk rambut.",
};

export default function Layanan() {
  return (
    <>
      <section className="wrap pb-16 pt-14 md:pt-20">
        <SectionHead as="h1" title="Layanan & harga" line="Klik salah satu layanan untuk langsung booking lewat WhatsApp." />
        <PriceList />
        <p className="mt-10 text-[16px] text-muted">
          Member Manut&rsquo;o dapat diskon 10% untuk semua perawatan dan 5% untuk produk.{" "}
          <a href={waLink("Halo Manut'o, saya mau daftar kartu member.")} target="_blank" rel="noopener" className="link-draw font-semibold text-ink">
            Daftar member {rupiah(member.harga)}/tahun
          </a>
        </p>
      </section>
      <section aria-label="Foto produk dan alat" className="wrap grid grid-cols-2 gap-2 pb-20 md:grid-cols-4 md:gap-4 md:pb-28">
        {["produk-1", "produk-2", "meja-cermin", "kursi-cape"].map((n) => (
          <div key={n} className="relative aspect-square overflow-hidden bg-surface">
            <Image src={`/photos/${n}.jpg`} alt={n.startsWith("produk") ? "Produk perawatan rambut di meja barber" : "Meja kerja dan kursi barber Manut'o"} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
          </div>
        ))}
      </section>
    </>
  );
}
