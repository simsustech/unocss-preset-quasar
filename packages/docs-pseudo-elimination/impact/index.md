---
layout: doc
---

# Impact Analysis Overview

## Summary

This section analyzes the impact of eliminating pseudo-elements across all 23 Quasar SASS files, mapping each pseudo-element to its replacement strategy and assessing native HTML swap feasibility.

## Metrics

| Metric                                | Value                                         |
| ------------------------------------- | --------------------------------------------- |
| Total SASS files with pseudo-elements | 23                                            |
| Total `&:before` occurrences          | ~50                                           |
| Total `&:after` occurrences           | ~46                                           |
| Components affected                   | 21 (excluding visibility/normalize utilities) |
| Styles impacted                       | md2, md3, unstyled                            |

## Replacement Strategy Categories

| Category                | Count | Examples                                                     |
| ----------------------- | ----- | ------------------------------------------------------------ |
| **Real DOM element**    | 42    | Overlay divs, connector divs, shimmer divs                   |
| **Native CSS property** | 28    | `border`, `background`, `box-shadow`, `accent-color`         |
| **Native HTML element** | 18    | `<dialog>`, `<details>`, `<input>`, `<progress>`, `<select>` |
| **Structural classes**  | 12    | Calendar corner rounding, range positioning                  |

## Next Steps

- [Per-Component Table](/impact/per-component) — Detailed breakdown per component
- [Native Swap Feasibility](/impact/feasibility) — Assessment of native HTML replacements
