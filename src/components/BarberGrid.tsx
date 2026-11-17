import Image from "next/image";
import { barbers, waLink } from "@/data/site";

export default function BarberGrid() {
  const list = barbers.filter((b) => b.aktif).sort((a, b) => a.urutan - b.urutan);
  return (
    <ul className="grid grid-cols-2 gap-3 md:gap-6">
      {list.map((b, i) => (
        <li key={b.id}>
          <a
            href={waLink(`Halo Manut'o, saya mau booking potong rambut dengan ${b.nama}.`)}
            target="_blank"
            rel="noopener"
            className="card-link photo-mono group"
          >
            <span className="relative block aspect-[4/5] overflow-hidden rounded-2xl bg-surface">
              <Image src={b.foto} alt={`${b.nama}, barber ke-${i + 1}`} fill sizes="50vw" className="object-cover object-[center_85%]" />
            </span>
            <span className="mt-4 block font-display text-[20px] font-bold leading-tight sm:text-[26px]">{b.nama}</span>
            <span className="mt-1 block text-[15px] leading-5 text-muted sm:text-[16px]">{b.keahlian}</span>
            <span className="mt-2 inline-flex min-h-8 items-center gap-1 text-[14px] font-semibold text-brand">
              Booking <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
