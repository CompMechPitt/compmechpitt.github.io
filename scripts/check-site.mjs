import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { parse } from "yaml";
import assert from "node:assert/strict";
const base = "/";
async function walk(dir) {
  const result = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    result.push(...(entry.isDirectory() ? await walk(p) : [p]));
  }
  return result;
}
const files = await walk("dist");
let links = 0;
for (const file of files.filter((f) => f.endsWith(".html"))) {
  const html = await readFile(file, "utf8");
  assert.match(html, /<html lang="en"/);
  assert.match(html, /<main id="main"/);
  assert.match(html, /<h1[ >]/);
  assert.match(html, /<link rel="canonical"/);
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = match[1];
    if (!url.startsWith("/")) continue;
    assert.ok(url.startsWith(base), `Missing base in ${file}: ${url}`);
    let relative = decodeURIComponent(url.slice(base.length).split(/[?#]/)[0]);
    let target = path.join("dist", relative);
    if (!path.extname(target)) target = path.join(target, "index.html");
    assert.ok((await stat(target)).isFile(), `Broken link ${file}: ${url}`);
    links++;
    if (url.includes("#") && target.endsWith(".html")) {
      const id = url.split("#")[1];
      const destination = await readFile(target, "utf8");
      assert.ok(destination.includes(`id="${id}"`), `Missing anchor ${url}`);
    }
  }
}
const pubs = JSON.parse(await readFile("src/data/publications.json", "utf8"));
assert.equal(new Set(pubs.map((p) => p.id)).size, pubs.length);
for (const pub of pubs) {
  assert.ok(
    pub.authors.length &&
      pub.title &&
      pub.journal &&
      Number.isInteger(pub.year),
  );
  assert.ok(pub.doi === null || /^10\.\d{4,9}\//.test(pub.doi));
}
for (const f of await readdir("src/content/projects")) {
  const text = await readFile(`src/content/projects/${f}`, "utf8");
  const data = parse(text.split("---")[1]);
  for (const id of data.publications)
    assert.ok(
      pubs.some((p) => p.id === id),
      `Unknown publication ${id}`,
    );
}
for (const name of ["ManikBansal-CV.pdf", "ManikBansal-Industry-Resume.pdf"]) {
  const pdf = await readFile(`dist/downloads/${name}`);
  assert.ok(pdf.subarray(0, 5).toString() === "%PDF-");
}
console.log(
  `Passed: ${files.filter((f) => f.endsWith(".html")).length} generated pages, ${links} internal links/assets, ${pubs.length} publications, project references, and two PDF downloads.`,
);
