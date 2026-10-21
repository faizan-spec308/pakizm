"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";

const EASE = [0.16, 1, 0.3, 1] as const;
const PIECES = [
  { ref: "14-1403", rot: -8, delay: 0, dur: 7 },
  { ref: "14-0131", rot: 5, delay: 0.4, dur: 8 },
  { ref: "14-1405", rot: -3, delay: 0.8, dur: 6.5 },
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
      <div className="container-c relative grid items-center gap-10 py-20 md:grid-cols-[1fr_1fr] md:py-28">
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

        <div className="relative flex h-[320px] items-center justify-center gap-2 sm:h-[400px]">
          {PIECES.map((p, i) => (
            <motion.div
              key={p.ref}
              initial={reduce ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease: EASE }}
              style={{ rotate: `${p.rot}deg` }}
            >
              <motion.div
                animate={reduce ? {} : { y: [0, -16, 0] }}
                transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
              >
                <Image
                  src={`/hero/${p.ref}.png`}
                  alt=""
                  width={260}
                  height={760}
                  className="max-h-[300px] w-auto drop-shadow-[0_24px_40px_rgba(0,0,0,0.5)] sm:max-h-[380px]"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
