import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useDonate } from './DonateContext.jsx';
import { CloseIcon, MenuIcon } from './Icons.jsx';

const LINKS = [
  { to: '/', label: 'Our story' },
  { to: '/events', label: 'Events' },
  { to: '/projects', label: 'Projects' },
  { to: '/blog', label: 'Field notes' },
  { to: '/volunteer', label: 'Volunteer' }
];

export default function Nav() {
  const { openDonate } = useDonate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="nav">
      <div className="container nav__inner">
        <Link to="/" className="brand" aria-label="The TEACH Project, home">
          <img src="/media/logo-icon.png" alt="" width="42" height="52" />
          <span className="brand__word" aria-hidden="true">
            <span>The</span>
            <strong>TEACH</strong>
            <span>Project</span>
          </span>
        </Link>
        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
          <span className="sr-only">Menu</span>
        </button>
        <nav id="site-menu" aria-label="Main" className={`nav__menu${open ? ' is-open' : ''}`}>
          <ul>
            {LINKS.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.to === '/'} className={({ isActive }) => (isActive ? 'is-active' : undefined)}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <button type="button" className="btn btn--coral nav__donate" onClick={() => { setOpen(false); openDonate(); }}>
            Donate
          </button>
        </nav>
      </div>
    </header>
  );
}
