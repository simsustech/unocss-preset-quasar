---
'unocss-preset-quasar': patch
---

Safelist the MD3 role classes, so a component's `color="error"` resolves to the token instead of silently painting the brand primary.

Quasar takes a colour *name* and applies the matching class at runtime: `color="error"` puts `text-error` on the element, and nothing in the consuming source ever says `text-error`. UnoCSS only emits candidates it can extract, so that class had **no rule**, the declaration fell back to the component's own variable, and a flat `q-btn` asked for `color="error"` painted `--q-primary` (measured in petboarding, 2026-10-14 — the same mechanism left an alert chip's teal glyph on a red fill). The palette block already carries its own family (`bg-negative`, `text-primary`, …); `md3TokenSafelist` is the role half of that contract, derived from the same list the colour rules use so the two cannot drift.

The family is semantic rather than cartesian — a role joins as `text-` unless it is a pure fill (`surface*`, `background`, `inverse-surface`, `shadow`, `scrim`) and as `bg-` unless it is an ink (`on-*`), which is what `markdown-dark.test.ts` refuses by name.

`md3Tokens` also moved into `core/colors/md3-tokens.ts`: it is not a rule list, so as a barrel export `emission.test.ts` counted it as a rule array `pickRules()` never sees.

`markdown-dark.test.ts`'s surface-role assertion now anchors on the declaration — `background-color:var(--q-surface-container-low)` contains `color:var(--q-surface-container-low)`, so the legitimate `bg-surface-container-low` utility tripped a check whose own comment says it is about *text* colour.
