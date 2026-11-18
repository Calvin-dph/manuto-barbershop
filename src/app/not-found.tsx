import type { Metadata } from "next";
import Link from "next/link";
import { waLink } from "@/data/site";

export const metadata: Metadata = { title: "Halaman tidak ditemukan" };

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[70svh] flex-col justify-center py-20">
      <p className="label text-muted">Error 404</p>
      <h1 className="h-display mt-4 text-[clamp(48px,9vw,140px)] uppercase leading-[0.9]">
        Halaman
        <br />
        tidak ditemukan
      </h1>
      <p className="mt-6 max-w-[42ch] text-[18px] leading-7 text-muted">
        Alamat yang kamu buka tidak ada atau sudah dipindah.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-ink">Ke beranda</Link>
        <Link href="/layanan" className="btn btn-line">Lihat harga</Link>
        <a href={waLink()} target="_blank" rel="noopener" className="btn btn-primary">Booking lewat WhatsApp</a>
      </div>
    </section>
  );
}
