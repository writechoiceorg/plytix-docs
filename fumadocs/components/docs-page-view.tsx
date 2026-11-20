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
import {
  appName,
  getPageImageUrl,
  getPageMarkdownUrl,
  gitConfig,
  isReferenceSlugs,
  v3Published,
} from '@/lib/shared';
import { openapi } from '@/lib/openapi';
import { getPageOperation } from '@/lib/openapi-markdown';
import { getPageVersionLabel } from '@/lib/page-version';
import { getStructuredData, toJsonLd } from '@/lib/structured-data';
import { Callout } from '@/components/callout';
import Link from 'fumadocs-core/link';

/**
 * Renders one content page. Shared by the /guides, /mcp and /reference routes, which
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: toJsonLd(getStructuredData(page, page.data.title, page.data.description)),
        }}
      />
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
        <LegacyVersionNote slugs={slugs} page={page} />
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

const MAPPING = '/guides/migrating-to-v3/endpoint-mapping';

/** Where a V1/V2 endpoint's V3 equivalent is documented, by its path. */
function v3EquivalentFor(path: string): { href: string; label: string } {
  const root = path.split('/')[3];
  const section = (anchor: string, label: string) => ({ href: `${MAPPING}#${anchor}`, label });
  if (path.startsWith('/auth/')) return { href: '/reference/v3/authentication', label: 'V3 authentication' };
  if (root === 'accounts' || root === 'filters') {
    return { href: '/guides/migrating-to-v3/not-migrated-and-new-in-v3', label: "What's new and not migrated" };
  }
  if (root === 'products' && path.includes('/variant')) return section('variants', 'Endpoint mapping: Variants');
  if (root === 'products' && path.includes('/relationships')) {
    return section('product-relationships', 'Endpoint mapping: Product relationships');
  }
  if (root === 'products') return section('products', 'Endpoint mapping: Products');
  if (root === 'assets') return section('assets', 'Endpoint mapping: Assets');
  if (root === 'attributes' || root === 'attribute-groups') {
    return section('attributes-and-attribute-groups', 'Endpoint mapping: Attributes and attribute groups');
  }
  if (root === 'categories') return section('categories', 'Endpoint mapping: Categories');
  if (root === 'product_families') return section('product-families', 'Endpoint mapping: Product families');
  if (root === 'relationships') return section('relationship-definitions', 'Endpoint mapping: Relationship definitions');
  return { href: MAPPING, label: 'Endpoint mapping' };
}

/**
 * V1/V2 endpoint pages are generated, so their version note is added here
 * rather than in each file. Concept pages carry the same note in their MDX.
 */
function LegacyVersionNote({ slugs, page }: { slugs: string[]; page: NonNullable<ReturnType<typeof source.getPage>> }) {
  // The note only points to V3, so it's off while V3 is hidden (hiddenContent).
  if (!v3Published) return null;
  if (!isReferenceSlugs(slugs) || slugs[1] !== 'v1-v2') return null;
  const found = getPageOperation(page);
  if (!found) return null;

  const api = found.path.startsWith('/api/v2/') ? 'V2 beta API' : 'V1 API';
  const target = v3EquivalentFor(found.path);
  return (
    <Callout type="info" title="V1/V2 (Legacy)">
      This endpoint is part of the {api}. For V3 (Beta), see <Link href={target.href}>{target.label}</Link>.
    </Callout>
  );
}

/** First sentence of an operation's description, as plain text for a meta tag. */
function firstSentence(markdown: string | undefined): string | undefined {
  const paragraph = markdown
    ?.split(/\n\s*\n/)
    .map((p) => p.trim())
    .find((p) => /^[A-Za-z`]/.test(p));
  if (!paragraph) return;
  const text = paragraph
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[`*]/g, '')
    // `_emphasis_` loses its underscores; identifiers such as `parent_level` keep theirs.
    .replace(/(^|[\s("“])_([^_\s][^_]*?)_(?=[\s).,;:!?"”]|$)/g, '$1$2')
    .replace(/\s+/g, ' ');
  const sentence = text.match(/^.+?[.!?](?=\s|$)/)?.[0] ?? `${text.replace(/[\s:;,]+$/, '')}.`;
  return sentence.length > 200 ? `${sentence.slice(0, 197).replace(/\s+\S*$/, '')}…` : sentence;
}

const MAX_DESCRIPTION = 160;

/**
 * A generated endpoint description within the length search results show: the
 * summary, then the API version, then the route if it still fits (STG-019).
 */
function operationDescription(summary: string, version: string, route: string): string {
  const withRoute = `${summary} Plytix ${version} API: ${route}.`;
  if (withRoute.length <= MAX_DESCRIPTION) return withRoute;
  const suffix = ` Plytix ${version} API.`;
  const room = MAX_DESCRIPTION - suffix.length;
  const short = summary.length <= room ? summary : `${summary.slice(0, room - 1).replace(/\s+\S*$/, '')}…`;
  return `${short}${suffix}`;
}

/**
 * Targeted overrides for generated reference pages whose title or description
 * is too long or too vague in search results and shared links (STG-019). Keyed
 * by page URL; generated MDX is rewritten on every build, so overrides live here.
 */
const PAGE_META_OVERRIDES: Record<string, { title?: string; description?: string }> = {
  '/reference/v1-v2/product-families/list-all-family-attributes': {
    title: 'List all family attributes · V1 (Legacy)',
    description:
      'List every attribute of a product family, system attributes included, with its inheritance level. Plytix V1 (Legacy) API.',
  },
  '/reference/v1-v2/product-families/edit-all-family-attributes': {
    title: 'Edit all family attributes · V1 (Legacy)',
    description:
      "Set the inheritance level of a product family's attributes, system attributes included. Plytix V1 (Legacy) API.",
  },
  '/reference/v1-v2/authentication/get-token': {
    description:
      'Exchange your API key and password for the bearer token every V1/V2 request needs. Plytix V1/V2 (Legacy) API: POST /auth/api/get-token.',
  },
  '/reference/v1-v2/product-attribute-groups/create-product-attribute-group': {
    description:
      'Create a product attribute group and choose the attributes it holds. Plytix V1 (Legacy) API: POST /api/v1/attribute-groups/product.',
  },
  '/reference/v1-v2/available-filters/get-available-product-filters': {
    description:
      'List the fields you can filter products on, and the operators each one accepts. Plytix V1 (Legacy) API: GET /api/v1/filters/product.',
  },
};

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
  const version = getPageVersionLabel(page);
  // `metaTitle` / `metaDescription` (frontmatter) override the generated values
  // when the page title is too generic or the generated text too crowded (STG-019, STG-020).
  const override = PAGE_META_OVERRIDES[page.url];
  const title =
    page.data.metaTitle ??
    override?.title ??
    (version && !page.data.title.startsWith(version.split(' ')[0])
      ? `${page.data.title} · ${version}`
      : page.data.title);

  let description = page.data.metaDescription ?? override?.description ?? page.data.description;
  if (!description && found && version) {
    description = operationDescription(
      firstSentence(found.operation.description) ?? `${page.data.title}.`,
      version,
      `${found.method.toUpperCase()} ${found.path}`,
    );
  }

  const image = getPageImageUrl(page).url;
  return {
    title,
    description,
    // The HTML page is canonical for every format of this page (HTML, `.md`, Accept
    // negotiation). Each API version keeps its own page, so its own canonical (STG-014).
    alternates: {
      canonical: page.url,
      types: { 'text/markdown': `${page.url}.md` },
    },
    // Next replaces (doesn't merge) the root openGraph, so siteName is repeated here.
    openGraph: {
      title,
      description,
      url: page.url,
      siteName: appName,
      type: 'article',
      images: image,
    },
    twitter: { card: 'summary_large_image', title, description, images: image },
  };
}
