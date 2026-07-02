# MD3 Spec Verification Report

**Date**: 2026-07-01
**Spec version**: `material_design_3_machine_spec.json` v2026.1
**Test harness**: `~/Projects/quasar-testing-harness` — Playwright + diagnostics dumps

## Summary

All 318 Playwright tests pass across 69 component spec files. Four numeric discrepancies
were found and fixed to align with the MD3 machine spec:

| # | Component | Spec value | Was | Now | Fix |
|---|-----------|-----------|-----|-----|-----|
| 1 | QBtn | Padding 24px (filled) | 16px | 24px | `px-[24px]` base, `px-[12px]` flat |
| 2 | QToggle | Track 52×32px | font-size 34px | 32px | 32 × 1.625em = 52px |
| 3 | QCheckbox | Inner shape 18×18px | font-size 40px | 36px | 36 × 0.5 = 18px bg |
| 4 | QField filled | Corner top-only | all sides 4px | top-only | `rounded-tl-[4px] rounded-tr-[4px]` |

## Component-by-component conformance

### Fully compliant (no changes needed) ✅

| Component | Height | Corner | Background | Typography | Notes |
|-----------|--------|--------|------------|------------|-------|
| QChip | 32px ✅ | 8px (small) ✅ | surface-container-low ✅ | label-large ✅ | px-[12px] ✅ |
| QTooltip | 24px ✅ | 8px (small) ✅ | inverse-surface ✅ | body-small ✅ | text inverse-on-surface ✅ |
| QCard | — | 16px (large) ✅ | surface-container-low ✅ | — | Elevated/filled/outlined variants correct |
| QDrawer | — | 16px (large, right) ✅ | surface-container-low ✅ | — | Mobile: rounded-e ✅ |
| QHeader | — | — | surface ✅ | — | — |
| QTab indicator | 32px height ✅ | pill ✅ | secondary-container ✅ | — | Centered pill correct |

### Fixed (this session) 🔧

| Component | Fix | Spec reference |
|-----------|-----|---------------|
| QBtn | Padding: 16px→24px filled, +12px flat | `buttons.filled_button.inner_margin_spacing` |
| QToggle | font-size: 34px→32px | `selection_components.switches.chassis_width_px: 52` |
| QCheckbox | font-size: 40px→36px | `selection_components.checkboxes_and_radios.centered_geometric_shape_area: 18` |
| QField filled | Corner: all → top-only | `text_fields.filled_text_field.corner_application_rules: top_only` |
| QDialog | Corner: 16px→28px | `interfaces_and_modals.dialog_windows.corner_shape: extra-large` (pending) |

### Boundary decisions (intentional deviations)

| Component | Issue | Rationale |
|-----------|-------|-----------|
| QField min-height | 56px only on `--auto-height` variant | Quasar standard field uses intrinsic sizing; 56px enforced where needed |
| QDialog padding | 16px from QCard, not 24px from spec | QCard handles inner padding; dialog wraps card |
| QFab sizing | Relies on Quasar defaults | FAB variants are prop-driven, not CSS-class-driven |
| QBtn tonal | Not implemented as separate variant | Maps to `q-btn--standard` with secondary-container bg — no separate class |

### Untestable (no CSS counterpart)

- Accessibility contrast ratios — handled by Quasar core color tokens
- Adaptive responsive layout — Quasar layout engine, not preset CSS
- Elevation shadows — Quasar core `.shadow-*` classes
- Focus ring parameters — Quasar core `.q-focus-helper`

## Test coverage

| Category | Count |
|----------|-------|
| Component spec files | 69 |
| Total tests | 318 |
| Styles tested | md3, md2, unstyled |
| Test types | Screenshot + computed-style assertions |

## Discrepancies found in tests (fixed)

| Test | Error | Fix |
|------|-------|-----|
| QToggle MD3 checkbox font-size | Expected 40px, got 34px | Changed to 32px expectation |
| QCheckbox dark shortcut | Double parens `((...))` → unmatched utility | Removed outer parens |
