import type { Thought, ThoughtConnection } from "./philosophy";
import {
  psychologyCognitionProfiles,
  psychologyCognitionSeeds,
} from "./psychologyCognition";
import {
  psychologyFoundationProfiles,
  psychologyFoundationSeeds,
} from "./psychologyFoundations";
import {
  psychologySocialProfiles,
  psychologySocialSeeds,
} from "./psychologySocial";
import { buildPsychologyThoughts } from "./psychologyCorpusTypes";
import {
  applyPsychologyCuration,
  psychologyCurationProfiles,
  psychologyCurationSeeds,
} from "./psychologyCuration2026";

export type PsychologyCollectionId = "foundations" | "cognition" | "social";

export type PsychologyCollectionOption = {
  id: PsychologyCollectionId;
  label: string;
  englishLabel: string;
};

export const defaultPsychologyCollectionId: PsychologyCollectionId = "foundations";

const curatedFoundationThoughts = applyPsychologyCuration(buildPsychologyThoughts(
  psychologyFoundationProfiles,
  psychologyFoundationSeeds,
));
const curatedCognitionThoughts = applyPsychologyCuration(buildPsychologyThoughts(
  psychologyCognitionProfiles,
  psychologyCognitionSeeds,
));
const curatedSocialThoughts = applyPsychologyCuration(buildPsychologyThoughts(
  psychologySocialProfiles,
  psychologySocialSeeds,
));
const curationThoughts = buildPsychologyThoughts(
  psychologyCurationProfiles,
  psychologyCurationSeeds,
);
const foundationThoughts = [
  ...curatedFoundationThoughts,
  ...curationThoughts.filter((thought) => thought.id.startsWith("psychology-foundations-")),
];
const cognitionThoughts = [
  ...curatedCognitionThoughts,
  ...curationThoughts.filter((thought) => thought.id.startsWith("psychology-cognition-")),
];
const socialThoughts = [
  ...curatedSocialThoughts,
  ...curationThoughts.filter((thought) => thought.id.startsWith("psychology-social-")),
];

export const psychologyThoughtGroups: Record<PsychologyCollectionId, Thought[]> = {
  foundations: foundationThoughts,
  cognition: cognitionThoughts,
  social: socialThoughts,
};

export const psychologyThoughts: Thought[] = [
  ...foundationThoughts,
  ...cognitionThoughts,
  ...socialThoughts,
];

export const psychologyCollectionOptions: readonly PsychologyCollectionOption[] = [
  { id: "foundations", label: "心理基础", englishLabel: "Foundations" },
  { id: "cognition", label: "认知与情绪", englishLabel: "Cognition & Emotion" },
  { id: "social", label: "社会与发展", englishLabel: "Social & Development" },
];

export const psychologyTopicOptions = [
  { id: "all", label: "全部", englishLabel: "All" },
  { id: "感知", label: "感知", englishLabel: "Perception" },
  { id: "记忆", label: "记忆", englishLabel: "Memory" },
  { id: "学习", label: "学习", englishLabel: "Learning" },
  { id: "决策", label: "决策", englishLabel: "Decision-Making" },
  { id: "情绪", label: "情绪", englishLabel: "Emotion" },
  { id: "动机", label: "动机", englishLabel: "Motivation" },
  { id: "人格", label: "人格", englishLabel: "Personality" },
  { id: "自我", label: "自我", englishLabel: "Self" },
  { id: "关系", label: "关系", englishLabel: "Relationships" },
  { id: "群体", label: "群体", englishLabel: "Groups" },
  { id: "发展", label: "发展", englishLabel: "Development" },
  { id: "行为", label: "行为", englishLabel: "Behavior" },
] as const;

export function isPsychologyCollectionId(
  value: string | null,
): value is PsychologyCollectionId {
  return value === "foundations" || value === "cognition" || value === "social";
}

export function psychologyCollectionForThought(
  thoughtId: string,
): PsychologyCollectionId | null {
  if (thoughtId.startsWith("psychology-foundations-")) return "foundations";
  if (thoughtId.startsWith("psychology-cognition-")) return "cognition";
  if (thoughtId.startsWith("psychology-social-")) return "social";
  return null;
}

/**
 * A small, explicit relationship map between concrete cards. These links are
 * editorial reading paths, not claims that one experiment alone established a
 * complete intellectual genealogy.
 */
export const psychologyThoughtConnections: readonly ThoughtConnection[] = [
  {
    source: "psychology-foundations-thorndike-law-effect",
    target: "psychology-foundations-skinner-operant",
    kind: "reframes",
    summary: "斯金纳把桑代克关于行为后果的概括，重写为可以操控并测量的操作性条件作用程序。",
    englishSummary: "Skinner reframed Thorndike's account of behavioral consequences as experimentally manipulable operant-conditioning procedures.",
    basis: "editorial",
  },
  {
    source: "psychology-foundations-thorndike-puzzle-box",
    target: "psychology-foundations-kohler-insight",
    kind: "challenges",
    summary: "苛勒以问题情境的突然重组，挑战了把复杂学习完全解释为渐进试错的倾向。",
    englishSummary: "Kohler's account of sudden problem restructuring challenges attempts to explain all complex learning as gradual trial and error.",
    basis: "editorial",
  },
  {
    source: "psychology-foundations-ebbinghaus-forgetting-time",
    target: "psychology-cognition-tulving-encoding-specificity",
    kind: "reframes",
    summary: "图尔文把遗忘问题从单纯随时间衰减，推进到编码条件与提取线索是否匹配。",
    englishSummary: "Tulving shifts the problem of forgetting from time-based loss alone to the match between encoding conditions and retrieval cues.",
    basis: "editorial",
  },
  {
    source: "psychology-foundations-james-attention",
    target: "psychology-cognition-neisser-perceptual-cycle",
    kind: "reframes",
    summary: "奈瑟把詹姆斯对选择性注意的描述，放进知觉图式、环境取样与持续修正的循环。",
    englishSummary: "Neisser places James's description of selective attention within a cycle of perceptual schemas, environmental sampling, and revision.",
    basis: "editorial",
  },
  {
    source: "psychology-foundations-pavlov-acquisition-extinction",
    target: "psychology-foundations-watson-conditioned-emotion",
    kind: "reframes",
    summary: "华生把条件反射程序从实验动物的生理反应扩展到人类情绪学习，但其经典个案也暴露出明显伦理与方法局限。",
    englishSummary: "Watson extended conditioning procedures from animal physiology to human emotional learning, while the classic case also exposes serious ethical and methodological limits.",
    basis: "editorial",
  },
  {
    source: "psychology-foundations-watson-observable-behavior",
    target: "psychology-cognition-neisser-perceptual-cycle",
    kind: "challenges",
    summary: "奈瑟以图式、环境取样与持续修正说明主动建构如何接受经验约束，挑战只研究外显行为的严格边界。",
    englishSummary: "Neisser's cycle of schemas, environmental sampling, and revision makes active construction empirically constrained, challenging a strict restriction to overt behavior.",
    basis: "editorial",
  },
  {
    source: "psychology-foundations-skinner-shaping",
    target: "psychology-social-bandura-reciprocal-determinism",
    kind: "reframes",
    summary: "班杜拉保留环境后果的重要性，同时加入观察学习、个人信念与环境之间的相互作用。",
    englishSummary: "Bandura retains the importance of environmental consequences while adding observational learning and reciprocal interaction among beliefs, behavior, and environment.",
    basis: "editorial",
  },
  {
    source: "psychology-foundations-james-emotion-body",
    target: "psychology-cognition-lazarus-primary-appraisal",
    kind: "challenges",
    summary: "拉扎勒斯强调个体对处境意义的评价，修正了把情绪主要理解为身体变化感受的路径。",
    englishSummary: "Lazarus emphasizes appraisal of a situation's meaning, revising accounts that center emotional experience primarily on sensed bodily change.",
    basis: "editorial",
  },
  {
    source: "psychology-social-lewin-field",
    target: "psychology-social-bandura-reciprocal-determinism",
    kind: "resonates",
    summary: "勒温的场论与班杜拉的交互决定论都拒绝把行为只归因于人格或环境的单一一端。",
    englishSummary: "Lewin's field theory and Bandura's reciprocal determinism both reject explaining behavior through either person or environment alone.",
    basis: "editorial",
  },
  {
    source: "psychology-social-asch-conformity",
    target: "psychology-social-tajfel-social-identity",
    kind: "reframes",
    summary: "社会认同理论把阿希所展示的群体压力，进一步放进“我们是谁”以及群体边界如何形成的过程。",
    englishSummary: "Social identity theory places the group pressure demonstrated by Asch within the broader formation of who 'we' are and how group boundaries emerge.",
    basis: "editorial",
  },
];
