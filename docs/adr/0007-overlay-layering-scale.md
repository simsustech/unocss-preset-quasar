# ADR 0007 — one overlay layering scale; the overlay drawer sits under the app bar

Status: accepted (2026-09-28)

## Context

This preset owns every layer a Quasar app stacks, and it owned them as unrelated
numbers:

| selector                                     | value       | rule                                                              |
| -------------------------------------------- | ----------- | ----------------------------------------------------------------- |
| `.q-drawer`                                  | 1000        | `components/drawer/rules.ts`                                      |
| `.q-header`, `.q-footer` (`z-marginals`)     | 2000        | `components/header/rules.ts`, `components/footer/rules.ts`        |
| `.q-drawer__opener`                          | 2001        | `components/drawer/rules.ts`                                      |
| `.q-menu`, `.q-dialog`, table head, carousel | 6000        | `components/menu/rules.ts`, `components/dialog/rules.ts`, …       |
| `.q-page-sticky`                             | 7000        | `components/page/rules.ts`                                        |
| `.q-drawer__backdrop`                        | 6999        | `components/drawer/rules.ts`                                      |
| `.q-drawer--on-top`                          | 7000        | `components/drawer/rules.ts`                                      |
| `.z-top`                                     | 7000        | `core/visibility/rules.ts`                                        |
| `.q-tooltip`                                 | 9000        | `components/tooltip/rules.ts`                                     |
| notification / loading                       | 9499 / 9500 | `components/notification/rules.ts`, `components/loading/rules.ts` |
| ajax bar / `.z-max`                          | 9998        | `components/ajax-bar/rules.ts`, `core/visibility/rules.ts`        |

Two consequences fell out of that, both measured in a consumer
(petboarding, `packages/app/src/layouts/MainLayout.vue`):

1. **An open overlay drawer painted over everything but the notify layer.** The
   reference bundle states `.q-drawer--on-top: 7000` and
   `.q-drawer__backdrop: 6999`, so the drawer beat the app bar (2000) _and_ the
   dialog layer (6000). At 375px the fixed drawer spanned `0..812` and covered
   the header's Login/overflow/user controls outright (`elementFromPoint` returned
   the drawer container's row), and the app's dialogs were reachable only because
   the app had already raised them.
2. **The consumer's fix could not stop at one override.** It raised the header to
   `7100`, which then covered dialogs, so it raised dialogs to `7200` — two
   `!important` bumps, each forcing the next, with the ordering recorded only in
   comments in one app. `.q-page-sticky` at 7000 was a third hole: a floating
   action button would have painted above a dialog, although the reference sets no
   z-index on that selector at all.

## Decision

One scale, stated once. Ordered lowest to highest:

| tier                | z                                              | members                                                                                                     |
| ------------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| content             | `0`/auto                                       | page content                                                                                                |
| floating content    | **1400**                                       | `.q-page-sticky` (was 7000)                                                                                 |
| side panel, in flow | 1000                                           | `.q-drawer`                                                                                                 |
| side panel, overlay | **1500** / backdrop **1499** (was 7000 / 6999) | `.q-drawer--on-top`, `.q-drawer__backdrop`                                                                  |
| marginals           | 2000 / opener 2001                             | `.q-header`, `.q-footer`, `.q-bar`, `z-marginals`, `.q-drawer__opener`                                      |
| menus and dialogs   | 6000                                           | `.q-menu`, `.q-dialog`, `.q-table` head, `.q-carousel`, `z-fullscreen` (mediaplayer's 5900 sits just below) |
| top utility         | 7000                                           | `z-top`                                                                                                     |
| tooltip             | 9000                                           | `.q-tooltip`                                                                                                |
| notify and loading  | 9499 / 9500                                    | `.q-notification`, `.q-loading`                                                                             |
| maximum             | 9998                                           | ajax bar, `z-max`                                                                                           |

The contract, in edges:

- **overlay drawer < marginals** — the app bar stays visible and clickable over
  an open mobile drawer (petboarding states the design as "top app bar above the
  navigation drawer"), and a drawer left mounted can no longer sit on top of the
  page's controls.
- **marginals < menus/dialogs** — a dialog's own toolbar controls (Submit at
  `y < 50`) must be hittable; a dropdown opened from a header button must render
  outside it.
- **overlay drawer > floating content** — a modal drawer blocks the page's
  floating action buttons while it is open, instead of showing them through the
  scrim.
- **drawer opener (2001) > marginals** — unchanged from the reference: the hover
  strip that opens a hidden drawer spans the full height, including next to the
  app bar.
- menus and dialogs share 6000 on purpose: a menu opened from inside a dialog is
  portaled later in the DOM and wins by order — Quasar's own convention.

## Why not

- **Raise the header and dialogs instead** (what the consumer did): the fix lives
  in every app rather than in the layer that caused it, each raised layer forces
  the next one up, and the order is unrecoverable without reading one app's
  `<style>` block. That is how the stack became folklore.
- **Keep the reference's 7000**: the reference describes Quasar's behaviour —
  an overlay drawer above the app bar — which is precisely what consumers have to
  patch out. The parity gate is selector-level; this changes three declarations
  and no selector, so it stays green while the ordering becomes ours to define.

## Consequences

- Consumers delete their z-index overrides. A consumer that still needs one is
  reporting a hole in this scale — it belongs here, not in the app.
- `.q-page-sticky` returns to a below-overlay tier; the preset's 7000 was a
  parity-era addition the reference does not carry.
- Five selectors now intentionally diverge from the reference's declarations. The
  register lives here, each entry naming the changeset that ships it:
  - `.q-drawer--on-top`, `.q-drawer__backdrop`, `.q-page-sticky` — the overlay
    tiers above (`overlay-layering-scale.md`);
  - `.q-calendar-month__body` (`overflow-x: auto` beside the ported
    `overflow: hidden`) and `.q-field__before:empty` (`display: none`, the twin
    of the reference's own `.q-field__after:empty`) — ported-stylesheet repairs
    (`calendar-body-scrolls.md`, `field-empty-before-hidden.md`).
- Proof: petboarding's gate (`layout-polish.spec.ts` — "header controls are
  hittable at 375px", "toasts stay out of the footer") plus its dialog specs, run
  with the overrides deleted.
