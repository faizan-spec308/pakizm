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
    <div className="container-c py-12">
      <header className="mb-2">
        <p className="eyebrow">Catalog</p>
        <h1 className="mt-2 text-[2rem] font-semibold tracking-[-0.02em]">
          All products
        </h1>
        <p className="mt-2 max-w-[60ch] text-muted">
          {stats.products.toLocaleString()} instruments across{" "}
          {stats.categories} categories, with {stats.variants.toLocaleString()}{" "}
          reference sizes. Search by name, reference number or dimension.
        </p>
      </header>
      <ProductsBrowser />
    </div>
  );
}
