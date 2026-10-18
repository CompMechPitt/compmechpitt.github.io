---
name: portfolio-local
description: Edit the Astro portfolio in the user's current local checkout; user handles all preview and Git publication. Invoke explicitly for NORMAL mode.
---

# NORMAL — local edits, manual preview and publication

1. Confirm the active working directory is the intended portfolio checkout; review `git status --short --branch`. Do not discard unrelated changes.
2. Convert the task into a short set of acceptance criteria, locate only affected files, and implement a minimal coherent change while following root `AGENTS.md`.
3. Run focused static checks or relevant tests if feasible; do not start a preview server, launch a browser for preview, or take preview screenshots.
4. Do not commit, push, create a PR, merge, deploy, or change remotes. Do not create a worktree unless the user separately requests it.
5. Finish with changed paths, checks (including failures), and succinct commands the user can choose to run for preview and Git publication.

A user's explicit restrictions take precedence. This skill selects NORMAL only for the request where invoked; later independent tasks revert to NORMAL by default.
