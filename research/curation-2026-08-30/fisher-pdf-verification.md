# Fisher 1926 原始 PDF 核查

核查日期：2026-08-30。只读核查；未修改 source override 或 reading inventory。

## 来源与本地文件

- 机构记录：[Rothamsted Research item 20740](https://repository.rothamsted.ac.uk/id/eprint/20740)
- 原始扫描 PDF：[直接下载](https://repository.rothamsted.ac.uk/id/eprint/20740/1/Fisher%20Arrangment%20of%20field%20experiments%20J%20Ministry%20%20of%20Agriculture%201926%20p%20503%20to%20513.pdf)
- 下载副本：`tmp/pdfs/fisher-arrangement-field-experiments-1926-original.pdf`
- 可供 reading-unit 使用的完整论文主体：[fisher-arrangement-field-experiments-1926.txt](../source-cache/reading-unit-derived/fisher-arrangement-field-experiments-1926.txt)

## 技术与目视核查

- `pdfinfo`：13 个 A4 页面、未加密、扫描型 PDF，4,213,576 bytes。
- `pdftotext -layout` 仅得到仓储封页书目信息（45 行），不能直接当作正文；因此以 180 dpi 渲染后 OCR，并逐段与扫描核对。
- PDF 第 1 页为 Rothamsted 仓储封页，第 2 页空白；PDF 第 3–13 页是论文主体，对应印刷页 503–513。扫描底部的 84–94 是装订／重印运行页码，不是期刊页码。
- 已目视检查：PDF 第 3 页（标题与开篇）、第 6 页（印刷 p.506，replication 与 `Errors Wrongly Estimated`）、第 7 页（印刷 p.507，随机化的理由）、第 12 页（印刷 p.512，Figure 1 与复杂实验）、第 13 页（印刷 p.513，结论与参考文献）。字形、段落、页码和关键句均清晰可读。

## 可用的 reading-unit 边界

- 起点：PDF 第 3 页、印刷 p.503，标题 `THE ARRANGEMENT OF FIELD EXPERIMENTS` 及 `The Present Position`。
- 终点：PDF 第 13 页、印刷 p.513，`References` 末尾。
- 这是可整体集成的完整论文主体；纯文本版为 OCR 后清理的派生文本，保留所有散文与参考文献。Figure 1 的二维处理格局不适合线性文本，故以带说明的占位符替代，但原扫描保留以供查看。

## 新增语录／方法段落的精确核对

- `Errors Wrongly Estimated` 起于 PDF 第 6 页、印刷 p.506。
- 句首 “One way of making sure that a valid estimate of error will be obtained is to arrange the plots deliberately at random,” 位于同页底部，连续到 PDF 第 7 页、印刷 p.507 的 “so that no distinction can creep in …”。
- 同一局部阅读段还包括 `The method adopted is that of replication`、随机安排的理论分布理由，以及 `A Necessary Distinction`；推荐读取范围为印刷 pp.506–509（PDF 第 6–9 页），而完整单元仍采用 pp.503–513。

## 书目信息提示

Rothamsted 封页元数据写 `pp. 503-515`，但实际所下载的原刊扫描连续显示并结束于印刷 p.513；正文及参考文献完整结束于 p.513。后续共享元数据应采用该扫描可核的 `pp. 503–513`，或明确说明仓储封页的 503–515 记载与扫描不一致。
