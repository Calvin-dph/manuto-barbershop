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
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-ink p-0 text-paper [&_:focus-visible]:outline-paper"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-4 py-2 pl-4 pr-2">
            <p className="label tabular-nums" aria-live="polite">{i + 1} / {photos.length}</p>
            <button type="button" onClick={() => dlg.current?.close()} className="btn min-h-11 cursor-pointer px-4 hover:bg-white/10">
              Tutup <span aria-hidden>✕</span>
            </button>
          </div>

          {/* Sepertiga kiri dan kanan foto adalah tombol; di HP bisa juga digeser. */}
          <div
            className="relative min-h-0 flex-1"
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
            }}
          >
            <Image key={i} src={photos[i].src} alt={photos[i].alt} fill sizes="100vw" className="lightbox-in object-contain" />
            <button type="button" onClick={() => step(-1)} aria-label="Foto sebelumnya" className="group absolute inset-y-0 left-0 flex w-1/3 cursor-pointer items-center px-2 sm:px-6">
              <span aria-hidden className="flex size-11 items-center justify-center bg-paper text-[20px] text-ink transition-transform group-hover:-translate-x-1">←</span>
            </button>
            <button type="button" onClick={() => step(1)} aria-label="Foto berikutnya" className="group absolute inset-y-0 right-0 flex w-1/3 cursor-pointer items-center justify-end px-2 sm:px-6">
              <span aria-hidden className="flex size-11 items-center justify-center bg-paper text-[20px] text-ink transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>

          <p className="px-4 pt-3 text-center text-[15px] leading-6 text-paper/80">{photos[i].alt}</p>
          <ul ref={strip} className="mx-auto flex w-fit max-w-full gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none]">
            {photos.map((p, n) => (
              <li key={p.src} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setI(n)}
                  aria-label={`Foto ${n + 1}: ${p.alt}`}
                  aria-current={n === i ? "true" : undefined}
                  className={`relative block size-14 cursor-pointer overflow-hidden rounded-lg transition-opacity ${n === i ? "outline-2 -outline-offset-2 outline-paper" : "opacity-45 hover:opacity-100"}`}
                >
                  <Image src={p.src} alt="" fill sizes="56px" className="object-cover" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </>
  );
}
