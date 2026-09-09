import type { Preflight } from '@unocss/core'

export const tooltipPreflights: Preflight[] = [
  {
    getCSS: () => `.q-tooltip--style {
  font-size: 10px;
  color: #fafafa;
  background: #757575;
  border-radius: 4px;
  text-transform: none;
  font-weight: normal;
}
.q-tooltip {
  z-index: 9000;
  position: fixed !important;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 6px 10px;
  width: max-content;
  max-width: 95vw;
  max-height: 65vh;
}
`
  }
]
