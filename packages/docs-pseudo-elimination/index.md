---
layout: doc
---

# Pseudo-Element Elimination Documentation

Complete plan, impact analysis, proof-of-concept, and validation for eliminating all `::before`/`::after` pseudo-elements from Quasar Framework components.

## Quick Links

| Section                                       | Description                                  |
| --------------------------------------------- | -------------------------------------------- |
| [Plan Overview](/plan/)                       | Strategy, phases, validation criteria        |
| [Impact Analysis](/impact/)                   | Per-component breakdown, feasibility         |
| [QDate PoC](/poc/qdate)                       | Complete proof-of-concept with code          |
| [Structural Classes](/poc/structural-classes) | Pattern for replacing pseudo-elements        |
| [Preset Changes](/poc/preset-changes)         | Before/After preset shortcut transformations |
| [Screenshots](/screenshots/)                  | Visual regression methodology & results      |

---

## Summary

**Goal:** Eliminate all 96 `::before`/`::after` pseudo-elements across 23 Quasar SASS files by replacing them with:

1. **Real DOM elements** rendered by Vue components
2. **Native CSS properties** (`border`, `background`, `box-shadow`, `accent-color`)
3. **Native HTML elements** (`<dialog>`, `<details>`, `<input>`, `<progress>`, `<select>`)

**Result:** Zero pseudo-elements in component SASS; all styling via preset utility classes on real elements.

---

## Key Metrics

| Metric                           | Before       | After        |
| -------------------------------- | ------------ | ------------ |
| SASS files with pseudo-elements  | 23           | 0            |
| Total pseudo-element occurrences | ~96          | 0            |
| Preset `[&:before]` atoms        | 96+          | 0            |
| Native HTML replacements         | 6 components | 6 components |

---

## Navigation

- [Plan →](/plan/)
- [Impact Analysis →](/impact/)
- [QDate Proof-of-Concept →](/poc/qdate)
- [Screenshots →](/screenshots/)
