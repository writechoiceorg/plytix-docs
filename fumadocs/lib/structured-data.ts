import { getBreadcrumbItems } from 'fumadocs-core/breadcrumb';
import { absoluteUrl, appName, siteUrl } from './shared';
import { source } from './source';

type Page = NonNullable<ReturnType<typeof source.getPage>>;

/**
 * schema.org data for a docs page (STG-046): a TechArticle and the same
 * breadcrumb trail the page shows (fumadocs' visible breadcrumb uses the same
 * page-tree path and options). Pages show no dates, so none are claimed here.
 */
export function getStructuredData(page: Page, title: string, description?: string) {
  const crumbs = getBreadcrumbItems(page.url, source.getPageTree())
    // Only labelled crumbs that link somewhere, as the visible breadcrumb shows them.
    .filter((item): item is { name: string; url: string } => typeof item.name === 'string' && !!item.url);

  const breadcrumb = {
    '@type': 'BreadcrumbList',
    itemListElement: [...crumbs, { name: title, url: page.url }].map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        headline: title,
        ...(description ? { description } : {}),
        url: absoluteUrl(page.url),
        inLanguage: 'en',
        isPartOf: { '@type': 'WebSite', name: appName, url: `${siteUrl}/` },
        publisher: { '@type': 'Organization', name: 'Plytix', url: 'https://www.plytix.com' },
      },
      breadcrumb,
    ],
  };
}

/** JSON for an inline <script type="application/ld+json">, safe against `</script>`. */
export function toJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\u003c');
}
