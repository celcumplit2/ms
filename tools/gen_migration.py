"""
Generate migration SQL for rewritegen payloads.
Produces INSERT ... ON DUPLICATE KEY UPDATE for both Articles and LatestArticles.

Usage:
  py gen_migration.py                          # all categories
  py gen_migration.py --category-id 10057      # one category (repeatable)
  py gen_migration.py --out migrations/my.sql  # custom output path
"""
import argparse
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

SOLUTIONS_DIR = Path('d:/MS/Bela/out/solutions')
MIGRATIONS_DIR = Path('d:/MS/apps/molds_old/migrations')


def escape_sql(s: str) -> str:
    s = s.replace("\\", "\\\\")
    s = s.replace("'", "\\'")
    s = s.replace("\r", "\\r")
    s = s.replace("\n", "\\n")
    s = s.replace("\x00", "\\0")
    return s


def strip_payload_scripts(html: str) -> str:
    html = re.sub(r'<script\b[^>]*id=["\']payloadCharts["\'][\s\S]*?</script>', '', html, flags=re.IGNORECASE)
    html = re.sub(r'<script\b[^>]*id=["\']runMeta["\'][\s\S]*?</script>', '', html, flags=re.IGNORECASE)
    return html.strip()


def render_json_script(id_: str, payload) -> str:
    content = json.dumps(payload, ensure_ascii=False).replace('</script', '<\\/script')
    return f'<script type="application/json" id="{id_}">{content}</script>'


def build_stored_content(payload: dict) -> str:
    parts = [strip_payload_scripts(payload['article']['article_body_html'])]
    runtime = payload.get('runtime', {})
    if runtime.get('payload_charts'):
        parts.append(render_json_script('payloadCharts', runtime['payload_charts']))
    if runtime.get('run_meta') and runtime['run_meta']:
        parts.append(render_json_script('runMeta', runtime['run_meta']))
    return '\n\n'.join(p for p in parts if p)


def trim_to(s: str, n: int) -> str:
    return (s or '')[:n]


def load_payloads(category_ids: set) -> list:
    payloads = []
    for d in sorted(SOLUTIONS_DIR.iterdir()):
        pf = d / 'article.payload.json'
        if not pf.exists():
            continue
        try:
            p = json.loads(pf.read_text(encoding='utf-8'))
        except Exception as e:
            print(f'  SKIP {d.name}: {e}', file=sys.stderr)
            continue
        cat_id = p.get('target', {}).get('category_id')
        if category_ids and cat_id not in category_ids:
            continue
        payloads.append(p)
    return payloads


def build_article_values(p: dict, now_str: str) -> str:
    art = p['article']
    tgt = p['target']
    category_id = tgt.get('category_id', 1)
    author_id = tgt.get('author_id', 1)
    alias = tgt.get('alias', '')
    published_at_raw = tgt.get('published_at', '')
    try:
        published_at = (
            datetime.fromisoformat(published_at_raw.replace('Z', '+00:00'))
            .strftime('%Y-%m-%d %H:%M:%S')
        ) if published_at_raw else now_str
    except Exception:
        published_at = now_str
    title = trim_to(art.get('title', ''), 255)
    image = art.get('image', '')
    intro = art.get('intro', '')
    content = build_stored_content(p)
    time_to_read = art.get('time_to_read', 5)
    meta_title = trim_to(art.get('meta_title', title), 255)
    meta_description = art.get('meta_description', '')
    return (
        f"{category_id},{author_id},"
        f"'{escape_sql(title)}',"
        f"'{escape_sql(alias)}',"
        f"'{escape_sql(image)}',"
        f"'{escape_sql(intro)}',"
        f"'{escape_sql(content)}',"
        f"1,{time_to_read},"
        f"'{escape_sql(meta_title)}',"
        f"'{escape_sql(meta_description)}',"
        f"'{published_at}','{published_at}','{now_str}'"
    )


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--category-id', type=int, action='append', dest='category_ids', metavar='ID',
                    help='molds_old category id (10000+legacy). Repeatable. Default: all.')
    ap.add_argument('--out', type=Path, default=None,
                    help='Output SQL file path. Default: auto-named in migrations/')
    args = ap.parse_args()

    category_ids = set(args.category_ids) if args.category_ids else set()

    print(f'Loading payloads from {SOLUTIONS_DIR}...', flush=True)
    payloads = load_payloads(category_ids)
    print(f'  {len(payloads)} payloads matched', flush=True)

    if not payloads:
        print('Nothing to generate.', file=sys.stderr)
        sys.exit(1)

    now_str = datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S')
    date_tag = datetime.now(timezone.utc).strftime('%Y%m%d')

    # Collect unique categories
    cats_seen = {}
    for p in payloads:
        tgt = p.get('target', {})
        cat_id = tgt.get('category_id')
        if cat_id and cat_id not in cats_seen:
            cats_seen[cat_id] = tgt.get('category_alias', str(cat_id))

    cat_label = '_'.join(sorted(str(c) for c in cats_seen)) if len(cats_seen) <= 3 else f'{len(cats_seen)}cats'
    out_path = args.out or (MIGRATIONS_DIR / f'{date_tag}_rewritegen_{cat_label}.sql')

    cols = '`categoryId`, `authorId`, `title`, `alias`, `image`, `intro`, `content`, `status`, `timeToRead`, `metaTitle`, `metaDescription`, `publishedAt`, `createdAt`, `updatedAt`'
    article_update = (
        'title=VALUES(`title`), image=VALUES(`image`), intro=VALUES(`intro`), '
        'content=VALUES(`content`), timeToRead=VALUES(`timeToRead`), '
        'metaTitle=VALUES(`metaTitle`), metaDescription=VALUES(`metaDescription`), '
        'updatedAt=NOW()'
    )
    latest_update = (
        'categoryId=VALUES(`categoryId`), authorId=VALUES(`authorId`), '
        'title=VALUES(`title`), image=VALUES(`image`), intro=VALUES(`intro`), '
        'content=VALUES(`content`), status=VALUES(`status`), timeToRead=VALUES(`timeToRead`), '
        'metaTitle=VALUES(`metaTitle`), metaDescription=VALUES(`metaDescription`), '
        'publishedAt=VALUES(`publishedAt`), updatedAt=NOW()'
    )

    lines = [
        f'-- Migration: rewritegen articles',
        f'-- Generated: {now_str}',
        f'-- Articles: {len(payloads)} payloads, categories: {list(cats_seen.keys())}',
        '-- Strategy: INSERT ... ON DUPLICATE KEY UPDATE (safe on both fresh and production DBs)',
        '',
        'SET NAMES utf8mb4;',
        'SET foreign_key_checks = 0;',
        '',
    ]

    # Category INSERT IGNORE rows (need category metadata)
    # Load from SQL dump if available
    _inject_category_rows(lines, list(cats_seen.keys()))
    lines.append('')

    for p in payloads:
        vals = build_article_values(p, now_str)
        lines.append(f'INSERT INTO `Articles` ({cols}) VALUES ({vals}) ON DUPLICATE KEY UPDATE {article_update};')

    lines.append('')

    for p in payloads:
        vals = build_article_values(p, now_str)
        lines.append(f'INSERT INTO `LatestArticles` ({cols}) VALUES ({vals}) ON DUPLICATE KEY UPDATE {latest_update};')

    lines.append('')
    lines.append('SET foreign_key_checks = 1;')
    lines.append('')

    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text('\n'.join(lines), encoding='utf-8', newline='\n' if hasattr(out_path, 'write_text') else None)

    art_count = sum(1 for l in lines if l.startswith('INSERT INTO `Articles`'))
    lat_count = sum(1 for l in lines if l.startswith('INSERT INTO `LatestArticles`'))
    print(f'Written: {out_path}')
    print(f'  Articles inserts: {art_count}')
    print(f'  LatestArticles inserts: {lat_count}')


def _inject_category_rows(lines: list, cat_ids: list):
    """Inject INSERT IGNORE for each category, reading from the SQL dump."""
    import re as _re
    sql_dump = Path('d:/MS/bd/202604030500.moldstud.sql')
    if not sql_dump.exists():
        return

    CAT_INSERT_RE = _re.compile(r"INSERT INTO `Categories` VALUES\s*$", _re.IGNORECASE)
    CAT_ROW_RE = _re.compile(r"^\((\d+),(NULL|\d+),'((?:[^'\\]|\\.)*)','((?:[^'\\]|\\.)*)',(.*)", _re.DOTALL)

    legacy_cats = {}
    in_block = False
    with sql_dump.open(encoding='utf-8', errors='replace') as fh:
        for raw_line in fh:
            line = raw_line.rstrip('\r\n')
            if CAT_INSERT_RE.match(line):
                in_block = True
                continue
            if not in_block:
                continue
            stripped = line.strip()
            if not stripped or stripped == ';':
                in_block = False
                continue
            if not stripped.startswith('('):
                in_block = False
                continue
            m = CAT_ROW_RE.match(stripped)
            if m:
                legacy_cats[int(m.group(1))] = {
                    'parentId': None if m.group(2) == 'NULL' else int(m.group(2)),
                    'name': m.group(3).replace("\\'", "'"),
                    'alias': m.group(4).replace("\\'", "'"),
                }

    now_str = datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S')

    # Ensure parent categories are inserted first
    def _emit(cat_molds_id: int, emitted: set):
        legacy_id = cat_molds_id - 10000
        info = legacy_cats.get(legacy_id)
        if not info:
            return
        parent_legacy = info['parentId']
        parent_molds = (parent_legacy + 10000) if parent_legacy else 'NULL'
        if isinstance(parent_molds, int) and parent_molds not in emitted:
            _emit(parent_molds, emitted)
        if cat_molds_id in emitted:
            return
        emitted.add(cat_molds_id)
        name = escape_sql(info['name'])
        alias = escape_sql(info['alias'])
        parent_val = parent_molds if parent_molds == 'NULL' else str(parent_molds)
        lines.append(
            f"INSERT IGNORE INTO `Categories` (`id`, `parentId`, `name`, `alias`, `createdAt`, `updatedAt`, `description`) "
            f"VALUES ({cat_molds_id},{parent_val},'{name}','{alias}','{now_str}','{now_str}','');"
        )

    emitted: set = set()
    for cat_molds_id in sorted(cat_ids):
        _emit(cat_molds_id, emitted)


if __name__ == '__main__':
    main()
