# Chrome Web Store 素材

建议类别：**教育（Education）**。「未定稿 / NOTHING FINAL」的核心用途是通过新标签页阅读、理解和关联哲学、科学、经济、心理等领域的思想与知识，教育比“工具”更准确。

## 0.4.0 上传目录

0.4.0 只从 V7 当前界面资产上传：

- 全球通用素材：`store-assets/v7-current-ui/upload/global/`
- 简体中文素材：`store-assets/v7-current-ui/upload/zh-CN/`
- 繁体中文素材：`store-assets/v7-current-ui/upload/zh-TW/`
- 英文本地化素材：`store-assets/v7-current-ui/upload/en/`

`store-assets/` 根目录中的旧截图和宣传图只为历史兼容及旧文档引用保留，不是 0.4.0
发布输入，不要上传，也不要用它们覆盖 V7 成品。V7 的可重复捕获、生成与校验说明见
[`v7-current-ui/README.md`](./v7-current-ui/README.md)。

| 文件 | 尺寸 | 用途 |
| --- | ---: | --- |
| `store-icon-128.png` | 128×128 | 商店图标；扩展 ZIP 内也包含同规格图标 |
| `small-promo-440x280.png` | 440×280 | 小型宣传图，商店必需 |
| `marquee-1400x560.png` | 1400×560 | Marquee 宣传图，可选 |
| `screenshot-01-home-1280x800.png` | 1280×800 | 首页真实体验，商店截图 1 |
| `screenshot-02-collections-1280x800.png` | 1280×800 | 内容库选择，商店截图 2 |
| `screenshot-03-detail-network-1280x800.png` | 1280×800 | 读深一层、读所在篇章与思想关联，商店截图 3 |
| `screenshot-04-thoughtbook-1280x800.png` | 1280×800 | 思想册，商店截图 4 |
| `screenshot-05-share-1280x800.png` | 1280×800 | 多比例分享工作台，商店截图 5 |

## 后台上传位置

- **全球通用资源**：从 `store-assets/v7-current-ui/upload/global/` 上传图标、五张截图与宣传图。
- **当地语言资源**：从对应的 `upload/zh-CN/`、`upload/zh-TW/`、`upload/en/` 上传同名文件；不要跨语言复用截图。
- **屏幕截图顺序**：依次上传 `screenshot-01-home-1280x800.png`、`screenshot-02-collections-1280x800.png`、`screenshot-03-detail-network-1280x800.png`、`screenshot-04-thoughtbook-1280x800.png`、`screenshot-05-share-1280x800.png`。
- **小型宣传图块**：同一目录中的 `small-promo-440x280.png`。
- **顶部宣传图块**：同一目录中的 `marquee-1400x560.png`。
- **商店图标**：同一目录中的 `store-icon-128.png`。
- **宣传视频**：可留空，等有真实演示视频后再填 YouTube 链接

商店图标是带透明留白的 128×128 PNG；五张产品截图与两张宣传图均为无透明通道的 24 位 RGB PNG。

根目录的 `screenshot-1280x800-context.png` 等旧命名文件是历史兼容副本，不要上传。

`public/social-share.png`（1200×630）用于网站链接预览和社交媒体，不上传到 Chrome Web Store。

发布前如 UI 有变化，运行 `npm run capture:store-assets:v7` 实拍 `1280×720` 当前界面，再运行
`npm run generate:store-assets:v7` 生成带统一页眉的 `1280×800` 上传图，最后运行
`npm run validate:store-assets:v7` 严格校验；不要以扩展构建命令代替 V7 素材流程。
