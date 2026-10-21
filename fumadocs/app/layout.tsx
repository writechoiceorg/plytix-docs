import type { Metadata } from 'next';
import { RootProvider } from 'fumadocs-ui/provider/next';
// Imported from JS: Tailwind's CSS @import can't resolve this package's exports map.
import '@fluentui/react-icons/headless/styles.css';
import './global.css';
import { Figtree } from 'next/font/google';
import Script from 'next/script';

const figtree = Figtree({
  subsets: ['latin'],
});

const umamiSrc = process.env.NEXT_PUBLIC_UMAMI_SRC;
const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://docs.plytix.com'),
  title: { default: 'Plytix API Documentation', template: '%s | Plytix API Documentation' },
  description:
    'Developer docs for the Plytix API. Connect your systems to Plytix, the product content platform, and manage products, assets, and catalog data in code.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={figtree.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
        {umamiSrc && umamiWebsiteId && (
          <Script
            src={umamiSrc}
            data-website-id={umamiWebsiteId}
            strategy="afterInteractive"
            defer
          />
        )}
      </body>
    </html>
  );
}
