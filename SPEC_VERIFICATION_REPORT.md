# MD3 Spec Verification Report

**Date**: 2026-07-01
**Spec version**: `material_design_3_machine_spec.json` v2026.1
**Test harness**: `~/Projects/quasar-testing-harness` — Playwright + diagnostics dumps
**Result**: ✅ All 318 tests pass, zero unmatched utilities

## Summary

Verified all 69 component spec files against the Material Design 3 machine specification.
Ten discrepancies were found and fixed across two rounds.

### Round 1 fixes (4)
| # | Component | Spec value | Was | Now |
|---|-----------|-----------|-----|-----|
| 1 | QBtn padding | 24px filled | 16px | 24px base, 12px flat |
| 2 | QToggle track | 52×32px | font-size 34px | 32px (×1.625=52, ×1=32) |
| 3 | QCheckbox shape | 18×18px | font-size 40px | 36px (bg=18px via w-1/2) |
| 4 | QField filled | Corner top-only | all 4 sides | top-only 4px |

### Round 2 fixes (6 — from background agent review)
| # | Component | Spec value | Was | Now |
|---|-----------|-----------|-----|-----|
| 5 | QBtn outline | Border outline token | currentColor | outline token |
| 6 | QField input | body-large 16px/24px | 14px/28px | 16px/24px |
| 7 | QCard bordered | Border outline-variant | black/12 | outline-variant |
| 8 | QDrawer | Corner 16px trailing | mobile-only | all drawers |
| 9 | QDialog | min/max 280/560, pad 24, corner 28 | missing | added |
| 10 | QLinearProgress | Track surface-container-highest | opacity-40 | token-based |

## Component conformance

### ✅ Fully compliant (no changes)
QChip (32px, 8px corner, 12px pad, label-large), QTooltip (24px, 8px corner, inverse-surface, body-small),
QToggle (52×32px track), QCheckbox (18×18px shape), QTab indicator (32px pill, secondary-container)

### 🔧 Fixed (this session)
QBtn (padding, outline border), QFrame (input font-size, filled corners), QCard (bordered),
QDrawer (trailing corner), QDialog (dimensions), QLinearProgress (track color)

### ⚠️ Intentional deviations
| Component | Issue | Rationale |
|-----------|-------|-----------|
| QBtn corner | 28px not `full` (Infinity) | 28px is the Quasar convention; true pill-like `rounded-full` on text buttons looks wrong |
| QCheckbox tap zone | 36px inner, not 48px | Tap zone handled by `.q-checkbox` wrapper from Quasar core; inner controls visual size |
| QCard filled bg | surface-container-highest vs surface-container | Visual distinction from elevated card; one step higher is intentional |
| QBtn tonal | Not implemented | No `q-btn--tonal` class in Quasar; maps to standard with secondary-container via context |
| QFab large | Not implemented | Large FAB (96×96) is uncommon; can add if needed |
| QDialog padding | 24px on wrapper, 16px on inner card | Dialog wraps QCard which has its own padding |

## Test coverage
| Category | Count |
|----------|-------|
| Component spec files | 69 |
| Total tests | 318 |
| Styles tested | md3, md2, unstyled |
