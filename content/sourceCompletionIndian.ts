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
  reviewedOn = "2026-08-28",
) {
  return ids.map((id) => ({
    id,
    decision: "retain-editorial" as const,
    reason,
    reviewedOn,
    note,
  }));
}

export const indianRetainedEditorialDispositions = [
  ...retainIndianEditorial(
    "multi-passage-synthesis",
    [
      "indian-nagarjuna-dependent-empty",
      "indian-nagarjuna-no-self-caused-arising",
      "indian-nagarjuna-two-truths",
      "indian-nagarjuna-samsara-nirvana",
      "indian-aryadeva-senses-not-final",
      "indian-candrakirti-compassion-priority",
      "indian-candrakirti-chariot-person",
      "indian-asanga-store-consciousness",
      "indian-asanga-three-natures",
      "indian-vasubandhu-consciousness-transformation",
      "indian-vasubandhu-dream-objection",
      "indian-vasubandhu-three-natures",
      "indian-dignaga-perception-concept",
      "indian-dignaga-exclusion-meaning",
      "indian-dharmakirti-inference-entailment",
      "indian-shankara-superimposition",
      "indian-shankara-text-coherence",
      "indian-shankara-real-change",
      "indian-shankara-neti-neti",
      "indian-ramanuja-qualified-knowing",
      "indian-ramanuja-body-of-brahman",
      "indian-ramanuja-surrender-agency",
      "indian-madhva-real-difference",
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
  ...retainIndianEditorial(
    "version-or-attribution-instability",
    [
      "indian-carvaka-indirect-perception",
      "indian-carvaka-indirect-practical-inference",
    ],
    {
      zh: "顺世论原典大多散佚；两张卡只重建《一切哲学摄要》第一章这一后世反对者的记述，明确不是可归属于顺世论作者的直接可靠引文。可正常摘录的是该记述本身，发布时必须保留‘间接传承／对手记述’标签，不能把 Cowell–Gough 英译倒推成失传原典。",
      en: "Most early Carvaka texts are lost. These two cards reconstruct only the later opponent report in Sarvadarsanasangraha Chapter I and explicitly are not direct, reliable quotations attributable to a Carvaka author. The report itself may be quoted normally, but every presentation must retain the indirect-transmission/opponent-report label and must not reverse-engineer the Cowell-Gough translation into a lost original.",
    },
    "2026-08-30",
  ),
  ...retainIndianEditorial(
    "multi-passage-synthesis",
    [
      "indian-kautilya-anvikshiki-inquiry",
      "indian-kautilya-subject-welfare",
      "indian-kautilya-counsel-secrecy",
      "indian-guru-nanak-hukam",
      "indian-guru-nanak-truthful-living",
      "indian-guru-nanak-air-water-earth",
      "indian-abhinavagupta-rasa-shared-savor",
      "indian-abhinavagupta-aesthetic-distance",
      "indian-abhinavagupta-recognition-agency",
      "indian-gargi-woven-in-what",
      "indian-gargi-imperishable-boundary",
    ],
    {
      zh: "2026-08-30 结构审计新增的 source-led 研读卡。每张已固定作品、章偈或注疏边界和候选原文入口；当前命题仍综合语境、术语和解释边界，不冒充一条连续原句。待校本、原语与短引逐项核清并写入共享验证记录后，可拆出正常的短原文卡。",
      en: "Source-led study cards added in the 2026-08-30 structural review. Each fixes a work, chapter, verse, or commentary boundary and a candidate source-text entry; the present proposition still synthesizes context, terminology, and interpretive limits rather than pretending to be one continuous sentence. A normal short source-excerpt card can be split out after edition, source language, and excerpt are checked and entered in the shared verification record.",
    },
    "2026-08-30",
  ),
] as const;
