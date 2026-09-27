// Helpers shared by the API routes. Files in /api/_lib are not exposed as routes on Vercel.
export function allowPost(req, res) {
  if (req.method === 'POST') return true;
  res.setHeader('Allow', 'POST');
  res.status(405).json({ error: 'Method not allowed.' });
  return false;
}

export function readBody(req) {
  const body = req.body;
  if (!body) return {};
  if (typeof body === 'string') {
    try { return JSON.parse(body); } catch { return {}; }
  }
  return typeof body === 'object' ? body : {};
}

// Where Stripe should send people back to. SITE_URL wins; otherwise the current host.
export function siteUrl(req) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/+$/, '');
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  return `${proto}://${host}`;
}

// Every form has a hidden "company" field. People never see it; bots fill it in.
export const isBot = (body) => Boolean(body && body.company);

export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function serverError(res, err, message) {
  console.error(err);
  return res.status(502).json({ error: message });
}
