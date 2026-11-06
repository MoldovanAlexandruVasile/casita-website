import { StrictMode, type ReactNode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";

import i18n from "./i18n";

// The page arrives already rendered in English (scripts/prerender.mjs). For an
// English visitor React takes over that HTML as it is; for anyone else it
// renders the page afresh in their language.
export const mount = (page: ReactNode) => {
  const root = document.getElementById("root")!;
  const app = <StrictMode>{page}</StrictMode>;
  if (root.hasChildNodes() && i18n.resolvedLanguage === "en") {
    hydrateRoot(root, app);
  } else {
    createRoot(root).render(app);
  }
};
