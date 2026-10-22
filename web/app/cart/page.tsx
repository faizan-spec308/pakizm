import type { Metadata } from "next";
import CartView from "@/components/cart-view";

export const metadata: Metadata = {
  title: "Cart",
  description: "Your Pakizm order.",
};

export default function CartPage() {
  return (
    <div className="container-c py-14">
      <header className="mb-10">
        <span className="eyebrow">Order</span>
        <h1 className="heading-upper mt-4 text-[2.4rem] sm:text-[3rem]">Your cart</h1>
      </header>
      <CartView />
    </div>
  );
}
