"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

// Scroll halus (Lenis) untuk seluruh halaman. Dimatikan kalau pengguna memilih "kurangi gerakan".
export default function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      autoRaf: true,
      anchors: true, // link #id ikut halus; scroll-mt-* tetap dihormati
      // Jangan scroll halaman di belakang lightbox galeri; menu layar penuh memakai data-lenis-prevent.
      prevent: (node) => !!node.closest("dialog"),
    });
    return () => lenis.destroy();
  }, []);
  return null;
}
