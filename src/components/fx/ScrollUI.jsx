import { useEffect, useRef } from 'react';
import { scrollToTop } from '../../utils/scrollLock';

const RADIUS = 22;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// Top progress hairline + back-to-top button with a progress ring.
// Writes straight to the DOM so scrolling never re-renders the app.
const ScrollUI = () => {
  const barRef = useRef(null);
  const buttonRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, scrollTop / docHeight) : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
        barRef.current.setAttribute('aria-valuenow', String(Math.round(progress * 100)));
      }
      if (ringRef.current) ringRef.current.style.strokeDashoffset = String(CIRCUMFERENCE * (1 - progress));
      if (buttonRef.current) buttonRef.current.classList.toggle('visible', scrollTop > 300);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <>
      <div
        ref={barRef}
        className="scroll-progress-bar"
        style={{ transform: 'scaleX(0)' }}
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuenow={0}
        aria-valuemin={0}
        aria-valuemax={100}
      />
      <button
        ref={buttonRef}
        className="back-to-top"
        onClick={() => scrollToTop()}
        aria-label="Back to top"
      >
        <svg className="back-to-top__ring" viewBox="0 0 48 48" aria-hidden="true">
          <circle className="back-to-top__track" cx="24" cy="24" r={RADIUS} />
          <circle
            ref={ringRef}
            className="back-to-top__fill"
            cx="24"
            cy="24"
            r={RADIUS}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE}
          />
        </svg>
        <svg className="back-to-top__arrow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </>
  );
};

export default ScrollUI;
