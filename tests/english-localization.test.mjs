import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";
import { tsImport } from "tsx/esm/api";

const componentUrl = new URL("../app/PhilosophyMoment.tsx", import.meta.url);
const catalogUrl = new URL("../content/philosophy.ts", import.meta.url);
const supplementUrl = new URL("../content/philosophySupplement.ts", import.meta.url);
const ancientExpansionUrl = new URL("../content/philosophyExpansionAncient.ts", import.meta.url);
const modernExpansionUrl = new URL("../content/philosophyExpansionModern.ts", import.meta.url);
const contemporaryExpansionUrl = new URL("../content/philosophyExpansionContemporary.ts", import.meta.url);
const curationUrl = new URL("../content/philosophyCuration.ts", import.meta.url);
const earlyCanonUrl = new URL("../content/philosophyCanonEarly.ts", import.meta.url);
const modernCanonUrl = new URL("../content/philosophyCanonModern.ts", import.meta.url);
const contemporaryCanonUrl = new URL("../content/philosophyCanonContemporary.ts", import.meta.url);
const maoCatalogUrl = new URL("../content/mao.ts", import.meta.url);
const maoSupplementUrl = new URL("../content/maoSupplement.ts", import.meta.url);
const maoEarlyUrl = new URL("../content/maoCorpusEarly.ts", import.meta.url);
const maoMiddleUrl = new URL("../content/maoCorpusMiddle.ts", import.meta.url);
const maoLateUrl = new URL("../content/maoCorpusLate.ts", import.meta.url);
const hanCharacter = /\p{Script=Han}/u;
const westernTopics = new Set(["存在", "伦理", "知识", "政治", "语言"]);
const maoTopics = new Set(["实践", "矛盾", "群众", "方法", "文化", "战略", "政治"]);

function findArrayLiteral(sourceFile, variableName) {
  let found = null;

  function visit(node) {
    if (
      ts.isVariableDeclaration(node)
      && ts.isIdentifier(node.name)
      && node.name.text === variableName
      && node.initializer
      && ts.isArrayLiteralExpression(node.initializer)
    ) {
      found = node.initializer;
      return;
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  assert.ok(found, `could not find ${variableName} data array`);
  return found;
}

function unwrapExpression(node) {
  let current = node;
  while (
    ts.isParenthesizedExpression(current)
    || ts.isAsExpression(current)
    || ts.isSatisfiesExpression(current)
    || ts.isTypeAssertionExpression(current)
  ) {
    current = current.expression;
  }
  return current;
}

function findObjectLiteral(sourceFile, variableName) {
  let found = null;

  function visit(node) {
    if (
      ts.isVariableDeclaration(node)
      && ts.isIdentifier(node.name)
      && node.name.text === variableName
      && node.initializer
    ) {
      const initializer = unwrapExpression(node.initializer);
      if (ts.isObjectLiteralExpression(initializer)) {
        found = initializer;
        return;
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  assert.ok(found, `could not find ${variableName} data object`);
  return found;
}

function readNumberProperties(objectLiteral) {
  const properties = new Map();
  for (const property of objectLiteral.properties) {
    if (!ts.isPropertyAssignment(property)) continue;
    const name = ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)
      ? property.name.text
      : null;
    const initializer = unwrapExpression(property.initializer);
    if (!name || !ts.isNumericLiteral(initializer)) continue;
    properties.set(name, Number(initializer.text));
  }
  return properties;
}

function readNestedStringRecords(sourceFile, variableName) {
  const objectLiteral = findObjectLiteral(sourceFile, variableName);
  const records = [];
  for (const property of objectLiteral.properties) {
    if (!ts.isPropertyAssignment(property)) continue;
    const id = ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)
      ? property.name.text
      : null;
    const initializer = unwrapExpression(property.initializer);
    if (!id || !ts.isObjectLiteralExpression(initializer)) continue;
    const values = readStringProperties(initializer);
    values.set("id", id);
    records.push(values);
  }
  return records;
}

function readStringProperties(objectLiteral) {
  const properties = new Map();
  for (const property of objectLiteral.properties) {
    if (!ts.isPropertyAssignment(property)) continue;
    const name = ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)
      ? property.name.text
      : null;
    if (!name || !ts.isStringLiteralLike(property.initializer)) continue;
    properties.set(name, property.initializer.text);
  }
  return properties;
}

function readTupleProperty(objectLiteral, propertyName) {
  for (const property of objectLiteral.properties) {
    if (!ts.isPropertyAssignment(property)) continue;
    const name = ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)
      ? property.name.text
      : null;
    if (name !== propertyName || !ts.isArrayLiteralExpression(property.initializer)) continue;
    return property.initializer.elements
      .filter(ts.isStringLiteralLike)
      .map((element) => element.text);
  }
  return [];
}

function readRecords(sourceFile, variableName) {
  return findArrayLiteral(sourceFile, variableName)
    .elements
    .filter(ts.isObjectLiteralExpression)
    .map((node) => ({ node, values: readStringProperties(node) }));
}

function parseTypescript(fileName, source) {
  return ts.createSourceFile(
    fileName,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
}

function assertCompleteEnglish(records, fields) {
  for (const record of records) {
    const id = record.get("id") ?? "unknown";
    for (const field of fields) {
      const value = record.get(field);
      assert.ok(value?.trim(), `${id}.${field} must be present`);
      assert.doesNotMatch(value, hanCharacter, `${id}.${field} must not fall back to Chinese`);
    }
  }
}

function assertCompleteChinese(records, fields) {
  for (const record of records) {
    const id = record.get("id") ?? "unknown";
    for (const field of fields) {
      assert.ok(record.get(field)?.trim(), `${id}.${field} must be present`);
    }
  }
}

function normalizeCopy(value) {
  return value.toLocaleLowerCase("en").replace(/[\p{P}\p{S}\s]+/gu, "");
}

function assertNoExactCopyDuplicates(records, field) {
  const seen = new Map();
  for (const record of records) {
    const id = record.get("id") ?? "unknown";
    const copy = record.get(field);
    assert.ok(copy?.trim(), `${id}.${field} must be present`);
    const normalized = normalizeCopy(copy);
    const previous = seen.get(normalized);
    assert.equal(previous, undefined, `${id}.${field} duplicates ${previous}`);
    seen.set(normalized, id);
  }
}

function authorIdOf(record) {
  return record.get("authorId") ?? record.get("id");
}

function countRecordsByAuthor(records) {
  const counts = new Map();
  for (const record of records) {
    const authorId = authorIdOf(record);
    assert.ok(authorId, `${record.get("id") ?? "unknown"}.authorId must resolve`);
    counts.set(authorId, (counts.get(authorId) ?? 0) + 1);
  }
  return counts;
}

function assertEveryAuthorHasProfile(records, authorIds) {
  for (const authorId of authorIds) {
    const profiles = records.filter(
      (record) => record.get("id") === authorId && authorIdOf(record) === authorId,
    );
    assert.equal(profiles.length, 1, `${authorId} must have exactly one id === authorId profile card`);
  }
}

function assertSourcedWesternSeeds(entries) {
  const contentEnglishFields = [
    "english",
    "englishWork",
    "englishReflection",
    "englishQuestion",
  ];
  const contentChineseFields = ["text", "work", "reflection", "question"];
  const records = entries.map(({ values }) => values);

  assertCompleteEnglish(records, contentEnglishFields);
  assertCompleteChinese(records, contentChineseFields);

  for (const { node, values } of entries) {
    const id = values.get("id") ?? "unknown";
    assert.ok(values.get("authorId"), `${id}.authorId must be present`);
    assert.ok(westernTopics.has(values.get("topic")), `${id}.topic must be a Western topic`);
    const locator = readTupleProperty(node, "sourceLocator");
    assert.equal(locator.length, 2, `${id}.sourceLocator must contain Chinese and English locators`);
    assert.ok(locator.every((part) => part.trim()), `${id}.sourceLocator must not be empty`);
    assert.doesNotMatch(locator[1], hanCharacter, `${id}.sourceLocator English value must not contain Chinese`);
  }
}

test("the Western library contains 600 non-uniform, sourced bilingual thoughts across 65 philosophers", async () => {
  const [
    catalogSource,
    supplementSource,
    ancientSource,
    modernSource,
    contemporarySource,
    curationSource,
    earlyCanonSource,
    modernCanonSource,
    contemporaryCanonSource,
  ] = await Promise.all([
    readFile(catalogUrl, "utf8"),
    readFile(supplementUrl, "utf8"),
    readFile(ancientExpansionUrl, "utf8"),
    readFile(modernExpansionUrl, "utf8"),
    readFile(contemporaryExpansionUrl, "utf8"),
    readFile(curationUrl, "utf8"),
    readFile(earlyCanonUrl, "utf8"),
    readFile(modernCanonUrl, "utf8"),
    readFile(contemporaryCanonUrl, "utf8"),
  ]);
  const catalogFile = parseTypescript("philosophy.ts", catalogSource);
  const supplementFile = parseTypescript("philosophySupplement.ts", supplementSource);
  const curationFile = parseTypescript("philosophyCuration.ts", curationSource);
  const earlyCanonFile = parseTypescript("philosophyCanonEarly.ts", earlyCanonSource);
  const modernCanonFile = parseTypescript("philosophyCanonModern.ts", modernCanonSource);
  const contemporaryCanonFile = parseTypescript(
    "philosophyCanonContemporary.ts",
    contemporaryCanonSource,
  );
  const primaryEntries = readRecords(catalogFile, "primaryThoughts");
  const supplementaryEntries = readRecords(supplementFile, "supplementarySeeds");
  const expansionEntries = [
    ...readRecords(parseTypescript("philosophyExpansionAncient.ts", ancientSource), "ancientExpansionSeeds"),
    ...readRecords(parseTypescript("philosophyExpansionModern.ts", modernSource), "modernExpansionSeeds"),
    ...readRecords(
      parseTypescript("philosophyExpansionContemporary.ts", contemporarySource),
      "contemporaryExpansionSeeds",
    ),
  ];
  const earlyCanonEntries = readRecords(earlyCanonFile, "canonEarlySeeds");
  const modernCanonEntries = readRecords(modernCanonFile, "canonSeeds");
  const contemporaryCanonEntries = readRecords(
    contemporaryCanonFile,
    "contemporaryCanonSeeds",
  );
  const canonEntries = [
    ...earlyCanonEntries,
    ...modernCanonEntries,
    ...contemporaryCanonEntries,
  ];
  const primaryRecords = primaryEntries.map(({ values }) => values);
  const supplementaryRecords = supplementaryEntries.map(({ values }) => values);
  const expansionRecords = expansionEntries.map(({ values }) => values);
  const legacyArchiveRecords = [...primaryRecords, ...supplementaryRecords, ...expansionRecords];
  const canonRecords = canonEntries.map(({ values }) => values);
  const allWesternSourceRecords = [...legacyArchiveRecords, ...canonRecords];
  const legacyTargetCounts = readNumberProperties(
    findObjectLiteral(curationFile, "legacyAuthorTargetCounts"),
  );
  const profileEnglishFields = [
    "englishName",
    "englishLife",
    "englishSchool",
  ];
  const contentEnglishFields = [
    "english",
    "englishWork",
    "englishReflection",
    "englishQuestion",
  ];
  const contentChineseFields = ["text", "work", "reflection", "question"];

  assert.equal(primaryRecords.length, 27);
  assert.equal(supplementaryRecords.length, 54);
  assert.equal(expansionRecords.length, 378);
  assert.equal(legacyArchiveRecords.length, 459, "the uncurated legacy archive must remain intact");

  assert.equal(legacyTargetCounts.size, 27);
  assert.deepEqual(
    new Set(legacyTargetCounts.keys()),
    new Set(primaryRecords.map((record) => record.get("id"))),
    "legacy curation targets must cover the original profiles without becoming a global whitelist",
  );
  const legacyArchiveCounts = countRecordsByAuthor(legacyArchiveRecords);
  for (const [authorId, target] of legacyTargetCounts) {
    assert.ok(target > 0, `${authorId} must retain at least one card`);
    assert.ok(
      target <= (legacyArchiveCounts.get(authorId) ?? 0),
      `${authorId} curation target must not exceed its archive inventory`,
    );
  }
  assert.equal([...legacyTargetCounts.values()].reduce((sum, count) => sum + count, 0), 399);

  assert.equal(earlyCanonEntries.length, 74);
  assert.equal(countRecordsByAuthor(earlyCanonEntries.map(({ values }) => values)).size, 12);
  assert.equal(modernCanonEntries.length, 85);
  assert.equal(countRecordsByAuthor(modernCanonEntries.map(({ values }) => values)).size, 13);
  assert.equal(contemporaryCanonEntries.length, 42);
  assert.equal(countRecordsByAuthor(contemporaryCanonEntries.map(({ values }) => values)).size, 8);

  const canonCounts = countRecordsByAuthor(canonRecords);
  const publicAuthorCounts = new Map(legacyTargetCounts);
  for (const [authorId, count] of canonCounts) {
    assert.ok(!publicAuthorCounts.has(authorId), `${authorId} must not duplicate a legacy author id`);
    publicAuthorCounts.set(authorId, count);
  }
  assert.equal(publicAuthorCounts.size, 60);
  assert.equal([...publicAuthorCounts.values()].reduce((sum, count) => sum + count, 0), 600);
  assert.ok(
    new Set(publicAuthorCounts.values()).size >= 4,
    "author inventories must remain materially non-uniform",
  );

  const publicAssembly = new Set(
    findArrayLiteral(catalogFile, "preStructuralPassThoughts").elements
      .map((element) => element.getText(catalogFile)),
  );
  for (const requiredSource of [
    "...curateLegacyThoughts(legacyThoughtArchive)",
    "...philosophyCanonEarlyThoughts",
    "...philosophyCanonModernThoughts",
    "...contemporaryCanonThoughts",
  ]) {
    assert.ok(publicAssembly.has(requiredSource), `public thoughts must include ${requiredSource}`);
  }
  const structuralAssembly = new Set(
    findArrayLiteral(catalogFile, "thoughts").elements.map((element) => element.getText(catalogFile)),
  );
  assert.ok(
    structuralAssembly.has("...preStructuralPassThoughts.filter(\n    (thought) => !westernRetiredThoughtIds.has(thought.id),\n  )"),
    "public thoughts must filter the reviewed Western retirement set",
  );
  assert.ok(
    structuralAssembly.has("...westernStructuralExpansionThoughts"),
    "public thoughts must include the quota-neutral structural expansion",
  );

  const { thoughts: publicWesternThoughts } = await tsImport(
    "../content/philosophy.ts",
    import.meta.url,
  );
  assert.equal(publicWesternThoughts.length, 600);
  assert.equal(
    new Set(publicWesternThoughts.map((thought) => thought.authorId ?? thought.id)).size,
    65,
  );

  assert.equal(
    new Set(allWesternSourceRecords.map((record) => record.get("id"))).size,
    allWesternSourceRecords.length,
    "Western ids must be globally unique, including the retained legacy archive",
  );
  assertEveryAuthorHasProfile(allWesternSourceRecords, publicAuthorCounts.keys());

  assertCompleteEnglish(primaryRecords, [...profileEnglishFields, ...contentEnglishFields]);
  assertCompleteEnglish([...supplementaryRecords, ...expansionRecords], contentEnglishFields);
  assertCompleteChinese(legacyArchiveRecords, contentChineseFields);
  assertSourcedWesternSeeds(canonEntries);

  const canonProfiles = [
    ...readNestedStringRecords(earlyCanonFile, "canonAuthorProfiles"),
    ...readNestedStringRecords(modernCanonFile, "canonProfiles"),
    ...readNestedStringRecords(contemporaryCanonFile, "canonProfiles"),
  ];
  assert.equal(canonProfiles.length, 33);
  assert.deepEqual(
    new Set(canonProfiles.map((profile) => profile.get("id"))),
    new Set(canonCounts.keys()),
    "every canon author must have a profile definition",
  );
  assertCompleteEnglish(canonProfiles, profileEnglishFields);
  assertCompleteChinese(canonProfiles, ["name", "life", "school"]);

  assertNoExactCopyDuplicates(allWesternSourceRecords, "text");
  assertNoExactCopyDuplicates(allWesternSourceRecords, "english");

  for (const { node, values } of [...supplementaryEntries, ...expansionEntries]) {
    const id = values.get("id") ?? "unknown";
    assert.ok(westernTopics.has(values.get("topic")), `${id}.topic must be a Western topic`);
    const locator = readTupleProperty(node, "sourceLocator");
    assert.equal(locator.length, 2, `${id}.sourceLocator must contain Chinese and English locators`);
    assert.ok(locator.every((part) => part.trim()), `${id}.sourceLocator must not be empty`);
    assert.doesNotMatch(locator[1], hanCharacter, `${id}.sourceLocator English value must not contain Chinese`);
  }
});

test("the Mao source inventory is bilingual and its public curation retires reviewed overlaps", async () => {
  const [{ maoThoughts }, { retiredMaoThoughtIds }] = await Promise.all([
    tsImport("../content/mao.ts", import.meta.url),
    tsImport("../content/maoCuration2026.ts", import.meta.url),
  ]);
  const [
    catalogSource,
    supplementSource,
    ancientSource,
    modernSource,
    contemporarySource,
    curationSource,
    earlyCanonSource,
    modernCanonSource,
    contemporaryCanonSource,
    maoSource,
    maoExpansionSource,
    maoEarlySource,
    maoMiddleSource,
    maoLateSource,
  ] = await Promise.all([
    readFile(catalogUrl, "utf8"),
    readFile(supplementUrl, "utf8"),
    readFile(ancientExpansionUrl, "utf8"),
    readFile(modernExpansionUrl, "utf8"),
    readFile(contemporaryExpansionUrl, "utf8"),
    readFile(curationUrl, "utf8"),
    readFile(earlyCanonUrl, "utf8"),
    readFile(modernCanonUrl, "utf8"),
    readFile(contemporaryCanonUrl, "utf8"),
    readFile(maoCatalogUrl, "utf8"),
    readFile(maoSupplementUrl, "utf8"),
    readFile(maoEarlyUrl, "utf8"),
    readFile(maoMiddleUrl, "utf8"),
    readFile(maoLateUrl, "utf8"),
  ]);
  const legacyWesternEntries = [
    ...readRecords(parseTypescript("philosophy.ts", catalogSource), "primaryThoughts"),
    ...readRecords(parseTypescript("philosophySupplement.ts", supplementSource), "supplementarySeeds"),
    ...readRecords(parseTypescript("philosophyExpansionAncient.ts", ancientSource), "ancientExpansionSeeds"),
    ...readRecords(parseTypescript("philosophyExpansionModern.ts", modernSource), "modernExpansionSeeds"),
    ...readRecords(
      parseTypescript("philosophyExpansionContemporary.ts", contemporarySource),
      "contemporaryExpansionSeeds",
    ),
  ];
  const canonWesternEntries = [
    ...readRecords(parseTypescript("philosophyCanonEarly.ts", earlyCanonSource), "canonEarlySeeds"),
    ...readRecords(parseTypescript("philosophyCanonModern.ts", modernCanonSource), "canonSeeds"),
    ...readRecords(
      parseTypescript("philosophyCanonContemporary.ts", contemporaryCanonSource),
      "contemporaryCanonSeeds",
    ),
  ];
  const primaryMaoEntries = readRecords(parseTypescript("mao.ts", maoSource), "primaryMaoThoughts");
  const maoExpansionEntries = readRecords(
    parseTypescript("maoSupplement.ts", maoExpansionSource),
    "maoExpansionSeeds",
  );
  const maoEarlyEntries = readRecords(
    parseTypescript("maoCorpusEarly.ts", maoEarlySource),
    "maoCorpusEarlySeeds",
  );
  const maoMiddleEntries = readRecords(
    parseTypescript("maoCorpusMiddle.ts", maoMiddleSource),
    "maoCorpusMiddleSeeds",
  );
  const maoLateEntries = readRecords(
    parseTypescript("maoCorpusLate.ts", maoLateSource),
    "maoCorpusLateSeeds",
  );
  const primaryMaoRecords = primaryMaoEntries.map(({ values }) => values);
  const maoExpansionRecords = maoExpansionEntries.map(({ values }) => values);
  const maoCorpusEntries = [...maoEarlyEntries, ...maoMiddleEntries, ...maoLateEntries];
  const maoRecords = [
    ...primaryMaoRecords,
    ...maoExpansionRecords,
    ...maoCorpusEntries.map(({ values }) => values),
  ];
  const allSourceRecords = [
    ...legacyWesternEntries.map(({ values }) => values),
    ...canonWesternEntries.map(({ values }) => values),
    ...maoRecords,
  ];
  const legacyTargetCounts = readNumberProperties(
    findObjectLiteral(
      parseTypescript("philosophyCuration.ts", curationSource),
      "legacyAuthorTargetCounts",
    ),
  );
  const publicWesternCount = [...legacyTargetCounts.values()].reduce(
    (sum, count) => sum + count,
    canonWesternEntries.length,
  );
  const contentEnglishFields = ["english", "englishWork", "englishReflection", "englishQuestion"];
  const contentChineseFields = ["text", "work", "reflection", "question"];

  assert.ok(primaryMaoRecords.length >= 15);
  assert.ok(maoExpansionRecords.length >= 20);
  assert.ok(maoEarlyEntries.length >= 25);
  assert.ok(maoMiddleEntries.length >= 25);
  assert.ok(maoLateEntries.length >= 25);
  assert.ok(maoRecords.length >= 100);
  assert.equal(
    maoThoughts.length,
    maoRecords.length - retiredMaoThoughtIds.size,
    "the public Mao corpus must differ from its source inventory only by reviewed retirements",
  );
  for (const retiredId of retiredMaoThoughtIds) {
    assert.equal(
      maoThoughts.some((thought) => thought.id === retiredId),
      false,
      `${retiredId} must remain retired`,
    );
  }
  assert.equal(publicWesternCount, 600);
  assert.equal(
    new Set(allSourceRecords.map((record) => record.get("id"))).size,
    allSourceRecords.length,
    "ids must be globally unique across Western and Mao source catalogs",
  );
  assertCompleteEnglish(maoRecords, contentEnglishFields);
  assertCompleteChinese(maoRecords, contentChineseFields);
  assertNoExactCopyDuplicates(allSourceRecords, "text");
  assertNoExactCopyDuplicates(allSourceRecords, "english");

  const primaryMaoIds = new Set(primaryMaoRecords.map((record) => record.get("id")));
  for (const { node, values } of primaryMaoEntries) {
    const id = values.get("id") ?? "unknown";
    assert.ok(maoTopics.has(values.get("topic")), `${id}.topic must be a Mao topic`);
    const locator = readTupleProperty(node, "sourceLocator");
    assert.equal(locator.length, 2, `${id}.sourceLocator must contain Chinese and English locators`);
    assert.ok(locator.every((part) => part.trim()), `${id}.sourceLocator must not be empty`);
    assert.doesNotMatch(locator[1], hanCharacter, `${id}.sourceLocator English value must not contain Chinese`);
  }
  for (const { node, values } of [...maoExpansionEntries, ...maoCorpusEntries]) {
    const id = values.get("id") ?? "unknown";
    assert.ok(primaryMaoIds.has(values.get("authorId")), `${id}.authorId must reference a Mao profile card`);
    assert.ok(maoTopics.has(values.get("topic")), `${id}.topic must be a Mao topic`);
    const locator = readTupleProperty(node, "sourceLocator");
    assert.equal(locator.length, 2, `${id}.sourceLocator must contain Chinese and English locators`);
    assert.ok(locator.every((part) => part.trim()), `${id}.sourceLocator must not be empty`);
    assert.doesNotMatch(locator[1], hanCharacter, `${id}.sourceLocator English value must not contain Chinese`);
  }

  const workCounts = new Map();
  for (const record of maoRecords) {
    const work = record.get("work");
    workCounts.set(work, (workCounts.get(work) ?? 0) + 1);
  }
  assert.ok(workCounts.size >= 45, "the Mao catalog should cover a broad range of works");
  assert.ok(
    new Set(workCounts.values()).size >= 3,
    "work coverage must be deliberately non-uniform rather than quota-balanced",
  );

  const shortQuoteCount = primaryMaoRecords.filter(
    (record) => record.get("rendering") === "short-quote",
  ).length;
  assert.equal(shortQuoteCount, 2, "only explicitly verified source phrases are marked short-quote");
});

test("English detail rendering selects localized school, explanation, and question", async () => {
  const source = await readFile(componentUrl, "utf8");

  assert.match(
    source,
    /const displayedSchool = languageMode === "en"\s*\? thought\.englishSchool\?\.trim\(\) \|\| thought\.school\s*:\s*localizeChinese\(thought\.school\)/,
  );
  assert.match(
    source,
    /const displayedReflection = languageMode === "en"\s*\? thought\.englishReflection\?\.trim\(\) \|\| thought\.reflection\s*:\s*localizeChinese\(thought\.reflection\)/,
  );
  assert.match(
    source,
    /const displayedQuestion = languageMode === "en"\s*\? thought\.englishQuestion\?\.trim\(\) \|\| thought\.question\s*:\s*localizeChinese\(thought\.question\)/,
  );
  assert.match(
    source,
    /const showEnglishQuestion = isChineseLanguage\s*&& includeEnglishQuote\s*&& Boolean\(thought\.englishQuestion\?\.trim\(\)\)/,
  );
  assert.match(source, /<p className="reflection">\{displayedReflection\}<\/p>/);
  assert.match(source, /<p>\{displayedQuestion\}<\/p>/);
  assert.match(source, /<p className="question-card-english" lang="en">\{englishQuestion\}<\/p>/);
  assert.doesNotMatch(source, /topicEnglish\[thought\.topic\]\} · \$\{thought\.school/);
});

test("every lineage relation has an English summary without Chinese fallback", async () => {
  const source = await readFile(catalogUrl, "utf8");
  const sourceFile = ts.createSourceFile(
    "PhilosophyMoment.tsx",
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const connections = findArrayLiteral(sourceFile, "thoughtConnections");
  const records = connections.elements
    .filter(ts.isObjectLiteralExpression)
    .map(readStringProperties);

  assert.ok(records.length >= 50, "the complete relationship set should be covered");
  for (const record of records) {
    const relation = `${record.get("source") ?? "?"}->${record.get("target") ?? "?"}`;
    const englishSummary = record.get("englishSummary");
    assert.ok(englishSummary?.trim(), `${relation} must have an English summary`);
    assert.doesNotMatch(
      englishSummary,
      hanCharacter,
      `${relation}.englishSummary must not fall back to Chinese`,
    );
  }
});
