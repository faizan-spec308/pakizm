"use client";

import { useState } from "react";

type Props = {
  ref_: string;
  alt: string;
  className?: string;
};

/**
 * Shows the real product photo at /products/<reference>.webp once it exists,
 * otherwise a clean branded placeholder. Drop files into web/public/products/
 * named by reference number and they appear automatically.
 */
export default function ProductImage({ ref_, alt, className }: Props) {
  const [failed, setFailed] = useState(false);
  const src = `/products/${ref_}.webp`;

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 bg-surface-2 text-muted ${className ?? ""}`}
        aria-label={`${alt} — photo coming soon`}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          style={{ opacity: 0.5 }}
        >
          <path d="M4 20 L14 10" />
          <circle cx="17" cy="7" r="3" />
          <path d="M4 20 l1.5 -3.5 L15 7" />
        </svg>
        <span className="ref text-[0.68rem] tracking-wide">{ref_}</span>
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
