import type { Metadata } from 'next';
import Link from 'next/link';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { FullSearchTrigger } from '@/components/header-controls';
import { SiteFooter } from '@/components/site-footer';

// Rendered for unmatched URLs and for pages that call notFound(), with the
// 404 status kept. Recovery points only at public pages: the Plytix MCP
// overview and the V1 and V2 reference, plus search. (Everything else is
// unpublished on this branch, see publishedFolders in lib/shared.ts.)
export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <HomeLayout {...baseOptions()}>
      <main className="w-full max-w-[720px] mx-auto px-4 pt-24 pb-16 text-center">
        <p className="text-sm font-medium text-fd-muted-foreground mb-2">404</p>
        <h1 className="text-3xl font-bold tracking-tight mb-4">We couldn&apos;t find that page</h1>
        <p className="text-fd-muted-foreground mb-8">
          Search the docs, or go to the Plytix MCP or the API reference.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <FullSearchTrigger className="h-10 px-4" />
          <Link
            href="/mcp/overview"
            className="inline-flex h-10 items-center rounded-full bg-[#7A52FF] px-4 text-sm font-medium text-white transition-colors hover:bg-[#6a40f5]"
          >
            Plytix MCP
          </Link>
          <Link
            href="/reference/v1-v2/api-v1-v2-reference"
            className="inline-flex h-10 items-center rounded-full border px-4 text-sm font-medium transition-colors hover:bg-fd-accent"
          >
            API reference
          </Link>
        </div>
      </main>
      <SiteFooter />
    </HomeLayout>
  );
}
