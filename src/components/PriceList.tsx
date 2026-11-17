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
                  <span className="font-medium transition-colors group-hover:text-brand group-focus-visible:text-brand">{sv.nama}</span>
                  {/* Saat hover, garis titik-titik "terisi" garis hijau dari kiri ke harga, lalu panah booking muncul. */}
                  <span aria-hidden className="relative min-w-4 flex-1 border-b border-dotted border-muted/60">
                    <span className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-brand transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none" />
                  </span>
                  <span className="shrink-0 text-right font-semibold tabular-nums transition-colors group-hover:text-brand group-focus-visible:text-brand">
                    {sv.hargaMulai && <span className="mr-1 text-[13px] font-normal text-muted">mulai</span>}
                    {rupiah(sv.harga)}
                    <span aria-hidden className="inline-block w-0 overflow-hidden align-bottom opacity-0 transition-all duration-300 group-hover:w-5 group-hover:opacity-100 group-focus-visible:w-5 group-focus-visible:opacity-100 motion-reduce:transition-none">&nbsp;→</span>
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
