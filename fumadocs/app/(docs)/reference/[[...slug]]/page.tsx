import { source } from '@/lib/source';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { DocsPageView, getDocsPageMetadata } from '@/components/docs-page-view';
import { referenceRoute, isServedBy, toContentSlugs, toUrlSlugs } from '@/lib/shared';

// Serves the content folder mapped to referenceRoute (see `sections` in lib/shared.ts).
function getSlugs(slug: string[] | undefined) {
  const slugs = toContentSlugs(referenceRoute, slug);
  // A page in a more specific section (e.g. guides/mcp/** under /mcp) has only that URL.
  if (!isServedBy(referenceRoute, slugs)) notFound();
  return slugs;
}

export default async function Page(props: PageProps<'/reference/[[...slug]]'>) {
  const params = await props.params;
  return <DocsPageView slugs={getSlugs(params.slug)} />;
}

export async function generateStaticParams() {
  return source
    .generateParams()
    .filter((params) => isServedBy(referenceRoute, params.slug))
    .map((params) => ({ ...params, slug: toUrlSlugs(referenceRoute, params.slug) }));
}

export async function generateMetadata(props: PageProps<'/reference/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params;
  return getDocsPageMetadata(getSlugs(params.slug));
}
