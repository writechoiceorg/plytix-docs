import { createGetUrl } from 'fumadocs-core/source';
import hiddenContentList from '@/hidden-content.json';

export const appName = 'Plytix Docs';
// Internal base of the content tree. No page is served under /docs: every page
// belongs to one of the `sections` below, which map content folders to public routes.
export const docsRoute = '/docs';
export const referenceFolder = 'reference';
export const referenceRoute = '/reference';
export const guidesRoute = '/guides';
export const mcpRoute = '/mcp';

/**
 * Public route of each content folder, most specific first.
 * content/docs/guides/mcp/** → /mcp/**, content/docs/reference/** → /reference/**,
 * content/docs/guides/** → /guides/**.
 */
export const sections = [
  { folder: ['guides', 'mcp'], route: mcpRoute },
  { folder: [referenceFolder], route: referenceRoute },
  { folder: ['guides'], route: guidesRoute },
] as const;

export type SectionRoute = (typeof sections)[number]['route'];

/**
 * Content kept in the repo but not published, listed in hidden-content.json
 * (paths relative to content/docs; a folder hides everything inside it).
 * lib/source.ts drops these from the source, so they leave the pages, sidebar,
 * search, llms.txt, .md routes and OG images together; next.config.mjs reads the
 * same file and skips redirects that would land on them.
 *
 * API V3 ships in a later phase (David, 6 Nov 2026, FB-061): the November 9
 * launch has the Plytix MCP pages and the V1/V2 reference only. Every API guide
 * is written for V3, so they're hidden with it. To publish V3, empty the list,
 * restore guides/meta.json, and revert the V1/V2 page edits from the same commit.
 */
export const hiddenContent: readonly string[] = hiddenContentList;

/** Whether V3 content is published. Drives the V3 notes in generated V1/V2 pages. */
export const v3Published = !hiddenContent.includes('reference/v3');

/** Whether a content path (relative to content/docs, with or without extension) is hidden. */
export function isHiddenContent(path: string): boolean {
  const clean = path.replace(/\\/g, '/').replace(/^\.?\//, '');
  return hiddenContent.some((prefix) => clean === prefix || clean.startsWith(`${prefix}/`) || clean.startsWith(`${prefix}.`));
}

const startsWith = (slugs: readonly string[], prefix: readonly string[]) =>
  prefix.every((segment, i) => slugs[i] === segment);

/** The section a content page belongs to, from its slugs. */
export function getSection(slugs: readonly string[] | undefined) {
  return sections.find((section) => startsWith(slugs ?? [], section.folder));
}

/** Content slugs for a URL slug under a section route, e.g. /mcp/overview → guides/mcp/overview. */
export function toContentSlugs(route: SectionRoute, slug: string[] | undefined): string[] {
  const section = sections.find((s) => s.route === route)!;
  return [...section.folder, ...(slug ?? [])];
}

/** Whether content slugs are served by this section route (and not by a more specific one). */
export function isServedBy(route: SectionRoute, slugs: readonly string[] | undefined): boolean {
  return getSection(slugs)?.route === route;
}

/** URL slugs (relative to the section route) for content slugs served by that route. */
export function toUrlSlugs(route: SectionRoute, slugs: string[]): string[] {
  const section = sections.find((s) => s.route === route)!;
  return slugs.slice(section.folder.length);
}
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
  const section = getSection(slugs);
  if (section) return [section.route, ...slugs.slice(section.folder.length)].join('/');
  // Pages outside every section (none today) keep the internal base.
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
