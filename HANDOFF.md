# Handoff: `unocss-preset-quasar` parity port — step 6 at 101/113, harness unverified

Branch: `preset-rewrite`
Worktree: `/home/stefan/Projects/unocss-preset-quasar/.worktrees/rules`
Plan: `/home/stefan/.pi/plans/2026-09-21-new-preset-looks.md`
Evaluation: `/home/stefan/.pi/plans/2026-09-21-new-preset-looks.evaluation.md` (two runs; the second is `2026-09-21T16:52:00+02:00`)
Related repo: `~/Projects/petboarding` (the consumer), `~/Projects/quasar-testing-harness` (the verification surface)

**Working tree is clean. Everything described below is committed.**

---

## 1. The open item: the harness run

The harness suite **has not been run and is the one acceptance gate that is
still deferred**. It cannot run in the sandbox this work was done in: the
harness is read-only, and vitrify refuses to start without writing a transient
`packages/app/vitrify.config.ts.js` next to `vitrify.config.ts` (it writes it,
imports it, then unlinks it — there is no flag to skip that).

```
$ nono why --self --path ~/Projects/quasar-testing-harness/packages/app --op write
DENIED
  Reason: insufficient_access
  Details: Path is covered by '/home/stefan/Projects', which grants read access from user
           but write was requested
  Suggested fix: --write /home/stefan/Projects/quasar-testing-harness/packages/app
```

### Fix it one of two ways, then run the suite

```sh
# A. one-off grant
nono run --profile pi --write ~/Projects/quasar-testing-harness -- pi

# B. persistent (draft already written to ~/.config/nono/profile-drafts/pi-quasar-parity.json)
nono profile promote pi-quasar-parity
nono run --profile pi-quasar-parity -- pi
```

The draft covers `~/Projects/quasar-testing-harness/**`, the preset worktree, and
`~/Projects/unocss-preset-quasar/.git/**` (so `git commit` works from inside the
sandbox — this work needed that grant and did commit).

```sh
cd ~/Projects/quasar-testing-harness
TEST_SERVER_PORT=3100 \
TEST_SERVER_CMD='pnpm --filter @quasar-testing-harness/app exec vitrify dev --port 3100 --host 127.0.0.1' \
  pnpm exec playwright test tests/ --reporter=list --output=/tmp/pw-results
```

- **Use port 3100, not 3000.** :3000 is petboarding's vitrify dev server;
  `reuseExistingServer: true` would silently drive the wrong app.
- `--output=/tmp/pw-results` keeps Playwright's artifacts out of the repo; the
  config's html reporter still writes `playwright-report/` in the harness root,
  which is why the harness needs to be writable at all.
- `packages/app/package.json` already links `unocss-preset-quasar` to **this
  worktree's** `packages/preset`, so the suite tests the rewrite, not main.

### What "unverified" means

Steps 3–7 were verified only by the preset's own suite plus the parity ratchet.
The previous session did run petboarding's `screenshots-rewrite.spec.ts` (6/6)
for the shell/form milestones; **this session ran nothing in a browser**. So the
101 modules marked complete below are _gate-complete_, not visually confirmed.
Treat the harness run as the first thing to do, and expect it to find things —
the gate measures declared values, not rendering.

---

## 2. Where the port stands

| Fact                                      | Value                                                                                |
| ----------------------------------------- | ------------------------------------------------------------------------------------ |
| Reference bundle                          | vendored, sha256 `4a01f0ffbc51075f…` pinned in `specs/reference/raw/MANIFEST.sha256` |
| Fixture                                   | 2,441 rules + 110 keyframes + 170 vars                                               |
| Selectors fully matching                  | **1,873 / 2,441 (76.7 %)**                                                           |
| Remaining gaps                            | missing **568**, absent **129**, mismatch **23**                                     |
| Modules at target 0                       | **101 of 113**                                                                       |
| Payload                                   | 205,126 B emitted vs 314,650 B reference (limit = ref × 1.1)                         |
| `pnpm vitest run`                         | 30 files / **179 tests passing**                                                     |
| `tsc --noEmit`, `oxlint`, `oxfmt --check` | clean (only pre-existing lint warnings)                                              |
| harness suite                             | **unverified — see §1**                                                              |
| petboarding e2e                           | not re-run; previous session: 6/6                                                    |

### Commits, newest first

| Commit          | Contents                                                                                                                                                                                                                                                                                | Targets |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| _(this commit)_ | this handoff, rewritten after the harness block was confirmed                                                                                                                                                                                                                           | —       |
| `a50643a`       | handoff, first version                                                                                                                                                                                                                                                                  | —       |
| `8758f98`       | `btn` — QBtn's resets as longhands, round/fab geometry, pressed elevations, push translate                                                                                                                                                                                              | 101     |
| `70e044d`       | `timeline`, `editor`                                                                                                                                                                                                                                                                    | 100     |
| `0ab46cc`       | 14 display modules: btn-dropdown, carousel, img, pagination, toolbar, menu, linear-progress, notification, tooltip, bar, splitter, card, btn-group, color-picker                                                                                                                        | 98      |
| `fe9efe3`       | 31 structure modules: chip, icon, avatar, loading, spinner(-mat), circular-progress, separator, slide-item, popup-edit, virtual-scroll, list, expansion-item, panel, video, dialog-plugin, breadcrumbs, knob, markup-table, btn-toggle, footer, header, the focus family, electron-drag | 84      |
| `5bec234`       | the earlier session's tree: emission fixes, shell, every form module, the new gate, `textarea` + `panel-parent` + `core/platform`, vendored bundle, changeset                                                                                                                           | 53      |

---

## 3. What is left, in plan order

All of it is `scope: preset` except the two `reported` modules (`icons`,
`resets`, `utilities`), which are ratcheted but never driven to zero.

| Module            | missing | absent | mismatch | Plan step |
| ----------------- | ------- | ------ | -------- | --------- |
| `table`           | 72      | 24     | 2        | 7         |
| `stepper`         | 35      | 12     | 4        | 7         |
| `tree`            | 32      | 15     | 4        | 7         |
| `dialog`          | 26      | 12     | 1        | 7         |
| `uploader`        | 13      | 26     | 2        | 7         |
| `color-utilities` | 34      | 0      | 0        | 8         |
| `tokens`          | 3       | 0      | 0        | 8         |
| `keyframes`       | 110     | 0      | 0        | 9         |
| `animated`        | 98      | 0      | 0        | 9         |

**Step 8 (token model).** Emit the scheme roles per style entry, then the `--q-*`
alias blocks (`body.quasar-style-<name>`, `body.body--dark`, and the combination),
re-add `extendTheme` so the Quasar palette reaches wind4's theme and the colour
utilities generate. Comparing the md3 entry on both sides shows **0 differences on
43 overlapping token names**, so this step is about _emitting_ the colour layer,
not re-deciding values.

**Step 9 (motion).** `q-*` keyframes from the modules that own the animated
component (skeleton owns `q-skeleton--*`, linear-progress owns its indeterminate
pair), and re-add `animated-unocss` as a dependency plus its preset so
`.animated-*`/`une*` return. Check that the dependency is installable before
committing to this step — it is a new package.

**Step 10 (close out).** Tighten the ratchet to zero where the plan says so,
`test/token-trace.test.ts`, docs (repo-root `README.md`,
`packages/docs/guide/development.md`, `packages/docs/api/*`), `CONTEXT.md` + the
two ADRs, a minor changeset, the full harness run, and the evaluation.

---

## 4. The loop, per module

```sh
cd packages/preset
node /tmp/refdump.mjs <module>       # gaps + the reference declarations of their selectors
# edit src/components/<module>/rules.ts  (note: color-picker lives in components/color/)
npx tsc --noEmit                     # FIRST — see trap 5 below
node scripts/parity-report.mjs       # gate; --module <name> for detail, PARITY_DEBUG=1 for resolved values
pnpm vitest run                      # cumulative (d2)
node scripts/parity-report.mjs --update --set-target <module>
pnpm exec oxfmt --write src          # the pre-commit hook runs oxfmt --check and will reject otherwise
git commit -F <message-file>
```

`/tmp/refdump.mjs` and `/tmp/refsel.mjs` currently exist; both are reproduced in
§7 so they survive a `/tmp` wipe.

### The five things that cost the most time (do not rediscover)

1. **The reference states declarations as longhands.** `padding-inline`/
   `padding-block`, `border-width`/`border-style`/`border-color`,
   `outline-style`/`outline-width`, `background-image` vs `background`,
   `background-color` vs `background`. The gate compares **property by property**,
   so a shorthand leaves the reference's longhand keys _absent_ even when the box
   paints identically. Nearly every module port began by discovering this.
2. **A reference value containing `var(--un-*)` is not compared at all** — the
   report skips it (`if (/var\(--(dark|un)-/.test(value)) continue`). Those are the
   properties where you may keep the `--q-*` token, which is what keeps
   md2/unstyled style switching alive. Do **not** freeze them to the reference's
   `color-mix` text. Same for a reference value that still carries an unresolvable
   `var()`: `resolvedRef.includes('var(')` → skipped.
3. **Rules that can never match a class token.** `/^q-btn\.disabled$/` compiles and
   matches nothing — the selector has to be yielded from the base matcher as
   `${sel}.disabled`. `test/no-duplicate-rules.test.ts` cannot see this class of
   bug because there is no duplicate to find.
4. **`mergeDuplicateRules` retains but reorders.** It keeps every duplicate's
   declarations, but emits the merged plain object _before_ the scoped
   (`symbols.selector`) yields. Where duplicate entries' scoped yields must keep
   their relative order it reorders the emitted blocks — it bit
   `q-linear-progress__model--indeterminate`, fixed by folding the three entries
   into one generator by hand.
5. **Inert minifier artifacts are part of the reference.** The bundle emits
   selectors where a combinator became `__` (`.q-btn-group--spread__> …`) and
   where a dot was lost (`.q-editor .q btn`, `.q-table .q-virtual-scroll__padding
tr/td`). They can never match, but the reference emits them _next to_ the
   intended selector, so parity emits both and the comment records which one
   styles the element. If you would rather fix the gate instead, extend
   `isUnmatchableSelector` and record it — do not do both.

---

## 5. Standing traps

- **Never write a rule whose regex overlaps an earlier rule's token.** A rule
  matching `.q-field ::-ms-clear|^q-field$` silently killed all `/^q-field$/`
  output.
- **A missing comma or a clipped brace in a rules file deletes a module or breaks
  the transform, without failing anything downstream.** `tsc --noEmit` _before_
  the gate, after every block. A broken transform makes the gate re-print its
  previous report, which looks like slow progress rather than a syntax error.
- **Rules cannot carry at-rules.** Media families are CSS text assembled in
  `src/index.ts`: `responsiveVisibilityCss`, `platformMediaCss`, `layoutMediaCss`,
  `tooltipMediaCss`, `notificationMediaCss`. Barrels must not export
  `*Preflights`.
- **A `*MediaCss` export from a module is inert** unless `src/index.ts` imports
  it explicitly — `pickRules` only picks up keys ending in `Rules`.
- **Module names ≠ directories.** `tab` → `components/tabs/`, `spacing` →
  `core/spacing/`, `color-picker` → `components/color/`, `panel-parent` had no
  directory at all before this work. `ls` first.
- **Quasar's proof points are runtime classes.** If a class never appears in the
  scanned source it reaches the sheet only through `src/safelist.ts` — this work
  added `q-focus-helper--round`, `q-focus-helper--rounded`, `q-electron-drag`,
  `q-electron-drag--exception` there.
- **Prefer editing an existing body over appending an override.** UnoCSS
  re-orders emitted blocks, so a later-appended block is not guaranteed to win.

---

## 6. Committing

`git commit` works in this session (the worktree gitdir is writable). The
pre-commit hook runs `oxlint` + `oxfmt --check` over 407 files; format first with
`pnpm exec oxfmt --write <files>`, and never `--no-verify`. Bodies ≤ 100 chars per
line, `git commit -F <file>`. The repo `README.md` says to use `oxfmt`, not
prettier.

---

## 7. Helper scripts (recreate if `/tmp` was wiped)

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

---

## 8. First actions for the next session

1. `nono run --profile pi --write ~/Projects/quasar-testing-harness -- pi` (or promote the draft), then run the harness suite (§1). Report what it finds before porting more modules — the gate has never been validated against a browser for these 48 modules.
2. Port the step-7 data modules in the order the ratchet ranks them: `table`, `stepper`, `tree`, `dialog`, `uploader`.
3. Step 8, then step 9 (check `animated-unocss` is installable first), then step 10.
