# Moldstud — Figma → новая версия сайта

Этот пакет — набор промптов и задач для Codex.

Цель: взять Figma-дизайн как источник новой UI-системы для Moldstud, провести аудит, выделить дизайн-систему, сопоставить макет с реальной структурой сайта и внедрить это в код без декоративной самодеятельности.

Правила работы:
- не фантазировать поверх макета без причины;
- не делать одноразовую вёрстку “по скрину”;
- не ломать существующую бизнес-логику сайта;
- сначала аудит и инвентаризация, потом tokens/components/layout, потом страницы;
- все выводы фиксировать в markdown-файлах внутри репозитория;
- каждый завершённый этап должен иметь проверяемый артефакт.

Порядок запуска:
1. 01_MASTER_PROMPT.md
2. 02_FIGMA_AUDIT_TASK.md
3. 03_UI_INVENTORY_TASK.md
4. 04_DESIGN_SYSTEM_TASK.md
5. 05_MAPPING_AND_GAPS_TASK.md
6. 06_IMPLEMENTATION_TASK.md
7. 07_QA_ACCEPTANCE_TASK.md

Ожидаемые выходы от Codex:
- docs/figma/FIGMA_AUDIT.md
- docs/figma/UI_INVENTORY.md
- docs/figma/DESIGN_TOKENS.md
- docs/figma/COMPONENT_MAPPING.md
- docs/figma/GAP_REPORT.md
- docs/figma/IMPLEMENTATION_PLAN.md
- код новой UI-системы и страниц
- краткий финальный REPORT.md с PASS/FAIL по каждому этапу
