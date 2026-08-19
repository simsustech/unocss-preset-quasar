---
'unocss-preset-quasar': patch
---

fix: emit `.all-pointer-events` as a preflight so QDialog menus stay clickable

`all-pointer-events` was defined as a static rule, but `@unocss/preset-wind4`'s
`all` scope variant (`scopeMatcher("all", " ")`) consumes the `all-` prefix of
`all-pointer-events`, so the rule never matched (`parseToken` returned null)
and the class CSS was never generated. Quasar's QDialog internal menu portal
relies on `.all-pointer-events { pointer-events: all !important }`; without it,
dropdown options rendered inside dialogs were unclickable (a `q-field__bottom`
element intercepted pointer events).

Move the class into the preset's preflights (which bypass token matching) and
keep it in the safelist.