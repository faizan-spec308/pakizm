"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle } from "@phosphor-icons/react";
import { useCart } from "./cart-context";

export default function OrderSuccess() {
  const { clear } = useCart();
  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <div className="flex flex-col items-center gap-6 py-24 text-center">
      <CheckCircle size={56} weight="light" className="text-ink" />
      <h1 className="heading-upper text-[2.2rem] sm:text-[2.8rem]">Order confirmed</h1>
      <p className="max-w-[46ch] leading-relaxed text-muted">
        Thank you — your order has been received. A confirmation has been sent by
        Stripe. Our team will be in touch regarding dispatch and any OEM details.
      </p>
      <Link href="/products" className="btn btn-dark btn-lg">
        Continue shopping
      </Link>
    </div>
  );
}
