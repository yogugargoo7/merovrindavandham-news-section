import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/siteImages/VrindavanLogoSmall.webp';
import { hasSalesPhone, SALES_PHONE, telHref } from '../../config/contact';

const PORTAL_URL = import.meta.env.VITE_CRM_PORTAL_URL || 'https://www.platinumtownship.in/login';

const LoginIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
    <polyline points="10 17 15 12 10 7" />
    <line x1="15" y1="12" x2="3" y2="12" />
  </svg>
);

const navItems = [
  { label: 'Overview',          to: '/' },
  { label: 'Our Vision',        to: '/about' },
  { label: 'Plot Plans',        to: '/plots' },
  { label: 'Live Inventory',    to: '/availability' },
  { label: 'Visual Tour',       to: '/gallery' },
  { label: 'Investment Plans',  to: '/payment' },
  { label: 'Find Us',           to: '/contact' },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close mobile menu on route change (state adjustment during render,
  // see react.dev "you might not need an effect")
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  // lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);


  return (
    <>
      <header className={`hdr${scrolled ? ' hdr--scrolled' : ''}`}>
        <div className="hdr__topbar">
          <div className="hdr__topbar-inner">
            <div className="hdr__topbar-info">
              <span>Free site visit support</span>
              {hasSalesPhone && (
                <a className="hdr__topbar-call" href={telHref}>Call Now: {SALES_PHONE}</a>
              )}
            </div>
          </div>
        </div>
        <div className="hdr__inner">

          {/* Logo */}
          <Link to="/" className="hdr__logo" aria-label="Mero Vrindavan Dham">
            <img src={logo} alt="Mero Vrindavan Dham logo" />
            <div className="hdr__logo-text">
              <span className="hdr__logo-name">MERO VRINDAVAN DHAM</span>
              <span className="hdr__logo-sub">Premium Township</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hdr__nav" aria-label="Main navigation">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `hdr__link${isActive ? ' hdr__link--active' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* CTA */}
          <div className="hdr__actions">

            {/* Login */}
            <a
              className="hdr__login"
              href={PORTAL_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Login to portal"
            >
              <LoginIcon />
              <span>Login</span>
            </a>

            {/* Hamburger */}
            <button
              className={`hdr__burger${menuOpen ? ' hdr__burger--open' : ''}`}
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {menuOpen && <div className="hdr__overlay" onClick={() => setMenuOpen(false)} />}

      {/* Mobile drawer */}
      <div className={`hdr__drawer${menuOpen ? ' hdr__drawer--open' : ''}`} aria-hidden={!menuOpen}>
        <div className="hdr__drawer-head">
          <Link to="/" className="hdr__drawer-logo" onClick={() => setMenuOpen(false)}>
            <img src={logo} alt="Mero Vrindavan Dham" />
            <span>Mero Vrindavan Dham</span>
          </Link>
          <button className="hdr__drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="hdr__drawer-nav">
          {navItems.map((item, i) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `hdr__drawer-link${isActive ? ' hdr__drawer-link--active' : ''}`}
              style={{ animationDelay: `${i * 55}ms` }}
              onClick={() => setMenuOpen(false)}
            >
              <span>{item.label}</span>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </NavLink>
          ))}
        </nav>

        <div className="hdr__drawer-foot">
          <a
            className="hdr__drawer-login"
            href={PORTAL_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            <LoginIcon />
            <span>Login to Portal</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;
