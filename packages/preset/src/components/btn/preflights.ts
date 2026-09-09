import type { Preflight } from '@unocss/core'

export const btnPreflights: Preflight[] = [
  {
    getCSS: () => `.q-btn {
  display: inline-flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
  outline: 0;
  border: 0;
  vertical-align: middle;
  font-size: 14px;
  line-height: 1.715em;
  text-decoration: none;
  color: inherit;
  background: transparent;
  font-weight: 500;
  text-transform: uppercase;
  text-align: center;
  width: auto;
  height: auto;
  cursor: default;
  padding: 4px 16px;
  min-height: 2.572em;
}
.q-btn .q-icon, .q-btn .q-spinner {
  font-size: 1.715em;
}
.q-btn.disabled {
  opacity: 0.7 !important;
}
.q-btn--actionable {
  cursor: pointer;
}
.q-btn--no-uppercase {
  text-transform: none;
}
.q-btn--rectangle {
  border-radius: 3px;
}
.q-btn--outline {
  background: transparent !important;
}
.q-btn--push {
  border-radius: 7px;
}
.q-btn--push.q-btn--actionable {
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}
.q-btn--push.q-btn--actionable:active, .q-btn--push.q-btn--actionable.q-btn--active {
  transform: translateY(2px);
}
.q-btn--rounded {
  border-radius: 28px;
}
.q-btn--round {
  border-radius: 50%;
  padding: 0;
  min-width: 3em;
  min-height: 3em;
}
.q-btn--square {
  border-radius: 0;
}
.q-btn--dense {
  padding: 0.285em;
  min-height: 2em;
}
.q-btn--dense.q-btn--round {
  padding: 0;
  min-height: 2.4em;
  min-width: 2.4em;
}
.q-btn--dense .on-left {
  margin-right: 6px;
}
.q-btn--dense .on-right {
  margin-left: 6px;
}
.q-btn--fab .q-icon, .q-btn--fab-mini .q-icon {
  font-size: 24px;
}
.q-btn--fab {
  padding: 16px;
  min-height: 56px;
  min-width: 56px;
}
.q-btn--fab .q-icon {
  margin: auto;
}
.q-btn--fab-mini {
  padding: 8px;
  min-height: 40px;
  min-width: 40px;
}
.q-btn__content {
  transition: opacity 0.3s;
  z-index: 0;
}
.q-btn__content--hidden {
  opacity: 0;
  pointer-events: none;
}
.q-btn__progress {
  border-radius: inherit;
  z-index: 0;
}
.q-btn__progress-indicator {
  z-index: -1;
  transform: translateX(-100%);
  background: rgba(255, 255, 255, 0.25);
}
.q-btn__progress--dark .q-btn__progress-indicator {
  background: rgba(0, 0, 0, 0.2);
}
.q-btn--flat .q-btn__progress-indicator, .q-btn--outline .q-btn__progress-indicator {
  opacity: 0.2;
  background: currentColor;
}
.q-btn--push.q-btn--actionable {
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}
.q-btn--push.q-btn--actionable:active,
.q-btn--push.q-btn--actionable.q-btn--active {
  transform: translateY(2px);
}
`
  }
]
