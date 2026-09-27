import { useState } from 'react';
import { Link } from 'react-router-dom';
import { postJSON } from '../lib/api.js';
import { isEmail } from '../lib/validate.js';
import { useDocumentTitle } from '../lib/hooks.js';
import { CheckIcon } from '../components/Icons.jsx';

const ROLES = [
  { title: 'Events', text: 'Set up, host and run our gatherings.' },
  { title: 'Creative', text: 'Photography, video, design and writing.' },
  { title: 'Outreach', text: 'Social media, advocacy and community building.' },
  { title: 'Fundraising', text: 'Sponsorships, campaigns and partnerships.' }
];
const SERVICES = ['Event support', 'Photography and video', 'Design', 'Social media', 'Writing and translation', 'Fundraising', 'Tutoring and education', 'Web and tech'];
const TIMES = ['Weekdays', 'Weekday evenings', 'Weekends'];
const COMMITMENT = ['A few hours a month', 'A few hours a week', 'Just for events'];
const STEPS = [
  { title: 'Tell us about you', text: 'Share your skills and availability.' },
  { title: 'We find a fit', text: 'We match you with a role and get in touch by email.' },
  { title: 'Get started', text: 'Join your first event or project with the team.' }
];

const EMPTY = { name: '', email: '', phone: '', city: '', services: [], times: [], commitment: '', notes: '', optIn: true, company: '' };

export default function Volunteer() {
  useDocumentTitle('Volunteer');
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('form');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
    setError('');
  };
  const toggle = (key, value) => () => {
    setForm((f) => ({ ...f, [key]: f[key].includes(value) ? f[key].filter((x) => x !== value) : [...f[key], value] }));
    setError('');
  };

  async function submit(e) {
    e.preventDefault();
    const problem =
      !form.name.trim() ? 'Enter your full name.'
        : !isEmail(form.email) ? 'Enter an email address like name@example.com.'
          : form.services.length === 0 ? "Choose at least one way you'd like to help."
            : '';
    if (problem) {
      setError(problem);
      return;
    }
    setError('');
    setLoading(true);
    try {
      const data = await postJSON('/api/volunteer', form);
      setStatus(data.demo ? 'demo' : 'sent');
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  const firstName = form.name.trim().split(/\s+/)[0] || 'friend';

  return (
    <>
      <section className="page-hero page-hero--split" aria-labelledby="vol-title">
        <div className="page-hero__copy">
          <h1 id="vol-title" className="display-1">Volunteer</h1>
          <p className="lede lede--lg">Give your time and skills to help more people understand learning poverty, and act on it.</p>
          <div className="roles">
            {ROLES.map((r) => (
              <div key={r.title}>
                <h2 className="roles__title">{r.title}</h2>
                <p>{r.text}</p>
              </div>
            ))}
          </div>
          <div className="page-hero__actions">
            <a href="#apply" className="btn btn--navy btn--lg">Apply to volunteer</a>
          </div>
        </div>
        <img className="page-hero__img" src="/media/backpack-handout.jpg" alt="Adults handing backpacks to children outdoors" />
      </section>

      <section id="apply" className="section section--mist" aria-labelledby="apply-title">
        <div className="container apply">
          <div className="apply__intro">
            <h2 id="apply-title" className="display-3">Apply to volunteer</h2>
            <p className="lede">It takes about three minutes. Tell us what you're good at and when you're free.</p>
            <ol className="numbered">
              {STEPS.map((s, i) => (
                <li key={s.title}>
                  <span className="numbered__num" aria-hidden="true">{i + 1}</span>
                  <div>
                    <h3 className="numbered__title">{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="panel">
            {status === 'form' ? (
              <form className="apply__form" onSubmit={submit} noValidate>
                <div className="field-row">
                  <label className="field"><span className="field-label">Full name</span><input type="text" autoComplete="name" value={form.name} onChange={set('name')} /></label>
                  <label className="field"><span className="field-label">Email</span><input type="email" autoComplete="email" value={form.email} onChange={set('email')} /></label>
                  <label className="field"><span className="field-label">Phone (optional)</span><input type="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} /></label>
                  <label className="field"><span className="field-label">City</span><input type="text" autoComplete="address-level2" value={form.city} onChange={set('city')} /></label>
                </div>

                <fieldset className="field-group">
                  <legend className="field-legend">How would you like to help?</legend>
                  <p className="hint">Choose all that apply.</p>
                  <div className="chips">
                    {SERVICES.map((s) => (
                      <label key={s} className={`chip chip--check${form.services.includes(s) ? ' is-on' : ''}`}>
                        <input type="checkbox" checked={form.services.includes(s)} onChange={toggle('services', s)} />
                        <span>{s}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="field-group">
                  <legend className="field-legend">When are you available?</legend>
                  <div className="chips">
                    {TIMES.map((t) => (
                      <label key={t} className={`chip chip--check${form.times.includes(t) ? ' is-on' : ''}`}>
                        <input type="checkbox" checked={form.times.includes(t)} onChange={toggle('times', t)} />
                        <span>{t}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="field-group">
                  <legend className="field-legend">How much time can you give?</legend>
                  <div className="segmented segmented--3">
                    {COMMITMENT.map((c) => (
                      <label key={c} className={form.commitment === c ? 'is-on' : ''}>
                        <input type="radio" name="commitment" value={c} checked={form.commitment === c} onChange={set('commitment')} />
                        <span>{c}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <label className="field">
                  <span className="field-legend">Anything else we should know?</span>
                  <textarea rows={4} value={form.notes} onChange={set('notes')} placeholder="Languages you speak, past volunteering, ideas you'd like to bring" />
                </label>

                <label className="check">
                  <input type="checkbox" checked={form.optIn} onChange={set('optIn')} />
                  <span>Email me about new volunteer opportunities</span>
                </label>
                <input className="hp" type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" value={form.company} onChange={set('company')} />

                {error && <p className="form-error" role="alert">{error}</p>}
                <button type="submit" className="btn btn--coral btn--lg" disabled={loading}>
                  {loading ? 'Sending…' : 'Send application'}
                </button>
              </form>
            ) : (
              <div className="form-done" role="status">
                <span className="form-done__icon"><CheckIcon /></span>
                <h3 className="form-done__title">
                  {status === 'sent' ? `Thanks, ${firstName}.` : "Applications aren't connected yet"}
                </h3>
                <p>
                  {status === 'sent'
                    ? `We've got your application and will email ${form.email.trim()} about next steps.`
                    : "This site is running in demo mode, so your application wasn't sent anywhere."}
                </p>
                <div className="form-done__actions">
                  <Link to="/events" className="btn btn--navy">See upcoming events</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
