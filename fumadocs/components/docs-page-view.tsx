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
import { getPageImageUrl, getPageMarkdownUrl, gitConfig } from '@/lib/shared';
import { openapi } from '@/lib/openapi';

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

export function getDocsPageMetadata(slugs: string[]): Metadata {
  const page = source.getPage(slugs);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImageUrl(page).url,
    },
  };
}
