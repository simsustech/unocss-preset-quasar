# Handoff: `unocss-preset-quasar` parity port — step 7 done, steps 8/9/10 open

Branch: `preset-rewrite`
Worktree: `/home/stefan/Projects/unocss-preset-quasar/.worktrees/rules`
Plan: `/home/stefan/.pi/plans/2026-09-21-new-preset-looks.md`
Evaluation: `/home/stefan/.pi/plans/2026-09-21-new-preset-looks.evaluation.md`
Related: `~/Projects/petboarding` (consumer), `~/Projects/quasar-testing-harness` (verification surface)

**Working tree is clean; everything below is committed.**

---

## 0. Read this first: `dist` goes stale and nothing warns you

`packages/preset/dist` is `tsc` output and is **gitignored**
(`.gitignore: /packages/**/dist`), so `git status` never shows it.

- The parity gate measures **`src`** (it runs through vitest).
- **Every consumer measures `dist`** (`exports.import: ./dist/index.js`) —
  the harness _and_ petboarding, both linked to this worktree via `file:`.

So a session can drive 44 source files past the gate while both the harness and
petboarding still render the last build. That is exactly what happened here: the
harness run found no regressions, but chip/editor/carousel geometry was 8–30
minutes behind the source (`chip` height 36px vs the reference's 32px, `editor`
radius 8px vs 4px, `carousel` height 669px vs 400px). After `pnpm build` all
three matched.

**Run `pnpm build` in `packages/preset` before any browser or harness check.**
A staleness sweep is one line each way:

```sh
cd packages/preset
for f in $(find src -name '*.ts'); do d="dist/${f#src/}.js"; \
  { [ -f "$d" ] && [ "$f" -nt "$d" ]; } && echo "STALE: $f"; done
```

(`find src -newer dist/index.mjs` looks like it works and does not: the file is
`dist/index.js`, so `find` matches nothing and the empty output reads as
"fresh".)

---

## 1. Where the port stands

| Fact                                      | Value                                                                                |
| ----------------------------------------- | ------------------------------------------------------------------------------------ |
| Reference bundle                          | vendored, sha256 `4a01f0ffbc51075f…` pinned in `specs/reference/raw/MANIFEST.sha256` |
| Fixture                                   | 2,441 rules + 110 keyframes + 170 vars                                               |
| Selectors fully matching                  | **2,214 / 2,441 (90.7 %)**                                                           |
| Remaining gaps                            | missing **227**, absent **40**, mismatch **10** (all three `reported` modules)       |
| Modules at target 0                       | **every `preset` module** — steps 7, 8 and 9 are done                                |
| Payload                                   | 261,623 B emitted vs 314,650 B reference (limit = ref × 1.1)                         |
| `pnpm vitest run`                         | 30 files / **179 tests passing**                                                     |
| `tsc --noEmit`, `oxlint`, `oxfmt --check` | clean                                                                                |
| harness suite                             | 306 passed / **16 failed — all 16 harness-side (see §2)**                            |

### Modules still carrying gaps

| Module            | missing | absent | mismatch | scope    | step  |
| ----------------- | ------- | ------ | -------- | -------- | ----- |
| `color-utilities` | 34      | 0      | 0        | preset   | 8     |
| `tokens`          | 3       | 0      | 0        | preset   | 8     |
| `keyframes`       | 110     | 0      | 0        | preset   | 9     |
| `animated`        | 98      | 0      | 0        | preset   | 9     |
| `icons`           | 123     | 0      | 0        | reported | never |
| `resets`          | 51      | 20     | 1        | reported | never |
| `utilities`       | 34      | 20     | 9        | reported | never |

`table`, `stepper`, `tree`, `dialog` and `uploader` — the five step-7 modules —
are all at 0/0/0.

### Commits, newest first

| Commit    | Contents                                                                                          | Targets |
| --------- | ------------------------------------------------------------------------------------------------- | ------- |
| `70c47c4` | `uploader` — 320px card, list box, per-file bordered rows, dnd outline, `--bordered`/`--dark`     | 41      |
| `8a16869` | `dialog` — inner content box, backdrop, edge variants, new `dialogMediaCss` + `dialogPlatformCss` | 39      |
| `e3cc68e` | `tree` — connectors, disabled subtree, dense, rtl, arrow                                          | 51      |
| `a1a0c76` | `stepper` — dot/tab/title, `--vertical`/`--horizontal`/`--dense`/`--dark`                         | 51      |
| `461ae96` | `table` — base + cells, separators, dense, grid, dark                                             | 98      |
| `df8dff0` | the previous handoff                                                                              | —       |
| `8758f98` | `btn` (previous session)                                                                          | 101     |

---

## 2. The harness run, and its 16 failures

```
cd ~/Projects/quasar-testing-harness
TEST_SERVER_PORT=3100 \
TEST_BASE_URL=http://127.0.0.1:3100 \
TEST_SERVER_CMD='pnpm --filter @quasar-testing-harness/app exec vitrify dev --port 3100 --host 127.0.0.1' \
  pnpm exec playwright test tests/ --reporter=list --output=/tmp/pw-results
```

**Use port 3100, not 3000** — :3000 is petboarding's dev server and
`reuseExistingServer: true` would silently drive the wrong app.

**All 16 failures are harness-side.** Four causes, none of them the preset:

`TEST_BASE_URL` — every URL in them is built by hand from that constant —
so they drive whatever is listening on :3000 and get
`ERR_EMPTY_RESPONSE`. Fix by making those specs honour `baseURL` (or the
`TEST_BASE_URL` the config already supports). 2. **1 failure** — `rewrite-style-switcher.spec.ts:25` expects `.q-badge`
`font-size: 12px`. The reference **and** the pre-rewrite preset both say
`11px`; the browser renders `11px`. 3. **1 failure** — `plugin-components.spec.ts:173` expects
`.q-notification__badge` `padding: '4px 8px'`. The reference declares
**longhands** (`padding-inline: 8px; padding-block: 4px`), so the shorthand
key is undefined for any faithful port. Assert the longhands. 4. **1 failure** — `rewrite-style-switcher.spec.ts:99` expects the md3 button to
be _wider_ than md2. The reference declares
`.q-btn { min-width: var(--q-btn-min-width) }`, and the style entries carry
`md3: auto` + `padding-inline: 24px` vs `md2: 64px` + `16px`. An **empty**
button is therefore floored at 64px in md2 (64px rendered) and collapses to
its padding in md3 (48px). The padding premise holds; the width premise does
not. Compare a button with a label, or assert `padding-inline`.

Caveat that matters: the first harness run of this session ran against a
**stale `dist`**, so causes 3 and 4 only appeared once `pnpm build` was current.
Green here is a smoke signal, not visual parity — 124 of
`rewrite-comprehensive.spec.ts`'s assertions are `toBeDefined()`.

---

## 3. Two gate blind spots (both found the hard way)

The gate iterates the **reference's** declarations only:

```js
for (const [property, value] of effective) {        // reference declarations
  if (property.startsWith('--')) continue
  const ourValue = ours.get(property)
  if (ourValue === undefined) { entry.absent.push(label); continue }
  ...
}
// properties WE emit that the reference does not declare: never compared
```

1. **Extra declarations we emit are invisible.** Nothing compares them; they
   only appear in the selector-level `extra` count (517), which never fails.
   `.q-badge` carried `min-height: 20px` from the design rule next to the parity
   rule's `height: 16px`; `min-height` wins, the badge rendered 20px instead of
   16px, and the gate reported the module clean. **When porting a module, check
   what it already emits for that selector** — `mergeDuplicateRules` keeps every
   duplicate's declarations, so a stale `min-height` / `padding` shorthand /
   `display` survives next to the reference's value and can win.
2. **A reference value that still contains `var()` is skipped**, so our value for
   that property is unverified. `.q-chip` `border-radius: var(--shape-corner-small)`
   passed while rendering `0px`, because nothing defines that name (point 4 below).

Closing either blind spot is a gate change; the plan's step 10 is the place for
it, and the handoff's own rule applies: extend the gate and record it, or fix
the module — not both.

### 3.1 The extras are unverified output (measured, not hypothetical)

The `extra` count is now **877 selectors** — output we emit that the reference
does not. Nothing compares them, and they can paint where the reference is
silent. `.q-skeleton` is the clearest case: the reference bundle styles it _not
at all_ (its only mention of the class is inside a `body.quasar-style-unstyled`
group), yet the port emits eight rules for it — a background, a radius, a
`q-skeleton-blink` animation and `--dark`/`--anim`/`--text` variants. The
`skeleton` module therefore reads as complete while rendering something the
reference does not.

One of those rules also names a keyframe that does not exist: `.q-skeleton--anim`
animates `q-skeleton-blink`, which is not one of the reference's 110 keyframes
and not ours either, so that animation never runs. The variant rules are fine —
they use `q-skeleton--fade`/`--wave`/`--pulse`, which we now emit.

Not bugs, despite appearing in the sweep of §4:

- **`--q-skeleton-speed` and `--q-linear-progress-speed` are supplied inline by
  Quasar's runtime.** QDrawer, QSkeleton and QLinearProgress are the only
  components that set custom properties from JavaScript — exactly three:

  ```sh
  grep -o '"--q-[a-z0-9-]*"\s*:' node_modules/quasar/dist/quasar.client.js | sort -u
  # "--q-drawer-width": "--q-linear-progress-speed": "--q-skeleton-speed":
  ```

  Our CSS reads the latter two and they resolve on a real element
  (`--q-skeleton-speed: 1500ms`, `transition: transform 2.1s`). **The sweep in
  §4 will always list these three** — the definition is inline, not in the
  sheet, so judge them by the rendered element, not by the CSSOM walk.

- **`--q-fab-stagger`** is referenced by Quasar's own CSS without being defined
  there either (`transition-delay: calc(var(--q-fab-stagger) * …)`); it is an
  app-provided styling hook, so a dropped declaration matches Quasar.
- **`--q-elevation-*`** is ours and parity-neutral (see §4b).

### 3.2 The one that was a real bug: `--q-drawer-width`

`.q-drawer` declared no `width` at all. The port's comment said the rewrite had
"pinned `width: 300px`, which overrode the width Quasar sets inline from the
drawer's `width` prop" — but QDrawer sets no inline width. It writes
`--q-drawer-width` as a custom property, and **quasar.css is what binds it**:

```css
.q-drawer { position: absolute; top: 0; bottom: 0; width: var(--q-drawer-width); … }
```

Since the preset replaces quasar.css, it has to make that binding too, or the
drawer collapses to its content width whatever `width` was passed. Fixed by
stating `width: var(--q-drawer-width)` on `.q-drawer`; verified in the harness
with the inline `--q-drawer-width: 300px` producing a 300px computed width.

The generalizable check, worth running after any component port: for every
custom property Quasar's JS sets (the three above), confirm **some rule in our
sheet reads it**. A property that is set and never read is a binding the preset
failed to reproduce.

Worth doing before step 10 claims the port is faithful: walk the extras
group-by-group and decide, per selector, whether it is a deliberate extension or
something copied from an older Quasar. The gate cannot help here — it is the one
question it does not ask.

---

## 4. The colour/geometry layer that step 8 is about

`packages/preset/src` emits **`var()` references that nothing defines**. A
declaration whose `var()` is undefined is invalid and **dropped**, so the
property vanishes rather than falling back:

```
.q-chip   background rgba(0,0,0,0)   border-radius 0px   <- --light-surface-container-low,
                                                             --shape-corner-small undefined
.q-card   box-shadow none                                 <- --q-elevation-1 undefined
.q-header box-shadow none, background transparent         <- --q-elevation-2 undefined
```

Measured: 60 unresolved `var()` references. Two groups:

- **Reference token names the port transcribes literally**: `--light-*` (19
  uses), `--shape-corner-*` (8), `--q-elevation-*` (8), `--spacing` (34). The
  `--q-*` equivalents exist and resolve (`--q-corner-small`, `--q-radius-*`,
  `--q-surface`, `--q-primary`, …). Note `--dark-surface` is not defined —
  `--q-dark` carries the dark surface role (`src/theme/preflight.ts`); and
  `--shape-corner-*` / `--light-*` are **what step 8 emits**, which is why some
  modules reference them deliberately.
- **wind4 theme variables**: `--colors-*`, `--spacing`, `--radius-*`, `--font`,
  `--leading-none`. `main` fed the Quasar palette into wind4's theme through
  `extendTheme`; the rewrite dropped it (`git show main:packages/preset/src/index.ts`
  around line 141), so the colour utilities and the theme scale never generate.

`--un-*` (wind4's own runtime variables) are **not** in this group: wind4
registers them via `@property`, and an `@property` rule has no `selectorText`,
so a naive scan reports them as undefined. `--un-content` is declared inline
(`--un-content:''; content:var(--un-content)`) by the bundle. Do not "fix"
those.

---

## 5. Standing traps

## 4b. Open: wind4's runtime-variable and theme-namespace layer is missing

Step 8 closed the token/role/palette class: `--light-*`, `--dark-*`,
`--shape-corner-*` and `--colors-*` are now defined, and unresolved `var()`
references fell from ~60 to 40. **All 40 that remain are wind4's own names**, and
they are missing in a real app build, not just in the gate's safelist-only sheet
(measured on the harness):

```
--spacing  --radius-none  --radius-2xl  --fontWeight-{normal,medium,light,bold}
--leading-{none,normal}  --tracking-{normal,widest}
--un-outline-style  --un-outline-opacity  --un-content  --un-translate-x/y
--un-shadow  --un-inset-shadow  --un-inset-ring-shadow  --un-ring-{offset-,}shadow
--un-contain-{size,layout,paint,style}  --un-border-left-opacity
```

Two symptoms, one likely cause:

- The sheet carries only **3 `@property` registrations**, where wind4 registers
  its `--un-*` runtime variables that way. An unregistered `var()` makes the
  declaration invalid, so every rule copied from the reference that uses one
  **drops**: the shadow chain on `.q-card` (and `dialog`'s), `.q-stepper__line`'s
  `contain`, `.q-color-picker__alpha .q-slider__track::before`'s `content`,
  `.q-uploader__dnd`'s outline — the same failure mode as §4.
- wind4's theme namespaces (`--spacing`, `--fontWeight-*`, `--leading-*`,
  `--tracking-*`, `--radius-*`) are absent, and **our own rules reference them**:
  `.q-table th { font-weight: var(--fontWeight-medium) }`, the gutter rules
  (`calc(var(--spacing) * N)`), `.q-badge`'s `--leading-none`.

`main` wired these explicitly and the rewrite did not:

```sh
git show main:packages/preset/src/index.ts | grep -n 'postprocess\|variants:\|layers\|extractors'
#  136:      variants: rawStyle.variants,
#  138:      postprocess: rawStyle.postprocess ? rawStyle.postprocess.concat(fixBemVarMangling) : [fixBemVarMangling],
#  157:      layers,
#  158:      extractors: [            <- the Quasar class extractor (q-*, Q*, color="…", i-mdi-*)
```

The rewrite's `src/index.ts` has none of the four: it nests `presetWind4()` in
`presets` instead, which brings wind4's own variants and postprocess along but
not the custom `extractors` or `layers`. Worth checking whether re-adding the
extractor alone restores the namespaces (more classes extracted → more utilities
→ their variables and `@property` registrations get emitted) before wiring
wind4's postprocess by hand. Whatever the fix, verify it the §6 way: count
`@property` rules and the unresolved-`var()` set on a real page, not in the gate.

Note `--q-elevation-*` / `--q-elevation-level*` are also in that list of 40 and
are **our own invention** (nothing in the reference defines them; the reference's
`.q-card` uses wind4's shadow chain, which resolves to no shadow there too). They
are deliberately left undefined — the rendered result already matches. If a
future step wants real elevation, it has to come from the reference's literals,
not from a token nobody defines.

Carried over, plus what this session added:

- **Selector spacing is part of the key.** `normSel` collapses whitespace runs
  but never inserts or removes a space around a combinator. The bundle writes
  `.q-tree__node--child> .q-tree__node-header` and
  `.q-dialog__inner>div`; a port that writes `>` keys to a _different_
  selector, so the rule counts as missing while looking present in the source.
  Transcribe the reference's spacing exactly (it is valid CSS either way).
- **Shorthands hide longhand keys.** The gate looks up longhand names, so
  `padding: 4px 8px` leaves `padding-inline` / `padding-block` absent, and
  `border-left: 1px solid currentColor` leaves `border-left-color` absent. State
  the longhands the reference states; keep width/style as extras where the
  reference's own rule has lost them to minification (tree's connectors).
- **A missing comma or a clipped brace deletes a module or breaks the transform
  without failing anything downstream.** `tsc --noEmit` _before_ the gate, after
  every block. A broken transform makes the gate re-print its previous report,
  which looks like slow progress rather than a syntax error.
- **`margin-bottom: x` is not a valid JS object key** — hyphenated CSS
  properties must be quoted in rule bodies, or `tsc` fails with `TS1005`.
- **Rules cannot carry at-rules.** Media families are CSS text assembled in
  `src/index.ts`: `responsiveVisibilityCss`, `platformMediaCss`,
  `layoutMediaCss`, `tooltipMediaCss`, `notificationMediaCss`, and now
  `dialogMediaCss` + `dialogPlatformCss`. A `*MediaCss` export is **inert**
  unless `src/index.ts` imports it — `pickRules` only collects keys ending in
  `Rules`.
- **Never write a rule whose regex overlaps an earlier rule's token.** A rule
  matching `.q-field ::-ms-clear|^q-field$` silently killed all `/^q-field$/`
  output.
- **Module names ≠ directories.** `tab` → `components/tabs/`, `spacing` →
  `core/spacing/`, `color-picker` → `components/color/`, `dialog` owns
  `q-bottom-sheet`, `panel-parent` had no directory at all. `ls` first.
- **Quasar's proof points are runtime classes.** If a class never appears in the
  scanned source it reaches the sheet only through `src/safelist.ts`.
- **Prefer editing an existing body over appending an override.** UnoCSS
  re-orders emitted blocks, so a later-appended block is not guaranteed to win.
- **Minifier artifacts are part of the reference.** Inert selectors
  (`.q-btn-group--spread__>`, `.q-editor .q btn`) and inert values
  (`.q-uploader__file--img`'s `color-mix(in oklab, 50% 50% …)`,
  `.q-uploader__dnd`'s `outline-color` that swallowed `outline: 1px dashed
currentColor`) are emitted verbatim: rendering then matches the reference byte
  for byte. Where the reference's _documented_ behaviour needs the width/style
  back, state it as an extra.

---

## 6. The loop, per module

```sh
cd packages/preset
node /tmp/refdump.mjs <module>       # gaps + the reference declarations of their selectors
# edit src/components/<module>/rules.ts
npx tsc --noEmit                     # FIRST — see the trap above
node scripts/parity-report.mjs       # gate; --module <name> for detail, PARITY_DEBUG=1 for resolved values
pnpm vitest run                      # cumulative
node scripts/parity-report.mjs --update --set-target <module>
pnpm exec oxfmt --write src
pnpm build                           # dist, or no browser check means anything
git add -A && git commit -F <message-file>   # staging is required; -F alone commits nothing
```

`/tmp/refdump.mjs` and `/tmp/refsel.mjs` are reproduced in §8.

### Checking what a module actually renders

Managing the harness dev server by hand is racy (vitrify's WebSocket port
24680 collides; `pkill -f 'vitrify dev'` matches your own command line and kills
the shell). Let Playwright own the server: drop a temporary spec in
`packages/…/tests/`, run it with the env from §2, read the values off
`console.log`, then delete it.

```ts
// tests/zz-tmp-probe.spec.ts  — delete after use
import { test, expect } from '@playwright/test'
test('table matches the reference', async ({ page }) => {
  await page.goto('/q-table?style=md3', { waitUntil: 'networkidle' })
  const out = await page.evaluate(() => {
    const root = document.querySelector('[data-testid="component-preview"]')!
    const t = root.querySelector('.q-table') as HTMLElement
    return { display: getComputedStyle(t).display }
  })
  console.log('TABLE', JSON.stringify(out))
  expect(out.display).toBe('table') // the port had `display: flex` on a <table>
})
```

Two things that makes easy:

- **Chrome re-serialises selectors.** `a>div` reads back as `a > div`, so a
  probe that string-compares selector text will "miss" rules that are present
  (the gate parses our raw text, so it does not have this problem).
- **`getComputedStyle` includes the harness's own props.** An inline
  `font-size: 56px` from `QAvatar`'s `size`, or `?dark=true`, can be the value
  you are looking at — check `el.getAttribute('style')` and the matched rules
  before blaming the preset. Overlays (`q-dialog`, `q-menu`, `q-tooltip`) are not
  in the DOM until opened; assert on the emitted sheet instead.

---

## 7. Committing

The pre-commit hook runs `oxlint` + `oxfmt --check` over 407 files; format first
with `pnpm exec oxfmt --write <files>`, and never `--no-verify`. Bodies ≤ 100
chars per line, `git commit -F <file>` — **after `git add`**, or nothing is
committed. The repo `README.md` says to use `oxfmt`, not prettier.

---

## 8. Helper scripts (recreate if `/tmp` was wiped)

Both import the report's own normalisation so they key selectors exactly as the
gate does. Replace `<WORKTREE>` with
`/home/stefan/Projects/unocss-preset-quasar/.worktrees/rules`.

### `/tmp/refdump.mjs <module>`

```js
#!/usr/bin/env node
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  normSel,
  ruleKey,
  containerKey
} from '<WORKTREE>/packages/preset/scripts/parity-report.mjs'

const PKG = '<WORKTREE>/packages/preset'
const report = JSON.parse(
  readFileSync(join(PKG, 'test/parity-report.json'), 'utf8')
)
const fixture = JSON.parse(
  readFileSync(join(PKG, 'test/fixtures/reference-selectors.json'), 'utf8')
)
const [moduleName] = process.argv.slice(2)

if (!moduleName) {
  for (const [n, m] of Object.entries(report.modules)) {
    const count = m.missing.length + m.absent.length + m.mismatch.length
    if (count) console.log(`  ${n} (${m.scope}) ${count}`)
  }
  process.exit(0)
}

const entry = report.modules[moduleName]
if (!entry) {
  console.error(`no module ${moduleName}`)
  process.exit(1)
}

const byKey = new Map()
for (const rule of fixture.rules) {
  const key = ruleKey(rule.media, rule.selector)
  if (!byKey.has(key)) byKey.set(key, [])
  byKey.get(key).push(rule)
}

const wanted = new Set()
for (const s of entry.missing) wanted.add(s.replace(/ \(in .*\)$/, ''))
for (const s of entry.absent) wanted.add(s.split('|')[0])
for (const s of entry.mismatch) wanted.add(s.split('|')[0])

console.log(`=== ${moduleName} (${entry.scope}) ===`)
console.log(
  `missing ${entry.missing.length}  absent ${entry.absent.length}  mismatch ${entry.mismatch.length}\n`
)

for (const sel of [...wanted].sort()) {
  const hits = byKey.get(`\u0000${normSel(sel)}`) ?? byKey.get(`\u0000${sel}`)
  if (!hits) {
    console.log(`--- ${sel}  [ NO FIXTURE ENTRY ]`)
    continue
  }
  console.log(`--- ${sel}`)
  for (const rule of hits) {
    const c = containerKey(rule.media)
    const eff = new Map()
    for (const d of rule.declarations) eff.set(d.property, d.value)
    const decls = [...eff].filter(([p]) => !p.startsWith('--'))
    if (c) console.log(`    @container ${c}`)
    console.log(`    { ${decls.map(([p, v]) => `'${p}': '${v}'`).join(', ')} }`)
  }
  console.log()
}
```

### `/tmp/refsel.mjs '.q-menu' '.q-tooltip'`

```js
#!/usr/bin/env node
import { readFileSync } from 'node:fs'
import { normSel } from '<WORKTREE>/packages/preset/scripts/parity-report.mjs'

const PKG = '<WORKTREE>/packages/preset'
const fixture = JSON.parse(
  readFileSync(`${PKG}/test/fixtures/reference-selectors.json`, 'utf8')
)
for (const w of process.argv.slice(2)) {
  const hits = fixture.rules.filter((r) => normSel(r.selector) === normSel(w))
  console.log(`--- ${w} (${hits.length})`)
  for (const r of hits) {
    const eff = new Map()
    for (const d of r.declarations) eff.set(d.property, d.value)
    console.log(
      `  ${r.media ?? '(no container)'}  { ${[...eff]
        .filter(([p]) => !p.startsWith('--'))
        .map(([p, v]) => `${p}: ${v}`)
        .join('; ')} }`
    )
  }
}
```

### Unresolved-`var()` sweep

Reports the `var()` names our output uses that nothing defines — the §4 class.
Run it from a temporary spec (§6) on a component page; it needs the CSSOM.

```js
const rules = new Set(),
  props = new Set(),
  atProperty = new Set(),
  used = new Map()
const walk = (list) => {
  for (const r of list) {
    const t = r.constructor.name
    if (t === 'CSSPropertyRule') {
      atProperty.add(r.name)
      continue
    }
    if (r.cssRules && t !== 'CSSStyleRule') {
      walk(r.cssRules)
      continue
    }
    if (!r.selectorText) continue
    for (let i = 0; i < r.style.length; i++)
      if (r.style[i].startsWith('--')) props.add(r.style[i])
    for (const m of r.style.cssText.matchAll(/var\((--[a-z0-9-]+)/g))
      if (!used.has(m[1])) used.set(m[1], r.selectorText.slice(0, 50))
  }
}
for (const s of document.styleSheets) {
  let l
  try {
    l = Array.from(s.cssRules)
  } catch {
    continue
  }
  walk(l)
}
const el =
  document.querySelector('[data-testid="component-preview"] *') ?? document.body
const cs = getComputedStyle(el)
const onEl = []
for (let i = 0; i < cs.length; i++) if (cs[i].startsWith('--')) onEl.push(cs[i])
const unresolved = [...used].filter(
  ([n]) => !props.has(n) && !atProperty.has(n) && !onEl.includes(n)
)
console.log(unresolved.map(([n, w]) => `${n}  (used by ${w})`).join('\n'))
```

---

## 8b. Spec adherence, checked without the reference

The reference bundle is one third-party build, and it carries its own quirks:
its `.q-separator` is a `rgba(0,0,0,0.12)` literal where the md3 spec says
`outline-variant`, and its `.q-item` is `min-height: 28px` where the spec says a
56px one-line container. So parity with it is not conformance. The specs are
machine-readable and self-describing — `specs/reference/normalized/
{md3,md2}-{switches,lists,dividers}.json`, distilled from the Flutter and
Compose sources in `specs/reference/raw/` — and each entry names **both** the
number and the role token, which is what makes them checkable:

```
chassis/track_width_px                 52          track/selected_color_token   md.sys.color.primary
handle/unselected_width_px             16          handle/selected_color_token  md.sys.color.on-primary
divider/color_token  md.sys.color.outline-variant
item/selected_container_color_token  md.sys.color.secondary-container
```

Compare three things per component: px values, which role token a colour
resolves to, and which style entry the spec addresses. `test/*-spec.test.ts`
(`buttons-spec`, `card-spec`) already encode some of this for the buttons and
cards; the normalized JSONs cover switches, lists and dividers; the
`SPEC_VERIFICATION_REPORT.md` table covers the components the pre-rewrite preset
was verified against (`QBtn`, `QToggle`, `QCheckbox`, `QChip`, `QCard`,
`QField`), and is worth re-running against the rewrite because several of its
rows are exactly the classes this rewrite moved.

**First pass — deviations found in the rewrite (3 components the specs cover):**

| Where                             | Spec                            | Ours                       | Also the reference?               |
| --------------------------------- | ------------------------------- | -------------------------- | --------------------------------- |
| `.q-toggle__track` fill (md3)     | `surface-container-highest`     | `--q-surface-container`    | yes, same                         |
| selected `.q-toggle__thumb` (md3) | `on-primary`                    | `--q-on-primary-container` | yes, same                         |
| `.q-item` one-line height (md3)   | 56px (72/88 for two/three-line) | `min-height: 28px`         | yes, same                         |
| `.q-item--active` fill (md3)      | `secondary-container`           | `--q-primary-container`    | reference has no such rule — ours |
| `.q-item--active` text (md3)      | `on-secondary-container`        | `--q-on-primary-container` | ours                              |
| `.q-separator` (md3)              | `outline-variant`               | `--q-outline-variant` ✓    | reference is a `rgba` literal     |

Conforming as far as checked: the md3 switch chassis (52×32px via
`1.625em`/`1em` at font-size 32px), thumb 16×16/24×24 (`0.5em`/`0.75em`), track
outline 2px in `outline`, and the divider's 1px `outline-variant`.

Still to check: every component the specs do not ship a normalized file for —
the sources are vendored per component (`flutter/`, `compose-material3/`), so
extending coverage means extracting more of them the same way, and then the
px/role comparison above scales to the whole library. Do this _after_ the
extras audit in §3.1, since it is the only check that can tell a deliberate
extension from a wrong one.

**Steps 8 and 9 are done.** Step 8 (`23bf7bb`) emitted the scheme roles
(`--light-*` / `--dark-*`), the `--shape-corner-*` roles, the
`body.body--dark.quasar-style-<name>` combination and re-added `extendTheme`,
closing `color-utilities` (34) and `tokens` (3); `--light-primary` is `#6750a4`
and `--dark-primary` `#cfbcff`, the reference's own values, where both were
undefined before. Step 9 (`bdea83f`) emitted Quasar's 12 `q-*` `@keyframes` and
put `animated-unocss@^0.0.6` back in `presets`, closing `keyframes` (110) and
`animated` (98); the sheet now carries exactly the reference's 110 keyframes.

The remaining `preset` gaps are zero; what is left is step 10, the two open
findings (§4b wind4's runtime-variable layer, and the extras audit below), and
the harness-spec fixes in §2.

**Step 10 (close out)** — tighten the ratchet to zero where the plan says so,
`test/token-trace.test.ts`, docs (repo-root `README.md`,
`packages/docs/guide/development.md`, `packages/docs/api/*`), `CONTEXT.md` + the
two ADRs, a minor changeset, the full harness run, and the evaluation.

Worth doing alongside, in rough priority order:

1. **Sweep the ported modules for §3.1 conflicts** — a stale `min-height` /
   `padding` / `display` sitting next to a reference declaration for the same
   selector. `.q-badge`'s `min-height: 20px` is one instance and it changes the
   rendered height. A per-selector diff of our declarations against the
   reference's, restricted to box-affecting properties, would find the rest.
2. **Fix the two spec files that hardcode :3000** (`dark-screenshots`,
   `harness-screenshot`) so the suite stops reporting 13 phantom failures, and
   correct the three wrong expectations in §2 (causes 2–4).
3. **`pnpm build`** before every consumer-facing check (§0).

## 8c. The literal duplicate blocks, and the spec pass they blocked

`mergeDuplicateRules` collapses repeated matchers because UnoCSS keeps only the
last rule registered for a regex. The rewrite nonetheless left a _second_,
literal copy of many components — a "reference parity" block re-declaring the
same selectors with hardcoded values. **29 rules files carry 268 duplicated
matchers:**

```
44 dup / 101 matchers  src/components/time/rules.ts
43 dup /  83 matchers  src/components/field/rules.ts
30 dup /  75 matchers  src/components/date/rules.ts
25 dup /  88 matchers  src/components/slider/rules.ts
17 dup /  31 matchers  src/components/checkbox/rules.ts
... drawer, fab, tabs, toggle, btn-group, select, timeline, item, separator
```

Because those copies carry literals, they are style-agnostic, and they are what
the sheet actually emits: the token system is bypassed, and the md2/md3 bodies
live side by side without a style being able to win. That is the root cause of
"the md3 toggle rendered as md2 no matter what the style tokens said" — and of
md2 rendering md3 geometry.

Folded so far: `toggle`, `item`, `separator` — the three components the vendored
specs cover. Literals moved into per-style tokens, and both styles set to their
spec (verified by probing the harness on 3100, md3 and md2):

|                     | md3 spec                           | md3 rendered  | md2 spec                     | md2 rendered       |
| ------------------- | ---------------------------------- | ------------- | ---------------------------- | ------------------ |
| switch chassis      | 52x32                              | 52x32         | 56x40 box (`1.4em` @40px)    | 56x40              |
| switch track        | 52x32, outline 2px `outline`       | same          | 36x14, no outline            | 36x14              |
| track fill, off     | `surface-container-highest`        | `#e6e1e6`     | `rgba(0,0,0,0.32)`           | same               |
| track fill, on      | `primary`                          | `#6750a4`     | `secondary` 50%              | `oklab(... / 0.5)` |
| handle              | 16px `outline` / 24px `on-primary` | 16x16 / 24x24 | 20px `#fafafa` / `secondary` | 20x20              |
| list item, one line | 56px                               | 56px          | 56px (48px dense)            | 56px               |
| list item, selected | `secondary-container`              | token         | `primary` 12%                | token              |
| divider             | 1px `outline-variant`              | `#cac4cf`     | 1px black 12%                | `rgba(0,0,0,0.12)` |

The gate cannot see any of this: it skips a reference value built from a role
variable, so a wrong role reads as clean. It also cannot see a _tokenised_
value, so folding literals into tokens moves a handful of declarations from
"matching" to "mismatch" by construction. `absent`/`mismatch` are pinned back at
their pre-fold numbers (40/10) by declaring the reference's own longhands and by
giving each token the reference's exact value where the spec is silent (md3 has
no dense item, so its dense height stays the reference's 28px).

**Done:** all of them. 268 duplicated matchers → 5, and the 5 that remain are
the cross-module pairs where the same matcher in two modules _adds_
declarations rather than overriding any (`q-page`, `q-list--padding`). Every
fold was verified by diffing the whole emitted sheet (2647 selectors) against
the pre-fold build, and the test suite now pins the count so it can only shrink.

Two failure modes worth remembering, both seen more than once: a _literal copy
sitting in the first yield_ wins and silently reverts a tokenised value (the
field label landed on top of its value text, the date picker lost
`display: inline-flex`), and a declaration can be lost outright when the entry
carrying it is not captured (`.q-fab` lost `vertical-align`). Only the sheet
diff catches either.

## 9. What is left, in plan order

Done since this handoff was written: the duplicate sweep above; the spec pass on
the three components the vendored specs cover (switches, lists, dividers — both
styles, including md2's dark switch values via `string | { light, dark }`
tokens); and the consumer-reported defects (button elevation on the base
`:before`, `.row`/`.column` carrying `flex: 1 1 auto`, `.q-icon > img` sizing,
`.q-badge` size, the notification badge's missing vertical offsets, and the
5s-timeout "flakiness").

Left, roughly by value:

1. **§4b — wind4's runtime layer.** The biggest structural gap: `variants`,
   `postprocess`, `layers` and the custom `extractors` that `main` used are not
   wired in, and ~40 `var()` names the reference resolves are still unresolved
   in our sheet (the sweep script is in §8).
2. **Extras audit (§3.1).** 879 declarations we emit that the reference does
   not. Most look like content-scan artefacts (the reference was built from a
   smaller content set), but the audit is what separates deliberate additions
   from stale copies.
3. **Spec coverage.** The normalized specs cover switches, lists and dividers.
   `SPEC_VERIFICATION_REPORT.md` names what the pre-rewrite preset was verified
   against (`QBtn`, `QToggle`, `QCheckbox`, `QChip`, `QCard`, `QField`) — worth
   re-running those rows, and extracting more of the vendored Flutter/Compose
   sources the same way.
4. **Documented deviations.** Several modules are deliberately no longer locked
   to the reference — `item` (56px per md3 vs 28px), `toggle` (300ms per M3 vs
   0.22s, plus its tokenised transition), `badge` (12px and the token
   radius/weight vs the reference's 11px/literals), `flex-grid` (Quasar's flex
   addon has no `flex: 1 1 auto` on `.row`/`.column`). Each is recorded in
   `test/fixtures/parity-baseline.json` with `target: null`; they belong in the
   docs, not just the baseline.
5. **Docs and a changeset.** `CONTEXT.md`, the ADRs the plan names, and a
   changeset for these fixes (`.changeset/` already exists).
6. **Consumer side (petboarding).** `file:` → `link:` for the preset dependency
   (the hardlink copy is what hid `dist/core/motion/`), `q-mini-drawer-hide` on
   the drawer labels, and the dev proxy that makes login work — built during
   this session, currently living only in `/tmp`.
7. **Harness visual coverage.** The 13 screenshot tests are capture-only: they
   pass but assert nothing, so they cannot catch a visual regression. Worth
   adding baseline comparison if that should fail CI.
