"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";

const EASE = [0.16, 1, 0.3, 1] as const;

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

        <motion.div
          className="relative flex h-[300px] items-center justify-center sm:h-[400px]"
          initial={reduce ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <motion.div
            animate={reduce ? {} : { y: [0, -16, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/instruments/cut/pin-wire-cutter.png"
              alt="Pakizm pin and wire cutter"
              width={620}
              height={800}
              className="max-h-[300px] w-auto drop-shadow-[0_30px_50px_rgba(0,0,0,0.55)] sm:max-h-[400px]"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
