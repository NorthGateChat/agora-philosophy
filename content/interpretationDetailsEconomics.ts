import type { InterpretationDetail } from "./interpretationTypes";

export const economicsInterpretationDetails: Readonly<
  Record<string, InterpretationDetail>
> = {
  "economics-ricardo-rent-margin": {
    context:
      "第二章先把地租界定为支付给地主、换取使用土地原有且不可毁灭生产力的那部分产品，并用肥力不同的土地说明差额怎样出现：人口与需求扩张迫使耕作进入较差土地时，较优土地相对边际地块的额外产出成为地租。本句进一步把同一逻辑用于一块土地上的连续投入；只有较早投入比最后仍值得投入的等量资本与劳动多出的产物才构成差额。",
    englishContext:
      "Chapter 2 first defines rent as the share paid to the landlord for using the land's original and indestructible powers, then explains differential rent as cultivation extends from more fertile to inferior land. The excerpt applies the same margin to successive doses on one plot: rent is the product obtained by an earlier equal dose of capital and labor above the product of the last dose still worth applying.",
    distinction:
      "这里的“总是”属于李嘉图模型内部：土地质量或投入回报有差异，并存在不付租的边际用途。它不是所有现实房租、地价或自然资源收益的定义；区位、公共投资、预期、管制与垄断也会进入现实租值。更不能把“地租是差额”误读为地主造成了这部分物质产出。",
    englishDistinction:
      "‘Always’ operates inside Ricardo's model, where land or successive doses differ in productivity and a no-rent margin exists. It is not a definition of every observed house rent, land price, or resource return: location, public investment, expectations, regulation, and market power can also matter. Nor does calling rent a difference mean that the landlord physically produced the surplus.",
  },
  "economics-ricardo-distribution": {
    context:
      "1817年初版序言先把社会产品分为地主的地租、资本所有者的利润与劳动者的工资，并指出不同发展阶段下三者份额很不相同。本句据此提出全书任务；接下来的价值、地租、工资、利润与税收各章，正是在不同假设下追踪这些份额怎样联动，而不是只计算国民产出的总量。",
    englishContext:
      "The 1817 Preface first divides social output among rent to proprietors, profit to owners of stock, and wages to laborers, noting that their shares differ greatly across stages of society. The excerpt announces the book's problem. The chapters on value, rent, wages, profits, and taxes then trace how these shares move together under stated assumptions rather than merely measuring aggregate output.",
    distinction:
      "“首要问题”是李嘉图对政治经济学研究重心的纲领性判断，不是说生产、交换或增长无关紧要。这里的三分法也不能无修改地覆盖现代混合收入、公司组织、金融索取权和国家转移；应用时应把功能性收入份额同个人或家庭收入不平等区分开。",
    englishDistinction:
      "‘Principal problem’ is Ricardo's programmatic choice of emphasis, not a claim that production, exchange, or growth do not matter. His tripartite division cannot be mapped without adjustment onto mixed income, corporations, financial claims, or transfers today. Functional shares of income should also be distinguished from inequality among persons or households.",
  },
  "economics-mill-production-distribution": {
    context:
      "第二篇开篇承接第一篇对劳动、资本与土地生产条件的讨论。密尔说，人不能任意改变物质如何产生结果，却可以决定产品由谁享有；即便私人财产制度既定，继承、契约和分配规则的细节也取决于社会判断。后文马上补充，分配制度又会通过人的动机反过来影响生产，因此两者是分析上的区分而非经验上的隔绝。",
    englishContext:
      "Book II opens after Book I's account of labor, capital, and land as conditions of production. Mill argues that people cannot choose arbitrarily how physical causes yield output, but they can decide who enjoys it; even with private property assumed, inheritance, contract, and detailed distributive rules are social choices. He immediately adds that distribution affects production through human motives, so the distinction is analytical rather than an empirical separation.",
    distinction:
      "“完全是一种人为制度”强调可改变性，不表示分配可以不受稀缺、激励、权力和行政能力约束，也不表示生产规律不含制度因素。密尔讨论的是既有产物的归属规则；现代分析还须追问制度如何塑造资产、技术与劳动过程本身。",
    englishDistinction:
      "‘A matter of human institution solely’ stresses alterability. It does not mean distribution can ignore scarcity, incentives, power, or administrative capacity, nor that production is institution-free. Mill is contrasting rules governing who receives output; modern analysis must additionally ask how institutions shape assets, technology, and the labor process itself.",
  },
  "economics-mill-stationary-state": {
    context:
      "第四篇第六章反对把资本与人口持续增加当成人类进步的唯一形式。密尔先说古典经济学意义上的静止状态终将到来，却未必令人恐惧；本句之后，他设想人口与资本不再增长仍可留下更大的心智文化空间，并主张在到达静止状态前先改善财富分配、限制人口压力。",
    englishContext:
      "Book IV, Chapter VI rejects treating perpetual growth of capital and population as the sole form of progress. Mill first says the classical stationary state will eventually arrive but need not be feared. After the excerpt he imagines intellectual and moral improvement continuing without further accumulation, while insisting that distribution and population pressure should be improved before that state is reached.",
    distinction:
      "静止的是资本存量和人口，不是技术、知识、自由、闲暇或生活质量；这也不是主张突然停止一切投资。密尔的规范性图景依赖较公平的分配与节制的人口增长，不能直接等同于今天任何一种“零增长”政策，更没有自动解决生态边界或就业转换。",
    englishDistinction:
      "What is stationary is capital and population, not technology, knowledge, freedom, leisure, or quality of life; the passage does not propose abruptly ending all investment. Mill's normative picture presupposes fairer distribution and restrained population growth. It cannot simply be equated with any current zero-growth policy and does not by itself solve ecological limits or employment transitions.",
  },
  "economics-marx-commodity-fetish": {
    context:
      "第一章第四节先追问，劳动产品一旦成为商品为何显得神秘。马克思把桌子的物理用途同商品形式区分开：独立生产者的私人劳动只有通过交换才表现为社会总劳动的一部分，于是人与人的生产关系以商品价值和物物交换关系呈现。本句以宗教幻象类比这种形式倒置，后文再把价值形式追溯到特定社会生产关系。",
    englishContext:
      "Chapter I, §4 asks why a product of labor becomes mysterious once it takes commodity form. Marx separates a table's physical usefulness from a system in which private labors count as parts of social labor only through exchange. Relations among producers consequently appear as values and relations among things. The excerpt compares that inversion to religious appearance; the following discussion locates value-form in a historically specific organization of production.",
    distinction:
      "“幻象”不是说价格或物品不存在，也不是指消费者单纯迷恋品牌。论点是社会关系采取了客观、可计算的物的形式，而这一形式遮蔽其历史条件。用它分析当代市场时仍须具体说明哪些生产关系、法律权利和信息机制被价格呈现或遗漏。",
    englishDistinction:
      "‘Fantastic form’ does not mean prices or objects are unreal, nor does it merely name consumer fascination with brands. The claim is that social relations acquire an objective, calculable form as relations among things while their historical conditions recede from view. Contemporary application must still specify which productive relations, legal rights, and information mechanisms a price expresses or omits.",
  },
  "economics-marx-labor-process": {
    context:
      "第七章第一节暂时撇开特定社会形式，分析劳动过程的一般要素：有目的的活动、劳动对象与劳动资料。引句前用蜘蛛织网和蜜蜂筑巢对照建筑师；最差的建筑师也会先在头脑中形成要实现的结果。后文强调劳动者不仅改变自然材料，也使意志服从于贯穿过程的有意识目的。",
    englishContext:
      "Chapter VII, §1 temporarily abstracts from particular social forms and analyzes labor through purposive activity, its object, and its instruments. Immediately before the excerpt Marx contrasts spiders and bees with an architect: even the worst architect first constructs the result mentally. The following sentences stress that the worker changes natural material while subordinating the will to a conscious purpose throughout the process.",
    distinction:
      "这是对有目的劳动的抽象规定，不是说每个细节都在开工前被完整设计，也不否认试错、惯习、协作和非人类动物的复杂行为。它更不能单独证明某种所有制；资本主义条件下谁设定目的、谁控制过程，是后续章节另行分析的问题。",
    englishDistinction:
      "This is an abstraction about purposive labor, not a claim that every detail is fully designed in advance or a denial of trial and error, habit, collaboration, or complex animal behavior. It does not establish any property regime by itself. Who sets the purpose and controls the process under capitalism is a separate question developed later.",
  },
  "economics-marx-reserve-army": {
    context:
      "第二十五章第2节讨论积累扩大资本时，可变资本即劳动力需求未必同比增加，因为技术和组织变化会提高不变资本的比重。引句只写反馈的一侧；紧接着马克思说，旧资本的周期性重组又会排斥先前雇佣的工人，两股过程共同形成相对于资本增殖需要而言的过剩人口，第三节才系统命名“产业后备军”。",
    englishContext:
      "Chapter XXV, §2 argues that labor demand need not grow in proportion to accumulating capital because technical and organizational change can raise the share devoted to means of production. The excerpt gives one side of the movement. The next sentence adds that periodic recomposition of existing capital releases workers already employed; together these processes produce a population surplus relative to capital's current needs, named the industrial reserve army in §3.",
    distinction:
      "“相对过剩”是相对于资本在既定盈利与技术条件下的用工需求，不是人口绝对多余，也不等同于官方失业率。机制的强度会随劳动时间、技术方向、需求增长、迁移、劳工制度与福利政策变化；原句也没有断言每次投资都会减少就业人数。",
    englishDistinction:
      "‘Relative surplus’ means surplus relative to capital's demand under prevailing profitability and techniques, not people who are absolutely superfluous, and it is not identical to the measured unemployment rate. The mechanism varies with hours, the direction of technology, demand growth, migration, labor institutions, and welfare policy. Nor does the sentence say every investment reduces headcount.",
  },
  "economics-marshall-scissors": {
    context:
      "第五篇第三章区分短期与长期：时间越短，既有供给越难调整，需求对价格的影响越显眼；时间越长，生产规模和成本越能变化。剪刀比喻回应旧有的效用论与生产成本论之争，下一句即说静止时可能主要由一刃完成切割，但不能因此把另一刃从完整过程删除。",
    englishContext:
      "Book V, Chapter 3 distinguishes market periods and longer adjustment horizons. With little time for supply to change, demand appears more influential; over longer periods, productive scale and costs adjust. The scissors analogy answers disputes between utility and cost theories. The next sentence concedes that one blade may appear to do most of the cutting when the scissors are held still, without making the other blade irrelevant to the full operation.",
    distinction:
      "比喻不是说供求贡献永远各占一半，也不是一个可直接估计的结构模型。哪一侧在特定时间尺度上更有约束力取决于弹性、存货、进入、技术与制度；成本本身也可能随产量改变。",
    englishDistinction:
      "The metaphor does not assign demand and supply equal numerical shares and is not itself an estimable structural model. Which side binds over a given horizon depends on elasticities, inventories, entry, technology, and institutions; costs may themselves vary with output.",
  },
  "economics-marshall-elasticity": {
    context:
      "第三篇第四章从需求量随价格变化的程度定义需求弹性，并在后续段落比较生活必需品、奢侈品、替代品、时间与消费者预算份额。本句是文字定义；马歇尔随后用价格按比例变化与需求量按比例变化来刻画，不是只看价格下降后销量是否增加。",
    englishContext:
      "Book III, Chapter 4 defines demand elasticity through the degree to which quantity demanded responds to price, then compares necessities, luxuries, substitutes, time, and expenditure shares. The excerpt is the verbal definition. Marshall subsequently treats proportional changes in price and quantity, not merely whether sales rise after a price cut.",
    distinction:
      "弹性描述在其他条件近似不变、给定区间和时间内的反应，不自动识别因果；价格与数量同时受供给冲击时，观察到的共同变化不能直接当作需求弹性。同一商品也会因人群、价格点、持续时间与替代机会而有不同弹性。",
    englishDistinction:
      "Elasticity describes response over a specified range and horizon with other conditions approximately held fixed; it does not automatically identify causality. When price and quantity jointly respond to supply shocks, their observed comovement is not a demand elasticity. The same good can have different elasticities across people, price points, durations, and substitution opportunities.",
  },
  "economics-veblen-conspicuous-consumption": {
    context:
      "第四章承接第三章的“炫耀性闲暇”：随着群体扩大、观察者难以长期确认一个人的闲暇，公开消费昂贵物品成为更可见的财富证据。引句之后，凡勃伦讨论宴饮、礼物、服饰和由家属或仆役代行的消费怎样传递身份；消费的使用效果与声望效果因此可能分离。",
    englishContext:
      "Chapter 4 follows the account of conspicuous leisure. As communities grow and observers cannot continuously verify another person's leisure, visible consumption of costly goods becomes a more legible proof of wealth. After the excerpt Veblen discusses feasts, gifts, dress, and vicarious consumption by dependents or servants, separating an object's practical use from its reputational function.",
    distinction:
      "凡勃伦分析的是特定阶级制度中的地位信号，不是说昂贵消费全都为了炫耀，也不是现代需求曲线中“凡勃伦商品”的充分实证定义。识别声望动机需要同质量、稀缺、审美、耐用性和群体规范等替代解释比较。",
    englishDistinction:
      "Veblen analyzes status signaling within a class order. He does not say every costly purchase is display, and the passage is not a complete empirical definition of a modern ‘Veblen good.’ Identifying reputational demand requires comparison with quality, scarcity, aesthetics, durability, and group norms.",
  },
  "economics-veblen-business-industry": {
    context:
      "第三章把现代工业描述为相互依赖、需要连续协调的机器过程，却指出其方向由追求货币收益的企业控制。引句之后，凡勃伦区分可销售产量与技术上可能产量，并讨论企业在价格过低时限制生产、兼并或扰乱行业的动机；这为全书“企业利益”与“工业效率”的张力奠基。",
    englishContext:
      "Chapter 3 depicts modern industry as an interdependent machine process requiring continuous coordination, yet controlled by enterprises seeking pecuniary gain. After the excerpt Veblen distinguishes saleable output from technically possible output and discusses incentives to restrict production, combine firms, or disturb industry when prices are too low. This grounds the book's tension between business advantage and industrial efficiency.",
    distinction:
      "利润目标与技术产出并非必然冲突：价格信号、竞争和长期投资也可协调需求与生产。凡勃伦指出的是二者可能分离的制度条件；判断具体企业是否“蓄意破坏”仍需观察产能、成本、需求和市场势力，而不能由盈利事实直接推出。",
    englishDistinction:
      "Profit and technical output need not conflict: prices, competition, and long-term investment can coordinate production with demand. Veblen identifies institutional conditions under which they may diverge. Whether a firm actually engages in ‘sabotage’ still requires evidence about capacity, cost, demand, and market power; it cannot be inferred from profitability alone.",
  },
  "economics-fisher-equation-exchange": {
    context:
      "第二章先把一次交换写成所付货币等于价格乘数量，再把一年全部交易求和，形成 MV=ΣpQ（后来常简写为 MV=PT）。本句强调该式首先是记账恒等关系；后续章节才分别讨论流通速度、存款货币、交易量和价格水平怎样决定，并在附加假设下发展数量论。",
    englishContext:
      "Chapter 2 writes each exchange as money paid equal to price times quantity, then sums all exchanges in a year into MV = ΣpQ, later often abbreviated MV = PT. The excerpt stresses that this is initially an accounting identity. Later chapters separately analyze velocity, deposit currency, trade volume, and prices before drawing quantity-theory implications under further assumptions.",
    distinction:
      "恒等式本身不证明货币量变化只会或按比例改变价格；那需要关于速度、实际交易、因果方向和调整期的额外假设。不同版本的 M、V 与交易范围定义也会改变经验测量，不能把会计相等直接当政策乘数。",
    englishDistinction:
      "The identity alone does not prove that a change in money affects only prices or affects them proportionally. That conclusion requires additional assumptions about velocity, real trade, causal direction, and the adjustment horizon. Empirical results also depend on definitions of money, velocity, and the transactions covered; an accounting equality is not a policy multiplier.",
  },
  "economics-principles-jevons-final-degree-utility": {
    context:
      "第三章先把总效用同“效用程度”区分，并用食物数量增加时新增部分的重要性逐渐下降说明边际变化。引句把无限小增量的效用程度命名为“最终效用程度”；后文用曲线与微分符号表示，并把它用于不同用途间的分配和交换条件。",
    englishContext:
      "Chapter III separates total utility from the ‘degree of utility’ and illustrates how the importance of an added portion may fall as the stock of food grows. The excerpt names the utility of the final or infinitesimal increment the final degree of utility. Jevons then represents it with curves and differential notation and uses it in allocation and exchange conditions.",
    distinction:
      "“最终”意为现有存量之后的下一小单位，不是商品的终极价值，也不是最后购买单位可被直接观察的心理数值。连续可微、可基数比较的效用是该论证的建模语言；现代选择理论常只保留序数偏好，经验应用还需价格、预算和可识别行为。",
    englishDistinction:
      "‘Final’ means the next small increment after the current stock, not an object's ultimate value, and it is not a directly observed mental quantity. Continuous, cardinally expressible utility is Jevons's modeling language; modern choice theory often retains only ordinal preference, while empirical use requires prices, budgets, and identifiable behavior.",
  },
  "economics-principles-jevons-equimarginal-allocation": {
    context:
      "“商品在不同用途间的分配”一节设一份商品可投向两种用途，并写出各用途效用随投入量递减的曲线。如果把一个微小单位从边际效用较低的用途转向较高用途，总效用仍可上升；引句给出停止重新分配的内部解条件，随后的方程还要求两用途数量之和固定。",
    englishContext:
      "The section on distributing a commodity among different uses supposes a fixed stock allocated between two purposes, each with declining utility as its allotment grows. If a small unit can move from the lower- to the higher-marginal-utility use, total utility rises. The excerpt gives the interior stopping condition; the accompanying equations also require the two quantities to sum to the fixed stock.",
    distinction:
      "边际效用相等只适用于可转移资源、可比较目标且内部解存在的模型；若有最低需求、离散单位、转换成本或角点，最优分配可能不相等。跨人分配还牵涉效用能否人际比较与权利问题，不能由个人内部的等边际原则直接推出。",
    englishDistinction:
      "Equal marginal utilities characterize an interior solution with transferable resources and comparable uses. Minimum needs, indivisible units, conversion costs, or corner solutions can prevent equality. Allocation across persons additionally raises interpersonal-comparison and rights questions that do not follow from the within-person equimarginal rule.",
  },
  "economics-principles-edgeworth-contract-curve": {
    context:
      "《纯粹契约》先画出双方以两种商品交换的无差异曲线，并把双方同意交易前的初始位置作为界限。两人的无差异曲线相切处，一方若再改善就必须损害另一方；这些切点连成契约曲线。引句说双方都有利益从非有效初始点走到两界限之间的某个点，却还没有决定究竟落在哪一点。",
    englishContext:
      "‘Pure Contract’ represents two parties exchanging two goods through their indifference curves, bounded by what each can secure without agreement. At tangencies one party cannot be improved without harming the other; these points form the contract curve. The excerpt says both parties prefer some settlement between the limits to an inefficient starting point, but it does not select which point they will reach.",
    distinction:
      "契约曲线是帕累托有效配置的集合，不是单一预测，也不保证公平。初始禀赋、议价力、信息、可执行性和参与者人数决定可达结果；存在互利区间也不证明实际谈判无成本或不会破裂。",
    englishDistinction:
      "The contract curve is a set of Pareto-efficient allocations, not a unique prediction and not a fairness guarantee. Initial endowments, bargaining power, information, enforceability, and the number of participants shape outcomes. The existence of a mutually beneficial region does not make bargaining costless or prevent breakdown.",
  },
  "economics-principles-marshall-consumer-surplus": {
    context:
      "第三篇第六章先假定货币的边际效用在所考察购买中近似不变，把一个人宁可不买也愿支付的最高价格同实际支付额比较。引句据此定义单件或若干单位带来的“剩余满足”的货币尺度；后文把个人需求价格沿数量求和，再扣除实际支出，并讨论市场需求中的汇总。",
    englishContext:
      "Book III, Chapter VI assumes that the marginal utility of money is approximately constant over the purchase considered and compares the maximum a person would pay rather than go without with actual expenditure. The excerpt defines the monetary measure of surplus satisfaction. Marshall then sums demand prices across units, subtracts expenditure, and discusses aggregation into a market measure.",
    distinction:
      "消费者剩余不是银行账户中收到的现金，也不是无需假设即可观察的幸福。收入效应显著、偏好随价格变化、存在公共品或支付意愿受财富强烈约束时，面积解释会变弱；跨人相加还隐含货币边际效用可比较。",
    englishDistinction:
      "Consumer surplus is not cash received and is not assumption-free observed welfare. The area interpretation weakens with large income effects, price-dependent preferences, public goods, or willingness to pay strongly constrained by wealth. Adding surplus across people also embeds assumptions about the comparability of the marginal utility of money.",
  },
  "economics-principles-arrow-debreu-equilibrium-existence": {
    context:
      "导言把瓦尔拉斯体系中的核心问题表述为：消费者与生产者各自优化、所有市场同时清算的价格与配置是否存在。论文先把问题转化为抽象经济的均衡，再以不动点方法证明两个存在定理；正式假设涉及偏好与生产集合的连续性、凸性以及资源可行性。引句只是宣布结果，正文才给出条件。",
    englishContext:
      "The introduction formulates the Walrasian question: do prices and allocations exist at which consumers and producers optimize and all markets clear simultaneously? The paper converts this into equilibrium of an abstract economy and proves two existence theorems with fixed-point methods. The formal assumptions concern continuity, convexity, and feasibility; the excerpt merely announces the results before the conditions are stated.",
    distinction:
      "“存在”不等于唯一、稳定、可计算或现实制度会到达；论文明确不研究唯一性和稳定性。凸性等条件排除了若干递增报酬、不可分性与非凸技术，完整市场与价格接受行为也不是所有经济的描述。存在定理提供逻辑一致性基准，而非效率或政策结论的充分证据。",
    englishDistinction:
      "Existence is not uniqueness, stability, computability, or convergence by an actual institution; the paper explicitly sets uniqueness and stability aside. Convexity excludes some increasing returns, indivisibilities, and nonconvex technologies, while complete markets and price taking are not universal descriptions. The theorem supplies a consistency benchmark, not sufficient evidence for efficiency or policy.",
  },
  "economics-principles-pigou-private-social-product": {
    context:
      "第二编第六章比较“边际私人净产物”和“边际社会净产物”。第一节用行业经营者能出售并收入囊中的部分界定行业净产物，再把对国民红利的全部贡献称为社会净产物；引句之后举森林、租赁农业、烟尘与邻近环境等例子，说明两者可因未计价影响而分离。",
    englishContext:
      "Part II, Chapter VI compares marginal private and social net products. Section 1 defines the trade net product as the contribution saleable and accruing to those responsible for an industry, and the social net product as the full contribution to the national dividend. The following examples—forestry, tenant farming, smoke, and effects on neighboring property—show how unpriced consequences separate the two.",
    distinction:
      "这里的“社会”不是简单把政府收益加到企业收益，而是所考察活动的全部相关后果；测量范围、因果反事实和受影响者仍须明确。私人—社会差异也可能来自正外部性，且税收、责任规则、产权协商或技术标准何者合适不能仅凭差异存在决定。",
    englishDistinction:
      "‘Social’ does not merely add government revenue to firm revenue; it includes all relevant consequences within a stated boundary. Measurement scope, causal counterfactual, and affected parties still need specification. Divergence may also be positive, and its existence alone does not choose among taxes, liability, bargaining over rights, or technical standards.",
  },
  "economics-principles-pigou-corrective-tax-subsidy": {
    context:
      "第六章第11节在列举私人和社会净产物背离之后，讨论国家可采用的矫正方式。本句说投资流入不足的领域可获特别鼓励、流入过多的领域可受特别限制，并把补助和税收列为最明显形式；同一节还提到管制和直接经营，说明作者未把一种工具当成唯一答案。",
    englishContext:
      "After cataloguing divergences between private and social net product, Part II, Chapter VI, §11 considers corrective action. The excerpt says fields receiving too little investment may receive extraordinary encouragement and fields receiving too much may face restraint, naming bounties and taxes as the most obvious forms. The section also mentions regulation and direct operation, so it does not present one instrument as universally sufficient.",
    distinction:
      "校正税的基准应是边际外部损害而非总损害，补助也须对应可验证的边际外部收益；原文并未给出现代最优税公式。信息不足、执行成本、分配影响、寻租和污染监测都会使实际工具偏离理论矫正，政府行动本身也需比较评估。",
    englishDistinction:
      "A corrective tax is normally tied to marginal external damage rather than total harm, and a subsidy to verifiable marginal external benefit; the passage does not derive a modern optimal-tax formula. Information, enforcement cost, distribution, rent seeking, and monitoring can make actual instruments depart from theoretical correction, so government action also requires comparative evaluation.",
  },
  "economics-principles-ramsey-commodity-taxation": {
    context:
      "论文开篇设政府必须筹得给定收入、不同用途由同一资源生产，并研究怎样使税收造成的效用损失最小。引句给出第一阶近似结论：各被税商品的补偿需求量应按相同比例减少；论文后续把这个条件同需求的交叉关系写成方程，所谓“逆弹性规则”只是特殊简化。",
    englishContext:
      "The paper begins with a government required to raise a given revenue from goods produced with a common resource and asks how to minimize the resulting loss of utility. The excerpt states the first-order result that compensated quantities of all taxed goods should fall in the same proportion. Ramsey then expresses the condition through interrelated demands; the familiar inverse-elasticity rule is only a special simplification.",
    distinction:
      "“同比例减少”不是说税率相同，也不是主张专门重税必需品；它来自一个没有明确分配权重、生产结构简化的最优税问题。收入效应、家庭异质性、逃税、行政成本与公平目标加入后，税率结论会改变。",
    englishDistinction:
      "Equal proportional reductions do not mean equal tax rates, nor do they by themselves recommend heavily taxing necessities. The result comes from an optimal-tax problem with simplified production and no explicit distributive weights. Income effects, household heterogeneity, avoidance, administration, and equity objectives change the prescription.",
  },
  "economics-principles-henry-george-land-value-tax": {
    context:
      "第八编第三章在提出以地租为公共收入来源后，把土地同制造品、改良物、商业和资本逐项对照：对可生产或迁移的税基征税会压低相关活动，土地位置本身却不能被生产者减少或移走。引句以强烈措辞概括这种税基差异；前后论证都把建筑与其他改良物排除在土地价值之外。",
    englishContext:
      "Book VIII, Chapter III proposes land rent as public revenue and contrasts land with manufactures, improvements, commerce, and mobile capital. Taxes can reduce produced or movable bases, whereas a site cannot be produced less or moved away. The excerpt forcefully summarizes that difference; the surrounding argument excludes buildings and other improvements from the land value to be taken.",
    distinction:
      "“唯一效果”是乔治的规范性强断言，不是无需经验验证的结论。现实土地税的影响取决于能否把地价与建筑价值分开、评估是否及时、预期资本化、流动性与过渡安排；对纯地租的税较少扭曲供给，不代表任何房产税都无行为效应。",
    englishDistinction:
      "‘The only effect’ is George's strong normative assertion, not an assumption-free empirical finding. Actual effects depend on separating site from improvements, timely assessment, capitalization into prices, liquidity, and transition design. A tax on pure land rent has a relatively inelastic base; that does not make every property tax behaviorally neutral.",
  },
  "economics-principles-harberger-deadweight-loss": {
    context:
      "哈伯格为估计制造业垄断造成的资源错配，先假定长期平均成本近似不变、市场清算，并把行业利润率偏离平均值当成资本配置过多或过少的信号。引句把这一操作判断写成两侧；随后图1用需求曲线和成本线构造因产量偏离竞争水平产生的三角形福利损失。",
    englishContext:
      "To estimate manufacturing welfare loss from monopoly, Harberger assumes approximately constant long-run average costs, market clearing, and interprets deviations of industry returns from the average as too little or too much capital. The excerpt states the two directions. Figure 1 then uses demand and cost curves to construct the triangular loss from output differing from the competitive level.",
    distinction:
      "高回报不必然证明资源过少或垄断：风险、无形资本、创新租金与测量误差也会抬高会计利润。三角形估计关注未发生交易的净损失，不等于全部加价收入；分配、进入、寻租与创新效应需要另算。",
    englishDistinction:
      "High returns do not necessarily prove too few resources or monopoly; risk, intangible capital, innovation rents, and measurement error can raise accounting returns. The triangle estimates net gains from trades not made, not all markup revenue. Distribution, entry, rent seeking, and innovation effects require separate analysis.",
  },
  "economics-principles-nash-bargaining": {
    context:
      "论文先把谈判问题表示为双方可实现效用对的紧凸集合和一个不合作点，并通过仿射变换把不合作效用规范为零。纳什提出帕累托有效、对称、尺度不变与无关替代等条件；引句说明这些条件把解唯一锁定为第一象限中 u₁u₂ 最大的点，随后用几何方式证明。",
    englishContext:
      "The paper represents bargaining by a compact convex set of feasible utility pairs and a disagreement point, normalized to zero by affine transformations. Nash imposes Pareto efficiency, symmetry, invariance to utility scale, and independence of irrelevant alternatives. The excerpt says these conditions uniquely select the first-quadrant point maximizing u₁u₂, followed by the geometric proof.",
    distinction:
      "乘积最大化的是相对谈崩点的效用增益，不是金钱收入本身；效用尺度、可行集与谈崩点的设定都会改变结果。公理给出规范化解概念，不描述谈判过程，也不保证真实权力、信息不对称或外部影响已被公平纳入。",
    englishDistinction:
      "The product concerns utility gains over disagreement, not money income itself. Results depend on the feasible set, disagreement point, and utility representation. The axioms define a solution concept rather than a bargaining process and do not guarantee that actual power, asymmetric information, or effects on outsiders have been fairly represented.",
  },
  "economics-principles-hotelling-spatial-competition": {
    context:
      "论文以一条街两端分布的消费者和两个卖方为例，把顾客支付的交付价格写成标价加运输成本。卖方移动位置会争取中间顾客，导致二者向中心靠拢；在完成位置模型后，引句把结论推广到口味、包装和政治立场等特征空间，随后批评这种过度相似未必符合消费者便利。",
    englishContext:
      "The paper places consumers along a line and writes delivered price as posted price plus transport cost. Each seller can gain marginal customers by moving toward the other, drawing both toward the center. After developing the location model, the excerpt extends the result to tastes, packaging, and political positions, then observes that excessive similarity need not serve consumers' convenience.",
    distinction:
      "最小差异化依赖线性空间、消费者分布、价格规则和进入条件；允许多家企业、不同运输成本、先后定价或强烈偏好时，均衡可能转向差异化。它是竞争可能造成趋同的模型，不是“两家店一定开在正中间”的普遍定律。",
    englishDistinction:
      "Minimum differentiation depends on a linear space, consumer distribution, pricing rules, and entry conditions. More firms, different transport costs, sequential pricing, or strong tastes can produce differentiation instead. It is a model of possible convergence, not a universal law that two sellers must locate at the exact center.",
  },
  "economics-principles-sweezy-kinked-demand": {
    context:
      "斯威齐先问寡头价格为何常呈黏性，并假定企业预期竞争者会跟随降价却不跟随涨价。于是当前价格以上需求较有弹性、以下较无弹性，两段在现价相接形成引句所说折角；相应边际收益曲线出现缺口，使一段范围内的边际成本变化不必改变价格。",
    englishContext:
      "Sweezy asks why oligopoly prices can be sticky and assumes a firm expects rivals to match price cuts but not price increases. Demand is therefore more elastic above the current price and less elastic below it, with the two segments meeting at the ‘corner’ named in the excerpt. The corresponding marginal-revenue curve has a gap, so some marginal-cost changes need not move price.",
    distinction:
      "模型解释给定现价为何持续，却不解释最初现价怎样形成；关键预期也须由行为证据支持。若企业协调涨价、竞争者反应不同、需求或成本发生大冲击，折角和黏性都可能消失。",
    englishDistinction:
      "The model explains persistence around a given price but not how that price was initially set, and its conjectures about rivals require behavioral evidence. Coordinated increases, different rival responses, or large demand and cost shocks can remove the kink and its price rigidity.",
  },
  "economics-principles-pigou-price-discrimination": {
    context:
      "第二编第十四章先按垄断者能把消费者剩余转化为收入的程度区分三级价格歧视。第一级针对每个单位收取不同最高价，第二级按购买数量分段；引句定义第三级：借可操作标志把顾客隔成若干市场并对各组定不同垄断价格。后文用各市场需求弹性说明价格为何不同。",
    englishContext:
      "Part II, Chapter XIV distinguishes three degrees of price discrimination by how fully a monopolist can appropriate surplus. First degree charges each unit's maximum price; second degree uses quantity blocks. The excerpt defines third degree as separating customers by a practicable mark and charging each group a distinct monopoly price. The following analysis connects those prices to demand elasticities across markets.",
    distinction:
      "分组定价还需要市场势力和转售受限；仅有学生票、时段价或成本差异并不足以证明价格歧视。它对总产量和福利的方向并不固定：有时扩大服务覆盖，有时主要转移剩余或排斥高支付群体，须比较反事实产量与成本。",
    englishDistinction:
      "Group pricing also requires market power and limited resale. Student discounts, peak prices, or cost differences alone do not establish discrimination. Its effects on output and welfare are not signed in general: it may expand service or primarily transfer surplus and exclude groups, so counterfactual quantity and cost must be compared.",
  },
  "economics-principles-hume-price-specie-flow": {
    context:
      "〈论贸易差额〉用思想实验设想英国一夜间货币增加五倍。休谟问国内工资和商品价格上升后，外国是否会停止购买、廉价进口是否会吸走贵金属，直到相对价格恢复；引句正是一连串反问的核心。文章以此反对把永久积累金银等同于永久国家富强。",
    englishContext:
      "‘Of the Balance of Trade’ imagines Britain's money stock multiplied fivefold overnight. Hume asks whether higher domestic wages and goods prices would deter foreigners, while cheaper imports drew specie out until relative prices returned toward foreign levels. The excerpt is the core sequence of rhetorical questions, used against identifying permanent specie accumulation with permanent national prosperity.",
    distinction:
      "这是金属货币、价格可调整和国际支付以贵金属结算背景下的机制，不是现代浮动汇率与资本流动经济的完整模型。调节速度受黏性价格、信用、央行政策、资本账户和贸易弹性影响，贸易失衡也未必自动或无痛消失。",
    englishDistinction:
      "The mechanism belongs to specie settlement with adjustable prices, not a complete model of modern floating exchange rates and capital flows. Its speed depends on price stickiness, credit, central-bank action, capital accounts, and trade elasticities; external imbalances need not disappear automatically or painlessly.",
  },
  "economics-principles-bagehot-lender-last-resort": {
    context:
      "第七章在英格兰银行集中持有最终现金储备的制度背景下，认为否认责任无济于事，恐慌时必须让公众相信可获得现金。白芝浩先要求“自由而有力”放款，再以两个分段列出高利率和良好担保品规则；卡片用省略号合并了这几个相邻段落，后文解释高息可保护储备并吸引海外黄金。",
    englishContext:
      "Chapter VII begins from a system in which the Bank of England holds the ultimate cash reserve and argues that denying responsibility cannot calm a panic. It first requires lending ‘freely and vigorously,’ then states in separate paragraphs the rules of a high rate and good banking collateral; the card marks those paragraph omissions. Bagehot next explains that a high rate protects the reserve and attracts foreign gold.",
    distinction:
      "“良好担保品”与高息旨在区分暂时流动性短缺和无偿付能力，不是向所有机构无条件救助；危机中两者往往难实时辨认。现代存款保险、资本监管、多币种融资和系统重要性会改变操作，高惩罚利率若过高也可能加剧挤兑。",
    englishDistinction:
      "Good collateral and a high rate are meant to distinguish temporary illiquidity from insolvency, not to guarantee every institution a rescue; in a panic the distinction is difficult in real time. Deposit insurance, capital regulation, foreign-currency funding, and systemic importance change modern implementation, while an excessive penalty rate can intensify runs.",
  },
  "economics-modern-schultz-human-capital-investment": {
    context:
      "1960年美国经济学会主席演说开篇反驳把人的知识和技能只列作消费的国民账户习惯。引句之后，舒尔茨枚举健康、在职培训、正式教育、成人教育和迁移，并指出学生与受训者放弃的收入也是投资成本；后文用这些投入解释劳动收入增长中物质资本难以说明的部分。",
    englishContext:
      "The 1960 AEA presidential address challenges national-accounting conventions that classify knowledge and skill formation merely as consumption. After the excerpt Schultz lists health, on-the-job training, schooling, adult education, and migration, including earnings forgone by students and trainees as investment costs. He later uses such investments to interpret earnings growth unexplained by physical capital alone.",
    distinction:
      "称为“资本”是分析未来能力与回报的比喻，不把人等同于可买卖资产，也不表示教育价值仅在工资。相关性可能混入能力选择、家庭背景与劳动力市场歧视；估计回报需因果设计，并同时考虑非货币收益和公共外溢。",
    englishDistinction:
      "Calling it capital is an analytic way to study future capacity and returns; it neither makes persons alienable assets nor reduces education's value to wages. Correlations can mix selection by ability, family background, and labor-market discrimination. Returns require causal identification and should include nonpecuniary benefits and spillovers.",
  },
  "economics-modern-deaton-household-welfare-measurement": {
    context:
      "第一章开篇说明调查设计须从用途出发：抽样、问卷、价格与家庭定义会决定能推断什么。引句用均值与离散程度对比，指出为人口总量优化的抽样可能漏掉分布尾部或群内差异；后文分别讨论消费总量、贫困线、价格指数与不平等测量中的聚合和误差。",
    englishContext:
      "Chapter 1 opens by tying survey design to intended inference: sampling, questionnaires, prices, and household definitions determine what can be learned. The excerpt contrasts means and dispersion, noting that a design optimized for population totals may miss tails or within-group variation. Later chapters treat aggregation and error in consumption, poverty lines, price indexes, and inequality.",
    distinction:
      "这不是说调查不能测不平等，而是设计对估计目标有针对性；代表性也不是单一属性。权重、无应答、顶端漏报、家庭规模与地区价格都会改变分布结果，行政数据同样有覆盖与概念边界，不能被当成无误差真值。",
    englishDistinction:
      "The point is not that surveys cannot measure inequality, but that design is estimand-specific and representativeness is not one property. Weights, nonresponse, missing top incomes, household size, and spatial prices alter distributional results. Administrative data have coverage and conceptual boundaries too and are not error-free truth.",
  },
  "economics-modern-hotelling-scarcity-rent": {
    context:
      "第二节建立所有者在不同时点选择开采量的自由竞争基准。若扣除开采与上市成本后的净价增长慢于利息，推迟开采不如现在出售后投资；增长快于利息则相反。无套利因此要求净价 p 按利息力 γ 指数增长，引句把这一时间路径写成公式，后文再引入成本、垄断与有限存量。",
    englishContext:
      "Section 2 models competitive owners choosing extraction across time. If net price after extraction and marketing costs rises more slowly than interest, selling now and investing dominates waiting; if it rises faster, postponement dominates. No arbitrage therefore makes net price p grow at the force of interest γ, expressed by the excerpt's formula. Later sections add extraction cost, monopoly, and finite stocks.",
    distinction:
      "霍特林规则针对稀缺租或净价，不是加油站零售价必按利率上涨。发现新储量、技术、开采成本、税费、不确定性、市场势力与环境政策都会改变观察路径；即便规则成立，也不自动说明开采速度在代际或生态上最优。",
    englishDistinction:
      "The Hotelling rule concerns scarcity rent or net price, not a claim that retail fuel prices must rise at interest. Discoveries, technology, extraction costs, taxes, uncertainty, market power, and environmental policy change the observed path. Even if the rule holds, it does not establish intergenerational or ecological optimality.",
  },
  "economics-modern-dasgupta-biodiversity-inclusive-wealth": {
    context:
      "完整版评述前言先说经济学必须把人类需求嵌入自然的有限供给，并批评GDP只记录流量而忽略资产耗损。引句定义“包容性财富”之所以包容，是把自然同生产资本与人力资本一样列为资产；报告后续用影子价格和资产存量变化讨论可持续福祉。",
    englishContext:
      "The Review's Preface embeds human demand within nature's finite supply and criticizes GDP for recording flows while omitting asset depletion. The excerpt explains that wealth is ‘inclusive’ because it treats nature as an asset alongside produced and human capital. The report then uses shadow prices and changes in asset stocks to discuss sustainable well-being.",
    distinction:
      "把自然记为资产不表示生态系统可完全货币化、可与其他资本无限替代或只在服务人类时有价值。影子价格依赖知识、伦理权重和临界阈值；不可逆损失、未知相互依赖与权利问题要求数量边界和审慎原则补充资产核算。",
    englishDistinction:
      "Treating nature as an asset does not imply complete monetization, unlimited substitution with other capital, or value only through human service. Shadow prices depend on knowledge, ethical weights, and thresholds. Irreversibility, unknown interdependence, and rights require physical limits and precaution alongside asset accounts.",
  },
  "economics-modern-gale-shapley-deferred-acceptance": {
    context:
      "前三节定义婚配稳定性并证明每一组有限偏好都至少有一个稳定婚配。第四节把一对一模型扩展到大学可录取多个申请人的情形；引句之后给出程序：申请人向首选学校申请，学校暂留容量内最偏好的申请、拒绝其余，遭拒者下一轮再申请，直到无人被拒。",
    englishContext:
      "The first three sections define stability for marriage and prove that every finite preference profile has at least one stable matching. Section 4 extends the one-to-one model to colleges with capacities. After the excerpt applicants propose to their top choices; colleges tentatively hold their preferred applications up to capacity and reject the rest; rejected applicants propose again until no rejection occurs.",
    distinction:
      "延迟接受保证相对于所提交偏好的稳定性，不保证人人得到首选、结果总体公平或偏好本身不受策略和制度塑造。哪一侧提议会影响该侧最优的稳定结果；名额、优先级、配额、情侣申请与信息误报都会改变性质。",
    englishDistinction:
      "Deferred acceptance guarantees stability relative to submitted preferences, not everyone's first choice, overall fairness, or preferences free of strategic and institutional influence. The proposing side affects which side obtains its optimal stable matching. Capacities, priorities, quotas, couples, and misreporting change the mechanism's properties.",
  },
  "economics-principles-menger-origin-money": {
    context:
      "第五节先把商品的“可出售性”拆成在正常价格下成交的难易、等待时间、可成交数量以及空间和时间范围。第六节据此说明：直接物物交换若暂时不能实现，交易者会先把较难出售的货物换成自己并不消费、却更容易再次出售的商品，以更稳妥地接近最终所需。本句概括这种未经共同约定的个人选择；后文再把知识扩散、模仿、实践与习惯写成某些商品逐渐成为普遍交换媒介的机制。",
    englishContext:
      "Section V analyzes a commodity's saleableness in terms of disposal at ordinary economic prices, waiting time, quantities that can be sold, and spatial and temporal reach. Section VI then argues that when direct barter cannot achieve a trader's final aim, the trader may first accept a commodity not wanted for consumption but easier to resell, moving more securely toward the desired good. This sentence summarizes such uncoordinated individual choices; the following pages add diffusion of knowledge, imitation, practice, and habit as mechanisms by which some commodities become generally accepted media of exchange.",
    distinction:
      "“没有约定、没有法律强制”是在解释一种可能的起源路径，并不声称法律永远不能创设交换媒介，也不否认国家、税收、清偿规则与银行后来会改变货币体系。这里的“更易出售”也不是抽象知名度，而是在价格、时间、数量和地域条件下较容易再交换。个人“不顾共同利益”意指行动无需以共同制度为预先目标，不等于所得制度必然有利或有害于所有人。",
    englishDistinction:
      "‘Without convention’ and ‘without legal compulsion’ describe one possible path of origin. They do not claim that law can never institute a medium of exchange or that states, taxes, settlement rules, and banking cannot later transform a monetary system. ‘More saleable’ is not mere popularity but easier resale under price, time, quantity, and geographic conditions. Acting without regard to the common interest means the shared institution need not be anyone's prior aim; it does not prove that every resulting institution benefits or harms everyone.",
  },
  "economics-akerlof-lemons-adverse-selection": {
    context:
      "第II节先设想好车与“柠檬车”并存：卖方知道自己的车质，买方购买前不能区分，于是两类车面对同一价格；优质车主不愿在该价格出售，市场平均质量随之下降。第II节B以本句回顾这一结果，并继续说明，若质量是连续等级，退出可能层层发生，甚至使任何价格下都没有交易。作者随即用供给、需求与平均质量相互依赖的模型说明这种可能性。",
    englishContext:
      "Section II first imagines good cars and lemons offered together. Sellers know their own cars' quality, buyers cannot distinguish it before purchase, and both qualities therefore face a common price. Owners of better cars decline to sell at that price, reducing average market quality. Section II.B opens with this sentence, then argues that with continuous quality grades the withdrawal can cascade until no trade occurs at any price. A model in which supply, demand, and average quality depend on one another follows.",
    distinction:
      "本句用的是“可能被挤出”，不是断言信息不对称必然毁掉所有市场。挤出机制依赖买方不能可信地区分质量、不同质量因而被同价对待，以及卖方保留价值等具体条件；检验、声誉、担保、重复交易或不同定价都可能改变结果。它同格雷欣法则只是有限类比：阿克洛夫紧邻段落明确指出，二手车例中只有卖方知道质量，货币类比中双方通常都能分辨。",
    englishDistinction:
      "The sentence says good cars ‘may’ be driven out; it does not claim that asymmetric information must destroy every market. The mechanism depends on buyers being unable to distinguish quality credibly, different qualities consequently facing a common price, and sellers' reservation values. Inspection, reputation, guarantees, repeated trade, or differentiated pricing can change the result. The comparison with Gresham's law is deliberately limited: the adjacent paragraph says only the seller knows car quality, whereas both parties can normally distinguish the kinds of money in that analogy.",
  },
  "economics-akerlof-quality-institutions": {
    context:
      "第II—III节把同一类质量不确定性扩展到保险、就业与欠发达地区的信贷市场。第IV节以本句转向市场内部的抵消办法，随后分别列举由卖方承担质量风险的担保、借长期声誉传递质量的品牌、把既有声誉扩展到新地点的连锁经营，以及以教育或执业门槛提供信号的许可证制度。它们处理的是不同信息问题，并非一个单一万能装置。",
    englishContext:
      "Sections II–III extend the quality-uncertainty problem to insurance, employment, and credit in less-developed settings. Section IV turns with this sentence to counteracting arrangements. It then distinguishes guarantees that shift quality risk to sellers, brands that transmit quality through continuing reputation, chains that carry an established reputation into new locations, and licensing that supplies a signal through educational or professional requirements. These mechanisms address different informational problems rather than forming one universal device.",
    distinction:
      "“制度出现以抵消”是功能性解释，不表示每项制度都由谁预先设计、都能准确识别质量或净收益必然为正。担保可能难执行，品牌信号可能被营销冒充，连锁声誉可能失灵，许可证也可能把最低质量保障变成排斥竞争的门槛。判断具体制度仍须比较它减少了多少信息损失、成本由谁承担以及是否产生新的权力和进入问题。",
    englishDistinction:
      "Saying institutions ‘arise to counteract’ is a functional explanation, not proof that each was deliberately designed by a particular actor, measures quality accurately, or produces positive net benefits. Guarantees may be hard to enforce, marketing may mimic a brand signal, chain reputation may fail, and licensing may turn a minimum-quality safeguard into an entry barrier. A concrete institution still has to be judged by how much information loss it reduces, who bears its costs, and what new power or access problems it creates.",
  },
  "economics-principles-aumann-correlated-equilibrium": {
    context:
      "第9节先把论文结果分成非合作理论中的均衡点与合作理论中的可行点，再区分沟通、相关、承诺和契约。本句只给“相关”下形式定义；紧接着把承诺界定为不可撤回的行动承担，把契约界定为多方同时作出的承诺。前面的例2.7等已经展示，随机装置可向参与者发出不同私人信息，使其策略相关且在各自信息下不愿单边偏离。",
    englishContext:
      "Section 9 first separates the paper's equilibrium results in noncooperative theory from feasible-point results in cooperative theory, then distinguishes communication, correlation, commitment, and contract. This sentence gives only the formal definition of correlation. The next lines define a commitment as an irrevocable undertaking and a contract as a set of undertakings by several players. Earlier examples, including 2.7, use a random device that supplies different private information to players, correlating their strategies while leaving none willing to deviate given that information.",
    distinction:
      "统计依赖本身不等于相关均衡：它既不保证策略由共同装置产生，也不保证参与者愿意遵从建议，更不证明存在沟通、合谋、因果影响或外部强制。相关均衡还要检查每个人在看到自己的信息后是否有单边偏离激励。论文也明确说，相关可能出现在自我执行的非合作安排中，并不是合作博弈的专属标志。",
    englishDistinction:
      "Statistical dependence alone is not a correlated equilibrium. It does not guarantee a common device, obedience to recommendations, communication, collusion, causal influence, or external enforcement. Correlated equilibrium additionally requires checking that no player wishes to deviate unilaterally after receiving that player's information. The paper also says correlation can occur in self-enforcing noncooperative arrangements and is not a defining mark of cooperative games.",
  },
  "economics-modern-abadie-diamond-hainmueller-synthetic-control": {
    context:
      "第2节先用含未观测共同因子的模型说明，若处理地区能由若干未处理地区在政策前结果和预测变量上良好拟合，加权组合可近似其未受政策时的路径。第2.3节把W定义为一组非负且总和为1的权重，本句据此把W的每个取值称为一个合成控制；随后以处理地区同加权供体之间的预测变量距离来选择W。论文也提醒，政策前拟合差时不建议使用，并讨论限制供体池以减少跨异质地区插值的偏差。",
    englishContext:
      "Section 2 uses a model with unobserved common factors to argue that, when a treated region can be well matched by untreated regions on preintervention outcomes and predictors, their weighted combination may approximate its untreated path. Section 2.3 defines W as nonnegative weights summing to one; this sentence calls each such weighted combination a synthetic control. W is then chosen to minimize predictor distance between the treated region and the weighted donor pool. The paper also advises against the method when preintervention fit is poor and discusses restricting donors to reduce interpolation across very dissimilar regions.",
    distinction:
      "任何加权平均在定义上都可成为一个“合成控制”，但并非因此就是可信反事实。因果解释还依赖处理前拟合、供体未受同一干预或溢出影响、没有只作用于处理地区的同期冲击，以及结果对供体池与设定不过度敏感。非负且总和为1的权重限制为凸组合；允许负权重或大于1会变成外推，并引入不同风险。",
    englishDistinction:
      "Any qualifying weighted average is a ‘synthetic control’ by definition, but that alone does not make it a credible counterfactual. Causal interpretation also depends on preintervention fit, donors not receiving the intervention or spillovers, absence of a concurrent shock unique to the treated unit, and reasonable stability across donor pools and specifications. Nonnegative weights summing to one restrict the estimate to a convex combination; negative weights or weights above one allow extrapolation and bring different risks.",
  },
  "economics-modern-arrow-medical-care-uncertainty": {
    context:
      "第I节先用竞争均衡的福利性质作为比较基准，再指出医疗中的疾病风险、风险承保市场缺失和信息商品的特殊困难。患者购买专业照护时，往往正因为自己还不知道信息的内容与价值。引句在这些论证后提出全文的解释框架：医疗行业的特殊制度大多同不确定性有关；后文再分别讨论医患信任、职业规范、供给限制、定价、保险与非营利组织。",
    englishContext:
      "Section I begins with the welfare properties of competitive equilibrium as a benchmark, then identifies illness risk, missing markets for risk bearing, and the peculiar difficulty of information as a commodity in medical care. Patients often buy professional care precisely because they do not yet know the content or value of the information. After that setup, the excerpt states the paper's organizing claim that most distinctive institutions of medical care are connected to uncertainty; later sections separately examine physician–patient trust, professional norms, supply restrictions, pricing, insurance, and nonprofit organization.",
    distinction:
      "“几乎所有”是作者明确提出、随后展开的广泛解释命题，不是逐项已经证明的定理；“这个行业”特指医疗服务。句子没有说市场在医疗中毫无作用，也没有保证保险、职业许可、伦理规范或非营利形式一定有效。它要求把风险、信息成本和不可观察质量纳入比较制度，而不是用“不确定”一词替代对具体机制与分配后果的检验。",
    englishDistinction:
      "‘Virtually all’ announces a broad explanatory thesis to be developed, not an already proven theorem about each feature, and ‘this industry’ means medical care. The sentence neither says markets have no role in medicine nor guarantees that insurance, licensing, professional ethics, or nonprofit forms work well. It calls for institutional comparison that includes risk, information cost, and unobservable quality, not for using ‘uncertainty’ as a substitute for testing concrete mechanisms and distributional effects.",
  },
  "economics-hayek-dispersed-knowledge": {
    context:
      "第三至四节把相关知识区分为可汇总的科学知识与关于特定时间、地点、资源和机会的现场知识，并强调后者随日常变化不断更新。第五节说，快速适应这些变化要求把最终决定留给熟悉现场的人；本句给出分散化的理由。下一句立刻补充，现场的人也不能只靠自己的有限知识决策，仍须得到能让其计划嵌入更大体系的信息；第六节才转向价格系统怎样压缩并传递这种信息。",
    englishContext:
      "Sections III–IV distinguish aggregable scientific knowledge from on-the-spot knowledge of particular times, places, resources, and opportunities, emphasizing that the latter changes through daily adjustments. Section V says rapid adaptation requires leaving ultimate decisions to people familiar with those circumstances; the excerpt states why decentralization is needed. The very next sentence adds that the person on the spot still cannot decide solely from limited local knowledge and needs information that fits the decision into a wider system. Section VI then turns to the price system as one way of compressing and communicating such information.",
    distinction:
      "分散决策不等于各自孤立行动，也不是“任何地方判断都比汇总证据可靠”的通则。紧邻语境本身要求把本地知识同更大体系的信息协调起来；价格只是论文随后讨论的一种信号。原句不能单独证明所有中央规则都失败，也没有处理污染、公共品、垄断权力或无支付能力者需求等价格可能遗漏的问题。",
    englishDistinction:
      "Decentralization does not mean isolated action or a rule that every local judgment is more reliable than aggregated evidence. The adjacent passage itself requires coordinating local knowledge with information about the wider system; prices are one signal discussed next. The excerpt alone does not prove that every central rule fails, and it does not resolve externalities, public goods, monopoly power, or needs that lack purchasing power and may be omitted from price signals.",
  },
  "economics-fisher-debt-deflation": {
    context:
      "第24与27节先把过度负债后的九个变量按逻辑和大致时间顺序排列，包括清算、急售、价格下跌、净值收缩、破产、产出与就业下降。第28—31节强调，单有负债而未引发价格下跌，或单有通缩而没有大规模债务，破坏都较轻；最危险的是二者互相强化。第32节说明价格下跌使每个未偿“美元债务”实际变重，清算减少名义债务的速度若赶不上货币实际价值上升，便出现本句概括的自我挫败反馈。",
    englishContext:
      "Sections 24 and 27 arrange nine variables after overindebtedness in a logical and approximate chronological sequence, including liquidation, distress selling, price decline, shrinking net worth, bankruptcy, and falling output and employment. Sections 28–31 stress that debt without a price fall, or deflation without a large debt burden, is less destructive; the dangerous case is their mutual reinforcement. Section 32 explains that falling prices enlarge the real value of each unpaid dollar. When liquidation reduces nominal debt more slowly than it raises each dollar's real burden, the excerpt's self-defeating feedback appears.",
    distinction:
      "“越还越多”说的是总体清算与通缩条件下实际债务负担可能上升，不是个人每次付款都会增加合同上的名义本金。费雪把它限定在起初过度负债足够严重、清算会压低价格的“倾覆”情形；若通胀力量抵消价格下跌，或杠杆较低，路径可以不同。机制也不是不可打断的宿命，债务重组、货币与财政反应、合同币种及银行吸收损失的能力都会改变反馈。",
    englishDistinction:
      "‘The more they pay, the more they owe’ concerns a rising real aggregate debt burden under liquidation and deflation, not an increase in a borrower's contractual nominal principal after every payment. Fisher limits it to a ‘capsizing’ case in which initial overindebtedness is large enough for liquidation to depress prices; offsetting inflation or lower leverage can produce a different path. The mechanism is not fate: restructuring, monetary and fiscal responses, contract denomination, and banks' ability to absorb losses can interrupt or reshape it.",
  },
  "economics-smith-division-specialization": {
    context:
      "第一篇第一章用制针工场把开篇命题展开：制针被拆成约十八道工序并分配给不同工人后，十人一天可制成约四万八千枚针；若各自独立完成全部工序，产量会低得多。史密斯随后把增产拆成三个来源：反复做单一操作所形成的熟练，免去在不同工作间切换的时间，以及更容易发明和采用节省劳动的机器。本句因此是本章的总领句，后面的数字例子和三项机制才是它的论证内容。",
    englishContext:
      "Book I, Chapter 1 develops its opening claim through the pin manufactory. Once pin-making is divided into roughly eighteen operations and assigned among workers, ten people can make about forty-eight thousand pins in a day, far more than if each completed every operation alone. Smith then separates three sources of the increase: dexterity acquired through repetition, time saved by avoiding switches between tasks, and machinery that facilitates and abridges labor. The excerpt is therefore the chapter's thesis; the numerical example and those three mechanisms supply its argument.",
    distinction:
      "这里说的是分工怎样提高特定生产过程的产量，不等于分工在任何尺度上都没有代价，也不等于工人的福祉会与产量自动同步上升。史密斯在《国富论》第五篇还讨论长期单调分工可能使普通劳动者的理解力变得迟钝，并把公共教育视为补救之一。应用这句话时，应把生产率机制同技能退化、协调成本、依赖关系和收益分配分别考察。",
    englishDistinction:
      "The passage explains how division raises output in a production process; it does not say division has no cost at any scale or that workers' welfare rises automatically with output. In Book V Smith also warns that prolonged, monotonous specialization may dull ordinary workers' understanding and treats public education as one remedy. Applying the sentence therefore requires separating the productivity mechanism from deskilling, coordination costs, dependence, and the distribution of gains.",
  },
  "economics-smith-market-extent": {
    context:
      "第一篇第二章先把分工追溯到交换倾向：人能用自己的剩余产物换取他人劳动的产物，才有理由专做一项工作。第三章以本句接续这一论证，并立即解释，小市场无法让专门生产者稳定卖出超过自用的部分；随后用乡村搬运工、苏格兰高地职业以及水运扩大沿岸市场等例子说明，人口密度和运输条件怎样改变可维持的专业化程度。",
    englishContext:
      "Book I, Chapter 2 traces specialization to the propensity to exchange: a person can concentrate on one task because surplus output can be traded for the products of others. Chapter 3 continues with this sentence and immediately explains that a small market gives a specialist too little opportunity to dispose of output beyond personal consumption. Examples of porters, rural occupations in the Scottish Highlands, and water transport opening larger coastal markets then show how population density and transport conditions change the degree of specialization that can be sustained.",
    distinction:
      "“市场范围”在本章首先由可实现的交换来界定，史密斯明确写到人口聚集与水运；把它进一步用于今天时，还可追问交通成本、交易频率、购买力、制度通达性以及生产者能否接触远方需求。原句也不是“市场越大，一切必然越好”的无限外推：更深分工可能带来规模效益，也可能增加脆弱依赖、垄断或劳动异化。它说明的是专业化受可实现交换约束，而不是替任何具体扩大市场的政策自动背书。",
    englishDistinction:
      "The chapter defines the ‘extent of the market’ first through feasible exchange and explicitly discusses population concentration and water transport. In present-day application, one may further ask about transport cost, trading frequency, purchasing power, institutional access, and producers' ability to reach distant demand. The sentence is not an unlimited claim that every larger market is better: deeper specialization can create scale gains while also increasing fragile dependence, market power, or alienation. It identifies exchange as a constraint on specialization, not an automatic endorsement of every market-expanding policy.",
  },
  "economics-smith-local-knowledge-exchange": {
    context:
      "第四篇第二章讨论是否应限制能够在本国生产的外国货物。本句之前，史密斯假定资本所有者既偏好国内投资的安全，也会把资本导向预期产值较高的用途，并在这一特定论证中写下“看不见的手”；本句随后把私人判断同政治家替其指定资本用途相比较。后文以家庭不会高成本自制本可低价购得之物作类比，反对用进口限制赋予国内生产者本国市场垄断、把资本强行导向较低价值的生产。",
    englishContext:
      "Book IV, Chapter 2 asks whether imports of goods that can be made domestically should be restrained. Before this excerpt, Smith assumes that owners prefer the security of domestic employment and direct capital toward uses expected to yield greater value, introducing the ‘invisible hand’ within that particular argument. The excerpt then compares their situated judgment with a statesman assigning capital uses for them. Smith next compares the choice with a household buying rather than making a costlier item and argues against an import restraint that grants domestic producers a home-market monopoly and diverts capital into lower-value production.",
    distinction:
      "“本地情形判断较好”比较的是投资者与远处官员对其资本可投产业和预期产值的认识，不是断言个人掌握所有社会后果，也不是反对一切公共规则。该段没有把污染、系统性风险、公共品、垄断或分配影响纳入个人利润判断；同一章还承认国防等例外。把它扩展为一般知识论命题时，必须说明比较对象、信息范围和未被价格承担的成本。",
    englishDistinction:
      "‘Judge much better in his local situation’ compares an investor's knowledge of possible employments and expected product value with a distant official's attempt to assign that capital. It does not say individuals know every social consequence or reject every public rule. The paragraph does not put pollution, systemic risk, public goods, monopoly, or distributional effects inside the investor's profit calculation, and the chapter recognizes exceptions such as defense. Any broader knowledge claim must specify the decision, the information compared, and costs not borne through prices.",
  },
  "economics-smith-public-works": {
    context:
      "第五篇第一章先列出主权者的国防与司法职责，再以本句引入第三项职责。紧接着，史密斯把相关机构分为促进商业的道路、桥梁、运河和港口，以及教育青年和各年龄人群的机构；他随后专门讨论这些费用怎样负担。尤其值得注意的是，他认为许多交通工程可以按使用量收取通行费，自行负担维护成本，而不必全部由一般公共收入无偿供给。",
    englishContext:
      "Book V, Chapter 1 first treats defense and the administration of justice, then introduces a third duty with this sentence. Smith immediately divides the relevant institutions into roads, bridges, canals, and harbors that facilitate commerce, and institutions for educating the young and people of all ages; he then asks how their costs should be met. Crucially, he argues that many transport works can charge tolls related to use and cover their own maintenance rather than being supplied wholly without charge from general public revenue.",
    distinction:
      "本句识别的是私人收益不足以偿还支出而社会收益可能很高的供给缺口，不等于所有有公共好处的项目都应由中央政府直接建造、免费开放或无限补贴。后文的使用费表明，“公共职责”可以同受益者付费、专门收入和不同管理形式并存。现实判断还须验证社会收益、拥挤与排他性、收费可行性、治理能力及失败风险，不能只凭“公共工程”名称下结论。",
    englishDistinction:
      "The sentence identifies a provision gap where private profit cannot repay expense although social advantage may be high. It does not imply that every beneficial project must be centrally built, free at the point of use, or subsidized without limit. The following discussion of user charges shows that a public duty can coexist with beneficiary payment, earmarked revenue, and varied management forms. A present-day judgment must still test social benefit, congestion and excludability, charging feasibility, governance capacity, and failure risk rather than infer policy from the label ‘public work.’",
  },
  "economics-smith-moral-spectator": {
    context:
      "第三部第二章先说明，自我判断暗中参照真实、可能或理应存在的他人判断；随后以一个人借镜子从远处看见自身外貌作类比。我们最初评判他人的性格与行为，也逐渐发现他人同样会评判自己。本句写下由此发生的视角转换；下一句说，我们把自己设想成自身行为的旁观者，以他人的眼睛检验其是否适当。稍后史密斯把自我分成作为被审视行动者的“我”和作为审查者、裁判者的另一个“我”。",
    englishContext:
      "Part III, Chapter II first says that self-judgment secretly refers to what others do, would, or ought to feel, then develops the analogy of seeing one's appearance from a distance through a mirror. We first criticize other people's character and conduct, then learn that they scrutinize us as frankly. The excerpt records the resulting change of perspective; the next sentence says we imagine ourselves as spectators of our own behavior and inspect its propriety with others' eyes. Smith soon divides the self into the agent being examined and another self acting as examiner and judge.",
    distinction:
      "想象他人眼光不是简单服从现实舆论。史密斯紧邻段落说，只要从旁观者位置仍认为自己适当，人可以承受误解与责难；后来的“公正旁观者”更要求校正真实观众的偏见。该机制也不保证判断无误：想象可能狭窄，社会规范可能不公，行动者可能自欺，因此旁观视角是一种反思结构，不是把多数认可当作道德真理。",
    englishDistinction:
      "Imagining others' eyes is not simple submission to actual opinion. The adjacent paragraph says that someone who still appears proper from the spectator's standpoint can withstand misunderstanding and censure, and Smith's later ‘impartial spectator’ more explicitly corrects the biases of real audiences. The mechanism does not guarantee accuracy: imagination can be narrow, social norms unjust, and agents self-deceived. The spectator standpoint is a structure of reflection, not a rule that majority approval equals moral truth.",
  },
  "economics-ricardo-comparative-advantage": {
    context:
      "1817年初版第六章（后续版本编为第七章）先说，一国之内调节商品相对价值的规则不能原样用于国与国之间，因为资本在国内用途间移动较快，在国家之间却受安全感、法律与生活习惯牵制。随后设例：英国生产呢绒需一百人年、葡萄酒需一百二十人年；葡萄牙分别需九十与八十人年。葡萄牙虽然两种商品都用工更少，仍可把资本集中于相对更有优势的葡萄酒，用其换得比自行转产呢绒更多的呢绒；本句位于这组数字正中。",
    englishContext:
      "Chapter VI of the 1817 first edition (renumbered Chapter VII in later editions) first says that the rule governing relative commodity values within one country does not transfer unchanged to trade between countries, because capital moves comparatively readily among domestic employments but is checked across borders by insecurity, laws, and attachments. Ricardo then supposes that cloth and wine require 100 and 120 worker-years in England, but 90 and 80 in Portugal. Although Portugal uses less labor in both goods, it can concentrate capital in wine, where its relative advantage is greater, and obtain more cloth in exchange than by diverting resources to cloth.",
    distinction:
      "这段展示的是在模型假设下绝对生产率更高的一方仍可能有交换空间，不是说任何现实贸易安排都会让每个人受益。数字例以跨境资本流动受限为紧邻假设，同时没有展开运输成本、规模收益、失业转换、市场力量、环境成本和国内收益分配；相对成本本身也会随技术与制度改变。把“国家共同获益”进一步落实到具体群体，还需分析贸易条件、调整过程与补偿机制。",
    englishDistinction:
      "The example shows that, under its assumptions, a country with higher absolute productivity in both goods may still have room for exchange. It does not prove that every actual trade arrangement benefits every person. Limited cross-border capital mobility is an adjacent premise; the numbers do not develop transport costs, increasing returns, transition unemployment, market power, environmental costs, or domestic distribution, while relative costs can themselves change with technology and institutions. Moving from possible national gains to concrete groups therefore requires examining terms of trade, adjustment, and compensation.",
  },
};
