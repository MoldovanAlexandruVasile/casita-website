import { useTranslation } from "react-i18next";

// "Your household budget, finally calm." — the second half in a green gradient.
export const HeroTitle = () => {
  const { t } = useTranslation();
  return (
    <h1 className="text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold">
      {t("hero.title")}{" "}
      <span className="bg-linear-to-r from-secondary to-mint bg-clip-text text-transparent">{t("hero.titleAccent")}</span>
    </h1>
  );
};
