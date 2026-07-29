---
layout: home

hero:
  name: 'Pseudo-Element Elimination Plan'
  text: 'Quasar SASS ::before/::after Removal'
  tagline: Comprehensive investigation, impact analysis, and migration plan to eliminate pseudo-elements from Quasar and simplify unocss-preset-quasar
  actions:
    - theme: brand
      text: Read the Plan
      link: /plan/
    - theme: alt
      text: View Inventory
      link: /inventory/
    - theme: alt
      text: Per-Component Impact
      link: /impact/

features:
  - title: Complete Inventory
    details: Every ::before and ::after across 23 Quasar SASS files, categorized by function and replacement strategy
    link: /inventory/
  - title: Per-Component Impact Analysis
    details: Detailed breakdown for each of the 25+ affected components with before/after CSS, DOM changes, and risk assessment
    link: /impact/
  - title: Proof-of-Concept Implementations
    details: Working code prototypes demonstrating native HTML replacements for critical components
    link: /poc/
  - title: Before/After Visual Diffs
    details: Playwright-generated screenshots and computed-style comparisons for every component in MD2, MD3, and Unstyled
    link: /before-after/
  - title: Migration Guide
    details: Step-by-step migration for Quasar core, preset, and consumer applications with testing strategy
    link: /migration/
  - title: Quasar v3 PR Ready
    details: All findings structured for upstream contribution to Quasar v3 with zero ambiguity
    link: /plan/phases
---

# Executive Summary

This document captures the complete investigation into eliminating `::before` and `::after` pseudo-elements from Quasar's SASS codebase and the corresponding simplification of `unocss-preset-quasar`.

## Key Findings

| Metric                    | Value                                                                 |
| ------------------------- | --------------------------------------------------------------------- |
| **Total pseudo-elements** | 96 across 23 SASS files                                               |
| **Components affected**   | 25+                                                                   |
| **Primary use cases**     | Focus indicators, hover overlays, decorative elements, layout helpers |
| **Replacement viability** | 85% replaceable with native HTML/CSS; 15% require real DOM nodes      |

## Investigation Methodology

1. **Static Analysis**: Grepped all Quasar SASS for `&:before` and `&:after` patterns
2. **Runtime Verification**: Used Playwright with computed-styles capture to lock in current visual behavior
3. **Native HTML Mapping**: Identified equivalent native elements (`<dialog>`, `<popover>`, `<input type="range">`, `<details>`, etc.)
4. **Preset Impact**: Mapped each pseudo-element to its UnoCSS preset representation
5. **PoC Validation**: Built working prototypes for highest-impact components

## Replacement Strategy Overview

| Pseudo-Element Pattern                 | Native Replacement                                | Components                 |
| -------------------------------------- | ------------------------------------------------- | -------------------------- |
| Focus underline (`::after` on control) | `:focus-visible` + native input                   | QField, QInput, QSelect    |
| Hover surface (`::before` on control)  | Real `<div>` overlay + CSS                        | QField, QBtn               |
| Ripple effect (`::before` on button)   | `<span class="ripple">`                           | QBtn, QFab, QItem          |
| Radial pulse (`::before` on toggle)    | Native `<input type="checkbox">` + `accent-color` | QToggle, QCheckbox, QRadio |
| Calendar cell borders (`::after`)      | Real `<td>` borders                               | QDate                      |
| Tooltip arrow (`::before`)             | `::anchor` + CSS `anchor()`                       | QTooltip                   |
| Dialog backdrop (`::before`)           | Native `<dialog>::backdrop`                       | QDialog                    |
| Tree connectors (`::before/::after`)   | Real `<span>` connectors                          | QTree                      |
| Slider track/fill (`::before/::after`) | Native `<input type="range">`                     | QSlider                    |

## Quick Links

- **[Full Plan →](/plan/)** — Phases, timeline, success criteria
- **[Complete Inventory →](/inventory/)** — Every pseudo-element with replacement
- **[Per-Component Impact →](/impact/)** — Detailed analysis per component
- **[Proof of Concepts →](/poc/)** — Working implementation prototypes
- **[Before/After Diffs →](/before-after/)** — Visual and CSS comparisons
- **[Migration Guide →](/migration/)** — Step-by-step migration steps
