import Image from "next/image";
import Link from "next/link";
import BarberGrid from "@/components/BarberGrid";
import OpenNow from "@/components/OpenNow";
import ReviewCard, { Stars } from "@/components/ReviewCard";
import SectionHead from "@/components/SectionHead";
import Ticker from "@/components/Ticker";
import { categories, fasilitas, featuredReviews, member, rupiah, servicesByCategory, settings, waLink } from "@/data/site";

export default function Home() {
  return (
    <>
      {/* Hero: judul di atas, foto besar di bawah; tidak ada teks di atas foto. */}
      <section className="flex min-h-[calc(100svh-4rem)] flex-col">
        <div className="wrap grid gap-6 pb-8 pt-10 md:grid-cols-12 md:items-end md:pb-10 md:pt-14">
          <div className="md:col-span-8">
            <p className="label enter text-muted">{settings.tagline} · Ungaran</p>
            <h1 className="h-display enter enter-2 mt-4 text-[52px] sm:text-[84px] lg:text-[112px]">Barbershop di Ungaran</h1>
          </div>
          <div className="enter enter-3 md:col-span-4 md:pb-3">
            <p className="text-[18px] leading-7 text-muted">
              Potong rambut pria <strong className="font-semibold text-ink">{rupiah(25000)}</strong>, tambah keramas {rupiah(30000)}. Buka setiap hari 10.00–22.00.
            </p>
            <div className="mt-6 flex flex-wrap gap-3" data-hero-action>
              <a href={waLink()} target="_blank" rel="noopener" className="btn btn-primary">Booking via WhatsApp</a>
              <Link href="/layanan" className="btn btn-line">Lihat harga</Link>
            </div>
          </div>
        </div>
        <div className="enter enter-3 relative min-h-[46vh] flex-1 overflow-hidden bg-surface">
          <Image src="/photos/barber-bekerja.jpg" alt="Barber Manut'o mencukur pelanggan" fill priority sizes="100vw" className="object-cover object-[center_30%]" />
        </div>
      </section>

      <Ticker />

      {/* Kunjungi: alamat dibuat besar sebagai satu momen tipografi. */}
      <section id="kunjungi" className="wrap py-20 md:py-28">
        <h2 className="h-section">Datang ke Manut&rsquo;o</h2>
        <p className="mt-6">
          <a href={settings.mapsUrl} target="_blank" rel="noopener" className="link-draw h-display text-[44px] sm:text-[72px] lg:text-[96px]">
            Jl. HOS Cokroaminoto, Ungaran
          </a>
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="bg-surface p-6 sm:p-10">
            <OpenNow />
            <div className="mt-6 grid gap-8 sm:grid-cols-2">
              <div>
                <p className="label text-muted">Alamat</p>
                <p className="mt-3 text-[18px] leading-7">{settings.alamatJalan}<br />{settings.alamatArea}</p>
              </div>
              <div>
                <p className="label text-muted">Jam buka</p>
                <p className="mt-3 text-[18px] leading-7">Setiap hari<br /><span className="tabular-nums">10.00–22.00 WIB</span></p>
              </div>
            </div>
            <a href={settings.mapsUrl} target="_blank" rel="noopener" className="btn btn-ink mt-8">Petunjuk arah</a>
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-6 text-[16px] text-muted">
              {fasilitas.map((f) => <li key={f}>{f}</li>)}
            </ul>
          </div>
          <div className="relative min-h-[420px] overflow-hidden bg-surface">
            <Image src="/photos/papan-nama.jpg" alt="Papan nama Manut'o Barbershop di samping pintu hijau" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* Layanan: tiga kartu potret seperti di Don Barber. */}
      <section className="border-t border-line bg-surface py-20 md:py-28">
        <div className="wrap">
          <SectionHead title="Layanan & harga" line="Dari potong rambut sampai perming dan semir." href="/layanan" linkLabel="Semua harga" />
          <ul className="grid gap-8 md:grid-cols-3 md:gap-6">
            {categories.map((c) => {
              const list = servicesByCategory(c.id);
              const min = Math.min(...list.map((x) => x.harga));
              return (
                <li key={c.id}>
                  <Link href={`/layanan#${c.id}`} className="card-link group">
                    <span className="relative block aspect-[4/5] overflow-hidden bg-paper">
                      <Image src={c.foto} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                    </span>
                    <span className="mt-5 flex items-baseline justify-between gap-4">
                      <span className="font-display text-[26px] font-semibold uppercase">{c.nama}</span>
                      <span className="shrink-0 text-[15px] text-muted">mulai {rupiah(min)}</span>
                    </span>
                    <span className="mt-2 block text-[16px] leading-6 text-muted">{list.slice(0, 3).map((x) => x.nama).join(" · ")}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="wrap py-20 md:py-28">
        <SectionHead title="Barber kami" line="Pilih barber favoritmu, namanya langsung masuk ke pesan WhatsApp." href="/barber" linkLabel="Semua barber" />
        <BarberGrid />
      </section>

      {/* Member: satu-satunya band berwarna di halaman. */}
      <section className="bg-brand py-20 text-white md:py-28">
        <div className="wrap grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="h-section">Kartu member Manut&rsquo;o</h2>
            <p className="mt-6 font-display text-[44px] font-semibold uppercase leading-none sm:text-[56px]">
              {rupiah(member.harga)}<span className="ml-2 text-[20px] font-medium normal-case text-white/80">/ {member.periode}</span>
            </p>
            <ul className="mt-8 text-[18px] leading-7">
              {member.benefit.map((b) => (
                <li key={b} className="flex gap-3 border-b border-white/20 py-3"><span aria-hidden>✓</span>{b}</li>
              ))}
            </ul>
            <a href={waLink("Halo Manut'o, saya mau daftar kartu member.")} target="_blank" rel="noopener" className="btn mt-8 bg-paper text-ink hover:bg-white">
              Daftar member
            </a>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-paper">
            <Image src={member.foto} alt="Kartu member Manut'o Barbershop, hitam dan abu-abu" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="wrap py-20 md:py-28">
        <SectionHead title="Kata pelanggan" href="/ulasan" linkLabel="Semua ulasan" />
        <p className="-mt-6 mb-10 flex flex-wrap items-center gap-3 text-[18px] md:-mt-10 md:mb-14">
          <span className="font-display text-[40px] font-semibold leading-none">{settings.ratingGoogle.toLocaleString("id-ID")}</span>
          <Stars n={5} className="text-[22px]" />
          <span className="text-muted">dari {settings.jumlahUlasan} ulasan Google</span>
        </p>
        <ul className="grid gap-6 md:grid-cols-3">
          {featuredReviews().slice(0, 3).map((rv) => <li key={rv.id}><ReviewCard review={rv} /></li>)}
        </ul>
      </section>

      {/* Penutup */}
      <section className="border-t border-line">
        <div className="wrap grid items-center gap-10 py-20 md:grid-cols-2 md:py-28">
          <div>
            <h2 className="h-display text-[48px] sm:text-[72px]">Rapi hari ini, tanpa antre lama</h2>
            <p className="mt-6 text-[18px] leading-7 text-muted">Kirim jam datangmu lewat WhatsApp, kursinya kami siapkan.</p>
            <a href={waLink()} target="_blank" rel="noopener" className="btn btn-primary mt-8">Booking via WhatsApp</a>
          </div>
          <div className="relative aspect-square overflow-hidden bg-surface">
            <Image src="/photos/kursi-barber.jpg" alt="Kursi barber Manut'o yang siap dipakai" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>
    </>
  );
}
