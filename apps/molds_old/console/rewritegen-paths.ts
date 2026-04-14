import {access} from 'node:fs/promises';
import {resolve} from 'node:path';

async function pathExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

export async function resolveRewritegenSolutionsRoot(): Promise<string> {
  const candidates = [
    process.env.REWRITEGEN_SOLUTIONS_ROOT?.trim(),
    resolve(process.cwd(), '..', '..', 'Bela', 'out', 'solutions'),
    resolve(process.cwd(), '..', '..', 'bela', 'out', 'solutions'),
  ].filter((value): value is string => Boolean(value));

  for (const candidate of candidates) {
    if (await pathExists(candidate)) {
      return candidate;
    }
  }

  throw new Error(
    `Unable to find Rewritegen/Bela solutions directory. Checked:\n${candidates.join('\n')}`,
  );
}
