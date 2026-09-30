// Markdown rendering of OpenAPI operation pages, for llms.txt / MCP `get_page`.
//
// Generated endpoint pages (content/docs/reference/{v3,legacy}) have no
// Markdown body: their content is drawn at request time by <OpenAPIPage />,
// so `getText('processed')` only yields an empty string. This renders the
// same operation (parameters, request body, responses) straight from the spec.
import openapiSchema from '@/openapi.json';
import openapiV1V2Schema from '@/openapi-v1v2.json';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Json = any;

// Keys match the `_openapi.preload` ids written into each page's frontmatter.
const documents: Record<string, Json> = {
  './openapi.json': openapiSchema,
  './openapi-v1v2.json': openapiV1V2Schema,
};

const MAX_DEPTH = 6;

interface OpenAPIPageLike {
  slugs: string[];
  data: { _openapi?: { preload?: string[]; method?: string } };
}

/**
 * Returns the operation as Markdown, or `undefined` if the page isn't a
 * generated OpenAPI operation page.
 */
export function renderOpenAPIPageMarkdown(page: OpenAPIPageLike): string | undefined {
  const meta = page.data._openapi;
  const docId = meta?.preload?.[0];
  const doc = docId ? documents[docId] : undefined;
  if (!doc || !meta?.method) return;

  // `generateFiles({ per: 'operation' })` names each file after its operationId.
  const operationId = page.slugs.at(-1);
  const found = findOperation(doc, operationId, meta.method.toLowerCase());
  if (!found) return;

  return renderOperation(doc, found.path, found.method, found.pathItem, found.operation);
}

function findOperation(doc: Json, operationId: string | undefined, method: string) {
  for (const [path, pathItem] of Object.entries<Json>(doc.paths ?? {})) {
    const operation = pathItem?.[method];
    if (operation?.operationId === operationId) return { path, method, pathItem, operation };
  }
}

function renderOperation(doc: Json, path: string, method: string, pathItem: Json, op: Json) {
  const out: string[] = [];

  out.push(`\`${method.toUpperCase()} ${path}\``);
  if (op.deprecated) out.push('> **Deprecated.**');

  const servers: Json[] = op.servers ?? pathItem.servers ?? doc.servers ?? [];
  if (servers.length > 0) {
    out.push(
      `**Base URL:** ${servers.map((s) => `\`${s.url}\`${s.description ? ` (${s.description})` : ''}`).join(', ')}`,
    );
  }

  if (op.description) out.push(op.description.trim());
  else if (op.summary) out.push(op.summary.trim());

  const security = renderSecurity(doc, op.security ?? doc.security);
  if (security) out.push(`## Authorization\n\n${security}`);

  // Operation-level parameters override path-level ones with the same name + location.
  const params = new Map<string, Json>();
  for (const p of [...(pathItem.parameters ?? []), ...(op.parameters ?? [])]) {
    const resolved = resolve(doc, p);
    params.set(`${resolved.in}:${resolved.name}`, resolved);
  }
  for (const [location, title] of [
    ['path', 'Path parameters'],
    ['query', 'Query parameters'],
    ['header', 'Header parameters'],
    ['cookie', 'Cookie parameters'],
  ]) {
    const list = [...params.values()].filter((p) => p.in === location);
    if (list.length > 0) out.push(`## ${title}\n\n${renderParameters(doc, list)}`);
  }

  if (op.requestBody) {
    const body = resolve(doc, op.requestBody);
    const parts = [`## Request body${body.required ? ' (required)' : ''}`];
    if (body.description) parts.push(body.description.trim());
    parts.push(...renderContent(doc, body.content));
    out.push(parts.join('\n\n'));
  }

  const responses = Object.entries<Json>(op.responses ?? {});
  if (responses.length > 0) {
    const parts = ['## Responses'];
    for (const [status, raw] of responses) {
      const res = resolve(doc, raw);
      parts.push(`### ${status}${res.description ? ` — ${oneLine(res.description)}` : ''}`);
      parts.push(...renderContent(doc, res.content));
    }
    out.push(parts.join('\n\n'));
  }

  return out.join('\n\n');
}

function renderSecurity(doc: Json, security: Json[] | undefined) {
  if (!security || security.length === 0) return;
  const schemes = doc.components?.securitySchemes ?? {};
  const lines: string[] = [];
  for (const requirement of security) {
    for (const name of Object.keys(requirement)) {
      const scheme = schemes[name];
      if (!scheme) continue;
      let label: string = scheme.type;
      if (scheme.type === 'http') label = `HTTP ${scheme.scheme}`;
      else if (scheme.type === 'apiKey') label = `API key in ${scheme.in} \`${scheme.name}\``;
      lines.push(`- \`${name}\` (${label})${scheme.description ? `: ${oneLine(scheme.description)}` : ''}`);
    }
  }
  return lines.join('\n');
}

function renderParameters(doc: Json, params: Json[]) {
  const rows = ['| Name | Type | Required | Description |', '| --- | --- | --- | --- |'];
  for (const p of params) {
    const schema = p.schema ? resolve(doc, p.schema) : undefined;
    const details = [p.description ?? schema?.description, constraints(schema)]
      .filter(Boolean)
      .map((s) => oneLine(s as string));
    rows.push(
      `| \`${p.name}\` | ${schema ? typeLabel(doc, schema) : ''} | ${p.required ? 'Yes' : 'No'} | ${cell(details.join(' '))} |`,
    );
  }
  return rows.join('\n');
}

function renderContent(doc: Json, content: Json | undefined) {
  const parts: string[] = [];
  for (const [mediaType, media] of Object.entries<Json>(content ?? {})) {
    parts.push(`Content type: \`${mediaType}\``);
    const schema = media.schema ? resolve(doc, media.schema) : undefined;
    if (schema && Object.keys(schema).length > 0) {
      const fields = renderSchema(doc, schema, 0, new Set());
      parts.push(fields || `Type: ${typeLabel(doc, schema)}`);
    }
    const example = media.example ?? Object.values<Json>(media.examples ?? {})[0]?.value ?? schema?.example;
    if (example !== undefined) {
      parts.push(`Example:\n\n\`\`\`json\n${JSON.stringify(example, null, 2)}\n\`\`\``);
    }
  }
  return parts;
}

/** Renders an object/array schema as a nested bullet list of its fields. */
function renderSchema(doc: Json, raw: Json, depth: number, seen: Set<string>): string {
  const { schema, seen: nextSeen } = deref(doc, raw, seen);
  if (!schema) return '';

  const object = objectSchema(doc, schema, nextSeen);
  if (object) {
    const required = new Set<string>(object.required ?? []);
    const indent = '  '.repeat(depth);
    const lines: string[] = [];
    for (const [name, prop] of Object.entries<Json>(object.properties ?? {})) {
      const resolved = resolve(doc, prop);
      const details = [resolved.description, constraints(resolved)]
        .filter(Boolean)
        .map((s) => oneLine(s as string))
        .join(' ');
      lines.push(
        `${indent}- \`${name}\` (${typeLabel(doc, prop)}${required.has(name) ? ', required' : ''})${details ? `: ${details}` : ''}`,
      );
      if (depth + 1 < MAX_DEPTH) {
        const nested = renderSchema(doc, prop, depth + 1, nextSeen);
        if (nested) lines.push(nested);
      }
    }
    if (object.additionalProperties && typeof object.additionalProperties === 'object') {
      lines.push(`${indent}- \`<key>\` (${typeLabel(doc, resolve(doc, object.additionalProperties))}): additional properties`);
    }
    return lines.join('\n');
  }

  if (schema.type === 'array' && schema.items) return renderSchema(doc, schema.items, depth, nextSeen);

  // `anyOf: [X, null]` (FastAPI's optional fields): expand the non-null branch.
  const branches = nonNullBranches(schema);
  if (branches.length === 1) return renderSchema(doc, branches[0], depth, nextSeen);

  return '';
}

/** Merges `allOf` members into a single object schema, if this is an object. */
function objectSchema(doc: Json, schema: Json, seen: Set<string>): Json | undefined {
  if (schema.allOf) {
    const merged: Json = { properties: {}, required: [] };
    for (const part of schema.allOf) {
      const { schema: p } = deref(doc, part, seen);
      const obj = p && objectSchema(doc, p, seen);
      if (!obj) continue;
      Object.assign(merged.properties, obj.properties);
      merged.required.push(...(obj.required ?? []));
    }
    Object.assign(merged.properties, schema.properties);
    merged.required.push(...(schema.required ?? []));
    return Object.keys(merged.properties).length > 0 ? merged : undefined;
  }
  if (schema.properties || (schema.type === 'object' && schema.additionalProperties)) return schema;
}

function typeLabel(doc: Json, raw: Json, depth = 0): string {
  const schema = resolve(doc, raw);
  const refName = typeof raw?.$ref === 'string' ? raw.$ref.split('/').at(-1) : undefined;
  if (depth > 3) return refName ?? 'object';

  const union = schema.anyOf ?? schema.oneOf;
  if (union) return union.map((s: Json) => typeLabel(doc, s, depth + 1)).join(' | ');
  if (schema.allOf) return refName ?? schema.title ?? 'object';

  let type = Array.isArray(schema.type) ? schema.type.join(' | ') : schema.type;
  if (type === 'array') type = `array of ${schema.items ? typeLabel(doc, schema.items, depth + 1) : 'any'}`;
  else if (type === 'object' || (!type && schema.properties)) type = refName ?? schema.title ?? 'object';
  else if (!type) type = refName ?? schema.title ?? 'any';
  if (schema.format) type += ` (${schema.format})`;
  if (schema.nullable) type += ' | null';
  return type;
}

function constraints(schema: Json | undefined) {
  if (!schema) return;
  const out: string[] = [];
  if (schema.enum) out.push(`One of: ${schema.enum.map((v: Json) => `\`${JSON.stringify(v)}\``).join(', ')}.`);
  if (schema.default !== undefined) out.push(`Default: \`${JSON.stringify(schema.default)}\`.`);
  for (const key of ['minimum', 'maximum', 'minLength', 'maxLength', 'minItems', 'maxItems', 'pattern']) {
    if (schema[key] !== undefined) out.push(`${key}: \`${schema[key]}\`.`);
  }
  return out.join(' ') || undefined;
}

function nonNullBranches(schema: Json): Json[] {
  const union: Json[] = schema.anyOf ?? schema.oneOf ?? [];
  return union.filter((s) => s?.type !== 'null');
}

/** Follows local `$ref`s, tracking visited refs so recursive schemas terminate. */
function deref(doc: Json, raw: Json, seen: Set<string>): { schema?: Json; seen: Set<string> } {
  let schema = raw;
  let next = seen;
  while (typeof schema?.$ref === 'string') {
    if (next.has(schema.$ref)) return { seen: next };
    next = new Set(next).add(schema.$ref);
    schema = lookup(doc, schema.$ref);
  }
  return { schema, seen: next };
}

function resolve(doc: Json, raw: Json): Json {
  let schema = raw;
  for (let i = 0; i < 10 && typeof schema?.$ref === 'string'; i++) schema = lookup(doc, schema.$ref);
  return schema ?? {};
}

function lookup(doc: Json, ref: string): Json {
  if (!ref.startsWith('#/')) return undefined;
  return ref
    .slice(2)
    .split('/')
    .map((s) => s.replace(/~1/g, '/').replace(/~0/g, '~'))
    .reduce((node, key) => node?.[key], doc);
}

function oneLine(s: string) {
  return s.replace(/\s*\n\s*/g, ' ').trim();
}

function cell(s: string) {
  return s.replace(/\|/g, '\\|');
}
