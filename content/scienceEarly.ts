import type {
  ScienceAuthorProfile,
  ScienceThoughtSeed,
} from "./scienceCorpusTypes";

export const scienceEarlyProfiles = {
  "francis-bacon": {
    name: "弗朗西斯·培根",
    englishName: "Francis Bacon",
    life: "1561—1626",
    englishLife: "1561-1626",
    school: "近代经验论与自然哲学",
    englishSchool: "Early Modern Empiricism and Natural Philosophy",
    palette: ["#e9e2d4", "#c7b99f", "#8a795f", "#302a24"],
  },
  "galileo-galilei": {
    name: "伽利略·伽利莱",
    englishName: "Galileo Galilei",
    life: "1564—1642",
    englishLife: "1564-1642",
    school: "数学化自然哲学",
    englishSchool: "Mathematical Natural Philosophy",
    palette: ["#e4e8e4", "#b1beb9", "#71837e", "#25302e"],
  },
  "johannes-kepler": {
    name: "约翰内斯·开普勒",
    englishName: "Johannes Kepler",
    life: "1571—1630",
    englishLife: "1571-1630",
    school: "数学天文学",
    englishSchool: "Mathematical Astronomy",
    palette: ["#e7e1d6", "#c2ad8d", "#866e4d", "#2d2821"],
  },
  "isaac-newton": {
    name: "艾萨克·牛顿",
    englishName: "Isaac Newton",
    life: "1643—1727",
    englishLife: "1643-1727",
    school: "经典力学与自然哲学",
    englishSchool: "Classical Mechanics and Natural Philosophy",
    palette: ["#e2e6e8", "#aebbc2", "#687d88", "#252d31"],
  },
  "michael-faraday": {
    name: "迈克尔·法拉第",
    englishName: "Michael Faraday",
    life: "1791—1867",
    englishLife: "1791-1867",
    school: "实验物理学",
    englishSchool: "Experimental Physics",
    palette: ["#e5e6da", "#b9bea0", "#77805d", "#292d24"],
  },
  "james-clerk-maxwell": {
    name: "詹姆斯·克拉克·麦克斯韦",
    englishName: "James Clerk Maxwell",
    life: "1831—1879",
    englishLife: "1831-1879",
    school: "数学物理学",
    englishSchool: "Mathematical Physics",
    palette: ["#e5e0e6", "#baafbf", "#786b80", "#2b2730"],
  },
} satisfies Record<string, ScienceAuthorProfile>;

export const scienceEarlySeeds = [
  {
    id: "science-bacon-gradual-induction",
    authorId: "francis-bacon",
    topic: "方法",
    text: "另一条道路则从感觉和个别事物出发建立公理，不断地、逐级地上升，直至最终抵达最普遍的公理；这才是真正的、却尚未有人尝试的道路。",
    english:
      "The other constructs its axioms from the senses and particulars, by ascending continually and gradually, till it finally arrives at the most general axioms, which is the true but unattempted way.",
    editorialSummary:
      "这句话把可靠知识的路径描述为连续上升：从感官和个别事实出发，经由中间公理，逐层抵达更普遍的命题。",
    englishEditorialSummary:
      "The passage presents reliable inquiry as a continuous ascent: it begins with sense and particulars, passes through intermediate axioms, and reaches increasingly general claims.",
    work: "《新工具》",
    englishWork: "Novum Organum",
    reflection:
      "培根针对的是从少量例子直接套用既有体系的做法，他要求中间层次的命题持续接受经验约束。这里的“归纳”不是简单计数，而是一套缓慢修正概念的研究程序；它也不能保证每一级推论都自动正确。",
    englishReflection:
      "Bacon was opposing the habit of fitting a few examples directly into an inherited system, insisting that intermediate propositions remain answerable to experience. His induction is not mere counting but a procedure for gradually revising concepts; it does not make every inferential step automatically correct.",
    question: "你的结论跨过了哪些尚未检验的中间台阶？",
    englishQuestion:
      "Which still-untested intermediate steps has your conclusion skipped?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "约瑟夫·德维编（纽约：P. F. Collier & Son，1902 年），第一卷，第 XIX 格言",
      "Joseph Devey ed. (New York: P. F. Collier & Son, 1902), Book I, Aphorism XIX",
    ],
  },
  {
    id: "science-bacon-idols",
    authorId: "francis-bacon",
    topic: "证据",
    text: "四类假象困扰着人的心灵；为了加以区分，我们给它们命名：第一类称为族类假象，第二类称为洞穴假象，第三类称为市场假象，第四类称为剧场假象。",
    english:
      "Four species of idols beset the human mind, to which (for distinction’s sake) we have assigned names, calling the first Idols of the Tribe, the second Idols of the Den, the third Idols of the Market, the fourth Idols of the Theatre.",
    editorialSummary:
      "四种假象分别指人类共同天性、个人处境、语言交往与承袭理论给判断带来的系统性扭曲。",
    englishEditorialSummary:
      "The four idols name systematic distortions arising from shared human nature, individual situation, linguistic exchange, and inherited systems of thought.",
    work: "《新工具》",
    englishWork: "Novum Organum",
    reflection:
      "“四种假象”把认知偏差放进知识生产过程，而不只归咎于个别人的粗心。培根没有提供一份能一次清除偏差的心理学清单；更实际的含义是，让实验安排、术语和理论传统都接受公开检查。",
    englishReflection:
      "The four idols place cognitive distortion inside the production of knowledge rather than blaming only individual carelessness. Bacon does not offer a psychological checklist that removes bias once and for all; the practical lesson is to expose experimental arrangements, terms, and theoretical inheritances to public scrutiny.",
    question: "你以为自己在读证据时，是否其实也在重复某种语言或学派的预设？",
    englishQuestion:
      "When you think you are reading the evidence, might you also be repeating assumptions built into a language or school?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "约瑟夫·德维编（纽约：P. F. Collier & Son，1902 年），第一卷，第 XXXIX 格言",
      "Joseph Devey ed. (New York: P. F. Collier & Son, 1902), Book I, Aphorism XXXIX",
    ],
  },
  {
    id: "science-bacon-organized-experiment",
    authorId: "francis-bacon",
    topic: "方法",
    text: "现行的实验方法是盲目而愚钝的；人们漫无确定方向，听凭偶然驱使，四处奔逐，却少有进展。",
    english:
      "The present method of experiment is blind and stupid; hence men wandering and roaming without any determined course, and consulting mere chance, are hurried about to various points, and advance but little.",
    editorialSummary:
      "实验若只是随手试探，得到的多半是偶然；只有按问题组织并记录变化，经验才会成为研究。",
    englishEditorialSummary:
      "When experiments are only casual trials, their results are mostly accidental; experience becomes inquiry only when variations are organized and recorded around a question.",
    work: "《新工具》",
    englishWork: "Novum Organum",
    reflection:
      "培根区分漫游式试验与有次序的实验史，强调研究需要可比较的安排。秩序本身并不等于严谨：如果问题、测量或记录有缺陷，再整齐的表格也可能稳定地产生误导。",
    englishReflection:
      "Bacon distinguishes wandering trials from an ordered experimental history and stresses the need for comparable arrangements. Order alone is not rigor: defective questions, measurements, or records can make even a tidy table reliably misleading.",
    question: "你下一次尝试，能否只改变一个关键条件并留下可比较的记录？",
    englishQuestion:
      "In your next trial, can you vary one crucial condition and leave a record that permits comparison?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "约瑟夫·德维编（纽约：P. F. Collier & Son，1902 年），第一卷，第 LXX 格言；连续原句",
      "Joseph Devey ed. (New York: P. F. Collier & Son, 1902), Book I, Aphorism LXX; continuous sentence",
    ],
  },
  {
    id: "science-bacon-negative-instances",
    authorId: "francis-bacon",
    topic: "证据",
    text: "接下来必须向理解力呈现不具有所研究性质的实例……因此，否定实例必须列在肯定实例之下，尤其要在那些与该性质明显存在的对象极为相近的对象中，考察所研究性质的缺失。",
    english:
      "We must next present to the understanding instances which do not admit of the given nature … Negatives, therefore, must be classed under the affirmatives, and the want of the given nature must be inquired into more particularly in objects which have a very close connection with those others in which it is present and manifest.",
    editorialSummary:
      "寻找现象出现的场合还不够；缺席、强弱变化与反例，往往更能排除错误解释。",
    englishEditorialSummary:
      "It is not enough to collect occasions when a phenomenon appears; absences, changes of degree, and counterinstances often do more to eliminate mistaken explanations.",
    work: "《新工具》",
    englishWork: "Novum Organum",
    reflection:
      "培根的表格与排除法试图让不符合候选解释的实例进入视野，抵抗只搜集支持材料的诱惑。这不是现代统计检验的提前版本，也不会从有限表格中机械地产生真因；它首先是一种主动寻找失败条件的纪律。",
    englishReflection:
      "Bacon's tables and exclusions bring cases that conflict with candidate explanations into view, resisting the temptation to collect support alone. This is not an early form of modern statistical testing, nor does a finite table mechanically yield the true cause; it is first a discipline of actively seeking conditions of failure.",
    question: "什么样的观察会迫使你放弃当前最喜欢的解释？",
    englishQuestion:
      "What observation would force you to abandon your favorite current explanation?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "约瑟夫·德维编（纽约：P. F. Collier & Son，1902 年），第二卷，第 XII 格言；同一格言内删节以省略号标示",
      "Joseph Devey ed. (New York: P. F. Collier & Son, 1902), Book II, Aphorism XII; omission within the aphorism marked with an ellipsis",
    ],
  },
  {
    id: "science-bacon-bee",
    authorId: "francis-bacon",
    topic: "模型",
    text: "蜜蜂介于二者之间；它从花园和田野的花朵中采集材料，却凭自身的努力加工并塑造这些材料。",
    english:
      "The bee, a mean between both, extracts matter from the flowers of the garden and the field, but works and fashions it by its own efforts.",
    editorialSummary:
      "蜜蜂象征一种结合经验与理智的方法：知识既从外部世界采集材料，也通过心智的加工获得形式。",
    englishEditorialSummary:
      "The bee figures a method joining experience and reason: knowledge gathers material from the world while giving it form through intellectual work.",
    work: "《新工具》",
    englishWork: "Novum Organum",
    reflection:
      "蚂蚁、蜘蛛与蜜蜂的比喻批评了无组织的经验主义和脱离材料的理性主义。模型与概念必须加工观察，观察也必须反过来限制加工方式；但比喻没有告诉我们哪一种转化在具体学科中最可靠。",
    englishReflection:
      "The ant, spider, and bee metaphor criticizes both unorganized empiricism and reasoning detached from materials. Models and concepts must transform observations while observations constrain that transformation; the metaphor does not by itself tell us which transformation is most reliable in a given field.",
    question: "你的工作更像收集、编织，还是在证据约束下进行转化？",
    englishQuestion:
      "Does your work mainly collect, spin, or transform under the constraint of evidence?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "约瑟夫·德维编（纽约：P. F. Collier & Son，1902 年），第一卷，第 XCV 格言",
      "Joseph Devey ed. (New York: P. F. Collier & Son, 1902), Book I, Aphorism XCV",
    ],
  },
  {
    id: "science-galileo-moon",
    authorId: "galileo-galilei",
    topic: "证据",
    text: "这些斑点在我之前从未被任何人观察到。根据我反复进行的观察，我得出了已经表达过的看法：我确信月球表面并非完全光滑、毫无高低而且精确呈球形——许多哲学家如此看待月球和其他天体；恰恰相反，它高低不平，布满凹陷与隆起，正如地球表面一样，处处有高山和深谷。",
    english:
      "These spots have never been observed by any one before me; and from my observations of them, often repeated, I have been led to that opinion which I have expressed, namely, that I feel sure that the surface of the Moon is not perfectly smooth, free from inequalities and exactly spherical, as a large school of philosophers considers with regard to the Moon and the other heavenly bodies, but that, on the contrary, it is full of inequalities, uneven, full of hollows and protuberances, just like the surface of the Earth itself, which is varied everywhere by lofty mountains and deep valleys.",
    editorialSummary: "月面的明暗边界若呈现锯齿与孤立亮点，便更像由高低地形造成，而非光滑球面的均匀照明。",
    englishEditorialSummary:
      "When the Moon's light-dark boundary shows jagged edges and isolated bright points, relief and elevation explain it better than uniform illumination of a smooth sphere.",
    work: "《星际信使》",
    englishWork: "Sidereus Nuncius",
    presentationNature: "source-excerpt",
    reflection:
      "伽利略没有把望远镜图像当作无需解释的事实，而是借助光照、阴影和几何类比推断月面地形。这一论证挑战天体必然完美光滑的传统，却仍依赖仪器质量和对视觉现象的正确解释。",
    englishReflection:
      "Galileo did not treat telescopic images as uninterpreted facts; he inferred lunar relief through illumination, shadow, and geometrical analogy. The argument challenged the inherited demand for perfectly smooth heavens, while still depending on instrument quality and a sound reading of visual effects.",
    question: "当新工具让你看见异常时，你如何区分对象的特征与仪器的假象？",
    englishQuestion:
      "When a new instrument reveals an anomaly, how do you distinguish a feature of the object from an artifact of the instrument?",
    sourceLocator: [
      "“月球表面的观测”部分，月面观测正文第一段；Edward Stafford Carlos 1880 年公版英译，第 8—9 页，连续节录",
      "Observations of the Moon, first paragraph of the lunar observations; Edward Stafford Carlos public-domain translation (1880), pp. 8–9, continuous excerpt",
    ],
  },
  {
    id: "science-galileo-jupiter",
    authorId: "galileo-galilei",
    topic: "宇宙",
    text: "而且，它们在不等的圆周中运行；这显然可从一个事实推得：当它们离木星很远时，我从未见过两颗卫星会合，然而在木星附近，却常有两颗、三颗，有时甚至四颗紧密聚集在一起。",
    english:
      "Moreover, they revolve in unequal circles, which is evidently the conclusion to be drawn from the fact that I have never been permitted to see two satellites in conjunction when their distance from Jupiter was great, whereas near Jupiter two, three, and sometimes all (four), have been found closely packed together.",
    editorialSummary: "连续多夜追踪木星附近小星的位置变化，可以把散乱亮点识别为围绕木星运行的天体系统。",
    englishEditorialSummary:
      "Tracking the changing positions of small stars near Jupiter over successive nights turns scattered points of light into a system of bodies orbiting Jupiter.",
    work: "《星际信使》",
    englishWork: "Sidereus Nuncius",
    presentationNature: "source-excerpt",
    reflection:
      "关键证据不是某一晚的奇观，而是带日期的序列让相对位置形成可重复的轨道模式。木星卫星说明并非所有天体都绕地球运行，也回应了月球能否随地球共同运动的反对意见；但它本身并未直接证明地球绕太阳。",
    englishReflection:
      "The crucial evidence was not a single night's spectacle but a dated sequence in which relative positions formed a repeatable orbital pattern. Jupiter's moons showed that not every heavenly body circles Earth and answered an objection to the Moon accompanying a moving Earth; by itself, however, it did not directly prove that Earth circles the Sun.",
    question: "一个孤立观察要变成关于运动的证据，还缺少怎样的时间序列？",
    englishQuestion:
      "What time series is still needed before an isolated observation becomes evidence about motion?",
    sourceLocator: [
      "“美第奇星”部分，连续观测后的结论；Edward Stafford Carlos 1880 年公版英译，第 68—69 页，连续节录",
      "“Medicean Stars,” conclusion after the dated observations; Edward Stafford Carlos public-domain translation (1880), pp. 68-69, continuous excerpt",
    ],
  },
  {
    id: "science-galileo-milky-way",
    authorId: "galileo-galilei",
    topic: "宇宙",
    text: "借助望远镜，任何人都可以用如此鲜明诉诸感官的方式看到银河，以至于困扰哲学家许多世纪的一切争论都立刻被眼睛不可辩驳的证据击破；因为银河不过是无数恒星成团聚集而成的集合。",
    english:
      "By the aid of a telescope any one may behold this in a manner which so distinctly appeals to the senses that all the disputes which have tormented philosophers through so many ages are exploded at once by the irrefragable evidence of our eyes, and we are freed from wordy disputes upon this subject, for the Galaxy is nothing else but a mass of innumerable stars planted together in clusters.",
    editorialSummary: "肉眼所见的银河云雾，经望远镜分解为密集恒星，说明表象的连续不等于结构的连续。",
    englishEditorialSummary:
      "The milky haze seen by the naked eye resolves through a telescope into dense stars, showing that continuity in appearance need not mean continuity in structure.",
    work: "《星际信使》",
    englishWork: "Sidereus Nuncius",
    presentationNature: "source-excerpt",
    reflection:
      "仪器改变了可分辨尺度，也改变了“银河是什么”这一问题可接受的答案。分解成许多恒星并不意味着伽利略已经知道银河系的整体形状、距离或动力学；观测分辨率的提升只是打开了新的层级。",
    englishReflection:
      "The instrument changed the resolvable scale and therefore the acceptable answers to what the Milky Way is. Resolving it into many stars did not give Galileo the Galaxy's overall shape, distances, or dynamics; increased resolution merely opened a new level of inquiry.",
    question: "你面对的连续现象，会不会只是当前分辨率下尚未展开的结构？",
    englishQuestion:
      "Could the continuous phenomenon before you be structure not yet resolved at your present scale?",
    sourceLocator: [
      "“恒星、银河与星云”部分；Edward Stafford Carlos 1880 年公版英译，第 42—43 页，连续节录",
      "Section on fixed stars, the Milky Way, and nebulae; Edward Stafford Carlos public-domain translation (1880), pp. 42-43, continuous excerpt",
    ],
  },
  {
    id: "science-galileo-ship",
    authorId: "galileo-galilei",
    topic: "模型",
    text: "让船以你喜欢的任何速度航行；只要运动是均匀的，而不是来回颠簸，你就不会在上述一切现象中察觉哪怕最微小的改变，也不能由其中任何一种现象判断船是在运动还是静止。",
    english:
      "Make the Ship to move with what velocity you please; for (so long as the motion is uniforme, and not fluctuating this way and that way) you shall not discern any the least alteration in all the forenamed effects; nor can you gather by any of them whether the Ship doth move or stand still.",
    editorialSummary: "在平稳匀速的封闭船舱里，内部实验无法单凭自身判断整艘船是在静止还是运动。",
    englishEditorialSummary:
      "Inside a smoothly and uniformly moving closed cabin, internal experiments alone cannot determine whether the whole ship is at rest or in motion.",
    work: "《关于托勒密和哥白尼两大世界体系的对话》",
    englishWork: "Dialogue Concerning the Two Chief World Systems",
    presentationNature: "source-excerpt",
    reflection:
      "船舱思想实验把共同运动与局部相对运动分开，削弱了“地球若动，落体和飞鸟必被甩开”的直觉。它讨论的是理想的匀速运动和内部机械现象，不涵盖加速度、旋转及后来相对论中的光学问题。",
    englishReflection:
      "The ship-cabin thought experiment separates shared motion from local relative motion and weakens the intuition that falling bodies or birds must be left behind if Earth moves. It concerns ideal uniform motion and internal mechanical phenomena, not acceleration, rotation, or the optical questions later addressed by relativity.",
    question: "哪些看似绝对的判断，其实只能相对于共同运动的系统作出？",
    englishQuestion:
      "Which apparently absolute judgments can in fact be made only relative to a shared moving system?",
    sourceLocator: [
      "第二日，船舱思想实验；Thomas Salusbury 1661 年公版英译，第 166 页，连续节录",
      "Second Day, ship-cabin thought experiment; Thomas Salusbury public-domain translation (1661), p. 166, continuous excerpt",
    ],
  },
  {
    id: "science-galileo-inclined-plane",
    authorId: "galileo-galilei",
    topic: "方法",
    text: "把木板的一端抬高一至二肘，使它处于倾斜位置；正如我刚才所说，我们让球沿槽滚下，并以一种马上要说明的方法记录它完成下降所需的时间。……在这些整整重复了一百次的实验中，我们总是发现，所经过的距离彼此之比等于所用时间平方之比。",
    english:
      "Having placed this board in a sloping position, by lifting one end some one or two cubits above the other, we rolled the ball, as I was just saying, along the channel, noting, in a manner presently to be described, the time required to make the descent. ... in such experiments, repeated a full hundred times, we always found that the spaces traversed were to each other as the squares of the times.",
    editorialSummary: "把过快的落体过程转化为斜面上的缓慢运动，能让数学关系进入可重复测量。",
    englishEditorialSummary:
      "Transforming rapid fall into slower motion down an inclined plane makes a mathematical relation accessible to repeatable measurement.",
    work: "《关于两门新科学的谈话和数学证明》",
    englishWork: "Discourses and Mathematical Demonstrations Relating to Two New Sciences",
    presentationNature: "source-excerpt",
    reflection:
      "斜面实验不是自然现象的原样复制，而是通过控制坡度、距离和计时把关键关系放大出来。它支持匀加速运动的距离—时间平方关系，但滚动、摩擦和计时误差意味着实验与理想模型之间仍需推理连接。",
    englishReflection:
      "The inclined-plane experiment does not copy nature unchanged; it amplifies a relevant relation by controlling slope, distance, and timing. It supports the distance-time-squared relation for uniformly accelerated motion, while rolling, friction, and timing error still require an inferential bridge between experiment and ideal model.",
    question: "你能否把难以观测的问题转换成一个更慢、更清楚但仍保留核心关系的实验？",
    englishQuestion:
      "Can you transform a hard-to-observe problem into a slower, clearer experiment that preserves its central relation?",
    sourceLocator: [
      "第三日“自然加速运动”，定理二后的斜面实验报告；Henry Crew 与 Alfonso de Salvio 1914 年公版英译，第 178—180 页；卡片以省略号标示中间删节",
      "Third Day, “Naturally Accelerated Motion,” inclined-plane report after Theorem II; Henry Crew and Alfonso de Salvio public-domain translation (1914), pp. 178-180; internal omission marked with an ellipsis",
    ],
  },
  {
    id: "science-kepler-eight-minutes",
    authorId: "johannes-kepler",
    topic: "证据",
    text: "“既然，”他说，“上帝的仁慈在第谷·布拉赫身上赐给我们一位精确的观测者，而他的观测揭示了托勒密假说计算中的八角分误差，我们就应承认并善用这份上帝的恩赐；既然这一误差不能忽略，单凭这八角分，就已经为天文学的全面改革铺平道路，并将成为本书的主要论题。”",
    english:
      "“Since,” he says, “the divine goodness has given us in Tycho Brahe an exact observer, from whose observations this error of eight minutes in the calculations of the Ptolemaic hypothesis is detected, let us acknowledge and make use of this gift of God: and since this error cannot be neglected, these eight minutes alone have prepared the way for an entire reform of Astronomy, and are to be the main subject of this work.”",
    editorialSummary: "当高质量观测与模型相差八角分时，不应让误差迁就理论，而应让微小偏差迫使天文学重建。",
    englishEditorialSummary:
      "When high-quality observations differ from a model by eight arcminutes, error should not be made to serve the theory; a small discrepancy can force astronomy to be rebuilt.",
    work: "《新天文学》",
    englishWork: "Astronomia Nova",
    presentationNature: "source-excerpt",
    reflection:
      "开普勒相信第谷的火星观测足够精确，因此没有用微小差异保住圆轨道组合。八角分之所以有力量，是因为误差预算与数据质量已经被认真评估；脱离测量精度，把任何微差都视为理论危机同样不合理。",
    englishReflection:
      "Kepler trusted the quality of Tycho's observations of Mars and refused to save combinations of circles by absorbing the discrepancy. The eight arcminutes mattered because measurement precision and the error budget had been taken seriously; without that assessment, treating every small difference as a theoretical crisis would be equally unsound.",
    question: "你眼前的偏差是噪声，还是已经超过方法所允许的误差范围？",
    englishQuestion:
      "Is the discrepancy before you noise, or has it exceeded the error your method can reasonably allow?",
    sourceLocator: [
      "William Whewell《论发现哲学》（1860）第十四章第10节“第谷”，第123页；该处注明引自开普勒《新天文学》第19章（De Stell. Mart., p. 11），保留 Whewell 的引语引入语",
      "William Whewell, On the Philosophy of Discovery (1860), Chapter XIV, §10 (“Tycho”), p. 123; there attributed to Kepler, Astronomia Nova, Chapter 19 (De Stell. Mart., p. 11), retaining Whewell's quotation lead-in",
    ],
  },
  {
    id: "science-kepler-area",
    authorId: "johannes-kepler",
    topic: "模型",
    text: "因此，椭圆的总面积——即在 A 点被分割成若干三角形的面积——在各段轨迹之间的分配比例，与总周期时间在这些轨迹段之间的分配比例相同。",
    english:
      "Therefore the total area of the ellipse—which has been cut up at A into triangles—is distributed among the arcs in the same proportion wherein the total periodic time has been distributed among them.",
    editorialSummary: "行星沿轨道的速度并不恒定；以太阳为中心考察扫过的面积，变化的快慢才显出稳定规律。",
    englishEditorialSummary:
      "A planet's speed along its orbit is not constant; when motion is measured by areas swept about the Sun, changing speed reveals a stable regularity.",
    work: "《哥白尼天文学概要》",
    englishWork: "Epitome of Copernican Astronomy",
    presentationNature: "source-excerpt",
    reflection:
      "开普勒从距离规则和面积近似逐步形成后来所谓面积定律，把太阳置于运动描述的物理中心。书中的计算路径并不等同于今天简洁的“等时扫过等面积”公式，且它描述规律而未给出牛顿式动力学证明。",
    englishReflection:
      "Kepler moved from a distance rule and area approximations toward what became known as the area law, placing the Sun at the physical center of the account. His computational route is not identical to today's concise statement of equal areas in equal times, and it describes a regularity without providing a Newtonian dynamical proof.",
    question: "当一个量看似忽快忽慢时，是否存在更合适的参照量使规律显现？",
    englishQuestion:
      "When one quantity appears irregularly fast and slow, is there a better reference quantity that reveals its regularity?",
    sourceLocator: [
      "第五卷第4节“时间的度量，或行星在其轨道任一弧段中所作延迟的度量”；Charles Glenn Wallis 1939 年公版英译，第983页，连续节录",
      "Book V, §4, ‘On the Measure of Time, or of the Delay Made by the Planet in Any Arc of its Orbit’; Charles Glenn Wallis public-domain translation (1939), p. 983; continuous excerpt",
    ],
  },
  {
    id: "science-kepler-ellipse",
    authorId: "johannes-kepler",
    topic: "模型",
    text: "此外，我同时证明，行星轨道是椭圆，运动之源太阳位于这个椭圆的一个焦点；因此，当行星从远日点走完其总轨道的四分之一时，它恰好处在距太阳的平均距离上，位于远日点的最大距离与近日点的最小距离之间。",
    english:
      "Moreover, I demonstrated at the same time that the planetary orbit is elliptical and the sun, the source of movement, is at one of the foci of this ellipse; and so, when the planet has completed a quarter of its total circuit from its aphelion, then it is exactly at its mean distance from the sun, midway between its greatest distance at the aphelion and its least at the perihelion.",
    editorialSummary: "当圆与本轮无法同时服从火星观测时，椭圆不是审美退让，而是被证据逼出的新轨道。",
    englishEditorialSummary:
      "When circles and epicycles cannot satisfy the observations of Mars, the ellipse is not an aesthetic concession but a new orbit compelled by evidence.",
    work: "《世界的和谐》",
    englishWork: "Harmonices Mundi",
    presentationNature: "source-excerpt",
    reflection:
      "椭圆结束了把完美圆周当作天体运动先验形式的做法，也用较统一的几何结构取代补丁式调整。它仍是一种轨道描述；为什么行星遵循这种曲线，要到引力动力学中才得到不同层次的解释。",
    englishReflection:
      "The ellipse ended the treatment of perfect circular motion as an a priori form of the heavens and replaced patchwork adjustments with a more unified geometry. It remained a description of the orbit; why planets follow such curves required a different level of explanation in gravitational dynamics.",
    question: "你维护的“完美形式”，是在解释证据，还是在迫使证据服从它？",
    englishQuestion:
      "Is the 'perfect form' you preserve explaining the evidence, or forcing the evidence to obey it?",
    sourceLocator: [
      "第五卷第3章第V项；Charles Glenn Wallis 1939 年公版英译，第1018页，连续节录",
      "Book V, Chapter 3, Article V; Charles Glenn Wallis public-domain translation (1939), p. 1018; continuous excerpt",
    ],
  },
  {
    id: "science-kepler-harmonic-law",
    authorId: "johannes-kepler",
    topic: "宇宙",
    text: "然而，可以绝对确定而精确地说，任意两颗行星的周期之比，恰好等于其平均距离——也就是各自天球半径——的 3/2 次幂之比；不过条件是，椭圆轨道两条直径的算术平均值要略小于长径。",
    english:
      "But it is absolutely certain and exact that the ratio which exists between the periodic times of any two planets is precisely the ratio of the 3/2th power of the mean distances, i.e., of the spheres themselves; provided, however, that the arithmetic mean between both diameters of the elliptic orbit be slightly less than the longer diameter.",
    editorialSummary: "不同行星的周期与平均距离并非各自偶然：周期的平方与平均距离的立方呈现同一比例结构。",
    englishEditorialSummary:
      "The periods and mean distances of different planets are not separate accidents: squared periods and cubed mean distances share one proportional structure.",
    work: "《世界的和谐》",
    englishWork: "Harmonices Mundi",
    presentationNature: "source-excerpt",
    reflection:
      "这条跨行星关系把多个轨道纳入同一可计算秩序，并为后来引力理论提供了需要解释的稳定模式。开普勒把它放在广阔的宇宙和谐计划中，但现代使用这一定律并不需要接受其中全部音乐与神学类比。",
    englishReflection:
      "This cross-planet relation placed multiple orbits within one calculable order and gave later gravitational theory a stable pattern to explain. Kepler embedded it in a broad program of cosmic harmony, but modern use of the law does not require accepting all of its musical and theological analogies.",
    question: "哪些彼此分散的个案，可能通过无量纲比例或尺度关系被统一起来？",
    englishQuestion:
      "Which scattered cases might be unified by a dimensionless proportion or a relation of scale?",
    sourceLocator: [
      "第五卷第3章第VIII项；Charles Glenn Wallis 1939 年公版英译，第1020页，连续节录",
      "Book V, Chapter 3, Article VIII; Charles Glenn Wallis public-domain translation (1939), p. 1020; continuous excerpt",
    ],
  },
  {
    id: "science-newton-rules-causes",
    authorId: "isaac-newton",
    topic: "方法",
    text: "我们只应承认那些既真实、又足以解释自然事物之表象的原因。……因此，对于同样的自然结果，我们必须尽可能指定同样的原因。",
    english:
      "We are to admit no more causes of natural things, than such as are both true and sufficient to explain their appearances. ... Therefore to the same natural effects we must, as far as possible, assign the same causes.",
    editorialSummary: "若同一类现象可由相同原因充分解释，就不应无证据地为每个个案另造原因。",
    englishEditorialSummary:
      "When the same kind of phenomena can be adequately explained by the same causes, separate causes should not be invented for each case without evidence.",
    work: "《自然哲学的数学原理》",
    englishWork: "Philosophiæ Naturalis Principia Mathematica",
    presentationNature: "source-excerpt",
    reflection:
      "牛顿的前两条推理规则追求充分而节制的因果说明，并让地上与天上的运动进入同一研究框架。它们不是要求永远选择最简单的故事：若新现象显示因果差异，统一必须让位于更有区分力的证据。",
    englishReflection:
      "Newton's first two rules seek causes that are sufficient without multiplying them and help bring terrestrial and celestial motion into one inquiry. They do not command us always to choose the simplest story: if new phenomena reveal causal differences, unification must yield to more discriminating evidence.",
    question: "你是在发现必要的差异，还是只为相似现象重复发明解释？",
    englishQuestion:
      "Are you discovering a necessary difference, or repeatedly inventing explanations for similar phenomena?",
    sourceLocator: [
      "第三编“哲学推理规则”第一、二条；Andrew Motte 1729 年公版英译；卡片以省略号标示两条规则之间的删节",
      "Book III, Rules of Reasoning in Philosophy, Rules I-II; Andrew Motte public-domain translation (1729); internal omission marked with an ellipsis",
    ],
  },
  {
    id: "science-newton-rule-third",
    authorId: "isaac-newton",
    topic: "证据",
    text: "物体的性质，如果既不容程度上的增强或减弱，又被发现属于我们实验所能触及的一切物体，就应当被视为所有物体的普遍性质。",
    english:
      "The qualities of bodies, which admit neither intension nor remission of degrees, and which are found to belong to all bodies within the reach of our experiments, are to be esteemed the universal qualities of all bodies whatsoever.",
    editorialSummary: "在实验所及范围内反复成立、又无法分级增减的物体性质，可以暂作普遍性质来研究。",
    englishEditorialSummary:
      "Properties repeatedly found within the reach of experiment, and not admitting degrees of increase or decrease, may provisionally be studied as universal properties of bodies.",
    work: "《自然哲学的数学原理》",
    englishWork: "Philosophiæ Naturalis Principia Mathematica",
    presentationNature: "source-excerpt",
    reflection:
      "第三条规则允许从可实验物体推向更广阔的自然，但限定了所谈性质的类型与证据基础。它不是一次观察后的无限外推，也不是形而上学保证；普遍性在这里是一项由现有实验支撑的研究承诺。",
    englishReflection:
      "The third rule permits movement from experimentally accessible bodies toward nature more broadly, while restricting both the kind of property and its evidential basis. It is neither unlimited extrapolation from one observation nor a metaphysical guarantee; universality here is a research commitment supported by the experiments available.",
    question: "你把局部规律推广到远处之前，哪些性质和适用条件必须先保持一致？",
    englishQuestion:
      "Before extending a local regularity farther, which properties and conditions of application must remain invariant?",
    sourceLocator: [
      "第三编“哲学推理规则”第三条；Andrew Motte 1729 年公版英译，连续节录",
      "Book III, Rules of Reasoning in Philosophy, Rule III; Andrew Motte public-domain translation (1729), continuous excerpt",
    ],
  },
  {
    id: "science-newton-rule-fourth",
    authorId: "isaac-newton",
    topic: "不确定",
    text: "在实验哲学中，由现象通过一般归纳所得的命题，即使有人想象出任何相反的假说，也应被视为准确或极其接近真实，直到出现其他现象，使这些命题变得更准确或须接受例外。",
    english:
      "In experimental philosophy we are to look upon propositions collected by general induction from phenomena as accurately or very nearly true, notwithstanding any contrary hypotheses that may be imagined, till such time as other phenomena occur, by which they may either be made more accurate, or liable to exceptions.",
    editorialSummary: "由现象归纳出的命题应被当作真实或非常接近真实，直到新的现象要求修正或例外。",
    englishEditorialSummary:
      "Propositions induced from phenomena should be treated as true, or very nearly true, until new phenomena require correction or exception.",
    work: "《自然哲学的数学原理》",
    englishWork: "Philosophiæ Naturalis Principia Mathematica",
    presentationNature: "source-excerpt",
    reflection:
      "第四条规则同时拒绝因纯粹猜测而瘫痪证据结论，也保留未来修订的入口。暂定并不等于随意：在反例出现之前，结论仍有明确的证据权重；新证据出现后，也不必把过去的近似成功说成毫无价值。",
    englishReflection:
      "The fourth rule refuses to let mere conjectures paralyze conclusions from evidence while preserving an opening for future revision. Provisional does not mean arbitrary: a conclusion retains determinate evidential weight until counterevidence appears, and later correction need not erase the value of an earlier approximation.",
    question: "你能否既按当前最佳证据行动，又清楚说出什么会改变结论？",
    englishQuestion:
      "Can you act on the best current evidence while stating clearly what would change the conclusion?",
    sourceLocator: [
      "第三编“哲学推理规则”第四条；Andrew Motte 1729 年公版英译，连续节录",
      "Book III, Rules of Reasoning in Philosophy, Rule IV; Andrew Motte public-domain translation (1729), continuous excerpt",
    ],
  },
  {
    id: "science-newton-no-feigned-hypothesis",
    authorId: "isaac-newton",
    topic: "模型",
    text: "但是，我至今未能从现象中发现引力这些性质的原因，而且我不虚构假说。凡不是从现象中推导出来的，都应称为假说；无论是形而上学的、物理的、隐秘性质的还是机械的假说，在实验哲学中都没有位置。",
    english:
      "But hitherto I have not been able to discover the cause of those properties of gravity from phænomena, and I frame no hypotheses. For whatever is not deduc'd from the phænomena, is to be called an hypothesis; and hypotheses, whether metaphysical or physical, whether of occult qualities or mechanical, have no place in experimental philosophy.",
    editorialSummary: "从现象中确立引力规律，并不等于已经知道引力的终极机制；未知处不必用无证据的机制填满。",
    englishEditorialSummary:
      "Establishing the law of gravity from phenomena does not mean that gravity's ultimate mechanism is already known; an evidential gap need not be filled with an unsupported mechanism.",
    work: "《自然哲学的数学原理》",
    englishWork: "Philosophiæ Naturalis Principia Mathematica",
    presentationNature: "source-excerpt",
    reflection:
      "“不虚构假说”出现在牛顿承认尚未从现象推出引力原因的特定语境中，区分了可计算规律与尚无根据的机制说明。它不等于禁止一切假说或模型；牛顿反对的是把没有现象支持的猜测当作已经建立的自然哲学。",
    englishReflection:
      "Newton's refusal to feign hypotheses occurs in the specific context of admitting that he had not deduced gravity's cause from phenomena, separating a calculable law from an unsupported mechanism. It is not a ban on every hypothesis or model; the target is conjecture presented as established natural philosophy without phenomenal support.",
    question: "你的模型解释了可观察关系，还是把未知机制包装成了已知事实？",
    englishQuestion:
      "Does your model explain observable relations, or package an unknown mechanism as an established fact?",
    sourceLocator: [
      "第三编《总释》末段；Andrew Motte 1729 年公版英译，连续节录",
      "Book III, General Scholium, closing paragraph; Andrew Motte public-domain translation (1729), continuous excerpt",
    ],
  },
  {
    id: "science-newton-analysis-synthesis",
    authorId: "isaac-newton",
    topic: "方法",
    text: "正如在数学中一样，在自然哲学中，对困难事物的研究也应当始终先采用分析法，再采用综合法。分析法包括进行实验和观察，并通过归纳从中得出一般结论。……综合法则是把已经发现并确立的原因当作原理，用它们解释由此产生的现象，并证明这些解释。",
    english:
      "As in Mathematicks, so in Natural Philosophy, the Investigation of difficult Things by the Method of Analysis, ought ever to precede the Method of Composition. This Analysis consists in making Experiments and Observations, and in drawing general Conclusions from them by Induction. ... And the Synthesis consists in assuming the Causes discover'd, and establish'd as Principles, and by them explaining the Phænomena proceeding from them, and proving the Explanations.",
    editorialSummary: "研究可以先由实验和现象分析出较一般原则，再用这些原则综合解释并检验其他现象。",
    englishEditorialSummary:
      "Inquiry can first analyze experiments and phenomena into more general principles, then use those principles to synthesize explanations and tests of other phenomena.",
    work: "《光学》",
    englishWork: "Opticks",
    presentationNature: "source-excerpt",
    reflection:
      "牛顿在《光学》末尾把分析与综合描述为相互接续的研究方向，而不是只从公理向下演绎。这个顺序不会机械地产生发现，所谓一般原则也仍要回到新的现象中接受检验。",
    englishReflection:
      "At the end of Opticks, Newton presents analysis and synthesis as successive directions of inquiry rather than deduction from axioms alone. The sequence does not mechanically produce discoveries, and its general principles must still return to new phenomena for testing.",
    question: "你得出的原则，能否在原始材料之外组织一次新的可检验解释？",
    englishQuestion:
      "Can the principle you derived organize a new testable explanation beyond the material from which it came?",
    sourceLocator: [
      "第二版，第三卷，问题 31 末段（1718）；牛顿英文原文；卡片以省略号标示中间删节",
      "Second edition, Book III, Query 31, closing methodological passage (1718); Newton's English text; internal omission marked with an ellipsis",
    ],
  },
  {
    id: "science-faraday-induction",
    authorId: "michael-faraday",
    topic: "证据",
    text: "接通电池时的偏转总是表明，感生电流的方向与电池电流相反；断开接触时的偏转则表明，感生电流与电池电流同向。……电池电流无论持续多久，都不会使检流计指针发生偏转。",
    english:
      "The deflection on making a battery contact always indicated an induced current in the opposite direction to that from the battery; but on breaking the contact the deflection indicated an induced current in the same direction as that of the battery. … No continuance of the battery current caused any deflection of the galvanometer-needle.",
    editorialSummary:
      "电流本身未必持续感生另一电流；关键证据出现在接通、断开或磁性状态发生变化的瞬间。",
    englishEditorialSummary:
      "A steady current does not necessarily keep inducing another current; the crucial evidence appears when connection, disconnection, or magnetic condition changes.",
    work: "《电学实验研究》",
    englishWork: "Experimental Researches in Electricity",
    reflection:
      "法拉第通过反复改变线圈、铁环和电路状态，把短暂偏转从偶发现象转化为电磁感应的规律。这里支持的是变化与感应之间的关系，不是任何静态电流都能在邻近回路中维持电流；仪器的瞬态响应也必须纳入解释。",
    englishReflection:
      "By repeatedly varying coils, an iron ring, and circuit states, Faraday turned momentary deflections from accidents into a regularity of electromagnetic induction. The evidence supports a relation between change and induction, not the claim that every steady current maintains a current in a nearby circuit; the instrument's transient response must also be interpreted.",
    question: "你一直测量稳定状态时，会不会漏掉只在变化瞬间显现的因果关系？",
    englishQuestion:
      "By measuring only steady states, might you miss a causal relation visible only during change?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "第一卷，第一系列，第2节第30段；卡片以省略号标示同段删节",
      "Volume I, First Series, §2, paragraph 30; internal omission marked with an ellipsis",
    ],
  },
  {
    id: "science-faraday-electricities",
    authorId: "michael-faraday",
    topic: "方法",
    text: "运动中的电，或电流，其效应可归为：第一，发热；第二，磁；第三，化学分解；第四，生理现象；第五，火花。我的目的，是通过产生这些效应的能力来比较来自不同来源的电，尤其是普通电与伏打电。",
    english:
      "The effects of electricity in motion or electrical currents may be considered as 1st, Evolution of heat; 2nd, Magnetism; 3rd, Chemical decomposition; 4th, Physiological phenomena; 5th, Spark. It will be my object to compare electricities from different sources, and especially common and voltaic electricities, by their power of producing these effects.",
    editorialSummary:
      "比较不同来源的电，不应只比较名称或装置，而要让它们接受同一组磁、热、化学与生理效应检验。",
    englishEditorialSummary:
      "Electricity from different sources should be compared not by names or apparatus alone but by subjecting it to the same magnetic, thermal, chemical, and physiological tests.",
    work: "《电学实验研究》",
    englishWork: "Experimental Researches in Electricity",
    reflection:
      "法拉第用跨装置的效应比较论证摩擦电、伏打电等具有共同性质，把“同一种现象”的判断变成一项实验问题。共同效应支持统一，却不抹去电量、强度、时间尺度和产生机制的差异。",
    englishReflection:
      "Faraday compared effects across apparatus to argue that frictional, voltaic, and other electricity share a common nature, turning 'the same phenomenon' into an experimental question. Common effects support unification without erasing differences in quantity, intensity, timescale, or mode of production.",
    question: "两个被不同名称分开的现象，能否用同一套操作性检验比较？",
    englishQuestion:
      "Can two phenomena separated by different names be compared through the same operational tests?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "第一卷，第三系列，第7节第267段，“不同来源电的同一性”",
      "Volume I, Third Series, §7, paragraph 267, “Identity of Electricities Derived from Different Sources”",
    ],
  },
  {
    id: "science-faraday-magneto-optics",
    authorId: "michael-faraday",
    topic: "证据",
    text: "由此，我认为第一次在光与磁力、电力之间建立了一种真实、直接的关系与依存；并由此为那些倾向于证明一切自然力彼此联结且具有共同起源的事实与思考，增添了一项重要内容。",
    english:
      "Thus is established, I think for the first time, a true, direct relation and dependence between light and the magnetic and electric forces; and thus a great addition made to the facts and considerations which tend to prove that all natural forces are tied together, and have one common origin.",
    editorialSummary:
      "若磁场能系统改变偏振光的传播状态，光与电磁现象之间便出现了可实验追踪的联系。",
    englishEditorialSummary:
      "If a magnetic field systematically changes the state of polarized light in propagation, an experimentally traceable connection emerges between light and electromagnetism.",
    work: "《电学实验研究》",
    englishWork: "Experimental Researches in Electricity",
    reflection:
      "法拉第旋转材料、磁极与光路方向，借可逆的偏振旋转把微弱效应与装置伪差区分开来。这项结果建立联系，却尚未单独证明光就是电磁波；从效应到统一理论还需要麦克斯韦式的数学结构和更多检验。",
    englishReflection:
      "Faraday varied the material, poles, and direction of the light path, using reversible polarization rotation to distinguish a small effect from apparatus error. The result established a connection but did not by itself prove that light is an electromagnetic wave; moving from effect to unified theory required Maxwell's mathematical structure and further tests.",
    question: "面对微弱效应，你能设计哪一种反转操作，让真实信号也随之反转？",
    englishQuestion:
      "For a weak effect, what reversal can you design so that a genuine signal reverses with it?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "第三卷，第十九系列，第26节第iii部分，第2221段，第19—20页",
      "Volume III, Nineteenth Series, §26(iii), paragraph 2221, pp. 19-20",
    ],
  },
  {
    id: "science-faraday-lines-force",
    authorId: "michael-faraday",
    topic: "模型",
    text: "我希望限制“力线”一词的含义，使它只表示力在任一给定位置上的状态——就强度和方向而言；而不把关于现象之物理原因本性的任何观念（目前）包括在内，也不让它受制于或以任何方式依赖于这类观念。",
    english:
      "I desire to restrict the meaning of the term line of force, so that it shall imply no more than the condition of the force in any given place, as to strength and direction; and not to include (at present) any idea of the nature of the physical cause of the phenomena; or be tied up with, or in any way dependent on, such an idea.",
    editorialSummary:
      "磁力线把空间中每一点的方向、强弱与连续关系组织起来，使“远处作用”变成可局部探查的场结构。",
    englishEditorialSummary:
      "Magnetic lines of force organize direction, intensity, and continuity at points in space, turning 'action at a distance' into a field structure open to local investigation.",
    work: "《电学实验研究》",
    englishWork: "Experimental Researches in Electricity",
    reflection:
      "法拉第逐步赋予力线物理意义，使铁屑图样、感应和介质响应进入同一空间描述。力线不是空间里可见的细线或物质绳索，而是以实验关系为依据的表示；它们是否对应更深层实体仍是进一步理论问题。",
    englishReflection:
      "Faraday gradually gave lines of force physical significance, bringing iron-filings patterns, induction, and material response into one spatial account. The lines are not visible threads or material cords in space but a representation grounded in experimental relations; whether they correspond to a deeper entity remains a further theoretical question.",
    question: "你的图示只是方便计算，还是还提出了能够被局部测量检验的结构？",
    englishQuestion:
      "Is your diagram only a computational convenience, or does it propose a structure testable by local measurement?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "第三卷，第二十八系列，第34节第3075段，第330—331页，“论磁力线；其确定性质及其在磁体内与空间中的分布”",
      "Volume III, Twenty-Eighth Series, §34, paragraph 3075, pp. 330-331, “On Lines of Magnetic Force; their Definitive Character; and their Distribution within a Magnet and through Space”",
    ],
  },
  {
    id: "science-maxwell-analogy",
    authorId: "james-clerk-maxwell",
    topic: "模型",
    text: "我所谓物理类比，是指一门科学的定律与另一门科学的定律之间那种局部相似性，它使二者能够相互阐明。",
    english:
      "By a physical analogy I mean that partial similarity between the laws of one science and those of another which makes each of them illustrate the other.",
    editorialSummary:
      "数学类比可以把陌生的场关系转化为可推演形式，但类比成功不等于自然真的由那个机械图景构成。",
    englishEditorialSummary:
      "A mathematical analogy can turn unfamiliar field relations into a tractable form, but success of the analogy does not mean nature is literally made of its mechanical picture.",
    work: "《论法拉第力线》",
    englishWork: "On Faraday's Lines of Force",
    reflection:
      "麦克斯韦明确把不可压缩流体等图景当作表达法拉第关系的数学辅助，而不是已经证实的物理理论。类比的价值在于保留关系并导出可检验结果；一旦把辅助结构全部实体化，模型就可能带入证据没有支持的承诺。",
    englishReflection:
      "Maxwell explicitly used images such as incompressible fluid as mathematical aids for expressing Faraday's relations, not as an already established physical theory. An analogy earns its value by preserving relations and yielding testable results; literalizing every auxiliary structure can add commitments unsupported by evidence.",
    question: "你正在使用模型的关系结构，还是把它便于想象的部分误当成了世界本身？",
    englishQuestion:
      "Are you using a model's relational structure, or mistaking its imaginable features for the world itself?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "导言，《剑桥哲学学会汇刊》第10卷第1部分，第156页，始于“By a physical analogy I mean”的段落",
      "Introduction, Transactions of the Cambridge Philosophical Society, vol. X, part I, p. 156, paragraph beginning “By a physical analogy I mean”",
    ],
  },
  {
    id: "science-maxwell-field-energy",
    authorId: "james-clerk-maxwell",
    topic: "模型",
    text: "依照我们的理论，能量存在于电磁场中，存在于带电体与磁体周围的空间，也存在于这些物体自身之中；它有两种不同形式，可在不作假设的情况下描述为磁极化与电极化，或者按照一种很可能的假设，描述为同一介质的运动与应变。",
    english:
      "On our theory it resides in the electromagnetic field, in the space surrounding the electrified and magnetic bodies, as well as in those bodies themselves, and is in two different forms, which may be described without hypothesis as magnetic polarization and electric polarization, or, according to a very probable hypothesis, as the motion and the strain of one and the same medium.",
    editorialSummary:
      "电磁作用可以被描述为遍布空间的局部状态与能量，而不只是一物体瞬间牵动远处另一物体。",
    englishEditorialSummary:
      "Electromagnetic action can be described through local states and energy distributed in space, rather than only as one body instantaneously pulling another at a distance.",
    work: "《电磁场的动力学理论》",
    englishWork: "A Dynamical Theory of the Electromagnetic Field",
    reflection:
      "场的观点让传播过程和空间中的能量成为理论中心，并把法拉第的局部图景转入数学方程。麦克斯韦当时仍借助机械介质设想来探索这种状态；现代场概念继承了局部结构，却不必接受每一种以太机制。",
    englishReflection:
      "The field viewpoint makes propagation and energy in space central to theory and translates Faraday's local picture into equations. Maxwell still explored that state through mechanical-medium conceptions; the modern field concept inherits the local structure without requiring every ether mechanism.",
    question: "把作用过程放回两者之间的空间，会产生哪些原来不可见的可检验问题？",
    englishQuestion:
      "What newly testable questions appear when the process of interaction is placed back into the space between bodies?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "第三部分，第74节，回答能量“存在于何处”的段落",
      "Part III, §74, paragraph answering where the energy resides",
    ],
  },
  {
    id: "science-maxwell-displacement-current",
    authorId: "james-clerk-maxwell",
    topic: "模型",
    text: "这种位移本身还不构成电流，因为当它达到某个数值后便保持不变；但它是电流的开端，而它的变化会随着位移的增加或减少，构成正向或负向的电流。",
    english:
      "This displacement does not amount to a current, because when it has attained to a certain value it remains constant, but it is the commencement of a current, and its variations constitute currents in the positive or the negative direction according as the displacement is increasing or decreasing.",
    editorialSummary:
      "变化的电位移也必须进入总电流的描述，方程才能在导体与介质之间保持连续。",
    englishEditorialSummary:
      "Changing electric displacement must also enter the account of total current if the equations are to remain continuous across conductors and dielectric media.",
    work: "《电磁场的动力学理论》",
    englishWork: "A Dynamical Theory of the Electromagnetic Field",
    reflection:
      "位移电流把电场的时间变化纳入电磁关系，消除了只计算传导电流时在电容器等情形中的不连续。它不是说绝缘介质中必有电荷像导线电子那样穿过，而是扩展“总电流”这一理论量，并由后续波动结果检验其后果。",
    englishReflection:
      "Displacement current brings time-varying electric fields into electromagnetic relations and removes discontinuity that arises when only conduction current is counted, as in a capacitor. It does not say that charge must cross an insulator as electrons cross a wire; it extends the theoretical quantity of total current, with consequences tested through the resulting wave theory.",
    question: "你的守恒关系出现断裂时，是系统真的不守恒，还是模型漏记了一种变化量？",
    englishQuestion:
      "When a conservation relation breaks, is the system truly nonconserving, or has the model omitted a changing quantity?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "第一部分，第11节，始于“This displacement does not amount to a current”的段落",
      "Part I, §11, paragraph beginning “This displacement does not amount to a current”",
    ],
  },
  {
    id: "science-maxwell-light",
    authorId: "james-clerk-maxwell",
    topic: "宇宙",
    text: "这些结果的一致似乎表明，光与磁是同一种实体的不同状态，而光是依照电磁定律通过场传播的一种电磁扰动。",
    english:
      "The agreement of the results seems to show that light and magnetism are affections of the same substance, and that light is an electromagnetic disturbance propagated through the field according to electromagnetic laws.",
    editorialSummary:
      "若电磁方程允许横向扰动以接近已知光速传播，光便可被理解为同一电磁场的一种波动。",
    englishEditorialSummary:
      "If electromagnetic equations permit transverse disturbances to travel at the measured speed of light, light can be understood as a wave of that same electromagnetic field.",
    work: "《电磁场的动力学理论》",
    englishWork: "A Dynamical Theory of the Electromagnetic Field",
    reflection:
      "麦克斯韦把由电磁测量得到的传播速度与光速相合，转化为光与电磁作用同属一体的理论判断。这是由方程结构和数值一致性支持的统一，并非仅凭速度相近就完成证明；它还要求偏振、传播和后来产生电磁波的实验相互吻合。",
    englishReflection:
      "Maxwell turned the agreement between a speed derived from electromagnetic measurements and the speed of light into a theoretical identification of light with electromagnetic action. The unification rests on equation structure and numerical agreement, not speed similarity alone; it also had to cohere with polarization, propagation, and later experiments producing electromagnetic waves.",
    question: "两个领域共享一个数值常数时，什么额外结构才能把巧合提升为统一理论？",
    englishQuestion:
      "When two domains share a numerical constant, what additional structure can raise coincidence into a unified theory?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "第六部分，第97节，“光的电磁理论”结论段",
      "Part VI, §97, concluding paragraph of “Electromagnetic Theory of Light”",
    ],
  },
  {
    id: "science-maxwell-gas-distribution",
    authorId: "james-clerk-maxwell",
    topic: "不确定",
    text: "如果大量相同的球形粒子在一个完全弹性的容器中运动，粒子之间就会发生碰撞，而且每次碰撞都会改变它们的速度；于是经过一定时间，活力便会按照某种规则在粒子之间分配：尽管每个粒子的速度在每次碰撞时都会改变，速度落在某些界限之间的粒子平均数仍可确定。",
    english:
      "If a great many equal spherical particles were in motion in a perfectly elastic vessel, collisions would take place among the particles, and their velocities would be altered at every collision; so that after a certain time the vis viva will be divided among the particles according to some regular law, the average number of particles whose velocity lies between certain limits being ascertainable, though the velocity of each particle changes at every collision.",
    editorialSummary:
      "气体分子的单次碰撞难以逐一追踪，但大量分子的速度分布仍能呈现稳定而可计算的规律。",
    englishEditorialSummary:
      "Individual molecular collisions may be impossible to track one by one, yet the velocity distribution of many molecules can still exhibit a stable and calculable law.",
    work: "《气体动力学理论的说明》",
    englishWork: "Illustrations of the Dynamical Theory of Gases",
    reflection:
      "麦克斯韦把概率分布引入分子运动，使宏观压力与温度能够同大量微观状态联系起来。分布定律不声称知道每个分子的实际轨迹，也依赖关于碰撞、平衡与分子模型的假设；统计规律因此是另一层次的解释，而非无知的别名。",
    englishReflection:
      "Maxwell introduced a probability distribution for molecular motion, connecting macroscopic pressure and temperature with a multitude of microscopic states. The distribution does not claim knowledge of every molecule's actual path and depends on assumptions about collisions, equilibrium, and molecular models; statistical law is therefore a distinct level of explanation, not another name for ignorance.",
    question: "当个体不可预测时，你是否还能提出关于总体分布且可被检验的问题？",
    englishQuestion:
      "When individuals are unpredictable, can you still ask a testable question about the population distribution?",
    presentationNature: "source-excerpt",
    sourceLocator: [
      "第一部分，命题四之前的引入段，《科学论文集》第1卷第380页",
      "Part I, introductory paragraph immediately before Proposition IV, Scientific Papers, vol. I, p. 380",
    ],
  },
] satisfies readonly ScienceThoughtSeed[];
