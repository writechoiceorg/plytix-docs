import { isReferenceSlugs } from './shared';
import { getPageOperation } from './openapi-markdown';

type PageLike = Parameters<typeof getPageOperation>[0] & { slugs: string[] };

const VERSION_LABELS: Record<string, string> = {
  v3: 'V3 (Beta)',
  'v1-v2': 'V1/V2 (Legacy)',
};

/**
 * API version of a reference page, for titles and search results, so pages with
 * the same name ("Get a product") in V1, V2 beta and V3 stay distinct.
 * `undefined` for guides and MCP pages.
 */
export function getPageVersionLabel(page: PageLike): string | undefined {
  const { slugs } = page;
  if (!isReferenceSlugs(slugs)) return;
  // V1 and V2 (beta) both have pages such as "Create a product"; name the one
  // each endpoint belongs to.
  const found = slugs[1] === 'v1-v2' ? getPageOperation(page) : undefined;
  if (found?.path.startsWith('/api/v1/')) return 'V1 (Legacy)';
  if (found?.path.startsWith('/api/v2/')) return 'V2 beta (Legacy)';
  return VERSION_LABELS[slugs[1]];
}
