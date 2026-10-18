---
name: portfolio-pr
description: Implement, preview, validate, commit, push a dedicated branch, and create a GitHub PR for the Astro portfolio; user reviews and merges. Invoke explicitly for FULL mode.
---

# FULL — automation stops at the pull request

1. Confirm the requested change, the correct repository/remotes, `main` base, and current Git status. Preserve unrelated edits. Select an isolated task-specific `codex/<short-topic>` branch; an isolated worktree is permitted when useful and explicitly selected in the Codex environment. Do not operate on unrelated branches.
2. Identify minimal affected files and measurable acceptance criteria. Implement according to root `AGENTS.md` with focused reads and reviewable commits.
3. Run the preview/edit loop and inspect affected pages in a browser if supported; perform targeted validations plus repository's build/tests as applicable. If visual browser checks are unavailable, report the gap rather than claiming success.
4. Review `git diff` and `git status`; do not include secrets, credentials, generated artifacts, or unrelated edits. Commit only task-related paths.
5. With authenticated GitHub tooling, push **only the feature branch** and open a **new** PR targeting `main`; supply an accurate title, change summary, validation, and manual review checklist. Do not reuse a merged PR.
6. Check CI/PR checks if available, fix introduced failures, and update the same open feature PR as necessary. If a check cannot complete, label the blocker accurately rather than declaring green.
7. Stop after reporting the verified PR URL, branch name, changed files, check results, and any remaining reviewer steps. **Never merge, enable auto-merge, push to `main`, bypass branch protection, or deploy.** Publishing happens only after the user merges and the repository's GitHub Pages workflow runs.

If push/PR authorization is unavailable, leave the local branch and commit in place where possible, and provide precise unblock steps. Do not downgrade security permissions to finish the task.
