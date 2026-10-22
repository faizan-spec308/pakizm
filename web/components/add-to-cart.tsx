"use client";

import Link from "next/link";
import { useState } from "react";
import { Minus, Plus, Check } from "@phosphor-icons/react";
import { useCart, usd } from "./cart-context";
import type { Variant } from "@/lib/catalog";

export default function AddToCart({
  productId,
  name,
  categorySlug,
  variants,
}: {
  productId: string;
  name: string;
  categorySlug: string;
  variants: Variant[];
}) {
  const { add } = useCart();
  const [idx, setIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const v = variants[idx];

  const onAdd = () => {
    add(
      { ref: v.ref, productId, categorySlug, name, spec: v.spec, price: v.price },
      qty,
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div className="mt-8 rounded-card border border-line bg-surface-2 p-6">
      <div className="flex items-baseline justify-between gap-3">
        <div className="ref font-display text-[1.9rem] font-medium tracking-tight">
          {usd(v.price * qty)}
        </div>
        <span className="rounded bg-surface px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wide text-muted">
          Placeholder price
        </span>
      </div>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end">
        <label className="flex-1">
          <span className="mb-1.5 block text-[0.72rem] font-medium uppercase tracking-[0.1em] text-muted">
            Size / reference
          </span>
          <select
            value={idx}
            onChange={(e) => setIdx(Number(e.target.value))}
            className="w-full rounded-btn border border-line bg-surface px-3 py-2.5 text-[0.9rem]"
          >
            {variants.map((vv, i) => (
              <option key={vv.ref + i} value={i}>
                {vv.ref}
                {vv.spec ? ` — ${vv.spec}` : ""} · {usd(vv.price)}
              </option>
            ))}
          </select>
        </label>

        <div>
          <span className="mb-1.5 block text-[0.72rem] font-medium uppercase tracking-[0.1em] text-muted">
            Qty
          </span>
          <div className="flex items-center rounded-btn border border-line bg-surface">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
              className="flex h-[42px] w-10 items-center justify-center text-ink-2 hover:text-ink"
            >
              <Minus size={14} weight="bold" />
            </button>
            <span className="ref w-8 text-center text-[0.95rem]">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              aria-label="Increase quantity"
              className="flex h-[42px] w-10 items-center justify-center text-ink-2 hover:text-ink"
            >
              <Plus size={14} weight="bold" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button onClick={onAdd} className="btn btn-dark btn-lg flex-1">
          {added ? (
            <>
              <Check size={16} weight="bold" /> Added to cart
            </>
          ) : (
            "Add to cart"
          )}
        </button>
        <Link href="/cart" className="btn btn-ghost btn-lg">
          View cart
        </Link>
      </div>
      <p className="mt-4 text-[0.78rem] text-muted">
        Or{" "}
        <Link href={`/contact?ref=${encodeURIComponent(v.ref)}`} className="font-medium text-ink underline">
          request a quote
        </Link>{" "}
        for bulk / OEM pricing.
      </p>
    </div>
  );
}
