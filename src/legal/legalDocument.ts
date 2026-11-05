import type { Language } from "../i18n";
import en from "./en.json";
import ro from "./ro.json";
import { updated } from "./updated.json";

// The app's own legal texts, synced from casita-react-native by
// `npm run sync:legal` (src/i18n/locales/<lang>/legal.json there).
export type LegalDocumentKind = "terms" | "privacy";
export type LegalSection = { title: string; body: string };

const CONTENT = { en, ro };

export const LEGAL_UPDATED = new Date(`${updated}T12:00:00`);

export const legalDocument = (kind: LegalDocumentKind, language: Language) => {
  const texts = CONTENT[language];
  return {
    title: texts[kind].title,
    sections: texts[kind].sections as LegalSection[],
    draftNotice: texts.draftNotice,
    updatedLabel: texts.updated,
  };
};
