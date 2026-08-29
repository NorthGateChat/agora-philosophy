# AGORA Store Assets V2

This directory is the working specification for the second-generation AGORA store and campaign assets. It deliberately separates **what can be uploaded to Chrome Web Store**, **what tells the broader product story**, and **what is only source material**.

The current extension version in the repository is `0.2.3`. The `v2` directory name refers only to this visual and copy system; it must never be copied into `manifest.json` as a version number.

## Directory contract

The generated V2 set uses the following structure:

```text
store-assets/v2/
├── README.md
├── COPY-ZH-CN.md
├── COPY-EN.md
├── brand-and-campaign-board.png
├── product-story-contact-sheet.png
├── product-story-contact-sheet-en.png
├── preview/
├── brand/
│   ├── app-icon-512.png
│   └── app-icon-1024.png
├── campaign/
│   ├── en/
│   └── zh-CN/
├── upload/
│   ├── global/
│   └── zh-CN/
├── story/
│   ├── en/
│   └── zh-CN/
└── source/
    ├── captures/
    ├── generated/
    ├── prompts/
    └── …
```

### `upload` — Chrome 商店真实界面素材

`upload` contains the final files that may be uploaded to Chrome Web Store.

- Screenshots must show the real current product UI and real shipped functionality.
- Generated illustration may support the composition, but it must not fabricate controls, content, or product states.
- The UI should remain the dominant evidence in each screenshot.
- Store screenshots are `1280×800`, 24-bit RGB PNG, with no alpha channel.
- Upload no more than five screenshots per locale.
- Promotional tiles are global, while screenshot sets may be localized.
- Do not place article covers, conceptual posters, prompt references, or raw generated images here.

### `story` — 宣传、公众号与官网产品介绍图

`story` contains editorial product-introduction graphics for channels where a stronger narrative composition is appropriate.

Examples include:

- WeChat article covers and in-article illustrations
- Website feature sections
- X, Weibo, Xiaohongshu, or launch-post graphics
- A visual sequence explaining the five collections or the life of an idea

Story graphics may combine real UI, large editorial headlines, diagrams, and generated illustrations more freely. They are **not Chrome Web Store screenshots by default** and must not be moved into `upload` without checking store requirements and product accuracy.

### `brand` and `campaign` — 产品识别与图文封面

`brand` contains reusable high-resolution product icons. `campaign` contains finished, text-and-image compositions rather than raw abstract art:

- `article-cover-900x383.png` — 公众号或文章横版封面
- `launch-cover-1600x900.png` — 发布文章首图、视频封面或演示页
- `social-square-1080.png` — X、微博、小红书等方形发布图

Each campaign asset combines the AGORA mark, a concise message, real localized UI, and a restrained generated line illustration. The illustration establishes mood; the product UI remains the evidence.

### `source` — 生成底材与可编辑母版

`source` contains ingredients, not publishable assets:

- text-free generated illustrations
- editable high-resolution master backgrounds
- prompts and negative prompts
- unframed browser captures
- masks, crops, and composition studies

Generated source art must not contain logos, UI, Chinese or English text, signatures, or watermarks. All typography is added during composition so that copy remains accurate and editable.

## Upload mapping

### Chrome Web Store fields

| Store field | File | Notes |
| --- | --- | --- |
| Store icon | `upload/global/store-icon-128.png` | 128×128 PNG; keep the established AGORA icon unless the icon itself is deliberately redesigned |
| Global screenshot 1 | `upload/global/screenshot-01-discover-1280x800.png` | Current real-UI fallback; discovery/new-tab experience |
| Global screenshot 2 | `upload/global/screenshot-02-collections-1280x800.png` | Five collections and Across Collections |
| Global screenshot 3 | `upload/global/screenshot-03-read-deeper-1280x800.png` | Interpretation and thought connections |
| Global screenshot 4 | `upload/global/screenshot-04-library-1280x800.png` | Saved, recent, hidden, search/filter |
| Global screenshot 5 | `upload/global/screenshot-05-share-1280x800.png` | Desktop/mobile share workspace and privacy line |
| Simplified Chinese screenshot 1–5 | Matching files under `upload/zh-CN/` | Same narrative and composition, with Simplified Chinese headings and Simplified Chinese product state |
| Small promotional tile | `upload/global/small-promo-440x280.png` | One focal illustration; language-light copy |
| Marquee promotional tile | `upload/global/marquee-1400x560.png` | Global English campaign version |
| Promotional video | Leave empty | Add only after a real product video is available on YouTube |

The safest Chrome form submission uses the full-screen real product captures from `upload`. The five images under `story/zh-CN` and `story/en` are the product-introduction sequence for launch posts, a website, a WeChat article, or an alternate store-gallery experiment; they contain real UI, but the interface is deliberately smaller because the narrative copy and original illustration share the frame. Never upload files from `source`.

## Generate and verify

```bash
npm run capture:store-assets:v2:en
npm run generate:store-assets:v2
node --test tests/store-assets-v2.test.mjs
npm run package:store-assets:v2
```

The English capture command expects the local preview at `http://localhost:3003/`; override it with `AGORA_STORE_PREVIEW_URL` when needed. The generator rebuilds both localized upload sets, both five-frame product-story sets, the promotional tiles, high-resolution icons, three campaign cover formats per language, and Chinese/English contact sheets. Run the package command only after visual QA; it produces three separate archives under `store-assets/`:

- `agora-chrome-web-store-upload-v2.zip` — only the Chrome upload directories plus the field mapping and copy.
- `agora-product-intro-assets-v2.zip` — icons, finished campaign covers, five-page product stories, previews, and source illustrations.
- `agora-store-assets-v2-complete.zip` — the complete reviewed V2 material set.

## Five-frame visual narrative

| No. | Story beat | Product proof | Illustration role |
| ---: | --- | --- | --- |
| 01 | Encounter a thought | Full new-tab page, bilingual proposition, author and work | A faint threshold or entering light |
| 02 | Wander across traditions | Five collection tabs plus Across Collections | Five paths meeting in an open square |
| 03 | Read one layer deeper | Interpretation, context, boundaries, roots, counterpoints, echoes | The selected thought’s line illustration at low contrast |
| 04 | Build a private reading practice | Saved, recent, hidden, search and filters | Sparse bookmark or archival-card motif |
| 05 | Carry the thought elsewhere | Desktop/mobile share image, save, copy, system share | A page extending into another space |

Chinese and English headlines are maintained in `COPY-ZH-CN.md` and `COPY-EN.md`. Do not retype them directly into a design file without checking those sources first.

## Promotional concepts

### Small tile: one mark, one thought

- Warm ivory background, charcoal linework, and one very small muted accent.
- Wordmark and tagline on the left; one open-square/threshold illustration on the right.
- No feature checklist and no miniature screenshot.
- Global copy: `AGORA / PHILOSOPHY / NEW TAB / ONE PAGE, ONE IDEA`.

### Marquee: five paths into AGORA

- Left 42%: wordmark, campaign line, and a three-part feature line.
- Right 58%: a bespoke illustration of five paths or partial arches converging on an open plaza.
- A cropped real thought card may be layered into the composition, but it must remain visibly authentic.
- Do not reuse the old gold concentric-circle and grid motif as the dominant identity.

## Visual language

- Palette: warm white and charcoal first; at most one muted verdigris or oxblood accent covering only a small part of the image.
- Linework: thin, imperfect graphite or charcoal with generous negative space.
- Typography: Chinese Song/Ming-style serif for editorial headings, restrained sans serif for labels, and a classical serif for English display text.
- Composition: asymmetrical and calm; one conceptual object per frame.
- Illustration: original editorial/manuscript sensibility without imitating a named artist or another extension.
- Motion cannot be demonstrated in a still image, so do not simulate motion blur or fake animation controls.

Avoid:

- decorative grids, radar charts, or large concentric circles behind every screen
- fake paper noise that reduces legibility
- generated text or generated UI
- portraits used as generic decoration
- platform-logo collages
- claims such as “the complete canon,” “the most comprehensive,” or “famous quotes”

## Source illustration prompt

Save the final prompt and generation metadata under `source/prompts/`. The campaign master may begin from this text-free prompt:

```text
Editorial hand-drawn line illustration on warm ivory paper. Five distinct paths and incomplete archways approach one open central square from different directions. Along the paths, use only understated fragments: a cave opening crossed by light, a butterfly-wing contour, field-survey footsteps, a quiet orbital curve, and one chariot-wheel spoke. Ultra-thin graphite and charcoal lines, vast negative space, asymmetrical composition, sophisticated manuscript and editorial drawing, fully original. Black and warm ivory with one tiny muted verdigris accent. No text, letters, logo, UI, portrait, political symbol, decorative grid, concentric-circle background, signature, or watermark.
```

Generate the artwork without text. Add all AGORA copy, real UI, and branding afterward in the layout source.

## Production workflow

1. Confirm the version and features in the actual extension ZIP.
2. Capture real UI at exactly `1280×800`, using the intended language, theme, and representative content.
3. Generate or select text-free source illustrations.
4. Compose the global English and Simplified Chinese screenshot sets from the same grid.
5. Export every Chrome-bound image as 24-bit RGB PNG without alpha.
6. Verify that all UI shown exists in the build and that no card is presented as a direct quotation when it is a rendering or editorial study note.
7. Upload only files under `upload` using the mapping above.
8. Keep `story` and `source` in the repository as campaign working material, not as Chrome listing uploads.

## Release-note policy

The copy files include two update-note variants: one for an upgrade from `0.2.2` or earlier, and one for the release following `0.2.3`. Choose only the version that matches the actual published-to-uploaded diff. If an illustrated card or UI improvement has not shipped in the ZIP, remove it from the update note even if its visual asset is already complete.

## V2 material changelog

- Reframed the store set as a five-part product journey rather than a collection of raw screenshots.
- Brought all five thought collections, cross-collection random reading, private library controls, and sharing into the acquisition story.
- Added copy-ready Simplified Chinese and English listings.
- Defined separate `upload`, `story`, and `source` responsibilities to prevent conceptual campaign art from being mistaken for a real store screenshot.
- Replaced the old grid-and-ring promotional direction with an original, sparse “five paths into an open square” illustration system.
