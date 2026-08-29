# Local source cache

This directory preserves primary-source PDFs, text extractions, structured
source data, and local license or review notes used during AGORA's source
review. The cached artifacts are intentionally ignored by Git and must never be
copied into the web or extension build.

The manifest indexes `.djvu`, `.html`, `.json`, `.md`, `.pdf`, `.txt`, and
`.xml` files below this directory. This README stays versioned so a clean
checkout retains the cache contract even when none of the local artifacts is
available.

The durable, versioned record is split across:

- `../../content/verifiedSourcePassages.ts`: thought IDs, editions, use bases,
  and public source links;
- `../source-cache-manifest.json`: local relative paths, byte sizes, and SHA-256
  hashes for the files currently present on this research machine; byte-identical
  copies are represented as aliases of one content artifact instead of being
  mistaken for independent evidence;
- `../../content/interpretationDetails*.ts` and card-level `context` /
  `distinction` fields: source-aware notes used by **Read Deeper**.

Refresh the manifest after adding or replacing source files:

```bash
node scripts/index-source-cache.mjs
```

The manifest test always validates that contract. When the local source cache
has been restored, it additionally requires the cached path set, byte sizes,
and SHA-256 digests to match the manifest; with no cached artifacts it performs
the structure-only checks suitable for CI and clean checkouts.

Rendered page images are QA intermediates and do not need to be archived when
the underlying PDF and its locator are preserved.
