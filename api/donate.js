// POST /api/donate: starts a Stripe Checkout session for a one-time or monthly donation.
import { getStripe } from './_lib/stripe.js';
import { allowPost, readBody, siteUrl, isBot, serverError } from './_lib/http.js';
import { isEmail, clean } from '../src/lib/validate.js';
import { money } from '../src/lib/format.js';
import { site } from '../src/content/site.js';
import { findTarget } from '../src/content/partners.js';

export default async function handler(req, res) {
  if (!allowPost(req, res)) return;
  const body = readBody(req);
  if (isBot(body)) return res.status(200).json({ ok: true });

  const amount = Number(body.amount);
  const { min, max } = site.donation;
  if (!Number.isFinite(amount) || amount < min || amount > max) {
    return res.status(400).json({ error: `Enter an amount between ${money(min)} and ${money(max)}.` });
  }
  const frequency = body.frequency === 'monthly' || body.frequency === 'once' ? body.frequency : null;
  if (!frequency) return res.status(400).json({ error: 'Choose monthly or one time.' });
  const firstName = clean(body.firstName, 100);
  if (!firstName) return res.status(400).json({ error: 'Enter your first name.' });
  const email = clean(body.email, 200);
  if (!isEmail(email)) return res.status(400).json({ error: 'Enter an email address like name@example.com.' });
  const lastName = clean(body.lastName, 100);
  const target = findTarget(clean(body.partner, 60));

  const stripe = getStripe();
  if (!stripe) return res.status(200).json({ demo: true });

  const monthly = frequency === 'monthly';
  const metadata = {
    partner: target.id,
    partner_name: target.label,
    first_name: firstName,
    last_name: lastName,
    updates_opt_in: body.updates ? 'yes' : 'no'
  };

  try {
    const origin = siteUrl(req);
    const session = await stripe.checkout.sessions.create({
      mode: monthly ? 'subscription' : 'payment',
      customer_email: email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: site.currency,
            unit_amount: Math.round(amount * 100),
            product_data: {
              name: monthly ? 'Monthly donation' : 'Donation',
              description: `Supporting ${target.label}`
            },
            ...(monthly ? { recurring: { interval: 'month' } } : {})
          }
        }
      ],
      metadata,
      ...(monthly
        ? { subscription_data: { metadata } }
        : { submit_type: 'donate', payment_intent_data: { metadata } }),
      success_url: `${origin}/thank-you?type=donation&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/donate?canceled=1`
    });
    return res.status(200).json({ url: session.url });
  } catch (err) {
    return serverError(res, err, "We couldn't start checkout. Please try again in a moment.");
  }
}
