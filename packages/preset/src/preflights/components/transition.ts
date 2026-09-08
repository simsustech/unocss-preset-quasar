import type { Preflight } from '@unocss/core'

/**
 * transition component styles — auto-generated from quasar.css.
 * Contains all .q-transition selector blocks (variants, states, pseudo-elements).
 */
export const transitionComponentPreflight: Preflight = {
  getCSS:
    () => `.q-transition--field-message-enter-active, .q-transition--field-message-leave-active {
  transition: transform 0.6s cubic-bezier(0.86, 0, 0.07, 1), opacity 0.6s cubic-bezier(0.86, 0, 0.07, 1);
}

.q-transition--field-message-enter-from, .q-transition--field-message-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.q-transition--field-message-leave-from, .q-transition--field-message-leave-active {
  position: absolute;
}

.q-transition--slide-right-enter-active, .q-transition--slide-right-leave-active, .q-transition--slide-left-enter-active, .q-transition--slide-left-leave-active, .q-transition--slide-up-enter-active, .q-transition--slide-up-leave-active, .q-transition--slide-down-enter-active, .q-transition--slide-down-leave-active, .q-transition--jump-right-enter-active, .q-transition--jump-right-leave-active, .q-transition--jump-left-enter-active, .q-transition--jump-left-leave-active, .q-transition--jump-up-enter-active, .q-transition--jump-up-leave-active, .q-transition--jump-down-enter-active, .q-transition--jump-down-leave-active, .q-transition--fade-enter-active, .q-transition--fade-leave-active, .q-transition--scale-enter-active, .q-transition--scale-leave-active, .q-transition--rotate-enter-active, .q-transition--rotate-leave-active, .q-transition--flip-enter-active, .q-transition--flip-leave-active {
  --q-transition-duration: .3s;
  --q-transition-easing: cubic-bezier(0.215,0.61,0.355,1);
}

.q-transition--slide-right-leave-active, .q-transition--slide-left-leave-active, .q-transition--slide-up-leave-active, .q-transition--slide-down-leave-active, .q-transition--jump-right-leave-active, .q-transition--jump-left-leave-active, .q-transition--jump-up-leave-active, .q-transition--jump-down-leave-active, .q-transition--fade-leave-active, .q-transition--scale-leave-active, .q-transition--rotate-leave-active, .q-transition--flip-leave-active {
  position: absolute;
}

.q-transition--slide-right-enter-active, .q-transition--slide-right-leave-active, .q-transition--slide-left-enter-active, .q-transition--slide-left-leave-active, .q-transition--slide-up-enter-active, .q-transition--slide-up-leave-active, .q-transition--slide-down-enter-active, .q-transition--slide-down-leave-active {
  transition: transform var(--q-transition-duration) var(--q-transition-easing);
}

.q-transition--slide-right-enter-from {
  transform: translate3d(-100%, 0, 0);
}

.q-transition--slide-right-leave-to {
  transform: translate3d(100%, 0, 0);
}

.q-transition--slide-left-enter-from {
  transform: translate3d(100%, 0, 0);
}

.q-transition--slide-left-leave-to {
  transform: translate3d(-100%, 0, 0);
}

.q-transition--slide-up-enter-from {
  transform: translate3d(0, 100%, 0);
}

.q-transition--slide-up-leave-to {
  transform: translate3d(0, -100%, 0);
}

.q-transition--slide-down-enter-from {
  transform: translate3d(0, -100%, 0);
}

.q-transition--slide-down-leave-to {
  transform: translate3d(0, 100%, 0);
}

.q-transition--jump-right-enter-active, .q-transition--jump-right-leave-active, .q-transition--jump-left-enter-active, .q-transition--jump-left-leave-active, .q-transition--jump-up-enter-active, .q-transition--jump-up-leave-active, .q-transition--jump-down-enter-active, .q-transition--jump-down-leave-active {
  transition: opacity var(--q-transition-duration), transform var(--q-transition-duration);
}

.q-transition--jump-right-enter-from, .q-transition--jump-right-leave-to, .q-transition--jump-left-enter-from, .q-transition--jump-left-leave-to, .q-transition--jump-up-enter-from, .q-transition--jump-up-leave-to, .q-transition--jump-down-enter-from, .q-transition--jump-down-leave-to {
  opacity: 0;
}

.q-transition--jump-right-enter-from {
  transform: translate3d(-15px, 0, 0);
}

.q-transition--jump-right-leave-to {
  transform: translate3d(15px, 0, 0);
}

.q-transition--jump-left-enter-from {
  transform: translate3d(15px, 0, 0);
}

.q-transition--jump-left-leave-to {
  transform: translateX(-15px);
}

.q-transition--jump-up-enter-from {
  transform: translate3d(0, 15px, 0);
}

.q-transition--jump-up-leave-to {
  transform: translate3d(0, -15px, 0);
}

.q-transition--jump-down-enter-from {
  transform: translate3d(0, -15px, 0);
}

.q-transition--jump-down-leave-to {
  transform: translate3d(0, 15px, 0);
}

.q-transition--fade-enter-active, .q-transition--fade-leave-active {
  transition: opacity var(--q-transition-duration) ease-out;
}

.q-transition--fade-enter-from, .q-transition--fade-leave-to {
  opacity: 0;
}

.q-transition--scale-enter-active, .q-transition--scale-leave-active {
  transition: opacity var(--q-transition-duration), transform var(--q-transition-duration) var(--q-transition-easing);
}

.q-transition--scale-enter-from, .q-transition--scale-leave-to {
  opacity: 0;
  transform: scale3d(0, 0, 1);
}

.q-transition--rotate-enter-active, .q-transition--rotate-leave-active {
  transition: opacity var(--q-transition-duration), transform var(--q-transition-duration) var(--q-transition-easing);
  transform-style: preserve-3d;
}

.q-transition--rotate-enter-from, .q-transition--rotate-leave-to {
  opacity: 0;
  transform: scale3d(0, 0, 1) rotate3d(0, 0, 1, 90deg);
}

.q-transition--flip-right-enter-active, .q-transition--flip-right-leave-active, .q-transition--flip-left-enter-active, .q-transition--flip-left-leave-active, .q-transition--flip-up-enter-active, .q-transition--flip-up-leave-active, .q-transition--flip-down-enter-active, .q-transition--flip-down-leave-active {
  transition: transform var(--q-transition-duration);
  backface-visibility: hidden;
}

.q-transition--flip-right-enter-to, .q-transition--flip-right-leave-from, .q-transition--flip-left-enter-to, .q-transition--flip-left-leave-from, .q-transition--flip-up-enter-to, .q-transition--flip-up-leave-from, .q-transition--flip-down-enter-to, .q-transition--flip-down-leave-from {
  transform: perspective(400px) rotate3d(1, 1, 0, 0deg);
}

.q-transition--flip-right-enter-from {
  transform: perspective(400px) rotate3d(0, 1, 0, -180deg);
}

.q-transition--flip-right-leave-to {
  transform: perspective(400px) rotate3d(0, 1, 0, 180deg);
}

.q-transition--flip-left-enter-from {
  transform: perspective(400px) rotate3d(0, 1, 0, 180deg);
}

.q-transition--flip-left-leave-to {
  transform: perspective(400px) rotate3d(0, 1, 0, -180deg);
}

.q-transition--flip-up-enter-from {
  transform: perspective(400px) rotate3d(1, 0, 0, -180deg);
}

.q-transition--flip-up-leave-to {
  transform: perspective(400px) rotate3d(1, 0, 0, 180deg);
}

.q-transition--flip-down-enter-from {
  transform: perspective(400px) rotate3d(1, 0, 0, 180deg);
}

.q-transition--flip-down-leave-to {
  transform: perspective(400px) rotate3d(1, 0, 0, -180deg);
}

`
}
