import { useEffect } from 'react';

const REVEAL = '[data-reveal]';
const MOTION = '[data-parallax], [data-progress]';

// One observer pair for the whole app. New route content is picked up
// automatically through a MutationObserver, so pages only need markup:
//   data-reveal="up|fade|scale|split|img|stagger|line"  -> sets data-in once visible
//   data-parallax="0.12"                                -> sets --py while on screen
//   data-progress                                       -> sets --p (0..1) through the viewport
const MotionManager = () => {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll(REVEAL).forEach((el) => el.setAttribute('data-in', ''));
      return undefined;
    }

    const revealIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute('data-in', '');
          revealIO.unobserve(entry.target);
        });
      },
      { threshold: 0, rootMargin: '0px 0px -9% 0px' }
    );

    const active = new Set();
    let frame = 0;

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      active.forEach((el) => {
        if (el.hasAttribute('data-parallax')) {
          if (reduce) return;
          // measure the untransformed parent so the offset never feeds back into itself
          const box = (el.parentElement || el).getBoundingClientRect();
          const speed = parseFloat(el.getAttribute('data-parallax')) || 0.1;
          const offset = box.top + box.height / 2 - vh / 2;
          el.style.setProperty('--py', `${(-offset * speed).toFixed(1)}px`);
        }
        if (el.hasAttribute('data-progress')) {
          const box = el.getBoundingClientRect();
          const p = Math.min(1, Math.max(0, (vh - box.top) / (vh + box.height)));
          el.style.setProperty('--p', p.toFixed(4));
        }
      });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const motionIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) active.add(entry.target);
          else active.delete(entry.target);
        });
        schedule();
      },
      { rootMargin: '20% 0px 20% 0px' }
    );

    const each = (node, selector, fn) => {
      if (node.nodeType !== 1) return;
      if (node.matches(selector)) fn(node);
      node.querySelectorAll(selector).forEach(fn);
    };

    // anything already on screen when it mounts reveals straight away — otherwise
    // content sitting in the bottom margin of the first screen would wait for a scroll
    const add = (node) => {
      const vh = window.innerHeight;
      each(node, REVEAL, (el) => {
        if (el.hasAttribute('data-in')) return;
        const box = el.getBoundingClientRect();
        if (box.top < vh && box.bottom > 0 && box.height > 0) el.setAttribute('data-in', '');
        else revealIO.observe(el);
      });
      each(node, MOTION, (el) => motionIO.observe(el));
    };

    const remove = (node) => {
      each(node, REVEAL, (el) => revealIO.unobserve(el));
      each(node, MOTION, (el) => { motionIO.unobserve(el); active.delete(el); });
    };

    add(document.body);

    const mutations = new MutationObserver((records) => {
      records.forEach((record) => {
        record.removedNodes.forEach(remove);
        record.addedNodes.forEach(add);
      });
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      mutations.disconnect();
      revealIO.disconnect();
      motionIO.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return null;
};

export default MotionManager;
