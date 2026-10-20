import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Pakizm is a manufacturer and exporter of orthopedic, dental and general surgery instruments in surgical stainless steel, operating since 2005.",
};

export default function AboutPage() {
  return (
    <div className="container-c py-14">
      <header className="max-w-prose">
        <span className="eyebrow">About Pakizm</span>
        <h1 className="display mt-4 text-[2.6rem] leading-[1.06] sm:text-[3.4rem]">
          A manufacturer of precision surgical instruments.
        </h1>
        <p className="mt-6 text-[1.08rem] leading-relaxed text-ink-2">
          Since 2005, Pakizm has manufactured and exported orthopedic, dental and
          general surgery instruments. We produce in surgical stainless steel to
          exacting tolerances, supplying distributors and healthcare providers
          around the world.
        </p>
      </header>

      <section className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
        {VALUES.map((v) => (
          <div key={v.title} className="bg-surface p-6">
            <div className="ref text-[0.78rem] text-accent">{v.code}</div>
            <h2 className="mt-2 text-[1.05rem] font-semibold">{v.title}</h2>
            <p className="mt-2 text-[0.92rem] text-muted">{v.body}</p>
          </div>
        ))}
      </section>

      <section className="mt-16 grid gap-10 md:grid-cols-[1fr_1fr]">
        <div>
          <h2 className="display text-[1.7rem] sm:text-[2rem]">
            Quality that carries a lifetime guarantee
          </h2>
          <p className="mt-4 text-muted">
            Every instrument is inspected and backed by our guarantee against
            manufacturing defects for the life of the product. We stand behind
            the materials, the finish and the function of each piece we ship.
          </p>
        </div>
        <div>
          <h2 className="display text-[1.7rem] sm:text-[2rem]">
            Built for partners worldwide
          </h2>
          <p className="mt-4 text-muted">
            We work with distributors and brands internationally, offering OEM
            manufacturing and private-label marking so our partners can present
            the range under their own identity.
          </p>
          <Link
            href="/capabilities"
            className="focus-ring mt-4 inline-block text-[0.92rem] font-medium text-accent hover:underline"
          >
            See our capabilities →
          </Link>
        </div>
      </section>
    </div>
  );
}

const VALUES = [
  { code: "01", title: "Surgical stainless steel", body: "Instruments produced from medical-grade stainless steel." },
  { code: "02", title: "Made to specification", body: "Produced to exacting tolerances, finished to order." },
  { code: "03", title: "Since 2005", body: "Two decades of manufacturing and export experience." },
];
