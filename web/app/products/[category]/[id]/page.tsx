import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCatalog, getProduct, getRelated } from "@/lib/catalog";
import ProductImage from "@/components/product-image";
import ProductCard from "@/components/product-card";
import AddToCart from "@/components/add-to-cart";

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
      <nav className="mb-10 flex flex-wrap items-center gap-2 text-[0.84rem] text-muted" aria-label="Breadcrumb">
        <Link href="/products" className="transition-colors hover:text-accent">Products</Link>
        <span>/</span>
        <Link href={`/products/${p.categorySlug}`} className="transition-colors hover:text-accent">
          {p.category}
        </Link>
        <span>/</span>
        <span className="line-clamp-1 max-w-[55vw] text-ink-2 sm:max-w-none">{p.name}</span>
      </nav>

      <div className="grid gap-12 md:grid-cols-2">
        {/* image — double-bezel */}
        <div className="md:sticky md:top-28 md:self-start">
          <div className="group aspect-square overflow-hidden rounded-card border border-line product-surface">
            <ProductImage
              ref_={p.primaryRef}
              alt={p.name}
              className="h-full w-full object-contain p-8 transition-transform duration-700 ease-premium group-hover:scale-105 sm:p-12"
              showRef={false}
            />
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-line bg-line text-[0.82rem]">
            {[
              ["Material", "Surgical stainless steel"],
              ["Finish", "To order"],
              ["Marking", "OEM / custom"],
              ["Guarantee", "Lifetime"],
            ].map(([k, v]) => (
              <div key={k} className="bg-surface px-4 py-3">
                <dt className="text-muted">{k}</dt>
                <dd className="mt-0.5 font-medium text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* details */}
        <div>
          <span className="eyebrow">{p.subcategory}</span>
          <h1 className="display mt-4 text-[2.3rem] leading-[1.08] sm:text-[2.8rem]">
            {p.name}
          </h1>
          {p.description && (
            <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-2">
              {p.description}
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-2 text-[0.88rem] text-muted">
            <span>
              Reference <span className="ref text-ink">{p.primaryRef}</span>
            </span>
            <span>
              <span className="ref text-ink">{p.variants.length}</span>{" "}
              {p.variants.length === 1 ? "reference size" : "reference sizes"}
            </span>
          </div>

          <AddToCart
            productId={p.id}
            name={p.name}
            categorySlug={p.categorySlug}
            variants={p.variants}
          />

          {/* full reference list */}
          <div className="mt-8 max-h-[480px] overflow-y-auto rounded-card border border-line">
            <table className="w-full text-[0.9rem]">
              <thead className="sticky top-0 z-10">
                <tr className="border-b border-line bg-surface-2 text-left text-[0.68rem] uppercase tracking-[0.1em] text-muted">
                  <th className="px-5 py-3 font-medium">Reference</th>
                  <th className="px-5 py-3 font-medium">Size / specification</th>
                  <th className="px-5 py-3 text-right font-medium">Price</th>
                </tr>
              </thead>
              <tbody>
                {p.variants.map((v, i) => (
                  <tr
                    key={v.ref + i}
                    className="border-b border-line transition-colors last:border-0 hover:bg-surface-2"
                  >
                    <td className="ref whitespace-nowrap px-5 py-3 text-ink">{v.ref}</td>
                    <td className="px-5 py-3 text-ink-2">{v.spec || "—"}</td>
                    <td className="price whitespace-nowrap px-5 py-3 text-right font-medium text-ink">
                      ${v.price.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24 border-t border-line pt-14">
          <h2 className="display mb-8 text-[1.6rem] sm:text-[2rem]">
            Related in {p.subcategory}
          </h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((r) => (
              <ProductCard key={r.id} product={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
