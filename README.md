# Manik Bansal · Research portfolio

Astro + TypeScript static research portfolio for faculty and computational engineering applications. No analytics, external fonts, client-side framework, or credentials required.

## Develop

Use Node 24 and npm. From the repository root:

```sh
npm ci
npm run dev
npm run build
npm test
npm run preview
```

If the cloud machine has an unwritable default npm cache, use `npm ci --cache /tmp/manik-npm-cache`.

`build` runs Astro’s TypeScript/content checks and production generation. `test` checks generated internal links, assets, page landmarks, project publication references, and downloads. Browser keyboard, screen-reader, and visual checks remain recommended before release.

## Content

See [CONTENT_GUIDE.md](CONTENT_GUIDE.md). The main navigation shows Home, About, Research, Publications, Software & Tools, Teaching, Awards & Service, and Contact in a horizontal row. Research includes the project overview, and About includes the CV and resume downloads. The old `/projects/` and `/cv/` URLs remain as signposts. Facts derive from the supplied CV (May 20, 2026) and user-provided research themes. Missing DOIs, media, and future research details are explicitly labeled. The industry resume is a draft, not an approved application document.

The downloadable CV has its referee section removed. Remaining personal details and the visibly labeled draft industry resume were approved by the author for public release.

## GitHub Pages

The repository `CompMechPitt/compmechpitt.github.io` is an organization Pages site at `https://compmechpitt.github.io/`. `astro.config.mjs` sets this origin and uses the root base path (`/`). Update the configuration if moving to a custom domain or project site.

In GitHub Settings → Pages, select **GitHub Actions** as the source. Pull requests run build and link checks without deployment. Pushes/merges to `main` build and deploy using the official Pages actions. Protect `main` with required reviews and the build check if desired. No token secrets are needed beyond GitHub’s built-in job token.

This branch has not been merged or published. Review facts, placeholders, and downloads before merging. Environment publication is separate from website deployment.

## Structure

- `src/pages/`: routes and page copy
- `src/content/projects/`: schema-validated Markdown case studies
- `src/data/publications.json`: structured bibliographic records
- `src/layouts/`, `src/styles/`: shared navigation, metadata, and responsive design
- `public/downloads/`: separate CV and draft industry resume PDFs
- `.github/workflows/deploy.yml`: PR validation and main deployment
- `.agents/skills/personal-web-portfolio/`: repo-specific Codex guidance for maintaining this site

Copyright remains governed by COPYRIGHT.md.
