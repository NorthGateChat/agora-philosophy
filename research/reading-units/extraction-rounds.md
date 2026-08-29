# Reading-unit extraction rounds

## Current stable inventory — 2026-08-30

The current route graph is frozen at 918 verified cards mapped exactly once to
686 reading units: 542 `integrated-candidate` units and 144 `source-route`
units. The public index and research inventory are generated from the same
data, and the inventory tests reject missing thoughts, duplicate assignment,
or orphan units.

This graph uses the complete containing chapter or other natural division as
the body boundary while retaining each card's section, proposition, verse,
fragment, page, or classical number as its exact anchor. Same-source,
same-edition anchors share a natural unit; different translations and editions
remain isolated even when their logical locator is the same. Short standalone
works can remain whole, while long books must resolve to a chapter, book, part,
essay, or comparable top-level division. Prepared bodies load only after the
reader opens and fail closed above 600 KiB.

The final prepared corpus contains all 542 integrated bodies and 705 resolved
card anchors. The release audit reports zero missing or orphan bodies, anchor
failures, duplicate bodies, source-site chrome findings, and boundary risks.
Together the bodies occupy 27,649,471 bytes raw and 8,871,082 bytes gzip-equivalent; they
remain lazy-loaded and do not enter the initial JavaScript bundle.

The 704-route baseline and Round 2 figures below are historical extraction
snapshots from the earlier route graph. They remain useful for adapter and
failure provenance, but they are not current inventory or coverage totals. A
later completed network report may add a new extraction round; no projected
success count is recorded here.

## Baseline — 2026-08-28

The first complete network pass exercised all 704 routes with strict
all-card anchor matching:

- 180 bodies written and 1 resumed (181 integrated units, 209 card anchors)
- 160 quotation-exception units correctly retained as source routes
- 363 integrated candidates failed closed
- 0 partially matched bodies were retained

The baseline exposed two distinct classes of work rather than content loss:

1. boundary and page-adapter failures (repeated table-of-contents headings,
   non-semantic `<b>` headings, CText numeric chapter markers, page chrome);
2. source-format failures where the primary route is a PDF/scan and needs a
   safe local OCR/plain-text or alternate HTML source.

The largest initial failure hosts were Project Gutenberg (147), Internet
Archive (54), English Wikisource (40), Chinese Text Project (15), Wikimedia
Commons (10), New Advent (10), and MIT Classics (9). The baseline report was
used to drive the second-pass adapters, source overrides, and boundary audit.

The first-pass successes also revealed deliberately failing QA cases: the
seven Daodejing cards had initially selected the same full CText document,
and MIT book pages could repeat a whole book for two chapter routes. Final
tests therefore reject identical body hashes for different units sharing one
source URL, in addition to requiring every registered card anchor.

## Round 2 — shared page adapters and cache overrides

The second complete pass added quote-guided heading selection, Gutenberg
envelope removal, MIT Classics and CText adapters, Archive.org OCR discovery,
and the first 40 high-confidence local-source overrides:

- 227 integrated bodies / 267 anchored cards (+46 units / +58 cards)
- 317 candidates still failed closed
- 0 missing anchors, 0 retained duplicate bodies, and 0 orphan files
- 7.81 MB raw / 2.53 MB gzip-equivalent prepared text

The body audit reduced the initial five duplicate-source clusters to zero and
the 26 source-chrome findings to one. The remaining failures became the input
for ellipsis-aware exact matching, Chinese public-text alternates, Gutenberg
heading variants, and work-specific boundaries.
