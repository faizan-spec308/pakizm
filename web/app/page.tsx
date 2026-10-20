import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Medal,
  Gear,
  Globe,
} from "@phosphor-icons/react/dist/ssr";
import { getCatalog } from "@/lib/catalog";
import Reveal from "@/components/reveal";

export default function HomePage() {
  const { categories, stats } = getCatalog();

  return (
    <>
      {/* ───────── Hero ───────── */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="grid-texture pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-70"
        />
        <div className="container-c relative grid items-center gap-16 pb-20 pt-16 md:grid-cols-[1.15fr_0.85fr] md:pb-28 md:pt-24">
          <div>
            <Reveal>
              <span className="eyebrow">Precision instruments · since 2005</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="display mt-7 text-[2.9rem] leading-[1.02] sm:text-[4.1rem] md:text-[4.6rem]">
                Orthopedic instruments,
                <br />
                <span className="display-ital text-accent">made to specification.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-7 max-w-[46ch] text-[1.08rem] leading-relaxed text-ink-2">
                A manufacturer of surgical stainless-steel instruments — built to
                exacting tolerances, finished to order, and supplied to
                distributors and surgeons worldwide.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/products" className="btn btn-primary">
                  Browse the catalog
                  <span className="btn-dot">
                    <ArrowRight size={13} weight="bold" />
                  </span>
                </Link>
                <Link href="/contact" className="btn btn-ghost">
                  Request a quote
                </Link>
              </div>
            </Reveal>
          </div>

          {/* figures — double-bezel card */}
          <Reveal delay={0.1}>
            <div className="rounded-[20px] border border-line bg-surface-2 p-2 shadow-soft">
              <div className="rounded-[13px] border border-line bg-surface p-7">
                <div className="eyebrow mb-5">The catalog</div>
                <dl className="flex flex-col">
                  <Figure value={stats.products.toLocaleString()} label="Instruments" />
                  <Figure value={stats.variants.toLocaleString()} label="Reference sizes" />
                  <Figure value={String(stats.categories)} label="Categories" />
                  <Figure value="2005" label="Manufacturing since" last />
                </dl>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── Category directory ───────── */}
      <section className="container-c border-t border-line py-20 md:py-28">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <div>
              <span className="eyebrow">Product range</span>
              <h2 className="display mt-4 text-[2rem] sm:text-[2.6rem]">
                Twenty-six instrument families.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 text-[0.92rem] font-medium text-ink"
            >
              View all products
              <ArrowRight
                size={15}
                weight="bold"
                className="transition-transform duration-500 ease-premium group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={Math.min(i * 0.025, 0.3)}>
              <Link
                href={`/products/${c.slug}`}
                className="group flex h-full items-center justify-between gap-4 bg-surface px-6 py-7 transition-colors duration-400 ease-premium hover:bg-surface-2"
              >
                <div>
                  <div className="text-[1.05rem] font-semibold tracking-tight text-ink">
                    {c.name}
                  </div>
                  <div className="ref mt-1 text-[0.75rem] text-muted">
                    {c.count} instruments
                  </div>
                </div>
                <ArrowUpRight
                  size={18}
                  weight="light"
                  className="shrink-0 text-muted transition-all duration-500 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────── Manufacturing ───────── */}
      <section className="border-t border-line bg-surface">
        <div className="container-c grid gap-14 py-20 md:grid-cols-[0.95fr_1.05fr] md:py-28">
          <Reveal>
            <div className="md:sticky md:top-28 md:self-start">
              <span className="eyebrow">Manufacturing</span>
              <h2 className="display mt-4 text-[2rem] leading-[1.06] sm:text-[2.7rem]">
                Surgical stainless steel,{" "}
                <span className="display-ital text-accent">finished to your standard.</span>
              </h2>
              <p className="mt-6 max-w-[42ch] text-ink-2">
                Every instrument is produced to specification and available with
                OEM and private-label marking — each piece backed by a lifetime
                guarantee against manufacturing defects.
              </p>
              <Link
                href="/capabilities"
                className="group mt-7 inline-flex items-center gap-2 text-[0.92rem] font-medium text-ink"
              >
                Capabilities & custom manufacturing
                <ArrowRight
                  size={15}
                  weight="bold"
                  className="transition-transform duration-500 ease-premium group-hover:translate-x-1"
                />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2">
              {FINISHES.map((f) => (
                <div key={f.name} className="bg-surface p-7">
                  <div className="ref text-[0.72rem] text-accent">{f.code}</div>
                  <div className="mt-2 font-semibold tracking-tight">{f.name}</div>
                  <p className="mt-1.5 text-[0.88rem] leading-relaxed text-muted">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── Values ───────── */}
      <section className="container-c border-t border-line py-20 md:py-24">
        <div className="grid gap-x-10 gap-y-12 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div>
                <v.icon size={26} weight="light" className="text-accent" />
                <h3 className="mt-5 text-[1.15rem] font-semibold tracking-tight">
                  {v.title}
                </h3>
                <p className="mt-2 max-w-[34ch] leading-relaxed text-ink-2">
                  {v.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <section className="container-c pb-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-[22px] border border-line bg-ink px-8 py-16 text-bg md:px-16 md:py-24">
            <div className="relative mx-auto max-w-2xl text-center">
              <h2 className="display text-[2.2rem] leading-tight sm:text-[3rem]">
                Request pricing or a{" "}
                <span className="display-ital">custom specification.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-[46ch] text-[1.02rem] text-bg/70">
                Send us your reference list or requirements and our team will
                respond with a quotation.
              </p>
              <Link
                href="/contact"
                className="btn mt-9 bg-bg text-ink hover:opacity-95"
              >
                Request a quote
                <span className="btn-dot">
                  <ArrowUpRight size={13} weight="bold" />
                </span>
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function Figure({
  value,
  label,
  last,
}: {
  value: string;
  label: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-baseline justify-between py-4 ${last ? "" : "border-b border-line"}`}
    >
      <dt className="text-[0.9rem] text-muted">{label}</dt>
      <dd className="ref text-[1.6rem] font-medium tracking-tight text-ink">{value}</dd>
    </div>
  );
}

const VALUES = [
  {
    icon: Gear,
    title: "Made to specification",
    body: "Produced to exacting tolerances in surgical stainless steel, finished to order.",
  },
  {
    icon: Medal,
    title: "Lifetime guarantee",
    body: "Every instrument is backed against manufacturing defects for the life of the product.",
  },
  {
    icon: Globe,
    title: "Worldwide export",
    body: "Supplying distributors and healthcare providers internationally since 2005.",
  },
];

const FINISHES = [
  { code: "01", name: "Satin & matte", desc: "Sand-blasted, glare-free surface for the operating field." },
  { code: "02", name: "Mirror polish", desc: "High-polish reflective finish." },
  { code: "03", name: "Gold electroplated", desc: "Plated marking, rings and handles." },
  { code: "04", name: "Black oxidized", desc: "Anodized, low-reflection coating." },
];
