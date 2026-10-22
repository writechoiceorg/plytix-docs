'use client';

import type { ComponentProps } from 'react';
import { cn } from '@/lib/cn';

/**
 * Sidebar banner slot (a client component: Fumadocs' sidebar renders it).
 * Its only child is Fumadocs' mobile tab dropdown, which hides itself on
 * desktop but would leave the slot's padding behind, so own the wrapper and
 * hide it on desktop too.
 */
export function SidebarBanner({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cn('flex flex-col gap-3 p-4 pb-2 empty:hidden lg:hidden', className)} />;
}
