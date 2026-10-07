# ADR 0018 — transition phases expand inside the extractor

Status: accepted (2026-10-07)

This is **ADR 0018**, not 0017: the plan that added the extractor pass numbered
it 0017, but the icon-set ADR was created first (2026-10-07 13:40 versus 15:40)
and took that number.

## Context

Quasar composes some transitions at runtime, with no prop to declare them:
`QDate`'s month slide is `'q-transition--slide-' + monthDirection.value`
(`QDate.js:1524`) and its label jump is `'q-transition--jump-' + dir`
(`QDate.js:1418`). These are internal transitions — the consumer's markup
carries no `transition-*="name"` attribute — so `quasarValueExtractor`, which
reads those attributes, never sees them. The class scraper
(`scripts/generate-quasar-classes.mjs`) records only the fragments it can find
in `QDate`'s vocabulary (`q-transition--slide-`, `q-transition--jump-`, and the
base `q-transition--fade`), never the six phase classes Vue toggles
(`-enter-from`, `-enter-active`, `-enter-to`, `-leave-from`, `-leave-active`,
`-leave-to`). A safelist cannot close the gap either: it would have to
enumerate app-authored names, including future ones, by hand.

Measured consequence (`quasar-testing-harness`, 2026-10-07): the leaving grid
took `q-transition--slide-left-leave-active` (so it became `position: absolute`)
but never `q-transition--slide-left-leave-to`, so its `transform` stayed `none`
and it painted on top of the entering grid — every day number appeared twice for
the length of the slide. Injecting
`.q-transition--slide-left-leave-to{transform:translate3d(-100%,0,0)}` moved it
(left 507 → 314.9).

## Decision

`quasarComponentExtractor` completes the six phases for any transition family or
direction fragment in a component's vocabulary. A family
(`q-transition--fade`, `q-transition--slide-left`) yields all six phases; a
dangling fragment that Quasar concatenates a direction onto
(`q-transition--slide-`, `q-transition--jump-`) yields both directions
(`left`, `right`) × six phases. A class that already names a phase, and the bare
`q-transition--`, are left alone.

## Consequences

- The vocabulary stays generated/scraped: no transition list is maintained by
  hand. The direction set is exactly `left`/`right` — the two literals `QDate`
  passes, both of which occur regardless of `$q.lang.rtl`.
- A family recorded by a component now yields all six phases even where only
  some are used, so a page that names that component carries a few unused
  rules. That coarseness is the price of not enumerating runtime-composed names;
  an unmatched candidate is inert.
- The safelist stays free of transition names.
- `generate-quasar-classes.mjs` is unchanged: the fragments it already records
  are this pass's input.
