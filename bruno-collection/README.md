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
| 02 | `02-Products-v3` | Live v3 product endpoints, run against `Dev` only (v3 is unreachable under the `Sandbox` account). Also carries `TESTING_PLAN.md`'s Phase 0 cross-cutting checks (query params, identifier flexibility, subpaths, 422 shape), tested once here as the reference resource — see its own `README.md`. Includes its own `Get Access Token (Dev)` request so the folder is self-contained — run the whole folder with `--env "Dev"`. |
| 03 | `03-Product-Categories` | Phase 1a. Confirms undeclared `PATCH`/`DELETE` work despite not being in the spec — see its own `README.md`. |
| 04 | `04-Asset-Categories` | Phase 1b. Same shape/behavior as `03-Product-Categories`. |
| 05 | `05-Product-Attribute-Groups` | Phase 1c. |
| 06 | `06-Product-Attributes` | Phase 1d. Polymorphic create across 14 documented types (+ a 15th undocumented, unimplemented one found live) — see its own `README.md`. |
| 07 | `07-Connections` | Phase 1e. Reveals `type` is a fixed enum, not the free string the spec describes. |
| 08 | `08-Import-Profiles` | Phase 1f. |
| 09 | `09-Assets` | Phase 2a. `category_ids` silently ignored on create but applies via `PATCH` — see its own `README.md`. |
| 10 | `10-Pim-Product-Lists` | Phase 3a. Reveals how "Static" list membership actually works (lives on the product, not the list) — see its own `README.md`. |
| 11 | `11-Asset-Lists` | Phase 3b. Same shape/behavior as `10-Pim-Product-Lists`. |
| 12 | `12-Pdf-Catalogs` | Phase 3c. Creation blocked entirely — account lacks the PDF Catalogs feature. |
| 13 | `13-Product-Families` | Phase 3d. Read-only; real pre-existing data used, no fixtures created. |
| 14 | `14-Relationships` | Phase 3e. Read-only; real pre-existing data used, no fixtures created. |
| 15 | `15-Channels` | Phase 4a. `format` is a hidden fixed set; rebuild-scheduling validation errors are unusually vague — see its own `README.md`. |
| 16 | `16-Ecatalogs` | Phase 4b. Creation blocked entirely — account lacks the Ecatalogs feature (same as `12-Pdf-Catalogs`). Real pre-existing catalog used for shape confirmation. |
| 17 | `17-Product-Relationships` | Added 2026-09-15 (spec refresh, 51→63 paths). New product-to-product relationship-linking resource — see its own `README.md`. First confirmed safe, scoped `DELETE`-based unlink in this whole project; also found a cross-tenant data-isolation gap shared with `13-Product-Families`'s new `family-attributes` endpoint. |

## Test Fixtures

- **Test account**: "API Docs" (account id `6a8ed9ba98cab862c35f5f89`), user
  `writechoice_test`, role `ADMIN`, provisioned by Plytix for this
  engagement. Credentials live in `bruno-collection/.env` (gitignored).
- **DEV account**: "David's Dev Account" (account id `6a38f5a5b22478f30bfd755c`),
  user `TestDH`, role `ADMIN` — a separate account in Plytix's DEV
  environment, provisioned so v3 could be tested (v3 is not reachable under
  the "API Docs" account). Credentials live in `bruno-collection/.env`
  (gitignored).
