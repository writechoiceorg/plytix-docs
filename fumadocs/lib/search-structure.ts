import type { StringifyOptions, StructureOptions } from 'fumadocs-core/mdx-plugins';

// The default stringifier indexes <Card> and <Callout> whole, as JSX, so search
// excerpts showed `<Card title="API Reference" href="/docs/reference/v3" …>`
// (PM-44). Index them as prose instead: title, description, then their content.
const PROSE_COMPONENTS = new Set(['Card', 'Callout']);

const stringify: NonNullable<StringifyOptions['stringify']> = (node, _parent, state, info) => {
  if (node.type !== 'mdxJsxFlowElement' && node.type !== 'mdxJsxTextElement') return;
  if (!node.name || !PROSE_COMPONENTS.has(node.name)) return;

  const text = (name: string) => {
    const attr = node.attributes.find((a) => a.type === 'mdxJsxAttribute' && a.name === name);
    return typeof attr?.value === 'string' ? attr.value : undefined;
  };
  let body = '';
  if (node.children.length > 0) {
    body =
      node.type === 'mdxJsxTextElement'
        ? state.containerPhrasing(node, info)
        : state.containerFlow(node, info);
  }
  return [text('title'), text('description'), body].filter(Boolean).join('\n\n');
};

export const remarkStructureOptions: StructureOptions = { stringify: { stringify } };
