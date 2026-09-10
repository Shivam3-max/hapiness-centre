import type { MetadataRoute } from "next";
import { PROGRAMS, PRODUCTS } from "@/data/content";
import { POSTS } from "@/data/journal";
import { SITE_URL } from "@/lib/site";

const BASE = SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "", "/transformations", "/programs", "/method", "/products", "/community",
    "/coaches", "/free-day", "/consultation", "/tools", "/journal", "/reviews",
    "/faq", "/contact", "/privacy", "/terms",
  ];
  return [
    ...routes.map((r) => ({ url: `${BASE}${r}`, lastModified: new Date() })),
    ...PROGRAMS.map((p) => ({ url: `${BASE}/programs/${p.slug}`, lastModified: new Date() })),
    ...PRODUCTS.map((p) => ({ url: `${BASE}/products/${p.slug}`, lastModified: new Date() })),
    ...POSTS.map((p) => ({ url: `${BASE}/journal/${p.slug}`, lastModified: new Date(p.date) })),
  ];
}
