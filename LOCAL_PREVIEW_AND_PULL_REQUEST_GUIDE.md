---
title: Local Preview and Pull Request Guide
aliases:
  - Portfolio local development
  - Astro localhost guide
tags:
  - portfolio
  - astro
  - localhost
  - git
  - github
created: 2026-10-18
updated: 2026-10-18
---

# Local preview and pull request guide

This note covers the Windows workflow for the `compmechpitt.github.io` Astro portfolio: preview the current site, make a small edit, validate the result, push a review branch, and create a pull request.

> [!summary] Why `http://localhost:4321/` was not working
> `localhost` is not a permanently hosted copy of the website. It responds only while the Astro development or preview server is running in an open terminal. In the affected environment, three independent problems were found:
>
> 1. Node.js was available, but `npm` was not on `PATH`, so the normal startup command could not run.
> 2. The npm scripts used Unix-only `ASTRO_TELEMETRY_DISABLED=1 command` syntax. Windows `cmd.exe`, which npm normally uses for scripts, rejects that syntax. The repository now uses `scripts/run-astro.mjs`, which sets the variable in Node and works on Windows and in GitHub Actions.
> 3. On the `G:` checkout, Vite/Astro could start but failed while loading the content configuration with `require is not defined` and `Content config not loaded`. The same repository and dependencies successfully synchronized content from a clean `C:` copy. This indicates a checkout/filesystem-specific module-loading problem, not an error in `src/content.config.ts`.
> 4. A server started inside a restricted automation or application sandbox may not be reachable from the normal desktop browser. Start it manually in a regular PowerShell window. `localhost` always refers to the network context of the browser opening the link.
>
> Astro can also move from port `4321` to `4322` or another free port. Always open the exact `Local` URL printed in the terminal.

## Repository location

```powershell
Set-Location -LiteralPath 'G:\Job_Application_2026\Github_Personal_WebPortfolio\compmechpitt.github.io'
```

All commands below assume PowerShell and this repository root unless a different location is shown.

## One-time prerequisites

Install these tools in the normal Windows user environment:

- Node.js 24, including npm
- Git
- GitHub CLI (`gh`) if creating the pull request from the terminal; otherwise use the GitHub website

Open a **new** PowerShell window after installing or changing `PATH`, then verify:

```powershell
node --version
npm --version
git --version
gh --version
```

The first three commands must print versions. If `node` works but `npm` does not, repair or reinstall the standard Node.js distribution and reopen PowerShell. A bundled application runtime can expose `node.exe` without supplying npm; that runtime is insufficient for the normal manual workflow.

Install the exact dependencies recorded in `package-lock.json`:

```powershell
npm ci
```

Use `npm ci`, not `npm install`, for routine setup because it reproduces the locked dependency versions and does not rewrite the lockfile.

## Before making a small edit

### 1. Start from the latest `main`

The project requires a fresh review branch for each update.

```powershell
git status --short --branch
git fetch origin --prune
git switch main
git pull --ff-only origin main
git switch -c review/short-description
```

Replace `short-description` with a concise lowercase name such as `fix-publication-link`. If `git status` shows uncommitted work, stop and preserve or commit it on its existing branch before switching branches.

### 2. Start the development server

Run this command yourself in a normal PowerShell window, not in a restricted automation console:

```powershell
npm run dev
```

Keep that terminal open. Wait for output similar to:

```text
astro ready
Local http://localhost:4321/
```

Open the exact printed URL. If Astro reports `4322`, use `http://localhost:4322/`; do not continue using the old `4321` bookmark.

If the link does not open in an application's embedded browser, copy the URL into Edge, Chrome, or Firefox on the same Windows computer where PowerShell is running.

Optionally verify the response from a second PowerShell window:

```powershell
(Invoke-WebRequest -Uri 'http://localhost:4321/' -UseBasicParsing).StatusCode
```

A healthy response prints `200`. Change the port in the command if Astro selected another one. Stop the server with `Ctrl+C` when finished.

### 3. Record the before state

Check the pages affected by the planned edit at both wide and narrow browser widths. For visual changes, capture a screenshot before editing so the comparison is unambiguous. Also check keyboard focus and local links near the edited content.

## If the `G:` checkout produces the Vite/content error

Use a clean, timestamped preview copy on the local `C:` filesystem. The commands below copy the working files, including uncommitted edits, while excluding Git metadata, installed dependencies, generated output, and Astro's cache.

```powershell
$Source = 'G:\Job_Application_2026\Github_Personal_WebPortfolio\compmechpitt.github.io'
$Preview = Join-Path $env:TEMP ("compmechpitt-preview-" + (Get-Date -Format 'yyyyMMdd-HHmmss'))

New-Item -ItemType Directory -Path $Preview | Out-Null
robocopy $Source $Preview /E /XD .git node_modules dist .astro
if ($LASTEXITCODE -ge 8) { throw "robocopy failed with exit code $LASTEXITCODE" }

Set-Location -LiteralPath $Preview
npm ci
npm run dev
```

> [!important]
> Edit the tracked source in the `G:` repository, not the disposable preview folder. After an edit, stop the preview server and run the copy procedure again with a new timestamped folder. This avoids stale files and ensures that the preview matches the source checkout.

If a clean `C:` copy still fails, remove neither the source checkout nor its `.git` directory. Capture the full terminal error and run the diagnostics in [[#Troubleshooting]].

## After making the edit

### 1. Preview the edited page

If the `G:` checkout is healthy, the development server normally refreshes the page automatically. Otherwise, make a new clean `C:` preview copy using the procedure above. Recheck:

- the edited page at desktop and narrow widths;
- navigation, keyboard focus, local links, and downloads affected by the change;
- the browser developer console for errors;
- that the exact terminal URL still responds.

### 2. Run the required validation

From a healthy checkout or clean `C:` preview copy:

```powershell
npm run build
npm test
npm run preview
```

`npm run build` performs Astro/TypeScript/content checks and generates `dist`. `npm test` validates internal links, assets, page landmarks, publication references, and downloads. `npm run preview` serves the production build; open the exact URL it prints and stop it with `Ctrl+C` after the manual check.

### 3. Review only the intended changes

Return to the tracked `G:` repository if validation was performed in a preview copy:

```powershell
Set-Location -LiteralPath 'G:\Job_Application_2026\Github_Personal_WebPortfolio\compmechpitt.github.io'
git status --short
git diff --check
git diff
```

Do not commit `node_modules`, `dist`, `.astro`, temporary screenshots, secrets, or unrelated edits.

## Commit and push

Stage only the intended files, then commit:

```powershell
git add -- path/to/edited-file path/to/another-file
git diff --cached
git commit -m "Describe the portfolio update"
```

Push the current review branch and set its upstream:

```powershell
git push -u origin HEAD
```

If authentication fails, sign in using GitHub CLI (`gh auth login`) or the Git credential flow configured on the computer. Never paste a personal access token into a tracked file.

## Create the pull request

### GitHub CLI method

Confirm the branch and create a PR against `main`:

```powershell
git branch --show-current
gh auth status
gh pr create --base main --head (git branch --show-current) --title "Describe the portfolio update" --body "## Summary`n- Describe the change`n`n## Validation`n- npm run build`n- npm test`n- Manual desktop and narrow-width preview"
```

Open the PR in a browser if desired:

```powershell
gh pr view --web
```

Watch the automated checks:

```powershell
gh pr checks --watch
```

### GitHub website method

After `git push -u origin HEAD`, open the repository on GitHub. Use the **Compare & pull request** banner, confirm that the base is `main` and the compare branch is the new review branch, then enter the same summary and validation notes.

Review the **Files changed** tab before requesting review. Merging to `main` triggers the GitHub Pages deployment, so merge only after the content is approved and checks pass.

## Troubleshooting

### Nothing responds at `localhost:4321`

1. Confirm that the terminal running `npm run dev` is still open.
2. Read the terminal's exact `Local` URL; Astro may have selected another port.
3. Test the selected URL with `Invoke-WebRequest`.
4. Check whether another process owns the port:

```powershell
Get-NetTCPConnection -State Listen -LocalPort 4321
Get-Process -Id (Get-NetTCPConnection -State Listen -LocalPort 4321).OwningProcess
```

Close the owning application normally or use the alternate port printed by Astro. Do not terminate an unfamiliar process solely to reclaim `4321`.

### `npm` is not recognized

```powershell
Get-Command node -All
Get-Command npm -All
$env:PATH -split ';'
```

If npm is missing, install or repair Node.js 24 with npm, reopen PowerShell, and rerun `npm ci`.

### `ASTRO_TELEMETRY_DISABLED` is not recognized

Pull the current branch version of `package.json` and `scripts/run-astro.mjs`. The fixed scripts call Node directly and no longer use Unix-style environment assignment.

### `require is not defined` or `Content config not loaded`

This was reproduced from the `G:` checkout and disappeared in a clean `C:` copy. Use the clean-copy procedure in [[#If the `G:` checkout produces the Vite/content error]]. Do not rewrite `src/content.config.ts` merely to suppress this filesystem-specific symptom.

### Port `4321` is already in use

Use the alternate URL Astro prints, or request a different port explicitly:

```powershell
npm run dev -- --port 4325
```

Then open `http://localhost:4325/` while the server remains running.

## Quick checklist

- [ ] `node --version` and `npm --version` work in a normal PowerShell window.
- [ ] A fresh review branch was created from the latest `main`.
- [ ] The page was inspected before the edit.
- [ ] The edited page was inspected at desktop and narrow widths.
- [ ] `npm run build` passed.
- [ ] `npm test` passed.
- [ ] The production preview was checked at the exact printed URL.
- [ ] Only intended files were staged.
- [ ] The review branch was pushed.
- [ ] The PR targets `main` and includes validation notes.
- [ ] Automated checks passed before merge.

## Related project notes

- [[README]]
- [[CONTENT_GUIDE]]
- [[AGENTS]]
