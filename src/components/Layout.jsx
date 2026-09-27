import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Nav from './Nav.jsx';
import Footer from './Footer.jsx';
import { DonateProvider } from './DonateContext.jsx';

export default function Layout({ children }) {
  const { pathname, hash } = useLocation();

  // New page: start at the top, or at the #section in the link.
  useEffect(() => {
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        target.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <DonateProvider>
      <a className="skip-link" href="#main">Skip to content</a>
      <Nav />
      <main id="main" tabIndex={-1}>{children}</main>
      <Footer />
    </DonateProvider>
  );
}
