import { useTranslation } from "react-i18next";

import { LegalBackLink } from "../components/legal/LegalBackLink";
import { LegalHeading } from "../components/legal/LegalHeading";
import { LegalSection } from "../components/legal/LegalSection";
import { OtherLegalLink } from "../components/legal/OtherLegalLink";
import { Container } from "../components/ui/Container";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { currentLanguage } from "../i18n";
import { SiteFooter } from "../layout/SiteFooter";
import { SiteHeader } from "../layout/SiteHeader";
import { legalDocument, type LegalDocumentKind } from "../legal/legalDocument";

type Props = { kind: LegalDocumentKind };

export const LegalPage = ({ kind }: Props) => {
  const { t } = useTranslation();
  const doc = legalDocument(kind, currentLanguage());
  useDocumentTitle(t(kind === "privacy" ? "meta.privacyTitle" : "meta.termsTitle"));

  return (
    <>
      <SiteHeader home="./">
        <OtherLegalLink kind={kind} />
      </SiteHeader>
      <main className="flex-1 pt-12 pb-22">
        <Container isNarrow>
          <LegalBackLink />
          <LegalHeading title={doc.title} updatedLabel={doc.updatedLabel} draftNotice={doc.draftNotice} />
          {doc.sections.map((section) => (
            <LegalSection key={section.title} section={section} />
          ))}
        </Container>
      </main>
      <SiteFooter />
    </>
  );
};
