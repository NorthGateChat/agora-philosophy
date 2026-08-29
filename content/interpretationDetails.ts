import { economicsInterpretationDetails } from "./interpretationDetailsEconomics";
import { indianInterpretationDetails } from "./interpretationDetailsIndian";
import { maoScienceInterpretationDetails } from "./interpretationDetailsMaoScience";
import { psychologyInterpretationDetails } from "./interpretationDetailsPsychology";
import { westChineseInterpretationDetails } from "./interpretationDetailsWestChinese";
import { curation2026RetiredThoughtIds } from "./curation2026Registry";
import type { InterpretationDetail } from "./interpretationTypes";

const historicalInterpretationDetails: Readonly<Record<string, InterpretationDetail>> = {
  ...westChineseInterpretationDetails,
  ...maoScienceInterpretationDetails,
  ...indianInterpretationDetails,
  ...economicsInterpretationDetails,
  ...psychologyInterpretationDetails,
};

export const interpretationDetails: Readonly<Record<string, InterpretationDetail>> =
  Object.fromEntries(
    Object.entries(historicalInterpretationDetails)
      .filter(([thoughtId]) => !curation2026RetiredThoughtIds.has(thoughtId)),
  );

export function interpretationDetailForThought(
  thoughtId: string,
): InterpretationDetail | undefined {
  return interpretationDetails[thoughtId];
}
