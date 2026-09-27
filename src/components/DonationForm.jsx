import { useState } from 'react';
import { site } from '../content/site.js';
import { donationTargets, findTarget } from '../content/partners.js';
import { money, currencySymbol } from '../lib/format.js';
import { isEmail } from '../lib/validate.js';
import { postJSON } from '../lib/api.js';
import { CheckIcon, LockIcon } from './Icons.jsx';

const FREQUENCIES = [
  ['monthly', 'Monthly'],
  ['once', 'One time']
];

// One form, two layouts: variant="modal" splits it into two steps,
// variant="page" shows everything at once.
export default function DonationForm({ variant = 'page', initialPartner = 'most', onDone }) {
  const stepped = variant === 'modal';
  const [frequency, setFrequency] = useState('monthly');
  const [amount, setAmount] = useState(site.donation.defaultAmount);
  const [other, setOther] = useState('');
  const [partner, setPartner] = useState(findTarget(initialPartner).id);
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [updates, setUpdates] = useState(true);
  const [company, setCompany] = useState(''); // spam trap, hidden from people
  const [step, setStep] = useState('choose');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const value = other ? Number(other) : amount;
  const summary = `${money(value || 0)}${frequency === 'monthly' ? ' monthly' : ''}`;

  function amountError() {
    if (!value || value < site.donation.min) return `Choose an amount or enter one of at least ${money(site.donation.min)}.`;
    if (value > site.donation.max) return `For gifts over ${money(site.donation.max)}, email us at ${site.email}.`;
    return '';
  }

  function next(e) {
    e.preventDefault();
    const problem = amountError();
    if (problem) {
      setError(problem);
      return;
    }
    setError('');
    setStep('details');
  }

  async function submit(e) {
    e.preventDefault();
    const problem =
      amountError() ||
      (!first.trim() ? 'Enter your first name.' : '') ||
      (!isEmail(email) ? 'Enter an email address like name@example.com.' : '');
    if (problem) {
      setError(problem);
      return;
    }
    setError('');
    setLoading(true);
    try {
      const data = await postJSON('/api/donate', {
        amount: value, frequency, partner, firstName: first, lastName: last, email, updates, company
      });
      if (data.url) {
        window.location.assign(data.url);
        return;
      }
      setStep('demo');
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  if (step === 'demo') {
    return (
      <div className="form-done" role="status">
        <span className="form-done__icon"><CheckIcon /></span>
        <h3 className="form-done__title">Payments aren't connected yet</h3>
        <p>
          This site is running in demo mode, so no payment was taken. Once Stripe is connected,
          this step opens secure checkout for your gift of {summary}.
        </p>
        <div className="form-done__actions">
          {onDone && <button type="button" className="btn btn--navy" onClick={onDone}>Back to the site</button>}
          <button type="button" className="text-button" onClick={() => setStep('choose')}>Start again</button>
        </div>
      </div>
    );
  }

  const showChoose = !stepped || step === 'choose';
  const showDetails = !stepped || step === 'details';

  return (
    <form className={`donation donation--${variant}`} onSubmit={stepped && step === 'choose' ? next : submit} noValidate>
      {showChoose && (
        <>
          <div className="segmented" role="radiogroup" aria-label="How often">
            {FREQUENCIES.map(([key, label]) => (
              <button
                key={key}
                type="button"
                role="radio"
                aria-checked={frequency === key}
                className={frequency === key ? 'is-on' : ''}
                onClick={() => setFrequency(key)}
              >
                {label}
              </button>
            ))}
          </div>

          <fieldset className="field-group">
            <legend className="field-label">Choose an amount</legend>
            <div className="amounts">
              {site.donation.amounts.map((a) => {
                const on = !other && amount === a;
                return (
                  <button
                    key={a}
                    type="button"
                    aria-pressed={on}
                    className={`amount${on ? ' is-on' : ''}`}
                    onClick={() => { setAmount(a); setOther(''); setError(''); }}
                  >
                    {money(a)}
                  </button>
                );
              })}
            </div>
            <label className="field-prefix">
              <span aria-hidden="true">{currencySymbol()}</span>
              <input
                type="text"
                inputMode="numeric"
                value={other}
                placeholder="Other amount"
                aria-label="Other amount"
                onChange={(e) => { setOther(e.target.value.replace(/[^0-9]/g, '').slice(0, 6)); setError(''); }}
              />
            </label>
            {frequency === 'monthly' && (
              <p className="hint">Monthly gifts give our partners steady support they can plan around. Change or cancel anytime.</p>
            )}
          </fieldset>

          <label className="field">
            <span className="field-label">Where should it go?</span>
            <select value={partner} onChange={(e) => setPartner(e.target.value)}>
              {donationTargets.map((t) => (
                <option key={t.id} value={t.id}>{t.label}</option>
              ))}
            </select>
          </label>
        </>
      )}

      {stepped && step === 'details' && (
        <button type="button" className="text-button donation__back" onClick={() => { setStep('choose'); setError(''); }}>
          Change amount ({summary})
        </button>
      )}

      {showDetails && (
        <>
          <div className="field-row">
            <label className="field">
              <span className="field-label">First name</span>
              <input type="text" autoComplete="given-name" value={first} onChange={(e) => { setFirst(e.target.value); setError(''); }} />
            </label>
            <label className="field">
              <span className="field-label">Last name</span>
              <input type="text" autoComplete="family-name" value={last} onChange={(e) => setLast(e.target.value)} />
            </label>
          </div>
          <label className="field">
            <span className="field-label">Email for your receipt</span>
            <input type="email" autoComplete="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(''); }} />
          </label>
          <label className="check">
            <input type="checkbox" checked={updates} onChange={(e) => setUpdates(e.target.checked)} />
            <span>Send me updates on what my gift makes possible</span>
          </label>
          <input className="hp" type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" value={company} onChange={(e) => setCompany(e.target.value)} />
        </>
      )}

      {error && <p className="form-error" role="alert">{error}</p>}

      <button type="submit" className="btn btn--coral btn--block" disabled={loading}>
        {stepped && step === 'choose'
          ? `Continue with ${summary}`
          : loading
            ? 'Opening secure checkout…'
            : `Donate ${summary}`}
      </button>

      {showDetails && (
        <p className="fineprint">
          <LockIcon width={16} height={16} />
          <span>Card details are entered on Stripe's secure checkout. {site.charityNumber}</span>
        </p>
      )}
    </form>
  );
}
