// Runs after `vite build`: fills each page's <div id="root"> with its HTML
// (rendered in English by src/prerender.tsx), and writes robots.txt and
// sitemap.xml for the site's address (VITE_SITE_URL in .env).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build, loadEnv } from "vite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrOut = path.join(root, "node_modules/.prerender");

const { VITE_SITE_URL: site } = loadEnv("production", root, "VITE_");
if (!site?.endsWith("/")) throw new Error("Set VITE_SITE_URL in .env, ending with /");

// 1. Bundle the pages for Node (the shared components included, CSS left out).
await build({
  root,
  logLevel: "warn",
  build: { ssr: "src/prerender.tsx", outDir: ssrOut, emptyOutDir: true },
  ssr: { noExternal: ["@moldovanalexandruvasile/unity-marketing"] },
});
const { renderPage } = await import(pathToFileURL(path.join(ssrOut, "prerender.js")).href);

// 2. Put each page's HTML in its file.
const PAGES = { "index.html": "home", "privacy.html": "privacy", "terms.html": "terms" };
for (const [file, page] of Object.entries(PAGES)) {
  const target = path.join(dist, file);
  const html = fs.readFileSync(target, "utf8");
  const marker = '<div id="root"></div>';
  if (!html.includes(marker)) throw new Error(`${file}: no empty #root to fill`);
  fs.writeFileSync(target, html.replace(marker, `<div id="root">${await renderPage(page)}</div>`));
  console.log("prerendered", file);
}

// 3. robots.txt and sitemap.xml. The legal pages are left out while they are
// drafts (they carry <meta name="robots" content="noindex">).
const indexable = Object.keys(PAGES).filter((file) => !fs.readFileSync(path.join(dist, file), "utf8").includes("noindex"));
const today = new Date().toISOString().slice(0, 10);
const urls = indexable.map((file) => `${site}${file === "index.html" ? "" : file}`);
fs.writeFileSync(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((url) => `  <url><loc>${url}</loc><lastmod>${today}</lastmod></url>`)
    .join("\n")}\n</urlset>\n`,
);
fs.writeFileSync(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${site}sitemap.xml\n`);
console.log("wrote sitemap.xml and robots.txt for", site);
fs.rmSync(ssrOut, { recursive: true, force: true });
