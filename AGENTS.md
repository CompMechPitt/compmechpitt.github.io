# Portfolio repository — Codex instructions

## Scope and source of truth
- This is the `compmechpitt.github.io` Astro portfolio: static output, strict TypeScript, Markdown content collections, Node 24 in CI.
- Work in the selected local repository/checkout. A Codex cloud environment is a separate checkout and does **not** automatically edit this Windows folder.
- Inspect `git status --short --branch` before changes; preserve existing unrelated work and never discard user edits.
- For factual research/biographical edits, read the relevant section of `CONTENT_GUIDE.md` and the supplied source. Never invent publications, affiliations, dates, awards, metrics, or research results; mark unknown facts clearly. The supplied CV is dated 2026-05-20: do not assume ongoing roles have changed.
- Preserve `COPYRIGHT.md` terms and existing attribution. Do not add third-party assets without suitable licensing.

## Skill and workflow selection (mandatory)
- The canonical portfolio skills are installed globally in `%CODEX_HOME%\skills`; do not keep duplicate copies under this repository. For every task in this repository, use `$personal-web-portfolio` automatically when it is available, plus exactly one workflow skill selected from the requested outcome below. If a global skill is unavailable, follow the equivalent rules in this file directly.
- **NORMAL / `$portfolio-local` — default:** select automatically for local edits, diagnostics, or static validation when the request does not require browser preview or remote Git actions. An explicit NORMAL, local-only, no-preview, no-commit, or no-push instruction also selects this mode.
- **MEDIUM / `$portfolio-preview`:** select automatically when the user asks to start or reuse a local preview, inspect a page in a browser, perform responsive/visual QA, or iterate through an edit-preview loop. An explicit MEDIUM or `$portfolio-preview` instruction also selects this mode.
- **FULL / `$portfolio-pr`:** select only when the user explicitly asks to commit and push a branch or open a pull request, or explicitly names FULL / `$portfolio-pr`. Task complexity alone never authorizes remote Git mutations.
- A user-named workflow mode wins over automatic routing. If requirements conflict or a consequential remote action remains unclear, use NORMAL and ask before that action. A user's explicit no-preview/no-commit/no-push/no-PR restriction always wins.
- **NORMAL — local edit / user previews and publishes:** Codex searches and edits files in the selected local checkout, and may run focused static checks/tests. Codex must NOT launch or inspect a preview, commit, push, create a PR, merge, or deploy. Leave edits available for user review and manual commands.
- **MEDIUM — local preview/edit loop / user publishes:** Codex edits locally, starts the development preview, inspects relevant pages when browser inspection is available, iterates until the specified acceptance criteria pass, and runs appropriate checks. Codex must NOT commit, push, create a PR, merge, or deploy. User performs the remote Git workflow.
- **FULL — automated through PR / user merges:** Codex implements and validates, runs the preview/edit loop where tooling permits, creates a task-specific branch/commit, pushes only that branch, and opens a new PR against `main` when GitHub access is configured. Address failures caused by the changes, then report PR URL and check status. **Never merge, enable auto-merge, push to `main`, or deploy.** Stop and report blockers if authentication, tooling, or permissions are missing; do not claim the PR exists without verification.

## Code organization and editing
- Before editing, locate the smallest owning page, component, layout, collection, style, or configuration file. Use targeted filename search and `rg`; do not dump the repository or generate a dependency graph by default.
- Keep page composition in existing `src/pages`, shared UI in `src/components`/`src/layouts` **when those folders exist**, reusable data in existing content collections, and static assets in `public` as appropriate. Prefer the repository's established conventions over inventing a parallel structure.
- Make the smallest coherent change; reuse components/styles/utilities rather than duplicating markup or logic. Extract abstractions only when actually reused or when complexity warrants them.
- Keep types strict; avoid `any`, unsafe casts, broad catch-all changes, dependency churn, and unrelated reformats. Keep diffs reviewable and do not edit generated `dist/`, `.astro/`, or `node_modules/`.
- Preserve internal URL and asset behavior under `import.meta.env.BASE_URL` (including GitHub Pages); check any routing/base-path changes.
- Maintain accessible semantic headings, focus indicators, meaningful alt text, keyboard navigation, mobile responsiveness, and readable contrast.

## Validation, context, and reporting
- Check `package.json` scripts before running commands. Run targeted checks first; use `npm run build` and `npm test` when supported/appropriate, and broader validation before FULL-mode PR creation. Use `npm ci` when dependencies are absent or the lockfile/install state requires it, not automatically for every small task. Report unavailable commands honestly.
- Read only relevant files/sections; prefer bounded `rg -n`, `git diff -- <paths>`, and narrow test output. Exclude `.git`, `node_modules`, `dist`, and `.astro` from searches. Do not rebuild a global code graph or repeatedly reread unchanged large files unless the task warrants it.
- For each finished task, briefly report changed paths, validation/results, preview state (if applicable), Git/PR actions actually taken, and remaining manual steps. Never describe an uninspected preview as visually verified.
- Use the selected global workflow skill for its detailed procedure. Never let a skill override the current user's explicit restrictions or the no-merge/no-deploy boundary in this file.
