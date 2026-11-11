import type { LoaderPlugin } from 'fumadocs-core/source';

/**
 * Lets a page show a shorter label in the sidebar than its title, through an
 * optional `sidebarTitle` in its frontmatter. For example, the Plytix MCP
 * overview is titled "Plytix MCP" on the page but listed as "Overview" inside
 * the "Plytix MCP" folder.
 */
export function sidebarTitlePlugin(): LoaderPlugin {
  return {
    name: 'plytix:sidebar-title',
    transformPageTree: {
      file(node, filePath) {
        if (!filePath) return node;
        const file = this.storage.read(filePath);
        if (file?.format !== 'page') return node;
        const sidebarTitle = (file.data as { sidebarTitle?: unknown }).sidebarTitle;
        if (typeof sidebarTitle === 'string' && sidebarTitle) node.name = sidebarTitle;
        return node;
      },
    },
  };
}
