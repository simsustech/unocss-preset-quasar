# Machine Spec → StyleSpec Conversion

**Date**: 2025-07-30

## Overview

This document records the migration from machine-readable design specification files (JSON) to the TypeScript-based StyleSpec system for `unocss-preset-quasar`.

## What Changed

The style system was migrated from two parallel sources of truth:

1. **Machine specs** — raw JSON files under `/specs/` at the repo root, containing component-by-component design token values extracted from the Material Design specification.
2. **Scattered hardcoded values** — individual UnoCSS component files (`src/styles/{md3,md2}/components/*.unocss.ts`) each containing their own literal CSS values (px, colors, timing, shadows).

To a **single, authoritative StyleSpec** system:

- **`src/spec/types.ts`** — TypeScript interfaces defining the StyleSpec schema
- **`src/spec/md3.spec.ts`** — Material Design 3 spec with all token values
- **`src/spec/md2.spec.ts`** — Material Design 2 spec with all token values
- **`src/spec/unstyled.spec.ts`** — Unstyled spec (transparent/none/0 defaults)
- **`src/spec/index.ts`** — Registry and lookup helpers

## Architecture

```
StyleSpec (source of truth)
    ├── md3.spec.ts ──→ bindSpec('md3') ──→ shared component templates
    ├── md2.spec.ts ──→ bindSpec('md2') ──→ shared component templates
    └── unstyled.spec.ts ──→ bindSpec('unstyled') ──→ shared component templates
```

Each component's CSS is now defined once in `src/styles/shared/components/*.unocss.ts` using a `makeXShortcuts(s)` factory function. The `s()` resolver (from `src/styles/_spec.ts`) interpolates spec values into template strings at build time.

Each style variant (md3/md2/unstyled) binds its own spec and calls the factory:

```typescript
// src/styles/md3/components/QBtn.unocss.ts
const s = bindSpec('md3')
export const shortcuts = makeQBtnShortcuts(s)
```

## Value Extraction

All values were extracted from the code-as-is state:

- The machine specs (`/specs/*.json`) were the primary source for design token values (colors, shapes, elevations, typography, sizing).
- Where machine spec values conflicted with actual rendered CSS in the component files, the **code-as-is** values were used (per the F2 principle: code is truth).
- The `_tokens.md2.ts` and `_tokens.md3.ts` files in `src/core/` were consulted for color token references.

## Deviations from Machine Specs

| Component   | Property      | Machine Spec Value        | Code-as-Is Value         | Resolution                   |
| ----------- | ------------- | ------------------------- | ------------------------ | ---------------------------- |
| QBtn (md3)  | border-radius | 16px                      | 28px                     | Code-as-is (Quasar override) |
| QBtn (md2)  | min-width     | —                         | 64px                     | Code-as-is (Quasar default)  |
| QCard (md3) | border-radius | shape.cornerMedium (12px) | shape.cornerLarge (16px) | Code-as-is                   |
| QCard (md2) | border-radius | —                         | 4px                      | Code-as-is                   |

## Components Migrated

All **69 component templates** in `src/styles/md3/components/` and `src/styles/md2/components/` are now thin wrappers around shared templates.

The **28 component templates** in `src/styles/unstyled/components/` are also migrated (with the exception of `_reset.unocss.ts`, which is a structural preflight, not a component template).

Shared templates live in `src/styles/shared/components/*.unocss.ts` (69 files total).

## Plugins

The plugin files (`src/styles/{md3,md2}/plugins/QDialogPlugin.unocss.ts`, `QNotify.unocss.ts`) were NOT migrated as part of this conversion. They remain style-specific and may be addressed separately.

## Verification

- **5 test files** pass (43+ individual test cases covering spec resolution, interpolation, and component output)
- Build completes with 0 errors
- Behavioral preservation verified: component CSS output unchanged

## Future Considerations

- Adding a new style (e.g., a custom brand theme) requires: (1) creating a new spec file, (2) registering it in `src/spec/index.ts`, (3) calling `bindSpec('new-style')` when consuming shared templates.
- Component-specific overrides at build time can be added via `theme.quasar.components` (the existing UnoCSS override mechanism is preserved).
- The `s()` resolver handles missing paths gracefully, returning `'inherit'` for missing values.
