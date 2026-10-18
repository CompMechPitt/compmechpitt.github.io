# Codex portfolio workflows — installation & usage

This bundle was prepared from the supplied `AGENTS.md` for `compmechpitt.github.io`. It does **not** install or change files in your Windows repository automatically.

## 1. Install into your local repository

Extract the archive and copy the **contents** into the repository root, preserving these paths:

```text
compmechpitt.github.io/
  AGENTS.md                         ← replace existing after reviewing changes
  CODEX_WORKFLOW_GUIDE.md
  .agents/
    skills/
      portfolio-local/
        SKILL.md
        agents/openai.yaml
      portfolio-preview/
        SKILL.md
        agents/openai.yaml
      portfolio-pr/
        SKILL.md
        agents/openai.yaml
```

Other existing repository files/folders must be left intact. Don't overwrite other `.agents` content. You can keep the guide committed, or keep it only locally; the three skill folders can be committed for reuse in future chats.

Run from the portfolio repo root in PowerShell:

```powershell
Get-Location
git status --short --branch
git diff -- AGENTS.md
Get-ChildItem .agents\skills -Directory | Select-Object Name
```

If skills don't appear in Codex's list, restart the session. `$portfolio-local`, `$portfolio-preview`, and `$portfolio-pr` are the **explicit** invocation names; the bundled `agents/openai.yaml` disables automatic selection.

## 2. How to request each mode (new task = NORMAL unless chosen otherwise)

**NORMAL** (the default):

```text
$portfolio-local Update the homepage research summary using CONTENT_GUIDE.md.
Edit files in my selected local checkout only. Do not preview, commit, push, or open a PR.
```

**MEDIUM**:

```text
$portfolio-preview Improve the mobile navigation and research cards.
Edit locally, start and inspect the preview, iterate until mobile and desktop acceptance criteria pass.
Do not commit, push, or open a PR.
```

**FULL (stop at PR)**:

```text
$portfolio-pr Reorganize my research project cards for accessibility and maintainability.
Implement, validate, visually inspect where supported, create a dedicated branch,
push it, and open a PR against main. Never merge or deploy. Return the PR link.
```

You can also explicitly write `MODE: NORMAL`, `MODE: MEDIUM`, or `MODE: FULL` at the start of a prompt without invoking a skill, but the named skills provide more detailed task-specific instructions.

## 3. Select the right execution environment

- **Normal or Medium:** select **Local** (or `/local` when available) in the Codex app and open the exact Windows portfolio checkout. A cloud task cannot automatically modify that folder. If working from PowerShell, open that directory before starting `codex`.
- **Full:** use a dedicated branch. In the desktop app, a **Worktree** (`/worktree`, when available) is useful for parallel tasks and avoiding interference with your regular local checkout. It is optional, not a token-saving requirement. To inspect edits in the original checkout, hand off the worktree to Local when appropriate.
- Never assume a worktree's edits appear in your original checkout before handoff/merge. Generated folders such as `node_modules` are generally ignored and need to be installed within a fresh worktree if previewing there.

## 4. Keep context and token usage small

1. Prefer one bounded task per chat; start a **new chat** when moving to an unrelated feature or after a long debugging history. Use `/compact` if keeping a long active chat is important. Use `/status` to observe current context usage.
2. Scope searches to `src/`, `public/`, or named files; use targeted `rg` instead of `Get-ChildItem -Recurse` dumps or reading every file.
3. Keep `AGENTS.md` short and stable; read `CONTENT_GUIDE.md` only for content tasks. Skills load detailed instructions when selected, instead of embedding three long playbooks in every task.
4. Avoid global graph generation (Graphify/dependency graphs) for a simple change. Use a graph only if cross-module dependencies are genuinely difficult to trace, then reuse a compact, current summary rather than repeatedly injecting the entire output.
5. Do not request complete build logs or full dependency trees on every turn. Return errors plus useful surrounding lines; run tests on changed components first, broad checks before PR.
6. Avoid large generated snapshots (`dist`, `.astro`, `node_modules`) in context, diffs, or commits. Keep `.gitignore` current.
7. Prefer acceptance criteria and file ownership hints over long narrative prompts. Example: `Edit src/pages/index.astro and the existing project-card component; leave header/footer untouched.`
8. Do not repeatedly attach the same CV/PDF/screenshots if unchanged. Reference known local source files and quote only the relevant factual excerpt when needed.
9. If task validation fails, ask Codex to show concise diagnostics and fix only failures caused by this task. Avoid repeated `npm ci` unless needed.
10. Do not confuse cached input tokens with entirely new context. Cumulative token accounting may be large over a lengthy conversation even when most input has been cached.

## 5. Manually inspect and publish after NORMAL/MEDIUM

```powershell
# Inside compmechpitt.github.io
git status --short --branch
npm run build             # if the script exists
npm test                  # if the script exists
npm run dev               # preview manually; usually http://localhost:4321
# Stop the dev server with Ctrl+C after inspection.

# If still on main and your work belongs in a new PR, make a local feature branch first:
git switch -c feat/my-portfolio-change

git add -A
git diff --cached --check
git diff --cached --stat
git commit -m "Improve portfolio content and layout"
git push -u origin feat/my-portfolio-change
# If GitHub CLI is installed and authenticated:
gh pr create --base main --head feat/my-portfolio-change --fill
```

Inspect staged changes before `git add -A` / commit; do not commit unrelated local edits. If you already have a topic branch, use it instead of creating another. The sample branch name and commit title are placeholders to customize.

For the FULL mode, Codex performs the branch/commit/push/PR operations *only if it has an authenticated GitHub path*. You always perform the PR review and merge; keep `main` protected by a rule requiring pull requests and required CI checks. GitHub Pages deploys through the configured workflow after your merge.

## 6. Recommended task report format

```text
Mode: NORMAL | MEDIUM | FULL
Changed: <file paths only>
Checked: <commands and pass/fail>
Preview: <user-owned | inspected pages | unavailable>
Git: <no remote actions | branch + PR URL>
Next: <1–3 concrete actions for the user>
```

## Sources for the current Codex interface

- https://learn.chatgpt.com/docs/agent-configuration/agents-md
- https://learn.chatgpt.com/docs/build-skills
- https://learn.chatgpt.com/docs/developer-commands
- https://learn.chatgpt.com/docs/environments/git-worktrees
