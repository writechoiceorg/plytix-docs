# Deployment options for AWS Infra to choose between

Answers to the two points raised: both concerns are valid.

**MCP needs a live server.** `app/api/mcp/route.ts` handles `GET`/`POST`/`DELETE` as a stateful protocol endpoint — this can't be produced by a static export. It's not the only dynamic piece either: `/api/search` (Fumadocs' server search API) is also request-time and can't be static as-is, though it can be swapped for Fumadocs' static search mode (a prebuilt JSON index, no server) if the goal is to keep everything else static. The `llms.txt`/`llms-full.txt` and OG-image routes are currently server routes too, but their output is fully known at build time, so they can be pre-rendered/exported statically either way.

**Cloudflare is not a hard dependency.** It was simply the provider used for the test deploy: `wrangler.jsonc`, the `@opennextjs/cloudflare` build adapter, and the `cf:*` npm scripts. The only Cloudflare-specific code is in `lib/openapi.ts` (a direct JSON import instead of a file-path input, needed because Cloudflare Workers have no filesystem at request time) — harmless to keep as-is on AWS. Also worth flagging: the current Worker bundle (~6.7 MB gzip) exceeds Cloudflare's free-tier 3 MiB limit and needs the Workers Paid plan (~$5/mo); this constraint is Cloudflare-specific and doesn't exist on AWS.

Two viable architectures on AWS. Neither is a forced pick — trade-offs below.

## Option 1 — Hybrid: S3 + CloudFront for docs, small Lambda for MCP/search

Keeps the original plan (static docs on S3 + CloudFront) for everything except the pieces that genuinely need a server.

**How it works:**
- Static-export the documentation pages to S3, served through CloudFront, as originally planned.
- Move search to Fumadocs' static search mode so it doesn't need a server (see above).
- Extract `/api/mcp` into its own small server — a Lambda behind API Gateway or a Lambda Function URL. It only depends on the build-time content index, so it doesn't need the rest of the app running alongside it.
- Wire that Lambda into the same CloudFront distribution using path-based routing (e.g. `/api/mcp*` → Lambda origin, everything else → S3 origin), so the docs and MCP endpoint still live under one domain.

**Trade-offs:**
- Preserves the S3 + CloudFront setup already planned; only a thin slice of compute is added.
- More moving parts to set up: two build outputs (static export + Lambda package), CloudFront path-pattern routing, and a search-mode change.
- Best fit if Infra wants to minimize what runs as a server and keep the bulk of the site as static hosting.

## Option 2 — Full SSR on AWS

Deploy the whole Next.js app as a server on AWS, mirroring the current Cloudflare setup but on a different provider.

**How it works:**
- Replace the Cloudflare/OpenNext adapter with one of:
  - OpenNext's AWS/Lambda target (same tool family already in use, different target)
  - A container on ECS, Fargate, or App Runner
  - AWS Amplify Hosting in SSR mode
- Everything (docs, search, MCP, OG images) runs through the same server, no split needed.

**Trade-offs:**
- Simpler to build and operate: one deploy pipeline, no static/dynamic split, no search-mode migration.
- Runs server compute for the entire site, not just the small dynamic surface — doesn't use S3 + CloudFront the way originally planned.
- Best fit if Infra would rather avoid a two-pipeline setup and is fine provisioning Lambda/Fargate for the whole app.

## Comparison

| | Option 1: Hybrid | Option 2: Full SSR |
|---|---|---|
| Preserves S3 + CloudFront for docs | Yes | No |
| Setup effort | Higher (two pipelines, static search migration, CloudFront routing) | Lower (one pipeline) |
| Ongoing ops | Static hosting + one small Lambda | Server compute for the whole app |
| Cloudflare-specific blockers removed | Yes | Yes |
