import type { Rule } from '@unocss/core'

/**
 * `calendar-transitions.scss` — ported from the library's own stylesheet.
 *
 * Structural colours read the preset's tokens, which are themed and
 * scheme-aware, so upstream's palette literals and its `-dark` twins are not
 * carried. Upstream's dark fast path (0 selectors across
 * `.q-dark div`, `.body--dark div` and `.q-calendar--dark`) is dropped for
 * the same reason; the residue a token flip does not reproduce is emitted as a
 * `body.body--dark` yield.
 */

export const qcalendarTransitionsRules = [
  [
    /^q-calendar$/u,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--roll-right-leave-active, ${selector}--roll-left-leave-active, ${selector}--roll-up-leave-active, ${selector}--roll-down-leave-active, ${selector}--slide-right-leave-active, ${selector}--slide-left-leave-active, ${selector}--slide-up-leave-active, ${selector}--slide-down-leave-active, ${selector}--jump-right-leave-active, ${selector}--jump-left-leave-active, ${selector}--jump-up-leave-active, ${selector}--jump-down-leave-active, ${selector}--fade-leave-active, ${selector}--scale-leave-active, ${selector}--rotate-leave-active, ${selector}--spin-leave-active, ${selector}--flip-leave-active`,
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--roll-right-enter-active, ${selector}--roll-right-leave-active, ${selector}--roll-left-enter-active, ${selector}--roll-left-leave-active, ${selector}--roll-up-enter-active, ${selector}--roll-up-leave-active, ${selector}--roll-down-enter-active, ${selector}--roll-down-leave-active, ${selector}--slide-right-enter-active, ${selector}--slide-right-leave-active, ${selector}--slide-left-enter-active, ${selector}--slide-left-leave-active, ${selector}--slide-up-enter-active, ${selector}--slide-up-leave-active, ${selector}--slide-down-enter-active, ${selector}--slide-down-leave-active`,
        transition: 'transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--roll-right-enter-from`,
        transform: 'translate3d(-100%, 0, 0) rotate(360deg)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--roll-right-leave-to`,
        transform: 'translate3d(100%, 0, 0) rotate(0deg)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--roll-left-enter-from`,
        transform: 'translate3d(100%, 0, 0) rotate(-360deg)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--roll-left-leave-to`,
        transform: 'translate3d(-100%, 0, 0) rotate(0deg)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--roll-up-enter-from`,
        transform: 'translate3d(0, 100%, 0) rotate(-360deg)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--roll-up-leave-to`,
        transform: 'translate3d(0, -100%, 0) rotate(0deg)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--roll-down-enter-from`,
        transform: 'translate3d(0, -100%, 0) rotate(360deg)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--roll-down-leave-to`,
        transform: 'translate3d(0, 100%, 0) rotate(0deg)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--slide-right-enter-from`,
        transform: 'translate3d(-100%, 0, 0)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--slide-right-leave-to`,
        transform: 'translate3d(100%, 0, 0)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--slide-left-enter-from`,
        transform: 'translate3d(100%, 0, 0)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--slide-left-leave-to`,
        transform: 'translate3d(-100%, 0, 0)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--slide-up-enter-from`,
        transform: 'translate3d(0, 100%, 0)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--slide-up-leave-to`,
        transform: 'translate3d(0, -100%, 0)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--slide-down-enter-from`,
        transform: 'translate3d(0, -100%, 0)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--slide-down-leave-to`,
        transform: 'translate3d(0, 100%, 0)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--jump-right-enter-active, ${selector}--jump-right-leave-active, ${selector}--jump-left-enter-active, ${selector}--jump-left-leave-active, ${selector}--jump-up-enter-active, ${selector}--jump-up-leave-active, ${selector}--jump-down-enter-active, ${selector}--jump-down-leave-active`,
        transition: 'opacity 0.3s, transform 0.3s'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--jump-right-enter-from, ${selector}--jump-right-leave-to, ${selector}--jump-left-enter-from, ${selector}--jump-left-leave-to, ${selector}--jump-up-enter-from, ${selector}--jump-up-leave-to, ${selector}--jump-down-enter-from, ${selector}--jump-down-leave-to`,
        opacity: '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--jump-right-enter-from`,
        transform: 'translate3d(-15px, 0, 0)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--jump-right-leave-to`,
        transform: 'translate3d(15px, 0, 0)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--jump-left-enter-from`,
        transform: 'translate3d(15px, 0, 0)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--jump-left-leave-to`,
        transform: 'translateX(-15px)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--jump-up-enter-from`,
        transform: 'translate3d(0, 15px, 0)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--jump-up-leave-to`,
        transform: 'translate3d(0, -15px, 0)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--jump-down-enter-from`,
        transform: 'translate3d(0, -15px, 0)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--jump-down-leave-to`,
        transform: 'translate3d(0, 15px, 0)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--fade-enter-active, ${selector}--fade-leave-active`,
        transition: 'opacity 0.3s ease-out'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--fade-enter-from, ${selector}--fade-leave-to`,
        opacity: '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--scale-enter-active, ${selector}--scale-leave-active`,
        transition:
          'opacity 0.3s, transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--scale-enter-from, ${selector}--scale-leave-to`,
        opacity: '0',
        transform: 'scale3d(0, 0, 1)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--rotate-enter-active, ${selector}--rotate-leave-active`,
        transition:
          'opacity 0.3s, transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1)',
        'transform-style': 'preserve-3d'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--rotate-enter-from, ${selector}--rotate-leave-to`,
        opacity: '0',
        transform: 'scale3d(0, 0, 1) rotate3d(0, 0, 1, 90deg)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--spin-enter-active, ${selector}--spin-leave-active`,
        transition:
          'opacity 0.3s, transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1)',
        'transform-style': 'preserve-3d'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--spin-enter-from, ${selector}--spin-leave-from, ${selector}--spin-leave-to`,
        opacity: '0',
        transform: 'scale3d(0, 0, 1) rotate3d(0, 0, 1, 720deg)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--flip-right-enter-active, ${selector}--flip-right-leave-active, ${selector}--flip-left-enter-active, ${selector}--flip-left-leave-active, ${selector}--flip-up-enter-active, ${selector}--flip-up-leave-active, ${selector}--flip-down-enter-active, ${selector}--flip-down-leave-active`,
        transition: 'transform 0.3s',
        'backface-visibility': 'hidden'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--flip-right-enter-to, ${selector}--flip-right-leave-from, ${selector}--flip-left-enter-to, ${selector}--flip-left-leave-from, ${selector}--flip-up-enter-to, ${selector}--flip-up-leave-from, ${selector}--flip-down-enter-to, ${selector}--flip-down-leave-from`,
        transform: 'perspective(400px) rotate3d(1, 1, 0, 0deg)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--flip-right-enter-from`,
        transform: 'perspective(400px) rotate3d(0, 1, 0, -180deg)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--flip-right-leave-to`,
        transform: 'perspective(400px) rotate3d(0, 1, 0, 180deg)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--flip-left-enter-from`,
        transform: 'perspective(400px) rotate3d(0, 1, 0, 180deg)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--flip-left-leave-to`,
        transform: 'perspective(400px) rotate3d(0, 1, 0, -180deg)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--flip-up-enter-from`,
        transform: 'perspective(400px) rotate3d(1, 0, 0, -180deg)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--flip-up-leave-to`,
        transform: 'perspective(400px) rotate3d(1, 0, 0, 180deg)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--flip-down-enter-from`,
        transform: 'perspective(400px) rotate3d(1, 0, 0, 180deg)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--flip-down-leave-to`,
        transform: 'perspective(400px) rotate3d(1, 0, 0, -180deg)'
      }
    }
  ]
] as Rule[]
