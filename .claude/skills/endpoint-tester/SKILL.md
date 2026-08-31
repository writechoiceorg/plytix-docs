---
name: api-endpoint-tester
description:
  Use this skill when testing REST API endpoints with Bruno: creating new
  Bruno collection folders, executing requests, validating responses,
  identifying discrepancies with the API spec, and updating the collection
  README and spec file with findings.
---

# API endpoint tester

You are testing REST API endpoints against a live (staging/sandbox)
environment using the Bruno collection in this project. Your goal is to
execute real HTTP requests, validate responses against the API spec,
document what you find, and update both the Bruno collection and the spec
when the live API differs from what is documented.

All project-specific facts — base URLs, auth, resource ID prefixes, known
quirks, status-gating rules, test fixtures — live in the project's API
testing config file (see `config/api-testing.config.md` in this toolkit for
the template; find the project's filled-in copy before you start, typically
at the repo root or under `.claude/`). Read it before doing anything else.
If it doesn't exist yet, create it from the template and ask the user to
fill in the basics you can't determine yourself.

> **Async endpoints:** If the config's "Async / webhook-driven resources"
> table lists the endpoint you're testing, invoke the `api-webhook-tester`
> skill alongside this one. It handles capturing and validating the webhook
> payload and writing it into the Bruno collection.

---

## Phase 1: Understand before you run

Before creating any files:

1. **Read the project's API testing config.** Base URL, auth mechanism,
   spec file location, known quirks, status-gating rules.
2. **Read the spec** (if one exists) for the target endpoint. Note the
   method, URL, required fields, field names, and expected response
   schemas. If there's no spec, treat the live API's actual behavior as
   ground truth and document it fully in the Bruno file and folder README.
3. **Identify prerequisites.** Check the config's status-gating table for
   operations that require prior state (e.g. "requires an existing resource
   in status X").
4. **Read existing Bruno files** in this collection to match its established
   format before writing new ones — pay attention to `info`, `http`,
   `settings`, and `examples` block structure.
5. **Read the relevant READMEs.** Check the collection's central
   `README.md` for the overview (sections, fixtures, webhook setup). Then
   check the folder-specific `README.md` for endpoint details, test groups,
   expected responses, and prior test results for that section.

---

## Phase 2: Set up and run

### Bruno CLI

Install if missing:

```bash
npm install -g @usebruno/cli
bru --version
```

Run a single file:

```bash
cd bruno-collection   # or wherever the collection root is
bru run "NN-Folder/Request Name.yml" --env "<Env Name>"
```

Run an entire folder:

```bash
bru run "NN-Folder/" --env "<Env Name>"
```

Capture JSON output (useful for extracting IDs to feed into later steps):

```bash
bru run "NN-Folder/Step 1 - Setup.yml" --env "<Env Name>" --output json
cat json | python3 -c "import json,sys; print(json.load(sys.stdin)[0]['results'][0]['response']['data']['id'])"
```

Always run from the collection's root directory so Bruno can find the
environment file.

### When placeholder IDs cause errors in bulk runs

Bruno files use `REPLACE_WITH_...` placeholders in the base request. When
you run a whole folder, those placeholders will produce errors (usually
400/404). This is expected — Bruno still marks them as "passed" (a response
was received). The important data lives in the `examples` blocks, which
hold real tested request/response pairs. Validate individual endpoints with
real IDs via `curl` before writing the `examples` block.

### Using curl for quick validation

Use `curl` for exploratory calls before committing values to Bruno files.
Pull the base URL and auth header/value from the project config rather than
hardcoding them here:

```bash
curl -s -X POST "<base_url_from_config>/<resource>" \
  -H "<auth_header_from_config>: <key_from_config>" \
  -H "content-type: application/json" \
  -H "idempotency-key: $(cat /proc/sys/kernel/random/uuid)" \
  -d '{ ... }' \
  -w "\nHTTP_STATUS:%{http_code}" | python3 -m json.tool
```

The `-w "\nHTTP_STATUS:%{http_code}"` flag appends the HTTP status code
after the body so you can read it separately from the response JSON.

---

## Phase 3: Bruno file format

### File and folder naming

- Folder: `NN-ResourceName/` where `NN` is the next sequence number.
- Files: readable English names ending in `.yml` (e.g. `Get a Widget.yml`).
- When an endpoint has required prerequisites, prefix the files with
  `Step N - ` (e.g. `Step 1 - Create a Widget.yml`).

### Folder metadata file (`folder.yml`)

```yaml
info:
  name: NN-ResourceName
  type: folder
  seq: N

request:
  auth: inherit
```

### Request file structure

```yaml
info:
  name: Get a Widget
  type: http
  seq: 4          # controls order within the folder

# Comment block: explain what the endpoint does, what fields are required,
# what the response means, and any important behaviors or caveats.

http:
  method: GET
  url: "{{base_url}}/widgets/REPLACE_WITH_WIDGET_ID"
  headers:
    - name: accept
      value: application/json
    - name: <auth-header-name>
      value: "{{<auth-header-var>}}"
  # For POST/PUT/PATCH, add:
  # body:
  #   type: json
  #   data: |-
  #     { ... }

settings:
  encodeUrl: true
  timeout: 0
  followRedirects: true
  maxRedirects: 5

examples:
  - name: Get a Widget
    request:
      url: "{{base_url}}/widgets/wdgt_692346097175102464"
      method: GET
      headers:
        - name: accept
          value: application/json
        - name: <auth-header-name>
          value: "{{<auth-header-var>}}"
    response:
      status: 200
      statusText: OK
      headers:
        - name: content-type
          value: application/json; charset=utf-8
      body:
        type: json
        data: |-
          { ... actual response from the live API ... }
```

Key rules:
- The `http` block uses `REPLACE_WITH_...` placeholder IDs.
- The `examples` block uses real IDs from actual test runs.
- Use `"{{$randomUUID}}"` for idempotency-key headers in the base request
  (if the API uses idempotency keys). Use a fixed UUID string in examples
  so they stay reproducible.
- Always include `content-type: application/json` and `accept:
  application/json` headers on requests with a body.
- Trim long response bodies to the essential fields when the response
  embeds large nested objects.
- Add a comment block at the top of each file explaining: what the endpoint
  does, prerequisite steps, required fields, key response fields, and any
  behaviors that differ from the spec.

---

## Phase 4: Recognizing and logging API quirks

Watch for these recurring categories of live-API-vs-spec mismatch. When you
find one, don't just fix the Bruno file — log it in the project config's
"Known API quirks" table so future testing sessions (and the docs team)
don't rediscover it from scratch.

### Field names differ from the spec

When you get a validation error, read the message carefully — it usually
names the exact field the API rejects and/or expects:

```json
{
  "code": "invalid_parameters",
  "message": "ValidationError: \"text\" is required, \"description\" is not allowed"
}
```

Cross-reference with the spec. If the spec is wrong, fix it (if a spec file
exists) and log the discrepancy in the config.

### Response body/resource differs from the spec

When the spec says an endpoint returns resource A but the live API returns
resource B: confirm by inspecting the actual response's type/resource
field, update the spec's response schema reference, and note it in the
Bruno comment block, the folder README, and the config's quirks table.

### HTTP status codes differ from the spec

When the documented status doesn't match what the API actually returns:
record the actual status in the Bruno example, update the spec, and log it.

### Status-gated operations

Before running an endpoint that modifies state, check the config's
status-gating table for the required starting status. When you need a
fresh resource in a specific state, create a new one rather than trying to
force-reset an existing one.

### Async triggers with no synchronous body

Some actions return `204 No Content` (or similar) and deliver the real
payload via webhook. If you hit this and the resource isn't yet in the
config's async-resources table, add it there — this is the signal that
`api-webhook-tester` should be invoked for this endpoint from now on.

---

## Phase 5: Handling recurring problems

### Stop condition

Stop and report to the user if:

- The same endpoint returns unexpected errors on three successive attempts
  with different valid inputs.
- An endpoint requires permissions or features that are not enabled on the
  test account (indicated by a permission/authorization error).
- A required upstream resource cannot be created due to a persistent API
  error.

Do not retry the same failing request repeatedly. Change the approach or
stop and ask.

### Diagnosing a 400 error

1. Read the error message/params fields — they usually name the exact
   invalid or missing field.
2. Cross-reference with the spec. If the spec's field name is wrong,
   update it.
3. Try the corrected request before updating any files.

### Diagnosing a 404 on a resource you believe exists

1. Confirm the ID format/prefix is correct (check the config's prefix
   table).
2. Confirm the resource was created in the same scope (staging vs
   production — check key prefixes in the config).
3. For multi-step resources (e.g. upload-then-reference flows): confirm
   every prerequisite step actually completed, not just that the record was
   created.

### Diagnosing an idempotency conflict

If you reuse the same idempotency key for a different request payload, the
API may return the original response or an error. Use a new UUID per
distinct request:

```bash
cat /proc/sys/kernel/random/uuid
```

---

## Phase 6: After testing — what to update

### Bruno collection files

For each tested endpoint:

1. Create/update the `.yml` file with the validated request structure in
   the `http` block and the real response in an `examples` entry.
2. Add a comment block at the top explaining the endpoint and any
   behaviors that differ from the spec.
3. Run the full folder with `bru run` and confirm all requests receive a
   response (even an error for placeholder-ID requests is fine).

### Spec file (if the project has one)

Update it when you find:

- **Wrong field name** in a request body: fix the property name and any
  inline example.
- **Wrong response schema**: point to the correct schema, or update the
  response description.
- **Wrong HTTP status code**: change the documented status.
- **Missing required fields**: add them to the schema's `required` list.

Verify your edit doesn't introduce a syntax error before moving on.

### Project config

Log any new entries in the "Known API quirks," "Status-gating rules," or
"Async / webhook-driven resources" tables.

### READMEs

Documentation is split across two levels to keep files manageable.

**Central README (collection root)** — kept lean. Only update it to:
- Add a row to the Sections table when a new folder is created.
- Update the Test Fixtures or Webhook Testing Setup sections if something
  changes at that level.
- Do not add per-endpoint details or test results here.

**Folder README (`NN-FolderName/README.md`)** — the authoritative record
for that section:
1. A description of the section and what it covers.
2. A table of test groups (control case + trigger cases, expected outcomes)
   or endpoint reference (what each request does, required fields, key
   response fields).
3. Multi-step flow diagrams (as code blocks) for multi-step workflows.
4. Notes on any behaviors that differ from the spec.
5. A test report block (confirmed IDs, pass/fail, open items) updated after
   each test run.

See `bruno-collection-skeleton/01-Example-Resource/README.md` in this
toolkit for the pattern to follow when a folder has no README yet.