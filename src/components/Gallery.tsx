"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Photo } from "@/data/site";

export default function Gallery({ photos }: { photos: Photo[] }) {
  const dlg = useRef<HTMLDialogElement>(null);
  const strip = useRef<HTMLUListElement>(null);
  const touchX = useRef(0);
  const [i, setI] = useState(0);
  const show = (n: number) => {
    setI(n);
    dlg.current?.showModal();
  };
  const step = (d: number) => setI((n) => (n + d + photos.length) % photos.length);

  // Thumbnail foto yang aktif selalu ikut tergeser ke tengah strip.
  useEffect(() => {
    strip.current?.children[i]?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [i]);

  return (
    <>
      <ul className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
        {photos.map((p, n) => (
          <li key={p.src}>
            <button type="button" onClick={() => show(n)} className="card-link relative block aspect-[4/5] w-full cursor-zoom-in overflow-hidden rounded-2xl bg-surface" aria-label={`Perbesar foto: ${p.alt}`}>
              <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover" />
            </button>
          </li>
        ))}
      </ul>
      <dialog
        ref={dlg}
        aria-label="Foto galeri"
        className="lightbox m-0 h-dvh max-h-none w-screen max-w-none bg-ink p-0 text-paper backdrop:bg-ink [&_:focus-visible]:outline-paper"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <p className="label tabular-nums text-paper/70" aria-live="polite">
              <span className="text-paper">{String(i + 1).padStart(2, "0")}</span> / {String(photos.length).padStart(2, "0")}
            </p>
            <button
              type="button"
              onClick={() => dlg.current?.close()}
              aria-label="Tutup"
              className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/20 text-[18px] transition-colors hover:bg-paper hover:text-ink"
            >
              <span aria-hidden>✕</span>
            </button>
          </div>
          {/* Garis progres tipis: posisi foto aktif di antara semua foto. */}
          <div aria-hidden className="h-px bg-white/10">
            <div className="h-full bg-paper transition-[width] duration-500 ease-out" style={{ width: `${((i + 1) / photos.length) * 100}%` }} />
          </div>

          {/* Sepertiga kiri dan kanan foto adalah tombol; di HP bisa juga digeser. */}
          <div
            className="relative min-h-0 flex-1 sm:mx-24 sm:my-6"
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
            }}
          >
            <Image key={i} src={photos[i].src} alt={photos[i].alt} fill sizes="100vw" className="lightbox-in object-contain" />
          </div>
          {/* Tombol panah di luar area foto (desktop), supaya tidak menutupi foto. Di HP: geser foto. */}
          <button type="button" onClick={() => step(-1)} aria-label="Foto sebelumnya" className="group absolute left-6 top-1/2 hidden size-14 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-paper text-ink shadow-lg shadow-black/30 transition-transform duration-300 hover:scale-110 sm:flex">
            <Arrow className="rotate-180 transition-transform duration-300 group-hover:-translate-x-0.5" />
          </button>
          <button type="button" onClick={() => step(1)} aria-label="Foto berikutnya" className="group absolute right-6 top-1/2 hidden size-14 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-paper text-ink shadow-lg shadow-black/30 transition-transform duration-300 hover:scale-110 sm:flex">
            <Arrow className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>

          <div className="border-t border-white/10 px-4 pb-3 pt-4 sm:px-6">
            <p className="mx-auto max-w-[60ch] text-center text-[15px] leading-6 text-paper/80">{photos[i].alt}</p>
            <ul ref={strip} className="mx-auto mt-3 flex w-fit max-w-full gap-2 overflow-x-auto p-1 [scrollbar-width:none]">
              {photos.map((p, n) => (
                <li key={p.src} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setI(n)}
                    aria-label={`Foto ${n + 1}: ${p.alt}`}
                    aria-current={n === i ? "true" : undefined}
                    className={`relative block size-14 cursor-pointer overflow-hidden rounded-xl transition-all duration-300 ${n === i ? "ring-2 ring-paper ring-offset-2 ring-offset-ink" : "opacity-40 grayscale hover:opacity-100 hover:grayscale-0"}`}
                  >
                    <Image src={p.src} alt="" fill sizes="56px" className="object-cover" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </dialog>
    </>
  );
}

// Panah ke kanan; diputar 180° untuk arah kiri.
function Arrow({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={`size-6 ${className ?? ""}`}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
