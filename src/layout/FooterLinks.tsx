import { useTranslation } from "react-i18next";

import { FooterLink } from "./FooterLink";

export const FooterLinks = () => {
  const { t } = useTranslation();
  return (
    <nav className="flex gap-5">
      <FooterLink href="./privacy.html">{t("footer.privacy")}</FooterLink>
      <FooterLink href="./terms.html">{t("footer.terms")}</FooterLink>
      <FooterLink href="./#faq">{t("nav.faq")}</FooterLink>
    </nav>
  );
};
