import type { ChineseThought } from "./chinese";

/**
 * Five compact source-led clusters that fill structural gaps left after the
 * chronological Chinese expansion: Changes cosmology, Later Mohist logic,
 * Tiantai practice, Lu Jiuyuan's learning of the mind, and He-Yin Zhen's
 * anarchist feminism. English passages are AGORA study translations.
 */

type StructuralAuthorProfile = Pick<
  ChineseThought,
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
  yijing_xici: {
    authorId: "yijing_xici",
    name: "《易传·系辞》传统",
    englishName: "Xici Tradition",
    life: "约前 4—前 2 世纪（层累成书）",
    englishLife: "c. 4th–2nd century BCE (layered composition)",
    school: "易学",
    englishSchool: "Changes Cosmology",
    palette: ["#e6e0d4", "#b8a98e", "#75644d", "#29241e"],
  },
  later_mohists: {
    authorId: "later_mohists",
    name: "后期墨家",
    englishName: "Later Mohists",
    life: "约前 4—前 3 世纪",
    englishLife: "c. 4th–3rd century BCE",
    school: "墨家逻辑与认识论",
    englishSchool: "Later Mohist Logic and Epistemology",
    palette: ["#dfe4e2", "#a5b1ac", "#62716a", "#232925"],
  },
  zhiyi: {
    authorId: "zhiyi",
    name: "智顗",
    englishName: "Zhiyi",
    life: "538—597",
    englishLife: "538–597",
    school: "天台宗",
    englishSchool: "Tiantai Buddhism",
    palette: ["#e2e0e7", "#aaa5b7", "#686178", "#25232b"],
  },
  lu_jiuyuan: {
    authorId: "lu_jiuyuan",
    name: "陆九渊",
    englishName: "Lu Jiuyuan",
    life: "1139—1193",
    englishLife: "1139–1193",
    school: "南宋心学",
    englishSchool: "Southern Song Learning of the Mind",
    palette: ["#e5e1d8", "#b5aa92", "#72664e", "#29251f"],
  },
  he_yin_zhen: {
    authorId: "he_yin_zhen",
    name: "何殷震",
    englishName: "He-Yin Zhen",
    life: "约 1884—约 1920",
    englishLife: "c. 1884–c. 1920",
    school: "无政府主义女性主义",
    englishSchool: "Anarchist Feminism",
    palette: ["#e7dddf", "#bb9fa5", "#795c64", "#2b2225"],
  },
} satisfies Record<string, StructuralAuthorProfile>;

type ProfileId = keyof typeof profiles;

type StructuralSeed = Pick<
  ChineseThought,
  | "id"
  | "topic"
  | "text"
  | "plainText"
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
    id: "chinese-xici-yin-yang-way",
    profileId: "yijing_xici",
    topic: "天道",
    text: "一阴一阳之谓道，继之者善也，成之者性也。",
    plainText: "道不在阴或阳的单独一边，而在二者相继转化；生命接续这股生成力量是善，具体成形则成为各自的性。",
    english: "The alternation of yin and yang is called the Way. What continues it is goodness; what completes it is nature.",
    work: "《周易·系辞上》",
    englishWork: "Zhouyi, Xici I",
    editorialSummary: "阴阳的相继变化，把宇宙生成、价值与具体生命的成形连在一起。",
    englishEditorialSummary: "The alternation of yin and yang links cosmic generation, value, and the formation of concrete life.",
    reflection: "稳定有时并非不变，而是对相反力量的持续调节。",
    englishReflection: "Stability sometimes consists not in immobility but in continually regulating opposed forces.",
    question: "你生活中的哪种平衡，靠的不是消除一方，而是让两方有序更替？",
    englishQuestion: "Which balance in your life depends not on eliminating one side but on ordering their alternation?",
    sourceLocator: [
      "《周易·系辞上》第五章；通行本简体与现代标点",
      "Zhouyi, Xici I, chapter 5; received text, normalized punctuation",
    ],
  },
  {
    id: "chinese-xici-way-and-instruments",
    profileId: "yijing_xici",
    topic: "名实",
    text: "形而上者谓之道，形而下者谓之器；化而裁之谓之变，推而行之谓之通。",
    plainText: "超出具体形体的秩序称为道，已经成形而可用的事物称为器；把化育裁成可辨的样态叫变，把它推广到行动叫通。",
    english: "What is above form is called the Way; what is below form is called an instrument. Shaping transformation is called change; extending it into action is called free passage.",
    work: "《周易·系辞上》",
    englishWork: "Zhouyi, Xici I",
    editorialSummary: "道与器不是两个隔绝世界，而是从无形秩序到具体成形、再到实践流通的不同层面。",
    englishEditorialSummary: "Way and instruments are not two sealed worlds but different levels from unformed order through concrete formation to practical circulation.",
    reflection: "原则若不进入具体器物与行动，只会停在抽象；器物若不问其秩序，也容易失去方向。",
    englishReflection: "A principle that never enters artifacts and action remains abstract, while instruments detached from ordering purposes easily lose direction.",
    question: "你重视的一条原则，正在通过什么具体的“器”进入行动？",
    englishQuestion: "Through which concrete instrument is a principle you value entering action?",
    sourceLocator: [
      "《周易·系辞上》第十二章；通行本简体与现代标点",
      "Zhouyi, Xici I, chapter 12; received text, normalized punctuation",
    ],
  },
  {
    id: "chinese-xici-images-express-meaning",
    profileId: "yijing_xici",
    topic: "认识",
    text: "子曰：“圣人立象以尽意，设卦以尽情伪，系辞以尽其言，变而通之以尽利，鼓之舞之以尽神。”",
    plainText: "语言未必独自穷尽意义，所以圣人借形象、卦象与系辞层层表达，再让它们在变化与实行中显出作用。",
    english: "The Master said: “The sages established images to exhaust meaning, set up hexagrams to exhaust true and false conditions, attached statements to exhaust their words, changed and extended them to exhaust benefit, and stirred and moved them to exhaust the numinous.”",
    work: "《周易·系辞上》",
    englishWork: "Zhouyi, Xici I",
    editorialSummary: "意义通过象、卦、辞与实行的多层媒介展开，不只寄存在一句定义里。",
    englishEditorialSummary: "Meaning unfolds through images, hexagrams, statements, and enactment rather than residing in a definition alone.",
    reflection: "当语言不够时，好的图像与实践并非装饰，而可能承担真正的理解工作。",
    englishReflection: "When words are insufficient, good images and practices are not decoration; they can perform genuine work of understanding.",
    question: "哪个难以说明的想法，借一个结构清楚的形象会表达得更完整？",
    englishQuestion: "Which difficult idea could be expressed more fully through a well-structured image?",
    sourceLocator: [
      "《周易·系辞上》第十二章；通行本简体与现代标点",
      "Zhouyi, Xici I, chapter 12; received text, normalized punctuation",
    ],
  },
  {
    id: "chinese-mohist-cause-definition",
    profileId: "later_mohists",
    topic: "认识",
    text: "故，所得而后成也。",
    plainText: "所谓“故”，是某事物只有得到它之后才能成立的条件。",
    english: "A ground is that which, only after being obtained, allows something to come about.",
    work: "《墨子·经上》",
    englishWork: "Mozi, Canons I",
    editorialSummary: "后期墨家用极短定义把“故”理解为事物成立所依赖的条件。",
    englishEditorialSummary: "The Later Mohists define a ground in compressed form as a condition on which something's occurrence depends.",
    reflection: "追问一件事“得到什么之后才成立”，能把模糊归因改写成可检验的条件。",
    englishReflection: "Asking what must be obtained before something can occur turns a vague attribution into a testable condition.",
    question: "你正在解释的结果，究竟依赖哪一个不可缺少的条件？",
    englishQuestion: "Which indispensable condition does the result you are explaining actually depend on?",
    sourceLocator: [
      "《墨子·经上》“故”条；通行本简体与现代标点，宜与《经说上》对应条合读",
      "Mozi, Canons I, entry on gu (grounds); received text, normalized punctuation; read with the corresponding Explanations I entry",
    ],
  },
  {
    id: "chinese-mohist-kinds-of-names",
    profileId: "later_mohists",
    topic: "名实",
    text: "名，达、类、私。",
    plainText: "名称有三种层次：普遍通用的名、指一类事物的名，以及专指个体的名。",
    english: "Names are general, class, or private.",
    work: "《墨子·经上》",
    englishWork: "Mozi, Canons I",
    editorialSummary: "同样是“名”，其指称范围可以从普遍概念，经类别，收窄到个别对象。",
    englishEditorialSummary: "A name's range of reference can move from an unrestricted term through a class term to an individual designation.",
    reflection: "争论常因双方把同一个词当成不同范围的名：一个说类别，另一个却以个例回应。",
    englishReflection: "Disputes often persist because the same word is assigned different ranges: one side speaks of a class while the other answers with an individual case.",
    question: "你最近的一次争论里，哪个关键词的指称范围没有先说清楚？",
    englishQuestion: "Which key term in a recent dispute lacked an agreed range of reference?",
    sourceLocator: [
      "《墨子·经上》“名”条；通行本简体与现代标点，参《经说上》对应条",
      "Mozi, Canons I, entry on names; received text, normalized punctuation; compare the corresponding Explanations I entry",
    ],
  },
  {
    id: "chinese-mohist-name-claim-reason",
    profileId: "later_mohists",
    topic: "名实",
    text: "以名举实，以辞抒意，以说出故。",
    plainText: "用名称指举实际对象，用命题表达意思，再用解释揭示支持它的根据。",
    english: "Use names to raise actualities, statements to express intentions, and explanations to bring out grounds.",
    work: "《墨子·小取》",
    englishWork: "Mozi, Minor Illustrations",
    editorialSummary: "名、辞、说分担指称、陈述与给出理由的不同工作。",
    englishEditorialSummary: "Names, statements, and explanations divide the work of reference, assertion, and reason-giving.",
    reflection: "只给对象贴名，尚未形成主张；只说主张而不出其故，也还没有完成解释。",
    englishReflection: "Labeling an object is not yet making a claim, and stating a claim without its ground is not yet completing an explanation.",
    question: "你想说服人的一句话，已经分清它的对象、主张与理由了吗？",
    englishQuestion: "In a sentence meant to persuade, have you separated its object, claim, and reason?",
    sourceLocator: [
      "《墨子·小取》篇；通行本简体与现代标点",
      "Mozi, Minor Illustrations; received text, normalized punctuation",
    ],
  },
  {
    id: "chinese-zhiyi-three-truths-one-mind",
    profileId: "zhiyi",
    topic: "认识",
    text: "若论道理秖在一心。即空即假即中。",
    plainText: "空、假、中三种观看不是分开的三个真理；一念心中，每一法同时无自性、依条件成立，并在二者不相碍处显出中道。",
    english: "In terms of principle, they are only in one mind: immediately empty, immediately provisional, and immediately middle.",
    work: "《摩诃止观》",
    englishWork: "The Great Calming and Contemplation",
    editorialSummary: "空、假、中不是依次离开的台阶，而是在一念观照中同时成立的三个面向。",
    englishEditorialSummary: "Emptiness, provisionality, and the middle are not successive steps left behind but three simultaneous aspects of one contemplation.",
    reflection: "一件事可以既没有固定自性，又真实依条件发挥作用，而不必在“全无”与“实有”间二选一。",
    englishReflection: "Something can lack fixed essence yet function through conditions, without forcing a choice between sheer nothingness and solid being.",
    question: "你把哪件事误锁在“完全真实”或“完全虚假”的二选一里？",
    englishQuestion: "What have you mistakenly locked into a choice between wholly real and wholly unreal?",
    sourceLocator: [
      "智顗说、灌顶记《摩诃止观》卷六“观不思议境”；通行本简体与现代标点",
      "Zhiyi, lectures recorded by Guanding, The Great Calming and Contemplation, fascicle 6, “Contemplating the Inconceivable Realm”; received text, normalized punctuation",
    ],
  },
  {
    id: "chinese-zhiyi-one-mind-three-wisdoms",
    profileId: "zhiyi",
    topic: "天道",
    text: "一念心即如来藏理。如故即空，藏故即假，理故即中。三智一心中具，不可思议。",
    plainText: "当下这一念心就具如来藏之理：如其无自性，所以为空；含藏诸缘起作用，所以为假；二者不相碍，所以为中，三种智慧同具一心。",
    english: "A single thought is the principle of the tathāgata store. As suchness it is empty; as store it is provisional; as principle it is middle. The three wisdoms are present in one mind—this is inconceivable.",
    work: "《摩诃止观》",
    englishWork: "The Great Calming and Contemplation",
    editorialSummary: "天台把三谛落在当下一念，不让宇宙论脱离可实际观照的心。",
    englishEditorialSummary: "Tiantai locates the three truths in the present thought, keeping cosmology connected to a mind that can actually contemplate it.",
    reflection: "最宏大的理论若不能回到当下经验，就容易只剩概念；一念可以成为检验理论的入口。",
    englishReflection: "The grandest theory becomes merely conceptual if it cannot return to present experience; a single thought can become an entrance for testing it.",
    question: "观察当下一个念头时，你能同时看见它的无常、条件与实际作用吗？",
    englishQuestion: "While observing one present thought, can you see its impermanence, conditions, and actual effects together?",
    sourceLocator: [
      "智顗说、灌顶记《摩诃止观》卷一“圆顿止观”；通行本简体与现代标点",
      "Zhiyi, lectures recorded by Guanding, The Great Calming and Contemplation, fascicle 1, “Perfect and Sudden Calming and Contemplation”; received text, normalized punctuation",
    ],
  },
  {
    id: "chinese-zhiyi-practice-matches-words",
    profileId: "zhiyi",
    topic: "修身",
    text: "必须心观明了，理慧相应，所行如所言，所言如所行。",
    plainText: "内心观照要明白，理解要与智慧相应；行动应兑现言说，言说也要符合实际行动。",
    english: "The mind's contemplation must be clear and understanding must accord with wisdom: act as one speaks, and speak as one acts.",
    work: "《摩诃止观》",
    englishWork: "The Great Calming and Contemplation",
    editorialSummary: "止观不是只会讲说的知识；理解、言语与行动必须彼此校验。",
    englishEditorialSummary: "Calming and contemplation are not merely discursive knowledge; understanding, speech, and conduct must test one another.",
    reflection: "当行动长期跟不上语言，问题可能不只在意志，也在理解尚未真正成为自己的看法。",
    englishReflection: "When conduct repeatedly lags behind speech, the problem may be not only weak will but an understanding not yet made one's own.",
    question: "你反复说的一项原则，今天能用哪个小行动使它变得可信？",
    englishQuestion: "Which small action today could make one of your repeated principles credible?",
    sourceLocator: [
      "智顗说、灌顶记《摩诃止观》卷一；通行本简体与现代标点",
      "Zhiyi, lectures recorded by Guanding, The Great Calming and Contemplation, fascicle 1; received text, normalized punctuation",
    ],
  },
  {
    id: "chinese-lu-jiuyuan-heart-and-pattern",
    profileId: "lu_jiuyuan",
    topic: "认识",
    text: "古圣贤之言，大抵若合符节。盖心，一心也；理，一理也。至当归一，精义无二。此心此理实不容有二。",
    plainText: "古代圣贤的不同言说大体能够相合，因为人的本心与贯通事物的理最终不应分裂成两套真理。",
    english: "The words of the ancient sages generally fit together like matching tallies. Mind is one mind; pattern is one pattern. What is perfectly fitting returns to unity, and refined meaning has no duplicity. This mind and this pattern truly do not admit of two.",
    work: "《陆九渊集·与曾宅之》",
    englishWork: "Collected Works of Lu Jiuyuan, Letter to Zeng Zhaizhi",
    editorialSummary: "陆九渊拒绝把可理解的理安置在本心之外，强调心与理在最切当处不可分为两套。",
    englishEditorialSummary: "Lu Jiuyuan refuses to place intelligible pattern outside the original mind, insisting that mind and pattern cannot become two separate orders at their most fitting point.",
    reflection: "寻找更多外在材料，有时会遮住一个更早的问题：自己是否真正明白正在追求什么。",
    englishReflection: "Seeking more external material can hide an earlier question: whether one truly understands what one is pursuing.",
    question: "你正在搜集的知识，哪一部分还没有回到自己的真实判断？",
    englishQuestion: "Which part of the knowledge you are collecting has not yet returned to your own genuine judgment?",
    sourceLocator: [
      "陆九渊《陆九渊集》卷一《与曾宅之》；通行本简体与现代标点",
      "Lu Jiuyuan, Collected Works, fascicle 1, “Letter to Zeng Zhaizhi”; received text, normalized punctuation",
    ],
  },
  {
    id: "chinese-lu-jiuyuan-way-fills-cosmos",
    profileId: "lu_jiuyuan",
    topic: "天道",
    text: "道塞宇宙，非有所隐遁，在天曰阴阳，在地曰刚柔，在人曰仁义。故仁义者，人之本心也。",
    plainText: "道充满宇宙而不躲在世界背后：在天体现为阴阳，在地体现为刚柔，在人则体现为仁义，所以仁义根植于人的本心。",
    english: "The Way fills the cosmos and does not hide away anywhere. In heaven it is called yin and yang; on earth, hard and yielding; in human beings, benevolence and rightness. Thus benevolence and rightness are the original mind of human beings.",
    work: "《陆九渊集·与赵监》",
    englishWork: "Collected Works of Lu Jiuyuan, Letter to Supervisor Zhao",
    editorialSummary: "道不在经验世界之外；宇宙秩序在人这一层表现为仁义的本心。",
    englishEditorialSummary: "The Way is not outside the experienced world; at the human level, cosmic order appears as the original mind of benevolence and rightness.",
    reflection: "若道德只被体验为外部命令，人会不断寻找逃避；若它关联到本心，问题便转成如何恢复觉察。",
    englishReflection: "If morality is felt only as an external command, one keeps looking for escape; if it belongs to original mind, the task becomes recovering awareness.",
    question: "哪项道德要求在你这里只是外部规定，还没有变成内在认同？",
    englishQuestion: "Which moral demand remains an external rule for you rather than an inwardly recognized commitment?",
    sourceLocator: [
      "陆九渊《陆九渊集》卷一《与赵监》；通行本简体与现代标点",
      "Lu Jiuyuan, Collected Works, fascicle 1, “Letter to Supervisor Zhao”; received text, normalized punctuation",
    ],
  },
  {
    id: "chinese-lu-jiuyuan-root-and-branches",
    profileId: "lu_jiuyuan",
    topic: "修身",
    text: "物有本末，事有终始，知所先后，则近道矣。于其端绪之知不至，悉精毕力求多于末，沟浍皆盈，涸可立待，要之其终，本末俱失。",
    plainText: "事物有根本与末节，行动有开始与终结；若根本线索尚未明白，却耗尽精力追逐枝节，即使一时装得很满，也会很快枯竭，最后本末都失去。",
    english: "Things have roots and branches; affairs have beginnings and ends. Knowing what comes before and after brings one near the Way. If knowledge does not reach the first clues, yet one exhausts all effort seeking abundance among the branches, the ditches may fill but will soon run dry; in the end both root and branches are lost.",
    work: "《陆九渊集·与邵叔宜》",
    englishWork: "Collected Works of Lu Jiuyuan, Letter to Shao Shuyi",
    editorialSummary: "积累再多枝节，也不能代替对根本端绪与先后次序的把握。",
    englishEditorialSummary: "No abundance of details can replace grasping the root clue and the order of priorities.",
    reflection: "忙碌最容易制造“已经深入”的错觉，尤其当我们还说不清问题的根本。",
    englishReflection: "Busyness most easily creates the illusion of depth when we still cannot state the root of the problem.",
    question: "你正在堆积的细节，服务于哪个根本问题？",
    englishQuestion: "Which root question is served by the details you are accumulating?",
    sourceLocator: [
      "陆九渊《陆九渊集》卷一《与邵叔宜》；通行本简体与现代标点",
      "Lu Jiuyuan, Collected Works, fascicle 1, “Letter to Shao Shuyi”; received text, normalized punctuation",
    ],
  },
  {
    id: "chinese-he-yin-zhen-world-shared",
    profileId: "he_yin_zhen",
    topic: "政治",
    text: "数千年之世界，人治之世界也，阶级制度之世界也，故世界为男子专有之世界。今欲矫其弊，必尽废人治，实行人类平等，使世界为男女共有之世界。欲达此目的，必自女子解放始。",
    plainText: "长久以来，权力与阶级制度让世界成为男性占有的世界；要让世界真正由男女共有，必须从妇女解放开始，并同时改变支撑不平等的统治制度。",
    english: "For thousands of years the world has been a world of rule by persons and of class systems, and thus a world monopolized by men. To correct this wrong, rule by persons must be abolished and human equality enacted, making the world shared by women and men. Achieving this end must begin with women's liberation.",
    work: "《女子解放问题》",
    englishWork: "The Question of Women's Liberation",
    editorialSummary: "妇女解放不是既有秩序里的局部补位，而要与对统治和阶级制度的改造同时发生。",
    englishEditorialSummary: "Women's liberation is not a local addition to the existing order; it must proceed with transformation of rule and class systems.",
    reflection: "代表性若没有改变生活资料、劳动与权力结构，平等可能只停留在可见位置。",
    englishReflection: "If representation leaves livelihood, labor, and power structures unchanged, equality may remain confined to visible positions.",
    question: "一项看似平等的改革，是否仍保留了制造依附的制度？",
    englishQuestion: "Does a reform that appears egalitarian still preserve the institutions that manufacture dependence?",
    sourceLocator: [
      "何殷震《女子解放问题》开篇，《天义》1907 年第 7 卷；简体与现代标点",
      "He-Yin Zhen, “The Question of Women's Liberation,” opening, Natural Justice, no. 7 (1907); normalized punctuation",
    ],
  },
  {
    id: "chinese-he-yin-zhen-women-made-slaves",
    profileId: "he_yin_zhen",
    topic: "伦理",
    text: "中国数千年之制度，以女子为奴隶者也，强女子以服从者也。",
    plainText: "问题不只是个别男性态度不好，而是长期制度把女性放在奴隶地位，并把服从强加为她们的义务。",
    english: "For thousands of years China's institutions have made women slaves and compelled women to obey.",
    work: "《女子解放问题》",
    englishWork: "The Question of Women's Liberation",
    editorialSummary: "服从若由制度强制，就不能被美化为女性自愿的德性。",
    englishEditorialSummary: "When obedience is institutionally compelled, it cannot be romanticized as women's voluntary virtue.",
    reflection: "当长期强制被包装成天性，第一步是把习惯重新看作可以改变的制度。",
    englishReflection: "When long coercion is packaged as nature, the first step is to see habit again as an institution that can be changed.",
    question: "今天哪一种被称作“天性”的服从，其实由经济或制度持续制造？",
    englishQuestion: "Which obedience called “natural” today is continually produced by economic or institutional arrangements?",
    sourceLocator: [
      "何殷震《女子解放问题》中段，《天义》1907 年第 7 卷；简体与现代标点",
      "He-Yin Zhen, “The Question of Women's Liberation,” middle section, Natural Justice, no. 7 (1907); normalized punctuation",
    ],
  },
  {
    id: "chinese-he-yin-zhen-revolutions-together",
    profileId: "he_yin_zhen",
    topic: "政治",
    text: "近日中国之女子，欲争此境，凡种族、政治、经济诸革命，均宜先男子着鞭，勿复落男子之后，而男女之革命，即与种族、政治、经济诸革命并行。",
    plainText: "女性争取自由，不应等民族、政治或经济革命完成后再加入；性别革命必须与这些变革同时推进，女性也应主动走在前面。",
    english: "Women in China who now seek this condition should take the lead ahead of men in racial, political, and economic revolutions rather than fall behind them again; the revolution between women and men must proceed together with racial, political, and economic revolutions.",
    work: "《女子宣布书》",
    englishWork: "Women's Declaration",
    editorialSummary: "性别解放不能被推迟到其他革命之后，因为各种支配关系在同一个现实中交织。",
    englishEditorialSummary: "Gender liberation cannot be postponed until after other revolutions, because forms of domination are intertwined in the same reality.",
    reflection: "被要求等待的正义，往往在下一阶段仍被要求等待。",
    englishReflection: "Justice told to wait for the next stage is often told to wait again when that stage arrives.",
    question: "你支持的一项变革，把谁的解放安排成了“以后再说”？",
    englishQuestion: "Whose liberation has a change you support scheduled for “later”?",
    sourceLocator: [
      "何殷震《女子宣布书》后段，《天义》1907 年；简体与现代标点",
      "He-Yin Zhen, “Women's Declaration,” concluding section, Natural Justice (1907); normalized punctuation",
    ],
  },
];

export const chineseStructuralExpansionThoughts: ChineseThought[] = seeds.map(
  ({ profileId, ...seed }): ChineseThought => ({
    ...profiles[profileId],
    ...seed,
    presentationNature: "source-excerpt",
    rendering: "short-quote",
  }),
);
