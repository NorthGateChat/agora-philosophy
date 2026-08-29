import path from "node:path";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));

export const PROJECT_ROOT = path.resolve(here, "..");
export const BRAND = JSON.parse(
  readFileSync(path.join(PROJECT_ROOT, "brand.json"), "utf8"),
);
export const VERSION_ROOT = path.join(
  PROJECT_ROOT,
  "store-assets/v7-current-ui",
);
export const SOURCE_ROOT = path.join(VERSION_ROOT, "source");
export const SCREENSHOT_SOURCE_ROOT = path.join(SOURCE_ROOT, "screenshots");
export const UPLOAD_ROOT = path.join(VERSION_ROOT, "upload");
export const PREVIEW_ROOT = path.join(VERSION_ROOT, "preview");
export const MANIFEST_PATH = path.join(VERSION_ROOT, "asset-manifest.json");

export const PIPELINE_VERSION = 7;
export const SOURCE_LOCALES = ["zh-CN", "zh-TW", "en"];
export const TARGET_LOCALES = [...SOURCE_LOCALES, "global"];
export const GLOBAL_SOURCE_LOCALE = "en";

export const SOURCE_CAPTURE_SIZE = { width: 1280, height: 720 };
export const SCREENSHOT_SIZE = { width: 1280, height: 800 };
export const SMALL_PROMO_SIZE = { width: 440, height: 280 };
export const MARQUEE_SIZE = { width: 1400, height: 560 };
export const ICON_SIZE = { width: 128, height: 128 };
export const CONTACT_SHEET_SIZE = { width: 1600, height: 1840 };

export const PALETTE = {
  ink: "#171715",
  ivory: "#f3efe6",
  paper: "#e8e1d5",
  muted: "#979086",
  orange: "#d97757",
};

export const FONT_PATHS = {
  sans: path.join(
    "/Users/alanxrhuang/.codex/skills/canvas-design/canvas-fonts",
    "InstrumentSans-Regular.ttf",
  ),
  serif: path.join(
    "/Users/alanxrhuang/.codex/skills/canvas-design/canvas-fonts",
    "Gloock-Regular.ttf",
  ),
};

export const V6_ICON_SOURCE = path.join(
  PROJECT_ROOT,
  "store-assets/v6-agora-dialogue/source/store-icon-128.svg",
);
export const V7_ICON_SOURCE = path.join(SOURCE_ROOT, "store-icon-128.svg");

export const SCENES = [
  {
    index: 1,
    key: "home",
    sourceFile: "01-home.png",
    outputFile: "screenshot-01-home-1280x800.png",
  },
  {
    index: 2,
    key: "collections",
    sourceFile: "02-collections.png",
    outputFile: "screenshot-02-collections-1280x800.png",
  },
  {
    index: 3,
    key: "detail-network",
    sourceFile: "03-detail-network.png",
    outputFile: "screenshot-03-detail-network-1280x800.png",
  },
  {
    index: 4,
    key: "thoughtbook",
    sourceFile: "04-thoughtbook.png",
    outputFile: "screenshot-04-thoughtbook-1280x800.png",
  },
  {
    index: 5,
    key: "share",
    sourceFile: "05-share.png",
    outputFile: "screenshot-05-share-1280x800.png",
  },
];

export const STATIC_UPLOAD_ASSETS = [
  { kind: "small-promo", file: "small-promo-440x280.png", ...SMALL_PROMO_SIZE },
  { kind: "marquee", file: "marquee-1400x560.png", ...MARQUEE_SIZE },
  { kind: "store-icon", file: "store-icon-128.png", ...ICON_SIZE },
];

export const EXPECTED_UPLOAD_FILES = [
  ...SCENES.map((scene) => scene.outputFile),
  ...STATIC_UPLOAD_ASSETS.map((asset) => asset.file),
];

export const COPY = {
  "zh-CN": {
    scenes: {
      home: {
        eyebrow: "每一次打开",
        title: "让新标签，留出思考的一页。",
        detail: "随机遇见 · 双语阅读 · 原创配图",
      },
      collections: {
        eyebrow: "选择你的内容",
        title: "哲学、经济、心理，也包括你的知识。",
        detail: "预设知识库 · 自定义导入 · 随时切换",
      },
      "detail-network": {
        eyebrow: "读深一层",
        title: "从短引进入篇章，也看见思想之间的联系。",
        detail: "所在篇章 · 解读 · 观点对读",
      },
      thoughtbook: {
        eyebrow: "值得留下的",
        title: "把读过的、收藏的，放回自己的思想册。",
        detail: "收藏 · 最近读过 · 已屏蔽",
      },
      share: {
        eyebrow: "带走一则思想",
        title: "把值得留下的，保存成一张卡片。",
        detail: "多种比例 · 复制文本 · 系统分享",
      },
    },
    small: ["每天打开一页，", "换一种看法。"],
    marquee: {
      title: ["让每一次新标签，", "都多一种看法。"],
      subtitle: "哲学、经济、心理，以及你自己的知识。",
      kicker: "思想，在语境中",
    },
  },
  "zh-TW": {
    scenes: {
      home: {
        eyebrow: "每一次打開",
        title: "讓新分頁，留出思考的一頁。",
        detail: "隨機遇見 · 雙語閱讀 · 原創配圖",
      },
      collections: {
        eyebrow: "選擇你的內容",
        title: "哲學、經濟、心理，也包括你的知識。",
        detail: "預設知識庫 · 自訂匯入 · 隨時切換",
      },
      "detail-network": {
        eyebrow: "讀深一層",
        title: "從短引進入篇章，也看見思想之間的聯繫。",
        detail: "所在篇章 · 解讀 · 觀點對讀",
      },
      thoughtbook: {
        eyebrow: "值得留下的",
        title: "把讀過的、收藏的，放回自己的思想冊。",
        detail: "收藏 · 最近讀過 · 已屏蔽",
      },
      share: {
        eyebrow: "帶走一則思想",
        title: "把值得留下的，保存成一張卡片。",
        detail: "多種比例 · 複製文字 · 系統分享",
      },
    },
    small: ["每天打開一頁，", "換一種看法。"],
    marquee: {
      title: ["讓每一次新分頁，", "都多一種看法。"],
      subtitle: "哲學、經濟、心理，以及你自己的知識。",
      kicker: "思想，在語境中",
    },
  },
  en: {
    scenes: {
      home: {
        eyebrow: "EVERY NEW TAB",
        title: "Make room for a thought.",
        detail: "Curated ideas · bilingual reading · original artwork",
      },
      collections: {
        eyebrow: "CHOOSE YOUR FIELD",
        title: "Philosophy, economics, psychology—and your own.",
        detail: "Built-in collections · custom imports · switch anytime",
      },
      "detail-network": {
        eyebrow: "READ DEEPER",
        title: "Move from an excerpt into its passage—and its connections.",
        detail: "Containing passage · interpretation · ideas in relation",
      },
      thoughtbook: {
        eyebrow: "KEEP WHAT MATTERS",
        title: "Return to what you saved and recently read.",
        detail: "Saved · recent · hidden",
      },
      share: {
        eyebrow: "CARRY IT FORWARD",
        title: "Turn a thought into a card worth keeping.",
        detail: "Multiple ratios · copy text · system share",
      },
    },
    small: ["A quieter way to", "open a new tab."],
    marquee: {
      title: ["A new tab for ideas", "worth returning to."],
      subtitle: "Philosophy, economics, psychology—and your own knowledge.",
      kicker: "IDEAS, IN CONTEXT",
    },
  },
};

export function uploadDirectory(root, locale) {
  return path.join(root, "upload", locale);
}

export function contactSheetPath(root, locale) {
  return path.join(root, "preview", `${locale}-contact-sheet.png`);
}

export function relativeToProject(filePath) {
  return path.relative(PROJECT_ROOT, filePath).split(path.sep).join("/");
}
