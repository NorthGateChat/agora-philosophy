import type { ThoughtConnection } from "./philosophy";
import { buildIndianThoughts } from "./indianCorpusTypes";
import { indianEarlyProfiles, indianEarlySeeds } from "./indianEarly";
import { indianLaterProfiles, indianLaterSeeds } from "./indianLater";

export const indianTopicOptions = [
  { id: "all", label: "全部", englishLabel: "All" },
  { id: "自我", label: "自我", englishLabel: "Self" },
  { id: "认识", label: "认识", englishLabel: "Knowledge" },
  { id: "因果", label: "因果", englishLabel: "Causation" },
  { id: "解脱", label: "解脱", englishLabel: "Liberation" },
  { id: "伦理", label: "伦理", englishLabel: "Ethics" },
  { id: "辩证", label: "辩证", englishLabel: "Dialectic" },
  { id: "政治", label: "政治", englishLabel: "Politics" },
] as const;

const indianAuthorProfiles = {
  ...indianEarlyProfiles,
  ...indianLaterProfiles,
};

const indianThoughtSeeds = [
  ...indianEarlySeeds,
  ...indianLaterSeeds,
];

/**
 * Indian-philosophy cards are source-led study notes. Verified historical
 * translations can appear as short excerpts; the remaining cards stay
 * editorial propositions. Every entry names a work and passage-level locator.
 */
export const indianThoughts = buildIndianThoughts(
  indianAuthorProfiles,
  indianThoughtSeeds,
);

/**
 * A deliberately selective map of inheritance, dispute, and conceptual
 * reframing. The map does not collapse Indian traditions into one lineage:
 * several edges represent explicit disagreement rather than influence.
 */
export const indianThoughtConnections: ThoughtConnection[] = [
  {
    source: "indian-upanishad-tat-tvam-asi",
    target: "indian-shankara-that-thou-art",
    kind: "inherits",
    summary: "商羯罗把《歌者奥义书》的‘你就是它’解释为个体自我与梵在最高层面的同一，并以此组织不二论的解脱路径。",
    englishSummary: "Shankara reads the Chandogya Upanishad's ‘you are that’ as the ultimate identity of self and brahman and makes it central to Advaita liberation.",
  },
  {
    source: "indian-upanishad-tat-tvam-asi",
    target: "indian-ramanuja-qualified-knowing",
    kind: "reframes",
    summary: "罗摩努阇继承奥义书的统一追问，却把统一理解为有差异的整体：个体与世界属于梵，而不是被取消为无差别同一。",
    englishSummary: "Ramanuja inherits the Upanishadic search for unity but interprets it as a differentiated whole: selves and world belong to brahman rather than disappearing into an undifferentiated identity.",
  },
  {
    source: "indian-upanishad-tat-tvam-asi",
    target: "indian-madhva-real-difference",
    kind: "challenges",
    summary: "摩陀婆反对把奥义书的统一语言读成自我与最高实在完全同一，坚持两者之间的真实差异。",
    englishSummary: "Madhva challenges readings of Upanishadic unity as complete identity and maintains a real difference between the individual self and ultimate reality.",
  },
  {
    source: "indian-upanishad-neti-neti",
    target: "indian-shankara-neti-neti",
    kind: "inherits",
    summary: "商羯罗继承‘非此、非彼’的否定方法，用它排除把自我与梵限定为任何可对象化性质的误读。",
    englishSummary: "Shankara inherits the negative discipline of ‘not this, not that’ to exclude attempts to confine self and brahman to objectifiable properties.",
  },
  {
    source: "indian-gita-action-fruit",
    target: "indian-gandhi-means-shape-ends",
    kind: "reframes",
    summary: "《薄伽梵歌》要求行动而不占有结果，甘地把这种自律改写为政治伦理：目标不能替不正当手段洗白。",
    englishSummary: "The Gita asks for action without possession of its fruits; Gandhi reframes that discipline politically by refusing to let an end cleanse unjust means.",
  },
  {
    source: "indian-buddha-middle-way",
    target: "indian-nagarjuna-dependent-empty",
    kind: "reframes",
    summary: "早期佛教以中道避开生活实践中的纵欲与苦行两极，龙树把中道推进到概念分析，以缘起和空避开实有与断灭。",
    englishSummary: "Early Buddhism's middle way avoids indulgence and self-mortification in practice; Nagarjuna extends middle reasoning conceptually through dependent arising and emptiness, avoiding eternalism and annihilationism.",
  },
  {
    source: "indian-buddha-dependent-arising",
    target: "indian-nagarjuna-no-self-caused-arising",
    kind: "reframes",
    summary: "龙树把早期佛教的缘起分析转化为对自生、他生、共生和无因生的系统批判，以此否定独立自性的因果模型。",
    englishSummary: "Nagarjuna turns early Buddhist dependent arising into a systematic critique of arising from self, other, both, or no cause, rejecting causal models built on independent essence.",
  },
  {
    source: "indian-buddha-not-self",
    target: "indian-candrakirti-chariot-person",
    kind: "reframes",
    summary: "月称借车与部件的分析重述无我：人格可以在世俗关系中成立，却找不到脱离构成条件的独立实体。",
    englishSummary: "Candrakirti's analysis of chariot and parts reframes non-self: the person functions conventionally but cannot be found as an entity independent of constituting conditions.",
  },
  {
    source: "indian-jain-five-vows",
    target: "indian-gandhi-satyagraha",
    kind: "reframes",
    summary: "甘地把印度宗教传统中的不伤害从个人戒律推进为公共抗争方法，同时为它加入真理、自我约束与政治组织的要求。",
    englishSummary: "Gandhi carries non-harm from a personal discipline into public resistance, joining it to truth, self-restraint, and political organization.",
  },
  {
    source: "indian-samkhya-blind-lame",
    target: "indian-yoga-stilling-fluctuations",
    kind: "dialogues",
    summary: "数论以原质与纯粹意识的区分解释束缚，古典瑜伽接受相近的形上框架，却把重点转向如何通过训练辨识二者。",
    englishSummary: "Samkhya explains bondage through the distinction between material nature and pure awareness; classical Yoga adopts a related framework but emphasizes disciplined realization of that distinction.",
  },
  {
    source: "indian-nyaya-four-means",
    target: "indian-dignaga-two-sources",
    kind: "challenges",
    summary: "正理派承认四种知识手段，陈那则把独立来源收束为知觉与推论，并要求其他知识形式说明如何归入二者。",
    englishSummary: "Nyaya recognizes four means of knowledge; Dignaga reduces the independent sources to perception and inference and asks other forms to explain how they fall under those two.",
  },
  {
    source: "indian-nyaya-perception-conditions",
    target: "indian-dignaga-perception-concept",
    kind: "challenges",
    summary: "正理派分析感官、对象与可靠判断的条件，陈那进一步把无概念知觉和概念建构分开，由此重画知觉的边界。",
    englishSummary: "Nyaya analyzes the conditions joining sense, object, and reliable judgment; Dignaga redraws perception's boundary by separating non-conceptual awareness from conceptual construction.",
  },
  {
    source: "indian-dignaga-two-sources",
    target: "indian-dharmakirti-valid-cognition",
    kind: "inherits",
    summary: "法称继承陈那以知觉和推论为两种知识来源的框架，并以新颖、无欺的认知标准重新说明何谓有效认识。",
    englishSummary: "Dharmakirti inherits Dignaga's two-source framework of perception and inference and redefines valid cognition through novelty and non-deceptiveness.",
  },
  {
    source: "indian-nagarjuna-dependent-empty",
    target: "indian-aryadeva-emptiness-medicine",
    kind: "inherits",
    summary: "提婆继承龙树以空破除实体化的路线，同时强调空也是治疗性的工具，不能再被抓住成为新的教条。",
    englishSummary: "Aryadeva inherits Nagarjuna's use of emptiness against reification while stressing that emptiness is therapeutic and must not itself become a new dogma.",
  },
  {
    source: "indian-nagarjuna-two-truths",
    target: "indian-candrakirti-consequence-method",
    kind: "inherits",
    summary: "月称在二谛框架中发展归谬方法：在世俗层面追随公共约定，在胜义分析中不另立一个自性的最终实体。",
    englishSummary: "Within the two-truths framework, Candrakirti develops consequential reasoning: he follows shared convention provisionally without positing an intrinsically real final entity.",
  },
  {
    source: "indian-asanga-three-natures",
    target: "indian-vasubandhu-three-natures",
    kind: "dialogues",
    summary: "无著与世亲共同发展三性框架，用遍计、依他和圆成区分虚构对象、条件过程与对这种过程的非错误理解。",
    englishSummary: "Asanga and Vasubandhu develop the three-natures framework to distinguish imagined objects, conditioned processes, and a non-mistaken understanding of those processes.",
  },
  {
    source: "indian-shankara-that-thou-art",
    target: "indian-ramanuja-body-of-brahman",
    kind: "challenges",
    summary: "罗摩努阇以世界和众生为梵之身体，反对商羯罗把终极认识解释为消除个体差异的纯粹同一。",
    englishSummary: "Ramanuja describes world and selves as the body of brahman, challenging Shankara's interpretation of ultimate knowledge as an identity that sublates individual difference.",
  },
  {
    source: "indian-ramanuja-qualified-knowing",
    target: "indian-madhva-real-difference",
    kind: "challenges",
    summary: "摩陀婆把罗摩努阇保留在统一整体内部的差异进一步强化为永恒而真实的多重差别。",
    englishSummary: "Madhva strengthens the differences Ramanuja retains within a unified whole into multiple differences that are real and enduring.",
  },
  {
    source: "indian-kabir-beyond-labels",
    target: "indian-tagore-narrow-self",
    kind: "resonates",
    summary: "迦比尔拒绝让宗派标签取代亲历的求索，泰戈尔则批评封闭自我与狭隘共同体；两者都把精神生活指向超越身份壁垒的关系。",
    englishSummary: "Kabir refuses to let sectarian labels replace lived seeking, while Tagore criticizes the enclosed self and narrow community; both direct spiritual life beyond identity barriers.",
  },
  {
    source: "indian-tagore-nation-machine",
    target: "indian-gandhi-machinery-test",
    kind: "dialogues",
    summary: "泰戈尔警惕民族国家把社会变成追逐权力的机器，甘地则从人的自治与需要检验机器文明；二者共同批评制度手段反过来支配人的风险。",
    englishSummary: "Tagore warns that the nation-state can turn society into a power-seeking machine, while Gandhi tests machinery against human self-rule and need; both criticize institutions that come to dominate their makers.",
  },
  {
    source: "indian-gandhi-self-rule",
    target: "indian-ambedkar-social-reform",
    kind: "challenges",
    summary: "甘地把自治扩展为个人与共同体的自我治理，安贝德卡则追问：若种姓支配仍在，谁真正能够成为这个自治共同体的平等成员？",
    englishSummary: "Gandhi expands self-rule into personal and communal self-government; Ambedkar asks who can genuinely belong as an equal member while caste domination persists.",
  },
  {
    source: "indian-gandhi-satyagraha",
    target: "indian-ambedkar-graded-inequality",
    kind: "dialogues",
    summary: "甘地以真理坚持组织反抗，安贝德卡对分等级不平等的分析则说明联合本身不会自动出现，抗争还必须处理被压迫者之间的地位差异。",
    englishSummary: "Gandhi organizes resistance through satyagraha; Ambedkar's analysis of graded inequality shows that solidarity does not arise automatically and must confront status differences among the oppressed.",
  },
  {
    source: "marx",
    target: "indian-ambedkar-economic-democracy",
    kind: "reframes",
    summary: "安贝德卡同样重视经济支配，却坚持种姓和宗教排斥不能被还原为阶级问题；经济民主必须与社会平等和宪法保障共同推进。",
    englishSummary: "Ambedkar likewise takes economic domination seriously but refuses to reduce caste and religious exclusion to class; economic democracy must advance with social equality and constitutional safeguards.",
  },
];
