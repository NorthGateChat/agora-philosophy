import type { InterpretationDetail } from "./interpretationTypes";

/** Hand-written source context for the Western canon from antiquity through Aquinas. */
export const westernEarlyStaticDetails: Record<string, InterpretationDetail> = {
  heraclitus: {
    context:
      "B2 由塞克斯都·恩披里柯保存，紧接 B1 对人们听见 logos 却仍不理解的责备；这里的“共同”指可由清醒者共同把握的秩序，而非多数意见。残篇传承与排序出自后人，不能把它当作一篇完整论文的第二段。",
    englishContext:
      "Fragment B2 is preserved by Sextus Empiricus and continues B1's complaint that people hear the logos yet fail to understand it. 'Common' names an order available to wakeful inquiry, not majority opinion. The sequence is reconstructed from later quotations rather than a surviving continuous treatise.",
    distinction:
      "“共同者”不保证人人已经同意，也不是取消个别经验；它批评把私人判断封闭成自足世界。将 logos 直接译成后世神学的“圣言”或现代科学定律，都会超出这条残篇。",
    englishDistinction:
      "The common does not mean that everyone already agrees or that singular experience disappears; it challenges private judgment treated as a self-sufficient world. Identifying logos outright with later Christian Word theology or a modern scientific law exceeds this fragment.",
  },
  "heraclitus-logos": {
    context:
      "B50 由希波吕托斯在反驳异端的著作中转引；句子把听从的对象从赫拉克利特本人移向 logos，再以“万物为一”标示差异中的关联。保存者的神学论战不是原残篇的直接语境，解释时须保留这层传递距离。",
    englishContext:
      "Hippolytus preserves B50 while arguing against heresies. The sentence redirects attention from Heraclitus as speaker to the logos and then names a unity disclosed through plurality. The transmitter's Christian polemic is not the fragment's original setting and must not be silently imported into it.",
    distinction:
      "“万物为一”没有说一切事物毫无差别，也不是让权威人物免于质疑；智慧恰在于越过说话者，考察贯穿对立与变化的关系秩序。",
    englishDistinction:
      "'All things are one' does not erase differences or exempt an authoritative speaker from scrutiny. Wisdom lies in looking beyond the speaker toward the relational order disclosed through opposition and change.",
  },
  "heraclitus-river": {
    context:
      "B12 由阿里乌斯·狄迪穆斯经优西比乌保存，原句以同一河流与不断到来的新水并置；它讨论的是持续性怎样包含更替，而非只宣告“万物都变”。后来“不能两次踏入同一条河”的更强公式并非这份引文的逐字形态。",
    englishContext:
      "B12 survives through Arius Didymus as quoted by Eusebius. It holds together the same rivers and ever-arriving waters, asking how continuity includes replacement rather than merely announcing that everything changes. The stronger familiar formula about never stepping twice is not the exact wording of every ancient witness.",
    distinction:
      "河仍可被辨认为这条河，因此残篇没有否定一切同一性；它也未证明人格、制度或概念只能流散。比喻的锋芒在同一与变化相互依存。",
    englishDistinction:
      "The river remains identifiable as this river, so the fragment does not abolish every kind of identity, nor does it prove that persons, institutions, or concepts only dissolve. Its force lies in the interdependence of persistence and change.",
  },
  "heraclitus-conflict": {
    context:
      "卡片并接 B53 与 B80：前者由希波吕托斯保存，以战争造成神／人、自由／奴役的区分；后者由奥利金保存，把争斗、正义和生成相连。两条残篇可互照，却不是原书中已证实相邻的一段。",
    englishContext:
      "The card joins B53, preserved by Hippolytus, with B80, preserved by Origen. The first describes war differentiating gods and humans, free and enslaved; the second connects strife, justice, and becoming. They illuminate one another but are not demonstrably adjacent sentences from the lost book.",
    distinction:
      "把 polemos 视为宇宙分化原则，不等于为现实战争、奴役或暴力赋予正当性；残篇描述秩序由张力显现，并未给任何具体统治者签发伦理许可。",
    englishDistinction:
      "Treating polemos as a principle of differentiation does not justify actual war, enslavement, or violence. The fragments describe order emerging through tension; they issue no ethical license to a particular ruler or conflict.",
  },
  "heraclitus-character": {
    context:
      "B119 由斯托拜乌保存，只有极短的 ēthos anthrōpō daimōn；daimōn 可指命运般的神力，ēthos 则兼有性情与惯常居处的意味。缺少原篇邻文，使任何完整心理学解释都必须保持克制。",
    englishContext:
      "Stobaeus preserves B119 as the very brief ēthos anthrōpō daimōn. Daimōn can carry the force of a destiny-like power, while ēthos suggests both character and habitual dwelling. Because the original neighbors are lost, a full psychology cannot be recovered from the aphorism alone.",
    distinction:
      "这句话没有说外部处境、偶然或制度毫无作用，也不是“受害皆因性格”的责备；它至多指出反复形成的性情会参与塑造一个人遭遇世界的方式。",
    englishDistinction:
      "The line does not deny circumstance, chance, or institutions, and it must not become blame that victims caused their fate. At most it says that habituated character participates in shaping how a person meets the world.",
  },
  parmenides: {
    context:
      "B2 位于女神启示的“真理之路”开端：序诗中的青年抵达女神处后，被要求同时学习可靠真理与凡人意见。女神先列“是”与“不是”两条可设想路径，随后排除把非存在当作可知对象的路线。",
    englishContext:
      "B2 opens the goddess's Way of Truth after the youth of the proem reaches her and is told to learn both reliable truth and mortal opinion. She lays out the routes of 'is' and 'is not,' then excludes treating non-being as an object that can be known.",
    distinction:
      "两路之分不是日常存在判断的机械规则，也不表示我们不能说虚构、否定或缺失；论证针对探究若以绝对非存在为对象，便失去可思可说的立足点。",
    englishDistinction:
      "The two routes are not a mechanical rule for every ordinary existential sentence, nor do they make fiction, negation, or absence unsayable. The argument targets inquiry that takes absolute non-being as its object and thereby removes what could be thought or said.",
  },
  "parmenides-thinking-being": {
    context:
      "B3 是克莱门特保存的单行残篇，处在现代编排中 B2 的路径区分与 B6 对可说者之“是”的要求之间。它把思与存在紧密相连，但语法简略，究竟强调同一、共同条件还是相互归属，历来有争议。",
    englishContext:
      "Clement preserves B3 as a single line, placed in modern reconstructions between B2's routes and B6's demand that what is speakable be. It tightly links thinking and being, but its compressed grammar leaves disputed whether it asserts identity, a shared condition, or mutual belonging.",
    distinction:
      "这行诗不等于“想到什么就会存在”，也不是唯心主义的现成口号；它否认的是对绝对虚无进行普通对象式思考，而非赋予想象创造现实的能力。",
    englishDistinction:
      "The verse does not mean that whatever one imagines comes into existence, and it is not a ready-made idealist slogan. It denies object-like thought of absolute nothing, not the difference between thinking something and making it real.",
  },
  "parmenides-sayable": {
    context:
      "B6 开头命令听者必须说和思“是者”；紧随其后的残句警告不要走凡人把“是”与“不是”混同的双头道路。引文因此是对论证纪律的规定，不是一项关于所有语词必有现实对象的词典理论。",
    englishContext:
      "B6 begins by requiring the hearer to say and think what-is. Its following lines warn against the two-headed mortal path that confuses being and non-being. The excerpt therefore imposes a discipline on inquiry rather than a dictionary theory that every expression has a real-world object.",
    distinction:
      "“可说者必是”不能用来证明神话人物、错误判断或未来可能性都以同样方式存在；需要先区分一句话可被表达，与其所断言的对象真实成立。",
    englishDistinction:
      "'What can be spoken must be' cannot prove that mythical figures, false judgments, or future possibilities all exist in the same way. Expressibility must be distinguished from the truth of what an expression asserts.",
  },
  "parmenides-unchanging": {
    context:
      "B8 是“真理之路”的长篇论证：女神逐一给出不生、不灭、完整、不动和连续的“标志”，并追问生成若发生，能从何处、为何时发生。卡片取开头标志，后文才展开各项反证与球形比喻。",
    englishContext:
      "B8 is the long argument of the Way of Truth. The goddess lists signs—ungenerated, imperishable, whole, unmoving, continuous—and then asks from where and why generation could occur. The card takes the opening markers; subsequent lines supply the reductive arguments and the image of a well-rounded sphere.",
    distinction:
      "这不是经验科学对运动的否认，也不能直接当作“时间不存在”的证明；它从严格的“是者”概念推出条件，至于凡人经验中的变化如何处理，是诗中“意见之路”的另一个问题。",
    englishDistinction:
      "This is not an empirical-scientific denial that motion is observed, nor a direct proof that time is unreal. It derives conditions from a strict notion of what-is; how the changing mortal world is to be accounted for belongs to the poem's separate Way of Opinion.",
  },
  "socrates-care-of-soul": {
    context:
      "《申辩篇》30a–b 位于苏格拉底拒绝以停止哲学活动换取释放的答辩。他把自己对雅典人的劝告概括为先关心灵魂是否最好，随后断言德性不是由财富产生，反而财富与其他善取决于德性。",
    englishContext:
      "At Apology 30a–b Socrates refuses acquittal on condition that he stop philosophizing. He summarizes his exhortation to Athenians as caring first that the soul become as good as possible, then argues that wealth does not produce virtue; rather, other goods depend on virtue.",
    distinction:
      "“先关心灵魂”不是轻视身体需要或把贫困道德化；在审判语境中，它重新排列名誉、财产与正义的优先次序，也没有提供一套脱离公共问答的私人修炼法。",
    englishDistinction:
      "Caring first for the soul neither dismisses bodily needs nor moralizes poverty. In the trial it reorders reputation, property, and justice, and it does not prescribe a private spiritual exercise detached from public questioning.",
  },
  "socrates-limits-of-knowing": {
    context:
      "在《申辩篇》21b–d，苏格拉底为解释神谕而访问一位自认智慧的政治人物；交谈使他发现对方不知道却自以为知。引句给出的只是两人相比之下的“小优势”，后文还会检验诗人与工匠。",
    englishContext:
      "At Apology 21b–d Socrates tests the oracle by questioning a politician reputed to be wise. The exchange reveals someone who does not know yet thinks he does. The excerpt names only Socrates' small comparative advantage; he next examines poets and craftsmen as well.",
    distinction:
      "承认不知道不是赞美无知，也不表示苏格拉底对任何事情都无主张；它针对没有理由却冒充知识的确信，并以继续询问而非停止学习为后果。",
    englishDistinction:
      "Acknowledged ignorance is not praise of ignorance or a claim that Socrates holds no convictions. It targets confidence that masquerades as knowledge without an account, and its consequence is continued inquiry rather than giving up learning.",
  },
  "socrates-gadfly-city": {
    context:
      "《申辩篇》30e–31a 把雅典比作体大而迟钝的良马，把苏格拉底的劝告、责备与唤醒比作牛虻叮刺。比喻紧接他警告处死自己会伤害城邦，随后解释为何神示使他从事公共劝诫却不担任政治职务。",
    englishContext:
      "At Apology 30e–31a Athens is a large, sluggish thoroughbred and Socrates' exhortation, reproach, and awakening are a gadfly's sting. The image follows his warning that executing him will harm the city and precedes his account of why a divine sign keeps him from conventional public office.",
    distinction:
      "牛虻比喻不使所有挑衅自动成为公共服务；苏格拉底把其正当性系于持续论证、冒个人风险和关心德性，而不是以制造注意或羞辱他人为标准。",
    englishDistinction:
      "The gadfly image does not turn every provocation into public service. Socrates ties his activity to sustained argument, personal risk, and care for virtue, not merely attracting attention or humiliating others.",
  },
  "socrates-never-repay-injustice": {
    context:
      "《克里同篇》49b–d 先重申“任何情况下都不可作恶”，再让克里同同意遭受不义也不能以不义回报。它是苏格拉底拒绝越狱的前提之一；拟人化的法律随后才论述他与城邦的关系。",
    englishContext:
      "Crito 49b–d first reaffirms that wrongdoing is never permissible and then obtains Crito's agreement that injustice must not be repaid with injustice. This is one premise in refusing escape; the personified Laws' account of civic obligation comes afterward.",
    distinction:
      "不报复不等于不抵抗伤害、放弃救济或服从施害者；论证排除的是以同类不义作为回敬。什么行动算不义，仍须在对话中给出理由。",
    englishDistinction:
      "Not retaliating does not mean never resisting harm, seeking remedy, or refusing an abuser. The argument excludes answering injustice with injustice of one's own; what counts as unjust still requires an account.",
  },
  "socrates-laws-persuasion": {
    context:
      "《克里同篇》51b–c 由拟人化的雅典法律发言：公民若不接受判决，应依法说服城邦何为正义，否则须承担服从义务。后文又以成年后可离开雅典的选择说明默示同意；这些主张是越狱争论中的法律之声。",
    englishContext:
      "At Crito 51b–c the personified Laws argue that a citizen who rejects a judgment must persuade the city about justice or accept its command. They later appeal to the adult citizen's opportunity to leave Athens as tacit agreement. These are the Laws' claims within the escape debate.",
    distinction:
      "“说服或服从”不是苏格拉底为任何政权写下的无条件服从原则；《申辩篇》也展示他拒绝不义命令。卡片不能抹去合法性、退出是否真实以及不服从的道德界限。",
    englishDistinction:
      "'Persuade or obey' is not an unconditional command of obedience to every regime; the Apology also depicts Socrates refusing unjust orders. Legitimacy, genuine opportunity to exit, and the moral limits of compliance cannot be erased.",
  },
  "socrates-virtue-and-knowledge": {
    context:
      "《普罗泰戈拉篇》351b–358d 从快乐、善与度量术的讨论推进到所谓“被快乐战胜”；苏格拉底把错误选择解释为对远近苦乐的错误估量。引句是这段论证的结论，普罗泰戈拉等人只是逐步表示同意。",
    englishContext:
      "Protagoras 351b–358d moves from pleasure and good to a measuring art and the claim of being overcome by pleasure. Socrates redescribes bad choice as mismeasurement of near and distant pleasures and pains. The excerpt concludes that argument as Protagoras and the others assent step by step.",
    distinction:
      "“无人自愿作恶”依赖这段把善与正确认识相连的论证，并未证明资讯一到位行为就必然改变；成瘾、强迫、习惯和情绪冲突不是这句结论已经解决的现代问题。",
    englishDistinction:
      "'No one willingly does evil' depends on this argument linking good action with correct measurement. It does not prove that information alone always changes conduct; addiction, compulsion, habit, and affective conflict are not modern problems already settled by the sentence.",
  },
  "socrates-cross-examined-confidence": {
    context:
      "《拉凯斯篇》187e–188a 中尼西亚斯说明，一旦进入苏格拉底式交谈，不论从何题开始，谈话都会转向说话者如何生活。此话用来支持让苏格拉底检验两位将军关于青年教育的建议，发言者是尼西亚斯而非苏格拉底自述。",
    englishContext:
      "At Laches 187e–188a Nicias explains that once someone enters conversation with Socrates, whatever the starting topic, the exchange circles back to how that person lives. He uses this to support Socrates' examination of the generals' advice on educating the young; it is Nicias' description, not Socrates' autobiography.",
    distinction:
      "盘问生活不是把每次讨论变成人身审判，也不是治疗技术；其目标是检验主张与生活是否相称。若缺少自愿回应、理由交换与可反驳性，纠缠本身不构成苏格拉底方法。",
    englishDistinction:
      "Examining a life does not turn every discussion into a personal trial or a therapeutic technique. It tests whether claims cohere with conduct; without responsive reasons and openness to rebuttal, mere interrogation is not Socratic practice.",
  },
  "socrates-midwife-of-thought": {
    context:
      "《泰阿泰德篇》149a–151d 让苏格拉底把母亲的助产术改写成思想助产：他自称不能传授自己的智慧，却能诱发并检验青年产下的观念。紧接着泰阿泰德提出“知识是知觉”，由后续大段对话接受检查。",
    englishContext:
      "Theaetetus 149a–151d transforms Socrates' mother's midwifery into intellectual midwifery. He claims not to transmit wisdom of his own but to induce and test what a young mind gives birth to. Theaetetus then proposes that knowledge is perception, a thesis examined through the rest of the dialogue.",
    distinction:
      "助产比喻没有保证学习者的“内在答案”必真，也不取消教师提供问题、反例与判断的责任；苏格拉底明说检验可能发现的是风胎而非高贵产物。",
    englishDistinction:
      "The midwife image does not guarantee that an answer drawn from within is true, nor remove the teacher's responsibility to offer questions, counterexamples, and judgment. Socrates explicitly allows that examination may expose a phantom rather than a sound birth.",
  },
  "socrates-piety-needs-form": {
    context:
      "《欧绪弗洛篇》5d–6e 中，欧绪弗洛以自己起诉父亲作为虔敬的例子，又列举诸神惩罚亲属的故事。苏格拉底拒绝例表，要求说明使所有虔敬行为成为虔敬的共同形式，由此开启后续一连串定义。",
    englishContext:
      "At Euthyphro 5d–6e Euthyphro offers his prosecution of his father as an example of piety and cites divine punishments of relatives. Socrates rejects a list of cases and asks for the common form by which all pious acts are pious, initiating the dialogue's sequence of definitions.",
    distinction:
      "索求共同形式不表示一个定义一经提出就已正确，也不意味着伦理判断可以忽略个案差别；这只是把举例转成可接受反例检验的一般说明。",
    englishDistinction:
      "Requesting a common form does not make the first definition correct or permit ethical judgment to ignore differences among cases. It shifts from examples to a general account that can be tested by counterexample.",
  },
  "socrates-rhetoric-as-flattery": {
    context:
      "《高尔吉亚篇》462b–466a 中，苏格拉底在波洛斯追问下把技艺与经验性逢迎区分：烹饪冒充医术，美容冒充体育，修辞则冒充正义相关的政治技艺。卡片跨 463d 与 465a，省略了这套四分对应。",
    englishContext:
      "At Gorgias 462b–466a, under Polus' questioning, Socrates distinguishes arts from knack-like flattery: cookery impersonates medicine, cosmetics gymnastics, and rhetoric the justice-related branch of politics. The card joins 463d and 465a, omitting the intervening fourfold analogy.",
    distinction:
      "批评对象不是所有修辞表达，而是不以对象之善与知识为约束、只求即时愉悦的说服；对话后面仍需说明真正政治技艺是什么，不能据此把动听与虚假简单画等号。",
    englishDistinction:
      "The target is not every use of rhetoric but persuasion governed by immediate gratification rather than knowledge of its subject's good. The dialogue still owes an account of genuine political art; pleasant speech cannot simply be equated with falsehood.",
  },
  "socrates-worse-to-do-wrong": {
    context:
      "《高尔吉亚篇》474b 处，波洛斯承认作恶较可耻，却坚持受害较坏。苏格拉底随后分析“可耻”若非因痛苦就是因恶，从而逼迫波洛斯承认作恶在恶性上更大；引句是争论中的强断言，证明尚在后面。",
    englishContext:
      "At Gorgias 474b Polus concedes that wrongdoing is more shameful while insisting that suffering wrong is worse. Socrates next analyzes shamefulness through pain and badness, forcing the conclusion that doing wrong is worse in badness. The excerpt is the strong claim before that proof is completed.",
    distinction:
      "把作恶视为更伤害灵魂，不会使受害者的痛苦变轻，也不是要求受害者保持被动；比较的是两种恶对行动者品格与受害处境的不同损害。",
    englishDistinction:
      "Calling wrongdoing worse for the soul does not minimize a victim's suffering or demand passivity. The comparison concerns different harms—to the agent's character and to the sufferer's condition—rather than denying either.",
  },
  "plato-cave-adjustment": {
    context:
      "《理想国》VII 515c–516a 刚让囚徒被解开、转身并被迫看火光与器物；骤然改变使旧影子反而显得更真实。随后他才逐步辨认影像、实物、星辰与太阳，教育的转向因此包含适应期。",
    englishContext:
      "Republic VII 515c–516a has just released a prisoner, turned him around, and forced him toward the fire and carried objects. The abrupt shift makes the old shadows seem more real. Only afterward does he gradually distinguish reflections, things, stars, and finally the sun.",
    distinction:
      "初见光明的困难没有证明真相总应由强者强迫灌输，也不使困惑本身成为真理标志；比喻说明认知习惯改变会痛苦，仍需由后续辨认与理由检验方向。",
    englishDistinction:
      "Difficulty on first seeing light does not authorize the powerful to impose whatever they call truth, nor make confusion a mark of truth. The image shows that changed orientation can hurt; later discrimination and reasons must still test its direction.",
  },
  "plato-power-and-wisdom": {
    context:
      "《理想国》V 471c–473e 在苏格拉底被要求说明理想城邦如何可能后提出“第三浪”：哲学与政治权力必须合一。后面 VI 卷才界定哲学家为爱真理、能把握形式者，并讨论现实城邦为何腐蚀这种性格。",
    englishContext:
      "At Republic V 471c–473e, pressed to explain how the ideal city could be possible, Socrates introduces the 'third wave': philosophy and political power must coincide. Book VI then defines the philosopher as a lover of truth capable of grasping forms and explains why actual cities corrupt that character.",
    distinction:
      "“哲学家为王”不是让自称聪明者取得无限权力；它依赖严苛教育、对善的知识和共同制度。引文也没有解决谁来识别真正哲学家或如何约束统治这一政治难题。",
    englishDistinction:
      "Philosopher-rule does not grant unlimited power to anyone claiming wisdom. It depends on demanding education, knowledge of the good, and a common institutional order, while leaving difficult questions about identification and accountability unresolved.",
  },
  "plato-equality-and-forms": {
    context:
      "《斐多篇》74a–75b 以两根看似相等的木石有时对甲显得相等、对乙不等，说明感官实例趋近却达不到“相等本身”。这段服务于回忆论：我们能判断实例不足，似乎已具有比较标准。",
    englishContext:
      "Phaedo 74a–75b notes that apparently equal sticks and stones can seem equal to one observer and unequal to another, while sensible cases fall short of Equality itself. The passage supports recollection: judging the deficiency appears to presuppose a standard of comparison.",
    distinction:
      "从不完美实例指向标准，并未单靠这几句证明形式独立存在或灵魂前生；论证还需要说明标准从何而来，以及“达不到”不是由普通概念学习解释。",
    englishDistinction:
      "Moving from imperfect instances to a standard does not by itself prove separately existing Forms or prenatal knowledge. The argument still must explain the standard's source and why ordinary concept learning cannot account for judging that instances fall short.",
  },
  "plato-learning-as-recollection": {
    context:
      "《美诺篇》80d–86c 回应“若不知道要找什么便无法探究”的悖论。苏格拉底先借祭司诗人的灵魂不灭说提出回忆，继而用几何追问让奴隶少年修正错误答案；引句是待演示的假说，不是演示本身。",
    englishContext:
      "Meno 80d–86c answers the paradox that one cannot inquire into what one does not know. Socrates introduces recollection through priestly and poetic claims about the soul, then questions an enslaved boy through a geometry problem until he revises false answers. The excerpt states the hypothesis before its demonstration.",
    distinction:
      "问答能诱发推理不等于少年早已拥有所有知识，也不证明教师没有提供结构性引导；苏格拉底只声称由困惑走向真意见，并把知识还系于进一步的“系牢”。",
    englishDistinction:
      "Questioning that elicits reasoning does not show the boy already possesses every item of knowledge or that the questioner supplies no structure. Socrates reaches true opinion from perplexity and still distinguishes it from knowledge that has been secured.",
  },
  "plato-knowledge-needs-account": {
    context:
      "《泰阿泰德篇》201c–210a 在“知识是知觉”和“知识是真意见”均受挫后，讨论“真意见加 logos”。对话依次试验 logos 是表达思想、列举元素或给出区别，最终仍陷入循环；引句是第三项候选定义的转述。",
    englishContext:
      "Theaetetus 201c–210a turns to true judgment plus logos after knowledge as perception and as true judgment have failed. It tests logos as expressing thought, enumerating elements, and specifying a distinguishing mark, but ends in difficulty. The excerpt reports the third candidate definition, not a settled Platonic formula.",
    distinction:
      "“真意见加说明”不能直接当作对知识的最终定义；本篇结尾正展示几种“说明”都可能不足。可靠理由、非偶然性与理解的关系仍是开放问题。",
    englishDistinction:
      "'True opinion plus an account' is not simply the dialogue's final definition of knowledge. Its ending shows several senses of account failing, leaving open how reasons, nonaccidentality, and understanding are related.",
  },
  "plato-soul-in-parts": {
    context:
      "《理想国》IV 436a–441c 用同一事物不能在同一时刻、同一方面对同一对象作相反运动的原则，解释口渴却不饮、愤怒与欲望冲突等经验。论证由此区分理性、气概与欲望，为城邦—灵魂类比奠基。",
    englishContext:
      "Republic IV 436a–441c uses the principle that the same thing cannot act oppositely at the same time, in the same respect, toward the same object. Cases such as thirst resisted and anger opposing appetite motivate reason, spirit, and appetite within the city-soul analogy.",
    distinction:
      "相反原则含有三个限定，不能把任何犹豫都算作不同“部分”；三分灵魂也是解释性结构，不是三个脑区或三个人格实体的经验发现。",
    englishDistinction:
      "The opposition principle carries three qualifications, so not every hesitation establishes a separate part. The tripartite soul is an explanatory structure, not an empirical discovery of three brain regions or three personal agents.",
  },
  "plato-justice-as-harmony": {
    context:
      "《理想国》IV 441c–444a 在城邦的三阶层与灵魂三部分完成对应后，把个人正义界定为各部分各司其职、由理性统领。引文后面以健康与疾病类比正义和不义，再回到为何正义生活值得选择。",
    englishContext:
      "Republic IV 441c–444a completes the analogy between the city's three classes and the soul's three parts, defining personal justice as each doing its own work under rational rule. The following lines compare justice and injustice with health and disease before returning to why justice is choiceworthy.",
    distinction:
      "内在和谐不是压抑所有欲望或要求社会成员永守出身位置；个人论证借用了理想城邦分工，不能未经论证就把心理秩序转成固定等级制度。",
    englishDistinction:
      "Inner harmony is not suppression of every appetite, nor does it by itself require citizens to remain in inherited stations. The personal argument borrows the city's division of labor; psychological order cannot simply validate a fixed social hierarchy.",
  },
  "plato-ring-of-invisibility": {
    context:
      "《理想国》II 359b–360d 中，格劳孔借吕底亚牧人发现隐身戒指、夺权弑君的故事，为“人只因无力作恶才正义”的挑战加压。他设想给正义者与不义者各一枚戒指，以迫使苏格拉底说明正义本身的益处。",
    englishContext:
      "In Republic II 359b–360d Glaucon tells how a Lydian shepherd finds an invisibility ring, seizes power, and kills the king. Giving one ring each to a just and unjust person intensifies the challenge that people are just only because they cannot act unjustly with impunity.",
    distinction:
      "这段话是格劳孔替不义提出的最强论证，不是柏拉图已经接受的人性定律；后续九卷正要回答即使无人看见，不义仍会破坏灵魂秩序。",
    englishDistinction:
      "This is Glaucon's strongest case for injustice, not a Platonic law of human nature already endorsed. The subsequent dialogue argues that wrongdoing disorders the soul even when no observer can detect it.",
  },
  "plato-myth-of-metals": {
    context:
      "《理想国》III 414b–415d 在守卫者教育与安置方案后提出“腓尼基故事”：所有公民生于同一大地，却在灵魂中混有金银铜铁，子女材质可能不同。故事既制造共同亲缘，也为按能力重新分层提供神话框架。",
    englishContext:
      "Republic III 414b–415d follows the guardians' education with a 'Phoenician tale': citizens are born from one earth but have gold, silver, bronze, or iron mixed in their souls, and children may differ from parents. The myth combines common kinship with a framework for functional ranking.",
    distinction:
      "文本自己把它称作有用的虚构，因此不能把金属等级当作柏拉图发现的生物事实；纵向流动的条款也未消除由统治者讲述并执行分类的权力风险。",
    englishDistinction:
      "The dialogue itself calls this a useful falsehood, so metallic ranks are not a biological fact Plato discovered. The allowance for mobility does not remove the danger of rulers narrating and enforcing the classification.",
  },
  "plato-regimes-and-souls": {
    context:
      "《理想国》VIII 543a–545c 从理想政体转向其衰败序列。苏格拉底先说政体必由人的性情产生，随后依次描画荣誉政体、寡头、民主与僭政及其相应人格；引句是全卷类型学的入口。",
    englishContext:
      "Republic VIII 543a–545c turns from the best city to its sequence of decline. Socrates first says regimes arise from human dispositions, then traces timocracy, oligarchy, democracy, and tyranny alongside their corresponding characters. The excerpt opens that typology.",
    distinction:
      "城邦与人格的类比不是可直接验证的历史周期律，也不表示一种欲望就能解释全部制度变化；经济结构、战争与法律机制在具体历史中仍需独立分析。",
    englishDistinction:
      "The city-character analogy is not a directly verified law of historical cycles, nor can one desire explain every institutional change. Economic structures, war, and legal mechanisms still require separate analysis in actual histories.",
  },
  "plato-practice-of-dying": {
    context:
      "《斐多篇》64a–68b 在苏格拉底临刑前讨论哲学家为何不惧死亡：身体欲望与感觉会干扰对真理的把握，哲学训练灵魂尽量自行思考。引句总结这一分离论证，随后西米亚斯指出“死亡即分离”的定义。",
    englishContext:
      "Phaedo 64a–68b, on the day of Socrates' execution, asks why a philosopher need not fear death. Bodily appetite and sensation impede undistracted truth-seeking, so philosophy trains the soul to think by itself. The excerpt summarizes this separation argument before further proofs of immortality.",
    distinction:
      "“练习死亡”不是鼓励自杀或否定身体照护；对话开头明确说人不能擅自结束生命。它属于灵魂不朽与形式知识的论证框架，不能简化成厌世口号。",
    englishDistinction:
      "Practicing death is not encouragement of suicide or neglect of bodily care; the dialogue explicitly forbids taking one's own life at will. It belongs to arguments about soul and Forms, not a slogan of world-hatred.",
  },
  "plato-ladder-of-love": {
    context:
      "《会饮篇》210a–212a 是苏格拉底转述狄奥提玛的爱欲教育：从一个美的身体，转向一切身体、灵魂、制度、知识，最后骤见美本身。引句处在上升次序中，前提是每一级扩展而非弃绝先前对象。",
    englishContext:
      "Symposium 210a–212a reports Diotima's education of desire: from one beautiful body to all bodies, souls, practices, kinds of knowledge, and finally Beauty itself. The excerpt belongs to this ordered ascent, in which each stage broadens rather than simply despises the earlier object.",
    distinction:
      "阶梯不能给利用具体他人充当一次性工具开脱，也没有说身体之爱必低劣；理想上，爱由占有欲扩展为对灵魂、共同实践与知识之善的照料。",
    englishDistinction:
      "The ladder does not license using a concrete person as a disposable rung, nor declare bodily love inherently contemptible. Ideally desire expands beyond possession toward care for souls, shared practices, and knowledge.",
  },
  "plato-writing-cannot-answer": {
    context:
      "《斐德若篇》274c–277a 以埃及神话让发明文字的忒乌特称其为记忆药方，国王塔穆斯却说它只会提供提醒与智慧外观。随后苏格拉底把文字比作不能回答、不会选择读者的画，反衬活的辩证言说。",
    englishContext:
      "Phaedrus 274c–277a tells the Egyptian story in which Theuth offers writing as a remedy for memory, while King Thamus predicts reminders and the appearance of wisdom instead. Socrates then compares writing to a silent painting and contrasts it with living dialectical speech.",
    distinction:
      "批评不是要求废除书写——整段本身由书传下——而是指出固定文本不能自行诊断误解、调整说明或选择受众；这些缺口可由读者、教师和互文实践部分弥补。",
    englishDistinction:
      "The critique is not a demand to abolish writing—the passage reaches us in writing. It identifies a fixed text's inability to diagnose misunderstanding, adapt an explanation, or choose its audience, gaps that readers and dialogical practices may partly repair.",
  },
  "plato-divided-line": {
    context:
      "《理想国》VI 509d–511e 紧接太阳比喻，把一条线按同一比例两次切分，得到影像、可见物、数学对象与形式四层，并配以想象、信念、思考和理解。VII 卷洞穴寓言将把这种认知上升戏剧化。",
    englishContext:
      "Republic VI 509d–511e follows the sun analogy by dividing a line twice in the same ratio into images, visible things, mathematical objects, and Forms, paired with imagining, belief, thought, and understanding. Book VII's cave will dramatize the ascent among these conditions.",
    distinction:
      "分线不是现代心理测量的四级量表，也不表示可见世界全是假象；各层差异关乎对象、假设和说明方式，数学仍因保留未经追问的假设而低于辩证法。",
    englishDistinction:
      "The line is not a four-level psychometric scale and does not make the visible world wholly unreal. Its divisions concern objects, hypotheses, and modes of account; mathematics remains below dialectic because it leaves starting assumptions unexamined.",
  },
  "plato-good-beyond-being": {
    context:
      "《理想国》VI 507b–509c 的太阳比喻把善比作太阳：太阳使可见物既能被看见又生长，善则使可知物可知并获得存在与本质。引句是类比的顶点，随后才转入分线。",
    englishContext:
      "Republic VI 507b–509c compares the Good with the sun. As the sun makes visible things seen and also sustains their generation, the Good makes intelligible things known and gives them being and essence. The excerpt crowns that analogy before the divided line begins.",
    distinction:
      "“超越本质”不是说善是一件位置更高的普通对象，也不等于凡被称作善的政策都能制造现实；这是对知识与可理解性的终极条件所作的形而上学比喻。",
    englishDistinction:
      "'Beyond essence' does not locate the Good as one ordinary object higher than others, nor imply that any policy called good creates reality. It is a metaphysical analogy for the ultimate condition of knowledge and intelligibility.",
  },
  "plato-cosmos-as-order": {
    context:
      "《蒂迈欧篇》29d–30b 在说明创世叙事只是“似真的说明”后，引入工匠神：因其善而无嫉妒，遂把无序运动尽可能整理成秩序，并赋予宇宙灵魂与理智。材料的必然性随后仍限制制作。",
    englishContext:
      "Timaeus 29d–30b, after warning that cosmology offers only a likely account, introduces the craftsman. Because he is good and without jealousy, he orders disorderly motion as far as possible and gives the cosmos soul and intelligence; material necessity continues to constrain the making.",
    distinction:
      "这不是现代宇宙学的实验结论，也未说世界每项苦难都是善意设计；“尽可能”与后文的必然性保留了秩序、材料限制和恶的问题。",
    englishDistinction:
      "This is not an experimental result of modern cosmology, nor does it claim every suffering is benevolent design. 'As far as possible' and the later role of necessity preserve tensions among order, material constraint, and evil.",
  },
  aristotle: {
    context:
      "《尼各马可伦理学》II.1 先区分思想德性由教导增长、品格德性由习惯形成；随后用建造、演奏及城邦立法说明活动塑造相应性格。引句处在论证起点，后文还要求行为出于知识、选择与稳定品格。",
    englishContext:
      "Nicomachean Ethics II.1 distinguishes intellectual virtue, developed by teaching, from character virtue, formed by habituation. Building, playing music, and legislation then show activities shaping dispositions. The excerpt opens the argument; later Aristotle requires knowledge, choice, and stable character as well.",
    distinction:
      "重复正义动作不保证已成为正义者，机械服从或被迫表演可能缺少选择与正确理由；习惯形成也会塑造恶习，因此关键不只是次数而是行动的种类与方式。",
    englishDistinction:
      "Repeating a just-looking act does not guarantee just character; mechanical compliance may lack choice and the right reason. Habituation also forms vices, so what and how one repeatedly does matter, not repetition alone.",
  },
  "aristotle-flourishing-activity": {
    context:
      "《尼各马可伦理学》I.7 通过“功能论证”从人的特有活动不是营养或感觉，而是依理性的灵魂活动，推出人的善。引句随后加上“完整一生”，I.8–10 又检验外在善、运气与死后评价。",
    englishContext:
      "Nicomachean Ethics I.7's function argument identifies the distinctively human work not with nutrition or perception but with rational activity of soul. The excerpt adds a complete life; I.8–10 then test the account against external goods, fortune, and posthumous assessment.",
    distinction:
      "幸福不是一时愉快、德性清单或只靠意志取得的状态；它是持续活动，同时仍需一定身体、友谊与物质条件。引文没有把遭遇不幸者的处境归咎于品格。",
    englishDistinction:
      "Flourishing is neither a passing pleasure, a virtue inventory, nor a state secured by will alone. It is sustained activity that still needs bodily, social, and material conditions; the passage does not blame misfortune on character.",
  },
  "aristotle-political-animal": {
    context:
      "《政治学》I.2 从家庭、村落到自足城邦追溯共同体，并以语言能表达利害、正义与不义说明人为何“天生政治”。引文后的“无城邦者”可能是野兽或神，论证指向共同判断而非仅群居。",
    englishContext:
      "Politics I.2 traces household and village toward the self-sufficient polis and explains the human as political through logos that discloses advantageous, harmful, just, and unjust. The following claim that the cityless person is beast or god concerns shared judgment, not mere social clustering.",
    distinction:
      "“天生政治”不能证明任何既存国家天然正当，也不排除迁徙者、隐居者或无国籍者的人性；它论述一种在语言和制度中实现的能力，具体政体仍可败坏这种能力。",
    englishDistinction:
      "Political by nature does not legitimate every existing state or deny the humanity of migrants, recluses, or stateless people. It concerns a capacity realized in speech and institutions, capacities that an actual regime may also deform.",
  },
  "aristotle-mean-relative-to-us": {
    context:
      "《尼各马可伦理学》II.6 先区分事物本身的算术中点与“相对于我们”的合宜尺度，以十磅食物对运动员和初学者不同为例。定义后立即列明有些行为本身恶劣，根本不存在可取中道。",
    englishContext:
      "Nicomachean Ethics II.6 distinguishes an arithmetic midpoint in a thing from the mean relative to us, illustrated by different food portions for an athlete and beginner. Immediately after the definition Aristotle says some acts are bad in themselves and admit no virtuous mean.",
    distinction:
      "中道不是凡事折中、取两端平均或迎合个人偏好；它由事实、目的、时机和实践理性决定。残酷与正义之间没有“适量残酷”这样的德性位置。",
    englishDistinction:
      "The mean is not compromise in everything, an average of extremes, or whatever feels comfortable. Facts, end, timing, and practical reason determine it; there is no virtuous dose halfway between cruelty and justice.",
  },
  "aristotle-choice-reveals-ends": {
    context:
      "《尼各马可伦理学》III.3 以医者不商议要不要治病、演说家不商议要不要说服为例，说明 deliberation 通常从既定目的向可行手段倒推，直到找到自己能做的第一步。随后 choice 被界定为经商议的欲求。",
    englishContext:
      "Nicomachean Ethics III.3 says a doctor does not deliberate whether to heal or an orator whether to persuade. Deliberation works backward from a given end through feasible means until it reaches an action one can initiate; choice is then deliberative desire.",
    distinction:
      "“不商议目的”不表示目的永远免于伦理反省；本段分析一次行动中的商议结构，而全书教育欲望、选择生活目标和实践智慧仍会改变我们追求什么。",
    englishDistinction:
      "'We do not deliberate about ends' does not make ends forever immune to ethical reflection. The chapter analyzes the structure of one deliberation, while education of desire and practical wisdom still reshape what agents pursue.",
  },
  "aristotle-practical-wisdom": {
    context:
      "《尼各马可伦理学》VI.5 先以伯里克利等善于处理自身与城邦事务者为例，把实践智慧同技艺、科学和智慧区分。它处理可变且可行动的人类善，后文还强调既要普遍认识也要把握具体事实。",
    englishContext:
      "Nicomachean Ethics VI.5 begins from figures such as Pericles who deliberate well about their own and the city's affairs, distinguishing practical wisdom from craft, science, and theoretical wisdom. It concerns variable human goods and later requires both universals and particulars.",
    distinction:
      "实践智慧不是技巧高超、随机应变或计算私利；“真实且依理”受良好目的约束。没有品格，聪明可能只是实现坏目标的机敏。",
    englishDistinction:
      "Practical wisdom is not technical cleverness, improvisation, or efficient pursuit of private advantage. Its true reasoning is constrained by a good end; without character, ingenuity may be merely skill at achieving bad purposes.",
  },
  "aristotle-friend-as-another-self": {
    context:
      "《尼各马可伦理学》IX.4 从善人如何对待自己——愿自身之善、与自己相处并协调欲望——推导朋友的特征，因为友爱似乎由自爱延伸。引句只是这一列表中的简短总结，IX.8 还会区分高尚自爱与自私。",
    englishContext:
      "Nicomachean Ethics IX.4 derives features of friendship from how a good person relates to himself: wishing his own good, living agreeably with himself, and having desires in concord. The brief 'another self' condenses that list; IX.8 later separates noble self-love from selfishness.",
    distinction:
      "朋友如另一个自己不等于朋友是我的复制品、财产或满足需要的延伸；完善友爱恰以愿对方为了其自身而善为条件，并允许差异与批评。",
    englishDistinction:
      "A friend as another self is not one's copy, possession, or instrument of need. Complete friendship requires wishing the other's good for that person's own sake and remains compatible with difference and correction.",
  },
  "aristotle-contemplative-life": {
    context:
      "《尼各马可伦理学》X.7 在先前把幸福界定为合德性活动后，主张理智沉思最连续、自足且为自身而被爱；X.8 随即承认人的复合本性、伦理德性与外在资源仍不可完全省去。",
    englishContext:
      "Nicomachean Ethics X.7, after defining happiness as virtuous activity, argues that contemplation is especially continuous, self-sufficient, and loved for itself. X.8 immediately returns to humans as composite beings and preserves roles for ethical virtue and external resources.",
    distinction:
      "沉思的优越性不表示照护、政治和劳动毫无价值，也不是人人应脱离社会；这是全书内部有争议的最高生活论，必须与亚里士多德关于友谊和城邦的论述并读。",
    englishDistinction:
      "The superiority of contemplation does not make care, politics, or labor worthless or require everyone to withdraw. It is a contested culmination within the work and must be read beside Aristotle's accounts of friendship and the polis.",
  },
  "aristotle-akrasia-conflict": {
    context:
      "《尼各马可伦理学》VII.3 追问明知不对者如何仍行动。亚里士多德区分拥有知识与正在运用知识，并以初学者、醉者或熟睡者能复述话语却未真正激活其意义作比；引句解释知识尚未“成为自身”的状态。",
    englishContext:
      "Nicomachean Ethics VII.3 asks how someone can act against knowledge. Aristotle distinguishes possessing knowledge from actively using it and compares beginners, sleepers, or intoxicated people who can repeat propositions without activating their meaning. The excerpt describes knowledge not yet assimilated.",
    distinction:
      "会复述不等于已理解，但失控行为也不能一概归为“学习不够”；章节还分析欲望影响具体前提。成瘾、创伤与神经条件需要超出古代三段论模型的证据。",
    englishDistinction:
      "Recitation is not understanding, but every loss of control cannot be reduced to insufficient study. The chapter also examines appetite's effect on a particular premise; addiction, trauma, and neurological conditions require evidence beyond the ancient syllogistic model.",
  },
  "aristotle-justice-and-proportion": {
    context:
      "《尼各马可伦理学》V.3 讨论分配性正义：公共荣誉、财富等按参与者与份额之间的几何比例分配；争议往往来自民主派、寡头派和贵族派对“相关功绩”的不同理解。V.4 才转向交易纠正的算术平等。",
    englishContext:
      "Nicomachean Ethics V.3 concerns distributive justice: honors and common goods are allocated by geometrical proportion between persons and shares. Democrats, oligarchs, and aristocrats dispute what relevant merit is. V.4 then turns to arithmetic equality in corrective justice.",
    distinction:
      "“合乎比例”本身不能决定以需要、贡献、自由身份还是财富作尺度；比例公式会放大所选标准，因此标准的正当性必须另行论证。",
    englishDistinction:
      "Proportion alone cannot decide whether need, contribution, free status, or wealth is the proper criterion. A formula amplifies the chosen standard, whose justice therefore needs an independent argument.",
  },
  "aristotle-four-causes": {
    context:
      "《物理学》II.3 在说明自然研究要回答“为什么”之后，依次列质料、形式、动力来源与目的四种 aitia，并用雕像、父子与健康等例子说明同一对象可有多种说明。II.7 才讨论自然学如何综合使用。",
    englishContext:
      "Physics II.3, after saying natural inquiry must answer why, lists material, formal, originating, and final aitiai, using statues, parenthood, and health to show that one thing admits several explanations. II.7 later discusses how natural science combines them.",
    distinction:
      "四因不是每个事件必有四个独立实体，也不等同现代“原因”一词的单一因果机制；目的因尤其不能未经证据就把有意设计投射到所有自然过程。",
    englishDistinction:
      "The four causes are not four separate entities required for every event, nor four versions of modern efficient causation. Final explanation especially cannot project conscious design onto every natural process without argument.",
  },
  "aristotle-potentiality-actuality": {
    context:
      "《形而上学》IX.6 在前几章分析能力后，用赫尔墨斯像在木材中、半线在整线中以及清醒相对睡眠等例子阐明现实性。定义刻意诉诸类比，后文才论证现实性在定义、时间与实体上优先。",
    englishContext:
      "Metaphysics IX.6 follows chapters on capacity with examples: Hermes in the wood, a half-line in a whole, waking in relation to sleeping. Aristotle explains actuality by analogy before arguing that it is prior in account, time, and substance.",
    distinction:
      "潜能不是任何可想象未来；木块成为雕像还需材料结构、技艺与条件。把“潜能”当作已实现成就，会抹掉转化所需的因果与实践。",
    englishDistinction:
      "Potentiality is not any imaginable future. Wood's becoming a statue depends on its structure, craft, and enabling conditions; treating potential as an accomplished achievement erases the work and causes of realization.",
  },
  "aristotle-substance-and-form": {
    context:
      "《形而上学》VII.17 重新问“为什么这些质料是某一事物”，以音节为何不只是字母堆为例，把所求原因指向使质料成为统一整体的形式。此处是实体研究的收束，不是说质料可以被忽略。",
    englishContext:
      "Metaphysics VII.17 reframes the question as why these materials are one definite thing, using a syllable that is more than a heap of letters. The sought cause is the form unifying matter. This closes the inquiry into substance without making matter dispensable.",
    distinction:
      "形式不是附着在材料上的可见外形，也不必是与对象分离的柏拉图式实体；它回答组成部分为何以这种组织成为此物。",
    englishDistinction:
      "Form is neither merely a visible shape attached to materials nor necessarily a Platonic entity separate from the object. It answers why components organized in this way constitute this thing.",
  },
  "aristotle-noncontradiction": {
    context:
      "《形而上学》IV.3 在寻找一切论证都预设的最确定原则时给出不矛盾律；IV.4 说明它无法用不循环的直接证明，却可反驳要求否定者，只要对方说出具有确定意义的话。",
    englishContext:
      "Metaphysics IV.3 identifies noncontradiction as the firmest principle presupposed by demonstration. IV.4 says it cannot receive a noncircular direct proof but can be defended by refutation once an opponent says something with determinate meaning.",
    distinction:
      "“同时、同一主体、同一方面”缺一不可；性质随时间改变、词语有歧义或不同观点描述不同方面，都不自动构成逻辑矛盾。",
    englishDistinction:
      "At the same time, of the same subject, and in the same respect are indispensable qualifications. Change over time, ambiguity, or claims about different aspects do not automatically form a contradiction.",
  },
  "aristotle-soul-as-form": {
    context:
      "《论灵魂》II.1 从自然物是质料与形式的复合体出发，把有生命身体的灵魂界定为第一现实性，像视力之于眼、斧的切割能力之于斧。后文再区分营养、感觉、运动与思维能力。",
    englishContext:
      "De Anima II.1 begins from natural things as matter-form compounds and defines soul as the first actuality of a potentially living body, as sight is to an eye or cutting capacity to an axe. Later chapters distinguish nutrition, perception, locomotion, and thought.",
    distinction:
      "灵魂作为形式不是身体里的一件幽灵物，也不表示生命可还原为外观；它是身体成为实际活物的组织与能力。关于理智是否可分离是 III 卷另有争议的问题。",
    englishDistinction:
      "Soul as form is not a ghostly item inside the body, nor does it reduce life to outward shape. It is the organization and capacities by which a body is actually alive; the separability of intellect is a later, disputed question.",
  },
  "aristotle-perception-without-matter": {
    context:
      "《论灵魂》II.12 在分别讨论五感后给出感觉的一般说明：感官接受可感形式而不接受质料，蜡受印而不变成金铁。随后区分感官作为比例结构与感官器官受过强刺激而损坏。",
    englishContext:
      "De Anima II.12 concludes the treatment of the five senses with a general account: sense receives sensible form without matter, as wax receives a seal without becoming gold or iron. Aristotle then treats the sense as a ratio and explains damage from excessive stimulation.",
    distinction:
      "蜡印比喻不说知觉者完全被动、所得表象必精确复制对象，也不是现代信息编码理论；它只标示对象性质被感受而其材料不进入器官。",
    englishDistinction:
      "The wax image neither makes perceivers wholly passive nor guarantees an exact inner copy, and it is not a modern theory of information coding. It marks reception of a sensible feature without transfer of the object's matter.",
  },
  "aristotle-words-and-affections": {
    context:
      "《解释篇》开头先区分书写记号、语音、心灵所受与外物：文字和声音因共同体而异，心灵经验及其所似之物被说成共同。随后才区分名词、动词与能真假的陈述。",
    englishContext:
      "On Interpretation 1 opens by relating written marks, vocal sounds, affections of the soul, and things. Scripts and sounds differ among communities, while mental affections and what they resemble are said to be shared. Aristotle then distinguishes nouns, verbs, and truth-evaluable statements.",
    distinction:
      "层级关系不证明所有文化拥有完全相同概念，也不使词语只是透明标签；“心灵经验相同”与语言如何切分世界之间仍需论证，现代语言相对性不能由这几句直接裁决。",
    englishDistinction:
      "The sequence does not prove that every culture has identical concepts or that words are transparent labels. How shared experience relates to different linguistic segmentations remains an argument, not a question settled here against modern linguistic relativity.",
  },
  epicurus: {
    context:
      "《主要学说》21 紧接对肉体快乐界限与时间长短的讨论，指出理解生命界限的人很容易取得消除匮乏之痛所需之物，因而不必追逐无尽竞争。下一条转向身体与心灵之善如何互相维持。",
    englishContext:
      "Principal Doctrine 21 follows claims about the limit of bodily pleasure and the length of time. One who understands life's limits can readily obtain what removes the pain of need and therefore need not enter endless competition; the next doctrine relates bodily and mental goods.",
    distinction:
      "“容易取得”以基本需要、友谊与安全已有条件为背景，不是对贫困、疾病或压迫者说匮乏纯属想象；限制欲望与消除现实剥夺必须同时区分。",
    englishDistinction:
      "'Easy to procure' assumes conditions in which basic needs, friendship, and safety are possible. It must not tell people facing poverty, illness, or oppression that deprivation is imaginary; limiting desire and remedying real deprivation are distinct tasks.",
  },
  "epicurus-death": {
    context:
      "《致美诺伊克斯书》124–126 先要求对神与死亡形成正确观念，再以一切善恶都在感觉中、死亡是感觉的消失推进。引句之后又批评既惧怕死亡到来、又把死亡当作逃避人生痛苦的人。",
    englishContext:
      "Letter to Menoeceus 124–126 moves from correct beliefs about gods and death to the premise that good and bad depend on sensation and death is the loss of sensation. It then criticizes both fear of death's arrival and the wish to use death as escape from life.",
    distinction:
      "“死亡对我们算不得什么”针对死亡状态本身，不是否认临终痛苦、丧亲悲伤或生命受威胁的现实；也不能把论证变成阻止医疗、哀悼或安全行动的命令。",
    englishDistinction:
      "Death being nothing to us concerns the state of being dead, not pain in dying, grief for another, or real threats to life. It cannot forbid medical care, mourning, or action for safety.",
  },
  "epicurus-friendship": {
    context:
      "《主要学说》27 位于一组关于欲望、自然研究与安宁资源的格言之后，把友谊称为智慧为整个人生幸福准备的最大保障。相邻第28条又把朋友带来的安全与最初形成友谊的信心相连。",
    englishContext:
      "Principal Doctrine 27 follows maxims on desire, natural inquiry, and resources for tranquility, calling friendship wisdom's greatest provision for a whole life. Doctrine 28 then connects security among friends with the confidence through which friendship first arose.",
    distinction:
      "把友谊列为幸福资源不等于把朋友工具化为保险；伊壁鸠鲁传统正把可信赖的共同生活视为内在可珍视之物，互助与情感价值不能由“有用”一词抹平。",
    englishDistinction:
      "Calling friendship a provision does not reduce a friend to insurance. Epicurean communal life treats reliable companionship as worth valuing in itself; usefulness cannot erase reciprocity and affection.",
  },
  "epicurus-pleasure-and-sober-reason": {
    context:
      "《致美诺伊克斯书》131–132 在赞美自足与简单食物后澄清“快乐为目的”并非纵欲：身体无痛、心灵无扰需由清醒推理审查每次选择、回避及其后果。卡片省略了饮宴、性享乐与鱼肉等反例。",
    englishContext:
      "Letter to Menoeceus 131–132, after praising self-sufficiency and simple food, clarifies that pleasure as the end is not dissipation. Bodily freedom from pain and mental tranquility require sober reasoning about each choice, avoidance, and consequence; the card omits the intervening catalogue of indulgences.",
    distinction:
      "无痛无扰不是麻木、持续刺激或逃避所有困难；审慎可能要求承受短期痛苦以避免更大扰乱。引句也未把疾病、创伤等痛苦归为错误信念。",
    englishDistinction:
      "Freedom from pain and disturbance is not numbness, continuous stimulation, or avoidance of every difficulty. Prudence may accept short pain to prevent greater turmoil, and the passage does not reduce illness or trauma to false belief.",
  },
  "epicurus-limit-of-pleasure": {
    context:
      "卡片并接《主要学说》3 与18：第3条把快乐的量之极限定为痛苦全消，第18条再说匮乏消除后肉体快乐只有变化而不再增加。二者同属反对欲望无限递增的论证，却不是连续一句。",
    englishContext:
      "The card joins Principal Doctrines 3 and 18. Doctrine 3 locates pleasure's quantitative limit in the removal of pain; Doctrine 18 says that once need is removed bodily pleasure varies rather than increases. They support one argument against indefinite escalation but are not one continuous sentence.",
    distinction:
      "达到界限不表示此后所有体验质感相同，也不否定艺术、友谊或口味差异；“不再增加”区分快乐的充分与花样变化，而非要求生活单调。",
    englishDistinction:
      "Reaching a limit does not make every later experience qualitatively identical or deny art, friendship, and differences of taste. No further increase distinguishes sufficiency from variation; it does not prescribe monotony.",
  },
  "epicurus-desires-classified": {
    context:
      "《致美诺伊克斯书》127 在死亡论后转入生活选择，把欲望分为无根据、自然但非必要、自然且必要，并在必要欲望内再分幸福、身体无扰和生存所需。下一段用这一分类解释为何每次选择要比较后果。",
    englishContext:
      "Letter to Menoeceus 127 turns from death to choice in life, dividing desires into groundless, natural but unnecessary, and natural and necessary, with the last subdivided by happiness, bodily ease, and survival. The next paragraph uses this classification to compare consequences.",
    distinction:
      "分类不是固定购物清单，也不能由别人替一个人宣布哪些需求“虚妄”；文化、身体状况与依赖关系会改变具体内容，但欲望是否有终点、满足后是否减扰仍可检验。",
    englishDistinction:
      "The taxonomy is not a fixed shopping list, nor a license for others to declare someone's needs vain. Culture, embodiment, and dependence alter particulars, while whether a desire has a limit and actually reduces disturbance remains testable.",
  },
  "epicurus-simple-food": {
    context:
      "《致美诺伊克斯书》130–131 先说习惯简单生活能带来健康、行动准备与对命运变化的从容，才以饥者面前的面包水说明匮乏消除后的充分快乐。后面随即排除把这一点误读为纵欲。",
    englishContext:
      "Letter to Menoeceus 130–131 first says simple living supports health, readiness, and fearlessness before fortune's changes, then uses bread and water before a hungry person to show pleasure made sufficient by removing need. The text immediately guards against a hedonist misreading.",
    distinction:
      "朴素食物的满足不意味着营养质量、疾病需求或饮食文化无关紧要，也不是为他人提供最低生活标准的借口；自愿的自足训练与被迫匮乏不是同一状态。",
    englishDistinction:
      "Satisfaction from plain food does not make nutrition, illness, or food culture irrelevant, and it cannot excuse imposing subsistence on others. Voluntary training in sufficiency is not the same condition as forced deprivation.",
  },
  "epicurus-gods-without-fear": {
    context:
      "《主要学说》1 以神的幸福与不朽为前提，否认神会被愤怒、偏爱和惩罚性事务扰动。它呼应《致美诺伊克斯书》要求保留神的共同观念，却清除民间投射，为消除天谴恐惧奠基。",
    englishContext:
      "Principal Doctrine 1 begins from divine blessedness and imperishability to deny gods anger, favoritism, and punitive disturbance. It matches the Letter to Menoeceus' demand to retain the common conception of gods while removing popular projections, thereby dissolving fear of divine punishment.",
    distinction:
      "这不是简单无神论，也未证明宇宙具有道德照护；论证保留神却把神移出奖惩世界。它更不能用来否认宗教信徒的一切经验，只限定何种属性与完满相容。",
    englishDistinction:
      "This is not straightforward atheism and does not establish providential care. It retains gods while removing them from reward and punishment, limiting which attributes fit blessedness rather than dismissing every religious experience.",
  },
  "epicurus-agency-and-necessity": {
    context:
      "《致美诺伊克斯书》133 批评把一切交给神话命运或自然哲学家的必然性，提出必然、偶然与“由我们”三类来源，以保住劝告、赞责的意义。引句处于对“像神一样生活”的智者形象之前。",
    englishContext:
      "Letter to Menoeceus 133 rejects both mythic fate and the natural philosophers' universal necessity. It distinguishes necessity, chance, and what proceeds through us so that counsel, praise, and blame retain a point, just before portraying the wise person who lives like a god among mortals.",
    distinction:
      "“由我们”没有说明一种脱离因果的现代自由意志，也不使所有结果都可归责个人；行为能力会受身体、社会和偶然条件限制，赞责必须跟随实际控制程度。",
    englishDistinction:
      "'Through our own agency' does not define a modern uncaused free will or make individuals responsible for every outcome. Bodily, social, and accidental conditions constrain agency, so responsibility must track actual control.",
  },
  "epicurus-justice-mutual-advantage": {
    context:
      "《主要学说》31 开启关于正义的十条格言，把自然正义描述为互不伤害的有用约定；第32–33条随即说不能订约的动物无此正义，而正义不是脱离交往的自在实体。",
    englishContext:
      "Principal Doctrine 31 opens ten maxims on justice by describing natural justice as a useful compact neither to harm nor be harmed. Doctrines 32–33 add that beings unable to make compacts do not stand in this relation and that justice is not an independent entity apart from association.",
    distinction:
      "互利约定不等于强者之间合谋便正义，也不能排除无法谈判者的道德地位；若“有用”只按有权者收益计算，已经背离互不伤害的双向条件。",
    englishDistinction:
      "Mutual advantage does not make a pact among the powerful just or erase the moral status of those unable to bargain. If usefulness is counted only from the advantaged party's gain, the bilateral condition of nonharm has already been abandoned.",
  },
  "epicurus-justice-can-change": {
    context:
      "卡片节选《主要学说》37：法律只要在共同交往中仍证明有用，就具有正义；若条件改变使其不再互利，即便文字未变也失去正义性。第36条先说一般正义相同、具体适用因地方而异。",
    englishContext:
      "The card excerpts Principal Doctrine 37: a law is just while it proves useful in mutual association, but loses that status when changed conditions make it unsuitable even if its wording remains. Doctrine 36 has distinguished a common character of justice from local applications.",
    distinction:
      "可变性不是“只要不方便就可违法”，也不使正义等于即时多数偏好；判断需说明共同需要怎样改变、谁受伤害，并区分法律效力与道德正当性。",
    englishDistinction:
      "Changeability does not mean any inconvenient law may be ignored or justice equals current majority preference. One must show how common needs changed, who is harmed, and distinguish legal validity from moral justification.",
  },
  "epicurus-pleasures-have-consequences": {
    context:
      "《主要学说》8 紧接“某些身体快乐若不带来恐惧便不会受责难”的反事实，再声明快乐本身不是恶，但获得某些快乐会引出更大烦恼。它为《致美诺伊克斯书》的选择计算提供简式。",
    englishContext:
      "Principal Doctrine 8 follows a counterfactual about bodily pleasures that would be unobjectionable if they brought no fears or limits. It says pleasure itself is not evil while some means of obtaining it generate greater trouble, anticipating the Letter's calculus of choice.",
    distinction:
      "后果衡量不是只算个人即时感受；成瘾、他人受害、风险延迟和选择能力受损都属于“更大烦恼”。也不能反过来把任何有风险的快乐都宣布为恶。",
    englishDistinction:
      "Consequences include more than an individual's immediate feeling: addiction, harm to others, delayed risk, and impaired agency may be the greater trouble. Conversely, the maxim does not make every risky pleasure evil.",
  },
  "epicurus-prudence-greater-gift": {
    context:
      "《致美诺伊克斯书》132 在澄清快乐需要清醒推理后，把审慎称为开端与最大善，因为它使快乐、荣誉、正义与其他德性相互依存。此处不是降低哲学，而是让生活判断成为哲学能否落地的检验。",
    englishContext:
      "Letter to Menoeceus 132, after making sober reasoning central to pleasure, calls prudence the beginning and greatest good because it makes pleasure, honor, justice, and the virtues interdependent. It does not belittle philosophy but tests whether philosophy can guide a life.",
    distinction:
      "审慎不是精于自利计算或永远规避风险；它判断整个生活的安宁，包括友谊和正义。若手段伤害共同生活，短期收益不能冒充伊壁鸠鲁式明智。",
    englishDistinction:
      "Prudence is not clever self-interest or permanent risk avoidance. It judges tranquility across a whole life, including friendship and justice; short gain that damages shared life cannot pass as Epicurean wisdom.",
  },
  "epicurus-wealth-has-a-limit": {
    context:
      "《主要学说》15 把自然所需的财富与空洞意见所求财富对置：前者有界且可得，后者因名望、比较和安全幻想不断后退。它接在安全生活的讨论之后，下一条则论偶然财富与理性。",
    englishContext:
      "Principal Doctrine 15 contrasts wealth required by nature, bounded and obtainable, with wealth demanded by empty opinion, which recedes through status, comparison, and fantasies of security. It follows discussion of safety and precedes a maxim on fortune and reason.",
    distinction:
      "欲望有界不等于现实资源分配已经足够，也不要求所有人接受同一贫困线；它诊断的是目标随拥有量自动膨胀，而非否认住房、照护与教育的实质成本。",
    englishDistinction:
      "Bounded desire does not mean resources are already justly distributed or that everyone must accept one poverty line. The target is a goal that expands automatically with possession, not the real costs of housing, care, and education.",
  },
  "epicurus-security-and-quiet": {
    context:
      "《主要学说》14 在说明外部威胁可暂由力量与繁荣抵御后，把最真切安全转向远离人群竞争的宁静生活。第6–7条已警告以权势、名声求安全可能反而增加对他人的恐惧。",
    englishContext:
      "Principal Doctrine 14 concedes that power and material resources can provide tolerable protection, then locates the most genuine security in a quiet life withdrawn from competitive crowds. Doctrines 6–7 have warned that status-seeking may intensify fear of others.",
    distinction:
      "退隐不是人人可行的政治方案，也不等于对公共不义保持沉默；它是降低依赖与暴露的个人策略。制度安全和集体行动仍可能是安宁的必要条件。",
    englishDistinction:
      "Withdrawal is not a political program available to everyone or a command to stay silent before public injustice. It is a personal strategy for reducing dependence and exposure; institutional security and collective action may still be necessary for tranquility.",
  },
  "epicurus-nature-dispels-fear": {
    context:
      "《主要学说》11 说若天象、死亡以及痛苦欲望的界限从未使人恐惧，便无需自然研究；第12条随即说不了解整体自然就不能消除神话恐惧。科学在这里承担治疗错误宇宙观的功能。",
    englishContext:
      "Principal Doctrine 11 says natural inquiry would be unnecessary if celestial events, death, and the limits of pain and desire never frightened us. Doctrine 12 adds that mythical fear cannot be removed without understanding the nature of the whole. Science here treats a disordered worldview.",
    distinction:
      "研究自然不保证情绪恐惧自动消失，也不能把所有焦虑归为无知；伊壁鸠鲁要求可信因果说明解除天谴想象，现代心理与社会性恐惧还需别种证据和支持。",
    englishDistinction:
      "Natural explanation does not automatically remove emotion or reduce every anxiety to ignorance. Epicurus targets imagined divine punishment with credible causes; modern psychological and social fears require other evidence and support as well.",
  },
  "epicurus-future-not-owned": {
    context:
      "《致美诺伊克斯书》127 在欲望分类之前插入对未来的双重限定：未来并非完全由我们支配，却也并非与行动无关。它把死亡论后的安宁转成实际选择，避免确定论与绝望两端。",
    englishContext:
      "Letter to Menoeceus 127, just before classifying desires, gives a double qualification: the future is neither wholly under our control nor wholly unrelated to action. It turns tranquility after the death argument into practical choice without fatalism or despair.",
    distinction:
      "不确定性不是拒绝计划、证据与预防；正因未来部分受行动影响，审慎仍需准备。句子排除的是把预测当保证，或把不可保证误作毫无能动性。",
    englishDistinction:
      "Uncertainty is not a reason to reject planning, evidence, or prevention. Because action partly affects the future, prudence still prepares; the sentence rejects treating prediction as guarantee or uncertainty as total powerlessness.",
  },
  seneca: {
    context:
      "《致鲁基里乌斯书信》第一封开篇即催促收回被夺走、偷走或自行滑失的时间，随后区分可追回财物与永不归还的时间，并要求每日核账。它是整部书信的实践纲领，不是一条抽象效率建议。",
    englishContext:
      "Moral Letter 1 opens by urging Lucilius to reclaim time taken, stolen, or allowed to slip away. Seneca then contrasts recoverable property with irretrievable time and asks for a daily account. This is a program for the correspondence, not an abstract productivity tip.",
    distinction:
      "收回时间不是把每分钟都货币化或责备被照护、劳动制度占用的人；重点是看见有限生命如何被无意识让渡，并把可支配部分交给值得的生活。",
    englishDistinction:
      "Reclaiming time does not monetize every minute or blame people whose time is constrained by care and labor. It makes visible how finite life is surrendered unreflectively and redirects what is genuinely disposable toward worthy activity.",
  },
  "seneca-anticipation": {
    context:
      "《书信》13 先劝鲁基里乌斯不要因身体与命运的旧伤预先失去勇气，再区分现实痛苦、谣传与猜想。卡片并接第4–5节：恐惧常多于实际打击，且折磨可能过量、过早或全无对象。",
    englishContext:
      "Letter 13 first tells Lucilius not to lose courage in advance because of prior bodily and circumstantial blows, then separates actual suffering, report, and conjecture. The card joins §§4–5: fear often exceeds impact and torment may be excessive, premature, or groundless.",
    distinction:
      "想象会放大恐惧，不表示危险评估皆属错误或痛苦只需“想开”；理性准备应核查概率与应对方案，而非压抑预警、羞辱焦虑者。",
    englishDistinction:
      "Imagination can amplify fear without making every risk assessment false or every pain curable by attitude. Rational preparation checks probability and response rather than suppressing warnings or shaming anxiety.",
  },
  "seneca-anger": {
    context:
      "《论愤怒》I.18 回答“愤怒是否有助于惩罚”的辩护；塞涅卡把理性审判写成允许双方陈述并延期查明真相，把愤怒写成急于定案且只求显得公正。相邻章节主张惩戒可坚定却不必愤怒。",
    englishContext:
      "On Anger I.18 answers the defense that anger assists punishment. Seneca depicts reason hearing both sides and delaying for truth, while anger rushes to judgment and wants only to seem just. Neighboring chapters argue that correction may be firm without anger.",
    distinction:
      "区分愤怒与公正判断不等于禁止受害者表达情绪，也不保证冷静者没有偏见；制度仍需证据、申诉与权力约束，语气平稳不能替代这些条件。",
    englishDistinction:
      "Distinguishing anger from judgment does not forbid victims' emotion or guarantee that calm people are unbiased. Evidence, appeal, and checks on power remain necessary; a composed tone cannot substitute for them.",
  },
  "seneca-slavery": {
    context:
      "《书信》47 回应鲁基里乌斯善待奴隶的消息，先批评主人把奴隶当牲畜，再提醒命运随时可倒转主奴身份。第10节以共同出生、天空、呼吸与死亡论证人性平等，随后建议以朋友相待。",
    englishContext:
      "Letter 47 responds to Lucilius' humane treatment of enslaved people, condemns masters who treat them like animals, and recalls fortune's power to reverse status. Section 10 invokes common origin, sky, breath, life, and death before urging treatment as friends.",
    distinction:
      "承认共同人性仍未明确要求废除奴隶制度，文本的道德突破与制度局限必须并见；善待被支配者不能替代解除支配关系和恢复权利。",
    englishDistinction:
      "Recognition of common humanity does not yet explicitly abolish slavery. The moral advance and institutional limit must both remain visible: humane treatment cannot replace ending domination and restoring rights.",
  },
  "seneca-friendship": {
    context:
      "《书信》9 与伊壁鸠鲁“智者自足却仍需要朋友”争论。塞涅卡承认智者可没有朋友而幸福，却说他仍主动结交朋友，为的是有可为之牺牲的人，而非生病时有人照护的交易。",
    englishContext:
      "Letter 9 debates the Epicurean claim that a wise person is self-sufficient yet still needs friends. Seneca grants that the sage can remain happy without one but still forms friendships to have someone for whom to sacrifice, not a transactional caretaker in illness.",
    distinction:
      "反对功利交易不要求无边界自我牺牲，也不把赴死戏剧化当作友谊标准；日常互惠、尊重自主与拒绝伤害同样是为朋友而行动。",
    englishDistinction:
      "Rejecting transactional friendship does not require limitless self-sacrifice or make dramatic willingness to die its test. Everyday reciprocity, respect for autonomy, and refusal of harm are also ways of acting for a friend.",
  },
  epictetus: {
    context:
      "《手册》5 紧接身体、财产、名誉不由我支配的区分，把不安定位于对事件的判断，并用苏格拉底面对死亡作例。后半节要求受阻时先审查自己的意见，而非马上归咎他人。",
    englishContext:
      "Enchiridion 5 follows the distinction between what depends on us and externals such as body, property, and reputation. It locates disturbance in judgment and invokes Socrates on death; the rest of the section asks one to examine opinion before blaming others.",
    distinction:
      "判断会影响痛苦，不表示暴力、疾病或丧失本身无害，更不能用来责备受害者选择受苦；斯多葛训练针对可调整的同意，不取消外部因果与救助责任。",
    englishDistinction:
      "Judgment affects distress without making violence, illness, or loss harmless, and the line must not blame victims for choosing suffering. Stoic training addresses revisable assent; it does not cancel external causation or duties of aid.",
  },
  "epictetus-control": {
    context:
      "《手册》1 以全书最基本的二分开篇：意见、冲动、欲望、厌避与自身行动“由我”，身体、财产、名声和职务“不由我”。随后把前者称为自由、后者易受阻，并要求不要混淆两类。",
    englishContext:
      "Enchiridion 1 opens with its governing distinction: opinion, impulse, desire, aversion, and one's own actions depend on us, whereas body, property, reputation, and office do not. It then calls the first free and the second vulnerable to hindrance and warns against confusing them.",
    distinction:
      "“由我”不是结果控制表，也不说身体完全不受行动影响；它标出判断与意向的责任中心。合理计划会影响外部概率，却不能把影响误称为保证。",
    englishDistinction:
      "What depends on us is not a list of guaranteed outcomes, nor does it say action never affects the body. It marks a center of responsibility in judgment and intention; planning changes probabilities without becoming control of results.",
  },
  "epictetus-freedom-of-desire": {
    context:
      "《论说集》IV.1“论自由”先否定身份、财富和获释奴隶自动带来自由，再通过问答说明欲求取决于他人的事物必会受阻。后文把自由转向训练欲望与顺应宇宙秩序。",
    englishContext:
      "Discourses IV.1, 'On Freedom,' denies that status, wealth, or manumission automatically makes one free. Its questions show that desire fixed on what others control is vulnerable to obstruction; later the chapter turns freedom toward trained desire and alignment with cosmic order.",
    distinction:
      "内在不受阻不能替代公民自由，也不使奴役与压迫无关紧要；一个人可在逆境中保持判断能力，同时仍有充分理由改变不正义制度。",
    englishDistinction:
      "Inner unimpededness cannot replace civil liberty or make slavery and oppression unimportant. A person may retain judgment under adversity while still having decisive reason to change unjust institutions.",
  },
  "epictetus-train-desire-first": {
    context:
      "《手册》2 区分欲望求得到、厌避求避开，并警告初学者若厌避疾病死亡必受挫。于是暂缓欲望，把厌避限于自身错误行动；这是一项“目前”的入门操练，不是永久消灭所有愿望。",
    englishContext:
      "Enchiridion 2 distinguishes desire, which seeks attainment, from aversion, which seeks escape, and warns beginners that aversion to illness or death will be frustrated. It therefore suspends desire for the present and confines aversion to one's own wrongdoing—an initial exercise, not permanent desirelessness.",
    distinction:
      "暂停欲望不是抑郁、情感麻木或对需要不闻不问；其目的是先解除对不可保证结果的依附，再形成有训练的价值取向。",
    englishDistinction:
      "Suspending desire is not depression, emotional numbness, or neglect of need. It first loosens attachment to unguaranteed outcomes so that a trained orientation toward value can later develop.",
  },
  "epictetus-wish-events-as-they-are": {
    context:
      "《手册》8 在克制对亲人、器物的占有判断之后，要求愿事件“如其发生”而非强令现实服从愿望。它把第一节控制二分压缩成日常态度，后续章节仍教人预想行动障碍并履行角色。",
    englishContext:
      "Enchiridion 8 follows exercises against possessive judgments about people and objects and asks one to will events as they occur rather than command reality to match preference. It condenses the opening dichotomy; later sections still advise anticipating obstacles and fulfilling roles.",
    distinction:
      "接受已经发生的事实不等于事前放弃预防、事后认可不义或停止改变未来；它拒绝与不可逆现实徒耗判断，而行动责任仍面向下一步。",
    englishDistinction:
      "Accepting an accomplished fact does not mean abandoning prevention, endorsing injustice, or ceasing to alter the future. It refuses futile denial of what is irreversible while responsibility remains directed toward the next action.",
  },
  "epictetus-return-what-was-given": {
    context:
      "《手册》11 把孩子、伴侣和财产的丧失重述为“归还”，随后说即使被恶人夺走，分配者借谁收回并非我的事务。它延续人生如暂借之物的斯多葛练习，措辞刻意严厉。",
    englishContext:
      "Enchiridion 11 redescribes the death of child or spouse and loss of estate as restoration, adding that the giver's choice of an unjust agent to reclaim something is not one's concern. It extends the Stoic exercise of life as a temporary loan in deliberately severe language.",
    distinction:
      "“归还”不能取消亲情、哀悼或追究非法剥夺，也不应对悲痛者作冷酷训诫；它只挑战永久占有的幻想，无法单独决定法律与照护回应。",
    englishDistinction:
      "'Restored' cannot cancel attachment, mourning, or redress for unlawful taking and should not be wielded as a cruel rebuke to grief. It challenges fantasies of permanent possession without deciding legal or caring responses.",
  },
  "epictetus-price-of-tranquility": {
    context:
      "《手册》12 劝初学者宁可让仆人、邻人占一点便宜，也不要为了油酒小损失陷入持续纷扰；紧接着说若想让孩子、朋友永不犯错，就是想控制不由我的事。",
    englishContext:
      "Enchiridion 12 advises a beginner to tolerate a servant's or neighbor's small advantage rather than buy prolonged disturbance over spilled oil or stolen wine. It then says wishing children or friends never to err is wishing control over what is not one's own.",
    distinction:
      "为安宁放过小损失不是纵容反复侵害、财务虐待或公共腐败；“价格”必须与伤害规模和对他人影响相称，设立边界也可是不被纷扰奴役的行动。",
    englishDistinction:
      "Letting go of a small loss does not excuse repeated abuse, financial coercion, or public corruption. The price must be proportionate to harm and effects on others; setting a boundary may itself express freedom from disturbance.",
  },
  "epictetus-banquet-metaphor": {
    context:
      "《手册》15 以宴席传菜比喻财物、职位、伴侣等人生际遇：来到面前才适度取用，经过便不扣留，未到不伸长欲望。末句更激进地说能不取者将与诸神同席。",
    englishContext:
      "Enchiridion 15 compares life's goods—property, office, and relationships—to dishes circulated at a banquet: take modestly when offered, do not detain what passes, and do not reach desire ahead. Its final sentence praises the person able even to decline the dish.",
    distinction:
      "宴席礼仪不是要求弱势者安于不公分配，也不把亲人当可替换菜肴；比喻针对抓取与占有心态，社会资源是否公平仍须另作制度判断。",
    englishDistinction:
      "Banquet manners do not require disadvantaged people to accept unjust distribution or reduce loved ones to replaceable dishes. The image targets grasping possession; institutional fairness of resources remains a separate judgment.",
  },
  "epictetus-actor-and-role": {
    context:
      "《手册》17 用戏剧角色说明身世、贫富、官职或残疾的许多条件由“作者”分配，而行动者负责把既定角色演好。省略处列出长短剧、乞丐、官员和平民等不同安排。",
    englishContext:
      "Enchiridion 17 uses theatrical roles for conditions such as birth, wealth, office, or disability. The author assigns a long or short play and roles including beggar, official, or private person; the actor is responsible for performing the given part well.",
    distinction:
      "角色责任不等于社会身份不可改变、上位者就是神圣作者，也不要求演好受虐者角色；能动性包括判断某种制度脚本是否本身不义并采取可控行动。",
    englishDistinction:
      "Responsibility for a role does not make social identity immutable, rulers divine authors, or abuse a part to perform obediently. Agency can include judging an institutional script unjust and taking available action against it.",
  },
  "epictetus-duties-from-relations": {
    context:
      "《手册》30 从“他是父亲、兄弟、邻人或公民”推导相应义务，并以兄弟不义为例要求先看自己要守住的关系角色。卡片省略父亲责骂殴打也仍须考虑子女义务的尖锐例子。",
    englishContext:
      "Enchiridion 30 derives duties from being child, sibling, neighbor, or citizen and asks, in the case of an unjust brother, what one's own relational role requires. The card omits the severe example of a father who reviles or strikes yet remains a father.",
    distinction:
      "关系能产生理由，却不是无限义务；虐待会改变安全、接触和救济要求。判断“我的角色”必须同时看权力、伤害与双方义务，不能只要求较弱者维系关系。",
    englishDistinction:
      "Relations generate reasons but not limitless duties; abuse changes requirements of safety, contact, and remedy. One's role must be judged with power, harm, and reciprocal obligation, not used only to burden the weaker party.",
  },
  "epictetus-two-handles": {
    context:
      "《手册》43 以兄弟行不义为唯一例子：若只抓“不义”这一把手，事件不可承受；若抓共同成长与兄弟关系，便找到可承担的角度。省略号移除了从一个把手转向另一个的过渡。",
    englishContext:
      "Enchiridion 43 gives one example: a brother acts unjustly. Grasping only the injustice makes the event unbearable; grasping shared upbringing and kinship offers another way to carry it. The ellipsis removes the transition between the two handles.",
    distinction:
      "重构角度不应否认不义事实或迫使和解；可承受的把手也可能是清晰边界、第三方支持或依法处理，而不是只强调亲情。",
    englishDistinction:
      "Reframing must not deny the injustice or compel reconciliation. A bearable handle may be a clear boundary, outside support, or legal response rather than emphasis on kinship alone.",
  },
  "epictetus-practice-not-display": {
    context:
      "《手册》46 警告初学者不要自称哲学家或向未受训练者炫耀学说，以羊不展示草而产出羊毛乳汁作比。卡片省略这则比喻，把重点保留在理论经消化后以行为显现。",
    englishContext:
      "Enchiridion 46 warns beginners not to call themselves philosophers or display doctrines to the untrained, comparing a sheep that does not show its fodder but produces wool and milk. The card omits that image and retains practice as the sign of digested theory.",
    distinction:
      "行动验证不表示理论论证无用、沉默总比公开教学好；若实践不接受批评，也可能只是自信表演。言行一致与理由可检验必须共同成立。",
    englishDistinction:
      "Testing doctrine in action does not make argument useless or silence always superior to teaching. Practice insulated from criticism can be another performance; coherence of word and deed must accompany answerable reasons.",
  },
  "epictetus-delay-assent": {
    context:
      "《论说集》II.18 讨论怎样同表象搏斗：旧习惯靠反复同意增强，新的相反习惯也须操练。引句要求强烈表象先等待、接受身份与目的检查，随后建议计算屈服后今日与明日的后果。",
    englishContext:
      "Discourses II.18 asks how to struggle with impressions: old habits strengthen through repeated assent, and contrary habits need practice. The excerpt tells a rapid appearance to wait for examination of what it is doing, then recommends comparing the consequences of yielding today and tomorrow.",
    distinction:
      "延迟同意不是无限拖延、怀疑所有直觉或在紧急危险中停摆；等待时间应随风险与可逆性调整，训练目标是把判断从自动反应中分离。",
    englishDistinction:
      "Delaying assent is not endless indecision, suspicion of every intuition, or paralysis in urgent danger. The interval should fit risk and reversibility; its aim is to separate judgment from automatic reaction.",
  },
  "epictetus-citizen-of-cosmos": {
    context:
      "《论说集》II.10“怎样从名称发现义务”先称人是宇宙中的主要部分，能理解神圣治理与万物联系，再转到儿子、兄弟、议员等具体身份。世界公民身份为较窄关系提供更大尺度。",
    englishContext:
      "Discourses II.10, 'How duties are discovered from names,' first calls a human a principal part of the cosmos, capable of comprehending divine administration and connections, then turns to concrete identities such as child, sibling, and councillor. Cosmopolitan membership frames narrower roles.",
    distinction:
      "宇宙公民不是一本全球护照，也不抹去地方义务与政治边界；它提出所有人处于共同整体的伦理视角，具体权利制度仍需另行建构。",
    englishDistinction:
      "Cosmic citizenship is not a global passport and does not erase local duties or political boundaries. It offers an ethical standpoint of membership in one whole; concrete institutions of rights still have to be built.",
  },
  "epictetus-learning-needs-perplexity": {
    context:
      "《论说集》II.17 从人们都使用好坏、有利有害等预概念却在应用上争执出发，指出自负使学习无法开始。哲学工作的入口是发现自己不会把共同概念正确应用到个案。",
    englishContext:
      "Discourses II.17 begins from shared preconceptions of good and bad, advantageous and harmful, alongside conflict over their application. Conceit blocks learning; philosophy starts when one recognizes inability to apply common concepts correctly to cases.",
    distinction:
      "困惑是学习入口而非学习成果，也不要求假装对已掌握知识一无所知；可教性在于允许证据修正应用，而不是把所有判断降成同样不确定。",
    englishDistinction:
      "Perplexity is an entrance to learning, not its achievement, and does not require pretending ignorance of well-supported knowledge. Teachability permits evidence to revise application without making every judgment equally uncertain.",
  },
  "epictetus-preserve-character": {
    context:
      "《论说集》I.2 以有人宁可持夜壶、有人宁死不从的差异说明“合理”取决于一个人如何估价外物与自身品格。引句处在多个罗马政治抗命案例前，重点是行动会塑造并显示自我评价。",
    englishContext:
      "Discourses I.2 contrasts someone willing to hold a chamber pot with another who would rather die, showing that what seems reasonable depends on how externals and one's character are valued. The excerpt precedes Roman examples of political refusal and concerns self-appraisal through action.",
    distinction:
      "守住品格不使任何个人厌恶都成理性，也不能浪漫化可避免的死亡；必须检验所守原则、代价是否影响他人，以及是否存在不背叛价值的较安全选择。",
    englishDistinction:
      "Preserving character does not make every aversion rational or romanticize avoidable death. The principle at stake, costs to others, and safer alternatives compatible with integrity all require examination.",
  },
  "epictetus-philosophy-begins-in-conflict": {
    context:
      "《论说集》II.11 从所有人自信知道善恶却彼此冲突出发，把分歧的察觉、不信任单纯表象、检验表象与寻找尺度列为哲学开端。后文以称重尺量比喻需要共同判断标准。",
    englishContext:
      "Discourses II.11 begins from people confident that they know good and evil while disagreeing. It makes perceived conflict, distrust of mere appearance, testing, and discovery of a rule the start of philosophy, then compares judgment with weighing and measuring.",
    distinction:
      "有分歧不证明真理不存在，也不表示折中就是尺度；分歧揭露至少一方的应用可能有误，继而要求能公开比较理由的检验方法。",
    englishDistinction:
      "Disagreement does not show truth is absent or compromise is the standard. It reveals that at least one application may be mistaken and motivates a method by which reasons can be publicly compared.",
  },
  plotinus: {
    context:
      "《九章集》I.6.9 是“论美”结尾：在从身体之美上升到灵魂、德性与理智之美后，普罗提诺要求观看者转向自身，像雕刻家削去多余、校正线条，直至灵魂有能力观看神性之美。",
    englishContext:
      "Ennead I.6.9 closes 'On Beauty.' After ascending from bodily beauty to soul, virtue, and intelligible beauty, Plotinus tells the viewer to turn inward and work like a sculptor who removes excess and corrects lines until the soul can behold divine beauty.",
    distinction:
      "雕刻自己不是追求外貌、完美主义自我厌弃或凭意志删除创伤；比喻指向净化错误判断与无序欲望，并预设美的尺度不是个人任意制造。",
    englishDistinction:
      "Self-sculpting is not cosmetic improvement, perfectionist self-hatred, or willing trauma away. The image concerns purification of disordered judgment and desire and assumes a measure of beauty not arbitrarily invented by the self.",
  },
  "plotinus-virtue": {
    context:
      "《九章集》I.2.2 在问德性是否使人“像神”时，先区分公民德性：它为欲望和感受设定尺度、驱散误判，使现世生活有秩序。后面才论净化德性如何使灵魂进一步脱离身体支配。",
    englishContext:
      "Ennead I.2.2 asks how virtue makes one like the divine and first distinguishes civic virtues. They set measure to desire and sensibility and remove false judgment, ordering embodied life. Only afterward does Plotinus describe purificatory virtues that free soul further from bodily domination.",
    distinction:
      "德性层级不表示公共伦理只是可丢弃的低级阶段，也不许可借“净化”轻视身体或他人；即使追求沉思，节制、正义和共同生活仍是秩序基础。",
    englishDistinction:
      "A hierarchy of virtues does not make civic ethics disposable or license contempt for body and others in the name of purification. Temperance, justice, and shared life remain the basis of order even for contemplative ascent.",
  },
  "plotinus-hypostases": {
    context:
      "《九章集》V.1 追问灵魂为何忘记自身神圣来源，第10节在回顾柏拉图后列出一者、理智与灵魂三本原：多从一流出，又经灵魂回望而维持秩序。卡片省略各层如何产生下一层的论证。",
    englishContext:
      "Ennead V.1 asks why souls forget their divine source. Section 10, after reading Plato as predecessor, names the One, Intellect, and Soul: multiplicity proceeds from unity and remains ordered through return. The card omits the arguments about how each level generates the next.",
    distinction:
      "三本原不是三位空间相邻的神，也非按时间先后制造世界；“流溢”描述依存次序，一者并未因给予而减少。把它画成物理层级会误读形而上关系。",
    englishDistinction:
      "The three principles are not neighboring gods in space or temporal stages of manufacture. Procession is an order of dependence, and the One is not diminished by giving; a physical stack misreads the metaphysical relation.",
  },
  "plotinus-intellect": {
    context:
      "《九章集》V.3.5 在区分灵魂的推理与理智的自知后论证，最高理智若借外在表象认识便可能不真；因此理智的存在、思维活动与被思对象同一。后文仍说明灵魂如何通过转向理智认识自己。",
    englishContext:
      "Ennead V.3.5 distinguishes discursive soul from Intellect's self-knowledge. If Intellect knew through an external image, error would remain possible; its being, act of intellection, and intelligible object are therefore identical. Later sections ask how soul knows itself by turning toward Intellect.",
    distinction:
      "主客同一只适用于理智层的自思，不表示人的每个信念因被想到就真实，也不消除日常认识中证据与对象的距离。",
    englishDistinction:
      "Identity of knower and known concerns Intellect's self-thinking, not the truth of every human belief merely because it is entertained. Ordinary cognition still confronts distance, evidence, and possible error.",
  },
  "plotinus-one": {
    context:
      "《九章集》VI.9.3 在追问“一者如何在场”时以否定语逐项排除性质、数量、理智、灵魂、运动、静止、时空，因为万有的根源不能是万有中一个确定成员。后文转向灵魂怎样超越言说而与一者合一。",
    englishContext:
      "Ennead VI.9.3 asks how the One is present and removes quality, quantity, Intellect, Soul, motion, rest, space, and time, since the source of all cannot be one determinate member among all. The treatise then turns to the soul's word-transcending union with the One.",
    distinction:
      "否定所有范畴不是断言一者等于虚无，也不是让任何模糊神秘体验免于判断；否定神学以从结果回指超越原因，仍受整套形而上论证约束。",
    englishDistinction:
      "Negating categories does not identify the One with nothing or exempt every vague mystical experience from judgment. Negative language points from effects toward a transcendent cause within a specific metaphysical argument.",
  },
  augustine: {
    context:
      "《忏悔录》XI.14.17 在解释《创世记》“起初”时，奥古斯丁先问上帝创世之前为何没有“之前”，再承认日常知道时间、定义时却失语。随后他检验过去未来是否存在，并发展心灵伸展的时间论。",
    englishContext:
      "Confessions XI.14.17 arises while interpreting Genesis 'in the beginning.' Augustine denies an ordinary before creation, admits that time seems known until definition is demanded, and then asks how past and future exist, developing time as a distension of mind.",
    distinction:
      "定义困难不等于时间纯属幻觉或任何说法都同样有效；后续分析明确区分记忆、注意与期待，并试图解释我们怎样度量并不存在于当下的时段。",
    englishDistinction:
      "Difficulty of definition does not make time an illusion or every account equally valid. The subsequent analysis distinguishes memory, attention, and expectation and tries to explain how durations no longer or not yet present are measured.",
  },
  "augustine-restless-heart": {
    context:
      "《忏悔录》I.1.1 的开篇祈祷把赞美上帝、认识上帝和信仰来源连成问题，并以人是受造物、却仍渴望赞美创造者为背景说心不得安息。十三卷的回忆与归信叙事都由此句定向。",
    englishContext:
      "Confessions I.1.1 opens in prayer, linking praise, knowledge of God, and the source of faith. Against humanity's created and sinful condition, it says the heart remains restless until resting in its maker; the thirteen-book narrative of memory and conversion unfolds under that orientation.",
    distinction:
      "不安并非每种心理焦虑的单一诊断，也不能用宗教归宿替代医疗、关系和社会支持；它在奥古斯丁神学中描述有限善无法充当终极善。",
    englishDistinction:
      "Restlessness is not a single diagnosis of every anxiety, nor may religious orientation replace medical, relational, or social support. Within Augustine's theology it says finite goods cannot bear the role of the ultimate good.",
  },
  "augustine-memory-palace": {
    context:
      "《忏悔录》X.8 从“我越过身体能力进入记忆”开始，以田野、宫室和宝库描写感官形象如何储存、召回、隐藏或突然出现。后续章节扩展到技艺、数、情感、遗忘，最后在记忆中寻找上帝。",
    englishContext:
      "Confessions X.8 passes beyond bodily powers into memory, using fields, chambers, and treasuries for sensory images that are stored, sought, hidden, or unexpectedly returned. Later chapters include skills, numbers, emotions, and forgetting before asking how God is sought in memory.",
    distinction:
      "宫殿是现象学比喻，不是脑内固定仓库模型；回忆会重组、遗漏和误认，奥古斯丁自己也以“记住遗忘”展示其悖论，而非宣称记忆如档案原样保存。",
    englishDistinction:
      "The palace is a phenomenological image, not a literal fixed store in the brain. Recall can reorganize, omit, and misidentify; Augustine's puzzle of remembering forgetfulness already resists an archival copy model.",
  },
  "augustine-evil-as-privation": {
    context:
      "《忏悔录》VII.12.18 记录奥古斯丁摆脱摩尼教二元论：凡存在者因受造而在其程度上善，败坏只能损害已有之善；若完全失去善便不再存在。引句把恶排除为与善并列的实体。",
    englishContext:
      "Confessions VII.12.18 records Augustine's break with Manichaean dualism. Whatever exists is good to its degree as created; corruption can damage only an existing good, and total loss of good would mean nonexistence. The excerpt excludes evil as a rival substance.",
    distinction:
      "恶非实体不等于伤害不真实、作恶者无责任或受害只是“缺一点善”；匮缺论解释恶依赖被破坏的善，仍需说明具体意志、制度和苦难。",
    englishDistinction:
      "Evil's nonsubstantiality does not make harm unreal, remove responsibility, or tell victims they merely lack a little good. Privation explains evil's dependence on damaged good while concrete wills, institutions, and suffering still require account.",
  },
  "augustine-will-and-moral-evil": {
    context:
      "《上帝之城》XII.6 比较善恶天使：两者本性同为善，差异来自意志有者依附共同善、有者转向自身这一较低善。引句后的“恶意志没有动力因”把败坏描述为缺失而非上帝制造的实体原因。",
    englishContext:
      "City of God XII.6 compares good and fallen angels: both have good natures, but one will cleaves to the common good while another turns toward the lower good of itself. The chapter then says an evil will has no efficient cause, treating defection as privation rather than a substance made by God.",
    distinction:
      "转向较低者不是说身体、世俗事物本身为恶，而是有限善被当成终极目的而破坏秩序；“无动力因”也不取消行为的心理与社会诱因。",
    englishDistinction:
      "Turning lower does not make bodies or worldly things evil; disorder arises when a limited good is made ultimate. The absence of an efficient cause for defect does not erase psychological and social conditions of action.",
  },
  "augustine-inner-teacher": {
    context:
      "《论教师》XI.36 在奥古斯丁与阿德奥达图检验名称能否直接教会事物后得出：词首先呈现声音，真正理解须由所指之物与内在真理判断唤起。随后以“内在基督”为教师收束符号论。",
    englishContext:
      "De Magistro XI.36 follows Augustine and Adeodatus' tests of whether names directly teach things. Words first present sounds; understanding is awakened through what is signified and inward judgment of truth. The dialogue then culminates in Christ as the inner teacher.",
    distinction:
      "词不能直接灌入理解，不等于语言、教师和公共证据无用；它们提供提醒与指向。所谓内在判断也不是私人感觉自动胜过可核事实。",
    englishDistinction:
      "Words not transferring understanding directly does not make language, teachers, or public evidence useless; they prompt and direct. Inward judgment is likewise not a private feeling that automatically outranks checkable fact.",
  },
  "augustine-immutable-truth": {
    context:
      "《忏悔录》VII.10.16 描述一次“进入内在”的上升：奥古斯丁越过可变心灵，短暂看见在心之上的不变之光，遂呼告永恒真理、真实之爱与被爱永恒。下一节承认自己无力持续凝视。",
    englishContext:
      "Confessions VII.10.16 narrates an inward ascent beyond the changeable mind toward a momentary vision of immutable light, prompting the address to eternal Truth, true Love, and beloved Eternity. The next section admits that Augustine cannot sustain the vision.",
    distinction:
      "这句祈祷不是从“我感到确定”直接证明任何信念不变；其论证依赖可变判断如何受不变标准衡量，并在全书中接受神学解释。",
    englishDistinction:
      "The prayer does not infer an immutable belief merely from feeling certain. Its argument depends on changeable judgments being measured by standards not reducible to them and receives a theological interpretation across the work.",
  },
  "augustine-use-and-enjoyment": {
    context:
      "《论基督教教义》I.3 在区分事物与符号后，把事物再分为享受、使用以及兼具两者；I.4 以旅人借车船回家说明受造物是通往上帝的途径。后面才处理人应如何被爱而不被工具化。",
    englishContext:
      "On Christian Doctrine I.3, after distinguishing things and signs, divides things into those enjoyed, used, or both. I.4 compares travelers using vehicles to reach home, with creatures ordered toward God; later chapters ask how persons are loved without being reduced to instruments.",
    distinction:
      "“使用”在此是目的秩序的技术词，不能为操纵人开脱；奥古斯丁最终目的虽是上帝，邻人之爱仍要求为对方之善，而非只看其对我的效用。",
    englishDistinction:
      "Use is a technical term in an order of ends, not permission to manipulate persons. Although God is Augustine's final enjoyment, love of neighbor still seeks that person's good rather than merely personal utility.",
  },
  "augustine-things-and-signs": {
    context:
      "《论基督教教义》I.2 先说一切教导关乎事物或符号，并以木、石、牲畜为事物，语言与十字架等可兼作符号。这个开篇分类为后两卷的圣经符号解释与含混规则搭建框架。",
    englishContext:
      "On Christian Doctrine I.2 begins by saying teaching concerns things or signs, using wood, stone, and animals as things while words and the cross can function as signs. This opening taxonomy frames later books on scriptural signs and rules for ambiguity.",
    distinction:
      "借符号认识事物不表示符号含义固定、媒介透明或万物只有一个寓意；解释仍要考察用法、共同体、上下文以及是否促进爱。",
    englishDistinction:
      "Learning through signs does not make meaning fixed, media transparent, or every thing a bearer of one allegory. Interpretation still considers use, community, context, and Augustine's test of whether reading builds love.",
  },
  "augustine-two-cities-two-loves": {
    context:
      "《上帝之城》XIV.28 在讨论始祖堕落与人类社会后，以两种爱总结两城：自爱至轻蔑上帝、爱上帝至不以自我为终极。两城在历史中混杂，直到末世才完全分开，并非两张现实国家地图。",
    englishContext:
      "City of God XIV.28 concludes discussion of the fall and human society with two loves forming two cities: self-love to contempt of God and love of God beyond self as ultimate. The cities remain intermixed in history until the end; they are not two mapped earthly states.",
    distinction:
      "两城不能直接等同教会与国家、某党与敌人，也不许可“轻看自己”走向自虐；分类依据爱之秩序，每个历史共同体与个人都可能同时显露两种趋向。",
    englishDistinction:
      "The cities cannot simply be equated with church and state or one's party and its enemies, and contempt of self is not self-abuse. The distinction concerns ordered love; mixed tendencies can appear within every historical community and person.",
  },
  "augustine-peace-as-ordered-concord": {
    context:
      "《上帝之城》XIX.13 在列举身体、灵魂、家庭、城邦和天城各自和平后，把普遍和平定义为“秩序的宁静”，再把秩序说成相等与不等者各得其位。上下文同时承认地上和平有限而可被不义利用。",
    englishContext:
      "City of God XIX.13 lists peace of body, soul, household, city, and heavenly city before defining universal peace as tranquility of order and order as assigning equal and unequal things their places. The surrounding book also treats earthly peace as limited and usable by unjust communities.",
    distinction:
      "有秩序的安静不自动就是正义和平；压迫也能制造沉默，并把不平等说成“各安其位”。必须先判断位置分配的善与正当性。",
    englishDistinction:
      "Ordered quiet is not automatically just peace. Oppression can manufacture silence and name inequality proper placement; the goodness and legitimacy of the ordering itself must be judged first.",
  },
  "augustine-divided-will": {
    context:
      "《忏悔录》VIII.9.21 位于米兰花园归信前：奥古斯丁惊异心命身体易、命自己却受阻，并反驳摩尼教据此设两种敌对灵魂。省略后的结论是一个心因意志不完整而分裂，下一章进入剧烈挣扎。",
    englishContext:
      "Confessions VIII.9.21 occurs just before the Milan garden conversion. Augustine marvels that mind commands body more readily than itself and rejects the Manichaean inference to two hostile souls. The omitted conclusion locates division in one incomplete will before the next chapter's crisis.",
    distinction:
      "意志分裂不是简单“你还不够想要”，也不能用来责备成瘾或疾病者；文本描述相反爱欲牵引的第一人称经验，现代能力损伤还需临床与社会解释。",
    englishDistinction:
      "A divided will is not simply failure to want hard enough and must not blame people with addiction or illness. The text describes first-person conflict among loves; modern impairments of agency need clinical and social accounts as well.",
  },
  "augustine-confession-and-self-knowledge": {
    context:
      "《忏悔录》X.3.3 在叙事从过去转向“我现在是什么”时，奥古斯丁质疑读者为何想听他的内心、又如何验证他说真话。随后他说明告白首先在上帝前进行，并希望读者以爱相信、与他同忧同喜。",
    englishContext:
      "Confessions X.3.3 marks the shift from Augustine's past to what he is now. He asks why readers want access to his interior and how they could verify his truthfulness, then frames confession before God and asks charitable readers to grieve and rejoice with him.",
    distinction:
      "第一人称最接近内心，不等于自述不可错或无需外部核验；自我可能隐瞒自己，公众也不能以“求真实”为名无限索取私人披露。",
    englishDistinction:
      "First-person access does not make self-report infallible or exempt from corroboration; the self may be hidden from itself. Nor may an audience demand unlimited private disclosure in the name of authenticity.",
  },
  "augustine-love-as-weight": {
    context:
      "《忏悔录》XIII.9.10 在解释《创世记》水上运行的灵时，把物体按重量趋向其位置类比心灵按爱趋向安息处；火向上、石向下并非只因空间，而因各自秩序。引句连接宇宙秩序与意志方向。",
    englishContext:
      "Confessions XIII.9.10, interpreting the Spirit over the waters in Genesis, compares bodies moving by weight toward their places with minds carried by love toward rest. Fire rises and stone falls within an order; the excerpt joins cosmic placement to the will's direction.",
    distinction:
      "爱如重量不是说欲望不可改变或人被单一情感机械决定；习惯、恩典与选择都能重排所爱。比喻揭示方向性，不提供行为预测公式。",
    englishDistinction:
      "Love as weight does not make desire immutable or behavior mechanically determined by one feeling. Habit, grace, and choice can reorder loves; the image discloses orientation, not a predictive formula.",
  },
  "augustine-belief-and-understanding": {
    context:
      "《约翰福音讲道》29.6 注释约6:44“若非父吸引无人能来”，并引用以赛亚“若不信便不明白”。奥古斯丁把信置于理解入口，因为人须先信任启示才进入更深认识，同时整篇仍以经文解释为根据。",
    englishContext:
      "Tractate 29.6 on John 6:44, 'no one comes unless the Father draws,' cites Isaiah's 'unless you believe, you shall not understand.' Augustine places faith at the entrance to deeper understanding, while the tractate continues to argue through scriptural interpretation.",
    distinction:
      "信在先不表示证据无用、任何信念都能自证，或质疑是罪；它描述传统内部理解需要某种参与性信任，所信对象与解释仍可接受理由检验。",
    englishDistinction:
      "Faith's priority does not make evidence useless, every belief self-validating, or doubt sinful. It describes participatory trust needed for understanding within a tradition; the object trusted and its interpretation remain answerable to reasons.",
  },
  avicenna: {
    context:
      "《治疗论·形而上学》I.2 先排除上帝、第一因或“存在的一般原因”作为本学科已预设的主题，因为一门科学不能证明自己主题的存在；于是把“存在者就其为存在者”定为首要主题，后续再研究其本有属性与第一因。",
    englishContext:
      "The Metaphysics of The Healing I.2 first rejects God, the first cause, or general causes of being as an already assumed subject, since a science cannot demonstrate the existence of its own subject. It therefore takes the existent insofar as existent as primary and later investigates its proper attributes and first causes.",
    distinction:
      "“存在者”不是一个最高属，也不把所有具体学科内容混入形而上学；物理与数学研究受限定的存在者，本学科追问不依那些限定而属于存在的原则。",
    englishDistinction:
      "The existent is not a highest genus, nor does metaphysics absorb every special science. Physics and mathematics study beings under determinate conditions; this inquiry asks what belongs to being without those restrictions.",
  },
  "avicenna-primary-notions": {
    context:
      "《灵魂论纲要》第X节沿婴儿从感觉、辨别到理性发展的次序，说明心智后来发现无需教导和反思即可把握的公理性概念；这些第一概念为进一步证明提供起点，而非一出生便以完整命题显现。",
    englishContext:
      "Section X of A Compendium on the Soul traces development from sensation and discrimination toward intellect, which later finds axiomatic notions grasped without instruction or reflection. These first intelligibles become starting points for demonstration rather than fully articulated propositions present at birth.",
    distinction:
      "自明不等于人人会立即用同样词句表达，也不使文化学习无关；主张是某些判断一经理解无需更早证明，不是把所有熟悉信念都宣布为先天真理。",
    englishDistinction:
      "Self-evidence does not mean everyone immediately formulates the same sentence or that culture is irrelevant. The claim is that some judgments, once understood, need no prior proof—not that every familiar belief is innate truth.",
  },
  averroes: {
    context:
      "《裁决论》开头提出法律视角的问题：哲学研究究竟被宗教法允许、禁止还是命令。阿威罗伊先把哲学界定为考察受造物以认识创造者，再引用经文中“观察天地”等命令，推出有能力者的理性考察受到鼓励。",
    englishContext:
      "The Decisive Treatise opens with a legal question: is philosophical study permitted, forbidden, or commanded by revealed law? Averroes defines it as examining created things to know their maker and cites scriptural commands to observe heavens and earth, concluding that qualified rational inquiry is encouraged.",
    distinction:
      "“律法鼓励观察”不表示任何自称哲学的论证都正确，也不把证明义务施加给无训练者；文本随后区分演证、辩证和修辞能力，并要求方法匹配受众。",
    englishDistinction:
      "The Law's encouragement does not validate every argument called philosophy or impose demonstration on the untrained. The treatise distinguishes demonstrative, dialectical, and rhetorical capacities and matches method to audience.",
  },
  "averroes-truth": {
    context:
      "《裁决论》在以经文确立理性考察义务、并主张借前人成果学习演证之后，断言真律法与健全理性不会真正冲突。若表面字义与确定证明相抵触，后文才启动阿拉伯语允许的解释程序。",
    englishContext:
      "After grounding rational study in scripture and permitting use of predecessors' demonstrations, the Decisive Treatise says true law and sound reasoning cannot genuinely conflict. Only when an apparent scriptural sense opposes demonstrative certainty does the later interpretive procedure begin.",
    distinction:
      "“真理不反真理”不是遇到矛盾便宣布双方都对；它要求检查证明是否真为演证、经文是否属可解释层次。冲突可能暴露推理或诠释至少一方失败。",
    englishDistinction:
      "Truth not opposing truth does not declare both sides right whenever conflict appears. It requires testing whether the proof is demonstrative and whether the text admits interpretation; contradiction may expose failure in reasoning or exegesis.",
  },
  "averroes-interpretation": {
    context:
      "《裁决论》在确立演证真理与启示不冲突后，界定 taʾwīl 为依阿拉伯语修辞习惯把词从本义移到隐喻义，并列整体／部分、原因／结果等常见转移。随后限制谁可公开哪些解释，以避免受众误解。",
    englishContext:
      "After affirming harmony between demonstration and revelation, the Decisive Treatise defines ta'wil as carrying a word from literal to metaphorical sense under Arabic rhetorical usage, including whole-part and cause-effect transfers. It then restricts which interpretations should be disclosed to which audiences.",
    distinction:
      "解释不是为任何不便字句任意改义；它须有确定演证触发、语言习惯支持，并保留文本整体。其精英式传播限制也属于阿威罗伊政治语境，不宜无批判照搬。",
    englishDistinction:
      "Interpretation is not arbitrary revision of any inconvenient sentence. It requires demonstrative warrant, linguistic convention, and coherence with the text. Its elite restrictions on disclosure also belong to Averroes' political setting and should not be imported uncritically.",
  },
  thomas_aquinas: {
    context:
      "《神学大全》I q.2 a.3 按经院条目先列反对意见与“我即自有者”的反证，再在主答中依次提出运动、动力因、可能与必然、等级和目的秩序五路。卡片跨越第一路中间的运动链论证，只保留起点与第一推动者。",
    englishContext:
      "Summa Theologiae I q.2 a.3 follows objections and a sed contra from 'I am who am' with five ways from motion, efficient cause, contingency, gradation, and governance. The card skips intermediate steps in the first way, retaining its observed starting point and unmoved mover.",
    distinction:
      "第一推动者不是时间上最早的一次物理碰撞，五路也不是一句话完成的证明；从依赖链到基督教上帝的属性还需后续问题，现代宇宙学不能由这段直接裁决。",
    englishDistinction:
      "The first mover is not merely the earliest physical collision in time, and a one-sentence summary is not the complete proof. Later questions are needed to identify divine attributes; modern cosmology is not settled directly by this passage.",
  },
  "thomas-aquinas-analogy": {
    context:
      "《神学大全》I q.13 a.5 问名称是否以同一意义用于上帝与受造物。阿奎那先排除完全同义，因为受造完善来自上帝却有限，也排除纯歧义，因为那会使论证与认识皆断裂，最后提出按因果与比例的类比。",
    englishContext:
      "Summa Theologiae I q.13 a.5 asks whether names have the same sense of God and creatures. Aquinas rejects univocity because creaturely perfections are finite effects, and pure equivocity because it would destroy inference and knowledge, arriving at analogy through causal order and proportion.",
    distinction:
      "类比不是含糊折中，也不允许把人的善、智慧无限放大便等于神性；共同词保持真实关联，同时承认存在方式根本不对称。",
    englishDistinction:
      "Analogy is not a vague compromise, nor does magnifying human goodness or wisdom yield divinity. A common term preserves a real relation while acknowledging radically unequal modes of being.",
  },
  "thomas-aquinas-conscience": {
    context:
      "《神学大全》I q.79 a.13 接在 synderesis 是实践原则的习性之后，问良知是否一项能力。主答从“与知识同在”的词源，把良知分析为见证、约束／催促以及事后控告／开脱等把知识应用到行为的活动。",
    englishContext:
      "Summa Theologiae I q.79 a.13 follows the account of synderesis as a habit of first practical principles and asks whether conscience is a power. Its responsio treats conscience as an act applying knowledge—to witness, bind or incite, and accuse or excuse.",
    distinction:
      "良知作为行动并不保证结论正确；前提错误或应用失当会形成误良知。真诚确信与道德正确必须区分，教育和审议仍可修正应用。",
    englishDistinction:
      "Conscience as an act is not guaranteed correct; false premises or faulty application can yield an erroneous conscience. Sincerity and moral truth must be distinguished, leaving room for formation and deliberative correction.",
  },
  "thomas-aquinas-abstraction": {
    context:
      "《神学大全》I q.85 a.1 问人的理智是否从表象抽象认识物质事物。主答区分从个别质料抽取普遍形式与错误地认为形式脱离存在，并把感觉表象作为人类认知必经材料；借物质对象才间接认识非物质者。",
    englishContext:
      "Summa Theologiae I q.85 a.1 asks whether intellect knows material things by abstraction from phantasms. The responsio distinguishes considering universal form apart from individuating matter from falsely asserting separate existence; sensory images remain necessary materials for human cognition.",
    distinction:
      "抽象不是删除一切差异后留下空词，也不是理智天生装有完整观念；它从具体经验把握可理解结构，所得普遍性仍须回到个别判断。",
    englishDistinction:
      "Abstraction is not erasing every difference into an empty word or uncovering complete inborn ideas. It grasps intelligible structure through concrete experience, and the universal must still be applied back to particulars.",
  },
  "thomas-aquinas-law": {
    context:
      "《神学大全》I–II q.90 四个条目依次问法律是否属于理性、是否总指向共同善、谁有制定权以及公布是否必要。a.4 的结尾把四项汇成定义，因此每一要素都来自前一条独立论证。",
    englishContext:
      "Summa Theologiae I–II q.90 asks in turn whether law belongs to reason, aims at common good, is made by one charged with the community, and requires promulgation. The conclusion of a.4 gathers all four separately argued elements into its definition.",
    distinction:
      "由权威公布的规则若不合理由、共同善或权限，并不因此满足定义；“照护共同体者”也不是给统治者无限裁量，受托方向本身限制其权力。",
    englishDistinction:
      "A publicly issued command does not satisfy the definition if it lacks reason, common good, or proper authority. Care of the community is a fiduciary limit, not unlimited discretion for a ruler.",
  },
  "thomas-aquinas-natural-law": {
    context:
      "《神学大全》I–II q.91 a.2 在区分永恒法后问人是否另有自然法。阿奎那以一切受造物参与永恒法、理性者又能主动认识善恶为路径，称这种理性参与为自然法；后续 q.94 才展开具体原则。",
    englishContext:
      "Summa Theologiae I–II q.91 a.2 follows eternal law by asking whether humans have a natural law. All creatures participate through their tendencies, while rational creatures also apprehend good and evil; this rational participation is natural law, whose precepts q.94 later develops.",
    distinction:
      "自然法不是把任何生物冲动直接变成道德命令，也不等于某时代习俗；“参与”必须经实践理性组织倾向、共同善与具体条件。",
    englishDistinction:
      "Natural law does not turn every biological impulse directly into a moral command or identify nature with current custom. Participation requires practical reason to order inclinations, common good, and circumstances.",
  },
  "thomas-aquinas-practical-principle": {
    context:
      "《神学大全》I–II q.94 a.2 把实践理性第一原则类比思辨理性的“不矛盾”：善以目的形式被把握，所以首条命令是行善避恶。随后按保存生命、繁衍教养、认识真理与社会生活等倾向派生原则。",
    englishContext:
      "Summa Theologiae I–II q.94 a.2 compares practical reason's first principle with noncontradiction in speculative reason. Good is apprehended as end, yielding do and pursue good, avoid evil; further precepts follow inclinations toward life, family, truth, and society.",
    distinction:
      "首原则形式普遍，却不能单独告诉我们具体何者为善或利益冲突怎样排序；若没有事实判断、德性与审慎，它容易沦为同义反复。",
    englishDistinction:
      "The first principle is formally universal but cannot by itself identify the concrete good or rank conflicting claims. Without factual judgment, virtue, and prudence, it risks becoming merely tautological.",
  },
  "thomas-aquinas-unjust-law": {
    context:
      "《神学大全》I–II q.96 a.4 问人法是否在良知上约束。主答先说以共同善、正当权限和比例负担制定的正义法有约束力，再把违目的、越权或不均负担者称为暴力；后半仍讨论避免更大混乱时可能暂从。",
    englishContext:
      "Summa Theologiae I–II q.96 a.4 asks whether human law binds conscience. Just laws do so through common good, proper authority, and proportionate burden; laws defective in end, authority, or form are acts of violence. The latter part still considers compliance to avoid greater scandal or disturbance.",
    distinction:
      "不义法“不成其为法”不是任何个人不满即可宣布无效，也不自动决定最佳抵抗方式；判断需证明缺陷，并权衡服从、公开反对与不服从对他人的风险。",
    englishDistinction:
      "An unjust law's defect is not established by private dislike and does not automatically select one mode of resistance. The failure must be shown, while compliance, protest, and disobedience are weighed for risks to others.",
  },
  "thomas-aquinas-happiness": {
    context:
      "《神学大全》I–II q.2 逐条排除财富、荣誉、名声、权力、身体善、快乐与灵魂本身作为最终幸福，a.8 以任何受造善都不能完全安息欲求收束。q.3 随后把终极幸福定位为对神圣本质的直观。",
    englishContext:
      "Summa Theologiae I–II q.2 successively excludes wealth, honor, fame, power, bodily goods, pleasure, and even the soul itself as final happiness. Article 8 concludes that no created good wholly rests desire; q.3 then locates beatitude in vision of the divine essence.",
    distinction:
      "有限善不能成为终极善，不表示财富、健康、友谊在现实生活无价值；阿奎那另承认不完整的今生幸福与外在条件，不能用超越目的淡化物质匮乏。",
    englishDistinction:
      "No finite good being ultimate does not make wealth, health, or friendship worthless in present life. Aquinas also recognizes imperfect earthly happiness and external conditions; a transcendent end must not minimize material deprivation.",
  },
  "thomas-aquinas-faith-reason": {
    context:
      "《反异教大全》I.7 紧接区分理性可达的神学真理与超越理性的启示奥秘，论证同一上帝既赋自然理性又赐信仰，故真实结论不可能冲突。省略处以教师不会向学生灌输相反知识作比。",
    englishContext:
      "Summa Contra Gentiles I.7 follows the distinction between truths about God accessible to reason and revealed mysteries beyond it. Since one God gives both natural reason and faith, true conclusions cannot conflict; the omitted argument compares a teacher who would not instill contrary knowledge.",
    distinction:
      "不可能真正冲突不表示每项教义解释或哲学论证都真；表面冲突要求重查前提、推理与诠释。称某奥秘“超越理性”也不能为明确矛盾提供免检标签。",
    englishDistinction:
      "No genuine conflict does not validate every doctrinal interpretation or philosophical proof. Apparent conflict requires rechecking premises, inference, and exegesis; calling a mystery beyond reason cannot immunize an explicit contradiction.",
  },
};
