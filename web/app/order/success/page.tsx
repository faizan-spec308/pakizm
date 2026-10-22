import type { Metadata } from "next";
import OrderSuccess from "@/components/order-success";

export const metadata: Metadata = {
  title: "Order confirmed",
  robots: { index: false },
};

export default function OrderSuccessPage() {
  return (
    <div className="container-c">
      <OrderSuccess />
    </div>
  );
}
