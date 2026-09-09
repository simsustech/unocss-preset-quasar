import type { Preflight } from '@unocss/core'

export const paginationPreflights: Preflight[] = [
  {
    getCSS: () => `.q-pagination input {
  text-align: center;
  appearance: textfield;
}
.q-pagination input::-webkit-outer-spin-button,
.q-pagination input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.q-pagination__content {
  --q-pagination-gutter-parent: -2px;
  --q-pagination-gutter-child: 2px;
  margin-top: var(--q-pagination-gutter-parent);
  margin-left: var(--q-pagination-gutter-parent);
}
.q-pagination__content > .q-btn, .q-pagination__content > .q-input, .q-pagination__middle > .q-btn {
  margin-top: var(--q-pagination-gutter-child);
  margin-left: var(--q-pagination-gutter-child);
}
`
  }
]
