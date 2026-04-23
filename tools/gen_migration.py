"""
Generate migration SQL for legacy computer-science articles from payload JSON files.
Produces INSERT ... ON DUPLICATE KEY UPDATE for both Articles and LatestArticles.
"""
import json
import re
from datetime import datetime, timezone
from pathlib import Path


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


def main():
    solutions = Path('d:/MS/Bela/out/solutions')
    payloads = []
    for d in sorted(solutions.iterdir()):
        pf = d / 'article.payload.json'
        if not pf.exists():
            continue
        with open(pf, encoding='utf-8') as f:
            p = json.load(f)
        if p.get('target', {}).get('category_id') == 10002:
            payloads.append(p)

    print(f'Building migration for {len(payloads)} articles...', flush=True)

    now_str = datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S')

    lines = [
        '-- Migration: Import legacy computer-science articles (batch 1)',
        '-- Generated: 2026-04-21',
        f'-- Articles: {len(payloads)} articles in category computer-science (legacy cat 2)',
        '-- Strategy: INSERT ... ON DUPLICATE KEY UPDATE (works on both fresh and production DBs)',
        '',
        'SET NAMES utf8mb4;',
        'SET foreign_key_checks = 0;',
        '',
        "INSERT IGNORE INTO `Categories` (`id`, `parentId`, `name`, `alias`, `createdAt`, `updatedAt`, `description`) VALUES (10001,NULL,'IT careers','it-careers','2026-04-21 17:04:32','2026-04-21 17:04:32','');",
        "INSERT IGNORE INTO `Categories` (`id`, `parentId`, `name`, `alias`, `createdAt`, `updatedAt`, `description`) VALUES (10002,10001,'Computer science','computer-science','2026-04-21 17:04:32','2026-04-21 17:04:32','');",
        '',
    ]

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

    for p in payloads:
        art = p['article']
        tgt = p['target']

        category_id = tgt.get('category_id', 10002)
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
        status = 1  # published
        time_to_read = art.get('time_to_read', 5)
        meta_title = trim_to(art.get('meta_title', title), 255)
        meta_description = art.get('meta_description', '')

        vals = (
            f"{category_id},{author_id},"
            f"'{escape_sql(title)}',"
            f"'{escape_sql(alias)}',"
            f"'{escape_sql(image)}',"
            f"'{escape_sql(intro)}',"
            f"'{escape_sql(content)}',"
            f"{status},{time_to_read},"
            f"'{escape_sql(meta_title)}',"
            f"'{escape_sql(meta_description)}',"
            f"'{published_at}','{published_at}','{now_str}'"
        )

        lines.append(
            f'INSERT INTO `Articles` ({cols}) VALUES ({vals}) '
            f'ON DUPLICATE KEY UPDATE {article_update};'
        )

    lines.append('')

    for p in payloads:
        art = p['article']
        tgt = p['target']

        category_id = tgt.get('category_id', 10002)
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
        status = 1
        time_to_read = art.get('time_to_read', 5)
        meta_title = trim_to(art.get('meta_title', title), 255)
        meta_description = art.get('meta_description', '')

        vals = (
            f"{category_id},{author_id},"
            f"'{escape_sql(title)}',"
            f"'{escape_sql(alias)}',"
            f"'{escape_sql(image)}',"
            f"'{escape_sql(intro)}',"
            f"'{escape_sql(content)}',"
            f"{status},{time_to_read},"
            f"'{escape_sql(meta_title)}',"
            f"'{escape_sql(meta_description)}',"
            f"'{published_at}','{published_at}','{now_str}'"
        )

        lines.append(
            f'INSERT INTO `LatestArticles` ({cols}) VALUES ({vals}) '
            f'ON DUPLICATE KEY UPDATE {latest_update};'
        )

    lines.append('')
    lines.append('SET foreign_key_checks = 1;')
    lines.append('')

    out_path = Path('d:/MS/apps/molds_old/migrations/20260423_legacy_computer_science.sql')
    with open(out_path, 'w', encoding='utf-8', newline='\n') as f:
        f.write('\n'.join(lines))

    art_count = sum(1 for l in lines if l.startswith('INSERT INTO `Articles`'))
    lat_count = sum(1 for l in lines if l.startswith('INSERT INTO `LatestArticles`'))
    print(f'Written to {out_path}')
    print(f'  Articles: {art_count}, LatestArticles: {lat_count}')


if __name__ == '__main__':
    main()
