"use client";

import { motion, useReducedMotion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

// Muncul sekali saat masuk layar. Default: naik pelan + memudar masuk.
// clip: tirai terbuka dari bawah ke atas (untuk foto), isinya sedikit mengecil dari zoom.
export default function Reveal({ children, className, delay = 0, clip = false }: { children: React.ReactNode; className?: string; delay?: number; clip?: boolean }) {
  const reduce = useReducedMotion();
  // Markup sama di server & client (hindari hydration mismatch); reduce motion cukup membuat animasinya instan.
  const transition = reduce ? { duration: 0 } : { duration: clip ? 1.1 : 0.8, ease, delay };
  const viewport = { once: true, amount: 0.25 };

  // Yang diamati wrapper luar: elemen yang sedang di-clip habis tidak pernah dianggap "masuk layar" oleh IntersectionObserver.
  if (clip)
    return (
      <motion.div className={className} initial="hidden" whileInView="show" viewport={viewport}>
        <motion.div
          className="absolute inset-0"
          variants={{ hidden: { clipPath: "inset(100% 0 0 0)" }, show: { clipPath: "inset(0% 0 0 0)" } }}
          transition={transition}
        >
          <motion.div className="absolute inset-0" variants={{ hidden: { scale: 1.2 }, show: { scale: 1 } }} transition={reduce ? transition : { ...transition, duration: 1.6 }}>
            {children}
          </motion.div>
        </motion.div>
      </motion.div>
    );
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={transition}>
      {children}
    </motion.div>
  );
}
