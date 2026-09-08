import type { Preflight } from '@unocss/core'

/**
 * separator component styles — auto-generated from quasar.css.
 * Contains all .q-separator selector blocks (variants, states, pseudo-elements).
 */
export const separatorComponentPreflight: Preflight = {
  getCSS:
    () => `.q-separator--spaced + .q-item__label--header, .q-list--padding .q-item__label--header {
  padding-top: 8px;
}

.q-separator {
  border: 0;
  background: rgba(0, 0, 0, 0.12);
  margin: 0;
  transition: background 0.3s, opacity 0.3s;
  flex-shrink: 0;
}

.q-separator--dark {
  background: rgba(255, 255, 255, 0.28);
}

.q-separator--horizontal {
  display: block;
  height: 1px;
}

.q-separator--horizontal-inset {
  margin-left: 16px;
  margin-right: 16px;
}

.q-separator--horizontal-item-inset {
  margin-left: 72px;
  margin-right: 0;
}

.q-separator--horizontal-item-thumbnail-inset {
  margin-left: 116px;
  margin-right: 0;
}

.q-separator--vertical {
  width: 1px;
  height: auto;
  align-self: stretch;
}

.q-separator--vertical-inset {
  margin-top: 8px;
  margin-bottom: 8px;
}

`
}
