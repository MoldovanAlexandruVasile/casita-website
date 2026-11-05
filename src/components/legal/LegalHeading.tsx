import { currentLanguage } from "../../i18n";
import { LEGAL_UPDATED } from "../../legal/legalDocument";

type Props = { title: string; updatedLabel: string; draftNotice: string };

// The document's title, when it last changed, and (until the texts are final)
// the same draft notice the app shows.
export const LegalHeading = ({ title, updatedLabel, draftNotice }: Props) => {
  const date = new Intl.DateTimeFormat(currentLanguage(), { day: "numeric", month: "long", year: "numeric" }).format(LEGAL_UPDATED);
  return (
    <>
      <h1 className="text-[clamp(2rem,5vw,2.8rem)] font-extrabold">{title}</h1>
      <p className="mt-2 text-[0.9rem] text-muted">{updatedLabel.replace("{{date}}", date)}</p>
      {draftNotice ? (
        <p className="mt-6 rounded-2xl border border-warning/30 bg-warning/10 px-5 py-3.5 text-[0.95rem]">{draftNotice}</p>
      ) : null}
    </>
  );
};
