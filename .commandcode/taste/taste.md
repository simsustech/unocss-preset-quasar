# Taste (Continuously Learned by [CommandCode][cmd])

[cmd]: https://commandcode.ai/

# Debugging

- When diagnosing an error, do not claim an external library/package has a "known bug" unless you can cite a specific issue, PR, or changelog entry confirming it. If the user pushes back (e.g., "Never had a problem myself"), own the uncertainty and investigate the actual root cause rather than doubling down on the claim. Confidence: 0.75
- When the user reports a UI bug with a general description (e.g., "labels overlapping in dense inputs"), do not assume which specific component/class is at fault based on code structure analysis alone. Ask the user to clarify which DOM element or component they see the issue on, or get a precise reproduction description before diving into investigation. Pre-investigation assumptions waste time on unrelated components. Confidence: 0.70

# Workspace

- Do not use packages/dev in unocss-preset-quasar workspace; it is outdated. Use packages/preset instead. Confidence: 0.85
- The `quasar-dev` playground lives at ~/Projects/quasar-dev (outside this workspace), not inside the unocss-preset-quasar repo. Confidence: 0.85
- The `quasar-dev` playground is specifically created for testing unocss-preset-quasar changes; use `pnpm link` to symlink the local unocss-preset-quasar package into it. Confidence: 0.85
- For the quasar-dev playground: Playwright 1.61.0 has a known ESM loader bug (microsoft/playwright#41311) on Node 22 that breaks relative imports from spec files (`context.conditions?.includes is not a function`). Use Node 20 (`nvm use 20`) to work around this until Playwright 1.62 is released. Confidence: 0.85

# Debugging

- When diagnosing an error, do not claim an external library/package has a "known bug" unless you can cite a specific issue, PR, or changelog entry confirming it. If the user pushes back (e.g., "Never had a problem myself"), own the uncertainty and investigate the actual root cause rather than doubling down on the claim. Confidence: 0.75

# Fix-before-scale

- When something is broken (a failing test, a known error), fix that first before making broad changes across the rest of the codebase. Do not regenerate/rewrite dozens of files while a known issue remains unresolved — the mess compounds. Confidence: 0.80
- When unable to diagnose an issue after two attempts, stop investigating and pivot to cleaning up/refactoring the code instead of continuing to dig. Confidence: 0.75
- Before running a scripted change across many files, validate the approach on a single file first — then scale. Confidence: 0.75
- When you discover a known bug, version incompatibility, or configuration issue that explains a workaround (e.g., inlined code, duplicated logic), tell the user immediately instead of mass-refactoring the codebase around the workaround. Surface the root cause first, then act. Confidence: 0.90

# Workflow

See [workflow/taste.md](workflow/taste.md)

# Playground

- For the quasar-dev playground, prefer URL query-driven state for selectors/controls (e.g. style, props) so links are shareable and state survives reloads. Confidence: 0.70
- Store screenshots for different styles in different folders (e.g. separate folders per Quasar style/mode). Confidence: 0.75
- Use vision capability to analyze screenshots/images, not the read_file tool — read_file is for text files. When the user wants visual analysis of a screenshot, use the vision/attachment feature instead. Confidence: 0.85

# Code Quality

- When a shared module import fails (e.g., `import ... from '../helpers'`), investigate and fix the root cause (tsconfig, import extension `.ts` vs `.js`, module resolution) rather than working around it by inlining the same code into many files. Never duplicate shared utility code across dozens of files to bypass a configuration problem — fix the configuration. Confidence: 0.92

# Preset Styling

- When an MD3 component override shortcut replaces a base Quasar CSS class that sets `font-size` (e.g., `.q-toggle__inner { font-size: 40px }`), the override MUST include the font-size value. Without it, all em-based child dimensions (track, thumb, label spacing) collapse to the parent's inherited font-size (typically ~14px). This applies to any component whose children use em units for sizing. Confidence: 0.80

# Quasar Components

See [quasar-components/taste.md](quasar-components/taste.md)

# Playground UI

- The quasar-dev playground must use Quasar Framework components for its own UI (e.g. ControlPanel, controls, inputs, selects) — it is a Quasar demo app and should eat its own dogfood. Confidence: 0.85

# Preset Styling

See [preset-styling/taste.md](preset-styling/taste.md)

# Quasar Components

- When defining wrapper props/defaults for Quasar components (QSliderProps, QBtnProps, etc.), always cross-check against Quasar's actual prop schema (node_modules sources) — do not guess types like `''` for boolean-only props, since coercions to `undefined` can break library internals (e.g. `Object.keys(undefined)`). Confidence: 0.80

# Testing

- Add test scenarios to the component-specific test files, not to a centralized quirks.test.ts. Each component's tests should live in its own test file alongside the component implementation. Confidence: 0.70
- When writing ad-hoc verification scripts (one-off Node.js/Playwright scripts, inline tests) during investigation or debugging, incorporate them into the permanent test suite rather than discarding them as throwaway artifacts. Every test written — even exploratory ones — should become part of the test suite. Confidence: 0.85
- Prefer Playwright/visual tests in the quasar-dev playground (~/Projects/quasar-dev) over vitest unit tests in the unocss-preset-quasar repo. The quasar-dev playground is the primary testing environment; do not create test files inside unocss-preset-quasar when quasar-dev can serve as the test harness. Confidence: 0.70
- The quasar-visual-comparator tool produces false alarms (e.g., claiming wrong border-radius values that the source code already has correct). Always verify its findings against the actual source code before acting on them — never trust its analysis without source-level confirmation. Confidence: 0.85
- When writing verification/validation scripts that check CSS values against MD3 spec, derive the expected values from the spec itself (material_design_3_machine_spec.json) rather than hardcoding per-component allowlists. Component-based logic for spec compliance is backwards — the spec is the source of truth, not individual component expectations. Confidence: 0.75
