import Link from "next/link";
import { getCategories } from "@/lib/catalog";

export default function SiteFooter() {
  const cats = getCategories().slice(0, 8);
  return (
    <footer className="mt-24 border-t border-line bg-surface">
      <div className="container-c grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="text-[1.1rem] font-semibold tracking-[-0.02em]">PAKIZM</div>
          <p className="mt-3 max-w-[38ch] text-[0.9rem] text-muted">
            Manufacturer of precision orthopedic, dental and general surgery
            instruments. Serving distributors and healthcare providers worldwide
            since 2005.
          </p>
        </div>

        <div>
          <div className="eyebrow mb-3">Catalog</div>
          <ul className="flex flex-col gap-2 text-[0.9rem] text-muted">
            {cats.map((c) => (
              <li key={c.slug}>
                <Link href={`/products/${c.slug}`} className="hover:text-accent">
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/products" className="font-medium text-ink hover:text-accent">
                View all →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="eyebrow mb-3">Company</div>
          <ul className="flex flex-col gap-2 text-[0.9rem] text-muted">
            <li><Link href="/about" className="hover:text-accent">About</Link></li>
            <li><Link href="/capabilities" className="hover:text-accent">Capabilities & OEM</Link></li>
            <li><Link href="/contact" className="hover:text-accent">Contact</Link></li>
            <li><Link href="/contact" className="hover:text-accent">Request a Quote</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-c flex flex-col gap-2 py-5 text-[0.8rem] text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Pakizm. All rights reserved.</span>
          <span>Pakistan · Worldwide export</span>
        </div>
      </div>
    </footer>
  );
}
