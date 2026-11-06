// Renders the social card (og.html) to ../public/og-image.jpg, 1200×630 (a JPEG: WhatsApp skips large preview images):
// the picture link previews show for the site (og:image, twitter:image).
// Uses raw/en/home.png, so run `node screens.mjs en` first.
//   node og.mjs
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";

import { fontUrls } from "./app-data.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(HERE, "../public/og-image.jpg");
const TMP = path.join(HERE, ".frames-og.png");

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
await page.goto(pathToFileURL(path.join(HERE, "og.html")).href);
await page.evaluate((f) => window.setFonts(f), fontUrls());
await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => Promise.all([...document.images].map((img) => img.decode().catch(() => {}))));
await page.waitForTimeout(150);
await page.screenshot({ path: TMP });
await browser.close();
// Rendered at 2x for crisp text, then scaled to the 1200×630 the platforms expect.
execFileSync("sips", ["-z", "630", "1200", "-s", "format", "jpeg", "-s", "formatOptions", "86", TMP, "--out", OUT], { stdio: "ignore" });
execFileSync("rm", [TMP]);
console.log("wrote", OUT);
