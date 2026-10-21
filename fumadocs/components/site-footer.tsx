import Image from 'next/image';
import { cn } from '@/lib/cn';

// Mirrors the footer on the Plytix knowledge base (knowledge.plytix.com),
// minus its "API documentation" link, which would point back at this site.
const COLUMNS = [
  {
    title: 'Platform',
    links: [
      { text: 'PIM', url: 'https://www.plytix.com/pim/' },
      { text: 'DAM', url: 'https://www.plytix.com/dam/' },
      { text: 'Connections', url: 'https://www.plytix.com/connections' },
      { text: 'Plytix for B2B', url: 'https://www.plytix.com/b2b' },
      {
        text: 'Plytix for Shopify',
        url: 'https://www.plytix.com/shopify-content-manager/',
      },
    ],
  },
  {
    title: 'Company',
    links: [
      { text: 'About', url: 'https://www.plytix.com/about' },
      { text: 'Pricing', url: 'https://www.plytix.com/pricing/' },
      { text: 'Contact us', url: 'https://www.plytix.com/contact' },
      { text: 'Press', url: 'https://www.plytix.com/press' },
      { text: 'Careers', url: 'https://www.plytix.com/careers' },
      { text: 'Community', url: 'https://www.plytix.com/community/' },
    ],
  },
  {
    title: 'Resources',
    links: [
      {
        text: 'Customer stories',
        url: 'https://knowledge.plytix.com/about/customer-stories/',
      },
      { text: 'Blog', url: 'https://www.plytix.com/blog' },
      { text: 'Help center', url: 'https://help.plytix.com/' },
    ],
  },
];

const LEGAL = [
  {
    text: 'Terms and conditions',
    url: 'https://www.plytix.com/policies/terms-and-conditions',
  },
  {
    text: 'Privacy Policy',
    url: 'https://www.plytix.com/policies/privacy-policy',
  },
  { text: 'Legal Notice', url: 'https://www.plytix.com/policies/legal-notice' },
  {
    text: 'Cookie policy',
    url: 'https://www.plytix.com/policies/cookie-policy',
  },
];

const SOCIAL = [
  { text: 'LinkedIn', url: 'https://www.linkedin.com/company/plytix-com/' },
  { text: 'Facebook', url: 'https://www.facebook.com/plytix/' },
  { text: 'Instagram', url: 'https://www.instagram.com/plytix/?hl=en' },
  { text: 'TikTok', url: 'https://www.tiktok.com/@plytix.com' },
  {
    text: 'YouTube',
    url: 'https://www.youtube.com/channel/UC2dNxluXutX8vabK_eO1k5Q',
  },
];

const linkClass =
  'text-sm text-fd-muted-foreground no-underline transition-colors hover:text-fd-foreground';

function FooterLink({ text, url }: { text: string; url: string }) {
  return (
    <a href={url} target="_blank" rel="noreferrer noopener" className={linkClass}>
      {text}
    </a>
  );
}

export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer id="site-footer" className={cn('border-t bg-fd-background', className)}>
      <div className="mx-auto w-full max-w-[1280px] px-4 md:px-[30px] py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <a
            href="https://www.plytix.com/"
            target="_blank"
            rel="noreferrer noopener"
            className="self-start"
          >
            <Image
              src="/logo/mark-light.svg"
              alt="Plytix"
              width={32}
              height={32}
              className="dark:hidden"
            />
            <Image
              src="/logo/mark-dark.svg"
              alt="Plytix"
              width={32}
              height={32}
              className="hidden dark:block"
            />
          </a>
          {COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title} className="flex flex-col gap-2">
              <p className="mb-1 text-sm font-semibold text-fd-foreground">{column.title}</p>
              {column.links.map((link) => (
                <FooterLink key={link.url} {...link} />
              ))}
            </nav>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t pt-6 md:flex-row md:items-center md:justify-between">
          <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL.map((link) => (
              <FooterLink key={link.url} {...link} />
            ))}
          </nav>
          <nav aria-label="Social" className="flex flex-wrap gap-x-5 gap-y-2">
            {SOCIAL.map((link) => (
              <FooterLink key={link.url} {...link} />
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
