# AGORA｜哲学新标签页

> 一页，一种思想。

[![CI](https://github.com/NorthGateChat/agora-philosophy/actions/workflows/ci.yml/badge.svg)](https://github.com/NorthGateChat/agora-philosophy/actions/workflows/ci.yml)
[![Code license: GPL-3.0-or-later](https://img.shields.io/badge/code-GPL--3.0--or--later-5c5142.svg)](LICENSE)
[![Content license: CC BY-SA 4.0](https://img.shields.io/badge/content-CC%20BY--SA%204.0-a47c45.svg)](CONTENT_LICENSE.md)

AGORA 把浏览器新标签页变成一张可以继续展开的哲学手稿：先看一句命题，再进入双语译写、解释，以及它的思想来处、同题异答与后续回响。

名字来自古希腊的 Agora——人们相遇、讨论与辩论的公共广场。它不是“哲学金句大全”，而是一个轻量入口：每个观点都有语境，每次打开都可以多走一步。

![AGORA 首页：全屏哲学命题与双语译写](store-assets/screenshot-1280x800-main.png)

## 当前能力

- 27 位哲学家与多主题命题，支持简体中文、繁体中文和英文
- 中文模式默认同时显示英文译写，可在设置中关闭
- 思想来处、同题异答、后续回响和双观点对读
- 三种独立设计的视觉主题、轻微环境动效、全屏单焦点布局
- 鼠标、触摸与键盘操作：`←`、`→`、`Space`、`Enter`、`F`、`S`、`D`、`Esc`
- 一键把当前思想保存为 1080×1350 PNG
- Chrome Manifest V3 新标签页扩展：零权限、无后台脚本、无远程代码、离线可用
- 偏好和收藏只保存在当前站点或扩展自己的 `localStorage` 中

## 立即使用

- [Chrome Web Store](https://chromewebstore.google.com/detail/imejfeghpobgmbnebcmmndkghbcmjcca)
- [隐私说明](docs/PRIVACY.md)
- [内容方法与来源原则](docs/CONTENT-METHODOLOGY.md)

## 本地开发

需要 Node.js `>=22.13.0`。

```bash
npm install
npm run dev -- --port 3001
```

打开 `http://localhost:3001/`。提交前运行完整检查：

```bash
npm run lint
npm test
```

## 构建 Chrome 扩展

```bash
npm run build:extension
```

生成目录为 `extension-dist/`。在 `chrome://extensions/` 开启开发者模式，选择“加载已解压的扩展程序”，然后选中该目录。

生成可上传到 Chrome Web Store 的 ZIP：

```bash
npm run package:extension
```

产物位于 `release/`；商店图标、截图与宣传图位于 `store-assets/`。

## 项目结构

```text
app/                     网站与扩展共享的 React 体验
content/philosophy.ts    命题目录与思想关系
extension/               Chrome 新标签页入口
scripts/                 扩展清单、图标、素材与 ZIP 生成
tests/                   SSR、本地化、品牌与扩展产物检查
docs/                    内容、品牌、隐私与发布说明
brand.json               品牌、版本、链接与多语言描述
```

## 内容不是逐字引文

首页句子是面向短阅读场景的“命题译写”：以所列作品或思想传统为线索，由项目重新表述，不冒充权威版本的逐字翻译。思想关系也区分直接影响、传统中介与编辑性重构；“呼应”或“分歧”不等于存在直接引用。

如果你发现归属、作品、年代、翻译或思想关系存在问题，请提交[内容纠错](https://github.com/NorthGateChat/agora-philosophy/issues/new?template=content-correction.yml)，并尽量提供原典位置或可靠研究来源。

## 独立设计与来源说明

AGORA 的产品类别研究参考过若干诗词、语录和知识型新标签页产品，但没有复制它们的源代码、数据、字体、插画或动画算法。界面系统、哲学内容模型、思想脉络交互和三个视觉主题均在本项目内独立实现。更完整的设计边界见[设计来源说明](docs/DESIGN-PROVENANCE.md)。

AI 参与了部分代码协作、编辑性译写与文案整理；AI 输出从不被当作史料来源。公开内容仍需要人的复核和可追溯来源，详见 [AI 使用声明](docs/AI-USE.md)。

## 参与贡献

欢迎修复错误、改进无障碍体验、补充可靠来源，或提出新的思想关系。内容贡献与代码贡献的要求见 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 许可证

| 范围 | 许可证 |
| --- | --- |
| 源代码 | [GNU GPL v3 或更高版本](LICENSE) |
| 项目原创文本、数据结构与视觉素材 | [CC BY-SA 4.0](CONTENT_LICENSE.md) |
| AGORA 名称、标志和商店识别 | 保留商标权利，见 [TRADEMARKS.md](TRADEMARKS.md) |
| 第三方依赖 | 各自许可证 |

哲学家姓名、年代、作品名等事实不因收录在本仓库而产生新的专有权利；公共领域原典仍保持公共领域状态。
