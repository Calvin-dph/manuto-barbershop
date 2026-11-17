import { Fragment } from "react";
import Image from "next/image";
import BarberGrid from "@/components/BarberGrid";
import Parallax from "@/components/Parallax";
import PriceList from "@/components/PriceList";
import ReviewCard, { Stars } from "@/components/ReviewCard";
import Reveal from "@/components/Reveal";
import ScrollText from "@/components/ScrollText";
import SectionHead from "@/components/SectionHead";
import { fasilitas, featuredReviews, member, rupiah, settings, waLink } from "@/data/site";

export default function Home() {
  return (
    <>
      {/* Hero selayar penuh: foto jadi latar, teks di tengah. Ditarik 65px ke atas supaya berada di balik header transparan; 6px = garis pole. */}
      <section data-cursor-glow className="relative isolate -mt-[65px] flex min-h-[calc(100svh-6px)] flex-col items-center justify-end overflow-hidden bg-ink px-4 pb-10 pt-28 text-center text-white md:pb-14">
        <Image src="/photos/suasana-sore.jpg" alt="Suasana Manut'o Barbershop saat barber melayani pelanggan" fill priority sizes="100vw" className="hero-bg -z-10 object-cover" />
        {/* Lapisan gelap supaya teks putih terbaca; bagian bawah memudar ke hitam penuh supaya menyatu dengan bagian perkenalan. */}
        <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-b from-ink/60 from-45% to-ink" />
        {/* Tagline dari bio Instagram Manut'o. */}
        <h1 className="h-display text-[clamp(40px,9.5vw,152px)] uppercase leading-[0.9]">
          <span className="sr-only">Manut&rsquo;o Barbershop Ungaran: </span>
          {/* Kata muncul satu per satu; null = pindah baris. */}
          {["Gantengin", "di", null, "segala", "kondisi"].map((kata, i) =>
            kata ? (
              <Fragment key={i}>{" "}<span className="hero-up inline-block" style={{ animationDelay: `${0.5 + i * 0.2}s` }}>{kata}</span></Fragment>
            ) : (
              <br key={i} />
            ),
          )}
        </h1>
        <a href={waLink()} target="_blank" rel="noopener" data-hero-action className="hero-up hero-up-late btn mt-7 bg-white px-7 font-bold uppercase tracking-[0.02em] text-ink hover:bg-white/85">
          Booking sekarang
        </a>
      </section>

      {/* Perkenalan singkat: satu kalimat besar di latar gelap, langsung di bawah hero. */}
      <section data-cursor-glow className="relative flex min-h-[70svh] items-center overflow-hidden bg-ink py-20 text-white">
        {/* Foto clipper tanpa latar; ujung gagangnya sengaja keluar dari pojok kanan bawah dan bergerak parallax dari arah itu saat di-scroll. Di HP disembunyikan supaya tidak menimpa teks. */}
        {/* Foto aslinya miring sekitar 39° dari tegak; rotate 11° menjadikannya sekitar 28°. */}
        <Parallax className="pointer-events-none absolute -right-[6%] top-[11%] hidden h-[115%] md:block">
          <Image src="/photos/clipper.webp" alt="" width={900} height={1049} sizes="45vw" className="h-full w-auto max-w-none rotate-[11deg] brightness-[.6]" />
        </Parallax>
        <div className="wrap relative">
          <h2 className="label text-white/80">{settings.tagline} · Ungaran</h2>
          <ScrollText
            text={`Barbershop pria di Ungaran. Potong rapi mulai ${rupiah(25000)}, buka setiap hari sampai jam 10 malam.`}
            className="mt-6 max-w-[21ch] text-[clamp(28px,4.2vw,58px)] leading-[1.15] tracking-[-0.015em]"
          />
        </div>
      </section>

      {/* Daftar harga lengkap langsung di beranda: ini yang paling dicari pengunjung. */}
      <section id="harga" className="scroll-mt-16 bg-surface py-16 md:py-24">
        <div className="wrap">
          <Reveal><SectionHead title="Daftar harga" line="Pilih layanan untuk langsung booking lewat WhatsApp." /></Reveal>
          <Reveal delay={0.15}><PriceList as="h3" /></Reveal>
        </div>
      </section>

      <section id="kunjungi" className="wrap grid gap-8 py-16 md:grid-cols-12 md:gap-10 md:py-24">
        <Reveal className="md:col-span-7">
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
        </Reveal>
        <Reveal clip delay={0.15} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface md:col-span-5 md:aspect-auto md:min-h-[440px]">
          <Image src="/photos/papan-nama.jpg" alt="Papan nama Manut'o Barbershop di samping pintu hijau" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
        </Reveal>
      </section>

      {/* Judul di kolom kiri, dua foto di kanan, supaya foto tidak selebar 590px di desktop. */}
      <section className="wrap grid gap-8 border-t border-line py-16 md:grid-cols-3 md:gap-10 md:py-24">
        <Reveal>
          <h2 className="h-section">Barber kami</h2>
          <p className="mt-4 max-w-[30ch] leading-7 text-muted">Pilih barber, namanya langsung masuk ke pesan WhatsApp.</p>
        </Reveal>
        <Reveal delay={0.15} className="md:col-span-2">
          <BarberGrid />
        </Reveal>
      </section>

      <section className="bg-brand py-16 text-white md:py-24">
        <div className="wrap grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <Reveal>
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
          </Reveal>
          <Reveal clip delay={0.15} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-paper">
            <Image src={member.foto} alt="Kartu member Manut'o Barbershop, hitam dan abu-abu" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </Reveal>
        </div>
      </section>

      <section className="wrap py-16 md:py-24">
        <Reveal>
          <SectionHead title="Kata pelanggan" href="/ulasan" linkLabel="Semua ulasan" />
          <p className="-mt-4 mb-10 flex flex-wrap items-center gap-3 text-[17px] md:-mt-8 md:mb-12">
            <span className="font-display text-[40px] font-bold leading-none">{settings.ratingGoogle.toLocaleString("id-ID")}</span>
            <Stars n={5} className="text-[20px]" />
            <a href={settings.mapsUrl} target="_blank" rel="noopener" className="link-draw text-muted">dari {settings.jumlahUlasan} ulasan Google</a>
          </p>
        </Reveal>
        <ul className="grid gap-8 md:grid-cols-3">
          {featuredReviews().slice(0, 3).map((rv, i) => <li key={rv.id}><Reveal delay={i * 0.12}><ReviewCard review={rv} /></Reveal></li>)}
        </ul>
      </section>
    </>
  );
}
