import { source } from '@/lib/source';
import type { Metadata } from 'next';
import { DocsPageView, getDocsPageMetadata } from '@/components/docs-page-view';
import { isReferenceSlugs, referenceFolder } from '@/lib/shared';

// Serves content/docs/reference/** at /reference/** (see `url` in lib/source.ts).
const toSlugs = (slug: string[] | undefined) => [referenceFolder, ...(slug ?? [])];

export default async function Page(props: PageProps<'/reference/[[...slug]]'>) {
  const params = await props.params;
  return <DocsPageView slugs={toSlugs(params.slug)} />;
}

export async function generateStaticParams() {
  return source
    .generateParams()
    .filter((params) => isReferenceSlugs(params.slug))
    .map((params) => ({ ...params, slug: params.slug.slice(1) }));
}

export async function generateMetadata(
  props: PageProps<'/reference/[[...slug]]'>,
): Promise<Metadata> {
  const params = await props.params;
  return getDocsPageMetadata(toSlugs(params.slug));
}
