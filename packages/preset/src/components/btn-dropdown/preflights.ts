import type { Preflight } from '@unocss/core'

export const btnDropdownPreflights: Preflight[] = [
  {
    getCSS: () => `.q-btn-dropdown--split .q-btn-dropdown__arrow-container {
  padding: 0 4px;
}
.q-btn-dropdown--split .q-btn-dropdown__arrow-container.q-btn--outline {
  border-left: 1px solid currentColor;
}
.q-btn-dropdown--split .q-btn-dropdown__arrow-container:not(.q-btn--outline) {
  border-left: 1px solid rgba(255, 255, 255, 0.3);
}
.q-btn-dropdown--simple * + .q-btn-dropdown__arrow {
  margin-left: 8px;
}
.q-btn-dropdown__arrow {
  transition: transform 0.28s;
}
.q-btn-dropdown--current {
  flex-grow: 1;
}
`
  }
]
