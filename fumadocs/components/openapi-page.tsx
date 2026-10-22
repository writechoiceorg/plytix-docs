'use client';

import { createOpenAPIPage } from 'fumadocs-openapi/ui';
import { createCodeSamples } from '@/lib/code-samples';

// Code samples: our generators replace the stock ones (see lib/code-samples.ts).
// Playground fixes (path params, a11y, oneOf sync) live in patches/ and are
// applied to node_modules by patch-package on `npm install`.
export const OpenAPIPage = createOpenAPIPage({
  codeUsages: createCodeSamples(),
});
