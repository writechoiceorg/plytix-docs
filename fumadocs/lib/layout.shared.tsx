import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';
import { FullSearchTrigger, SearchTrigger, ThemeSwitch } from '@/components/header-controls';

const BOOK_A_DEMO_URL = 'https://www.plytix.com/get-started/demo/';

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
    // Right-hand header links, matching the Plytix knowledge base header.
    // `secondary` places them on the right in the home layout; the docs
    // (notebook) layout always puts links on the right.
    links: [
      { text: 'Plytix.com', url: 'https://www.plytix.com', external: true, secondary: true },
      { text: 'Login', url: 'https://auth.plytix.com/auth/login', external: true, secondary: true },
      {
        type: 'custom',
        on: 'nav',
        secondary: true,
        children: (
          <a
            href={BOOK_A_DEMO_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center rounded-full bg-[#7A52FF] px-4 py-1.5 text-sm font-medium text-white no-underline transition-colors hover:bg-[#6a40f5]"
          >
            Book a demo
          </a>
        ),
      },
      // The custom pill only renders in the navbar; give the mobile menu a plain link.
      { text: 'Book a demo', url: BOOK_A_DEMO_URL, external: true, on: 'menu' },
    ],
    slots: {
      themeSwitch: ThemeSwitch,
      searchTrigger: { sm: SearchTrigger, full: FullSearchTrigger },
    },
  };
}
