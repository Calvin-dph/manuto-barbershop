import Link from "next/link";
import { navLinks } from "./nav";
import OpenNow from "./OpenNow";
import FooterName from "./FooterName";
import { settings, waLink } from "@/data/site";

const linkCls = "link-draw inline-flex min-h-11 items-center";
const jam = `${settings.jamBuka.replace(":", ".")}–${settings.jamTutup.replace(":", ".")} WIB`;

// Footer "kunjungi": alamat besar sebagai isi utama, kontak di kanan, lalu baris menu dan nama toko selebar layar.
// pt sebesar radius: <main> menarik footer ke atas (-mb di layout) supaya warna gelapnya mengisi sudut bulat <main>.
// Curtain reveal: footer menempel di dasar layar di belakang <main>, lalu tersingkap saat isi digulir habis.
// Hanya saat layar cukup tinggi untuk memuat seluruh footer; kalau tidak, bagian atasnya tak pernah terlihat.
export default function Footer() {
  return (
    <footer data-cursor-glow className="overflow-hidden bg-ink pb-20 pt-[32px] text-paper sm:pb-0 md:pt-[48px] [@media(min-width:768px)_and_(min-height:820px)]:sticky [@media(min-width:768px)_and_(min-height:820px)]:bottom-0">
      <div className="wrap grid gap-12 py-16 md:grid-cols-12 md:gap-10 md:py-20">
        <div className="md:col-span-7">
          <p className="label text-brand-light">Datang langsung</p>
          <p className="mt-4 text-[32px] leading-[1.15] tracking-[-0.015em] md:text-[40px]">
            <a href={settings.mapsUrl} target="_blank" rel="noopener" className="link-draw">
              {settings.alamatJalan}, Ungaran
            </a>
          </p>
          <p className="mt-3 text-[17px] leading-7 text-paper/70">{settings.alamatArea}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-[17px]">
            <span>
              {settings.hariBuka} · <span className="tabular-nums">{jam}</span>
            </span>
            <OpenNow className="rounded-full bg-paper px-4 py-2 text-ink" />
          </div>
        </div>

        <div className="md:col-span-4 md:col-start-9">
          <p className="label text-brand-light">Booking & kontak</p>
          <a href={waLink()} target="_blank" rel="noopener" className="btn btn-primary mt-5">Booking via WhatsApp</a>
          <ul className="mt-6 text-[18px]">
            <li><a className={`${linkCls} tabular-nums`} href={waLink()} target="_blank" rel="noopener">WhatsApp {settings.whatsappTampil}</a></li>
            <li><a className={linkCls} href={settings.instagram} target="_blank" rel="noopener">Instagram</a></li>
            <li><a className={linkCls} href={settings.tiktok} target="_blank" rel="noopener">TikTok</a></li>
          </ul>
        </div>
      </div>

      <nav aria-label="Menu footer" className="wrap border-t border-white/15 py-4">
        <ul className="flex flex-wrap gap-x-8 text-[16px]">
          <li><Link className={linkCls} href="/">Beranda</Link></li>
          {navLinks.map((l) => (
            <li key={l.href}><Link className={linkCls} href={l.href}>{l.label}</Link></li>
          ))}
          <li className="sm:ml-auto"><a href="#isi" className={linkCls}>Kembali ke atas ↑</a></li>
        </ul>
      </nav>

      <FooterName text="Manut’o" />

      <div className="wrap flex flex-col gap-1 border-t border-white/15 py-6 text-[14px] text-paper/70 sm:flex-row sm:justify-between">
        <p>© {settings.nama} · Ungaran, Kabupaten Semarang</p>
        <p>Barbershop · {settings.tagline}</p>
      </div>
    </footer>
  );
}
