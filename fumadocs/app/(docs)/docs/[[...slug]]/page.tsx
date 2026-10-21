import { source } from '@/lib/source';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { DocsPageView, getDocsPageMetadata } from '@/components/docs-page-view';
import { isReferenceSlugs } from '@/lib/shared';

// The API reference lives in the same content tree but is served under
// /reference (see app/(docs)/reference), so /docs/reference/** is not a page.
function getSlugs(slug: string[] | undefined) {
  const slugs = slug ?? [];
  if (isReferenceSlugs(slugs)) notFound();
  return slugs;
}

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  return <DocsPageView slugs={getSlugs(params.slug)} />;
}

export async function generateStaticParams() {
  return source.generateParams().filter((params) => !isReferenceSlugs(params.slug));
}

export async function generateMetadata(props: PageProps<'/docs/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params;
  return getDocsPageMetadata(getSlugs(params.slug));
}
