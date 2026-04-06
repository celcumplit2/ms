import {
  collectRewritegenPayloadFiles,
  importRewritegenPayloadDirectory,
  importRewritegenPayloadFile,
  RewritegenImportResult,
} from '@/modules/article/rewritegen-import.service';
import {access, stat} from 'node:fs/promises';
import {resolve} from 'node:path';

type CliOptions = {
  dryRun: boolean;
  targetPath: string;
};

function parseArgs(argv: string[]): CliOptions {
  const options: CliOptions = {
    dryRun: false,
    targetPath: '',
  };

  for (const arg of argv) {
    if (arg === '--dry-run') {
      options.dryRun = true;
      continue;
    }
    if (!options.targetPath) {
      options.targetPath = arg;
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }

  if (!options.targetPath) {
    throw new Error('Usage: tsx console/import-rewritegen-payload.ts <payload-file-or-solutions-dir> [--dry-run]');
  }

  return options;
}

function printResult(result: RewritegenImportResult) {
  const matched = result.matchedAlias ? ` matched=${result.matchedAlias}` : '';

  console.log(`${result.status.toUpperCase()} alias=${result.targetAlias}${matched} source=${result.sourceSlug} changed=${result.changed}`);
}

async function pathExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);

    return true;
  } catch {
    return false;
  }
}

async function importFromDirectory(targetPath: string, dryRun: boolean): Promise<void> {
  const files = await collectRewritegenPayloadFiles(targetPath);
  const missingFiles = files.filter((filePath) => !filePath.endsWith('article.payload.json'));

  if (missingFiles.length > 0) {
    throw new Error(`Unexpected payload paths in ${targetPath}`);
  }

  const absent = [];
  for (const filePath of files) {
    if (!(await pathExists(filePath))) {
      absent.push(filePath);
    }
  }
  if (absent.length > 0) {
    throw new Error(`Missing payload files:\n${absent.join('\n')}`);
  }

  const results = await importRewritegenPayloadDirectory(targetPath, {dryRun});
  results.forEach(printResult);
  console.log(`Processed ${results.length} payload(s).`);
}

async function handle() {
  const options = parseArgs(process.argv.slice(2));
  const targetPath = resolve(options.targetPath);
  const stats = await stat(targetPath);

  if (stats.isDirectory()) {
    const directPayload = resolve(targetPath, 'article.payload.json');
    if (await pathExists(directPayload)) {
      printResult(await importRewritegenPayloadFile(directPayload, {dryRun: options.dryRun}));
      console.log('Processed 1 payload.');
      return;
    }

    await importFromDirectory(targetPath, options.dryRun);
    return;
  }

  printResult(await importRewritegenPayloadFile(targetPath, {dryRun: options.dryRun}));
  console.log('Processed 1 payload.');
}

handle()
  .then(() => {
    process.exit(0);
  })
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  });
