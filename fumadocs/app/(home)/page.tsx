import Link from 'next/link';
import {
  ArrowRightRegular,
  BookOpenRegular,
  PersonSupportRegular,
  RocketRegular,
} from '@/components/icons';

const cards = [
  {
    title: 'Get started',
    icon: RocketRegular,
    description:
      'Generate an API key, exchange it for a bearer token, and make your first authenticated request against API V3.',
    bullets: ['Create an API key in your dashboard', 'Exchange it for a bearer token'],
    href: '/docs/guides/what-is-the-plytix-api',
    linkLabel: 'Check the guides',
  },
  {
    title: 'API reference',
    icon: BookOpenRegular,
    description:
      'Explore the resources the API exposes, with parameters, request bodies, and example responses for every endpoint.',
    bullets: ['Products, assets, and categories', 'Authentication and status codes'],
    href: '/reference/v3',
    linkLabel: 'Browse the reference',
  },
  {
    title: 'Plytix Help Center',
    icon: PersonSupportRegular,
    description:
      "Managing products by hand, configuring channels, or handling account administration? That's covered in the Help Center, not here.",
    bullets: ['Using the Plytix dashboard', 'Account and channel setup'],
    href: 'https://help.plytix.com/en',
    linkLabel: 'Visit the Help Center',
  },
];

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
          Build on the Plytix API
        </h1>
        <p className="text-white/90 text-lg sm:text-[20px] leading-[1.4] max-w-[820px] mx-auto mb-10">
          Plytix is a multi-technology platform for product content, with Plytix PIM, Plytix DAM,
          and Plytix Feed Management working together. Use the API to connect your ERP, storefront, or internal
          tools and manage your products, assets, and catalog structure programmatically.
        </p>
        <Link
          href="/docs/guides/quickstart"
          className="inline-flex items-center rounded-full bg-[#7A52FF] px-6 py-3 text-lg text-white no-underline transition-colors hover:bg-[#6a40f5]"
        >
          Get started
        </Link>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-[26px]">
        {cards.map(({ title, icon: Icon, description, bullets, href, linkLabel }) => (
          <div key={title} className="plytix-surface rounded-[13px]! p-[26px] flex flex-col">
            <Icon className="mb-5 size-6 text-fd-foreground" />
            <h2 className="text-xl font-medium leading-[1.4] mb-2">{title}</h2>
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
