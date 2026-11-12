import { useEffect, useState } from 'react';

const isReady = () => !document.documentElement.classList.contains('is-busy');

// false while the preloader or page curtain holds the screen (html.is-busy)
export function useSiteReady() {
  const [ready, setReady] = useState(isReady);

  useEffect(() => {
    const observer = new MutationObserver(() => setReady(isReady()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return ready;
}
