import type { InterpretationDetail } from "./interpretationTypes";

/**
 * Card-specific close-reading notes for verified Western excerpts after
 * Rousseau. Entries are deliberately static: source location, argumentative
 * movement, and inference limits have been written for each individual card.
 */
export const westernLateInterpretationDetails: Record<string, InterpretationDetail> = {
  "kant-dare-to-know": {
    context:
      "文章开篇先把“未成年状态”界定为不能在没有他人引导时运用自己的理智，下一句又把原因归于缺少决心与勇气，而非缺少理智能力。Sapere aude 因而回应的是依赖监护人的习惯；后文再区分理性的公共运用与身处职务时的私人运用。",
    englishContext:
      "The opening defines nonage as inability to use one's understanding without another's guidance, then attributes it to a lack of resolution and courage rather than intellect. Sapere aude answers that habitual dependence; the essay later distinguishes public use of reason from its private use within an office.",
    distinction:
      "“由自己造成”没有抹去审查、制度排斥或教育不平等，更不表示每个受支配者都该为处境负责。康德此处要求的是公开思考的勇气，不是拒绝一切教师、专业知识或共同规则。",
    englishDistinction:
      "Self-incurred does not erase censorship, institutional exclusion, or unequal education, nor does it blame every dominated person for the condition. Kant calls for courage in public reasoning, not rejection of teachers, expertise, or shared rules.",
  },
  "kant-cosmopolitan-hospitality": {
    context:
      "第三项正式条款从地球表面有限、人人不能无限散居的事实推出一种共同交往的权利。引文随即把好客严格限定为访客权而非宾客权：和平到来的陌生人可要求不受敌视，却不能仅凭到达便要求永久居留。",
    englishContext:
      "The Third Definitive Article derives a right of common intercourse from the finite surface of the earth, on which people cannot disperse without limit. The excerpt then restricts hospitality to a right of visitation, not a right to be a guest: a peaceful stranger may demand non-hostility but not permanent residence merely by arriving.",
    distinction:
      "这里的“不敌视”是最低法律条件，并未给出完整的难民法、移民资格或财产分配原则。把国家可以遣返读成可以使来访者陷入死亡，也恰好违反引文明确附加的限制。",
    englishDistinction:
      "Non-hostility is a minimum juridical condition, not a complete law of asylum, immigration status, or property allocation. Reading permission to turn a visitor away as permission to expose that person to death contradicts the excerpt's express qualification.",
  },
  "kant-copernican-turn": {
    context:
      "第二版序言先比较数学和自然科学如何因方法革命而走上可靠道路，再提出形而上学的“实验”：不再假定认识必须照抄对象，而考察经验对象是否受认识能力的先天形式制约。后文马上说明，这只适用于作为经验对象的事物，并为物自身保留另一层问题。",
    englishContext:
      "The B Preface first compares the methodological revolutions that put mathematics and natural science on a secure path, then proposes an experiment for metaphysics: instead of assuming cognition copies objects, ask whether objects of experience conform to a priori forms of cognition. The next movement limits the proposal to things as experienced and preserves a separate question about things in themselves.",
    distinction:
      "“对象符合认识”不是个人信念制造现实，也不是经验事实可随意改写；它讨论的是任何可能经验共有的形式条件。哥白尼比喻提出一种检验方案，不等于在这一句中已经证明先验唯心论的全部结论。",
    englishDistinction:
      "Objects conforming to cognition does not mean that private belief manufactures reality or may rewrite empirical facts; it concerns formal conditions shared by possible experience. The Copernican analogy proposes a test and does not, in this sentence alone, prove every conclusion of transcendental idealism.",
  },
  "kant-intuitions-concepts": {
    context:
      "A51/B75 位于“先验逻辑理念”中：康德刚把感性界定为接受表象的能力，把知性界定为自发地产生概念的能力，继而说明两者不能互换。空与盲的对句把给予对象和思考对象接合起来，为后面的概念分析与判断表奠定分工。",
    englishContext:
      "A51/B75 occurs in the Idea of a Transcendental Logic. Kant has just defined sensibility as receptivity for representations and understanding as spontaneity in producing concepts, then insists that neither faculty can exchange functions. The paired terms empty and blind join the giving and thinking of an object, preparing the division of labor developed in the analysis of concepts and judgments.",
    distinction:
      "这里的“直观”是对象被直接给予的技术概念，不等同灵感或未经推理的猜测；“盲”也不是说无概念感觉根本不存在。引文要求经验认识中的协作，并未断言一切感受都必须先能用语言分类。",
    englishDistinction:
      "Intuition here is the technical term for an object's being immediately given, not inspiration or an unreasoned hunch; blind does not mean unconceptual sensation simply fails to occur. The passage requires cooperation in empirical cognition without claiming that every feeling must first be verbally classified.",
  },
  "kant-space-form-intuition": {
    context:
      "“空间的形而上学阐明”首先反驳从外部经验抽取空间：要把感觉归为在我之外、彼此相邻，空间表象已经在运作。被省略的中段正用这种“经验预设空间”的次序说明空间不是经验概念，随后才论证它是一种必然的先天表象。",
    englishContext:
      "The Metaphysical Exposition of Space first rejects deriving space from outer experience: representing sensations as outside me and beside one another already employs spatial representation. The omitted middle develops that order of dependence—experience presupposes space—before the text argues that space is a necessary a priori representation.",
    distinction:
      "先天形式说限定的是人类外感官如何呈现对象，不等于否认经验中的几何学习，也不直接裁定空间在物自身层面是否存在。它更没有把“先于经验”理解成婴儿脑中已有一幅完成的空间地图。",
    englishDistinction:
      "The a priori form concerns how human outer sense presents objects; it neither denies empirical learning in geometry nor directly settles whether space belongs to things in themselves. Prior to experience also does not mean an infant possesses a completed inner map of space.",
  },
  "kant-synthetic-a-priori": {
    context:
      "导论先区分分析判断与综合判断，再主张数学、纯粹自然科学和形而上学的要求都包含既扩充内容又声称必然有效的判断。A10/B19 的问题把前三者汇成一个总课题，后续“先验论”正要追查使这类判断可能的认知条件。",
    englishContext:
      "The Introduction distinguishes analytic from synthetic judgments and then argues that mathematics, pure natural science, and the claims of metaphysics contain judgments that extend content while claiming necessity. The question at A10/B19 gathers those domains into a single task; the transcendental inquiry that follows seeks the cognitive conditions making such judgments possible.",
    distinction:
      "“先天”指其正当性不从某次经验归纳而来，不表示判断在时间上先被人想到；“综合”指谓词扩充概念内容，也不是随意拼接。此问本身是研究纲领，不能被当成所有传统形而上学命题都已获许可。",
    englishDistinction:
      "A priori means that justification is not inductively drawn from particular experiences, not that a person thinks the judgment earlier in time; synthetic means content is extended, not arbitrarily combined. The question states a research program and does not license every traditional metaphysical proposition.",
  },
  "kant-phenomena-noumena-limit": {
    context:
      "在把对象分成现象与本体的章节中，康德先指出感性概念只有对可能经验中的对象才有客观用途。A255/B311 随即把本体保留为“不是感性直观对象”的边界标记，用来阻止感性条件僭越到一切可能事物；下一段继续否认我们拥有相应的智性直观。",
    englishContext:
      "In the chapter dividing objects into phenomena and noumena, Kant first argues that sensible concepts have objective use only for objects of possible experience. A255/B311 retains noumenon as a boundary marker for what is not an object of sensible intuition, preventing sensible conditions from being extended to all possible things; the next paragraph continues by denying that we possess the corresponding intellectual intuition.",
    distinction:
      "“消极用途”并没有提供关于本体属性的秘密知识，也不能把物自身想成藏在现象背后的第二件可观察物。边界概念限制知识主张，但不等于证明超经验对象不存在。",
    englishDistinction:
      "Negative use supplies no secret knowledge of noumenal properties and does not turn the thing in itself into a second observable object hidden behind appearances. The boundary limits claims to knowledge without proving that nothing supersensible exists.",
  },
  "kant-ideas-regulative-use": {
    context:
      "A680/B708 位于“纯粹理性理念的调节性使用”，此前区分了把理念当作对象构成原则与把它当作研究准则。系统统一要求研究者仿佛自然知识能够由较少原则贯通，从而继续寻找种属、连续性和解释联系；下一步则警告不能把这项方法要求实体化。",
    englishContext:
      "A680/B708 belongs to the regulative use of the ideas of pure reason, after Kant distinguishes treating an idea as constitutive of an object from using it as a maxim of inquiry. Systematic unity directs investigators to seek genera, continuity, and explanatory connections as if knowledge of nature could be organized under fewer principles; the next move warns against reifying that methodological demand.",
    distinction:
      "“主观准则”不是私人偏好或可以无视证据的美学整齐，而是指导经验研究的理性任务。它支持持续追求统一，却不能推出自然本身必定完成了我们设想的唯一体系。",
    englishDistinction:
      "A subjective maxim is not private taste or an aesthetic neatness allowed to ignore evidence; it is a rational task directing empirical inquiry. It warrants the continued search for unity but not the conclusion that nature itself must instantiate the one complete system we imagine.",
  },
  "kant-good-will": {
    context:
      "《奠基》第一章以这句开场，随后逐项检验聪明、勇气、节制、幸运和幸福，指出这些好处都可能被坏的意志利用。论证接着通过“即使成效全无”的思想实验，把善良意志的价值定位在意愿的原则，而不是行动偶然实现的结果。",
    englishContext:
      "Groundwork I opens with this sentence and then tests intelligence, courage, self-control, fortune, and happiness, showing that each benefit can be used by a bad will. The argument next imagines the will failing to achieve any result and locates its worth in the principle of willing rather than contingent success.",
    distinction:
      "无条件的善不是说后果、技能或幸福毫无道德关系，而是说它们的价值需要正确意志来限定。善良意志也不等于主观上“好心”：后文用义务和可普遍化的准则检验它。",
    englishDistinction:
      "Unqualified goodness does not make consequences, abilities, or happiness morally irrelevant; it says their value requires direction by a right will. A good will is also not merely feeling well-intentioned: later sections test it through duty and universalizable maxims.",
  },
  "kant-universal-law-test": {
    context:
      "第二章从日常义务判断上升到定言命令的公式，先把准则作为行动者给自己的主观原则，再问它能否同时被意愿为普遍法则。紧接的自然法则表述和四个义务例子，分别检验准则普遍化时能否被设想及能否被一致意愿。",
    englishContext:
      "Section II moves from ordinary judgments of duty to a formula of the categorical imperative. It treats a maxim as the agent's subjective principle and asks whether that principle can at the same time be willed as universal law. The following formula of a law of nature and four examples test both whether universalization can be conceived and whether it can coherently be willed.",
    distinction:
      "检验对象是包含情境、行动和目的的准则，不是把行为名称机械地问成“人人都这样会怎样”。可普遍化给出形式约束，却不能仅凭一句公式替代事实判断、准则描述和不同义务冲突的论证。",
    englishDistinction:
      "The test applies to a maxim containing circumstance, act, and end, not to mechanically asking what if everyone performed an act-name. Universalizability supplies a formal constraint but the formula alone cannot replace factual judgment, accurate description of the maxim, or argument about competing duties.",
  },
  "kant-autonomy-self-legislation": {
    context:
      "第二章在提出目的王国后，把自主界定为意志不从欲望对象借来法则、而以能够普遍立法的形式约束自己。下一段立即把他律列为一切伪道德原则的来源，因为行动原则若取决于预期利益、幸福或外在命令，就只能产生有条件的命令。",
    englishContext:
      "After introducing the kingdom of ends, Section II defines autonomy as the will binding itself through a form capable of universal legislation rather than borrowing law from an object of desire. The next movement identifies heteronomy as the source of spurious moral principles, since a rule dependent on benefit, happiness, or external command yields only a conditional imperative.",
    distinction:
      "自我立法不是每个人宣布自己的规则即成道德法；“自身”在这里是作为理性且能与其他理性者共同立法的意志。它也不排斥接受合理制度，而要求服从的原则不能只靠奖惩或偏好成立。",
    englishDistinction:
      "Self-legislation does not make any privately announced rule a moral law; the self is a rational will capable of legislating with other rational beings. Nor does autonomy exclude justified institutions: it requires that obedience rest on more than reward, punishment, or preference.",
  },
  "kant-propensity-radical-evil": {
    context:
      "《宗教》第一篇先区分人性中趋善的原初禀赋与趋恶的倾向，再把恶定位在自由采纳准则时如何排列动机。6:36 所说的“颠倒”承接三个恶的层级，解释为何行动表面合法仍可能以自利为法则的前提；随后讨论这种倾向为何既普遍又可归责。",
    englishContext:
      "Part I of Religion first distinguishes original predispositions to good from a propensity to evil, then locates evil in the ordering of incentives when a free agent adopts maxims. The inversion at 6:36 follows three grades of evil and explains how outwardly lawful conduct can still make self-love the condition of respecting the law; the discussion then asks how that propensity can be both universal and imputable.",
    distinction:
      "“根本”指准则根部的优先次序，不是说人每次行动都极端残暴，也不是生物遗传决定论。自利动机可以被容纳；问题在于它是否被置于道德法则之上，从而只在有利时才守法。",
    englishDistinction:
      "Radical concerns the root ordering of maxims, not a claim that every act is monstrously cruel or biologically predetermined. Incentives of self-love may be accommodated; the issue is whether they outrank the moral law so that law is observed only when advantageous.",
  },
  "kant-disinterested-beauty": {
    context:
      "《判断力批判》的第一个趣味契机先比较快适、善与美：快适牵涉感觉欲求，善牵涉对象应当为何及其概念，而审美愉悦不要求对象被占有或实际存在。第 2 节的标题概括这项排除，随后以宫殿例子区分对其社会代价的反感与对其形式的趣味判断。",
    englishContext:
      "The first moment of taste compares the agreeable, the good, and the beautiful: the agreeable engages sensory desire, the good involves a concept of what the object ought to be, while aesthetic pleasure does not require possessing the object or even its existence. The heading of §2 states that exclusion; the palace example then separates disapproval of social cost from a judgment of its form.",
    distinction:
      "“无利害”不是冷漠、无情感或没有个人视角，而是愉悦不以欲求对象为条件。它也没有免除作品的伦理与政治评价，只要求别把这些评价直接当成纯粹趣味判断的根据。",
    englishDistinction:
      "Disinterested does not mean indifferent, emotionless, or without a standpoint; it means the pleasure is not conditioned by desire for the object's existence. It also does not exempt a work from ethical or political criticism, only distinguishes those grounds from a pure judgment of taste.",
  },
  "kant-purposiveness-without-purpose": {
    context:
      "第 10 节先把目的解释为一个概念作为对象现实性的原因，并由此说明“合目的性”可以只涉及形式如何适合我们的判断。引文的让步保留了仿佛由意志安排的可理解性，却不把一个实际意图归给对象；下一节据此把纯粹趣味的根据放在形式合目的性。",
    englishContext:
      "Section 10 first explains an end as a concept functioning as the cause of an object's actuality, allowing purposiveness to concern only how a form suits our judging. The excerpt preserves intelligibility as if the form were arranged by a will without attributing an actual intention to the object; §11 then makes formal purposiveness the ground of pure taste.",
    distinction:
      "“无目的”不是形式杂乱或毫无结构，而是不能指出一个决定审美判断的外在用途。仿佛出自意志也不是设计者存在的证明，更不能把所有有效工具自动判为美。",
    englishDistinction:
      "Without an end does not mean formless or unstructured; it means no determinate external use grounds the aesthetic judgment. The as-if reference to a will is not proof of a designer, and efficient tools are not therefore automatically beautiful.",
  },
  "kant-unsocial-sociability": {
    context:
      "《普遍历史观念》第四命题接着第三命题关于自然要人发展自身能力的设定，把对抗视为推动这种发展的手段。人寻求社会又抗拒受他人限制，虚荣、权力欲与占有欲由此刺激才能，同时迫使共同体建立可以约束相互自由的法制。",
    englishContext:
      "The Fourth Proposition follows the claim that nature requires humanity to develop its own capacities and treats antagonism as a means to that development. People seek society yet resist constraint by others; vanity, lust for power, and possessiveness stimulate abilities while forcing communities toward a lawful order that can bound reciprocal freedom.",
    distinction:
      "这是目的论历史假说中的机制，不是赞美冲突、竞争越多越好，也不是对实际历史必然进步的经验定律。制度要把对抗转化为相容自由；任由强者破坏社会并不符合该论证。",
    englishDistinction:
      "This is a mechanism within a teleological conjecture about history, not praise of unlimited conflict or an empirical law guaranteeing progress. Institutions are to convert antagonism into compatible freedom; allowing the powerful to destroy social conditions does not satisfy the argument.",
  },
  "kant-federation-peace": {
    context:
      "第二项正式条款从国家处于无法庭自然状态的危险出发，却拒绝建立吞并各国的世界国家。康德转而提出保持国家自由的联盟，其目的不是一次性和约，而是逐步扩大并防止战争；下一段以野蛮民族偏好无法律自由来反衬这种公共约束。",
    englishContext:
      "The Second Definitive Article begins from the danger of states remaining in a lawless condition yet rejects a world state that would absorb them. Kant instead proposes a federation preserving state freedom, aimed not at a single peace treaty but at preventing war and progressively expanding; the next paragraph contrasts this public constraint with peoples who prefer lawless freedom.",
    distinction:
      "“自由国家”在此是国际法主体，不意味着所有现存国家内部已充分自由；联盟也不是拥有统一主权的全球国家。条款提出和平的法律形式，却没有单独解决执行力、退出或不平等权力的问题。",
    englishDistinction:
      "Free states here are subjects of international right, not a claim that every existing state is internally free; the federation is not a globe-spanning sovereign state. The article gives peace a juridical form but does not by itself solve enforcement, withdrawal, or unequal power.",
  },
  "hegel-owl-of-minerva": {
    context:
      "《法哲学原理》序言在这句之前把哲学称为“在思想中把握它的时代”，并说一个生活形态已经衰老时，灰色理论才以灰色描绘它。猫头鹰的黄昏飞行因此收束了哲学与既成现实的时间差：概念理解在制度形态成熟后到来，不能凭空返老还童。",
    englishContext:
      "Just before this line, the Preface calls philosophy its own time apprehended in thought and says that only when a form of life has grown old does gray theory paint it gray. The owl's evening flight closes that account of philosophy's temporal lag: conceptual comprehension arrives after an institutional form has matured and cannot simply rejuvenate it.",
    distinction:
      "比喻没有说思想永远只能被动旁观，或改革必须等旧秩序彻底消亡。它限定哲学不能跳出自己的历史条件预制未来，并不取消实践者在当下判断和行动的责任。",
    englishDistinction:
      "The image does not make thought permanently passive or require reform to wait until an order has vanished. It limits philosophy's claim to preconstruct a future outside its historical conditions without canceling agents' responsibility to judge and act now.",
  },
  "hegel-recognition": {
    context:
      "第 178 节开启“自我意识的独立与依赖”，承接欲望经验的失败：吞没对象只能暂时确认自己，真正持久的对象必须自身也是否定性的自我。引文把两个自我意识的相互承认设为新阶段，随后才展开主奴关系如何因承认不对称而不能完成这个要求。",
    englishContext:
      "Section 178 opens Independence and Dependence of Self-Consciousness after desire fails to secure lasting self-certainty: consuming an object confirms the self only momentarily, so the enduring object must itself be a negative, self-related being. The excerpt introduces mutual recognition between two self-consciousnesses; the master-bondsman sequence then shows why asymmetric recognition cannot fulfill it.",
    distinction:
      "“只有在得到承认时才存在”说的是自我意识作为规范性、社会性身份的实现，不是否认孤立个体有感觉或生物生命。主奴斗争也不是任何关系都必经的处方，更不把暴力支配当成成功承认。",
    englishDistinction:
      "Existing only through recognition concerns the realization of self-consciousness as a normative social standing, not the biological or sensory existence of an isolated person. The struggle for mastery is not a prescription for every relationship, and domination is precisely not successful recognition.",
  },
  "hegel-sense-certainty": {
    context:
      "感性确定性起初声称“这个此时此地”的个别对象是最丰富、最直接的知识；但当意识说“现在是夜晚”而时间改变时，留下的“现在”能容纳相反内容。第 97 节把同一检验移到“这一个”：语言不可避免地说出可重复的普遍词，从内部瓦解纯个别所指的知识主张。",
    englishContext:
      "Sense-certainty initially claims that this individual here and now is the richest and most immediate knowledge. Yet when consciousness writes down now is night and time changes, the surviving now can contain opposite contents. Section 97 applies the same test to this: language inevitably utters a repeatable universal and thereby undermines the claim to know a purely individual referent.",
    distinction:
      "语言“更真实”不是说具体事物不存在，也不是让词语创造眼前对象；它揭示声称为知识的内容必须具有可表达、可重复的结构。无法把绝对个别原封不动说出，也不等于经验细节都可被一般概念穷尽。",
    englishDistinction:
      "Language being more truthful does not abolish concrete things or make words create the object before us; it reveals that a claim to knowledge requires expressible, repeatable structure. Failure to say the absolutely particular without mediation does not mean general concepts exhaust experiential detail.",
  },
  "hegel-perception-thing-properties": {
    context:
      "在感性确定性转为知觉后，对象不再只是“这一个”，而成为普遍性质的承载者。第 112 节让物表现为盐之类的统一体，同时具有白、咸、立方等彼此独立的属性；后续经验将迫使意识在物的一与属性的多之间来回归责并修正对象概念。",
    englishContext:
      "After sense-certainty gives way to perception, the object is no longer merely this but a bearer of universal properties. Section 112 presents a thing such as salt as one unity that is also white, saline, cubic, and so forth, properties indifferent to one another; the ensuing experience makes consciousness alternate between blaming the thing and itself for tensions between unity and plurality.",
    distinction:
      "“经过中介”不表示物只是语言虚构，也不是简单宣称一切对象都是属性清单。论证考察知觉意识自己提出的统一标准为何不稳定，并为下一阶段寻找关系和力作准备。",
    englishDistinction:
      "Mediated does not mean that the thing is a linguistic fiction or merely a list of qualities. The argument tests why perception's own standard of unity is unstable and prepares the transition toward relations and force.",
  },
  "hegel-force-law": {
    context:
      "“力与知性”把知觉中的属性张力重新解释为力的表现，并在现象变动背后提出一个超感性世界。第 149 节说明法则把可见差异保存为稳定关系；接下来的批判则指出，多种特殊法则被压缩为“一个力”时可能只改换名称，尚未真正说明差异。",
    englishContext:
      "Force and the Understanding recasts tensions among perceived properties as manifestations of force and posits a supersensible world behind changing appearance. Section 149 has law preserve visible difference as a stable relation; the critique that follows notes that compressing many specific laws into one force may merely rename rather than explain their differences.",
    distinction:
      "这里的法则不是立法命令，也不表示现象变化是虚假表面；它是知性在变化中表达可重复差异的形式。引文没有保证任何被称为“规律”的概括都有解释力。",
    englishDistinction:
      "Law here is not a command of legislation, nor does it make changing appearances unreal; it is the understanding's form for expressing repeatable difference within change. The excerpt does not guarantee explanatory force to every generalization called a law.",
  },
  "hegel-unhappy-consciousness": {
    context:
      "不幸意识继主奴和斯多亚、怀疑意识之后，把怀疑论内部的双重性体验为自己与不变本质的分裂。第 208 节说明它每次靠向不可变者时仍意识到自己的个别变化，退回个别时又以不可变者衡量自己；后文依次考察虔敬、劳动与自我否弃如何处理这道裂缝。",
    englishContext:
      "Following mastery, Stoicism, and skepticism, unhappy consciousness experiences skepticism's duality as a split between its changing individuality and an unchangeable essence. Section 208 shows that when it reaches toward the unchangeable it still feels its singular change, and when it returns to singularity it judges itself by the unchangeable; devotion, work, and self-renunciation are then tested as responses.",
    distinction:
      "“不幸”不是临床抑郁诊断，也不把所有宗教信仰归结为心理疾病。它命名一个意识形态的逻辑位置：双方都被体验为同一个自我，却尚不能理解其内在关联。",
    englishDistinction:
      "Unhappy is not a clinical diagnosis of depression and does not reduce every religious faith to pathology. It names a logical shape of consciousness in which both sides are felt as one self but their internal relation is not yet comprehended.",
  },
  "hegel-reason-in-the-world": {
    context:
      "第 233 节标志自我意识由“精神动物世界”之前转入理性：此前意识把真理置于彼岸，现因确信思维与存在统一而转向观察自然和自身。这个确信只是理性的原则，后面的观察理性、行动理性和个体性章节将逐次检验它能否在对象中兑现。",
    englishContext:
      "Section 233 marks self-consciousness's transition into Reason: after locating truth in a beyond, consciousness now turns to observe nature and itself with confidence in the unity of thought and being. That confidence is only Reason's principle; the ensuing shapes of observing and active reason test whether it can actually recognize itself in its objects.",
    distinction:
      "“自身即一切实在”不是个人心念拥有世界、事实随意志改变，也不是该阶段已经获得绝对知识。它是一项待经验检验的唯心论确信，后续失败正会限定其抽象形式。",
    englishDistinction:
      "Being all reality does not grant a private mind possession of the world or make facts bend to wish, and this stage has not reached absolute knowing. It is an idealist certainty still to be tested by experience, whose failures qualify its abstract form.",
  },
  "hegel-determinate-negation": {
    context:
      "《现象学》导论说明意识以自己的知识标准检验对象；若对象不符合知识，知识与对象的含义会一起改变。第 79 节反对把失败只看成虚无，因为被否定的是某一确定主张，其矛盾留下新对象的内容，因而使意识不靠外加路线也能过渡。",
    englishContext:
      "The Introduction explains that consciousness tests its object by its own standard of knowledge; when object and knowing fail to match, the meaning of both changes. Section 79 rejects treating failure as bare nothingness: a determinate claim has been negated, and its contradiction leaves content for a new object, allowing transition without an externally imposed itinerary.",
    distinction:
      "确定的否定不是“凡反对都有进步”，也不是把逻辑矛盾美化为正确。只有能说明前一形态按其自身标准怎样失败、结果保留了什么内容，才构成这里的推进。",
    englishDistinction:
      "Determinate negation does not make every opposition progressive or contradictions automatically true. The transition requires showing how the prior shape fails by its own standard and what specific content the result retains.",
  },
  "hegel-true-infinite": {
    context:
      "《小逻辑》第 94 节先批判有限越界成为无限、无限又因与有限相对而重新有限的无尽往复，通常称为“坏无限”。真正无限不是把边界一次次推远，而是把有限的产生与克服理解为自身过程；后续图示用回到自身的圆区别于没有终点的直线。",
    englishContext:
      "Encyclopaedia Logic §94 first criticizes the endless alternation in which the finite crosses into an infinite that, by standing opposed to the finite, becomes finite again—the bad infinite. Genuine infinity does not repeatedly move the boundary farther away; it comprehends the arising and overcoming of finitude as its own process, later figured as a circle returning to itself rather than an unending line.",
    distinction:
      "“在他者中安住自身”不是取消真实差异或把他人吸收进同一，也不是数学无穷概念的直接驳论。它在存在论的质的无限章节中修正“无限只是有限之外”的概念关系。",
    englishDistinction:
      "Being at home in its other does not erase real difference or absorb other persons into sameness, and it is not a direct refutation of mathematical infinity. It revises the conceptual relation that places infinity merely beyond the finite within the logic of qualitative infinity.",
  },
  "hegel-actual-rational": {
    context:
      "序言先把法哲学的任务限定为理解已经现实化的伦理世界，而不是设计一个“应当如此”的国家。紧接名句之后，黑格尔区分浮面的暂时存在与理念中具有必然结构的现实性，并以“这里是玫瑰，就在这里起舞”要求在当下辨认理性形式。",
    englishContext:
      "The Preface first limits philosophy of right to comprehending an ethical world that has become actual rather than designing a state as it ought to be. Around the maxim Hegel distinguishes transient surface existence from actuality possessing necessary conceptual structure, then invokes here is the rose, dance here to demand recognition of rational form in the present.",
    distinction:
      "wirklich/actual 不是“凡存在者”，所以这句话不能为任意政权、习俗或暴行背书。反过来，“理性”也不是个人认为合理便会成真；判断某制度是否现实，需要展示它怎样实现自由概念并处理自身矛盾。",
    englishDistinction:
      "Wirklich or actual is not whatever happens to exist, so the sentence cannot endorse any regime, custom, or atrocity. Conversely, rational does not mean that whatever an individual finds reasonable will become real; actuality requires showing how an institution realizes freedom and addresses its contradictions.",
  },
  "hegel-ethical-life": {
    context:
      "第 142 节开启“伦理生活”，位置在抽象法与道德之后：前者只给人格外在权利，后者把善放在主观意图，两者尚未统一。伦理生活把善作为家庭、市民社会和国家中的制度与习惯，使个人知道、意愿并通过行动维持它；后面三部分展开这种具体化。",
    englishContext:
      "Section 142 opens Ethical Life after Abstract Right and Morality: the former grants persons external rights, while the latter places the good in subjective intention, leaving the two ununified. Ethical life makes the good institutional and habitual in family, civil society, and state, where individuals know, will, and enact it; the next three parts unfold those forms.",
    distinction:
      "“活的善”不是现行习俗天然正确，也不是个人良心应无条件溶入共同体。制度只有使自由获得现实，才具有此处的伦理地位；抽象权利与主观反思并未被简单废除，而被保留为条件。",
    englishDistinction:
      "The living good does not make current custom automatically right or require conscience to dissolve unconditionally into community. Institutions have ethical standing here only insofar as they actualize freedom; abstract right and subjective reflection are preserved as conditions, not simply abolished.",
  },
  "hegel-civil-society-dependence": {
    context:
      "第 183 节在家庭解体为独立个人后引入市民社会的“需要体系”。每个人以自己的特殊利益为目的，却只能通过劳动分工、交换和他人的需要实现它，因此私人目的被一个无人单独设计的普遍网络中介；后续章节再处理司法、警察和同业团体。",
    englishContext:
      "Section 183 introduces the system of needs after the family disperses into independent persons. Each takes particular interest as an end yet can realize it only through division of labor, exchange, and others' needs, so private purposes are mediated by a universal network no individual designs; administration of justice, police, and corporations follow.",
    distinction:
      "相互依赖既不是自然和谐，也不保证市场结果公平；黑格尔随后正讨论偶然性、贫困和公共规制。所谓“普遍者”是私人行动的制度条件，不等于参与者已经出于公共善行动。",
    englishDistinction:
      "Interdependence is neither natural harmony nor a guarantee of fair market outcomes; Hegel proceeds to contingency, poverty, and public regulation. The universal is the institutional condition of private action, not evidence that participants already act for the common good.",
  },
  "hegel-poverty-rabble": {
    context:
      "第 244 节承接市民社会一方面扩大生产与需要、另一方面把劳动者交给偶然市场的分析。当相当人口失去维持成员身份的生活条件，也失去靠自身活动获得承认的感觉时，贫困不只是低收入，而会形成与社会规范疏离的“贫民”；下一节指出富裕社会反而难以自行解决过度贫困。",
    englishContext:
      "Section 244 follows the analysis of civil society expanding production and needs while exposing workers to market contingency. When a substantial population loses the material conditions of membership and the sense of recognition gained through self-support, poverty is more than low income and a socially alienated rabble can emerge; the next section says even a wealthy society struggles to remedy excessive poverty from within.",
    distinction:
      "“贫民阶层”不是把穷人的道德缺陷当作贫困原因，句中恰把失去荣誉感与制度性跌落连接起来。黑格尔诊断财富极化的矛盾，却没有在这几节给出一套足够的现代福利或民主方案。",
    englishDistinction:
      "Rabble does not make a moral defect of poor people the cause of poverty; the sentence links loss of standing to institutional exclusion. Hegel diagnoses a contradiction of concentrated wealth but these sections do not supply a sufficient modern welfare or democratic solution.",
  },
  "hegel-state-concrete-freedom": {
    context:
      "第 260 节在国家内部法部分总括家庭与市民社会如何成为政治整体的环节。具体自由要求特殊利益在其领域充分发展，同时让个人认识公共制度不是外在障碍，而是其权利得以成立的条件；随后文本转向宪制中不同权力怎样组织这种统一。",
    englishContext:
      "Section 260 summarizes how family and civil society become moments of the political whole within internal constitutional law. Concrete freedom lets particular interests develop in their own spheres while enabling individuals to recognize public institutions as conditions of their rights rather than alien barriers; the text then turns to the powers of the constitution that organize this unity.",
    distinction:
      "“国家”是按自由理念组织的伦理制度，不是任何掌权机器；个人性得到充分承认也排除单纯集体主义。引文不能证明黑格尔所偏好的具体君主立宪安排已穷尽自由的制度形式。",
    englishDistinction:
      "State here is an ethical institution organized by the idea of freedom, not any apparatus holding power; full recognition of individuality also rules out simple collectivism. The excerpt cannot establish that Hegel's preferred constitutional monarchy exhausts the institutional forms of freedom.",
  },
  "hegel-history-consciousness-freedom": {
    context:
      "《历史哲学》导论先说精神的本质是自由，并以东方世界“一人自由”、希腊罗马“少数人自由”、日耳曼世界“人本身自由”的图式说明意识范围的扩展。名句提出讲演的考察原则；后文借民族、国家与世界历史人物讨论自由意识怎样获得制度形态。",
    englishContext:
      "The Introduction first identifies freedom as the essence of spirit and sketches an expansion from the Oriental world where one is free, through Greece and Rome where some are free, to the Germanic world where humanity as such is free. The maxim states the lectures' principle of inquiry; peoples, states, and world-historical individuals then show how consciousness of freedom takes institutional form.",
    distinction:
      "这是黑格尔的解释框架，不是没有倒退、殖民暴力或被排除者的中性年表；其欧洲中心的分期也必须接受历史批判。“必然性”更不能被用来把胜利者造成的伤害宣布为道德正当。",
    englishDistinction:
      "This is Hegel's interpretive scheme, not a neutral chronology without regress, colonial violence, or excluded agents; its Eurocentric periodization requires historical criticism. Necessity cannot turn harms inflicted by victors into moral right.",
  },
  "hegel-cunning-of-reason": {
    context:
      "导论在讨论世界历史人物时指出，他们为荣誉、权力或特定目标行动，却可能促成自己没有意识到的普遍制度变化。所谓理性“让激情工作”描述特殊动机与历史结果的错位；句末强调承担损失的是具体行动者，随后的论述以凯撒等人物说明这种悲剧代价。",
    englishContext:
      "Discussing world-historical individuals, the Introduction argues that agents pursue honor, power, or determinate aims while bringing about universal institutional changes they do not comprehend. Reason making passions work names that divergence between particular motive and historical result; the sentence stresses that concrete agents bear the loss, and figures such as Caesar illustrate the tragic cost.",
    distinction:
      "“机巧”不是一个超自然心灵秘密操纵事件，也不是结果良好就洗白行动者的手段。它提供事后理解意图外后果的概念，不能让任何成功者自封为历史理性的工具。",
    englishDistinction:
      "Cunning is not a supernatural mind secretly manipulating events, nor does a later benefit cleanse an agent's means. It conceptualizes unintended results retrospectively and gives no successful actor authority to declare himself an instrument of historical reason.",
  },
  wollstonecraft: {
    context:
      "《女权辩护》第二章开头直接回应当时把柔弱、顺从和取悦男性称作女性美德的教育论。沃斯通克拉夫特先接受德性必须经由理性培养这一共同前提，再指出：若女性同样拥有灵魂，却被禁止发展理性，那么社会一面要求其有德、一面拆除了通往德性的道路。",
    englishContext:
      "Chapter II answers educational theories that praised weakness, obedience, and pleasing men as feminine virtues. Wollstonecraft accepts the shared premise that virtue requires cultivated reason, then exposes the contradiction: if women possess souls yet are prevented from developing reason, society demands virtue while closing its only path.",
    distinction:
      "“只有一条道路”主张两性服从同一道德尺度，并不是说每个人必须具有相同才能、生活或气质。诉诸灵魂是对当时宗教读者的内在反驳，不能缩成女性只因承担某种家庭角色才应受教育。",
    englishDistinction:
      "One path subjects both sexes to a common moral standard; it does not require identical talents, lives, or temperaments. The appeal to souls is an internal argument addressed to religious readers of the period, not a claim that women deserve education only for a family role.",
  },
  "wollstonecraft-one-standard-of-virtue": {
    context:
      "第三章延续对“女性性格”的批判，针对把男性勇气、判断力在女性身上改称傲慢或不自然的双重标准。引文把知识和德性的性质统一起来，后文再以体力差异不应支配心智教育为由，反对从平均身体差异推出两套道德人格。",
    englishContext:
      "Chapter III continues the critique of feminine character, targeting a double standard that redescribes courage and judgment as pride or unnaturalness when found in women. The excerpt makes knowledge and virtue the same in kind, and the chapter then argues that average physical differences should not govern education of the mind or generate two moral personhoods.",
    distinction:
      "“程度未必相同”是作者对时代争论的让步，不构成男性普遍理性更高的证明。共同标准也不要求忽视处境差异；它禁止先用制度制造依赖，再把依赖表现当作较低德性的证据。",
    englishDistinction:
      "The concession that degree may differ is not proof of universally superior male reason. A common standard also need not ignore unequal circumstances; it forbids institutions from producing dependence and then citing its effects as evidence of lesser virtue.",
  },
  "wollstonecraft-dependence-cunning": {
    context:
      "第四章分析由依赖培养出的“狡黠”、虚荣和间接影响力：当女性缺少公开教育、财产与职业能力时，只能通过美貌和讨好在私人关系中取得力量。名句把论证从权力倒置转向自治，随后强调健康、判断与劳动如何使女性不必靠操控男性生存。",
    englishContext:
      "Chapter IV analyzes cunning, vanity, and indirect influence cultivated by dependence: denied public education, property, and vocational capacity, women are pushed to seek power through beauty and pleasing men in private relations. The maxim redirects the argument from reversing domination toward self-government, followed by health, judgment, and work as conditions for living without manipulation.",
    distinction:
      "“支配自己”不是孤立的自助口号，也没有把制度压迫归咎于女性缺少意志力；作者正追查依赖性格怎样被制度制造。它拒绝的是交换统治位置，而不是放弃集体政治权利。",
    englishDistinction:
      "Power over themselves is not an isolated self-help maxim and does not blame institutional oppression on women's lack of will; the chapter traces how dependent character is produced. It rejects exchanging positions of domination, not collective political rights.",
  },
  "wollstonecraft-civic-representation": {
    context:
      "第九章把世袭财产、等级和性别服从放在“非自然区分”的共同批判中，并主张有财产、经营事务的女性事实上承担公共义务。她预见代表权主张会被嘲笑，仍指出法律若约束女性而议事机关没有她们的直接份额，所谓代她们表达利益就保留了专断统治。",
    englishContext:
      "Chapter IX joins hereditary property, rank, and sexual subordination under a critique of artificial distinctions, noting that women who hold property and conduct affairs already bear public obligations. Anticipating ridicule, Wollstonecraft argues that law remains arbitrary when it binds women while deliberative institutions give them no direct share and presume to represent their interests for them.",
    distinction:
      "引文提出代表原则而非一套完整选举制度，也不能把“拥有自己的代表”限制为由男性替女性设专席。它更广的逻辑是受法律者必须能作为政治主体发声，而不只是接受善意代理。",
    englishDistinction:
      "The passage advances a principle of representation, not a complete electoral design, and representatives of their own cannot be reduced to men holding designated seats for women. Its broader logic is that those bound by law must speak as political subjects rather than receive benevolent proxy.",
  },
  "wollstonecraft-national-education": {
    context:
      "第十二章先批评按阶级与性别隔离的私塾和寄宿学校，再提出白日制国民学校，让男女儿童在共同课程、游戏和公共规则中学习。省略号后的“许多平等者”解释共同教育的公民功能：同伴的反馈能纠正家庭宠爱、等级谄媚与性别表演造成的自我误认。",
    englishContext:
      "Chapter XII criticizes private and boarding schools segregated by rank and sex, then proposes national day schools where girls and boys share lessons, play, and public rules. After the ellipsis, many equals explains the civic function of coeducation: peer encounter corrects self-misperception produced by family indulgence, deference to rank, and gender performance.",
    distinction:
      "“共同受教育”不是只把女生放进原封不动的男性课程，也不保证同校本身会消除权力差异。论证要求制度把儿童作为平等者组织起来，因而仍需审查课程、资源与发言权是否真正平等。",
    englishDistinction:
      "Coeducation is not merely inserting girls into an unchanged male curriculum, and sharing a building cannot by itself eliminate power differences. The argument requires institutions to organize children as equals, leaving curriculum, resources, and voice open to scrutiny.",
  },
  bentham: {
    context:
      "《导论》第一章以痛苦与快乐开场，马上区分它们作为事实原因“决定我们会做什么”与作为评价标准“指出应做什么”的双重位置。后续各节把效用原则定义为按行为增减相关者幸福来赞成或反对，并把立法者的共同体尺度纳入计算。",
    englishContext:
      "Chapter I opens with pain and pleasure, immediately assigning them two roles: as factual causes they determine what we do, and as a standard they indicate what ought to be done. The following sections define utility as approving or disapproving actions by their tendency to augment or diminish affected happiness and extend the calculation to legislation.",
    distinction:
      "“两个主人”不是说每个行为都由有意识的快乐计算驱动，也没有从人追求快乐这一心理事实直接完成道德证明。它是全书的规范起点；哪些快乐、谁受影响和如何比较仍需后文论证。",
    englishDistinction:
      "The two masters do not imply that every act follows a conscious pleasure calculation, nor does the psychological fact of seeking pleasure by itself complete a moral proof. It is the book's normative starting point; which pleasures, whose interests, and how to compare them remain to be argued.",
  },
  "bentham-community-interests": {
    context:
      "第一章第 4 节在解释个人效用之后转向政府措施，预先拆解“共同体利益”可能造成的神秘化。把共同体称作虚构身体，是为了要求立法评价追溯到可感受快乐与痛苦的成员；下一节便说不先理解个人利益，就无法谈共同体利益。",
    englishContext:
      "After explaining individual utility, I.4 turns to measures of government and forestalls mystification of the community's interest. Calling the community a fictitious body requires legislative evaluation to return to members capable of pleasure and pain; the next section says communal interest cannot be understood without first understanding individual interest.",
    distinction:
      "“总和”不等于多数人的巨大收益可以自动抹掉少数人的严重损害，也没有说明分配、权利和不确定性如何加总。虚构在这里是法律分析术语，不是说共同制度或公共品不存在。",
    englishDistinction:
      "Sum does not automatically let a large majority gain erase severe harm to a minority, and it does not yet specify aggregation across distribution, rights, or uncertainty. Fictitious is a term of legal analysis, not a denial that institutions or public goods exist.",
  },
  "bentham-four-sanctions": {
    context:
      "第三章承接行为动机分析，把同一种快乐或痛苦按来源分为自然、政治、道德和宗教制裁：身体过程、国家官员、周围人的评价与超自然信念。后面各节逐一说明它们有时共同作用、有时彼此冲突，为立法者区分法律惩罚与其他行为压力提供地图。",
    englishContext:
      "Chapter III continues the analysis of motives by classifying pleasures and pains according to four sources: physical processes, political officials, the judgments of surrounding people, and religious belief. Subsequent sections show them reinforcing or conflicting with one another, giving legislators a map that distinguishes legal punishment from other behavioral pressures.",
    distinction:
      "sanction 在这里是赋予规则约束力的后果来源，不只是现代意义的经济或外交制裁。列出四类并不等于它们都道德正当；舆论、法律和宗教惩罚本身仍要接受效用检验。",
    englishDistinction:
      "Sanction here means a source of consequences lending force to a rule, not only economic or diplomatic penalties in current usage. Listing four kinds does not justify them morally; public opinion, law, and religious punishment must themselves pass the test of utility.",
  },
  "bentham-felicific-circumstances": {
    context:
      "第四章把效用原则转成审议步骤：先衡量一个人的单次快乐或痛苦的强度、持续、确定性和远近，再加入它产生同类后果的繁殖性及不混入反面后果的纯度。省略号跨过这两项，最后的“广度”才把计算从个人扩展到受影响人数。",
    englishContext:
      "Chapter IV turns utility into a deliberative procedure: first assess one person's pleasure or pain by intensity, duration, certainty, and propinquity, then add fecundity—its tendency to produce more of the same—and purity—its freedom from opposite effects. The ellipsis crosses those two factors before extent expands the assessment to the number affected.",
    distinction:
      "这份清单是防止只看即时强度的比较框架，不是声称所有价值都能获得精确数字或相同单位。人数只是第七项，不能脱离每人的后果、发生概率和长期连锁而单独决定政策。",
    englishDistinction:
      "The list is a comparative discipline against attending only to immediate intensity, not a claim that every value admits exact numbers in one unit. Headcount is only the seventh dimension and cannot decide policy apart from each person's consequences, probability, and longer chains.",
  },
  "bentham-limits-of-punishment": {
    context:
      "第十三章在全书设计刑法之前先问哪些情形不应处罚。第 2 节从惩罚本身制造痛苦出发，把举证责任交给处罚者；接下来的四类包括无根据、无效、代价过高和不必要，分别检验是否有害、能否预防、是否得不偿失及是否有较温和手段。",
    englishContext:
      "Before designing penal law, Chapter XIII asks when punishment should not be inflicted. Section 2 begins from punishment itself producing pain and places the burden on the punisher; the four following categories—groundless, inefficacious, unprofitable, and needless—test harm, preventive capacity, excessive cost, and less burdensome alternatives.",
    distinction:
      "“更大的恶”不能只由惩罚机关宣称，也不限于报复满足；必须比较可归因的预防效果与全部附带痛苦。引文没有证明凡有效威慑都正当，因为比例、误判和替代措施仍会改变效用判断。",
    englishDistinction:
      "The greater evil cannot merely be asserted by the punishing authority or reduced to satisfaction in retribution; attributable prevention must be weighed against all collateral pain. The excerpt does not justify every effective deterrent, since proportionality, error, and alternatives alter the utility judgment.",
  },
  schopenhauer: {
    context:
      "《作为意志和表象的世界》第一节用这句话建立全书第一视角：有认识的主体从不接触一个完全脱离认识形式的“对象”，对象总作为对主体的表象出现。紧接着文本把对象的基本形式列为空间、时间和因果，并强调主体本身不是这些形式中的对象。",
    englishContext:
      "The first section of The World as Will and Representation establishes the book's first standpoint: a knowing subject never encounters an object wholly outside the forms of knowing; an object appears as representation for a subject. The text immediately identifies space, time, and causality as basic object-forms and says the subject itself is not an object within them.",
    distinction:
      "“我的表象”不是说我的私人想象创造了公共世界，也不是否认其他主体。mein 标出一切对象都与认识主体相关；全书第二部分还会从身体经验转向意志，说明表象视角并非完整本体论。",
    englishDistinction:
      "My representation does not mean my private imagination creates the public world or deny other subjects. My marks every object's relation to a knowing subject; the book's second part turns through bodily experience to will, showing that representation is not its complete ontology.",
  },
  "schopenhauer-principle-sufficient-reason": {
    context:
      "第 15 节讨论科学说明为何总在充足理由律的某种形式下连接表象：数学给空间时间根据，自然科学给因果根据，逻辑给认识根据。引文在这些说明的效力与范围之间划线：它们能从一个现象追到另一个现象，却无法以同一链条回答世界作为整体为何存在。",
    englishContext:
      "Section 15 explains scientific connection of representations under forms of sufficient reason: mathematics gives spatial-temporal grounds, natural science causal grounds, and logic grounds of knowing. The excerpt draws a line between their force and scope: they lead from one appearance to another but cannot use the same chain to answer why the world as a whole exists.",
    distinction:
      "这不是反科学或允许在因果空白处任意填入目的，而是反对把适用于现象内部的解释形式扩成整体的第一因。叔本华自己的意志论仍需另一路径论证，不能由科学解释有边界直接推出。",
    englishDistinction:
      "This is not anti-scientific and does not license arbitrary purposes in causal gaps; it rejects extending an explanatory form valid within appearance into a first cause of the whole. Schopenhauer's own account of will still needs a separate argument and does not follow merely from limits of science.",
  },
  "schopenhauer-body-and-will": {
    context:
      "第 18 节从只把身体当空间中的对象所造成的谜题出发：主体还以完全不同方式直接知道饥饿、努力和动作。意志行为与身体运动并非先有内在原因再产生外在效果，而是同一事件分别在自我意识与外部直观中的给予；这成为由表象世界通向意志的“钥匙”。",
    englishContext:
      "Section 18 begins from the puzzle left by treating the body only as an object in space: the subject also knows hunger, effort, and movement immediately in a different way. An act of will and a bodily movement are not an inner cause followed by an outer effect but one event given in self-consciousness and external intuition, providing the key from representation to will.",
    distinction:
      "“同一件事”不否认神经、生理或外部因果说明，也不意味着想到动作就必然成功。它标示第一人称行动经验与第三人称身体表象的双重通达，尚未单独证明宇宙万物都是意志。",
    englishDistinction:
      "One event does not deny neural, physiological, or external causal explanation, nor make every intended movement succeed. It identifies first-person agency and third-person bodily representation as two accesses to action and does not alone prove that all reality is will.",
  },
  "schopenhauer-blind-striving": {
    context:
      "第 27 节把从身体认识的意志逐级推广到自然：重力、植物生长和动物本能被描述为同一意志的不同客体化等级。最低层的“盲目冲动”没有表象出的目标或认识机关；随着生命形式复杂，意志才借智力获得动机，却仍不是由理性创造。",
    englishContext:
      "Section 27 extends will from bodily self-knowledge through levels of nature: gravity, plant growth, and animal instinct become grades of one will's objectification. At the lowest level blind striving has no represented aim or cognitive organ; in more complex life, will acquires motives through intellect but is not created by reason.",
    distinction:
      "“意志”在这里已超出有意识选择，不能直接拿日常的愿望或决策替代；“盲目”也不是道德谴责。把物理力称作意志是形而上学同一化，不能冒充可由这句短引验证的自然科学结论。",
    englishDistinction:
      "Will here exceeds conscious choice and cannot be replaced by ordinary wishes or decisions; blind is not a moral condemnation. Naming physical forces will is a metaphysical identification, not a scientific result verified by this short excerpt.",
  },
  "schopenhauer-desire-suffering": {
    context:
      "第 38 节位于审美论入口，先回顾意志支配下的日常意识为何在欠缺、短暂满足和新欲望之间摆动。一个欲望满足并未结束意愿结构，未满足者仍占多数；若对象全都缺席，又会出现无聊。下一步正以审美观照的暂时无意志状态对照这条循环。",
    englishContext:
      "Section 38 opens the aesthetics by recalling why ordinary consciousness under the will oscillates among lack, brief satisfaction, and renewed desire. Satisfying one wish does not end willing while many remain frustrated; if objects of desire disappear, boredom emerges. The next move contrasts this cycle with the temporarily will-less state of aesthetic contemplation.",
    distinction:
      "“一切意愿源于缺乏”是体系性的悲观诊断，不等于每项计划、关爱或创造都在主观感受上痛苦。它也不能推出应忽略可减少的具体苦难；后文的伦理恰把他者受苦视为同情的理由。",
    englishDistinction:
      "All willing arising from lack is a systematic pessimistic diagnosis, not a claim that every project, care, or creation feels painful. It also does not imply ignoring preventable suffering; the later ethics makes another's suffering a reason for compassion.",
  },
  "schopenhauer-aesthetic-contemplation": {
    context:
      "第 34 节说明认识通常受充足理由律支配，追踪对象与我的目的、因果和位置的关系；审美时注意力却沉入对象的形式，不再问它对欲望有什么用。个体由此暂时成为“纯粹认识主体”，并把对象把握为理念；随后的艺术等级都建立在这次注意转换上。",
    englishContext:
      "Section 34 says ordinary knowing follows sufficient reason, tracking an object's causal, spatial, and purposive relations to me. In aesthetic experience attention is absorbed in form and ceases asking how the object serves desire. The individual temporarily becomes a pure subject of knowing and apprehends an Idea; the hierarchy of arts that follows rests on this shift of attention.",
    distinction:
      "“无意志”是短暂悬置个人欲求，不是人失去行动能力、身份或身体，也不保证艺术观看没有历史偏见。审美缓解在本卷中是一条间歇路径，不能与第 68 节更彻底的意志否定混同。",
    englishDistinction:
      "Will-less means a temporary suspension of personal striving, not loss of agency, identity, or body, and it does not guarantee historically unbiased looking. Aesthetic relief is intermittent in this volume and must not be confused with the more radical denial of will in §68.",
  },
  "schopenhauer-music-will": {
    context:
      "第 52 节在建筑、雕塑、绘画和诗歌之后处理音乐。其他艺术摹写意志在不同等级中客体化的理念，音乐却以低音、旋律、张力与解决的平行结构直接对应意志运动，因此不必先再现某个可见对象；该节随即用和声与旋律详述这种类比。",
    englishContext:
      "Section 52 treats music after architecture, sculpture, painting, and poetry. Other arts copy Ideas in which will is objectified at different grades, whereas bass, melody, tension, and resolution in music parallel the movement of will without first depicting a visible object; the section then elaborates that analogy through harmony and melody.",
    distinction:
      "“意志自身的摹本”是叔本华体系内的形而上学地位，不表示一首曲子逐项编码宇宙事实，也不贬低其他艺术为无价值影子。音乐的强烈效果提供类比动机，却不是该本体论主张的实验性证明。",
    englishDistinction:
      "Copy of will itself is a metaphysical status within Schopenhauer's system; it does not make a composition a point-by-point code of cosmic facts or render other arts worthless shadows. Music's force motivates the analogy but is not experimental proof of the ontology.",
  },
  "schopenhauer-compassion": {
    context:
      "《论道德的基础》第三部分先排除以奖惩、自利或抽象命令为动机的行为，再问一个人的痛苦如何能直接成为另一个人的行动理由。第八章把同情解释为个体隔离暂时被穿透，并以不伤害的正义与积极帮助的仁爱为两级；引文总结这种经验动机的可靠性。",
    englishContext:
      "Part III of On the Basis of Morality first excludes reward, punishment, self-interest, and abstract command as motives of genuine moral worth, then asks how one person's pain can directly motivate another. Chapter VIII treats compassion as a momentary penetration of individual separation and distinguishes the justice of not harming from benevolence that actively helps; the excerpt summarizes that experiential motive.",
    distinction:
      "“不需要决疑术”强调根本动机，不表示同情在复杂资源冲突中自动给出正确行动，也不排斥规则与事实判断。无限同情同样不能要求帮助者毁掉自身，从而制造更多无法回应的伤害。",
    englishDistinction:
      "Needing no casuistry emphasizes the root motive; it does not make compassion automatically decide complex conflicts of resources or displace rules and factual judgment. Boundless compassion also cannot simply require a helper's self-destruction when that creates further unanswered harm.",
  },
  "schopenhauer-denial-of-will": {
    context:
      "第 68 节沿圣徒与苦行者的生活把同情所得的洞见推进到意志否定：若个体看见同一意志在所有生命中无尽受苦，满足自己的某个欲望便不再像最终解脱。引文把这种认识描述为使动机沉默，随后列出自愿贫困、贞洁和逆境中的平静作为征象。",
    englishContext:
      "Section 68 carries compassion's insight into denial of will through accounts of saints and ascetics. If the individual sees one will suffering endlessly in all life, satisfying a private desire no longer appears as final release. The excerpt describes such knowledge quieting motives, followed by voluntary poverty, chastity, and equanimity under adversity as signs.",
    distinction:
      "“背离生命”是体系中的禁欲理想，不是自杀命令；叔本华明确认为自杀仍以强烈方式意愿另一种生命条件。描述这种救济也不等于它适合所有读者，或允许把贫困与受害浪漫化。",
    englishDistinction:
      "Turning from life is an ascetic ideal within the system, not an instruction to suicide; Schopenhauer explicitly treats suicide as continued willing for a different condition of life. Describing this release does not make it suitable for every reader or license romanticizing deprivation and victimization.",
  },
  "kierkegaard-aesthetic-immediacy": {
    context:
      "〈酒中真言〉把五位宴饮者安排成竞赛式演说，Victor Eremita 在谈爱情时坚持“好的东西必须立刻到来”，以排斥需要历史、承诺和等待的关系。它是审美生存把价值系于瞬间强度的典型声音；全书随后让不同生活立场彼此碰撞，而非由叙述者裁定此句胜出。",
    englishContext:
      "In In Vino Veritas five banquet speakers compete in speeches. Discussing love, Victor Eremita insists that whatever is good must come immediately, excluding relations that require history, commitment, and waiting. His line exemplifies an aesthetic existence tying value to momentary intensity; the book then confronts different life-views without having the narrator certify this one.",
    distinction:
      "immediately 在这里是人物立场的关键词，不是克尔凯郭尔本人给效率或直觉的普遍格言。若脱离伪名、宴会与讽刺结构，它甚至会遮掉文本正在暴露的局限：不能持续的“好”如何进入人生。",
    englishDistinction:
      "Immediately is a keyword in a character's position, not Kierkegaard's universal maxim about efficiency or intuition. Detached from pseudonym, banquet, and irony, it conceals the limitation under examination: how can a good that cannot endure enter a life?",
  },
  "kierkegaard-infinite-resignation": {
    context:
      "《恐惧与战栗》的“初步倾诉”先借无限弃绝骑士说明一个可以理解的运动：放弃有限愿望在此世实现的要求，同时在永恒意识中保存其意义。引文把它称为信仰前最后阶段，随后才以信仰骑士“凭荒谬之力”重新接受有限者，区分两个运动而非把放弃本身叫信仰。",
    englishContext:
      "The Preliminary Expectoration first uses the knight of infinite resignation to describe an intelligible movement: surrendering the demand that a finite wish be fulfilled in this world while preserving its meaning in eternal consciousness. The excerpt calls this the final stage before faith; only then does the knight of faith receive the finite again by virtue of the absurd, distinguishing rather than identifying the two movements.",
    distinction:
      "“弃绝”不是消极认输、压抑悲伤或把不公说成命运；它是对所爱之物做出的完整精神运动。文本也没有保证信仰会让任何具体愿望成真，亚伯拉罕故事的悖论正使这种确信不能变成通用预测法。",
    englishDistinction:
      "Resignation is not passive defeat, repressed grief, or acceptance of injustice as fate; it is a complete spiritual movement concerning what is loved. Nor does the text guarantee that faith fulfills any particular wish—the Abraham story's paradox prevents such confidence from becoming a general predictive method.",
  },
  "kierkegaard-faith-paradox": {
    context:
      "在同一节中，信仰骑士首先完全承认按有限计算愿望不可能实现，并已完成无限弃绝；只有在这一点之后，叙述者才说他“诉诸荒谬”而相信有限者仍会归还。句子的推进针对的是信仰不同于概率推断之处，不是用荒谬替代前面的认识与弃绝。",
    englishContext:
      "In the same section the knight of faith first fully acknowledges that, by finite calculation, the wish is impossible and has completed infinite resignation. Only then does the narrator say he appeals to the absurd and believes the finite will be restored. The movement identifies how faith differs from probabilistic inference; absurdity does not replace the preceding acknowledgment and resignation.",
    distinction:
      "“荒谬”不是逻辑矛盾越明显就越真，也不许可忽视证据去相信方便的事情。它限定在伪名作者对亚伯拉罕式宗教信仰的刻画中，不能被移作反理性决策的一般许可证。",
    englishDistinction:
      "The absurd does not make a claim truer as its logical contradiction grows, nor license believing convenient things against evidence. It is bounded by a pseudonymous portrayal of Abrahamic religious faith and cannot serve as a general permit for irrational decision-making.",
  },
  "kierkegaard-crowd-untruth": {
    context:
      "附录〈献给“那个单独者”〉回顾作者事业为何面向逐个读者，而非把基督教真理交给数量表决。引文依次排除贫富、贵贱和时代差别，说明批评对象不是某群人的素质，而是“群众”这一结构怎样把决定分摊成无人完整承担的份额。",
    englishContext:
      "The appendix For the Dedication to That Single Individual explains why the authorship addresses readers one by one rather than entrusting Christian truth to a numerical vote. The excerpt excludes class, rank, and period in turn: its target is not the quality of a particular group but the structure by which a crowd divides a decision until no person bears it whole.",
    distinction:
      "“群众是不真理”不表示多数意见必假、公共行动不可能或孤独者天然正确。它批判匿名性对责任的稀释；有姓名、可问责并容许异议的共同判断不等同于这里的群众概念。",
    englishDistinction:
      "The crowd is untruth does not make every majority opinion false, collective action impossible, or a solitary person automatically right. It criticizes anonymity's dilution of responsibility; shared judgment with identifiable accountability and dissent is not identical to this concept of crowd.",
  },
  "kierkegaard-repetition-forward": {
    context:
      "《重复》开篇由康斯坦丁比较希腊的回忆学说与现代人可能追求的重复：回忆把已经存在的东西向后取回，重复则要在时间中重新获得，从而被戏称为“向前回忆”。小说随后用青年恋爱与康斯坦丁重访柏林的失败实验，检验新生是否可能只是复制旧场景。",
    englishContext:
      "At the opening of Repetition, Constantin compares Greek recollection with a modern search for repetition: recollection retrieves backward what has existed, whereas repetition would regain it in time and is therefore called recollecting forward. The young man's love and Constantin's failed return to Berlin then test whether renewal could ever be mere reproduction of an old scene.",
    distinction:
      "“向前回忆”不是预测未来，也不是把成功习惯机械重复；它以悖论命名既保持连续又真正更新的存在问题。作为伪名叙述者的命题，它还会被情节的失败修正，不能孤立成作者的时间理论定论。",
    englishDistinction:
      "Recollecting forward is neither prediction nor mechanical repetition of a successful habit; the paradox names renewal that would preserve continuity without copying. As a pseudonymous narrator's thesis it is also qualified by the plot's failures and cannot stand alone as the author's settled theory of time.",
  },
  mill: {
    context:
      "《论自由》第一章先提出社会可正当强制个人的唯一目的，是防止对他人的伤害，并明确排除为当事人自身身体或道德利益而强迫。名句总结这种自涉领域，随后限定适用者为能力成熟的成年人，并把对他人的明确义务留在社会权限内。",
    englishContext:
      "Chapter I first states that society may coerce an individual only to prevent harm to others and expressly excludes coercion merely for that person's physical or moral good. The maxim summarizes this self-regarding sphere, after which Mill limits it to mature adults and leaves definite obligations to others within social authority.",
    distinction:
      "“主权者”不是说行动永远只影响自己，也不取消劝说、批评或自愿互助；界线针对强制。儿童、依赖关系、欺诈与风险外溢等情形需要额外判断，不能靠这一句自动分类。",
    englishDistinction:
      "Sovereign does not mean actions never affect others, nor does it abolish persuasion, criticism, or voluntary assistance; the boundary concerns coercion. Children, dependency, fraud, and risk spillovers require further judgment and cannot be classified by this sentence alone.",
  },
  "mill-fallibility-free-discussion": {
    context:
      "第二章先假定被压制的意见可能为真：拒绝听取它，就以个人或时代的判断替全人类作最终裁决。名句概括这第一条理由；后文继续讨论即使意见错误，它与真理冲突也能暴露理由，而部分真理往往要靠公开争论重新组合。",
    englishContext:
      "Chapter II first supposes the silenced opinion may be true: refusing to hear it lets an individual or age decide finally for humanity. The maxim states that first reason; Mill then argues that even an erroneous view can expose the grounds of truth through collision and that partial truths often need discussion to be recombined.",
    distinction:
      "承认可错不要求所有言论在任何场合获得同样扩音，也不否认煽动、威胁或骚扰会改变行为性质。论证针对以“我们已确定它错了”为由封闭讨论；它没有让主张免于证据、反驳和场合规则。",
    englishDistinction:
      "Fallibility does not require equal amplification for every utterance in every setting or deny that incitement, threat, and harassment change an act's character. The argument opposes closing discussion because we are certain a view is false; it does not exempt claims from evidence, rebuttal, or forum rules.",
  },
  "mill-individuality-experiments": {
    context:
      "第三章从自由讨论转向生活方式，先说真理必须在品格中被活出来，而盲从习俗不会训练判断、欲望和选择能力。“生活实验”因此让不同人按自身性格试行计划，使社会从成功与失败中学习；紧接文本把自发性视为幸福与个人、社会进步的要素。",
    englishContext:
      "Chapter III moves from free discussion to ways of living. Truth must be embodied in character, while automatic conformity to custom does not exercise judgment, desire, or choice. Experiments of living let people try plans suited to their character and let society learn from success and failure; Mill then treats spontaneity as part of well-being and progress.",
    distinction:
      "“实验”不把他人变成未经同意的试验对象，也不保护造成明确伤害的生活方案。多样性有认识与发展价值，却仍受伤害原则和公平承担失败成本的条件限制。",
    englishDistinction:
      "Experiment does not turn other people into nonconsenting test subjects or protect ways of life that inflict definite harm. Diversity has epistemic and developmental value but remains bounded by the harm principle and fair allocation of failure's costs.",
  },
  "mill-social-authority-boundary": {
    context:
      "第四章直接处理个人主权与社会控制的边界。密尔先承认他人可以因一个人的自涉品格而避开、警告或降低评价，但这种自然后果不同于有计划的惩罚；引文最后把伤害他人的行为转入责任、补偿乃至法律强制的另一套处理。",
    englishContext:
      "Chapter IV directly addresses the boundary between individual sovereignty and social control. Mill allows others to avoid, warn against, or lower their opinion of a person's self-regarding character, but distinguishes those natural consequences from deliberately inflicted punishment; the excerpt then moves other-harming conduct into a different regime of accountability, reparation, and possible law.",
    distinction:
      "“只关乎自己”不是由行动者单方面宣布，经济依赖、照护义务与可识别风险可能使行为具有他涉部分。反过来，令人厌恶或不受欢迎的生活方式也不因此等于伤害。",
    englishDistinction:
      "Self-regarding is not whatever an actor declares it to be; economic dependence, duties of care, and identifiable risk may give conduct an other-regarding part. Conversely, a disliked or unpopular way of life is not therefore harmful.",
  },
  "mill-happiness-as-end": {
    context:
      "《功利主义》第二章在回答功利主义把人降为牲畜的反对之前，先用这段给出最大幸福原则的正式定义。紧接文本澄清所涉幸福不是行动者一人的快乐，而是所有相关者的幸福；随后对快乐的品质差异作补充。",
    englishContext:
      "Before answering the objection that utilitarianism is a doctrine worthy only of swine, Chapter II gives this formal statement of the greatest-happiness principle. Mill immediately clarifies that the relevant happiness is not the agent's alone but that of all concerned, then adds differences in the quality of pleasures.",
    distinction:
      "“促进幸福的程度”评价的是规则与行动的整体倾向，不等于每次决定都能精确预测净快乐。把幸福定义为快乐与免痛也未授权多数人的轻微享受随意压过少数人的安全，后文正以正义和权利处理这种约束。",
    englishDistinction:
      "Degree of promoting happiness evaluates tendencies of actions and rules; it does not imply exact prediction of net pleasure in every choice. Defining happiness as pleasure and absence of pain also does not license a majority's small enjoyment to override a minority's security, which the later account of justice and rights addresses.",
  },
  "mill-higher-pleasures": {
    context:
      "第二章在承认效用论以快乐为最终目的后，回应“猪的学说”指控：人类具有智力、情感、想象和道德感等能力，其运用产生不同品质的快乐。省略处提出两种都熟悉的“有能力判断者”，引文后再用宁做不满足的人、不做满足的猪说明选择标准。",
    englishContext:
      "After accepting pleasure as the ultimate end, Chapter II answers the doctrine-of-swine objection: humans have intellectual, emotional, imaginative, and moral capacities whose exercise yields pleasures differing in quality. The omitted passage introduces competent judges acquainted with both kinds, and the text then illustrates their preference through the dissatisfied human and satisfied pig.",
    distinction:
      "“较高”不是按社会阶级、昂贵品味或作者偏好给文化排序，判断资格来自真实接触两类经验。熟悉者的偏好也可能分歧，因此这段给出比较标准而非不容争议的固定清单。",
    englishDistinction:
      "Higher does not rank culture by class, expensive taste, or authorial preference; qualification comes from genuine acquaintance with both experiences. Informed judges may still disagree, so the passage offers a comparative criterion rather than an incontestable list.",
  },
  "mill-internal-sanction": {
    context:
      "第三章先列希望赞许、害怕责备和宗教期待等外在制裁，再问功利道德自身最深的内在约束。密尔把它放在人对他人的社会感情及良心痛苦中，并认为平等合作的发展会使个人越来越难把自己的利益设想为与共同利益全然敌对。",
    englishContext:
      "Chapter III first lists external sanctions such as desire for approval, fear of blame, and religious expectation, then asks for utilitarian morality's deepest internal bond. Mill locates it in social feeling for others and the pain of conscience, arguing that development of equal cooperation makes it harder to imagine one's interest as wholly hostile to the common interest.",
    distinction:
      "社会感情是效用原则的动机基础，不等于群体赞同决定道德真理；群体偏见也能强烈内化。它说明人为什么可能关心普遍幸福，却不能替代对何者真正促进幸福的批判判断。",
    englishDistinction:
      "Social feeling motivates the principle of utility but does not make group approval determine moral truth; prejudice can be deeply internalized too. It explains why people can care about general happiness but cannot replace critical judgment about what actually promotes it.",
  },
  "mill-proof-of-utility": {
    context:
      "第四章先提醒终极目的不能像手段那样由更高目的演绎证明，只能展示它事实上作为目的被欲求。省略号把“可听”与“可见”的类比分开，引文再以人欲求幸福说明幸福可欲；后续还必须从每个人的幸福对本人是善，推进到总体幸福是所有人的善。",
    englishContext:
      "Chapter IV cautions that an ultimate end cannot be deduced from a higher end as an instrument can; one can only show it is in fact desired as an end. The ellipsis crosses the audible/visible analogy before actual desire is offered as evidence that happiness is desirable; Mill must still move from each person's happiness being a good to that person toward general happiness as a good to all.",
    distinction:
      "desirable 在论证中从“能够被欲求”滑向“值得欲求”，正是著名争议点，不能假装这句已消除事实与应当的间隙。人会欲求幸福之外的事物，密尔后面须把德性等解释为幸福的组成部分。",
    englishDistinction:
      "The movement of desirable from capable of being desired toward worthy of desire is the argument's famous disputed point; the sentence does not simply close the fact/value gap. People desire things besides happiness, so Mill later has to treat virtue and similar ends as parts of happiness.",
  },
  "mill-justice-security": {
    context:
      "第五章先分析正义观念中的法律权利、应得、守信、公平和不偏私，再追问它为何带有比一般效用更强的义务感。省略段落围绕安全说明：权利保护的利益对任何持续生活计划都不可缺，因此报复冲动与扩展的同情结合，形成要求社会共同防卫的正义感。",
    englishContext:
      "Chapter V analyzes legal rights, desert, promise, fairness, and impartiality within ideas of justice, then asks why justice carries a stronger obligation than utility generally. Around the omitted material, security supplies the answer: interests protected as rights are indispensable to any continuing life-plan, so defensive resentment combines with enlarged sympathy into a demand for society's common protection.",
    distinction:
      "把正义联系安全不是把国家安全口号置于个人权利之上，security 首先是每个人免受伤害与可预期生活的利益。强烈感受也不单独证明某项权利；其普遍效用与分配仍需论证。",
    englishDistinction:
      "Connecting justice to security does not put slogans of state security above individual rights; security first names each person's interest in protection from harm and a predictable life. Intense feeling alone also proves no particular right; its general utility and distribution require argument.",
  },
  "mill-subjection-women": {
    context:
      "第一章反驳以“女性天性”维护法律从属的论证：两性从未在平等自由条件下被观察，现有差异混合了训练、奖惩与强制。省略处列举像温室植物般的定向培育，引文末把压抑和刺激并置；接下来密尔要求以自由发展后的经验而非服从制度的产物判断能力。",
    englishContext:
      "Chapter I rebuts appeals to female nature in defense of legal subordination: the sexes have never been observed under conditions of equal freedom, so existing differences combine training, reward, and coercion. Across the ellipsis Mill compares directed cultivation to a hothouse plant; suppression and stimulation are then paired before he demands evidence from free development rather than the products of obedience.",
    distinction:
      "“无人知道”否定的是当时关于固定性别本性的证据资格，并非断言生物差异绝不存在。它也不要求女性通过模仿男性证明平等；开放机会正是为了让能力与生活形态不再由预设结论塑造。",
    englishDistinction:
      "No one knows denies the evidential standing of claims about fixed sex nature under existing conditions; it does not assert that no biological difference exists. Nor must women prove equality by imitating men: open opportunity is meant to stop prior assumptions from shaping capacities and lives.",
  },
  marx: {
    context:
      "《雾月十八日》第一章在名句前说历史大事仿佛重复出现，随后马上把人的能动性与继承条件并置。引文之后，“死去世代的传统”像梦魇压在活人头上，革命者又借旧服装和旧口号理解新斗争；全章用 1848—1851 年法国联盟变化展示行动怎样受既有阶级与国家机器制约。",
    englishContext:
      "Chapter I of The Eighteenth Brumaire introduces apparent historical repetition before placing agency beside inherited conditions. Immediately afterward, the tradition of dead generations weighs on the living while revolutionaries borrow old costumes and slogans to grasp new struggles; the chapter then tracks French alliances from 1848 to 1851 to show action constrained by classes and state machinery already at hand.",
    distinction:
      "“创造历史”排除宿命论，“不是任意条件”又排除意志万能；二者不能删去一边。既有条件也不是静止背景，它们会被集体行动重组，只是行动不能假装自己从零开始。",
    englishDistinction:
      "Making history excludes fatalism, while not choosing the conditions excludes voluntarism; neither half may be dropped. Inherited conditions are not static scenery and can be reorganized collectively, but action cannot pretend to begin from nothing.",
  },
  "marx-social-being": {
    context:
      "1859 年《序言》先回顾马克思研究法律与国家时如何转向市民社会和政治经济学，再以生产关系、生产力和上层建筑勾勒研究“总结果”。名句位于物质生活生产方式制约社会、政治与精神过程之后，下一段转向生产力同既有生产关系冲突所开启的社会革命时代。",
    englishContext:
      "The 1859 Preface recounts Marx's move from law and the state to civil society and political economy, then sketches his general result through productive forces, relations of production, and superstructure. The maxim follows the claim that production of material life conditions social, political, and intellectual processes; the next paragraph turns to conflict between productive forces and established relations.",
    distinction:
      "“决定”不是每个观念与经济位置一一对应的机械因果，也不否认思想、政治和组织反过来参与历史。社会存在指结构化的生活与生产关系，不能缩成个人收入或一句“环境决定人”。",
    englishDistinction:
      "Determines is not a one-to-one mechanical mapping from economic position to every idea, nor does it deny that thought, politics, and organization act back upon history. Social being means structured relations of life and production, not personal income or the slogan environment determines people.",
  },
  "marx-alienated-labor-product": {
    context:
      "“异化劳动”先从政治经济学承认的事实——劳动者生产越多却越贫困——出发，而暂不预设私有财产的正当性。引文后把产品描述为与生产者相对立的陌生力量：劳动对象化本可实现能力，但当产品被他人占有时，对象化反过来成为丧失；随后论证扩展到劳动活动、自身类生活及他人关系。",
    englishContext:
      "Alienated Labour begins from a fact admitted by political economy—the worker grows poorer as production expands—without presupposing private property's legitimacy. The product is then described as an alien power confronting its producer: objectification could realize capacity, but under another's ownership it becomes loss. The analysis next extends to laboring activity, species-life, and relations to other people.",
    distinction:
      "“越生产越贫穷”是特定所有与交换关系中的反向结构，不是说任何提高产出都会使每名劳动者收入下降。异化也不等于主观讨厌工作；即使感到满足，产品、过程与决定权的关系仍可能被制度性占有。",
    englishDistinction:
      "Poorer through producing names a reversal under specific property and exchange relations, not a prediction that every productivity increase lowers every worker's income. Alienation is also not mere dislike of work; product, process, and decision can be institutionally appropriated even when a worker feels satisfaction.",
  },
  "marx-species-being": {
    context:
      "手稿在讨论劳动活动的异化后，把人与动物比较：动物的生命活动与自身直接同一，人却能把自己的活动作为意识对象，并超出即时身体需要进行普遍生产。有意识生命活动因此界定“类存在”，下一步说明异化劳动如何把这种自由活动降为仅维持个体生存的手段。",
    englishContext:
      "After treating alienation from laboring activity, the manuscript compares humans and animals: an animal is immediately one with its life-activity, while a human can make activity an object of consciousness and produce beyond immediate bodily need. Conscious life-activity thus defines species-being, after which alienated labor reduces free activity to a mere means of individual survival.",
    distinction:
      "“类存在”不是生物分类名称或人天然高贵的口号，而是共同、能反思且能多尺度生产的能力概念。区分动物并不能推出动物没有复杂认知，更不能为支配非人生命提供伦理许可。",
    englishDistinction:
      "Species-being is not merely a biological taxon or a slogan of innate human nobility; it names shared, reflective, many-sided productive capacity. The contrast cannot establish that animals lack complex cognition and gives no ethical permission to dominate nonhuman life.",
  },
  "marx-use-exchange-value": {
    context:
      "《资本论》第一章从商品的双重性开始：具体性质在使用中满足需要，构成不依赖劳动量的使用价值。省略号跨到交换价值，它起初只呈现为一种商品同另一种商品的可变量比率；随后马克思追问不同用途为何能被等同，转入价值与劳动的分析。",
    englishContext:
      "Capital I begins with the commodity's double character. Its concrete qualities satisfy needs in use and constitute use-value without being measured by labor quantity. Across the ellipsis exchange-value first appears as a variable ratio between commodities; Marx then asks what permits unlike uses to be equated and moves toward value and labor.",
    distinction:
      "使用价值不是“对社会有益”的道德评价，交换价值也不等于任何时刻的标价。引文提出分析层次，不能推出有用物必有市场价值，或价格会始终严格等于劳动价值。",
    englishDistinction:
      "Use-value is not a moral judgment of social usefulness, and exchange-value is not simply the posted price at any moment. The distinction does not imply every useful thing has market value or that price always exactly equals labor value.",
  },
  "marx-abstract-labor": {
    context:
      "第一节先从交换中把裁缝、织布等具体劳动的不同用途抽去，得到商品作为同质“人类劳动力耗费”的价值实体。跨节省略后，社会必要劳动时间又把价值量限制为在正常条件、平均技能和强度下所需的时间，从而排除低效率者用时越久价值越高。",
    englishContext:
      "Section 1 abstracts from the distinct uses of tailoring, weaving, and other concrete labors in exchange to reach value as homogeneous expenditure of human labor-power. After the cross-section omission, socially necessary labor-time limits magnitude to time required under normal conditions and average skill and intensity, excluding the inference that slower private work creates more value.",
    distinction:
      "“抽象劳动”是商品交换中形成的社会化约，不是说实际劳动没有技能、身体和差异；“物化”也不是单指心理疏离。社会必要时间会随生产条件改变，不能拿个人工时直接当价值凭证。",
    englishDistinction:
      "Abstract labor is a social reduction effected in commodity exchange, not a claim that actual work lacks skill, bodies, and difference; embodied is not merely psychological estrangement. Socially necessary time changes with productive conditions and cannot turn an individual's hours directly into a certificate of value.",
  },
  "marx-commodity-fetishism": {
    context:
      "第一章第四节先问商品形态的神秘性从何而来，并排除使用价值或价值量本身。私人劳动只有通过交换才被确认为社会总劳动的一部分，于是生产者之间的关系不是直接呈现，而表现为商品价格与交换比例的客观属性；引文用宗教“物神”类比这种倒置。",
    englishContext:
      "Section 4 asks where the commodity-form's mystery arises and excludes use-value or value magnitude alone. Private labors become portions of total social labor only through exchange, so relations among producers do not appear directly but as objective properties of prices and exchange ratios; the excerpt compares that inversion to religious fetishism.",
    distinction:
      "“虚幻形式”不是说价格完全虚假或只要揭露观念就能取消市场约束；这种表象由真实交换实践反复产生。物神崇拜也不是消费者太爱商品，而是社会关系取得了物的独立形式。",
    englishDistinction:
      "Fantastic form does not make prices wholly unreal or let a change of belief abolish market constraint; the appearance is reproduced by actual exchange. Fetishism is not excessive consumer affection for goods but social relations assuming an independent thing-like form.",
  },
  "marx-labor-power-commodity": {
    context:
      "第六章在货币转化为资本的难题中寻找一种其使用会创造价值的商品。劳动能力只有当劳动者在法律上能处分自己、同时又与生产资料分离而必须出售一定期限的使用权时才进入市场；随后马克思区分这种能力的价值（再生产生活资料）与其使用创造的新价值。",
    englishContext:
      "Chapter 6 seeks a commodity whose use can create value in order to solve the transformation of money into capital. Labor-power reaches the market only when a worker is legally able to dispose of himself yet separated from means of production and compelled to sell its use for a limited time. Marx then distinguishes its value—the means needed for reproduction—from the new value its use creates.",
    distinction:
      "劳动能力成为商品不是说人整体可合法买卖；恰恰因劳动者保留人格，出售才必须限时。形式上的自由契约也不能证明双方实际议价权平等，因为无生产资料的条件构成经济强制。",
    englishDistinction:
      "Labor-power as a commodity does not make the whole person saleable; precisely because the worker retains personhood, the sale must be time-limited. A formally free contract also does not establish equal bargaining power, since separation from productive means supplies economic compulsion.",
  },
  "marx-surplus-value": {
    context:
      "第七章先跟随资本家进入生产过程：棉花、纺锤等旧价值被转移，劳动则在时间中加入新价值。劳动能力的特殊使用价值在于工人可工作超过再生产工资价值所需的必要劳动时间；引文指出这项差额，随后把工作日分为必要劳动与剩余劳动。",
    englishContext:
      "Chapter 7 follows the capitalist into production: old value in cotton and spindles is transferred while labor adds new value over time. Labor-power has the distinctive use-value that a worker can labor beyond the necessary time reproducing the wage's value. The excerpt identifies that difference, after which the working day is divided into necessary and surplus labor.",
    distinction:
      "剩余价值不等于售价中一切利润，也不是发现雇主没有支付约定工资；论证正从等价交换的工资合同说明剥削如何仍可能发生。具体利润还受竞争、流通和资本构成影响，不能从本句直接算出。",
    englishDistinction:
      "Surplus value is not identical to every component of profit in a sale, nor is the claim simply that an employer withholds the contracted wage. The argument explains exploitation despite exchange at the value of labor-power; concrete profit also depends on competition, circulation, and capital composition.",
  },
  "marx-cooperation-collective-power": {
    context:
      "第十三章分析同一资本指挥下许多人同时劳动，先说明共同使用建筑、工具和原料降低单位成本，再转向协作本身产生的新生产力。共同搬运、接力和任务组合使群体能力超过个人相加；但工人只有进入资本家的计划才形成该力量，成果因而表现为资本的力量。",
    englishContext:
      "Chapter 13 examines many people working simultaneously under one capital. It first treats savings from shared buildings, tools, and materials, then turns to productive force created by cooperation itself. Joint lifting, relays, and combined tasks exceed the sum of isolated capacities; yet because workers form this power only within the capitalist's plan, its result appears as a power of capital.",
    distinction:
      "“集体力量”不是人数越多效率必越高，也不表示协调、知识与冲突成本消失。它由劳动者共同产生却在特定所有制下被占有，因此既不能只归功于管理者，也不能忽略组织劳动的实际必要。",
    englishDistinction:
      "Collective power does not make every larger group more efficient or eliminate coordination, knowledge, and conflict costs. Workers jointly produce it while a particular property relation appropriates it, so it cannot be credited solely to management or understood without real organizational work.",
  },
  "marx-machinery-discipline": {
    context:
      "第十五章第四节比较手工业中工人使用工具与大工业中工人服侍机器体系。自动机由中央动力联结各部分，生产节奏和动作顺序被嵌入设备，工人作为“有意识器官”补入它的缝隙；后文据此讨论劳动强度、监督、妇女儿童劳动和工厂纪律。",
    englishContext:
      "Chapter 15.4 contrasts handicraft, where a worker uses a tool, with large-scale industry, where workers attend a system of machinery. A central motor links the automaton's parts, embedding pace and sequence in equipment while workers enter its gaps as conscious organs; the discussion then turns to intensity, supervision, women and children, and factory discipline.",
    distinction:
      "机器成为“主体”是对资本主义工厂关系的结构性拟人，不表示设备具有意识或技术本性必然压迫。机器也能缩短劳动；问题是控制权与剩余价值压力怎样把其设计和使用转成支配。",
    englishDistinction:
      "The machine as subject is a structural personification of capitalist factory relations, not a claim that equipment is conscious or technology inherently oppressive. Machinery can shorten labor; the question is how control and pressure for surplus value turn its design and use into domination.",
  },
  "marx-reserve-army": {
    context:
      "第二十五章反驳资本积累会线性提高所有劳动者处境的想象。随着生产扩大并提高资本的技术构成，对劳动力的相对需求可低于资本增长，劳动人口于是参与生产使自己“相对多余”的条件；随后马克思把流动、潜在与停滞过剩人口区分为产业后备军形态。",
    englishContext:
      "Chapter 25 rejects the picture in which accumulation linearly improves every worker's condition. As production expands and capital's technical composition rises, relative demand for labor can lag behind capital, so the working population helps produce conditions making part of itself relatively superfluous. Marx then distinguishes floating, latent, and stagnant forms of the industrial reserve army.",
    distinction:
      "“过剩”是相对于资本当下获利使用的需求，不是说失业者对社会没有价值或人口绝对太多。该机制也不是任何技术变化都必然增加长期失业的单因素预测，制度、产业扩张和斗争会改变结果。",
    englishDistinction:
      "Surplus is relative to capital's current profitable demand, not a judgment that unemployed people lack social value or that population is absolutely excessive. The mechanism is not a one-factor prediction that every technical change necessarily raises long-term unemployment; institutions, expansion, and struggle alter outcomes.",
  },
  "marx-primitive-accumulation": {
    context:
      "第二十六章以讽刺口吻复述政治经济学把资本起源讲成勤劳者节俭、懒惰者失去财产的寓言，然后给出引文中的替代定义。后续英国圈地、血腥立法、殖民掠夺和国债史说明“自由”雇佣劳动所需的生产者与土地、工具分离，是由法律与暴力造出的历史前提。",
    englishContext:
      "Chapter 26 sarcastically retells political economy's origin myth of thrifty workers accumulating while the idle lose property, then replaces it with the excerpt's definition. Enclosures, bloody legislation, colonial plunder, and public debt show that the separation of producers from land and tools—required for free wage labor—was historically produced through law and force.",
    distinction:
      "“原始”指资本关系的历史前提，不是只发生在遥远史前的一次事件，也不等同普通储蓄。引文揭露强制起源，却不能让每个后来资本都仅凭家谱被逐项解释；再生产机制还需全书其他章节。",
    englishDistinction:
      "Primitive names a historical presupposition of the capital relation, not a single event in remote prehistory and not ordinary saving. The excerpt exposes coercive origins without genealogically explaining every later capital by itself; reproduction requires the book's other analyses.",
  },
  "marx-ruling-ideas": {
    context:
      "《德意志意识形态》这部分先把思想生产者放回劳动分工：统治阶级中有人掌握物质生产，有人专门制作、系统化并传播观念。名句后说明占有物质生产资料者通常也支配精神生产资料，而革命阶级会把自己的特殊要求表述成全社会的普遍利益。",
    englishContext:
      "This part of The German Ideology returns producers of ideas to the division of labor: some members of a ruling class control material production while others formulate, systematize, and circulate concepts. The maxim is followed by control over means of mental production and by rising classes presenting their particular demands as the universal interest of society.",
    distinction:
      "“统治思想”不是每个统治者亲自编造宣传，也不是所有人机械相信同一观念；它指可见度、教育和常识形成条件的不对称。受压制群体仍能产生反知识，思想内容也不能只凭作者阶级位置判真伪。",
    englishDistinction:
      "Ruling ideas do not require every ruler personally to invent propaganda or everyone mechanically to believe one doctrine; the claim concerns unequal conditions of visibility, education, and common sense. Subordinated groups can produce counter-knowledge, and an idea's truth cannot be read off the author's class position alone.",
  },
  "marx-political-human-emancipation": {
    context:
      "《论犹太人问题》回应布鲁诺·鲍威尔把宗教解放系于放弃宗教，马克思则以美国为例指出国家可在法律上不设国教，社会成员仍保持宗教和财产差异。引文把国家作为抽象公民共同体的政治解放，与市民社会中具体人的人类解放分开；后面据此批判权利主体的私有个人形式。",
    englishContext:
      "Responding to Bruno Bauer's demand that religious emancipation require renouncing religion, Marx uses the United States to show that a state may lack an established religion while social members retain religious and property differences. The excerpt separates political emancipation in the abstract civic state from human emancipation of concrete persons in civil society, preparing the critique of rights borne by the proprietary individual.",
    distinction:
      "政治解放“有限”不表示选举权、法律平等或宗教自由毫无价值，文本承认它是现有秩序内的重大进步。人类解放也不是国家替个人规定统一生活，而是追问社会关系为何仍使公民平等与日常支配并存。",
    englishDistinction:
      "Calling political emancipation limited does not make suffrage, legal equality, or religious liberty worthless; the essay recognizes it as a major advance within the existing order. Human emancipation is not the state's imposition of one life but a question about social relations that let civic equality coexist with everyday domination.",
  },
  "marx-class-struggle": {
    context:
      "《宣言》第一章用这句开启资产阶级与无产阶级的历史叙述，紧接列举自由民与奴隶、贵族与平民、领主与农奴等对立，并说斗争或导致社会革命改造、或共同毁灭。后文把现代资产阶级自身视为封建社会冲突的产物，再分析它如何集中生产并制造新的对立。",
    englishContext:
      "Chapter I of the Manifesto opens its bourgeois/proletarian history with this sentence, immediately listing freeman and slave, patrician and plebeian, lord and serf, and allowing struggles to end in revolutionary reconstruction or common ruin. The bourgeoisie is then treated as a product of conflicts within feudal society before its own concentration of production generates a new opposition.",
    distinction:
      "“一切社会”在 1888 年英译注释中已对文字史前的共有社会作限定，不能当作涵盖每个群体冲突的无例外定律。阶级是生产与占有关系的位置，不等于收入档次；性别、种族和国家冲突也不能未经论证便被还原为阶级。",
    englishDistinction:
      "All society is qualified in the 1888 note with respect to prehistory and is not an exceptionless law covering every group conflict. Class is a position in relations of production and appropriation, not an income bracket; gender, race, and national conflicts cannot be reduced to class without argument.",
  },
  nietzsche: {
    context:
      "《快乐的科学》第 270 节只有问答式两行，位于一组让读者审问自身尺度、未来和欲望的格言之间。“良知”在这里没有给出一张等待发现的本质清单，而向人发出成为任务；它也回响《查拉图斯特拉》副题“一个人如何成为他之所是”。",
    englishContext:
      "The Gay Science §270 is a two-line question and answer among aphorisms that make readers interrogate their measure, future, and desires. Conscience here supplies no inventory of a hidden essence waiting to be found but addresses becoming as a task; it also anticipates the subtitle of Ecce Homo, how one becomes what one is.",
    distinction:
      "“成为你所是”不是忠于每个即时冲动，也不假定一个不受历史影响的真我早已完成。悖论要求通过选择、训练和自我克服形成风格，不能用来拒绝改变或把伤害他人说成“做自己”。",
    englishDistinction:
      "Become what you are does not mean obeying every immediate impulse or presuppose a completed authentic self untouched by history. The paradox calls for choice, discipline, and self-overcoming in forming a style; it cannot excuse refusal to change or harm to others as being oneself.",
  },
  "nietzsche-three-metamorphoses": {
    context:
      "《查拉图斯特拉》第一部在序言之后以这篇演说开场：骆驼主动背负“最沉重之物”，到荒漠中变成狮子，对巨龙“你应当”争取说“不”的自由。狮子却不能创造新价值，最后孩子以遗忘、游戏和神圣的“是”开始新的评价；三形态构成连续能力而非人物等级。",
    englishContext:
      "The first discourse after Zarathustra's Prologue begins with the camel freely taking up the heaviest burdens, becoming a lion in the desert and winning a No against the dragon Thou Shalt. Because the lion cannot create new values, the child follows with forgetting, play, and a sacred Yes. The three forms are successive capacities, not ranks of people.",
    distinction:
      "狮子的反抗不是终点，孩子也不是幼稚或抹去所有记忆；创造需要先承重、再摆脱旧命令。寓言不许可把他人贴成“骆驼”，也没有给任何自称创造者免除理由与后果责任。",
    englishDistinction:
      "The lion's rebellion is not the endpoint, and the child is neither childishness nor erasure of all memory; creation presupposes bearing and then breaking old commands. The fable does not license labeling others camels or exempt self-declared creators from reasons and consequences.",
  },
  "nietzsche-amor-fati": {
    context:
      "第 276 节题为“为了新年”，以不再控诉丑恶、不再成为指责者的愿望开启《快乐的科学》第四卷。命运之爱由把必然性看作美推进到愿意成为“说是者”；它为后面“最沉重的负担”永恒回归的生活检验预设肯定姿态。",
    englishContext:
      "Entitled For the New Year, §276 opens Book IV of The Gay Science with a resolve not to accuse ugliness or become an accuser. Amor fati moves from seeing necessity as beautiful toward becoming a Yes-sayer, anticipating the life-test of eternal recurrence in The Heaviest Burden later in the book.",
    distinction:
      "爱命运不是认为虐待、疾病或不义本身值得赞美，也不要求受害者停止改变可变条件。“必然”指已经构成此生且无法撤回之物的肯定练习，不能替掌权者免除责任。",
    englishDistinction:
      "Loving fate does not make abuse, illness, or injustice intrinsically admirable or require victims to stop changing alterable conditions. Necessity concerns an exercise of affirming what irreversibly composes this life and cannot absolve those in power of responsibility.",
  },
  "nietzsche-death-of-god": {
    context:
      "第 125 节让疯子白天提灯到市场寻找上帝，遭无神论旁观者嘲笑后宣布“我们杀死了他”。引文之后连问谁擦掉地平线、我们向何处移动以及用什么节日赎罪，并说自己来得太早；事件不是一条神学证明，而是欧洲最高价值失去约束力后尚未被理解的文化后果。",
    englishContext:
      "In §125 the madman carries a lantern into the marketplace in daylight seeking God and, mocked by atheist bystanders, announces that we have killed him. He then asks who wiped away the horizon, where we are moving, and what festivals could atone, before saying he has come too early. The event is not a theological proof but the still-uncomprehended cultural consequence of Europe's highest values losing authority.",
    distinction:
      "“上帝死了”不是尼采自夸一次辩论获胜，也不表示意义、道德和宗教经验自动消失；市场上的无神论者正因不懂后果而成为批评对象。它诊断价值危机，却没有在此句给出替代价值。",
    englishDistinction:
      "God is dead is not Nietzsche boasting of winning an argument, nor does meaning, morality, or religious experience automatically vanish; the atheist crowd is criticized precisely for missing the consequence. The passage diagnoses a crisis of value but this sentence supplies no replacement values.",
  },
  "nietzsche-eternal-recurrence": {
    context:
      "第 341 节以一个恶魔在最孤独时刻提出思想实验：此生每个细节按同样次序无数次返回。引文之后不问宇宙论证据，而问你会咬牙诅咒，还是把这消息称为神圣；最后用“你必须多么善待自己和生命”把重复变成衡量当前肯定程度的最重砝码。",
    englishContext:
      "Section 341 stages a demon presenting a thought experiment in one's loneliest moment: every detail of this life returns in the same sequence innumerably. After the excerpt it asks not for cosmological evidence but whether one would curse the demon or call the message divine, ending with how well-disposed one would need to become toward oneself and life for no greater confirmation.",
    distinction:
      "这段在《快乐的科学》中首先是存在性检验，不能未经其他文本便当作尼采证明过的物理循环学说。肯定生命也不等于重复错误或禁止悔改；若真愿行动重来，反而提高了当下选择的分量。",
    englishDistinction:
      "In The Gay Science this is first an existential test and cannot, without other texts, be treated as a demonstrated physical cosmology. Affirming life also does not mean repeating mistakes or forbidding remorse; willingness to relive an act increases the weight of present choice.",
  },
  "nietzsche-genealogy-of-values": {
    context:
      "《谱系》序言先回顾尼采早年对善恶起源的怀疑，再批评英国道德谱系学家从遗忘的功利习惯解释价值。第 6 节把问题从“价值从哪来”推进到“这些价值本身值什么”，要求考察其生长条件对生命是促进还是阻滞；后三篇分别追踪善恶、罪责与禁欲理想。",
    englishContext:
      "The Preface recalls Nietzsche's early suspicion about the origin of good and evil, then criticizes English genealogists who derive values from forgotten utility. Section 6 advances from where values arose to what those values are worth, asking whether their conditions of growth advance or obstruct life; the three essays then trace good/evil, guilt, and the ascetic ideal.",
    distinction:
      "谱系不是发现一个卑劣起源就逻辑驳倒价值的“发生学谬误”，而要联系起源、转化与当前功能评估生命效果。追问价值也不是摆脱一切评价；批判本身仍以繁盛、力量和诚实等尺度工作。",
    englishDistinction:
      "Genealogy is not the genetic fallacy of disproving a value by finding a low origin; it links emergence, transformation, and present function to assess effects on life. Questioning values does not escape evaluation, since the critique still works with measures such as flourishing, strength, and honesty.",
  },
  "nietzsche-ressentiment-slave-values": {
    context:
      "第一篇先对比贵族评价从自身“好”出发、把卑微者附带称“坏”，与奴隶道德先凝视外部压迫者并称其“恶”。第 10 节让无法直接行动的 ressentiment 借想象复仇成为造值力量，随后说明“善者”作为非攻击、谦卑的自我形象，是对先行之“恶”的反应性反转。",
    englishContext:
      "Essay I contrasts noble valuation, which begins by calling itself good and only derivatively names the low bad, with slave morality, which first fixes on an oppressor as evil. Section 10 has ressentiment become value-creating through imaginary revenge when direct action is blocked; the good person as harmless and humble is then produced reactively against that prior evil.",
    distinction:
      "ressentiment 是持续、无出口而重塑评价的心理—历史机制，不等于任何愤怒、受害申诉或追求正义；有根据的反抗不能因来自弱者便被诊断掉。尼采的贵族/奴隶类型也是谱系构造，不能拿来给现实人群作天生等级。",
    englishDistinction:
      "Ressentiment is a persistent, blocked mechanism that remakes valuation, not any anger, testimony of harm, or pursuit of justice; justified resistance cannot be diagnosed away because it comes from the weak. Noble and slave are genealogical types, not innate ranks for classifying actual populations.",
  },
  "nietzsche-bad-conscience": {
    context:
      "第二篇先由许诺、记忆和惩罚史追踪可负责主体的形成，到第 16 节转向国家强制如何突然把旧有游猎本能关进社会围墙。不能外泄的攻击性回到施动者身上，扩展出自我监视、罪责与“灵魂”的深度；后文再把债务关系同宗教罪感结合。",
    englishContext:
      "Essay II traces the responsible subject through promise, memory, and punishment before §16 turns to state force abruptly confining older predatory instincts within society. Aggression unable to discharge outward turns against its bearer, enlarging self-surveillance, guilt, and the depth called soul; later sections join debt relations to religious guilt.",
    distinction:
      "“一切本能”是尼采强烈的谱系概括，不是经验证的心理定律，也不能把自省、良心或内在生活全判为疾病。文本诊断其痛苦起源，同时承认内在化创造了想象与自我塑造的新能力。",
    englishDistinction:
      "All instincts is Nietzsche's forceful genealogical generalization, not an established psychological law, and it cannot reduce reflection, conscience, or inwardness wholesale to illness. The text diagnoses a painful origin while acknowledging that internalization creates new capacities for imagination and self-formation.",
  },
  "nietzsche-promise-sovereign-individual": {
    context:
      "第二篇开篇把能许诺称为自然给人的悖论任务，因为遗忘本来维持当下开放，而许诺要求把未来的自己变得可计算。接着文本追踪“习俗道德”以惩罚和记忆术培育稳定意志，最终才描写能自主担保自身话语的“主权个体”；引文因此提出的是漫长形成问题。",
    englishContext:
      "Essay II opens by calling the animal capable of promises nature's paradoxical task: active forgetting keeps the present open, while promising makes one's future self calculable. Nietzsche then traces how morality of custom uses punishment and mnemonics to breed a stable will before describing the sovereign individual who can answer autonomously for his word; the excerpt poses that long formation problem.",
    distinction:
      "能够许诺不等于从不改变计划，也不使任何契约无条件神圣；价值在于可承担、可说明的时间连续性。把残酷训练称作“培育”是谱系说明，不是赞成以暴力制造服从。",
    englishDistinction:
      "Capacity to promise does not mean never revising a plan or make every contract unconditionally sacred; its value lies in accountable continuity through time. Calling cruel discipline breeding is a genealogical explanation, not endorsement of violence as a way to manufacture obedience.",
  },
  "nietzsche-ascetic-ideal": {
    context:
      "第三篇依次问艺术家、哲学家、教士与病人为何需要禁欲理想，末节汇总它给无方向的痛苦赋予罪责解释。省略号跨过这套意义既保存意志又增加自我敌视的代价，结尾悖论指出：人无法忍受不去意愿，因而宁把意志指向虚无。",
    englishContext:
      "Essay III asks in turn why artists, philosophers, priests, and the sick need the ascetic ideal, and its final section concludes that the ideal gives directionless suffering an interpretation through guilt. The ellipsis crosses the cost—preserving will while intensifying self-hostility—before the closing paradox: unable to bear not willing, humanity directs will toward nothingness.",
    distinction:
      "“宁愿虚无”不是赞扬虚无主义，也不是说痛苦有解释总比无解释道德上好；它揭示禁欲意义的危险吸引力。对意义需求的诊断仍未证明所有节制、训练或宗教生活都属于同一种反生命理想。",
    englishDistinction:
      "Willing nothingness is not praise of nihilism or a claim that any explanation of suffering is morally better than none; it exposes the dangerous appeal of ascetic meaning. Diagnosing a need for meaning does not prove that every restraint, discipline, or religious life instantiates the same anti-life ideal.",
  },
  "nietzsche-will-to-truth": {
    context:
      "《快乐的科学》第 344 节题为“我们在何种意义上仍然虔诚”，从科学要求不接受无根据确信出发，却发现它自身无条件优先真理。引文追问这种优先究竟来自“不愿欺骗”还是“不愿被欺骗”，随后指出两者都预设欺骗有害，最终把求真意志连接到基督教—柏拉图式“上帝即真理”信仰。",
    englishContext:
      "The Gay Science §344, How We, Too, Are Still Pious, begins from science's refusal of unsupported convictions yet finds science itself committed to truth without condition. The excerpt asks whether this priority comes from not wanting to deceive or not wanting to be deceived, then notes both assume deception harmful and links will to truth to the Christian-Platonic faith that God is truth.",
    distinction:
      "追问求真意志的价值不是说真假无差别、研究可随意造假；它要求科学也说明自身最高规范的谱系与代价。批判一个无条件价值并不自动提供何时应放弃真理的简单规则。",
    englishDistinction:
      "Questioning the value of will to truth does not erase the difference between truth and falsehood or permit fabrication in inquiry; it asks science to examine the genealogy and costs of its highest norm. Criticizing an unconditional value does not supply a simple rule for when truth should be abandoned.",
  },
  "nietzsche-active-forgetting": {
    context:
      "《谱系》第二篇以能许诺的动物为主题，却先重新评价遗忘：它不是记忆缺陷，而像守门人一样暂时隔绝消化中的经验，使意识保持安静和可行动。省略段落列出这种关闭对秩序、礼仪与幸福的作用，随后才提出许诺如何反向培养一种选择性“不遗忘”。",
    englishContext:
      "Essay II concerns the animal capable of promises but first reevaluates forgetting. Rather than a defect of memory, it acts as a doorkeeper that temporarily excludes experiences under psychic digestion, keeping consciousness quiet and able to act. The omitted material names order, etiquette, and happiness before promising introduces a selective suspension of forgetting.",
    distinction:
      "积极遗忘不是销毁证据、逃避责任或要求创伤者“放下”；能许诺恰需要保留某些记忆。它描述健康注意力的筛选能力，哪些过去必须公共记取仍是伦理与政治问题。",
    englishDistinction:
      "Active forgetting is not destruction of evidence, evasion of responsibility, or an order that traumatized people move on; promising requires some memories to be held. It describes selective capacity in healthy attention, while what a public must remember remains an ethical and political question.",
  },
  "nietzsche-history-for-life": {
    context:
      "这篇“不合时宜的考察”序言以歌德关于只受教而不增加行动力的知识为题词，并声明作者作为古典学者反思时代的历史病。引文先承认历史服务生命的必要，随后全文区分纪念式、好古式与批判式历史及其各自过量，诊断知识堆积怎样使现代人失去塑造力。",
    englishContext:
      "The Preface to this Untimely Meditation cites Goethe on knowledge that instructs without increasing activity and has the philologist diagnose his age's historical sickness. The excerpt first grants history's service to life; the essay then distinguishes monumental, antiquarian, and critical history and each form's excess, showing how accumulated knowledge can deprive modern people of formative power.",
    distinction:
      "“服务生命”不许可删改不便的历史或让政治目标决定事实，批判式历史本身要求面对过去。生命也不是单一民族神话，而是能吸收、判断并创造的能力；忘却与记忆都必须按其效果受检验。",
    englishDistinction:
      "Serving life does not permit falsifying inconvenient history or making facts answer to a political aim; critical history itself requires confronting the past. Life is not a single national myth but a capacity to absorb, judge, and create, so both memory and forgetting require assessment by their effects.",
  },
  "nietzsche-apollonian-dionysian": {
    context:
      "《悲剧的诞生》第 1 节从阿波罗与狄俄尼索斯两种希腊神名建立美学视角：前者关联梦、造型和个体界限，后者关联陶醉、音乐与个体化暂时消融。生殖比喻强调冲突中的偶尔结合，后续论证把阿提卡悲剧视为二者在舞台形象与合唱音乐中的共同产物。",
    englishContext:
      "The Birth of Tragedy §1 establishes an aesthetic lens through the Greek divine names Apollo and Dionysus: the former is associated with dream, form, and individuating boundaries, the latter with intoxication, music, and temporary dissolution of individuation. The procreative analogy stresses intermittent union through conflict; Attic tragedy is then read as their conjunction in stage image and chorus.",
    distinction:
      "二元性是早期尼采解释希腊艺术的类型，不是把作品、人格或文化机械分成两类的科学量表。两力相生也不表示失控陶醉或僵硬秩序各自为善，悲剧效果恰在有形式的张力中。",
    englishDistinction:
      "The duality is early Nietzsche's typology for Greek art, not a scientific scale that mechanically sorts works, persons, or cultures. Their productivity does not make uncontrolled intoxication or rigid order good by itself; tragic effect lies in tension given form.",
  },
  "nietzsche-truth-mobile-metaphors": {
    context:
      "〈非道德意义上的真理与谎言〉先描写知性为脆弱动物的生存发明约定语言，再从神经刺激到图像、从图像到声音追踪两次隐喻转移。引文把概念视为抹平不相同个案的旧比喻：长期共同使用使约定显得固定，随后文章对比概念大厦与直觉创造。",
    englishContext:
      "On Truth and Lies first depicts intellect inventing conventional language for a vulnerable animal's survival, then traces transfers from nerve stimulus to image and from image to sound. The excerpt treats concepts as old metaphors that equalize unlike cases: long communal use makes convention appear fixed, after which the essay contrasts the conceptual edifice with intuitive creation.",
    distinction:
      "称真理为“隐喻军队”不等于所有主张同样虚假或事实可由修辞决定；约定仍能稳定协作并对说谎作区分。文本是关于概念形成的激进谱系，不能直接替代具体命题的证据检验。",
    englishDistinction:
      "Calling truths an army of metaphors does not make all claims equally false or facts dependent on rhetoric; conventions still stabilize cooperation and distinguish lying. The essay offers a radical genealogy of concepts, not a substitute for testing evidence for particular propositions.",
  },
  "nietzsche-innocence-of-becoming": {
    context:
      "《偶像的黄昏》“四种大谬误”先攻击原因倒置、虚假因果和自由意志，认为自由意志被发明来使人可惩罚。第 8 节把个体放回不可分割的生成整体，拒绝从整体之外设立终极法庭；末尾以“无罪的生成”结束对道德化罪责的拆解。",
    englishContext:
      "The Four Great Errors attacks confusion of cause and effect, false causality, and free will, arguing that free will was invented to make people punishable. Section 8 returns the individual to an indivisible whole of becoming and rejects an ultimate tribunal outside it; the chapter ends by restoring the innocence of becoming against moralized guilt.",
    distinction:
      "否定超因果的自由意志不等于取消法律责任、学习或行为后果，也不是说伤害者“命中注定”所以无需制止。尼采针对的是把存在本身归罪给一个可脱离整体另作选择的主体，实践性问责仍可作为因果世界的一部分。",
    englishDistinction:
      "Rejecting contra-causal free will does not abolish legal responsibility, learning, or consequences, and fate does not excuse leaving a harmful actor unchecked. Nietzsche targets guilt that condemns existence through a subject imagined outside the whole; practical accountability can remain part of the causal world.",
  },
  peirce: {
    context:
      "〈如何使我们的观念清楚〉第二节先区分观念的熟悉感与真正清晰、明确的把握，并承接〈信念的确定〉把信念理解为行动习惯。引文给出实用主义准则：列出对象在可设想情形中会产生的实践影响，概念内容就由这些有条件的差异展开；后文用硬度、重量与力作例子。",
    englishContext:
      "How to Make Our Ideas Clear §II distinguishes familiarity with an idea from genuinely clear and distinct comprehension, carrying forward the account of belief as a habit of action. The maxim unfolds a concept through the practical bearings its object would have under conceivable conditions; hardness, weight, and force then serve as examples.",
    distinction:
      "“实际影响”不限于眼前功利、赚钱或已经发生的结果，而包括长期、反事实和实验可辨的后果。准则澄清概念意义，并没有规定凡有用的信念就是真的，真理仍需共同探究和现实抵抗来检验。",
    englishDistinction:
      "Practical bearings are not limited to immediate utility, profit, or effects already observed; they include long-run, counterfactual, and experimentally discriminable consequences. The maxim clarifies meaning and does not make every useful belief true, which still requires inquiry answerable to reality.",
  },
  "peirce-doubt-belief-habit": {
    context:
      "〈信念的确定〉第三节从怀疑令人不安、信念令人平静的经验差别入手。信念建立在适当情境会发动某种行为的习惯，怀疑则中断习惯并引起探究；紧接着皮尔士把探究的唯一目标称为由怀疑达到信念，而不是追求一段抽象的“真理感”。",
    englishContext:
      "The Fixation of Belief §III begins from the experiential contrast between irritating doubt and settled belief. Belief establishes a habit ready to issue in conduct under relevant conditions, while doubt interrupts habit and initiates inquiry; Peirce next calls inquiry's sole immediate aim the passage from doubt to belief rather than an abstract feeling of truth.",
    distinction:
      "这里的怀疑是会扰动预期和行动的真实状态，不是为了显得严谨而口头假装怀疑；但心理安定也不证明信念为真。后面的四种方法正比较不同固定机制，说明结束不适与接受现实检验并非一回事。",
    englishDistinction:
      "Doubt here is a live disruption of expectation and conduct, not verbally feigned skepticism for an appearance of rigor; yet psychological settlement does not prove truth. The four methods that follow distinguish merely ending discomfort from submitting belief to reality.",
  },
  "peirce-four-methods-belief": {
    context:
      "文章依次试验固执法、权威法和先验法：它们可维持个人或共同体信念，却分别受他人异议、制度接触和品味变化动摇。省略处把科学法的“外在恒常之物”说明为影响每个人、又不由个人思考改变的实在；最终趋同是方法目标，用来区别公共可校正性与强制服从。",
    englishContext:
      "The essay successively tests tenacity, authority, and the a priori method. Each can stabilize an individual or community but is disturbed by others' disagreement, contact beyond an institution, or shifting taste. Across the ellipsis science's external permanency is reality affecting everyone without being altered by any person's thought; eventual convergence distinguishes public corrigibility from coerced conformity.",
    distinction:
      "科学方法不保证研究者实际上迅速同意，也不是把当下共识定义成真理；“最终”表达无限可继续探究的规范方向。外在于思想更不等于未经理论的裸事实，观察工具与推理仍参与检验。",
    englishDistinction:
      "The scientific method guarantees neither rapid actual agreement nor truth by present consensus; ultimate expresses the norm of indefinitely continuable inquiry. Independence from thought also does not mean theory-free bare facts, since instruments and inference remain part of testing.",
  },
  "peirce-reality-community-inquiry": {
    context:
      "〈如何使我们的观念清楚〉第四节先以真实与虚构的差别回应“观念只关乎感觉”的疑问：真实对象具有不依我们任性意见的效力。省略句把不同起点者在经验压力下趋同，同无限探究者共同体的极限意见连接；对象之“真实”由它持续约束探究而定义。",
    englishContext:
      "Section IV answers the worry that ideas concern only sensations by distinguishing reality from fiction: a real object exerts effects independent of arbitrary opinion. Across the omission, convergence under experiential pressure is joined to the limit-opinion of an indefinitely extended community of investigators; the real is what continuously constrains that inquiry.",
    distinction:
      "“注定同意”是可错论的极限概念，不是历史必然保证科学终将完成，也不把被排除者缺席的现实共识神圣化。真理依赖的是开放校正过程，而非人数、权威或某个机构宣称代表未来共同体。",
    englishDistinction:
      "Fated agreement is a fallibilist limit-concept, not a historical guarantee that science will finish or a sanctification of actual consensus formed through exclusion. Truth depends on an open corrective process, not numbers, authority, or an institution claiming to represent the future community.",
  },
  "peirce-triadic-sign": {
    context:
      "〈符号的划分〉在这一定义后分别命名符号所代表的对象与它在解释者中产生的解释项。符号只“在某一方面”代表对象，这个方面由根据限定；新解释项又可成为下一符号，于是意义形成对象—符号—解释项的三元关系和可继续的解释链。",
    englishContext:
      "After this definition, The Division of Signs names the object represented and the interpretant produced in an interpreter. A sign stands for the object only in some respect, limited by its ground; the new interpretant can become a further sign, so meaning forms an irreducibly triadic object-sign-interpretant relation open to continued interpretation.",
    distinction:
      "解释项不是必定住在某个个体头脑中的私人想法，也不是随意解释；它由符号与对象关系所约束。三元说同样不表示每次交流都成功，误解恰可由后续符号和共同对象纠正。",
    englishDistinction:
      "The interpretant is not necessarily a private idea inside one person's mind and does not license arbitrary interpretation; the sign-object relation constrains it. Triadicity also does not guarantee successful communication, since further signs and a shared object may correct misunderstanding.",
  },
  "peirce-abduction": {
    context:
      "1903 年第七讲把探究分成三种推理：溯因提出解释性假说，演绎从假说推出可检验后果，归纳以经验估计这些后果。引文把 C 的惊异性转为寻找 A 的线索，结论谨慎写成“有理由猜测”，后文强调假说还须可检验且在成本上值得尝试。",
    englishContext:
      "The seventh Harvard lecture divides inquiry among abduction, which proposes an explanatory hypothesis, deduction, which draws testable consequences, and induction, which evaluates those consequences in experience. The surprising C guides the search for A, while the conclusion remains reason to suspect; Peirce then requires hypotheses to be testable and economical enough to try.",
    distinction:
      "若 A 能解释 C，不能推出 A 已真，因为多个假说可能使同一事实不再惊异。溯因赋予候选解释研究资格，不是确证；跳过演绎预测与归纳检验，就把三阶段探究缩成了猜测。",
    englishDistinction:
      "If A would explain C, A does not thereby become true, since multiple hypotheses may render one fact unsurprising. Abduction gives a candidate eligibility for investigation, not confirmation; omitting deductive prediction and inductive testing reduces the three-stage inquiry to guesswork.",
  },
  james: {
    context:
      "《实用主义》第二讲先借松鼠绕树争论说明口头分歧可能来自对“绕行”的不同操作定义，再把方法推广到自由意志、物质和上帝等形而上学争执。引文要求分别追踪两观念若为真会改变哪些经验期待和行动；若没有任何可辨差异，争论就缺少实际意义。",
    englishContext:
      "Pragmatism Lecture II begins with the squirrel-around-the-tree dispute, where verbal conflict turns on operational senses of going around, then extends the method to free will, matter, God, and other metaphysical debates. The excerpt asks what expectations and actions would differ if either view were true; if no conceivable difference follows, the dispute lacks practical meaning.",
    distinction:
      "“实际差别”不等于短期便利或个人喜欢的结果，宗教与形而上观念也可通过长期生活取向产生差别。方法是解释争论含义，不是说有好处就为真，彼此冲突的预期仍须由经验裁决。",
    englishDistinction:
      "Practical difference is not short-term convenience or a personally welcome result; religious and metaphysical ideas may differ through long-term orientations of life. The method interprets a dispute's meaning and does not make benefit truth, since conflicting expectations remain answerable to experience.",
  },
  "james-truth-verification": {
    context:
      "第六讲此前接受观念要同现实“符合”，却追问符合在经验中如何运作。名句后把成为真的过程称为 verification/validation：观念引导我们穿过其他经验，与对象、证据和既有真理保持可满足关系；“发生”强调真理地位在检验中取得，而非凭宣告制造。",
    englishContext:
      "Lecture VI first accepts that an idea must agree with reality but asks how agreement works in experience. After the maxim, becoming true is described as verification and validation: an idea leads through other experiences into satisfactory relations with objects, evidence, and established truths. Happens stresses a status earned in testing, not manufactured by assertion.",
    distinction:
      "“被造就为真”不是人愿意相信便使事实改变，也不是有用谎言自动成为真理；现实会阻断失败的引导。詹姆斯讨论的是观念如何获得可验证的真关系，并未否认在检验前对象已有制约。",
    englishDistinction:
      "Made true does not let wishing alter facts or turn a useful lie automatically into truth; reality can frustrate an idea's leading. James concerns how an idea acquires a verifiable true relation and does not deny that its object constrains inquiry before verification.",
  },
  "james-genuine-option": {
    context:
      "〈信仰意志〉先把选项分为活的或死的、被迫或可避免的、重大或琐碎的，三项同时满足才是“真实选择”。第 IV 节又加上理智证据按问题本性无法及时裁决；名句只在这些窄条件下允许激情本性决定，因为等待本身可能永久失去关系或信任所开启的证据。",
    englishContext:
      "The Will to Believe classifies options as living or dead, forced or avoidable, and momentous or trivial; only all three together make a genuine option. Section IV adds that intellectual evidence cannot by the problem's nature decide in time. Only under these narrow conditions may passional nature decide, because waiting can permanently lose evidence available through relationship or trust.",
    distinction:
      "该论题不适用于证据可获得的普通事实、方便的迷信或强迫他人接受信仰；“活的”还须对当事人真实可行。允许承担认识风险也不把所选命题保证为真，人仍承担错误代价。",
    englishDistinction:
      "The thesis does not apply to ordinary facts with obtainable evidence, convenient superstition, or coercing another's belief; living must be a real possibility for the agent. Permission to take an epistemic risk does not guarantee the chosen proposition true, and the chooser remains answerable for error.",
  },
  "james-stream-of-thought": {
    context:
      "《心理学原理》第九章在这句之前列出意识总是个人的、不断变化又显得连续，并总选择对象。第 239 页反对用“链”或“列车”把思想当独立单位，因为关系、边缘感和从一个焦点到下一焦点的过渡也被经验到；随后詹姆斯提出“河流”或“溪流”比喻。",
    englishContext:
      "Principles of Psychology IX has characterized consciousness as personal, changing, sensibly continuous, and selective. Page 239 rejects chains or trains of separate ideas because relations, fringes, and transitions from one focus to another are themselves experienced; James then proposes river or stream as the better metaphor.",
    distinction:
      "意识流不表示注意力永远平滑、没有中断，也不否认可为实验分析经验成分；它说明第一人称呈现不自带清楚切块。神经事件是否离散，不能由这个现象描述直接裁定。",
    englishDistinction:
      "Stream does not make attention always smooth or uninterrupted and does not forbid experimental analysis into components; it says first-person presentation does not arrive already cleanly segmented. The phenomenological description cannot by itself decide whether neural events are discrete.",
  },
  "james-radical-empiricism-relations": {
    context:
      "〈纯粹经验的世界〉先把“纯粹经验”称作尚未按主客二分回顾分类的直接生活流，再给彻底经验主义的原则。引文前半拒绝超经验实体，后半也拒绝把经验中的连接遗漏掉；于是连续、因果倾向和过渡若被直接感受，就与被连接的项同样是经验材料。",
    englishContext:
      "A World of Pure Experience first calls pure experience the immediate flux of life before retrospective sorting into subject and object, then states radical empiricism's postulate. The excerpt excludes extra-experiential entities but equally forbids omitting experienced connections: continuity, causal tendency, and transition, when directly felt, are data alongside the terms connected.",
    distinction:
      "关系被经验到不表示观察者对关系的每个判断都正确，也不使统计或因果推理多余；直接经验仍可能含糊并需公共检验。它反对的是经验主义只收录分离感觉、再从经验外添加连接。",
    englishDistinction:
      "Experienced relations do not make every judgment about a relation correct or render statistical and causal inference unnecessary; direct experience can be vague and needs public testing. The target is an empiricism that admits isolated sensations but imports their connections from outside experience.",
  },
  "james-fruits-not-origins": {
    context:
      "《宗教经验之种种》第一讲回应“医学唯物主义”：以癫痫、消化或神经类型解释宗教体验的起因，并不能据此判其认识与伦理价值。省略部分把同一原则用于无神论和普通信念，随后以“果实”——持续的品格与实践改变——作为评价宗教生活的经验标准。",
    englishContext:
      "Varieties Lecture I answers medical materialism: explaining a religious experience through epilepsy, digestion, or nervous type does not thereby settle its epistemic or ethical value. Across the omission James applies the same rule to atheism and ordinary belief, then treats fruits—enduring transformations of character and practice—as the empirical criterion for religious life.",
    distinction:
      "“不看根源”不是禁止研究生理与社会成因，而是拒绝由成因低微直接推出信念虚假；果实同样不能证明全部形而上内容。实践是价值证据的一部分，并非效果良好就取消事实核查。",
    englishDistinction:
      "Not by roots does not forbid studying physiological and social causes; it blocks inferring falsity merely from a lowly cause. Fruits likewise cannot prove every metaphysical content. Practice supplies evidence of value, not a cancellation of factual scrutiny whenever effects are welcome.",
  },
  "frege-context-principle": {
    context:
      "《算术基础》导言列出三项方法原则：区分心理与逻辑、只在命题语境追问词义、牢记概念与对象之别。第二项用来阻止把数词当作伴随表象的名称；正文随后考察包含数词的完整判断如何给对象归属一个概念，而非寻找孤立词“二”的心理图像。",
    englishContext:
      "The Foundations of Arithmetic Preface lists three principles: separate the psychological from the logical, seek a word's meaning only in propositional context, and keep concept distinct from object. The second blocks treating number words as names of associated images; the book instead examines how complete judgments containing numerals assign a number to a concept.",
    distinction:
      "语境原则不是说词在每句话中可任意换义，也不否认同一词有稳定语义贡献；它改变解释次序，用完整命题约束词义。更不能把它扩成文本之外一切都相对语境而没有真值。",
    englishDistinction:
      "The context principle does not allow arbitrary changes of meaning in each sentence or deny a word's stable semantic contribution; it reverses explanatory order by constraining word-meaning through complete propositions. It cannot be inflated into a claim that all truth is context-relative.",
  },
  "frege-function-argument": {
    context:
      "〈类、函数、概念、关系〉重申数学函数不能被当成一个完整对象名称。“2 × …³ + …”之类表达式留下空位，填入论元才产生值；“需要补全”与“未饱和”正标记这种逻辑角色。文章据此把一元概念看作真值函数，并进一步说明二元关系。",
    englishContext:
      "Classes, Functions, Concepts, Relations reiterates that a mathematical function is not the object named by a complete expression. An expression such as 2 × ( )³ + ( ) leaves a gap and yields a value only when an argument fills it; in need of completion and unsaturated mark that logical role. Frege then treats a one-place concept as a truth-valued function and extends the account to relations.",
    distinction:
      "“未饱和”是函数表达式的逻辑依赖，不是实体缺陷、心理期待或句子语法不完整的普通意义。论元填空的比喻帮助区分角色，却不能把函数本身再次当成可随意塞入同层空位的对象。",
    englishDistinction:
      "Unsaturated names a function-expression's logical dependence, not an ontological defect, psychological expectation, or ordinary grammatical incompleteness. The gap metaphor distinguishes roles but does not turn the function itself into an object freely insertable into a gap at the same level.",
  },
  "frege-concept-object": {
    context:
      "〈论概念与对象〉回应 Benno Kerry 指控：短语“概念 horse”似乎指称一个对象，因而破坏弗雷格的区分。弗雷格承认自然语言造成这种别扭，却坚持谓词“是马”留下待对象补足的位置，而专名是饱和的；引文用“谓述性”概括概念在句中的功能。",
    englishContext:
      "On Concept and Object answers Benno Kerry's objection that the phrase the concept horse appears to designate an object and collapse Frege's distinction. Frege acknowledges the awkwardness imposed by ordinary language but insists that the predicate is a horse leaves a place for an object whereas a proper name is saturated; predicative summarizes the concept's sentential role.",
    distinction:
      "“概念”在此是能以对象为论元并得到真值的逻辑功能，不是日常的观念、词义或心理表象。说概念不是对象也不表示我们不能谈论概念，而是这种谈论会借名称把它以另一逻辑角色呈现。",
    englishDistinction:
      "Concept here is a logical function taking an object to a truth-value, not an everyday idea, word-meaning, or mental image. Saying a concept is not an object does not make concepts unspeakable; talk about them uses a name that presents the item in a different logical role.",
  },
  "du-bois": {
    context:
      "《黑人的灵魂》第一章先以白人未直说的“成为一个问题是什么感觉”开启，然后回忆童年被同学拒绝贺卡而发现隔开两个世界的帷幕。引文把此后自我经验描述为双重意识，下一句展开“既是美国人又是黑人”的两种灵魂、思想和奋斗在一个身体中的张力。",
    englishContext:
      "Souls of Black Folk I begins with the unspoken white question how does it feel to be a problem, then recalls a childhood classmate refusing Du Bois's card and revealing the veil between worlds. The excerpt names the resulting self-experience double-consciousness; the next sentence unfolds American and Negro, two souls, thoughts, and strivings within one body.",
    distinction:
      "双重意识不是多重人格诊断，也不是黑人本质上分裂；它由种族化社会目光与被拒绝的公民归属制造。透过他人眼睛看自己既可产生洞察也造成伤害，不能浪漫化为天然优势。",
    englishDistinction:
      "Double-consciousness is not a diagnosis of multiple personality or an essential split in Black people; it is produced by a racializing gaze and denied civic belonging. Seeing oneself through others' eyes can yield insight and injury and should not be romanticized as an innate advantage.",
  },
  "du-bois-color-line": {
    context:
      "写在前面的话用名句预告全书，紧接说明各章从不同侧面描绘黑人生活，并以“帷幕”意象邀请读者进入。后续关于自由民局、教育、投票、劳动契约和南方地域的分析，把肤色界线展开为制度、空间和知识结构，而非只是一条肤色态度分界。",
    englishContext:
      "The Forethought announces the book with this line, then says its essays approach Black life from different sides and invites readers within the Veil. Studies of the Freedmen's Bureau, education, suffrage, labor contracts, and the South unfold the color-line as institutional, spatial, and epistemic structure rather than merely a line of personal attitude.",
    distinction:
      "“二十世纪的问题”是战略性总括，不表示战争、阶级、殖民等其他问题不重要；杜波依斯正显示它们常被肤色界线组织。color line 也不限美国黑白二分，作者后来把它连接到全球殖民关系。",
    englishDistinction:
      "Problem of the twentieth century is a strategic thesis, not denial that war, class, or empire matter; Du Bois shows them frequently organized through the color-line. Nor is the term confined to a U.S. Black/white binary, since he later connects it to global colonial relations.",
  },
  "du-bois-washington-critique": {
    context:
      "第三章先承认华盛顿在暴力和失败年代争取经济立足的领导成就，再批评“亚特兰大妥协”把和解变成单方面放弃。列出三项之后，杜波依斯追踪投票权丧失、法律低等地位和高等教育资源撤退如何反过来妨碍财富与技术教育，继而提出选举权、公民平等与按能力教育的反要求。",
    englishContext:
      "Chapter III first recognizes Washington's leadership in seeking economic footing amid violence and defeat, then argues that the Atlanta Compromise turns conciliation into unilateral surrender. After listing the three concessions, Du Bois shows disenfranchisement, civil inferiority, and loss of higher education undermining wealth and vocational training themselves, then demands suffrage, civic equality, and education according to ability.",
    distinction:
      "批评对象不是工业教育或经济积累本身，而是把它们当作可替代政治权利与高等教育的唯一道路。杜波依斯也没有主张所有人只受学院教育；他的论点是教育层次和权利必须相互支撑而非互作交换筹码。",
    englishDistinction:
      "The target is not industrial education or economic accumulation as such but treating them as substitutes for political rights and higher learning. Du Bois does not demand academic education for everyone; levels of education and rights must support one another rather than become bargaining chips.",
  },
  russell: {
    context:
      "〈论指称〉先批评把指称短语当作意义实体或直接名称的理论，再提出“法国现任国王是秃头”之类句子的语境分析。引文把“那个 F 是 φ”拆成至少一个 F、至多一个 F、且该 F 是 φ 三项，使描述即使无对象也能组成有真值条件的命题；后文用此处理不存在者与同一性谜题。",
    englishContext:
      "On Denoting criticizes theories that treat denoting phrases as meaning-entities or direct names, then develops a contextual analysis of sentences such as the present King of France is bald. The excerpt analyzes the F is φ into existence, uniqueness, and predication, letting a description without a bearer occur in a proposition with truth-conditions; nonexistence and identity puzzles follow.",
    distinction:
      "分析的是整个含描述句的逻辑形式，不是说日常说话者脑中实际展开三条量词。描述无指称时句子通常为假，而非因一个神秘的“不存在对象”承载性质；但不同范围读法仍须逐句区分。",
    englishDistinction:
      "The analysis concerns the logical form of the whole containing sentence, not three quantifiers consciously rehearsed by ordinary speakers. A description without a denotation normally makes the analyzed claim false rather than introducing a mysterious nonexistent bearer, though scope readings still require sentence-by-sentence distinction.",
  },
  "russell-acquaintance-description": {
    context:
      "《哲学问题》第五章在怀疑物理桌子之后区分两种知识。亲知不经任何推论直接觉察感觉材料、内省内容等；描述知识则由“某个满足如此条件的对象”出发，把未直接呈现的物理对象纳入知识。章节随后要求每个可理解描述最终由我们亲知的成分组成。",
    englishContext:
      "After questioning the physical table, Problems of Philosophy V distinguishes two kinds of knowledge. Acquaintance is immediate awareness without inference of sense-data and introspected items; knowledge by description reaches a physical object not directly presented as whatever uniquely satisfies certain conditions. Russell then requires an intelligible description to be composed ultimately from items with which we are acquainted.",
    distinction:
      "“直接觉察”不保证关于对象的一切判断无误，也不等于熟悉一个人或积累经验的日常 acquaintance。罗素后来修改过亲知对象清单，因此这句给出理论角色，不是不可修订的心理事实目录。",
    englishDistinction:
      "Direct awareness does not make every judgment about an item infallible and is not everyday acquaintance through familiarity with a person. Russell later revised the inventory of acquainted objects, so the sentence gives a theoretical role rather than an unrevisable catalogue of mental facts.",
  },
  "russell-appearance-reality": {
    context:
      "《哲学问题》以日常桌子开场：颜色随光线和观察者改变，形状因透视而变化，触感也依身体条件。引文的问题不是立刻否认知识，而是把最确定者从“桌子本来就是我看到的样子”退回感觉材料，随后追问这些表象是否有一个公共、持续的物理对象作为原因。",
    englishContext:
      "Problems of Philosophy opens with an ordinary table whose color changes with light and observer, whose shape varies in perspective, and whose feel depends on bodily conditions. The question does not immediately deny knowledge; it retreats from the table simply being as it looks to sense-data, then asks whether appearances have a public, persisting physical cause.",
    distinction:
      "理性怀疑是寻找知识根据的起点，不是说任何意见都同样不确定或外部世界不存在。现象与实在的区分也不把现象称为欺骗；表象正是推论公共对象的证据。",
    englishDistinction:
      "Rational doubt begins a search for grounds of knowledge; it does not make every opinion equally uncertain or prove the external world nonexistent. Appearance is not thereby deception, since appearances are the evidence from which a public object is inferred.",
  },
  "russell-induction": {
    context:
      "第六章从太阳明日升起、食物仍有营养等预期出发，指出它们既不能由过去实例演绎，也不能用“自然齐一”而不循环地证明。引文提出休谟式问题，随后罗素把归纳原则视为无法由经验本身证明、却使从已知实例到未知实例的概率推理成为可能的一般原则。",
    englishContext:
      "Chapter VI begins from expectations that the sun will rise and food will continue to nourish, noting that past instances neither deductively entail them nor prove uniformity of nature without circularity. The question restates Hume's problem; Russell then treats induction as a general principle not provable by experience alone but enabling probable inference from observed to unobserved cases.",
    distinction:
      "归纳不提供逻辑必然保证，不表示过去频次毫无证据价值；结论强度依实例数量、变化条件和反例而改变。承认其哲学基础困难也不能推出科学预测与随意猜测同样可靠。",
    englishDistinction:
      "Induction gives no deductive guarantee, but past frequency is not evidentially worthless; strength varies with sample size, changing conditions, and counterinstances. Difficulty grounding induction philosophically does not make scientific prediction equivalent to arbitrary guessing.",
  },
  "russell-universals": {
    context:
      "第九章从白色、正义和“在……北边”等可由多个特殊事物共有的性质关系，引出共相。它们不在某一时间地点“存在”如具体物，却是命题可谈相似、关系与数学真理所需的对象；引文以“存在之域”对照时空中的“生存之域”。",
    englishContext:
      "Chapter IX moves from whiteness, justice, and relations such as north of—repeatable across particulars—to universals. They do not exist at a time and place as concrete things do, yet are required for propositions about similarity, relation, and mathematics; the excerpt contrasts their realm of being with the realm of temporal existence.",
    distinction:
      "“存在之域”不是一处藏着抽象物的第二空间，也不表示每个普通名词都对应一个共相。罗素提出一种实在论以解释知识，哪些共相必须承认仍要由逻辑分析而非语法表面决定。",
    englishDistinction:
      "The realm of being is not a second place storing abstract objects, and not every common noun automatically names a universal. Russell advances realism to explain knowledge, while logical analysis rather than surface grammar must decide which universals are required.",
  },
  "russell-logical-atomism": {
    context:
      "1918 年第一讲先区分世界中使命题真假的事实与我们用来断言它们的命题。省略处强调事实不因任何人喜欢或相信而改变，而信念具有指向事实的关系；后续再把事实分为特殊者、性质和关系构成的原子事实，并讨论否定事实难题。",
    englishContext:
      "The first 1918 lecture distinguishes facts that make propositions true or false from propositions by which we assert them. Across the omission facts remain what they are regardless of anyone's preference or belief, while beliefs point toward facts; Russell then analyzes atomic facts from particulars, qualities, and relations and confronts the problem of negative facts.",
    distinction:
      "“世界包含事实”不等于世界里没有事物，而是事物只有以具有性质、处于关系的方式才能使一句命题成立。逻辑原子也不是物理学原子，且罗素后来不再维持这套分析的所有细节。",
    englishDistinction:
      "The world containing facts does not remove things; things make propositions true only by having qualities or standing in relations. Logical atoms are not physical atoms, and Russell later abandoned parts of this particular analysis.",
  },
  "russell-theory-of-types": {
    context:
      "1908 年论文从罗素悖论和“所有不属于自身的类之类”出发，把恶性循环看作问题根源。引文给出循环原则：若一个对象只有先量化或定义一个包含它的总体才出现，该总体就不能先作为完成整体使用；后文以命题函数和类型层级限制可合法量化的范围。",
    englishContext:
      "The 1908 paper begins from Russell's paradox and the class of all classes not members of themselves, locating the trouble in vicious circularity. The excerpt states the principle: if an item can occur only through quantifying over or defining a totality containing it, that totality cannot first be used as complete. Orders of propositional functions and types then restrict legitimate ranges of quantification.",
    distinction:
      "类型论限制特定形式的自指，不是说任何谈论自身、反馈循环或递归都矛盾；后来逻辑体系也发展了其他处理。把总体分层是一项技术方案，不能未经桥接便变成社会身份应隔离的比喻。",
    englishDistinction:
      "Type theory restricts specific forms of self-reference, not every instance of talking about oneself, feedback, or recursion; later logical systems offer other treatments. Stratifying totalities is a technical proposal and cannot become a metaphor for segregating social identities without argument.",
  },
  "russell-logical-construction": {
    context:
      "《外部世界知识》第四讲试图从瞬时感觉材料与不同观察者的视角重建物理空间、物和时刻。所谓理想要素可被定义成事件或显现的集合、序列和关系，而不另加不可经验实体；引文说明只要构造能确定何时实现，物理定律便可对它量化。",
    englishContext:
      "Lecture IV of Our Knowledge of the External World tries to reconstruct physical space, things, and instants from momentary sense-data and perspectives of different observers. Ideal elements can be defined as classes, series, and relations of events or appearances rather than added as unexperienced entities; the excerpt allows physics to quantify over a construction when conditions of realization are specified.",
    distinction:
      "逻辑构造不是说桌椅只是幻觉，或科学对象可被任意定义；构造必须保存经验差异并支撑定律。“以构造替推论实体”的方法节约本体承诺，却不自动证明某一具体构造充分。",
    englishDistinction:
      "Logical construction does not make tables illusory or scientific objects arbitrarily definable; a construction must preserve experiential differences and support laws. Replacing inferred entities with constructions economizes ontology but does not automatically prove any particular construction adequate.",
  },
  "husserl-intentionality": {
    context:
      "1929 年百科条目先要求现象学心理学描述意识生活本身，而不把它还原成外部自然因果。第一部分随即以 perception-of、memory-of、judgment-about 等结构说明每种意识都以某种方式朝向对象；后面再区分意识行为、所意指对象及对象被给予的样式。",
    englishContext:
      "The 1929 Encyclopaedia article first asks phenomenological psychology to describe conscious life itself rather than reduce it to external natural causation. Part I then uses perception-of, memory-of, and judgment-about to show each consciousness directed toward an object in some mode, before distinguishing conscious act, intended object, and the manner of givenness.",
    distinction:
      "“一切意识都有意向性”中的 intentional 不等于故意、计划或道德意图；做梦和误认同样有对象指向。对象被指向也不保证对象现实存在，想象独角兽正说明意向对象与存在承诺可分。",
    englishDistinction:
      "Intentional does not mean deliberate, planned, or morally intended; dreaming and misperception are directed too. Directedness also does not guarantee that the object exists—imagining a unicorn distinguishes an intentional object from existential commitment.",
  },
  "quine-ontological-commitment": {
    context:
      "〈论何物存在〉先处理麦克斯·布莱克式反对：否认飞马存在似乎必须先指称飞马。奎因借罗素描述理论把名称改写进量化语句，再问一个理论为真时约束变量必须取哪些值；引文的口号在此给出本体承诺准则，后续用“有某个 x”区分名称与存在量化。",
    englishContext:
      "On What There Is begins with the objection that denying Pegasus seems first to refer to Pegasus. Quine uses Russellian paraphrase to move names into quantified sentences, then asks what values bound variables must take for a theory to be true. The maxim gives that criterion of ontological commitment before later formulations distinguish naming from saying there is some x.",
    distinction:
      "成为变量值不是说任何程序变量、代词或未约束符号都创造实体；关键是理论的规范逻辑改写中受存在量词约束的范围。准则显示理论承诺什么，不单独决定我们应接受哪套理论或哪种最佳改写。",
    englishDistinction:
      "Being a variable's value does not let any programming variable, pronoun, or free symbol create an entity; the relevant range is bound by existential quantification in a canonical regimentation. The criterion reveals a theory's commitments but does not by itself select the theory or its best paraphrase.",
  },
  "wittgenstein-language-world": {
    context:
      "《逻辑哲学论》5.6 位于一般命题形式和逻辑界限讨论之后；5.61 紧接说逻辑充满世界，世界的界限也是逻辑的界限，因而我们不能在语言中陈述一个越出世界、又与世界比较的立场。后面的 5.62—5.641 用这条边界重新处理唯我论及形而上主体。",
    englishContext:
      "Tractatus 5.6 follows the account of general propositional form and logical limits. Proposition 5.61 immediately says logic fills the world and its limits are the world's limits, so language cannot state a standpoint outside the world and compare the two. Propositions 5.62–5.641 then use that boundary to recast solipsism and the metaphysical subject.",
    distinction:
      "“我的语言”不是个人词汇量决定现实大小，也不是不会命名就不存在；它指主体可形成有意义命题的整体逻辑语言。学习新语言能改变可表达与注意之物，却不能由此推出私人语言任意创造事实。",
    englishDistinction:
      "My language is not an individual's vocabulary setting reality's size, nor does lack of a name make something nonexistent; it is the whole logical language in which a subject can form meaningful propositions. New language can change expression and attention without letting private wording arbitrarily create facts.",
  },
  "wittgenstein-world-facts": {
    context:
      "全书用 1“世界是所有发生之事”开篇，1.1 马上把“发生之事”澄清为事实而非孤立事物，1.11 又说世界由全部事实以及哪些不是事实来规定。接下来的 2 展开事实是事态的存在，事态则由对象以确定方式结合，为图像论准备本体结构。",
    englishContext:
      "The book opens with 1, the world is all that is the case, and 1.1 immediately clarifies what is the case as facts rather than isolated things; 1.11 adds that the totality of facts determines both what is and what is not the case. Proposition 2 then analyzes a fact as the existence of a state of affairs composed of objects in a determinate combination, preparing the picture theory.",
    distinction:
      "“不是事物的总和”不否认事物存在，而是否认一张对象清单足以构成世界；还需要它们实际怎样组合。facts 在此是使命题真假的事态，不等于新闻、数据点或人们共同相信的陈述。",
    englishDistinction:
      "Not the totality of things does not deny things; it denies that an inventory of objects suffices without how they are actually combined. Facts here are obtaining states of affairs that make propositions true, not news items, data points, or collectively believed statements.",
  },
  "wittgenstein-picture-reality": {
    context:
      "2.1 开启图像论：图像的要素按某种关系排列，借与可能事态共享逻辑形式来表现事实；图像本身也可以真或假。跨章到 4.01，命题被称为现实图像，随后以乐谱、唱片和声音之间的投影关系说明命题要素如何对应对象并呈现一种可能组合。",
    englishContext:
      "Proposition 2.1 opens the picture theory: elements of a picture are arranged in relations and represent a fact by sharing logical form with a possible state of affairs; a picture can itself be true or false. Across the chapter break 4.01 calls a proposition a picture of reality, followed by score, record, and sound as projections illustrating how propositional elements correspond to objects in a possible combination.",
    distinction:
      "“图像”不是命题必须长得像照片，也不表示语言只复制已发生事实；逻辑图像能够表现可能但未实现的事态。共享形式使真假比较成为可能，却不能由命题自身保证它与现实相符。",
    englishDistinction:
      "Picture does not require a proposition to resemble a photograph or restrict language to copying actual facts; a logical picture can represent a possible state of affairs that does not obtain. Shared form permits true/false comparison but cannot guarantee from the proposition alone that reality agrees.",
  },
  "wittgenstein-proposition-shows-form": {
    context:
      "4.12 之后区分命题所描画的现实与命题必须同现实共有的逻辑形式。4.121 说命题不能站到自身形式之外再把它表现为一个事实，而只能在有意义地表示事实时显示该形式；跨到 4.1212，言说/显示区分由此成为排除逻辑伪命题的界线。",
    englishContext:
      "After 4.12 the text distinguishes the reality a proposition depicts from the logical form proposition and reality must share. Proposition 4.121 says a proposition cannot step outside its own form and represent that form as another fact; it shows the form in meaningfully representing facts. At 4.1212 the saying/showing distinction becomes a boundary against pseudo-propositions about logic.",
    distinction:
      "“不能说出”在早期维特根斯坦这里是逻辑语法限制，不等于某事神秘、不可交流或应被权威封口；显示也不是含糊暗示。该区分属于《逻辑哲学论》的图像理论，不能不加说明套到后期语言游戏观点。",
    englishDistinction:
      "Cannot be said is a limit of logical syntax in early Wittgenstein, not proof that something is mystical, incommunicable, or to be censored by authority; showing is not vague insinuation. The distinction belongs to the Tractatus picture theory and should not be transferred without qualification to the later language-games.",
  },
  "wittgenstein-silence": {
    context:
      "命题 7 是全书最后一句，接在 6.4—6.54 对伦理、世界意义、神秘之物和方法的讨论之后。6.53 把正确方法描述为只说自然科学命题，并在他人试图形而上言说时指出符号未获意义；6.54 又以用后抛掉梯子比喻读者超越全书命题，最终才落到沉默。",
    englishContext:
      "Proposition 7 closes the book after 6.4–6.54 on ethics, the meaning of the world, the mystical, and philosophical method. At 6.53 the right method says only propositions of natural science and shows when metaphysical signs lack assigned meaning; 6.54 compares the book's own propositions to a ladder thrown away after ascent, only then ending in silence.",
    distinction:
      "沉默不是对未知都停止研究，也不是“不能立刻证明便不可讨论”；它针对无法在该逻辑体系中形成事实命题的尝试。伦理重要性在文中没有被宣布无价值，反而因不能化成世界内事实而处于另一界限关系。",
    englishDistinction:
      "Silence is not a halt to inquiry about everything unknown or a ban on discussing what cannot yet be proved; it concerns attempts that form no factual proposition within this logical system. Ethical importance is not declared worthless but placed in a different relation to the boundary because it is not another fact within the world.",
  },
  "wittgenstein-logic-mirror": {
    context:
      "6.1—6.13 从逻辑命题是重言式、没有描述内容推进到它们构成命题形式的支架。6.12 说逻辑命题的真假只由符号本身看出，无须与事实比较；6.13 因而否认逻辑是一套关于世界对象的理论，把它称为世界可表述结构的映像与超验条件。",
    englishContext:
      "Propositions 6.1–6.13 move from logical propositions as tautologies without descriptive content to their role as the scaffolding of propositional form. At 6.12 their truth is recognized from the symbols alone without comparison to facts; 6.13 therefore denies that logic is a theory about worldly objects and calls it a reflection and transcendental condition of the world's articulability.",
    distinction:
      "“超验”在这里不是超自然或神秘直觉，而是逻辑不作为世界中的另一个事实出现；“映像”也不让逻辑从经验归纳得出。此句属于早期体系，不能证明只有一种永恒形式逻辑足以处理所有语言实践。",
    englishDistinction:
      "Transcendental here is not supernatural or mystical intuition; logic does not appear as one more fact in the world. Reflection also does not make logic an empirical generalization. The sentence belongs to the early system and cannot prove that one eternal formal logic exhausts every linguistic practice.",
  },
  dewey: {
    context:
      "《民主与教育》第四章先反驳把教育看成朝固定成熟终点填补儿童缺陷，主张未成熟性包含依赖与可塑的积极能力。章末小结把“生长”定义为重新组织活动、增加后续生长条件，因而教育的目的内在于每次经验扩展，而不是由教育之外的成人模板规定。",
    englishContext:
      "Democracy and Education IV rejects education as filling a child's deficiency toward a fixed mature endpoint, treating immaturity as positive dependence and plasticity. The summary defines growth as reorganizing activity so that conditions for further growth increase; education's end is internal to each enlargement of experience rather than an adult template outside education.",
    distinction:
      "“没有外在目的”不等于教学无目标、无课程或任何变化都是好成长；杜威以能否继续生长评估当前方向。成瘾、狭隘技能和支配习惯也会增强，却因封闭未来经验而不能成为教育理想。",
    englishDistinction:
      "No end beyond itself does not eliminate aims, curriculum, or evaluation and does not make every change good growth; Dewey judges a present direction by whether it enables further growth. Addiction, narrow skill, and domination can intensify yet remain miseducative because they close future experience.",
  },
  "dewey-democracy-associated-living": {
    context:
      "第七章先提出衡量社会的两项标准：成员共享利益的数量与多样性，以及群体之间自由、充分的交往。民主理想由这两项推出，名句把它从政府机关扩展为联合生活和经验交流；紧接着教育被赋予让个人对社会关系有切身兴趣并形成持续调整习惯的任务。",
    englishContext:
      "Chapter VII proposes two measures of a society: the number and variety of interests consciously shared and the freedom and fullness of intercourse among groups. The democratic ideal follows from both, and the maxim expands democracy beyond governmental machinery into associated living and communicated experience; education is then charged with forming personal interest in social relations and habits of continuing readjustment.",
    distinction:
      "民主“不只是政府形式”并不降低选举、权利和制度制衡的重要性；这些是共同生活免受垄断的条件。频繁交流也未必民主，若发言权与后果分配不平等，传播可以强化支配而非共享经验。",
    englishDistinction:
      "Democracy being more than government does not diminish elections, rights, or institutional checks; they are conditions preventing monopolization of associated life. Communication alone is not democratic when voice and consequences are unequal, since circulation can reinforce domination rather than share experience.",
  },
  "dewey-experience-and-thinking": {
    context:
      "第十一章先区分只是遭遇变化的尝试与完整经验：儿童把手伸进火里，若没有把灼痛关联到先前动作，就只有先后事件。引文以行动延续到承受后果、后果反过来改造行动者为学习条件；下一步把反思定义为有意发现“做”与“承受”之间的具体联系。",
    englishContext:
      "Chapter XI distinguishes merely undergoing change from having an experience. If a child puts a hand in fire without connecting the burn to the prior act, events only succeed one another. The excerpt makes learning depend on carrying activity into consequences that modify the agent; reflection then deliberately discovers the detailed connection between doing and undergoing.",
    distinction:
      "“从经验学习”不是经历越多自然越聪明，也不是用一次后果作草率因果结论；意义来自可检验的连接。严重伤害不应被合理化为学习机会，教育的任务包括设计可以观察后果而不付不可逆代价的环境。",
    englishDistinction:
      "Learning from experience is not automatic wisdom from accumulating events or a causal conclusion from one outcome; meaning comes from a testable connection. Serious harm should not be justified as a learning opportunity, and education includes designing environments where consequences can be observed without irreversible cost.",
  },
  "dewey-habit-social": {
    context:
      "《人性与行为》第一部分反对把习惯当作藏在个体内部、偶尔向外发作的心理所有物。引文用看、走和说话逐例把有机能力与光线、地面、空气、同伴和听众结合；随后杜威把习惯称为环境要素与人的要素共同组织成的功能，制度因此参与塑造品格。",
    englishContext:
      "Human Nature and Conduct I rejects habits as psychological possessions stored inside an individual and occasionally discharged outward. Seeing, walking, and speech join organic powers with light, ground, air, companions, and audience; Dewey then calls habit a function co-organized by environmental and human elements, making institutions participants in character formation.",
    distinction:
      "社会构成习惯不表示个人没有能动性或环境单向决定行为；改变可从身体练习、工具、同伴和制度多处入手。也不能因行为有情境条件便免除责任，责任可包括重建维持坏习惯的条件。",
    englishDistinction:
      "Social constitution of habit does not erase agency or make environment unilaterally determine conduct; change can begin through bodily practice, tools, associates, or institutions. Situated causes do not abolish responsibility, which may include reconstructing conditions that sustain a bad habit.",
  },
  "dewey-public-consequences": {
    context:
      "《公众及其问题》第一章从人与人交易区分直接后果和波及未参与者的间接后果。后者若广泛、持久到需要有组织的监督，受影响者便构成公众，并设立官员照料共同利益；下一章再追问现代技术使后果过于复杂、公众难以识别自身的问题。",
    englishContext:
      "The Public and Its Problems I distinguishes direct consequences to participants in transactions from indirect consequences reaching others. When indirect effects are extensive and enduring enough to require organized oversight, those affected constitute a public and establish officials to care for shared interests; the next chapter asks how modern technological complexity prevents such a public from identifying itself.",
    distinction:
      "公众不是预先存在、意见完全一致的人群，也不等同国家或舆论；它围绕可追踪的间接后果形成。官员“照料”不自动代表受影响者，民主仍要求调查、沟通与问责使公众能够认识并修正代理。",
    englishDistinction:
      "A public is not a preexisting group with one opinion and is not identical to the state or public opinion; it forms around traceable indirect consequences. Officials do not automatically represent those affected, so democratic inquiry, communication, and accountability must let a public recognize and correct its agents.",
  },
};
