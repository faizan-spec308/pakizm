export type LegalSection = { heading: string; body?: string[]; list?: string[] };
export type Policy = {
  slug: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

const UPDATED = "22 October 2026";
const CONTACT = "sales@pakizm.com";

export const policies: Policy[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    updated: UPDATED,
    intro:
      "This policy explains what information Pakizm collects when you use our website or place an order, how we use it, and the choices you have.",
    sections: [
      {
        heading: "Information we collect",
        body: ["We collect information you provide and information collected automatically:"],
        list: [
          "Contact and order details — name, company, email, phone, billing and shipping address, and the instruments you enquire about or order.",
          "Payment information — processed securely by our payment provider (Stripe). We do not store full card numbers on our servers.",
          "Usage information — cookies and similar technologies that help the site function and let us understand how it is used.",
        ],
      },
      {
        heading: "How we use your information",
        list: [
          "To process orders and requests for quotation, and to arrange dispatch.",
          "To respond to your enquiries and provide customer support.",
          "To operate, maintain and improve the website.",
          "To comply with legal, tax and regulatory obligations.",
        ],
      },
      {
        heading: "Sharing your information",
        body: [
          "We do not sell your personal information. We share it only with service providers who help us operate — for example our payment processor (Stripe) and shipping carriers — and where required by law.",
        ],
      },
      {
        heading: "Cookies",
        body: [
          "We use cookies and local storage as described in our Cookie Policy. You can control non-essential cookies through the banner shown on your first visit and through your browser settings.",
        ],
      },
      {
        heading: "International transfers",
        body: [
          "Pakizm operates from Pakistan and ships worldwide. Where your information is transferred across borders, we take steps to protect it consistent with this policy.",
        ],
      },
      {
        heading: "Data retention & security",
        body: [
          "We keep personal information only as long as needed for the purposes above or as required by law, and we use appropriate technical and organisational measures to protect it.",
        ],
      },
      {
        heading: "Your rights",
        body: [
          `Depending on your location, you may have rights to access, correct, or delete your personal information, or to object to certain processing. To exercise these rights, contact us at ${CONTACT}.`,
        ],
      },
      {
        heading: "Changes & contact",
        body: [
          `We may update this policy from time to time; the date above shows the latest version. Questions? Email ${CONTACT}.`,
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms & Conditions",
    updated: UPDATED,
    intro:
      "These terms govern your use of the Pakizm website and any orders you place. By using the site or ordering, you agree to them.",
    sections: [
      {
        heading: "About us",
        body: [
          "Pakizm is a manufacturer and exporter of orthopedic, dental and general surgery instruments in surgical stainless steel, operating since 2005.",
        ],
      },
      {
        heading: "Products & descriptions",
        body: [
          "We take care to describe our instruments accurately. Reference numbers and dimensions are provided for each item. Product images may be representative and finishes may vary slightly. Instruments are intended for use by qualified healthcare professionals.",
        ],
      },
      {
        heading: "Intended use & professional responsibility",
        body: [
          "Our instruments are supplied for professional surgical and medical use. It is the responsibility of the purchaser and end user to ensure appropriate selection, inspection, cleaning, sterilisation and safe use in accordance with applicable standards and the manufacturer's guidance. Pakizm is not liable for misuse, improper sterilisation or use outside intended purpose.",
        ],
      },
      {
        heading: "Orders & pricing",
        body: [
          "Prices shown are placeholders pending final pricing and may change. Unless stated otherwise, prices exclude shipping, taxes and import duties, which may be added at checkout or payable on delivery. We reserve the right to decline or cancel an order (for example, pricing errors or stock issues) and will refund any payment taken.",
        ],
      },
      {
        heading: "Payment",
        body: [
          "Payments are processed securely by Stripe. By placing an order you authorise us (via Stripe) to charge the applicable amount.",
        ],
      },
      {
        heading: "Shipping & returns",
        body: [
          "Delivery is governed by our Shipping Policy, and returns by our Refund & Returns Policy, each of which forms part of these terms.",
        ],
      },
      {
        heading: "Intellectual property",
        body: [
          "All content on this website — including text, images, logos and design — is owned by or licensed to Pakizm and may not be used without permission.",
        ],
      },
      {
        heading: "Limitation of liability",
        body: [
          "To the extent permitted by law, Pakizm's liability arising from your use of the site or purchase of products is limited to the amount paid for the relevant order. Nothing in these terms excludes liability that cannot be excluded by law.",
        ],
      },
      {
        heading: "Governing law & contact",
        body: [
          `These terms are governed by the laws of Pakistan. Questions about these terms can be sent to ${CONTACT}.`,
        ],
      },
    ],
  },
  {
    slug: "refund-returns",
    title: "Refund & Returns Policy",
    updated: UPDATED,
    intro:
      "We want you to be satisfied with your instruments. This policy explains when and how you can return items and receive a refund.",
    sections: [
      {
        heading: "Returns window",
        body: [
          "Unused instruments in their original, unopened packaging may be returned within 30 days of delivery. Items must be in resaleable condition.",
        ],
      },
      {
        heading: "Non-returnable items",
        body: ["For hygiene, safety and manufacturing reasons, the following cannot be returned:"],
        list: [
          "Instruments that have been used, sterilised or removed from sealed packaging.",
          "Custom, modified or OEM / private-label items made to your specification.",
        ],
      },
      {
        heading: "Lifetime guarantee on defects",
        body: [
          "Separately from returns, every Pakizm instrument carries a lifetime guarantee against manufacturing defects. If an instrument is defective, contact us and we will repair or replace it.",
        ],
      },
      {
        heading: "Damaged or incorrect items",
        body: [
          "If your order arrives damaged or incorrect, contact us within 7 days of delivery with photographs and we will arrange a replacement or refund at no cost to you.",
        ],
      },
      {
        heading: "How to return",
        body: [
          `Email ${CONTACT} with your order reference and the items you wish to return. We will provide return instructions. Return shipping costs are the customer's responsibility unless the item is defective, damaged or incorrect.`,
        ],
      },
      {
        heading: "Refunds",
        body: [
          "Once we receive and inspect the returned items, approved refunds are issued to your original payment method via Stripe, typically within 5–10 business days.",
        ],
      },
    ],
  },
  {
    slug: "cookies",
    title: "Cookie Policy",
    updated: UPDATED,
    intro:
      "This policy explains how Pakizm uses cookies and similar technologies, such as browser local storage, on this website.",
    sections: [
      {
        heading: "What cookies are",
        body: [
          "Cookies and local storage are small pieces of data stored on your device that help a website function and remember your preferences.",
        ],
      },
      {
        heading: "What we use",
        list: [
          "Essential — needed for the site to work, such as keeping the items in your cart (stored in your browser).",
          "Preferences — remembering choices such as filters or theme.",
          "Analytics (if enabled) — understanding how the site is used so we can improve it.",
        ],
      },
      {
        heading: "Managing cookies",
        body: [
          "On your first visit we show a banner so you can accept or decline non-essential cookies. You can also clear or block cookies through your browser settings; note that disabling essential cookies may affect how the site works (for example, the cart).",
        ],
      },
      {
        heading: "Changes & contact",
        body: [`We may update this policy over time. Questions? Email ${CONTACT}.`],
      },
    ],
  },
  {
    slug: "shipping",
    title: "Shipping Policy",
    updated: UPDATED,
    intro:
      "Pakizm ships orthopedic surgical instruments to distributors and healthcare providers worldwide. This policy explains how dispatch and delivery work.",
    sections: [
      {
        heading: "Processing time",
        body: [
          "Standard catalogue items are typically prepared for dispatch within a few business days. OEM, custom and large orders may take longer; we will confirm timing with you.",
        ],
      },
      {
        heading: "Worldwide shipping & costs",
        body: [
          "We ship internationally via established carriers. Shipping costs are calculated at checkout or quoted for larger orders, based on destination, weight and service.",
        ],
      },
      {
        heading: "Customs, duties & taxes",
        body: [
          "Import duties, taxes and customs charges are determined by the destination country and are the responsibility of the recipient unless agreed otherwise. Please check your local requirements before ordering.",
        ],
      },
      {
        heading: "Delivery & tracking",
        body: [
          "Estimated delivery times depend on destination and carrier. Where available, we provide tracking so you can follow your shipment.",
        ],
      },
      {
        heading: "Delays & issues",
        body: [
          `Occasionally shipments are delayed by customs or carriers. If your order has not arrived in the expected time, contact us at ${CONTACT} and we will help track it.`,
        ],
      },
    ],
  },
  {
    slug: "accessibility",
    title: "Accessibility Statement",
    updated: UPDATED,
    intro:
      "Pakizm is committed to making its website usable for as many people as possible, including those who rely on assistive technologies.",
    sections: [
      {
        heading: "Our commitment",
        body: [
          "We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA as a reference standard, and we continue to improve the experience over time.",
        ],
      },
      {
        heading: "What we do",
        list: [
          "Use semantic HTML and clear heading structure.",
          "Support keyboard navigation with visible focus states.",
          "Maintain readable colour contrast and legible typography.",
          "Provide text alternatives for meaningful images.",
          "Respect the 'reduce motion' setting for animations.",
          "Build layouts that adapt to phones, tablets and desktops.",
        ],
      },
      {
        heading: "Known limitations",
        body: [
          "Some product photography is being added over time, and a small number of images may not yet have full descriptions. We are actively improving coverage.",
        ],
      },
      {
        heading: "Feedback",
        body: [
          `If you encounter an accessibility barrier on this site, please let us know at ${CONTACT} so we can address it.`,
        ],
      },
    ],
  },
];

export function getPolicy(slug: string): Policy | undefined {
  return policies.find((p) => p.slug === slug);
}
