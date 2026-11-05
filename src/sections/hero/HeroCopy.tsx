import { useTranslation } from "react-i18next";

import { StoreSoonRow } from "../../components/StoreSoonRow";
import { Pill } from "../../components/ui/Pill";
import { HeroTitle } from "./HeroTitle";

// The hero's left column: what Casita is, and where it's coming.
export const HeroCopy = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-5.5">
      <Pill>{t("hero.pill")}</Pill>
      <HeroTitle />
      <p className="max-w-[34em] text-[1.15rem] text-muted">{t("hero.lead")}</p>
      <StoreSoonRow />
    </div>
  );
};
