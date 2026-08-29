# 新增西方／中国卡片：独立原文核查

核查日期：2026-08-30
范围：`philosophyStructuralExpansion.ts` 与 `chineseStructuralExpansion.ts` 的 30 张新增卡。此文件只审计，不修改内容。

## 结论

- 30 张均可作为**短原文节选**保留；西方卡应以 `english` 为原文栏位，中国卡应以 `text` 为原文栏位。
- 28 张的原文、篇章定位和现有译意可接受。两张须在入库前微调英译术语（见下表的 `修正`）。
- `Sextus` 与 `Austin` 的所列英译版不应因为书目信息而被当成可整章再分发的开放文本：短节选可标 `quotation-exception`，完整阅读维持 source route。`Austin` 尤其应只路由到馆藏／借阅页。
- 古籍原文本身属公版，但从 Wikisource 提取的逐字转录仍须保留该站的署名／许可信息；不要把“原文公版”写成“转录无条件公版”。

## 核查表

| ID | 直接核对的原典／版本与定位 | 原文、定位、译意 | `source-excerpt` | 结论 |
| --- | --- | --- | --- | --- |
| `sextus-opposes-appearances-judgements` | *Outlines* I.4 §8，Bury (1933)；[馆藏目录](https://archive.org/details/outlinesofpyrrho00sext) | 英文为 Bury 的连续句；中文准确表达 appearances／judgements 的对置。 | 可以；`english` | 通过；完整章仅路由。 |
| `sextus-suspense-neither-deny-affirm` | *Outlines* I.4 §10，Bury (1933) | 英文为 suspension 的定义句；中文“安息”与 mental rest 相称。 | 可以；`english` | 通过；完整章仅路由。 |
| `sextus-quietude-opinion` | *Outlines* I.12 §25，Bury (1933) | 英文为 End 的定义句；中文保留 opinion／unavoidable 的区分。 | 可以；`english` | 通过；完整章仅路由。 |
| `lucretius-nothing-from-nothing` | *On the Nature of Things* I.150，Leonard (1916)，[Project Gutenberg](https://www.gutenberg.org/ebooks/785) | 英文逐句相合；中文是克制的直译。 | 可以；`english`，公版 | 通过。 |
| `lucretius-bodies-and-void` | 同上 I.419–421，[文本页](https://www.gutenberg.org/cache/epub/785/pg785-images.html) | 英文逐句相合；“自立的整个自然”对应 self-sustained。 | 可以；`english`，公版 | 通过。 |
| `lucretius-death-nothing` | 同上 III.830–832 | 英文逐句相合；中文没有把论证误写成否定丧失或临终的重要性。 | 可以；`english`，公版 | 通过。 |
| `ghazali-bases-certitude` | Field, *The Confessions of Al Ghazzali* (1909), [§1](https://en.wikisource.org/wiki/The_Confessions_of_Al_Ghazzali/Section_1) | 英文为该历史英译的开头连续句；中文“确定性的基础”准确。 | 可以；`english`，公版英译 | 通过。 |
| `ghazali-blind-belief-consciousness` | Field (1909), [§3](https://en.wikisource.org/wiki/The_Confessions_of_Al_Ghazzali/Section_3) | 英文连续句；中文“盲从／对自身毫无意识”合乎原意。 | 可以；`english`，公版英译 | 通过。 |
| `ghazali-experience-not-definition` | Field (1909), [§7](https://en.wikisource.org/wiki/The_Confessions_of_Al_Ghazzali/Section_7) | 英文连续句；中文“忘我与入门”是 ecstasy and initiation 的可接受释译。 | 可以；`english`，公版英译 | 通过。 |
| `maimonides-no-positive-attribute` | Friedländer (1904), *Guide* I.58，p.176，[CCEL 扫描](https://www.ccel.org/ccel/m/maimonides/guide/cache/guide.pdf) | 英文逐句相合；中文“肯定性属性”准确。 | 可以；`english`，公版英译 | 通过。 |
| `maimonides-negation-advances-knowledge` | Friedländer (1904), I.59，p.179，[CCEL 扫描](https://www.ccel.org/ccel/m/maimonides/guide/cache/guide.pdf) | 英文是一完整连续长句；中文完整保留“逐项否定而接近认识”的推理。 | 可以；`english`，公版英译 | 通过。 |
| `maimonides-law-soul-body-welfare` | Friedländer (1904), III.27，[CCEL 书目页](https://www.ccel.org/ccel/maimonides/guide.html) | 英文为章首命题；中文“灵魂／身体的福祉”准确。 | 可以；`english`，公版英译 | 通过。 |
| `austin-utterance-performs-action` | *How to Do Things with Words*, Lecture I, p.6, 2nd ed. (1975)，[馆藏目录](https://archive.org/details/howtodothingswit0000aust) | 短句与通行二版相合；中文准确。 | 可以；`english`，`quotation-exception` | 通过；不可整讲打包。 |
| `austin-saying-doing-three-senses` | 同书 Lecture VIII, p.91 | 连续从句，定位可复核；中文保留三层 “is / in / by saying” 结构。 | 可以；`english`，`quotation-exception` | 通过；不可整讲打包。 |
| `austin-total-speech-situation` | 同书 Lecture XII, p.148 | 英文为完整句；中文“现实整体”正确传达 actual phenomenon。 | 可以；`english`，`quotation-exception` | 通过；不可整讲打包。 |
| `chinese-xici-yin-yang-way` | [《易传·系辞上》五](https://zh.wikisource.org/wiki/%E6%98%93%E5%82%B3/%E7%B9%AB%E8%BE%AD%E4%B8%8A) | 原文可逐字核对（繁简、标点正常化除外）；英译准确。 | 可以；`text`，原典公版 | 通过。 |
| `chinese-xici-way-and-instruments` | 同上十二 | 原文、章次正确。英译中最后的 `continuity` 对「通」过窄，原文更接近通行／贯通。 | 可以；`text`，原典公版 | **修正英译**：将 “continuity” 改为 “free passage” 或 “communication/connection”。 |
| `chinese-xici-images-express-meaning` | 同上十二 | 原文、章次正确；`情伪`译作 true and false conditions 可接受，宜在说明中保留“情状与真伪”的开放性。 | 可以；`text`，原典公版 | 通过。 |
| `chinese-mohist-cause-definition` | [《墨子·经上》「故」](https://zh.wikisource.org/wiki/%E5%A2%A8%E5%AD%90/%E7%B6%93%E4%B8%8A) | 原文、条目正确；英文是对压缩定义的可接受工作译。 | 可以；`text`，原典公版 | 通过；保留与《经说上》合读提示。 |
| `chinese-mohist-kinds-of-names` | 同上「名」 | 原文、条目正确；`unrestricted` 不如术语惯译清楚。 | 可以；`text`，原典公版 | **修正英译**：`Names are general, class, or private.`（或保留 `unrestricted` 并在说明释为 general）。 |
| `chinese-mohist-name-claim-reason` | [《墨子·小取》](https://zh.wikisource.org/wiki/%E5%A2%A8%E5%AD%90/%E5%B0%8F%E5%8F%96) | 原文连续三分句可逐字核对；英文为贴切工作译。 | 可以；`text`，原典公版 | 通过。 |
| `chinese-zhiyi-three-truths-one-mind` | [《摩诃止观》卷六](https://zh.wikisource.org/wiki/%E6%91%A9%E8%A8%B6%E6%AD%A2%E8%A7%80/%E5%8D%B7006) | 二次连续性核查发现初稿把前句与后文拼接。现改为连续原句“若论道理秖在一心。即空即假即中。”并保留底本异体字 `秖`，英译相应改写。 | 可以；`text`，原典公版 | 已修正后通过。 |
| `chinese-zhiyi-one-mind-three-wisdoms` | [《摩诃止观》卷一](https://zh.wikisource.org/wiki/%E6%91%A9%E8%A8%B6%E6%AD%A2%E8%A7%80/%E5%8D%B7001) | 原文可逐字核对；英译保留如来藏、空假中和三智的结构。 | 可以；`text`，原典公版 | 通过。 |
| `chinese-zhiyi-practice-matches-words` | 同上卷一，`理即／观行`段 | 原文可逐字核对；英译无过度延伸。 | 可以；`text`，原典公版 | 通过。 |
| `chinese-lu-jiuyuan-heart-and-pattern` | [《陆九渊集》卷一〈与曾宅之〉](https://zh.wikisource.org/wiki/%E9%99%B8%E4%B9%9D%E6%B7%B5%E9%9B%86) | 原文、篇名正确；英译准确表达心、理“一”的论证。 | 可以；`text`，原典公版 | 通过。 |
| `chinese-lu-jiuyuan-way-fills-cosmos` | 同卷〈与赵监〉 | 原文、篇名正确；英译“fills the cosmos”准确。 | 可以；`text`，原典公版 | 通过。 |
| `chinese-lu-jiuyuan-root-and-branches` | 同卷〈与邵叔宜〉 | 原文、篇名正确；前句嵌引《大学》不影响该信中实有此段，英译准确。 | 可以；`text`，原典公版 | 通过。 |
| `chinese-he-yin-zhen-world-shared` | [《女子解放问题》](https://zh.wikisource.org/wiki/%E5%A5%B3%E5%AD%90%E8%A7%A3%E6%94%BE%E9%97%AE%E9%A2%98) 开篇 | 原文、开篇定位可逐字核对；英译准确。页面标为转录质量 50%，宜保留再校提示。 | 可以；`text`，原典公版 | 通过；建议有条件时对照期刊影印。 |
| `chinese-he-yin-zhen-women-made-slaves` | 同文第二段 | 原文、定位可逐字核对；英译准确。 | 可以；`text`，原典公版 | 通过；同样建议影印复校。 |
| `chinese-he-yin-zhen-revolutions-together` | [《女子宣布书》](https://zh.wikisource.org/wiki/%E5%A5%B3%E5%AD%90%E5%AE%A3%E5%B8%83%E4%B9%A6) 结尾 | 原文、结尾定位可逐字核对；英译完整保留并行革命的意思。 | 可以；`text`，原典公版 | 通过。 |

## 入库约束

1. 西方 15 条：`originalField: "english"`；中文译文是 AGORA 翻译，不得称为原作者中文原文。
2. 中国 15 条：`originalField: "text"`；英文是 AGORA study translation，不得标成既有出版译本。
3. `useBasis`：Lucretius／Field／Friedländer 可标公版英译；中国卡应写“原典公版 + 转录平台署名”；Sextus 与 Austin 保守标 `quotation-exception`。
4. 所有链接均应逐条进入 `referenceLinks`；不要仅在研究笔记中保存链接。
