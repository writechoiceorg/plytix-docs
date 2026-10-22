import { source } from '@/lib/source';
import {
  DocsBody,
  DocsPage,
  DocsTitle,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/notebook/page';
import { MarkdownCopyButton } from '@/components/page-actions';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { getPageImageUrl, getPageMarkdownUrl, gitConfig, isReferenceSlugs } from '@/lib/shared';
import { openapi } from '@/lib/openapi';
import { getPageOperation } from '@/lib/openapi-markdown';

/**
 * Renders one content page. Shared by the /docs and /reference routes, which
 * serve the same content tree (see `url` in lib/source.ts).
 */
export async function DocsPageView({ slugs }: { slugs: string[] }) {
  const page = source.getPage(slugs);
  if (!page) notFound();

  const MDX = page.data.body;
  const markdownUrl = getPageMarkdownUrl(page).url;
  const openapiProps = page.data._openapi ? await openapi.preloadOpenAPIPage(page) : undefined;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <div className="flex flex-row gap-2 items-center pb-4">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover
          className="plytix-pill-button"
          markdownUrl={markdownUrl}
          githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${page.path}`}
        />
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
          {...openapiProps}
        />
      </DocsBody>
    </DocsPage>
  );
}

const VERSION_LABELS: Record<string, string> = {
  v3: 'V3 (Beta)',
  'v1-v2': 'V1/V2 (Legacy)',
};

/** First sentence of an operation's description, as plain text for a meta tag. */
function firstSentence(markdown: string | undefined): string | undefined {
  const paragraph = markdown
    ?.split(/\n\s*\n/)
    .map((p) => p.trim())
    .find((p) => /^[A-Za-z`]/.test(p));
  if (!paragraph) return;
  const text = paragraph
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[`*_]/g, '')
    .replace(/\s+/g, ' ');
  const sentence = text.match(/^.+?[.!?](?=\s|$)/)?.[0] ?? `${text.replace(/[\s:;,]+$/, '')}.`;
  return sentence.length > 200 ? `${sentence.slice(0, 197).replace(/\s+\S*$/, '')}…` : sentence;
}

/**
 * Titles get the site name from the root layout's title template, and
 * reference pages also name their API version, so V3 and V1/V2 pages with the
 * same name ("Get a product") stay distinct in tabs and search results.
 * Generated endpoint pages have no description of their own, so one is built
 * from the operation.
 */
export function getDocsPageMetadata(slugs: string[]): Metadata {
  const page = source.getPage(slugs);
  if (!page) notFound();

  const found = getPageOperation(page);
  let version = isReferenceSlugs(slugs) ? VERSION_LABELS[slugs[1]] : undefined;
  // V1 and V2 (beta) both have pages such as "Create a product"; name the one
  // each endpoint belongs to.
  if (slugs[1] === 'v1-v2' && found?.path.startsWith('/api/v1/')) version = 'V1 (Legacy)';
  if (slugs[1] === 'v1-v2' && found?.path.startsWith('/api/v2/')) version = 'V2 beta (Legacy)';
  const title =
    version && !page.data.title.startsWith(version.split(' ')[0])
      ? `${page.data.title} · ${version}`
      : page.data.title;

  let description = page.data.description;
  if (!description && found && version) {
    const route = `${found.method.toUpperCase()} ${found.path}`;
    const summary = firstSentence(found.operation.description);
    description = summary
      ? `${summary} Plytix ${version} API reference for ${route}.`
      : `${page.data.title} with ${route}, from the Plytix ${version} API reference.`;
  }

  return {
    title,
    description,
    openGraph: {
      images: getPageImageUrl(page).url,
    },
  };
}
