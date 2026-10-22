import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY;

/** null until a real STRIPE_SECRET_KEY is set in .env — the app builds either way. */
export const stripe = key ? new Stripe(key) : null;
