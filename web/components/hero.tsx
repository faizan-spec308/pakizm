"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import type { ReactNode } from "react";

type Hero = { id: string; name: string; primaryRef: string; categorySlug: string };
const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero({ hero }: { hero?: Hero }) {
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE },
  });

  // masked line reveal
  const Line = ({ children, delay, className }: { children: ReactNode; delay: number; className?: string }) => (
    <span className="block overflow-hidden pb-[0.08em]">
      {reduce ? (
        <span className={`block ${className ?? ""}`}>{children}</span>
      ) : (
        <motion.span
          className={`block ${className ?? ""}`}
          initial={{ y: "115%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.95, delay, ease: EASE }}
        >
          {children}
        </motion.span>
      )}
    </span>
  );

  return (
    <section className="relative overflow-hidden border-b border-line bg-surface-2">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{ background: "radial-gradient(60% 80% at 85% 20%, rgba(11,11,11,0.05), transparent 60%)" }}
      />
      <div className="container-c relative grid min-h-[80vh] items-center gap-6 py-10 md:grid-cols-[1.08fr_0.92fr] md:py-0">
        <div className="relative z-10 py-10">
          <motion.div {...rise(0)}>
            <span className="eyebrow">Orthopedic instruments · since 2005</span>
          </motion.div>

          <h1 className="heading-upper display-thin mt-7 text-[2.9rem] leading-[0.98] sm:text-[4.4rem] lg:text-[5.4rem]">
            <Line delay={0.12}>Engineered for</Line>
            <Line delay={0.26} className="text-stroke">Surgery.</Line>
          </h1>

          <motion.p className="mt-8 max-w-[42ch] text-[1.12rem] leading-relaxed text-ink-2" {...rise(0.5)}>
            Precision orthopedic instruments in surgical stainless steel — built
            to specification, finished to order, supplied worldwide.
          </motion.p>

          <motion.div className="mt-10 flex flex-wrap gap-3" {...rise(0.58)}>
            <Link href="/products" className="btn btn-dark btn-lg">
              Shop the catalog
              <ArrowRight size={15} weight="bold" />
            </Link>
            <Link href="/contact" className="btn btn-ghost btn-lg">
              Request a quote
            </Link>
          </motion.div>
        </div>

        {hero && (
          <motion.div
            className="relative z-0 flex h-full items-center justify-center"
            initial={reduce ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.25, ease: EASE }}
          >
            <Link href={`/products/${hero.categorySlug}/${hero.id}`} aria-label={hero.name} className="relative block">
              <motion.div
                animate={reduce ? {} : { y: [0, -14, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/instruments/cut/weitlaner-retractor.png"
                  alt={hero.name}
                  width={900}
                  height={840}
                  priority
                  className="h-auto w-[82vw] max-w-[400px] drop-shadow-[0_30px_45px_rgba(11,11,11,0.22)] sm:w-[420px] lg:max-w-[520px]"
                />
              </motion.div>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
