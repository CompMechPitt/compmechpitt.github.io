# Content editing guide

## Facts and review

Use author-approved sources. Do not infer results, affiliations, publication status, dates, or metrics. Keep missing information explicitly labeled as a placeholder. Current entries are sourced to the supplied May 20, 2026 CV; “Present” roles need author confirmation before updating. Omit personal identifiers from page copy.

## Publications

Edit `src/data/publications.json`. Each record has a unique `id`, `title`, `authors` array, `journal`, integer `year`, nullable `doi`, `links` array (`label`, `url`), and `source`. Use a bare DOI such as `10.xxxx/example` only after verification. Keep unknown DOI values `null`; the page labels them pending verification. Do not put unpublished manuscripts in the published list. Project references use publication IDs.

## Projects

Add `src/content/projects/your-slug.md`. Use YAML frontmatter; the initial entries use YAML flow-style mappings. Required fields: `title`, `summary`, `theme`, `methods` (array), and `publications` (publication ID array). Optional `figures` and `videos` default to empty arrays. Markdown below the frontmatter is the project narrative.

Figure entry: `{ "src": "media/example.webp", "alt": "Describe the scientific content", "caption": "Source, permission, and interpretation" }`. Store the file under `public/media/`. Supply dimensions/optimized files when possible. Videos use `{ "src": "media/example.mp4", "title": "Descriptive title", "captions": "media/example.vtt" }`; include meaningful WebVTT captions and a written explanation. Use paths relative to `public/`, without the site base. Do not use invented research figures. The homepage mesh is explicitly conceptual, not data.

## Other pages and documents

Edit `src/pages/about.astro`, `teaching.astro`, `service.astro`, `software.astro`, or `contact.astro`. Keep links base-aware using `import.meta.env.BASE_URL`. Update page title and description where helpful.

Replace the two PDFs in `public/downloads/` independently. The public CV has its referee section removed; do not restore referee contacts. Other personal details and the labeled draft resume were approved by the author for public release. The industry resume is visibly marked DRAFT and should be tailored and approved before removing that label. No numerical achievements were invented.

## Validate and submit

Run `npm run build` then `npm test`. Preview with `npm run preview`; check narrow and wide screens, keyboard focus, navigation, and downloads. Commit to a branch and open a pull request. Deployment occurs on main after merge; do not merge unapproved content. Missing profile links, DOIs, media, and statements should be resolved or intentionally retained as labeled placeholders.
