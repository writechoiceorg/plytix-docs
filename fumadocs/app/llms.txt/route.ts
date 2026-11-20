import { docsLlms } from '@/lib/source';
import { siteUrl } from '@/lib/shared';

export const revalidate = false;

// Context for readers (and tools) that arrive at llms.txt from outside the portal (STG-022).
const SUMMARY = `This index lists every published page of the Plytix Developer Portal:

- **API V1/V2 reference**: the current Plytix PIM API. Get a token from \`https://auth.plytix.com\`, then call \`https://pim.plytix.com\`.
- **Plytix MCP (beta)**: connect Claude, ChatGPT, or Microsoft Copilot to a Plytix account.

Append \`.md\` to any page URL, or request it with \`Accept: text/markdown\`, to get the page as Markdown. The full text of every page is at ${siteUrl}/llms-full.txt.`;

export async function GET() {
  const index = await docsLlms.index();
  // Page links in the index are site-relative; make them absolute.
  const absolute = index.replace(/\]\(\//g, `](${siteUrl}/`);
  // The index starts with `# <name>` and `> <description>` (lib/source.ts); the summary follows them.
  const [heading, description, ...pages] = absolute.split('\n\n');
  return new Response([heading, description, SUMMARY, ...pages].join('\n\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
