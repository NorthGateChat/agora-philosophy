export type ThoughtCardFormat = "square" | "portrait" | "portrait45" | "story" | "landscape";
export type ThoughtCardVisualStyle = "trajectory" | "marginalia" | "archive";

export type ThoughtCardExport = {
  quoteEnglish?: string;
  quoteChinese?: string;
  quoteChineseFirst?: boolean;
  author: string;
  work: string;
  natureLabel?: string;
  signature?: string;
  palette: readonly [string, string, string, string];
  illustrationUrl?: string;
  format?: ThoughtCardFormat;
  visualStyle?: ThoughtCardVisualStyle;
};

type CardTheme = {
  paper: string;
  softAccent: string;
  accent: string;
  ink: string;
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
  square: {
    width: 1080,
    height: 1080,
    quoteMaxWidth: 852,
    quoteMaxHeight: 590,
    bilingualEnglishSize: 37,
    bilingualChineseSize: 54,
    singleEnglishSize: 54,
    singleChineseSize: 64,
    minimumScale: 0.64,
    maxEnglishLines: 4,
    maxChineseLines: 3,
    attributionGap: 56,
    accentToAuthor: 28,
    authorToWork: 14,
    authorSize: 27,
    workSize: 18,
  },
  portrait: {
    width: 1080,
    height: 1440,
    quoteMaxWidth: 852,
    quoteMaxHeight: 800,
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
  portrait45: {
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
  story: {
    width: 1080,
    height: 1920,
    quoteMaxWidth: 852,
    quoteMaxHeight: 980,
    bilingualEnglishSize: 43,
    bilingualChineseSize: 64,
    singleEnglishSize: 64,
    singleChineseSize: 76,
    minimumScale: 0.68,
    maxEnglishLines: 6,
    maxChineseLines: 5,
    attributionGap: 78,
    accentToAuthor: 36,
    authorToWork: 16,
    authorSize: 31,
    workSize: 20,
  },
  landscape: {
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
const CARD_FORMAT_FILENAME_SUFFIX: Record<ThoughtCardFormat, string> = {
  square: "1x1",
  portrait: "3x4",
  portrait45: "4x5",
  story: "9x16",
  landscape: "16x9",
};
const SANS_FONT = '"PingFang SC", "Microsoft YaHei", "Noto Sans CJK SC", sans-serif';
const SERIF_FONT = '"Songti SC", "STSong", "Noto Serif CJK SC", serif';

function mixHex(base: string, overlay: string, overlayAmount: number) {
  const parse = (value: string) => {
    const normalized = value.replace("#", "");
    if (!/^[\da-f]{6}$/i.test(normalized)) return null;
    return [0, 2, 4].map((offset) => Number.parseInt(normalized.slice(offset, offset + 2), 16));
  };
  const baseChannels = parse(base);
  const overlayChannels = parse(overlay);
  if (!baseChannels || !overlayChannels) return base;
  const amount = Math.max(0, Math.min(1, overlayAmount));
  const channels = baseChannels.map((channel, index) => (
    Math.round(channel * (1 - amount) + overlayChannels[index] * amount)
  ));
  return `#${channels.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
}

function resolveCardTheme(
  palette: ThoughtCardExport["palette"],
  visualStyle: ThoughtCardVisualStyle,
): CardTheme {
  const [paper, softAccent, accent, ink] = palette;
  if (visualStyle === "marginalia") {
    return {
      paper: mixHex(paper, "#e7d3ad", 0.28),
      softAccent: mixHex(softAccent, "#d7b98d", 0.28),
      accent: mixHex(accent, "#873b34", 0.66),
      ink: mixHex(ink, "#4d261f", 0.1),
    };
  }
  if (visualStyle === "archive") {
    return {
      paper: mixHex(ink, "#151a1c", 0.22),
      softAccent: mixHex(softAccent, paper, 0.62),
      accent: mixHex(softAccent, paper, 0.52),
      ink: mixHex(paper, "#ffffff", 0.1),
    };
  }
  return { paper, softAccent, accent, ink };
}

function rgba(hex: string, opacity: number) {
  const normalized = hex.replace("#", "");
  if (!/^[\da-f]{6}$/i.test(normalized)) return hex;
  const red = Number.parseInt(normalized.slice(0, 2), 16);
  const green = Number.parseInt(normalized.slice(2, 4), 16);
  const blue = Number.parseInt(normalized.slice(4, 6), 16);
  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
}

function loadCanvasImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Unable to load thought illustration: ${src}`));
    image.src = src;
  });
}

function drawImageCover(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
  focusX = 0.5,
  focusY = 0.5,
) {
  const sourceWidth = image.naturalWidth || image.width;
  const sourceHeight = image.naturalHeight || image.height;
  const sourceRatio = sourceWidth / sourceHeight;
  const targetRatio = width / height;
  let cropWidth = sourceWidth;
  let cropHeight = sourceHeight;

  if (sourceRatio > targetRatio) cropWidth = sourceHeight * targetRatio;
  else cropHeight = sourceWidth / targetRatio;

  const cropX = Math.max(0, Math.min(sourceWidth - cropWidth, sourceWidth * focusX - cropWidth / 2));
  const cropY = Math.max(0, Math.min(sourceHeight - cropHeight, sourceHeight * focusY - cropHeight / 2));
  context.drawImage(image, cropX, cropY, cropWidth, cropHeight, x, y, width, height);
}

function drawImageContain(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
  alignX = 0.5,
  alignY = 0.5,
) {
  const sourceWidth = image.naturalWidth || image.width;
  const sourceHeight = image.naturalHeight || image.height;
  const scale = Math.min(width / sourceWidth, height / sourceHeight);
  const drawWidth = sourceWidth * scale;
  const drawHeight = sourceHeight * scale;
  const drawX = x + (width - drawWidth) * alignX;
  const drawY = y + (height - drawHeight) * alignY;

  context.drawImage(image, drawX, drawY, drawWidth, drawHeight);
  return { x: drawX, y: drawY, width: drawWidth, height: drawHeight };
}

function drawIllustrationLayer(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  paper: string,
  card: CardLayout,
  format: ThoughtCardFormat,
  visualStyle: ThoughtCardVisualStyle,
) {
  context.save();

  if (format === "landscape") {
    drawImageCover(context, image, 0, 0, card.width, card.height, 0.5, 0.54);
    const readingField = context.createLinearGradient(card.width * 0.35, 0, card.width * 0.84, 0);
    readingField.addColorStop(0, rgba(paper, 0.04));
    readingField.addColorStop(0.52, rgba(paper, 0.72));
    readingField.addColorStop(1, rgba(paper, 0.97));
    context.fillStyle = readingField;
    context.fillRect(0, 0, card.width, card.height);
  } else {
    const imageHeight = card.height * (format === "square" ? 0.62 : format === "story" ? 0.56 : 0.6);
    const preserveWholeIllustration = format === "portrait"
      || format === "portrait45"
      || format === "story";
    const illustrationBounds = preserveWholeIllustration
      ? drawImageContain(context, image, 0, 0, card.width, imageHeight, 0.5, 0)
      : (() => {
          drawImageCover(context, image, 0, 0, card.width, imageHeight, 0.5, 0.48);
          return { x: 0, y: 0, width: card.width, height: imageHeight };
        })();
    const fadeEnd = illustrationBounds.y + illustrationBounds.height;
    const fadeSpan = preserveWholeIllustration
      ? Math.min(card.height * 0.32, illustrationBounds.height * 0.46)
      : card.height * 0.34;
    const fadeStart = Math.max(illustrationBounds.y, fadeEnd - fadeSpan);
    const readingField = context.createLinearGradient(0, fadeStart, 0, fadeEnd);
    readingField.addColorStop(0, rgba(paper, 0.02));
    readingField.addColorStop(0.28, rgba(paper, 0.14));
    readingField.addColorStop(0.56, rgba(paper, 0.42));
    readingField.addColorStop(0.78, rgba(paper, 0.74));
    readingField.addColorStop(0.92, rgba(paper, 0.93));
    readingField.addColorStop(1, rgba(paper, 1));
    context.fillStyle = readingField;
    context.fillRect(0, fadeStart, card.width, fadeEnd - fadeStart);
  }

  if (visualStyle === "archive") {
    context.fillStyle = rgba(paper, 0.48);
    context.fillRect(0, 0, card.width, card.height);
  } else if (visualStyle === "marginalia") {
    context.fillStyle = rgba(paper, 0.14);
    context.fillRect(0, 0, card.width, card.height);
  }

  context.restore();
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

function fitSingleLineText(
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  preferredSize: number,
  minimumSize: number,
) {
  const normalized = text.trim();
  let size = preferredSize;

  while (size > minimumSize) {
    setFont(context, size, SANS_FONT, 600);
    if (context.measureText(normalized).width <= maxWidth) return { text: normalized, size };
    size -= 1;
  }

  setFont(context, minimumSize, SANS_FONT, 600);
  if (context.measureText(normalized).width <= maxWidth) {
    return { text: normalized, size: minimumSize };
  }

  const ellipsis = "…";
  const characters = Array.from(normalized);
  while (
    characters.length > 0
    && context.measureText(`${characters.join("")}${ellipsis}`).width > maxWidth
  ) {
    characters.pop();
  }
  return { text: `${characters.join("")}${ellipsis}`, size: minimumSize };
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
  signature: string,
) {
  context.save();
  const compact = format === "square" || format === "landscape";
  context.lineWidth = compact ? 1.6 : 1.8;

  const verticalX = card.width * (compact ? 0.86 : 0.82);
  const horizontalY = card.height * (compact ? 0.83 : 0.86);
  const verticalTop = card.height * (compact ? 0.62 : 0.68);
  const horizontalLeft = card.width * (compact ? 0.66 : 0.48);

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

  const rings = compact
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
  context.arc(verticalX, horizontalY, compact ? 4 : 4.5, 0, Math.PI * 2);
  context.fill();

  context.textAlign = "left";
  context.textBaseline = "alphabetic";
  setFont(context, compact ? 17 : 20, SANS_FONT, 600);
  context.fillStyle = rgba(accent, 0.5);
  drawTrackedText(
    context,
    signature,
    card.width - (compact ? 76 : 62),
    card.height - (compact ? 56 : 54),
    compact ? 5 : 6,
  );
  context.restore();
}

function drawBrandSignature(
  context: CanvasRenderingContext2D,
  color: string,
  card: CardLayout,
  format: ThoughtCardFormat,
  opacity: number,
  signature: string,
) {
  context.save();
  const compact = format === "square" || format === "landscape";
  context.textAlign = "left";
  context.textBaseline = "alphabetic";
  setFont(context, compact ? 17 : 20, SANS_FONT, 600);
  context.fillStyle = rgba(color, opacity);
  drawTrackedText(
    context,
    signature,
    card.width - (compact ? 76 : 62),
    card.height - (compact ? 56 : 54),
    compact ? 5 : 6,
  );
  context.restore();
}

function drawMarginaliaSignature(
  context: CanvasRenderingContext2D,
  theme: CardTheme,
  card: CardLayout,
  format: ThoughtCardFormat,
  signature: string,
) {
  context.save();
  const compact = format === "square" || format === "landscape";
  context.lineWidth = compact ? 1.2 : 1.5;
  const ruleStep = compact ? 64 : 78;
  const leftRule = card.width * (compact ? 0.105 : 0.12);

  context.strokeStyle = rgba(theme.ink, 0.055);
  for (let y = ruleStep; y < card.height; y += ruleStep) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(card.width, y);
    context.stroke();
  }

  context.strokeStyle = rgba(theme.accent, 0.18);
  context.beginPath();
  context.moveTo(leftRule, 0);
  context.lineTo(leftRule, card.height);
  context.stroke();

  const markY = card.height * (compact ? 0.19 : 0.17);
  context.lineWidth = 2;
  context.strokeStyle = rgba(theme.accent, 0.42);
  context.beginPath();
  context.moveTo(leftRule - 18, markY);
  context.lineTo(leftRule + 22, markY - 3);
  context.moveTo(leftRule - 14, markY + 9);
  context.lineTo(leftRule + 18, markY + 6);
  context.stroke();
  context.restore();

  drawBrandSignature(context, theme.accent, card, format, 0.56, signature);
}

function drawArchiveSignature(
  context: CanvasRenderingContext2D,
  theme: CardTheme,
  card: CardLayout,
  format: ThoughtCardFormat,
  signature: string,
) {
  context.save();
  const compact = format === "square" || format === "landscape";
  const gridSize = compact ? 72 : 84;
  context.lineWidth = 1;
  context.strokeStyle = rgba(theme.ink, 0.055);
  for (let x = gridSize; x < card.width; x += gridSize) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, card.height);
    context.stroke();
  }
  for (let y = gridSize; y < card.height; y += gridSize) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(card.width, y);
    context.stroke();
  }

  const verticalX = card.width * 0.11;
  const horizontalY = card.height * (compact ? 0.86 : 0.88);
  context.strokeStyle = rgba(theme.ink, 0.17);
  context.beginPath();
  context.moveTo(verticalX, 0);
  context.lineTo(verticalX, card.height);
  context.moveTo(0, horizontalY);
  context.lineTo(card.width, horizontalY);
  context.stroke();

  context.strokeStyle = rgba(theme.ink, 0.12);
  context.strokeRect(30, 30, card.width - 60, card.height - 60);
  context.fillStyle = rgba(theme.accent, 0.5);
  context.beginPath();
  context.arc(verticalX, horizontalY, compact ? 3.5 : 4, 0, Math.PI * 2);
  context.fill();
  context.restore();

  drawBrandSignature(context, theme.ink, card, format, 0.52, signature);
}

function drawThemeSignature(
  context: CanvasRenderingContext2D,
  theme: CardTheme,
  card: CardLayout,
  format: ThoughtCardFormat,
  visualStyle: ThoughtCardVisualStyle,
  signature: string,
) {
  if (visualStyle === "marginalia") {
    drawMarginaliaSignature(context, theme, card, format, signature);
    return;
  }
  if (visualStyle === "archive") {
    drawArchiveSignature(context, theme, card, format, signature);
    return;
  }
  drawOrbitSignature(context, theme.accent, theme.softAccent, card, format, signature);
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

  const format = input.format ?? "portrait45";
  const visualStyle = input.visualStyle ?? "trajectory";
  const card = CARD_LAYOUTS[format];
  const canvas = document.createElement("canvas");
  canvas.width = card.width;
  canvas.height = card.height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas rendering is unavailable");

  const theme = resolveCardTheme(input.palette, visualStyle);
  const { paper, accent, ink } = theme;
  context.fillStyle = paper;
  context.fillRect(0, 0, card.width, card.height);

  let illustrationDrawn = false;
  if (input.illustrationUrl) {
    try {
      const illustration = await loadCanvasImage(input.illustrationUrl);
      drawIllustrationLayer(context, illustration, paper, card, format, visualStyle);
      illustrationDrawn = true;
    } catch {
      // Export should still succeed as the original typographic card if an asset is unavailable.
    }
  }

  drawThemeSignature(
    context,
    theme,
    card,
    format,
    visualStyle,
    input.signature?.trim() || "NOTHING FINAL",
  );

  context.textBaseline = "top";
  context.textAlign = "center";
  const quoteCard: CardLayout = illustrationDrawn
    ? format === "landscape"
      ? {
          ...card,
          quoteMaxWidth: 660,
          quoteMaxHeight: 470,
          bilingualEnglishSize: 34,
          bilingualChineseSize: 50,
          singleEnglishSize: 49,
          singleChineseSize: 60,
          minimumScale: 0.66,
          maxEnglishLines: 5,
          maxChineseLines: 4,
          attributionGap: 42,
          accentToAuthor: 22,
        }
      : format === "square"
        ? {
            ...card,
            quoteMaxWidth: 840,
            quoteMaxHeight: 370,
            bilingualEnglishSize: 31,
            bilingualChineseSize: 46,
            singleEnglishSize: 46,
            singleChineseSize: 56,
            minimumScale: 0.62,
            maxEnglishLines: 4,
            maxChineseLines: 3,
            attributionGap: 30,
            accentToAuthor: 20,
          }
      : {
          ...card,
          quoteMaxWidth: 840,
          quoteMaxHeight: format === "story" ? 620 : format === "portrait" ? 520 : 470,
          bilingualEnglishSize: 35,
          bilingualChineseSize: 51,
          singleEnglishSize: 51,
          singleChineseSize: 61,
          minimumScale: 0.64,
          maxEnglishLines: 5,
          maxChineseLines: 4,
          attributionGap: 42,
          accentToAuthor: 24,
        }
    : card;
  const natureLabel = input.natureLabel?.trim() || undefined;
  const natureSize = Math.max(14, Math.round(quoteCard.workSize * 0.9));
  const natureLineHeight = natureLabel ? Math.round(natureSize * 1.4) : 0;
  const natureToAuthor = natureLabel
    ? Math.max(8, Math.round(quoteCard.authorToWork * 0.75))
    : 0;
  const natureReserve = natureLineHeight + natureToAuthor;
  const quoteLayoutCard = natureLabel
    ? {
        ...quoteCard,
        quoteMaxHeight: Math.max(120, quoteCard.quoteMaxHeight - natureReserve),
      }
    : quoteCard;
  const layout = fitQuoteLayout(
    context,
    input.quoteEnglish,
    input.quoteChinese,
    quoteLayoutCard,
  );
  const authorLineHeight = Math.round(quoteCard.authorSize * 1.35);
  const workLineHeight = Math.round(quoteCard.workSize * 1.45);
  const attributionHeight = quoteCard.attributionGap
    + 2
    + quoteCard.accentToAuthor
    + natureReserve
    + authorLineHeight
    + quoteCard.authorToWork
    + workLineHeight;
  const quoteCenterX = illustrationDrawn && format === "landscape"
    ? card.width * 0.735
    : card.width / 2;
  const illustratedReadingTop = format === "square"
    ? 500
    : format === "story"
      ? 900
    : format === "portrait"
      ? 700
      : 650;
  const quoteBlockTop = illustrationDrawn && format !== "landscape"
    ? Math.max(
        illustratedReadingTop,
        illustratedReadingTop
          + (card.height - illustratedReadingTop - layout.height - attributionHeight) / 2,
      )
    : Math.max(72, (card.height - layout.height - attributionHeight) / 2);
  let quoteTop = quoteBlockTop;
  context.fillStyle = ink;

  const drawEnglishQuote = (hasFollowingQuote: boolean) => {
    if (layout.englishLines.length === 0) return;
    setFont(context, layout.englishSize, SERIF_FONT, 400, "italic");
    context.globalAlpha = input.quoteChinese ? 0.67 : 0.9;
    drawLines(context, layout.englishLines, quoteCenterX, quoteTop, layout.englishLineHeight);
    quoteTop += layout.englishLines.length * layout.englishLineHeight
      + (hasFollowingQuote ? layout.gap : 0);
  };

  const drawChineseQuote = (hasFollowingQuote: boolean) => {
    if (layout.chineseLines.length === 0) return;
    setFont(context, layout.chineseSize, SERIF_FONT, 400);
    context.globalAlpha = 0.92;
    drawLines(context, layout.chineseLines, quoteCenterX, quoteTop, layout.chineseLineHeight);
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

  const accentY = quoteBlockTop + layout.height + quoteCard.attributionGap;
  const natureY = accentY + 2 + quoteCard.accentToAuthor;
  const authorY = natureY + natureReserve;
  const workY = authorY + authorLineHeight + quoteCard.authorToWork;
  context.fillStyle = accent;
  const accentWidth = visualStyle === "archive" ? 156 : visualStyle === "marginalia" ? 58 : 44;
  context.fillRect(
    quoteCenterX - accentWidth / 2,
    accentY,
    accentWidth,
    visualStyle === "marginalia" ? 3 : 2,
  );
  if (natureLabel) {
    const fittedNature = fitSingleLineText(
      context,
      natureLabel,
      quoteCard.quoteMaxWidth * 0.9,
      natureSize,
      12,
    );
    context.fillStyle = accent;
    context.globalAlpha = 0.72;
    setFont(context, fittedNature.size, SANS_FONT, 600);
    context.fillText(fittedNature.text, quoteCenterX, natureY);
    context.globalAlpha = 1;
  }
  context.fillStyle = ink;
  context.textAlign = "center";
  setFont(context, quoteCard.authorSize, SANS_FONT, 500);
  context.fillText(input.author, quoteCenterX, authorY);
  context.globalAlpha = 0.56;
  setFont(context, quoteCard.workSize, SERIF_FONT, 400);
  context.fillText(input.work, quoteCenterX, workY);
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
  const formatSuffix = format ? `-${CARD_FORMAT_FILENAME_SUFFIX[format]}` : "";
  return `${safeFilePart(brandName)}-${safeFilePart(author)}${formatSuffix}-${date}.png`;
}
