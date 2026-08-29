# AGORA / 未定稿完整收束报告

> 这是 0.3.2 的历史快照；0.4.0 的最终结果见
> [`completion-summary-2026-08-29.md`](./completion-summary-2026-08-29.md)。

完成日期：2026-08-28

## 完成结论

- 完整公开目录：1,452 张双语卡，覆盖西方哲学、中国哲学、毛选、科学、经济、心理学与印度哲学七个内容库。
- 原文节选：890 张；命题整理：562 张；待升级、未处置与待核展示卡均为 0。
- 890 张原文节选全部具备篇章级语境、使用依据、双语人工重点和逐卡“读深一层”；缺口均为 0。
- 西方哲学与中国哲学的 521 张已核原文卡均使用逐卡静态读解，不再由运行时模板批量生成。
- 1,452 张公开卡全部登记一张对应插图；没有缺图、重复登记或未解析的思想 ID。
- 没有自动删除任何卡片。93 组删除、合并或修复建议已单独列出，等待产品负责人确认。

## 本轮新增或升级的原文节选

本轮将下列 10 张卡补成可审计的短篇原文节选，并同步补齐版本定位、使用依据、相邻语境、辨析边界、双语人工重点和“读深一层”：

1. `heidegger-language-house`
2. `sartre-condemned-free`
3. `camus-sisyphus-happy`
4. `economics-hayek-price-signal`
5. `economics-investment-buffett-fractional-ownership`
6. `economics-investment-buffett-intrinsic-value`
7. `economics-investment-buffett-price-and-opinion`
8. `economics-investment-buffett-economic-moat`
9. `economics-investment-buffett-long-holding`
10. `economics-investment-buffett-nonprofessional-indexing`

这些卡均有对应插图。另为 `husserl-eidetic-variation` 新制并登记了更贴合命题的插图；旧的 `husserl-lived-body-v1.webp` 只移入可逆研究归档，没有永久删除。

## 原文材料与后续价值

- 本地原文缓存共 291 个制品、832,467,116 字节（793.9 MiB），SHA-256 重复组为 0。
- 缓存清单记录路径、字节数和 SHA-256；原文登记表记录卡片 ID、版本、篇章定位、使用依据与公开核验入口。
- 这些材料已经用于“读深一层”的相邻语境、概念边界、版本说明和人工重点，并可继续用于版本对勘、把命题整理升级为短篇节选、扩充思想关系和专题阅读路径。
- 原始 PDF、全文与研究摘录只保存在本地研究缓存，不进入网站或扩展发布包。

## 等待确认的删改建议

`deletion-candidates-for-confirmation.md` 汇总 93 组建议：跨库 10 组、西方／中国 9 组、毛选／科学 17 组、经济 21 组、心理 22 组、印度哲学 14 组。清单区分高置信重复、同论证重叠、密集主题合并与仅需修复来源的卡片；执行前应先选定保留卡、迁移独有语境和关系，再归档旧卡与插图。

## 构建与发布验证

- `npm test`：103/103 通过；网站生产构建与 Chrome 扩展构建均通过。
- `npm run lint`：通过。
- `npm run content:audit -- check`：通过，0 条警告。
- `npm run validate:illustrations`：1,452 张登记插图通过。
- `npm run validate:store-assets:v7`：32 个上传文件和 4 张联系表通过。
- `git diff --check`：通过。
- 扩展入口由 2,568,426 字节拆分至 289.62 kB（gzip 90.95 kB）；七个离线内容库各有独立目录块，来源档案、逐卡读解与插图继续按需加载。
- 发布包：`release/agora-philosophy-0.3.2.zip`，150,655,400 字节，共 1,488 个文件；压缩数据完整，未包含 `research/`、来源缓存、PDF 或研究文本。
- SHA-256：`5b1d0413122e578ff4dfc46c3f3038e9e072787212ee743b27cef664e7836c23`。

## 发布边界

0.3.2 的本地发布包、商店素材与发布说明均已准备好；本轮没有执行 Chrome Web Store 上传、Git 提交、推送或任何外部发布动作。
