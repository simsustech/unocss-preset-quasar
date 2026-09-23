# ADR 0002 — reference quirks and the wind4 delegation rule

**Status:** accepted · **Context:** three sources disagree, and the preset has to
pick one per declaration.

## Decision

- **`quasar/dist/quasar.css` is the arbiter** for what Quasar means. When the
  vendored reference bundle and dist disagree, dist wins and the reference value
  is kept only as a labelled shim (e.g. `q-file__dnd`'s malformed `outline-color`,
  `outline: auto` on `q-link--focusable`).
- **MD3/MD2 specs are a cross-check**, not an override. The badge is the worked
  example of getting this wrong: the fix plan adjudicated `font-size` from MD3's
  label-small token (11px) and the harness caught the DOM rendering 11px where
  dist says **12px**. Specs inform; dist decides.
- **wind4 keeps what it already emits identically.** A class wind4 provides with
  dist's value is `wind4-covered` and this preset adds nothing — duplicating it
  would be the defect. Where wind4's value _differs_ (dist's `!important` on
  `cursor-none`, dist's 12px label, `text-brown` which wind4 does not carry at
  all) the preset emits it and the divergence is recorded.
- Every such decision was **measured by generating wind4 alone**, per class, not
  inferred from naming.

## Consequences

- `specs/audit/DISPOSITION.md` is the ledger: 76 flagged classes, 0
  undispositioned, each classification reproducible by re-running the sweep.
- Parity's `mismatch` count may move _up_ when a dist-faithful value replaces a
  reference-faithful one (badge 29 → 30). That is the ratchet being updated
  deliberately, never regenerated blind.
