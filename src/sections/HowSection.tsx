import { useTranslation } from "react-i18next";

import { Card } from "../components/ui/Card";
import { CardText } from "../components/ui/CardText";
import { CardTitle } from "../components/ui/CardTitle";
import { Container } from "../components/ui/Container";
import { Section } from "../components/ui/Section";
import { SectionLead } from "../components/ui/SectionLead";
import { SectionTitle } from "../components/ui/SectionTitle";
import { StepNumber } from "../components/ui/StepNumber";

type Step = { title: string; text: string };

// Plan → spend → look back: the month in Casita, in three cards.
export const HowSection = () => {
  const { t } = useTranslation();
  const steps = t("how.steps", { returnObjects: true }) as Step[];
  return (
    <Section id="how" isTinted>
      <Container>
        <SectionTitle>{t("how.title")}</SectionTitle>
        <SectionLead>{t("how.lead")}</SectionLead>
        <ol className="mt-12 grid grid-cols-3 gap-5 max-hero:grid-cols-1 max-sm:mt-8">
          {steps.map((step, i) => (
            <Card as="li" key={step.title}>
              <StepNumber n={i + 1} />
              <CardTitle>{step.title}</CardTitle>
              <CardText>{step.text}</CardText>
            </Card>
          ))}
        </ol>
      </Container>
    </Section>
  );
};
