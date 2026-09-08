import type { Preflight } from '@unocss/core'

/**
 * tabs component styles — auto-generated from quasar.css.
 * Contains all .q-tabs selector blocks (variants, states, pseudo-elements).
 */
export const tabsComponentPreflight: Preflight = {
  getCSS: () => `.q-tabs {
  position: relative;
  transition: color 0.3s, background-color 0.3s;
}

.q-tabs--scrollable.q-tabs__arrows--outside.q-tabs--horizontal {
  padding-left: 36px;
  padding-right: 36px;
}

.q-tabs--scrollable.q-tabs__arrows--outside.q-tabs--vertical {
  padding-top: 36px;
  padding-bottom: 36px;
}

.q-tabs--scrollable.q-tabs__arrows--outside .q-tabs__arrow--faded {
  opacity: 0.3;
  pointer-events: none;
}

.q-tabs--scrollable.q-tabs__arrows--inside .q-tabs__arrow--faded {
  display: none;
}

.q-tabs--not-scrollable.q-tabs__arrows--outside, body.mobile .q-tabs--scrollable.q-tabs--mobile-without-arrows.q-tabs__arrows--outside {
  padding-left: 0;
  padding-right: 0;
}

.q-tabs--not-scrollable .q-tabs__arrow, body.mobile .q-tabs--scrollable.q-tabs--mobile-without-arrows .q-tabs__arrow {
  display: none;
}

.q-tabs--not-scrollable .q-tabs__content, body.mobile .q-tabs--scrollable.q-tabs--mobile-without-arrows .q-tabs__content {
  border-radius: inherit;
}

.q-tabs__arrow {
  cursor: pointer;
  font-size: 32px;
  min-width: 36px;
  text-shadow: 0 0 3px #fff, 0 0 1px #fff, 0 0 1px #000;
  transition: opacity 0.3s;
}

.q-tabs__content {
  overflow: hidden;
  flex: 1 1 auto;
}

.q-tabs__content--align-center {
  justify-content: center;
}

.q-tabs__content--align-right {
  justify-content: flex-end;
}

.q-tabs__content--align-justify .q-tab {
  flex: 1 1 auto;
}

.q-tabs__offset {
  display: none;
}

.q-tabs--horizontal .q-tabs__content {
  overflow-x: auto;
}

.q-tabs--horizontal .q-tabs__arrow {
  height: 100%;
}

.q-tabs--horizontal .q-tabs__arrow--left {
  top: 0;
  left: 0 /* rtl:ignore */;
  bottom: 0;
}

.q-tabs--horizontal .q-tabs__arrow--right {
  top: 0;
  right: 0 /* rtl:ignore */;
  bottom: 0;
}

.q-tabs--vertical {
  display: block !important;
  height: 100%;
}

.q-tabs--vertical .q-tabs__content {
  display: block !important;
  height: 100%;
  overflow-y: auto;
}

.q-tabs--vertical .q-tabs__arrow {
  width: 100%;
  height: 36px;
  text-align: center;
}

.q-tabs--vertical .q-tabs__arrow--left {
  top: 0;
  left: 0;
  right: 0;
}

.q-tabs--vertical .q-tabs__arrow--right {
  left: 0;
  right: 0;
  bottom: 0;
}

.q-tabs--vertical .q-tab {
  padding: 0 8px;
}

.q-tabs--vertical .q-tab__indicator {
  height: unset;
  width: 2px;
}

.q-tabs--vertical.q-tabs--not-scrollable .q-tabs__content {
  height: 100%;
}

.q-tabs--vertical.q-tabs--dense .q-tab__content {
  min-width: 24px;
}

.q-tabs--dense .q-tab {
  min-height: 36px;
}

.q-tabs--dense .q-tab--full {
  min-height: 52px;
}

`
}
