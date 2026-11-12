"use client";

import { useEffect, useState } from "react";
import { settings } from "@/data/site";

const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

// Status buka dihitung di browser dengan zona waktu WIB, supaya halaman tetap bisa dirender statis.
export function isOpenAt(date: Date, buka = settings.jamBuka, tutup = settings.jamTutup) {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Jakarta", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(date);
  const now = Number(parts.find((p) => p.type === "hour")!.value) * 60 + Number(parts.find((p) => p.type === "minute")!.value);
  return now >= toMin(buka) && now < toMin(tutup);
}

export default function OpenNow({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const tick = () => setOpen(isOpenAt(new Date()));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  if (open === null) return <span className={className} aria-hidden>&nbsp;</span>;
  return (
    <span className={`inline-flex items-center gap-2 text-[15px] font-medium ${className}`}>
      <span aria-hidden className={`size-2.5 rounded-full ${open ? "bg-brand" : "bg-muted"}`} />
      {open ? `Buka sekarang · tutup ${settings.jamTutup.replace(":", ".")}` : `Tutup · buka lagi ${settings.jamBuka.replace(":", ".")}`}
    </span>
  );
}
