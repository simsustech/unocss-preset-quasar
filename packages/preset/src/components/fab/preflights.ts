import type { Preflight } from '@unocss/core'

export const fabPreflights: Preflight[] = [
  {
    getCSS: () => `.q-fab {
  position: relative;
  vertical-align: middle;
}
.q-fab > .q-btn {
  width: 100%;
}
.q-fab--form-rounded {
  border-radius: 28px;
}
.q-fab--form-square {
  border-radius: 4px;
}
.q-fab__icon, .q-fab__active-icon {
  transition: opacity 0.4s, transform 0.4s;
}
.q-fab__icon {
  opacity: 1;
  transform: rotate(0deg);
}
.q-fab__active-icon {
  opacity: 0;
  transform: rotate(-180deg);
}
.q-fab__label--external {
  position: absolute;
  padding: 0 8px;
  transition: opacity 0.18s cubic-bezier(0.65, 0.815, 0.735, 0.395);
}
.q-fab__label--external-hidden {
  opacity: 0;
  pointer-events: none;
}
.q-fab__label--external-left {
  top: 50%;
  left: -12px;
  transform: translate(-100%, -50%);
}
.q-fab__label--external-right {
  top: 50%;
  right: -12px;
  transform: translate(100%, -50%);
}
.q-fab__label--external-bottom {
  bottom: -12px;
  left: 50%;
  transform: translate(-50%, 100%);
}
.q-fab__label--external-top {
  top: -12px;
  left: 50%;
  transform: translate(-50%, -100%);
}
.q-fab__label--internal {
  padding: 0;
  transition: font-size 0.12s cubic-bezier(0.65, 0.815, 0.735, 0.395), max-height 0.12s cubic-bezier(0.65, 0.815, 0.735, 0.395), opacity 0.07s cubic-bezier(0.65, 0.815, 0.735, 0.395);
  max-height: 30px;
}
.q-fab__label--internal-hidden {
  font-size: 0;
  opacity: 0;
}
.q-fab__label--internal-top {
  padding-bottom: 0.12em;
}
.q-fab__label--internal-bottom {
  padding-top: 0.12em;
}
.q-fab__label--internal-top.q-fab__label--internal-hidden, .q-fab__label--internal-bottom.q-fab__label--internal-hidden {
  max-height: 0;
}
.q-fab__label--internal-left {
  padding-left: 0.285em;
  padding-right: 0.571em;
}
.q-fab__label--internal-right {
  padding-right: 0.285em;
  padding-left: 0.571em;
}
.q-fab__icon-holder {
  min-width: 24px;
  min-height: 24px;
  position: relative;
}
.q-fab__icon-holder--opened .q-fab__icon {
  transform: rotate(180deg);
  opacity: 0;
}
.q-fab__icon-holder--opened .q-fab__active-icon {
  transform: rotate(0deg);
  opacity: 1;
}
.q-fab__actions {
  position: absolute;
  pointer-events: none;
  align-items: center;
  justify-content: center;
  align-self: center;
  padding: 3px;
}
.q-fab__actions .q-btn {
  margin: 5px;
}
.q-fab__actions > * {
  filter: opacity(0);
  transform: scale(0.4);
  transition: filter 0.18s ease-out, transform 0.18s ease-out;
}
.q-fab__actions--right {
  height: 56px;
  left: 100% /* rtl:ignore */;
  margin-left: 9px /* rtl:ignore */;
  flex-direction: row /* rtl:row-reverse */;
}
.q-fab__actions--left {
  height: 56px;
  right: 100% /* rtl:ignore */;
  margin-right: 9px /* rtl:ignore */;
  flex-direction: row-reverse /* rtl:row */;
}
.q-fab__actions--up {
  width: 56px;
  bottom: 100%;
  margin-bottom: 9px;
  flex-direction: column-reverse;
}
.q-fab__actions--down {
  width: 56px;
  top: 100%;
  margin-top: 9px;
  flex-direction: column;
}
.q-fab__actions--up, .q-fab__actions--down {
  left: 50%;
  margin-left: -28px;
}
.q-fab__actions--opened {
  pointer-events: all;
}
.q-fab__actions--opened > * {
  filter: opacity(1);
  transform: scale(1);
  transition-delay: calc(var(--q-fab-stagger) * (sibling-index() - 1));
}
.q-fab__actions--closed > * {
  transition-delay: calc(var(--q-fab-stagger) * (sibling-count() - sibling-index()));
}
.q-fab--align-left > .q-fab__actions--up, .q-fab--align-left > .q-fab__actions--down {
  align-items: flex-start;
  left: 28px;
}
.q-fab--align-right > .q-fab__actions--up, .q-fab--align-right > .q-fab__actions--down {
  align-items: flex-end;
  left: auto;
  right: 0;
}
`
  }
]
