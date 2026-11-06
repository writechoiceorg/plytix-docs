import { NextRequest, NextResponse } from 'next/server';
import { isMarkdownPreferred, rewritePath } from 'fumadocs-core/negotiation';
import { docsContentRoute, sections } from '@/lib/shared';

// Every section route (/guides, /mcp, /reference) resolves to the same content
// route; each maps to its own folder of the content tree (see lib/shared.ts).
const routes = sections.map(({ folder, route }) => {
  const to = [docsContentRoute, ...folder].join('/');
  return {
    docs: rewritePath(`${route}{/*path}`, `${to}{/*path}/content.md`).rewrite,
    suffix: rewritePath(`${route}{/*path}.md`, `${to}{/*path}/content.md`).rewrite,
  };
});

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  for (const route of routes) {
    const result = route.suffix(pathname);
    if (result) {
      return NextResponse.rewrite(new URL(result, request.nextUrl));
    }
  }

  if (isMarkdownPreferred(request)) {
    for (const route of routes) {
      const result = route.docs(pathname);

      if (result) {
        return NextResponse.rewrite(new URL(result, request.nextUrl), {
          // this URL has two representations, selected by `Accept`
          headers: { Vary: 'Accept' },
        });
      }
    }
  }

  return NextResponse.next();
}
