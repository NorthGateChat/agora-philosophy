# Chrome Web Store 素材

建议类别：**教育（Education）**。AGORA 的核心用途是通过新标签页阅读、理解和关联西方哲学观点，教育比“工具”更准确。

| 文件 | 尺寸 | 用途 |
| --- | ---: | --- |
| `store-icon-128.png` | 128×128 | 商店图标；扩展 ZIP 内也包含同规格图标 |
| `small-promo-440x280.png` | 440×280 | 小型宣传图，商店必需 |
| `marquee-1400x560.png` | 1400×560 | Marquee 宣传图，可选 |
| `screenshot-1280x800-main.png` | 1280×800 | 首页真实体验截图，商店截图 1 |
| `screenshot-1280x800-context.png` | 1280×800 | 思想脉络详情真实体验截图，商店截图 2 |

## 后台上传位置

- **商店图标**：`store-icon-128.png`
- **全球通用的屏幕截图（必填回退素材）**：依次上传 `screenshot-1280x800-main.png`、`screenshot-1280x800-context.png`
- **以当地语言显示的屏幕截图（简体中文）**：可以复用上面两张；它们本身就是简中主界面并同时呈现英文原句
- **小型宣传图块**：`small-promo-440x280.png`
- **顶部宣传图块**：`marquee-1400x560.png`
- **宣传视频**：可留空，等有真实演示视频后再填 YouTube 链接

商店图标是带透明留白的 128×128 PNG；两张产品截图与两张宣传图均为无透明通道的 24 位 RGB PNG。

`public/social-share.png`（1200×630）用于网站链接预览和社交媒体，不上传到 Chrome Web Store。

图标与宣传图会由 `npm run build:extension` 重新生成；两张产品截图不会自动生成。发布前如 UI 有变化，应重新截取 1280×800、无边框、无留白的真实页面，并运行 `npm run test:extension` 校验格式、尺寸与透明通道。
