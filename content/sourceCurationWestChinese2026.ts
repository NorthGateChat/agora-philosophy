import type {
  VerifiedSourceOriginalField,
  VerifiedSourcePassage,
  VerifiedSourceReferenceLink,
  VerifiedSourceUseBasis,
} from "./verifiedSourcePassages";

const checkedOn = "2026-08-30" as const;

type PassageSeed = readonly [
  id: string,
  editionZh: string,
  editionEn: string,
  links?: readonly VerifiedSourceReferenceLink[],
];

const publicDomain: VerifiedSourceUseBasis = {
  kind: "public-domain",
  zh: "原典及所用历史译本已进入公版；仅收录经逐字核对的短连续节选。",
  en: "The source text and the historical translation used are public domain; only a collated short continuous excerpt is stored.",
};

const openTranscription: VerifiedSourceUseBasis = {
  kind: "open-license",
  zh: "原典已进入公版；显示文本据开放转录平台核对，阅读单元保留平台署名与许可说明。",
  en: "The source text is public domain; the display text was collated against an openly licensed transcription whose attribution and licence are retained in the reading unit.",
};

const shortQuotation: VerifiedSourceUseBasis = {
  kind: "quotation-exception",
  zh: "仅为评论、研究与定位保留必要的短节选；完整篇章不随应用再分发，仅提供合法来源路由。",
  en: "Only the short excerpt needed for criticism, study, and location is retained; the complete unit is not redistributed and is available only through a lawful source route.",
};

function group(
  seeds: readonly PassageSeed[],
  originalField: VerifiedSourceOriginalField,
  useBasis: VerifiedSourceUseBasis,
  sharedLinks: readonly VerifiedSourceReferenceLink[],
): VerifiedSourcePassage[] {
  return seeds.map(([id, zh, en, links]) => ({
    id,
    originalField,
    checkedOn,
    referenceEdition: { zh, en },
    useBasis,
    referenceLinks: links ?? sharedLinks,
  }));
}

const sextusLinks = [
  {
    href: "https://atlas.perseus.tufts.edu/library/urn:cts:greekLit:tlg0544.tlg001.1st1K-eng1/",
    label: "Perseus：塞克斯都《皮浪主义纲要》文本与书目路由",
    englishLabel: "Perseus: Sextus, Outlines of Pyrrhonism, text and edition route",
  },
  {
    href: "https://archive.org/details/outlinesofpyrrho00sext",
    label: "Internet Archive：R. G. Bury 1933 年英译馆藏记录",
    englishLabel: "Internet Archive: catalog record for R. G. Bury's 1933 translation",
  },
] as const;

const lucretiusLinks = [
  {
    href: "https://www.gutenberg.org/cache/epub/785/pg785-images.html",
    label: "Project Gutenberg：卢克莱修《物性论》，William Ellery Leonard 1916 年公版英译",
    englishLabel: "Project Gutenberg: Lucretius, On the Nature of Things, William Ellery Leonard's 1916 public-domain translation",
  },
] as const;

const ghazaliSection1Links = [
  {
    href: "https://en.wikisource.org/wiki/The_Confessions_of_Al_Ghazzali/Section_1",
    label: "Wikisource：安萨里《迷途指津》第 1 节，Claudius Field 1909 年历史英译",
    englishLabel: "Wikisource: al-Ghazali, Deliverance from Error, section 1, Claudius Field's 1909 historical translation",
  },
] as const;

const ghazaliSection3Links = [
  {
    href: "https://en.wikisource.org/wiki/The_Confessions_of_Al_Ghazzali/Section_3",
    label: "Wikisource：安萨里《迷途指津》第 3 节，Claudius Field 1909 年历史英译",
    englishLabel: "Wikisource: al-Ghazali, Deliverance from Error, section 3, Claudius Field's 1909 historical translation",
  },
] as const;

const ghazaliSection7Links = [
  {
    href: "https://en.wikisource.org/wiki/The_Confessions_of_Al_Ghazzali/Section_7",
    label: "Wikisource：安萨里《迷途指津》第 7 节，Claudius Field 1909 年历史英译",
    englishLabel: "Wikisource: al-Ghazali, Deliverance from Error, section 7, Claudius Field's 1909 historical translation",
  },
] as const;

const maimonidesPdfLink = {
  href: "https://www.ccel.org/ccel/m/maimonides/guide/cache/guide.pdf",
  label: "CCEL：迈蒙尼德《迷途指津》，M. Friedländer 1904 年公版英译扫描",
  englishLabel: "CCEL: Maimonides, Guide for the Perplexed, scan of M. Friedländer's 1904 public-domain translation",
} as const;

const maimonidesI58Links = [
  {
    href: "https://ccel.org/ccel/maimonides/guide.v.lviii.html",
    label: "CCEL：迈蒙尼德《迷途指津》第一部第 58 章 HTML",
    englishLabel: "CCEL: Maimonides, Guide for the Perplexed, Part I, Chapter 58, HTML",
  },
  maimonidesPdfLink,
] as const;

const maimonidesI59Links = [
  {
    href: "https://ccel.org/ccel/maimonides/guide.v.lix.html",
    label: "CCEL：迈蒙尼德《迷途指津》第一部第 59 章 HTML",
    englishLabel: "CCEL: Maimonides, Guide for the Perplexed, Part I, Chapter 59, HTML",
  },
  maimonidesPdfLink,
] as const;

const maimonidesIII27Links = [
  {
    href: "https://ccel.org/ccel/maimonides/guide.vii.xxviii.html",
    label: "CCEL：迈蒙尼德《迷途指津》第三部第 27 章 HTML",
    englishLabel: "CCEL: Maimonides, Guide for the Perplexed, Part III, Chapter 27, HTML",
  },
  maimonidesPdfLink,
] as const;

const austinLinks = [
  {
    href: "https://archive.org/details/howtodothingswit0000aust",
    label: "Internet Archive：奥斯汀《如何以言行事》第二版馆藏／借阅记录",
    englishLabel: "Internet Archive: catalog and borrow route for Austin, How to Do Things with Words, 2nd ed.",
  },
] as const;

const xiciLinks = [
  {
    href: "https://zh.wikisource.org/wiki/易傳/繫辭上",
    label: "维基文库：《易传·系辞上》开放转录",
    englishLabel: "Wikisource: open transcription of Xici I",
  },
] as const;

const mohistCanonsLinks = [
  {
    href: "https://zh.wikisource.org/wiki/墨子/經上",
    label: "维基文库：《墨子·经上》开放转录",
    englishLabel: "Wikisource: open transcription of Mozi, Canons I",
  },
] as const;

const mohistMinorIllustrationsLinks = [
  {
    href: "https://zh.wikisource.org/wiki/墨子/小取",
    label: "维基文库：《墨子·小取》开放转录",
    englishLabel: "Wikisource: open transcription of Mozi, Minor Illustrations",
  },
] as const;

const zhiyiFascicle1Links = [
  {
    href: "https://zh.wikisource.org/wiki/摩訶止觀/卷001",
    label: "维基文库：《摩诃止观》卷一开放转录",
    englishLabel: "Wikisource: open transcription of The Great Calming and Contemplation, fascicle 1",
  },
] as const;

const zhiyiFascicle6Links = [
  {
    href: "https://zh.wikisource.org/wiki/摩訶止觀/卷006",
    label: "维基文库：《摩诃止观》卷六开放转录",
    englishLabel: "Wikisource: open transcription of The Great Calming and Contemplation, fascicle 6",
  },
] as const;

const luJiuyuanLinks = [
  {
    href: "https://zh.wikisource.org/wiki/陸九淵集",
    label: "维基文库：《陆九渊集》开放转录",
    englishLabel: "Wikisource: open transcription of the Collected Works of Lu Jiuyuan",
  },
] as const;

const heYinZhenLinks = [
  {
    href: "https://zh.wikisource.org/wiki/女子解放问题",
    label: "维基文库：何殷震《女子解放问题》开放转录（保留影印复校提示）",
    englishLabel: "Wikisource: open transcription of He-Yin Zhen, The Question of Women's Liberation (facsimile recollation still recommended)",
  },
  {
    href: "https://zh.wikisource.org/wiki/女子宣布书",
    label: "维基文库：何殷震《女子宣布书》开放转录",
    englishLabel: "Wikisource: open transcription of He-Yin Zhen, Women's Declaration",
  },
] as const;

export const westChineseCurationEvidence: readonly VerifiedSourcePassage[] = [
  ...group(
    [
      ["sextus-opposes-appearances-judgements", "R. G. Bury 1933 年英译《皮浪主义纲要》卷一第 4 章 §8，完整连续定义句；中文为项目研读译文", "R. G. Bury's 1933 translation of Outlines of Pyrrhonism I.4 §8, complete continuous definition; Chinese is the project's study translation"],
      ["sextus-suspense-neither-deny-affirm", "R. G. Bury 1933 年英译《皮浪主义纲要》卷一第 4 章 §10，完整连续定义句；中文为项目研读译文", "R. G. Bury's 1933 translation of Outlines of Pyrrhonism I.4 §10, complete continuous definition; Chinese is the project's study translation"],
      ["sextus-quietude-opinion", "R. G. Bury 1933 年英译《皮浪主义纲要》卷一第 12 章 §25，完整连续句；中文为项目研读译文", "R. G. Bury's 1933 translation of Outlines of Pyrrhonism I.12 §25, complete continuous sentence; Chinese is the project's study translation"],
    ],
    "english",
    shortQuotation,
    sextusLinks,
  ),
  ...group(
    [
      ["lucretius-nothing-from-nothing", "William Ellery Leonard 1916 年公版英译《物性论》卷一第 150 行，完整连续句；中文为项目研读译文", "William Ellery Leonard's 1916 public-domain translation of On the Nature of Things I.150, complete continuous sentence; Chinese is the project's study translation"],
      ["lucretius-bodies-and-void", "Leonard 1916 年公版英译《物性论》卷一第 419—421 行，完整连续句；中文为项目研读译文", "Leonard's 1916 public-domain translation of On the Nature of Things I.419–421, complete continuous sentence; Chinese is the project's study translation"],
      ["lucretius-death-nothing", "Leonard 1916 年公版英译《物性论》卷三第 830—832 行，完整连续句；中文为项目研读译文", "Leonard's 1916 public-domain translation of On the Nature of Things III.830–832, complete continuous sentence; Chinese is the project's study translation"],
    ],
    "english",
    publicDomain,
    lucretiusLinks,
  ),
  ...group(
    [
      ["ghazali-bases-certitude", "Claudius Field 1909 年历史英译《安萨里忏悔录／迷途指津》第 1 节开篇完整连续句；中文为项目研读译文", "Claudius Field's 1909 historical translation of Deliverance from Error, section 1, complete opening sentence; Chinese is the project's study translation", ghazaliSection1Links],
      ["ghazali-blind-belief-consciousness", "Field 1909 年历史英译第 3 节完整连续句；中文为项目研读译文", "Field's 1909 historical translation, section 3, complete continuous sentence; Chinese is the project's study translation", ghazaliSection3Links],
      ["ghazali-experience-not-definition", "Field 1909 年历史英译第 7 节〈苏非主义〉完整连续句；中文为项目研读译文", "Field's 1909 historical translation, section 7, Sufism, complete continuous sentence; Chinese is the project's study translation", ghazaliSection7Links],
    ],
    "english",
    publicDomain,
    ghazaliSection1Links,
  ),
  ...group(
    [
      ["maimonides-no-positive-attribute", "M. Friedländer 1904 年公版英译《迷途指津》第一部第 58 章，印刷页 176，完整连续句；中文为项目研读译文", "M. Friedländer's 1904 public-domain translation of Guide for the Perplexed I.58, print p. 176, complete continuous sentence; Chinese is the project's study translation", maimonidesI58Links],
      ["maimonides-negation-advances-knowledge", "Friedländer 1904 年公版英译第一部第 59 章，印刷页 179，完整连续句；中文为项目研读译文", "Friedländer's 1904 public-domain translation, I.59, print p. 179, complete continuous sentence; Chinese is the project's study translation", maimonidesI59Links],
      ["maimonides-law-soul-body-welfare", "Friedländer 1904 年公版英译第三部第 27 章开篇完整连续句；中文为项目研读译文", "Friedländer's 1904 public-domain translation, III.27, complete opening sentence; Chinese is the project's study translation", maimonidesIII27Links],
    ],
    "english",
    publicDomain,
    maimonidesI58Links,
  ),
  ...group(
    [
      ["austin-utterance-performs-action", "奥斯汀《如何以言行事》第二版（1975）第一讲第 6 页，连续短从句；中文为项目研读译文", "Austin, How to Do Things with Words, 2nd ed. (1975), Lecture I, p. 6, short continuous clause; Chinese is the project's study translation"],
      ["austin-saying-doing-three-senses", "同书第八讲第 91 页，连续短从句；中文为项目研读译文", "Austin, How to Do Things with Words, 2nd ed., Lecture VIII, p. 91, short continuous clause; Chinese is the project's study translation"],
      ["austin-total-speech-situation", "同书第十二讲第 148 页，完整连续句；中文为项目研读译文", "Austin, How to Do Things with Words, 2nd ed., Lecture XII, p. 148, complete continuous sentence; Chinese is the project's study translation"],
    ],
    "english",
    shortQuotation,
    austinLinks,
  ),
  ...group(
    [
      ["chinese-xici-yin-yang-way", "《周易·系辞上》第五章，通行本繁简与标点正常化；英文为项目研读译文", "Zhouyi, Xici I, chapter 5, received text with script and punctuation normalized; English is the project's study translation"],
      ["chinese-xici-way-and-instruments", "《周易·系辞上》第十二章，通行本繁简与标点正常化；英文为项目研读译文", "Zhouyi, Xici I, chapter 12, received text with script and punctuation normalized; English is the project's study translation"],
      ["chinese-xici-images-express-meaning", "《周易·系辞上》第十二章，通行本繁简与标点正常化；英文为项目研读译文", "Zhouyi, Xici I, chapter 12, received text with script and punctuation normalized; English is the project's study translation"],
    ],
    "text",
    openTranscription,
    xiciLinks,
  ),
  ...group(
    [
      ["chinese-mohist-cause-definition", "《墨子·经上》“故”条，通行本繁简与标点正常化，并与《经说上》对应条合读；英文为项目研读译文", "Mozi, Canons I, entry on grounds, received text normalized and read with the matching Explanations I entry; English is the project's study translation", mohistCanonsLinks],
      ["chinese-mohist-kinds-of-names", "《墨子·经上》“名”条，通行本繁简与标点正常化，并与《经说上》对应条合读；英文为项目研读译文", "Mozi, Canons I, entry on names, received text normalized and read with the matching Explanations I entry; English is the project's study translation", mohistCanonsLinks],
      ["chinese-mohist-name-claim-reason", "《墨子·小取》“名—辞—说—故”连续三分句，通行本繁简与标点正常化；英文为项目研读译文", "Mozi, Minor Illustrations, continuous name–statement–explanation–ground sequence, received text normalized; English is the project's study translation", mohistMinorIllustrationsLinks],
    ],
    "text",
    openTranscription,
    mohistCanonsLinks,
  ),
  ...group(
    [
      ["chinese-zhiyi-three-truths-one-mind", "《摩诃止观》卷六“观不思议境”，原文繁简与标点正常化；英文为项目研读译文", "The Great Calming and Contemplation, fascicle 6, contemplation of the inconceivable realm, script and punctuation normalized; English is the project's study translation", zhiyiFascicle6Links],
      ["chinese-zhiyi-one-mind-three-wisdoms", "《摩诃止观》卷一“圆顿止观”，原文繁简与标点正常化；英文为项目研读译文", "The Great Calming and Contemplation, fascicle 1, perfect and sudden calming and contemplation, script and punctuation normalized; English is the project's study translation", zhiyiFascicle1Links],
      ["chinese-zhiyi-practice-matches-words", "《摩诃止观》卷一理即／观行相应段，原文繁简与标点正常化；英文为项目研读译文", "The Great Calming and Contemplation, fascicle 1, passage joining principle and contemplative practice, script and punctuation normalized; English is the project's study translation", zhiyiFascicle1Links],
    ],
    "text",
    openTranscription,
    zhiyiFascicle1Links,
  ),
  ...group(
    [
      ["chinese-lu-jiuyuan-heart-and-pattern", "《陆九渊集》卷一〈与曾宅之〉完整书信中的连续段落；英文为项目研读译文", "Collected Works of Lu Jiuyuan, vol. 1, continuous passage in the complete letter To Zeng Zhaizhi; English is the project's study translation"],
      ["chinese-lu-jiuyuan-way-fills-cosmos", "《陆九渊集》卷一〈与赵监〉完整书信中的连续段落；英文为项目研读译文", "Collected Works of Lu Jiuyuan, vol. 1, continuous passage in the complete letter To Zhao Jian; English is the project's study translation"],
      ["chinese-lu-jiuyuan-root-and-branches", "《陆九渊集》卷一〈与邵叔宜〉完整书信中的连续段落；英文为项目研读译文", "Collected Works of Lu Jiuyuan, vol. 1, continuous passage in the complete letter To Shao Shuyi; English is the project's study translation"],
    ],
    "text",
    openTranscription,
    luJiuyuanLinks,
  ),
  ...group(
    [
      ["chinese-he-yin-zhen-world-shared", "何殷震《女子解放问题》开篇，《天义》第 7 号（1907）；开放转录已逐字核对，后续仍建议对期刊影印复校；英文为项目研读译文", "He-Yin Zhen, The Question of Women's Liberation, opening, Natural Justice no. 7 (1907); open transcription collated, with later facsimile recollation recommended; English is the project's study translation"],
      ["chinese-he-yin-zhen-women-made-slaves", "何殷震《女子解放问题》第二段，《天义》第 7 号（1907）；开放转录已逐字核对，后续仍建议对期刊影印复校；英文为项目研读译文", "He-Yin Zhen, The Question of Women's Liberation, second paragraph, Natural Justice no. 7 (1907); open transcription collated, with later facsimile recollation recommended; English is the project's study translation"],
      ["chinese-he-yin-zhen-revolutions-together", "何殷震《女子宣布书》结尾（1907），开放转录繁简与标点正常化；英文为项目研读译文", "He-Yin Zhen, Women's Declaration, conclusion (1907), open transcription with script and punctuation normalized; English is the project's study translation"],
    ],
    "text",
    openTranscription,
    heYinZhenLinks,
  ),
];
