'use client';

import { useEffect } from 'react';

const SIDEBAR_SELECTOR = '#nd-sidebar, #nd-sidebar-mobile';
// Only folders opened by the reader scroll the sidebar; folders that open
// themselves on navigation are left to Fumadocs' own active-link scroll.
const INTERACTION_WINDOW_MS = 500;
// Keeps the folder clear of the viewport's 12px fade mask.
const EDGE_MARGIN = 12;

/**
 * Scrolls the sidebar so a folder the reader just expanded is visible. If the
 * folder is taller than the sidebar, its heading is aligned to the top instead.
 */
export function SidebarAutoScroll() {
  useEffect(() => {
    let lastInteraction = 0;

    function onInteraction(e: Event) {
      if (e.target instanceof Element && e.target.closest(SIDEBAR_SELECTOR)) {
        lastInteraction = performance.now();
      }
    }

    function reveal(folder: HTMLElement) {
      const viewport = folder.closest<HTMLElement>('.overscroll-contain');
      if (!viewport) return;

      const v = viewport.getBoundingClientRect();
      const f = folder.getBoundingClientRect();
      const overflow = f.bottom - (v.bottom - EDGE_MARGIN);
      // Never scroll past the folder's own heading, and never scroll up.
      const maxScroll = f.top - (v.top + EDGE_MARGIN);
      const delta = Math.min(overflow, maxScroll);
      if (delta <= 0) return;

      viewport.scrollBy({ top: delta, behavior: 'smooth' });
    }

    function afterExpand(folder: HTMLElement) {
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        folder.removeEventListener('transitionend', onEnd);
        reveal(folder);
      };
      // The panel's height transition bubbles up to the folder root.
      const onEnd = (e: TransitionEvent) => {
        if (e.target instanceof Element && e.target.parentElement === folder && e.propertyName === 'height') {
          finish();
        }
      };
      folder.addEventListener('transitionend', onEnd);
      window.setTimeout(finish, 300);
    }

    const observer = new MutationObserver((mutations) => {
      if (performance.now() - lastInteraction > INTERACTION_WINDOW_MS) return;
      // Base UI sets data-open on the collapsible root (the folder: heading +
      // panel) and, when kept mounted, on the panel too. Only act on roots.
      const opened = new Set<HTMLElement>();
      for (const m of mutations) {
        const el = m.target;
        if (
          el instanceof HTMLElement &&
          el.hasAttribute('data-open') &&
          m.oldValue === null &&
          el.closest(SIDEBAR_SELECTOR)
        ) {
          opened.add(el);
        }
      }
      for (const el of opened) {
        if (el.parentElement && opened.has(el.parentElement)) continue;
        afterExpand(el);
      }
    });

    document.addEventListener('pointerdown', onInteraction, true);
    document.addEventListener('keydown', onInteraction, true);
    observer.observe(document.body, {
      subtree: true,
      attributes: true,
      attributeFilter: ['data-open'],
      attributeOldValue: true,
    });

    return () => {
      document.removeEventListener('pointerdown', onInteraction, true);
      document.removeEventListener('keydown', onInteraction, true);
      observer.disconnect();
    };
  }, []);

  return null;
}
