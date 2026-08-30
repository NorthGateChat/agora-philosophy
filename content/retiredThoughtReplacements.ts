/**
 * Stable migrations for cards absorbed into a stronger surviving card.
 *
 * This is deliberately narrower than the complete retired-ID list. A card
 * replaced by a different thinker or tradition must not silently turn a
 * reader's saved item into an unrelated thought. Only editorially documented
 * merges and cross-library duplicates belong here.
 */
export const retiredThoughtReplacements = {
  // Western cards consolidated into stronger cross-library versions.
  "marx-commodity-fetishism": "economics-marx-commodity-fetish",
  "francis-bacon-idols": "science-bacon-idols",
  "james-stream-of-thought": "psychology-foundations-james-stream",
  popper: "science-popper-falsifiability",
  "kuhn-normal-science-puzzles": "science-kuhn-normal-science",
  "kuhn-anomaly-discovery": "science-kuhn-paradigm-change",

  // Mao collection curation.
  "mao-late-correct-ideas-return-and-repeat": "mao-correct-ideas-origin",
  "mao-transform-conditions": "mao-initiative-flexibility-planning",
  "mao-middle-guerrilla-planned-flexibility": "mao-initiative-flexibility-planning",
  "mao-early-economic-dual-test": "mao-early-economic-work-now",
  "mao-early-local-needs-wider-current": "mao-early-red-power-conditions",
  "mao-early-base-as-system": "mao-early-red-power-conditions",
  "mao-middle-organize-cooperative-capacity": "mao-middle-organize-voluntary-local-forms",
  "mao-middle-economy-public-needs-and-burdens": "mao-middle-economy-production-and-finance",
  "mao-late-present-turning-point": "mao-late-present-temporary-and-durable",
  "mao-late-no-all-directions-stabilize-coalition": "mao-late-no-all-directions-priority",
  "mao-late-democracy-two-functions": "mao-late-democracy-people-historical",

  // Science collection curation.
  "science-bacon-organized-experiment": "science-bacon-gradual-induction",
  "science-bacon-bee": "science-bacon-gradual-induction",
  "science-newton-rule-third": "science-newton-rules-causes",
  "science-newton-analysis-synthesis": "science-newton-no-feigned-hypothesis",
  "science-kepler-ellipse": "science-kepler-eight-minutes",
  "science-pasteur-rabies": "science-pasteur-attenuation",
  "science-kuhn-anomaly-discovery": "science-kuhn-paradigm-change",

  // Economics collection curation.
  "economics-principles-bhagwati-immiserizing-growth": "economics-modern-bhagwati-immiserizing-growth",
  "economics-principles-diamond-mirrlees-production-efficiency": "economics-modern-diamond-mirrlees-production-efficiency",
  "economics-principles-krugman-increasing-returns-trade": "economics-modern-krugman-increasing-returns-trade",
  "economics-principles-melitz-firm-heterogeneity": "economics-modern-melitz-heterogeneous-firms-trade",
  "economics-principles-mirrlees-optimal-income-tax": "economics-modern-mirrlees-optimal-income-tax-information",
  "economics-principles-musgrave-three-branches": "economics-modern-musgrave-three-functions-public-finance",
  "economics-principles-samuelson-public-goods": "economics-modern-samuelson-public-goods-condition",
  "economics-principles-stolper-samuelson-factor-rewards": "economics-modern-stolper-samuelson-trade-distribution",
  "economics-principles-tiebout-local-choice": "economics-modern-tiebout-local-public-goods-sorting",
  "economics-investment-bogle-tax-friction": "economics-investment-bogle-costs-zero-sum",
  "economics-investment-bogle-low-cost-selection": "economics-investment-bogle-costs-zero-sum",
  "economics-investment-extended-markowitz-diversification-limit": "economics-investment-extended-markowitz-covariance",
  "economics-investment-extended-markowitz-whole-portfolio": "economics-investment-extended-markowitz-covariance",
  "economics-investment-extended-sharpe-systematic-risk": "economics-investment-extended-sharpe-beta",
  "economics-investment-extended-sharpe-market-portfolio": "economics-investment-extended-sharpe-beta",
  "economics-investment-extended-taleb-redundancy": "economics-investment-extended-taleb-barbell",

  // Psychology collection curation.
  "psychology-cognition-neisser-memory-reconstruction": "psychology-cognition-neisser-flashbulb-consistency",
  "psychology-cognition-neisser-constructive-activity": "psychology-cognition-neisser-perceptual-cycle",
  "psychology-cognition-baddeley-hitch-unitary-store": "psychology-cognition-baddeley-hitch-central-control",
  "psychology-cognition-tulving-mental-time-travel": "psychology-cognition-tulving-autonoetic-awareness",
  "psychology-cognition-tulving-systems-evidence": "psychology-cognition-tulving-episodic-semantic",
  "psychology-social-lewin-unfreeze-change": "psychology-social-lewin-group-standards",
  "psychology-social-tajfel-positive-distinctiveness": "psychology-social-tajfel-social-identity",
  "psychology-social-ainsworth-cultural-observation": "psychology-social-ainsworth-strange-situation",
  "psychology-social-piaget-assimilation-accommodation": "psychology-social-piaget-action-construction",
  "psychology-social-vygotsky-tools-signs": "psychology-social-vygotsky-social-origin",

  // Indian philosophy collection curation.
  "indian-nagarjuna-motion-relational": "indian-nagarjuna-dependent-empty",
  "indian-aryadeva-attachment-object": "indian-aryadeva-senses-not-final",
  "indian-aryadeva-emptiness-medicine": "indian-aryadeva-senses-not-final",
  "indian-candrakirti-consequence-method": "indian-candrakirti-chariot-person",
  "indian-asanga-transform-basis": "indian-asanga-three-natures",
  "indian-asanga-ethics-training": "indian-asanga-three-natures",
  "indian-vasubandhu-nonconceptual-turn": "indian-vasubandhu-three-natures",
  "indian-dignaga-two-sources": "indian-dignaga-perception-concept",
  "indian-shankara-that-thou-art": "indian-upanishad-tat-tvam-asi",
  "indian-ramanuja-devotion-knowledge": "indian-ramanuja-surrender-agency",
  "indian-madhva-text-hierarchy": "indian-madhva-plural-selves",
  "indian-kabir-inner-ritual": "indian-kabir-beyond-labels",
  "indian-kabir-lived-search": "indian-kabir-beyond-labels",
} as const satisfies Readonly<Record<string, string>>;

const replacementByRetiredId: Readonly<Record<string, string>> = retiredThoughtReplacements;

/**
 * Preserve reader state after an editorial merge. Unknown IDs—including cards
 * from a reader's own knowledge collections—pass through unchanged. When an
 * old and surviving ID both exist, retain their first position only once.
 */
export function migrateRetiredThoughtIds(
  ids: readonly string[],
  duplicatePreference: "first" | "last" = "first",
): string[] {
  const migratedIds: string[] = [];
  const seenIds = new Set<string>();
  const orderedIds = duplicatePreference === "last" ? [...ids].reverse() : ids;

  for (const id of orderedIds) {
    const migratedId = replacementByRetiredId[id] ?? id;
    if (seenIds.has(migratedId)) continue;
    seenIds.add(migratedId);
    migratedIds.push(migratedId);
  }

  return duplicatePreference === "last" ? migratedIds.reverse() : migratedIds;
}

export function migrateRetiredThoughtState({
  saved,
  blocked,
  recent,
}: {
  saved: readonly string[];
  blocked: readonly string[];
  recent: readonly string[];
}): { saved: string[]; blocked: string[]; recent: string[] } {
  const migratedBlocked = migrateRetiredThoughtIds(blocked);
  const blockedIds = new Set(migratedBlocked);

  return {
    saved: migrateRetiredThoughtIds(saved).filter((id) => !blockedIds.has(id)),
    blocked: migratedBlocked,
    recent: migrateRetiredThoughtIds(recent, "last"),
  };
}
