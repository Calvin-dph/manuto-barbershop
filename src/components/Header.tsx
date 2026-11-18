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

// Potong halaman ke bagian yang terlihat di layar (top = jarak tepi atas halaman dari atas layar), supaya isi di luar layar
// tidak ikut muncul saat mengecil. Mulai dari tepi atas layar, bukan dari bawah header: header transparan, jadi isi di
// baliknya (foto hero) ikut terlihat; kalau ikut dipotong, area itu jadi putih selama animasi tutup.
// Potongan bawah memakai 100%, bukan tinggi dalam px, supaya tetap benar saat isi berganti ke halaman yang lebih pendek
// waktu pindah halaman dari menu (kalau px, seluruh halaman baru ikut terpotong dan hilang selama animasi).
function fitToViewport(main: HTMLElement, top: number) {
  main.style.clipPath = `inset(${Math.max(0, -top)}px 0 max(0px, calc(100% - ${innerHeight - top}px)) 0)`;
  main.style.transformOrigin = `100% ${innerHeight - top}px`;
}

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  const [hidden, setHidden] = useState(false);
  const header = useRef<HTMLElement>(null);
  const timer = useRef(0);
  // Menu ditutup karena link diklik (pindah halaman), bukan karena tombol/Escape.
  const toTop = useRef(false);
  const go = () => {
    if (open) toTop.current = true;
    setOpen(false);
  };

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
      main.style.cssText = `position:relative;z-index:50;background-color:var(--color-paper);transition:transform .6s cubic-bezier(.7,0,.2,1),filter .6s;`;
      fitToViewport(main, r.top);
      main.getBoundingClientRect(); // paksa reflow supaya transisi berjalan
      main.style.transform = "scale(.5)";
      main.style.filter = "brightness(.6)";
    }
    return () => {
      window.removeEventListener("keydown", esc);
      if (!main) return;
      // Pindah halaman: gulir ke atas sekarang. Kalau menunggu Next, ia melihat halaman yang masih mengecil (tepi atasnya
      // tampak di layar) lalu menganggap tidak perlu scroll, sehingga halaman baru terbuka di posisi scroll lama.
      // offsetTop dipakai karena tidak terpengaruh transform yang sedang berjalan.
      if (toTop.current) {
        toTop.current = false;
        scrollTo({ top: 0, behavior: "instant" });
        fitToViewport(main, main.offsetTop);
      }
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
          <Link href="/" aria-label="Manut'o Barbershop, ke beranda" className="flex min-h-11 items-center" onClick={go}>
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
        data-lenis-prevent
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
                onClick={go}
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
