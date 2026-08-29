import type {
  ScienceAuthorProfile,
  ScienceThoughtSeed,
} from "./scienceCorpusTypes";

/**
 * Modern-science cards are source-led editorial paraphrases, not quotations.
 * Each locator points to the passage that the Chinese and English summaries
 * interpret, so readers can return to the argument in its original context.
 */
export const scienceModernProfiles = {
  einstein: {
    name: "爱因斯坦",
    englishName: "Albert Einstein",
    life: "1879—1955",
    englishLife: "1879–1955",
    school: "相对论与量子理论",
    englishSchool: "Relativity and Quantum Theory",
    palette: ["#e5e3dc", "#b2aa94", "#726957", "#272621"],
  },
  bohr: {
    name: "玻尔",
    englishName: "Niels Bohr",
    life: "1885—1962",
    englishLife: "1885–1962",
    school: "原子物理与互补性",
    englishSchool: "Atomic Physics and Complementarity",
    palette: ["#dce5e6", "#9fb5b9", "#607b82", "#22292c"],
  },
  heisenberg: {
    name: "海森堡",
    englishName: "Werner Heisenberg",
    life: "1901—1976",
    englishLife: "1901–1976",
    school: "量子力学",
    englishSchool: "Quantum Mechanics",
    palette: ["#e2e0e8", "#ada7bf", "#6c6581", "#25232c"],
  },
  schrodinger: {
    name: "薛定谔",
    englishName: "Erwin Schrödinger",
    life: "1887—1961",
    englishLife: "1887–1961",
    school: "波动力学",
    englishSchool: "Wave Mechanics",
    palette: ["#e1e7dd", "#a7b99d", "#667b5d", "#242a22"],
  },
  turing: {
    name: "图灵",
    englishName: "Alan Turing",
    life: "1912—1954",
    englishLife: "1912–1954",
    school: "计算理论与形态发生",
    englishSchool: "Computation and Morphogenesis",
    palette: ["#dfe4e8", "#a2afbc", "#617181", "#23282d"],
  },
  shannon: {
    name: "香农",
    englishName: "Claude Shannon",
    life: "1916—2001",
    englishLife: "1916–2001",
    school: "信息论",
    englishSchool: "Information Theory",
    palette: ["#e4e2dc", "#b5ab95", "#746854", "#29261f"],
  },
  wiener: {
    name: "维纳",
    englishName: "Norbert Wiener",
    life: "1894—1964",
    englishLife: "1894–1964",
    school: "控制论",
    englishSchool: "Cybernetics",
    palette: ["#e4dedb", "#b8a299", "#785f58", "#2a2321"],
  },
  popper: {
    name: "波普尔",
    englishName: "Karl Popper",
    life: "1902—1994",
    englishLife: "1902–1994",
    school: "科学哲学",
    englishSchool: "Philosophy of Science",
    palette: ["#e8e1d7", "#c0a989", "#806648", "#2c261f"],
  },
  kuhn: {
    name: "库恩",
    englishName: "Thomas S. Kuhn",
    life: "1922—1996",
    englishLife: "1922–1996",
    school: "科学史与科学哲学",
    englishSchool: "History and Philosophy of Science",
    palette: ["#e1e3dc", "#a9af99", "#68705b", "#252820"],
  },
  feynman: {
    name: "费曼",
    englishName: "Richard P. Feynman",
    life: "1918—1988",
    englishLife: "1918–1988",
    school: "理论物理与科学方法",
    englishSchool: "Theoretical Physics and Scientific Method",
    palette: ["#ebe0d4", "#c59d77", "#8a603d", "#30251e"],
  },
} satisfies Record<string, ScienceAuthorProfile>;

export const scienceModernSeeds = [
  {
    id: "science-einstein-relativity-postulates",
    authorId: "einstein",
    topic: "模型",
    text: "我们将把这个猜想（其内容此后称为“相对性原理”）提升为公设，并且另引入一个仅在表面上与前者不可调和的公设：光在真空中总以确定的速度 c 传播，而这一速度与发光体的运动状态无关。",
    english:
      "We will raise this conjecture (the purport of which will hereafter be called the ‘Principle of Relativity’) to the status of a postulate, and also introduce another postulate, which is only apparently irreconcilable with the former, namely, that light is always propagated in empty space with a definite velocity c which is independent of the state of motion of the emitting body.",
    editorialSummary:
      "狭义相对论从两条约束同时出发：惯性系中的物理定律同形，真空光速不随光源运动而改变。",
    englishEditorialSummary:
      "Special relativity begins by imposing two constraints together: physical laws take the same form in inertial frames, and the speed of light in vacuum does not depend on the source's motion.",
    work: "《论动体的电动力学》",
    englishWork: "On the Electrodynamics of Moving Bodies",
    reflection:
      "爱因斯坦不是先假定时间变慢，再寻找解释；他要求旧有的时间与同时性概念适应这两条原则。这里的要点是重建测量框架，而不是宣称一切都“相对”。",
    englishReflection:
      "Einstein did not begin by assuming that time slows and then seek an explanation; he made inherited notions of time and simultaneity answer to the two principles. The lesson is a reconstruction of measurement, not the slogan that everything is relative.",
    question:
      "当两个可靠原则发生表面冲突时，你会舍弃原则，还是重审隐藏在概念里的假定？",
    englishQuestion:
      "When two reliable principles appear to conflict, do you abandon one, or revisit the assumptions hidden in your concepts?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "W. Perrett 与 G. B. Jeffery 1923 年公版英译，导言第 1 页，脚注 1 之前的连续原句",
      "W. Perrett and G. B. Jeffery public-domain translation (1923), Introduction, p. 1, continuous sentence immediately before note 1",
    ],
  },
  {
    id: "science-einstein-light-quanta",
    authorId: "einstein",
    topic: "模型",
    text: "……它并非连续地分布在不断扩大的空间中，而是由有限数目的能量量子组成，这些量子局域于空间中的点……",
    english:
      "... is not continuously distributed over an increasing space but consists of a finite number of energy quanta which are localized at points in space ...",
    editorialSummary:
      "连续的光波描述并不排斥另一种模型：在发射与吸收问题中，光能可被当作局域的离散份额。",
    englishEditorialSummary:
      "A continuous wave description of light need not exclude another model: in emission and absorption, light energy may be treated as localized, discrete portions.",
    work: "《关于光的产生和转化的一个启发性观点》",
    englishWork:
      "On a Heuristic Point of View Concerning the Production and Transformation of Light",
    reflection:
      "1905 年的论证把黑体辐射的熵关系延伸到稀薄辐射，并提出光量子作为启发式观点。它没有简单废除波动理论，而是指出同一对象可能需要依问题而变的表述。",
    englishReflection:
      "The 1905 argument extended an entropy relation for black-body radiation to dilute radiation and proposed light quanta as a heuristic viewpoint. It did not simply abolish wave theory; it showed that different problems may demand different descriptions of the same object.",
    question:
      "一个模型在部分情形中成功，是否意味着它必须垄断对对象的全部描述？",
    englishQuestion:
      "If a model succeeds in some situations, must it monopolize every description of its object?",
    presentationNature: "source-excerpt",
    context:
      "导言先肯定波动理论对纯光学现象的成功，再指出发射与转化现象也许更适合用光能在空间中不连续分布的假设理解。短引来自随后同一个长句的中段；前略部分给出主语“从点光源向外传播的光线能量”，后略部分继续说这些量子不分裂地运动，并且只能作为完整单位产生或吸收。",
    englishContext:
      "The introduction first acknowledges the success of wave theory for purely optical phenomena, then suggests that emission and transformation may be more readily understood if light energy is discontinuously distributed in space. The excerpt is a continuous medial segment of the next sentence. The omitted opening supplies the subject, ‘the energy of a light ray spreading out from a point source’; the omitted ending says that the quanta move without dividing and can be produced or absorbed only as complete units.",
    distinction:
      "这是爱因斯坦明确称为“这里所考虑的假设”的启发式提议，不是宣布波动理论已被废除，也不是关于现代光子能否严格点状局域化的完整定理。摘要把这一历史性假设与发射、吸收问题联系起来，范围比短引本身稍宽。",
    englishDistinction:
      "Einstein presents this as the assumption ‘to be considered here,’ not as an announcement that wave theory has been abolished or as a complete modern theorem about whether photons can be strictly point-localized. The summary connects the historical hypothesis to emission and absorption and is slightly broader than the excerpt itself.",
    sourceLocator: [
      "A. B. Arons 与 M. B. Peppard 署名英译，《美国物理学杂志》33卷5期（1965年5月），印刷页368（缓存PDF第3页）；同一句中从is至space的连续24词中段，前后省略均已标明并经渲染目检；德文原刊对应《物理学年鉴》17卷（1905）第133页；按quotation exception作署名、精确定位、最小必要短引",
      "Named translation by A. B. Arons and M. B. Peppard, American Journal of Physics 33(5) (May 1965), print p. 368 (cached PDF p. 3); continuous 24-word medial segment of one sentence, from ‘is’ through ‘space,’ with both omissions marked and visually checked; corresponding German original in Annalen der Physik 17 (1905), p. 133; used under the quotation exception as an attributed, precisely located, minimally necessary excerpt",
    ],
  },
  {
    id: "science-einstein-brownian-evidence",
    authorId: "einstein",
    topic: "证据",
    text: "因此，平均位移与时间的平方根成正比。",
    english:
      "The mean displacement is therefore proportional to the square root of the time.",
    editorialSummary:
      "不可直接看见的分子，可以借悬浮微粒的可统计位移留下可检验的尺度。",
    englishEditorialSummary:
      "Molecules that cannot be seen directly can leave a testable scale in the statistical displacement of suspended particles.",
    work: "《论热的分子运动论所要求的静液体中悬浮粒子的运动》",
    englishWork:
      "On the Movement of Small Particles Suspended in Stationary Liquids Required by the Molecular-Kinetic Theory of Heat",
    reflection:
      "爱因斯坦把扩散、渗透压与微粒平均位移联系起来，使分子假说产生定量预测。布朗运动不是一张“原子照片”，而是一条由模型通往间接证据的推理链。",
    englishReflection:
      "Einstein linked diffusion, osmotic pressure, and mean particle displacement so that the molecular hypothesis yielded quantitative predictions. Brownian motion is not a photograph of atoms but an inferential chain from a model to indirect evidence.",
    question: "面对不可直接观察的对象，什么样的间接证据足以让你认真对待它？",
    englishQuestion:
      "For something that cannot be observed directly, what kind of indirect evidence would make you take it seriously?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "A. D. Cowper 1926 年英译，《布朗运动理论研究》，第 4 节“悬浮粒子的无规则运动”，第 18 页，均方位移公式之后的连续结论句",
      "A. D. Cowper translation (1926), Investigations on the Theory of the Brownian Movement, §4, ‘On the irregular movement of particles suspended in a liquid,’ p. 18, continuous conclusion immediately after the mean-square-displacement formula",
    ],
  },
  {
    id: "science-einstein-equivalence",
    authorId: "einstein",
    topic: "宇宙",
    text: "因此，我们有充分理由把相对性原理扩展到彼此作加速运动的参考物体；由此，我们获得了支持广义相对性公设的有力论据。",
    english:
      "We have thus good grounds for extending the principle of relativity to include bodies of reference which are accelerated with respect to each other, and as a result we have gained a powerful argument for a generalised postulate of relativity.",
    editorialSummary:
      "在足够局部的范围内，均匀引力场与适当加速的参考系可以给出相同的物理效应。",
    englishEditorialSummary:
      "Over a sufficiently local region, a uniform gravitational field and a suitably accelerated frame can produce the same physical effects.",
    work: "《相对论：狭义与广义理论》",
    englishWork: "Relativity: The Special and General Theory",
    reflection:
      "等效原理把重力从一种普通外力改写为空间时间结构的线索。它是局部原则，并不等于任意引力场都能在广阔区域内靠换坐标彻底消除。",
    englishReflection:
      "The equivalence principle turns gravity from an ordinary force into a clue about spacetime structure. It is a local principle, not a claim that any gravitational field can be erased across an extended region by changing coordinates.",
    question: "如果一种效应可以被参考系重新描述，它仍然有客观内容吗？",
    englishQuestion:
      "If an effect can be redescribed by changing frames, what objective content does it retain?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "Robert W. Lawson 1920 年授权英译，第二部分第 XX 章“惯性质量与引力质量相等是广义相对性公设的论据”，加速箱思想实验结论段",
      "Robert W. Lawson authorized translation (1920), Part II, Chapter XX, ‘The Equality of Inertial and Gravitational Mass as an Argument for the General Postulate of Relativity,’ conclusion of the accelerated-chest thought experiment",
    ],
  },
  {
    id: "science-einstein-epr-completeness",
    authorId: "einstein",
    topic: "不确定",
    text: "在一个完备理论中，物理实在的每一个要素都必须在物理理论中有一个对应项。若能在不以任何方式扰动系统的情况下，确定地预言某个物理量的值，那么这就是该物理量具有实在性的一个充分条件。",
    english:
      "In a complete theory there is an element corresponding to each element of reality. A sufficient condition for the reality of a physical quantity is the possibility of predicting it with certainty, without disturbing the system.",
    editorialSummary:
      "如果一种理论不能同时表示所有可在不扰动系统时确定的物理量，那么需要追问它是否完备。",
    englishEditorialSummary:
      "If a theory cannot simultaneously represent every quantity that can be predicted without disturbing the system, its completeness becomes a question rather than an assumption.",
    work: "《能认为量子力学对物理实在的描述是完备的吗？》",
    englishWork:
      "Can Quantum-Mechanical Description of Physical Reality Be Considered Complete?",
    reflection:
      "EPR 论文通过纠缠系统构造了对量子力学完备性的挑战，目标不是证明量子力学预测错误。后来的贝尔定理改变了可行解释的版图，但不能把 1935 年的论证缩成一句“爱因斯坦否认纠缠”。",
    englishReflection:
      "The EPR paper used an entangled system to challenge the completeness of quantum mechanics, not to show that its predictions were wrong. Bell's later theorem changed the landscape of possible explanations, but the 1935 argument should not be reduced to the claim that Einstein denied entanglement.",
    question: "准确预测是否已经等于完整理解，还是两者之间仍有距离？",
    englishQuestion:
      "Does accurate prediction amount to complete understanding, or can a gap remain between them?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "《物理评论》47 卷（1935），第 777 页，论文摘要开头连续两句",
      "Physical Review 47 (1935), p. 777, first two continuous sentences of the abstract",
    ],
  },
  {
    id: "science-einstein-theory-construction",
    authorId: "einstein",
    topic: "方法",
    text: "经验当然能在选择有用的数学概念时引导我们；但它绝不可能成为这些概念由之推导出来的源泉。经验仍然是数学构造在物理上是否有用的唯一判准。",
    english:
      "Experience can of course guide us in our choice of serviceable mathematical concepts; it cannot possibly be the source from which they are derived. Experience of course remains the sole criterion of the physical utility of a mathematical construction.",
    editorialSummary:
      "基础概念与定律不是从经验中机械归纳出来的；它们需要创造，却必须让推论回到经验受审。",
    englishEditorialSummary:
      "Fundamental concepts and laws are not mechanically extracted from experience; they are invented, while their consequences must still return to experience for judgment.",
    work: "《论理论物理学的方法》",
    englishWork: "On the Method of Theoretical Physics",
    reflection:
      "爱因斯坦区分了理论构造的创造性与理论检验的经验约束。所谓“自由创造”不是任意想象，因为简洁性、统一性和可检验后果仍会淘汰大量方案。",
    englishReflection:
      "Einstein distinguished the creativity of theory construction from the empirical constraint of theory testing. A “free invention” is not an arbitrary fantasy, because simplicity, unity, and testable consequences still eliminate many proposals.",
    question: "你的判断中，哪些概念来自观察，哪些其实是为了组织观察而创造的？",
    englishQuestion:
      "In your own judgments, which concepts come from observation, and which were invented to organize it?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "1933 年 6 月 10 日牛津大学赫伯特·斯宾塞讲座，Clarendon Press 初版第 12—13 页；重印页码 170，连续两句",
      "Herbert Spencer Lecture, Oxford, 10 June 1933, Clarendon Press first edition, pp. 12–13; reprint p. 170, two continuous sentences",
    ],
  },

  {
    id: "science-bohr-stationary-states",
    authorId: "bohr",
    topic: "模型",
    text: "能量辐射并非以普通电动力学所假定的连续方式发射（或吸收），而只发生在系统于不同“稳定状态”之间跃迁之时。……系统在稳定状态中的动力学平衡受普通力学定律支配，而这些定律不适用于系统在不同稳定状态之间的跃迁。",
    english:
      "Energy radiation is not emitted (or absorbed) in the continuous way assumed in the ordinary electrodynamics, but only during the passing of the systems between different ‘stationary’ states. … The dynamical equilibrium of the systems in the stationary stages is governed by the ordinary laws of mechanics, while these laws do not hold for the passing of the systems between the different stationary states.",
    editorialSummary:
      "解释原子光谱需要在经典轨道图景之外，引入稳定状态与状态之间的离散跃迁。",
    englishEditorialSummary:
      "Explaining atomic spectra requires going beyond a purely classical orbital picture by introducing stationary states and discrete transitions between them.",
    work: "《论原子和分子的构造》第一部分",
    englishWork: "On the Constitution of Atoms and Molecules, Part I",
    reflection:
      "玻尔模型把经典力学、卢瑟福原子和普朗克量子条件拼接成一个过渡性框架。它后来被量子力学取代，却示范了异常光谱如何迫使研究者修改模型的基本许可条件。",
    englishReflection:
      "Bohr's model joined classical mechanics, Rutherford's atom, and Planck's quantum condition in a transitional framework. Though later superseded by quantum mechanics, it shows how anomalous spectra can force a change in what a model is allowed to assume.",
    question: "一个后来被取代的模型，是否仍可能在科学史与理解上保持价值？",
    englishQuestion:
      "Can a model retain scientific and explanatory value after it has been superseded?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "《哲学杂志》第 26 卷（1913），第三部分结尾“本文采用的主要假设”，第 70—71 页，第 1—2 项；项目间删节以省略号标示",
      "Philosophical Magazine 26 (1913), Part III, closing list ‘The main assumptions used in the present paper,’ pp. 70–71, items 1–2; omission between items marked with an ellipsis",
    ],
  },
  {
    id: "science-bohr-quantum-postulate",
    authorId: "bohr",
    topic: "方法",
    text: "量子公设意味着，对原子现象的任何观察都会牵涉与观察手段之间一种不可忽略的相互作用。",
    english:
      "Now the quantum postulate implies that any observation of atomic phenomena will involve an interaction with the agency of observation not to be neglected.",
    editorialSummary:
      "在量子实验中，现象不能与让它显现的测量安排完全分开描述。",
    englishEditorialSummary:
      "In a quantum experiment, the phenomenon cannot be described as wholly separable from the measuring arrangement through which it appears.",
    work: "《量子公设与原子理论的最新发展》",
    englishWork:
      "The Quantum Postulate and the Recent Development of Atomic Theory",
    reflection:
      "玻尔强调量子作用的不可忽略，使对象与仪器之间的相互作用不能按经典方式任意缩小。这里说的是实验描述的条件，不是人的意识凭主观意念创造了结果。",
    englishReflection:
      "Bohr stressed that the quantum of action prevents the interaction between object and apparatus from being made arbitrarily negligible in the classical way. This concerns the conditions of experimental description, not a claim that human consciousness creates outcomes by thought.",
    question: "观察条件进入结果的定义时，我们应如何重新理解“客观”？",
    englishQuestion:
      "When conditions of observation enter the definition of a result, how should objectivity be understood?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "《自然》121 卷增刊（1928 年 4 月 14 日），第 580 页，第 1 节“量子公设与因果性”，连续原句",
      "Nature 121 supplement (14 April 1928), p. 580, §1 ‘Quantum Postulate and Causality,’ continuous sentence",
    ],
  },
  {
    id: "science-bohr-complementarity",
    authorId: "bohr",
    topic: "不确定",
    text: "我们面对的不是彼此矛盾，而是彼此互补的现象图景；只有合在一起，它们才为经典描述方式提供一种自然的推广。",
    english:
      "We are not dealing with contradictory but with complementary pictures of the phenomena, which only together offer a natural generalisation of the classical mode of description.",
    editorialSummary:
      "互相排斥的实验安排可能揭示同一量子对象的不同侧面，而完整说明需要保留这些不可合并的信息。",
    englishEditorialSummary:
      "Mutually exclusive experimental arrangements may reveal different aspects of one quantum object, and an adequate account must retain information that cannot be combined into a single setup.",
    work: "《量子公设与原子理论的最新发展》",
    englishWork:
      "The Quantum Postulate and the Recent Development of Atomic Theory",
    reflection:
      "互补性不是说任意矛盾观点都同样正确，而是针对由特定实验条件界定的经典描述。波与粒子的语言各有适用安排，不能被随意混成一幅经典图像。",
    englishReflection:
      "Complementarity does not make every contradictory view equally true; it concerns classical descriptions defined by specific experimental conditions. Wave and particle language each has an appropriate arrangement and cannot be freely fused into one classical picture.",
    question:
      "哪些问题不是缺少更多数据，而是要求你在彼此不兼容的观察方式之间保持张力？",
    englishQuestion:
      "Which questions require not merely more data, but sustained tension between incompatible ways of observing?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "《自然》121 卷增刊（1928 年 4 月 14 日），第 582 页，第 1 节末关于物质波粒图景的连续原句",
      "Nature 121 supplement (14 April 1928), p. 582, closing discussion in §1 on the wave and particle pictures of matter, continuous sentence",
    ],
  },
  {
    id: "science-bohr-whole-arrangement",
    authorId: "bohr",
    topic: "证据",
    text: "……此外，必须把整个实验安排考虑在内。",
    english:
      "... it is moreover essential that the whole experimental arrangement be taken into account.",
    editorialSummary:
      "量子实验的证据属于整个可说明的实验安排，而不只是脱离装置的一枚孤立读数。",
    englishEditorialSummary:
      "Evidence in a quantum experiment belongs to the entire communicable experimental arrangement, not merely to an isolated reading detached from its apparatus.",
    work: "《与爱因斯坦关于原子物理认识论问题的讨论》",
    englishWork:
      "Discussion with Einstein on Epistemological Problems in Atomic Physics",
    reflection:
      "玻尔反复分析爱因斯坦提出的思想实验，指出改变装置也会改变可以无歧义提出的物理量。证据因此具有语境，并不意味着证据只是约定或可以无视装置独立解读。",
    englishReflection:
      "Bohr repeatedly analyzed Einstein's thought experiments to show that changing the apparatus changes which physical quantities can be stated unambiguously. Evidence is therefore contextual, but not conventional or free to be interpreted without regard to the apparatus.",
    question: "一条数据若没有产生它的条件，还剩下多少可解释的意义？",
    englishQuestion:
      "How much interpretable meaning remains in a datum once the conditions that produced it are removed?",
    presentationNature: "source-excerpt",
    context:
      "玻尔在这一页区分被研究对象与用经典术语规定现象出现条件的测量仪器，并说明某些重物体与粒子可能共同构成需要应用量子形式体系的系统。短引省去的句首把论点限定为“对形式体系任何定义明确的应用所需条件之规定”；紧接着的句子以增添一面镜子为例，说明装置变化会引入新的干涉效应并改变预测。",
    englishContext:
      "On this page Bohr distinguishes the objects under investigation from measuring instruments that define, in classical terms, the conditions under which phenomena appear, and explains that some heavy bodies together with the particles may constitute the system to which the quantum formalism is applied. The omitted opening limits the claim to specifying the conditions for any well-defined application of the formalism. The next sentence illustrates the point: adding a mirror can introduce new interference effects and alter predictions.",
    distinction:
      "短引要求在应用形式体系时计入整个装置，并不等于说读数由观察者任意创造，也没有在这一句中直接论证所有证据都“属于”装置。摘要中的“可说明”与“孤立读数”综合了文章别处关于无歧义报告实验的论述。",
    englishDistinction:
      "The excerpt requires the whole apparatus to be included when applying the formalism; it does not say that an observer arbitrarily creates a reading, nor does this sentence by itself argue that all evidence ‘belongs’ to the apparatus. The summary's language of communicability and an isolated reading synthesizes Bohr's discussion elsewhere of unambiguous experimental reports.",
    sourceLocator: [
      "《爱因斯坦：哲学家—科学家》第三版（1970；文章初刊于1949），印刷页222（Internet Archive整卷文本PDF第238页；缓存单页核查PDF第1页）；同一句从it至account的连续13词句尾，句首省略已标明并经渲染目检；按quotation exception作署名、精确定位、最小必要短引",
      "Albert Einstein: Philosopher-Scientist, third edition (1970; essay first published in 1949), print p. 222 (Internet Archive full-volume text PDF p. 238; cached one-page review PDF p. 1); continuous 13-word sentence ending from ‘it’ through ‘account,’ with the opening omission marked and visually checked; used under the quotation exception as an attributed, precisely located, minimally necessary excerpt",
    ],
  },

  {
    id: "science-heisenberg-observable-transitions",
    authorId: "heisenberg",
    topic: "方法",
    text: "本文将试图建立一种量子理论的力学，它完全以原则上可观察的量之间的关系为基础。",
    english:
      "In this paper, we will attempt to achieve a quantum-theoretical mechanics that is based exclusively upon relationships between quantities that are observable, in principle.",
    editorialSummary:
      "当经典轨道无法观测且不断误导时，可以先用可记录的跃迁频率与强度重建理论。",
    englishEditorialSummary:
      "When classical orbits are unobservable and repeatedly misleading, theory can be rebuilt from recordable transition frequencies and intensities.",
    work: "《关于运动学和力学关系的量子理论重新解释》",
    englishWork:
      "Quantum-Theoretical Re-interpretation of Kinematic and Mechanical Relations",
    reflection:
      "海森堡的矩阵力学从原子光谱可访问的量出发，放弃给电子指定经典轨道。它不是宣布不可观察者永远无意义，而是在当时证据条件下重新选择理论的基本变量。",
    englishReflection:
      "Heisenberg's matrix mechanics began with quantities accessible in atomic spectra and abandoned the assignment of classical electron orbits. It did not declare every unobservable meaningless forever; it selected new theoretical variables under the evidence then available.",
    question: "当熟悉的图像持续失败时，你能否放弃图像，先保留可操作的关系？",
    englishQuestion:
      "When a familiar picture keeps failing, can you relinquish the picture and preserve the workable relations?",
    presentationNature: "source-excerpt",
    context:
      "这是论文正文之前的纲领性开场句。紧随其后的导言批评旧量子规则以原则上不可观察的电子位置和轨道周期等量之间的关系为基本构件；下页则再次提出，只在可观察量之间建立关系的量子理论力学。跃迁频率与振幅在后续构造中成为具体变量。",
    englishContext:
      "This is the programmatic opening sentence before the paper's main text. The introduction immediately objects that the old quantum rules were built from relations among quantities such as electron position and orbital period that could not be observed in principle; the next page again proposes a quantum-theoretical mechanics containing only relations among observable quantities. Transition frequencies and amplitudes become concrete variables in the construction that follows.",
    distinction:
      "“原则上可观察”是这篇论文的建构纲领，不应扩张成对一切理论实体永久无意义的形而上学禁令。短引没有直接点名跃迁频率与强度；它们是摘要结合后文所作的具体化，而“强度”在形式体系中更直接对应跃迁振幅及其平方。",
    englishDistinction:
      "‘Observable, in principle’ states the paper's constructive program and should not be expanded into a permanent metaphysical ban on every theoretical entity. The excerpt does not itself name transition frequencies and intensities; the summary makes that later construction concrete, with intensity represented more directly through transition amplitudes and their squares.",
    sourceLocator: [
      "D. H. Delphenich 署名英译，译本PDF第1页；对应德文原刊《物理学杂志》33卷（1925）印刷页879；正文前完整连续24词开场句，已渲染目检；按quotation exception作署名、精确定位、最小必要短引",
      "Named translation by D. H. Delphenich, translation PDF p. 1; corresponding German original in Zeitschrift für Physik 33 (1925), print p. 879; complete continuous 24-word opening sentence before the main text, visually checked; used under the quotation exception as an attributed, precisely located, minimally necessary excerpt",
    ],
  },
  {
    id: "science-heisenberg-microscope",
    authorId: "heisenberg",
    topic: "不确定",
    text: "在确定其位置的瞬间——即光量子被电子衍射的瞬间——电子的动量发生不连续变化。所用光的波长越短，也就是位置确定得越精确，这种变化就越显著。",
    english:
      "At the instant of the determination of its position - i.e., the instant at which the light quantum is diffracted by the electron - the electron discontinuously changes its impulse. That change will be more pronounced, the smaller the wavelength of the light used, i.e. the more precise the position determination is to be.",
    editorialSummary:
      "提高电子位置的分辨率，需要更短波长的探测，却会增大传递给电子的动量不确定性。",
    englishEditorialSummary:
      "Resolving an electron's position more sharply requires shorter-wavelength probing, which increases uncertainty in the momentum transferred to it.",
    work: "《量子理论运动学与力学的实际内容》",
    englishWork:
      "The Actual Content of Quantum Theoretical Kinematics and Mechanics",
    reflection:
      "伽马射线显微镜是解释位置—动量权衡的思想实验，不是现代不确定关系最完整的数学证明。它把测量条件与可同时赋予经典量的精度联系起来，也不应被误读为普通仪器做得不够精密。",
    englishReflection:
      "The gamma-ray microscope is a thought experiment illustrating the position–momentum trade-off, not the most complete modern derivation of uncertainty relations. It links measurement conditions to the precision of jointly assigned classical quantities and should not be reduced to imperfect instruments.",
    question: "获得一种更清晰的信息时，你是否也在主动放弃另一种清晰度？",
    englishQuestion:
      "When you sharpen one kind of information, what other kind of clarity might you be giving up?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "NASA TM-77379（1983年12月）英译，第1节，印刷页4（PDF第6页），伽马射线显微镜段连续两句；NASA 记录标注“Work of the US Gov. Public Use Permitted”",
      "NASA TM-77379 translation (December 1983), §1, print p. 4 (PDF p. 6), two continuous sentences in the gamma-ray-microscope passage; the NASA record states “Work of the US Gov. Public Use Permitted”",
    ],
  },
  {
    id: "science-heisenberg-conjugate-limits",
    authorId: "heisenberg",
    topic: "不确定",
    text: "也就是说，位置确定得越精确，动量就只能被知道得越不精确，反之亦然。",
    english:
      "That is, the more precisely the position is determined, the more imprecisely will the impulse be known, and vice-versa.",
    editorialSummary:
      "位置与动量等共轭量的精度受同一量子结构约束，限制不是靠更勤奋地校准仪器就能一并消除。",
    englishEditorialSummary:
      "The precisions of conjugate quantities such as position and momentum are constrained by the same quantum structure; calibration alone cannot remove both limits at once.",
    work: "《量子理论运动学与力学的实际内容》",
    englishWork:
      "The Actual Content of Quantum Theoretical Kinematics and Mechanics",
    reflection:
      "原论文把不确定关系与波包、对易关系及测量分析联系起来。现代形式对“制备的不确定度”和“测量扰动”有更细区分，因此不能把所有版本都等同为观察者碰坏了粒子。",
    englishReflection:
      "The paper connects uncertainty relations with wave packets, commutation relations, and measurement analysis. Modern formulations distinguish preparation uncertainty from measurement disturbance more carefully, so not every version means that an observer simply knocked the particle about.",
    question: "你遇到的限制中，哪些来自资源不足，哪些可能来自问题结构本身？",
    englishQuestion:
      "Which limits you meet come from insufficient resources, and which may belong to the structure of the problem itself?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "NASA TM-77379（1983年12月）英译，第1节，印刷页5（PDF第7页），位置—动量段完整连续句；NASA 记录标注“Work of the US Gov. Public Use Permitted”",
      "NASA TM-77379 translation (December 1983), §1, print p. 5 (PDF p. 7), complete continuous sentence in the position–momentum passage; the NASA record states “Work of the US Gov. Public Use Permitted”",
    ],
  },
  {
    id: "science-heisenberg-statistical-prediction",
    authorId: "heisenberg",
    topic: "模型",
    text: "量子力学定律基本上是统计性的。即使一次实验已经完整确定了一个原子系统的参数，未来对该系统的观察结果通常仍不能被精确预言。",
    english:
      "The laws of quantum mechanics are basically statistical. Although the parameters of an atomic system are determined in their entirety by an experiment, the result of a future observation of the system is not generally accurately predictable.",
    editorialSummary:
      "量子理论的数学形式不再为每次事件提供经典轨迹，而为可能结果及其统计分布建立规则。",
    englishEditorialSummary:
      "Quantum theory's mathematical form no longer supplies a classical trajectory for each event; it provides rules for possible outcomes and their statistical distribution.",
    work: "《量子力学的创立》诺贝尔演讲",
    englishWork: "The Development of Quantum Mechanics — Nobel Lecture",
    reflection:
      "海森堡回顾矩阵力学如何由跃迁量及其组合规则发展，并说明统计解释进入理论。统计性并不等于“什么都无法知道”，因为概率分布本身能给出极高精度的可重复预测。",
    englishReflection:
      "Heisenberg reviewed how matrix mechanics grew from transition quantities and their rules of combination, with statistical interpretation entering the theory. Statistical prediction does not mean that nothing can be known, because probability distributions themselves can be tested with great precision.",
    question:
      "一种理论若只能预测分布而非单次结果，你会认为它解释得更少，还是解释了不同层次？",
    englishQuestion:
      "If a theory predicts distributions rather than individual outcomes, does it explain less, or does it explain at a different level?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "1933 年 12 月 11 日诺贝尔演讲《量子力学的发展》，诺贝尔讲演集第 298 页，末段连续两句",
      "Nobel Lecture, ‘The Development of Quantum Mechanics,’ 11 December 1933, Nobel lecture volume p. 298, two continuous sentences in the closing discussion",
    ],
  },

  {
    id: "science-schrodinger-eigenvalues",
    authorId: "schrodinger",
    topic: "模型",
    text: "在本文中，我想先考察氢原子的简单情形（非相对论且未受扰动），并说明通常的量子条件可以被另一项假设取代；在这项假设中，“整数”概念本身并未被引入。相反，整数性一旦出现，它就以与振动弦节点数同样自然的方式产生。",
    english:
      "In this paper I wish to consider, first, the simple case of the hydrogen atom (non-relativistic and unperturbed), and show that the customary quantum conditions can be replaced by another postulate, in which the notion of “whole numbers”, merely as such, is not introduced. Rather when integralness does appear, it arises in the same natural way as it does in the case of the node-numbers of a vibrating string.",
    editorialSummary:
      "量子数可以像弦的节点数那样，从允许解的边界条件中出现，而不必先作为额外规则塞进轨道。",
    englishEditorialSummary:
      "Quantum numbers can emerge from boundary conditions on admissible solutions, much as node counts do for a vibrating string, rather than being inserted as extra rules for orbits.",
    work: "《量子化作为本征值问题》第一篇",
    englishWork: "Quantization as an Eigenvalue Problem, First Communication",
    reflection:
      "薛定谔把氢原子量子化重写为波动方程的本征值问题，使离散性成为可接受解的结构结果。这个类比富有启发性，但波函数不能在所有情形中被当成普通物质波。",
    englishReflection:
      "Schrödinger recast hydrogen quantization as an eigenvalue problem so that discreteness emerged from the structure of admissible wave-equation solutions. The analogy is powerful, but the wavefunction cannot in every context be treated as an ordinary material wave.",
    question: "哪些看似人为规定的离散选项，其实可能由整体约束自然产生？",
    englishQuestion:
      "Which apparently arbitrary discrete choices might arise naturally from global constraints?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "收于《波动力学论文集》英文版（Blackie，1928），第一篇第 1 节导言首段，第 1 页，连续两句",
      "English edition in Collected Papers on Wave Mechanics (Blackie, 1928), First Communication, §1 opening paragraph, p. 1, two continuous sentences",
    ],
  },
  {
    id: "science-schrodinger-entangled-whole",
    authorId: "schrodinger",
    topic: "不确定",
    text: "整体处于一个确定的状态，各部分单独来看则不是。",
    english:
      "The whole is in a definite state, the parts taken individually are not.",
    editorialSummary:
      "两个系统相互作用后，整体可能具有确定的联合描述，而各部分却不再各自拥有独立的纯态。",
    englishEditorialSummary:
      "After two systems interact, the whole may have a definite joint description even though its parts no longer possess independent pure states of their own.",
    work: "《量子力学的现状》",
    englishWork: "The Present Situation in Quantum Mechanics",
    reflection:
      "薛定谔用“纠缠”刻画量子理论中整体与部分关系的根本变化。这里不是说部分不存在，而是说把整体状态简单拆成两个独立状态会丢失关键相关性。",
    englishReflection:
      "Schrödinger introduced entanglement to characterize a fundamental change in the relation between whole and parts in quantum theory. The parts do not cease to exist; rather, factoring the total state into independent states discards essential correlations.",
    question: "在什么情况下，理解各部分仍不足以理解它们组成的整体？",
    englishQuestion:
      "When does understanding every part still fail to provide an understanding of the whole they compose?",
    presentationNature: "source-excerpt",
    context:
      "第10节先说明：即便两个子系统已经分离，对总系统的最大知识也未必包含对每个部分同样完整的知识，因为联合知识可以保存在条件性关联中。短引把前一句“对整体的最佳可能知识未必包含对各部分的同等知识”改写成状态语言；随后的对话又排除把部分状态仅仅理解为“已有确定值但我不知道”。本页稍后才把相互作用后留下的这种关系命名为纠缠。",
    englishContext:
      "Section 10 first explains that, even after two subsystems are separated, maximal knowledge of the total system need not include equally complete knowledge of each part because joint knowledge can reside in conditional correlations. The excerpt translates the immediately preceding statement—best possible knowledge of a whole need not include the same for its parts—into the language of states. The dialogue that follows rejects the simple reading that each part already has a definite state which is merely unknown. Later on the same page Schrödinger names the relation left by interaction ‘entanglement.’",
    distinction:
      "这里的“确定状态”依照文中的术语指总系统具有确定的ψ函数或最大知识，并不表示每个可观测量同时都有确定值。短引也没有否认部分的物理存在；摘要用“独立纯态”把整体状态不能因式分解的现代读法明确化。",
    englishDistinction:
      "Here ‘definite state’ means, in the paper's terminology, that the total system has a definite psi-function or maximal knowledge; it does not mean that every observable simultaneously has a definite value. Nor does the excerpt deny the physical existence of the parts. The summary's language of independent pure states makes explicit the modern factorization reading.",
    sourceLocator: [
      "John D. Trimmer 署名英译，《美国哲学会会刊》124卷5期（1980年10月10日），第10节，印刷页332（缓存JSTOR版PDF第11页）；完整连续13词句，已渲染目检；德文原刊对应《自然科学》23卷第二部分第10节第827页；按quotation exception作署名、精确定位、最小必要短引",
      "Named translation by John D. Trimmer, Proceedings of the American Philosophical Society 124(5) (10 October 1980), §10, print p. 332 (cached JSTOR PDF p. 11); complete continuous 13-word sentence, visually checked; corresponding German original in Naturwissenschaften 23, Part II, §10, p. 827; used under the quotation exception as an attributed, precisely located, minimally necessary excerpt",
    ],
  },
  {
    id: "science-schrodinger-cat-boundary",
    authorId: "schrodinger",
    topic: "模型",
    text: "……活猫与死猫（请原谅这种说法）等份地混合或涂抹在一起。",
    english:
      "... the living and the dead cat (pardon the expression) mixed or smeared out in equal parts.",
    editorialSummary:
      "把微观叠加未经解释地延伸到日常尺度，会产生猫既生又死的荒诞表述，从而暴露理论解释的边界问题。",
    englishEditorialSummary:
      "Extending microscopic superposition to everyday scales without interpretation yields the absurd description of a cat as both alive and dead, exposing a boundary problem in the theory's interpretation.",
    work: "《量子力学的现状》",
    englishWork: "The Present Situation in Quantum Mechanics",
    reflection:
      "猫是薛定谔为放大量子形式与宏观经验之间张力而设计的反例，而不是他主张现实中的猫会长期处于两种生命状态。思想实验的力量在于让隐藏的概念代价变得无法忽视。",
    englishReflection:
      "Schrödinger designed the cat as a counterexample that magnifies the tension between quantum formalism and macroscopic experience, not as a claim that real cats remain literally in two life states. The thought experiment makes a hidden conceptual cost impossible to ignore.",
    question:
      "你的模型在极端尺度下会推出什么荒诞结果，而那种荒诞揭示了哪个隐藏前提？",
    englishQuestion:
      "What absurd result does your model produce at an extreme scale, and which hidden assumption does that absurdity expose?",
    presentationNature: "source-excerpt",
    context:
      "第5节先把原子核衰变经盖革计数器、继电器与毒药放大到猫的生死，并说若一小时内没有原子衰变，人们会说猫仍活着。短引省去的句首说明：整个系统的ψ函数会以这种方式表达情形。紧接着的句子点明，原先限于原子领域的不确定性由此转化为可直接观察并解决的宏观不确定性。",
    englishContext:
      "Section 5 first amplifies a nuclear decay through a Geiger counter, relay, and poison into the life or death of a cat, and says that after an hour one would call the cat alive if no atom had decayed. The omitted opening states that the psi-function of the entire system would express the situation in this way. The next sentence identifies the point: an indeterminacy originally restricted to the atomic domain has become a macroscopic indeterminacy that can be resolved by direct observation.",
    distinction:
      "薛定谔把这个例子称为“相当荒谬的情形”，是在质疑把模糊模型天真地当作现实，而不是主张现实中的猫会稳定维持两种生命状态。“混合或涂抹”是Trimmer对历史原文的译法，不能代替退相干或测量问题的现代完整分析。",
    englishDistinction:
      "Schrödinger calls this a ‘quite ridiculous’ case and uses it to challenge the naive acceptance of a blurred model as reality; he is not claiming that an actual cat stably persists in two life states. ‘Mixed or smeared out’ is Trimmer's rendering of the historical passage, not a substitute for a complete modern analysis of decoherence or the measurement problem.",
    sourceLocator: [
      "John D. Trimmer 署名英译，《美国哲学会会刊》124卷5期（1980年10月10日），第5节，印刷页328（缓存JSTOR版PDF第7页）；同一句从the至parts的连续16词句尾，句首省略已标明并经渲染目检；德文原刊对应《自然科学》23卷第一部分第5节第812页；按quotation exception作署名、精确定位、最小必要短引",
      "Named translation by John D. Trimmer, Proceedings of the American Philosophical Society 124(5) (10 October 1980), §5, print p. 328 (cached JSTOR PDF p. 7); continuous 16-word sentence ending from ‘the’ through ‘parts,’ with the opening omission marked and visually checked; corresponding German original in Naturwissenschaften 23, Part I, §5, p. 812; used under the quotation exception as an attributed, precisely located, minimally necessary excerpt",
    ],
  },

  {
    id: "science-turing-mechanical-computation",
    authorId: "turing",
    topic: "模型",
    text: "机器配有一条“纸带”（纸的类比物），纸带穿过机器，并被分成若干区段（称为“方格”），每一格都能承载一个“符号”。",
    english:
      "The machine is supplied with a ‘tape’ (the analogue of paper) running through it, and divided into sections (called ‘squares’) each capable of bearing a ‘symbol’.",
    editorialSummary: "机械计算可以被拆成有限状态、可读写的符号带，以及一次只处理局部符号的明确规则。",
    englishEditorialSummary:
      "Mechanical calculation can be decomposed into finitely many states, a readable and writable tape of symbols, and explicit rules that act on one local region at a time.",
    work: "《论可计算数及其在判定问题上的应用》",
    englishWork:
      "On Computable Numbers, with an Application to the Entscheidungsproblem",
    presentationNature: "source-excerpt",
    reflection:
      "图灵没有试图模仿计算者的身体，而是抽取纸笔计算中可重复的基本动作。这个模型既极其简化又极其广泛，但它描述的是可机械执行的计算，不等于对一切人类思维的完整理论。",
    englishReflection:
      "Turing did not try to imitate a calculator's body; he abstracted the repeatable operations of paper-and-pencil work. The model is radically simple and remarkably general, but it characterizes mechanically executable computation rather than offering a complete theory of all human thought.",
    question: "要把一项复杂活动变成可执行规则，你必须保留什么，又会舍弃什么？",
    englishQuestion:
      "To turn a complex activity into executable rules, what must you preserve, and what will you leave out?",
    sourceLocator: [
      "1936年原刊第1节，第231页，纸带与方格定义的连续句",
      "1936 original journal article, §1, p. 231, continuous sentence defining the tape and squares",
    ],
  },
  {
    id: "science-turing-universal-machine",
    authorId: "turing",
    topic: "模型",
    text: "可以发明一台能够用来计算任何可计算序列的单一机器。如果给这台机器 U 提供一条纸带，纸带开头写有某台计算机器 M 的标准描述，那么 U 将计算出与 M 相同的序列。",
    english:
      "It is possible to invent a single machine which can be used to compute any computable sequence. If this machine U is supplied with a tape on the beginning of which is written the S.D of some computing machine M, then U will compute the same sequence as M.",
    editorialSummary: "同一台机器只要读入另一台机器的编码，就能模拟后者的计算；程序因此也可以成为数据。",
    englishEditorialSummary:
      "A single machine can simulate another by reading its encoded description; a program can therefore be treated as data.",
    work: "《论可计算数及其在判定问题上的应用》",
    englishWork:
      "On Computable Numbers, with an Application to the Entscheidungsproblem",
    presentationNature: "source-excerpt",
    reflection:
      "通用机把专用装置的差别转移到符号化描述中，为存储程序计算提供了概念基础。通用不意味着一次能高效完成所有任务，它首先是一种可模拟性的主张。",
    englishReflection:
      "The universal machine relocates the differences among special-purpose devices into symbolic descriptions, supplying a conceptual basis for stored-program computing. Universality does not promise efficient performance on every task; it is first a claim about simulability.",
    question:
      "当规则本身也能被编码和处理时，工具与对象之间的边界发生了什么变化？",
    englishQuestion:
      "What happens to the boundary between tool and object when rules themselves can be encoded and processed?",
    sourceLocator: [
      "1936年原刊第6节，第241—242页，通用计算机开篇连续两句",
      "1936 original journal article, §6, pp. 241–242, opening two continuous sentences on the universal computing machine",
    ],
  },
  {
    id: "science-turing-undecidable-behavior",
    authorId: "turing",
    topic: "不确定",
    text: "我们还可以证明：不存在这样一台机器 E，它在获得任意机器 M 的标准描述后，能够判定 M 是否会打印某个给定符号（比如 0）。",
    english:
      "We can show further that there can be no machine E which, when supplied with the S.D of an arbitrary machine M, will determine whether M ever prints a given symbol (0 say).",
    editorialSummary: "不存在一种通用程序，能对每个任意给定程序都正确判定它是否会持续产生所要求的计算输出。",
    englishEditorialSummary:
      "There is no general procedure that can correctly decide, for every arbitrary program, whether it will continue to produce the required computational output.",
    work: "《论可计算数及其在判定问题上的应用》",
    englishWork:
      "On Computable Numbers, with an Application to the Entscheidungsproblem",
    presentationNature: "source-excerpt",
    reflection:
      "图灵通过“无循环机器”判定问题和对角论证证明了机械判定能力的内在边界。后人常用“停机问题”概括相关结果，但原论文的具体谓词与今天教科书中的标准版本并不完全相同。",
    englishReflection:
      "Turing used the decision problem for circle-free machines and a diagonal argument to establish an intrinsic limit on mechanical decision. The later phrase “halting problem” usefully groups related results, although the paper's exact predicate differs from the standard textbook formulation.",
    question:
      "一套规则能够描述大量过程，是否意味着它也能预先判定所有过程的结局？",
    englishQuestion:
      "If a rule system can describe many processes, does that mean it can decide every process's fate in advance?",
    sourceLocator: [
      "1936年原刊第8节，第247—248页，关于任意机器能否打印给定符号的连续句",
      "1936 original journal article, §8, pp. 247–248, continuous sentence on deciding whether an arbitrary machine prints a given symbol",
    ],
  },
  {
    id: "science-turing-imitation-game",
    authorId: "turing",
    topic: "方法",
    text: "我提议思考这个问题：“机器能思考吗？”这应当从界定“机器”和“思考”这两个词的含义开始。",
    english:
      "I propose to consider the question, ‘Can machines think?’ This should begin with definitions of the meaning of the terms ‘machine’ and ‘think’.",
    editorialSummary: "与其先给“思考”下一个无法达成共识的定义，不如把问题改造成具有明确参与者与判准的模仿游戏。",
    englishEditorialSummary:
      "Instead of first defining “thinking” where agreement is unlikely, the question can be recast as an imitation game with specified participants and criteria.",
    work: "《计算机器与智能》",
    englishWork: "Computing Machinery and Intelligence",
    presentationNature: "source-excerpt",
    reflection:
      "图灵用操作性问题替换“机器能思考吗”，以便讨论能够推进。模仿游戏不是关于智能的终极定义，也不能独自回答意识、理解或道德地位等所有问题。",
    englishReflection:
      "Turing replaced “Can machines think?” with an operational question that could sustain inquiry. The imitation game is neither a final definition of intelligence nor a complete answer about consciousness, understanding, or moral status.",
    question: "当一个问题被定义争论卡住时，怎样的可操作改写能让探究继续？",
    englishQuestion:
      "When a dispute over definitions stalls a question, what operational reformulation could move inquiry forward?",
    sourceLocator: [
      "《Mind》第59卷第236期（1950），第433页，第1节开篇连续两句",
      "Mind 59, no. 236 (1950), p. 433, §1, opening two continuous sentences",
    ],
  },
  {
    id: "science-turing-morphogenesis",
    authorId: "turing",
    topic: "生命",
    text:
      "这样的系统，尽管起初可能相当均匀，后来也可能由于均匀平衡的不稳定性而发展出图样或结构，而这种不稳定性由随机扰动触发。",
    english:
      "Such a system, although it may originally be quite homogeneous, may later develop a pattern or structure due to an instability of the homogeneous equilibrium, which is triggered off by random disturbances.",
    editorialSummary:
      "相互扩散并彼此反应的化学物质，可以让原本近乎均匀的系统自行放大微小扰动，形成有序图样。",
    englishEditorialSummary:
      "Chemicals that diffuse and react with one another can make an almost uniform system amplify small disturbances and generate ordered patterns.",
    work: "《形态发生的化学基础》",
    englishWork: "The Chemical Basis of Morphogenesis",
    presentationNature: "source-excerpt",
    reflection:
      "图灵给出了反应—扩散系统如何从对称状态产生空间结构的数学机制。它是一类形态发生模型，不是声称生物的一切形状都由两个化学方程单独决定。",
    englishReflection:
      "Turing provided a mathematical mechanism by which reaction–diffusion systems can generate spatial structure from a symmetric state. It is a class of morphogenetic models, not a claim that two chemical equations alone determine every biological form.",
    context:
      "论文摘要先把这里的系统界定为在组织中相互反应并扩散的化学物质（图灵称之为形态素），随后以引句说明均匀系统怎样在随机扰动触发失稳后形成图样。摘要接着说明论文以孤立的细胞环细察反应—扩散系统，重点是失稳的开始；正文第1节又明确说胚胎模型是简化与理想化，因而也会失真。",
    englishContext:
      "The abstract first defines the system as chemical substances—Turing calls them morphogens—that react together and diffuse through a tissue. The quoted sentence then states how a homogeneous system may form a pattern when random disturbances trigger an instability. The abstract next says that reaction–diffusion systems are examined through the mathematically convenient case of an isolated ring of cells, with the onset of instability as the chief concern; Section 1 explicitly calls the embryo model a simplification and idealization, and consequently a falsification.",
    distinction:
      "这里的随机扰动触发的是均匀平衡已经具备条件发生的失稳，并不独自提供图样的全部秩序。引句也没有声称所有生物形态都能被这一机制穷尽；摘要所说的是提出一类足以解释主要形态发生现象的系统。卡片摘要中的“自行放大”和局部机制是对论文动力学的研读概括，不是引句逐字措辞。",
    englishDistinction:
      "The random disturbances trigger an instability for which the homogeneous equilibrium already has the relevant conditions; they do not by themselves supply all the order in the pattern. Nor does the sentence claim that this mechanism exhausts every biological form: the abstract proposes a class of systems adequate to account for the main phenomena of morphogenesis. The summary's language of amplification and local mechanism is a study interpretation of the paper's dynamics, not wording in the excerpt.",
    question: "秩序一定需要中心设计者吗，还是局部规则也能把微小差异放大成形？",
    englishQuestion:
      "Does order require a central designer, or can local rules amplify tiny differences into form?",
    sourceLocator: [
      "《皇家学会哲学汇刊B》237卷641期（1952），摘要，印刷页37（存档PDF第2页），第二个完整连续句，全文引用；按quotation exception以署名、精确定位、最小必要的32词短引作研读评论",
      "Philosophical Transactions of the Royal Society B 237(641) (1952), abstract, print p. 37 (archived PDF p. 2), second complete continuous sentence, quoted in full; used under the quotation exception as an attributed, precisely located, minimally necessary 32-word excerpt for study and commentary",
    ],
  },

  {
    id: "science-shannon-message-not-meaning",
    authorId: "shannon",
    topic: "方法",
    text: "重要之处在于，实际消息是从一组可能的消息中选出的一条。",
    english:
      "The significant aspect is that the actual message is one selected from a set of possible messages.",
    editorialSummary: "通信工程首先处理从一组可能消息中选择并可靠再现哪一条，而不是判定消息有多深刻。",
    englishEditorialSummary:
      "Communication engineering first asks which message was selected from a set of possibilities and how reliably it can be reproduced, not how profound that message is.",
    work: "《通信的数学理论》",
    englishWork: "A Mathematical Theory of Communication",
    presentationNature: "source-excerpt",
    reflection:
      "香农有意把语义问题暂时排除，才得以统一分析电报、声音和图像的传输。信息论中的“信息”因而是受明确定义的技术量，不能不加说明地等同于意义、知识或真理。",
    englishReflection:
      "Shannon deliberately bracketed semantics so that telegraphy, speech, and images could be analyzed within one framework. “Information” in this theory is therefore a precisely defined technical quantity, not an unqualified synonym for meaning, knowledge, or truth.",
    question: "把意义暂时搁置，能让你精确解决什么问题，又会遗漏什么？",
    englishQuestion:
      "What can you solve precisely by bracketing meaning, and what does that choice leave out?",
    sourceLocator: [
      "1948年原刊导言，第379页；Harvard 托管的勘误重印本第1页，关于消息从可能集合中被选择的连续短句；权利状态依司法辖区而异",
      "1948 original article, Introduction, p. 379; corrected reprint hosted by Harvard, p. 1, short continuous sentence on a message being selected from a possible set; rights status varies by jurisdiction",
    ],
  },
  {
    id: "science-shannon-entropy",
    authorId: "shannon",
    topic: "不确定",
    text: "当所有事件等可能时，可能事件越多，选择或不确定性就越大。",
    english:
      "With equally likely events there is more choice, or uncertainty, when there are more possible events.",
    editorialSummary: "消息来源越难预测，平均每个符号携带的选择不确定度就越高。",
    englishEditorialSummary:
      "The less predictable a source is, the greater the average uncertainty carried by each symbol choice.",
    work: "《通信的数学理论》",
    englishWork: "A Mathematical Theory of Communication",
    presentationNature: "source-excerpt",
    reflection:
      "香农熵根据可能结果及其概率刻画平均不确定度，并满足连续性、可加性等要求。高熵不自动意味着内容更有价值，只意味着在这个概率模型下更难预先猜中。",
    englishReflection:
      "Shannon entropy characterizes average uncertainty from possible outcomes and their probabilities, satisfying requirements such as continuity and composition. High entropy does not automatically make content more valuable; it makes the next choice harder to predict under the model.",
    context:
      "本句是第6节为不确定度函数H提出的第二项要求。第一项要求H随概率连续变化；本项只处理n个事件等可能的情形，要求可选事件越多，H越大；第三项再要求一次选择若能分解成连续选择，总不确定度应等于各阶段不确定度的加权和。香农随后由这三项要求推出等概率时H与log n成正比。",
    englishContext:
      "This sentence is the second of the three requirements imposed on an uncertainty measure H in §6. The first requires continuity in the probabilities; this one treats only n equally likely events and requires H to increase with the number of possibilities; the third requires a choice decomposed into successive choices to have the corresponding weighted sum of uncertainties. Shannon then derives that, for equally likely events, H is proportional to log n.",
    distinction:
      "这里的“选择”是概率模型中从可能事件集合实现一个结果，不是在讨论人的自由意志；“更多事件带来更大不确定性”也明确以等可能为条件。若概率高度不均，单纯增加极小概率事件并不能由本句直接判断熵怎样变化，更不能据此把高熵等同于高价值、高意义或真实世界的一切复杂性。",
    englishDistinction:
      "‘Choice’ here means realization of one outcome from a probabilistic set, not human free will, and the claim that more events bring more uncertainty is explicitly conditioned on equal likelihood. When probabilities are highly unequal, this sentence alone does not determine how adding tiny-probability events changes entropy. Nor does it identify high entropy with greater value, meaning, or every kind of real-world complexity.",
    question: "你把“意外”“复杂”“有价值”混在一起使用时，真正想衡量的是哪一个？",
    englishQuestion:
      "When you mix surprise, complexity, and value, which one are you actually trying to measure?",
    sourceLocator: [
      "第一部分第6节“选择、不确定性与熵”，原刊第393页；Harvard 托管的勘误重印本第10页，性质2的连续短句；权利状态依司法辖区而异",
      "Part I, §6, ‘Choice, Uncertainty and Entropy,’ original p. 393; corrected reprint hosted by Harvard, p. 10, short continuous sentence in property 2; rights status varies by jurisdiction",
    ],
  },
  {
    id: "science-shannon-noisy-channel",
    authorId: "shannon",
    topic: "模型",
    text: "若 H ≤ C，则存在一种编码系统，使信源的输出可以经该信道传输，且错误频率（或疑义度）可以任意小。",
    english:
      "If H ≤ C there exists a coding system such that the output of the source can be transmitted over the channel with an arbitrarily small frequency of errors (or an arbitrarily small equivocation).",
    editorialSummary: "只要传输速率低于信道容量，加入足够长而有结构的编码，就能把噪声中的出错概率压得任意小。",
    englishEditorialSummary:
      "When the transmission rate stays below channel capacity, sufficiently long and structured coding can make the probability of error arbitrarily small despite noise.",
    work: "《通信的数学理论》",
    englishWork: "A Mathematical Theory of Communication",
    presentationNature: "source-excerpt",
    reflection:
      "有噪信道编码定理把可靠通信的可能性与容量界限同时说清楚：噪声并不迫使每条消息都出错，但可靠性需要速率与编码代价。定理保证合适编码存在，并不自动给出现实中最短、最快的编码器。",
    englishReflection:
      "The noisy-channel coding theorem states both the possibility and the limit of reliable communication: noise need not corrupt every message, but reliability costs rate and coding structure. The theorem establishes that suitable codes exist; it does not by itself supply the shortest or fastest practical encoder.",
    context:
      "第12节先把有噪离散信道的容量C定义为可传输信息率的上界。第13节开头反驳一个直觉：若要把错误率压近零，冗余未必必须无限增加并把传输率压近零。定理11随后把信源熵率H同容量C比较；本句给出H≤C时的可达部分，定理紧接着还给出H>C时无法把疑义度降到H−C以下的限制。后面的证明主要确立合适编码存在，第14节说明按证明直接寻找实用编码通常不可行。",
    englishContext:
      "Section 12 defines the capacity C of a discrete noisy channel as a limiting information rate. At the start of §13 Shannon rejects the intuition that driving error toward zero must require unbounded redundancy and a rate tending to zero. Theorem 11 then compares source entropy rate H with C. This sentence states the achievable H ≤ C case; the theorem immediately adds that when H > C, equivocation cannot be reduced below H − C. The proof chiefly establishes the existence of suitable codes, and §14 notes that following it directly is generally impractical for constructing one.",
    distinction:
      "“错误可以任意小”不是说有限长度、有限延迟或任意指定编码都能零错误，也不是说可以超过信道容量而不付代价。结论依赖足够长且与信道统计结构相配的编码，并在渐近意义上成立；H、C的单位和建模假设也必须相容。定理证明的是可达边界与存在性，不自动给出现实系统的最优算法、时延或成本。",
    englishDistinction:
      "‘Arbitrarily small’ does not mean zero error at finite block length or delay, success for any chosen code, or cost-free transmission above capacity. The result is asymptotic and relies on sufficiently long codes matched to the channel's statistical structure, with compatible units and modeling assumptions for H and C. It establishes an achievable boundary and existence, not the optimal practical algorithm, latency, or cost for a real system.",
    question: "面对噪声，你是在追求零干扰，还是设计一种能容忍干扰的结构？",
    englishQuestion:
      "Faced with noise, are you seeking a world without disturbance, or designing a structure that can tolerate it?",
    sourceLocator: [
      "第二部分第13节，定理11，原刊第411页；Harvard 托管的勘误重印本第22页，H ≤ C 情形的连续短句；权利状态依司法辖区而异",
      "Part II, §13, Theorem 11, original p. 411; corrected reprint hosted by Harvard, p. 22, short continuous sentence for the H ≤ C case; rights status varies by jurisdiction",
    ],
  },
  {
    id: "science-shannon-redundancy",
    authorId: "shannon",
    topic: "证据",
    text: "这意味着，当我们用英语写作时，写下的一半由语言结构所决定，另一半则是自由选择的。",
    english:
      "This means that when we write English half of what we write is determined by the structure of the language and half is chosen freely.",
    editorialSummary: "语言中的统计冗余让后续字母部分可预测，也因此同时创造了压缩与纠错的空间。",
    englishEditorialSummary:
      "Statistical redundancy in language makes later letters partly predictable, creating room for both compression and error correction.",
    work: "《通信的数学理论》",
    englishWork: "A Mathematical Theory of Communication",
    presentationNature: "source-excerpt",
    reflection:
      "这里约50%的估计明确未计入超过约八个字母距离的统计结构。香农用不同阶的英语近似与猜字实验估计语言结构所减少的不确定度。冗余不是简单的废话；在不同任务中，它既可能被压缩，也可能成为抵抗噪声的资源。",
    englishReflection:
      "The roughly 50% estimate here explicitly excludes statistical structure over distances greater than about eight letters. Shannon used successive approximations to English and letter-guessing experiments to estimate how linguistic structure reduces uncertainty. Redundancy is not merely waste: depending on the task, it can be compressed or used as a resource against noise.",
    context:
      "第7节先以信源实际熵同同一符号表可有的最大熵之比定义“相对熵”，再把1减相对熵定义为“冗余”。香农估计普通英语在不计约八个字母以上远距离结构时冗余约为50%，本句紧接着用一半受语言结构约束、一半可自由选择来解释这个比值。下文列出英语近似、删字恢复和密码学等估计路径，并讨论冗余同纵横填字及抗噪的关系。",
    englishContext:
      "Section 7 first defines relative entropy as a source's actual entropy divided by the maximum possible with the same symbol set, then defines redundancy as one minus relative entropy. Shannon estimates ordinary English redundancy at roughly 50% when statistical structure beyond about eight letters is excluded. This sentence immediately glosses that ratio as one half constrained by language structure and one half freely chosen. The following paragraphs mention successive approximations to English, letter-restoration tests, and cryptographic methods, then connect redundancy with crosswords and resistance to noise.",
    distinction:
      "这里的“决定”与“自由选择”是统计约束的通俗说明，不是说每句话恰好有一半由语法机械写成、另一半体现作者自由，更不是自由意志结论。50%是受语料、字母层级、估计方法与有限统计距离约束的近似值；它也不把所有冗余判为浪费，因为同一结构既可能被压缩，也可能帮助接收端在噪声中复原消息。",
    englishDistinction:
      "‘Determined’ and ‘chosen freely’ are an informal gloss on statistical constraint. They do not divide each sentence into one half mechanically written by grammar and one half expressing an author's freedom, and they make no claim about free will. Fifty percent is an approximation conditioned on corpus, letter-level modeling, estimation method, and limited statistical distance. It also does not make all redundancy waste: the same structure may be compressed or may help a receiver reconstruct a message through noise.",
    question:
      "你生活中的哪些重复看似低效，却在承担校验、容错或建立信任的作用？",
    englishQuestion:
      "Which repetitions in your life look inefficient but actually provide checking, resilience, or trust?",
    sourceLocator: [
      "第一部分第7节“信源的熵”，原刊第399页；Harvard 托管的勘误重印本第14页，解释英语约50%冗余含义的连续短句；该估计未计超过约八个字母距离的统计结构，权利状态依司法辖区而异",
      "Part I, §7, ‘The Entropy of an Information Source,’ original p. 399; corrected reprint hosted by Harvard, p. 14, short continuous sentence explaining what roughly 50% redundancy in English means; the estimate excludes statistical structure over distances greater than about eight letters, and rights status varies by jurisdiction",
    ],
  },

  {
    id: "science-wiener-control-communication",
    authorId: "wiener",
    topic: "模型",
    text: "……这一模式与实际完成的运动之间的差异，会被用作新的输入……",
    english:
      "... the difference between this pattern and the actually performed motion is used as a new input ...",
    editorialSummary:
      "无论机器、动物还是组织，控制都离不开获得状态信息，并据此调整下一步行动。",
    englishEditorialSummary:
      "Whether in machines, animals, or organizations, control depends on obtaining information about state and using it to adjust what happens next.",
    work: "《控制论：或关于动物和机器中控制与通信的科学》",
    englishWork:
      "Cybernetics: Or Control and Communication in the Animal and the Machine",
    reflection:
      "维纳把通信、预测与控制放进同一数学视野，比较不同系统中的反馈结构。相似结构有助于迁移方法，却不表示生物、社会与机器在价值和经验上毫无差别。",
    englishReflection:
      "Wiener placed communication, prediction, and control within one mathematical view, comparing feedback structures across systems. Structural analogy can transfer methods without making organisms, societies, and machines identical in value or experience.",
    question: "一个系统若无法感知自己行动的后果，它还能称为真正受控吗？",
    englishQuestion:
      "Can a system be genuinely controlled if it cannot register the consequences of its own actions?",
    presentationNature: "source-excerpt",
    context:
      "导论回顾维纳与Julian Bigelow研究防空预测时对人类操作者和机器共同构成的控制系统的分析，并把反馈称为自主活动中的极重要因素。短引来自下一句中段；前略部分设定目标为让运动遵循给定模式，后略部分说明这个新输入会使受调节部分朝着更接近该模式的方向运动，随后以船舶舵机为例。",
    englishContext:
      "The Introduction recalls Wiener's work with Julian Bigelow on antiaircraft prediction and their analysis of a control system containing both human operators and machines, then calls feedback an extremely important factor in voluntary activity. The excerpt is a medial segment of the next sentence. The omitted opening sets the aim of having a motion follow a given pattern; the omitted ending says that the new input causes the regulated part to move closer to that pattern, followed by the example of a ship's steering engine.",
    distinction:
      "短引具体描述的是以期望运动与实际运动之差作为新输入的反馈校正，没有在这一句中直接讨论组织，也没有把通信等同于控制。摘要把书名与全书跨动物、机器及社会系统的比较视野纳入研读，是比短引更宽的编辑性概括。",
    englishDistinction:
      "The excerpt specifically describes feedback correction using the difference between desired and performed motion as a new input. This sentence does not itself discuss organizations, nor does it equate communication with control. The summary incorporates the book's broader comparative program across animals, machines, and social systems and is therefore wider than the excerpt.",
    sourceLocator: [
      "MIT Press 2019年重印的1961年第二版，第一部分（1948年原版），导论，印刷页11（缓存PDF第60页）；同一句从the至input的连续16词中段，前后省略均已标明并经渲染目检；按quotation exception作署名、精确定位、最小必要短引",
      "MIT Press 2019 reissue of the 1961 second edition, Part I (original 1948 edition), Introduction, print p. 11 (cached PDF p. 60); continuous 16-word medial segment of one sentence, from ‘the’ through ‘input,’ with both omissions marked and visually checked; used under the quotation exception as an attributed, precisely located, minimally necessary excerpt",
    ],
  },
  {
    id: "science-wiener-feedback-stability",
    authorId: "wiener",
    topic: "模型",
    text: "……在存在延迟等某些条件下，过于急剧的反馈会使舵转过头……",
    english:
      "... under certain conditions of delay, etc., a feedback that is too brusque will make the rudder overshoot ...",
    editorialSummary:
      "负反馈能用偏差修正行动，但增益过强或响应延迟，也会把修正变成持续振荡甚至失控。",
    englishEditorialSummary:
      "Negative feedback can correct action by using error, yet excessive gain or delay can turn correction into persistent oscillation or instability.",
    work: "《控制论：或关于动物和机器中控制与通信的科学》",
    englishWork:
      "Cybernetics: Or Control and Communication in the Animal and the Machine",
    presentationNature: "source-excerpt",
    reflection:
      "反馈不是天然的善性循环；稳定性取决于响应强度、时间延迟和系统动力学。管理中笼统地要求“更多反馈”会遗漏最关键的问题：什么信号以多快速度改变什么行为。",
    englishReflection:
      "Feedback is not automatically beneficial; stability depends on response strength, delay, and system dynamics. A generic demand for “more feedback” misses the crucial questions of which signal changes which behavior, and how quickly.",
    context:
      "在导论的舵机例子中，维纳先说明反馈如何使舵机性能相对不受负载影响，随即用这段短引指出延迟与过猛纠偏会造成第一次过冲。原句后半继续描述反向反馈怎样把下一次过冲推得更远，直到转向机构进入剧烈振荡（hunting）并完全失灵。",
    englishContext:
      "In the Introduction's steering-engine example, Wiener first explains how feedback makes the engine's performance relatively independent of load, then uses this excerpt to identify delay and an overly brusque correction as conditions for an initial overshoot. The omitted remainder of the same sentence describes feedback in the opposite direction driving the next overshoot still farther, until the steering mechanism enters a wild oscillation or hunting and breaks down completely.",
    distinction:
      "短引不是说负反馈普遍不稳定，而是明确限定于延迟等条件以及反馈“过于急剧”。这里是舵机的定性例子，并非完整的稳定性判据；摘要中的增益与系统动力学是对控制论概念的研读展开，不是短引原词。",
    englishDistinction:
      "The excerpt does not say that negative feedback is generally unstable; it explicitly conditions the problem on delay and feedback that is ‘too brusque.’ This is a qualitative steering-engine example, not a complete stability criterion. The summary's references to gain and system dynamics are a study-level development of the control-theory point, not wording in the excerpt.",
    question:
      "你正在使用的纠偏机制，是在稳定系统，还是因延迟和过度反应制造新的摆动？",
    englishQuestion:
      "Is your corrective mechanism stabilizing the system, or creating new oscillations through delay and overreaction?",
    sourceLocator: [
      "MIT Press 2019年重印的1961年第二版，第一部分（1948年原版），导论，印刷页12（存档PDF第61页）；同一完整句中从under至overshoot的连续17词中段，前后省略均已标明并经渲染目检；按quotation exception以署名、精确定位、最小必要短引作研读评论",
      "MIT Press 2019 reissue of the 1961 second edition, Part I (original 1948 edition), Introduction, print p. 12 (archived PDF p. 61); continuous 17-word medial segment of one sentence, from ‘under’ through ‘overshoot,’ with both omissions marked and visually checked against the rendered page; used under the quotation exception as an attributed, precisely located, minimally necessary excerpt for study and commentary",
    ],
  },
  {
    id: "science-wiener-automation-responsibility",
    authorId: "wiener",
    topic: "责任",
    text:
      "……那么，我们最好十分确定，放进机器的目的正是我们真正想要的目的，而不只是它的一种花哨仿制。",
    english:
      "... then we had better be quite sure that the purpose put into the machine is the purpose which we really desire and not merely a colorful imitation of it.",
    editorialSummary:
      "把目标交给自动机器之前，人必须弄清指令的实际含义与可能后果，因为机器会忠实放大形式目标的缺陷。",
    englishEditorialSummary:
      "Before delegating a goal to an automatic machine, people must examine what the instruction means in practice and what it may cause, because a machine can faithfully amplify flaws in a formal objective.",
    work: "《自动化的一些道德与技术后果》",
    englishWork: "Some Moral and Technical Consequences of Automation",
    presentationNature: "source-excerpt",
    reflection:
      "维纳警告，学习机器和自动决策会以未被设计者充分预见的方式追求所给目标。责任不能因系统“按程序运行”而消失；目标制定、反馈选择和停止条件仍由人承担。",
    englishReflection:
      "Wiener warned that learning machines and automated decisions may pursue assigned goals in ways their designers did not fully foresee. Responsibility does not vanish because a system “followed its program”; people still choose the objective, feedback, and stopping conditions.",
    context:
      "在第1358页，维纳先用“魔法师的学徒”、渔夫与精灵和猴爪等故事说明：把彼此陌生的两个行动者联结起来追求共同目的时，若对目的沟通不完整，合作结果就会不理想。引句所在的完整条件句进一步设想一种启动后因行动太快且不可逆而无法有效干预的机械行动者；下一节把危险追溯到人和机器运作在不同时间尺度上。",
    englishContext:
      "On p. 1358, Wiener first uses the Sorcerer's Apprentice, the fisherman and genie, and the Monkey's Paw to explain the danger of coupling two agencies foreign to each other in pursuit of a common purpose: incomplete communication about that purpose makes unsatisfactory cooperation predictable. The full conditional sentence containing the excerpt then supposes a mechanical agency whose action is too fast and irrevocable for effective intervention after it starts. The following section traces the danger to humans and machines operating on different time scales.",
    distinction:
      "引句是一个条件句的连续末段，开头省略号标示前面的“启动后无法有效干预”条件已省去。“花哨仿制”指形式化目标可能只像人真正想要的目的，而不等同于机器具有自己的欲望或理解；维纳也不是据此反对一切自动化。摘要关于后果与目标缺陷被放大的说法来自全文例证的研读概括，不是这29词短引逐字内容。",
    englishDistinction:
      "The excerpt is the continuous terminal portion of a conditional sentence; the leading ellipsis marks the preceding condition about being unable to intervene effectively after the agency starts. A ‘colorful imitation’ is a formalized purpose that may only resemble what people actually want; it does not attribute independent desire or understanding to the machine, and Wiener is not rejecting all automation. The summary's language about consequences and amplified objective flaws interprets the article's examples; it is not wording in this 29-word excerpt.",
    question:
      "如果一个系统精确实现了错误目标，责任应落在执行者、设计者，还是设定目标的人？",
    englishQuestion:
      "If a system precisely achieves the wrong objective, does responsibility lie with the executor, the designer, or the person who set the goal?",
    sourceLocator: [
      "《科学》131卷3410期（1960年5月6日），印刷页1358（存档PDF第5页）中栏；同一条件句中从then开始的连续末段，开头省略号标示句首条件已省去；按quotation exception以署名、精确定位、最小必要的29词短引作研读评论",
      "Science 131(3410) (6 May 1960), print p. 1358 (archived PDF p. 5), middle column; continuous terminal portion of the same conditional sentence beginning with ‘then,’ with a leading ellipsis marking the excluded opening condition; used under the quotation exception as an attributed, precisely located, minimally necessary 29-word excerpt for study and commentary",
    ],
  },

  {
    id: "science-popper-induction",
    authorId: "popper",
    topic: "方法",
    text: "……无论我们观察过多少只白天鹅，也不能据此证成所有天鹅都是白的结论。",
    english:
      "... no matter how many instances of white swans we may have observed, this does not justify the conclusion that all swans are white.",
    editorialSummary:
      "无论观察过多少只白天鹅，有限个案都不能在逻辑上最终证明一个无例外的普遍定律。",
    englishEditorialSummary:
      "However many white swans have been observed, finite instances cannot logically establish a universal law with no exceptions.",
    work: "《科学发现的逻辑》",
    englishWork: "The Logic of Scientific Discovery",
    presentationNature: "source-excerpt",
    reflection:
      "波普尔用归纳问题反对把科学合理性建立在“重复越多就被证明”上。科学仍会从经验中学习，但学习表现为提出、检验和修正猜想，而不是把有限观察变成逻辑必然。",
    englishReflection:
      "Popper used the problem of induction against grounding scientific rationality in the idea that repetition eventually proves a law. Science still learns from experience, but through proposing, testing, and revising conjectures rather than turning finite observations into logical necessity.",
    context:
      "在第1节，波普尔先把归纳推理界定为从观察或实验结果等单称陈述走向假说或理论等全称陈述。引句是同一长句冒号后的天鹅例；下一句把这种推理能否、在何种条件下得到证成称为“归纳问题”，随后说明经验报告首先只能是单称而非全称陈述。",
    englishContext:
      "In Section 1, Popper first defines inductive inference as moving from singular statements, such as reports of observations or experiments, to universal statements, such as hypotheses or theories. The excerpt is the swan example after the colon in the same long sentence. The next sentence names the question whether, or under what conditions, such inferences are justified as the problem of induction; the following paragraph says that an account of experience can initially be only singular, not universal.",
    distinction:
      "这段话否定的是有限个单称观察对全称结论的逻辑证成，不是说观察毫无作用，也没有断言下一只天鹅很可能不是白的。项目关于提出、检验和修正猜想的说明来自全书的方法论，不在这一短分句中；开头省略号明确标出同句前文被删。",
    englishDistinction:
      "The passage denies that finitely many singular observations logically justify a universal conclusion. It does not make observation useless or claim that the next swan is likely to be non-white. The project's account of proposing, testing, and revising conjectures draws on the book's wider methodology, not this short clause; the leading ellipsis marks the omitted opening of the same sentence.",
    question:
      "你有多大把握，是因为证据真正排除了替代解释，还是只是同类经验重复得很多？",
    englishQuestion:
      "Does your confidence come from evidence that excludes alternatives, or merely from many repetitions of similar experience?",
    sourceLocator: [
      "Routledge Classics 2002年版，第1节“归纳问题”，印刷页4（全书PDF第33页）；同一长句冒号后的连续末分句，开头省略号标示删去同句前文；按quotation exception以署名、定位、最小必要的23词短引作研读评论",
      "Routledge Classics edition (2002), §1, ‘The Problem of Induction,’ print p. 4 (full-book PDF p. 33); continuous terminal clause after the colon in one longer sentence, with a leading ellipsis marking the omitted opening; used under the quotation exception as an attributed, located, minimally necessary 23-word excerpt for study and commentary",
    ],
  },
  {
    id: "science-popper-falsifiability",
    authorId: "popper",
    topic: "方法",
    text: "经验科学体系必须有可能被经验反驳。",
    english:
      "it must be possible for an empirical scientific system to be refuted by experience.",
    editorialSummary:
      "经验理论要成为可检验的科学主张，必须允许某些可能观察与它冲突，而不是把每种结果都解释成支持。",
    englishEditorialSummary:
      "For an empirical theory to be scientifically testable, it must allow some possible observations to conflict with it rather than interpreting every outcome as support.",
    work: "《科学发现的逻辑》",
    englishWork: "The Logic of Scientific Discovery",
    reflection:
      "可证伪性是关于理论逻辑结构的划界标准，不是说科学家见到一个反常数据就必须立刻抛弃整套理论。真实检验还涉及测量可靠性、辅助假设与结果能否重复。",
    englishReflection:
      "Falsifiability is a criterion about the logical structure of a theory, not a command to discard an entire theory at the first anomalous datum. Actual tests also depend on measurement reliability, auxiliary assumptions, and reproducibility.",
    question:
      "什么结果会让你承认自己的观点需要改变，而不是再补一个解释把它保护起来？",
    englishQuestion:
      "What result would make you revise your view instead of adding another explanation to protect it?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "Routledge 2002 年版，第 6 节“可证伪性作为划界标准”，第 41 页页首第一段；原句冒号后的完整连续末分句",
      "Routledge edition (2002), §6, ‘Falsifiability as a Criterion of Demarcation,’ p. 41, first paragraph at the top of the page; complete continuous terminal clause after the colon",
    ],
  },
  {
    id: "science-popper-empirical-risk",
    authorId: "popper",
    topic: "证据",
    text: "……一条陈述禁止得越多，它对经验世界所说的也就越多。",
    english:
      "... the more a statement forbids, the more it says about the world of experience.",
    editorialSummary:
      "理论的经验内容来自它排除了哪些可能事件；预言越精确，失败的风险也越清楚。",
    englishEditorialSummary:
      "A theory gains empirical content from the possible events it rules out; the more precise its predictions, the clearer the risk of failure.",
    work: "《科学发现的逻辑》",
    englishWork: "The Logic of Scientific Discovery",
    presentationNature: "source-excerpt",
    reflection:
      "如果一套说法与任何可想象结果都兼容，经验就无法在支持与反对之间做出区分。风险较高并不保证理论为真，却让证据真正有机会发挥约束作用。",
    englishReflection:
      "If a claim is compatible with every imaginable outcome, experience cannot distinguish support from failure. Greater risk does not guarantee truth, but it gives evidence a real opportunity to constrain the theory.",
    context:
      "第31节先用理论所排除的潜在证伪者范围比较可证伪程度，并说理论排除的基本陈述越多，其经验内容越大。第35节开篇以引句重述这一关系，紧接着把陈述的经验内容定义为其潜在证伪者的集合；第36节再说明，在可比较时，更高的普遍性或精确性对应更大的经验内容与更高的可检验性。",
    englishContext:
      "Section 31 first compares degrees of falsifiability through the ranges of potential falsifiers a theory excludes and says that excluding more basic statements gives a theory more empirical content. Section 35 opens by restating that relation in the quoted clause, then defines a statement's empirical content as the class of its potential falsifiers. Section 36 adds that, when statements are comparable, higher universality or precision corresponds to greater empirical content and testability.",
    distinction:
      "这里的“禁止”是技术用语，指与陈述不相容的潜在基本陈述或事件，不是道德或法律禁令；“说得更多”指经验内容较大，不等于更重要、更可信或更接近真理。原文短引本身没有提到精确预言，摘要中的这一点来自第36节；可证伪风险更高也不保证理论为真，比较还受陈述能否比较及测量精度限制。",
    englishDistinction:
      "Here ‘forbids’ is technical: it concerns potential basic statements or events incompatible with a claim, not moral or legal prohibition. ‘Says more’ means greater empirical content, not greater importance, credibility, or truth. The short excerpt itself does not mention precise predictions; that part of the summary comes from Section 36. Greater exposure to falsification does not guarantee truth, and comparisons depend on comparability and attainable measurement precision.",
    question: "你的说法究竟禁止了什么发生，还是它只会在事后适应一切？",
    englishQuestion:
      "What does your claim actually forbid from happening, or can it accommodate everything after the fact?",
    sourceLocator: [
      "Routledge Classics 2002年版，第35节“经验内容、蕴涵与可证伪程度”，印刷页103（全书PDF第132页）；开篇首句冒号后的连续末分句，开头省略号标示同句前文被删；按quotation exception以署名、定位、最小必要的14词短引作研读评论",
      "Routledge Classics edition (2002), §35, ‘Empirical Content, Entailment, and Degrees of Falsifiability,’ print p. 103 (full-book PDF p. 132); continuous terminal clause after the colon in the section's opening sentence, with a leading ellipsis marking the omitted opening; used under the quotation exception as an attributed, located, minimally necessary 14-word excerpt for study and commentary",
    ],
  },
  {
    id: "science-popper-intersubjective-testing",
    authorId: "popper",
    topic: "证据",
    text: "因此我要说，科学陈述的客观性在于它们能够接受主体间检验。",
    english:
      "I shall therefore say that the objectivity of scientific statements lies in the fact that they can be inter-subjectively tested.",
    editorialSummary:
      "科学的客观性不要求研究者没有立场，而要求主张能接受他人重复、批评与公共检验。",
    englishEditorialSummary:
      "Scientific objectivity does not require investigators to have no standpoint; it requires claims to remain open to repetition, criticism, and public testing by others.",
    work: "《科学发现的逻辑》",
    englishWork: "The Logic of Scientific Discovery",
    presentationNature: "source-excerpt",
    reflection:
      "波普尔把客观性更多放在可相互检查的方法和制度中，而非个人内心的绝对中立。共同检验也不会自动消除偏见，它需要公开程序、可复现记录和允许反对者进入。",
    englishReflection:
      "Popper located objectivity chiefly in methods and institutions of mutual checking rather than in perfect neutrality inside an individual mind. Collective testing does not automatically erase bias; it requires open procedures, reproducible records, and access for critics.",
    context:
      "第8节先区分不能证明陈述的主观经验或确信感，与科学陈述体系之间的客观逻辑关系；引句据此把客观性落在主体间可检验性上。该页脚注把这一表述推广为主体间批评，即借批判性讨论进行相互理性控制；下一页再以可重复实验说明观察如何原则上能由任何人检验。",
    englishContext:
      "Section 8 first distinguishes subjective experiences or feelings of conviction, which cannot justify a statement, from objective logical relations among systems of scientific statements. The excerpt accordingly locates objectivity in inter-subjective testability. A note on the same page generalizes this to inter-subjective criticism, or mutual rational control by critical discussion; the next page uses repeatable experiments to explain how observations can in principle be tested by anyone.",
    distinction:
      "主体间可检验不等于研究者没有立场，也不等于多数同意便构成真理；它要求他人能检查推导、条件与可重复结果，并继续提出批评。摘要和反思关于公开制度、记录与反对者进入的说法，是从脚注的批判性讨论向制度条件作出的研读延伸，并非引句逐字内容；可重复也不要求脱离明确条件机械复制每个细节。",
    englishDistinction:
      "Inter-subjective testability does not require investigators to be viewpoint-free, nor does majority agreement make a claim true. Others must be able to inspect derivations, conditions, and reproducible results and to continue criticism. The summary's language about open institutions, records, and access for critics extends the note's critical discussion toward institutional conditions; it is not wording in the quoted sentence. Reproducibility also does not mean mechanically duplicating every detail without specified conditions.",
    question: "你的结论能否被一个不同意你的人按同样步骤检查？",
    englishQuestion:
      "Can someone who disagrees with you examine your conclusion by following the same steps?",
    sourceLocator: [
      "Routledge Classics 2002年版，第8节“科学客观性与主观确信”，印刷页22（全书PDF第51页）；脚注1之前的单个完整连续句；按quotation exception以署名、定位、最小必要的20词短引作研读评论",
      "Routledge Classics edition (2002), §8, ‘Scientific Objectivity and Subjective Conviction,’ print p. 22 (full-book PDF p. 51); one complete continuous sentence immediately before note *1; used under the quotation exception as an attributed, located, minimally necessary 20-word excerpt for study and commentary",
    ],
  },

  {
    id: "science-kuhn-normal-science",
    authorId: "kuhn",
    topic: "方法",
    text:
      "把一个常规研究问题做到底，就是以一种新的方式达到预期结果；这要求解决各式各样复杂的仪器、概念和数学谜题。",
    english:
      "Bringing a normal research problem to a conclusion is achieving the anticipated in a new way, and it requires the solution of all sorts of complex instrumental, conceptual, and mathematical puzzles.",
    editorialSummary:
      "常规科学通常不是每天推翻基础，而是在共享范式提供的规则与范例中解决高难度谜题。",
    englishEditorialSummary:
      "Normal science does not usually overthrow its foundations each day; it solves demanding puzzles within rules and exemplars supplied by a shared paradigm.",
    work: "《科学革命的结构》",
    englishWork: "The Structure of Scientific Revolutions",
    presentationNature: "source-excerpt",
    reflection:
      "库恩所说的常规科学是高度集中的累积研究，它能提高测量精度、扩展应用并暴露细小异常。把它理解成盲从会遗漏范式为何能组织长期协作，也会遗漏这种集中同时怎样限制可见问题。",
    englishReflection:
      "Kuhn's normal science is concentrated, cumulative research that refines measurements, extends applications, and exposes subtle anomalies. Calling it mere conformity misses both how a paradigm organizes sustained collaboration and how that focus limits which problems become visible.",
    context:
      "第四章先说，常规研究往往不以重大的概念或现象新奇为目标；结果有时可以预期得非常细，但如何达到结果仍很不确定。引句据此把完成常规研究描述为以新方式达到预期，并强调其中要解开复杂的仪器、概念与数学谜题；随后段落解释“谜题”须有可预期的解和约束合格解法的规则。",
    englishContext:
      "Chapter IV first says that normal research often aims at little major conceptual or phenomenal novelty. Its outcome can sometimes be anticipated in great detail while the way to achieve it remains very much in doubt. The quoted sentence accordingly describes completion as achieving the anticipated in a new way and stresses the complex instrumental, conceptual, and mathematical puzzles involved. The following paragraphs explain that a puzzle must have an assured solution and rules constraining admissible solutions.",
    distinction:
      "“预期结果”不等于机械照做；引句强调的正是达到结果的路径仍需要高难度解谜。它描述的是常规科学阶段，不是说科学基础永远不会改变，也不是说范式之外不存在异常。摘要关于共享范式、规则与范例的表述综合了第三至四章及第二版后记，不是引句逐字内容。",
    englishDistinction:
      "An anticipated result does not make the work mechanical; the sentence emphasizes the demanding puzzle-solving still required to reach it. It describes the phase of normal science, not a claim that scientific foundations never change or that no anomalies exist outside a paradigm. The summary's references to a shared paradigm, rules, and exemplars synthesize Chapters III–IV and the second-edition Postscript; they are not wording in the quoted sentence.",
    question:
      "一个共同框架是在帮助团队深入，还是已经让框架之外的问题无法被看见？",
    englishQuestion:
      "Is a shared framework helping a community go deeper, or making questions outside it impossible to see?",
    sourceLocator: [
      "芝加哥大学出版社1970年扩充第二版，第四章“常规科学即解谜”，印刷页36（存档PDF第48页）；单个完整连续句，全文引用；按quotation exception以署名、精确定位、最小必要的31词短引作研读评论",
      "University of Chicago Press, enlarged second edition (1970), Chapter IV, ‘Normal Science as Puzzle-solving,’ print p. 36 (archived PDF p. 48); one complete continuous sentence, quoted in full; used under the quotation exception as an attributed, precisely located, minimally necessary 31-word excerpt for study and commentary",
    ],
  },
  {
    id: "science-kuhn-anomaly-discovery",
    authorId: "kuhn",
    topic: "证据",
    text: "发现始于对异常的察觉，也就是认识到自然在某种程度上违背了支配常规科学的、由范式诱发的预期。",
    english:
      "Discovery commences with the awareness of anomaly, i.e., with the recognition that nature has somehow violated the paradigm-induced expectations that govern normal science.",
    editorialSummary:
      "异常并不会在第一次出现时自动成为发现；它要经过识别、反复探索和概念调整，才可能改写研究对象。",
    englishEditorialSummary:
      "An anomaly does not automatically become a discovery at first sight; recognition, sustained exploration, and conceptual adjustment may be needed before it reshapes the object of research.",
    work: "《科学革命的结构》",
    englishWork: "The Structure of Scientific Revolutions",
    reflection:
      "库恩用氧气、X 射线等案例说明，发现既包含“发生了什么”的事实变化，也包含“那是什么”的概念变化。原句只界定发现的起点；持续探索与范式调整由紧随其后的句子展开。异常可能是误差、待解谜题或危机线索，不能仅凭惊讶程度预先决定。",
    englishReflection:
      "Through cases such as oxygen and X-rays, Kuhn showed that discovery changes both the fact of what occurred and the concept of what it was. The quoted sentence defines only the starting point of discovery; the immediately following sentences develop sustained exploration and paradigm adjustment. An anomaly may be an error, an unresolved puzzle, or a sign of crisis; surprise alone does not decide which.",
    question:
      "你正在忽略的反常，是噪声、尚未解决的谜题，还是旧框架无法命名的新现象？",
    englishQuestion:
      "Is the anomaly you are ignoring noise, an unsolved puzzle, or a new phenomenon the old framework cannot name?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "芝加哥大学出版社 1970 年增订第二版，第六章“异常与科学发现的涌现”，第 52 页末至第 53 页首；同一完整句跨页连续",
      "University of Chicago Press, second enlarged edition (1970), Chapter VI, ‘Anomaly and the Emergence of Scientific Discoveries,’ bottom of p. 52 through the first line of p. 53; one complete continuous sentence across the page break",
    ],
  },
  {
    id: "science-kuhn-paradigm-change",
    authorId: "kuhn",
    topic: "模型",
    text: "尽管如此，范式变化确实会使科学家以不同方式看待其研究活动所面对的世界。",
    english:
      "Nevertheless, paradigm changes do cause scientists to see the world of their research-engagement differently.",
    editorialSummary:
      "科学革命不只是给旧事实换一个答案，它还会改变哪些问题重要、哪些对象相似，以及什么算合格解释。",
    englishEditorialSummary:
      "A scientific revolution does more than supply new answers to old facts; it can alter which questions matter, which objects count as similar, and what qualifies as an explanation.",
    work: "《科学革命的结构》",
    englishWork: "The Structure of Scientific Revolutions",
    presentationNature: "source-excerpt",
    reflection:
      "范式变化牵动概念、仪器实践和评价标准，因此不同框架之间的比较可能需要翻译与重建。库恩并非主张证据毫无作用或理论选择只是个人口味；他是在说明证据总由训练和问题结构组织。",
    englishReflection:
      "Paradigm change reaches concepts, instrumental practices, and standards of appraisal, so comparison across frameworks may require translation and reconstruction. Kuhn did not say evidence is powerless or theory choice a matter of taste; he showed that evidence is organized by training and problem structure.",
    context:
      "第十章开篇先说，新范式会引导科学家采用新仪器、到新地方寻找，并使他们用熟悉仪器观察熟悉场所时看见新的、不同的东西。库恩随即否认科学共同体真的被地理搬迁到另一个星球，本句则在这一限定之后说明研究世界如何显得不同；下文以鸭兔图与科学训练中的视觉转换展开这个比喻。",
    englishContext:
      "Chapter X opens by saying that a new paradigm leads scientists to adopt new instruments, look in new places, and see new and different things with familiar instruments in places examined before. Kuhn then denies that the community is literally transported to another planet. This sentence follows that qualification and states how the world of research appears differently; the discussion proceeds through duck-rabbit and training-induced transformations of vision.",
    distinction:
      "这里的“不同”不是说物理世界被字面替换；同页明确说并未发生那种地理移植，后文还说革命后的科学家仍在看同一个世界。它描述的是由范式组织的观察、分类与实践发生变化，也不等于证据任意、所有解释同样有效或框架之间绝对无法比较。",
    englishDistinction:
      "‘Differently’ does not mean that the physical world is literally replaced: the same page explicitly denies any such geographical transplantation, and Kuhn later says the postrevolutionary scientist is still looking at the same world. The claim concerns paradigm-organized observation, classification, and practice; it does not make evidence arbitrary, all interpretations equally good, or comparison across frameworks absolutely impossible.",
    question: "当争论双方连“好问题”和“好答案”的标准都不同，比较应从哪里开始？",
    englishQuestion:
      "When disputants differ even about what counts as a good question and a good answer, where should comparison begin?",
    sourceLocator: [
      "芝加哥大学出版社1970年扩充第二版，第十章“革命是世界观的改变”，印刷页111（存档PDF第123页）；同一完整连续14词句，全文引用并经渲染目检；按quotation exception以署名、精确定位、最小必要短引作研读评论",
      "University of Chicago Press, enlarged second edition (1970), Chapter X, ‘Revolutions as Changes of World View,’ print p. 111 (archived PDF p. 123); one complete continuous 14-word sentence, quoted in full and visually checked against the rendered page; used under the quotation exception as an attributed, precisely located, minimally necessary excerpt for study and commentary",
    ],
  },

  {
    id: "science-feynman-seeking-laws",
    authorId: "feynman",
    topic: "方法",
    text: "然后我们把计算结果同自然、同实验或经验相比较，直接同观察相比较，看看它是否成立。",
    english:
      "Then we compare the result of the computation to nature, with experiment or experience, compare it directly with observation, to see if it works.",
    editorialSummary:
      "寻找新定律要经历提出猜想、推导可观察后果，再与实验比较；若结果不符，猜想就必须面对失败。",
    englishEditorialSummary:
      "Seeking a new law involves proposing a conjecture, deriving observable consequences, and comparing them with experiment; if the consequences disagree, the conjecture must face failure.",
    work: "《物理定律的特性》第七讲：寻找新定律",
    englishWork: "The Character of Physical Law, Lecture 7: Seeking New Laws",
    presentationNature: "source-excerpt",
    reflection:
      "费曼强调，猜想来自何处并不能替代它与现实的比较，权威和优雅也不能豁免检验。这个简图揭示检验的核心，却不意味着一次复杂实验无需统计、仪器校准和背景理论就能独立裁决。",
    englishReflection:
      "Feynman stressed that a conjecture's origin cannot replace comparison with nature, and neither authority nor elegance earns exemption from testing. The sketch captures the core of testing without implying that one complex experiment can judge alone, apart from statistics, calibration, and background theory.",
    context:
      "第七讲在讨论现有理论仍有不一致与未知之后，费曼用一个简图说明寻找新定律：先猜想，再计算这个猜想若为真会推出什么，接着就是本句所说的同自然与观察比较。下一句才给出“不符合实验就是错的”的著名判语；他随后立即补充，实验报告、未察觉因素和推导计算都要反复检查，而且实验也可能在理论尚无猜想时带来意外发现。",
    englishContext:
      "After discussing inconsistencies and unknowns in current theory, Lecture 7 sketches how a new law is sought: first guess, then compute what the guess would imply if right, and then perform the comparison with nature and observation stated here. Only the next sentence gives the famous verdict that disagreement with experiment makes it wrong. Feynman immediately adds that reports, unnoticed features, and calculations must be checked repeatedly, and that experiment can also produce an unexpected discovery before theorists have guessed it.",
    distinction:
      "本句是检验循环的一步，不是完整而机械的科学算法，也没有说观察完全脱离仪器、统计与背景理论。旧命题中的“若结果不符，猜想必须面对失败”来自紧随其后的句子并作为编辑性摘要保存；它不应被误读为任何单次、未经复核的异常结果都能独自终结理论。",
    englishDistinction:
      "This sentence is one step in a testing cycle, not a complete mechanical algorithm for science, and it does not make observation independent of instruments, statistics, or background theory. The old proposition's statement that a failed comparison confronts the conjecture comes from the immediately following sentence and is preserved as an editorial summary. It should not be read as allowing any single unchecked anomaly to terminate a theory by itself.",
    question: "你最珍惜的解释，能够推出什么可能让它失败的具体结果？",
    englishQuestion:
      "What concrete result could follow from your favorite explanation and show that it fails?",
    sourceLocator: [
      "BBC 1965年初版、MIT Press 1985年第12次印刷本，第七讲“寻找新定律”，印刷页156（存档PDF第159页）；同一完整连续24词句，全文引用并经渲染目检；按quotation exception以署名、精确定位、最小必要短引作研读评论",
      "BBC first edition (1965), checked in the MIT Press twelfth printing (1985), Lecture 7, ‘Seeking New Laws,’ print p. 156 (archived PDF p. 159); one complete continuous 24-word sentence, quoted in full and visually checked against the rendered page; used under the quotation exception as an attributed, precisely located, minimally necessary excerpt for study and commentary",
    ],
  },
  {
    id: "science-feynman-quantum-probability",
    authorId: "feynman",
    topic: "不确定",
    text: "然而科学仍照常前进——即使相同条件并不总会产生相同结果。",
    english:
      "Yet science goes on in spite of it — although the same conditions do not always produce the same results.",
    editorialSummary:
      "量子理论对单次事件给出概率，而对大量重复实验给出稳定分布；不确定并不妨碍精确的统计检验。",
    englishEditorialSummary:
      "Quantum theory assigns probabilities to individual events while predicting stable distributions over repeated trials; uncertainty does not prevent precise statistical tests.",
    work: "《物理定律的特性》第六讲：概率与不确定性",
    englishWork:
      "The Character of Physical Law, Lecture 6: Probability and Uncertainty",
    presentationNature: "source-excerpt",
    reflection:
      "费曼借双缝与干涉说明，量子概率的组合规则不同于对普通未知路径的经典概率相加。概率语言不是研究者随意降低标准，而是理论把可检验规律放在重复事件的分布上。",
    englishReflection:
      "Using two-path interference, Feynman showed that quantum probabilities combine differently from classical probabilities over merely unknown routes. Probabilistic language does not lower standards at will; the theory locates testable regularity in distributions over repeated events.",
    context:
      "第六讲先用双缝实验比较子弹、水波与电子，并用各位置单位时间的计数来构造到达概率。印刷页146至147页，费曼论证在保留干涉的装置中，无法预先知道单个电子将从哪一孔出现；在引用“科学存在要求相同条件总产生相同结果”的说法后，他以本句回应。下文转而强调，科学所需条件要由自然决定，并要求可实验、诚实报告与持续累积结果。",
    englishContext:
      "Lecture 6 first compares bullets, water waves, and electrons in the two-slit experiment, constructing arrival probabilities from counts per unit time at different detector positions. On print pp. 146–147 Feynman argues that, in an arrangement retaining interference, one cannot know in advance behind which hole an individual electron will appear. After quoting the claim that science requires the same conditions always to produce the same results, he answers with this sentence. The following paragraph says that science's requirements must be determined by nature, while insisting on experiment, honest reporting, and cumulative results.",
    distinction:
      "“相同条件并不总产生相同结果”针对这里的单次量子事件，不是否定实验方法或概率分布应当可复现，也不是说任何结果都可以。旧命题把本讲前面对重复计数、概率幅与干涉的论证综合为“长期分布可稳定检验”，因此作为编辑性摘要保存，而不是冒充本句逐字内容。",
    englishDistinction:
      "‘The same conditions do not always produce the same results’ concerns an individual quantum event here; it does not deny reproducibility of method or probability distribution, and it does not make every outcome equally acceptable. The old proposition synthesizes the lecture's earlier discussion of repeated counts, probability amplitudes, and interference into the claim that long-run distributions can be tested, so it is preserved as an editorial summary rather than presented as wording from this sentence.",
    question:
      "如果单次无法预测，但长期分布极其稳定，你会把这种规律称为知识吗？",
    englishQuestion:
      "If individual outcomes cannot be predicted but long-run distributions are highly stable, would you call that regularity knowledge?",
    sourceLocator: [
      "BBC 1965年初版、MIT Press 1985年第12次印刷本，第六讲“概率与不确定性”，印刷页147（存档PDF第150页）；同一完整连续19词句，全文引用并经渲染目检；按quotation exception以署名、精确定位、最小必要短引作研读评论",
      "BBC first edition (1965), checked in the MIT Press twelfth printing (1985), Lecture 6, ‘Probability and Uncertainty,’ print p. 147 (archived PDF p. 150); one complete continuous 19-word sentence, quoted in full and visually checked against the rendered page; used under the quotation exception as an attributed, precisely located, minimally necessary excerpt for study and commentary",
    ],
  },
  {
    id: "science-feynman-scientific-integrity",
    authorId: "feynman",
    topic: "责任",
    text: "凡是可能使你的解释受到怀疑的细节，只要你知道，就必须交代。",
    english:
      "Details that could throw doubt on your interpretation must be given, if you know them.",
    editorialSummary:
      "科学诚实不仅是报告支持自己的结果，还要主动说明可能让结论失效的条件、反例与不确定处。",
    englishEditorialSummary:
      "Scientific integrity means more than reporting favorable results; it requires disclosing conditions, counterevidence, and uncertainties that could undermine the conclusion.",
    work: "《草包族科学》",
    englishWork: "Cargo Cult Science",
    reflection:
      "费曼把这种责任称为一种不欺骗自己的彻底诚实，并以实验史说明选择性报告如何制造可靠性的外观。它不要求研究者把所有细节无差别堆出，而要求对会改变读者判断的信息保持透明。",
    englishReflection:
      "Feynman described this responsibility as an exacting honesty that begins with not fooling oneself, using experimental history to show how selective reporting can imitate reliability. It does not require an indiscriminate dump of detail, but transparency about information that could change a reader's judgment.",
    question: "如果必须替自己的结论写一段最有力的限制说明，你会承认什么？",
    englishQuestion:
      "If you had to write the strongest limitations paragraph for your own conclusion, what would you admit?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "《Engineering and Science》第 37 卷第 7 期（1974 年 6 月），第 11 页右栏中部，单个完整连续句",
      "Engineering and Science 37, no. 7 (June 1974), p. 11, middle of the right column, one complete continuous sentence",
    ],
  },
  {
    id: "science-feynman-value-of-doubt",
    authorId: "feynman",
    topic: "责任",
    text: "我们发现，为了取得进展，我们必须承认无知并为怀疑留出余地，这是至关重要的。",
    english:
      "We have found it of paramount importance that in order to progress we must recognize the ignorance and leave room for doubt.",
    editorialSummary:
      "科学知识伴随不确定性；诚实保留怀疑，才能让后来者继续检查、纠错并发现新的可能。",
    englishEditorialSummary:
      "Scientific knowledge comes with uncertainty; honestly preserving doubt allows others to keep checking, correcting, and discovering new possibilities.",
    work: "《科学的价值》",
    englishWork: "The Value of Science",
    presentationNature: "source-excerpt",
    reflection:
      "费曼把承认无知看成科学传统的重要价值，因为开放问题为下一步探索留下空间。纪律化的怀疑不是对所有证据一概不信，而是让确信程度与证据强度相称。",
    englishReflection:
      "Feynman treated acknowledged ignorance as a major value of the scientific tradition because open questions preserve room for further inquiry. Disciplined doubt is not indiscriminate disbelief; it proportions confidence to the strength of evidence.",
    context:
      "这篇1955年演讲先谈科学作为可善用也可恶用的能力，以及探索带来的智性乐趣；随后转向第三种价值：科学家长期面对无知、疑惑与不确定性的经验。引句紧接他对“不知道”“有所猜测”“相当确定但仍有怀疑”的区分，下一句把科学知识描述为确定程度不一、没有一项绝对确定的陈述集合。",
    englishContext:
      "This 1955 address first discusses science as an enabling power that may be used well or badly, then the intellectual enjoyment of inquiry. It next turns to a third value: scientists' experience with ignorance, doubt, and uncertainty. The excerpt follows Feynman's distinctions among not knowing, having a hunch, and being fairly sure while retaining some doubt; the next sentence describes scientific knowledge as statements with varying degrees of certainty, none absolutely certain.",
    distinction:
      "这里的“承认无知”是对具体未知保持诚实，不是宣称一切知识都不可靠，也不要求在行动前消除所有怀疑。引句本身只说进展需要为怀疑留出余地；摘要关于后来者继续检查、纠错和发现可能性的表述，来自演讲后文关于讨论、改善方案、把问题留给未来世代的责任，是研读概括而非逐字内容。",
    englishDistinction:
      "Recognizing ignorance here means honesty about specific unknowns, not declaring all knowledge unreliable or requiring every doubt to disappear before action. The sentence itself says only that progress requires room for doubt. The summary's language about later investigators checking, correcting, and discovering possibilities synthesizes the address's later discussion of debate, improving solutions, and responsibility to future generations; it is not wording in the excerpt.",
    question: "你能否在采取行动的同时，为尚未确定的部分保留被纠正的空间？",
    englishQuestion:
      "Can you act while still leaving room for the uncertain parts of your view to be corrected?",
    sourceLocator: [
      "加州理工学院《Engineering and Science》第19卷第3期（1955年12月），费曼《科学的价值》，印刷页14（原刊PDF第2页）右栏下部；单个完整连续22词句；按quotation exception以署名、定位、最小必要短引作研读评论",
      "Caltech, Engineering and Science 19, no. 3 (December 1955), Feynman, ‘The Value of Science,’ print p. 14 (original-magazine PDF p. 2), lower right column; one complete continuous 22-word sentence; used under the quotation exception as an attributed, located, minimally necessary quotation for study and commentary",
    ],
  },
] satisfies readonly ScienceThoughtSeed[];
