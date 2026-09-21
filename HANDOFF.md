# Handoff: full-sheet parity — steps 1–5 done, step 6 half done

Branch: `preset-rewrite`
Worktree: `/home/stefan/Projects/unocss-preset-quasar/.worktrees/rules`
Date: 2026-09-21
Plan: `/home/stefan/.pi/plans/2026-09-21-new-preset-looks.md`
Evaluation: `/home/stefan/.pi/plans/2026-09-21-new-preset-looks.evaluation.md`

> **The worktree is dirty and could not be committed from inside this sandbox.**
> See "Committing" at the end — the message is written and ready; git only needs
> write access to the worktree's gitdir.

## What this session did

Ran `/implement` on the plan above. The previous handoff (default branch, and the
15 dark-layer commits `0d0ff58`…`aaccdbf`) is superseded — its content is in the
git log. What changed now, in one line each:

- **Measured everything.** The vendored reference bundle is back
  (`specs/reference/raw/reference-bundle.css.txt`, sha256 `4a01f0ffbc51075f…`,
  pinned in `MANIFEST.sha256`) and `scripts/extract-reference-fixture.mjs` now keeps
  **all** rules instead of the dark-scoped subset: **2,441 rules, 110 keyframes,
  170 vars** (was 163 selectors).
- **Replaced the gate.** `scripts/parity-report.mjs` classifies every fixture
  selector into a module, compares declarations after resolving scoped tokens, and
  keeps a ratchet in `test/fixtures/parity-baseline.json` that may only shrink.
  `test/_parity-snapshot.test.ts` and `test/parity-report.txt` are the legacy writer;
  they are redundant now (delete with the docs pass, or keep as a smoke test).
- **Closed the emission bugs.** `elevationRuleList` → `elevationRules` (11 rules were
  never picked up); `/^q-item-type$/` deleted (it forced `display:block` on every
  QItem, rows 154px → 93px); main's per-component safelists ported
  (`componentsSafelistMap`) so runtime-composed classes are emitted at all.
- **Shell.** `.q-page-container` is no longer a flex row with a 1018px height,
  `.q-drawer` is the reference's absolute 80px mini track (not a 300px fixed panel
  with a shadow), `.q-tabs--vertical` is a block, `.lt-md`/`.gt-sm` hide ranges and
  the platform rules exist, grid gutters use wind4 spacing steps.
- **Forms, all at target 0:** field (131 gaps → 0), textarea (**new module**, had no
  rules), select, option-group, input, checkbox, radio, toggle, slider, date, time,
  form, file, rating, range.
- **Step 6 partial:** spacing, grid, badge, tab, item, banner, fab, no-ssr, skeleton,
  panel-parent (**new module**), tab-panel, pull-to-refresh.

## State

| Fact                           | Value                                                |
| ------------------------------ | ---------------------------------------------------- |
| Reference rules (fixture)      | 2,441 + 110 keyframes + 170 vars                     |
| Selectors fully matching       | 1,685                                                |
| Remaining gap declaration keys | **1,182** (missing 756, absent 363, mismatch 63)     |
| Modules at target 0            | **53 of 113**                                        |
| Payload                        | 182 KB emitted vs 307 KB reference (limit ref × 1.1) |
| `pnpm vitest run`              | 30 files / 179 tests **passing**                     |
| petboarding e2e                | `screenshots-rewrite.spec.ts` 6/6 passing            |
| Harness suite                  | **not run** (see below)                              |

Top remaining modules by gap count:
`icons 123` and `resets 72`, `utilities 63` (all `reported` scope — see the reason in
`parity-report.mjs`), `keyframes 110` + `animated 98` (step 9), `table 98`,
`stepper 51`, `tree 51`, `btn 42`, `uploader 41`, `dialog 39`, `timeline 36`,
`chip 35`, `color-utilities 34` (step 8), `editor 28`, then ~45 smaller modules.

## The gate: how it works, and its four fixed bugs

```sh
cd packages/preset
node scripts/parity-report.mjs                      # table + work list
node scripts/parity-report.mjs --module table       # one module's gaps in detail
node scripts/parity-report.mjs --update             # rewrite the ratchet baseline
node scripts/parity-report.mjs --set-target a,b,c   # mark modules complete
PARITY_DEBUG=1 node scripts/parity-report.mjs       # print every resolved comparison
```

Reach for `PARITY_DEBUG=1` **first** when a batch of mismatches appears — it prints
`ref` vs `ours` after token resolution, which is what you actually need to know.
The report is written to `test/parity-report.json` on every run (gitignored: it is a
work list, not an artifact; the ratchet source is `test/fixtures/parity-baseline.json`).

Four measurement bugs were found and fixed in this session; all four had produced
dozens of _false_ gaps, so distrust any old number:

1. **Tokens never resolved.** `parseSheet` keeps rule bodies as text (`body`) and only
   the comparison path converts them (`declarations`). The token collector read
   `declarations`, so every `var(--q-*)` stayed literal and compared unequal.
2. **Style-scope precedence.** Both sheets define each token three times (base +
   `body.quasar-style-<name>`). The reference bundle is the _harness_ running every
   entry as a body class, so its base scope holds the _unstyled_ tokens. Resolution
   order is now: named style block, then base, then the other entries.
3. **Unmatchable selectors.** The reference bundle drops a leading `.` on nested class
   selectors while minifying (`.q-checkbox--dense q-checkbox__label`). Seven selectors
   cannot match anything; they are excluded by rule, and the preset emits the
   _corrected_ selector.
4. **Relative vs absolute geometry.** The reference states md3 sizes relative to the
   control's font-size (`0.75em` of a 32px switch); the preset uses per-style tokens
   with absolute values. Equal by construction, unequal as text → reported, and
   verified in the browser instead.

## Running things

Preset unit suite (run after **every** module batch — the ratchet catches shape
regressions, e.g. it caught a missing comma that silently deleted the whole `q-time`
module):

```sh
cd packages/preset && pnpm vitest run
```

Petboarding dev loop (the preset is a `file:` override plus a dev-only
`resolve.conditions: ['source']`, so `src/` is used while iterating):

```sh
cd packages/preset && pnpm run build                      # prod dist, for the app's prod path
cd ~/Projects/petboarding && pnpm install --frozen-lockfile
docker compose -f docker-compose.dev.yaml up -d database mailhog
cd packages/api && NODE_TLS_REJECT_UNAUTHORIZED=0 pnpm exec vitrify dev -m fastify --port 3000
```

App e2e (login is real; only `https://localhost:3000` works — the OIDC issuer is
host-specific and a 3111 server fails with `Incorrect issuer in meta data`):

```sh
cd ~/Projects/petboarding/packages/api
PETBOARDING_E2E_BASE_URL=https://localhost:3000 PLAYWRIGHT_ALLOW_SCREENSHOTS=1 \
  pnpm exec playwright test tests/e2e/screenshots-rewrite.spec.ts --reporter=line
```

Harness suite — **unverified in this session**, the sandbox has it read-only:

```sh
cd ~/Projects/quasar-testing-harness
TEST_SERVER_PORT=3100 \
TEST_SERVER_CMD='pnpm --filter @quasar-testing-harness/app exec vitrify dev --port 3100 --host 127.0.0.1' \
  pnpm exec playwright test tests/ --reporter=list
```

Start the session with `nono run --profile pi --allow ~/Projects/quasar-testing-harness -- pi`,
otherwise the profile blocks it. Use port 3100, not 3000: the harness reuses an
existing server, so a stale one serves old CSS. 83 page dirs, 120s timeouts,
`tests/rewrite-tokens.spec.ts` reads tokens from `body` (not `:root`) on purpose.

## Remaining work, in plan order

- **Step 6 (finish).** Per module: dump the gaps (`--module <name>`), fetch the
  reference declarations from `test/fixtures/reference-selectors.json`, append a
  documented parity block to the module's `rules.ts`, run `tsc`, run the gate, set the
  target. Order by size: `table 98`, `stepper 51`, `tree 51`, `btn 42`, `uploader 41`,
  `dialog 39`, `timeline 36`, `chip 35`, `editor 28`, `btn-group 18`, `color-picker 18`,
  `tooltip 18`, `splitter 17`, `card 17`.
- **Step 7.** Data/display ports: `table`/`tree`/`virtual-scroll`, `timeline`,
  `editor`, `color-picker`.
- **Step 8.** Token model: scheme roles + `--q-*` aliases, `extendTheme`/wind4
  `--colors-*` so the colour utilities exist (`color-utilities 34 → 0`) and
  petboarding's bands/badges paint. Good news: comparing the md3 entry on both sides
  shows **0 differences on 43 overlapping token names**, so this step is mostly about
  emitting the colour layer, not about re-deciding values.
- **Step 9.** Motion: `q-*` keyframes (110) + `animated-unocss` (98).
- **Step 10.** Ratchet to 0 where the plan says so, `test/token-trace.test.ts`, docs
  (repo-root `README.md`, `packages/docs/guide/development.md`, `packages/docs/api/*`),
  `CONTEXT.md` + two ADRs, changeset (minor), harness run, evaluation.

## Traps that cost time (do not rediscover)

- **Never write a rule whose regex overlaps an earlier rule's token.** A rule matching
  `.q-field ::-ms-clear|^q-field$` silently killed _all_ `/^q-field$/` output.
- **Duplicates only merge when the bodies have the same shape.** Appending a generator
  entry for a regex that already has a plain-object body drops one of them — fold the
  yields into the existing entry instead. (This bit `q-item--dense`, `q-slider--dense`,
  `q-time`.)
- **A missing comma in a generated block deletes a whole module** from the emission
  without failing the build. Run `tsc --noEmit` and the gate after every generated
  block; the unit suite's ratchet is what caught it.
- **Rules cannot carry at-rules.** Media families are assembled as CSS text in
  `src/index.ts` (one preflight). Barrels must not export `*Preflights`.
- **Module names ≠ directories.** `tab` → `components/tabs/`, `spacing` →
  `core/spacing/`, `panel-parent` had no directory at all. Check with `ls` first.
- **Prefer editing the existing body over appending an override.** UnoCSS re-orders
  emitted blocks, so a later-appended block is not guaranteed to win; several rounds
  were spent chasing that.
- **Quasar's proof points are runtime classes.** If a class is never in the scanned
  source it is only emitted through `src/safelist.ts`.

## Committing

`git commit` **fails inside this sandbox** — the worktree's gitdir
(`/home/stefan/Projects/unocss-preset-quasar/.git/worktrees/rules`) is outside the
profile's write grant, while the worktree files themselves are writable. Diagnosis:

```sh
nono why --self --path /home/stefan/Projects/unocss-preset-quasar/.git/worktrees/rules --op write
```

Two ways forward, pick one:

```sh
# A. one-off grant for this worktree's gitdir
nono run --profile pi --allow ~/Projects/unocss-preset-quasar/.git/worktrees/rules -- pi

# B. persistent
#   drafts ~/.config/nono/profile-drafts/<name>.json, then promote it
nono profile promote <name>
```

The message is ready at `/tmp/preset-parity-commit.txt` (a `feat(preset):` commit
covering emission, shell, forms, the new gate, the two new modules, the vendored
bundle and the changeset). Then:

```sh
cd /home/stefan/Projects/unocss-preset-quasar/.worktrees/rules
git add -A && git commit -F /tmp/preset-parity-commit.txt
```

petboarding's half is **already committed** (`8a69d3548 test(app): assert the
rewritten preset's shell and form geometry in e2e`) — its `.git` is writable. A stale
`.git/index.lock` from a killed process had to be removed first; if it reappears, no
git process is running, so `rm` it.

Commit convention: `git commit -F <file>`, body ≤100 chars/line, pre-commit hooks
run `oxfmt --check` (never `--no-verify`). Format first with
`pnpm exec oxfmt --write <files>`.
