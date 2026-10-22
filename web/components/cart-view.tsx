"use client";

import Link from "next/link";
import { useState } from "react";
import { Minus, Plus, Trash, ArrowRight } from "@phosphor-icons/react";
import { useCart, usd } from "./cart-context";
import ProductImage from "./product-image";

export default function CartView() {
  const { items, subtotal, setQty, remove, clear, ready } = useCart();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  if (!ready) {
    return <div className="py-24 text-center text-muted">Loading your cart…</div>;
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-6 py-24 text-center">
        <p className="display text-[1.8rem]">Your cart is empty</p>
        <p className="max-w-[40ch] text-muted">
          Browse the catalog and add instruments to start an order.
        </p>
        <Link href="/products" className="btn btn-dark btn-lg">
          Shop the catalog
          <ArrowRight size={15} weight="bold" />
        </Link>
      </div>
    );
  }

  const checkout = async () => {
    setLoading(true);
    setErr("");
    try {
      const r = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const d = await r.json();
      if (d.url) window.location.href = d.url;
      else setErr(d.error || "Checkout is not configured yet.");
    } catch {
      setErr("Could not start checkout. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="grid gap-12 lg:grid-cols-[1.6fr_0.9fr]">
      <div>
        <div className="flex items-center justify-between border-b border-line pb-4">
          <span className="text-[0.85rem] text-muted">
            <span className="ref text-ink">{items.length}</span> item{items.length === 1 ? "" : "s"}
          </span>
          <button onClick={clear} className="text-[0.82rem] text-muted underline hover:text-ink">
            Clear cart
          </button>
        </div>
        <ul>
          {items.map((it) => (
            <li key={it.ref} className="flex gap-4 border-b border-line py-5">
              <Link
                href={`/products/${it.categorySlug}/${it.productId}`}
                className="h-24 w-24 shrink-0 overflow-hidden rounded-card border border-line product-surface"
              >
                <ProductImage ref_={it.ref} alt={it.name} className="h-full w-full object-contain p-2" showRef={false} />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <Link href={`/products/${it.categorySlug}/${it.productId}`} className="font-semibold leading-snug tracking-tight hover:text-accent">
                  {it.name}
                </Link>
                <span className="ref mt-0.5 text-[0.78rem] text-muted">
                  {it.ref}{it.spec ? ` · ${it.spec}` : ""}
                </span>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="flex items-center rounded-btn border border-line">
                    <button onClick={() => setQty(it.ref, it.qty - 1)} aria-label="Decrease" className="flex h-9 w-9 items-center justify-center text-ink-2 hover:text-ink">
                      <Minus size={13} weight="bold" />
                    </button>
                    <span className="ref w-7 text-center text-[0.9rem]">{it.qty}</span>
                    <button onClick={() => setQty(it.ref, it.qty + 1)} aria-label="Increase" className="flex h-9 w-9 items-center justify-center text-ink-2 hover:text-ink">
                      <Plus size={13} weight="bold" />
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="ref font-semibold">{usd(it.price * it.qty)}</span>
                    <button onClick={() => remove(it.ref)} aria-label="Remove" className="text-muted hover:text-ink">
                      <Trash size={17} weight="regular" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <Link href="/products" className="mt-6 inline-flex items-center gap-2 text-[0.85rem] font-semibold uppercase tracking-wide text-ink">
          ← Continue shopping
        </Link>
      </div>

      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-card border border-line bg-surface-2 p-6">
          <h2 className="heading-upper text-[1.3rem]">Summary</h2>
          <div className="mt-5 flex items-center justify-between border-b border-line pb-4 text-[0.92rem]">
            <span className="text-muted">Subtotal</span>
            <span className="ref font-semibold">{usd(subtotal)}</span>
          </div>
          <p className="mt-4 text-[0.8rem] leading-relaxed text-muted">
            Shipping and taxes are calculated at checkout. Prices are placeholders
            pending final pricing.
          </p>
          <button onClick={checkout} disabled={loading} className="btn btn-dark btn-lg mt-6 w-full disabled:opacity-60">
            {loading ? "Starting checkout…" : "Proceed to checkout"}
            {!loading && <ArrowRight size={15} weight="bold" />}
          </button>
          {err && <p className="mt-3 text-[0.82rem] text-ink-2">{err}</p>}
          <p className="mt-4 text-center text-[0.76rem] text-muted">Secure checkout via Stripe</p>
        </div>
      </aside>
    </div>
  );
}
