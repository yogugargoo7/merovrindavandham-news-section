import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/siteImages/VrindavanLogoSmall.webp';
import { hasSalesPhone, SALES_PHONE, telHref } from '../../config/contact';
import { lockScroll, unlockScroll } from '../../utils/scrollLock';

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

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/merovrindavandhamtownship/' },
  { label: 'Facebook', href: 'https://www.facebook.com/share/1HmRotdT2k/' },
  { label: 'YouTube', href: 'https://youtube.com/@subhsankalpestate' },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 40);
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 420);
        lastY = y;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // close menu on route change (state adjustment during render,
  // see react.dev "you might not need an effect")
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
    setHidden(false);
  }

  // lock page scroll while the menu is open
  useEffect(() => {
    if (!menuOpen) return undefined;
    lockScroll();
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => {
      unlockScroll();
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const headerClass = [
    'hdr',
    scrolled && 'hdr--scrolled',
    hidden && !menuOpen && 'hdr--hidden',
    menuOpen && 'hdr--open',
  ].filter(Boolean).join(' ');

  return (
    <>
      <header className={headerClass}>
        <div className="hdr__topbar">
          <div className="hdr__topbar-inner">
            <span className="hdr__topbar-note">
              <i aria-hidden="true" />
              Free site visit support
            </span>
            {hasSalesPhone && (
              <a className="hdr__topbar-call" href={telHref}>Call Now: {SALES_PHONE}</a>
            )}
          </div>
        </div>

        <div className="hdr__inner">
          <Link to="/" className="hdr__logo" aria-label="Mero Vrindavan Dham">
            <img src={logo} alt="Mero Vrindavan Dham logo" width="52" height="52" />
            <span className="hdr__logo-text">
              <span className="hdr__logo-name">MERO VRINDAVAN DHAM</span>
              <span className="hdr__logo-sub">Premium Township</span>
            </span>
          </Link>

          <nav className="hdr__nav" aria-label="Main navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `hdr__link${isActive ? ' hdr__link--active' : ''}`}
              >
                <span className="hdr__link-roll"><span>{item.label}</span></span>
              </NavLink>
            ))}
          </nav>

          <div className="hdr__actions">
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

            <button
              className="hdr__burger"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
            >
              <span className="hdr__burger-text" aria-hidden="true">{menuOpen ? 'Close' : 'Menu'}</span>
              <span className="hdr__burger-lines" aria-hidden="true"><span /><span /></span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu */}
      <div
        id="site-menu"
        className={`menu${menuOpen ? ' menu--open' : ''}`}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        data-lenis-prevent
      >
        <div className="menu__inner">
          <nav className="menu__nav" aria-label="Menu">
            {navItems.map((item, i) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `menu__link${isActive ? ' menu__link--active' : ''}`}
                style={{ '--mi': i }}
                onClick={() => setMenuOpen(false)}
              >
                <span className="menu__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="menu__label">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="menu__aside">
            <p className="menu__note">
              <i aria-hidden="true" />
              Free site visit support
            </p>
            {hasSalesPhone && (
              <a className="menu__call" href={telHref}>Call Now: {SALES_PHONE}</a>
            )}
            <a
              className="menu__login"
              href={PORTAL_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              <LoginIcon />
              <span>Login to Portal</span>
            </a>
            <div className="menu__socials">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
