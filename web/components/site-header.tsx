import { getCategories } from "@/lib/catalog";
import HeaderNav from "./header-nav";

export default function SiteHeader() {
  const categories = getCategories().map((c) => ({
    name: c.name,
    slug: c.slug,
    count: c.count,
  }));
  return <HeaderNav categories={categories} />;
}
