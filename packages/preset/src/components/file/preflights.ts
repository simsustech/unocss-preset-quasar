import type { Preflight } from '@unocss/core'

export const filePreflights: Preflight[] = [
  {
    getCSS: () => `.q-file .q-field__native {
  word-break: break-all;
  overflow: hidden;
}
.q-file .q-field__input {
  opacity: 0 !important;
}
.q-file .q-field__input::file-selector-button {
  cursor: pointer;
}
.q-file__filler {
  visibility: hidden;
  width: 100%;
  border: none;
  padding: 0;
}
.q-file__dnd {
  outline: 1px dashed currentColor;
  outline-offset: -4px;
}
`
  }
]
