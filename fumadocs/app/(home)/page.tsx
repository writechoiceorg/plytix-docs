import Link from 'next/link';
import { ArrowRightRegular, BookOpenRegular, BotRegular, RocketRegular } from '@/components/icons';

// API V3 isn't public yet: the homepage points only to the V1/V2 reference and
// avoids V3-dependent steps. The Help Center stays reachable from the footer.
const cards = [
  {
    title: 'Get started',
    icon: RocketRegular,
    description:
      'Authenticate with your API credentials and make your first request against the V1 and V2 API.',
    bullets: ['Exchange your API key and password for a bearer token', 'Check rate limits and status codes'],
    href: '/reference/v1-v2/token-authentication',
    linkLabel: 'Authenticate your requests',
  },
  {
    title: 'API reference',
    icon: BookOpenRegular,
    description:
      'Explore the resources the API exposes, with parameters, request bodies, and example responses for every endpoint.',
    bullets: ['Products, assets, and categories', 'Filtering, search, and pagination'],
    href: '/reference/v1-v2/api-v1-v2-reference',
    linkLabel: 'Browse the reference',
  },
  {
    title: 'Plytix MCP',
    badge: 'Beta',
    icon: BotRegular,
    description:
      'Connect Claude, ChatGPT, or another AI application to your Plytix account and work with your product data in natural language.',
    bullets: ['Connect your AI assistant with OAuth', 'Capabilities and example workflows'],
    href: '/mcp/overview',
    linkLabel: 'Explore Plytix MCP',
  },
];

function BetaBadge({ label, className = '' }: { label: string; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium uppercase tracking-wide ${className}`}
    >
      {label}
    </span>
  );
}

export default function HomePage() {
  return (
    <main className="w-full max-w-[1280px] mx-auto px-4 md:px-[30px] pt-12 pb-16">
      {/* Hero: same ink panel in both themes, lit by blurred lilac/cyan glows. */}
      <section className="relative isolate overflow-hidden rounded-[26px] bg-[#201A32] px-6 py-20 md:py-[88px] text-center mb-[52px]">
        <div
          aria-hidden
          className="pointer-events-none absolute -z-10 -left-[30%] -top-[60%] h-[140%] w-[90%] rounded-full bg-[#BDA8FF] opacity-35 blur-[150px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -z-10 -right-[20%] -top-[70%] h-[130%] w-[80%] rounded-full bg-[#47C6FF] opacity-30 blur-[150px]"
        />

        <h1 className="text-white text-4xl sm:text-[56px] sm:leading-[1.15] font-bold tracking-tight mb-5">
          Build with Plytix
        </h1>
        <p className="text-white/90 text-lg sm:text-[20px] leading-[1.4] max-w-[820px] mx-auto mb-10">
          Plytix is a multi-technology platform for product content, with Plytix PIM, Plytix DAM, and Plytix
          Feed Management working together. Use the API to connect your ERP, storefront, or internal tools to
          your catalog, or connect an AI assistant with the Plytix MCP to work with your product data in natural
          language.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/reference/v1-v2/api-v1-v2-reference"
            className="inline-flex items-center rounded-full bg-[#7A52FF] px-6 py-3 text-lg text-white no-underline transition-colors hover:bg-[#6a40f5]"
          >
            Get started
          </Link>
          <Link
            href="/mcp/overview"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-lg text-white no-underline transition-colors hover:bg-white/10"
          >
            Explore Plytix MCP
          </Link>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-[26px]">
        {cards.map(({ title, badge, icon: Icon, description, bullets, href, linkLabel }) => (
          <div key={title} className="plytix-surface rounded-[13px]! p-[26px] flex flex-col">
            <Icon className="mb-5 size-6 text-fd-foreground" />
            <h2 className="flex items-center gap-2 text-xl font-medium leading-[1.4] mb-2">
              {title}
              {badge && <BetaBadge label={badge} className="bg-fd-primary/15 text-fd-primary" />}
            </h2>
            <p className="text-base leading-[1.3] text-fd-muted-foreground mb-4">{description}</p>
            <ul className="mb-10 space-y-1 text-base leading-[1.5] text-fd-muted-foreground list-disc ps-4 marker:text-xs">
              {bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            <Link
              href={href}
              className="mt-auto inline-flex items-center gap-1.5 text-base text-(--plytix-link) no-underline hover:underline"
            >
              {linkLabel} <ArrowRightRegular className="size-4" />
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
