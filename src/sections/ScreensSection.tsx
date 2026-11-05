import { Container, ScreenshotSlider, Section, SectionTitle } from "@moldovanalexandruvasile/unity-marketing";
import { useTranslation } from "react-i18next";

import { useMediaUrl } from "../hooks/useMediaUrl";

/** The showcase slides, in order (public/media/[ro/]slides/<name>.jpg, made by capture/slides.mjs). */
const SLIDES = [
  "01-plan",
  "02-whats-left",
  "03-safe-pace",
  "04-savings",
  "05-guest-or-account",
  "06-dark-mode"
];

export const ScreensSection = () => {
  const { t } = useTranslation();
  const mediaUrl = useMediaUrl();
  return (
    <Section id="screens" isTinted>
      <Container>
        <SectionTitle>{t("screens.title")}</SectionTitle>
      </Container>
      <ScreenshotSlider
        slides={SLIDES.map((file) => ({ src: mediaUrl(`slides/${file}.jpg`), alt: t(`screens.alt.${file}`) }))}
        labels={{
          region: t("screens.region"),
          previous: t("screens.previous"),
          next: t("screens.next"),
          slideOf: (n, total) => t("screens.slideOf", { n, total }),
          show: (n) => t("screens.show", { n }),
        }}
      />
    </Section>
  );
};
