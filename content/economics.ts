import type { Thought, ThoughtConnection } from "./philosophy";
import { buildEconomicsThoughts } from "./economicsCorpusTypes";
import {
  economicsFoundationProfiles,
  economicsFoundationSeeds,
} from "./economicsFoundations";
import { economicsInvestmentThoughts } from "./economicsInvestment";
import {
  economicsModernProfiles,
  economicsModernSeeds,
} from "./economicsModern";

export const economicsTopicOptions = [
  { id: "all", label: "全部", englishLabel: "All" },
  { id: "市场", label: "市场", englishLabel: "Markets" },
  { id: "制度", label: "制度", englishLabel: "Institutions" },
  { id: "增长", label: "增长", englishLabel: "Growth" },
  { id: "货币", label: "货币", englishLabel: "Money" },
  { id: "行为", label: "行为", englishLabel: "Behavior" },
  { id: "分配", label: "分配", englishLabel: "Distribution" },
  { id: "投资", label: "投资", englishLabel: "Investing" },
] as const;

export const economicsCollectionOptions = [
  {
    id: "principles",
    label: "经济原理",
    englishLabel: "Principles",
  },
  {
    id: "modern",
    label: "现代经济",
    englishLabel: "Modern",
  },
  {
    id: "investment",
    label: "投资",
    englishLabel: "Investing",
  },
] as const;

export type EconomicsCollectionId = (typeof economicsCollectionOptions)[number]["id"];
export type EconomicsThoughtGroups = Record<EconomicsCollectionId, Thought[]>;
export type EconomicsCatalog = {
  thoughtGroups: EconomicsThoughtGroups;
  thoughts: Thought[];
  collectionForThought: (thoughtId: string) => EconomicsCollectionId | null;
};

/**
 * The economics library remains one source and citation domain, while these
 * three study ranges keep theory, contemporary analysis, and investing from
 * becoming one undifferentiated stream in the settings UI.
 */
export const economicsThoughtGroups = {
  principles: buildEconomicsThoughts(
    economicsFoundationProfiles,
    economicsFoundationSeeds,
  ),
  modern: buildEconomicsThoughts(
    economicsModernProfiles,
    economicsModernSeeds,
  ),
  investment: economicsInvestmentThoughts,
} satisfies EconomicsThoughtGroups;

const economicsCollectionByThoughtId = new Map(
  economicsCollectionOptions.flatMap(({ id }) => (
    economicsThoughtGroups[id].map((thought) => [thought.id, id] as const)
  )),
);

export function isEconomicsCollectionId(
  value: string | null,
): value is EconomicsCollectionId {
  return economicsCollectionOptions.some((option) => option.id === value);
}

export function economicsCollectionForThought(
  thoughtId: string,
): EconomicsCollectionId | null {
  return economicsCollectionByThoughtId.get(thoughtId) ?? null;
}

/**
 * A source-led study library rather than a quotation wall. Academic arguments
 * form the core; the investment section is explicitly practical judgment from
 * investors and capital allocators, not a substitute for economic theory or
 * personal financial advice.
 */
export const economicsThoughts = [
  ...economicsThoughtGroups.principles,
  ...economicsThoughtGroups.modern,
  ...economicsThoughtGroups.investment,
];

let completeEconomicsCatalogPromise: Promise<EconomicsCatalog> | null = null;

/**
 * Load the expanded 300-card economics catalog only when the economics library
 * is actually used. Keeping the original 94-card core synchronous preserves a
 * fast new-tab first paint while every economics view still receives the full
 * study library.
 */
export function loadCompleteEconomicsCatalog(): Promise<EconomicsCatalog> {
  if (completeEconomicsCatalogPromise) return completeEconomicsCatalogPromise;

  completeEconomicsCatalogPromise = Promise.all([
    import("./economicsPrinciplesExpansion"),
    import("./economicsModernExpansion"),
    import("./economicsInvestmentExpansion"),
  ]).then(([principles, modern, investment]) => {
    const thoughtGroups: EconomicsThoughtGroups = {
      principles: [
        ...economicsThoughtGroups.principles,
        ...principles.economicsPrinciplesExpansionThoughts,
      ],
      modern: [
        ...economicsThoughtGroups.modern,
        ...modern.economicsModernExpansionThoughts,
      ],
      investment: [
        ...economicsThoughtGroups.investment,
        ...investment.economicsInvestmentExpansionThoughts,
      ],
    };
    const thoughts = [
      ...thoughtGroups.principles,
      ...thoughtGroups.modern,
      ...thoughtGroups.investment,
    ];
    const collectionByThoughtId = new Map(
      economicsCollectionOptions.flatMap(({ id }) => (
        thoughtGroups[id].map((thought) => [thought.id, id] as const)
      )),
    );

    return {
      thoughtGroups,
      thoughts,
      collectionForThought: (thoughtId: string) => (
        collectionByThoughtId.get(thoughtId) ?? null
      ),
    };
  }).catch((error: unknown) => {
    completeEconomicsCatalogPromise = null;
    throw error;
  });

  return completeEconomicsCatalogPromise;
}

/**
 * Curated proposition-to-proposition links. Every endpoint is one concrete
 * card, so the idea network can compare arguments without treating an author
 * or an entire school as a single claim.
 */
export const economicsThoughtConnections: ThoughtConnection[] = [
  {
    source: "economics-smith-division-specialization",
    target: "economics-smith-market-extent",
    kind: "dialogues",
    summary: "分工提高生产率，但分工能走多远又受交换范围约束；两则命题共同说明效率并非只来自工厂内部。",
    englishSummary: "The division of labor raises productivity, yet its depth is constrained by the extent of exchange; together the claims show that efficiency is not created inside the workshop alone.",
  },
  {
    source: "economics-smith-local-knowledge-exchange",
    target: "economics-hayek-price-signal",
    kind: "reframes",
    summary: "斯密从交换者各自的处境出发，哈耶克把分散知识如何协调的问题推进到价格信号。",
    englishSummary: "Smith begins from traders situated in their own circumstances; Hayek reframes the coordination of dispersed knowledge through price signals.",
  },
  {
    source: "economics-ricardo-comparative-advantage",
    target: "economics-polanyi-embedded-economy",
    kind: "contrasts",
    summary: "比较优势说明交换如何扩大共同产出，波兰尼则提醒交换从不悬浮于制度之外；收益计算与社会嵌入需要同时考察。",
    englishSummary: "Comparative advantage explains how exchange can enlarge joint output, while Polanyi insists that exchange never floats free of institutions; gains and social embeddedness must be examined together.",
  },
  {
    source: "economics-marx-reserve-army",
    target: "economics-keynes-effective-demand",
    kind: "dialogues",
    summary: "马克思从资本积累解释持续失业的结构位置，凯恩斯从总需求不足解释就业为何可能停在非充分水平。",
    englishSummary: "Marx locates persistent unemployment within capital accumulation, while Keynes explains how deficient aggregate demand can leave employment below its full level.",
  },
  {
    source: "economics-keynes-effective-demand",
    target: "economics-friedman-monetary-limits",
    kind: "challenges",
    summary: "凯恩斯把需求不足置于失业解释中心，弗里德曼则强调名义刺激在预期调整后受到长期约束。",
    englishSummary: "Keynes places deficient demand at the center of unemployment, while Friedman stresses the long-run limits of nominal stimulus once expectations adjust.",
  },
  {
    source: "economics-keynes-fundamental-uncertainty",
    target: "economics-minsky-endogenous-fragility",
    kind: "reframes",
    summary: "凯恩斯指出远期未来无法化为稳定概率，明斯基进一步展示这种不确定性如何在繁荣期塑造融资结构并积累脆弱性。",
    englishSummary: "Keynes argues that the distant future cannot be reduced to stable probabilities; Minsky shows how such uncertainty shapes financing structures and accumulates fragility during booms.",
  },
  {
    source: "economics-fisher-debt-deflation",
    target: "economics-minsky-financing-regimes",
    kind: "reframes",
    summary: "费雪描述去杠杆与通缩相互放大的下行过程，明斯基把危机前的融资方式变化加入这条因果链。",
    englishSummary: "Fisher describes a downward spiral between deleveraging and deflation; Minsky extends the chain backward to changes in financing practices before the crisis.",
  },
  {
    source: "economics-schumpeter-creative-destruction",
    target: "economics-romer-knowledge-spillovers",
    kind: "dialogues",
    summary: "熊彼特突出创新重组旧产业的破坏性，罗默则说明可复用知识如何产生溢出并支撑持续增长。",
    englishSummary: "Schumpeter emphasizes the disruptive reorganization of old industries, while Romer explains how reusable knowledge creates spillovers that can sustain growth.",
  },
  {
    source: "economics-coase-firm-transaction-costs",
    target: "economics-north-rules-and-organizations",
    kind: "reframes",
    summary: "科斯以交易成本解释企业边界，诺思把同一类摩擦扩展到规则、组织与长期制度演化。",
    englishSummary: "Coase uses transaction costs to explain firm boundaries; North broadens related frictions into rules, organizations, and long-run institutional change.",
  },
  {
    source: "economics-ostrom-design-principles",
    target: "economics-polanyi-embedded-economy",
    kind: "resonates",
    summary: "奥斯特罗姆展示共同资源可以由具体社群规则治理，波兰尼则从更广的历史尺度说明经济秩序始终嵌入社会关系。",
    englishSummary: "Ostrom shows common resources governed through concrete community rules; Polanyi, at a broader historical scale, argues that economic order remains embedded in social relations.",
  },
  {
    source: "economics-sen-equality-capabilities",
    target: "economics-piketty-inequality-ideology",
    kind: "dialogues",
    summary: "森要求把平等落到人真实能做什么，皮凯蒂则追问财富差距如何被制度与正当化叙事维持。",
    englishSummary: "Sen asks what people are genuinely able to do, while Piketty examines how wealth differences are maintained by institutions and justificatory narratives.",
  },
  {
    source: "economics-kahneman-tversky-prospect-theory",
    target: "economics-thaler-endowment-sunk-cost",
    kind: "reframes",
    summary: "前景理论刻画参照点与损失厌恶，塞勒把这些偏差带入所有权与沉没成本等日常经济选择。",
    englishSummary: "Prospect theory models reference points and loss aversion; Thaler carries those biases into ordinary choices involving ownership and sunk costs.",
  },
  {
    source: "economics-akerlof-lemons-adverse-selection",
    target: "economics-stiglitz-information-paradigm",
    kind: "reframes",
    summary: "阿克洛夫用次品市场揭示信息不对称如何毁掉交易，斯蒂格利茨把信息成本进一步提升为理解市场设计的基础条件。",
    englishSummary: "Akerlof's market for lemons shows how asymmetric information can unravel trade; Stiglitz generalizes costly information into a foundational condition of market design.",
  },
  {
    source: "economics-investment-graham-margin-of-safety",
    target: "economics-investment-buffett-intrinsic-value",
    kind: "reframes",
    summary: "格雷厄姆用安全边际约束估值误差，巴菲特把评估重心推进到企业未来现金创造能力与长期价值。",
    englishSummary: "Graham uses a margin of safety to constrain valuation error; Buffett advances the inquiry toward a business's future cash-generating capacity and long-term value.",
  },
  {
    source: "economics-investment-graham-market-offers",
    target: "economics-investment-buffett-price-and-opinion",
    kind: "inherits",
    summary: "格雷厄姆把市场看作提供报价的伙伴，巴菲特继承这一纪律：价格是可利用的信息，不是必须服从的意见。",
    englishSummary: "Graham treats the market as a partner offering prices; Buffett inherits the discipline that price is information to use, not an opinion one must obey.",
  },
  {
    source: "economics-investment-munger-latticework",
    target: "economics-investment-buffett-economic-moat",
    kind: "dialogues",
    summary: "芒格要求用多学科模型理解企业，巴菲特的护城河判断则把竞争、客户行为与资本回报汇入长期经营分析。",
    englishSummary: "Munger calls for multidisciplinary models of a business; Buffett's moat analysis brings competition, customer behavior, and returns on capital into a long-horizon operating judgment.",
  },
  {
    source: "economics-investment-bogle-costs-zero-sum",
    target: "economics-investment-buffett-nonprofessional-indexing",
    kind: "resonates",
    summary: "博格从成本的算术说明低费率指数化，巴菲特则把它转成对多数非专业投资者的朴素长期方案。",
    englishSummary: "Bogle derives low-cost indexing from the arithmetic of costs; Buffett translates it into a simple long-term approach for many nonprofessional investors.",
  },
  {
    source: "economics-investment-marks-cycles",
    target: "economics-minsky-endogenous-fragility",
    kind: "dialogues",
    summary: "马克斯从投资者情绪与风险偏好描述周期，明斯基从融资结构说明稳定时期为何内生出更高脆弱性。",
    englishSummary: "Marks describes cycles through investor sentiment and risk appetite; Minsky explains through financing structures why stable periods can endogenously create greater fragility.",
  },
];
