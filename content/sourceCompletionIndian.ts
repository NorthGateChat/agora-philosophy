/** Completion-pass records owned by the Indian-philosophy library. */
export const indianCompletionEvidence = [] as const;

export const indianCompletionEmphasis = {} as const;

type IndianRetainReason =
  | "multi-passage-synthesis"
  | "version-or-attribution-instability";

function retainIndianEditorial(
  reason: IndianRetainReason,
  ids: readonly string[],
  note: Readonly<{ zh: string; en: string }>,
) {
  return ids.map((id) => ({
    id,
    decision: "retain-editorial" as const,
    reason,
    reviewedOn: "2026-08-28",
    note,
  }));
}

export const indianRetainedEditorialDispositions = [
  ...retainIndianEditorial(
    "multi-passage-synthesis",
    [
      "indian-nagarjuna-dependent-empty",
      "indian-nagarjuna-no-self-caused-arising",
      "indian-nagarjuna-motion-relational",
      "indian-nagarjuna-two-truths",
      "indian-nagarjuna-samsara-nirvana",
      "indian-aryadeva-attachment-object",
      "indian-aryadeva-senses-not-final",
      "indian-aryadeva-emptiness-medicine",
      "indian-candrakirti-compassion-priority",
      "indian-candrakirti-chariot-person",
      "indian-candrakirti-consequence-method",
      "indian-asanga-store-consciousness",
      "indian-asanga-three-natures",
      "indian-asanga-ethics-training",
      "indian-asanga-transform-basis",
      "indian-vasubandhu-consciousness-transformation",
      "indian-vasubandhu-dream-objection",
      "indian-vasubandhu-three-natures",
      "indian-vasubandhu-nonconceptual-turn",
      "indian-dignaga-two-sources",
      "indian-dignaga-perception-concept",
      "indian-dignaga-exclusion-meaning",
      "indian-dharmakirti-inference-entailment",
      "indian-shankara-superimposition",
      "indian-shankara-text-coherence",
      "indian-shankara-that-thou-art",
      "indian-shankara-real-change",
      "indian-shankara-neti-neti",
      "indian-ramanuja-qualified-knowing",
      "indian-ramanuja-body-of-brahman",
      "indian-ramanuja-devotion-knowledge",
      "indian-ramanuja-surrender-agency",
      "indian-madhva-real-difference",
      "indian-madhva-text-hierarchy",
      "indian-madhva-plural-selves",
    ],
    {
      zh: "已核对指定章偈与学派位置；短摘引本身没有障碍，但当前命题把梵文原典、注疏论证和现代解释合并，任何一句原文都只能支撑其中一层，不能替代整张卡。保留转述；后续固定校勘本、补原语展示并拆卡后，可正常加入短引。",
      en: "The named chapter/verse and school location were reviewed. Short quotation is not the obstacle, but the proposition combines Sanskrit source, commentarial argument, and modern interpretation; one sentence could support only one layer, not replace the card. Retain as editorial, then add a normal short excerpt after fixing a critical text, source-language display, and split cards.",
    },
  ),
  ...retainIndianEditorial(
    "version-or-attribution-instability",
    [
      "indian-kabir-inner-ritual",
      "indian-kabir-lived-search",
      "indian-kabir-beyond-labels",
    ],
    {
      zh: "《比贾克》不同抄本、方言层和编号系统差异显著，现卡又综合一组相近歌句；在固定具体校本、篇号和原语言展示前，不把流行译句冒充迦比尔的一条稳定逐字原文。",
      en: "Bījak recensions, dialect layers, and numbering systems differ substantially, and each card synthesizes a cluster of related sayings. No popular translation will be presented as one stable verbatim Kabir line until a specific edition, item number, and source-language display are fixed.",
    },
  ),
  ...retainIndianEditorial(
    "multi-passage-synthesis",
    ["indian-tagore-human-truth"],
    {
      zh: "当前命题综合《人的宗教》第一章与附录，并非一条连续原句；短摘引可以正常使用，但只能支撑章节或附录中的一个局部。保留编辑性命题，待固定版本并把两层论证拆开后再加入短引。",
      en: "The proposition synthesizes Chapter I and the appendix of The Religion of Man rather than one continuous sentence. A normal short quotation is possible but would support only one local claim. It remains editorial until a fixed edition is selected and the two argumentative layers are split.",
    },
  ),
] as const;
