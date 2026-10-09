import type { ReactNode } from 'react';
import { Callout } from 'fumadocs-ui/components/callout';

interface ComingSoonProps {
  title?: string;
  children?: ReactNode;
}

export function ComingSoon({ title = 'Coming soon', children }: ComingSoonProps) {
  return (
    <Callout type="info" title={title}>
      {children ?? 'This feature is coming soon. Check back for updates.'}
    </Callout>
  );
}
