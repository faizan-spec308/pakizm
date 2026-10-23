"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";

const EASE = [0.16, 1, 0.3, 1] as const;
const PIECES = [
  { ref: "14-1403", name: "Osteotome" },
  { ref: "14-0131", name: "Bone forceps" },
  { ref: "14-1405", name: "Elevator" },
];

export default function EditorialBand() {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-ink text-bg">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{ background: "radial-gradient(70% 90% at 75% 40%, rgba(255,255,255,0.08), transparent 60%)" }}
      />
      <div className="container-c relative grid items-center gap-12 py-20 md:grid-cols-[1fr_1fr] md:py-28">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span className="eyebrow !text-bg">Craftsmanship</span>
          <h2 className="heading-upper mt-6 text-[2.2rem] leading-[0.92] sm:text-[3.4rem]">
            Precision in
            <br />
            <span className="text-stroke-light">every detail.</span>
          </h2>
          <p className="mt-6 max-w-[42ch] leading-relaxed text-bg/65">
            Each instrument is forged from surgical stainless steel, machined to
            exacting tolerances and finished by hand — ready for the operating
            field and marked to your standard.
          </p>
          <Link href="/capabilities" className="btn btn-light btn-lg mt-9">
            Our process
            <ArrowUpRight size={15} weight="bold" />
          </Link>
        </motion.div>

        {/* specimen plate — instruments presented on a clean catalogue card */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="md:justify-self-end"
        >
          <motion.div
            animate={reduce ? {} : { y: [0, -10, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="product-surface w-full max-w-[460px] rounded-[16px] border border-line p-6 text-ink shadow-[0_50px_90px_rgba(0,0,0,0.55)] sm:p-7"
          >
            <div className="mb-5 flex items-baseline justify-between">
              <span className="eyebrow">Specimen plate</span>
              <span className="ref text-[0.72rem] text-muted">Series 14</span>
            </div>
            <div className="grid grid-cols-3">
              {PIECES.map((p, i) => (
                <div
                  key={p.ref}
                  className={`flex flex-col items-center px-2 ${i > 0 ? "border-l border-line" : ""}`}
                >
                  <div className="flex h-[230px] items-center justify-center sm:h-[300px]">
                    <Image
                      src={`/hero/${p.ref}.png`}
                      alt={p.name}
                      width={200}
                      height={720}
                      className="max-h-full w-auto object-contain"
                    />
                  </div>
                  <span className="mt-3 text-center text-[0.72rem] font-medium leading-tight text-ink-2">
                    {p.name}
                  </span>
                  <span className="ref mt-0.5 text-[0.66rem] text-muted">{p.ref}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
