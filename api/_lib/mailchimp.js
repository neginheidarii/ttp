import crypto from 'node:crypto';

export function mailchimpReady() {
  return Boolean(process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_SERVER_PREFIX && process.env.MAILCHIMP_AUDIENCE_ID);
}

// Adds someone to the audience (or updates them if they're already there) and applies tags.
export async function upsertMember(email, { tags = [], firstName = '', lastName = '' } = {}) {
  const hash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
  const url = `https://${process.env.MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_AUDIENCE_ID}/members/${hash}`;
  const headers = {
    Authorization: `Basic ${Buffer.from(`teach:${process.env.MAILCHIMP_API_KEY}`).toString('base64')}`,
    'Content-Type': 'application/json'
  };
  const mergeFields = {};
  if (firstName) mergeFields.FNAME = firstName;
  if (lastName) mergeFields.LNAME = lastName;

  const res = await fetch(url, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ email_address: email, status_if_new: 'subscribed', merge_fields: mergeFields })
  });
  if (!res.ok) throw new Error(`Mailchimp ${res.status}: ${await res.text()}`);

  if (tags.length) {
    const tagRes = await fetch(`${url}/tags`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ tags: tags.map((name) => ({ name, status: 'active' })) })
    });
    if (!tagRes.ok) console.error(`Mailchimp tags ${tagRes.status}: ${await tagRes.text()}`);
  }
}
