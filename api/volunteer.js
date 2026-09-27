// POST /api/volunteer: emails the application to your team inbox.
// Applicants who opt in are also added to Mailchimp with a "volunteer" tag.
import { emailReady, sendEmail } from './_lib/email.js';
import { mailchimpReady, upsertMember } from './_lib/mailchimp.js';
import { allowPost, readBody, isBot, escapeHtml, serverError } from './_lib/http.js';
import { isEmail, clean } from '../src/lib/validate.js';

const list = (value, max = 12) =>
  Array.isArray(value) ? value.slice(0, max).map((v) => clean(v, 60)).filter(Boolean) : [];

export default async function handler(req, res) {
  if (!allowPost(req, res)) return;
  const body = readBody(req);
  if (isBot(body)) return res.status(200).json({ ok: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const services = list(body.services);
  if (!name) return res.status(400).json({ error: 'Enter your full name.' });
  if (!isEmail(email)) return res.status(400).json({ error: 'Enter an email address like name@example.com.' });
  if (!services.length) return res.status(400).json({ error: "Choose at least one way you'd like to help." });

  const phone = clean(body.phone, 40);
  const city = clean(body.city, 80);
  const times = list(body.times, 6);
  const commitment = clean(body.commitment, 60);
  const notes = clean(body.notes, 2000);
  const optIn = Boolean(body.optIn);

  if (!emailReady()) return res.status(200).json({ demo: true });

  const rows = [
    ['Name', name],
    ['Email', email],
    ['Phone', phone || 'Not given'],
    ['City', city || 'Not given'],
    ['Wants to help with', services.join(', ')],
    ['Available', times.join(', ') || 'Not given'],
    ['Time commitment', commitment || 'Not given'],
    ['Wants volunteer emails', optIn ? 'Yes' : 'No']
  ];
  const html = `<h2>New volunteer application</h2>
    <table cellpadding="6" style="border-collapse:collapse">
      ${rows.map(([k, v]) => `<tr><td style="vertical-align:top;color:#5a6080"><strong>${k}</strong></td><td>${escapeHtml(v)}</td></tr>`).join('')}
    </table>
    ${notes ? `<p><strong>Anything else</strong></p><p style="white-space:pre-line">${escapeHtml(notes)}</p>` : ''}`;

  try {
    await sendEmail({ to: process.env.TEAM_INBOX, replyTo: email, subject: `Volunteer application: ${name}`, html });
  } catch (err) {
    return serverError(res, err, "We couldn't send your application. Please try again, or email us directly.");
  }

  if (optIn && mailchimpReady()) {
    const [firstName, ...rest] = name.split(/\s+/);
    try {
      await upsertMember(email, { tags: ['volunteer'], firstName, lastName: rest.join(' ') });
    } catch (err) {
      console.error('Mailchimp volunteer sign-up failed', err); // The application itself was sent.
    }
  }

  return res.status(200).json({ ok: true });
}
