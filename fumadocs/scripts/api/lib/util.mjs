// Small shared helpers for the V3 spec pipeline (scripts/api/).

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import YAML from 'yaml';

// fumadocs/ — every default path in the pipeline is relative to it.
export const SITE_ROOT = path.resolve(import.meta.dirname, '../../..');

export const HTTP_METHODS = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'];

export const readJson = async (file) => JSON.parse(await readFile(file, 'utf-8'));
export const readYaml = async (file) => YAML.parse(await readFile(file, 'utf-8'));

export const writeJson = async (file, data) => {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(data, null, 2) + '\n');
};

export const writeYaml = async (file, data, header = '') => {
  await mkdir(path.dirname(file), { recursive: true });
  const body = YAML.stringify(data, { lineWidth: 0, blockQuote: 'literal' });
  await writeFile(file, header + body);
};

export const sha256 = (text) => createHash('sha256').update(text).digest('hex');

export const clone = (value) => (value === undefined ? undefined : structuredClone(value));

export const isPlainObject = (value) =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

// Order-insensitive for object keys, so a re-serialized spec doesn't look changed.
export const deepEqual = (a, b) => {
  if (a === b) return true;
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false;
    return a.every((item, i) => deepEqual(item, b[i]));
  }
  if (isPlainObject(a) && isPlainObject(b)) {
    const keys = Object.keys(a);
    if (keys.length !== Object.keys(b).length) return false;
    return keys.every((k) => Object.hasOwn(b, k) && deepEqual(a[k], b[k]));
  }
  return false;
};

// Every operation in a spec, as { key: "GET /path", path, method, op }.
export function* operations(spec) {
  for (const [routePath, pathItem] of Object.entries(spec.paths ?? {})) {
    for (const method of HTTP_METHODS) {
      const op = pathItem?.[method];
      if (op) yield { key: `${method.toUpperCase()} ${routePath}`, path: routePath, method, op };
    }
  }
}

// "$['paths']['/a']['get']['parameters'][1]" -> ['paths', '/a', 'get', 'parameters', 1]
export const parseNormalizedPath = (normalized) => {
  const segments = [];
  const re = /\['((?:[^'\\]|\\.)*)'\]|\[(\d+)\]/g;
  let m;
  while ((m = re.exec(normalized))) {
    segments.push(m[1] !== undefined ? m[1].replace(/\\(.)/g, '$1') : Number(m[2]));
  }
  return segments;
};

export const getAt = (root, segments) => {
  let node = root;
  for (const seg of segments) {
    if (node === null || typeof node !== 'object') return undefined;
    node = node[seg];
  }
  return node;
};

// A position-independent name for a node. Array items that are OpenAPI
// parameters are named by `name@in` instead of their index, so upstream
// reordering a parameter list doesn't read as drift. Object keys containing
// '.', brackets or quotes are JSON-quoted so the key parses back unambiguously.
const encodeSeg = (seg) => (/[.[\]"]/.test(seg) ? JSON.stringify(seg) : seg);

export const stableKey = (root, segments) => {
  let node = root;
  let key = '$';
  for (const seg of segments) {
    if (typeof seg === 'number') {
      const item = node?.[seg];
      key += item && item.name && item.in ? `[${item.name}@${item.in}]` : `[${seg}]`;
    } else {
      key += `.${encodeSeg(seg)}`;
    }
    node = node?.[seg];
  }
  return key;
};

const splitStableKey = (key) => {
  const out = [];
  let i = 1; // skip '$'
  while (i < key.length) {
    if (key[i] === '.') {
      i++;
      if (key[i] === '"') {
        let j = i + 1;
        while (j < key.length && !(key[j] === '"' && key[j - 1] !== '\\')) j++;
        out.push({ key: JSON.parse(key.slice(i, j + 1)) });
        i = j + 1;
      } else {
        let j = i;
        while (j < key.length && key[j] !== '.' && key[j] !== '[') j++;
        out.push({ key: key.slice(i, j) });
        i = j;
      }
    } else if (key[i] === '[') {
      const j = key.indexOf(']', i);
      const inner = key.slice(i + 1, j);
      if (/^\d+$/.test(inner)) {
        out.push({ key: Number(inner) });
      } else {
        const at = inner.lastIndexOf('@');
        out.push({ param: inner.slice(0, at), in: inner.slice(at + 1) });
      }
      i = j + 1;
    } else {
      throw new Error(`Malformed stable key: ${key}`);
    }
  }
  return out;
};

// Finds the node a stable key names in another document (undefined if absent).
export const resolveStableKey = (root, key) => {
  let node = root;
  for (const seg of splitStableKey(key)) {
    if (node === null || typeof node !== 'object') return undefined;
    if (seg.param) {
      node = Array.isArray(node)
        ? node.find((p) => p?.name === seg.param && p?.in === seg.in)
        : undefined;
    } else {
      node = node[seg.key];
    }
  }
  return node;
};
