export type ThoughtCardStyle = "trajectory" | "marginalia" | "archive";

export type ThoughtCardExport = {
  brandName: string;
  brandNameEnglish: string;
  slogan: string;
  topic: string;
  sequence: string;
  quoteEnglish?: string;
  quoteChinese?: string;
  author: string;
  work: string;
  palette: readonly [string, string, string, string];
  style: ThoughtCardStyle;
  language: "zh-hans" | "zh-hant" | "en";
};

const CARD_WIDTH = 1080;
const CARD_HEIGHT = 1350;
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

function drawCornerMark(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  horizontalDirection: 1 | -1,
  verticalDirection: 1 | -1,
) {
  context.beginPath();
  context.moveTo(x + horizontalDirection * 34, y);
  context.lineTo(x, y);
  context.lineTo(x, y + verticalDirection * 34);
  context.stroke();
}

function drawStyleSignature(
  context: CanvasRenderingContext2D,
  style: ThoughtCardStyle,
  accent: string,
  softAccent: string,
) {
  context.save();
  context.lineWidth = 1.5;
  context.strokeStyle = rgba(accent, 0.42);
  context.fillStyle = rgba(accent, 0.56);

  if (style === "trajectory") {
    context.beginPath();
    context.moveTo(846, 1121);
    context.bezierCurveTo(892, 1098, 934, 1116, 982, 1067);
    context.stroke();
    [846, 916, 982].forEach((x, index) => {
      const y = [1121, 1107, 1067][index];
      context.beginPath();
      context.arc(x, y, index === 1 ? 4.5 : 3, 0, Math.PI * 2);
      context.fill();
    });
  } else if (style === "marginalia") {
    context.strokeStyle = rgba(softAccent, 0.5);
    context.beginPath();
    context.moveTo(93, 245);
    context.bezierCurveTo(73, 476, 109, 807, 86, 1078);
    context.stroke();
    context.beginPath();
    context.moveTo(77, 513);
    context.lineTo(99, 505);
    context.moveTo(76, 535);
    context.lineTo(96, 530);
    context.stroke();
  } else {
    context.strokeStyle = rgba(accent, 0.36);
    drawCornerMark(context, 62, 62, 1, 1);
    drawCornerMark(context, CARD_WIDTH - 62, 62, -1, 1);
    drawCornerMark(context, 62, CARD_HEIGHT - 62, 1, -1);
    drawCornerMark(context, CARD_WIDTH - 62, CARD_HEIGHT - 62, -1, -1);
  }
  context.restore();
}

function fitQuoteLayout(
  context: CanvasRenderingContext2D,
  quoteEnglish: string | undefined,
  quoteChinese: string | undefined,
) {
  const isBilingual = Boolean(quoteEnglish && quoteChinese);
  let scale = 1;

  while (scale >= 0.68) {
    const englishSize = Math.round((isBilingual ? 41 : 62) * scale);
    const chineseSize = Math.round((isBilingual ? 61 : 72) * scale);
    setFont(context, englishSize, SERIF_FONT, 400, "italic");
    const englishLines = quoteEnglish ? wrapWords(context, quoteEnglish, 852) : [];
    setFont(context, chineseSize, SERIF_FONT, 400);
    const chineseLines = quoteChinese ? wrapCharacters(context, quoteChinese, 852) : [];
    const englishLineHeight = Math.round(englishSize * 1.42);
    const chineseLineHeight = Math.round(chineseSize * 1.55);
    const gap = isBilingual ? Math.round(49 * scale) : 0;
    const height = englishLines.length * englishLineHeight
      + chineseLines.length * chineseLineHeight
      + gap;

    if (height <= 620 && englishLines.length <= 5 && chineseLines.length <= 4) {
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

  setFont(context, 31, SERIF_FONT, 400, "italic");
  const englishLines = quoteEnglish ? wrapWords(context, quoteEnglish, 852) : [];
  setFont(context, 46, SERIF_FONT, 400);
  const chineseLines = quoteChinese ? wrapCharacters(context, quoteChinese, 852) : [];
  return {
    englishLines,
    chineseLines,
    englishSize: 31,
    chineseSize: 46,
    englishLineHeight: 44,
    chineseLineHeight: 71,
    gap: quoteEnglish && quoteChinese ? 34 : 0,
    height: englishLines.length * 44 + chineseLines.length * 71 + (quoteEnglish && quoteChinese ? 34 : 0),
  };
}

export async function renderThoughtCard(input: ThoughtCardExport): Promise<Blob> {
  if (document.fonts) await document.fonts.ready;

  const canvas = document.createElement("canvas");
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas rendering is unavailable");

  const [paper, softAccent, accent, ink] = input.palette;
  context.fillStyle = paper;
  context.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);
  drawStyleSignature(context, input.style, accent, softAccent);

  context.textBaseline = "top";
  context.textAlign = "left";
  context.fillStyle = ink;
  setFont(context, 33, SANS_FONT, 600);
  context.fillText(input.brandName, 88, 78);
  setFont(context, 13, SANS_FONT, 500);
  context.letterSpacing = "2.8px";
  context.globalAlpha = 0.52;
  context.fillText(input.brandNameEnglish.toUpperCase(), 88, 125);

  context.textAlign = "right";
  setFont(context, 13, SANS_FONT, 500);
  context.fillText(`${input.topic.toUpperCase()}  /  ${input.sequence}`, 992, 92);
  context.letterSpacing = "0px";
  context.globalAlpha = 1;

  context.strokeStyle = rgba(ink, 0.2);
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(88, 176);
  context.lineTo(992, 176);
  context.stroke();

  context.textAlign = "center";
  context.fillStyle = rgba(ink, 0.48);
  setFont(context, 13, SANS_FONT, 500);
  context.letterSpacing = "2.6px";
  context.fillText(
    input.language === "en" ? "INTERPRETIVE RENDERING" : "命题译写  ·  INTERPRETIVE RENDERING",
    CARD_WIDTH / 2,
    244,
  );
  context.letterSpacing = "0px";

  const layout = fitQuoteLayout(context, input.quoteEnglish, input.quoteChinese);
  const quoteAreaTop = 318;
  const quoteAreaHeight = 616;
  let quoteTop = quoteAreaTop + Math.max(0, (quoteAreaHeight - layout.height) / 2);
  context.fillStyle = ink;

  if (layout.englishLines.length > 0) {
    setFont(context, layout.englishSize, SERIF_FONT, 400, "italic");
    context.globalAlpha = input.quoteChinese ? 0.67 : 0.9;
    drawLines(context, layout.englishLines, CARD_WIDTH / 2, quoteTop, layout.englishLineHeight);
    quoteTop += layout.englishLines.length * layout.englishLineHeight + layout.gap;
  }

  if (layout.chineseLines.length > 0) {
    setFont(context, layout.chineseSize, SERIF_FONT, 400);
    context.globalAlpha = 0.92;
    drawLines(context, layout.chineseLines, CARD_WIDTH / 2, quoteTop, layout.chineseLineHeight);
  }
  context.globalAlpha = 1;

  context.fillStyle = accent;
  context.fillRect(CARD_WIDTH / 2 - 22, 1015, 44, 2);
  context.fillStyle = ink;
  context.textAlign = "center";
  setFont(context, 28, SANS_FONT, 500);
  context.fillText(input.author, CARD_WIDTH / 2, 1052);
  context.globalAlpha = 0.56;
  setFont(context, 18, SERIF_FONT, 400);
  context.fillText(input.work, CARD_WIDTH / 2, 1102);
  context.globalAlpha = 1;

  context.strokeStyle = rgba(ink, 0.16);
  context.beginPath();
  context.moveTo(88, 1192);
  context.lineTo(992, 1192);
  context.stroke();

  context.textAlign = "left";
  context.fillStyle = rgba(ink, 0.55);
  setFont(context, 16, SANS_FONT, 400);
  context.fillText(input.slogan, 88, 1236);
  context.textAlign = "right";
  setFont(context, 12, SANS_FONT, 500);
  context.letterSpacing = "2.2px";
  context.fillText("PHILOSOPHY / NEW TAB", 992, 1241);
  context.letterSpacing = "0px";

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

export function thoughtCardFilename(brandName: string, author: string) {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  return `${safeFilePart(brandName)}-${safeFilePart(author)}-${date}.png`;
}
