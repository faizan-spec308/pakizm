"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus } from "@phosphor-icons/react";

export default function FaqAccordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="border-t border-line">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="border-b border-line">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-5 py-5 text-left"
            >
              <span className="text-[1.02rem] font-semibold tracking-tight">{it.q}</span>
              <span className="shrink-0 text-ink-2">
                {isOpen ? <Minus size={18} weight="bold" /> : <Plus size={18} weight="bold" />}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[70ch] pb-6 leading-relaxed text-ink-2">{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
