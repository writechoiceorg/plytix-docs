import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import { baseOptions } from '@/lib/layout.shared';
import { SidebarBanner } from '@/components/reference-version-switcher';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  const { nav, ...base } = baseOptions();

  return (
    <DocsLayout
      tree={source.getPageTree()}
      tabMode="navbar"
      nav={{ ...nav, mode: 'top' }}
      sidebar={{ banner: SidebarBanner }}
      tabs={{
        // v3/legacy are their own root folders (so the sidebar shows only the
        // active version's pages), but the navbar should always show Guides
        // and API Reference, never the version switch: that's handled by
        // <ReferenceVersionSwitcher /> in the sidebar instead.
        transform: (option) => {
          if (
            option.url.startsWith('/docs/reference/v3') ||
            option.url.startsWith('/docs/reference/legacy')
          ) {
            return null;
          }
          // The "API Reference" tab's own landing page is just plumbing (it
          // gives the reference folder a resolvable url so this tab exists
          // and stays active across every /docs/reference/** page). Send
          // clicks straight to the v3 overview instead of that landing page.
          if (option.url === '/docs/reference') {
            option = { ...option, url: '/docs/reference/v3' };
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
      {children}
    </DocsLayout>
  );
}
