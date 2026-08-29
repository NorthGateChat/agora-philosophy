import { economicsInterpretationDetails } from "./interpretationDetailsEconomics";
import { indianInterpretationDetails } from "./interpretationDetailsIndian";
import { maoScienceInterpretationDetails } from "./interpretationDetailsMaoScience";
import { psychologyInterpretationDetails } from "./interpretationDetailsPsychology";
import { westChineseInterpretationDetails } from "./interpretationDetailsWestChinese";
import type { InterpretationDetail } from "./interpretationTypes";

export const interpretationDetails: Readonly<Record<string, InterpretationDetail>> = {
  ...westChineseInterpretationDetails,
  ...maoScienceInterpretationDetails,
  ...indianInterpretationDetails,
  ...economicsInterpretationDetails,
  ...psychologyInterpretationDetails,
};

export function interpretationDetailForThought(
  thoughtId: string,
): InterpretationDetail | undefined {
  return interpretationDetails[thoughtId];
}
