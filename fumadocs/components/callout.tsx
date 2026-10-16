import type { ComponentType, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import {
  DismissCircleRegular,
  InfoRegular,
  LightbulbRegular,
  WarningRegular,
} from './icons';

/**
 * Plytix-styled callout. Replaces fumadocs-ui's Callout (a bordered card with
 * a side bar) with the design team's tinted blocks: Warning, Note, Wrong and
 * Information. Colors come from the `--callout-*` tokens in global.css.
 */
type Variant = 'warning' | 'note' | 'error' | 'info';

const aliases: Record<string, Variant> = {
  warn: 'warning',
  warning: 'warning',
  error: 'error',
  info: 'info',
  note: 'note',
  tip: 'note',
  idea: 'note',
  success: 'info',
};

const icons: Record<Variant, ComponentType<{ className?: string }>> = {
  warning: WarningRegular,
  note: LightbulbRegular,
  error: DismissCircleRegular,
  info: InfoRegular,
};

export interface CalloutProps {
  type?: string;
  title?: ReactNode;
  icon?: ReactNode;
  className?: string;
  children?: ReactNode;
}

export function Callout({ type = 'info', title, icon, className, children }: CalloutProps) {
  const variant = aliases[type] ?? 'info';
  const Icon = icons[variant];

  return (
    <div
      data-callout={variant}
      className={cn(
        'my-6 flex gap-4 rounded-lg bg-(--callout-bg) px-6 py-4 text-base leading-[1.3] text-fd-foreground',
        className,
      )}
    >
      <div className="mt-0.5 shrink-0 text-(--callout-icon) [&_svg]:size-6">{icon ?? <Icon />}</div>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        {title && <p className="my-0! font-semibold leading-[1.4]">{title}</p>}
        <div className="prose-no-margin text-base leading-[1.3] text-fd-foreground [&_p]:leading-[1.3]">
          {children}
        </div>
      </div>
    </div>
  );
}
