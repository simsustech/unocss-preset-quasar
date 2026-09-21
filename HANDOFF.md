# Handoff: full-sheet parity — step 6 at 101/113, harness still unverified

Branch: `preset-rewrite`
Worktree: `/home/stefan/Projects/unocss-preset-quasar/.worktrees/rules`
Plan: `/home/stefan/.pi/plans/2026-09-21-new-preset-looks.md`
Evaluation: `/home/stefan/.pi/plans/2026-09-21-new-preset-looks.evaluation.md`

## Read this first: the harness run is the open item

The user asked for a `quasar-testing-harness` verification pass and **it could not
be run**. The harness is read-only under this sandbox, and vitrify refuses to
start without writing a transient `packages/app/vitrify.config.ts.js` next to
`vitrify.config.ts`:

```
$ nono why --self --path /home/stefan/Projects/quasar-testing-harness/packages/app --op write
DENIED
  Reason: insufficient_access
  Details: Path is covered by '/home/stefan/Projects', which grants read access from user but write was requested
  Suggested fix: --write /home/stefan/Projects/quasar-testing-harness/packages/app
```

Two ways forward, pick one:

```sh
# A. one-off grant for this session
nono run --profile pi --write ~/Projects/quasar-testing-harness -- pi

# B. persistent — the draft is already written
#   ~/.config/nono/profile-drafts/pi-quasar-parity.json
nono profile promote pi-quasar-parity
nono run --profile pi-quasar-parity -- pi
```

The draft also covers `~/Projects/unocss-preset-quasar/.git/**` (so `git commit`
works from inside the sandbox — this session had that grant and did commit) and
the preset worktree.

Then run the suite the plan's (d0) specifies:

```sh
cd ~/Projects/quasar-testing-harness
TEST_SERVER_PORT=3100 \
TEST_SERVER_CMD='pnpm --filter @quasar-testing-harness/app exec vitrify dev --port 3100 --host 127.0.0.1' \
  pnpm exec playwright test tests/ --reporter=list --output=/tmp/pw-results
```

Use **3100**, not 3000: :3000 is petboarding's vitrify dev server right now, and
`reuseExistingServer: true` would happily drive the wrong app. The harness's
`packages/app/package.json` already links `unocss-preset-quasar` to this
worktree's `packages/preset`, so it is testing the rewrite, not main.

## State

| Fact                                      | Value                                                |
| ----------------------------------------- | ---------------------------------------------------- |
| Reference rules (fixture)                 | 2,441 + 110 keyframes + 170 vars                     |
| Selectors fully matching                  | 1,873 (76.7%)                                        |
| Remaining gaps                            | missing 568, absent 129, mismatch 23                 |
| Modules at target 0                       | **101 of 113**                                       |
| Payload                                   | 205 KB emitted vs 314 KB reference (limit ref × 1.1) |
| `pnpm vitest run`                         | 30 files / 179 tests **passing**                     |
| `tsc --noEmit`, `oxlint`, `oxfmt --check` | clean (pre-existing lint warnings only)              |
| harness suite                             | **not run — blocked, see above**                     |
| petboarding e2e                           | not re-run this session (last session: 6/6)          |

Commits this session, newest first:

- `8758f98` btn → 0 (101 targets)
- `70e044d` timeline, editor → 0 (100)
- `0ab46cc` 14 display modules → 0 (98)
- `fe9efe3` 31 structure modules → 0 (84)
- `5bec234` the previous session's tree (emission, shell, forms, new gate)

## Remaining work

Everything left is **preset scope** except the two `reported` modules, which are
ratcheted but never driven to zero.

| Module            | missing | absent | mismatch | Step |
| ----------------- | ------- | ------ | -------- | ---- |
| `table`           | 72      | 24     | 2        | 7    |
| `stepper`         | 35      | 12     | 4        | 7    |
| `tree`            | 32      | 15     | 4        | 7    |
| `dialog`          | 26      | 12     | 1        | 7    |
| `uploader`        | 13      | 26     | 2        | 7    |
| `color-utilities` | 34      | 0      | 0        | 8    |
| `tokens`          | 3       | 0      | 0        | 8    |
| `keyframes`       | 110     | 0      | 0        | 9    |
| `animated`        | 98      | 0      | 0        | 9    |

Step 10 is untouched: tighten the ratchet, `test/token-trace.test.ts`, docs
(repo-root `README.md`, `packages/docs/guide/development.md`, `packages/docs/api/*`),
`CONTEXT.md` + the two ADRs, a minor changeset, and the harness run.

## The loop that works (for the remaining modules)

```sh
cd packages/preset
node /tmp/refdump.mjs <module>        # see /tmp/refsel.mjs for ad-hoc selectors; recreate both if /tmp was cleared
# edit src/components/<module>/rules.ts
npx tsc --noEmit                      # FIRST — a clipped brace makes the gate report stale numbers
node scripts/parity-report.mjs        # gate; --module <name> for detail, PARITY_DEBUG=1 for resolved values
pnpm vitest run                       # cumulative (d2)
node scripts/parity-report.mjs --update --set-target <module>
pnpm exec oxfmt --write src           # the pre-commit hook runs oxfmt --check and will reject otherwise
git commit
```

The two helper scripts are reproduced at the bottom of this file so they survive
a `/tmp` wipe: save them as `/tmp/refdump.mjs` and `/tmp/refsel.mjs`.

### The five things that cost the most time this session

1. **The reference states declarations as longhands.** `padding-inline`/
   `padding-block`, `border-width`/`border-style`/`border-color`,
   `outline-style`/`outline-width`, `background-image` vs `background`,
   `background-color` vs `background`. The gate compares property by property, so
   a shorthand leaves the longhand keys _absent_ even when the box paints
   identically. Nearly every module port began by discovering this.
2. **A reference value containing `var(--un-*)` is not compared at all** (the
   report skips it). Those are the properties where you may keep the `--q-*`
   token — which is what keeps md2/unstyled style switching alive. Do not freeze
   them to the reference's `color-mix` text.
3. **Plain rules that can never match a class token.** `/^q-btn\.disabled$/`
   compiles but matches nothing; the selector has to be yielded from the base
   matcher as `${sel}.disabled`. `no-duplicate-rules.test.ts` cannot see this
   class of bug.
4. **`mergeDuplicateRules` reorders.** It retains every duplicate's declarations
   but emits the merged plain object _before_ the scoped yields. When duplicate
   entries' scoped yields must keep their relative order (it bit
   `q-linear-progress__model--indeterminate`), fold them into one generator by
   hand.
5. **Inert minifier artifacts are part of the reference.** The bundle emits
   selectors where a combinator became `__` (`.q-btn-group--spread__> …`) and
   where a dot was lost (`.q-editor .q btn`, `.q-table .q-virtual-scroll__padding
td`). They cannot match, but parity emits them next to the corrected selector.
   If you would rather fix the gate instead, extend `isUnmatchableSelector` and
   record it — do not do both.

## Still standing traps

- **Never write a rule whose regex overlaps an earlier rule's token.** A rule
  matching `.q-field ::-ms-clear|^q-field$` silently killed all `/^q-field$/`.
- **A missing comma in a generated block deletes a whole module** without failing
  the build. `tsc` then the gate, after every block.
- **Rules cannot carry at-rules.** Media families are CSS text assembled in
  `src/index.ts` (`responsiveVisibilityCss`, `platformMediaCss`, `layoutMediaCss`,
  `tooltipMediaCss`, `notificationMediaCss`). Barrels must not export `*Preflights`.
- **Module names ≠ directories.** `tab` → `components/tabs/`, `spacing` →
  `core/spacing/`, `color-picker` → `components/color/`, `panel-parent` had no
  directory before this work. `ls` first.
- **Quasar's proof points are runtime classes.** If a class is never in the
  scanned source it is only emitted through `src/safelist.ts` — e.g.
  `q-focus-helper--round`, `q-electron-drag`, `q-loading__backdrop` were added
  there this session.
- **`barrels must not export *MediaCss` as rules** — `pickRules` filters on the
  `Rules` suffix, so a `*MediaCss` export is inert unless `src/index.ts` imports
  it explicitly.

## Committing

`git commit` works in this session (the worktree gitdir is writable). The
pre-commit hook runs `oxlint` + `oxfmt --check`; format with
`pnpm exec oxfmt --write <files>` first, and never `--no-verify`. Body ≤100
chars/line, `git commit -F <file>`.

## Helper scripts (recreate after a /tmp wipe)

`/tmp/refdump.mjs <module>` — prints, for every gap the gate reports for a
module, the reference declarations of the owning selectors. `/tmp/refsel.mjs
'.q-menu'` does the same for explicit selectors. Both import `normSel`,
`ruleKey` and `containerKey` from
`<worktree>/packages/preset/scripts/parity-report.mjs` and read
`test/parity-report.json` + `test/fixtures/reference-selectors.json`.

Save as `/tmp/refdump.mjs` (adjust `PKG` if the worktree moves):

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
  for (const [n, m] of Object.entries(report.modules))
    if (m.missing.length + m.absent.length + m.mismatch.length)
      console.log(
        `  ${n} (${m.scope}) ${m.missing.length + m.absent.length + m.mismatch.length}`
      )
  process.exit(0)
}
const entry = report.modules[moduleName]
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

`/tmp/refsel.mjs '.q-menu' '.q-tooltip'` is the same idea for explicit selectors:

```js
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
