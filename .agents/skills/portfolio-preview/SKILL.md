---
name: portfolio-preview
description: Edit and preview the Astro portfolio in the user's local environment, iterating to acceptance; user performs Git commits, push, and PR. Invoke explicitly for MEDIUM mode.
---

# MEDIUM — local edit + preview loop; manual Git publication

1. Confirm the chosen workspace really is local; inspect Git status and protect unrelated edits. Identify affected pages and acceptance criteria.
2. Implement a focused change according to root `AGENTS.md`. Check scripts and avoid unnecessary dependency reinstalls.
3. Start or reuse the local Astro dev server using the repository's scripts (commonly `npm run dev`). Inspect the actual affected pages in a browser if browser tooling is available; check desktop/mobile where relevant, routing, links, accessibility, and console/build errors.
4. Iterate edit → inspect → targeted tests/build until acceptance criteria are met or a specific blocker remains. If browser access is unavailable, state that visual preview could not be verified; do not fabricate inspection.
5. Shut down only the preview processes this task started, as appropriate. Do not commit, push, create a PR, merge, deploy, or alter remotes.
6. Report files changed, pages inspected, validations, known gaps, and concise manual Git steps for the user.

Do not switch to a cloud checkout or worktree unless the user expressly requests that environment.
