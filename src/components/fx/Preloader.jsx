import { useEffect, useRef, useState } from 'react';
import logo from '../../assets/siteImages/VrindavanLogoSmall.webp';
import { lockScroll, unlockScroll } from '../../utils/scrollLock';

const MIN_MS = 1500;
const MAX_MS = 3200;

// First-visit intro (once per browser session). index.html adds
// html.is-intro + html.is-busy before React boots; this component lifts both.
const Preloader = () => {
  const [visible, setVisible] = useState(() => document.documentElement.classList.contains('is-intro'));
  const [leaving, setLeaving] = useState(false);
  const rootRef = useRef(null);
  const countRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    if (!visible) {
      root.classList.remove('is-busy', 'is-intro');
      return undefined;
    }

    lockScroll();
    let loaded = document.readyState === 'complete';
    const onLoad = () => { loaded = true; };
    window.addEventListener('load', onLoad);

    const start = performance.now();
    let frame = 0;
    let shown = 0;
    let doneTimer = 0;
    let unlocked = false;

    const finish = () => {
      root.classList.remove('is-busy');
      try { sessionStorage.setItem('mvd_intro_seen', '1'); } catch { /* private mode */ }
      setLeaving(true);
      doneTimer = window.setTimeout(() => {
        root.classList.remove('is-intro');
        unlocked = true;
        unlockScroll();
        setVisible(false);
      }, 1150);
    };

    const tick = (now) => {
      const elapsed = now - start;
      const ceiling = loaded || elapsed > MAX_MS ? 1 : 0.88;
      const eased = 1 - (1 - Math.min(1, elapsed / MIN_MS)) ** 3;
      shown = Math.max(shown, Math.min(ceiling, eased));
      if (rootRef.current) rootRef.current.style.setProperty('--load', shown.toFixed(3));
      if (countRef.current) countRef.current.textContent = String(Math.round(shown * 100)).padStart(3, '0');
      if (shown >= 1) {
        finish();
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(doneTimer);
      window.removeEventListener('load', onLoad);
      if (!unlocked) unlockScroll();
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div ref={rootRef} className={`preloader${leaving ? ' is-leaving' : ''}`} aria-hidden="true">
      <div className="preloader__center">
        <img className="preloader__logo" src={logo} alt="" />
        <div className="preloader__title">
          <span>Mero Vrindavan <em>Dham</em></span>
        </div>
        <div className="preloader__meta">
          <span>Vrindavan</span>
          <div className="preloader__bar"><span /></div>
          <span>Mathura</span>
        </div>
      </div>
      <div className="preloader__count" ref={countRef}>000</div>
    </div>
  );
};

export default Preloader;
