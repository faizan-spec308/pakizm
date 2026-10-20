"use client";

import { useEffect, useMemo, useState } from "react";
import ProductCard from "./product-card";

type Slim = {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  subcategory: string;
  subcategorySlug: string;
  primaryRef: string;
  refs: string[];
  image: string;
  description: string;
  n: number;
};
type CatMeta = { name: string; slug: string; count: number };

const PAGE = 48;

export default function ProductsBrowser({
  initialCategory = "",
}: {
  initialCategory?: string;
}) {
  const [all, setAll] = useState<Slim[] | null>(null);
  const [cats, setCats] = useState<CatMeta[]>([]);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState(initialCategory);
  const [limit, setLimit] = useState(PAGE);

  useEffect(() => {
    fetch("/data/catalog.slim.json")
      .then((r) => r.json())
      .then((d) => {
        setAll(d.products);
        setCats(d.categories);
      })
      .catch(() => setAll([]));
  }, []);

  const filtered = useMemo(() => {
    if (!all) return [];
    const needle = q.trim().toLowerCase();
    return all.filter((p) => {
      if (cat && p.categorySlug !== cat) return false;
      if (!needle) return true;
      return (
        p.name.toLowerCase().includes(needle) ||
        p.description.toLowerCase().includes(needle) ||
        p.subcategory.toLowerCase().includes(needle) ||
        p.refs.some((r) => r.toLowerCase().includes(needle))
      );
    });
  }, [all, q, cat]);

  useEffect(() => setLimit(PAGE), [q, cat]);

  const shown = filtered.slice(0, limit);

  return (
    <div>
      <div className="sticky top-[68px] z-30 -mx-5 border-b border-line bg-bg px-5 py-3">
        <div className="flex flex-col gap-3">
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search instruments, reference numbers, sizes…"
            aria-label="Search products"
            className="focus-ring w-full rounded-lg border border-line bg-surface px-4 py-2.5 text-[0.95rem]"
          />
          <div className="flex gap-2 overflow-x-auto pb-1">
            <Chip active={cat === ""} onClick={() => setCat("")}>
              All{all ? ` (${all.length})` : ""}
            </Chip>
            {cats.map((c) => (
              <Chip key={c.slug} active={cat === c.slug} onClick={() => setCat(c.slug)}>
                {c.name} ({c.count})
              </Chip>
            ))}
          </div>
        </div>
      </div>

      <div className="py-6">
        {all === null ? (
          <SkeletonGrid />
        ) : filtered.length === 0 ? (
          <p className="py-20 text-center text-muted">
            No products match your search.
          </p>
        ) : (
          <>
            <p className="mb-5 text-[0.85rem] text-muted">
              {filtered.length.toLocaleString()} products
              {cat ? ` in ${cats.find((c) => c.slug === cat)?.name}` : ""}
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {shown.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            {shown.length < filtered.length && (
              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => setLimit((l) => l + PAGE)}
                  className="focus-ring rounded-full border border-line px-6 py-2.5 text-[0.9rem] font-medium transition-colors hover:border-accent hover:text-accent"
                >
                  Show more ({filtered.length - shown.length} remaining)
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`focus-ring whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[0.82rem] transition-colors ${
        active
          ? "border-accent bg-accent text-accent-ink"
          : "border-line bg-surface text-muted hover:border-accent hover:text-accent"
      }`}
    >
      {children}
    </button>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-xl border border-line bg-surface"
        >
          <div className="aspect-[4/3] animate-pulse bg-surface-2" />
          <div className="space-y-2 p-4">
            <div className="h-3 w-1/2 animate-pulse rounded bg-surface-2" />
            <div className="h-4 w-4/5 animate-pulse rounded bg-surface-2" />
          </div>
        </div>
      ))}
    </div>
  );
}
