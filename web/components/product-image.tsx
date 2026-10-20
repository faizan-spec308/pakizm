"use client";

import { useState } from "react";

type Props = {
  ref_: string;
  alt: string;
  className?: string;
  showRef?: boolean;
};

/**
 * Real photo at /products/<reference>.webp once it exists, else a refined
 * placeholder. Drop files into web/public/products/ named by reference number.
 */
export default function ProductImage({ ref_, alt, className, showRef = true }: Props) {
  const [failed, setFailed] = useState(false);
  const src = `/products/${ref_}.webp`;

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-3 ${className ?? ""}`}
        aria-label={`${alt} — photograph pending`}
      >
        <svg
          width="46"
          height="46"
          viewBox="0 0 48 48"
          fill="none"
          stroke="var(--muted)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          style={{ opacity: 0.55 }}
        >
          <circle cx="12" cy="36" r="4.5" />
          <circle cx="36" cy="12" r="3.5" />
          <path d="M15 33 L33 15" />
          <path d="M12 31.5 V22 M36 15.5 V26" />
        </svg>
        {showRef && (
          <span className="ref text-[0.66rem] uppercase tracking-[0.12em] text-muted">
            {ref_}
          </span>
        )}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
