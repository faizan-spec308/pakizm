import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCatalog, getProduct, getRelated } from "@/lib/catalog";
import ProductImage from "@/components/product-image";
import ProductCard from "@/components/product-card";

export function generateStaticParams() {
  return getCatalog().products.map((p) => ({
    category: p.categorySlug,
    id: p.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const p = getProduct(id);
  if (!p) return { title: "Product" };
  return {
    title: `${p.name} (${p.primaryRef})`,
    description: `${p.name} — ${p.description || p.subcategory}. ${p.variants.length} reference sizes. Surgical stainless steel, from Pakizm.`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const p = getProduct(id);
  if (!p) notFound();
  const related = getRelated(p);

  return (
    <div className="container-c py-12">
      <nav className="mb-8 text-[0.85rem] text-muted" aria-label="Breadcrumb">
        <Link href="/products" className="hover:text-accent">Products</Link>
        <span className="mx-2">/</span>
        <Link href={`/products/${p.categorySlug}`} className="hover:text-accent">
          {p.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{p.name}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        {/* image */}
        <div className="md:sticky md:top-24 md:self-start">
          <div className="aspect-square overflow-hidden rounded-2xl border border-line bg-surface">
            <ProductImage
              ref_={p.primaryRef}
              alt={p.name}
              className="h-full w-full object-contain p-8"
            />
          </div>
        </div>

        {/* details */}
        <div>
          <p className="eyebrow">{p.subcategory}</p>
          <h1 className="mt-2 text-[2rem] font-semibold leading-tight tracking-[-0.02em]">
            {p.name}
          </h1>
          {p.description && (
            <p className="mt-3 text-[1.02rem] text-muted">{p.description}</p>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.88rem] text-muted">
            <span>
              Reference <span className="ref text-ink">{p.primaryRef}</span>
            </span>
            <span>
              {p.variants.length}{" "}
              {p.variants.length === 1 ? "reference size" : "reference sizes"}
            </span>
          </div>

          {/* variants table */}
          <div className="mt-8 overflow-hidden rounded-xl border border-line">
            <table className="w-full text-[0.9rem]">
              <thead>
                <tr className="border-b border-line bg-surface-2 text-left text-[0.75rem] uppercase tracking-wide text-muted">
                  <th className="px-4 py-2.5 font-medium">Reference</th>
                  <th className="px-4 py-2.5 font-medium">Size / specification</th>
                </tr>
              </thead>
              <tbody>
                {p.variants.map((v, i) => (
                  <tr key={v.ref + i} className="border-b border-line last:border-0">
                    <td className="ref px-4 py-2.5 text-ink">{v.ref}</td>
                    <td className="px-4 py-2.5 text-muted">{v.spec || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 rounded-xl border border-line bg-accent-soft p-5">
            <p className="text-[0.95rem] font-medium">Request pricing for this instrument</p>
            <p className="mt-1 text-[0.86rem] text-muted">
              Available in surgical stainless steel with OEM / custom marking.
            </p>
            <Link
              href={`/contact?ref=${encodeURIComponent(p.primaryRef)}`}
              className="focus-ring mt-4 inline-block rounded-full bg-accent px-6 py-2.5 text-[0.9rem] font-medium text-accent-ink transition-opacity hover:opacity-90"
            >
              Request a quote
            </Link>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20 border-t border-line pt-12">
          <h2 className="mb-6 text-[1.2rem] font-semibold tracking-[-0.01em]">
            Related in {p.subcategory}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((r) => (
              <ProductCard key={r.id} product={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
