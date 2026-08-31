# Plytix PIM API — Bruno Collection

Live/sandbox testing collection for the Plytix PIM API, validating the
engagement's raw materials (`materials/api-references/`, `openapi_pimv3.json`)
against real API behavior. See `config/api-testing.config.md` (repo root) for
base URLs, auth mechanism, and the running log of confirmed quirks.

## Setup

```bash
npm install -g @usebruno/cli   # if not already installed
cd bruno-collection
set -a; source .env; set +a    # loads PLYTIX_API_KEY / PLYTIX_API_PASSWORD
bru run "01-Authentication/" --env "Sandbox"
```

`.env` is gitignored — see `config/api-testing.config.md` for where the
credentials came from (a Plytix-provisioned test account, "API Docs" /
`writechoice_test`).

Note: this CLI (`bru` v4.0.0) uses the real `.bru` block format
(`meta{}`/`post{}`/`headers{}`/`body:json{}`/`assert{}`/`docs{}`), not the
`.yml` format described in `.claude/skills/endpoint-tester/SKILL.md` —
that skill file's Phase 3 format section is stale. Follow the `.bru` files
in this collection as the actual, verified format.

## Sections

| # | Folder | Covers |
|---|---|---|
| 01 | `01-Authentication` | The `auth.plytix.com` bearer-token exchange used by every other call. |

## Test Fixtures

- **Test account**: "API Docs" (account id `6a8ed9ba98cab862c35f5f89`), user
  `writechoice_test`, role `ADMIN`, provisioned by Plytix for this
  engagement. Credentials live in `bruno-collection/.env` (gitignored).
