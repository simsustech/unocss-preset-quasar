---
'unocss-preset-quasar': patch
---

fix(preset): fit the dialog plugin to a phone, and cover Quasar 2.34's group and sentinel classes

Two mobile defects, one of them the homepage announcement dialog.

**The dialog plugin no longer overflows a phone.** Quasar's Dialog plugin
renders `.q-dialog-plugin` at a fixed `width: 400px`. Stock Quasar leaves the
dialog inner as a plain row flex — the runtime classes are
`… fixed-full flex-center` (QDialog.js) — so the 400px card's default
`flex-shrink: 1` pulls it inside a 375px viewport. The preset had given the
inner `flex-direction: column`, which moves the main axis to the vertical and
removes that horizontal shrink: measured at 375×667 the card sat at `x: -31`
(spilling 31px off the left edge; 56px at 320px), so a `$q.dialog({ title,
message })` such as petboarding's urgent homepage announcement did not fit the
screen. The inner is a row again, as stock renders it.

**The button-group and infinite-scroll classes Quasar 2.34 applies now resolve.**
2.34 moved the button group's corner collapse onto explicit
`q-btn-group--horizontal` / `q-btn-group--vertical` classes (QBtnGroup applies
one to every group) and split the infinite-scroll sentinel onto the edge it
marks (`__sentinel--top/--bottom/--start/--end`). The preset only carried the
2.31 selector shapes, so those runtime classes had no rule — the button-group
page reported two unstyled classes against the DOM arbiter. Both shapes are now
emitted: the 2.31 selectors stay for the recorded parity fixture, and the 2.34
ones are added alongside (a vertical group previously had no corners at all).

Also: `test/buttons-spec.test.ts`'s `block()` helper now finds a selector that
UnoCSS folded into a comma-joined list with its `--horizontal` twin, and strips
the `/* layer: … */` banner that otherwise became part of the selector text.
