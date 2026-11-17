"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

// Titik putih dengan blend difference (warnanya selalu kebalikan latar) + glow lebar yang menyusul pelan.
// Glow hanya muncul di atas section yang diberi atribut data-cursor-glow.
// Hanya tampil untuk mouse (pointer-fine); di layar sentuh tidak ada kursor untuk diikuti.
export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // Titik menyusul sedikit tertinggal, glow lebih tertinggal lagi.
  const dx = useSpring(x, { stiffness: 150, damping: 20, mass: 0.6 });
  const dy = useSpring(y, { stiffness: 150, damping: 20, mass: 0.6 });
  const gx = useSpring(x, { stiffness: 40, damping: 20 });
  const gy = useSpring(y, { stiffness: 40, damping: 20 });
  const glow = useSpring(0, { stiffness: 80, damping: 25 });
  const scale = useSpring(1, { stiffness: 300, damping: 25 });

  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches) return;
    document.documentElement.classList.add("custom-cursor");
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as Element;
      glow.set(t.closest?.("[data-cursor-glow]") ? 1 : 0);
      // Membesar di atas link/tombol; blend difference membuat teks di bawahnya terbalik warnanya.
      scale.set(t.closest?.("a, button, [role=button], summary, label") ? 6.5 : 1);
    };
    const leave = () => {
      glow.set(0);
      scale.set(1);
    };
    addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    return () => {
      removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, [x, y, glow, scale]);

  return (
    <>
      <motion.div
        aria-hidden
        style={{ x: gx, y: gy, opacity: glow }}
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden pointer-fine:block"
      >
        {/* Bentuk tidak beraturan yang pelan berubah + berputar, di-blur besar supaya jadi kabut lebar. */}
        <motion.div
          animate={{
            borderRadius: ["42% 58% 70% 30% / 45% 45% 55% 55%", "70% 30% 46% 54% / 30% 39% 61% 70%", "35% 65% 38% 62% / 60% 35% 65% 40%", "42% 58% 70% 30% / 45% 45% 55% 55%"],
            rotate: [0, 120, 240, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="-ml-[350px] -mt-[220px] h-[440px] w-[700px] bg-white/[0.07] blur-[90px]"
        />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ x: dx, y: dy, scale }}
        className="pointer-events-none fixed left-0 top-0 z-[61] -ml-1.5 -mt-1.5 hidden size-3 rounded-full bg-white mix-blend-difference pointer-fine:block"
      />
    </>
  );
}
