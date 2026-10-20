import type { Metadata } from "next";
import { Suspense } from "react";
import ContactForm from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact & Quote",
  description:
    "Request a quotation or get in touch with Pakizm for orthopedic surgical instruments, OEM and custom manufacturing.",
};

export default function ContactPage() {
  return (
    <div className="container-c py-14">
      <header className="max-w-[60ch]">
        <p className="eyebrow">Contact</p>
        <h1 className="mt-3 text-[2.4rem] font-semibold leading-tight tracking-[-0.03em]">
          Request a quote
        </h1>
        <p className="mt-5 text-[1.05rem] leading-relaxed text-muted">
          Send us your reference list, quantities or custom requirements and our
          team will respond with a quotation.
        </p>
      </header>

      <div className="mt-12 grid gap-12 md:grid-cols-[1.2fr_0.8fr]">
        <Suspense fallback={<div className="text-muted">Loading form…</div>}>
          <ContactForm />
        </Suspense>

        <aside className="flex flex-col gap-6">
          <div className="rounded-xl border border-line bg-surface p-5">
            <div className="eyebrow mb-2">Direct</div>
            <p className="text-[0.9rem] text-muted">Email</p>
            <p className="select-all font-medium">sales@pakizm.com</p>
            <p className="mt-3 text-[0.9rem] text-muted">Phone</p>
            <p className="select-all font-medium">+92 00 000 0000</p>
            <p className="mt-3 text-[0.78rem] text-muted">
              Contact details are placeholders — update before launch.
            </p>
          </div>
          <div className="rounded-xl border border-line bg-surface p-5">
            <div className="eyebrow mb-2">Export</div>
            <p className="text-[0.9rem] text-muted">
              We ship worldwide and support OEM and private-label orders.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
