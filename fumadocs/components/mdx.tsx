import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { OpenAPIPage } from './openapi-page';
import { ComingSoon } from './coming-soon';
import { Card, Cards } from './card';
import { Callout } from './callout';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { Tab as BaseTab, Tabs as BaseTabs } from 'fumadocs-ui/components/tabs';
import type { ComponentProps } from 'react';
import { Accordion, Accordions } from './accordion';

// Hook for the tab colors in global.css (PM-43).
function Tabs(props: ComponentProps<typeof BaseTabs>) {
  return <BaseTabs {...props} className="plytix-tabs" />;
}

// Every panel is rendered into the initial HTML, not only the selected one, so
// the steps for each client (ChatGPT, Copilot, …) are there before JavaScript
// runs and for search engines. Inactive panels stay `hidden` (MCP STG-001).
function Tab(props: ComponentProps<typeof BaseTab>) {
  return <BaseTab keepMounted {...props} />;
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    OpenAPIPage,
    Card,
    Cards,
    Callout,
    ComingSoon,
    Step,
    Steps,
    Tab,
    Tabs,
    Accordion,
    Accordions,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
