import { createGetUrl } from 'fumadocs-core/source';

export const appName = 'Plytix Docs';
export const docsRoute = '/docs';
// content/docs/reference/** is served at /reference/** instead of /docs/reference/**.
export const referenceFolder = 'reference';
export const referenceRoute = '/reference';
// content/docs/guides/mcp/** is served at /mcp/** instead of /docs/guides/mcp/**.
export const mcpFolder = ['guides', 'mcp'];
export const mcpRoute = '/mcp';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';

// Update once the repo is transferred to the client (see comments-1.md).
export const gitConfig = {
  user: 'writechoiceorg',
  repo: 'plytix-test-deploy',
  branch: 'main',
};

// Content folders this deployment publishes (null publishes everything). This
// branch ships the V1 and V2 reference and the Plytix MCP section: every other
// page is left out of the source, so it has no route, search entry, llms.txt
// entry, .md or OG image. guides/meta.json lists only the MCP section for now;
// restore its full list when the guides are published.
export const publishedFolders: string[] | null = ['reference/v1-v2', 'guides/mcp'];

// Where `/` (and `/reference`, when its landing page isn't published) leads.
export const landingRoute = '/reference/v1-v2/api-v1-v2-reference';

/**
 * Whether a content file (path relative to content/docs) is published. The
 * meta.json files of a published folder's ancestors are kept too, so the
 * folder keeps its place (and tab) in the page tree.
 */
export function isPublishedPath(path: string): boolean {
  if (!publishedFolders) return true;
  return publishedFolders.some((folder) => {
    if (path.startsWith(`${folder}/`)) return true;
    const meta = path.match(/^(.*\/)?meta\.json$/);
    return meta !== null && `${folder}/`.startsWith(meta[1] ?? '');
  });
}

export function isReferenceSlugs(slugs: string[] | undefined): slugs is string[] {
  return slugs?.[0] === referenceFolder;
}

export function isMcpSlugs(slugs: string[] | undefined): boolean {
  return mcpFolder.every((segment, i) => slugs?.[i] === segment);
}

/** Public URL of a content page, from its slugs. */
export function getPageUrl(slugs: string[]): string {
  if (isMcpSlugs(slugs)) return [mcpRoute, ...slugs.slice(mcpFolder.length)].join('/');
  if (isReferenceSlugs(slugs)) return [referenceRoute, ...slugs.slice(1)].join('/');
  return [docsRoute, ...slugs].join('/');
}

const getContentUrl = createGetUrl(docsContentRoute);

export function getPageMarkdownUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'content.md'];

  return { segments, url: getContentUrl(segments, page.locale) };
}

const getImageUrl = createGetUrl(docsImageRoute);

export function getPageImageUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'image.png'];

  return { segments, url: getImageUrl(segments, page.locale) };
}
