'use client';

import { useState } from 'react';
import { useCopyButton } from 'fumadocs-ui/utils/use-copy-button';
import { CheckmarkRegular, CopyRegular } from './icons';

const cache = new Map<string, Promise<string>>();

/**
 * "Copy Markdown" pill from the Plytix design. Same behavior as fumadocs-ui's
 * MarkdownCopyButton (fetches the page's .mdx and copies it), with Fluent icons.
 */
export function MarkdownCopyButton({ markdownUrl }: { markdownUrl: string }) {
  const [isLoading, setLoading] = useState(false);
  const [checked, onClick] = useCopyButton(async () => {
    const cached = cache.get(markdownUrl);
    if (cached) return navigator.clipboard.writeText(await cached);

    setLoading(true);
    try {
      const promise = fetch(markdownUrl).then((res) => res.text());
      cache.set(markdownUrl, promise);
      await navigator.clipboard.write([new ClipboardItem({ 'text/plain': promise })]);
    } finally {
      setLoading(false);
    }
  });

  return (
    <button type="button" disabled={isLoading} onClick={onClick} className="plytix-pill-button">
      {checked ? <CheckmarkRegular /> : <CopyRegular />}
      Copy Markdown
    </button>
  );
}
