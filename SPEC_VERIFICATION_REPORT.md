# MD2 / MD3 Spec Verification Report

**Date**: 2026-07-01
**Specs**: `material_design_3_machine_spec.json` v2026.1, `material_design_2_machine_spec.json`
**Test harness**: `~/Projects/quasar-testing-harness` — Playwright + diagnostics dumps
**Result**: ✅ All 318 tests pass, zero unmatched utilities

## MD3 fixes (10 discrepancies)
| # | Component | Spec value | Was | Now |
|---|-----------|-----------|-----|-----|
| 1 | QBtn padding | 24px filled | 16px | 24px base, 12px flat |
| 2 | QToggle track | 52×32px | font-size 34px | 32px |
| 3 | QCheckbox shape | 18×18px | font-size 40px | 36px |
| 4 | QField filled corners | top-only | all sides | top-only 4px |
| 5 | QBtn outline border | outline token | currentColor | outline token |
| 6 | QField input text | 16px/24px body-large | 14px/28px | 16px/24px |
| 7 | QCard bordered | outline-variant | black/12 | outline-variant |
| 8 | QDrawer trailing corner | 16px all drawers | mobile-only | all drawers |
| 9 | QDialog dims | 280–560px, pad 24, corner 28 | missing | added |
| 10 | QLinearProgress track | surface-container-highest | opacity-40 | token-based |

## MD2 fixes (3 discrepancies)
| # | Component | Spec value | Was | Now |
|---|-----------|-----------|-----|-----|
| 1 | QBtn height | 36px | min-h-40px | min-h-[36px] |
| 2 | QToggle track | 36px width | max-w-32px | max-w-[36px] |
| 3 | QChip height | 32px | h-[2em]=28px | h-[32px] |

## Component conformance summary
| Component | MD3 ✅ | MD2 ✅ | Notes |
|-----------|--------|--------|-------|
| QBtn | ✅ | ✅ | Heights differ: 40px vs 36px per respective specs |
| QToggle | ✅ | ✅ | Track: 52×32px vs 36×14px |
| QCheckbox | ✅ | — | Inner shape: 18×18px both specs |
| QChip | ✅ | ✅ | Corner: 8px MD3, 16px MD2 |
| QCard | ✅ | — | Corner: 16px MD3, 4px MD2 |
| QField | ✅ | — | Input text: 16px MD3, 14px MD2 |
| QDialog | ✅ | — | Corner: 28px MD3, 4px MD2 |
| QDrawer | ✅ | — | Width: 360px MD3, 256px MD2 |
| QFab | — | — | 56px standard both specs |
| QTooltip | ✅ | — | 24px height both specs |
| QLinearProgress | ✅ | — | Track: surface-container-highest |

## Intentional deviations
| Item | Detail | Rationale |
|------|--------|-----------|
| QBtn corner (MD3) | 28px not `full` (Infinity) | Quasar convention |
| QCheckbox tap zone (MD3) | 36px inner not 48px | Tap zone handled by `.q-checkbox` wrapper |
| QCard filled bg (MD3) | highest vs container | Visual distinction from elevated |
| QBtn tonal (MD3) | Not implemented | No Quasar class; maps to standard |
| QFab large (MD3) | Not implemented | Uncommon; can add if needed |

## Test coverage
| Category | Count |
|----------|-------|
| Component spec files | 69 |
| Total tests | 318 |
| Styles tested | md3, md2, unstyled |
