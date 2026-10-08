---
'unocss-preset-quasar': patch
---

Stop the class-vocabulary generator inventing class names. Two scans fabricated
vocabulary that Quasar never emits, and because `compose-safelist.mjs` treats
every component-vocabulary entry as "the extractors supply it", each fake name
silently deleted a real `src/safelist.ts` entry:

- Sass nesting was expanded against every `.q-*` root a file mentions rather than
  the block each `&` sits in. `QTable.sass` mentions `.q-table`, `.q-markup-table`,
  `.q-separator`, `.q-field`, `.q-inner-loading`, `.q-linear-progress` and the
  `--dark`/`--loading` variants, so each of its ~38 `&__`/`&--` suffixes was
  multiplied against all of them — `q-separator__sort-icon`,
  `q-table--dark__card`, `q-field__progress`. The generator now tracks the
  enclosing block by indentation and expands `&` against the nearest selector.
- Selector scanning read `.vue` SFCs whole, so Vue expressions parsed as CSS:
  `{{ scope.row.calories }}` and `scope.col.label` in Quasar's own table fixtures
  became the classes `calories`, `col`, `cols`, `key`, `label`, `name`, `page`.
  Only a `.vue` file's `<style>` blocks are scanned now.

The fabricated names made `col` look extractor-supplied, so re-running the
safelist composer dropped it and every QBtn label sat 9.6px high
(`.q-btn__content` 43.125px → 24.0156px). The same accident had been supplying
the flexgrid container `row`, which is now carried in the safelist with its
`column`/`flex` siblings. The vocabulary shrank by ~3,000 fabricated entries,
and `test/vocabulary-shape.test.ts` guards both scans against re-fabricating.
