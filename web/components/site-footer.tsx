import Link from "next/link";
import { Truck, Certificate, Wrench } from "@phosphor-icons/react/dist/ssr";
import { getCategories } from "@/lib/catalog";

export default function SiteFooter() {
  const cats = getCategories().slice(0, 8);
  return (
    <footer className="border-t border-line bg-surface">
      {/* trust strip */}
      <div className="border-b border-line">
        <div className="container-c grid gap-6 py-8 sm:grid-cols-3">
          {[
            { icon: Truck, t: "Worldwide export", s: "Shipping to distributors globally" },
            { icon: Certificate, t: "Lifetime guarantee", s: "Against manufacturing defects" },
            { icon: Wrench, t: "OEM & custom", s: "Private-label manufacturing" },
          ].map((f) => (
            <div key={f.t} className="flex items-center gap-3">
              <f.icon size={24} weight="regular" className="shrink-0 text-accent" />
              <div>
                <div className="text-[0.92rem] font-semibold tracking-tight">{f.t}</div>
                <div className="text-[0.8rem] text-muted">{f.s}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container-c grid gap-12 py-14 md:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <div className="font-display text-[1.6rem] font-semibold uppercase tracking-[0.02em]">Pakizm</div>
          <p className="mt-4 max-w-[36ch] leading-relaxed text-muted">
            Manufacturer of precision orthopedic, dental and general surgery
            instruments in surgical stainless steel. Worldwide since 2005.
          </p>
        </div>
        <div>
          <div className="mb-4 text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-ink">Catalog</div>
          <ul className="flex flex-col gap-2.5 text-[0.9rem] text-ink-2">
            {cats.map((c) => (
              <li key={c.slug}>
                <Link href={`/products/${c.slug}`} className="transition-colors hover:text-accent">{c.name}</Link>
              </li>
            ))}
            <li><Link href="/products" className="font-medium text-ink transition-colors hover:text-accent">View all →</Link></li>
          </ul>
        </div>
        <div>
          <div className="mb-4 text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-ink">Company</div>
          <ul className="flex flex-col gap-2.5 text-[0.9rem] text-ink-2">
            <li><Link href="/about" className="transition-colors hover:text-accent">About</Link></li>
            <li><Link href="/capabilities" className="transition-colors hover:text-accent">Capabilities & OEM</Link></li>
            <li><Link href="/contact" className="transition-colors hover:text-accent">Contact</Link></li>
            <li><Link href="/contact" className="transition-colors hover:text-accent">Request a Quote</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-c flex flex-col gap-2 py-6 text-[0.8rem] text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Pakizm. All rights reserved.</span>
          <span>Pakistan · Worldwide export</span>
        </div>
      </div>
    </footer>
  );
}
