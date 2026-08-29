import type { Thought } from "./philosophy";
import type { ContentLibraryId } from "./libraries";
import type { SourceMetadata } from "./sourceMetadata";
import type { InterpretationDetail } from "./interpretationTypes";

export type ResolvedInterpretation = {
  context: string;
  englishContext: string;
  distinction: string;
  englishDistinction: string;
};

type TopicLens = {
  context: string;
  englishContext: string;
  distinction: string;
  englishDistinction: string;
};

const westernTopicLenses: Partial<Record<Thought["topic"], TopicLens>> = {
  存在: {
    context: "它讨论的不是一时的心境，而是人、世界与经验得以呈现的基本结构。阅读时要分清：作者是在描述经验、追问存在条件，还是提出一种生活选择。",
    englishContext: "The issue is not a passing mood but the basic structure through which self, world, and experience become intelligible. Ask whether the author is describing experience, examining the conditions of being, or proposing a way to live.",
    distinction: "不要把存在论命题直接缩成“做真实的自己”。个人感受可以是入口，却不能代替概念定义、论证步骤与作者所回应的哲学问题。",
    englishDistinction: "Do not reduce an ontological claim to the advice to “be yourself.” Personal feeling can be an entry point, but it cannot replace the concepts, argumentative steps, and philosophical problem at stake.",
  },
  伦理: {
    context: "伦理论证通常在行动、动机、品格、后果与制度之间分配不同权重。理解这则命题，要先看作者把“好”建立在哪一种理由上。",
    englishContext: "Ethical arguments assign different weight to action, motive, character, consequence, and institution. To understand this claim, first ask what kind of reason grounds the author's account of the good.",
    distinction: "它不是脱离条件即可套用的处世格言。个体选择、人与人的关系以及制度责任可能需要分别判断，也可能彼此冲突。",
    englishDistinction: "This is not a maxim that can be applied without conditions. Individual choice, interpersonal obligation, and institutional responsibility may require distinct judgments and may conflict.",
  },
  知识: {
    context: "这里追问的是信念凭什么成立：经验、理性、语言、实践或共同检验，各自能提供怎样的根据，又有哪些限度。",
    englishContext: "The question is what can justify a belief: experience, reason, language, practice, or shared inquiry, and what limits each source of justification has.",
    distinction: "追问知识的边界，不等于断言“一切都只是观点”。要区分怀疑、可错性与相对主义，也要区分拥有证据和拥有绝对确定性。",
    englishDistinction: "Questioning the limits of knowledge does not mean that everything is merely opinion. Distinguish skepticism, fallibilism, and relativism, as well as evidence from absolute certainty.",
  },
  政治: {
    context: "政治哲学把权力、合法性、自由、平等与共同生活放进制度关系中讨论。命题的对象往往不是孤立个人，而是规则如何塑造行动空间。",
    englishContext: "Political philosophy considers power, legitimacy, freedom, equality, and common life through institutional relations. Its object is often not an isolated person but the way rules shape the space of action.",
    distinction: "思想史中的政治诊断不是可以原样移植的政策答案。需要继续检查它预设了谁是政治主体、排除了谁，以及历史条件改变后哪些论证仍成立。",
    englishDistinction: "A diagnosis from political thought is not a policy answer ready for direct transplantation. Examine whom it treats as a political subject, whom it excludes, and which reasons survive changed historical conditions.",
  },
  语言: {
    context: "这里的语言并非只指词典意义，而涉及词语如何在判断、推理和共同实践中获得作用。概念的意义要结合它在论证中的位置来看。",
    englishContext: "Language here is more than dictionary meaning; it concerns how words function in judgment, inference, and shared practice. A concept must be read through the role it plays in the argument.",
    distinction: "指出语言参与建构意义，不等于否认事实或任意改写现实。要区分表达方式的变化、概念规则的变化与对象本身的变化。",
    englishDistinction: "To say that language participates in the formation of meaning is not to deny facts or make reality arbitrary. Distinguish changes in expression, changes in conceptual rules, and changes in the object itself.",
  },
};

const chineseTopicLenses: Partial<Record<Thought["topic"], TopicLens>> = {
  天道: {
    context: "这类文字借“天、道、理、气”等概念说明世界秩序与人的位置；这些词在不同时代和作者那里并不等义，须结合篇章与注疏传统辨读。",
    englishContext: "Such passages use concepts including Heaven, dao, pattern, and vital energy to articulate cosmic order and the human place within it. These terms shift across authors and periods and must be read with their textual and commentarial settings.",
    distinction: "不要把不同传统压成一个笼统的“东方世界观”，也不要把古典概念直接等同于现代自然科学术语。相似字面背后可能有不同的问题结构。",
    englishDistinction: "Do not compress distinct traditions into a single “Eastern worldview,” or equate classical concepts with terms from modern natural science. Similar wording can conceal very different structures of inquiry.",
  },
  修身: {
    context: "修身不是孤立的内心训练，而常把注意、欲望、行动、角色关系与礼法秩序连在一起。个人变化与共同生活在这里彼此牵动。",
    englishContext: "Self-cultivation is not an isolated inward exercise. It often connects attention, desire, action, social roles, and ritual order, making personal transformation inseparable from life with others.",
    distinction: "不要把修身改写成效率技巧或自我优化清单。它追问的还包括欲望如何被塑造、判断如何养成，以及个人德性与制度环境怎样互相支持或抵牾。",
    englishDistinction: "Do not rewrite self-cultivation as a productivity technique or optimization checklist. It also asks how desire is shaped, judgment is formed, and character interacts with institutional conditions.",
  },
  人性: {
    context: "古典人性论往往在讨论人的开端、倾向、可能性及其养成条件，而不只是给所有人下一个固定的经验分类。",
    englishContext: "Classical accounts of human nature often concern beginnings, tendencies, capacities, and the conditions of cultivation rather than a fixed empirical classification of every person.",
    distinction: "“性善”“性恶”等命题不能只按现代心理统计来读。要区分先天倾向、可发展能力、实际行为与礼法教育所起的作用。",
    englishDistinction: "Claims that human nature is good or bad should not be read only as modern psychological statistics. Distinguish initial tendencies, developable capacities, actual conduct, and the role of education and ritual.",
  },
  认识: {
    context: "“知、行、格物、致知”等词把认识与实践、修养和判断目的连在一起，并不完全对应现代学科中的单一认识论术语。",
    englishContext: "Terms such as knowing, acting, investigating things, and extending knowledge connect understanding with practice, cultivation, and the ends of judgment. They do not map neatly onto a single modern epistemological vocabulary.",
    distinction: "不要把“知行合一”之类的表达简化成“想到就去做”。需要继续问：知道的对象是什么，何种实践检验它，行动又怎样反过来改造理解。",
    englishDistinction: "Do not reduce the unity of knowing and acting to “act on every thought.” Ask what is known, what practice tests it, and how action in turn transforms understanding.",
  },
  名实: {
    context: "名实之辨关心名称、分类与现实职责怎样相互约束。它既涉及语言推理，也涉及判断、秩序与制度如何借名称运作。",
    englishContext: "The relation between names and realities concerns how naming, classification, and actual roles constrain one another. It bears on reasoning as well as on the operation of judgment, order, and institutions.",
    distinction: "这不只是文字游戏，也不是“改个名字就改变事实”。应分别考察名称的逻辑规则、社会使用与它所指向的实际责任。",
    englishDistinction: "This is neither mere wordplay nor the idea that renaming something changes the facts. Examine separately the logical rule of a name, its social use, and the actual responsibility it identifies.",
  },
  伦理: {
    context: "古典伦理常从具体关系、角色和礼仪实践展开，而不是先设定一个抽象个人再列出普遍规则。语句的对象与场景因此很重要。",
    englishContext: "Classical ethics often begins from concrete relations, roles, and ritual practices rather than an abstract individual followed by universal rules. The addressee and situation therefore matter.",
    distinction: "不要把一句话摘成适用于所有关系的无条件训诫。角色义务可能彼此冲突，礼的形式与仁义的目的也需要相互检验。",
    englishDistinction: "Do not detach one sentence as an unconditional instruction for every relationship. Role-based duties can conflict, and ritual form must be tested against ethical purpose.",
  },
  政治: {
    context: "这些论述面对的是特定时代的统治秩序、民生与权力约束问题。它们既包含制度判断，也常与修身、教化和历史观相连。",
    englishContext: "These arguments address historically specific questions of rule, livelihood, and constraints on power. Institutional judgment is often connected with cultivation, education, and an account of history.",
    distinction: "古代治理论述不能直接充当现代制度方案。要区分它对权力问题的洞见，与君臣、身份和社会结构等历史前提。",
    englishDistinction: "Premodern arguments about government cannot serve directly as modern institutional designs. Separate their insight into power from historical assumptions about rulers, status, and social structure.",
  },
  兵道: {
    context: "兵家文字讨论的是在不确定、资源受限和对手反应之中如何判断形势。策略必须依赖条件、时机与代价，而非孤立技巧。",
    englishContext: "Strategic texts ask how to judge a situation under uncertainty, limited resources, and an adaptive opponent. Strategy depends on conditions, timing, and cost rather than isolated techniques.",
    distinction: "不要把战争语境中的判断原则无限推广成人际操控术或成功学。战略有效性与伦理正当性是两个需要分别回答的问题。",
    englishDistinction: "Do not generalize principles from warfare into techniques of interpersonal manipulation or formulas for success. Strategic effectiveness and ethical justification are separate questions.",
  },
};

const maoTopicLenses: Partial<Record<Thought["topic"], TopicLens>> = {
  实践: {
    context: "这里的实践既是改造现实的活动，也是认识接受检验并继续发展的环节；理论、调查、行动和反馈构成反复推进的过程。",
    englishContext: "Practice is both activity that changes reality and the process through which knowledge is tested and developed. Theory, investigation, action, and feedback form an iterative movement.",
    distinction: "它不是反理论的“先干再说”。缺少调查的行动可能只是盲动，而一次成功经验也不能自动升级为不受条件限制的普遍规律。",
    englishDistinction: "This is not an anti-theoretical call to act first and think later. Action without investigation can be blind, and one successful experience does not become a condition-free universal law.",
  },
  矛盾: {
    context: "矛盾在这里是一种分析具体过程的方法：要辨认关系的性质、发展阶段、主要问题及其方面怎样随条件变化。",
    englishContext: "Contradiction functions here as a method for analyzing concrete processes: identify the nature of a relation, its stage of development, its principal problem, and how its aspects change with conditions.",
    distinction: "不能把一切差异都叫作对抗性矛盾，也不能把“抓主要矛盾”理解成永久忽略其他问题。主要与次要本身会随过程改变。",
    englishDistinction: "Not every difference is an antagonistic contradiction, and identifying a principal contradiction does not justify permanently ignoring other problems. What is principal can change as the process changes.",
  },
  群众: {
    context: "群众路线讨论的是领导、调查、组织与分散经验之间的知识关系：材料怎样汇集为判断，判断又怎样回到实践中接受修正。",
    englishContext: "The mass line concerns the epistemic relation among leadership, investigation, organization, and dispersed experience: how experience becomes judgment and how judgment returns to practice for correction.",
    distinction: "它不等于追随即时多数意见，也不意味着任何未经检验的意见都天然正确。参与、组织、综合与责任不能被“受欢迎”替代。",
    englishDistinction: "It is not simple obedience to immediate majority opinion, nor does it make every untested view automatically correct. Participation, organization, synthesis, and responsibility cannot be replaced by popularity.",
  },
  方法: {
    context: "方法论命题通常来自对某类实际工作失误的诊断，重点在调查、组织、节奏与反馈如何配合，而不是提供一条脱离对象的万能程序。",
    englishContext: "Methodological claims usually arise from diagnosing failures in concrete work. They concern how investigation, organization, pacing, and feedback fit together rather than offering a universal procedure detached from its object.",
    distinction: "不要把历史文本中的工作方法直接包装成团队管理捷径。先确认问题结构、参与者、权力关系与可承受代价是否真的相似。",
    englishDistinction: "Do not repackage a method from a historical text as a shortcut for team management. First ask whether the problem, participants, power relations, and acceptable costs are genuinely comparable.",
  },
  文化: {
    context: "文化论述把文艺、教育、传播与社会力量的组织联系起来，讨论作品为谁生产、怎样流通以及谁能进入公共表达。",
    englishContext: "Arguments about culture connect art, education, and communication with the organization of social forces, asking for whom works are produced, how they circulate, and who can enter public expression.",
    distinction: "它不只是审美偏好或传播技巧，也不能只用流量衡量。作品的形式自主性、受众差异与政治功能之间仍有真实张力。",
    englishDistinction: "This is not merely a matter of taste or communication technique, and reach alone cannot measure it. There remains a genuine tension among formal autonomy, differing audiences, and political function.",
  },
  战略: {
    context: "战略判断处理的是力量对比、空间、时间、资源与主动性的动态组合。它只有放在具体战争和政治条件中，才能理解其判断对象。",
    englishContext: "Strategic judgment concerns the changing combination of relative strength, space, time, resources, and initiative. Its object becomes intelligible only within concrete military and political conditions.",
    distinction: "军事战略不是个人成功学。把战争概念移用于日常生活时，必须先去除敌我化想象，并另行审查手段的伦理与现实代价。",
    englishDistinction: "Military strategy is not a formula for personal success. When its concepts are carried into ordinary life, adversarial assumptions must be removed and the ethical and practical costs examined afresh.",
  },
  政治: {
    context: "政治命题回应的是特定历史阶段中的阶级、国家、组织与制度问题。概念的对象会随时期变化，不能只凭相似词语判断含义。",
    englishContext: "Political claims respond to questions of class, state, organization, and institution in a particular historical phase. Their objects change over time, so similar wording alone cannot establish the same meaning.",
    distinction: "这些分类不是跨时代贴标签的工具。阅读时应区分历史诊断、规范目标与具体制度安排，并检验它们在新条件下是否仍有根据。",
    englishDistinction: "These categories are not labels to project unchanged across time. Distinguish historical diagnosis, normative aim, and institutional arrangement, and test whether their grounds survive new conditions.",
  },
};

const scienceTopicLenses: Partial<Record<Thought["topic"], TopicLens>> = {
  方法: {
    context: "科学方法不是一套所有学科都照搬的固定步骤，而是如何把问题化为可检验的判断，再让观察、实验、数学和批评彼此纠错。",
    englishContext: "Scientific method is not one fixed sequence copied by every discipline. It is the work of turning a problem into testable judgments and allowing observation, experiment, mathematics, and criticism to correct one another.",
    distinction: "不要把“科学方法”等同于一张实验流程图。历史科学、观察科学与实验科学拥有不同的证据结构，共通处在于主张需要暴露给检验。",
    englishDistinction: "Do not equate scientific method with a laboratory flowchart. Historical, observational, and experimental sciences have different evidential structures; what they share is the exposure of claims to testing.",
  },
  证据: {
    context: "证据不是一个脱离问题的“事实堆”。什么被测量、怎样排除干扰、结果能否被重复与公开检查，共同决定一项证据能支持多强的结论。",
    englishContext: "Evidence is not a pile of facts detached from a question. What is measured, how interference is controlled, and whether results can be repeated and publicly checked together determine how strongly evidence supports a conclusion.",
    distinction: "数据不会自己说话，但这也不意味着证据只是主观解释。要区分观察结果、测量模型、统计推断与最终的理论主张。",
    englishDistinction: "Data do not speak by themselves, but that does not make evidence merely subjective. Distinguish observations, measurement models, statistical inferences, and the final theoretical claim.",
  },
  模型: {
    context: "模型通过有选择地忽略细节，使某种结构、尺度或因果关系变得可推理。它的价值不在复制整个世界，而在特定问题上做出解释、预测或干预。",
    englishContext: "A model makes a structure, scale, or causal relation tractable by selectively omitting detail. Its value lies not in duplicating the whole world but in explaining, predicting, or guiding intervention for a defined problem.",
    distinction: "模型的简化不是缺陷本身，没有边界说明的简化才危险。不要把模型输出当成现实本身，也不要因为模型不完美就认为它没有知识价值。",
    englishDistinction: "Simplification is not itself a flaw; simplification without stated boundaries is the danger. Do not treat a model's output as reality itself, or dismiss a model because it is imperfect.",
  },
  不确定: {
    context: "科学中的不确定可能来自测量误差、样本有限、模型简化或理论本身的概率结构。把它量化和公开，不是削弱知识，而是说清我们知道到哪一步。",
    englishContext: "Scientific uncertainty can arise from measurement error, limited samples, model simplification, or probabilistic structure in a theory itself. Quantifying and disclosing it does not weaken knowledge; it states how far knowledge reaches.",
    distinction: "“存在不确定”不等于“什么都不知道”，更不等于所有判断同样可信。需要比较不确定的来源、范围以及它对决策结论的实际影响。",
    englishDistinction: "Uncertainty does not mean that nothing is known, still less that every judgment is equally credible. Compare its source, magnitude, and actual effect on the decision at hand.",
  },
  生命: {
    context: "生命科学的解释跨越分子、个体、群体与环境等多个层级。一项机制解释可以很强，却不必然取代进化、发育或生态层面的说明。",
    englishContext: "Explanations in the life sciences move across molecular, organismal, population, and environmental levels. A powerful mechanistic account need not replace evolutionary, developmental, or ecological explanation.",
    distinction: "不要把“自然选择”读成道德命令，也不要用一个基因或一种环境因素包办复杂性状的全部解释。描述自然过程与为人类行动辩护属于不同问题。",
    englishDistinction: "Do not read natural selection as a moral command, or let one gene or environmental factor monopolize the explanation of a complex trait. Describing a natural process and justifying human action are different tasks.",
  },
  宇宙: {
    context: "对宇宙的理解往往把局部观测、数学对称与可计算的动力学联系起来。宏大结论的可信度，仍然来自一条条能被检查的推理与观测链。",
    englishContext: "Accounts of the cosmos connect local observations, mathematical symmetries, and calculable dynamics. The credibility of a sweeping conclusion still rests on inspectable chains of inference and observation.",
    distinction: "数学上可能、理论上允许与经验上已确证不是同一件事。漂亮的理论结构可以指引研究，但不能代替证据。",
    englishDistinction: "Mathematical possibility, theoretical permission, and empirical confirmation are not the same. An elegant structure can guide inquiry but cannot replace evidence.",
  },
  责任: {
    context: "科学与技术的责任不只发生在成果应用之后：选择什么问题、由谁承担风险、如何公布限制，都已经是研究过程的一部分。",
    englishContext: "Responsibility in science and technology does not begin only after a result is applied. Which questions are pursued, who bears the risk, and how limitations are disclosed are already part of research practice.",
    distinction: "不要把“科学是中立的”误解为研究者与制度没有责任，也不要把一切风险都归咎于知识本身。事实判断、价值选择与治理责任需要联系而不混同地讨论。",
    englishDistinction: "Do not interpret the neutrality of science as the absence of responsibility for researchers and institutions, or blame knowledge itself for every risk. Factual judgment, value choice, and governance must be connected without being collapsed.",
  },
};

const indianTopicLenses: Partial<Record<Thought["topic"], TopicLens>> = {
  自我: {
    context: "印度思想中的“自我”不是一个固定答案：奥义书传统追问常住的阿特曼，佛教分析无常的身心诸法，耆那传统则论证多元而持续的灵魂。理解命题前，要先确认它在哪一种论辩中使用“我”。",
    englishContext: "Indian traditions do not offer one fixed account of self. Upanishadic traditions investigate an enduring atman, Buddhist analyses examine impermanent psycho-physical processes, and Jain thinkers defend a plurality of continuing souls. First identify the debate in which the term is being used.",
    distinction: "不要把阿特曼、灵魂、人格与现代心理学中的自我当成同义词，也不要把“无我”误读成经验或责任都不存在。",
    englishDistinction: "Do not treat atman, soul, person, and the modern psychological self as synonyms, or read non-self as the denial of experience and responsibility.",
  },
  认识: {
    context: "这里关注知识凭什么成立。知觉、推论、证言、比较与非认知等知识手段，在不同学派中有不同地位；分歧既关乎证据，也关乎错误怎样可能。",
    englishContext: "The issue is what makes knowledge warranted. Perception, inference, testimony, comparison, and non-cognition receive different status across schools; disagreements concern both evidence and the possibility of error.",
    distinction: "一个学派承认某种知识手段，不代表它接受由此提出的每个结论。必须分清知识来源、有效条件与具体推论。",
    englishDistinction: "A school's acceptance of a means of knowledge does not commit it to every conclusion drawn from that means. Distinguish the source of knowledge, its conditions of validity, and the particular inference.",
  },
  因果: {
    context: "因果问题连接变化、行动与世界构成：结果是否预存于原因、事物是否只在关系中生起、业如何跨时间成熟，各传统给出彼此竞争的模型。",
    englishContext: "Causation links change, action, and the constitution of the world: whether an effect pre-exists in its cause, whether things arise only relationally, and how karma matures across time are answered by competing models.",
    distinction: "业不是宿命论的别名，缘起也不是“一切都相互关联”的泛泛感叹。二者都包含对条件、行动和结果的具体分析。",
    englishDistinction: "Karma is not another name for fatalism, and dependent arising is not the vague thought that everything is connected. Both require specific analyses of conditions, action, and result.",
  },
  解脱: {
    context: "解脱论把哲学理解与生活训练连在一起，但“被解脱的是什么、从什么中解脱、凭什么方法”在瑜伽、佛教、耆那与吠檀多内部都不相同。",
    englishContext: "Accounts of liberation connect philosophical understanding with disciplines of life, yet Yoga, Buddhist, Jain, and Vedanta traditions disagree about what is liberated, from what, and by which means.",
    distinction: "不要把解脱直接翻成放松、逃避现实或单一的神秘体验。它通常依赖一整套关于自我、因果、知识与实践的论证。",
    englishDistinction: "Do not translate liberation into relaxation, escape from reality, or one mystical experience. It normally depends on a whole account of self, causation, knowledge, and practice.",
  },
  伦理: {
    context: "伦理讨论常围绕达摩、不伤害、欲望、义务与品格展开。达摩既可指规范秩序，也可指具体角色的责任，其含义会随文本、阶层与宗教传统变化。",
    englishContext: "Ethical discussions often turn on dharma, non-violence, desire, duty, and character. Dharma can name normative order or a role-specific obligation, and its meaning changes across texts, social positions, and religious traditions.",
    distinction: "不要把古典角色义务无条件移植到今天，也不要因其历史局限而忽略文本内部关于伤害、平等与责任的争论。",
    englishDistinction: "Do not transplant classical role duties into the present without conditions, but do not let their historical limits erase internal arguments about harm, equality, and responsibility.",
  },
  辩证: {
    context: "印度论辩传统通过立论、反驳、归谬与概念分析检验主张。中观、正理、佛教认识论和吠檀多的争论，必须连同对手的立场一起读。",
    englishContext: "Indian traditions test claims through thesis, objection, reductio, and conceptual analysis. Madhyamaka, Nyaya, Buddhist epistemology, and Vedanta arguments must be read together with the positions they answer.",
    distinction: "“空”不是虚无主义，“不二”也不是所有差异都不存在。一个否定命题可能针对自性、错误分类或某种论证资格，而不是否定经验世界。",
    englishDistinction: "Emptiness is not nihilism, and non-duality does not mean that every distinction disappears. A negation may target intrinsic nature, a category mistake, or an argumentative entitlement rather than the experienced world.",
  },
  政治: {
    context: "近现代印度思想把自治、殖民统治、种姓、宗教共同体与民主宪制放进同一问题场。甘地、泰戈尔与安贝德卡并非共享一个民族主义答案，而是在自由的条件上发生分歧。",
    englishContext: "Modern Indian thought places self-rule, colonial power, caste, religious community, and democratic constitutionalism in one field of problems. Gandhi, Tagore, and Ambedkar do not share a single nationalist answer; they disagree about the conditions of freedom.",
    distinction: "不要用“东方智慧”抹平殖民、种姓与性别的不平等，也不要把一位现代思想家的政治策略当作整个印度传统的共同立场。",
    englishDistinction: "Do not let the label of Eastern wisdom erase inequalities of colonialism, caste, and gender, or treat one modern thinker's political strategy as the position of an entire Indian tradition.",
  },
};

const economicsTopicLenses: Partial<Record<Thought["topic"], TopicLens>> = {
  市场: {
    context: "市场命题通常借价格、交换与竞争解释分散行动怎样被协调，但协调效果取决于信息、制度、议价能力与市场结构。阅读时应先确认它讨论的是哪一种模型或历史市场。",
    englishContext: "Claims about markets usually use prices, exchange, and competition to explain how dispersed action is coordinated, but the result depends on information, institutions, bargaining power, and market structure. First identify the model or historical market under discussion.",
    distinction: "市场能够协调选择，不等于任何市场结果都有效率、公平或正当；均衡与效率是描述和评价工具，不是自动成立的道德认可。",
    englishDistinction: "A market's capacity to coordinate choices does not make every market outcome efficient, fair, or legitimate. Equilibrium and efficiency are descriptive and evaluative tools, not automatic moral approval.",
  },
  制度: {
    context: "制度分析考察产权、法律、组织、国家能力与执行方式怎样改变激励和分配。相同的正式规则在不同历史条件与执行结构中，可能产生不同结果。",
    englishContext: "Institutional analysis examines how property rights, law, organizations, state capacity, and enforcement shape incentives and distribution. The same formal rule can produce different outcomes under different historical conditions and enforcement arrangements.",
    distinction: "制度与结果之间的相关或历史叙述不是单一原因的普遍定律；还要区分纸面规则与实际执行、因果解释与制度主张。",
    englishDistinction: "A correlation or historical narrative linking institutions to outcomes is not a universal single-cause law. Distinguish formal rules from actual enforcement, and causal explanation from institutional advocacy.",
  },
  增长: {
    context: "增长理论把生产率、资本积累、创新、人口与结构转型放进长期模型或历史比较中。每种解释都依赖特定的计量口径、因果假设与发展阶段。",
    englishContext: "Growth theory places productivity, capital accumulation, innovation, population, and structural change within long-run models or historical comparisons. Each explanation depends on particular measures, causal assumptions, and stages of development.",
    distinction: "总量增长不等于生活改善均匀发生，也不等于增长应压倒其他目标；增长机制的描述、福利后果与政策取舍需要分别论证。",
    englishDistinction: "Aggregate growth does not mean that improvements in life are evenly shared, nor that growth should override every other aim. Its mechanism, welfare effects, and policy trade-offs require separate arguments.",
  },
  货币: {
    context: "货币命题常把货币、信用、利率、通胀与财政金融体系联系起来。其作用会随货币制度、央行安排、预期形成和经济周期而变化。",
    englishContext: "Monetary claims connect money, credit, interest rates, inflation, and fiscal-financial systems. Their operation varies with the monetary regime, central-bank arrangements, expectation formation, and the business cycle.",
    distinction: "应区分名义量与实际量、短期传导与长期结果、机制判断与政策目标；货币政策的效果描述本身不能决定风险和代价应由谁承担。",
    englishDistinction: "Distinguish nominal from real quantities, short-run transmission from long-run outcomes, and claims about mechanisms from policy objectives. Describing a policy's effects does not by itself decide who should bear its risks and costs.",
  },
  行为: {
    context: "行为经济学借有限注意、框架效应、启发式与偏好变化解释实际选择。实验设计、样本、制度环境与效应大小，都会影响结论能推广到哪里。",
    englishContext: "Behavioral economics uses limited attention, framing, heuristics, and changing preferences to explain actual choice. Experimental design, samples, institutional setting, and effect size all constrain how far a result can travel.",
    distinction: "群体中的统计倾向不是对每个人的心理诊断，也不能把偏离某个模型一概称为非理性；描述行为偏差并不自动为助推或操控提供正当性。",
    englishDistinction: "A statistical tendency in a population is not a psychological diagnosis of every individual, and every departure from a model is not simply irrational. Describing a behavioral bias does not automatically justify nudging or manipulation.",
  },
  分配: {
    context: "分配分析追踪收入、财富、租金、议价能力、税收与公共保障怎样形成。理解结论前，应区分衡量口径、因果解释和所采用的正义标准。",
    englishContext: "Distributional analysis traces how income, wealth, rents, bargaining power, taxation, and public provision are formed. Before evaluating a conclusion, distinguish its measure, causal account, and standard of justice.",
    distinction: "衡量不平等或解释其来源，不能直接回答怎样的分配才应被接受；效率与公平也不总是简单的二选一，具体制度可能同时改变两者。",
    englishDistinction: "Measuring inequality or explaining its causes does not by itself determine which distribution ought to be accepted. Efficiency and fairness are not always a simple trade-off; particular institutions can alter both.",
  },
  投资: {
    context: "投资类命题多从市场历史与实践者经验中提炼价值、风险、预期、分散和周期的判断框架。它们应连同资产类型、时间跨度、市场制度与适用条件一起理解。",
    englishContext: "Investment claims often distill frameworks about value, risk, expectations, diversification, and cycles from market history and practitioner experience. Read them together with the asset class, time horizon, market regime, and conditions to which they apply.",
    distinction: "这些内容是实践经验与判断框架，不是无条件的普遍定律，也不构成针对个人情况的投资建议；历史回报和名家经验都不能保证未来结果。",
    englishDistinction: "These are practical judgments and decision frameworks, not condition-free universal laws or investment advice tailored to any individual. Neither historical returns nor a celebrated investor's experience can guarantee future results.",
  },
};

const psychologyTopicLenses: Partial<Record<Thought["topic"], TopicLens>> = {
  感知: {
    context: "知觉研究考察感觉输入怎样被注意、期待、任务目标与环境线索组织。实验中的错觉或选择性注意揭示的是加工机制，不是对一个人是否看见‘真实’的品格判断。",
    englishContext: "Research on perception examines how sensory input is organized by attention, expectations, task goals, and environmental cues. Illusions and selective-attention effects reveal processing mechanisms, not a judgment about whether a person is capable of seeing reality.",
    distinction: "应区分刺激本身、实验任务与被试报告；特定实验中的平均效应不能直接概括所有情境，也不能据此否定日常知觉的可靠性。",
    englishDistinction: "Distinguish the stimulus, the experimental task, and the participant's report. An average effect in one experiment does not describe every setting or invalidate everyday perception as a whole.",
  },
  记忆: {
    context: "记忆不是一次写入、原样取出的单一容器，而涉及编码、保持、提取与重构。材料意义、间隔、线索和后来信息都会改变我们记得什么。",
    englishContext: "Memory is not a single container that records and retrieves an unchanged copy; it involves encoding, retention, retrieval, and reconstruction. Meaning, spacing, cues, and later information all shape what is remembered.",
    distinction: "记忆会重构，不等于每段记忆都是虚构；实验中的遗忘率或误导效应也不能直接裁定某一次具体回忆的真假。",
    englishDistinction: "The reconstructive character of memory does not make every memory fictional. Forgetting rates and misinformation effects in experiments cannot by themselves decide whether one particular recollection is true or false.",
  },
  学习: {
    context: "学习理论研究经验怎样改变反应、期待、技能与行为 repertoire。联结、强化、观察和顿悟强调不同机制，也各自依赖任务与环境。",
    englishContext: "Theories of learning study how experience changes responses, expectations, skills, and behavioral repertoires. Association, reinforcement, observation, and insight emphasize different mechanisms, each dependent on task and environment.",
    distinction: "不要把所有学习都还原为奖惩，也不要把可观察行为的变化当作意义、理解与社会关系的完整说明。",
    englishDistinction: "Do not reduce every kind of learning to reward and punishment, or treat observable behavioral change as a complete account of meaning, understanding, and social relationships.",
  },
  决策: {
    context: "判断与决策研究考察问题表述、参照点、风险、有限注意和启发式怎样改变选择。结论通常是对群体中条件性倾向的估计，而非预测每个人每一次决定。",
    englishContext: "Judgment and decision research examines how framing, reference points, risk, limited attention, and heuristics alter choice. Its results usually estimate conditional tendencies in groups rather than predict every decision by every person.",
    distinction: "偏离一个规范模型不一定等于愚蠢或病理；发现偏差也不自动赋予机构操控选择架构的正当性。",
    englishDistinction: "Departure from a normative model is not automatically stupidity or pathology, and identifying a bias does not by itself justify institutional manipulation of choice architecture.",
  },
  情绪: {
    context: "情绪理论分别强调身体唤起、认知评价、行动倾向与文化表达。它们可以描述同一过程的不同层次，不必被简化为非此即彼。",
    englishContext: "Theories of emotion emphasize bodily arousal, cognitive appraisal, action tendencies, and cultural expression. They may describe different levels of one process rather than exclusive alternatives.",
    distinction: "情绪既不是纯粹生理反射，也不是凭意志即可任意选择；实验标签与临床诊断、日常体验之间还需要谨慎转换。",
    englishDistinction: "Emotion is neither a purely physiological reflex nor something freely chosen by will. Experimental labels, clinical diagnoses, and lived experience must be related with care.",
  },
  动机: {
    context: "动机研究讨论需要、目标、期待、奖励，以及自主、胜任与联结怎样维持行动。不同理论对‘为何开始’和‘为何坚持’可能给出不同答案。",
    englishContext: "Research on motivation examines needs, goals, expectations, rewards, and how autonomy, competence, and relatedness sustain action. Different theories may answer differently why action begins and why it persists.",
    distinction: "内在与外在动机不是绝对二分，理论也不是提高产出的通用配方；奖励效果取决于任务、解释与权力关系。",
    englishDistinction: "Intrinsic and extrinsic motivation are not an absolute binary, and no theory is a universal recipe for productivity. The effects of rewards depend on the task, its interpretation, and relations of power.",
  },
  人格: {
    context: "人格研究用相对稳定的倾向解释跨时间模式，同时考察情境怎样激活或抑制这些倾向。量表分数是操作化的测量结果，不是人的全部。",
    englishContext: "Personality research uses relatively stable tendencies to explain patterns across time while examining how situations activate or inhibit them. A scale score is an operationalized measurement, not the whole person.",
    distinction: "人格特质不是本质、命运或临床诊断；群体层面的相关也不能用于无条件推断个人行为。",
    englishDistinction: "A personality trait is not an essence, destiny, or clinical diagnosis, and a group-level correlation cannot support unconditional predictions about an individual.",
  },
  自我: {
    context: "关于自我的研究涉及身份叙事、自我效能、自我调节与社会承认。自我会在关系和实践中形成，但仍能产生连续性与行动后果。",
    englishContext: "Research on the self concerns identity narratives, self-efficacy, self-regulation, and social recognition. The self is formed in relationships and practices while still producing continuity and consequences for action.",
    distinction: "说自我是建构的，不等于它虚假或可以无限随意改写；个人能动性也不能脱离资源、身体与社会位置。",
    englishDistinction: "To call the self constructed is not to call it false or infinitely revisable. Personal agency remains constrained by resources, embodiment, and social position.",
  },
  关系: {
    context: "关系研究把依恋、互动循环、期待与照料经验联系起来。早期模式能影响后来关系，但通常通过概率与可变化的路径发生作用。",
    englishContext: "Research on relationships connects attachment, interaction cycles, expectations, and experiences of care. Early patterns can influence later relationships, but usually through probabilistic and changeable pathways.",
    distinction: "依恋类别不是成人命运或自行诊断的标签；相关模式需要结合年龄、文化、关系对象与测量方式理解。",
    englishDistinction: "Attachment categories are not adult destinies or labels for self-diagnosis. Patterns must be interpreted with age, culture, relationship partner, and method of measurement in view.",
  },
  群体: {
    context: "社会心理学考察规范、身份、从众、冲突与权力怎样改变个人判断。实验情境能隔离机制，但其效应大小与外部效度需要另行检验。",
    englishContext: "Social psychology studies how norms, identity, conformity, conflict, and power alter individual judgment. Experimental settings can isolate mechanisms, but effect size and external validity require separate examination.",
    distinction: "一次经典实验不能代表所有群体或文化，也不能把情境效应变成对参与者品格的永久判断。",
    englishDistinction: "A single classic experiment cannot represent every group or culture, and a situational effect should not become a permanent judgment of participants' character.",
  },
  发展: {
    context: "发展心理学研究能力、关系与身份怎样随生命历程变化。阶段、支架与社会文化取向提供不同观察尺度，不能简单合并为一张固定时间表。",
    englishContext: "Developmental psychology studies how capacities, relationships, and identities change across the life course. Stages, scaffolding, and sociocultural approaches provide different scales of analysis and cannot be collapsed into one fixed timetable.",
    distinction: "平均发展顺序不是每个儿童都必须按时完成的规范，也不能脱离教育机会、文化实践与个体差异评价能力。",
    englishDistinction: "An average developmental sequence is not a schedule every child must meet, and ability should not be judged apart from educational opportunity, cultural practice, and individual difference.",
  },
  行为: {
    context: "行为研究追踪环境、后果、观察与信念怎样共同塑造行动。可观察指标有助于检验解释，但对行为的记录不等于对其意义的完整说明。",
    englishContext: "Behavioral research traces how environments, consequences, observation, and beliefs jointly shape action. Observable measures help test explanations, but recording behavior is not a complete account of its meaning.",
    distinction: "机制描述不自动等于干预许可；改变行为时仍要考虑自主、知情、权力与潜在伤害。",
    englishDistinction: "Describing a mechanism does not automatically authorize intervention. Attempts to change behavior must still consider autonomy, informed participation, power, and possible harm.",
  },
};

const fallbackLens: TopicLens = {
  context: "这则命题是一个论证入口，而不是论证的全部。把它与作品中的概念定义、理由、反例和相邻段落一起阅读，才能看见它真正回答的问题。",
  englishContext: "This claim is an entry into an argument, not the argument as a whole. Read it with the work's definitions, reasons, counterexamples, and neighboring passages to see the question it actually answers.",
  distinction: "短句便于记忆，也容易被过度推广。不要把特定语境中的判断当作无条件格言；先确认它的对象、范围与成立条件。",
  englishDistinction: "A short claim is memorable and easy to overgeneralize. Do not treat a contextual judgment as an unconditional maxim; first identify its object, scope, and conditions of validity.",
};

function lensForThought(thought: Thought, libraryId: ContentLibraryId): TopicLens {
  if (libraryId === "chinese") {
    return chineseTopicLenses[thought.topic] ?? fallbackLens;
  }
  if (libraryId === "mao") {
    return maoTopicLenses[thought.topic] ?? fallbackLens;
  }
  if (libraryId === "science") {
    return scienceTopicLenses[thought.topic] ?? fallbackLens;
  }
  if (libraryId === "indian") {
    return indianTopicLenses[thought.topic] ?? fallbackLens;
  }
  if (libraryId === "economics") {
    return economicsTopicLenses[thought.topic] ?? fallbackLens;
  }
  if (libraryId === "psychology") {
    return psychologyTopicLenses[thought.topic] ?? fallbackLens;
  }
  return westernTopicLenses[thought.topic] ?? fallbackLens;
}

function generatedContext(
  thought: Thought,
  source: SourceMetadata,
  lens: TopicLens,
  libraryId: ContentLibraryId,
): [string, string] {
  const isShortQuote = source.presentationNature === "source-excerpt";
  const locatorPrecision = source.locatorLevel === "passage"
    ? "已有篇章或段落定位"
    : "目前只定位到著作层级，仍待进一步核订";
  const englishLocatorPrecision = source.locatorLevel === "passage"
    ? "A passage-level locator is available"
    : "The entry is currently located only at work level and still needs closer verification";

  if (libraryId === "chinese") {
    return [
      `这段原文见于${source.locator}，${locatorPrecision}。${lens.context}弹窗今译只负责疏通句义，不能替代原典上下文与历代注疏。`,
      `This source passage is located at ${source.englishLocator}. ${englishLocatorPrecision}. ${lens.englishContext} The plain-language reading clarifies the sentence but does not replace its textual and commentarial contexts.`,
    ];
  }

  if (libraryId === "mao") {
    return [
      `这则${isShortQuote ? "原文短句" : "编辑性转述"}对应${source.locator}，${locatorPrecision}。${lens.context}${isShortQuote ? "短句仍需与前后论证一起读。" : "它压缩的是篇章中的问题意识，不是可脱离原文引用的原话。"}`,
      `This ${isShortQuote ? "source passage" : "editorial restatement"} corresponds to ${source.englishLocator}. ${englishLocatorPrecision}. ${lens.englishContext} ${isShortQuote ? "The passage still needs its surrounding argument." : "It condenses the problem addressed by the work and is not wording to quote as a verbatim source."}`,
    ];
  }

  if (libraryId === "science") {
    return [
      isShortQuote
        ? `这则科学思想卡的已登记逐字字段见于${source.locator}，${locatorPrecision}。${lens.context}另一语言与观点解读仍是项目研读内容；短句必须放回论文、实验或演讲的完整论证中阅读。`
        : `这则科学思想卡是依据${source.locator}整理的编辑性转述，${locatorPrecision}。${lens.context}卡片为了聚焦一个判断而压缩了论证，不能作为作者原话引用。`,
      isShortQuote
        ? `The registered verbatim field for this science card appears at ${source.englishLocator}. ${englishLocatorPrecision}. ${lens.englishContext} The other language and interpretation remain project study content; read the excerpt within the paper, experiment, or lecture's full argument.`
        : `This scientific-thought card is an editorial restatement grounded in ${source.englishLocator}. ${englishLocatorPrecision}. ${lens.englishContext} The card compresses an argument to foreground one judgment and must not be cited as the author's verbatim wording.`,
    ];
  }

  if (libraryId === "indian") {
    return [
      isShortQuote
        ? `这则印度哲学卡的已登记逐字字段采用${source.locator}所列历史公版译本，${locatorPrecision}。${lens.context}另一语言与观点解读仍是项目研读内容；该译本不能替代梵语等原典、其他译本与注疏传统。`
        : `这则印度哲学卡依据${source.locator}整理，${locatorPrecision}。${lens.context}首页中英文都是便于研读的编辑性转述，不是梵语、巴利语、普拉克里特语或近现代原文的逐字引文。`,
      isShortQuote
        ? `The registered verbatim field for this Indian-philosophy card follows the historical public-domain translation listed at ${source.englishLocator}. ${englishLocatorPrecision}. ${lens.englishContext} The other language and interpretation remain project study content; this edition does not replace source-language texts, alternative translations, or commentarial traditions.`
        : `This Indian-philosophy card is grounded in ${source.englishLocator}. ${englishLocatorPrecision}. ${lens.englishContext} Both card languages are editorial study renderings, not verbatim Sanskrit, Pali, Prakrit, or modern-language source text.`,
    ];
  }

  if (libraryId === "economics") {
    return [
      isShortQuote
        ? `这则经济思想卡的已登记逐字字段见于${source.locator}，${locatorPrecision}。${lens.context}另一语言与观点解读仍是项目研读内容；原句也必须连同模型假设、历史时期与制度环境一起读。`
        : `这则经济思想卡依据${source.locator}整理，是便于研读的编辑性转述，${locatorPrecision}。${lens.context}阅读时应把模型假设、历史时期与制度环境一并带回；它既不是作者原话，也不是脱离条件即可套用的经济规律。`,
      isShortQuote
        ? `The registered verbatim field for this economics card appears at ${source.englishLocator}. ${englishLocatorPrecision}. ${lens.englishContext} The other language and interpretation remain project study content; read the sentence together with its model assumptions, historical period, and institutional setting.`
        : `This economic-thought card is an editorial study restatement grounded in ${source.englishLocator}. ${englishLocatorPrecision}. ${lens.englishContext} Read it together with its model assumptions, historical period, and institutional setting; it is neither a verbatim quotation nor an economic law that applies without conditions.`,
    ];
  }

  if (libraryId === "psychology") {
    return [
      isShortQuote
        ? `这则心理学卡的已登记逐字字段见于${source.locator}，${locatorPrecision}。${lens.context}另一语言与观点解读仍是项目研读内容；还须核对研究设计、样本、测量方式与后续重复或修正，不能据此诊断个人。`
        : `这则心理学卡依据${source.locator}整理，是便于研读的编辑性转述，${locatorPrecision}。${lens.context}阅读时还要核对研究设计、样本、测量方式与后续重复或修正；它不是作者原话，也不是对个人的诊断。`,
      isShortQuote
        ? `The registered verbatim field for this psychology card appears at ${source.englishLocator}. ${englishLocatorPrecision}. ${lens.englishContext} The other language and interpretation remain project study content; check the design, sample, measures, and later replications or revisions, and do not use the excerpt to diagnose an individual.`
        : `This psychology card is an editorial study restatement grounded in ${source.englishLocator}. ${englishLocatorPrecision}. ${lens.englishContext} Read it with the study design, sample, measures, and later replications or revisions; it is neither a verbatim quotation nor a diagnosis of any individual.`,
    ];
  }

  return [
    `这则${isShortQuote ? "原文短句" : "命题译写"}对应${source.locator}，${locatorPrecision}。${lens.context}${isShortQuote ? "短句保留了一个切口，完整理由仍在原作的前后论证中。" : "当前表述压缩了论证结论，不能替代作者给出理由的过程。"}`,
    `This ${isShortQuote ? "source passage" : "interpretive rendering"} corresponds to ${source.englishLocator}. ${englishLocatorPrecision}. ${lens.englishContext} ${isShortQuote ? "The passage preserves an entry point, while the full reasons remain in the surrounding argument." : "The card condenses a conclusion and cannot replace the author's reasoning."}`,
  ];
}

function generatedDistinction(
  thought: Thought,
  lens: TopicLens,
  libraryId: ContentLibraryId,
): [string, string] {
  if (libraryId === "chinese") {
    return [
      `阅读${thought.name}这段话时，${lens.distinction}今译、注释与原文属于不同层次；存在争议的概念不应被一个现代释义一次定死。`,
      `When reading this passage associated with ${thought.englishName}, ${lens.englishDistinction} Source text, plain-language reading, and commentary belong to different layers; a contested concept should not be fixed by one modern gloss.`,
    ];
  }

  if (libraryId === "mao") {
    return [
      `${lens.distinction}还要区分这篇文字当时要解决的问题、其中可迁移的方法，以及今天不再相同的历史条件。`,
      `${lens.englishDistinction} Also distinguish the problem the work addressed, the method that may remain portable, and the historical conditions that no longer match the present.`,
    ];
  }
  if (libraryId === "science") {
    return [
      `阅读${thought.name}的这个命题时，${lens.distinction}还要区分当时可用的观测手段、作者真正做出的主张，以及后世才形成的教科书表述。`,
      `When reading this claim associated with ${thought.englishName}, ${lens.englishDistinction} Also distinguish the observations available at the time, the author's actual claim, and the textbook formulation constructed later.`,
    ];
  }
  if (libraryId === "indian") {
    return [
      `阅读${thought.name}的这个命题时，${lens.distinction}还要区分原典、后世注疏与现代重构；跨语言出现的相近术语，也未必承担同一种论证功能。`,
      `When reading this claim associated with ${thought.englishName}, ${lens.englishDistinction} Also distinguish primary text, later commentary, and modern reconstruction; similar terms across languages need not perform the same argumentative role.`,
    ];
  }
  if (libraryId === "economics") {
    return [
      `阅读${thought.name}的这个命题时，${lens.distinction}还要分清它是在描述机制或历史事实、解释因果关系，还是提出价值判断与政策主张；由“是什么”不能直接推出“应该怎样”。`,
      `When reading this claim associated with ${thought.englishName}, ${lens.englishDistinction} Also distinguish descriptions of mechanisms or historical facts and causal explanations from value judgments and policy proposals: an account of what is does not by itself establish what ought to be.`,
    ];
  }
  if (libraryId === "psychology") {
    return [
      `阅读${thought.name}的这个命题时，${lens.distinction}还要区分理论命题、实验操作化、统计平均与对单个人的判断；心理学解释不能替代临床评估。`,
      `When reading this claim associated with ${thought.englishName}, ${lens.englishDistinction} Also distinguish a theoretical claim, its experimental operationalization, a statistical average, and a judgment about one person; psychological explanation cannot replace clinical assessment.`,
    ];
  }

  return [
    `阅读${thought.name}的这个命题时，${lens.distinction}不同作品、时期或学派使用同一个词，也未必指向同一概念。`,
    `When reading this claim by ${thought.englishName}, ${lens.englishDistinction} The same word can name different concepts across works, periods, and schools.`,
  ];
}

export function interpretationForThought(
  thought: Thought,
  source: SourceMetadata,
  libraryId: ContentLibraryId,
  bespoke?: InterpretationDetail,
): ResolvedInterpretation {
  const lens = lensForThought(thought, libraryId);
  const [fallbackContext, fallbackEnglishContext] = generatedContext(
    thought,
    source,
    lens,
    libraryId,
  );
  const [fallbackDistinction, fallbackEnglishDistinction] = generatedDistinction(
    thought,
    lens,
    libraryId,
  );

  return {
    context: thought.context ?? bespoke?.context ?? fallbackContext,
    englishContext:
      thought.englishContext ?? bespoke?.englishContext ?? fallbackEnglishContext,
    distinction: thought.distinction ?? bespoke?.distinction ?? fallbackDistinction,
    englishDistinction:
      thought.englishDistinction
      ?? bespoke?.englishDistinction
      ?? fallbackEnglishDistinction,
  };
}
