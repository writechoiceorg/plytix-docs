import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Figtree } from 'next/font/google';
import type { Metadata } from 'next';

const figtree = Figtree({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://plytix-docs.pages.dev'),
  title: 'Plytix Docs',
  description: 'Developer documentation for the Plytix PIM API and onboarding materials.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={figtree.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider
          search={{
            options: {
              type: 'static',
            },
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
