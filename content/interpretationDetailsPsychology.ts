import type { InterpretationDetail } from "./interpretationTypes";

export const psychologyInterpretationDetails: Readonly<
  Record<string, InterpretationDetail>
> = {
  "psychology-foundations-wundt-immediate-experience": {
    context:
      "冯特用“直接经验”界定心理学的对象：物理学抽象地研究对象，心理学则研究对象怎样在经验中呈现。他的内省不是随意讲述内心，而是在控制刺激与时间的条件下，让受训练者报告简单经验；这一方法也因此受限于可报告内容。",
    englishContext:
      "Wundt used 'immediate experience' to distinguish psychology's object: physics abstracts the object, while psychology studies how it is presented in experience. His introspection was not free-form self-description but trained reporting of simple experiences under controlled stimulus and timing conditions, which also limited the method to what could be reported.",
    distinction:
      "直接经验不等于纯私人、不可检验的感受，也不意味着心理过程与身体无关。这里应区分研究对象的界定、具体实验方法，以及后来把“内省主义”当成一个统一学派的概括。",
    englishDistinction:
      "Immediate experience does not mean purely private, untestable feeling, nor does it sever mental processes from the body. Distinguish Wundt's definition of an object of study, his concrete experimental method, and later summaries of a unified school of 'introspectionism.'",
  },
  "psychology-foundations-james-stream": {
    context:
      "这句话出现在詹姆斯讨论思想怎样认领自己的过去之后：即使睡眠造成时间空档，当前思想仍会凭一种“温暖、亲密和直接”的质感，把某些记忆经验为同一条个人历程。紧接着，他用河流而非链条比喻意识，又立即处理突发声响和感受变化似乎会把意识截断的反例。",
    englishContext:
      "The sentence follows James's account of how present thought owns its past: even across the temporal gap of sleep, a felt quality of warmth, intimacy, and immediacy lets certain memories be experienced as belonging to one personal history. He then prefers a river to a chain as the metaphor for consciousness and immediately considers the counterexample of abrupt sounds and changes that seem to cut the stream.",
    distinction:
      "这里的连续是意识“向自身呈现”的经验结构，不是声称清醒永不中断、内容没有突变，或已经发现一种连续的脑实体。詹姆斯还区分离散的对象与对对象转换的意识；“意识流”首先是描述性比喻，不能单独充当神经机制。",
    englishDistinction:
      "Continuity here concerns how consciousness presents itself, not a claim that wakefulness never lapses, contents never change abruptly, or a continuous brain entity has been discovered. James also distinguishes discrete objects from awareness of their transitions. The stream is first a descriptive metaphor, not by itself a neural mechanism.",
  },
  "psychology-foundations-james-habit": {
    context:
      "詹姆斯先以神经物质的“可塑性”解释重复活动怎样留下较易通行的路径，再转入习惯的社会与教育含义。飞轮这句话接在出狱者与逃笼老虎重新回到熟悉约束的例子之后；后文列举职业、阶层和早年选择怎样固定生活轨迹，并提出应尽早训练有用习惯的格言。",
    englishContext:
      "James first uses the 'plasticity' of nervous matter to explain how repetition leaves paths that are easier to traverse, then turns to the social and educational implications of habit. The flywheel sentence follows examples of a released prisoner and an escaped tiger returning to familiar constraint. He next describes occupations, class, and early choices fixing life paths before offering maxims for forming useful habits early.",
    distinction:
      "“守成力量”在这里既指稳定，也包括把人锁在艰苦职业和社会分层中；它不是对效率型日常习惯的单纯赞美。章节混合了早期生理推测、社会描述和规范建议，尤其“性格到三十岁凝固”的断言不能当作现代可塑性研究的结论。",
    englishDistinction:
      "The 'conservative agent' preserves stability but also keeps people in harsh occupations and social strata; this is not simple praise for productive routines. The chapter mixes early physiological speculation, social description, and normative advice. In particular, its claim that character sets by thirty is not a conclusion of modern research on plasticity.",
  },
  "psychology-foundations-james-attention": {
    context:
      "这句话属于第十一章开头对注意的现象学定义：心灵从同时可能的对象或思想线索中清楚而鲜明地占取一个，聚焦也就意味着退出其他内容。詹姆斯随后以发呆、疲劳和单调劳动描写与之相反的分散状态，后面才区分被动与主动、感官与理智等不同注意形式。",
    englishContext:
      "The sentence belongs to the phenomenological definition at the start of Chapter XI: the mind takes clear and vivid possession of one among several possible objects or trains of thought, so focusing also entails withdrawal from others. James then describes distraction through vacant staring, fatigue, and monotonous work, and only later distinguishes passive from voluntary and sensory from intellectual attention.",
    distinction:
      "原句描述选择性的经验形态，并没有测出一个固定的注意“容量”，也没有把撤回等同于意志压制。注意被吸引、努力维持和任务组织是不同层次的问题；从选择必含忽略，也推不出被忽略的内容客观上不重要。",
    englishDistinction:
      "The sentence describes the experiential form of selection; it does not measure a fixed attentional 'capacity' or equate withdrawal with suppression by will. Capture, effortful maintenance, and task organization are different levels of analysis. That selection entails omission also does not make omitted material objectively unimportant.",
  },
  "psychology-foundations-james-self-plural": {
    context:
      "这句话位于“经验自我或我”一节开头。詹姆斯先说“我”与“我的”之间界线会浮动：身体、亲人、名誉和作品受到攻击时，会激起类似自我受损的反应；在最宽意义下列出这些归属后，他才把经验自我分成物质、社会和精神成分，并另论纯粹自我。",
    englishContext:
      "The sentence opens the section on the Empirical Self or Me. James first calls the boundary between 'me' and 'mine' unstable: attacks on body, family, reputation, or work can arouse reactions like attacks on oneself. Only after listing such belongings in the widest sense does he divide the empirical self into material, social, and spiritual constituents and separately discuss the pure Ego.",
    distinction:
      "“总和”是考察自我感伸展范围的宽口径起点，不表示所有财物都同等重要、永久属于身份核心，或自我只是所有权清单。原段把妻儿列为男性之“所有”，带有十九世纪父权语汇；核查其历史论证不等于接受这种关系观。",
    englishDistinction:
      "The 'sum total' is a deliberately wide starting point for examining how far self-feeling extends. It does not make every possession equally important or permanently central, nor reduce selfhood to an inventory of ownership. The paragraph lists wife and children among a man's own in nineteenth-century patriarchal language; verifying the historical argument does not endorse that view of relationship.",
  },
  "psychology-foundations-james-emotion-body": {
    context:
      "詹姆斯在第二十五章先批评只把情绪当作许多彼此独立的心理种类来编目，继而把论证暂时限定在悲伤、恐惧、愤怒和爱等身体回响明显的“较粗情绪”。引文直接反转“先有完整情绪、后有身体表达”的常识顺序；随后他用哭、奔跑和颤抖展开假说，并继续回应反例。",
    englishContext:
      "In Chapter XXV James first criticizes merely cataloguing emotions as separate psychic kinds, then initially limits his argument to 'coarser emotions' such as grief, fear, rage, and love, where bodily reverberation is conspicuous. The excerpt directly reverses the common-sense order of a complete emotion followed by expression. He develops the hypothesis through crying, running, and trembling before addressing objections.",
    distinction:
      "原句提出的是理论中的构成关系，不只是“身体先、情绪后”的时间口号；知觉、预先组织的反应和对身体变化的感受共同出现在论证里。它也没有证明每种情绪都有唯一身体指纹，或较细腻情绪、认知评估与情境都可被排除。",
    englishDistinction:
      "The sentence proposes a constitutive relation within a theory, not merely a temporal slogan that the body comes first and emotion second: perception, preorganized response, and felt bodily change all enter the argument. It also does not prove that each emotion has one unique bodily signature or that subtler emotion, appraisal, and context can be excluded.",
  },
  "psychology-foundations-ebbinghaus-forgetting-time": {
    context:
      "艾宾浩斯以自己为被试，反复学习无意义音节，并用再学时节省的时间估计保持量。早期快速、后来趋缓的下降来自这一特定材料、程序与单人数据；它的重要性在于把遗忘随时间的变化变成可测问题，而不是发现一条人人相同的固定曲线。",
    englishContext:
      "Ebbinghaus repeatedly learned nonsense syllables using himself as the participant and estimated retention through time saved in relearning. The steep initial decline followed by slower loss came from this particular material, procedure, and single-person dataset. Its importance lies in making change in forgetting over time measurable, not in discovering one fixed curve shared by everyone.",
    distinction:
      "要区分原研究的保持函数、后来教科书绘制的“遗忘曲线”，以及把曲线用于复习安排的实践建议。材料意义、睡眠、间隔、提取练习与干扰都会改变结果。",
    englishDistinction:
      "Distinguish the retention function in the original study, later textbook versions of a 'forgetting curve,' and practical advice derived for scheduling review. Meaning, sleep, spacing, retrieval practice, and interference can all change the result.",
  },
  "psychology-foundations-thorndike-law-effect": {
    context:
      "桑代克从动物在迷箱中的逐步变化提出效果律：在某情境中，带来满意后果的反应与情境之间的联结更可能加强。这一表述经历过修订，尤其是对惩罚是否与奖励对称的判断；它是早期学习机制假说，不是管理人的万能法则。",
    englishContext:
      "Thorndike formulated the law of effect from gradual changes in animals' puzzle-box performance: in a situation, a response followed by a satisfying consequence is more likely to strengthen its connection with that situation. The formulation was later revised, especially concerning whether punishment mirrors reward. It is an early hypothesis about learning mechanisms, not a universal rule for managing people.",
    distinction:
      "后果与行为相随，不足以证明后果是唯一原因；还要考察时间间隔、准备状态、替代行为与任务结构。把实验机制用于教育或组织时，还必须另行论证同意、尊严与权力边界。",
    englishDistinction:
      "A consequence following a behavior does not prove it is the sole cause. Timing, readiness, alternative behaviors, and task structure also matter. Applying the mechanism in education or organizations requires separate justification concerning consent, dignity, and power.",
  },
  "psychology-foundations-kohler-insight": {
    context:
      "苛勒记录黑猩猩在工具与迂回任务中的表现，注意到有些解法像是对问题场的重新组织，而非只靠一次次偶然动作积累。“顿悟”因此挑战了所有学习都必须缓慢试误的强版本，但观察对象少、既往经验难以完全控制，突然性也部分依赖观察和叙述尺度。",
    englishContext:
      "Kohler observed chimpanzees solving tool-use and detour tasks and argued that some solutions looked like a reorganization of the problem field rather than the accumulation of accidental movements one by one. 'Insight' therefore challenged the strong claim that all learning must proceed through gradual trial and error, but the sample was small, prior experience was difficult to control, and apparent suddenness partly depended on the scale of observation and description.",
    distinction:
      "顿悟不是解法从无到有地凭空出现，也不是一般创造力的直接测量。更稳妥的读法，是比较逐步强化与整体重组在解释某一任务轨迹时各自能说明什么。",
    englishDistinction:
      "Insight does not mean that a solution appeared from nothing, and it is not a direct measure of creativity in general. A more careful reading compares what gradual reinforcement and whole-field reorganization can each explain about a particular path to solution.",
  },
  "psychology-cognition-loftus-leading-verbs": {
    context:
      "洛夫特斯与帕尔默让学生观看车祸影片，再用强度不同的动词询问速度。平均估计随提问措辞变化，说明回忆报告不是与提取情境隔绝的原始记录。研究建立了语言能影响报告的因果证据，但影片任务、学生样本与真实目击情境之间仍有距离。",
    englishContext:
      "Loftus and Palmer showed students crash films and then asked about speed using verbs of different intensity. Mean estimates shifted with wording, showing that a memory report is not an untouched record isolated from its retrieval context. The study provides causal evidence that language can affect a report, while leaving a gap between a film task with students and real eyewitness situations.",
    distinction:
      "提问改变报告，不必然证明最初记忆已经永久改写；速度估计、虚假细节与对完整事件的信念也属于不同结果变量。将这项研究用于司法判断时，需要结合访谈程序和个案证据。",
    englishDistinction:
      "A changed report does not necessarily prove that the original memory has been permanently rewritten. Speed estimates, false details, and belief in an entire event are different outcomes. Judicial use of this research must be combined with interview procedure and case-specific evidence.",
  },
  "psychology-cognition-miller-chunking": {
    context:
      "米勒先把组块界定为熟悉的组织单位，再介绍Smith把二进制数重编码为四进制、八进制等名称的演示。短时练习者的收益受翻译速度限制，而Smith长期练习后能复述约四十个二进制位；引文正是在提醒读者，不要只把它看成扩展记忆广度的小技巧。后文转向日常语言重编码及其可能造成的回忆重构。",
    englishContext:
      "Miller first defines chunks as familiar organized units, then presents Smith's demonstration of recoding binary digits under base-four, octal, and related names. Briefly trained participants were limited by translation speed, whereas Smith recalled about forty binary digits after extended practice. The excerpt warns readers not to treat this merely as a trick for extending memory span, and the following discussion turns to everyday verbal recoding and the reconstruction it can introduce into recall.",
    distinction:
      "重编码增加的是每个熟练组块所携带的信息，不是凭任意分组把基础容量无限放大。代码必须学会并趋于自动化，转换本身也占用时间；因此“组块”不能脱离材料、知识和任务，被当成固定大小的通用容器。",
    englishDistinction:
      "Recoding increases the information carried by each well-learned chunk; arbitrary grouping does not make basic capacity unlimited. The code must be learned and become nearly automatic, while translation itself takes time. A chunk therefore cannot be detached from material, knowledge, and task and treated as a fixed-size universal container.",
  },
  "psychology-cognition-kahneman-tversky-framing": {
    context:
      "卡尼曼与特沃斯基的“亚洲疾病”问题把数学等价的结果分别写成挽救生命或死亡人数，群体风险偏好随得益与损失框架反转。该实验说明选项的心理表征进入了选择过程，而决策并不总只由最终结果集合决定。",
    englishContext:
      "Kahneman and Tversky's Asian disease problem described mathematically equivalent outcomes as lives saved or lives lost, and aggregate risk preference reversed across gain and loss frames. The experiment shows that the psychological representation of options enters choice, rather than choice always depending only on the set of final outcomes.",
    distinction:
      "框架效应是条件性群体结果，不表示每个人面对任何措辞都会反转，也不能只凭数学等价就断言真实政策方案在信息、情绪和分配后果上完全相同。识别效应与判断一种表述是否操控仍是两回事。",
    englishDistinction:
      "The framing effect is a conditional group-level result; it does not mean every person reverses under any wording. Mathematical equivalence alone also cannot show that real policies are identical in information, emotion, or distributional consequence. Identifying an effect and judging a presentation manipulative remain distinct questions.",
  },
  "psychology-social-asch-conformity": {
    context:
      "阿希让被试在答案明显的线段判断中，面对一群故意给出相同错误答案的同谋者。多数压力显著增加了公开错误，但被试的访谈也表明，表面从众可能来自不同过程：有人怀疑自己的知觉，有人知道多数错了却不愿独自反对。",
    englishContext:
      "Asch placed participants in an unambiguous line-judgment task among confederates who deliberately gave the same wrong answer. Majority pressure substantially increased public errors, while interviews suggested different processes beneath apparent conformity: some doubted their perception, whereas others knew the majority was wrong but did not want to stand alone.",
    distinction:
      "这项研究没有给出一个跨情境不变的“人类从众率”，也不能把公开回答直接当成私人信念。多数是否一致、是否有盟友、任务难度、文化与异议成本都会改变行为。",
    englishDistinction:
      "The study did not establish a context-free human conformity rate, and a public answer should not be equated with private belief. Unanimity, the presence of an ally, task difficulty, culture, and the cost of dissent can all change behavior.",
  },
  "psychology-social-bowlby-secure-base": {
    context:
      "“安全基地”描述的不是把儿童留在照料者身边，而是可接近、可回应的关系怎样组织探索与返回：安全感足够时，儿童能把更多注意力用于环境；受到惊吓、疲惫或不确定时，又会重新寻求接近。这个概念来自发展观察，并被纳入依恋理论。",
    englishContext:
      "A 'secure base' does not mean keeping a child beside the caregiver. It describes how an available, responsive relationship organizes exploration and return: when sufficiently secure, a child can devote more attention to the environment, and when frightened, tired, or uncertain, the child seeks proximity again. The concept grew from developmental observation and was incorporated into attachment theory.",
    distinction:
      "安全基地不是一种凭单次行为即可判定的育儿标签，更不等于照料者必须随时消除挫折。分离反应会受年龄、气质、熟悉程度、照料网络和文化惯例影响；理论讨论的是关系模式，而非给个人定性。",
    englishDistinction:
      "A secure base is not a parenting label inferred from one behavior, nor does it require a caregiver to remove every frustration. Separation responses vary with age, temperament, familiarity, caregiving networks, and cultural practice; the theory concerns relational patterns rather than assigning a fixed type to a person.",
  },
  "psychology-foundations-wundt-experiment-control": {
    context:
      "《心理学大纲》第3节把心理学对象界定为过程而非永久物体，因此要求研究者控制过程的起点并有计划地改变条件。这里是实验法的原则说明，不是某个样本的结果；冯特实验室常用受训练观察者和简单刺激。",
    englishContext:
      "Section 3 of Outlines of Psychology treats psychological contents as processes rather than permanent objects and therefore asks investigators to control beginnings and vary conditions deliberately. This is a methodological principle, not a sample result; Wundt's laboratory typically used trained observers and simple stimuli.",
    distinction:
      "控制提高条件间可比性，却会缩窄任务与参与者范围；受训练报告也可能受期待和语言分类影响。由简单知觉过程不能直接外推复杂人格、文化行为或日常决策。",
    englishDistinction:
      "Control improves comparability but narrows tasks and participants, while trained reports can reflect expectations and verbal categories. Simple perceptual processes do not directly generalize to personality, cultural behavior, or everyday decisions.",
  },
  "psychology-foundations-wundt-apperception": {
    context:
      "《心理学大纲》第15.4节先把“注意”界定为清楚把握心理内容时的状态，再把内容进入清楚理解的过程称为统觉。两句是理论术语的连续定义，而非以反应时估出的单一机制。",
    englishContext:
      "Outlines §15.4 defines attention as the state accompanying clear apprehension of a mental content and apperception as the process bringing content into clear comprehension. The continuous sentences define theoretical terms rather than one mechanism estimated from reaction time.",
    distinction:
      "统觉是冯特体系中的历史概念，不应无缝等同现代执行控制或意识通达。清楚报告、选择表现和神经活动是不同指标，需要分别操作化。",
    englishDistinction:
      "Apperception is a historical concept in Wundt's system and should not be silently equated with modern executive control or conscious access. Clear report, selection performance, and neural activity are different measures requiring separate operationalization.",
  },
  "psychology-foundations-wundt-feeling-dimensions": {
    context:
      "《心理学大纲》第7.7节提出愉快—不愉快、激发—抑制、紧张—松弛三条感情维度，用以整理内省报告中随时间变化的简单感受。卡片省略图号和坐标字母但保留三组连续分类。",
    englishContext:
      "Outlines §7.7 proposes pleasure–displeasure, arousal–subduing, and strain–relaxation dimensions to organize trained introspective reports of changing simple feelings. The card omits figure references and coordinate letters while preserving the three classifications.",
    distinction:
      "这是理论分类而非现代跨文化量表的验证结果；维度是否独立、词义是否稳定和报告者是否能区分，都需要数据检验。不能据此给个体情绪作固定三轴诊断。",
    englishDistinction:
      "This is a theoretical classification, not validation of a modern cross-cultural scale. Independence, semantic stability, and participants' ability to discriminate the dimensions require evidence; it is not a fixed three-axis diagnosis of individual emotion.",
  },
  "psychology-foundations-wundt-cultural-processes": {
    context:
      "《民族心理学要义》导言把语言、神话和风俗视为共同生活创造的心理产物，认为仅从孤立个体意识无法解释。材料主要来自历史、语言与民族志比较，不是实验室操纵。",
    englishContext:
      "The introduction to Elements of Folk Psychology treats language, myth, and custom as products of communal life that isolated individual consciousness cannot explain. Its evidence is mainly historical, linguistic, and ethnographic comparison rather than laboratory manipulation.",
    distinction:
      "群体产物不能反过来被当作每位成员共享同一心智，也不能用“民族心理”固定文化本质。比较必须关注内部差异、权力、接触史和资料来源。",
    englishDistinction:
      "Collective products do not imply that every member shares one mind, and folk psychology must not essentialize a culture. Comparison must consider internal difference, power, contact history, and source provenance.",
  },
  "psychology-foundations-ebbinghaus-nonsense-syllables": {
    context:
      "艾宾浩斯以自己为唯一被试，构造辅音—元音—辅音音节以减少既有意义和联想，再反复学习列表。引文只说这种材料“有许多优点”，优势首先是实验控制。",
    englishContext:
      "Ebbinghaus used himself as the sole participant and constructed consonant–vowel–consonant syllables to reduce prior meaning and association, repeatedly learning lists. The excerpt says only that such material has advantages, chiefly experimental control.",
    distinction:
      "无意义音节并非完全没有联想，不同语言背景也会改变可读性。提高控制的代价是降低日常记忆外推，不能把所得容量和遗忘速度视为所有材料的常数。",
    englishDistinction:
      "Nonsense syllables are not association-free, and language background changes pronounceability. Control comes at the cost of ecological generalization, so resulting capacity and forgetting rates are not constants for all materials.",
  },
  "psychology-foundations-ebbinghaus-savings": {
    context:
      "《记忆》第七章用“节省法”测量看似不能自由回忆的材料：重新学会同一列表所需工作少于初学，差额作为残留保持量。数据仍来自艾宾浩斯本人多轮学习。",
    englishContext:
      "Chapter VII of Memory uses the savings method for material no longer freely recalled: less work to relearn the same list than to learn it initially measures residual retention. The data still come from Ebbinghaus's own repeated sessions.",
    distinction:
      "节省量受练习、疲劳、顺序和学习标准影响，并非记忆痕迹的直接读数；重新学习还可能使用新策略。与正确回忆率或识别率比较时必须保持指标不同。",
    englishDistinction:
      "Savings depend on practice, fatigue, order, and learning criterion and are not a direct reading of a trace; relearning may use new strategies. It should remain distinct from recall accuracy or recognition rate.",
  },
  "psychology-foundations-ebbinghaus-overlearning": {
    context:
      "第六章讨论达到一次无误复述后继续重复的效果。以本人列表学习数据为基础，艾宾浩斯认为额外练习不改变当下表现，却能延长未来保持。",
    englishContext:
      "Chapter VI examines repetitions after one errorless recitation. From his own list-learning data, Ebbinghaus argues that extra practice may not change immediate performance but can support later retention.",
    distinction:
      "“学得越久保持越久”只在一定范围和任务成立，收益递减、疲劳及间隔方式会改变效果。过度学习不能替代理解、提取练习或在新情境中的迁移检验。",
    englishDistinction:
      "Longer study predicts longer retention only within conditions; diminishing returns, fatigue, and spacing alter the effect. Overlearning does not replace understanding, retrieval practice, or transfer tests in new contexts.",
  },
  "psychology-foundations-ebbinghaus-meaning": {
    context:
      "第五章把拜伦《唐璜》的诗节同无意义音节列表比较；意义、节奏、韵脚和共同语言使达到同一学习标准所需重复大幅减少。结果是单人、特定文本的任务比较。",
    englishContext:
      "Chapter V compares stanzas from Byron's Don Juan with nonsense-syllable lists. Meaning, rhythm, rhyme, and shared language greatly reduce repetitions to criterion. The result is a within-person comparison using particular texts.",
    distinction:
      "多种线索同时变化，实验不能分离意义、韵律和熟悉语言各自效应；“约十分之一”不是普遍比例。知识水平、文本结构与理解深度都会改变优势。",
    englishDistinction:
      "Several cues vary together, so the comparison does not isolate meaning, rhythm, or language familiarity, and one-tenth is not a universal ratio. Knowledge, text structure, and depth of comprehension alter the advantage.",
  },
  "psychology-foundations-pavlov-signal": {
    context:
      "《条件反射》第二讲演示狗在节拍器声与食物反复配对后，对声音出现唾液和摄食动作。引文把声音称为食物的“信号”，来自受控生理记录。",
    englishContext:
      "Lecture II of Conditioned Reflexes demonstrates salivation and alimentary movement to a metronome after repeated pairings with food in dogs. The excerpt calls the sound a signal for food and comes from controlled physiological recording.",
    distinction:
      "对所测反应看不出差异，不表示动物把声音主观体验成食物，也不说明所有行为由简单配对支配。物种、饥饿状态、刺激显著性和既往学习限制外推。",
    englishDistinction:
      "Indistinguishable measured responses do not show that the dog experiences sound as food or that all behavior is governed by simple pairing. Species, hunger, salience, and learning history limit generalization.",
  },
  "psychology-foundations-pavlov-acquisition-extinction": {
    context:
      "卡片跨第二、第四讲节选：声音—食物配对建立唾液反应；单独呈现声音使反应减弱；休息后又部分恢复。省略号明确连接不同讲次与阶段。",
    englishContext:
      "The card excerpts Lectures II and IV: sound–food pairings establish salivation, sound alone weakens it, and rest permits recovery. Ellipses explicitly join different lectures and phases.",
    distinction:
      "消退不是原学习被简单擦除，自发恢复正显示抑制与情境作用；恢复也未必“完全”。不同反应系统、强化程序和时间间隔会产生不同曲线。",
    englishDistinction:
      "Extinction is not simple erasure of prior learning; spontaneous recovery shows inhibition and context, and recovery need not be complete. Response systems, schedules, and intervals produce different curves.",
  },
  "psychology-foundations-pavlov-discrimination": {
    context:
      "第七讲让一个刺激持续与食物配对，而强度、位置或性质相近的刺激不被强化，观察狗逐渐只对正刺激反应。它是差别强化形成辨别的实验。",
    englishContext:
      "Lecture VII repeatedly pairs one stimulus with food while leaving a nearby stimulus in intensity, position, or quality unreinforced, observing dogs gradually respond selectively. This is an experiment in discrimination through differential reinforcement.",
    distinction:
      "辨别精度取决于刺激距离、训练量和动机，不能由一个任务推断动物拥有一般抽象分类。无强化对照也可能引入抑制而非单纯“学会不同”。",
    englishDistinction:
      "Accuracy depends on stimulus distance, training, and motivation and does not establish a general abstract category from one task. Nonreinforcement may introduce inhibition rather than merely learning difference.",
  },
  "psychology-foundations-pavlov-generalization": {
    context:
      "第七讲报告以1000振动频率音调建立条件反射后，邻近音调也诱发较弱反应，强度随物理距离下降。这是在辨别训练充分前的泛化梯度。",
    englishContext:
      "Lecture VII reports that after conditioning to a 1000-frequency tone, nearby tones also evoke weaker responses declining with physical distance. This is a generalization gradient before extensive discrimination training.",
    distinction:
      "物理相似不总等于心理相似，梯度会受量表、经验与测试顺序影响。一个音调维度的结果不能直接推广到语言类别、恐惧对象或社会偏见。",
    englishDistinction:
      "Physical and psychological similarity need not coincide, and gradients depend on scale, experience, and test order. One tone dimension does not directly generalize to language categories, fear objects, or social prejudice.",
  },
  "psychology-foundations-pavlov-experimental-neurosis": {
    context:
      "第十七讲把狗训练为对圆形正刺激和椭圆负刺激作辨别，再逐渐使椭圆接近圆；在9:8比例附近，辨别恶化并伴随整体行为突变。样本是少量实验犬的个案序列。",
    englishContext:
      "Lecture XVII trained dogs to distinguish a reinforced circle from an unreinforced ellipse, then made the ellipse progressively more circular. Near a 9:8 ratio, discrimination deteriorated with an abrupt behavioral change. The evidence is a case sequence from a small number of laboratory dogs.",
    distinction:
      "“实验性神经症”是历史标签，不等于人类临床神经症模型已经验证；强迫辨别、应激和实验环境共同作用。外推需比较症状、时间进程和恢复机制。",
    englishDistinction:
      "Experimental neurosis is a historical label, not validation of a human clinical model. Forced discrimination, stress, and laboratory setting interact; generalization requires comparison of symptoms, time course, and recovery mechanisms.",
  },
  "psychology-foundations-thorndike-puzzle-box": {
    context:
      "《动物智慧》依据猫在迷箱中多次逃脱的潜伏期曲线与动作记录，反对猫先洞察机关再行动；偶然成功动作逐步更快出现。卡片以省略号连接同一讨论中的观察与效果解释。",
    englishContext:
      "Animal Intelligence uses cats' escape-time curves and action records across repeated puzzle-box trials to argue against prior insight into the mechanism; accidentally successful actions gradually occur sooner. The card joins observation and interpretation from the same discussion with an ellipsis.",
    distinction:
      "平滑学习曲线不排除局部表征或策略变化，少量被限制的动物也不能代表所有学习。饥饿、箱体设计、处理方式和记录尺度会影响表现与伦理评价。",
    englishDistinction:
      "A smooth learning curve does not exclude local representation or strategy change, and a small number of constrained animals do not represent all learning. Hunger, box design, handling, and recording scale affect performance and ethical assessment.",
  },
  "psychology-foundations-thorndike-practice-limits": {
    context:
      "《教育心理学》第二卷在讨论习惯律时，用一句短断言限定“熟能生巧”：若成功与失败同样舒适、缺少目标性反馈，重复本身不会改进表现。它是理论总结而非单项实验效应量。",
    englishContext:
      "In discussing laws of habit, Educational Psychology, Volume II qualifies practice makes perfect: repetition without differential concern for success and failure does not improve performance. It is a theoretical summation rather than an effect size from one experiment.",
    distinction:
      "“热忱”混合动机、反馈和注意，不能作为可独立测量的单一原因；焦虑过高同样会损害学习。练习效果须说明任务难度、反馈质量、间隔和先前水平。",
    englishDistinction:
      "Zeal combines motivation, feedback, and attention rather than naming one measurable cause, and excessive anxiety can impair learning. Practice effects require task difficulty, feedback quality, spacing, and prior skill to be specified.",
  },
  "psychology-foundations-thorndike-identical-elements": {
    context:
      "第二卷第十二章综合学校科目迁移研究，提出一项能力的改善只在两个任务共享要素时迁移，并把目标观念、方法和一般原则也列为可能共享要素。卡片标出中间例子的删节。",
    englishContext:
      "Chapter XII of Volume II synthesizes studies of transfer across school tasks and argues that improvement travels insofar as tasks share elements, including ideas of aims, methods, and principles. The card marks an omitted intervening example.",
    distinction:
      "“相同要素”若事后定义会变成循环解释；应事前说明表征、操作或规则如何共享，再在新任务测迁移。近迁移结果不能自动支持远迁移宣传。",
    englishDistinction:
      "Identical elements become circular if defined after success; shared representations, operations, or rules should be specified before transfer is tested in a new task. Near-transfer results do not automatically support claims of far transfer.",
  },
  "psychology-foundations-thorndike-individual-differences": {
    context:
      "《教育心理学》第三卷以两个假想分布说明平均数相同不代表表现相同：B与A中心趋势一致，但变异更小。引文省略具体数值，保留统计比较。",
    englishContext:
      "Educational Psychology, Volume III uses two illustrative distributions to show that equal averages need not imply equal performance: B and A share central tendency while B varies less. The card omits numerical detail but preserves the statistical comparison.",
    distinction:
      "均值和变异都只描述特定测量与样本，不能直接解释差异来源或给个人定性。测量误差、练习机会与群体异质性必须同真实个体变化区分。",
    englishDistinction:
      "Means and variability describe a particular measure and sample; they neither explain origins nor classify an individual. Measurement error, opportunity to practice, and group heterogeneity must be separated from genuine within-person fluctuation.",
  },
  "psychology-foundations-watson-observable-behavior": {
    context:
      "华生1913年“行为主义宣言”开篇把心理学重划为客观实验性自然科学，主张公开可观察行为成为共同证据。它是学科纲领，不是通过一个参与者样本检验的结论。",
    englishContext:
      "Watson's 1913 behaviorist manifesto opens by recasting psychology as an objective experimental natural science centered on publicly observable behavior. This is a disciplinary program, not a finding tested in one participant sample.",
    distinction:
      "公开测量提高可复核性，却不证明意识、意义或主观报告不值得研究；报告本身也可作为有误差的数据。方法客观与研究对象只限行为是不同主张。",
    englishDistinction:
      "Public measurement improves checkability but does not show that consciousness, meaning, or self-report is unworthy of study; reports can be fallible data. Objective method and restricting the object to behavior are distinct claims.",
  },
  "psychology-foundations-watson-prediction-control": {
    context:
      "同一开篇把行为主义心理学的理论目标写成预测和控制行为，体现工业化时代对可操作科学的期待。句子没有给出控制成功率或伦理程序。",
    englishContext:
      "The same opening defines behaviorist psychology's theoretical goal as prediction and control of behavior, reflecting an industrial-era ideal of operational science. The sentence supplies neither a success rate nor an ethical procedure for control.",
    distinction:
      "预测准确不等于因果控制，控制能力也不产生干预正当性。应用于人时必须另行审查同意、权力、受益者、伤害和退出权。",
    englishDistinction:
      "Predictive accuracy is not causal control, and ability to control does not justify intervention. Human application separately requires consent, power, beneficiaries, harm, and rights of exit to be examined.",
  },
  "psychology-foundations-watson-conditioned-emotion": {
    context:
      "1920年“小阿尔伯特”研究对一名约九个月婴儿把白鼠呈现同身后敲击钢条的巨响配对，再记录对白鼠、兔子等对象的哭泣与退缩。卡片用省略号连接不同日期的实验记录。",
    englishContext:
      "The 1920 Little Albert study paired presentation of a white rat with a loud steel-bar strike behind one infant, about nine months old, then recorded crying and withdrawal to the rat and other objects. Ellipses join notes from different dates.",
    distinction:
      "单一个案、反应记录不一致、无充分基线与未完成去条件化，使效应和泛化范围都不稳定；程序按现代标准有严重伦理问题。不能据此估计普通儿童恐惧形成率。",
    englishDistinction:
      "One case, inconsistent response records, limited baselines, and absent completed deconditioning make the effect and generalization uncertain; the procedure is seriously unethical by modern standards. It cannot estimate ordinary rates of childhood fear acquisition.",
  },
  "psychology-foundations-watson-infant-environment": {
    context:
      "《行为主义》1925年初版第五章“人类有本能吗？第一部分”提出著名“十二个婴儿”设想，以夸张方式强调训练环境，并在同段末尾承认自己超出了事实。卡片保留这句自我限定并标出职业清单删节。",
    englishContext:
      "Chapter V, ‘Are There Any Human Instincts? Part I,’ in the 1925 first edition of Behaviorism offers the famous dozen-infants thought experiment to emphasize training environment and ends the same paragraph by admitting that the claim goes beyond the facts. The card preserves that qualification and marks the omitted occupations.",
    distinction:
      "这不是实施过的随机实验，也不证明环境能任意塑造任何专长；遗传、健康、机会和儿童能动性都被设想排除。引用前半句而删掉承认会严重歪曲原文。",
    englishDistinction:
      "This was not a conducted randomized study and does not show that environment can produce any specialty at will; heredity, health, opportunity, and children's agency are bracketed out. Quoting the boast without its admission seriously distorts the passage.",
  },
  "psychology-foundations-watson-language-thinking": {
    context:
      "《从行为主义者立场看心理学》第九章把思维纳入隐性语言习惯及可替代语言的活动，试图让内部过程进入可观察行为框架。这是理论重定义，不是脑或语言实验结果。",
    englishContext:
      "Chapter IX of Psychology from the Standpoint of a Behaviorist places thinking under implicit language habits and activities substitutable for language, seeking to bring internal processes into a behavioral framework. This is theoretical redefinition, not a neural or language experiment.",
    distinction:
      "思维可受语言支撑，不表示所有空间、感知或婴儿思维都是微弱言语。可测肌肉活动、主观言语和任务表现必须区分，沉默运动缺失也不能单独否定思考。",
    englishDistinction:
      "Language can support thought without making every spatial, perceptual, or infant thought faint speech. Measured muscle activity, reported inner speech, and task performance must be separated, and absence of subvocal movement does not alone negate thinking.",
  },
  "psychology-foundations-kohler-whole-organization": {
    context:
      "《格式塔心理学》第六章讨论旋律、形状与视觉区域的整体性质，指出某些性质只在延展区域的关系组织中出现，不能归给单一局部刺激。引文属于理论例证而非样本平均。",
    englishContext:
      "Chapter VI of Gestalt Psychology discusses melodies, shapes, and whole properties of visual regions, arguing that some qualities arise only in relational organization across an extended area and cannot be assigned to one local stimulus. The excerpt is a theoretical example, not a sample mean.",
    distinction:
      "整体具有关系性质不意味着局部成分无作用，也不许可用“整体大于部分之和”替代机制。应以扰动局部与关系的实验区分竞争解释。",
    englishDistinction:
      "Relational whole-properties do not make local components irrelevant or let a slogan replace mechanism. Experiments that perturb components and relations are needed to discriminate explanations.",
  },
  "psychology-foundations-kohler-field-restructuring": {
    context:
      "《猿的智慧》记录黑猩猩Koko面对够不到的目标和身后木棍：最初经过木棍而不使用，当视线从目标区域连续引向木棍后突然取用。它是自然式个案观察。",
    englishContext:
      "The Mentality of Apes records chimpanzee Koko facing an unreachable goal and a stick behind him: he initially passes it unused, then suddenly employs it when visual orientation connects the goal region to the stick. It is a naturalistic case observation.",
    distinction:
      "突然行为不证明内部解法瞬间无前因地产生；既往工具经验、提示和叙述时间尺度均难控制。个案支持场组织解释，但不能估计所有猿或人类洞察概率。",
    englishDistinction:
      "Sudden behavior does not prove a solution arose internally without precursors; prior tool experience, cueing, and narrative timescale are hard to control. The case supports a field-organization account but cannot estimate insight rates for apes or humans generally.",
  },
  "psychology-foundations-kohler-transposition": {
    context:
      "《格式塔心理学》第六章回顾动物在一对灰色中学会选择较暗项后，面对新灰色对仍选择关系上较暗项的转调实验。结果支持对关系位置而非绝对灰度的反应。",
    englishContext:
      "Chapter VI reviews transposition experiments in which animals trained to choose the darker of two grays continue choosing the relationally darker item in a new pair. The result supports response to relational position rather than one absolute gray.",
    distinction:
      "转调并非在所有刺激距离和训练方式下都完全发生；动物可能混合绝对与关系线索。选择结果也不等于具有人类式抽象概念。",
    englishDistinction:
      "Transposition is not complete under every stimulus distance or training regime; animals may combine absolute and relational cues. Choice does not establish a human-like abstract concept.",
  },
  "psychology-foundations-kohler-isomorphism": {
    context:
      "《格式塔心理学》第二章以视觉白点对称为例，提出体验到的结构与底层动态过程之间存在“同型”关系。引文只是该例中的连续分句，属于理论桥接。",
    englishContext:
      "Chapter II of Gestalt Psychology uses visual symmetry of white dots to propose an isomorphic relation between experienced structure and underlying dynamic processes. The excerpt is a continuous clause in that example and serves as a theoretical bridge.",
    distinction:
      "同型不等于脑中有一幅与知觉完全相同的图，也没有由此段测得神经结构。它是需要生理证据检验的约束，现代映射可能保持关系而非空间复制。",
    englishDistinction:
      "Isomorphism does not mean the brain contains a picture identical to perception, and the passage measures no neural structure. It is a constraint requiring physiological evidence; a modern mapping may preserve relations rather than spatial copies.",
  },
};
