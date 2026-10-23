import Image from 'next/image';

/**
 * Site footer, matching the Knowledge Base footer (knowledge.plytix.com): link
 * columns and the G2 rating, then the legal logo, legal links, and social
 * icons. Its spacing and type tokens live on `.plytix-footer` in global.css.
 */

interface FooterLink {
  text: string;
  url: string;
  newTab?: boolean;
}

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Platform',
    links: [
      { text: 'PIM', url: 'https://www.plytix.com/pim/' },
      { text: 'DAM', url: 'https://www.plytix.com/dam/' },
      { text: 'Connections', url: 'https://www.plytix.com/connections' },
      { text: 'Plytix for B2B', url: 'https://www.plytix.com/b2b' },
      { text: 'Plytix for Shopify', url: 'https://www.plytix.com/shopify-content-manager/' },
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
      { text: 'Customer stories', url: 'https://knowledge.plytix.com/about/customer-stories/' },
      { text: 'Blog', url: 'https://www.plytix.com/blog' },
      { text: 'Help center', url: 'https://help.plytix.com/', newTab: true },
      {
        text: 'Our Branding Guidelines',
        url: 'https://www.plytix.com/wp-content/uploads/2026/03/Plytix-Branding-Guidelines.pdf',
        newTab: true,
      },
    ],
  },
];

const legalLinks: FooterLink[] = [
  { text: 'Terms and conditions', url: 'https://www.plytix.com/policies/terms-and-conditions' },
  { text: 'Privacy Policy', url: 'https://www.plytix.com/policies/privacy-policy' },
  { text: 'Legal Notice', url: 'https://www.plytix.com/policies/legal-notice' },
  { text: 'Cookie policy', url: 'https://www.plytix.com/policies/cookie-policy' },
  // plytix.com opens its cookie banner here and falls back to the policy page;
  // this site has no cookie banner, so it only gets the fallback.
  { text: 'Cookie preferences', url: 'https://www.plytix.com/policies/cookie-policy' },
];

// Font Awesome Free 6.7.2 brand icons (CC BY 4.0, https://fontawesome.com/license/free),
// the same set the Knowledge Base footer uses.
const socialLinks = [
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/company/plytix-com/',
    viewBox: '0 0 448 512',
    path: 'M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z',
  },
  {
    label: 'Facebook',
    url: 'https://www.facebook.com/plytix/',
    viewBox: '0 0 320 512',
    path: 'M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z',
  },
  {
    label: 'Instagram',
    url: 'https://www.instagram.com/plytix/?hl=en',
    viewBox: '0 0 448 512',
    path: 'M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z',
  },
  {
    label: 'TikTok',
    url: 'https://www.tiktok.com/@plytix.com',
    viewBox: '0 0 448 512',
    path: 'M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z',
  },
  {
    label: 'YouTube',
    url: 'https://www.youtube.com/channel/UC2dNxluXutX8vabK_eO1k5Q',
    viewBox: '0 0 576 512',
    path: 'M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z',
  },
];

function newTabProps(newTab?: boolean) {
  return newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {};
}

export function SiteFooter() {
  return (
    // Side padding follows the docs header (not the Knowledge Base's) so the
    // footer lines up with the rest of this site on small screens.
    <footer className="plytix-footer bg-(--plytix-footer-bg) px-4 py-(--footer-space-4) text-[15px] leading-[1.2] text-white md:px-6">
      <div className="mx-auto w-full max-w-[1100px]">
        <div className="grid grid-cols-1 gap-(--footer-space-4) pt-(--footer-space-5) min-[479px]:grid-cols-2 md:grid-cols-4">
          {columns.map(({ title, links }) => (
            <div key={title}>
              <h3 className="mt-4 mb-(--footer-space-1) text-(length:--footer-heading-size) leading-[1.2] font-normal">
                {title}
              </h3>
              <ul className="flex flex-col gap-(--footer-space-1)">
                {links.map(({ text, url, newTab }) => (
                  <li key={text}>
                    <a href={url} {...newTabProps(newTab)}>
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <Image
              src="/footer/g2-rating.svg"
              alt="Rated 5 stars on G2"
              width={190}
              height={38}
              className="mt-4 h-7 w-auto"
            />
          </div>
        </div>

        <div className="flex flex-col items-start gap-(--footer-space-3) pt-(--footer-space-6) min-[479px]:flex-row min-[479px]:flex-wrap min-[479px]:items-center min-[479px]:justify-between">
          <a href="https://www.plytix.com/" className="shrink-0">
            <Image
              src="/footer/plytix-legal.svg"
              alt="Plytix. © 2026 Plytix. All rights reserved."
              width={160}
              height={48}
            />
          </a>
          <ul className="flex flex-col gap-(--footer-space-2) text-(length:--footer-text-s) font-medium min-[479px]:flex-row min-[479px]:flex-wrap min-[479px]:items-center min-[479px]:gap-(--footer-space-1)">
            {legalLinks.map(({ text, url }, i) => (
              <li key={text} className="flex items-center gap-(--footer-space-1)">
                {i > 0 && (
                  <span aria-hidden className="max-[478px]:hidden">
                    |
                  </span>
                )}
                <a href={url}>{text}</a>
              </li>
            ))}
          </ul>
          {/* When stacked, pull the icons' padding back so they line up with the text. */}
          <ul className="flex max-[478px]:-ms-[15px]">
            {socialLinks.map(({ label, url, viewBox, path }) => (
              <li key={label}>
                <a
                  href={url}
                  aria-label={label}
                  className="flex items-center justify-center p-[15px]"
                  {...newTabProps(true)}
                >
                  <svg viewBox={viewBox} fill="currentColor" aria-hidden className="h-6 w-auto">
                    <path d={path} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
