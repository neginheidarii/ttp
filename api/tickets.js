// POST /api/tickets: paid events go to Stripe Checkout; free events are registered by email.
// Prices always come from src/content/events.js, never from the browser.
import { getStripe } from './_lib/stripe.js';
import { emailReady, sendEmail } from './_lib/email.js';
import { allowPost, readBody, siteUrl, isBot, escapeHtml, serverError } from './_lib/http.js';
import { isEmail, clean } from '../src/lib/validate.js';
import { formatDate, formatTime } from '../src/lib/format.js';
import { site } from '../src/content/site.js';
import { findEvent, isUpcoming } from '../src/content/events.js';

export default async function handler(req, res) {
  if (!allowPost(req, res)) return;
  const body = readBody(req);
  if (isBot(body)) return res.status(200).json({ ok: true });

  const event = findEvent(clean(body.eventId, 100));
  if (!event || !Array.isArray(event.tiers) || !isUpcoming(event)) {
    return res.status(400).json({ error: 'This event is no longer available.' });
  }
  const name = clean(body.name, 120);
  if (!name) return res.status(400).json({ error: 'Enter your name.' });
  const email = clean(body.email, 200);
  if (!isEmail(email)) return res.status(400).json({ error: 'Enter an email address like name@example.com.' });

  const quantities = body.quantities && typeof body.quantities === 'object' ? body.quantities : {};
  const chosen = [];
  for (const tier of event.tiers) {
    const q = Number(quantities[tier.id] || 0);
    if (!Number.isInteger(q) || q < 0 || q > 10) {
      return res.status(400).json({ error: 'Choose between 0 and 10 of each ticket.' });
    }
    if (q > 0) chosen.push({ tier, q });
  }
  if (!chosen.length) return res.status(400).json({ error: 'Add at least one ticket to continue.' });

  const count = chosen.reduce((sum, c) => sum + c.q, 0);
  const summary = chosen.map((c) => `${c.q} x ${c.tier.name}`).join(', ');
  const when = `${formatDate(event.date)} at ${formatTime(event.date)}`;

  if (event.free) {
    if (!emailReady()) return res.status(200).json({ demo: true });
    try {
      await sendEmail({
        to: process.env.TEAM_INBOX,
        replyTo: email,
        subject: `Registration: ${event.title} (${count})`,
        html: `<h2>New registration</h2>
          <p><strong>Event:</strong> ${escapeHtml(event.title)}, ${escapeHtml(when)}</p>
          <p><strong>Name:</strong> ${escapeHtml(name)}<br><strong>Email:</strong> ${escapeHtml(email)}<br><strong>Spots:</strong> ${count}</p>`
      });
    } catch (err) {
      return serverError(res, err, "We couldn't complete your registration. Please try again.");
    }
    try {
      await sendEmail({
        to: email,
        subject: `You're registered: ${event.title}`,
        html: `<p>Hi ${escapeHtml(name)},</p>
          <p>You're registered for <strong>${escapeHtml(event.title)}</strong> on ${escapeHtml(when)}, at ${escapeHtml(event.venue)}, ${escapeHtml(event.city)}.
          We've saved ${count} ${count === 1 ? 'spot' : 'spots'} for you.</p>
          <p>See you there,<br>${escapeHtml(site.name)}</p>`
      });
    } catch (err) {
      console.error('Confirmation email failed', err); // The team still has the registration.
    }
    return res.status(200).json({ registered: true });
  }

  const stripe = getStripe();
  if (!stripe) return res.status(200).json({ demo: true });

  try {
    const origin = siteUrl(req);
    const metadata = { event_id: event.id, event_title: event.title, attendee_name: name, tickets: summary };
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email,
      line_items: chosen.map(({ tier, q }) => ({
        quantity: q,
        price_data: {
          currency: site.currency,
          unit_amount: tier.priceCents,
          product_data: { name: `${event.title}: ${tier.name}`, description: when }
        }
      })),
      metadata,
      payment_intent_data: { metadata },
      success_url: `${origin}/thank-you?type=tickets&event=${encodeURIComponent(event.id)}`,
      cancel_url: `${origin}/events?canceled=1`
    });
    return res.status(200).json({ url: session.url });
  } catch (err) {
    return serverError(res, err, "We couldn't start checkout. Please try again in a moment.");
  }
}
