import type { Preflight } from '@unocss/core'

export const togglePreflights: Preflight[] = [
  {
    getCSS: () => `.q-toggle {
  vertical-align: middle;
}
.q-toggle__native {
  width: 1px;
  height: 1px;
}
.q-toggle__track {
  height: 0.35em;
  border-radius: 0.175em;
  opacity: 0.38;
  background: currentColor;
}
.q-toggle__thumb {
  top: 0.25em;
  left: 0.25em;
  width: 0.5em;
  height: 0.5em;
  transition: left 0.22s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
  -webkit-user-select: none;
  z-index: 0;
}
.q-toggle__thumb .q-icon {
  font-size: 0.3em;
  min-width: 1em;
  color: #000;
  opacity: 0.54;
  z-index: 1;
}
.q-toggle__inner {
  font-size: 40px;
  width: 1.4em;
  min-width: 1.4em;
  height: 1em;
  padding: 0.325em 0.3em;
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}
.q-toggle__inner--indet .q-toggle__thumb {
  left: 0.45em;
}
.q-toggle__inner--truthy {
  color: var(--q-primary);
}
.q-toggle__inner--truthy .q-toggle__track {
  opacity: 0.54;
}
.q-toggle__inner--truthy .q-toggle__thumb {
  left: 0.65em;
}
.q-toggle__inner--truthy .q-toggle__thumb .q-icon {
  color: #fff;
  opacity: 1;
}
.q-toggle.disabled {
  opacity: 0.75 !important;
}
.q-toggle--dark .q-toggle__inner {
  color: #fff;
}
.q-toggle--dark .q-toggle__inner--truthy {
  color: var(--q-primary);
}
.q-toggle--dense .q-toggle__inner {
  width: 0.8em;
  min-width: 0.8em;
  height: 0.5em;
  padding: 0.07625em 0;
}
.q-toggle--dense .q-toggle__thumb {
  top: 0;
  left: 0;
}
.q-toggle--dense .q-toggle__inner--indet .q-toggle__thumb {
  left: 0.15em;
}
.q-toggle--dense .q-toggle__inner--truthy .q-toggle__thumb {
  left: 0.3em;
}
.q-toggle--dense .q-toggle__label {
  padding-left: 0.5em;
}
.q-toggle--dense.reverse .q-toggle__label {
  padding-left: 0;
  padding-right: 0.5em;
}
`
  }
]
