// Reference-counted page scroll lock shared by the menu, modals and preloader.
// Works with Lenis (window.__lenis) as well as native scrolling.
let locks = 0;

export function lockScroll() {
  locks += 1;
  if (locks === 1) {
    document.documentElement.classList.add('is-locked');
    window.__lenis?.stop();
  }
}

export function unlockScroll() {
  locks = Math.max(0, locks - 1);
  if (locks === 0) {
    document.documentElement.classList.remove('is-locked');
    window.__lenis?.start();
  }
}

export function scrollToTop({ immediate = false } = {}) {
  if (window.__lenis) {
    window.__lenis.scrollTo(0, { immediate, force: true });
    return;
  }
  window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' });
}
