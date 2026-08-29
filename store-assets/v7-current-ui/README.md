# 未定稿 / NOTHING FINAL · Chrome Web Store Assets V7

V7 使用当前产品界面的真实截图与新版圆环标志，视觉方向见
[`ART-DIRECTION.md`](./ART-DIRECTION.md)。本目录独立于 V2–V6，生成流程不会修改旧版素材。

## 输入

每种语言必须提供以下五张 `1280×720` 当前界面截图：

```text
source/screenshots/
├── zh-CN/
├── zh-TW/
└── en/
    ├── 01-home.png
    ├── 02-collections.png
    ├── 03-detail-network.png
    ├── 04-thoughtbook.png
    └── 05-share.png
```

文件扩展名保持为 `.png`；流程会把截图统一转换为真正的 sRGB RGB PNG。
新版标志的图形源取自经过确认的 V6 SVG；生成时只读取圆环图形，并把名称与
无障碍说明更新为「未定稿 / NOTHING FINAL」，再写入
`source/store-icon-128.svg`。旧版目录不会被修改。

## 命令

先启动当前版本的本地开发服务器，再从真实界面原子重拍三种语言的全部截图：

```bash
npm run dev
npm run capture:store-assets:v7
```

捕获默认读取 `http://localhost:3000`，使用本机 Chrome，输出 `1280×720` 源截图。
可分别用 `NOTHING_FINAL_STORE_PREVIEW_URL` 和 `CHROME_PATH` 覆盖页面地址与 Chrome
可执行文件；旧的 `AGORA_STORE_PREVIEW_URL` 变量仍兼容。捕获先写入同盘临时目录，三种
语言共十五张全部通过尺寸和格式检查后，才会原子替换 `source/screenshots/`。

先只检查输入截图：

```bash
npm run validate:store-assets:v7 -- --sources
```

生成整套素材（生成前自动预检，生成后自动严格校验）：

```bash
npm run generate:store-assets:v7
```

单独复核已生成结果：

```bash
npm run validate:store-assets:v7
```

## 输出

```text
upload/
├── zh-CN/
├── zh-TW/
├── en/
└── global/
    ├── screenshot-01-home-1280x800.png
    ├── screenshot-02-collections-1280x800.png
    ├── screenshot-03-detail-network-1280x800.png
    ├── screenshot-04-thoughtbook-1280x800.png
    ├── screenshot-05-share-1280x800.png
    ├── small-promo-440x280.png
    ├── marquee-1400x560.png
    └── store-icon-128.png

preview/
├── zh-CN-contact-sheet.png
├── zh-TW-contact-sheet.png
├── en-contact-sheet.png
└── global-contact-sheet.png
```

`global` 是英文商店素材的逐字节副本，便于在 Chrome Web Store 的全球通用资源区上传；
各语言目录可直接用于对应本地化资源。商店截图和宣传图均为无透明通道的 24 位 PNG，
只有商店图标保留透明通道。

## 生成约束

- 五张商店截图只在真实界面截图上增加一次统一页眉，不把旧商店图再次套框。
- 宣传图直接取当前界面截图与新版标志，不复用 V2–V6 成品。
- 每个上传成品最多一次合成；`asset-manifest.json` 记录输入、来源、哈希与合成次数。
- 生成采用临时目录并通过全部校验后原子替换 V7 输出，失败时保留上一套有效结果。
- 校验器会拒绝错误尺寸、伪 PNG、非 sRGB、上传图透明通道、缺失文件、文件名漂移或旧版成品来源。
