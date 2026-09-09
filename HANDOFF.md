# Handoff — Pseudo-element Migration Plan

**Date**: 2026-09-09
**Branch**: `preset-rewrite` at `/home/stefan/Projects/unocss-preset-quasar/.worktrees/rules`
**Plan**: `~/.pi/plans/2026-09-08-fix-pseudo-elements.md`
**Harness**: `/home/stefan/Projects/quasar-testing-harness` (branch `rules`)

## Goal

Port ALL pseudo-element styles (`:before`, `:after`) from `quasar.css` and the preflight system into the preset's rule system using the `symbols.selector` pattern. After this plan, no component should need a preflight for pseudo-element styles.

The `symbols.selector` API (in `@unocss/core@66.x`) lets a rule matcher return an object with `[symbols.selector]: sel =>`${sel}:after`` to apply declarations to a pseudo-element selector — no raw CSS strings needed.

## What was done this session

### 1. Dependency fix (BLOCKER resolved)

**Problem**: `@unocss/core` resolved to **0.51.8** (no `symbols.selector`), even though `package.json` declared `^66.10.1`. Root cause: `animated-unocss@0.0.6` (abandoned, never imported, not installed) pulled in `@unocss/preset-mini@0.51.8` → `@unocss/core@0.51.8`.

**Fix**: Removed `"animated-unocss": "^0.0.6"` from `packages/preset/package.json` dependencies. Ran `pnpm install --no-frozen-lockfile`.

**Result**: `@unocss/core` now resolves to **66.10.1** (confirmed via `require.resolve`). `symbols.selector` is available.

**Files changed**:

- `packages/preset/package.json` — removed `animated-unocss` line
- `pnpm-lock.yaml` — regenerated (animated-unocss + its 0.51.8 transitive deps removed)

### 2. Pre-flight findings (plan has gaps)

Running `/implement` against the plan surfaced these issues:

| Issue                              | Detail                                                                                                                                                                                                                                              |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rules/q-tab.ts` missing           | File doesn't exist. But investigation shows q-tab has **zero** pseudo-elements in quasar.css (the only `q-tab--inactive:before` is scoped to `.q-color-picker__header-content-dark`). Nothing to migrate. Plan step 14 is a misread.                |
| `rules/q-focus-helper.ts` missing  | File doesn't exist. q-focus-helper pseudo-elements are all scoped under `body.desktop` (desktop-only feature query) — that's a variant/media wrapper, not a pure pseudo-element. Doesn't fit `symbols.selector` cleanly. Plan step 16 is a misread. |
| `q-toggle.ts` dirty                | Has uncommitted changes from a prior attempt. Uses **raw CSS string returns** (`.q-toggle__thumb:after { ... }` as a template literal), NOT the `symbols.selector` pattern the plan requires. Step 1 is incomplete and must be redone correctly.    |
| Untracked `preflights/q-toggle.ts` | Redundant preflight created alongside the rule file. Must be deleted — the plan's whole point is "rules, not preflights".                                                                                                                           |

### 3. Current working tree state

```
 M package.json
 M packages/preset/package.json
 M packages/preset/src/rules/q-toggle.ts
 M pnpm-lock.yaml
 M pnpm-workspace.yaml
?? packages/preset/src/preflights/q-toggle.ts
```

## How to continue

### Immediate next steps

1. **Wait for `pnpm install` to finish** (was still running when this was written). Verify with `node -e "console.log(require.resolve('@unocss/core', {paths:['packages/preset']}))"` → should end in `66.10.1`.

2. **Rewrite `q-toggle.ts` correctly** (plan step 1, the reference implementation):
   - Use `import { symbols } from 'unocss'`
   - For `q-toggle__thumb:after` (the thumb circle with box-shadow), return an object with `[symbols.selector]: sel =>`${sel}:after`` alongside the declaration properties
   - For `q-toggle__thumb:before` (empty, z-index layering), same pattern
   - For `q-toggle__inner--truthy .q-toggle__thumb:after` (background currentColor), use `[symbols.selector]` on the deepest class match
   - Return arrays of declaration objects where a base class has multiple pseudo-elements
   - **Delete `preflights/q-toggle.ts`** when the rule is correct

3. **Decide on q-tab and q-focus-helper** (plan steps 14 and 16):
   - **q-tab**: no pseudo-elements exist. Either skip step 14 entirely, or create `rules/q-tab.ts` with base styles only (no pseudo-elements) if the goal is "rules not preflights" generally.
   - **q-focus-helper**: pseudo-elements are `body.desktop`-scoped. Either handle via a variant (not `symbols.selector`), or leave in preflight. Recommend: leave in preflight, skip step 16.

4. **Continue with steps 2–13, 15, 17–20** per the plan's `(f)` entries. Each step:
   - Add `[symbols.selector]` entries to the relevant rule file
   - Extract pseudo-element declarations from `quasar.css` (source of truth at `node_modules/.pnpm/quasar@2.31.0/node_modules/quasar/dist/quasar.css`)
   - Run `(d2)`: `pnpm --filter unocss-preset-quasar test` + `cd ~/Projects/quasar-testing-harness && pnpm test`

5. **Step 21**: Create `tests/pseudo-elements.spec.ts` E2E spec for q-btn, q-toggle, q-checkbox, q-radio using `getComputedStyle(el, ':after')`.

### Pattern reference (from plan section b)

```ts
import { symbols } from 'unocss'

// Single pseudo-element
;[
  /^q-toggle__thumb$/,
  () => ({
    [symbols.selector]: (sel) => `${sel}:after`,
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: '50%',
    background: '#fff',
    boxShadow: '0 3px 1px -2px rgba(0, 0, 0, 0.2), ...'
  })
][
  // Multiple pseudo-elements on same base class — return array
  (/^q-btn$/,
  () => [
    {/* base styles */},
    {
      [symbols.selector]: (sel) => `${sel}:before`,
      content: '""',
      position: 'absolute',
      inset: 0,
      borderRadius: 'inherit',
      boxShadow: 'var(--q-elevation-1)'
    }
  ])
][
  // Variant class with pseudo-element
  (/^q-btn--standard$/,
  () => [
    { background: 'var(--q-btn-bg)', color: 'var(--q-btn-color)' },
    {
      [symbols.selector]: (sel) => `${sel}:before`,
      transition: 'box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.5, 1)'
    }
  ])
]
```

## Key files

| File                                             | Role                                                             |
| ------------------------------------------------ | ---------------------------------------------------------------- |
| `packages/preset/src/rules/q-toggle.ts`          | Step 1 reference implementation (currently dirty, needs rewrite) |
| `packages/preset/src/rules/q-btn.ts`             | Step 2 — most complex, many variant pseudo-elements              |
| `packages/preset/src/rules/index.ts`             | Rule aggregator (all rule files exported here)                   |
| `packages/preset/src/safelist.ts`                | Component class safelist                                         |
| `packages/preset/src/preflights/components/*.ts` | Existing preflights (pseudo-elements migrate OUT of these)       |
| `packages/preset/src/preflights/q-toggle.ts`     | **DELETE** — redundant with q-toggle rule                        |
| `quasar.css`                                     | Source of truth for pseudo-element declarations                  |

## How to run

```bash
# Build the preset
cd /home/stefan/Projects/unocss-preset-quasar/.worktrees/rules
pnpm build:preset

# Refresh harness (required after every preset rebuild)
cd /home/stefan/Projects/quasar-testing-harness
pnpm install

# Run unit tests
pnpm --filter unocss-preset-quasar test

# Run E2E tests
cd ~/Projects/quasar-testing-harness && pnpm test

# Start dev server for visual inspection
cd packages/app && pnpm dev
# Then visit http://127.0.0.1:3000/q-btn?style=md3
```

## Deviations from plan

1. **Removed `animated-unocss` dep** — it was the root cause of `@unocss/core@0.51.8` resolution, blocking `symbols.selector`. Not in plan but required.
2. **q-tab.ts and q-focus-helper.ts don't exist as rule files** — plan assumes they do. Investigation shows neither has migratable pseudo-elements in the `symbols.selector` pattern. Steps 14 and 16 need re-scoping or skipping.
3. **q-toggle.ts dirty state** — prior attempt used raw CSS strings, not `symbols.selector`. Must be rewritten to match plan's `(f)` entry.

## Open questions for next session

1. q-tab: skip (no pseudo-elements) or create base-only rule file?
2. q-focus-helper: leave in preflight (body.desktop variant doesn't fit pattern) or handle via variant API?
3. Commit policy: commit the dep fix + lockfile regeneration separately before starting the pseudo-element steps?
