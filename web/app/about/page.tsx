import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  ShieldCheck,
  Factory,
  Globe,
  Certificate,
} from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Pakizm is a manufacturer and exporter of orthopedic, dental and general surgery instruments in surgical stainless steel, operating since 2005.",
};

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line bg-surface-2">
        <div className="container-c py-16 md:py-24">
          <Reveal>
            <span className="eyebrow">About Pakizm</span>
            <h1 className="heading-upper mt-5 max-w-[16ch] text-[2.8rem] leading-[0.95] sm:text-[4rem]">
              A manufacturer of precision instruments
            </h1>
            <p className="mt-7 max-w-prose text-[1.1rem] leading-relaxed text-ink-2">
              Since 2005, Pakizm has manufactured and exported orthopedic, dental
              and general surgery instruments. We produce in surgical stainless
              steel to exacting tolerances, supplying distributors and healthcare
              providers around the world.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-12 flex flex-wrap gap-x-12 gap-y-6 border-t border-line pt-8">
              {[
                ["Since 2005", "Manufacturing"],
                ["Surgical stainless steel", "Materials"],
                ["OEM & private label", "Custom marking"],
                ["Worldwide", "Export"],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="font-display text-[1.25rem] font-semibold tracking-tight">{v}</div>
                  <div className="text-[0.72rem] font-medium uppercase tracking-[0.12em] text-muted">{l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-c py-16 md:py-24">
        <div className="grid gap-x-10 gap-y-12 md:grid-cols-2">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="flex gap-5">
                <v.icon size={30} weight="light" className="mt-1 shrink-0 text-ink" />
                <div>
                  <h2 className="text-[1.2rem] font-semibold tracking-tight">{v.title}</h2>
                  <p className="mt-2 max-w-[44ch] leading-relaxed text-ink-2">{v.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-c pb-24">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 rounded-[16px] bg-ink p-8 text-bg md:flex-row md:items-center md:p-14">
            <h2 className="heading-upper max-w-[18ch] text-[1.8rem] leading-[0.98] sm:text-[2.4rem]">
              Built for partners worldwide
            </h2>
            <Link href="/capabilities" className="btn btn-light btn-lg shrink-0">
              See our capabilities
              <ArrowUpRight size={15} weight="bold" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

const VALUES = [
  { icon: Factory, title: "Made to specification", body: "Produced to exacting tolerances in surgical stainless steel and finished to order." },
  { icon: ShieldCheck, title: "Lifetime guarantee", body: "Every instrument is inspected and backed against manufacturing defects for the life of the product." },
  { icon: Certificate, title: "OEM & private label", body: "We mark instruments under your own brand so partners can present the range as their own." },
  { icon: Globe, title: "Worldwide export", body: "Two decades of manufacturing and export, serving distributors and providers internationally." },
];
