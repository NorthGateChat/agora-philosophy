import { createHash } from "node:crypto";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import ts from "typescript";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const contentDirectory = path.join(projectRoot, "content");
const masterDirectory = path.join(
  projectRoot,
  "design",
  "illustrations",
  "psychology-masters",
);
const publicDirectory = path.join(projectRoot, "public", "illustrations");
const designDirectory = path.join(projectRoot, "design", "illustrations");

const CANVAS = Object.freeze({ width: 1536, height: 1024 });
const GENERATION_SEED = "agora-psychology-v1-2026-08-06";
const ASSET_PREFIX = "threshold-manuscript";
const FALLBACK_ASSET_START = 1108;
const MAX_BYTES = 420 * 1024;

const sourceFiles = [
  "psychologyFoundations.ts",
  "psychologyCognition.ts",
  "psychologySocial.ts",
];

const masterByTopic = Object.freeze({
  感知: "perception-attention.png",
  记忆: "memory-reconstruction.png",
  学习: "learning-feedback.png",
  行为: "learning-feedback.png",
  决策: "judgment-decision.png",
  情绪: "emotion-appraisal.png",
  动机: "motivation-autonomy.png",
  人格: "self-personality.png",
  自我: "self-personality.png",
  关系: "social-development.png",
  群体: "social-development.png",
  发展: "social-development.png",
});

const topicEnglish = Object.freeze({
  感知: "perception and attention",
  记忆: "memory and reconstruction",
  学习: "learning",
  行为: "behavior",
  决策: "judgment and decision-making",
  情绪: "emotion and appraisal",
  动机: "motivation",
  人格: "personality",
  自我: "selfhood",
  关系: "relationships",
  群体: "groups and social influence",
  发展: "development",
});

const motifByTopic = Object.freeze({
  感知: "focusing aperture",
  记忆: "reconstructed fragments",
  学习: "feedback path",
  行为: "cue-action trace",
  决策: "branching alternatives",
  情绪: "appraisal contours",
  动机: "self-directed path",
  人格: "layered profiles",
  自我: "unfinished mirror",
  关系: "reciprocal threads",
  群体: "relational network",
  发展: "scaffolded stages",
});

function parseArguments(argv) {
  const options = { force: false, dryRun: false, assetStart: null };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--force") options.force = true;
    else if (argument === "--dry-run") options.dryRun = true;
    else if (argument === "--asset-start") {
      options.assetStart = Number(argv[index + 1]);
      index += 1;
    } else {
      throw new Error(`Unknown argument: ${argument}`);
    }
  }
  if (options.assetStart !== null && !Number.isInteger(options.assetStart)) {
    throw new Error("--asset-start must be an integer");
  }
  return options;
}

function literalValue(node) {
  if (!node) return undefined;
  if (
    ts.isStringLiteral(node) ||
    ts.isNoSubstitutionTemplateLiteral(node) ||
    ts.isNumericLiteral(node)
  ) {
    return ts.isNumericLiteral(node) ? Number(node.text) : node.text;
  }
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (ts.isArrayLiteralExpression(node)) {
    return node.elements.map((element) => literalValue(element));
  }
  if (ts.isObjectLiteralExpression(node)) {
    const value = {};
    for (const property of node.properties) {
      if (!ts.isPropertyAssignment(property)) continue;
      const name = property.name;
      const key = ts.isIdentifier(name) || ts.isStringLiteral(name) ? name.text : null;
      if (key) value[key] = literalValue(property.initializer);
    }
    return value;
  }
  return undefined;
}

function unwrapExpression(node) {
  let current = node;
  while (
    current &&
    (ts.isSatisfiesExpression(current) ||
      ts.isAsExpression(current) ||
      ts.isParenthesizedExpression(current))
  ) {
    current = current.expression;
  }
  return current;
}

async function readPsychologySeeds() {
  const seeds = [];
  for (const basename of sourceFiles) {
    const filename = path.join(contentDirectory, basename);
    const sourceText = await readFile(filename, "utf8");
    const source = ts.createSourceFile(
      filename,
      sourceText,
      ts.ScriptTarget.ESNext,
      true,
      ts.ScriptKind.TS,
    );
    for (const statement of source.statements) {
      if (!ts.isVariableStatement(statement)) continue;
      for (const declaration of statement.declarationList.declarations) {
        if (!ts.isIdentifier(declaration.name)) continue;
        if (!/psychology(?:Foundation|Cognition|Social)Seeds/.test(declaration.name.text)) {
          continue;
        }
        const initializer = unwrapExpression(declaration.initializer);
        if (!initializer || !ts.isArrayLiteralExpression(initializer)) continue;
        for (const item of initializer.elements) {
          const value = literalValue(item);
          if (value?.id?.startsWith("psychology-")) {
            seeds.push({ ...value, sourceFile: basename });
          }
        }
      }
    }
  }
  const duplicateIds = seeds
    .map((seed) => seed.id)
    .filter((id, index, ids) => ids.indexOf(id) !== index);
  if (duplicateIds.length) {
    throw new Error(`Duplicate psychology IDs: ${[...new Set(duplicateIds)].join(", ")}`);
  }
  if (seeds.length !== 120) {
    throw new Error(`Expected 120 psychology seeds, found ${seeds.length}`);
  }
  for (const seed of seeds) {
    for (const key of ["id", "topic", "text", "english", "question", "englishQuestion"]) {
      if (typeof seed[key] !== "string" || seed[key].trim() === "") {
        throw new Error(`${seed.id ?? "unknown seed"} is missing ${key}`);
      }
    }
    if (!masterByTopic[seed.topic]) {
      throw new Error(`${seed.id} has unsupported topic ${seed.topic}`);
    }
  }
  return seeds;
}

async function registryState() {
  const source = await readFile(path.join(contentDirectory, "illustrations.ts"), "utf8");
  const ids = new Set(
    [...source.matchAll(/thoughtId:\s*["']([^"']+)["']/g)].map((match) => match[1]),
  );
  const numbers = [...source.matchAll(/assetId:\s*["']threshold-manuscript-(\d+)["']/g)]
    .map((match) => Number(match[1]))
    .filter(Number.isFinite);
  return {
    thoughtIds: ids,
    maxAssetNumber: numbers.length ? Math.max(...numbers) : FALLBACK_ASSET_START - 1,
  };
}

function hash32(value) {
  const digest = createHash("sha256").update(`${GENERATION_SEED}:${value}`).digest();
  return digest.readUInt32LE(0);
}

function randomFor(value) {
  let state = hash32(value) || 0x9e3779b9;
  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return (state >>> 0) / 0x1_0000_0000;
  };
}

function fixed(value, digits = 1) {
  return Number(value).toFixed(digits);
}

function line(x1, y1, x2, y2, extra = "") {
  return `<line x1="${fixed(x1)}" y1="${fixed(y1)}" x2="${fixed(x2)}" y2="${fixed(y2)}" ${extra}/>`;
}

function circle(x, y, radius, extra = "") {
  return `<circle cx="${fixed(x)}" cy="${fixed(y)}" r="${fixed(radius)}" ${extra}/>`;
}

function topicMotif(seed, rand) {
  const x = 270 + rand() * 996;
  const y = 235 + rand() * 535;
  const scale = 0.78 + rand() * 0.48;
  const direction = rand() > 0.5 ? 1 : -1;
  const graphite = "#4a4741";
  const accent = "#527c7a";
  const common = `fill="none" stroke="${graphite}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" opacity="0.34"`;
  const faint = `fill="none" stroke="${graphite}" stroke-width="1.05" opacity="0.20"`;
  const dot = `fill="${accent}" opacity="0.74"`;
  const parts = [];

  if (seed.topic === "感知") {
    for (let index = 0; index < 4; index += 1) {
      const radius = (58 + index * 42) * scale;
      const start = 15 + index * 19 + rand() * 12;
      const end = 265 - index * 11;
      parts.push(
        `<path d="M ${fixed(x + Math.cos((start * Math.PI) / 180) * radius)} ${fixed(y + Math.sin((start * Math.PI) / 180) * radius)} A ${fixed(radius)} ${fixed(radius)} 0 0 1 ${fixed(x + Math.cos((end * Math.PI) / 180) * radius)} ${fixed(y + Math.sin((end * Math.PI) / 180) * radius)}" ${index === 2 ? common : faint}/>`
      );
    }
    parts.push(line(x - 230 * scale, y + 45 * direction, x - 20, y, faint));
    parts.push(circle(x, y, 8 + rand() * 4, dot));
  } else if (seed.topic === "记忆") {
    for (let index = 0; index < 5; index += 1) {
      const width = (72 + rand() * 54) * scale;
      const height = (48 + rand() * 48) * scale;
      const px = x + (index - 2) * 72 * scale + (rand() - 0.5) * 30;
      const py = y + Math.abs(index - 2) * 20 + (rand() - 0.5) * 42;
      parts.push(`<path d="M ${fixed(px - width / 2)} ${fixed(py - height / 2)} L ${fixed(px + width / 2)} ${fixed(py - height / 2 + rand() * 8)} L ${fixed(px + width / 2 - rand() * 15)} ${fixed(py + height / 2)} L ${fixed(px - width / 2)} ${fixed(py + height / 2 - rand() * 10)} Z" ${index === 2 ? common : faint}/>`);
    }
    parts.push(`<path d="M ${fixed(x - 210 * scale)} ${fixed(y + 125 * direction)} Q ${fixed(x)} ${fixed(y - 95 * direction)} ${fixed(x + 220 * scale)} ${fixed(y + 85 * direction)}" ${faint} stroke-dasharray="8 13"/>`);
    parts.push(circle(x + 8, y - 3, 7, dot));
  } else if (seed.topic === "学习" || seed.topic === "行为") {
    const points = Array.from({ length: 6 }, (_, index) => ({
      x: x + (index - 2.5) * 72 * scale,
      y: y + Math.sin(index * 1.15 + rand()) * 82 * scale,
    }));
    parts.push(`<path d="M ${fixed(points[0].x)} ${fixed(points[0].y)} ${points.slice(1).map((point) => `Q ${fixed(point.x - 35 * scale)} ${fixed(point.y + 20 * direction)} ${fixed(point.x)} ${fixed(point.y)}`).join(" ")}" ${common}/>`);
    points.forEach((point, index) => parts.push(circle(point.x, point.y, index === 3 ? 8 : 3.5, index === 3 ? dot : `fill="${graphite}" opacity="0.34"`)));
    if (seed.topic === "学习") {
      parts.push(`<path d="M ${fixed(x + 150 * scale)} ${fixed(y - 65 * scale)} C ${fixed(x + 260 * scale)} ${fixed(y - 135 * scale)} ${fixed(x + 285 * scale)} ${fixed(y + 90 * scale)} ${fixed(x + 115 * scale)} ${fixed(y + 110 * scale)}" ${faint} stroke-dasharray="7 11"/>`);
    } else {
      parts.push(line(x - 235 * scale, y + 150 * direction, x + 230 * scale, y + 150 * direction, faint));
    }
  } else if (seed.topic === "决策") {
    parts.push(`<path d="M ${fixed(x)} ${fixed(y + 210 * scale)} Q ${fixed(x)} ${fixed(y + 65 * scale)} ${fixed(x)} ${fixed(y)} Q ${fixed(x - 115 * scale)} ${fixed(y - 80 * scale)} ${fixed(x - 230 * scale)} ${fixed(y - 175 * scale)} M ${fixed(x)} ${fixed(y)} Q ${fixed(x + 95 * scale)} ${fixed(y - 95 * scale)} ${fixed(x + 235 * scale)} ${fixed(y - 150 * scale)}" ${common}/>`);
    parts.push(`<path d="M ${fixed(x - 245 * scale)} ${fixed(y - 173 * scale)} l ${fixed(35 * scale)} ${fixed(-5 * scale)} M ${fixed(x + 238 * scale)} ${fixed(y - 150 * scale)} l ${fixed(-28 * scale)} ${fixed(-18 * scale)}" ${faint}/>`);
    parts.push(circle(x, y, 9, dot));
  } else if (seed.topic === "情绪") {
    for (let index = 0; index < 4; index += 1) {
      const radius = (55 + index * 45) * scale;
      parts.push(`<path d="M ${fixed(x - radius)} ${fixed(y)} C ${fixed(x - radius * 0.45)} ${fixed(y - radius * (0.45 + rand() * 0.35))} ${fixed(x + radius * 0.42)} ${fixed(y + radius * (0.42 + rand() * 0.35))} ${fixed(x + radius)} ${fixed(y)}" ${index === 1 ? common : faint}/>`);
    }
    parts.push(circle(x - 7 * direction, y, 9, dot));
    parts.push(`<rect x="${fixed(x - 205 * scale)}" y="${fixed(y - 160 * scale)}" width="${fixed(410 * scale)}" height="${fixed(320 * scale)}" ${faint}/>`);
  } else if (seed.topic === "动机") {
    parts.push(`<path d="M ${fixed(x - 260 * scale)} ${fixed(y + 155 * scale)} C ${fixed(x - 80 * scale)} ${fixed(y + 175 * scale)} ${fixed(x - 60 * scale)} ${fixed(y - 45 * scale)} ${fixed(x + 75 * scale)} ${fixed(y - 35 * scale)} S ${fixed(x + 210 * scale)} ${fixed(y - 130 * scale)} ${fixed(x + 265 * scale)} ${fixed(y - 190 * scale)}" ${common}/>`);
    parts.push(`<path d="M ${fixed(x - 250 * scale)} ${fixed(y + 110 * scale)} C ${fixed(x - 45 * scale)} ${fixed(y + 75 * scale)} ${fixed(x + 10 * scale)} ${fixed(y + 195 * scale)} ${fixed(x + 230 * scale)} ${fixed(y + 110 * scale)}" ${faint} stroke-dasharray="8 12"/>`);
    parts.push(circle(x + 76 * scale, y - 35 * scale, 9, dot));
  } else if (seed.topic === "人格" || seed.topic === "自我") {
    for (let index = 0; index < 4; index += 1) {
      const offset = (index - 1.5) * 68 * scale;
      parts.push(`<path d="M ${fixed(x + offset - 34 * scale)} ${fixed(y - 165 * scale)} C ${fixed(x + offset + 70 * scale)} ${fixed(y - 125 * scale)} ${fixed(x + offset + 58 * scale)} ${fixed(y - 10 * scale)} ${fixed(x + offset + 8 * scale)} ${fixed(y + 8 * scale)} C ${fixed(x + offset + 85 * scale)} ${fixed(y + 65 * scale)} ${fixed(x + offset + 40 * scale)} ${fixed(y + 165 * scale)} ${fixed(x + offset - 30 * scale)} ${fixed(y + 180 * scale)}" ${index === 2 ? common : faint}/>`);
    }
    parts.push(`<path d="M ${fixed(x - 250 * scale)} ${fixed(y + 210 * scale)} Q ${fixed(x)} ${fixed(y + 130 * scale)} ${fixed(x + 245 * scale)} ${fixed(y + 205 * scale)}" ${faint}/>`);
    parts.push(circle(x + 34 * direction, y + 12, 8, dot));
  } else if (seed.topic === "关系" || seed.topic === "群体") {
    const count = seed.topic === "关系" ? 4 : 8;
    const nodes = Array.from({ length: count }, (_, index) => {
      const angle = (Math.PI * 2 * index) / count + rand() * 0.35;
      const radius = (105 + rand() * 115) * scale;
      return { x: x + Math.cos(angle) * radius, y: y + Math.sin(angle) * radius * 0.7 };
    });
    nodes.forEach((node, index) => {
      const other = nodes[(index + 1 + (hash32(seed.id + index) % Math.max(1, count - 1))) % count];
      parts.push(`<path d="M ${fixed(node.x)} ${fixed(node.y)} Q ${fixed(x + (rand() - 0.5) * 65)} ${fixed(y + (rand() - 0.5) * 65)} ${fixed(other.x)} ${fixed(other.y)}" ${index % 3 === 0 ? common : faint}/>`);
      parts.push(circle(node.x, node.y, index === 1 ? 8 : 4, index === 1 ? dot : `fill="${graphite}" opacity="0.34"`));
    });
  } else if (seed.topic === "发展") {
    const baseY = y + 180 * scale;
    for (let index = 0; index < 5; index += 1) {
      const px = x - 225 * scale + index * 112 * scale;
      const py = baseY - index * (70 + rand() * 22) * scale;
      parts.push(`<path d="M ${fixed(px - 42 * scale)} ${fixed(py)} L ${fixed(px + 42 * scale)} ${fixed(py)} L ${fixed(px + 42 * scale)} ${fixed(baseY)}" ${index === 3 ? common : faint}/>`);
      parts.push(circle(px, py - 3, index === 3 ? 8 : 3.5, index === 3 ? dot : `fill="${graphite}" opacity="0.30"`));
    }
    parts.push(`<path d="M ${fixed(x - 250 * scale)} ${fixed(baseY + 20)} Q ${fixed(x)} ${fixed(y - 215 * scale)} ${fixed(x + 265 * scale)} ${fixed(y - 155 * scale)}" ${faint} stroke-dasharray="8 13"/>`);
  }

  const tickAngle = rand() * Math.PI;
  for (let index = 0; index < 5; index += 1) {
    const distance = 215 + index * 22;
    const tx = x + Math.cos(tickAngle) * distance * scale;
    const ty = y + Math.sin(tickAngle) * distance * scale;
    parts.push(line(tx - 4, ty - 4, tx + 4, ty + 4, faint));
  }
  return parts.join("\n");
}

function overlaySvg(seed) {
  const rand = randomFor(seed.id);
  const veilFrom = rand() > 0.5 ? "0%" : "100%";
  const veilTo = veilFrom === "0%" ? "100%" : "0%";
  const motif = topicMotif(seed, rand);
  return Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${CANVAS.width}" height="${CANVAS.height}" viewBox="0 0 ${CANVAS.width} ${CANVAS.height}">
      <defs>
        <linearGradient id="veil" x1="${veilFrom}" y1="0%" x2="${veilTo}" y2="0%">
          <stop offset="0%" stop-color="#f3efe5" stop-opacity="0.13"/>
          <stop offset="52%" stop-color="#f3efe5" stop-opacity="0.025"/>
          <stop offset="100%" stop-color="#f3efe5" stop-opacity="0.10"/>
        </linearGradient>
      </defs>
      <rect width="1536" height="1024" fill="url(#veil)"/>
      <g>${motif}</g>
    </svg>
  `);
}

async function encodeWithinLimit(pipeline, output) {
  const qualities = [82, 78, 74, 70, 66];
  for (const quality of qualities) {
    const buffer = await pipeline.clone().webp({ quality, effort: 5, smartSubsample: true }).toBuffer();
    if (buffer.length <= MAX_BYTES) {
      await writeFile(output, buffer);
      return { bytes: buffer.length, quality };
    }
  }
  throw new Error(`Unable to keep ${path.basename(output)} below ${MAX_BYTES} bytes`);
}

function shorten(value, maximum) {
  const compact = value.replace(/\s+/g, " ").trim();
  return compact.length <= maximum ? compact : `${compact.slice(0, maximum - 1)}…`;
}

async function renderIllustration(seed, output) {
  const masterName = masterByTopic[seed.topic];
  const masterPath = path.join(masterDirectory, masterName);
  const rand = randomFor(`${seed.id}:crop`);
  const overscanWidth = 1600;
  const overscanHeight = Math.round((overscanWidth * 2) / 3);
  const left = Math.round(rand() * (overscanWidth - CANVAS.width));
  const top = Math.round(rand() * (overscanHeight - CANVAS.height));
  let base = sharp(masterPath)
    .resize(overscanWidth, overscanHeight, { fit: "cover" })
    .extract({ left, top, width: CANVAS.width, height: CANVAS.height })
    .modulate({ brightness: 1.005 + rand() * 0.018, saturation: 0.82 + rand() * 0.10 });
  if (hash32(`${seed.id}:mirror`) % 2 === 1) base = base.flop();
  const pipeline = base
    .composite([{ input: overlaySvg(seed), blend: "over" }])
    .flatten({ background: "#f3efe5" })
    .toColourspace("srgb");
  const encoded = await encodeWithinLimit(pipeline, output);
  const metadata = await sharp(output).metadata();
  if (
    metadata.width !== CANVAS.width ||
    metadata.height !== CANVAS.height ||
    metadata.format !== "webp" ||
    metadata.hasAlpha
  ) {
    throw new Error(`Invalid output metadata for ${output}: ${JSON.stringify(metadata)}`);
  }
  return { ...encoded, masterName };
}

async function createContactSheet(items) {
  const columns = 8;
  const thumbWidth = 192;
  const thumbHeight = 128;
  const rows = Math.ceil(items.length / columns);
  const composites = [];
  for (let index = 0; index < items.length; index += 1) {
    const item = items[index];
    const input = await sharp(path.join(projectRoot, item.diskPath))
      .resize(thumbWidth, thumbHeight, { fit: "cover" })
      .toBuffer();
    composites.push({
      input,
      left: (index % columns) * thumbWidth,
      top: Math.floor(index / columns) * thumbHeight,
    });
  }
  const output = path.join(designDirectory, "psychology-v1-contact-sheet.webp");
  await sharp({
    create: {
      width: columns * thumbWidth,
      height: rows * thumbHeight,
      channels: 3,
      background: "#f3efe5",
    },
  })
    .composite(composites)
    .webp({ quality: 78, effort: 5 })
    .toFile(output);
  return output;
}

async function pathExists(filename) {
  try {
    await stat(filename);
    return true;
  } catch (error) {
    if (error?.code === "ENOENT") return false;
    throw error;
  }
}

async function main() {
  const options = parseArguments(process.argv.slice(2));
  const [seeds, registry] = await Promise.all([readPsychologySeeds(), registryState()]);
  const alreadyRegistered = seeds.filter((seed) => registry.thoughtIds.has(seed.id));
  if (alreadyRegistered.length) {
    throw new Error(
      `Psychology illustrations already registered: ${alreadyRegistered.map((seed) => seed.id).join(", ")}`,
    );
  }
  const inferredStart = Math.max(FALLBACK_ASSET_START, registry.maxAssetNumber + 1);
  const assetStart = options.assetStart ?? inferredStart;
  if (assetStart <= registry.maxAssetNumber) {
    throw new Error(
      `Asset start ${assetStart} overlaps registry maximum ${registry.maxAssetNumber}`,
    );
  }

  await Promise.all([
    mkdir(publicDirectory, { recursive: true }),
    mkdir(designDirectory, { recursive: true }),
  ]);

  const items = [];
  for (let index = 0; index < seeds.length; index += 1) {
    const seed = seeds[index];
    const filename = `${seed.id}-v1.webp`;
    const output = path.join(publicDirectory, filename);
    if ((await pathExists(output)) && !options.force) {
      throw new Error(`${output} exists; rerun with --force to reproduce it`);
    }
    const assetNumber = assetStart + index;
    const item = {
      thoughtId: seed.id,
      assetId: `${ASSET_PREFIX}-${assetNumber}`,
      src: `/illustrations/${filename}`,
      diskPath: path.relative(projectRoot, output),
      width: CANVAS.width,
      height: CANVAS.height,
      altZh: `以${seed.topic}为主题、表现“${shorten(seed.text, 24)}”的极简心理手稿插画`,
      altEn: `Minimal psychology manuscript illustration about ${topicEnglish[seed.topic]}, interpreting “${shorten(seed.english, 84)}”`,
      captionZh: seed.question,
      captionEn: seed.englishQuestion,
      corpus: "psychology",
      placement: ["detail", "share"],
      master: masterByTopic[seed.topic],
      motif: motifByTopic[seed.topic],
      topic: seed.topic,
      generationSeed: `${GENERATION_SEED}:${seed.id}`,
      sourceFile: seed.sourceFile,
    };
    if (!options.dryRun) {
      const rendered = await renderIllustration(seed, output);
      item.bytes = rendered.bytes;
      item.quality = rendered.quality;
    }
    items.push(item);
  }

  const manifest = {
    version: 1,
    corpus: "psychology",
    generator: "scripts/generate-psychology-illustrations.mjs",
    generationSeed: GENERATION_SEED,
    imagegenMasters: Object.values(masterByTopic).filter(
      (master, index, masters) => masters.indexOf(master) === index,
    ),
    canvas: CANVAS,
    maximumBytes: MAX_BYTES,
    assetRange: [
      `${ASSET_PREFIX}-${assetStart}`,
      `${ASSET_PREFIX}-${assetStart + items.length - 1}`,
    ],
    items,
  };
  const metadataPath = path.join(
    designDirectory,
    "psychology-v1-registry-metadata.json",
  );
  if (!options.dryRun) {
    await writeFile(metadataPath, `${JSON.stringify(manifest, null, 2)}\n`);
    await createContactSheet(items);
  } else {
    process.stdout.write(`${JSON.stringify(manifest, null, 2)}\n`);
  }

  const sizes = items.map((item) => item.bytes ?? 0);
  const report = {
    count: items.length,
    assetStart,
    assetEnd: assetStart + items.length - 1,
    minBytes: Math.min(...sizes),
    maxBytes: Math.max(...sizes),
    averageBytes: Math.round(sizes.reduce((sum, bytes) => sum + bytes, 0) / sizes.length),
    topics: Object.fromEntries(
      [...new Set(items.map((item) => item.topic))]
        .sort()
        .map((topic) => [topic, items.filter((item) => item.topic === topic).length]),
    ),
    metadata: path.relative(projectRoot, metadataPath),
  };
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
}

await main();
