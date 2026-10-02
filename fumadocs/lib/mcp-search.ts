// MCP `search` tool. Replaces fumadocs' `registerSearchTool`, which returns
// every hit of the site search unfiltered: a natural-language query such as
// "how do I filter products by sku in v3" matches nearly every section (the
// index ORs the terms and prefix-matches, so "i" matches any word starting
// with "i"), and the default result limit is lost because the tool passes
// `limit: undefined`. That produced hundreds of results and ~80k tokens.
//
// Here we strip filler words from the query, group hits by page, rank pages by
// which query terms they match and where (title > content > breadcrumbs/URL,
// rare terms weighted higher, v3 preferred over legacy unless asked), and
// return a short Markdown list.
import type { McpServer } from '@modelcontextprotocol/server';
import type { SearchServer } from 'fumadocs-core/search/server';
import { z } from 'zod';

const DEFAULT_LIMIT = 8;
const MAX_LIMIT = 20;
const SNIPPETS_PER_PAGE = 3;
const SNIPPET_LENGTH = 240;
// Raw hits fetched from the index before grouping and re-ranking.
const RAW_HIT_LIMIT = 300;

// Words that carry no meaning in a docs query, plus question phrasing.
const STOP_WORDS = new Set(
  (
    'a an and are as at be but by can could do does for from get got have how i if in into is it its ' +
    'me my of on or our should so than that the their them then there these this those to us use using ' +
    'want was we what when where which who why will with would you your'
  ).split(' '),
);

interface SearchHit {
  id: string;
  type: 'page' | 'heading' | 'text';
  content: string;
  url: string;
  breadcrumbs?: string[];
}

interface PageResult {
  title: string;
  url: string;
  breadcrumbs: string[];
  snippets: { content: string; url: string }[];
  order: number;
}

export function queryTerms(query: string): string[] {
  const tokens = query.toLowerCase().match(/[\p{L}\p{N}_-]+/gu) ?? [];
  return [...new Set(tokens.filter((t) => t.length > 1 && !STOP_WORDS.has(t)))];
}

function clean(content: string): string {
  return content
    .replace(/<\/?mark>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function truncate(text: string): string {
  return text.length > SNIPPET_LENGTH ? `${text.slice(0, SNIPPET_LENGTH).trimEnd()}…` : text;
}

// Crude English stemming, enough to match "products"/"product",
// "filtering"/"filter", "paginate"/"pagination", "categories"/"category".
const SUFFIXES: [RegExp, string][] = [
  [/ations?$/, ''],
  [/ates?$/, ''],
  [/ing$/, ''],
  [/ies$/, 'i'],
  [/ed$/, ''],
  [/s$/, ''],
  [/y$/, 'i'],
];

export function stem(word: string): string {
  let result = word;
  for (const [suffix, replacement] of SUFFIXES) {
    const next = word.replace(suffix, replacement);
    if (next !== word) {
      if (next.length >= 4) result = next;
      break;
    }
  }
  if (result.length > 4 && result.endsWith('e')) result = result.slice(0, -1);
  if (result.length > 4 && /([^aeiou])\1$/.test(result)) result = result.slice(0, -1);
  return result;
}

function words(text: string): Set<string> {
  return new Set((text.toLowerCase().match(/[\p{L}\p{N}_]+/gu) ?? []).map(stem));
}

function hasTerm(haystack: Set<string>, term: string): boolean {
  const t = stem(term);
  for (const word of haystack) if (word.startsWith(t)) return true;
  return false;
}

// Weight per matched term: title > matching sections > breadcrumbs/URL.
const TITLE_WEIGHT = 3;
const CONTENT_WEIGHT = 1;
const LOCATION_WEIGHT = 0.5;
// Legacy (v1/v2) pages rank below v3 ones unless the query asks for legacy,
// and vice versa.
const OTHER_VERSION_FACTOR = 0.7;
const LEGACY_QUERY = /\b(v1|v2|legacy)\b/i;

export async function searchDocs(server: SearchServer, query: string, limit = DEFAULT_LIMIT, locale?: string) {
  const terms = queryTerms(query);
  // The index doesn't stem but does prefix-match, so also send each term's stem
  // ("paginate" -> "pagin" finds "pagination").
  const effectiveQuery =
    terms.length > 0 ? [...new Set(terms.flatMap((t) => [t, stem(t)]))].join(' ') : query;
  const wantsLegacy = LEGACY_QUERY.test(query);
  const hits = (await server.search(effectiveQuery, { locale, limit: RAW_HIT_LIMIT })) as SearchHit[];

  // Results arrive grouped: a `page` entry followed by its matching sections,
  // with pages ordered by their best-scoring section.
  const pages = new Map<string, PageResult & { text: string[] }>();
  let current: (PageResult & { text: string[] }) | undefined;

  for (const hit of hits) {
    if (hit.type === 'page') {
      current = pages.get(hit.url);
      if (!current) {
        const title = clean(hit.content);
        current = {
          title,
          url: hit.url,
          breadcrumbs: hit.breadcrumbs ?? [],
          snippets: [],
          order: pages.size,
          text: [title],
        };
        pages.set(hit.url, current);
      }
      continue;
    }

    if (!current) continue;
    const content = clean(hit.content);
    current.text.push(content);
    if (current.snippets.length < SNIPPETS_PER_PAGE && content) {
      current.snippets.push({ content: truncate(content), url: hit.url });
    }
  }

  // Score each page by which query terms it contains and where, weighting rare
  // terms above common ones ("sku" says more than "v3"), then break ties with
  // the index's own order.
  const candidates = [...pages.values()].map((page) => ({
    page,
    title: words(page.title),
    content: words(page.text.join(' ')),
    location: words(`${page.breadcrumbs.join(' ')} ${page.url.replace(/[/_-]/g, ' ')}`),
  }));
  const idf = new Map(
    terms.map((term) => {
      const df = candidates.filter((c) => hasTerm(c.content, term) || hasTerm(c.title, term)).length;
      return [term, Math.log(1 + candidates.length / Math.max(df, 1))];
    }),
  );

  const ranked = candidates
    .map(({ page, title, content, location }) => {
      let score = 0;
      for (const term of terms) {
        const weight =
          (hasTerm(title, term) ? TITLE_WEIGHT : 0) +
          (hasTerm(content, term) ? CONTENT_WEIGHT : 0) +
          (hasTerm(location, term) ? LOCATION_WEIGHT : 0);
        score += weight * (idf.get(term) ?? 1);
      }
      const isLegacy = page.url.includes('/reference/legacy/');
      const isV3 = page.url.includes('/reference/v3/');
      if ((isLegacy && !wantsLegacy) || (isV3 && wantsLegacy)) score *= OTHER_VERSION_FACTOR;
      return { ...page, score };
    })
    .sort((a, b) => b.score - a.score || a.order - b.order);

  return { terms, total: ranked.length, pages: ranked.slice(0, limit) };
}

function toMarkdown(query: string, result: Awaited<ReturnType<typeof searchDocs>>): string {
  if (result.pages.length === 0) return `No results for "${query}".`;

  const lines = [
    `Top ${result.pages.length} of ${result.total} matching pages for "${query}". Use get_page with a page URL to read it in full.`,
  ];

  result.pages.forEach((page, i) => {
    const trail = page.breadcrumbs.length > 0 ? ` (${page.breadcrumbs.join(' > ')})` : '';
    lines.push('', `${i + 1}. [${page.title}](${page.url})${trail}`);
    for (const snippet of page.snippets) {
      lines.push(`   - ${snippet.content}${snippet.url !== page.url ? ` [${snippet.url}]` : ''}`);
    }
  });

  return lines.join('\n');
}

export function registerDocsSearchTool(mcp: McpServer, server: SearchServer) {
  mcp.registerTool(
    'search',
    {
      title: 'Search Docs',
      description:
        'Search the docs by keywords. Returns the most relevant pages, each with a few matching snippets. ' +
        'Follow up with get_page to read a page in full.',
      inputSchema: z.object({
        query: z.string(),
        limit: z
          .number()
          .int()
          .min(1)
          .max(MAX_LIMIT)
          .optional()
          .describe(`Maximum number of pages to return (default ${DEFAULT_LIMIT}, max ${MAX_LIMIT}).`),
        locale: z.string().optional(),
      }),
    },
    async ({ query, limit, locale }) => ({
      content: [{ type: 'text', text: toMarkdown(query, await searchDocs(server, query, limit, locale)) }],
    }),
  );
}
