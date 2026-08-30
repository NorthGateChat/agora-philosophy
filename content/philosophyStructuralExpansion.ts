import type { Thought } from "./philosophy";

/**
 * A quota-neutral structural pass for the Western library. The retired cards
 * either duplicate stronger cards elsewhere in the catalog or compress a
 * modern work into an unattributed editorial slogan. Their replacements add
 * five missing traditions through short, locatable source passages.
 */

export const westernRetiredThoughtIds = new Set([
  "heidegger",
  "sartre",
  "camus",
  "foucault",
  "derrida",
  "averroes-audiences",
  "arendt",
  "rawls",
  "nussbaum",
  "marx-commodity-fetishism",
  "francis-bacon-idols",
  "james-stream-of-thought",
  "popper",
  "kuhn-normal-science-puzzles",
  "kuhn-anomaly-discovery",
]);

type StructuralAuthorProfile = Pick<
  Thought,
  | "authorId"
  | "name"
  | "englishName"
  | "life"
  | "englishLife"
  | "school"
  | "englishSchool"
  | "palette"
>;

const profiles = {
  sextus_empiricus: {
    authorId: "sextus_empiricus",
    name: "塞克斯都·恩披里柯",
    englishName: "Sextus Empiricus",
    life: "约 160—约 210",
    englishLife: "c. 160–c. 210 CE",
    school: "皮浪主义",
    englishSchool: "Pyrrhonism",
    palette: ["#e3e1da", "#aea997", "#6b6759", "#282620"],
  },
  lucretius: {
    authorId: "lucretius",
    name: "卢克莱修",
    englishName: "Titus Lucretius Carus",
    life: "约前 99—约前 55",
    englishLife: "c. 99–c. 55 BCE",
    school: "伊壁鸠鲁自然哲学",
    englishSchool: "Epicurean Natural Philosophy",
    palette: ["#e5dfd4", "#b8a88e", "#76644c", "#29241e"],
  },
  al_ghazali: {
    authorId: "al_ghazali",
    name: "安萨里",
    englishName: "Abū Ḥāmid al-Ghazālī",
    life: "1058—1111",
    englishLife: "1058–1111",
    school: "伊斯兰神学与苏非思想",
    englishSchool: "Islamic Theology and Sufism",
    palette: ["#dfe5df", "#a5b5a5", "#637664", "#232a24"],
  },
  maimonides: {
    authorId: "maimonides",
    name: "迈蒙尼德",
    englishName: "Moses Maimonides",
    life: "1138—1204",
    englishLife: "1138–1204",
    school: "中世纪犹太哲学",
    englishSchool: "Medieval Jewish Philosophy",
    palette: ["#e2e3e7", "#a9acb8", "#666b7a", "#24262c"],
  },
  jl_austin: {
    authorId: "jl_austin",
    name: "J. L. 奥斯汀",
    englishName: "J. L. Austin",
    life: "1911—1960",
    englishLife: "1911–1960",
    school: "日常语言哲学",
    englishSchool: "Ordinary Language Philosophy",
    palette: ["#dfe4e6", "#a5b1b6", "#63717a", "#23282b"],
  },
} satisfies Record<string, StructuralAuthorProfile>;

type ProfileId = keyof typeof profiles;

type StructuralSeed = Pick<
  Thought,
  | "id"
  | "topic"
  | "text"
  | "english"
  | "work"
  | "englishWork"
  | "editorialSummary"
  | "englishEditorialSummary"
  | "reflection"
  | "englishReflection"
  | "question"
  | "englishQuestion"
  | "sourceLocator"
> & { profileId: ProfileId };

const seeds: StructuralSeed[] = [
  {
    id: "sextus-opposes-appearances-judgements",
    profileId: "sextus_empiricus",
    topic: "知识",
    text: "怀疑论是一种能力或心灵姿态：它以任何可能的方式，把显现与判断相对置。",
    english: "Scepticism is an ability, or mental attitude, which opposes appearances to judgements in any way whatsoever.",
    work: "《皮浪主义纲要》",
    englishWork: "Outlines of Pyrrhonism",
    editorialSummary: "怀疑论先让显现与判断互相牵制，而不急着把其中一方立成结论。",
    englishEditorialSummary: "Scepticism first sets appearances and judgments against one another instead of rushing either into a conclusion.",
    reflection: "把经验与对经验的解释拆开，常能看见原先被结论遮住的另一种可能。",
    englishReflection: "Separating an experience from its interpretation can reveal possibilities that a settled conclusion had hidden.",
    question: "你此刻确信的一件事，其中哪些是显现，哪些已经是判断？",
    englishQuestion: "In something you now feel certain about, what is appearance and what is already judgment?",
    sourceLocator: [
      "塞克斯都·恩披里柯《皮浪主义纲要》第一卷第四章 §8，R. G. Bury 英译本（1933）",
      "Sextus Empiricus, Outlines of Pyrrhonism I.4 §8, trans. R. G. Bury (1933)",
    ],
  },
  {
    id: "sextus-suspense-neither-deny-affirm",
    profileId: "sextus_empiricus",
    topic: "知识",
    text: "“悬置”是一种心灵的安息：由于这种状态，我们既不否定，也不肯定任何事。",
    english: "“Suspense” is a state of mental rest owing to which we neither deny nor affirm anything.",
    work: "《皮浪主义纲要》",
    englishWork: "Outlines of Pyrrhonism",
    editorialSummary: "悬置不是尚未想好答案，而是有意识地停止肯定与否定。",
    englishEditorialSummary: "Suspension is not merely an unfinished answer; it is a deliberate cessation of both affirmation and denial.",
    reflection: "有时真正困难的不是选边，而是容许问题在证据不足时保持开放。",
    englishReflection: "Sometimes the harder discipline is not choosing a side but allowing a question to remain open when evidence is insufficient.",
    question: "哪一个争论若暂时不肯定也不否定，反而能让你看得更清楚？",
    englishQuestion: "Which dispute might become clearer if you temporarily neither affirmed nor denied its conclusion?",
    sourceLocator: [
      "塞克斯都·恩披里柯《皮浪主义纲要》第一卷第四章 §10，R. G. Bury 英译本（1933）",
      "Sextus Empiricus, Outlines of Pyrrhonism I.4 §10, trans. R. G. Bury (1933)",
    ],
  },
  {
    id: "sextus-quietude-opinion",
    profileId: "sextus_empiricus",
    topic: "伦理",
    text: "我们还主张：怀疑者的目的，是在意见之事上获得宁静，在不可避免之事上保持适度感受。",
    english: "We assert still that the Sceptic’s End is quietude in respect of matters of opinion and moderate feeling in respect of things unavoidable.",
    work: "《皮浪主义纲要》",
    englishWork: "Outlines of Pyrrhonism",
    editorialSummary: "对可争意见保持宁静，对不可免的感受则只求不过度。",
    englishEditorialSummary: "The aim is quiet regarding disputable opinions and moderation, not numbness, regarding unavoidable feelings.",
    reflection: "许多额外痛苦来自我们对痛苦的判断，而不只来自那份感受本身。",
    englishReflection: "Much additional suffering comes from our judgment about pain, not only from the sensation itself.",
    question: "你的一种不安中，哪些来自处境，哪些来自你给处境加上的意见？",
    englishQuestion: "In one of your anxieties, what comes from the situation and what comes from the opinion you add to it?",
    sourceLocator: [
      "塞克斯都·恩披里柯《皮浪主义纲要》第一卷第十二章 §25，R. G. Bury 英译本（1933）",
      "Sextus Empiricus, Outlines of Pyrrhonism I.12 §25, trans. R. G. Bury (1933)",
    ],
  },
  {
    id: "lucretius-nothing-from-nothing",
    profileId: "lucretius",
    topic: "存在",
    text: "从无之中，从来没有任何事物诞生。",
    english: "Nothing from nothing ever yet was born.",
    work: "《物性论》",
    englishWork: "On the Nature of Things",
    editorialSummary: "解释事物的生成，要寻找材料与条件，不能把“无”当作原因。",
    englishEditorialSummary: "To explain generation, look for materials and conditions rather than treating nothing as a cause.",
    reflection: "当解释跳过中间条件时，“突然发生”往往只是我们没有看见生成链条。",
    englishReflection: "When an explanation skips intermediate conditions, “sudden” change often means that we have not seen the chain of generation.",
    question: "你正在解释的一种变化，遗漏了哪些材料或条件？",
    englishQuestion: "What materials or conditions are missing from your explanation of a change?",
    sourceLocator: [
      "卢克莱修《物性论》第一卷，第 150 行，William Ellery Leonard 英译本（1916）",
      "Lucretius, On the Nature of Things I.150, trans. William Ellery Leonard (1916)",
    ],
  },
  {
    id: "lucretius-bodies-and-void",
    profileId: "lucretius",
    topic: "存在",
    text: "因此，自立的整个自然由两类事物构成：物体与虚空；物体置于其中，也在其中运动。",
    english: "All nature, then, as self-sustained, consists of twain of things: of bodies and of void in which they’re set, and where they’re moved around.",
    work: "《物性论》",
    englishWork: "On the Nature of Things",
    editorialSummary: "卢克莱修用物体与虚空的二分，为变化、碰撞和运动提供最低限度的本体论。",
    englishEditorialSummary: "Lucretius uses the twofold scheme of bodies and void as a minimal ontology for change, collision, and motion.",
    reflection: "一个理论有时因承诺更少而更有力量：先问哪些要素足以解释现象。",
    englishReflection: "A theory can gain power by committing to less: begin by asking which elements are sufficient to explain the phenomena.",
    question: "你面对的复杂问题，最少需要哪几类要素才能开始解释？",
    englishQuestion: "What is the smallest set of elements needed to begin explaining your complex problem?",
    sourceLocator: [
      "卢克莱修《物性论》第一卷，第 419—421 行，William Ellery Leonard 英译本（1916）",
      "Lucretius, On the Nature of Things I.419–421, trans. William Ellery Leonard (1916)",
    ],
  },
  {
    id: "lucretius-death-nothing",
    profileId: "lucretius",
    topic: "存在",
    text: "因此，死亡对我们无所意味，也丝毫不关涉我们，因为心灵的本性终究有死。",
    english: "Therefore death to us is nothing, nor concerns us in the least, since nature of mind is mortal evermore.",
    work: "《物性论》",
    englishWork: "On the Nature of Things",
    editorialSummary: "若经验依赖会消散的心灵，死亡便不是死者继续承受的一种状态。",
    englishEditorialSummary: "If experience depends on a mind that dissolves, death is not a further state endured by the dead.",
    reflection: "把死亡想成一种持续经验，会悄悄把仍活着的主体放进已经没有主体的位置。",
    englishReflection: "Imagining death as an ongoing experience quietly places a living subject where, by the argument, no subject remains.",
    question: "你对死亡的哪一种恐惧，其实预设死后还有一个正在感受的“我”？",
    englishQuestion: "Which fear of death assumes that a feeling “I” somehow remains afterward?",
    sourceLocator: [
      "卢克莱修《物性论》第三卷，第 830—832 行，William Ellery Leonard 英译本（1916）",
      "Lucretius, On the Nature of Things III.830–832, trans. William Ellery Leonard (1916)",
    ],
  },
  {
    id: "ghazali-bases-certitude",
    profileId: "al_ghazali",
    topic: "知识",
    text: "既然寻求真理是我为自己提出的目标，我首先应当查明：确定性的基础是什么。",
    english: "The search after truth being the aim which I propose to myself, I ought in the first place to ascertain what are the bases of certitude.",
    work: "《迷途指津》（1909 年英译题作《安萨里的忏悔》）",
    englishWork: "Deliverance from Error (translated in 1909 as The Confessions of Al Ghazzali)",
    editorialSummary: "寻真从审查“何以确定”开始，而不是先替继承来的结论辩护。",
    englishEditorialSummary: "The search for truth begins by examining what makes certainty possible, not by defending inherited conclusions first.",
    reflection: "追问确定性的基础，会把“我一直这样相信”与“我有理由这样相信”分开。",
    englishReflection: "Asking after the basis of certainty separates “I have always believed this” from “I have reason to believe this.”",
    question: "你最确信的一项判断，最终依靠感觉、推理、传统，还是别的基础？",
    englishQuestion: "Does one of your strongest convictions ultimately rest on perception, reasoning, tradition, or something else?",
    sourceLocator: [
      "安萨里《迷途指津》，1909 年 Claud Field 英译本《安萨里的忏悔》第一节“寻求真理”",
      "Al-Ghazālī, Deliverance from Error, in Claud Field's The Confessions of Al Ghazzali (1909), section 1, “The Search for Truth”",
    ],
  },
  {
    id: "ghazali-blind-belief-consciousness",
    profileId: "al_ghazali",
    topic: "知识",
    text: "一旦放弃了盲从，就不可能再回到其中，因为这种信念的本质正在于它对自身毫无意识。",
    english: "Having once surrendered blind belief, it is impossible to return to it, for the essence of such belief is to be unconscious of itself.",
    work: "《迷途指津》（1909 年英译题作《安萨里的忏悔》）",
    englishWork: "Deliverance from Error (translated in 1909 as The Confessions of Al Ghazzali)",
    editorialSummary: "未经反思的信念一旦被看见，就不能靠意志恢复成原先的无自觉。",
    englishEditorialSummary: "Once an unexamined belief becomes visible as belief, willing cannot restore its former unconsciousness.",
    reflection: "反思会让信念失去天真，却也让它第一次成为能够负责的信念。",
    englishReflection: "Reflection costs belief its innocence, but it also makes belief answerable for the first time.",
    question: "哪一种信念在你看见它的来历之后，已经无法再以原来的方式相信？",
    englishQuestion: "Which belief became impossible to hold in the same way once you saw where it came from?",
    sourceLocator: [
      "安萨里《迷途指津》，1909 年 Claud Field 英译本《安萨里的忏悔》第三节",
      "Al-Ghazālī, Deliverance from Error, in Claud Field's The Confessions of Al Ghazzali (1909), section 3",
    ],
  },
  {
    id: "ghazali-experience-not-definition",
    profileId: "al_ghazali",
    topic: "知识",
    text: "我看出，苏非之道在于体验而非定义；我所缺少的，不属于讲授的领域，而属于忘我与入门的领域。",
    english: "I saw that Sufism consists in experiences rather than in definitions, and that what I was lacking belonged to the domain, not of instruction, but of ecstasy and initiation.",
    work: "《迷途指津》（1909 年英译题作《安萨里的忏悔》）",
    englishWork: "Deliverance from Error (translated in 1909 as The Confessions of Al Ghazzali)",
    editorialSummary: "有些认识不能只靠描述获得，因为它要求人的生活方式与感受能力发生改变。",
    englishEditorialSummary: "Some understanding cannot be acquired by description alone because it requires a change in one's way of living and capacity for experience.",
    reflection: "知道一种实践“是什么”，和在实践中成为不同的人，是两种层次的理解。",
    englishReflection: "Knowing what a practice is and becoming different through it are two levels of understanding.",
    question: "你掌握的哪项知识，若不实际经历，仍只停留在定义里？",
    englishQuestion: "Which piece of knowledge you possess remains only a definition until it is actually lived?",
    sourceLocator: [
      "安萨里《迷途指津》，1909 年 Claud Field 英译本《安萨里的忏悔》第七节“苏非主义”",
      "Al-Ghazālī, Deliverance from Error, in Claud Field's The Confessions of Al Ghazzali (1909), section 7, “Sufism”",
    ],
  },
  {
    id: "maimonides-no-positive-attribute",
    profileId: "maimonides",
    topic: "语言",
    text: "由此可见，祂没有任何肯定性属性。",
    english: "Hence it is clear that He has no positive attribute whatever.",
    work: "《迷途指津》",
    englishWork: "The Guide for the Perplexed",
    editorialSummary: "面对无限者，肯定性的描述容易把有限事物的性质误加给神。",
    englishEditorialSummary: "When speaking of the infinite, positive descriptions risk transferring properties of finite things to God.",
    reflection: "语言若把超出经验的对象说得过于熟悉，清晰可能只是误置的具体。",
    englishReflection: "When language makes what exceeds experience sound too familiar, apparent clarity may be misplaced concreteness.",
    question: "你对一个难以把握的对象所作的正面描述，偷偷带入了哪些熟悉范畴？",
    englishQuestion: "Which familiar categories have slipped into your positive description of something hard to grasp?",
    sourceLocator: [
      "迈蒙尼德《迷途指津》第一部第五十八章，M. Friedländer 英译本（1904），印本第 176 页",
      "Maimonides, The Guide for the Perplexed I.58, trans. M. Friedländer (1904), print p. 176",
    ],
  },
  {
    id: "maimonides-negation-advances-knowledge",
    profileId: "maimonides",
    topic: "知识",
    text: "要知道，情形确实如此：获得关于神之知识的人彼此差异极大；正如每增加一个属性，对象就更为明确、更接近观察者的真实把握，同样，每增加一个否定性属性，你便向关于神的知识前进一步，比那未曾否定你已由证明确信必须从神那里排除的性质之人，更接近神。",
    english: "Know that this is really the case, that those who have obtained a knowledge of God differ greatly from each other; for in the same way as by each additional attribute an object is more specified, and is brought nearer to the true apprehension of the observer, so by each additional negative attribute you advance toward the knowledge of God, and you are nearer to it than he who does not negative, in reference to God, those qualities which you are convinced by proof must be negatived.",
    work: "《迷途指津》",
    englishWork: "The Guide for the Perplexed",
    editorialSummary: "否定不是知识的空缺；每排除一项不当属性，都缩小误认无限者的空间。",
    englishEditorialSummary: "Negation is not an absence of knowledge: each excluded misattribution narrows the space for mistaking the infinite.",
    reflection: "有时认识并非增添描述，而是逐步排除那些让对象看起来过于像我们的投射。",
    englishReflection: "Sometimes knowing advances not by adding descriptions but by removing those that make an object look too much like our projection.",
    question: "对于一个容易被投射覆盖的问题，你能先有根据地排除什么？",
    englishQuestion: "In a question easily covered by projection, what can you first rule out with good reason?",
    sourceLocator: [
      "迈蒙尼德《迷途指津》第一部第五十九章，M. Friedländer 英译本（1904），印本第 179 页",
      "Maimonides, The Guide for the Perplexed I.59, trans. M. Friedländer (1904), print p. 179",
    ],
  },
  {
    id: "maimonides-law-soul-body-welfare",
    profileId: "maimonides",
    topic: "政治",
    text: "律法的一般目标有二：灵魂的福祉与身体的福祉。",
    english: "The general object of the Law is twofold: the well-being of the soul, and the well-being of the body.",
    work: "《迷途指津》",
    englishWork: "The Guide for the Perplexed",
    editorialSummary: "好的律法既培养真实信念，也安排共同生活所需的身体与社会条件。",
    englishEditorialSummary: "Good law cultivates true belief while also arranging the bodily and social conditions needed for common life.",
    reflection: "制度若只谈高尚目的而忽略人们赖以生活的条件，灵魂的理想也难以落地。",
    englishReflection: "When institutions speak only of elevated ends and neglect the conditions of life, ideals of the soul struggle to take root.",
    question: "你认可的一项规则，怎样同时照顾人的理解与人的生活条件？",
    englishQuestion: "How does a rule you endorse care for both human understanding and the conditions of human life?",
    sourceLocator: [
      "迈蒙尼德《迷途指津》第三部第二十七章，M. Friedländer 英译本（1904）",
      "Maimonides, The Guide for the Perplexed III.27, trans. M. Friedländer (1904)",
    ],
  },
  {
    id: "austin-utterance-performs-action",
    profileId: "jl_austin",
    topic: "语言",
    text: "说出这句话本身，就是在施行一个行动——通常不会被认为只是说了些什么。",
    english: "the issuing of the utterance is the performing of an action—it is not normally thought of as just saying something.",
    work: "《如何以言行事》",
    englishWork: "How to Do Things with Words",
    editorialSummary: "有些话语不是报告一个既成事实，而是在适当情境中完成承诺、命名或裁决。",
    englishEditorialSummary: "Some utterances do not report a prior fact; in the right circumstances they accomplish promising, naming, or ruling.",
    reflection: "语言有时不只描写关系，也在建立、改变或解除关系。",
    englishReflection: "Language sometimes does not merely describe relationships; it establishes, changes, or dissolves them.",
    question: "你今天说出的哪一句话，不只是陈述，而实际改变了彼此的关系？",
    englishQuestion: "Which sentence you spoke today did more than state something and actually changed a relationship?",
    sourceLocator: [
      "J. L. 奥斯汀《如何以言行事》第一讲，第 6 页，第二版（1975）",
      "J. L. Austin, How to Do Things with Words, Lecture I, p. 6, 2nd ed. (1975)",
    ],
  },
  {
    id: "austin-saying-doing-three-senses",
    profileId: "jl_austin",
    topic: "语言",
    text: "我们要从根本上考察：说某事就是做某事、在说某事时做某事，乃至借由说某事而做某事，分别有多少种意义。",
    english: "to consider from the ground up how many senses there are in which to say something is to do something, or in saying something we do something, and even by saying something we do something.",
    work: "《如何以言行事》",
    englishWork: "How to Do Things with Words",
    editorialSummary: "同一句发言可以同时具有说出内容、施行语力和产生后果三个层面。",
    englishEditorialSummary: "One utterance can have three layers at once: saying content, performing illocutionary force, and producing consequences.",
    reflection: "理解一次沟通失败，需要分别检查说了什么、试图做什么，以及实际造成了什么。",
    englishReflection: "Understanding a failed exchange requires separately checking what was said, what act was attempted, and what effect actually followed.",
    question: "回看一次误会：内容、意图中的行动和实际后果，在哪一层分开了？",
    englishQuestion: "Looking back at a misunderstanding, where did content, intended act, and actual effect come apart?",
    sourceLocator: [
      "J. L. 奥斯汀《如何以言行事》第八讲，第 91 页，第二版（1975）；所引为句中连续片段",
      "J. L. Austin, How to Do Things with Words, Lecture VIII, p. 91, 2nd ed. (1975); continuous clause from the sentence",
    ],
  },
  {
    id: "austin-total-speech-situation",
    profileId: "jl_austin",
    topic: "语言",
    text: "完整言语情境中的完整言语行为，归根到底，是我们所要阐明的唯一现实整体。",
    english: "The total speech act in the total speech situation is the only actual phenomenon which, in the last resort, we are engaged in elucidating.",
    work: "《如何以言行事》",
    englishWork: "How to Do Things with Words",
    editorialSummary: "词句的意义不能脱离说话者、程序、听者与场景构成的完整事件。",
    englishEditorialSummary: "The meaning of words cannot be detached from the whole event made by speaker, procedure, audience, and situation.",
    reflection: "只截取一句话，常会漏掉谁能这样说、对谁说、在什么程序里说。",
    englishReflection: "Extracting a sentence alone often omits who can say it, to whom, and within which procedure.",
    question: "你正在解释的一句话，补上完整情境后会改变含义或效力吗？",
    englishQuestion: "Would the meaning or force of a sentence you are interpreting change once its full situation is restored?",
    sourceLocator: [
      "J. L. 奥斯汀《如何以言行事》第十二讲，第 148 页，第二版（1975）",
      "J. L. Austin, How to Do Things with Words, Lecture XII, p. 148, 2nd ed. (1975)",
    ],
  },
];

export const westernStructuralExpansionThoughts: Thought[] = seeds.map(
  ({ profileId, ...seed }): Thought => ({
    ...profiles[profileId],
    ...seed,
    presentationNature: "source-excerpt",
    rendering: "short-quote",
  }),
);
