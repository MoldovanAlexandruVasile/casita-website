import { useTranslation } from "react-i18next";

const YEAR = new Date().getFullYear();

export const Copyright = () => {
  const { t } = useTranslation();
  return (
    <span>
      © {YEAR} Casita · {t("footer.note")}
    </span>
  );
};
