# ADR 0021 — a role class is safelisted, because the DOM asks for names no source spells

**Status:** accepted · **Context:** the preset generates `text-`/`bg-` utilities for
every MD3 role, and Quasar's `color` prop applies one of them at runtime.

## Context

UnoCSS emits a candidate only when it can extract it. Quasar takes a colour
_name_ and applies the matching class itself: `color="error"` puts `text-error`
on the element, and no file in a consuming app ever says `text-error`. That is
the exact contract `safelist.ts` exists for — its header lists "classes Quasar
applies with no signal in the consuming source" — and the file carried the
Quasar palette family (`bg-negative`, `text-primary`, …) while carrying **none**
of the roles the preset's own colour rules generate.

Measured in petboarding (2026-10-14): a flat `q-btn` asked for `color="error"`
painted `rgb(0,105,109)` — `--q-primary` — because the class the DOM asked for
had no rule, so the declaration fell back to `--q-btn-flat-color`. The same gap
is what left an alert chip's teal glyph on a red fill.

Specificity was never the blocker. `.text-error` is emitted **after**
`.q-btn--flat` in the sheet, so a token utility wins the tie on order — which is
ADR 0019's rule — but only once it exists.

## Decision

**The MD3 role family joins the safelist, derived from the same list the colour
rules read, and it joins semantically rather than cartesian:**

```ts
export const md3TokenSafelist: string[] = md3Tokens.flatMap((token) => [
  ...(isFillOnly(token) ? [] : [`text-${token}`]),
  ...(isInk(token) ? [] : [`bg-${token}`])
])
```

A role is a `text-` class unless it is a pure fill (`surface*`, `background`,
`inverse-surface`, `shadow`, `scrim`) and a `bg-` class unless it is an ink
(`on-*`). Deriving both from one list keeps the safelist and the rule table from
drifting; the two exclusions are the combinations `markdown-dark.test.ts` refuses
by name — painting text with a surface role, and putting a light ink behind text.

That role list moves to `core/colors/md3-tokens.ts`. It is array-shaped, so as an
export on the `core` barrel `emission.test.ts` reads it as a rule array
`pickRules()` never sees ("rule arrays that pickRules() never sees:
core.md3Tokens" was this change's first red test); nothing re-exports the new
module, so the barrel stays free of it while the rules and the safelist share one
list.

## Consequences

- A role class now exists whether or not a source names it: a component asked for
  a colour name renders that token. The sheet carries 44 more utilities (21
  `text-` for 34 roles minus 13 fills, 23 `bg-` minus 11 inks), which is the
  intended trade — the family is what `color="<role>"` is documented to accept.
- A new role must not be added to `md3Tokens` without checking the two exclusion
  predicates: a role whose name starts with `surface-` is a fill by definition
  here, and an `on-` role is an ink.
- `md3Tokens` must not move back into a barrel. The guard is name-based, not
  semantic: any non-`*Rules` array export the barrel carries is a failure.
- `markdown-dark.test.ts`'s surface-role assertion now anchors on the declaration
  (`(?:[;{])color:var(…)`). Its previous `not.toContain('color:var(…)')` matched
  `background-color:var(…)` as a substring, so the legitimate
  `bg-surface-container-low` utility tripped a check whose own comment says it is
  about _text_ colour.
- Guarded by `packages/preset/test/safelist-md3-tokens.test.ts`: the derivation
  counts both directions, every class is emitted from an **empty source**, each
  class resolves to `var(--q-<token>)`, and `.text-error` is emitted after
  `.q-btn--flat`. The empty-source assertion is the load-bearing one — a rule
  table can be complete while a class the DOM asks for still has no rule.
