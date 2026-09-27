import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../lib/hooks.js';

export default function NotFound({ message = "We couldn't find that page." }) {
  useDocumentTitle('Page not found');
  return (
    <section className="section thanks" aria-labelledby="nf-title">
      <div className="container thanks__inner">
        <h1 id="nf-title" className="display-2">Page not found</h1>
        <p className="lede">{message}</p>
        <div className="thanks__actions">
          <Link to="/" className="btn btn--navy btn--lg">Go to the home page</Link>
          <Link to="/blog" className="text-link">Read our field notes</Link>
        </div>
      </div>
    </section>
  );
}
