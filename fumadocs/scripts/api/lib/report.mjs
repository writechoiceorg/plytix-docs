// Renders the build result as Markdown: reports/api-drift.md, the console, and
// the GitHub job summary.

const truncate = (v, n = 300) => {
  const s = typeof v === 'string' ? v : JSON.stringify(v);
  return s.length > n ? `${s.slice(0, n)}…` : s;
};

const HOW_TO_FIX = {
  ZERO_MATCH:
    'The endpoint, parameter or schema an overlay edits is gone, renamed, or no longer public. Find its new name in the upstream spec and update the target (move the content with it), or delete the action if the thing really went away.',
  MULTI_MATCH: 'A single-node target now matches several nodes. Make the target more specific.',
  REDUNDANT_FIX:
    'Upstream now declares something a fix in 00-fixes.yaml adds. Plytix fixed it: delete the fix and mark its question answered in overlays/QUESTIONS.md.',
  TYPE_CHANGED:
    'The type of an edited node changed upstream. Check our description and examples still hold, then run `npm run api:accept`.',
  UPSTREAM_CHANGED:
    'Upstream changed a field we override. Maybe Plytix fixed what we patched: compare the new upstream value with ours, keep or drop our override, then run `npm run api:accept`.',
};

export function renderReport(result, { source }) {
  const { drift, filter, coverage } = result;
  const blocking = [...result.errors, ...(drift?.errors ?? [])];
  const lines = [
    '# V3 spec build report',
    '',
    `Source: \`${source}\` · Result: **${result.ok ? 'PASS' : 'FAIL'}**${blocking.length ? ` (${blocking.length} blocking)` : ''}`,
    '',
  ];

  if (filter) {
    const excluded = Object.entries(filter.excluded).map(([k, v]) => `${v.length} ${k}`).join(', ');
    lines.push(
      `Visibility: ${filter.kept.length} public operations published; excluded ${excluded || 'none'}; ${filter.unclassified.length} unclassified. Pruned ${filter.pruned.length} unreachable components.`,
      '',
    );
  }
  if (coverage) {
    const t = coverage.totals;
    lines.push(
      `Coverage: ${t.edited}/${t.operations} operations edited, ${t.description}/${t.operations} described, ${t.cleanOperationId}/${t.operations} clean operationIds, ${t.paramsDescribed}/${t.paramsTotal} params described, ${t.responsesWithExamples}/${t.responsesTotal} responses with examples. Details: \`reports/api-coverage.md\`.`,
      '',
    );
  }

  if (drift?.errors.length) {
    lines.push('## Drift (blocking)', '');
    const byCode = Object.groupBy(drift.errors, (e) => e.code);
    for (const [code, items] of Object.entries(byCode)) {
      lines.push(`### ${code} (${items.length})`, '', HOW_TO_FIX[code], '');
      for (const e of items) {
        if (code === 'UPSTREAM_CHANGED') {
          lines.push(`- \`${e.id}\` at \`${e.node}\` field \`${e.field}\``, `  - was: ${truncate(e.was)}`, `  - now: ${truncate(e.now)}`);
        } else {
          lines.push(`- \`${e.id}\`${e.node ? ` at \`${e.node}\`` : ''}: ${e.detail}`);
        }
      }
      lines.push('');
    }
  }
  if (result.errors.length) {
    lines.push('## Other blocking errors', '', ...result.errors.map((e) => `- ${e}`), '');
  }
  if (drift?.reviewed.length) {
    lines.push('## Accepted upstream changes (this run)', '');
    for (const e of drift.reviewed) lines.push(`- ${e.code} \`${e.id}\`${e.field ? ` field \`${e.field}\`` : ''}`);
    lines.push('');
  }
  if (result.warnings.length) {
    lines.push(`## Warnings (${result.warnings.length})`, '', ...result.warnings.slice(0, 50).map((w) => `- ${w}`));
    if (result.warnings.length > 50) lines.push(`- …and ${result.warnings.length - 50} more`);
    lines.push('');
  }
  if (result.notices.length) {
    lines.push(`## Notices (${result.notices.length})`, '', ...result.notices.slice(0, 100).map((n) => `- ${n}`));
    if (result.notices.length > 100) lines.push(`- …and ${result.notices.length - 100} more`);
    lines.push('');
  }
  return lines.join('\n');
}
