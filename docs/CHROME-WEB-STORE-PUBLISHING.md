# 未定稿 / NOTHING FINAL Chrome Web Store 发布手册

适用产品：**未定稿｜思想与知识新标签页** / **NOTHING FINAL — Ideas on Every New Tab**

口号：**一页，一种思想。 / One page, one idea.**

这份手册按“本地验收 → 商店资料 → 提交审核 → 后续更新”的实际顺序编写。首次发布建议完整走一遍；以后更新可从“版本更新”一节开始。

## 1. 发布前准备

### 账号与安全

1. 使用长期可维护的 Google 账号登录 [Chrome Web Store Developer Dashboard](https://developer.chrome.com/docs/webstore/register)。
2. 完成开发者注册并支付一次性注册费用；费用与可用支付方式以后台当日显示为准。
3. 为该 Google 账号开启两步验证。Chrome Web Store 要求发布者启用两步验证，详见 [Program Policies](https://developer.chrome.com/docs/webstore/program-policies/policies)。
4. 在开发者后台验证发布者联系邮箱。不要使用临时邮箱，后续审核、违规通知和账号恢复都会用到它。

### 发布者必须确认的内容

- 核对 `docs/PRIVACY.md` 的生效日期、维护者与 GitHub 联系／私密漏洞报告入口，并把隐私说明发布到任何人无需登录即可访问的 HTTPS 地址。
- 核对产品名、图标、宣传图中没有第三方商标或未经授权的视觉素材。
- 逐条核验预设内容的原始版本、译文版权、作者与书名归属。原文节选可以采用三种依据：公共领域、覆盖本用途的开放许可，或为介绍、评论作品所必需的适当引用／合理使用；不要求每条短引文都先取得单独授权。
- 对适当引用／合理使用条目执行逐条检查：作品已经发表；只摘不可再缩的完整短句或连续分句；卡片实际解释该句；明确作者、作品、位置与核查链接；不得以多卡拼接方式实质替代原作。[美国版权局的说明](https://www.copyright.gov/help/faq/faq-fairuse.html)也明确指出，评论、批评和学术报告可以使用作品的有限部分（包括引文），但不存在固定安全字数，仍应综合具体情形判断。
- 将发布地区纳入版权复核：美国公版不自动等于全球公版；标为“仅确认美国公版”的材料在其他地区可以另行依据当地适当引用规则复核，不必机械删除，但不能把美国公版结论表述成全球授权。
- 公开全文页、机构扫描或可下载 PDF 只是逐字核查入口，不自动授予再发布许可；这不妨碍项目对已发表作品作必要、署名且不替代原作的短篇幅引用。中国著作权法第24条列明，为介绍、评论作品或说明问题而适当引用，可以不经许可使用，但须指明作者和作品且不得影响正常使用或不合理损害权利人利益。
- 不使用“最全”“权威收录全部思想”等无法持续证明的表述。推荐使用“七个预设内容库”“原文、出处与解读”“也可以导入自己的知识集”等可验证描述。
- 确认当前版本不需要账号、不使用分析 SDK、不发送网络请求，也不申请 Chrome 权限；若未来增加任一能力，必须先更新隐私说明和商店披露。本文中的“零权限”特指 `manifest.json` 不声明 `permissions`、`host_permissions` 及其可选版本。

## 2. 构建发布包

先在 `brand.json`、`package.json` 与 `package-lock.json` 中使用同一个、且高于已发布版本的版本号，再在仓库根目录执行：

```bash
npm ci
npm run lint
npm test
npm run package:extension
```

成功后应得到：

- `extension-dist/`：用于本地“加载已解压的扩展程序”；
- `release/agora-philosophy-<版本号>.zip`：上传 Chrome Web Store 的 ZIP；
- `store-assets/v7-current-ui/upload/{global,zh-CN,zh-TW,en}/`：0.4.1 商店图标、截图和宣传图上传素材。

上传前检查 ZIP：

```bash
unzip -l release/agora-philosophy-<版本号>.zip
```

`manifest.json` 必须位于 ZIP 根目录，不能被额外包在一层文件夹内。发布包不应包含源码、`.env`、测试文件、系统隐藏文件或密钥。

## 3. 本地安装与验收

按照 Chrome 官方的 [Load an unpacked extension](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked) 流程：

1. 打开 `chrome://extensions/`。
2. 打开右上角“开发者模式”。
3. 点击“加载已解压的扩展程序”。
4. 选择项目里的 `extension-dist/` 文件夹。
5. 新建标签页，确认 Chrome 的新标签页已被“未定稿 / NOTHING FINAL”接管。

至少完成这些验收项：

- 首次安装会按浏览器语言选择简体中文、繁体中文或英文；中文模式默认同时显示英文；
- 简体中文、繁体中文、英文三种语言模式都能切换，作者名、书名、设置项同步变化；
- 西方哲学、中国哲学、毛选、科学、经济、心理、印度哲学和自定义知识集均能选择；
- 上一则、下一则、收藏、屏蔽、详情、内容库与主题切换及界面所标注的快捷键均可用；
- 点击卡片可打开详情，详情正确区分原文节选、命题整理和待核摘录，并展示来源、解读、相关观点与当下问题；
- 自定义知识集可以创建、导入、切换、导出与删除，且不会向外发送内容；
- 刷新、新开标签页和重启 Chrome 后，语言、主题、内容库、收藏、屏蔽与自定义知识仍保留；
- 断网后核心页面仍可使用，开发者工具 Network 面板没有向第三方发送请求；
- 文字不抖动，较长句子按标点自然断行，常用桌面分辨率下不出现单字孤行；
- 键盘 Tab 焦点清晰，Esc 可关闭弹层，系统开启“减少动态效果”时不会出现强制动画；
- 扩展详情页显示“无需任何权限”，浏览器控制台无报错。

Chrome 新标签页覆盖的官方说明见 [Override Chrome pages](https://developer.chrome.com/docs/extensions/develop/ui/override-chrome-pages)。

## 4. 准备商店素材

尺寸与格式以 [Chrome Web Store images](https://developer.chrome.com/docs/webstore/images) 和发布后台的即时校验为准。当前应准备：

| 素材 | 规格 | 建议内容 |
|---|---:|---|
| 商店图标 | 128 × 128 PNG | “未定稿 / NOTHING FINAL”断环标记，四周保留透明安全区，小尺寸仍清楚 |
| 产品截图 | 1280 × 800 或 640 × 400，至少 1 张、最多 5 张 | 首页卡片、读深一层、内容库与自定义知识、主题、分享工作台；不要叠加虚假浏览器按钮 |
| 小型宣传图 | 440 × 280 | 产品名、Slogan 与当前产品一致的视觉语言，避免堆字 |
| Marquee 宣传图 | 1400 × 560，可选 | 用于获得更多商店展示机会，保持和产品界面一致 |

截图必须展示当前真实产品，不要放尚未实现的功能。建议首张图只保留一个清晰主张：

> 一页，一种思想。

0.4.1 的全球通用资源只从 `store-assets/v7-current-ui/upload/global/` 上传；简体中文、
繁体中文与英文的本地化资源分别从同级 `zh-CN/`、`zh-TW/`、`en/` 上传。`store-assets/`
根目录的旧截图和宣传图仅作历史兼容，不是本版发布输入，不要误传。上传前执行：

```bash
npm run capture:store-assets:v7
npm run generate:store-assets:v7
npm run validate:store-assets:v7
```

商店素材字段和本地化方式见 [Create a compelling listing page](https://developer.chrome.com/docs/webstore/cws-dashboard-listing)。

## 5. 新建商店条目

1. 进入 Developer Dashboard，点击 **New item / Add new item**。
2. 上传 `release/agora-philosophy-<版本号>.zip`。
3. 在 **Store listing** 填写名称、简短介绍、详细介绍、分类和语言，并上传图标、截图和宣传图。可直接使用 `docs/LAUNCH-PLAYBOOK.md` 中的商店文案。
4. 在 **Privacy practices** 声明产品的单一用途：

   > 在新标签页呈现哲学、思想、科学、经济、心理等精选知识卡或用户自己的知识集，并提供来源与解读，帮助用户在日常浏览间隙持续学习。

5. 权限说明填写“本版本不申请任何 Chrome 权限”；不要为了未来可能用到而预先添加权限。最小权限原则见 [Declare permissions](https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions)。
6. 数据使用项按真实实现填写：不收集、不出售、不向第三方传输用户数据；偏好、收藏、屏蔽与近期记录保存在扩展自己的 `localStorage`，自定义知识主要保存在本地 IndexedDB。本地存储说明见 [Storage and cookies](https://developer.chrome.com/docs/extensions/develop/concepts/storage-and-cookies)。
7. 填入已经公开访问的隐私说明 URL。数据披露要求参见 [User data FAQ](https://developer.chrome.com/docs/webstore/program-policies/user-data-faq) 与 [User Data policy](https://developer.chrome.com/docs/webstore/program-policies/user-data)。
8. 在 **Distribution** 选择发布地区和可见范围。正式首发前可先设为受信测试者可见，验证商店安装包后再公开。
9. Distribution 地区必须与内容使用依据清单一致：美国公版结论只用于美国范围；适当引用条目则按目标地区的引用条件复核。复核的结果可以是继续保留短句、进一步缩短或退回命题整理，不把“缺少单独授权”本身当作否决理由。

## 6. 提交审核与发布

提交前用后台的缺失项提示逐项复查，然后点击 **Submit for review**。完整流程见 [Publish in the Chrome Web Store](https://developer.chrome.com/docs/webstore/publish)。

注意：

- 审核时间没有固定承诺，不要把传播首发安排在“提交审核”的同一分钟；等状态变为可发布或已发布后再发主宣内容。
- 如需对发布时间做最后控制，可使用后台提供的延迟发布能力；延迟窗口以当时后台规则为准。
- 审核补件时只解释真实、当前已实现的行为。不要用“以后不会”替代代码和隐私披露的一致性。
- 被退回时先修正明确问题，再提高版本号并重新打包；不要原包反复提交。

## 7. 版本更新

每次更新都遵循以下顺序：

1. 更新产品版本号，版本必须高于商店当前版本。
2. 更新内容或数据，并重新做引文、译文和关系图谱核验。
3. 如果数据处理、权限或联网行为变化，先改隐私说明和商店披露。
4. 执行完整构建、测试与本地加载验收。
5. 重新运行 `npm run package:extension`，确认 ZIP 根目录与版本号正确。
6. 在原商店条目上传新 ZIP，填写用户能理解的更新说明，再提交审核。

官方更新流程见 [Update your Chrome Web Store item](https://developer.chrome.com/docs/webstore/update)。

推荐版本策略：

- 修正文案、数据或小缺陷：补丁版本，例如 `0.1.0 → 0.1.1`；
- 增加可见功能：次版本，例如 `0.1.1 → 0.2.0`；
- 大范围改变交互或数据结构：主版本，并准备迁移说明。

## 8. 发布完成定义

只有同时满足以下条件，才算完成发布：

- 商店页面可以从公开 Chrome 环境访问；
- 从商店安装后，新标签页功能与本地验收一致；
- 商店隐私披露、公开隐私说明和实际代码行为一致；
- 首批传播链接指向正式商店页，不是本地地址或开发者模式教程；
- 发布者已保存当前 ZIP、商店文案、素材、版本号与审核记录，便于回滚和后续更新。
