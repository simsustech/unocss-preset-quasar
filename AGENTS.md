# AGENTS

## Dev server / background processes

This CommandCode session runs as a `node` process (the `cmd` binary
renamed itself to `node` in `/proc/.../status`). Any dev server or
long-running background process spawned from a shell command is a child
of this process tree. Killing it naively (e.g. `kill_shell` on its
parent, or signals that propagate up) will terminate this session.

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
files under `~/Projects/quasar-testing-harness/tests/components/`. Each Quasar
component gets its own `.spec.ts` — use `shot()` to capture screenshots
and `dumpDiagnostics()` for CSS variable dumps alongside them. Tests
use URL query parameters to configure component props (e.g.
`/q-toggle?style=md3&dense=true&modelValue=true`).

## Core principle: test, don't guess

Never theorize about CSS behavior — always run the tests and check actual output.
If something looks wrong, run the Playwright test, inspect the screenshot, or check
the diagnostics JSON dump before touching CSS. Guessing wastes time on phantom fixes.

## MD2/MD3 spec verification

The authoritative specifications are `material_design_3_machine_spec.json` and
`material_design_2_machine_spec.json` — Quasar SASS is reference only. Each spec has
been split into per-category files under `specs/` (MD3) and `specs/md2/` (MD2) for
efficient targeted reads.

The authoritative specification is `material_design_3_machine_spec.json` — Quasar SASS
is reference only. The spec has been split into per-category files under `specs/` for
efficient targeted reads.

### Verification procedure

1. **Read the spec** — open the relevant `specs/<category>.json` for the component
   you're validating.
2. **Map shape tokens** to pixel values:
   - `none`: 0, `extra-small`: 4px, `small`: 8px, `medium`: 12px, `large`: 16px,
     `extra-large`: 28px, `full`: Infinity
3. **Compare spec values against the UnoCSS file** at
   `packages/preset/src/styles/md3/components/<Component>.unocss.ts`.
4. **For Quasar's em-based components** (QToggle, QCheckbox), the `font-size` on
   the inner element is the scaling base: `height: 1em` means the rendered height
   equals `font-size`, `width: 1.625em` means width = `font-size × 1.625`. Derive
   the correct `font-size` by dividing the spec dimension by the em factor.
5. **Run Playwright tests with diagnostics** from the test harness at
   `~/Projects/quasar-testing-harness`:
   ```bash
   npx playwright test tests/components/<Component>.spec.ts --reporter=list
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

## SigMap context

SigMap generates a compact signature map of the codebase for AI
context. The output is written to `CLAUDE.md` (and
`.github/copilot-instructions.md`) in each project root.

**For the AI agent (self-instruction):**

1. **Read before acting** — At the start of every session, read
   `CLAUDE.md` in the relevant project root to understand the
   codebase structure without scanning every file.
2. **Ask for context** — When you need to find relevant files for a
   task, run `sigmap ask "<question>"` from the project root to get
   a ranked, miniaturized context. Use `--followup` for iterative
   questions.
3. **Regenerate on change** — After significant code changes, run
   `sigmap --diff` (for changed files only) or plain `sigmap` to
   refresh the context.
4. **Verify AI output** — Use `sigmap verify-ai-output <file>` to
   catch hallucinations (fake files, imports, symbols) before
   committing AI-generated code.
5. **sigmap ask, not grep/glob** — For finding relevant files, always
   use `sigmap ask` from the project root. Do NOT use grep, glob, or
   read_directory to scan for files across the codebase — that wastes
   tokens on directory listings and text searches that sigmap already
   indexes efficiently. Only use direct file reads when you already
   know the exact path.

**SigMap config is in `gen-context.config.json`** — only `packages/preset`
is scanned in this repo (per taste: `packages/dev` is outdated). If
you add new source directories, update `srcDirs` and regenerate.

For the quasar-testing-harness playground, SigMap runs in **monorepo mode** —
each package (`app/`, `api/`, `tools/`) gets its own `CLAUDE.md`.
The root `CLAUDE.md` has the creation-workflow block from `--init`.
