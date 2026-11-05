import { useTranslation } from "react-i18next";

import { FooterLink } from "./FooterLink";

// Privacy and Terms join these at launch, once the legal texts are final.
export const FooterLinks = () => {
  const { t } = useTranslation();
  return (
    <nav className="flex gap-5">
      <FooterLink href="#features">{t("nav.features")}</FooterLink>
      <FooterLink href="#faq">{t("nav.faq")}</FooterLink>
    </nav>
  );
};
