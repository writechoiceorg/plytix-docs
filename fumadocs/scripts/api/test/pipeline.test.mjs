// npm run api:test
//
// Exercises the pipeline against copies of the real upstream spec with
// self-contained test overlays, so the tests don't depend on our content.
// Each scenario mutates the upstream copy the way a real Plytix drop might.

import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import YAML from 'yaml';
import { runBuild } from '../lib/pipeline.mjs';
import { SITE_ROOT, readJson, readYaml } from '../lib/util.mjs';
import { trimResponses } from '../lib/responses.mjs';
import { checkContent } from '../lib/validate.mjs';

const NESTED = '/api/v3/products/{product_id}/relationships/{relationship_id}';

const OVERLAY = {
  overlay: '1.0.0',
  info: { title: 'test', version: '1.0.0' },
  actions: [
    {
      target: "$.paths['/api/v3/products'].get",
      update: { summary: 'Search products', description: 'Test description.' },
    },
    {
      target: "$.paths['/api/v3/products'].get.parameters[?(@.name=='_fields' && @.in=='query')]",
      update: { description: 'Test _fields description.' },
    },
    {
      target: "$.paths['/api/v3/product-categories/{identifier}'].delete",
      update: { description: 'Deletes a category.' },
    },
    {
      target: '$.components.schemas.ProductCreateDto.properties.sku',
      update: { description: 'Test SKU description.' },
    },
  ],
};

const FIXES = {
  overlay: '1.0.0',
  info: { title: 'fixes', version: '1.0.0' },
  actions: [],
};

const META = {
  overlay: '1.0.0',
  info: { title: 'meta', version: '1.0.0' },
  actions: [
    {
      target: '$',
      update: {
        security: [{ bearerAuth: [] }],
        components: { securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer' } } },
      },
    },
  ],
};

let upstream;
let visibility;

before(async () => {
  upstream = await readJson(path.join(SITE_ROOT, 'upstream/openapi-v3.json'));
  visibility = await readYaml(path.join(SITE_ROOT, 'upstream/visibility.yaml'));
  // Every public operation with undeclared path params needs a fix, or lint fails.
  for (const [p, item] of Object.entries(upstream.paths)) {
    for (const [method, op] of Object.entries(item)) {
      if (visibility.operations[`${method.toUpperCase()} ${p}`] !== 'public') continue;
      const declared = new Set((op.parameters ?? []).filter((x) => x.in === 'path').map((x) => x.name));
      const missing = [...p.matchAll(/\{([^}]+)\}/g)].map((m) => m[1]).filter((n) => !declared.has(n));
      if (!missing.length) continue;
      FIXES.actions.push({
        target: `$.paths['${p}'].${method}`,
        'x-plytix-question': 'OAS-1',
        update: { parameters: missing.map((name) => ({ name, in: 'path', required: true, schema: { type: 'string' } })) },
      });
    }
  }
});

// A fresh workspace: upstream copy, visibility, overlays, outputs.
async function workspace(mutate = () => {}, { overlay = OVERLAY } = {}) {
  const dir = await mkdtemp(path.join(tmpdir(), 'api-pipeline-'));
  const spec = structuredClone(upstream);
  const vis = structuredClone(visibility);
  mutate(spec, vis);
  await mkdir(path.join(dir, 'overlays/ops'), { recursive: true });
  await writeFile(path.join(dir, 'upstream.json'), JSON.stringify(spec));
  await writeFile(path.join(dir, 'visibility.yaml'), YAML.stringify(vis));
  await writeFile(path.join(dir, 'overlays/00-fixes.yaml'), YAML.stringify(FIXES));
  await writeFile(path.join(dir, 'overlays/20-meta.yaml'), YAML.stringify(META));
  await writeFile(path.join(dir, 'overlays/ops/test.yaml'), YAML.stringify(overlay));
  return dir;
}

const build = (dir, extra = {}) =>
  runBuild({
    source: path.join(dir, 'upstream.json'),
    visibility: path.join(dir, 'visibility.yaml'),
    overlaysDir: path.join(dir, 'overlays'),
    lockFile: path.join(dir, 'baseline.lock.json'),
    out: path.join(dir, 'openapi.json'),
    redirectsFile: path.join(dir, 'redirects.json'),
    reportDir: path.join(dir, 'reports'),
    tmpDir: path.join(dir, 'tmp'),
    generate: false,
    lint: false,
    // The fixture overlays describe only a few operations.
    contentChecks: false,
    ...extra,
  });

// Re-run a workspace against a mutated upstream, keeping its baseline lock.
async function rebuildWith(dir, mutate, extra) {
  const spec = structuredClone(upstream);
  const vis = structuredClone(visibility);
  mutate(spec, vis);
  await writeFile(path.join(dir, 'upstream.json'), JSON.stringify(spec));
  await writeFile(path.join(dir, 'visibility.yaml'), YAML.stringify(vis));
  return build(dir, extra);
}

const codes = (result) => result.drift.errors.map((e) => e.code).sort();

test('clean build applies edits, writes the artifact and baselines every edit', async () => {
  const dir = await workspace();
  const result = await build(dir, { lint: true });
  assert.equal(result.ok, true, result.report);
  const out = await readJson(path.join(dir, 'openapi.json'));
  assert.equal(out.paths['/api/v3/products'].get.description, 'Test description.');
  assert.ok(!out.paths['/api/v3/channels'], 'internal operations are filtered out');
  assert.deepEqual(out.paths['/api/v3/products'].get.tags, ['products'], 'tags are normalized');
  const lock = await readJson(path.join(dir, 'baseline.lock.json'));
  assert.ok(lock.actions["ops/test.yaml::$.paths['/api/v3/products'].get"]);
});

test('simulated rename: path, parameter and type changes fail with precise drift', async () => {
  const dir = await workspace();
  assert.equal((await build(dir)).ok, true);

  const result = await rebuildWith(dir, (spec, vis) => {
    // 1. path renamed
    const item = spec.paths['/api/v3/product-categories/{identifier}'];
    delete spec.paths['/api/v3/product-categories/{identifier}'];
    spec.paths['/api/v3/categories/{identifier}'] = item;
    for (const m of ['get', 'patch', 'delete']) {
      delete vis.operations[`${m.toUpperCase()} /api/v3/product-categories/{identifier}`];
      vis.operations[`${m.toUpperCase()} /api/v3/categories/{identifier}`] = 'public';
    }
    // 2. parameter renamed
    spec.paths['/api/v3/products'].get.parameters.find((p) => p.name === '_fields').name = 'fields';
    // 3. property type changed
    spec.components.schemas.ProductCreateDto.properties.sku.type = 'integer';
  });

  assert.equal(result.ok, false);
  assert.deepEqual(codes(result), ['TYPE_CHANGED', 'ZERO_MATCH', 'ZERO_MATCH']);
  const ids = result.drift.errors.map((e) => e.id).join('\n');
  assert.match(ids, /product-categories\/\{identifier\}'\]\.delete/);
  assert.match(ids, /_fields/);
  assert.match(ids, /ProductCreateDto\.properties\.sku/);
  const report = await readFile(path.join(dir, 'reports/api-drift.md'), 'utf-8');
  assert.match(report, /ZERO_MATCH \(2\)/);
  assert.equal(
    (await readJson(path.join(dir, 'openapi.json'))).paths['/api/v3/products'].get.parameters[0].name,
    '_fields',
    'a failed build leaves the previous artifact untouched',
  );
});

test('simulated upstream fix: redundant fixes and changed overridden fields are reported; accept clears the latter', async () => {
  const dir = await workspace();
  assert.equal((await build(dir)).ok, true);

  const fixIt = (spec) => {
    // Plytix declares the missing path params on one nested route...
    spec.paths[NESTED].get.parameters.push(
      { name: 'product_id', in: 'path', required: true, schema: { type: 'string' } },
      { name: 'relationship_id', in: 'path', required: true, schema: { type: 'string' } },
    );
    // ...and writes its own description where we override one.
    spec.paths['/api/v3/products'].get.description = 'Upstream now documents this.';
  };

  const result = await rebuildWith(dir, fixIt);
  assert.equal(result.ok, false);
  assert.ok(codes(result).includes('REDUNDANT_FIX'));
  const changed = result.drift.errors.find((e) => e.code === 'UPSTREAM_CHANGED');
  assert.equal(changed.field, 'description');
  assert.equal(changed.now, 'Upstream now documents this.');

  const accepted = await rebuildWith(dir, fixIt, { accept: true });
  assert.deepEqual(codes(accepted), ['REDUNDANT_FIX', 'REDUNDANT_FIX'], 'accept never clears a redundant fix');
  assert.ok(accepted.drift.reviewed.some((e) => e.code === 'UPSTREAM_CHANGED'));
});

test('upstream changes to fields we did not edit flow through untouched', async () => {
  const dir = await workspace();
  assert.equal((await build(dir)).ok, true);
  const result = await rebuildWith(dir, (spec) => {
    spec.components.schemas.ProductCreateDto.properties.label.description = 'New upstream label text.';
    spec.paths['/api/v3/assets'].get.description = 'New upstream asset search text.';
  });
  assert.equal(result.ok, true, result.report);
  const out = await readJson(path.join(dir, 'openapi.json'));
  assert.equal(out.components.schemas.ProductCreateDto.properties.label.description, 'New upstream label text.');
  assert.equal(out.paths['/api/v3/assets'].get.description, 'New upstream asset search text.');
});

test('an operation missing from visibility.yaml blocks the build', async () => {
  const dir = await workspace((spec) => {
    spec.paths['/api/v3/widgets'] = { get: { tags: ['v3', 'widgets'], responses: { 200: { description: 'ok' } } } };
  });
  const result = await build(dir);
  assert.equal(result.ok, false);
  assert.ok(result.errors.some((e) => e.includes('GET /api/v3/widgets')));
});

test('targets outside the allowed shapes are rejected', async () => {
  const dir = await workspace(() => {}, {
    overlay: {
      ...OVERLAY,
      actions: [{ target: "$.paths['/api/v3/products'].get.parameters[0]", update: { description: 'x' } }],
    },
  });
  const result = await build(dir);
  assert.equal(result.ok, false);
  assert.ok(result.errors.some((e) => e.includes('not an allowed shape')));
});

test('on-hold operations are left out, their edits kept and their baseline preserved', async () => {
  const dir = await workspace();
  assert.equal((await build(dir)).ok, true);
  const key = "ops/test.yaml::$.paths['/api/v3/product-categories/{identifier}'].delete";
  const before = (await readJson(path.join(dir, 'baseline.lock.json'))).actions[key];

  const result = await rebuildWith(dir, (spec, vis) => {
    vis.operations['DELETE /api/v3/product-categories/{identifier}'] = 'on-hold';
  });
  assert.equal(result.ok, true, result.report);
  const out = await readJson(path.join(dir, 'openapi.json'));
  assert.ok(!out.paths['/api/v3/product-categories/{identifier}'].delete, 'held operation is not published');
  assert.ok(result.notices.some((n) => n.startsWith('on hold:') && n.includes('DELETE /api/v3/product-categories/{identifier}')));
  const after = (await readJson(path.join(dir, 'baseline.lock.json'))).actions[key];
  assert.deepEqual(after, before, 'baseline entry survives while on hold');
});

test('links to a reference page this spec will not generate fail, even if a stale MDX file exists', async () => {
  // content/docs/reference/v3/products/search-products.mdx exists on disk, but
  // the fixture spec keeps the FastAPI operationId, so that URL won't be generated.
  const dir = await workspace(() => {}, {
    overlay: {
      ...OVERLAY,
      actions: [
        {
          target: "$.paths['/api/v3/products'].post",
          update: { description: 'See [Search products](/reference/v3/products/search-products).' },
        },
      ],
    },
  });
  const result = await build(dir);
  assert.equal(result.ok, false);
  assert.ok(result.errors.some((e) => e.includes('broken internal link') && e.includes('/products/search-products')));
});

test('each operation keeps its success response and its most specific error', () => {
  const json = (media) => ({ 'application/json': media });
  const shared = { $ref: '#/components/schemas/OperationResponse' };
  const ex = (value) => json({ schema: shared, examples: { a: { value }, b: { value } } });
  const generic = (description) => ({ description, content: json({ schema: shared }) });
  const spec = {
    paths: {
      '/x': {
        post: {
          responses: {
            201: { description: 'created' },
            400: generic('bad'),
            401: { description: 'auth', content: ex({ errors: ['auth'] }) },
            404: { description: 'missing', content: ex({ errors: ['missing'] }) },
            409: { description: 'duplicate', content: ex({ errors: ['duplicate'] }) },
            422: generic('invalid'),
            500: generic('server'),
          },
        },
        get: { responses: { 200: { description: 'ok' }, 400: generic('bad'), 401: generic('auth'), 422: generic('invalid') } },
      },
    },
  };
  trimResponses(spec);
  const { post, get } = spec.paths['/x'];
  assert.deepEqual(Object.keys(post.responses), ['201', '409'], 'a specific error with an example wins over shared and generic ones');
  assert.deepEqual(Object.keys(post.responses[409].content['application/json'].examples), ['a'], 'a repeated example is dropped');
  assert.deepEqual(Object.keys(get.responses), ['200', '422'], 'without a specific example, 422 is the fallback');
});

test('content checks: missing descriptions, lost upstream descriptions, and null success bodies', () => {
  const base = {
    paths: { '/x': { get: { parameters: [{ name: 'q', in: 'query', description: 'Upstream text.' }] } } },
    components: { schemas: { S: { properties: { a: { description: 'Field text.' }, gone: { description: 'x' } } } } },
  };
  const spec = {
    paths: {
      '/x': {
        get: {
          description: ' ',
          parameters: [{ name: 'q', in: 'query' }],
          responses: { 200: { content: { 'application/json': { schema: {} } } }, 204: { description: 'done' } },
        },
      },
    },
    components: { schemas: { S: { properties: { a: {} } } } },
  };
  const { errors } = checkContent(spec, base);
  assert.ok(errors.some((e) => e.includes('GET /x: no description')));
  assert.ok(errors.some((e) => e.includes('query:q lost its upstream description')));
  assert.ok(errors.some((e) => e.includes('GET /x 200') && e.includes('renders as null')));
  assert.ok(errors.some((e) => e.includes('S.a lost its upstream description')));
  assert.ok(!errors.some((e) => e.includes('S.gone')), 'a removed field is not reported');
  assert.equal(errors.length, 4);
});
