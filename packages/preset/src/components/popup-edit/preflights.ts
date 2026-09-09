import type { Preflight } from '@unocss/core'

export const popupEditPreflights: Preflight[] = [
  {
    getCSS: () => `.q-popup-edit {
  padding: 8px 16px;
}
.q-popup-edit__buttons {
  margin-top: 8px;
}
.q-popup-edit__buttons .q-btn + .q-btn {
  margin-left: 8px;
}
`
  }
]
