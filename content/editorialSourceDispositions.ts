export type PendingSourceDispositionReason =
  | "primary-text-not-checked"
  | "edition-not-selected"
  | "locator-needs-refinement"
  | "rights-review-needed"
  | "source-language-edit-needed";

export type RetainedEditorialReason =
  | "multi-passage-synthesis"
  | "version-or-attribution-instability"
  | "no-stable-collatable-edition"
  | "authorship-model-boundary";

export interface RetainedEditorialSourceDisposition {
  id: string;
  decision: "retain-editorial";
  reason: RetainedEditorialReason;
  reviewedOn: string;
  note: { zh: string; en: string };
}

function retain(
  reason: RetainedEditorialReason,
  reviewedOn: string,
  note: RetainedEditorialSourceDisposition["note"],
  ids: readonly string[],
): RetainedEditorialSourceDisposition[] {
  return ids.map((id) => ({ id, decision: "retain-editorial", reason, reviewedOn, note }));
}

/**
 * The hash is calculated from the sorted IDs of every current editorial card,
 * joined with a newline. A catalog change invalidates the snapshot, so a newly
 * added card cannot silently inherit the default pending decision.
 */
export const editorialSourceDispositionSnapshot = {
  reviewedOn: "2026-08-28",
  expectedEditorialCount: 562,
  expectedEditorialIdSha256: "098ae6a5f0c6a0c09eca2ccc02c73ee080202aaa9ed7dc3f414d1a7b71c47b5d",
  defaultDecision: "pending-upgrade",
  defaultReason: "primary-text-not-checked",
  defaultNote: {
    zh: "已进入原文升级队列，但尚未完成固定版本、逐字核对、准确定位与语境边界审阅。",
    en: "Queued for source upgrade; edition selection, verbatim checking, precise location, and contextual-boundary review are not yet complete.",
  },
} as const;

export const retainedEditorialSourceDispositions = [
  ...westChineseRetainedEditorialDispositions,
  ...economicsRetainedEditorialDispositions,
  ...maoScienceRetainedEditorialDispositions,
  ...indianRetainedEditorialDispositions,
  ...psychologyRetainedEditorialDispositions,
  ...retain(
    "multi-passage-synthesis",
    "2026-08-27",
    {
      zh: "当前命题合并多处论证；除非拆卡或改写成单一段落，继续标为命题整理。",
      en: "The current card combines arguments from multiple passages; it remains editorial unless split or narrowed to one passage.",
    },
    [
      "averroes-audiences",
      "economics-malthus-positive-preventive-checks",
      "economics-principles-menger-higher-order-goods",
      "economics-principles-ricardo-bullion-depreciation",
    ],
  ),
  ...retain(
    "authorship-model-boundary",
    "2026-08-28",
    {
      zh: "1898 年法文原刊与 Boorse／Motz 署名英译均已逐页核到并本地保存，但论文由皮埃尔与玛丽·居里共同署名，当前双语卡没有独立法文原文字段；修复共同署名和多语展示前保留项目转述。",
      en: "The 1898 French original and the named Boorse-Motz English translation have been checked page by page and cached locally, but the paper is jointly authored by Pierre and Marie Curie and the bilingual card has no separate French-source field. It remains an editorial restatement until coauthorship and multilingual display are modeled correctly.",
    },
    ["science-curie-pitchblende"],
  ),
] as const satisfies readonly RetainedEditorialSourceDisposition[];
import { economicsRetainedEditorialDispositions } from "./sourceCompletionEconomics";
import { indianRetainedEditorialDispositions } from "./sourceCompletionIndian";
import { maoScienceRetainedEditorialDispositions } from "./sourceCompletionMaoScience";
import { psychologyRetainedEditorialDispositions } from "./sourceCompletionPsychology";
import { westChineseRetainedEditorialDispositions } from "./sourceCompletionWestChinese";
