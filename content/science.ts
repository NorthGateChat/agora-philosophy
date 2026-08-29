import type { ThoughtConnection } from "./philosophy";
import { buildScienceThoughts } from "./scienceCorpusTypes";
import { scienceEarlyProfiles, scienceEarlySeeds } from "./scienceEarly";
import { scienceLifeProfiles, scienceLifeSeeds } from "./scienceLife";
import { scienceModernProfiles, scienceModernSeeds } from "./scienceModern";

export const scienceTopicOptions = [
  { id: "all", label: "全部", englishLabel: "All" },
  { id: "方法", label: "方法", englishLabel: "Method" },
  { id: "证据", label: "证据", englishLabel: "Evidence" },
  { id: "模型", label: "模型", englishLabel: "Models" },
  { id: "不确定", label: "不确定", englishLabel: "Uncertainty" },
  { id: "生命", label: "生命", englishLabel: "Life" },
  { id: "宇宙", label: "宇宙", englishLabel: "Cosmos" },
  { id: "责任", label: "责任", englishLabel: "Responsibility" },
] as const;

const scienceAuthorProfiles = {
  ...scienceEarlyProfiles,
  ...scienceLifeProfiles,
  ...scienceModernProfiles,
};

const scienceThoughtSeeds = [
  ...scienceEarlySeeds,
  ...scienceLifeSeeds,
  ...scienceModernSeeds,
];

/**
 * Scientific-thought cards are source-led editorial propositions, not a
 * collection of detached quotations. The public source panel states this
 * explicitly and every card carries a passage-level locator.
 */
export const scienceThoughts = buildScienceThoughts(
  scienceAuthorProfiles,
  scienceThoughtSeeds,
);

/**
 * A compact map of scientific inheritance, dispute, and conceptual reframing.
 * Endpoints use the first public card for each author so the UI can project an
 * author's full set of cards onto one stable, resolvable node.
 */
export const scienceThoughtConnections: ThoughtConnection[] = [
  {
    source: "science-bacon-gradual-induction",
    target: "science-galileo-moon",
    kind: "dialogues",
    summary: "培根把经验组织成逐步排除与归纳的方法，伽利略则让仪器观察和数学推演共同改写天象；两条路线汇成近代实验科学的不同侧面。",
    englishSummary: "Bacon organizes experience through gradual exclusion and induction, while Galileo joins instrument-aided observation to mathematical reasoning; the two routes form distinct sides of early experimental science.",
  },
  {
    source: "science-galileo-moon",
    target: "science-kepler-eight-minutes",
    kind: "resonates",
    summary: "伽利略让新观察挑战完美天界，开普勒则让八分角的误差迫使轨道模型让步；两者都让证据高于既有图景的优雅。",
    englishSummary: "Galileo lets new observations challenge a perfect heaven, while Kepler lets an eight-minute discrepancy overturn an elegant orbit; both place evidence above inherited pictures.",
  },
  {
    source: "science-kepler-eight-minutes",
    target: "science-newton-rules-causes",
    kind: "reframes",
    summary: "开普勒从观测中提炼行星运动规律，牛顿把这些规律与地上运动放进同一动力学框架，以共同原因重新解释。",
    englishSummary: "Kepler extracts laws of planetary motion from observation; Newton reframes those laws together with terrestrial motion in one dynamical system governed by common causes.",
  },
  {
    source: "science-galileo-moon",
    target: "science-newton-rules-causes",
    kind: "reframes",
    summary: "伽利略把运动转化为可测量的关系，牛顿进一步用运动定律和万有引力把这种数学化扩展为系统理论。",
    englishSummary: "Galileo turns motion into measurable relations; Newton extends that mathematization into a systematic theory through laws of motion and universal gravitation.",
  },
  {
    source: "science-faraday-induction",
    target: "science-maxwell-analogy",
    kind: "reframes",
    summary: "法拉第用实验和力线形成场的直觉，麦克斯韦把这种直觉改写为可计算的数学结构，并由此联结电、磁与光。",
    englishSummary: "Faraday develops an experimental intuition of fields through lines of force; Maxwell recasts it as a calculable mathematical structure linking electricity, magnetism, and light.",
  },
  {
    source: "science-maxwell-analogy",
    target: "science-einstein-relativity-postulates",
    kind: "reframes",
    summary: "麦克斯韦的电磁理论暴露了经典时空观的张力，爱因斯坦通过重建同时性与测量框架来保全定律在惯性系中的一致性。",
    englishSummary: "Maxwell's electromagnetic theory exposes tensions in classical spacetime; Einstein preserves the consistency of laws across inertial frames by reconstructing simultaneity and measurement.",
  },
  {
    source: "science-humboldt-connections",
    target: "science-darwin-selection",
    kind: "resonates",
    summary: "洪堡把自然看作气候、地形与生命相互联结的整体，达尔文在旅行观察中把这种比较视野推进为物种变化的历史机制。",
    englishSummary: "Humboldt sees nature as an interconnected whole of climate, terrain, and life; Darwin turns a comparable field of travel observations toward a historical mechanism of species change.",
  },
  {
    source: "science-darwin-selection",
    target: "science-mendel-design",
    kind: "dialogues",
    summary: "达尔文解释种群如何在代际中改变，孟德尔用可控杂交追踪性状如何传递；后来的遗传学综合才把两种问题真正接合。",
    englishSummary: "Darwin explains how populations change across generations, while Mendel tracks trait transmission through controlled crosses; only the later genetic synthesis fully joins the two problems.",
  },
  {
    source: "science-bernard-induced-observation",
    target: "science-pasteur-fermentation",
    kind: "resonates",
    summary: "贝尔纳强调实验要主动制造可解释的条件，巴斯德以对照装置区分发酵与污染机制；两者共同塑造了生命科学的实验因果观。",
    englishSummary: "Bernard stresses creating interpretable conditions, while Pasteur uses controlled apparatus to distinguish fermentation from contamination; together they shape experimental causation in the life sciences.",
  },
  {
    source: "science-darwin-selection",
    target: "science-carson-food-web",
    kind: "reframes",
    summary: "达尔文揭示生物之间的竞争、依赖与共同历史，卡森把相互依存推进到生态风险与公共责任：干预一环会沿关系网扩散。",
    englishSummary: "Darwin reveals competition, dependence, and shared history among organisms; Carson reframes interdependence as ecological risk and public responsibility, where intervention in one link propagates through a web.",
  },
  {
    source: "science-curie-quantification",
    target: "science-franklin-hydration",
    kind: "resonates",
    summary: "居里用稳定测量把未知现象从杂质中分离出来，富兰克林以严格衍射数据约束分子结构；两者都让定量证据先于想象中的模型。",
    englishSummary: "Curie uses stable measurement to isolate an unknown phenomenon from impurities, while Franklin constrains molecular structure with rigorous diffraction data; both put quantitative evidence before an imagined model.",
  },
  {
    source: "science-einstein-relativity-postulates",
    target: "science-bohr-stationary-states",
    kind: "dialogues",
    summary: "爱因斯坦以光量子打开经典连续图景的缺口，玻尔把量子条件纳入原子模型；随后两人围绕量子理论是否完备展开长期争论。",
    englishSummary: "Einstein's light quantum opens a breach in classical continuity, and Bohr builds quantum conditions into the atom; they later sustain a long dispute over whether quantum theory is complete.",
  },
  {
    source: "science-bohr-stationary-states",
    target: "science-heisenberg-observable-transitions",
    kind: "reframes",
    summary: "玻尔以定态与跃迁解释原子光谱，海森堡舍弃不可观察的电子轨道，把理论重建在可观测跃迁量的关系上。",
    englishSummary: "Bohr explains atomic spectra through stationary states and transitions; Heisenberg abandons unobservable electron orbits and rebuilds theory from relations among observable transition quantities.",
  },
  {
    source: "science-heisenberg-observable-transitions",
    target: "science-schrodinger-eigenvalues",
    kind: "dialogues",
    summary: "矩阵力学和波动力学从不同数学表述进入量子世界，最终被证明在预测上等价，却保留了不同的直觉入口。",
    englishSummary: "Matrix mechanics and wave mechanics enter the quantum world through different mathematical representations; they prove predictively equivalent while retaining different intuitive points of entry.",
  },
  {
    source: "science-bacon-gradual-induction",
    target: "science-popper-induction",
    kind: "challenges",
    summary: "培根希望通过有组织的经验逐步上升到一般判断，波普则质疑归纳能否在逻辑上证成理论，把重点转向可反驳的大胆猜想。",
    englishSummary: "Bacon seeks to rise gradually from organized experience to general judgment; Popper questions whether induction can logically justify theories and shifts emphasis to bold, falsifiable conjectures.",
  },
  {
    source: "science-popper-induction",
    target: "science-kuhn-normal-science",
    kind: "challenges",
    summary: "波普以批判检验描述科学理性，库恩从科学史指出日常研究通常在范式内解题，重大转变也并非单次反驳便能解释。",
    englishSummary: "Popper describes scientific rationality through critical testing; Kuhn argues from history that routine research usually solves puzzles within a paradigm and that major change cannot be explained by a single refutation.",
  },
  {
    source: "science-popper-induction",
    target: "science-feynman-seeking-laws",
    kind: "resonates",
    summary: "波普要求理论承担被经验否定的风险，费曼要求实验者主动寻找会推翻自己结论的细节；两者都把可错性变成科学品格。",
    englishSummary: "Popper requires theories to risk empirical rejection, while Feynman asks experimenters to seek details that could overturn their conclusions; both make fallibility a scientific virtue.",
  },
  {
    source: "science-turing-mechanical-computation",
    target: "science-shannon-message-not-meaning",
    kind: "dialogues",
    summary: "图灵把可计算步骤刻画为机器操作，香农把通信从意义中抽离为可量化的符号选择；两者共同奠定信息时代的形式基础。",
    englishSummary: "Turing characterizes effective calculation as machine operations, while Shannon abstracts communication from meaning into quantifiable symbol choices; together they establish formal foundations for the information age.",
  },
  {
    source: "science-shannon-message-not-meaning",
    target: "science-wiener-control-communication",
    kind: "dialogues",
    summary: "香农研究信道中消息的编码与容量，维纳研究系统如何借反馈通信维持或改变行为；信息由此进入传输与控制两种框架。",
    englishSummary: "Shannon studies the encoding and capacity of messages in channels, while Wiener studies how systems use feedback communication to maintain or change behavior; information enters both transmission and control frameworks.",
  },
  {
    source: "science-turing-mechanical-computation",
    target: "science-wiener-control-communication",
    kind: "dialogues",
    summary: "图灵追问什么过程能够被机械执行，维纳追问机器与生物如何通过反馈调节；两种问题共同扩展了机器可做之事的边界。",
    englishSummary: "Turing asks which processes can be mechanically executed, while Wiener asks how machines and organisms regulate themselves through feedback; together the questions expand the boundary of what machines can do.",
  },
  {
    source: "science-carson-food-web",
    target: "science-wiener-control-communication",
    kind: "resonates",
    summary: "卡森展示干预如何沿生态网络产生迟滞与放大效应，维纳则用反馈语言分析系统后果；两者都提醒技术行动必须追踪回路而非只看直接目标。",
    englishSummary: "Carson shows interventions producing delayed and amplified effects across ecological networks, while Wiener analyzes systemic consequences through feedback; both demand tracing loops beyond immediate goals.",
  },
  {
    source: "science-feynman-seeking-laws",
    target: "science-wiener-control-communication",
    kind: "resonates",
    summary: "费曼把诚实面对不确定性视为科学责任，维纳把技术后果纳入科学家的伦理判断；一个约束知识表达，一个约束知识应用。",
    englishSummary: "Feynman treats honesty about uncertainty as a scientific responsibility, while Wiener brings technological consequences into the scientist's ethical judgment; one disciplines expression, the other application.",
  },
];
