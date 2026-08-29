import { createHash } from "node:crypto";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import sharp from "sharp";
import { tsImport } from "tsx/esm/api";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const contentDirectory = path.join(projectRoot, "content");
const publicDirectory = path.join(projectRoot, "public", "illustrations");
const designDirectory = path.join(projectRoot, "design", "illustrations");

const CANVAS = Object.freeze({ width: 1536, height: 1024 });
const GENERATION_SEED = "agora-economics-expansion-v17-2026-08-06";
const ASSET_PREFIX = "threshold-manuscript";
const ASSET_START = 1228;
const EXPECTED_COUNT = 206;
const ASSET_END = ASSET_START + EXPECTED_COUNT - 1;
const MAX_BYTES = 420 * 1024;
const METADATA_FILENAME = "economics-expansion-v17-registry-metadata.json";
const CONTACT_SHEET_FILENAME = "economics-expansion-v17-contact-sheet.webp";

const masterManifestDefinitions = [
  {
    group: "principles",
    file: "economics-v16-foundations-normalized/normalized-manifest.json",
  },
  {
    group: "modern",
    file: "economics-v16-modern-normalized/normalized-manifest.json",
  },
  {
    group: "investment",
    file: "economics-v16-investment-normalized/normalized-manifest.json",
  },
];

const topicEnglish = Object.freeze({
  市场: "markets and exchange",
  制度: "institutions and rules",
  增长: "growth and productivity",
  货币: "money and credit",
  行为: "behavior and judgment",
  分配: "distribution and welfare",
  投资: "investment and capital allocation",
});

const topicMotifNames = Object.freeze({
  市场: ["交换路径", "价格信号", "供需交点"],
  制度: ["规则边界", "治理框架", "契约结构"],
  增长: ["累积阶梯", "创新分枝", "生产率轨迹"],
  货币: ["信用回路", "货币流向", "债务周期"],
  行为: ["判断分岔", "参照坐标", "选择偏移"],
  分配: ["分配天平", "资源流束", "福利边界"],
  投资: ["风险扇面", "价值刻度", "复利路径"],
});

const semanticSignals = [
  {
    id: "risk",
    zh: "风险边界",
    en: "risk boundaries",
    pattern: /风险|不确定|危机|脆弱|波动|损失|尾部|安全边际|risk|uncertain|crisis|fragil|volatil|loss|tail|margin of safety/i,
  },
  {
    id: "signal",
    zh: "信息与信号",
    en: "information and signals",
    pattern: /信息|知识|信号|价格|预期|发现|information|knowledge|signal|price|expectation|discover/i,
  },
  {
    id: "horizon",
    zh: "时间地平线",
    en: "time horizons",
    pattern: /长期|时间|耐心|复利|周期|未来|long.term|time|patient|compound|cycle|future/i,
  },
  {
    id: "structure",
    zh: "制度结构",
    en: "institutional structures",
    pattern: /制度|规则|法律|产权|契约|组织|治理|institution|rule|law|property|contract|organi[sz]|govern/i,
  },
  {
    id: "balance",
    zh: "分配与平衡",
    en: "distribution and balance",
    pattern: /分配|平等|贫困|财富|福利|公平|收入|distribution|equal|poverty|wealth|welfare|fair|income/i,
  },
  {
    id: "growth",
    zh: "增长与创新",
    en: "growth and innovation",
    pattern: /增长|创新|生产率|技术|资本|积累|growth|innovat|productiv|technolog|capital|accumul/i,
  },
  {
    id: "decision",
    zh: "判断与选择",
    en: "judgment and choice",
    pattern: /行为|偏差|判断|选择|决策|激励|behavior|bias|judg|choice|decision|incentive/i,
  },
  {
    id: "exchange",
    zh: "交换网络",
    en: "exchange networks",
    pattern: /市场|交换|交易|贸易|供给|需求|market|exchange|trade|supply|demand/i,
  },
  {
    id: "flow",
    zh: "货币与信用流",
    en: "monetary and credit flows",
    pattern: /货币|信用|债务|银行|通胀|利率|money|credit|debt|bank|inflation|interest rate/i,
  },
];

const fallbackSignalByTopic = Object.freeze({
  市场: "exchange",
  制度: "structure",
  增长: "growth",
  货币: "flow",
  行为: "decision",
  分配: "balance",
  投资: "horizon",
});

function parseArguments(argv) {
  const options = { force: false, dryRun: false, verifyOnly: false };
  for (const argument of argv) {
    if (argument === "--force") options.force = true;
    else if (argument === "--dry-run") options.dryRun = true;
    else if (argument === "--verify-only") options.verifyOnly = true;
    else throw new Error(`Unknown argument: ${argument}`);
  }
  if (options.dryRun && options.verifyOnly) {
    throw new Error("--dry-run and --verify-only cannot be combined");
  }
  return options;
}

function hash32(value) {
  return createHash("sha256")
    .update(`${GENERATION_SEED}:${value}`)
    .digest()
    .readUInt32LE(0);
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

function line(x1, y1, x2, y2, attributes = "") {
  return `<line x1="${fixed(x1)}" y1="${fixed(y1)}" x2="${fixed(x2)}" y2="${fixed(y2)}" ${attributes}/>`;
}

function circle(x, y, radius, attributes = "") {
  return `<circle cx="${fixed(x)}" cy="${fixed(y)}" r="${fixed(radius)}" ${attributes}/>`;
}

function pathElement(data, attributes = "") {
  return `<path d="${data}" ${attributes}/>`;
}

function shorten(value, maximum) {
  const compact = value.replace(/\s+/g, " ").trim();
  return compact.length <= maximum ? compact : `${compact.slice(0, maximum - 1)}…`;
}

function signalForThought(thought) {
  const searchable = [thought.id, thought.text, thought.english, thought.reflection, thought.englishReflection]
    .filter(Boolean)
    .join(" ");
  return (
    semanticSignals.find((signal) => signal.pattern.test(searchable)) ??
    semanticSignals.find((signal) => signal.id === fallbackSignalByTopic[thought.topic])
  );
}

function motifNameForThought(thought) {
  const choices = topicMotifNames[thought.topic];
  if (!choices) throw new Error(`${thought.id} has unsupported topic ${thought.topic}`);
  return choices[hash32(`${thought.id}:motif-name`) % choices.length];
}

function topicMotif(thought, rand) {
  const x = 320 + rand() * 900;
  const y = 250 + rand() * 510;
  const scale = 0.78 + rand() * 0.42;
  const direction = rand() > 0.5 ? 1 : -1;
  const graphite = "#45423d";
  const accent = "#637b74";
  const rust = "#8a6e58";
  const strong = `fill="none" stroke="${graphite}" stroke-width="2.0" stroke-linecap="round" stroke-linejoin="round" opacity="0.34"`;
  const medium = `fill="none" stroke="${graphite}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" opacity="0.23"`;
  const faint = `fill="none" stroke="${graphite}" stroke-width="1.0" stroke-linecap="round" stroke-linejoin="round" opacity="0.14"`;
  const accentDot = `fill="${accent}" opacity="0.72"`;
  const rustDot = `fill="${rust}" opacity="0.58"`;
  const parts = [];

  if (thought.topic === "市场") {
    const count = 7;
    const nodes = Array.from({ length: count }, (_, index) => {
      const angle = (Math.PI * 2 * index) / count + rand() * 0.22;
      const radius = (125 + rand() * 135) * scale;
      return {
        x: x + Math.cos(angle) * radius,
        y: y + Math.sin(angle) * radius * 0.66,
      };
    });
    for (let index = 0; index < nodes.length; index += 1) {
      const node = nodes[index];
      const target = nodes[(index + 2 + (hash32(`${thought.id}:${index}`) % 3)) % count];
      parts.push(pathElement(
        `M ${fixed(node.x)} ${fixed(node.y)} Q ${fixed(x + (rand() - 0.5) * 85)} ${fixed(y + (rand() - 0.5) * 65)} ${fixed(target.x)} ${fixed(target.y)}`,
        index % 3 === 0 ? strong : faint,
      ));
      parts.push(circle(node.x, node.y, index === 2 ? 8 : 4, index === 2 ? accentDot : `fill="${graphite}" opacity="0.34"`));
    }
    parts.push(line(x - 300 * scale, y + 205 * scale, x + 310 * scale, y + 205 * scale, medium));
  } else if (thought.topic === "制度") {
    const frameWidth = 500 * scale;
    const frameHeight = 330 * scale;
    parts.push(`<rect x="${fixed(x - frameWidth / 2)}" y="${fixed(y - frameHeight / 2)}" width="${fixed(frameWidth)}" height="${fixed(frameHeight)}" ${medium}/>`);
    for (let index = 0; index < 5; index += 1) {
      const px = x - frameWidth * 0.38 + index * frameWidth * 0.19;
      parts.push(line(px, y - frameHeight * 0.34, px, y + frameHeight * 0.35, index === 2 ? strong : faint));
    }
    parts.push(pathElement(
      `M ${fixed(x - frameWidth * 0.55)} ${fixed(y + direction * frameHeight * 0.08)} C ${fixed(x - frameWidth * 0.18)} ${fixed(y - direction * frameHeight * 0.42)} ${fixed(x + frameWidth * 0.2)} ${fixed(y + direction * frameHeight * 0.4)} ${fixed(x + frameWidth * 0.56)} ${fixed(y - direction * frameHeight * 0.12)}`,
      strong,
    ));
    parts.push(circle(x, y, 8, accentDot));
  } else if (thought.topic === "增长") {
    const baseY = y + 210 * scale;
    for (let index = 0; index < 6; index += 1) {
      const width = 88 * scale;
      const px = x - 275 * scale + index * 104 * scale;
      const py = baseY - index * (54 + rand() * 14) * scale;
      parts.push(pathElement(
        `M ${fixed(px - width / 2)} ${fixed(baseY)} L ${fixed(px - width / 2)} ${fixed(py)} L ${fixed(px + width / 2)} ${fixed(py)} L ${fixed(px + width / 2)} ${fixed(baseY)}`,
        index === 4 ? strong : faint,
      ));
      parts.push(circle(px, py, index === 4 ? 8 : 3.5, index === 4 ? accentDot : `fill="${graphite}" opacity="0.30"`));
    }
    parts.push(pathElement(
      `M ${fixed(x - 310 * scale)} ${fixed(baseY + 32)} Q ${fixed(x - 30 * scale)} ${fixed(y - 190 * scale)} ${fixed(x + 310 * scale)} ${fixed(y - 175 * scale)}`,
      medium,
    ));
  } else if (thought.topic === "货币") {
    for (let index = 0; index < 5; index += 1) {
      const radius = (54 + index * 49) * scale;
      const start = -120 + index * 21 + rand() * 15;
      const end = 155 - index * 9;
      const startRad = (start * Math.PI) / 180;
      const endRad = (end * Math.PI) / 180;
      parts.push(pathElement(
        `M ${fixed(x + Math.cos(startRad) * radius)} ${fixed(y + Math.sin(startRad) * radius)} A ${fixed(radius)} ${fixed(radius)} 0 1 1 ${fixed(x + Math.cos(endRad) * radius)} ${fixed(y + Math.sin(endRad) * radius)}`,
        index === 2 ? strong : faint,
      ));
    }
    parts.push(pathElement(
      `M ${fixed(x - 310 * scale)} ${fixed(y + 165 * direction)} C ${fixed(x - 135 * scale)} ${fixed(y - 190 * direction)} ${fixed(x + 120 * scale)} ${fixed(y + 185 * direction)} ${fixed(x + 315 * scale)} ${fixed(y - 125 * direction)}`,
      medium,
    ));
    parts.push(circle(x, y, 9, accentDot));
  } else if (thought.topic === "行为") {
    parts.push(pathElement(
      `M ${fixed(x)} ${fixed(y + 245 * scale)} Q ${fixed(x)} ${fixed(y + 55 * scale)} ${fixed(x)} ${fixed(y)} Q ${fixed(x - 95 * scale)} ${fixed(y - 80 * scale)} ${fixed(x - 290 * scale)} ${fixed(y - 165 * scale)} M ${fixed(x)} ${fixed(y)} Q ${fixed(x + 85 * scale)} ${fixed(y - 105 * scale)} ${fixed(x + 285 * scale)} ${fixed(y - 125 * scale)}`,
      strong,
    ));
    parts.push(pathElement(
      `M ${fixed(x - 285 * scale)} ${fixed(y + 115 * scale)} Q ${fixed(x - 80 * scale)} ${fixed(y + 40 * scale)} ${fixed(x + 275 * scale)} ${fixed(y + 145 * scale)}`,
      faint + ` stroke-dasharray="8 12"`,
    ));
    parts.push(circle(x, y, 9, accentDot));
    parts.push(circle(x + 180 * scale, y - 92 * scale, 5, rustDot));
  } else if (thought.topic === "分配") {
    const beamY = y - 30 * scale;
    parts.push(line(x - 290 * scale, beamY, x + 290 * scale, beamY + direction * 25, strong));
    parts.push(line(x, beamY - 35, x, y + 235 * scale, medium));
    parts.push(pathElement(
      `M ${fixed(x - 225 * scale)} ${fixed(beamY + 5)} L ${fixed(x - 255 * scale)} ${fixed(y + 145 * scale)} L ${fixed(x - 115 * scale)} ${fixed(y + 145 * scale)} Z M ${fixed(x + 225 * scale)} ${fixed(beamY + 18 * direction)} L ${fixed(x + 120 * scale)} ${fixed(y + 115 * scale)} L ${fixed(x + 285 * scale)} ${fixed(y + 115 * scale)} Z`,
      medium,
    ));
    for (let index = 0; index < 7; index += 1) {
      const px = x - 225 * scale + index * 74 * scale;
      parts.push(circle(px, y + 170 * scale + (rand() - 0.5) * 20, index === 1 ? 7 : 3.5, index === 1 ? accentDot : `fill="${graphite}" opacity="0.28"`));
    }
  } else if (thought.topic === "投资") {
    for (let index = 0; index < 5; index += 1) {
      const endX = x + (150 + index * 45) * scale;
      const endY = y + (index - 2) * 86 * scale + (rand() - 0.5) * 35;
      parts.push(pathElement(
        `M ${fixed(x - 285 * scale)} ${fixed(y + 175 * scale)} Q ${fixed(x - 35 * scale)} ${fixed(y + (rand() - 0.5) * 110)} ${fixed(endX)} ${fixed(endY)}`,
        index === 2 ? strong : faint,
      ));
    }
    parts.push(pathElement(
      `M ${fixed(x - 300 * scale)} ${fixed(y + 210 * scale)} C ${fixed(x - 120 * scale)} ${fixed(y + 180 * scale)} ${fixed(x - 30 * scale)} ${fixed(y - 25 * scale)} ${fixed(x + 20 * scale)} ${fixed(y - 15 * scale)} S ${fixed(x + 220 * scale)} ${fixed(y - 135 * scale)} ${fixed(x + 320 * scale)} ${fixed(y - 210 * scale)}`,
      medium,
    ));
    parts.push(circle(x + 18 * scale, y - 14 * scale, 9, accentDot));
  } else {
    throw new Error(`${thought.id} has unsupported topic ${thought.topic}`);
  }

  const angle = rand() * Math.PI * 2;
  for (let index = 0; index < 6; index += 1) {
    const distance = (230 + index * 24) * scale;
    const tx = x + Math.cos(angle) * distance;
    const ty = y + Math.sin(angle) * distance * 0.72;
    parts.push(line(tx - 4, ty - 4, tx + 4, ty + 4, faint));
  }
  return parts.join("\n");
}

function secondarySignalGlyph(thought, signal, rand) {
  const x = rand() > 0.5 ? 1270 : 265;
  const y = 160 + rand() * 665;
  const graphite = "#45423d";
  const accent = "#637b74";
  const ink = `fill="none" stroke="${graphite}" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" opacity="0.16"`;
  const dot = `fill="${accent}" opacity="0.52"`;
  const parts = [];
  if (signal.id === "risk") {
    parts.push(pathElement(`M ${fixed(x - 80)} ${fixed(y + 65)} L ${fixed(x)} ${fixed(y - 80)} L ${fixed(x + 80)} ${fixed(y + 65)}`, ink));
    parts.push(line(x - 55, y + 25, x + 58, y + 25, ink));
    parts.push(circle(x, y - 1, 5.5, dot));
  } else if (signal.id === "signal") {
    for (let index = 0; index < 4; index += 1) {
      const radius = 25 + index * 25;
      parts.push(pathElement(`M ${fixed(x)} ${fixed(y)} m ${fixed(-radius)} 0 a ${radius} ${radius} 0 0 1 ${fixed(radius * 2)} 0`, ink));
    }
    parts.push(circle(x, y, 5, dot));
  } else if (signal.id === "horizon") {
    parts.push(line(x - 110, y, x + 110, y, ink));
    parts.push(pathElement(`M ${fixed(x - 95)} ${fixed(y + 45)} Q ${fixed(x)} ${fixed(y - 85)} ${fixed(x + 95)} ${fixed(y + 45)}`, ink));
    parts.push(circle(x + 48 * (hash32(thought.id) % 2 ? 1 : -1), y - 35, 5, dot));
  } else if (signal.id === "structure") {
    parts.push(`<rect x="${fixed(x - 92)}" y="${fixed(y - 74)}" width="184" height="148" ${ink}/>`);
    parts.push(line(x - 30, y - 74, x - 30, y + 74, ink));
    parts.push(line(x + 30, y - 74, x + 30, y + 74, ink));
    parts.push(circle(x + 30, y, 5, dot));
  } else if (signal.id === "balance") {
    parts.push(line(x - 100, y - 24, x + 100, y - 10, ink));
    parts.push(line(x, y - 50, x, y + 90, ink));
    parts.push(circle(x - 45, y - 20, 5, dot));
  } else if (signal.id === "growth") {
    parts.push(pathElement(`M ${fixed(x - 100)} ${fixed(y + 70)} Q ${fixed(x - 10)} ${fixed(y + 80)} ${fixed(x + 20)} ${fixed(y - 5)} T ${fixed(x + 105)} ${fixed(y - 82)}`, ink));
    parts.push(circle(x + 20, y - 5, 5, dot));
  } else if (signal.id === "decision") {
    parts.push(pathElement(`M ${fixed(x)} ${fixed(y + 90)} L ${fixed(x)} ${fixed(y)} L ${fixed(x - 90)} ${fixed(y - 70)} M ${fixed(x)} ${fixed(y)} L ${fixed(x + 95)} ${fixed(y - 48)}`, ink));
    parts.push(circle(x, y, 5, dot));
  } else if (signal.id === "exchange") {
    parts.push(pathElement(`M ${fixed(x - 105)} ${fixed(y - 35)} Q ${fixed(x)} ${fixed(y - 95)} ${fixed(x + 105)} ${fixed(y - 35)} M ${fixed(x + 105)} ${fixed(y + 35)} Q ${fixed(x)} ${fixed(y + 95)} ${fixed(x - 105)} ${fixed(y + 35)}`, ink));
    parts.push(circle(x - 105, y - 35, 5, dot));
    parts.push(circle(x + 105, y + 35, 5, dot));
  } else {
    parts.push(pathElement(`M ${fixed(x - 105)} ${fixed(y + 50)} C ${fixed(x - 45)} ${fixed(y - 80)} ${fixed(x + 45)} ${fixed(y + 85)} ${fixed(x + 105)} ${fixed(y - 50)}`, ink));
    parts.push(circle(x, y, 5, dot));
  }
  return parts.join("\n");
}

function overlaySvg(thought) {
  const rand = randomFor(`${thought.id}:overlay`);
  const direction = rand() > 0.5 ? ["0%", "100%"] : ["100%", "0%"];
  const signal = signalForThought(thought);
  return Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${CANVAS.width}" height="${CANVAS.height}" viewBox="0 0 ${CANVAS.width} ${CANVAS.height}">
      <defs>
        <linearGradient id="veil" x1="${direction[0]}" y1="0%" x2="${direction[1]}" y2="0%">
          <stop offset="0%" stop-color="#f2eee3" stop-opacity="0.12"/>
          <stop offset="48%" stop-color="#f2eee3" stop-opacity="0.015"/>
          <stop offset="100%" stop-color="#f2eee3" stop-opacity="0.08"/>
        </linearGradient>
      </defs>
      <rect width="1536" height="1024" fill="url(#veil)"/>
      <g>${topicMotif(thought, rand)}</g>
      <g>${secondarySignalGlyph(thought, signal, rand)}</g>
    </svg>
  `);
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

async function sha256File(filename) {
  return createHash("sha256").update(await readFile(filename)).digest("hex");
}

async function loadProjectModules() {
  const [economics, illustrations] = await Promise.all([
    tsImport(pathToFileURL(path.join(contentDirectory, "economics.ts")).href, import.meta.url),
    tsImport(pathToFileURL(path.join(contentDirectory, "illustrations.ts")).href, import.meta.url),
  ]);
  return { economics, illustrations };
}

async function loadV16Masters(catalog, registeredThoughtIds) {
  const thoughtById = new Map(catalog.thoughts.map((thought) => [thought.id, thought]));
  const masters = [];
  const seenThoughtIds = new Set();
  for (const definition of masterManifestDefinitions) {
    const manifestPath = path.join(designDirectory, definition.file);
    const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
    if (!Array.isArray(manifest.items)) {
      throw new Error(`${definition.file} does not contain an items array`);
    }
    for (const item of manifest.items) {
      if (seenThoughtIds.has(item.thoughtId)) {
        throw new Error(`Duplicate v16 master thoughtId: ${item.thoughtId}`);
      }
      seenThoughtIds.add(item.thoughtId);
      const thought = thoughtById.get(item.thoughtId);
      if (!thought) throw new Error(`v16 master is not in complete economics catalog: ${item.thoughtId}`);
      if (!registeredThoughtIds.has(item.thoughtId)) {
        throw new Error(`v16 master is not in the current illustration registry: ${item.thoughtId}`);
      }
      const resolvedSource = path.join(designDirectory, item.source);
      if (!(await pathExists(resolvedSource))) {
        throw new Error(`Missing v16 source master: ${resolvedSource}`);
      }
      const actualGroup = catalog.collectionForThought(item.thoughtId);
      if (actualGroup !== definition.group) {
        throw new Error(`${item.thoughtId} belongs to ${actualGroup}, not ${definition.group}`);
      }
      masters.push({
        thoughtId: item.thoughtId,
        group: definition.group,
        topic: thought.topic,
        source: resolvedSource,
        master: path.relative(projectRoot, resolvedSource),
      });
    }
  }
  if (masters.length !== 94) {
    throw new Error(`Expected 94 economics v16 masters, found ${masters.length}`);
  }
  return masters;
}

function selectMaster(thought, group, masters) {
  const exact = masters.filter((master) => master.group === group && master.topic === thought.topic);
  const sameGroup = masters.filter((master) => master.group === group);
  const sameTopic = masters.filter((master) => master.topic === thought.topic);
  const candidates = exact.length ? exact : sameGroup.length ? sameGroup : sameTopic;
  if (!candidates.length) throw new Error(`No v16 master available for ${thought.id}`);
  return candidates[hash32(`${thought.id}:master`) % candidates.length];
}

async function readGenerationPlan() {
  const { economics, illustrations } = await loadProjectModules();
  const catalog = await economics.loadCompleteEconomicsCatalog();
  const registryEntries = illustrations.thoughtIllustrations;
  const registeredThoughtIds = new Set(registryEntries.map((entry) => entry.thoughtId));
  const missing = catalog.thoughts.filter((thought) => !registeredThoughtIds.has(thought.id));
  if (catalog.thoughts.length !== 300) {
    throw new Error(`Expected complete economics catalog of 300, found ${catalog.thoughts.length}`);
  }
  if (missing.length !== EXPECTED_COUNT) {
    throw new Error(`Expected ${EXPECTED_COUNT} unregistered economics thoughts, found ${missing.length}`);
  }
  const duplicateThoughtIds = missing
    .map((thought) => thought.id)
    .filter((id, index, ids) => ids.indexOf(id) !== index);
  if (duplicateThoughtIds.length) {
    throw new Error(`Duplicate missing thought IDs: ${[...new Set(duplicateThoughtIds)].join(", ")}`);
  }
  const assetCollisions = registryEntries.filter((entry) => {
    const number = Number(entry.assetId.match(/(\d+)$/)?.[1]);
    return number >= ASSET_START && number <= ASSET_END;
  });
  if (assetCollisions.length) {
    throw new Error(`Asset range ${ASSET_START}-${ASSET_END} collides with current registry`);
  }
  const masters = await loadV16Masters(catalog, registeredThoughtIds);
  return missing.map((thought, index) => {
    const group = catalog.collectionForThought(thought.id);
    if (!group) throw new Error(`No economics collection found for ${thought.id}`);
    const master = selectMaster(thought, group, masters);
    const signal = signalForThought(thought);
    const filename = `${thought.id}-v1.webp`;
    return {
      thought,
      group,
      master,
      signal,
      output: path.join(publicDirectory, filename),
      registry: {
        thoughtId: thought.id,
        assetId: `${ASSET_PREFIX}-${ASSET_START + index}`,
        src: `/illustrations/${filename}`,
        width: CANVAS.width,
        height: CANVAS.height,
        altZh: `表现“${shorten(thought.text, 38)}”的极简经济手稿插画，以${signal.zh}线条构图呈现`,
        altEn: `Minimal economics manuscript illustration about ${topicEnglish[thought.topic]}, using ${signal.en} to interpret “${shorten(thought.english, 96)}”`,
        captionZh: thought.question,
        captionEn: thought.englishQuestion,
        placement: ["detail", "share"],
        topic: thought.topic,
        master: master.master,
      },
    };
  });
}

async function encodeWithinLimit(pipeline, output) {
  const qualities = [82, 78, 74, 70, 66, 62, 58];
  for (const quality of qualities) {
    const buffer = await pipeline
      .clone()
      .webp({ quality, effort: 6, smartSubsample: true })
      .toBuffer();
    if (buffer.length <= MAX_BYTES) {
      await writeFile(output, buffer);
      return { bytes: buffer.length, quality };
    }
  }
  throw new Error(`Unable to keep ${path.basename(output)} below ${MAX_BYTES} bytes`);
}

async function renderIllustration(planItem) {
  const { thought } = planItem;
  const rand = randomFor(`${thought.id}:crop`);
  const overscanWidth = 1600;
  const overscanHeight = 1067;
  const left = Math.round(rand() * (overscanWidth - CANVAS.width));
  const top = Math.round(rand() * (overscanHeight - CANVAS.height));
  let base = sharp(planItem.master.source)
    .resize(overscanWidth, overscanHeight, { fit: "cover" })
    .extract({ left, top, width: CANVAS.width, height: CANVAS.height })
    .modulate({
      brightness: 0.99 + rand() * 0.035,
      saturation: 0.84 + rand() * 0.13,
    });
  if (hash32(`${thought.id}:mirror`) % 2 === 1) base = base.flop();
  const pipeline = base
    .composite([{ input: overlaySvg(thought), blend: "over" }])
    .flatten({ background: "#f2eee3" })
    .toColourspace("srgb");
  return encodeWithinLimit(pipeline, planItem.output);
}

async function mapConcurrent(items, concurrency, worker) {
  const results = new Array(items.length);
  let nextIndex = 0;
  async function runWorker() {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await worker(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, () => runWorker()));
  return results;
}

async function validateOutputs(items) {
  const thoughtIds = new Set();
  const assetIds = new Set();
  const sources = new Set();
  const hashes = new Set();
  const results = [];
  for (let index = 0; index < items.length; index += 1) {
    const item = items[index];
    for (const [set, value, label] of [
      [thoughtIds, item.registry.thoughtId, "thoughtId"],
      [assetIds, item.registry.assetId, "assetId"],
      [sources, item.registry.src, "src"],
    ]) {
      if (set.has(value)) throw new Error(`Duplicate ${label}: ${value}`);
      set.add(value);
    }
    const expectedAssetId = `${ASSET_PREFIX}-${ASSET_START + index}`;
    if (item.registry.assetId !== expectedAssetId) {
      throw new Error(`Unexpected asset sequence at ${item.registry.thoughtId}`);
    }
    const fileStat = await stat(item.output);
    if (fileStat.size > MAX_BYTES) {
      throw new Error(`${item.output} exceeds ${MAX_BYTES} bytes`);
    }
    const metadata = await sharp(item.output).metadata();
    if (
      metadata.width !== CANVAS.width ||
      metadata.height !== CANVAS.height ||
      metadata.format !== "webp" ||
      metadata.hasAlpha ||
      metadata.space !== "srgb"
    ) {
      throw new Error(`Invalid image metadata for ${item.output}: ${JSON.stringify(metadata)}`);
    }
    const sha256 = await sha256File(item.output);
    if (hashes.has(sha256)) {
      throw new Error(`Duplicate image hash at ${item.registry.thoughtId}: ${sha256}`);
    }
    hashes.add(sha256);
    results.push({ bytes: fileStat.size, sha256 });
  }
  if (
    thoughtIds.size !== EXPECTED_COUNT ||
    assetIds.size !== EXPECTED_COUNT ||
    sources.size !== EXPECTED_COUNT ||
    hashes.size !== EXPECTED_COUNT
  ) {
    throw new Error("Generated output uniqueness validation failed");
  }
  return results;
}

async function createContactSheet(items) {
  const columns = 8;
  const cellWidth = 192;
  const cellHeight = 128;
  const inset = 2;
  const rows = Math.ceil(items.length / columns);
  const composites = await mapConcurrent(items, 8, async (item, index) => {
    const thumbnail = await sharp(item.output)
      .resize(cellWidth - inset * 2, cellHeight - inset * 2, { fit: "cover" })
      .toBuffer();
    return {
      input: thumbnail,
      left: (index % columns) * cellWidth + inset,
      top: Math.floor(index / columns) * cellHeight + inset,
    };
  });
  const output = path.join(designDirectory, CONTACT_SHEET_FILENAME);
  await sharp({
    create: {
      width: columns * cellWidth,
      height: rows * cellHeight,
      channels: 3,
      background: "#d9d2c4",
    },
  })
    .composite(composites)
    .webp({ quality: 78, effort: 6 })
    .toFile(output);
  return output;
}

function summarize(items) {
  const byGroup = {};
  const byTopic = {};
  const bySignal = {};
  const byMaster = {};
  for (const item of items) {
    byGroup[item.group] = (byGroup[item.group] ?? 0) + 1;
    byTopic[item.thought.topic] = (byTopic[item.thought.topic] ?? 0) + 1;
    bySignal[item.signal.id] = (bySignal[item.signal.id] ?? 0) + 1;
    byMaster[item.master.master] = (byMaster[item.master.master] ?? 0) + 1;
  }
  return { byGroup, byTopic, bySignal, distinctMasters: Object.keys(byMaster).length };
}

async function main() {
  const options = parseArguments(process.argv.slice(2));
  const items = await readGenerationPlan();
  await Promise.all([
    mkdir(publicDirectory, { recursive: true }),
    mkdir(designDirectory, { recursive: true }),
  ]);

  const existingOutputs = [];
  for (const item of items) {
    if (await pathExists(item.output)) existingOutputs.push(item.output);
  }
  if (options.verifyOnly && existingOutputs.length !== EXPECTED_COUNT) {
    throw new Error(`--verify-only expected ${EXPECTED_COUNT} files, found ${existingOutputs.length}`);
  }
  if (!options.force && !options.verifyOnly && existingOutputs.length) {
    throw new Error(
      `${existingOutputs.length} target files already exist; refusing to overwrite. Use --force only to reproduce this exact batch.`,
    );
  }

  if (options.dryRun) {
    process.stdout.write(`${JSON.stringify({
      count: items.length,
      assetRange: [`${ASSET_PREFIX}-${ASSET_START}`, `${ASSET_PREFIX}-${ASSET_END}`],
      ...summarize(items),
      outputsAlreadyPresent: existingOutputs.length,
    }, null, 2)}\n`);
    return;
  }

  const renderResults = options.verifyOnly
    ? items.map(() => null)
    : await mapConcurrent(items, 6, async (item, index) => {
        const result = await renderIllustration(item);
        if ((index + 1) % 20 === 0 || index + 1 === items.length) {
          process.stdout.write(`rendered ${index + 1}/${items.length}\n`);
        }
        return result;
      });

  const validation = await validateOutputs(items);
  const registryItems = items.map((item, index) => ({
    ...item.registry,
    corpus: "economics",
    collection: item.group,
    semanticMotif: item.signal.id,
    motif: motifNameForThought(item.thought),
    generationSeed: `${GENERATION_SEED}:${item.thought.id}`,
    quality: renderResults[index]?.quality ?? null,
    bytes: validation[index].bytes,
    sha256: validation[index].sha256,
  }));
  const manifest = {
    version: 17,
    corpus: "economics",
    generator: "scripts/generate-economics-expansion-illustrations.mjs",
    generatedAt: "2026-08-06T00:00:00.000Z",
    generationSeed: GENERATION_SEED,
    sourceCatalog: "loadCompleteEconomicsCatalog()",
    registrySnapshot: "content/illustrations.ts",
    sourceMasterBatch: "economics-v16",
    canvas: CANVAS,
    maximumBytes: MAX_BYTES,
    assetRange: [`${ASSET_PREFIX}-${ASSET_START}`, `${ASSET_PREFIX}-${ASSET_END}`],
    count: registryItems.length,
    verification: {
      uniqueThoughtIds: new Set(registryItems.map((item) => item.thoughtId)).size,
      uniqueAssetIds: new Set(registryItems.map((item) => item.assetId)).size,
      uniqueSources: new Set(registryItems.map((item) => item.src)).size,
      uniqueFileHashes: new Set(registryItems.map((item) => item.sha256)).size,
      registryRangeCollisions: 0,
      overwrittenExistingTargets: existingOutputs.length,
    },
    summary: summarize(items),
    items: registryItems,
  };
  const metadataPath = path.join(designDirectory, METADATA_FILENAME);
  if (!options.verifyOnly) {
    await writeFile(metadataPath, `${JSON.stringify(manifest, null, 2)}\n`);
    await createContactSheet(items);
  }

  const sizes = validation.map((item) => item.bytes);
  process.stdout.write(`${JSON.stringify({
    count: items.length,
    assetStart: ASSET_START,
    assetEnd: ASSET_END,
    minimumBytes: Math.min(...sizes),
    maximumBytes: Math.max(...sizes),
    averageBytes: Math.round(sizes.reduce((sum, size) => sum + size, 0) / sizes.length),
    uniqueHashes: new Set(validation.map((item) => item.sha256)).size,
    metadata: path.relative(projectRoot, metadataPath),
    contactSheet: path.join("design", "illustrations", CONTACT_SHEET_FILENAME),
    ...summarize(items),
  }, null, 2)}\n`);
}

await main();
