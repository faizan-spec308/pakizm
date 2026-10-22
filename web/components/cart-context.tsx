"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

export type CartItem = {
  ref: string;
  productId: string;
  categorySlug: string;
  name: string;
  spec: string;
  price: number;
  qty: number;
};

type CartCtx = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  setQty: (ref: string, qty: number) => void;
  remove: (ref: string) => void;
  clear: () => void;
  ready: boolean;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "pakizm-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items, ready]);

  const add = useCallback((item: Omit<CartItem, "qty">, qty = 1) => {
    setItems((cur) => {
      const i = cur.findIndex((c) => c.ref === item.ref);
      if (i >= 0) {
        const next = [...cur];
        next[i] = { ...next[i], qty: next[i].qty + qty };
        return next;
      }
      return [...cur, { ...item, qty }];
    });
  }, []);

  const setQty = useCallback((ref: string, qty: number) => {
    setItems((cur) =>
      qty <= 0 ? cur.filter((c) => c.ref !== ref) : cur.map((c) => (c.ref === ref ? { ...c, qty } : c)),
    );
  }, []);

  const remove = useCallback((ref: string) => setItems((cur) => cur.filter((c) => c.ref !== ref)), []);
  const clear = useCallback(() => setItems([]), []);

  const count = items.reduce((n, c) => n + c.qty, 0);
  const subtotal = items.reduce((n, c) => n + c.qty * c.price, 0);

  return (
    <Ctx.Provider value={{ items, count, subtotal, add, setQty, remove, clear, ready }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
}

export function usd(n: number) {
  return "$" + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
