import type { Metadata } from 'next';
import { RootProvider } from 'fumadocs-ui/provider/next';
// Imported from JS: Tailwind's CSS @import can't resolve this package's exports map.
import '@fluentui/react-icons/headless/styles.css';
import './global.css';
import { Figtree } from 'next/font/google';
import Script from 'next/script';
import { appName, siteDescription, siteUrl } from '@/lib/shared';

const figtree = Figtree({
  subsets: ['latin'],
});

const umamiSrc = process.env.NEXT_PUBLIC_UMAMI_SRC;
const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

// Page titles keep their own name ("Get a product · V1 (Legacy)") and take the
// portal name as a suffix (STG-001).
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: appName, template: `%s | ${appName}` },
  description: siteDescription,
  applicationName: appName,
  openGraph: { siteName: appName, type: 'website' },
  twitter: { card: 'summary_large_image' },
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
