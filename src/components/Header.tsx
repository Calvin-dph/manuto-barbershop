"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "./nav";
import { waLink } from "@/data/site";

export function Wordmark() {
  return (
    <span className="font-display text-[22px] font-bold uppercase leading-none tracking-[0.02em]">
      Manut&rsquo;o<span className="ml-1.5 text-[11px] font-medium tracking-[0.2em] text-muted">Barbershop</span>
    </span>
  );
}

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <div className="wrap flex h-16 items-center justify-between gap-6">
        <Link href="/" aria-label="Manut'o Barbershop, ke beranda" className="flex min-h-11 items-center">
          <Wordmark />
        </Link>
        <nav aria-label="Menu utama" className="hidden lg:block">
          <ul className="flex gap-7 text-[15px] font-medium">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-draw py-2" aria-current={path === l.href ? "page" : undefined}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <a href={waLink()} target="_blank" rel="noopener" className="btn btn-primary hidden min-h-11 px-5 sm:inline-flex">
            Booking
          </a>
          <button
            type="button"
            className="flex size-11 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="menu-hp"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden className="relative block h-3 w-6">
              <span className={`absolute left-0 block h-0.5 w-6 bg-ink transition ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 block h-0.5 w-6 bg-ink transition ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </div>
      {open && (
        <nav id="menu-hp" aria-label="Menu" className="fixed inset-x-0 bottom-0 top-16 z-40 bg-paper lg:hidden">
          <ul className="wrap flex flex-col pt-6">
            {navLinks.map((l) => (
              <li key={l.href} className="border-b border-line">
                <Link href={l.href} className="h-display block py-4 text-[34px]" onClick={() => setOpen(false)} aria-current={path === l.href ? "page" : undefined}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="wrap mt-8">
            <a href={waLink()} target="_blank" rel="noopener" className="btn btn-primary w-full">
              Booking via WhatsApp
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
