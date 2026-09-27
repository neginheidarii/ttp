import Stripe from 'stripe';

let client = null;

// Returns null when no key is set, which puts donations and tickets in demo mode.
export function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) return null;
  if (!client) client = new Stripe(process.env.STRIPE_SECRET_KEY);
  return client;
}
