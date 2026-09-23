# CONTEXT — the vocabulary this repo argues in

Short glossary for anyone reading the audit, the fixes or the ADRs. Each term is
a mechanism that exists because a rule sheet has to be _verified_, not just
written.

## Vocabulary diff

`packages/preset/scripts/audit-vocabulary.mjs`. Every class token a matcher can
produce is collected and checked against the scraper's vocabulary
(`src/generated/quasar-classes.ts`) plus an allowlist. The gate is **zero
unknown tokens**: a matcher naming a class Quasar never emits is a bug, and a
runtime-applied class the scraper cannot see (`q-ripple__inner--enter`) needs an
allowlist entry _with a rationale_, not a silent pass.

## dist-coverage sweep

`specs/audit/coverage-sweep.mjs`. The inverse question: which classes does
`quasar/dist/quasar.css` style that this sheet never emits? It parses dist's
class set (comments stripped — the banner carries `quasar.css` and `github.com`),
feeds all of it to the preset as candidates, flags whatever the sheet never
emits, and **fails unless every flag has a row** in
`specs/audit/DISPOSITION.md`. "No new flags" is not the criterion: that passes on
the residue it was supposed to find.

Dispositions are `fix` (a defect, and the row names the commit), `wind4-covered`
(the delegation rule applies), `allowlisted` (vocabulary gap with a rationale),
`static-channel` (styled through the preflight CSS rather than a rule),
`equivalent` (dist's selector form is covered by a different selector this sheet
emits) and `deferred` (recorded work, with the reason).

## Delegation rule

wind4 ships part of Quasar's utility surface. This preset never re-declares a
class wind4 already emits **with the same declaration**; it does emit the class
when wind4's value differs (dist's `!important`, dist's 12px label). Every
disposition in `specs/audit/DISPOSITION.md` that says `wind4-covered` was
measured by generating wind4 alone, never inferred from the name.

## Reference-quirk shim

`specs/reference/raw/reference-bundle.css.txt` is a build of a consumer app, not
Quasar's own CSS: it is the regression cross-check, and where it carries a quirk
this sheet reproduces it deliberately. `q-file__dnd`'s malformed
`outline-color: color-mix(in oklab, 1px dashed currentColor …)` is the worked
example — dist is the arbiter for _what Quasar means_, the reference is the
arbiter for _what this port emitted_, and when they disagree the shim is labelled
in the source.

## Element-clip capture

`~/Projects/quasar-testing-harness/tests/audit-capture.spec.ts`. The audit's
screenshots clip to each component's own root (`.q-<slug>`), not the viewport,
so a visual diff points at the component rather than at surrounding page layout.
One Playwright run per component, PNGs plus ffmpeg frames for the animated ones,
recorded in a manifest — the mechanism the post-fix re-verification and the
harness's class-coverage baseline both build on.
