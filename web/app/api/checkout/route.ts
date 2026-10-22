import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { variantInfo } from "@/lib/catalog";

type InItem = { ref: string; qty: number };

export async function POST(req: Request) {
  if (!stripe) {
    return NextResponse.json(
      { error: "Checkout is not configured yet — add your Stripe keys to .env." },
      { status: 400 },
    );
  }

  let items: InItem[] = [];
  try {
    ({ items } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  // price & details come from the server catalog, never the client
  const line_items: Array<Record<string, unknown>> = [];
  for (const it of items) {
    const info = variantInfo(it.ref);
    const qty = Math.max(1, Math.min(999, Math.floor(Number(it.qty) || 1)));
    if (!info) continue;
    line_items.push({
      quantity: qty,
      price_data: {
        currency: "usd",
        unit_amount: Math.round(info.price * 100),
        product_data: {
          name: info.name,
          description: `${it.ref}${info.spec ? ` · ${info.spec}` : ""}`,
        },
      },
    });
  }
  if (line_items.length === 0) {
    return NextResponse.json({ error: "No valid items in cart." }, { status: 400 });
  }

  const origin =
    req.headers.get("origin") ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      line_items: line_items as any,
      success_url: `${origin}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      shipping_address_collection: {
        allowed_countries: ["US", "GB", "CA", "AU", "AE", "SA", "PK", "DE", "FR"],
      },
    });
    return NextResponse.json({ url: session.url });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Stripe error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
