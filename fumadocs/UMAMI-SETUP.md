# Activating Umami Cloud analytics

The site uses [Umami Cloud](https://umami.is/), the hosted version of Umami,
for page analytics. Plytix's infrastructure team owns the Umami Cloud account.

The tracking script is wired in `app/layout.tsx`. It renders only when
`NEXT_PUBLIC_UMAMI_SRC` and `NEXT_PUBLIC_UMAMI_WEBSITE_ID` are both set.

## Current configuration

Plytix shared the live portal's tracking code on 2026-11-23:

```html
<script defer src="https://cloud.umami.is/script.js" data-website-id="04bcf1a3-81f2-4814-af19-d7aa2a2cbd9c" data-host-url="https://docs.plytix.com"></script>
```

These values are committed in `fumadocs/.env.production`, which `next build`
loads, so every `npm run cf:deploy` (and `cf:preview`) includes them with no
extra step. They're public: they appear in every page's HTML.

| Env var | Value | Renders as |
|---|---|---|
| `NEXT_PUBLIC_UMAMI_SRC` | `https://cloud.umami.is/script.js` | `src` |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | `04bcf1a3-81f2-4814-af19-d7aa2a2cbd9c` | `data-website-id` |
| `NEXT_PUBLIC_UMAMI_HOST_URL` | `https://docs.plytix.com` | `data-host-url` (optional) |

**Open question (FB-067):** `data-host-url` makes the tracker send pageviews
to `https://docs.plytix.com/api/send` instead of Umami Cloud directly. This
site has no `/api/send` route, so once it serves `docs.plytix.com`, something
must forward that path to `https://cloud.umami.is/api/send`, or pageviews are
lost. Ask Plytix how the live portal serves it today before the cutover. Until
then, deploys on other hosts send pageviews to the live portal's `/api/send`.

The steps below are for setting up a new Umami Cloud website, or changing
the values.

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

## 2. Set the env vars

Update the values in `fumadocs/.env.production`:

```bash
NEXT_PUBLIC_UMAMI_SRC=<the src from the tracking code>
NEXT_PUBLIC_UMAMI_WEBSITE_ID=<the data-website-id from the tracking code>
NEXT_PUBLIC_UMAMI_HOST_URL=<the data-host-url, if the snippet has one>
```

**Local dev:** `npm run dev` doesn't load `.env.production`, so local
pageviews aren't tracked. To test the integration, put the values in a
`.env.local` (already gitignored).

**Cloudflare deploy: read this carefully.** These are `NEXT_PUBLIC_*` vars,
so Next.js bakes them into the client bundle **at build time**, not at
runtime. Setting them in `wrangler.jsonc` `vars` or the Cloudflare dashboard
does **nothing** for this; that only affects server-side code. The committed
`.env.production` covers the build. A variable exported in the shell (or CI)
before `npm run cf:deploy` / `npm run cf:preview` overrides the file.

## 3. Verify

After deploying, open the live site and check devtools → Network for a
request to `script.js` and a `POST` that sends the pageview. With
`data-host-url` set, that `POST` goes to `<data-host-url>/api/send`;
without it, to the host the script loads from. Then confirm a pageview lands in the Umami Cloud dashboard within a
minute.

## Optional: scope tracking to production only

Preview builds also load `.env.production`, so they track too. To keep them
out of production analytics, use `data-domains` (below), or turn the script
off for a preview build with an empty export, which wins over the file:

```bash
NEXT_PUBLIC_UMAMI_WEBSITE_ID= npm run cf:preview
```

Umami also supports a `data-domains` attribute (a comma-separated list
matched against `window.location.hostname`) that limits tracking to listed
domains. `app/layout.tsx` doesn't set it today; add it there if the env-var
approach isn't enough.

## Privacy

Umami doesn't use cookies and doesn't collect personal data by default
(<https://docs.umami.is/docs>), so the site needs no cookie banner for it.
Confirm this with Plytix's own privacy policy before launch.
