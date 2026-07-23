export type ThoughtCardFormat = "mobile" | "desktop";

export type ThoughtCardExport = {
  quoteEnglish?: string;
  quoteChinese?: string;
  quoteChineseFirst?: boolean;
  author: string;
  work: string;
  palette: readonly [string, string, string, string];
  format?: ThoughtCardFormat;
};

type CardLayout = {
  width: number;
  height: number;
  quoteMaxWidth: number;
  quoteMaxHeight: number;
  bilingualEnglishSize: number;
  bilingualChineseSize: number;
  singleEnglishSize: number;
  singleChineseSize: number;
  minimumScale: number;
  maxEnglishLines: number;
  maxChineseLines: number;
  attributionGap: number;
  accentToAuthor: number;
  authorToWork: number;
  authorSize: number;
  workSize: number;
};

const CARD_LAYOUTS: Record<ThoughtCardFormat, CardLayout> = {
  mobile: {
    width: 1080,
    height: 1350,
    quoteMaxWidth: 852,
    quoteMaxHeight: 760,
    bilingualEnglishSize: 41,
    bilingualChineseSize: 61,
    singleEnglishSize: 62,
    singleChineseSize: 72,
    minimumScale: 0.68,
    maxEnglishLines: 5,
    maxChineseLines: 4,
    attributionGap: 72,
    accentToAuthor: 34,
    authorToWork: 14,
    authorSize: 30,
    workSize: 19,
  },
  desktop: {
    width: 1600,
    height: 900,
    quoteMaxWidth: 1240,
    quoteMaxHeight: 460,
    bilingualEnglishSize: 43,
    bilingualChineseSize: 64,
    singleEnglishSize: 66,
    singleChineseSize: 76,
    minimumScale: 0.6,
    maxEnglishLines: 4,
    maxChineseLines: 3,
    attributionGap: 52,
    accentToAuthor: 26,
    authorToWork: 10,
    authorSize: 26,
    workSize: 17,
  },
};
const SANS_FONT = '"PingFang SC", "Microsoft YaHei", "Noto Sans CJK SC", sans-serif';
const SERIF_FONT = '"Songti SC", "STSong", "Noto Serif CJK SC", serif';

function rgba(hex: string, opacity: number) {
  const normalized = hex.replace("#", "");
  if (!/^[\da-f]{6}$/i.test(normalized)) return hex;
  const red = Number.parseInt(normalized.slice(0, 2), 16);
  const green = Number.parseInt(normalized.slice(2, 4), 16);
  const blue = Number.parseInt(normalized.slice(4, 6), 16);
  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
}

function setFont(
  context: CanvasRenderingContext2D,
  size: number,
  family: string,
  weight = 400,
  style = "normal",
) {
  context.font = `${style} ${weight} ${size}px ${family}`;
}

function wrapWords(context: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const words = text.trim().split(/\s+/u).filter(Boolean);
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (!line || context.measureText(candidate).width <= maxWidth) {
      line = candidate;
      continue;
    }
    lines.push(line);
    line = word;
  }
  if (line) lines.push(line);
  return lines;
}

function wrapCharacters(context: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const characters = Array.from(text.trim());
  const closingPunctuation = /^[，。、；：！？）》」』】,.!?;:]$/u;
  const openingPunctuation = /[（《「『【([]$/u;
  const lines: string[] = [];
  let line = "";

  for (const character of characters) {
    const candidate = `${line}${character}`;
    if (!line || context.measureText(candidate).width <= maxWidth || closingPunctuation.test(character)) {
      line = candidate;
      continue;
    }

    if (openingPunctuation.test(line.at(-1) ?? "")) {
      const openingMark = line.slice(-1);
      line = line.slice(0, -1);
      if (line) lines.push(line);
      line = `${openingMark}${character}`;
    } else {
      lines.push(line);
      line = character;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function drawLines(
  context: CanvasRenderingContext2D,
  lines: string[],
  centerX: number,
  top: number,
  lineHeight: number,
) {
  lines.forEach((line, index) => context.fillText(line, centerX, top + index * lineHeight));
}

function drawTrackedText(
  context: CanvasRenderingContext2D,
  text: string,
  right: number,
  baseline: number,
  tracking: number,
) {
  const characters = Array.from(text);
  const width = characters.reduce(
    (total, character) => total + context.measureText(character).width,
    tracking * Math.max(characters.length - 1, 0),
  );
  let x = right - width;

  characters.forEach((character) => {
    context.fillText(character, x, baseline);
    x += context.measureText(character).width + tracking;
  });
}

function drawOrbitSignature(
  context: CanvasRenderingContext2D,
  accent: string,
  softAccent: string,
  card: CardLayout,
  format: ThoughtCardFormat,
) {
  context.save();
  context.lineWidth = format === "desktop" ? 1.6 : 1.8;

  const verticalX = card.width * (format === "desktop" ? 0.86 : 0.82);
  const horizontalY = card.height * (format === "desktop" ? 0.83 : 0.86);
  const verticalTop = card.height * (format === "desktop" ? 0.62 : 0.68);
  const horizontalLeft = card.width * (format === "desktop" ? 0.66 : 0.48);

  const verticalFade = context.createLinearGradient(verticalX, card.height, verticalX, verticalTop);
  verticalFade.addColorStop(0, rgba(accent, 0.09));
  verticalFade.addColorStop(1, rgba(accent, 0));
  context.strokeStyle = verticalFade;
  context.beginPath();
  context.moveTo(verticalX, card.height);
  context.lineTo(verticalX, verticalTop);
  context.stroke();

  const horizontalFade = context.createLinearGradient(card.width, horizontalY, horizontalLeft, horizontalY);
  horizontalFade.addColorStop(0, rgba(accent, 0.09));
  horizontalFade.addColorStop(1, rgba(accent, 0));
  context.strokeStyle = horizontalFade;
  context.beginPath();
  context.moveTo(card.width, horizontalY);
  context.lineTo(horizontalLeft, horizontalY);
  context.stroke();

  const rings = format === "desktop"
    ? [
        { x: 0.9, y: 1.036, radius: 0.46, color: accent, opacity: 0.1 },
        { x: 0.83, y: 1.018, radius: 0.33, color: softAccent, opacity: 0.13 },
        { x: 0.78, y: 1.018, radius: 0.18, color: accent, opacity: 0.16 },
      ]
    : [
        { x: 0.93, y: 1.144, radius: 0.85, color: accent, opacity: 0.09 },
        { x: 0.79, y: 1.024, radius: 0.64, color: softAccent, opacity: 0.12 },
        { x: 0.7, y: 0.976, radius: 0.36, color: accent, opacity: 0.15 },
      ];

  rings.forEach((ring) => {
    context.strokeStyle = rgba(ring.color, ring.opacity);
    context.beginPath();
    context.arc(
      card.width * ring.x,
      card.height * ring.y,
      card.width * ring.radius,
      0,
      Math.PI * 2,
    );
    context.stroke();
  });

  context.fillStyle = rgba(accent, 0.23);
  context.beginPath();
  context.arc(verticalX, horizontalY, format === "desktop" ? 4 : 4.5, 0, Math.PI * 2);
  context.fill();

  context.textAlign = "left";
  context.textBaseline = "alphabetic";
  setFont(context, format === "desktop" ? 17 : 20, SANS_FONT, 600);
  context.fillStyle = rgba(accent, 0.5);
  drawTrackedText(
    context,
    "AGORA",
    card.width - (format === "desktop" ? 76 : 62),
    card.height - (format === "desktop" ? 56 : 54),
    format === "desktop" ? 5 : 6,
  );
  context.restore();
}

function fitQuoteLayout(
  context: CanvasRenderingContext2D,
  quoteEnglish: string | undefined,
  quoteChinese: string | undefined,
  card: CardLayout,
) {
  const isBilingual = Boolean(quoteEnglish && quoteChinese);
  let scale = 1;

  while (scale >= card.minimumScale) {
    const englishSize = Math.round(
      (isBilingual ? card.bilingualEnglishSize : card.singleEnglishSize) * scale,
    );
    const chineseSize = Math.round(
      (isBilingual ? card.bilingualChineseSize : card.singleChineseSize) * scale,
    );
    setFont(context, englishSize, SERIF_FONT, 400, "italic");
    const englishLines = quoteEnglish ? wrapWords(context, quoteEnglish, card.quoteMaxWidth) : [];
    setFont(context, chineseSize, SERIF_FONT, 400);
    const chineseLines = quoteChinese ? wrapCharacters(context, quoteChinese, card.quoteMaxWidth) : [];
    const englishLineHeight = Math.round(englishSize * 1.42);
    const chineseLineHeight = Math.round(chineseSize * 1.55);
    const gap = isBilingual ? Math.round(49 * scale) : 0;
    const height = englishLines.length * englishLineHeight
      + chineseLines.length * chineseLineHeight
      + gap;

    if (
      height <= card.quoteMaxHeight
      && englishLines.length <= card.maxEnglishLines
      && chineseLines.length <= card.maxChineseLines
    ) {
      return {
        englishLines,
        chineseLines,
        englishSize,
        chineseSize,
        englishLineHeight,
        chineseLineHeight,
        gap,
        height,
      };
    }
    scale -= 0.04;
  }

  const fallbackEnglishSize = Math.round(card.bilingualEnglishSize * card.minimumScale);
  const fallbackChineseSize = Math.round(card.bilingualChineseSize * card.minimumScale);
  setFont(context, fallbackEnglishSize, SERIF_FONT, 400, "italic");
  const englishLines = quoteEnglish ? wrapWords(context, quoteEnglish, card.quoteMaxWidth) : [];
  setFont(context, fallbackChineseSize, SERIF_FONT, 400);
  const chineseLines = quoteChinese ? wrapCharacters(context, quoteChinese, card.quoteMaxWidth) : [];
  const fallbackEnglishLineHeight = Math.round(fallbackEnglishSize * 1.42);
  const fallbackChineseLineHeight = Math.round(fallbackChineseSize * 1.55);
  const fallbackGap = quoteEnglish && quoteChinese ? Math.round(49 * card.minimumScale) : 0;
  return {
    englishLines,
    chineseLines,
    englishSize: fallbackEnglishSize,
    chineseSize: fallbackChineseSize,
    englishLineHeight: fallbackEnglishLineHeight,
    chineseLineHeight: fallbackChineseLineHeight,
    gap: fallbackGap,
    height: englishLines.length * fallbackEnglishLineHeight
      + chineseLines.length * fallbackChineseLineHeight
      + fallbackGap,
  };
}

export async function renderThoughtCard(input: ThoughtCardExport): Promise<Blob> {
  if (document.fonts) await document.fonts.ready;

  const format = input.format ?? "mobile";
  const card = CARD_LAYOUTS[format];
  const canvas = document.createElement("canvas");
  canvas.width = card.width;
  canvas.height = card.height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas rendering is unavailable");

  const [paper, softAccent, accent, ink] = input.palette;
  context.fillStyle = paper;
  context.fillRect(0, 0, card.width, card.height);
  drawOrbitSignature(context, accent, softAccent, card, format);

  context.textBaseline = "top";
  context.textAlign = "center";
  const layout = fitQuoteLayout(context, input.quoteEnglish, input.quoteChinese, card);
  const authorLineHeight = Math.round(card.authorSize * 1.35);
  const workLineHeight = Math.round(card.workSize * 1.45);
  const attributionHeight = card.attributionGap
    + 2
    + card.accentToAuthor
    + authorLineHeight
    + card.authorToWork
    + workLineHeight;
  const quoteBlockTop = Math.max(
    72,
    (card.height - layout.height - attributionHeight) / 2,
  );
  let quoteTop = quoteBlockTop;
  context.fillStyle = ink;

  const drawEnglishQuote = (hasFollowingQuote: boolean) => {
    if (layout.englishLines.length === 0) return;
    setFont(context, layout.englishSize, SERIF_FONT, 400, "italic");
    context.globalAlpha = input.quoteChinese ? 0.67 : 0.9;
    drawLines(context, layout.englishLines, card.width / 2, quoteTop, layout.englishLineHeight);
    quoteTop += layout.englishLines.length * layout.englishLineHeight
      + (hasFollowingQuote ? layout.gap : 0);
  };

  const drawChineseQuote = (hasFollowingQuote: boolean) => {
    if (layout.chineseLines.length === 0) return;
    setFont(context, layout.chineseSize, SERIF_FONT, 400);
    context.globalAlpha = 0.92;
    drawLines(context, layout.chineseLines, card.width / 2, quoteTop, layout.chineseLineHeight);
    quoteTop += layout.chineseLines.length * layout.chineseLineHeight
      + (hasFollowingQuote ? layout.gap : 0);
  };

  if (input.quoteChineseFirst) {
    drawChineseQuote(layout.englishLines.length > 0);
    drawEnglishQuote(false);
  } else {
    drawEnglishQuote(layout.chineseLines.length > 0);
    drawChineseQuote(false);
  }
  context.globalAlpha = 1;

  const accentY = quoteBlockTop + layout.height + card.attributionGap;
  const authorY = accentY + 2 + card.accentToAuthor;
  const workY = authorY + authorLineHeight + card.authorToWork;
  context.fillStyle = accent;
  context.fillRect(card.width / 2 - 22, accentY, 44, 2);
  context.fillStyle = ink;
  context.textAlign = "center";
  setFont(context, card.authorSize, SANS_FONT, 500);
  context.fillText(input.author, card.width / 2, authorY);
  context.globalAlpha = 0.56;
  setFont(context, card.workSize, SERIF_FONT, 400);
  context.fillText(input.work, card.width / 2, workY);
  context.globalAlpha = 1;

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Unable to encode the thought card"));
    }, "image/png");
  });
}

function safeFilePart(value: string) {
  return value
    .normalize("NFKC")
    .replace(/[\\/:*?"<>|]+/gu, "-")
    .replace(/\s+/gu, "-")
    .replace(/^-+|-+$/gu, "");
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.style.display = "none";
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function thoughtCardFilename(
  brandName: string,
  author: string,
  format?: ThoughtCardFormat,
) {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const formatSuffix = format ? `-${format}` : "";
  return `${safeFilePart(brandName)}-${safeFilePart(author)}${formatSuffix}-${date}.png`;
}
