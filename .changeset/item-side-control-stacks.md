---
'unocss-preset-quasar': minor
---

Stack an item's row when its trailing slot holds a control, on phones.

The item anatomy gives the side section `flex: 0 1 auto` with no shrink on its
content, and the main section `min-width: 0` with a `nowrap`, clipped label. A
wide control in that slot therefore takes its full intrinsic width out of the
row and the label keeps the remainder. Measured in petboarding's relation
picker at a 360px viewport: a `q-rating` at `size="2em"` is 218px of a 342px
row, leaving the label **76px of the 207px** its text needs — `name1 lastName1
- name1 - Male` renders as `name1 las…`, and the stars beside it read as if they
had replaced the name.

Neither side can give: Quasar writes the rating's size inline (a stylesheet
cannot shrink it without `!important`), and the label is `nowrap` by design.
So below the phone breakpoint the row stacks instead — the label takes the
row's full width and the control sits under it, left-aligned, at its own size:

```css
@media (max-width: 599.98px) {
  .q-item:has(> .q-item__section--side :is(.q-rating, .q-toggle, .q-checkbox, .q-radio)) {
    flex-direction: column;
    align-items: stretch;
    row-gap: 4px;
  }
  /* side: padding 0, min-width 0, flex-start — the first icon lines up with the label */
  /* label: white-space: normal; overflow: visible */
}
```

Scoped to the state controls — a rating, a toggle, a checkbox, a radio — not to
every control. Those are the ones whose intrinsic width can exceed the row's
spare space. A trailing **button** stays one line on purpose: it is one control
wide (~72px with its label) and leaves the label 240 of 272px, so including
`button` in the selector only restyled rows that were never squeezed. Measured on
petboarding's pet card at 360px, `button` in the list turned each of its three
section-header rows from **65px into 145px** and gained no legibility. A row whose
side is a badge, an icon or an avatar is untouched for the same reason.
The same 599.98px edge as the dialog's phone rules; the label measured 304px of
304 at 360px and 356 of 356 at 412px after the change, with the rating still
42px per star for the touch target.
