---
name: portfolio-preview
description: Edit, run, and visually inspect the Astro portfolio in the user's local environment while the user retains the Git publication workflow. Invoke explicitly for MEDIUM mode.
---

# MEDIUM — local edit + preview loop; manual Git publication

1. Confirm the chosen workspace is the intended local checkout; read root `AGENTS.md`, inspect Git status, and protect unrelated edits. Identify affected pages and acceptance criteria.
2. Implement a focused change. Apply the portfolio-specific content guidance from `$personal-web-portfolio` when relevant. Check repository scripts and avoid unnecessary dependency reinstalls.
3. Start or reuse the local Astro dev server through the repository's scripts. Verify the exact local URL responds before sharing or inspecting it. Inspect the affected pages in a browser when browser tooling is available; check desktop and narrow widths where relevant, plus routing, links, keyboard use, readable contrast, and console/build errors.
4. Iterate edit → inspect → targeted tests/build until acceptance criteria are met or a specific blocker remains. If browser access is unavailable, state that visual preview could not be verified; do not fabricate inspection.
5. Shut down only preview processes started by this task, when appropriate. Do not commit, push, create a PR, merge, deploy, or alter remotes.
6. Report files changed, pages inspected, validations, known gaps, and concise manual Git steps for the user.

Do not switch to a cloud checkout or worktree unless the user expressly requests that environment.
