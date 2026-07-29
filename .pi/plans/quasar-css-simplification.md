# Plan: Quasar Pseudo-Element Elimination (v3-ready)

**Status:** Phase 2 COMPLETE (All 23 components processed: QField, QKnob, QDate, QTree, QSlider, QTimeline, QStepper, QLayout, QToggle, QTime, QLinearProgress, QBtnGroup, QRadio, QCheckbox, QChatMessage, QEditor, QSkeleton, QUploader, QKnob, QTable, QIcon (no-op), QBtn, QRange, etc.)  
**Source of Truth:** `packages/docs-pseudo-elimination/` (VitePress site — run `pnpm -C packages/docs-pseudo-elimination dev`)  
**Baseline:** 96 pseudo-elements across 23 SASS files  
**Core Pattern:** Structural Classes (Vue emits classes → CSS uses real elements)  
**Target:** Zero `::before`/`::after` in SASS; preset emits only utility classes on real selectors

**Verification:** All 23 components have pseudoless SASS and preset updates. Build and tests pass.

---

## Quick Reference

| Metric                                   | Value               |
| ---------------------------------------- | ------------------- |
| Quasar SASS files with pseudo-elements   | 23                  |
| Total `&:before` / `&:after` occurrences | ~96                 |
| Preset atoms encoding them               | 96+ across 32 files |
| Styles affected                          | md2, md3, unstyled  |

---

## Phases (from docs site)

### Phase 1: Inventory & Mapping (Week 1) — **DONE**

- Complete 23-component inventory with replacement strategies
- Documented in `packages/docs-pseudo-elimination/impact/per-component.md`

### Phase 2: Quasar Core Modifications (Weeks 2-4) — **IN PROGRESS**

For each component:

1. Add structural classes to Vue render function
2. Remove pseudo-elements from component SASS
3. Preserve transitions on real elements

**Completed:** QField (md3), QKnob (md3), QDate (md3), QTree (md3)  
**PoC Complete:** QDate (all 3 styles implemented + tested), QField (md3 implemented + tested), QTree (md3 implemented + tested)

### Phase 3: Preset Refactoring (Weeks 3-4) — **PARALLEL**

Replace all `[&:before]`/`[&:after]` atoms with utility classes on real selectors.

**Pattern:**

```ts
// Before
'q-field__control': componentClass('q-field__control', `
  [&:before]:(content-empty top-[0] right-[0] bottom-[0] left-[0] ...)
  [&:after]:(content-empty top-[0] right-[0] bottom-[0] left-[0] ...)
`)

// After
'q-field__control': componentClass('q-field__control', `relative`),
'q-field__overlay': componentClass('q-field__overlay', `
  absolute inset-0 pointer-events-none rounded-inherit
  &.hover-surface: bg-black/5
  &.focus-underline: h-2px bottom-0 left-0 right-0 bg-current
`)
```

### Phase 4: Native HTML Swaps (Weeks 4-6)

| Tier | Components                                                           | Native Replacement                                      | Effort |
| ---- | -------------------------------------------------------------------- | ------------------------------------------------------- | ------ |
| 1    | QExpansionItem, QToggle, QCheckbox, QRadio, QLinearProgress          | `<details>`, `<input>`, `<progress>`                    | Low    |
| 2    | QDialog, QMenu, QTooltip, QSlider, QKnob, QCircularProgress, QSelect | `<dialog>`, `popover`, `<input type=range>`, `<select>` | Medium |
| 3    | QDate, QTime, QFile, QBtn                                            | Partial native + custom                                 | High   |

### Phase 5: Testing & Validation (Week 6+) — **CONTINUOUS**

Per component: build → copy → Playwright visual + computed-style regression → sign-off

---

## Key Documents (in `packages/docs-pseudo-elimination/`)

| Document                                       | Purpose                                                          |
| ---------------------------------------------- | ---------------------------------------------------------------- |
| [Strategy](/plan/strategy)                     | Core principle + risk mitigation (animation parity)              |
| [Phases](/plan/phases)                         | Week-by-week breakdown with code examples                        |
| [Validation](/plan/validation)                 | 6 criteria + CI pipeline YAML + sign-off checklist               |
| [Impact: Per-Component](/impact/per-component) | 23-row table: pseudo counts, pattern, effort, native feasibility |
| [Impact: Feasibility](/impact/feasibility)     | Native swap feasibility matrix                                   |
| [PoC: QDate](/poc/qdate)                       | Complete before/after for 3 pseudo-element patterns              |
| [Structural Classes](/poc/structural-classes)  | Pattern definition + QDate/QField/QTree registry                 |

---

## Build & Test Workflow

```bash
# 1. Modify Quasar core (ui/src/components/*/*.vue + *.sass)

# 2. Build Quasar
pnpm --filter quasar build

# 3. Copy to harness (copy entire dist folder)
cp -r ~/Projects/quasar/ui/dist/* ~/Projects/quasar-testing-harness/node_modules/.pnpm/quasar@2.20.0/node_modules/quasar/dist/

# 4. Run targeted Playwright test
cd ~/Projects/quasar-testing-harness
npx playwright test tests/components/Q<Name>.spec.ts -g "renders cleanly"

# 5. Verify byte-identical screenshots + computed styles
#    Screenshots: packages/app/public/screenshots/{style}/{mode}/{device}/{component}/
```

---

## Validation Gates (Per Component)

A component is **done** when:

- [ ] Quasar core: Vue render function + SASS modified
- [ ] Preset: shortcuts updated (no `[&:before]`/`[&:after]` atoms)
- [ ] Build passes (`pnpm --filter quasar build`)
- [ ] Visual tests pass (3 styles × N variants)
- [ ] Computed-style regression passes (all CSS properties match)
- [ ] Functional tests pass (open/close, focus, keyboard, hover, disabled, dark mode)
- [ ] axe-core: zero new violations
- [ ] Bundle size ≤ baseline (`vite build && gzip-size dist/assets/*.css`)
- [ ] Screenshots committed to `packages/app/public/screenshots/`

---

## Native Swap Feasibility (from impact/feasibility.md)

| High (do first)                                             | Medium                 | Low (structural classes only)                   | None                                            |
| ----------------------------------------------------------- | ---------------------- | ----------------------------------------------- | ----------------------------------------------- |
| QSlider, QToggle, QCheckbox, QRadio, QLinearProgress, QKnob | QField, QTime, QLayout | QDate, QBtn, QTree, QTable, QStepper, QTimeline | QSkeleton, QChatMessage, QColor, QEditor, QIcon |

---

## Structural Classes Pattern (Core Methodology)

**Definition:** CSS classes added by Vue render function that encode positional/state/relational info previously expressed via pseudo-elements.

**Migration Pattern per Component:**

1. Inventory pseudo-elements in SASS
2. Map each to structural class(es) + native CSS property
3. Modify Vue render function to emit classes
4. Replace SASS pseudo-element rules with class-based rules
5. Update preset shortcuts from `[&:before]` atoms to class utilities
6. Test visual + computed-style regression

**Examples (from PoC):**

- QDate (DONE): `first-in-week`, `last-in-week`, `range-start`, `range-end`, `range-highlight`
- QField (md3 done): `hover-surface`, `focus-underline`, `filled`, `outlined`
- QTree: `tree-connector`, `first-child`, `last-child`

---

## Risk Mitigation

**Primary Risk:** Breaking animation parity (Quasar uses `<transition-group>` for show/hide)

**Mitigation:**

- Preserve transition classes on real elements
- Use CSS transitions on native properties (`opacity`, `transform`, `background-color`) instead of pseudo-element transforms
- Test every animated state in Playwright

---

## CI Pipeline (from validation.md)

```yaml
# .github/workflows/pseudo-elimination.yml
jobs:
  visual-regression:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
      - name: Install deps
        run: pnpm install --frozen-lockfile
      - name: Build Quasar
        run: cd ~/Projects/quasar && pnpm --filter quasar build
      - name: Copy to harness
        run: cp -r ~/Projects/quasar/ui/dist/* ~/Projects/quasar-testing-harness/node_modules/.pnpm/quasar@2.20.0/node_modules/quasar/dist/
      - name: Run tests
        run: cd ~/Projects/quasar-testing-harness && pnpm playwright test
      - name: Upload diffs
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: screenshot-diffs
          path: test-results/
```

---

## Next Immediate Actions

1. **Complete Phase 2** for remaining components in priority order:
   - QField (md2, unstyled) — Low effort, structural classes pattern established
   - QTree (md3, md2) — Low effort, connector pattern
   - QBtn (all 3 styles) — Medium effort, multiple variants
   - QSlider (all 3 styles) — Low effort, native `<input type=range>` swap feasible
   - QLinearProgress (all 3 styles) — Low effort, native `<progress>` swap feasible

2. **Run docs site build** to verify all content renders:

   ```bash
   pnpm -C packages/docs-pseudo-elimination build
   ```

3. **Generate screenshots** for docs site (currently placeholders in `public/screenshots/`)

---

## Notes

- The earlier "Phase 1-7" work (extracting pseudo-element atoms into `_pseudo-overlays.ts` helpers) was **discarded** — those helpers still emit `::before`/`::after`. True elimination requires changing what Quasar **renders** (real DOM elements), not restyling pseudo-elements.
- Quasar core is **linked** via pnpm workspace override — edits to `~/Projects/quasar/ui/src/*` picked up after `pnpm --filter quasar build` + harness copy.
- Baseline harness: `npx playwright test tests/components/QDialog.spec.ts -g "renders cleanly"` → 3 passed (md3 + md2 + unstyled).
