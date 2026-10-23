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
  initialQuery = "",
}: {
  initialCategory?: string;
  initialQuery?: string;
}) {
  const [all, setAll] = useState<Slim[] | null>(null);
  const [cats, setCats] = useState<CatMeta[]>([]);
  const [q, setQ] = useState(initialQuery);
  const [cat, setCat] = useState(initialCategory);
  const [sort, setSort] = useState("featured");
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
    const list = all.filter((p) => {
      if (cat && p.categorySlug !== cat) return false;
      if (!needle) return true;
      return (
        p.name.toLowerCase().includes(needle) ||
        p.description.toLowerCase().includes(needle) ||
        p.subcategory.toLowerCase().includes(needle) ||
        p.refs.some((r) => r.toLowerCase().includes(needle))
      );
    });
    if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "ref") list.sort((a, b) => a.primaryRef.localeCompare(b.primaryRef));
    return list;
  }, [all, q, cat, sort]);

  useEffect(() => setLimit(PAGE), [q, cat, sort]);
  const shown = filtered.slice(0, limit);

  return (
    <div>
      <div className="sticky top-[66px] z-30 -mx-4 border-b border-line bg-bg/90 px-4 py-4 backdrop-blur-xl sm:-mx-[26px] sm:px-[26px]">
        <div className="flex flex-col gap-3.5">
          <div className="relative">
            <MagnifyingGlass size={17} weight="regular" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
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
              All
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
          <div className="py-24 text-center">
            <p className="text-muted">No products match your search.</p>
            <button onClick={() => { setQ(""); setCat(""); }} className="btn btn-ghost mt-5">
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-end gap-4">
              <label className="flex items-center gap-2 text-[0.82rem] text-muted">
                <span className="hidden sm:inline">Sort</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="rounded-btn border border-line bg-surface px-3 py-1.5 text-[0.82rem] text-ink transition-colors focus:border-line-2"
                >
                  <option value="featured">Featured</option>
                  <option value="name">Name A–Z</option>
                  <option value="ref">Reference</option>
                </select>
              </label>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
              {shown.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            {shown.length < filtered.length && (
              <div className="mt-14 flex justify-center">
                <button onClick={() => setLimit((l) => l + PAGE)} className="btn btn-ghost">
                  Show more
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-[0.8rem] font-medium transition-all duration-400 ease-premium ${
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
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i}>
          <div className="aspect-square animate-pulse rounded-card border border-line bg-surface-2" />
          <div className="space-y-2 pt-3">
            <div className="h-4 w-4/5 animate-pulse rounded bg-surface-2" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-surface-2" />
          </div>
        </div>
      ))}
    </div>
  );
}
