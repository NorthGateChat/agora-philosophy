# 已集成 reading-unit 正文质量审计

## 正式修复结果（2026-08-29 22:28）

本轮已把下文列出的“必须修复”全部落地，不再只是提案。共刷新或修复 69 个已有正文文件，未触碰当时仍缺正文的单元，也未运行全构建或全局 manifest：

- 17 个 natural unit 已恢复为完整篇章：4 个单扫描页（Galileo 第二日、Maxwell 导言、Mill 第二章、Plotinus VI.9），8 个明显截断单元（Republic III/V、James IX、Smith V.1.III、Dasgupta Preface、Metaphysics VII.17、Brihadaranyaka 2.3、Tattvartha 5），以及 5 个整卷/整书或篇章外内容（Confessions VIII.9、Mendel 论文、Berkeley Introduction、戴震“理”、Ricardo Preface）。
- 5 个相邻章节标题已改为结束边界：Acaranga I.2.3、Groundwork I、Phenomenology Introduction、Hegel Independence and Dependence、TPT 15。
- 提取器通用清理覆盖了 47 个已确认网页杂质实例：7 个 CText 页尾、11 个 New Advent 页尾、3 个 Econlib 分类尾、1 个 Summa 模板残留、1 个 Google 水印单元，以及 24 个 Wikisource 目录/校勘提示头。另统一移除了零宽格式字符，重取了受影响的 Maxwell、Marx、Hobbes 锚点。
- Plotinus 卡片不再沿用混入 VI.8 的“体系纲要”单页摘引：已改用 Stephen MacKenna 的 VI.9.3 真正段落，并集成 VI.9 全篇；Republic III 的 `honour`/`honor` 与 Republic V 的破折号措辞也已按实际集成版本校正。

定向正文组（65 个有可比基线的文件）由 2,672,106 bytes 增至 3,169,079 bytes，净增 496,973 bytes（约 18.6%）；增长主要来自把扫描页/截断文本恢复成完整篇章。新增保存的原始 HTML/API/XML/全文与完整本地派生篇章共 6,647,055 bytes；这些研究源文件不直接进入前端正文包。当前全体正文只读审计为 470 bodies、599 anchors、0 anchor failure、0 duplicate body、0 chrome finding、0 boundary risk；50 个 missing bodies 属于并发中的另一批任务。

定向验证：`fetch-reading-units` 44/44、`reading-unit-source-overrides` 1/1、`source-metadata` 6/6，合计 51/51 通过；所有定向 fetch 最终均成功。未运行全构建。全量 `reading-unit-assets` 仍会因上述 50 个并发缺正文单元及既有 Cosmos 首段规则而失败，不是本轮正文修复回归。

必须人工决策项：0。可选的后续编辑升级有三项，但均不阻塞发布：Tattvartha V 的扫描 OCR 仍较嘈杂；Galileo 1661 EEBO-TCP 全日正文保留早期印刷拼写且单体为 525,716 bytes（仍低于 600 KiB 门槛）；Dasgupta PDF 派生序言内容完整，但页内换行被合并为 9 个较长段落，可日后做纯排版重分段。

以下内容保留为启动基线取证记录；其中“必须修复”清单均已由上面的修复结果关闭，计数会因并发继续过时。

审计基线：2026-08-29 21:42（Asia/Shanghai）。启动时 `public/readings/units` 有 447 个正文；索引有 520 个 `integrated-candidate`，缺 73 个正文。基线正文内容摘要为 `7c6e3e103fb8da7cf6dbf2ebff6ec24b4e2d398899ab02172e68a35980388730`。本审计只读正文、索引和覆盖配置，仅新增本报告；未运行全构建。

## 必须修复

### 1. 严格语录锚点（启动基线 3 项；并发后已清零）

基线严格复算了正文中所有已存在卡片的登记原文字段（`thoughtMap.originalField`）与锚点实际切片，共发现 3 项切片不等于登记语录：

- `ru-a-dynamical-theory-of-the-electromagnetic-field-part-i-d0f987e9` / `science-maxwell-displacement-current`：正文切片夹有 U+200B 零宽字符。
- `ru-capital-volume-i-chapter-13-f639cec0` / `marx-cooperation-collective-power`：正文切片夹有 U+200B，且末尾多取了 `[`。
- `ru-leviathan-part-i-chapter-xiv-8915f0c9` / `hobbes-right-nature`：正文存在拆开的 `T He`、U+200B 和末尾标点漂移。

21:46 并发后复核为 462 个正文、581 个锚点、0 个锚点失败，说明上述 3 项已被其他进行中的写入修复；最终仍应在所有正文稳定后再跑一次严格审计。

### 2. 明确不是完整 natural unit 的正文

下列正文不应作为“直接读所在篇章”发布，须改为完整篇章/部分后重取锚点：

- 单个扫描页代替整章/整日/整篇：
  - `ru-dialogue-concerning-the-two-chief-world-systems-day-second-58feaf1b`（仅扫描页 193，开头、结尾都在句中）
  - `ru-on-faradays-lines-of-force-introduction-introduction-23863fee`（仅扫描页 2，首尾均在句中）
  - `ru-on-liberty-chapter-ii-20d8c814`（仅扫描页 34，正文止于 `unlimited`）
  - `ru-enneads-ennead-vi-tractate-9-7f32cafe`（单页选段，还混入 VI.8.11，并非 VI.9 全篇）
- 明显截断：
  - `ru-the-republic-book-iii-baa7aaf9`、`ru-the-republic-book-v-1381ba5c`
  - `ru-the-principles-of-psychology-chapter-ix-0304c208`
  - `ru-the-wealth-of-nations-book-v-chapter-1-part-iii-51161738`
  - `ru-the-economics-of-biodiversity-the-dasgupta-revie-preface-preface-8c1c2502`
  - `ru-metaphysics-book-vii-chapter-17-a6557f61`
  - `ru-brihadaranyaka-upanishad-section-2-3-fdee26aa`（末尾孤立 OCR 字符 `h`）
  - `ru-tattvartha-sutra-chapter-5-c5db8f52`
- 上级单元或整书代替登记章节：
  - `ru-confessions-book-viii-chapter-9-f8fe51a5` 实为《忏悔录》第 VIII 卷第 1–12 章，并带广告与站点页脚，不是第 9 章。
  - `ru-experiments-in-plant-hybridisation-whole-work-fb497fb0` 实为 1,080 段的整本 *Mendel's Principles of Heredity*（含编者材料、书目和录入说明），不是孟德尔论文这一完整作品单元。
  - `ru-introduction-to-the-principles-of-human-knowledg-introduction-introduction-24de99dd` 在 Introduction 前带 Author's Preface。
  - `ru-evidential-analysis-of-the-meanings-of-terms-in--named-chapter-principle-56d7f81f` 在“理”篇前带整篇序言。
  - `ru-on-the-principles-of-political-economy-and-taxat-preface-preface-11db4edc` 在序言后继续收进目录。

### 3. 网页导航、页眉页脚和相邻章节标题

现有 `edgeChromePattern` 报 0，但人工扩展扫描有明确漏报：

- 7 个 CText 页尾：4 个《论语》单元、`ru-mencius-gaozi-i-named-chapter-gaozi-i-e7938a68`、`ru-han-feizi-difficulties-one-named-chapter-difficulties-one-ae5282f5`、`ru-han-feizi-five-vermin-named-chapter-five-vermin-c0de31d3`，均保留 `Comments? Suggestions?...`。
- 11 个 New Advent 单元保留 `CONTACT US | ADVERTISE WITH NEW ADVENT`；其中 Confessions VIII.9 还含募捐广告、版权与联系信息。其余为 9 个 Summa 问题单元及 `ru-tractate-29-on-the-gospel-of-john-whole-work-3619c2e1`。
- 3 个 Econlib 单元保留 `Categories: ...`：Bentham Chapter I、Marshall Book V Chapter 3、Mill Book IV Chapter VI。
- `ru-summa-contra-gentiles-chapter-7-d7bd109c` 保留模板文本 `VIEWNAME is workSection`。
- `ru-yoga-sutra-book-i-74383838` 有 23 处 `Digitized by Google` 扫描水印。
- 23 个 Wikisource 正文含作品/译者/页码/页面编号等站点目录头；最集中的是 Tractatus 主命题 1、4、5、6、7，另见 Leviathan、Seneca letters、Enneads、Newton、Tagore 等。作品与译本信息应留在元数据层，不应混进作者正文。
- 相邻单元标题被收在尾部：Groundwork Section I (`SEC_2`)、Phenomenology of Spirit Introduction (`CONSCIOUSNESS`)、Hegel self-consciousness section (`The Unhappy Consciousness`)、Theological-Political Treatise Chapter 15（endnotes 标题）、Acaranga I.2.3（下一 lesson 标题）。这些标题应作为结束边界，不应成为本篇最后一段。

### 4. source-overrides 当前配置会使重点测试失败

当前（已受并发写入影响）覆盖表结构对应关系本身正常：660 个 inventory ID 中，121 个 `byUnitId` 全部存在；70 个 `bySourceUrl` 全部命中 inventory source URL；所有 `localPath` 都存在；没有陈旧 unit key 或 source key。

但 `node --test tests/reading-unit-source-overrides.test.mjs` 当前失败。5 个新覆盖把 `maximumUnitCharacters` 设为 100000 或 150000，而测试/模式要求 `> 150000`：Lewin whole work、Pavlov Lectures II+IV、Watson Chapter IX、Veblen Chapter 3、Jevons Chapter III。发布前需统一配置与模式约束，不能带红测进入最终构建。

## 可接受或无需据此返工

- 基线 2 个自动边界风险中，`Cosmos Volume I Preface` 是 OCR 页码使首段以小写 `p 7` 开始，正文实际从作者序言标题到 Potsdam 落款，属于误报；Maxwell Part I 以脚注结束也不代表跨章，边界本身可接受。
- 极短不等于不完整。通书第十四章（71 字）、老子第二十二章（115 字）、《金狮子章》因陀罗网门（119 字）、明缘起第一（151 字）、Tractatus 命题 7（145 字）均可作为短而完整的自然单元；不应仅按字符数扩写成整书。
- 同一 source URL 下未发现相同 `contentHash` 的重复正文；启动基线 orphan body 为 0。
- `byUnitId.url` 与 inventory 主 URL 不同的 12 项均是有意的可抓取版本/原始文本替换（如 GitHub raw、Wikisource 章节页、Econlib chapter URL），不是 sourceId 漂移。

## 并发与最终复核

本报告按启动快照取证；审计期间其他代理持续增加正文和覆盖配置，所以正文数从 447 增至 462、缺失数从 73 降至 58，`byUnitId` 也从启动时 109 增至 121。上述“已清零”与配置计数可能继续过时。等所有写入结束后，应重跑严格锚点、全正文 chrome（不只首尾 8 段）、natural-unit 边界和覆盖表测试；当前自动审计的 `chromeFindings: 0` / `boundaryRisks: 0` 不能替代本报告列出的人工必修项。
