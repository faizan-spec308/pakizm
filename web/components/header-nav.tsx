"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { List, X, MagnifyingGlass, CaretDown } from "@phosphor-icons/react";

type Cat = { name: string; slug: string; count: number };

export default function HeaderNav({ categories }: { categories: Cat[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileCats, setMobileCats] = useState(false);
  const [q, setQ] = useState("");
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(q.trim() ? `/products?q=${encodeURIComponent(q.trim())}` : "/products");
    setOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-bg transition-shadow duration-300 ${
        scrolled ? "shadow-soft" : ""
      }`}
    >
      <div className="border-b border-line">
        <div className="container-c flex h-[64px] items-center gap-6">
          {/* wordmark (premium logo to be supplied) */}
          <Link href="/" className="shrink-0" aria-label="Pakizm home">
            <span className="font-display text-[1.4rem] font-semibold uppercase tracking-[0.02em]">
              Pakizm
            </span>
          </Link>

          {/* desktop nav */}
          <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
            <div
              className="relative"
              onMouseEnter={() => setMega(true)}
              onMouseLeave={() => setMega(false)}
            >
              <Link
                href="/products"
                className="flex items-center gap-1 py-5 text-[0.86rem] font-semibold uppercase tracking-wide text-ink"
              >
                Products
                <CaretDown
                  size={12}
                  weight="bold"
                  className={`transition-transform duration-300 ${mega ? "rotate-180" : ""}`}
                />
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
                className="text-[0.86rem] font-semibold uppercase tracking-wide text-ink-2 transition-colors hover:text-ink"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* right */}
          <div className="ml-auto flex items-center gap-3">
            <form onSubmit={submit} className="relative hidden lg:block">
              <MagnifyingGlass
                size={16}
                weight="bold"
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search instruments…"
                aria-label="Search"
                className="w-[210px] rounded-btn border border-line bg-surface-2 py-2 pl-9 pr-3 text-[0.86rem] transition-all focus:w-[250px] focus:bg-surface"
              />
            </form>
            <Link href="/contact" className="btn btn-primary hidden sm:inline-flex">
              Request a Quote
            </Link>
            <button
              className="-mr-1 flex h-10 w-10 items-center justify-center md:hidden"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <List size={24} weight="regular" />
            </button>
          </div>
        </div>
      </div>

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
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="container-c py-8">
              <div className="mb-5 flex items-baseline justify-between">
                <span className="eyebrow">All categories</span>
                <Link href="/products" className="text-[0.82rem] font-semibold text-accent hover:underline">
                  View all products →
                </Link>
              </div>
              <div className="grid grid-cols-4 gap-x-6 gap-y-1">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/products/${c.slug}`}
                    className="group flex items-center justify-between rounded-md px-3 py-2 text-[0.9rem] transition-colors hover:bg-surface-2"
                    onClick={() => setMega(false)}
                  >
                    <span className="font-medium text-ink-2 group-hover:text-ink">{c.name}</span>
                    <span className="ref text-[0.72rem] text-muted">{c.count}</span>
                  </Link>
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
            <div className="container-c flex h-[64px] items-center justify-between border-b border-line">
              <span className="font-display text-[1.4rem] font-semibold uppercase tracking-[0.02em]">Pakizm</span>
              <button
                className="-mr-1 flex h-10 w-10 items-center justify-center"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X size={24} weight="regular" />
              </button>
            </div>
            <div className="container-c py-6">
              <form onSubmit={submit} className="relative mb-6">
                <MagnifyingGlass size={17} weight="bold" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search instruments…"
                  aria-label="Search"
                  className="w-full rounded-btn border border-line bg-surface-2 py-3 pl-10 pr-3 text-[0.95rem]"
                />
              </form>
              <nav className="flex flex-col" aria-label="Mobile">
                <button
                  onClick={() => setMobileCats((v) => !v)}
                  className="flex items-center justify-between border-b border-line py-4 text-left font-display text-[1.1rem] font-bold uppercase tracking-wide"
                >
                  Products
                  <CaretDown size={16} weight="bold" className={`transition-transform ${mobileCats ? "rotate-180" : ""}`} />
                </button>
                {mobileCats && (
                  <div className="grid grid-cols-2 gap-x-4 border-b border-line py-3">
                    {categories.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/products/${c.slug}`}
                        onClick={() => setOpen(false)}
                        className="py-2 text-[0.9rem] text-ink-2"
                      >
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
                  <Link
                    key={n.href}
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-line py-4 font-display text-[1.1rem] font-bold uppercase tracking-wide"
                  >
                    {n.label}
                  </Link>
                ))}
              </nav>
              <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-primary mt-7 w-full">
                Request a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
