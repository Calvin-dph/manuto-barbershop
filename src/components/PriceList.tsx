import { categories, rupiah, servicesByCategory, waLink } from "@/data/site";

export default function PriceList() {
  return (
    <div className="grid gap-12 md:grid-cols-3 md:gap-8">
      {categories.map((c) => (
        <section key={c.id} id={c.id} aria-labelledby={`h-${c.id}`} className="scroll-mt-24">
          <h2 id={`h-${c.id}`} className="font-display text-[24px] font-semibold uppercase">{c.nama}</h2>
          <ul className="mt-4">
            {servicesByCategory(c.id).map((sv) => (
              <li key={sv.id} className="border-b border-line">
                <a
                  href={waLink(`Halo Manut'o, saya mau booking ${sv.nama}.`)}
                  target="_blank"
                  rel="noopener"
                  className="group flex min-h-14 items-center justify-between gap-4 py-3 text-[16px] leading-6"
                  aria-label={`Booking ${sv.nama}, ${sv.hargaMulai ? "mulai " : ""}${rupiah(sv.harga)}`}
                >
                  <span className="font-medium group-hover:text-brand">{sv.nama}</span>
                  <span className="shrink-0 text-right tabular-nums">
                    {sv.hargaMulai && <span className="mr-1 text-[13px] text-muted">mulai</span>}
                    {rupiah(sv.harga)}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
