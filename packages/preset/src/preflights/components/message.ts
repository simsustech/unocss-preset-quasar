import type { Preflight } from '@unocss/core'

/**
 * message component styles — auto-generated from quasar.css.
 * Contains all .q-message selector blocks (variants, states, pseudo-elements).
 */
export const messageComponentPreflight: Preflight = {
  getCSS: () => `.q-message-name {
  font-size: small;
}

.q-message-label {
  margin: 24px 0;
  text-align: center;
  font-size: small;
}

.q-message-stamp {
  color: inherit;
  margin-top: 4px;
  opacity: 0.6;
  display: none;
  font-size: small;
}

.q-message-avatar {
  border-radius: 50%;
  width: 48px;
  height: 48px;
  min-width: 48px;
}

.q-message {
  margin-bottom: 8px;
}

.q-message:first-child .q-message-label {
  margin-top: 0;
}

.q-message-avatar--received {
  margin-right: 8px;
}

.q-message-text--received {
  color: #81c784;
  border-radius: 4px 4px 4px 0;
}

.q-message-text--received:last-child:before {
  right: 100%;
  border-right: 0 solid transparent;
  border-left: 8px solid transparent;
  border-bottom: 8px solid currentColor;
}

.q-message-text-content--received {
  color: #000;
}

.q-message-name--sent {
  text-align: right;
}

.q-message-avatar--sent {
  margin-left: 8px;
}

.q-message-container--sent {
  flex-direction: row-reverse;
}

.q-message-text--sent {
  color: #e0e0e0;
  border-radius: 4px 4px 0 4px;
}

.q-message-text--sent:last-child:before {
  left: 100%;
  border-left: 0 solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid currentColor;
}

.q-message-text-content--sent {
  color: #000;
}

.q-message-text {
  background: currentColor;
  padding: 8px;
  line-height: 1.2;
  word-break: break-word;
  position: relative;
}

.q-message-text + .q-message-text {
  margin-top: 3px;
}

.q-message-text:last-child {
  min-height: 48px;
}

.q-message-text:last-child .q-message-stamp {
  display: block;
}

.q-message-text:last-child:before {
  content: "";
  position: absolute;
  bottom: 0;
  width: 0;
  height: 0;
}

`
}
