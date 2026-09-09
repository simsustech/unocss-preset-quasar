import type { Preflight } from '@unocss/core'

export const badgePreflights: Preflight[] = [
  {
    getCSS: () => `.q-badge {
  background-color: var(--q-primary);
  color: #fff;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  line-height: 1;
  min-height: 12px;
  font-weight: normal;
  vertical-align: baseline;
}
.q-badge--single-line {
  white-space: nowrap;
}
.q-badge--multi-line {
  word-break: break-all;
  word-wrap: break-word;
}
.q-badge--floating {
  position: absolute;
  top: -4px;
  right: -3px;
  cursor: inherit;
}
.q-badge--transparent {
  opacity: 0.8;
}
.q-badge--outline {
  background-color: transparent;
  border: 1px solid currentColor;
}
.q-badge--rounded {
  border-radius: 1em;
}
`
  }
]
