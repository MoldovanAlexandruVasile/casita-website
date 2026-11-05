import { Container, cx, FROSTED_BAR } from "@moldovanalexandruvasile/unity-marketing";
import type { ReactNode } from "react";

import { LanguagePicker } from "../components/LanguagePicker";
import { SoonBadge } from "../components/ui/SoonBadge";
import { Brand } from "./Brand";

type Props = {
  /** Where the logo leads: the top of this page, or the home page. */
  home?: string;
  /** The page's own links, before the language menu. */
  children?: ReactNode;
};

// The top bar: logo, the page's links, language, and "Coming soon" where a
// Download button will go at launch. On phones the nav "dissolves"
// (display: contents), so the three share the row with equal space.
export const SiteHeader = ({ home = "#top", children }: Props) => (
  <header className={cx(FROSTED_BAR, "top-0 border-b")}>
    <Container className="flex h-16 items-center justify-between gap-3">
      <Brand href={home} />
      <nav className="flex items-center gap-6 text-[0.95rem] text-muted max-sm:contents">
        {children}
        <LanguagePicker />
        <SoonBadge />
      </nav>
    </Container>
  </header>
);
