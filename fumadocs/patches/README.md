# patches/

[patch-package](https://github.com/ds300/patch-package) patches for the API
playground, applied to `node_modules` by the `postinstall` script on every
`npm install`. Each patch is pinned to the exact package version in its file
name. When you upgrade `fumadocs-openapi` or `@fumadocs/api-docs`, check
whether upstream has fixed the issue. If it hasn't, re-apply the edit in
`node_modules` and run `npx patch-package <package>`. If `npm install` reports
that a patch failed, the build still uses the unpatched package.

Code samples aren't patched. They come from our own generators in
`lib/code-samples.ts`, registered through the supported `codeUsages` option in
`components/openapi-page.tsx` and tested by `npm run test:code-samples`.

Every patched line is marked with a `[plytix-docs patch PM-xx]` comment.

## fumadocs-openapi+11.4.3.patch

| File | Item | Change |
|---|---|---|
| `dist/requests/generators/index.js` | PM-56 | `pathnameFromRequest` encodes each path value with `encodeURIComponent`, so `/` or `?` stay in one segment. The playground request, the request preview and every code sample use this function. |
| `dist/playground/client.js` | PM-56 | **Send** is blocked while a required path parameter is empty or only whitespace. The Path panel opens, an inline error appears under the field (`aria-invalid` and `aria-describedby` on the input), and focus moves to the first empty field. No request is sent. The error clears as the user types. Path inputs get `aria-required`. |
| `dist/playground/client.js` | PM-58 | Closing the JSON editor returns focus to the **Open JSON Editor** button. |

## @fumadocs+api-docs+0.2.9.patch

| File | Item | Change |
|---|---|---|
| `dist/components/playground/inputs.js` | PM-58 | The JSON editor textarea gets the accessible name "Request body (JSON)", gets focus when the editor opens, and is linked to its parse error with `aria-invalid` and `aria-describedby`. |
| `dist/components/playground/inputs.js` | PM-40 | The icon-only "X" (unset) button gets `aria-label="Unset field <name>"`. |
| `dist/components/playground/inputs.js` | PM-56 | `FieldSet` and `FieldInput` pass a new `inputProps` prop through to the input element, which `client.js` uses for the ARIA attributes above. |
| `dist/components/playground/schema.js` | PM-59 | `useFieldInfo` selects the matching `oneOf`/`anyOf` member or `type` again when the value changes outside the selector (for example, after a JSON edit). It changes only the selection and never rewrites the value. |
| `dist/components/schema/client.js` | PM-40 | The icon-only link button next to each schema field copies a link that highlights that field. It gets `aria-label="Copy link to field <name>"` and `type="button"`. |
