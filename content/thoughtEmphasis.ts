import type { Thought } from "./philosophy";
import { maoSourceUpgradeEmphasis } from "./maoSourceUpgrades";
import { economicsCompletionEmphasis } from "./sourceCompletionEconomics";
import { indianCompletionEmphasis } from "./sourceCompletionIndian";
import { maoScienceCompletionEmphasis } from "./sourceCompletionMaoScience";
import { psychologyCompletionEmphasis } from "./sourceCompletionPsychology";
import { westChineseCompletionEmphasis } from "./sourceCompletionWestChinese";
import { curation2026RetiredThoughtIds } from "./curation2026Registry";
import { westChineseCurationEmphasis } from "./curationEmphasis2026";

export type ThoughtEmphasisSegments = Readonly<{
  zh: readonly string[];
  en: readonly string[];
}>;

/**
 * Human-curated reading emphasis for verified source excerpts.
 *
 * Segments are stored as exact substrings instead of character offsets so a
 * quotation can gain an ellipsis or line break without invalidating its marks.
 * Keep the list sparse: normally one conceptual hinge, or two terms whose
 * contrast carries the passage.
 */
const preCurationThoughtEmphasis = {
  ...maoSourceUpgradeEmphasis,
  ...westChineseCompletionEmphasis,
  ...economicsCompletionEmphasis,
  ...maoScienceCompletionEmphasis,
  ...indianCompletionEmphasis,
  ...psychologyCompletionEmphasis,
  "mao-investigation": {
    zh: ["没有调查", "没有发言权"],
    en: ["No investigation", "no right to speak"],
  },
  "mao-mass-line": {
    zh: ["从群众中来", "到群众中去"],
    en: ["From the masses", "to the masses"],
  },
  "science-bacon-gradual-induction": {
    zh: ["从感觉和个别事物出发", "不断地、逐级地上升"],
    en: ["from the senses and particulars", "ascending continually and gradually"],
  },
  "science-bacon-idols": {
    zh: ["四类假象困扰着人的心灵", "市场假象"],
    en: ["Four species of idols beset the human mind", "Idols of the Market"],
  },
  "science-bacon-bee": {
    zh: ["采集材料", "加工并塑造这些材料"],
    en: ["extracts matter", "works and fashions it"],
  },
  "science-bacon-organized-experiment": {
    zh: ["漫无确定方向", "听凭偶然驱使"],
    en: ["without any determined course", "consulting mere chance"],
  },
  "science-bacon-negative-instances": {
    zh: ["否定实例必须列在肯定实例之下", "考察所研究性质的缺失"],
    en: ["Negatives, therefore, must be classed under the affirmatives", "the want of the given nature must be inquired into"],
  },
  "science-einstein-relativity-postulates": {
    zh: ["相对性原理", "与发光体的运动状态无关"],
    en: ["Principle of Relativity", "independent of the state of motion of the emitting body"],
  },
  "science-einstein-light-quanta": {
    zh: ["并非连续地分布", "有限数目的能量量子"],
    en: ["not continuously distributed", "finite number of energy quanta"],
  },
  "science-einstein-brownian-evidence": {
    zh: ["平均位移", "时间的平方根"],
    en: ["mean displacement", "square root of the time"],
  },
  "science-einstein-equivalence": {
    zh: ["扩展到彼此作加速运动的参考物体", "广义相对性公设"],
    en: ["include bodies of reference which are accelerated", "generalised postulate of relativity"],
  },
  "science-einstein-epr-completeness": {
    zh: ["物理实在的每一个要素", "不以任何方式扰动系统"],
    en: ["each element of reality", "without disturbing the system"],
  },
  "science-einstein-theory-construction": {
    zh: ["绝不可能成为这些概念由之推导出来的源泉", "唯一判准"],
    en: ["cannot possibly be the source from which they are derived", "sole criterion"],
  },
  "science-bohr-stationary-states": {
    zh: ["不同“稳定状态”之间跃迁", "普通力学定律"],
    en: ["between different ‘stationary’ states", "ordinary laws of mechanics"],
  },
  "science-bohr-quantum-postulate": {
    zh: ["不可忽略的相互作用"],
    en: ["an interaction with the agency of observation not to be neglected"],
  },
  "science-bohr-complementarity": {
    zh: ["不是彼此矛盾", "彼此互补"],
    en: ["not dealing with contradictory", "complementary pictures"],
  },
  "science-bohr-whole-arrangement": {
    zh: ["整个实验安排", "考虑在内"],
    en: ["whole experimental arrangement", "taken into account"],
  },
  "science-heisenberg-observable-transitions": {
    zh: ["量之间的关系", "原则上可观察"],
    en: ["relationships between quantities", "observable, in principle"],
  },
  "science-heisenberg-microscope": {
    zh: ["电子的动量发生不连续变化", "位置确定得越精确"],
    en: ["electron discontinuously changes its impulse", "the more precise the position determination"],
  },
  "science-heisenberg-conjugate-limits": {
    zh: ["位置确定得越精确", "动量就只能被知道得越不精确"],
    en: ["more precisely the position is determined", "more imprecisely will the impulse be known"],
  },
  "science-heisenberg-statistical-prediction": {
    zh: ["基本上是统计性的", "不能被精确预言"],
    en: ["basically statistical", "not generally accurately predictable"],
  },
  "science-schrodinger-eigenvalues": {
    zh: ["“整数”概念本身并未被引入", "与振动弦节点数同样自然的方式产生"],
    en: ["notion of “whole numbers”, merely as such, is not introduced", "same natural way as it does in the case of the node-numbers"],
  },
  "science-schrodinger-entangled-whole": {
    zh: ["整体处于一个确定的状态", "各部分单独来看则不是"],
    en: ["The whole is in a definite state", "the parts taken individually are not"],
  },
  "science-schrodinger-cat-boundary": {
    zh: ["活猫与死猫", "等份地混合或涂抹在一起"],
    en: ["the living and the dead cat", "mixed or smeared out in equal parts"],
  },
  "science-faraday-induction": {
    zh: ["感生电流的方向与电池电流相反", "电池电流无论持续多久"],
    en: ["induced current in the opposite direction", "No continuance of the battery current"],
  },
  "science-faraday-electricities": {
    zh: ["通过产生这些效应的能力来比较", "普通电与伏打电"],
    en: ["compare electricities from different sources", "by their power of producing these effects"],
  },
  "science-faraday-magneto-optics": {
    zh: ["真实、直接的关系与依存", "一切自然力彼此联结"],
    en: ["a true, direct relation and dependence", "all natural forces are tied together"],
  },
  "science-faraday-lines-force": {
    zh: ["只表示力在任一给定位置上的状态", "强度和方向"],
    en: ["condition of the force in any given place", "strength and direction"],
  },
  "science-darwin-selection": {
    zh: ["有利变异的保存", "有害变异的排除"],
    en: ["preservation of favourable variations", "rejection of injurious variations"],
  },
  "science-darwin-struggle": {
    zh: ["生存斗争", "广泛而比喻的意义"],
    en: ["Struggle for Existence", "large and metaphorical sense"],
  },
  "science-darwin-classification": {
    zh: ["真正的分类", "谱系性的"],
    en: ["true classification", "genealogical"],
  },
  "science-darwin-fossil-record": {
    zh: ["地质记录", "极端不完备"],
    en: ["extreme imperfection", "geological record"],
  },
  marx: {
    zh: ["创造自己的历史", "近在手边的既有条件"],
    en: ["makes his own history", "such as he finds close at hand"],
  },
  "marx-change-world": {
    zh: ["解释世界", "改变它"],
    en: ["interpreted the world", "to change it"],
  },
  "marx-social-being": {
    zh: ["不是人们的意识决定他们的存在", "社会存在决定他们的意识"],
    en: ["not the consciousness of men that determines their existence", "their social existence determines their consciousness"],
  },
  "marx-use-exchange-value": {
    zh: ["效用使它成为使用价值", "交换价值首先表现为一种量的关系"],
    en: ["utility of a thing makes it a use-value", "Exchange value, at first sight, presents itself as a quantitative relation"],
  },
  "marx-abstract-labor": {
    zh: ["抽象人类劳动体现或物化在其中", "社会必要劳动时间"],
    en: ["human labour in the abstract has been embodied or materialised in it", "labour-time socially necessary"],
  },
  "marx-commodity-fetishism": {
    zh: ["人与人之间的一定社会关系", "物与物之间关系的虚幻形式"],
    en: ["a definite social relation between men", "the fantastic form of a relation between things"],
  },
  "marx-labor-power-commodity": {
    zh: ["劳动能力", "作为商品出现在市场上"],
    en: ["Labour-power", "appear upon the market as a commodity"],
  },
  "marx-surplus-value": {
    zh: ["不仅是价值的源泉", "比自身价值更大的价值"],
    en: ["a source not only of value", "more value than it has itself"],
  },
  "marx-cooperation-collective-power": {
    zh: ["创造了一种新的力量", "群众的集体力量"],
    en: ["creation of a new power", "collective power of masses"],
  },
  "marx-machinery-discipline": {
    zh: ["自动机本身成了主体", "服从中央动力"],
    en: ["the automaton itself is the subject", "subordinated to the central moving-power"],
  },
  "marx-reserve-army": {
    zh: ["成为相对过剩人口", "不断增长的规模"],
    en: ["turned into a relative surplus population", "an always increasing extent"],
  },
  "marx-primitive-accumulation": {
    zh: ["生产者与生产资料相分离的历史过程", "生产方式的史前阶段"],
    en: ["historical process of divorcing the producer from the means of production", "pre-historic stage of capital"],
  },
  "marx-class-struggle": {
    zh: ["一切社会的历史", "阶级斗争的历史"],
    en: ["history of all hitherto existing society", "history of class struggles"],
  },
  "wittgenstein-world-facts": {
    zh: ["世界是所有发生之事", "事实的总和，而不是事物的总和"],
    en: ["world is everything that is the case", "totality of facts, not of things"],
  },
  "wittgenstein-picture-reality": {
    zh: ["构造事实的图像", "命题是现实的图像"],
    en: ["pictures of facts", "proposition is a picture of reality"],
  },
  "wittgenstein-proposition-shows-form": {
    zh: ["逻辑形式映现在命题中", "能够显示的，不能说出"],
    en: ["logical form: this mirrors itself in the propositions", "What can be shown cannot be said"],
  },
  "wittgenstein-language-world": {
    zh: ["我的语言的界限", "我的世界的界限"],
    en: ["limits of my language", "limits of my world"],
  },
  "wittgenstein-logic-mirror": {
    zh: ["逻辑不是一种理论", "世界的映像"],
    en: ["Logic is not a theory", "reflexion of the world"],
  },
  "wittgenstein-silence": {
    zh: ["不能谈论", "保持沉默"],
    en: ["cannot speak", "must be silent"],
  },
  "wittgenstein-family-resemblance": {
    zh: ["相似性构成的复杂网络"],
    en: ["complicated network of similarities"],
  },
  "wittgenstein-rule-practice": {
    zh: ["“遵守规则”也是一种实践"],
    en: ["‘obeying a rule’ is a practice"],
  },
  "wittgenstein-hinge-certainty": {
    zh: ["铰链就必须保持不动"],
    en: ["hinges must stay put"],
  },
  "wittgenstein": {
    zh: ["一个词的意义就是它在语言中的使用"],
    en: ["the meaning of a word is its use in the language"],
  },
  "wittgenstein-language-games": {
    zh: ["数不胜数的不同使用方式"],
    en: ["countless different kinds of use"],
  },
  "wittgenstein-private-diary": {
    zh: ["没有正确性的标准"],
    en: ["no criterion of correctness"],
  },
  "wittgenstein-beetle-box": {
    zh: ["在语言游戏中根本没有位置"],
    en: ["has no place in the language-game at all"],
  },
  "wittgenstein-aspect-seeing": {
    zh: ["把它看得不同了"],
    en: ["I see it differently"],
  },
  "wittgenstein-doubt-background": {
    zh: ["怀疑这种游戏本身"],
    en: ["game of doubting itself"],
  },
  "wittgenstein-fly-bottle": {
    zh: ["飞出捕蝇瓶的路"],
    en: ["way out of the fly-bottle"],
  },
  "wittgenstein-lion": {
    zh: ["我们也无法理解它"],
    en: ["we could not understand him"],
  },
  "du-bois": {
    zh: ["透过他人的眼睛看自己", "衡量自己的灵魂"],
    en: ["looking at one’s self through the eyes of others", "measuring one’s soul by the tape"],
  },
  "du-bois-color-line": {
    zh: ["二十世纪的问题", "肤色界线的问题"],
    en: ["problem of the Twentieth Century", "problem of the color line"],
  },
  "du-bois-washington-critique": {
    zh: ["政治权力", "黑人青年的高等教育"],
    en: ["political power", "higher education of Negro youth"],
  },
  heraclitus: {
    zh: ["必须遵循共同者", "活得仿佛各自拥有一套自己的智慧"],
    en: ["must follow the common", "live as if they had a wisdom of their own"],
  },
  "heraclitus-logos": {
    zh: ["不听我，而听我的“道”", "承认万物为一"],
    en: ["not to me, but to my Word", "confess that all things are one"],
  },
  "heraclitus-river": {
    zh: ["无法两次踏入同一条河流", "清新的水不断向你流来"],
    en: ["cannot step twice into the same rivers", "fresh waters are ever flowing in upon you"],
  },
  "heraclitus-conflict": {
    zh: ["战争是万物之父、万物之王", "争斗即正义"],
    en: ["War is the father of all and the king of all", "strife is justice"],
  },
  "heraclitus-character": {
    zh: ["人的性情就是他的命运"],
    en: ["Man's character is his fate"],
  },
  parmenides: {
    zh: ["能够被思考的探究之路只有两条", "它存在，并且它不可能不存在"],
    en: ["the only two ways of search that can be thought of", "that It is, and that it is impossible for it not to be"],
  },
  "parmenides-thinking-being": {
    zh: ["能够被思考的，与能够存在的，是同一件事"],
    en: ["the same thing that can be thought and that can be"],
  },
  "parmenides-sayable": {
    zh: ["能够被说出和被思考的东西，必定存在", "虚无不可能存在"],
    en: ["what can be spoken and thought is", "it is not possible for what is nothing to be"],
  },
  "parmenides-unchanging": {
    zh: ["既非生成，也不可毁灭", "它现在整个地、同时地存在"],
    en: ["uncreated and indestructible", "now it is, all at once"],
  },
  plotinus: {
    zh: ["转向你自己，并且观看", "直到一张可爱的脸庞在他的作品上显现"],
    en: ["Withdraw into yourself and look", "until a lovely face has grown upon his work"],
  },
  "plotinus-virtue": {
    zh: ["为我们的欲望和全部感受能力设定界限与尺度", "驱散错误的判断"],
    en: ["setting bound and measure to our desires and to our entire sensibility", "dispelling false judgement"],
  },
  "plotinus-hypostases": {
    zh: ["超越存在的本原", "第三个本原则是灵魂"],
    en: ["a Principle which transcends Being", "Third comes the Principle, Soul"],
  },
  "plotinus-intellect": {
    zh: ["存在本身就是活动", "理智、理智的思维活动以及思维对象，全都是同一的"],
    en: ["whose very being is an act", "the Intellectual-Principle, its exercise of intellection and the object of intellection all are identical"],
  },
  "plotinus-one": {
    zh: ["不属于万有中的任何一物", "不在地点中，也不在时间中"],
    en: ["The Unity is none of all", "not in place, not in time"],
  },
  augustine: {
    zh: ["时间是什么", "若无人问我，我知道"],
    en: ["What, then, is time", "If no one ask of me, I know"],
  },
  "augustine-restless-heart": {
    zh: ["你为你自己创造了我们", "若不安息于你，便不得安宁"],
    en: ["made us for Yourself", "restless until they rest in You"],
  },
  "augustine-memory-palace": {
    zh: ["记忆的田野和宽阔宫室", "无数形象的宝库"],
    en: ["fields and roomy chambers of memory", "treasures of countless images"],
  },
  "augustine-evil-as-privation": {
    zh: ["一切存在者都是善的", "恶并不是任何实体"],
    en: ["whatsoever is, is good", "is not any substance"],
  },
  "augustine-use-and-enjoyment": {
    zh: ["应当被享受", "应当被使用"],
    en: ["to be enjoyed", "to be used"],
  },
  "augustine-things-and-signs": {
    zh: ["关于事物，就是关于符号", "事物是借助符号而被认识的"],
    en: ["about things or about signs", "things are learned by means of signs"],
  },
  "augustine-two-cities-two-loves": {
    zh: ["尘世之城源于爱自己", "天上之城源于爱上帝"],
    en: ["the earthly by the love of self", "the heavenly by the love of God"],
  },
  "augustine-peace-as-ordered-concord": {
    zh: ["万物的和平就是秩序的宁静", "各自安置在自己的位置"],
    en: ["The peace of all things is the tranquillity of order", "each to its own place"],
  },
  "augustine-divided-will": {
    zh: ["心灵命令身体，身体立刻服从", "心灵命令自己，却遭到抵抗"],
    en: ["The mind commands the body, and it obeys immediately", "the mind commands itself, and is resisted"],
  },
  "augustine-confession-and-self-knowledge": {
    zh: ["不愿从你那里听见他们自己是怎样的人", "又怎能断定我是否说了真话"],
    en: ["unwilling to hear from You what they are", "whether I speak the truth"],
  },
  "augustine-love-as-weight": {
    zh: ["我的重量就是我的爱", "它把我带到我被带往的任何地方"],
    en: ["My weight is my love", "by it am I borne wherever I am borne"],
  },
  socrates: {
    zh: ["未经省察的生活"],
    en: ["life which is unexamined"],
  },
  "socrates-care-of-soul": {
    zh: ["不要首先挂念身体和财产", "主要关心灵魂得到最大的改善"],
    en: ["not to take thought for your persons and your properties", "care about the greatest improvement of the soul"],
  },
  "socrates-gadfly-city": {
    zh: ["神赐给城邦的那只牛虻", "唤醒、劝说并责备你们"],
    en: ["that gadfly which God has given the state", "arousing and persuading and reproaching you"],
  },
  "socrates-limits-of-knowing": {
    zh: ["一无所知，却自以为知道", "既不知道，也不以为自己知道"],
    en: ["knows nothing, and thinks that he knows", "I neither know nor think that I know"],
  },
  "socrates-laws-persuasion": {
    zh: ["服从城邦和祖国的命令", "改变它们对于何为正义的看法"],
    en: ["do what his city and his country order him", "change their view of what is just"],
  },
  "socrates-never-repay-injustice": {
    zh: ["不应报复", "不应以恶报恶"],
    en: ["not to retaliate", "render evil for evil"],
  },
  "socrates-piety-needs-form": {
    zh: ["两三个虔敬行为的例子", "使一切虔敬之物成为虔敬之物的一般形式"],
    en: ["two or three examples of piety", "the general idea which makes all pious things to be pious"],
  },
  "socrates-rhetoric-as-flattery": {
    zh: ["政治术某一部分的幽灵或赝品", "只以快乐为目标，完全不考虑何者最好"],
    en: ["the ghost or counterfeit of a part of politics", "aims at pleasure without any thought of the best"],
  },
  "socrates-worse-to-do-wrong": {
    zh: ["施行不义比遭受不义是更大的恶"],
    en: ["to do is a greater evil than to suffer injustice"],
  },
  "socrates-cross-examined-confidence": {
    zh: ["不断把他绕来绕去", "说明现在与过去的生活"],
    en: ["continually carried round and round by him", "give an account both of his present and past life"],
  },
  "socrates-virtue-and-knowledge": {
    zh: ["没有人会自愿追求恶", "宁取恶而舍善，并非人的本性"],
    en: ["no man voluntarily pursues evil", "To prefer evil to good is not in human nature"],
  },
  "socrates-midwife-of-thought": {
    zh: ["彻底检验年轻心灵所产下的思想", "虚假的偶像，还是高贵而真实的产物"],
    en: ["thoroughly examining whether the thought", "a false idol or a noble and true birth"],
  },
  plato: {
    zh: ["随着整个灵魂一同转动", "从生成的世界转向存在的世界"],
    en: ["movement of the whole soul", "turned from the world of becoming into that of being"],
  },
  aristotle: {
    zh: ["通过做正义的事而成为正义的人", "通过做勇敢的事而成为勇敢的人"],
    en: ["become just by doing just acts", "brave by doing brave acts"],
  },
  epicurus: {
    zh: ["懂得生命界限", "足以消除匮乏之苦"],
    en: ["understands the limits of life", "enough to remove the pain of want"],
  },
  epictetus: {
    zh: ["不是所发生的事情，而是对事情的意见", "认为死亡可怕的那个意见"],
    en: ["not by the things which happen, but by the opinions", "the opinion about death that it is terrible"],
  },
  rousseau: {
    zh: ["欲望的冲动是奴役", "服从我们为自己规定的法律则是自由"],
    en: ["impulse of appetite is slavery", "obedience to a law which we prescribe to ourselves is liberty"],
  },
  kant: {
    zh: ["把人性当作目的", "决不只当作手段"],
    en: ["treat humanity", "as an end withal, never as means only"],
  },
  descartes: {
    zh: ["我存在，我实存", "它必定是真的"],
    en: ["I am, I exist", "’tis necessarily True"],
  },
  "descartes-clear-distinct": {
    zh: ["呈现于正在注意的心灵", "精确且有别于一切其他对象"],
    en: ["present and manifest to the mind giving attention to it", "so precise and different from all other objects"],
  },
  "descartes-divide-difficulties": {
    zh: ["把所考察的每一个困难", "分成若干部分"],
    en: ["divide each of the difficulties under examination", "into as many parts as possible"],
  },
  "descartes-order-simple-to-complex": {
    zh: ["从最简单、最容易认识的对象开始", "逐步上升到对更复杂对象的认识"],
    en: ["objects the simplest and easiest to know", "step by step, to the knowledge of the more complex"],
  },
  "descartes-provisional-customs": {
    zh: ["服从我的国家的法律和习俗", "最温和而且最远离极端的意见"],
    en: ["obey the laws and customs of my country", "the most moderate opinions, and the farthest removed from extremes"],
  },
  "descartes-firm-under-uncertainty": {
    zh: ["在行动中尽我所能保持坚定与果断"],
    en: ["as firm and resolute in my actions as I was able"],
  },
  "descartes-reform-desire": {
    zh: ["征服自己而非命运", "改变自己的欲望而非世界的秩序"],
    en: ["conquer myself rather than fortune", "change my desires rather than the order of the world"],
  },
  "descartes-dream-argument": {
    zh: ["在梦中确信这些寻常情景", "其实我一直赤身躺在被褥之间"],
    en: ["perswaded in a Dream of these usual occurrences", "lying naked between the Sheets"],
  },
  "descartes-wax-and-judgment": {
    zh: ["颜色改变，形状也变了", "只是心灵的审视或观看"],
    en: ["the colour is changed, the shape is alter’d", "the inspection or beholding of the Mind only"],
  },
  "descartes-error-of-the-will": {
    zh: ["我的认识能力", "我的选择能力或意志自由"],
    en: ["my faculty of Knowing", "my faculty of Choosing or Freedome of my Will"],
  },
  "descartes-idea-of-the-infinite": {
    zh: ["比自身更完满的存在者的观念", "发现自身的不完满"],
    en: ["the Idea of a being more perfect then my self", "discover my own Imperfections"],
  },
  "descartes-existence-and-perfect-being": {
    zh: ["不能设想上帝而不同时设想其存在", "存在与上帝不可分离"],
    en: ["cannot think of God but as Existing", "Existence is Inseperable from God"],
  },
  "descartes-body-as-extension": {
    zh: ["身体观念中", "在长、宽、深上延展"],
    en: ["nothing remains in the idea of body", "extended in length, breadth, and depth"],
  },
  "descartes-language-and-reason": {
    zh: ["把不同词语连缀起来", "使自己的思想被理解"],
    en: ["joining together different words", "make their thoughts understood"],
  },
  "plato-cave-adjustment": {
    zh: ["刺眼的光会使他痛苦", "所看见的只是它们的影子"],
    en: ["The glare will distress him", "he had seen the shadows"],
  },
  "plato-power-and-wisdom": {
    zh: ["政治权力与智慧合而为一", "城邦将永远无法摆脱灾难"],
    en: ["political greatness and wisdom meet in one", "cities will never have rest from their evils"],
  },
  "plato-equality-and-forms": {
    zh: ["趋向绝对的相等", "却又达不到它"],
    en: ["aim at this absolute equality", "fall short of it"],
  },
  "plato-learning-as-recollection": {
    zh: ["一切探究和一切学习", "不过是回忆"],
    en: ["All enquiry and all learning", "but recollection"],
  },
  "plato-knowledge-needs-account": {
    zh: ["真实意见与说明相结合", "没有说明的意见"],
    en: ["true opinion, combined with reason", "opinion which had no reason"],
  },
  "plato-soul-in-parts": {
    zh: ["同一部分", "同时以相反的方式"],
    en: ["in the same part", "at the same time, in contrary ways"],
  },
  "plato-justice-as-harmony": {
    zh: ["内在的各种要素彼此干涉", "去做其他要素的工作"],
    en: ["elements within him to interfere with one another", "do the work of others"],
  },
  "plato-ring-of-invisibility": {
    zh: ["两枚这样的魔戒", "始终坚守正义"],
    en: ["two such magic rings", "stand fast in justice"],
  },
  "plato-myth-of-metals": {
    zh: ["高贵谎言", "在他们的构成中掺入了黄金"],
    en: ["one royal lie", "in the composition of these he has mingled gold"],
  },
  "plato-regimes-and-souls": {
    zh: ["政体随着人的性情而变化", "城邦由人的品格生长出来"],
    en: ["Governments vary as the dispositions of men vary", "they grow out of human characters"],
  },
  "plato-practice-of-dying": {
    zh: ["始终在练习死亡", "最不畏惧死亡"],
    en: ["true philosophers are ever studying death", "death is the least terrible"],
  },
  "plato-ladder-of-love": {
    zh: ["从尘世的美开始", "只当作阶梯"],
    en: ["begin from the beauties of earth", "using these as steps only"],
  },
  "plato-writing-cannot-answer": {
    zh: ["庄严地保持沉默", "同一个不变的答案"],
    en: ["preserve a solemn silence", "one unvarying answer"],
  },
  "plato-divided-line": {
    zh: ["可见领域", "可理解领域"],
    en: ["the visible", "the intelligible"],
  },
  "plato-good-beyond-being": {
    zh: ["存在与本质的原因", "超越本质"],
    en: ["their being and essence", "far exceeds essence"],
  },
  "plato-cosmos-as-order": {
    zh: ["从无序中带来秩序"],
    en: ["out of disorder he brought order"],
  },
  "aristotle-flourishing-activity": {
    zh: ["灵魂依照德性而进行的活动", "贯穿完整的一生"],
    en: ["activity of soul in accordance with virtue", "in a complete life"],
  },
  "aristotle-political-animal": {
    zh: ["政治的动物", "正义与不义"],
    en: ["a political animal", "the just and the unjust"],
  },
  "aristotle-mean-relative-to-us": {
    zh: ["相对于我们的中道", "由理性原则来确定"],
    en: ["the mean relative to us", "determined by a rational principle"],
  },
  "aristotle-choice-reveals-ends": {
    zh: ["不是目的", "达到目的的手段"],
    en: ["not about ends", "about means"],
  },
  "aristotle-practical-wisdom": {
    zh: ["真实且依理而行的能力状态", "善与恶"],
    en: ["a true and reasoned state of capacity to act", "good or bad for man"],
  },
  "aristotle-friend-as-another-self": {
    zh: ["另一个自己"],
    en: ["another self"],
  },
  "aristotle-contemplative-life": {
    zh: ["不追求自身之外的目的", "自身特有的快乐"],
    en: ["to aim at no end beyond itself", "its pleasure proper to itself"],
  },
  "aristotle-akrasia-conflict": {
    zh: ["并不真正知道它", "成为他们自身的一部分"],
    en: ["do not yet know it", "become part of themselves"],
  },
  "aristotle-justice-and-proportion": {
    zh: ["合乎比例", "违背比例"],
    en: ["the proportional", "violates the proportion"],
  },
  "aristotle-four-causes": {
    zh: ["事物由之生成并持续存在", "目的，也就是一件事为了什么而被做"],
    en: ["that out of which a thing comes to be and which persists", "end or 'that for the sake of which'"],
  },
  "aristotle-potentiality-actuality": {
    zh: ["现实性", "潜在地"],
    en: ["Actuality", "potentially"],
  },
  "aristotle-substance-and-form": {
    zh: ["原因，也就是形式", "该事物的实体"],
    en: ["the cause, i.e. the form", "the substance of the thing"],
  },
  "aristotle-noncontradiction": {
    zh: ["同一时间、同一方面", "既属于又不属于"],
    en: ["at the same time", "belong and not belong"],
  },
  "aristotle-soul-as-form": {
    zh: ["形式意义上的实体", "潜在地具有生命"],
    en: ["a substance in the sense of the form", "having life potentially within it"],
  },
  "aristotle-perception-without-matter": {
    zh: ["可感形式而不接收其质料", "蜡接收印章的印痕"],
    en: ["the sensible forms of things without the matter", "a piece of wax takes on the impress of a signet-ring"],
  },
  "aristotle-words-and-affections": {
    zh: ["心灵经验的符号", "对所有人却是相同的"],
    en: ["the symbols of mental experience", "are the same for all"],
  },
  locke: {
    zh: ["一张白纸", "来自经验"],
    en: ["white Paper", "From Experience"],
  },
  "locke-personal-identity": {
    zh: ["意识能向后延伸", "个人的同一性"],
    en: ["consciousness can be extended backwards", "identity of that person"],
  },
  "locke-political-consent": {
    zh: ["未经本人同意", "政治权力"],
    en: ["without his own consent", "political power of another"],
  },
  "locke-simple-ideas-received": {
    zh: ["理解力在大部分情况下是被动的", "不能拒绝拥有它们"],
    en: ["Understanding is for the most part passive", "can no more refuse to have"],
  },
  "locke-complex-ideas-made": {
    zh: ["接受全部简单观念时完全被动", "运用自己的若干行动"],
    en: ["wholly Passive in the reception of all its simple Ideas", "exerts several acts of its own"],
  },
  "locke-primary-secondary-qualities": {
    zh: ["第一性质", "第二性质"],
    en: ["primary Qualities", "secondary Qualities"],
  },
  "locke-abstraction-and-generals": {
    zh: ["词语由于被用作一般观念的符号而成为一般词", "观念则由于从中分离出时间、地点的情形"],
    en: ["Words become general, by being made the signs of general Ideas", "Ideas become general, by separating from them the circumstances of Time, or Place"],
  },
  "locke-words-sign-ideas": {
    zh: ["首要或直接意义", "使用者心中的观念"],
    en: ["primary or immediate signification", "THE IDEAS IN THE MIND OF HIM THAT USES THEM"],
  },
  "locke-nominal-real-essence": {
    zh: ["真实本质", "名义本质"],
    en: ["the Real", "the Nominal Essence"],
  },
  "locke-degrees-of-knowledge": {
    zh: ["直觉的、证明的与感性的"],
    en: ["Intuitive, Demonstrative, and Sensitive"],
  },
  "locke-knowledge-as-agreement": {
    zh: ["联系与相合", "不合与冲突"],
    en: ["connexion and agreement", "disagreement and repugnancy"],
  },
  "locke-state-of-nature-law": {
    zh: ["平等而独立", "不应伤害他人"],
    en: ["all equal and independent", "no one ought to harm another"],
  },
  "locke-labor-and-property": {
    zh: ["每个人对于自己的人身却拥有一种所有权", "足够多而且同样好的东西"],
    en: ["every man has a property in his own person", "enough, and as good, left in common for others"],
  },
  "locke-legislative-power-in-trust": {
    zh: ["受托权力", "撤换或改变立法机关"],
    en: ["Fiduciary Power", "remove or alter the Legislative"],
  },
  "locke-toleration-and-civil-power": {
    zh: ["外在强制", "内在确信"],
    en: ["outward Force", "inward Persuasion of the Mind"],
  },
  hume: {
    zh: ["一件事接着另一件事发生", "相伴，却从未显出必然连接"],
    en: ["One event follows another", "conjoined, but never connected"],
  },
  "hume-reason-and-passion": {
    zh: ["激情的奴隶", "服从和侍奉激情"],
    en: ["slave of the passions", "serve and obey them"],
  },
  "hume-bundle-self": {
    zh: ["不能把握自己", "总只有知觉"],
    en: ["never can catch myself", "never can observe any thing but the perception"],
  },
  "hume-copy-principle": {
    zh: ["较微弱的知觉", "较生动知觉的摹本"],
    en: ["more feeble perceptions", "copies of our impressions or more lively ones"],
  },
  "hume-two-objects-reason": {
    zh: ["观念的关系", "事实"],
    en: ["Relations of Ideas", "Matters of Fact"],
  },
  "hume-missing-shade": {
    zh: ["某一种深浅的蓝色", "凭自己的想象补上这个空缺"],
    en: ["one particular shade of blue", "from his own imagination, to supply this deficiency"],
  },
  "hume-particular-ideas": {
    zh: ["就其自身而言是个别的", "在表象中成为一般"],
    en: ["in themselves individual", "general in their representation"],
  },
  "hume-belief-external-world": {
    zh: ["没有把这件事留给他选择", "不确定的推理与思辨"],
    en: ["has not left this to his choice", "uncertain reasonings and speculations"],
  },
  "hume-mitigated-skepticism": {
    zh: ["怀疑、谨慎与谦逊"],
    en: ["doubt, and caution, and modesty"],
  },
  "hume-testimony-miracles": {
    zh: ["没有任何证言足以确立一个奇迹", "证言的虚假，比它试图确立的事实更加神奇"],
    en: ["No testimony is sufficient to establish a miracle", "its falsehood would be more miraculous, than the fact"],
  },
  "hume-liberty-necessity": {
    zh: ["行动或不行动", "依照意志的决定"],
    en: ["acting or not acting", "according to the determinations of the will"],
  },
  "hume-is-ought-transition": {
    zh: ["是与不是", "应当与不应当"],
    en: ["is, and is not", "ought, or an ought not"],
  },
  "hume-moral-sentiment": {
    zh: ["理性告诉我们行动的各种倾向", "人性则作出有利于那些有用且有益之事的区分"],
    en: ["reason instructs us in the several tendencies of actions", "humanity makes a distinction in favour of those which are useful and beneficial"],
  },
  "hume-sympathy-communication": {
    zh: ["所有人的心灵在感受和活动方面都是相似的", "一切情感也会轻易地从一个人传到另一个人"],
    en: ["The minds of all men are similar in their feelings and operations", "all the affections readily pass from one person to another"],
  },
  "hume-circumstances-justice": {
    zh: ["造成极端的丰裕或极端的匮乏", "使正义完全无用"],
    en: ["Produce extreme abundance or extreme necessity", "rendering justice totally useless"],
  },
  "hume-promises-convention": {
    zh: ["履行承诺的道德规则并非自然的", "在人类约定确立承诺之前，承诺是无法理解的"],
    en: ["the rule of morality, which enjoins the performance of promises, is not natural", "a promise wou'd not be intelligible, before human conventions had establish'd it"],
  },
  "hume-standard-of-taste": {
    zh: ["经实践增进、由比较完善、并从一切偏见中清理出来", "趣味与美的真正标准"],
    en: ["improved by practice, perfected by comparison, and cleared of all prejudice", "the true standard of taste and beauty"],
  },
  hobbes: {
    zh: ["一切思想的起源", "感觉"],
    en: ["The Originall of them all", "SENSE"],
  },
  "hobbes-language": {
    zh: ["智者的筹码", "愚者的钱币"],
    en: ["wise mens counters", "mony of fooles"],
  },
  "hobbes-reasoning": {
    zh: ["计算（即加与减）", "约定的一般名称之结果"],
    en: ["Reckoning (that is, Adding and Substracting)", "Consequences of generall names agreed upon"],
  },
  "hobbes-equality": {
    zh: ["身体和心灵的能力方面", "如此平等"],
    en: ["faculties of body, and mind", "so equall"],
  },
  "hobbes-state-of-nature": {
    zh: ["第一，竞争；第二，猜疑；第三，荣誉"],
    en: ["First, Competition; Secondly, Diffidence; Thirdly, Glory"],
  },
  "hobbes-justice": {
    zh: ["履行他们所订立的契约", "空话"],
    en: ["Performe Their Covenants Made", "Empty words"],
  },
  "hobbes-liberty": {
    zh: ["阻碍的不存在"],
    en: ["absence of Opposition"],
  },
  "hobbes-right-nature": {
    zh: ["保存自己生命的自由", "当别人也愿意如此时"],
    en: ["for the preservation of his own Nature", "when others are so too"],
  },
  "hobbes-commonwealth": {
    zh: ["把他们全部的力量和权力授予", "归结为一个意志"],
    en: ["conferre all their power and strength", "unto one Will"],
  },
  "hobbes-sovereignty": {
    zh: ["主权可以被分割", "分割开的权力会彼此摧毁"],
    en: ["the Soveraign Power may be divided", "Powers divided mutually destroy each other"],
  },
  berkeley: {
    zh: ["一个观念的存在就在于被感知", "存在就是被感知"],
    en: ["The existence of an idea consists in being perceived", "Their esse is percipi"],
  },
  "berkeley-abstraction": {
    zh: ["就其自身而言虽是个别的", "成为一般的"],
    en: ["considered in itself, is particular", "becomes general"],
  },
  "berkeley-qualities": {
    zh: ["只能与另一个观念相似", "不能存在于一个不感知的实体中"],
    en: ["an idea can be like nothing but another idea", "can exist in an unperceiving substance"],
  },
  "berkeley-spirit": {
    zh: ["主动的存在", "无法形成灵魂或精神的观念"],
    en: ["active being", "no idea formed of a soul or spirit"],
  },
  "berkeley-laws-signs": {
    zh: ["固定规则或既定方式", "获得一种预见"],
    en: ["set rules or established methods", "a sort of foresight"],
  },
  wollstonecraft: {
    zh: ["足够的心智力量", "通向德性或幸福所指定的道路似乎就只有一条"],
    en: ["sufficient strength of mind", "one way appointed by providence"],
  },
  "wollstonecraft-dependence-cunning": {
    zh: ["支配男人的权力", "支配自己"],
    en: ["power over men", "over themselves"],
  },
  "wollstonecraft-one-standard-of-virtue": {
    zh: ["德性以及知识", "以与男性相同的方式"],
    en: ["the virtue, but the KNOWLEDGE", "by the SAME means as men"],
  },
  "wollstonecraft-civic-representation": {
    zh: ["女性应当拥有自己的代表", "任人专断统治"],
    en: ["women ought to have representatives", "arbitrarily governed"],
  },
  "wollstonecraft-national-education": {
    zh: ["让他们共同受教育", "平等者彼此碰撞"],
    en: ["educating the sexes together", "jostlings of equality"],
  },
  bentham: {
    zh: ["两个至高主人", "痛苦与快乐"],
    en: ["two sovereign masters", "pain and pleasure"],
  },
  "bentham-community-interests": {
    zh: ["虚构的身体", "若干成员之利益的总和"],
    en: ["a fictitious body", "the sum of the interests"],
  },
  "bentham-four-sanctions": {
    zh: ["自然的、政治的、道德的和宗教的", "称为制裁"],
    en: ["the physical, the political, the moral, and the religious", "termed sanctions"],
  },
  "bentham-felicific-circumstances": {
    zh: ["强度", "受它影响的人数"],
    en: ["Its intensity", "the number of persons to whom it extends"],
  },
  "bentham-limits-of-punishment": {
    zh: ["一切惩罚本身都是恶", "排除某种更大的恶"],
    en: ["all punishment in itself is evil", "exclude some greater evil"],
  },
  mill: {
    zh: ["对于他自己", "个人是主权者"],
    en: ["Over himself", "individual is sovereign"],
  },
  "mill-fallibility-free-discussion": {
    zh: ["压制讨论", "自身不会犯错的假定"],
    en: ["silencing of discussion", "assumption of infallibility"],
  },
  "mill-individuality-experiments": {
    zh: ["不同意见", "不同的生活实验"],
    en: ["different opinions", "different experiments of living"],
  },
  schopenhauer: {
    zh: ["世界是我的表象", "反思与抽象的意识"],
    en: ["The world is my idea", "reflective and abstract consciousness"],
  },
  "schopenhauer-principle-sufficient-reason": {
    zh: ["解释现象之间的联系", "不解释现象自身"],
    en: ["explains the connections of phenomena", "not the phenomena themselves"],
  },
  "schopenhauer-body-and-will": {
    zh: ["不是由因果纽带联结的两件不同之物", "是同一件事"],
    en: ["not two different things objectively known", "they are one and the same"],
  },
  "schopenhauer-blind-striving": {
    zh: ["盲目的冲动", "朦胧而无法言说的推动"],
    en: ["blind striving", "an obscure, inarticulate impulse"],
  },
  "schopenhauer-desire-suffering": {
    zh: ["一切意愿都源于缺乏", "至少仍有十个遭到拒绝"],
    en: ["All willing arises from want", "at least ten which are denied"],
  },
  "schopenhauer-aesthetic-contemplation": {
    zh: ["认识挣脱了意志的役使", "纯粹、无意志的认识主体"],
    en: ["Knowledge breaks free from the service of the will", "pure will-less subject of knowledge"],
  },
  "schopenhauer-music-will": {
    zh: ["意志自身的摹本", "它们只谈论影子，音乐却谈论事物自身"],
    en: ["the copy of the will itself", "they speak only of shadows, but it speaks of the thing itself"],
  },
  "schopenhauer-compassion": {
    zh: ["对一切有生命之物的无限同情", "尽己所能帮助所有人"],
    en: ["Boundless compassion for all living beings", "help every one as far as he can"],
  },
  "schopenhauer-denial-of-will": {
    zh: ["使一切意愿寂静下来", "完全无意志的状态"],
    en: ["a quieter of all and every volition", "perfect will-lessness"],
  },
  peirce: {
    zh: ["能够带来实际影响的效果", "对于该对象的全部观念"],
    en: ["might conceivably have practical bearings", "the whole of our conception of the object"],
  },
  "peirce-doubt-belief-habit": {
    zh: ["以某种确定方式行事", "刺激我们探究"],
    en: ["behave in some certain way", "stimulates us to inquiry"],
  },
  "peirce-four-methods-belief": {
    zh: ["某种外在的恒常之物", "这就是科学方法"],
    en: ["some external permanency", "Such is the method of science"],
  },
  "peirce-reality-community-inquiry": {
    zh: ["把他们带向同一个结论", "所有探究者最终注定会同意的意见"],
    en: ["to one and the same conclusion", "fated to be ultimately agreed to by all who investigate"],
  },
  "peirce-triadic-sign": {
    zh: ["在某一方面或某种能力上为某人代表某物", "一个发展得更充分的符号"],
    en: ["stands to somebody for something in some respect or capacity", "a more developed sign"],
  },
  "peirce-abduction": {
    zh: ["一个令人惊异的事实", "有理由猜测 A 为真"],
    en: ["The surprising fact", "there is reason to suspect that A is true"],
  },
  dewey: {
    zh: ["生长是生命的特征", "教育便与生长是一回事"],
    en: ["growth is the characteristic of life", "education is all one with growing"],
  },
  "dewey-democracy-associated-living": {
    zh: ["不只是一种政府形式", "共同生活、共同交流经验的方式"],
    en: ["more than a form of government", "mode of associated living, of conjoint communicated experience"],
  },
  "dewey-experience-and-thinking": {
    zh: ["行动造成的改变反过来成为我们自身的改变", "负载了意义"],
    en: ["the change made by action is reflected back into a change made in us", "loaded with significance"],
  },
  "dewey-habit-social": {
    zh: ["行走既牵涉地面，也牵涉双腿", "人的陪伴与听众"],
    en: ["Walking implicates the ground as well as the legs", "human companionship and audience"],
  },
  "dewey-public-consequences": {
    zh: ["受到交易间接后果影响的人", "系统地照料这些后果"],
    en: ["affected by the indirect consequences of transactions", "those consequences systematically cared for"],
  },
  "epicurus-pleasure-and-sober-reason": {
    zh: ["身体没有痛苦、心灵没有纷扰", "清醒的推理"],
    en: ["absence of pain in the body and of trouble in the soul", "sober reasoning"],
  },
  "epicurus-limit-of-pleasure": {
    zh: ["一切痛苦被消除时达到界限", "此后只有变化"],
    en: ["reaches its limit in the removal of all pain", "after that it only admits of variation"],
  },
  "epicurus-desires-classified": {
    zh: ["有些是自然的，有些是无根据的", "既自然又必要"],
    en: ["some are natural, others are groundless", "necessary as well as natural"],
  },
  "epicurus-simple-food": {
    zh: ["简单的饮食", "最高的快乐"],
    en: ["Plain fare", "the highest possible pleasure"],
  },
  "epicurus-gods-without-fear": {
    zh: ["自身没有烦恼", "每一种这样的冲动都意味着软弱"],
    en: ["has no trouble himself", "every such movement implies weakness"],
  },
  "epicurus-agency-and-necessity": {
    zh: ["通过我们自己的行动发生", "赞美和责备自然也归于它们"],
    en: ["through our own agency", "praise and blame naturally attach"],
  },
  "epicurus-justice-mutual-advantage": {
    zh: ["有用性的象征或表达", "伤害别人，或受到别人的伤害"],
    en: ["a symbol or expression of usefullness", "harming or being harmed"],
  },
  "epicurus-justice-can-change": {
    zh: ["证明为有用的", "它就不再是正义的"],
    en: ["attested to be useful", "this is no longer just"],
  },
  "epicurus-pleasures-have-consequences": {
    zh: ["没有任何快乐本身是恶", "大许多倍的烦恼"],
    en: ["No pleasure is in itself evil", "annoyances many times greater"],
  },
  "epicurus-prudence-greater-gift": {
    zh: ["开端和最大的善，是审慎", "审慎甚至比哲学更为珍贵"],
    en: ["the beginning and the greatest good is prudence", "prudence is a more precious thing even than philosophy"],
  },
  "epicurus-wealth-has-a-limit": {
    zh: ["自然的财富既有界限", "无限遥远之处"],
    en: ["Nature's wealth at once has its bounds", "an infinite distance"],
  },
  "epicurus-security-and-quiet": {
    zh: ["最真实的安全", "宁静私人生活"],
    en: ["in most genuine form the security", "a quiet private life"],
  },
  "epicurus-nature-dispels-fear": {
    zh: ["天体和大气现象的惊吓", "研究自然科学"],
    en: ["alarms at celestial and atmospheric phenomena", "study natural science"],
  },
  "epicurus-future-not-owned": {
    zh: ["既不完全属于我们，也不完全不属于我们", "必定到来"],
    en: ["neither wholly ours nor wholly not ours", "quite certain to come"],
  },
  "epicurus-death": {
    zh: ["死亡这一最可怕的恶，对我们而言算不得什么", "当死亡来临时，我们已不再存在"],
    en: ["the most awful of evils, is nothing to us", "when death is come, we are not"],
  },
  "epicurus-friendship": {
    zh: ["最重要的莫过于获得朋友"],
    en: ["by far the most important is the acquisition of friends"],
  },
  "epictetus-train-desire-first": {
    zh: ["暂时彻底消除欲望", "任何不在我们能力之内的东西"],
    en: ["destroy desire completely for the present", "anything which is not in our power"],
  },
  "epictetus-wish-events-as-they-are": {
    zh: ["如其所是地发生", "安宁流畅的生活"],
    en: ["as they are", "a tranquil flow of life"],
  },
  "epictetus-return-what-was-given": {
    zh: ["我失去了它", "我归还了它"],
    en: ["I have lost it", "I have restored it"],
  },
  "epictetus-price-of-tranquility": {
    zh: ["自由免于纷扰以这个价格出售", "没有什么是无代价获得的"],
    en: ["at such price is sold freedom from perturbation", "nothing is got for nothing"],
  },
  "epictetus-banquet-metaphor": {
    zh: ["像参加宴席那样行事", "不要把欲望伸向它"],
    en: ["behave as at a banquet", "Do not send your desire forward to it"],
  },
  "epictetus-actor-and-role": {
    zh: ["演好交给你的角色", "选择角色则属于另一个人"],
    en: ["act well the part that is given to you", "to select the part, belongs to another"],
  },
  "epictetus-duties-from-relations": {
    zh: ["义务普遍由关系来衡量", "考察关系"],
    en: ["Duties are universally measured by relations", "contemplate the relations"],
  },
  "epictetus-two-handles": {
    zh: ["每件事都有两个把手", "他是你的兄弟"],
    en: ["Everything has two handles", "he is your brother"],
  },
  "epictetus-practice-not-display": {
    zh: ["不要自称哲学家", "展示消化理论之后产生的行动"],
    en: ["call yourself a philosopher", "show the acts which come from their digestion"],
  },
  "epictetus-delay-assent": {
    zh: ["不要被表象的迅疾冲走", "让我检验你"],
    en: ["be not hurried away by the rapidity of the appearance", "let me put you to the test"],
  },
  "epictetus-citizen-of-cosmos": {
    zh: ["世界的公民", "思考事物之间的联系"],
    en: ["a citizen of the world", "considering the connection of things"],
  },
  "epictetus-learning-needs-perplexity": {
    zh: ["抛弃自负", "不可能开始学习"],
    en: ["To throw away self-conceit", "impossible for a man to begin to learn"],
  },
  "epictetus-preserve-character": {
    zh: ["理性动物无法忍受不合乎理性的事", "认为它合乎理性"],
    en: ["To the rational animal only is the irrational intolerable", "opinion that it is rational"],
  },
  "epictetus-philosophy-begins-in-conflict": {
    zh: ["觉察人们彼此意见不合", "发现某种尺度"],
    en: ["a perception of the disagreement of men with one another", "a discovery of some rule"],
  },
  "epictetus-control": {
    zh: ["有些事情在我们能力之内，另一些则不在", "是我们自己的作为"],
    en: ["some are in our power, and others are not", "whatever are our acts"],
  },
  "epictetus-freedom-of-desire": {
    zh: ["欲求任何取决于他人的事物", "他不可能是自由的"],
    en: ["desires any of the things which depend on others", "he cannot be free"],
  },
  "economics-smith-public-works": {
    zh: ["虽可能对一个大社会极为有利", "无法偿还任何个人或少数个人的支出"],
    en: ["in the highest degree advantageous to a great society", "could never repay the expense to any individual, or small number of individuals"],
  },
  "economics-smith-division-specialization": {
    zh: ["劳动生产力上最大的增进", "分工的结果"],
    en: ["greatest improvements in the productive powers of labour", "effects of the division of labour"],
  },
  "economics-smith-market-extent": {
    zh: ["交换能力促成了分工", "受市场范围的限制"],
    en: ["power of exchanging that gives occasion to the division of labour", "extent of the market"],
  },
  "economics-smith-local-knowledge-exchange": {
    zh: ["凭其所处的本地情形", "比任何政治家或立法者"],
    en: ["in his local situation", "much better than any statesman or lawgiver"],
  },
  "economics-smith-moral-spectator": {
    zh: ["审视自己的激情与行为", "假如自己处在他人的位置上"],
    en: ["examine our own passions and conduct", "if in their situation"],
  },
  "economics-ricardo-comparative-advantage": {
    zh: ["即使葡萄牙能用比英国更少的劳动生产这种进口商品", "这种交换仍然可能发生"],
    en: ["notwithstanding that the commodity imported by Portugal could be produced there with less labour than in England", "This exchange might even take place"],
  },
  "economics-ricardo-rent-margin": {
    zh: ["两份等量资本与劳动投入", "产物之间的差额"],
    en: ["two equal quantities of capital and labour", "difference between the produce"],
  },
  "economics-ricardo-distribution": {
    zh: ["支配这种分配的规律", "政治经济学的首要问题"],
    en: ["laws which regulate this distribution", "principal problem in Political Economy"],
  },
  "economics-mill-production-distribution": {
    zh: ["生产的规律和条件具有物理真理的性质", "财富分配则并非如此"],
    en: ["laws and conditions of the Production of wealth", "It is not so with the Distribution of wealth"],
  },
  "economics-mill-stationary-state": {
    zh: ["资本和人口的静止状态", "并不意味着人类改进也处于静止状态"],
    en: ["stationary condition of capital and population", "no stationary state of human improvement"],
  },
  "economics-marx-labor-process": {
    zh: ["劳动过程结束时", "已经存在于劳动者的想象之中"],
    en: ["At the end of every labour-process", "already existed in the imagination of the labourer"],
  },
  "economics-marshall-scissors": {
    zh: ["一把剪刀究竟是上刃还是下刃", "价值究竟由效用还是生产成本支配"],
    en: ["upper or the under blade of a pair of scissors", "value is governed by utility or cost of production"],
  },
  "economics-marshall-elasticity": {
    zh: ["需求的弹性（或反应程度）", "需求量增加得多还是少"],
    en: ["elasticity (or responsiveness) of demand", "amount demanded increases much or little"],
  },
  "economics-veblen-business-industry": {
    zh: ["生产是为了获利而进行的", "以获利为目的来控制"],
    en: ["production of goods and services is carried on for gain", "controlled by business men with a view to gain"],
  },
  "economics-veblen-conspicuous-consumption": {
    zh: ["炫耀性地消费贵重物品", "取得声望的一种手段"],
    en: ["Conspicuous consumption of valuable goods", "a means of reputability"],
  },
  "economics-fisher-equation-exchange": {
    zh: ["交换方程式", "所有个别交换所包含的各个方程式之和"],
    en: ["equation of exchange", "sum of the equations involved in all individual exchanges"],
  },
  "economics-principles-pigou-private-social-product": {
    zh: ["社会净产物", "企业家所关心的不是社会净产物，而只是其经营活动的行业净产物"],
    en: ["social net product", "industrialists are interested, not in the social, but only in the trade, net product"],
  },
  "economics-principles-pigou-corrective-tax-subsidy": {
    zh: ["消除该领域中的这种差异", "补助与税收"],
    en: ["remove the divergence in any field", "bounties and taxes"],
  },
  "economics-principles-pigou-price-discrimination": {
    zh: ["把顾客区分为若干不同群体", "分别收取一种垄断价格"],
    en: ["distinguish among his customers n different groups", "charge a separate monopoly price"],
  },
  "economics-principles-henry-george-land-value-tax": {
    zh: ["对改良物征税，其效果是减少改良", "土地的全部价值都可以通过征税取得"],
    en: ["tax improvements, and the effect is to lessen improvement", "the whole value of land may be taken in taxation"],
  },
  "economics-principles-hume-price-specie-flow": {
    zh: ["邻国无力向我们购买", "我们的货币会流出"],
    en: ["no neighbouring nations could afford to buy from us", "our money flow out"],
  },
  "economics-principles-bagehot-lender-last-resort": {
    zh: ["自由而有力地放款", "一切良好的银行担保品"],
    en: ["advance freely and vigorously", "all good banking securities"],
  },
  "economics-principles-jevons-final-degree-utility": {
    zh: ["最终效用程度", "现有存量可能再增加"],
    en: ["final degree of utility", "next possible addition"],
  },
  "economics-principles-jevons-equimarginal-allocation": {
    zh: ["两种用途中的最终效用程度相等"],
    en: ["final degrees of utility in the two uses equal"],
  },
  "science-darwin-variation": {
    zh: ["除非有有利变异出现", "自然选择便无从作为"],
    en: ["unless profitable variations do occur", "natural selection can do nothing"],
  },
  "science-darwin-biogeography": {
    zh: ["与最近大陆的生物具有亲缘关系", "并非真正相同的物种"],
    en: ["affinity to those of the nearest mainland", "without being actually the same species"],
  },
  "science-mendel-design": {
    zh: ["具有恒定的区别性状", "不受任何外来花粉影响"],
    en: ["Possess constant differentiating characters", "protected from the influence of all foreign pollen"],
  },
  "science-mendel-ratios": {
    zh: ["三比一平均比例", "三株表现显性性状，一株表现隐性性状"],
    en: ["average proportion of three to one", "three display the dominant character and one the recessive"],
  },
  "science-mendel-gametes": {
    zh: ["卵细胞与花粉细胞", "以相等数量代表了"],
    en: ["egg and pollen cells", "represent in equal numbers"],
  },
  "locke-probability-and-assent": {
    zh: ["考察概率的一切根据", "以相应强弱的赞同"],
    en: ["examine all the grounds of probability", "with a more or less firm assent"],
  },
  "locke-limits-of-knowledge": {
    zh: ["我们的知识范围", "甚至小于我们自身观念的范围"],
    en: ["the extent of our knowledge", "even of the extent of our own ideas"],
  },
  "mill-social-authority-boundary": {
    zh: ["只关乎他自己福祉", "伤害他人的行为"],
    en: ["concerns his own good", "Acts injurious to others"],
  },
  "mill-happiness-as-end": {
    zh: ["促进幸福", "快乐与免除痛苦"],
    en: ["promote happiness", "pleasure, and the absence of pain"],
  },
  "mill-higher-pleasures": {
    zh: ["更可欲、更有价值", "品质上的优越性"],
    en: ["more desirable and more valuable", "a superiority in quality"],
  },
  "mill-internal-sanction": {
    zh: ["人类的社会情感", "与同类相结合为一体的欲望"],
    en: ["social feelings of mankind", "desire to be in unity with our fellow creatures"],
  },
  "mill-proof-of-utility": {
    zh: ["确实看见它", "确实欲求它"],
    en: ["people actually see it", "people do actually desire it"],
  },
  "mill-justice-security": {
    zh: ["安全", "没有任何人能够没有安全"],
    en: ["security", "no human being can possibly do without"],
  },
  "mill-subjection-women": {
    zh: ["我否认", "极其人为的东西"],
    en: ["I deny that any one knows, or can know, the nature of the two sexes", "an eminently artificial thing"],
  },
  russell: {
    zh: ["有且只有一个项", "该项具有性质 φ"],
    en: ["one and only one term", "that one has the property φ"],
  },
  "russell-acquaintance-description": {
    zh: ["直接觉察到", "亲知"],
    en: ["directly aware", "acquaintance"],
  },
  "russell-appearance-reality": {
    zh: ["某种知识", "任何理性的人都无法怀疑"],
    en: ["any knowledge in the world", "no reasonable man could doubt it"],
  },
  "russell-induction": {
    zh: ["过去无论实现过多少次", "未来仍将实现的证据"],
    en: ["fulfilled in the past", "evidence that it will be fulfilled in the future"],
  },
  "russell-universals": {
    zh: ["共相的世界", "存在之域"],
    en: ["world of universals", "world of being"],
  },
  "russell-logical-atomism": {
    zh: ["世界包含事实", "而为真或为假"],
    en: ["The world contains facts", "either true or false"],
  },
  "russell-theory-of-types": {
    zh: ["不能是该集合的成员", "这个集合就没有总体"],
    en: ["must not be one of the collection", "the said collection has no total"],
  },
  "russell-logical-construction": {
    zh: ["没有必要赋予理想要素任何实在性", "接受为逻辑构造"],
    en: ["assign any reality to ideal elements", "accept them as logical constructions"],
  },
  james: {
    zh: ["实际后果", "什么实际差别"],
    en: ["practical consequences", "What difference would it practically make"],
  },
  "james-truth-verification": {
    zh: ["真理发生在一个观念上", "被造就为真实"],
    en: ["Truth HAPPENS to an idea", "is MADE true by events"],
  },
  "james-stream-of-thought": {
    zh: ["意识并不向自身呈现", "被切碎的一段段"],
    en: ["Consciousness, then", "chopped up in bits"],
  },
  "james-genuine-option": {
    zh: ["不仅可以、而且必须作出决定", "本身就是一种激情的决定"],
    en: ["not only lawfully may, but must, decide", "is itself a passional decision"],
  },
  "james-radical-empiricism-relations": {
    zh: ["不能把任何未经直接经验的要素纳入构造", "连接经验的关系本身必须是被经验到的关系"],
    en: ["must neither admit into its constructions any element that is not directly experienced", "relations that connect experiences must themselves be experienced relations"],
  },
  "james-fruits-not-origins": {
    zh: ["凭着它们的果实，而不是根源", "实践也是我们真正成为基督徒的唯一可靠证据"],
    en: ["By their fruits ye shall know them, not by their roots", "Our practice is the only sure evidence"],
  },
  machiavelli: {
    zh: ["真实真相", "忽视实际所为而只顾应当所为"],
    en: ["real truth of the matter", "neglects what is done for what ought to be done"],
  },
  "machiavelli-fear-love": {
    zh: ["受人畏惧要比受人爱戴安全得多", "避免仇恨"],
    en: ["much safer to be feared than loved", "avoids hatred"],
  },
  "machiavelli-fox-lion": {
    zh: ["做狐狸以识破陷阱", "做狮子以震慑群狼"],
    en: ["a fox to discover the snares", "a lion to terrify the wolves"],
  },
  "machiavelli-fortune": {
    zh: ["命运是我们一半行动的裁决者", "留给我们支配"],
    en: ["Fortune is the arbiter of one-half of our actions", "leaves us to direct the other half"],
  },
  "machiavelli-conflict-liberty": {
    zh: ["罗马获得自由的首要原因", "有利于自由的法律"],
    en: ["prime cause of Rome becoming free", "laws favourable to freedom"],
  },
  "machiavelli-founding": {
    zh: ["必须依靠一个人", "交由众人维护"],
    en: ["unless by a single person", "entrusted to the care of many"],
  },
  francis_bacon: {
    zh: ["知识与人的力量是同义的", "自然只有通过服从才能被征服"],
    en: ["Knowledge and human power are synonymous", "nature is only subdued by submission"],
  },
  "francis-bacon-method": {
    zh: ["从感觉与个别事物建立公理", "持续而逐级上升"],
    en: ["constructs its axioms from the senses and particulars", "ascending continually and gradually"],
  },
  "francis-bacon-idols": {
    zh: ["四类幻象", "围困着人的心灵"],
    en: ["Four species of idols", "beset the human mind"],
  },
  "francis-bacon-light-fruit": {
    zh: ["帮助发现原因与公理", "照明的实验"],
    en: ["discovery of causes and axioms", "experiments we have termed enlightening"],
  },
  "francis-bacon-ladder": {
    zh: ["连续的阶梯", "简单枚举推进的归纳是幼稚的"],
    en: ["a true scale and successive steps", "induction which proceeds by simple enumeration is puerile"],
  },
  spinoza: {
    zh: ["神圣本性的必然性", "不会发现任何值得仇恨、嘲笑或轻蔑的事物"],
    en: ["necessity of the divine nature", "anything worthy of hatred, derision, or contempt"],
  },
  "spinoza-free-person": {
    zh: ["最少思考的就是死亡", "对生命的沉思"],
    en: ["thinks of death least of all things", "meditation not of death but of life"],
  },
  "spinoza-understanding-affect": {
    zh: ["清楚而分明的观念"],
    en: ["clear and distinct idea thereof"],
  },
  "spinoza-one-substance": {
    zh: ["除神之外", "任何实体"],
    en: ["Besides God", "no substance"],
  },
  "spinoza-nothing-contingent": {
    zh: ["没有任何偶然之物", "神圣本性的必然性"],
    en: ["Nothing in the universe is contingent", "necessity of the divine nature"],
  },
  "spinoza-freedom-as-self-necessity": {
    zh: ["仅凭自身本性的必然性", "行动仅由自身决定"],
    en: ["necessity of its own nature", "action is determined by itself alone"],
  },
  "spinoza-order-of-ideas-and-things": {
    zh: ["观念的次序和联系", "事物的次序和联系"],
    en: ["order and connection of ideas", "order and connection of things"],
  },
  "spinoza-mind-idea-of-body": {
    zh: ["人类心灵的观念之对象是身体", "而不是别的东西"],
    en: ["object of the idea constituting the human mind is the body", "and nothing else"],
  },
  "spinoza-conatus": {
    zh: ["努力保持自身存在", "现实本质"],
    en: ["endeavours to persist in its own being", "actual essence"],
  },
  "spinoza-desire-as-essence": {
    zh: ["欲望是人的现实本质", "某种特定活动"],
    en: ["Desire is the actual essence of man", "particular activity"],
  },
  "spinoza-joy-as-transition": {
    zh: ["从较小的完满向较大的完满的过渡"],
    en: ["transition of a man from a less to a greater perfection"],
  },
  "spinoza-imitation-of-affects": {
    zh: ["与我们相似", "相似的情感"],
    en: ["like ourselves", "like emotion"],
  },
  "spinoza-good-as-relational": {
    zh: ["与我们的本性相合", "必然是善的"],
    en: ["in harmony with our nature", "necessarily good"],
  },
  "spinoza-state-end-freedom": {
    zh: ["安全地发展身心", "政府的真正目的就是自由"],
    en: ["develope their minds and bodies in security", "true aim of government is liberty"],
  },
  "spinoza-faith-and-philosophy": {
    zh: ["并不教授哲学", "而只教授服从"],
    en: ["does not teach philosophy", "but merely obedience"],
  },
  seneca: {
    zh: ["为了你自己而解放自己", "把你的时间收拢并保存起来"],
    en: ["set yourself free for your own sake", "gather and save your time"],
  },
  "seneca-anticipation": {
    zh: ["我们在想象中受苦，往往多于在现实中", "有些在应有时刻之前折磨我们"],
    en: ["we suffer more often in imagination than in reality", "some torment us before they ought"],
  },
  "seneca-anger": {
    zh: ["理性希望作出公正的判决", "愤怒只希望自己的判决被认为公正"],
    en: ["reason wishes to give a just decision", "anger wishes its decision to be thought just"],
  },
  "seneca-slavery": {
    zh: ["与你出自同一种族", "他与你平等地呼吸、生活，也同样死去"],
    en: ["sprang from the same stock", "on equal terms with yourself breathes, lives, and dies"],
  },
  "seneca-friendship": {
    zh: ["一个我愿为之赴死的人", "是一笔交易，而不是友谊"],
    en: ["someone for whom I may die", "is a bargain and not a friendship"],
  },
  "rousseau-compassion-prior-to-reason": {
    zh: ["怜悯是一种自然感情", "有助于保存整个物种"],
    en: ["compassion is a natural feeling", "contributes to the preservation of the whole species"],
  },
  "rousseau-perfectibility-double-edge": {
    zh: ["近乎无限的能力", "一切人类不幸的根源"],
    en: ["almost unlimited faculty", "source of all human misfortunes"],
  },
  "rousseau-amour-propre-comparison": {
    zh: ["自爱是一种自然感情", "利己心则是一种纯属相对的、人为的感情"],
    en: ["Self-respect is a natural feeling", "Egoism is a purely relative and factitious feeling"],
  },
  "rousseau-property-enclosure": {
    zh: ["这是我的", "公民社会的真正奠基者"],
    en: ["This is mine", "real founder of civil society"],
  },
  "rousseau-metallurgy-agriculture-inequality": {
    zh: ["冶金和农业", "使人文明，也毁掉了人性"],
    en: ["Metallurgy and agriculture", "first civilised men, and ruined humanity"],
  },
  "rousseau-luxury-corrupts-virtue": {
    zh: ["奢侈", "由懒惰与虚荣产生"],
    en: ["luxury", "indolence and vanity"],
  },
  "rousseau-childhood-own-form": {
    zh: ["童年有它自己的观看、思考和感受方式", "拿我们的方式替代它"],
    en: ["Childhood has its own ways of seeing, thinking, and feeling", "substitute our ways"],
  },
  "rousseau-negative-education": {
    zh: ["最初几年的教育应当仅仅是否定性的", "保护心灵免受恶习侵染"],
    en: ["education of the earliest years should be merely negative", "preserving the heart from vice"],
  },
  "rousseau-conscience-inner-guide": {
    zh: ["良知！良知！", "善恶无误的裁判"],
    en: ["Conscience! Conscience!", "infallible judge of good and evil"],
  },
  "rousseau-solitary-reverie-existence": {
    zh: ["不在我们自身之外", "仅享受这一存在便已是充分的幸福"],
    en: ["In nothing beyond ourselves", "the enjoyment of that alone is sufficient felicity"],
  },
  "rousseau-language-born-from-passion": {
    zh: ["不是饥饿或口渴", "爱、恨、怜悯或愤怒"],
    en: ["neither hunger nor thirst", "love, hate, pity, or anger"],
  },
  "rousseau-sovereignty-not-represented": {
    zh: ["主权因不可转让的同一理由而不能被代表", "他们只在选举议会议员期间是自由的"],
    en: ["Sovereignty, for the same reason as makes it inalienable, cannot be represented", "free only during the election of members of parliament"],
  },
  "rousseau-legislator-extraordinary": {
    zh: ["高等智慧", "唯有神祇才能为人类制定法律"],
    en: ["a superior intelligence", "It would take gods to give men laws"],
  },
  "rousseau-civil-religion-tolerance": {
    zh: ["宽容一切也宽容其他宗教的宗教", "不包含任何违背公民义务的内容"],
    en: ["tolerance should be given to all religions that tolerate others", "nothing contrary to the duties of citizenship"],
  },
  "kant-dare-to-know": {
    zh: ["摆脱由自己造成的未成年状态", "要有勇气运用你自己的理智"],
    en: ["quitting the nonage occasioned by himself", "Have courage to make use of thy own understanding"],
  },
  "kant-cosmopolitan-hospitality": {
    zh: ["不以敌意相待", "不得把他当作敌人"],
    en: ["to be treated by its owner without hostility", "he must not be treated as an enemy"],
  },
  "kant-copernican-turn": {
    zh: ["我们的认识必须符合对象", "对象必须符合我们的认识"],
    en: ["our cognition must conform to the objects", "the objects must conform to our cognition"],
  },
  "kant-intuitions-concepts": {
    zh: ["没有内容的思想是空的", "没有概念的直观是盲的"],
    en: ["Thoughts without content are void", "intuitions without conceptions, blind"],
  },
  "kant-space-form-intuition": {
    zh: ["空间不是从外部经验中得来的概念", "空间的表象必须已经作为基础而存在"],
    en: ["Space is not a conception which has been derived from outward experiences", "the representation of space must already exist as a foundation"],
  },
  "kant-synthetic-a-priori": {
    zh: ["先天综合判断如何可能"],
    en: ["How are synthetical judgements à priori possible"],
  },
  "kant-phenomena-noumena-limit": {
    zh: ["只是一个限制性概念", "只有消极的用途"],
    en: ["merely a limitative conception", "only of negative use"],
  },
  "kant-ideas-regulative-use": {
    zh: ["理性的统一是体系的统一", "不是把自身统治扩展到对象的客观原则"],
    en: ["The unity of reason is the unity of system", "not an objective principle, extending its dominion over objects"],
  },
  "kant-good-will": {
    zh: ["除了善良意志", "无条件的善"],
    en: ["good, without qualification", "except a good will"],
  },
  "kant-universal-law-test": {
    zh: ["同时能够意愿它成为普遍法则"],
    en: ["at the same time will that it should become a universal law"],
  },
  "kant-autonomy-self-legislation": {
    zh: ["意志成为它自身的法则"],
    en: ["a law to itself"],
  },
  "kant-propensity-radical-evil": {
    zh: ["颠倒了纳入自己准则的各种动机的伦理次序", "把自私的动机作为遵守法则的条件"],
    en: ["inverts the ethical order of those springs which he adopts into his maxims", "makes the selfish spring condition his observance of the law"],
  },
  "kant-disinterested-beauty": {
    zh: ["无利害的"],
    en: ["disinterested"],
  },
  "kant-purposiveness-without-purpose": {
    zh: ["无目的的合目的性"],
    en: ["purposiveness without purpose"],
  },
  "kant-unsocial-sociability": {
    zh: ["不合群的合群性", "不断威胁着要瓦解社会状态"],
    en: ["the unsocial sociality of man", "continually threatening to dissolve it"],
  },
  "kant-federation-peace": {
    zh: ["自由国家的联盟"],
    en: ["a federation of free states"],
  },
  hegel: {
    zh: ["真理是整体", "通过自身发展过程达到完成"],
    en: ["The truth is the whole", "reaching its completeness through the process of its own development"],
  },
  "hegel-owl-of-minerva": {
    zh: ["密涅瓦的猫头鹰", "暮色渐浓时才起飞"],
    en: ["The owl of Minerva", "when the shades of night are gathering"],
  },
  "hegel-recognition": {
    zh: ["为另一个自我意识而存在", "只有在得到承认时才存在"],
    en: ["exists for another self-consciousness", "only by being acknowledged or “recognized”"],
  },
  "hegel-sense-certainty": {
    zh: ["语言更为真实", "根本不可能用言词表达"],
    en: ["Language, however, as we see, is the more truthful", "not possible at all for us even to express in words"],
  },
  "hegel-perception-thing-properties": {
    zh: ["经过中介的原则", "具有许多属性的物"],
    en: ["a mediated principle", "the thing with many properties"],
  },
  "hegel-force-law": {
    zh: ["表达在法则中", "不稳定现象的稳定呈现"],
    en: ["expressed in the law", "stable presentment or picture of unstable appearance"],
  },
  "hegel-unhappy-consciousness": {
    zh: ["在自身内部发生分裂并彼此冲突", "获得了胜利和统一的安宁"],
    en: ["divided and at variance within itself", "the victory and rest of unity"],
  },
  "hegel-reason-in-the-world": {
    zh: ["理性是自觉确信自身即是一切实在"],
    en: ["Reason is the conscious certainty of being all reality"],
  },
  "hegel-determinate-negation": {
    zh: ["确定的否定", "一种新的形态便立即由此产生"],
    en: ["determinate negation", "a new form has thereby immediately arisen"],
  },
  "hegel-true-infinite": {
    zh: ["并不是真正的无限", "在自己的他者中回到自身"],
    en: ["is not the real infinite", "coming to itself in its other"],
  },
  "hegel-actual-rational": {
    zh: ["合乎理性的都是现实的", "现实的都是合乎理性的"],
    en: ["What is rational is real", "what is real is rational"],
  },
  "hegel-ethical-life": {
    zh: ["伦理体系是自由的理念", "通过自我意识的行动获得现实性"],
    en: ["The ethical system is the idea of freedom", "through the action of self-consciousness its actuality"],
  },
  "hegel-civil-society-dependence": {
    zh: ["相互依赖的体系", "同所有人的生计、幸福和权利交织在一起"],
    en: ["a system of mutual dependence", "with the subsistence, happiness, and right of all"],
  },
  "hegel-poverty-rabble": {
    zh: ["跌到社会成员所必需的生活水准之下", "财富则不成比例地积聚在少数人手中"],
    en: ["sink below the standard of living regarded as essential", "wealth accumulates disproportionately in the hands of a few"],
  },
  "hegel-state-concrete-freedom": {
    zh: ["国家是具体自由的体现", "个人个性的权利也获得充分承认"],
    en: ["The state is the embodiment of concrete freedom", "the rights of personal individuality receive adequate recognition"],
  },
  "hegel-history-consciousness-freedom": {
    zh: ["世界历史无非是自由意识的进步", "依其本性的必然性而发展"],
    en: ["The History of the world is none other than the progress of the consciousness of Freedom", "according to the necessity of its nature"],
  },
  "hegel-cunning-of-reason": {
    zh: ["理性让激情为自己工作", "付出代价并遭受损失"],
    en: ["sets the passions to work for itself", "pays the penalty, and suffers loss"],
  },
  nietzsche: {
    zh: ["你的良知说什么", "成为你所是的那个人"],
    en: ["What Saith thy Conscience", "become what thou art"],
  },
  "nietzsche-three-metamorphoses": {
    zh: ["精神的三种变形", "最后狮子如何变成孩子"],
    en: ["Three metamorphoses of the spirit", "the lion at last a child"],
  },
  "nietzsche-amor-fati": {
    zh: ["事物中的必然性质看作美", "命运之爱"],
    en: ["perceive the necessary characters in things as the beautiful", "Amor fati"],
  },
  "nietzsche-death-of-god": {
    zh: ["上帝死了", "是我们杀死了他"],
    en: ["God is dead", "we have killed him"],
  },
  "nietzsche-eternal-recurrence": {
    zh: ["你必须再活一次", "并且还要活无数次"],
    en: ["thou must live it once more", "and also innumerable times"],
  },
  "nietzsche-perspectival-knowing": {
    zh: ["从某种视角出发的观看", "不同的眼睛"],
    en: ["seeing from a perspective", "different eyes"],
  },
  "nietzsche-genealogy-of-values": {
    zh: ["对道德价值进行批判", "这些价值本身的价值"],
    en: ["critique of moral values", "the value of these values"],
  },
  "nietzsche-ressentiment-slave-values": {
    zh: ["怨恨本身变得具有创造性", "在想象的复仇中寻求补偿"],
    en: ["resentment becoming creative", "compensation in an imaginary revenge"],
  },
  "nietzsche-bad-conscience": {
    zh: ["未能向外宣泄的本能", "都会转向内部"],
    en: ["do not find a vent without", "turn inwards"],
  },
  "nietzsche-promise-sovereign-individual": {
    zh: ["能够许诺的动物", "人的问题"],
    en: ["animal that can promise", "problem of man"],
  },
  "nietzsche-ascetic-ideal": {
    zh: ["痛苦的无意义", "宁愿意欲虚无"],
    en: ["senselessness of suffering", "man will wish Nothingness"],
  },
  "nietzsche-will-to-truth": {
    zh: ["没有什么比真理更必要", "这种绝对的求真意志"],
    en: ["nothing more necessary than truth", "This absolute will to truth"],
  },
  "nietzsche-active-forgetting": {
    zh: ["具有肯定性的阻隔力量", "为新的东西腾出空间"],
    en: ["power of obstruction", "make room again for the new"],
  },
  "nietzsche-history-for-life": {
    zh: ["历史服务于生命", "残害并贬损生命"],
    en: ["history only so far as it serves life", "mutilates and degrades life"],
  },
  "nietzsche-apollonian-dionysian": {
    zh: ["日神与酒神的二重性", "不断冲突，只偶尔达成和解"],
    en: ["duplexity of the Apollonian and the Dionysian", "perpetual conflicts with only periodically intervening reconciliations"],
  },
  "nietzsche-truth-mobile-metaphors": {
    zh: ["一支由隐喻、转喻和拟人构成的流动军队", "已经忘记其为幻象的幻象"],
    en: ["A mobile army of metaphors, metonymies, anthropomorphisms", "illusions of which one has forgotten that they are illusions"],
  },
  "nietzsche-innocence-of-becoming": {
    zh: ["是命运的一部分", "整体之外并没有任何东西"],
    en: ["one is a piece of fate", "there is nothing outside the whole"],
  },
  thomas_aquinas: {
    zh: ["五种方式来证明", "第一推动者"],
    en: ["proved in five ways", "a first mover, put in motion by no other"],
  },
  "thomas-aquinas-analogy": {
    zh: ["类比意义", "依照比例"],
    en: ["an analogous sense", "according to proportion"],
  },
  "thomas-aquinas-conscience": {
    zh: ["良知不是一种能力，而是一种行动", "把知识应用到一个个别情形"],
    en: ["conscience is not a power, but an act", "knowledge applied to an individual case"],
  },
  "thomas-aquinas-abstraction": {
    zh: ["从感官形象中进行抽象", "关于非物质事物的某种知识"],
    en: ["abstracting from the phantasms", "some knowledge of immaterial things"],
  },
  "thomas-aquinas-law": {
    zh: ["为了共同善而作出的理性安排", "并予以公布"],
    en: ["an ordinance of reason for the common good", "and promulgated"],
  },
  "thomas-aquinas-natural-law": {
    zh: ["理性受造物对永恒法的参与", "自然法"],
    en: ["participation of the eternal law in the rational creature", "the natural law"],
  },
  "thomas-aquinas-practical-principle": {
    zh: ["善应当被实行和追求", "恶应当被避免"],
    en: ["good is to be done and pursued", "evil is to be avoided"],
  },
  "thomas-aquinas-unjust-law": {
    zh: ["不义的法律", "与其说是法律，不如说是暴力行为"],
    en: ["Laws may be unjust", "acts of violence rather than laws"],
  },
  "thomas-aquinas-happiness": {
    zh: ["任何受造之善都不可能构成人的幸福", "使欲求完全平息"],
    en: ["impossible for any created good to constitute man's happiness", "lulls the appetite altogether"],
  },
  "thomas-aquinas-faith-reason": {
    zh: ["理性的自然指示必定是真实的", "信仰的真理就不可能与自然理性所知的原则相反"],
    en: ["natural dictates of reason must certainly be quite true", "truth of faith to be contrary to principles known by natural reason"],
  },
  leibniz: {
    zh: ["矛盾原则", "充分理由原则"],
    en: ["principles, that of contradiction", "that of the sufficient reason"],
  },
  "leibniz-complete-concept": {
    zh: ["每一个真实的述谓都在事物本性中有某种根据", "主体的内容必须始终包含谓词的内容"],
    en: ["Every true predication has some basis in the nature of things", "content of the subject must always include that of the predicate"],
  },
  "leibniz-windowless": {
    zh: ["单子没有任何窗口", "进入或离开"],
    en: ["monads have no windows", "anything can enter or depart"],
  },
  "leibniz-identity": {
    zh: ["每一个单子都必须与其他每一个单子不同", "两个存在者完全相同"],
    en: ["each monad should differ from every other", "two beings exactly alike"],
  },
  "leibniz-perception-appetition": {
    zh: ["表征多样性的过渡状态", "可以称为欲求"],
    en: ["transient state, which involves and represents multitude", "may be called appetition"],
  },
  "leibniz-two-truths": {
    zh: ["推理的真理是必然的", "事实的真理是偶然的"],
    en: ["Truths of reasoning are necessary", "those of fact are contingent"],
  },
  "leibniz-possible-worlds": {
    zh: ["无限多个可能宇宙", "最佳者得以存在"],
    en: ["an infinity of possible universes", "existence of the Best"],
  },
  "leibniz-perspectives": {
    zh: ["永恒而有生命的镜子", "每个单子从不同视点"],
    en: ["living, perpetual mirror of the universe", "different points of view of each monad"],
  },
  "leibniz-harmony": {
    zh: ["预定和谐", "动力因与目的因这两个领域彼此和谐"],
    en: ["pre-established harmony", "two realms, that of efficient causes and that of final causes, are in harmony"],
  },
  "leibniz-small-perceptions": {
    zh: ["每一个如此微小的声音有所知觉", "十万个虚无不可能组成某种东西"],
    en: ["some perception of each one of these noises", "a hundred thousand nothings cannot make something"],
  },
  "science-kepler-eight-minutes": {
    zh: ["八角分误差", "天文学的全面改革"],
    en: ["error of eight minutes", "entire reform of Astronomy"],
  },
  "science-kepler-area": {
    zh: ["椭圆的总面积", "总周期时间"],
    en: ["total area of the ellipse", "total periodic time"],
  },
  "science-kepler-ellipse": {
    zh: ["行星轨道是椭圆", "太阳位于这个椭圆的一个焦点"],
    en: ["planetary orbit is elliptical", "sun, the source of movement, is at one of the foci of this ellipse"],
  },
  "science-kepler-harmonic-law": {
    zh: ["周期之比", "平均距离——也就是各自天球半径——的 3/2 次幂之比"],
    en: ["ratio which exists between the periodic times", "3/2th power of the mean distances"],
  },
  "science-newton-rules-causes": {
    zh: ["既真实、又足以解释", "同样的自然结果"],
    en: ["both true and sufficient to explain", "same natural effects"],
  },
  "science-newton-rule-third": {
    zh: ["我们实验所能触及的一切物体", "所有物体的普遍性质"],
    en: ["all bodies within the reach of our experiments", "universal qualities of all bodies whatsoever"],
  },
  "science-newton-rule-fourth": {
    zh: ["准确或极其接近真实", "直到出现其他现象"],
    en: ["accurately or very nearly true", "till such time as other phenomena occur"],
  },
  "science-newton-no-feigned-hypothesis": {
    zh: ["我不虚构假说", "在实验哲学中都没有位置"],
    en: ["I frame no hypotheses", "have no place in experimental philosophy"],
  },
  "science-newton-analysis-synthesis": {
    zh: ["先采用分析法，再采用综合法", "用它们解释由此产生的现象"],
    en: ["Method of Analysis, ought ever to precede the Method of Composition", "explaining the Phænomena proceeding from them"],
  },
  "science-maxwell-analogy": {
    zh: ["物理类比", "使二者能够相互阐明"],
    en: ["physical analogy", "makes each of them illustrate the other"],
  },
  "science-maxwell-field-energy": {
    zh: ["能量存在于电磁场中", "带电体与磁体周围的空间"],
    en: ["resides in the electromagnetic field", "space surrounding the electrified and magnetic bodies"],
  },
  "science-maxwell-displacement-current": {
    zh: ["位移本身还不构成电流", "它的变化会"],
    en: ["displacement does not amount to a current", "its variations constitute currents"],
  },
  "science-maxwell-light": {
    zh: ["光与磁是同一种实体的不同状态", "光是依照电磁定律通过场传播的一种电磁扰动"],
    en: ["light and magnetism are affections of the same substance", "light is an electromagnetic disturbance propagated through the field according to electromagnetic laws"],
  },
  "science-maxwell-gas-distribution": {
    zh: ["按照某种规则在粒子之间分配", "速度落在某些界限之间的粒子平均数仍可确定"],
    en: ["divided among the particles according to some regular law", "average number of particles whose velocity lies between certain limits being ascertainable"],
  },
  "science-bernard-induced-observation": {
    zh: ["实验从根本上只是一种为了某个目的而被引发的观察", "控制或检验某个实验观念的价值"],
    en: ["experiment is fundamentally just an observation induced with some object or other", "control or verify the value of an experimental idea"],
  },
  "science-bernard-hypothesis": {
    zh: ["以假说的形式呈现", "提交给实验的判据"],
    en: ["presents itself in the form of an hypothesis", "submitted to the criterion of experiment"],
  },
  "science-bernard-counterproof": {
    zh: ["反证决定着我们是否找到了现象中所寻求的因果关系", "移除已被认定的原因"],
    en: ["Counterproof decides whether the relation of cause to effect", "removes the accepted cause"],
  },
  "science-bernard-milieu-interieur": {
    zh: ["维持着同外部宇宙环境进行交换和平衡的必要关系", "越来越同周围环境相隔离"],
    en: ["preserves the necessary relations of exchange and equilibrium", "more and more isolated, as it were, from the surrounding environment"],
  },
  "science-humboldt-connections": {
    zh: ["纯粹百科式的聚合", "展示遍布宇宙的诸种力量如何同时作用以及彼此联结"],
    en: ["mere encyclopedic aggregation", "simultaneous action and the connecting links of the forces which pervade the universe"],
  },
  "science-humboldt-plant-geography": {
    zh: ["依据离赤道的距离与海拔高度", "温度与气候差异的规律以及大气的气象过程"],
    en: ["according to distance from the equator and vertical elevation above the sea", "differences of temperature and climate, and the meteorological processes of the atmosphere"],
  },
  "science-pasteur-fermentation": {
    zh: ["把生命播种进这种矿物溶液", "这些微小生物的生命及其持续运动的结果"],
    en: ["sowing of life in our mineral solution", "a consequence of the life of these little beings and of their incessant movements"],
  },
  "science-pasteur-airborne-contamination": {
    zh: ["它们装着同样的液体，都含有空气，而且都敞开着", "它们落在弯曲的瓶颈上"],
    en: ["They contain the same liquid, they both contain air, both are open", "they fall on its curved neck"],
  },
  "science-pasteur-attenuation": {
    zh: ["某些病毒的效力可以改变", "一种效力较弱的病毒能够提供对另一种病毒的保护"],
    en: ["certain viruses may be varied in potency", "protection against one may be afforded by another less potent"],
  },
  "science-pasteur-rabies": {
    zh: ["那时的进展在科学意义上大于实践意义", "我们怎敢在人身上进行实验"],
    en: ["more scientific than practical", "could we venture to make an experiment on man"],
  },
  "psychology-foundations-wundt-immediate-experience": {
    zh: ["经验的全部内容", "按其直接性质"],
    en: ["total content of experience", "in its immediate character"],
  },
  "psychology-foundations-wundt-experiment-control": {
    zh: ["完全是过程，而不是恒常不变的对象", "控制它们的起始"],
    en: ["exclusively processes, not permanent objects", "control their beginnings"],
  },
  "psychology-foundations-wundt-apperception": {
    zh: ["清晰把握", "被带入清晰理解的过程"],
    en: ["clear grasp of any psychical content", "brought to clear comprehension"],
  },
  "psychology-foundations-wundt-feeling-dimensions": {
    zh: ["愉快与不愉快", "紧张与放松"],
    en: ["pleasurable and unpleasurable", "strain and relaxation"],
  },
  "psychology-foundations-wundt-cultural-processes": {
    zh: ["由人类共同生活所创造", "以许多人之间的相互作用为前提"],
    en: ["created by a community of human life", "presuppose the reciprocal action of many"],
  },
  "psychology-foundations-pavlov-signal": {
    zh: ["节拍器的声音是食物的信号", "动物对这个信号的反应就如同它是食物一样"],
    en: ["sound of the metronome is the signal for food", "animal reacts to the signal in the same way as if it were food"],
  },
  "psychology-foundations-pavlov-acquisition-extinction": {
    zh: ["反复施加条件刺激而不继之以强化", "会自发地完全恢复其强度"],
    en: ["conditioned stimulus which is not followed up by reinforcement", "spontaneously recover their full strength"],
  },
  "psychology-foundations-pavlov-discrimination": {
    zh: ["最接近的刺激总是与之对照而不受强化", "准确地同已经确立的阳性条件刺激区分开来"],
    en: ["stimulus nearest to it in intensity, position or quality", "exactly differentiated from the established positive conditioned stimulus"],
  },
  "psychology-foundations-pavlov-generalization": {
    zh: ["许多其他音调也会自发获得相似性质", "随着它们同这一1000次音调之间间隔的增大而成比例减弱"],
    en: ["many other tones spontaneously acquire similar properties", "diminishing proportionally to the intervals of these tones"],
  },
  "psychology-foundations-pavlov-experimental-neurosis": {
    zh: ["辨别非但没有改善", "动物的全部行为发生了突然变化"],
    en: ["discrimination fail to improve", "whole behaviour of the animal underwent an abrupt change"],
  },
  "psychology-foundations-kohler-insight": {
    zh: ["稍稍恢复后，它环顾四周", "就在同一瞬间跳下桌子"],
    en: ["when he had recovered a little, he gazed about him", "in the same instant was off the table"],
  },
  "psychology-foundations-kohler-whole-organization": {
    zh: ["只能作为具有一定延展范围的区域之性质而存在", "若干刺激作为一个整体在某一区域中产生特定效果"],
    en: ["existence only as properties of somewhat extended regions", "several stimuli having a specific effect in a certain area as such"],
  },
  "psychology-foundations-kohler-field-restructuring": {
    zh: ["没有在其中看见一个可能的工具", "突然把目光定在木棍上，并使用它"],
    en: ["did not behold in it a possible implement", "suddenly he would fix his gaze on it, and use it"],
  },
  "psychology-foundations-kohler-transposition": {
    zh: ["把它们当作整体来反应", "依其在整体中的“位置”而具有确定特征"],
    en: ["react to such pairs as to wholes", "definite character depending upon its “position” in the whole"],
  },
  "psychology-foundations-kohler-isomorphism": {
    zh: ["视觉经验到的对称性", "底层过程的动力情境中也存在一种同源对称性"],
    en: ["visually experienced symmetry", "homologous symmetry of dynamic context in the underlying processes"],
  },
  "science-galileo-moon": {
    zh: ["月球表面并非完全光滑", "布满凹陷与隆起"],
    en: ["surface of the Moon is not perfectly smooth", "full of hollows and protuberances"],
  },
  "science-galileo-jupiter": {
    zh: ["在不等的圆周中运行", "有时甚至四颗紧密聚集在一起"],
    en: ["revolve in unequal circles", "sometimes all (four), have been found closely packed together"],
  },
  "science-galileo-milky-way": {
    zh: ["眼睛不可辩驳的证据", "银河不过是无数恒星成团聚集而成的集合"],
    en: ["irrefragable evidence of our eyes", "Galaxy is nothing else but a mass of innumerable stars"],
  },
  "science-galileo-ship": {
    zh: ["不会在上述一切现象中察觉哪怕最微小的改变", "判断船是在运动还是静止"],
    en: ["not discern any the least alteration", "whether the Ship doth move or stand still"],
  },
  "science-galileo-inclined-plane": {
    zh: ["完成下降所需的时间", "所经过的距离彼此之比等于所用时间平方之比"],
    en: ["the time required to make the descent", "spaces traversed were to each other as the squares of the times"],
  },
  "psychology-foundations-ebbinghaus-forgetting-time": {
    zh: ["开始时非常迅速", "过程逐渐变慢"],
    en: ["very rapid at the beginning", "the process became slower"],
  },
  "psychology-foundations-ebbinghaus-savings": {
    zh: ["虽然隐藏却仍然存在的倾向", "衡量已经失去了什么，也能衡量还留下什么"],
    en: ["hidden but yet existent dispositions", "a measure for what has been lost as well as for what remains"],
  },
  "psychology-foundations-ebbinghaus-overlearning": {
    zh: ["多出来的重复自然不会白费", "学习得越久，保持得也越久"],
    en: ["surplus repetitions of the latter alternative do not go to waste", "The longer a person studies, the longer he retains"],
  },
  "psychology-foundations-ebbinghaus-meaning": {
    zh: ["意义、节奏、押韵和共同语言", "降到了原来的大约十分之一"],
    en: ["meaning, rhythm, rhyme, and a common language", "reduced to about one-tenth of that amount"],
  },
  "psychology-foundations-thorndike-puzzle-box": {
    zh: ["并不先审视这个情境", "无效的冲动则逐渐被淘汰"],
    en: ["does not look over the situation", "Futile impulses are gradually stamped out"],
  },
  "psychology-foundations-thorndike-law-effect": {
    zh: ["联结得更牢", "联结会被削弱"],
    en: ["more firmly connected with the situation", "connections with that situation weakened"],
  },
  "psychology-foundations-thorndike-identical-elements": {
    zh: ["只在两种功能拥有相同要素", "关于目标、方法和一般原则的观念联结"],
    en: ["only in so far as the two functions have as factors identical elements", "ideas about aims and ideas of method and general principles"],
  },
  "psychology-foundations-thorndike-individual-differences": {
    zh: ["变异程度会更小", "相同的集中趋势"],
    en: ["variability of the measures would be less", "same central tendency"],
  },
  "psychology-foundations-thorndike-practice-limits": {
    zh: ["练习缺少热心", "对成功和失败同样感到舒服"],
    en: ["practice without zeal", "equal comfort at success and failure"],
  },
  "psychology-social-piaget-action-construction": {
    zh: ["看似复制", "变形和再创造"],
    en: ["seems copied", "deformed and recreated"],
  },
  "psychology-social-asch-impression-whole": {
    zh: ["不再作为孤立的特征存在", "立即进入动态的相互作用"],
    en: ["cease to exist as isolated traits", "come into immediate dynamic interaction"],
  },
  "psychology-social-asch-central-traits": {
    zh: ["有些特征被发现是中心性的", "关系的整个系统决定"],
    en: ["some characteristics are discovered to be central", "The whole system of relations determines"],
  },
  "psychology-social-asch-order": {
    zh: ["与其说是条目纯粹的时间位置", "同随后各条目内容之间的功能关系"],
    en: ["not the sheer temporal position of the item", "functional relation of its content to the content of the items following it"],
  },
  "psychology-foundations-watson-conditioned-emotion": {
    zh: ["铁棒就在他脑后被敲响", "负性反应立刻开始"],
    en: ["the bar was struck immediately behind his head", "Negative responses began at once"],
  },
  "psychology-foundations-watson-infant-environment": {
    zh: ["我保证能从中任取一个", "我承认，我的说法超出了事实"],
    en: ["I'll guarantee to take any one at random", "I am going beyond my facts and I admit it"],
  },
  "psychology-foundations-watson-language-thinking": {
    zh: ["一切内隐的语言活动", "能够替代语言活动的活动"],
    en: ["all implicit language activity", "other activity substitutable for language activity"],
  },
  "chinese-confucius-learning-practice": {
    zh: ["学而时习之"],
    en: ["practice what one has learned"],
  },
  "chinese-confucius-ren-and-ritual": {
    zh: ["克己", "复礼"],
    en: ["master oneself", "return to ritual propriety"],
  },
  "chinese-confucius-reciprocity": {
    zh: ["勿施于人"],
    en: ["do not impose upon others"],
  },
  "chinese-confucius-harmony-difference": {
    zh: ["和而不同", "同而不和"],
    en: ["harmonizes without demanding sameness", "sameness without achieving harmony"],
  },
  "chinese-confucius-rectifying-names": {
    zh: ["名不正", "事不成"],
    en: ["names are not correct", "affairs cannot be brought to completion"],
  },
  "chinese-mencius-compassion-sprout": {
    zh: ["怵惕恻隐之心"],
    en: ["alarm and compassion"],
  },
  "chinese-mencius-nature-good": {
    zh: ["人性之善", "水之就下"],
    en: ["goodness of human nature", "water's flowing downward"],
  },
  "chinese-mencius-righteous-choice": {
    zh: ["舍生", "取义"],
    en: ["give up life", "choose righteousness"],
  },
  "chinese-mencius-critical-reading": {
    zh: ["尽信《书》", "不如无《书》"],
    en: ["believe the Documents completely", "worse than having no Documents"],
  },
  "chinese-mencius-people-first": {
    zh: ["民为贵", "君为轻"],
    en: ["people are of greatest importance", "ruler is least important"],
  },
  "chinese-laozi-being-nonbeing": {
    zh: ["有无相生", "难易相成"],
    en: ["Being and nonbeing give rise to each other", "difficult and easy complete each other"],
  },
  "chinese-laozi-water": {
    zh: ["利万物", "不争"],
    en: ["benefits the myriad things", "without contending"],
  },
  "chinese-laozi-use-of-emptiness": {
    zh: ["有之以为利", "无之以为用"],
    en: ["what is there provides benefit", "what is not there provides use"],
  },
  "chinese-zhuangzi-butterfly-dream": {
    zh: ["周之梦为胡蝶", "胡蝶之梦为周"],
    en: ["Zhou had dreamed he was a butterfly", "butterfly had dreamed it was Zhou"],
  },
  "chinese-zhuangzi-cook-ding": {
    zh: ["因其固然"],
    en: ["according to what is inherently so"],
  },
  "chinese-mozi-inclusive-care": {
    zh: ["兼相爱", "交相利"],
    en: ["inclusive mutual care", "reciprocal benefit"],
  },
  "chinese-xunzi-learning-accumulates": {
    zh: ["不积蹞步", "无以致千里"],
    en: ["unless one accumulates half-steps", "cannot reach a thousand li"],
  },
  "chinese-han-feizi-spear-shield": {
    zh: ["不可陷之楯", "无不陷之矛"],
    en: ["impenetrable shield", "spear that penetrates everything"],
  },
  "chinese-confucius-daily-examination": {
    zh: ["三省吾身"],
    en: ["examine myself on three counts"],
  },
  "chinese-confucius-old-and-new": {
    zh: ["温故", "知新"],
    en: ["warms over the old", "knows the new"],
  },
  "chinese-mencius-pulling-sprouts": {
    zh: ["揠苗者也", "非徒无益，而又害之"],
    en: ["pulled up the sprouts", "not merely useless, but harmed them"],
  },
  "chinese-laozi-bending-whole": {
    zh: ["曲则全", "少则得，多则惑"],
    en: ["Bent, then whole", "having little, then gaining; having much, then confused"],
  },
  "chinese-laozi-self-knowledge": {
    zh: ["自知者明", "自胜者强"],
    en: ["knows oneself is discerning", "overcomes oneself is powerful"],
  },
  "chinese-laozi-noncoercive-order": {
    zh: ["无为而无不为", "万物将自化"],
    en: ["does not act, yet nothing is left undone", "myriad things would transform of themselves"],
  },
  "chinese-laozi-lessening": {
    zh: ["为学日益，为道日损", "以至于无为"],
    en: ["pursuing learning, one increases daily; in pursuing the Way, one decreases daily", "until one reaches nonaction"],
  },
  "chinese-laozi-small-beginnings": {
    zh: ["生于毫末", "始于足下"],
    en: ["born from the tiniest shoot", "starts beneath one's feet"],
  },
  "chinese-zhuangzi-small-and-great": {
    zh: ["小知不及大知", "小年不及大年"],
    en: ["Small understanding does not reach great understanding", "a short life does not reach a long life"],
  },
  "chinese-zhuangzi-perspectival-claims": {
    zh: ["彼亦一是非", "此亦一是非"],
    en: ["That also has its ‘this’ and ‘not-this’", "this also has its ‘this’ and ‘not-this’"],
  },
  "chinese-zhuangzi-fasting-mind": {
    zh: ["无听之以耳而听之以心", "无听之以心而听之以气"],
    en: ["Do not listen with the ears; listen with the heart-mind", "Do not listen with the heart-mind; listen with qi"],
  },
  "chinese-zhuangzi-sitting-forgetting": {
    zh: ["离形去知", "此谓坐忘"],
    en: ["leave form and cast off knowledge", "called sitting in forgetting"],
  },
  "chinese-zhuangzi-well-frog": {
    zh: ["拘于虚也", "笃于时也"],
    en: ["confined by its space", "bound to its season"],
  },
  "chinese-mozi-against-aggression": {
    zh: ["大为不义攻国", "从而誉之，谓之义"],
    en: ["great unrighteousness of attacking a state", "praise it and call it righteous"],
  },
  "chinese-mozi-exalting-worthy": {
    zh: ["官无常贵，而民无终贱", "有能则举之"],
    en: ["offices should have no constant nobility, and the people no lasting lowliness", "Raise those who are capable"],
  },
  "chinese-mozi-against-fatalism": {
    zh: ["命虽强劲，何益哉", "驵百姓之从事"],
    en: ["Though fate may be forceful, what use is it", "obstruct the common people in their work"],
  },
  "chinese-xunzi-transforming-nature": {
    zh: ["性恶", "善者伪也"],
    en: ["Human nature is bad", "good in it is deliberate activity"],
  },
  "chinese-xunzi-ritual-orders-desire": {
    zh: ["求而无度量分界", "争则乱，乱则穷"],
    en: ["seeking has no measure or dividing boundary", "contention brings disorder, and disorder brings poverty"],
  },
  "chinese-xunzi-conventional-names": {
    zh: ["名无固宜", "约定俗成"],
    en: ["Names have no fixed appropriateness", "convention is established and customary"],
  },
  "chinese-xunzi-constant-heaven": {
    zh: ["天行有常", "不为尧存，不为桀亡"],
    en: ["Heaven's course has a constant regularity", "does not persist because of Yao, nor perish because of Jie"],
  },
  "chinese-han-feizi-changing-methods": {
    zh: ["不期修古，不法常可", "论世之事"],
    en: ["does not expect to cultivate antiquity or model himself on constant precedents", "considers the affairs of his age"],
  },
  "chinese-han-feizi-law-public-standard": {
    zh: ["法不阿贵", "绳不挠曲"],
    en: ["law does not bend toward the noble", "measuring line yield to crookedness"],
  },
  "chinese-han-feizi-two-handles": {
    zh: ["二柄而已矣", "刑德也"],
    en: ["nothing more than two handles", "punishment and favor"],
  },
  "chinese-sunzi-war-serious": {
    zh: ["国之大事", "不可不察也"],
    en: ["great matter of the state", "must not be left unexamined"],
  },
  "chinese-sunzi-win-without-battle": {
    zh: ["百战百胜，非善之善者也", "不战而屈人之兵"],
    en: ["win every battle is not the best of the best", "subdue another's army without battle"],
  },
  "chinese-sunzi-know-self-other": {
    zh: ["知彼知己，百战不殆", "不知彼不知己，每战必殆"],
    en: ["Know the other and know yourself", "Know neither the other nor yourself"],
  },
  "chinese-sunzi-shape-enemy": {
    zh: ["致人而不致于人"],
    en: ["compels others and is not compelled by them"],
  },
  "chinese-sunzi-mix-profit-harm": {
    zh: ["必杂于利害", "杂于害而患可解也"],
    en: ["necessarily combines advantage and harm", "by combining it with harm, troubles can be resolved"],
  },
  "chinese-gongsun-long-white-horse": {
    zh: ["命色者，非命形也", "白马非马"],
    en: ["Naming color is not naming shape", "a white horse is not a horse"],
  },
  "chinese-gongsun-long-pointing-things": {
    zh: ["物莫非指", "指非指"],
    en: ["No thing is not a designation", "designation is not designation"],
  },
  "chinese-wang-bi-root-and-branches": {
    zh: ["崇本息末", "寻其所归"],
    en: ["honors the root and quiets the branches", "seek where they return"],
  },
  "chinese-wang-bi-forgetting-image": {
    zh: ["得象而忘言", "得意而忘象"],
    en: ["once the image is obtained, forget the words", "once the meaning is obtained, forget the image"],
  },
  "chinese-wang-bi-nonbeing-beginning": {
    zh: ["有皆始于无", "万物之始"],
    en: ["being begins from nonbeing", "beginning of the myriad things"],
  },
  "chinese-guo-xiang-each-nature": {
    zh: ["物任其性", "各当其分"],
    en: ["things follow their nature", "each accords with its allotment"],
  },
  "chinese-guo-xiang-self-transformation": {
    zh: ["物各自造", "无所待焉"],
    en: ["things each make themselves", "without depending on anything"],
  },
  "chinese-zhu-xi-investigating-things": {
    zh: ["因其已知之理而益穷之", "一旦豁然贯通"],
    en: ["on the basis of principles already known, investigate them further", "suddenly achieve a thorough comprehension"],
  },
  "chinese-zhu-xi-one-pattern-many": {
    zh: ["理一分殊", "只是一个理"],
    en: ["Principle is one, its differentiations many", "there is only one principle"],
  },
  "chinese-zhu-xi-reverent-attention": {
    zh: ["用功不可偏", "涵养须用敬"],
    en: ["effort must not be one-sided", "Cultivation requires reverent attention"],
  },
  "chinese-zhu-xi-principle-desire": {
    zh: ["饮食者，天理也", "要求美味，人欲也"],
    en: ["Eating and drinking are heavenly principle", "demanding exquisite flavors is human desire"],
  },
  "chinese-wang-yangming-knowledge-action": {
    zh: ["知是行之始", "行是知之成"],
    en: ["Knowing is the beginning of action", "action is the completion of knowing"],
  },
  "chinese-wang-yangming-no-principle-outside-mind": {
    zh: ["心即理也", "心外之理乎"],
    en: ["mind is principle", "principle outside the mind"],
  },
  "chinese-wang-yangming-extending-conscience": {
    zh: ["吾心之良知", "事事物物皆得其理"],
    en: ["innate knowing of my mind", "every affair and thing will attain its principle"],
  },
  "chinese-wang-yangming-one-body": {
    zh: ["天地万物为一体", "天下犹一家"],
    en: ["one body with heaven, earth, and the myriad things", "all under heaven as one family"],
  },
  "chinese-dong-zhongshu-ren-yi-directions": {
    zh: ["爱人，不在爱我", "正我，不在正人"],
    en: ["love others, not oneself", "correct oneself, not others"],
  },
  "chinese-dong-zhongshu-names-from-reality": {
    zh: ["名生于真", "圣人之所以真物也"],
    en: ["Names arise from what is genuine", "sage makes things answer to what is real"],
  },
  "chinese-dong-zhongshu-nature-and-cultivation": {
    zh: ["性者，天质之朴也", "善者，王教之化也"],
    en: ["Human nature is the uncarved endowment received from Heaven", "goodness is the transformation brought by moral instruction"],
  },
  "chinese-wang-chong-facts-and-evidence": {
    zh: ["违实不引效验", "众不见信"],
    en: ["departs from facts and cites no confirming evidence", "will not win belief"],
  },
  "chinese-wang-chong-nature-without-intention": {
    zh: ["不欲以生物", "物自生"],
    en: ["without intending thereby to produce things", "things arise of themselves"],
  },
  "chinese-wang-chong-questioning-the-sages": {
    zh: ["好信师而是古", "不知难问"],
    en: ["trusting teachers and affirming antiquity", "do not know how to question and challenge"],
  },
  "chinese-sengzhao-past-and-present": {
    zh: ["于今未尝有", "于向未尝无"],
    en: ["absence now shows that it did not come", "presence then shows that it did not depart"],
  },
  "chinese-sengzhao-dependent-and-empty": {
    zh: ["待缘而后有", "有非真有"],
    en: ["arises only through conditions", "existence is not absolute"],
  },
  "chinese-sengzhao-wisdom-without-grasping": {
    zh: ["有所知，则有所不知", "不知之知"],
    en: ["some fixed knowledge, there is also something unknown", "Knowing without possessive knowing"],
  },
  "chinese-fazang-golden-lion-dependent-arising": {
    zh: ["金无自性", "起但是缘"],
    en: ["Gold has no nature of its own", "arising is nothing but conditions"],
  },
  "chinese-fazang-golden-lion-nonarising": {
    zh: ["一茎毛中", "无边师子"],
    en: ["within each single hair", "boundless lions"],
  },
  "chinese-huineng-meditation-and-stability": {
    zh: ["定慧一体，不是二", "定是慧体，慧是定用"],
    en: ["Stability and wisdom are one body, not two", "Stability is the substance of wisdom, and wisdom is the function of stability"],
  },
  "chinese-huineng-attachment-to-purity": {
    zh: ["心念不起", "自性不动"],
    en: ["not let thoughts arise", "one's own nature unmoved"],
  },
  "chinese-huineng-stillness-among-judgments": {
    zh: ["前念迷，即凡夫；后念悟，即佛", "前念著境，即烦恼；后念离境，即菩提"],
    en: ["A deluded preceding thought is the ordinary person, while an awakened following thought is Buddha", "Attachment to circumstances is affliction; nonattachment to circumstances is awakening"],
  },
  "chinese-zhou-dunyi-motion-and-stillness": {
    zh: ["静极复动", "一动一静，互为其根"],
    en: ["Stillness at its limit returns to movement", "Movement and stillness are each the root of the other"],
  },
  "chinese-zhou-dunyi-reality-over-name": {
    zh: ["实胜，善也", "名胜，耻也"],
    en: ["reality exceeds reputation, that is good", "reputation exceeds reality, that is shameful"],
  },
  "chinese-zhang-zai-great-harmony": {
    zh: ["太和所谓道", "相感之性"],
    en: ["Great Harmony is what is called the Way", "mutual responsiveness"],
  },
  "chinese-zhang-zai-qi-gathering-dispersing": {
    zh: ["太虚无形，气之本体", "其聚其散"],
    en: ["Great Void is without form and is the original condition of qi", "gathering and dispersing"],
  },
  "chinese-zhang-zai-enlarge-the-heart": {
    zh: ["大其心则能体天下之物", "止于闻见之狭"],
    en: ["enlarging the heart-mind one can embody the things of the world", "stop at the narrowness of what they have heard and seen"],
  },
  "chinese-zhang-zai-world-as-kin": {
    zh: ["民，吾同胞", "物，吾与也"],
    en: ["people are my siblings", "all things are my companions"],
  },
  "chinese-cheng-hao-one-body-with-things": {
    zh: ["天地万物为一体", "莫非己也"],
    en: ["one body with Heaven, Earth, and the myriad things", "none is outside the self"],
  },
  "chinese-cheng-hao-recognizing-humaneness": {
    zh: ["须先识仁", "浑然与物同体"],
    en: ["must first recognize humaneness", "seamlessly one body with things"],
  },
  "chinese-cheng-hao-settled-in-motion": {
    zh: ["动亦定，静亦定", "无内外"],
    en: ["settled in movement and settled in stillness", "no division between inner and outer"],
  },
  "chinese-cheng-yi-true-knowledge-acts": {
    zh: ["须是真知", "泰然行将去"],
    en: ["possess genuine knowledge", "proceeds to act on it with ease"],
  },
  "chinese-cheng-yi-many-ways-to-investigate": {
    zh: ["须是穷致其理", "皆穷理也"],
    en: ["pattern must be investigated to the utmost", "all are investigation of pattern"],
  },
  "chinese-cheng-yi-gradual-investigation": {
    zh: ["今日格一件，明日又格一件", "脱然自有贯通处"],
    en: ["investigate one thing today and another tomorrow", "point of spontaneous integration will emerge"],
  },
  "chinese-li-zhi-childlike-heart": {
    zh: ["童心者，真心也", "绝假纯真"],
    en: ["childlike heart is the genuine heart", "free of falseness and wholly authentic"],
  },
  "chinese-li-zhi-everyday-human-relations": {
    zh: ["穿衣吃饭即是人伦物理", "世间种种皆衣与饭类耳"],
    en: ["Dressing and eating are themselves human relations and the patterns of things", "all the affairs of the world are of the same kind as clothing and food"],
  },
  "chinese-wang-fuzhi-knowing-unknown": {
    zh: ["知之为知之", "不知为不知"],
    en: ["know what you know", "take what you do not know as unknown"],
  },
  "chinese-wang-fuzhi-action-before-knowledge": {
    zh: ["行而后知有道", "得而后见有德"],
    en: ["Only after walking does one know there is a way", "Only after attaining does one see there is virtue"],
  },
  "chinese-wang-fuzhi-scrutinizing-faults": {
    zh: ["乐察人之恶", "厉薰心矣"],
    en: ["Delight in detecting others' faults", "harshness permeates the heart"],
  },
  "chinese-wang-fuzhi-private-and-public-knowing": {
    zh: ["强通其所不通，则私", "确然于一，则公"],
    en: ["force connections where none hold is private judgment", "arrive at what is firmly coherent is public judgment"],
  },
  "chinese-huang-zongxi-office-for-all": {
    zh: ["为天下，非为君也", "为万民，非为一姓也"],
    en: ["for all under Heaven, not for the ruler", "for the people, not for one family line"],
  },
  "chinese-huang-zongxi-order-and-people": {
    zh: ["不在一姓之兴亡", "在万民之忧乐"],
    en: ["does not lie in the rise and fall of one family", "in the suffering or flourishing of the people"],
  },
  "chinese-huang-zongxi-public-law": {
    zh: ["一家之法", "非天下之法"],
    en: ["law of one family", "not the law of all under Heaven"],
  },
  "chinese-gu-yanwu-country-and-world": {
    zh: ["易姓改号，谓之亡国", "人将相食，谓之亡天下"],
    en: ["change of ruling house and title is the loss of a state", "people prey upon one another, that is the loss of all under Heaven"],
  },
  "chinese-gu-yanwu-writing-for-public-use": {
    zh: ["明道也，纪政事也", "察民隐也"],
    en: ["clarifies the Way, records public affairs", "examines people's hidden hardships"],
  },
  "chinese-dai-zhen-reason-through-reciprocity": {
    zh: ["未有情不得而理得者也", "人以此施于我，能受之乎"],
    en: ["human feelings were left unfulfilled yet principle was attained", "could I accept another acting this way toward me"],
  },
  "chinese-dai-zhen-learning-transforms-knowing": {
    zh: ["资饮食以养", "资于问学"],
    en: ["takes nourishment", "draws on inquiry and learning"],
  },
  "chinese-dai-zhen-desire-and-goodness": {
    zh: ["欲者，血气之自然", "好是懿德也，心知之自然"],
    en: ["Desire is natural to vital embodiment", "delight in excellent virtue is natural to the knowing mind"],
  },
  "psychology-foundations-james-stream": {
    zh: ["不是被切割成一个个碎片的"],
    en: ["does not appear to itself chopped up in bits"],
  },
  "psychology-foundations-james-habit": {
    zh: ["社会巨大的飞轮", "最珍贵的守成力量"],
    en: ["enormous fly-wheel of society", "most precious conservative agent"],
  },
  "psychology-foundations-james-attention": {
    zh: ["从一些事物上撤回", "有效地处理另一些事物"],
    en: ["withdrawal from some things", "deal effectively with others"],
  },
  "psychology-foundations-james-self-plural": {
    zh: ["能够称为“属于他的”", "一切事物的总和"],
    en: ["all that he CAN call his", "sum total"],
  },
  "psychology-foundations-james-emotion-body": {
    zh: ["身体变化直接随引发情绪的事实之知觉而来", "对它们的感受，就是情绪"],
    en: ["bodily changes follow directly the perception of the exciting fact", "feeling of the same changes as they occur IS the emotion"],
  },
  "psychology-foundations-ebbinghaus-nonsense-syllables": {
    zh: ["无意义材料", "正是由于它缺乏意义"],
    en: ["nonsense material", "because of this very lack of meaning"],
  },
  "psychology-foundations-watson-observable-behavior": {
    zh: ["纯粹客观的实验分支"],
    en: ["purely objective experimental branch of natural science"],
  },
  "psychology-foundations-watson-prediction-control": {
    zh: ["预测和控制行为"],
    en: ["prediction and control of behavior"],
  },
  "marx-alienated-labor-product": {
    zh: ["劳动者生产的财富越多，他就越贫穷"],
    en: ["The worker becomes all the poorer the more wealth he produces"],
  },
  "marx-species-being": {
    zh: ["有意识的生命活动使人直接区别于动物的生命活动"],
    en: ["Conscious life activity distinguishes man immediately from animal life activity"],
  },
  "marx-ruling-ideas": {
    zh: ["统治阶级的思想在每一个时代都是占统治地位的思想"],
    en: ["The ideas of the ruling class are in every epoch the ruling ideas"],
  },
  "marx-political-human-emancipation": {
    zh: ["国家可以从某种限制中解放出来", "人却没有真正从这种限制中解放出来"],
    en: ["the state can free itself from a restriction", "without man being really free from this restriction"],
  },
  "descartes-generosity": {
    zh: ["除了自由支配自己的意志，没有什么真正属于自己", "坚定而恒常的决心去善用它"],
    en: ["nothing which truly he can call his own, unless this free disposition of his wills", "a constant, and firm resolution in himself to use it well"],
  },
  "augustine-belief-and-understanding": {
    zh: ["不要为了相信而寻求理解", "要为了理解而相信"],
    en: ["do not seek to understand in order to believe", "believe that you may understand"],
  },
  "augustine-will-and-moral-evil": {
    zh: ["意志离弃在它之上的", "转向在它之下的"],
    en: ["will abandons what is above itself", "turns to what is lower"],
  },
  "augustine-inner-teacher": {
    zh: ["借助言语，我们只学到言语", "声响与噪音"],
    en: ["By means of words, therefore, we learn only words", "sound and noise of words"],
  },
  "augustine-immutable-truth": {
    zh: ["永恒的真理", "被爱的永恒"],
    en: ["Eternal Truth", "loved Eternity"],
  },
  "avicenna-primary-notions": {
    zh: ["自明的、公理性的心智概念", "无须学习，也无须反思"],
    en: ["self-evident axiomatic mentally-grasped notions", "without effort of learning and without reflection"],
  },
  "indian-vedic-creation-question": {
    zh: ["诸神晚于这个世界的产生", "谁知道"],
    en: ["Gods are later than this world's production", "Who knows"],
  },
  "indian-upanishad-neti-neti": {
    zh: ["并非如此！也非那般！", "没有比‘他是如此’这一说法更高的了"],
    en: ["Not thus! not so!", "nothing higher than this"],
  },
  "indian-upanishad-chariot": {
    zh: ["灵魂（阿特曼、自我）是车中乘者", "诸感官（indriya）是马"],
    en: ["soul (ātman, self) as riding in a chariot", "senses (indriya), they say, are the horses"],
  },
  "indian-upanishad-renunciation-enjoyment": {
    zh: ["由主（īśa）包覆", "切莫贪求任何人的财富"],
    en: ["By the Lord (īśa) enveloped", "Covet not the wealth of any one at all"],
  },
  "indian-buddha-middle-way": {
    zh: ["什么是那条中道修行", "八支圣道"],
    en: ["middle way of practice", "noble eightfold path"],
  },
  "indian-buddha-four-truths": {
    zh: ["四圣谛", "三转十二行相"],
    en: ["four noble truths", "three rounds and twelve aspects"],
  },
  "indian-buddha-dependent-arising": {
    zh: ["由于此生起，彼便生起", "由于此止息，彼便止息"],
    en: ["due to the arising of this, this arises", "due to the cessation of this, this ceases"],
  },
  "indian-buddha-not-self": {
    zh: ["无常、苦、会坏灭", "这是我的，我就是这个，这就是我的自我"],
    en: ["impermanent, suffering, and perishable", "This is mine, I am this, this is my self"],
  },
  "indian-buddha-kalama": {
    zh: ["会导向伤害和痛苦", "就应当放下它们"],
    en: ["lead to harm and suffering", "then you should give them up"],
  },
  "indian-buddha-metta": {
    zh: ["展开无量之心", "不怀敌意，也无仇怨"],
    en: ["unfold a boundless heart", "without enmity or foe"],
  },
  "indian-tagore-self-in-relation": {
    zh: ["实现我们同一切事物的关系", "人类的终极目的与完满"],
    en: ["realising our relationship with all", "ultimate end and fulfilment of humanity"],
  },
  "indian-tagore-narrow-self": {
    zh: ["使自我成为我们的束缚", "超越其界限的理念"],
    en: ["makes the self our fetter", "transcends its limits"],
  },
  "indian-tagore-freedom-in-action": {
    zh: ["一切工作都成为与梵结合的道路", "便有自由"],
    en: ["all work becomes the path to the union with Brahma", "then there is freedom"],
  },
  "indian-gandhi-machinery-test": {
    zh: ["机器使印度陷入贫困", "印度的手工业几乎已经消失"],
    en: ["machinery that has impoverished India", "Indian handicraft has all but disappeared"],
  },
  "indian-gita-action-fruit": {
    zh: ["关切的只是行动本身", "不要让行动的果报成为你（行动的）动机"],
    en: ["business is with action alone", "Let not the fruit of action be your motive"],
  },
  "indian-yoga-four-attitudes": {
    zh: ["友善、悲悯、欣悦与淡然", "心质便得平息"],
    en: ["Friendship, mercy, gladness, indifference", "pacify the Chitta"],
  },
  "indian-yoga-stilling-fluctuations": {
    zh: ["见者［即自我（神我）］安住于自身", "呈现与［心质］波动相同的形式"],
    en: ["Seer [that is, the Self] abides in himself", "same form as the fluctuations [of mind-stuff]"],
  },
  "indian-yoga-practice-dispassion": {
    zh: ["练习与离欲"],
    en: ["practice and passionlessness"],
  },
  "indian-yoga-five-afflictions": {
    zh: ["求生意志", "五种障碍"],
    en: ["the will-to-live", "the five hindrances"],
  },
  "indian-yoga-eight-limbs": {
    zh: ["制感", "八种助法"],
    en: ["withdrawal-of-the-senses", "the eight aids"],
  },
  "indian-yoga-three-inward-limbs": {
    zh: ["三者合而为一", "总制"],
    en: ["The three in one", "constraint"],
  },
  "indian-gandhi-means-shape-ends": {
    zh: ["种下什么", "收获什么"],
    en: ["reap exactly", "we sow"],
  },
  "economics-principles-edgeworth-contract-curve": {
    zh: ["双方都有利益达成某种结算", "由契约曲线所表示的诸契约之一"],
    en: ["interest of both parties", "contracts represented by the contract-curve"],
  },
  "economics-principles-ramsey-commodity-taxation": {
    zh: ["每一种被征税商品", "按相同比例减少"],
    en: ["each commodity taxed", "diminish in the same proportion"],
  },
  "economics-principles-hotelling-spatial-competition": {
    zh: ["相互竞争的卖方", "变得过于相似"],
    en: ["competing sellers", "become too much alike"],
  },
  "economics-marx-commodity-fetish": {
    zh: ["人与人之间的一种确定社会关系", "物与物之间关系的幻象形式"],
    en: ["definite social relation between men", "fantastic form of a relation between things"],
  },
  "economics-marx-reserve-army": {
    zh: ["在积累过程中形成的追加资本", "所吸收的劳动者越来越少"],
    en: ["additional capital formed in the course of accumulation", "attracts fewer and fewer labourers"],
  },
  "science-curie-quantification": {
    zh: ["电流绝对值", "静电计和压电石英"],
    en: ["absolute value of the current", "an electrometer and a piezoelectric quartz"],
  },
  "science-curie-radioactive-atom": {
    zh: ["每一种放射性物质都经历这种转变", "即使它在我们看来并无变化"],
    en: ["every radioactive substance undergoes such a transformation", "even though it appears to us to be invariable"],
  },
  "science-turing-mechanical-computation": {
    zh: ["纸带穿过机器", "每一格都能承载一个“符号”"],
    en: ["a ‘tape’ (the analogue of paper) running through it", "each capable of bearing a ‘symbol’"],
  },
  "science-turing-universal-machine": {
    zh: ["能够用来计算任何可计算序列", "U 将计算出与 M 相同的序列"],
    en: ["can be used to compute any computable sequence", "U will compute the same sequence as M"],
  },
  "science-turing-undecidable-behavior": {
    zh: ["不存在这样一台机器 E", "能够判定 M 是否会打印某个给定符号"],
    en: ["there can be no machine E", "will determine whether M ever prints a given symbol"],
  },
  "science-turing-imitation-game": {
    zh: ["机器能思考吗", "界定“机器”和“思考”这两个词的含义"],
    en: ["Can machines think?", "definitions of the meaning of the terms ‘machine’ and ‘think’"],
  },
  "science-shannon-message-not-meaning": {
    zh: ["实际消息是从一组可能的消息中选出的一条"],
    en: ["actual message is one selected from a set of possible messages"],
  },
  "science-shannon-entropy": {
    zh: ["可能事件越多", "选择或不确定性就越大"],
    en: ["there is more choice, or uncertainty", "when there are more possible events"],
  },
  "science-shannon-noisy-channel": {
    zh: ["若 H ≤ C，则存在一种编码系统", "错误频率（或疑义度）可以任意小"],
    en: ["If H ≤ C there exists a coding system", "an arbitrarily small frequency of errors (or an arbitrarily small equivocation)"],
  },
  "science-shannon-redundancy": {
    zh: ["一半由语言结构所决定", "另一半则是自由选择的"],
    en: ["half of what we write is determined by the structure of the language", "half is chosen freely"],
  },
  "kierkegaard-infinite-resignation": {
    zh: ["无限弃绝是信仰之前的最后阶段", "只有通过绝对弃绝，我才意识到自己的永恒价值"],
    en: ["Infinite resignation is the last stage which goes before faith", "only through absolute resignation do I become conscious of my eternal worth"],
  },
  "kierkegaard-faith-paradox": {
    zh: ["唯一能拯救他的，是诉诸荒谬", "他凭借信仰，得以诉诸荒谬"],
    en: ["only thing which can save him is recourse to the absurd", "this recourse he has through his faith"],
  },
  "kierkegaard-crowd-untruth": {
    zh: ["群众——不是这个或那个群众", "使单独者完全不知悔改且不负责任"],
    en: ["A crowd - not this or that", "renders the single individual wholly unrepentant and irresponsible"],
  },
  "kierkegaard-aesthetic-immediacy": {
    zh: ["好的东西", "必须立刻到来"],
    en: ["to be good", "must come at once"],
  },
  husserl: {
    zh: ["抑止每一种通常的客观“设定”", "不参与任何关于客观世界的判断"],
    en: ["inhibit every ordinary objective “position,”", "partake in no judgment concerning the objective world"],
  },
  "husserl-intentionality": {
    zh: ["一切意识", "“意向性的”"],
    en: ["All consciousness", "“intentional.”"],
  },
  "frege-function-argument": {
    zh: ["函数的表达式需要补全", "未饱和的"],
    en: ["expression of a function needs completion", "is not satisfied"],
  },
  averroes: {
    zh: ["律法鼓励并劝勉我们考察受造界"],
    en: ["The Law encourages and exhorts us to observe creation"],
  },
  "averroes-truth": {
    zh: ["理性探究并不违背律法", "真理不可能与真理相矛盾"],
    en: ["rational investigation is not contrary to Law", "truth cannot contradict truth"],
  },
  "averroes-interpretation": {
    zh: ["把一个词的意义从本义移到隐喻义"],
    en: ["carry the meaning of a word from its original sense to a metaphorical one"],
  },
  "economics-principles-marshall-consumer-surplus": {
    zh: ["他为了不放弃该物品而愿意支付的价格", "它可以称为消费者剩余"],
    en: ["The excess of the price which he would be willing to pay rather than go without the thing", "It may be called consumer’s surplus"],
  },
  "economics-principles-menger-origin-money": {
    zh: ["不经约定、不受法律强制", "换成同样用于交换、但更易出售的其他商品"],
    en: ["without convention, without legal compulsion", "for other goods equally destined for exchange, but more saleable"],
  },
  "economics-fisher-debt-deflation": {
    zh: ["偿还得越多", "所欠的反而越多"],
    en: ["more the debtors pay", "more they owe"],
  },
  "economics-principles-nash-bargaining": {
    zh: ["这些条件要求", "使 u₁ u₂ 最大化"],
    en: ["these conditions require", "u₁ u₂ is maximized"],
  },
  "economics-principles-sweezy-kinked-demand": {
    zh: ["设想的需求曲线", "当前价格处有一个“折角”"],
    en: ["imagined demand curve", "“corner” at the current price"],
  },
  "economics-modern-hotelling-scarcity-rent": {
    zh: ["公式 p = p₀e^{γt}", "自由竞争下不同时点的相对价格"],
    en: ["formula p = p₀e^{γt}", "relative prices at different times under free competition"],
  },
  "economics-modern-deaton-household-welfare-measurement": {
    zh: ["为估计均值或总体总量而设计", "不适合用来衡量离散程度"],
    en: ["designed to estimate means or population totals", "unsuitable for measuring dispersion"],
  },
  "economics-modern-dasgupta-biodiversity-inclusive-wealth": {
    zh: ["“包容性”这一限定词", "财富中包含作为一项资产的自然"],
    en: ["qualifier ‘inclusive’", "wealth includes Nature as an asset"],
  },
  "indian-upanishad-relational-love": {
    zh: ["不是因为爱丈夫", "因为爱灵魂（阿特曼）"],
    en: ["not for love of the husband", "for love of the Soul (Ātman)"],
  },
  "indian-upanishad-tat-tvam-asi": {
    zh: ["最精微的本质", "你就是它"],
    en: ["finest essence", "That art thou"],
  },
  "indian-gita-equanimity": {
    zh: ["舍弃（一切）执著", "在成功或失败中保持平衡"],
    en: ["casting off (all) attachment", "equable in success or ill-success"],
  },
  "indian-gandhi-self-rule": {
    zh: ["没有英国人的英国统治"],
    en: ["English rule without the Englishman"],
  },
  "indian-gandhi-satyagraha": {
    zh: ["以个人承受痛苦来争取权利", "与武力抵抗恰好相反"],
    en: ["securing rights by personal suffering", "reverse of resistance by arms"],
  },
  "indian-tagore-nation-machine": {
    zh: ["成功是机器的目标和正当化依据", "唯有善才是人的终点与目的"],
    en: ["success is the object and justification of a machine", "goodness only is the end and purpose of man"],
  },
  "economics-principles-arrow-debreu-equilibrium-existence": {
    zh: ["两个定理", "竞争均衡得以存在"],
    en: ["two theorems", "a competitive equilibrium will exist"],
  },
  "economics-principles-harberger-deadweight-loss": {
    zh: ["回报率高于平均水平的行业所拥有的资源过少", "回报率低于平均水平的行业所拥有的资源则过多"],
    en: ["returning higher than average rates have too few resources", "yielding lower than average rates have too many resources"],
  },
  "economics-modern-schultz-human-capital-investment": {
    zh: ["所谓的消费", "构成了人力资本投资"],
    en: ["what we call consumption", "investment in human capital"],
  },
  "economics-modern-gale-shapley-deferred-acceptance": {
    zh: ["“延迟接受”程序", "大学录取问题"],
    en: ["“deferred-acceptance” procedure", "problem of college admissions"],
  },
  "economics-modern-arrow-medical-care-uncertainty": {
    zh: ["几乎所有的特殊特征", "源自不确定性的普遍存在"],
    en: ["virtually all the special features", "stem from the prevalence of uncertainty"],
  },
  "economics-hayek-dispersed-knowledge": {
    zh: ["需要分散决策", "特定时间和地点之具体情势的知识"],
    en: ["need decentralization", "knowledge of the particular circumstances of time and place"],
  },
  "economics-akerlof-lemons-adverse-selection": {
    zh: ["好车可能会被“柠檬车”挤出市场"],
    en: ["the good cars may be driven out of the market by the lemons"],
  },
  "economics-akerlof-quality-institutions": {
    zh: ["为了抵消质量不确定性的影响"],
    en: ["counteract the effects of quality uncertainty"],
  },
  "economics-principles-aumann-correlated-equilibrium": {
    zh: ["在统计上相互依赖", "就是相关的"],
    en: ["correlated", "statistically dependent"],
  },
  "economics-modern-abadie-diamond-hainmueller-synthetic-control": {
    zh: ["可用控制地区的一个加权平均", "构成一个合成控制"],
    en: ["a weighted average of the available control regions", "a synthetic control"],
  },
  "economics-modern-card-krueger-minimum-wage-natural-experiment": {
    zh: ["最低工资上调前后", "410家快餐店"],
    en: ["before and after the rise in the minimum", "410 fast food restaurants"],
  },
  "economics-modern-autor-routine-task-technology": {
    zh: ["遵循明确规则完成", "非常规问题解决和复杂沟通任务"],
    en: ["accomplished by following explicit rules", "nonroutine problem-solving and complex communications tasks"],
  },
  "economics-modern-ajr-colonial-origins-institutions": {
    zh: ["高死亡率", "更可能建立攫取型制度"],
    en: ["high mortality rates", "more likely to set up extractive institutions"],
  },
  "economics-modern-autor-dorn-hanson-china-shock": {
    zh: ["更高的失业率、更低的劳动参与率", "下降的工资"],
    en: ["higher unemployment, lower labor force participation", "reduced wages"],
  },
  "indian-samkhya-blind-lame": {
    zh: ["如跛者与盲者的结合"],
    en: ["like that of the halt and the blind"],
  },
  "indian-samkhya-threefold-suffering": {
    zh: ["三种苦"],
    en: ["the three kinds of pain"],
  },
  "indian-samkhya-unmanifest-manifest-knower": {
    zh: ["神我既非能生者，也非所生者"],
    en: ["the Spirit is neither the producer nor the produced"],
  },
  "indian-samkhya-effect-preexists": {
    zh: ["非有者绝不能被产生出来"],
    en: ["a non-entity can never be brought into existence"],
  },
  "indian-samkhya-three-gunas": {
    zh: ["轻扬而明照", "迟滞而遮蔽"],
    en: ["buoyant and illuminating", "sluggish and enveloping"],
  },
  "indian-samkhya-many-purushas": {
    zh: ["神我的复数性由此确立"],
    en: ["the plurality of Spirits is established"],
  },
  "indian-nyaya-sixteen-categories": {
    zh: ["十六范畴的真实本性"],
    en: ["the true nature of sixteen categories"],
  },
  "indian-nyaya-error-to-liberation": {
    zh: ["按照逆序", "相继消灭"],
    en: ["successive annihilation", "in the reverse order"],
  },
  "indian-nyaya-four-means": {
    zh: ["正知的手段"],
    en: ["the means of right knowledge"],
  },
  "indian-nyaya-perception-conditions": {
    zh: ["由感官与其对象接触而生"],
    en: ["arises from the contact of a sense with its object"],
  },
  "indian-nyaya-five-member-argument": {
    zh: ["命题、理由、例证、应用和结论"],
    en: ["proposition, reason, example, application, and conclusion"],
  },
  "indian-nyaya-debate-modes": {
    zh: ["以取胜为目标", "应受责斥的手段"],
    en: ["aims at gaining victory", "processes which deserve rebuke"],
  },
  "kierkegaard": {
    zh: ["生活必须向后理解", "生活必须向前活"],
    en: ["life must be understood backwards", "it must be lived forwards"],
  },
  "frege-context-principle": {
    zh: ["在命题的语境中追问", "不能孤立地追问"],
    en: ["in the context of a proposition", "not in isolation"],
  },
  frege: {
    zh: ["并不具有相同的认知价值"],
    en: ["do not have the same cognitive value"],
  },
  "frege-concept-object": {
    zh: ["按我对这个词的理解", "是谓述性的"],
    en: ["as I understand the word", "is predicative"],
  },
  "quine-ontological-commitment": {
    zh: ["所谓存在", "成为一个变项的值"],
    en: ["To be is, purely and simply", "the value of a variable"],
  },
  quine: {
    zh: ["整个科学"],
    en: ["whole of science"],
  },
  "avicenna": {
    zh: ["这门科学的首要主题", "存在者，就其为存在者而言"],
    en: ["primary subject matter of this science", "the existent inasmuch as it is an existent"],
  },
  "kierkegaard-repetition-forward": {
    zh: ["向后重复", "真正的重复则是向前回忆"],
    en: ["is repeated backward", "genuine repetition is recollected forward"],
  },
  "anscombe": {
    zh: ["在心理上可能", "应当把它们摒弃"],
    en: ["ought to be jettisoned", "psychologically possible"],
  },
  "anscombe-against-consequentialism": {
    zh: ["后果主义的一个必然特征", "浅薄的哲学"],
    en: ["necessary feature of consequentialism", "shallow philosophy"],
  },
  "anscombe-intention-why": {
    zh: ["某种意义上的“为什么？”问题", "可以被提出"],
    en: ["a certain sense of the question ‘Why?’", "is given application"],
  },
  "anscombe-directions-of-fit": {
    zh: ["错误就在记录中"],
    en: ["the mistake is in the record"],
  },
  "anscombe-practical-knowledge": {
    zh: ["实践知识", "“它所理解之物的原因”"],
    en: ["Practical knowledge", "‘the cause of what it understands’"],
  },
  "arendt-power-together": {
    zh: ["不仅行动", "共同行动"],
    en: ["not just to act", "to act in concert"],
  },
  "arendt-violence-instrument": {
    zh: ["工具性特征"],
    en: ["instrumental character"],
  },
  "arendt-factual-truth": {
    zh: ["事实信息得到保障", "事实本身没有争议"],
    en: ["factual information is guaranteed", "facts themselves are not in dispute"],
  },
  "arendt-thoughtlessness": {
    zh: ["纯粹的无思", "绝不等同于愚蠢"],
    en: ["sheer thoughtlessness", "by no means identical with stupidity"],
  },
  "arendt-disclosure-who": {
    zh: ["显示他们是谁", "揭示他们独特的个人身份"],
    en: ["show who they are", "reveal actively their unique personal identities"],
  },
  "arendt-labor-work-action": {
    zh: ["劳动、工作与行动"],
    en: ["labor, work, and action"],
  },
  "arendt-public-private": {
    zh: ["私人领域与公共领域的区分", "应当展示的事物与应当隐藏的事物"],
    en: ["distinction between the private and public realms", "things that should be shown and things that should be hidden"],
  },
  "arendt-plurality": {
    zh: ["人的复数性", "平等与差异的双重性质"],
    en: ["Human plurality", "twofold character of equality and distinction"],
  },
  "arendt-forgiveness": {
    zh: ["不可逆困境", "宽恕的能力"],
    en: ["predicament of irreversibility", "faculty of forgiving"],
  },
  "arendt-right-to-rights": {
    zh: ["对人权的根本剥夺", "在世界上的一个位置"],
    en: ["fundamental deprivation of human rights", "a place in the world"],
  },
  "arendt-ideology-logic": {
    zh: ["经验就不再干扰它", "无法再接受现实的教导"],
    en: ["experiences no longer interfere with ideological thinking", "nor can it be taught by reality"],
  },
  "arendt-loneliness": {
    zh: ["失去了自己的自我", "与我平等者彼此信任、值得信任的陪伴"],
    en: ["loss of one's own self", "trusting and trustworthy company of my equals"],
  },
  "psychology-social-lewin-action-research": {
    zh: ["螺旋式步骤", "规划、行动以及查明行动结果"],
    en: ["spiral of steps", "planning, action, and fact-finding about the result of the action"],
  },
  "psychology-social-asch-ally": {
    zh: ["打破多数方的一致性", "显著增强了受试者的独立判断"],
    en: ["disturbance of the unanimity of the majority", "markedly increased the independence of the critical subjects"],
  },
  "psychology-social-festinger-insufficient-justification": {
    zh: ["奖励越大", "这种效应就越小"],
    en: ["greater the reward offered", "smaller was the effect"],
  },
  "psychology-cognition-miller-chunking": {
    zh: ["重新编码是一种极其有力的手段", "增加我们可以处理的信息量"],
    en: ["recoding is an extremely powerful weapon", "increasing the amount of information that we can deal with"],
  },
  "psychology-social-bandura-observational-learning": {
    zh: ["不能实施榜样的攻击行为", "观察或内隐过程"],
    en: ["could not perform the model's aggressive behavior", "observational or covert basis"],
  },
  "psychology-cognition-loftus-leading-verbs": {
    zh: ["车辆的实际速度", "问题措辞解释了相当多的方差"],
    en: ["actual speed of the vehicles", "phrasing of the question controlled considerable variance"],
  },
  "psychology-social-asch-conformity": {
    zh: ["压下自己的观察", "说出多数方的立场"],
    en: ["suppress their observations", "voice the majority position"],
  },
  "psychology-cognition-loftus-false-glass": {
    zh: ["更多“是”的回答"],
    en: ["more “yes” responses"],
  },
  "psychology-social-festinger-comparison": {
    zh: ["缺少客观、非社会性手段", "与他人的意见和能力相比较"],
    en: ["objective, non-social means are not available", "by comparison respectively with the opinions and abilities of others"],
  },
  "psychology-social-lewin-leadership-climate": {
    zh: ["“专制”条件造就的社会群体", "比“民主”条件僵硬得多"],
    en: ["autocracy provided a much more rigid social group", "than democracy"],
  },
  "psychology-social-bandura-vicarious-reinforcement": {
    zh: ["影响了观察者的表现", "却没有影响匹配反应的获得"],
    en: ["influenced the observers’ performance", "but not the acquisition of matching responses"],
  },
  "psychology-foundations-skinner-operant": {
    zh: ["之后呈现强化刺激", "强度就会增加"],
    en: ["followed by presentation of a reinforcing stimulus", "the strength is increased"],
  },
  "psychology-foundations-skinner-shaping": {
    zh: ["通过强化一系列逐次逼近"],
    en: ["By reinforcing a series of successive approximations"],
  },
  "psychology-foundations-skinner-discrimination": {
    zh: ["灯亮时，该反应更可能发生"],
    en: ["the response is more likely to occur when the light is on"],
  },
  "psychology-foundations-skinner-self-control": {
    zh: ["通过操纵变量"],
    en: ["through the manipulation of variables"],
  },
  "psychology-cognition-miller-seven-range": {
    zh: ["绝对判断广度与即时记忆广度", "两种截然不同的限制"],
    en: ["the span of absolute judgment and the span of immediate memory", "quite different kinds of limitations"],
  },
  "psychology-cognition-kahneman-tversky-heuristics": {
    zh: ["相当有用", "严重而系统的错误"],
    en: ["quite useful", "severe and systematic errors"],
  },
  "psychology-social-bandura-self-efficacy": {
    zh: ["本文假设", "应对行为是否会开始"],
    en: ["It is hypothesized", "whether coping behavior will be initiated"],
  },
  "psychology-cognition-deci-ryan-three-needs": {
    zh: ["促成了三种先天心理需要", "胜任、自主与关系联结"],
    en: ["led to the postulate of three innate psychological needs", "competence, autonomy, and relatedness"],
  },
  "psychology-cognition-miller-information-dimensions": {
    zh: ["提高通道容量"],
    en: ["increases the channel capacity"],
  },
  "psychology-cognition-miller-tote-plan": {
    zh: ["各种检验的结果引导"],
    en: ["guided by the outcomes of various tests"],
  },
  "psychology-cognition-miller-cognitive-revolution": {
    zh: ["把心智带回了实验心理学"],
    en: ["brought the mind back into experimental psychology"],
  },
  "psychology-cognition-deci-ryan-reward-undermining": {
    zh: ["内在动机似乎确有下降"],
    en: ["did seem to be a decrease in intrinsic motivation"],
  },
  "psychology-cognition-deci-ryan-reward-meta-analysis": {
    zh: ["积极反馈"],
    en: ["Positive feedback"],
  },
  "psychology-social-bandura-moral-disengagement": {
    zh: ["个人和集体层面"],
    en: ["individual and collective levels"],
  },
  "indian-gita-action-sustains-world": {
    zh: ["伟大的人做什么", "人们会追随"],
    en: ["Whatever a great man does", "people follow"],
  },
  "indian-gita-seeing-action": {
    zh: ["行动中看见无行动", "无行动中看见行动"],
    en: ["inaction in action", "action in inaction"],
  },
  "indian-gita-self-lift": {
    zh: ["由自己提升自己", "自己的自我既是他的朋友，也同样是他的敌人"],
    en: ["elevate his self by his self", "(a man's) own self is his friend, (a man's) own self is also his enemy"],
  },
  "indian-jain-three-jewels": {
    zh: ["正信", "解脱之路"],
    en: ["Right belief", "the path to liberation"],
  },
  "indian-jain-living-beings": {
    zh: ["厌恶痛苦，躲避毁灭", "渴望活下去"],
    en: ["hate pain, shun destruction", "long to live"],
  },
  "indian-jain-mutual-support": {
    zh: ["彼此扶助"],
    en: ["support each other"],
  },
  "indian-jain-change-persistence": {
    zh: ["同时具有", "存在之连续同一"],
    en: ["simultaneous possession", "continuous sameness of existence"],
  },
  "indian-jain-karmic-bondage": {
    zh: ["带有激情", "这就是束缚"],
    en: ["being with passion", "This (is) bondage"],
  },
  "indian-jain-five-vows": {
    zh: ["伤害", "世俗执著"],
    en: ["Himsā, injury", "Parigraha, worldly attachment"],
  },
  "indian-mimamsa-inquiry-dharma": {
    zh: ["考察法"],
    en: ["enquiry of duty"],
  },
  "indian-mimamsa-word-authority": {
    zh: ["永恒的联系"],
    en: ["eternal connection"],
  },
  "indian-mimamsa-injunction-dharma": {
    zh: ["由命令加以标示"],
    en: ["distinguished by a command"],
  },
  "indian-mimamsa-perception-limit": {
    zh: ["并不是法的根据", "已经存在之物"],
    en: ["not the cause of duty", "the thing existing"],
  },
  "indian-mimamsa-distinguishing-actions": {
    zh: ["列举各自分立", "行动有所区别"],
    en: ["separateness with the enumeration", "a difference of action"],
  },
  "indian-mimamsa-primary-auxiliary": {
    zh: ["分为两类", "主要的与从属的"],
    en: ["two kinds", "principal and subordinate"],
  },
  "indian-vaisheshika-dharma-inquiry": {
    zh: ["之所由", "“上升”与最高善"],
    en: ["from which (results)", "Exaltation and of the Supreme Good"],
  },
  "indian-vaisheshika-nine-substances": {
    zh: ["空、时间、方位", "自我与心"],
    en: ["Ether, Time, Space", "Self, and Mind"],
  },
  "indian-vaisheshika-category-errors": {
    zh: ["具有运动与性质", "实体的标志"],
    en: ["possesses Action and Attribute", "the mark of Substance"],
  },
  "indian-vaisheshika-universal-particular": {
    zh: ["既是共相，也是殊相"],
    en: ["both Genera and Species"],
  },
  "indian-vaisheshika-atoms-composites": {
    zh: ["（存在）的标志", "终极原子"],
    en: ["mark (of the existence)", "the ultimate atom"],
  },
  "indian-vaisheshika-inherence": {
    zh: ["“此在于此”", "果与因"],
    en: ["This is here", "effect and cause"],
  },
  "indian-dharmakirti-valid-cognition": {
    zh: ["成功的人类行动", "以正确认识为先"],
    en: ["successful human action", "preceded by right knowledge"],
  },
  "indian-dharmakirti-perception-error": {
    zh: ["既非构造（判断），也非错觉"],
    en: ["neither construction (judgment) nor illusion"],
  },
  "indian-gandhi-experiment-truth": {
    zh: ["任何终局性", "不会出错"],
    en: ["any finality", "infallibility"],
  },
  "indian-ambedkar-endogamy": {
    zh: ["族内婚叠加在族外婚之上", "种姓的形成"],
    en: ["superposition of endogamy on exogamy", "creation of caste"],
  },
  "indian-ambedkar-economic-democracy": {
    zh: ["放弃自己的宪法权利", "为了谋生"],
    en: ["relinquish their constitutional rights", "in order to gain their living"],
  },
  "indian-ambedkar-liberty-equality-fraternity": {
    zh: ["博爱或宗教则是神圣的", "每个人都必须尊重"],
    en: ["fraternity or religion is sacred", "everybody must respect"],
  },
  "indian-ambedkar-division-labourers": {
    zh: ["不只是劳动分工", "劳动者的分割"],
    en: ["not merely division of labour", "division of labourers"],
  },
  "indian-ambedkar-graded-inequality": {
    zh: ["骄傲和慰藉", "高于另一个种姓"],
    en: ["pride and its consolation", "above some other caste"],
  },
  "indian-ambedkar-social-reform": {
    zh: ["不能毫无后果地先于", "社会重建"],
    en: ["cannot with impunity take precedence", "reconstruction of society"],
  },
  "science-feynman-seeking-laws": {
    zh: ["把计算结果同自然、同实验或经验相比较", "直接同观察相比较"],
    en: ["compare the result of the computation to nature", "compare it directly with observation"],
  },
  "science-feynman-quantum-probability": {
    zh: ["科学仍照常前进", "相同条件并不总会产生相同结果"],
    en: ["science goes on in spite of it", "the same conditions do not always produce the same results"],
  },
  "science-kuhn-paradigm-change": {
    zh: ["范式变化", "以不同方式看待其研究活动所面对的世界"],
    en: ["paradigm changes", "see the world of their research-engagement differently"],
  },
  "science-carson-food-web": {
    zh: ["最险恶的特征之一", "通过食物链的所有环节"],
    en: ["most sinister features", "through all the links of the food chains"],
  },
  "science-carson-other-road": {
    zh: ["选择终究在我们手中"],
    en: ["The choice, after all, is ours to make"],
  },
  "science-wiener-feedback-stability": {
    zh: ["存在延迟等某些条件下", "过于急剧的反馈"],
    en: ["under certain conditions of delay", "a feedback that is too brusque"],
  },
  "science-wiener-control-communication": {
    zh: ["实际完成的运动", "用作新的输入"],
    en: ["actually performed motion", "used as a new input"],
  },
  "science-feynman-scientific-integrity": {
    zh: ["使你的解释受到怀疑的细节", "必须交代"],
    en: ["throw doubt on your interpretation", "must be given"],
  },
  "science-feynman-value-of-doubt": {
    zh: ["为了取得进展", "承认无知并为怀疑留出余地"],
    en: ["in order to progress", "recognize the ignorance and leave room for doubt"],
  },
  "science-popper-induction": {
    zh: ["观察过多少只白天鹅", "不能据此证成所有天鹅都是白的结论"],
    en: ["no matter how many instances of white swans", "does not justify the conclusion that all swans are white"],
  },
  "science-popper-falsifiability": {
    zh: ["经验科学体系", "有可能被经验反驳"],
    en: ["empirical scientific system", "refuted by experience"],
  },
  "science-popper-empirical-risk": {
    zh: ["禁止得越多", "对经验世界所说的也就越多"],
    en: ["the more a statement forbids", "the more it says about the world of experience"],
  },
  "science-popper-intersubjective-testing": {
    zh: ["科学陈述的客观性", "能够接受主体间检验"],
    en: ["objectivity of scientific statements", "inter-subjectively tested"],
  },
  "science-turing-morphogenesis": {
    zh: ["均匀平衡的不稳定性"],
    en: ["instability of the homogeneous equilibrium"],
  },
  "science-wiener-automation-responsibility": {
    zh: ["放进机器的目的正是我们真正想要的目的"],
    en: ["the purpose put into the machine is the purpose which we really desire"],
  },
  "science-franklin-diffraction": {
    zh: ["不能被当作螺旋结构的直接证明"],
    en: ["cannot, at present, be taken as direct proof that the structure is helical"],
  },
  "science-franklin-hydration": {
    zh: ["不仅取决于相对湿度，也取决于样品先前的经历"],
    en: ["depends not only on the relative humidity but also on the past history of the specimen"],
  },
  "science-kuhn-normal-science": {
    zh: ["以一种新的方式达到预期结果"],
    en: ["achieving the anticipated in a new way"],
  },
  "science-kuhn-anomaly-discovery": {
    zh: ["发现始于对异常的察觉", "由范式诱发的预期"],
    en: ["Discovery commences with the awareness of anomaly", "violated the paradigm-induced expectations"],
  },
} as const satisfies Readonly<Record<string, ThoughtEmphasisSegments>>;

export const curatedThoughtEmphasis: Readonly<Record<string, ThoughtEmphasisSegments>> = {
  ...Object.fromEntries(
    Object.entries(preCurationThoughtEmphasis).filter(
      ([thoughtId]) => !curation2026RetiredThoughtIds.has(thoughtId),
    ),
  ),
  ...westChineseCurationEmphasis,
};

export function emphasisSegmentsForThought(
  thought: Pick<Thought, "id">,
): ThoughtEmphasisSegments | undefined {
  return (curatedThoughtEmphasis as Readonly<Record<string, ThoughtEmphasisSegments>>)[thought.id];
}
