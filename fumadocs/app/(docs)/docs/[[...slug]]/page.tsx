import { source } from '@/lib/source';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { DocsPageView, getDocsPageMetadata } from '@/components/docs-page-view';
import { isMcpSlugs, isReferenceSlugs } from '@/lib/shared';

// The API reference and the Plytix MCP section live in the same content tree
// but are served under /reference and /mcp (see app/(docs)/reference and
// app/(docs)/mcp), so /docs/reference/** and /docs/guides/mcp/** are not pages.
const isServedElsewhere = (slugs: string[] | undefined) => isReferenceSlugs(slugs) || isMcpSlugs(slugs);

function getSlugs(slug: string[] | undefined) {
  const slugs = slug ?? [];
  if (isServedElsewhere(slugs)) notFound();
  return slugs;
}

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  return <DocsPageView slugs={getSlugs(params.slug)} />;
}

export async function generateStaticParams() {
  return source.generateParams().filter((params) => !isServedElsewhere(params.slug));
}

export async function generateMetadata(props: PageProps<'/docs/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params;
  return getDocsPageMetadata(getSlugs(params.slug));
}
