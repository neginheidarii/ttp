import { useState } from 'react';
import Modal from './Modal.jsx';
import { postJSON } from '../lib/api.js';
import { isEmail } from '../lib/validate.js';
import { money, formatDate, formatTime } from '../lib/format.js';
import { CheckIcon, MinusIcon, PlusIcon } from './Icons.jsx';

export default function TicketModal({ event, onClose }) {
  return (
    <Modal open={Boolean(event)} onClose={onClose} labelledBy="ticket-title">
      {event && <TicketForm key={event.id} event={event} onClose={onClose} />}
    </Modal>
  );
}

function TicketForm({ event, onClose }) {
  const [qty, setQty] = useState(() => Object.fromEntries(event.tiers.map((t, i) => [t.id, i === 0 ? 1 : 0])));
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState('form');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const count = Object.values(qty).reduce((a, b) => a + b, 0);
  const totalCents = event.tiers.reduce((sum, t) => sum + t.priceCents * (qty[t.id] || 0), 0);
  const noun = event.free ? (count === 1 ? 'spot' : 'spots') : count === 1 ? 'ticket' : 'tickets';

  function change(id, delta) {
    setQty((q) => ({ ...q, [id]: Math.max(0, Math.min(10, (q[id] || 0) + delta)) }));
    setError('');
  }

  async function submit(e) {
    e.preventDefault();
    const problem =
      count < 1 ? `Add at least one ${event.free ? 'spot' : 'ticket'} to continue.`
        : !name.trim() ? 'Enter your name.'
          : !isEmail(email) ? 'Enter an email address like name@example.com.'
            : '';
    if (problem) {
      setError(problem);
      return;
    }
    setError('');
    setLoading(true);
    try {
      const data = await postJSON('/api/tickets', { eventId: event.id, quantities: qty, name, email, company });
      if (data.url) {
        window.location.assign(data.url);
        return;
      }
      setStatus(data.demo ? 'demo' : 'registered');
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  const heading = (
    <div className="modal__head">
      <h2 id="ticket-title" className="modal__title">{event.title}</h2>
      <p className="modal__sub">
        {formatDate(event.date)} at {formatTime(event.date)}
        <br />
        {event.venue}, {event.city}
      </p>
    </div>
  );

  if (status !== 'form') {
    const demo = status === 'demo';
    return (
      <>
        {heading}
        <div className="form-done" role="status">
          <span className="form-done__icon"><CheckIcon /></span>
          <h3 className="form-done__title">
            {demo ? (event.free ? "Registration isn't connected yet" : "Ticket sales aren't connected yet") : "You're registered"}
          </h3>
          <p>
            {demo
              ? 'This site is running in demo mode, so nothing was booked or charged.'
              : `We've saved ${count} ${noun} for ${name.trim()}. A confirmation is on its way to ${email.trim()}.`}
          </p>
          <div className="form-done__actions">
            <button type="button" className="btn btn--navy" onClick={onClose}>Back to events</button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {heading}
      <form className="tickets" onSubmit={submit} noValidate>
        <ul className="tiers">
          {event.tiers.map((t) => (
            <li key={t.id} className="tier">
              <div className="tier__info">
                <span className="tier__name">{t.name}</span>
                <span className="tier__price">{event.free ? 'Free' : money(t.priceCents / 100)}</span>
                {!event.free && <span className="tier__note">{t.note}</span>}
              </div>
              <div className="stepper">
                <button type="button" onClick={() => change(t.id, -1)} aria-label={`Remove one ${t.name}`} disabled={!qty[t.id]}>
                  <MinusIcon />
                </button>
                <output aria-live="polite" aria-label={`${t.name} quantity`}>{qty[t.id]}</output>
                <button type="button" onClick={() => change(t.id, 1)} aria-label={`Add one ${t.name}`} disabled={qty[t.id] >= 10}>
                  <PlusIcon />
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="field-row">
          <label className="field">
            <span className="field-label">Your name</span>
            <input type="text" autoComplete="name" value={name} onChange={(e) => { setName(e.target.value); setError(''); }} />
          </label>
          <label className="field">
            <span className="field-label">Email</span>
            <input type="email" autoComplete="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(''); }} />
          </label>
        </div>
        <input className="hp" type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" value={company} onChange={(e) => setCompany(e.target.value)} />

        {!event.free && (
          <p className="tickets__total">
            <span>{count} {noun}</span>
            <strong>{money(totalCents / 100)}</strong>
          </p>
        )}

        {error && <p className="form-error" role="alert">{error}</p>}

        <button type="submit" className="btn btn--coral btn--block" disabled={loading}>
          {loading ? 'One moment…' : event.free ? `Register ${count} ${noun}` : 'Continue to checkout'}
        </button>
        {!event.free && <p className="fineprint"><span>You'll pay on Stripe's secure checkout. Your receipt arrives by email.</span></p>}
      </form>
    </>
  );
}
