import type { Preflight } from '@unocss/core'

/**
 * notification component styles — auto-generated from quasar.css.
 * Contains all .q-notification selector blocks (variants, states, pseudo-elements).
 */
export const notificationComponentPreflight: Preflight = {
  getCSS: () => `.q-notification {
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  pointer-events: all;
  display: inline-flex;
  margin: 10px 10px 0;
  transition: transform 1s, opacity 1s;
  z-index: 9500;
  flex-shrink: 0;
  max-width: 95vw;
  background: #323232;
  color: #fff;
  font-size: 14px;
}

.q-notification__icon {
  font-size: 24px;
  flex: 0 0 1em;
}

.q-notification__icon--additional {
  margin-right: 16px;
}

.q-notification__avatar {
  font-size: 32px;
}

.q-notification__avatar--additional {
  margin-right: 8px;
}

.q-notification__spinner {
  font-size: 32px;
}

.q-notification__spinner--additional {
  margin-right: 8px;
}

.q-notification__message {
  padding: 8px 0;
}

.q-notification__caption {
  font-size: 0.9em;
  opacity: 0.7;
}

.q-notification__actions {
  color: var(--q-primary);
}

.q-notification__badge {
  animation: q-notif-badge 0.42s;
  padding: 4px 8px;
  position: absolute;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12);
  background-color: var(--q-negative);
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  line-height: 12px;
}

.q-notification__badge--top-left, .q-notification__badge--top-right {
  top: -6px;
}

.q-notification__badge--bottom-left, .q-notification__badge--bottom-right {
  bottom: -6px;
}

.q-notification__badge--top-left, .q-notification__badge--bottom-left {
  left: -22px;
}

.q-notification__badge--top-right, .q-notification__badge--bottom-right {
  right: -22px;
}

.q-notification__progress {
  z-index: -1;
  position: absolute;
  height: 3px;
  bottom: 0;
  left: -10px;
  right: -10px;
  animation: q-notif-progress linear;
  background: currentColor;
  opacity: 0.3;
  border-radius: 4px 4px 0 0;
  transform-origin: 0 50%;
  transform: scaleX(0);
}

.q-notification--standard {
  padding: 0 16px;
  min-height: 48px;
}

.q-notification--standard .q-notification__actions {
  padding: 6px 0 6px 8px;
  margin-right: -8px;
}

.q-notification--multi-line {
  min-height: 68px;
  padding: 8px 16px;
}

.q-notification--multi-line .q-notification__badge--top-left, .q-notification--multi-line .q-notification__badge--top-right {
  top: -15px;
}

.q-notification--multi-line .q-notification__badge--bottom-left, .q-notification--multi-line .q-notification__badge--bottom-right {
  bottom: -15px;
}

.q-notification--multi-line .q-notification__progress {
  bottom: -8px;
}

.q-notification--multi-line .q-notification__actions {
  padding: 0;
}

.q-notification--multi-line .q-notification__actions--with-media {
  padding-left: 25px;
}

.q-notification--top-left-enter-from, .q-notification--top-left-leave-to, .q-notification--top-enter-from, .q-notification--top-leave-to, .q-notification--top-right-enter-from, .q-notification--top-right-leave-to {
  opacity: 0;
  transform: translateY(-50px);
  z-index: 9499;
}

.q-notification--left-enter-from, .q-notification--left-leave-to, .q-notification--center-enter-from, .q-notification--center-leave-to, .q-notification--right-enter-from, .q-notification--right-leave-to {
  opacity: 0;
  transform: rotateX(90deg);
  z-index: 9499;
}

.q-notification--bottom-left-enter-from, .q-notification--bottom-left-leave-to, .q-notification--bottom-enter-from, .q-notification--bottom-leave-to, .q-notification--bottom-right-enter-from, .q-notification--bottom-right-leave-to {
  opacity: 0;
  transform: translateY(50px);
  z-index: 9499;
}

.q-notification--top-left-leave-active, .q-notification--top-leave-active, .q-notification--top-right-leave-active, .q-notification--left-leave-active, .q-notification--center-leave-active, .q-notification--right-leave-active, .q-notification--bottom-left-leave-active, .q-notification--bottom-leave-active, .q-notification--bottom-right-leave-active {
  position: absolute;
  z-index: 9499;
  margin-left: 0;
  margin-right: 0;
}

.q-notification--top-leave-active, .q-notification--center-leave-active {
  top: 0;
}

.q-notification--bottom-left-leave-active, .q-notification--bottom-leave-active, .q-notification--bottom-right-leave-active {
  bottom: 0;
}

`
}
