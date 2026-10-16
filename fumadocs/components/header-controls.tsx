'use client';

import { Dialog } from '@base-ui/react/dialog';
import { useSearchContext } from 'fumadocs-ui/contexts/search';
import type {
  FullSearchTriggerProps,
  SearchTriggerProps,
} from 'fumadocs-ui/layouts/shared/slots/search-trigger';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { cn } from '@/lib/cn';
import { SearchRegular, WeatherMoonRegular, WeatherSunnyRegular } from './icons';

/**
 * Navbar controls from the Plytix design, plugged into Fumadocs through
 * `slots` in lib/layout.shared.tsx: a pill-shaped search field and a pill
 * theme toggle whose thumb slides between sun (light) and moon (dark).
 */

export function FullSearchTrigger({ hideIfDisabled, className, ...props }: FullSearchTriggerProps) {
  const { enabled, dialogHandle } = useSearchContext();
  if (hideIfDisabled && !enabled) return null;

  return (
    <Dialog.Trigger
      handle={dialogHandle}
      type="button"
      data-search-full=""
      {...props}
      className={cn(
        'inline-flex h-8 items-center gap-2 rounded-full border border-(--plytix-pill-border) bg-(--plytix-pill-bg) px-3 text-sm text-fd-muted-foreground transition-colors hover:text-fd-foreground',
        className,
      )}
    >
      <SearchRegular className="size-4 shrink-0" />
      Search
    </Dialog.Trigger>
  );
}

export function SearchTrigger({
  hideIfDisabled,
  className,
  // Fumadocs' button-variant props; this trigger has a single look.
  size: _size,
  color: _color,
  variant: _variant,
  ...props
}: SearchTriggerProps) {
  const { enabled, dialogHandle } = useSearchContext();
  if (hideIfDisabled && !enabled) return null;

  return (
    <Dialog.Trigger
      handle={dialogHandle}
      type="button"
      data-search=""
      aria-label="Open Search"
      {...props}
      className={cn(
        'inline-flex size-9 items-center justify-center rounded-full text-fd-muted-foreground hover:text-fd-foreground [&_svg]:size-5',
        className,
      )}
    >
      <SearchRegular />
    </Dialog.Trigger>
  );
}

export function ThemeSwitch({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === 'dark';
  const toggle = () => {
    const next = isDark ? 'light' : 'dark';
    if (document.startViewTransition) document.startViewTransition(() => flushSync(() => setTheme(next)));
    else setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      data-theme-toggle=""
      className={cn(
        'relative inline-flex h-8 w-[68px] shrink-0 items-center rounded-full border border-(--plytix-pill-border) bg-(--plytix-pill-bg) p-[3px]',
        className,
      )}
    >
      <span
        className={cn(
          'inline-flex size-[26px] items-center justify-center rounded-full bg-(--plytix-toggle-thumb) text-fd-foreground shadow-sm transition-transform duration-200 [&_svg]:size-4',
          isDark && 'translate-x-[36px]',
        )}
      >
        {isDark ? <WeatherMoonRegular /> : <WeatherSunnyRegular />}
      </span>
    </button>
  );
}
