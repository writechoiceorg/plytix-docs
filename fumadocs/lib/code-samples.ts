/**
 * Code-sample generators for the API reference "request" tabs.
 *
 * Replaces the stock fumadocs-openapi generators (registered through the
 * supported `codeUsages` option of `createOpenAPIPage`) because the stock ones
 * produce programs that don't compile or don't send the payload from the
 * editor (client feedback PM-41, PM-51, PM-57):
 *
 * - every program sends exactly the body text the playground sends
 *   (`JSON.stringify(body, null, 2)` for JSON media types), whatever quotes,
 *   backslashes, backticks or newlines the payload contains;
 * - Java, C# and Rust are complete programs, and Go uses distinct
 *   `requestBody` / `responseBody` variables;
 * - multipart file fields upload a file from disk instead of a string.
 *
 * Media types other than JSON, NDJSON, form-urlencoded, text/plain and
 * multipart/form-data fall back to the stock generator (none of our specs use
 * them).
 *
 * Path parameters are encoded by `pathnameFromRequest` (patched in
 * `patches/fumadocs-openapi+*.patch`) before `data.url` reaches these
 * generators.
 *
 * This file must stay free of runtime TypeScript-only syntax (enums,
 * namespaces...): `scripts/code-samples.test.mjs` imports it directly with
 * Node's type stripping.
 */
import {
  createCodeUsageGeneratorRegistry,
  type CodeUsageGenerator,
  type CodeUsageGeneratorRegistry,
} from 'fumadocs-openapi/requests/generators';
import { csharp as stockCsharp } from 'fumadocs-openapi/requests/generators/csharp';
import { curl as stockCurl } from 'fumadocs-openapi/requests/generators/curl';
import { go as stockGo } from 'fumadocs-openapi/requests/generators/go';
import { java as stockJava } from 'fumadocs-openapi/requests/generators/java';
import { javascript as stockJavascript } from 'fumadocs-openapi/requests/generators/javascript';
import { python as stockPython } from 'fumadocs-openapi/requests/generators/python';
import { rust as stockRust } from 'fumadocs-openapi/requests/generators/rust';

type GeneratorData = Parameters<CodeUsageGenerator['generate']>[0];

/**
 * Multipart fields that hold a file. In the static examples the sampled value
 * of a `format: binary` field is the string "string", and generators don't get
 * the schema, so the field name decides. `file` is the only binary multipart
 * field in our specs (V1 PUT /api/v1/assets/{asset_id}/content).
 * In the playground a picked file arrives as a `Blob`/`File` and is detected
 * by type.
 */
const MULTIPART_FILE_FIELDS = new Set(['file']);
/** Placeholder path shown for file uploads. */
const PLACEHOLDER_FILE = 'image.png';

type Part =
  | { name: string; kind: 'text'; value: string }
  | { name: string; kind: 'file'; fileName: string };

type Body =
  | { kind: 'none' }
  /** `json` is set when the payload is a JSON document (not a raw string). */
  | { kind: 'text'; mediaType: string; text: string; json?: unknown; form?: Record<string, string> }
  | { kind: 'multipart'; parts: Part[] }
  | { kind: 'unsupported' };

function normalizeMediaType(mediaType: string): string {
  return mediaType.split(';', 1)[0].trim().toLowerCase();
}

function isJsonMediaType(mediaType: string): boolean {
  return mediaType === 'application/json' || mediaType.endsWith('+json');
}

function isBlob(value: unknown): value is Blob {
  return typeof Blob !== 'undefined' && value instanceof Blob;
}

function partValue(value: unknown): string {
  return typeof value === 'object' ? JSON.stringify(value) : String(value);
}

/** Mirrors the request body the playground encodes (media/adapter.js `encode`). */
export function resolveBody(data: Pick<GeneratorData, 'body' | 'bodyMediaType'>): Body {
  if (!data.body || !data.bodyMediaType) return { kind: 'none' };
  const mediaType = normalizeMediaType(data.bodyMediaType);
  const body = data.body;

  if (isJsonMediaType(mediaType) || mediaType === 'text/plain') {
    return { kind: 'text', mediaType, text: JSON.stringify(body, null, 2), json: body };
  }
  if (mediaType === 'application/x-ndjson') {
    const text = Array.isArray(body)
      ? body.map((v) => JSON.stringify(v)).join('\n')
      : JSON.stringify(body);
    return { kind: 'text', mediaType, text };
  }
  if (mediaType === 'application/x-www-form-urlencoded' && typeof body === 'object') {
    const form: Record<string, string> = {};
    for (const [k, v] of Object.entries(body as Record<string, unknown>)) {
      if (v !== undefined && v !== null) form[k] = String(v);
    }
    return { kind: 'text', mediaType, text: new URLSearchParams(form).toString(), form };
  }
  if (mediaType === 'multipart/form-data' && typeof body === 'object') {
    const parts: Part[] = [];
    const add = (name: string, value: unknown) => {
      if (value === null || value === undefined || Number.isNaN(value)) return;
      if (isBlob(value) || (typeof value === 'string' && MULTIPART_FILE_FIELDS.has(name))) {
        const fileName =
          typeof File !== 'undefined' && value instanceof File && value.name
            ? value.name
            : PLACEHOLDER_FILE;
        parts.push({ name, kind: 'file', fileName });
      } else {
        parts.push({ name, kind: 'text', value: partValue(value) });
      }
    };
    for (const [name, value] of Object.entries(body as Record<string, unknown>)) {
      if (Array.isArray(value)) for (const item of value) add(name, item);
      else add(name, value);
    }
    // The static example of an upload whose `file` property isn't marked
    // required samples to `{}` (V1 replace-asset-content). An empty upload is
    // never a useful sample, so show the file part.
    if (parts.length === 0) {
      for (const name of MULTIPART_FILE_FIELDS) parts.push({ name, kind: 'file', fileName: PLACEHOLDER_FILE });
    }
    return { kind: 'multipart', parts };
  }
  return { kind: 'unsupported' };
}

/** Request headers (incl. cookies and the body Content-Type) as ordered pairs. */
function requestHeaders(data: GeneratorData, body: Body): [string, string][] {
  const out: [string, string][] = [];
  for (const [k, v] of Object.entries(data.header)) {
    // multipart needs the generated boundary, which every client sets itself
    if (body.kind === 'multipart' && k.toLowerCase() === 'content-type') continue;
    out.push([k, v.value]);
  }
  const cookies = Object.entries(data.cookie);
  if (cookies.length > 0) out.push(['Cookie', cookies.map(([k, v]) => `${k}=${v.value}`).join('; ')]);
  if (body.kind === 'text' && !out.some(([k]) => k.toLowerCase() === 'content-type')) {
    out.push(['Content-Type', body.mediaType]);
  }
  return out;
}

// ---------------------------------------------------------------------------
// String literal helpers
// ---------------------------------------------------------------------------

/** POSIX shell single-quoted word: the only special character is `'` itself. */
export function shellQuote(value: string): string {
  return `'${value.replaceAll("'", `'\\''`)}'`;
}

/**
 * Double-quoted literal for JS, Python, Go, Java and C#: every escape that
 * JSON.stringify emits (\" \\ \b \f \n \r \t \uXXXX) is valid in all five.
 */
const dq = (value: string) => JSON.stringify(value);

/** C# treats U+0085/U+2028/U+2029 as line breaks, so they can't appear raw in a literal. */
const csStr = (value: string) =>
  dq(value).replace(/[\u0085\u2028\u2029]/g, (c) => `\\u${c.charCodeAt(0).toString(16).padStart(4, '0')}`);

/** Rust string literal (Rust has no \b, \f or \uXXXX escapes). */
function rustString(value: string): string {
  let out = '"';
  for (const ch of value) {
    const code = ch.codePointAt(0)!;
    if (ch === '"') out += '\\"';
    else if (ch === '\\') out += '\\\\';
    else if (ch === '\n') out += '\\n';
    else if (ch === '\r') out += '\\r';
    else if (ch === '\t') out += '\\t';
    else if (code < 0x20 || code === 0x7f) out += `\\u{${code.toString(16)}}`;
    else out += ch;
  }
  return `${out}"`;
}

/** Rust raw string `r#"..."#` (no escapes); falls back when the text has a bare CR. */
function rustLiteral(value: string): string {
  if (value.includes('\r')) return rustString(value);
  let hashes = '#';
  while (value.includes(`"${hashes}`)) hashes += '#';
  return `r${hashes}"${value}"${hashes}`;
}

/**
 * Escapes `"` so a triple-quoted string (Python `"""`, Java text block) can
 * neither close early nor run into the closing delimiter.
 */
function escapeTripleQuotes(value: string): string {
  return value.replace(/"(?=""|"*$)/g, '\\"');
}

/** Python `"""..."""` literal (escapes processed, so backslashes are doubled). */
function pythonTripleQuoted(value: string): string {
  const escaped = escapeTripleQuotes(value.replaceAll('\\', '\\\\').replaceAll('\r', '\\r'));
  return `"""${escaped}"""`;
}

/**
 * Java text block. The opening `"""` is followed by a line break (required);
 * the closing `"""` sits right after the last character, so no trailing
 * newline is added. Every content line gets the same `indent`, which Java
 * strips as incidental whitespace; trailing whitespace (which Java would strip)
 * is protected with `\s` / `\t`.
 */
function javaTextBlock(value: string, indent: string): string {
  const escaped = escapeTripleQuotes(value.replaceAll('\\', '\\\\').replaceAll('\r', '\\r'));
  const lines = escaped
    .split('\n')
    .map((line) => indent + line.replace(/[ \t]$/, (c) => (c === ' ' ? '\\s' : '\\t')));
  return `"""\n${lines.join('\n')}"""`;
}

/**
 * C# 11 raw string literal: no escapes at all; the delimiter is longer than
 * any run of quotes in the content, and the closing line's indentation is
 * stripped from every line.
 */
function csharpRawString(value: string, indent: string): string {
  // other line-break characters would split the raw literal's lines: use a regular literal
  if (/[\r\u0085\u2028\u2029]/.test(value)) return csStr(value);
  const longestRun = Math.max(0, ...(value.match(/"+/g) ?? []).map((m) => m.length));
  const quotes = '"'.repeat(Math.max(3, longestRun + 1));
  const lines = value.split('\n').map((line) => indent + line);
  return `${quotes}\n${lines.join('\n')}\n${indent}${quotes}`;
}

/** Go composite literal for a JSON value (`map[string]any`, `[]any`, ...). */
function goValue(value: unknown, depth: number): string {
  const pad = '\t'.repeat(depth + 1);
  const end = '\t'.repeat(depth);
  if (value === null || value === undefined) return 'nil';
  if (typeof value === 'string') return dq(value);
  if (typeof value === 'number') return Number.isFinite(value) ? String(value) : 'nil';
  if (typeof value === 'boolean') return String(value);
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]any{}';
    return `[]any{\n${value.map((v) => `${pad}${goValue(v, depth + 1)},`).join('\n')}\n${end}}`;
  }
  if (typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return 'map[string]any{}';
    return `map[string]any{\n${entries
      .map(([k, v]) => `${pad}${dq(k)}: ${goValue(v, depth + 1)},`)
      .join('\n')}\n${end}}`;
  }
  return dq(String(value));
}

function indentLines(code: string, prefix: string): string {
  return code
    .split('\n')
    .map((line) => (line.length === 0 ? line : prefix + line))
    .join('\n');
}

// ---------------------------------------------------------------------------
// Generators
// ---------------------------------------------------------------------------

function withFallback(
  stock: CodeUsageGenerator,
  generate: (data: GeneratorData, body: Exclude<Body, { kind: 'unsupported' }>) => string,
): CodeUsageGenerator {
  return {
    lang: stock.lang,
    label: stock.label,
    generate(data, ctx) {
      const body = resolveBody(data);
      if (body.kind === 'unsupported') return stock.generate(data, ctx);
      return generate(data, body);
    },
  };
}

export const curl = withFallback(stockCurl, (data, body) => {
  const args = [`curl -X ${data.method.toUpperCase()} ${shellQuote(data.url)}`];
  for (const [k, v] of requestHeaders(data, body)) {
    args.push(k === 'Cookie' ? `--cookie ${shellQuote(v)}` : `-H ${shellQuote(`${k}: ${v}`)}`);
  }
  if (body.kind === 'text') {
    // --data-raw sends the argument byte for byte (no @file / newline handling)
    args.push(`--data-raw ${shellQuote(body.text)}`);
  } else if (body.kind === 'multipart') {
    for (const part of body.parts) {
      args.push(
        part.kind === 'file'
          ? `-F ${shellQuote(`${part.name}=@${part.fileName}`)}`
          : `--form-string ${shellQuote(`${part.name}=${part.value}`)}`,
      );
    }
  }
  return args.join(' \\\n  ');
});

export const javascript = withFallback(stockJavascript, (data, body) => {
  const s: string[] = [];
  const headers = Object.fromEntries(requestHeaders(data, body));
  const options: string[] = [`method: ${dq(data.method.toUpperCase())}`];
  if (Object.keys(headers).length > 0) options.push(`headers: ${JSON.stringify(headers, null, 2)}`);

  if (body.kind === 'text') {
    if (body.json !== undefined) s.push(`const body = JSON.stringify(${JSON.stringify(body.json, null, 2)});`);
    else if (body.form) s.push(`const body = new URLSearchParams(${JSON.stringify(body.form, null, 2)});`);
    else s.push(`const body = ${dq(body.text)};`);
    options.push('body');
  } else if (body.kind === 'multipart') {
    const lines: string[] = [];
    const files = body.parts.filter((p) => p.kind === 'file');
    if (files.length > 0) {
      s.push('import { openAsBlob } from "node:fs";');
      lines.push(
        '// Node.js 20+. In a browser, use the File from an <input type="file"> instead.',
        `const fileBlob = await openAsBlob(${dq(files[0].fileName)});`,
      );
    }
    // set() for single-valued fields (what the playground sends), append() for repeated ones
    const repeated = body.parts.length !== new Set(body.parts.map((p) => p.name)).size;
    const add = repeated ? 'append' : 'set';
    // no Content-Type header: fetch() sets multipart/form-data with its boundary
    lines.push('const body = new FormData();');
    for (const part of body.parts) {
      lines.push(
        part.kind === 'file'
          ? `body.${add}(${dq(part.name)}, fileBlob, ${dq(part.fileName)});`
          : `body.${add}(${dq(part.name)}, ${dq(part.value)});`,
      );
    }
    s.push(lines.join('\n'));
    options.push('body');
  }

  s.push(`fetch(${dq(data.url)}, {\n${indentLines(options.join(',\n'), '  ')}\n});`);
  return s.join('\n\n');
});

export const python = withFallback(stockPython, (data, body) => {
  const headers = requestHeaders(data, body).filter(([k]) => k !== 'Cookie');
  const cookies = Object.entries(data.cookie);
  const pyDict = (entries: [string, string][]) =>
    `{\n${entries.map(([k, v]) => `  ${dq(k)}: ${dq(v)}`).join(',\n')}\n}`;
  const lines = ['import requests', '', `url = ${dq(data.url)}`];
  const args = [dq(data.method.toUpperCase()), 'url'];

  if (body.kind === 'text') {
    lines.push(`body = ${pythonTripleQuoted(body.text)}`);
    args.push('data = body.encode("utf-8")');
  } else if (body.kind === 'multipart') {
    const files = body.parts.filter((p) => p.kind === 'file');
    const fields = body.parts.filter((p) => p.kind === 'text');
    // requests builds the multipart body and its Content-Type header
    if (files.length > 0) {
      lines.push(`files = {\n${files.map((p) => `  ${dq(p.name)}: open(${dq(p.fileName)}, "rb")`).join(',\n')}\n}`);
      args.push('files = files');
    }
    if (fields.length > 0) {
      lines.push(`data = ${pyDict(fields.map((p) => [p.name, p.value]))}`);
      args.push('data = data');
    }
  }
  if (headers.length > 0) args.push(`headers = ${pyDict(headers)}`);
  if (cookies.length > 0) args.push(`cookies = ${pyDict(cookies.map(([k, v]) => [k, v.value]))}`);

  lines.push('', `response = requests.request(${args.join(', ')})`, '', 'print(response.status_code)', 'print(response.text)');
  return lines.join('\n');
});

export const go = withFallback(stockGo, (data, body) => {
  const imports = new Set(['fmt', 'io', 'net/http']);
  const s: string[] = [`url := ${dq(data.url)}`, ''];
  let reader = 'nil';
  let contentType: string | undefined;

  if (body.kind === 'text') {
    imports.add('bytes');
    if (body.json !== undefined) {
      imports.add('encoding/json');
      s.push(
        `payload := ${goValue(body.json, 0)}`,
        'requestBody, err := json.Marshal(payload)',
        'if err != nil {\n\tpanic(err)\n}',
        '',
      );
    } else {
      s.push(`requestBody := []byte(${dq(body.text)})`, '');
    }
    reader = 'bytes.NewReader(requestBody)';
  } else if (body.kind === 'multipart') {
    imports.add('bytes').add('mime/multipart');
    s.push('requestBody := &bytes.Buffer{}', 'writer := multipart.NewWriter(requestBody)');
    let n = 0;
    for (const part of body.parts) {
      if (part.kind === 'file') {
        imports.add('os');
        const suffix = n++ === 0 ? '' : String(n);
        s.push(
          `file${suffix}, err := os.Open(${dq(part.fileName)})`,
          'if err != nil {\n\tpanic(err)\n}',
          `defer file${suffix}.Close()`,
          `part${suffix}, err := writer.CreateFormFile(${dq(part.name)}, ${dq(part.fileName)})`,
          'if err != nil {\n\tpanic(err)\n}',
          `if _, err := io.Copy(part${suffix}, file${suffix}); err != nil {\n\tpanic(err)\n}`,
        );
      } else {
        s.push(`if err := writer.WriteField(${dq(part.name)}, ${dq(part.value)}); err != nil {\n\tpanic(err)\n}`);
      }
    }
    s.push('if err := writer.Close(); err != nil {\n\tpanic(err)\n}', '');
    reader = 'requestBody';
    contentType = 'writer.FormDataContentType()';
  }

  s.push(
    `req, err := http.NewRequest(${dq(data.method.toUpperCase())}, url, ${reader})`,
    'if err != nil {\n\tpanic(err)\n}',
  );
  for (const [k, v] of requestHeaders(data, body)) s.push(`req.Header.Add(${dq(k)}, ${dq(v)})`);
  if (contentType) s.push(`req.Header.Set("Content-Type", ${contentType})`);
  s.push(
    '',
    'res, err := http.DefaultClient.Do(req)',
    'if err != nil {\n\tpanic(err)\n}',
    'defer res.Body.Close()',
    '',
    'responseBody, err := io.ReadAll(res.Body)',
    'if err != nil {\n\tpanic(err)\n}',
    '',
    'fmt.Println(res.Status)',
    'fmt.Println(string(responseBody))',
  );

  const importBlock = Array.from(imports)
    .sort()
    .map((v) => `\t${dq(v)}`)
    .join('\n');
  return `package main\n\nimport (\n${importBlock}\n)\n\nfunc main() {\n${indentLines(s.join('\n'), '\t')}\n}`;
});

export const java = withFallback(stockJava, (data, body) => {
  const imports = new Set([
    'java.net.URI',
    'java.net.http.HttpClient',
    'java.net.http.HttpRequest',
    'java.net.http.HttpResponse',
    'java.time.Duration',
  ]);
  const s: string[] = [
    'HttpClient client = HttpClient.newBuilder()',
    '    .connectTimeout(Duration.ofSeconds(10))',
    '    .build();',
    '',
  ];
  let publisher = 'HttpRequest.BodyPublishers.noBody()';
  let contentType: string | undefined;

  if (body.kind === 'text') {
    s.push(`String requestBody = ${javaTextBlock(body.text, '    ')};`, '');
    publisher = 'HttpRequest.BodyPublishers.ofString(requestBody)';
  } else if (body.kind === 'multipart') {
    imports.add('java.io.ByteArrayOutputStream').add('java.nio.charset.StandardCharsets');
    s.push(
      'String boundary = "----FormBoundary" + System.currentTimeMillis();',
      'ByteArrayOutputStream requestBody = new ByteArrayOutputStream();',
    );
    for (const part of body.parts) {
      const head =
        part.kind === 'file'
          ? `\r\nContent-Disposition: form-data; name="${part.name}"; filename="${part.fileName}"\r\nContent-Type: application/octet-stream\r\n\r\n`
          : `\r\nContent-Disposition: form-data; name="${part.name}"\r\n\r\n`;
      s.push(`requestBody.write(("--" + boundary + ${dq(head)}).getBytes(StandardCharsets.UTF_8));`);
      if (part.kind === 'file') {
        imports.add('java.nio.file.Files').add('java.nio.file.Path');
        s.push(`requestBody.write(Files.readAllBytes(Path.of(${dq(part.fileName)})));`);
      } else {
        s.push(`requestBody.write(${dq(part.value)}.getBytes(StandardCharsets.UTF_8));`);
      }
      s.push('requestBody.write("\\r\\n".getBytes(StandardCharsets.UTF_8));');
    }
    s.push('requestBody.write(("--" + boundary + "--\\r\\n").getBytes(StandardCharsets.UTF_8));', '');
    publisher = 'HttpRequest.BodyPublishers.ofByteArray(requestBody.toByteArray())';
    contentType = '"multipart/form-data; boundary=" + boundary';
  }

  s.push('HttpRequest request = HttpRequest.newBuilder()', `    .uri(URI.create(${dq(data.url)}))`);
  for (const [k, v] of requestHeaders(data, body)) s.push(`    .header(${dq(k)}, ${dq(v)})`);
  if (contentType) s.push(`    .header("Content-Type", ${contentType})`);
  s.push(
    `    .method(${dq(data.method.toUpperCase())}, ${publisher})`,
    '    .build();',
    '',
    'HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());',
    'System.out.println(response.statusCode());',
    'System.out.println(response.body());',
  );

  const importLines = Array.from(imports).sort().map((v) => `import ${v};`).join('\n');
  // text blocks are indented by javaTextBlock relative to column 0 of the
  // statement; indentLines adds the method-body indentation to every line
  return `${importLines}\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n${indentLines(s.join('\n'), '        ')}\n    }\n}`;
});

export const csharp = withFallback(stockCsharp, (data, body) => {
  const usings = new Set(['System', 'System.Net.Http']);
  const s: string[] = [
    'var client = new HttpClient();',
    `var request = new HttpRequestMessage(new HttpMethod(${csStr(data.method.toUpperCase())}), ${csStr(data.url)});`,
  ];
  for (const [k, v] of requestHeaders(data, body)) {
    if (k.toLowerCase() === 'content-type') continue; // set on the content below
    s.push(`request.Headers.TryAddWithoutValidation(${csStr(k)}, ${csStr(v)});`);
  }
  s.push('');
  if (body.kind === 'text') {
    usings.add('System.Text');
    s.push(
      '// Raw string literal: C# 11 / .NET 7 or later',
      `var requestBody = ${csharpRawString(body.text, '    ')};`,
      `request.Content = new StringContent(requestBody, Encoding.UTF8, ${csStr(body.mediaType)});`,
      '',
    );
  } else if (body.kind === 'multipart') {
    s.push('using var requestBody = new MultipartFormDataContent();');
    for (const part of body.parts) {
      if (part.kind === 'file') {
        usings.add('System.IO');
        s.push(`requestBody.Add(new ByteArrayContent(File.ReadAllBytes(${csStr(part.fileName)})), ${csStr(part.name)}, ${csStr(part.fileName)});`);
      } else {
        s.push(`requestBody.Add(new StringContent(${csStr(part.value)}), ${csStr(part.name)});`);
      }
    }
    s.push('request.Content = requestBody;', '');
  }
  s.push(
    'var response = await client.SendAsync(request);',
    'var responseBody = await response.Content.ReadAsStringAsync();',
    'Console.WriteLine((int)response.StatusCode);',
    'Console.WriteLine(responseBody);',
  );
  const usingLines = Array.from(usings).map((u) => `using ${u};`).join('\n');
  return `${usingLines}\n\n${s.join('\n')}`;
});

const RUST_METHODS = new Set(['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS', 'CONNECT', 'PATCH', 'TRACE']);

export const rust = withFallback(stockRust, (data, body) => {
  const method = data.method.toUpperCase();
  const methodExpr = RUST_METHODS.has(method)
    ? `reqwest::Method::${method}`
    : `reqwest::Method::from_bytes(${rustString(method)}.as_bytes())?`;
  const deps =
    body.kind === 'multipart'
      ? 'cargo add reqwest --features multipart && cargo add tokio --features full'
      : 'cargo add reqwest && cargo add tokio --features full';
  const s: string[] = ['let client = reqwest::Client::new();', `let url = ${rustString(data.url)};`];
  const chain = [`.request(${methodExpr}, url)`];
  for (const [k, v] of requestHeaders(data, body)) chain.push(`.header(${rustString(k)}, ${rustString(v)})`);
  // top-level so the (raw, multi-line) literal isn't re-indented with main()
  let constant = '';

  if (body.kind === 'text') {
    constant = `const REQUEST_BODY: &str = ${rustLiteral(body.text)};\n\n`;
    chain.push('.body(REQUEST_BODY)');
  } else if (body.kind === 'multipart') {
    const form = ['reqwest::multipart::Form::new()'];
    for (const part of body.parts) {
      form.push(
        part.kind === 'file'
          ? `    .part(${rustString(part.name)}, reqwest::multipart::Part::bytes(std::fs::read(${rustString(part.fileName)})?).file_name(${rustString(part.fileName)}))`
          : `    .text(${rustString(part.name)}, ${rustString(part.value)})`,
      );
    }
    s.push(`let form = ${form.join('\n')};`);
    chain.push('.multipart(form)');
  }
  chain.push('.send()', '.await?;');
  s.push(
    '',
    `let response = client\n${chain.map((c) => `    ${c}`).join('\n')}`,
    '',
    'println!("{}", response.status());',
    'println!("{}", response.text().await?);',
    'Ok(())',
  );
  return `// Dependencies: ${deps}\n\n${constant}#[tokio::main]\nasync fn main() -> Result<(), Box<dyn std::error::Error>> {\n${indentLines(s.join('\n'), '    ')}\n}`;
});

/** Registry passed to `createOpenAPIPage({ codeUsages })`; same ids and order as the stock one. */
export function createCodeSamples(): CodeUsageGeneratorRegistry {
  const registry = createCodeUsageGeneratorRegistry();
  registry.add('curl', curl);
  registry.add('js', javascript);
  registry.add('go', go);
  registry.add('python', python);
  registry.add('java', java);
  registry.add('csharp', csharp);
  registry.add('rust', rust);
  return registry;
}
