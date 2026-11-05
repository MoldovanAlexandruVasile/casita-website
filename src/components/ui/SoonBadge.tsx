import { useTranslation } from "react-i18next";

import { cx } from "../../utils/cx";

type Props = { className?: string };

/** "● Coming soon": a soft label with a pulsing dot. Not a link: nothing to download yet. */
export const SoonBadge = ({ className }: Props) => {
  const { t } = useTranslation();
  return (
    <span
      className={cx(
        "inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-full bg-primary-soft px-4 text-[0.85rem] font-semibold text-on-primary-soft max-sm:px-3",
        className,
      )}
    >
      <span className="size-2 rounded-full bg-mint animate-soon" aria-hidden="true" />
      {t("soon.badge")}
    </span>
  );
};
