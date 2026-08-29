import type {
  EconomicsAuthorProfile,
  EconomicsThoughtSeed,
} from "./economicsCorpusTypes";

/**
 * Modern economic-thought cards are bilingual editorial paraphrases.
 * The passage locators identify the primary arguments being interpreted;
 * none of the card text should be presented as a verbatim quotation.
 */
export const economicsModernProfiles = {
  coase: {
    name: "科斯",
    englishName: "Ronald Coase",
    life: "1910—2013",
    englishLife: "1910–2013",
    school: "新制度经济学与法经济学",
    englishSchool: "New Institutional Economics and Law & Economics",
    palette: ["#e7e1d6", "#bba98f", "#76624b", "#29231d"],
  },
  simon: {
    name: "赫伯特·西蒙",
    englishName: "Herbert A. Simon",
    life: "1916—2001",
    englishLife: "1916–2001",
    school: "有限理性与组织理论",
    englishSchool: "Bounded Rationality and Organization",
    palette: ["#e0e5e3", "#a7b5af", "#63766f", "#232a27"],
  },
  ostrom: {
    name: "埃莉诺·奥斯特罗姆",
    englishName: "Elinor Ostrom",
    life: "1933—2012",
    englishLife: "1933–2012",
    school: "制度分析与公共资源治理",
    englishSchool: "Institutional Analysis and Commons Governance",
    palette: ["#e1e7dc", "#aab99c", "#677957", "#252b20"],
  },
  sen: {
    name: "阿马蒂亚·森",
    englishName: "Amartya Sen",
    life: "1933—",
    englishLife: "1933–",
    school: "福利经济学与能力方法",
    englishSchool: "Welfare Economics and the Capability Approach",
    palette: ["#e8dfd5", "#bea48d", "#7d6049", "#2c241e"],
  },
  north: {
    name: "道格拉斯·诺思",
    englishName: "Douglass C. North",
    life: "1920—2015",
    englishLife: "1920–2015",
    school: "新制度经济学与经济史",
    englishSchool: "New Institutional Economics and Economic History",
    palette: ["#e4e1d9", "#b4ab96", "#706752", "#28251f"],
  },
  friedman: {
    name: "米尔顿·弗里德曼",
    englishName: "Milton Friedman",
    life: "1912—2006",
    englishLife: "1912–2006",
    school: "货币主义与价格理论",
    englishSchool: "Monetarism and Price Theory",
    palette: ["#e1e5e8", "#a6b2bb", "#61717d", "#23282c"],
  },
  solow: {
    name: "罗伯特·索洛",
    englishName: "Robert M. Solow",
    life: "1924—2023",
    englishLife: "1924–2023",
    school: "增长理论与宏观经济学",
    englishSchool: "Growth Theory and Macroeconomics",
    palette: ["#e5e4dc", "#b6b29a", "#737056", "#282820"],
  },
  romer: {
    name: "保罗·罗默",
    englishName: "Paul M. Romer",
    life: "1955—",
    englishLife: "1955–",
    school: "内生增长理论",
    englishSchool: "Endogenous Growth Theory",
    palette: ["#dde7e6", "#9fb9b6", "#597a77", "#222b2a"],
  },
  kahnemanTversky: {
    name: "卡尼曼与特沃斯基",
    englishName: "Daniel Kahneman & Amos Tversky",
    life: "1934—2024；1937—1996",
    englishLife: "1934–2024; 1937–1996",
    school: "行为决策理论",
    englishSchool: "Behavioral Decision Theory",
    palette: ["#e5dfe7", "#b4a7ba", "#725f7d", "#28232c"],
  },
  akerlof: {
    name: "乔治·阿克洛夫",
    englishName: "George A. Akerlof",
    life: "1940—",
    englishLife: "1940–",
    school: "信息经济学",
    englishSchool: "Information Economics",
    palette: ["#e7e2d9", "#baac94", "#78684e", "#2b271f"],
  },
  stiglitz: {
    name: "约瑟夫·斯蒂格利茨",
    englishName: "Joseph E. Stiglitz",
    life: "1943—",
    englishLife: "1943–",
    school: "信息经济学与公共经济学",
    englishSchool: "Information Economics and Public Economics",
    palette: ["#dfe5e8", "#a2b1ba", "#5e707d", "#22292e"],
  },
  minsky: {
    name: "海曼·明斯基",
    englishName: "Hyman P. Minsky",
    life: "1919—1996",
    englishLife: "1919–1996",
    school: "金融不稳定与后凯恩斯主义",
    englishSchool: "Financial Instability and Post-Keynesian Economics",
    palette: ["#e6dddd", "#b99f9f", "#795b5c", "#2b2223"],
  },
  piketty: {
    name: "托马斯·皮凯蒂",
    englishName: "Thomas Piketty",
    life: "1971—",
    englishLife: "1971–",
    school: "不平等与政治经济学",
    englishSchool: "Inequality and Political Economy",
    palette: ["#e7ded8", "#bea393", "#7f614f", "#2d241f"],
  },
  hirschman: {
    name: "阿尔伯特·赫希曼",
    englishName: "Albert O. Hirschman",
    life: "1915—2012",
    englishLife: "1915–2012",
    school: "发展经济学与政治经济学",
    englishSchool: "Development Economics and Political Economy",
    palette: ["#e4e5dc", "#afb39a", "#6d7256", "#272920"],
  },
  acemogluRobinson: {
    name: "阿西莫格鲁与罗宾逊",
    englishName: "Daron Acemoglu & James A. Robinson",
    life: "1967—；1960—",
    englishLife: "1967–; 1960–",
    school: "制度与发展",
    englishSchool: "Institutions and Development",
    palette: ["#e0e3e7", "#a4acb8", "#626d7b", "#24282d"],
  },
  thaler: {
    name: "理查德·塞勒",
    englishName: "Richard H. Thaler",
    life: "1945—",
    englishLife: "1945–",
    school: "行为经济学",
    englishSchool: "Behavioral Economics",
    palette: ["#e4e1e8", "#afa7bb", "#6b627d", "#26232c"],
  },
} satisfies Record<string, EconomicsAuthorProfile>;

export const economicsModernSeeds = [
  {
    id: "economics-coase-firm-transaction-costs",
    authorId: "coase",
    topic: "市场",
    text: "企业之所以出现，不只是因为有人擅长管理，而是因为每一次都通过市场发现价格、谈判和签约本身也有成本。",
    english:
      "Firms arise not merely because some people manage well, but because discovering prices, bargaining, and contracting through the market each time are themselves costly.",
    work: "《企业的性质》",
    englishWork: "The Nature of the Firm",
    reflection:
      "科斯把企业与市场看成两种都有代价的协调方式。企业扩张到哪里，取决于内部组织下一笔交易的成本，何时不再低于通过市场完成它的成本。",
    englishReflection:
      "Coase treated firms and markets as two costly forms of coordination. A firm's boundary depends on when organizing one more transaction internally ceases to be cheaper than arranging it through the market.",
    question: "你习以为常的一项内部流程，如果改由市场交易完成，会减少成本还是增加摩擦？",
    englishQuestion:
      "For a familiar internal process, would moving it to the market reduce costs or create more friction?",
    sourceLocator: [
      "第 I—II 节，《经济学刊》1937 年第 4 卷第 16 期，第 386—405 页",
      "Sections I–II, Economica 4(16), 1937, pp. 386–405",
    ],
  },
  {
    id: "economics-coase-reciprocal-harm",
    authorId: "coase",
    topic: "制度",
    text: "外部损害不是单向问题：阻止一方造成损害，也会限制另一方的行动；制度选择要比较不同安排下的总成本。",
    english:
      "External harm is not one-directional: preventing one party from causing harm also constrains another party's action, so institutional choices require comparing total costs under alternative arrangements.",
    work: "《社会成本问题》",
    englishWork: "The Problem of Social Cost",
    reflection:
      "在交易成本为零的抽象基准里，权利重新协商可能使资源流向高价值用途；现实中谈判、信息与执行都有成本，因此法律最初如何配置权利会影响结果。",
    englishReflection:
      "In the abstract benchmark of zero transaction costs, bargaining may redirect resources toward higher-valued uses. In reality, negotiation, information, and enforcement are costly, so the law's initial allocation of rights can shape outcomes.",
    question: "面对冲突时，你是否比较过规则本身的执行成本，而不只判断哪一方更有道理？",
    englishQuestion:
      "When facing a conflict, have you compared the enforcement costs of the rules themselves rather than only deciding which side is right?",
    sourceLocator: [
      "第 I—II、VI—VII 节，《法律与经济学杂志》1960 年第 3 卷",
      "Sections I–II and VI–VII, Journal of Law and Economics 3, 1960",
    ],
  },

  {
    id: "economics-simon-satisficing",
    authorId: "simon",
    topic: "行为",
    text: "现实决策者很少列尽所有方案并求出最优解；他们设定可接受门槛，搜索到足够好的方案便停止。",
    english:
      "Real decision makers rarely enumerate every option and calculate an optimum; they set an aspiration level and stop searching when they find an option that is good enough.",
    work: "《理性选择的行为模型》",
    englishWork: "A Behavioral Model of Rational Choice",
    reflection:
      "有限理性并不等于人必然愚蠢，而是说计算能力、信息与时间共同塑造可行的选择程序。所谓满意化，是一种在约束下组织搜索的方法。",
    englishReflection:
      "Bounded rationality does not mean that people are necessarily foolish. It means that computational capacity, information, and time shape feasible choice procedures; satisficing organizes search under those constraints.",
    question: "你现在追求的“最好”，是否值得继续搜索所付出的时间与注意力？",
    englishQuestion:
      "Is the 'best' you are pursuing worth the additional time and attention required to keep searching?",
    sourceLocator: [
      "第 1—3 节，《经济学季刊》1955 年第 69 卷第 1 期，第 99—118 页",
      "Sections 1–3, Quarterly Journal of Economics 69(1), 1955, pp. 99–118",
    ],
  },
  {
    id: "economics-simon-organizational-attention",
    authorId: "simon",
    topic: "制度",
    text: "组织不仅执行已经做出的选择，也通过流程、分工和信息通道决定成员能看见什么、优先处理什么。",
    english:
      "Organizations do more than execute choices already made: through routines, divisions of labor, and information channels, they shape what members notice and address first.",
    work: "《企业组织中的理性决策》",
    englishWork: "Rational Decision-Making in Business Organizations",
    reflection:
      "组织规则是理性的支架，也可能成为盲点的来源。改进决策不只需要更聪明的个人，还要重新设计注意力、反馈与纠错如何在组织中流动。",
    englishReflection:
      "Organizational rules support rationality but can also create blind spots. Better decisions require more than smarter individuals; they require redesigning how attention, feedback, and correction move through the organization.",
    question: "你所在的组织奖励人们注意什么，又让哪些重要信号长期无人看见？",
    englishQuestion:
      "What does your organization reward people for noticing, and which important signals remain unseen?",
    sourceLocator: [
      "诺贝尔讲座第 3—5 节；《美国经济评论》1979 年第 69 卷第 4 期",
      "Nobel lecture, Sections 3–5; American Economic Review 69(4), 1979",
    ],
  },

  {
    id: "economics-ostrom-design-principles",
    authorId: "ostrom",
    topic: "制度",
    text: "公共资源能够被长期共同治理，往往因为边界、规则、监督、渐进制裁和冲突解决彼此配合，而非依赖单一万能制度。",
    english:
      "Common-pool resources can be governed durably when boundaries, rules, monitoring, graduated sanctions, and conflict resolution reinforce one another, rather than through one universal institution.",
    work: "《公共事物的治理之道》",
    englishWork: "Governing the Commons",
    reflection:
      "这些设计原则是跨案例识别出的共同条件，不是可以机械复制的清单。规则是否有效，还取决于它与当地生态、知识和参与者之间的适配。",
    englishReflection:
      "These design principles are recurring conditions identified across cases, not a checklist to copy mechanically. Rules work only insofar as they fit local ecologies, knowledge, and participants.",
    question: "一套看似完善的规则，是否真正让受影响的人参与制定、监督与修正？",
    englishQuestion:
      "Does an apparently complete rule system actually let affected people participate in making, monitoring, and revising it?",
    sourceLocator: [
      "第 3 章，尤其第 88—102 页（制度设计原则）",
      "Chapter 3, especially pp. 88–102 (institutional design principles)",
    ],
  },
  {
    id: "economics-ostrom-polycentric-governance",
    authorId: "ostrom",
    topic: "制度",
    text: "复杂公共问题未必只能在市场与国家之间二选一；多个尺度上的自治中心可以合作、竞争并相互纠错。",
    english:
      "Complex public problems need not force a binary choice between market and state; autonomous centers operating at multiple scales can cooperate, compete, and correct one another.",
    work: "《超越市场与国家：复杂经济系统的多中心治理》",
    englishWork:
      "Beyond Markets and States: Polycentric Governance of Complex Economic Systems",
    reflection:
      "多中心不等于把责任切碎后无人负责。它要求不同层级拥有真实行动能力，同时有共享信息、争端处理和跨层协调的机制。",
    englishReflection:
      "Polycentricity does not mean fragmenting responsibility until no one is accountable. Centers need genuine capacity to act, along with mechanisms for shared information, dispute resolution, and coordination across levels.",
    question: "你面对的问题中，哪些决定应留在本地，哪些必须交由更大尺度协调？",
    englishQuestion:
      "In the problem you face, which decisions should remain local, and which require coordination at a larger scale?",
    sourceLocator: [
      "2009 年诺贝尔讲座第 2—5 节",
      "2009 Nobel lecture, Sections 2–5",
    ],
  },

  {
    id: "economics-sen-equality-capabilities",
    authorId: "sen",
    topic: "分配",
    text: "比较平等不能只数每个人拥有多少资源，还要看不同的人能把资源转化为哪些真实可行的生活选择。",
    english:
      "Equality cannot be assessed only by counting each person's resources; it must also ask what real possibilities different people can convert those resources into.",
    work: "《什么的平等？》",
    englishWork: "Equality of What?",
    reflection:
      "相同收入可能因健康、照护责任、环境与社会障碍而产生不同自由。能力方法因此把注意力从手段移向人实际能够成为和做到什么。",
    englishReflection:
      "The same income can yield different freedoms because of health, care responsibilities, environment, and social barriers. The capability approach therefore shifts attention from means to what people are actually able to be and do.",
    question: "一项看似一视同仁的安排，是否让处境不同的人获得了相近的真实机会？",
    englishQuestion:
      "Does an apparently equal arrangement give people in different circumstances genuinely comparable opportunities?",
    sourceLocator: [
      "坦纳讲座第一讲第 3—4 节（基本能力与平等评价）",
      "Tanner Lecture I, Sections 3–4 (basic capability and evaluating equality)",
    ],
  },
  {
    id: "economics-sen-development-freedom",
    authorId: "sen",
    topic: "分配",
    text: "发展不仅是收入上升，也是在教育、健康、参与和免于匮乏等方面扩大人们的实质自由。",
    english:
      "Development is not only rising income; it is the expansion of substantive freedoms in education, health, participation, and freedom from deprivation.",
    work: "《以自由看待发展》",
    englishWork: "Development as Freedom",
    reflection:
      "自由在这里既是发展的目的，也是促进发展的手段。收入仍然重要，但要通过它是否解除不自由、扩大行动能力来判断其发展意义。",
    englishReflection:
      "Freedom is both an end of development and a means to it. Income still matters, but its developmental significance depends on whether it removes unfreedoms and expands people's agency.",
    question: "如果增长没有扩大多数人的选择空间，你仍会把它称为充分的发展吗？",
    englishQuestion:
      "If growth does not widen most people's range of choices, would you still call it adequate development?",
    sourceLocator: [
      "第 1 章第 3—11 页（发展作为自由扩展）",
      "Chapter 1, pp. 3–11 (development as the expansion of freedom)",
    ],
  },

  {
    id: "economics-north-rules-and-organizations",
    authorId: "north",
    topic: "制度",
    text: "制度是约束互动的规则，组织则是在这些规则下追求目标的行动者；两者相互作用，改变经济激励。",
    english:
      "Institutions are the rules that constrain interaction, while organizations are actors pursuing goals under those rules; their interaction changes economic incentives.",
    work: "《制度、制度变迁与经济绩效》",
    englishWork: "Institutions, Institutional Change and Economic Performance",
    reflection:
      "把制度与组织分开，可以避免把法律文本、企业和政府部门混成一个概念。组织会投资于规则所奖励的技能，也会试图改变对自己不利的规则。",
    englishReflection:
      "Separating institutions from organizations prevents legal rules, firms, and agencies from collapsing into one concept. Organizations invest in capacities rewarded by the rules and also try to alter rules that disadvantage them.",
    question: "你想改变的是某个组织的表现，还是让所有组织作出类似选择的底层规则？",
    englishQuestion:
      "Are you trying to change one organization's performance, or the underlying rules that induce many organizations to behave similarly?",
    sourceLocator: [
      "第 1 章第 3—10 页（制度、组织与交换成本）",
      "Chapter 1, pp. 3–10 (institutions, organizations, and the costs of exchange)",
    ],
  },
  {
    id: "economics-north-path-dependence-beliefs",
    authorId: "north",
    topic: "制度",
    text: "制度变迁沿着历史路径展开，因为既有组织、共同信念与学习方式会让某些选择不断自我强化。",
    english:
      "Institutional change unfolds along historical paths because existing organizations, shared beliefs, and modes of learning can repeatedly reinforce particular choices.",
    work: "《经济绩效的历时考察》",
    englishWork: "Economic Performance Through Time",
    reflection:
      "路径依赖不等于历史把未来完全锁死。它提醒我们，低效制度也可能因协调成本、既得利益和认知框架而持续，改革必须处理这些延续机制。",
    englishReflection:
      "Path dependence does not mean that history completely determines the future. It explains how inefficient institutions can persist through coordination costs, vested interests, and mental models that reform must confront.",
    question: "今天看似自然的规则，有多少只是过去一次选择被反复加固的结果？",
    englishQuestion:
      "How many rules that seem natural today are the accumulated result of an earlier choice being repeatedly reinforced?",
    sourceLocator: [
      "第 I—III 节，《美国经济评论》1994 年第 84 卷第 3 期，第 359—368 页",
      "Sections I–III, American Economic Review 84(3), 1994, pp. 359–368",
    ],
  },

  {
    id: "economics-friedman-monetary-limits",
    authorId: "friedman",
    topic: "货币",
    text: "货币政策能影响名义变量并在短期扰动现实活动，却不能永久钉住一个与经济结构不相容的实际就业或实际利率。",
    english:
      "Monetary policy can affect nominal variables and disturb real activity in the short run, but it cannot permanently peg real employment or real interest rates at levels inconsistent with economic structure.",
    work: "《货币政策的作用》",
    englishWork: "The Role of Monetary Policy",
    reflection:
      "政策能够做什么与不能做什么必须分开。意外的货币变化可能暂时改变产出和就业，但一旦工资、价格与预期调整，这种实际效果不会无限延续。",
    englishReflection:
      "What policy can do must be separated from what it cannot do. Unexpected monetary changes may temporarily alter output and employment, but those real effects do not persist indefinitely once wages, prices, and expectations adjust.",
    question: "当短期有效的工具被当作永久方案时，哪些调整迟早会削弱它？",
    englishQuestion:
      "When a short-run tool is treated as a permanent solution, which adjustments will eventually weaken it?",
    sourceLocator: [
      "第 II—III 节，《美国经济评论》1968 年第 58 卷第 1 期，第 1—17 页",
      "Sections II–III, American Economic Review 58(1), 1968, pp. 1–17",
    ],
  },
  {
    id: "economics-friedman-inflation-expectations",
    authorId: "friedman",
    topic: "货币",
    text: "通胀与失业之间没有可供政策永久利用的固定交换关系，因为人们会把持续通胀纳入工资、价格和契约预期。",
    english:
      "There is no fixed inflation-unemployment trade-off that policy can exploit permanently, because people incorporate persistent inflation into wage, price, and contract expectations.",
    work: "《通货膨胀与失业》",
    englishWork: "Inflation and Unemployment",
    reflection:
      "预期调整使同样的名义刺激在不同历史条件下产生不同后果。这并不意味着宏观政策毫无作用，而是反对把一条短期经验关系当作稳定菜单。",
    englishReflection:
      "Expectations make the same nominal stimulus produce different results under different historical conditions. This does not make macroeconomic policy powerless; it rejects treating a short-run empirical relation as a stable menu.",
    question: "如果人们已经预见到你的干预，他们的提前反应会怎样改写结果？",
    englishQuestion:
      "If people already anticipate your intervention, how will their advance responses alter its outcome?",
    sourceLocator: [
      "1976 年诺贝尔讲座第 II—IV 节；《政治经济学杂志》1977 年第 85 卷第 3 期",
      "1976 Nobel lecture, Sections II–IV; Journal of Political Economy 85(3), 1977",
    ],
  },

  {
    id: "economics-solow-capital-steady-state",
    authorId: "solow",
    topic: "增长",
    text: "当其他条件不变时，持续增加每名劳动者使用的资本会遇到收益递减，经济因而趋向由储蓄、人口与技术共同决定的稳定路径。",
    english:
      "Other things equal, continually adding capital per worker encounters diminishing returns, so the economy tends toward a steady path shaped jointly by saving, population, and technology.",
    work: "《经济增长理论的一项贡献》",
    englishWork: "A Contribution to the Theory of Economic Growth",
    reflection:
      "索洛模型不是说增长终将停止，而是区分资本深化带来的过渡增长与人均产出长期持续增长的来源。后者需要模型之外或后来被内生化的技术进步。",
    englishReflection:
      "The Solow model does not say growth must cease. It separates transitional growth from capital deepening and the source of sustained long-run growth in output per person, which requires technological progress outside the original model or later made endogenous.",
    question: "你的增长来自一次性增加投入，还是来自能持续改变生产方式的机制？",
    englishQuestion:
      "Does your growth come from a one-time increase in inputs, or from a mechanism that can keep changing how production works?",
    sourceLocator: [
      "第 I—III 节，《经济学季刊》1956 年第 70 卷第 1 期，第 65—94 页",
      "Sections I–III, Quarterly Journal of Economics 70(1), 1956, pp. 65–94",
    ],
  },
  {
    id: "economics-solow-growth-residual",
    authorId: "solow",
    topic: "增长",
    text: "仅凭可测资本投入的增加，解释不了劳动生产率的大部分长期变化；剩余部分提示技术与组织方式的重要性。",
    english:
      "Increases in measured capital alone cannot explain much of the long-run change in labor productivity; the remainder points to the importance of technology and organization.",
    work: "《技术变化与总量生产函数》",
    englishWork: "Technical Change and the Aggregate Production Function",
    reflection:
      "增长核算中的“剩余”是模型未由投入增长解释的部分，并不是一只被直接测量出的技术盒子。测量误差、质量变化与遗漏因素也会进入其中。",
    englishReflection:
      "The growth-accounting residual is what input growth leaves unexplained within the model, not a directly measured box called technology. Measurement error, quality change, and omitted factors can enter it as well.",
    question: "当一个模型留下很大的“其他”部分时，你会把它命名为答案，还是把它当作新的问题？",
    englishQuestion:
      "When a model leaves a large 'other' component, do you name it as an answer or treat it as a new question?",
    sourceLocator: [
      "全文，尤其第 312—316 页的增长核算与残差估计",
      "Entire article, especially pp. 312–316 on growth accounting and the residual estimate",
    ],
  },

  {
    id: "economics-romer-knowledge-spillovers",
    authorId: "romer",
    topic: "增长",
    text: "企业创造的知识可能溢出给他人使用，使整个经济的学习收益超过单个投资者能独占的回报。",
    english:
      "Knowledge created by one firm can spill over for others to use, making economy-wide learning gains larger than the return any one investor can capture.",
    work: "《递增收益与长期增长》",
    englishWork: "Increasing Returns and Long-Run Growth",
    reflection:
      "知识外溢为长期增长避免简单收益递减提供了机制，也制造了私人激励不足的问题。但外溢的大小与传播方式需要经验识别，不能被当作所有创新政策的空白支票。",
    englishReflection:
      "Knowledge spillovers provide a mechanism by which long-run growth may escape simple diminishing returns, while also creating insufficient private incentives. Their magnitude and transmission still require evidence; they are not a blank check for every innovation policy.",
    question: "一项创造的价值如果大多由旁人获得，谁还有动力支付最初的试错成本？",
    englishQuestion:
      "If most of an invention's value accrues to others, who has an incentive to pay the initial cost of experimentation?",
    sourceLocator: [
      "导言及第 I—II 节，《政治经济学杂志》1986 年第 94 卷第 5 期",
      "Introduction and Sections I–II, Journal of Political Economy 94(5), 1986",
    ],
  },
  {
    id: "economics-romer-nonrival-ideas",
    authorId: "romer",
    topic: "增长",
    text: "思想与配方可以被多人同时使用而不相互耗尽，但创造新思想需要资源；这种非竞争性改变了增长与市场结构。",
    english:
      "Ideas and designs can be used simultaneously by many people without being depleted, yet creating new ideas consumes resources; this nonrivalry changes both growth and market structure.",
    work: "《内生技术变化》",
    englishWork: "Endogenous Technological Change",
    reflection:
      "思想的非竞争性并不等于它们天然免费或无法排他。专利、保密和市场力量会影响创新回报，因此知识政策要在传播与激励之间寻找制度平衡。",
    englishReflection:
      "Nonrivalry does not mean ideas are naturally free or impossible to exclude others from. Patents, secrecy, and market power shape returns to innovation, so knowledge policy must balance diffusion with incentives.",
    question: "对于复制成本接近于零的成果，什么样的产权边界既鼓励创造又不阻碍传播？",
    englishQuestion:
      "For an output whose copying cost approaches zero, what boundary of ownership encourages creation without obstructing diffusion?",
    sourceLocator: [
      "第 1—2 节，《政治经济学杂志》1990 年第 98 卷第 5 期第二部分",
      "Sections 1–2, Journal of Political Economy 98(5), Part 2, 1990",
    ],
  },

  {
    id: "economics-kahneman-tversky-representativeness",
    authorId: "kahnemanTversky",
    topic: "行为",
    text: "人们常用“像不像某种典型”来判断概率，却因此忽略基础概率、样本大小与随机波动。",
    english:
      "People often judge probability by how closely something resembles a prototype, thereby neglecting base rates, sample size, and random variation.",
    work: "《不确定条件下的判断：启发式与偏差》",
    englishWork: "Judgment under Uncertainty: Heuristics and Biases",
    reflection:
      "代表性启发式能迅速产生直觉，却把相似性误当成统计证据。它不是说直觉总会出错，而是指出在哪些结构化情境中，直觉容易系统偏离概率规则。",
    englishReflection:
      "The representativeness heuristic produces quick intuitions but can mistake resemblance for statistical evidence. It does not imply that intuition always fails; it identifies structured settings in which intuition systematically departs from probability rules.",
    question: "这个案例真的提供了新证据，还是仅仅很像你心中的典型故事？",
    englishQuestion:
      "Does this case supply new evidence, or does it merely resemble the typical story already in your mind?",
    sourceLocator: [
      "“代表性”部分，《科学》1974 年第 185 卷，第 1124—1127 页",
      "“Representativeness,” Science 185, 1974, pp. 1124–1127",
    ],
  },
  {
    id: "economics-kahneman-tversky-availability-anchoring",
    authorId: "kahnemanTversky",
    topic: "行为",
    text: "容易想起的事件会显得更常见，最先出现的数字也会牵引后续估计，即使它与问题关系很弱。",
    english:
      "Events that come easily to mind can seem more frequent, while an initial number can pull later estimates even when it is weakly related to the problem.",
    work: "《不确定条件下的判断：启发式与偏差》",
    englishWork: "Judgment under Uncertainty: Heuristics and Biases",
    reflection:
      "可得性与锚定让有限注意力下的判断变得可操作，但新闻曝光、近期经历与表达顺序会悄悄改写估计。改善判断可以从改变信息呈现与独立估计开始。",
    englishReflection:
      "Availability and anchoring make judgment manageable under limited attention, but media exposure, recent experience, and presentation order can quietly reshape estimates. Improvement can begin with better information displays and independent estimates.",
    question: "如果先独立估计再看参考数字，你的判断会与现在相差多少？",
    englishQuestion:
      "How different would your judgment be if you estimated independently before seeing the reference number?",
    sourceLocator: [
      "“可得性”与“调整和锚定”部分，《科学》1974 年第 185 卷，第 1127—1130 页",
      "“Availability” and “Adjustment and Anchoring,” Science 185, 1974, pp. 1127–1130",
    ],
  },
  {
    id: "economics-kahneman-tversky-prospect-theory",
    authorId: "kahnemanTversky",
    topic: "行为",
    text: "人们往往相对于一个参照点感受得失，损失带来的变化通常比同量收益更强，概率也不会被线性对待。",
    english:
      "People often experience gains and losses relative to a reference point; losses usually loom larger than equal gains, and probabilities are not treated linearly.",
    work: "《前景理论：风险决策分析》",
    englishWork: "Prospect Theory: An Analysis of Decision under Risk",
    reflection:
      "前景理论描述的是特定实验选择中的稳定模式，不应被简化成“人都厌恶风险”。人在收益与损失区域的风险态度可能不同，小概率还可能被过度加权。",
    englishReflection:
      "Prospect theory describes robust patterns in particular experimental choices; it should not be reduced to 'people dislike risk.' Risk attitudes can differ across gains and losses, while small probabilities may be overweighted.",
    question: "你是在评价最终结果，还是被起点、预期和“已经拥有”改变了感受？",
    englishQuestion:
      "Are you evaluating the final outcome, or has your reaction been reshaped by the starting point, expectations, and what you already possess?",
    sourceLocator: [
      "第 II—III 节，《计量经济学》1979 年第 47 卷第 2 期，第 263—291 页",
      "Sections II–III, Econometrica 47(2), 1979, pp. 263–291",
    ],
  },

  {
    id: "economics-akerlof-lemons-adverse-selection",
    authorId: "akerlof",
    topic: "市场",
    text: "我们已经看到，好车可能会被“柠檬车”挤出市场。",
    english:
      "It has been seen that the good cars may be driven out of the market by the lemons.",
    editorialSummary:
      "当卖方比买方更了解质量时，买方会按平均质量出价，优质供给者因价格过低而退出，市场质量随之继续下降。",
    englishEditorialSummary:
      "When sellers know more about quality than buyers, buyers offer a price for average quality; high-quality sellers then leave because that price is too low, causing market quality to fall further.",
    work: "《“柠檬”市场：质量不确定性与市场机制》",
    englishWork: "The Market for 'Lemons': Quality Uncertainty and the Market Mechanism",
    reflection:
      "逆向选择说明价格机制需要信息条件才能正常筛选。市场缩小并非因为双方都不想交易，而是因为无法可信地区分质量让互利交易消失。",
    englishReflection:
      "Adverse selection shows that price mechanisms require informational conditions to screen effectively. Markets may shrink not because parties lack gains from trade, but because quality cannot be distinguished credibly.",
    question: "在你的交易中，哪些好东西反而因为难以证明自己而被低价驱逐？",
    englishQuestion:
      "In your market, which high-quality offerings are driven out because they cannot credibly prove their quality?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "《经济学季刊》84 卷 3 期（1970 年 8 月），第 II 节 B“非对称信息”，印刷页 490，开篇首个完整连续句；该句概括二手车示例的挤出结果，卖方信息优势、同价交易与质量递降由相邻论证展开",
      "Quarterly Journal of Economics 84(3) (August 1970), §II.B, ‘Asymmetrical Information,’ print p. 490, first complete continuous sentence; the sentence states the displacement result in the used-car example, while seller information, common pricing, and declining quality are developed in the surrounding argument",
    ],
  },
  {
    id: "economics-akerlof-quality-institutions",
    authorId: "akerlof",
    topic: "市场",
    text: "许多制度的出现，是为了抵消质量不确定性的影响。",
    english:
      "Numerous institutions arise to counteract the effects of quality uncertainty.",
    editorialSummary:
      "品牌、担保、连锁声誉与执照之所以出现，是因为市场需要让不可见的质量变得更可信。",
    englishEditorialSummary:
      "Brands, warranties, chain reputations, and licensing arise because markets need ways to make otherwise hidden quality more credible.",
    work: "《“柠檬”市场：质量不确定性与市场机制》",
    englishWork: "The Market for 'Lemons': Quality Uncertainty and the Market Mechanism",
    reflection:
      "这些制度是对信息不对称的回应，却不是天然有效：担保可能难以执行，执照也可能成为进入壁垒。要判断的是它们实际传递了多少质量信息，又造成了什么成本。",
    englishReflection:
      "These institutions respond to asymmetric information but are not automatically effective: warranties may be hard to enforce, and licensing may become an entry barrier. The question is how much quality information they convey and at what cost.",
    question: "一个“可信标识”究竟在验证质量，还是只让既有参与者更容易排除新人？",
    englishQuestion:
      "Does a 'trusted label' truly verify quality, or does it mainly help incumbents exclude newcomers?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "《经济学季刊》84 卷 3 期（1970 年 8 月），第 IV 节“抵消性制度”，印刷页 499，标题后的首个完整连续句；担保、品牌、连锁与执照由该句之后至第 500 页分别列举",
      "Quarterly Journal of Economics 84(3) (August 1970), §IV, ‘Counteracting Institutions,’ print p. 499, first complete continuous sentence after the heading; guarantees, brand names, chains, and licensing are enumerated separately after this sentence through p. 500",
    ],
  },

  {
    id: "economics-stiglitz-information-paradigm",
    authorId: "stiglitz",
    topic: "市场",
    text: "只要信息获取有成本且分布不均，价格与契约就不再只是传递稀缺性，也会承担筛选、激励和隐藏信息的后果。",
    english:
      "Once information is costly and unevenly distributed, prices and contracts do more than convey scarcity: they also screen, create incentives, and respond to hidden information.",
    work: "《信息与经济学范式的转变》",
    englishWork: "Information and the Change in the Paradigm in Economics",
    reflection:
      "微小的信息不完备可能改变均衡的性质，使完全信息模型的福利结论不再自动成立。但识别市场失灵并不等于任何政策都能改善它，政府同样面对信息与激励限制。",
    englishReflection:
      "Small informational imperfections can change the nature of equilibrium, so welfare results from complete-information models no longer follow automatically. Yet diagnosing market failure does not prove that any intervention will improve it; governments face informational and incentive constraints too.",
    question: "你的方案假定谁知道什么，又是否忽略了知识本身的获取与验证成本？",
    englishQuestion:
      "Who does your proposal assume knows what, and does it overlook the cost of acquiring and verifying that knowledge?",
    sourceLocator: [
      "2001 年诺贝尔讲座第 I—III 节；《美国经济评论》2002 年第 92 卷第 3 期",
      "2001 Nobel lecture, Sections I–III; American Economic Review 92(3), 2002",
    ],
  },
  {
    id: "economics-stiglitz-screening-incentives",
    authorId: "stiglitz",
    topic: "市场",
    text: "当类型或行动不可直接观察时，契约条款会诱导人们自我选择，并改变他们之后的行为，因此价格不能脱离激励来理解。",
    english:
      "When types or actions cannot be observed directly, contract terms induce people to sort themselves and alter their later behavior, so prices cannot be understood apart from incentives.",
    work: "《信息与经济学范式的转变》",
    englishWork: "Information and the Change in the Paradigm in Economics",
    reflection:
      "筛选与激励模型说明，看似低效的配给、工资差异或合同限制可能是对信息问题的制度反应。解释其成因不等于为现状辩护，还需比较可行替代方案。",
    englishReflection:
      "Screening and incentive models show that apparently inefficient rationing, wage differences, or contract restrictions may be institutional responses to information problems. Explaining their origin does not justify the status quo; feasible alternatives still require comparison.",
    question: "一条规则是在描述人群差异，还是正在诱导人们表现出它所预期的差异？",
    englishQuestion:
      "Is a rule merely describing differences among people, or is it inducing them to display the differences it expects?",
    sourceLocator: [
      "2001 年诺贝尔讲座第 VI—VIII 节；《美国经济评论》2002 年第 92 卷第 3 期",
      "2001 Nobel lecture, Sections VI–VIII; American Economic Review 92(3), 2002",
    ],
  },

  {
    id: "economics-minsky-financing-regimes",
    authorId: "minsky",
    topic: "货币",
    text: "融资结构可从现金流足以偿付本息，滑向只能续借本金，再滑向连利息都依赖新增负债或资产上涨。",
    english:
      "Financing structures can move from cash flows that cover principal and interest, to refinancing principal, and finally to relying on new debt or rising asset prices even to service interest.",
    work: "《金融不稳定假说》",
    englishWork: "The Financial Instability Hypothesis",
    reflection:
      "明斯基用对冲性、投机性与庞氏性融资描述资产负债表的脆弱程度，而不是给企业贴永久标签。同一单位会随利润、利率和再融资条件改变位置。",
    englishReflection:
      "Minsky used hedge, speculative, and Ponzi finance to describe degrees of balance-sheet fragility, not permanent labels for firms. The same unit can move as profits, interest rates, and refinancing conditions change.",
    question: "你的现金流能偿还债务本身，还是只有在下一位出资者出现时才能继续？",
    englishQuestion:
      "Can your cash flow repay the debt itself, or can the arrangement continue only when another financier appears?",
    sourceLocator: [
      "第 III—IV 节，莱维经济研究所工作论文第 74 号，1992 年",
      "Sections III–IV, Levy Economics Institute Working Paper No. 74, 1992",
    ],
  },
  {
    id: "economics-minsky-endogenous-fragility",
    authorId: "minsky",
    topic: "货币",
    text: "一段持续顺利的增长会让借款人与放款人逐步接受更高杠杆和更薄安全边际，从而在繁荣内部积累脆弱性。",
    english:
      "A prolonged period of smooth growth can lead borrowers and lenders to accept higher leverage and thinner margins of safety, accumulating fragility within the boom itself.",
    work: "《金融不稳定假说》",
    englishWork: "The Financial Instability Hypothesis",
    reflection:
      "危机不必只由外部冲击引起；成功经验也会改变风险认知和融资习惯。这个机制是关于资本主义金融的周期倾向，不是说每次稳定都会机械地产生崩盘。",
    englishReflection:
      "Crises need not come only from external shocks; successful experience can alter risk perceptions and financing practices. This is a cyclical tendency in capitalist finance, not a claim that every stable period mechanically produces a crash.",
    question: "最近的顺利，是证明风险消失了，还是让你逐渐忘记为风险留出空间？",
    englishQuestion:
      "Does recent success prove that risk has vanished, or has it gradually made you stop leaving room for risk?",
    sourceLocator: [
      "第 I—II、V 节，莱维经济研究所工作论文第 74 号，1992 年",
      "Sections I–II and V, Levy Economics Institute Working Paper No. 74, 1992",
    ],
  },

  {
    id: "economics-piketty-return-growth-concentration",
    authorId: "piketty",
    topic: "分配",
    text: "当资本回报率长期高于经济增长率时，既有财富可能比收入与产出扩张得更快，从而增强财富集中的力量。",
    english:
      "When the return on capital remains above the economy's growth rate, existing wealth may expand faster than income and output, strengthening forces of wealth concentration.",
    work: "《21 世纪资本论》",
    englishWork: "Capital in the Twenty-First Century",
    reflection:
      "这一关系描述的是可能的分化力量，不是脱离制度的铁律。战争、税制、储蓄差异、资产价格与政治选择都会改变财富如何累积和传递。",
    englishReflection:
      "This relation describes a potential force of divergence, not an iron law detached from institutions. Wars, taxation, saving differences, asset prices, and political choices all shape how wealth accumulates and is transmitted.",
    question: "当财富增长主要取决于已有财富时，后来者还能通过哪些路径获得进入机会？",
    englishQuestion:
      "When wealth growth depends mainly on wealth already owned, through what paths can newcomers still gain access?",
    sourceLocator: [
      "导言及第 10—12 章（资本回报、增长与继承财富）",
      "Introduction and Chapters 10–12 (returns to capital, growth, and inherited wealth)",
    ],
  },
  {
    id: "economics-piketty-inequality-ideology",
    authorId: "piketty",
    topic: "分配",
    text: "每一种长期存在的不平等秩序，都需要关于财产、边界、教育和正当性的叙事来维持，而这些叙事并非不可改变。",
    english:
      "Every durable regime of inequality relies on narratives about property, borders, education, and legitimacy, and those narratives are not immutable.",
    work: "《资本与意识形态》",
    englishWork: "Capital and Ideology",
    reflection:
      "不平等既受生产与技术影响，也由法律和政治分类塑造。强调意识形态不是说物质约束不存在，而是把“只能如此”的制度安排重新开放为可比较的历史选择。",
    englishReflection:
      "Inequality is influenced by production and technology, but it is also shaped by legal and political classifications. Stressing ideology does not erase material constraints; it reopens supposedly inevitable arrangements as historical choices that can be compared.",
    question: "你认为理所当然的财产与分配规则，依赖着怎样一套关于公平的故事？",
    englishQuestion:
      "What story about fairness sustains the property and distribution rules you take for granted?",
    sourceLocator: [
      "导言、结论及第 17 章（不平等制度与参与式社会主义）",
      "Introduction, conclusion, and Chapter 17 (inequality regimes and participatory socialism)",
    ],
  },

  {
    id: "economics-hirschman-unbalanced-growth-linkages",
    authorId: "hirschman",
    topic: "增长",
    text: "发展不一定靠所有部门同步推进；有选择地制造瓶颈和不平衡，可能通过前向与后向联系诱发下一轮投资。",
    english:
      "Development need not advance all sectors in step; selectively created bottlenecks and imbalances can induce further investment through forward and backward linkages.",
    work: "《经济发展战略》",
    englishWork: "The Strategy of Economic Development",
    reflection:
      "赫希曼关注的是有限决策能力下如何动员隐藏资源，而不是赞美任何失衡。关键在于某项投资能否产生足够清晰、可响应的压力，促使相关环节行动。",
    englishReflection:
      "Hirschman asked how to mobilize latent resources under limited decision-making capacity, not how to celebrate every imbalance. The issue is whether an investment generates pressures clear and actionable enough to induce connected sectors to respond.",
    question: "如果资源不足以全面铺开，哪一个有意选择的缺口最可能带动后续行动？",
    englishQuestion:
      "If resources are too scarce for a comprehensive push, which deliberately chosen gap is most likely to induce further action?",
    sourceLocator: [
      "第 4 章“投资选择与战略”（前向联系与后向联系）",
      "Chapter 4, “Investment Choice and Strategies” (forward and backward linkages)",
    ],
  },
  {
    id: "economics-hirschman-exit-voice-loyalty",
    authorId: "hirschman",
    topic: "制度",
    text: "当组织或产品质量下降时，人们可以离开，也可以留下来表达不满；忠诚会改变两种反应出现的时机与力量。",
    english:
      "When an organization or product deteriorates, people can exit or remain and voice dissatisfaction; loyalty changes the timing and force of those responses.",
    work: "《退出、呼吁与忠诚》",
    englishWork: "Exit, Voice, and Loyalty",
    reflection:
      "退出会以流失传递信号，呼吁则提供更丰富的信息，但两者都可能失效。过快退出会掏空内部改革力量，缺乏退出又可能让管理者忽视声音。",
    englishReflection:
      "Exit signals decline through defection, while voice conveys richer information, but either can fail. Easy exit may hollow out internal reform; absent exit may let leaders ignore what members say.",
    question: "面对正在变差的共同体，你更该离开，还是留下发声；什么条件会改变答案？",
    englishQuestion:
      "When a community is deteriorating, should you leave or stay and speak—and what conditions would change the answer?",
    sourceLocator: [
      "第 1—3 章（退出与呼吁作为对衰退的反应）",
      "Chapters 1–3 (exit and voice as responses to decline)",
    ],
  },

  {
    id: "economics-acemoglu-robinson-institutions-growth",
    authorId: "acemogluRobinson",
    topic: "制度",
    text: "长期繁荣不仅取决于地理或资本存量，还取决于制度如何分配产权、进入机会和采用新技术的激励。",
    english:
      "Long-run prosperity depends not only on geography or capital stocks, but also on how institutions distribute property rights, access, and incentives to adopt new technologies.",
    work: "《制度是长期增长的根本原因》",
    englishWork: "Institutions as a Fundamental Cause of Long-Run Growth",
    reflection:
      "称制度为根本原因并不是说文化、地理和政策不重要，而是追问这些因素为何在不同社会被转化为不同激励。制度本身也不是外生给定的。",
    englishReflection:
      "Calling institutions a fundamental cause does not make culture, geography, or policy irrelevant. It asks why those factors translate into different incentives across societies, while recognizing that institutions themselves are not exogenously given.",
    question: "同样的资源与技术，为何在不同规则下会诱发完全不同的投资与创新？",
    englishQuestion:
      "Why do the same resources and technologies induce radically different investment and innovation under different rules?",
    sourceLocator: [
      "第 1—3 节，《经济增长手册》第 1A 卷，2005 年",
      "Sections 1–3, Handbook of Economic Growth, Vol. 1A, 2005",
    ],
  },
  {
    id: "economics-acemoglu-robinson-political-power",
    authorId: "acemogluRobinson",
    topic: "制度",
    text: "经济制度由政治权力塑造，而政治权力又受既有制度与资源分布影响；这种反馈能延续包容，也能固化攫取。",
    english:
      "Economic institutions are shaped by political power, while political power is influenced by existing institutions and resource distributions; this feedback can sustain inclusion or entrench extraction.",
    work: "《国家为什么会失败》",
    englishWork: "Why Nations Fail",
    reflection:
      "包容与攫取是分析制度组合的概念，不是给国家永久贴标签。关键时刻可能打开变化空间，但结果取决于联盟、权力分布与之后的反馈过程。",
    englishReflection:
      "Inclusive and extractive are concepts for analyzing institutional combinations, not permanent labels for countries. Critical junctures may open room for change, but outcomes depend on coalitions, distributions of power, and subsequent feedback.",
    question: "一项改革改变了表面规则后，是否也改变了决定规则能否持续的权力分布？",
    englishQuestion:
      "After a reform changes formal rules, does it also change the distribution of power that determines whether those rules endure?",
    sourceLocator: [
      "第 3—4 章（包容性与攫取性制度、关键时刻与反馈）",
      "Chapters 3–4 (inclusive and extractive institutions, critical junctures, and feedback)",
    ],
  },

  {
    id: "economics-thaler-mental-accounting",
    authorId: "thaler",
    topic: "行为",
    text: "人们会把本可互换的钱分进不同心理账户，并按来源、用途与预算标签作出不同消费选择。",
    english:
      "People divide otherwise fungible money into separate mental accounts and make different spending choices according to source, purpose, and budget labels.",
    work: "《心理账户很重要》",
    englishWork: "Mental Accounting Matters",
    reflection:
      "心理账户违反了标准模型中的完全可替代性，却也可能帮助人们控制支出和完成长期目标。偏离一致性并不必然等于需要消除的错误。",
    englishReflection:
      "Mental accounting violates the perfect fungibility assumed in standard models, yet it can help people control spending and pursue long-term goals. A departure from consistency is not automatically a mistake that should be removed.",
    question: "如果把这笔钱换一个账户名称，你会做出不同决定吗；这种差异对你有帮助吗？",
    englishQuestion:
      "Would you decide differently if this money carried another account label, and does that difference help you?",
    sourceLocator: [
      "第 1—3 节，《行为决策杂志》1999 年第 12 卷第 3 期",
      "Sections 1–3, Journal of Behavioral Decision Making 12(3), 1999",
    ],
  },
  {
    id: "economics-thaler-endowment-sunk-cost",
    authorId: "thaler",
    topic: "行为",
    text: "拥有一件东西会抬高人们放弃它所要求的补偿，已经付出的成本也常继续牵引本应只看未来的选择。",
    english:
      "Owning something can raise the compensation people demand to give it up, while costs already incurred often keep influencing choices that should depend only on the future.",
    work: "《迈向消费者选择的实证理论》",
    englishWork: "Toward a Positive Theory of Consumer Choice",
    reflection:
      "禀赋效应与沉没成本揭示了参照点、所有权和自我控制如何进入选择。它们不是一句“人不理性”的总结，而是可检验、也会随经验与制度改变的行为模式。",
    englishReflection:
      "The endowment effect and sunk costs show how reference points, ownership, and self-control enter choice. They are not a blanket claim that people are irrational, but testable patterns that can vary with experience and institutions.",
    question: "如果今天从零开始，你还会为这个项目投入下一笔资源吗？",
    englishQuestion:
      "If you were starting from zero today, would you still commit the next unit of resources to this project?",
    sourceLocator: [
      "第 1—3 节，《经济行为与组织杂志》1980 年第 1 卷第 1 期",
      "Sections 1–3, Journal of Economic Behavior & Organization 1(1), 1980",
    ],
  },
] satisfies readonly EconomicsThoughtSeed[];
