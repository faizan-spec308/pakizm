"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
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
            <Link href={`/products/${hero.categorySlug}/${hero.id}`} aria-label={hero.name} className="group relative block">
              <motion.div
                animate={reduce ? {} : { y: [0, -12, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="product-surface w-[min(78vw,360px)] rounded-[16px] border border-line p-7 shadow-[0_45px_80px_rgba(11,11,11,0.16)] sm:w-[340px] sm:p-9 lg:w-[380px]"
              >
                <div className="flex h-[36vh] items-center justify-center sm:h-[48vh] lg:h-[54vh]">
                  <Image
                    src={`/hero/${hero.primaryRef}.png`}
                    alt={hero.name}
                    width={520}
                    height={1200}
                    priority
                    className="max-h-full w-auto object-contain transition-transform duration-700 ease-premium group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-5 flex items-end justify-between border-t border-line pt-4">
                  <div>
                    <div className="text-[0.92rem] font-semibold leading-tight tracking-tight text-ink">{hero.name}</div>
                    <div className="ref mt-1 text-[0.72rem] text-muted">{hero.primaryRef}</div>
                  </div>
                  <ArrowUpRight size={18} weight="bold" className="text-ink transition-transform duration-500 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </motion.div>
              <span className="absolute -left-2 -top-2 rounded-sm bg-ink px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-wide text-bg shadow-soft">
                Featured
              </span>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
