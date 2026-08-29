import type { Thought } from "./philosophy";

type CanonAuthorProfile = Pick<
  Thought,
  | "name"
  | "englishName"
  | "life"
  | "englishLife"
  | "school"
  | "englishSchool"
  | "palette"
>;

const canonAuthorProfiles = {
  heraclitus: {
    name: "赫拉克利特",
    englishName: "Heraclitus",
    life: "约前 540—约前 480",
    englishLife: "c. 540-c. 480 BCE",
    school: "前苏格拉底哲学",
    englishSchool: "Presocratic Philosophy",
    palette: ["#e8e0d4", "#c9a66b", "#8d5938", "#2c2622"],
  },
  parmenides: {
    name: "巴门尼德",
    englishName: "Parmenides",
    life: "约前 515—约前 450",
    englishLife: "c. 515-c. 450 BCE",
    school: "爱利亚学派",
    englishSchool: "Eleatic Philosophy",
    palette: ["#ece8dc", "#c8bea5", "#8a8068", "#292924"],
  },
  seneca: {
    name: "塞涅卡",
    englishName: "Seneca",
    life: "约前 4—65",
    englishLife: "c. 4 BCE-65 CE",
    school: "罗马斯多葛主义",
    englishSchool: "Roman Stoicism",
    palette: ["#e8e3d7", "#bcae8d", "#78694f", "#282622"],
  },
  plotinus: {
    name: "普罗提诺",
    englishName: "Plotinus",
    life: "204/205—270",
    englishLife: "204/205-270 CE",
    school: "新柏拉图主义",
    englishSchool: "Neoplatonism",
    palette: ["#e7e2ea", "#b6a9c1", "#766782", "#28242d"],
  },
  avicenna: {
    name: "伊本·西那",
    englishName: "Avicenna (Ibn Sina)",
    life: "980—1037",
    englishLife: "980-1037",
    school: "伊斯兰逍遥学派",
    englishSchool: "Islamic Peripatetic Philosophy",
    palette: ["#e4e8df", "#aebca2", "#6e8064", "#262c25"],
  },
  averroes: {
    name: "伊本·鲁世德",
    englishName: "Averroes (Ibn Rushd)",
    life: "1126—1198",
    englishLife: "1126-1198",
    school: "安达卢西亚亚里士多德主义",
    englishSchool: "Andalusian Aristotelianism",
    palette: ["#e8e0d1", "#c6aa79", "#87663c", "#2e2820"],
  },
  thomas_aquinas: {
    name: "托马斯·阿奎那",
    englishName: "Thomas Aquinas",
    life: "约 1225—1274",
    englishLife: "c. 1225-1274",
    school: "经院哲学",
    englishSchool: "Scholastic Philosophy",
    palette: ["#e5e7e2", "#aab5ad", "#66756b", "#242925"],
  },
  machiavelli: {
    name: "马基雅维利",
    englishName: "Niccolò Machiavelli",
    life: "1469—1527",
    englishLife: "1469-1527",
    school: "文艺复兴政治哲学",
    englishSchool: "Renaissance Political Philosophy",
    palette: ["#e8e3d9", "#b8a483", "#756044", "#29251f"],
  },
  francis_bacon: {
    name: "弗朗西斯·培根",
    englishName: "Francis Bacon",
    life: "1561—1626",
    englishLife: "1561-1626",
    school: "早期现代经验主义",
    englishSchool: "Early Modern Empiricism",
    palette: ["#e3e7e4", "#a6b8af", "#61786d", "#242b27"],
  },
  hobbes: {
    name: "霍布斯",
    englishName: "Thomas Hobbes",
    life: "1588—1679",
    englishLife: "1588-1679",
    school: "社会契约论",
    englishSchool: "Social Contract Theory",
    palette: ["#e5e2dc", "#b6aaa0", "#74665e", "#282421"],
  },
  leibniz: {
    name: "莱布尼茨",
    englishName: "Gottfried Wilhelm Leibniz",
    life: "1646—1716",
    englishLife: "1646-1716",
    school: "大陆理性主义",
    englishSchool: "Continental Rationalism",
    palette: ["#e7e5dc", "#bbb48f", "#77704c", "#28271f"],
  },
  berkeley: {
    name: "贝克莱",
    englishName: "George Berkeley",
    life: "1685—1753",
    englishLife: "1685-1753",
    school: "非物质主义",
    englishSchool: "Immaterialism",
    palette: ["#e2e7e8", "#a7b9bd", "#637a80", "#242a2c"],
  },
} satisfies Record<string, CanonAuthorProfile>;

type CanonAuthorId = keyof typeof canonAuthorProfiles;

type CanonSeed = Pick<
  Thought,
  | "id"
  | "topic"
  | "text"
  | "english"
  | "work"
  | "englishWork"
  | "reflection"
  | "englishReflection"
  | "question"
  | "englishQuestion"
  | "presentationNature"
> &
  Partial<Pick<Thought, "editorialSummary" | "englishEditorialSummary">> & {
    authorId: CanonAuthorId;
    sourceLocator: [string, string];
  };

// Cards default to editorial syntheses. Source-excerpt cards opt in explicitly
// and preserve their former paraphrase as a detail-only editorial summary.
const canonEarlySeeds: CanonSeed[] = [
  {
    id: "heraclitus",
    authorId: "heraclitus",
    topic: "语言",
    text: "所以我们必须遵循共同者；然而，尽管我的“道”是共同的，多数人却活得仿佛各自拥有一套自己的智慧。",
    english:
      "So we must follow the common, yet though my Word is common, the many live as if they had a wisdom of their own.",
    work: "《赫拉克利特残篇》",
    englishWork: "Fragments of Heraclitus",
    editorialSummary:
      "共同的理则向所有人开放，但人往往把自己的见解当成一座私有世界。",
    englishEditorialSummary:
      "The common logos is open to everyone, yet people often inhabit their private opinions as if each were a world of its own.",
    presentationNature: "source-excerpt",
    reflection:
      "思想的私人性并不意味着真理也只属于私人。对话之所以可能，是因为不同经验仍可接受共同理由的检验。",
    englishReflection:
      "Thought may be private without truth being merely private. Dialogue is possible because different experiences can still be tested by reasons held in common.",
    question: "你现在坚持的是可共同检验的理由，还是只属于自己的确信？",
    englishQuestion:
      "Are you defending a reason others can examine, or only a conviction that belongs to you?",
    sourceLocator: [
      "《赫拉克利特残篇》DK 22 B2（John Burnet 1920 年英译本）",
      "Fragments of Heraclitus, DK 22 B2 (John Burnet trans., 1920)",
    ],
  },
  {
    id: "heraclitus-logos",
    authorId: "heraclitus",
    topic: "知识",
    text: "不听我，而听我的“道”，并承认万物为一，这才是智慧。",
    english:
      "It is wise to hearken, not to me, but to my Word, and to confess that all things are one.",
    work: "《赫拉克利特残篇》",
    englishWork: "Fragments of Heraclitus",
    editorialSummary:
      "智慧不在于追随某个说话者，而在于听见贯穿万物的理则，并承认差异之中仍有秩序。",
    englishEditorialSummary:
      "Wisdom lies not in following a speaker, but in attending to the logos through all things and recognizing order within difference.",
    presentationNature: "source-excerpt",
    reflection:
      "权威可以提示我们看什么，却不能替代我们理解为什么。哲学要求把注意力从人格魅力转向论证所揭示的结构。",
    englishReflection:
      "Authority can direct attention, but it cannot replace understanding. Philosophy shifts our focus from the speaker's charisma to the structure disclosed by the argument.",
    question: "若不看是谁说的，你仍会认为这个观点成立吗？",
    englishQuestion:
      "If you did not know who said it, would you still think the claim holds?",
    sourceLocator: [
      "《赫拉克利特残篇》DK 22 B50（John Burnet 1920 年英译本）",
      "Fragments of Heraclitus, DK 22 B50 (John Burnet trans., 1920)",
    ],
  },
  {
    id: "heraclitus-river",
    authorId: "heraclitus",
    topic: "存在",
    text: "你无法两次踏入同一条河流；因为清新的水不断向你流来。",
    english:
      "You cannot step twice into the same rivers; for fresh waters are ever flowing in upon you.",
    work: "《赫拉克利特残篇》",
    englishWork: "Fragments of Heraclitus",
    editorialSummary:
      "步入看似同一条河时，新的水不断流来；持续与变化并不是彼此隔绝的经验。",
    englishEditorialSummary:
      "As we step into what appears to be the same river, fresh waters keep arriving; continuity and change are not isolated experiences.",
    presentationNature: "source-excerpt",
    reflection:
      "身份未必是一块静止的内核。一个人、一段关系或一种制度，也可能凭借有组织的更新保持自身。",
    englishReflection:
      "Identity need not be a motionless core. A person, a relationship, or an institution may preserve itself through organized renewal.",
    question: "你想守住的东西，是否反而需要通过改变才能延续？",
    englishQuestion: "Might what you want to preserve endure only by changing?",
    sourceLocator: [
      "《赫拉克利特残篇》DK 22 B12（John Burnet 1920 年英译本）",
      "Fragments of Heraclitus, DK 22 B12 (John Burnet trans., 1920)",
    ],
  },
  {
    id: "heraclitus-conflict",
    authorId: "heraclitus",
    topic: "存在",
    text: "战争是万物之父、万物之王；它使一些成为神，使另一些成为人，使一些成为奴隶，使另一些成为自由人。……我们必须知道，战争为一切所共有，争斗即正义，万物都通过争斗而生成和消逝。",
    english:
      "War is the father of all and the king of all; and some he has made gods and some men, some bond and some free. ... We must know that war is common to all and strife is justice, and that all things come into being and pass away through strife.",
    work: "《赫拉克利特残篇》",
    englishWork: "Fragments of Heraclitus",
    editorialSummary:
      "冲突不只是秩序的失败；它也会划出差异、重排力量，并使暂时的秩序显现。",
    englishEditorialSummary:
      "Conflict is not merely the failure of order; it draws distinctions, rearranges forces, and brings provisional orders into view.",
    presentationNature: "source-excerpt",
    reflection:
      "承认冲突具有生成性，不等于赞美暴力。它提醒我们，表面的和谐可能掩盖尚未被表达的张力。",
    englishReflection:
      "To acknowledge the generative role of conflict is not to praise violence. It is to notice that apparent harmony may conceal tensions not yet expressed.",
    question: "你面对的分歧是在破坏共同体，还是在迫使它说出被压住的问题？",
    englishQuestion:
      "Is the disagreement before you destroying a community, or forcing it to name a suppressed problem?",
    sourceLocator: [
      "《赫拉克利特残篇》DK 22 B53、B80（节录，中间有省略；John Burnet 1920 年英译本）",
      "Fragments of Heraclitus, DK 22 B53 and B80 (excerpt with an internal omission; John Burnet trans., 1920)",
    ],
  },
  {
    id: "heraclitus-character",
    authorId: "heraclitus",
    topic: "伦理",
    text: "人的性情就是他的命运。",
    english:
      "Man's character is his fate.",
    work: "《赫拉克利特残篇》",
    englishWork: "Fragments of Heraclitus",
    editorialSummary:
      "人的命运并非只从外部降临；长期形成的性情也在不断选择我们会走向哪里。",
    englishEditorialSummary:
      "A person's fate does not arrive only from outside; a character formed over time keeps selecting the paths that person is likely to take.",
    presentationNature: "source-excerpt",
    reflection:
      "习惯把偶然的决定连接成可预见的轨迹。改变命运的一部分工作，因此是改变日常反应的方式。",
    englishReflection:
      "Habit links isolated decisions into a predictable trajectory. Part of changing one's fate is therefore changing one's ordinary patterns of response.",
    question: "你的哪一种性情，正在替未来的你作决定？",
    englishQuestion:
      "Which feature of your character is making decisions for your future self?",
    sourceLocator: [
      "《赫拉克利特残篇》DK 22 B119（John Burnet 1920 年英译本）",
      "Fragments of Heraclitus, DK 22 B119 (John Burnet trans., 1920)",
    ],
  },
  {
    id: "parmenides",
    authorId: "parmenides",
    topic: "知识",
    text: "现在来吧，我会告诉你——而你要听取我的话并把它带走——能够被思考的探究之路只有两条。第一条是：它存在，并且它不可能不存在；这是信念之路，因为真理与它相伴。另一条是：它不存在，并且必然不存在；我告诉你，那是一条无人能够学会的道路。",
    english:
      "Come now, I will tell thee—and do thou hearken to my saying and carry it away—the only two ways of search that can be thought of. The first, namely, that It is, and that it is impossible for it not to be, is the way of belief, for truth is its companion. The other, namely, that It is not, and that it must needs not be,—that, I tell thee, is a path that none can learn of at all.",
    work: "《论自然》",
    englishWork: "On Nature",
    editorialSummary:
      "探究一开始就要分清两条路：追问存在者如何存在，或试图把不存在者当成可以认识的对象。",
    englishEditorialSummary:
      "Inquiry begins by distinguishing two paths: asking how what-is is, or trying to treat what-is-not as an object of knowledge.",
    presentationNature: "source-excerpt",
    reflection:
      "一个问题是否可想、可说，取决于它有没有稳定的对象。好的思考也包括识别那些由空洞语词制造出来的假问题。",
    englishReflection:
      "Whether a question can be thought or stated depends on whether it has a stable object. Good inquiry also detects pseudo-problems manufactured by empty words.",
    question: "你正在追问的事，是否真的指向某个可被说明的对象？",
    englishQuestion:
      "Does the question you are pursuing actually point to something that can be articulated?",
    sourceLocator: [
      "巴门尼德《论自然》残篇 DK 28 B2（John Burnet 1920 年英译本）",
      "Parmenides, On Nature, fragment DK 28 B2 (John Burnet trans., 1920)",
    ],
  },
  {
    id: "parmenides-thinking-being",
    authorId: "parmenides",
    topic: "存在",
    text: "因为能够被思考的，与能够存在的，是同一件事。",
    english:
      "For it is the same thing that can be thought and that can be.",
    work: "《论自然》",
    englishWork: "On Nature",
    editorialSummary:
      "思想若要成为思想，就必须关涉某种存在；完全的无不能作为一个普通对象被把握。",
    englishEditorialSummary:
      "For thought to be thought, it must be about something that is; sheer nothing cannot be grasped as an ordinary object.",
    presentationNature: "source-excerpt",
    reflection:
      "这不是把想象等同现实，而是指出：即便谈虚构或否定，我们也依靠某种可辨认的内容来思考。",
    englishReflection:
      "This does not equate imagination with reality. It observes that even fiction and negation require some identifiable content for thought to engage.",
    question: "当你说某物不存在时，你究竟在否定什么？",
    englishQuestion:
      "When you say that something does not exist, what exactly are you denying?",
    sourceLocator: [
      "巴门尼德《论自然》残篇 DK 28 B3（John Burnet 1920 年英译本）",
      "Parmenides, On Nature, fragment DK 28 B3 (John Burnet trans., 1920)",
    ],
  },
  {
    id: "parmenides-sayable",
    authorId: "parmenides",
    topic: "语言",
    text: "能够被说出和被思考的东西，必定存在；因为它能够存在，而虚无不可能存在。",
    english:
      "It needs must be that what can be spoken and thought is; for it is possible for it to be, and it is not possible for what is nothing to be.",
    work: "《论自然》",
    englishWork: "On Nature",
    editorialSummary:
      "能够被严肃思考和说出的东西，必须在某种意义上是；言说不能凭空给虚无安上对象。",
    englishEditorialSummary:
      "What can be seriously thought and said must in some sense be; speech cannot conjure an object for sheer nothingness.",
    presentationNature: "source-excerpt",
    reflection:
      "语言可以组合出不存在的故事，却仍须借助已有的意义材料。语法上的主语，不自动保证现实中有对应实体。",
    englishReflection:
      "Language can compose stories about what is absent, but it still works with available materials of meaning. A grammatical subject does not guarantee a corresponding entity in reality.",
    question: "哪个看似有对象的词，可能只因语法而让你误以为它真实存在？",
    englishQuestion:
      "Which apparently referential word may owe its seeming reality only to grammar?",
    sourceLocator: [
      "巴门尼德《论自然》残篇 DK 28 B6.1—2（John Burnet 1920 年英译本）",
      "Parmenides, On Nature, fragment DK 28 B6.1–2 (John Burnet trans., 1920)",
    ],
  },
  {
    id: "parmenides-unchanging",
    authorId: "parmenides",
    topic: "存在",
    text: "只剩下一条可被言说的道路，那就是：它存在。这条路上有许多标志，表明存在者既非生成，也不可毁灭；它完整、不动，也没有终点。它从未在过去，也不会在未来；因为它现在整个地、同时地存在，是连续的一。",
    english:
      "One path only is left for us to speak of, namely, that It is. In this path are very many tokens that what is is uncreated and indestructible; for it is complete, immovable, and without end. Nor was it ever, nor will it be; for now it is, all at once, a continuous one.",
    work: "《论自然》",
    englishWork: "On Nature",
    editorialSummary:
      "如果存在者从不存在中生成，或最终坠入不存在，那么解释本身就失去了可以立足的对象。",
    englishEditorialSummary:
      "If what-is arose from what-is-not or finally collapsed into it, explanation would lose the very object on which it stands.",
    presentationNature: "source-excerpt",
    reflection:
      "巴门尼德把日常变化逼到逻辑极限：变化究竟是存在本身消失，还是同一现实以不同方式呈现？",
    englishReflection:
      "Parmenides pushes everyday change to a logical limit: does change mean being itself disappears, or that one reality appears in different ways?",
    question: "你说某物彻底改变时，仍有什么让你称它为同一个东西？",
    englishQuestion:
      "When you say something has changed completely, what still lets you call it the same thing?",
    sourceLocator: [
      "巴门尼德《论自然》残篇 DK 28 B8.1—6（John Burnet 1920 年英译本）",
      "Parmenides, On Nature, fragment DK 28 B8.1–6 (John Burnet trans., 1920)",
    ],
  },
  {
    id: "seneca",
    authorId: "seneca",
    topic: "伦理",
    text: "继续这样做吧，我亲爱的鲁基里乌斯——为了你自己而解放自己；把你的时间收拢并保存起来，它直到最近还被强行夺走、被偷走，或只是从你手中滑落。",
    english:
      "Continue to act thus, my dear Lucilius—set yourself free for your own sake; gather and save your time, which till lately has been forced from you, or filched away, or has merely slipped from your hands.",
    work: "《致鲁基里乌斯道德书信》",
    englishWork: "Moral Letters to Lucilius",
    editorialSummary:
      "我们会仔细保管财物，却任由时间被索取、打断和浪费，仿佛它不是最不可追回的所有物。",
    englishEditorialSummary:
      "We guard possessions carefully yet let time be claimed, interrupted, and wasted, as though it were not the one possession that cannot be recovered.",
    presentationNature: "source-excerpt",
    reflection:
      "珍惜时间不是把每分钟变成产出，而是决定哪些事真正值得占据有限生命。拒绝也是一种时间伦理。",
    englishReflection:
      "Valuing time does not mean turning every minute into output. It means deciding what deserves a place in a finite life; refusal is also an ethics of time.",
    question: "今天是谁或什么，在未经你决定的情况下使用了你的时间？",
    englishQuestion:
      "Who or what used your time today without your considered consent?",
    sourceLocator: [
      "塞涅卡《致鲁基里乌斯道德书信》第 1 封，第 1 节（Richard M. Gummere 英译本）",
      "Seneca, Moral Letters to Lucilius, Letter 1, §1 (Richard M. Gummere trans.)",
    ],
  },
  {
    id: "seneca-anticipation",
    authorId: "seneca",
    topic: "伦理",
    text: "鲁基里乌斯，更可能使我们害怕的事，多于真正能击垮我们的事；我们在想象中受苦，往往多于在现实中。……有些事对我们的折磨超过应有程度，有些在应有时刻之前折磨我们，还有些根本不该折磨我们。",
    english:
      "There are more things, Lucilius, likely to frighten us than there are to crush us; we suffer more often in imagination than in reality. ... Some things torment us more than they ought; some torment us before they ought; and some torment us when they ought not to torment us at all.",
    work: "《致鲁基里乌斯道德书信》",
    englishWork: "Moral Letters to Lucilius",
    editorialSummary:
      "许多痛苦在事情发生前就由想象提前支付，而且最后所怕的事未必到来。",
    englishEditorialSummary:
      "Much suffering is paid in advance by imagination, and the event we fear may never arrive.",
    presentationNature: "source-excerpt",
    reflection:
      "预见风险有助于行动，反复预演灾难却可能只是在消耗行动能力。关键是把可准备的部分与不可控制的部分分开。",
    englishReflection:
      "Anticipating risk can guide action, while endlessly rehearsing disaster may only drain the capacity to act. The task is to separate what can be prepared for from what cannot be controlled.",
    question: "你的担忧正在生成一个行动方案，还是只在重复最坏的画面？",
    englishQuestion:
      "Is your worry producing a plan of action, or merely replaying the worst image?",
    sourceLocator: [
      "塞涅卡《致鲁基里乌斯道德书信》第 13 封，第 4—5 节（节录，中间有省略；Richard M. Gummere 英译本）",
      "Seneca, Moral Letters to Lucilius, Letter 13, §§4–5 (excerpt with an internal omission; Richard M. Gummere trans.)",
    ],
  },
  {
    id: "seneca-anger",
    authorId: "seneca",
    topic: "伦理",
    text: "理性给双方申辩的时间；而且她自己也要求延期，以便有足够余地发现真相；愤怒却急不可耐：理性希望作出公正的判决，愤怒只希望自己的判决被认为公正。",
    english:
      "Reason gives each side time to plead; moreover, she herself demands adjournment, that she may have sufficient scope for the discovery of the truth; whereas anger is in a hurry: reason wishes to give a just decision; anger wishes its decision to be thought just.",
    work: "《论愤怒》",
    englishWork: "On Anger",
    editorialSummary:
      "愤怒声称自己在执行正义，却很容易超过判断所划定的边界，并把惩罚变成报复。",
    englishEditorialSummary:
      "Anger claims to carry out justice, yet readily crosses the limits set by judgment and turns correction into revenge.",
    presentationNature: "source-excerpt",
    reflection:
      "不被愤怒统治并非对不义无动于衷。恰恰是为了让回应与目标相称，而不复制自己反对的伤害。",
    englishReflection:
      "Refusing the rule of anger is not indifference to injustice. It preserves a response proportionate to its aim without reproducing the harm it opposes.",
    question: "如果拿走愤怒的快感，你仍会选择同样的回应吗？",
    englishQuestion:
      "If the satisfaction of anger were removed, would you still choose the same response?",
    sourceLocator: [
      "塞涅卡《论愤怒》第一卷第 18 节（Aubrey Stewart 英译本）",
      "Seneca, On Anger, Book I, §18 (Aubrey Stewart trans.)",
    ],
  },
  {
    id: "seneca-slavery",
    authorId: "seneca",
    topic: "政治",
    text: "请记住：那个被你称为奴隶的人与你出自同一种族，同一片天空向他微笑；他与你平等地呼吸、生活，也同样死去。",
    english:
      "Kindly remember that he whom you call your slave sprang from the same stock, is smiled upon by the same skies, and on equal terms with yourself breathes, lives, and dies.",
    work: "《致鲁基里乌斯道德书信》",
    englishWork: "Moral Letters to Lucilius",
    editorialSummary:
      "社会身份可以把人称为奴隶，却不能取消彼此共有的人性、脆弱和成为朋友的可能。",
    englishEditorialSummary:
      "Social status may name someone a slave, but it cannot erase shared humanity, vulnerability, or the possibility of friendship.",
    presentationNature: "source-excerpt",
    reflection:
      "等级制度最深的诱惑，是让特权者把制度角色误认成自然差异。共同的人性要求我们重新审视日常的支配关系。",
    englishReflection:
      "The deepest temptation of hierarchy is to make the privileged mistake institutional roles for natural differences. Shared humanity asks us to reexamine ordinary relations of domination.",
    question: "你是否在用一个人的角色、职业或地位替代对这个人的认识？",
    englishQuestion:
      "Are you substituting a person's role, occupation, or status for knowledge of the person?",
    sourceLocator: [
      "塞涅卡《致鲁基里乌斯道德书信》第 47 封，第 10 节（Richard M. Gummere 英译本）",
      "Seneca, Moral Letters to Lucilius, Letter 47, §10 (Richard M. Gummere trans.)",
    ],
  },
  {
    id: "seneca-friendship",
    authorId: "seneca",
    topic: "伦理",
    text: "那么，我为了什么使一个人成为我的朋友？为了有一个我愿为之赴死的人，一个我愿追随他流亡的人，一个我愿以自己的生命抵押来对抗他的死亡、并真正偿付这份承诺的人。你所描绘的那种友谊是一笔交易，而不是友谊；它只考虑便利，只看结果。",
    english:
      "For what purpose, then, do I make a man my friend? In order to have someone for whom I may die, whom I may follow into exile, against whose death I may stake my own life, and pay the pledge, too. The friendship which you portray is a bargain and not a friendship; it regards convenience only, and looks to the results.",
    work: "《致鲁基里乌斯道德书信》",
    englishWork: "Moral Letters to Lucilius",
    editorialSummary:
      "友谊不是在需要帮助时才建立的交易；它的价值正在于愿意为另一个人付出。",
    englishEditorialSummary:
      "Friendship is not a transaction formed only when help is needed; its value lies in the willingness to act for another person.",
    presentationNature: "source-excerpt",
    reflection:
      "把朋友当作备用资源，会让信任受制于收益计算。真正的互助往往来自先承认关系本身值得维护。",
    englishReflection:
      "Treating friends as reserve resources subjects trust to calculations of gain. Genuine mutual aid often begins by recognizing that the relationship itself is worth sustaining.",
    question: "你最近一次联系朋友，是因为需要什么，还是因为珍视这个人？",
    englishQuestion:
      "The last time you contacted a friend, was it because you needed something or because you valued the person?",
    sourceLocator: [
      "塞涅卡《致鲁基里乌斯道德书信》第 9 封，第 10 节（Richard M. Gummere 英译本）",
      "Seneca, Moral Letters to Lucilius, Letter 9, §10 (Richard M. Gummere trans.)",
    ],
  },
  {
    id: "plotinus",
    authorId: "plotinus",
    topic: "伦理",
    text: "转向你自己，并且观看。如果你发现自己还不美，就像一位要把雕像塑得美的创作者那样行动：他在这里削去，在那里磨平，使这一条线更轻盈，使另一条线更纯净，直到一张可爱的脸庞在他的作品上显现。",
    english:
      "Withdraw into yourself and look. And if you do not find yourself beautiful yet, act as does the creator of a statue that is to be made beautiful: he cuts away here, he smoothes there, he makes this line lighter, this other purer, until a lovely face has grown upon his work.",
    work: "《九章集》",
    englishWork: "Enneads",
    editorialSummary:
      "寻找美并不止于凝视外物；人还要转向自身，削去使灵魂失序的部分，让观看者也变得配得上美。",
    englishEditorialSummary:
      "The search for beauty does not end in contemplating external things; one must turn inward and remove what disorders the soul, making the beholder worthy of beauty.",
    presentationNature: "source-excerpt",
    reflection:
      "审美在这里也是自我塑造。我们看见什么、被什么打动，与我们已经成为怎样的人彼此关联。",
    englishReflection:
      "Aesthetic experience here is also self-formation. What we see and what moves us are bound up with the kind of person we have become.",
    question: "你想看见的美，要求你先改变自己身上的什么？",
    englishQuestion:
      "What in yourself must change before you can see the beauty you seek?",
    sourceLocator: [
      "普罗提诺《九章集》I.6.9（Stephen MacKenna 1917 年英译本）",
      "Plotinus, Enneads I.6.9 (Stephen MacKenna trans., 1917)",
    ],
  },
  {
    id: "plotinus-virtue",
    authorId: "plotinus",
    topic: "伦理",
    text: "我们在上文谈到的公民美德，是我们在此世生活时内在的一种秩序与美：它们为我们的欲望和全部感受能力设定界限与尺度，并驱散错误的判断……",
    english:
      "The Civic Virtues, on which we have touched above, are a principle or order and beauty in us as long as we remain passing our life here: they ennoble us by setting bound and measure to our desires and to our entire sensibility, and dispelling false judgement ...",
    work: "《九章集》",
    englishWork: "Enneads",
    editorialSummary:
      "美德有不同层次：它先调节人在共同生活中的行动，又进一步使灵魂摆脱被激情牵引的混乱。",
    englishEditorialSummary:
      "Virtue has levels: it first orders action in shared life, then further frees the soul from being dragged into disorder by its passions.",
    presentationNature: "source-excerpt",
    reflection:
      "守规则与成为好的人并不完全相同。外在秩序可以是起点，但稳定的品格还需要理解并重整欲望。",
    englishReflection:
      "Following rules and becoming good are not identical. External order may be a beginning, but stable character also requires understanding and reorganizing desire.",
    question: "你遵守的规范，已经改变了你的欲望，还是只约束了你的行为？",
    englishQuestion:
      "Have the norms you follow changed your desires, or only restrained your behavior?",
    sourceLocator: [
      "普罗提诺《九章集》I.2.2（Stephen MacKenna 1917 年英译本）；卡片末尾以省略号标示截断",
      "Plotinus, Enneads I.2.2 (Stephen MacKenna trans., 1917); terminal omission marked with an ellipsis",
    ],
  },
  {
    id: "plotinus-hypostases",
    authorId: "plotinus",
    topic: "存在",
    text: "有一个超越存在的本原；这就是‘一者’……紧随一者之后的，是同时为存在与理智的本原。第三个本原则是灵魂。",
    english:
      "There exists a Principle which transcends Being; this is The One ... Upon The One follows immediately the Principle which is at once Being and the Intellectual-Principle. Third comes the Principle, Soul.",
    work: "《九章集》",
    englishWork: "Enneads",
    editorialSummary:
      "现实并非彼此断裂的物堆：灵魂、理智与最高的一者呈现出由多返一、由一生多的层级。",
    englishEditorialSummary:
      "Reality is not a heap of disconnected things: Soul, Intellect, and the One form an order in which multiplicity returns to unity and proceeds from it.",
    presentationNature: "source-excerpt",
    reflection:
      "层级在这里不是社会等级，而是解释依赖：较复杂的现实要问自己从何取得统一和可理解性。",
    englishReflection:
      "Hierarchy here is not social rank but explanatory dependence: more complex realities must account for the unity and intelligibility they possess.",
    question: "你面对的复杂事物，靠什么仍能成为一个整体？",
    englishQuestion:
      "What allows the complex thing before you to remain one whole?",
    sourceLocator: [
      "普罗提诺《九章集》V.1.10（Stephen MacKenna 与 B. S. Page 英译本）；卡片以省略号标示中间删节",
      "Plotinus, Enneads V.1.10 (Stephen MacKenna and B. S. Page trans.); internal omission marked with an ellipsis",
    ],
  },
  {
    id: "plotinus-intellect",
    authorId: "plotinus",
    topic: "知识",
    text: "作为一种活动——而且其存在本身就是活动——它必定与自身的活动不可区分地同一；而存在与理智对象也同那一活动相同。因此，理智、理智的思维活动以及思维对象，全都是同一的。",
    english:
      "As an act- and one whose very being is an act- it must be undistinguishably identical with its act: but Being and the Intellectual object are also identical with that act; therefore the Intellectual-Principle, its exercise of intellection and the object of intellection all are identical.",
    work: "《九章集》",
    englishWork: "Enneads",
    editorialSummary:
      "最高的理解不是主体隔着距离观看对象，而是理解者与被理解者在理智活动中彼此贯通。",
    englishEditorialSummary:
      "The highest understanding is not a subject observing an object across a gap, but a unity of knower and known within intellectual activity.",
    presentationNature: "source-excerpt",
    reflection:
      "有些知识来自外部记录，有些则只有在能力被实际运用时才成立；会证明与收藏一个结论不是同一种拥有。",
    englishReflection:
      "Some knowledge comes from external records; some exists only in the exercise of a capacity. Being able to prove a conclusion is not the same as storing it.",
    question: "你只是记住了这个观点，还是已经能够从自身理解中重新抵达它？",
    englishQuestion:
      "Have you merely retained this claim, or can you reach it again through your own understanding?",
    sourceLocator: [
      "普罗提诺《九章集》V.3.5（Stephen MacKenna 与 B. S. Page 英译本）",
      "Plotinus, Enneads V.3.5 (Stephen MacKenna and B. S. Page trans.)",
    ],
  },
  {
    id: "plotinus-one",
    authorId: "plotinus",
    topic: "语言",
    text: "一者生成万有，却不属于万有中的任何一物；它既不是事物，也不是数量或性质，不是理智或灵魂；既不运动，也不静止；不在地点中，也不在时间中。它自我规定、形态独一——或者更确切说，无形无相——先于形态、运动与静止而存在；这些都只是‘存在’的附属，使‘存在’成为多。",
    english:
      "Generative of all, The Unity is none of all; neither thing nor quantity nor quality nor intellect nor soul; not in motion, not at rest, not in place, not in time: it is the self-defined, unique in form or, better, formless, existing before Form was, or Movement or Rest, all of which are attachments of Being and make Being the manifold it is.",
    work: "《九章集》",
    englishWork: "Enneads",
    editorialSummary:
      "一切规定都通过差异来说明对象，而最高的一者先于这些差异，因此语言只能从它所产生的结果反向指引。",
    englishEditorialSummary:
      "Every determination explains through difference, while the One precedes such differences; language can therefore point back to it only from its effects.",
    presentationNature: "source-excerpt",
    reflection:
      "承认语言的边界不是放弃思考。否定性的表达可以清除不恰当的想象，让我们知道某个概念不能怎样被使用。",
    englishReflection:
      "Acknowledging the limits of language is not abandoning thought. Negative expression can clear away misleading images and show how a concept must not be used.",
    question: "当一个对象超出直接描述时，你能否通过排除错误说法接近它？",
    englishQuestion:
      "When something exceeds direct description, can you approach it by ruling out mistaken ways of speaking?",
    sourceLocator: [
      "普罗提诺《九章集》VI.9.3（Stephen MacKenna 英译）",
      "Plotinus, Enneads VI.9.3 (Stephen MacKenna trans.)",
    ],
  },
  {
    id: "avicenna",
    authorId: "avicenna",
    topic: "存在",
    text: "因此，这门科学的首要主题是存在者，就其为存在者而言；",
    english:
      "The primary subject matter of this science is, hence, the existent inasmuch as it is an existent;",
    editorialSummary:
      "形而上学研究的不是某一种特殊存在者，而是存在者之为存在者，以及附随于存在本身的规定。",
    englishEditorialSummary:
      "Metaphysics studies no single special class of beings, but being insofar as it is being and the features that belong to being as such.",
    work: "《治愈之书·形而上学》",
    englishWork: "The Healing: Metaphysics",
    presentationNature: "source-excerpt",
    reflection:
      "每门具体学科都预设自己的对象存在，却未必追问存在意味着什么。形而上学从这些被默认的起点继续向后追问。",
    englishReflection:
      "Each special science assumes that its objects exist without necessarily asking what existence means. Metaphysics continues the inquiry behind those assumed beginnings.",
    question: "你当前的解释依赖了哪个从未被说明的基本前提？",
    englishQuestion:
      "Which basic premise does your present explanation rely on without ever explaining it?",
    sourceLocator: [
      "伊本·西那《治愈之书·形而上学》第一卷第二章，第 12 段；Michael E. Marmura 2005 年英译，英文印刷页 10；连续句首分句，截至原分号",
      "Avicenna, The Metaphysics of The Healing, Book I, Chapter 2, ¶12; Michael E. Marmura trans. (2005), English print p. 10; continuous opening clause ending at the original semicolon",
    ],
  },
  {
    id: "avicenna-primary-notions",
    authorId: "avicenna",
    topic: "知识",
    text: "后来，在生命进程中，我们发现其中已有自明的、公理性的心智概念，无须学习，也无须反思。",
    english:
      "Then, later on in life, we find in it self-evident axiomatic mentally-grasped notions, without effort of learning and without reflection.",
    editorialSummary: "有些初始认识并非由进一步定义或推理获得；它们作为自明起点，使后续学习与论证得以展开。",
    englishEditorialSummary:
      "Some primary notions are not acquired through further definition or inference; as self-evident starting points, they make later learning and demonstration possible.",
    work: "《灵魂纲要》",
    englishWork: "A Compendium on the Soul",
    presentationNature: "source-excerpt",
    reflection:
      "这段把自明公理与刻意学习、反思和单纯经验归纳区分开。它讨论的是推理如何获得无需再证明的起点，并不等于所有先入判断都可靠。",
    englishReflection:
      "The passage distinguishes self-evident axioms from deliberate learning, reflection, and mere empirical induction. It asks how reasoning acquires starting points that require no further proof; it does not imply that every prior assumption is reliable.",
    question: "哪一种推理起点不能由后续步骤证明，却又必须接受公开检验？",
    englishQuestion:
      "Which starting point cannot be proved by the later steps of an argument, yet must still remain open to scrutiny?",
    sourceLocator: [
      "伊本·西那《灵魂纲要》第十节；Edward Abbott van Dyck 1906年公版英译，印刷页89，完整连续句",
      "Avicenna, A Compendium on the Soul, Section X; Edward Abbott van Dyck public-domain translation (1906), print p. 89, complete continuous sentence",
    ],
  },
  {
    id: "avicenna-necessary-possible",
    authorId: "avicenna",
    topic: "存在",
    text: "可能存在者从自身看既可存在也可不存在；若它实际存在，就需要另一个原因使可能性得到实现。",
    english:
      "Considered in itself, a possible existent may either be or not be; if it actually exists, another cause is required to actualize that possibility.",
    work: "《治愈之书·形而上学》",
    englishWork: "The Healing: Metaphysics",
    reflection:
      "区分可能与必然，是在区分一件事的定义和它实际发生的理由。描述某物是什么，不总能说明它为什么存在。",
    englishReflection:
      "Distinguishing possibility from necessity separates what a thing is from the reason it actually occurs. Describing something does not always explain why it exists.",
    question: "你已经说明了事情如何可能，但是否说明了它为何真的发生？",
    englishQuestion:
      "Have you shown only how something is possible, or also why it actually occurred?",
    sourceLocator: [
      "伊本·西那《治愈之书·形而上学》I.6",
      "Avicenna, The Healing, Metaphysics I.6",
    ],
  },
  {
    id: "avicenna-first-cause",
    authorId: "avicenna",
    topic: "存在",
    text: "一组本身都只是可能的原因，不能仅凭彼此依赖解释整体为何存在；解释最终指向不借他物而必然者。",
    english:
      "A set of causes that are each merely possible cannot explain its own existence by mutual dependence alone; explanation ultimately points to what is necessary through itself.",
    work: "《治愈之书·形而上学》",
    englishWork: "The Healing: Metaphysics",
    reflection:
      "把问题沿因果链后移，不等于已经解释。伊本·西那追问的是整条依赖关系为何能够成立，而不只是上一环是什么。",
    englishReflection:
      "Moving a question backward along a causal chain is not yet an explanation. Avicenna asks why the whole relation of dependence can hold, not merely what the previous link was.",
    question: "你的回答是在解释依赖关系，还是只把问题交给了更早的一环？",
    englishQuestion:
      "Does your answer explain the relation of dependence, or merely hand the question to an earlier link?",
    sourceLocator: [
      "伊本·西那《治愈之书·形而上学》VIII.1–3",
      "Avicenna, The Healing, Metaphysics VIII.1-3",
    ],
  },
  {
    id: "avicenna-floating-person",
    authorId: "avicenna",
    topic: "知识",
    text: "即使一个人被设想为隔绝一切感官接触，他仍可能意识到自己的存在，而不必先意识到身体部位。",
    english:
      "Even if a person is imagined without any sensory contact, that person may still be aware of existing without first being aware of bodily parts.",
    work: "《治愈之书·论灵魂》",
    englishWork: "The Healing: Psychology",
    reflection:
      "这个思想实验不是证明人能脱离身体生活，而是分离两种认识：直接的自我觉知与通过感官获得的身体表象。",
    englishReflection:
      "The thought experiment does not prove that humans can live without bodies. It distinguishes immediate self-awareness from the bodily representations acquired through sensation.",
    question: "当外在身份和身体感受暂时退后，你所说的‘我’还剩下什么？",
    englishQuestion:
      "When external identities and bodily sensations recede, what remains of what you call the self?",
    sourceLocator: [
      "伊本·西那《治愈之书·论灵魂》I.1",
      "Avicenna, The Healing, Psychology I.1",
    ],
  },
  {
    id: "averroes",
    authorId: "averroes",
    topic: "知识",
    text: "律法鼓励并劝勉我们考察受造界。",
    english:
      "The Law encourages and exhorts us to observe creation.",
    editorialSummary: "若宗教律法要求人考察受造物以认识其原因，那么具备能力者从事哲学论证便可成为一种义务。",
    englishEditorialSummary:
      "If revealed law commands reflection on created things in order to know their cause, philosophical demonstration can become a duty for those capable of it.",
    work: "《决断论》",
    englishWork: "The Decisive Treatise",
    presentationNature: "source-excerpt",
    reflection:
      "伊本·鲁世德没有把理性探究放在信仰之外，而是从信仰内部为严谨推理寻找位置。知识实践也要考虑能力与责任。",
    englishReflection:
      "Averroes does not place rational inquiry outside faith; he finds a place for rigorous reasoning within it. Intellectual practice also carries questions of capacity and responsibility.",
    question: "如果一种传统要求理解世界，它是否也必须容纳会修正旧解释的方法？",
    englishQuestion:
      "If a tradition requires understanding the world, must it also accommodate methods that can revise inherited interpretations?",
    sourceLocator: [
      "Mohammad Jamil-ur-Rehman 1921年公版英译《伊本·鲁世德的哲学与神学》，第一部分，第14页，连续句",
      "Mohammad Jamil-ur-Rehman public-domain translation (1921), The Philosophy and Theology of Averroes, Part I, p. 14, continuous sentence",
    ],
  },
  {
    id: "averroes-truth",
    authorId: "averroes",
    topic: "知识",
    text: "既然这部律法是真实的，并引向对上帝知识的考察，我们穆斯林就应相信，理性探究并不违背律法；因为真理不可能与真理相矛盾，而会证实真理并为之作证。",
    english:
      "As this Law is true and leads to the consideration of the knowledge of God, we Muslims should believe that rational investigation is not contrary to Law, for truth cannot contradict truth, but verifies it and bears testimony to it.",
    editorialSummary: "可靠论证所得的真理与启示所指向的真理不可能真正冲突，因为真理不会与真理相反。",
    englishEditorialSummary:
      "Truth reached by sound demonstration cannot genuinely conflict with truth indicated by revelation, because truth does not oppose truth.",
    work: "《决断论》",
    englishWork: "The Decisive Treatise",
    presentationNature: "source-excerpt",
    reflection:
      "表面冲突并不必然要求牺牲理性或文本，也可能提示我们的论证有误，或文本被放在了不恰当的解释层次。",
    englishReflection:
      "An apparent conflict need not require sacrificing either reason or text. It may show that the argument is unsound or that the text has been read at the wrong interpretive level.",
    question: "当两种确信冲突时，你先检查结论，还是检查抵达结论的方法？",
    englishQuestion:
      "When two convictions conflict, do you first inspect the conclusions or the methods that produced them?",
    sourceLocator: [
      "Mohammad Jamil-ur-Rehman 1921年公版英译《伊本·鲁世德的哲学与神学》，第一部分，第26页，连续句",
      "Mohammad Jamil-ur-Rehman public-domain translation (1921), The Philosophy and Theology of Averroes, Part I, p. 26, continuous sentence",
    ],
  },
  {
    id: "averroes-interpretation",
    authorId: "averroes",
    topic: "语言",
    text: "解释意味着把一个词的意义从本义移到隐喻义。",
    english:
      "Interpretation means to carry the meaning of a word from its original sense to a metaphorical one.",
    editorialSummary: "当确证的论证与经文表面意义冲突时，可以依据阿拉伯语的修辞可能，把表述由字面引向合宜的隐喻解释。",
    englishEditorialSummary:
      "When demonstrative certainty conflicts with a scriptural passage's apparent sense, the rhetorical resources of Arabic permit a fitting move from literal to figurative interpretation.",
    work: "《决断论》",
    englishWork: "The Decisive Treatise",
    presentationNature: "source-excerpt",
    reflection:
      "解释不是随意改写。它受语言习惯、论证强度和文本整体约束；越偏离字面，越需要说明为什么。",
    englishReflection:
      "Interpretation is not arbitrary rewriting. It is constrained by linguistic usage, the strength of the demonstration, and the text as a whole; the further it moves from the literal, the more justification it needs.",
    question: "你是在依据语境解释文本，还是为了保住结论而任意移动它的含义？",
    englishQuestion:
      "Are you interpreting a text through context, or moving its meaning arbitrarily to protect a conclusion?",
    sourceLocator: [
      "Mohammad Jamil-ur-Rehman 1921年公版英译《伊本·鲁世德的哲学与神学》，第一部分，第27页，对“解释”的连续定义句",
      "Mohammad Jamil-ur-Rehman public-domain translation (1921), The Philosophy and Theology of Averroes, Part I, p. 27, continuous definition of interpretation",
    ],
  },
  {
    id: "averroes-audiences",
    authorId: "averroes",
    topic: "知识",
    text: "论证、辩证和修辞面向不同的理解能力；把高度专门的解释不加区分地公开，可能制造困惑而非知识。",
    english:
      "Demonstration, dialectic, and rhetoric address different capacities; broadcasting highly specialized interpretations without distinction may produce confusion rather than knowledge.",
    work: "《决断论》",
    englishWork: "The Decisive Treatise",
    reflection:
      "这是关于公共传播责任的早期难题，但也有精英主义风险。区分表达方式可以保护理解，绝不能成为垄断质疑权的借口。",
    englishReflection:
      "This is an early problem of responsibility in public communication, though it risks elitism. Adapting expression may protect understanding, but it must never become a pretext for monopolizing the right to question.",
    question: "面对不同听众时，怎样调整表达而不把对方排除在思考之外？",
    englishQuestion:
      "How can you adapt an explanation to different audiences without excluding them from thought?",
    sourceLocator: [
      "伊本·鲁世德《决断论》§11、§§35、44–45",
      "Averroes, The Decisive Treatise, §11 and §§35, 44-45",
    ],
  },
  {
    id: "thomas_aquinas",
    authorId: "thomas_aquinas",
    topic: "存在",
    text: "上帝的存在可以用五种方式来证明。第一种、也是最明显的一种，是从运动出发的论证。……因此，必须抵达一个不再由别的事物推动的第一推动者；人人都把它理解为上帝。",
    english:
      "The existence of God can be proved in five ways. The first and more manifest way is the argument from motion. ... Therefore it is necessary to arrive at a first mover, put in motion by no other; and this everyone understands to be God.",
    work: "《神学大全》",
    englishWork: "Summa Theologiae",
    editorialSummary:
      "从运动、因果、偶然、价值层次和自然秩序出发，理性可以追问这些依赖关系是否指向第一根源。",
    englishEditorialSummary:
      "Beginning from motion, causation, contingency, gradation, and natural order, reason can ask whether these dependencies point toward a first source.",
    presentationNature: "source-excerpt",
    reflection:
      "五路不是用一个神秘词终止问题，而是从经验中的依赖结构追问解释能否无限悬置。每一路都有不同的前提与争议。",
    englishReflection:
      "The Five Ways do not end inquiry with a mysterious word. They begin from structures of dependence in experience and ask whether explanation can remain indefinitely suspended; each way has distinct premises and disputes.",
    question: "你的解释抵达了根源，还是只停在一个被重新命名的未知处？",
    englishQuestion:
      "Has your explanation reached a source, or stopped at an unknown that has merely been renamed?",
    sourceLocator: [
      "托马斯·阿奎那《神学大全》I, q.2, a.3（英译据英格兰道明会诸神父 1920 年第二修订版；节选内部有省略）",
      "Thomas Aquinas, Summa Theologiae I, q.2, a.3 (Fathers of the English Dominican Province, 2nd rev. ed., 1920; internal omission in excerpt)",
    ],
  },
  {
    id: "thomas-aquinas-analogy",
    authorId: "thomas_aquinas",
    topic: "语言",
    text: "因此必须说，这些名称用于上帝和受造物时，是在类比意义上说的，也就是依照比例而说。",
    english:
      "Therefore it must be said that these names are said of God and creatures in an analogous sense, i.e. according to proportion.",
    work: "《神学大全》",
    englishWork: "Summa Theologiae",
    editorialSummary:
      "同一个词用于神与受造物时，既不是完全同义，也不是毫无关联，而是依据一种有秩序的类比。",
    englishEditorialSummary:
      "When one term is applied to God and creatures, it is neither wholly univocal nor wholly unrelated, but ordered by analogy.",
    presentationNature: "source-excerpt",
    reflection:
      "类比语言让我们在两种危险之间工作：把陌生对象缩成已知事物，或因为差异太大而放弃任何有意义的言说。",
    englishReflection:
      "Analogical language works between two dangers: reducing an unfamiliar object to something known, and abandoning meaningful speech because the difference is too great.",
    question: "你使用的比喻照亮了对象的哪一面，又在哪一面开始误导？",
    englishQuestion:
      "Which aspect of its object does your analogy illuminate, and where does it begin to mislead?",
    sourceLocator: [
      "托马斯·阿奎那《神学大全》I, q.13, a.5（英译据英格兰道明会诸神父 1920 年第二修订版）",
      "Thomas Aquinas, Summa Theologiae I, q.13, a.5 (Fathers of the English Dominican Province, 2nd rev. ed., 1920)",
    ],
  },
  {
    id: "thomas-aquinas-conscience",
    authorId: "thomas_aquinas",
    topic: "伦理",
    text: "严格说来，良知不是一种能力，而是一种行动。……因为良知可以解析为‘与他者同知’，也就是把知识应用到一个个别情形。",
    english:
      "Properly speaking, conscience is not a power, but an act. ... For conscience may be resolved into ‘cum alio scientia,’ i.e. knowledge applied to an individual case.",
    work: "《神学大全》",
    englishWork: "Summa Theologiae",
    editorialSummary:
      "良知不是心灵中的独立能力，而是把已有的道德知识应用到某个具体行为上的判断活动。",
    englishEditorialSummary:
      "Conscience is not a separate power of the mind, but the act of applying moral knowledge to a particular deed.",
    presentationNature: "source-excerpt",
    reflection:
      "良知会约束我们，却并非因此永不出错。若前提来自偏见或无知，真诚的应用仍可能得到错误结论。",
    englishReflection:
      "Conscience binds us, but that does not make it infallible. If its premises come from prejudice or ignorance, sincere application can still yield a mistaken conclusion.",
    question: "你所谓听从良知，依据的是哪条可被重新检验的判断？",
    englishQuestion:
      "When you say you follow conscience, which revisable judgment is it applying?",
    sourceLocator: [
      "托马斯·阿奎那《神学大全》I, q.79, a.13（英译据英格兰道明会诸神父 1920 年第二修订版；节选内部有省略）",
      "Thomas Aquinas, Summa Theologiae I, q.79, a.13 (Fathers of the English Dominican Province, 2nd rev. ed., 1920; internal omission in excerpt)",
    ],
  },
  {
    id: "thomas-aquinas-abstraction",
    authorId: "thomas_aquinas",
    topic: "知识",
    text: "我们的理智必须通过从感官形象中进行抽象来理解物质事物；而借助这样被考察的物质事物，我们也获得关于非物质事物的某种知识。",
    english:
      "Therefore we must needs say that our intellect understands material things by abstracting from the phantasms; and through material things thus considered we acquire some knowledge of immaterial things.",
    work: "《神学大全》",
    englishWork: "Summa Theologiae",
    editorialSummary:
      "人的理智从感官形象中抽取可普遍理解的形式，而不是生来就持有与经验无关的完整观念。",
    englishEditorialSummary:
      "Human intellect abstracts universally intelligible form from sensory images rather than beginning with complete ideas detached from experience.",
    presentationNature: "source-excerpt",
    reflection:
      "概念超越单个经验，却不必与经验断裂。学习是在许多个别差异中辨认可重复结构，同时避免抹平重要细节。",
    englishReflection:
      "A concept exceeds any single experience without severing itself from experience. Learning identifies repeatable structure across particulars while resisting the erasure of important detail.",
    question: "你形成的概念抓住了共同结构，还是过早忽略了例外？",
    englishQuestion:
      "Does the concept you formed capture a shared structure, or did it discard exceptions too soon?",
    sourceLocator: [
      "托马斯·阿奎那《神学大全》I, q.85, a.1（英译据英格兰道明会诸神父 1920 年第二修订版）",
      "Thomas Aquinas, Summa Theologiae I, q.85, a.1 (Fathers of the English Dominican Province, 2nd rev. ed., 1920)",
    ],
  },
  {
    id: "thomas-aquinas-law",
    authorId: "thomas_aquinas",
    topic: "政治",
    text: "由以上四条可以汇集出法律的定义：法律无非是为了共同善而作出的理性安排，由负责共同体者制定，并予以公布。",
    english:
      "Thus from the four preceding articles, the definition of law may be gathered; and it is nothing else than an ordinance of reason for the common good, made by him who has care of the community, and promulgated.",
    work: "《神学大全》",
    englishWork: "Summa Theologiae",
    editorialSummary:
      "法律是为共同善而作出的理性安排，由承担共同体责任者制定，并以公开方式让成员知晓。",
    englishEditorialSummary:
      "Law is an ordinance of reason for the common good, made by one responsible for the community and made publicly known.",
    presentationNature: "source-excerpt",
    reflection:
      "命令拥有强制力，不自动等于法律。法律的正当性还涉及理由、共同目的、制定权限与可知性。",
    englishReflection:
      "A command's coercive force does not automatically make it law. Legitimacy also concerns reason, common purpose, rightful authority, and public accessibility.",
    question: "一项规则除了能被执行，还满足了哪些使它配称为法律的条件？",
    englishQuestion:
      "Beyond being enforceable, which conditions make a rule worthy of being called law?",
    sourceLocator: [
      "托马斯·阿奎那《神学大全》I–II, q.90, a.4（英译据英格兰道明会诸神父 1920 年第二修订版）",
      "Thomas Aquinas, Summa Theologiae I-II, q.90, a.4 (Fathers of the English Dominican Province, 2nd rev. ed., 1920)",
    ],
  },
  {
    id: "thomas-aquinas-natural-law",
    authorId: "thomas_aquinas",
    topic: "伦理",
    text: "理性受造物对永恒法的这种参与，就叫作自然法。……因此显然，自然法无非是理性受造物对永恒法的参与。",
    english:
      "This participation of the eternal law in the rational creature is called the natural law. ... It is therefore evident that the natural law is nothing else than the rational creature's participation of the eternal law.",
    work: "《神学大全》",
    englishWork: "Summa Theologiae",
    editorialSummary:
      "自然法是理性受造者对永恒法的参与：人能够在自身倾向与理性反思中辨认行动的基本方向。",
    englishEditorialSummary:
      "Natural law is the rational creature's participation in eternal law: human beings can discern basic directions for action through their inclinations and rational reflection.",
    presentationNature: "source-excerpt",
    reflection:
      "道德不是纯粹外加的命令，也不是任何欲望都天然正确。人的倾向需要放在整体生活与共同善中由理性解释。",
    englishReflection:
      "Morality is neither a wholly external command nor the claim that every desire is naturally right. Human inclinations require rational interpretation within a whole life and a common good.",
    question: "你认为自然的倾向，如何接受理性的整理与公共理由的检验？",
    englishQuestion:
      "How should an inclination you call natural be ordered by reason and tested through public justification?",
    sourceLocator: [
      "托马斯·阿奎那《神学大全》I–II, q.91, a.2（英译据英格兰道明会诸神父 1920 年第二修订版；节选内部有省略）",
      "Thomas Aquinas, Summa Theologiae I-II, q.91, a.2 (Fathers of the English Dominican Province, 2nd rev. ed., 1920; internal omission in excerpt)",
    ],
  },
  {
    id: "thomas-aquinas-practical-principle",
    authorId: "thomas_aquinas",
    topic: "伦理",
    text: "因此，法律的第一条诫命是：善应当被实行和追求，恶应当被避免。自然法的其他一切诫命都建立在这一条之上。",
    english:
      "Hence this is the first precept of law, that ‘good is to be done and pursued, and evil is to be avoided.’ All other precepts of the natural law are based upon this.",
    work: "《神学大全》",
    englishWork: "Summa Theologiae",
    editorialSummary:
      "实践理性的首要方向，是把善作为应追求和实行之物，把恶作为应避免之物。",
    englishEditorialSummary:
      "The first direction of practical reason is to treat good as what is to be pursued and done, and evil as what is to be avoided.",
    presentationNature: "source-excerpt",
    reflection:
      "这个原则尚未告诉我们每个情境中何者为善。它提供推理的形式起点，具体判断仍需要事实、经验和审慎。",
    englishReflection:
      "This principle does not yet tell us what is good in every case. It supplies a formal beginning for reasoning; concrete judgment still needs facts, experience, and prudence.",
    question: "你们争论的是是否追求善，还是究竟什么才算善？",
    englishQuestion:
      "Are you disagreeing about whether to pursue good, or about what actually counts as good?",
    sourceLocator: [
      "托马斯·阿奎那《神学大全》I–II, q.94, a.2（英译据英格兰道明会诸神父 1920 年第二修订版）",
      "Thomas Aquinas, Summa Theologiae I-II, q.94, a.2 (Fathers of the English Dominican Province, 2nd rev. ed., 1920)",
    ],
  },
  {
    id: "thomas-aquinas-unjust-law",
    authorId: "thomas_aquinas",
    topic: "政治",
    text: "不义的法律可能以两种方式出现：第一，它们违背人的善——或者偏离目的，或者制定者越出受托权力，或者共同体的负担分配不均。……这类规定与其说是法律，不如说是暴力行为。",
    english:
      "Laws may be unjust in two ways: first, by being contrary to human good ... either in respect of the end ... or in respect of the author ... or in respect of the form, as when burdens are imposed unequally on the community. ... The like are acts of violence rather than laws.",
    work: "《神学大全》",
    englishWork: "Summa Theologiae",
    editorialSummary:
      "背离共同善、越出权限或分配负担不公的法律，在道德意义上更像暴力；但抵抗也须衡量是否造成更大伤害。",
    englishEditorialSummary:
      "A law that abandons the common good, exceeds authority, or distributes burdens unjustly is morally closer to violence; yet resistance must also consider whether it causes greater harm.",
    presentationNature: "source-excerpt",
    reflection:
      "法律义务不只来自成文形式，公民抗命也不只来自个人不悦。两者都需要说明正义、权限与后果之间的关系。",
    englishReflection:
      "Legal obligation does not arise from written form alone, and civil disobedience does not arise from private dislike alone. Both require an account of justice, authority, and consequences.",
    question: "面对不义规则时，服从与抵抗各自会把代价交给谁？",
    englishQuestion:
      "When a rule is unjust, onto whom do obedience and resistance each place their costs?",
    sourceLocator: [
      "托马斯·阿奎那《神学大全》I–II, q.96, a.4（英译据英格兰道明会诸神父 1920 年第二修订版；节选内部有省略）",
      "Thomas Aquinas, Summa Theologiae I-II, q.96, a.4 (Fathers of the English Dominican Province, 2nd rev. ed., 1920; internal omissions in excerpt)",
    ],
  },
  {
    id: "thomas-aquinas-happiness",
    authorId: "thomas_aquinas",
    topic: "伦理",
    text: "任何受造之善都不可能构成人的幸福。因为幸福是圆满的善，会使欲求完全平息；否则，只要还有什么有待欲求，它就不是最终目的。",
    english:
      "It is impossible for any created good to constitute man's happiness. For happiness is the perfect good, which lulls the appetite altogether; else it would not be the last end, if something yet remained to be desired.",
    work: "《神学大全》",
    englishWork: "Summa Theologiae",
    editorialSummary:
      "人的最终幸福不能由财富、荣誉或任何有限善完全满足，因为欲求仍会追问不再缺失的完整善。",
    englishEditorialSummary:
      "Final human happiness cannot be completed by wealth, honor, or any finite good, because desire continues to seek a comprehensive good that leaves nothing lacking.",
    presentationNature: "source-excerpt",
    reflection:
      "有限目标可以真实地好，却承受不了成为人生终极答案的重量。失望有时来自把局部的善要求成全部。",
    englishReflection:
      "Finite ends can be genuinely good without bearing the weight of being life's final answer. Disappointment sometimes comes from demanding that a partial good become the whole.",
    question: "你是否正要求某个有限成就，替你解决所有关于幸福的问题？",
    englishQuestion:
      "Are you asking a finite achievement to settle every question you have about happiness?",
    sourceLocator: [
      "托马斯·阿奎那《神学大全》I–II, q.2, a.8（英译据英格兰道明会诸神父 1920 年第二修订版）",
      "Thomas Aquinas, Summa Theologiae I-II, q.2, a.8 (Fathers of the English Dominican Province, 2nd rev. ed., 1920)",
    ],
  },
  {
    id: "thomas-aquinas-faith-reason",
    authorId: "thomas_aquinas",
    topic: "知识",
    text: "理性的自然指示必定是真实的，我们不可能设想它们并非如此。……既然只有虚假才与真理相反，信仰的真理就不可能与自然理性所知的原则相反。",
    english:
      "The natural dictates of reason must certainly be quite true: it is impossible to think of their being otherwise. ... Since therefore falsehood alone is contrary to truth, it is impossible for the truth of faith to be contrary to principles known by natural reason.",
    work: "《反异教大全》",
    englishWork: "Summa Contra Gentiles",
    editorialSummary:
      "来自可靠理性的真理与信仰所持的真理不可能真正矛盾；冲突提示至少一方的推导或理解出现了偏差。",
    englishEditorialSummary:
      "Truth reached by sound reason cannot genuinely contradict truth held by faith; conflict indicates a failure in at least one line of reasoning or interpretation.",
    presentationNature: "source-excerpt",
    reflection:
      "宣布两类真理和谐只是起点，不是免于论证的通行证。每次表面冲突仍需要耐心检查证据、推理和解释。",
    englishReflection:
      "Declaring two kinds of truth harmonious is a beginning, not a license to avoid argument. Every apparent conflict still requires patient scrutiny of evidence, reasoning, and interpretation.",
    question:
      "当信念与证据碰撞时，你愿意具体修正哪一步，而不只是宣布它们终会一致？",
    englishQuestion:
      "When conviction meets evidence, which specific step are you willing to revise rather than merely declaring eventual harmony?",
    sourceLocator: [
      "托马斯·阿奎那《反异教大全》I.7（约瑟夫·里卡比 1905 年英译；节选内部有省略）",
      "Thomas Aquinas, Summa Contra Gentiles I, Chapter 7 (Joseph Rickaby translation, 1905; internal omission in excerpt)",
    ],
  },
  {
    id: "machiavelli",
    authorId: "machiavelli",
    topic: "政治",
    text: "在我看来，与其追随对事情的想象，不如追随事情的真实真相；……因为忽视实际所为而只顾应当所为的人，与其说是在保存自己，不如说更快地毁掉自己。",
    english:
      "It appears to me more appropriate to follow up the real truth of the matter than the imagination of it; ... he who neglects what is done for what ought to be done, sooner effects his ruin than his preservation.",
    work: "《君主论》",
    englishWork: "The Prince",
    editorialSummary:
      "政治判断若只描绘人应当如何生活，就可能看不见人实际上怎样行动，以及权力在现实中怎样运作。",
    englishEditorialSummary:
      "Political judgment that describes only how people ought to live may fail to see how they actually act and how power operates in practice.",
    presentationNature: "source-excerpt",
    reflection:
      "转向事实不是宣布一切手段都正当。它首先要求规范判断面对真实条件，并诚实计算行动、失败与不行动的代价。",
    englishReflection:
      "Turning toward facts does not declare every means legitimate. It first requires normative judgment to face real conditions and honestly count the costs of action, failure, and inaction.",
    question: "你的方案是在改变现实，还是只在一个理想世界里证明自己正确？",
    englishQuestion:
      "Is your proposal changing reality, or merely proving itself right in an ideal world?",
    sourceLocator: [
      "马基雅维利《君主论》第 15 章（节录，中间有省略；W. K. Marriott 英译本）",
      "Machiavelli, The Prince, Chapter XV (excerpt with an internal omission; W. K. Marriott trans.)",
    ],
  },
  {
    id: "machiavelli-fear-love",
    authorId: "machiavelli",
    topic: "政治",
    text: "人应当希望兼得爱戴与畏惧；但因为两者很难集于一身，当二者必舍其一时，受人畏惧要比受人爱戴安全得多。……不过，君主施加畏惧时，应当做到即便得不到爱戴，也能避免仇恨。",
    english:
      "One should wish to be both, but, because it is difficult to unite them in one person, it is much safer to be feared than loved, when, of the two, either must be dispensed with. ... Nevertheless a prince ought to inspire fear in such a way that, if he does not win love, he avoids hatred.",
    work: "《君主论》",
    englishWork: "The Prince",
    editorialSummary:
      "统治者若无法兼得爱戴与畏惧，会倾向依靠较可控制的畏惧；但必须避免让畏惧转化成仇恨。",
    englishEditorialSummary:
      "If a ruler cannot be both loved and feared, fear may seem more controllable; yet fear must not be allowed to harden into hatred.",
    presentationNature: "source-excerpt",
    reflection:
      "这是对不对称权力的冷峻分析，不是健康关系的普遍处方。依靠恐惧维持的秩序，始终积累反抗与信息失真的风险。",
    englishReflection:
      "This is a severe analysis of asymmetric power, not a universal prescription for healthy relationships. Order maintained through fear accumulates risks of resistance and distorted information.",
    question: "一个组织中的服从来自信任、规则，还是对惩罚的计算？",
    englishQuestion:
      "Does obedience in an organization arise from trust, rules, or calculation of punishment?",
    sourceLocator: [
      "马基雅维利《君主论》第 17 章（节录，中间有省略；W. K. Marriott 英译本）",
      "Machiavelli, The Prince, Chapter XVII (excerpt with an internal omission; W. K. Marriott trans.)",
    ],
  },
  {
    id: "machiavelli-fox-lion",
    authorId: "machiavelli",
    topic: "政治",
    text: "狮子无法保护自己免于陷阱，狐狸也无法保护自己免遭群狼。因此，必须做狐狸以识破陷阱，做狮子以震慑群狼。只依靠狮子的人，并不明白自己在做什么。",
    english:
      "The lion cannot defend himself against snares and the fox cannot defend himself against wolves. Therefore, it is necessary to be a fox to discover the snares and a lion to terrify the wolves. Those who rely simply on the lion do not understand what they are about.",
    work: "《君主论》",
    englishWork: "The Prince",
    editorialSummary:
      "权力既要识别陷阱，也要抵御强力；只懂规则而不懂欺骗，或只懂强硬而不懂判断，都会暴露自身。",
    englishEditorialSummary:
      "Power must both detect traps and withstand force; knowing only the rules without recognizing deception, or relying on force without judgment, leaves a ruler exposed.",
    presentationNature: "source-excerpt",
    reflection:
      "狐狸与狮子的意象揭示政治能力的双重性，同时也逼出伦理问题：有效应对恶意与主动复制恶意之间，界线在哪里？",
    englishReflection:
      "The fox and lion reveal a dual political competence, while raising an ethical question: where is the boundary between effectively answering bad faith and deliberately reproducing it?",
    question: "你是在识别对方的策略，还是已让对方的手段决定了你成为怎样的人？",
    englishQuestion:
      "Are you recognizing another's strategy, or letting their methods determine the person you become?",
    sourceLocator: [
      "马基雅维利《君主论》第 18 章（W. K. Marriott 英译本）",
      "Machiavelli, The Prince, Chapter XVIII (W. K. Marriott trans.)",
    ],
  },
  {
    id: "machiavelli-fortune",
    authorId: "machiavelli",
    topic: "政治",
    text: "为了不扑灭我们的自由意志，我认为，命运是我们一半行动的裁决者；但她仍把另一半，或者略少一些，留给我们支配。",
    english:
      "Nevertheless, not to extinguish our free will, I hold it to be true that Fortune is the arbiter of one-half of our actions, but that she still leaves us to direct the other half, or perhaps a little less.",
    work: "《君主论》",
    englishWork: "The Prince",
    editorialSummary:
      "命运支配我们无法控制的一部分，但仍留下另一部分给判断、准备和敢于行动的能力。",
    englishEditorialSummary:
      "Fortune governs a portion of what lies beyond our control, while leaving another portion to judgment, preparation, and the capacity for bold action.",
    presentationNature: "source-excerpt",
    reflection:
      "承认偶然不是宿命论，强调能动性也不是控制幻觉。好的行动同时预留冲击的空间，并在窗口出现时迅速调整。",
    englishReflection:
      "Acknowledging chance is not fatalism, and affirming agency is not an illusion of control. Good action makes room for shocks while adapting quickly when an opening appears.",
    question: "当前局面中，哪一部分必须接受，哪一部分仍可通过准备改变？",
    englishQuestion:
      "Which part of the present situation must be accepted, and which can still be changed through preparation?",
    sourceLocator: [
      "马基雅维利《君主论》第 25 章（W. K. Marriott 英译本）",
      "Machiavelli, The Prince, Chapter XXV (W. K. Marriott trans.)",
    ],
  },
  {
    id: "machiavelli-conflict-liberty",
    authorId: "machiavelli",
    topic: "政治",
    text: "谴责贵族与平民之间这些纷争的人，所谴责的恰是罗马获得自由的首要原因；……他们没有想到：每个共和国里都有民众与贵族两个彼此冲突的派别，而一切有利于自由的法律，正是从这种冲突中产生。",
    english:
      "Those who condemn these dissensions between the nobles and the commons, condemn what was the prime cause of Rome becoming free; … not reflecting that while in every republic there are two conflicting factions, that of the people and that of the nobles, it is in this conflict that all laws favourable to freedom have their origin.",
    work: "《论李维》",
    englishWork: "Discourses on Livy",
    editorialSummary:
      "贵族与民众欲望之间的冲突未必毁掉共和国；当冲突被制度表达，它反而可能产生保护自由的法律。",
    englishEditorialSummary:
      "Conflict between elites and the people need not destroy a republic; when institutionally expressed, it can generate laws that protect liberty.",
    presentationNature: "source-excerpt",
    reflection:
      "自由不一定来自消除分歧，而可能来自让不同力量能够公开争执、相互限制，并把结果转化为共同规则。",
    englishReflection:
      "Liberty need not come from eliminating disagreement. It may arise when competing forces can contest publicly, restrain one another, and translate outcomes into common rules.",
    question: "你的共同体是在解决冲突，还是只在让冲突无法被说出？",
    englishQuestion:
      "Is your community resolving conflict, or merely making conflict impossible to voice?",
    sourceLocator: [
      "马基雅维利《论李维》I.4（节录，中间有省略；Ninian Hill Thomson 英译本）",
      "Machiavelli, Discourses on Livy I.4 (excerpt with an internal omission; Ninian Hill Thomson trans.)",
    ],
  },
  {
    id: "machiavelli-founding",
    authorId: "machiavelli",
    topic: "政治",
    text: "任何共和国或王国，若要从一开始便获得有益的制度，或者把旧制度完全重铸，都必须依靠一个人。……然而，尽管必须由一人创立制度，这些制度一旦建立，若交由众人维护，而非只由一人支撑，才更可能长久。",
    english:
      "No commonwealth or kingdom ever has salutary institutions given it from the first or has its institutions recast in an entirely new mould, unless by a single person. ... Though it be one man that must give a State its institutions, once given they are not so likely to last long resting for support on the shoulders of one man only, as when entrusted to the care of many.",
    work: "《论李维》",
    englishWork: "Discourses on Livy",
    editorialSummary:
      "创建或彻底改革一个政治秩序，往往需要行动方向在关键时刻保持统一；但结果必须服务共同体而非私人利益。",
    englishEditorialSummary:
      "Founding or radically reforming a political order often requires unity of direction at decisive moments, but its result must serve the community rather than private interest.",
    presentationNature: "source-excerpt",
    reflection:
      "创制时刻需要集中行动，却也最容易把必要性变成永久特权。判断创制者要看他建立了何种可持续、可共享的制度。",
    englishReflection:
      "A founding moment may require concentrated action, yet it is also where necessity most easily becomes permanent privilege. A founder must be judged by the sustainable and shareable institutions created.",
    question: "一项非常权力在完成任务后，靠什么真正退回制度边界？",
    englishQuestion:
      "What ensures that extraordinary power actually returns within institutional limits after its task is complete?",
    sourceLocator: [
      "马基雅维利《论李维》I.9（节录，中间有省略；Ninian Hill Thomson 英译本）",
      "Machiavelli, Discourses on Livy I.9 (excerpt with an internal omission; Ninian Hill Thomson trans.)",
    ],
  },
  {
    id: "francis_bacon",
    authorId: "francis_bacon",
    topic: "知识",
    text: "知识与人的力量是同义的，因为对原因的无知会使结果落空；自然只有通过服从才能被征服，而在思辨哲学中作为原因的东西，在实践科学中便成为规则。",
    english:
      "Knowledge and human power are synonymous, since the ignorance of the cause frustrates the effect; for nature is only subdued by submission, and that which in contemplative philosophy corresponds with the cause in practical science becomes the rule.",
    work: "《新工具》",
    englishWork: "Novum Organum",
    editorialSummary:
      "要让自然产生可预期的效果，先要服从并理解它的因果秩序；愿望不能替代对规律的认识。",
    englishEditorialSummary:
      "To produce reliable effects in nature, we must first obey and understand its causal order; wishes cannot substitute for knowledge of regularities.",
    presentationNature: "source-excerpt",
    reflection:
      "知识与能力相连，不是因为知道一句口号就拥有控制力，而是因为可重复的理解使行动能顺着真实条件发生。",
    englishReflection:
      "Knowledge is linked with power not because a slogan grants control, but because repeatable understanding lets action proceed through real conditions.",
    question: "你的目标受哪些不能凭意志绕过的条件约束？",
    englishQuestion:
      "Which conditions constrain your goal and cannot be bypassed by will alone?",
    sourceLocator: [
      "弗朗西斯·培根《新工具》卷一，第 3 条（Joseph Devey 编，1902）",
      "Francis Bacon, Novum Organum, Book I, Aphorism III (Joseph Devey ed., 1902)",
    ],
  },
  {
    id: "francis-bacon-method",
    authorId: "francis_bacon",
    topic: "知识",
    text: "探究和发现真理只有两条道路。……另一条从感觉与个别事物建立公理，持续而逐级上升，直到最后抵达最普遍的公理；这才是真实但尚未尝试的道路。",
    english:
      "There are and can exist but two ways of investigating and discovering truth. ... The other constructs its axioms from the senses and particulars, by ascending continually and gradually, till it finally arrives at the most general axioms, which is the true but unattempted way.",
    work: "《新工具》",
    englishWork: "Novum Organum",
    editorialSummary:
      "探究不应从少量经验跃向最高原则，再用演绎守护它；它应在经验与中层概括之间逐级上升。",
    englishEditorialSummary:
      "Inquiry should not leap from a few experiences to the highest principles and then defend them by deduction; it should rise gradually through intermediate generalizations.",
    presentationNature: "source-excerpt",
    reflection:
      "大胆假设可以启动研究，但必须让不同层次的证据持续修正概括。方法的价值在于安排我们如何犯错、发现错并改正。",
    englishReflection:
      "Bold hypotheses can begin inquiry, but evidence at multiple levels must keep revising them. A method is valuable because it organizes how we err, detect error, and correct it.",
    question: "你的结论跨过了哪些尚未被证据连接的台阶？",
    englishQuestion:
      "Which steps has your conclusion crossed without evidence connecting them?",
    sourceLocator: [
      "弗朗西斯·培根《新工具》卷一，第 19 条（节录，中间有省略；Joseph Devey 编，1902）",
      "Francis Bacon, Novum Organum, Book I, Aphorism XIX (excerpt with an internal omission; Joseph Devey ed., 1902)",
    ],
  },
  {
    id: "francis-bacon-idols",
    authorId: "francis_bacon",
    topic: "知识",
    text: "有四类幻象围困着人的心灵；为便于区别，我们给它们命名：第一类叫种族幻象，第二类叫洞穴幻象，第三类叫市场幻象，第四类叫剧场幻象。",
    english:
      "Four species of idols beset the human mind, to which (for distinction’s sake) we have assigned names, calling the first Idols of the Tribe, the second Idols of the Den, the third Idols of the Market, the fourth Idols of the Theatre.",
    work: "《新工具》",
    englishWork: "Novum Organum",
    editorialSummary:
      "认识会被人类共有的倾向、个人经历、语言交往和学说体系共同塑形；错误并不只来自信息不足。",
    englishEditorialSummary:
      "Understanding is shaped by tendencies shared across humanity, individual experience, linguistic exchange, and inherited systems; error does not come from missing information alone.",
    presentationNature: "source-excerpt",
    reflection:
      "四类幻象提醒我们，偏差既在个人心中，也嵌在语言和制度里。增加数据若不检查框架，可能只是更精确地重复偏见。",
    englishReflection:
      "The four idols remind us that bias resides both in individuals and in language and institutions. More data without scrutiny of the frame may reproduce prejudice more precisely.",
    question:
      "这个判断更可能受共同偏见、个人经验、词语误导，还是理论惯性影响？",
    englishQuestion:
      "Is this judgment shaped most by common bias, private experience, misleading words, or theoretical inertia?",
    sourceLocator: [
      "弗朗西斯·培根《新工具》卷一，第 39 条（Joseph Devey 编，1902）",
      "Francis Bacon, Novum Organum, Book I, Aphorism XXXIX (Joseph Devey ed., 1902)",
    ],
  },
  {
    id: "francis-bacon-light-fruit",
    authorId: "francis_bacon",
    topic: "知识",
    text: "只有当大量实验被纳入并汇集进自然史时，科学继续前进的希望才会有稳固基础；这些实验本身虽无实用，却能实质性地帮助发现原因与公理。我们称之为“照明的实验”，以区别于那些有收益的实验。",
    english:
      "Our hope of further progress in the sciences will then only be well founded, when numerous experiments shall be received and collected into natural history, which, though of no use in themselves, assist materially in the discovery of causes and axioms; which experiments we have termed enlightening, to distinguish them from those which are profitable.",
    work: "《新工具》",
    englishWork: "Novum Organum",
    editorialSummary:
      "有些实验立即结出实用成果，有些实验首先照亮原因；后者看似无用，却可能打开更多尚未知的用途。",
    englishEditorialSummary:
      "Some experiments yield immediate practical fruit, while others first illuminate causes; the latter may seem useless yet open many uses not yet imagined.",
    presentationNature: "source-excerpt",
    reflection:
      "只奖励短期应用，会让研究停留在已知路径。基础探究的公共价值，常在于扩大未来可以提出和解决的问题范围。",
    englishReflection:
      "Rewarding only immediate application confines research to known paths. The public value of basic inquiry often lies in expanding the range of questions the future can pose and solve.",
    question: "你是否因为成果尚不能变现，就过早放弃了能照亮机制的探索？",
    englishQuestion:
      "Have you abandoned an inquiry that illuminates a mechanism merely because it cannot yet be monetized?",
    sourceLocator: [
      "弗朗西斯·培根《新工具》卷一，第 99 条（Joseph Devey 编，1902）",
      "Francis Bacon, Novum Organum, Book I, Aphorism XCIX (Joseph Devey ed., 1902)",
    ],
  },
  {
    id: "francis-bacon-ladder",
    authorId: "francis_bacon",
    topic: "知识",
    text: "只有当我们的认同沿着真实的尺度和连续的阶梯，从个别事物不间断地上升到较低的公理，再到层层升高的中间公理，最后到最普遍的公理时，我们才可能对科学抱有良好希望。……靠简单枚举推进的归纳是幼稚的，会导向不确定的结论。",
    english:
      "We can then only augur well for the sciences, when the assent shall proceed by a true scale and successive steps, without interruption or breach, from particulars to the lesser axioms, thence to the intermediate (rising one above the other), and lastly, to the most general. ... The induction which proceeds by simple enumeration is puerile, leads to uncertain conclusions.",
    work: "《新工具》",
    englishWork: "Novum Organum",
    editorialSummary:
      "稳健的归纳不是简单枚举相同案例，而要让概括逐层形成，并主动寻找能够区分竞争解释的实例。",
    englishEditorialSummary:
      "Sound induction is not mere enumeration of similar cases; it forms generalizations by degrees and actively seeks instances that distinguish rival explanations.",
    presentationNature: "source-excerpt",
    reflection:
      "重复支持性例子会增加信心，却未必增加辨别力。真正关键的证据，往往是不同理论会给出不同预期的地方。",
    englishReflection:
      "Repeating supportive examples may increase confidence without increasing discrimination. Crucial evidence often lies where competing theories predict different outcomes.",
    question: "什么证据不仅支持你的解释，还能把它与最强的替代解释区分开？",
    englishQuestion:
      "What evidence would not merely support your account, but distinguish it from its strongest alternative?",
    sourceLocator: [
      "弗朗西斯·培根《新工具》卷一，第 104–105 条（节录，中间有省略；Joseph Devey 编，1902）",
      "Francis Bacon, Novum Organum, Book I, Aphorisms CIV-CV (excerpt with an internal omission; Joseph Devey ed., 1902)",
    ],
  },
  {
    id: "hobbes",
    authorId: "hobbes",
    topic: "知识",
    text: "一切思想的起源，就是我们所谓的感觉；因为人的心灵中没有任何一个观念，不曾首先全部或部分地由感觉器官产生。其余一切都从这一源头派生。",
    english:
      "The Originall of them all, is that which we call SENSE; (For there is no conception in a mans mind, which hath not at first, totally, or by parts, been begotten upon the organs of Sense.) The rest are derived from that originall.",
    work: "《利维坦》",
    englishWork: "Leviathan",
    editorialSummary:
      "思想的材料最初来自对象对感官的作用；心灵后来组合和延续的表象，仍以感觉留下的痕迹为基础。",
    englishEditorialSummary:
      "The materials of thought begin with objects acting on the senses; the images the mind later combines and continues still rest on traces left by sensation.",
    presentationNature: "source-excerpt",
    reflection:
      "抽象思考看似远离身体，却需要追问概念最初如何与经验连接。失去这种连接，词语可能只在彼此之间循环。",
    englishReflection:
      "Abstract thought may appear distant from the body, yet concepts still require an account of how they first connect with experience. Without it, words may circulate only among themselves.",
    question: "你使用的这个抽象概念，最终能回到哪些可辨认的经验？",
    englishQuestion:
      "To which recognizable experiences can this abstract concept ultimately be traced?",
    sourceLocator: [
      "霍布斯《利维坦》（1651）第一部分，第 1 章“论感觉”，第 2 段",
      "Hobbes, Leviathan (1651), Part I, Chapter I, ‘Of Sense,’ paragraph 2",
    ],
  },
  {
    id: "hobbes-language",
    authorId: "hobbes",
    topic: "语言",
    text: "因为言辞是智者的筹码，他们只用言辞计算；但言辞却是愚者的钱币。",
    english:
      "For words are wise mens counters, they do but reckon by them: but they are the mony of fooles.",
    editorialSummary:
      "智者把词语当作推理中可检查的符号，愚者却把名称本身误当成它所声称代表的价值。",
    englishEditorialSummary:
      "The wise treat words as signs to be checked in reasoning, while fools mistake the names themselves for the value they claim to represent.",
    work: "《利维坦》",
    englishWork: "Leviathan",
    presentationNature: "source-excerpt",
    reflection:
      "语言既是认知基础设施，也是故障来源。讨论若长期争执，先核对同一个词是否承担了彼此不同的意义。",
    englishReflection:
      "Language is both cognitive infrastructure and a source of failure. When debate persists, first check whether the same word is carrying different meanings for different speakers.",
    question: "你们的分歧来自事实，还是来自一个尚未共同定义的词？",
    englishQuestion:
      "Does your disagreement concern facts, or a word you have not yet defined together?",
    sourceLocator: [
      "霍布斯《利维坦》（1651）第一部分，第 4 章",
      "Hobbes, Leviathan (1651), Part I, Chapter IV",
    ],
  },
  {
    id: "hobbes-reasoning",
    authorId: "hobbes",
    topic: "知识",
    text: "因为在这个意义上，理性无非就是对约定的一般名称之结果进行计算（即加与减）。",
    english:
      "For Reason, in this sense, is nothing but Reckoning (that is, Adding and Substracting) of the Consequences of generall names agreed upon",
    editorialSummary:
      "推理是在约定名称的基础上计算其后果；定义若含混，形式运算也会继承含混。",
    englishEditorialSummary:
      "Reasoning calculates the consequences of agreed names; if definitions are unclear, formal reckoning inherits their ambiguity.",
    work: "《利维坦》",
    englishWork: "Leviathan",
    presentationNature: "source-excerpt",
    reflection:
      "形式正确只能保证结论跟随前提。检验论证既要看推导，也要回到定义是否清楚、前提是否与世界相合。",
    englishReflection:
      "Formal validity guarantees only that conclusions follow premises. Testing an argument also requires clear definitions and premises that answer to the world.",
    question: "你的推理错误若不在步骤，会不会藏在最初的定义里？",
    englishQuestion:
      "If the error is not in the steps of your reasoning, might it be hidden in the opening definitions?",
    sourceLocator: [
      "霍布斯《利维坦》（1651）第一部分，第 5 章",
      "Hobbes, Leviathan (1651), Part I, Chapter V",
    ],
  },
  {
    id: "hobbes-equality",
    authorId: "hobbes",
    topic: "政治",
    text: "自然使人在身体和心灵的能力方面如此平等。",
    english:
      "Nature hath made men so equall, in the faculties of body, and mind;",
    editorialSummary:
      "人的能力虽不相同，却没有谁强大或聪明到能永远免受他人威胁，因而共享一种相互脆弱的平等。",
    englishEditorialSummary:
      "Human powers differ, yet no one is strong or clever enough to remain permanently beyond others' threat, creating an equality of mutual vulnerability.",
    work: "《利维坦》",
    englishWork: "Leviathan",
    presentationNature: "source-excerpt",
    reflection:
      "霍布斯的平等不是赞美天赋一致，而是从相互脆弱出发。政治秩序必须面对任何人都无法永久免受他人影响的事实。",
    englishReflection:
      "Hobbesian equality does not celebrate identical talents; it begins from mutual vulnerability. Political order must face the fact that no one can remain permanently beyond the reach of others.",
    question: "如果把共同脆弱而非卓越能力作为起点，制度会怎样改变？",
    englishQuestion:
      "How would institutions change if they began from shared vulnerability rather than exceptional ability?",
    sourceLocator: [
      "霍布斯《利维坦》（1651）第一部分，第 13 章",
      "Hobbes, Leviathan (1651), Part I, Chapter XIII",
    ],
  },
  {
    id: "hobbes-state-of-nature",
    authorId: "hobbes",
    topic: "政治",
    text: "因此在人性中，我们发现三种主要的争端原因：第一，竞争；第二，猜疑；第三，荣誉。",
    english:
      "So that in the nature of man, we find three principall causes of quarrell. First, Competition; Secondly, Diffidence; Thirdly, Glory.",
    editorialSummary:
      "资源竞争、安全猜疑与声望追求，是缺少共同权力时冲突反复发生的三种动力。",
    englishEditorialSummary:
      "Competition for resources, distrust about security, and the pursuit of glory are three recurring drivers of conflict without a common power.",
    work: "《利维坦》",
    englishWork: "Leviathan",
    presentationNature: "source-excerpt",
    reflection:
      "个人未必天生嗜血，也可能因无法相信他人会克制而先行防卫。制度的任务之一，是改变这种互相猜疑的激励结构。",
    englishReflection:
      "People need not be naturally bloodthirsty; they may strike defensively because they cannot trust others to refrain. One task of institutions is to alter this incentive structure of mutual suspicion.",
    question: "当前冲突由恶意驱动，还是由每个人都害怕最后行动所驱动？",
    englishQuestion:
      "Is the present conflict driven by malice, or by everyone's fear of acting last?",
    sourceLocator: [
      "霍布斯《利维坦》（1651）第一部分，第 13 章，“争端的三种主要原因”",
      "Hobbes, Leviathan (1651), Part I, Chapter XIII, ‘Three principall causes of quarrell’",
    ],
  },
  {
    id: "hobbes-right-nature",
    authorId: "hobbes",
    topic: "政治",
    text: "所谓自然权利，是每个人按照自己的意愿运用自己的力量来保存自己的本性，也就是保存自己生命的自由……当别人也愿意如此时，一个人为了和平与自卫，应当愿意放弃对一切事物的这种权利。",
    english:
      "The Right of Nature … is the Liberty each man hath, to use his own power, as he will himselfe, for the preservation of his own Nature; that is to say, of his own Life … That a man be willing, when others are so too, as farre-forth, as for Peace, and defence of himselfe he shall think it necessary, to lay down this right to all things.",
    work: "《利维坦》",
    englishWork: "Leviathan",
    editorialSummary:
      "自然权利是每个人使用自身力量保存生命的自由；和平要成为可能，人们必须愿意互相限制这种无限自由。",
    englishEditorialSummary:
      "The right of nature is each person's liberty to use their power for self-preservation; peace becomes possible only when people are willing to limit this unrestricted liberty reciprocally.",
    presentationNature: "source-excerpt",
    reflection:
      "自由若完全不受共同约束，会让每个人的自由都暴露于他人的力量。契约的逻辑，是用一部分任意行动换取可预期的安全。",
    englishReflection:
      "Liberty without common restraint exposes everyone's liberty to everyone else's power. The logic of covenant trades some arbitrary action for predictable security.",
    question: "你愿意放弃哪一部分自由，前提是别人也受到同样约束？",
    englishQuestion:
      "Which liberty would you relinquish on condition that others accept the same restraint?",
    sourceLocator: [
      "霍布斯《利维坦》（1651）第一部分，第 14 章，自然权利定义与第二自然法则；卡片以省略号标示中间删节",
      "Hobbes, Leviathan (1651), Part I, Chapter XIV, definition of the right of nature and the second law of nature; internal omissions marked with ellipses",
    ],
  },
  {
    id: "hobbes-justice",
    authorId: "hobbes",
    topic: "伦理",
    text: "人应当履行他们所订立的契约；若非如此，契约便徒劳无益，只是空话。",
    english:
      "That Men Performe Their Covenants Made: without which, Covenants are in vain, and but Empty words;",
    editorialSummary:
      "正义的基本要求是履行有效契约；若承诺不被执行，契约就只是无法支持合作的空话。",
    englishEditorialSummary:
      "A basic demand of justice is to perform valid covenants; without performance, agreements are empty words unable to sustain cooperation.",
    work: "《利维坦》",
    englishWork: "Leviathan",
    presentationNature: "source-excerpt",
    reflection:
      "个人诚信离不开制度条件。若守约者持续受罚、背约者持续获利，仅靠道德劝说很难维持共同合作。",
    englishReflection:
      "Personal integrity depends partly on institutional conditions. If promise-keepers are punished and breakers rewarded, moral exhortation alone cannot sustain cooperation.",
    question: "你要求别人守约时，是否也建立了让守约不至于吃亏的条件？",
    englishQuestion:
      "When you ask others to keep promises, have you also built conditions in which keeping them is not punished?",
    sourceLocator: [
      "霍布斯《利维坦》（1651）第一部分，第 15 章",
      "Hobbes, Leviathan (1651), Part I, Chapter XV",
    ],
  },
  {
    id: "hobbes-commonwealth",
    authorId: "hobbes",
    topic: "政治",
    text: "建立这样一种共同权力的唯一办法……就是把他们全部的力量和权力授予一个人，或一个人的会议，使它能够按照多数人的意见，把他们所有的意志归结为一个意志。",
    english:
      "The only way to erect such a Common Power … is, to conferre all their power and strength upon one Man, or upon one Assembly of men, that may reduce all their Wills, by plurality of voices, unto one Will.",
    work: "《利维坦》",
    englishWork: "Leviathan",
    editorialSummary:
      "仅有彼此承诺仍不足以抵御猜疑；多数人要通过授权形成一个共同人格，使公共力量能够代表他们行动。",
    englishEditorialSummary:
      "Mutual promises alone cannot overcome distrust; a multitude must authorize a common person whose public power can act in their name.",
    presentationNature: "source-excerpt",
    reflection:
      "国家在这里不是天然实体，而是授权和代表关系的产物。公共权力的来源，因此也带着如何代表被授权者的问题。",
    englishReflection:
      "The state here is not a natural entity but the product of authorization and representation. The source of public power therefore carries the question of how those who authorize it are represented.",
    question: "一个机构声称代表你时，你究竟授权了什么，又保留了什么？",
    englishQuestion:
      "When an institution claims to represent you, what exactly have you authorized and what have you retained?",
    sourceLocator: [
      "霍布斯《利维坦》（1651）第二部分，第 17 章“论国家的成因、产生和定义”，“国家的产生”一节；卡片以省略号标示中间删节",
      "Hobbes, Leviathan (1651), Part II, Chapter XVII, ‘Of the Causes, Generation, and Definition of a Common-wealth,’ ‘The Generation of a Common-wealth’; internal omission marked with an ellipsis",
    ],
  },
  {
    id: "hobbes-sovereignty",
    authorId: "hobbes",
    topic: "政治",
    text: "还有第六种学说，明白而直接地违背国家的本质，即：主权可以被分割。把国家的权力分割开来，除了使它解体以外还能是什么？因为分割开的权力会彼此摧毁。",
    english:
      "There is a Sixth doctrine, plainly, and directly against the essence of a Common-wealth; and 'tis this, That the Soveraign Power may be divided. For what is it to divide the Power of a Common-wealth, but to Dissolve it; for Powers divided mutually destroy each other.",
    work: "《利维坦》",
    englishWork: "Leviathan",
    editorialSummary:
      "主权若不断被相互竞争的最终权威分割，裁决冲突的力量也会被重新拖回冲突之中。",
    englishEditorialSummary:
      "If sovereignty is continually divided among competing final authorities, the power meant to settle conflict is drawn back into conflict itself.",
    presentationNature: "source-excerpt",
    reflection:
      "霍布斯强调最终裁决的一致性，却也留下权力失控的严重风险。现代制度尝试用分权、程序和法治同时处理行动能力与滥权。",
    englishReflection:
      "Hobbes stresses unity in final decision, but leaves the grave risk of unaccountable power. Modern institutions use divided powers, procedures, and law to balance capacity for action against abuse.",
    question: "你的制度怎样在避免权力瘫痪的同时，防止最终裁决者不受约束？",
    englishQuestion:
      "How does your institution avoid paralysis without leaving the final decision-maker unconstrained?",
    sourceLocator: [
      "霍布斯《利维坦》（1651）第二部分，第 29 章“论削弱或导致国家解体的事物”，“分割主权”一节",
      "Hobbes, Leviathan (1651), Part II, Chapter XXIX, ‘Of those things that Weaken, or tend to the Dissolution of a Common-wealth,’ ‘Dividing of the Soveraign Power’",
    ],
  },
  {
    id: "hobbes-liberty",
    authorId: "hobbes",
    topic: "政治",
    text: "自由，或称 FREEDOME，恰当地说，意味着阻碍的不存在。",
    english:
      "Liberty, or FREEDOME, signifieth (properly) the absence of Opposition;",
    editorialSummary:
      "自由在严格意义上是外在阻碍的不存在，而不是行动缺少原因、欲望或法律背景。",
    englishEditorialSummary:
      "Liberty in the strict sense is the absence of external impediments, not action without causes, desires, or a legal setting.",
    work: "《利维坦》",
    englishWork: "Leviathan",
    presentationNature: "source-excerpt",
    reflection:
      "自由与法律不必是简单的零和关系。可预期的规则会限制选择，也可能使原本因恐惧和强力而无法实行的选择成为现实。",
    englishReflection:
      "Liberty and law need not form a simple zero-sum relation. Predictable rules restrict choices, but can also make possible choices that fear and force would otherwise block.",
    question: "这条规则只减少了选择，还是也创造了可以安全行动的空间？",
    englishQuestion:
      "Does this rule only reduce choice, or does it also create space in which action becomes safe?",
    sourceLocator: [
      "霍布斯《利维坦》（1651）第二部分，第 21 章",
      "Hobbes, Leviathan (1651), Part II, Chapter XXI",
    ],
  },
  {
    id: "leibniz",
    authorId: "leibniz",
    topic: "知识",
    text: "我们的推理建立在两个伟大原则上：其一是矛盾原则，凭此我们把包含矛盾的判断为假，把与假相反或矛盾的判断为真；……其二是充分理由原则，凭此我们认为，没有充分理由说明一件事为何如此而非另样，就没有事实能够成为实在或存在，也没有陈述能够为真，尽管这些理由往往不为我们所知。",
    english:
      "Our reasonings are founded on two great principles, that of contradiction, by virtue of which we judge that to be false which involves it, and that true, which is opposed or contradictory to the false. … And that of the sufficient reason, by virtue of which we consider that no fact can be real or existent, no statement true, unless there be a sufficient reason why it is so and not otherwise, although most often these reasons cannot be known to us.",
    work: "《单子论》",
    englishWork: "Monadology",
    editorialSummary:
      "任何事实若成立，都应有它如此而非另样的充分理由，即使有限的认识者尚未发现那个理由。",
    englishEditorialSummary:
      "Whenever a fact obtains, there must be a sufficient reason why it is so rather than otherwise, even when finite knowers have not discovered that reason.",
    presentationNature: "source-excerpt",
    reflection:
      "充分理由原则推动我们越过恰好如此的回答，但不保证每个追问都能立刻得到答案。它是一项探究承诺，也需要避免把猜测冒充理由。",
    englishReflection:
      "The principle of sufficient reason pushes beyond 'it just happens to be so,' but does not promise an immediate answer to every question. It commits us to inquiry without licensing guesses as reasons.",
    question: "你把什么当成了无需解释的事实，而它其实仍在等待一个理由？",
    englishQuestion:
      "Which fact have you treated as needing no explanation when it may still await a reason?",
    sourceLocator: [
      "莱布尼茨《单子论》§§31–32（乔治·马丁·邓肯 1890 年公版英译；省略号标示节号边界）",
      "Leibniz, Monadology §§31–32 (George Martin Duncan public-domain translation, 1890; ellipsis marks the omitted section-number boundary)",
    ],
  },
  {
    id: "leibniz-complete-concept",
    authorId: "leibniz",
    topic: "知识",
    text: "每一个真实的述谓都在事物本性中有某种根据；……主体的内容必须始终包含谓词的内容，因此，若有人完全理解主体的概念，他也会知道该谓词属于它。",
    english:
      "Every true predication has some basis in the nature of things, ... Thus the content of the subject must always include that of the predicate in such a way that if one understands perfectly the concept of the subject, he will know that the predicate appertains to it also.",
    work: "《形而上学谈》",
    englishWork: "Discourse on Metaphysics",
    editorialSummary:
      "真正的主词概念若被完整理解，会包含一切能够真实述说于该主体的谓词及其相互联系。",
    englishEditorialSummary:
      "A subject's complete concept, if fully understood, contains every predicate that can truly be said of that subject and the relations among them.",
    presentationNature: "source-excerpt",
    reflection:
      "命题不只是把两个任意标签粘在一起；真实谓述要求谓词以某种方式扎根于主体是什么。这也引出自由与预定之间的难题。",
    englishReflection:
      "A proposition does not merely glue arbitrary labels together; true predication requires the predicate to be grounded in what the subject is. This also raises the problem of freedom and determination.",
    question: "你对一个人的描述揭示了他是谁，还是把偶然标签当成了完整身份？",
    englishQuestion:
      "Does your description reveal who a person is, or mistake a contingent label for a complete identity?",
    sourceLocator: [
      "莱布尼茨《形而上学谈》§8（乔治·R. 蒙哥马利 1908 年公版英译；节选内部有省略）",
      "Leibniz, Discourse on Metaphysics §8 (George R. Montgomery public-domain translation, 1908; internal omission in excerpt)",
    ],
  },
  {
    id: "leibniz-windowless",
    authorId: "leibniz",
    topic: "存在",
    text: "没有任何办法解释一个单子如何能被另一个受造物从内部改变，因为没有什么能在它内部被移置，也无法设想任何内在运动能在其中被激发、引导、增强或减弱——复合物中各部分发生变化时却可以如此。单子没有任何窗口，能让什么东西进入或离开。",
    english:
      "There is also no way of explaining how a monad can be altered or changed internally by any other creature, for nothing can be transposed within it, nor can there be conceived in it any internal movement which can be excited, directed, augmented or diminished within it as can be done in compounds, where there is change among the parts. The monads have no windows through which anything can enter or depart.",
    work: "《单子论》",
    englishWork: "Monadology",
    editorialSummary:
      "简单实体没有可让性质从外部进出的部分；它的每一次变化，都要由自身内在状态的展开来说明。",
    englishEditorialSummary:
      "A simple substance has no parts through which qualities could enter from outside; each change must be explained through the unfolding of its internal state.",
    presentationNature: "source-excerpt",
    reflection:
      "无窗不是说经验世界里没有关系，而是说简单实体不能像容器那样接受一块性质。因果协调需要在更深的秩序上解释。",
    englishReflection:
      "Windowlessness does not deny relations in experience. It denies that a simple substance receives a piece of quality like a container; causal coordination must be explained at a deeper level of order.",
    question: "如果影响不是把某种东西直接塞进心灵，理解改变还需要什么模型？",
    englishQuestion:
      "If influence is not a thing inserted directly into the mind, what model of change is still needed?",
    sourceLocator: [
      "莱布尼茨《单子论》§7（乔治·马丁·邓肯 1890 年公版英译）",
      "Leibniz, Monadology §7 (George Martin Duncan public-domain translation, 1890)",
    ],
  },
  {
    id: "leibniz-identity",
    authorId: "leibniz",
    topic: "存在",
    text: "此外，每一个单子都必须与其他每一个单子不同。因为自然界中绝不会有两个存在者完全相同，以至于找不到任何内在差异，或任何建立在内在规定上的差异。",
    english:
      "Moreover it is necessary that each monad should differ from every other. For never in nature are two beings exactly alike and such that it is not possible to find an internal difference or one founded upon an intrinsic connotation.",
    work: "《单子论》",
    englishWork: "Monadology",
    editorialSummary:
      "两个简单实体不可能在全部内在性质上完全相同；若毫无可辨差异，就没有把它们算作两个的根据。",
    englishEditorialSummary:
      "No two simple substances can be identical in every internal quality; without any discernible difference, there would be no ground for counting them as two.",
    presentationNature: "source-excerpt",
    reflection:
      "个体性不能只靠编号维持。即使差异极微小，一个真实的多个世界也要求每个存在者拥有自身独特的状态与视角。",
    englishReflection:
      "Individuality cannot be sustained by numbering alone. However minute the differences, a genuinely plural world requires each being to have its own state and perspective.",
    question: "当你说两件事完全相同时，究竟是什么仍让你坚持它们是两件？",
    englishQuestion:
      "When you call two things perfectly alike, what still makes you insist that there are two?",
    sourceLocator: [
      "莱布尼茨《单子论》§9（乔治·马丁·邓肯 1890 年公版英译）",
      "Leibniz, Monadology §9 (George Martin Duncan public-domain translation, 1890)",
    ],
  },
  {
    id: "leibniz-perception-appetition",
    authorId: "leibniz",
    topic: "存在",
    text: "这种在统一体或简单实体中包含并表征多样性的过渡状态，就是我们所谓的知觉。……引起变化、或使一个知觉过渡到另一个知觉的内在原则之行动，可以称为欲求。",
    english:
      "The transient state, which involves and represents multitude in unity or in the simple substance, is only what we call perception. ... The action of the internal principle which causes the change or the passage from one perception to another, may be called appetition.",
    work: "《单子论》",
    englishWork: "Monadology",
    editorialSummary:
      "简单实体以知觉在一者中表征多者，又由欲求推动一个知觉状态过渡到下一个状态。",
    englishEditorialSummary:
      "A simple substance represents multiplicity within unity through perception, while appetition carries it from one perceptual state to the next.",
    presentationNature: "source-excerpt",
    reflection:
      "变化既有内容，也有方向。描述一个系统当前表征了什么仍不够，还要理解哪些内在趋势推动它继续变化。",
    englishReflection:
      "Change has both content and direction. Describing what a system presently represents is not enough; we must also understand the internal tendencies carrying it onward.",
    question: "在你此刻的状态中，哪一种倾向正在把它推向下一刻？",
    englishQuestion:
      "Within your present state, which tendency is carrying it toward the next?",
    sourceLocator: [
      "莱布尼茨《单子论》§§14–15（乔治·马丁·邓肯 1890 年公版英译；节选内部有省略）",
      "Leibniz, Monadology §§14-15 (George Martin Duncan public-domain translation, 1890; internal omission in excerpt)",
    ],
  },
  {
    id: "leibniz-two-truths",
    authorId: "leibniz",
    topic: "知识",
    text: "真理也有两种：推理的真理与事实的真理。推理的真理是必然的，其反面不可能；事实的真理是偶然的，其反面可能。",
    english:
      "There are also two kinds of truths, those of reasoning and those of fact. Truths of reasoning are necessary and their opposite is impossible, and those of fact are contingent and their opposite is possible.",
    work: "《单子论》",
    englishWork: "Monadology",
    editorialSummary:
      "推理真理由矛盾律支撑，其反面不可能；事实真理的反面可以设想，因此需要充分理由解释它为何实际成立。",
    englishEditorialSummary:
      "Truths of reasoning rest on contradiction and have impossible opposites; truths of fact have conceivable opposites and therefore require sufficient reason for their actuality.",
    presentationNature: "source-excerpt",
    reflection:
      "证明数学命题和解释历史事件不是同一种工作。前者分析概念的必然联系，后者必须处理条件、选择与现实因果。",
    englishReflection:
      "Proving a mathematical proposition and explaining a historical event are not the same task. One analyzes necessary conceptual relations; the other addresses conditions, choices, and actual causes.",
    question: "你当前需要的是证明某事不可能不如此，还是解释它为何碰巧如此？",
    englishQuestion:
      "Do you need to prove that something could not be otherwise, or explain why it happens to be so?",
    sourceLocator: [
      "莱布尼茨《单子论》§33（乔治·马丁·邓肯 1890 年公版英译）",
      "Leibniz, Monadology §33 (George Martin Duncan public-domain translation, 1890)",
    ],
  },
  {
    id: "leibniz-possible-worlds",
    authorId: "leibniz",
    topic: "存在",
    text: "既然上帝的观念中有无限多个可能宇宙，而只有一个能够存在，就必须有一个充分理由，使上帝选择这一个而不是另一个。……这就是最佳者得以存在的原因：智慧让上帝认识它，善让上帝选择它，力量让上帝产生它。",
    english:
      "Now, as there is an infinity of possible universes in the idea of God, and as only one of them can exist, there must be a sufficient reason for the choice of God, which determines him for one rather than for another. ... And this is the cause of the existence of the Best, which wisdom makes known to God, which his goodness chooses and which his power produces.",
    work: "《单子论》",
    englishWork: "Monadology",
    editorialSummary:
      "可能事物并非都会实际实现；现实化意味着在许多可能的整体世界方案间作出选择。",
    englishEditorialSummary:
      "Not every possibility becomes actual; actuality involves selection among many possible arrangements of a whole world.",
    presentationNature: "source-excerpt",
    reflection:
      "单独看来都好的目标，放在同一资源、时间和制度中可能彼此冲突。评价方案要比较完整组合，而非孤立愿望。",
    englishReflection:
      "Goals that each look good in isolation may conflict within one set of resources, time, and institutions. Plans must be evaluated as complete combinations rather than isolated wishes.",
    question: "你想同时实现的目标，真的能在同一个世界里彼此相容吗？",
    englishQuestion:
      "Can the goals you want to realize together genuinely coexist within one world?",
    sourceLocator: [
      "莱布尼茨《单子论》§§53、55（乔治·马丁·邓肯 1890 年公版英译；节选内部有省略）",
      "Leibniz, Monadology §§53 and 55 (George Martin Duncan public-domain translation, 1890; internal omission in excerpt)",
    ],
  },
  {
    id: "leibniz-perspectives",
    authorId: "leibniz",
    topic: "知识",
    text: "每一个简单实体都与其他一切事物发生关系并将它们表现出来，因此它是宇宙的一面永恒而有生命的镜子。正如同一座城市从不同方向看去会显得完全不同，仿佛在透视中成倍增加；无数简单实体也使同一个宇宙仿佛成为许多个宇宙，而这些只是每个单子从不同视点看到的同一宇宙之透视。",
    english:
      "Each simple substance has relations which express all the others, and … it is a living, perpetual mirror of the universe. … And as the same city regarded from different sides appears entirely different and in perspective is as if multiplied, … there are as it were so many different universes, which are nevertheless only the perspectives of a single one, from the different points of view of each monad.",
    work: "《单子论》",
    englishWork: "Monadology",
    editorialSummary:
      "每个简单实体都以自己的清晰度和位置表现同一个宇宙，如同从不同视点观看同一座城市。",
    englishEditorialSummary:
      "Each simple substance represents the same universe with its own degree of clarity and position, as one city appears from different points of view.",
    presentationNature: "source-excerpt",
    reflection:
      "视角不同不意味着没有共同世界。恰恰因为对象相同，各种局部表征才可能互相校正，并揭示单一位置看不到的结构。",
    englishReflection:
      "Different perspectives do not imply the absence of a common world. Because their object is shared, partial representations can correct one another and reveal structures invisible from one position.",
    question: "哪个与你冲突的视角，可能正在呈现同一现实中你看不到的一面？",
    englishQuestion:
      "Which perspective that conflicts with yours may reveal an aspect of the same reality that you cannot see?",
    sourceLocator: [
      "莱布尼茨《单子论》§§56–57（乔治·马丁·邓肯 1890 年公版英译；节选内部有省略）",
      "Leibniz, Monadology §§56-57 (George Martin Duncan public-domain translation, 1890; internal omissions in excerpt)",
    ],
  },
  {
    id: "leibniz-harmony",
    authorId: "leibniz",
    topic: "存在",
    text: "灵魂遵循它自己的特殊规律，身体也遵循它自己的规律；二者凭借一切实体之间的预定和谐而相遇，因为它们都是同一个宇宙的表象。灵魂依照目的因的规律行动，身体依照动力因或运动的规律行动；动力因与目的因这两个领域彼此和谐。",
    english:
      "The soul follows its own peculiar laws and the body also follows its own laws, and they meet by virtue of the pre-established harmony between all substances, since they are all representations of one and the same universe. … Souls act according to the laws of final causes, by appetitions, ends and means. Bodies act in accordance with the laws of efficient causes or of motion. And the two realms, that of efficient causes and that of final causes, are in harmony with each other.",
    work: "《单子论》",
    englishWork: "Monadology",
    editorialSummary:
      "心灵与身体不必彼此搬运状态，也能依照各自规律形成一致进程；协调来自二者被预先纳入同一秩序。",
    englishEditorialSummary:
      "Mind and body need not transfer states into one another to proceed in agreement; their coordination arises from both being ordered in advance within one system.",
    presentationNature: "source-excerpt",
    reflection:
      "预定和谐以整体设计解释同步，代价是重新定义因果互动。它提醒我们，相关、协调与直接作用并不是同一个概念。",
    englishReflection:
      "Pre-established harmony explains synchronization through overall design, at the cost of redefining causal interaction. It reminds us that correlation, coordination, and direct action are not the same concept.",
    question: "你观察到的同步，足以证明双方彼此造成了吗？",
    englishQuestion:
      "Does the synchronization you observe prove that the two sides directly cause one another?",
    sourceLocator: [
      "莱布尼茨《单子论》§§78–79（乔治·马丁·邓肯 1890 年公版英译；省略号标示节号边界）",
      "Leibniz, Monadology §§78–79 (George Martin Duncan public-domain translation, 1890; ellipsis marks the omitted section-number boundary)",
    ],
  },
  {
    id: "leibniz-small-perceptions",
    authorId: "leibniz",
    topic: "知识",
    text: "我们必定会被这一道浪的运动轻微触动，并对每一个如此微小的声音有所知觉；否则，我们就不可能知觉到十万道浪，因为十万个虚无不可能组成某种东西。",
    english:
      "For it must be that we are affected a little by the motion of this wave, and that we have some perception of each one of these noises, small as they are; otherwise we would not have that of a hundred thousand waves, since a hundred thousand nothings cannot make something.",
    work: "《人类理智新论》",
    englishWork: "New Essays on Human Understanding",
    editorialSummary:
      "无数微小知觉虽未进入清晰意识，仍会汇成情绪、习惯和显著经验，如单个浪声汇入海的轰鸣。",
    englishEditorialSummary:
      "Countless minute perceptions may never become clear in consciousness, yet combine into moods, habits, and salient experience, as individual waves compose the roar of the sea.",
    presentationNature: "source-excerpt",
    reflection:
      "意识并不透明地掌握自身全部来源。一个决定看似突然，可能早已被许多微弱线索和未被注意的感受共同准备。",
    englishReflection:
      "Consciousness does not transparently possess all its sources. A decision that seems sudden may have been prepared by many faint cues and unnoticed feelings.",
    question: "你此刻明确的情绪，可能由哪些尚未被注意的细小经验汇成？",
    englishQuestion:
      "Which unnoticed small experiences may have combined into the emotion you now clearly feel?",
    sourceLocator: [
      "莱布尼茨《人类理智新论》序言（阿尔弗雷德·G. 兰利 1896 年公版英译，第 48 页）",
      "Leibniz, New Essays Concerning Human Understanding, Preface (Alfred G. Langley public-domain translation, 1896, p. 48)",
    ],
  },
  {
    id: "berkeley",
    authorId: "berkeley",
    topic: "存在",
    text: "一个观念的存在就在于被感知……无思维之物脱离与被感知的任何关系而绝对存在，这在我看来是完全不可理解的。它们的存在就是被感知。",
    english:
      "The existence of an idea consists in being perceived … For as to what is said of the absolute existence of unthinking things without any relation to their being perceived, that seems perfectly unintelligible. Their esse is percipi.",
    work: "《人类知识原理》",
    englishWork: "A Treatise Concerning the Principles of Human Knowledge",
    editorialSummary:
      "感官对象的存在就在于被感知；所谓不依赖任何心灵而存在的颜色、声音或形状，并不是经验实际呈现给我们的东西。",
    englishEditorialSummary:
      "The existence of sensible objects consists in being perceived; colors, sounds, or shapes existing apart from every mind are not what experience actually presents.",
    presentationNature: "source-excerpt",
    reflection:
      "贝克莱不是说世界由个人随意幻想，而是质疑在被感知性质背后再安放一个永不可感知的物质基底，是否增加了解释。",
    englishReflection:
      "Berkeley does not say that each person invents the world at will. He questions whether positing an imperceptible material substrate behind perceived qualities adds explanatory value.",
    question:
      "当你从全部可经验性质中抽离时，所谓物质对象还剩下怎样可说明的内容？",
    englishQuestion:
      "After removing every experiential quality, what intelligible content remains in the supposed material object?",
    sourceLocator: [
      "贝克莱《人类知识原理》第一部分，§§2–3；卡片以省略号标示中间删节",
      "Berkeley, Principles of Human Knowledge, Part I, §§2–3; internal omission marked with an ellipsis",
    ],
  },
  {
    id: "berkeley-abstraction",
    authorId: "berkeley",
    topic: "知识",
    text: "一个观念，就其自身而言虽是个别的，却可以由于被用来代表或指代同类的一切其他个别观念，而成为一般的。",
    english:
      "An idea which, considered in itself, is particular, becomes general by being made to represent or stand for all other particular ideas of the same sort.",
    work: "《人类知识原理·导论》",
    englishWork: "Introduction to the Principles of Human Knowledge",
    editorialSummary:
      "一般概念不必是一幅抽掉全部特殊性质的模糊图像；一个具体观念可以在推理中代表同类的许多个体。",
    englishEditorialSummary:
      "A general concept need not be a vague image stripped of every particular quality; one particular idea can represent many individuals of a kind in reasoning.",
    presentationNature: "source-excerpt",
    reflection:
      "普遍性可能来自使用方式，而不是来自心中有一张不可能的无特征图像。概念的力量在于可适用范围与推理规则。",
    englishReflection:
      "Generality may come from how an idea is used, not from an impossible featureless image in the mind. A concept's power lies in its range of application and rules of inference.",
    question: "你所谓的抽象概念，是一种心像，还是一种能够反复应用的规则？",
    englishQuestion:
      "Is what you call an abstract concept a mental image, or a rule that can be repeatedly applied?",
    sourceLocator: [
      "贝克莱《人类知识原理·作者导论》§12",
      "Berkeley, Author’s Introduction to the Principles of Human Knowledge, §12",
    ],
  },
  {
    id: "berkeley-qualities",
    authorId: "berkeley",
    topic: "知识",
    text: "广延、形状和运动都只是存在于心灵中的观念；一个观念只能与另一个观念相似；所以，无论这些性质还是它们所谓的原型，都不能存在于一个不感知的实体中。",
    english:
      "Extension, figure, and motion are only ideas existing in the mind, and … an idea can be like nothing but another idea, and … consequently neither they nor their archetypes can exist in an unperceiving substance.",
    work: "《人类知识原理》",
    englishWork: "A Treatise Concerning the Principles of Human Knowledge",
    editorialSummary:
      "广延、形状和运动与颜色、味道一样，都只以被感知的具体样态出现；不能只把前一组抽出并宣布它们独立于心灵。",
    englishEditorialSummary:
      "Extension, shape, and motion appear only in concrete perceived forms, just as color and taste do; the former cannot simply be isolated and declared mind-independent.",
    presentationNature: "source-excerpt",
    reflection:
      "区分第一性质与第二性质本想保留客观核心，贝克莱却追问：大小和运动的经验同样随位置、感官与比较尺度而变化。",
    englishReflection:
      "The primary-secondary distinction aims to preserve an objective core, but Berkeley asks why size and motion do not also vary with position, sense, and scale of comparison.",
    question: "你称为完全客观的性质，是否仍依赖某种观察条件与测量框架？",
    englishQuestion:
      "Does the quality you call wholly objective still depend on conditions of observation and a framework of measurement?",
    sourceLocator: [
      "贝克莱《人类知识原理》第一部分，§9；卡片以省略号标示句内删节",
      "Berkeley, Principles of Human Knowledge, Part I, §9; sentence-internal omissions marked with ellipses",
    ],
  },
  {
    id: "berkeley-spirit",
    authorId: "berkeley",
    topic: "存在",
    text: "精神是一个单纯、不可分的、主动的存在；当它感知观念时，就称为理解力；当它产生观念或以其他方式作用于观念时，就称为意志。因此，我们无法形成灵魂或精神的观念。",
    english:
      "A spirit is one simple, undivided, active being—as it perceives ideas it is called the understanding, and as it produces or otherwise operates about them it is called the will. Hence there can be no idea formed of a soul or spirit.",
    work: "《人类知识原理》",
    englishWork: "A Treatise Concerning the Principles of Human Knowledge",
    editorialSummary:
      "观念是被动呈现的内容，不能自己造成变化；感知、意愿和行动属于主动的精神，而精神不能像观念那样被描摹。",
    englishEditorialSummary:
      "Ideas are passively presented contents and cannot produce change by themselves; perceiving, willing, and acting belong to active spirit, which cannot be pictured as an idea.",
    presentationNature: "source-excerpt",
    reflection:
      "认识主体不是又一个摆在意识中的对象。我们通过活动与效果理解主体，这提醒我们不要把观看者误当成被观看的图像。",
    englishReflection:
      "The knowing subject is not one more object displayed within consciousness. We understand agency through activity and effects, and should not mistake the viewer for a viewed image.",
    question:
      "你能在经验里找到许多内容，但那个正在经验的主体以什么方式被认识？",
    englishQuestion:
      "You can find many contents in experience, but in what way is the subject undergoing that experience known?",
    sourceLocator: [
      "贝克莱《人类知识原理》第一部分，§27",
      "Berkeley, Principles of Human Knowledge, Part I, §27",
    ],
  },
  {
    id: "berkeley-laws-signs",
    authorId: "berkeley",
    topic: "知识",
    text: "我们所依赖的心灵在我们心中唤起感觉观念时所遵循的固定规则或既定方式，称为自然规律；我们通过经验认识它们……这使我们获得一种预见，从而能够为了生活的益处调节自己的行动。",
    english:
      "The set rules or established methods wherein the Mind we depend on excites in us the ideas of sense, are called the laws of nature; and these we learn by experience … This gives us a sort of foresight which enables us to regulate our actions for the benefit of life.",
    work: "《人类知识原理》",
    englishWork: "A Treatise Concerning the Principles of Human Knowledge",
    editorialSummary:
      "自然规律描述观念出现的稳定次序，使我们能够预见和行动；我们认识的是一套可靠的符号秩序，而非观念自身的因果力量。",
    englishEditorialSummary:
      "Laws of nature describe stable sequences among ideas that let us predict and act; what we learn is a reliable order of signs, not causal power residing in ideas themselves.",
    presentationNature: "source-excerpt",
    reflection:
      "科学可以因发现稳定关系而保持完整价值，即使它不声称看见隐藏必然性。预测结构与终极原因是可以区分的解释任务。",
    englishReflection:
      "Science retains full value by discovering stable relations even without claiming to see hidden necessity. Predictive structure and ultimate cause are distinguishable explanatory tasks.",
    question:
      "你的模型是在准确描述可重复的次序，还是已经证明了次序背后的原因？",
    englishQuestion:
      "Does your model accurately describe a repeatable order, or has it also established the cause behind that order?",
    sourceLocator: [
      "贝克莱《人类知识原理》第一部分，§§30–31；卡片以省略号标示中间删节",
      "Berkeley, Principles of Human Knowledge, Part I, §§30–31; internal omission marked with an ellipsis",
    ],
  },
];

export const philosophyCanonEarlyThoughts: Thought[] = canonEarlySeeds.map(
  (seed): Thought => ({
    ...canonAuthorProfiles[seed.authorId],
    ...seed,
    rendering:
      seed.presentationNature === "source-excerpt"
        ? "short-quote"
        : "paraphrase",
  }),
);
