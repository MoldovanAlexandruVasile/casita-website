# Casita website

Presentation page for Casita, the household budgeting app for iPhone and
Android. For now it only announces the app as **coming soon**: no download or
store links anywhere. React + TypeScript + Vite + Tailwind CSS v4, deployed to
GitHub Pages. Same setup as `tivren-website`.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run lint
```

## Deploy

Pushing to `main` builds and publishes the site
(`.github/workflows/deploy.yml`). One-time setup on GitHub: Settings → Pages →
Source: **GitHub Actions**.

## At launch

- Replace the "Coming soon" placeholders (`components/StoreSoon*.tsx`, the
  header's `SoonBadge`) with App Store / Google Play links.
- Add the Privacy policy and Terms pages once the app's legal texts are final
  (they still have placeholders in `casita-react-native/src/i18n/locales/*/legal.json`).
- Optionally swap the drawn screens for real device screenshots.

## Languages

English and Romanian, with react-i18next. Site text lives in
`src/i18n/locales/{en,ro}.json` (same keys in both). Visitors get their
browser's language (Romanian for any `ro-*`, English otherwise) until they pick
one from the RO / EN menu; that choice is remembered.

## Styling

`src/index.css` holds the theme: the app's greens (from
`casita-react-native/src/theme/constants/color-tokens.ts`) as Tailwind colours,
with dark-mode values, and Plus Jakarta Sans, the app's heading font.

## Screens, showcase slides and promo video

Everything in `public/media` (and the full-size slides in `marketing/slides`,
2880×1800) is made by `capture/`. The app isn't built for this: its screens
are **drawn from its own code**. `capture/screens.html` lays out Home,
Insights, Savings, the monthly Plan and Settings with the same spacing, radii,
fonts and colours as the app's components (`makeStyles`), and `app-data.mjs`
reads the theme colours, the EN/RO translations and the Hugeicons straight
from `../casita-react-native`. The demo data (Ana's household, in euros, or
lei for Romanian) lives at the top of `screens.html`. Screens come signed in
(Ana Popescu) and as a guest.

```bash
cd capture
npm install && npx playwright install chromium
node screens.mjs en   # app screens, 1206×2622 (iPhone 17 Pro) → raw/en/ + card positions
node slides.mjs en    # showcase slides (slides.html) → marketing/slides/en + public/media/slides
node promo.mjs en     # ~30 s promo (promo.html) → public/media/promo.mp4 + poster
```

Romanian: the same with `ro` (into `public/media/ro/`). The hero's phone shows
`raw/<lang>/home.png` and `home-dark.png` as JPEGs in `public/media/[ro/]app/`
(`sips -Z 1960 -s format jpeg`). `promo.mjs en 3 10.2` renders stills at those
seconds instead, for checking a change. The video is encoded with AVFoundation
(`encode.swift`), so it needs macOS but no ffmpeg. After a UI change in the app,
re-check `screens.html` against the changed components, then re-run all three.
