import type { LegalSection as Section } from "../../legal/legalDocument";
import { legalBlocks } from "../../utils/legalBlocks";

type Props = { section: Section };

export const LegalSection = ({ section }: Props) => (
  <section className="mt-9">
    <h2 className="mb-2.5 text-[1.25rem] font-bold">{section.title}</h2>
    <div className="space-y-2.5 text-muted">
      {legalBlocks(section.body).map((block, i) =>
        Array.isArray(block) ? (
          <ul key={i} className="list-disc space-y-1 pl-[1.2em]">
            {block.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p key={i} className="whitespace-pre-line">
            {block}
          </p>
        ),
      )}
    </div>
  </section>
);
