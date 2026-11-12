import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://manutobarbershop.com";
  return ["", "/layanan", "/barber", "/galeri", "/ulasan", "/kontak"].map((p) => ({ url: base + p }));
}
