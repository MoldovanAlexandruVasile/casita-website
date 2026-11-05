import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

type Props = { icon: ReactNode; store: string };

// Where a store button will be at launch: shaped like one, but not a link.
export const StoreSoon = ({ icon, store }: Props) => {
  const { t } = useTranslation();
  return (
    <div
      className="flex items-center gap-3 rounded-2xl border border-dashed border-line bg-surface/70 px-4.5 py-2.5 text-muted"
      aria-label={t("soon.storeLabel", { store })}
    >
      <span className="text-ink/70">{icon}</span>
      <span className="flex flex-col leading-tight">
        <span className="text-[0.7rem] font-semibold tracking-wide uppercase">{t("soon.short")}</span>
        <span className="font-bold text-ink/80">{store}</span>
      </span>
    </div>
  );
};
