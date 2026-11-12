import Link from "next/link";
import { navLinks } from "./nav";
import { settings, waLink } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-ink pb-20 text-paper sm:pb-0">
      <div className="wrap grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-6">
          <p className="label text-brand-light">Alamat</p>
          <a href={settings.mapsUrl} target="_blank" rel="noopener" className="link-draw mt-4 inline font-display text-[28px] uppercase leading-tight sm:text-[34px]">
            {settings.alamatJalan}, {settings.alamatArea}
          </a>
        </div>
        <div className="md:col-span-3">
          <p className="label text-brand-light">Jam buka</p>
          <p className="mt-4 text-[16px] leading-7">
            {settings.hariBuka}
            <br />
            {settings.jamBuka.replace(":", ".")}–{settings.jamTutup.replace(":", ".")} WIB
          </p>
          <p className="label mt-8 text-brand-light">Kontak</p>
          <ul className="mt-3 text-[16px] leading-7">
            <li><a className="link-draw inline-flex min-h-11 items-center" href={waLink()} target="_blank" rel="noopener">WhatsApp {settings.whatsappTampil}</a></li>
            <li><a className="link-draw inline-flex min-h-11 items-center" href={settings.instagram} target="_blank" rel="noopener">Instagram</a></li>
            <li><a className="link-draw inline-flex min-h-11 items-center" href={settings.tiktok} target="_blank" rel="noopener">TikTok</a></li>
          </ul>
        </div>
        <nav aria-label="Menu footer" className="md:col-span-3">
          <p className="label text-brand-light">Menu</p>
          <ul className="mt-3 text-[16px] leading-7">
            <li><Link className="link-draw inline-flex min-h-11 items-center" href="/">Beranda</Link></li>
            {navLinks.map((l) => (
              <li key={l.href}><Link className="link-draw inline-flex min-h-11 items-center" href={l.href}>{l.label}</Link></li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="wrap overflow-hidden">
        <p aria-hidden className="h-display select-none whitespace-nowrap text-[min(17vw,206px)] text-paper/90">Manut&rsquo;o</p>
      </div>
      <div className="wrap flex flex-col gap-2 border-t border-white/15 py-6 text-[14px] text-paper/70 sm:flex-row sm:justify-between">
        <p>© {settings.nama} · {settings.tagline}</p>
        <p>Ungaran, Kabupaten Semarang</p>
      </div>
    </footer>
  );
}
