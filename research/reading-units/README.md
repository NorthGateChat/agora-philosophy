# Reading units

AGORA's **Read containing passage** layer restores the continuous source text
around a verified card without putting whole books in the application bundle.

## Current inventory snapshot

The reproducible 2026-08-29 inventory maps all 890 verified source-excerpt
cards exactly once into 660 reading units. Of those units, 520 are
`integrated-candidate` routes backed by public-domain or openly licensed text;
140 are `source-route` entries that preserve the same edition and locator
metadata but continue to the registered source under quotation exception.

The release audit prepares all 520 integrated bodies and resolves 682 card
anchors. Missing bodies, orphan files, unmatched anchors, duplicate bodies,
source-site chrome, and natural-boundary risks are all zero; every public body
remains below the 600 KiB release ceiling.

A unit is identified by the work, its complete natural reading boundary, and
the registered source/edition. Cards in the same chapter, essay, lecture,
discourse, article, letter, named classical chapter, or other natural division
share one unit when they use the same source and edition. The same logical
chapter in different translations or editions remains in separate units so an
anchor can never silently jump to different wording.

## Files and loading boundary

- `inventory.json` is the reproducible research inventory. Its public projection
  is `public/readings/index.json`.
- `public/readings/units/<unit-id>.json` contains one prepared chapter, essay,
  lecture, letter, classical named section, or other bounded reading unit.
- The index contains routes and edition metadata only. A unit body is fetched
  after the reader is opened, so the texts do not enter the initial JavaScript
  bundle.
- Every embedded unit records paragraph IDs, a source digest, its selection
  method, and quote anchors keyed by thought ID. The reader scrolls to and marks
  the card's verified excerpt.

The card's precise section, proposition, verse, or page locator remains an
anchor. It does not by itself split a readable chapter into many tiny files.
Short standalone works may be one unit; long books must have a narrower
containing boundary. Every serialized public unit must also remain at or below
600 KiB. Oversized, unbounded, partially anchored, or duplicate whole-document
results fail closed instead of being published as if they were a chapter.

## Source policy

Public-domain and explicitly reusable text can be prepared as local reading
units. Sources used under quotation exception retain the same reader route and
edition metadata but continue at the registered primary-source page instead of
embedding a copyrighted chapter.

PDF, DJVU, EPUB, page images, and raw scans are never copied to
`public/readings`. Original scans and complete OCR may remain in the ignored
research cache for source checking. When a public-domain scan needs a stable
text fallback, `scripts/derive-reading-unit-texts.mjs` produces a narrowly
scoped text artifact in `research/source-cache/reading-unit-derived/`. Its
versioned manifest records the source hash, extraction command or line ranges,
declared OCR corrections, output hash, and matched thought IDs. The extraction
pipeline accepts only bounded HTML, XML, or plain-text inputs and publishes
cleaned paragraphs rather than scans or unbounded research artifacts.

## Rebuild

```bash
node --import tsx scripts/build-reading-unit-inventory.mjs
node --import tsx scripts/fetch-reading-units.mjs --allow-network --concurrency 4
node --test tests/reading-unit-*.test.mjs tests/fetch-reading-units.test.mjs
```

Fetching is network-off by default. It uses a URL-addressed research cache,
atomic writes, bounded concurrency, redirect and size limits, and resumable
input/content hashes. `fetch-coverage.json` records successes, source routes,
unmatched anchors, and failures for review.

`source-overrides.json` is the versioned repair layer for sources that need a
clean local extraction or an explicit section boundary. `bySourceUrl` supplies
defaults shared by every unit on one source; `byUnitId` takes precedence for a
specific chapter. Supported fields are `url`, `localPath`, `startHeading`,
`startPattern`, `endPattern`, and the unit-only `maximumUnitCharacters`. That
last field permits a verified natural division to exceed the normal extraction
threshold but never the 600,000-character hard ceiling or the 600 KiB public
file ceiling. A `localPath` must remain inside the project and end in `.txt`,
`.html`, or `.xml`; scan and book binaries are rejected even when named by an
override.
