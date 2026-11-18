"use client";

import { useEffect, useRef } from "react";

// Menyimpan tinggi footer di --footer-h untuk posisi sticky curtain reveal (lihat Footer).
export default function FooterCurtain() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const footer = ref.current?.closest("footer");
    if (!footer) return;
    const ro = new ResizeObserver(() => footer.style.setProperty("--footer-h", `${footer.offsetHeight}px`));
    ro.observe(footer);
    return () => ro.disconnect();
  }, []);
  return <span ref={ref} hidden />;
}
