import type { MetadataRoute } from "next";
import { brands } from "@/content/brands";

const base = "https://indpt.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/brands", "/about", "/leadership", "/locations", "/careers", "/contact", "/privacy", "/terms"];
  return [
    ...pages.map((p) => ({ url: `${base}${p}` })),
    ...brands.map((b) => ({ url: `${base}/brands/${b.slug}` })),
  ];
}
