import Link from "next/link";
import Image from "next/image";
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
import Hero from "@/components/hero";
import Marquee from "@/components/marquee";
import EditorialBand from "@/components/editorial-band";
import ProductImage from "@/components/product-image";
import categoryImages from "@/data/category-images.json";

const FEATURED_REFS = ["14-0131", "14-0133", "14-0137", "14-1403", "14-1405", "14-0135"];

export default function HomePage() {
  const { categories, products } = getCatalog();
  const byRef = (r: string) => products.find((p) => p.primaryRef === r);
  const featured = FEATURED_REFS.map(byRef).filter(Boolean) as typeof products;
  const hero = featured[0];
  const topCats = categories.slice(0, 8);

  return (
    <>
      <Hero
        hero={hero && { id: hero.id, name: hero.name, primaryRef: hero.primaryRef, categorySlug: hero.categorySlug }}
      />
      <Marquee />

      {/* Shop by category */}
      <section className="container-c py-16 md:py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <Reveal>
            <div>
              <span className="eyebrow">Product range</span>
              <h2 className="heading-upper mt-4 text-[2rem] sm:text-[2.6rem]">Shop by category</h2>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <Link href="/products" className="link-underline inline-flex items-center gap-2 text-[0.82rem] font-bold uppercase tracking-wide text-ink">
              All categories
              <ArrowRight size={14} weight="bold" />
            </Link>
          </Reveal>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {topCats.map((c, i) => (
            <Reveal key={c.slug} delay={Math.min(i * 0.04, 0.3)}>
              <Link href={`/products/${c.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-card border border-line product-surface transition-colors duration-500 ease-premium group-hover:border-ink">
                  <ProductImage
                    ref_={(categoryImages as Record<string, string>)[c.slug]}
                    alt={c.name}
                    className="h-full w-full object-contain p-7 transition-transform duration-700 ease-premium group-hover:scale-[1.06] sm:p-10"
                    showRef={false}
                  />
                  <span className="absolute left-3 top-3 flex h-8 w-8 translate-y-1 items-center justify-center rounded-full bg-ink text-bg opacity-0 transition-all duration-500 ease-premium group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight size={14} weight="bold" />
                  </span>
                </div>
                <div className="mt-3.5 font-display text-[1.1rem] font-semibold tracking-tight text-ink group-hover:text-accent">
                  {c.name}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured products */}
      {featured.length > 0 && (
        <section className="border-y border-line bg-surface-2">
          <div className="container-c py-16 md:py-24">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <Reveal>
                <h2 className="heading-upper text-[2rem] sm:text-[2.6rem]">Popular instruments</h2>
              </Reveal>
              <Reveal delay={0.08}>
                <Link href="/products" className="link-underline inline-flex items-center gap-2 text-[0.82rem] font-bold uppercase tracking-wide text-ink">
                  View all
                  <ArrowRight size={14} weight="bold" />
                </Link>
              </Reveal>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
              {featured.map((p, i) => (
                <Reveal key={p.id} delay={Math.min(i * 0.05, 0.3)}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <EditorialBand />

      {/* Selected instruments — real product photography */}
      <section className="container-c py-16 md:py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <Reveal>
            <div>
              <span className="eyebrow">Craftsmanship in detail</span>
              <h2 className="heading-upper mt-4 text-[2rem] sm:text-[2.6rem]">Selected instruments</h2>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <Link href="/products" className="link-underline inline-flex items-center gap-2 text-[0.82rem] font-bold uppercase tracking-wide text-ink">
              Browse the catalog
              <ArrowRight size={14} weight="bold" />
            </Link>
          </Reveal>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {REAL_INSTRUMENTS.map((it, i) => (
            <Reveal key={it.img} delay={Math.min(i * 0.04, 0.3)}>
              <Link href="/products" className="group block">
                <div className="relative aspect-square overflow-hidden rounded-card border border-line product-surface transition-colors duration-500 ease-premium group-hover:border-ink">
                  <Image
                    src={`/instruments/${it.img}.webp`}
                    alt={it.name}
                    fill
                    sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                    className="object-contain p-6 transition-transform duration-700 ease-premium group-hover:scale-[1.05]"
                  />
                </div>
                <div className="mt-3.5 text-[0.98rem] font-semibold tracking-tight text-ink group-hover:text-accent">
                  {it.name}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* OEM promo */}
      <section className="container-c py-16 md:py-24">
        <Reveal>
          <div className="grid items-center gap-8 overflow-hidden rounded-[16px] bg-ink p-8 text-bg md:grid-cols-[1.3fr_0.7fr] md:p-16">
            <div>
              <span className="eyebrow !text-bg/60">Capabilities</span>
              <h2 className="heading-upper mt-5 text-[2rem] leading-[0.95] sm:text-[3rem]">
                OEM & private-label manufacturing
              </h2>
              <p className="mt-5 max-w-[46ch] leading-relaxed text-bg/70">
                We manufacture to your specification and mark instruments under
                your own brand. Send drawings, samples or a reference list.
              </p>
            </div>
            <div className="flex md:justify-end">
              <Link href="/capabilities" className="btn btn-light btn-lg">
                Explore capabilities
                <ArrowUpRight size={15} weight="bold" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Finishes */}
      <section className="container-c pb-4">
        <Reveal>
          <div className="mb-10">
            <span className="eyebrow">Manufacturing</span>
            <h2 className="heading-upper mt-4 text-[2rem] sm:text-[2.6rem]">Finished to your standard</h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {FINISHES.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.06}>
              <div className="h-full rounded-card border border-line bg-surface p-6 transition-colors duration-400 hover:border-ink">
                <div className="ref text-[0.72rem] text-muted">{f.code}</div>
                <div className="mt-2 font-semibold tracking-tight">{f.name}</div>
                <p className="mt-1.5 text-[0.86rem] leading-relaxed text-muted">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="container-c py-16 md:py-24">
        <div className="grid gap-x-10 gap-y-10 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div>
                <v.icon size={28} weight="light" className="text-ink" />
                <h3 className="mt-4 text-[1.15rem] font-semibold tracking-tight">{v.title}</h3>
                <p className="mt-2 max-w-[34ch] leading-relaxed text-ink-2">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-c pb-24">
        <Reveal>
          <div className="rounded-[16px] border border-line bg-surface-2 px-8 py-16 text-center md:py-24">
            <h2 className="heading-upper mx-auto max-w-3xl text-[2.2rem] sm:text-[3.2rem]">
              Request pricing or a custom spec
            </h2>
            <p className="mx-auto mt-5 max-w-[46ch] text-ink-2">
              Send your reference list and our team will respond with a quotation.
            </p>
            <Link href="/contact" className="btn btn-dark btn-lg mt-9">
              Request a quote
              <ArrowUpRight size={15} weight="bold" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

const REAL_INSTRUMENTS = [
  { img: "reduction-forceps", name: "Bone Reduction Forceps" },
  { img: "bone-holding-forceps", name: "Bone Holding Forceps" },
  { img: "pin-wire-cutter", name: "Pin & Wire Cutter" },
  { img: "bolt-cutter", name: "Bolt / Pin Cutter" },
  { img: "bone-rongeur", name: "Bone Rongeur" },
  { img: "plate-holding-forceps", name: "Plate Holding Forceps" },
  { img: "self-retaining-retractor", name: "Self-Retaining Retractor" },
  { img: "weitlaner-retractor", name: "Weitlaner Retractor" },
];

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
