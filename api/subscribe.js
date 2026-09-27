// POST /api/subscribe: adds an email address to the Mailchimp audience.
import { mailchimpReady, upsertMember } from './_lib/mailchimp.js';
import { allowPost, readBody, isBot, serverError } from './_lib/http.js';
import { isEmail, clean } from '../src/lib/validate.js';

export default async function handler(req, res) {
  if (!allowPost(req, res)) return;
  const body = readBody(req);
  if (isBot(body)) return res.status(200).json({ ok: true });

  const email = clean(body.email, 200);
  if (!isEmail(email)) return res.status(400).json({ error: 'Enter an email address like name@example.com.' });
  if (!mailchimpReady()) return res.status(200).json({ demo: true });

  try {
    await upsertMember(email, { tags: ['newsletter'] });
    return res.status(200).json({ ok: true });
  } catch (err) {
    return serverError(res, err, "We couldn't sign you up just now. Please try again.");
  }
}
