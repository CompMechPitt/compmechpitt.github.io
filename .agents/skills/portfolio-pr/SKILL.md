---
name: portfolio-pr
description: Implement, preview, validate, commit, and open a dedicated GitHub pull request for the Astro portfolio while leaving merge and deployment to the user. Invoke explicitly for FULL mode.
---

# FULL — automation stops at the pull request

1. Confirm the requested change, correct repository and remotes, `main` base, and current Git status; read root `AGENTS.md` and preserve unrelated edits. Select an isolated task-specific `codex/<short-topic>` branch. An isolated worktree is permitted when useful and explicitly selected in the Codex environment. Do not operate on unrelated branches.
2. Identify minimal affected files and measurable acceptance criteria. Implement with focused reads and reviewable commits, applying the portfolio-specific content guidance from `$personal-web-portfolio` when relevant.
3. Run the preview/edit loop and inspect affected pages in a browser if supported; perform targeted validations plus repository's build/tests as applicable. If visual browser checks are unavailable, report the gap rather than claiming success.
4. Review `git diff` and `git status`; do not include secrets, credentials, generated artifacts, or unrelated edits. Commit only task-related paths.
5. With authenticated GitHub tooling, push **only the feature branch** and open a **new** PR targeting `main`; supply an accurate title, change summary, validation results, and manual review checklist. Verify the resulting PR URL and do not reuse a merged PR.
6. Check CI/PR checks if available, fix introduced failures, and update the same open feature PR as necessary. If a check cannot complete, label the blocker accurately rather than declaring green.
7. Stop after reporting the verified PR URL, branch name, changed files, check results, and any remaining reviewer steps. **Never merge, enable auto-merge, push to `main`, bypass branch protection, or deploy.** Publishing happens only after the user merges and the repository's GitHub Pages workflow runs.

If push/PR authorization is unavailable, leave the local branch and commit in place where possible, and provide precise unblock steps. Do not downgrade security permissions to finish the task.
