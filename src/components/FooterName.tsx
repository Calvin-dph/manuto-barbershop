"use client";

import { motion, useReducedMotion } from "motion/react";

// Nama toko selebar kolom di dasar footer; tiap huruf naik dari balik garis bawahnya satu per satu saat footer terlihat.
// Yang diamati <p>-nya: huruf yang tersembunyi di balik overflow-hidden tidak pernah dianggap "terlihat" oleh IntersectionObserver.
// initial selalu sama di server & client (hindari hydration mismatch); reduce motion cukup membuatnya instan.
export default function FooterName({ text }: { text: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.p
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ staggerChildren: reduce ? 0 : 0.06 }}
      className="wrap flex select-none justify-between overflow-hidden pt-6 font-display text-[min(18vw,260px)] font-bold uppercase leading-[0.8] tracking-[-0.02em]"
    >
      {[...text].map((c, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.06em]">
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: "105%" }, show: { y: 0 } }}
            transition={reduce ? { duration: 0 } : { duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {c}
          </motion.span>
        </span>
      ))}
    </motion.p>
  );
}
