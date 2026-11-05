/** A paragraph, or a list of "• " lines. */
export type LegalBlock = string | string[];

const BULLET = "• ";

/** Splits a section's body the way the app does: paragraphs on blank lines, and a paragraph made only of "• " lines is a list. */
export const legalBlocks = (body: string): LegalBlock[] =>
  body.split("\n\n").map((paragraph) => {
    const lines = paragraph.split("\n");
    return lines.every((line) => line.startsWith(BULLET)) ? lines.map((line) => line.slice(BULLET.length)) : paragraph;
  });
