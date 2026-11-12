"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Photo } from "@/data/site";

export default function Gallery({ photos }: { photos: Photo[] }) {
  const dlg = useRef<HTMLDialogElement>(null);
  const [i, setI] = useState(0);
  const show = (n: number) => {
    setI(n);
    dlg.current?.showModal();
  };
  const step = (d: number) => setI((n) => (n + d + photos.length) % photos.length);

  return (
    <>
      <ul className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
        {photos.map((p, n) => (
          <li key={p.src}>
            <button type="button" onClick={() => show(n)} className="card-link relative block aspect-[4/5] w-full overflow-hidden bg-surface" aria-label={`Perbesar foto: ${p.alt}`}>
              <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover" />
            </button>
          </li>
        ))}
      </ul>
      <dialog
        ref={dlg}
        aria-label="Foto galeri"
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-ink/95 p-0 text-paper backdrop:bg-black/70"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        onClick={(e) => e.target === e.currentTarget && dlg.current?.close()}
      >
        <div className="relative mx-auto flex h-full max-w-[1100px] items-center px-4 py-16">
          <div className="relative h-full w-full">
            <Image src={photos[i].src} alt={photos[i].alt} fill sizes="100vw" className="object-contain" />
          </div>
          <button type="button" onClick={() => dlg.current?.close()} className="btn absolute right-4 top-4 bg-paper text-ink">Tutup</button>
          <button type="button" onClick={() => step(-1)} aria-label="Foto sebelumnya" className="btn absolute bottom-4 left-4 bg-paper text-ink">←</button>
          <button type="button" onClick={() => step(1)} aria-label="Foto berikutnya" className="btn absolute bottom-4 right-4 bg-paper text-ink">→</button>
        </div>
      </dialog>
    </>
  );
}
