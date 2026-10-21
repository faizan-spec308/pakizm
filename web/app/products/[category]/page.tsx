import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getCategories,
  getCategory,
  getProductsByCategory,
  groupBySubcategory,
} from "@/lib/catalog";
import ProductCard from "@/components/product-card";
import Reveal from "@/components/reveal";

export function generateStaticParams() {
  return getCategories().map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return { title: "Category" };
  return {
    title: cat.name,
    description: `${cat.name} — ${cat.count} orthopedic instruments from Pakizm, in surgical stainless steel.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const products = getProductsByCategory(category);
  const groups = groupBySubcategory(products);

  return (
    <div className="container-c py-12">
      <nav className="mb-6 text-[0.85rem] text-muted" aria-label="Breadcrumb">
        <Link href="/products" className="hover:text-accent">
          Products
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{cat.name}</span>
      </nav>

      <header className="mb-12 border-b border-line pb-10">
        <span className="eyebrow">Category</span>
        <h1 className="heading-upper mt-4 text-[2.6rem] sm:text-[3.4rem]">{cat.name}</h1>
        <p className="ref mt-3 text-[0.9rem] text-muted">
          {cat.count} instruments · {groups.length}{" "}
          {groups.length === 1 ? "group" : "groups"}
        </p>
      </header>

      {groups.map((g) => (
        <section key={g.subcategorySlug} className="mb-14">
          {groups.length > 1 && (
            <h2 className="mb-5 text-[1.15rem] font-semibold tracking-[-0.01em]">
              {g.subcategory}
              <span className="ref ml-2 text-[0.85rem] font-normal text-muted">
                {g.items.length}
              </span>
            </h2>
          )}
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {g.items.map((p, i) => (
              <Reveal key={p.id} delay={Math.min(i * 0.03, 0.25)}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
