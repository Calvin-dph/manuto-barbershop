"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navLinks } from "./nav";
import { waLink } from "@/data/site";

export function Wordmark() {
  return (
    <span className="font-display text-[25px] font-bold uppercase leading-none tracking-[-0.01em]">
      Manut&rsquo;o<span className="ml-2 hidden font-sans text-[11px] font-semibold tracking-[0.18em] opacity-60 sm:inline">Barbershop</span>
    </span>
  );
}

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  const [hidden, setHidden] = useState(false);
  const header = useRef<HTMLElement>(null);
  const timer = useRef(0);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);

    // Halaman mengecil ke pojok kanan bawah dan menu tampil di belakangnya.
    const main = document.getElementById("halaman");
    if (main && header.current) {
      clearTimeout(timer.current);
      const r = main.getBoundingClientRect();
      // Potong ke bagian yang sedang terlihat, supaya isi di luar layar tidak ikut muncul saat mengecil.
      // Mulai dari tepi atas layar, bukan dari bawah header: header transparan, jadi isi di baliknya (foto hero) ikut terlihat;
      // kalau ikut dipotong, area itu jadi putih selama animasi tutup.
      const top = Math.max(0, -r.top);
      const bottom = Math.max(0, r.bottom - innerHeight);
      main.style.cssText = `position:relative;z-index:50;background-color:var(--color-paper);clip-path:inset(${top}px 0 ${bottom}px 0);transform-origin:100% ${innerHeight - r.top}px;transition:transform .6s cubic-bezier(.7,0,.2,1),filter .6s;`;
      main.getBoundingClientRect(); // paksa reflow supaya transisi berjalan
      main.style.transform = "scale(.5)";
      main.style.filter = "brightness(.6)";
    }
    return () => {
      window.removeEventListener("keydown", esc);
      if (!main) return;
      main.style.transform = main.style.filter = "";
      // Setelah membesar (0,6 dtk) lepas clip/transform, tapi tetap di atas menu (z-50) sampai menu selesai memudar
      // (jeda 0,6 + 0,5 dtk); kalau dilepas bersamaan, menu sempat tampil penuh sekejap di atas halaman.
      timer.current = window.setTimeout(() => {
        main.style.cssText = "position:relative;z-index:50;background-color:var(--color-paper)";
        timer.current = window.setTimeout(() => (main.style.cssText = ""), 500);
      }, 600);
    };
  }, [open]);

  // Header sembunyi saat scroll ke bawah, muncul lagi saat scroll ke atas.
  useEffect(() => {
    let last = scrollY;
    const onScroll = () => {
      const y = scrollY;
      setHidden(y > last && y > 80);
      last = y;
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Header tanpa latar: isinya putih dengan mix-blend-difference, jadi otomatis gelap di atas latar terang dan terang di atas foto/latar gelap.
          Menu layar penuh harus berada di luar <header>, kalau tidak ia ikut ter-blend dengan halaman. */}
      <header
        ref={header}
        className={`sticky top-0 z-40 text-white mix-blend-difference transition-[translate] duration-500 focus-within:translate-none ${hidden && !open ? "-translate-y-full" : ""}`}
      >
        {/* Tiga kolom: menu kiri, logo tengah, booking kanan. Kolom 1fr di kiri-kanan menjaga logo tetap di tengah. */}
        <div className="wrap grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-4">
          <button
            type="button"
            className="-ml-2.5 flex size-11 items-center justify-center justify-self-start"
            aria-expanded={open}
            aria-controls="menu-hp"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden className="relative block h-3 w-6">
              <span className={`absolute left-0 block h-0.5 w-6 bg-current transition ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 block h-0.5 w-6 bg-current transition ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
          <Link href="/" aria-label="Manut'o Barbershop, ke beranda" className="flex min-h-11 items-center" onClick={() => setOpen(false)}>
            <Wordmark />
          </Link>
          <a href={waLink()} target="_blank" rel="noopener" className="flex min-h-11 items-center justify-self-end font-display text-[17px] font-bold uppercase tracking-[0.01em]">
            Booking
          </a>
        </div>
      </header>
      {/* Di bawah header (z-40) dan di bawah halaman yang mengecil (z-50), di atas isi halaman dan bar booking HP (z-30). */}
      <nav
        id="menu-hp"
        aria-label="Menu"
        inert={!open}
        className={`fixed inset-0 z-[35] overflow-y-auto bg-ink pt-24 text-paper transition-opacity duration-500 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        // Saat menutup, menu gelap baru memudar setelah halaman selesai membesar kembali (0,6 dtk, lihat efek di atas);
        // kalau bersamaan, latar putih body sempat terlihat di sela-selanya.
        style={{ transitionDelay: open ? "0ms" : "600ms" }}
      >
        <ul className="wrap flex flex-col">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="h-display block py-2 text-[clamp(32px,7vw,104px)] uppercase transition-colors hover:text-brand-light"
                onClick={() => setOpen(false)}
                aria-current={path === l.href ? "page" : undefined}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
