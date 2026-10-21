import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Medal,
  Gear,
  Globe,
} from "@phosphor-icons/react/dist/ssr";
import { getCatalog } from "@/lib/catalog";
import Reveal from "@/components/reveal";
import ProductCard from "@/components/product-card";
import ProductImage from "@/components/product-image";

const FEATURED_REFS = ["14-0131", "14-0133", "14-0137", "14-1403", "14-1405", "14-0135"];

export default function HomePage() {
  const { categories, products, stats } = getCatalog();
  const byRef = (r: string) => products.find((p) => p.primaryRef === r);
  const featured = FEATURED_REFS.map(byRef).filter(Boolean) as typeof products;
  const hero = featured[0];
  const topCats = categories.slice(0, 8);

  return (
    <>
      {/* ───── Hero ───── */}
      <section className="border-b border-line bg-surface-2">
        <div className="container-c grid items-center gap-10 py-14 md:grid-cols-[1.05fr_0.95fr] md:py-20">
          <Reveal>
            <div>
              <span className="eyebrow">Orthopedic instruments · since 2005</span>
              <h1 className="heading-upper mt-5 text-[2.9rem] sm:text-[4rem] lg:text-[4.6rem]">
                Engineered
                <br />
                for surgery.
              </h1>
              <p className="mt-6 max-w-[44ch] text-[1.08rem] leading-relaxed text-ink-2">
                Precision orthopedic instruments in surgical stainless steel —
                built to specification, finished to order, supplied worldwide.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/products" className="btn btn-primary btn-lg">
                  Shop the catalog
                  <ArrowRight size={16} weight="bold" />
                </Link>
                <Link href="/contact" className="btn btn-ghost btn-lg">
                  Request a quote
                </Link>
              </div>
              <div className="mt-10 flex gap-8 border-t border-line pt-6">
                <Stat value={stats.products.toLocaleString()} label="Instruments" />
                <Stat value={stats.variants.toLocaleString()} label="References" />
                <Stat value={String(stats.categories)} label="Categories" />
              </div>
            </div>
          </Reveal>

          {hero && (
            <Reveal delay={0.1}>
              <Link
                href={`/products/${hero.categorySlug}/${hero.id}`}
                className="group block overflow-hidden rounded-[18px] border border-line product-surface shadow-soft"
              >
                <div className="relative aspect-[4/3]">
                  <ProductImage
                    ref_={hero.primaryRef}
                    alt={hero.name}
                    className="h-full w-full object-contain p-10 transition-transform duration-700 ease-premium group-hover:scale-[1.04]"
                    showRef={false}
                  />
                  <span className="absolute left-4 top-4 rounded bg-ink px-2.5 py-1 text-[0.64rem] font-semibold uppercase tracking-wide text-bg">
                    Featured
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-line px-5 py-4">
                  <div>
                    <div className="text-[0.95rem] font-semibold tracking-tight">{hero.name}</div>
                    <div className="ref mt-0.5 text-[0.78rem] text-muted">{hero.primaryRef}</div>
                  </div>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-ink transition-transform duration-500 ease-premium group-hover:translate-x-0.5">
                    <ArrowUpRight size={15} weight="bold" />
                  </span>
                </div>
              </Link>
            </Reveal>
          )}
        </div>
      </section>

      {/* ───── Shop by category ───── */}
      <section className="container-c py-16 md:py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <Reveal>
            <h2 className="heading-upper text-[1.8rem] sm:text-[2.4rem]">Shop by category</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <Link href="/products" className="group inline-flex items-center gap-2 text-[0.86rem] font-semibold uppercase tracking-wide text-ink">
              All 26 categories
              <ArrowRight size={14} weight="bold" className="transition-transform duration-500 ease-premium group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {topCats.map((c, i) => (
            <Reveal key={c.slug} delay={Math.min(i * 0.04, 0.3)}>
              <Link
                href={`/products/${c.slug}`}
                className="group relative flex h-full min-h-[128px] flex-col justify-between overflow-hidden rounded-card border border-line bg-surface-2 p-5 transition-all duration-400 ease-premium hover:border-line-2 hover:bg-surface"
              >
                <span className="ref text-[0.72rem] text-muted">{c.count} items</span>
                <div className="flex items-end justify-between gap-2">
                  <span className="font-display text-[1.15rem] font-bold leading-tight tracking-tight text-ink">
                    {c.name}
                  </span>
                  <ArrowUpRight size={18} weight="bold" className="shrink-0 text-muted transition-all duration-400 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───── Featured products ───── */}
      {featured.length > 0 && (
        <section className="border-y border-line bg-surface-2">
          <div className="container-c py-16 md:py-20">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <Reveal>
                <h2 className="heading-upper text-[1.8rem] sm:text-[2.4rem]">Popular instruments</h2>
              </Reveal>
              <Reveal delay={0.08}>
                <Link href="/products" className="group inline-flex items-center gap-2 text-[0.86rem] font-semibold uppercase tracking-wide text-ink">
                  View all
                  <ArrowRight size={14} weight="bold" className="transition-transform duration-500 ease-premium group-hover:translate-x-1" />
                </Link>
              </Reveal>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {featured.map((p, i) => (
                <Reveal key={p.id} delay={Math.min(i * 0.05, 0.3)}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───── Promo band: OEM ───── */}
      <section className="container-c py-16 md:py-20">
        <Reveal>
          <div className="grid items-center gap-8 overflow-hidden rounded-[18px] bg-ink p-8 text-bg md:grid-cols-[1.3fr_0.7fr] md:p-14">
            <div>
              <span className="eyebrow !text-bg/60">Capabilities</span>
              <h2 className="heading-upper mt-4 text-[2rem] leading-tight sm:text-[2.8rem]">
                OEM & private-label manufacturing
              </h2>
              <p className="mt-4 max-w-[46ch] text-bg/70">
                We manufacture to your specification and mark instruments under
                your own brand. Send drawings, samples or a reference list.
              </p>
            </div>
            <div className="flex md:justify-end">
              <Link href="/capabilities" className="btn btn-light btn-lg">
                Explore capabilities
                <ArrowUpRight size={16} weight="bold" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ───── Finishes ───── */}
      <section className="container-c pb-4">
        <Reveal>
          <div className="mb-8">
            <span className="eyebrow">Manufacturing</span>
            <h2 className="heading-upper mt-4 text-[1.8rem] sm:text-[2.4rem]">
              Finished to your standard
            </h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {FINISHES.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.06}>
              <div className="h-full rounded-card border border-line bg-surface p-6">
                <div className="ref text-[0.72rem] text-accent">{f.code}</div>
                <div className="mt-2 font-semibold tracking-tight">{f.name}</div>
                <p className="mt-1.5 text-[0.86rem] leading-relaxed text-muted">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───── Values ───── */}
      <section className="container-c py-16 md:py-20">
        <div className="grid gap-x-10 gap-y-10 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div>
                <v.icon size={26} weight="regular" className="text-accent" />
                <h3 className="mt-4 text-[1.12rem] font-semibold tracking-tight">{v.title}</h3>
                <p className="mt-2 max-w-[34ch] leading-relaxed text-ink-2">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───── CTA ───── */}
      <section className="container-c pb-24">
        <Reveal>
          <div className="rounded-[18px] border border-line bg-surface-2 px-8 py-14 text-center md:py-20">
            <h2 className="heading-upper mx-auto max-w-3xl text-[2rem] sm:text-[3rem]">
              Request pricing or a custom spec
            </h2>
            <p className="mx-auto mt-4 max-w-[46ch] text-ink-2">
              Send your reference list and our team will respond with a quotation.
            </p>
            <Link href="/contact" className="btn btn-dark btn-lg mt-8">
              Request a quote
              <ArrowUpRight size={16} weight="bold" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="ref text-[1.5rem] font-semibold tracking-tight text-ink">{value}</div>
      <div className="text-[0.78rem] uppercase tracking-wide text-muted">{label}</div>
    </div>
  );
}

const VALUES = [
  { icon: Gear, title: "Made to specification", body: "Produced to exacting tolerances in surgical stainless steel, finished to order." },
  { icon: Medal, title: "Lifetime guarantee", body: "Every instrument is backed against manufacturing defects for the life of the product." },
  { icon: Globe, title: "Worldwide export", body: "Supplying distributors and healthcare providers internationally since 2005." },
];

const FINISHES = [
  { code: "01", name: "Satin & matte", desc: "Sand-blasted, glare-free surface for the operating field." },
  { code: "02", name: "Mirror polish", desc: "High-polish reflective finish." },
  { code: "03", name: "Gold electroplated", desc: "Plated marking, rings and handles." },
  { code: "04", name: "Black oxidized", desc: "Anodized, low-reflection coating." },
];
