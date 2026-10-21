import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  PencilRuler,
  Tag,
  Sparkle,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/reveal";

export const metadata: Metadata = {
  title: "Capabilities & OEM",
  description:
    "OEM and custom manufacturing, private-label marking, surface finishes and surgical stainless steel instruments from Pakizm.",
};

export default function CapabilitiesPage() {
  return (
    <>
      <section className="border-b border-line bg-surface-2">
        <div className="container-c py-16 md:py-24">
          <Reveal>
            <span className="eyebrow">Capabilities</span>
            <h1 className="heading-upper mt-5 max-w-[18ch] text-[2.8rem] leading-[0.95] sm:text-[4rem]">
              OEM & custom manufacturing
            </h1>
            <p className="mt-7 max-w-prose text-[1.1rem] leading-relaxed text-ink-2">
              Beyond our standard catalog, we manufacture to specification and
              mark instruments under your own brand. Tell us what you need and we
              will quote it.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-c py-16 md:py-24">
        <Reveal>
          <span className="eyebrow mb-8 block">What we offer</span>
        </Reveal>
        <div className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2">
          {CAPS.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.06}>
              <div className="h-full bg-surface p-8 transition-colors duration-400 hover:bg-surface-2">
                <c.icon size={28} weight="light" className="text-ink" />
                <h2 className="mt-5 text-[1.15rem] font-semibold tracking-tight">{c.title}</h2>
                <p className="mt-2 leading-relaxed text-ink-2">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-c pb-16 md:pb-24">
        <Reveal>
          <span className="eyebrow mb-8 block">Available finishes</span>
        </Reveal>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {FINISHES.map((f, i) => (
            <Reveal key={f} delay={i * 0.05}>
              <div className="rounded-card border border-line bg-surface p-5 text-[0.9rem] font-medium transition-colors duration-400 hover:border-ink">
                {f}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-c pb-24">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 rounded-[16px] border border-line bg-surface-2 p-8 md:flex-row md:items-center md:p-14">
            <div>
              <h2 className="heading-upper text-[1.8rem] leading-[0.98] sm:text-[2.4rem]">
                Have a custom requirement?
              </h2>
              <p className="mt-3 max-w-[48ch] text-ink-2">
                Send drawings, samples or a reference list and we will prepare a
                quotation.
              </p>
            </div>
            <Link href="/contact" className="btn btn-dark btn-lg shrink-0">
              Get in touch
              <ArrowUpRight size={15} weight="bold" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

const CAPS = [
  { icon: PencilRuler, title: "OEM manufacturing", body: "Production to your drawings and specifications." },
  { icon: Tag, title: "Private-label marking", body: "Instruments marked with your brand and references." },
  { icon: Sparkle, title: "Custom instruments", body: "New designs and modifications on request." },
  { icon: ShieldCheck, title: "Lifetime guarantee", body: "Every instrument backed against manufacturing defects." },
];

const FINISHES = [
  "Sand-blasted / matte",
  "Mirror polished",
  "Gold electroplated",
  "Black oxidized",
  "Satin",
];
