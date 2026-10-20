import Link from "next/link";
import { getCatalog } from "@/lib/catalog";

export default function HomePage() {
  const { categories, stats } = getCatalog();

  return (
    <>
      {/* Hero */}
      <section className="border-b border-line">
        <div className="container-c grid items-center gap-12 py-16 md:grid-cols-[1.25fr_0.75fr] md:py-24">
          <div>
            <p className="eyebrow">Precision surgical instruments · since 2005</p>
            <h1 className="mt-4 text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-[3.4rem]">
              Orthopedic instruments,
              <br />
              engineered to specification.
            </h1>
            <p className="mt-6 max-w-[52ch] text-[1.05rem] leading-relaxed text-muted">
              Pakizm manufactures and exports orthopedic, dental and general
              surgery instruments in surgical stainless steel — built to exacting
              tolerances, finished to order, and backed by a lifetime guarantee.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="focus-ring rounded-full bg-accent px-6 py-3 text-[0.95rem] font-medium text-accent-ink transition-opacity hover:opacity-90"
              >
                Browse the catalog
              </Link>
              <Link
                href="/contact"
                className="focus-ring rounded-full border border-line px-6 py-3 text-[0.95rem] font-medium transition-colors hover:border-accent hover:text-accent"
              >
                Request a quote
              </Link>
            </div>
          </div>

          {/* spec panel — real catalog figures as the hero's visual anchor */}
          <div className="rounded-2xl border border-line bg-surface p-6">
            <div className="eyebrow mb-4">Catalog at a glance</div>
            <dl className="divide-y divide-line">
              <Stat value={stats.products.toLocaleString()} label="Instruments" />
              <Stat value={stats.variants.toLocaleString()} label="Reference sizes" />
              <Stat value={String(stats.categories)} label="Categories" />
              <Stat value="2005" label="Manufacturing since" />
            </dl>
          </div>
        </div>
      </section>

      {/* Category directory */}
      <section className="container-c py-16 md:py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Product range</p>
            <h2 className="mt-2 text-[1.8rem] font-semibold tracking-[-0.02em]">
              Browse by instrument category
            </h2>
          </div>
          <Link
            href="/products"
            className="focus-ring hidden shrink-0 text-[0.9rem] font-medium text-accent hover:underline sm:block"
          >
            View all products →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/products/${c.slug}`}
              className="focus-ring group flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-4 transition-colors hover:border-accent"
            >
              <span className="text-[0.95rem] font-medium leading-tight group-hover:text-accent">
                {c.name}
              </span>
              <span className="ref ml-2 shrink-0 text-[0.78rem] text-muted">
                {c.count}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Manufacturing / quality */}
      <section className="border-y border-line bg-surface">
        <div className="container-c py-16 md:py-20">
          <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="eyebrow">Manufacturing</p>
              <h2 className="mt-2 text-[1.8rem] font-semibold leading-tight tracking-[-0.02em]">
                Made from surgical stainless steel, finished to your standard.
              </h2>
              <p className="mt-5 max-w-[46ch] text-muted">
                Every instrument is produced to specification and available with
                OEM and private-label marking. Each piece carries our lifetime
                guarantee against manufacturing defects.
              </p>
              <Link
                href="/capabilities"
                className="focus-ring mt-6 inline-block text-[0.92rem] font-medium text-accent hover:underline"
              >
                Capabilities & custom manufacturing →
              </Link>
            </div>

            <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              {FINISHES.map((f) => (
                <div key={f.name} className="bg-surface p-5">
                  <div className="ref text-[0.78rem] text-accent">{f.code}</div>
                  <div className="mt-1 font-medium">{f.name}</div>
                  <p className="mt-1 text-[0.86rem] text-muted">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-c py-20">
        <div className="flex flex-col items-start gap-6 rounded-2xl border border-line bg-accent-soft p-8 md:flex-row md:items-center md:justify-between md:p-12">
          <div>
            <h2 className="text-[1.6rem] font-semibold tracking-[-0.02em]">
              Need pricing or a custom specification?
            </h2>
            <p className="mt-2 max-w-[48ch] text-muted">
              Send us your reference list or requirements and our team will
              respond with a quotation.
            </p>
          </div>
          <Link
            href="/contact"
            className="focus-ring shrink-0 rounded-full bg-accent px-7 py-3.5 font-medium text-accent-ink transition-opacity hover:opacity-90"
          >
            Request a quote
          </Link>
        </div>
      </section>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline justify-between py-3">
      <dt className="text-[0.9rem] text-muted">{label}</dt>
      <dd className="ref text-[1.5rem] font-semibold tracking-tight">{value}</dd>
    </div>
  );
}

const FINISHES = [
  { code: "01", name: "Satin & matte", desc: "Sand-blasted, glare-free surface." },
  { code: "02", name: "Mirror polish", desc: "High-polish reflective finish." },
  { code: "03", name: "Gold electroplated", desc: "Plated marking and handles." },
  { code: "04", name: "Black oxidized", desc: "Anodized, low-reflection coating." },
];
