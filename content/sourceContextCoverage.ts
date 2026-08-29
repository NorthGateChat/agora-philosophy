/**
 * Snapshot of verified source excerpts that still lack a complete deep-reading
 * context. IDs are sorted, joined with a newline, and hashed with SHA-256.
 *
 * Refresh this snapshot only after reviewing a changed missing-ID set. A newly
 * verified excerpt with complete context does not change the snapshot; one
 * without complete context does.
 */
export const verifiedSourceContextCoverageSnapshot = {
  expectedMissingContextCount: 0,
  expectedMissingContextIdSha256:
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
} as const;
