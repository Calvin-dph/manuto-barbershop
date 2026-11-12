import type { Metadata } from "next";
import BarberGrid from "@/components/BarberGrid";
import SectionHead from "@/components/SectionHead";

export const metadata: Metadata = {
  title: "Barber",
  description: "Kenalan dengan barber Manut'o Barbershop Ungaran dan booking langsung dengan barber pilihanmu.",
};

export default function Barber() {
  return (
    <section className="wrap pb-20 pt-14 md:pb-28 md:pt-20">
      <SectionHead as="h1" title="Barber kami" line="Pilih barber, lalu namanya otomatis masuk ke pesan booking WhatsApp." />
      <BarberGrid />
    </section>
  );
}
