import type { StructuredData } from 'fumadocs-core/mdx-plugins';
import type { SortedResult } from 'fumadocs-core/search';
import type { AdvancedIndex } from 'fumadocs-core/search/server';
import { getPageVersionLabel } from './page-version';
import type { source } from './source';

export type SearchResult = SortedResult;
type Page = ReturnType<typeof source.getPages>[number];

/** Fumadocs' default index for a page (not exported by fumadocs-core). */
export async function buildIndexDefault(page: Page): Promise<AdvancedIndex> {
  const data = page.data as {
    structuredData?: StructuredData | (() => Promise<StructuredData>);
    load?: () => Promise<{ structuredData: StructuredData }>;
  };
  let structuredData: StructuredData | undefined;
  if (data.structuredData) {
    structuredData = typeof data.structuredData === 'function' ? await data.structuredData() : data.structuredData;
  } else if (typeof data.load === 'function') {
    structuredData = (await data.load()).structuredData;
  }
  if (!structuredData) throw new Error(`No structured data for ${page.url}`);
  return {
    id: page.url,
    url: page.url,
    title: page.data.title,
    description: page.data.description,
    structuredData,
  };
}

const TABLE_ROW = /^\s*\|.*\|\s*$/;
const TABLE_SEPARATOR = /^\s*\|(\s*:?-{2,}:?\s*\|)+\s*$/;

/** Markdown inline syntax as plain text: links keep their label, code keeps its text. */
export function plainText(markdown: string): string {
  return markdown
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/^\s{0,3}#{1,6}\s+/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/(\*\*|__)(.+?)\1/g, '$2')
    .replace(/(^|[\s(])[*_]([^*_\s][^*_]*?)[*_](?=[\s).,;:!?]|$)/g, '$1$2')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

const MAX_ENTRY = 240;

function shorten(text: string): string {
  if (text.length <= MAX_ENTRY) return text;
  const cut = text.slice(0, MAX_ENTRY - 1);
  const sentence = cut.match(/^.*[.!?](?=\s)/)?.[0];
  return sentence && sentence.length > MAX_ENTRY / 2 ? sentence : `${cut.replace(/\s+\S*$/, '')}…`;
}

/**
 * Splits each content entry into short plain-text entries. A Markdown table
 * (common in raw OpenAPI descriptions) becomes one entry per data row, as
 * "cell · cell", so it stays searchable without showing table markup.
 */
export function normalizeStructuredData(data: StructuredData): StructuredData {
  const contents: StructuredData['contents'] = [];
  for (const entry of data.contents) {
    const lines = entry.content.split('\n');
    const prose: string[] = [];
    const flush = () => {
      const text = plainText(prose.join('\n'));
      prose.length = 0;
      if (text) contents.push({ heading: entry.heading, content: shorten(text) });
    };
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (!TABLE_ROW.test(line)) {
        if (line.trim() === '') flush();
        else prose.push(line);
        continue;
      }
      flush();
      if (TABLE_SEPARATOR.test(line)) continue;
      // A header row is followed by the separator row (possibly after blank lines).
      const next = lines.slice(i + 1).find((l) => l.trim() !== '');
      if (next && TABLE_SEPARATOR.test(next)) continue;
      const cells = line
        .trim()
        .replace(/^\||\|$/g, '')
        .split('|')
        .map((cell) => plainText(cell))
        .filter(Boolean);
      if (cells.length) contents.push({ heading: entry.heading, content: shorten(cells.join(' · ')) });
    }
    flush();
  }
  return {
    headings: data.headings.map((h) => ({ ...h, content: plainText(h.content) })),
    contents,
  };
}

const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();

/**
 * Moves the pages whose title is exactly the query to the top, in the order
 * V3, V1, V2 beta, and labels each with its API version when several share the
 * title. A matching page missing from the results is added. Every other result
 * keeps its order (NEW-012).
 */
export function rankResults(query: string, results: SearchResult[], pages: Page[]): SearchResult[] {
  const wanted = normalize(query);
  if (!wanted) return results;

  const exact = pages.filter((page) => normalize(page.data.title) === wanted);
  if (exact.length === 0) return results;

  // Results come grouped: a `page` entry followed by its heading/text hits.
  const groups: SearchResult[][] = [];
  for (const result of results) {
    if (result.type === 'page' || groups.length === 0) groups.push([result]);
    else groups[groups.length - 1].push(result);
  }

  const versionOrder = ['V3', 'V1', 'V2'];
  const rank = (page: Page) => {
    const label = getPageVersionLabel(page) ?? '';
    const i = versionOrder.findIndex((v) => label.startsWith(v));
    return i === -1 ? versionOrder.length : i;
  };
  const labelled = exact.length > 1;

  const top: SearchResult[][] = [...exact]
    .sort((a, b) => rank(a) - rank(b))
    .map((page) => {
      const index = groups.findIndex((group) => group[0].url === page.url);
      const group: SearchResult[] =
        index === -1
          ? [{ id: page.url, type: 'page', url: page.url, content: page.data.title } as SearchResult]
          : groups.splice(index, 1)[0];
      const version = labelled ? getPageVersionLabel(page) : undefined;
      if (version && group[0].type === 'page') {
        group[0] = { ...group[0], content: `${group[0].content} · ${version}` } as SearchResult;
      }
      return group;
    });

  return [...top, ...groups].flat();
}
