import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/layanan", "/barber", "/galeri", "/ulasan", "/kontak"].map((p) => ({ url: siteUrl + p }));
}
