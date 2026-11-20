'use client';

import { useEffect, useRef, useState } from 'react';
import { CheckmarkRegular, CopyRegular, DismissCircleRegular } from './icons';

/** Markdown already fetched successfully, by URL. Failed fetches are never cached. */
const cache = new Map<string, string>();

async function fetchMarkdown(url: string): Promise<string> {
  const res = await fetch(url);
  const type = res.headers.get('Content-Type') ?? '';
  // A 404 or 401 page, or HTML served instead of Markdown, isn't the document (STG-015).
  if (!res.ok) throw new Error(`Markdown request failed with ${res.status}`);
  if (!/^text\/(markdown|plain)\b/i.test(type)) throw new Error(`Unexpected content type: ${type || 'none'}`);
  const text = await res.text();
  cache.set(url, text);
  return text;
}

type CopyState = 'idle' | 'loading' | 'copied' | 'error';

/**
 * "Copy Markdown" pill from the Plytix design. Fetches the page's Markdown and
 * copies it. A failed fetch or clipboard write shows an error and can be retried;
 * only a successful fetch is cached.
 */
export function MarkdownCopyButton({ markdownUrl }: { markdownUrl: string }) {
  const [state, setState] = useState<CopyState>('idle');
  const timeout = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timeout.current), []);

  const settle = (next: CopyState) => {
    setState(next);
    window.clearTimeout(timeout.current);
    timeout.current = window.setTimeout(() => setState('idle'), next === 'error' ? 4000 : 1500);
  };

  const onClick = async () => {
    setState('loading');
    try {
      const cached = cache.get(markdownUrl);
      if (cached !== undefined) {
        await navigator.clipboard.writeText(cached);
      } else {
        // Passing the pending fetch to ClipboardItem keeps the click's user
        // activation in Safari. If the fetch fails, the write rejects too.
        await navigator.clipboard.write([new ClipboardItem({ 'text/plain': fetchMarkdown(markdownUrl) })]);
      }
      settle('copied');
    } catch {
      settle('error');
    }
  };

  return (
    <>
      <button type="button" disabled={state === 'loading'} onClick={onClick} className="plytix-pill-button">
        {state === 'copied' ? <CheckmarkRegular /> : state === 'error' ? <DismissCircleRegular /> : <CopyRegular />}
        {state === 'error' ? 'Copy failed. Try again' : 'Copy Markdown'}
      </button>
      <span role="status" className="sr-only">
        {state === 'copied' ? 'Markdown copied' : state === 'error' ? "Couldn't copy the Markdown. Try again." : ''}
      </span>
    </>
  );
}
