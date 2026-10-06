# ADR 0015 — the dialog inner is an unclamped full-viewport positioning box

Status: accepted (2026-10-06)

## Context

`.q-dialog__inner` is Quasar's positioning box for dialogs: QDialog.js renders it
with the runtime classes `… standard fixed-full flex-center`, i.e.
`position: fixed; inset: 0` — the whole viewport — with `flex-center` doing the
centering. The preset's base rule adds `display: flex` (the row direction the
main-axis shrink needs) but had also declared `max-width: 90vw; max-height: 90vh`.

That clamp was an inheritance from the surface-era design, when the _inner_ was
painted as a white panel (the clamp limited that panel's size). The surface later
moved to the card (ADR-era fix recorded in `dialog-backdrop.test.ts`), but the
declarations stayed — and `dialog-backdrop.test.ts` even asserted
`max-width:90vw`, so the clamp looked load-bearing when it was not.

It was worse than unnecessary: a `max-*` clamp on a fixed box with all four
insets set is **over-constrained** — the `left`/`top` pair wins and `right`/`bottom`
are dropped — so the centering box landed at `(0, 0)` sized 90vw × 90vh instead of
covering the viewport. `flex-center` then centred every card inside that top-left
anchored box, drifting dialogs off-centre by exactly 5vw / 5vh. Measured in
`quasar-testing-harness`: the petboarding plugin dialog at 546 × 1146 sat at
left 45.7 / right 100.3 (top 400.7 / bottom 515.3); the ResponsiveDialog fixture at
1280 × 800 at left 32 / right 160.

Neither the reference bundle nor stock Quasar sizes this element: the reference's
`.q-dialog__inner` carries only `outline-width: 0`, and `quasar.css` only
`outline: 0`.

## Decision

`.q-dialog__inner` carries no size clamp — no `max-width`, no `max-height`, no
surface, no elevation. It is the transparent full-viewport positioning box that
Quasar's `fixed-full flex-center` expects, and the card is the dialog's surface.

Fitting a dialog to the viewport is the _child's_ job, where both references put
it: `.q-dialog__inner > div { max-width: 560px }`,
`.q-dialog__inner--minimized > div { max-height: calc(100vh - 48px) }`, plus the
row-flex `flex-shrink` that pulls an oversized card (the Dialog plugin's fixed
400px card) inside a phone screen.

## Consequences

- Never re-add `max-width`/`max-height` to `.q-dialog__inner` for "fit" reasons:
  it re-introduces the off-centre box. Fit is guarded by the harness specs
  (`tests/q-dialog-announcements.spec.ts` for on-screen fit,
  `tests/q-dialog-centering.spec.ts` for symmetric margins), not by sizing the
  positioning box.
- The comment in `packages/preset/src/components/dialog/rules.ts` and the
  `dialog-backdrop.test.ts` inner case both encode this as a negative assertion
  (`not.toContain('max-width')`), so a reintroduction fails the unit suite.
