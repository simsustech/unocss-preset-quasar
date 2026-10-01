# Development

The contributor's map of the preset: repository layout, how to add or change CSS, and the commands that verify it.

## Project structure

```text
packages/preset/
├── src/
│   ├── index.ts               # QuasarPreset factory — layers, safelist, extractors, preflights
│   ├── extractor.ts           # component + value extractors
│   ├── safelist.ts            # base safelist + pluginSafelistMap
│   ├── components/            # ONE folder per Quasar component
│   │   └── btn/
│   │       ├── index.ts       # re-exports btnRules / btnShortcuts
│   │       ├── rules.ts       # the CSS: selectors yielded from /^q-btn$/
│   │       └── shortcuts.ts   # UnoCSS shortcuts (usually empty — rules do the work)
│   ├── core/                  # utility modules (spacing, typography, grid, …)
│   │   └── <module>/{rules.ts, shortcuts.ts, …}
│   ├── styles/                # the style entries
│   │   ├── index.ts           # QuasarStyleEntry, setStyle, QuasarStyleEntries
│   │   ├── md3/  md2/  unstyled/
│   │       └── index.ts       # entry (+ rules for unstyled)
│   ├── theme/                 # token types, color generation, preflight, public theme
│   ├── rules/                 # assembly machinery: merge.ts, scope.ts
│   ├── app-extensions/        # opt-in ports: qcalendar, qmarkdown, qmediaplayer
│   └── generated/             # quasar-classes.ts — scraped class vocabulary (generated)
├── scripts/                   # generators and audit gates
├── test/                      # vitest suites
└── dist/                      # tsc output (gitignored)
```

Read [How It Works](/architecture/overview) first if the layering is unfamiliar — most conventions below exist because of the constraints listed there.

## How collections are discovered

`src/index.ts` never imports individual components. It imports the barrels (`components/index.ts`, `core/index.ts`) and picks exports **by suffix**: anything ending in `Rules`, `Shortcuts`, or `Preflights` joins the preset. That is why a module's `index.ts` re-exports with those exact names — a typo silently drops the module from the output.

## Adding a component

1. Create the folder:

   ```text
   src/components/my-component/
   ├── index.ts      # export { myComponentRules } from './rules.js'
   ├── rules.ts      # export const myComponentRules: Rule[] = [ [/^q-my-component$/, function* …] ]
   └── shortcuts.ts  # export const myComponentShortcuts: Shortcut[] = []
   ```

2. Export it from `src/components/index.ts`.
3. Write the rule state structure and read values from tokens (`var(--q-btn-radius)`, `var(--q-surface-container)`); a literal is only for what no token can express. If the literal belongs to one style only, it goes in that style's `rules` instead (`src/styles/<name>/`), not here.
4. Regenerate the class vocabulary if the component's classes are new upstream: `node scripts/generate-quasar-classes.mjs`.
5. Add a safelist entry only if the base class has **no signal in markup** (applied purely at runtime). If any template mentions the component, the extractor derives its whole family.

Rules that yield additional selectors use the `symbols.selector` channel — see any `rules.ts` for the pattern (`.q-btn:before`, `.q-btn__content`, …).

## Commands

```bash
# from packages/preset
pnpm build          # tsc: src/ → dist/
pnpm build:watch    # incremental, for local development
pnpm lint           # oxlint src
pnpm lint:fix
pnpm test           # vitest test/
```

From the repository root: `pnpm run build`, `pnpm run lint`, `pnpm run test`, `pnpm run format:check`.

The suites assert emitted CSS, not snapshots of intent: no duplicate regex survives ([`no-duplicate-rules`](https://github.com/simsustech/unocss-preset-quasar/blob/main/packages/preset/test)), cascade order holds, the engine namespace reads are guarded, app-extension opt-in is byte-identical in both directions, and the palette resolves the same on mini and wind4.

## Audit scripts

| Script                                | Question it answers                                                                                                 |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `scripts/generate-quasar-classes.mjs` | Rebuild the class vocabulary from installed Quasar + app-extension sources; `--check` fails when dependencies moved |
| `scripts/compose-safelist.mjs`        | Re-derive the safelist from arbiters (source, dist, rendered pages)                                                 |
| `scripts/audit-vocabulary.mjs`        | Does any matcher name a class Quasar never emits? Gate: zero unknown tokens                                         |
| `scripts/parity-report.mjs`           | Per-class parity against `quasar/dist/quasar.css`                                                                   |
| `specs/audit/coverage-sweep.mjs`      | Which dist classes does this sheet never emit? Gate: every flag has a disposition row                               |

Run them after a build — a stale `dist/` makes a real fix look broken.

## Testing changes end to end

Component behavior is verified in the external Playwright harness (`quasar-testing-harness`), not with new spec files in this repository. Each Quasar component has its own spec file there; screenshots and CSS-variable dumps are the evidence. Vitest here covers the emitted sheet; the harness covers what the browser does with it.

## Release

The project versions through [Changesets](https://github.com/changesets/changesets):

```bash
pnpm run changeset   # record the change
pnpm run version     # apply versions
pnpm run publish     # publish
```

Commit messages are enforced by commitlint (conventional commits); the pre-commit hook runs lint and format checks.
