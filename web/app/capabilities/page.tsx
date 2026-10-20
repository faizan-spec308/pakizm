import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Capabilities & OEM",
  description:
    "OEM and custom manufacturing, private-label marking, surface finishes and surgical stainless steel instruments from Pakizm.",
};

export default function CapabilitiesPage() {
  return (
    <div className="container-c py-14">
      <header className="max-w-[60ch]">
        <p className="eyebrow">Capabilities</p>
        <h1 className="mt-3 text-[2.4rem] font-semibold leading-tight tracking-[-0.03em]">
          OEM and custom manufacturing, finished to your standard.
        </h1>
        <p className="mt-6 text-[1.08rem] leading-relaxed text-muted">
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

      <section className="mt-16 flex flex-col items-start gap-5 rounded-2xl border border-line bg-accent-soft p-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-[1.5rem] font-semibold tracking-[-0.02em]">
            Have a custom requirement?
          </h2>
          <p className="mt-2 max-w-[48ch] text-muted">
            Send drawings, samples or a reference list and we will prepare a
            quotation.
          </p>
        </div>
        <Link
          href="/contact"
          className="focus-ring shrink-0 rounded-full bg-accent px-7 py-3.5 font-medium text-accent-ink transition-opacity hover:opacity-90"
        >
          Get in touch
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
