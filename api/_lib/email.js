// Sends email through Resend (https://resend.com). Swap this file to use another provider.
export function emailReady() {
  return Boolean(process.env.RESEND_API_KEY && process.env.FROM_EMAIL && process.env.TEAM_INBOX);
}

export async function sendEmail({ to, subject, html, replyTo }) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: process.env.FROM_EMAIL,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {})
    })
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}
