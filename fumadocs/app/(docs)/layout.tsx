import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import { getLayoutTabs, type LayoutTab } from 'fumadocs-ui/layouts/shared';
import type * as PageTree from 'fumadocs-core/page-tree';
import { baseOptions } from '@/lib/layout.shared';
import { landingRoute, mcpRoute } from '@/lib/shared';
import { SidebarBanner } from '@/components/sidebar-banner';
import { SidebarAutoScroll } from '@/components/sidebar-auto-scroll';
import { SidebarVersionAccordion } from '@/components/sidebar-version-accordion';
import { SiteFooter } from '@/components/site-footer';
import { BotRegular } from '@/components/icons';

function transformTab(option: LayoutTab): LayoutTab {
  // The "API Reference" tab's own landing page is just plumbing (it
  // gives the reference folder a resolvable url so this tab exists
  // and stays active across every /reference/** page). Send
  // clicks straight to the v3 overview instead of that landing page.
  // The versions themselves are folders in that tab's sidebar.
  if (option.url === '/reference') {
    option = { ...option, url: '/reference/v3' };
  }
  // Navbar tabs render only the title, so fold the folder's icon into it.
  // The icon is dropped from the option itself to avoid a duplicate in the
  // mobile tab dropdown, which renders icon + title.
  return {
    ...option,
    icon: undefined,
    title: (
      <span className="inline-flex items-center gap-2 [&_svg]:size-4">
        {option.icon}
        {option.title}
      </span>
    ),
  };
}

/** Every page url inside a page-tree folder, at any depth. */
function getFolderUrls(folder: PageTree.Folder, urls: string[] = []): string[] {
  if (folder.index) urls.push(folder.index.url);
  for (const child of folder.children) {
    if (child.type === 'page' && !child.external) urls.push(child.url);
    if (child.type === 'folder') getFolderUrls(child, urls);
  }
  return urls;
}

const isMcpUrl = (url: string) => url.startsWith(`${mcpRoute}/`);

/**
 * Fumadocs links a tab to its folder's index page or first direct page, and
 * skips folders with neither. When only part of the content is published
 * (see `publishedFolders` in lib/shared.ts), the API Reference folder holds
 * just the V1 and V2 subfolder, so its tab is added here, linked to the landing page.
 *
 * The Plytix MCP section (guides/mcp, served at /mcp) gets its own "MCP" tab.
 * It's a nested folder, and Fumadocs only makes tabs out of root folders of the
 * same level, so the tab isn't bound to the folder: it's active on the MCP
 * urls instead, and Fumadocs lists it after the folder tabs. While the MCP
 * section is all its root folder (Guides) publishes, that folder gets no tab
 * of its own.
 */
function getTabs(tree: PageTree.Root): LayoutTab[] {
  const tabs = getLayoutTabs(tree, { transform: transformTab });
  const mcpUrls: string[] = [];
  for (const node of tree.children) {
    if (node.type !== 'folder' || !node.root) continue;
    const urls = getFolderUrls(node);
    mcpUrls.push(...urls.filter(isMcpUrl));
    if (tabs.some((tab) => tab.$folder === node) || (urls.length > 0 && urls.every(isMcpUrl))) continue;
    tabs.push(
      transformTab({ title: node.name, icon: node.icon, description: node.description, url: landingRoute, $folder: node }),
    );
  }
  if (mcpUrls.length > 0) {
    // Same Bot icon as the Plytix MCP folder (guides/mcp/meta.json).
    tabs.push(transformTab({ title: 'MCP', icon: <BotRegular />, url: `${mcpRoute}/overview`, urls: new Set(mcpUrls) }));
  }
  return tabs;
}

// Shared by /docs (guides) and /reference (API reference), so moving between
// them keeps the same layout instance.
export default function Layout({ children }: { children: React.ReactNode }) {
  const { nav, ...base } = baseOptions();
  const tree = source.getPageTree();

  return (
    <>
      <DocsLayout
        tree={tree}
        tabMode="navbar"
        nav={{ ...nav, mode: 'top' }}
        sidebar={{ banner: SidebarBanner, collapsible: false }}
        tabs={getTabs(tree)}
        {...base}
      >
        <SidebarAutoScroll />
        <SidebarVersionAccordion />
        {children}
      </DocsLayout>
      <SiteFooter />
    </>
  );
}
