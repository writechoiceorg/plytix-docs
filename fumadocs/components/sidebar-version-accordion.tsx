'use client';

import { useEffect } from 'react';

const SIDEBAR_SELECTOR = '#nd-sidebar, #nd-sidebar-mobile';
// In the API Reference tab, the only top-level folders are the API versions.
const REFERENCE_PREFIX = '/reference';

/**
 * Makes the API version folders (V3, V1/V2) an accordion: opening one closes
 * the other. Closing goes through the folder's own trigger, so Fumadocs keeps
 * its open state (and chevron) in sync.
 */
export function SidebarVersionAccordion() {
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      if (!window.location.pathname.startsWith(REFERENCE_PREFIX)) return;

      for (const m of mutations) {
        const folder = m.target;
        // Base UI adds data-open to the folder root (heading + panel) as it opens.
        if (!(folder instanceof HTMLElement) || m.oldValue !== null || !folder.hasAttribute('data-open')) {
          continue;
        }
        // Top-level folders sit directly in the list inside the sidebar viewport.
        const list = folder.parentElement;
        if (!list?.parentElement?.matches('.overscroll-contain') || !folder.closest(SIDEBAR_SELECTOR)) {
          continue;
        }

        for (const sibling of list.children) {
          if (sibling !== folder && sibling.hasAttribute('data-open')) {
            sibling.querySelector<HTMLElement>(':scope > button')?.click();
          }
        }
      }
    });

    observer.observe(document.body, {
      subtree: true,
      attributes: true,
      attributeFilter: ['data-open'],
      attributeOldValue: true,
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
