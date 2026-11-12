"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { waLink } from "@/data/site";

// Tombol booking di HP. Muncul setelah tombol hero lewat, supaya tidak dobel di layar pertama.
export default function MobileBar() {
  const path = usePathname();
  const [show, setShow] = useState(false);

  // Di halaman tanpa hero, bar muncul setelah judul halaman (h1) terlewati.
  useEffect(() => {
    const hero = document.querySelector("[data-hero-action]") ?? document.querySelector("main h1");
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(hero);
    return () => io.disconnect();
  }, [path]);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper p-3 transition-transform duration-300 sm:hidden ${show ? "translate-y-0" : "translate-y-full"}`}
      aria-hidden={!show}
    >
      <a href={waLink()} target="_blank" rel="noopener" tabIndex={show ? 0 : -1} className="btn btn-primary w-full">
        Booking via WhatsApp
      </a>
    </div>
  );
}
