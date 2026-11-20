import type { StringifyOptions } from 'fumadocs-core/mdx-plugins';

// Markdown exports (the `.md` routes, `Accept: text/markdown`, Copy Markdown,
// llms-full.txt) come from remarkLLMs, which prints every MDX component as raw
// JSX: `<Card icon={…} title="…" href="…">`, `<Tabs items={…}>`, `<Accordion …>`.
// This stringifier turns the site's components into plain Markdown instead:
// cards become links, tabs and accordions become labelled sections, callouts
// become blockquotes. Code blocks and the text inside each component are kept (STG-012).

type FullStringify = NonNullable<StringifyOptions['stringify']>;
type Node = Parameters<FullStringify>[0];
type Parent = Parameters<FullStringify>[1];
type State = Parameters<FullStringify>[2];
type Info = Parameters<FullStringify>[3];
// Without the context argument, so it fits both remarkLLMs and remarkStructure.
type Stringify = (node: Node, parent: Parent, state: State, info: Info) => string | undefined;
type JsxNode = Extract<Node, { type: 'mdxJsxFlowElement' | 'mdxJsxTextElement' }>;

/** A string attribute, or the text of a JSX expression attribute such as `title={<>V1 <code>x</code></>}`. */
function attribute(node: JsxNode, name: string): string | undefined {
  const attr = node.attributes.find((a) => a.type === 'mdxJsxAttribute' && a.name === name);
  if (!attr || attr.type !== 'mdxJsxAttribute' || attr.value == null) return;
  if (typeof attr.value === 'string') return attr.value;
  const source = attr.value.value.trim();
  // A JSX fragment or element: keep its text, with <code> as backticks.
  if (source.startsWith('<')) {
    return source
      .replace(/<code>([\s\S]*?)<\/code>/g, '`$1`')
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }
  // A plain string or number expression: title={"…"}
  return source.replace(/^['"`]|['"`]$/g, '');
}

function children(node: JsxNode, state: State, info: Info): string {
  if (node.children.length === 0) return '';
  return (
    node.type === 'mdxJsxTextElement' ? state.containerPhrasing(node, info) : state.containerFlow(node, info)
  ).trim();
}

const CALLOUT_LABELS: Record<string, string> = {
  info: 'Note',
  warn: 'Warning',
  warning: 'Warning',
  error: 'Important',
  success: 'Tip',
  idea: 'Tip',
};

const blockquote = (text: string) =>
  text
    .split('\n')
    .map((line) => (line ? `> ${line}` : '>'))
    .join('\n');

export const markdownStringify: Stringify = (node, _parent, state, info) => {
  if (node.type !== 'mdxJsxFlowElement' && node.type !== 'mdxJsxTextElement') return;
  if (!node.name) return;

  switch (node.name) {
    // Containers: only their content, which the cases below format.
    case 'Cards':
    case 'Accordions':
    case 'Steps':
    case 'Tabs':
      return children(node, state, info) || ' ';

    case 'Card': {
      const title = attribute(node, 'title') ?? '';
      const href = attribute(node, 'href');
      const description = [attribute(node, 'description'), children(node, state, info)].filter(Boolean).join(' ');
      const label = href ? `[${title}](${href})` : `**${title}**`;
      return `- ${label}${description ? `: ${description}` : ''}`;
    }

    case 'Tab': {
      const label = attribute(node, 'value') ?? attribute(node, 'title');
      const body = children(node, state, info);
      return label ? `**${label}**\n\n${body}` : body;
    }

    case 'Accordion': {
      const title = attribute(node, 'title');
      const body = children(node, state, info);
      return title ? `**${title}**\n\n${body}` : body;
    }

    case 'Step':
      return children(node, state, info) || ' ';

    case 'Callout': {
      const type = attribute(node, 'type') ?? 'info';
      const label = CALLOUT_LABELS[type] ?? 'Note';
      const title = attribute(node, 'title');
      const heading = title ? `**${label}: ${title}**` : `**${label}:**`;
      return blockquote(`${heading}\n\n${children(node, state, info)}`.trim());
    }

    default:
      // Icons and other presentational components carry no text.
      if (/Regular$|Filled$/.test(node.name)) return ' ';
      return;
  }
};

export const markdownExportOptions = { stringify: markdownStringify };
