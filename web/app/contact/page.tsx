import type { Metadata } from "next";
import { Suspense } from "react";
import { EnvelopeSimple, Phone, Globe } from "@phosphor-icons/react/dist/ssr";
import ContactForm from "@/components/contact-form";
import Reveal from "@/components/reveal";

export const metadata: Metadata = {
  title: "Contact & Quote",
  description:
    "Request a quotation or get in touch with Pakizm for orthopedic surgical instruments, OEM and custom manufacturing.",
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-line bg-surface-2">
        <div className="container-c py-16 md:py-20">
          <Reveal>
            <span className="eyebrow">Contact</span>
            <h1 className="heading-upper mt-5 text-[2.8rem] leading-[0.95] sm:text-[4rem]">
              Request a quote
            </h1>
            <p className="mt-6 max-w-prose text-[1.1rem] leading-relaxed text-ink-2">
              Send us your reference list, quantities or custom requirements and
              our team will respond with a quotation.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-c py-16 md:py-20">
        <div className="grid gap-14 md:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <Suspense fallback={<div className="text-muted">Loading form…</div>}>
              <ContactForm />
            </Suspense>
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="flex flex-col gap-4">
              <div className="rounded-card border border-line bg-surface p-6">
                <div className="eyebrow mb-4">Direct</div>
                <div className="flex items-start gap-3 border-b border-line pb-4">
                  <EnvelopeSimple size={20} weight="light" className="mt-0.5 shrink-0 text-ink" />
                  <div>
                    <p className="text-[0.8rem] text-muted">Email</p>
                    <p className="select-all font-medium">sales@pakizm.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 pt-4">
                  <Phone size={20} weight="light" className="mt-0.5 shrink-0 text-ink" />
                  <div>
                    <p className="text-[0.8rem] text-muted">Phone</p>
                    <p className="select-all font-medium">+92 00 000 0000</p>
                  </div>
                </div>
                <p className="mt-4 text-[0.76rem] text-muted">
                  Contact details are placeholders — update before launch.
                </p>
              </div>
              <div className="rounded-card border border-line bg-surface p-6">
                <div className="flex items-start gap-3">
                  <Globe size={20} weight="light" className="mt-0.5 shrink-0 text-ink" />
                  <div>
                    <div className="eyebrow mb-1">Export</div>
                    <p className="text-[0.9rem] leading-relaxed text-ink-2">
                      We ship worldwide and support OEM and private-label orders.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}
