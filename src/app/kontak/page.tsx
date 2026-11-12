import type { Metadata } from "next";
import OpenNow from "@/components/OpenNow";
import SectionHead from "@/components/SectionHead";
import { faq, settings, waLink } from "@/data/site";

export const metadata: Metadata = {
  title: "Kontak & Lokasi",
  description: `Alamat, jam buka, dan kontak Manut'o Barbershop: ${settings.alamatLengkap}.`,
};

export default function Kontak() {
  return (
    <>
      <section className="wrap pb-16 pt-14 md:pt-20">
        <SectionHead as="h1" title="Kontak & lokasi" />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-surface p-6 sm:p-10">
            <OpenNow />
            <p className="label mt-8 text-muted">Alamat</p>
            <p className="mt-3 text-[18px] leading-7">{settings.alamatLengkap}</p>
            <p className="label mt-8 text-muted">Jam buka</p>
            <p className="mt-3 text-[18px] leading-7">Senin–Minggu, 10.00–22.00 WIB</p>
            <p className="label mt-8 text-muted">WhatsApp & sosial media</p>
            <ul className="mt-2 text-[18px] leading-7">
              <li><a className="link-draw inline-flex min-h-11 items-center" href={waLink()} target="_blank" rel="noopener">{settings.whatsappTampil}</a></li>
              <li><a className="link-draw inline-flex min-h-11 items-center" href={settings.instagram} target="_blank" rel="noopener">Instagram @manutobarbershop2025</a></li>
              <li><a className="link-draw inline-flex min-h-11 items-center" href={settings.tiktok} target="_blank" rel="noopener">TikTok @manuto.barbershop</a></li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={settings.mapsUrl} target="_blank" rel="noopener" className="btn btn-ink">Petunjuk arah</a>
              <a href={waLink()} target="_blank" rel="noopener" className="btn btn-line">Chat WhatsApp</a>
            </div>
          </div>
          <iframe
            title="Peta lokasi Manut'o Barbershop di Google Maps"
            src={settings.mapsEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="min-h-[420px] w-full border-0 bg-surface"
          />
        </div>
      </section>
      <section className="border-t border-line bg-surface py-20 md:py-28">
        <div className="wrap grid gap-10 md:grid-cols-12">
          <h2 className="h-section md:col-span-4">Pertanyaan yang sering ditanya</h2>
          <dl className="md:col-span-8">
            {faq.map((f) => (
              <div key={f.q} className="border-b border-line py-6 first:pt-0">
                <dt className="text-[19px] font-semibold">{f.q}</dt>
                <dd className="mt-2 text-[17px] leading-7 text-muted">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
