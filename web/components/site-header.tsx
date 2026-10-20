"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { List, X, ArrowUpRight } from "@phosphor-icons/react";

const NAV = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-500 ease-premium ${
        scrolled ? "border-b border-line bg-bg/85 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="container-c flex h-[74px] items-center justify-between gap-6">
        <Link href="/" className="group flex items-center gap-2.5" aria-label="Pakizm home">
          <Logo />
          <span className="text-[1.2rem] font-semibold tracking-tighter">Pakizm</span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Main">
          {NAV.map((n) => {
            const active = pathname === n.href || pathname.startsWith(n.href + "/");
            return (
              <Link
                key={n.href}
                href={n.href}
                className="group relative text-[0.92rem] text-ink-2 transition-colors hover:text-ink"
              >
                {n.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px bg-accent transition-all duration-500 ease-premium ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
          <Link href="/contact" className="btn btn-primary">
            Request a Quote
            <span className="btn-dot">
              <ArrowUpRight size={13} weight="bold" />
            </span>
          </Link>
        </nav>

        <button
          className="-mr-2 flex h-11 w-11 items-center justify-center text-ink md:hidden"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <List size={24} weight="light" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] bg-bg/95 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container-c flex h-[74px] items-center justify-between">
              <span className="text-[1.2rem] font-semibold tracking-tighter">Pakizm</span>
              <button
                className="-mr-2 flex h-11 w-11 items-center justify-center"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X size={24} weight="light" />
              </button>
            </div>
            <nav className="container-c mt-6 flex flex-col" aria-label="Mobile">
              {NAV.map((n, i) => (
                <motion.div
                  key={n.href}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-line py-5 font-serif text-[2rem] tracking-tighter"
                  >
                    {n.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + NAV.length * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="btn btn-primary mt-8 w-full justify-center"
                >
                  Request a Quote
                  <span className="btn-dot">
                    <ArrowUpRight size={13} weight="bold" />
                  </span>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Logo() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true" className="shrink-0">
      <rect width="32" height="32" rx="8" fill="var(--ink)" />
      <path
        d="M11 23 V9 h6.2 a4.4 4.4 0 0 1 0 8.8 H11"
        fill="none"
        stroke="var(--bg)"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
