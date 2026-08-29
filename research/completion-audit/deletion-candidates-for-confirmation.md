# AGORA deletion and merge status — remaining owner confirmation

Reviewed: 2026-08-30

This file supersedes the pre-curation status written on 2026-08-28. The
approved 2026-08-30 structural pass has now retired 72 historical IDs from the
live catalog. Those IDs remain in their historical source modules, but the
shared [2026 curation registry](../../content/curation2026Registry.ts) excludes
them from runtime content and keeps source, emphasis, illustration, and
reading-unit cleanup aligned.

Of the original 93 recommendation rows or groups:

- 64 were implemented by the 2026-08-30 curation pass;
- 2 economics groups were only partly compressed;
- 26 card groups remain unimplemented; and
- 1 already archived, non-runtime Husserl asset still needs an explicit
  keep-versus-permanent-delete decision.

No new deletion candidate is introduced here. An ID recorded below as retired
is a completed decision and must not be treated as awaiting confirmation.

## Implemented on 2026-08-30 — no longer awaiting confirmation

### Western and resolved cross-library overlaps — 15 retired IDs

All nine recommendations in the Western review were implemented. The exact
Marx, Bacon, and James cross-library duplicates and the Popper and Kuhn groups
numbered 1–3, 5, 7, and 8 in the cross-library review were also resolved.

- `heidegger`, `sartre`, `camus`, `foucault`, `derrida`
- `averroes-audiences`, `arendt`, `rawls`, `nussbaum`
- `marx-commodity-fetishism`, `francis-bacon-idols`,
  `james-stream-of-thought`
- `popper`, `kuhn-normal-science-puzzles`, `kuhn-anomaly-discovery`

Evidence: [Western/Chinese curation evidence](../curation-2026-08-30/western-chinese-evidence.md)
and the runtime set in
[`philosophyStructuralExpansion.ts`](../../content/philosophyStructuralExpansion.ts).

### Economics — 16 retired IDs

The nine principles/modern duplicates were merged into the better-located
modern cards. Bogle, Markowitz, Sharpe, and one Taleb repetition were absorbed
into surviving investment cards.

- `economics-principles-bhagwati-immiserizing-growth`
- `economics-principles-diamond-mirrlees-production-efficiency`
- `economics-principles-krugman-increasing-returns-trade`
- `economics-principles-melitz-firm-heterogeneity`
- `economics-principles-mirrlees-optimal-income-tax`
- `economics-principles-musgrave-three-branches`
- `economics-principles-samuelson-public-goods`
- `economics-principles-stolper-samuelson-factor-rewards`
- `economics-principles-tiebout-local-choice`
- `economics-investment-bogle-tax-friction`
- `economics-investment-bogle-low-cost-selection`
- `economics-investment-extended-markowitz-diversification-limit`
- `economics-investment-extended-markowitz-whole-portfolio`
- `economics-investment-extended-sharpe-systematic-risk`
- `economics-investment-extended-sharpe-market-portfolio`
- `economics-investment-extended-taleb-redundancy`

The survivor absorption map is in
[Economics + science + Mao curation evidence](../curation-2026-08-30/econ-science-mao-evidence.md#economics-retirement-and-absorption-map).

### Mao — 11 retired IDs, zero additions

All ten Mao recommendation groups were implemented; unique context and
distinctions were moved into the surviving cards.

- `mao-late-correct-ideas-return-and-repeat`, `mao-transform-conditions`
- `mao-early-economic-dual-test`, `mao-early-local-needs-wider-current`,
  `mao-early-base-as-system`
- `mao-middle-guerrilla-planned-flexibility`
- `mao-middle-organize-cooperative-capacity`
- `mao-middle-economy-public-needs-and-burdens`
- `mao-late-present-turning-point`
- `mao-late-no-all-directions-stabilize-coalition`
- `mao-late-democracy-two-functions`

Evidence: [Mao retirement and absorption map](../curation-2026-08-30/econ-science-mao-evidence.md#mao-retirement-and-absorption-map).

### Science — 7 retired IDs

Six of the seven science recommendation groups were implemented. The Curie
metadata/model issue is the sole remaining science item and is listed later.

- `science-bacon-organized-experiment`, `science-bacon-bee`
- `science-newton-rule-third`, `science-newton-analysis-synthesis`
- `science-kepler-ellipse`, `science-pasteur-rabies`
- `science-kuhn-anomaly-discovery`

Evidence: [Science retirement and absorption map](../curation-2026-08-30/econ-science-mao-evidence.md#science-retirement-and-absorption-map).

### Psychology — 10 retired IDs

Ten consolidation rows were implemented, with the useful material moved into
the better-bounded survivor in each cluster.

- `psychology-cognition-neisser-memory-reconstruction`
- `psychology-cognition-neisser-constructive-activity`
- `psychology-cognition-baddeley-hitch-unitary-store`
- `psychology-cognition-tulving-mental-time-travel`
- `psychology-cognition-tulving-systems-evidence`
- `psychology-social-lewin-unfreeze-change`
- `psychology-social-tajfel-positive-distinctiveness`
- `psychology-social-ainsworth-cultural-observation`
- `psychology-social-piaget-assimilation-accommodation`
- `psychology-social-vygotsky-tools-signs`

Runtime record:
[`psychologyCuration2026.ts`](../../content/psychologyCuration2026.ts).
Research context:
[Psychology/Indian curation evidence](../curation-2026-08-30/psychology-indian-evidence.md).

### Indian philosophy — 13 retired IDs

Eleven of the fourteen recommendation rows were implemented.

- `indian-nagarjuna-motion-relational`
- `indian-aryadeva-attachment-object`, `indian-aryadeva-emptiness-medicine`
- `indian-candrakirti-consequence-method`
- `indian-asanga-transform-basis`, `indian-asanga-ethics-training`
- `indian-vasubandhu-nonconceptual-turn`
- `indian-dignaga-two-sources`
- `indian-shankara-that-thou-art`
- `indian-ramanuja-devotion-knowledge`
- `indian-madhva-text-hierarchy`
- `indian-kabir-inner-ritual`, `indian-kabir-lived-search`

Runtime record: [`indianCuration2026.ts`](../../content/indianCuration2026.ts).
Research context:
[Psychology/Indian curation evidence](../curation-2026-08-30/psychology-indian-evidence.md).

## Partly implemented — confirm only the remaining live-card decision

These two economics rows overlap a completed retirement. The retired IDs above
must not be reconsidered; only the still-live cards below remain open.

1. **Taleb robustness cluster.** Redundancy has already been absorbed into the
   surviving barbell card. Decide whether
   `economics-investment-extended-taleb-absence`,
   `economics-investment-extended-taleb-luck-skill`, and
   `economics-investment-extended-taleb-barbell` still need further
   compression. Default: keep them unless a side-by-side UI review finds
   reader-visible repetition.
2. **Low-cost indexing cluster.** The former Bogle selection repetition has
   already been absorbed into `economics-investment-bogle-costs-zero-sum`.
   Decide whether `economics-investment-extended-malkiel-index-baseline` and
   `economics-investment-buffett-nonprofessional-indexing` both remain useful
   beside that survivor. Default: retain Buffett's checked primary-document
   card and keep at most one separate explanatory basis after UI comparison.

## Still awaiting owner confirmation — no retirement implemented

### Cross-library — 3 groups

1. `francis-bacon-method` / `science-bacon-gradual-induction`: overlapping
   passage, but potentially distinct disciplinary framing.
2. `popper-asymmetry` / `science-popper-induction`: same white-swan asymmetry;
   retain both only if logical asymmetry and induction are visibly separated.
3. `economics-kahneman-tversky-prospect-theory` /
   `psychology-cognition-kahneman-tversky-reference-dependence` /
   `psychology-cognition-kahneman-tversky-decision-weights`: product-level
   overlap, not a textual duplicate.

### Archived non-card asset — 1 decision

- `research/retired-illustrations/husserl-lived-body-v1.webp` is already
  outside runtime assets and safely preserved in the reversible research
  archive. Confirm whether to keep that archive or permanently delete it.
  Default: keep it archived; permanent deletion requires an explicit choice.

### Economics — 7 groups

1. `economics-investment-graham-market-offers` /
   `economics-investment-buffett-price-and-opinion`
2. `economics-investment-graham-margin-of-safety` /
   `economics-investment-extended-klarman-margin`
3. `economics-investment-fisher-scuttlebutt` /
   `economics-investment-extended-lynch-scuttlebutt`
4. The four-card Munger block: `economics-investment-munger-latticework`,
   `economics-investment-munger-inversion`,
   `economics-investment-munger-few-opportunities`, and
   `economics-investment-munger-incentives`
5. The four-card Klarman block: `economics-investment-extended-klarman-downside-first`,
   `economics-investment-extended-klarman-margin`,
   `economics-investment-extended-klarman-cash-option`, and
   `economics-investment-extended-klarman-catalyst`
6. `economics-investment-extended-soros-position-test` /
   `economics-investment-extended-soros-fallibility`
7. The three-card Lynch block: `economics-investment-extended-lynch-know-what-you-own`,
   `economics-investment-extended-lynch-company-category`, and
   `economics-investment-extended-lynch-growth-price`

### Science — 1 repair-first item

- `science-curie-pitchblende`: coauthor identity and separate French-source
  display are still not modeled. Repair that presentation first. Archive the
  card only if the owner deliberately declines the repair; this is not an
  evidence-based automatic deletion.

### Psychology — 12 groups

1. Direct-book checks before any archive decision:
   `psychology-cognition-deci-ryan-autonomy-competence`,
   `psychology-social-bandura-reciprocal-determinism`, and
   `psychology-cognition-deci-ryan-autonomous-controlled`.
2. Lazarus appraisal cluster:
   `psychology-cognition-lazarus-primary-appraisal`,
   `psychology-cognition-lazarus-secondary-appraisal`, and
   `psychology-cognition-lazarus-relational-themes`.
3. `psychology-social-festinger-dissonance` /
   `psychology-social-festinger-postdecision`.
4. `psychology-social-turner-self-categorization` /
   `psychology-social-turner-ingroup-influence`.
5. Bowlby attachment cluster: `psychology-social-bowlby-attachment-system`,
   `psychology-social-bowlby-secure-base`, and
   `psychology-social-bowlby-working-models`.
6. `psychology-foundations-wundt-feeling-dimensions`.
7. `psychology-foundations-ebbinghaus-overlearning`.
8. `psychology-foundations-pavlov-signal`.
9. `psychology-foundations-watson-prediction-control`.
10. `psychology-foundations-kohler-whole-organization` /
    `psychology-foundations-kohler-isomorphism`.

The three direct-book checks count as three independent recommendation rows;
the list above therefore represents 12 rows in total.

### Indian philosophy — 3 groups

1. `indian-nagarjuna-dependent-empty` /
   `indian-nagarjuna-two-truths`: keep both, but decide whether to rewrite them
   around distinct fixed verses before doing any further reduction.
2. `indian-shankara-real-change` / `indian-shankara-neti-neti`: optional
   product compression; prefer retaining the better-bounded negation card.
3. `indian-tagore-human-truth`: replace or archive only after separating the
   Chapter I argument from the appendix/dialogue material.

Western, Chinese, and Mao have no remaining candidate from their detailed
2026-08-28 reviews.

## Short priority order for the remaining decisions

1. **P0 — source/model integrity before deletion:** Curie coauthorship and
   French display; the three psychology book checks; Tagore's mixed locator;
   and fixed-source review of the Munger/Klarman blocks.
2. **P1 — clearest remaining consolidation:** the Bacon and Popper
   cross-library pairs; the Taleb and indexing partial groups; Graham/Buffett,
   Graham/Klarman, Fisher/Lynch; and the Lazarus/Festinger clusters.
3. **P2 — optional product-density review:** cross-library prospect theory;
   Turner and Bowlby; the five psychology foundational rows; Nāgārjuna and
   Śaṅkara; Soros and the broader Lynch block.
4. **P3 — archived asset housekeeping:** decide whether the non-runtime
   Husserl illustration should remain archived or be permanently deleted.

Priority means review order, not permission to remove anything.

## Detailed decision files

- [Cross-library deletion candidates](./cross-library-deletion-candidates.md)
- [Western + Chinese deletion candidates](./western-chinese-deletion-candidates.md)
- [Mao + science deletion candidates](./mao-science-deletion-candidates.md)
- [Economics deletion candidates](./economics-deletion-candidates.md)
- [Psychology deletion candidates](./psychology-deletion-candidates.md)
- [Indian-philosophy deletion candidates](./indian-deletion-candidates.md)

## Procedure after a new owner confirmation

1. Select the surviving canonical card and move over any unique question,
   context, distinction, connection, or source link.
2. Redirect thought-network references and add saved-state/deep-link migration
   if an ID has shipped publicly.
3. Move any redundant illustration into `research/retired-illustrations/`
   before permanent deletion.
4. Update deliberate library counts; do not add filler to satisfy an obsolete
   fixed-count test.
5. Re-run source, interpretation, illustration, localization, build, and
   extension-package checks.
