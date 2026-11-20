import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';
import { buildIndexDefault, normalizeStructuredData, rankResults, type SearchResult } from '@/lib/search-index';

const server = createFromSource(source, {
  // Raw OpenAPI descriptions (Markdown tables, links, emphasis) become short plain-text
  // entries, so results show a concise excerpt rather than table markup (STG-048).
  async buildIndex(page) {
    const index = await buildIndexDefault(page);
    return { ...index, structuredData: normalizeStructuredData(index.structuredData) };
  },
});

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const query = url.searchParams.get('query');
  if (!query) return Response.json([]);

  const limit = Number(url.searchParams.get('limit'));
  const results = (await server.search(query, {
    tag: url.searchParams.get('tag')?.split(','),
    locale: url.searchParams.get('locale') ?? undefined,
    limit: Number.isInteger(limit) && limit > 0 ? limit : undefined,
  })) as SearchResult[];

  // Pages whose title is the query come first, labelled by API version (NEW-012).
  return Response.json(rankResults(query, results, source.getPages()));
}
