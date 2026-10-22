import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';
import { FullSearchTrigger, SearchTrigger, ThemeSwitch } from '@/components/header-controls';
import { HeaderActions } from '@/components/header-actions';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <Image src="/logo/mark-light.svg" alt="" width={24} height={24} className="dark:hidden" />
          <Image
            src="/logo/mark-dark.svg"
            alt=""
            width={24}
            height={24}
            className="hidden dark:block"
          />
          <span className="text-sm font-bold uppercase tracking-normal text-fd-foreground">
            Plytix API Documentation
          </span>
        </>
      ),
    },
    // Shown in the navbar on desktop and at the top of the mobile menu.
    links: [{ type: 'custom', secondary: true, children: <HeaderActions /> }],
    slots: {
      themeSwitch: ThemeSwitch,
      searchTrigger: { sm: SearchTrigger, full: FullSearchTrigger },
    },
  };
}
