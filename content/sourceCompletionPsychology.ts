/** Completion-pass records owned by the psychology library. */
export const psychologyCompletionEvidence = [] as const;

export const psychologyCompletionEmphasis = {} as const;

function retainPsychologyEditorial(
  reason: "multi-passage-synthesis",
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

export const psychologyRetainedEditorialDispositions = [
  ...retainPsychologyEditorial(
    "multi-passage-synthesis",
    [
      "psychology-cognition-neisser-flashbulb-consistency",
      "psychology-cognition-baddeley-hitch-concurrent-reasoning",
      "psychology-cognition-tulving-encoding-specificity",
      "psychology-cognition-loftus-semantic-integration",
      "psychology-cognition-loftus-weapon-focus",
      "psychology-cognition-loftus-lost-mall",
      "psychology-cognition-kahneman-tversky-small-numbers",
      "psychology-cognition-kahneman-tversky-framing",
      "psychology-social-festinger-failed-prophecy",
      "psychology-social-tajfel-minimal-groups",
      "psychology-social-ainsworth-strange-situation",
      "psychology-social-piaget-object-permanence",
      "psychology-social-piaget-moral-cooperation",
      "psychology-social-piaget-conservation-decentration",
    ],
    {
      zh: "已按指定研究逐项核对。当前卡片把样本／材料、程序或比较、结果模式及外推边界合并成研究摘要，不是一条连续原句；抽取一句会把方法、效应或解释中的一个局部伪装成完整发现。保留编辑性摘要，升级时应另建短原文卡。",
      en: "Reviewed against the named study. The card combines sample or material, procedure or comparison, result pattern, and generalization boundary as a research summary rather than one continuous sentence. One quoted line would misrepresent a local method, effect, or interpretation as the whole finding. Retain the editorial summary and create a separate short source-excerpt card when upgrading.",
    },
  ),
  ...retainPsychologyEditorial(
    "multi-passage-synthesis",
    [
      "psychology-foundations-skinner-schedules",
      "psychology-cognition-neisser-perceptual-cycle",
      "psychology-cognition-neisser-ecological-validity",
      "psychology-cognition-baddeley-hitch-phonological-support",
      "psychology-cognition-baddeley-hitch-visual-spatial",
      "psychology-cognition-baddeley-hitch-central-control",
      "psychology-cognition-tulving-episodic-semantic",
      "psychology-cognition-tulving-autonoetic-awareness",
      "psychology-cognition-kahneman-tversky-reference-dependence",
      "psychology-cognition-kahneman-tversky-decision-weights",
      "psychology-cognition-lazarus-transactional-stress",
      "psychology-cognition-lazarus-primary-appraisal",
      "psychology-cognition-lazarus-secondary-appraisal",
      "psychology-cognition-lazarus-coping-functions",
      "psychology-cognition-lazarus-relational-themes",
      "psychology-social-lewin-field",
      "psychology-social-lewin-group-standards",
      "psychology-social-festinger-dissonance",
      "psychology-social-festinger-postdecision",
      "psychology-social-tajfel-social-identity",
      "psychology-social-turner-self-categorization",
      "psychology-social-turner-ingroup-influence",
      "psychology-social-bowlby-attachment-system",
      "psychology-social-bowlby-secure-base",
      "psychology-social-bowlby-working-models",
      "psychology-social-vygotsky-social-origin",
      "psychology-social-vygotsky-zpd",
      "psychology-social-vygotsky-private-speech",
      "psychology-social-vygotsky-play",
    ],
    {
      zh: "已按指定专著或理论论文核对概念位置。当前命题跨章节、模型部件或多段论证进行整合；一句短原文可以正常摘引，但只能代表其中一个定义或论证步骤，不能替代整张理论卡。保留编辑性综合，待拆卡并固定精确段落后再增加原文卡。",
      en: "Reviewed against the named theoretical book or paper. The proposition integrates chapters, model components, or multiple argumentative steps. A normal short quotation can represent one definition or step but cannot replace the whole theory card. Retain the editorial synthesis, then add a source-excerpt card after splitting it and fixing an exact passage.",
    },
  ),
  ...retainPsychologyEditorial(
    "multi-passage-synthesis",
    [
      "psychology-cognition-deci-ryan-autonomy-competence",
      "psychology-cognition-deci-ryan-autonomous-controlled",
      "psychology-social-bandura-reciprocal-determinism",
    ],
    {
      zh: "短摘引本身没有障碍；但指定的1985、2017或1986年著作尚未完成原作逐段核对，现命题又是跨章节综合。已明确拒绝拿同作者邻近论文冒充指定作品；待原作核清后应把综合卡与短原文卡分开。",
      en: "Short quotation itself is not an obstacle, but the specified 1985, 2017, or 1986 book has not been checked passage by passage and the present proposition is cross-chapter synthesis. Adjacent papers by the same authors were explicitly rejected as substitutes; after direct review, the synthesis and a short source-excerpt card should be separated.",
    },
  ),
  ...retainPsychologyEditorial(
    "multi-passage-synthesis",
    [
      "psychology-foundations-allport-odbert-lexical-traits",
      "psychology-foundations-tupes-christal-recurrent-factors",
      "psychology-foundations-fiske-rating-structure",
      "psychology-foundations-spearman-general-factor",
      "psychology-foundations-cronbach-meehl-construct-network",
      "psychology-foundations-calkins-self-relational",
      "psychology-cognition-beck-cognitive-distortions",
      "psychology-social-harlow-contact-comfort",
      "psychology-social-hazan-shaver-adult-attachment",
      "psychology-social-clark-mills-communal-exchange",
    ],
    {
      zh: "2026-08-30 结构审计新增的 source-led 研读卡。每张已固定作品、篇章或页码边界和候选原文入口，但当前中文与英文命题综合了定义、方法、结果和外推限制，不冒充一条逐字原句。待逐版核对并把候选短引写入共享验证记录后，再单独升级为原文卡。",
      en: "Source-led study cards added in the 2026-08-30 structural review. Each fixes a work, passage or page boundary, and candidate source-text entry, but the present Chinese and English propositions synthesize definitions, methods, results, and limits rather than pretending to be one verbatim sentence. Upgrade only after edition-level checking and a separate shared verification record for the short excerpt.",
    },
    "2026-08-30",
  ),
] as const;
