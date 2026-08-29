import type { Thought } from "./philosophy";

type MaoSourceWork = Readonly<{
  zhTitle: string;
  enTitle: string;
  zhUrl: string;
  enUrl?: string;
  zhLinkLabel?: string;
  zhEnglishLabel?: string;
  zhEditionNote?: string;
  enEditionNote?: string;
  extraLinks?: readonly Readonly<{
    href: string;
    label: string;
    englishLabel: string;
  }>[];
}>;

type MaoSourceUpgradeSeed = Readonly<{
  id: string;
  source: keyof typeof maoSourceWorks;
  text: string;
  english: string;
  sourceLocator: readonly [string, string];
  context?: string;
  englishContext?: string;
  distinction?: string;
  englishDistinction?: string;
  emphasis: Readonly<{
    zh: readonly [string] | readonly [string, string];
    en: readonly [string] | readonly [string, string];
  }>;
  quotationBasis?: true;
}>;

/**
 * Primary-text routes used by the Mao source-upgrade audit.
 *
 * The Chinese field is the original-language field. English card text is
 * checked against the linked Selected Works translation when the same clause
 * is available there; otherwise it is a deliberately literal project
 * translation of the verified Chinese excerpt.
 */
export const maoSourceWorks = {
  practice: {
    zhTitle: "《实践论》",
    enTitle: "On Practice",
    zhUrl: "https://www.marxists.org/chinese/maozedong/marxist.org-chinese-mao-193707.htm",
    enUrl: "https://www.marxists.org/reference/archive/mao/selected-works/volume-1/mswv1_16.htm",
  },
  contradiction: {
    zhTitle: "《矛盾论》",
    enTitle: "On Contradiction",
    zhUrl: "https://www.marxists.org/chinese/maozedong/marxist.org-chinese-mao-193708.htm",
    enUrl: "https://www.marxists.org/reference/archive/mao/selected-works/volume-1/mswv1_17.htm",
  },
  spark: {
    zhTitle: "《星星之火，可以燎原》",
    enTitle: "A Single Spark Can Start a Prairie Fire",
    zhUrl: "https://www.marxists.org/chinese/maozedong/marxist.org-chinese-mao-19300105.htm",
    enUrl: "https://www.marxists.org/reference/archive/mao/selected-works/volume-1/mswv1_06.htm",
  },
  peoplesLife: {
    zhTitle: "《关心群众生活，注意工作方法》",
    enTitle: "Be Concerned with the Well-Being of the Masses, Pay Attention to Methods of Work",
    zhUrl: "https://www.marxists.org/chinese/maozedong/marxist.org-chinese-mao-19340127.htm",
    enUrl: "https://www.marxists.org/reference/archive/mao/selected-works/volume-1/mswv1_10.htm",
  },
  talksAtYenan: {
    zhTitle: "《在延安文艺座谈会上的讲话》",
    enTitle: "Talks at the Yenan Forum on Literature and Art",
    zhUrl: "https://www.marxists.org/chinese/maozedong/marxist.org-chinese-mao-194205.htm",
    enUrl: "https://www.marxists.org/reference/archive/mao/selected-works/volume-3/mswv3_08.htm",
  },
  servePeople: {
    zhTitle: "《为人民服务》",
    enTitle: "Serve the People",
    zhUrl: "https://www.marxists.org/chinese/maozedong/marxist.org-chinese-mao-19440908.htm",
    enUrl: "https://www.marxists.org/reference/archive/mao/selected-works/volume-3/mswv3_19.htm",
  },
  bethune: {
    zhTitle: "《纪念白求恩》",
    enTitle: "In Memory of Norman Bethune",
    zhUrl: "https://www.marxists.org/chinese/maozedong/marxist.org-chinese-mao-19391221.htm",
    enUrl: "https://www.marxists.org/reference/archive/mao/selected-works/volume-2/mswv2_25.htm",
  },
  yugong: {
    zhTitle: "《愚公移山》",
    enTitle: "The Foolish Old Man Who Removed the Mountains",
    zhUrl: "https://www.marxists.org/chinese/maozedong/marxist.org-chinese-mao-19450611.htm",
    enUrl: "https://www.marxists.org/reference/archive/mao/selected-works/volume-3/mswv3_26.htm",
  },
  committeeMethods: {
    zhTitle: "《党委会的工作方法》",
    enTitle: "Methods of Work of Party Committees",
    zhUrl: "https://www.marxists.org/chinese/maozedong/marxist.org-chinese-mao-19490313.htm",
    enUrl: "https://www.marxists.org/reference/archive/mao/selected-works/volume-4/mswv4_59.htm",
  },
  reformStudy: {
    zhTitle: "《改造我们的学习》",
    enTitle: "Reform Our Study",
    zhUrl: "https://www.marxists.org/chinese/maozedong/marxist.org-chinese-mao-19410519.htm",
    enUrl: "https://www.marxists.org/reference/archive/mao/selected-works/volume-3/mswv3_02.htm",
  },
  leadershipMethods: {
    zhTitle: "《关于领导方法的若干问题》",
    enTitle: "Some Questions Concerning Methods of Leadership",
    zhUrl: "https://www.marxists.org/chinese/maozedong/marxist.org-chinese-mao-19430601.htm",
    enUrl: "https://www.marxists.org/reference/archive/mao/selected-works/volume-3/mswv3_13.htm",
  },
  protractedWar: {
    zhTitle: "《论持久战》",
    enTitle: "On Protracted War",
    zhUrl: "https://www.12371.cn/2012/11/18/ARTI1353205436991290.shtml",
    enUrl: "https://www.marxists.org/reference/archive/mao/selected-works/volume-2/mswv2_09.htm",
    zhLinkLabel: "共产党员网：《论持久战》中文全文",
    zhEnglishLabel: "CPC Member Network: complete Chinese text of On Protracted War",
    zhEditionNote: "共产党员网《论持久战》中文全文；按第七十七段及第七十八段逐字核对",
    enEditionNote: "Chinese wording checked against the complete text on the CPC Member Network; English wording checked against the linked Selected Works translation at paragraphs 77 and 78",
    extraLinks: [{
      href: "https://www.marxists.org/chinese/maozedong/marxist.org-chinese-mao-193805b.htm",
      label: "马克思主义文库：《论持久战》中文全文（复核）",
      englishLabel: "Marxists Internet Archive: complete Chinese text of On Protracted War (cross-check)",
    }],
  },
  revolutionaryWarStrategy: {
    zhTitle: "《中国革命战争的战略问题》",
    enTitle: "Problems of Strategy in China's Revolutionary War",
    zhUrl: "https://www.12371.cn/special/mzdxj/dyj/",
    enUrl: "https://www.marxists.org/reference/archive/mao/selected-works/volume-1/mswv1_12.htm",
    zhLinkLabel: "共产党员网：《毛泽东选集》第一卷《中国革命战争的战略问题》中文全文",
    zhEnglishLabel: "CPC Member Network: complete Chinese text of Problems of Strategy in China's Revolutionary War in Selected Works of Mao Zedong, vol. 1",
    zhEditionNote: "共产党员网《毛泽东选集》第一卷在线全文及马克思主义文库《中国革命战争的战略问题》中文全文；按第一章第一节、第三节及第四节逐字核对",
    enEditionNote: "Chinese wording checked against the CPC Member Network and Marxists Internet Archive texts; English wording and printed-page locators checked against Foreign Languages Press Selected Works, vol. I (1965), pp. 181, 183–185, and 189–190",
    extraLinks: [{
      href: "https://www.marxists.org/chinese/maozedong/marxist.org-chinese-mao-193612.htm",
      label: "马克思主义文库：《中国革命战争的战略问题》中文全文（复核）",
      englishLabel: "Marxists Internet Archive: complete Chinese text of Problems of Strategy in China's Revolutionary War (cross-check)",
    }],
  },
  warAndStrategyOfficial: {
    zhTitle: "《战争和战略问题》",
    enTitle: "Problems of War and Strategy",
    zhUrl: "https://www.marxists.org/chinese/maozedong/marxist.org-chinese-mao-19381106.htm",
    enUrl: "https://www.marxists.org/reference/archive/mao/selected-works/volume-2/mswv2_12.htm",
    zhEditionNote: "马克思主义文库《战争和战略问题》中文全文；按第一节首段与第六节末段逐字核对",
    enEditionNote: "Chinese wording checked against the complete Marxists Internet Archive text; English wording and printed-page locators checked against Foreign Languages Press Selected Works, vol. II (1965), pp. 219 and 232 (archived PDF pp. 225 and 238)",
  },
  newDemocracy: {
    zhTitle: "《新民主主义论》",
    enTitle: "On New Democracy",
    zhUrl: "https://www.marxists.org/chinese/maozedong/marxist.org-chinese-mao-194001.htm",
    enUrl: "https://www.marxists.org/reference/archive/mao/selected-works/volume-2/mswv2_26.htm",
    extraLinks: [
      {
        href: "https://www.dswxyjy.org.cn/n/2012/1114/c349708-19578910-3.html",
        label: "中共中央党史和文献研究院：《新民主主义论》民族、科学、大众文化总结句引文",
        englishLabel: "Institute of Party History and Literature: attributed quotation of the national, scientific and mass culture summation in On New Democracy",
      },
      {
        href: "https://www.dswxyjy.org.cn/n1/2019/0228/c423725-30948367.html",
        label: "中共中央党史和文献研究院：《新民主主义论》文化与政治经济关系原句引文",
        englishLabel: "Institute of Party History and Literature: attributed quotation on culture's relation to politics and economics in On New Democracy",
      },
    ],
  },
  rectifyPartyStyle: {
    zhTitle: "《整顿党的作风》",
    enTitle: "Rectify the Party's Style of Work",
    zhUrl: "https://www.marxists.org/chinese/maozedong/marxist.org-chinese-mao-19420201.htm",
    enUrl: "https://www.marxists.org/reference/archive/mao/selected-works/volume-3/mswv3_06.htm",
    extraLinks: [{
      href: "https://www.12371.cn/2021/02/01/ARTI1612139878347284.shtml",
      label: "共产党员网“党史百年·天天读”：《整顿党的作风》三项任务及“真正的理论”原句引文",
      englishLabel: "CPC Member Network, Party History Daily: attributed quotations of the three rectification tasks and the ‘true theory’ sentence in Rectify the Party's Style of Work",
    }],
  },
  opposeStereotypedPartyWritingFullText: {
    zhTitle: "《反对党八股》",
    enTitle: "Oppose Stereotyped Party Writing",
    zhUrl: "https://www.marxists.org/chinese/maozedong/marxist.org-chinese-mao-19420208.htm",
    enUrl: "https://www.marxists.org/reference/archive/mao/selected-works/volume-3/mswv3_07.htm",
    extraLinks: [{
      href: "https://www.dswxyjy.org.cn/n1/2022/0205/c423725-32345525.html",
      label: "中共中央党史和文献研究院：按《反对党八股》论文章篇幅与内容的引文",
      englishLabel: "Institute of Party History and Literature: attributed quotations on length and substance from Oppose Stereotyped Party Writing",
    }],
  },
  analysisClasses: {
    zhTitle: "《中国社会各阶级的分析》",
    enTitle: "Analysis of the Classes in Chinese Society",
    zhUrl: "https://www.12371.cn/2012/11/19/ARTI1353313414202316.shtml",
    enUrl: "https://www.marxists.org/reference/archive/mao/selected-works/volume-1/mswv1_1.htm",
    zhLinkLabel: "共产党员网：《中国社会各阶级的分析》中文全文",
    zhEnglishLabel: "CPC Member Network: complete Chinese text of Analysis of the Classes in Chinese Society",
    zhEditionNote: "共产党员网《中国社会各阶级的分析》中文全文；按开篇、小资产阶级及无产阶级相关句逐字核对",
    enEditionNote: "Chinese wording checked against the complete text on the CPC Member Network; English wording and printed-page locators checked against Foreign Languages Press Selected Works, vol. I (1965), pp. 13, 15, and 18",
    extraLinks: [{
      href: "https://www.marxists.org/chinese/maozedong/marxist.org-chinese-mao-19251201.htm",
      label: "马克思主义文库：《中国社会各阶级的分析》中文全文（复核）",
      englishLabel: "Marxists Internet Archive: Chinese text of Analysis of the Classes in Chinese Society (cross-check)",
    }],
  },
  introducingCommunist: {
    zhTitle: "《〈共产党人〉发刊词》",
    enTitle: "Introducing The Communist",
    zhUrl: "https://www.marxists.org/chinese/maozedong/marxist.org-chinese-mao-19391004.htm",
    enUrl: "https://www.marxists.org/reference/archive/mao/selected-works/volume-2/mswv2_20.htm",
    zhEditionNote: "马克思主义文库《〈共产党人〉发刊词》中文全文；按党的建设同政治路线、统一战线和武装斗争相联系的十八年总结句逐字核对",
    enEditionNote: "Chinese wording checked against the complete Marxists Internet Archive text; English wording and printed-page locator checked against Foreign Languages Press Selected Works, vol. II (1965), p. 288",
  },
  chineseRevolutionCommunistParty: {
    zhTitle: "《中国革命和中国共产党》",
    enTitle: "The Chinese Revolution and the Chinese Communist Party",
    zhUrl: "https://www.marxists.org/chinese/maozedong/marxist.org-chinese-mao-193912.htm",
    enUrl: "https://www.marxists.org/reference/archive/mao/selected-works/volume-2/mswv2_23.htm",
    zhEditionNote: "马克思主义文库《中国革命和中国共产党》中文全文；按第二章第二节与第四节相关总结句逐字核对",
    enEditionNote: "Chinese wording checked against the complete Marxists Internet Archive text; English wording and printed-page locators checked against Foreign Languages Press Selected Works, vol. II (1965), pp. 315 and 319",
  },
  peoplesDemocraticDictatorship: {
    zhTitle: "《论人民民主专政》",
    enTitle: "On the People's Democratic Dictatorship",
    zhUrl: "https://www.marxists.org/chinese/maozedong/marxist.org-chinese-mao-19490630.htm",
    enUrl: "https://www.marxists.org/reference/archive/mao/selected-works/volume-4/mswv4_65.htm",
    zhEditionNote: "马克思主义文库《论人民民主专政》中文全文；按关于现时不能消灭国家权力的问答段逐字核对",
    enEditionNote: "Chinese wording checked against the complete Marxists Internet Archive text; English wording and printed-page locator checked against Foreign Languages Press Selected Works, vol. IV (1961), p. 418",
  },
  redPoliticalPowerOfficial: {
    zhTitle: "《中国的红色政权为什么能够存在？》",
    enTitle: "Why Is It That Red Political Power Can Exist in China?",
    zhUrl: "https://www.12371.cn/special/mzdxj/dyj/",
    enUrl: "https://www.marxists.org/reference/archive/mao/selected-works/volume-1/mswv1_3.htm",
    zhLinkLabel: "共产党员网：《毛泽东选集》第一卷《中国的红色政权为什么能够存在？》中文全文",
    zhEnglishLabel: "CPC Member Network: complete Chinese text of Why Is It That Red Political Power Can Exist in China? in Selected Works of Mao Zedong, vol. 1",
    zhEditionNote: "共产党员网《毛泽东选集》第一卷在线全文；按第二节第一项关于白色政权分裂与战争的段落逐字核对",
    enEditionNote: "Chinese wording checked against the CPC Member Network text; English wording and printed-page locator checked against Foreign Languages Press Selected Works, vol. I (1965), p. 65",
  },
  ruralClassesOfficial: {
    zhTitle: "《怎样分析农村阶级》",
    enTitle: "How to Differentiate the Classes in the Rural Areas",
    zhUrl: "https://www.12371.cn/special/mzdxj/dyj/",
    enUrl: "https://www.marxists.org/reference/archive/mao/selected-works/volume-1/mswv1_8.htm",
    zhLinkLabel: "共产党员网：《毛泽东选集》第一卷《怎样分析农村阶级》中文全文",
    zhEnglishLabel: "CPC Member Network: complete Chinese text of How to Differentiate the Classes in the Rural Areas in Selected Works of Mao Zedong, vol. 1",
    zhEditionNote: "共产党员网《毛泽东选集》第一卷在线全文及马克思主义文库《怎样分析农村阶级》中文全文；按第一节地主定义与第四节区分中农、贫农的标准逐字核对",
    enEditionNote: "Chinese wording checked against the CPC Member Network and Marxists Internet Archive texts; English wording and printed-page locators checked against Foreign Languages Press Selected Works, vol. I (1965), pp. 137 and 139",
    extraLinks: [{
      href: "https://www.marxists.org/chinese/maozedong/marxist.org-chinese-mao-193310.htm",
      label: "马克思主义文库：《怎样分析农村阶级》中文全文（复核）",
      englishLabel: "Marxists Internet Archive: complete Chinese text of How to Differentiate the Classes in the Rural Areas (cross-check)",
    }],
  },
  economicPolicyOfficial: {
    zhTitle: "《我们的经济政策》",
    enTitle: "Our Economic Policy",
    zhUrl: "https://www.12371.cn/special/mzdxj/dyj/",
    enUrl: "https://www.marxists.org/reference/archive/mao/selected-works/volume-1/mswv1_9.htm",
    zhLinkLabel: "共产党员网：《毛泽东选集》第一卷《我们的经济政策》中文全文",
    zhEnglishLabel: "CPC Member Network: complete Chinese text of Our Economic Policy in Selected Works of Mao Zedong, vol. 1",
    zhEditionNote: "共产党员网《毛泽东选集》第一卷在线全文；按国营、合作社与私人经济段落逐字核对",
    enEditionNote: "Chinese wording checked against the CPC Member Network text; English wording and printed-page locator checked against Foreign Languages Press Selected Works, vol. I (1965), p. 144",
  },
  correctContradictions: {
    zhTitle: "《关于正确处理人民内部矛盾的问题》",
    enTitle: "On the Correct Handling of Contradictions Among the People",
    zhUrl: "https://www.marxists.org/chinese/maozedong/marxist.org-chinese-mao-19570227.htm",
    enUrl: "https://www.marxists.org/reference/archive/mao/selected-works/volume-5/mswv5_58.htm",
    extraLinks: [
      {
        href: "https://fuwu.12371.cn/2013/08/19/ARTI1376892293655966_2.shtml",
        label: "共产党员网：《关于正确处理人民内部矛盾的问题》第一部分“团结—批评—团结”段（网页分页2）",
        englishLabel: "CPC Member Network: the ‘unity—criticism—unity’ passage in part I of On the Correct Handling of Contradictions Among the People (web page 2)",
      },
      {
        href: "https://fuwu.12371.cn/2013/08/19/ARTI1376892293655966_7.shtml",
        label: "共产党员网：《关于正确处理人民内部矛盾的问题》第八部分中文全文",
        englishLabel: "CPC Member Network: On the Correct Handling of Contradictions Among the People, part VIII, complete Chinese text",
      },
    ],
  },
  secondPlenum: {
    zhTitle: "《在中国共产党第七届中央委员会第二次全体会议上的报告》",
    enTitle: "Report to the Second Plenary Session of the Seventh Central Committee",
    zhUrl: "https://www.marxists.org/chinese/maozedong/marxist.org-chinese-mao-19490305.htm",
    enUrl: "https://www.marxists.org/reference/archive/mao/selected-works/volume-4/mswv4_58.htm",
    extraLinks: [{
      href: "https://www.12371.cn/2020/05/18/ARTI1589785010170647.shtml",
      label: "共产党员网：七届二中全会“两个务必”原句引文",
      englishLabel: "CPC Member Network: attributed quotation of the ‘two musts’ from the Second Plenary Session report",
    }],
  },
  secondPlenumConstruction: {
    zhTitle: "《在中国共产党第七届中央委员会第二次全体会议上的报告》",
    enTitle: "Report to the Second Plenary Session of the Seventh Central Committee",
    zhUrl: "https://www.marxists.org/chinese/maozedong/marxist.org-chinese-mao-19490305.htm",
    enUrl: "https://www.marxists.org/reference/archive/mao/selected-works/volume-4/mswv4_58.htm",
    zhEditionNote: "马克思主义文库《在中国共产党第七届中央委员会第二次全体会议上的报告》中文全文；按第四部分恢复和发展城市生产段逐字核对",
    enEditionNote: "Chinese wording checked against the complete Marxists Internet Archive text; English wording and printed-page locator checked against Foreign Languages Press Selected Works, vol. IV (1961), p. 365 (archived PDF p. 371)",
  },
  coalitionGovernment: {
    zhTitle: "《论联合政府》",
    enTitle: "On Coalition Government",
    zhUrl: "https://www.marxists.org/chinese/maozedong/marxist.org-chinese-mao-19450424.htm",
    enUrl: "https://www.marxists.org/reference/archive/mao/selected-works/volume-3/mswv3_25.htm",
    extraLinks: [{
      href: "https://news.12371.cn/2017/09/21/ARTI1505977556383646.shtml",
      label: "共产党员网：《论联合政府》自我批评段引文",
      englishLabel: "CPC Member Network: attributed quotation from the self-criticism passage in On Coalition Government",
    }],
  },
  coalitionGovernmentForeignCultureOfficial: {
    zhTitle: "《论联合政府》",
    enTitle: "On Coalition Government",
    zhUrl: "https://www.dswxyjy.org.cn/n/2012/1129/c244516-19738969-12.html",
    enUrl: "https://www.marxists.org/reference/archive/mao/selected-works/volume-3/mswv3_25.htm",
    zhLinkLabel: "中共中央党史和文献研究院：《论联合政府》第八部分“文化、教育、知识分子问题”节录",
    zhEnglishLabel: "Institute of Party History and Literature: On Coalition Government, part VIII, ‘Culture, Education and the Intellectuals’",
    zhEditionNote: "中共中央党史和文献研究院《论联合政府》第八部分节录；按外国文化段逐字核对，《毛泽东选集》第三卷（人民出版社1991年版）第1083页",
    enEditionNote: "Chinese wording checked against the Institute of Party History and Literature excerpt; English wording checked against the linked Selected Works translation, part IV, point 8, ‘The Problem of Culture, Education and the Intellectuals’",
    extraLinks: [{
      href: "https://www.marxists.org/chinese/maozedong/marxist.org-chinese-mao-19450424.htm",
      label: "马克思主义文库：《论联合政府》中文全文（复核）",
      englishLabel: "Marxists Internet Archive: complete Chinese text of On Coalition Government (cross-check)",
    }],
  },
  opposeBookWorship: {
    zhTitle: "《反对本本主义》",
    enTitle: "Oppose Book Worship",
    zhUrl: "https://www.12371.cn/2012/08/10/ARTI1344592797863461.shtml",
    enUrl: "https://www.marxists.org/reference/archive/mao/selected-works/volume-6/mswv6_11.htm",
    zhLinkLabel: "共产党员网：《反对本本主义》中文全文",
    zhEnglishLabel: "CPC Member Network: complete Chinese text of Oppose Book Worship",
    extraLinks: [{
      href: "https://www.marxists.org/chinese/maozedong/marxist.org-chinese-mao-193005.htm",
      label: "马克思主义文库：《反对本本主义》中文全文（复核）",
      englishLabel: "Marxists Internet Archive: Chinese text of Oppose Book Worship (cross-check)",
    }],
  },
  ruralSurveys: {
    zhTitle: "《〈农村调查〉的序言和跋》",
    enTitle: "Preface and Postscript to Rural Surveys",
    zhUrl: "https://www.dswxyjy.org.cn/n1/2019/0228/c423725-30929379.html",
    enUrl: "https://www.marxists.org/reference/archive/mao/selected-works/volume-3/mswv3_01.htm",
    zhLinkLabel: "中共中央党史和文献研究院：《〈农村调查〉的序言和跋》“群众是真正的英雄”原句引文",
    zhEnglishLabel: "Institute of Party History and Literature: attributed ‘masses are the real heroes’ quotation from Preface and Postscript to Rural Surveys",
    zhEditionNote: "中共中央党史和文献研究院页面逐字引述；并以马克思主义文库中文全文复核《〈农村调查〉的序言》对应完整句",
    enEditionNote: "Chinese wording checked against the attributed quotation published by the Institute of Party History and Literature and cross-checked against the linked complete Chinese text; the English card follows the linked Selected Works wording",
    extraLinks: [
      {
        href: "https://news.12371.cn/2013/06/17/ARTI1371442467422304_2.shtml",
        label: "共产党员网：群众路线论述摘编所载《〈农村调查〉的序言和跋》引文及人民出版社1991年版第790页定位",
        englishLabel: "CPC Member Network: attributed Rural Surveys quotation with the People's Publishing House 1991 edition, p. 790 locator",
      },
      {
        href: "https://www.marxists.org/chinese/maozedong/marxist.org-chinese-mao-194134.htm",
        label: "马克思主义文库：《〈农村调查〉的序言和跋》中文全文（复核）",
        englishLabel: "Marxists Internet Archive: complete Chinese text of Preface and Postscript to Rural Surveys (cross-check)",
      },
    ],
  },
  ruralSurveysStudentOfficial: {
    zhTitle: "《〈农村调查〉的序言和跋》",
    enTitle: "Preface and Postscript to Rural Surveys",
    zhUrl: "https://www.dswxyjy.org.cn/n1/2024/0326/c427195-40203769.html",
    enUrl: "https://www.marxists.org/reference/archive/mao/selected-works/volume-3/mswv3_01.htm",
    zhLinkLabel: "中共中央党史和文献研究院：《农村调查》“继续当一个小学生”原句引文",
    zhEnglishLabel: "Institute of Party History and Literature: attributed ‘go on being a pupil’ quotation from Rural Surveys",
    zhEditionNote: "中共中央党史和文献研究院页面逐字引述，并以《毛泽东选集》第三卷中文全文复核序言末句；人民出版社1991年版第791页",
    enEditionNote: "Chinese wording checked against the attributed quotation from the Institute of Party History and Literature and the complete Selected Works text; English wording checked against the linked Foreign Languages Press translation",
    extraLinks: [{
      href: "https://www.qstheory.cn/books/2019-07/31/c_1119479227.htm",
      label: "求是网：《毛泽东选集》第三卷中文全文（复核）",
      englishLabel: "Qiushi: complete Chinese text of Selected Works of Mao Zedong, vol. 3 (cross-check)",
    }],
  },
  combatLiberalism: {
    zhTitle: "《反对自由主义》",
    enTitle: "Combat Liberalism",
    zhUrl: "https://www.marxists.org/chinese/maozedong/marxist.org-chinese-mao-19370907.htm",
    enUrl: "https://www.marxists.org/reference/archive/mao/selected-works/volume-2/mswv2_03.htm",
    extraLinks: [{
      href: "https://www.12371.cn/2021/09/02/ARTI1630548788884760.shtml",
      label: "共产党员网“党史百年·天天读”：《反对自由主义》开篇引文",
      englishLabel: "CPC Member Network, Party History Daily: opening quotation from Combat Liberalism",
    }],
  },
  strongTalk: {
    zhTitle: "《和美国记者安娜·路易斯·斯特朗的谈话》",
    enTitle: "Talk with the American Correspondent Anna Louise Strong",
    zhUrl: "https://www.marxists.org/chinese/maozedong/marxist.org-chinese-mao-19460806.htm",
    enUrl: "https://www.marxists.org/reference/archive/mao/selected-works/volume-4/mswv4_13.htm",
    extraLinks: [{
      href: "https://www.12371.cn/2021/08/03/ARTI1627975473226916.shtml",
      label: "共产党员网“党史百年·天天读”：斯特朗谈话原句引文",
      englishLabel: "CPC Member Network, Party History Daily: attributed quotation from the talk with Anna Louise Strong",
    }],
  },
  hunanPeasantInvestigationOfficial: {
    zhTitle: "《湖南农民运动考察报告》",
    enTitle: "Report on an Investigation of the Peasant Movement in Hunan",
    zhUrl: "https://www.12371.cn/2012/08/10/ARTI1344591155352514.shtml",
    enUrl: "https://www.marxists.org/reference/archive/mao/selected-works/volume-1/mswv1_2.htm",
    zhLinkLabel: "共产党员网：《湖南农民运动考察报告》中文全文",
    zhEnglishLabel: "CPC Member Network: complete Chinese text of Report on an Investigation of the Peasant Movement in Hunan",
    zhEditionNote: "共产党员网《湖南农民运动考察报告》中文全文；按各卡所列分节与段落逐字核对",
    enEditionNote: "Chinese wording checked against the complete text on the CPC Member Network; English wording is checked against the linked Foreign Languages Press Selected Works translation where the card uses that translation, while any divergent rendering remains a project study translation",
  },
  tacticsAgainstJapaneseImperialismOfficial: {
    zhTitle: "《论反对日本帝国主义的策略》",
    enTitle: "On Tactics Against Japanese Imperialism",
    zhUrl: "https://www.12371.cn/special/mzdxj/dyj/",
    enUrl: "https://www.marxists.org/reference/archive/mao/selected-works/volume-1/mswv1_11.htm",
    zhLinkLabel: "共产党员网：《毛泽东选集》第一卷《论反对日本帝国主义的策略》中文全文",
    zhEnglishLabel: "CPC Member Network: complete Chinese text of On Tactics Against Japanese Imperialism in Selected Works of Mao Zedong, vol. 1",
    zhEditionNote: "共产党员网《毛泽东选集》第一卷在线全文；按广泛统一战线与“人民共和国”两节的相关段落逐字核对",
    enEditionNote: "Chinese original checked against the CPC Member Network text; English wording checked against the Foreign Languages Press Selected Works, vol. I (1965), pp. 165 and 167",
    extraLinks: [
      {
        href: "https://www.marxists.org/chinese/maozedong/marxist.org-chinese-mao-19351227.htm",
        label: "马克思主义文库：《论反对日本帝国主义的策略》中文全文（复核）",
        englishLabel: "Marxists Internet Archive: complete Chinese text of On Tactics Against Japanese Imperialism (cross-check)",
      },
      {
        href: "https://www.12371.cn/2025/08/25/ARTI1756084461624497.shtml",
        label: "共产党员网：抗日民族统一战线领导作用相关原句引文",
        englishLabel: "CPC Member Network: attributed quotation on leadership in the anti-Japanese national united front",
      },
    ],
  },
  winMassesOfficial: {
    zhTitle: "《为争取千百万群众进入抗日民族统一战线而斗争》",
    enTitle: "Win the Masses in Their Millions for the Anti-Japanese National United Front",
    zhUrl: "https://www.12371.cn/special/mzdxj/dyj/",
    enUrl: "https://www.marxists.org/reference/archive/mao/selected-works/volume-1/mswv1_15.htm",
    zhLinkLabel: "共产党员网：《毛泽东选集》第一卷《为争取千百万群众进入抗日民族统一战线而斗争》中文全文",
    zhEnglishLabel: "CPC Member Network: complete Chinese text of Win the Masses in Their Millions for the Anti-Japanese National United Front in Selected Works of Mao Zedong, vol. 1",
    zhEditionNote: "共产党员网《毛泽东选集》第一卷在线全文；按“干部问题”段逐字核对",
    enEditionNote: "Chinese wording checked against the CPC Member Network text; English wording and printed-page locator checked against Foreign Languages Press Selected Works, vol. I (1965), p. 291",
  },
  propagandaWorkConferenceOfficial: {
    zhTitle: "《在中国共产党全国宣传工作会议上的讲话》",
    enTitle: "Speech at the Chinese Communist Party's National Conference on Propaganda Work",
    zhUrl: "https://www.dswxyjy.org.cn/n1/2020/1112/c434106-31927824.html",
    enUrl: "https://www.marxists.org/reference/archive/mao/selected-works/volume-5/mswv5_59.htm",
    zhLinkLabel: "中共中央党史和文献研究院：宣传工作会议讲话“充分说理”原句引文",
    zhEnglishLabel: "Institute of Party History and Literature: attributed ‘fully reasoned’ quotation from the propaganda-work conference speech",
    zhEditionNote: "中共中央党史和文献研究院页面逐字引述，并以中文全文复核第七点思想批评段",
    enEditionNote: "Chinese wording checked against the Institute of Party History and Literature quotation and the complete Chinese text; English wording checked against the Foreign Languages Press Selected Works, vol. V (1977), p. 434",
    extraLinks: [{
      href: "https://www.marxists.org/chinese/maozedong/marxist.org-chinese-mao-19570312.htm",
      label: "马克思主义文库：《在中国共产党全国宣传工作会议上的讲话》中文全文（复核）",
      englishLabel: "Marxists Internet Archive: complete Chinese text of the propaganda-work conference speech (cross-check)",
    }],
  },
  correctingMistakenIdeasOfficial: {
    zhTitle: "《关于纠正党内的错误思想》",
    enTitle: "On Correcting Mistaken Ideas in the Party",
    zhUrl: "https://www.12371.cn/special/mzdxj/dyj/",
    enUrl: "https://www.marxists.org/reference/archive/mao/selected-works/volume-1/mswv1_5.htm",
    zhLinkLabel: "共产党员网：《毛泽东选集》第一卷《关于纠正党内的错误思想》在线文本",
    zhEnglishLabel: "CPC Member Network: On Correcting Mistaken Ideas in the Party in Selected Works of Mao Zedong, vol. 1",
    zhEditionNote: "共产党员网《毛泽东选集》第一卷在线文本；按各卡所列《关于纠正党内的错误思想》开篇或分节位置逐字核对",
    enEditionNote: "Chinese wording checked against the CPC Member Network text of Selected Works of Mao Zedong, vol. 1; English excerpts are checked against the linked Selected Works translation, while any retained project rendering remains a study translation",
  },
  opposeStereotypedPartyWritingOfficial: {
    zhTitle: "《反对党八股》",
    enTitle: "Oppose Stereotyped Party Writing",
    zhUrl: "https://www.dswxyjy.org.cn/n1/2019/0228/c423725-30940758.html",
    zhLinkLabel: "中共中央党史和文献研究院：《反对党八股》相关逐字引文",
    zhEnglishLabel: "Institute of Party History and Literature: verified quotation from Oppose Stereotyped Party Writing",
    zhEditionNote: "中共中央党史和文献研究院页面逐字引述；按《反对党八股》第三条罪状“无的放矢，不看对象”核对",
    enEditionNote: "Chinese wording checked against the quotation published by the Institute of Party History and Literature; the English card is a close project study translation",
    extraLinks: [{
      href: "https://www.12371.cn/special/mzdxj/d3j/",
      label: "共产党员网：《毛泽东选集》第三卷目录（含《反对党八股》）",
      englishLabel: "CPC Member Network: Selected Works of Mao Zedong, vol. 3, listing Oppose Stereotyped Party Writing",
    }],
  },
  strengthenPartyCommitteeSystemOfficial: {
    zhTitle: "《关于健全党委制》",
    enTitle: "On Strengthening the Party Committee System",
    zhUrl: "https://www.12371.cn/2021/09/17/ARTI1631861926140238.shtml",
    enUrl: "https://www.marxists.org/reference/archive/mao/selected-works/volume-4/mswv4_41.htm",
    zhLinkLabel: "共产党员网“党史百年·天天读”：1948年9月20日《关于健全党委制》引文",
    zhEnglishLabel: "CPC Member Network, Party History Daily: quotation from On Strengthening the Party Committee System, 20 September 1948",
    zhEditionNote: "共产党员网“党史百年·天天读”所载《关于健全党委制》引文；按各卡所列重大问题讨论段或末句逐字核对",
    enEditionNote: "Chinese wording checked against the attributed quotation on the CPC Member Network; English wording checked against the Foreign Languages Press Selected Works, vol. IV (1961), pp. 267–268 where aligned, while any divergent rendering remains a project study translation",
    extraLinks: [{
      href: "https://www.12371.cn/special/mzdxj/d4j/",
      label: "共产党员网：《毛泽东选集》第四卷目录（含《关于健全党委制》）",
      englishLabel: "CPC Member Network: Selected Works of Mao Zedong, vol. 4, listing On Strengthening the Party Committee System",
    }],
  },
  tenMajorRelationshipsOfficial: {
    zhTitle: "《论十大关系》",
    enTitle: "On the Ten Major Relationships",
    zhUrl: "https://fuwu.12371.cn/2013/08/14/ARTI1376449049161135_all.shtml",
    enUrl: "https://www.marxists.org/reference/archive/mao/selected-works/volume-5/mswv5_51.htm",
    zhLinkLabel: "共产党员网：《论十大关系》中文全文",
    zhEnglishLabel: "CPC Member Network: complete Chinese text of On the Ten Major Relationships",
    zhEditionNote: "共产党员网《论十大关系》中文全文；按各卡所列第一节、第五节或结尾总结段逐字核对",
    enEditionNote: "Chinese wording checked against the complete text on the CPC Member Network; English wording checked against Foreign Languages Press Selected Works, vol. V (1977), pp. 285–286 and 306 where aligned, while any divergent rendering remains a project study translation",
  },
  correctHandlingContradictionsOfficial: {
    zhTitle: "《关于正确处理人民内部矛盾的问题》",
    enTitle: "On the Correct Handling of Contradictions Among the People",
    zhUrl: "https://fuwu.12371.cn/2013/08/19/ARTI1376892293655966.shtml",
    enUrl: "https://www.marxists.org/reference/archive/mao/selected-works/volume-5/mswv5_58.htm",
    zhLinkLabel: "共产党员网：《关于正确处理人民内部矛盾的问题》第一部分中文全文",
    zhEnglishLabel: "CPC Member Network: On the Correct Handling of Contradictions Among the People, part I, complete Chinese text",
    zhEditionNote: "共产党员网《关于正确处理人民内部矛盾的问题》第一部分“两类不同性质的矛盾”中文全文；按区分性质与方法段逐字核对",
    enEditionNote: "Chinese wording checked against part I on the CPC Member Network; English wording checked against the Foreign Languages Press Selected Works, vol. V (1977), p. 389 where aligned, while any divergent rendering remains a project study translation",
  },
  correctIdeas: {
    zhTitle: "《人的正确思想是从哪里来的？》",
    enTitle: "Where Do Correct Ideas Come From?",
    zhUrl: "https://www.marxists.org/chinese/pdf/chinese_marxists/mao/20201007f.pdf",
    enUrl: "https://www.marxists.org/reference/archive/mao/selected-works/volume-9/mswv9_01.htm",
    extraLinks: [{
      href: "https://fuwu.12371.cn/2014/04/11/ARTI1397202456123625.shtml",
      label: "共产党员网：社会实践三项原句引文",
      englishLabel: "CPC Member Network: attributed quotation on the three forms of social practice",
    }],
  },
} as const satisfies Readonly<Record<string, MaoSourceWork>>;

/** Exact Chinese excerpts replacing earlier editorial study-card wording. */
export const maoSourceUpgrades = [
  {
    id: "mao-practice",
    source: "practice",
    text: "通过实践而发现真理，又通过实践而证实真理和发展真理。",
    english: "Discover the truth through practice, and again through practice verify and develop the truth.",
    sourceLocator: [
      "《实践论》结尾段，连续首句",
      "On Practice, concluding paragraph, continuous opening sentence",
    ],
    emphasis: {
      zh: ["通过实践而发现真理", "证实真理和发展真理"],
      en: ["Discover the truth through practice", "verify and develop the truth"],
    },
  },
  {
    id: "mao-sensory-to-rational",
    source: "practice",
    text: "要完全地反映整个的事物，反映事物的本质，反映事物的内部规律性，就必须经过思考作用，将丰富的感觉材料加以去粗取精、去伪存真、由此及彼、由表及里的改造制作工夫，造成概念和理论的系统。",
    english: "Fully to reflect a thing in its totality, to reflect its essence, to reflect its inherent laws, it is necessary through the exercise of thought to reconstruct the rich data of sense perception, discarding the dross and selecting the essential, eliminating the false and retaining the true, proceeding from the one to the other and from the outside to the inside, in order to form a system of concepts and theories.",
    sourceLocator: [
      "《实践论》感性认识跃进到理性认识段，连续首句",
      "On Practice, paragraph on the leap from perceptual to rational knowledge, continuous opening sentence",
    ],
    emphasis: {
      zh: ["丰富的感觉材料", "造成概念和理论的系统"],
      en: ["rich data of sense perception", "form a system of concepts and theories"],
    },
  },
  {
    id: "mao-knowledge-spiral",
    source: "practice",
    text: "实践、认识、再实践、再认识，这种形式，循环往复以至无穷，而实践和认识之每一循环的内容，都比较地进到了高一级的程度。",
    english: "Practice, knowledge, again practice, and again knowledge. This form repeats itself in endless cycles, and with each cycle the content of practice and knowledge rises to a higher level.",
    sourceLocator: [
      "《实践论》结尾段，连续第二至三句",
      "On Practice, concluding paragraph, continuous second and third sentences",
    ],
    emphasis: {
      zh: ["实践、认识、再实践、再认识", "进到了高一级的程度"],
      en: ["Practice, knowledge, again practice, and again knowledge", "rises to a higher level"],
    },
  },
  {
    id: "mao-theory-enters-action",
    source: "practice",
    text: "马克思主义的哲学认为十分重要的问题，不在于懂得了客观世界的规律性，因而能够解释世界，而在于拿了这种对于客观规律性的认识去能动地改造世界。",
    english: "Marxist philosophy holds that the most important problem does not lie in understanding the laws of the objective world and thus being able to explain it, but in applying the knowledge of these laws actively to change the world.",
    sourceLocator: [
      "《实践论》理性认识回到实践段，连续首句",
      "On Practice, paragraph on rational knowledge returning to practice, continuous opening sentence",
    ],
    emphasis: {
      zh: ["解释世界", "能动地改造世界"],
      en: ["being able to explain it", "actively to change the world"],
    },
  },
  {
    id: "mao-contradiction",
    source: "contradiction",
    text: "研究任何过程，如果是存在着两个以上矛盾的复杂过程的话，就要用全力找出它的主要矛盾。…矛盾着的两方面中，必有一方面是主要的，他方面是次要的。",
    english: "In studying any complex process in which there are two or more contradictions, we must devote every effort to finding its principal contradiction. … Of the two contradictory aspects, one must be principal and the other secondary.",
    sourceLocator: [
      "《矛盾论》第四节“主要的矛盾和主要的矛盾方面”，省略号标示相邻两段间删节",
      "On Contradiction, §4, ‘The Principal Contradiction and the Principal Aspect of a Contradiction’; ellipsis marks an omission between two adjacent paragraphs",
    ],
    emphasis: {
      zh: ["找出它的主要矛盾", "必有一方面是主要的"],
      en: ["finding its principal contradiction", "one must be principal"],
    },
  },
  {
    id: "mao-concrete-analysis",
    source: "contradiction",
    text: "马克思主义的最本质的东西，马克思主义的活的灵魂，就在于具体地分析具体的情况。",
    english: "The most essential thing in Marxism, the living soul of Marxism, is the concrete analysis of concrete conditions.",
    sourceLocator: [
      "《矛盾论》第三节，引用列宁“具体地分析具体的情况”段",
      "On Contradiction, §3, paragraph citing Lenin on the concrete analysis of concrete conditions",
    ],
    emphasis: {
      zh: ["马克思主义的活的灵魂", "具体地分析具体的情况"],
      en: ["living soul of Marxism", "concrete analysis of concrete conditions"],
    },
  },
  {
    id: "mao-contradiction-universal",
    source: "contradiction",
    text: "矛盾的普遍性或绝对性这个问题有两方面的意义。其一是说，矛盾存在于一切事物的发展过程中；其二是说，每一事物的发展过程中存在着自始至终的矛盾运动。",
    english: "The universality or absoluteness of contradiction has a twofold meaning. One is that contradiction exists in the process of development of all things, and the other is that in the process of development of each thing a movement of opposites exists from beginning to end.",
    sourceLocator: [
      "《矛盾论》第二节“矛盾的普遍性”，定义段连续全文",
      "On Contradiction, §2, ‘The Universality of Contradiction,’ continuous definition paragraph",
    ],
    emphasis: {
      zh: ["一切事物的发展过程中", "自始至终的矛盾运动"],
      en: ["development of all things", "from beginning to end"],
    },
  },
  {
    id: "mao-contradiction-particular",
    source: "contradiction",
    text: "用不同的方法去解决不同的矛盾，这是马克思列宁主义者必须严格地遵守的一个原则。",
    english: "The principle of using different methods to resolve different contradictions is one which Marxist-Leninists must strictly observe.",
    sourceLocator: [
      "《矛盾论》第三节“矛盾的特殊性”，不同质矛盾段结句",
      "On Contradiction, §3, ‘The Particularity of Contradiction,’ concluding sentence of the paragraph on qualitatively different contradictions",
    ],
    emphasis: {
      zh: ["不同的方法", "不同的矛盾"],
      en: ["different methods", "different contradictions"],
    },
  },
  {
    id: "mao-principal-aspect-shifts",
    source: "contradiction",
    text: "矛盾的主要和非主要的方面互相转化着，事物的性质也就随着起变化。",
    english: "The principal and the non-principal aspects of a contradiction transform themselves into each other and the nature of the thing changes accordingly.",
    sourceLocator: [
      "《矛盾论》第四节，矛盾主要方面转化段首句",
      "On Contradiction, §4, opening sentence of the paragraph on the transformation of the principal aspect",
    ],
    emphasis: {
      zh: ["互相转化着", "性质也就随着起变化"],
      en: ["transform themselves into each other", "changes accordingly"],
    },
  },
  {
    id: "mao-internal-external-causes",
    source: "contradiction",
    text: "唯物辩证法认为外因是变化的条件，内因是变化的根据，外因通过内因而起作用。",
    english: "According to materialist dialectics, external causes are the condition of change and internal causes are the basis of change, and external causes become operative through internal causes.",
    sourceLocator: [
      "《矛盾论》第一节“两种宇宙观”，内因与外因段连续句",
      "On Contradiction, §1, ‘The Two World Outlooks,’ continuous sentence on internal and external causes",
    ],
    emphasis: {
      zh: ["外因是变化的条件", "内因是变化的根据"],
      en: ["external causes are the condition of change", "internal causes are the basis of change"],
    },
  },
  {
    id: "mao-oppose-one-sidedness",
    source: "contradiction",
    text: "所谓片面性，就是不知道全面地看问题。…或者叫做只看见局部，不看见全体，只看见树木，不看见森林。",
    english: "To be one-sided means not to look at problems all-sidedly. … Or it may be called seeing the part but not the whole, seeing the trees but not the forest.",
    sourceLocator: [
      "《矛盾论》第三节，反对片面性段；省略号标示中间举例删节",
      "On Contradiction, §3, paragraph against one-sidedness; ellipsis marks omitted examples",
    ],
    emphasis: {
      zh: ["全面地看问题", "只看见树木，不看见森林"],
      en: ["look at problems all-sidedly", "seeing the trees but not the forest"],
    },
  },
  {
    id: "mao-spark",
    source: "spark",
    text: "现在虽只有一点小小的力量，但是它的发展会是很快的。它在中国的环境里不仅是具备了发展的可能性，简直是具备了发展的必然性。",
    english: "Although the subjective forces of the revolution in China are now weak, they will grow rapidly. In the Chinese environment, their growth is not only possible but indeed inevitable.",
    sourceLocator: [
      "《星星之火，可以燎原》第二部分第（二）段，连续两句",
      "A Single Spark Can Start a Prairie Fire, Part II, point (2), two continuous sentences",
    ],
    emphasis: {
      zh: ["一点小小的力量", "具备了发展的必然性"],
      en: ["now weak", "indeed inevitable"],
    },
  },
  {
    id: "mao-people-life",
    source: "peoplesLife",
    text: "一切群众的实际生活问题，都是我们应当注意的问题。",
    english: "All the practical problems in the masses' everyday life should claim our attention.",
    sourceLocator: [
      "《关心群众生活，注意工作方法》第一问题，列举群众实际生活问题段结句",
      "Be Concerned with the Well-Being of the Masses, first question, concluding sentence of the paragraph listing practical everyday problems",
    ],
    emphasis: {
      zh: ["实际生活问题", "应当注意的问题"],
      en: ["practical problems", "should claim our attention"],
    },
  },
  {
    id: "mao-early-large-goals-concrete-life",
    source: "peoplesLife",
    text: "应该深刻地注意群众生活的问题，从土地、劳动问题，到柴米油盐问题。",
    english: "We should pay close attention to the problems of the well-being of the masses, from the problems of land and labour to those of fuel, rice, cooking oil and salt.",
    sourceLocator: [
      "《关心群众生活，注意工作方法》第一问题，提出群众生活议程段首句",
      "Be Concerned with the Well-Being of the Masses, first question, opening sentence of the paragraph placing everyday life on the agenda",
    ],
    emphasis: {
      zh: ["注意群众生活的问题", "柴米油盐问题"],
      en: ["well-being of the masses", "fuel, rice, cooking oil and salt"],
    },
  },
  {
    id: "mao-early-task-needs-method",
    source: "peoplesLife",
    text: "我们不但要提出任务，而且要解决完成任务的方法问题。我们的任务是过河，但是没有桥或没有船就不能过。",
    english: "We must not only set tasks, we must also solve the problem of the methods for carrying them out. Our task is to cross the river, but we cannot cross it without a bridge or a boat.",
    sourceLocator: [
      "《关心群众生活，注意工作方法》第二问题，过河与桥船比喻段连续两句",
      "Be Concerned with the Well-Being of the Masses, second question, two continuous sentences in the bridge-and-boat analogy",
    ],
    emphasis: {
      zh: ["解决完成任务的方法问题", "没有桥或没有船就不能过"],
      en: ["methods for carrying them out", "without a bridge or a boat"],
    },
  },
  {
    id: "mao-art",
    source: "talksAtYenan",
    text: "为什么人的问题，是一个根本的问题，原则的问题。",
    english: "The question of whom to serve is a fundamental one; it is a question of principle.",
    sourceLocator: [
      "《在延安文艺座谈会上的讲话》结论第四部分，“为什么人的问题”段首句",
      "Talks at the Yenan Forum on Literature and Art, Conclusion, Part IV, opening sentence of the passage on whom to serve",
    ],
    emphasis: {
      zh: ["为什么人的问题", "根本的问题"],
      en: ["whom to serve", "fundamental one"],
    },
  },
  {
    id: "mao-art-from-social-life",
    source: "talksAtYenan",
    text: "人民生活中本来存在着文学艺术原料的矿藏，这是自然形态的东西，是粗糙的东西，但也是最生动、最丰富、最基本的东西。",
    english: "In the life of the people there is a mine of raw material for literature and art, material in its natural form, crude but most vital, rich and fundamental.",
    sourceLocator: [
      "《在延安文艺座谈会上的讲话》结论第二部分，人民生活是文艺原料矿藏段连续句",
      "Talks at the Yenan Forum on Literature and Art, Conclusion, Part II, continuous sentence describing people's life as a mine of artistic raw material",
    ],
    emphasis: {
      zh: ["文学艺术原料的矿藏", "最生动、最丰富、最基本"],
      en: ["mine of raw material", "most vital, rich and fundamental"],
    },
  },
  {
    id: "mao-art-refines-life",
    source: "talksAtYenan",
    text: "一切种类的文学艺术的源泉究竟是从何而来的呢？作为观念形态的文艺作品，都是一定的社会生活在人类头脑中的反映的产物。",
    english: "What, then, is the source of all literature and art? Works of literature and art, as ideological forms, are products of the reflection in the human brain of the life of a given society.",
    sourceLocator: [
      "《在延安文艺座谈会上的讲话》结论第二部分，文艺源泉段连续问答",
      "Talks at the Yenan Forum on Literature and Art, Conclusion, Part II, continuous question and answer on the source of literature and art",
    ],
    emphasis: {
      zh: ["文学艺术的源泉", "一定的社会生活"],
      en: ["source of all literature and art", "life of a given society"],
    },
  },
  {
    id: "mao-service",
    source: "servePeople",
    text: "我们这个队伍完全是为着解放人民的，是彻底地为人民的利益工作的。",
    english: "This army of ours is wholly dedicated to the liberation of the people and works entirely in the people's interests.",
    sourceLocator: [
      "《为人民服务》第二段首句",
      "Serve the People, opening sentence of the second paragraph",
    ],
    emphasis: {
      zh: ["解放人民", "为人民的利益工作"],
      en: ["liberation of the people", "in the people's interests"],
    },
  },
  {
    id: "mao-bethune",
    source: "bethune",
    text: "我们大家要学习他毫无自私自利之心的精神。…对工作的极端的负责任，对同志对人民的极端的热忱。",
    english: "We must all learn the spirit of absolute selflessness from him. … His utter devotion to others was shown in his boundless sense of responsibility in his work and his boundless warm-heartedness towards all comrades and the people.",
    sourceLocator: [
      "《纪念白求恩》第二段；省略号标示同段中间删节",
      "In Memory of Norman Bethune, second paragraph; ellipsis marks an omission within the same paragraph",
    ],
    emphasis: {
      zh: ["毫无自私自利之心", "极端的负责任"],
      en: ["absolute selflessness", "boundless sense of responsibility"],
    },
  },
  {
    id: "mao-yugong",
    source: "yugong",
    text: "中国古代有个寓言，叫做“愚公移山”。…他有两个儿子，两个儿子又有孙子，子子孙孙是没有穷尽的。",
    english: "There is an ancient Chinese fable called ‘The Foolish Old Man Who Removed the Mountains.’ … He had two sons, and his sons had children; his descendants would go on endlessly.",
    sourceLocator: [
      "《愚公移山》末段寓言；省略号标示人物与挖山情节删节",
      "The Foolish Old Man Who Removed the Mountains, concluding fable; ellipsis marks omitted character and digging details",
    ],
    emphasis: {
      zh: ["愚公移山", "子子孙孙是没有穷尽的"],
      en: ["Foolish Old Man Who Removed the Mountains", "descendants would go on endlessly"],
    },
  },
  {
    id: "mao-committee",
    source: "committeeMethods",
    text: "弹钢琴要十个指头都动作，不能有的动，有的不动。…要产生好的音乐，十个指头的动作要有节奏，要互相配合。",
    english: "In playing the piano all ten fingers are in motion; it will not do to move some fingers only and not others. … To produce good music, the ten fingers should move rhythmically and in coordination.",
    sourceLocator: [
      "《党委会的工作方法》第五条“学会弹钢琴”；省略号标示相邻句删节",
      "Methods of Work of Party Committees, point 5, ‘Learn to play the piano’; ellipsis marks one omitted intervening sentence",
    ],
    emphasis: {
      zh: ["十个指头都动作", "有节奏，要互相配合"],
      en: ["all ten fingers are in motion", "rhythmically and in coordination"],
    },
  },
  {
    id: "mao-committee-share-information",
    source: "committeeMethods",
    text: "党委各委员之间要把彼此知道的情况互相通知、互相交流。",
    english: "Members of a Party committee should keep each other informed and exchange views on matters that have come to their attention.",
    sourceLocator: [
      "《党委会的工作方法》第三条“互通情报”首句",
      "Methods of Work of Party Committees, point 3, opening sentence of ‘Exchange information’",
    ],
    emphasis: {
      zh: ["互相通知", "互相交流"],
      en: ["keep each other informed", "exchange views"],
    },
  },
  {
    id: "mao-late-committee-problems-on-table",
    source: "committeeMethods",
    text: "有了问题就开会，摆到桌面上来讨论，规定它几条，问题就解决了。",
    english: "When problems arise, call a meeting, place the problems on the table for discussion, take decisions, and the problems will be solved.",
    sourceLocator: [
      "《党委会的工作方法》第二条“把问题摆到桌面上来”首句",
      "Methods of Work of Party Committees, point 2, opening sentence of ‘Place problems on the table’",
    ],
    emphasis: {
      zh: ["摆到桌面上来讨论", "问题就解决了"],
      en: ["place the problems on the table", "problems will be solved"],
    },
  },
  {
    id: "mao-late-committee-inquiry-and-dissent",
    source: "committeeMethods",
    text: "我们切不可强不知以为知，要“不耻下问”，要善于倾听下面干部的意见。",
    english: "We must never pretend to know what we do not know, we must not feel ashamed to ask and learn from people below and we must listen carefully to the views of the cadres at the lower levels.",
    sourceLocator: [
      "《党委会的工作方法》第四条“不懂得和不了解的东西要问下级”连续句",
      "Methods of Work of Party Committees, point 4, continuous sentence on asking subordinates about what one does not know",
    ],
    emphasis: {
      zh: ["强不知以为知", "善于倾听下面干部的意见"],
      en: ["pretend to know what we do not know", "listen carefully"],
    },
  },
  {
    id: "mao-seek-truth-from-facts",
    source: "reformStudy",
    text: "“实事”就是客观存在着的一切事物，“是”就是客观事物的内部联系，即规律性，“求”就是我们去研究。",
    english: "‘Facts’ are all the things that exist objectively, ‘truth’ means their internal relations, that is, the laws governing them, and ‘to seek’ means to study.",
    sourceLocator: [
      "《改造我们的学习》第三部分，解释“实事求是”连续句",
      "Reform Our Study, Part III, continuous sentence defining ‘seek truth from facts’",
    ],
    emphasis: {
      zh: ["客观存在着的一切事物", "客观事物的内部联系"],
      en: ["exist objectively", "their internal relations"],
    },
  },
  {
    id: "mao-middle-reform-study-theory-and-object",
    source: "reformStudy",
    text: "要有目的地去研究马克思列宁主义的理论，要使马克思列宁主义的理论和中国革命的实际运动结合起来。",
    english: "We should study the theory of Marxism-Leninism with a purpose and should integrate it with the actual movement of the Chinese revolution.",
    sourceLocator: [
      "《改造我们的学习》第三部分，“理论和实际统一”段连续句",
      "Reform Our Study, Part III, continuous sentence in the passage on integrating theory with practice",
    ],
    emphasis: {
      zh: ["有目的地去研究", "和中国革命的实际运动结合起来"],
      en: ["with a purpose", "integrate it with the actual movement"],
    },
  },
  {
    id: "mao-general-and-individual-guidance",
    source: "leadershipMethods",
    text: "任何工作任务，如果没有一般的普遍的号召，就不能动员广大群众行动起来。…如果只限于一般号召…就有使一般号召归于落空的危险。",
    english: "In any task, if no general and widespread call is issued, the broad masses cannot be mobilized for action. … If we confine ourselves to a general call … there is the danger that the general call will come to nothing.",
    sourceLocator: [
      "《关于领导方法的若干问题》第二条；省略号标示同段个别指导方法的中间删节",
      "Some Questions Concerning Methods of Leadership, point 2; ellipses mark omitted detail on the method of particular guidance within the same paragraph",
    ],
    emphasis: {
      zh: ["一般的普遍的号召", "一般号召归于落空"],
      en: ["general and widespread call", "general call will come to nothing"],
    },
  },
  {
    id: "mao-early-field-reverses-hearsay",
    source: "hunanPeasantInvestigationOfficial",
    text: "许多农民运动的道理，和在汉口、长沙从绅士阶级那里听得的道理，完全相反。",
    english: "Many points about the peasant movement were completely contrary to what I had heard from the gentry in Hankou and Changsha.",
    sourceLocator: [
      "《湖南农民运动考察报告》“农民问题的严重性”首段，在三十二天调查说明之后；完整句，全文照录",
      "Report on an Investigation of the Peasant Movement in Hunan, opening paragraph of ‘The Importance of the Peasant Problem,’ after the account of the thirty-two-day investigation; complete sentence, quoted in full",
    ],
    emphasis: {
      zh: ["农民运动的道理", "完全相反"],
      en: ["points about the peasant movement", "completely contrary"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-early-criticism-needs-evidence",
    source: "correctingMistakenIdeasOfficial",
    text: "党内批评要防止主观武断和把批评庸俗化，说话要有证据，批评要注意政治。",
    english: "Inner-Party criticism must guard against subjective arbitrariness and against vulgarizing criticism; statements must be backed by evidence, and criticism must attend to politics.",
    sourceLocator: [
      "《关于纠正党内的错误思想》“关于主观主义”，纠正方法第（三）项；完整句，全文照录",
      "On Correcting Mistaken Ideas in the Party, ‘On Subjectivism,’ corrective method (3); complete sentence, quoted in full",
    ],
    emphasis: {
      zh: ["说话要有证据", "批评要注意政治"],
      en: ["statements must be backed by evidence", "criticism must attend to politics"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-middle-party-writing-audience-and-language",
    source: "opposeStereotypedPartyWritingOfficial",
    text: "射箭要看靶子，弹琴要看听众，写文章做演说倒可以不看读者不看听众吗？",
    english: "An archer must look at the target and a musician at the audience; can writers and speakers alone ignore their readers and listeners?",
    sourceLocator: [
      "《反对党八股》第三条罪状“无的放矢，不看对象”，“为什么不看对象乱弹一顿呢？”后一句；完整句，全文照录",
      "Oppose Stereotyped Party Writing, third indictment, ‘shooting without a target and disregarding the audience,’ the sentence after ‘Why play at random without considering the audience?’; complete sentence, quoted in full",
    ],
    emphasis: {
      zh: ["射箭要看靶子，弹琴要看听众", "不看读者不看听众吗"],
      en: ["look at the target and a musician at the audience", "ignore their readers and listeners"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-late-committee-collective-decision",
    source: "strengthenPartyCommitteeSystemOfficial",
    text: "由到会委员充分发表意见，做出明确决定，然后分别执行。",
    english: "The committee members present should fully express their views, make a clear decision, and then carry it out in their respective roles.",
    sourceLocator: [
      "《关于健全党委制》（1948）开篇重大问题讨论句的句末连续分句；摘录从该分句开始，分句全文照录且未拼接",
      "On Strengthening the Party Committee System (1948), continuous closing clause of the opening sentence on discussing major questions; the excerpt starts at this clause, which is quoted in full and not spliced",
    ],
    emphasis: {
      zh: ["充分发表意见", "做出明确决定"],
      en: ["fully express their views", "make a clear decision"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-late-ten-relations-central-local",
    source: "tenMajorRelationshipsOfficial",
    text: "中央要巩固，就要注意地方的利益。",
    english: "If the central authorities are to be consolidated, attention must be paid to local interests.",
    sourceLocator: [
      "《论十大关系》第五节“中央和地方的关系”第二段结句；完整句，全文照录",
      "On the Ten Major Relationships, section V, ‘The Relationship Between the Central and Local Authorities,’ closing sentence of the second paragraph; complete sentence, quoted in full",
    ],
    emphasis: {
      zh: ["中央要巩固", "注意地方的利益"],
      en: ["central authorities are to be consolidated", "attention must be paid to local interests"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-late-contradictions-method-follows-nature",
    source: "correctHandlingContradictionsOfficial",
    text: "敌我之间和人民内部这两类矛盾的性质不同，解决的方法也不同。",
    english: "The contradictions between ourselves and the enemy and those among the people differ in nature, and so do the methods for resolving them.",
    sourceLocator: [
      "《关于正确处理人民内部矛盾的问题》第一部分“两类不同性质的矛盾”，区分两类矛盾及其方法段首句；完整句，全文照录",
      "On the Correct Handling of Contradictions Among the People, part I, ‘Two Different Types of Contradictions,’ opening sentence of the paragraph distinguishing the two types and their methods; complete sentence, quoted in full",
    ],
    emphasis: {
      zh: ["矛盾的性质不同", "解决的方法也不同"],
      en: ["differ in nature", "so do the methods for resolving them"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-late-propaganda-analytical-criticism",
    source: "propagandaWorkConferenceOfficial",
    text: "但是，这种批判，应该是充分说理的、有分析的、有说服力的，而不应该是粗暴的、官僚主义的，或者是形而上学的、教条主义的。",
    english: "However, the criticism should be fully reasoned, analytical and convincing, and neither rough and bureaucratic, nor metaphysical and dogmatic.",
    sourceLocator: [
      "《在中国共产党全国宣传工作会议上的讲话》（1957）第七点，论思想批评方法段的结句；完整句，全文照录；《毛泽东文集》第七卷（人民出版社1999年版）第279—280页",
      "Speech at the Chinese Communist Party's National Conference on Propaganda Work (1957), point 7, closing sentence of the paragraph on ideological criticism; Foreign Languages Press Selected Works, vol. V (1977), p. 434; complete sentence, quoted in full",
    ],
    context: "第七点讨论“放”还是“收”的方针，说明错误思想与“毒草”仍须批判；本句限定这种批判应怎样进行，下一段转入教条主义与修正主义的区分。",
    englishContext: "Point 7 discusses the policy choice between ‘opening wide’ and ‘restricting’ and says erroneous ideas and ‘poisonous weeds’ still require criticism. This sentence specifies how that criticism should proceed before the speech turns to dogmatism and revisionism.",
    distinction: "“充分说理”支持给出理由，但本句没有提出一套现代经验研究的证据标准；它也不能为粗暴贴标签开脱。其直接语境是1957年的意识形态斗争，旧卡所说“有证据”属于编辑性延伸。",
    englishDistinction: "Being ‘fully reasoned’ supports giving reasons, but the sentence does not supply a modern evidentiary standard, nor excuse crude labeling. Its immediate setting is the ideological struggle of 1957; the old card's reference to evidence is an editorial extension.",
    emphasis: {
      zh: ["充分说理的、有分析的、有说服力的", "不应该是粗暴的、官僚主义的"],
      en: ["fully reasoned, analytical and convincing", "neither rough and bureaucratic"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-late-committee-deliberation-design",
    source: "strengthenPartyCommitteeSystemOfficial",
    text: "此外，还须注意，集体领导和个人负责，二者不可偏废。",
    english: "Furthermore, we must take care that neither collective leadership nor personal responsibility is overemphasized to the neglect of the other.",
    sourceLocator: [
      "《关于健全党委制》（1948）主体段末句，在常委会与全体会不可混同之后、战时临机处置例外之前；完整句，全文照录",
      "On Strengthening the Party Committee System (1948), final sentence of the main paragraph, after distinguishing standing-committee and plenary meetings and before the emergency-command exception; Foreign Languages Press Selected Works, vol. IV (1961), p. 268; complete sentence, quoted in full",
    ],
    context: "文件要求重大问题交委员会讨论，并对复杂、有分歧的问题先作个别商谈，避免会议流于形式或不能决定。本句在段末把集体领导与个人负责并列，随后保留作战或情势所需的临机处置。",
    englishContext: "The decision requires important questions to go before the committee and calls for prior individual consultation on complex or disputed matters so meetings do not become formalities or fail to decide. This sentence pairs collective leadership with personal responsibility, followed by an emergency-command exception.",
    distinction: "它既不授权个人绕过集体决定，也不要求把细小或已决定、只待执行的问题重新开会；“个人负责”强调执行责任，且原文另列战时或紧急情形的边界。",
    englishDistinction: "It neither authorizes an individual to bypass collective decisions nor requires meetings on trivial matters or decisions awaiting execution. ‘Personal responsibility’ concerns accountable execution, and the text separately marks wartime or emergency limits.",
    emphasis: {
      zh: ["集体领导和个人负责", "二者不可偏废"],
      en: ["neither collective leadership nor personal responsibility", "to the neglect of the other"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-early-united-front-with-leadership",
    source: "tacticsAgainstJapaneseImperialismOfficial",
    text: "只要共产党和红军本身是存在的，发展的，那末，抗日民族统一战线必然也会是存在的，发展的。",
    english: "The national united front will live and grow as long as the Communist Party and the Red Army live and grow.",
    sourceLocator: [
      "《论反对日本帝国主义的策略》（1935）“人民共和国”节，关于统一战线各部分巩固程度的段落，在“坏人退出／好人加入”的说明之后；完整句，全文照录",
      "On Tactics Against Japanese Imperialism (1935), ‘The People's Republic,’ paragraph on the varying firmness of participants in the united front, after the sentence contrasting departures with new entrants; Foreign Languages Press Selected Works, vol. I (1965), p. 167; complete sentence, quoted in full",
    ],
    context: "这一段回顾1927年统一战线缺少坚强中心力量的教训，继而说广泛队伍中的成员不会同样巩固，可能有人退出、也有人加入；本句由此说明共产党和红军被赋予的“台柱子”作用。",
    englishContext: "The passage recalls the 1927 defeat as a lesson about a united front lacking a strong core, then says members of a broad front will not be equally firm: some may leave and others join. The sentence states the resulting mainstay role assigned to the Communist Party and Red Army.",
    distinction: "这是1935年抗日民族统一战线中的历史—战略判断，不是一条证明任何组织都应永久支配联盟的通则，也不表示同盟者天然不可靠。旧卡关于评估动摇性和保持独立能力的说法是整段研读摘要。",
    englishDistinction: "This is a historical-strategic claim about the anti-Japanese national united front in 1935, not a general proof that one organization should permanently dominate every alliance or that allies are inherently unreliable. The old card's claims about vacillation and independent capacity summarize the wider passage.",
    emphasis: {
      zh: ["共产党和红军本身是存在的，发展的", "抗日民族统一战线必然也会是存在的，发展的"],
      en: ["national united front will live and grow", "Communist Party and the Red Army live and grow"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-late-contradictions-ideology-persuasion",
    source: "correctHandlingContradictionsOfficial",
    text: "凡属于思想性质的问题，凡属于人民内部的争论问题，只能用民主的方法去解决，只能用讨论的方法、批评的方法、说服教育的方法去解决，而不能用强制的、压服的方法去解决。",
    english: "The only way to settle questions of an ideological nature or controversial issues among the people is by the democratic method, the method of discussion, criticism, persuasion and education, and not by the method of coercion or repression.",
    sourceLocator: [
      "《关于正确处理人民内部矛盾的问题》（1957）第一部分“两类不同性质的矛盾”，论思想问题与人民内部争论的段落中部；完整句，全文照录；《毛泽东文集》第七卷（人民出版社1999年版）第209页",
      "On the Correct Handling of Contradictions Among the People (1957), part I, ‘Two Types of Contradictions Differing in Nature,’ sentence on ideological and controversial questions among the people; Foreign Languages Press Selected Works, vol. V (1977), p. 389; complete sentence, quoted in full",
    ],
    context: "本句位于人民内部实行民主方法的论证中，前文反对以行政命令或强制解决思想与是非问题；后文同时说明，为维持生产、学习和公共秩序，适当的强制性行政规章仍不可缺少。",
    englishContext: "The sentence appears in the argument for democratic methods among the people. The preceding lines reject administrative orders or coercion for ideological questions, while the following lines say appropriate obligatory regulations remain necessary for production, study, and public order.",
    distinction: "它限定的是“思想性质”及“人民内部”的争论，不把所有冲突都化为认识分歧，也不取消法律、秩序规则或对伤害的制止；讨论与批评更不能被强迫服从冒名替代。",
    englishDistinction: "It is limited to ideological questions and disputes ‘among the people’; it neither reduces every conflict to misunderstanding nor abolishes law, order, or restraints on harm. Discussion and criticism cannot be replaced by coerced conformity under those names.",
    emphasis: {
      zh: ["讨论的方法、批评的方法", "说服教育的方法"],
      en: ["discussion, criticism", "persuasion and education"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-late-ten-relations-industry-balance",
    source: "tenMajorRelationshipsOfficial",
    text: "后一种办法会使重工业发展得多些和快些，而且由于保障了人民生活的需要，会使它发展的基础更加稳固。",
    english: "The second approach will lead to a greater and faster development of heavy industry and, since it ensures the livelihood of the people, it will lay a more solid foundation for the development of heavy industry.",
    sourceLocator: [
      "《论十大关系》（1956）第一节“重工业和轻工业、农业的关系”末段末句；完整句，全文照录",
      "On the Ten Major Relationships (1956), section I, ‘The Relationship Between Heavy Industry on the One Hand and Light Industry and Agriculture on the Other,’ closing sentence; Foreign Languages Press Selected Works, vol. V (1977), p. 286; complete sentence, quoted in full",
    ],
    context: "前句把发展重工业的办法分成两种：少发展或多发展农业、轻工业。“后一种”专指增加农业、轻工业发展，以改善生活供给、加快积累，并为重工业提供更稳固基础。",
    englishContext: "The preceding sentence defines two approaches to heavy-industry development: developing agriculture and light industry less or developing them more. ‘The second approach’ specifically means the latter, which supports livelihoods, accumulation, and a firmer base for heavy industry.",
    distinction: "这不是说任何支撑部门的投入都必然加快任何重点，也不是取消重工业的优先地位；它是1956年具体投资比例与供给约束下的判断，迁用时仍要核对因果机制和当下数据。",
    englishDistinction: "This does not say that spending on any supporting sector must accelerate any priority, nor does it remove heavy industry's stated priority. It is a 1956 judgment under specific investment ratios and supply constraints; transfer requires checking the mechanism and current evidence.",
    emphasis: {
      zh: ["重工业发展得多些和快些", "发展的基础更加稳固"],
      en: ["greater and faster development of heavy industry", "more solid foundation"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-early-standpoint-shapes-judgment",
    source: "hunanPeasantInvestigationOfficial",
    text: "对于一件事或一种人，有相反的两种看法，便出来相反的两种议论。",
    english: "Where there are two opposite approaches to things and people, two opposite views emerge.",
    sourceLocator: [
      "《湖南农民运动考察报告》（1927）“革命先锋”节首段首句；完整句，全文照录",
      "Report on an Investigation of the Peasant Movement in Hunan (1927), ‘Vanguards of the Revolution,’ opening sentence; Foreign Languages Press Selected Works, vol. I (1965), p. 30; complete sentence, quoted in full",
    ],
    context: "本句紧接“‘糟得很’和‘好得很’”及“所谓‘痞子运动’”两节，下一句以“糟得很／好得很”“痞子／革命先锋”为例；后文再按富农、中农、贫农的不同处境分析其不同观感。",
    englishContext: "The sentence follows the sections on ‘It's Terrible!’ and the alleged ‘Movement of the Riffraff.’ The next sentence gives the opposed labels ‘It's terrible/It's fine’ and ‘riffraff/vanguards,’ after which the report relates different views to the circumstances of rich, middle, and poor peasants.",
    distinction: "指出看法与位置相关，不等于事实可以还原为立场或各种议论同样可靠；文章本身明确作出事实与价值判断。旧卡关于“利益”的表述由前一节对“地主利益”的分析支持，属于跨段编辑摘要。",
    englishDistinction: "Relating views to position does not reduce facts to standpoint or make all judgments equally reliable; the report itself makes definite factual and evaluative claims. The old card's reference to interests draws on the preceding analysis of landlord interests and is therefore a cross-paragraph editorial summary.",
    emphasis: {
      zh: ["相反的两种看法", "相反的两种议论"],
      en: ["two opposite approaches", "two opposite views"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-correct-ideas-origin",
    source: "correctIdeas",
    text: "人的正确思想，只能从社会实践中来，只能从社会的生产斗争、阶级斗争和科学实验这三项实践中来。",
    english: "They come from social practice, and from it alone; they come from three kinds of social practice, the struggle for production, the class struggle and scientific experiment.",
    sourceLocator: [
      "《人的正确思想是从哪里来的？》（1963）开篇问答之后第三句；完整句，全文照录",
      "Where Do Correct Ideas Come From? (1963), third sentence after the opening questions; complete sentence, quoted in full",
    ],
    emphasis: {
      zh: ["只能从社会实践中来", "生产斗争、阶级斗争和科学实验"],
      en: ["from social practice, and from it alone", "the struggle for production, the class struggle and scientific experiment"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-investigation-questions",
    source: "opposeBookWorship",
    text: "那种只随便问一下子，不提出中心问题在会议席上经过辩论的方法，是不能抽出近于正确的结论的。",
    english: "You cannot possibly draw more or less correct conclusions at such meetings if you put questions casually instead of raising key-questions for discussion.",
    sourceLocator: [
      "《反对本本主义》第七节“调查的技术”第（1）项末句；完整句，全文照录",
      "Oppose Book Worship, section VII, ‘The Technique of Investigation,’ point 1, closing sentence; complete sentence, quoted in full",
    ],
    emphasis: {
      zh: ["只随便问一下子", "提出中心问题在会议席上经过辩论"],
      en: ["put questions casually", "raising key-questions for discussion"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-modesty",
    source: "secondPlenum",
    text: "务必使同志们继续地保持谦虚、谨慎、不骄、不躁的作风。",
    english: "The comrades must be taught to remain modest, prudent and free from arrogance and rashness in their style of work.",
    sourceLocator: [
      "《在中国共产党第七届中央委员会第二次全体会议上的报告》第十部分，“革命以后的路程更长”之后第一句；完整句，全文照录",
      "Report to the Second Plenary Session of the Seventh Central Committee, part X, first sentence after ‘the road after the revolution will be longer’; complete sentence, quoted in full",
    ],
    emphasis: {
      zh: ["谦虚、谨慎", "不骄、不躁"],
      en: ["remain modest, prudent", "free from arrogance and rashness"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-self-criticism-learning",
    source: "coalitionGovernment",
    text: "我们同志的思想，我们党的工作，也会沾染灰尘的，也应该打扫和洗涤。",
    english: "Our comrades' minds and our Party's work may also collect dust, and also need sweeping and washing.",
    sourceLocator: [
      "《论联合政府》第五部分“党的领导”自我批评段第三句；完整句，全文照录",
      "On Coalition Government, part V, ‘The Leadership of the Communist Party,’ third sentence of the self-criticism paragraph; complete sentence, quoted in full",
    ],
    emphasis: {
      zh: ["也会沾染灰尘的", "也应该打扫和洗涤"],
      en: ["may also collect dust", "need sweeping and washing"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-paper-tiger-analysis",
    source: "strongTalk",
    text: "从长远的观点看问题，真正强大的力量不是属于反动派，而是属于人民。",
    english: "From a long-term point of view, it is not the reactionaries but the people who are really powerful.",
    sourceLocator: [
      "《和美国记者安娜·路易斯·斯特朗的谈话》回答原子弹问题段，“一切反动派都是纸老虎”之后第三句；完整句，全文照录",
      "Talk with the American Correspondent Anna Louise Strong, answer on the atom bomb, third sentence after ‘All reactionaries are paper tigers’; complete sentence, quoted in full",
    ],
    emphasis: {
      zh: ["从长远的观点看问题", "真正强大的力量不是属于反动派，而是属于人民"],
      en: ["From a long-term point of view", "not the reactionaries but the people who are really powerful"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-combat-liberalism-principle",
    source: "combatLiberalism",
    text: "我们主张积极的思想斗争，因为它是达到党内和革命团体内的团结使之利于战斗的武器。",
    english: "We stand for active ideological struggle because it is the weapon for ensuring unity within the Party and the revolutionary organizations in the interest of our fight.",
    sourceLocator: [
      "《反对自由主义》开篇首句；完整句，全文照录",
      "Combat Liberalism, opening sentence; complete sentence, quoted in full",
    ],
    emphasis: {
      zh: ["积极的思想斗争", "达到党内和革命团体内的团结"],
      en: ["active ideological struggle", "ensuring unity within the Party and the revolutionary organizations"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-middle-new-democracy-national-scientific-popular",
    source: "newDemocracy",
    text: "民族的科学的大众的文化，就是人民大众反帝反封建的文化，就是新民主主义的文化，就是中华民族的新文化。",
    english: "A national, scientific and mass culture--such is the anti-imperialist and anti-feudal culture of the people, the culture of New Democracy, the new culture of the Chinese nation.",
    sourceLocator: [
      "《新民主主义论》第十五节“民族的科学的大众的文化”结尾总结句；完整句，全文照录",
      "On New Democracy, section XV, ‘A National, Scientific and Mass Culture,’ concluding summation; complete sentence, quoted in full",
    ],
    emphasis: {
      zh: ["民族的科学的大众的文化", "中华民族的新文化"],
      en: ["A national, scientific and mass culture", "the new culture of the Chinese nation"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-hundred-flowers",
    source: "correctContradictions",
    text: "艺术上不同的形式和风格可以自由发展，科学上不同的学派可以自由争论。",
    english: "Different forms and styles in art should develop freely and different schools in science should contend freely.",
    sourceLocator: [
      "《关于正确处理人民内部矛盾的问题》第八部分首段，说明百花齐放、百家争鸣方针之后第一句；完整句，全文照录",
      "On the Correct Handling of Contradictions Among the People, part VIII, opening paragraph, first sentence after the explanation of the hundred-flowers policy; complete sentence, quoted in full",
    ],
    emphasis: {
      zh: ["不同的形式和风格", "不同的学派"],
      en: ["Different forms and styles in art", "different schools in science"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-middle-party-writing-content-before-length",
    source: "opposeStereotypedPartyWritingFullText",
    text: "战争时期固然需要短文章，但尤其需要有内容的文章。",
    english: "True, we need short articles in war time, but above all we need articles that have substance.",
    sourceLocator: [
      "《反对党八股》第一条罪状“空话连篇，言之无物”，区分篇幅与内容段；完整句，全文照录",
      "Oppose Stereotyped Party Writing, first indictment, ‘endless empty verbiage,’ paragraph distinguishing length from substance; complete sentence, quoted in full",
    ],
    emphasis: {
      zh: ["需要短文章", "尤其需要有内容的文章"],
      en: ["need short articles in war time", "above all we need articles that have substance"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-middle-rectification-three-styles",
    source: "rectifyPartyStyle",
    text: "反对主观主义以整顿学风，反对宗派主义以整顿党风，反对党八股以整顿文风，这就是我们的任务。",
    english: "Fight subjectivism in order to rectify the style of study, fight sectarianism in order to rectify the style in Party relations, and fight Party stereotypes in order to rectify the style of writing--such is the task before us.",
    sourceLocator: [
      "《整顿党的作风》开篇，列举主观主义、宗派主义和党八股之后的任务句；完整句，全文照录",
      "Rectify the Party's Style of Work, opening passage, task sentence after the discussion of subjectivism, sectarianism and Party stereotypes; complete sentence, quoted in full",
    ],
    emphasis: {
      zh: ["反对主观主义以整顿学风，反对宗派主义以整顿党风，反对党八股以整顿文风"],
      en: ["Fight subjectivism in order to rectify the style of study, fight sectarianism in order to rectify the style in Party relations, and fight Party stereotypes in order to rectify the style of writing"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-early-alliance-analysis",
    source: "analysisClasses",
    text: "我们要分辨真正的敌友，不可不将中国社会各阶级的经济地位及其对于革命的态度，作一个大概的分析。",
    english: "To distinguish real friends from real enemies, we must make a general analysis of the economic status of the various classes in Chinese society and of their respective attitudes towards the revolution.",
    sourceLocator: [
      "《中国社会各阶级的分析》开篇第一段结句；完整句，全文照录",
      "Analysis of the Classes in Chinese Society, closing sentence of the opening paragraph; complete sentence, quoted in full",
    ],
    emphasis: {
      zh: ["分辨真正的敌友", "经济地位及其对于革命的态度"],
      en: ["distinguish real friends from real enemies", "economic status of the various classes in Chinese society and of their respective attitudes towards the revolution"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-investigate-changing-conditions",
    source: "opposeBookWorship",
    text: "因此，我们需要时时了解社会情况，时时进行实际调查。",
    english: "Therefore, we must at all times study social conditions and make practical investigations.",
    sourceLocator: [
      "《反对本本主义》第六节，说明斗争策略产生于实际经验之后一句；完整句，全文照录",
      "Oppose Book Worship, section VI, sentence following the statement that tactics emerge through actual experience; complete sentence, quoted in full",
    ],
    emphasis: {
      zh: ["时时了解社会情况", "时时进行实际调查"],
      en: ["at all times study social conditions", "make practical investigations"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-middle-new-democracy-culture-feedback",
    source: "newDemocracy",
    text: "一定的文化（当作观念形态的文化）是一定社会的政治和经济的反映，又给予伟大影响和作用于一定社会的政治和经济；而经济是基础，政治则是经济的集中的表现。",
    english: "Any given culture (as an ideological form) is a reflection of the politics and economics of a given society, and the former in turn has a tremendous influence and effect upon the latter; economics is the base and politics the concentrated expression of economics.",
    sourceLocator: [
      "《新民主主义论》第三节“中国的历史特点”，提出文化、政治与经济关系基本观点的首句；完整句，全文照录（原卡第十一节定位据原文校正）",
      "On New Democracy, section III, ‘China's Historical Characteristics,’ opening sentence of the statement on the relation among culture, politics and economics; complete sentence, quoted in full (correcting the old card's section XI locator)",
    ],
    context: "本句位于第三节“中国的历史特点”。这一段把文化放进新政治、新经济与观念形态之间的关系中，先说文化有所反映，又说文化会反过来发生影响；后文才继续讨论中国革命文化的历史任务。",
    englishContext: "The sentence appears in section III, ‘China's Historical Characteristics.’ The paragraph places culture in a relation among new politics, new economics, and ideological forms: culture reflects those conditions and also acts back upon them, before the essay turns to the historical task of China's revolutionary culture.",
    distinction: "“反映”不等于文化只是被动镜像，“影响”也不等于观念可以脱离政治经济条件自行决定历史。原句提出的是有基础、有反馈的关系，不是一条单向文化决定论。",
    englishDistinction: "‘Reflection’ does not make culture a passive mirror, while ‘influence’ does not make ideas an independent cause detached from political and economic conditions. The sentence describes a grounded relation with feedback, not one-way cultural determinism.",
    emphasis: {
      zh: ["一定社会的政治和经济的反映", "又给予伟大影响和作用"],
      en: ["a reflection of the politics and economics", "a tremendous influence and effect"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-middle-rectification-researched-theory",
    source: "rectifyPartyStyle",
    text: "真正的理论在世界上只有一种，就是从客观实际抽出来又在客观实际中得到了证明的理论，才称得起我们所讲的理论。",
    english: "There is only one kind of true theory in this world, theory that is drawn from objective reality and then verified by objective reality; nothing else is worthy of the name of theory in our sense.",
    sourceLocator: [
      "《整顿党的作风》论理论研究段，在说明理论工作须经过调查、概括和实践检验之后；完整句，全文照录",
      "Rectify the Party's Style of Work, passage on theoretical research, after the account of investigation, generalization and verification in practical struggle; complete sentence, quoted in full",
    ],
    context: "这句话承接对脱离中国实际研究理论的批评：材料要经过调查，经验要经过概括，形成的判断还要回到实践中检验。它是在这一链条末端界定什么才配称为“真正的理论”。",
    englishContext: "The sentence follows a criticism of studying theory apart from China's actual conditions: materials require investigation, experience requires generalization, and the resulting judgment must return to practice for testing. It defines ‘true theory’ at the end of that sequence.",
    distinction: "它既不是反对理论，也不是把未经整理的经验当成真理；“从实际抽出”要求概括，“在实际中证明”要求可受检验。实践检验也不表示一次成功便永久正确。",
    englishDistinction: "It rejects neither theory nor treats unprocessed experience as truth. Being ‘drawn from reality’ requires abstraction, and being ‘verified by reality’ requires testing; one successful application does not make a theory permanently correct.",
    emphasis: {
      zh: ["从客观实际抽出来", "在客观实际中得到了证明"],
      en: ["drawn from objective reality", "verified by objective reality"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-unity-criticism-unity",
    source: "correctContradictions",
    text: "讲详细一点，就是从团结的愿望出发，经过批评或者斗争使矛盾得到解决，从而在新的基础上达到新的团结。",
    english: "To elaborate, that means starting from the desire for unity, resolving contradictions through criticism or struggle, and arriving at a new unity on a new basis.",
    sourceLocator: [
      "《关于正确处理人民内部矛盾的问题》第一部分，提出“团结——批评——团结”公式之后的解释句；完整句，全文照录",
      "On the Correct Handling of Contradictions Among the People, part I, explanatory sentence following the formula ‘unity -- criticism -- unity’; complete sentence, quoted in full",
    ],
    context: "本句在第一部分解释处理人民内部矛盾的“团结——批评——团结”公式。它的起点、过程和终点被写在同一句中，并以“人民内部”这一矛盾类型为适用背景。",
    englishContext: "In part I, the sentence explains the formula ‘unity—criticism—unity’ for handling contradictions among the people. It states the starting point, process, and end within one sentence, under that specific category of contradiction.",
    distinction: "这不是把所有冲突都化约为同一种程序，也不是以“批评”为名强迫服从。原句把团结愿望和新的团结都列为条件；脱离矛盾类型、权力关系与具体事实，公式会失去边界。",
    englishDistinction: "This is not one procedure for every conflict, nor a warrant for coerced conformity in the name of criticism. The sentence makes both a desire for unity and a new basis for unity conditions of the process; conflict type, power relations, and facts still matter.",
    emphasis: {
      zh: ["从团结的愿望出发", "在新的基础上达到新的团结"],
      en: ["starting from the desire for unity", "arriving at a new unity on a new basis"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-early-correct-by-cause",
    source: "correctingMistakenIdeasOfficial",
    text: "大会根据中央九月来信的精神，指出四军党内各种非无产阶级思想的表现、来源及其纠正的方法，号召同志们起来彻底地加以肃清。",
    english: "In accordance with the spirit of the September letter of the Central Committee, this congress hereby points out the manifestations of various non-proletarian ideas in the Party organization in the Fourth Army, their sources, and the methods of correcting them, and calls upon all comrades to eliminate them thoroughly.",
    sourceLocator: [
      "《关于纠正党内的错误思想》开篇总论末句，列出错误思想的表现、来源与纠正方法；完整句，全文照录",
      "On Correcting Mistaken Ideas in the Party, final sentence of the opening overview, listing manifestations, sources and methods of correction; complete sentence, quoted in full",
    ],
    context: "这句位于《关于纠正党内的错误思想》开篇，总括后文的组织方式：逐项辨认表现，追查其来源，再提出纠正方法。后续各节才把这一框架应用到当时红四军党组织中的具体问题。",
    englishContext: "The sentence closes the opening overview of On Correcting Mistaken Ideas in the Party. It previews the document's structure—identify manifestations, trace their sources, then propose methods of correction—before later sections apply that framework to the Fourth Red Army's party organization.",
    distinction: "它是特定历史组织中的整顿纲要，不是给一般个人贴思想标签的心理诊断。寻找来源不等于免除责任，提出纠正方法也必须以证据和具体机制为基础。",
    englishDistinction: "This is a rectification program for a particular historical organization, not a psychological diagnosis for labeling people in general. Tracing sources does not erase responsibility, and methods of correction still require evidence and a concrete mechanism.",
    emphasis: {
      zh: ["非无产阶级思想的表现、来源", "其纠正的方法"],
      en: ["manifestations of various non-proletarian ideas", "their sources, and the methods of correcting them"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-early-means-serve-purpose",
    source: "correctingMistakenIdeasOfficial",
    text: "认为军事政治二者是对立的，不承认军事只是完成政治任务的工具之一。",
    english: "These comrades regard military affairs and politics as opposed to each other and refuse to recognize that military affairs are only one means of accomplishing political tasks.",
    sourceLocator: [
      "《关于纠正党内的错误思想》“关于单纯军事观点”表现第（一）项首句；完整句（不含项目序号），全文照录",
      "On Correcting Mistaken Ideas in the Party, ‘On the Purely Military Viewpoint,’ manifestation (1), opening sentence; complete sentence, quoted in full without the list number",
    ],
    context: "本句出自“关于单纯军事观点”第一项，批评把军事工作与政治任务割裂。它讨论的是当时革命组织内部手段、组织目标与领导关系的配置，后文继续列出这种观点的其他表现和来源。",
    englishContext: "The sentence opens the first item under ‘On the Purely Military Viewpoint,’ criticizing the separation of military work from political tasks. It concerns the relation among means, organizational ends, and leadership in a particular revolutionary organization; later items list further manifestations and sources.",
    distinction: "“军事是工具之一”不等于军事判断没有专业自主性，也不是一条适用于任何国家和冲突的现成原则。它更不能单凭一句话证明某个具体政治目的正当。",
    englishDistinction: "Calling military affairs ‘one means’ does not erase professional judgment, nor supply a ready-made rule for every state or conflict. The sentence by itself cannot establish that any particular political end is justified.",
    emphasis: {
      zh: ["军事政治二者是对立的", "军事只是完成政治任务的工具之一"],
      en: ["military affairs and politics as opposed to each other", "military affairs are only one means of accomplishing political tasks"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-masses-real-heroes",
    source: "ruralSurveys",
    text: "必须明白：群众是真正的英雄，而我们自己则往往是幼稚可笑的，不了解这一点，就不能得到起码的知识。",
    english: "It has to be understood that the masses are the real heroes, while we ourselves are often childish and ignorant, and without this understanding it is impossible to acquire even the most rudimentary knowledge.",
    sourceLocator: [
      "《〈农村调查〉的序言和跋》序言，调查会方法段末句；《毛泽东选集》第三卷（人民出版社1991年版）第790页；完整句，全文照录",
      "Preface and Postscript to Rural Surveys, preface, final sentence of the paragraph on fact-finding meetings; Selected Works, vol. III, corresponding paragraph; complete sentence, quoted in full",
    ],
    context: "这句话在《〈农村调查〉的序言》谈调查会方法的段落末尾。前文要求向熟悉情况的人请教、让不同意见进入调查，并把领导者的知识位置重新放回群众经验之中。",
    englishContext: "The sentence closes a paragraph in the Preface to Rural Surveys on the method of fact-finding meetings. The preceding discussion calls for learning from people familiar with the situation, bringing differing views into inquiry, and relocating the leader's knowledge within the experience of the masses.",
    distinction: "“群众是真正的英雄”不是说多数意见天然无误，也不是把群众想成一个没有差异的单一主体。原句强调调查者的谦逊与知识来源；事实仍需比较、辨别和验证。",
    englishDistinction: "‘The masses are the real heroes’ does not make majority opinion infallible or turn diverse people into one undifferentiated subject. The point concerns the inquirer's humility and sources of knowledge; claims still require comparison, discrimination, and verification.",
    emphasis: {
      zh: ["群众是真正的英雄", "不了解这一点，就不能得到起码的知识"],
      en: ["the masses are the real heroes", "without this understanding it is impossible to acquire even the most rudimentary knowledge"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-protracted-war",
    source: "protractedWar",
    text: "战争是力量的竞赛，但力量在战争过程中变化其原来的形态。",
    english: "War is a contest of strength, but the original pattern of strength changes in the course of war.",
    sourceLocator: [
      "《论持久战》第七十七段首句，紧接强弱优劣形势转化的论述并位于“主动性，灵活性，计划性”小标题之前；完整句，完整照录",
      "On Protracted War, paragraph 77, opening sentence following the discussion of changes in the balance of forces and immediately before ‘Initiative, Flexibility and Planning’; complete sentence, quoted in full",
    ],
    context: "第七十六段说明许多战役和战斗的胜利如何逐渐改变总的敌我形势；本句把这一分析压缩为力量形态会在战争过程中变化。紧随其后的两句才进一步谈主观努力、客观可能性与正确方针的关系。",
    englishContext: "Paragraph 76 explains how accumulated victories in campaigns and battles may gradually alter the general balance between the two sides. This sentence condenses that analysis into the claim that the pattern of strength changes during war; the next two sentences then relate subjective effort, objective possibility, and correct policy.",
    distinction: "本句不保证弱者必然变强，也没有说意志可以取消物质条件。旧卡关于“时间、条件与人的行动”的合并表述概括了前后数句，保留为编辑摘要；署名引句只承载力量关系具有过程性这一较窄命题。",
    englishDistinction: "The sentence does not guarantee that the weaker side will become stronger or claim that will can cancel material conditions. The old card's combination of time, conditions, and human action summarizes several surrounding sentences and remains an editorial summary; the attributed excerpt supports only the narrower claim that relations of strength unfold as a process.",
    emphasis: {
      zh: ["力量的竞赛", "在战争过程中变化"],
      en: ["contest of strength", "changes in the course of war"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-learn-war",
    source: "revolutionaryWarStrategy",
    text: "读书是学习，使用也是学习，而且是更重要的学习。从战争学习战争——这是我们的主要方法。",
    english: "Reading is learning, but applying is also learning and the more important kind of learning at that. Our chief method is to learn warfare through warfare.",
    sourceLocator: [
      "《中国革命战争的战略问题》第一章第四节“重要的问题在善于学习”，承接检验既有战争经验段的连续两句；完整连续两句，完整照录",
      "Problems of Strategy in China's Revolutionary War, Chapter I, §4, ‘The Important Thing Is to Be Good at Learning,’ two continuous sentences following the paragraph on testing inherited war experience; Foreign Languages Press Selected Works, vol. I (1965), pp. 189–190; complete continuous sentences across the printed-page break, quoted in full",
    ],
    context: "前一段先肯定过去战争总结成的规律和理论应当认真学习，又要求用自己的经验检验、取舍并补充它们。本引句随后把读书与使用都列为学习，并把在战争实践中学习战争说成主要方法；后文继续说明“干起来再学习”。",
    englishContext: "The preceding paragraph first affirms the serious study of laws and theories distilled from past wars, then requires testing, selecting, and supplementing them through one's own experience. These sentences count both reading and application as learning and identify learning warfare through warfare as the chief method; the following lines expand this as learning while doing.",
    distinction: "这里的“使用”特指把战争知识用于战争实践，不是贬低读书，也不是一条可无条件移用到所有专业的通则。旧卡关于理论指导行动、行动修正理论的说法是前后段落的编辑概括，不是本引句逐字表达的双向公式。",
    englishDistinction: "Here ‘applying’ specifically means putting knowledge of war into military practice. It neither disparages reading nor states an unconditional rule for every profession. The old card's account of theory guiding action and action revising theory is an editorial synthesis of the surrounding passage, not a verbatim two-way formula in this excerpt.",
    emphasis: {
      zh: ["使用也是学习", "从战争学习战争"],
      en: ["applying is also learning", "learn warfare through warfare"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-independence",
    source: "coalitionGovernmentForeignCultureOfficial",
    text: "对于外国文化，排外主义的方针是错误的，应当尽量吸收进步的外国文化，以为发展中国新文化的借镜；盲目搬用的方针也是错误的，应当以中国人民的实际需要为基础，批判地吸收外国文化。",
    english: "As for foreign culture, it would be a wrong policy to shut it out, rather we should as far as possible draw on what is progressive in it for use in the development of China's new culture; it would also be wrong to copy it blindly, rather we should draw on it critically to meet the actual needs of the Chinese people.",
    sourceLocator: [
      "《论联合政府》第四部分“中国共产党的政策”之“具体纲领”第八项“文化、教育、知识分子问题”，外国文化段首句；《毛泽东选集》第三卷（人民出版社1991年版）第1083页；完整句，完整照录（校正旧卡“第五部分”定位）",
      "On Coalition Government, part IV, ‘The Policy of the Chinese Communist Party,’ Specific Programme, point 8, ‘The Problem of Culture, Education and the Intellectuals,’ opening sentence on foreign culture; complete sentence, quoted in full (correcting the old card's part V locator)",
    ],
    context: "本句属于文化、教育和知识分子的具体纲领。前一句要求建立民族的、科学的、人民大众的新文化和新教育；本句同时反对排斥外国文化与盲目照搬，并以中国人民的实际需要限定批判吸收。",
    englishContext: "The sentence belongs to the specific programme on culture, education, and intellectuals. The preceding sentence calls for a new national, scientific, and mass culture and education; this sentence rejects both shutting out foreign culture and copying it blindly, making the actual needs of the Chinese people the criterion for critical appropriation.",
    distinction: "原句讨论的是外国文化的吸收方法，并没有提出一条涵盖政治、经济和组织能力的普遍“自力更生”命题。旧卡“把立足点放在自己的力量上”的前半句因此保留为编辑摘要；可直接归于原文的是不排外、不盲从并按实际需要批判吸收。",
    englishDistinction: "The sentence concerns how to appropriate foreign culture; it does not state a general doctrine of self-reliance covering politics, economics, and organizational capacity. The first half of the old card—basing effort on one's own strength—therefore remains an editorial summary. What the source directly warrants is neither exclusion nor blind copying, but critical use according to actual needs.",
    emphasis: {
      zh: ["尽量吸收进步的外国文化", "以中国人民的实际需要为基础，批判地吸收"],
      en: ["draw on what is progressive", "draw on it critically to meet the actual needs"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-learn-before-teach",
    source: "ruralSurveysStudentOfficial",
    text: "和全党同志共同一起向群众学习，继续当一个小学生，这就是我的志愿。",
    english: "It is my wish to go on being a pupil, learning from the masses, together with all other Party comrades.",
    sourceLocator: [
      "《〈农村调查〉的序言和跋》序言（1941年3月17日）末句；《毛泽东选集》第三卷（人民出版社1991年版）第791页；完整句，完整照录",
      "Preface and Postscript to Rural Surveys, preface dated 17 March 1941, final sentence; complete sentence, quoted in full",
    ],
    context: "序言结尾先说明自己仍感到有必要周密研究中国和世界事务，并承认所知有限；本句以继续向群众学习、继续当小学生作结。它把学习者姿态放在调查研究的自我定位中。",
    englishContext: "At the close of the preface, Mao first says that thorough study of Chinese and world affairs remains necessary and acknowledges the limits of his own knowledge. This final sentence ends with the wish to keep learning from the masses and to remain a pupil, locating that learner's stance within inquiry.",
    distinction: "本句只明说“向群众学习”和“继续当一个小学生”，没有出现“先做学生、再做先生”的次序，也没有授予领导者天然的教师资格。旧卡关于成为群众先生的说法是编辑性延伸，保留为摘要而不再伪装成原句。",
    englishDistinction: "The sentence explicitly says only to learn from the masses and go on being a pupil. It does not state a sequence of first becoming a pupil and then a teacher, nor grant leaders an inherent qualification to teach. The old card's teacher claim is an editorial extension and remains a summary rather than being presented as Mao's wording.",
    emphasis: {
      zh: ["向群众学习", "继续当一个小学生"],
      en: ["learning from the masses", "go on being a pupil"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-initiative-flexibility-planning",
    source: "protractedWar",
    text: "但是这个方针实行起来，离不了主动性、灵活性和计划性。",
    english: "But it cannot be put into effect without initiative, flexibility and planning.",
    sourceLocator: [
      "《论持久战》第七十八段末句，“主动性，灵活性，计划性”小标题下首段；完整句，完整照录",
      "On Protracted War, paragraph 78, final sentence of the opening paragraph under ‘Initiative, Flexibility and Planning’; complete sentence, quoted in full",
    ],
    context: "本句中的“这个方针”专指前文所说战役和战斗上的“外线的速决的进攻战”，亦即文中所称运动战方针。随后第七十九至八十九段分别分析主动性、灵活性和计划性。",
    englishContext: "In this sentence, ‘it’ refers specifically to the preceding principle of quick-decision offensive warfare on exterior lines in campaigns and battles, also described there as mobile warfare. Paragraphs 79–89 then analyse initiative, flexibility, and planning in turn.",
    distinction: "这不是把三个词并列成适用于一切行动的抽象管理口号。它们在本节有军事上的特定含义：主动性涉及行动自由，灵活性涉及兵力运用，计划性则在战争的不确实性中成立；旧卡的通用“行动能力”是编辑抽象。",
    englishDistinction: "This is not an abstract management slogan for every kind of action. In the section the terms have specific military meanings: initiative concerns freedom of action, flexibility the employment of forces, and planning operates amid wartime uncertainty. The old card's generic ‘agency’ is an editorial abstraction.",
    emphasis: {
      zh: ["离不了主动性、灵活性和计划性"],
      en: ["without initiative, flexibility and planning"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-war-as-whole-process",
    source: "revolutionaryWarStrategy",
    text: "说战略胜利取决于战术胜利的这种意见是错误的，因为这种意见没有看见战争的胜败的主要和首先的问题，是对于全局和各阶段的关照得好或关照得不好。",
    english: "The view that strategic victory is determined by tactical successes alone is wrong because it overlooks the fact that victory or defeat in a war is first and foremost a question of whether the situation as a whole and its various stages are properly taken into account.",
    sourceLocator: [
      "《中国革命战争的战略问题》第一章第三节“战略问题是研究战争全局的规律的东西”，全局与局部关系段第三句；完整句，完整照录",
      "Problems of Strategy in China's Revolutionary War, Chapter I, §3, ‘Strategy Is the Study of the Laws of a War Situation as a Whole,’ third sentence of the paragraph on whole and part; Foreign Languages Press Selected Works, vol. I (1965), pp. 183–184; complete sentence across the printed-page break, quoted in full",
    ],
    context: "本节先区分研究战争全局的战略学与研究局部情况的战役学、战术学，再说明局部隶属于全局。本句反对把战略胜利还原为战术胜利，下一句以“一着不慎，满盘皆输”说明只有对全局有决定意义的行动才属于这一层次。",
    englishContext: "The section first distinguishes strategy, which studies the war situation as a whole, from campaign and tactical studies of partial situations, then says that the part is subordinate to the whole. This sentence rejects reducing strategic victory to tactical successes; the next uses the chess maxim about one careless move to identify moves decisive for the whole.",
    distinction: "原文并不说每一次局部得失都不重要；同节随后明确指出，一个或两个有决定意义的战役可以立即改变全局。旧卡“不能让一次局部得失替代整体方向”是便于迁移的编辑摘要，使用时仍须判断该局部是否具有决定性。",
    englishDistinction: "The text does not say that every local gain or loss is unimportant; the same section explicitly says that one or two decisive campaigns can immediately alter the whole situation. The old card's warning against letting one local result replace the larger direction is a portable editorial summary, but it still requires judging whether that part is decisive.",
    emphasis: {
      zh: ["战略胜利取决于战术胜利的这种意见是错误的", "全局和各阶段"],
      en: ["strategic victory is determined by tactical successes alone is wrong", "the situation as a whole and its various stages"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-early-small-producer-differences",
    source: "analysisClasses",
    text: "这个阶级，在经济地位上虽属同一阶级，但有三个不同的部分。",
    english: "Although all strata of this class have the same petty-bourgeois economic status, they fall into three different sections.",
    sourceLocator: [
      "《中国社会各阶级的分析》“小资产阶级”段，说明同一经济地位分为三个部分的句子；完整句，全文照录；外文出版社《毛泽东选集》第一卷（1965）英译第15页",
      "Analysis of the Classes in Chinese Society, ‘The Petty Bourgeoisie,’ sentence dividing people of the same petty-bourgeois economic status into three sections; Foreign Languages Press Selected Works, vol. I (1965), p. 15; complete sentence, quoted in full",
    ],
    context: "本句先把自耕农、手工业主等归入当时所谓小资产阶级，再立刻说明同一经济地位内部仍有三个部分。后文依次描述有余裕、勉强自给和生活下降者，并比较其在革命形势中的不同态度。",
    englishContext: "The sentence first places owner-peasants, master handicraftsmen, and others within what the text calls the petty bourgeoisie, then immediately divides that shared economic status into three sections. The following passage describes those with a surplus, those mainly self-supporting, and those whose living standard is falling, comparing their different political attitudes.",
    distinction: "“三个部分”是该文针对20世纪20年代中国社会结构作出的历史分类，不是今日任何小生产者群体的固定类型。旧卡关于上升、维持或下降会形成不同政治倾向的说法综合了后续三段，保留为编辑摘要；本引句只直接支持同一宽泛类别内部仍有差异。",
    englishDistinction: "The ‘three sections’ are a historical classification within the Chinese social structure analysed in the 1920s, not fixed types for every group of small producers today. The old card's claim that rising, stable, or declining circumstances shape political tendencies synthesizes the next three descriptions and remains an editorial summary; this excerpt directly supports only internal difference within a broad category.",
    emphasis: {
      zh: ["经济地位上虽属同一阶级", "三个不同的部分"],
      en: ["same petty-bourgeois economic status", "three different sections"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-early-fractures-create-openings",
    source: "redPoliticalPowerOfficial",
    text: "因为有了白色政权间的长期的分裂和战争，便给了一种条件，使一小块或若干小块的共产党领导的红色区域，能够在四围白色政权包围的中间发生和坚持下来。",
    english: "The prolonged splits and wars within the White regime provide a condition for the emergence and persistence of one or more small Red areas under the leadership of the Communist Party amidst the encirclement of the White regime.",
    sourceLocator: [
      "《中国的红色政权为什么能够存在？》（1928）第二节“红色政权发生和存在的原因”第一项，解释白色政权分裂与战争作用的句子；完整句，全文照录；外文出版社《毛泽东选集》第一卷（1965）英译第65页",
      "Why Is It That Red Political Power Can Exist in China? (1928), §II, ‘Reasons for the Emergence and Survival of Red Political Power in China,’ first condition, sentence on splits and wars within the White regime; Foreign Languages Press Selected Works, vol. I (1965), p. 65; complete sentence, quoted in full",
    ],
    context: "第二节先说红色区域的长期存在只可能在若干条件下发生。第一项把军阀间持续战争追溯到地方农业经济和帝国主义划分势力范围；本句说明这种分裂怎样给被包围的小块区域提供存续条件，后文还继续列出群众斗争经历、全国形势、组织与政策等条件。",
    englishContext: "Section II begins by saying that the long survival of Red areas can occur only under certain conditions. Its first condition traces continuing warlord conflicts to a localized agricultural economy and imperialist spheres of influence; this sentence says how those splits create a condition for small encircled areas to persist. Later points add prior mass struggle, the national situation, organization, and policy.",
    distinction: "原句说的是特定半殖民地结构中的一个必要条件，不是弱者只要等待强者分裂就必然获胜。旧卡把“优势力量”“发展不平衡”和“局部空间”合成可迁移的战略摘要；引句本身只直接说明白色政权的分裂与战争为红色区域存续提供了条件。",
    englishDistinction: "The sentence identifies one condition within a particular semi-colonial structure; it does not promise that a weaker force will prevail merely by waiting for a stronger one to split. The old card combines dominant forces, uneven development, and local room into a portable strategic summary. The excerpt itself directly says only that divisions and wars within the White regime provided a condition for the Red areas' persistence.",
    emphasis: {
      zh: ["白色政权间的长期的分裂和战争", "发生和坚持下来"],
      en: ["prolonged splits and wars within the White regime", "emergence and persistence"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-early-rural-labor-boundary",
    source: "ruralClassesOfficial",
    text: "中农一般不要出卖劳动力，贫农一般要出卖小部分的劳动力，这是区别中农和贫农的主要标准。",
    english: "In general, a middle peasant does not need to sell his labour power, while the poor peasant has to sell part of his labour power. This is the principal criterion for distinguishing between a middle and poor peasant.",
    sourceLocator: [
      "《怎样分析农村阶级》（1933）第四节“贫农”，区分中农与贫农的结句；中文完整句，全文照录；外文出版社《毛泽东选集》第一卷（1965）英译第139页连续两句",
      "How to Differentiate the Classes in the Rural Areas (1933), §IV, ‘The Poor Peasant,’ closing Chinese sentence distinguishing middle from poor peasants; Foreign Languages Press Selected Works, vol. I (1965), p. 139; the complete Chinese sentence corresponds to two continuous English sentences, quoted in full",
    ],
    context: "第三节说中农的生活来源完全或主要依靠自己劳动，通常不出卖劳动力；第四节先说明贫农常须租地并受地租、债利和小部分雇佣劳动的剥削，再以本句提出两者之间的主要判准。第五节随后另述工人完全或主要靠出卖劳动力生活。",
    englishContext: "Section III says middle peasants derive their income wholly or mainly from their own labour and generally do not sell their labour power. Section IV first says poor peasants usually rent land and are subjected to rent, interest, and some hired-labour exploitation, then states this principal criterion between the two. Section V separately describes workers as living wholly or mainly by selling labour power.",
    distinction: "这是1933年土地改革工作中的历史分类标准，不应脱离当时土地与劳动关系套用为永久身份。旧卡同时提到“经常雇用他人劳动”，综合了第二至第五节的多个边界；本引句直接处理的只是中农与贫农之间是否须出卖部分劳动力这一条。",
    englishDistinction: "This is a historical criterion used in land-reform work in 1933, not a permanent identity to apply apart from the land and labour relations of that period. The old card also mentions regularly hiring others, synthesizing several boundaries across §§II–V. This excerpt directly treats only the sale of part of one's labour power as a distinction between middle and poor peasants.",
    emphasis: {
      zh: ["中农一般不要出卖劳动力", "区别中农和贫农的主要标准"],
      en: ["middle peasant does not need to sell his labour power", "principal criterion for distinguishing"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-early-mixed-economic-roles",
    source: "economicPolicyOfficial",
    text: "所以，尽可能地发展国营经济和大规模地发展合作社经济，应该是与奖励私人经济发展，同时并进的。",
    english: "Therefore, the greatest possible development of state enterprise and the extensive development of co-operative enterprise must go hand in hand with encouraging the development of private enterprise.",
    sourceLocator: [
      "《我们的经济政策》（1934）国营、合作社与私人经济段，合作社段末句；完整句，全文照录；外文出版社《毛泽东选集》第一卷（1965）英译第144页",
      "Our Economic Policy (1934), passage on state, co-operative, and private enterprise, closing sentence of the co-operative paragraph; Foreign Languages Press Selected Works, vol. I (1965), p. 144; complete sentence, quoted in full",
    ],
    context: "这一页先说当时经济由国营、合作社和私人事业三方面组成，继而说明国营事业限于可能且必要的部分，私人经营在不超出政府法律范围时予以提倡奖励，合作社与国营事业长期发展后将取得领导地位。本句以三者“同时并进”收束这组安排。",
    englishContext: "The page first says that the economy then comprised state, co-operative, and private enterprise. It limits state enterprise to what was possible and essential, promotes private activity within legal limits, and anticipates long-term leadership by co-operative and state enterprise. This sentence closes the arrangement by saying their development must proceed ‘hand in hand.’",
    distinction: "原文讨论战争、封锁和根据地条件下的阶段性经济政策，没有规定可脱离历史复制的部门比例，也不等于任何私人活动都应被鼓励。旧卡关于“领导作用”和“受规则约束”的完整表述综合了同页几个段落，保留为编辑摘要；本引句直接支持的是多种事业同时推进。",
    englishDistinction: "The text addresses a stage-specific economic policy under war, blockade, and base-area conditions. It sets no sectoral ratio for ahistorical copying and does not endorse every form of private activity. The old card's full claim about leadership and legal constraint synthesizes several paragraphs on the page and remains an editorial summary; this excerpt directly supports simultaneous development of the sectors.",
    emphasis: {
      zh: ["发展国营经济和大规模地发展合作社经济", "与奖励私人经济发展，同时并进"],
      en: ["development of state enterprise", "go hand in hand with encouraging the development of private enterprise"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-early-new-threat-new-alignment",
    source: "tacticsAgainstJapaneseImperialismOfficial",
    text: "革命和反革命的阵线可能变动，也同世界上一切事物的可能变动一样。",
    english: "The alignment of forces in the revolutionary and counter-revolutionary camps can change, just as everything else in the world changes.",
    sourceLocator: [
      "《论反对日本帝国主义的策略》（1935）广泛统一战线与关门主义两种策略的对比段，说明阵线可能变动的句子；完整句，全文照录；外文出版社《毛泽东选集》第一卷（1965）英译第165页",
      "On Tactics Against Japanese Imperialism (1935), paragraph contrasting a broad united front with closed-door tactics, sentence on changes in the alignment of forces; Foreign Languages Press Selected Works, vol. I (1965), p. 165; complete sentence, quoted in full",
    ],
    context: "前一页要求估计日本把中国变为殖民地的行动会怎样改变革命与反革命阵线，并据此判断广泛统一战线的可能性和必要性。本句反驳把民族资产阶级认作“全部永世反革命”的静止判断；紧接着把日本殖民化企图与革命力量仍弱列为新策略的两个出发点。",
    englishContext: "The preceding page calls for estimating how Japan's attempt to turn China into a colony may change the revolutionary and counter-revolutionary alignment, and thus the possibility and necessity of a broad united front. This sentence rejects the static view that the national bourgeoisie is eternally counter-revolutionary; the next sentence names Japanese colonization and the continued weakness of revolutionary forces as the two starting facts of the new tactic.",
    distinction: "“阵线可能变动”不表示威胁一变，昨天的对手就自动成为可靠盟友，也不取消对利益、能力和风险的具体调查。旧卡关于主要威胁、相互关系、联盟与政治任务的表述综合了本篇开头和这一段，属于编辑摘要；引句只直接确认阵线配置并非永恒不变。",
    englishDistinction: "That an alignment ‘can change’ does not make yesterday's opponent a reliable ally automatically when a threat changes, nor remove the need to investigate interests, capacities, and risks. The old card's account of principal threat, relations, alliances, and political tasks synthesizes the opening and this paragraph and remains an editorial summary; the excerpt directly confirms only that the alignment is not immutable.",
    emphasis: {
      zh: ["革命和反革命的阵线可能变动", "世界上一切事物的可能变动"],
      en: ["alignment of forces in the revolutionary and counter-revolutionary camps", "can change"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-early-build-mass-leaders",
    source: "winMassesOfficial",
    text: "我们党的组织要向全国发展，要自觉地造就成万数的干部，要有几百个最好的群众领袖。",
    english: "Our Party organizations must be extended all over the country and we must purposefully train tens of thousands of cadres and hundreds of first-rate leaders.",
    sourceLocator: [
      "《为争取千百万群众进入抗日民族统一战线而斗争》（1937）“干部问题”段，提出组织发展与培养干部、群众领袖的句子；完整句，全文照录；外文出版社《毛泽东选集》第一卷（1965）英译第291页",
      "Win the Masses in Their Millions for the Anti-Japanese National United Front (1937), ‘The Question of Cadres,’ sentence on extending Party organizations and training cadres and leaders; Foreign Languages Press Selected Works, vol. I (1965), p. 291; complete sentence, quoted in full",
    ],
    context: "“干部问题”先说，在四亿五千万人口中进行大规模革命，不能只依靠狭隘小团体，而已有干部仍不够。本句提出扩展组织与主动培养更多干部；后文随即列出政治远见、工作能力、独立解决问题和联系党员群众等要求。",
    englishContext: "‘The Question of Cadres’ first says that a large revolution in a country of 450 million cannot be led by a small, narrow group and that the existing cadres are still insufficient. This sentence calls for extending the organization and purposefully training many more cadres; the following lines immediately specify political foresight, competence, independent problem-solving, and links with members and the masses.",
    distinction: "这是1937年特定政党与革命任务中的组织主张，不是把规模扩张或干部数量当作普遍成功公式，也不凭“领袖”身份免除能力与责任要求。旧卡关于理解方向、联系群众和学习纠错机制的说法综合了后文，保留为编辑摘要；本句直接支持的是不能长期依赖少数人。",
    englishDistinction: "This is an organizational prescription for a particular party and revolutionary task in 1937, not a universal formula equating scale or cadre counts with success, nor a license exempting ‘leaders’ from competence and accountability. The old card's claims about understanding direction, staying connected to the people, and mechanisms of learning and correction synthesize the following passage and remain an editorial summary; this excerpt directly supports moving beyond dependence on a small circle.",
    emphasis: {
      zh: ["自觉地造就成万数的干部", "几百个最好的群众领袖"],
      en: ["purposefully train tens of thousands of cadres", "hundreds of first-rate leaders"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-middle-communist-building-and-line",
    source: "introducingCommunist",
    text: "十八年来，党的建设过程，党的布尔什维克化的过程，是这样同党的政治路线密切地联系着，是这样同党对于统一战线问题、武装斗争问题之正确处理或不正确处理密切地联系着的。",
    english: "Thus, for eighteen years, the building and bolshevization of the Party have been closely linked with its political line, with the correct or incorrect handling of the questions of the united front and armed struggle.",
    sourceLocator: [
      "《〈共产党人〉发刊词》（1939）论党的建设的段落，十八年历史总结句；完整句，全文照录；外文出版社《毛泽东选集》第二卷（1965）英译第288页",
      "Introducing The Communist (1939), passage on Party building, sentence summing up eighteen years of history; Foreign Languages Press Selected Works, vol. II (1965), p. 288; complete sentence, quoted in full",
    ],
    context: "前文分别说明，党正确或错误地处理同资产阶级建立、分裂统一战线的问题以及革命武装斗争问题时，党的发展、巩固和布尔什维克化会随之前进或后退。本句总结十八年经验；下一句倒转关系，说明党越布尔什维克化，越能正确决定政治路线并处理统一战线和武装斗争。",
    englishContext: "The preceding lines say that the Party's development, consolidation, and bolshevization advanced or retreated as it handled relations with the bourgeoisie, the united front, and revolutionary armed struggle correctly or incorrectly. This sentence sums up eighteen years of experience; the next reverses the relation, saying that a more bolshevized Party can decide its political line and handle those two questions more correctly.",
    distinction: "这是对1921至1939年党史的历史总结，其中“政治路线”具体联系着统一战线和武装斗争的处理，不是任何组织只要宣称路线正确就完成了建设。旧卡关于成员如何联合、斗争和学习取决于形势任务判断的说法，是从本篇作出的通用组织摘要；本句只直接说明党的建设同政治路线及两项问题的处理密切相联。",
    englishDistinction: "This is a historical summation of Party experience from 1921 to 1939, with ‘political line’ tied specifically to handling the united front and armed struggle; it does not say an organization completes its development merely by declaring its line correct. The old card's claim about how members cooperate, struggle, and learn is a general organizational summary derived from the essay. The sentence directly supports only the close linkage among Party building, political line, and the handling of those two questions.",
    emphasis: {
      zh: ["党的建设过程，党的布尔什维克化的过程", "同党的政治路线密切地联系着"],
      en: ["building and bolshevization of the Party", "closely linked with its political line"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-middle-china-revolution-social-analysis",
    source: "chineseRevolutionCommunistParty",
    text: "只有认清中国社会的性质，才能认清中国革命的对象、中国革命的任务、中国革命的动力、中国革命的性质、中国革命的前途和转变。",
    english: "Only when we grasp the nature of Chinese society will we be able clearly to understand the targets, tasks, motive forces and character of the Chinese revolution and its perspectives and future transition.",
    sourceLocator: [
      "《中国革命和中国共产党》（1939）第二章第二节“中国革命的对象”开篇，由社会性质转入革命诸问题的句子；完整句，全文照录；外文出版社《毛泽东选集》第二卷（1965）英译第315页",
      "The Chinese Revolution and the Chinese Communist Party (1939), Chapter II, §2, ‘The Targets of the Chinese Revolution,’ opening sentence moving from the nature of society to the questions of revolution; Foreign Languages Press Selected Works, vol. II (1965), p. 315; complete sentence, quoted in full",
    ],
    context: "第二章先列出革命的对象、任务、动力、性质、前途等将要回答的问题。第二节开头回指第一章第三节对殖民地、半殖民地和半封建社会的分析，本句据此提出理解社会性质是理解这些革命问题的前提；下一句将其概括为认清中国国情。",
    englishContext: "Chapter II first lists the targets, tasks, motive forces, character, and perspectives of the revolution as questions to be answered. The opening of §2 refers back to Chapter I, §3 and its account of colonial, semi-colonial, and semi-feudal society; this sentence makes grasping the nature of society a prerequisite for understanding those revolutionary questions. The next sentence restates this as grasping China's specific conditions.",
    distinction: "引句提出的是分析次序，并没有在一句中列出经济结构、阶级关系和内外权力的全部构成。旧卡把第一章的较长分析压缩成通用方法摘要，仍保留为编辑摘要；本句直接支持的只是先认清社会性质，再判断革命的对象、任务、动力、性质与前途。",
    englishDistinction: "The sentence establishes an order of analysis; it does not itself enumerate the full economic structure, class relations, or interaction of domestic and external power. The old card compresses the longer analysis in Chapter I into a general methodological summary and remains the editorial summary. The excerpt directly supports only grasping the nature of society before judging the revolution's targets, tasks, motive forces, character, and future.",
    emphasis: {
      zh: ["认清中国社会的性质", "认清中国革命的对象、中国革命的任务"],
      en: ["grasp the nature of Chinese society", "understand the targets, tasks, motive forces"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-middle-china-revolution-stage-and-forces",
    source: "chineseRevolutionCommunistParty",
    text: "所以，社会经济的性质，不仅规定了革命的对象和任务，又规定了革命的动力。",
    english: "Thus the motive forces as well as the targets and tasks of the revolution are determined by the nature of China’s socio-economic system.",
    sourceLocator: [
      "《中国革命和中国共产党》（1939）第二章第四节“中国革命的动力”，由阶级经济地位推出对象、任务与动力的总结句；完整句，全文照录；外文出版社《毛泽东选集》第二卷（1965）英译第319页",
      "The Chinese Revolution and the Chinese Communist Party (1939), Chapter II, §4, ‘The Motive Forces of the Chinese Revolution,’ summary sentence deriving targets, tasks, and motive forces from socio-economic conditions; Foreign Languages Press Selected Works, vol. II (1965), p. 319; complete sentence, quoted in full",
    ],
    context: "第四节先根据现阶段社会性质、革命对象与任务追问哪些阶级能够成为动力，随后列出当时社会中的阶级，并说各阶级对革命的态度和立场取决于其社会经济地位。本句作出推论，下一段开始逐一分析各阶级。",
    englishContext: "Section 4 asks which classes can become motive forces given the nature of society and the revolution's present targets and tasks. It then lists the classes in Chinese society and says their attitudes and stands toward the revolution are determined by their economic status. This sentence draws the inference, after which the text begins its class-by-class analysis.",
    distinction: "引句没有直接说社会矛盾在不同阶段会怎样变化，也没有给出联合、争取和反对各方的固定名单。旧卡把全章关于“现阶段”、阶级态度和基本策略的论述压缩成阶段性摘要；本句直接支持的是社会经济性质规定对象、任务与动力之间的结构关系。",
    englishDistinction: "The sentence does not directly describe how social contradictions change from stage to stage, nor provide a fixed list of forces to ally with, win over, or oppose. The old card condenses the chapter's discussion of the ‘present stage,’ class attitudes, and basic tactics into a stage-sensitive summary. The excerpt directly supports the structural claim that socio-economic conditions determine targets, tasks, and motive forces.",
    emphasis: {
      zh: ["社会经济的性质", "规定了革命的对象和任务，又规定了革命的动力"],
      en: ["motive forces as well as the targets and tasks", "nature of China’s socio-economic system"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-early-class-relations-not-labels",
    source: "analysisClasses",
    text: "此等雇农不仅无土地，无农具，又无丝毫资金，只得营工度日。",
    english: "Having neither land, farm implements nor funds, they can live only by selling their labour power.",
    sourceLocator: [
      "《中国社会各阶级的分析》（1925）“无产阶级”段，界定农村雇农生产资料与生活来源的句子；完整句，全文照录；外文出版社《毛泽东选集》第一卷（1965）英译第18页",
      "Analysis of the Classes in Chinese Society (1925), ‘The Proletariat,’ sentence identifying rural farm labourers' means of production and source of livelihood; Foreign Languages Press Selected Works, vol. I (1965), p. 18; complete sentence, quoted in full",
    ],
    context: "“无产阶级”段先讨论产业工人和城市苦力，再把农村无产阶级界定为长工、月工、零工等雇农。本句紧接该界定，列出他们没有土地、农具和资金而须靠出卖劳动力生活；后文继续描述劳动时间、工资、待遇与职业稳定性。",
    englishContext: "The paragraph on the proletariat first discusses industrial workers and urban labourers, then defines the rural proletariat as farm labourers hired by the year, month, or day. This sentence immediately identifies their lack of land, implements, and funds and their dependence on selling labour power; the following lines discuss hours, wages, treatment, and employment security.",
    distinction: "这是1925年社会分析中的历史阶级用语，不是脱离具体制度就可套用的永久标签。旧卡进一步提出不要从表面生活状态推断社会位置，并把土地、工具和雇佣劳动概括成分析方法，属于编辑摘要；本句直接呈现的只是当时农村雇农与生产资料及出卖劳动力的关系。",
    englishDistinction: "This is historical class terminology from a 1925 social analysis, not a permanent label to apply apart from concrete institutions. The old card goes further by warning against inferring social position from outward living conditions and turning land, tools, and wage labour into a general method; that remains the editorial summary. The sentence directly presents only the rural farm labourer's relation to means of production and the sale of labour power at that time.",
    emphasis: {
      zh: ["无土地，无农具，又无丝毫资金", "只得营工度日"],
      en: ["neither land, farm implements nor funds", "only by selling their labour power"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-late-democracy-state-conditions",
    source: "peoplesDemocraticDictatorship",
    text: "帝国主义还存在，国内反动派还存在，国内阶级还存在。",
    english: "Because imperialism still exists, because domestic reaction still exists, because classes still exist in our country.",
    sourceLocator: [
      "《论人民民主专政》（1949）关于“消灭国家权力”的问答段，说明现时不能取消国家权力的回答句；完整句，全文照录；外文出版社《毛泽东选集》第四卷（1961）英译第418页",
      "On the People's Democratic Dictatorship (1949), exchange on ‘abolishing state power,’ answer stating why it cannot yet be abolished; Foreign Languages Press Selected Works, vol. IV (1961), p. 418; complete sentence, quoted in full",
    ],
    context: "这一段先以问答形式提出是否要消灭国家权力，并回答“现在还不要”“现在还不能要”。“为什么？”之后就是本句；下一句随即把当前任务规定为强化以军队、警察和法庭为主的国家机器，以巩固国防和保护所界定的人民利益。",
    englishContext: "The passage asks in dialogue form whether state power is to be abolished and answers, ‘not right now; we cannot do it yet.’ This sentence follows the question ‘Why?’ The next sentence defines the present task as strengthening the state apparatus—mainly the army, police, and courts—to consolidate national defence and protect what the text defines as the people's interests.",
    distinction: "这是1949年革命国家理论中的具体论证，其“帝国主义”“反动派”“阶级”等分类带有明确历史与政治立场，不能自动变成任何制度延续自身的通用理由。旧卡把这组问答转写为制度消失取决于社会条件变化的一般判断；本句直接支持的只是作者当时列举的三项尚存条件。",
    englishDistinction: "This is a specific argument within a 1949 revolutionary theory of the state. Its categories of ‘imperialism,’ ‘reaction,’ and ‘classes’ carry definite historical and political commitments and cannot automatically become a general warrant for any institution to perpetuate itself. The old card recasts the exchange as a general claim that institutional disappearance depends on changed social conditions. The sentence directly supports only the three conditions the author says still existed then.",
    emphasis: {
      zh: ["帝国主义还存在", "国内反动派还存在，国内阶级还存在"],
      en: ["imperialism still exists", "domestic reaction still exists, because classes still exist in our country"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-late-ten-relations-positive-factors",
    source: "tenMajorRelationshipsOfficial",
    text: "我们一定要努力把党内党外、国内国外的一切积极的因素，直接的、间接的积极因素，全部调动起来，把我国建设成为一个强大的社会主义国家。",
    english: "We must do our best to mobilize all positive factors, both inside and outside the Party, both at home and abroad, both direct and indirect, and make China a powerful socialist country.",
    sourceLocator: [
      "《论十大关系》（1956）结尾总结十种关系的段落末句，提出调动各类积极因素的句子；完整句，全文照录；外文出版社《毛泽东选集》第五卷（1977）英译第306页",
      "On the Ten Major Relationships (1956), final sentence of the concluding paragraph on the ten relationships, calling for the mobilization of positive factors; Foreign Languages Press Selected Works, vol. V (1977), p. 306; complete sentence, quoted in full",
    ],
    context: "结尾段把前述十种关系概括为矛盾，说明任务是正确处理这些矛盾，同时须准备实践中未必完全处理满意、还会遇到新矛盾与新问题两种可能。本句以党内党外、国内国外、直接间接三组范围收束全文，并点明建设目标。",
    englishContext: "The concluding paragraph describes the ten relationships as contradictions and says the task is to handle them correctly, while allowing for the possibility that practice will not resolve them entirely to satisfaction and that new contradictions and problems will arise. This sentence closes the essay with three ranges—inside and outside the Party, home and abroad, direct and indirect—and states the construction goal.",
    distinction: "原句不是把所有人、所有输入都预先判定为积极因素，而是在特定社会主义建设目标下要求扩大可调动的积极面；哪些因素积极仍需结合十种关系作判断。旧卡关于“不只靠压倒消极因素”综合了开篇与结尾，保留为编辑摘要；本句直接支持的是调动已被判定为积极的多方面因素。",
    englishDistinction: "The sentence does not classify every person or input in advance as a positive factor. Within a particular goal of socialist construction, it calls for broadening the positive forces that can be mobilized; identifying those forces still requires judgment through the ten relationships. The old card's contrast with merely overcoming negative factors synthesizes the opening and conclusion and remains the editorial summary. This excerpt directly supports mobilizing factors already judged positive across several domains.",
    emphasis: {
      zh: ["党内党外、国内国外的一切积极的因素", "全部调动起来"],
      en: ["all positive factors", "both at home and abroad, both direct and indirect"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-early-rural-class-by-relations",
    source: "ruralClassesOfficial",
    text: "占有土地，自己不劳动，或只有附带的劳动，而靠剥削农民为生的，叫做地主。",
    english: "A landlord is a person who owns land, does not engage in labour himself, or does so only to a very small extent, and lives by exploiting the peasants.",
    sourceLocator: [
      "《怎样分析农村阶级》（1933）第一节“地主”首句，以土地、劳动参与和剥削关系界定地主；中文完整句，全文照录；外文出版社《毛泽东选集》第一卷（1965）英译第137页（缓存PDF第145页）",
      "How to Differentiate the Classes in the Rural Areas (1933), §I, ‘The Landlord,’ opening definition through landholding, participation in labour, and exploitation; Foreign Languages Press Selected Works, vol. I (1965), print p. 137 (archived PDF p. 145); complete sentence, quoted in full",
    ],
    context: "第一节以本句给出地主的开篇定义，随后说明收取地租是主要剥削方式，也可能兼有放债、雇工和工商业经营。第二至第五节再分别依据土地、生产工具、劳动、雇佣和生活来源界定富农、中农、贫农与工人。",
    englishContext: "Section I opens with this definition of the landlord, then identifies land rent as the principal form of exploitation while also mentioning moneylending, hired labour, and industrial or commercial activity. Sections II–V distinguish rich, middle, and poor peasants and workers through land, instruments, labour, hiring, and sources of livelihood.",
    distinction: "这是1933年土地改革工作中的历史分类，不是可以脱离当时生产关系套用的永久身份，更不能由分类推断个人品格。旧卡进一步反对凭衣着、声望或一时收入归类，并汇总全篇多项标准，保留为编辑摘要；本句直接支持的只是地主定义中的土地、劳动和剥削关系。",
    englishDistinction: "This is a historical classification used in land-reform work in 1933, not a permanent identity to apply apart from the production relations of that period, and it cannot determine personal character. The old card also rejects classification by clothing, prestige, or temporary income and synthesizes several criteria across the essay; that remains the editorial summary. This sentence directly supports only the relations of land, labour, and exploitation in the landlord definition.",
    emphasis: {
      zh: ["占有土地，自己不劳动", "靠剥削农民为生"],
      en: ["owns land, does not engage in labour himself", "lives by exploiting the peasants"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-early-laws-change-with-conditions",
    source: "revolutionaryWarStrategy",
    text: "由此看来，战争情况的不同，决定着不同的战争指导规律，有时间、地域和性质的差别。",
    english: "Thus the different laws for directing different wars are determined by different circumstances of those wars—differences in their time, place and nature.",
    sourceLocator: [
      "《中国革命战争的战略问题》（1936）第一章第一节“战争规律是发展的”，批评机械照搬经验后的总结段首句；中文完整句，全文照录；外文出版社《毛泽东选集》第一卷（1965）英译第181页（缓存PDF第189页）",
      "Problems of Strategy in China's Revolutionary War (1936), Chapter I, §1, ‘The Laws of War Are Developmental,’ opening sentence of the synthesis after the critique of mechanically copying experience; Foreign Languages Press Selected Works, vol. I (1965), print p. 181 (archived PDF p. 189); complete sentence, quoted in full",
    ],
    context: "此前三段依次批评只学一般军事条令、机械照搬苏联内战经验和模仿北伐道路，并要求按现时情况形成自己的办法。本句随即概括战争规律受战争情况规定；后文分别展开时间阶段、战争性质与国家地域的差异。",
    englishContext: "The preceding paragraphs reject relying only on general manuals, mechanically copying Soviet civil-war experience, and imitating the Northern Expedition. They call instead for working out an approach in light of present conditions. This sentence then states that the laws directing war are determined by its circumstances, after which time, the nature of the war, and place are discussed separately.",
    distinction: "原句明确讨论战争指导规律，并不直接提出适用于所有知识领域的一般方法论。它也不是说经验不可迁移，而是要求辨认哪些条件仍然成立。旧卡把这一结构推广为学习任何成功经验时核对时间、地点和对象性质的原则，保留为编辑摘要。",
    englishDistinction: "The sentence explicitly concerns laws for directing war; it does not itself state a general methodology for every field of knowledge. Nor does it say experience cannot travel—it requires identifying which conditions still hold. The old card extends that structure into a principle for checking time, place, and the nature of an object whenever successful experience is borrowed, and remains the editorial summary.",
    emphasis: {
      zh: ["战争情况的不同", "有时间、地域和性质的差别"],
      en: ["different circumstances of those wars", "time, place and nature"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-early-deciding-local-relations",
    source: "revolutionaryWarStrategy",
    text: "总之，一个原则，就是注意于那些有关全局的重要的关节。",
    english: "In a word, the principle is to centre our attention on the important links that have a bearing on the situation as a whole.",
    sourceLocator: [
      "《中国革命战争的战略问题》（1936）第一章第三节“战略问题是研究战争全局的规律的东西”，列举具体轻重差异段的结句；中文完整句，全文照录；外文出版社《毛泽东选集》第一卷（1965）英译第185页（缓存PDF第193页）",
      "Problems of Strategy in China's Revolutionary War (1936), Chapter I, §3, ‘Strategy Is the Study of the Laws of a War Situation as a Whole,’ closing sentence after examples of situation-dependent priorities; Foreign Languages Press Selected Works, vol. I (1965), print p. 185 (archived PDF p. 193); complete sentence, quoted in full",
    ],
    context: "本节先区分战略上的全局与战役、战术上的局部，并说明局部中有些行动会对全局产生决定意义。本句之前以突击方向、给养、保密、指挥员参战、军校与群众大会等例子说明，什么最重要必须按具体情况判断；本句收束这些例子。",
    englishContext: "The section distinguishes the whole situation studied by strategy from the partial situations of campaigns and tactics, while noting that some actions within a part can be decisive for the whole. Before this sentence, examples involving the direction of assault, supplies, secrecy, a commander's participation, a military school, and a mass meeting show that importance must be judged from concrete circumstances. This sentence closes those examples.",
    distinction: "“重要的关节”不是预先固定的清单，也不意味着其它局部可以永久忽略；同段正强调重要性随具体情况变化。旧卡关于识别会改变整体走向的局部行动，是对本节全局—局部关系的编辑概括；引句直接支持的是把注意力集中于有关全局的重要环节。",
    englishDistinction: "The ‘important links’ are not a predetermined list, and the sentence does not license permanently ignoring every other part; the paragraph emphasizes that importance changes with concrete circumstances. The old card's language about local actions that can alter the direction of the whole is an editorial synthesis of the section's whole–part relation. The excerpt directly supports concentrating attention on important links bearing on the whole.",
    emphasis: {
      zh: ["有关全局", "重要的关节"],
      en: ["important links", "situation as a whole"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-middle-war-forms-from-conditions",
    source: "warAndStrategyOfficial",
    text: "但是在同一个原则下，就无产阶级政党在各种条件下执行这个原则的表现说来，则基于条件的不同而不一致。",
    english: "But while the principle remains the same, its application by the party of the proletariat finds expression in varying ways according to the varying conditions.",
    sourceLocator: [
      "《战争和战略问题》（1938）第一节“中国的特点和革命战争”开篇第二段首句，转入比较不同国家条件下斗争形式；中文完整句，全文照录；外文出版社《毛泽东选集》第二卷（1965）英译第219页（缓存PDF第225页）",
      "Problems of War and Strategy (1938), §I, ‘China's Characteristics and Revolutionary War,’ opening sentence of the second paragraph, introducing a comparison of forms under different national conditions; Foreign Languages Press Selected Works, vol. II (1965), print p. 219 (archived PDF p. 225); complete sentence, quoted in full",
    ],
    context: "文章开篇先提出一个普遍的革命原则，本句随即限定同一原则在不同条件下会有不同表现。后文先说明资本主义国家在特定时期可以利用议会、罢工和工会等合法形式，再以当时中国缺少这些制度通道的半殖民地半封建处境作对比。",
    englishContext: "The essay first states what it treats as a universal revolutionary principle, then immediately qualifies it with this sentence: the same principle takes different forms under different conditions. The following passage describes legal forms such as parliaments, strikes, and trade unions in capitalist countries during particular periods, then contrasts them with the semi-colonial and semi-feudal conditions it attributes to China and the absence of those institutional channels.",
    distinction: "这是1938年革命战略论证中的条件比较，不能直接改写成当代政治行动指南，也不能脱离法律、伦理和现实风险为武装行动提供通用正当性。旧卡所说制度通道、社会结构与历史处境，综合了后续比较并保留为编辑摘要；本句直接支持的只是执行形式随条件而异。",
    englishDistinction: "This is a comparison of conditions within a revolutionary argument from 1938. It should not be turned directly into a guide for contemporary political action or used apart from legal, ethical, and practical risks as a general justification for armed action. The old card's language about institutional channels, social structure, and historical circumstances synthesizes the comparison that follows and remains the editorial summary. This sentence directly supports only that forms of application vary with conditions.",
    emphasis: {
      zh: ["同一个原则", "基于条件的不同而不一致"],
      en: ["principle remains the same", "varying ways according to the varying conditions"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-middle-war-study-and-command",
    source: "warAndStrategyOfficial",
    text: "从军事理论的研究，引起兴趣，唤起全党注意于军事问题的研究，我认为是必要的。",
    english: "I deem it imperative that we arouse interest in the study of military theory and direct the attention of the whole membership to the study of military matters.",
    sourceLocator: [
      "《战争和战略问题》（1938）第六节“注意研究军事问题”末句，在指出战略与战争理论研究者过少、军事知识通俗化迫切之后作结；中文完整句，全文照录；外文出版社《毛泽东选集》第二卷（1965）英译第232页（缓存PDF第238页）",
      "Problems of War and Strategy (1938), §VI, ‘Pay Great Attention to the Study of Military Matters,’ final sentence after noting that too few people studied strategy and war theory and that military knowledge urgently needed wider circulation; Foreign Languages Press Selected Works, vol. II (1965), print p. 232 (archived PDF p. 238); complete sentence, quoted in full",
    ],
    context: "第六节把当时战争胜负同国家存亡相连，依次评估战术、战略、战争理论和军队政治工作的研究状况。它指出战略与战争理论仍只限于极少数人，并把军事知识通俗化说成全党全国的迫切任务；本句由此提出扩大研究兴趣与关注。",
    englishContext: "Section VI links the outcome of the war then under way to national survival and surveys the study of tactics, strategy, the theory of war, and army political work. It says that strategy and war theory remained the work of only a few people and describes the wider circulation of military knowledge as urgent for the Party and country. This sentence therefore calls for broader interest and attention to study.",
    distinction: "原句要求扩大对军事理论和军事问题的研究，并没有让所有成员取代专业指挥，也没有取消专业分工。旧卡进一步把它解释为承担全局责任者不能把专业问题完全外包，以及必须理解行动、组织和政治目标的关联；这些是编辑性延伸，保留为摘要。",
    englishDistinction: "The sentence calls for broader study of military theory and military matters; it does not ask every member to replace professional commanders or abolish specialization. The old card goes further by arguing that those responsible for a whole cannot completely outsource specialized questions and must understand relations among action, organization, and political purpose. Those are editorial extensions and remain the summary.",
    emphasis: {
      zh: ["军事理论的研究", "唤起全党注意于军事问题的研究"],
      en: ["study of military theory", "attention of the whole membership to the study of military matters"],
    },
    quotationBasis: true,
  },
  {
    id: "mao-late-second-plenum-learn-construction",
    source: "secondPlenumConstruction",
    text: "为了这一点，我们的同志必须用极大的努力去学习生产的技术和管理生产的方法，必须去学习同生产有密切联系的商业工作、银行工作和其它工作。",
    english: "Therefore, our comrades must do their utmost to learn the techniques of production and the methods of managing production as well as other closely related work such as commerce and banking.",
    sourceLocator: [
      "《在中国共产党第七届中央委员会第二次全体会议上的报告》（1949）第四部分，恢复和发展城市生产段中提出学习生产、管理及相关工作的完整句；中文完整句，全文照录；外文出版社《毛泽东选集》第四卷（1961）英译第365页（缓存PDF第371页）",
      "Report to the Second Plenary Session of the Seventh Central Committee (1949), part IV, complete sentence in the passage on restoring and developing urban production, calling for study of production, management, and related work; Foreign Languages Press Selected Works, vol. IV (1961), print p. 365 (archived PDF p. 371); complete sentence, quoted in full",
    ],
    context: "第三部分宣布工作重心由乡村转向城市并要求学习管理、建设城市。第四部分继而把恢复和发展生产列为城市中心任务，警告生产停顿会造成失业和生活恶化；本句具体列出生产技术、生产管理以及商业、银行等必须补学的工作，后文说明城市其它工作围绕生产建设展开。",
    englishContext: "Part III announces a shift in the centre of work from the countryside to the cities and calls for learning how to administer and build them. Part IV then treats restoring and developing production as the central urban task and warns that stagnation would bring unemployment and worsening livelihoods. This sentence specifies techniques of production, production management, commerce, and banking as fields to be learned; the following passage says other urban work revolves around production and construction.",
    distinction: "这是1949年政权转换与战后城市接管语境中的建设任务，不是说过去的斗争经验毫无价值，也不是把生产设为任何组织在任何阶段的唯一目标。旧卡把“工作重心转入城市”与本段的学习要求合成阶段转换中的能力更新，保留为编辑摘要；本句直接支持的是补学生产、管理及相关工作。",
    englishDistinction: "This is a construction task in the setting of political transition and postwar urban administration in 1949. It neither says earlier experience of struggle had no value nor makes production the sole objective of every organization in every stage. The old card combines the shift of work to the cities with this passage's learning requirement into an account of capability renewal during a stage change, and remains the editorial summary. The sentence directly supports learning production, management, and related work.",
    emphasis: {
      zh: ["学习生产的技术和管理生产的方法", "商业工作、银行工作和其它工作"],
      en: ["learn the techniques of production", "methods of managing production"],
    },
    quotationBasis: true,
  },
] as const satisfies readonly MaoSourceUpgradeSeed[];

const maoSourceUpgradeById = new Map<string, MaoSourceUpgradeSeed>(
  maoSourceUpgrades.map((upgrade) => [upgrade.id, upgrade] as const),
);

/** Apply an audited source excerpt only after all profile/seed inheritance. */
export function applyMaoSourceUpgrade<T extends Thought>(thought: T): T {
  const upgrade = maoSourceUpgradeById.get(thought.id);
  if (!upgrade) return thought;

  return {
    ...thought,
    text: upgrade.text,
    english: upgrade.english,
    editorialSummary: thought.editorialSummary ?? thought.text,
    englishEditorialSummary:
      thought.englishEditorialSummary ?? thought.english,
    presentationNature: "source-excerpt",
    rendering: "short-quote",
    sourceLocator: [...upgrade.sourceLocator],
    context: upgrade.context ?? thought.context,
    englishContext: upgrade.englishContext ?? thought.englishContext,
    distinction: upgrade.distinction ?? thought.distinction,
    englishDistinction:
      upgrade.englishDistinction ?? thought.englishDistinction,
  };
}

const maoQuotationExceptionUseBasis = {
  kind: "quotation-exception" as const,
  zh: "极短署名节选仅用于介绍、评论作品和说明卡片议题，另附项目研读译文与编辑摘要，不提供足以替代原作的连续内容；按《中华人民共和国著作权法》第二十四条第（二）项的适当引用路径，并在美国按17 U.S.C. §107的评论、研究用途及四因素逐案判断。",
  en: "A very short attributed excerpt is used only to introduce and comment on the work and explain the card's issue. It accompanies a project study translation and editorial summary and does not provide enough continuous content to substitute for the work; the use follows the appropriate-quotation route in Article 24(2) of China's Copyright Law and, in the United States, is assessed case by case under the criticism, comment, and research purposes and four factors of 17 U.S.C. §107.",
} as const;

const maoQuotationExceptionLinks = [
  {
    href: "https://www.npc.gov.cn/c2/c30834/202011/t20201119_308796.html",
    label: "中国人大网：《中华人民共和国著作权法》第二十四条（适当引用）",
    englishLabel: "National People's Congress: Copyright Law of the PRC, Article 24 (appropriate quotation)",
  },
  {
    href: "https://www.copyright.gov/fair-use/more-info.html",
    label: "美国版权局：17 U.S.C. §107 合理使用说明",
    englishLabel: "U.S. Copyright Office: fair-use guidance under 17 U.S.C. §107",
  },
] as const;

export const maoSourceUpgradeEvidence = maoSourceUpgrades.map((upgrade) => {
  const source: MaoSourceWork = maoSourceWorks[upgrade.source];
  const referenceLinks = [
    {
      href: source.zhUrl,
      label: source.zhLinkLabel ?? `马克思主义文库：${source.zhTitle}中文原文`,
      englishLabel: source.zhEnglishLabel ?? `Marxists Internet Archive: Chinese original of ${source.enTitle}`,
    },
    ...(source.enUrl
      ? [{
          href: source.enUrl,
          label: `马克思主义文库：${source.enTitle}《毛泽东选集》英译`,
          englishLabel: `Marxists Internet Archive: Selected Works translation of ${source.enTitle}`,
        }]
      : []),
    ...(source.extraLinks ?? []),
    ...maoQuotationExceptionLinks,
  ];

  return {
    id: upgrade.id,
    originalField: "text" as const,
    checkedOn: "2026-08-27" as const,
    referenceEdition: {
      zh: source.zhEditionNote ?? `马克思主义文库${source.zhTitle}中文全文；按卡片所列篇章逐字核对，保留现代汉语原文，省略处以“…”明示`,
      en: source.enEditionNote ?? `Chinese original checked word for word against the Marxists Internet Archive text of ${source.enTitle}; the English card follows the linked Selected Works wording where aligned and otherwise gives a close project translation, with omissions marked by “…”`,
    },
    useBasis: maoQuotationExceptionUseBasis,
    referenceLinks,
  };
});

export const maoSourceUpgradeEmphasis = Object.fromEntries(
  maoSourceUpgrades.map((upgrade) => [upgrade.id, upgrade.emphasis]),
) as Readonly<Record<string, {
  readonly zh: readonly string[];
  readonly en: readonly string[];
}>>;
