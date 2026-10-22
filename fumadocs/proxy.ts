import { NextRequest, NextResponse } from 'next/server';
import { isMarkdownPreferred, rewritePath } from 'fumadocs-core/negotiation';
import { docsContentRoute, docsRoute, referenceFolder, referenceRoute } from '@/lib/shared';

// Pages under /docs and /reference both resolve to the same content route;
// /reference/** maps to the reference/ folder of the content tree.
const routes = [
  { from: docsRoute, to: docsContentRoute },
  { from: referenceRoute, to: `${docsContentRoute}/${referenceFolder}` },
].map(({ from, to }) => ({
  docs: rewritePath(`${from}{/*path}`, `${to}{/*path}/content.md`).rewrite,
  suffix: rewritePath(`${from}{/*path}.md`, `${to}{/*path}/content.md`).rewrite,
}));

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
