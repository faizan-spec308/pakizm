import Link from "next/link";
import { getCategories } from "@/lib/catalog";

export default function SiteFooter() {
  const cats = getCategories().slice(0, 8);
  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-c grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_1fr] md:py-20">
        <div>
          <div className="display text-[1.6rem]">Pakizm</div>
          <p className="mt-4 max-w-[36ch] leading-relaxed text-muted">
            Manufacturer of precision orthopedic, dental and general surgery
            instruments in surgical stainless steel. Worldwide since 2005.
          </p>
        </div>

        <div>
          <div className="eyebrow mb-4">Catalog</div>
          <ul className="flex flex-col gap-2.5 text-[0.92rem] text-ink-2">
            {cats.map((c) => (
              <li key={c.slug}>
                <Link href={`/products/${c.slug}`} className="transition-colors hover:text-accent">
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/products" className="font-medium text-ink transition-colors hover:text-accent">
                View all →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="eyebrow mb-4">Company</div>
          <ul className="flex flex-col gap-2.5 text-[0.92rem] text-ink-2">
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
