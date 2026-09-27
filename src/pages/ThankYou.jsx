import { Link, useSearchParams } from 'react-router-dom';
import { findEvent } from '../content/events.js';
import { useDocumentTitle } from '../lib/hooks.js';
import { CheckIcon } from '../components/Icons.jsx';

// Stripe sends people here after a successful checkout.
export default function ThankYou() {
  useDocumentTitle('Thank you');
  const [params] = useSearchParams();
  const isTickets = params.get('type') === 'tickets';
  const event = isTickets ? findEvent(params.get('event')) : null;

  const title = isTickets
    ? event ? `You're going to ${event.title}` : "You're going"
    : 'Thank you for your donation';
  const text = isTickets
    ? "Your receipt is on its way by email. We'll check you in by name at the door."
    : 'Your receipt is on its way by email. Your support goes to partner NGOs working to end learning poverty.';

  return (
    <section className="section thanks" aria-labelledby="thanks-title">
      <div className="container thanks__inner">
        <span className="form-done__icon form-done__icon--lg"><CheckIcon width={30} height={30} /></span>
        <h1 id="thanks-title" className="display-2">{title}</h1>
        <p className="lede">{text}</p>
        <div className="thanks__actions">
          <Link to="/" className="btn btn--navy btn--lg">Back to our story</Link>
          <Link to="/volunteer" className="text-link">Volunteer with us</Link>
        </div>
      </div>
    </section>
  );
}
