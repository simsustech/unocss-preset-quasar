# ADR 0007 — one overlay layering scale; the overlay drawer sits above the marginals and below the dialogs

Status: accepted (2026-09-28); amended 2026-10-05 — the overlay drawer moved
above _both_ marginals, because at 1500 it painted over the drawer's own
content (see [Consequences](#consequences)).

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

### What the first correction missed (2026-10-05)

The 2026-09-28 answer put the overlay drawer at 1500, _under_ both marginals, to
buy back the app bar. That traded one unreachable surface for two: the drawer's
box spans the whole viewport — `Md3Layout.vue` lays its shell out as
`view="lHh Lpr lFf"`, which puts the drawer in the **header row**, and Quasar
then skips the `top` offset it applies when `headerSlot` is false
(`if ($layout.header.space && !headerSlot.value) css.top = …`, where
`headerSlot` is `$layout.rows.top[0] === 'l'`), leaving only the
`q-drawer--top-padding` class — which neither stock `quasar.css` nor the
reference bundle uses for anything but `env(safe-area-inset-top)`.

So with the drawer at 1500 and the marginals at 2000:

- the app bar painted over the drawer's own close button (`elementFromPoint` at
  its centre returned the header's `.q-toolbar__title`);
- the fixed bottom nav painted over the drawer's last nav item.

Both were neither visible to the pointer nor tappable, measured in
`tests/md3-layout.spec.ts` in the harness. Neither reference has ever been in
that state: the reference bundle keeps the overlay drawer at 7000 and stock
`quasar.css` at 3000, both above the marginals.

## Decision

One scale, stated once. Ordered lowest to highest:

| tier                | z                                                    | members                                                                                                     |
| ------------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| content             | `0`/auto                                             | page content                                                                                                |
| floating content    | **1400**                                             | `.q-page-sticky` (was 7000)                                                                                 |
| side panel, in flow | 1000                                                 | `.q-drawer`                                                                                                 |
| marginals           | 2000 / opener 2001                                   | `.q-header`, `.q-footer`, `.q-bar`, `z-marginals`, `.q-drawer__opener`                                      |
| side panel, overlay | **3000** / backdrop **2999** (reference 7000 / 6999) | `.q-drawer--on-top`, `.q-drawer__backdrop`                                                                  |
| menus and dialogs   | 6000                                                 | `.q-menu`, `.q-dialog`, `.q-table` head, `.q-carousel`, `z-fullscreen` (mediaplayer's 5900 sits just below) |
| top utility         | 7000                                                 | `z-top`                                                                                                     |
| tooltip             | 9000                                                 | `.q-tooltip`                                                                                                |
| notify and loading  | 9499 / 9500                                          | `.q-notification`, `.q-loading`                                                                             |
| maximum             | 9998                                                 | ajax bar, `z-max`                                                                                           |

3000 / 2999 are `quasar.css`'s own numbers, so the overlay tier now agrees with
upstream on both its value and its `!important`; what stays ours is the _ceiling_
below.

The contract, in edges:

- **overlay drawer > both marginals** — the drawer's content runs the full
  viewport height, so anything at or below 2000 paints over the drawer's own
  first and last rows. It must outrank the app bar _and_ the bottom nav: at
  1500 the close button sat under `.q-header` and the last nav item under
  `.q-footer`, neither reachable (`tests/md3-layout.spec.ts` — "the drawer's
  close button is reachable over the app bar", "the last drawer nav item is
  reachable with the bottom nav shown").
- **overlay drawer < menus/dialogs** — the edge this ADR exists for: an open
  drawer must not cover the app's modals, and a dialog's own toolbar controls
  (Submit at `y < 50`) stay hittable. This is what the reference's 7000 broke
  and what 3000 preserves.
- **overlay drawer > floating content** — a modal drawer blocks the page's
  floating action buttons while it is open, instead of showing them through the
  scrim.
- **marginals < menus/dialogs** — unchanged: a dropdown opened from a header
  button renders outside it.
- **drawer opener (2001) > marginals** — unchanged from the reference: the hover
  strip that opens a hidden drawer spans the full height, including next to the
  app bar. It is now below the overlay drawer, which is correct: the strip exists
  to open a _closed_ drawer, and nothing should show through the open one.
- menus and dialogs share 6000 on purpose: a menu opened from inside a dialog is
  portaled later in the DOM and wins by order — Quasar's own convention.

## Why not

- **Raise the header and dialogs instead** (what the consumer did): the fix lives
  in every app rather than in the layer that caused it, each raised layer forces
  the next one up, and the order is unrecoverable without reading one app's
  `<style>` block. That is how the stack became folklore.
- **Keep the reference's 7000**: only its ceiling is rejected. 7000 sits above
  `.q-dialog` (6000), so an open drawer covers the app's modals — the half
  consumers actually had to patch out. The parity gate is selector-level; this
  changes declarations and no selector, so it stays green while the ordering
  becomes ours to define.
- **Keep the drawer under the marginals** (the 2026-09-28 answer, 1500 / 1499):
  it bought the app bar's hittability at the drawer's expense, and a drawer you
  cannot operate is worse than an app bar you cannot reach behind a modal. The
  alternative — padding the drawer's content clear of the app bar — has no exact
  value in CSS: Quasar measures the header in JS (`$layout.header.size`) and
  writes it only as an inline `padding-top` on `.q-page-container`, so the offset
  would have to be a guessed token that is short behind any header carrying tabs.
  That work belongs to the layout component that renders both the header and the
  drawer, not to the layer that stacks them.

## Consequences

- Consumers delete their z-index overrides. A consumer that still needs one is
  reporting a hole in this scale — it belongs here, not in the app.
- `.q-page-sticky` stays in a below-overlay tier; the preset's 7000 was a
  parity-era addition the reference does not carry.
- **The reversal to carry forward:** the first decision traded the drawer's
  reachability for "the app bar stays visible and clickable over an open mobile
  drawer" (petboarding states that design, and gates it in
  `layout-polish.spec.ts` — "header controls are hittable at 375px"). That gate
  now fails while a drawer is open, **by design**: the scrim (2999) and the
  drawer (3000) both sit above the app bar (2000), so the bar behind a modal
  drawer is dimmed rather than interactive. Consumers gating on it must restate
  the expectation; the drawer is the modal surface.
- Five selectors now intentionally diverge from the reference's declarations. The
  register lives here, each entry naming the changeset that ships it:
  - `.q-drawer--on-top` (7000 → **3000**) and `.q-drawer__backdrop`
    (6999 → **2999**, `!important` kept) — the overlay tier above
    (`overlay-drawer-above-marginals.md`);
  - `.q-page-sticky` — floating content, above;
  - `.q-calendar-month__body` (`overflow-x: auto` beside the ported
    `overflow: hidden`) and `.q-field__before:empty` (`display: none`, the twin
    of the reference's own `.q-field__after:empty`) — ported-stylesheet repairs
    (`calendar-body-scrolls.md`, `field-empty-before-hidden.md`).
- Proof: the harness drives the shell at 375×667 and reaches both ends of the
  open drawer — `tests/md3-layout.spec.ts`: "the drawer's close button is
  reachable over the app bar", "the last drawer nav item is reachable with the
  bottom nav shown", "a tap on the last drawer nav item reaches it". The
  declaration side is guarded in `packages/preset/test/drawer-backdrop.test.ts`
  ("outranks the app bar and the bottom nav, and stays under dialogs") — a gate
  the parity report cannot give, because it compares declarations without their
  ordering against each other.
- petboarding's dialog specs still prove the edge that motivated this ADR: an
  open drawer stays under dialogs, with the overrides deleted.
