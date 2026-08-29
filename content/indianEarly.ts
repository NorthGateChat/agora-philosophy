import type {
  IndianAuthorProfile,
  IndianThoughtSeed,
} from "./indianCorpusTypes";

type ContextualIndianThoughtSeed = IndianThoughtSeed & {
  context?: string;
  englishContext?: string;
  distinction?: string;
  englishDistinction?: string;
};

/**
 * Early Indian cards are source-indexed study notes. A small verified subset
 * uses rights-compatible historical translations verbatim; the rest remain
 * editorial paraphrases. Dates and attributions for several sutra traditions
 * remain contested, so profiles use conventional ranges and locators name the
 * text rather than pretending to identify one authorial moment.
 */
export const indianEarlyProfiles = {
  "vedic-upanishadic": {
    name: "吠陀—奥义书传统",
    englishName: "Vedic–Upanishadic Traditions",
    life: "约前 1200—前 300",
    englishLife: "c. 1200-300 BCE",
    school: "吠陀与早期奥义书",
    englishSchool: "Vedic and Early Upanishadic Thought",
    palette: ["#eee4d1", "#cfb786", "#96733f", "#35291c"],
  },
  "bhagavad-gita": {
    name: "《薄伽梵歌》传统",
    englishName: "Bhagavad Gita Tradition",
    life: "约前 2 世纪—2 世纪",
    englishLife: "c. 2nd century BCE-2nd century CE",
    school: "史诗哲学与行动瑜伽",
    englishSchool: "Epic Philosophy and the Yoga of Action",
    palette: ["#ece1d8", "#c9ab98", "#8c6656", "#332521"],
  },
  "early-buddhism": {
    name: "乔达摩·佛陀",
    englishName: "Gautama Buddha",
    life: "约前 5 世纪",
    englishLife: "c. 5th century BCE",
    school: "早期佛教",
    englishSchool: "Early Buddhism",
    palette: ["#e7e2d4", "#c4b68e", "#81734f", "#2e2a20"],
  },
  mahavira: {
    name: "大雄",
    englishName: "Mahavira",
    life: "传统纪年约前 6 世纪",
    englishLife: "traditionally dated c. 6th century BCE",
    school: "耆那教",
    englishSchool: "Jain Philosophy",
    palette: ["#e4e8dc", "#b5c19f", "#71805c", "#283026"],
  },
  ishvarakrishna: {
    name: "自在黑",
    englishName: "Ishvarakrishna",
    life: "约 4—5 世纪",
    englishLife: "c. 4th-5th century CE",
    school: "数论派",
    englishSchool: "Samkhya",
    palette: ["#e3e4e8", "#b2b6c3", "#707589", "#282a33"],
  },
  patanjali: {
    name: "钵颠阇利",
    englishName: "Patanjali",
    life: "成书年代约前 2 世纪—4 世纪",
    englishLife: "text compiled c. 2nd century BCE-4th century CE",
    school: "古典瑜伽",
    englishSchool: "Classical Yoga",
    palette: ["#e1e8e5", "#adc1ba", "#67857c", "#25302d"],
  },
  "aksapada-gautama": {
    name: "足目乔达摩",
    englishName: "Akshapada Gautama",
    life: "成书年代约前 2 世纪—2 世纪",
    englishLife: "text compiled c. 2nd century BCE-2nd century CE",
    school: "正理派",
    englishSchool: "Nyaya",
    palette: ["#e2e6e8", "#afbbc1", "#687e87", "#252e32"],
  },
  kanada: {
    name: "迦那陀",
    englishName: "Kanada",
    life: "成书年代约前 2 世纪—1 世纪",
    englishLife: "text compiled c. 2nd century BCE-1st century CE",
    school: "胜论派",
    englishSchool: "Vaisheshika",
    palette: ["#e7e0d7", "#c1ae9b", "#846c58", "#302820"],
  },
  jaimini: {
    name: "阇弥尼",
    englishName: "Jaimini",
    life: "成书年代约前 2 世纪—2 世纪",
    englishLife: "text compiled c. 2nd century BCE-2nd century CE",
    school: "弥曼差派",
    englishSchool: "Mimamsa",
    palette: ["#e8e3d9", "#c3b79f", "#81755e", "#2e2b24"],
  },
} satisfies Record<string, IndianAuthorProfile>;

export const indianEarlySeeds = [
  {
    id: "indian-vedic-creation-question",
    authorId: "vedic-upanishadic",
    topic: "认识",
    text: "诸神晚于这个世界的产生。那又有谁知道，它最初从何而来？",
    english:
      "The Gods are later than this world's production. Who knows then whence it first came into being?",
    editorialSummary: "面对宇宙的开端，最古老的颂歌也允许问题保持开放：诸神若晚于世界出现，谁又能保证知道最初发生了什么？",
    englishEditorialSummary:
      "Before the beginning of the cosmos, even an ancient hymn leaves the question open: if the gods arose later, who can guarantee knowledge of what first occurred?",
    work: "《梨俱吠陀》",
    englishWork: "Rig Veda",
    presentationNature: "source-excerpt",
    reflection:
      "《无有歌》没有给出一套确定的创世学说，而是在多个起源设想之间保留怀疑，最后甚至把怀疑推向最高的见证者。它不是现代不可知论宣言，却显示追问自身知识边界也可以成为宗教诗歌的一部分。",
    englishReflection:
      "The Nasadiya hymn offers no settled cosmogony; it moves among possible origins and finally extends doubt even to the highest witness. It is not a manifesto of modern agnosticism, but it shows that examining the limits of knowledge can belong within sacred poetry.",
    question: "当一个问题没有足够证据时，你能否让不知道本身保持清晰？",
    englishQuestion:
      "When evidence is insufficient, can you keep not-knowing clear rather than filling it prematurely?",
    sourceLocator: [
      "第10卷第129首第6节；R. T. H. Griffith 1897年第二版第2卷公版英译，印刷页576，连续两句",
      "Mandala 10, Hymn 129, verse 6; R. T. H. Griffith's public-domain translation, 2nd ed., vol. II (1897), print p. 576, two continuous sentences",
    ],
  },
  {
    id: "indian-upanishad-neti-neti",
    authorId: "vedic-upanishadic",
    topic: "自我",
    text: "因此，现在有‘并非如此！也非那般！’（neti, neti）的教导；因为没有比‘他是如此’这一说法更高的了。",
    english:
      "Hence, now, there is the teaching ‘Not thus! not so!’ (neti, neti), for there is nothing higher than this, that he is thus.",
    editorialSummary: "终极实在不能被任何单一性质收尽；每一次说‘就是这个’，都还需要用‘不是这个，也不是那个’撤回过度限定。",
    englishEditorialSummary:
      "Ultimate reality is not exhausted by any single predicate; each claim that it is simply this must be checked by withdrawing the excess through ‘not this, not that.’",
    work: "《广林奥义书》",
    englishWork: "Brihadaranyaka Upanishad",
    presentationNature: "source-excerpt",
    reflection:
      "‘非此、非彼’是一种否定性的辨析：它拒绝把自我或梵等同于可被对象化的有限特征。它并非断言一切都不存在，而是提醒语言在指向不受限定者时会不断超出自己的能力。",
    englishReflection:
      "‘Not this, not that’ is a discipline of negative discrimination, refusing to identify self or brahman with finite objectifiable features. It does not claim that nothing exists; it marks how language repeatedly exceeds its competence when indicating the unconditioned.",
    context:
      "2.3的主题是‘梵的两种形式’。2.3.1—5先从神祇与自我两个参照，成对区分有形与无形、会死与不死、静止与运动；2.3.6先以袍色、白羊毛、甲虫、火焰、白莲和闪电描述此人的形，随即引出neti, neti。本句之后又称他为‘真实者之真实’，并说有息众生是真实，他是它们的真实。",
    englishContext:
      "Section 2.3 concerns ‘the two forms of Brahma.’ Sections 2.3.1–5 distinguish formed and formless, mortal and immortal, stationary and moving from the standpoints of the divinities and the self. Section 2.3.6 first compares the Person's form to a saffron robe, white wool, an Indragopa beetle, fire, a white lotus, and lightning, then invokes neti, neti. Immediately afterward he is called ‘the Real of the real,’ the reality of breathing creatures.",
    distinction:
      "neti, neti在这里不是虚无论，也不是说此前的形式毫无意义；它阻止把正面形象当作穷尽性定义，而紧随其后的‘真实者之真实’仍明确肯定实在。项目中文直接保留Hume译句中‘他是如此’的指称；把它概括为‘否定式界说’属于研读解释，不是原句逐字内容。",
    englishDistinction:
      "Neti, neti here is not nihilism and does not make the preceding forms meaningless. It prevents the positive images from becoming an exhaustive definition, while ‘the Real of the real’ immediately reasserts reality. The project Chinese now renders Hume's phrase ‘that he is thus’ directly; calling it a negative definition is a study interpretation, not wording in the sentence.",
    question: "你对自己的哪一个定义，正在把流动的生命缩成固定对象？",
    englishQuestion:
      "Which definition of yourself is reducing a living process to a fixed object?",
    sourceLocator: [
      "《广林奥义书》2.3.6；Robert Ernest Hume 1921年公版英译，印刷页97（扫描/PDF第117页），完整连续句",
      "Brihad-Aranyaka Upanishad 2.3.6; Robert Ernest Hume's public-domain translation (1921), print p. 97 (scan/PDF p. 117), complete continuous sentence",
    ],
  },
  {
    id: "indian-upanishad-relational-love",
    authorId: "vedic-upanishadic",
    topic: "自我",
    text: "看哪，的确，丈夫之所以可亲爱，并不是因为爱丈夫，而是因为爱灵魂（阿特曼），丈夫才可亲爱。",
    english:
      "Lo, verily, not for love of the husband is a husband dear, but for love of the Soul (Ātman) a husband is dear.",
    editorialSummary:
      "我们所爱的人与事之所以可亲，并不只是因为它们作为外物存在，也因为爱触及了我们如何理解自身。",
    englishEditorialSummary:
      "People and things become dear not merely as external objects, but because loving them reaches into how we understand the self.",
    work: "《广林奥义书》",
    englishWork: "Brihadaranyaka Upanishad",
    presentationNature: "source-excerpt",
    reflection:
      "在耶若婆佉与弥勒伊的对话中，这句是随后妻子、儿女、财富等一系列例子的开头，整组陈述把‘可亲爱’引回阿特曼与不死问题。这里的灵魂（Ātman）不是日常自利，也不是由关系维系的现代自我形象。",
    englishReflection:
      "In Yajnavalkya's dialogue with Maitreyi, this sentence opens a sequence that moves through wife, sons, wealth, and other beloved things, tracing their dearness back to Ātman and the question of immortality. The Soul (Ātman) here is neither everyday self-interest nor a modern self-image sustained by relationships.",
    question: "若这里的‘阿特曼’不是日常自我图景，这段话如何改变你对爱之根据的理解？",
    englishQuestion:
      "If Ātman here is not an everyday self-image, how does the passage change your understanding of what grounds love?",
    sourceLocator: [
      "《广林奥义书》2.4.5；Robert Ernest Hume 1921年公版英译《十三部主要奥义书》，印刷页98，完整连续句",
      "Brihad-Aranyaka Upanishad 2.4.5; Robert Ernest Hume's public-domain translation in The Thirteen Principal Upanishads (1921), print p. 98, complete continuous sentence",
    ],
  },
  {
    id: "indian-upanishad-tat-tvam-asi",
    authorId: "vedic-upanishadic",
    topic: "自我",
    text: "那最精微的本质——这整个世界以它为灵魂。那是实在。那是阿特曼（灵魂）。你就是它，舍卫多计都。",
    english:
      "That which is the finest essence—this whole world has that as its soul. That is Reality. That is Ātman (Soul). That art thou, Svetaketu.",
    editorialSummary:
      "个体并非与存在的根基全然隔绝；在最深层的追问中，‘你’被要求从万物共同的实在重新理解自己。",
    englishEditorialSummary:
      "The individual is not wholly severed from the ground of being; at the deepest level of inquiry, ‘you’ are asked to understand yourself through the reality shared by all things.",
    work: "《歌者奥义书》",
    englishWork: "Chandogya Upanishad",
    presentationNature: "source-excerpt",
    reflection:
      "‘彼即是你’在盐溶于水等一系列比喻之后反复出现，把不可见的根基与个体自我联系起来。后世吠檀多对这句话有不同解释，因此不应把某一派的‘绝对同一’直接当成原段唯一含义。",
    englishReflection:
      "‘That you are’ recurs after analogies such as salt dissolved in water, relating an unseen ground to the individual self. Later Vedanta schools interpret the sentence differently, so one school's doctrine of absolute identity should not be treated as the passage's only possible meaning.",
    question: "如果自我不是孤立单位，你对责任和关系的理解会怎样变化？",
    englishQuestion:
      "If the self is not an isolated unit, how would your understanding of responsibility and relationship change?",
    sourceLocator: [
      "《歌者奥义书》6.8.7；Robert Ernest Hume 1921年公版英译《十三部主要奥义书》，印刷页246，完整连续第7节",
      "Chandogya Upanishad 6.8.7; Robert Ernest Hume's public-domain translation in The Thirteen Principal Upanishads (1921), print p. 246, complete continuous verse 7",
    ],
  },
  {
    id: "indian-upanishad-chariot",
    authorId: "vedic-upanishadic",
    topic: "解脱",
    text: "要知道灵魂（阿特曼、自我）是车中乘者，身体是车。要知道理智（buddhi）是车夫，心意（manas）是缰绳。人们说，诸感官（indriya）是马；感官对象是它们驰行的范围。自我与感官和心意结合，智者称之为‘享用者’（bhoktr）。",
    english:
      "Know thou the soul (ātman, self) as riding in a chariot, The body as the chariot. Know thou the intellect (buddhi) as the chariot-driver, And the mind (manas) as the reins. The senses (indriya), they say, are the horses; The objects of sense, what they range over. The self combined with senses and mind Wise men call ‘the enjoyer’ (bhoktr).",
    editorialSummary:
      "身体如车，感官如马，心意执缰，辨别力驾车；自由不是摧毁这些部分，而是让它们朝同一方向协作。",
    englishEditorialSummary:
      "The body is a chariot, the senses its horses, mind the reins, and discernment the driver; freedom requires not destroying these parts but coordinating their direction.",
    work: "《迦陀奥义书》",
    englishWork: "Katha Upanishad",
    presentationNature: "source-excerpt",
    reflection:
      "车乘譬喻为自我训练提供层次结构：感觉、心意与辨别力承担不同功能，失序会让行动偏离目标。它不是现代心理学模型，也不意味着身体只是应被轻视的容器。",
    englishReflection:
      "The chariot analogy gives self-training a layered structure: senses, mind, and discernment perform different roles, and disorder diverts action from its goal. It is not a modern psychological model, nor does it imply that the body is merely a vessel to despise.",
    context:
      "第1.3.1—2偈先区分隐居心中的两者，并以纳吉盖多火祭作通往无畏彼岸的桥。第3—4偈随后给出车乘譬喻：阿特曼是乘者，身体是车，理智是车夫，心意是缰绳，感官是马，感官对象是马所行之境，诸部分结合者被称为‘享用者’。紧接的第5—9偈才以恶马、良马对比理解、持心与感官控制，并把旅程终点说成毗湿奴的最高处。",
    englishContext:
      "Katha 1.3.1–2 first distinguishes two occupants of the heart and presents the Naciketas fire as a bridge toward the fearless farther shore. Verses 3–4 then introduce the chariot: Ātman is the rider, body the chariot, intellect the driver, mind the reins, senses the horses, sense objects their range, and the self joined with senses and mind ‘the enjoyer.’ Verses 5–9 immediately contrast vicious and good horses, understanding and non-understanding, firmness of mind, sense control, and arrival at the highest place of Vishnu.",
    distinction:
      "所引原文是1.3.3—4完整连续两偈，不含‘自由’‘摧毁各部分’或‘朝同一方向协作’等措辞；这些内容作为旧命题保留在研读摘要中，主要依据紧接的1.3.5—9展开。譬喻中的功能区分不是现代心理模块理论，也不能据此贬低身体。Hume以intellect译buddhi，中文据此译作‘理智’，不把后世特定解释写进原句。",
    englishDistinction:
      "The excerpt contains all of 1.3.3–4 and no wording about ‘freedom,’ ‘destroying’ the parts, or ‘coordinating their direction.’ Those claims remain an editorial summary drawn chiefly from 1.3.5–9. Functional differentiation in the image is neither a modern theory of psychological modules nor a license to despise the body. Hume renders buddhi as ‘intellect’; the Chinese follows that historical translation rather than importing a later technical interpretation.",
    question: "此刻你的方向由辨别力决定，还是由最急切的一匹‘马’决定？",
    englishQuestion:
      "Is your present direction set by discernment or by whichever ‘horse’ pulls most urgently?",
    sourceLocator: [
      "《迦陀奥义书》1.3.3—4；Robert Ernest Hume 1921年公版英译，印刷页351（扫描/PDF第371页）；连续完整两偈，仅将分行排印合并为行文，完整照录",
      "Katha Upanishad 1.3.3–4; Robert Ernest Hume's public-domain translation (1921), print p. 351 (scan/PDF p. 371); two complete consecutive verses, with verse lineation normalized into running text and quoted in full",
    ],
  },
  {
    id: "indian-upanishad-renunciation-enjoyment",
    authorId: "vedic-upanishadic",
    topic: "伦理",
    text: "这一切都必须由主（īśa）包覆——凡流动世界中的一切流动之物。凭着这番舍离，你可以享用。切莫贪求任何人的财富。",
    english:
      "By the Lord (īśa) enveloped must this all be— Whatever moving thing there is in the moving world. With this renounced, thou mayest enjoy. Covet not the wealth of any one at all.",
    editorialSummary:
      "占有并非享用世界的唯一方式；承认万物不专属于我，反而可能让使用、节制与分享同时成立。",
    englishEditorialSummary:
      "Possession is not the only way to enjoy the world; recognizing that things are not exclusively mine can allow use, restraint, and sharing to coexist.",
    work: "《自在奥义书》",
    englishWork: "Isha Upanishad",
    presentationNature: "source-excerpt",
    reflection:
      "开篇把‘遍在’、舍离与享用压缩在同一节中，不同译者对动词的理解差异很大。它所挑战的是贪取式占有，但不能被轻易改写成一套现成的现代经济政策。",
    englishReflection:
      "The opening verse compresses divine pervasion, relinquishment, and enjoyment into one difficult statement, whose key verb is translated in different ways. It challenges acquisitive possession but cannot simply be converted into a ready-made modern economic policy.",
    context:
      "第1偈以神圣包覆、舍离／享用与不贪求并置，开启整部《自在奥义书》。紧接的第2偈转向行动与百年寿命，说明在特定取向下行动不黏附于人；后面的第6—7偈又通过在自我中看见众生、在众生中看见自我来陈述统一。",
    englishContext:
      "Verse 1 opens the Isha Upanishad by juxtaposing divine enveloping, renunciation or enjoyment, and non-coveting. Verse 2 immediately turns to doing deeds and living a hundred years, stating that action need not adhere to the person; verses 6–7 later frame unity through seeing all beings in the Self and the Self in all beings.",
    distinction:
      "卡片采用Hume对争议很大的tena tyaktena bhuñjīthā的特定译法‘With this renounced, thou mayest enjoy’；中文是对该历史英译的研读译文，并不裁定梵文解释史。‘使用、节制与分享’是从舍离和不贪求作出的编辑应用，尤其‘分享’并非原句用词；本偈也不是现成的现代经济政策。原书小标题属于Hume的编辑增补。",
    englishDistinction:
      "The card follows Hume's specific rendering of the disputed tena tyaktena bhuñjīthā as ‘With this renounced, thou mayest enjoy.’ The study Chinese does not settle the Sanskrit's interpretive history. Use, restraint, and especially sharing are editorial applications of renunciation and non-coveting, not wording in the excerpt; the verse is not a ready-made modern economic policy. Hume's printed heading is editorial.",
    question: "有什么事物在减少占有欲之后，反而能被你更充分地使用或欣赏？",
    englishQuestion:
      "What might you use or appreciate more fully once the urge to possess it diminishes?",
    sourceLocator: [
      "《自在奥义书》第1偈；Robert Ernest Hume 1921年公版英译，印刷页362（扫描/PDF第382页）；连续完整一偈，仅合并原书分行，完整照录",
      "Isha Upanishad, verse 1; Robert Ernest Hume's public-domain translation (1921), print p. 362 (scan/PDF p. 382); complete continuous verse, with printed lineation normalized and quoted in full",
    ],
  },

  {
    id: "indian-gita-action-fruit",
    authorId: "bhagavad-gita",
    topic: "伦理",
    text: "你所应关切的只是行动本身，绝不是果报。不要让行动的果报成为你（行动的）动机。",
    english:
      "Your business is with action alone; not by any means with fruit. Let not the fruit of action be your motive (to action).",
    editorialSummary: "行动属于你的责任范围，结果却从不完全由你支配；专注行动，不等于把结果据为自我价值的凭证。",
    englishEditorialSummary:
      "Action lies within your sphere of responsibility, while results never lie wholly under your control; attending to action does not mean possessing its fruits as proof of your worth.",
    work: "《薄伽梵歌》",
    englishWork: "Bhagavad Gita",
    presentationNature: "source-excerpt",
    reflection:
      "这段经文要求阿周那行动而不执著果报，并同时警告他不要以‘不求结果’为不行动的理由。它不是对计划与后果的否定，而是在不确定条件下重新安排动机、责任和控制感。",
    englishReflection:
      "The verse calls Arjuna to act without attachment to fruits while warning him not to make nonattachment an excuse for inaction. It does not reject planning or consequences; it reorganizes motive, responsibility, and control under uncertainty.",
    question: "哪项行动值得你认真完成，即使它不能保证想要的回报？",
    englishQuestion:
      "Which action deserves your full attention even though it cannot guarantee the desired return?",
    sourceLocator: ["《薄伽梵歌》第2章第47节；K. T. Telang 1882年《东方圣书》第8卷公版英译，印刷页48，连续三句", "Bhagavad Gita II.47; K. T. Telang's public-domain translation in Sacred Books of the East, vol. VIII (1882), print p. 48, three continuous sentences"],
  },
  {
    id: "indian-gita-equanimity",
    authorId: "bhagavad-gita",
    topic: "解脱",
    text: "……行动吧，舍弃（一切）执著，在成功或失败中保持平衡；（这样的）平衡被称为修持。",
    english:
      "… perform actions, casting off (all) attachment, and being equable in success or ill-success; (such) equability is called devotion.",
    editorialSummary:
      "在成功与失败之间保持平衡，不是消除判断，而是不让结果的波动劫持行动的品质。",
    englishEditorialSummary:
      "Equanimity between success and failure does not erase judgment; it prevents fluctuating outcomes from taking over the quality of action.",
    work: "《薄伽梵歌》",
    englishWork: "Bhagavad Gita",
    presentationNature: "source-excerpt",
    reflection:
      "Telang 在此以 devotion 译梵文 yoga，因此这里的‘修持’不宜按日常‘虔敬’孤立理解；经文把它直接界定为不执著行动中的成败平衡。这个平衡关乎取向稳定，不等于对伤害与正义无差别，也不是压抑所有情绪。",
    englishReflection:
      "Telang renders the Sanskrit yoga here as “devotion,” so the term should not be isolated as ordinary religious piety; the verse defines it through equanimity in unattached action. This steadiness of orientation is not indifference to harm and justice, nor the suppression of every emotion.",
    question: "结果改变时，怎样让你的标准保持稳定而不是变得麻木？",
    englishQuestion:
      "When outcomes change, how can your standards remain steady without becoming numb?",
    sourceLocator: [
      "《薄伽梵歌》2.48；K. T. Telang 1882年《东方圣书》第8卷公版英译，印刷页48—49；单句内连续节选，句首删节以省略号标明；Telang在此以 devotion 译 yoga",
      "Bhagavad Gita II.48; K. T. Telang's public-domain translation in Sacred Books of the East, vol. VIII (1882), print pp. 48–49; continuous excerpt within one sentence, with the opening omission marked by an ellipsis; Telang renders yoga here as “devotion”",
    ],
  },
  {
    id: "indian-gita-action-sustains-world",
    authorId: "bhagavad-gita",
    topic: "政治",
    text: "伟大的人做什么，其他人也会照着做。人们会追随他所接受为权威的东西。",
    english:
      "Whatever a great man does, that other men also do. And people follow whatever he receives as authority.",
    editorialSummary:
      "行动不仅塑造行动者，也参与维系共同世界；有影响力的人尤其无法把自己的做法当成纯粹私事。",
    englishEditorialSummary:
      "Action shapes not only the agent but also the shared world; those with influence especially cannot treat their conduct as a purely private affair.",
    work: "《薄伽梵歌》",
    englishWork: "Bhagavad Gita",
    presentationNature: "source-excerpt",
    reflection:
      "克里希那以‘世间维系’说明为何觉者仍然行动：人的实践会成为他人模仿的尺度。原段处在劝说战士履行职责的语境中，因此不能跳过战争伦理的困难而只保留领导学口号。",
    englishReflection:
      "Krishna invokes sustaining the world to explain why one who knows still acts: conduct becomes a measure others imitate. Because the passage persuades a warrior to perform his duty, its ethical difficulty about war cannot be skipped in favor of a simple leadership slogan.",
    context:
      "3.20先以遮那迦等藉行动达成圆满，并要求顾及“使人们守其职责”；3.21说明典范行为会被他人追随，3.22—24再以黑天即使无所待办仍行动、否则世界将毁坏为例。",
    englishContext:
      "Verse 3.20 first invokes Janaka and others attaining perfection through action and asks Arjuna to consider ‘the keeping of people (to their duties).’ Verse 3.21 describes exemplary conduct being followed; 3.22–24 then present Krishna acting despite having nothing to acquire, lest the worlds be destroyed.",
    distinction:
      "这不是“有权势者做什么都正确”的许可，也不是脱离祭祀、社会等级与劝阿周那作战语境的通用领导术；“维系共同世界”来自3.20—26的整段解释，不是3.21两句的逐字措辞。",
    englishDistinction:
      "This does not license the claim that whatever a powerful person does is right, nor is it a context-free leadership maxim detached from sacrifice, social hierarchy, and the exhortation of Arjuna to fight. ‘Sustaining the shared world’ synthesizes 3.20–26 rather than quoting 3.21 verbatim.",
    question: "如果别人把你的日常做法当成许可，你会希望他们学到什么？",
    englishQuestion:
      "If others treated your everyday conduct as permission, what would you want them to learn?",
    sourceLocator: [
      "《薄伽梵歌》3.21；K. T. Telang 1882年《东方圣书》第8卷公版英译，印刷页54（PDF第68页）；两句构成的连续完整诗节；中文为项目研读译文",
      "Bhagavad Gita III.21; K. T. Telang's public-domain translation in Sacred Books of the East, vol. VIII (1882), print p. 54 (PDF p. 68); complete continuous verse in two sentences; Chinese is a project study translation",
    ],
  },
  {
    id: "indian-gita-self-lift",
    authorId: "bhagavad-gita",
    topic: "自我",
    text: "（人）应由自己提升自己，不应使自己沉沦；因为一个人自己的自我既是他的朋友，也同样是他的敌人。",
    english:
      "(A man) should elevate his self by his self; he should not debase his self, for even (a man's) own self is his friend, (a man's) own self is also his enemy.",
    editorialSummary:
      "心可以成为自己的盟友，也可以成为自己的阻力；自我训练首先改变的是内在力量彼此作用的方式。",
    englishEditorialSummary:
      "The mind can become one's ally or one's obstacle; self-discipline first changes how inner forces work upon one another.",
    work: "《薄伽梵歌》",
    englishWork: "Bhagavad Gita",
    presentationNature: "source-excerpt",
    reflection:
      "这里的‘自我’在相邻经文中承担不同层次的含义，不能简单化成‘一切只靠意志’。自我提升仍嵌在瑜伽实践、伦理责任与关系网络中，也不应被用来责怪处于困境的人。",
    englishReflection:
      "‘Self’ operates at more than one level in these adjacent verses and cannot be reduced to ‘willpower solves everything.’ Self-elevation remains embedded in yogic practice, ethical duty, and relationships, and should not be used to blame people in adversity.",
    context:
      "6.1—4先把不执著果报的行动称为修持与弃绝，并区分上升到修持时以行动为手段、达到后以寂静为手段。Telang在6.5脚注把提升方式释为具有真实辨别的心；6.6又说明受制的自我是朋友，未受约束的自我如敌人。",
    englishContext:
      "Verses 6.1–4 identify action without attachment to fruits with devotion and renunciation, distinguishing action as a means while rising to devotion from tranquillity after attaining it. Telang's note to 6.5 glosses the means of elevation as a mind possessed of true discrimination; 6.6 then says the subdued self is a friend and the unrestrained self behaves like an enemy.",
    distinction:
      "重复出现的self不能压成单一的现代“意志力”；Telang相邻脚注涉及心、感官及其约束。“敌人”是训练关系的譬喻，不支持自我仇恨，也不能用来责怪身处疾病、贫困或其他困境的人。",
    englishDistinction:
      "The repeated ‘self’ cannot be collapsed into modern willpower; Telang's adjacent notes distinguish mind, senses, and their restraint. ‘Enemy’ is a metaphor for a relation of discipline, not a warrant for self-hatred or for blaming people facing illness, poverty, or other adversity.",
    question: "你可以怎样调整环境与练习，让心更像盟友而不是审判者？",
    englishQuestion:
      "How might you adjust environment and practice so that the mind acts more as an ally than a judge?",
    sourceLocator: [
      "《薄伽梵歌》6.5；K. T. Telang 1882年《东方圣书》第8卷公版英译，印刷页67—68（PDF第81—82页）；完整连续诗节，保留跨页断句，仅移除脚注序号；中文为项目研读译文",
      "Bhagavad Gita VI.5; K. T. Telang's public-domain translation in Sacred Books of the East, vol. VIII (1882), print pp. 67–68 (PDF pp. 81–82); complete continuous verse across a page break, with only the footnote number removed; Chinese is a project study translation",
    ],
  },
  {
    id: "indian-gita-seeing-action",
    authorId: "bhagavad-gita",
    topic: "认识",
    text: "那位在行动中看见无行动、在无行动中看见行动的人，是人中智者；他具有修持，并履行一切行动。",
    english:
      "He is wise among men, he is possessed of devotion, and performs all actions, who sees inaction in action, and action in inaction.",
    editorialSummary:
      "表面忙碌未必意味着真正行动，表面静止也可能持续产生后果；理解行动，要穿过姿态去看动机、关系与作用。",
    englishEditorialSummary:
      "Visible busyness need not amount to genuine action, while apparent stillness may keep producing effects; understanding action requires looking beyond posture to motive, relation, and consequence.",
    work: "《薄伽梵歌》",
    englishWork: "Bhagavad Gita",
    presentationNature: "source-excerpt",
    reflection:
      "‘于行动中见无行动，于无行动中见行动’位于对业、禁行与错误行动的辨析中。它不是赞美玄妙悖论，而是要求区分动作、执著、义务与业果之间并不重合的层次。",
    englishReflection:
      "‘Seeing inaction in action and action in inaction’ appears within a discrimination among action, prohibited action, and mistaken action. It is not a celebration of paradox for its own sake but a demand to distinguish movement, attachment, duty, and karmic effect.",
    context:
      "4.16先说智者也会困惑何为行动与无行动；4.17区分行动、禁行与无行动，并说行动之理幽深；4.19—23再以无欲、知识与不执著说明为何行动不造成同样的束缚。",
    englishContext:
      "Verse 4.16 says that even sages are confused about action and inaction. Verse 4.17 distinguishes action, prohibited action, and inaction and calls their truth abstruse; 4.19–23 then explain through desirelessness, knowledge, and nonattachment why action need not bind in the same way.",
    distinction:
      "行动与无行动在这里属于业与解脱的辨析，不能简化成日常生产率中的“忙碌／静止”。本句没有逐字谈动机、关系或后果，也不能成为逃避应做之事的悖论式借口。",
    englishDistinction:
      "Action and inaction here belong to an analysis of karma and release, not ordinary productivity or visible busyness versus stillness. This sentence does not itself mention motive, relation, or consequence, and its paradox does not excuse evading required action.",
    question: "你正在用怎样的可见忙碌，掩盖一个真正需要承担的行动？",
    englishQuestion:
      "What visible busyness may be concealing an action you actually need to undertake?",
    sourceLocator: [
      "《薄伽梵歌》4.18；K. T. Telang 1882年《东方圣书》第8卷公版英译，印刷页60（PDF第74页）；完整连续诗节，仅移除actions后的脚注序号；中文为项目研读译文",
      "Bhagavad Gita IV.18; K. T. Telang's public-domain translation in Sacred Books of the East, vol. VIII (1882), print p. 60 (PDF p. 74); complete continuous verse, with only the footnote number after ‘actions’ removed; Chinese is a project study translation",
    ],
  },

  {
    id: "indian-buddha-middle-way",
    authorId: "early-buddhism",
    topic: "解脱",
    text: "什么是那条中道修行？就是这八支圣道，即：正见、正思惟、正语、正业、正命、正精进、正念与正定。",
    english:
      "And what is that middle way of practice? It is simply this noble eightfold path, that is: right view, right purpose, right speech, right action, right livelihood, right effort, right mindfulness, and right immersion.",
    editorialSummary:
      "修行不必在感官放纵与自我折磨之间摆动；中道是一套可实践、可检验的道路，而不是凡事折中。",
    englishEditorialSummary:
      "Practice need not swing between sensual indulgence and self-mortification; the middle way is a testable path of cultivation, not compromise in every dispute.",
    work: "《转法轮经》",
    englishWork: "Rolling Forth the Wheel of Dhamma (SN 56.11)",
    presentationNature: "source-excerpt",
    reflection:
      "经文先拒绝两种极端，再以八支圣道具体说明中道，所以它不是没有立场的温和主义。其判断标准是能否导向理解、止息与解脱，而非在两个选项之间机械取平均。",
    englishReflection:
      "The discourse rejects two extremes and then specifies the middle way as the noble eightfold path, so it is not positionless moderation. Its criterion is whether a practice conduces to understanding, cessation, and liberation, not whether it takes an arithmetic midpoint.",
    context:
      "《相应部》56.11的叙事先让经中佛陀向五位出家人拒绝感官享乐与自我折磨两极（2.1—2.4），随即在3.1—3.3用本引句把中道具体认作八支圣道；3.4再说这条道路导向寂静、直接证知、觉醒与涅槃。",
    englishContext:
      "In the narrative of SN 56.11, the Buddha of the discourse first rejects sensual indulgence and self-mortification when addressing the five mendicants (2.1–2.4). Segments 3.1–3.3 then identify the middle way as the noble eightfold path; 3.4 again says that it leads to peace, direct knowledge, awakening, and extinguishment.",
    distinction:
      "本句给出这部经中特定的修行道路，不是遇到任何争议都折中，也没有把中道定义为可随意选择的温和态度。英文字句是Sujato对巴利语经典叙事话语的现代译文，不能当作可独立验证的历史佛陀逐字记录。",
    englishDistinction:
      "The sentence identifies a specific path of practice in this discourse; it neither recommends compromise in every dispute nor defines the middle way as an optional moderate attitude. The English is Sujato's modern translation of canonical Pali discourse, not an independently verifiable verbatim transcript of the historical Buddha.",
    question: "你面对的两个极端，是否共同接受了一个未经检查的前提？",
    englishQuestion:
      "Do the two extremes before you share an assumption that has not been examined?",
    sourceLocator: [
      "《相应部》56.11（《转法轮经》）第3.1—3.3段；Bhikkhu Sujato 2018年SuttaCentral CC0英译；三个连续段构成完整问答，英文照录，中文为项目研读译文",
      "Saṁyutta Nikāya 56.11 (Rolling Forth the Wheel of Dhamma), segments 3.1–3.3; Bhikkhu Sujato's 2018 SuttaCentral CC0 translation; three consecutive segments forming a complete question-and-answer, English quoted verbatim and Chinese rendered as a project study translation",
    ],
  },
  {
    id: "indian-buddha-four-truths",
    authorId: "early-buddhism",
    topic: "因果",
    text: "只要我对这四圣谛的真实知见尚未在三转十二行相中完全清净，我就没有在这个有诸神、魔罗与神灵，以及有苦行者、婆罗门、诸神和人类的世界中宣称自己已经证得无上正等觉。",
    english:
      "As long as my true knowledge and vision about these four noble truths was not fully purified in these three rounds and twelve aspects, I didn’t announce my supreme perfect awakening in this world with its gods, Māras, and divinities, this population with its ascetics and brahmins, its gods and humans.",
    editorialSummary:
      "痛苦不仅要被承受，还可以被分解为现象、生成条件、止息可能与实践路径。",
    englishEditorialSummary:
      "Suffering need not only be endured; it can be analyzed as a phenomenon, its conditions of arising, the possibility of cessation, and a path of practice.",
    work: "《转法轮经》",
    englishWork: "Rolling Forth the Wheel of Dhamma (SN 56.11)",
    presentationNature: "source-excerpt",
    reflection:
      "四圣谛把苦从笼统悲观改造成四项不同任务：理解、舍断、实现与修习。‘一切皆苦’的流行概括会遮蔽经文的诊断结构，也忽略止息是论证的一部分。",
    englishReflection:
      "The four truths transform suffering from generalized pessimism into four distinct tasks: understand, abandon, realize, and cultivate. The slogan ‘all is suffering’ obscures this diagnostic structure and forgets that cessation is integral to the account.",
    context:
      "《相应部》56.11先在4.1—4.10依次说明苦、苦的起源、苦的止息及导向止息的修行；5.1—8.3又让经中说话者对每一谛分别陈述认知、应做任务与任务完成。9.1的本句把这一结构总称为三转十二行相，并把它设为宣称觉醒之前知见须完全清净的条件。",
    englishContext:
      "SN 56.11 first sets out suffering, its origin, its cessation, and the practice leading to cessation at 4.1–4.10. At 5.1–8.3 the discourse speaker treats each truth in turn as recognition, a task to be done, and the task completed. The quoted sentence at 9.1 calls this structure three rounds and twelve aspects and makes its full purification a condition for announcing awakening.",
    distinction:
      "本句本身只总括四谛的三转十二行相；四项定义与‘理解、舍断、实现、修习’的任务分别在前段展开。它不等于‘一切皆苦’的口号。第一人称属于巴利经典的叙事话语，不是可独立认证的历史录音式原话。",
    englishDistinction:
      "The sentence itself summarizes the three rounds and twelve aspects; the four definitions and the tasks of understanding, giving up, realizing, and developing are supplied by the preceding segments. It is not the slogan ‘everything is suffering.’ Its first-person voice belongs to the Pali canonical discourse, not to an independently authenticated historical recording.",
    question: "你能否把一种困扰分别写成经验、条件、可止息处与下一步练习？",
    englishQuestion:
      "Can you describe a difficulty separately as experience, conditions, a point of cessation, and a next practice?",
    sourceLocator: [
      "《相应部》56.11（《转法轮经》）第9.1段；Bhikkhu Sujato 2018年SuttaCentral CC0英译；完整连续句，英文照录，中文为项目研读译文",
      "Saṁyutta Nikāya 56.11 (Rolling Forth the Wheel of Dhamma), segment 9.1; Bhikkhu Sujato's 2018 SuttaCentral CC0 translation; complete continuous sentence quoted verbatim in English, with a project Chinese study translation",
    ],
  },
  {
    id: "indian-buddha-dependent-arising",
    authorId: "early-buddhism",
    topic: "因果",
    text: "所以，此存在时，彼便发生；由于此生起，彼便生起。此不存在时，彼便不发生；由于此止息，彼便止息。",
    english:
      "So, when this exists, this comes to be; due to the arising of this, this arises. When this doesn’t exist, this doesn’t come to be; due to the cessation of this, this ceases.",
    editorialSummary:
      "经验不是由孤立实体单独发动；某些条件出现，相关过程便生起，条件止息，过程也随之改变。",
    englishEditorialSummary:
      "Experience is not set in motion by isolated entities alone; when relevant conditions arise, processes arise with them, and when those conditions cease, the processes change.",
    work: "《自说经》“觉醒（三）”",
    englishWork: "Upon Awakening (3rd) (Udāna 1.3)",
    presentationNature: "source-excerpt",
    reflection:
      "缘起公式在此被顺观与逆观，用来说明苦的发生和止息。它不是一句‘万物彼此相连’的泛泛格言，而是一种要求辨认具体条件序列及其可中断处的分析。",
    englishReflection:
      "Dependent arising is contemplated here in forward and reverse order to explain the arising and cessation of suffering. It is not the vague maxim that everything is connected, but an analysis requiring specific sequences of conditions and possible points of interruption.",
    context:
      "《自说经》1.3的叙事把场景放在觉醒后：经中佛陀于后夜顺逆观缘起（1.2—1.4）。2.1—2.2先给出本引句的条件公式，2.3—2.14再从无明至老死列出顺向链条；3.1—3.12以相反次序写出整团苦的止息。",
    englishContext:
      "The narrative of Udāna 1.3 places the scene after awakening and says that the Buddha of the text attended to dependent origination with and against the grain in the last watch (1.2–1.4). Segments 2.1–2.2 give the quoted conditional formula; 2.3–2.14 then trace the forward sequence from ignorance to old age and death, and 3.1–3.12 state the cessation of the whole mass of suffering in reverse order.",
    distinction:
      "公式中的‘此’随即由具体支分填充，不能只改写成‘万物彼此相连’；它也没有以现代逻辑术语单独判定所有条件都是充分条件或必要条件。觉醒后的场景与话语属于经典叙事，不是可独立核实的历史逐字记录。",
    englishDistinction:
      "The formula's ‘this’ is immediately filled out by a specific sequence, so it should not be diluted into the maxim that everything is connected. Nor does it classify every condition as necessary or sufficient in modern logical terms. The post-awakening scene and speech are canonical narrative, not an independently verifiable verbatim historical record.",
    question: "维持当前困境的关键条件是哪一个，而不是应被责怪的单一对象是谁？",
    englishQuestion:
      "Which condition sustains the present difficulty, rather than which single object deserves blame?",
    sourceLocator: [
      "《自说经》1.3第2.1段至第2.2段第一句；Bhikkhu Sujato 2021年SuttaCentral CC0英译；连续两句，止于随后“也就是：”之前，独立呈现时规范对话引号；英文词句不变，中文为项目研读译文",
      "Udāna 1.3, segment 2.1 through the first sentence of 2.2; Bhikkhu Sujato's 2021 SuttaCentral CC0 translation; two consecutive sentences ending before the following ‘That is:’, with dialogue quotation marks normalized for standalone display; English wording unchanged and Chinese rendered as a project study translation",
    ],
  },
  {
    id: "indian-buddha-not-self",
    authorId: "early-buddhism",
    topic: "自我",
    text: "“色是常还是无常？”“无常，尊者。”“但若它无常，它是苦还是乐？”“苦，尊者。”“但若它无常、苦、会坏灭，适合把它看作：‘这是我的，我就是这个，这就是我的自我’吗？”“不，尊者。”",
    english:
      "“Is form permanent or impermanent?” “Impermanent, sir.” “But if it’s impermanent, is it suffering or happiness?” “Suffering, sir.” “But if it’s impermanent, suffering, and perishable, is it fit to be regarded thus: ‘This is mine, I am this, this is my self’?” “No, sir.”",
    editorialSummary:
      "凡是无常、受条件支配并带来不安的身心过程，都不足以被稳固占有为‘这就是我’。",
    englishEditorialSummary:
      "Any bodily or mental process that is impermanent, conditioned, and liable to distress is inadequate as something securely possessed as ‘this is what I am.’",
    work: "《无我相经》",
    englishWork: "The Characteristic of Not-Self (SN 22.59)",
    presentationNature: "source-excerpt",
    reflection:
      "经文依次检视色、受、想、行、识，并以不可随意命令和无常来松动认同。它的直接目标是解除执取，而不是草率建立‘人根本不存在’的形而上学口号。",
    englishReflection:
      "The discourse examines form, feeling, perception, formations, and consciousness, loosening identification through their uncontrollability and impermanence. Its immediate aim is release from clinging, not the hurried metaphysical slogan that persons simply do not exist.",
    context:
      "《相应部》22.59先以无法命令五蕴如愿改变来论述非我（2.1—5.5）。6.2—6.18随后对色、受、想、行、识逐一追问常与无常、苦与乐，以及是否适合认作“我的、我、我的自我”；本引句是对色的第一组完整问答。7.1—11.3再把如实观照连接到离欲与解脱。",
    englishContext:
      "SN 22.59 first argues from the inability to compel the five aggregates to change at will (2.1–5.5). Segments 6.2–6.18 then ask of form, feeling, perception, choices, and consciousness whether each is permanent or impermanent, suffering or happiness, and fit to be regarded as mine, me, or my self. The excerpt is the first complete exchange, concerning form. Segments 7.1–11.3 connect such seeing with disillusionment, fading of desire, and freedom.",
    distinction:
      "问答检验的是把五蕴据为‘我的、我、我的自我’是否合适；它没有用一句话证明日常人格不存在，也没有把‘非我’说成另一种隐藏本体。引句是Sujato对巴利经典对话的译文，不能当作历史佛陀发言的独立逐字鉴定。",
    englishDistinction:
      "The exchange tests whether the aggregates are fit to be appropriated as mine, me, or my self. It does not prove in one sentence that everyday persons do not exist, nor does it turn not-self into another hidden substance. The quotation is Sujato's translation of canonical Pali dialogue, not an independent verbatim authentication of historical speech.",
    question: "你正把哪一种会变化的感受或角色，当成不可失去的自我本体？",
    englishQuestion:
      "Which changing feeling or role are you treating as an indispensable essence of self?",
    sourceLocator: [
      "《相应部》22.59（《无我相经》）第6.2—6.8段；Bhikkhu Sujato 2018年SuttaCentral CC0英译；七个连续段构成关于色的完整问答，卡片为独立呈现补足开头对话引号，英文词句不变，中文为项目研读译文",
      "Saṁyutta Nikāya 22.59 (The Characteristic of Not-Self), segments 6.2–6.8; Bhikkhu Sujato's 2018 SuttaCentral CC0 translation; seven consecutive segments forming the complete exchange about form, with the opening dialogue mark supplied for standalone display, English wording unchanged and Chinese rendered as a project study translation",
    ],
  },
  {
    id: "indian-buddha-kalama",
    authorId: "early-buddhism",
    topic: "认识",
    text: "但当你们亲自知道：‘这些事不善、应受责备、被明智之人批评，而且在实行时会导向伤害和痛苦’，那时就应当放下它们。",
    english:
      "But when you know for yourselves: ‘These things are unskillful, blameworthy, criticized by sensible people, and when you undertake them, they lead to harm and suffering’, then you should give them up.",
    editorialSummary:
      "传统、传闻、典籍、推演与师长威望都不能单独终结判断；还要考察一种教导在实践中是否导向伤害或福祉。",
    englishEditorialSummary:
      "Tradition, report, scripture, inference, and a teacher's prestige cannot by themselves end inquiry; a teaching must also be examined for whether its practice leads to harm or welfare.",
    work: "《迦罗摩经》",
    englishWork: "With the Kālāmas of Kesamutta (AN 3.65)",
    presentationNature: "source-excerpt",
    reflection:
      "经文不是让每个人只相信个人感觉：判断同时借助对贪、嗔、痴后果的共同识别，并接受智者评价。它扩大了检验责任，却没有把证据标准缩成‘对我有用就是真的’。",
    englishReflection:
      "The discourse does not tell everyone to trust private feeling alone: judgment also draws on shared recognition of the consequences of greed, hatred, and delusion and on the assessment of the wise. It enlarges responsibility for testing without reducing truth to ‘whatever works for me.’",
    context:
      "《增支部》3.65先让迦罗摩人说明各派教师相互贬斥造成的疑惑（3.1—3.8）。4.1列出传承、经典权威、逻辑、推论、反思后接受观点、看似有能力及师长威望等十种不能单独凭借的根据；4.2—4.3给出本引句的负面检验。5—24以贪、嗔、痴及其行为后果展开，26.1—26.3则以明智者赞许、福祉与幸福给出正面版本。",
    englishContext:
      "AN 3.65 first has the Kālāmas describe their uncertainty when rival teachers disparage one another (3.1–3.8). Segment 4.1 lists ten grounds that cannot carry the judgment by themselves, including lineage, canonical authority, logic, inference, acceptance after deliberation, apparent competence, and teacherly prestige. Segments 4.2–4.3 give the quoted negative test. Sections 5–24 work through greed, hate, delusion, and consequences; 26.1–26.3 gives the positive version in terms of praise by sensible people, welfare, and happiness.",
    distinction:
      "‘亲自知道’并非只信私人感觉：引句同时要求明智者的评价与可观察的伤害后果。它也不是宣布逻辑、推论或经典永远无用，而是拒绝让其中任何一项在争议情境中单独终结判断。这是经典对话中的教导，不是历史人物逐字发言的独立认证。",
    englishDistinction:
      "‘Know for yourselves’ does not mean trust private feeling alone: the sentence also invokes the assessment of sensible people and observable harmful consequences. Nor does it declare logic, inference, or scripture always useless; it refuses to let any one of them settle this contested case by itself. This is teaching within canonical dialogue, not an independent authentication of a historical figure's verbatim speech.",
    question:
      "你接受一个观点，是因为它经得起后果检验，还是因为它来自熟悉或权威的声音？",
    englishQuestion:
      "Do you accept a view because its consequences withstand examination, or because it comes in a familiar or authoritative voice?",
    sourceLocator: [
      "《增支部》3.65（《与羁舍子迦罗摩人经》）第4.2—4.3段；Bhikkhu Sujato 2018年SuttaCentral CC0英译；两个连续段构成完整条件句，英文照录，中文为项目研读译文",
      "Aṅguttara Nikāya 3.65 (With the Kālāmas of Kesamutta), segments 4.2–4.3; Bhikkhu Sujato's 2018 SuttaCentral CC0 translation; two consecutive segments forming the complete conditional sentence, English quoted verbatim and Chinese rendered as a project study translation",
    ],
  },
  {
    id: "indian-buddha-metta",
    authorId: "early-buddhism",
    topic: "伦理",
    text: "以对整个世界的慈爱，展开无量之心：向上、向下、四方周遍，不受拘限，不怀敌意，也无仇怨。",
    english:
      "With love for the whole world, unfold a boundless heart: above, below, all round, unconstricted, without enmity or foe.",
    editorialSummary:
      "慈心不是只给亲近者的情绪，而是一种训练：让愿众生安稳的关切不被方向、距离和身份边界截断。",
    englishEditorialSummary:
      "Loving-kindness is not a feeling reserved for intimates but a training in which concern for beings' safety is not cut off by direction, distance, or identity.",
    work: "《慈经》",
    englishWork: "The Discourse on Love (Sutta Nipāta 1.8)",
    presentationNature: "source-excerpt",
    reflection:
      "经文先列出诚实、易教、知足等生活条件，再把慈心扩展到一切众生。慈不等于同意所有行为，也不代替防止伤害所需的边界与制度。",
    englishReflection:
      "The discourse first names practical qualities such as honesty, teachability, and contentment, then extends loving-kindness to all beings. Goodwill does not mean approving every action, nor does it replace boundaries and institutions needed to prevent harm.",
    context:
      "《经集》1.8先列出正直、温和、知足、生活轻简等修持条件（1.1—3.2），再祝愿一切众生幸福安全（3.3—5.4），并要求不欺骗、不轻蔑、不愿彼此受苦（6.1—6.4）。第7颂以母护独子比喻无量心，本引句的第8颂把它向上、向下、四方展开；第9颂要求在站立、行走、坐卧时持续忆持。",
    englishContext:
      "Sutta Nipāta 1.8 first names uprightness, gentleness, contentment, and light living as conditions of practice (1.1–3.2), then wishes happiness and safety for all beings (3.3–5.4) and rejects deception, contempt, and wishing pain on others (6.1–6.4). Verse 7 compares the boundless heart to a mother's protection of her only child. The quoted verse 8 extends it above, below, and all round; verse 9 asks that it be kept in mind while standing, walking, sitting, or lying down.",
    distinction:
      "本偈要求扩展慈爱与无敌意之心，却没有说必须赞同一切行为，也没有讨论防止伤害所需的具体边界或制度；后两项是卡片的现实应用提醒。它属于巴利《经集》的经典诗偈，现代英译不能证明其措辞是历史佛陀逐字说出。",
    englishDistinction:
      "The verse extends love and a heart free of enmity, but it does not require approval of every action or discuss concrete boundaries and institutions for preventing harm; those are the card's practical cautions. It is canonical Pali verse, and a modern English translation cannot prove that its wording was spoken verbatim by the historical Buddha.",
    question: "你能否在拒绝一种伤害行为时，仍不把行为者排除出人的共同关切？",
    englishQuestion:
      "Can you reject a harmful action without excluding its agent from shared human concern?",
    sourceLocator: [
      "《经集》1.8（《慈经》）第150颂、第8.1—8.4段；Bhikkhu Sujato 2021年SuttaCentral CC0英译；完整连续四行，卡片仅把换行规范为空格，英文词句不变，中文为项目研读译文",
      "Sutta Nipāta 1.8 (The Discourse on Love), verse 150, segments 8.1–8.4; Bhikkhu Sujato's 2021 SuttaCentral CC0 translation; complete four consecutive lines, with line breaks normalized to spaces on the card, English wording unchanged and Chinese rendered as a project study translation",
    ],
  },

  {
    id: "indian-jain-three-jewels",
    authorId: "mahavira",
    topic: "解脱",
    text: "正信、（正）知与（正）行——这三者（共同构成）解脱之路。",
    english:
      "Right belief, (right) knowledge, (right) conduct, these (together constitute) the path to liberation.",
    editorialSummary:
      "解脱之路需要正见、正知与正行共同构成；只持有正确观念，却不改变理解和行为，仍不是完整道路。",
    englishEditorialSummary:
      "The path to liberation is formed jointly by right worldview, right knowledge, and right conduct; correct opinions without transformed understanding and action remain incomplete.",
    work: "《谛义证得经》",
    englishWork: "Tattvartha Sutra",
    presentationNature: "source-excerpt",
    reflection:
      "开篇把三宝列为解脱道，避免把修行缩减成纯理论、纯信仰或纯行为。‘正’在此属于耆那教完整的认识论和伦理体系，并非泛指对任何既定权威的服从。",
    englishReflection:
      "The opening defines the three jewels together as the path to liberation, preventing practice from being reduced to theory, faith, or behavior alone. ‘Right’ belongs to a specifically Jain epistemic and ethical system, not to generic obedience toward established authority.",
    context:
      "这是Jaini本《谛义证得经》的开篇经句。紧随其后的注释称正信、正知、正行为‘三宝’，说明每一项都有主体、对象与方法，并强调三者必须同时追求；第1.2才开始界定何谓正信。",
    englishContext:
      "This is the opening sutra in Jaini's edition. The commentary immediately calls right belief, right knowledge, and right conduct the ‘three gems,’ notes that each has a subject, object, and means, and insists that all three must be pursued simultaneously; 1.2 then begins to define right belief.",
    distinction:
      "本句只把三项合称为解脱道，没有说一般意义上的‘正确意见’本身足够，也没有提出卡片问题中的现代价值一致性测试。‘正信’等术语要由本经后文的耆那教义界定；这部较晚的系统论著传统上归于乌玛斯瓦蒂／乌玛斯瓦明，不能当作历史大雄逐字发言。",
    englishDistinction:
      "The sentence names the three together as the path; it does not say that ordinary ‘correct opinions’ suffice or formulate the card's modern test of value-consistency. The Jain senses of the three terms are defined later in the work. This later systematic treatise is traditionally attributed to Umāsvāti/Umāsvāmin and is not a verbatim saying of the historical Mahavira.",
    question: "你认同的价值，是否已经同时进入理解方式与日常行动？",
    englishQuestion:
      "Have the values you endorse entered both your way of understanding and your everyday conduct?",
    sourceLocator: [
      "《谛义证得经》1.1；J. L. Jaini 1920年公版英译，印刷页1（扫描/PDF第22页）；完整连续一句，仅合并排印换行，英文括号与措辞保留，中文为项目研读译文",
      "Tattvarthadhigama Sutra 1.1; J. L. Jaini's public-domain English translation (1920), print p. 1 (scan/PDF p. 22); one complete continuous sentence, with lineation only normalized, English parentheses and wording retained, and Chinese rendered as a project study translation",
    ],
  },
  {
    id: "indian-jain-living-beings",
    authorId: "mahavira",
    topic: "伦理",
    text: "一切众生都眷恋生命，喜爱快乐，厌恶痛苦，躲避毁灭，热爱生命，渴望活下去。",
    english:
      "All beings are fond of life, like pleasure, hate pain, shun destruction, like life, long to live.",
    editorialSummary:
      "生命以不同形态感受伤害并趋向存续；在行动前辨认这种共同脆弱性，是不害的起点。",
    englishEditorialSummary:
      "Living beings experience injury in different forms and incline toward continued life; recognizing this shared vulnerability before acting is the beginning of nonviolence.",
    work: "《阿遮罗央经》",
    englishWork: "Acaranga Sutra",
    presentationNature: "source-excerpt",
    reflection:
      "经文通过土、水、火、风与植物等生命分类扩展道德注意，要求修行者看见通常被忽略的伤害。不害并非声称所有选择都能避免影响，而是把谨慎、节制和减少伤害变成持续纪律。",
    englishReflection:
      "The text extends moral attention through classifications of earth-, water-, fire-, air-, and plant-bodied life, asking practitioners to see injuries usually ignored. Nonviolence does not claim that every impact can be avoided; it makes care, restraint, and harm reduction an ongoing discipline.",
    context:
      "第一篇第二讲第三课先以高低出身、疾病与轮回削弱身份自夸，又说拥有田宅者因财物而眷恋生活。第4段在‘死亡无物不可及’之后给出本句，随后转入财富、雇用人畜与积聚如何把人重新卷入伤害。",
    englishContext:
      "Book I, Lecture 2, Lesson 3 first uses high and low birth, disability, and rebirth to unsettle pride in status, then describes householders attached to life through fields and possessions. Paragraph 4 places this sentence directly after the claim that nothing is inaccessible to death, before returning to wealth, the employment of humans and animals, and renewed injury.",
    distinction:
      "本句确切陈述众生趋生、趋乐、避苦；‘共同脆弱性是不害的起点’是编辑性概括。土、水、火、风、植物等生命分类来自《阿遮罗央经》第一篇更广的论述，并不都列在本段。Jacobi译的是经典文本，不能由此证明这些英语措辞是历史大雄逐字所说。",
    englishDistinction:
      "The sentence specifically says that beings seek life and pleasure and avoid pain and destruction; ‘shared vulnerability as the beginning of nonviolence’ is an editorial synthesis. The classifications of earth-, water-, fire-, air-, and plant-bodied life belong to the wider Book I, not to this paragraph itself. Jacobi translates a canonical text; the English wording is not a provable verbatim utterance of the historical Mahavira.",
    question: "你的便利依赖哪些通常不会进入视野的生命与代价？",
    englishQuestion:
      "Which lives and costs usually remain invisible behind your convenience?",
    sourceLocator: [
      "《阿遮罗央经》第一篇第二讲第三课第4段；Hermann Jacobi 1884年《东方圣书》第22卷公版英译，印刷页19（扫描/PDF第79页）；完整连续一句，仅省去脚注号并合并排印换行，中文为项目研读译文",
      "Acaranga Sutra, Book I, Lecture 2, Lesson 3, paragraph 4; Hermann Jacobi's public-domain translation in Sacred Books of the East, vol. XXII (1884), print p. 19 (scan/PDF p. 79); one complete continuous sentence, with only the footnote marker removed and lineation normalized, and Chinese rendered as a project study translation",
    ],
  },
  {
    id: "indian-jain-mutual-support",
    authorId: "mahavira",
    topic: "伦理",
    text: "灵魂（即世俗灵魂）的功能，是彼此扶助。",
    english:
      "(The function) of souls, (i.e., mundane souls is to) support each other.",
    editorialSummary:
      "生命彼此提供条件与支持；个体能够生存，并不等于个体可以脱离其他生命而被完整理解。",
    englishEditorialSummary:
      "Living beings provide conditions and support for one another; an individual's survival does not mean that the individual can be fully understood apart from other life.",
    work: "《谛义证得经》",
    englishWork: "Tattvartha Sutra",
    presentationNature: "source-excerpt",
    reflection:
      "‘众生相互扶助’位于对生命范畴及其关系的讨论中，常被视为耆那教生态伦理的重要资源。它不把自然关系浪漫化为全然和谐，因为相互依存同样包含竞争、摄取与不可避免的影响。",
    englishReflection:
      "‘Living beings support one another’ occurs within an account of living categories and their relations and has become a major resource for Jain environmental ethics. It does not romanticize nature as perfect harmony, since interdependence also includes competition, consumption, and unavoidable impact.",
    context:
      "第五章在逐项说明实有范畴的功能：5.17谈运动与静止的媒介，5.18谈空间，5.19—20谈物质及其使世俗享乐、痛苦、生死成为可能的作用。5.21转到世俗灵魂的相互扶助，Jaini的随文说明以农人供粮、织工制衣为例；5.22继而讨论时间。",
    englishContext:
      "Chapter 5 is assigning functions to categories of reality: 5.17 treats the media of motion and rest, 5.18 space, and 5.19–20 matter and its role in making worldly pleasure, pain, life, and death possible. Sutra 5.21 turns to mutual support among mundane souls, which Jaini illustrates with the peasant supplying grain and the weaver making clothes; 5.22 then treats time.",
    distinction:
      "经句说的是世俗灵魂‘彼此扶助’，没有声称所有自然关系都和谐，也没有直接提出一套现代生态政策。卡片原先关于个体不可脱离其他生命而理解的说法，是从这句向关系本体论与生态伦理作出的编辑性延伸。",
    englishDistinction:
      "The sutra says that mundane souls ‘support each other’; it does not claim that every natural relation is harmonious or directly propose a modern environmental policy. The card's broader claim that an individual cannot be understood apart from other life is an editorial extension toward relational ontology and ecological ethics.",
    question: "如果把相互依存纳入决策，你会重新计算哪一种成本？",
    englishQuestion:
      "Which cost would you recalculate if interdependence entered the decision?",
    sourceLocator: [
      "《谛义证得经》5.21；J. L. Jaini 1920年公版英译，印刷页117（扫描/PDF第138页）；完整连续一句，仅合并排印换行，英文括号保留，中文为项目研读译文",
      "Tattvarthadhigama Sutra 5.21; J. L. Jaini's public-domain English translation (1920), print p. 117 (scan/PDF p. 138); one complete continuous sentence, with lineation only normalized, English parentheses retained, and Chinese rendered as a project study translation",
    ],
  },
  {
    id: "indian-jain-change-persistence",
    authorId: "mahavira",
    topic: "辩证",
    text: "‘实有’同时具有：生起（出生）、灭去（衰变）与恒常（存在之连续同一、持存）。",
    english:
      "Sat (is a) simultaneous possession (of) Utpāda, coming into existence, birth, Vyaya, going out of existence, decay, and Drauvya, continuous sameness of existence, permanence.",
    editorialSummary:
      "真实事物可以在某些方面生起、在某些方面消逝，同时在另一些方面保持延续；变化与持存不必互相取消。",
    englishEditorialSummary:
      "A real thing may arise in some respects, cease in others, and persist in still others; change and endurance need not cancel one another.",
    work: "《谛义证得经》",
    englishWork: "Tattvartha Sutra",
    presentationNature: "source-excerpt",
    reflection:
      "经文以生、灭、常三项共同界定实有，为多面论提供本体论背景。同一对象的不同性质和样态需要分别说明，这不意味着任意相反说法都同样正确。",
    englishReflection:
      "The sutra characterizes reality through origination, cessation, and persistence together, supplying an ontological background for many-sided analysis. Different properties and modes of one object require distinct qualifications; this does not make arbitrary contradictions equally true.",
    context:
      "Jaini本5.29先把实体的特征说成sat（实有、存在性），5.30再用生起、灭去与恒常三项解释sat。5.31把恒常说明为实体本质或性质的不可毁坏，5.32则说描述同一实体时须让不可毁本质与可变状态分别居于主要、次要位置。",
    englishContext:
      "In Jaini's edition, 5.29 first identifies sat—being or isness—as the differentia of substance, and 5.30 explains sat through origination, disappearance, and permanence. Sutra 5.31 relates permanence to the indestructibility of a substance's essence or quality, while 5.32 assigns primary and secondary places to its enduring essence and changeable condition when describing it.",
    distinction:
      "旧定位5.29反映另一常见编次；Jaini 1920年所据的Digambara经本在前面另列‘实体以sat为特征’，故本公式编号为5.30。经句把三项并置，却没有直接说任意矛盾命题都成立；‘在某些方面’是结合后文主次方面所作的解释性限定。",
    englishDistinction:
      "The former locator 5.29 reflects another common numbering. In the Digambara recension printed by Jaini, an additional preceding sutra states that substance is characterized by sat, so this formula is numbered 5.30. The sutra coordinates three features but does not license arbitrary contradictions; ‘in some respects’ is an interpretive qualification informed by the following treatment of primary and secondary aspects.",
    question: "你面对的变化中，什么已经终止，什么正在产生，又有什么仍在延续？",
    englishQuestion:
      "Within the change you face, what has ceased, what is arising, and what continues?",
    sourceLocator: [
      "《谛义证得经》5.30（Jaini所据Digambara编次；其他常见编次作5.29）；J. L. Jaini 1920年公版英译，印刷页120（扫描/PDF第141页）；完整连续译文，保留术语与括号，仅合并断行和跨行连字符，中文为项目研读译文",
      "Tattvarthadhigama Sutra 5.30 in Jaini's Digambara numbering (5.29 in another common numbering); J. L. Jaini's public-domain English translation (1920), print p. 120 (scan/PDF p. 141); complete continuous translation, with terms and parentheses retained and only lineation and a line-end hyphen normalized, and Chinese rendered as a project study translation",
    ],
  },
  {
    id: "indian-jain-karmic-bondage",
    authorId: "mahavira",
    topic: "因果",
    text: "灵魂因带有激情，便吸收适合形成业的物质；这就是束缚。",
    english:
      "The soul, owing to its being with passion, assimilates matter which is fit to form karmas. This (is) bondage.",
    editorialSummary:
      "行为之所以形成束缚，不只因为外在动作，还因为错误认识、不节制、疏忽与激情改变了行动者与后果相接的方式。",
    englishEditorialSummary:
      "Action becomes bondage not through outward movement alone but because false understanding, non-restraint, negligence, and passion alter how the agent connects with consequences.",
    work: "《谛义证得经》",
    englishWork: "Tattvartha Sutra",
    presentationNature: "source-excerpt",
    reflection:
      "耆那教把业理解为与灵魂结合的微细物质过程，并细分流入、束缚、阻止与消除。旧命题的编辑性概括保留其道德心理结构，却不能把业直接等同于现代习惯形成或简单的善恶报应。",
    englishReflection:
      "Jainism understands karma as a subtle material process binding to the soul and distinguishes influx, bondage, stoppage, and shedding. The former editorial synthesis retains its moral psychology but should not identify karma directly with modern habit formation or simple reward and punishment.",
    context:
      "第8章讨论业缚。8.1列出邪见、不持誓、疏忽、激情与身心言活动／振动等五类原因；8.2随即说明，带有激情的灵魂吸收能够形成业的物质，这一结合就是束缚。后续经句再区分束缚的性质、期限、强度与数量。",
    englishContext:
      "Chapter 8 treats karmic bondage. Sutra 8.1 lists five classes of causes—wrong belief, vowlessness, carelessness, passions, and activity or vibration through mind, body, and speech. Sutra 8.2 then says that a soul accompanied by passion assimilates matter fit to form karma and calls that conjunction bondage; later sutras distinguish its nature, duration, intensity, and quantity.",
    distinction:
      "主引句来自8.2，明确说的是灵魂吸收业物质；旧宽命题综合了8.1的原因表与8.2的机制，留在editorialSummary而不冒充逐句翻译。这里的‘物质’在耆那教业论中是本体论主张，不只是现代心理习惯或后果的比喻。",
    englishDistinction:
      "The main excerpt is 8.2 and specifically says that the soul assimilates karmic matter. The former broad proposition combines the causal list in 8.1 with the mechanism in 8.2 and therefore remains an editorial summary rather than a line-by-line translation. ‘Matter’ is an ontological claim in Jain karma theory, not merely a metaphor for modern habits or consequences.",
    question: "同一个动作在怎样的动机与激情下，会形成完全不同的长期束缚？",
    englishQuestion:
      "Under which motives and passions can the same outward act create very different long-term bondage?",
    sourceLocator: [
      "《谛义证得经》8.2；J. L. Jaini 1920年公版英译，印刷页157（扫描/PDF第178页）；连续完整两句，仅合并排印换行并省去‘bondage’前重复的天城体词头，中文为项目研读译文",
      "Tattvarthadhigama Sutra 8.2; J. L. Jaini's public-domain English translation (1920), print p. 157 (scan/PDF p. 178); two complete continuous sentences, with lineation normalized and the repeated Devanagari headword before ‘bondage’ omitted, and Chinese rendered as a project study translation",
    ],
  },
  {
    id: "indian-jain-five-vows",
    authorId: "mahavira",
    topic: "伦理",
    text: "誓愿就是远离：（1）伤害，（2）虚假，（3）偷盗，（4）不贞，以及（5）世俗执著（或世俗对象）。",
    english:
      "Vrata or vow is to be free from — (1) Himsā, injury, (2) Anrita, falsehood, (3) Steya, theft; (4) Abrahma, unchastity; and (5) Parigraha, worldly attachment, (or worldly objects)",
    editorialSummary:
      "不害、真实、不偷取、节制与不占有不是彼此孤立的禁令，而是共同减少欲望如何把他者变成工具。",
    englishEditorialSummary:
      "Nonviolence, truthfulness, non-stealing, sexual restraint, and non-possession are not isolated prohibitions; together they reduce the ways desire turns others into instruments.",
    work: "《谛义证得经》",
    englishWork: "Tattvartha Sutra",
    presentationNature: "source-excerpt",
    reflection:
      "五誓在出家者与在家者生活中有不同严格程度，不能把极端禁欲要求无差别套用于所有人。它们的共同方向是约束占取与伤害，并让行动者持续检查自己造成的影响。",
    englishReflection:
      "The five vows are observed with different degrees of strictness by mendicants and householders, so radical ascetic demands should not be imposed indiscriminately. Their shared direction is to constrain appropriation and harm while keeping the agent attentive to impact.",
    context:
      "第七章以本句列出五项誓愿对象。紧接的7.2把誓愿分为在家者的部分誓（anuvrata）与出家者的完全誓（mahāvrata），7.3以后则为每一誓愿安排五类反复观修；因此同一列表在不同生活身份中并非同一严格度。",
    englishContext:
      "Chapter 7 opens with this fivefold list. Sutra 7.2 immediately distinguishes the householder's partial vow (anuvrata) from the mendicant's full vow (mahāvrata), and 7.3 onward assigns five recurring contemplations to each vow. The same list therefore does not impose one identical degree of observance on every form of life.",
    distinction:
      "Jaini译文逐项说injury、falsehood、theft、unchastity与worldly attachment；‘不害、真实、不偷取、节制、不占有’是较顺的概念标签，而‘共同减少把他者工具化’则是卡片的伦理应用，不是经句原话。",
    englishDistinction:
      "Jaini's wording lists injury, falsehood, theft, unchastity, and worldly attachment. ‘Nonviolence, truthfulness, non-stealing, restraint, and non-possession’ are smoother conceptual labels, while the claim that they jointly reduce the instrumentalization of others is the card's ethical application, not the sutra's wording.",
    question: "你最容易在哪一种欲望中，把另一个生命悄悄变成手段？",
    englishQuestion:
      "Within which desire are you most likely to turn another life quietly into a means?",
    sourceLocator: [
      "《谛义证得经》7.1；J. L. Jaini 1920年公版英译，印刷页137（扫描/PDF第158页）；从‘Vrata or vow’起至第5项止的完整连续列表，仅合并排印换行并略去每项重复的天城体词头，中文为项目研读译文",
      "Tattvarthadhigama Sutra 7.1; J. L. Jaini's public-domain English translation (1920), print p. 137 (scan/PDF p. 158); the complete continuous list from ‘Vrata or vow’ through item 5, with lineation normalized and the repeated Devanagari headwords omitted, and Chinese rendered as a project study translation",
    ],
  },

  {
    id: "indian-samkhya-threefold-suffering",
    authorId: "ishvarakrishna",
    topic: "解脱",
    text: "（此世）既有三种苦所造成的逼迫，（人们便产生）探寻缓解它们之方法的愿望。",
    english:
      "There being (in this world) an impediment caused by the three kinds of pain, (there arises) a desire for enquiry into the means of alleviating them.",
    editorialSummary:
      "哲学探究从一种实际压力开始：身体与心、其他生命以及环境条件造成的苦，都要求寻找更根本的解除方式。",
    englishEditorialSummary:
      "Philosophical inquiry begins under practical pressure: suffering arising from body and mind, other beings, and environmental conditions calls for a more fundamental means of release.",
    work: "《数论颂》",
    englishWork: "Samkhya Karika",
    presentationNature: "source-excerpt",
    reflection:
      "第1颂首句只说三苦造成逼迫，因而引出探寻缓解方法的愿望；同颂余句才说显见补救并非绝对且终极，第2颂再讨论祭祀。Jha的疏文把三苦分为内在（身体与心理）、外在生命或事物所致，以及超自然影响，这是该译本的历史宇宙论，不应直接当作现代生物—心理—社会模型；它也没有否定医疗等局部缓解。",
    englishReflection:
      "The first sentence of Karika 1 says only that pressure from three kinds of pain gives rise to inquiry into alleviation; the remainder of the verse says obvious remedies are neither absolute nor final, and Karika 2 turns to ritual. Jha's commentary classifies pain as intrinsic (bodily and mental), extrinsic, and supernatural within the work's historical cosmology, not a modern biopsychosocial model. It does not deny local relief such as medicine.",
    context:
      "第1颂先以三苦的逼迫引出探寻，后半随即指出显见补救既不绝对也不终极；第2颂转而检验祭祀手段。Jha疏把三苦分为内在、外来与超自然三类。",
    englishContext:
      "Karika 1 begins with pressure from three kinds of pain, then says in its second half that obvious remedies are neither absolute nor final; Karika 2 turns to ritual means. Jha's commentary classifies the pains as intrinsic, extrinsic, and supernatural.",
    distinction:
      "这不是现代生物—心理—社会模型，也不否认医疗等局部补救；本句只建立继续追问更终极缓解方式的动机。",
    englishDistinction:
      "This is not a modern biopsychosocial model and does not reject local remedies such as medicine. The sentence only motivates further inquiry into a more final form of relief.",
    question: "你的问题需要局部修补，还是也暴露出理解自身处境的结构性错误？",
    englishQuestion:
      "Does your problem need a local remedy, or does it also expose a structural error in understanding your condition?",
    sourceLocator: [
      "《数论颂》第1颂；Ganganatha Jha 英译《The Tattva-Kaumudi (Sankhya) of Vachaspati Misra》（Bombay: Theosophical Publication Fund, 1896），印刷页1（扫描/PDF第37页），颂文第一完整句；截于 them，未并入随后关于显见方法的第二句；仅确认美国公版",
      "Sāṃkhya Kārikā 1; Ganganatha Jha, trans., The Tattva-Kaumudi (Sankhya) of Vachaspati Misra (Bombay: Theosophical Publication Fund, 1896), print p. 1 (scan/PDF p. 37), first complete sentence of the translated verse; ending at ‘them’ without joining the following sentence on obvious means; U.S. public-domain status only",
    ],
  },
  {
    id: "indian-samkhya-unmanifest-manifest-knower",
    authorId: "ishvarakrishna",
    topic: "自我",
    text: "自然或作为万物之根的原初质料，并非所生；大（Mahat，即觉）等七者既是能生者也是所生者；十六者是所生者；而神我既非能生者，也非所生者。",
    english:
      "Nature or Primordial Matter, the root of all, is not produced; the Great Principle (Mahat, i. e., Buddhi) and the rest are seven, being both producer and produced; sixteen are the produced; and the Spirit is neither the producer nor the produced.",
    editorialSummary:
      "经验世界需要区分未显的根本自然、由它展开的显现层次，以及不属于这套物质演化链的知者。",
    englishEditorialSummary:
      "Experience requires distinguishing unmanifest root nature, the manifest levels unfolding from it, and the knower who does not belong to that material chain of evolution.",
    work: "《数论颂》",
    englishWork: "Samkhya Karika",
    presentationNature: "source-excerpt",
    reflection:
      "整颂把二十五谛分成四组：原质只生产而不被生产；大等七者既生产又被生产；十六者只被生产；神我二者皆非。这里的 producer/product 是数论的演化关系，不是日常制造或人格行动；‘神我是知者或见证者’以及具体二十五项的展开，还须结合相邻诸颂与疏释。把这套分类简单称作西方式心物二元论，会遗漏层级演化与解脱目的。",
    englishReflection:
      "The verse divides the twenty-five principles into four groups: nature produces but is not produced; the seven beginning with Mahat both produce and are produced; sixteen are produced only; and Spirit is neither. ‘Producer’ and ‘produced’ describe Sankhya evolution, not ordinary manufacture or personal agency. The description of Spirit as knower or witness and the detailed unfolding of all twenty-five require neighboring verses and commentary. Calling the scheme Western-style mind-body dualism misses its layered evolution and soteriological aim.",
    context:
      "第3颂把原质、大等七者、十六所生者与神我分成四组；第22—25颂才逐层列出觉、我慢、微细元素、感官与粗大元素等演化次序。",
    englishContext:
      "Karika 3 divides primordial nature, the seven beginning with Mahat, the sixteen products, and Spirit into four groups. Karikas 22–25 later detail the sequence through intellect, ego, subtle elements, senses, and gross elements.",
    distinction:
      "这里的producer与produced表示数论的演化关系，不是有意图的制造；本颂也未直接把神我称为知者或见证者，更不能单凭此句归结为西方式心物二元论。",
    englishDistinction:
      "Here ‘producer’ and ‘produced’ name Sankhya relations of evolution, not intentional manufacture. This verse does not itself call Spirit a knower or witness, and it cannot by itself be reduced to Western mind-body dualism.",
    question:
      "在你的经验解释中，哪些是被观察的过程，哪些是观察得以发生的条件？",
    englishQuestion:
      "In your account of experience, which elements are observed processes and which are conditions for observation?",
    sourceLocator: [
      "《数论颂》第3颂；Ganganatha Jha 英译《The Tattva-Kaumudi (Sankhya) of Vachaspati Misra》（1896），印刷页9（扫描/PDF第45页），完整连续颂文译句；四组分类完整保留，未把后续第22—25颂的具体演化拼入引句；仅确认美国公版",
      "Sāṃkhya Kārikā 3; Ganganatha Jha, trans., The Tattva-Kaumudi (Sankhya) of Vachaspati Misra (1896), print p. 9 (scan/PDF p. 45), complete continuous translated verse; all four groups are retained without joining the detailed evolution from Karikas 22–25; U.S. public-domain status only",
    ],
  },
  {
    id: "indian-samkhya-effect-preexists",
    authorId: "ishvarakrishna",
    topic: "因果",
    text: "果是实有的；（一）因为非有者绝不能被产生出来；",
    english:
      "The effect is an entity; (1) because a non-entity can never be brought into existence;",
    editorialSummary:
      "结果不是从绝对虚无突然出现；它必须以潜在能力存在于适当材料中，生成是这种能力的显现与重组。",
    englishEditorialSummary:
      "An effect does not spring from absolute nothingness; it must exist as a capacity within suitable material, with production as manifestation and reconfiguration of that capacity.",
    work: "《数论颂》",
    englishWork: "Samkhya Karika",
    presentationNature: "source-excerpt",
    reflection:
      "节选保留第9颂的总断言与第一项理由：非有者不能被产生。颂前疏文明确把‘果是实有的’限定为因果作用之前已然实有；本颂余下还诉诸因果的确定关系、生产能力的限定和果因非异。这里的果先有论是特定形而上学主张，不等于现代能量守恒；‘先有’也不表示可见形态在生成前已完整呈现。",
    englishReflection:
      "The excerpt retains Karika 9's main assertion and first reason: a non-entity cannot be produced. The preceding commentary explicitly says that the effect is an entity even prior to causal operation; the rest of the verse also invokes a determinate cause-effect relation, limited productive capacity, and the effect's non-difference from the cause. This satkāryavāda is a specific metaphysical claim, not modern conservation of energy, and preexistence does not mean that the visible form was already fully manifest.",
    context:
      "颂前疏第61段把“果实有”限定为因果作用发生之前；第9颂接着给出五项理由，本卡只取总断言与第一项“非有不能生”。",
    englishContext:
      "Paragraph 61 immediately before the verse limits the effect's existence to a time prior to causal operation. Karika 9 then gives five reasons; this card retains only the main assertion and the first, that a non-entity cannot be produced.",
    distinction:
      "“先有”指果在因中已有真实根据或能力，不表示可见成品早已完整存在，也不是现代能量守恒定律；其余四项理由不能算作本节选的逐字内容。",
    englishDistinction:
      "Preexistence means that the effect has a real ground or capacity in its cause, not that the finished visible form was already present, and it is not modern conservation of energy. The remaining four reasons are outside this excerpt.",
    question: "你期待的结果，已经以哪些真实能力和材料条件存在？",
    englishQuestion:
      "In which real capacities and material conditions does the result you expect already exist?",
    sourceLocator: [
      "《数论颂》第9颂；Ganganatha Jha 英译《The Tattva-Kaumudi (Sankhya) of Vachaspati Misra》（1896），印刷页28（扫描/PDF第64页），从颂文开头连续节选总断言及第一理由，止于其后分号，未拼入第二至第五理由；颂前第61段明确限定为因果作用之前；仅确认美国公版",
      "Sāṃkhya Kārikā 9; Ganganatha Jha, trans., The Tattva-Kaumudi (Sankhya) of Vachaspati Misra (1896), print p. 28 (scan/PDF p. 64), continuous excerpt from the opening assertion through reason (1), ending at the following semicolon without joining reasons (2)–(5); preceding paragraph 61 explicitly limits the claim to before causal operation; U.S. public-domain status only",
    ],
  },
  {
    id: "indian-samkhya-three-gunas",
    authorId: "ishvarakrishna",
    topic: "因果",
    text: "善性被认为轻扬而明照；染性令人激动且多变（活动）；暗性迟滞而遮蔽。",
    english:
      "Goodness is considered to be buoyant and illuminating; Foulness is exciting and versatile (mobile); Darkness, sluggish and enveloping.",
    editorialSummary:
      "自然过程由明晰轻盈、激动驱迫与沉重遮蔽三种倾向共同构成；任何具体状态都是它们暂时的不同比例。",
    englishEditorialSummary:
      "Natural processes combine tendencies toward clarity and lightness, activation and pressure, and heaviness and obscuration; each concrete state is a temporary proportion among them.",
    work: "《数论颂》",
    englishWork: "Samkhya Karika",
    presentationNature: "source-excerpt",
    reflection:
      "Jha用 Goodness、Foulness、Darkness 译 sattva、rajas、tamas，并以 buoyant、exciting/mobile、sluggish/enveloping 描写它们，这是19世纪的版本措辞，不是给人按道德好坏固定分类。第12颂另说三者相互压制、支持、产生与配合，第13颂下一句说它们像灯一样共同服务于一个目的；引句本身只列性质，并未把具体状态表述为可测量的‘临时比例’。",
    englishReflection:
      "Jha renders sattva, rajas, and tamas as ‘Goodness,’ ‘Foulness,’ and ‘Darkness,’ describing them as buoyant, exciting/mobile, and sluggish/enveloping. These are nineteenth-century choices, not fixed moral ratings of persons. Karika 12 separately says the three subdue, support, produce, and consort with one another; the next sentence of Karika 13 compares their joint action to a lamp serving one purpose. The quoted sentence names qualities but does not itself state measurable ‘temporary proportions.’",
    context:
      "第12颂先说三德相互压制、支持、产生并配合；第13颂本句列出各自性质，下一句再以灯的协作说明它们共同服务于一个目的。",
    englishContext:
      "Karika 12 first says that the three gunas subdue, support, produce, and consort with one another. This sentence in Karika 13 lists their traits, and the next compares their cooperation in serving one purpose to a lamp.",
    distinction:
      "Goodness、Foulness与Darkness是Jha 1896年的版本术语，不是给人作固定道德分型；本句也没有把具体状态说成可测量的三种比例。",
    englishDistinction:
      "‘Goodness,’ ‘Foulness,’ and ‘Darkness’ are Jha's 1896 terms, not fixed moral types of persons. Nor does this sentence describe concrete states as measurable proportions of three variables.",
    question: "此刻的状态中，清晰、躁动和迟滞分别占据怎样的比例？",
    englishQuestion:
      "What proportions of clarity, agitation, and inertia make up your present state?",
    sourceLocator: [
      "《数论颂》第13颂；Ganganatha Jha 英译《The Tattva-Kaumudi (Sankhya) of Vachaspati Misra》（1896），印刷页42（扫描/PDF第78页），颂文第一完整句，止于 enveloping；第12颂关于相互作用的句子另见印刷页40，未拼入本引句；仅确认美国公版",
      "Sāṃkhya Kārikā 13; Ganganatha Jha, trans., The Tattva-Kaumudi (Sankhya) of Vachaspati Misra (1896), print p. 42 (scan/PDF p. 78), first complete sentence of the translated verse, ending at ‘enveloping’; Karika 12's separate sentence on mutual operation appears on print p. 40 and is not joined to this excerpt; U.S. public-domain status only",
    ],
  },
  {
    id: "indian-samkhya-many-purushas",
    authorId: "ishvarakrishna",
    topic: "自我",
    text: "由于出生、死亡与诸器官各有分配；（二）由于（不同个体的）行动并非同时；以及（三）由于诸属性的变动不同——神我的复数性由此确立。",
    english:
      "From allotment of birth, death, and the organs; (2) from the non-simultaneity of actions (with different individuals); and (3) from the different modifications of the Attributes—the plurality of Spirits is established.",
    editorialSummary:
      "意识见证者并非一个替所有生命经验的总主体；出生、死亡、感官配置与解脱差异支持神我的复数性。",
    englishEditorialSummary:
      "The conscious witness is not one universal subject undergoing every life; differences in birth, death, sensory organization, and liberation support a plurality of purushas.",
    work: "《数论颂》",
    englishWork: "Samkhya Karika",
    presentationNature: "source-excerpt",
    reflection:
      "第18颂反驳‘一个神我显现于所有身体’的设想，明列的根据是出生、死亡与器官各有分配，个体行动不同时，以及三德变动不同。紧随其后的疏文说明，这里的‘出生’是神我与身体、器官等建立关系，‘死亡’是离开身体，并非神我自身生成或毁灭。这是体系内针对神我复数性的形而上学论证；旧卡提到的‘解脱差异’并非本颂明列的第三项理由。",
    englishReflection:
      "Karika 18 argues against one Spirit manifesting in all bodies. Its stated grounds are the allotment of birth, death, and organs, the non-simultaneity of individual actions, and different modifications of the gunas. The following commentary explains ‘birth’ as Spirit's relation to a body and organs, and ‘death’ as departure from the body, not production or destruction of Spirit itself. This is an intra-system metaphysical argument for plural Spirits; the old card's ‘differences in liberation’ are not the verse's stated third reason.",
    context:
      "同页引言先提出神我究竟是一还是多；第18颂给出三组根据，随后疏文把“出生”与“死亡”解释为同身体、器官建立和解除关系。",
    englishContext:
      "The same-page introduction first asks whether Spirit is one or many. Karika 18 gives three grounds, and the following commentary explains birth and death as entering and leaving relation with a body and organs.",
    distinction:
      "经文并非说神我自身出生或死亡；“解脱差异”也不是本颂明列的第三项理由。这是体系内部的复数神我论证，不是现代人格或主体性的经验测量。",
    englishDistinction:
      "The verse does not say that Spirit itself is born or dies, and differences in liberation are not its stated third reason. This is an intra-system argument for plural Spirits, not an empirical measure of modern personhood or subjectivity.",
    question: "怎样承认经验具有共同结构，同时不抹去每个主体不可替代的处境？",
    englishQuestion:
      "How can we acknowledge shared structures of experience without erasing each subject's irreplaceable situation?",
    sourceLocator: [
      "《数论颂》第18颂；Ganganatha Jha 英译《The Tattva-Kaumudi (Sankhya) of Vachaspati Misra》（1896），印刷页56（扫描/PDF第92页），完整连续颂文译句；同页引言明确问题是一个神我或多个神我，后续疏文界定出生与死亡；仅确认美国公版",
      "Sāṃkhya Kārikā 18; Ganganatha Jha, trans., The Tattva-Kaumudi (Sankhya) of Vachaspati Misra (1896), print p. 56 (scan/PDF p. 92), complete continuous translated verse; the same-page introduction explicitly poses one Spirit versus many, and the following commentary defines birth and death; U.S. public-domain status only",
    ],
  },
  {
    id: "indian-samkhya-blind-lame",
    authorId: "ishvarakrishna",
    topic: "辩证",
    text: "为了让神我观照原质，也为了让神我最终解脱，二者发生结合，如跛者与盲者的结合；从这一结合中，创化随之产生。",
    english:
      "For the Spirit’s contemplation of Prakriti, and its final Emancipation, the union of both takes place, like that of the halt and the blind; and from this union proceeds creation.",
    editorialSummary:
      "自然有活动能力却没有意识，意识能够见证却不自行活动；经验世界由这两种不完整能力的结合而展开。",
    englishEditorialSummary:
      "Nature has the power to act without consciousness, while consciousness witnesses without acting; the experienced world unfolds through the conjunction of these incomplete capacities.",
    work: "《数论颂》",
    englishWork: "Samkhya Karika",
    presentationNature: "source-excerpt",
    reflection:
      "第21颂给结合设定两重目的：原质成为神我观照与经验的对象，神我则借由辨别原质走向解脱；下一页注释说这种关系主要为了经验，最终为了离系。盲者—跛者譬喻并不表示两个有意图者签约，也不是现代心身因果模型；‘创化’指数论的原质演化链，而非神我主动创造世界。",
    englishReflection:
      "Karika 21 gives the conjunction two purposes: prakriti becomes available for the Spirit's contemplation and experience, while the Spirit reaches emancipation through discriminating prakriti. The following page says the relation is primarily for enjoyment and finally for emancipation. The blind-and-halt simile neither makes them two intentional contractors nor supplies a modern mind-body causal model; ‘creation’ is the Sankhya evolution from prakriti, not an act of creation by purusha.",
    context:
      "第19颂的注疏先把神我说明为见证者、观者、中立且不活动；第20颂继而说，由于神我与林伽身（觉等）结合，不具知性的林伽显得有知性，中立的神我显得是行动者。第21颂回答第137段‘为何需要结合’的诘问，给出观照原质与最终解脱两个目的。引句止于第21颂；其后第138—140段属于Vācaspati Miśra的注疏，解释原质成为可享受的对象、神我借辨别知识走向解脱，并说由结合而起的创化主要为享受、最终为解脱；第22颂才开始列出具体演化次序。",
    englishContext:
      "Commentary on Karika 19 first characterizes Spirit as witness, percipient, neutral, and inactive. Karika 20 then says that through the conjunction of Spirit with the linga (buddhi and the rest), the unintelligent linga appears intelligent and the indifferent Spirit appears as an active agent. Karika 21 answers paragraph 137's objection about why conjunction is needed by assigning it two ends: contemplation of prakriti and final emancipation. The quotation ends with Karika 21; paragraphs 138–140 are Vācaspati Miśra's commentary, which makes prakriti an enjoyable object, connects release with discriminative knowledge, and says creation serves enjoyment primarily and emancipation finally. Karika 22 only then begins the specific evolutionary sequence.",
    distinction:
      "盲者—跛者譬喻在第19—20颂所立‘活动与知觉分属两侧’的框架中说明能力互补，但第21颂本身没有逐项展开譬喻，也没有把原质与神我写成会协商的行动者。‘创化’不是无中生有或神我主动创世，而是结合条件下从原质展开觉、我慢等层次；也不能由此推出现代心身因果理论。‘主要为享受、最终为解脱’来自注疏，不应算作第21颂的逐字内容。",
    englishDistinction:
      "The blind-and-halt simile indicates complementary capacities within Karikas 19–20's separation of activity from awareness, but Karika 21 does not spell out every element of the analogy or portray prakriti and Spirit as negotiating agents. ‘Creation’ is neither creation ex nihilo nor an act performed by Spirit; it is the unfolding of buddhi, self-consciousness, and further principles from prakriti under the condition of conjunction. It supplies no modern mind-body causal theory. ‘Primarily for enjoyment and finally for emancipation’ belongs to the commentary, not the verbatim wording of Karika 21.",
    question: "你的解释是否把行动能力与觉察能力误当成同一种东西？",
    englishQuestion:
      "Does your explanation mistakenly treat the capacity to act and the capacity to be aware as the same thing?",
    sourceLocator: [
      "《数论颂》第21颂；Ganganatha Jha 英译《The Tattva-Kaumudi (Sankhya) of Vachaspati Misra》（Bombay: Theosophical Publication Fund, 1896），印刷页60（扫描/PDF第96页），完整连续译句；页61注释区分原质作为可经验对象与神我为解脱而需原质；仅确认美国公版",
      "Sāṃkhya Kārikā 21; Ganganatha Jha, trans., The Tattva-Kaumudi (Sankhya) of Vachaspati Misra (Bombay: Theosophical Publication Fund, 1896), print p. 60 (scan/PDF p. 96), complete continuous translated verse; commentary on p. 61 distinguishes prakriti as an object of enjoyment from the Spirit's need of prakriti for emancipation; U.S. public-domain status only",
    ],
  },
  {
    id: "indian-yoga-stilling-fluctuations",
    authorId: "patanjali",
    topic: "自我",
    text: "于是，见者［即自我（神我）］安住于自身；在其他时候，它［自我（神我）］呈现与［心质］波动相同的形式。",
    english:
      "Then the Seer [that is, the Self] abides in himself. At other times it [the Self] takes the same form as the fluctuations [of mind-stuff].",
    editorialSummary: "当心的活动止息时，见证者安住于自身；否则，我们往往把自己等同于不断变化的念头、感受与想象。",
    englishEditorialSummary:
      "When the mind's fluctuations are stilled, the seer abides in its own nature; otherwise we tend to identify ourselves with changing thoughts, feelings, and imaginings.",
    work: "《瑜伽经》",
    englishWork: "Yoga Sutra",
    presentationNature: "source-excerpt",
    reflection:
      "前一条经文把瑜伽界定为心质波动的止息；这里接着区分安住自身的见者与它在其他时候呈现的心理形态。‘止息’不是把大脑清空，也不只是放松技巧，而是服务于辨析与解脱的专门训练。",
    englishReflection:
      "The preceding sutra defines yoga as the stilling of mind-stuff's fluctuations; these lines then contrast the seer abiding in himself with the forms it takes at other times. Stilling is neither an empty brain nor merely a relaxation technique; it is disciplined practice in the service of discernment and liberation.",
    context:
      "无注释汇编页把1.1—4列在译者所加的‘专注的目标’组标题下。1.2刚将瑜伽界定为限制心质波动，1.3的‘于是’回指这一条件，1.4则与之对照说明其他时候的情形。紧接的1.5—11把波动分为有效观念来源、误认、谓词关系、睡眠与记忆五类。",
    englishContext:
      "The collected translation without commentary groups Sutras 1.1–4 beneath the translator-added heading ‘Goal of Concentration.’ Sutra 1.2 has just defined yoga as the restriction of the fluctuations of mind-stuff; the ‘Then’ of 1.3 depends upon that condition, while 1.4 contrasts what occurs at other times. Sutras 1.5–11 immediately classify the fluctuations as sources of valid ideas, misconceptions, predicate-relations, sleep, and memory.",
    distinction:
      "1.3—4没有要求把大脑清空，也没有主张消灭一切心理活动；它只在1.2设定的条件下，对比见者安住自身与其他时候同心质波动取同形。方括号中的Self和mind-stuff均为Woods的译者补足，组标题及关于self-expression的总结也是译者所加。项目中文用‘自我（神我）’对应该译本的Self，避免把它误作svabhāva意义上的‘自性’。",
    englishDistinction:
      "Sutras 1.3–4 do not prescribe an empty brain or the destruction of all mental activity. Under the condition stated in 1.2, they contrast the Seer abiding in himself with taking the form of mind-stuff's fluctuations at other times. The bracketed glosses ‘the Self’ and ‘of mind-stuff,’ as well as the group heading and summary about self-expression, are supplied by Woods. The project Chinese uses ‘self (purusha)’ for this Self to avoid confusion with svabhāva.",
    question: "今天哪一种心理活动最容易被你误认为‘这就是我’？",
    englishQuestion:
      "Which mental activity are you most likely to mistake for ‘this is who I am’ today?",
    sourceLocator: [
      "《瑜伽经》第一篇1.3—4；James Haughton Woods 1914年公版英译，无注释汇编段，扫描/PDF第34页，连续两句并保留原译方括号",
      "Yoga Sutra, Book I, 1.3–4; James Haughton Woods's public-domain translation (1914), unnumbered collected translation, scan/PDF p. 34, two continuous sentences retaining the translator's brackets",
    ],
  },
  {
    id: "indian-yoga-practice-dispassion",
    authorId: "patanjali",
    topic: "解脱",
    text: "这些［心质波动］的止息，是［借助］练习与离欲。",
    english:
      "The restriction of them is by [means of] practice and passionlessness.",
    editorialSummary:
      "稳定不是靠一次强烈体验获得，而由持续练习与不被结果牵走的离欲共同养成。",
    englishEditorialSummary:
      "Stability is not won through one intense experience; it is cultivated through sustained practice together with dispassion toward its results.",
    work: "《瑜伽经》",
    englishWork: "Yoga Sutra",
    presentationNature: "source-excerpt",
    reflection:
      "1.12中的“them”回指前面列举的心质波动，本句只说止息同时依赖练习与离欲；1.13—16才说明练习需长期、不间断、认真培养，并把离欲关联到所见或传闻的对象。因此旧卡关于“持续”与“不被结果牵走”的说法是整段的编辑性总结，并非本句逐字措辞。离欲也不是情感麻木，而是减少渴求对注意与行动的支配。",
    englishReflection:
      "In 1.12, ‘them’ refers back to the previously listed fluctuations of mind-stuff, and this sentence says only that restriction depends upon both practice and passionlessness. Sutras 1.13–16 then require long, uninterrupted, earnest cultivation and relate passionlessness to objects seen or revealed. The former wording about sustained practice and not being led by results is therefore an editorial summary of the larger passage, not the wording of this sentence. Passionlessness is not emotional numbness but a loosening of craving's control over attention and action.",
    context:
      "1.12的“them”回指1.5—11分说的心质波动；1.13—14说明练习及其长期、不间断的培养，1.15—16说明对所见、传闻对象乃至诸德的离欲。",
    englishContext:
      "In 1.12, ‘them’ refers to the fluctuations of mind-stuff distinguished in 1.5–11. Sutras 1.13–14 explain practice and its long, uninterrupted cultivation; 1.15–16 describe passionlessness toward seen or revealed objects and ultimately the gunas.",
    distinction:
      "本句只把练习与离欲并列为止息手段，没有谈“结果”，也没有把离欲等同于压抑情感或退出行动；这些应用属于编辑解释。",
    englishDistinction:
      "This sentence only pairs practice and passionlessness as means of restriction. It says nothing about ‘results’ and does not equate passionlessness with suppressing emotion or withdrawing from action; those applications are editorial interpretation.",
    question: "你需要继续练习什么，又需要停止向它索取哪一种保证？",
    englishQuestion:
      "What do you need to keep practicing, and what guarantee must you stop demanding from it?",
    sourceLocator: [
      "《瑜伽经》1.12；James Haughton Woods 英译《The Yoga-System of Patañjali》（Cambridge, MA: Harvard University Press, 1914），印刷页34（扫描/PDF第80页），完整连续译句；“them”回指前文的心质波动，[means of]为译者补足，1.13—16续释练习与离欲；仅确认美国公版",
      "Yoga Sutra 1.12; James Haughton Woods, trans., The Yoga-System of Patañjali (Cambridge, MA: Harvard University Press, 1914), print p. 34 (scan/PDF p. 80), complete continuous translated sentence; ‘them’ refers to the preceding fluctuations of mind-stuff, [means of] is supplied by the translator, and 1.13–16 continue the account of practice and passionlessness; U.S. public-domain status only",
    ],
  },
  {
    id: "indian-yoga-four-attitudes",
    authorId: "patanjali",
    topic: "伦理",
    text: "分别以友善、悲悯、欣悦与淡然面对快乐者、不快乐者、善者与恶者，心质便得平息。",
    english:
      "Friendship, mercy, gladness, indifference, being thought of in regard to subjects, happy, unhappy, good and evil respectively, pacify the Chitta.",
    editorialSummary: "面对快乐者保持友善，面对受苦者生起悲悯，欣赏善行，并对恶行保持不被卷入的平衡，心才更容易澄明。",
    englishEditorialSummary:
      "The mind becomes clearer by meeting the happy with friendliness, the suffering with compassion, the virtuous with appreciative joy, and wrongdoing with unentangled equanimity.",
    work: "《瑜伽经》",
    englishWork: "Yoga Sutra",
    presentationNature: "source-excerpt",
    reflection:
      "四种态度不是给人贴上固定标签，而是针对嫉妒、冷漠、敌意与报复冲动的训练。最后的平衡也不等于纵容伤害；它要求在必要行动中不让仇恨接管判断。",
    englishReflection:
      "These four attitudes do not permanently classify people; they train against envy, indifference, hostility, and retaliatory impulse. The final equanimity does not excuse harm: it asks that hatred not take over judgment even when action is necessary.",
    context:
      "1.31列举不能保持专注时伴随的身心扰动；1.32建议练习专注于一个对象，并称后续经文会把这一一般建议具体化。1.33随后给出分别对应快乐、不快乐、善与恶对象的四种态度。Vivekananda在跨至下一页的解释中把它们展开为友善、悲悯、同喜与对恶者的淡然，并把克制以恶报恶、仇恨和愤怒的反应视为保存心力的方法。",
    englishContext:
      "Sutra 1.31 lists bodily and mental disturbances accompanying a failure to retain concentration. Sutra 1.32 recommends practice upon one subject, and the prose calls this general advice that the following aphorisms will particularize. Sutra 1.33 then assigns four attitudes respectively to happy, unhappy, good, and evil subjects. Vivekananda's commentary, continuing onto the next page, expands them as friendship, mercy, shared gladness, and indifference toward the wicked, and treats restraint from retaliatory hatred and anger as a way of preserving the mind's power.",
    distinction:
      "本句训练的是心质面对对象时的反应，不是把人永久分成四类。Vivekananda的indifference针对恶的对象及报复性反应；它不等于赞同恶行，这两页也没有规定是否应采取外在行动。项目关于‘必要行动中不让仇恨接管判断’的说法是合理应用，但不是原句逐字内容。",
    englishDistinction:
      "The aphorism trains the mind's response to its objects; it does not permanently classify people into four kinds. Vivekananda's ‘indifference’ concerns evil objects and retaliatory reaction. It neither endorses wrongdoing nor determines whether outward action should be taken. The project's language about preventing hatred from governing necessary action is an application, not the aphorism's wording.",
    question: "你此刻对谁更需要友善、悲悯、欣赏，或清醒的距离？",
    englishQuestion:
      "Who now calls from you for friendliness, compassion, appreciation, or clear-sighted distance?",
    sourceLocator: [
      "《瑜伽经》1.33；Swami Vivekananda 1899年公版英译《Râja Yoga》，印刷页131（扫描/PDF第151页），完整连续句；解释续至印刷页132（PDF第152页）",
      "Yoga Aphorisms 1.33; Swami Vivekananda's public-domain translation in Râja Yoga (1899), print p. 131 (scan/PDF p. 151), complete continuous sentence; commentary continues on print p. 132 (PDF p. 152)",
    ],
  },
  {
    id: "indian-yoga-five-afflictions",
    authorId: "patanjali",
    topic: "因果",
    text: "未分化意识（avidyā）、人格感、贪爱、厌恶与求生意志，是五种障碍。",
    english:
      "Undifferentiated-consciousness (avidyā) and the feeling-of-personality and passion and aversion and the will-to-live are the five hindrances.",
    editorialSummary:
      "无明使我们把无常当常、非我当我；由此长出自我执取、贪恋、排斥与对生命终结的紧抓。",
    englishEditorialSummary:
      "Ignorance makes us take the impermanent as permanent and the not-self as self; from it grow ego-identification, attachment, aversion, and clinging to continued life.",
    work: "《瑜伽经》",
    englishWork: "Yoga Sutra",
    presentationNature: "source-excerpt",
    reflection:
      "Woods以“undifferentiated-consciousness”“hindrances”等时代性术语翻译avidyā与kleśa，本句只枚举2.3的五项；2.4—5才说明无明是其余四项的场域，并列出把无常认作常、把非我认作我等错误。因此旧卡的因果链是跨经文的编辑性总结。这里也不是现代临床诊断表，更不意味着所有恐惧都应被责怪。",
    englishReflection:
      "Woods uses the period terms ‘undifferentiated-consciousness’ and ‘hindrances’ for avidyā and kleśa. This sentence only enumerates the five items in 2.3; 2.4–5 then make ignorance the field of the other four and list errors such as recognizing permanence in the impermanent and self in the not-self. The causal chain in the former card is therefore an editorial synthesis across sutras. This is not a modern diagnostic checklist, nor does it blame every fear.",
    context:
      "2.3先枚举五种障碍；2.4称无明为其余四者的场域，2.5列出无明的四种误认，2.6—9才分别界定人格感、贪爱、厌恶与求生意志。",
    englishContext:
      "Sutra 2.3 enumerates the five hindrances; 2.4 calls ignorance the field of the other four, 2.5 lists four misrecognitions, and 2.6–9 then define feeling-of-personality, passion, aversion, and will-to-live.",
    distinction:
      "Woods的undifferentiated-consciousness与hindrances是历史译词，不是现代临床类别；will-to-live也不能用来责怪通常的求生恐惧，本句本身只作枚举。",
    englishDistinction:
      "Woods's ‘undifferentiated-consciousness’ and ‘hindrances’ are historical translation terms, not modern clinical categories. ‘Will-to-live’ does not license blaming ordinary survival fear, and this sentence itself only enumerates the five.",
    question: "某个反复出现的贪恋或排斥，背后依靠了哪一种误认？",
    englishQuestion:
      "What misidentification sustains a recurring attachment or aversion?",
    sourceLocator: [
      "《瑜伽经》2.3；James Haughton Woods 英译《The Yoga-System of Patañjali》（Cambridge, MA: Harvard University Press, 1914），印刷页106（扫描/PDF第152页），完整连续译句；“hindrances”为该译本对五种kleśa的时代性译名，根源关系续见2.4—5；仅确认美国公版",
      "Yoga Sutra 2.3; James Haughton Woods, trans., The Yoga-System of Patañjali (Cambridge, MA: Harvard University Press, 1914), print p. 106 (scan/PDF p. 152), complete continuous translated sentence; ‘hindrances’ is this edition's period rendering for the five kleśas, whose relation to ignorance continues in 2.4–5; U.S. public-domain status only",
    ],
  },
  {
    id: "indian-yoga-eight-limbs",
    authorId: "patanjali",
    topic: "解脱",
    text: "禁制、遵行、体式、调息、制感、定点注意、禅观与三摩地，是八种助法。",
    english:
      "Abstentions and observances and postures and regulations-of-the-breath and withdrawal-of-the-senses and fixed attention and contemplation and concentration are the eight aids.",
    editorialSummary:
      "自由的训练同时涉及不伤害等伦理约束、个人纪律、身体姿势、呼吸、感官收摄、专注、禅定与三摩地。",
    englishEditorialSummary:
      "The discipline of freedom joins ethical restraints such as non-harming with personal observances, posture, breath, sensory withdrawal, concentration, meditation, and samadhi.",
    work: "《瑜伽经》",
    englishWork: "Yoga Sutra",
    presentationNature: "source-excerpt",
    reflection:
      "2.29只列举八种助法，不伤害等五项禁制到2.30才展开，因此旧卡的“不伤害”是后文语境的编辑性补充。Woods把aṅga译为“aids”，并把samādhi译为“concentration”；这里的英语不能按今天的日常“集中注意”来理解。八支也把体式放在完整道路中，且经文对体式本身的说明很简短。",
    englishReflection:
      "Sutra 2.29 only enumerates the eight aids; the five abstentions, including non-harming, are specified in 2.30, so non-harming in the former wording came from the following context. Woods renders aṅga as ‘aids’ and samādhi as ‘concentration’; the last word must not be reduced to ordinary focused attention. The eightfold path also places posture within a larger discipline and treats posture itself only briefly.",
    context:
      "2.28先把修习诸助法同杂染衰减与辨别知见相连；2.29只列八项，2.30以后才逐项说明，其中不伤害始见于2.30的五种禁制。",
    englishContext:
      "Sutra 2.28 first connects following the aids with the dwindling of impurity and discriminative discernment. Sutra 2.29 only lists the eight; their explanations begin in 2.30, where non-harming appears among the five abstentions.",
    distinction:
      "“eight aids”不是可任意拆选的现代健身菜单；Woods末项的concentration指samādhi而非普通专注，本颂也没有说八项彼此独立或作用相同。",
    englishDistinction:
      "The ‘eight aids’ are not a modern exercise menu from which items may be detached at will. Woods's final ‘concentration’ renders samādhi, not ordinary focus, and the verse does not say that the eight operate independently or identically.",
    question: "你的自我训练是否只强化能力，却没有同时检视它服务的方向？",
    englishQuestion:
      "Does your self-training strengthen capacity without also examining the direction it serves?",
    sourceLocator: [
      "《瑜伽经》2.29；James Haughton Woods 英译《The Yoga-System of Patañjali》（Cambridge, MA: Harvard University Press, 1914），印刷页177（扫描/PDF第223页），完整连续译句，跨行排印连字符已还原；不伤害等禁制续见2.30；仅确认美国公版",
      "Yoga Sutra 2.29; James Haughton Woods, trans., The Yoga-System of Patañjali (Cambridge, MA: Harvard University Press, 1914), print p. 177 (scan/PDF p. 223), complete continuous translated sentence with line-break hyphenation normalized; the abstentions, including non-harming, follow in 2.30; U.S. public-domain status only",
    ],
  },
  {
    id: "indian-yoga-three-inward-limbs",
    authorId: "patanjali",
    topic: "认识",
    text: "这三者合而为一，便是总制。",
    english: "The three in one are constraint.",
    editorialSummary:
      "把心置于一处是专注，认知在那里连续流动是禅定，而当对象仿佛独自显现、主体感淡去时，才称为三摩地。",
    englishEditorialSummary:
      "Fixing the mind in one place is concentration; an uninterrupted flow of cognition there is meditation; when the object seems to shine alone as self-awareness recedes, that is samadhi.",
    work: "《瑜伽经》",
    englishWork: "Yoga Sutra",
    presentationNature: "source-excerpt",
    reflection:
      "3.4的“three”回指3.1—3分别界定的fixed-attention、contemplation与concentration；本句说三者合一构成总制（saṃyama），并未在这一短句内重述各自定义。3.7才说这三者相对于前五支更为内在。旧卡对三个阶段的描述因此保留在编辑摘要中；这些仍是古典瑜伽术语，不宜直接等同于今天所有被称为“正念”或“心流”的经验。",
    englishReflection:
      "In 3.4, ‘the three’ refers back to fixed-attention, contemplation, and concentration as defined in 3.1–3. This short sentence says that the three together constitute constraint (saṃyama); it does not restate their definitions. Sutra 3.7 then calls them more inward than the preceding five aids. The former description of the three stages therefore remains in the editorial summary, and these classical technical terms should not be equated with every modern experience called mindfulness or flow.",
    context:
      "3.1—3分别界定定点注意、禅观与三摩地；3.4称三者合为总制，3.7说其相对前五支更为内在，3.8又说相对无种三摩地仍是外在。",
    englishContext:
      "Sutras 3.1–3 define fixed-attention, contemplation, and concentration. Sutra 3.4 calls the three together constraint; 3.7 calls them more inward than the preceding five aids, while 3.8 says they remain external to seedless concentration.",
    distinction:
      "这里的“内在”是道路层级中的相对说法，不等于一般内省、正念或心流；3.4这句也没有独自给出三个阶段的定义。",
    englishDistinction:
      "‘Inward’ is relational within the path's hierarchy, not a synonym for introspection, mindfulness, or flow. Nor does the sentence in 3.4 itself supply the definitions of all three stages.",
    question:
      "你正在做的事，需要的是把注意拉回来、让它连续，还是减少对自我的旁观？",
    englishQuestion:
      "Does your present task require returning attention, sustaining its flow, or reducing self-observation?",
    sourceLocator: [
      "《瑜伽经》3.4；James Haughton Woods 英译《The Yoga-System of Patañjali》（Cambridge, MA: Harvard University Press, 1914），印刷页205（扫描/PDF第251页），完整连续短句；“three”回指3.1—3的fixed-attention、contemplation与concentration，3.7续称三者相对前五支更为内在；仅确认美国公版",
      "Yoga Sutra 3.4; James Haughton Woods, trans., The Yoga-System of Patañjali (Cambridge, MA: Harvard University Press, 1914), print p. 205 (scan/PDF p. 251), complete continuous short sentence; ‘the three’ refers to fixed-attention, contemplation, and concentration in 3.1–3, and 3.7 calls them more inward than the preceding five aids; U.S. public-domain status only",
    ],
  },
  {
    id: "indian-nyaya-sixteen-categories",
    authorId: "aksapada-gautama",
    topic: "认识",
    text: "通达十六范畴的真实本性，便能达到至福……",
    english:
      "Supreme felicity is attained by the knowledge about the true nature of sixteen categories, …",
    editorialSummary:
      "严谨探究不仅需要证据和对象，也要辨认疑问、例证、论证结构、争论方式、谬误与败因等完整环节。",
    englishEditorialSummary:
      "Rigorous inquiry requires more than evidence and objects; it must also identify doubt, examples, argument structure, modes of debate, fallacies, and grounds of defeat.",
    work: "《正理经》",
    englishWork: "Nyaya Sutra",
    presentationNature: "source-excerpt",
    reflection:
      "开篇把十六范畴的真实知识与最高善（niḥśreyasa）相连；完整句随后列出知识手段与对象、怀疑、目的、例证、定论、论式支分、推究、决断、三种争论形态及论辩过失。它们是全书将陈说、定义和考察的题项或范畴，不宜简单当成近代意义上的十六种存在类型；旧卡所谓‘公共方法’是编辑性概括。",
    englishReflection:
      "The opening links true knowledge of sixteen categories with the highest good (niḥśreyasa); the unabridged sentence then lists means and objects of knowledge, doubt, purpose, example, tenet, members of argument, tarka, ascertainment, three modes of debate, and dialectical faults. They are topics or categories the text will enunciate, define, and examine, not simply sixteen ontological entity-types in a modern sense; the card's language of a ‘public method’ is an editorial framing.",
    context:
      "1.1.1是卷一第一章的开篇经文。卡片摘取的是译句开头14个连续英文词；原句在categories后继续列出正知手段、正知对象、怀疑、目的、例证、定论、论式支分、推究、决断、论议、诤论、坏议、似因、曲解、似难与堕负处。页下关于‘陈说、定义和批判考察’的段落属于译者说明，不是经文译句。",
    englishContext:
      "Nyaya Sutra 1.1.1 opens Book I, Chapter I. The card preserves the first fourteen continuous words of the translated sentence; after ‘categories’ the sentence continues by listing means and objects of right knowledge, doubt, purpose, familiar instance, tenet, members, tarka, ascertainment, discussion, wrangling, cavil, fallacy, quibble, futility, and occasion for rebuke. The paragraph below concerning enunciation, definition, and critical examination is the translator's explanatory prose, not the translated sutra.",
    distinction:
      "这里的十六范畴是全书随后逐项陈说、定义和考察的论题或范畴，不应直接理解成十六种现代本体论实体；句首还把这种知识置于至福或最高善的解脱论目标中，卡片所谓严谨探究属于当代应用性阐释。",
    englishDistinction:
      "The sixteen categories are topics the work will subsequently enunciate, define, and examine, not simply sixteen ontological entity-types in a modern sense. The opening also places this knowledge within the soteriological aim of supreme felicity; the card's language of rigorous inquiry is a contemporary application.",
    question: "一场争论卡住时，问题出在证据、目标、推理，还是争论方式？",
    englishQuestion:
      "When an argument stalls, is the trouble in the evidence, aim, reasoning, or mode of debate?",
    sourceLocator: [
      "《正理经》1.1.1；Satīśa Chandra Vidyābhūṣaṇa 英译《The Nyâya Sûtras of Gotama》，《印度教圣书》第8卷（Allahabad: Panini Office, 1913），印刷页1（扫描/PDF第27页）；原译首句开头连续14词，保留categories后的原逗号，并以末尾省略号标明同句仍继续列出十六项；仅确认美国公版",
      "Nyāya Sūtra 1.1.1; Satīśa Chandra Vidyābhūṣaṇa, trans., The Nyâya Sûtras of Gotama, The Sacred Books of the Hindus, vol. VIII (Allahabad: Panini Office, 1913), print p. 1 (scan/PDF p. 27); first 14 continuous words of the translated opening sentence, retaining the source comma after ‘categories,’ with a terminal ellipsis marking that the same sentence continues to list all sixteen; U.S. public-domain status only",
    ],
  },
  {
    id: "indian-nyaya-error-to-liberation",
    authorId: "aksapada-gautama",
    topic: "解脱",
    text: "苦、生、行动、过失与错误认识——当这些按照逆序相继消灭时，解脱随之而来。",
    english:
      "Pain, birth, activity, faults and misapprehension—on the successive annihilation of these in the reverse order, there follows release.",
    editorialSummary:
      "痛苦的终止依赖一条反向因果链：错误知识消退，过失、行动、再生与痛苦也依次失去条件。",
    englishEditorialSummary:
      "The ending of suffering follows a reverse causal chain: as false knowledge ceases, faults, action, rebirth, and suffering in turn lose their conditions.",
    work: "《正理经》",
    englishWork: "Nyaya Sutra",
    presentationNature: "source-excerpt",
    reflection:
      "经文先按苦、生、行动、过失、错误认识的顺序列举，再规定它们由后向前消退；本页注释把链条展开为错误认识消失后，执著、厌恶与愚痴等过失继而失去条件，最终止息再生与苦。这里的行动、出生与解脱属于正理派的业报宇宙论，不能缩减为‘纠正想法便不会难过’的心理技巧。",
    englishReflection:
      "The sutra first lists pain, birth, activity, faults, and misapprehension, then specifies their cessation from the latter backward. The commentary on the same page unfolds the chain: when misapprehension is removed, faults such as affection, aversion, and stupidity lose their basis, eventually ending rebirth and pain. Activity, birth, and release here belong to Nyaya's karmic cosmology, not a psychological technique in which correcting thoughts simply removes sadness.",
    context:
      "1.1.2紧随十六范畴总目，引文是完整经文译句。经文先按苦、生、行动、过失、错误认识的顺序列举，再规定从末项向前相继消灭。同页其后的无编号说明段属于译本的注释性阐释，不是经文译句；它把链条展开为错误认识消失，执著、厌恶与愚痴等过失继而消失，行动、轮回与苦最终止息。",
    englishContext:
      "Sutra 1.1.2 immediately follows the catalogue of sixteen categories, and the excerpt is its complete translated sentence. It first lists pain, birth, activity, faults, and misapprehension, then orders their cessation from the last item backward. The following unnumbered paragraph is explanatory prose in the translation, not the sutra itself; it unfolds the sequence from the removal of misapprehension through the disappearance of affection, aversion, stupidity, activity, transmigration, and pain.",
    distinction:
      "这里的行动、出生与解脱属于正理派关于业、轮回和灵魂脱离苦界的框架，不分别等同于日常忙碌、生物学出生和短期情绪缓解；这也不是只要纠正一个想法便立刻不再难过的心理技巧。",
    englishDistinction:
      "Activity, birth, and release belong to Nyaya's framework of karma, transmigration, and the soul's freedom from suffering; they do not respectively mean ordinary busyness, biological birth, and short-term emotional relief. The passage is not a psychological technique promising that one corrected thought immediately removes distress.",
    question: "你想改变的痛苦链条里，哪一个错误判断最靠近可干预的起点？",
    englishQuestion:
      "In the chain of suffering you want to change, which false judgment lies nearest an actionable beginning?",
    sourceLocator: [
      "《正理经》1.1.2；Satīśa Chandra Vidyābhūṣaṇa 英译《The Nyâya Sûtras of Gotama》（Allahabad: Panini Office, 1913），印刷页2，完整连续译句；同页注释按错误认识、过失、行动、出生、苦的顺序解释逆向止息；仅确认美国公版",
      "Nyāya Sūtra 1.1.2; Satīśa Chandra Vidyābhūṣaṇa, trans., The Nyâya Sûtras of Gotama (Allahabad: Panini Office, 1913), print p. 2, complete continuous translated sentence; commentary on the same page explains reverse cessation through misapprehension, faults, activity, birth, and pain; U.S. public-domain status only",
    ],
  },
  {
    id: "indian-nyaya-four-means",
    authorId: "aksapada-gautama",
    topic: "认识",
    text: "知觉、推论、比较与言语（语言证言）——这些是正知的手段。",
    english:
      "Perception, inference, comparison and word (verbal testimony)—these are the means of right knowledge.",
    editorialSummary:
      "获得可靠知识有多条路径：知觉、推论、类比以及可信言说；不同问题需要与之相称的证成方式。",
    englishEditorialSummary:
      "Reliable knowledge has several routes: perception, inference, comparison, and trustworthy testimony; different questions require fitting modes of justification.",
    work: "《正理经》",
    englishWork: "Nyaya Sutra",
    presentationNature: "source-excerpt",
    reflection:
      "1.1.3只枚举四种知识手段，随后经文才逐一定义；同页方括号内关于各学派承认几种手段的段落是译者或编者说明，不是本经句的一部分。这里的 word 对应 śabda，不能理解为任何传闻都自动可靠；comparison 对应 upamāna，也不是泛指一切相似联想。",
    englishReflection:
      "Sutra 1.1.3 only enumerates the four means; the following sutras define them one by one. The bracketed paragraph on the same page comparing how many means other schools accept is translator or editorial material, not part of this sutra. ‘Word’ corresponds to śabda and does not make every report automatically reliable; ‘comparison’ corresponds to upamāna and is not every loose association by similarity.",
    context:
      "引文是1.1.3的完整译句，本条只枚举四种正知手段。紧接其后的方括号段落比较各学派承认几种手段，属于译者或编者说明，不是经文。1.1.4至1.1.7才依次定义知觉、推论、比较和言语，其中1.1.7把言语界定为可靠之人的教示性陈说。",
    englishContext:
      "The excerpt is the complete translation of 1.1.3, which only enumerates four means of right knowledge. The immediately following bracketed comparison of how many means different schools accept is translator or editorial material, not the sutra. Sutras 1.1.4 through 1.1.7 then define perception, inference, comparison, and word in turn; 1.1.7 defines word as the instructive assertion of a reliable person.",
    distinction:
      "卡片中的‘可信言说’借用了后续1.1.7的资格条件，并非1.1.3本句逐字说出；word对应śabda，不表示任何言论或传闻都可靠，comparison对应upamāna，也不是泛指一切相似联想。",
    englishDistinction:
      "The card's qualification ‘trustworthy testimony’ draws on the later definition in 1.1.7 rather than wording stated in 1.1.3 itself. Word corresponds to sabda and does not validate every assertion or rumour; comparison corresponds to upamana and is not every loose association by similarity.",
    question:
      "你现在相信的结论究竟来自哪一种知识路径，它满足了该路径的条件吗？",
    englishQuestion:
      "Which route to knowledge supports your present belief, and does it meet that route's conditions?",
    sourceLocator: [
      "《正理经》1.1.3；Satīśa Chandra Vidyābhūṣaṇa 英译《The Nyâya Sûtras of Gotama》（Allahabad: Panini Office, 1913），印刷页2，完整连续译句；紧接其后的方括号学派比较不是经文；仅确认美国公版",
      "Nyāya Sūtra 1.1.3; Satīśa Chandra Vidyābhūṣaṇa, trans., The Nyâya Sûtras of Gotama (Allahabad: Panini Office, 1913), print p. 2, complete continuous translated sentence; the immediately following bracketed comparison of schools is not part of the sutra; U.S. public-domain status only",
    ],
  },
  {
    id: "indian-nyaya-perception-conditions",
    authorId: "aksapada-gautama",
    topic: "认识",
    text: "知觉是由感官与其对象接触而生，并且确定、不可名言且不谬误的知识。",
    english:
      "Perception is that knowledge which arises from the contact of a sense with its object and which is determinate, unnameable and non-erratic.",
    editorialSummary:
      "知觉由感官与对象的接触而生；可靠性要求排除错乱，而‘确定／不可名言’的句法在同页另译中存在不同读法。",
    englishEditorialSummary:
      "Perception arises through contact between sense and object; reliability excludes error, while the syntax of ‘determinate/unnameable’ receives an alternative reading on the same page.",
    work: "《正理经》",
    englishWork: "Nyaya Sutra",
    presentationNature: "source-excerpt",
    reflection:
      "Vidyābhūṣaṇa在同页以远处不能判定烟或尘解释 determinate，又以热浪似水解释 non-erratic；他还给出另一种句法译法，把无分别与有分别认知都纳入不谬误知觉。因此不能只凭这一译句就裁定后世关于无分别知觉的争论，‘不可名言’也不是泛泛的神秘不可说；感官—对象接触更不等于现代神经机制。",
    englishReflection:
      "On the same page Vidyābhūṣaṇa glosses ‘determinate’ by a distant appearance unresolved between smoke and dust, and ‘non-erratic’ by heat rays appearing as water. He also supplies an alternative syntactic translation that treats indeterminate and determinate cognition as types of non-erratic perception. This one rendering therefore cannot settle later debates over indeterminate perception; ‘unnameable’ is not a generic mystical ineffability, and sense-object contact is not a modern neural mechanism.",
    context:
      "引文是1.1.4在印刷页3给出的第一种完整译法。其后先有分别解释determinate、unnameable和non-erratic的三个说明段，再有一段方括号内的备选句法译法；备选译法把不谬误的知觉分成无分别认知与有分别认知两种。",
    englishContext:
      "The excerpt is the first complete translation of 1.1.4 on print page 3. It is followed by three explanatory paragraphs glossing ‘determinate,’ ‘unnameable,’ and ‘non-erratic,’ and then by a bracketed alternative syntactic translation. That alternative treats non-erratic perception as including either indeterminate or determinate cognition.",
    distinction:
      "‘不可名言’在这里不等于泛泛的神秘不可说，感官与对象接触也不是现代神经机制；尤其同页备选译法容纳无分别与有分别两种不谬误知觉，所以不能把‘所有可靠知觉都必须达到确定判断’当作本页无争议的结论。",
    englishDistinction:
      "‘Unnameable’ is not a generic claim of mystical ineffability, and sense-object contact is not a modern neural mechanism. More importantly, the same-page alternative admits both indeterminate and determinate non-erratic perception, so this page does not unambiguously establish that every veridical perception must reach a determinate judgment.",
    question: "当你说‘我亲眼看见’，你排除了哪些可能的误认与情境干扰？",
    englishQuestion:
      "When you say ‘I saw it myself,’ which possible misidentifications and contextual distortions have you ruled out?",
    sourceLocator: [
      "《正理经》1.1.4；Satīśa Chandra Vidyābhūṣaṇa 英译《The Nyâya Sûtras of Gotama》（Allahabad: Panini Office, 1913），印刷页3，完整连续译句；同页另列一种句法译法，术语边界须随版本保留；仅确认美国公版",
      "Nyāya Sūtra 1.1.4; Satīśa Chandra Vidyābhūṣaṇa, trans., The Nyâya Sûtras of Gotama (Allahabad: Panini Office, 1913), print p. 3, complete continuous translated sentence; an alternative syntactic translation appears on the same page, so the edition's terminological boundary is retained; U.S. public-domain status only",
    ],
  },
  {
    id: "indian-nyaya-five-member-argument",
    authorId: "aksapada-gautama",
    topic: "辩证",
    text: "（一个论式的）支分是命题、理由、例证、应用和结论。",
    english:
      "The members (of a syllogism) are proposition, reason, example, application, and conclusion.",
    editorialSummary:
      "面向他人的推论应把主张、理由、通则与例证、对当前个案的应用，以及结论依次说清。",
    englishEditorialSummary:
      "An inference presented to others should make explicit the thesis, reason, general rule with example, application to the present case, and conclusion.",
    work: "《正理经》",
    englishWork: "Nyaya Sutra",
    presentationNature: "source-excerpt",
    reflection:
      "1.1.32只列举五支，后续1.1.33—39才分别定义各支；同页方括号内山、烟、火的五步例是译者或注释性材料，不应拼入经文引句。译者以 syllogism 作当时的英语标签，不等于正理论式只是亚里士多德三段论的冗长版本；‘面向他人’以及遍充与共同例证，是对整段理论的解释而非本句逐字断言。",
    englishReflection:
      "Sutra 1.1.32 only enumerates the five members; 1.1.33–39 then define them separately. The bracketed hill-smoke-fire example on the same page is translator or commentary material and is not joined to the quoted sutra. ‘Syllogism’ is the translator's period label, not an identity claim with Aristotelian syllogism; presentation to another person, pervasion, and a shared example interpret the larger theory rather than this sentence alone.",
    context:
      "1.1.32是只列举五支的完整经文译句。其后方括号内的山、烟、火五步例，以及再扩充五支的说明，都属于注释性材料。1.1.33定义命题，1.1.34至35分别说明肯定式与否定式理由，1.1.36至37分别说明肯定例与否定例，1.1.38定义应用，1.1.39定义结论；1.1.40随即转入推究。",
    englishContext:
      "Sutra 1.1.32 is a complete translated sentence that only enumerates the five members. The following bracketed hill-smoke-fire illustration and the discussion adding five further members are explanatory material. Sutra 1.1.33 defines proposition; 1.1.34–35 treat affirmative and negative reason; 1.1.36–37 treat affirmative and negative example; 1.1.38 defines application; 1.1.39 defines conclusion; and 1.1.40 then turns to tarka.",
    distinction:
      "syllogism是这位译者采用的时代性英语标签，并不证明正理论式等同于亚里士多德三段论。面向他人的陈述、遍充关系与共同例证来自更大的理论语境，不是1.1.32这一列举句本身逐字断言的内容。",
    englishDistinction:
      "‘Syllogism’ is the translator's period label and does not establish an identity between the Nyaya argument and Aristotelian syllogism. Presentation to another person, pervasion, and a shared example belong to the larger theoretical context rather than to the literal assertions of the enumerative sentence in 1.1.32.",
    question:
      "你的结论与理由之间，缺的是共同规则、可检验的例证，还是对个案的应用？",
    englishQuestion:
      "Between your reason and conclusion, what is missing: a shared rule, a testable example, or application to the case?",
    sourceLocator: [
      "《正理经》1.1.32；Satīśa Chandra Vidyābhūṣaṇa 英译《The Nyâya Sûtras of Gotama》（Allahabad: Panini Office, 1913），印刷页10，完整连续译句；各支定义续见1.1.33—39、印刷页11—13，同页方括号例不属于引句；仅确认美国公版",
      "Nyāya Sūtra 1.1.32; Satīśa Chandra Vidyābhūṣaṇa, trans., The Nyâya Sûtras of Gotama (Allahabad: Panini Office, 1913), print p. 10, complete continuous translated sentence; definitions follow at 1.1.33–39, print pp. 11–13, and the bracketed example on p. 10 is not part of the excerpt; U.S. public-domain status only",
    ],
  },
  {
    id: "indian-nyaya-debate-modes",
    authorId: "aksapada-gautama",
    topic: "辩证",
    text: "以取胜为目标的诤论，是以前述方式，借助曲解、似难及其他应受责斥的手段，对一个命题作辩护或攻击。",
    english:
      "Wrangling, which aims at gaining victory, is the defence or attack of a proposition in the manner aforesaid by quibbles, futilities, and other processes which deserve rebuke.",
    editorialSummary:
      "以求真为目标的讨论不同于只求胜负的争辩，也不同于自己不立主张、只负责摧毁对方的诘难。",
    englishEditorialSummary:
      "Truth-oriented discussion differs from eristic dispute aimed at victory, and from destructive criticism that advances no thesis of its own.",
    work: "《正理经》",
    englishWork: "Nyaya Sutra",
    presentationNature: "source-excerpt",
    reflection:
      "1.2.2这句只界定诤论（jalpa）；求真论议与只攻击对方的坏议分别见1.2.1与1.2.3，因此旧卡的三分对照属于跨三条经文的编辑摘要。“以前述方式”回指1.2.1所说的命题辩护与攻击结构，并不替曲解、似难等手段背书。这一分类也不要求所有公共冲突都温和，而是要求诚实说明自己是在共同求证，还是策略性交锋。",
    englishReflection:
      "This sentence in 1.2.2 defines only wrangling (jalpa); truth-directed discussion and cavil that merely attacks the other side appear in 1.2.1 and 1.2.3, so the former threefold contrast is an editorial synthesis across three sutras. ‘In the manner aforesaid’ points back to the structure of defence and attack in 1.2.1 and does not endorse quibbles or futilities. The distinction does not require every public conflict to be gentle; it asks us to admit whether we seek joint inquiry or strategic victory.",
    context:
      "1.2.1先界定借助知识手段与反驳、且不偏离既定论旨的论议；1.2.2转向求胜的诤论，1.2.3再把坏议限定为只攻击对方。译本方括号说明另把三者概括为求真、求胜与找错。",
    englishContext:
      "Sutra 1.2.1 first defines discussion through means of right knowledge and confutation without deviation from established tenets. Sutra 1.2.2 turns to victory-seeking wrangling, and 1.2.3 limits cavil to attacking the other side; the translator's bracketed exposition separately summarizes their aims as truth, victory, and fault-finding.",
    distinction:
      "本引句只界定诤论，不能把所有激烈异议都判成求胜，也不能据此句单独推出坏议“不立己论”；判断三类仍须分别看目标、规则与所用手段。",
    englishDistinction:
      "The excerpt defines wrangling only. It does not make every forceful disagreement victory-seeking or by itself establish that cavil advances no thesis; distinguishing the three still requires attention to aim, constraints, and technique.",
    question:
      "你正在参与的讨论，是为了共同判断，赢得局面，还是只让对方无法站立？",
    englishQuestion:
      "Is your present discussion aimed at joint judgment, winning the encounter, or merely leaving the other side unable to stand?",
    sourceLocator: [
      "《正理经》1.2.2；Satīśa Chandra Vidyābhūṣaṇa 英译《The Nyâya Sûtras of Gotama》（Allahabad: Panini Office, 1913），印刷页15（扫描/PDF第40页），完整连续译句；论议与坏议分别见1.2.1（印刷页14）和1.2.3（同页15），三分对照不属于本句逐字内容；仅确认美国公版",
      "Nyāya Sūtra 1.2.2; Satīśa Chandra Vidyābhūṣaṇa, trans., The Nyâya Sûtras of Gotama (Allahabad: Panini Office, 1913), print p. 15 (scan/PDF p. 40), complete continuous translated sentence; discussion and cavil occur in 1.2.1 (print p. 14) and 1.2.3 (also p. 15), so the threefold contrast is not verbatim in this sentence; U.S. public-domain status only",
    ],
  },
  {
    id: "indian-vaisheshika-dharma-inquiry",
    authorId: "kanada",
    topic: "解脱",
    text: "法，是成就“上升”与最高善之所由。",
    english:
      "Dharma (is) that from which (results) the accomplishment of Exaltation and of the Supreme Good.",
    editorialSummary:
      "对法的考察，不只关乎当下生活的改善，也以最高善为方向；分类世界因而与如何生活相连。",
    englishEditorialSummary:
      "Inquiry into dharma concerns not only flourishing in this life but also the highest good; classifying the world is therefore connected with how one lives.",
    work: "《胜论经》",
    englishWork: "Vaisheshika Sutra",
    presentationNature: "source-excerpt",
    reflection:
      "《胜论经》以法开启探究，并在随后把辨认实在的范畴与最高善联系起来。这句先用两种结果界定法，却没有在一句中解决‘上升’究竟指幸福、知识还是别的成就；这里的法也不宜直接等同于现代法律、道德规则或宗教信条。",
    englishReflection:
      "The Vaisheshika Sutra opens with dharma and subsequently connects discernment of the real categories with the Supreme Good. This sentence first characterizes dharma by two results, without settling in a single line whether ‘Exaltation’ means happiness, knowledge, or another attainment. Its dharma should not be equated directly with modern law, moral rules, or religious dogma.",
    context:
      "1.1.1宣布“现在，因此，我们将解释法”；1.1.2以本句界定法。1.1.3接着论吠陀的权威，1.1.4才把由特殊之法所生、对实体等六个可说者的如实知识与最高善联系起来。因此，旧卡关于世界分类与生活方向的连接，是1.1.1—4的编辑性合读。",
    englishContext:
      "Sinha's 1.1.1 announces, ‘Now, therefore, we shall explain Dharma,’ and 1.1.2 supplies the present characterization. Sutra 1.1.3 then treats Vedic authority, while 1.1.4 connects the Supreme Good with knowledge, produced by a particular dharma, of the six predicables beginning with Substance. The old card's link between classifying the world and a way of life is therefore an editorial reading across 1.1.1–4.",
    distinction:
      "Sinha把abhyudaya译为“Exaltation”；其所录Upaskāra释为对诸本质的知识，Vṛttikāra则释为幸福。故旧卡的“当下生活的改善”不是这十五词的逐字内容，也不能由本句单独推出。引句本身没有列出世界范畴，更没有把dharma等同于现代法律。",
    englishDistinction:
      "Sinha renders abhyudaya as ‘Exaltation.’ His Upaskara gloss identifies it with knowledge of essences, whereas the Vrittikara takes it as happiness. The old card's ‘flourishing in this life’ is therefore not wording in these fifteen words and cannot be established from this sentence alone. The excerpt neither enumerates the world's categories nor equates dharma with modern law.",
    question: "如果一套世界分类不能改变人的判断与行动，它还算一种生活哲学吗？",
    englishQuestion:
      "If a classification of the world cannot alter judgment and action, does it still count as a philosophy of life?",
    sourceLocator: [
      "《胜论经》1.1.2；Nandalal Sinha 1923年第二版公版英译，The Sacred Books of the Hindus第6卷，印刷页5（扫描/PDF第43页）；完整连续15词英文句，止于“Supreme Good.”，中文为项目研读译文",
      "Vaisheshika Sutra 1.1.2; Nandalal Sinha's public-domain English translation, 2nd rev. and enlarged ed. (1923), The Sacred Books of the Hindus, vol. VI, print p. 5 (scan/PDF p. 43); complete continuous 15-word English sentence ending at ‘Supreme Good.’, with a project Chinese study translation",
    ],
  },
  {
    id: "indian-vaisheshika-nine-substances",
    authorId: "kanada",
    topic: "自我",
    text: "地、水、火、风、空、时间、方位、自我与心，是仅有的实体。",
    english:
      "Earth, Water, Fire, Air, Ether, Time, Space, Self, and Mind (are) the only Substances.",
    editorialSummary:
      "世界不能只用可触摸之物来说明；地、水、火、风之外，空间、时间、方向、自我与心也被列为实体。",
    englishEditorialSummary:
      "The world cannot be explained only through tangible things: alongside earth, water, fire, and air, space, time, direction, self, and mind are counted as substances.",
    work: "《胜论经》",
    englishWork: "Vaisheshika Sutra",
    presentationNature: "source-excerpt",
    reflection:
      "九种实体展示了胜论派的实在论幅度：物质元素、时空条件和认知主体被置于同一分类框架。这里的‘实体’是承担性质与运动的哲学范畴，心也被理解为微细而内在的感官，并非现代心理学意义的意识总称。",
    englishReflection:
      "The nine substances show the breadth of Vaisheshika realism: material elements, spatiotemporal conditions, and cognitive subjects enter one classificatory scheme. Substance here is a philosophical category that bears qualities and motions; mind is treated as a subtle internal sense, not as the modern psychological name for consciousness as a whole.",
    context:
      "1.1.4先列出实体、性质、运动、共相、殊相与和合六个可说者；1.1.5随即划分第一项“实体”。Sinha紧随本句解释末词iti具有限定作用，表示实体恰为九种、不多不少，并说后文将分别给出它们的差相。",
    englishContext:
      "Sutra 1.1.4 first lists the six predicables—Substance, Attribute, Action, Genus, Species, and Combination—and 1.1.5 then divides the first, Substance. Immediately after this sentence, Sinha explains that the final iti has determinative force: the substances are exactly nine, neither more nor less, and their differentiae will be stated later.",
    distinction:
      "Sinha正文把ākāśa译作“Ether”、dik译作“Space”，而同页逐词释又把dik写成“direction, space”；中文以“空”与“方位”保留两个梵文项。这里的Ether不是近代物理学的以太，Mind也不是一切意识活动的总称。Sinha本版编号为1.1.5，并非旧卡的1.1.4。",
    englishDistinction:
      "Sinha's sentence renders akasha as ‘Ether’ and dik as ‘Space,’ while his word-by-word gloss gives dik as ‘direction, space’; the project translation uses two distinct Chinese terms to keep the Sanskrit items separate. Ether here is not the luminiferous ether of modern physics, and Mind is not a collective name for every conscious act. Sinha numbers the sentence 1.1.5, not the old card's 1.1.4.",
    question: "你关于‘真实存在’的清单，是否把经验得以发生的条件也算在其中？",
    englishQuestion:
      "Does your list of what truly exists include the conditions that make experience possible?",
    sourceLocator: [
      "《胜论经》1.1.5；Nandalal Sinha 1923年第二版公版英译，The Sacred Books of the Hindus第6卷，印刷页17（扫描/PDF第55页）；完整连续14词英文句，止于“Substances.”，中文为项目研读译文",
      "Vaisheshika Sutra 1.1.5; Nandalal Sinha's public-domain English translation, 2nd rev. and enlarged ed. (1923), The Sacred Books of the Hindus, vol. VI, print p. 17 (scan/PDF p. 55); complete continuous 14-word English sentence ending at ‘Substances.’, with a project Chinese study translation",
    ],
  },
  {
    id: "indian-vaisheshika-category-errors",
    authorId: "kanada",
    topic: "辩证",
    text: "它具有运动与性质，是和合因——这就是实体的标志。",
    english:
      "It possesses Action and Attribute, it is a combinative cause—such (is) the mark of Substance.",
    editorialSummary:
      "实体、性质与运动不能彼此混同：颜色依属于某物，移动是某物的活动，而承载二者的实体又不是二者的简单相加。",
    englishEditorialSummary:
      "Substance, quality, and motion must not be conflated: color belongs to something, movement is something's activity, and the substance bearing both is not merely their sum.",
    work: "《胜论经》",
    englishWork: "Vaisheshika Sutra",
    presentationNature: "source-excerpt",
    reflection:
      "胜论派用范畴标志防止把‘是什么’‘有什么样’和‘正在做什么’混为一谈。本句只给出实体的标志；紧随其后的经文才分别给出性质与运动的标志。因此，不能把后世完整的范畴论倒置为这一句的一次性声明。",
    englishReflection:
      "Vaisheshika categorical marks prevent us from confusing what a thing is, what it is like, and what it is doing. This sentence gives only the mark of Substance; the following sutras separately mark Attribute and Action. The later, fuller categorical theory should not be projected backward into this one sentence.",
    context:
      "1.1.8先说明实体、性质与运动在“有”与无常等方面的相似处，随后若干经文讨论其因果差别。1.1.15在“实体的特征”标题下给出本句，1.1.16与1.1.17才分别界定性质与运动。Sinha的注解把“具有运动与性质”解释为二者存在于实体之中，并把这些特征称为划分同类与异类的差别标志。",
    englishContext:
      "Sutra 1.1.8 first states respects in which Substance, Attribute, and Action resemble one another, and the following sutras discuss causal differences. Under ‘Characteristics of Substance,’ 1.1.15 gives this sentence; 1.1.16 and 1.1.17 then characterize Attribute and Action separately. Sinha's commentary explains ‘possesses Action and Attribute’ as their existing in Substance and treats the stated features as differentiating marks.",
    distinction:
      "本句只界定实体，没有逐字举颜色、移动，也没有说实体不是性质与运动的“简单相加”；这些属于旧卡的编辑性阐释。Sinha的“combinative cause”译samavāyi-kāraṇa，指一种内在或和合的因，不应与第七卷作为独立可说者的samavāya（其英译也是Combination）混成同一概念。",
    englishDistinction:
      "The sentence characterizes Substance only. It does not literally mention color, movement, or say that a substance is not the ‘sum’ of its attributes and actions; those are editorial explanations from the former card. Sinha's ‘combinative cause’ translates samavayi-karana, an inherent cause, and should not be conflated with samavaya, the independent predicable that he also translates as Combination in Book VII.",
    question:
      "你当前的争论，是否把对象、对象的性质和对象的变化偷换成了同一件事？",
    englishQuestion:
      "Does your current dispute slide between an object, its qualities, and its changes as though they were the same thing?",
    sourceLocator: [
      "《胜论经》1.1.15；Nandalal Sinha 1923年第二版公版英译，The Sacred Books of the Hindus第6卷，印刷页25（扫描/PDF第63页）；完整连续16词英文句，止于“Substance.”，中文为项目研读译文",
      "Vaisheshika Sutra 1.1.15; Nandalal Sinha's public-domain English translation, 2nd rev. and enlarged ed. (1923), The Sacred Books of the Hindus, vol. VI, print p. 25 (scan/PDF p. 63); complete continuous 16-word English sentence ending at ‘Substance.’, with a project Chinese study translation",
    ],
  },
  {
    id: "indian-vaisheshika-universal-particular",
    authorId: "kanada",
    topic: "认识",
    text: "实体性、性质性与运动性，既是共相，也是殊相。",
    english:
      "Substance-ness, and Attribute-ness and Action-ness are both Genera and Species.",
    editorialSummary:
      "认识事物既需要看见共同性，也需要辨认差异；只会归类会抹平个体，只见差别又无法形成知识。",
    englishEditorialSummary:
      "Knowing things requires both recognizing commonality and discerning difference; classification alone erases individuals, while difference alone cannot form knowledge.",
    work: "《胜论经》",
    englishWork: "Vaisheshika Sutra",
    presentationNature: "source-excerpt",
    reflection:
      "胜论传统借共相与殊相说明分类的层级：同一项相对于较窄者可以是共相，相对于较宽者又可以是殊相。本句所说的“殊相”是相对种概念，不等同于个人气质，也还不是终极实体中只起个别化作用的“最终殊相”。",
    englishReflection:
      "The Vaisheshika tradition uses genus and species to articulate levels of classification: the same item can be a genus relative to narrower classes and a species relative to a wider one. The ‘Species’ in this sentence is neither personal temperament nor yet the final particularity whose role is solely to individuate eternal substances.",
    context:
      "Sinha的1.2.4（全书累计第35条）先说“存在”只造成同类认识，因而只是共相。1.2.5（累计第36条）随即以本句说明实体性、性质性与运动性兼具较宽与较窄的分类地位。1.2.6（累计第37条）马上排除“最终殊相”，说明它们只是殊相而不是共相。",
    englishContext:
      "Sinha's 1.2.4 (running aphorism 35) first says that Existence causes assimilative cognition only and is therefore Genus only. Sutra 1.2.5 (running 36) then says that Substance-ness, Attribute-ness, and Action-ness occupy both wider and narrower classificatory roles. Sutra 1.2.6 (running 37) immediately excludes the ‘final Species,’ which is Species only and not Genus.",
    distinction:
      "Sinha在此把sāmānya/viśeṣa译作Genera/Species；项目中文依胜论术语译“共相/殊相”，但本句的viśeṣa是在分类层级中相对较窄的“种”，不能无条件等同于独立范畴中的终极殊相。Sinha本版明确编号1.2.5、累计36；旧卡1.2.3—18只是宽泛范围，不可当成本句定位。",
    englishDistinction:
      "Sinha here renders samanya/visesa as ‘Genera/Species.’ The Chinese uses the Vaisheshika terms universal/particular, but visesa in this sentence is the relatively narrower species in a hierarchy and cannot simply be identified with the final individuating particular as an independent predicable. Sinha explicitly numbers it 1.2.5 and running aphorism 36; the old 1.2.3–18 range is not a locator for this sentence.",
    question:
      "面对一个人或事件时，你是在用共同概念理解它，还是让概念遮住了它的独特处？",
    englishQuestion:
      "When facing a person or event, are you using a shared concept to understand it, or letting the concept hide what is singular?",
    sourceLocator: [
      "《胜论经》1.2.5（Sinha本全书累计第36条）；Nandalal Sinha 1923年第二版公版英译，The Sacred Books of the Hindus第6卷，印刷页41（扫描/PDF第79页）；完整连续10词英文句，止于“Species.”，中文为项目研读译文",
      "Vaisheshika Sutra 1.2.5 (running aphorism 36 in Sinha's edition); Nandalal Sinha's public-domain English translation, 2nd rev. and enlarged ed. (1923), The Sacred Books of the Hindus, vol. VI, print p. 41 (scan/PDF p. 79); complete continuous 10-word English sentence ending at ‘Species.’, with a project Chinese study translation",
    ],
  },
  {
    id: "indian-vaisheshika-atoms-composites",
    authorId: "kanada",
    topic: "因果",
    text: "果是终极原子（存在）的标志。",
    english:
      "The effect is the mark (of the existence) of the ultimate atom.",
    editorialSummary:
      "可见的复合物依赖不可见的微细成分及其结合；整体具有部分单独存在时没有的尺度与结构。",
    englishEditorialSummary:
      "Visible composites depend on imperceptibly minute constituents and their conjunction; a whole has scale and structure not possessed by its parts in isolation.",
    work: "《胜论经》",
    englishWork: "Vaisheshika Sutra",
    presentationNature: "source-excerpt",
    reflection:
      "胜论原子论从复合之果反推不可再分的极微，并试图解释有尺度的物体如何由部分形成。这是一套古代因果与范畴理论；其中的终极原子来自对果、部分与整体的形上推论，并非凭现代实验定义的原子，不能当作近代物理学的提前发现。",
    englishReflection:
      "Vaisheshika atomism reasons from composite effects toward an indivisible limit and asks how extended bodies arise from parts. This is an ancient causal and categorical theory: its ultimate atom is reached through a metaphysical argument about effect, part, and whole, not defined by modern experiment, and should not be hailed as a premature discovery in modern physics.",
    context:
      "第四卷第一章以“永恒者是存在且无因者”开篇；4.1.2随即给出本句。Sinha所录Upaskāra把“果”举为水罐之类，并论证部分—整体的分解不能无限延伸，必须止于无部分的实体。4.1.6在印刷页136进一步说，外在知觉依赖尺度、由多于一个实体构成以及颜色。旧卡关于可见复合物、尺度与结构的说法，是这些相邻经注的合读。",
    englishContext:
      "Book IV, chapter 1 opens by defining the eternal as existent and uncaused; 4.1.2 immediately gives this sentence. Sinha's Upaskara takes an effect to be a water-pot or the like and argues that the part–whole regress must end in a partless substance. Sutra 4.1.6 on print p. 136 further connects external perception with magnitude, composition from more than one substance, and color. The old card's language of visible composites, scale, and structure synthesizes these neighboring sutras and comments.",
    distinction:
      "本句只说“果”是终极原子存在的标志；括号中的“of the existence”是Sinha译文的解释性补足。它没有逐字说极微不可见、复合要经结合，也没有声称整体的一切性质都不在部分中。Sinha在正文按卷章标为4.1.2，而目录另给全书累计第158条；两套编号不可混用。",
    englishDistinction:
      "The sentence says only that an effect marks the existence of the ultimate atom; ‘of the existence’ is Sinha's parenthetical completion. It does not literally say that atoms are imperceptible, that every composite requires conjunction, or that all properties of a whole are absent from its parts. Sinha numbers it 4.1.2 in the text, while the contents also give running aphorism 158; the two numbering systems should not be mixed.",
    question:
      "当许多部分组成一个整体时，哪些新性质来自结构，而不是任何一个部分本身？",
    englishQuestion:
      "When many parts compose a whole, which new properties arise from structure rather than from any single part?",
    sourceLocator: [
      "《胜论经》4.1.2（Sinha本目录累计第158条）；Nandalal Sinha 1923年第二版公版英译，The Sacred Books of the Hindus第6卷，印刷页134（扫描/PDF第172页）；完整连续12词英文句，止于“atom.”，中文为项目研读译文",
      "Vaisheshika Sutra 4.1.2 (running aphorism 158 in Sinha's contents); Nandalal Sinha's public-domain English translation, 2nd rev. and enlarged ed. (1923), The Sacred Books of the Hindus, vol. VI, print p. 134 (scan/PDF p. 172); complete continuous 12-word English sentence ending at ‘atom.’, with a project Chinese study translation",
    ],
  },
  {
    id: "indian-vaisheshika-inherence",
    authorId: "kanada",
    topic: "因果",
    text: "对于果与因，凭借它而生起“此在于此”这种认识的，就是和合。",
    english:
      "That is Combination by virtue of which (arises the intuition) in the form of “This is here,” with regard to effect and cause.",
    editorialSummary:
      "有些关系不是外在拼接：性质之于实体、部分之于整体，必须借一种不可分离的依存关系来说明。",
    englishEditorialSummary:
      "Some relations are not external attachments: quality to substance and part to whole require an inseparable relation of dependence.",
    work: "《胜论经》",
    englishWork: "Vaisheshika Sutra",
    presentationNature: "source-excerpt",
    reflection:
      "胜论以“和合”解释果如何在因中、性质如何在实体中而又不与承载者等同。它不是把两个现成物体黏住的隐形物质，而是为不可分离的范畴依存提出的关系概念；经文本句先从果与因界定，更多例子来自紧随其后的注解。",
    englishReflection:
      "Vaisheshika uses inherence to explain how an effect is in its cause and how a quality is in a substance without identity between bearer and borne. It is not an invisible glue attaching two ready-made objects, but a relational concept for inseparable categorical dependence. The sutra begins with effect and cause; the additional examples come from its commentary.",
    context:
      "第七卷第二章此前考察数、分离、结合、分离作用、先后等性质；7.2.26转而问“和合本身是什么”，并用本句回答。Sinha所录Upaskāra马上说明“果与因”只是提示，还包括非果与非因的情形，并举布在缕中、性质与运动在实体中、牛性在牛中等例，且明确说这种关系不是普通结合。",
    englishContext:
      "Earlier portions of Book VII, chapter 2 examine Number, Separateness, Conjunction, Disjunction, Priority, and Posteriority. Sutra 7.2.26 then asks what Combination itself is and answers with this sentence. Sinha's Upaskara immediately says that ‘effect and cause’ is indicative rather than exhaustive, adds non-effect and non-cause cases, and gives examples such as cloth in threads, attribute and action in substance, and bovineness in a cow; it expressly denies that this relation is mere conjunction.",
    distinction:
      "Sinha把samavāya译作“Combination”，项目中文按胜论术语译“和合”，英文研读中常称inherence；三者指同一技术概念，不是日常的组合。性质—实体、部分—整体与“不可分离”都来自同页注解，不是这二十三词全部逐字内容。Sinha本编号为7.2.26、累计307；同页还注明Bhāṣya把此前7.2.24—25合读为一条，显示传本分句确有差异。",
    englishDistinction:
      "Sinha renders samavaya as ‘Combination’; the project Chinese uses the Vaisheshika technical term, while modern English study often says inherence. All refer here to a technical relation, not everyday combination. Quality–substance, part–whole, and inseparability come from the same-page commentary rather than all being wording in these twenty-three words. Sinha numbers the sutra 7.2.26 and running aphorism 307; the same page notes that the Bhasya combines the preceding 7.2.24–25, confirming real differences in division.",
    question:
      "你所描述的性质能否脱离它的承载者存在，若不能，这种依存意味着什么？",
    englishQuestion:
      "Can the quality you describe exist apart from its bearer, and if not, what does that dependence imply?",
    sourceLocator: [
      "《胜论经》7.2.26（Sinha本全书累计第307条）；Nandalal Sinha 1923年第二版公版英译，The Sacred Books of the Hindus第6卷，印刷页243（扫描/PDF第281页）；完整连续23词英文句，止于“cause.”，中文为项目研读译文",
      "Vaisheshika Sutra 7.2.26 (running aphorism 307 in Sinha's edition); Nandalal Sinha's public-domain English translation, 2nd rev. and enlarged ed. (1923), The Sacred Books of the Hindus, vol. VI, print p. 243 (scan/PDF p. 281); complete continuous 23-word English sentence ending at ‘cause.’, with a project Chinese study translation",
    ],
  },
  {
    id: "indian-mimamsa-inquiry-dharma",
    authorId: "jaimini",
    topic: "伦理",
    text: "现在开始考察法。",
    english: "Now is the enquiry of duty.",
    editorialSummary:
      "何为应当履行之法，并非凭习惯就能自明；它必须成为一项有方法、有文本依据的探究。",
    englishEditorialSummary:
      "What dharma ought to be performed is not self-evident from habit; it must become an inquiry with method and textual grounds.",
    work: "《弥曼差经》",
    englishWork: "Mimamsa Sutra",
    presentationNature: "source-excerpt",
    reflection:
      "弥曼差以‘现在开始考察法’开启系统诠释，关注吠陀仪式义务怎样被理解与判定。它训练的是在复杂文本中辨明规范的能力，但其法概念扎根于特定祭仪传统，不能无条件扩展为所有时代的普遍伦理。",
    englishReflection:
      "Mimamsa opens with a systematic inquiry into dharma, asking how Vedic ritual obligations are understood and determined. It cultivates the ability to discern norms within complex texts, but its concept of dharma is rooted in a particular sacrificial tradition and cannot simply be universalized as ethics for every age.",
    context:
      "这是《弥曼差经》1.1.1的开篇短句。紧接着，1.1.2把法界定为由命令标示的对象，1.1.3转向考察法的根据；1.1.4限定知觉只能把握已经存在且与感官接触的对象，1.1.5则转入词义关系与吠陀言说权威。因而首页旧命题所说的“方法与文本依据”，来自这一开篇在后续经文中展开的程序，而不全在六个英文词里。",
    englishContext:
      "This is the opening sentence of Mimamsa Sutra 1.1.1. Sutra 1.1.2 immediately characterizes dharma as an object marked by a command, and 1.1.3 turns to examining its ground. Sutra 1.1.4 limits perception to an existing object in contact with the senses, while 1.1.5 turns to word-meaning relations and Vedic verbal authority. The old card's language of method and textual grounds therefore summarizes the procedure unfolded after this six-word opening rather than wording all contained in it.",
    distinction:
      "Mohan Lal Sandal把dharma译作“duty”；中文保留弥曼差语境中的“法”，不把它缩成一般个人责任。原句只宣布探究开始，没有逐字否定习惯、列出方法，也没有证明这套祭仪规范可直接成为所有时代的普遍伦理。",
    englishDistinction:
      "Mohan Lal Sandal renders dharma as ‘duty’; the Chinese retains the broader term fa to preserve its Mimamsa setting rather than reducing it to ordinary personal responsibility. The sentence merely announces the inquiry. It does not itself reject habit, list a method, or establish these ritual norms as universal ethics for every age.",
    question: "当你说一件事‘本来就该如此’，你能说明这种应当从哪里来吗？",
    englishQuestion:
      "When you say something ‘simply ought to be so,’ can you explain where that ought comes from?",
    sourceLocator: [
      "《弥曼差经》1.1.1；Mohan Lal Sandal 1923年公版英译，The Sacred Books of the Hindus第27卷第1部，印刷页1（扫描/PDF第65页）；完整连续英文短句，止于译者随后括注的梵文dharma之前，中文为项目研读译文",
      "Mimamsa Sutra 1.1.1; Mohan Lal Sandal's public-domain translation (1923), The Sacred Books of the Hindus, vol. XXVII, part I, print p. 1 (scan/PDF p. 65); complete continuous English sentence ending before the translator's following parenthetical Sanskrit gloss for dharma, with a project Chinese study translation",
    ],
  },
  {
    id: "indian-mimamsa-injunction-dharma",
    authorId: "jaimini",
    topic: "伦理",
    text: "法是由命令加以标示的对象。",
    english: "The duty is an object distinguished by a command.",
    editorialSummary:
      "在弥曼差的语境里，法由促使行动的吠陀命令加以标示；描述发生了什么，与规定应做什么并不是同一种语句功能。",
    englishEditorialSummary:
      "In Mimamsa, dharma is marked by a Vedic injunction that impels action; describing what happens and prescribing what ought to be done are not the same function of language.",
    work: "《弥曼差经》",
    englishWork: "Mimamsa Sutra",
    presentationNature: "source-excerpt",
    reflection:
      "这一命题把规范知识同命令式语言紧密连接，并让后世弥曼差发展出精细的句法与义务理论。它并不是说任何命令都自动正确，而是在吠陀权威这一前提下界定仪式之法；接受其分析，不等于必须接受此前提。",
    englishReflection:
      "This thesis closely connects normative knowledge with injunctive language and prompted later Mimamsa to develop subtle theories of syntax and obligation. It does not say that every command is automatically right; it defines ritual dharma under the premise of Vedic authority. One may study the analysis without accepting that premise.",
    context:
      "1.1.1宣布开始考察法，1.1.2随即以本句作出界定。Sandal在紧接本句的说明中把其约束性归于吠陀命令；1.1.3转向考察法的根据，1.1.4再说明知觉为何不能成为法的根据。旧卡所说的命令“促使行动”与陈述句、规定句的功能差别，是这一开篇及后世弥曼差诠释学的概括。",
    englishContext:
      "Sutra 1.1.1 announces the inquiry into dharma, and 1.1.2 immediately supplies this characterization. In his note directly after the sentence, Sandal connects its binding character with Vedic injunction. Sutra 1.1.3 turns to dharma's ground, and 1.1.4 explains why perception cannot be that ground. The old card's language about impelling action and the difference between description and prescription summarizes this opening and later Mimamsa hermeneutics.",
    distinction:
      "Sandal把dharma译作“duty”；中文保留“法”。英文经句只说“command”，其吠陀限定来自紧邻说明与全篇祭仪语境。它没有逐字提出完整的陈述—规定区分，也没有说任何人的任何命令都能产生法；这些较宽命题保留为编辑性概括。",
    englishDistinction:
      "Sandal renders dharma as ‘duty’; the Chinese retains fa. The translated sutra itself says only ‘command’; its Vedic qualification comes from the immediately following note and the work's ritual setting. It neither states a complete descriptive-prescriptive distinction nor says that any command by anyone creates dharma. Those broader claims remain editorial synthesis.",
    question: "一条规范是在陈述事实、提出理由，还是仅仅要求你行动？",
    englishQuestion:
      "Is a norm stating a fact, offering a reason, or simply directing you to act?",
    sourceLocator: [
      "《弥曼差经》1.1.2；Mohan Lal Sandal 1923年公版英译，The Sacred Books of the Hindus第27卷第1部，印刷页1（扫描/PDF第65页）；完整连续英文句，中文为项目研读译文",
      "Mimamsa Sutra 1.1.2; Mohan Lal Sandal's public-domain translation (1923), The Sacred Books of the Hindus, vol. XXVII, part I, print p. 1 (scan/PDF p. 65); complete continuous English sentence, with a project Chinese study translation",
    ],
  },
  {
    id: "indian-mimamsa-perception-limit",
    authorId: "jaimini",
    topic: "认识",
    text: "它并不是法的根据，因为它获得的是对已经存在之物的认识。",
    english:
      "It is not the cause of duty by reason of acquiring knowledge of the thing existing.",
    editorialSummary:
      "知觉把握感官当前接触的既有对象，却不能仅凭自身告诉我们尚待履行的法；不同对象要求不同的知识来源。",
    englishEditorialSummary:
      "Perception apprehends existing objects presently in contact with the senses, but cannot by itself disclose dharma yet to be performed; different objects require different sources of knowledge.",
    work: "《弥曼差经》",
    englishWork: "Mimamsa Sutra",
    presentationNature: "source-excerpt",
    reflection:
      "弥曼差并不否认知觉，而是划定其适用范围：眼前事实与超出当下感官的仪式义务不可用同一方式确证。这种‘知识手段的分工’很有启发性，但经文由此为吠陀提供特殊权威，仍是一项需要独立检验的传统主张。",
    englishReflection:
      "Mimamsa does not reject perception; it limits its jurisdiction. Present facts and ritual duties beyond current sensation cannot be established in the same way. This division of epistemic labor is illuminating, though the special authority it grants the Veda remains a tradition-specific claim requiring independent scrutiny.",
    context:
      "本句是1.1.4译文的第二个完整句子；开头的“It”承接前一句所界定的知觉，即感官与灵魂接触而有的认识。经句以知觉取得“已经存在之物”的知识为由，否定它是法的根据。1.1.5随即转向词义关系与言说权威，展开另一种知识根据。",
    englishContext:
      "This is the second complete sentence in Sandal's translation of sutra 1.1.4. Its opening ‘It’ refers to perception as characterized in the immediately preceding sentence: knowledge arising through the senses coming into contact with the soul. Because perception acquires knowledge of an existing thing, the sutra denies that it is the ground of dharma. Sutra 1.1.5 then turns to word-meaning relations and verbal authority as another epistemic ground.",
    distinction:
      "本卡保留原译中略显生硬的“cause of duty”，中文按论证功能译作“法的根据”。短句没有否认知觉对现存对象的效力，也没有逐字说“不同对象要求不同来源”；后者是1.1.4—5之间论证转折的编辑性概括。“尚待履行”同样是对法的时间结构的解释，而非这十六词中的明说。",
    englishDistinction:
      "The card preserves Sandal's somewhat awkward ‘cause of duty,’ rendered in Chinese as the ground of dharma to fit the argument. The sentence does not deny perception's force regarding existing objects, nor does it literally say that different objects require different sources; the latter is an editorial summary of the transition from 1.1.4 to 1.1.5. ‘Yet to be performed’ likewise interprets dharma's temporal structure rather than quoting these sixteen words.",
    question:
      "你是否正用一种适合观察事实的方法，去回答它本来无力决定的规范问题？",
    englishQuestion:
      "Are you using a method suited to observable facts to answer a normative question it cannot by itself decide?",
    sourceLocator: [
      "《弥曼差经》1.1.4第二个完整句子；Mohan Lal Sandal 1923年公版英译，The Sacred Books of the Hindus第27卷第1部，印刷页2（扫描/PDF第66页）；从“It is”至“existing.”连续照录，中文为项目研读译文",
      "Second complete sentence of Mimamsa Sutra 1.1.4; Mohan Lal Sandal's public-domain translation (1923), The Sacred Books of the Hindus, vol. XXVII, part I, print p. 2 (scan/PDF p. 66); continuous excerpt from ‘It is’ through ‘existing.’, with a project Chinese study translation",
    ],
  },
  {
    id: "indian-mimamsa-word-authority",
    authorId: "jaimini",
    topic: "认识",
    text: "词与其意义之间确有永恒的联系；……",
    english:
      "Certainly there is eternal connection between the word and its meaning; …",
    editorialSummary:
      "语言要成为知识来源，词与意义的关系以及文本不依赖某位易错作者的权威，都必须得到说明。",
    englishEditorialSummary:
      "For language to serve as a source of knowledge, the relation between word and meaning—and a text's authority without dependence on a fallible author—must be explained.",
    work: "《弥曼差经》",
    englishWork: "Mimamsa Sutra",
    presentationNature: "source-excerpt",
    reflection:
      "《弥曼差经》在反驳异议时维护词义关系与吠陀传承的可靠性，后世注疏家进一步明确发展出吠陀‘非人为’的理论。将成熟的作者缺席论全部归给阇弥尼会过度简化思想史；它也不能替代现代文献批判。",
    englishReflection:
      "In answering objections, the Mimamsa Sutra defends word-meaning relations and the reliability of Vedic transmission; later commentators articulated the stronger doctrine that the Veda is authorless. Attributing the entire mature theory to Jaimini would flatten its history, and the doctrine cannot replace modern textual criticism.",
    context:
      "1.1.4先说知觉只接触已经存在的对象，不能由此把握尚待履行的法。1.1.5随后在一个长经句中并列数项主张：词与意义的关系恒常、由此获得教示、对不可见之事不出错，并以不依赖其他证明解释婆达罗衍所说的权威。本卡只摘录第一项；1.1.6—23随即以反对意见与答辩讨论声音或词是否恒常，1.1.24—26再讨论词组成句子后如何传达意义。",
    englishContext:
      "Sutra 1.1.4 first limits perception to an existing object and thus excludes dharma still to be performed from its reach. Sutra 1.1.5 then joins several claims in one long sutra: the word-meaning relation is eternal, knowledge from it is instruction, it does not err concerning invisible matters, and Badarayana regards it as authoritative because it depends on nothing else. This card quotes only the first claim. Sutras 1.1.6–23 then stage objections and replies about the eternity of sound or word, and 1.1.24–26 address how words arranged in a sentence convey meaning.",
    distinction:
      "省略号明确表示原经句仍在继续；首页只呈现“词—义关系恒常”这一连续分句。它本身没有说文本没有作者，也没有证明一切语言可靠。旧卡中的“文本不依赖易错作者”是对本经句后半、译注及后世非人为论的思想史概括，不能倒装成这十一词的逐字内容；“永恒联系”也不是现代语言学结论。",
    englishDistinction:
      "The ellipsis explicitly marks that the sutra continues; the card presents only its continuous opening claim about an eternal word-meaning relation. That clause does not say that a text has no author or that all language is reliable. The old card's reference to independence from a fallible author is a historical synthesis of the latter part of the sutra, Sandal's explanation, and later authorlessness doctrine, not wording contained in these eleven words. Nor is ‘eternal connection’ a conclusion of modern linguistics.",
    question:
      "你信任一段文字，是因为作者可靠、传承稳定、论证成立，还是这些理由被混在了一起？",
    englishQuestion:
      "Do you trust a text because its author is reliable, its transmission stable, or its argument sound—or have these reasons been conflated?",
    sourceLocator: [
      "《弥曼差经》1.1.5开头第一连续分句；Mohan Lal Sandal 1923年公版英译，The Sacred Books of the Hindus第27卷第1部，印刷页2（扫描/PDF第66页）；节选止于分号并以省略号标明原经句继续，英文照录，中文为项目研读译文",
      "Opening continuous clause of Mimamsa Sutra 1.1.5; Mohan Lal Sandal's public-domain translation (1923), The Sacred Books of the Hindus, vol. XXVII, part I, print p. 2 (scan/PDF p. 66); excerpt ends at the semicolon and adds an ellipsis to mark that the sutra continues, English wording quoted verbatim with a project Chinese study translation",
    ],
  },
  {
    id: "indian-mimamsa-distinguishing-actions",
    authorId: "jaimini",
    topic: "认识",
    text: "由于列举各自分立，行动有所区别。",
    english:
      "Because there is separateness with the enumeration, there is a difference of action.",
    editorialSummary:
      "相似的仪式行为是否属于同一行动，不能只看表面动作；名称、语境、重复与具体规定共同决定其身份。",
    englishEditorialSummary:
      "Whether similar ritual performances count as the same action cannot be decided by outward movement alone; name, context, repetition, and specific prescription jointly determine their identity.",
    work: "《弥曼差经》",
    englishWork: "Mimamsa Sutra",
    presentationNature: "source-excerpt",
    reflection:
      "弥曼差第二卷处理行为的同一与差异，像法律解释一样综合多种文本线索。其具体对象是祭仪，而可迁移的方法是：在判定两个行为是否相同时，要同时考察目的、规则位置和重复方式，而非只凭直观相像。",
    englishReflection:
      "Book Two of Mimamsa analyzes the identity and difference of actions by combining textual clues in a manner reminiscent of legal interpretation. Its direct object is ritual, but its transferable lesson is methodological: purpose, rule placement, and modes of repetition matter alongside outward resemblance.",
    context:
      "第二卷第二章连续讨论祭仪行动何时重复、何时同一。2.2.19—20处理净化环节与重复，2.2.21以列举项目的分立判定行动有别；紧接的2.2.22又以不同名称作为行动有别的线索，2.2.23—24继续处理附属环节与性质。短摘录只取2.2.21的完整句。",
    englishContext:
      "Book II, chapter 2 repeatedly asks when ritual actions are repeated or remain one. Sutras 2.2.19–20 treat purificatory acts and repetition; 2.2.21 takes separateness in an enumeration as marking a difference of action. The immediately following 2.2.22 adds distinct names as a clue, and 2.2.23–24 continue with subordinate acts and qualities. The excerpt is only the complete sentence of 2.2.21.",
    distinction:
      "Sandal的“enumeration”在这里指经文列举或数目的分立，并非一般统计分类；“action”处在祭仪技术语境。旧卡列出的名称、语境、重复和具体规定，是第二卷多经句的综合，不是2.2.21一条经句逐字列出的四项，也不应误作现代法律身份测试的直接表述。",
    englishDistinction:
      "Sandal's ‘enumeration’ here concerns separateness in textual enumeration or number, not statistical classification in general, and ‘action’ belongs to a technical ritual setting. The old card's list of name, context, repetition, and specific prescription synthesizes several Book II sutras; it is not a four-part list stated verbatim in 2.2.21, nor a direct formulation of a modern legal identity test.",
    question:
      "两件看似相同的行为，会不会因规则语境和目的不同而成为不同的行动？",
    englishQuestion:
      "Can two outwardly similar performances become different actions because their governing context and purpose differ?",
    sourceLocator: [
      "《弥曼差经》2.2.21；Mohan Lal Sandal 1923年公版英译，The Sacred Books of the Hindus第27卷第1部，印刷页62（扫描/PDF第126页）；完整连续英文句，中文为项目研读译文",
      "Mimamsa Sutra 2.2.21; Mohan Lal Sandal's public-domain translation (1923), The Sacred Books of the Hindus, vol. XXVII, part I, print p. 62 (scan/PDF p. 126); complete continuous English sentence, with a project Chinese study translation",
    ],
  },
  {
    id: "indian-mimamsa-primary-auxiliary",
    authorId: "jaimini",
    topic: "辩证",
    text: "它们分为两类：主要的与从属的。",
    english: "They are of two kinds principal and subordinate.",
    editorialSummary:
      "解释一套复杂规则时，必须分清主要行动与辅助环节；局部指令的意义取决于它在整体中的从属关系。",
    englishEditorialSummary:
      "Interpreting a complex rule system requires distinguishing the principal act from its auxiliaries; a local instruction derives meaning from its subordinate relation within the whole.",
    work: "《弥曼差经》",
    englishWork: "Mimamsa Sutra",
    presentationNature: "source-excerpt",
    reflection:
      "弥曼差第二卷先区分主要行动与从属行动，第三卷再以句法、位置、名称与上下文等线索判断某项规定服务于哪个主要仪式。它提醒我们，不能把文本碎片孤立地提升为总原则；但这种技术最初服务于祭仪协调，应用到法律或日常生活时仍需另作论证。",
    englishReflection:
      "Book Two of Mimamsa first distinguishes principal from subordinate acts, while Book Three uses syntax, placement, naming, and context to decide which principal rite a rule serves. It warns against elevating an isolated fragment into a universal principle. These techniques were developed for coordinating rituals and require further argument before transfer to law or daily life.",
    context:
      "第二卷第一章先从动词说明行动，并在2.1.5谈到促发行动的动力；2.1.6随即用本句把这些行动分为主要与从属两类。2.1.7说明何时物质从属于行动而行动为主要，2.1.8则说明何时对物质的处理使行动成为从属。第三卷后来把主从关系扩展为更细的仪式规则配置。",
    englishContext:
      "Book II, chapter 1 first derives action from verbs and in 2.1.5 discusses the motive that initiates action. Sutra 2.1.6 then divides these acts into principal and subordinate kinds with this sentence. Sutra 2.1.7 explains when the substance is subordinate and the act principal; 2.1.8 explains when acting upon a substance makes the act subordinate. Book III later develops principal-auxiliary allocation in finer ritual detail.",
    distinction:
      "本句的“They”承接前文的行动；Sandal的“subordinate”既可译“从属”也可在解释中称“辅助”。八词经句只宣布二分，未逐字提出“局部指令依整体得义”的一般诠释原则。旧卡的复杂规则论是第二、三卷技术的可迁移概括，不能倒装成2.1.6本身。",
    englishDistinction:
      "The sentence's ‘They’ refers back to acts. Sandal's ‘subordinate’ may be explained as auxiliary, but the eight-word sutra only announces a division; it does not itself formulate the general hermeneutic rule that a local instruction derives meaning from a whole. The old card's account of complex rules is a transferable synthesis of techniques in Books II and III, not wording contained in 2.1.6.",
    question:
      "你正在坚持的局部规则，究竟是目标本身，还是服务于更大目标的手段？",
    englishQuestion:
      "Is the local rule you defend an end in itself, or an instrument serving a larger end?",
    sourceLocator: [
      "《弥曼差经》2.1.6；Mohan Lal Sandal 1923年公版英译，The Sacred Books of the Hindus第27卷第1部，印刷页44（扫描/PDF第108页）；完整连续英文句，中文为项目研读译文",
      "Mimamsa Sutra 2.1.6; Mohan Lal Sandal's public-domain translation (1923), The Sacred Books of the Hindus, vol. XXVII, part I, print p. 44 (scan/PDF p. 108); complete continuous English sentence, with a project Chinese study translation",
    ],
  },
] satisfies readonly ContextualIndianThoughtSeed[];
