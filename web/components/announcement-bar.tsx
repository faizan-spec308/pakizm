"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  "Worldwide export — distributors & healthcare providers",
  "OEM & private-label manufacturing available",
  "Lifetime guarantee on every instrument",
  "Manufacturing precision instruments since 2005",
];

export default function AnnouncementBar() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % MESSAGES.length), 4000);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <div className="bg-ink text-bg">
      <div className="container-c flex h-9 items-center justify-center text-center">
        <button
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Resume messages" : "Pause messages"}
          className="text-[0.74rem] font-medium tracking-wide text-bg/90"
        >
          <span key={i} className="inline-block animate-[fadein_0.5s_ease]">
            {MESSAGES[i]}
          </span>
        </button>
      </div>
      <style>{`@keyframes fadein{from{opacity:0}to{opacity:1}}`}</style>
    </div>
  );
}
