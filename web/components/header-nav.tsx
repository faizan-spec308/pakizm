"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  List,
  X,
  MagnifyingGlass,
  Heart,
  User,
  Handbag,
  CaretDown,
} from "@phosphor-icons/react";
import { useCart } from "./cart-context";

type Cat = { name: string; slug: string; count: number };
const EASE = [0.16, 1, 0.3, 1] as const;

export default function HeaderNav({ categories }: { categories: Cat[] }) {
  const [mega, setMega] = useState(false);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [mobileCats, setMobileCats] = useState(false);
  const [q, setQ] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { count } = useCart();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (search) setTimeout(() => inputRef.current?.focus(), 60);
  }, [search]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(q.trim() ? `/products?q=${encodeURIComponent(q.trim())}` : "/products");
    setSearch(false);
    setOpen(false);
  };

  const ICONS = [
    { icon: MagnifyingGlass, label: "Search", onClick: () => setSearch((s) => !s) },
    { icon: Heart, label: "Wishlist", href: "/products" },
    { icon: User, label: "Account", href: "/contact" },
    { icon: Handbag, label: "Cart", href: "/cart", badge: count },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg">
      <div className="container-c relative flex h-[66px] items-center">
        {/* left: desktop nav / mobile hamburger */}
        <div className="flex items-center">
          <button
            className="-ml-1 flex h-10 w-10 items-center justify-center md:hidden"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <List size={23} weight="regular" />
          </button>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
            <div
              className="relative"
              onMouseEnter={() => setMega(true)}
              onMouseLeave={() => setMega(false)}
            >
              <Link
                href="/products"
                className="flex items-center gap-1 py-5 text-[0.82rem] font-bold uppercase tracking-[0.04em] text-ink"
              >
                Products
                <CaretDown size={11} weight="bold" className={`transition-transform duration-300 ${mega ? "rotate-180" : ""}`} />
              </Link>
            </div>
            {[
              { href: "/capabilities", label: "Capabilities" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
            ].map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="link-underline text-[0.82rem] font-bold uppercase tracking-[0.04em] text-ink-2 transition-colors hover:text-ink"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* center: wordmark */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 font-display text-[1.45rem] font-semibold uppercase tracking-[0.02em]"
          aria-label="Pakizm home"
        >
          Pakizm
        </Link>

        {/* right: icon cluster */}
        <div className="ml-auto flex items-center gap-1.5 sm:gap-3">
          {ICONS.map((it) =>
            it.href ? (
              <Link
                key={it.label}
                href={it.href}
                aria-label={it.badge ? `${it.label} (${it.badge})` : it.label}
                className="relative flex h-10 w-10 items-center justify-center text-ink transition-transform duration-300 hover:-translate-y-0.5"
              >
                <it.icon size={21} weight="regular" />
                {!!it.badge && it.badge > 0 && (
                  <span className="absolute right-0.5 top-0.5 flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-ink px-1 text-[0.6rem] font-bold text-bg">
                    {it.badge > 99 ? "99+" : it.badge}
                  </span>
                )}
              </Link>
            ) : (
              <button
                key={it.label}
                aria-label={it.label}
                onClick={it.onClick}
                className="flex h-10 w-10 items-center justify-center text-ink transition-transform duration-300 hover:-translate-y-0.5"
              >
                <it.icon size={21} weight="regular" />
              </button>
            ),
          )}
        </div>
      </div>

      {/* search drawer */}
      <AnimatePresence>
        {search && (
          <motion.div
            className="absolute inset-x-0 top-full border-b border-line bg-bg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <form onSubmit={submit} className="container-c flex items-center gap-3 py-5">
              <MagnifyingGlass size={22} weight="regular" className="text-muted" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search instruments, reference numbers, sizes…"
                aria-label="Search"
                className="flex-1 bg-transparent text-[1.05rem] outline-none placeholder:text-muted"
              />
              <button type="button" aria-label="Close search" onClick={() => setSearch(false)}>
                <X size={22} weight="regular" className="text-muted hover:text-ink" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* mega-menu */}
      <AnimatePresence>
        {mega && (
          <motion.div
            className="absolute inset-x-0 top-full hidden border-b border-line bg-bg shadow-soft md:block"
            onMouseEnter={() => setMega(true)}
            onMouseLeave={() => setMega(false)}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: EASE }}
          >
            <div className="container-c py-8">
              <div className="mb-5 flex items-baseline justify-between">
                <span className="eyebrow">All categories</span>
                <Link href="/products" className="link-underline text-[0.8rem] font-bold uppercase tracking-wide">
                  View all
                </Link>
              </div>
              <div className="grid grid-cols-4 gap-x-6 gap-y-1">
                {categories.map((c, i) => (
                  <motion.div
                    key={c.slug}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.02 + i * 0.012, duration: 0.3, ease: EASE }}
                  >
                    <Link
                      href={`/products/${c.slug}`}
                      className="group block rounded-sm px-3 py-2 text-[0.9rem] font-medium text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
                      onClick={() => setMega(false)}
                    >
                      {c.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] overflow-y-auto bg-bg md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="container-c flex h-[66px] items-center justify-between border-b border-line">
              <span className="font-display text-[1.45rem] font-semibold uppercase tracking-[0.02em]">Pakizm</span>
              <button className="-mr-1 flex h-10 w-10 items-center justify-center" aria-label="Close menu" onClick={() => setOpen(false)}>
                <X size={24} weight="regular" />
              </button>
            </div>
            <div className="container-c py-6">
              <form onSubmit={submit} className="mb-6 flex items-center gap-3 border-b border-line pb-4">
                <MagnifyingGlass size={20} weight="regular" className="text-muted" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search instruments…"
                  aria-label="Search"
                  className="flex-1 bg-transparent text-[1rem] outline-none placeholder:text-muted"
                />
              </form>
              <nav className="flex flex-col" aria-label="Mobile">
                <button
                  onClick={() => setMobileCats((v) => !v)}
                  className="flex items-center justify-between border-b border-line py-4 text-left font-display text-[1.15rem] font-semibold uppercase tracking-wide"
                >
                  Products
                  <CaretDown size={16} weight="bold" className={`transition-transform ${mobileCats ? "rotate-180" : ""}`} />
                </button>
                {mobileCats && (
                  <div className="grid grid-cols-2 gap-x-4 border-b border-line py-3">
                    {categories.map((c) => (
                      <Link key={c.slug} href={`/products/${c.slug}`} onClick={() => setOpen(false)} className="py-2 text-[0.9rem] text-ink-2">
                        {c.name}
                      </Link>
                    ))}
                  </div>
                )}
                {[
                  { href: "/capabilities", label: "Capabilities" },
                  { href: "/about", label: "About" },
                  { href: "/contact", label: "Contact" },
                ].map((n) => (
                  <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="border-b border-line py-4 font-display text-[1.15rem] font-semibold uppercase tracking-wide">
                    {n.label}
                  </Link>
                ))}
              </nav>
              <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-dark mt-7 w-full">
                Request a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
