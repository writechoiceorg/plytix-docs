import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import { baseOptions } from '@/lib/layout.shared';
import { ReferenceVersionSwitcher } from '@/components/reference-version-switcher';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  const { nav, ...base } = baseOptions();

  return (
    <DocsLayout
      tree={source.getPageTree()}
      tabMode="navbar"
      nav={{ ...nav, mode: 'top' }}
      sidebar={{ banner: <ReferenceVersionSwitcher /> }}
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
            return { ...option, url: '/docs/reference/v3' };
          }
          return option;
        },
      }}
      {...base}
    >
      {children}
    </DocsLayout>
  );
}
