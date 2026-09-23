---
"unocss-preset-quasar": minor
---

close the rule audit: the classes Quasar ships that this sheet never styled

A by-hand audit of all 101 rule modules against `quasar/dist/quasar.css` (the
arbiter), the vendored reference bundle (regression cross-check) and Quasar's
documented API, then the fixes it produced.

**Added — classes and regions that had no rule at all:** the `q-document--*`
scroll-lock family the 2.31 runtime actually sets; the ripple directive's
`q-ripple*`; the ajax-bar; the bottom-sheet members; the `q-drawer`,
`q-tabs__arrows--inside` and `q-slider--enabled` gaps; the platform
`*-only`/`*-hide` pairs (8 bodies); the pointer helpers `all-pointer-events` and
`no-pointer-events--children`; the whole animation-helper grammar
(`.animated.infinite|hinge|faster|fast|slow|slower|repeat-1..3|delay-1..5s`,
`dimmed`, `light-dimmed`, `q-animate--fade|--scale`, `rotate-45…315`); the helper
residue (`hide-scrollbar`, `scroll--mobile`, `z-fab`, `inset-shadow(-down)`,
`q-morph--internal`, `img.responsive`, `bg-brown`, `q-safe-area-padding`, the
table empty state, the field message animation, the direction-less flip pair);
the grid grammar's missing half (`col-xs-*`, bare `col-<bp>`, all offsets); 19
`@keyframes` the sheet referenced but never defined.

**Fixed — conflicts where a later yield silently won:** the badge is one merged
yield now (font-size 12px per dist, per-style corner, 16px box), the
linear-progress track keeps its token, the checkbox icon keeps 0.5em, the field
focus shadow reaches 0.5, the stepper gains its vertical axis, six dead matchers
that could never match a candidate are repaired, and the v1 `chat` module is
gone (dist styles no `q-chat*`; `message` covers the real family).

**0.x consumer impact.** New classes are emitted where Quasar's own stylesheet
had them and this preset had nothing, so an existing app gains styling it had
been missing — a drawer, a stepper's vertical rail, an animation helper, a
scrolled table header — and no previously-styled class loses its declarations.
The three cases where UnoCSS's token pipeline cannot route a class
(`all-pointer-events`, `light-dimmed`, and the reduce-motion `.animated`
override) ship through the preset's static CSS channel, so they are present
whether or not the class is scanned. `bg-brown`/`text-brown` and the animation
helpers are emitted by this preset instead of wind4, which changes nothing for
consumers unless they had re-declared them; the delegation rule and its
measurements are in `docs/adr/0002`.
