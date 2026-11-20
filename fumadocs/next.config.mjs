import { createMDX } from 'fumadocs-mdx/next';
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
import { buildRedirects } from './redirects.config.mjs';

initOpenNextCloudflareForDev();

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Moved pages and V3 URL changes, minus unpublished destinations. Built in
  // redirects.config.mjs and checked by `npm run redirects:check`.
  async redirects() {
    return buildRedirects();
  },
  // Docs pages have an HTML and a Markdown representation at the same URL,
  // chosen by `Accept` (proxy.ts). Next replaces a Vary header set in the proxy
  // with its own RSC values, but appends those to one set here (STG-013).
  async headers() {
    return ['/guides', '/mcp', '/reference'].flatMap((base) =>
      [base, `${base}/:path*`].map((source) => ({ source, headers: [{ key: 'Vary', value: 'Accept' }] })),
    );
  },
};

export default withMDX(config);
