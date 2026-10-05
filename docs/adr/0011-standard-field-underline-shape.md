# ADR 0011 — standard field corners follow the Material underline container

Status: accepted (2026-10-05)

## Context

petboarding reported the default (`q-field--standard`) field rendering "bottom rounded, top
square" under md3. The cause is the base `.q-field__control` radius (`field/rules.ts`,
`var(--q-radius-sm)`) leaking into the standard rule, which overrides only the two top corners
with `inherit`.

Neither machine spec defines the standard/underline variant — `specs/text_fields_and_search.json`
(md3) and `specs/md2/core_component_design_specifications.json` cover filled and outlined only —
and `m3.material.io` is a client-rendered SPA that scrapes empty. `specs/reference/README.md`
already states the policy for that case: the production implementations are the authoritative
encoding. Quasar's own `quasar/dist/quasar.css` renders the standard control with no radius at
all (square), and the parity reference bundle renders it square too, while pinning the declaration
text `border-top-left-radius: inherit; border-top-right-radius: inherit` on
`.q-field--standard .q-field__control`.

## Decision

The standard (underline) field container follows the Material underline shape: **top corners
`md.sys.shape.corner.extra-small` (4dp/4px), bottom corners `none` (0), underline straight** —
the default of Flutter's `UnderlineInputBorder`
(`packages/flutter/lib/src/material/input_border.dart`: "the top left and right corners have a
circular radius of 4.0"; bottom radii zero). This is the same container shape as filled
(`4px 4px 0 0`).

Mechanically: the base control radius is deleted (no variant may read a base radius — quasar's
rule, which IS followed), and `.q-field__inner` carries the top radii as
`var(--q-corner-extra-small)` so the parity-pinned `inherit` resolves per style (md3 4px,
md2 4px once `shape.cornerExtraSmall` is corrected from 3px, unstyled 0).

## Consequences

- Standard and filled share a container shape; they stay distinct via the underline/state line
  and hover/focus layers.
- The `rounded` prop stays a no-op for standard (quasar parity); it keeps working for
  filled/outlined/standout through their own control rules.
- The parity ratchet stays green: the reference-declared `inherit` text is unchanged, and the
  added/removed properties are ours-only (never compared).
- Quasar's square render for this variant is deliberately not followed; any future "why not
  square like quasar.css?" re-litigation starts here.
