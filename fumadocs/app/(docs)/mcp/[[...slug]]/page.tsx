import { source } from '@/lib/source';
import type { Metadata } from 'next';
import { DocsPageView, getDocsPageMetadata } from '@/components/docs-page-view';
import { isMcpSlugs, mcpFolder } from '@/lib/shared';

// Serves content/docs/guides/mcp/** at /mcp/** (see `url` in lib/source.ts).
const toSlugs = (slug: string[] | undefined) => [...mcpFolder, ...(slug ?? [])];

export default async function Page(props: PageProps<'/mcp/[[...slug]]'>) {
  const params = await props.params;
  return <DocsPageView slugs={toSlugs(params.slug)} />;
}

export async function generateStaticParams() {
  return source
    .generateParams()
    .filter((params) => isMcpSlugs(params.slug))
    .map((params) => ({ ...params, slug: params.slug.slice(mcpFolder.length) }));
}

export async function generateMetadata(props: PageProps<'/mcp/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params;
  return getDocsPageMetadata(toSlugs(params.slug));
}
