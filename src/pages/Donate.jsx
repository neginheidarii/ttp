import { Link, useSearchParams } from 'react-router-dom';
import DonationForm from '../components/DonationForm.jsx';
import { site } from '../content/site.js';
import { useDocumentTitle } from '../lib/hooks.js';

const FLOW = [
  { title: 'You give', text: "Choose an amount, once or every month, and where you'd like it to go." },
  { title: 'We pass it on', text: "Your gift goes to the vetted partner NGOs we feature, the ones you've read about here." },
  { title: 'They put it to work', text: 'Partners use it where it matters most for the children in their programs, and we share what it made possible.' }
];

const FAQ = [
  { q: 'Is the organization officially registered?', a: 'Yes. Legal name: The TEACH Project Foundation. Federally incorporated in Canada. Corporation No. 1648069-1.' },
  { q: 'Can I change or cancel a monthly gift?', a: `Yes. Email ${site.email} and we'll update or cancel it right away.` },
  { q: 'How do you choose partner NGOs?', a: 'Every partner goes through our vetting process before we feature them. [Summary of selection criteria, to be published in the updated brand document.]' },
  { q: 'Where does my donation go?', a: "To the partner NGO you choose, or where it's needed most across our current partners." }
];

export default function Donate() {
  useDocumentTitle('Donate');
  const [params, setParams] = useSearchParams();
  const canceled = params.get('canceled') === '1';

  return (
    <>
      <section className="donate-hero" aria-labelledby="donate-title">
        <div className="donate-hero__media">
          <img src="/media/lineup-wall.jpg" alt="A row of children standing against a concrete wall" />
          <div className="donate-hero__stat">
            <p>About 70% of 10-year-olds in low- and middle-income countries can't read a simple text.</p>
            <p className="donate-hero__source">Source: {site.statSource}.</p>
          </div>
        </div>
        <div className="donate-hero__form">
          <h1 id="donate-title" className="display-2">Partner with communities expanding equitable education.</h1>
          <p className="lede">Support trusted local NGOs through one-time gifts, monthly giving, and long-term collaboration.</p>
          {canceled && (
            <div className="notice" role="status">
              <p>Checkout was canceled, so you weren't charged.</p>
              <button type="button" className="text-button" onClick={() => setParams({}, { replace: true })}>Dismiss</button>
            </div>
          )}
          <DonationForm variant="page" initialPartner={params.get('partner') || 'most'} />
        </div>
      </section>

      <section className="section section--mist" aria-labelledby="flow-title">
        <div className="container">
          <h2 id="flow-title" className="display-3">Where your money goes</h2>
          <ol className="steps">
            {FLOW.map((s, i) => (
              <li key={s.title}>
                <span className="steps__num">Step {i + 1}</span>
                <h3 className="steps__title">{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="ways-title">
        <div className="container">
          <h2 id="ways-title" className="display-3 section-title">Other ways to give</h2>
          <div className="ways">
            <Link to="/events" className="way">
              <h3 className="way__title">Come to an event</h3>
              <p>Ticket sales support our partner NGOs, and you'll meet the community behind them.</p>
              <span className="way__cta">See events</span>
            </Link>
            <Link to="/volunteer" className="way">
              <h3 className="way__title">Volunteer</h3>
              <p>Give your time and skills at events, in creative work or behind the scenes.</p>
              <span className="way__cta">Apply to volunteer</span>
            </Link>
            <a href={`mailto:${site.email}?subject=Sponsorship`} className="way">
              <h3 className="way__title">Sponsor</h3>
              <p>Businesses can sponsor an event or project and help us reach more people.</p>
              <span className="way__cta">Get in touch</span>
            </a>
          </div>
        </div>
      </section>

      <section id="faq" className="section section--mist" aria-labelledby="faq-title">
        <div className="container faq">
          <h2 id="faq-title" className="display-3">Questions</h2>
          <div className="faq__list">
            {FAQ.map((f, i) => (
              <details key={f.q} className="faq__item" open={i === 0}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
