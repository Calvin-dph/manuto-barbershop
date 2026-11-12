import Image from "next/image";
import { barbers, waLink } from "@/data/site";

export default function BarberGrid() {
  const list = barbers.filter((b) => b.aktif).sort((a, b) => a.urutan - b.urutan);
  return (
    <ul className="grid gap-8 sm:grid-cols-2 md:gap-6">
      {list.map((b, i) => (
        <li key={b.id}>
          <a
            href={waLink(`Halo Manut'o, saya mau booking potong rambut dengan ${b.nama}.`)}
            target="_blank"
            rel="noopener"
            className="card-link photo-mono group"
          >
            <span className="relative block aspect-[4/5] overflow-hidden bg-surface">
              <Image src={b.foto} alt={`${b.nama}, barber ke-${i + 1}`} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover object-[center_85%]" />
            </span>
            <span className="mt-5 flex items-start justify-between gap-4">
              <span>
                <span className="block font-display text-[26px] font-semibold uppercase leading-tight">{b.nama}</span>
                <span className="mt-1 block text-[16px] text-muted">{b.keahlian}</span>
              </span>
              <span className="mt-1 inline-flex shrink-0 items-center gap-1 text-[14px] font-semibold uppercase tracking-[0.06em] text-brand">
                Booking <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
