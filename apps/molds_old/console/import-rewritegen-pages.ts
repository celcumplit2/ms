import {importRewritegenPayloadDirectory} from '@/modules/article/rewritegen-import.service';
import {mkdir, writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';

const REWRITEGEN_SOLUTIONS_ROOT = 'C:\\Zenno\\Rewritegen\\RW\\rewritegen_full\\out\\solutions';
const REPORT_PATH = resolve(process.cwd(), 'docs', 'rewritegen-imported-pages.md');

function buildReport(results: Awaited<ReturnType<typeof importRewritegenPayloadDirectory>>): string {
  const lines = [
    '# Rewritegen Imported Pages',
    '',
    `Imported at: ${new Date().toISOString()}`,
    '',
    `Processed payloads: ${results.length}`,
    '',
    '| Status | Target alias | Matched alias | Source slug | Changed |',
    '| --- | --- | --- | --- | --- |',
    ...results.map((result) => `| \`${result.status}\` | \`${result.targetAlias}\` | \`${result.matchedAlias || ''}\` | \`${result.sourceSlug}\` | \`${String(result.changed)}\` |`),
    '',
  ];

  return lines.join('\n');
}

async function handle() {
  const results = await importRewritegenPayloadDirectory(REWRITEGEN_SOLUTIONS_ROOT);

  await mkdir(resolve(process.cwd(), 'docs'), {recursive: true});
  await writeFile(REPORT_PATH, buildReport(results), 'utf8');

  console.log(`Processed ${results.length} Rewritegen payloads.`);
  results.forEach((result) => {
    const matched = result.matchedAlias ? ` matched=${result.matchedAlias}` : '';

    console.log(`${result.status.toUpperCase()} alias=${result.targetAlias}${matched} source=${result.sourceSlug} changed=${result.changed}`);
  });
}

handle()
  .then(() => {
    process.exit(0);
  })
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  });
