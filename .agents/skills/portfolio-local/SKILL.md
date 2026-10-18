---
name: portfolio-local
description: Edit and statically validate the Astro portfolio in the user's current local checkout while the user handles preview and Git publication. Invoke explicitly for NORMAL mode.
---

# NORMAL — local edits, manual preview and publication

1. Confirm the active working directory is the intended portfolio checkout; read root `AGENTS.md` and review `git status --short --branch`. Do not discard unrelated changes.
2. Identify the acceptance criteria and affected files, then implement a minimal coherent change. Apply the portfolio-specific content guidance from `$personal-web-portfolio` when relevant.
3. Run focused static checks or relevant tests if feasible; do not start a preview server, launch a browser for preview, or take preview screenshots.
4. Do not commit, push, create a PR, merge, deploy, or change remotes. Do not create a worktree unless the user separately requests it.
5. Finish with changed paths, checks (including failures), preview status, and succinct optional commands for the user's manual preview or Git workflow.

A user's explicit restrictions take precedence. This skill selects NORMAL only for the request where invoked; later independent tasks revert to NORMAL by default.
