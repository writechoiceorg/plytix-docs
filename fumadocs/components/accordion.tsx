'use client';

import { Accordion as BaseAccordion } from '@base-ui/react/accordion';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { ChevronRightRegular } from './icons';

/**
 * Plytix-styled accordion, matching the FAQ accordion on the Knowledge Base
 * (knowledge.plytix.com): separate rounded cards that get a lilac border on
 * hover, a large title, and a chevron on the right that turns down when the
 * item opens. Replaces fumadocs-ui's Accordions/Accordion with the same MDX
 * API (`<Accordions type="multiple">`, `<Accordion title value>`). Only one
 * item is open at a time, whatever `type` the content passes.
 */

export interface AccordionsProps {
  /** Accepted for compatibility with existing content; ignored. */
  type?: 'single' | 'multiple';
  className?: string;
  children?: ReactNode;
}

export function Accordions({ className, children }: AccordionsProps) {
  return (
    <BaseAccordion.Root multiple={false} className={cn('my-6 flex flex-col gap-[1.125rem]', className)}>
      {children}
    </BaseAccordion.Root>
  );
}

export interface AccordionProps {
  title: ReactNode;
  /** Unique within its `<Accordions>`; generated when omitted. */
  value?: string;
  className?: string;
  children?: ReactNode;
}

export function Accordion({ title, value, className, children }: AccordionProps) {
  return (
    <BaseAccordion.Item
      value={value}
      className={cn(
        'rounded-[0.8rem] border border-transparent bg-fd-card text-fd-foreground transition-colors hover:border-[#bda8ff]',
        className,
      )}
    >
      <BaseAccordion.Header className="not-prose m-0">
        <BaseAccordion.Trigger className="group flex min-h-[50px] w-full cursor-pointer items-center justify-between gap-4 rounded-[0.8rem] px-4 py-3 text-start text-[1.2rem] leading-[1.5] font-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring md:px-[1.69rem]">
          <span className="min-w-0">{title}</span>
          <ChevronRightRegular className="size-8 shrink-0 transition-transform duration-100 group-data-panel-open:rotate-90" />
        </BaseAccordion.Trigger>
      </BaseAccordion.Header>
      {/* hiddenUntilFound keeps closed answers searchable with the browser's find. */}
      <BaseAccordion.Panel
        hiddenUntilFound
        className="h-(--accordion-panel-height) overflow-hidden transition-[height] ease-out data-ending-style:h-0 data-starting-style:h-0"
      >
        <div className="prose-no-margin px-4 pt-1 pb-[1.13rem] text-[0.9375rem] md:px-[1.69rem]">
          {children}
        </div>
      </BaseAccordion.Panel>
    </BaseAccordion.Item>
  );
}
