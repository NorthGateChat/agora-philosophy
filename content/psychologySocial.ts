import type { Thought } from "./philosophy";
import type {
  PsychologyAuthorProfile,
  PsychologyThoughtSeed,
} from "./psychologyCorpusTypes";

type SocialPsychologySeed = PsychologyThoughtSeed &
  Required<
    Pick<
      Thought,
      "context" | "englishContext" | "distinction" | "englishDistinction"
    >
  >;

export const psychologySocialProfiles = {
  lewin: {
    name: "库尔特·勒温",
    englishName: "Kurt Lewin",
    life: "1890—1947",
    englishLife: "1890–1947",
    school: "场论与群体动力学",
    englishSchool: "Field Theory and Group Dynamics",
    palette: ["#e9e4d9", "#bbb09c", "#817665", "#2c2924"],
  },
  asch: {
    name: "所罗门·阿希",
    englishName: "Solomon Asch",
    life: "1907—1996",
    englishLife: "1907–1996",
    school: "格式塔社会心理学",
    englishSchool: "Gestalt Social Psychology",
    palette: ["#e3e7e3", "#acb8b0", "#6f7f76", "#252b27"],
  },
  festinger: {
    name: "利昂·费斯廷格",
    englishName: "Leon Festinger",
    life: "1919—1989",
    englishLife: "1919–1989",
    school: "认知失调与社会比较",
    englishSchool: "Cognitive Dissonance and Social Comparison",
    palette: ["#e8e1dc", "#bca99f", "#846e63", "#2b2522"],
  },
  "tajfel-turner": {
    name: "亨利·泰弗尔、约翰·特纳",
    englishName: "Henri Tajfel & John Turner",
    life: "1919—1982；1947—2011",
    englishLife: "1919–1982; 1947–2011",
    school: "社会认同与自我分类理论",
    englishSchool: "Social Identity and Self-Categorization",
    palette: ["#e4e5df", "#afb4a7", "#737b6c", "#282a25"],
  },
  "bowlby-ainsworth": {
    name: "约翰·鲍尔比、玛丽·安斯沃斯",
    englishName: "John Bowlby & Mary Ainsworth",
    life: "1907—1990；1913—1999",
    englishLife: "1907–1990; 1913–1999",
    school: "依恋理论",
    englishSchool: "Attachment Theory",
    palette: ["#ece4dc", "#c4ad9e", "#8c7466", "#302823"],
  },
  piaget: {
    name: "让·皮亚杰",
    englishName: "Jean Piaget",
    life: "1896—1980",
    englishLife: "1896–1980",
    school: "发生认识论",
    englishSchool: "Genetic Epistemology",
    palette: ["#e6e5d9", "#b3b397", "#77775f", "#292921"],
  },
  vygotsky: {
    name: "列夫·维果茨基",
    englishName: "Lev Vygotsky",
    life: "1896—1934",
    englishLife: "1896–1934",
    school: "文化历史心理学",
    englishSchool: "Cultural-Historical Psychology",
    palette: ["#e4e2dc", "#b0aaa0", "#756e65", "#282623"],
  },
  bandura: {
    name: "阿尔伯特·班杜拉",
    englishName: "Albert Bandura",
    life: "1925—2021",
    englishLife: "1925–2021",
    school: "社会认知理论",
    englishSchool: "Social Cognitive Theory",
    palette: ["#dfe6e4", "#a6b7b3", "#687e79", "#232a28"],
  },
} satisfies Readonly<Record<string, PsychologyAuthorProfile>>;

export const psychologySocialSeeds = [
  {
    id: "psychology-social-lewin-field",
    authorId: "lewin",
    topic: "群体",
    text: "行为不是只从一个人的性格里长出来；它发生在个人与当下环境共同构成的场中。",
    english:
      "Behavior does not grow from personality alone; it emerges within the field formed by a person and the present environment.",
    work: "《拓扑心理学原理》",
    englishWork: "Principles of Topological Psychology",
    reflection:
      "场论把‘这个人为什么这样做’改写为‘哪些个人与情境力量此刻同时在起作用’。它让解释从贴标签转向梳理关系。",
    englishReflection:
      "Field theory reframes “Why is this person like this?” as “Which personal and situational forces are acting together now?” Explanation shifts from labeling to mapping relations.",
    context:
      "勒温以生活空间描述个体在特定时刻所体验到的目标、障碍与路径；这是概念模型，不是把心理变成一张可直接测量的物理地图。",
    englishContext:
      "Lewin used life space to describe goals, barriers, and paths as experienced at a given moment. It is a conceptual model, not a literally measurable physical map of the mind.",
    distinction:
      "这不等于环境决定论。个人的需要、记忆与解释也属于场的一部分，而且场会随时间和文化条件变化。",
    englishDistinction:
      "This is not environmental determinism. Needs, memories, and interpretations also belong to the field, which changes across time and cultural conditions.",
    question: "如果暂时不责怪性格，眼前的情境中还有哪些力量值得被看见？",
    englishQuestion:
      "If you pause the personality judgment, what other forces in the situation become visible?",
    sourceLocator: [
      "《拓扑心理学原理》第一章，论心理学中的场与生活空间",
      "Principles of Topological Psychology, Chapter 1, on psychological fields and life space",
    ],
  },
  {
    id: "psychology-social-lewin-group-standards",
    authorId: "lewin",
    topic: "群体",
    text: "群体不是许多个体的简单相加；成员彼此依存时，整体会形成自己的规范与动力。",
    english:
      "A group is not a simple sum of individuals; where members are interdependent, the whole develops norms and dynamics of its own.",
    work: "《社会科学中的场论》",
    englishWork: "Field Theory in Social Science",
    reflection:
      "团队里的沉默、冒险或服从，未必能由某一个成员解释。互动形成的规范会反过来改变每个人觉得什么可说、可做。",
    englishReflection:
      "Silence, risk-taking, or compliance in a team may not be explained by any one member. Interaction creates norms that reshape what each person feels able to say or do.",
    context:
      "勒温的群体动力学关注相互依存、边界与力量结构，许多论述来自二十世纪中期的实验和组织研究。",
    englishContext:
      "Lewin's group dynamics examined interdependence, boundaries, and force structures, drawing heavily on mid-twentieth-century experiments and organizational studies.",
    distinction:
      "整体有动力，不表示群体像一个人那样有单一意志；权力差异、制度与历史仍须单独分析。",
    englishDistinction:
      "Group-level dynamics do not mean a group has one mind. Power differences, institutions, and history still require separate analysis.",
    question: "你所在的群体，正在默默奖励哪一种行为？",
    englishQuestion: "What kind of behavior is your group quietly rewarding?",
    sourceLocator: [
      "《社会科学中的场论》‘群体动力学的前沿’部分，论群体相互依存",
      "Field Theory in Social Science, “Frontiers in Group Dynamics,” on group interdependence",
    ],
  },
  {
    id: "psychology-social-lewin-unfreeze-change",
    authorId: "lewin",
    topic: "行为",
    text: "稳定的习惯往往由多股相反力量维持；改变不仅要推动新方向，也要松动旧平衡。",
    english:
      "Stable habits are often held by opposing forces; change requires not only a push in a new direction but also a loosening of the old equilibrium.",
    work: "《社会冲突的解决》",
    englishWork: "Resolving Social Conflicts",
    reflection:
      "只靠更用力地劝说，可能激起同样强的抵抗。辨认维持旧状态的障碍，有时比增加压力更能带来改变。",
    englishReflection:
      "Pushing harder may produce equally strong resistance. Identifying what sustains the old state can sometimes enable change better than adding pressure.",
    context:
      "后来流行的‘解冻—改变—再冻结’是对勒温相关论述的简化概括；原文更强调准稳定平衡与群体规范。",
    englishContext:
      "The popular unfreeze-change-refreeze formula is a later simplification of Lewin's discussion, which focused more on quasi-stationary equilibria and group norms.",
    distinction:
      "这个模型不能替代对创伤、贫困或制度约束的分析，也不保证所有改变都应追求新的固定状态。",
    englishDistinction:
      "The model cannot replace analysis of trauma, poverty, or institutional constraint, nor does every change need to end in a newly fixed state.",
    question: "在你想改变的习惯里，哪一种力量一直把旧平衡维持住？",
    englishQuestion:
      "What force keeps the old equilibrium in place within the habit you want to change?",
    sourceLocator: [
      "《社会冲突的解决》‘群体决定与社会改变’章，论准稳定平衡",
      "Resolving Social Conflicts, “Group Decision and Social Change,” on quasi-stationary equilibria",
    ],
  },
  {
    id: "psychology-social-lewin-action-research",
    authorId: "lewin",
    topic: "群体",
    text: "因此，理性的社会管理沿着一连串螺旋式步骤推进；每一步都由规划、行动以及查明行动结果这一循环组成。",
    english:
      "Rational social management, therefore, proceeds in a spiral of steps each of which is composed of a circle of planning, action, and fact-finding about the result of the action.",
    editorialSummary:
      "研究社会问题时，理解与行动可以往复推进：调查、尝试、观察，再据结果修正下一步。",
    englishEditorialSummary:
      "In studying social problems, understanding and action can advance in cycles: investigate, try, observe, and revise the next step from the results.",
    work: "《行动研究与少数群体问题》",
    englishWork: "Action Research and Minority Problems",
    presentationNature: "source-excerpt",
    reflection:
      "勒温把事实调查嵌入规划与行动的反复循环，使每一步都能评价结果并修正下一步。这是面向战后族群关系与社会管理的方法论主张，而不是证明所有参与式项目都有效的受控实验结论；今天还须明确知情同意、风险、记录与社区共同权利。",
    englishReflection:
      "Lewin embeds fact-finding in repeated cycles of planning and action so that each step can evaluate results and revise the next. This is a methodological proposal for postwar intergroup relations and social management, not controlled evidence that every participatory project works; contemporary practice must also address consent, risk, records, and shared community authority.",
    context:
      "勒温在战后美国讨论少数群体关系与社会改变；今天的参与式研究进一步强调社区对议题、数据与成果的共同权利。",
    englishContext:
      "Lewin wrote in postwar America about minority relations and social change. Contemporary participatory research goes further in sharing authority over questions, data, and outcomes.",
    distinction:
      "‘边做边研究’不等于降低证据标准。知情同意、风险评估、可追溯记录与参与者声音仍然必要。",
    englishDistinction:
      "Researching while acting does not lower evidential standards. Informed consent, risk assessment, traceable records, and participant voice remain essential.",
    question: "谁最受这个问题影响，而你是否让他们参与定义问题？",
    englishQuestion:
      "Who is most affected by this problem, and have they helped define it?",
    sourceLocator: [
      "勒温〈行动研究与少数群体问题〉，《社会问题杂志》2卷4期（1946年11月），第38页，‘社会规划与行动中研究的功能与位置’末段，完整连续句；这是方法论主张，后文康涅狄格 workshop 是案例而非本句的普遍实证证明；仅确认美国公版",
      "Lewin, “Action Research and Minority Problems,” Journal of Social Issues 2(4) (Nov. 1946), print p. 38, closing paragraph of “The Function and Position of Research Within Social Planning and Action,” complete continuous sentence; this is a methodological proposal, and the later Connecticut workshop is a case rather than general empirical proof of the sentence; U.S. public-domain status only",
    ],
  },
  {
    id: "psychology-social-lewin-leadership-climate",
    authorId: "lewin",
    topic: "群体",
    text: "在我们的实验中，“专制”条件造就的社会群体比“民主”条件僵硬得多。",
    english:
      "In our experiment, autocracy provided a much more rigid social group than democracy.",
    editorialSummary:
      "领导方式会改变群体的气候；参与、敌意与依赖并非只是成员原有性格的投影。",
    englishEditorialSummary:
      "Leadership style changes a group's climate; participation, hostility, and dependence are not merely projections of members' prior personalities.",
    work: "《实验创设的社会气候中的攻击行为模式》",
    englishWork: "Patterns of Aggressive Behavior in Experimentally Created Social Climates",
    presentationNature: "source-excerpt",
    reflection:
      "引句是作者对实验内群体结构“僵硬度”的解释，不是用一句话概括敌意、依赖、工作量与偏好等全部结果。四个10岁男童俱乐部轮流经历不同领导安排，领导者本人也轮换角色；这些控制支持情境解释，但并未消除次序、时代、测量与样本限制。制度化的关系方式会塑造行为，设计环境也在设计可能性。",
    englishReflection:
      "The quote is the authors' within-experiment interpretation of rigidity in group structure, not a one-sentence summary of every result concerning hostility, dependence, work, or preference. Four clubs of 10-year-old boys rotated through leadership arrangements, and leaders also rotated roles; these controls support a situational interpretation without removing order, period, measurement, or sampling limits. Structured relations shape behavior, so designing an environment also designs possibilities.",
    context:
      "勒温、利皮特与怀特于1930年代研究美国男童俱乐部，比较所谓民主、专制与放任气候。样本、标签和时代背景都很有限。",
    englishContext:
      "Lewin, Lippitt, and White studied U.S. boys' clubs in the 1930s, comparing so-called democratic, autocratic, and laissez-faire climates. The sample, labels, and era were narrow.",
    distinction:
      "这些结果不是任何文化与组织的固定排名，也不能为操纵儿童或员工辩护；现代研究须遵守更严格的伦理与情境检验。",
    englishDistinction:
      "The findings are not a universal ranking of cultures or organizations, and they do not justify manipulating children or workers. Modern research requires stronger ethics and contextual testing.",
    question: "你所在环境的规则，让人更愿意参与，还是更习惯等待命令？",
    englishQuestion:
      "Do the rules of your environment invite participation, or train people to wait for orders?",
    sourceLocator: [
      "勒温、利皮特与怀特〈实验创设的“社会气候”中的攻击行为模式〉，《社会心理学杂志》10卷2期（1939年5月），解释性评论第4节“群体结构的僵硬性”，原印刷页295，完整连续句；autocracy与democracy是该实验的时期标签，本句只比较群体结构僵硬度；按署名、定位、最小必要短引用于评论",
      "Lewin, Lippitt & White, “Patterns of Aggressive Behavior in Experimentally Created ‘Social Climates,’” Journal of Social Psychology 10(2) (May 1939), interpretive comments §4, “Rigidity of Group Structure,” original print p. 295, complete continuous sentence; autocracy and democracy name the study's experimental periods, and the sentence compares rigidity in group structure only; used as an attributed, located, minimally necessary quotation for commentary",
    ],
  },
  {
    id: "psychology-social-asch-impression-whole",
    authorId: "asch",
    topic: "感知",
    text: "一旦两个或更多特征被理解为属于同一个人，它们便不再作为孤立的特征存在，而是立即进入动态的相互作用。",
    english:
      "As soon as two or more traits are understood to belong to one person, they cease to exist as isolated traits, and come into immediate dynamic interaction.",
    editorialSummary:
      "我们形成他人印象时，不是把特征机械相加；每个特征的意义会被整个组合重新组织。",
    englishEditorialSummary:
      "When forming an impression of another person, we do not mechanically add traits; the whole configuration reorganizes what each trait means.",
    work: "《人格印象的形成》",
    englishWork: "Forming Impressions of Personality",
    presentationNature: "source-excerpt",
    reflection:
      "同一个‘聪明’，放在温暖或冷漠的整体印象中，可能被理解为体贴的洞察或算计的工具。社会知觉带着结构，而非一份中性清单。",
    englishReflection:
      "The same intelligence can seem like considerate insight in a warm configuration or a calculating instrument in a cold one. Social perception has structure, not a neutral checklist.",
    context:
      "阿希让大学生阅读特征词表并描述人物，研究的是短时、受控条件下的第一印象，而非长期关系中的完整认识。",
    englishContext:
      "Asch asked college students to read trait lists and describe a person. The studies examined brief, controlled first impressions, not complete understanding in long relationships.",
    distinction:
      "整体加工不表示第一印象可靠。样本主要来自当时的美国学生，语言、文化与熟悉程度都可能改变特征的含义。",
    englishDistinction:
      "Holistic processing does not make first impressions accurate. The samples were largely U.S. students of the period, and language, culture, and familiarity can change trait meanings.",
    question: "你对一个人的哪个判断，其实依赖了尚未检验的整体印象？",
    englishQuestion:
      "Which judgment of someone depends on an overall impression you have not yet tested?",
    sourceLocator: [
      "〈人格印象的形成〉，《异常与社会心理学杂志》41卷3期（1946），结论第2点，原刊印刷页284，完整连续句；仅确认美国公版",
      "“Forming Impressions of Personality,” Journal of Abnormal and Social Psychology 41(3) (1946), conclusion point 2, original print p. 284, complete continuous sentence; U.S. public-domain status only",
    ],
  },
  {
    id: "psychology-social-asch-central-traits",
    authorId: "asch",
    topic: "感知",
    text: "在这一过程中，有些特征被发现是中心性的。关系的整个系统决定哪些特征将成为中心。",
    english:
      "In the course of this process some characteristics are discovered to be central. The whole system of relations determines which will become central.",
    editorialSummary:
      "有些特征会成为理解他人的枢纽，改变周围许多特征的读法；‘温暖’与‘冷漠’便可能如此。",
    englishEditorialSummary:
      "Some traits become pivots for understanding a person and alter the reading of many surrounding traits; warm and cold can work this way.",
    work: "《人格印象的形成》",
    englishWork: "Forming Impressions of Personality",
    presentationNature: "source-excerpt",
    reflection:
      "印象并非所有信息权重相同。一个中心线索会组织后续解释，也因此可能让我们忽略与预期不合的证据。",
    englishReflection:
      "Not all information carries equal weight in an impression. A central cue organizes later interpretation and may make disconfirming evidence easier to miss.",
    context:
      "‘中心特征’来自特定词表与实验任务；它描述线索如何组织印象，不是把温暖度当作跨情境不变的人格本质。",
    englishContext:
      "The central-trait effect came from particular word lists and tasks. It describes how cues organize impressions, not warmth as an invariant essence across situations.",
    distinction:
      "这个效应不应用来训练更快地给人定性。更合理的用法，是提醒自己主动寻找能修正中心叙事的行为证据。",
    englishDistinction:
      "The effect should not train faster labeling. Its better use is to prompt an active search for behavioral evidence that could revise the central story.",
    question: "哪个词正在悄悄组织你对某个人的全部理解？",
    englishQuestion:
      "What single word may be quietly organizing your entire view of someone?",
    sourceLocator: [
      "〈人格印象的形成〉，《异常与社会心理学杂志》41卷3期（1946），结论第3点，原刊印刷页284，连续两句；仅确认美国公版",
      "“Forming Impressions of Personality,” Journal of Abnormal and Social Psychology 41(3) (1946), conclusion point 3, original print p. 284, two continuous sentences; U.S. public-domain status only",
    ],
  },
  {
    id: "psychology-social-asch-order",
    authorId: "asch",
    topic: "感知",
    text: "重要的与其说是条目纯粹的时间位置，不如说是它的内容同随后各条目内容之间的功能关系。",
    english:
      "It is not the sheer temporal position of the item which is important as much as the functional relation of its content to the content of the items following it.",
    editorialSummary:
      "相同的人格信息，先后次序不同，也可能形成不同印象；较早的信息会为后续理解设定方向。",
    englishEditorialSummary:
      "The same personality information can yield different impressions in a different order; earlier information can set the direction for what follows.",
    work: "《人格印象的形成》",
    englishWork: "Forming Impressions of Personality",
    presentationNature: "source-excerpt",
    reflection:
      "最先听到的描述并不只是占据记忆，它可能建立一个解释框架，让后来信息被吸收、淡化或重新命名。",
    englishReflection:
      "The first description does more than occupy memory. It can establish a frame through which later information is absorbed, muted, or renamed.",
    context:
      "阿希比较正向到负向与负向到正向的特征序列，观察到次序对人物描述的影响；现实互动比词表实验复杂得多。",
    englishContext:
      "Asch compared positive-to-negative and negative-to-positive trait sequences and observed order effects on descriptions. Real interactions are far more complex than trait-list experiments.",
    distinction:
      "首因效应不是不可逆的命运。持续接触、明确行为证据和对自身偏见的反思都可能重组印象。",
    englishDistinction:
      "Primacy is not irreversible fate. Continued contact, clear behavioral evidence, and reflection on bias can reorganize an impression.",
    question: "如果你最晚听到的信息最先出现，你会怎样重新理解这个人？",
    englishQuestion:
      "How might you understand this person differently if the last information had arrived first?",
    sourceLocator: [
      "〈人格印象的形成〉，《异常与社会心理学杂志》41卷3期（1946），实验六讨论，原刊印刷页272，完整连续句；仅确认美国公版",
      "“Forming Impressions of Personality,” Journal of Abnormal and Social Psychology 41(3) (1946), Experiment VI discussion, original print p. 272, complete continuous sentence; U.S. public-domain status only",
    ],
  },
  {
    id: "psychology-social-asch-conformity",
    authorId: "asch",
    topic: "群体",
    text: "这些受试者压下自己的观察，并在明知自己所作所为的情况下，说出多数方的立场。",
    english:
      "These subjects suppress their observations and voice the majority position with awareness of what they are doing.",
    editorialSummary:
      "即使答案清楚，多数人的一致判断仍可能让人怀疑自己的眼睛，或公开说出并不相信的答案。",
    englishEditorialSummary:
      "Even when an answer is clear, a unanimous majority can make people doubt their eyes or publicly state an answer they do not believe.",
    work: "《群体压力对判断修正与歪曲的影响》",
    englishWork: "Effects of Group Pressure upon the Modification and Distortion of Judgments",
    presentationNature: "source-excerpt",
    reflection:
      "引句只描述阿希在服从者中划分的第三类“行动的歪曲”，并不概括所有受试者；他还区分了感知歪曲与判断歪曲。服从可能来自对自己判断的不确定，也可能来自不愿显得孤立。表面一致因此不能直接证明内心相信。",
    englishReflection:
      "The quote describes only Asch's third category among yielding subjects, “distortion of action”; it does not characterize every participant. He separately distinguished distortion of perception and distortion of judgment. Yielding may arise from uncertainty about one's judgment or from reluctance to stand isolated, so surface agreement does not prove inner belief.",
    context:
      "经典线段实验使用二十世纪中期美国男性大学生和事先安排的同谋者；程序中的欺骗今天需要更严格的伦理审查与事后说明。",
    englishContext:
      "The classic line studies used mid-century U.S. male college students and instructed confederates. Their deception now requires stronger ethical review and debriefing.",
    distinction:
      "实验展示一种条件下的群体压力，不是‘人都盲从’的比例定律。任务、文化、关系、风险与多数是否一致都会改变结果。",
    englishDistinction:
      "The studies show group pressure under particular conditions, not a fixed rate of human blind conformity. Task, culture, relationships, stakes, and unanimity all matter.",
    question: "你最近一次附和，是改变了判断，还是不想承担异议的代价？",
    englishQuestion:
      "When you last went along, did your judgment change, or did you avoid the cost of dissent?",
    sourceLocator: [
      "阿希〈群体压力对判断修正与歪曲的影响〉，原载《群体、领导与人》（1951），原印刷页184；经许可重印于《格式塔心理学文献》（1961），第229页，服从者反应分类第3项“行动的歪曲”，完整连续句；本句只描述这一类服从者，合集续展链未完全闭合，按署名、定位、最小必要短引用于评论",
      "Asch, “Effects of Group Pressure upon the Modification and Distortion of Judgments,” originally in Groups, Leadership and Men (1951), original print p. 184; authorized reprint in Documents of Gestalt Psychology (1961), p. 229, yielding-subject category 3, “Distortion of action,” complete continuous sentence; the sentence describes this category only, and the collection's renewal chain is not fully resolved, so it is used as an attributed, located, minimally necessary quotation for commentary",
    ],
  },
  {
    id: "psychology-social-asch-ally",
    authorId: "asch",
    topic: "群体",
    text: "结果清楚表明，打破多数方的一致性，显著增强了受试者的独立判断。",
    english:
      "The results clearly demonstrate that a disturbance of the unanimity of the majority markedly increased the independence of the critical subjects.",
    editorialSummary:
      "多数只要不再完全一致，一个人的独立判断就更容易保留下来；盟友不必总是正确，也能打破孤立。",
    englishEditorialSummary:
      "Once a majority is no longer unanimous, independent judgment becomes easier to preserve; an ally need not always be right to break isolation.",
    work: "《群体压力对判断修正与歪曲的影响》",
    englishWork: "Effects of Group Pressure upon the Modification and Distortion of Judgments",
    presentationNature: "source-excerpt",
    reflection:
      "在‘真正伙伴’或按指示始终答对的伙伴条件中，打破一致多数使亲多数错误由基本实验的32%降至10.4%或5.5%。引句只支持这些正确伙伴条件；‘盟友不必总是正确’来自另一些变化条件，不能视为本句结论。实验仍是男性大学生的低风险线长公开判断，不能直接外推到政治镇压、职场报复或亲密关系暴力。",
    englishReflection:
      "With either a “true partner” or an instructed partner who always answered correctly, breaking unanimity reduced pro-majority errors from 32% in the basic experiment to 10.4% or 5.5%. The quote supports those correct-partner conditions only; the claim that an ally need not always be right comes from other variations and is not established by this sentence. These were low-stakes public line judgments by male college students, not political repression, workplace retaliation, or intimate-partner violence.",
    context:
      "阿希后续实验改变多数的一致性与伙伴条件，发现多数影响显著下降；这些仍是低风险的视觉判断任务。",
    englishContext:
      "Asch's later experiments varied unanimity and partner conditions and found substantially reduced majority influence. These were still low-stakes visual judgments.",
    distinction:
      "盟友效应不能直接推演到政治镇压、职场报复或亲密关系暴力；现实中的异议成本可能远高于实验室。",
    englishDistinction:
      "The ally effect cannot be directly generalized to political repression, workplace retaliation, or intimate-partner violence, where the cost of dissent can be far higher.",
    question: "你能否成为那个让别人知道‘并非只有我不同意’的人？",
    englishQuestion:
      "Could you be the person who lets someone else know they are not alone in disagreeing?",
    sourceLocator: [
      "阿希〈群体压力对判断修正与歪曲的影响〉，原载《群体、领导与人》（1951），原印刷页186；经许可重印于《格式塔心理学文献》（1961），第231页，‘非一致多数的影响’之‘真正伙伴’条件，完整连续句；引句只概括正确伙伴条件，合集续展链未完全闭合，按署名、定位、最小必要短引用于评论",
      "Asch, “Effects of Group Pressure upon the Modification and Distortion of Judgments,” originally in Groups, Leadership and Men (1951), original print p. 186; authorized reprint in Documents of Gestalt Psychology (1961), p. 231, “The Effect of Non-unanimous Majorities,” true-partner conditions, complete continuous sentence; the quote summarizes correct-partner conditions only; the collection's renewal chain is not fully resolved, so this is an attributed, located, minimally necessary quotation for commentary",
    ],
  },
  {
    id: "psychology-social-festinger-comparison",
    authorId: "festinger",
    topic: "自我",
    text: "假设二：在缺少客观、非社会性手段的程度上，人们会分别将自己的意见和能力与他人的意见和能力相比较，以作评价。",
    english:
      "Hypothesis II: To the extent that objective, non-social means are not available, people evaluate their opinions and abilities by comparison respectively with the opinions and abilities of others.",
    editorialSummary:
      "当缺少明确的客观尺度，人往往借助与他人的比较来判断自己的能力与意见。",
    englishEditorialSummary:
      "When clear objective standards are absent, people often evaluate their abilities and opinions through comparison with others.",
    work: "《社会比较过程理论》",
    englishWork: "A Theory of Social Comparison Processes",
    presentationNature: "source-excerpt",
    reflection:
      "比较不只是虚荣，它也提供定位：我做得如何、我的看法是否站得住。但所选参照群体会悄悄改变答案。",
    englishReflection:
      "Comparison is not merely vanity; it provides orientation about performance and opinion. Yet the reference group quietly changes the answer.",
    context:
      "费斯廷格1954年的理论提出多项假设，重点是缺少非社会标准时的意见和能力评价；后来研究扩展并修正了其方向性。",
    englishContext:
      "Festinger's 1954 theory proposed hypotheses about evaluating opinions and abilities when nonsocial standards are unavailable. Later work broadened and revised its predicted directions.",
    distinction:
      "社会比较不是固定的人格缺陷，也不能单独解释社交媒体影响；平台设计、身份位置与文化规范都会塑造比较对象和后果。",
    englishDistinction:
      "Social comparison is not a fixed personality defect and cannot by itself explain social-media effects. Platform design, identity position, and cultural norms shape targets and outcomes.",
    question: "你今天用谁作为参照，而这个选择让你看见了什么、漏掉了什么？",
    englishQuestion:
      "Whom did you use as a reference today, and what did that choice reveal or hide?",
    sourceLocator: [
      "费斯廷格〈社会比较过程理论〉，《人际关系》7卷2期（1954年5月），假设二，原印刷页118，完整连续假设条目；命题限定于客观、非社会性手段不可用的程度，不是“所有评价都依赖他人”的普遍结论；按署名、定位、最小必要短引用于评论",
      "Festinger, “A Theory of Social Comparison Processes,” Human Relations 7(2) (May 1954), Hypothesis II, original print p. 118, complete continuous hypothesis item; the claim is limited to the extent that objective, nonsocial means are unavailable and is not a universal claim that all evaluation depends on others; used as an attributed, located, minimally necessary quotation for commentary",
    ],
  },
  {
    id: "psychology-social-festinger-dissonance",
    authorId: "festinger",
    topic: "自我",
    text: "彼此冲突的认知会造成不适，并推动人减少冲突；改变行为、改写解释或回避信息都可能成为出口。",
    english:
      "Conflicting cognitions can create discomfort and motivate its reduction; changing behavior, revising an explanation, or avoiding information can all become exits.",
    work: "《认知失调理论》",
    englishWork: "A Theory of Cognitive Dissonance",
    reflection:
      "失调理论提醒我们，理由有时不是行动的起点，而是行动之后用来恢复自洽的产物。感到合理，不等于理由经得住检验。",
    englishReflection:
      "Dissonance theory reminds us that reasons can be products of action rather than its starting point. Feeling coherent does not mean the reasons withstand scrutiny.",
    context:
      "费斯廷格把失调界定为认知元素间的不一致关系，并提出减少失调的动机；后续理论对责任、威胁和自我概念作出不同解释。",
    englishContext:
      "Festinger defined dissonance as inconsistency among cognitive elements and proposed a motivation to reduce it. Later theories differ on responsibility, threat, and the role of self-concept.",
    distinction:
      "这不是临床诊断，也不能从外部断言某人‘一定在失调’。不适可能来自多种情绪与社会条件，行为改变也未必可行。",
    englishDistinction:
      "This is not a clinical diagnosis, nor can an observer declare that someone must be dissonant. Discomfort has many sources, and behavioral change may not be feasible.",
    question: "你现在维护的理由，是在解释选择，还是在保护已经作出的选择？",
    englishQuestion:
      "Is the reason you are defending explaining your choice, or protecting a choice already made?",
    sourceLocator: [
      "《认知失调理论》第一章，‘认知失调导论’",
      "A Theory of Cognitive Dissonance, Chapter 1, “An Introduction to the Theory of Dissonance”",
    ],
  },
  {
    id: "psychology-social-festinger-postdecision",
    authorId: "festinger",
    topic: "决策",
    text: "艰难选择之后，人可能放大所选方案的优点、贬低未选方案，以缩小‘本可选另一条路’带来的不适。",
    english:
      "After a difficult choice, people may magnify the chosen option's merits and downgrade the rejected one, reducing the discomfort of knowing another path was possible.",
    work: "《认知失调理论》",
    englishWork: "A Theory of Cognitive Dissonance",
    reflection:
      "决定会改变之后的信息加工。越接近的备选越容易留下张力，于是我们倾向于把世界重新叙述成‘选择其实很明显’。",
    englishReflection:
      "A decision changes subsequent information processing. Close alternatives leave more tension, encouraging a new story in which the choice seems to have been obvious.",
    context:
      "费斯廷格综合赌博、消费者选择等早期研究讨论决定后失调；效应大小受承诺、可撤销性、个人责任与任务意义影响。",
    englishContext:
      "Festinger drew on early studies of wagering and consumer choice to discuss postdecision dissonance. Commitment, reversibility, responsibility, and task meaning affect its size.",
    distinction:
      "选择后更喜欢所选项不必然证明自我欺骗，也可能来自新信息或真实体验。需要比较选择前后的证据，而非凭结果猜心理。",
    englishDistinction:
      "Greater liking for a chosen option does not necessarily prove self-deception; new information or real experience may matter. Evidence before and after the choice is needed.",
    question: "如果不必证明自己当初正确，你会怎样重新评价被放弃的选项？",
    englishQuestion:
      "If you did not need to prove your earlier choice right, how would you reassess the rejected option?",
    sourceLocator: [
      "《认知失调理论》第三章，‘决定的后果：理论’",
      "A Theory of Cognitive Dissonance, Chapter 3, “Consequences of Decisions: Theory”",
    ],
  },
  {
    id: "psychology-social-festinger-insufficient-justification",
    authorId: "festinger",
    topic: "行为",
    text: "所提供的奖励越大（超过引出该行为所必需的程度），这种效应就越小。",
    english:
      "The greater the reward offered (beyond what was necessary to elicit the behavior) the smaller was the effect.",
    editorialSummary:
      "当外在理由不足以解释自己的行为，人可能调整内在态度，让行为在自己看来更说得通。",
    englishEditorialSummary:
      "When external reasons are insufficient to explain one's behavior, a person may shift an internal attitude so the behavior makes more sense to them.",
    work: "《强制服从的认知后果》",
    englishWork: "Cognitive Consequences of Forced Compliance",
    presentationNature: "source-excerpt",
    reflection:
      "较大奖励能为违背私下意见的行为提供更充分外在解释，因此未必需要同样幅度的态度变化。实验让美国男大学生完成枯燥任务后，以1美元或20美元向下一名参与者作不实介绍；主要结果是自评任务愉快度，71人中11人的数据被排除，且程序使用欺骗。它不能外推为‘低报酬普遍改变信念’或操纵他人的配方。",
    englishReflection:
      "A larger reward can provide a stronger external explanation for behavior contrary to private opinion, leaving less need for the same degree of attitude change. U.S. male undergraduates completed dull tasks and, for $1 or $20, misrepresented them to another participant; the primary outcome was self-rated enjoyment, 11 of 71 participants were excluded, and the procedure used deception. It is neither a universal law that low pay changes belief nor a recipe for manipulation.",
    context:
      "费斯廷格与卡尔史密斯1959年的实验让美国男大学生完成枯燥任务后向下一位参与者作不实介绍，并比较不同报酬条件。",
    englishContext:
      "Festinger and Carlsmith's 1959 study had U.S. male undergraduates complete dull tasks and misrepresent them to another participant under different payment conditions.",
    distinction:
      "这项使用欺骗的狭窄实验不应成为操纵他人的配方。报酬、权力、文化和任务意义都会影响结果，现代复制也呈现条件差异。",
    englishDistinction:
      "This narrow deception study should not become a recipe for manipulation. Payment, power, culture, and task meaning matter, and modern replications show boundary conditions.",
    question: "你是否因缺少外在理由，而在事后改变了对一件事的评价？",
    englishQuestion:
      "Have you ever changed your evaluation afterward because your action lacked an external justification?",
    sourceLocator: [
      "费斯廷格与卡尔史密斯〈强制服从的认知后果〉，《异常与社会心理学杂志》58卷2期（1959年3月），原印刷页208，‘任务有多愉快’结果讨论末尾，完整连续句；效应指违背私下意见后态度向公开陈述靠拢的程度；仅确认美国公版",
      "Festinger & Carlsmith, “Cognitive Consequences of Forced Compliance,” Journal of Abnormal and Social Psychology 58(2) (Mar. 1959), original print p. 208, complete continuous sentence at the end of the “How Enjoyable the Tasks Were” results discussion; “effect” refers to the degree of attitude change toward the counter-attitudinal public statement; U.S. public-domain status only",
    ],
  },
  {
    id: "psychology-social-festinger-failed-prophecy",
    authorId: "festinger",
    topic: "群体",
    text: "当一个群体的核心预言落空，信念不一定立刻瓦解；若社会支持仍在，成员可能通过新的解释把失败纳入信念。",
    english:
      "When a group's central prophecy fails, belief need not collapse immediately; if social support remains, members may absorb failure through a new explanation.",
    work: "《预言失败之时》",
    englishWork: "When Prophecy Fails",
    reflection:
      "反证并不自动战胜承诺。已经投入的行动、公开身份与共同体关系，会让一种挽救信念的叙事显得更可承受。",
    englishReflection:
      "Disconfirmation does not automatically defeat commitment. Prior action, public identity, and community ties can make a belief-saving narrative more bearable.",
    context:
      "研究团队秘密观察一个预言灾难与救援的美国小型灵性团体。该民族志影响深远，也因隐蔽参与、隐私和研究者介入而有伦理争议。",
    englishContext:
      "Researchers covertly observed a small U.S. spiritual group expecting catastrophe and rescue. The influential ethnography is ethically contested for covert participation, privacy, and researcher involvement.",
    distinction:
      "单一案例不能代表所有宗教、政治或网络社群，也不能据此把坚持信念的人都归为非理性。组织、利益与替代关系同样重要。",
    englishDistinction:
      "One case cannot represent all religious, political, or online communities, nor label every persistent believer irrational. Organization, interests, and alternative relationships also matter.",
    question: "当事实挑战群体信念时，什么关系或投入使重新解释比退出更容易？",
    englishQuestion:
      "When facts challenge a group belief, what relationships or investments make reinterpretation easier than leaving?",
    sourceLocator: [
      "费斯廷格、里肯与沙赫特（1956），《预言失败之时》第七至八章",
      "Festinger, Riecken & Schachter (1956), When Prophecy Fails, Chapters 7–8",
    ],
  },
  {
    id: "psychology-social-tajfel-minimal-groups",
    authorId: "tajfel-turner",
    topic: "群体",
    text: "即使分组依据微不足道、成员彼此陌生，仅仅知道‘我们’与‘他们’也可能影响资源分配。",
    english:
      "Even when grouping is trivial and members are strangers, merely knowing “us” and “them” can influence how resources are allocated.",
    work: "《社会分类与群际行为》",
    englishWork: "Social Categorization and Intergroup Behaviour",
    reflection:
      "最小群体实验显示，偏向内群体不必等待深仇旧怨才出现。分类本身就能提供一个比较框架，让微小差异获得社会意义。",
    englishReflection:
      "Minimal-group studies showed that ingroup preference need not await deep conflict. Categorization itself supplies a comparative frame in which small differences gain social meaning.",
    context:
      "泰弗尔等人让英国男学生按绘画偏好等任意标准匿名分组，再分配点数。它是高度简化的实验范式。",
    englishContext:
      "Tajfel and colleagues anonymously grouped British schoolboys by arbitrary criteria such as painting preference and asked them to allocate points. The paradigm is highly simplified.",
    distinction:
      "最小群体效应不能解释殖民、种族主义或阶级冲突的全部成因；长期不平等还涉及制度、物质利益、暴力与历史。",
    englishDistinction:
      "Minimal-group effects cannot explain colonialism, racism, or class conflict in full. Enduring inequality also involves institutions, material interests, violence, and history.",
    question: "你在哪个场合，把一个偶然分类当成了值得偏袒的‘我们’？",
    englishQuestion:
      "Where have you treated an accidental category as an “us” worthy of preference?",
    sourceLocator: [
      "泰弗尔、比利格、邦迪与弗拉门特（1971），《欧洲社会心理学杂志》第1卷，149—178页",
      "Tajfel, Billig, Bundy & Flament (1971), European Journal of Social Psychology 1, pp. 149–178",
    ],
  },
  {
    id: "psychology-social-tajfel-social-identity",
    authorId: "tajfel-turner",
    topic: "自我",
    text: "自我概念的一部分来自群体成员身份，以及这些身份所承载的价值与情感。",
    english:
      "Part of the self-concept comes from group memberships and from the value and emotion attached to those memberships.",
    work: "《群际冲突的整合理论》",
    englishWork: "An Integrative Theory of Intergroup Conflict",
    reflection:
      "‘我是谁’常常包含‘我们是谁’。当群体受到赞扬、贬低或威胁，个人感受到的不只是对外部标签的评价，也可能是对自我的触碰。",
    englishReflection:
      "Who I am often includes who we are. Praise, stigma, or threat directed at a group can be felt not merely as an external label but as contact with the self.",
    context:
      "泰弗尔与特纳以社会分类、社会认同和社会比较解释部分群际过程，理论最初在欧洲战后语境中形成。",
    englishContext:
      "Tajfel and Turner used social categorization, social identity, and social comparison to explain some intergroup processes; the theory emerged in postwar European contexts.",
    distinction:
      "人同时拥有多重身份，身份也不是由研究者替个人决定。群体认同不能抹去个人差异、交叉身份和不平等权力。",
    englishDistinction:
      "People hold multiple identities, and researchers do not decide which identity matters for a person. Group identity does not erase individual difference, intersectionality, or unequal power.",
    question: "此刻哪个‘我们’最影响你的判断，而另一个身份会怎样看同一件事？",
    englishQuestion:
      "Which “we” most shapes your judgment now, and how might another identity view the same matter?",
    sourceLocator: [
      "泰弗尔与特纳（1979），《群际关系的社会心理学》，33—47页，社会认同定义部分",
      "Tajfel & Turner (1979), An Integrative Theory of Intergroup Conflict, in The Social Psychology of Intergroup Relations, pp. 33–47",
    ],
  },
  {
    id: "psychology-social-tajfel-positive-distinctiveness",
    authorId: "tajfel-turner",
    topic: "群体",
    text: "群体比较不仅寻找差异，也常寻找对自身有利的差异；‘比他们更好’可能成为维持积极认同的方式。",
    english:
      "Intergroup comparison often seeks not just difference but difference favorable to one's own group; being better than them can support a positive identity.",
    work: "《群际冲突的整合理论》",
    englishWork: "An Integrative Theory of Intergroup Conflict",
    reflection:
      "当自尊与群体排名绑在一起，合作问题容易被改写为地位竞赛。人可能选择更有利的比较维度，而不是重新审视共同目标。",
    englishReflection:
      "When self-regard becomes tied to group ranking, a cooperative problem can turn into a status contest. People may choose a favorable dimension instead of revisiting shared goals.",
    context:
      "积极独特性是社会认同理论的一项核心机制，但后续研究显示认同强度、地位正当性与边界可渗透性会改变策略。",
    englishContext:
      "Positive distinctiveness is a central social-identity mechanism, but later research shows that identification, status legitimacy, and boundary permeability alter the strategies used.",
    distinction:
      "群体偏好不总等于对外群体敌意，积极认同也可来自文化实践、互助与价值创造，而非贬低他人。",
    englishDistinction:
      "Ingroup preference does not always equal outgroup hostility. Positive identity can also come from cultural practice, mutual aid, and value creation without demeaning others.",
    question: "你的群体需要贬低谁，才能觉得自己值得肯定吗？",
    englishQuestion:
      "Does your group need to diminish someone else in order to feel worthy?",
    sourceLocator: [
      "《群际冲突的整合理论》，‘社会比较与积极独特性’部分",
      "An Integrative Theory of Intergroup Conflict, section on social comparison and positive distinctiveness",
    ],
  },
  {
    id: "psychology-social-turner-self-categorization",
    authorId: "tajfel-turner",
    topic: "自我",
    text: "不同情境会让不同层次的身份变得突出；同一个人有时作为独特个体行动，有时作为群体成员行动。",
    english:
      "Different contexts make different levels of identity salient; the same person sometimes acts as a unique individual and sometimes as a group member.",
    work: "《重新发现社会群体》",
    englishWork: "Rediscovering the Social Group",
    reflection:
      "自我分类不是把个人性消除，而是改变此刻用于理解自己的参照层次。共同身份突出时，群体规范也更可能指导行为。",
    englishReflection:
      "Self-categorization does not erase individuality; it changes the level of reference used to understand oneself. When shared identity is salient, group norms can guide behavior more strongly.",
    context:
      "特纳等人把社会认同理论发展为自我分类理论，讨论从个人到群体层次的认知表征与‘去个体化’。",
    englishContext:
      "Turner and colleagues developed self-categorization theory from social identity theory, addressing cognitive representation from personal to group levels and depersonalization.",
    distinction:
      "这里的‘去个体化’指按群体原型理解自我，不等于失去自控或成为没有人格的群众；情境与规范内容必须具体考察。",
    englishDistinction:
      "Depersonalization here means perceiving the self through a group prototype, not losing self-control or becoming a personless crowd. Context and norm content must be examined.",
    question: "当前场景把你的哪个身份推到了最前面？",
    englishQuestion: "Which of your identities has this situation brought to the foreground?",
    sourceLocator: [
      "特纳等（1987），《重新发现社会群体》第二至三章",
      "Turner et al. (1987), Rediscovering the Social Group, Chapters 2–3",
    ],
  },
  {
    id: "psychology-social-turner-ingroup-influence",
    authorId: "tajfel-turner",
    topic: "群体",
    text: "当信息来源被看作‘我们中的一员’，其观点更容易被当作内部规范来处理；影响力部分取决于谁被归入共同身份。",
    english:
      "When a source is seen as one of us, its views are more readily treated as an internal norm; influence partly depends on who is included in the shared identity.",
    work: "《迈向社会群体的认知性重定义》",
    englishWork: "Towards a Cognitive Redefinition of the Social Group",
    reflection:
      "群体成员并非只回应论证内容，也会判断说话者与自己是否共享身份。‘谁有资格代表我们’因而成为规范形成的一部分。",
    englishReflection:
      "Group members respond not only to an argument but also to whether its source shares an identity with them. Who may speak for us therefore becomes part of norm formation.",
    context:
      "特纳在社会认同理论基础上提出自我分类取向，重新解释群体如何影响判断；后续研究才进一步发展出群体原型与身份领导等模型。",
    englishContext:
      "Turner extended social identity theory through a self-categorization approach to group influence. Later research developed more specific models of group prototypicality and identity leadership.",
    distinction:
      "被视为内群体成员不等于说法正确或道德正当。群体边界也可能被权力、宣传和排斥操控，仍须独立检验证据与后果。",
    englishDistinction:
      "Being seen as an ingroup member does not make a claim true or morally legitimate. Power, propaganda, and exclusion can manipulate group boundaries, so evidence and consequences still require independent scrutiny.",
    question: "你接受这句话，是因为证据更充分，还是因为说话者被算作‘自己人’？",
    englishQuestion:
      "Are you accepting this claim because the evidence is stronger, or because the speaker counts as one of us?",
    sourceLocator: [
      "特纳（1982），《迈向社会群体的认知性重定义》，载泰弗尔编《社会认同与群际关系》",
      "Turner (1982), “Towards a Cognitive Redefinition of the Social Group,” in Tajfel (ed.), Social Identity and Intergroup Relations",
    ],
  },
  {
    id: "psychology-social-bowlby-attachment-system",
    authorId: "bowlby-ainsworth",
    topic: "关系",
    text: "依恋行为可以被理解为一套在威胁、疲惫或分离时被激活的调节系统，使儿童重新靠近熟悉的照料者。",
    english:
      "Attachment behavior can be understood as a regulatory system activated by threat, fatigue, or separation, bringing a child back toward a familiar caregiver.",
    work: "《依恋与丧失：依恋》",
    englishWork: "Attachment and Loss, Volume 1: Attachment",
    reflection:
      "哭泣、跟随与寻求拥抱不只是需要被纠正的行为，它们也可能是在恢复安全距离。理解功能，会改变成人回应信号的方式。",
    englishReflection:
      "Crying, following, and seeking contact are not merely behaviors to correct; they may help restore a safe distance. Understanding function changes how adults respond to signals.",
    context:
      "鲍尔比结合临床观察、动物行为学与控制系统思想提出依恋系统，写作背景包括战后欧洲的儿童分离与机构照护问题。",
    englishContext:
      "Bowlby combined clinical observation, ethology, and control-systems thinking to propose an attachment system, writing amid postwar European concern about child separation and institutional care.",
    distinction:
      "理论不等于儿童只能依恋一位生母，也不能把照料压力造成的关系困难归罪于某个家庭成员；儿童可与多位稳定照料者建立关系。",
    englishDistinction:
      "The theory does not mean a child can attach only to a biological mother, nor should relationship difficulties under caregiving strain be blamed on one family member. Children can form bonds with multiple stable caregivers.",
    question: "当一个孩子靠近或退缩时，你先看到的是麻烦，还是他正在调节安全感？",
    englishQuestion:
      "When a child approaches or withdraws, do you first see trouble, or an attempt to regulate safety?",
    sourceLocator: [
      "鲍尔比《依恋与丧失》第一卷第三部分、第十一章，论依恋行为系统",
      "Bowlby, Attachment and Loss, Vol. 1, Part III, Chapter 11, on the attachment behavioral system",
    ],
  },
  {
    id: "psychology-social-bowlby-secure-base",
    authorId: "bowlby-ainsworth",
    topic: "关系",
    text: "可靠的照料关系既提供可以返回的安全基地，也让儿童更有余地离开照料者去探索。",
    english:
      "A reliable caregiving relationship provides a secure base to return to and gives a child more room to move away and explore.",
    work: "《安全基地》",
    englishWork: "A Secure Base",
    reflection:
      "依赖与独立并非总是相反。知道需要时有人可接近，可能减少把全部注意力用在警戒上，从而支持探索。",
    englishReflection:
      "Dependence and independence are not always opposites. Knowing someone is available when needed may reduce vigilance and free attention for exploration.",
    context:
      "‘安全基地’来自安斯沃斯的观察并被鲍尔比纳入依恋理论，主要描述幼儿在照料者可接近时探索与返回的组织方式。",
    englishContext:
      "The secure-base concept grew from Ainsworth's observations and was incorporated into Bowlby's attachment theory, describing how young children organize exploration and return around an available caregiver.",
    distinction:
      "安全基地不是要求照料者时时在场或消除一切挫折，也不能从一次分离反应诊断家庭质量；年龄、气质、熟悉度和文化惯例都会影响表现。",
    englishDistinction:
      "A secure base does not require constant presence or the removal of every frustration, and one separation response cannot diagnose family quality. Age, temperament, familiarity, and cultural practice all affect behavior.",
    question: "哪一种稳定的可回应，让你更敢于走向未知？",
    englishQuestion:
      "What kind of dependable responsiveness makes it easier for you to move toward the unknown?",
    sourceLocator: [
      "鲍尔比《安全基地》第一讲，论父母作为安全基地的作用",
      "Bowlby, A Secure Base, Lecture 1, on the caregiving role of providing a secure base",
    ],
  },
  {
    id: "psychology-social-bowlby-working-models",
    authorId: "bowlby-ainsworth",
    topic: "自我",
    text: "反复的关系经验会形成关于‘他人是否可接近’与‘自己是否值得回应’的工作模型，帮助预测下一次互动。",
    english:
      "Repeated relationship experiences can form working models of whether others are available and whether the self is likely to receive care, helping predict the next interaction.",
    work: "《依恋与丧失：分离》",
    englishWork: "Attachment and Loss, Volume 2: Separation",
    reflection:
      "我们进入新关系时并非全无预期。旧经验提供快捷预测，但同一套预测也可能让新的回应被忽略或误读。",
    englishReflection:
      "We do not enter new relationships without expectations. Past experience supplies efficient predictions, yet the same predictions can hide or distort new responses.",
    context:
      "鲍尔比用内部工作模型连接早期互动、预期与后续关系行为；后续依恋研究把这一概念发展为多种可测但并不等同的构念。",
    englishContext:
      "Bowlby used internal working models to connect early interaction, expectation, and later relationship behavior. Later attachment research developed several measurable but nonidentical constructs from the idea.",
    distinction:
      "工作模型不是刻在童年里的终身判决，也不是凭成人关系问卷就能还原婴儿经历。新的稳定关系、反思和环境变化都可能带来修正。",
    englishDistinction:
      "A working model is not a lifelong sentence fixed in childhood, and an adult questionnaire cannot reconstruct infancy. Stable new relationships, reflection, and environmental change can revise expectations.",
    question: "你在这段关系里预先假定了对方会怎样回应，而现实证据是否支持它？",
    englishQuestion:
      "What response are you presuming in this relationship, and does the present evidence support that expectation?",
    sourceLocator: [
      "鲍尔比《依恋与丧失》第二卷第二十一章，论依恋、沟通与内部工作模型",
      "Bowlby, Attachment and Loss, Vol. 2, Chapter 21, on attachment, communication, and internal working models",
    ],
  },
  {
    id: "psychology-social-ainsworth-strange-situation",
    authorId: "bowlby-ainsworth",
    topic: "发展",
    text: "短暂分离与重聚时，婴儿组织接近、安抚和探索的方式存在差异；重聚往往比单独的哭泣更有解释力。",
    english:
      "During brief separations and reunions, infants differ in how they organize proximity, soothing, and exploration; reunion behavior is often more informative than crying alone.",
    work: "《依恋模式》",
    englishWork: "Patterns of Attachment",
    reflection:
      "观察重点不是给孩子贴上好坏标签，而是看一组行为如何在压力后恢复关系与探索。单个动作只有放回序列才有意义。",
    englishReflection:
      "The point is not to label a child good or bad, but to see how a pattern of behavior restores relationship and exploration after stress. A single act gains meaning only within the sequence.",
    context:
      "安斯沃斯等人以巴尔的摩中产家庭的一岁左右婴儿发展陌生情境程序，并把实验表现与家庭观察相联系。",
    englishContext:
      "Ainsworth and colleagues developed the Strange Situation with roughly one-year-old infants from predominantly middle-class Baltimore families and related laboratory behavior to home observations.",
    distinction:
      "程序不是适用于所有年龄与文化的通用人格测验，更不能用一次观察责备父母。照料安排、分离常态、文化表达与儿童状态都会影响分类。",
    englishDistinction:
      "The procedure is not a universal personality test across ages and cultures, and one observation must not be used to blame parents. Care arrangements, customary separation, cultural expression, and child state all affect classification.",
    question: "你是否把一次显眼反应，当成了对整段关系的完整结论？",
    englishQuestion:
      "Have you treated one visible reaction as a complete conclusion about an entire relationship?",
    sourceLocator: [
      "安斯沃斯、布莱哈尔、沃特斯与沃尔《依恋模式》第五至八章，陌生情境程序与模式分类",
      "Ainsworth, Blehar, Waters & Wall, Patterns of Attachment, Chapters 5–8, Strange Situation procedure and pattern classification",
    ],
  },
  {
    id: "psychology-social-ainsworth-cultural-observation",
    authorId: "bowlby-ainsworth",
    topic: "发展",
    text: "理解依恋需要回到日常照料：谁回应、怎样抱持、何时分离，以及当地生活如何组织儿童与成人的接近。",
    english:
      "Understanding attachment requires returning to everyday care: who responds, how contact is offered, when separation occurs, and how local life organizes closeness between children and adults.",
    work: "《乌干达的婴儿期》",
    englishWork: "Infancy in Uganda",
    reflection:
      "实验中的几分钟只有放回长期关系与文化实践才更易理解。先观察生活，再解释行为，可减少把自己的常态当成普遍标准。",
    englishReflection:
      "A few laboratory minutes become clearer when placed within long-term relationships and cultural practice. Observing life before interpreting behavior helps prevent one's own norm from becoming a universal standard.",
    context:
      "安斯沃斯在乌干达对甘达人母婴进行自然观察，随后又在巴尔的摩开展纵向家庭访问；这些研究奠定理论，也反映当时以母婴为中心的取样方式。",
    englishContext:
      "Ainsworth observed Ganda mothers and infants in Uganda and later conducted longitudinal home visits in Baltimore. These foundational studies also reflect their era's mother–infant-centered sampling.",
    distinction:
      "跨文化差异不能被简单排成更安全或更落后的等级。亲属网络、共同照料、迁移、贫困与研究者位置都应进入解释。",
    englishDistinction:
      "Cross-cultural differences should not be ranked as more secure or more backward. Kin networks, shared caregiving, migration, poverty, and the researcher's position all belong in interpretation.",
    question: "在评价一种照料方式前，你了解它所在家庭与文化的日常安排吗？",
    englishQuestion:
      "Before judging a caregiving pattern, do you understand the everyday arrangements of its family and culture?",
    sourceLocator: [
      "安斯沃斯《乌干达的婴儿期》第四至六章及结论，家庭观察与依恋行为的发展",
      "Ainsworth, Infancy in Uganda, Chapters 4–6 and conclusions, home observations and the development of attachment behavior",
    ],
  },
  {
    id: "psychology-social-piaget-action-construction",
    authorId: "piaget",
    topic: "发展",
    text: "即使那些看似复制而来的东西，实际上也经过变形和再创造。",
    english:
      "Even that which seems copied is in reality deformed and recreated.",
    editorialSummary: "儿童并非照相式复制成人语言或观念；他们会依据自身的理解结构对材料作出变形和再创造。",
    englishEditorialSummary:
      "Children do not copy adult language or ideas photographically; they deform and recreate material through their own structures of understanding.",
    work: "《儿童的世界观》",
    englishWork: "The Child's Conception of the World",
    presentationNature: "source-excerpt",
    reflection:
      "皮亚杰在临床访谈的方法讨论中提醒研究者：儿童重复成人用词或看似同意，并不证明他赋予这些词相同意义。教学和研究都需要追问儿童实际怎样重组材料，而不能只把复述当作理解。",
    englishReflection:
      "In discussing the clinical interview, Piaget warns that a child who repeats adult wording or appears to agree has not thereby assigned it the same meaning. Teaching and research must probe how the child actually reorganizes material instead of treating repetition as understanding.",
    context:
      "这句话来自皮亚杰对儿童访谈结果如何解释的方法规则，而不是对三名子女感觉运动行为的观察记录。它针对的是研究者如何避免把成人问题与儿童回答表面的相似误判为意义相同。",
    englishContext:
      "The sentence comes from Piaget's methodological rules for interpreting interviews with children, not from sensorimotor observations of his three children. It warns researchers against mistaking surface similarity between adult questions and child answers for identity of meaning.",
    distinction:
      "“变形和再创造”不表示儿童回答可以任意解释；提问方式、语言能力、社会情境与可重复的回答模式仍要被公开检查。",
    englishDistinction:
      "‘Deformed and recreated’ does not make a child's answer open to arbitrary interpretation; question wording, language ability, social setting, and reproducible patterns still require scrutiny.",
    question: "孩子是在复述成人用词，还是已用自己的结构重建了它的意义？",
    englishQuestion:
      "Is the child repeating adult wording, or reconstructing its meaning through a structure of their own?",
    sourceLocator: [
      "皮亚杰《儿童的世界观》，Joan与Andrew Tomlinson 1929年公版英译，导论“问题与方法”第4节“解释结果的规则”，印刷页30，完整连续句",
      "Piaget, The Child's Conception of the World, Joan and Andrew Tomlinson public-domain translation (1929), Introduction, “Problems and Methods,” §4, “Rules for the interpretation of the results,” print p. 30, complete continuous sentence",
    ],
  },
  {
    id: "psychology-social-piaget-assimilation-accommodation",
    authorId: "piaget",
    topic: "学习",
    text: "理解新经验既会把它纳入已有结构，也会迫使结构作出调整；学习发生在同化与顺应的往复中。",
    english:
      "Understanding new experience both incorporates it into existing structures and forces those structures to adjust; learning unfolds through the interplay of assimilation and accommodation.",
    work: "《智力心理学》",
    englishWork: "The Psychology of Intelligence",
    reflection:
      "只同化，世界会被硬塞进旧解释；只顺应，经验又缺少稳定结构。成熟理解需要既保留可用框架，也允许反例改变框架。",
    englishReflection:
      "Assimilation alone forces the world into an old account; accommodation alone leaves experience without stable structure. Mature understanding retains useful frames while allowing counterevidence to change them.",
    context:
      "皮亚杰把这对概念用于说明认知结构如何在适应中保持连续并发生变化，它们是理论关系，不是两种可给个人贴标签的学习风格。",
    englishContext:
      "Piaget used these concepts to explain how cognitive structures preserve continuity while changing through adaptation. They are theoretical relations, not two learning styles for labeling individuals.",
    distinction:
      "不能把任何错误都说成同化不足，也不能用该模型忽略教学、语言、社会支持或知识领域本身的差异。",
    englishDistinction:
      "Not every error is deficient assimilation, and the model must not erase teaching, language, social support, or differences among domains of knowledge.",
    question: "面对这条反例，你是在重新解释它，还是也允许它重新塑造你的框架？",
    englishQuestion:
      "Faced with this counterexample, are you only reinterpreting it, or allowing it to reshape your framework?",
    sourceLocator: [
      "皮亚杰《智力心理学》第一章，论适应、同化与顺应",
      "Piaget, The Psychology of Intelligence, Chapter 1, on adaptation, assimilation, and accommodation",
    ],
  },
  {
    id: "psychology-social-piaget-object-permanence",
    authorId: "piaget",
    topic: "发展",
    text: "物体即使暂时离开视野仍持续存在，这一理解不是一次获得的事实，而是在寻找与行动中逐渐稳定。",
    english:
      "The understanding that an object continues to exist out of sight is not acquired all at once; it stabilizes gradually through searching and action.",
    work: "《儿童现实概念的建构》",
    englishWork: "The Construction of Reality in the Child",
    reflection:
      "看不见并不天然等于仍然存在。婴儿反复经历遮挡、寻找和再出现，才逐步协调视觉、动作与空间中的对象。",
    englishReflection:
      "Out of sight does not innately equal still existing. Through repeated hiding, searching, and reappearance, infants increasingly coordinate vision, action, and objects in space.",
    context:
      "皮亚杰依据对自己子女的遮挡和寻找观察，提出物体概念的阶段性发展；后来注视时间研究显示婴儿可能比主动搜索更早表现某些期待。",
    englishContext:
      "Piaget proposed stages of the object concept from hiding-and-search observations of his own children. Later looking-time work suggests some expectations may appear before active search.",
    distinction:
      "不搜索不必然表示没有表征：动作能力、注意、记忆与任务要求都会影响表现。单一任务不能决定儿童的整体认知水平。",
    englishDistinction:
      "Failure to search does not necessarily mean absence of representation; motor ability, attention, memory, and task demands all affect performance. One task cannot define a child's overall cognition.",
    question: "你是否把‘没有表现出来’过快地等同于‘并不知道’？",
    englishQuestion:
      "Have you too quickly equated not showing something with not knowing it?",
    sourceLocator: [
      "皮亚杰《儿童现实概念的建构》第一章，物体概念的六个阶段",
      "Piaget, The Construction of Reality in the Child, Chapter 1, six stages in the development of the object concept",
    ],
  },
  {
    id: "psychology-social-piaget-moral-cooperation",
    authorId: "piaget",
    topic: "发展",
    text: "儿童对规则的理解可能从把规则当作成人不可更改的命令，逐步转向把它看作同伴可以协商并共同遵守的约定。",
    english:
      "Children's understanding of rules may move from treating them as unchangeable adult commands toward seeing them as agreements peers can negotiate and follow together.",
    work: "《儿童的道德判断》",
    englishWork: "The Moral Judgment of the Child",
    reflection:
      "道德学习不只靠服从，也发生在平等合作中。轮流、争议与修订规则让儿童体验正当性如何来自互惠，而非只来自权威。",
    englishReflection:
      "Moral learning involves more than obedience; it also occurs through cooperation among equals. Turn-taking, disagreement, and rule revision let children experience legitimacy as reciprocal rather than merely authoritative.",
    context:
      "皮亚杰访谈日内瓦男孩并观察弹珠游戏规则，以异律与自主描述部分道德发展；研究集中于特定游戏、性别与欧洲环境。",
    englishContext:
      "Piaget interviewed Geneva boys and observed marble-game rules, using heteronomy and autonomy to describe aspects of moral development. The work centered on one game, one gender, and a European setting.",
    distinction:
      "这不是所有儿童必经的单一路线，也不能把尊重传统等同于不成熟。照料、宗教、法律、共同体责任与权力差异会形成不同道德语言。",
    englishDistinction:
      "This is not a single path every child must follow, and respect for tradition is not immaturity. Care, religion, law, communal responsibility, and power differences shape other moral languages.",
    question: "这条规则的正当性来自权威说了算，还是来自参与者可以共同说明与修订？",
    englishQuestion:
      "Does this rule derive legitimacy from authority alone, or can participants explain and revise it together?",
    sourceLocator: [
      "皮亚杰《儿童的道德判断》第一部分第一至二章，弹珠规则及对规则的意识",
      "Piaget, The Moral Judgment of the Child, Part I, Chapters 1–2, marble rules and consciousness of rules",
    ],
  },
  {
    id: "psychology-social-piaget-conservation-decentration",
    authorId: "piaget",
    topic: "发展",
    text: "守恒判断要求不被最醒目的一个维度牵走，而能同时协调高度、宽度、变换与可逆关系。",
    english:
      "Conservation judgments require moving beyond the most salient dimension to coordinate height, width, transformation, and reversibility together.",
    work: "《儿童的数概念》",
    englishWork: "The Child's Conception of Number",
    reflection:
      "发展并非只是知道更多答案，也包括把注意从单一表象中移开，让多个关系进入同一判断。错误可能揭示正在使用的结构。",
    englishReflection:
      "Development is not only knowing more answers; it includes moving attention beyond one appearance so multiple relations can enter a judgment. An error can reveal the structure being used.",
    context:
      "皮亚杰与塞米斯卡用液体、数量和排列任务研究守恒。经典访谈多来自瑞士儿童，任务语言、学校经验和提问方式会影响年龄差异。",
    englishContext:
      "Piaget and Szeminska studied conservation through liquid, number, and arrangement tasks. Classic interviews largely involved Swiss children, and wording, schooling, and questioning affect age differences.",
    distinction:
      "阶段不是精确到生日的普遍时钟，也不能用一次守恒失败定义智力。熟悉材料、文化实践与执行功能都会改变表现。",
    englishDistinction:
      "A stage is not a universal clock tied to birthdays, and one conservation failure does not define intelligence. Familiar materials, cultural practice, and executive demands can change performance.",
    question: "你是否正被一个最醒目的特征占据，而漏掉了与它同时变化的维度？",
    englishQuestion:
      "Are you captured by the most salient feature while missing another dimension changing with it?",
    sourceLocator: [
      "皮亚杰与塞米斯卡《儿童的数概念》第二部分，数量守恒与可逆性研究",
      "Piaget & Szeminska, The Child's Conception of Number, Part II, studies of conservation and reversibility",
    ],
  },
  {
    id: "psychology-social-vygotsky-social-origin",
    authorId: "vygotsky",
    topic: "学习",
    text: "许多高级心理功能先出现在人与人的协作中，随后才被学习者重新组织为可以独立使用的方式。",
    english:
      "Many higher psychological functions first appear in collaboration between people and are later reorganized into forms the learner can use independently.",
    work: "《心智在社会中》",
    englishWork: "Mind in Society",
    reflection:
      "独立能力常有一段共同完成的历史。提示、示范、对话与共享工具并非学习之外的辅助，而可能成为思考方式的一部分。",
    englishReflection:
      "Independent ability often has a history of joint performance. Prompts, demonstrations, dialogue, and shared tools are not merely outside aids; they can become part of how thinking is organized.",
    context:
      "维果茨基在1920至1930年代苏联提出文化历史取向；《心智在社会中》是其身后由英文编辑者选编的文本，而非作者亲定的单一著作。",
    englishContext:
      "Vygotsky developed the cultural-historical approach in the Soviet Union of the 1920s and 1930s. Mind in Society is a posthumous English editorial compilation, not a single book finalized by him.",
    distinction:
      "社会起源不表示学习者只是复制成人，也不表示任何合作都有效。学习者会改造所学，权力、语言可及性和参与位置也影响内化。",
    englishDistinction:
      "Social origin does not make learners passive copies of adults, nor is every collaboration effective. Learners transform what they appropriate, while power, language access, and participation matter.",
    question: "你以为完全属于自己的哪种能力，其实曾由谁与你共同完成？",
    englishQuestion:
      "Which ability you consider entirely your own was once performed jointly with someone else?",
    sourceLocator: [
      "维果茨基《心智在社会中》第四章，心理功能的社会发生与内化",
      "Vygotsky, Mind in Society, Chapter 4, on the social genesis and internalization of psychological functions",
    ],
  },
  {
    id: "psychology-social-vygotsky-zpd",
    authorId: "vygotsky",
    topic: "发展",
    text: "学习潜力不只由独立完成的任务显示，也可从学习者在适当协助下能完成什么来判断。",
    english:
      "Learning potential is shown not only by what a learner can do alone, but also by what becomes possible with appropriate assistance.",
    work: "《心智在社会中》",
    englishWork: "Mind in Society",
    reflection:
      "当前独立水平像一张已经完成的照片，协助下的表现则提示正在形成的能力。教学可以面向正在成熟的过程，而非只重复已会内容。",
    englishReflection:
      "Current independent performance resembles a completed photograph; assisted performance points toward abilities in formation. Teaching can address developing processes rather than repeat what is already mastered.",
    context:
      "最近发展区由独立解决问题与在成人指导或更有能力同伴合作下的表现之差来界定，原本用于批评只测既成发展的评估。",
    englishContext:
      "The zone of proximal development was defined through the distance between independent problem solving and performance with adult guidance or more capable peers, critiquing assessments limited to completed development.",
    distinction:
      "它不是一个固定分数，也不等于无限提示。协助须随任务、关系、语言与文化工具调整，并逐步检验学习者能否接管活动。",
    englishDistinction:
      "It is not a fixed score or unlimited prompting. Assistance must fit the task, relationship, language, and cultural tools, while testing whether the learner gradually takes over the activity.",
    question: "哪一种刚刚够用的帮助，能让学习者完成下一步而不是替他完成？",
    englishQuestion:
      "What just-enough help would enable the learner's next step without doing it for them?",
    sourceLocator: [
      "维果茨基《心智在社会中》第六章，学习与发展的相互作用及最近发展区",
      "Vygotsky, Mind in Society, Chapter 6, interaction between learning and development and the zone of proximal development",
    ],
  },
  {
    id: "psychology-social-vygotsky-private-speech",
    authorId: "vygotsky",
    topic: "自我",
    text: "儿童对自己说话并非单纯的无意义独白；外在语言可以逐步转化为计划、提醒与调节行动的内部语言。",
    english:
      "Children's speech to themselves is not merely meaningless monologue; overt language can gradually become inner speech used to plan, remind, and regulate action.",
    work: "《思维与语言》",
    englishWork: "Thinking and Speech",
    reflection:
      "一句从别人那里听来的提示，可能先被大声重复，后来压缩成心中的操作线索。自我调节带着社会语言留下的痕迹。",
    englishReflection:
      "A prompt first heard from another person may be repeated aloud and later condensed into an inner cue for action. Self-regulation carries traces of social language.",
    context:
      "维果茨基以儿童在困难任务中的自言自语反驳其必然衰退的解释，并论述言语从社会交流到内部调节的功能转化。",
    englishContext:
      "Vygotsky used children's self-directed speech during difficult tasks to challenge the view that it simply fades away, proposing a functional transformation from social communication to inner regulation.",
    distinction:
      "自言自语在年龄、任务、语言与神经多样性之间表现不同，不能据此判断成熟或异常；‘内化’也不是外在语言的逐字复制。",
    englishDistinction:
      "Self-directed speech varies across age, task, language, and neurodiversity and should not by itself mark maturity or abnormality. Internalization is not a word-for-word copy of outer speech.",
    question: "你解决困难时，心里的哪句话曾经来自另一个人的声音？",
    englishQuestion:
      "When you solve a difficult problem, which inner phrase once came from someone else's voice?",
    sourceLocator: [
      "维果茨基《思维与语言》第七章，外部言语、自我言语与内部言语的关系",
      "Vygotsky, Thinking and Speech, Chapter 7, relations among external, egocentric, and inner speech",
    ],
  },
  {
    id: "psychology-social-vygotsky-tools-signs",
    authorId: "vygotsky",
    topic: "学习",
    text: "人借助语言、记号、图表和计数系统来重新组织注意与记忆；文化工具不仅传递内容，也改变完成任务的方式。",
    english:
      "People use language, signs, diagrams, and counting systems to reorganize attention and memory; cultural tools convey content and also change how tasks are performed.",
    work: "《心智在社会中》",
    englishWork: "Mind in Society",
    reflection:
      "写下一项待办并非把同一记忆搬到纸上，它重分配了记忆负担，也使检查、排序和协作成为可能。工具参与构成思考。",
    englishReflection:
      "Writing down a task is not merely moving the same memory onto paper. It redistributes memory demands and enables checking, ordering, and collaboration. Tools participate in thinking.",
    context:
      "文化历史理论区分物质工具与心理符号的作用，又强调它们都在人类活动与历史实践中形成；相关英文版本经历了选编和翻译。",
    englishContext:
      "Cultural-historical theory distinguished material tools from psychological signs while locating both in historically formed human activity. English versions of these texts have been selectively edited and translated.",
    distinction:
      "工具不自动带来同样效果。识字机会、残障可及性、技术所有权和制度规则决定谁能使用工具，以及工具替谁服务。",
    englishDistinction:
      "Tools do not produce identical benefits automatically. Literacy access, disability access, technological ownership, and institutional rules shape who can use them and whose purposes they serve.",
    question: "这个工具只是让你更快，还是正在改变你理解问题的方式？",
    englishQuestion:
      "Is this tool merely making you faster, or changing how you understand the problem?",
    sourceLocator: [
      "维果茨基《心智在社会中》第一章与第四章，工具、符号与中介活动",
      "Vygotsky, Mind in Society, Chapters 1 and 4, tools, signs, and mediated activity",
    ],
  },
  {
    id: "psychology-social-vygotsky-play",
    authorId: "vygotsky",
    topic: "发展",
    text: "在想象性游戏中，儿童不仅追随即时冲动，也按共同设定的角色与规则行动，从而练习超出日常水平的自我调节。",
    english:
      "In imaginative play, children act not only on immediate impulses but also through shared roles and rules, practicing self-regulation beyond their ordinary level.",
    work: "《游戏及其在儿童心理发展中的作用》",
    englishWork: "Play and Its Role in the Mental Development of the Child",
    reflection:
      "一根木棍成为马时，意义暂时脱离眼前物体；扮演医生又要求遵守角色关系。游戏把想象、规则和情绪控制放进同一活动。",
    englishReflection:
      "When a stick becomes a horse, meaning temporarily separates from the visible object; playing doctor also requires role-consistent relations. Play joins imagination, rules, and emotional regulation in one activity.",
    context:
      "维果茨基在1933年讲演中讨论学前游戏，文本后经转录与翻译流传；其论述针对特定发展阶段，并非所有娱乐活动。",
    englishContext:
      "Vygotsky discussed preschool play in a 1933 lecture later circulated through transcription and translation. His account concerns a specific developmental period, not every form of entertainment.",
    distinction:
      "游戏价值不能成为强迫儿童按成人脚本表演的理由。不同文化的游戏伙伴、空间、劳动参与与玩具条件差异很大。",
    englishDistinction:
      "The value of play does not justify forcing children through adult scripts. Play partners, spaces, participation in work, and access to toys vary widely across cultures.",
    question: "这场游戏让儿童自己建立了什么规则，又练习了哪一种尚未稳定的能力？",
    englishQuestion:
      "What rule did children create in this play, and what not-yet-stable ability did it let them practice?",
    sourceLocator: [
      "维果茨基（1933/1967），《游戏及其在儿童心理发展中的作用》，《苏联心理学》第5卷第3期，6—18页",
      "Vygotsky (1933/1967), Play and Its Role in the Mental Development of the Child, Soviet Psychology 5(3), pp. 6–18",
    ],
  },
  {
    id: "psychology-social-bandura-observational-learning",
    authorId: "bandura",
    topic: "学习",
    text: "由于受试儿童当时不能实施榜样的攻击行为，所发生的任何学习都只能建立在观察或内隐过程之上。",
    english:
      "Since subjects could not perform the model's aggressive behavior, any learning that occurred was purely on an observational or covert basis.",
    editorialSummary:
      "该实验显示，儿童在示范阶段不能实施榜样行为，之后仍会复现若干攻击行为；这把观察获得与亲自试错区分开。",
    englishEditorialSummary:
      "The experiment showed that children later reproduced some modeled aggression even though they could not perform it during exposure, separating observational acquisition from direct trial and error.",
    work: "《通过模仿攻击性榜样传递攻击行为》",
    englishWork: "Transmission of Aggression Through Imitation of Aggressive Models",
    presentationNature: "source-excerpt",
    reflection:
      "在1961年实验中，72名斯坦福托儿所儿童分别观看攻击榜样、非攻击榜样或不看榜样，随后在另一房间接受测试，并在测试前经历诱发挫折。短时对玩偶行为的复现支持观察获得，却不能证明观看暴力必然造成长期现实伤害；本文也没有操纵榜样的奖惩后果，那属于后来的替代强化研究。",
    englishReflection:
      "In the 1961 experiment, 72 children from a Stanford nursery observed an aggressive model, a nonaggressive model, or no model, then were tested in another room after an aggression-arousal procedure. Short-term reproduction of behavior toward a doll supports observational acquisition but does not show that viewing violence inevitably causes lasting real-world harm; this study also did not manipulate consequences delivered to the model, which belongs to later vicarious-reinforcement research.",
    context:
      "1961年的波波玩偶研究让斯坦福托儿所儿童观看成人攻击玩偶，再记录其后行为；程序以当时标准实施，今天会更严格审查儿童压力与示范伤害。",
    englishContext:
      "The 1961 Bobo-doll study showed children from a Stanford nursery an adult attacking a doll and later recorded their behavior. Conducted under period standards, it would now face stronger review of child stress and modeled harm.",
    distinction:
      "短时模仿玩偶不能直接证明观看暴力必然造成现实伤害。样本狭窄，真实行为还受家庭、同伴、情境、媒体形式与长期强化影响。",
    englishDistinction:
      "Short-term imitation against a doll does not prove that viewing violence inevitably causes real-world harm. The sample was narrow, and behavior also depends on family, peers, context, media form, and long-term reinforcement.",
    question: "你正在示范的行为，比你口头要求别人做的更有力量吗？",
    englishQuestion:
      "Is the behavior you model more powerful than what you verbally ask others to do?",
    sourceLocator: [
      "班杜拉、罗斯与罗斯〈通过模仿攻击性榜样传递攻击行为〉，《异常与社会心理学杂志》63卷3期（1961年11月），原印刷页577，‘实验条件’中示范阶段末尾，完整连续句；`covert` 是作者当时的理论措辞，本文未操纵榜样后果；仅确认美国公版",
      "Bandura, Ross & Ross, “Transmission of Aggression Through Imitation of Aggressive Models,” Journal of Abnormal and Social Psychology 63(3) (Nov. 1961), original print p. 577, complete continuous sentence at the end of the exposure phase under “Experimental Conditions”; `covert` is the authors' period terminology, and this study did not manipulate consequences delivered to the model; U.S. public-domain status only",
    ],
  },
  {
    id: "psychology-social-bandura-vicarious-reinforcement",
    authorId: "bandura",
    topic: "学习",
    text: "本实验的结果支持模仿学习的邻接理论；施加于榜样的强化影响了观察者的表现，却没有影响匹配反应的获得。",
    english:
      "The results of the present experiment lend support to a contiguity theory of imitative learning; reinforcements administered to the model influenced the observers’ performance but not the acquisition of matching responses.",
    editorialSummary:
      "看到榜样被奖励或惩罚，会改变观察者是否立即表现已学到的行为；学会与做出来并不是同一件事。",
    englishEditorialSummary:
      "Seeing a model rewarded or punished changes whether an observer immediately performs a learned behavior; acquiring a response and displaying it are not the same thing.",
    work: "《榜样强化条件对模仿反应获得的影响》",
    englishWork: "Influence of Models' Reinforcement Contingencies on the Acquisition of Imitative Responses",
    presentationNature: "source-excerpt",
    reflection:
      "作者谨慎地说结果“支持”一种解释，而不是证明强化永远不参与学习。实验中，榜样奖惩造成的初次表现差异，在后来为复现行为提供积极奖励时消失；这支持区分获得与表现。没有表现不一定没有学习，但单次儿童实验也不能把这种区分推广成所有情境的固定法则。",
    englishReflection:
      "The authors cautiously say that the results “lend support” to an interpretation, not that reinforcement can never participate in learning. In the experiment, initial performance differences produced by consequences to the model disappeared when children were later rewarded for reproducing the behavior, supporting a distinction between acquisition and performance. A response not displayed may still have been learned, but one child experiment does not make that distinction a fixed rule in every setting.",
    context:
      "班杜拉1965年的实验比较儿童观看榜样受奖、受罚或无后果后的模仿，并用后续奖励测试已获得的行为。",
    englishContext:
      "Bandura's 1965 experiment compared children's imitation after seeing a model rewarded, punished, or receive no consequence, then used later incentives to test acquired responses.",
    distinction:
      "替代强化不是远程操控公式。儿童知道自己在实验中，任务新奇且样本有限；规范、关系与对后果的理解都会改变观察学习。",
    englishDistinction:
      "Vicarious reinforcement is not a remote-control formula. Children knew they were in an experiment, the task was novel, and the sample was limited; norms, relationships, and interpretations of consequences all matter.",
    question: "眼前没有出现某个行为，是因为没有学会，还是因为此刻不值得做出来？",
    englishQuestion:
      "Is a behavior absent because it was not learned, or because it does not seem worth displaying now?",
    sourceLocator: [
      "班杜拉〈榜样强化条件对模仿反应获得的影响〉，《人格与社会心理学杂志》1卷6期（1965年6月），讨论开篇，原印刷页593，完整连续句；本句是作者对该实验的理论解释，不表示强化在任何观察学习中都与获得无关；按署名、定位、最小必要短引用于评论",
      "Bandura, “Influence of Models' Reinforcement Contingencies on the Acquisition of Imitative Responses,” Journal of Personality and Social Psychology 1(6) (June 1965), opening of the Discussion, original print p. 593, complete continuous sentence; this is the author's theoretical interpretation of the experiment, not a claim that reinforcement is irrelevant to acquisition in every instance of observational learning; used as an attributed, located, minimally necessary quotation for commentary",
    ],
  },
  {
    id: "psychology-social-bandura-self-efficacy",
    authorId: "bandura",
    topic: "动机",
    text: "本文假设，个人效能预期决定应对行为是否会开始以及会投入多少努力……",
    english:
      "It is hypothesized that expectations of personal efficacy determine whether coping behavior will be initiated, how much effort will be expended …",
    editorialSummary:
      "人是否相信自己能组织并执行某项行动，会影响他是否开始、投入多少努力，以及遇到困难后坚持多久。",
    englishEditorialSummary:
      "Beliefs about one's capability to organize and carry out a specific action affect whether one begins, how much effort one invests, and how long one persists through difficulty.",
    work: "《自我效能：行为改变的一种统一理论》",
    englishWork: "Self-Efficacy: Toward a Unifying Theory of Behavioral Change",
    presentationNature: "source-excerpt",
    reflection:
      "原文明确把这一路径写成理论假设，并限于应对行为及面对障碍与厌恶性经验的坚持，不能单凭此句当作适用于一切行动的既定因果律。能力判断会参与行动，但最有效的信心通常来自逐步掌握的经验，而不是空泛鼓励。把任务拆成可验证进展，可能同时改变技能与期待。",
    englishReflection:
      "The article explicitly frames this pathway as a hypothesis about coping behavior and persistence through obstacles and aversive experiences, not as a settled causal law for every action. Capability judgments participate in action, but the strongest confidence often comes from gradual mastery rather than generic encouragement. Breaking a task into verifiable progress can change both skill and expectation.",
    context:
      "班杜拉最初通过恐惧与治疗研究整合效能预期，提出亲历掌握、替代经验、言语说服与生理状态等来源。",
    englishContext:
      "Bandura first integrated efficacy expectations through research on fear and treatment, identifying sources such as mastery experience, vicarious experience, verbal persuasion, and physiological states.",
    distinction:
      "自我效能针对具体任务与情境，不是固定自尊，也不能把结构障碍归咎于个人信念不足。资源、歧视、健康和真实技能仍然限制行动。",
    englishDistinction:
      "Self-efficacy is task- and context-specific, not fixed self-esteem, and structural barriers must not be blamed on weak belief. Resources, discrimination, health, and actual skill still constrain action.",
    question: "你缺的是更多鼓励，还是一次足以证明自己能完成下一步的掌握经验？",
    englishQuestion:
      "Do you need more encouragement, or a mastery experience that proves you can complete the next step?",
    sourceLocator: [
      "班杜拉〈自我效能：行为改变的一种统一理论〉，《心理学评论》84卷2期（1977年3月），摘要，原印刷页191，原句开头的21词连续短段（主字段止于句中，无内部删节）；原句明确说“本文假设”，并在随后谈到面对障碍与厌恶性经验时的坚持，不是适用于一切行动的既定因果律；按署名、定位、最小必要短引用于评论",
      "Bandura, “Self-Efficacy: Toward a Unifying Theory of Behavioral Change,” Psychological Review 84(2) (Mar. 1977), abstract, original print p. 191, a continuous 21-word excerpt from the start of the sentence (the source field ends mid-sentence, with no internal omission); the sentence explicitly says “It is hypothesized” and goes on to discuss persistence amid obstacles and aversive experiences, not a settled causal law for every action; used as an attributed, located, minimally necessary quotation for commentary",
    ],
  },
  {
    id: "psychology-social-bandura-reciprocal-determinism",
    authorId: "bandura",
    topic: "行为",
    text: "行为、个人因素与环境彼此影响；人既受情境塑造，也会通过选择和行动改变随后遇到的情境。",
    english:
      "Behavior, personal factors, and environment influence one another; people are shaped by situations and also alter the situations they later encounter through choice and action.",
    work: "《思想与行动的社会基础》",
    englishWork: "Social Foundations of Thought and Action",
    reflection:
      "一次行为会改变他人的回应，回应又改变期待，期待再影响下一次选择。寻找循环中的可动节点，比争论到底是人还是环境决定一切更有用。",
    englishReflection:
      "One action changes others' responses; those responses alter expectations, which shape the next choice. Finding a movable point in the loop is more useful than asking whether person or environment determines everything.",
    context:
      "班杜拉用三元交互因果说明认知、行为与环境的双向作用，并以能动性修正把学习者当作被动反应者的模型。",
    englishContext:
      "Bandura used triadic reciprocal causation to describe bidirectional influence among cognition, behavior, and environment, adding agency to models that treated learners as passive responders.",
    distinction:
      "相互作用不表示三方面力量永远相等，也不意味着受压迫者能单靠选择改变制度。不同时间尺度上的权力与资源必须具体分析。",
    englishDistinction:
      "Reciprocity does not mean all three influences are always equal, nor that oppressed people can change institutions through choice alone. Power and resources across timescales require concrete analysis.",
    question: "在这段循环里，你最有可能先改变的是行动、解释，还是环境安排？",
    englishQuestion:
      "Within this loop, what can you most plausibly change first: an action, an interpretation, or an environmental arrangement?",
    sourceLocator: [
      "班杜拉《思想与行动的社会基础》第一章，三元交互因果模型",
      "Bandura, Social Foundations of Thought and Action, Chapter 1, triadic reciprocal causation",
    ],
  },
  {
    id: "psychology-social-bandura-moral-disengagement",
    authorId: "bandura",
    topic: "行为",
    text: "把道德自我制裁与非人道行为分离，在个人和集体层面都是一个日益严重的人类问题。",
    english:
      "The disengagement of moral self-sanctions from inhumane conduct is a growing human problem at both individual and collective levels.",
    editorialSummary:
      "人可能通过美化目的、淡化责任、缩小伤害或贬低受害者，暂时把有害行为与自己的道德标准分离。",
    englishEditorialSummary:
      "People may temporarily separate harmful conduct from their moral standards by sanitizing its purpose, diffusing responsibility, minimizing harm, or devaluing victims.",
    work: "《实施非人道行为中的道德脱离》",
    englishWork: "Moral Disengagement in the Perpetration of Inhumanities",
    presentationNature: "source-excerpt",
    reflection:
      "引句把问题明确放在个人与集体两个层面。全文随后按行为、责任主体、伤害后果与受害者等作用点，分析道德辩护、婉饰语言、责任转移或扩散、缩小后果、非人化与责怪受害者。道德标准未必消失；问题是自我制裁何时被选择性关闭，以及组织怎样分割功能与责任。",
    englishReflection:
      "The excerpt explicitly places the problem at both individual and collective levels. The article then analyzes loci involving conduct, agency, consequences, and victims through moral justification, euphemistic language, displacement or diffusion of responsibility, minimization of harm, dehumanization, and victim blame. Moral standards need not disappear; the question is when self-sanctions are selectively disabled and how organizations divide functions and responsibility.",
    context:
      "该句是 1999 年论文正文的开篇首句。摘要已先把道德能动性放入社会认知自我理论，并概述多类使道德自我制裁与非人道行为分离的心理社会手段；正文由此转入个人与组织层面的展开分析。",
    englishContext:
      "This is the opening sentence of the 1999 article's main text. The abstract has already placed moral agency within a social-cognitive self theory and summarized psychosocial maneuvers that disconnect moral self-sanctions from inhumane conduct. The body then develops the analysis across individual and organizational levels.",
    distinction:
      "道德脱离是一组可分析的自我调节与社会机制，不是对某人一次行为即可定型的临床标签。解释机制不等于免除责任；引句反而要求同时查看执行者、下令者、合法组织网络、制度激励与被分散的后果。",
    englishDistinction:
      "Moral disengagement is a set of analyzable self-regulatory and social mechanisms, not a clinical label assigned from one act. Explaining a mechanism does not excuse responsibility. The excerpt instead calls for examining direct actors, commanders, legitimate organizational networks, institutional incentives, and dispersed consequences together.",
    question: "这项行动被换成什么说法后，真实承受后果的人就从视野里消失了？",
    englishQuestion:
      "What new label for this action makes the people bearing its consequences disappear from view?",
    sourceLocator: [
      "班杜拉〈实施非人道行为中的道德脱离〉，《人格与社会心理学评论》3卷3期（1999 年），正文开篇首句，原印刷页 193（PDF 第 1 页），完整连续句，英文 19 词；据原刊排版 PDF 逐字核验，按署名、定位、最小必要短引用于评论",
      "Bandura, “Moral Disengagement in the Perpetration of Inhumanities,” Personality and Social Psychology Review 3(3) (1999), opening sentence of the main text, original print p. 193 (PDF p. 1), one complete continuous sentence, 19 English words; checked word for word against the journal-layout PDF; used as an attributed, located, minimally necessary quotation for commentary",
    ],
  },
] satisfies readonly SocialPsychologySeed[];
