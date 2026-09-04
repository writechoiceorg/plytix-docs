# Plytix PIM API — Bruno Collection

Live/sandbox testing collection for the Plytix PIM API, validating the
engagement's raw materials (`materials/api-references/`, `openapi_pimv3.json`)
against real API behavior. See `config/api-testing.config.md` (repo root) for
base URLs, auth mechanism, and the running log of confirmed quirks. See
`TESTING_PLAN.md` (this folder) for the phased plan covering all 51 v3
paths — feed it to the `api-endpoint-tester` skill one phase at a time.
See `USER_FLOWS.md` (this folder) for the follow-on plan that chains those
endpoints into real dashboard-equivalent journeys (create a product,
build a channel export, build a Brand Portal, etc.), grounded in the
matching help-center articles for each.

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

## Environments

| Environment | Account | Auth host | PIM v3 host |
|---|---|---|---|
| `Sandbox` | "API Docs" (`PLYTIX_API_KEY`/`PLYTIX_API_PASSWORD`) | `auth.plytix.com` | unreachable — see `config/api-testing.config.md` |
| `Dev` | "David's Dev Account" (`PLYTIX_DEV_API_KEY`/`PLYTIX_DEV_API_PASSWORD`) | `auth.dev.plytix.com` | `pim.dev.plytix.com/api/v3` — confirmed live |

Auth host and PIM host are paired per environment — credentials from one
environment 401 against the other's hosts. Always pass the matching
`--env` flag, e.g. `bru run "02-Products-v3/" --env "Dev"`.

## Sections

| # | Folder | Covers |
|---|---|---|
| 01 | `01-Authentication` | The `Sandbox` bearer-token exchange used by v1/v3-on-sandbox calls. Run only with `--env "Sandbox"`. |
| 02 | `02-Products-v3` | Live v3 product endpoints, run against `Dev` only (v3 is unreachable under the `Sandbox` account). Includes its own `Get Access Token (Dev)` request so the folder is self-contained — run the whole folder with `--env "Dev"`. |

## Test Fixtures

- **Test account**: "API Docs" (account id `6a8ed9ba98cab862c35f5f89`), user
  `writechoice_test`, role `ADMIN`, provisioned by Plytix for this
  engagement. Credentials live in `bruno-collection/.env` (gitignored).
- **DEV account**: "David's Dev Account" (account id `6a38f5a5b22478f30bfd755c`),
  user `TestDH`, role `ADMIN` — a separate account in Plytix's DEV
  environment, provisioned so v3 could be tested (v3 is not reachable under
  the "API Docs" account). Credentials live in `bruno-collection/.env`
  (gitignored).
