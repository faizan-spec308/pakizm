"use client";

import { useEffect, useMemo, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
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
      <div className="sticky top-[74px] z-30 -mx-7 border-b border-line bg-bg/90 px-7 py-4 backdrop-blur-xl">
        <div className="flex flex-col gap-3.5">
          <div className="relative">
            <MagnifyingGlass
              size={17}
              weight="light"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search instruments, reference numbers, sizes…"
              aria-label="Search products"
              className="w-full rounded-btn border border-line bg-surface py-3 pl-11 pr-4 text-[0.95rem] transition-colors focus:border-line-2"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            <Chip active={cat === ""} onClick={() => setCat("")}>
              All{all ? ` · ${all.length}` : ""}
            </Chip>
            {cats.map((c) => (
              <Chip key={c.slug} active={cat === c.slug} onClick={() => setCat(c.slug)}>
                {c.name}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      <div className="py-8">
        {all === null ? (
          <SkeletonGrid />
        ) : filtered.length === 0 ? (
          <p className="py-24 text-center text-muted">No products match your search.</p>
        ) : (
          <>
            <p className="mb-6 text-[0.85rem] text-muted">
              <span className="ref text-ink">{filtered.length.toLocaleString()}</span>{" "}
              products{cat ? ` in ${cats.find((c) => c.slug === cat)?.name}` : ""}
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {shown.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            {shown.length < filtered.length && (
              <div className="mt-12 flex justify-center">
                <button onClick={() => setLimit((l) => l + PAGE)} className="btn btn-ghost">
                  Show more · {filtered.length - shown.length} remaining
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
      className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-[0.82rem] transition-all duration-400 ease-premium ${
        active
          ? "border-ink bg-ink text-bg"
          : "border-line bg-surface text-ink-2 hover:border-line-2 hover:text-ink"
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
        <div key={i} className="overflow-hidden rounded-card border border-line bg-surface">
          <div className="aspect-square animate-pulse bg-surface-2" />
          <div className="space-y-2 border-t border-line p-4">
            <div className="h-3 w-1/2 animate-pulse rounded bg-surface-2" />
            <div className="h-4 w-4/5 animate-pulse rounded bg-surface-2" />
          </div>
        </div>
      ))}
    </div>
  );
}
