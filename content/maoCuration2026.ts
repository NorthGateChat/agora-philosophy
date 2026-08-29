import type { Thought } from "./philosophy";

/** Eleven editorial cards whose independent value was exhausted by a stronger
 * card on the same passage cluster. No new Mao cards are introduced here. */
export const retiredMaoThoughtIds = new Set<string>([
  "mao-late-correct-ideas-return-and-repeat",
  "mao-transform-conditions",
  "mao-early-economic-dual-test",
  "mao-early-local-needs-wider-current",
  "mao-early-base-as-system",
  "mao-middle-guerrilla-planned-flexibility",
  "mao-middle-organize-cooperative-capacity",
  "mao-middle-economy-public-needs-and-burdens",
  "mao-late-present-turning-point",
  "mao-late-no-all-directions-stabilize-coalition",
  "mao-late-democracy-two-functions",
]);

type DeepReadingOverride = Pick<
  Thought,
  "context" | "englishContext" | "distinction" | "englishDistinction"
>;

const survivorOverrides: Readonly<Record<string, DeepReadingOverride>> = {
  "mao-correct-ideas-origin": {
    context: "开篇先连续发问人的正确思想来自哪里，随后以本句回答其社会实践来源。被合并的后段卡补足这条认识运动的另一半：经验上升为理性认识后，还须回到实践，经由行动结果反复检验和修正。",
    englishContext: "The essay opens by asking where correct ideas come from and answers with this sentence on social practice. The merged later card supplied the other half of the movement: after experience develops into rational knowledge, it must return to practice and be repeatedly tested and revised by the results of action.",
    distinction: "引句本身只陈述思想的来源；‘再回到实践并多次往返’来自同篇后续论证。深读把两段连接起来，但不把后段意思伪装成这一个连续句的字面内容。",
    englishDistinction: "The excerpt itself states only the source of ideas; returning to practice through repeated cycles comes from the essay's later argument. Deep reading connects the passages without pretending the later claim is wording contained in this one sentence.",
  },
  "mao-initiative-flexibility-planning": {
    context: "本句中的‘这个方针’专指前文所说战役和战斗上的外线速决进攻战。随后各段分别分析主动、灵活与计划；被合并的两张卡所说‘依条件调整’和‘有预案而非临时起意’，正是这一连续章节展开的含义。",
    englishContext: "Here ‘it’ refers specifically to the preceding principle of quick-decision offensive warfare on exterior lines in campaigns and battles. The following paragraphs analyse initiative, flexibility, and planning in turn; the merged cards' points about adapting to conditions and preparing rather than improvising belong to this continuous development.",
    distinction: "这不是脱离篇章的通用管理口号。主动涉及行动自由，灵活涉及依任务和敌情运用兵力，计划则在战争的不确实性中组织准备；承认客观条件也不等于意志可以任意创造结果。",
    englishDistinction: "This is not a context-free management slogan. Initiative concerns freedom of action, flexibility the employment of forces under mission and enemy conditions, and planning the organization of preparation amid uncertainty; recognizing objective conditions does not imply that will can create any desired result.",
  },
  "mao-early-economic-work-now": {
    context: "本卡吸收《我们的经济政策》重复卡的双重检验：当下开展经济工作，不只是为长期行动积累供给能力，也必须使群众生活得到实际改善。生产能力与生活感受不能被拆成先后互不相干的两张账。",
    englishContext: "This card absorbs the duplicate card's dual test from Our Economic Policy: economic work in the present must both build supply capacity for sustained action and tangibly improve people's lives. Productive capacity and lived conditions cannot be treated as unrelated accounts in a fixed sequence.",
    distinction: "两篇相邻历史文本共同形成这一编辑性比较，但本卡不是从其中摘出的一句原话。‘长期能力／当下生活’是跨篇归纳，应回到各自开篇的供给、生产与民生论述核对。",
    englishDistinction: "The comparison is an editorial synthesis across two neighboring historical texts, not a sentence quoted from either. The ‘long-run capacity/present livelihood’ distinction should be checked against each essay's opening discussion of supply, production, and popular welfare.",
  },
  "mao-early-red-power-conditions": {
    context: "这张幸存卡合并三张条件清单：同篇关于局部力量与全国形势的联系，以及《井冈山的斗争》对群众、组织、武装、地形和供给的展开。合并后应把根据地理解为嵌入更大环境的条件系统。",
    englishContext: "This surviving card combines three condition lists: the same essay's relation between a local force and the national situation, and The Struggle in the Chingkang Mountains' elaboration of social support, organization, armed capacity, terrain, and supply. A base is therefore a conditional system embedded in a wider environment.",
    distinction: "条件清单不是可到处复制的成功公式，各因素在具体时点的权重也不相同。跨篇合并用于显露系统关系，不应抹平两篇文章的不同历史问题和时间位置。",
    englishDistinction: "The list is not a portable recipe for success, and the weight of each factor changes with circumstances. The cross-text merge exposes systemic relations without erasing the essays' different historical problems and moments.",
  },
  "mao-middle-organize-voluntary-local-forms": {
    context: "本卡吸收被合并卡关于共享工具、协调时间和形成共同生产能力的说明。篇章先把分散劳动组织起来，再强调合作必须依据自愿与当地条件采用多种形式；能力增益与参与方式应一起阅读。",
    englishContext: "This card absorbs the merged card's account of sharing tools, coordinating time, and creating joint productive capacity. The essay organizes dispersed labour while also insisting that cooperation take varied forms grounded in voluntary participation and local conditions; capacity gains and the mode of participation belong together.",
    distinction: "组织能够改变能力结构，不等于任何集中形式都会产生合作收益。自愿、适地、反馈和可调整性是论证的一部分；只保留‘组织起来’四个字会遮蔽这些条件。",
    englishDistinction: "Organization can change the structure of capacity, but not every centralized form produces cooperative gains. Voluntariness, local fit, feedback, and adaptability are part of the argument; retaining only the slogan ‘get organized’ would hide those conditions.",
  },
  "mao-middle-economy-production-and-finance": {
    context: "合并后的卡片把财政缺口、生产基础和民众负担放在一条因果链中：财政供给依赖生产，脱离生产修复而加重征取会削弱长期来源，公共需要因此必须与生活承受力同时衡量。",
    englishContext: "The compressed card places fiscal shortfall, productive capacity, and popular burdens in one causal chain: public supply depends on production, while extraction without restoring production weakens its long-run source. Public needs must therefore be assessed together with people's capacity to bear them.",
    distinction: "这不是把一切财政约束化约为‘先生产后分配’，也不否认紧急筹资。论点在于动态持续性：当期取得的资源若破坏未来生产、合作与信任，账面平衡可能扩大真实缺口。",
    englishDistinction: "This does not reduce every fiscal constraint to ‘production before distribution’ or deny emergency finance. The point is dynamic sustainability: resources obtained now can enlarge the real gap if they damage future production, cooperation, and trust.",
  },
  "mao-late-present-temporary-and-durable": {
    context: "本卡吸收被合并的‘转折点’判断：区分短期优势与持久力量，是为了判断单一胜负究竟只是波动，还是主动权、力量配置与过程方向正在同时改变。时间尺度决定哪些指标具有战略意义。",
    englishContext: "This card absorbs the merged turning-point judgment: distinguishing temporary advantages from durable forces helps determine whether one outcome is a fluctuation or whether initiative, the balance of forces, and the direction of the process are changing together. Time horizon determines which indicators are strategically meaningful.",
    distinction: "‘持久’不是道德上更正当，‘转折’也不能由一个事后显眼事件自动证明。需要预先说明观察尺度，并用后续过程检验当时对力量可持续性的判断。",
    englishDistinction: "‘Durable’ does not mean morally superior, and a turning point is not proved automatically by one event that later looks conspicuous. The observational horizon must be stated and the contemporary judgment about sustainability tested against the subsequent process.",
  },
  "mao-late-no-all-directions-priority": {
    context: "合并后的卡片把优先级与稳定合作面放在一起：集中处理中心任务，也意味着区分必须改变、可以调整和暂时保留的关系，并为工商业和社会生活的恢复留下空间。",
    englishContext: "The compressed card joins priority-setting to preservation of a workable coalition: concentrating on the central task also means distinguishing relations that must change, can be adjusted, or should temporarily be retained, while leaving room for economic and social recovery.",
    distinction: "‘不要四面出击’不是普遍回避冲突，也不是把暂缓等同于永久认可。它是特定转型阶段的力量与次序判断；应用到其他情境必须重新说明中心任务、时间边界和承担代价者。",
    englishDistinction: "‘Don't hit out in all directions’ is neither universal conflict avoidance nor permanent endorsement of whatever is deferred. It is a judgment about forces and sequence in a particular transition; other uses must restate the central task, time boundary, and who bears the cost.",
  },
  "mao-late-democracy-people-historical": {
    context: "本卡吸收被合并卡的国家双重功能：一九四九年的论述一面按历史阶段界定‘人民’，一面据此在人民内部民主与对被界定为反动势力的强制之间划线。分类与权力功能不能分开阅读。",
    englishContext: "This card absorbs the merged card's dual account of state functions. The 1949 essay defines ‘the people’ by historical stage and uses that definition to draw a line between democracy among the people and coercion toward forces classified as reactionary. Classification and political power must be read together.",
    distinction: "这不是中性的词义变化。谁有权分类、分类能否申诉、强制边界如何受约束及其历史后果，都是深读必须显式追问的问题；不能只把‘人民’当作温暖而固定的称谓。",
    englishDistinction: "This is not a neutral shift in vocabulary. Deep reading must ask who classifies, whether classifications can be contested, how coercive boundaries are constrained, and what historical consequences follow; ‘the people’ cannot be treated as a warm, fixed label.",
  },
};

export function curateMaoThoughts(thoughts: readonly Thought[]): Thought[] {
  return thoughts
    .filter((thought) => !retiredMaoThoughtIds.has(thought.id))
    .map((thought) => {
      const override = survivorOverrides[thought.id];
      return override ? { ...thought, ...override } : thought;
    });
}
