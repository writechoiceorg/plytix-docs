import type { HTMLAttributes, ReactNode } from 'react';
import Link from 'fumadocs-core/link';
import { cn } from '@/lib/cn';

/**
 * Plytix-styled cards, API-compatible with fumadocs-ui's Card/Cards: the icon
 * sits bare above a bold title (no boxed icon chip), on the shared
 * `.plytix-surface` gradient card.
 */
export function Cards(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={cn('@container my-6 grid grid-cols-2 gap-4', props.className)} />
  );
}

export interface CardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  href?: string;
  external?: boolean;
}

export function Card({ icon, title, description, children, className, ...props }: CardProps) {
  const E = props.href ? Link : 'div';

  return (
    <E
      {...props}
      data-card=""
      className={cn(
        'plytix-surface not-prose block p-6 text-fd-foreground no-underline transition-colors @max-lg:col-span-full',
        props.href && 'hover:border-fd-primary/40',
        className,
      )}
    >
      {icon ? <div className="mb-3 w-fit text-fd-foreground [&_svg]:size-6">{icon}</div> : null}
      <h3 className="mb-1 text-base font-semibold leading-[1.4]">{title}</h3>
      {description ? <p className="text-base leading-[1.3] text-fd-foreground">{description}</p> : null}
      <div className="prose-no-margin text-base leading-[1.3] text-fd-foreground empty:hidden">
        {children}
      </div>
    </E>
  );
}
