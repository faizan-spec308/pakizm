import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import FaqAccordion from "@/components/faq-accordion";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about Pakizm orthopedic instruments — materials, OEM, ordering, shipping, returns and guarantee.",
};

const FAQ = [
  {
    q: "Are your instruments intended for professional use?",
    a: "Yes. Our instruments are supplied for use by qualified healthcare professionals and must be inspected, cleaned and sterilised appropriately before clinical use.",
  },
  {
    q: "What are the instruments made from?",
    a: "All instruments are manufactured in surgical stainless steel, produced to exacting tolerances and available in a range of finishes.",
  },
  {
    q: "Do you offer OEM and private-label manufacturing?",
    a: "Yes. We manufacture to your specification and mark instruments under your own brand. See our Capabilities page or send us a message with your requirements.",
  },
  {
    q: "How do I order a large or bulk quantity?",
    a: "Add items to your cart for standard quantities, or use Request a Quote for bulk, OEM and custom orders and our team will prepare a quotation.",
  },
  {
    q: "Do you ship worldwide?",
    a: "Yes. We ship internationally via established carriers. Shipping is calculated at checkout or quoted for larger orders. Import duties and taxes are the recipient's responsibility.",
  },
  {
    q: "What is your return policy?",
    a: "Unused instruments in original, unopened packaging may be returned within 30 days. Used or sterilised items and custom/OEM pieces are non-returnable for hygiene and safety reasons. See our Refund & Returns policy for details.",
  },
  {
    q: "Is there a guarantee?",
    a: "Every Pakizm instrument carries a lifetime guarantee against manufacturing defects. If an instrument is defective, contact us and we will repair or replace it.",
  },
  {
    q: "Are the prices shown final?",
    a: "Prices on the site are currently placeholders pending final pricing. For confirmed and bulk pricing, request a quote.",
  },
  {
    q: "How are payments handled?",
    a: "Payments are processed securely through Stripe. We do not store your full card details.",
  },
];

export default function FaqPage() {
  return (
    <div className="container-c py-14">
      <div className="mx-auto max-w-prose">
        <header className="mb-10">
          <span className="eyebrow">Help</span>
          <h1 className="heading-upper mt-4 text-[2.4rem] sm:text-[3rem]">
            Frequently asked questions
          </h1>
        </header>

        <FaqAccordion items={FAQ} />

        <div className="mt-12 flex flex-col items-start gap-4 rounded-card border border-line bg-surface-2 p-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold tracking-tight">Still have a question?</p>
            <p className="mt-1 text-[0.9rem] text-ink-2">Our team is happy to help.</p>
          </div>
          <Link href="/contact" className="btn btn-dark shrink-0">
            Contact us
            <ArrowUpRight size={15} weight="bold" />
          </Link>
        </div>
      </div>
    </div>
  );
}
