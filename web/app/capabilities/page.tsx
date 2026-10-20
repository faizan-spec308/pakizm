import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Capabilities & OEM",
  description:
    "OEM and custom manufacturing, private-label marking, surface finishes and surgical stainless steel instruments from Pakizm.",
};

export default function CapabilitiesPage() {
  return (
    <div className="container-c py-14">
      <header className="max-w-prose">
        <span className="eyebrow">Capabilities</span>
        <h1 className="display mt-4 text-[2.6rem] leading-[1.06] sm:text-[3.4rem]">
          OEM and custom manufacturing, finished to your standard.
        </h1>
        <p className="mt-6 text-[1.08rem] leading-relaxed text-ink-2">
          Beyond our standard catalog, we manufacture to specification and mark
          instruments under your own brand. Tell us what you need and we will
          quote it.
        </p>
      </header>

      <section className="mt-14">
        <h2 className="eyebrow mb-5">What we offer</h2>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {CAPS.map((c) => (
            <div key={c.title} className="bg-surface p-6">
              <h3 className="text-[1.05rem] font-semibold">{c.title}</h3>
              <p className="mt-2 text-[0.92rem] text-muted">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="eyebrow mb-5">Available finishes</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {FINISHES.map((f) => (
            <div key={f} className="rounded-xl border border-line bg-surface p-4 text-[0.9rem]">
              {f}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 flex flex-col items-start gap-6 rounded-card border border-line bg-accent-soft p-8 md:flex-row md:items-center md:justify-between md:p-12">
        <div>
          <h2 className="display text-[1.8rem] sm:text-[2.2rem]">
            Have a custom requirement?
          </h2>
          <p className="mt-2 max-w-[48ch] text-ink-2">
            Send drawings, samples or a reference list and we will prepare a
            quotation.
          </p>
        </div>
        <Link href="/contact" className="btn btn-primary shrink-0">
          Get in touch
          <span className="btn-dot">
            <ArrowUpRight size={13} weight="bold" />
          </span>
        </Link>
      </section>
    </div>
  );
}

const CAPS = [
  { title: "OEM manufacturing", body: "Production to your drawings and specifications." },
  { title: "Private-label marking", body: "Instruments marked with your brand and references." },
  { title: "Custom instruments", body: "New designs and modifications on request." },
  { title: "Lifetime guarantee", body: "Every instrument backed against manufacturing defects." },
];

const FINISHES = [
  "Sand-blasted / matte",
  "Mirror polished",
  "Gold electroplated",
  "Black oxidized",
  "Satin",
];
