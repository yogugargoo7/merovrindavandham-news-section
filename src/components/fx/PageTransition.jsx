import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const LABELS = {
  '/': 'Overview',
  '/about': 'Our Vision',
  '/plots': 'Plot Plans',
  '/availability': 'Live Inventory',
  '/gallery': 'Visual Tour',
  '/payment': 'Investment Plans',
  '/contact': 'Find Us',
};

const NAV_EVENT = 'mvd:navigate';
const STATIC_FILE = /\.(pdf|html?|xml|txt|jpe?g|png|webp|gif|svg|mp4|zip)$/i;

// Programmatic navigation that still plays the curtain.
// eslint-disable-next-line react-refresh/only-export-components
export const transitionTo = (to) => {
  window.dispatchEvent(new CustomEvent(NAV_EVENT, { detail: to }));
};

// Curtain wipe between routes: every same-origin <a> click is intercepted
// (capture phase, before React Router's Link handler), the curtain covers,
// the route changes underneath, then the curtain lifts.
const PageTransition = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [phase, setPhase] = useState('idle');
  const [label, setLabel] = useState('');
  const pathRef = useRef(pathname);
  const busyRef = useRef(false);
  // BrowserRouter hands out a new navigate() on every location change; keep the
  // latest in a ref so the listener below mounts once and its timers survive.
  const navigateRef = useRef(navigate);

  useEffect(() => {
    pathRef.current = pathname;
    navigateRef.current = navigate;
  }, [pathname, navigate]);

  useEffect(() => {
    const navigate = (to) => navigateRef.current(to);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timers = [];
    const later = (fn, ms) => timers.push(window.setTimeout(fn, ms));
    const root = document.documentElement;

    const go = (to) => {
      const url = new URL(to, window.location.origin);
      const target = `${url.pathname}${url.search}${url.hash}`;

      if (url.pathname === pathRef.current) {
        if (!url.hash) {
          if (window.__lenis) window.__lenis.scrollTo(0);
          else window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }

      if (reduce || busyRef.current) {
        navigate(target);
        return;
      }

      busyRef.current = true;
      setLabel(LABELS[url.pathname] || 'Mero Vrindavan Dham');
      setPhase('cover');

      later(() => {
        root.classList.add('is-busy');
        navigate(target);
        later(() => {
          root.classList.remove('is-busy');
          setPhase('reveal');
          later(() => {
            setPhase('idle');
            busyRef.current = false;
          }, 1050);
        }, 220);
      }, 860);
    };

    const onClick = (event) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = event.target.closest?.('a[href]');
      if (!anchor) return;
      if (anchor.target && anchor.target !== '_self') return;
      if (anchor.hasAttribute('download') || anchor.hasAttribute('data-no-transition')) return;

      const raw = anchor.getAttribute('href') || '';
      if (!raw || raw.startsWith('#') || /^(mailto|tel|sms|javascript):/i.test(raw)) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (STATIC_FILE.test(url.pathname) || url.pathname.startsWith('/api')) return;

      event.preventDefault();
      go(`${url.pathname}${url.search}${url.hash}`);
    };

    const onNavigate = (event) => go(event.detail);

    document.addEventListener('click', onClick, true);
    window.addEventListener(NAV_EVENT, onNavigate);

    return () => {
      document.removeEventListener('click', onClick, true);
      window.removeEventListener(NAV_EVENT, onNavigate);
      timers.forEach((id) => window.clearTimeout(id));
      root.classList.remove('is-busy');
      busyRef.current = false;
    };
  }, []);

  const className = [
    'curtain',
    phase !== 'idle' && 'is-active',
    phase === 'cover' && 'is-cover',
    phase === 'reveal' && 'is-reveal',
  ].filter(Boolean).join(' ');

  return (
    <div className={className} aria-hidden="true">
      <div className="curtain__panel curtain__panel--gold" />
      <div className="curtain__panel curtain__panel--ink">
        <div className="curtain__label">
          <small>Mero Vrindavan Dham</small>
          <strong><span>{label}</span></strong>
        </div>
      </div>
    </div>
  );
};

export default PageTransition;
