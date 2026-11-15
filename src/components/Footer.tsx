import Link from "next/link";
import { navLinks } from "./nav";
import OpenNow from "./OpenNow";
import { settings, waLink } from "@/data/site";

const linkCls = "link-draw inline-flex min-h-11 items-center";
const jam = `${settings.jamBuka.replace(":", ".")}–${settings.jamTutup.replace(":", ".")} WIB`;

export default function Footer() {
  return (
    <footer className="bg-ink pb-20 text-paper sm:pb-0">
      <div aria-hidden className="pole" />

      <div className="wrap flex flex-col gap-8 border-b border-white/15 py-12 md:flex-row md:items-end md:justify-between md:py-16">
        <div>
          <p className="h-display text-[56px] uppercase sm:text-[88px]">Manut&rsquo;o</p>
          <p className="label mt-2 text-paper/70">Barbershop · {settings.tagline}</p>
        </div>
        <div className="flex flex-col items-start gap-4 md:items-end">
          <OpenNow className="rounded-full bg-paper px-4 py-2 text-ink" />
          <a href={waLink()} target="_blank" rel="noopener" className="btn btn-primary">Booking via WhatsApp</a>
        </div>
      </div>

      <div className="wrap grid gap-10 py-12 sm:grid-cols-2 md:grid-cols-12 md:py-16">
        <div className="md:col-span-5">
          <p className="label text-brand-light">Alamat</p>
          <p className="mt-3 text-[18px] leading-7">
            <a href={settings.mapsUrl} target="_blank" rel="noopener" className="link-draw">{settings.alamatJalan}, {settings.alamatArea}</a>
          </p>
          <p className="mt-2 text-[16px] text-paper/70">{settings.hariBuka} · <span className="tabular-nums">{jam}</span></p>
        </div>
        <div className="md:col-span-4">
          <p className="label text-brand-light">Kontak</p>
          <ul className="mt-1 text-[18px]">
            <li><a className={`${linkCls} tabular-nums`} href={waLink()} target="_blank" rel="noopener">WhatsApp {settings.whatsappTampil}</a></li>
            <li><a className={linkCls} href={settings.instagram} target="_blank" rel="noopener">Instagram</a></li>
            <li><a className={linkCls} href={settings.tiktok} target="_blank" rel="noopener">TikTok</a></li>
          </ul>
        </div>
        <nav aria-label="Menu footer" className="sm:col-span-2 md:col-span-3">
          <p className="label text-brand-light">Menu</p>
          <ul className="mt-1 grid grid-cols-2 text-[16px] md:grid-cols-1">
            <li><Link className={linkCls} href="/">Beranda</Link></li>
            {navLinks.map((l) => (
              <li key={l.href}><Link className={linkCls} href={l.href}>{l.label}</Link></li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="wrap flex flex-col gap-2 border-t border-white/15 py-6 text-[14px] text-paper/70 sm:flex-row sm:items-center sm:justify-between">
        <p>© {settings.nama} · Ungaran, Kabupaten Semarang</p>
        <a href="#isi" className={`${linkCls} self-start sm:self-auto`}>Kembali ke atas ↑</a>
      </div>
    </footer>
  );
}
