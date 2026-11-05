// Renders the showcase slides (slides.html) to ../marketing/slides/<lang>/*.png
// at 2880×1800, from the screens made by screens.mjs, plus 1600px JPEGs for
// the website in ../public/media/[ro/]slides.
//   node slides.mjs [lang] [index]     (en or ro; default en)
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";

import { fontUrls } from "./app-data.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const LANG = process.argv[2] ?? "en";
const OUT = path.resolve(HERE, "../marketing/slides", LANG);
const WEB = path.resolve(HERE, "../public/media", LANG === "en" ? "" : LANG, "slides");
const crops = JSON.parse(fs.readFileSync(path.join(HERE, "raw", LANG, "crops.json"), "utf8"));
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(WEB, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await page.goto(`${pathToFileURL(path.join(HERE, "slides.html")).href}?lang=${LANG}`);
await page.evaluate((f) => window.setFonts(f), fontUrls());

const count = await page.evaluate(() => window.SLIDE_COUNT);
const only = process.argv[3];
for (let i = 0; i < count; i++) {
  if (only !== undefined && String(i) !== only) continue;
  const name = await page.evaluate(([i, crops]) => window.render(i, crops), [i, crops]);
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => Promise.all([...document.images].map((img) => img.decode().catch(() => {}))));
  await page.waitForTimeout(150);
  const png = path.join(OUT, `${name}.png`);
  await page.screenshot({ path: png });
  execFileSync("sips", ["-Z", "1600", "-s", "format", "jpeg", "-s", "formatOptions", "82", png, "--out", path.join(WEB, `${name}.jpg`)], { stdio: "ignore" });
  console.log("slide", LANG, name);
}
await browser.close();
