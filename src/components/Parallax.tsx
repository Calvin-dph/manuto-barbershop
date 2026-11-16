"use client";

import { useEffect, useRef } from "react";

// Parallax: isi bergeser diagonal mengikuti scroll, datang dari kanan bawah sampai kotaknya di tengah layar, lalu berhenti.
// Yang diukur kotak luar yang diam, bukan isi yang bergeser.
export default function Parallax({ className = "", children }: { className?: string; children: React.ReactNode }) {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = box.current!;
    const inner = el.firstElementChild as HTMLElement;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      // 0 saat kotak baru muncul dari bawah layar, 1 saat sudah lewat di atas.
      const p = Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight + r.height)));
      // Berhenti di posisi asli begitu kotak sampai di tengah layar; setelah itu diam.
      const d = Math.max(0, 0.5 - p);
      inner.style.translate = `${d * 60}% ${d * 90}%`;
    };
    const onScroll = () => {
      raf ||= requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={box} className={className}>
      {/* Transisi pendek menghaluskan langkah roda mouse. */}
      <div className="h-full transition-[translate] duration-300 ease-out will-change-transform">{children}</div>
    </div>
  );
}
