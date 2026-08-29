import type {
  PsychologyAuthorProfile,
  PsychologyThoughtSeed,
} from "./psychologyCorpusTypes";

/**
 * Cognitive and affective psychology cards are bilingual editorial
 * paraphrases anchored to named sources. The reflections retain study design,
 * sample, historical context, and generalisation limits instead of turning a
 * finding into a context-free rule about every individual.
 */
export const psychologyCognitionProfiles = {
  neisser: {
    name: "奈瑟",
    englishName: "Ulric Neisser",
    life: "1928—2012",
    englishLife: "1928–2012",
    school: "认知心理学与生态取向",
    englishSchool: "Cognitive Psychology and Ecological Approaches",
    palette: ["#e4e7e1", "#aeb9aa", "#6d7b68", "#252b24"],
  },
  miller: {
    name: "乔治·米勒",
    englishName: "George A. Miller",
    life: "1920—2012",
    englishLife: "1920–2012",
    school: "认知科学与信息加工",
    englishSchool: "Cognitive Science and Information Processing",
    palette: ["#e2e6e8", "#aab8c0", "#677b85", "#232b2f"],
  },
  baddeleyHitch: {
    name: "巴德利与希奇",
    englishName: "Alan Baddeley & Graham Hitch",
    life: "1934—；1946—",
    englishLife: "1934–; 1946–",
    school: "工作记忆研究",
    englishSchool: "Working-Memory Research",
    palette: ["#e3e1e8", "#b0a9bd", "#70687f", "#27242e"],
  },
  tulving: {
    name: "图尔文",
    englishName: "Endel Tulving",
    life: "1927—2023",
    englishLife: "1927–2023",
    school: "记忆系统与意识",
    englishSchool: "Memory Systems and Consciousness",
    palette: ["#e8e2d8", "#c0af94", "#806c4e", "#2c261f"],
  },
  loftus: {
    name: "伊丽莎白·洛夫特斯",
    englishName: "Elizabeth Loftus",
    life: "1944—",
    englishLife: "1944–",
    school: "记忆重构与目击证词",
    englishSchool: "Reconstructive Memory and Eyewitness Testimony",
    palette: ["#e7e0dc", "#bea9a0", "#7d665d", "#2b2522"],
  },
  kahnemanTversky: {
    name: "卡尼曼与特沃斯基",
    englishName: "Daniel Kahneman & Amos Tversky",
    life: "1934—2024；1937—1996",
    englishLife: "1934–2024; 1937–1996",
    school: "判断与决策",
    englishSchool: "Judgment and Decision-Making",
    palette: ["#e7e3d9", "#beb498", "#7d7459", "#2c2921"],
  },
  lazarus: {
    name: "拉扎勒斯",
    englishName: "Richard Lazarus",
    life: "1922—2002",
    englishLife: "1922–2002",
    school: "认知评价与应对",
    englishSchool: "Cognitive Appraisal and Coping",
    palette: ["#e5e1e3", "#b9aeb4", "#796b72", "#2a2528"],
  },
  deciRyan: {
    name: "德西与瑞安",
    englishName: "Edward Deci & Richard Ryan",
    life: "1942—；1953—",
    englishLife: "1942–; 1953–",
    school: "自我决定理论",
    englishSchool: "Self-Determination Theory",
    palette: ["#e1e7df", "#a8baa5", "#687d64", "#242b23"],
  },
} satisfies Record<string, PsychologyAuthorProfile>;

export const psychologyCognitionSeeds = [
  {
    id: "psychology-cognition-neisser-constructive-activity",
    authorId: "neisser",
    topic: "感知",
    text: "认知不是把外界原样收入脑中，而是从不断变化的信息里选择、转换并组织可用的线索。",
    english:
      "Cognition does not copy the world intact; it selects, transforms, and organizes usable information from a changing environment.",
    work: "《认知心理学》",
    englishWork: "Cognitive Psychology",
    reflection:
      "奈瑟借信息加工语言反对把感知当成被动照相，同时也提醒研究者，实验任务只能捕捉认知活动的一部分。1967 年的框架推动了认知革命，但其中的计算机类比并不是关于心智结构的最终证明。",
    englishReflection:
      "Neisser used information-processing language to reject passive-copy accounts of perception while noting that laboratory tasks sample only part of cognitive activity. His 1967 framework helped the cognitive revolution, but its computer analogy was not final proof of mental architecture.",
    question: "你确信自己在“看事实”时，已经注意到选择和组织事实的方式了吗？",
    englishQuestion:
      "When you believe you are seeing the facts, have you noticed how you selected and organized them?",
    sourceLocator: [
      "第一章“认知心理学”，第 4—10 页（认知的定义与信息转换）",
      "Chapter 1, “Cognitive Psychology,” pp. 4–10 (definition of cognition and information transformation)",
    ],
  },
  {
    id: "psychology-cognition-neisser-perceptual-cycle",
    authorId: "neisser",
    topic: "感知",
    text: "知觉在一个循环中展开：已有图式引导探索，探索取得环境信息，信息又修正图式。",
    english:
      "Perception unfolds as a cycle: existing schemata direct exploration, exploration samples environmental information, and that information modifies the schemata.",
    work: "《认知与现实》",
    englishWork: "Cognition and Reality",
    reflection:
      "知觉循环把观察者的行动与环境中的信息接在一起，避免把认知只放在头脑内部。这是一个理论模型，不是能单靠一项实验确认的固定三步程序；不同任务与感官系统中的循环仍需分别检验。",
    englishReflection:
      "The perceptual cycle joins an observer's action to information in the environment rather than locating cognition wholly inside the head. It is a theoretical model, not a rigid three-step sequence established by one experiment; different tasks and sensory systems require separate tests.",
    question: "你的预期正在帮助你寻找线索，还是只让你不断找到预期中的东西？",
    englishQuestion:
      "Are your expectations helping you search, or merely helping you find what you already expected?",
    sourceLocator: [
      "第二章“知觉循环”，第 20—24 页，图 2.1",
      "Chapter 2, “The Perceptual Cycle,” pp. 20–24, Figure 2.1",
    ],
  },
  {
    id: "psychology-cognition-neisser-ecological-validity",
    authorId: "neisser",
    topic: "行为",
    text: "若研究任务与人们真实生活中的认知活动相距太远，精确结果也可能只解释实验室里的那项任务。",
    english:
      "When a research task is remote from cognition in everyday life, precise results may explain only that laboratory task.",
    work: "《认知与现实》",
    englishWork: "Cognition and Reality",
    reflection:
      "奈瑟批评认知研究过度依赖狭窄而人为的任务，推动了对生态效度的重视。但生态效度并不等于实验控制无用：自然情境提高现实贴近度，也会引入更多难以分离的变量。",
    englishReflection:
      "Neisser criticized cognitive research for relying on narrow artificial tasks and helped renew concern for ecological validity. Ecological validity does not make experimental control useless: natural settings increase realism while introducing more variables that are difficult to isolate.",
    question: "一个结论离开它最初的任务和样本后，还剩下多少解释力？",
    englishQuestion:
      "How much explanatory force remains when a result leaves its original task and sample?",
    sourceLocator: [
      "第一章“被研究的认知”，第 1—18 页（对实验室研究范围的批评）",
      "Chapter 1, “The Cognition We Study,” pp. 1–18 (critique of the scope of laboratory research)",
    ],
  },
  {
    id: "psychology-cognition-neisser-memory-reconstruction",
    authorId: "neisser",
    topic: "记忆",
    text: "记忆常是利用当下线索重建过去，而不是从一个不变的仓库里取出完整副本。",
    english:
      "Remembering often reconstructs the past from present cues rather than retrieving an intact copy from an unchanging store.",
    work: "《被观察的记忆：自然情境中的记忆》",
    englishWork: "Memory Observed: Remembering in Natural Contexts",
    reflection:
      "奈瑟汇集自然情境研究，主张把个人叙事、对话与公共事件纳入记忆科学。重构性不意味着所有回忆都同样不可靠，也不能仅凭一次回忆出错诊断个体；准确度取决于线索、时间、复述和测量方式。",
    englishReflection:
      "Neisser assembled studies of memory in natural settings, bringing personal narratives, conversation, and public events into memory science. Reconstruction does not make all recollection equally unreliable, nor does one error diagnose a person; accuracy depends on cues, delay, rehearsal, and measurement.",
    question: "你在回忆一件事时，是在重现过去，还是在用现在理解过去？",
    englishQuestion:
      "When you remember an event, are you replaying the past or interpreting it from the present?",
    sourceLocator: [
      "导言“约翰·迪恩的记忆：个案研究”，第 1—19 页",
      "Introduction, “John Dean's Memory: A Case Study,” pp. 1–19",
    ],
  },
  {
    id: "psychology-cognition-neisser-flashbulb-consistency",
    authorId: "neisser",
    topic: "记忆",
    text: "一段回忆可以长期保持鲜明与自信，却在事件细节上逐渐偏离早期记录。",
    english:
      "A memory can remain vivid and confidently held while gradually diverging from an earlier record of the event.",
    work: "《幻影闪光灯：关于挑战者号爆炸的错误回忆》",
    englishWork: "Phantom Flashbulbs: False Recollections of Hearing the News about Challenger",
    reflection:
      "奈瑟与哈施先记录大学生得知挑战者号事故的情境，约三年后再测，发现报告的一致性常低于信心。样本来自单一校园，研究考察的是接收新闻的情境而非事故本身；它提示信心与一致性可分离，不等于所有鲜明记忆都是假的。",
    englishReflection:
      "Neisser and Harsch recorded college students' reports soon after the Challenger disaster and retested them roughly three years later, finding confidence often exceeded consistency. The single-campus sample concerned hearing the news, not witnessing the event; it separates confidence from consistency without making every vivid memory false.",
    question: "当确信感与早期记录冲突时，你愿意把哪一种证据放在前面？",
    englishQuestion:
      "When confidence conflicts with an earlier record, which kind of evidence will you privilege?",
    sourceLocator: [
      "《情感与记忆中的准确性》（1992）第 9 章，第 9—31 页，方法、结果与讨论",
      "In Affect and Accuracy in Recall (1992), Chapter 9, pp. 9–31, method, results, and discussion",
    ],
  },

  {
    id: "psychology-cognition-miller-seven-range",
    authorId: "miller",
    topic: "记忆",
    text: "……绝对判断广度与即时记忆广度是两种截然不同的限制。",
    english:
      "… the span of absolute judgment and the span of immediate memory are quite different kinds of limitations",
    editorialSummary:
      "在若干即时记忆与绝对判断任务中，人的表现常落在一个狭窄范围，但“七加减二”不是普遍不变的容量定律。",
    englishEditorialSummary:
      "Across several immediate-memory and absolute-judgment tasks, performance often fell within a narrow range, but “seven plus or minus two” is not a universal fixed-capacity law.",
    work: "《神奇的数字七，加减二》",
    englishWork: "The Magical Number Seven, Plus or Minus Two",
    presentationNature: "source-excerpt",
    reflection:
      "这个连续分句来自米勒谈“神奇数字七”在两处出现只是巧合的完整句；他强调绝对判断与即时记忆是不同种类的限制，而不是把两种任务合并成一条容量定律。他把多类实验结果并置，也用带玩笑意味的语气警惕数字巧合。后续研究表明容量会随材料、复述、专业知识与测量方法而变；标题中的数字适合做历史入口，不适合给个人贴能力标签。",
    englishReflection:
      "This continuous clause comes from Miller's full sentence calling the magical number seven's appearance in both places a coincidence. He describes absolute judgment and immediate memory as different kinds of limitations rather than merging them into one capacity law. He juxtaposed several experimental literatures and treated the numerical coincidence playfully. Later work shows capacity varies with material, rehearsal, expertise, and measurement; the title's number is a historical entry point, not a label for an individual's ability.",
    context:
      "米勒在1956年的综述中并置绝对判断、即时记忆与重编码研究；本段位于即时记忆讨论末尾，专门提醒读者：两类任务都出现数字七，可能只是表面巧合。",
    englishContext:
      "Miller's 1956 review juxtaposed research on absolute judgment, immediate memory, and recoding. This clause closes the immediate-memory discussion by warning that the appearance of seven in two task families may be a surface coincidence.",
    distinction:
      "这不是“一般记忆容量恒为七项”的定律，也不能把绝对判断与即时记忆当成同一机制。材料、复述、组块、专业知识与测量方式都会改变表现。",
    englishDistinction:
      "This is not a law that general memory capacity is always seven items, and it does not make absolute judgment and immediate memory one mechanism. Material, rehearsal, chunking, expertise, and measurement all affect performance.",
    question: "你记住的是一个有边界的研究结论，还是一个容易传播的数字？",
    englishQuestion:
      "Are you remembering a bounded research conclusion or merely a memorable number?",
    sourceLocator: [
      "米勒〈神奇的数字七，加减二〉，《心理学评论》63卷2期（1956年3月），“即时记忆广度”小节末，原印刷页92，原句中的17词连续分句（主字段从句中起，无内部删节）；完整句把“两处”界定为绝对判断与即时记忆并明确区分两类限制；据原刊整期扫描核验，仅确认美国公版，不主张全球公版；在其他法域仍按署名、定位、最小必要短引用于评论",
      "Miller, “The Magical Number Seven, Plus or Minus Two,” Psychological Review 63(2) (Mar. 1956), end of “The Span of Immediate Memory,” original print p. 92, a continuous 17-word clause from the sentence (the source field begins mid-sentence, with no internal omission); the full sentence identifies the two places as absolute judgment and immediate memory and explicitly distinguishes the two kinds of limitation; verified against the paginated original-volume scan, with U.S. public-domain status only and no claim of global public-domain status; elsewhere used as an attributed, located, minimally necessary quotation for commentary",
    ],
  },
  {
    id: "psychology-cognition-miller-chunking",
    authorId: "miller",
    topic: "学习",
    text: "要点在于，重新编码是一种极其有力的手段，能增加我们可以处理的信息量。",
    english:
      "The point is that recoding is an extremely powerful weapon for increasing the amount of information that we can deal with.",
    editorialSummary:
      "通过把零散项目重新编码为有意义的组块，人可以在项目数近似不变时携带更多信息。",
    englishEditorialSummary:
      "By recoding separate items into meaningful chunks, a person can carry more information while the number of remembered units remains roughly similar.",
    work: "《神奇的数字七，加减二》",
    englishWork: "The Magical Number Seven, Plus or Minus Two",
    presentationNature: "source-excerpt",
    reflection:
      "米勒在重编码一节讨论Smith的二进制—八进制演示：20人只短暂练习，随后Smith以自己长期练习的数据展示更大增益。它说明熟练的组织方式能提高可处理的信息量，但不证明任意分组都有效、组块能无限扩张，或‘七加减二’是普遍固定容量与界面定律。",
    englishReflection:
      "In the recoding section, Miller discusses Smith's binary-to-octal demonstrations: 20 participants received only brief practice, followed by Smith's own longer-practice data showing larger gains. The examples show that well-learned organization can increase the information handled, not that arbitrary grouping works, chunks expand without limit, or seven-plus-or-minus-two is a universal fixed capacity or interface rule.",
    question: "面对复杂材料，你缺的是更多容量，还是更好的组织单位？",
    englishQuestion:
      "When material feels complex, do you need more capacity or better units of organization?",
    sourceLocator: [
      "米勒〈神奇的数字七，加减二〉，《心理学评论》63卷2期（1956年3月），‘重新编码’，原印刷页95，完整连续句；紧接Smith的二进制重编码演示，结论限于熟练重编码增加可处理信息；仅确认美国公版",
      "Miller, “The Magical Number Seven, Plus or Minus Two,” Psychological Review 63(2) (Mar. 1956), “Recoding,” original print p. 95, complete continuous sentence immediately after Smith's binary-recoding demonstration; the claim is bounded to practiced recoding increasing the amount of information handled; U.S. public-domain status only",
    ],
  },
  {
    id: "psychology-cognition-miller-information-dimensions",
    authorId: "miller",
    topic: "感知",
    text: "显然，给刺激增加可独立变化的属性会提高通道容量，但提高速度会逐渐下降。",
    english:
      "Clearly, the addition of independently variable attributes to the stimulus increases the channel capacity, but at a decreasing rate.",
    editorialSummary:
      "在绝对判断任务中，增加刺激维度有时比只扩大单一维度更能提高可区分的信息量。",
    englishEditorialSummary:
      "In absolute-judgment tasks, adding stimulus dimensions can sometimes increase discriminable information more than merely expanding one dimension.",
    work: "《神奇的数字七，加减二》",
    englishWork: "The Magical Number Seven, Plus or Minus Two",
    presentationNature: "source-excerpt",
    reflection:
      "米勒用点位、盐甜、音高与响度等绝对判断实验归纳多维刺激的信息传输；他紧接着说，变量增多时总容量上升，对任一变量的判断精度却下降。当时数据碎片化，部分跨实验比较连作者自己也称为可疑；因此虚线趋势是谨慎的经验概括，不是一条无条件的感知定律。",
    englishReflection:
      "Miller generalized across absolute-judgment experiments involving spatial position, salt and sweetness, pitch and loudness, and other multidimensional stimuli. His next sentence says that total capacity rises as variables are added while accuracy on any one variable falls. The evidence was fragmentary, and Miller himself called some cross-experiment comparisons questionable, so the dotted trend was a cautious empirical summary rather than an unconditional law of perception.",
    context:
      "引句位于论文的多维绝对判断段落。米勒先比较若干二维任务，再介绍 Pollack 与 Ficks 让听者分别评定六个声学变量的实验；该句是他对图 6 中“变量数—通道容量”趋势的直接总结。",
    englishContext:
      "The excerpt closes the paper's discussion of multidimensional absolute judgment. Miller first compares several two-dimensional tasks and then describes Pollack and Ficks's experiment in which listeners rated six acoustic variables separately. The sentence directly summarizes the variable-count versus channel-capacity trend sketched in Figure 6.",
    distinction:
      "通道容量是特定绝对判断任务中的信息传输指标，不等于一个人的一般感知能力。增加维度也不会免费地累加信息：收益递减，单维精度可能降低，而维度的独立性与任务训练都会改变结果。",
    englishDistinction:
      "Channel capacity is an information-transmission measure within a specified absolute-judgment task, not a person's general perceptual ability. Adding dimensions does not add information without cost: gains diminish, accuracy on any one dimension can fall, and dimensional independence and task training change the result.",
    question: "你是在同一尺度上不断加细，还是可以换几个彼此独立的维度来描述问题？",
    englishQuestion:
      "Are you endlessly refining one scale, or could several partly independent dimensions describe the problem better?",
    sourceLocator: [
      "米勒〈神奇的数字七，加减二〉，《心理学评论》63卷2期（1956年3月），多维绝对判断与图 6 讨论，原印刷页 88（整期扫描 PDF 第 10 页），完整连续句，英文 19 词；据原刊扫描逐字核验，仅确认美国公版",
      "Miller, “The Magical Number Seven, Plus or Minus Two,” Psychological Review 63(2) (Mar. 1956), multidimensional absolute judgment and the discussion of Figure 6, original print p. 88 (full-issue scan PDF p. 10), one complete continuous sentence, 19 English words; checked word for word against the original journal scan; U.S. public-domain status only",
    ],
  },
  {
    id: "psychology-cognition-miller-tote-plan",
    authorId: "miller",
    topic: "行为",
    text: "在其最弱形式中，TOTE 只断言：有机体所进行的操作，始终由各种检验的结果引导。",
    english:
      "In its weakest form, the TOTE asserts simply that the operations an organism performs are constantly guided by the outcomes of various tests.",
    editorialSummary:
      "有目的的行动可以被理解为反复比较当前状态与目标：检验、操作、再检验，达到条件后退出。",
    englishEditorialSummary:
      "Purposive action can be understood as repeatedly comparing a current state with a goal: test, operate, test again, and exit when the condition is met.",
    work: "《计划与行为结构》",
    englishWork: "Plans and the Structure of Behavior",
    presentationNature: "source-excerpt",
    reflection:
      "作者把 TOTE 作为反射弧的替代分析单位，但引句特意给出“最弱形式”：操作受检验结果的持续引导。他们随后才提出更强的反馈解释，并在下一页明说应将基本图式继续视为假说。因此 TOTE 是行为控制的分析语言，不是已被定位的单一脑模块。",
    englishReflection:
      "The authors offer the TOTE as an alternative unit of analysis to the reflex arc, but the excerpt deliberately states its weakest form: operations remain guided by test outcomes. They then advance a stronger feedback account and, on the following page, explicitly retain the basic diagram as a hypothesis. TOTE is therefore an analytic language for behavioral control, not a single localized brain module.",
    context:
      "在第 2 章中，作者先把 TOTE 的箭头分别解释为能量、信息与控制的传递。引句出现在他们将后续讨论限定在最抽象的控制层次之后；紧接着的段落才将 TOTE 与包含反馈的更广行为解释相连。",
    englishContext:
      "In Chapter 2, the authors first interpret the arrows of a TOTE in terms of transfers of energy, information, and control. The excerpt follows their decision to use the model at the most abstract control level. Only the next paragraph advances the broader claim that TOTE, with feedback, offers a general account of behavior.",
    distinction:
      "“检验”可以是任何确定某一操作是否合适的过程，不必是有意识的自问；“退出”也不保证目标正确或计划可行。层级 TOTE 是一种可组合的描述模式，不应被固化为所有行动都必须显式按四步运行。",
    englishDistinction:
      "A test can be any process that determines whether an operation is appropriate; it need not be a conscious self-question. Exit does not guarantee that a goal is sound or a plan feasible. Hierarchical TOTEs are composable descriptions, not a rule that every action must explicitly execute four conscious steps.",
    question: "当行动停滞时，是操作无效，还是你从未说明“何时算完成”？",
    englishQuestion:
      "When action stalls, is the operation failing, or have you never specified what counts as completion?",
    sourceLocator: [
      "米勒、加兰特与普里布拉姆《计划与行为结构》（Henry Holt，1960 年初版），第 2 章“分析单位”，原印刷页 29（扫描 PDF 第 45 页），完整连续句，英文 23 词；据初版扫描及其 OCR 转录交叉核验，按署名、定位、最小必要短引用于评论",
      "Miller, Galanter, and Pribram, Plans and the Structure of Behavior (Henry Holt, 1st ed., 1960), Chapter 2, “The Unit of Analysis,” original print p. 29 (scan PDF p. 45), one complete continuous sentence, 23 English words; cross-checked against the first-edition scan and its OCR transcription; used as an attributed, located, minimally necessary quotation for commentary",
    ],
  },
  {
    id: "psychology-cognition-miller-cognitive-revolution",
    authorId: "miller",
    topic: "行为",
    text: "无论我们怎样称呼它，心理学的认知反革命把心智带回了实验心理学。",
    english:
      "Whatever we called it, the cognitive counter-revolution in psychology brought the mind back into experimental psychology.",
    editorialSummary:
      "认知革命并非在某一天由一项发现启动，而是语言、信息论、计算与心理实验逐渐汇合的历史过程。",
    englishEditorialSummary:
      "The cognitive revolution did not begin on one day with one discovery; it emerged as language, information theory, computation, and psychological experiments gradually converged.",
    work: "《认知革命：一个历史视角》",
    englishWork: "The Cognitive Revolution: A Historical Perspective",
    presentationNature: "source-excerpt",
    reflection:
      "“带回”指实验心理学再次允许心智概念参与解释，不是说心智曾从所有心理学中消失；米勒紧接着便排除了社会与临床心理学。全文还连接信息论、语言学、人工智能、研究机构与 1956 年会议；这是参与者的回顾，应与档案及其他历史叙事对读。",
    englishReflection:
      "Brought back means that experimental psychology again allowed mental concepts to enter explanation, not that mind had vanished from every branch of psychology; Miller immediately exempts social and clinical psychology. The article also connects information theory, linguistics, artificial intelligence, institutions, and the meetings of 1956. It is a participant history that should be read alongside archives and other historical accounts.",
    context:
      "引句位于“行为主义的终结”小节。米勒先说，若实验心理学要解释行为数据，心智概念必须回到解释中，但当时研究者仍倾向用“认知”而不是“心灵主义”命名这一转向。",
    englishContext:
      "The excerpt appears in the section titled “The end of behaviorism.” Miller has just argued that mentalistic concepts had to return if experimental psychology was to integrate and explain behavioral data, while researchers still preferred to name what was needed “cognition” rather than “mentalism.”",
    distinction:
      "原句是对美国实验心理学中一次概念转向的历史概括，不表示行为研究被抛弃，也不证明革命由一人、一篇论文或一天独立造成。米勒虽把 1956 年9月11日称为“受孕时刻”，全文实际描述的是多条学科与机构线索的汇合。",
    englishDistinction:
      "The sentence summarizes a conceptual turn in U.S. experimental psychology. It neither abandons behavioral evidence nor shows that one person, paper, or day caused the revolution. Although Miller calls 11 September 1956 a “moment of conception,” the article itself traces converging disciplinary and institutional histories.",
    question: "一个领域的转向，是由决定性证据造成，还是由能让证据彼此相连的新语言造成？",
    englishQuestion:
      "Does a field turn because of decisive evidence, or because a new language allows pieces of evidence to connect?",
    sourceLocator: [
      "米勒〈认知革命：一个历史视角〉，《认知科学趋势》7卷3期（2003年3月），“行为主义的终结”小节，原印刷页 142（PDF 第 2 页），完整连续句，英文 16 词；据普林斯顿大学作者页所存原刊 PDF 逐字核验，按署名、定位、最小必要短引用于评论",
      "Miller, “The Cognitive Revolution: A Historical Perspective,” Trends in Cognitive Sciences 7(3) (Mar. 2003), “The end of behaviorism,” original print p. 142 (PDF p. 2), one complete continuous sentence, 16 English words; checked word for word against the journal PDF preserved on the author's Princeton University page; used as an attributed, located, minimally necessary quotation for commentary",
    ],
  },

  {
    id: "psychology-cognition-baddeley-hitch-unitary-store",
    authorId: "baddeleyHitch",
    topic: "记忆",
    text: "短时保持并非一个承担所有工作的单一盒子；不同任务可以共享有限控制，同时依靠不同形式的暂时表征。",
    english:
      "Short-term retention is not one box that performs every operation; tasks can share limited control while relying on different forms of temporary representation.",
    work: "《工作记忆》",
    englishWork: "Working Memory",
    reflection:
      "巴德利与希奇以双任务实验挑战单一短时储存模型：即使记忆负荷增加，推理并未总是按“一个仓库被占满”的方式崩溃。实验多使用大学生和高度简化任务，因此模型组件需要由不同年龄、临床样本与真实任务继续检验。",
    englishReflection:
      "Baddeley and Hitch used dual-task studies to challenge a unitary short-term store: increasing memory load did not always collapse reasoning as a single full box would predict. The studies relied heavily on students and simplified tasks, so the components require testing across ages, clinical groups, and everyday activities.",
    question: "当两项任务互相干扰时，它们争夺的是同一种资源，还是不同环节发生了冲突？",
    englishQuestion:
      "When two tasks interfere, are they competing for one resource, or colliding at different stages?",
    sourceLocator: [
      "《学习与动机研究进展》第 8 卷（1974），第 47—53、74—79 页",
      "In Recent Advances in Learning and Motivation, Vol. 8 (1974), pp. 47–53 and 74–79",
    ],
  },
  {
    id: "psychology-cognition-baddeley-hitch-concurrent-reasoning",
    authorId: "baddeleyHitch",
    topic: "决策",
    text: "同时维持更多数字会让推理变慢，却未必使推理完全停止；负荷的代价往往是渐进而非全或无。",
    english:
      "Holding more digits while reasoning can slow performance without stopping reasoning altogether; the cost of load is often graded rather than all-or-none.",
    work: "《工作记忆》",
    englishWork: "Working Memory",
    reflection:
      "并行推理与数字保持实验是工作记忆模型的重要起点。它显示受试者仍能完成任务，但速度和错误会随负荷变化；实验效应不能直接换算成现实中的“多任务能力”，因为任务切换、练习和动机也会改变表现。",
    englishReflection:
      "Concurrent reasoning and digit-retention experiments were an important starting point for the working-memory model. Participants could still perform, though speed and errors varied with load; the effect does not directly measure everyday multitasking, which also depends on switching, practice, and motivation.",
    question: "你所谓的“还能做”，是否忽略了速度、错误率和疲劳正在怎样变化？",
    englishQuestion:
      "When you say you can still do both, what changes in speed, errors, and fatigue are you overlooking?",
    sourceLocator: [
      "《学习与动机研究进展》第 8 卷（1974），实验 1—3，第 52—64 页",
      "In Recent Advances in Learning and Motivation, Vol. 8 (1974), Experiments 1–3, pp. 52–64",
    ],
  },
  {
    id: "psychology-cognition-baddeley-hitch-phonological-support",
    authorId: "baddeleyHitch",
    topic: "记忆",
    text: "言语材料的短暂保持可以为复杂任务提供一种辅助系统，而不必等同于全部工作记忆。",
    english:
      "Temporary retention of verbal material can support complex tasks without constituting the whole of working memory.",
    work: "《工作记忆》",
    englishWork: "Working Memory",
    reflection:
      "原始模型把言语性暂存视为从属系统，用来解释数字负荷与语音编码结果。后来“语音环路”的细节由更多实验发展出来；1974 年证据支持功能区分，却不能单凭行为任务确定其全部神经实现。",
    englishReflection:
      "The original model treated verbal temporary storage as a subsidiary system to explain digit load and phonological coding. Later experiments developed the details of the “phonological loop”; the 1974 evidence supports a functional distinction but cannot alone specify its full neural implementation.",
    question: "把一句话留在心里时，你是在保存声音、意义，还是两者不断互相补偿？",
    englishQuestion:
      "When you keep a sentence in mind, are you preserving its sound, its meaning, or a shifting support between both?",
    sourceLocator: [
      "《学习与动机研究进展》第 8 卷（1974），第 67—74、76—79 页（语音性暂存系统）",
      "In Recent Advances in Learning and Motivation, Vol. 8 (1974), pp. 67–74 and 76–79 (verbal temporary-storage system)",
    ],
  },
  {
    id: "psychology-cognition-baddeley-hitch-visual-spatial",
    authorId: "baddeleyHitch",
    topic: "感知",
    text: "视觉与空间信息可以借不同于言语复述的暂时系统支持想象、定位和行动规划。",
    english:
      "Visual and spatial information can be temporarily supported by processes different from verbal rehearsal, aiding imagery, location, and action planning.",
    work: "《工作记忆》",
    englishWork: "Working Memory",
    reflection:
      "视觉空间从属系统在早期模型中仍较概括，证据来自空间任务、想象与选择性干扰。后续研究进一步拆分视觉和空间过程；因此不应把“视觉型学习者”之类的人格标签从这些任务差异中推导出来。",
    englishReflection:
      "The visuospatial subsidiary system was still broad in the early model, supported by spatial tasks, imagery, and selective interference. Later work further separated visual and spatial processes; these task differences do not justify personality labels such as a fixed “visual learner.”",
    question: "一个问题难以用语言维持时，换成位置、路径或图像是否会改变你的推理？",
    englishQuestion:
      "When a problem is hard to hold verbally, would representing positions, paths, or images change your reasoning?",
    sourceLocator: [
      "《学习与动机研究进展》第 8 卷（1974），第 79—81 页（视觉空间从属系统）",
      "In Recent Advances in Learning and Motivation, Vol. 8 (1974), pp. 79–81 (visuospatial subsidiary system)",
    ],
  },
  {
    id: "psychology-cognition-baddeley-hitch-central-control",
    authorId: "baddeleyHitch",
    topic: "行为",
    text: "工作记忆的控制部分负责协调目标与从属系统，但“中央执行”是待分解的问题名称，不是一个无所不能的小人。",
    english:
      "The control component of working memory coordinates goals and subsidiary systems, but the “central executive” names a problem to be decomposed, not an all-powerful little agent.",
    work: "《工作记忆》",
    englishWork: "Working Memory",
    reflection:
      "中央执行在 1974 年模型中用于解释资源分配、选择和协调，最初定义比从属系统更不充分。把它当成解释终点会产生循环论证；可检验的进展来自把更新、抑制、切换等功能分别操作化，同时承认这些划分仍有争议。",
    englishReflection:
      "The 1974 model used the central executive to explain allocation, selection, and coordination, but initially specified it less fully than the subsidiary systems. Treating it as an endpoint risks circular explanation; progress comes from operationalizing updating, inhibition, switching, and related functions while recognizing ongoing debate.",
    question: "当你说“注意力不够”时，能否指出究竟是选择、更新、切换还是抑制出了问题？",
    englishQuestion:
      "When you say attention is insufficient, can you tell whether selection, updating, switching, or inhibition is the problem?",
    sourceLocator: [
      "《学习与动机研究进展》第 8 卷（1974），第 74—89 页（模型与结论）",
      "In Recent Advances in Learning and Motivation, Vol. 8 (1974), pp. 74–89 (model and conclusions)",
    ],
  },

  {
    id: "psychology-cognition-tulving-episodic-semantic",
    authorId: "tulving",
    topic: "记忆",
    text: "关于亲历事件的记忆与关于世界事实的知识相互作用，却可以作为不同的信息系统来研究。",
    english:
      "Memory for personally experienced events and knowledge about the world interact, yet can be studied as distinguishable information systems.",
    work: "《情节记忆与语义记忆》",
    englishWork: "Episodic and Semantic Memory",
    reflection:
      "图尔文在 1972 年提出分析性区分，比较两类系统的输入、组织、遗忘和检索。它不是声称每一次回忆都能被纯粹分箱；概念边界后来多次修订，神经与临床证据也显示系统既可分离又会协同。",
    englishReflection:
      "Tulving's 1972 proposal was an analytic distinction comparing input, organization, forgetting, and retrieval. It did not claim every act of remembering fits a pure box; the boundaries were repeatedly revised, and neural and clinical evidence shows both separability and interaction.",
    question: "你知道一件事，与记得自己何时何地得知它，究竟有什么不同？",
    englishQuestion:
      "What differs between knowing a fact and remembering when and where you learned it?",
    sourceLocator: [
      "《记忆的组织》（1972）第 10 章，第 381—403 页，尤其表 1",
      "In Organization of Memory (1972), Chapter 10, pp. 381–403, especially Table 1",
    ],
  },
  {
    id: "psychology-cognition-tulving-encoding-specificity",
    authorId: "tulving",
    topic: "记忆",
    text: "检索线索的有效性取决于它如何与最初编码的痕迹相交，而不只取决于线索本身看起来多么强。",
    english:
      "A retrieval cue works through its relation to the originally encoded trace, not merely through how strong the cue appears in isolation.",
    work: "《编码特异性与情节记忆的检索过程》",
    englishWork: "Encoding Specificity and Retrieval Processes in Episodic Memory",
    reflection:
      "图尔文与汤姆森用词对学习和识别—回忆任务说明，弱线索若在编码时出现，可能胜过脱离学习情境的强联想。经典实验材料有限且人为，效应大小会受任务与线索设计影响；原则不是要求机械复刻全部学习环境。",
    englishReflection:
      "Tulving and Thomson used word-pair learning and recognition-recall tasks to show that a weak cue present at encoding can outperform a strong associate supplied later. The materials were narrow and artificial, and effect size depends on task and cue design; the principle does not require mechanically recreating an entire study environment.",
    question: "你找不到一个记忆时，是内容消失了，还是当前线索没有接上当时的编码？",
    englishQuestion:
      "When a memory cannot be found, is the content gone, or are present cues failing to connect with its encoding?",
    sourceLocator: [
      "Psychological Review 80(5)，第 352—373 页，实验与“编码特异性原则”讨论",
      "Psychological Review 80(5), pp. 352–373, experiments and discussion of the encoding-specificity principle",
    ],
  },
  {
    id: "psychology-cognition-tulving-autonoetic-awareness",
    authorId: "tulving",
    topic: "自我",
    text: "情节记忆不仅提供过去的信息，还能让人以“我曾在那里”的方式在主观时间中重新经历事件。",
    english:
      "Episodic memory provides more than information about the past; it can let a person re-experience an event in subjective time as something that happened to oneself.",
    work: "《记忆与意识》",
    englishWork: "Memory and Consciousness",
    reflection:
      "图尔文把情节记忆与自知意识、语义记忆与知觉意识联系起来，为患者研究和实验测量提出框架。主观“记得”与“知道”的报告有方法限制，不能仅凭内省划定独立脑系统，也会受语言与文化表达影响。",
    englishReflection:
      "Tulving linked episodic memory to autonoetic consciousness and semantic memory to noetic consciousness, framing patient studies and experiments. Subjective reports of “remembering” versus “knowing” have methodological limits, cannot alone establish separate brain systems, and may vary with language and culture.",
    question: "你对过去的确信来自事实熟悉，还是来自仿佛重返当时的主观经验？",
    englishQuestion:
      "Does your confidence about the past come from familiar facts or from the experience of mentally returning there?",
    sourceLocator: [
      "Canadian Psychology 26(1)，第 1—12 页，尤其第 3—6 页的意识系统区分",
      "Canadian Psychology 26(1), pp. 1–12, especially pp. 3–6 on forms of consciousness",
    ],
  },
  {
    id: "psychology-cognition-tulving-mental-time-travel",
    authorId: "tulving",
    topic: "自我",
    text: "能够把自己投向曾经经历的过去，也帮助人想象尚未发生的个人未来。",
    english:
      "The capacity to project oneself into experienced past time also supports imagining a personal future that has not yet occurred.",
    work: "《情节记忆：从心智到大脑》",
    englishWork: "Episodic Memory: From Mind to Brain",
    reflection:
      "图尔文以“心理时间旅行”概括情节记忆的主观特征，并结合神经心理个案与成像研究。个案分离很有启发，却不代表所有人的未来想象只依赖一个系统；情节构造还会调用语义知识、语言与执行控制。",
    englishReflection:
      "Tulving used “mental time travel” to describe the subjective character of episodic memory and connected it to neuropsychological cases and imaging studies. Case dissociations are informative but do not show that everyone's future imagination depends on one system; construction also recruits semantic knowledge, language, and executive control.",
    question: "当你计划未来时，有多少材料其实来自对过去片段的重新组合？",
    englishQuestion:
      "When you plan a future, how much of its material is a recombination of fragments from the past?",
    sourceLocator: [
      "Annual Review of Psychology 53，第 1—25 页，尤其第 3—6、20—22 页",
      "Annual Review of Psychology 53, pp. 1–25, especially pp. 3–6 and 20–22",
    ],
  },
  {
    id: "psychology-cognition-tulving-systems-evidence",
    authorId: "tulving",
    topic: "记忆",
    text: "区分记忆系统需要多条证据会合：行为任务、患者表现、发展轨迹与神经测量各自只能提供一部分。",
    english:
      "Distinguishing memory systems requires converging evidence: behavioral tasks, patient performance, development, and neural measures each provide only part of the case.",
    work: "《情节记忆：从心智到大脑》",
    englishWork: "Episodic Memory: From Mind to Brain",
    reflection:
      "综述把功能标准、进化论证、脑损伤与成像放在同一框架中。任何单一方法都有替代解释：任务可能不纯，个案可能伴随多处损伤，成像相关也不等于因果；可信分类依赖可重复的跨方法收敛。",
    englishReflection:
      "The review brings functional criteria, evolutionary arguments, brain injury, and imaging into one framework. Every method admits alternatives: tasks may be impure, cases may have multiple lesions, and imaging correlations are not causes; credible classification depends on replicable convergence across methods.",
    question: "你接受一个心理分类，是因为名称直观，还是因为独立方法得出了相容结果？",
    englishQuestion:
      "Do you accept a psychological category because its name feels intuitive, or because independent methods yield compatible evidence?",
    sourceLocator: [
      "Annual Review of Psychology 53，第 1—25 页，表 1 及“证据”相关段落",
      "Annual Review of Psychology 53, pp. 1–25, Table 1 and the sections reviewing evidence",
    ],
  },
  {
    id: "psychology-cognition-loftus-leading-verbs",
    authorId: "loftus",
    topic: "记忆",
    text: "车辆的实际速度只解释了受试者报告中很少的方差，而问题措辞解释了相当多的方差。",
    english:
      "The actual speed of the vehicles controlled little variance in subject reporting, while the phrasing of the question controlled considerable variance.",
    editorialSummary:
      "事后提问中的一个动词，就可能改变人们对同一场车祸速度的估计；记忆报告会与提问语境相互作用。",
    englishEditorialSummary:
      "A single verb in a later question can shift estimates of the same crash's speed; memory reports interact with the context in which they are elicited.",
    work: "《汽车毁坏的重构：语言与记忆相互作用的一个例子》",
    englishWork:
      "Reconstruction of Automobile Destruction: An Example of the Interaction Between Language and Memory",
    presentationNature: "source-excerpt",
    reflection:
      "实验一让45名学生观看7段事故影片，并以五种动词询问速度；措辞改变了平均估计，但这一实验本身不能区分反应偏差与记忆表征变化。实验二的碎玻璃结果才为重构解释增加证据。学生样本与低风险影片任务也不同于真实事故中的高压目击，不能把每次报告差异都解释为原始记忆被永久改写。",
    englishReflection:
      "Experiment I showed 45 students seven accident films and varied the speed question across five verbs; wording shifted mean estimates, but this experiment alone cannot distinguish response bias from a changed memory representation. Experiment II's broken-glass result added evidence for reconstruction. The student sample and low-stakes film task also differ from high-stress real accidents, so not every reporting difference is a permanent rewriting of the original memory.",
    question: "当一个问题暗含答案时，你还能分清自己的回忆与提问者提供的框架吗？",
    englishQuestion:
      "When a question implies an answer, can you separate your own recollection from the frame supplied by the questioner?",
    sourceLocator: [
      "洛夫特斯与帕尔默〈汽车毁坏的重构：语言与记忆相互作用的一个例子〉，《言语学习与言语行为杂志》13卷5期（1974年10月），实验一讨论，原印刷页586，完整连续句；该句只确认提问措辞影响速度报告，不单独证明记忆痕迹被改写；©1974 Academic Press，按署名、定位、最小必要短引用于评论",
      "Loftus & Palmer, “Reconstruction of Automobile Destruction: An Example of the Interaction Between Language and Memory,” Journal of Verbal Learning and Verbal Behavior 13(5) (Oct. 1974), Experiment I discussion, original print p. 586, complete continuous sentence; the sentence establishes an effect on speed reports but does not by itself prove alteration of a memory trace; ©1974 Academic Press, used as an attributed, located, minimally necessary quotation for commentary",
    ],
  },
  {
    id: "psychology-cognition-loftus-false-glass",
    authorId: "loftus",
    topic: "记忆",
    text: "因此，smashed（撞碎）一词既带来更多“是”的回答，也带来更高的速度估计。",
    english:
      "Thus smashed leads both to more “yes” responses and to higher speed estimates.",
    editorialSummary:
      "带有更强碰撞暗示的提问，不只改变数值判断，也会提高后来报告不存在细节的概率。",
    englishEditorialSummary:
      "A question that implies a more forceful collision can alter more than a numerical judgment; it can increase later reports of a detail that was never present.",
    work: "《汽车毁坏的重构：语言与记忆相互作用的一个例子》",
    englishWork:
      "Reconstruction of Automobile Destruction: An Example of the Interaction Between Language and Memory",
    presentationNature: "source-excerpt",
    reflection:
      "引句中的“是”指一周后的碎玻璃问题：影片实际没有碎玻璃。先前听到 smashed 的参与者中有16/50人回答“是”，hit 组为7/50、未问速度的对照组为6/50；各组多数人仍答对。结果支持事后信息可能进入报告，不意味着暗示必然制造完整假记忆，也不能直接外推到法庭上所有证词。",
    englishReflection:
      "In the quote, “yes” answers the broken-glass question asked one week later, although the film showed no broken glass. Sixteen of 50 participants previously given smashed said yes, compared with 7 of 50 in the hit group and 6 of 50 in the no-speed-question control; most people in every group answered correctly. The result supports an influence of post-event information, not an inevitable creation of a complete false memory or a rule that applies to every courtroom account.",
    context:
      "实验二让150名学生观看一段多车事故影片；他们当场分别听到含 smashed、hit 的速度问题，或不被问速度，一周后再回答影片中是否出现碎玻璃。影片实际没有碎玻璃。",
    englishContext:
      "In Experiment II, 150 students watched a film of a multiple-car accident. They then received a speed question using smashed or hit, or no speed question, and one week later were asked whether the film showed broken glass. It did not.",
    distinction:
      "措辞提高错误报告率，不等于给多数人植入了一段完整假记忆：每组多数人仍答对。简短学生实验也不能直接代表真实案件访谈、创伤记忆或故意说谎。",
    englishDistinction:
      "Wording increased the rate of erroneous reports; it did not implant a complete false memory in most participants, because the majority in every group answered correctly. A brief student experiment also does not directly represent real-case interviews, traumatic memory, or deliberate lying.",
    question: "你是否会把后来听到的解释，误当成自己当时亲眼见到的细节？",
    englishQuestion:
      "Could an explanation heard later become confused with a detail you believe you saw at the time?",
    sourceLocator: [
      "洛夫特斯与帕尔默〈汽车毁坏的重构：语言与记忆相互作用的一个例子〉，《言语学习与言语行为杂志》13卷5期（1974年10月），实验二结果、表2讨论，原印刷页587，完整连续句；“是”指一周后的碎玻璃问题，本句本身未说明影片中没有碎玻璃；©1974 Academic Press，按署名、定位、最小必要短引用于评论",
      "Loftus & Palmer, “Reconstruction of Automobile Destruction: An Example of the Interaction Between Language and Memory,” Journal of Verbal Learning and Verbal Behavior 13(5) (Oct. 1974), Experiment II results, discussion of Table 2, original print p. 587, complete continuous sentence; “yes” refers to the broken-glass question one week later, while this sentence alone does not say that the film contained no broken glass; ©1974 Academic Press, used as an attributed, located, minimally necessary quotation for commentary",
    ],
  },
  {
    id: "psychology-cognition-loftus-semantic-integration",
    authorId: "loftus",
    topic: "记忆",
    text: "误导信息越接近事件呈现，越可能与视觉记忆结合，使人后来选中一个从未出现过的交通标志。",
    english:
      "Misleading information presented close to an event can become integrated with visual memory, increasing later choices of a traffic sign that was never shown.",
    work: "《言语信息与视觉记忆的语义整合》",
    englishWork: "Semantic Integration of Verbal Information into a Visual Memory",
    reflection:
      "洛夫特斯、米勒与伯恩斯用幻灯片展示停车或让行标志，随后在文字叙述中提供一致或不一致信息，并操纵时间间隔。学生实验说明时间与语义匹配会影响错误选择；它仍无法单独区分记忆痕迹改变、来源混淆与测试时猜测，且简化材料限制生态外推。",
    englishReflection:
      "Loftus, Miller, and Burns showed slides containing a stop or yield sign, then supplied consistent or inconsistent verbal information while varying timing. The student experiments indicate that temporal proximity and semantic fit affect erroneous choices. They do not by themselves distinguish trace alteration, source confusion, and test-time guessing, and the simplified materials limit ecological generalization.",
    question: "一条信息听起来越像原场景的一部分，你是否越容易忘记它其实来自后来？",
    englishQuestion:
      "The more naturally new information fits an event, the easier is it to forget that it arrived afterward?",
    sourceLocator: [
      "Journal of Experimental Psychology: Human Learning and Memory 4(1)（1978），第 19—31 页，实验一至三",
      "Journal of Experimental Psychology: Human Learning and Memory 4(1) (1978), pp. 19–31, Experiments 1–3",
    ],
  },
  {
    id: "psychology-cognition-loftus-weapon-focus",
    authorId: "loftus",
    topic: "感知",
    text: "场景里出现武器时，注意可能集中到武器本身，留给持有者面孔的观察与识别资源随之减少。",
    english:
      "When a weapon appears in a scene, attention may concentrate on the weapon itself, leaving fewer resources for observing and identifying its holder's face.",
    work: "《关于“武器聚焦”的若干事实》",
    englishWork: "Some Facts About “Weapon Focus”",
    reflection:
      "参与者观看顾客持支票或持枪的餐馆幻灯片；眼动与后续阵列识别显示，枪支吸引更多注视，人物识别较差。实验材料、大学生样本和低风险观看不同于真实犯罪，机制也可能包含威胁唤醒与新奇性，因此不能据此判定任何具体证人必然不可靠。",
    englishReflection:
      "Participants viewed restaurant slides in which a customer held either a check or a gun. Eye movements and later lineup tests showed more looking at the gun and poorer person identification. The materials, college sample, and risk-free viewing differ from real crime, and both threat arousal and novelty remain possible mechanisms; the result cannot determine that any particular witness is unreliable.",
    question: "在紧张场景里，最抓住你目光的东西，会不会也遮蔽了最需要记住的人？",
    englishQuestion:
      "In a tense scene, might the object that captures your gaze also obscure the person you most need to remember?",
    sourceLocator: [
      "Law and Human Behavior 11(1)（1987），第 55—62 页，实验程序、眼动与识别结果",
      "Law and Human Behavior 11(1) (1987), pp. 55–62, procedure, eye-movement, and identification results",
    ],
  },
  {
    id: "psychology-cognition-loftus-lost-mall",
    authorId: "loftus",
    topic: "记忆",
    text: "在家人提供真实童年材料的背景中，少数参与者也会逐渐接受并补充一个虚构的“商场走失”事件。",
    english:
      "When a fictitious childhood event is embedded among family-supplied true events, a minority of participants may come to accept and elaborate the invented episode.",
    work: "《虚假记忆的形成》",
    englishWork: "The Formation of False Memories",
    reflection:
      "洛夫特斯与皮克雷尔让 24 人阅读三件亲属确认的真事和一件虚构的走失经历，并多次回忆；部分参与者报告了虚构事件的细节。这个小型、非代表性研究说明自传体暗示具有可能性，却不能给出普遍发生率，更不能把普通童年事件等同于创伤记忆或用作个案真伪检测。",
    englishReflection:
      "Loftus and Pickrell asked 24 people to recall three family-verified events and one invented lost-in-a-mall episode across repeated interviews; some supplied details for the fiction. This small, nonrepresentative study demonstrates possibility, not a population prevalence. It neither equates an ordinary childhood episode with traumatic memory nor diagnoses whether a particular account is true.",
    question: "当熟悉的人替一段故事背书时，你会用什么证据区分想象的流畅与亲历的记忆？",
    englishQuestion:
      "When a trusted person lends credibility to a story, what evidence could separate fluent imagination from lived memory?",
    sourceLocator: [
      "Psychiatric Annals 25(12)（1995），第 720—725 页，24 人“商场走失”研究",
      "Psychiatric Annals 25(12) (1995), pp. 720–725, the 24-participant lost-in-the-mall study",
    ],
  },
  {
    id: "psychology-cognition-kahneman-tversky-small-numbers",
    authorId: "kahnemanTversky",
    topic: "决策",
    text: "人们容易期待小样本也像总体一样规则，从而低估抽样波动，并对偶然形成的模式过早下结论。",
    english:
      "People often expect a small sample to resemble its population too closely, underestimate sampling variation, and conclude too quickly that chance patterns are meaningful.",
    work: "《小数定律信念》",
    englishWork: "Belief in the Law of Small Numbers",
    reflection:
      "特沃斯基与卡尼曼用研究设计判断、问卷例题与统计论证，展示专业研究者也可能高估小样本的稳定性。文章是早期诊断性综述，不是现代大规模代表性调查；题目表现会受统计训练与表达方式影响，但其功效分析提醒仍可重复计算和检验。",
    englishReflection:
      "Tversky and Kahneman used research-design judgments, questionnaire problems, and statistical argument to show that even researchers may overestimate small-sample stability. This was an early diagnostic review rather than a modern representative survey. Performance varies with training and wording, although its power-analysis warning remains directly calculable and testable.",
    question: "你看到连续几次相同结果时，会先寻找规律，还是先问样本小到足以被偶然支配吗？",
    englishQuestion:
      "When several results line up, do you first infer a pattern or ask whether a small sample could still be dominated by chance?",
    sourceLocator: [
      "Psychological Bulletin 76(2)（1971），第 105—110 页，尤其样本量与重复研究例题",
      "Psychological Bulletin 76(2) (1971), pp. 105–110, especially the sample-size and replication problems",
    ],
  },
  {
    id: "psychology-cognition-kahneman-tversky-heuristics",
    authorId: "kahnemanTversky",
    topic: "决策",
    text: "一般而言，这些启发式方法相当有用，但有时也会导致严重而系统的错误。",
    english:
      "In general, these heuristics are quite useful, but sometimes they lead to severe and systematic errors.",
    editorialSummary:
      "代表性、可得性与锚定能快速简化不确定判断，却会在可预测条件下偏离概率与统计信息。",
    englishEditorialSummary:
      "Representativeness, availability, and anchoring can simplify uncertain judgments quickly, yet under predictable conditions they depart from probability and statistical information.",
    work: "《不确定性下的判断：启发式与偏差》",
    englishWork: "Judgment under Uncertainty: Heuristics and Biases",
    presentationNature: "source-excerpt",
    reflection:
      "“这些启发式方法”指文章随后讨论的代表性、可得性与从锚点调整；原句同时保留“相当有用”和“有时出错”，并未把启发式等同于错误。这篇综述汇集了多个简短实验与演示；许多早期样本便利且题目人工，后续效应大小会随激励、知识与表述变化。“偏差”描述任务中的偏离，不等于给个人贴上非理性标签。",
    englishReflection:
      "“These heuristics” refers to representativeness, availability, and adjustment from an anchor, which the article goes on to discuss. By saying both “quite useful” and “sometimes” erroneous, the sentence does not equate heuristics with mistakes. The review assembled brief experiments and demonstrations; many early samples were convenient and tasks artificial, and later effect sizes vary with incentives, expertise, and wording. A task-level bias is not a diagnosis that a person is generally irrational.",
    context:
      "这篇1974年综述从不确定事件的概率判断切入，以一系列实验演示讨论代表性、可得性与从锚点调整；引句位于正文开篇，是对全文论证的总括。",
    englishContext:
      "The 1974 review begins with judgments of uncertain-event probabilities and uses a series of experimental demonstrations to examine representativeness, availability, and adjustment from an anchor. The excerpt is the opening paragraph's summary of that argument.",
    distinction:
      "启发式是常常有效的简化方法，并非错误本身；“系统性错误”指特定任务条件下可重复的偏离，不表示每次直觉判断都错，也不是对个人理性的诊断。",
    englishDistinction:
      "Heuristics are often effective simplifications, not errors by definition. “Systematic errors” are repeatable departures under specified task conditions; they do not mean every intuitive judgment is wrong or diagnose a person's rationality.",
    question: "你现在依赖的直觉，是对环境结构的高效压缩，还是忽略了一个关键基准率？",
    englishQuestion:
      "Is the intuition you rely on an efficient compression of the environment, or is it omitting a crucial base rate?",
    sourceLocator: [
      "特沃斯基与卡尼曼〈不确定性下的判断：启发式与偏差〉，《科学》185卷4157期（1974年9月27日），正文首段，原印刷页1124，完整连续句；“这些启发式方法”由紧邻上下文及全文界定为代表性、可得性与从锚点调整，原句也明确说它们通常有用；按署名、定位、最小必要短引用于评论",
      "Tversky & Kahneman, “Judgment under Uncertainty: Heuristics and Biases,” Science 185(4157) (27 Sept. 1974), opening paragraph, original print p. 1124, complete continuous sentence; the adjacent context and article identify “these heuristics” as representativeness, availability, and adjustment from an anchor, and the sentence itself says they are generally useful; used as an attributed, located, minimally necessary quotation for commentary",
    ],
  },
  {
    id: "psychology-cognition-kahneman-tversky-reference-dependence",
    authorId: "kahnemanTversky",
    topic: "决策",
    text: "风险选择常围绕一个参照点被体验为得失，而不是只按最终财富水平计算；同一变化在损失侧通常显得更陡。",
    english:
      "Risky choices are often experienced as gains or losses around a reference point rather than evaluated only by final wealth, with changes commonly felt more steeply on the loss side.",
    work: "《前景理论：风险决策分析》",
    englishWork: "Prospect Theory: An Analysis of Decision under Risk",
    reflection:
      "前景理论以成组的假设选择问题挑战期望效用的若干描述性预测，并用价值函数概括参照依赖与损失侧更陡的模式。原始样本、金钱激励与文化覆盖有限，参数不是人人固定相同；该模型描述常见选择规律，不告诉人应当如何选择。",
    englishReflection:
      "Prospect theory used sets of hypothetical choices to challenge descriptive predictions of expected utility and modeled reference dependence with a value function steeper for losses. The original samples, monetary incentives, and cultural coverage were limited, and parameters are not fixed across everyone. The model describes recurring choice patterns; it does not prescribe what people ought to choose.",
    question: "你正在避免的是绝对上的坏结果，还是相对某个刚刚形成的参照点所感到的损失？",
    englishQuestion:
      "Are you avoiding a bad final outcome, or a loss felt relative to a reference point that has just formed?",
    sourceLocator: [
      "Econometrica 47(2)（1979），第 263—291 页，尤其第 274—280 页的价值函数",
      "Econometrica 47(2) (1979), pp. 263–291, especially pp. 274–280 on the value function",
    ],
  },
  {
    id: "psychology-cognition-kahneman-tversky-decision-weights",
    authorId: "kahnemanTversky",
    topic: "决策",
    text: "人们在选择中赋予概率的心理权重并不等于概率本身：确定性会被格外看重，小概率也可能获得不成比例的影响。",
    english:
      "The psychological weight assigned to probability in choice is not probability itself: certainty can receive special emphasis, while small probabilities may exert disproportionate influence.",
    work: "《前景理论：风险决策分析》",
    englishWork: "Prospect Theory: An Analysis of Decision under Risk",
    reflection:
      "论文用确定性效应与共同比率等选择组说明，客观概率并非线性进入决策，并提出决策权重函数。早期证据多是假设性赌局，极小概率处的数据尤其稀疏；权重会随描述、经验与领域改变，不能当作稳定人格特征。",
    englishReflection:
      "Choice sets involving certainty and common ratios suggested that objective probabilities do not enter decisions linearly, motivating a decision-weight function. Much of the early evidence came from hypothetical gambles and was especially sparse at tiny probabilities. Weighting changes with description, experience, and domain and should not be treated as a stable personality trait.",
    question: "一个结果吸引你，是因为它更可能发生，还是因为“确定”或“万一”的感觉被放大了？",
    englishQuestion:
      "Does an outcome attract you because it is more probable, or because the feeling of certainty—or of ‘what if’—has been amplified?",
    sourceLocator: [
      "Econometrica 47(2)（1979），第 263—291 页，尤其第 265—269、280—284 页",
      "Econometrica 47(2) (1979), pp. 263–291, especially pp. 265–269 and 280–284",
    ],
  },
  {
    id: "psychology-cognition-kahneman-tversky-framing",
    authorId: "kahnemanTversky",
    topic: "决策",
    text: "结果相同的选择，只因被表述为“挽救”还是“死亡”，就可能让多数人的风险偏好发生反转。",
    english:
      "Choices with equivalent outcomes can reverse majority risk preferences when framed as lives saved rather than deaths, or vice versa.",
    work: "《决策框架与选择心理学》",
    englishWork: "The Framing of Decisions and the Psychology of Choice",
    reflection:
      "“亚洲疾病”问题以数学等价的得益与损失表述得到不同群体偏好，是框架效应的经典演示。它使用假设情境与便利样本，重复研究会受措辞、理解与样本影响；结果说明描述会改变心理表征，并不证明人总会被任何框架操纵。",
    englishReflection:
      "The Asian disease problem produced different aggregate preferences under mathematically equivalent gain and loss descriptions, a classic framing demonstration. It used hypothetical scenarios and convenience samples, and replications vary with wording, comprehension, and population. The result shows that descriptions can alter mental representation, not that every person is manipulable by every frame.",
    question: "如果把同一个方案从“得到什么”改写成“避免失去什么”，你的选择会保持一致吗？",
    englishQuestion:
      "If the same option were rewritten from what you gain to what you avoid losing, would your choice remain consistent?",
    sourceLocator: [
      "Science 211（1981），第 453—458 页，问题 1 与问题 2 的“亚洲疾病”框架",
      "Science 211 (1981), pp. 453–458, Problems 1 and 2 on the Asian disease framing",
    ],
  },
  {
    id: "psychology-cognition-lazarus-transactional-stress",
    authorId: "lazarus",
    topic: "情绪",
    text: "压力不只存在于刺激或个人内部，而形成于一个人对环境要求与自身关系的评估。",
    english:
      "Stress is located neither solely in a stimulus nor solely inside a person; it emerges from an appraisal of the relationship between environmental demands and the self.",
    work: "《心理压力与应对过程》",
    englishWork: "Psychological Stress and the Coping Process",
    reflection:
      "拉扎勒斯综合实验室威胁影片、个体差异与早期应对研究，反对仅用刺激强度定义压力，转向人—环境关系。这个理论整合先于许多现代纵向与生理测量；“评估”也不一定是有意识的语言判断，且不能替代对贫困、暴力或疾病等客观负担的测量。",
    englishReflection:
      "Lazarus integrated threat-film experiments, individual differences, and early coping work to reject a definition of stress based only on stimulus intensity and to emphasize person–environment relations. This synthesis preceded much modern longitudinal and physiological measurement. Appraisal need not be a conscious verbal judgment, and it does not replace measurement of objective burdens such as poverty, violence, or illness.",
    question: "同一要求对你构成压力，是因为它本身，还是因为你此刻如何估计它与你的关系？",
    englishQuestion:
      "Does a demand become stressful because of the demand itself, or because of how you currently appraise its relation to you?",
    sourceLocator: [
      "Psychological Stress and the Coping Process（1966），第 1—2 章，尤其压力作为关系的界定",
      "Psychological Stress and the Coping Process (1966), Chapters 1–2, especially the relational definition of stress",
    ],
  },
  {
    id: "psychology-cognition-lazarus-primary-appraisal",
    authorId: "lazarus",
    topic: "情绪",
    text: "面对事件，人会首先评估它与自身福祉是否有关，并可能把它理解为已经造成的伤害、未来威胁或可投入的挑战。",
    english:
      "In encountering an event, a person appraises whether it matters for well-being and may construe it as harm already done, a future threat, or a challenge worth engaging.",
    work: "《压力、评估与应对》",
    englishWork: "Stress, Appraisal, and Coping",
    reflection:
      "拉扎勒斯与福克曼把初级评估细分为无关、良性积极以及压力相关，并在后者中区分伤害、威胁与挑战。这是过程模型而非固定人格测验；类别可同时出现并随新信息改变，研究多依赖自陈，因此因果方向和跨文化语义需要另行检验。",
    englishReflection:
      "Lazarus and Folkman divided primary appraisal into irrelevant, benign-positive, and stressful meanings, then distinguished harm, threat, and challenge within the last category. This is a process model, not a fixed personality test. Appraisals can coexist and change with information, while reliance on self-report leaves causal direction and cross-cultural meanings to be tested.",
    question: "你把眼前困难命名为威胁还是挑战时，哪些事实变了，哪些只是关系意义变了？",
    englishQuestion:
      "When you call a difficulty a threat rather than a challenge, which facts changed and which changes concern its meaning for you?",
    sourceLocator: [
      "Stress, Appraisal, and Coping（1984），第 2 章，第 31—53 页，初级评估部分",
      "Stress, Appraisal, and Coping (1984), Chapter 2, pp. 31–53, section on primary appraisal",
    ],
  },
  {
    id: "psychology-cognition-lazarus-secondary-appraisal",
    authorId: "lazarus",
    topic: "情绪",
    text: "评估威胁之外，人还会衡量可以做什么：有哪些资源、行动方案、控制余地以及每种选择的代价。",
    english:
      "Beyond appraising a threat, people assess what can be done: available resources, possible actions, degree of control, and the costs of each option.",
    work: "《压力、评估与应对》",
    englishWork: "Stress, Appraisal, and Coping",
    reflection:
      "所谓次级评估指应对可能性的判断，“次级”表示分析位置而非重要性较低。资源感与控制感常和情绪、行为相互影响，横断自陈难以确定先后；实际可用资源也可能与主观估计不同，因此干预不能只要求个人“换个想法”。",
    englishReflection:
      "Secondary appraisal concerns coping possibilities; “secondary” marks its analytical place, not lesser importance. Perceived resources and control often influence—and are influenced by—emotion and behavior, so cross-sectional self-report cannot settle sequence. Actual resources may also differ from perceived ones, which is why intervention cannot simply ask a person to think differently.",
    question: "你感到无路可走时，缺少的是现实资源、可见选项，还是对自己能否行动的判断？",
    englishQuestion:
      "When no way forward seems available, is the shortage in actual resources, visible options, or your estimate of whether you can act?",
    sourceLocator: [
      "Stress, Appraisal, and Coping（1984），第 2—3 章，次级评估与再评估部分",
      "Stress, Appraisal, and Coping (1984), Chapters 2–3, sections on secondary appraisal and reappraisal",
    ],
  },
  {
    id: "psychology-cognition-lazarus-coping-functions",
    authorId: "lazarus",
    topic: "行为",
    text: "应对既可以改变造成困扰的问题，也可以调节由问题引发的情绪；两种功能常在同一过程中并存。",
    english:
      "Coping can aim to change the problem causing distress or to regulate the emotion it produces, and both functions often coexist within the same process.",
    work: "《压力、评估与应对》",
    englishWork: "Stress, Appraisal, and Coping",
    reflection:
      "问题聚焦与情绪聚焦是应对功能，不是把人分成两类，也不是“理性”与“逃避”的道德排序。在可控情境中行动可能有效，在不可控损失中情绪调节可能更合适；早期研究多用回顾问卷，分类稳定性、情境细节与长期结果需分别测量。",
    englishReflection:
      "Problem-focused and emotion-focused coping are functions, not two kinds of person and not a moral ranking of rationality versus avoidance. Action may help in controllable situations, while emotion regulation may fit an uncontrollable loss. Much early evidence relied on retrospective questionnaires, so classification reliability, situational detail, and long-term outcomes require separate measurement.",
    question: "你正在用的办法，是在改变处境、承受情绪，还是同时做这两件事？",
    englishQuestion:
      "Is your current response changing the situation, carrying the emotion, or doing both at once?",
    sourceLocator: [
      "Stress, Appraisal, and Coping（1984），第 6—7 章，应对功能与测量部分",
      "Stress, Appraisal, and Coping (1984), Chapters 6–7, sections on coping functions and measurement",
    ],
  },
  {
    id: "psychology-cognition-lazarus-relational-themes",
    authorId: "lazarus",
    topic: "情绪",
    text: "不同情绪可被理解为不同的关系主题：重要目标受到何种影响、责任归于何处，以及应对前景如何。",
    english:
      "Different emotions can be understood through different relational themes: how an important goal is affected, where responsibility is located, and what coping prospects remain.",
    work: "《情绪与适应》",
    englishWork: "Emotion and Adaptation",
    reflection:
      "拉扎勒斯为愤怒、焦虑、内疚、悲伤等提出核心关系主题，把情绪与目标相关性、责任和应对潜力连接起来。这是可检验的理论映射，不是一种情绪对应一个唯一念头的诊断表；评估可能快速且非语言，文化规范与生理状态也会改变表达和报告。",
    englishReflection:
      "Lazarus proposed core relational themes for anger, anxiety, guilt, sadness, and other emotions, linking them to goal relevance, responsibility, and coping potential. This is a testable theoretical mapping, not a diagnostic table in which each emotion reveals one unique thought. Appraisal may be rapid and nonverbal, while cultural norms and bodily states also shape expression and report.",
    question: "若一种情绪反复出现，它在保护哪个目标，又把谁视为改变局面的行动者？",
    englishQuestion:
      "If an emotion keeps returning, which goal is it protecting, and whom does it treat as able or responsible to change the situation?",
    sourceLocator: [
      "Emotion and Adaptation（1991），第 3 章及各情绪核心关系主题表",
      "Emotion and Adaptation (1991), Chapter 3 and the tables of core relational themes for specific emotions",
    ],
  },
  {
    id: "psychology-cognition-deci-ryan-reward-undermining",
    authorId: "deciRyan",
    topic: "动机",
    text: "在经历金钱奖励之后，对该活动的内在动机似乎确有下降。",
    english:
      "There did seem to be a decrease in intrinsic motivation to the activity following the experience with monetary rewards.",
    editorialSummary:
      "对原本有趣的活动，预期的外在报酬有时会降低报酬撤去后人们自发继续参与的时间。",
    englishEditorialSummary:
      "For an activity that is already interesting, an expected external reward can sometimes reduce the time people freely continue after the reward is removed.",
    work: "《外部中介报酬对内在动机的影响》",
    englishWork: "Effects of Externally Mediated Rewards on Intrinsic Motivation",
    presentationNature: "source-excerpt",
    reflection:
      "引句保留了德西的谨慎语气。实验一只有 24 名大学生；金钱组从第一期到第三期的自由选择拼图时间减少，与对照组之差在双尾检验中只达 p < .10，且有天花板效应。这是一项小型、特定任务的早期证据，不能单独推出所有奖励都会损害所有人的动机。",
    englishReflection:
      "The excerpt preserves Deci's cautious wording. Experiment I included only 24 college students. Free-choice puzzle time from Period 1 to Period 3 fell in the payment group relative to the control, but the between-group difference reached only p < .10 on a two-tailed test and was affected by a ceiling. This small, task-specific early result cannot by itself show that every reward harms every person's motivation.",
    context:
      "实验一让被试在三次课程中解 Soma 拼图：实验组只在第二次每完成一题获得 1 美元，第一与第三次不付费。“内在动机”的主要操作指标，是主试离开房间 8 分钟时，被试仍自由用于拼图的秒数；引句位于实验一结果的末尾总结。",
    englishContext:
      "Experiment I used three Soma-puzzle sessions. The experimental group received $1 per solution only in Session 2 and no payment in Sessions 1 or 3. The principal operational measure of intrinsic motivation was the number of seconds participants freely chose to keep working during an eight-minute period when the experimenter left the room. The excerpt concludes the Experiment I results.",
    distinction:
      "这里测量的是报酬撤去后一段短暂自由选择期内的行为，不是对一个人“真实动机”的直接读取。金钱报酬、言语肯定、控制性条件与能力信息不应被并为同一种“奖励”，而且原研究将其结果写成需要更多证据验证的倾向。",
    englishDistinction:
      "The measure is behavior during a brief free-choice period after reward removal, not a direct reading of a person's “true motivation.” Monetary payment, verbal praise, controlling contingencies, and competence information should not be collapsed into one kind of reward, and the original report treats the result as a tendency requiring more evidence.",
    question: "一个奖励是在承认你的能力，还是把原本由你选择的事情变成必须交换的任务？",
    englishQuestion:
      "Is a reward acknowledging your competence, or turning something you chose into a task performed for exchange?",
    sourceLocator: [
      "德西〈外部中介报酬对内在动机的影响〉，《人格与社会心理学杂志》18卷1期（1971年4月），实验一结果末，原印刷页 110（PDF 第 6 页），完整连续句，英文 19 词；据作者自我决定理论项目公开 PDF 逐字核验，按署名、定位、最小必要短引用于评论",
      "Deci, “Effects of Externally Mediated Rewards on Intrinsic Motivation,” Journal of Personality and Social Psychology 18(1) (Apr. 1971), end of the Experiment I results, original print p. 110 (PDF p. 6), one complete continuous sentence, 19 English words; checked word for word against the PDF published by the authors' Self-Determination Theory project; used as an attributed, located, minimally necessary quotation for commentary",
    ],
  },
  {
    id: "psychology-cognition-deci-ryan-autonomy-competence",
    authorId: "deciRyan",
    topic: "动机",
    text: "持久而自我决定的投入，更可能出现在人感到行为出于自己，并能在行动中体验到有效性的条件下。",
    english:
      "Sustained, self-determined engagement is more likely when people experience their action as their own and can feel effective in carrying it out.",
    work: "《人类行为中的内在动机与自我决定》",
    englishWork: "Intrinsic Motivation and Self-Determination in Human Behavior",
    reflection:
      "德西与瑞安以认知评价和有机整合框架连接自主与胜任感，综合实验、教育和组织研究。它是发展中的理论体系，不是由单一实验确证的定律；自主并非不受约束，胜任也不等于表现优越，二者的表达方式可能随文化与制度环境不同。",
    englishReflection:
      "Deci and Ryan connected autonomy and competence through cognitive evaluation and organismic integration frameworks, synthesizing laboratory, educational, and organizational studies. This is a developing theoretical system rather than a law established by one experiment. Autonomy is not absence of constraint, competence is not superiority, and both can be expressed differently across cultures and institutions.",
    question: "你坚持一件事时，动力来自亲自认可其理由，还是只来自别人施加的评价与后果？",
    englishQuestion:
      "When you persist, does the motivation come from endorsing the reason yourself or only from evaluations and consequences imposed by others?",
    sourceLocator: [
      "Intrinsic Motivation and Self-Determination in Human Behavior（1985），导论及第 2 章",
      "Intrinsic Motivation and Self-Determination in Human Behavior (1985), Introduction and Chapter 2",
    ],
  },
  {
    id: "psychology-cognition-deci-ryan-three-needs",
    authorId: "deciRyan",
    topic: "动机",
    text: "这些发现促成了三种先天心理需要——胜任、自主与关系联结——的假设……",
    english:
      "The findings have led to the postulate of three innate psychological needs—competence, autonomy, and relatedness …",
    editorialSummary:
      "自主、胜任与关系联结被提出为三种基本心理需要；支持这些需要的环境更有利于内化、活力与福祉。",
    englishEditorialSummary:
      "Autonomy, competence, and relatedness are proposed as three basic psychological needs; contexts that support them tend to foster internalization, vitality, and well-being.",
    work: "《自我决定理论与内在动机、社会发展及福祉的促进》",
    englishWork:
      "Self-Determination Theory and the Facilitation of Intrinsic Motivation, Social Development, and Well-Being",
    presentationNature: "source-excerpt",
    reflection:
      "原句把三种需要称为由研究发现导向的“假设”，不是一条脱离证据边界的既定因果定律。瑞安与德西以综述形式整合实验和跨情境研究，把需要界定为健康运作的营养条件，而非个人偏好清单。很多证据是相关性或来自教育、工作等特定场景；跨文化研究总体支持相关性，但测量等值与制度差异仍要求谨慎，不能据此忽略物质需要和结构约束。",
    englishReflection:
      "The sentence presents the three needs as a postulate to which the findings led, not as a settled causal law detached from its evidence. Ryan and Deci reviewed experiments and studies across settings, defining needs as nutriments for healthy functioning rather than a menu of individual preferences. Much evidence is correlational or comes from particular educational and work contexts. Cross-cultural research is broadly supportive, but measurement equivalence and institutional variation require caution, and the theory does not replace material needs or structural constraints.",
    context:
      "这句话出自2000年综述摘要；作者汇总内在动机、自我调节与福祉研究，并在同一句随后说明三种需要得到满足或受阻时所预期的差异。",
    englishContext:
      "The sentence appears in the abstract of the 2000 review. The authors synthesize work on intrinsic motivation, self-regulation, and well-being, and the same sentence goes on to state the expected contrast between satisfaction and thwarting of the three needs.",
    distinction:
      "自主在该理论中指有意愿地行动，不等于独立、孤立或自私；三种需要也不是凭一句摘要即可给个人打分的诊断清单，更不能取代对物质安全和制度约束的分析。",
    englishDistinction:
      "In this theory, autonomy means acting with volition, not independence, isolation, or selfishness. The three needs are not a diagnostic checklist for scoring a person from one abstract sentence, nor do they replace analysis of material security and institutional constraints.",
    question: "你所在的环境，分别怎样支持或挫败你做主、做成事情以及与人相连的需要？",
    englishQuestion:
      "How does your environment support or frustrate your needs to act with volition, be effective, and remain connected to others?",
    sourceLocator: [
      "瑞安与德西〈自我决定理论与内在动机、社会发展及福祉的促进〉，《美国心理学家》55卷1期（2000年1月），摘要，原印刷页68，原句开头的16词连续短段（主字段止于句中，无内部删节）；postulate 表明这是综述从所引研究提出的理论命题，并非单句即可证明的普遍因果律；据作者研究项目公开PDF核验，按署名、定位、最小必要短引用于评论",
      "Ryan & Deci, “Self-Determination Theory and the Facilitation of Intrinsic Motivation, Social Development, and Well-Being,” American Psychologist 55(1) (Jan. 2000), abstract, original print p. 68, a continuous 16-word excerpt from the start of the sentence (the source field ends mid-sentence, with no internal omission); “postulate” marks this as a theoretical proposition drawn from the reviewed findings, not a universal causal law proved by the sentence alone; verified against the authors' research-project PDF and used as an attributed, located, minimally necessary quotation for commentary",
    ],
  },
  {
    id: "psychology-cognition-deci-ryan-reward-meta-analysis",
    authorId: "deciRyan",
    topic: "动机",
    text: "积极反馈既提高了自由选择行为（d = 0.33），也提高了自陈兴趣（d = 0.31）。",
    english:
      "Positive feedback enhanced both free-choice behavior (d = 0.33) and self-reported interest (d = 0.31).",
    editorialSummary:
      "综合实验显示，预期且以完成活动为条件的有形奖励，平均而言会削弱报酬撤去后的自由选择投入，但奖励形式与情境决定差异。",
    englishEditorialSummary:
      "Across experiments, expected tangible rewards contingent on doing an activity reduce later free-choice engagement on average, but reward form and context account for important differences.",
    work: "《外在奖励对内在动机影响的实验研究元分析综述》",
    englishWork:
      "A Meta-Analytic Review of Experiments Examining the Effects of Extrinsic Rewards on Intrinsic Motivation",
    presentationNature: "source-excerpt",
    reflection:
      "摘要把积极反馈与有形奖励分开报告：前者的两个平均效应为正，而预期、参与条件、完成条件和表现条件奖励在多项分析中与自由选择投入下降相关。这是 128 项实验的类别平均，不能预测每个人；研究质量、任务原有趣味、年龄、发表选择与指标定义仍限制外推。",
    englishReflection:
      "The abstract reports positive feedback separately from tangible rewards: its two average effects are positive, whereas expected, engagement-contingent, completion-contingent, and performance-contingent rewards were associated with reduced free-choice engagement in several analyses. These are category averages across 128 experiments, not predictions for every person. Study quality, initial task interest, age, publication selection, and outcome definitions still constrain generalization.",
    context:
      "这句出自元分析摘要。紧邻结果先报告多类条件性奖励对自由选择指标的负平均效应，再单独报告积极反馈对自由选择行为与自陈兴趣的正效应；之后还比较儿童与大学生的差异。",
    englishContext:
      "The sentence appears in the meta-analysis abstract. The immediately preceding results report negative average effects of several contingent reward categories on free-choice measures; the excerpt then reports positive feedback separately for free-choice behavior and self-reported interest. The abstract next contrasts effects for children and college students.",
    distinction:
      "“积极反馈”不等于所有表扬或所有绩效评价，尤其不能忽略反馈是否被体验为控制。d 值是跨研究平均的标准化效应，不表示个体动机会按固定幅度增加；引句也不取消同一摘要中对某些有形奖励的负效应报告。",
    englishDistinction:
      "Positive feedback is not every form of praise or performance evaluation, especially when feedback is experienced as controlling. The d values are standardized average effects across studies, not fixed increases for an individual. The excerpt also does not cancel the negative effects reported for some tangible reward categories in the same abstract.",
    question: "设计激励时，你是在帮助人看见进步，还是让奖励成为继续行动的唯一理由？",
    englishQuestion:
      "When designing an incentive, are you helping people see progress, or making the reward the only reason to continue?",
    sourceLocator: [
      "德西、科斯特纳与瑞安〈外在奖励对内在动机影响的实验研究元分析综述〉，《心理学公报》125卷6期（1999年11月），摘要，原印刷页 627（PDF 第 1 页），完整连续句，英文 15 词；据作者自我决定理论项目公开 PDF 逐字核验，按署名、定位、最小必要短引用于评论",
      "Deci, Koestner, and Ryan, “A Meta-Analytic Review of Experiments Examining the Effects of Extrinsic Rewards on Intrinsic Motivation,” Psychological Bulletin 125(6) (Nov. 1999), abstract, original print p. 627 (PDF p. 1), one complete continuous sentence, 15 English words; checked word for word against the PDF published by the authors' Self-Determination Theory project; used as an attributed, located, minimally necessary quotation for commentary",
    ],
  },
  {
    id: "psychology-cognition-deci-ryan-autonomous-controlled",
    authorId: "deciRyan",
    topic: "动机",
    text: "动机不仅有强弱，还可按调节质量区分：行动可以源于亲自认同，也可以主要受奖惩、羞耻或压力控制。",
    english:
      "Motivation differs not only in quantity but in quality: action may be personally endorsed or governed mainly by rewards, punishment, shame, or pressure.",
    work: "《自我决定理论：动机、发展与福祉中的基本心理需要》",
    englishWork:
      "Self-Determination Theory: Basic Psychological Needs in Motivation, Development, and Wellness",
    reflection:
      "自我决定理论把外在动机放在从外部调节到整合调节的连续谱上，强调自主是意愿与认同，不等于独立或拒绝帮助。大量研究把自主支持与较好结果相关联，但干预效应、因果方向和不同制度下的可行性并不完全一致，个体选择也受资源与权力条件约束。",
    englishReflection:
      "Self-determination theory places extrinsic motivation on a continuum from external to integrated regulation and defines autonomy as volition and endorsement, not independence or refusal of help. Many studies associate autonomy support with better outcomes, but intervention effects, causal direction, and feasibility vary across institutions, while choices remain constrained by resources and power.",
    question: "即使你决定服从一个要求，这个决定是出于认同，还是出于无法承受拒绝的代价？",
    englishQuestion:
      "Even when you choose to follow a demand, is that choice endorsed, or driven by a cost of refusal you cannot bear?",
    sourceLocator: [
      "Self-Determination Theory（2017），第 1 章与第 4 章，自主动机和受控动机部分",
      "Self-Determination Theory (2017), Chapters 1 and 4, sections on autonomous and controlled motivation",
    ],
  },
] satisfies PsychologyThoughtSeed[];
