const ITEMS = [
  "Surgical stainless steel",
  "Manufacturing since 2005",
  "OEM & private label",
  "Lifetime guarantee",
  "Worldwide export",
  "Made to specification",
];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="overflow-hidden border-y border-line bg-ink py-4 text-bg">
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-[0.95rem] font-medium uppercase tracking-[0.06em]">
              {t}
            </span>
            <span aria-hidden className="text-bg/40">✦</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .marquee-track { animation: marquee 28s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .marquee-track { animation: none; } }
      `}</style>
    </div>
  );
}
