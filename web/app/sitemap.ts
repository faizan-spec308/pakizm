import type { MetadataRoute } from "next";
import { getCatalog } from "@/lib/catalog";
import { policies } from "@/lib/legal";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const { categories, products } = getCatalog();
  const urls: MetadataRoute.Sitemap = [];

  const staticPaths: [string, number][] = [
    ["", 1],
    ["/products", 0.8],
    ["/about", 0.6],
    ["/capabilities", 0.6],
    ["/contact", 0.6],
    ["/faq", 0.5],
    ["/cart", 0.3],
  ];
  for (const [path, priority] of staticPaths) {
    urls.push({ url: `${SITE_URL}${path}`, lastModified: now, priority });
  }
  for (const c of categories) {
    urls.push({ url: `${SITE_URL}/products/${c.slug}`, lastModified: now, priority: 0.6 });
  }
  for (const p of products) {
    urls.push({
      url: `${SITE_URL}/products/${p.categorySlug}/${p.id}`,
      lastModified: now,
      priority: 0.5,
    });
  }
  for (const pol of policies) {
    urls.push({ url: `${SITE_URL}/legal/${pol.slug}`, lastModified: now, priority: 0.3 });
  }
  return urls;
}
