import { source } from '@/lib/source';
import { v3Published } from '@/lib/shared';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import { baseOptions } from '@/lib/layout.shared';
import { SidebarBanner } from '@/components/sidebar-banner';
import { SidebarAutoScroll } from '@/components/sidebar-auto-scroll';
import { SidebarVersionAccordion } from '@/components/sidebar-version-accordion';
import { SiteFooter } from '@/components/site-footer';

// Shared by /docs (guides) and /reference (API reference), so moving between
// them keeps the same layout instance.
export default function Layout({ children }: { children: React.ReactNode }) {
  const { nav, ...base } = baseOptions();

  return (
    <>
      <DocsLayout
        tree={source.getPageTree()}
        tabMode="navbar"
        nav={{ ...nav, mode: 'top' }}
        sidebar={{ banner: SidebarBanner, collapsible: false }}
        tabs={{
          transform: (option) => {
            // The "API Reference" tab's own landing page is just plumbing (it
            // gives the reference folder a resolvable url so this tab exists
            // and stays active across every /reference/** page). Send
            // clicks straight to the published version's overview instead of
            // that landing page (V1/V2 while V3 is hidden, see hiddenContent).
            // The versions themselves are folders in that tab's sidebar.
            if (option.url === '/reference') {
              option = {
                ...option,
                url: v3Published ? '/reference/v3' : '/reference/v1-v2/api-v1-v2-reference',
              };
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
          },
        }}
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
