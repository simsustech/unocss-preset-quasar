# Handoff — unocss-preset-quasar Rewrite

**Date**: 2026-09-08
**Branch**: `preset-rewrite` (orphan, clean history) at `/home/stefan/Projects/unocss-preset-quasar/.worktrees/rules`
**Harness branch**: `rules` at `/home/stefan/Projects/quasar-testing-harness`

## What was accomplished

1. **Clean slate** (Phase 0): Orphan branch created, old src/test/dev/quasar-docs removed, version bumped 0.5.5 → 0.5.5.
2. **Token system** (Phase 1): `tokens/types.ts`, `tokens/colors.ts` (MD3 color generation via `@poupe/material-color-utilities`), `tokens/preflight.ts` (CSS custom properties emitter), `tokens/index.ts` (md3Style, md2Style, builtinStyles).
3. **Foundation** (Phase 2): `rules/types.ts`, `rules/index.ts`, `styles/index.ts` (MaterialDesign3, MaterialDesign2, Unstyled, setStyle, getActiveStyle), `index.ts` (QuasarPreset factory).
4. **Package config** (Phase 3): Removed `./theme`, `./vite-aliases`, `./spec` exports.
5. **Harness cleanup** (Phase 4-6): Deleted 101 old test files, updated vitrify.config.ts, linked preset via `file:` path.
6. **Component rules** (Phase 7): 68 component rule files created using multi-selector `Rule[]` pattern. Added `safelist.ts` with all component class names.
7. **Tests** (Phase 8-9): 67 component tests + 6 style-switcher tests + 5 token tests = 78 total. All pass.

## Current state — KNOWN ISSUES

### Critical: Components render as thin lines / unstyled

**Symptom**: Navigating to `http://127.0.0.1:3002/q-btn?style=md3` shows the button as a thin line, not a properly styled Quasar button.

**Root cause analysis** (from debug output):

- The CSS rules ARE being applied (display: flex, background-color: rgb(103, 80, 164) from --q-primary)
- BUT the button appears collapsed — likely missing padding, min-height, or the text content isn't visible
- The `q-btn` element has classes: `q-btn q-btn-item non-selectable no-outline q-btn--standard q-btn--rectangle q-btn--actionable q-focusable q-hoverable`

**Likely causes**:

1. **Missing base styles**: The old Quasar CSS provided extensive base styles (padding, min-height, font-size, etc.) that my rules don't fully replicate. My rules set `var(--q-btn-*)` custom properties but the actual CSS declarations may be incomplete.
2. **CSS custom property resolution**: The `var(--q-btn-bg)` references may not be resolving correctly if the preflight isn't emitting them on the right selectors.
3. **Missing Quasar base CSS**: The old implementation included Quasar's base CSS (dist/quasar.css) which provided resets and base styles. The new implementation relies entirely on UnoCSS rules.

### What needs to be done

1. **Debug the CSS output**: Inspect the actual generated CSS for `.q-btn` to see what declarations are being applied vs. what's missing.
2. **Compare with old implementation**: Look at the old `packages/preset/src/styles/shared/components/QBtn.unocss.ts` to see what styles were previously applied.
3. **Add missing base styles**: Ensure all necessary base styles (padding, min-height, font-size, line-height, etc.) are included in the rules.
4. **Verify CSS custom property resolution**: Check that `--q-btn-*` variables are being emitted on `:root` and resolving correctly.
5. **Test all 68 components**: Currently only QBadge and QBtn have been visually verified. All components need visual verification.

## Key files

- **Preset entry**: `packages/preset/src/index.ts`
- **Token definitions**: `packages/preset/src/tokens/index.ts` (md3Style, md2Style)
- **Preflight (CSS output)**: `packages/preset/src/tokens/preflight.ts`
- **Safelist**: `packages/preset/src/safelist.ts`
- **QBtn rules**: `packages/preset/src/rules/q-btn.ts`
- **Aggregator**: `packages/preset/src/rules/index.ts`
- **Harness config**: `~/Projects/quasar-testing-harness/packages/app/vitrify.config.ts`
- **Test helpers**: `~/Projects/quasar-testing-harness/tests/helpers.ts`

## How to run

```bash
# Build the preset
cd /home/stefan/Projects/unocss-preset-quasar/.worktrees/rules
pnpm build:preset

# Refresh harness (required after every preset rebuild)
cd /home/stefan/Projects/quasar-testing-harness
pnpm install

# Run tests
pnpm test                          # full suite (78 tests)
pnpm test rewrite-comprehensive   # component tests only
pnpm test rewrite-style-switcher  # style switcher tests
pnpm test rewrite-tokens          # token emission tests

# Start dev server for visual inspection
cd packages/app && pnpm dev
# Then visit http://127.0.0.1:3000/q-btn?style=md3
```

## Deviations from plan

1. **Added `safelist.ts`** — required for UnoCSS to match runtime-added classes (not mentioned in plan)
2. **Used `Rule` not `RuleObject`** — @unocss/core@66 rename
3. **Dropped `{ name: '...' }` meta objects** — not valid RuleMeta fields
4. **Computed surfaceContainer tokens via HCT** — library doesn't expose them
5. **Batched Phase 7 into 2 commits** — vs 79 individual commits in plan

## Next steps

1. Fix the thin-line rendering issue for QBtn and all other components
2. Visually verify all 68 components using Playwright screenshots
3. Compare CSS output with old implementation to identify missing styles
4. Consider whether to include Quasar's base CSS or replicate all base styles in rules
