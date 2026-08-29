import type { Thought, ThoughtPresentationNature } from "./philosophy";
import {
  resolveThoughtPresentationNature,
  thoughtPresentationNatureLabels,
} from "./thoughtPresentation";
import {
  verifiedSourcePassageFor,
  type VerifiedSourceReferenceLink,
} from "./verifiedSourcePassages";
export {
  verifiedSourcePassages,
  verifiedSourcePassagesById,
} from "./verifiedSourcePassages";

export type SourceReviewStatus =
  | "passage-located"
  | "work-located"
  | "under-review";

export type SourceTextNature =
  | "source-excerpt"
  | "editorial-restatement";

export type SourceTranslationNature =
  | "agora-study-translation"
  | "reference-informed-agora-rendering"
  | "agora-bilingual-restatement";

export type SourceVerificationStatus =
  | "editorial-trace-only"
  | "primary-text-checked";

export type BilingualSourceLabel = Readonly<{
  zh: string;
  en: string;
}>;

export type SourceMetadata = {
  sourceLanguage: string;
  englishSourceLanguage: string;
  locator: string;
  englishLocator: string;
  locatorLevel: "passage" | "work";
  /** Records traceability only; it is not a claim of textual or scholarly verification. */
  reviewStatus: SourceReviewStatus;
  /** Public three-state presentation contract used by all reader-facing copy. */
  presentationNature: ThoughtPresentationNature;
  /** Legacy two-state value retained for internal compatibility. */
  textNature: SourceTextNature;
  translationNature: SourceTranslationNature;
  /** Explicit audit status; never inferred from the mere presence of a locator. */
  verificationStatus: SourceVerificationStatus;
  referenceEdition?: string;
  englishReferenceEdition?: string;
  useBasis?: string;
  englishUseBasis?: string;
  provenanceNote: string;
  englishProvenanceNote: string;
  referenceLinks?: readonly {
    href: string;
    label: string;
    englishLabel: string;
  }[];
};

export const sourceReviewStatusLabels: Readonly<
  Record<SourceReviewStatus, BilingualSourceLabel>
> = {
  "passage-located": {
    zh: "篇章已定位",
    en: "Passage located",
  },
  "work-located": {
    zh: "著作已定位，篇章待复核",
    en: "Work located; passage under review",
  },
  "under-review": {
    zh: "来源信息待复核",
    en: "Source details under review",
  },
};

export const sourceTextNatureLabels: Readonly<
  Record<SourceTextNature, BilingualSourceLabel>
> = {
  "source-excerpt": thoughtPresentationNatureLabels["source-excerpt"],
  "editorial-restatement": thoughtPresentationNatureLabels["editorial-synthesis"],
};

export const sourceTranslationNatureLabels: Readonly<
  Record<SourceTranslationNature, BilingualSourceLabel>
> = {
  "agora-study-translation": {
    zh: "未定稿研读译文",
    en: "NOTHING FINAL study translation",
  },
  "reference-informed-agora-rendering": {
    zh: "参照公开译本的未定稿译写",
    en: "NOTHING FINAL rendering informed by public translations",
  },
  "agora-bilingual-restatement": {
    zh: "未定稿双语编辑性转述",
    en: "NOTHING FINAL bilingual editorial restatement",
  },
};

export const sourceVerificationStatusLabels: Readonly<
  Record<SourceVerificationStatus, BilingualSourceLabel>
> = {
  "editorial-trace-only": {
    zh: "编辑定位，未逐字校勘",
    en: "Editorial trace; not line-by-line verified",
  },
  "primary-text-checked": {
    zh: "原文字段已对照原始文本；译文与解读仍为编辑内容",
    en: "Original-language field checked against the primary text; translation and interpretation remain editorial",
  },
};

export const sourceLocationScopeNote: BilingualSourceLabel = {
  zh: "“已定位”只表示项目记录了可回到原作的定位信息，不代表完成逐字校勘或权威版本认证。",
  en: "Located means that NOTHING FINAL records a route back to the source; it does not claim word-for-word collation or authoritative edition certification.",
};

export const primaryTextCheckedScopeNote: BilingualSourceLabel = {
  zh: "“已核查”只覆盖证据登记所指的原文字段与版本；译文、转述和解读仍为未定稿编辑内容。",
  en: "Checked covers only the registered original-language field and edition; translations, restatements, and interpretations remain NOTHING FINAL editorial content.",
};

export function sourceCredibilityLabelsFor(
  metadata: Pick<
    SourceMetadata,
    "reviewStatus" | "textNature" | "translationNature" | "verificationStatus"
  > & Partial<Pick<SourceMetadata, "presentationNature">>,
) {
  const presentationNature = metadata.presentationNature
    ?? (metadata.textNature === "source-excerpt"
      ? "source-excerpt"
      : "editorial-synthesis");
  const presentationLabel = thoughtPresentationNatureLabels[presentationNature];

  return {
    reviewStatus: sourceReviewStatusLabels[metadata.reviewStatus],
    presentationNature: presentationLabel,
    textNature: presentationLabel,
    translationNature: sourceTranslationNatureLabels[metadata.translationNature],
    verificationStatus: sourceVerificationStatusLabels[metadata.verificationStatus],
    scopeNote: metadata.verificationStatus === "primary-text-checked"
      ? primaryTextCheckedScopeNote
      : sourceLocationScopeNote,
  } as const;
}

const passageLocators: Record<string, [string, string]> = {
  socrates: ["《申辩篇》38a", "Apology 38a"],
  plato: ["《理想国》第七卷 518b–d", "Republic VII, 518b–d"],
  aristotle: ["《尼各马可伦理学》第二卷第 1 章", "Nicomachean Ethics II.1"],
  epicurus: ["《主要教义》第 15 条", "Principal Doctrines 15"],
  epictetus: ["《手册》第 5 节", "Enchiridion §5"],
  augustine: ["《忏悔录》第十一卷第 14 章", "Confessions XI.14"],
  descartes: ["《第一哲学沉思集》第二沉思", "Meditations II"],
  spinoza: ["《伦理学》第三部，命题 9 附释", "Ethics III, Proposition 9, Scholium"],
  hume: ["《人类理解研究》第四节", "Enquiry Concerning Human Understanding, §4"],
  rousseau: ["《社会契约论》第一卷第 1 章", "The Social Contract I.1"],
  kant: ["《道德形而上学奠基》第二章，4:421", "Groundwork II, 4:421"],
  marx: ["《路易·波拿巴的雾月十八日》第一章", "The Eighteenth Brumaire, Chapter I"],
  nietzsche: ["《快乐的科学》第 335 节", "The Gay Science §335"],
  heidegger: ["《存在与时间》第 53 节", "Being and Time §53"],
  wittgenstein: ["《哲学研究》第 43 节", "Philosophical Investigations §43"],
  arendt: ["《人的境况》第五章", "The Human Condition, Chapter V"],
  sartre: ["《存在主义是一种人道主义》", "Existentialism Is a Humanism"],
  beauvoir: ["《第二性》第二卷，导言", "The Second Sex, Volume II, Introduction"],
  camus: ["《西西弗神话》开篇", "The Myth of Sisyphus, opening chapter"],
  foucault: ["《规训与惩罚》第三部分", "Discipline and Punish, Part III"],
  rawls: ["《正义论》第 3–4 节", "A Theory of Justice §§3–4"],
  "mao-investigation": ["《反对本本主义》第一节", "Oppose Book Worship, §1"],
  "mao-practice": ["《实践论》", "On Practice"],
  "mao-contradiction": ["《矛盾论》第四节", "On Contradiction, §4"],
  "mao-service": ["《为人民服务》", "Serve the People"],
};

const authorLanguages: Record<string, [string, string]> = {
  heraclitus: ["古希腊语", "Ancient Greek"],
  parmenides: ["古希腊语", "Ancient Greek"],
  socrates: ["古希腊语（经柏拉图文本传世）", "Ancient Greek (via Plato)"],
  plato: ["古希腊语", "Ancient Greek"],
  aristotle: ["古希腊语", "Ancient Greek"],
  epicurus: ["古希腊语", "Ancient Greek"],
  epictetus: ["古希腊语", "Ancient Greek"],
  seneca: ["拉丁语", "Latin"],
  plotinus: ["古希腊语", "Ancient Greek"],
  augustine: ["拉丁语", "Latin"],
  avicenna: ["阿拉伯语 / 波斯语", "Arabic / Persian"],
  averroes: ["阿拉伯语", "Arabic"],
  thomas_aquinas: ["拉丁语", "Latin"],
  machiavelli: ["意大利语", "Italian"],
  francis_bacon: ["拉丁语 / 英语", "Latin / English"],
  hobbes: ["英语 / 拉丁语", "English / Latin"],
  descartes: ["拉丁语 / 法语", "Latin / French"],
  spinoza: ["拉丁语", "Latin"],
  leibniz: ["拉丁语 / 法语 / 德语", "Latin / French / German"],
  berkeley: ["英语", "English"],
  locke: ["英语", "English"],
  hume: ["英语", "English"],
  rousseau: ["法语", "French"],
  kant: ["德语", "German"],
  hegel: ["德语", "German"],
  wollstonecraft: ["英语", "English"],
  bentham: ["英语", "English"],
  mill: ["英语", "English"],
  schopenhauer: ["德语", "German"],
  kierkegaard: ["丹麦语", "Danish"],
  marx: ["德语", "German"],
  nietzsche: ["德语", "German"],
  frege: ["德语", "German"],
  russell: ["英语", "English"],
  peirce: ["英语", "English"],
  james: ["英语", "English"],
  dewey: ["英语", "English"],
  husserl: ["德语", "German"],
  heidegger: ["德语", "German"],
  "merleau-ponty": ["法语", "French"],
  wittgenstein: ["德语", "German"],
  anscombe: ["英语", "English"],
  foot: ["英语", "English"],
  carnap: ["德语 / 英语", "German / English"],
  quine: ["英语", "English"],
  popper: ["德语 / 英语", "German / English"],
  kuhn: ["英语", "English"],
  habermas: ["德语", "German"],
  "du-bois": ["英语", "English"],
  fanon: ["法语", "French"],
  levinas: ["法语", "French"],
  gadamer: ["德语", "German"],
  arendt: ["英语", "English"],
  sartre: ["法语", "French"],
  beauvoir: ["法语", "French"],
  camus: ["法语", "French"],
  foucault: ["法语", "French"],
  rawls: ["英语", "English"],
  derrida: ["法语", "French"],
  nussbaum: ["英语", "English"],
};

const scienceAuthorLanguages: Record<string, [string, string]> = {
  "francis-bacon": ["拉丁语 / 英语", "Latin / English"],
  "galileo-galilei": ["意大利语 / 拉丁语", "Italian / Latin"],
  "johannes-kepler": ["拉丁语", "Latin"],
  "isaac-newton": ["拉丁语 / 英语", "Latin / English"],
  "michael-faraday": ["英语", "English"],
  "james-clerk-maxwell": ["英语", "English"],
  darwin: ["英语", "English"],
  mendel: ["德语", "German"],
  pasteur: ["法语", "French"],
  claude_bernard: ["法语", "French"],
  marie_curie: ["法语", "French"],
  humboldt: ["德语 / 法语", "German / French"],
  rosalind_franklin: ["英语", "English"],
  rachel_carson: ["英语", "English"],
  einstein: ["德语", "German"],
  bohr: ["丹麦语 / 英语 / 德语", "Danish / English / German"],
  heisenberg: ["德语", "German"],
  schrodinger: ["德语", "German"],
  turing: ["英语", "English"],
  shannon: ["英语", "English"],
  wiener: ["英语", "English"],
  popper: ["德语 / 英语", "German / English"],
  kuhn: ["英语", "English"],
  feynman: ["英语", "English"],
};

const indianAuthorLanguages: Record<string, [string, string]> = {
  "vedic-upanishadic": ["吠陀梵语 / 古典梵语", "Vedic / Classical Sanskrit"],
  "bhagavad-gita": ["梵语", "Sanskrit"],
  "early-buddhism": ["巴利语 / 早期佛教语言传统", "Pali / early Buddhist textual languages"],
  mahavira: ["阿尔达摩揭陀俗语（传承文本）", "Ardhamagadhi Prakrit (transmitted texts)"],
  ishvarakrishna: ["梵语", "Sanskrit"],
  patanjali: ["梵语", "Sanskrit"],
  "aksapada-gautama": ["梵语", "Sanskrit"],
  kanada: ["梵语", "Sanskrit"],
  jaimini: ["梵语", "Sanskrit"],
  nagarjuna: ["梵语", "Sanskrit"],
  aryadeva: ["梵语", "Sanskrit"],
  candrakirti: ["梵语", "Sanskrit"],
  asanga: ["梵语", "Sanskrit"],
  vasubandhu: ["梵语", "Sanskrit"],
  dignaga: ["梵语", "Sanskrit"],
  dharmakirti: ["梵语", "Sanskrit"],
  shankara: ["梵语", "Sanskrit"],
  ramanuja: ["梵语", "Sanskrit"],
  madhva: ["梵语", "Sanskrit"],
  kabir: ["北印度俗语 / 圣徒诗歌语言", "North Indian vernacular / Sant poetic idiom"],
  tagore: ["孟加拉语 / 英语", "Bengali / English"],
  gandhi: ["古吉拉特语 / 英语", "Gujarati / English"],
  ambedkar: ["英语 / 马拉地语", "English / Marathi"],
};

const economicsAuthorLanguages: Record<string, [string, string]> = {
  "adam-smith": ["英语", "English"],
  "david-ricardo": ["英语", "English"],
  "thomas-malthus": ["英语", "English"],
  "john-stuart-mill-economics": ["英语", "English"],
  "karl-marx-economics": ["德语", "German"],
  menger: ["德语 / 英语", "German / English"],
  "alfred-marshall": ["英语", "English"],
  "thorstein-veblen": ["英语", "English"],
  "irving-fisher": ["英语", "English"],
  "john-maynard-keynes": ["英语", "English"],
  "friedrich-hayek": ["英语 / 德语", "English / German"],
  "joseph-schumpeter": ["德语 / 英语", "German / English"],
  "karl-polanyi": ["英语 / 德语", "English / German"],
  coase: ["英语", "English"],
  simon: ["英语", "English"],
  ostrom: ["英语", "English"],
  sen: ["英语", "English"],
  north: ["英语", "English"],
  friedman: ["英语", "English"],
  solow: ["英语", "English"],
  romer: ["英语", "English"],
  kahnemanTversky: ["英语", "English"],
  akerlof: ["英语", "English"],
  stiglitz: ["英语", "English"],
  minsky: ["英语", "English"],
  piketty: ["法语 / 英语", "French / English"],
  hirschman: ["英语", "English"],
  acemogluRobinson: ["英语", "English"],
  thaler: ["英语", "English"],
  "benjamin-graham": ["英语", "English"],
  "warren-buffett": ["英语", "English"],
  "charlie-munger": ["英语", "English"],
  "philip-fisher": ["英语", "English"],
  "john-bogle": ["英语", "English"],
  "howard-marks": ["英语", "English"],
};

const psychologyAuthorLanguages: Record<string, [string, string]> = {
  "wilhelm-wundt": ["德语", "German"],
  "william-james": ["英语", "English"],
  "hermann-ebbinghaus": ["德语", "German"],
  "ivan-pavlov": ["俄语", "Russian"],
  "edward-thorndike": ["英语", "English"],
  "john-watson": ["英语", "English"],
  "bf-skinner": ["英语", "English"],
  "wolfgang-kohler": ["德语 / 英语", "German / English"],
  neisser: ["英语", "English"],
  miller: ["英语", "English"],
  baddeleyHitch: ["英语", "English"],
  tulving: ["英语", "English"],
  loftus: ["英语", "English"],
  kahnemanTversky: ["英语", "English"],
  lazarus: ["英语", "English"],
  deciRyan: ["英语", "English"],
  lewin: ["德语 / 英语", "German / English"],
  asch: ["英语", "English"],
  festinger: ["英语", "English"],
  "tajfel-turner": ["英语", "English"],
  "bowlby-ainsworth": ["英语", "English"],
  piaget: ["法语", "French"],
  vygotsky: ["俄语", "Russian"],
  bandura: ["英语", "English"],
};

type ReferenceLink = NonNullable<SourceMetadata["referenceLinks"]>[number];

const economicsReferenceLinks: Record<string, readonly ReferenceLink[]> = {
  "adam-smith": [{
    href: "https://www.econlib.org/library/Smith/smWN.html",
    label: "Econlib《国富论》原文",
    englishLabel: "Econlib: The Wealth of Nations",
  }],
  "david-ricardo": [{
    href: "https://www.econlib.org/library/Ricardo/ricP.html",
    label: "Econlib《政治经济学及赋税原理》原文",
    englishLabel: "Econlib: On the Principles of Political Economy and Taxation",
  }],
  "thomas-malthus": [{
    href: "https://www.econlib.org/library/Malthus/malPlong.html",
    label: "Econlib《人口原理》原文",
    englishLabel: "Econlib: An Essay on the Principle of Population",
  }],
  "john-stuart-mill-economics": [{
    href: "https://www.econlib.org/library/Mill/mlP.html",
    label: "Econlib《政治经济学原理》原文",
    englishLabel: "Econlib: Principles of Political Economy",
  }],
  "karl-marx-economics": [{
    href: "https://www.marxists.org/archive/marx/works/1867-c1/",
    label: "《资本论》第一卷原文索引",
    englishLabel: "Capital, Volume I, text index",
  }],
  "alfred-marshall": [{
    href: "https://www.econlib.org/library/Marshall/marP.html",
    label: "Econlib《经济学原理》原文",
    englishLabel: "Econlib: Principles of Economics",
  }],
  menger: [{
    href: "https://mises.org/library/book/principles-economics",
    label: "Mises Institute：《国民经济学原理》版本与英译信息",
    englishLabel: "Mises Institute: Principles of Economics edition and translation details",
  }],
  "thorstein-veblen": [{
    href: "https://www.gutenberg.org/ebooks/833",
    label: "古登堡计划《有闲阶级论》原文",
    englishLabel: "Project Gutenberg: The Theory of the Leisure Class",
  }],
  "irving-fisher": [{
    href: "https://fraser.stlouisfed.org/title/debt-deflation-theory-great-depressions-3596/fulltext",
    label: "圣路易斯联储 FRASER：债务—通缩论文",
    englishLabel: "Federal Reserve FRASER: The Debt-Deflation Theory of Great Depressions",
  }],
  "john-maynard-keynes": [{
    href: "https://www.marxists.org/reference/subject/economics/keynes/general-theory/",
    label: "《就业、利息和货币通论》原文索引",
    englishLabel: "The General Theory of Employment, Interest and Money, text index",
  }],
  "friedrich-hayek": [{
    href: "https://www.nobelprize.org/prizes/economic-sciences/1974/hayek/lecture/",
    label: "哈耶克诺贝尔奖演讲与档案",
    englishLabel: "Friedrich Hayek's Nobel Prize lecture and archive",
  }],
  "joseph-schumpeter": [{
    href: "https://hollisarchives.lib.harvard.edu/catalog/hua11007",
    label: "哈佛大学熊彼特文稿档案",
    englishLabel: "Joseph A. Schumpeter papers, Harvard University Archives",
  }],
  "karl-polanyi": [{
    href: "https://www.concordia.ca/research/polanyi/archive.html",
    label: "康考迪亚大学卡尔·波兰尼档案",
    englishLabel: "Karl Polanyi Archive, Concordia University",
  }],
  coase: [{
    href: "https://www.nobelprize.org/prizes/economic-sciences/1991/coase/lecture/",
    label: "科斯诺贝尔奖演讲与档案",
    englishLabel: "Ronald Coase's Nobel Prize lecture and archive",
  }],
  simon: [{
    href: "https://www.nobelprize.org/prizes/economic-sciences/1978/simon/lecture/",
    label: "西蒙诺贝尔奖演讲与档案",
    englishLabel: "Herbert Simon's Nobel Prize lecture and archive",
  }],
  ostrom: [{
    href: "https://www.nobelprize.org/prizes/economic-sciences/2009/ostrom/lecture/",
    label: "奥斯特罗姆诺贝尔奖演讲与档案",
    englishLabel: "Elinor Ostrom's Nobel Prize lecture and archive",
  }],
  sen: [{
    href: "https://www.nobelprize.org/prizes/economic-sciences/1998/sen/lecture/",
    label: "阿马蒂亚·森诺贝尔奖演讲与档案",
    englishLabel: "Amartya Sen's Nobel Prize lecture and archive",
  }],
  north: [{
    href: "https://www.nobelprize.org/prizes/economic-sciences/1993/north/lecture/",
    label: "诺斯诺贝尔奖演讲与档案",
    englishLabel: "Douglass North's Nobel Prize lecture and archive",
  }],
  friedman: [{
    href: "https://www.nobelprize.org/prizes/economic-sciences/1976/friedman/lecture/",
    label: "弗里德曼诺贝尔奖演讲与档案",
    englishLabel: "Milton Friedman's Nobel Prize lecture and archive",
  }],
  solow: [{
    href: "https://www.nobelprize.org/prizes/economic-sciences/1987/solow/lecture/",
    label: "索洛诺贝尔奖演讲与档案",
    englishLabel: "Robert Solow's Nobel Prize lecture and archive",
  }],
  romer: [{
    href: "https://www.nobelprize.org/prizes/economic-sciences/2018/romer/lecture/",
    label: "罗默诺贝尔奖演讲与档案",
    englishLabel: "Paul Romer's Nobel Prize lecture and archive",
  }],
  kahnemanTversky: [{
    href: "https://www.nobelprize.org/prizes/economic-sciences/2002/kahneman/lecture/",
    label: "卡尼曼诺贝尔奖演讲与档案",
    englishLabel: "Daniel Kahneman's Nobel Prize lecture and archive",
  }],
  akerlof: [{
    href: "https://www.nobelprize.org/prizes/economic-sciences/2001/akerlof/lecture/",
    label: "阿克洛夫诺贝尔奖演讲与档案",
    englishLabel: "George Akerlof's Nobel Prize lecture and archive",
  }],
  stiglitz: [{
    href: "https://www.nobelprize.org/prizes/economic-sciences/2001/stiglitz/lecture/",
    label: "斯蒂格利茨诺贝尔奖演讲与档案",
    englishLabel: "Joseph Stiglitz's Nobel Prize lecture and archive",
  }],
  minsky: [{
    href: "https://www.levyinstitute.org/publications/the-financial-instability-hypothesis",
    label: "利维经济研究所：金融不稳定假说",
    englishLabel: "Levy Economics Institute: The Financial Instability Hypothesis",
  }],
  piketty: [{
    href: "https://piketty.pse.ens.fr/en/publications-en",
    label: "托马斯·皮凯蒂学术主页与出版物",
    englishLabel: "Thomas Piketty: publications and research materials",
  }],
  hirschman: [{
    href: "https://press.princeton.edu/books/paperback/9780674276604/exit-voice-and-loyalty",
    label: "普林斯顿大学出版社《退出、呼吁与忠诚》书目页",
    englishLabel: "Princeton University Press: Exit, Voice, and Loyalty",
  }],
  acemogluRobinson: [{
    href: "https://www.nber.org/papers/w10481",
    label: "NBER：制度作为长期增长的根本原因",
    englishLabel: "NBER: Institutions as the Fundamental Cause of Long-Run Growth",
  }],
  thaler: [{
    href: "https://www.nobelprize.org/prizes/economic-sciences/2017/thaler/lecture/",
    label: "塞勒诺贝尔奖演讲与档案",
    englishLabel: "Richard Thaler's Nobel Prize lecture and archive",
  }],
  "benjamin-graham": [{
    href: "https://business.columbia.edu/heilbrunn/resources/archives",
    label: "哥伦比亚商学院本杰明·格雷厄姆档案",
    englishLabel: "Benjamin Graham Papers, Columbia Business School",
  }],
  "warren-buffett": [{
    href: "https://www.berkshirehathaway.com/letters/letters.html",
    label: "伯克希尔·哈撒韦股东信档案",
    englishLabel: "Berkshire Hathaway shareholder letters",
  }],
  "charlie-munger": [{
    href: "https://www.stripe.press/poor-charlies-almanack",
    label: "Stripe Press《穷查理宝典》书目页",
    englishLabel: "Stripe Press: Poor Charlie's Almanack",
  }],
  "philip-fisher": [{
    href: "https://books.google.com/books/about/Common_Stocks_and_Uncommon_Profits.html?id=AKwWNQjLQQ4C",
    label: "Google Books《怎样选择成长股》书目页",
    englishLabel: "Google Books: Common Stocks and Uncommon Profits",
  }],
  "john-bogle": [{
    href: "https://boglecenter.net/bogle-archive/",
    label: "约翰·博格尔文稿档案",
    englishLabel: "The John C. Bogle Archive",
  }],
  "howard-marks": [{
    href: "https://www.oaktreecapital.com/insights",
    label: "橡树资本霍华德·马克斯备忘录",
    englishLabel: "Oaktree Capital: Howard Marks memos",
  }],
};

const economicsThoughtReferenceLinks: Partial<Record<string, readonly ReferenceLink[]>> = {
  "economics-principles-menger-origin-money": [],
  "economics-principles-menger-subjective-value": economicsReferenceLinks.menger,
  "economics-principles-menger-higher-order-goods": economicsReferenceLinks.menger,
};

const gretilReference: ReferenceLink = {
  href: "https://gretil.sub.uni-goettingen.de/gretil.html",
  label: "哥廷根大学 GRETIL 印度语言原典库",
  englishLabel: "GRETIL Indian-language text repository, University of Göttingen",
};

const saritReference: ReferenceLink = {
  href: "https://sarit.github.io/",
  label: "SARIT 梵语原典研究库",
  englishLabel: "SARIT Sanskrit research corpus",
};

const indianPrimaryTextLinks: Record<string, ReferenceLink> = {
  "vedic-upanishadic": gretilReference,
  "bhagavad-gita": gretilReference,
  "early-buddhism": {
    href: "https://suttacentral.net/",
    label: "SuttaCentral 早期佛教原典与译文",
    englishLabel: "SuttaCentral early Buddhist texts and translations",
  },
  mahavira: gretilReference,
  ishvarakrishna: saritReference,
  patanjali: saritReference,
  "aksapada-gautama": saritReference,
  kanada: saritReference,
  jaimini: saritReference,
  nagarjuna: saritReference,
  aryadeva: saritReference,
  candrakirti: saritReference,
  asanga: saritReference,
  vasubandhu: saritReference,
  dignaga: saritReference,
  dharmakirti: saritReference,
  shankara: saritReference,
  ramanuja: saritReference,
  madhva: saritReference,
  kabir: gretilReference,
  tagore: {
    href: "https://bichitra.jdvu.ac.in/index.php",
    label: "贾达夫普尔大学 Bichitra 泰戈尔文库",
    englishLabel: "Bichitra: Online Tagore Variorum, Jadavpur University",
  },
  gandhi: {
    href: "https://www.gandhiheritageportal.org/",
    label: "甘地遗产门户文献库",
    englishLabel: "Gandhi Heritage Portal archive",
  },
  ambedkar: {
    href: "https://www.mea.gov.in/books-writings-of-ambedkar.htm",
    label: "印度外交部安贝德卡著作集",
    englishLabel: "Dr. Ambedkar's writings, Ministry of External Affairs, India",
  },
};

const indianThoughtPrimaryTextLinks: Partial<Record<string, ReferenceLink>> = {
  "indian-vedic-creation-question": {
    href: "https://en.wikisource.org/wiki/The_Hymns_of_the_Rigveda/Book_10/Hymn_129",
    label: "Wikisource：《梨俱吠陀》第10卷第129首，Griffith 1897年公版英译",
    englishLabel: "Wikisource: Rig Veda, Book 10, Hymn 129, Griffith public-domain translation (1897)",
  },
  "indian-upanishad-neti-neti": {
    href: "https://archive.org/details/thirteenprincipa00hume",
    label: "Internet Archive：Hume《十三部主要奥义书》1921年扫描",
    englishLabel: "Internet Archive: Hume, The Thirteen Principal Upanishads (1921), scan",
  },
  "indian-gita-action-fruit": {
    href: "https://archive.org/details/bhagavadgtwi00tela",
    label: "Internet Archive：Telang《薄伽梵歌》1882年公版英译扫描",
    englishLabel: "Internet Archive: scan of Telang's public-domain Bhagavadgita translation (1882)",
  },
  "indian-yoga-four-attitudes": {
    href: "https://archive.org/details/wg1101",
    label: "Internet Archive：Vivekananda《Râja Yoga》1899年扫描",
    englishLabel: "Internet Archive: Vivekananda, Râja Yoga (1899), scan",
  },
  "indian-yoga-stilling-fluctuations": {
    href: "https://archive.org/details/yogasystemofpata00pata",
    label: "Internet Archive：Woods《帕坦伽利瑜伽体系》1914年扫描",
    englishLabel: "Internet Archive: Woods, The Yoga-System of Patañjali (1914), scan",
  },
  "indian-gandhi-means-shape-ends": {
    href: "https://www.gutenberg.org/ebooks/40461",
    label: "古登堡计划：甘地《印度自治》公版英文文本",
    englishLabel: "Project Gutenberg: public-domain English text of Gandhi's Hind Swaraj",
  },
};

const chinesePrimaryTextLinks: Record<string, ReferenceLink> = {
  confucius: {
    href: "https://ctext.org/analects",
    label: "《论语》原典索引",
    englishLabel: "Analects primary-text index",
  },
  mencius: {
    href: "https://ctext.org/mengzi",
    label: "《孟子》原典索引",
    englishLabel: "Mengzi primary-text index",
  },
  laozi: {
    href: "https://ctext.org/dao-de-jing",
    label: "《道德经》原典索引",
    englishLabel: "Daodejing primary-text index",
  },
  zhuangzi: {
    href: "https://ctext.org/zhuangzi",
    label: "《庄子》原典索引",
    englishLabel: "Zhuangzi primary-text index",
  },
  mozi: {
    href: "https://ctext.org/mozi",
    label: "《墨子》原典索引",
    englishLabel: "Mozi primary-text index",
  },
  xunzi: {
    href: "https://ctext.org/xunzi",
    label: "《荀子》原典索引",
    englishLabel: "Xunzi primary-text index",
  },
  han_feizi: {
    href: "https://ctext.org/hanfeizi",
    label: "《韩非子》原典索引",
    englishLabel: "Han Feizi primary-text index",
  },
  sunzi: {
    href: "https://ctext.org/art-of-war",
    label: "《孙子兵法》原典索引",
    englishLabel: "The Art of War primary-text index",
  },
  gongsun_long: {
    href: "https://ctext.org/gongsunlongzi",
    label: "《公孙龙子》原典索引",
    englishLabel: "Gongsun Longzi primary-text index",
  },
  wang_bi: {
    href: "https://ctext.org/dao-de-jing",
    label: "《道德经》原典索引",
    englishLabel: "Daodejing primary-text index",
  },
  guo_xiang: {
    href: "https://ctext.org/zhuangzi",
    label: "《庄子》原典索引",
    englishLabel: "Zhuangzi primary-text index",
  },
  zhu_xi: {
    href: "https://ctext.org/si-shu-zhang-ju-ji-zhu/zhs",
    label: "《四书章句集注》原典索引",
    englishLabel: "Collected Commentaries on the Four Books index",
  },
  wang_yangming: {
    href: "https://ctext.org/searchbooks.pl?author=%E7%8E%8B%E9%99%BD%E6%98%8E&if=en&remap=gb",
    label: "王阳明著作索引",
    englishLabel: "Works attributed to Wang Yangming",
  },
  dong_zhongshu: {
    href: "https://ctext.org/chun-qiu-fan-lu",
    label: "《春秋繁露》原典索引",
    englishLabel: "Luxuriant Dew of the Spring and Autumn Annals primary-text index",
  },
  wang_chong: {
    href: "https://ctext.org/lunheng",
    label: "《论衡》原典索引",
    englishLabel: "Lunheng primary-text index",
  },
  sengzhao: {
    href: "https://zh.wikisource.org/wiki/%E8%82%87%E8%AB%96",
    label: "《肇论》原典",
    englishLabel: "Zhaolun primary text",
  },
  fazang: {
    href: "https://tripitaka.cbeta.org/T45n1881_001",
    label: "CBETA《华严金师子章》及宋注（T1881）",
    englishLabel: "CBETA Essay on the Golden Lion with Song commentary (T1881)",
  },
  huineng: {
    href: "https://zh.wikisource.org/wiki/%E5%85%AD%E7%A5%96%E5%A3%87%E7%B6%93",
    label: "《六祖坛经》后世通行本",
    englishLabel: "Received edition of the Platform Sutra",
  },
  zhou_dunyi: {
    href: "https://ctext.org/wiki.pl?if=gb&remap=gb&res=602558",
    label: "《太极图说》原典",
    englishLabel: "Explanation of the Diagram of the Supreme Polarity primary text",
  },
  zhang_zai: {
    href: "https://zh.wikisource.org/wiki/%E5%BC%B5%E5%AD%90%E6%AD%A3%E8%92%99",
    label: "《张子正蒙》原典",
    englishLabel: "Zhangzi Zhengmeng primary text",
  },
  cheng_hao: {
    href: "https://ctext.org/wiki.pl?if=gb&remap=gb&res=185164",
    label: "《二程遗书》原典索引",
    englishLabel: "Recorded Sayings of the Cheng Brothers primary-text index",
  },
  cheng_yi: {
    href: "https://ctext.org/wiki.pl?if=gb&remap=gb&res=185164",
    label: "《二程遗书》原典索引",
    englishLabel: "Recorded Sayings of the Cheng Brothers primary-text index",
  },
  li_zhi: {
    href: "https://zh.wikisource.org/wiki/%E7%84%9A%E6%9B%B8",
    label: "《焚书》原典",
    englishLabel: "A Book to Burn primary text",
  },
  wang_fuzhi: {
    href: "https://ctext.org/searchbooks.pl?author=%E7%8E%8B%E5%A4%AB%E4%B9%8B&if=gb&remap=gb",
    label: "王夫之著作索引",
    englishLabel: "Works attributed to Wang Fuzhi",
  },
  huang_zongxi: {
    href: "https://zh.wikisource.org/wiki/%E6%98%8E%E5%A4%B7%E5%BE%85%E8%A8%AA%E9%8C%84",
    label: "《明夷待访录》原典",
    englishLabel: "Waiting for the Dawn primary text",
  },
  gu_yanwu: {
    href: "https://zh.wikisource.org/wiki/%E6%97%A5%E7%9F%A5%E9%8C%84",
    label: "《日知录》原典",
    englishLabel: "Record of Daily Knowledge primary text",
  },
  dai_zhen: {
    href: "https://zh.wikisource.org/wiki/%E5%AD%9F%E5%AD%90%E5%AD%97%E7%BE%A9%E7%96%8F%E8%AD%89",
    label: "《孟子字义疏证》原典",
    englishLabel: "Evidential Commentary on the Meanings of Terms in the Mengzi primary text",
  },
};

const sciencePrimaryTextLinks: Record<string, ReferenceLink> = {
  "francis-bacon": {
    href: "https://www.gutenberg.org/files/45988/45988-h/45988-h.htm",
    label: "《新工具》原文",
    englishLabel: "Novum Organum primary text",
  },
  "galileo-galilei": {
    href: "https://sidereusnuncius.org/",
    label: "《星际信使》数字原典",
    englishLabel: "Sidereus Nuncius digital edition",
  },
  "johannes-kepler": {
    href: "https://www.e-rara.ch/doi/10.3931/e-rara-558",
    label: "《新天文学》原版扫描",
    englishLabel: "Astronomia Nova original scan",
  },
  "isaac-newton": {
    href: "https://en.wikisource.org/wiki/Page:Newton%27s_Principia_(1846).djvu/390",
    label: "《原理》研究规则原文页",
    englishLabel: "Principia Rules of Reasoning source page",
  },
  "michael-faraday": {
    href: "https://www.gutenberg.org/files/14986/14986-h/14986-h.htm",
    label: "《电学实验研究》第一卷",
    englishLabel: "Experimental Researches in Electricity, Vol. I",
  },
  "james-clerk-maxwell": {
    href: "https://en.wikisource.org/wiki/On_Faraday%27s_Lines_of_Force",
    label: "《论法拉第力线》原文",
    englishLabel: "On Faraday's Lines of Force primary text",
  },
  darwin: {
    href: "https://darwin-online.org.uk/converted/pdf/1860_Origin_F379.pdf",
    label: "《物种起源》第二版扫描",
    englishLabel: "On the Origin of Species, second-edition scan",
  },
  mendel: {
    href: "https://www.gutenberg.org/files/40854/40854-h/40854-h.htm",
    label: "《植物杂交试验》原文",
    englishLabel: "Experiments in Plant Hybridisation primary text",
  },
  pasteur: {
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2229983/",
    label: "巴斯德发酵研究原文与译文",
    englishLabel: "Pasteur fermentation paper and translation",
  },
  claude_bernard: {
    href: "https://classiques.uqam.ca/classiques/bernard_claude/intro_etude_medecine_exp/intro_etude_tdm.html",
    label: "《实验医学研究导论》数字原典",
    englishLabel: "Introduction to Experimental Medicine digital text",
  },
  marie_curie: {
    href: "https://www.nobelprize.org/prizes/chemistry/1911/marie-curie/lecture/",
    label: "居里夫人诺贝尔演讲",
    englishLabel: "Marie Curie's Nobel lecture",
  },
  humboldt: {
    href: "https://www.gutenberg.org/cache/epub/14565/pg14565.html",
    label: "《宇宙》英译原典",
    englishLabel: "Cosmos historical English edition",
  },
  rosalind_franklin: {
    href: "https://www.nature.com/articles/171740a0",
    label: "富兰克林与戈斯林 DNA 论文",
    englishLabel: "Franklin and Gosling DNA paper",
  },
  rachel_carson: {
    href: "https://ethz.ch/content/dam/ethz/special-interest/usys/ites/ecosystem-management-dam/documents/EducationDOC/Readings_DOC/Carsontext.pdf",
    label: "《寂静的春天》研究用文本",
    englishLabel: "Silent Spring study text",
  },
  einstein: {
    href: "https://einsteinpapers.press.princeton.edu/",
    label: "爱因斯坦文集数字版",
    englishLabel: "Digital Einstein Papers",
  },
  bohr: {
    href: "https://www.nobelprize.org/prizes/physics/1922/bohr/lecture/",
    label: "玻尔诺贝尔演讲",
    englishLabel: "Niels Bohr's Nobel lecture",
  },
  heisenberg: {
    href: "https://www.nobelprize.org/prizes/physics/1932/heisenberg/lecture/",
    label: "海森堡诺贝尔演讲",
    englishLabel: "Werner Heisenberg's Nobel lecture",
  },
  schrodinger: {
    href: "https://www.nobelprize.org/prizes/physics/1933/schrodinger/lecture/",
    label: "薛定谔诺贝尔演讲",
    englishLabel: "Erwin Schrödinger's Nobel lecture",
  },
  turing: {
    href: "https://academic.oup.com/plms/article/s2-42/1/230/1491926",
    label: "《论可计算数》论文页",
    englishLabel: "On Computable Numbers paper page",
  },
  shannon: {
    href: "https://doi.org/10.1002/j.1538-7305.1948.tb01338.x",
    label: "《通信的数学理论》期刊论文页",
    englishLabel: "A Mathematical Theory of Communication journal page",
  },
  wiener: {
    href: "https://www.science.org/doi/10.1126/science.131.3410.1355",
    label: "《自动化的一些道德与技术后果》论文",
    englishLabel: "Some Moral and Technical Consequences of Automation",
  },
  popper: {
    href: "https://www.routledge.com/The-Logic-of-Scientific-Discovery/Popper/p/book/9780415278447",
    label: "《科学发现的逻辑》书目页",
    englishLabel: "The Logic of Scientific Discovery catalogue page",
  },
  kuhn: {
    href: "https://press.uchicago.edu/ucp/books/book/chicago/S/bo13179781.html",
    label: "《科学革命的结构》书目页",
    englishLabel: "The Structure of Scientific Revolutions catalogue page",
  },
  feynman: {
    href: "https://calteches.library.caltech.edu/51/2/CargoCult.htm",
    label: "加州理工档案：《货物崇拜式科学》",
    englishLabel: "Caltech archive: Cargo Cult Science",
  },
};

const scienceThoughtPrimaryTextLinks: Partial<Record<string, ReferenceLink>> = {
  "science-bohr-whole-arrangement": {
    href: "https://www.bard.edu/library/pdfs/archives/2024/12/Bohr-AtomicPhysics.pdf",
    label: "巴德学院图书馆：含玻尔 1949 年《与爱因斯坦的讨论》的文集扫描（仅供回查）",
    englishLabel: "Bard College Library: collected-volume scan containing Bohr's 1949 Discussions with Einstein (for source checking only)",
  },
  "science-heisenberg-observable-transitions": {
    href: "https://history.aip.org/exhibits/heisenberg/breakthrough.html",
    label: "美国物理学会史中心：海森堡 1925 年论文原页与版本说明",
    englishLabel: "AIP Center for History of Physics: Heisenberg's 1925 paper and edition notes",
  },
  "science-heisenberg-microscope": {
    href: "https://ntrs.nasa.gov/citations/19840008978",
    label: "NASA TM-77379 英译记录（标注可公共使用）",
    englishLabel: "NASA TM-77379 translation record (marked for public use)",
  },
  "science-heisenberg-conjugate-limits": {
    href: "https://ntrs.nasa.gov/citations/19840008978",
    label: "NASA TM-77379 英译记录（标注可公共使用）",
    englishLabel: "NASA TM-77379 translation record (marked for public use)",
  },
  "science-curie-quantification": {
    href: "https://www.academie-sciences.fr/pdf/dossiers/Curie/Curie_pdf/CR1898_p1101.pdf",
    label: "法国科学院：居里 1898 年铀、钍射线论文原刊",
    englishLabel: "Académie des sciences: Curie's 1898 paper on uranium and thorium rays",
  },
  "science-curie-pitchblende": {
    href: "https://www.academie-sciences.fr/pdf/dossiers/Curie/Curie_pdf/CR1898_p175_178.pdf",
    label: "法国科学院：皮埃尔与玛丽·居里 1898 年沥青铀矿论文原刊",
    englishLabel: "Académie des sciences: Pierre and Marie Curie's 1898 pitchblende paper",
  },
  "science-einstein-light-quanta": {
    href: "https://doi.org/10.1002/andp.19053220607",
    label: "《关于光的产生和转化的一个启发性观点》1905 年德文原刊",
    englishLabel: "Einstein's 1905 German original on the light quantum",
  },
  "science-schrodinger-entangled-whole": {
    href: "https://doi.org/10.1007/BF01491987",
    label: "《量子力学的现状》第三部分德文原刊",
    englishLabel: "German original of The Present Situation in Quantum Mechanics, Part III",
  },
  "science-schrodinger-cat-boundary": {
    href: "https://doi.org/10.1007/BF01491891",
    label: "《量子力学的现状》第一部分德文原刊",
    englishLabel: "German original of The Present Situation in Quantum Mechanics, Part I",
  },
  "science-feynman-value-of-doubt": {
    href: "https://calteches.library.caltech.edu/1575/",
    label: "加州理工档案：《科学的价值》",
    englishLabel: "Caltech archive: The Value of Science",
  },
};

const chineseProvenanceCaveats: Partial<Record<string, [string, string]>> = {
  dong_zhongshu: [
    "《春秋繁露》传统归于董仲舒，但今本的成书与篇章归属在学界存在争议；卡片沿用传统作者名，不能据此认定每一篇都由董仲舒本人定稿。",
    "The Luxuriant Dew is traditionally attributed to Dong Zhongshu, but the formation of the received text and the attribution of individual chapters remain disputed. The cards retain the traditional author label without claiming that Dong personally finalized every chapter.",
  ],
  fazang: [
    "所链接的 CBETA T1881 页面同时包含法藏《华严金师子章》正文与宋代净源注释；本项目只把其中可区分的法藏正文作为卡片原文，宋注仅用于辨读，不混作法藏原话。",
    "The linked CBETA T1881 page contains both Fazang's Essay on the Golden Lion and Jingyuan's Song-dynasty commentary. Only the distinguishable base text is treated as Fazang's card text; the later commentary is used for reading support and is not presented as Fazang's own wording.",
  ],
  huineng: [
    "《六祖坛经》有敦煌写本与后世通行本等不同传本，并以慧能讲说、弟子记录的传统方式传述；本批卡片依据所标后世通行本呈现，不把它当作慧能亲笔定稿或唯一古本。",
    "The Platform Sutra survives in Dunhuang and later received recensions and is traditionally transmitted as Huineng's teaching recorded by disciples. These cards follow the identified received edition and do not treat it as Huineng's autograph or the sole early text.",
  ],
  zhou_dunyi: [
    "《太极图说》开篇存在“自无极而为太极”“无极而太极”等传本异文；卡片采用所链接底本的“自无极而为太极”，并在定位信息中注明版本。",
    "The opening of the Taijitu shuo survives in variant recensions, including ‘zi wuji er wei taiji’ and ‘wuji er taiji.’ This card follows the linked base text's former reading and identifies it in the locator.",
  ],
};

// These legacy fallback values identify a work but not a passage within it.
// Explicit Thought.sourceLocator values are treated as passage locators by contract.
const workLevelFallbackLocatorIds = new Set(["sartre"]);

function sourceCredibilityForThought(
  thought: Thought,
  hasSourceBasis: boolean,
  locatorLevel: SourceMetadata["locatorLevel"],
  sourceLanguage: string,
): Pick<
  SourceMetadata,
  | "reviewStatus"
  | "presentationNature"
  | "textNature"
  | "translationNature"
  | "verificationStatus"
> {
  const languageUnderReview = sourceLanguage.includes("待核");
  const reviewStatus: SourceReviewStatus = languageUnderReview || !hasSourceBasis
    ? "under-review"
    : locatorLevel === "passage"
      ? "passage-located"
      : "work-located";
  const presentationNature = resolveThoughtPresentationNature(thought);
  const textNature: SourceTextNature = presentationNature === "source-excerpt"
    ? "source-excerpt"
    : "editorial-restatement";

  let translationNature: SourceTranslationNature = "agora-bilingual-restatement";
  if (textNature === "source-excerpt") {
    translationNature = thought.id.startsWith("mao-")
      ? "reference-informed-agora-rendering"
      : "agora-study-translation";
  }

  return {
    reviewStatus,
    presentationNature,
    textNature,
    translationNature,
    verificationStatus: "editorial-trace-only",
  };
}

function sourceMetadataForThoughtBase(thought: Thought): SourceMetadata {
  const locator = thought.sourceLocator ?? passageLocators[thought.id];
  const authorId = thought.authorId ?? thought.id;
  const isMao = thought.id.startsWith("mao-");
  const isChinesePhilosophy = thought.id.startsWith("chinese-");
  const isScience = thought.id.startsWith("science-");
  const isIndian = thought.id.startsWith("indian-");
  const isEconomics = thought.id.startsWith("economics-");
  const isPsychology = thought.id.startsWith("psychology-");
  const isInvestment = thought.id.startsWith("economics-investment-");
  let language: [string, string];
  if (isMao) {
    language = ["中文", "Chinese"];
  } else if (isChinesePhilosophy) {
    language = ["古代汉语（文言文）", "Classical Chinese"];
  } else if (isScience) {
    language = scienceAuthorLanguages[authorId]
      ?? ["原文语言待核", "Original language under review"];
  } else if (isIndian) {
    language = indianAuthorLanguages[authorId]
      ?? ["原文语言待核", "Original language under review"];
  } else if (isEconomics) {
    language = economicsAuthorLanguages[authorId]
      ?? ["原文语言待核", "Original language under review"];
  } else if (isPsychology) {
    language = psychologyAuthorLanguages[authorId]
      ?? ["原文语言待核", "Original language under review"];
  } else {
    language = authorLanguages[authorId]
      ?? ["原文语言待核", "Original language under review"];
  }
  const locatorLevel: SourceMetadata["locatorLevel"] = thought.sourceLocator
    ? "passage"
    : locator && !workLevelFallbackLocatorIds.has(thought.id)
      ? "passage"
      : "work";
  const credibility = sourceCredibilityForThought(
    thought,
    Boolean(locator || thought.work.trim()),
    locatorLevel,
    language[0],
  );

  if (isMao) {
    const isSourceExcerpt = credibility.presentationNature === "source-excerpt";
    return {
      sourceLanguage: language[0],
      englishSourceLanguage: language[1],
      locator: locator?.[0] ?? thought.work,
      englishLocator: locator?.[1] ?? thought.englishWork,
      locatorLevel,
      ...credibility,
      referenceEdition: "按篇目参考公开中文收录文本；不同篇目所据版本可能不同",
      englishReferenceEdition: "Publicly available Chinese texts and English reference translations, as applicable to each work",
      provenanceNote: isSourceExcerpt
        ? "中文为所列篇章中的原文短句；英文在相应篇目有可用英译时，将公开英译作为措辞参考。各篇所据版本与覆盖范围不同。"
        : "中文为项目依据所列篇章整理的编辑性转述；英文由项目据中文，并在相应篇目有可用英译时参考公开英译重述。二者都不是出版物中的逐字引文。",
      englishProvenanceNote: isSourceExcerpt
        ? "The Chinese is a short passage from the listed work. Where an English translation is available, NOTHING FINAL uses it as a wording reference; editions and coverage vary by work."
        : "The Chinese is an editorial restatement grounded in the listed passage. The English is the project's rendering based on the Chinese and, where available for that work, a public reference translation; neither is a verbatim published quotation.",
      referenceLinks: [
        {
          href: "https://www.12371.cn/special/mzdxj/dyj/",
          label: "中文一卷（适用篇目）",
          englishLabel: "Chinese Vol. I (where applicable)",
        },
        {
          href: "https://www.12371.cn/special/mzdxj/dej/",
          label: "中文二卷（适用篇目）",
          englishLabel: "Chinese Vol. II (where applicable)",
        },
        {
          href: "https://www.12371.cn/special/mzdxj/d3j/",
          label: "中文三卷（适用篇目）",
          englishLabel: "Chinese Vol. III (where applicable)",
        },
        {
          href: "https://www.12371.cn/special/mzdxj/d4j/",
          label: "中文四卷（适用篇目）",
          englishLabel: "Chinese Vol. IV (where applicable)",
        },
        {
          href: "https://www.marxists.org/reference/archive/mao/selected-works/index.htm",
          label: "英文参照索引（按篇目适用）",
          englishLabel: "English reference index (where applicable)",
        },
      ],
    };
  }

  if (isChinesePhilosophy) {
    const primaryTextLink = chinesePrimaryTextLinks[authorId];
    const provenanceCaveat = chineseProvenanceCaveats[authorId];
    const generalProvenanceNote = "首页中文为所列古典篇章的原典节选；弹窗“今译”和观点解读由未定稿以现代汉语整理。英文为便于研读的项目译文，并非某一现代出版译本的逐字引文。";
    const generalEnglishProvenanceNote = "The Chinese card text is a short passage from the listed classical work. The plain-language Chinese reading and interpretation are prepared by NOTHING FINAL. The English is a study translation, not a verbatim quotation from a single modern edition.";
    return {
      sourceLanguage: language[0],
      englishSourceLanguage: language[1],
      locator: locator?.[0] ?? thought.work,
      englishLocator: locator?.[1] ?? thought.englishWork,
      locatorLevel,
      ...credibility,
      referenceEdition: "篇章定位采用通行章次记录；原典链接供读者回看，简繁字形会随界面语言转换",
      englishReferenceEdition: "Passage locations use conventional divisions; linked primary texts provide a route back to the source, while character forms follow the interface language",
      provenanceNote: [generalProvenanceNote, provenanceCaveat?.[0]].filter(Boolean).join(" "),
      englishProvenanceNote: [generalEnglishProvenanceNote, provenanceCaveat?.[1]].filter(Boolean).join(" "),
      referenceLinks: [
        ...(primaryTextLink ? [primaryTextLink] : []),
        {
          href: "https://ctext.org/introduction",
          label: "中国哲学书电子化计划说明",
          englishLabel: "Chinese Text Project introduction",
        },
      ],
    };
  }

  if (isScience) {
    const primaryTextLink = scienceThoughtPrimaryTextLinks[thought.id]
      ?? sciencePrimaryTextLinks[authorId];
    const isSourceExcerpt = credibility.presentationNature === "source-excerpt";
    return {
      sourceLanguage: language[0],
      englishSourceLanguage: language[1],
      locator: locator?.[0] ?? thought.work,
      englishLocator: locator?.[1] ?? thought.englishWork,
      locatorLevel,
      ...credibility,
      referenceEdition: "卡片记录所列原著、论文或演讲及篇章定位；精确定位以卡片字段为准，链接可能指向原文、作者文集、机构存档或书目页",
      englishReferenceEdition: "The card records the cited work, paper, or lecture and its passage locator. Use the locator field for precision, since a link may lead to the primary text, collected papers, an institutional archive, or a catalogue page",
      provenanceNote: isSourceExcerpt
        ? "原文字段为所列原典中的逐字节选；另一语言为未定稿研读译文。作品名、篇章定位与参考链接用于回到完整论证。"
        : "中英文命题均为未定稿依据所列来源整理的编辑性转述，不是作者逐字引文；作品名与篇章定位用于回到原论证，参考链接在部分条目中是文集、存档或书目入口。",
      englishProvenanceNote: isSourceExcerpt
        ? "The original-language field is a verbatim excerpt from the listed primary text; the other language is a NOTHING FINAL study translation. Use the work title, passage locator, and reference link to return to the full argument."
        : "Both language versions are editorial restatements prepared by NOTHING FINAL from the cited source, not verbatim quotations. Use the work title and passage locator to check the original argument; for some entries, the reference link opens a collection, archive, or catalogue record.",
      referenceLinks: primaryTextLink ? [primaryTextLink] : [],
    };
  }

  if (isIndian) {
    const primaryTextLink = indianThoughtPrimaryTextLinks[thought.id]
      ?? indianPrimaryTextLinks[authorId];
    const isSourceExcerpt = credibility.presentationNature === "source-excerpt";
    return {
      sourceLanguage: language[0],
      englishSourceLanguage: language[1],
      locator: locator?.[0] ?? thought.work,
      englishLocator: locator?.[1] ?? thought.englishWork,
      locatorLevel,
      ...credibility,
      referenceEdition: "卡片记录所列原典、篇章或偈颂定位；跨梵语、巴利语、俗语及近现代语言的章次会随版本变化，应以作品名与定位字段共同检索",
      englishReferenceEdition: "The card records the cited work and passage, chapter, or verse locator. Numbering can vary across Sanskrit, Pali, Prakrit, and modern-language editions, so use the work title and locator together",
      provenanceNote: isSourceExcerpt
        ? "首页已标明的原文字段为所列历史公版译本中的逐字节选；另一语言为未定稿研读译文。作品名、篇章定位与版本链接用于返回完整语境。"
        : "首页中英文均为未定稿依据所列篇章整理的研读性转述，不是原典或某一现代译本的逐字引文。作品名与篇章定位用于返回上下文；参考链接可能进入机构原典库、作者文集或档案入口。",
      englishProvenanceNote: isSourceExcerpt
        ? "The registered original-text field is a verbatim excerpt from the listed historical public-domain translation; the other language is a NOTHING FINAL study translation. Use the work title, locator, and edition link to return to full context."
        : "Both card languages are NOTHING FINAL editorial study renderings grounded in the cited passage, not verbatim wording from the source or a single modern translation. Use the work title and locator to return to context; a reference link may open an institutional corpus, collected works, or archive entry.",
      referenceLinks: primaryTextLink ? [primaryTextLink] : [gretilReference, saritReference],
    };
  }

  if (isEconomics) {
    const isSourceExcerpt = credibility.presentationNature === "source-excerpt";
    const investmentNotice = isInvestment
      ? "仅用于经济思想与投资史教育，不构成投资建议；不评价任何具体证券，也不替代个人风险评估或持牌专业意见。"
      : undefined;
    const englishInvestmentNotice = isInvestment
      ? "For education in economic thought and investing history only; not investment advice. It does not evaluate any specific security or replace personal risk assessment or licensed professional advice."
      : undefined;
    return {
      sourceLanguage: language[0],
      englishSourceLanguage: language[1],
      locator: locator?.[0] ?? thought.work,
      englishLocator: locator?.[1] ?? thought.englishWork,
      locatorLevel,
      ...credibility,
      referenceEdition: "卡片记录所列原著、论文或演讲及篇章定位；精确定位以卡片字段为准，链接可能指向原文、机构档案、作者文集或出版社书目页",
      englishReferenceEdition: "The card records the cited work, paper, or lecture and its passage locator. Use the locator field for precision, since a link may lead to the primary text, an institutional archive, collected works, or a publisher catalogue page",
      provenanceNote: [
        isSourceExcerpt
          ? "原文字段为所列原作中的逐字节选；另一语言为未定稿研读译文。作品名、定位字段与参考链接用于回到完整论证。"
          : "中英文均为未定稿依据所列原作、论文或演讲及篇章定位整理的编辑性转述，不是作者逐字引文。作品名与定位字段用于回到原论证；参考链接可能进入原文、机构档案、作者文集或出版社书目页。",
        investmentNotice,
      ].filter(Boolean).join(" "),
      englishProvenanceNote: [
        isSourceExcerpt
          ? "The original-language field is a verbatim excerpt from the listed primary work; the other language is a NOTHING FINAL study translation. Use the work title, locator, and reference link to return to the full argument."
          : "Both language versions are NOTHING FINAL editorial restatements grounded in the cited work, paper, or lecture and its passage locator, not verbatim quotations. Use the work title and locator to return to the original argument; a reference link may open the primary text, an institutional archive, collected works, or a publisher catalogue page.",
        englishInvestmentNotice,
      ].filter(Boolean).join(" "),
      referenceLinks: economicsThoughtReferenceLinks[thought.id]
        ?? economicsReferenceLinks[authorId]
        ?? [],
    };
  }

  if (isPsychology) {
    const isSourceExcerpt = credibility.presentationNature === "source-excerpt";
    return {
      sourceLanguage: language[0],
      englishSourceLanguage: language[1],
      locator: locator?.[0] ?? thought.work,
      englishLocator: locator?.[1] ?? thought.englishWork,
      locatorLevel,
      ...credibility,
      referenceEdition: "卡片记录所列原著、论文或研究报告及篇章/实验定位；研究结论还应结合样本、操作化、统计方法与后续重复或修正核读",
      englishReferenceEdition: "The card records the cited book, article, or research report and its chapter or study locator; findings should also be checked against samples, operationalization, statistical methods, and later replications or revisions",
      provenanceNote: isSourceExcerpt
        ? "原文字段为所列原典中的逐字节选；另一语言为未定稿研读译文。内容仅用于思想史学习，不构成心理诊断或临床建议。"
        : "中英文均为未定稿依据所列来源整理的编辑性转述，不是作者逐字引文，也不构成心理诊断或临床建议。",
      englishProvenanceNote: isSourceExcerpt
        ? "The original-language field is a verbatim excerpt from the listed primary text; the other language is a NOTHING FINAL study translation. It is for intellectual-history study only and does not constitute psychological diagnosis or clinical advice."
        : "Both languages are editorial restatements prepared by NOTHING FINAL from the listed source. They are not verbatim quotations and do not constitute psychological diagnosis or clinical advice.",
      referenceLinks: [],
    };
  }

  return {
    sourceLanguage: language[0],
    englishSourceLanguage: language[1],
    locator: locator?.[0] ?? thought.work,
    englishLocator: locator?.[1] ?? thought.englishWork,
    locatorLevel,
    ...credibility,
    provenanceNote: credibility.presentationNature === "source-excerpt"
      ? "所示中英文用于双语阅读，未必对应同一出版版本；原作非英语时，英文亦为参考译文。不同版本的措辞与章节标记可能有差异。"
      : "此则为便于阅读的编辑性命题重述，并非逐字引文；请以所列著作为进一步研究起点。",
    englishProvenanceNote: credibility.presentationNature === "source-excerpt"
      ? "The bilingual text is presented for study and may not correspond to one single edition. Where the original is not English, the English is also a reference translation."
      : "This is an editorial restatement rather than a verbatim quotation; use the listed work as a starting point for further research.",
  };
}

function mergeReferenceLinks(
  verifiedLinks: readonly VerifiedSourceReferenceLink[],
  existingLinks: SourceMetadata["referenceLinks"],
): NonNullable<SourceMetadata["referenceLinks"]> {
  const linksByHref = new Map<string, NonNullable<SourceMetadata["referenceLinks"]>[number]>();
  for (const link of [...verifiedLinks, ...(existingLinks ?? [])]) {
    if (!linksByHref.has(link.href)) {
      linksByHref.set(link.href, link);
    }
  }
  return [...linksByHref.values()];
}

export function sourceMetadataForThought(thought: Thought): SourceMetadata {
  const metadata = sourceMetadataForThoughtBase(thought);
  const verifiedPassage = verifiedSourcePassageFor(thought.id);

  if (
    resolveThoughtPresentationNature(thought) !== "source-excerpt"
    || !verifiedPassage
  ) {
    return metadata;
  }

  const originalFieldZh = verifiedPassage.originalField === "text"
    ? "中文逐字字段"
    : "英文逐字字段";
  const originalFieldEn = verifiedPassage.originalField === "text"
    ? "registered Chinese verbatim field"
    : "registered English verbatim field";

  return {
    ...metadata,
    verificationStatus: "primary-text-checked",
    referenceEdition: verifiedPassage.referenceEdition.zh,
    englishReferenceEdition: verifiedPassage.referenceEdition.en,
    useBasis: verifiedPassage.useBasis?.zh,
    englishUseBasis: verifiedPassage.useBasis?.en,
    referenceLinks: mergeReferenceLinks(
      verifiedPassage.referenceLinks,
      metadata.referenceLinks,
    ),
    provenanceNote: `${metadata.provenanceNote} 已核查仅覆盖登记的${originalFieldZh}；译文与观点解读仍为未定稿编辑内容。`,
    englishProvenanceNote: `${metadata.englishProvenanceNote} Verification covers only the registered ${originalFieldEn}; translations and interpretations remain NOTHING FINAL editorial content.`,
  };
}
