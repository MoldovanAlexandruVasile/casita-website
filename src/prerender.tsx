// Server entry for scripts/prerender.mjs: renders each page to HTML at build
// time, in English, so search engines and link previews get the real content
// instead of an empty <div id="root">. The browser then takes over (main.tsx,
// legal-main.tsx) in the visitor's language.
import "./i18n";

import { StrictMode } from "react";
import { renderToString } from "react-dom/server";

import i18n from "./i18n";
import type { LegalDocumentKind } from "./legal/legalDocument";
import { HomePage } from "./pages/HomePage";
import { LegalPage } from "./pages/LegalPage";

export const renderPage = async (page: "home" | LegalDocumentKind) => {
  await i18n.changeLanguage("en");
  return renderToString(<StrictMode>{page === "home" ? <HomePage /> : <LegalPage kind={page} />}</StrictMode>);
};
