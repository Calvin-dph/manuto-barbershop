import Image from "next/image";
import BarberGrid from "@/components/BarberGrid";
import OpenNow from "@/components/OpenNow";
import PriceList from "@/components/PriceList";
import ReviewCard, { Stars } from "@/components/ReviewCard";
import SectionHead from "@/components/SectionHead";
import { fasilitas, featuredReviews, member, rupiah, settings, waLink } from "@/data/site";

export default function Home() {
  return (
    <>
      {/* Hero: foto dibatasi satu kolom supaya tidak ditarik melebihi resolusi aslinya. */}
      <section className="wrap grid gap-8 pb-14 pt-8 md:grid-cols-12 md:items-center md:gap-10 md:pb-20 md:pt-14">
        <div className="md:col-span-7">
          <p className="label text-muted">{settings.tagline} · Ungaran</p>
          <h1 className="h-display mt-4 text-[clamp(44px,7.2vw,92px)] uppercase">Barbershop di Ungaran</h1>
          <p className="mt-5 max-w-[34ch] text-[19px] leading-7">
            Potong rambut pria <strong className="font-bold">{rupiah(25000)}</strong>, tambah keramas {rupiah(30000)}.
          </p>
          <p className="mt-3"><OpenNow /></p>
          <div className="mt-7 flex flex-wrap gap-3" data-hero-action>
            <a href={waLink()} target="_blank" rel="noopener" className="btn btn-primary">Booking via WhatsApp</a>
            <a href="#harga" className="btn btn-line">Lihat harga</a>
          </div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden bg-surface md:col-span-5">
          <Image src="/photos/barber-bekerja.jpg" alt="Barber Manut'o mengeringkan rambut pelanggan" fill priority sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
        </div>
      </section>

      {/* Daftar harga lengkap langsung di beranda: ini yang paling dicari pengunjung. */}
      <section id="harga" className="scroll-mt-16 bg-surface py-16 md:py-24">
        <div className="wrap">
          <SectionHead title="Daftar harga" line="Pilih layanan untuk langsung booking lewat WhatsApp." />
          <PriceList as="h3" />
        </div>
      </section>

      <section id="kunjungi" className="wrap grid gap-8 py-16 md:grid-cols-12 md:gap-10 md:py-24">
        <div className="md:col-span-7">
          <h2 className="label text-muted">Datang ke Manut&rsquo;o</h2>
          <p className="mt-4">
            <a href={settings.mapsUrl} target="_blank" rel="noopener" className="link-draw h-display text-[34px] sm:text-[52px] lg:text-[64px]">
              {settings.alamatJalan}, Ungaran
            </a>
          </p>
          <p className="mt-5 text-[18px] leading-7 text-muted">
            {settings.alamatArea}<br />
            {settings.hariBuka}, <span className="tabular-nums">10.00–22.00 WIB</span>
          </p>
          <a href={settings.mapsUrl} target="_blank" rel="noopener" className="btn btn-ink mt-7">Petunjuk arah</a>
          <p className="label mt-10 border-t border-line pt-6 text-muted">Fasilitas</p>
          <p className="mt-3 text-[17px] leading-7">{fasilitas.join(" · ")}</p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden bg-surface md:col-span-5 md:aspect-auto md:min-h-[440px]">
          <Image src="/photos/papan-nama.jpg" alt="Papan nama Manut'o Barbershop di samping pintu hijau" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
        </div>
      </section>

      {/* Judul di kolom kiri, dua foto di kanan, supaya foto tidak selebar 590px di desktop. */}
      <section className="wrap grid gap-8 border-t border-line py-16 md:grid-cols-3 md:gap-10 md:py-24">
        <div>
          <h2 className="h-section">Barber kami</h2>
          <p className="mt-4 max-w-[30ch] leading-7 text-muted">Pilih barber, namanya langsung masuk ke pesan WhatsApp.</p>
        </div>
        <div className="md:col-span-2">
          <BarberGrid />
        </div>
      </section>

      <section className="bg-brand py-16 text-white md:py-24">
        <div className="wrap grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="h-section">Kartu member</h2>
            <p className="mt-5 font-display text-[44px] font-bold leading-none sm:text-[56px]">
              {rupiah(member.harga)}<span className="ml-2 font-sans text-[18px] font-medium text-white/80">/ {member.periode}</span>
            </p>
            <ul className="mt-6 text-[18px] leading-7">
              {member.benefit.map((b) => (
                <li key={b} className="border-b border-white/20 py-3">{b}</li>
              ))}
            </ul>
            <a href={waLink("Halo Manut'o, saya mau daftar kartu member.")} target="_blank" rel="noopener" className="btn mt-8 bg-paper text-ink hover:bg-surface">
              Daftar member
            </a>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-paper">
            <Image src={member.foto} alt="Kartu member Manut'o Barbershop, hitam dan abu-abu" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="wrap py-16 md:py-24">
        <SectionHead title="Kata pelanggan" href="/ulasan" linkLabel="Semua ulasan" />
        <p className="-mt-4 mb-10 flex flex-wrap items-center gap-3 text-[17px] md:-mt-8 md:mb-12">
          <span className="font-display text-[40px] font-bold leading-none">{settings.ratingGoogle.toLocaleString("id-ID")}</span>
          <Stars n={5} className="text-[20px]" />
          <a href={settings.mapsUrl} target="_blank" rel="noopener" className="link-draw text-muted">dari {settings.jumlahUlasan} ulasan Google</a>
        </p>
        <ul className="grid gap-8 md:grid-cols-3">
          {featuredReviews().slice(0, 3).map((rv) => <li key={rv.id}><ReviewCard review={rv} /></li>)}
        </ul>
      </section>
    </>
  );
}
