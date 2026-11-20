#!/usr/bin/env node
// Checks that every redirect lands on a page that exists (NEW-011).
//
//   npm run redirects:check            # published pages (hidden-content.json applied)
//   npm run redirects:check -- --all   # every page, as in a full preview with V3 visible
//
// Uses the same list next.config.mjs serves (redirects.config.mjs), follows chains,
// and checks the prefix fallbacks against every historical source in
// redirects.json. Exits with 1 when a redirect is broken.

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildRedirects } from '../redirects.config.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const readJson = (file) => JSON.parse(readFileSync(join(root, file), 'utf-8'));
const showAll = process.argv.includes('--all');

const hiddenContent = showAll ? [] : readJson('hidden-content.json');
const isHidden = (path) => hiddenContent.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));

// Content path (relative to content/docs, no extension) to public URL: lib/shared.ts `sections`.
function pageUrl(contentPath) {
  const path = contentPath.replace(/(^|\/)index$/, '');
  if (path === 'guides/mcp' || path.startsWith('guides/mcp/')) return `/mcp${path.slice('guides/mcp'.length)}`;
  return `/${path}`;
}

function contentPages(dir = join(root, 'content/docs')) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...contentPages(full));
    else if (name.endsWith('.mdx')) {
      out.push(relative(join(root, 'content/docs'), full).replace(/\\/g, '/').replace(/\.mdx$/, ''));
    }
  }
  return out;
}

const pages = new Set(['/']);
for (const path of contentPages()) if (!isHidden(path)) pages.add(pageUrl(path));
const exists = (url) => pages.has(url.replace(/[#?].*$/, '').replace(/\.md$/, '').replace(/(.)\/$/, '$1'));

const redirects = buildRedirects({ hiddenContent }).map((r) => ({ ...r, match: toMatcher(r.source) }));

/** A Next/path-to-regexp source (`:name`, `:name*`, `:name(regex)`) as a RegExp with named groups. */
function toMatcher(source) {
  let pattern = '';
  for (const part of source.split(/(?=\/:)/)) {
    const param = /^\/:(\w+)(\*|\((.*)\))?$/.exec(part);
    if (!param) pattern += escape(part);
    else if (param[2] === '*') pattern += `(?:/(?<${param[1]}>.*))?`;
    else if (param[3]) pattern += `/(?<${param[1]}>${param[3]})`;
    else pattern += `/(?<${param[1]}>[^/]+)`;
  }
  return new RegExp(`^${pattern}$`);
}

function escape(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Where a URL ends up after every redirect, the first matching rule winning as in Next. */
function resolve(url, seen = new Set()) {
  if (seen.has(url)) return { url, loop: true };
  seen.add(url);
  for (const r of redirects) {
    const m = r.match.exec(url);
    if (!m) continue;
    const destination = r.destination.replace(/\/:(\w+)\*?/g, (_, name) =>
      m.groups?.[name] ? `/${m.groups[name]}` : '',
    );
    return resolve(destination || '/', seen);
  }
  return { url };
}

const problems = [];
const sources = new Set([
  ...redirects.filter((r) => !r.source.includes(':')).map((r) => r.source),
  // Every historical URL, including those whose exact redirect is skipped because
  // its destination is unpublished: they must 404, not redirect to a missing page.
  ...readJson('redirects.json')
    .map((r) => r.source)
    .filter((s) => !s.includes(':')),
]);
for (const source of sources) {
  const end = resolve(source);
  if (end.loop) problems.push(`${source} -> loop at ${end.url}`);
  else if (end.url !== source && !exists(end.url)) problems.push(`${source} -> ${end.url} (missing)`);
}

const label = showAll ? 'every page (full preview)' : 'published pages';
if (problems.length) {
  const destinations = new Set(problems.map((p) => p.split(' -> ')[1].split(' ')[0]));
  console.error(`${problems.length} broken redirect(s) to ${destinations.size} missing destination(s), checked against ${label}:`);
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}
console.log(`${sources.size} historical URLs checked against ${label}: every redirect lands on an existing page.`);
