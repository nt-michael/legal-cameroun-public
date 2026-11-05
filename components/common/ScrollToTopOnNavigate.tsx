'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Opens every new page at the top.
 * Next.js already does this in most cases, but not when the new page renders
 * a not-found screen or is shorter than where the visitor was. Back and forward
 * keep the browser's own scroll restoration, and links to an #anchor are left alone.
 * A link to the page already open scrolls back to the top as well.
 */
export default function ScrollToTopOnNavigate() {
  const pathname = usePathname();
  const isHistoryNavigation = useRef(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const markHistoryNavigation = () => {
      isHistoryNavigation.current = true;
    };
    // A link to the page already open does not change the path, so go back to the top by hand.
    // Next.js links cancel the native click, so defaultPrevented cannot be used to skip them
    const handleSamePageLink = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
      const link = (event.target as Element | null)?.closest?.('a[href]');
      if (!(link instanceof HTMLAnchorElement) || link.target === '_blank') return;
      const url = new URL(link.href, window.location.href);
      if (url.origin === window.location.origin && url.pathname === window.location.pathname && !url.hash) {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('popstate', markHistoryNavigation);
    document.addEventListener('click', handleSamePageLink);
    return () => {
      window.removeEventListener('popstate', markHistoryNavigation);
      document.removeEventListener('click', handleSamePageLink);
    };
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (isHistoryNavigation.current) {
      isHistoryNavigation.current = false;
      return;
    }
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}
