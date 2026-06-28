# PLAN — MD3 Polish & HMR for unocss-preset-quasar

## Goal

Polish, optimize, and complete the Material Design 3 (MD3) implementation in
`unocss-preset-quasar`, with a tight visual‑regression feedback loop using
`quasar-dev` + Playwright.

## Architecture Snapshot

- `packages/preset/` — the library (TypeScript, UnoCSS shortcuts/rules/preflights)
  - `src/index.ts` — `QuasarPreset` factory
  - `src/styles/index.ts` — exports `MaterialDesign2`, `MaterialDesign3`
  - `src/styles/md3/` — ~70 component shortcut files
  - Build is `tsc` → `dist/`
- `quasar-dev` (external at `~/Projects/quasar-dev`) — Vitrify‑based playground
  - `packages/app/vitrify.config.ts` calls `QuasarPreset` + `MaterialDesign3`
  - Vitrify supports `vitrify.dev.alias` for dev‑only path overrides

## Phase 1 — DX & HMR (High Priority) — DONE

Why: rebuilding `unocss-preset-quasar` on every CSS change kills feedback loop.

Approach:

1. Add a `source` export condition to `packages/preset/package.json` (already
   partially done — finish ./styles & ./theme).
2. Add a `vite/alias`‑style config helper inside the preset: a function
   `quasarPresetAliases()` returning alias records mapping
   `unocss-preset-quasar` and `unocss-preset-quasar/styles` to the local
   `src/` directories.
3. In `quasar-dev/packages/app/vitrify.config.ts` push these aliases into
   `vitrify.dev.alias` (only active in dev mode per vitrify behavior).
4. Verify by editing a shortcut string and observing HMR without restart.

**Status:** HMR aliases wired in commit `be4801e`. Editing a shortcut in
`packages/preset/src/styles/md3/components/QBtn.unocss.ts` triggers a
Vite reload with the new CSS without needing to restart the dev server.

## Phase 1b — Per-style shortcut scoping — DONE

Why: MD2 visual baseline was shadowed by MD3 shortcuts when both styles
were bundled into the same UnoCSS generator.

Approach: attach a `postprocess` hook in `scopeStyle()` that wraps each
non-preflight util's selector with the preset's `bodyClass` guard.
Idempotent so multiple presets' postprocessors don't double-wrap.

**Status:** merged in 2026-06-17 work session. Full visual regression
suite (333/333 across 5 spec files) confirms MD2 and MD3 styles now
coexist correctly with each applying only when the body has the
matching class.

## Phase 1c — Prop schema audit — DONE

Cross-referenced all 75 auto-generated prop schemas against Quasar's
actual prop types. 32 cases of `default: ''` on non-string props were
flagged; 9 are runtime-critical (Array/Object/Function) and already
fixed by the `boundProps` `''` → `undefined` coerce. The remaining
23 are either benign (Boolean/null union, Number/String union) or
cosmetic (schema array lags the defaults block — fix in a future
generator pass).

## Phase 2 — Playwright Visual Regression

Why: current `dump-qbtn.png`, `probe-*.png` are not descriptive enough.

Approach:

1. Restructure `quasar-dev/tests/` to use a `describe` block per component
   group with descriptive names.
2. Screenshot naming: `<component>__<prop>__<value>.png` (double underscore
   separators survive pathing).
3. Save into per‑component subfolders: `tests/screenshots/<component>/`.
4. Make a `dump-page.ts` helper that records the full DOM state and the
   rendered CSS variables — useful for diagnosis when pixels are off.
5. Add a `pnpm test:visual` script that re‑generates the gallery.

## Phase 3 — Code Refactoring & Readability (Cautious)

Why: 70 shortcut files have grown organically; some are hard to read.

Approach:

- Extract the recurring `([, c], { theme }) => theme.quasar?.components?.['x']
?? \`...\``boilerplate into a tiny`mdComponent(name, fallback)` helper.
- Replace repeated `[&_.q-icon]:(text-[1.715em])` etc. with constant
  shorthands: `--q-icon-size`.
- Replace repeated `$light-primary / $dark-on-primary` color tokens with
  the MD3 state‑layer palette variables we now expose.
- **Do not** change the compiled CSS output. Verify each refactor by
  running the visual suite before/after.

## Phase 4 — MD3 Compliance & Polishing

Why: the spec is strict on shape, elevation, state layers, and typography.

Sub‑tasks (priority order):

1. **Buttons** — filled/elevated/text/tonal/outline shapes per MD3
   - Filled: pill (`rounded-full`) + height 40px
   - Tonal: secondary container color
   - Outline: 1px outline, transparent fill
   - Text/Flat: no fill, primary color
   - State layers: hover 8%, focus 12%, pressed 12%
2. **Cards** — `filled`/`outlined`/`elevated` per MD3 elevation scheme
3. **Chips** — `assist`/`filter`/`input`/`suggestion` shapes
4. **FAB** — small/default/large sizes, surface tone, primary color
5. **Ripples** — bounded / unbounded circles
6. **Dialog/Sheet** — surface container high, scrim with 32% opacity

## Verification Strategy

- `pnpm --filter @quasar-dev/app dev` starts playground
- `pnpm test` runs Playwright — full visual regression gallery
- `pnpm --filter unocss-preset-quasar build` must succeed after every refactor
- Compare a representative set of components before/after any structural
  change to the shortcut grammar.

## Risk Register

| Risk                                                                  | Mitigation                                                                              |
| --------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| HMR aliases break production build                                    | Aliases are only applied in dev mode (per vitrify)                                      |
| Refactor changes compiled CSS                                         | Snapshot 4 components (QBtn, QCard, QInput, QDialog) before/after                       |
| UnoCSS version mismatch (`66.5.4` vs `66.7.0`) between preset and dev | Pin both to `66.7.x`; verify after install                                              |
| `tsc` build drift vs source HMR                                       | `package.json` exports `source` field already added; need to make sure consumers use it |
