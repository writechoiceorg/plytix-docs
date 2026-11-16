# Activating Umami Cloud analytics

The site uses [Umami Cloud](https://umami.is/), the hosted version of Umami,
for page analytics. Plytix's infrastructure team owns the Umami Cloud account.

The tracking script is already wired in `app/layout.tsx` as a no-op: it only
renders when both env vars below are set, so this repo builds and deploys
fine with analytics off. Once the Umami Cloud website exists, do this:

## 1. Add the website in Umami Cloud

Log in to Umami Cloud (<https://cloud.umami.is>) → **Websites** in the
sidebar → **Add website** (top-right) → enter a **Name** and this site's
**Domain** (e.g. `docs.plytix.com`) → **Save**.

Then select **Edit** on the website and open the **Tracking code** section.
The snippet looks like this:

```html
<script defer src="https://cloud.umami.is/script.js" data-website-id="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"></script>
```

Copy the `src` value and the `data-website-id` value exactly as the snippet
shows them. Use the `src` from your snippet, not the example above, because
Umami's docs don't fix the Cloud script URL.

## 2. Set the two env vars

```bash
NEXT_PUBLIC_UMAMI_SRC=<the src from the tracking code>
NEXT_PUBLIC_UMAMI_WEBSITE_ID=<the data-website-id from the tracking code>
```

**Local dev:** put these in a `.env.local` (already gitignored), then
`npm run dev`. Local pageviews land in the production dashboard, so prefer
leaving them unset locally unless you're testing the integration.

**Cloudflare deploy: read this carefully.** These are `NEXT_PUBLIC_*` vars,
so Next.js bakes them into the client bundle **at build time**, not at
runtime. Setting them in `wrangler.jsonc` `vars` or the Cloudflare dashboard
does **nothing** for this; that only affects server-side code. You must
export them in the shell (or CI secrets) *before* running `npm run cf:deploy`
/ `npm run cf:preview`, e.g.:

```bash
export NEXT_PUBLIC_UMAMI_SRC=https://cloud.umami.is/script.js
export NEXT_PUBLIC_UMAMI_WEBSITE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
npm run cf:deploy
```

If you deploy via CI, add both as CI-level secrets/env vars on the deploy job.

## 3. Verify

After deploying, open the live site and check devtools → Network for a
request to `script.js` and a request to the Umami host that sends the
pageview (by default the tracker sends data to the host the script loads
from). Then confirm a pageview lands in the Umami Cloud dashboard within a
minute.

## Optional: scope tracking to production only

If you also deploy preview builds and don't want them polluting production
analytics, only export the two vars in the production deploy job/environment.
Preview builds without them skip the script, which is already the default
behavior.

Umami also supports a `data-domains` attribute (a comma-separated list
matched against `window.location.hostname`) that limits tracking to listed
domains. `app/layout.tsx` doesn't set it today; add it there if the env-var
approach isn't enough.

## Privacy

Umami doesn't use cookies and doesn't collect personal data by default
(<https://docs.umami.is/docs>), so the site needs no cookie banner for it.
Confirm this with Plytix's own privacy policy before launch.
