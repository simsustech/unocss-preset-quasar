# 0006 — Explicit, tree-shaken style configuration

Status: accepted (2026-09-23)

## Context

The preset ships three style entries (`md3`, `md2`, `unstyled`) and used to emit
all of them unconditionally: every app paid for the token diff blocks and the
resets of styles it never switches to. Measured on the preflight layer alone,
an md3-only app carried 45,949 B where 25,635 B would do — 44 % of the layer is
the two styles it cannot reach without `setStyle()`. The component modules
compounded it: the ~60 literal resets that neutralise `Unstyled` lived inside the
component rules, so they shipped whatever the app listed.

Two properties were wanted at once: an app states which styles it uses, and a
style owns everything that makes it a style — its tokens _and_ the declarations
that no token can express.

## Decision

- `QuasarPreset()` throws unless `styles`/`style` is passed: guessing a default
  would either ship styles nobody asked for or make `setStyle()` a silent no-op.
- `styles: QuasarStyleEntry[]` lists the styles that ship; the **first entry is
  the baseline** (its tokens land on `body`, its rules ship unscoped), every other
  entry ships as a `body.quasar-style-{name}` switch block. `style` is shorthand
  for a one-entry list and is ignored when `styles` is given.
- `QuasarStyleEntry.rules` carries the declarations tokens cannot express. They
  ship if and only if the entry is listed.
- Style rules are owned by style folders (`src/styles/<name>/`), which is where
  the resets of the 60 component modules and of the ported QMarkdown sheet now
  live (`src/styles/unstyled/rules/`). Extension-targeting rules gate on **style**
  inclusion, not on `appExtensions`: the switch an app sets for them is listing
  the style (see ADR 0005 for the opt-in story they used to follow).
- Style rules are assembled through `src/rules/scope.ts`, which prefixes every
  top-level comma member of a yield's selector with `body.quasar-style-{name} `
  for non-baseline entries.

## Why not

- **Default to all three** (the previous behaviour, and what 0.5.5's `styles`
  option did): 44 % dead preflight for a single-style app, and the resets ship to
  apps that never switch.
- **Default to md3**: a footgun — `setStyle('md2')` would look like it worked
  while matching no block, and the failure is invisible in CSS.
- **Leave the resets in the modules that need them**: it splits ownership (the
  rule knows two styles: itself and unstyled), and it makes inclusion impossible
  to express — the app cannot say "I do not want the resets".

## Consequences

- A style that is not listed ships neither its token diff nor its rules, and
  `setStyle('<unlisted>')` falls back to the baseline silently: a runtime helper
  cannot know build-time configuration. Documented, not guarded.
- The baseline's rules ship unscoped, so listing `Unstyled` **first** applies the
  literal resets without any body class — a behaviour the class-scoped stubs could
  not express.
- Prefixing per comma member fixes a port defect: the QMarkdown resets had been
  prefixed on their first selector only, so md3 apps rendered syntax tokens as
  `inherit`. The gates are unit-level (the sheet's delta must be fully prefixed)
  and end-to-end (`tests/q-markdown.spec.ts` asserts the Prism colour in md3).
- `test/app-extensions-unstyled.test.ts` isolates the resets by dropping the
  style rather than the extension, which is the ownership this ADR states.
