# Machine Spec → StyleSpec Conversion

**Date:** 2025-07-16 (A5b component migration: 2026-07-30)

## Summary

This project previously maintained separate machine-generated spec files (JSON-based) alongside hand-authored component templates. The StyleSpec architecture replaces both with a unified, type-safe specification system.

All values in the spec were extracted from code-as-is — the machine specs and hand-authored templates served as the source of truth. Where conflicts existed between a machine spec value and the actual code output, code won (F2 principle).

## What was converted

- **`material_design_3_machine_spec.json`** → `src/spec/md3.spec.ts`
- **`material_design_2_machine_spec.json`** → `src/spec/md2.spec.ts`
- **Implicit unstyled defaults** → `src/spec/unstyled.spec.ts`

The machine JSON files have been deleted. All spec values are now defined in TypeScript under `src/spec/`.

## StyleSpec structure

Each StyleSpec contains:

| Section         | Description                                                              |
| --------------- | ------------------------------------------------------------------------ |
| `tokens`        | Core design tokens (color, shape, typography, elevation, sizing, motion) |
| `darkTokens`    | Dark-mode token overrides (partial — inherits light defaults)            |
| `features`      | Feature flags for structural differences between styles                  |
| `components`    | Per-component style declarations (property/value pairs)                  |
| `layout`        | Breakpoint and spacing definitions                                       |
| `accessibility` | WCAG/APCA contrast targets and interactive sizing                        |

## Component template migration

The `src/styles/` directory follows a three-tier architecture:

1. **Shared templates** (`src/styles/shared/components/`) — Style-agnostic component shortcuts that accept a `SpecResolver` function via `makeQBtnShortcuts(s)` pattern. All 68 components shared across md3/md2 have shared templates.
2. **Style wrappers** (`src/styles/{md3,md2,unstyled}/components/`) — Thin files that call `bindSpec('md3')` / `bindSpec('md2')` and pass the resolver to the shared template.
3. **Style index** (`src/styles/{md3,md2,unstyled}/index.ts`) — Assembles all shortcuts/preflights into a `QuasarStyle` object

## Deviations found during conversion

- **md2 shape tokens**: Some md2 component files used `rounded-[4px]` while the md2 spec defines `cornerExtraSmall: '3px'`. These values come from different sources — component-level hardcoded values vs. spec tokens — and were left unchanged as behavioral-preserving.
- **Identical components**: ~22 components (QAvatar, QBtnDropdown, QChatMessage, etc.) are identical between md3 and md2. Their shared templates return the same hardcoded values without `s()` interpolation, keeping the output unchanged.

## Verification

All style specs are validated through:

- `test/style-spec.test.ts` — Type-level and structural spec validation
- `test/spec-interpolate.test.ts` — `bindSpec()` resolution correctness
- `test/spec-registry.test.ts` — Registry CRUD and error handling
- `test/md3-spec.test.ts` — MD3-specific spec coverage
- `test/md2-spec.test.ts` — MD2-specific spec coverage

All 5 test suites pass (43+ test cases across 5 test files).
