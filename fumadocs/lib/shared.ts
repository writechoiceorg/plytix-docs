import { createGetUrl } from 'fumadocs-core/source';

export const appName = 'Plytix Docs';
export const docsRoute = '/docs';
// content/docs/reference/** is served at /reference/** instead of /docs/reference/**.
export const referenceFolder = 'reference';
export const referenceRoute = '/reference';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';

// Update once the repo is transferred to the client (see comments-1.md).
export const gitConfig = {
  user: 'writechoiceorg',
  repo: 'plytix-test-deploy',
  branch: 'main',
};

export function isReferenceSlugs(slugs: string[] | undefined): slugs is string[] {
  return slugs?.[0] === referenceFolder;
}

/** Public URL of a content page, from its slugs. */
export function getPageUrl(slugs: string[]): string {
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
