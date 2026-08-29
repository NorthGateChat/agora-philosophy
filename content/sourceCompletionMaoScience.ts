/** Completion-pass records owned by the Mao and science libraries. */
export const maoScienceCompletionEvidence = [] as const;

export const maoScienceCompletionEmphasis = {} as const;

function retainMaoEditorial(
  ids: readonly string[],
  note: Readonly<{ zh: string; en: string }>,
) {
  return ids.map((id) => ({
    id,
    decision: "retain-editorial" as const,
    reason: "multi-passage-synthesis" as const,
    reviewedOn: "2026-08-28",
    note,
  }));
}

/**
 * Every remaining Mao card was compared with its named work and the cached
 * Chinese/Foreign Languages Press route. These cards deliberately compress a
 * passage cluster, historical diagnosis, or programmatic relation; replacing
 * them with one short sentence would change the proposition rather than verify
 * it. They therefore stay visibly editorial instead of borrowing an adjacent
 * line. The sole science editorial card has its separately documented
 * coauthor/source-language disposition in editorialSourceDispositions.ts.
 */
export const maoScienceRetainedEditorialDispositions = [
  ...retainMaoEditorial(
    [
      "mao-early-base-as-system",
      "mao-early-circulation-and-production",
      "mao-early-economic-dual-test",
      "mao-early-economic-work-now",
      "mao-early-line-becomes-mass-action",
      "mao-early-local-needs-wider-current",
      "mao-early-organization-enables-action",
      "mao-early-poor-peasant-core",
      "mao-early-red-power-conditions",
      "mao-early-strategy-follows-stability",
      "mao-late-concentration-follows-conditions",
      "mao-late-correct-ideas-return-and-repeat",
      "mao-late-democracy-people-historical",
      "mao-late-democracy-two-functions",
      "mao-late-no-all-directions-priority",
      "mao-late-no-all-directions-stabilize-coalition",
      "mao-late-present-local-superiority",
      "mao-late-present-temporary-and-durable",
      "mao-late-present-turning-point",
      "mao-late-propaganda-change-takes-practice",
      "mao-late-revolution-avoid-premature-closure",
      "mao-late-revolution-judge-peace-effects",
      "mao-late-sixty-material-and-viewpoint",
      "mao-late-sixty-study-concrete-case",
      "mao-late-ten-relations-critical-learning",
      "mao-middle-coalition-program-and-participation",
      "mao-middle-communist-three-instruments",
      "mao-middle-economy-production-and-finance",
      "mao-middle-economy-public-needs-and-burdens",
      "mao-middle-guerrilla-base-support",
      "mao-middle-guerrilla-planned-flexibility",
      "mao-middle-guerrilla-strategic-scale",
      "mao-middle-may-four-intellectuals-and-people",
      "mao-middle-new-democracy-economic-program",
      "mao-middle-new-democracy-political-form",
      "mao-middle-organize-cooperative-capacity",
      "mao-middle-organize-voluntary-local-forms",
      "mao-middle-study-history-for-understanding",
      "mao-middle-study-situation-into-preparation",
      "mao-middle-united-front-differentiated-tactics",
      "mao-middle-united-front-struggle-bounded",
      "mao-middle-youth-direction-tested-in-practice",
      "mao-middle-youth-vanguard-and-majority",
      "mao-transform-conditions",
    ],
    {
      zh: "已对照卡片指定作品及既有中文／外文版底本审阅；当前命题合并多句、多个段落或历史分析层次，没有一条短连续原文能在不改变命题的情况下替换。保留为编辑性整理，禁止借用邻近篇目或把摘句伪装成整项论证。",
      en: "Reviewed against the named work and the cached Chinese/foreign-language source route. The proposition combines sentences, passages, or levels of historical analysis, and no short continuous excerpt can replace it without changing the claim. It remains editorial; no adjacent-work substitution or excerpt-as-whole-argument is permitted.",
    },
  ),
] as const;
