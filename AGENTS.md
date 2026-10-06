# AGENTS

## Dev server / background processes

This Pi agent session runs within the coding harness. Any dev server or
long-running background process spawned from a shell command is a child
of this process tree. Killing it naively (e.g. killing its parent PID,
or signals that propagate up) will terminate this session.

RULE: never kill the session process, and never rely on parent-shell
termination to stop a background process.

## Vision-based analysis of artifacts

Screenshots and image artifacts must be analyzed using **vision**
capability, not by reading them as files. Treat PNGs/JPGs as opaque
binary that the assistant views directly — never pipe them through
`read_file`, `cat`, or text-based tools. The `read_file` tool is for
source code and text files only.

### Identifying the session process

The session process is the only `node` running the `cmd` binary with
`--add-dir` flags. The reliable way to find it from any shell is:

```bash
ps -p $PPID -o pid,ppid,cmd=
```

It will show: `node /home/stefan/.nvm/.../bin/cmd --add-dir ...`.

Never target that PID with `kill`, `pkill -P`, `kill_shell`, or any
signal that could propagate.

### Starting a dev server safely

1. Detach it from this shell so it survives independently.
   Prefer one of:
   - `nohup <cmd> > /tmp/devserver.log 2>&1 & disown`
   - `setsid <cmd> > /tmp/devserver.log 2>&1 < /dev/null &`
2. Capture the PID (or port) so it can be stopped later without
   touching the parent: `echo $! > /tmp/devserver.pid`.
3. To stop it, kill ONLY by PID or by port — never by parent shell:
   - `kill $(cat /tmp/devserver.pid)`
   - or `kill_shell` with the explicit `pid` / `port` of the dev server.
4. Always clean up background processes when finished with them.
5. Never use `pkill -P $PPID` or any recursive child kill that could
   climb back up the tree.

If a dev server appears to already be running, check ports
(3000/5173/8080/9000/4000/5000) and `ps` before starting a new one.

## Testing

Do NOT create spec/test files inside the unocss-preset-quasar repo.
The quasar-testing-harness workspace at `~/Projects/quasar-testing-harness` is the testing
harness. Add component test scenarios to the existing Playwright spec
files under `~/Projects/quasar-testing-harness/tests/`. Each Quasar
component gets its own `.spec.ts` — use `shot()` to capture screenshots
and `dumpDiagnostics()` for CSS variable dumps alongside them. Tests
use URL query parameters to configure component props (e.g.
`/q-toggle?style=md3&dense=true&modelValue=true`).

## Core principle: test, don't guess

Never theorize about CSS behavior — always run the tests and check actual output.
If something looks wrong, run the Playwright test, inspect the screenshot, or check
the diagnostics JSON dump before touching CSS. Guessing wastes time on phantom fixes.

## MD2/MD3 spec verification

Reference data lives split per category under `specs/reference/normalized/`
(`md3-*.json`, `md2-*.json`) with raw upstream bundles under `specs/reference/raw/`;
the audit gates and their disposition ledger live under `specs/audit/`. Quasar SASS is
reference only.

### Verification procedure

1. **Read the spec** — open the relevant `specs/reference/normalized/<style>-<category>.json`
   for the component you're validating.
2. **Map shape tokens** to pixel values:
   - `none`: 0, `extra-small`: 4px, `small`: 8px, `medium`: 12px, `large`: 16px,
     `extra-large`: 28px, `full`: Infinity
3. **Compare spec values against the UnoCSS rule file** at
   `packages/preset/src/components/<component>/rules.ts`.
4. **For Quasar's em-based components** (QToggle, QCheckbox), the `font-size` on
   the inner element is the scaling base: `height: 1em` means the rendered height
   equals `font-size`, `width: 1.625em` means width = `font-size × 1.625`. Derive
   the correct `font-size` by dividing the spec dimension by the em factor.
5. **Run Playwright tests with diagnostics** from the test harness at
   `~/Projects/quasar-testing-harness`:

   ```bash
   npx playwright test tests/<Component>.spec.ts --reporter=list
   ```

   Tests use `dumpDiagnostics()` to capture CSS computed values and verify them
   against spec expectations.

6. **Update test expectations** if spec corrections change CSS output values.

### Shape token reference

| Token                             | CSS var                     | Pixels   |
| --------------------------------- | --------------------------- | -------- |
| `md.sys.shape.corner.none`        | `$shape-corner-none`        | 0        |
| `md.sys.shape.corner.extra-small` | `$shape-corner-extra-small` | 4px      |
| `md.sys.shape.corner.small`       | `$shape-corner-small`       | 8px      |
| `md.sys.shape.corner.medium`      | `$shape-corner-medium`      | 12px     |
| `md.sys.shape.corner.large`       | `$shape-corner-large`       | 16px     |
| `md.sys.shape.corner.extra-large` | `$shape-corner-extra-large` | 28px     |
| `md.sys.shape.corner.full`        | —                           | Infinity |

## Learned patterns (CSS/preset architecture)

### CSS architecture

- **Keep `getCSS` minimal** — prefer UnoCSS rules or shortcuts over inline `getCSS` functions for defining component CSS.
- **Style-specific CSS belongs in that style's preflights**, not in core — core is only for CSS that is truly universal across all styles (e.g. CSS reset, electron drag).
- **For CSS that needs style-scoping**, use/extend the `scopeStyle` abstraction rather than hardcoding body-class selectors inline in `getCSS` template strings — keeps the scoping logic centralized and reusable.
- **The preset should apply its own bodyClass to `<body>` automatically** at initialization — consumers should not need to manually `document.body.classList.add(...)` for scoped CSS to match.
- **For `::before` pseudo-element hover overlays**: use semi-transparent opacity tints (e.g. `$light-on-surface/3`) rather than solid surface container colors — the `::before` is absolutely positioned covering the cell, so a solid color fully obscures text underneath.

### Component conventions

- **QBtn**: `color` prop sets the **background** (`bg-<color>` class), `textColor` sets the **text color** (`text-<color>` class). They are independent — when only `color` is set, Quasar auto-pairs a contrasting text color (e.g. `color=primary` → `text-white`).
- **`quasar` is the single source of truth for prop types** — import from `'quasar'` (e.g. `QBtnProps` from `'quasar'`), do NOT hand-regenerate or create local subset types.

### Build tool rules

- **Vitrify is a general-purpose build tool** — do not modify its plugin source (e.g. `packages/vitrify/src/node/plugins/quasar/index.ts`) as a workaround for a single app's configuration. Keep optimizations in the app config instead.
