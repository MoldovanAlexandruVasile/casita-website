import { Container } from "@moldovanalexandruvasile/unity-marketing";
import { AppPhone } from "../../components/AppPhone";
import { HeroCopy } from "./HeroCopy";

// Text beside the app on a phone; stacked on narrow screens.
export const HeroSection = () => (
  <section className="overflow-hidden bg-hero-glow pt-20 pb-24 max-hero:pt-12 max-hero:pb-16 max-sm:pt-8">
    <Container className="grid grid-cols-[1.1fr_0.9fr] items-center gap-14 max-hero:grid-cols-1 max-sm:gap-12">
      <HeroCopy />
      <AppPhone />
    </Container>
  </section>
);
