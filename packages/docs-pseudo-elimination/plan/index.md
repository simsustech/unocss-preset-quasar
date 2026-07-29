---
layout: doc
---

# Pseudo-Element Elimination Plan

## Overview

This document describes the complete plan to eliminate all `::before` and `::after` pseudo-elements from Quasar Framework components, replacing them with **real DOM elements**, **native CSS properties**, or **native HTML elements**.

**Goal:** Deliver a v3-ready Quasar + unocss-preset-quasar where:

- Zero pseudo-elements exist in component SASS
- All styling lives in the preset as utility classes on real elements
- Native HTML elements (`<dialog>`, `<details>`, `<input>`, `<progress>`, `<select>`) replace custom implementations where feasible

---

## Baseline

| Metric                                   | Value               |
| ---------------------------------------- | ------------------- |
| Quasar SASS files with pseudo-elements   | 23                  |
| Total `&:before` / `&:after` occurrences | ~96                 |
| Preset atoms encoding them               | 96+ across 32 files |
| Styles affected                          | md2, md3, unstyled  |

---

## Core Principle

> **Every pseudo-element is replaced by one of:**
>
> 1. **Real DOM element** — rendered by Vue, styled via preset utilities
> 2. **Native CSS property** — `border`, `background`, `box-shadow`, `outline`, `accent-color`
> 3. **Native HTML element** — `<dialog>`, `<details>`, `<input>`, `<progress>`, `<select>`

> **No pseudo-element helpers. No `[&:before]` atoms in preset.** Preset emits only utility classes on real selectors.

---

## Replacement Patterns

| Pseudo-element pattern                      | Replacement                                                           |
| ------------------------------------------- | --------------------------------------------------------------------- |
| `::before` full-overlay (hover surface)     | Real `div.overlay` or `box-shadow`/`background` on element            |
| `::after` animated focus underline          | Real `div.focus-underline` or native `:focus-visible` outline         |
| `::before` radial halo (QToggle)            | `accent-color` on native `<input type="checkbox">` + `:focus-visible` |
| `::before` box-shadow behind content (QBtn) | `box-shadow` on element + `isolation: isolate`                        |
| `::after` date range highlight              | Real background on element + structural classes for corners           |
| `::before` calendar cell border             | Real `border: 1px dashed transparent` on element                      |
| `::before` slider track                     | Native `<input type="range">` track styling                           |
| `::before` tree connector line              | Real `div.connector` or CSS `border-left` on container                |
| `::backdrop` on dialog                      | Native `<dialog>::backdrop`                                           |

---

## Current Status (Phases 2 + 3 Complete)

Major milestone achieved: zero pseudo-element references anywhere in the Quasar + unocss-preset stack.

| Metric                                    | Before | After     |
| ----------------------------------------- | ------ | --------- |
| Quasar SASS files w/ pseudo-elements      | 23     | 0         |
| Total `&:before`/`&:after` in Quasar SASS | 96     | 0         |
| Quasar components refactored              | 0      | 23        |
| Preset pseudo-element atoms               | 137    | 0         |
| Preset files w/ pseudo-element atoms      | 33     | 0         |
| Playwright tests passing                  | n/a    | 428 / 428 |

### Components refactored (23 / 23)

QLayout, QTimeline, QTree, QStepper, QField, QSlider, QRange,
QDate, QBtn, QToggle, QTime, QLinearProgress, QUploader, QSkeleton,
QRadio, QCheckbox, QKnob, QEditor, QChatMessage, QColor, QTable,
QBtnGroup. QIcon was identified as dead CSS (no `content` declarations); rules removed.

### Pattern applied per phase

**Phase 2 (Quasar layer)**:

1. Identified the structural host (the real element that owns the overlay).
2. Added a real child element (`.q-foo__overlay`, `.q-foo__thumb-knob`,
   `.q-foo__arrow`, etc.) in the Vue render function.
3. Updated SASS to address the new child selector instead of the
   pseudo-element, preserving all visual behavior.

**Phase 3 (Preset layer)**: 4. Re-aimed every `[&:before]:(...)` / `[&:after]:(...)` / `[::before]`
/ `[::after]` / `content-empty` atom at the real child class added in
phase 2. Removed `content-['']` flags (real elements don't need them). 5. Verified via full Playwright suite (428 / 428 green).

### Phase 3 mapping rules

| Old                                              | New                                                       |
| ------------------------------------------------ | --------------------------------------------------------- |
| `[&:before]:(utils)`                             | `[&_.q-foo__overlay]:(utils)` (or appropriate real child) |
| `[&:after]:(utils)`                              | Same pattern, matching overlay class                      |
| `[&_:before]:(utils)`                            | `[&_.q-foo__bar]:(utils)` etc.                            |
| `[&:nth-child(N):before]:(utils)`                | `[&:nth-child(N)_.q-foo]:(utils)`                         |
| `[&_:hover:before]:(utils)`                      | `[&_:hover_.q-foo__overlay]:(utils)`                      |
| `content-['']` or `content-empty` inside utility | Deleted (real elements don't need `content`)              |
| Dead `[&:before]:(...)` with no `content`        | Rule REMOVED (was dead CSS)                               |

Notable conversions:

- **QBtn** `[&:before]:(shadow, border)` → `[&_.q-btn__overlay]:(...)`
- **QField** `[&:before]:(hover-bg)` → `[&_.q-field__overlay]:(...)`; focus-underline `[&:after]:(...)` removed (focus state is now a class on the overlay).
- **QSlider** `[&:after]:(marker)` → `[&_.q-slider__marker-end-cap]:(...)`; `[&:before]:(pin-arrow)` → `[&_.q-slider__pin-arrow]:(...)`.
- **QDate** `[&:before]:(range-fill)` → `[&_.q-date__range-fill]:(...)`; `[&:after]:(focus-dashed-border)` → `[&:focus-visible]:(outline-dashed)` (semantic swap).
- **QTree** `[&_:before/after]:(connectors)` → `[&_.q-tree__connector]:(...)`.
- **QLinearProgress** `[&_:before]:()` / `[&_:after]:()` → `[&_.q-linear-progress__model-bar--1] / [--2]:(...)`.
- **QTime** aspect-ratio pseudo-hack → REMOVED (replaced by `aspect-ratio: 1`). Clock-pointer pseudos → `.q-time__clock-pointer-bottom` / `.q-time__clock-pointer-top`.
- **QIcon** `[&:before]:(flex)` + `[&:after]:(flex)` were dead CSS without `content`. REMOVED.
- **QKnob** `[&:before]:(focus-ring)` → `[&_.q-knob__overlay]:(...)`.

### Documented exception

The `--placeholder` modifier on `.q-editor__content` retains its
`[&:empty:not(:focus):before]:(content-[attr(placeholder)])` selector because it relies on
`content: attr(placeholder)` — CSS `attr()` retrieval into `content` works inside pseudo-elements only.
This single rule is a known exception; removal requires a JavaScript-driven placeholder element (Phase 4).

`content-empty` directive is fully retired from preset emission.

### Next: Phase 4 — Native HTML Swaps

Replace QToggle/QCheckbox/QRadio with native `<input>` + `accent-color`,
QLinearProgress with `<progress>`, QSlider/QKnob with `<input type=range>`,
QDialog with `<dialog>`, QExpansionItem with `<details>`, etc.
See `phases.md` (× Weeks 4-6) for the full plan.

---

## Next Steps

- [Impact Analysis](/impact/) — per-component breakdown
- [PoC: QDate](/poc/qdate) — proof of concept with structural classes
- [Screenshots](/screenshots/) — before/after visual comparison
