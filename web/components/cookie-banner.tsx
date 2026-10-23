"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const KEY = "pakizm-cookie-consent";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {}
  }, []);

  const decide = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem(KEY, value);
    } catch {}
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-[80] border-t border-line bg-surface"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-label="Cookie notice"
        >
          <div className="container-c flex flex-col items-start gap-4 py-5 md:flex-row md:items-center md:justify-between">
            <p className="max-w-[70ch] text-[0.86rem] leading-relaxed text-ink-2">
              We use cookies and local storage to keep the site working (such as
              your cart) and to improve your experience. See our{" "}
              <Link href="/legal/cookies" className="font-medium text-ink underline">
                Cookie Policy
              </Link>
              .
            </p>
            <div className="flex shrink-0 gap-3">
              <button onClick={() => decide("declined")} className="btn btn-ghost">
                Decline
              </button>
              <button onClick={() => decide("accepted")} className="btn btn-dark">
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
