import { createMDX } from 'fumadocs-mdx/next';
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
import { readFileSync } from 'node:fs';

initOpenNextCloudflareForDev();

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Moved pages: old /docs/reference/** URLs (long operationId slugs) to the short
  // /reference/** ones, plus renamed guides.
  // Exact page moves first, then prefix fallbacks; see redirects.json.
  async redirects() {
    return JSON.parse(readFileSync(new URL('./redirects.json', import.meta.url), 'utf-8'));
  },
};

export default withMDX(config);
