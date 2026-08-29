import type {
  ScienceAuthorProfile,
  ScienceThoughtSeed,
} from "./scienceCorpusTypes";

/**
 * Life-science cards distinguish verified source excerpts from editorial
 * paraphrases. Their source locators are intentionally specific so a reader
 * can return to the experiment, argument, or case behind each card.
 */
export const scienceLifeProfiles = {
  darwin: {
    name: "达尔文",
    englishName: "Charles Darwin",
    life: "1809—1882",
    englishLife: "1809-1882",
    school: "进化生物学与博物学",
    englishSchool: "Evolutionary Biology & Natural History",
    palette: ["#e8e4d7", "#bdba9f", "#7b8062", "#292d25"],
  },
  mendel: {
    name: "孟德尔",
    englishName: "Gregor Mendel",
    life: "1822—1884",
    englishLife: "1822-1884",
    school: "遗传学与实验植物学",
    englishSchool: "Genetics & Experimental Botany",
    palette: ["#e5e7d9", "#b6c09b", "#718557", "#273025"],
  },
  pasteur: {
    name: "巴斯德",
    englishName: "Louis Pasteur",
    life: "1822—1895",
    englishLife: "1822-1895",
    school: "微生物学与实验医学",
    englishSchool: "Microbiology & Experimental Medicine",
    palette: ["#e8e1d8", "#c3b39e", "#8b755d", "#302922"],
  },
  claude_bernard: {
    name: "克洛德·贝尔纳",
    englishName: "Claude Bernard",
    life: "1813—1878",
    englishLife: "1813-1878",
    school: "实验生理学",
    englishSchool: "Experimental Physiology",
    palette: ["#e2e7e3", "#afc0b8", "#688779", "#24302b"],
  },
  marie_curie: {
    name: "玛丽·居里",
    englishName: "Marie Curie",
    life: "1867—1934",
    englishLife: "1867-1934",
    school: "放射性研究与实验化学",
    englishSchool: "Radioactivity & Experimental Chemistry",
    palette: ["#e3e5e8", "#b4bac4", "#70798a", "#282b33"],
  },
  humboldt: {
    name: "洪堡",
    englishName: "Alexander von Humboldt",
    life: "1769—1859",
    englishLife: "1769-1859",
    school: "自然地理学与生物地理学",
    englishSchool: "Physical Geography & Biogeography",
    palette: ["#e2e8df", "#afc2aa", "#6f8c67", "#263126"],
  },
  rosalind_franklin: {
    name: "罗莎琳德·富兰克林",
    englishName: "Rosalind Franklin",
    life: "1920—1958",
    englishLife: "1920-1958",
    school: "X 射线晶体学与分子生物学",
    englishSchool: "X-ray Crystallography & Molecular Biology",
    palette: ["#e0e5e8", "#acbac2", "#657d89", "#222e34"],
  },
  rachel_carson: {
    name: "蕾切尔·卡森",
    englishName: "Rachel Carson",
    life: "1907—1964",
    englishLife: "1907-1964",
    school: "生态学与环境写作",
    englishSchool: "Ecology & Environmental Writing",
    palette: ["#e5e6d9", "#b8bd9b", "#78805a", "#2b3023"],
  },
} satisfies Record<string, ScienceAuthorProfile>;

export const scienceLifeSeeds = [
  {
    id: "science-darwin-selection",
    authorId: "darwin",
    topic: "生命",
    text: "这种对有利变异的保存和对有害变异的排除，我称之为自然选择。",
    english:
      "This preservation of favourable variations, and the rejection of injurious variations, I call Natural Selection.",
    editorialSummary:
      "自然选择是对变异后果的命名：有利差异更可能被保存，有害差异更可能被排除。",
    englishEditorialSummary:
      "Natural selection names the differing fate of variations: favourable differences are more likely to be preserved, while injurious ones are more likely to be rejected.",
    work: "《物种起源》",
    englishWork: "On the Origin of Species",
    reflection:
      "达尔文把选择机制建立在变异、遗传与差异性繁殖之上，从而用累积过程解释适应。这里的“选择”是结果性的比喻，不意味着自然具有意图，也不保证演化总会走向更复杂或更优越。",
    englishReflection:
      "Darwin built selection on variation, inheritance, and differential reproduction, using a cumulative process to explain adaptation. “Selection” is a result-oriented metaphor here: nature has no intention, and evolution is not guaranteed to move toward greater complexity or superiority.",
    question:
      "当你看到一种精巧适应时，能否把目的论直觉改写成一连串可检验的筛选过程？",
    englishQuestion:
      "When you see an intricate adaptation, can you replace the intuition of purpose with a testable sequence of filtering events?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "1859年初版，第4章，第81页",
      "1859 first edition, Chapter IV, p. 81",
    ],
  },
  {
    id: "science-darwin-struggle",
    authorId: "darwin",
    topic: "生命",
    text: "我应先说明，我是在广泛而比喻的意义上使用“生存斗争”这一术语的。",
    english:
      "I should premise that I use the term Struggle for Existence in a large and metaphorical sense",
    editorialSummary:
      "“生存斗争”在这里不只指直接搏斗，也涵盖生存、繁殖，以及生物对其他生命和环境条件的依赖。",
    englishEditorialSummary:
      "Here “struggle for existence” means more than direct combat; it includes survival, reproduction, and organisms' dependence on other life and environmental conditions.",
    work: "《物种起源》",
    englishWork: "On the Origin of Species",
    reflection:
      "达尔文明确以宽泛而隐喻的方式使用“斗争”，其中也包含互利、繁殖成功与环境限制。把它缩成永恒的个体厮杀，会遗漏生态关系，并把描述性的演化概念误读成社会规范。",
    englishReflection:
      "Darwin explicitly used “struggle” in a broad and metaphorical sense that includes mutual dependence, reproductive success, and environmental constraint. Reducing it to perpetual individual combat erases ecology and wrongly turns a descriptive evolutionary concept into a social rule.",
    question: "你正在分析的竞争，是否其实由一张更大的依赖网络塑造？",
    englishQuestion:
      "Is the competition you are analyzing actually shaped by a wider network of dependence?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "1859年初版，第3章，第62页",
      "1859 first edition, Chapter III, p. 62",
    ],
  },
  {
    id: "science-darwin-variation",
    authorId: "darwin",
    topic: "不确定",
    text: "除非有有利变异出现，否则自然选择便无从作为。",
    english:
      "unless profitable variations do occur, natural selection can do nothing.",
    editorialSummary: "变异先于筛选出现；需要解释的是哪些差异被保留，而不是假定需要会定向制造差异。",
    englishEditorialSummary:
      "Variation arises before filtering; the task is to explain which differences persist, not to assume that need manufactures them in a directed way.",
    work: "《物种起源》",
    englishWork: "On the Origin of Species",
    reflection:
      "达尔文尚不知道基因与突变机制，却谨慎地区分了变异的出现和选择的保存作用。现代遗传学修正了他的许多细节，但仍要求我们避免把结果倒写成变异产生时的目标。",
    englishReflection:
      "Darwin did not know genes or mutation mechanisms, yet he carefully distinguished the production of variation from its preservation by selection. Modern genetics has revised many details, but it still warns us not to rewrite an outcome as the goal that produced variation.",
    question: "你是否因为看见一个有用结果，就倒推出变化原本是为它而生？",
    englishQuestion:
      "Are you inferring that a change arose for a useful result merely because that result is now visible?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "1859 年初版，第 4 章，第 82 页",
      "1859 first edition, Chapter IV, p. 82",
    ],
  },
  {
    id: "science-darwin-classification",
    authorId: "darwin",
    topic: "模型",
    text: "一切真正的分类都是谱系性的。",
    english: "all true classification is genealogical",
    editorialSummary:
      "“谱系性”意味着分类应表达共同祖先与分化历史，而不只是按外观相似把物种归组。",
    englishEditorialSummary:
      "“Genealogical” means that classification should express common ancestry and histories of divergence, not merely group species by outward resemblance.",
    work: "《物种起源》",
    englishWork: "On the Origin of Species",
    reflection:
      "共同祖先把分类从便利的抽屉变成了关于历史关系的假说，形态、胚胎和残遗结构都能为它提供线索。树仍是模型而非自然本身；杂交、基因水平转移与采样不足会让真实历史比单棵树更复杂。",
    englishReflection:
      "Common ancestry turned classification from a convenient set of drawers into a hypothesis about historical relations, informed by morphology, embryology, and rudimentary organs. A tree remains a model rather than nature itself; hybridization, horizontal gene transfer, and sparse sampling can make history more complex than one tree.",
    question: "你的分类是在整理表面相似，还是在提出一个关于生成历史的假说？",
    englishQuestion:
      "Does your classification merely organize surface resemblance, or propose a hypothesis about generative history?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "1859年初版，第13章，第420页",
      "1859 first edition, Chapter XIII, p. 420",
    ],
  },
  {
    id: "science-darwin-fossil-record",
    authorId: "darwin",
    topic: "证据",
    text: "我认为，解释就在于地质记录极端不完备。",
    english:
      "The explanation lies, as I believe, in the extreme imperfection of the geological record.",
    editorialSummary:
      "化石档案只在特定的沉积、保存与发现条件下形成，因此记录的缺口不能直接等同于历史过程的缺口。",
    englishEditorialSummary:
      "The fossil archive forms only under particular conditions of deposition, preservation, and discovery, so gaps in the record do not directly equal gaps in the historical process.",
    work: "《物种起源》",
    englishWork: "On the Origin of Species",
    reflection:
      "达尔文正面处理化石记录的不完整，并用沉积、侵蚀、保存与采样条件解释为什么连续历史会留下间断档案。这不是让任何缺证都免于批评；一个解释必须同时产生关于何处可能找到证据的新预期。",
    englishReflection:
      "Darwin confronted the incompleteness of the fossil record and examined deposition, erosion, preservation, and sampling to explain why a continuous history could leave a discontinuous archive. This does not excuse every evidential gap; an explanation should also generate new expectations about where evidence might be found.",
    question:
      "一项“没有发现”的结果，究竟否定了对象，还是暴露了记录机制的盲区？",
    englishQuestion:
      "Does a failure to find something negate the object, or reveal a blind spot in the mechanism that records it?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "1859年初版，第9章，第280页",
      "1859 first edition, Chapter IX, p. 280",
    ],
  },
  {
    id: "science-darwin-biogeography",
    authorId: "darwin",
    topic: "证据",
    text: "就岛屿居民而言，对我们最显著也最重要的事实，是它们与最近大陆的生物具有亲缘关系，却并非真正相同的物种。",
    english:
      "The most striking and important fact for us in regard to the inhabitants of islands, is their affinity to those of the nearest mainland, without being actually the same species.",
    editorialSummary: "物种在哪里出现与在哪里缺席，能够像形态一样检验关于迁移、隔离和共同祖先的解释。",
    englishEditorialSummary:
      "Where species occur—and where they do not—can test explanations of migration, isolation, and common ancestry as strongly as form can.",
    work: "《物种起源》",
    englishWork: "On the Origin of Species",
    reflection:
      "岛屿物种与邻近大陆既相似又不同的格局，为带修改的传承提供了历史证据。分布并非单一机制的印章，洋流、地质变化、灭绝与偶然扩散都必须纳入比较。",
    englishReflection:
      "The pattern in which island species resemble yet differ from those of nearby continents offered historical evidence for descent with modification. Distribution is not the stamp of one mechanism alone; currents, geological change, extinction, and chance dispersal must all enter the comparison.",
    question: "如果只看对象的样子而不看它的空间分布，你会错过哪一段历史？",
    englishQuestion:
      "What history do you miss when you examine an object's form but not its spatial distribution?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "1859 年初版，第 12 章，第 397—398 页",
      "1859 first edition, Chapter XII, pp. 397–398",
    ],
  },
  {
    id: "science-mendel-design",
    authorId: "mendel",
    topic: "方法",
    text: "实验植物必须具备以下条件——一、具有恒定的区别性状；二、这些植物的杂种在开花期必须不受任何外来花粉影响，或能轻易做到这种防护。",
    english:
      "The experimental plants must necessarily—1. Possess constant differentiating characters. 2. The hybrids of such plants must, during the flowering period, be protected from the influence of all foreign pollen, or be easily capable of such protection.",
    editorialSummary:
      "要从杂乱的遗传现象中发现规则，先要选择稳定、可区分且能控制授粉的材料。",
    englishEditorialSummary:
      "To discover rules within messy inheritance, begin with stable, distinguishable material whose crosses can be controlled.",
    work: "《植物杂交试验》",
    englishWork: "Experiments in Plant-Hybridisation",
    reflection:
      "孟德尔的成果不只来自计数，也来自对豌豆品种、性状与授粉方式的精心限制。控制提高了可辨识性，却也限定了结论的范围；从简化系统得到的规律仍需在其他生物和更复杂性状中检验。",
    englishReflection:
      "Mendel's achievement came not only from counting but from carefully restricting varieties, traits, and pollination. Control increases legibility but also limits scope; rules found in a simplified system must still be tested in other organisms and more complex traits.",
    question: "为了让问题可检验，你需要主动舍弃哪些暂时无法控制的复杂性？",
    englishQuestion:
      "What complexity must you temporarily set aside to make your question testable?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "William Bateson 编《孟德尔的遗传原理》1902 年版，第 42 页，“实验植物的选择”，连续节录第 1—2 项",
      "William Bateson ed., Mendel's Principles of Heredity (1902), p. 42, “Selection of the Experimental Plants,” continuous excerpt from criteria 1–2",
    ],
  },
  {
    id: "science-mendel-ratios",
    authorId: "mendel",
    topic: "证据",
    text: "在这一代中，显性性状再次出现的同时，隐性性状也带着其完整特征重新出现；这种情况以明确的三比一平均比例发生，即这一代每四株植物中，三株表现显性性状，一株表现隐性性状。",
    english:
      "In this generation there reappear, together with the dominant characters, also the recessive ones with their full peculiarities, and this occurs in the definitely expressed average proportion of three to one, so that among each four plants of this generation three display the dominant character and one the recessive.",
    editorialSummary:
      "遗传规律显现在足够大的后代计数中，而不承诺每个家庭都精确复制理论比例。",
    englishEditorialSummary:
      "Laws of inheritance emerge in sufficiently large counts of offspring; they do not promise that every family will reproduce the theoretical ratio exactly.",
    work: "《植物杂交试验》",
    englishWork: "Experiments in Plant-Hybridisation",
    reflection:
      "孟德尔把不同实验的后代数汇总，比较观察比例与组合模型的预期。比例是统计模式，不是对单次结果的命令；样本小、存活差异和计数误差都会造成偏离。",
    englishReflection:
      "Mendel pooled offspring counts across experiments and compared observed ratios with expectations from a combinatorial model. A ratio is a statistical pattern, not a command governing each outcome; small samples, differential survival, and counting error can all produce deviations.",
    question:
      "你是在用一次例外推翻概率规律，还是在检查例外是否超过随机波动应有的尺度？",
    englishQuestion:
      "Are you using one exception to reject a probabilistic rule, or asking whether deviations exceed the scale expected from chance?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "William Bateson 编《孟德尔的遗传原理》1902 年版，第 51 页，“杂种所生的第一代”，开篇段",
      "William Bateson ed., Mendel's Principles of Heredity (1902), p. 51, “The First Generation [Bred] from the Hybrids,” opening paragraph",
    ],
  },
  {
    id: "science-mendel-gametes",
    authorId: "mendel",
    topic: "模型",
    text: "因此，实验已经证明这一理论是有根据的：豌豆杂种形成的卵细胞与花粉细胞，就其构成而言，以相等数量代表了受精时结合的性状所产生的一切恒定形式。",
    english:
      "Experimentally, therefore, the theory is justified that the pea hybrids form egg and pollen cells which, in their constitution, represent in equal numbers all constant forms which result from the combination of the characters when united in fertilisation.",
    editorialSummary:
      "把可观察的后代比例解释为生殖细胞中成对因子的分离，能让隐藏过程产生可计算的预测。",
    englishEditorialSummary:
      "Explaining visible offspring ratios through the separation of paired factors into reproductive cells turns a hidden process into computable predictions.",
    work: "《植物杂交试验》",
    englishWork: "Experiments in Plant-Hybridisation",
    reflection:
      "孟德尔没有直接看见后来所谓的基因，而是从杂交结果反推生殖细胞的组成，并用组合关系检验模型。现代遗传学扩展并限制了这个框架：连锁、互作与环境效应意味着并非所有性状都服从简单的独立分配。",
    englishReflection:
      "Mendel did not directly see what would later be called genes; he inferred the composition of reproductive cells from crosses and tested the model combinatorially. Modern genetics both extends and limits this framework: linkage, interaction, and environmental effects mean that not every trait follows simple independent assortment.",
    question: "你提出的不可见机制，能否给出比现象描述更精确的新预测？",
    englishQuestion:
      "Can your proposed hidden mechanism generate predictions more precise than a description of the phenomenon?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "William Bateson 编《孟德尔的遗传原理》1902 年版，第 73 页，“杂种的生殖细胞”，实验结论段",
      "William Bateson ed., Mendel's Principles of Heredity (1902), p. 73, “The Reproductive Cells of Hybrids,” experimental conclusion",
    ],
  },
  {
    id: "science-pasteur-fermentation",
    authorId: "pasteur",
    topic: "证据",
    text:
      "把生命播种进这种矿物溶液后不久，奇异的现象便出现了。原本像蒸馏水一样澄清的液体，在随后的几天里逐渐变得乳浊，同时有气体逸出，以小气泡形式升到烧瓶顶部。……对一滴已经失去原先澄清状态的液体作显微镜检查，就会告诉我们答案。……我们的眼睛因能力有限而称作“乳浊”的东西，在显微镜下显示为这些微小生物的生命及其持续运动的结果。",
    english:
      "Singular phenomena appear soon after this sowing of life in our mineral solution. The liquid, which was as limpid as distilled water, becomes little by little opalescent during the following days, and at the same time gases are set free and rise in the form of small bubbles to the top of the flask. … Microscopical examination of a drop of this liquid which has lost its primitive limpidity will tell us. … What our eyes in their weakness call milkiness the microscope shows us is a consequence of the life of these little beings and of their incessant movements.",
    editorialSummary:
      "发酵产物的形成要与微生物的生长、物质转化和实验条件一起追踪，不能只凭最终气味或沉淀命名过程。",
    englishEditorialSummary:
      "Fermentation products must be tracked alongside microbial growth, material transformation, and experimental conditions—not named from the final odor or sediment alone.",
    work: "《巴斯德论发酵》",
    englishWork: "Pasteur on Fermentation",
    reflection:
      "巴斯德通过接种、显微观察与化学变化，把乳酸发酵同一种可繁殖的微小生物联系起来。1857 年的实验并未一次完成现代微生物学的全部证明，但它把“物质变化”改造成了可操纵的生物过程。",
    englishReflection:
      "Through inoculation, microscopy, and chemical change, Pasteur linked lactic fermentation to a reproducing microscopic organism. The 1857 experiments did not establish all of modern microbiology at once, but they transformed a “material change” into a manipulable biological process.",
    question:
      "你能否同时追踪过程中的行动者、环境和产物，而不是只给终点贴标签？",
    englishQuestion:
      "Can you track the agents, environment, and products of a process together instead of merely labeling its endpoint?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "《大众科学月刊》第7卷（1875年10月），《巴斯德论发酵》，L. A. Stimson 公版英译，711—712页；节录接种后液体变化与显微观察两段，中间删节以省略号标明",
      "Popular Science Monthly, vol. 7 (October 1875), “Pasteur on Fermentation,” public-domain translation by L. A. Stimson, pp. 711–712; excerpts from the inoculation and microscopy passages, with internal omissions marked by ellipses",
    ],
  },
  {
    id: "science-pasteur-airborne-contamination",
    authorId: "pasteur",
    topic: "方法",
    text:
      "那么，这两个容器之间有什么差别？它们装着同样的液体，都含有空气，而且都敞开着！为什么一个腐败，另一个却保持纯净？两者唯一的差别是：在第一个容器里，悬浮在空气中的尘埃及其携带的微生物能落入瓶颈并接触液体，在那里找到合适的养料而生长，于是出现微生物。相反，在第二个容器里，除非空气受到猛烈扰动，否则空气中悬浮的尘埃不可能、或至少极难进入容器；它们落在弯曲的瓶颈上。",
    english:
      "What difference is there, then, between those two vases? They contain the same liquid, they both contain air, both are open! Why does one decay and the other remain pure? The only difference between them is this: in the first case, the dusts suspended in air and their germs can fall into the neck of the flask and arrive into contact with the liquid, where they find appropriate food and develop; thence microscopic beings. In the second flask, on the contrary, it is impossible, or at least extremely difficult, unless air is violently shaken, that dusts suspended in air should enter the vase; they fall on its curved neck.",
    editorialSummary:
      "关键对照不是简单地把空气隔绝，而是让空气进入，同时阻止携带微生物的尘粒抵达培养液。",
    englishEditorialSummary:
      "The decisive control was not simply excluding air, but admitting air while preventing microbe-bearing dust from reaching the broth.",
    work: "《论自然发生》",
    englishWork: "On Spontaneous Generation",
    reflection:
      "曲颈瓶实验把“空气本身”与“空气携带的颗粒”拆成了不同变量，使竞争解释接受差异化检验。它反驳的是所测试条件下培养液会自行产生微生物的主张，不应被扩张为关于生命最初起源的直接实验。",
    englishReflection:
      "The swan-neck flask separated “air itself” from “particles carried by air,” subjecting rival explanations to a discriminating test. It challenged spontaneous microbial generation in the tested broths; it was not a direct experiment on the original emergence of life.",
    question: "你的对照实验是否真正分开了两个解释，还是把多个变量同时关掉了？",
    englishQuestion:
      "Does your control genuinely separate two explanations, or switch off several variables at once?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "1864年4月7日索邦大学“论自然发生”演讲；法文初刊《科学课程评论》1863—1864年第1卷，257—265页；英文据 René Vallery-Radot《巴斯德的一生》Mrs. R. L. Devonshire 公版英译（1920），108—109页所录演讲原文",
      "Sorbonne lecture “On Spontaneous Generation,” 7 April 1864; French first printing in Revue des cours scientifiques, vol. 1 (1863–64), pp. 257–265; English as quoted in René Vallery-Radot, The Life of Pasteur, Mrs. R. L. Devonshire public-domain translation (1920), pp. 108–109",
    ],
  },
  {
    id: "science-pasteur-attenuation",
    authorId: "pasteur",
    topic: "模型",
    text:
      "某些病毒的效力可以改变，而一种效力较弱的病毒能够提供对另一种病毒的保护；这一重要事实如今不仅已为科学所掌握，也已进入应用阶段。显然，沿着这条研究路线，探索适用于新病毒的减毒方法具有重大意义。",
    english:
      "The important fact that certain viruses may be varied in potency, and that protection against one may be afforded by another less potent, is to-day not only gained for science, but has entered the stage of application. It is obvious that great interest attaches, in pursuing this line of study, to the investigation of methods of attenuation adapted to new virus.",
    editorialSummary:
      "减弱病原体后再暴露机体，可以把“免疫”从事后描述转化为一套可比较的实验程序。",
    englishEditorialSummary:
      "Weakening a pathogen before exposing an organism can turn “immunity” from a retrospective label into a comparative experimental procedure.",
    work: "《预防恐水病》",
    englishWork: "The Prevention of Hydrophobia",
    reflection:
      "巴斯德团队用不同处理和接种顺序比较动物反应，推动了实验性疫苗观念。十九世纪的“病毒”泛指致病材料，而且减毒机制随病原体而异；一次成功不能自动成为所有疾病的通法。",
    englishReflection:
      "Pasteur's team compared animal responses across treatments and inoculation sequences, advancing the idea of experimental vaccination. Nineteenth-century “virus” meant infectious material broadly, and attenuation mechanisms differ by pathogen; one success is not automatically a universal recipe.",
    question:
      "当一种干预有效时，你是否也明确了它对哪些对象、剂量与条件才有效？",
    englishQuestion:
      "When an intervention works, have you specified for which agents, doses, and conditions it works?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "《大众科学月刊》第25卷（1884年7月），《预防恐水病》，376页开篇；据《科学评论》译出，原报告由巴斯德、Chamberland 与 Roux 于1884年5月19日提交法国科学院",
      "Popular Science Monthly, vol. 25 (July 1884), “The Prevention of Hydrophobia,” p. 376, opening passage; translated from Revue Scientifique, from the report communicated by Pasteur, Chamberland, and Roux to the French Academy of Sciences on 19 May 1884",
    ],
  },
  {
    id: "science-pasteur-rabies",
    authorId: "pasteur",
    topic: "责任",
    text:
      "我先前以自己和合作者的名义在数篇报告中描述的狂犬病预防法，无疑构成了研究这种疾病的一项真正进展；然而，那时的进展在科学意义上大于实践意义。它的应用并不稳妥。在我当时处理的二十只狗中，我不能断言有超过十五或十六只获得了对狂犬病的抵抗力。……此外，在达到那一进展阶段之前，我们怎敢在人身上进行实验？",
    english:
      "The prevention of rabies, as I have described it, in my own name and the names of my collaborators, in previous notes, certainly constitutes a real progress in the study of that malady, a progress which was, however, more scientific than practical. Its application was precarious. Of twenty dogs that I had then treated, I could not assert that I had made more than fifteen or sixteen proof against rabies. … Besides, how, before reaching that stage of progress, could we venture to make an experiment on man?",
    editorialSummary:
      "当实验方法进入紧急治疗，证据强度、患者风险与无法等待的现实必须被同时陈述。",
    englishEditorialSummary:
      "When an experimental method becomes emergency treatment, evidential strength, patient risk, and the reality that waiting may be impossible must be stated together.",
    work: "《接种预防恐水病》",
    englishWork: "Inoculation Against Hydrophobia",
    reflection:
      "巴斯德在动物接种程序之后报告了约瑟夫·梅斯特的暴露后治疗，并公开了接种序列和当时判断。这个历史节点显示了临床创新的勇气，也提醒现代读者：个案、致死性疾病与紧急情境不能替代知情同意、系统随访和更广泛试验。",
    englishReflection:
      "After animal inoculation work, Pasteur reported Joseph Meister's post-exposure treatment and disclosed the sequence and contemporary judgment behind it. The episode shows the courage of clinical innovation, but also reminds modern readers that a case, a lethal disease, and an emergency do not replace informed consent, systematic follow-up, or broader trials.",
    question:
      "在不能等到证据完美时，你会用什么程序让行动仍然可审查、可追踪、可修正？",
    englishQuestion:
      "When perfect evidence cannot be awaited, what procedures keep action reviewable, traceable, and revisable?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "《大众科学月刊》第28卷（1886年1月），《接种预防恐水病》，289页开篇；英译自巴斯德1885年10月26日在法国科学院宣读的报告，卡片跨段删节以省略号标明",
      "Popular Science Monthly, vol. 28 (January 1886), “Inoculation Against Hydrophobia,” p. 289, opening passage; translated from Pasteur's paper read to the French Academy of Sciences on 26 October 1885, with the internal omission marked by an ellipsis",
    ],
  },
  {
    id: "science-bernard-induced-observation",
    authorId: "claude_bernard",
    topic: "方法",
    text: "因此我们可以说，实验从根本上只是一种为了某个目的而被引发的观察。在实验方法中，对事实的搜寻，也就是研究，总伴随着推理；所以实验者通常进行实验，是为了控制或检验某个实验观念的价值。",
    english:
      "Hence we may say that an experiment is fundamentally just an observation induced with some object or other. In the experimental method, search for facts, i.e., investigation, is always accompanied by reasoning, so that experimenters usually make an experiment to control or verify the value of an experimental idea.",
    editorialSummary:
      "实验是一种被主动引发的观察：研究者改变条件，再比较现象如何随之改变。",
    englishEditorialSummary:
      "An experiment is an actively induced observation: the investigator changes conditions and compares how the phenomenon changes with them.",
    work: "《实验医学研究导论》",
    englishWork: "An Introduction to the Study of Experimental Medicine",
    reflection:
      "贝尔纳并未把观察与实验割裂，而是以是否主动改变现象发生条件来区分二者。干预能增强因果判断，但只有当改变、对照和测量都被清楚记录时，它才比被动观看提供更多知识。",
    englishReflection:
      "Bernard did not sever observation from experiment; he distinguished them by whether the investigator actively changes the conditions under which a phenomenon occurs. Intervention strengthens causal judgment only when the change, comparison, and measurement are clearly recorded.",
    question: "为了从相关走向因果，你能安全而清晰地改变哪个条件？",
    englishQuestion:
      "Which condition can you change safely and clearly to move from correlation toward causation?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "Henry Copley Greene 1927 年公版英译，第一部分第1章第V节“实验从根本上只是一种被引发的观察”，第19—20页，连续段落",
      "Henry Copley Greene public-domain translation (1927), Part I, Chapter I, §V, “Experiment Is Fundamentally Only Induced Observation,” pp. 19–20, continuous passage",
    ],
  },
  {
    id: "science-bernard-hypothesis",
    authorId: "claude_bernard",
    topic: "模型",
    text: "因此，一个实验观念也是一个先验观念，但它以假说的形式呈现；由它推出的后果必须提交给实验的判据，借此检验它的价值。",
    english:
      "An experimental idea, then, is also an a priori idea, but it is an idea that presents itself in the form of an hypothesis the consequences of which must be submitted to the criterion of experiment, so that its value may be tested.",
    editorialSummary:
      "假说可以由直觉发起，但它的价值只在于引出能够让事实反驳它的实验。",
    englishEditorialSummary:
      "A hypothesis may begin in intuition, but its value lies in generating experiments through which facts can contradict it.",
    work: "《实验医学研究导论》",
    englishWork: "An Introduction to the Study of Experimental Medicine",
    reflection:
      "贝尔纳允许想象力提出问题，却要求实验者在进入观察时放下对自己观念的偏爱。假说不是等待证实的答案，而是组织一次有失败可能的询问。",
    englishReflection:
      "Bernard allowed imagination to pose questions, while requiring investigators to set aside affection for their ideas when observing results. A hypothesis is not an answer awaiting confirmation, but a way to organize an inquiry that can fail.",
    question: "什么结果会迫使你真正放弃而不只是修辞性调整当前假说？",
    englishQuestion:
      "What result would genuinely force you to abandon—not merely rhetorically adjust—your current hypothesis?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "Henry Copley Greene 1927 年公版英译，第一部分第2章导言，第28页，以“An experimental idea, then”开头的连续句",
      "Henry Copley Greene public-domain translation (1927), Part I, Chapter II, introductory section, p. 28, continuous sentence beginning “An experimental idea, then”",
    ],
  },
  {
    id: "science-bernard-counterproof",
    authorId: "claude_bernard",
    topic: "证据",
    text: "反证决定着我们是否找到了现象中所寻求的因果关系。为此，它移除已被认定的原因，看结果是否仍会持续。",
    english:
      "Counterproof decides whether the relation of cause to effect, which we seek in phenomena, has been found. To do this, it removes the accepted cause, to see if the effect persists.",
    editorialSummary:
      "一次符合预期的结果还不够；反向操作或撤销条件的“反证实验”才能检查因果链是否真的成立。",
    englishEditorialSummary:
      "One expected result is not enough; reversing an intervention or restoring a condition—the counterproof—tests whether the causal chain truly holds.",
    work: "《实验医学研究导论》",
    englishWork: "An Introduction to the Study of Experimental Medicine",
    reflection:
      "贝尔纳强调 proof 与 counterproof 的配对：制造现象之后，还要设法取消或反转它。现实研究未必总能完全可逆，但这个要求迫使我们寻找比单方向相关更强的鉴别证据。",
    englishReflection:
      "Bernard paired proof with counterproof: after producing a phenomenon, one should try to remove or reverse it. Real systems are not always fully reversible, but the demand pushes us toward evidence that discriminates more strongly than one-way correlation.",
    question: "你能怎样撤销、反转或恢复一个条件，来验证自己声称的原因？",
    englishQuestion:
      "How could you remove, reverse, or restore a condition to test the cause you claim?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "Henry Copley Greene 1927 年公版英译，第一部分第2章第VIII节“证明与反证”，第55—56页，跨页连续句",
      "Henry Copley Greene public-domain translation (1927), Part I, Chapter II, §VIII, “Proof and Counterproof,” pp. 55–56, continuous sentences across the page break",
    ],
  },
  {
    id: "science-bernard-milieu-interieur",
    authorId: "claude_bernard",
    topic: "生命",
    text: "在生命体中，内部环境是机体真正的产物；它维持着同外部宇宙环境进行交换和平衡的必要关系。但机体越完善，有机环境就越趋专门化，并且仿佛越来越同周围环境相隔离。",
    english:
      "In living beings the internal environment, which is a true product of the organism, preserves the necessary relations of exchange and equilibrium with the external cosmic environment; but in proportion as the organism grows more perfect, the organic environment becomes specialized and more and more isolated, as it were, from the surrounding environment.",
    editorialSummary:
      "复杂生命依靠相对稳定的内部环境获得行动自由，而不是摆脱外部环境的影响。",
    englishEditorialSummary:
      "Complex life gains freedom of action through a relatively stable internal environment, not by escaping external influence.",
    work: "《实验医学研究导论》",
    englishWork: "An Introduction to the Study of Experimental Medicine",
    reflection:
      "贝尔纳把血液等内部液体视为器官共同生活的直接环境，为后来的稳态概念奠定了道路。这里的稳定是动态调节而非静止不变；调节失效、范围越界或环境压力过大都会打破它。",
    englishReflection:
      "Bernard treated internal fluids such as blood as the immediate environment shared by organs, preparing the way for the later concept of homeostasis. Stability here is dynamic regulation, not immobility; regulatory failure, exceeded ranges, or severe external pressure can disrupt it.",
    question: "你所依赖的自由，背后有哪些不断工作却几乎不可见的稳定机制？",
    englishQuestion:
      "What continuously working but nearly invisible stabilizing mechanisms support the freedom you rely on?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "Henry Copley Greene 1927 年公版英译，第二部分第1章第III节“高等动物的生理现象发生于具有恒定理化性质的完善内部有机环境中”，第64页，连续段落",
      "Henry Copley Greene public-domain translation (1927), Part II, Chapter I, §III, “Physiological Phenomena in the Higher Animals Take Place in Perfected Internal Organic Environments Endowed with Constant Physico-Chemical Properties,” p. 64, continuous passage",
    ],
  },
  {
    id: "science-curie-quantification",
    authorId: "marie_curie",
    topic: "方法",
    text: "穿过电容器的电流绝对值，是用静电计和压电石英测量的。",
    english:
      "The absolute value of the current which traversed the condenser was measured by means of an electrometer and a piezoelectric quartz.",
    editorialSummary:
      "当一种不可见现象可以稳定地转化为测量值，它就能成为比较物质、筛选异常和指导分离的工具。",
    englishEditorialSummary:
      "When an invisible phenomenon can be converted reliably into measurements, it becomes a tool for comparing matter, screening anomalies, and guiding separation.",
    work: "《铀和钍化合物所发射的射线》",
    englishWork: "Rays Emitted by Compounds of Uranium and of Thorium",
    reflection:
      "居里用空气导电效应比较不同化合物，使放射性从感光痕迹变成可系统测量的物质属性。测量并非天然客观：仪器响应、样品纯度与校准都决定了数字能够支持多强的推断。",
    englishReflection:
      "Curie compared compounds through their effect on the conductivity of air, turning radioactivity from a photographic trace into a systematically measurable property of matter. Measurement is not automatically objective: instrument response, sample purity, and calibration determine how strong an inference the number can support.",
    question: "你能把一个模糊的“似乎更强”转化为什么可重复的测量关系？",
    englishQuestion:
      "What repeatable measurement could replace a vague impression that something is “apparently stronger”?",
    presentationNature: "source-excerpt",
    context:
      "这是1898年4月论文第一页的方法句。居里先说明她用平行板电容器研究铀射线影响下空气的导电性，并在两极板间建立100伏电势差；本句接着交代如何把极微弱电流化为绝对测量。随后她说自己考察了大量金属、盐、氧化物和矿物，并以电流数值列表比较各样品。",
    englishContext:
      "This methodological sentence appears on the first page of the April 1898 paper. Curie first says that she used a parallel-plate condenser to study the conductivity of air under uranium rays and established a 100-volt potential difference between the plates; the excerpt then states how the very weak current was measured absolutely. She next reports examining many metals, salts, oxides, and minerals and compares the samples in a table of current values.",
    distinction:
      "短引只说明一次测量的装置与量值，并不独自包含“比较物质、筛选异常和指导分离”的完整方法链。比较与异常筛选来自紧随其后的样品表及印刷页1102的矿物讨论；以活性指导化学分离则属于同年7月皮埃尔与玛丽·居里的合著论文。旧命题因此保留为跨段落的编辑性摘要，而不再冒充这一句的逐字内容。",
    englishDistinction:
      "The excerpt states only the apparatus and quantity for one measurement; by itself it does not contain the complete sequence of comparing substances, screening anomalies, and guiding separation. Comparison and anomaly screening come from the following sample table and the mineral discussion on print p. 1102, while activity-guided chemical separation belongs to Pierre and Marie Curie's jointly authored July paper. The old proposition is therefore preserved as a cross-passage editorial summary rather than presented as wording from this sentence.",
    sourceLocator: [
      "Carmen Giunta署名英译，Le Moyne College“Classic Chemistry”电子文本；对应Mme Sklodowska Curie《铀和钍化合物所发射的射线》，《科学院院报》126卷（1898）印刷页1101（法国科学院论文PDF第2页）；单个完整连续21词句，经法文原刊渲染目检；中文为项目研读译文；按quotation exception作署名、精确定位、最小必要短引",
      "Named translation by Carmen Giunta in Le Moyne College's Classic Chemistry collection; corresponding to Mme Sklodowska Curie, ‘Rayons émis par les composés de l'uranium et du thorium,’ Comptes rendus 126 (1898), print p. 1101 (Académie des sciences paper PDF p. 2); one complete continuous 21-word sentence, visually checked against the rendered French original; Chinese is a project study translation; used under the quotation exception as an attributed, precisely located, minimally necessary excerpt",
    ],
  },
  {
    id: "science-curie-pitchblende",
    authorId: "marie_curie",
    topic: "证据",
    text: "当矿物的活性持续高于其已知成分，异常本身就能成为寻找未知成分的证据。",
    english:
      "When a mineral remains more active than its known constituents, the anomaly itself can become evidence for an unknown component.",
    work: "《论沥青铀矿中所含的一种新的放射性物质》",
    englishWork: "On a New Radioactive Substance Contained in Pitchblende",
    reflection:
      "玛丽与皮埃尔·居里把沥青铀矿的超额活性解释为少量强放射性物质，并让化学分离过程追随活性变化。异常只有在基线可靠时才有意义；已知成分、测量误差和替代解释必须先被逐步排除。",
    englishReflection:
      "Marie and Pierre Curie interpreted pitchblende's excess activity as a small amount of a highly radioactive substance and used changes in activity to guide chemical separation. An anomaly is meaningful only against a reliable baseline; known constituents, measurement error, and alternative explanations must be progressively excluded.",
    question:
      "你遇到的异常，是噪声、基线错误，还是一个能够引导下一步实验的新线索？",
    englishQuestion:
      "Is the anomaly you see noise, a faulty baseline, or a clue capable of directing the next experiment?",
    presentationNature: "editorial-synthesis",
    context:
      "皮埃尔与玛丽·居里在1898年7月的合著论文中先回顾：含铀、钍的若干矿物比铀和钍本身更活跃，而既有实验表明化合物的活性通常随其中活性金属比例降低。印刷页176据此说，较强矿物很可能含有一种比这两种金属更活跃的物质；下一句说分离实验已证实此前预期，随后说明每一步化学操作都以分离产物的辐射活性检查来引导。",
    englishContext:
      "In their jointly authored July 1898 paper, Pierre and Marie Curie first recall that several uranium- and thorium-bearing minerals were more active than uranium and thorium themselves, while prior experiments showed that a compound's activity generally weakened with the proportion of active metal it contained. On print p. 176 they infer that the stronger minerals very probably contain a substance more active than those metals. The next sentence says that separation experiments confirmed the preceding prediction, followed by an account of checking radiant activity after every chemical operation.",
    distinction:
      "当前中英文主字段是项目对这一证据链的概括，不是原刊或Boorse—Motz英译中的连续句；原文语气是“很可能”，新元素判断后来还依赖逐步分离、活性增强以及对光谱反证的讨论。论文由P. Curie与Mme S. Curie共同署名，而当前卡片作者模型只显示玛丽·居里，且双语卡没有独立法文原文字段；在共同署名和多语原文展示得到建模前，本卡继续标为命题整理。",
    englishDistinction:
      "The current Chinese and English display fields are a project synthesis of this evidential sequence, not a continuous sentence from either the French original or the Boorse-Motz translation. The source says ‘very probable,’ and the later case for a new element also depends on progressive separation, increasing activity, and discussion of initially unfavorable spectral evidence. The paper is jointly authored by P. Curie and Mme S. Curie, while the current card model displays Marie Curie alone and has no separate French-source field. The card therefore remains an editorial synthesis until coauthorship and multilingual source display are modeled.",
    sourceLocator: [
      "P. Curie与Mme S. Curie合著，《论沥青铀矿中所含的一种新的放射性物质》，《科学院院报》127卷（1898年7月18日）印刷页175—178；最接近当前命题的完整法文句见印刷页176（法国科学院论文PDF第3页），已渲染目检；参考Henry A. Boorse与Lloyd Motz编《The World of the Atom》第1卷（Basic Books，1966）所载英译，对应完整连续28词句；因共同署名与法文原文字段模型边界，本卡保留为命题整理",
      "Jointly authored by P. Curie and Mme S. Curie, ‘Sur une substance nouvelle radio-active, contenue dans la pechblende,’ Comptes rendus 127 (18 July 1898), print pp. 175–178; the complete French sentence closest to the present proposition is on print p. 176 (Académie des sciences paper PDF p. 3), visually checked; English reference translation as reprinted in Henry A. Boorse and Lloyd Motz, eds., The World of the Atom, vol. 1 (Basic Books, 1966), corresponding to one complete continuous 28-word sentence; the card remains an editorial synthesis because of the coauthorship and French-source-field model boundary",
    ],
  },
  {
    id: "science-curie-radioactive-atom",
    authorId: "marie_curie",
    topic: "模型",
    text: "最后，如果假定放射性能量是取自原子转变的一种现象，就可以由此推断，每一种放射性物质都经历这种转变，即使它在我们看来并无变化。",
    english:
      "Finally, if it is supposed that radioactive energy is a phenomenon which is borrowed from atomic transformation, it can be deduced from this that every radioactive substance undergoes such a transformation, even though it appears to us to be invariable.",
    editorialSummary: "放射性显示原子并非绝对不变的终点；旧模型中的稳定基本单位也可能具有内部历史。",
    englishEditorialSummary:
      "Radioactivity showed that the atom was not an absolutely immutable endpoint; even a model's stable basic unit can have an internal history.",
    work: "诺贝尔演讲《镭与化学中的新概念》",
    englishWork: "Nobel Lecture: Radium and the New Concepts in Chemistry",
    presentationNature: "source-excerpt",
    reflection:
      "居里回顾放射性元素与衰变系列如何迫使化学重新思考元素和原子的稳定性。新证据没有让旧化学整体失效，而是说明成功模型也有适用尺度，并可能被更深层机制重新解释。",
    englishReflection:
      "Curie reviewed how radioactive elements and decay series forced chemistry to reconsider the stability of elements and atoms. The new evidence did not make earlier chemistry useless; it showed that successful models have domains of validity and can be reinterpreted by deeper mechanisms.",
    question:
      "你现在视为不可再分的基本单位，会不会只是当前测量尺度下的稳定近似？",
    englishQuestion:
      "Could what you treat as an indivisible basic unit be only a stable approximation at your present scale of measurement?",
    sourceLocator: [
      "1911年诺贝尔化学奖演讲，关于原子放射性转变的连续句；NobelPrize.org 英文全文注明诺贝尔基金会版权已到期",
      "1911 Nobel Chemistry Lecture, continuous sentence on atomic radioactive transformation; NobelPrize.org states that the Nobel Foundation copyright has expired",
    ],
  },
  {
    id: "science-humboldt-connections",
    authorId: "humboldt",
    topic: "模型",
    text: "然而，这门宇宙科学不应被看作：把各专门知识部门收集起来的重要而普遍的结果作纯粹百科式的聚合。这些结果不过是一座宏伟建筑的材料；把它们组合起来，并不能构成世界的物理史，后者的崇高职责是展示遍布宇宙的诸种力量如何同时作用以及彼此联结。",
    english:
      "This science of the Cosmos is not, however, to be regarded as a mere encyclopedic aggregation of the most important and general results that have been collected together from special branches of knowledge. These results are nothing more than the materials for a vast edifice, and their combination can not constitute the physical history of the world, whose exalted part it is to show the simultaneous action and the connecting links of the forces which pervade the universe.",
    editorialSummary:
      "自然的统一不来自把事实堆成百科全书，而来自展示现象之间同时作用的联系。",
    englishEditorialSummary:
      "The unity of nature comes not from piling facts into an encyclopedia, but from showing the connections through which phenomena act together.",
    work: "《宇宙》第一卷",
    englishWork: "Cosmos, Volume I",
    reflection:
      "洪堡追求的是一种能够连接天文、地质、气候与生命分布的“自然图景”，而非取消各门学科的细节。整体视角若没有测量和局部机制支撑，很容易退化为漂亮但不可检验的类比。",
    englishReflection:
      "Humboldt sought a picture of nature connecting astronomy, geology, climate, and the distribution of life, not the erasure of disciplinary detail. Without measurement and local mechanisms, a holistic view can collapse into an attractive but untestable analogy.",
    question:
      "你的整体图景是否指出了可追踪的连接，还是只把许多名词放在了一起？",
    englishQuestion:
      "Does your big picture identify traceable connections, or merely place many terms beside one another?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "E. C. Otté 公版英译，Harper & Brothers 1858 年版，《宇宙》第一卷导论，第55页，以“This science of the Cosmos”开头的连续段落",
      "E. C. Otté public-domain translation, Harper & Brothers edition (1858), Cosmos, Vol. I, Introduction, p. 55, continuous passage beginning “This science of the Cosmos”",
    ],
  },
  {
    id: "science-humboldt-plant-geography",
    authorId: "humboldt",
    topic: "证据",
    text: "描述植物学不再局限于确定属和种的狭小范围，而是引导那些穿越遥远土地和高山的观察者，依据离赤道的距离与海拔高度，研究植物在地球表面的地理分布。我们还必须研究支配温度与气候差异的规律以及大气的气象过程，才有希望解释植物分布所涉及的原因；正是这样，认真沿着求知之路前行的观察者，凭借现象之间存在的相互依赖与联系，从一类现象被引向另一类现象。",
    english:
      "Descriptive botany, no longer confined to the narrow circle of the determination of genera and species, leads the observer who traverses distant lands and lofty mountains to the study of the geographical distribution of plants of the earth's surface, according to distance from the equator and vertical elevation above the sea. It is further necessary to investigate the laws which regulate the differences of temperature and climate, and the meteorological processes of the atmosphere, before we can hope to explain the involved causes of vegetable distribution; and it is thus that the observer who earnestly pursues the path of knowledge is led from one class of phenomena to another, by means of the mutual dependence and connection existing between them.",
    editorialSummary:
      "把植物分布与海拔、纬度、温度和气压并置，局部采集就能转化为可比较的地理模式。",
    englishEditorialSummary:
      "Placing plant distributions beside elevation, latitude, temperature, and pressure turns local collections into comparable geographic patterns.",
    work: "《宇宙》第一卷",
    englishWork: "Cosmos, Volume I",
    reflection:
      "洪堡与邦普兰把现场测量和植物记录组织在同一幅山体剖面中，开创了以多变量比较理解生物分布的方式。图表具有强大的综合力，却也会压平季节变化、采样缺口与分类修订，因此可视化本身仍需回到原始记录。",
    englishReflection:
      "Humboldt and Bonpland organized field measurements and plant records on one mountain profile, pioneering a multivariable comparison of biological distribution. The tableau powerfully synthesizes, but can flatten seasonal change, sampling gaps, and taxonomic revision; the visualization must still be checked against the records behind it.",
    question: "如果把你的观察放到共同坐标上，哪一种隐藏的梯度或边界会显现？",
    englishQuestion:
      "What hidden gradient or boundary would appear if you placed your observations on shared coordinates?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "E. C. Otté 公版英译，Harper & Brothers 1858 年版，《宇宙》第一卷“作者序言”，第8页，描述植物地理学及其与温度、气候和气象过程联系的连续段落",
      "E. C. Otté public-domain translation, Harper & Brothers edition (1858), Cosmos, Vol. I, Author's Preface, p. 8, continuous passage on plant geography and its connections with temperature, climate, and atmospheric processes",
    ],
  },
  {
    id: "science-franklin-hydration",
    authorId: "rosalind_franklin",
    topic: "方法",
    text:
      "然而必须强调，所得图样的类型不仅取决于相对湿度，也取决于样品先前的经历。",
    english:
      "It must be emphasized, however, that the type of diagram obtained depends not only on the relative humidity but also on the past history of the specimen.",
    editorialSummary:
      "同一分子在不同含水量下会呈现不同有序结构；样品状态不是实验背景，而是结果的一部分。",
    englishEditorialSummary:
      "The same molecule can adopt different ordered structures at different water contents; sample state is not background to the experiment, but part of the result.",
    work: "《胸腺核酸钠纤维的结构（一）：含水量的影响》",
    englishWork:
      "The Structure of Sodium Thymonucleate Fibres I: The Influence of Water Content",
    presentationNature: "source-excerpt",
    reflection:
      "富兰克林与戈斯林系统改变湿度，区分出 DNA 纤维的 A、B 两种形态并测量其转变。经典图像不是脱离制样条件的永恒肖像；若忽略湿度、取向和样品历史，结构解释就可能混淆不同状态。",
    englishReflection:
      "Franklin and Gosling systematically varied humidity, distinguished the A and B forms of DNA fibers, and measured their transition. A celebrated image is not a timeless portrait independent of preparation; ignoring humidity, orientation, and sample history can mix distinct states in one structural interpretation.",
    context:
      "在第674页“结果”部分，富兰克林与戈斯林先把75%相对湿度所得图样称为结构A，把92%相对湿度所得新图样称为结构B。引句随即警告不能只凭当下湿度解释图样；下一句报告吸水量与细纤维结构变化都存在明显滞后，并指出经长期干燥的样品即使在92%相对湿度下也常可呈现A型。",
    englishContext:
      "In the Results section on p. 674, Franklin and Gosling first call the diagram obtained at 75% relative humidity structure A and the new diagram obtained at 92% structure B. The quoted sentence immediately warns that the diagram cannot be explained by current humidity alone. The next sentence reports strong hysteresis in both bulk water uptake and the structural change of fine fibers, adding that a specimen previously subjected to prolonged drying may frequently show type A even at 92% relative humidity.",
    distinction:
      "引句说的是取向胸腺核酸钠纤维所得X射线图样，不是断言每个DNA分子在任何环境中都只有两个固定形态；它还明确否定“湿度单独决定图样”的读法。摘要关于同一分子、不同有序结构和样品状态的表述，是依据全文A/B型转换作出的研读概括，不是引句逐字内容。",
    englishDistinction:
      "The sentence concerns X-ray diagrams from oriented sodium thymonucleate fibers; it does not claim that every DNA molecule in every environment has only two fixed forms. It also explicitly rules out reading humidity as the sole determinant of the diagram. The summary's language about one molecule, different ordered structures, and sample state is a study synthesis of the paper's A/B transitions, not wording in the excerpt.",
    question: "你认为是噪声的差异，会不会其实来自一个未被记录的样品状态？",
    englishQuestion:
      "Could a difference you dismiss as noise actually come from an unrecorded state of the sample?",
    sourceLocator: [
      "《晶体学报》6卷（1953），第674页“结果”右栏，图1与图2湿度说明之后的单个完整连续句，全文引用；存档PDF第2页；按quotation exception以署名、精确定位、最小必要的27词短引作研读评论",
      "Acta Crystallographica 6 (1953), p. 674, Results, right column, one complete continuous sentence after the humidity descriptions for Figs. 1 and 2, quoted in full; archived PDF p. 2; used under the quotation exception as an attributed, precisely located, minimally necessary 27-word excerpt for study and commentary",
    ],
  },
  {
    id: "science-franklin-diffraction",
    authorId: "rosalind_franklin",
    topic: "证据",
    text:
      "目前，X射线证据不能被当作螺旋结构的直接证明；不过下文讨论的其他考虑，使螺旋结构的存在极为可能。",
    english:
      "While the X-ray evidence cannot, at present, be taken as direct proof that the structure is helical, other considerations discussed below make the existence of a helical structure highly probable.",
    editorialSummary:
      "衍射图不是分子的直接照片，而是一组必须与对称性、密度和化学条件共同解释的结构约束。",
    englishEditorialSummary:
      "A diffraction pattern is not a direct photograph of a molecule, but a set of structural constraints interpreted with symmetry, density, and chemistry.",
    work: "《胸腺核酸钠的分子构型》",
    englishWork: "Molecular Configuration in Sodium Thymonucleate",
    presentationNature: "source-excerpt",
    reflection:
      "富兰克林与戈斯林从纤维衍射的层线、间距和含水状态推断螺旋结构及磷酸基位置。数据能排除许多模型，却通常不能独自指定唯一模型；结构结论来自图样、计算、化学知识与替代方案的合取。",
    englishReflection:
      "Franklin and Gosling used layer lines, spacings, and hydration state in fiber diffraction to infer a helical structure and the position of phosphate groups. Data can exclude many models without uniquely specifying one; structural conclusions join patterns, calculations, chemistry, and comparison with alternatives.",
    context:
      "论文第740页先区分胸腺核酸钠纤维的A、B两类X射线图样，并说B型图样显著呈现螺旋结构的特征。引句随后为证据强度划界；下文再用层线极大值、纤维轴周期和贝塞尔函数关系估计螺旋参数，第741页结合反射、密度与化学论证磷酸基位于结构单元外侧。",
    englishContext:
      "On p. 740 the paper first distinguishes the A and B types of X-ray diagram from sodium thymonucleate fibers and says that the B diagram strikingly shows features characteristic of helical structures. The quoted sentence then calibrates the strength of that evidence. The authors proceed through layer-line maxima, the fiber-axis period, and Bessel-function relations to estimate helical parameters; on p. 741 they combine reflections, density, and chemistry to argue that the phosphate groups lie on the outside of the structural unit.",
    distinction:
      "引句拒绝把X射线证据单独当作螺旋结构的直接证明，但并未说衍射可以被任意解释；它随即判断结合其他考虑后螺旋结构“极为可能”。摘要中的“不是直接照片”以及对称性、密度与化学条件，是对全文证据链的研读说明，不是引句逐字措辞，也不等于单幅图样毫无约束力。",
    englishDistinction:
      "The sentence refuses to treat the X-ray evidence alone as direct proof of a helix, but it does not make diffraction arbitrary: it immediately judges a helical structure highly probable when the other considerations are included. The summary's ‘not a direct photograph’ and its list of symmetry, density, and chemistry explain the paper's evidential chain; they are not wording in the excerpt and do not make a single pattern constraint-free.",
    question: "你看到的是对象本身，还是仪器与模型共同编码后的约束？",
    englishQuestion:
      "Are you seeing the object itself, or constraints jointly encoded by instrument and model?",
    sourceLocator: [
      "《自然》171卷4356期（1953年4月25日），第740页左栏下部；B型图样螺旋特征说明之后的单个完整连续句，全文引用；原刊PDF第1页；按quotation exception以署名、精确定位、最小必要的30词短引作研读评论",
      "Nature 171(4356) (25 April 1953), p. 740, lower left column; one complete continuous sentence after the description of the B diagram's helical features, quoted in full; original-article PDF p. 1; used under the quotation exception as an attributed, precisely located, minimally necessary 30-word excerpt for study and commentary",
    ],
  },
  {
    id: "science-carson-food-web",
    authorId: "rachel_carson",
    topic: "生命",
    text: "DDT及相关化学品最险恶的特征之一，是它们会通过食物链的所有环节，从一种生物传递到另一种生物。",
    english:
      "One of the most sinister features of DDT and related chemicals is the way they are passed on from one organism to another through all the links of the food chains.",
    editorialSummary:
      "一种化学干预不会只抵达它被瞄准的物种；它会沿水、土壤与食物网跨越时间和营养级。",
    englishEditorialSummary:
      "A chemical intervention does not reach only its target species; it travels through water, soil, and food webs across time and trophic levels.",
    work: "《寂静的春天》",
    englishWork: "Silent Spring",
    presentationNature: "source-excerpt",
    reflection:
      "卡森把分散的田野观察、残留检测与野生动物研究连成生态后果链，迫使风险评估越过单次施药的边界。她的论证不是说每种化学品在任何剂量下同样危险，而是要求研究持久性、累积、非目标效应及组合暴露。",
    englishReflection:
      "Carson connected field observations, residue measurements, and wildlife studies into chains of ecological consequence, pushing risk assessment beyond a single application. Her argument was not that every chemical is equally dangerous at every dose, but that persistence, accumulation, non-target effects, and combined exposure must be investigated.",
    context:
      "第三章先讨论DDT在人体与动物组织中的储存和累积，并列出不同暴露人群检测到的浓度。本句随后把焦点从单个身体转向食物链；紧接着的例子追踪喷过DDT的苜蓿怎样进入鸡蛋，或经奶牛进入牛奶与黄油，使起初很小的量在转移过程中形成较高浓度。",
    englishContext:
      "Chapter 3 first discusses storage and accumulation of DDT in human and animal tissues, listing measured concentrations for groups with different exposures. This sentence then shifts from an individual body to the food chain. The examples immediately following trace dusted alfalfa into hens and eggs, or through cows into milk and butter, showing how an initially small amount can become a high concentration through transfer.",
    distinction:
      "本句明确谈的是DDT及相关化学品沿食物链传递，不足以单独证明每一种化学品、每一种剂量或每一条环境路径都会产生相同后果。旧命题中的水、土壤、时间跨度和营养级是结合全书其他章节形成的编辑性综合，现保存在摘要字段，而不是归作本句原文。",
    englishDistinction:
      "The sentence specifically concerns DDT and related chemicals moving through food chains; by itself it does not establish the same consequence for every chemical, dose, or environmental pathway. The old proposition's water, soil, time span, and trophic levels synthesize arguments from other chapters of the book. They are now preserved in the editorial summary rather than attributed to this sentence's wording.",
    question: "你评估一项干预时，追踪到了目标之外的第几层关系和多长时间？",
    englishQuestion:
      "When evaluating an intervention, how many relationships beyond the target—and how much time—have you followed?",
    sourceLocator: [
      "Houghton Mifflin《寂静的春天》40周年纪念版（2002），第三章“死亡的灵药”，印刷页22；同一完整连续31词句，全文引用；以存档Crest全文PDF第21页目检措辞，并以纪念版页码复核定位；按quotation exception以署名、精确定位、最小必要短引作研读评论",
      "Houghton Mifflin fortieth-anniversary edition of Silent Spring (2002), Chapter 3, ‘Elixirs of Death,’ print p. 22; one complete continuous 31-word sentence, quoted in full; wording visually checked on archived Crest full-text PDF p. 21 and the print locator cross-checked against the anniversary edition; used under the quotation exception as an attributed, precisely located, minimally necessary excerpt for study and commentary",
    ],
  },
  {
    id: "science-carson-other-road",
    authorId: "rachel_carson",
    topic: "责任",
    text: "选择终究在我们手中。",
    english:
      "The choice, after all, is ours to make.",
    editorialSummary:
      "技术选择不应只比较短期效率，还要公开其不可逆代价、替代方案与由谁承担风险。",
    englishEditorialSummary:
      "Technological choices should compare not only short-term efficiency, but irreversible costs, alternatives, and who bears the risk.",
    work: "《寂静的春天》",
    englishWork: "Silent Spring",
    presentationNature: "source-excerpt",
    reflection:
      "卡森在结尾讨论生物防治等替代路径，反对的是无差别、缺少监督的化学战争，而非抽象地拒绝一切科学技术。责任因此不只是事后补救，也包括在采用方案前保留选择、公开不确定性并让受影响者参与判断。",
    englishReflection:
      "Carson's final chapter discussed alternatives such as biological control; her target was indiscriminate, poorly governed chemical warfare, not science and technology in the abstract. Responsibility therefore includes preserving options, disclosing uncertainty, and involving those exposed before a course is adopted—not merely repairing harm afterward.",
    context:
      "第十七章以两条道路的比喻开篇：长期行走的平坦高速路看似容易却通向灾难，较少有人走的岔路则提供保存地球的机会。本句把道路比喻转为行动者的选择；下文随即诉诸“知情权”，反对接受必须让世界充满有毒化学品的劝告，并列举化学控虫之外的多种生物学替代方案。",
    englishContext:
      "Chapter 17 opens with two roads: the long-traveled smooth highway appears easy but ends in disaster, while the less-traveled fork offers a chance to preserve the earth. This sentence turns the road metaphor into an agent's choice. The next lines invoke a ‘right to know,’ reject the counsel that the world must be filled with poisonous chemicals, and introduce a wide variety of biological alternatives to chemical insect control.",
    distinction:
      "“选择在我们手中”不是说每个个人都能独自控制农业、产业与监管结构，也没有在八个词里列完决策标准。旧命题中的短期效率、不可逆代价、替代方案与风险承担者，是依据本章及全书论证形成的研读综合，现明确保存在编辑性摘要中。",
    englishDistinction:
      "‘The choice … is ours’ does not say that any one individual can control agricultural, industrial, and regulatory structures alone, nor does its eight words enumerate every decision criterion. The old proposition's short-term efficiency, irreversible costs, alternatives, and risk-bearers are a study synthesis of this chapter and the book's wider argument, now explicitly preserved as an editorial summary.",
    question:
      "如果把长期代价和承担风险的人写进决策表，所谓“最高效”的方案还会胜出吗？",
    englishQuestion:
      "If long-term costs and the people bearing risk entered the decision table, would the supposedly “most efficient” option still win?",
    sourceLocator: [
      "Houghton Mifflin《寂静的春天》40周年纪念版（2002），第十七章“另一条路”，印刷页277；同一完整连续8词句，全文引用；以存档Crest全文PDF第144页目检措辞，并以纪念版页码复核定位；按quotation exception以署名、精确定位、最小必要短引作研读评论",
      "Houghton Mifflin fortieth-anniversary edition of Silent Spring (2002), Chapter 17, ‘The Other Road,’ print p. 277; one complete continuous 8-word sentence, quoted in full; wording visually checked on archived Crest full-text PDF p. 144 and the print locator cross-checked against the anniversary edition; used under the quotation exception as an attributed, precisely located, minimally necessary excerpt for study and commentary",
    ],
  },
] satisfies readonly ScienceThoughtSeed[];
