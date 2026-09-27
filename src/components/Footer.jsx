import { Link } from 'react-router-dom';
import { site } from '../content/site.js';
import { InstagramIcon, LinkedInIcon, YouTubeIcon } from './Icons.jsx';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <img className="footer__logo" src="/media/logo-white.png" alt="The TEACH Project: Training and Education for All Children" width="110" height="200" />
          <div className="footer__col">
            <h2>Explore</h2>
            <Link to="/">Our story</Link>
            <Link to="/events">Events</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/blog">Field notes</Link>
          </div>
          <div className="footer__col">
            <h2>Get involved</h2>
            <Link to="/donate">Donate</Link>
            <Link to="/volunteer">Volunteer</Link>
            <a href={`mailto:${site.email}?subject=Partnering%20with%20The%20TEACH%20Project`}>Partner with us</a>
            <a href={`mailto:${site.email}?subject=Sponsoring%20an%20event`}>Sponsor an event</a>
          </div>
          <div className="footer__col">
            <h2>Contact</h2>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <div className="footer__social">
              <a href={site.social.instagram} aria-label="Instagram" target="_blank" rel="noreferrer"><InstagramIcon /></a>
              <a href={site.social.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer"><LinkedInIcon /></a>
              <a href={site.social.youtube} aria-label="YouTube" target="_blank" rel="noreferrer"><YouTubeIcon /></a>
            </div>
          </div>
        </div>
        <div className="footer__base">
          <span>© {new Date().getFullYear()} {site.name}. {site.charityNumber}</span>
        </div>
      </div>
    </footer>
  );
}
