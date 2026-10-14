# ADR 0020 — a class icon's glyph follows the icon slot, on a companion selector

Status: accepted (2026-10-14)

## Context

The reference sizes an icon **slot**, not a glyph. `.q-timeline__dot .q-icon` is
the worked example: a 31×38 box (`width: 100%` of the wider `__entry--icon` dot,
`height: 38px`) whose `font-size: 16px` and `line-height: 38px` centre a 1em
**font glyph** of the icon font over the 30×30 `::before` circle. The reference
also spells that 1em out for the two glyph sources the font cannot draw,
`.q-timeline__dot .q-icon > img` and `> svg { width: 1em; height: 1em }`.

A **class icon** — the mask glyph `presetIcons` gives Quasar, instantiated in
`src/index.ts` — is the element _itself_: `mask-size: 100% 100%` draws the icon
across the whole box. The 31×38 slot therefore stretched the glyph over the
circle and hid the marker. Measured on the dashboard before the fix: a 31×38
glyph on a 30×30 circle.

The reference cannot express this case — it never renders a class icon, so it
carries no rule for one — which is why `parity-coverage` reports `timeline` at
`target: 0` with no missing, absent or mismatch entries while the render is
visibly broken. Copying the reference's declarations faithfully is precisely
what produced the defect.

## Decision

**A component rule that sizes an icon slot must also size a class icon's glyph to
the reference's own `1em`, and centre it in the same slot.**

The reference yield stays **byte-identical**: `parity-report.mjs` compares the
reference's declarations per selector and refuses any gap in a finished module
(`packages/preset/test/fixtures/parity-baseline.json` → `timeline: { target: 0 }`),
so editing `width: 100%` in place reads as a mismatch. The correction therefore
rides a **companion selector** that wins on specificity, never on sheet order
(ADR 0019):

```ts
[symbols.selector]: (selector) =>
  `${selector}__dot .q-icon[class^="i-"], ${selector}__dot .q-icon[class*=" i-"]`,
width: '1em',
height: '1em',
'margin-top': 'calc((38px - 1em) / 2)',
'margin-inline': 'auto'
```

`(0,3,0)` beats the reference's `(0,2,0)`. The attribute selector also keeps the
carve-out honest: a font ligature or a `> svg` / `> img` glyph has no `i-` class
and keeps the reference's declarations untouched. Two attribute forms are needed
because Quasar renders `class="q-icon i-mdi-x row items-center justify-center"`
(`[class*=" i-"]`) while a consumer's class list may still start with the icon
class (`[class^="i-"]`).

Centring happens **in the slot, not in the dot**: the dot is as tall as the entry
(measured 134px), so `inset: 0; margin: auto` centres the glyph at `cy = 67` and
drops it into the rail. The circle's centre is `4px + 30px/2 = 19px` below the
dot's top edge, so in the reference's own 38px slot the glyph's top edge is
`(38px - 1em) / 2`.

## Consequences

- A component's icon-slot geometry is **not finished** until the class-icon case
  is stated. Port the reference verbatim and a mask glyph will fill the slot;
  the parity gate cannot see it, because the reference has the same gap by
  construction.
- Reviewers must not merge the companion selector into the reference yield. One
  satisfies the parity ratchet, the other the cascade, and the comment says
  which is which (the same split ADR 0013 records).
- `width` and `margin-inline` are not watched by `no-role-literals.test.ts`, but
  `height: 1em` is — the yield carries its own `// quasar:` marker, since the
  guard scans per yield.
- Guarded in the preset by `packages/preset/test/timeline-dot-icon.test.ts` and
  in the harness by `tests/q-timeline-dot.spec.ts` (BUG-087). The harness spec is
  the load-bearing guard: a future rule that stretches any component's `.q-icon`
  will not fail the parity gate.
