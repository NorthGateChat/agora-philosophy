import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const componentUrl = new URL("../app/PhilosophyMoment.tsx", import.meta.url);
const catalogUrl = new URL("../content/philosophy.ts", import.meta.url);
const hanCharacter = /\p{Script=Han}/u;

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

test("all 27 philosopher records have complete English detail copy", async () => {
  const source = await readFile(catalogUrl, "utf8");
  const sourceFile = ts.createSourceFile(
    "PhilosophyMoment.tsx",
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const thoughts = findArrayLiteral(sourceFile, "thoughts");
  const records = thoughts.elements.filter(ts.isObjectLiteralExpression).map(readStringProperties);
  const englishFields = [
    "englishName",
    "englishLife",
    "englishSchool",
    "english",
    "englishWork",
    "englishReflection",
    "englishQuestion",
  ];

  assert.equal(records.length, 27);
  assert.equal(new Set(records.map((record) => record.get("id"))).size, 27);

  for (const record of records) {
    const id = record.get("id") ?? "unknown";
    for (const field of englishFields) {
      const value = record.get(field);
      assert.ok(value?.trim(), `${id}.${field} must be present`);
      assert.doesNotMatch(value, hanCharacter, `${id}.${field} must not fall back to Chinese`);
    }
  }
});

test("English detail rendering selects localized school, explanation, and question", async () => {
  const source = await readFile(componentUrl, "utf8");

  assert.match(
    source,
    /const displayedSchool = languageMode === "en"\s*\? thought\.englishSchool\s*:\s*localizeChinese\(thought\.school\)/,
  );
  assert.match(
    source,
    /const displayedReflection = languageMode === "en"\s*\? thought\.englishReflection\s*:\s*localizeChinese\(thought\.reflection\)/,
  );
  assert.match(
    source,
    /const displayedQuestion = languageMode === "en"\s*\? thought\.englishQuestion\s*:\s*localizeChinese\(thought\.question\)/,
  );
  assert.match(source, /<p className="reflection">\{displayedReflection\}<\/p>/);
  assert.match(source, /<p>\{displayedQuestion\}<\/p>/);
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
