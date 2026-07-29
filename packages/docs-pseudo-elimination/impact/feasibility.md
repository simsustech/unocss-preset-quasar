---
layout: doc
---

# Native Swap Feasibility Assessment

Assessment of replacing Quasar components with native HTML equivalents.

## Feasibility Matrix

| Component                           | Native Replacement                         | Feasibility | Rationale                                                                                                        | Effort  |
| ----------------------------------- | ------------------------------------------ | ----------- | ---------------------------------------------------------------------------------------------------------------- | ------- |
| **QDialog**                         | `<dialog>`                                 | **High**    | Browser provides top-layer, focus trap, ESC handling, `::backdrop`, `showModal()`/`close()`                      | High    |
| **QMenu**                           | `<menu>` + Popover API                     | **Medium**  | Popover API handles positioning, dismissal, focus; lacks keyboard navigation parity                              | Medium  |
| **QTooltip**                        | `popover` attribute                        | **Medium**  | Native `popover` + `[popover]:not(:popover-open)` for show/hide; delay timers need JS                            | Medium  |
| **QExpansionItem**                  | `<details>` + `<summary>`                  | **High**    | Native open/close, ARIA, keyboard; no JS needed                                                                  | Low     |
| **QToggle**                         | `<input type="checkbox">` + `accent-color` | **High**    | Native checkbox + CSS `accent-color` + `<label>` replaces entire component                                       | Low     |
| **QCheckbox**                       | `<input type="checkbox">` + `accent-color` | **High**    | Native checkbox + `accent-color` + custom checkmark via `::before` on label                                      | Low     |
| **QRadio**                          | `<input type="radio">` + `accent-color`    | **High**    | Native radio group + `accent-color` replaces inner dot                                                           | Low     |
| **QSlider**                         | `<input type="range">`                     | **High**    | Native range + `appearance: none` + CSS track/thumb styling                                                      | Medium  |
| **QKnob**                           | `<input type="range">` circular            | **Medium**  | Circular range via CSS `appearance: none` + conic gradient; vertical orientation needs `-webkit-slider-vertical` | Medium  |
| **QLinearProgress**                 | `<progress>`                               | **High**    | Native `<progress max="100" value="50">` + CSS animation for indeterminate                                       | Low     |
| **QCircularProgress**               | `<progress>` + conic-gradient              | **Medium**  | `<progress>` + `aspect-ratio: 1` + `mask: conic-gradient()` for progress arc                                     | Medium  |
| **QSelect (plain)**                 | `<select>`                                 | **High**    | Native select for single/multiple; chips/multi-select need custom                                                | Low     |
| **QDate (plain)**                   | `<input type="date">`                      | **High**    | Native date picker for simple cases; rich picker stays custom                                                    | Low     |
| **QTime (plain)**                   | `<input type="time">`                      | **High**    | Native time picker for simple cases                                                                              | Low     |
| **QFile**                           | `<input type="file">`                      | **High**    | Already native; just needs `accent-color` styling                                                                | Trivial |
| **QLinearProgress (indeterminate)** | CSS animation on `<progress>`              | **High**    | `@keyframes` on `::-webkit-progress-bar` / `::-moz-progress-bar`                                                 | Low     |

## Not Feasible for Native Swap

| Component                | Reason                                                                                               |
| ------------------------ | ---------------------------------------------------------------------------------------------------- |
| **QBtn**                 | Loading state, icon positioning, fab/mini, dense, glossy, push, ripple, dropdown - too many variants |
| **QTree**                | Recursive expansion, drag-drop, lazy loading, node slots - no native equivalent                      |
| **QTimeline**            | Connector lines, dots, side content - purely visual                                                  |
| **QStepper**             | Vertical/horizontal, alternative labels, error states, validation - wizard UI                        |
| **QTable**               | Virtual scroll, sorting, filtering, pagination, selection, expandable rows                           |
| **QUploader**            | Drag-drop zone, file queue, progress per file, chunked upload, retry                                 |
| **QSkeleton**            | Pure visual placeholder - no interactive equivalent                                                  |
| **QChatMessage**         | Bubble tail, status icons, groupings - messaging-specific visual                                     |
| **QColor**               | Spectrum, palette, tuner, opacity, HSV/RGB/HEX - complex picker                                      |
| **QEditor**              | Toolbar, markdown/HTML, embeds, images - rich text editor                                            |
| **QBtnGroup**            | Layout-only divider between buttons                                                                  |
| **QIcon**                | Font fallback rendering - utility                                                                    |
| **QEditor**              | Toolbar, markdown/HTML, embeds                                                                       |
| **Visibility/Normalize** | Utility CSS, not components                                                                          |

## Recommended Migration Order

1. **Week 1-2 (High feasibility, low effort):** QToggle, QCheckbox, QRadio, QLinearProgress, QKnob, QFile, QSelect (plain), QDate/QTime (plain)
2. **Week 3-4 (High feasibility, medium effort):** QDialog, QExpansionItem, QSlider, QCircularProgress
3. **Week 5-6 (Medium feasibility):** QMenu, QTooltip, QLayout (drawer)
4. **Week 7+ (Low feasibility):** QBtn, QTree, QTimeline, QStepper, QTable, QUploader - keep custom, just eliminate pseudo-elements
