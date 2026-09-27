import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import TicketModal from '../components/TicketModal.jsx';
import { upcomingEvents, pastEvents } from '../content/events.js';
import { site } from '../content/site.js';
import { dateParts, formatDate, formatTime, money } from '../lib/format.js';
import { useDocumentTitle } from '../lib/hooks.js';

function priceLabel(event) {
  if (event.free) return 'Free, registration required';
  const lowest = Math.min(...event.tiers.map((t) => t.priceCents));
  return `${event.tiers.length > 1 ? 'From ' : ''}${money(lowest / 100)}`;
}

export default function Events() {
  useDocumentTitle('Events');
  const [params, setParams] = useSearchParams();
  const [active, setActive] = useState(null);
  const close = useCallback(() => setActive(null), []);
  const upcoming = upcomingEvents();
  const past = pastEvents();
  const canceled = params.get('canceled') === '1';

  return (
    <>
      <section className="page-hero page-hero--split" aria-labelledby="events-title">
        <div className="page-hero__copy">
          <h1 id="events-title" className="display-1">Events</h1>
          <p className="lede lede--lg">Gather with our community, meet the NGOs we feature, and raise money for education, in person.</p>
          <div className="page-hero__actions">
            <a href="#upcoming" className="btn btn--navy btn--lg">See upcoming events</a>
            <a href="#past" className="text-link">Past events</a>
          </div>
        </div>
        <img className="page-hero__img" src="/media/tree-gathering.jpg" alt="Children and adults gathered under a large tree" />
      </section>

      <section id="upcoming" className="section" aria-labelledby="upcoming-title">
        <div className="container">
          <h2 id="upcoming-title" className="display-3 section-title">Upcoming</h2>
          {canceled && (
            <div className="notice" role="status">
              <p>Checkout was canceled, so you weren't charged. You can choose your tickets again below.</p>
              <button type="button" className="text-button" onClick={() => setParams({}, { replace: true })}>Dismiss</button>
            </div>
          )}
          {upcoming.length === 0 ? (
            <p className="empty">No events are scheduled right now. Subscribe to our newsletter to hear about the next one first.</p>
          ) : (
            <div className="event-list">
              {upcoming.map((e) => {
                const d = dateParts(e.date);
                return (
                  <article key={e.id} className="event-row">
                    <div className="event-row__date">
                      <span className="event-row__day">{d.day}</span>
                      <span className="event-row__month">{d.month} {d.year}</span>
                    </div>
                    <img src={e.image} alt={e.imageAlt} loading="lazy" />
                    <div className="event-row__body">
                      <span className="tag">{e.kind}</span>
                      <h3 className="event-row__title">{e.title}</h3>
                      <p className="event-row__meta">{e.venue}, {e.city} at {formatTime(e.date)}</p>
                      <p>{e.summary}</p>
                    </div>
                    <div className="event-row__action">
                      <span className="event-row__price">{priceLabel(e)}</span>
                      <button type="button" className={`btn ${e.free ? 'btn--outline' : 'btn--coral'}`} onClick={() => setActive(e)}>
                        {e.free ? 'Register' : 'Get tickets'}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {past.length > 0 && (
        <section id="past" className="section section--mist" aria-labelledby="past-title">
          <div className="container">
            <h2 id="past-title" className="display-3">Past events</h2>
            <p className="lede">A look back at what our community has made possible.</p>
            <div className="card-grid">
              {past.slice(0, 6).map((e) => (
                <figure key={e.id} className="past-card">
                  <img src={e.image} alt={e.imageAlt} loading="lazy" />
                  <h3 className="past-card__title">{e.title}</h3>
                  <p className="muted">{formatDate(e.date)}, {e.city}</p>
                  <p>{e.recap}</p>
                  {e.photosUrl && <a href={e.photosUrl} className="text-link">View photos</a>}
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="cta-band" aria-labelledby="sponsor-title">
        <div className="container cta-band__inner">
          <div>
            <h2 id="sponsor-title" className="display-3">Host or sponsor an event</h2>
            <p className="lede">Partner with us on an evening, a run or a school supply drive. Every event ties back to our mission: ending learning poverty.</p>
          </div>
          <div className="cta-band__actions">
            <a href={`mailto:${site.email}?subject=Hosting%20or%20sponsoring%20an%20event`} className="btn btn--navy btn--lg">Get in touch</a>
          </div>
        </div>
      </section>

      <TicketModal event={active} onClose={close} />
    </>
  );
}
