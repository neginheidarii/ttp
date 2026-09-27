import { useState } from 'react';
import { postJSON } from '../lib/api.js';
import { isEmail } from '../lib/validate.js';

export default function Newsletter({ title = 'Stories from the classroom, once a month.' }) {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  async function submit(e) {
    e.preventDefault();
    if (!isEmail(email)) {
      setError('Enter an email address like name@example.com.');
      return;
    }
    setError('');
    setStatus('loading');
    try {
      const data = await postJSON('/api/subscribe', { email, company });
      setStatus(data.demo ? 'demo' : 'done');
    } catch (err) {
      setError(err.message);
      setStatus('idle');
    }
  }

  return (
    <section className="newsletter" aria-labelledby="newsletter-title">
      <div className="container newsletter__inner">
        <h2 id="newsletter-title" className="newsletter__title">{title}</h2>
        <div>
          {status === 'done' || status === 'demo' ? (
            <div role="status" className="newsletter__done">
              <p className="newsletter__done-title">{status === 'done' ? "You're subscribed." : "Sign-ups aren't connected yet."}</p>
              <p>
                {status === 'done'
                  ? `The next story will land in ${email.trim()}.`
                  : "This site is running in demo mode, so your address wasn't saved."}
              </p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <label htmlFor="newsletter-email" className="field-label">Email address</label>
              <div className="newsletter__row">
                <input
                  id="newsletter-email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                />
                <button type="submit" className="btn btn--navy" disabled={status === 'loading'}>
                  {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
                </button>
              </div>
              <input className="hp" type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" value={company} onChange={(e) => setCompany(e.target.value)} />
              {error && <p className="newsletter__error" role="alert">{error}</p>}
              <p className="newsletter__note">One email a month. Unsubscribe anytime.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
