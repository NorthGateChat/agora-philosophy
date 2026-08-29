import type { InterpretationDetail } from "./interpretationTypes";

/** Hand-written close readings from Machiavelli through Rousseau. */
export const westernMiddleStaticDetails: Record<string, InterpretationDetail> = {
  machiavelli: {
    context:
      "《君主论》第十五章由“许多人想象从未见过的共和国和君主国”转向事情的实际真相，随后指出现实生活与应当生活相距甚远，并要求君主在必要时学会不做传统意义上的善人。引文开启的是对政治判断前提的修正，后续才逐项讨论德目在权力处境中的效果。",
    englishContext:
      "Chapter XV of The Prince turns from the many imagined republics and principalities never seen in fact to the effectual truth, then stresses the distance between how people live and how they ought to live before saying a prince must learn how not to be conventionally good when necessity requires it. The excerpt resets the premises of political judgment before later chapters test particular virtues in power.",
    distinction:
      "追随“真实真相”不等于事实本身能决定善恶，也没有许可君主使用任何有效手段；这一章迫使规范面对可预见后果，但行为是否必要、服务谁和造成何种伤害仍须判断。",
    englishDistinction:
      "Following the effectual truth does not let facts alone determine right and wrong or authorize any effective means. The chapter forces norms to face foreseeable consequences, while necessity, beneficiaries, and harms remain matters for judgment.",
  },
  "machiavelli-fear-love": {
    context:
      "《君主论》第十七章从仁慈与残酷的名声切入，以切萨雷·博尔贾、佛罗伦萨和汉尼拔比较秩序效果，才提出爱与畏惧难以兼得时何者更安全。紧随引文的限制是避免仇恨，尤其不可任意侵夺臣民财产与家属；安全论证因此不是无限恐怖统治。",
    englishContext:
      "Chapter XVII begins with reputations for mercy and cruelty and compares Cesare Borgia, Florence, and Hannibal before asking which is safer when love and fear cannot be united. The qualification immediately retained is to avoid hatred, especially by not arbitrarily seizing subjects' property and families; the security argument is therefore not a case for unlimited terror.",
    distinction:
      "“畏惧比爱安全”针对缺乏对等性的君主统治，不是一条适用于亲密关系、教育或团队的普遍建议；它也只比较两项政治依附机制，没有证明恐惧能产生信任或正当性。",
    englishDistinction:
      "Fear being safer than love concerns asymmetrical princely rule, not a general recommendation for intimacy, education, or teams. It compares two mechanisms of political attachment without showing that fear creates trust or legitimacy.",
  },
  "machiavelli-fox-lion": {
    context:
      "《君主论》第十八章先问君主应否守信，继而借喀戎半人半兽的教育说统治者须会使用人的法律与兽的力量。狐狸识陷阱、狮子退群狼正细分“兽性”的两种能力；后文再谈必要时不守承诺以及维持德性外观。",
    englishContext:
      "Chapter XVIII first asks whether princes should keep faith, then uses Chiron's half-human, half-beast education to say rulers must command both human law and animal force. The fox detecting snares and lion frightening wolves divide that animal capacity into cunning and strength; the chapter next discusses breaking faith under necessity and maintaining the appearance of virtue.",
    distinction:
      "双兽比喻没有把欺骗变成一般德性，也未说明每个可疑处境都存在“必要”；它诊断敌对政治中的能力组合，同时让读者继续追问谁界定陷阱、欺骗会怎样侵蚀制度。",
    englishDistinction:
      "The two beasts do not make deception a general virtue or establish necessity in every suspicious situation. They diagnose capacities in adversarial politics while leaving open who defines a snare and how deceit corrodes institutions.",
  },
  "machiavelli-fortune": {
    context:
      "《君主论》第二十五章回应“世事由命运和上帝支配，人的审慎无用”的流行意见。马基雅维利先保留约一半给自由行动，继而把命运比作洪水：平静时可筑堤疏渠；末段又说明成功取决于行动方式能否随时代性质改变。",
    englishContext:
      "Chapter XXV answers the prevailing opinion that fortune and God govern affairs so completely that prudence is useless. Machiavelli first reserves roughly half for free action, then compares fortune to a flood against which dikes can be built in calm weather, and finally argues that success depends on whether one's mode of action fits changing times.",
    distinction:
      "“一半”是限制宿命论的修辞估量，不是由数据测得的固定因果比例；筑堤也只说明准备可改变暴露程度，不能保证谨慎者避开一切灾难或把受害归咎于准备不足。",
    englishDistinction:
      "One half is a rhetorical estimate limiting fatalism, not a statistically measured causal constant. Building dikes shows that preparation can alter exposure; it does not guarantee escape from every disaster or blame victims for insufficient foresight.",
  },
  "machiavelli-conflict-liberty": {
    context:
      "《论李维》I.4 直接反驳把罗马贵族与平民骚动视为共和国缺陷的批评者，主张这些冲突催生护民官等保卫自由的制度。前一章刚论民众在王政结束后的作用，后一章则比较谁更适合守护自由，冲突论嵌在制度承接而非街头对抗本身。",
    englishContext:
      "Discourses I.4 directly answers critics who treat the tumults between Roman nobles and plebs as defects, arguing that they produced institutions such as the tribunes that guarded liberty. The preceding chapter considers the people's role after monarchy and the next asks who should guard freedom, so conflict matters through institutional uptake rather than street confrontation by itself.",
    distinction:
      "这段没有说任何派系斗争都会导向自由；若缺乏发声渠道、共同法律和力量约束，冲突同样可能变成镇压或内战。罗马例证提供反驳“和谐必善”的个案，不是普遍历史定律。",
    englishDistinction:
      "The passage does not say every factional struggle produces freedom. Without channels of voice, common law, and constraints on force, conflict can become repression or civil war; Rome is a counterexample to automatic praise of harmony, not a universal historical law.",
  },
  "machiavelli-founding": {
    context:
      "《论李维》I.9 为罗慕路杀兄与清除同僚的严厉例子辩护时，区分创制阶段需要统一意志与制度完成后应由众人维护。马基雅维利以结果是否为公共利益而非创立者私利作为辩护条件，并让独力创制过渡到集体保有。",
    englishContext:
      "Discourses I.9 confronts the severe example of Romulus killing his brother and removing a colleague by distinguishing unified will at founding from collective maintenance after institutions exist. Machiavelli makes public rather than private benefit a condition of the defense and requires one-person institution-making to pass into custody by many.",
    distinction:
      "创制需要集中并不证明暴力天然正当，也不能让成功者以结果倒推一切行为无罪；“交由众人”正限制创立者把例外权力永久化，且何为公共利益仍需独立检验。",
    englishDistinction:
      "Concentrated founding does not make violence inherently just or let victors retroactively absolve every act by success. Entrusting institutions to many limits permanent emergency power, while the alleged public benefit still needs independent scrutiny.",
  },
  francis_bacon: {
    context:
      "《新工具》卷一第1条先称人为自然的仆人和解释者，第3条才把知识与力量相联，并立即用“自然只有在服从中才被征服”限定这种力量。原因在思辨中被认识，在操作中成为规则，知识—能力关系因此依赖可重复的因果顺序。",
    englishContext:
      "Novum Organum I.1 first calls the human being nature's servant and interpreter; I.3 then links knowledge with power and immediately qualifies conquest of nature as possible only through obedience. What appears as cause in contemplation becomes a rule in operation, so capacity depends on a repeatable causal order.",
    distinction:
      "知识与力量同义不是说知道命题便拥有政治权力，也不把自然仅视为可任意榨取的对象；培根式“服从”要求操作接受事物规律校正，目的与分配仍不是因果知识自行回答的问题。",
    englishDistinction:
      "Knowledge synonymous with power does not give political authority to anyone who knows a proposition or make nature an object for arbitrary extraction. Baconian obedience makes operations answer to regularities, while ends and distribution are not settled by causal knowledge alone.",
  },
  "francis-bacon-method": {
    context:
      "《新工具》I.19 对举两条发现道路：一条由感觉和少数个例飞跃到最高公理，再让中间命题迁就它；另一条经由逐级的中间公理上升。随后数条把第一条归因于心灵急于求定和旧逻辑习惯，第二条则成为全书尚待施工的方法。",
    englishContext:
      "Novum Organum I.19 contrasts two routes: one flies from sense and a few particulars to the most general axioms and forces intermediate claims to conform, while the other ascends through graded middle axioms. The following aphorisms connect the first route to the mind's haste for certainty and inherited logic, making the second the book's unfinished project.",
    distinction:
      "逐级上升不等于没有假说、只要堆积事实便会自动发现真理；中间公理必须组织比较并接受反例。培根反对的是过早封顶，不是推理、创造性设想或理论结构本身。",
    englishDistinction:
      "Gradual ascent does not eliminate hypotheses or let accumulated facts discover truth automatically; middle axioms must organize comparisons and face counterinstances. Bacon opposes premature closure, not reasoning, inventive conjecture, or theoretical structure as such.",
  },
  "francis-bacon-idols": {
    context:
      "《新工具》I.38 先说盘踞心灵的幻象不仅阻碍真理，也会在科学更新后继续回来；I.39 为四类命名，I.41 起再逐项解释族类、人之洞穴、语言市场和哲学剧场的来源。分类是后续诊断目录的入口，不是四个彼此隔绝的心理盒子。",
    englishContext:
      "Novum Organum I.38 warns that idols already occupying the mind obstruct truth and can return even after the sciences are renewed. I.39 names four kinds, and I.41 onward explains their sources in the human tribe, the individual's cave, the marketplace of language, and the theater of philosophical systems. The list opens a diagnostic sequence rather than four sealed mental boxes.",
    distinction:
      "“幻象”不是说感官与语言完全不可信，也不能把错误都归为个人偏见；市场和剧场尤其把公共用词与继承体系纳入审查，而识别类别本身尚未构成纠偏证据。",
    englishDistinction:
      "Idols do not make sense and language wholly untrustworthy or reduce every error to individual bias. Marketplace and theater expressly expose public words and inherited systems to scrutiny, while labeling a category is not yet evidence that a judgment has been corrected.",
  },
  "francis-bacon-light-fruit": {
    context:
      "《新工具》I.99 批评实验史贫乏且多局限于既有工艺，因而要求把大量即使眼前无用的实验收入自然史。培根称它们“照明”是因为它们帮助发现原因和公理，并与立刻产生收益的“结果”实验区分。",
    englishContext:
      "Novum Organum I.99 criticizes the poverty of experimental history and its confinement to established arts, then calls for collecting many experiments that lack immediate use. Bacon calls them experiments of light because they aid discovery of causes and axioms, distinguishing them from experiments that yield prompt profit or fruit.",
    distinction:
      "重视照明实验不表示应用成果可有可无，也不保证所有无用研究终会有巨大回报；区分所保护的是探索原因的时间尺度，同时仍要求实验进入可共享、可比较的自然史。",
    englishDistinction:
      "Valuing experiments of light does not make applications dispensable or guarantee that every presently useless study will pay off greatly. The distinction protects the time scale of causal inquiry while still requiring experiments to enter a shareable, comparable history.",
  },
  "francis-bacon-ladder": {
    context:
      "《新工具》I.104 要求由个例、低层公理、中间公理到最高公理保持连续阶梯，I.105 随即贬斥只按相似例子枚举的归纳。后文提出排除表与否定实例，使“阶梯”不仅是概括层级，也包含区分竞争解释的筛选程序。",
    englishContext:
      "Novum Organum I.104 requires an unbroken scale from particulars through lesser and intermediate axioms to the most general; I.105 immediately rejects induction by simple enumeration. Later tables of exclusion and negative instances make the ladder not merely levels of generalization but a procedure for discriminating rival explanations.",
    distinction:
      "连续阶梯不是证据越多结论就线性越真，也没有给出可机械执行的万能算法；若样本偏置、测量错误或竞争假说作出同样预测，枚举与层级仍不能单独识别原因。",
    englishDistinction:
      "An unbroken ladder does not make a conclusion linearly truer with every added observation or supply a universal mechanical algorithm. Biased samples, measurement error, and rival hypotheses with identical predictions can still defeat causal discrimination.",
  },
  hobbes: {
    context:
      "《利维坦》第一章在全书开端把思想材料追溯到感觉，紧接着以外物运动压迫感官、神经与脑心来说明感觉如何产生“表象”或显现。第二章再由感觉留下的衰退影像解释想象与记忆，因此“其余派生”是一条心理机制次序。",
    englishContext:
      "Leviathan I opens the work by tracing the material of thought to sense, then explains sensation through motions of external bodies pressing organs, nerves, and brain or heart to produce an appearance. Chapter II derives imagination and memory from decaying sense, so the claim that the rest is derived states a psychological sequence.",
    distinction:
      "感觉起源说不表示心灵只被动复制外物，也不能由此推出每个观念都真实；霍布斯自己的“表象”已区分外在运动与经验呈现，组合、语言和推理还会改变后来思想的结构。",
    englishDistinction:
      "Origin in sense does not make the mind a passive copy of outer objects or render every idea true. Hobbes's appearance already distinguishes external motion from experienced presentation, and combination, language, and reasoning further reshape thought.",
  },
  "hobbes-language": {
    context:
      "《利维坦》第四章先让语言承担记录思考与向他人传达两项用途，再列出名称误用如何生成荒谬。把词称作智者的筹码、愚者的钱币，是因为前者凭定义核算名称关系，后者把著名作者的用语当作事物价值本身。",
    englishContext:
      "Leviathan IV first gives speech the uses of registering thought and communicating it, then catalogs abuses of names that generate absurdity. Words are counters for the wise because they reckon through definitions, but money for fools because the latter accept the phrases of celebrated authors as if names carried value in themselves.",
    distinction:
      "筹码比喻没有说语言只是任意符号、可以脱离世界封闭计算；霍布斯要求从定义开始并把推理后果核回对象。它批评词语崇拜，而不是贬低修辞、历史语义或自然语言。",
    englishDistinction:
      "The counter metaphor does not make language an arbitrary system that can calculate apart from the world. Hobbes begins from definitions and checks consequences against their subject; he criticizes word worship, not rhetoric, historical meaning, or ordinary language as such.",
  },
  "hobbes-reasoning": {
    context:
      "《利维坦》第五章把推理接在名称定义之后，以加减说明如何由约定的一般名称核算后果，并以几何学为定义清楚的范例。章节随即区分错误与荒谬：计算可失误，而从无意义名称出发会得到连真假都谈不上的话。",
    englishContext:
      "Leviathan V follows the account of names by defining reason as addition and subtraction of their consequences, with geometry as a model of clear definitions. The chapter then separates error from absurdity: calculation may go wrong, but meaningless names yield utterances to which truth and falsity scarcely apply.",
    distinction:
      "把理性说成计算不是把一切判断缩成数字运算，也不保证形式有效的结论真实；名称的定义、前提与外部事实若有问题，正确推导只会保留这些问题。",
    englishDistinction:
      "Calling reason reckoning does not reduce every judgment to numerical arithmetic or guarantee the truth of a formally valid conclusion. Defective definitions, premises, or contact with fact survive even impeccable derivation.",
  },
  "hobbes-equality": {
    context:
      "《利维坦》第十三章先承认身心能力有差异，却说最弱者可凭秘密手段或结盟杀死最强者，而智力差异也不足以给任何人稳定垄断。由这种相互脆弱与相近希望，论证才推进到对同一目标的竞争。",
    englishContext:
      "Leviathan XIII acknowledges differences of body and mind but argues that the weakest can kill the strongest by secrecy or alliance and that differences in prudence give no one a secure monopoly. From mutual vulnerability and comparable hope, the argument then advances to competition for the same ends.",
    distinction:
      "自然平等不是能力、资源或社会地位完全相同，更不是否认结构性优势；它是无人强到可永久免受他人威胁的最低政治条件，也尚未等于平等权利的完整规范论证。",
    englishDistinction:
      "Natural equality is not identity of talent, resources, or social position and does not deny structural advantage. It is the minimal political condition that no one remains permanently beyond others' threat, not yet a complete normative theory of equal rights.",
  },
  "hobbes-state-of-nature": {
    context:
      "《利维坦》第十三章由平等希望推出竞争、猜疑与荣誉三种争端原因，分别追求所得、安全和名声。随后“战争”被界定为没有共同权力时人人显出交战意图的一段时期，而非每一刻都实际打斗；和平是其余时间。",
    englishContext:
      "Leviathan XIII derives competition, diffidence, and glory from equality of hope, associating them with gain, safety, and reputation. It then defines war as a period in which, without a common power, people display a known disposition to fight—not continuous battle at every instant—while the remaining time is peace.",
    distinction:
      "三因不证明人天生嗜血，也不能把一切冲突还原为固定本性；制度缺位和对他人意图不可确信是论证条件，改变保障与信息结构便可能改变行为。",
    englishDistinction:
      "The three causes do not prove innate bloodlust or reduce all conflict to fixed nature. The absence of institutions and uncertainty about others' intentions are conditions of the argument, so changing security and information can change conduct.",
  },
  "hobbes-right-nature": {
    context:
      "《利维坦》第十四章先区分自然权利的行动自由与自然法的理性禁令：人人保有对一切的自由时便无安全。第一自然法要求寻求和平，第二法才在他人同样愿意时互相放下相应权利，由对称限制打开契约空间。",
    englishContext:
      "Leviathan XIV first separates the liberty of natural right from the rational prohibition of natural law: while everyone retains a right to everything, no one is secure. The first law seeks peace, and the second requires laying down corresponding rights only when others are willing too, opening covenant through reciprocal restraint.",
    distinction:
      "放下权利不是放弃一切自卫，也不要求一方在他人拒绝约束时单独缴械；霍布斯保留不可转让的保命权，并让义务范围取决于对等转让与有效保障。",
    englishDistinction:
      "Laying down right is not surrender of every defense or unilateral disarmament when others refuse restraint. Hobbes retains an inalienable claim to self-preservation and makes obligation depend on reciprocal transfer and effective assurance.",
  },
  "hobbes-justice": {
    context:
      "《利维坦》第十五章把“履行契约”列为第三自然法，并据此定义不义为不履约；但段落马上补充，只有存在能强制双方、消除合理恐惧的共同权力，契约才稳定有效。正义由承诺内容与制度保证共同构成。",
    englishContext:
      "Leviathan XV names performance of covenants the third law of nature and defines injustice as nonperformance, but immediately adds that covenants become stable only where a common power can compel both sides and remove reasonable fear. Justice joins the content of promise to institutional assurance.",
    distinction:
      "履约原则不使胁迫、欺诈或本来无效的约定自动正义，也不说国家出现前所有背叛都在道德上无关紧要；霍布斯的技术定义须与有效契约条件一起阅读。",
    englishDistinction:
      "The rule of performance does not make coerced, fraudulent, or otherwise invalid agreements just, nor make every betrayal before a state morally insignificant. Hobbes's technical definition must be read with his conditions for a valid covenant.",
  },
  "hobbes-commonwealth": {
    context:
      "《利维坦》第十七章在列举和平所需自然法之后说，仅有多数人的短暂同意仍不能抵御外敌与彼此伤害，必须建立持久共同权力。众人相互订约，授权一个人或会议代表其人格，“把众意归一”由代表关系而非心理同感完成。",
    englishContext:
      "Leviathan XVII argues after listing laws of peace that temporary concurrence among a multitude cannot defend against foreign enemies and mutual injury; an enduring common power is needed. Each covenants with the others to authorize one man or assembly to bear their person, so one will is produced by representation rather than shared feeling.",
    distinction:
      "授权共同人格不是每个人真的拥有同一欲望，也不能把任何掌权者都视为已经获得同意；谁被代表、授权怎样成立及哪些行为仍不可转让，都是引文结构中的限制。",
    englishDistinction:
      "Authorizing one public person does not give everyone identical desires or make every ruler already consented to. Who is represented, how authorization is formed, and which acts remain inalienable are limits internal to the construction.",
  },
  "hobbes-sovereignty": {
    context:
      "《利维坦》第二十九章把主权分割列入国家的“疾病”，理由是若几个机关都自称最终裁决者，争端又回到无共同裁判的状态。攻击对象是相互否定的终极权力；它承接全书以统一代表结束内战的设计。",
    englishContext:
      "Leviathan XXIX lists division of sovereignty among the diseases of a commonwealth because institutions claiming mutually independent final judgment return disputes to a condition without a common arbiter. The target is rival ultimate authorities, continuous with the book's design of ending civil war through unified representation.",
    distinction:
      "这项论证不直接反驳所有现代分权：若机关权限由同一宪制界定并有终局争端规则，它们未必是霍布斯所说彼此摧毁的主权。统一裁决的需要也没有解决滥权风险。",
    englishDistinction:
      "The argument does not directly refute every modern separation of powers. Offices defined within one constitutional order and governed by final conflict rules need not be rival Hobbesian sovereigns, while unity of decision still leaves the risk of abuse.",
  },
  "hobbes-liberty": {
    context:
      "《利维坦》第二十一章先把自由按物体运动界定为没有外部阻碍，以水被堤坝挡住为例；继而说明恐惧或欲望所致的自愿行动仍可自由，因为自由与因果必然相容。后半章才讨论臣民在法律沉默处及自保事项中的自由。",
    englishContext:
      "Leviathan XXI first defines liberty through bodily motion as absence of external impediments, illustrated by water blocked by banks, then says voluntary acts caused by fear or desire can remain free because liberty is compatible with causal necessity. Only later does it discuss subjects' liberty where law is silent and in matters of self-preservation.",
    distinction:
      "“无阻碍”不是拥有资源、能力和可接受选项的完整自由概念，也不说明恐惧下同意在任何制度中都充分有效；这是霍布斯的严格运动定义，不能替代对支配与机会的其他分析。",
    englishDistinction:
      "Absence of impediment is not a complete account of resources, capability, or acceptable options, and it does not make consent under fear sufficient in every institution. Hobbes offers a strict motion-based definition, not a replacement for analyses of domination and opportunity.",
  },
  descartes: {
    context:
      "《第二沉思》承接恶魔假设，把一切感官对象、身体乃至数学判断暂置疑中，却发现欺骗若发生，至少有正在被欺骗者。引文把“我存在”严格系于我说出或想到它的当下，随后才追问这个“我”是什么，并答为思维之物。",
    englishContext:
      "Meditation II carries forward the deceiver hypothesis, suspending sensory objects, body, and even mathematical judgments, yet finds that deception itself requires one who is deceived. The excerpt makes 'I exist' necessary whenever it is uttered or thought, and only then asks what this I is, answering with a thinking thing.",
    distinction:
      "此处不可疑的是思正在发生，不是关于个人记忆、身体、性格或外部世界的全部信念；由当下思维事件到一个持续不变的实体自我，仍需要后续论证。",
    englishDistinction:
      "What cannot be doubted here is the occurrence of thinking, not every belief about memory, body, character, or an outer world. Moving from the present event to an enduring substantial self still requires argument.",
  },
  "descartes-generosity": {
    context:
      "《论灵魂的激情》第152条先问何种正当理由可以自尊，第153条把真正的 générosité 分成两部分：认识真正属于自己的只是自由运用意志，并坚定决心把它用于最佳判断。随后数条由共同的意志能力推出对他人的尊重，并把它与傲慢区分。",
    englishContext:
      "The Passions of the Soul 152 asks for the just basis of self-esteem; article 153 divides true générosité into knowing that only the free use of will is properly one's own and firmly resolving to use it according to one's best judgment. The next articles derive respect for others from the same capacity and contrast generosity with pride.",
    distinction:
      "这里的“慷慨”不是赠与财富、身份优越或相信意志能控制结果；可赞责的对象是怎样运用判断和决心，而行动是否真正善仍不能由坚定感本身保证。",
    englishDistinction:
      "Generosity here is neither giving wealth, superiority of rank, nor belief that will controls outcomes. Praise and blame concern the use of judgment and resolve, while firmness alone cannot guarantee that the chosen act is good.",
  },
  "descartes-clear-distinct": {
    context:
      "《哲学原理》I.45 为前文“凡清楚分明所知皆真”的规则界定两词：清楚是对象呈现于专注心灵，分明则还须与其他内容精确分开。I.46 随即说明疼痛可以很清楚却不分明，而规则的可靠性又依赖前文上帝非欺骗者的证明。",
    englishContext:
      "Principles of Philosophy I.45 defines the terms used in the preceding rule that whatever is clearly and distinctly perceived is true: clear means present to an attentive mind, while distinct adds exact separation from every other content. I.46 immediately notes that pain may be clear without being distinct, and the rule's trustworthiness depends on the prior nondeceiving-God argument.",
    distinction:
      "心理上的强烈确信不自动满足“分明”，熟悉或鲜明也不等于真实；定义提供的是辨识标准的一部分，而不是让主体仅凭自我感觉为任何主张盖章。",
    englishDistinction:
      "Intense subjective certainty does not automatically satisfy distinctness, and familiarity or vividness is not truth. The definition supplies part of a criterion rather than letting a subject certify any claim by felt conviction alone.",
  },
  "descartes-divide-difficulties": {
    context:
      "《谈谈方法》第二部分列出四条规则：只接受清楚无疑者之后，第二条把困难分到足以解决的程度；第三条再由简单向复杂排序，第四条以完整枚举防止遗漏。分解只是整个推理循环的入口，不是最终答案。",
    englishContext:
      "Part II of the Discourse gives four rules. After accepting only what is evident, the second divides difficulties as far as an adequate solution requires; the third orders parts from simple to complex, and the fourth reviews them comprehensively against omission. Decomposition is an entry into the cycle, not its conclusion.",
    distinction:
      "“尽可能分”仍受“解决所需”限制，不是把问题无限切碎；若整体具有反馈、涌现或关系性质，分解之后还必须重建部分之间的连接。",
    englishDistinction:
      "As many parts as possible remains qualified by what an adequate solution needs, not infinite fragmentation. Where a whole has feedback, emergence, or relational properties, connections must be reconstructed after analysis.",
  },
  "descartes-order-simple-to-complex": {
    context:
      "《谈谈方法》的第三规则接在分解之后，要求从较简单、易知的关系逐步上升，并明确说即使对象本身没有自然先后，也可为认识安排次序。第四规则随后用复核保证步骤无遗漏，显示这里说的是认知施工顺序。",
    englishContext:
      "The Discourse's third rule follows decomposition by requiring gradual ascent from simpler, more knowable relations, expressly allowing thought to assign an order where objects have no natural sequence. The fourth rule then reviews the steps for omissions, showing that the order is one of epistemic construction.",
    distinction:
      "简单在此是对求知者而言的可把握起点，不必等于事物本体上最小或最重要的部分；人为排序有助推理，却不能伪装成世界只有这一条层级。",
    englishDistinction:
      "Simple means a tractable starting point for the inquirer, not necessarily the smallest or most important element in reality. An imposed order can aid reasoning without becoming the world's only hierarchy.",
  },
  "descartes-provisional-customs": {
    context:
      "《谈谈方法》第三部分以重建房屋时需要临时住所作比：理论信念可彻底检修，生活行动却不能暂停。第一项暂定准则遵守法律、既有信仰和明智同伴中远离极端的实践意见，后面另有果断、节欲与终身求知的准则。",
    englishContext:
      "Part III of the Discourse compares inquiry to needing temporary lodging while rebuilding a house: theoretical belief may undergo radical renovation, but action cannot stop. The first provisional maxim follows law, inherited faith, and moderate practices of prudent companions; resolve, disciplined desire, and a life of inquiry follow as further maxims.",
    distinction:
      "暂从习俗不表示习俗已经证明为真或永不可批评，也不是多数同意便正当；它在证据重建期间降低行动瘫痪，且“暂定”保留复审责任。",
    englishDistinction:
      "Provisionally following custom does not prove custom true, immune from criticism, or justified by majority acceptance. It prevents paralysis while evidence is rebuilt, and its provisional status preserves a duty of review.",
  },
  "descartes-firm-under-uncertainty": {
    context:
      "《谈谈方法》第三部分第二准则用迷失森林者说明行动困境：若不断改向，只会原地徘徊；选定最可能的方向后，应在实践中把可疑意见暂作确定来执行。目标是让不可避免的决策获得连贯路径，而非把概率变成真理。",
    englishContext:
      "The second provisional maxim uses a traveler lost in a forest: constant changes of direction produce wandering in place, so one should choose the most plausible course and, for action, treat a probable judgment as settled. The aim is a coherent path through unavoidable decision, not conversion of probability into truth.",
    distinction:
      "果断不等于无视新证据、沉没成本式坚持或先做再说；比喻适用于必须及时行动且方向相近的情形，出现重大伤害信号时调整路线仍属理性。",
    englishDistinction:
      "Resolve is not disregard of new evidence, sunk-cost persistence, or action for its own sake. The image concerns timely choice among plausible directions; major signs of harm can rationally require revision.",
  },
  "descartes-reform-desire": {
    context:
      "《谈谈方法》第三部分第三准则明显承接斯多葛训练，把“完全在我们力量之内”的范围收缩到思想，并借此减少欲求与世界不符带来的挫败。它与前一条果断行动并列，因此改变欲望并未取代行动，而是调整幸福所依赖的对象。",
    englishContext:
      "The third provisional maxim inherits Stoic discipline, narrowing what lies wholly in our power to our thoughts and thereby reducing frustration when desire and world diverge. Because it stands beside the maxim of resolute action, reforming desire does not replace action but changes what happiness is made to depend upon.",
    distinction:
      "“改变欲望而非世界”不是要求受压迫者适应不义，也不否认集体行动能改变条件；它只否认个人可把外部结果当成完全所有物，何时该接受、何时该改革仍需实践判断。",
    englishDistinction:
      "Changing desires rather than the world does not tell oppressed people to adapt to injustice or deny collective transformation. It denies that external outcomes are wholly one's possession, leaving practical judgment to distinguish acceptance from reform.",
  },
  "descartes-dream-argument": {
    context:
      "《第一沉思》在日常感官偶尔欺骗之后，把火旁穿袍的当下经验与梦中同样确信的场景相比。笛卡尔接着说梦像画作仍由较简单元素组成，所以算术等似乎暂时幸存；更强的恶魔假设才把怀疑推到这些元素。",
    englishContext:
      "Meditation I moves from occasional sensory deception to comparing the present scene by the fire with equally convincing dream experiences. Descartes next says dreams resemble paintings composed from simpler elements, so arithmetic initially appears to survive; the deceiver hypothesis is needed to extend doubt to those elements.",
    distinction:
      "梦例没有断言现实就是梦，也没有让清醒与梦在证据上永久不可区分；它只表明单次体验的鲜明感不足以自行担保外部情境，随后仍须寻找区分和重建依据。",
    englishDistinction:
      "The dream case neither asserts that reality is a dream nor makes waking and dreaming permanently evidentially indistinguishable. It shows only that the vividness of one experience cannot by itself guarantee its external setting.",
  },
  "descartes-wax-and-judgment": {
    context:
      "《第二沉思》在确认思维之我后转向一块蜂蜡：加热使味、香、色、形与声音全部改变，人却仍判断它是同一块可无限变化的延展物。笛卡尔继而排除感觉清单和想象穷举，把认识归于心灵判断，并用窗外“看见人”再强化这一点。",
    englishContext:
      "After establishing the thinking I, Meditation II turns to wax whose taste, smell, color, shape, and sound all change under heat while it is still judged the same indefinitely mutable extended thing. Descartes excludes both a sensory list and exhaustive imagination, locates cognition in mental judgment, and reinforces the point with seeing cloaked figures from a window.",
    distinction:
      "心灵判断参与知觉不表示感官材料无用，也没有单凭蜂蜡证明物质只存在于心中；论证针对“认识就是性质影像集合”，外物存在与身心关系仍待后续沉思处理。",
    englishDistinction:
      "Mental judgment in perception does not make sensory material useless or prove from wax alone that matter exists only in mind. The target is knowledge as a bundle of qualitative images; outer existence and mind-body relations remain for later meditations.",
  },
  "descartes-error-of-the-will": {
    context:
      "《第四沉思》要调和上帝非欺骗者与人实际犯错：有限知性只呈现少量观念，本身不是缺陷；范围更广的意志却可对未清楚理解者肯定或否定。错误发生在意志越过知性时，下一步的补救正是暂缓判断。",
    englishContext:
      "Meditation IV reconciles a nondeceiving God with actual human error. Finite understanding presents only limited contents and is not itself a fault, whereas wider will can affirm or deny what is not clearly understood. Error occurs when will outruns intellect, making suspension of judgment the immediate remedy.",
    distinction:
      "把错误归于两能力的配合不等于坏结果都因个人意志薄弱，也未处理制度性误导和无意识偏差；模型描述对命题作判断的责任，并以当事人可辨认证据不足为前提。",
    englishDistinction:
      "Locating error in two faculties does not reduce every bad outcome to weak individual will or address institutional deception and unconscious bias. The model concerns responsibility for assent where evidential insufficiency can be recognized.",
  },
  "descartes-idea-of-the-infinite": {
    context:
      "《第三沉思》先按观念所表象的“客观实在性”提出原因至少须含等量实在性的原则，再问有限的我能否成为无限、完满上帝观念的充分原因。引文以怀疑和欲求所显出的匮乏反推完满尺度，随后据此展开上帝存在证明。",
    englishContext:
      "Meditation III first proposes that a cause must contain at least as much reality as an idea represents objectively, then asks whether a finite self can adequately cause the idea of an infinite, perfect God. The excerpt reads the lack displayed in doubt and desire against a standard of perfection before developing the proof of God's existence.",
    distinction:
      "从不完满概念到完满来源不是不言自明：有限者是否可经否定和扩展形成无限观念、原因原则能否用于观念内容，正是论证争点。引文提出依赖关系而非已获普遍承认的事实。",
    englishDistinction:
      "The move from imperfection to a perfect source is not self-evident. Whether finitude can form infinity by negation and extension, and whether the causal principle applies to representational content, are precisely contested premises.",
  },
  "descartes-existence-and-perfect-being": {
    context:
      "《第五沉思》在讨论物质本质与数学真理之后，把上帝观念比作三角形：三角形不能没有一定性质，至高完满者也不能与存在分开；山谷比喻又用来回答概念关系不必造成对象。证明依赖“存在是完满性”的特殊前提。",
    englishContext:
      "After considering material essences and mathematical truths, Meditation V compares the idea of God with a triangle: just as certain properties cannot be removed from the triangle, existence cannot be separated from a supremely perfect being. The mountain-valley analogy answers the objection that conceptual connection need not produce an object, leaving the special premise that existence is a perfection.",
    distinction:
      "从概念中不可分不通常推出概念有实例，否则任意定义都能造物；本体论证明只有在至高完满观念及存在的地位得到辩护后才推进，不能压缩成“想到上帝所以有上帝”。",
    englishDistinction:
      "Conceptual inseparability does not ordinarily entail instantiation, or arbitrary definitions could create objects. The ontological proof advances only if the unique idea of supreme perfection and the status of existence are defended; it is not 'God is thought, therefore God exists.'",
  },
  "descartes-body-as-extension": {
    context:
      "《哲学原理》II.4–11 逐步设想去掉硬度、重量、颜色等感觉性质，说明身体即使改变这些性质仍被思为身体；II.11 因而把长宽深的延展留下为本性。后文由此反对真空和不可分原子，并为几何化自然学奠基。",
    englishContext:
      "Principles II.4–11 successively strips hardness, weight, color, and other sensible qualities from the concept of body, arguing that body remains thinkable through those changes. II.11 leaves extension in length, breadth, and depth as its nature, preparing the rejection of vacuum and indivisible atoms and the geometrization of physics.",
    distinction:
      "把物体本性定为延展不表示颜色、重量和触感在经验中不真实，也不是现代物理已接受的物质定义；它是笛卡尔机械论的形上起点，后来科学可用别的基本量修正。",
    englishDistinction:
      "Defining body by extension does not make color, weight, and touch unreal in experience or state modern physics's accepted definition of matter. It is a metaphysical starting point for Cartesian mechanism, open to revision by later fundamental quantities.",
  },
  "descartes-language-and-reason": {
    context:
      "《谈谈方法》第五部分在描述假想动物机器后给出两项区分测试：机器不能灵活组合言语回应任意场景，也不能像理性那样普遍适应事务。引文以当时的人类语言观支持第一项，第二项随即防止把固定信号误当开放推理。",
    englishContext:
      "Part V of the Discourse follows an account of hypothetical animal-machines with two tests: machines cannot flexibly compose speech for arbitrary situations and cannot adapt across affairs through general reason. The excerpt supports the first through the period's view of human language, while the second keeps fixed signaling from counting as open-ended reasoning.",
    distinction:
      "能否发声不是人格或理性的可靠门槛，失语、辅助沟通和当代动物研究都要求修正笛卡尔的经验判断；机器心灵问题也不能只凭一句语言输出解决，还要考察理解、迁移与互动机制。",
    englishDistinction:
      "Ability to vocalize is not a reliable threshold for personhood or reason; aphasia, assisted communication, and modern animal research require revision of Descartes's empirical judgment. Machine mindedness likewise cannot be settled by one verbal output without examining understanding, transfer, and interaction.",
  },
  spinoza: {
    context:
      "《伦理学》IVp50 先说受理性指导者的怜悯本身无益，附释随即承认尚未按理性生活的人表现怜悯通常胜过冷酷。引文再把对自然必然性的理解与仇恨、嘲笑、轻蔑和被动怜悯对置，结尾转向尽力行善与喜悦。",
    englishContext:
      "Ethics IVp50 first calls pity in itself useless to a person guided by reason, while its scholium concedes that pity in someone not yet living by reason is often better than cruelty. The excerpt then opposes understanding natural necessity to hatred, mockery, contempt, and passive pity before turning toward doing well and rejoicing.",
    distinction:
      "理解原因不是免除责任、取消保护受害者或要求压下同情；斯宾诺莎要把使人更无力的反应转成能改变原因的行动，法律与防卫仍可由共同利益推出。",
    englishDistinction:
      "Understanding causes does not cancel responsibility, protection of victims, or humane concern. Spinoza redirects reactions that diminish agency toward action on causes; law and defense can still follow from common advantage.",
  },
  "spinoza-free-person": {
    context:
      "《伦理学》IVp67 位于“依理性指导的人”组命题中：自由人直接追求善，死亡则因减少行动力量而被间接避免。证明说智慧思考的是生活，下一命题再以一个假设“人生而自由”的人说明自由与善恶知识的关系。",
    englishContext:
      "Ethics IVp67 belongs to the propositions on a person guided by reason: the free person directly pursues good, while death is avoided indirectly as a loss of power. Its proof says wisdom reflects on life, and the next proposition uses the hypothetical case of someone born free to relate freedom to knowledge of good and evil.",
    distinction:
      "少想死亡不是否认有限性、拒绝哀悼或不做临终准备；命题改变的是智慧的中心，从恐惧驱动转向增加现实生活的理解与能力。",
    englishDistinction:
      "Thinking least of death does not deny finitude, forbid mourning, or reject end-of-life preparation. It shifts wisdom's center from fear-driven rehearsal toward understanding and increasing the powers of actual life.",
  },
  "spinoza-understanding-affect": {
    context:
      "《伦理学》Vp3 承接第三部对行动与激情的定义：激情包含身体情状的混乱观念，形成清楚分明的观念便使它不再只是外因支配的受动。紧随其后的系理说，对情感认识得越多，它越在我们力量之内。",
    englishContext:
      "Ethics Vp3 resumes Part III's distinction between action and passion: a passion involves an inadequate idea of a bodily affection, and forming a clear and distinct idea makes it no longer merely passive under external causes. The corollary says that the more an affect is known, the more it comes within our power.",
    distinction:
      "“不再是激情”不等于身体感受瞬间消失或分析能治愈一切情绪困扰；改变的是因果理解与主动程度，环境、关系和身体条件仍可能需要实际干预。",
    englishDistinction:
      "Ceasing to be a passion does not mean bodily feeling instantly vanishes or analysis cures every emotional difficulty. What changes is causal understanding and degree of activity; environments, relations, and bodily conditions may still require intervention.",
  },
  "spinoza-one-substance": {
    context:
      "《伦理学》Ip14 建立在同属性不能有两个实体、实体必然存在以及上帝为具有无限属性之实体等前命题上。证明排除在上帝之外另有自因存在者，随后两个系理说上帝唯一，且一切存在者都在上帝之内并由上帝设想。",
    englishContext:
      "Ethics Ip14 depends on earlier claims that two substances cannot share an attribute, that substance necessarily exists, and that God is substance with infinite attributes. Its proof excludes another self-conceived being outside God; the corollaries then state God's uniqueness and that all things are in and conceived through God.",
    distinction:
      "“只有一个实体”不表示个别事物没有差异或只是幻觉；它们作为样态具有确定因果结构。斯宾诺莎的 Deus sive Natura 也不是一位在世界之外作选择的人格造物主。",
    englishDistinction:
      "One substance does not make particular things undifferentiated or illusory; as modes they have determinate causal structures. Spinoza's God or Nature is also not a personal creator standing outside the world and choosing among plans.",
  },
  "spinoza-nothing-contingent": {
    context:
      "《伦理学》Ip29 在Ip28 的有限事物因果链之后总结：一切样态都由神性必然规定而以一定方式行动。Ip33 又说事物不可能以别的次序产生，第一部附录则把目的与偶然感归因于人只知欲求而不知原因。",
    englishContext:
      "Ethics Ip29 follows Ip28's causal ordering of finite modes and concludes that every mode is necessarily determined by divine nature to act in a definite way. Ip33 adds that things could not have been produced in another order, while the Part I Appendix links felt contingency and purpose to knowing desires but not their causes.",
    distinction:
      "本体上的必然不等于人能预测全部事件，也不让概率模型失效；“偶然”仍可准确表示信息有限。决定有原因也没有自动给任何行为道德正当性。",
    englishDistinction:
      "Ontological necessity does not give humans complete prediction or invalidate probability models; contingency can accurately mark limited information. Having a cause also does not automatically give an action moral justification.",
  },
  "spinoza-freedom-as-self-necessity": {
    context:
      "《伦理学》第一部定义7 在体系开端把自由与强制按原因来源区分：仅由自身本性存在行动者自由，由外物规定者受制。严格说只有自因的上帝完全符合前项；第四、五部才把人的自由理解为更多由适当观念和自身结构行动。",
    englishContext:
      "Definition 7 at the opening of Ethics I distinguishes freedom from constraint by the source of determination: what exists and acts from its own nature is free, while what is fixed by another is constrained. Strictly only self-caused God fully meets the first term; Parts IV and V develop human freedom as increasingly acting through adequate ideas and one's own structure.",
    distinction:
      "自我必然性不是毫无因果的任性选择，也不是孤立个体不受关系影响；人的自主在斯宾诺莎那里有程度，依赖能否理解并重组那些构成自己的关系。",
    englishDistinction:
      "Self-necessity is neither uncaused arbitrary choice nor an isolated individual untouched by relations. Human autonomy is scalar for Spinoza and depends on understanding and reorganizing relations that compose the person.",
  },
  "spinoza-order-of-ideas-and-things": {
    context:
      "《伦理学》IIp7 由“每一属性须通过自身设想”推出思想中的观念序列与延展中的事物序列同构。附释强调它们是同一实体在不同属性下的表达，并以圆在自然中的存在与圆观念区别说明平行而非互相推动。",
    englishContext:
      "Ethics IIp7 derives the same ordering of ideas and extended things from the rule that each attribute is conceived through itself. Its scholium says they express one substance under different attributes and distinguishes a circle existing in nature from the idea of that circle to clarify parallelism rather than cross-causal pushing.",
    distinction:
      "“次序相同”不是每个想法都会造成对应事件，也不是心灵复制一幅外界图像；思想与延展没有跨属性机械因果，相关性来自同一事态的两种表达。",
    englishDistinction:
      "The same order does not make every thought cause a matching event or turn mind into a picture copying the world. Thought and extension do not mechanically cause across attributes; their correlation comes from two expressions of one process.",
  },
  "spinoza-mind-idea-of-body": {
    context:
      "《伦理学》IIp13 在先证明心灵是一个现实存在的个别事物之观念后，确定其对象就是现实身体；随后列出的身体公设说明人体由许多个体组成、不断受外物影响。后续关于知觉与自知的命题都从身体情状的观念展开。",
    englishContext:
      "After proving that mind is the idea of an actually existing singular thing, Ethics IIp13 identifies that object as the existing body. The bodily postulates that follow describe a composite body continually affected by external things, from whose affections later accounts of perception and self-knowledge proceed.",
    distinction:
      "心灵是身体的观念不等于粗糙地把意识还原为一个器官，也不是心灵能完整透明地读出身体；我们首先拥有的是身体受影响的观念，其中常混有外物与自身的有限信息。",
    englishDistinction:
      "Mind as idea of body is not a crude reduction of consciousness to one organ or transparent access to the body. What we first have are ideas of bodily affections, often carrying limited information about both body and external cause.",
  },
  "spinoza-conatus": {
    context:
      "《伦理学》IIIp6 先说每物尽其所能努力保持存在，p7 证明这种努力不是附加倾向而是从其既定本性推出效果的现实本质，p8 再说它不包含预定终止时间。随后心身层面的意志、冲动和欲望都由此定义。",
    englishContext:
      "Ethics IIIp6 says each thing strives as far as it can to persevere; p7 argues that this striving is not an added tendency but the actual essence from which its effects follow, and p8 denies that it contains a predetermined stopping time. Will, appetite, and desire are then defined from it at mental and bodily levels.",
    distinction:
      "conatus 不是所有事物都有意识求生，也不证明保存当前形态总是伦理上最好；个体由关系组成，有时改变结构、与他者协作或放弃局部才更能维持行动力量。",
    englishDistinction:
      "Conatus does not give every thing a conscious survival intention or prove preservation of the present form always ethically best. Individuals are relational composites and may sustain power through transformation, cooperation, or loss of a part.",
  },
  "spinoza-desire-as-essence": {
    context:
      "《伦理学》第三部情感定义1 汇总此前p9 附释：conatus 仅就心灵称意志，就心身合一称冲动，而人意识到冲动时称欲望。定义又把身体情状的具体规定纳入，所以欲望总以某项活动和遭遇呈现。",
    englishContext:
      "Definition of the Affects 1 gathers the scholium to IIIp9: conatus considered in mind is will, in mind and body appetite, and when appetite is conscious, desire. The definition also includes the determinate bodily modification, so desire always appears through a particular activity and encounter.",
    distinction:
      "欲望构成人的现实本质不等于每个欲望对象都善、越强越真实；被外因组织的欲望可能减弱行动力，伦理判断仍要比较其原因、关系与后果。",
    englishDistinction:
      "Desire as actual human essence does not make every desired object good or greater intensity more authentic. Desire organized by external causes can diminish agency, so ethics still compares causes, relations, and effects.",
  },
  "spinoza-joy-as-transition": {
    context:
      "《伦理学》第三部情感定义2 把 laetitia 说成由较小完满到较大完满的过渡，定义3 以相反方向说明悲伤。解释特别说快乐不是已经处在较大完满本身，否则便没有情感的变动；“过渡”标出身体—心灵能力正在改变。",
    englishContext:
      "Definition of the Affects 2 calls laetitia the transition from lesser to greater perfection, with definition 3 giving sadness as the reverse. The explanation insists joy is not possession of greater perfection itself, which would contain no affective change; transition marks an alteration of bodily and mental power.",
    distinction:
      "这里的完满是现实性或行动力量，不是道德无瑕和社会地位；短暂兴奋也未必是喜悦的可靠指标，若它随后制造依赖或削弱能力，关系的整体方向可能相反。",
    englishDistinction:
      "Perfection here means reality or power of acting, not moral flawlessness or status. Brief excitement is not a sufficient measure of joy if the relation creates dependence or reduces capacity over time.",
  },
  "spinoza-imitation-of-affects": {
    context:
      "《伦理学》IIIp27 从“设想与我相似者受某情感影响”推出自身身体也形成类似情状，随后各系理依次解释怜悯、对造成他人快乐或悲伤者的爱恨以及 emulatio。命题把群体情感传播接回身体想象机制。",
    englishContext:
      "Ethics IIIp27 derives a similar bodily affection in oneself from imagining a being like oneself affected, then uses its corollaries to explain pity, love or hatred toward causes of another's joy or sadness, and emulation. The proposition grounds social transmission of affect in embodied imagination.",
    distinction:
      "情感模仿不是人人必然同感，也不保证同感准确理解他者；相似性怎样被感知、既有爱恨和群体边界都会调节传播，反思仍可改变后续行动。",
    englishDistinction:
      "Affective imitation neither makes everyone inevitably feel alike nor guarantees accurate understanding of another. Perceived similarity, prior loves and hatreds, and group boundaries modulate transmission, and reflection can still alter action.",
  },
  "spinoza-good-as-relational": {
    context:
      "《伦理学》IVp30 先说事物不会因与我们共有的部分而成为恶，p31 反向证明只要与本性相合就必然有益，系理再说越相合越有益。此组命题建立“善”与个体组成关系、行动力量之间的功能联系。",
    englishContext:
      "Ethics IVp30 first says a thing cannot be evil through what it shares with our nature; p31 argues conversely that insofar as it agrees with our nature it is necessarily useful, and the corollary makes greater agreement more useful. The sequence relates good to composition and power of acting.",
    distinction:
      "“与我们本性相合”不是“我当下喜欢”，也不让个人利益成为唯一尺度；人的共同本性使互助可被论证，而同一对象在剂量、时机和关系不同下仍可能由益转害。",
    englishDistinction:
      "Agreement with our nature is not whatever I presently like and does not make private advantage the sole measure. Shared human nature supports reasoned mutual benefit, while dose, timing, and relation can turn the same object from helpful to harmful.",
  },
  "spinoza-state-end-freedom": {
    context:
      "《神学政治论》第二十章先论主权无法真正命令人心，也不能不危及国家便禁止所有表达；随后区分意见表达与煽动性行动，才以政府应使身心在安全中发展来概括国家目的。章末主张自由共和国让人各思所思、各言所思。",
    englishContext:
      "Theological-Political Treatise 20 first argues that sovereigns cannot genuinely command minds and cannot suppress all expression without endangering the state. It then distinguishes voicing judgment from seditious action before defining government as securing development of mind and body; the chapter closes with a free republic in which people may think and say what they think.",
    distinction:
      "国家以自由为目的不表示任何言行都免于法律后果，也不是安全与自由彼此零和；斯宾诺莎的边界围绕是否破坏共同契约，具体边界仍可能被权力滥用，需制度审查。",
    englishDistinction:
      "Freedom as the state's end does not exempt every utterance or act from legal consequence or make security a zero-sum rival. Spinoza's line concerns breach of common covenant, a boundary itself vulnerable to official abuse and therefore requiring institutional scrutiny.",
  },
  "spinoza-faith-and-philosophy": {
    context:
      "《神学政治论》第十四章已把信仰限定为促成服从与正义仁爱的教义，第十五章据此反对让理性服从神学或让经文服从哲学。引文说明经文按大众理解调整表达，其目标是虔敬实践而非教授自然原因。",
    englishContext:
      "Chapter 14 of the Theological-Political Treatise has defined faith through doctrines needed for obedience, justice, and charity; chapter 15 therefore rejects making reason the servant of theology or Scripture the servant of philosophy. The excerpt says Scripture accommodates popular understanding because its aim is pious practice, not natural explanation.",
    distinction:
      "分开领域不是说宗教文本没有思想内容或哲学可以裁判一切生活意义，也不允许以“大众”为由轻蔑信徒；它阻止道德叙事冒充物理证明，也保护理性考察免受经句定案。",
    englishDistinction:
      "Separating domains does not strip religious texts of intellectual content, make philosophy judge every meaning of life, or license contempt for believers as a multitude. It prevents moral narrative from posing as physical proof and protects inquiry from settlement by a verse.",
  },
  "locke-personal-identity": {
    context:
      "《人类理解论》II.27 先区分同一团物质、同一生命体与同一个“人”，§9 再把 person 定为能反思、自认跨时同一的有思维存在者。意识延伸到过去行动多远，人格同一便多远；后文因而把 person 称作关乎奖惩的法庭术语。",
    englishContext:
      "Essay II.27 first distinguishes sameness of a mass, a living organism, and a human being; §9 then defines a person as a thinking being able to reflect and consider itself the same across times. Personal identity reaches as far as consciousness of past action, allowing later sections to call person a forensic term tied to reward and punishment.",
    distinction:
      "意识连续不等于每一细节都能主动回忆，也不能简单推出失忆者与过去责任毫无关系；洛克本人用睡眠、遗忘和转移意识的案例暴露了证据与责任归属的难题。",
    englishDistinction:
      "Continuity of consciousness is not active recall of every detail and does not simply release an amnesiac from every past responsibility. Locke's cases of sleep, forgetting, and transferred consciousness expose difficulties of evidence and attribution.",
  },
  "locke-political-consent": {
    context:
      "《政府论（下篇）》§95 承接自然状态中人人自由、平等、独立的设定，问个人怎样正当地服从政治权力；答案是与他人同意组成共同体，以更安全地保存生命、自由和财产。下一节即说明共同体成立后须由多数决定行动。",
    englishContext:
      "Second Treatise §95 carries forward the premise that people in nature are free, equal, and independent and asks how anyone can rightly become subject to political power. The answer is agreement with others to form a community for safer preservation of lives, liberties, and estates; §96 immediately gives the resulting body a rule of majority action.",
    distinction:
      "原初同意原则不等于居住、沉默或接受一次服务就构成充分自愿；洛克后文的默示同意与代际约束正需另行辩护，现实选择是否可拒绝也决定“同意”的分量。",
    englishDistinction:
      "Original consent does not make residence, silence, or receipt of one service fully voluntary. Locke's later tacit consent and intergenerational obligation require separate defense, and the real ability to refuse determines consent's force.",
  },
  "locke-abstraction-and-generals": {
    context:
      "《人类理解论》III.3 从儿童先有个别人物名称，继而舍去时间、地点和个体差异形成一般观念，解释一个词怎样适用于许多个体。§6 的抽象机制随后被用来说明种名与名义本质由心灵制作，而非照抄预成物种边界。",
    englishContext:
      "Essay III.3 begins with a child naming particular people and then explains how omitting time, place, and individuating features yields ideas applicable to many. The abstraction in §6 subsequently supports Locke's claim that species names and nominal essences are made by the mind rather than copied from ready-made boundaries.",
    distinction:
      "抽象不是把所有差异判断为不重要，也不保证所选共同特征中立；一般观念便于推理，却可能因舍去情境、权力或例外而形成误导分类。",
    englishDistinction:
      "Abstraction does not judge every omitted difference irrelevant or guarantee neutral feature selection. General ideas enable reasoning but can misclassify by dropping context, power, or exceptions.",
  },
  "locke-words-sign-ideas": {
    context:
      "《人类理解论》III.2 先把词解释为可感标记，用来向他人传达不可直接看见的心灵观念。§2 说明词首先标记说话者自己的观念，随即指出人常误以为同词在听者心中必有同一观念，或直接代表事物本身。",
    englishContext:
      "Essay III.2 first treats words as sensible marks used to communicate otherwise invisible ideas. Section 2 says they immediately signify the speaker's ideas, then notes two common assumptions: that the hearer must attach the same idea and that the word directly stands for the thing itself.",
    distinction:
      "直接指向心中观念不把意义变成无法比较的私人财产；共同用法、定义、实例和纠错仍把说话者置于公共检验中，词也可借约定稳定地讨论外物。",
    englishDistinction:
      "Immediate signification of a speaker's idea does not make meaning incomparable private property. Usage, definition, example, and correction subject speakers to public tests, allowing conventional words to discuss external things reliably enough.",
  },
  "locke-knowledge-as-agreement": {
    context:
      "《人类理解论》IV.1 在回顾心灵拥有观念之后，把知识转到观念间关系的知觉。§3 起列出四种相合或不合：同异、关系、共存或必然联系、现实存在，随后各卷分别考察我们在这些关系上能达到多远。",
    englishContext:
      "After reviewing the mind's possession of ideas, Essay IV.1 relocates knowledge in perceiving relations among them. From §3 it lists four kinds of agreement or disagreement—identity and diversity, relation, coexistence or necessary connection, and real existence—whose attainable range later chapters examine.",
    distinction:
      "观念相合不表示只要概念内部一致便知道外界如此；尤其共存与现实存在需要经验联系。定义也不把知识缩成词语关系，因为观念来源和对象约束仍是全书问题。",
    englishDistinction:
      "Agreement of ideas does not make conceptual consistency sufficient for knowing the world; coexistence and real existence especially require experiential connection. Nor is knowledge reduced to relations among words, since the source and objects of ideas remain at issue.",
  },
  "locke-degrees-of-knowledge": {
    context:
      "《人类理解论》IV.2 先以心灵直接看出两观念关系为直觉知识，再以中介观念构成证明；§14 最后把外部个别对象正在作用于感官的确信列为感性知识。洛克承认它不及直觉与证明，却高于单纯概率。",
    englishContext:
      "Essay IV.2 begins with intuitive knowledge, in which the mind immediately sees a relation, and demonstrative knowledge, which uses intermediate ideas. Section 14 finally adds sensitive knowledge that particular external objects are presently affecting us, conceding less certainty than intuition or proof but more than bare probability.",
    distinction:
      "三个等级不是把感性证据贬为不可靠，也不要求历史、医学或政治都采用几何证明；证据形式应与对象相称，同一等级内部还存在强弱差别。",
    englishDistinction:
      "The three degrees do not make sensory evidence untrustworthy or require history, medicine, and politics to imitate geometry. Evidential form should fit its object, and Locke explicitly allows variation within each degree.",
  },
  "locke-probability-and-assent": {
    context:
      "《人类理解论》IV.15 在知识边界之外定义概率，以某事与我们经验、观察或他人证言的一致为根据。§5 要求在赞同前把支持和反对理由一并权衡，并使确信强度随优势变化；后章再讨论见证数量、诚信与反例。",
    englishContext:
      "Essay IV.15 defines probability beyond the reach of knowledge through conformity with one's experience, observation, or others' testimony. Section 5 requires weighing grounds on both sides before assent and proportioning confidence to their preponderance; later chapters analyze number and integrity of witnesses and contrary experience.",
    distinction:
      "按概率调整信念不是简单数票或永远不行动，也不表示任何两边都有理由就应各打五十大板；证据的独立性、质量和损失结构会影响合理确信与行动门槛。",
    englishDistinction:
      "Proportioning belief is neither counting votes nor postponing action forever, and reasons on both sides do not require fifty-fifty confidence. Independence and quality of evidence and the costs of error affect rational confidence and action thresholds.",
  },
  "locke-limits-of-knowledge": {
    context:
      "《人类理解论》IV.3 逐项考察四种观念关系：同异范围较广，关系可经证明扩展，但物质具体性质为何共存尤其超出观念推演。§6 因而说知识不仅小于事物实在，甚至小于我们能设想的观念，因为有观念不等于看见其必要联系。",
    englishContext:
      "Essay IV.3 surveys the four relations: identity and diversity reach widely, demonstration extends some relations, but the coexistence of particular material powers especially exceeds deduction from ideas. Section 6 therefore makes knowledge narrower not only than reality but than our ideas, since conceivability does not reveal necessary connection.",
    distinction:
      "承认界限不是不可知论或停止实验；恰因概念不能推出共存性质，洛克把观察、概率和审慎判断安排为知识之外仍可合理前进的方式。",
    englishDistinction:
      "Acknowledging limits is not global unknowability or a reason to stop experiments. Because concepts cannot derive coexistence, Locke makes observation, probability, and cautious judgment rational routes beyond strict knowledge.",
  },
  "locke-state-of-nature-law": {
    context:
      "《政府论（下篇）》第二章先称自然状态为在自然法范围内安排自身行动与财产的完全自由，却马上区分自由与放纵。§6 以平等独立者都是同一造物主作品为背景，推出不得伤害生命、健康、自由与财产，随后讨论人人执行自然法。",
    englishContext:
      "Second Treatise II first calls the state of nature complete freedom to order actions and possessions within the law of nature, then immediately separates liberty from license. Section 6, against the theological background that equal independent persons are one maker's workmanship, prohibits harming life, health, liberty, or possessions before turning to everyone's power to enforce that law.",
    distinction:
      "自然状态有法不表示个人解释永远公正；人人兼任法官和执行者恰会产生偏私与过度惩罚，这是后来建立政府的“不便”。自然法原则也不能省略其历史神学前提。",
    englishDistinction:
      "Law in nature does not make each person's interpretation impartial. Everyone acting as judge and enforcer creates bias and excessive punishment—the inconveniences later motivating government—and the argument's historical theological premise should not be hidden.",
  },
  "locke-legislative-power-in-trust": {
    context:
      "《政府论（下篇）》第十三章先说立法权在政府内部居最高，却因只为保存社会和公共善而设，仍是有目的的受托权。§149 把共同体的最终权力保留在人民手中，以备立法机关违反信托；第十九章再细论何种篡权导致政府解体。",
    englishContext:
      "Second Treatise XIII calls the legislature supreme within government but limits it as a purposive trust instituted for preservation of society and public good. Section 149 reserves the community's ultimate power to alter it upon breach, while chapter XIX later specifies usurpations that dissolve government.",
    distinction:
      "人民保留权力不等于每次政策失望都可由个人宣布政府失效；“违反信托”需联系一般法律、财产保障、代表和持续公共损害，集体判断程序仍是难题。",
    englishDistinction:
      "Reserved popular power does not let any individual dissolve government after a policy disappointment. Breach must be related to standing law, property, representation, and sustained public injury, while procedures for collective judgment remain difficult.",
  },
  "locke-toleration-and-civil-power": {
    context:
      "《论宗教宽容》开篇把国家职责限定为生命、自由、健康与财产等世俗利益，再以三项理由排除官长照管灵魂。引文是第二项：武力能改变外在行为却不能生成得救所需的内在确信；其后还说不同国家强制不同信仰将使真理取决于出生地。",
    englishContext:
      "A Letter Concerning Toleration opens by limiting the commonwealth to civil interests such as life, liberty, health, and possessions, then gives three reasons why magistrates cannot care for souls. The excerpt is the second: force can alter outward behavior but cannot produce saving inward persuasion; another reason notes that varying official religions would make truth depend on birthplace.",
    distinction:
      "强制不能造就信念不等于所有宗教行为都超出公共法律，也不能掩盖洛克文本对无神论者和部分宗派的历史性排除；原则的更广适用需要超越他本人的边界。",
    englishDistinction:
      "Force's inability to create belief does not exempt every religious act from public law, and it must not hide Locke's historical exclusions of atheists and some confessions. Applying the principle consistently requires extending it beyond his own boundaries.",
  },
  leibniz: {
    context:
      "《单子论》§§29–30 先以永恒真理和对自身的反思区分理性灵魂与单凭记忆联系的动物，§§31–32 随即列出矛盾律与充足理由律两大推理原则。下一节再用它们区分必然的推理真理与需说明何以现实化的事实真理。",
    englishContext:
      "Monadology §§29–30 distinguish rational souls from animals governed by memory through eternal truths and reflection on the self; §§31–32 then state contradiction and sufficient reason as the two principles of reasoning. The next section uses them to divide necessary truths of reason from truths of fact requiring an account of actuality.",
    distinction:
      "凡事有充足理由不表示有限认知者现在就能找到理由，更不允许用任何貌似解释填空；原则要求“为何如此而非另样”可受追问，证据不足时承认未知比虚构原因更符合它。",
    englishDistinction:
      "Every fact having a sufficient reason does not mean finite knowers can presently find it or may fill a gap with anything explanation-like. The principle keeps 'why this rather than otherwise?' open to inquiry; admitting ignorance is better than inventing a cause.",
  },
  "leibniz-complete-concept": {
    context:
      "《形而上学谈》§8 以真实述谓必须在主体本性中有根据来界定个体实体，并用亚历山大的一生说明完全概念包含其全部真实谓词。后续§§9、13 把这种概念的独特性连到上帝的完整认识，并正面处理偶然性与自由难题。",
    englishContext:
      "Discourse on Metaphysics §8 defines individual substance through the demand that every true predication have a basis in the subject's nature, using Alexander's life to illustrate a complete concept containing all true predicates. Sections 9 and 13 connect that uniqueness to God's complete knowledge and confront contingency and freedom.",
    distinction:
      "主体概念含谓词不表示人能从名字演绎他的一生，也不是行为者毫无选择；只有无限知性掌握完全概念，莱布尼茨仍须以可能性和选择理由区分确定、必然与强制。",
    englishDistinction:
      "Predicates contained in a subject's concept do not let humans deduce a life from a name or remove agency. Only infinite understanding possesses the complete concept, and Leibniz still must distinguish certainty, necessity, and compulsion through possibility and reasons for choice.",
  },
  "leibniz-windowless": {
    context:
      "《单子论》§§1–6 先把单子定义为无部分、不能由组合自然生成毁灭的简单实体，§7 因而排除有性质从外部穿入、重新排列其内部。§§10–11 随即要求单子的变化来自内在原则，并在变化中保有多样状态。",
    englishContext:
      "Monadology §§1–6 define a monad as a partless simple substance that cannot naturally arise or perish by composition. Section 7 therefore excludes qualities entering and rearranging an inside; §§10–11 immediately require change to arise from an internal principle while containing a plurality of states.",
    distinction:
      "“无窗”不是说经验个体互不相关或身体不受碰撞，而是针对简单实体的形上因果模型；现象中的协调被转交给预定和谐，这一代价需要另行辩护。",
    englishDistinction:
      "Windowlessness does not make empirical individuals unrelated or bodies immune to collision; it concerns the metaphysics of simple substance. Coordination among appearances is transferred to pre-established harmony, a cost requiring separate defense.",
  },
  "leibniz-identity": {
    context:
      "《单子论》§8 说若简单实体没有性质，便无从解释彼此差别和状态变化；§9 于是提出每个单子都有内在差异，随后§§11–13 以连续的内部变化说明个体状态。不可辨者同一在这里服务于个体化而非观察技巧。",
    englishContext:
      "Monadology §8 argues that without qualities simple substances could neither differ nor change state; §9 therefore requires an intrinsic difference in every monad, and §§11–13 describe continuing internal change. Identity of indiscernibles here grounds individuation rather than a technique of observation.",
    distinction:
      "找不到差异不等于已经证明两物同一，因为人的检测能力有限；原则断言的是现实中若真有两个个体，必有内在根据，不是把“目前不可辨”变成实验结论。",
    englishDistinction:
      "Failure to find a difference does not prove identity, since human detection is limited. The principle says genuine numerical plurality must have an intrinsic ground; it does not turn present indistinguishability into an experimental conclusion.",
  },
  "leibniz-perception-appetition": {
    context:
      "《单子论》§§10–13 已说每个单子连续变化且一中含多，§14 把这种统一中表征多样的过渡状态称为知觉，并特意与自觉或意识区分。§15 再以欲求命名推动一个知觉过渡到下一个的内在活动。",
    englishContext:
      "Monadology §§10–13 have described continuous change and plurality within unity. Section 14 names the passing state that represents plurality perception and expressly distinguishes it from apperception or consciousness; §15 calls the internal activity carrying one perception toward another appetition.",
    distinction:
      "知觉与欲求适用于单子不表示每个单子有人的感官、意图或语言；这些是极广的结构术语，意识清晰度与能否达到欲求对象在不同存在者间有巨大差别。",
    englishDistinction:
      "Perception and appetition in monads do not give every monad human senses, intentions, or language. They are broad structural terms, with enormous differences in clarity of awareness and attainment of an appetite's object.",
  },
  "leibniz-two-truths": {
    context:
      "《单子论》§33 紧接两大原则，将推理真理的反面定为不可能、事实真理的反面定为可能。§§34–35 让必然真理经有限分析回到同一命题，§§36–38 则让偶然事实的理由链最终指向一个必然实体。",
    englishContext:
      "Monadology §33 applies the two principles by making the opposite of a truth of reasoning impossible and the opposite of a truth of fact possible. Sections 34–35 resolve necessary truths through finite analysis into identities, whereas §§36–38 trace reasons for contingent facts toward a necessary substance.",
    distinction:
      "事实真理“偶然”不等于无原因、纯随机或不值得解释；它表示否定该事实不含逻辑矛盾。反过来，概念上可设想另一结果也没有证明现实中不存在决定条件。",
    englishDistinction:
      "A contingent truth of fact is not uncaused, purely random, or unworthy of explanation; its denial lacks logical contradiction. Conversely, conceiving another outcome does not prove the actual event lacked determining conditions.",
  },
  "leibniz-possible-worlds": {
    context:
      "《单子论》§§51–54 从受造物不能直接改变单子转到观念世界中的相容性：无限多可能宇宙竞争存在，而相容组合各有完满程度。§55 以智慧认识、善选择、力量实现说明上帝选择“最佳”，后文再以最大多样性与最大秩序展开。",
    englishContext:
      "Monadology §§51–54 move from creatures' inability directly to alter monads to compossibility in the realm of ideas: infinitely many possible universes compete for existence and compatible wholes differ in perfection. Section 55 assigns knowledge to wisdom, choice to goodness, and production to power before unpacking the best as maximal variety with order.",
    distinction:
      "“最佳可能世界”不表示每个局部事件本身最好、痛苦是幻觉或现状不可改善；它是有神论整体比较论证，如何衡量完满以及恶为何必要仍是神义论最有争议的负担。",
    englishDistinction:
      "The best possible world does not make each local event best, suffering illusory, or improvement forbidden. It is a theistic comparison of wholes burdened by contested questions about measuring perfection and the alleged necessity of evil.",
  },
  "leibniz-perspectives": {
    context:
      "《单子论》§§56–57 在最佳宇宙的秩序下，把每个单子称为从自身位置表现全部关系的活镜，并以同一城市从不同方向看似许多城市作比。§58 随即说这种多视角在统一秩序中产生尽可能多的变化。",
    englishContext:
      "Monadology §§56–57, within the order of the best universe, call each monad a living mirror expressing all relations from its own position and compare one city seen from different sides to apparently many cities. Section 58 says this plurality of perspectives produces maximal variety within one order.",
    distinction:
      "视角各异不是相对主义地说没有共同事实，也不表示每一视角同样清楚；城市比喻正以同一对象约束差异，而单子在表征的清晰与混乱上有等级。",
    englishDistinction:
      "Different perspectives do not imply no common facts or equal clarity in every view. The city analogy constrains variation by one object, and monads differ in the distinctness and confusion of their representations.",
  },
  "leibniz-harmony": {
    context:
      "《单子论》§§78–79 回应身心怎样一致：灵魂依目的因、身体依动力因各自运行，却因所有实体预定协调而相遇。它承接无窗单子的非交互性，也替代笛卡尔式心身直接推动；§80 再把这项和谐归于上帝。",
    englishContext:
      "Monadology §§78–79 answer how soul and body agree: soul proceeds through final causes and body through efficient causes, yet their laws coincide through pre-established coordination of substances. This continues windowless noninteraction and replaces direct Cartesian mind-body pushing; §80 grounds the harmony in God.",
    distinction:
      "预定和谐能描述同步模型，却不是仅凭相关性获得的经验发现；它依赖上帝设计来解释为何从不失配，因此不能直接当作现代神经科学的平行论结论。",
    englishDistinction:
      "Pre-established harmony supplies a model of synchronization but is not an empirical discovery from correlation alone. Its guarantee against mismatch depends on divine design and cannot be presented as a conclusion of modern neuroscience.",
  },
  "leibniz-small-perceptions": {
    context:
      "《人类理智新论》序言以海浪轰鸣为例反驳“灵魂中凡有知觉必被意识到”：若每一道微声全为零，十万道也不能组成可听整体。莱布尼茨由 petites perceptions 解释习惯、连续变化及醒睡边界，并借此修正洛克的意识透明性。",
    englishContext:
      "The Preface to New Essays answers the claim that every perception in the soul must be consciously noticed with the roar of the sea: if each tiny wave sound were nothing, a hundred thousand could not compose an audible whole. Petites perceptions then explain habit, continuous change, and transitions between sleep and waking against transparent consciousness.",
    distinction:
      "微知觉存在不表示可以随意把任何行为归因于隐藏感觉，也不与现代无意识概念完全相同；具体解释仍要给出可检验的汇聚机制，而非用“潜意识”封住追问。",
    englishDistinction:
      "Minute perceptions do not license attributing any behavior to hidden feelings and are not identical with every modern notion of the unconscious. A particular explanation still needs a testable mechanism of aggregation rather than an occult label.",
  },
  berkeley: {
    context:
      "《人类知识原理》I.1 先把知识对象分为感觉观念、心灵活动观念及记忆想象观念，§2 另立感知和意愿的主动心灵。§3 才说观念的存在即被感知，并以桌子“在书房中”说明其可感性质总在某个心灵关系中呈现。",
    englishContext:
      "Principles I.1 first divides objects of knowledge into ideas of sense, reflection, memory, and imagination; §2 separately posits the active mind that perceives and wills. Section 3 then says an idea exists by being perceived and uses a table's presence in a study to show that sensible qualities appear only in relation to a mind.",
    distinction:
      "esse est percipi 不是“我不看世界就消失”或个人想象创造事实；贝克莱以其他有限心灵和持续感知的上帝维持公共对象。是否接受这项神学保障是论证的独立问题。",
    englishDistinction:
      "Esse est percipi is not 'the world vanishes when I look away' or private imagination creating facts. Berkeley invokes other finite minds and God's continuous perception to secure public objects, and that theological guarantee requires its own defense.",
  },
  "berkeley-abstraction": {
    context:
      "《人类知识原理·导论》先批评心灵据称能形成既非此色也非彼色、既非此形也非彼形的抽象影像，§12 则提出替代：一个具体观念因在推理中代表同类多个个体而变成一般。后文用画出的特定三角形参与一般证明说明。",
    englishContext:
      "The Introduction first criticizes the alleged ability to form an abstract image with no determinate color or shape. Section 12 offers an alternative: a particular idea becomes general by representing many of its kind in reasoning, later illustrated by a determinate drawn triangle used in a general proof.",
    distinction:
      "反对抽象影像不是拒绝一般概念、数学证明或分类；贝克莱改变的是一般性的载体，从无特征心像转向代表用途，适用规则仍须说明哪些个体可被代入。",
    englishDistinction:
      "Rejecting abstract images does not reject general concepts, mathematical proof, or classification. Berkeley relocates generality from a featureless image to representative use, whose rules must still determine legitimate substitutions.",
  },
  "berkeley-qualities": {
    context:
      "《人类知识原理》I.8 先提出观念只能类似观念，不能类似一个不可感的物质基质；§9 据此把洛克保留为物体固有的广延、形状、运动也归入心中观念。随后数节用大小、速度随感官与位置变化进一步攻击第一—第二性质分界。",
    englishContext:
      "Principles I.8 first argues that an idea can resemble only another idea, not an imperceptible material substrate; §9 accordingly includes extension, figure, and motion among ideas despite Locke's treating them as intrinsic to body. Later sections add their variation with sense, position, scale, and speed against the primary-secondary divide.",
    distinction:
      "所有可感性质依知觉不等于测量毫无客观性；稳定规则和多观察者校正仍能区分幻觉与可重复现象。贝克莱否定的是性质背后不可感“原型”的解释角色。",
    englishDistinction:
      "Dependence of sensible qualities on perception does not destroy objectivity in measurement. Stable rules and cross-observer correction still separate illusion from repeatable appearance; Berkeley rejects the explanatory role of imperceptible material archetypes.",
  },
  "berkeley-spirit": {
    context:
      "《人类知识原理》I.25–26 说观念完全被动，不能彼此造成变化，因此其原因必须是不同于观念的主动实体。§27 把精神按感知称理解、按产生和操作观念称意志，并说它不能被形成“观念”；后文改用 notion 认识精神。",
    englishContext:
      "Principles I.25–26 argue that ideas are wholly passive and cannot cause changes in one another, so their cause must be an active substance distinct from ideas. Section 27 calls spirit understanding as it perceives and will as it produces or operates on ideas, denying an idea of spirit; later Berkeley uses notion for cognition of it.",
    distinction:
      "无法把精神做成心像不等于精神完全不可知，也不证明一个无部分主体已经存在；贝克莱从活动与效果形成“概念性认识”，而从被动内容到主动原因的推理仍可受质疑。",
    englishDistinction:
      "Inability to picture spirit does not make it wholly unknowable or prove a partless subject already exists. Berkeley claims notional knowledge through activity and effects, while the inference from passive content to active cause remains contestable.",
  },
  "berkeley-laws-signs": {
    context:
      "《人类知识原理》I.29–30 区分想象观念受有限意志影响与感觉观念以更强、更有序方式到来，并把后者归于我们所依赖的心灵。§§30–31 将其固定次序称自然法，人由经验学习这些“符号”以预见后续观念和安排生活。",
    englishContext:
      "Principles I.29–30 distinguish ideas of imagination affected by finite will from stronger, more orderly ideas of sense attributed to the mind on which we depend. Sections 30–31 call their settled sequences laws of nature, learned through experience as signs that permit foresight and practical regulation.",
    distinction:
      "把自然法理解为观念序列不让科学只剩主观叙事，也不等于已解释规律为何存在；预测关系仍可精确研究，而终极原因被置于上帝的意志，这是额外的形上承诺。",
    englishDistinction:
      "Treating laws as sequences of ideas does not reduce science to subjective narrative or itself explain why regularity exists. Predictive relations remain precisely investigable, while assigning their ultimate cause to divine will adds a metaphysical commitment.",
  },
  hume: {
    context:
      "《人类理解研究》第7节第二部分寻找“必然联系”观念所来自的印象：单个因果事件只呈现先后，重复相伴才使心灵习惯性地由一项推到另一项。E7.26 以事件本身“松散分离”收束对象侧观察，随即把联系定位于心灵的推断感。",
    englishContext:
      "Enquiry 7.2 seeks the impression from which the idea of necessary connection derives. A single causal case presents succession only; repeated conjunction trains the mind to infer one event from another. E7.26 closes the object-side search with loose and separate events, then locates felt connection in the mind's customary inference.",
    distinction:
      "观察不到纽带不是说因果不存在或科学只能罗列相关；休谟重定“必然”的经验内容，并要求因果推断依赖稳定规律。它也没有从逻辑上保证未观察条件下规律继续。",
    englishDistinction:
      "Failure to observe a tie does not deny causation or reduce science to listing correlations. Hume relocates necessity's experiential content and still requires stable regularity for causal inference, without logically guaranteeing continuation under unobserved conditions.",
  },
  "hume-reason-and-passion": {
    context:
      "《人性论》2.3.3 先论理性单独不能产生或阻止意志行动：证明关系与发现事实本身不提供动机；激情也因不是对事实的表象而通常不与理性矛盾。名句之后马上限定，激情若依赖错误存在判断或选择错误手段，仍可被称为不合理。",
    englishContext:
      "Treatise 2.3.3 first argues that reason alone cannot produce or prevent volition: demonstration and discovery of fact supply no motive, while passions usually cannot contradict reason because they are not representations of fact. Immediately after the slogan, Hume qualifies that a passion can be called unreasonable when based on a false existence belief or a mistaken means.",
    distinction:
      "理性为激情服务不表示任何欲望都应服从、理性毫无规范作用或情绪胜过证据；理性能纠正对象判断、比较手段与揭示后果，只是行动的终极驱动力还需要关切。",
    englishDistinction:
      "Reason serving passion does not make every desire worthy, strip reason of normative work, or put feeling above evidence. Reason corrects beliefs, compares means, and reveals consequences; Hume says ultimate motivation still requires concern.",
  },
  "hume-bundle-self": {
    context:
      "《人性论》1.4.6 在质疑灵魂实体观念后进行内省检验：冷暖、爱恨、痛乐等具体知觉总在场，却从不遇见脱离知觉的“我”。随后剧场比喻又被休谟自己收回其空间暗示，并以记忆、相似与因果说明想象怎样归结人格同一。",
    englishContext:
      "Treatise 1.4.6 tests the idea of a soul-substance by introspection: heat and cold, love and hatred, pain and pleasure appear, but never an I apart from perception. Hume then retracts the spatial suggestion of his theater metaphor and explains how memory, resemblance, and causation let imagination ascribe personal identity.",
    distinction:
      "内省未发现恒常实体不证明人只是随意碎片，也没有排除身体、叙事和社会关系形成真实连续性；休谟后来在附录承认解释知觉统一仍令他不满。",
    englishDistinction:
      "Not finding a constant substance in introspection does not make a person an arbitrary heap or exclude real continuity through body, narrative, and relations. Hume later admits in the Appendix that his account of perceptual unity remains unsatisfactory.",
  },
  "hume-copy-principle": {
    context:
      "《人类理解研究》第2节先承认想象能把已有材料组合成金山、善马等从未经验的复合物，再提出简单观念应可追溯到较生动印象。接下来的颜色缺阶例被休谟承认为看似反例，却称其不足以推翻一般准则。",
    englishContext:
      "Enquiry 2 first concedes that imagination combines familiar materials into a golden mountain or virtuous horse never experienced as wholes, then proposes that simple ideas be traceable to livelier impressions. The missing shade of blue is immediately admitted as an apparent exception, though Hume declines to overturn the general maxim for it.",
    distinction:
      "摹本原则不是每个复杂思想都有一个一模一样的感觉事件，也不是无经验词语必然无意义；它是要求拆分概念、寻找内容来源的检验，反例和关系结构仍需处理。",
    englishDistinction:
      "The copy principle does not require one sensory episode identical to every complex thought or make every nonobservational term meaningless. It is a test that decomposes concepts and asks after content sources, while exceptions and relational structure remain to be handled.",
  },
  "hume-two-objects-reason": {
    context:
      "《人类理解研究》第4节以数学命题示范观念关系：仅凭思维即可发现，其否定含矛盾；凯撒从未存在、太阳明日不升等事实否定则仍可设想。随后问题转成，我们凭什么越过当前感觉和记忆推断事实，并答一切此类推断建立在因果关系上。",
    englishContext:
      "Enquiry 4 illustrates relations of ideas with mathematics, discoverable by thought alone and contradicted by their denials. Denials of matters of fact—Caesar never existed or the sun will not rise—remain conceivable. The section then asks how we move beyond present sense and memory and answers that such factual inference rests on cause and effect.",
    distinction:
      "两分不表示经验命题全都可疑到无法行动，也不等于分析／综合或先验／后验的所有后世版本；它区分否定是否矛盾与事实应由何种证据支持。",
    englishDistinction:
      "The fork does not make empirical claims too doubtful for action and is not identical with every later analytic/synthetic or a priori/a posteriori distinction. It separates contradiction in denial from the evidence needed for fact.",
  },
  "hume-particular-ideas": {
    context:
      "《人性论》1.1.7 采纳并改造贝克莱的反抽象论：心中出现的线、三角形或人总有确定性质，一般性来自词因习惯唤起一组相似个例，并使当前个别意象在推理中代表整类。若推论误用，其他个例会被唤起来纠正。",
    englishContext:
      "Treatise 1.1.7 adopts and revises Berkeley's critique of abstraction: a pictured line, triangle, or person always has determinate features. Generality comes when custom connects a word with resembling instances and lets one present image represent the class; other instances are revived to correct an invalid inference.",
    distinction:
      "一般观念依个别表象不把概念缩成一张典型图片，也不表示分类只凭表面相似；习惯形成的适用范围和反例校正承担了图片本身没有的规则作用。",
    englishDistinction:
      "Grounding general thought in a particular image does not reduce a concept to one prototype or classification to surface resemblance. Habitual ranges of application and correction by counterinstances do rule-like work the image cannot perform alone.",
  },
  "hume-belief-external-world": {
    context:
      "《人性论》1.4.2 区分物体在知觉中断后继续存在与物体独立于心灵存在，并问感官、理性或想象何者产生这两种信念。引文说自然不把如此重要之事交给不确定推理；后文以知觉的恒常性和连贯性解释想象怎样补出持续物体。",
    englishContext:
      "Treatise 1.4.2 distinguishes bodies' continued existence during interrupted perception from existence independent of mind and asks whether sense, reason, or imagination produces the beliefs. The excerpt says nature does not entrust so important an affair to uncertain reasoning; constancy and coherence then explain imagination's fiction of continued objects.",
    distinction:
      "信念天然不可避免不等于它已被哲学证明，也不是任何直觉都可靠；休谟展示实践如何越过论证缺口，同时保留知觉与对象关系的怀疑压力。",
    englishDistinction:
      "A naturally unavoidable belief is not thereby philosophically proved, nor is every intuition reliable. Hume shows how practice crosses an argumentative gap while preserving skeptical pressure on the relation between perceptions and objects.",
  },
  "hume-mitigated-skepticism": {
    context:
      "《人类理解研究》第12节先让彻底怀疑接受一个实践反驳：日常行动、感官和自然倾向会使皮浪式悬置无法持续。第三部分转向较温和的学院怀疑，限制探究范围、降低断言强度，E12.24 以永久伴随判断的谨慎谦逊概括其气质。",
    englishContext:
      "Enquiry 12 first subjects excessive skepticism to a practical answer: action, sense, and natural propensity make Pyrrhonian suspension unsustainable. Part 3 turns to mitigated Academic skepticism, narrowing inquiry and lowering the scale of assertion; E12.24 summarizes its temper as lasting caution and modesty in judgment.",
    distinction:
      "温和怀疑不是凡事折中、拒绝定论或把证据充分的主张永远说成“也许”；谦逊使确信与证据相称，强证据仍可支持明确行动和反驳。",
    englishDistinction:
      "Mitigated doubt is not compromise on every issue, refusal of conclusions, or permanent 'perhaps' despite strong evidence. Modesty proportions confidence to grounds, which can still warrant decisive action and rebuttal.",
  },
  "hume-testimony-miracles": {
    context:
      "《人类理解研究》第10节先说我们信证言是因经验发现报告与事实通常相合，又把奇迹界定为违反由稳固一致经验确立的自然法。E10.13 要在“证言为假”与“自然进程被破例”两种反常之间相减权衡，第二部分再检验实际奇迹报告的来源条件。",
    englishContext:
      "Enquiry 10 grounds trust in testimony on experienced agreement between reports and facts and defines a miracle as a violation of a law established by firm, uniform experience. E10.13 balances the anomaly of false testimony against an exception to nature, while Part 2 examines the actual social conditions of miracle reports.",
    distinction:
      "非凡主张需非凡证据不是预先宣布奇迹逻辑不可能，也不是可用来蔑视陌生文化见证的口号；对“稳定经验”和报告者可靠性的评估自身可能偏置，须公开校正。",
    englishDistinction:
      "Extraordinary claims needing stronger evidence does not declare miracles logically impossible or license contempt for testimony from unfamiliar cultures. Assessments of uniform experience and reporter reliability can themselves be biased and require public correction.",
  },
  "hume-liberty-necessity": {
    context:
      "《人类理解研究》第8节先把必然解释为事件稳定相伴及心灵由一项推到另一项，主张人的动机、性格与行为也呈现这种规律。E8.23 再把自由限定为可依意志行动或不行动，与被锁链等外部阻碍相对，从而使自由与这种因果必然相容。",
    englishContext:
      "Enquiry 8 first defines necessity through regular conjunction and the mind's inference, arguing that motives, character, and conduct display the same regularity. E8.23 then limits liberty to being able to act or refrain according to will, as opposed to external restraints such as chains, making liberty compatible with that causal necessity.",
    distinction:
      "依意志行动没有解释意志怎样由操控、成瘾或压迫塑造，也不是资源充足的政治自由；这是为责任论澄清的最低相容论能力，更厚的自主条件仍需补充。",
    englishDistinction:
      "Acting according to will does not explain how manipulation, addiction, or oppression shapes the will and is not resource-rich political freedom. It is a minimal compatibilist capacity for responsibility, open to thicker conditions of autonomy.",
  },
  "hume-is-ought-transition": {
    context:
      "《人性论》3.1.1 已论道德区别不可能单由理性发现，因为德恶会激发行动而单纯理性不会。段末观察道德体系常从“是／不是”悄然改写成“应当／不应当”，要求指出这种新关系并解释推导桥梁；下一节转而在道德感中寻找区别来源。",
    englishContext:
      "Treatise 3.1.1 has argued that moral distinctions cannot arise from reason alone because virtue and vice motivate whereas reason by itself does not. Its closing paragraph notices systems silently moving from is to ought, demands that the new relation and bridge be explained, and then turns in the next section to moral feeling.",
    distinction:
      "休谟在此没有证明事实与规范永远不能相联，而是禁止省略价值前提或推理规则；事实可限制选择并揭示后果，只是“为何该在乎”必须明说。",
    englishDistinction:
      "Hume does not prove that fact and norm can never be connected; he forbids omitting the value premise or rule of inference. Facts constrain options and reveal consequences, but why those consequences matter must be made explicit.",
  },
  "hume-moral-sentiment": {
    context:
      "《道德原则研究》附录一分配理性与情感在道德判断中的职能：理性查明行动情境、事实关系和有用或有害的倾向，到这一步仍未产生偏好；共同人性才赞同有益者。后文以道路选择比喻说理性指路，欲求赋予目的。",
    englishContext:
      "Appendix 1 of the Enquiry Concerning the Principles of Morals assigns roles in moral judgment: reason discovers circumstances, relations, and useful or harmful tendencies, but this alone supplies no preference; humanity favors the beneficial. A later road analogy lets reason show routes while desire supplies an end.",
    distinction:
      "情感参与不等于道德只是个人好恶，理性也不是可有可无；休谟诉诸可扩展到共同观点的人性感受，而这种感受是否排斥某些群体仍须由事实与反思纠偏。",
    englishDistinction:
      "Sentiment's role does not reduce morality to private taste or make reason optional. Hume appeals to feeling extendable through a common point of view, while factual inquiry and reflection must correct exclusions within that sympathy.",
  },
  "hume-sympathy-communication": {
    context:
      "《人性论》3.3.1 解释我们为何评价对自己没有直接利害的人格：由他人行为的外在迹象形成其情感观念，观念因人与人相似而增强成对应印象。绷紧琴弦的比喻描画这种 sympathy，随后它帮助建立超出私人位置的一般观点。",
    englishContext:
      "Treatise 3.3.1 explains evaluation of characters with no direct bearing on oneself: outward signs produce an idea of another's affect, which resemblance among humans can enliven into a corresponding impression. The tuned-string image depicts this sympathy, which then supports a general point of view beyond private position.",
    distinction:
      "情感可传播不表示我们透明地感到他人所感或群体情绪必然正确；距离、相似认定与既有偏见都会影响共鸣，所以一般观点是校正机制而非自动结果。",
    englishDistinction:
      "Communicable affect does not give transparent access to another's feeling or make a crowd's emotion correct. Distance, perceived resemblance, and prejudice shape resonance, so the general point of view is a corrective achievement rather than an automatic result.",
  },
  "hume-circumstances-justice": {
    context:
      "《道德原则研究》第3节以思想实验寻找正义的适用条件：若自然极端丰裕或人人无限仁爱，财产规则无用；若极端匮乏或全面恶意使规则不能维持生命，通常义务也会悬置。现实的有限资源与有限慷慨使稳定占有和交换具有公共效用。",
    englishContext:
      "Section 3 of the Enquiry Concerning the Principles of Morals uses counterfactuals to locate justice's circumstances. Extreme abundance or unlimited benevolence would make property rules useless; extreme scarcity or universal malice could make ordinary rules unable to sustain life. Finite resources and limited generosity give stable possession and exchange public utility.",
    distinction:
      "正义依处境不表示强者可在“紧急”名义下任意停法，也不把正义等同维护现有财产分配；规则是否有用须从共同安全衡量，并防止制造匮乏者垄断定义例外。",
    englishDistinction:
      "Circumstantial justice does not let the powerful suspend law at will under an emergency label or identify justice with existing distributions. Usefulness must be assessed through common security without letting producers of scarcity monopolize the exception.",
  },
  "hume-promises-convention": {
    context:
      "《人性论》3.2.5 接在财产与转让等人为德性之后，问一句“我承诺”怎样产生此前不存在的义务。休谟否认意志能像魔法创造新心灵行为，转而从共同约定、互利期待以及特定词语作为信号的历史形成解释承诺。",
    englishContext:
      "Treatise 3.2.5 follows the artificial virtues of property and transfer by asking how saying 'I promise' creates a new obligation. Hume denies that will magically produces a new mental act and instead explains promising through convention, mutually advantageous expectation, and the historical establishment of particular words as signs.",
    distinction:
      "承诺是约定产物不使它任意、虚假或随时可退；制度一旦形成，信赖利益和共同实践便提供真实理由。反之，强迫说出的信号或无人能合理理解的规则未必产生同样义务。",
    englishDistinction:
      "Promising as conventional is not arbitrary, fictional, or revocable at whim; once established, reliance and shared practice supply real reasons. Conversely, coerced signals or rules no one can reasonably understand need not create the same obligation.",
  },
  "hume-standard-of-taste": {
    context:
      "《论趣味的标准》先面对两项张力：情感似乎各自正确，长期评价却明显区分荷马与劣作。文章借细腻感受、反复实践、跨作品比较、健全理解与清除偏见刻画“真正批评家”，第23段把这类人的共同裁断作为可获得的标准。",
    englishContext:
      "Of the Standard of Taste begins from a tension: sentiments appear correct for each person, yet durable judgment distinguishes Homer from inferior work. The essay develops delicacy, practice, comparison across works, sound understanding, and freedom from prejudice as traits of a true judge; paragraph 23 locates the available standard in their joint verdict.",
    distinction:
      "有训练的共同判断不等于既有文化精英天然正确，也不会消除年龄、气质和生活形式造成的合理差异；谁能受训、何谓偏见和经典怎样形成，都必须反过来审查标准。",
    englishDistinction:
      "Convergent trained judgment does not make an existing cultural elite naturally correct or eliminate reasonable differences of age, temperament, and life. Access to training, the definition of prejudice, and canon formation must themselves be scrutinized.",
  },
  rousseau: {
    context:
      "《社会契约论》I.8 比较由自然状态进入公民状态的得失：人失去无边界的自然自由和对所欲之物的占有，却取得由公意限定的公民自由、合法所有与道德自由。服从自订法律之句正用来解释为何规则约束不必等同受他人奴役。",
    englishContext:
      "Social Contract I.8 compares losses and gains in passing from nature to civil society: a person loses unlimited natural liberty and possession by force but gains civil liberty bounded by the general will, legal proprietorship, and moral freedom. Obedience to self-prescribed law explains why rule-governed constraint need not be subjection to another.",
    distinction:
      "“我们为自己立法”不是个人只服从喜欢的规则，也不是多数决定自动成为公意；自由要求每个公民以共同主体身份参与、法律保持一般，并防止强势私利冒充共同意志。",
    englishDistinction:
      "Prescribing law to ourselves does not let each person obey only preferred rules or make every majority vote the general will. Freedom requires participation as a common subject, general laws, and safeguards against powerful private interests impersonating the common will.",
  },
  "rousseau-compassion-prior-to-reason": {
    context:
      "《论不平等》第一部分在自然人的自爱与自由之后，以怜悯反驳霍布斯式的天然恶意图景，并与曼德维尔关于社会德性的分析争论。卢梭让看见同类受苦引发的退缩缓和自保冲动，随后由此改写自然法箴言为在保全自己时尽量少伤害他人。",
    englishContext:
      "Part I of the Discourse on Inequality introduces pity after self-love and free agency to oppose a Hobbesian picture of natural hostility and engage Mandeville on social virtue. Recoil before another's suffering moderates self-preservation, and Rousseau then recasts natural law as securing one's good with the least possible harm to others.",
    distinction:
      "天然怜悯不是稳定的普遍利他，也不能替代权利、证据和制度正义；距离、比较和利益会压弱它。卢梭提供的是道德动机的前反思起点，不是一套完整伦理。",
    englishDistinction:
      "Natural pity is neither reliable universal altruism nor a substitute for rights, evidence, and institutions of justice; distance, comparison, and interest can weaken it. Rousseau supplies a prereflective source of motivation, not a complete ethics.",
  },
  "rousseau-perfectibility-double-edge": {
    context:
      "《论不平等》第一部分先以自由能偏离本能区别人和动物，继而把 perfectibilité 定为随环境发展各项能力的开放能力。引文回顾它既积累发现和德性，也积累错误、恶习与依赖，为第二部分的社会不平等历史准备发动机制。",
    englishContext:
      "Part I of the Discourse distinguishes humans from animals first through freedom to deviate from instinct and then through perfectibility, the open capacity to develop faculties with circumstances. The excerpt makes it accumulate discoveries and virtues as well as errors, vices, and dependence, preparing Part II's conjectural history of inequality.",
    distinction:
      "可完善性不是必然进步、个人无限潜能或单一路线的文明阶梯；它只说人和制度可被历史塑造，变化方向取决于关系与环境，退化同样可能。",
    englishDistinction:
      "Perfectibility is not inevitable progress, limitless individual potential, or a single ladder of civilization. It means humans and institutions are historically shapeable, with direction dependent on relations and circumstances and deterioration equally possible.",
  },
  "rousseau-amour-propre-comparison": {
    context:
      "《论不平等》注释十五为正文中的 amour-propre 澄清术语：amour de soi 是保存生命的自然自爱，经理性与怜悯调节可通向人道；amour-propre 则在社会比较中要求自己高于他人，并生出荣誉、嫉妒和相互伤害。Cole 的 egoism/self-respect 译法需由这一区分校正。",
    englishContext:
      "Note XV to the Discourse clarifies amour-propre against amour de soi. Natural self-love seeks preservation and, guided by reason and pity, can support humanity; comparative amour-propre seeks superiority in others' eyes and generates honor, envy, and mutual harm. Cole's egoism/self-respect vocabulary must be read through this distinction.",
    distinction:
      "比较性自尊不表示所有社会承认都腐败，也不要求消灭自我评价；平等制度可把对目光的需要转向相互尊重，问题是满足是否以他人较低为条件。",
    englishDistinction:
      "Comparative esteem does not make every form of social recognition corrupt or require erasing self-evaluation. Egalitarian institutions may redirect the need for regard toward mutual respect; the test is whether satisfaction requires another's inferiority.",
  },
  "rousseau-property-enclosure": {
    context:
      "《论不平等》第二部分以圈地者的戏剧化场景开篇，并让一个本可拔桩者警告土地果实属于众人、土地本身不属于任何人。后文却不把这一幕当可考年代，而追溯家庭、分工、冶金农业与法律怎样逐步让财产主张获得承认。",
    englishContext:
      "Part II of the Discourse opens with the theatrical first enclosure and imagines someone pulling up the stakes and warning that fruits belong to all while earth belongs to none. What follows is not a datable incident but a gradual account of families, division of labor, metallurgy, agriculture, and law making property claims recognizable.",
    distinction:
      "“第一个人”是制度起源的思想实验，不证明所有使用权和个人物品都是盗窃，也不能替代具体土地史；锋芒在于单方宣称只有被他人相信并由制度继承才成为支配性事实。",
    englishDistinction:
      "The first man is a thought experiment about institutional origin, not proof that every use-right or personal possession is theft and not a substitute for specific land histories. A unilateral declaration becomes dominant only through recognition and inherited enforcement.",
  },
  "rousseau-metallurgy-agriculture-inequality": {
    context:
      "《论不平等》第二部分在最初家庭和村落之后，让冶金与农业造成“大革命”：耕地需要分配土地，铁器扩大生产与专业分工，产品比较又使才能差异转成财富和依赖。接下来的法律契约由富者提议，把既有占有固定为制度。",
    englishContext:
      "After households and early villages, Part II of the Discourse makes metallurgy and agriculture a great revolution: cultivation requires allocating land, iron expands production and specialization, and comparison of products converts differences of skill into wealth and dependence. The rich then propose a legal compact that stabilizes possession.",
    distinction:
      "铁与谷物不是技术决定论地“毁掉人类”，也不表示少生产便自然平等；因果链经过分工、产权和规则制定，技术效果取决于谁控制收益、风险与制度。",
    englishDistinction:
      "Iron and grain do not deterministically ruin humanity, and reduced production does not naturally yield equality. The chain runs through labor division, property, and rule-making, so effects depend on control of benefits, risks, and institutions.",
  },
  "rousseau-luxury-corrupts-virtue": {
    context:
      "《论科学与艺术》回应第戎学院“复兴科学艺术是否净化风俗”的问题，第一部分先以文明外表与德性衰落对照，第二部分追问学艺的起源和社会奖励。奢侈段把懒惰、虚荣、消费展示与文化声望串联，后文再以军事软弱和才德错配说明政治代价。",
    englishContext:
      "The Discourse on the Sciences and Arts answers Dijon's question whether their restoration purifies morals. Part I contrasts polished appearances with declining virtue, and Part II asks about the origins and rewards of learning. The luxury passage joins idleness, vanity, display, and prestige before turning to military weakness and the misrecognition of talent and virtue.",
    distinction:
      "批评奢侈并非证明文学科学本身有害或贫困天然高尚；卢梭针对的是由取悦权力和炫耀消费支配的文化制度，他仍为少数真正求知者和服务公共的学问留出位置。",
    englishDistinction:
      "Criticizing luxury does not prove literature and science inherently harmful or poverty naturally virtuous. Rousseau targets cultural institutions governed by display and pleasing power while leaving room for genuine inquirers and learning serving the public.",
  },
  "rousseau-childhood-own-form": {
    context:
      "《爱弥儿》第二卷处理能说话到约十二岁的阶段，反复要求“让童年在儿童身上成熟”，反对用成人判断和道德说教提前占领经验。引文用身高作比，随后讨论孩子的哭、感受、游戏和依后果学习，教育内容须与能力生长同步。",
    englishContext:
      "Emile II treats the period from speech to roughly age twelve and repeatedly urges letting childhood ripen in children rather than replacing experience with adult judgment and moralizing. The height analogy is followed by discussions of crying, sensation, play, and learning through consequences, matching instruction to developing capacities.",
    distinction:
      "尊重阶段不表示低估儿童理解力、把年龄刻成僵硬标准或拒绝对话；孩子差异、残障与文化环境会改变路径，而卢梭自己的性别化教育也不能随此原则一起免于批评。",
    englishDistinction:
      "Respecting stages does not underestimate children's understanding, fix rigid age norms, or reject dialogue. Individual difference, disability, and culture alter development, and Rousseau's own gendered education is not shielded from criticism by this principle.",
  },
  "rousseau-negative-education": {
    context:
      "《爱弥儿》第二卷所谓“否定教育”接在不要急于灌输理性与德目之后：教师暂不讲抽象真理，而精心安排物理环境，让儿童从需要、阻力和自然后果中形成判断。成年人的言语变少，设计经验和保护免受偏见的责任反而更大。",
    englishContext:
      "Emile II's negative education follows the warning not to hurry abstract reason and virtue into early childhood. The tutor lectures less and arranges the physical environment so need, resistance, and natural consequence form judgment; adult responsibility increases through design and protection from prejudice.",
    distinction:
      "“不教”不是放任、撤回照护或让伤害充当老师；间接控制环境也可能操纵儿童且隐藏权力。安全、可退出和逐步说明目的，是现代应用必须补入的边界。",
    englishDistinction:
      "Not teaching is not neglect, withdrawal of care, or letting harm instruct. Indirect environmental control can manipulate while hiding authority, so safety, exit, and progressively explaining purposes are necessary modern limits.",
  },
  "rousseau-conscience-inner-guide": {
    context:
      "《爱弥儿》第四卷的“萨瓦牧师信仰告白”以一个文学人物回应形上怀疑：理性帮助认识事物和关系，却不能单独使人爱善；良知作为内在感受给予评价方向。热烈呼告之后，牧师仍要求良知在安静、诚实和不受成见遮蔽时被听见。",
    englishContext:
      "The Savoyard Vicar's Profession of Faith in Emile IV uses a literary speaker to answer metaphysical doubt: reason identifies things and relations but cannot alone make goodness loved, while conscience supplies evaluative direction as inward feeling. Even after the apostrophe, the Vicar requires conscience to be heard honestly, quietly, and without prejudice.",
    distinction:
      "“无误裁判”是告白中的规范理想，不证明每个强烈内心声音都正确，也不能省略事实调查；习俗、创伤和利益会冒充良知，理性与他人反馈仍须辨认其对象。",
    englishDistinction:
      "Infallible judge is a normative ideal within the profession, not proof that every intense inner voice is correct or a substitute for factual inquiry. Custom, trauma, and interest can impersonate conscience, requiring reason and feedback to identify its object.",
  },
  "rousseau-solitary-reverie-existence": {
    context:
      "《一个孤独漫步者的遐想》第五次漫步回忆圣皮埃尔岛：划船、采集植物和听湖水节律让记忆与未来欲求暂退，留下单纯存在感。引文回答这种无外物满足的快乐是什么，随后把它与持续变化中极短、脆弱的安息相联。",
    englishContext:
      "The Fifth Walk of the Reveries recalls Saint-Pierre Island, where boating, botany, and the rhythm of water quiet memory and future desire until a bare feeling of existence remains. The excerpt asks what this self-sufficient enjoyment is and relates it to a brief, fragile rest amid continual change.",
    distinction:
      "独处的充足不是人人可得的永久生活方案，也不能以审美退隐替代社会责任；它记录在特定安全、时间与环境条件下减少比较的体验，制度问题并未因此消失。",
    englishDistinction:
      "Solitary sufficiency is not a permanent life available to everyone and cannot replace social responsibility with aesthetic retreat. It records reduced comparison under particular conditions of safety, time, and place; institutional problems remain.",
  },
  "rousseau-language-born-from-passion": {
    context:
      "《论语言的起源》第二章先区分物质需要与道德激情：饥渴往往使人彼此散开，爱、恨、怜悯和愤怒却召唤他者，因而最初声音带有呼喊、音调和比喻。后续章节再比较南北气候、旋律语言与逐渐精确却降温的表达。",
    englishContext:
      "Essay on the Origin of Languages II distinguishes physical need from moral passion: hunger and thirst often scatter people, whereas love, hatred, pity, and anger call to another, giving first voices cry, accent, and figure. Later chapters compare climates, melodic speech, and increasingly precise but affectively cooler expression.",
    distinction:
      "激情起源是哲学式猜测史，不是现代语言学已证实的单一起源，也不说信息需要对语言无作用；它突出音调和关系维度，以反驳语言从一开始就只是冷静编码的模型。",
    englishDistinction:
      "Passionate origin is conjectural history, not a single origin established by modern linguistics, and it does not make informational need irrelevant. It highlights accent and relation against a model of language as dispassionate coding from the start.",
  },
  "rousseau-sovereignty-not-represented": {
    context:
      "《社会契约论》III.15 批评公民因商业、私人事务与安逸而付钱让代表承担公共职责，继而重申主权作为公意不可转让。代表可以是行政代理，却不能替人民意愿立法；卢梭甚至称议员只是委员，法律未经人民亲自批准便无效。",
    englishContext:
      "Social Contract III.15 criticizes citizens who, absorbed by commerce, private affairs, and ease, pay representatives to perform public duty, then restates sovereignty as an inalienable general will. Deputies may administer but cannot will legislation for the people; Rousseau calls them commissioners and denies validity to laws not personally ratified.",
    distinction:
      "不可代表没有给出大规模社会如何持续审议、纳入被排除者或处理专业事务的充分制度；它是对选举后公民退场的警告，不必推出一切代表机制都与民主相反。",
    englishDistinction:
      "Nonrepresentation does not supply adequate institutions for continuous deliberation, inclusion of excluded people, or expertise at scale. It warns against citizens disappearing after elections without proving every representative mechanism antidemocratic.",
  },
  "rousseau-legislator-extraordinary": {
    context:
      "《社会契约论》II.7 在人民是立法主权者之后提出悖论：一个共同体在成为能够判断好法律的公民之前已需要好法律塑造。立法者应理解人民激情却无私人利益，提出制度却不拥有主权或强制权，只能借劝服与象征使人民自行批准。",
    englishContext:
      "Social Contract II.7 introduces a paradox after locating legislative sovereignty in the people: a community needs good laws to form citizens before those citizens can judge good laws. The legislator understands passions without private interest, proposes institutions without sovereignty or coercive office, and must persuade the people to authorize them.",
    distinction:
      "“需要神祇”不是授权自称先知的专家越过同意，而是把完美创制者的条件提高到近乎不可能；洞见再高也不能替代人民批准，且创制者影响欲望的权力本身须防范。",
    englishDistinction:
      "It would take gods does not authorize self-appointed experts to bypass consent; it raises the conditions of perfect founding to near impossibility. Insight cannot replace popular authorization, and the founder's power to shape desires itself needs constraint.",
  },
  "rousseau-civil-religion-tolerance": {
    context:
      "《社会契约论》IV.8 回顾神权与国家结合、基督教二重忠诚等历史模式后，提出少数“公民信条”维持社交情感，同时排除宗教不宽容。引文给出互惠宽容条件，但同段也允许驱逐拒绝信条者，并严厉惩罚宣誓后违背者，暴露方案的强制张力。",
    englishContext:
      "Social Contract IV.8 surveys civic cults, church-state union, and Christianity's divided allegiance before proposing a few civil dogmas to sustain sociability while rejecting religious intolerance. The excerpt makes toleration reciprocal, but the same passage permits banishing rejecters and harshly punishing those who affirm and then violate the creed, exposing coercive tension.",
    distinction:
      "“违背公民义务”若由国家按异议内容而非可证明伤害来界定，会把宽容原则反转为思想审查；现代采用必须保护良心自由、程序权利和和平退出，而不能照搬惩罚条款。",
    englishDistinction:
      "If the state defines breach of civic duty by dissenting belief rather than demonstrable harm, toleration reverses into thought control. Modern use must protect conscience, due process, and peaceful exit rather than inherit the punitive clause.",
  },
};
