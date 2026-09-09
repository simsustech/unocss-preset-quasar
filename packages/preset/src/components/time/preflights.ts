import type { Preflight } from '@unocss/core'

export const timePreflights: Preflight[] = [
  {
    getCSS: () => `.q-time {
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  background: #fff;
  outline: 0;
  width: 290px;
  min-width: 290px;
  max-width: 100%;
}
.q-time--bordered {
  border: 1px solid rgba(0, 0, 0, 0.12);
}
.q-time__header {
  border-top-left-radius: inherit;
  color: #fff;
  background-color: var(--q-primary);
  padding: 16px;
  font-weight: 300;
}
.q-time__actions {
  padding: 0 16px 16px;
}
.q-time__header-label {
  font-size: 28px;
  line-height: 1;
  letter-spacing: -0.00833em;
}
.q-time__header-label > div + div {
  margin-left: 4px;
}
.q-time__link {
  opacity: 0.56;
  outline: 0;
  transition: opacity 0.3s ease-out;
}
.q-time__link--active, .q-time__link:hover, .q-time__link:focus {
  opacity: 1;
}
.q-time__link:focus-visible {
  opacity: 1;
  outline: 2px solid currentColor;
  outline-offset: 2px;
}
.q-time__header-ampm {
  font-size: 16px;
  letter-spacing: 0.1em;
}
.q-time__content {
  padding: 16px;
}
.q-time__container-parent {
  padding: 16px;
}
.q-time__container-child {
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.12);
}
.q-time__clock {
  padding: 24px;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  font-size: 14px;
}
.q-time__clock-circle {
  position: relative;
}
.q-time__clock-center {
  height: 6px;
  width: 6px;
  margin: auto;
  border-radius: 50%;
  min-height: 0;
  background: currentColor;
}
.q-time__clock-pointer {
  width: 2px;
  height: 50%;
  transform-origin: 0 0 /* rtl:ignore */;
  min-height: 0;
  position: absolute;
  left: 50%;
  right: 0;
  bottom: 0;
  color: var(--q-primary);
  background: currentColor;
  transform: translateX(-50%);
}
.q-time__clock-position {
  position: absolute;
  min-height: 32px;
  width: 32px;
  height: 32px;
  font-size: 12px;
  line-height: 32px;
  margin: 0;
  padding: 0;
  transform: translate(-50%, -50%) /* rtl:ignore */;
  border-radius: 50%;
}
.q-time__clock-position--disable {
  opacity: 0.4;
}
.q-time__clock-position--active {
  background-color: var(--q-primary);
  color: #fff;
}
.q-time__clock-pos-0 {
  top: 0%;
  left: 50% /* rtl:ignore */;
}
.q-time__clock-pos-1 {
  top: 6.7%;
  left: 75% /* rtl:ignore */;
}
.q-time__clock-pos-2 {
  top: 25%;
  left: 93.3% /* rtl:ignore */;
}
.q-time__clock-pos-3 {
  top: 50%;
  left: 100% /* rtl:ignore */;
}
.q-time__clock-pos-4 {
  top: 75%;
  left: 93.3% /* rtl:ignore */;
}
.q-time__clock-pos-5 {
  top: 93.3%;
  left: 75% /* rtl:ignore */;
}
.q-time__clock-pos-6 {
  top: 100%;
  left: 50% /* rtl:ignore */;
}
.q-time__clock-pos-7 {
  top: 93.3%;
  left: 25% /* rtl:ignore */;
}
.q-time__clock-pos-8 {
  top: 75%;
  left: 6.7% /* rtl:ignore */;
}
.q-time__clock-pos-9 {
  top: 50%;
  left: 0% /* rtl:ignore */;
}
.q-time__clock-pos-10 {
  top: 25%;
  left: 6.7% /* rtl:ignore */;
}
.q-time__clock-pos-11 {
  top: 6.7%;
  left: 25% /* rtl:ignore */;
}
.q-time__clock-pos-12 {
  top: 15%;
  left: 50% /* rtl:ignore */;
}
.q-time__clock-pos-13 {
  top: 19.69%;
  left: 67.5% /* rtl:ignore */;
}
.q-time__clock-pos-14 {
  top: 32.5%;
  left: 80.31% /* rtl:ignore */;
}
.q-time__clock-pos-15 {
  top: 50%;
  left: 85% /* rtl:ignore */;
}
.q-time__clock-pos-16 {
  top: 67.5%;
  left: 80.31% /* rtl:ignore */;
}
.q-time__clock-pos-17 {
  top: 80.31%;
  left: 67.5% /* rtl:ignore */;
}
.q-time__clock-pos-18 {
  top: 85%;
  left: 50% /* rtl:ignore */;
}
.q-time__clock-pos-19 {
  top: 80.31%;
  left: 32.5% /* rtl:ignore */;
}
.q-time__clock-pos-20 {
  top: 67.5%;
  left: 19.69% /* rtl:ignore */;
}
.q-time__clock-pos-21 {
  top: 50%;
  left: 15% /* rtl:ignore */;
}
.q-time__clock-pos-22 {
  top: 32.5%;
  left: 19.69% /* rtl:ignore */;
}
.q-time__clock-pos-23 {
  top: 19.69%;
  left: 32.5% /* rtl:ignore */;
}
.q-time__now-button {
  background-color: var(--q-primary);
  color: #fff;
  top: 12px;
  right: 12px;
}
.q-time.disabled .q-time__header-ampm, .q-time.disabled .q-time__content, .q-time--readonly .q-time__header-ampm, .q-time--readonly .q-time__content {
  pointer-events: none;
}
.q-time--portrait {
  display: inline-flex;
  flex-direction: column;
}
.q-time--portrait .q-time__header {
  border-top-right-radius: inherit;
  min-height: 86px;
}
.q-time--portrait .q-time__header-ampm {
  margin-left: 12px;
}
.q-time--portrait.q-time--bordered .q-time__content {
  margin: 1px 0;
}
.q-time--landscape {
  display: inline-flex;
  align-items: stretch;
  min-width: 420px;
}
.q-time--landscape > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.q-time--landscape .q-time__header {
  border-bottom-left-radius: inherit;
  min-width: 156px;
}
.q-time--landscape .q-time__header-ampm {
  margin-top: 12px;
}
.q-time--dark {
  border-color: rgba(255, 255, 255, 0.28);
  box-shadow: 0 1px 5px rgba(255, 255, 255, 0.2), 0 2px 2px rgba(255, 255, 255, 0.14), 0 3px 1px -2px rgba(255, 255, 255, 0.12);
}
`
  }
]
