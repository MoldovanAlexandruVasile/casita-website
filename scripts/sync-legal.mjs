// Copies the app's legal texts (Terms and Conditions, Privacy Policy) and
// their "last updated" date from the casita-react-native repo, so the
// website shows exactly what the app shows.
//   npm run sync:legal            (expects ../casita-react-native next to this repo)
//   npm run sync:legal -- <path>  (or the path to the app repo)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const app = path.resolve(process.argv[2] ?? path.join(root, "../casita-react-native"));
const to = path.join(root, "src/legal");
fs.mkdirSync(to, { recursive: true });

for (const lang of ["en", "ro"]) {
  const source = path.join(app, "src/i18n/locales", lang, "legal.json");
  if (!fs.existsSync(source)) throw new Error(`Not found: ${source}`);
  fs.copyFileSync(source, path.join(to, `${lang}.json`));
  console.log("synced", `${lang}/legal.json`);
}

// LEGAL_LAST_UPDATED = new Date(2026, 9, 22) → "2026-10-22"
const constants = fs.readFileSync(path.join(app, "src/shared/legal/constants/legal.constants.ts"), "utf8");
const match = constants.match(/LEGAL_LAST_UPDATED\s*=\s*new Date\((\d+),\s*(\d+),\s*(\d+)\)/);
if (!match) throw new Error("LEGAL_LAST_UPDATED not found in legal.constants.ts");
const [, y, m, d] = match.map(Number);
const updated = `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
fs.writeFileSync(path.join(to, "updated.json"), JSON.stringify({ updated }, null, 2) + "\n");
console.log("synced last updated:", updated);
