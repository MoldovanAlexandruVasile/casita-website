import { useTranslation } from "react-i18next";

import { ScreenshotSlider } from "../components/slider/ScreenshotSlider";
import { Container } from "../components/ui/Container";
import { Section } from "../components/ui/Section";
import { SectionLead } from "../components/ui/SectionLead";
import { SectionTitle } from "../components/ui/SectionTitle";

export const ScreensSection = () => {
  const { t } = useTranslation();
  return (
    <Section id="screens" isTinted>
      <Container>
        <SectionTitle>{t("screens.title")}</SectionTitle>
        <SectionLead>{t("screens.lead")}</SectionLead>
      </Container>
      <ScreenshotSlider />
    </Section>
  );
};
