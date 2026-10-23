// Offline checks for the API reference code samples (lib/code-samples.ts) and
// the path-encoding patch (patches/fumadocs-openapi+*.patch).
//
//   npm run test:code-samples
//
// Every generated program must send exactly the body the playground sends
// (JSON.stringify(body, null, 2) for JSON). No compilers are assumed: each
// language's string literal is decoded here by its own rules; cURL is run
// through bash with a stub `curl` that prints its argv.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { pathnameFromRequest } from 'fumadocs-openapi/requests/generators';
import {
  createCodeSamples,
  curl,
  csharp,
  go,
  java,
  javascript,
  python,
  rust,
  shellQuote,
} from '../lib/code-samples.ts';

const payload = {
  sku: "it's",
  title: 'say "hi"',
  path: 'C:\\temp\\new',
  escapes: 'not a newline: \\n, not a tab: \\t',
  multiline: 'line1\nline2\r\nline3',
  tick: 'a `b` c ${x}',
  combo: `'"\\\n\`'`,
  triple: 'x"""y""""z',
  dollar: '$HOME $(whoami) `id`',
  unicode: 'café ✓ \u2028',
  nested: { list: [1, 2.5, "'", null, true, false, {}, []], empty: '' },
  endsWithQuote: 'ends with "',
};
const expected = JSON.stringify(payload, null, 2);

const ctx = { mediaAdapters: {}, custom: null };
const jsonRequest = {
  method: 'post',
  url: "https://pim.plytix.com/api/v2/products/it's%2Fx?q=a&b='c'",
  path: {},
  query: {},
  header: { Authorization: { value: "Bearer it's \"quoted\"" } },
  cookie: {},
  body: payload,
  bodyMediaType: 'application/json',
};
const multipartRequest = {
  method: 'put',
  url: 'https://pim.plytix.com/api/v1/assets/123/content',
  path: {},
  query: {},
  header: { Authorization: { value: 'Bearer token' } },
  cookie: {},
  body: { file: 'string' },
  bodyMediaType: 'multipart/form-data',
};

const hasBash = spawnSync('bash', ['-c', 'true']).status === 0;

/** Runs a generated curl command with `curl` stubbed to print its argv. */
function curlArgv(command) {
  const script = `curl() { for a in "$@"; do printf '%s\\0' "$a"; done; }\n${command}\n`;
  const res = spawnSync('bash', ['-c', script], { encoding: 'utf8' });
  assert.equal(res.status, 0, res.stderr);
  return res.stdout.split('\0').slice(0, -1);
}

/** Extracts the text between `start` and the first `end` after it. */
function between(code, start, end) {
  const i = code.indexOf(start);
  assert.notEqual(i, -1, `missing ${JSON.stringify(start)} in:\n${code}`);
  const j = code.indexOf(end, i + start.length);
  assert.notEqual(j, -1, `missing ${JSON.stringify(end)} in:\n${code}`);
  return code.slice(i + start.length, j);
}

// --- decoders ---------------------------------------------------------------

const SIMPLE_ESCAPES = { n: '\n', r: '\r', t: '\t', b: '\b', f: '\f', '"': '"', '\\': '\\', "'": "'" };

/** Go interpreted string / C-like literal with \uXXXX. */
function decodeQuoted(literal, { allowU4 = true } = {}) {
  assert.equal(literal[0], '"');
  let out = '';
  for (let i = 1; i < literal.length; i++) {
    const c = literal[i];
    if (c === '"') {
      assert.equal(i, literal.length - 1, `unescaped quote inside ${literal}`);
      return out;
    }
    assert.notEqual(c, '\n', 'raw newline in a quoted literal');
    if (c !== '\\') {
      out += c;
      continue;
    }
    const e = literal[++i];
    if (e === 'u' && allowU4) {
      out += String.fromCharCode(parseInt(literal.slice(i + 1, i + 5), 16));
      i += 4;
    } else if (e in SIMPLE_ESCAPES && e !== "'") out += SIMPLE_ESCAPES[e];
    else assert.fail(`invalid escape \\${e} in ${literal}`);
  }
  assert.fail(`unterminated literal ${literal}`);
}

/** Parses the Go composite literal emitted for JSON payloads. */
function parseGoLiteral(src) {
  let i = 0;
  const ws = () => {
    while (/\s/.test(src[i])) i++;
  };
  const expect = (s) => {
    ws();
    assert.equal(src.slice(i, i + s.length), s, `expected ${s} at ${src.slice(i, i + 30)}`);
    i += s.length;
  };
  const readString = () => {
    ws();
    const start = i;
    i++;
    while (src[i] !== '"') i += src[i] === '\\' ? 2 : 1;
    i++;
    return decodeQuoted(src.slice(start, i));
  };
  const value = () => {
    ws();
    if (src.startsWith('map[string]any{', i)) {
      i += 'map[string]any{'.length;
      const obj = {};
      for (ws(); src[i] !== '}'; ws()) {
        const k = readString();
        expect(':');
        obj[k] = value();
        expect(',');
      }
      i++;
      return obj;
    }
    if (src.startsWith('[]any{', i)) {
      i += '[]any{'.length;
      const arr = [];
      for (ws(); src[i] !== '}'; ws()) {
        arr.push(value());
        expect(',');
      }
      i++;
      return arr;
    }
    if (src[i] === '"') return readString();
    const m = /^(nil|true|false|-?[0-9.eE+-]+)/.exec(src.slice(i));
    assert.ok(m, `unexpected token at ${src.slice(i, i + 30)}`);
    i += m[0].length;
    return m[0] === 'nil' ? null : m[0] === 'true' ? true : m[0] === 'false' ? false : Number(m[0]);
  };
  const v = value();
  ws();
  assert.equal(i, src.length, 'trailing input after Go literal');
  return v;
}

/** Python """...""" literal (only the escapes our generator emits, plus the standard set). */
function decodePythonTriple(literal) {
  assert.ok(literal.startsWith('"""') && literal.endsWith('"""'));
  const inner = literal.slice(3, -3);
  assert.ok(!/(^|[^\\])"""/.test(inner), 'unescaped """ inside');
  let out = '';
  for (let i = 0; i < inner.length; i++) {
    if (inner[i] !== '\\') {
      out += inner[i];
      continue;
    }
    const e = inner[++i];
    assert.ok(e in SIMPLE_ESCAPES, `unexpected escape \\${e}`);
    out += SIMPLE_ESCAPES[e];
  }
  return out;
}

/** Java text block: JLS 3.10.6 (incidental whitespace, trailing spaces, escapes). */
function decodeJavaTextBlock(code) {
  const open = code.indexOf('"""');
  assert.equal(code[open + 3], '\n', 'text block must open with """ + line break');
  let i = open + 4;
  while (!(code.startsWith('"""', i) && code[i - 1] !== '\\')) i++;
  const raw = code.slice(open + 4, i);
  const lines = raw.split('\n');
  // closing delimiter is on the last content line, so every line is significant
  const indents = lines.filter((l) => l.trim() !== '').map((l) => /^[ \t]*/.exec(l)[0].length);
  const min = Math.min(...indents);
  const stripped = lines.map((l) => (l.trim() === '' ? '' : l.slice(min).replace(/[ \t]+$/, ''))).join('\n');
  let out = '';
  for (let k = 0; k < stripped.length; k++) {
    if (stripped[k] !== '\\') {
      out += stripped[k];
      continue;
    }
    const e = stripped[++k];
    if (e === 's') out += ' ';
    else if (e === '\n') continue;
    else if (e in SIMPLE_ESCAPES) out += SIMPLE_ESCAPES[e];
    else assert.fail(`invalid Java escape \\${e}`);
  }
  return out;
}

/** C# 11 raw string literal (multi-line form). */
function decodeCsharpRaw(code) {
  const m = /var requestBody = ("{3,})\n/.exec(code);
  assert.ok(m, 'raw string literal not found');
  const quotes = m[1];
  const start = m.index + m[0].length;
  const closeRe = new RegExp(`\\n([ \\t]*)${quotes};`, 'g');
  closeRe.lastIndex = start - 1;
  const close = closeRe.exec(code);
  assert.ok(close, 'closing delimiter not found');
  const content = code.slice(start, close.index);
  assert.ok(!content.includes(quotes), 'content contains the delimiter');
  const indent = close[1];
  return content
    .split('\n')
    .map((l) => {
      assert.ok(l.startsWith(indent) || l.trim() === '', `line not indented: ${l}`);
      return l.slice(indent.length);
    })
    .join('\n');
}

// --- JSON body ----------------------------------------------------------------

test('cURL sends the exact JSON bytes, POSIX-quoted', { skip: !hasBash && 'bash not available' }, () => {
  const code = curl.generate(jsonRequest, ctx);
  const argv = curlArgv(code);
  assert.deepEqual(argv.slice(0, 3), ['-X', 'POST', jsonRequest.url]);
  assert.ok(argv.includes(`Authorization: Bearer it's "quoted"`));
  assert.ok(argv.includes('Content-Type: application/json'));
  const data = argv[argv.indexOf('--data-raw') + 1];
  assert.equal(data, expected);
  assert.deepEqual(JSON.parse(data), payload);
});

test('shellQuote round-trips arbitrary strings through bash', { skip: !hasBash && 'bash not available' }, () => {
  for (const s of ["it's", `'`, `''`, '\\', '\\\\n', '`x`', '$(id)', 'a\nb', '"', '', expected]) {
    const res = spawnSync('bash', ['-c', `printf '%s' ${shellQuote(s)}`], { encoding: 'utf8' });
    assert.equal(res.stdout, s);
  }
});

test('JavaScript body decodes to the same object', () => {
  const code = javascript.generate(jsonRequest, ctx);
  const expr = between(code, 'const body = ', ';\n\nfetch(');
  const body = new Function(`return ${expr}`)();
  assert.deepEqual(JSON.parse(body), payload);
});

test('Python body is the exact JSON text', () => {
  const code = python.generate(jsonRequest, ctx);
  const literal = /^body = ("""[\s\S]*?(?<!\\)""")$/m.exec(code)?.[1];
  assert.ok(literal, code);
  assert.equal(decodePythonTriple(literal), expected);
  assert.match(code, /data = body\.encode\("utf-8"\)/);
});

test('Go marshals a literal equal to the payload; distinct requestBody/responseBody', () => {
  const code = go.generate(jsonRequest, ctx);
  const literal = between(code, 'payload := ', '\n\trequestBody, err := json.Marshal(payload)');
  assert.deepEqual(parseGoLiteral(literal), payload);
  assert.ok(!/[=(,][ \t]*`/.test(code), 'no raw (backtick) string literals');
  assert.match(code, /http\.NewRequest\("POST", url, bytes\.NewReader\(requestBody\)\)/);
  assert.match(code, /responseBody, err := io\.ReadAll\(res\.Body\)/);
  assert.ok(!/\bbody\b\s*:?=/.test(code), 'no generic `body` variable');
  for (const pkg of ['bytes', 'encoding/json', 'fmt', 'io', 'net/http']) assert.ok(code.includes(`\t"${pkg}"`), pkg);
});

test('Java text block decodes to the exact JSON text; request is built before send', () => {
  const code = java.generate(jsonRequest, ctx);
  assert.equal(decodeJavaTextBlock(code), expected);
  assert.match(code, /HttpRequest request = HttpRequest\.newBuilder\(\)[\s\S]*?\.build\(\);/);
  assert.match(code, /client\.send\(request, HttpResponse\.BodyHandlers\.ofString\(\)\)/);
  assert.ok(!code.includes('HttpRequest.Builder'), 'no Builder variable holding a built request');
  assert.match(code, /public class Main \{\n {4}public static void main\(String\[\] args\) throws Exception \{/);
});

test('C# raw string decodes to the exact JSON text', () => {
  // U+2028 is a line break for C#, so that payload must use a regular literal instead
  const { unicode, ...rawPayload } = payload;
  const code = csharp.generate({ ...jsonRequest, body: rawPayload }, ctx);
  assert.equal(decodeCsharpRaw(code), JSON.stringify(rawPayload, null, 2));
  assert.match(code, /new StringContent\(requestBody, Encoding\.UTF8, "application\/json"\)/);

  const fallback = csharp.generate(jsonRequest, ctx);
  const literal = /^var requestBody = (".*");$/m.exec(fallback)?.[1];
  assert.ok(literal, fallback);
  assert.ok(!/[\u0085\u2028\u2029]/.test(literal), 'no raw C# line-break characters');
  assert.equal(decodeQuoted(literal), expected);
});

test('Rust raw string is the exact JSON text; tokio runtime scaffold', () => {
  const code = rust.generate(jsonRequest, ctx);
  const m = /const REQUEST_BODY: &str = r(#+)"([\s\S]*?)"\1;/.exec(code);
  assert.ok(m, code);
  assert.equal(m[2], expected);
  assert.match(code, /#\[tokio::main\]\nasync fn main\(\) -> Result<\(\), Box<dyn std::error::Error>>/);
  assert.match(code, /\.body\(REQUEST_BODY\)/);
});

// --- multipart file upload (V1 PUT /api/v1/assets/{asset_id}/content) -----------

test('cURL multipart uploads the file with -F file=@path', { skip: !hasBash && 'bash not available' }, () => {
  const argv = curlArgv(curl.generate(multipartRequest, ctx));
  assert.equal(argv[argv.indexOf('-F') + 1], 'file=@image.png');
  assert.ok(!argv.some((a) => /^content-type:/i.test(a)), 'no manual Content-Type');
});

test('JavaScript multipart uses FormData.set("file", fileBlob, name) without Content-Type', () => {
  const code = javascript.generate(multipartRequest, ctx);
  assert.match(code, /body\.set\("file", fileBlob, "image\.png"\);/);
  assert.ok(!/content-type/i.test(code));
});

test('Python multipart passes files= and no manual Content-Type', () => {
  const code = python.generate(multipartRequest, ctx);
  assert.match(code, /files = \{\n {2}"file": open\("image\.png", "rb"\)\n\}/);
  assert.match(code, /requests\.request\("PUT", url, files = files, headers = /);
  assert.ok(!/content-type/i.test(code));
});

test('Go/Java/C#/Rust multipart read the file from disk', () => {
  assert.match(go.generate(multipartRequest, ctx), /writer\.CreateFormFile\("file", "image\.png"\)[\s\S]*FormDataContentType\(\)/);
  assert.match(java.generate(multipartRequest, ctx), /Files\.readAllBytes\(Path\.of\("image\.png"\)\)/);
  assert.match(csharp.generate(multipartRequest, ctx), /new ByteArrayContent\(File\.ReadAllBytes\("image\.png"\)\), "file", "image\.png"\)/);
  assert.match(rust.generate(multipartRequest, ctx), /Part::bytes\(std::fs::read\("image\.png"\)\?\)\.file_name\("image\.png"\)/);
});

test('the static V1 upload example (body {}) still shows the file part', { skip: !hasBash && 'bash not available' }, () => {
  const req = { ...multipartRequest, body: {} };
  const argv = curlArgv(curl.generate(req, ctx));
  assert.equal(argv[argv.indexOf('-F') + 1], 'file=@image.png');
  assert.match(python.generate(req, ctx), /"file": open\("image\.png", "rb"\)/);
});

test('text multipart fields are sent verbatim', { skip: !hasBash && 'bash not available' }, () => {
  const req = { ...multipartRequest, body: { file: 'string', note: "it's @not-a-file;type=x" } };
  const argv = curlArgv(curl.generate(req, ctx));
  assert.equal(argv[argv.indexOf('--form-string') + 1], "note=it's @not-a-file;type=x");
});

// --- registry and path encoding ---------------------------------------------------

test('registry keeps the stock ids and order', () => {
  assert.deepEqual(Array.from(createCodeSamples().map().keys()), ['curl', 'js', 'go', 'python', 'java', 'csharp', 'rust']);
});

test('path values are encoded as one segment (patched pathnameFromRequest)', () => {
  const data = { path: { asset_id: { value: "a/b c?#&'$&" } }, query: {} };
  assert.equal(pathnameFromRequest('/api/v1/assets/{asset_id}/content', data), "/api/v1/assets/a%2Fb%20c%3F%23%26'%24%26/content");
});
