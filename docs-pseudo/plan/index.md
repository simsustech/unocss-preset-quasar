---
layout: doc
---

# Pseudo-Element Elimination Plan

## Overview

This plan describes the complete approach to eliminate all `::before` and `::after` pseudo-elements from Quasar Framework's SASS codebase, and correspondingly simplify `unocss-preset-quasar` from verbose chained pseudo-element atoms to clean utility-class shells.

## Scope

- **Quasar Core (`~/Projects/quasar/ui/`)**: 23 SASS files, 96 pseudo-element occurrences
- **unocss-preset-quasar (`~/Projects/unocss-preset-quasar/packages/preset/`)**: 65+ component style files across MD2, MD3, Unstyled
- **Testing Harness**: Visual regression tests for MD2, MD3, Unstyled themes

## Goals

1. **Zero pseudo-elements** in Quasar component SASS
2. **Native HTML first** — prefer `<dialog>`, `<popover>`, `<input>`, `<details>`, `<progress>`, `<select>`
3. **Real DOM elements** where native HTML doesn't suffice — rendered by Vue, styled by preset
4. **Native CSS properties** — `accent-color`, `:focus-visible`, `::backdrop`, `anchor()`, CSS `mask`
5. **Preset simplification** — drop `[&:before]:(...)` chains; generate flat utility classes

## Success Criteria

| Criterion          | Measurement                                             |
| ------------------ | ------------------------------------------------------- |
| Visual parity      | 0px diff in Playwright screenshots (MD2, MD3, Unstyled) |
| CSS size reduction | ≥30% smaller preset CSS output                          |
| Animation parity   | All transitions/animations preserved                    |
| Accessibility      | No regressions (focus, ARIA, keyboard)                  |
| Test coverage      | 100% component visual tests passing                     |
| Bundle size        | Reduced Quasar client JS (less logic)                   |
