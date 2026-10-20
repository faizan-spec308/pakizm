import type { Metadata } from "next";
import ProductsBrowser from "@/components/products-browser";
import { getCatalog } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse Pakizm's full range of orthopedic surgical instruments — search by name, reference number or size across 26 categories.",
};

export default function ProductsPage() {
  const { stats } = getCatalog();
  return (
    <div className="container-c py-14">
      <header className="mb-4 max-w-prose">
        <span className="eyebrow">The catalog</span>
        <h1 className="display mt-4 text-[2.6rem] sm:text-[3.2rem]">All products</h1>
        <p className="mt-4 text-[1.02rem] leading-relaxed text-ink-2">
          <span className="ref text-ink">{stats.products.toLocaleString()}</span>{" "}
          instruments across {stats.categories} categories, with{" "}
          <span className="ref text-ink">{stats.variants.toLocaleString()}</span>{" "}
          reference sizes. Search by name, reference number or dimension.
        </p>
      </header>
      <ProductsBrowser />
    </div>
  );
}
