import { categories, rupiah, servicesByCategory, waLink } from "@/data/site";

// Meniru poster daftar harga di toko: judul kategori serif hijau, nama layanan di kiri, harga di kanan.
export default function PriceList({ as: H = "h2" }: { as?: "h2" | "h3" }) {
  return (
    <div className="grid gap-12 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">
      {categories.map((c) => (
        <section key={c.id} id={c.id} aria-labelledby={`h-${c.id}`} className="scroll-mt-24">
          <H id={`h-${c.id}`} className="border-b border-ink pb-3 font-serif text-[25px] leading-tight text-brand">{c.nama}</H>
          <ul className="mt-2">
            {servicesByCategory(c.id).map((sv) => (
              <li key={sv.id}>
                <a
                  href={waLink(`Halo Manut'o, saya mau booking ${sv.nama}.`)}
                  target="_blank"
                  rel="noopener"
                  className="group flex min-h-12 items-baseline gap-3 py-3 text-[16px] leading-6"
                  aria-label={`Booking ${sv.nama}, ${sv.hargaMulai ? "mulai " : ""}${rupiah(sv.harga)}`}
                >
                  <span className="font-medium group-hover:text-brand">{sv.nama}</span>
                  <span aria-hidden className="min-w-4 flex-1 border-b border-dotted border-muted/60" />
                  <span className="shrink-0 text-right font-semibold tabular-nums">
                    {sv.hargaMulai && <span className="mr-1 text-[13px] font-normal text-muted">mulai</span>}
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
