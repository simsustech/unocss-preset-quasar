import type { Preflight } from '@unocss/core'

export const fieldPreflights: Preflight[] = [
  {
    getCSS: () => `.q-field {
  font-size: 14px;
}
.q-field ::-ms-reveal {
  display: none;
}
.q-field__marginal {
  height: 56px;
  color: rgba(0, 0, 0, 0.54);
  font-size: 24px;
}
.q-field__marginal > * + * {
  margin-left: 2px;
}
.q-field__marginal .q-avatar {
  font-size: 32px;
}
.q-field__before, .q-field__prepend {
  padding-right: 12px;
}
.q-field__after, .q-field__append {
  padding-left: 12px;
}
.q-field__after:empty, .q-field__append:empty {
  display: none;
}
.q-field__append + .q-field__append {
  padding-left: 2px;
}
.q-field__inner {
  text-align: left;
}
.q-field__bottom {
  font-size: 12px;
  min-height: 20px;
  line-height: 1;
  color: rgba(0, 0, 0, 0.54);
  padding: 8px 12px 0;
  backface-visibility: hidden;
}
.q-field__messages {
  line-height: 1;
}
.q-field__messages > div {
  word-break: break-word;
  word-wrap: break-word;
  overflow-wrap: break-word;
}
.q-field__messages > div + div {
  margin-top: 4px;
}
.q-field__counter {
  padding-left: 8px;
  line-height: 1;
}
.q-field--item-aligned {
  padding: 8px 16px;
}
.q-field--item-aligned .q-field__before {
  min-width: 56px;
}
.q-field__control-container {
  height: inherit;
}
.q-field__control {
  color: var(--q-primary);
  height: 56px;
  max-width: 100%;
  outline: none;
}
.q-field__shadow {
  top: 8px;
  opacity: 0;
  overflow: hidden;
  white-space: pre-wrap;
  transition: opacity 0.36s cubic-bezier(0.4, 0, 0.2, 1);
}
.q-field__shadow + .q-field__native::placeholder {
  transition: opacity 0.36s cubic-bezier(0.4, 0, 0.2, 1);
}
.q-field__shadow + .q-field__native:focus::placeholder {
  opacity: 0;
}
.q-field__native, .q-field__prefix, .q-field__suffix, .q-field__input {
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0.00937em;
  text-decoration: inherit;
  text-transform: inherit;
  border: none;
  border-radius: 0;
  background: none;
  color: rgba(0, 0, 0, 0.87);
  outline: 0;
  padding: 6px 0;
}
.q-field__native, .q-field__input {
  width: 100%;
  min-width: 0;
  outline: 0 !important;
  user-select: auto;
  -webkit-user-select: auto;
}
.q-field__native:autofill, .q-field__input:autofill {
  animation-name: q-autofill;
  animation-fill-mode: both;
}
.q-field__native:invalid, .q-field__input:invalid {
  box-shadow: none;
}
.q-field__native[type=file] {
  line-height: 1em;
}
.q-field__input {
  padding: 0;
  height: 0;
  min-height: 24px;
  line-height: 24px;
}
.q-field__prefix, .q-field__suffix {
  transition: opacity 0.36s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
}
.q-field__prefix {
  padding-right: 4px;
}
.q-field__suffix {
  padding-left: 4px;
}
.q-field--readonly .q-placeholder, .q-field--disabled .q-placeholder {
  opacity: 1 !important;
}
.q-field--readonly.q-field--labeled .q-field__native, .q-field--readonly.q-field--labeled .q-field__input {
  cursor: default;
}
.q-field--readonly.q-field--float .q-field__native, .q-field--readonly.q-field--float .q-field__input {
  cursor: text;
}
.q-field--disabled .q-field__inner {
  cursor: not-allowed;
}
.q-field--disabled .q-field__control {
  pointer-events: none;
}
.q-field--disabled .q-field__control > div {
  opacity: 0.6 !important;
}
.q-field--disabled .q-field__control > div,
.q-field--disabled .q-field__control > div * {
  outline: 0 !important;
}
.q-field__label {
  left: 0;
  top: 18px;
  max-width: 100%;
  color: rgba(0, 0, 0, 0.6);
  font-size: 16px;
  line-height: 1.25;
  font-weight: 400;
  letter-spacing: 0.00937em;
  text-decoration: inherit;
  text-transform: inherit;
  transform-origin: left top;
  transition: transform 0.36s cubic-bezier(0.4, 0, 0.2, 1), max-width 0.324s cubic-bezier(0.4, 0, 0.2, 1);
  backface-visibility: hidden;
}
.q-field__label:has(+ :is(.q-field__native, .q-field__input):is(:autofill,
[type=color],
[type=date],
[type=datetime-local],
[type=month],
[type=time],
[type=week])) {
  transform: translateY(-40%) scale(0.75);
}
.q-field--float .q-field__label {
  max-width: 133%;
  transform: translateY(-40%) scale(0.75);
  transition: transform 0.36s cubic-bezier(0.4, 0, 0.2, 1), max-width 0.396s cubic-bezier(0.4, 0, 0.2, 1);
}
.q-field--highlighted .q-field__label {
  color: currentColor;
}
.q-field--focused .q-field__shadow {
  opacity: 0.5;
}
.q-field--filled .q-field__control {
  padding: 0 12px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px 4px 0 0;
}
.q-field--filled.q-field--rounded .q-field__control {
  border-radius: 28px 28px 0 0;
}
.q-field--outlined .q-field__control {
  border-radius: 4px;
  padding: 0 12px;
}
.q-field--outlined .q-field__native:autofill,
.q-field--outlined .q-field__input:autofill {
  margin-top: 1px;
  margin-bottom: 1px;
}
.q-field--outlined.q-field--rounded .q-field__control {
  border-radius: 28px;
}
.q-field--dark .q-field__native, .q-field--dark .q-field__prefix, .q-field--dark .q-field__suffix, .q-field--dark .q-field__input {
  color: #fff;
}
.q-field--dark:not(.q-field--highlighted) .q-field__label, .q-field--dark .q-field__marginal, .q-field--dark .q-field__bottom {
  color: rgba(255, 255, 255, 0.7);
}
.q-field--standout .q-field__control {
  padding: 0 12px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  transition: box-shadow 0.36s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.36s cubic-bezier(0.4, 0, 0.2, 1);
}
.q-field--standout.q-field--rounded .q-field__control {
  border-radius: 28px;
}
.q-field--standout.q-field--highlighted .q-field__control {
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
  background: #000;
}
.q-field--standout.q-field--highlighted .q-field__native, .q-field--standout.q-field--highlighted .q-field__prefix, .q-field--standout.q-field--highlighted .q-field__suffix, .q-field--standout.q-field--highlighted .q-field__prepend, .q-field--standout.q-field--highlighted .q-field__append, .q-field--standout.q-field--highlighted .q-field__input {
  color: #fff;
}
.q-field--standout.q-field--dark .q-field__control {
  background: rgba(255, 255, 255, 0.07);
}
.q-field--standout.q-field--dark.q-field--highlighted .q-field__control {
  background: #fff;
}
.q-field--standout.q-field--dark.q-field--highlighted .q-field__native, .q-field--standout.q-field--dark.q-field--highlighted .q-field__prefix, .q-field--standout.q-field--dark.q-field--highlighted .q-field__suffix, .q-field--standout.q-field--dark.q-field--highlighted .q-field__prepend, .q-field--standout.q-field--dark.q-field--highlighted .q-field__append, .q-field--standout.q-field--dark.q-field--highlighted .q-field__input {
  color: #000;
}
.q-field--labeled .q-field__native, .q-field--labeled .q-field__prefix, .q-field--labeled .q-field__suffix {
  line-height: 24px;
  padding-top: 24px;
  padding-bottom: 8px;
}
.q-field--labeled .q-field__shadow {
  top: 0;
}
.q-field--labeled:not(.q-field--float) .q-field__prefix, .q-field--labeled:not(.q-field--float) .q-field__suffix {
  opacity: 0;
}
.q-field--labeled:not(.q-field--float) .q-field__native::placeholder, .q-field--labeled:not(.q-field--float) .q-field__input::placeholder {
  color: transparent;
}
.q-field--labeled.q-field--dense .q-field__native, .q-field--labeled.q-field--dense .q-field__prefix, .q-field--labeled.q-field--dense .q-field__suffix {
  padding-top: 14px;
  padding-bottom: 2px;
}
.q-field--dense .q-field__shadow {
  top: 0;
}
.q-field--dense .q-field__control, .q-field--dense .q-field__marginal {
  height: 40px;
}
.q-field--dense .q-field__bottom {
  font-size: 11px;
}
.q-field--dense .q-field__label {
  font-size: 14px;
  top: 10px;
}
.q-field--dense .q-field__before, .q-field--dense .q-field__prepend {
  padding-right: 6px;
}
.q-field--dense .q-field__after, .q-field--dense .q-field__append {
  padding-left: 6px;
}
.q-field--dense .q-field__append + .q-field__append {
  padding-left: 2px;
}
.q-field--dense .q-field__marginal .q-avatar {
  font-size: 24px;
}
.q-field--dense.q-field--float .q-field__label {
  transform: translateY(-30%) scale(0.75);
}
.q-field--dense .q-field__label:has(+ :is(.q-field__native, .q-field__input):is(:autofill,
[type=color],
[type=date],
[type=datetime-local],
[type=month],
[type=time],
[type=week])) {
  transform: translateY(-30%) scale(0.75);
}
.q-field--borderless .q-field__bottom, .q-field--borderless.q-field--dense .q-field__control, .q-field--standard .q-field__bottom, .q-field--standard.q-field--dense .q-field__control {
  padding-left: 0;
  padding-right: 0;
}
.q-field--error .q-field__label {
  animation: q-field-label 0.36s;
}
.q-field--error .q-field__bottom {
  color: var(--q-negative);
}
.q-field__focusable-action {
  opacity: 0.6;
  cursor: pointer;
  outline: 0 !important;
  border: 0;
  color: inherit;
  background: transparent;
  padding: 0;
}
.q-field__focusable-action:hover, .q-field__focusable-action:focus {
  opacity: 1;
}
.q-field--auto-height .q-field__control {
  height: auto;
}
.q-field--auto-height .q-field__control, .q-field--auto-height .q-field__native {
  min-height: 56px;
}
.q-field--auto-height .q-field__native {
  align-items: center;
}
.q-field--auto-height .q-field__control-container {
  padding-top: 0;
}
.q-field--auto-height .q-field__native, .q-field--auto-height .q-field__prefix, .q-field--auto-height .q-field__suffix {
  line-height: 18px;
}
.q-field--auto-height.q-field--labeled .q-field__control-container {
  padding-top: 24px;
}
.q-field--auto-height.q-field--labeled .q-field__shadow {
  top: 24px;
}
.q-field--auto-height.q-field--labeled .q-field__native, .q-field--auto-height.q-field--labeled .q-field__prefix, .q-field--auto-height.q-field--labeled .q-field__suffix {
  padding-top: 0;
}
.q-field--auto-height.q-field--labeled .q-field__native {
  min-height: 24px;
}
.q-field--auto-height.q-field--dense .q-field__control, .q-field--auto-height.q-field--dense .q-field__native {
  min-height: 40px;
}
.q-field--auto-height.q-field--dense.q-field--labeled .q-field__control-container {
  padding-top: 14px;
}
.q-field--auto-height.q-field--dense.q-field--labeled .q-field__shadow {
  top: 14px;
}
.q-field--auto-height.q-field--dense.q-field--labeled .q-field__native {
  min-height: 24px;
}
.q-field--square .q-field__control {
  border-radius: 0 !important;
}
`
  }
]
