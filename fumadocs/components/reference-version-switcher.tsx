'use client';

import { usePathname } from 'fumadocs-core/framework';
import Link from 'fumadocs-core/link';
import { Popover, PopoverContent, PopoverTrigger } from 'fumadocs-ui/components/ui/popover';
import { Archive, Check, ChevronsUpDown, Sparkles } from 'lucide-react';
import { useState, type ComponentProps } from 'react';
import { cn } from '@/lib/cn';

const VERSIONS = [
  {
    title: 'V3 (Current)',
    icon: Sparkles,
    url: '/docs/reference/v3',
    prefix: '/docs/reference/v3',
  },
  {
    title: 'Legacy (V1/V2)',
    icon: Archive,
    url: '/docs/reference/legacy/api-v1-v2-reference',
    prefix: '/docs/reference/legacy',
  },
];

/**
 * Version switcher for the API Reference section. Root folders hide their
 * siblings in the sidebar (that's what makes v3 vs legacy show only their
 * own pages), so this banner is what lets readers jump between them.
 */
export function ReferenceVersionSwitcher() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (!pathname.startsWith('/docs/reference')) return null;

  const selected = VERSIONS.find((version) => pathname.startsWith(version.prefix)) ?? VERSIONS[0];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="flex items-center gap-2 rounded-lg p-2 border bg-fd-secondary/50 text-start text-fd-secondary-foreground transition-colors hover:bg-fd-accent data-[popup-open]:bg-fd-accent data-[popup-open]:text-fd-accent-foreground">
        <selected.icon className="shrink-0 size-4 text-fd-muted-foreground" />
        <span className="text-sm font-medium">{selected.title}</span>
        <ChevronsUpDown className="shrink-0 ms-auto size-4 text-fd-muted-foreground" />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-1 w-(--anchor-width) p-1">
        {VERSIONS.map((version) => (
          <Link
            key={version.url}
            href={version.url}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-fd-accent hover:text-fd-accent-foreground"
          >
            <version.icon className="shrink-0 size-4 text-fd-muted-foreground" />
            <span className="flex-1 text-sm font-medium leading-none">{version.title}</span>
            <Check
              className={cn(
                'shrink-0 size-3.5 text-fd-primary',
                version.url !== selected.url && 'invisible',
              )}
            />
          </Link>
        ))}
      </PopoverContent>
    </Popover>
  );
}

/**
 * Sidebar banner slot. Rendering the switcher as a plain child leaves the
 * slot's padding behind on the Guides pages (the mobile-only tab dropdown
 * keeps the wrapper non-empty), so own the wrapper and hide it on desktop
 * outside the API Reference.
 */
export function SidebarBanner({ className, children, ...props }: ComponentProps<'div'>) {
  const pathname = usePathname();
  const isReference = pathname.startsWith('/docs/reference');

  return (
    <div
      {...props}
      className={cn('flex flex-col gap-3 p-4 pb-2 empty:hidden', !isReference && 'lg:hidden', className)}
    >
      {children}
      {isReference && <ReferenceVersionSwitcher />}
    </div>
  );
}
