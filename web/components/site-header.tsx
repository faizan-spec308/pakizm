"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg">
      <div className="container-c flex h-[68px] items-center justify-between gap-4">
        <Link href="/" className="focus-ring flex items-center gap-2.5" aria-label="Pakizm home">
          <Logo />
          <span className="text-[1.15rem] font-semibold tracking-[-0.02em]">
            PAKIZM
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {NAV.map((n) => {
            const active = pathname === n.href || pathname.startsWith(n.href + "/");
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`focus-ring text-[0.92rem] transition-colors hover:text-accent ${
                  active ? "text-accent" : "text-ink"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="focus-ring rounded-full bg-accent px-4 py-2 text-[0.88rem] font-medium text-accent-ink transition-opacity hover:opacity-90"
          >
            Request a Quote
          </Link>
        </nav>

        <button
          className="focus-ring -mr-2 flex h-10 w-10 items-center justify-center md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 h-[2px] w-6 bg-ink transition-all ${open ? "top-1/2 rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute left-0 top-1/2 h-[2px] w-6 bg-ink transition-opacity ${open ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`absolute left-0 h-[2px] w-6 bg-ink transition-all ${open ? "top-1/2 -rotate-45" : "bottom-0"}`}
            />
          </span>
        </button>
      </div>

      {open && (
        <nav className="border-t border-line bg-surface md:hidden" aria-label="Mobile">
          <div className="container-c flex flex-col py-2">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="focus-ring border-b border-line py-3 text-[0.98rem]"
              >
                {n.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="focus-ring mt-3 rounded-full bg-accent px-4 py-2.5 text-center text-[0.92rem] font-medium text-accent-ink"
            >
              Request a Quote
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

function Logo() {
  return (
    <svg width="26" height="26" viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="7" fill="var(--accent)" />
      <path
        d="M10 23 V11 h6 a4 4 0 0 1 0 8 h-6"
        fill="none"
        stroke="var(--accent-ink)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
