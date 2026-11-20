import { generateOGImage } from 'fumadocs-ui/og';
import { appName, brandColor, siteDescription } from '@/lib/shared';

export const revalidate = false;

/** Share card for the homepage (STG-021). Docs pages use /og/docs/<slug>/image.png. */
export function GET() {
  return generateOGImage({
    title: appName,
    description: siteDescription,
    site: 'Plytix',
    primaryColor: brandColor,
  });
}
