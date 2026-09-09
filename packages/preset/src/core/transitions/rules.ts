import type { ComponentRule } from '../../rules/types.js'

/**
 * Transition utilities — ported from core/transitions.unocss.ts.
 *
 * Vue transition classes for slide, jump, fade, scale, rotate, and flip
 * animations. Each transition has enter-active, leave-active, enter-from,
 * and leave-to states.
 *
 * Uses --q-transition-duration and --q-transition-easing custom properties
 * emitted by the transitions preflight.
 */

/** CSS value — strings or unitless numbers */
type CSSValue = string | number

/** Single rule entry helper — keeps tuple type [RegExp, matcher] */
function rule(
  regex: RegExp,
  matcher: () => Record<string, CSSValue>
): ComponentRule {
  return [regex, matcher]
}

/** Transition duration/easing shorthand */
const transition = 'var(--q-transition-duration) var(--q-transition-easing)'
const jumpTransition =
  'opacity var(--q-transition-duration), transform var(--q-transition-duration)'
const flipTransition = 'transform var(--q-transition-duration)'

export const transitionsRules: ComponentRule[] = [
  // ============================================================
  // SLIDE TRANSITIONS
  // ============================================================
  // --- Slide Right ---
  rule(/^q-transition--slide-right-enter-active$/, () => ({
    transition: `transform ${transition}`
  })),
  rule(/^q-transition--slide-right-leave-active$/, () => ({
    position: 'absolute',
    transition: `transform ${transition}`
  })),
  rule(/^q-transition--slide-right-enter-from$/, () => ({
    transform: 'translate3d(-100%, 0, 0)'
  })),
  rule(/^q-transition--slide-right-leave-to$/, () => ({
    transform: 'translate3d(100%, 0, 0)'
  })),

  // --- Slide Left ---
  rule(/^q-transition--slide-left-enter-active$/, () => ({
    transition: `transform ${transition}`
  })),
  rule(/^q-transition--slide-left-leave-active$/, () => ({
    position: 'absolute',
    transition: `transform ${transition}`
  })),
  rule(/^q-transition--slide-left-enter-from$/, () => ({
    transform: 'translate3d(100%, 0, 0)'
  })),
  rule(/^q-transition--slide-left-leave-to$/, () => ({
    transform: 'translate3d(-100%, 0, 0)'
  })),

  // --- Slide Up ---
  rule(/^q-transition--slide-up-enter-active$/, () => ({
    transition: `transform ${transition}`
  })),
  rule(/^q-transition--slide-up-leave-active$/, () => ({
    position: 'absolute',
    transition: `transform ${transition}`
  })),
  rule(/^q-transition--slide-up-enter-from$/, () => ({
    transform: 'translate3d(0, 100%, 0)'
  })),
  rule(/^q-transition--slide-up-leave-to$/, () => ({
    transform: 'translate3d(0, -100%, 0)'
  })),

  // --- Slide Down ---
  rule(/^q-transition--slide-down-enter-active$/, () => ({
    transition: `transform ${transition}`
  })),
  rule(/^q-transition--slide-down-leave-active$/, () => ({
    position: 'absolute',
    transition: `transform ${transition}`
  })),
  rule(/^q-transition--slide-down-enter-from$/, () => ({
    transform: 'translate3d(0, -100%, 0)'
  })),
  rule(/^q-transition--slide-down-leave-to$/, () => ({
    transform: 'translate3d(0, 100%, 0)'
  })),

  // ============================================================
  // JUMP TRANSITIONS
  // ============================================================

  // --- Jump Right ---
  rule(/^q-transition--jump-right-enter-active$/, () => ({
    transition: jumpTransition
  })),
  rule(/^q-transition--jump-right-leave-active$/, () => ({
    position: 'absolute',
    transition: jumpTransition
  })),
  rule(/^q-transition--jump-right-enter-from$/, () => ({
    opacity: 0,
    transform: 'translate3d(-15px, 0, 0)'
  })),
  rule(/^q-transition--jump-right-leave-to$/, () => ({
    opacity: 0,
    transform: 'translate3d(15px, 0, 0)'
  })),

  // --- Jump Left ---
  rule(/^q-transition--jump-left-enter-active$/, () => ({
    transition: jumpTransition
  })),
  rule(/^q-transition--jump-left-leave-active$/, () => ({
    position: 'absolute',
    transition: jumpTransition
  })),
  rule(/^q-transition--jump-left-enter-from$/, () => ({
    opacity: 0,
    transform: 'translate3d(15px, 0, 0)'
  })),
  rule(/^q-transition--jump-left-leave-to$/, () => ({
    opacity: 0,
    transform: 'translate3d(-15px, 0, 0)'
  })),

  // --- Jump Up ---
  rule(/^q-transition--jump-up-enter-active$/, () => ({
    transition: jumpTransition
  })),
  rule(/^q-transition--jump-up-leave-active$/, () => ({
    position: 'absolute',
    transition: jumpTransition
  })),
  rule(/^q-transition--jump-up-enter-from$/, () => ({
    opacity: 0,
    transform: 'translate3d(0, 15px, 0)'
  })),
  rule(/^q-transition--jump-up-leave-to$/, () => ({
    opacity: 0,
    transform: 'translate3d(0, -15px, 0)'
  })),

  // --- Jump Down ---
  rule(/^q-transition--jump-down-enter-active$/, () => ({
    transition: jumpTransition
  })),
  rule(/^q-transition--jump-down-leave-active$/, () => ({
    position: 'absolute',
    transition: jumpTransition
  })),
  rule(/^q-transition--jump-down-enter-from$/, () => ({
    opacity: 0,
    transform: 'translate3d(0, -15px, 0)'
  })),
  rule(/^q-transition--jump-down-leave-to$/, () => ({
    opacity: 0,
    transform: 'translate3d(0, 15px, 0)'
  })),

  // ============================================================
  // FADE TRANSITION
  // ============================================================
  rule(/^q-transition--fade-enter-active$/, () => ({
    transition: `opacity var(--q-transition-duration) ease-out`
  })),
  rule(/^q-transition--fade-leave-active$/, () => ({
    position: 'absolute',
    transition: `opacity var(--q-transition-duration) ease-out`
  })),
  rule(/^q-transition--fade-enter-from$/, () => ({ opacity: 0 })),
  rule(/^q-transition--fade-leave-to$/, () => ({ opacity: 0 })),

  // ============================================================
  // SCALE TRANSITION
  // ============================================================
  rule(/^q-transition--scale-enter-active$/, () => ({
    transition: `opacity var(--q-transition-duration), transform var(--q-transition-duration) var(--q-transition-easing)`
  })),
  rule(/^q-transition--scale-leave-active$/, () => ({
    position: 'absolute',
    transition: `opacity var(--q-transition-duration), transform var(--q-transition-duration) var(--q-transition-easing)`
  })),
  rule(/^q-transition--scale-enter-from$/, () => ({
    opacity: 0,
    transform: 'scale3d(0, 0, 1)'
  })),
  rule(/^q-transition--scale-leave-to$/, () => ({
    opacity: 0,
    transform: 'scale3d(0, 0, 1)'
  })),

  // ============================================================
  // ROTATE TRANSITION
  // ============================================================
  rule(/^q-transition--rotate-enter-active$/, () => ({
    transition: `opacity var(--q-transition-duration), transform var(--q-transition-duration) var(--q-transition-easing)`,
    transformStyle: 'preserve-3d'
  })),
  rule(/^q-transition--rotate-leave-active$/, () => ({
    position: 'absolute',
    transition: `opacity var(--q-transition-duration), transform var(--q-transition-duration) var(--q-transition-easing)`,
    transformStyle: 'preserve-3d'
  })),
  rule(/^q-transition--rotate-enter-from$/, () => ({
    opacity: 0,
    transform: 'scale3d(0, 0, 1) rotate3d(0, 0, 1, 90deg)'
  })),
  rule(/^q-transition--rotate-leave-to$/, () => ({
    opacity: 0,
    transform: 'scale3d(0, 0, 1) rotate3d(0, 0, 1, 90deg)'
  })),

  // ============================================================
  // FLIP TRANSITIONS
  // ============================================================

  // --- Flip Right ---
  rule(/^q-transition--flip-right-enter-active$/, () => ({
    transition: flipTransition,
    backfaceVisibility: 'hidden'
  })),
  rule(/^q-transition--flip-right-leave-active$/, () => ({
    position: 'absolute',
    transition: flipTransition,
    backfaceVisibility: 'hidden'
  })),
  rule(/^q-transition--flip-right-enter-from$/, () => ({
    transform: 'perspective(400px) rotate3d(0, 1, 0, -180deg)'
  })),
  rule(/^q-transition--flip-right-leave-to$/, () => ({
    transform: 'perspective(400px) rotate3d(0, 1, 0, 180deg)'
  })),
  rule(/^q-transition--flip-right-enter-to$/, () => ({
    transform: 'perspective(400px) rotate3d(1, 1, 0, 0deg)'
  })),
  rule(/^q-transition--flip-right-leave-from$/, () => ({
    transform: 'perspective(400px) rotate3d(1, 1, 0, 0deg)'
  })),

  // --- Flip Left ---
  rule(/^q-transition--flip-left-enter-active$/, () => ({
    transition: flipTransition,
    backfaceVisibility: 'hidden'
  })),
  rule(/^q-transition--flip-left-leave-active$/, () => ({
    position: 'absolute',
    transition: flipTransition,
    backfaceVisibility: 'hidden'
  })),
  rule(/^q-transition--flip-left-enter-from$/, () => ({
    transform: 'perspective(400px) rotate3d(0, 1, 0, 180deg)'
  })),
  rule(/^q-transition--flip-left-leave-to$/, () => ({
    transform: 'perspective(400px) rotate3d(0, 1, 0, -180deg)'
  })),
  rule(/^q-transition--flip-left-enter-to$/, () => ({
    transform: 'perspective(400px) rotate3d(1, 1, 0, 0deg)'
  })),
  rule(/^q-transition--flip-left-leave-from$/, () => ({
    transform: 'perspective(400px) rotate3d(1, 1, 0, 0deg)'
  })),

  // --- Flip Up ---
  rule(/^q-transition--flip-up-enter-active$/, () => ({
    transition: flipTransition,
    backfaceVisibility: 'hidden'
  })),
  rule(/^q-transition--flip-up-leave-active$/, () => ({
    position: 'absolute',
    transition: flipTransition,
    backfaceVisibility: 'hidden'
  })),
  rule(/^q-transition--flip-up-enter-from$/, () => ({
    transform: 'perspective(400px) rotate3d(1, 0, 0, -180deg)'
  })),
  rule(/^q-transition--flip-up-leave-to$/, () => ({
    transform: 'perspective(400px) rotate3d(1, 0, 0, 180deg)'
  })),
  rule(/^q-transition--flip-up-enter-to$/, () => ({
    transform: 'perspective(400px) rotate3d(1, 1, 0, 0deg)'
  })),
  rule(/^q-transition--flip-up-leave-from$/, () => ({
    transform: 'perspective(400px) rotate3d(1, 1, 0, 0deg)'
  })),

  // --- Flip Down ---
  rule(/^q-transition--flip-down-enter-active$/, () => ({
    transition: flipTransition,
    backfaceVisibility: 'hidden'
  })),
  rule(/^q-transition--flip-down-leave-active$/, () => ({
    position: 'absolute',
    transition: flipTransition,
    backfaceVisibility: 'hidden'
  })),
  rule(/^q-transition--flip-down-enter-from$/, () => ({
    transform: 'perspective(400px) rotate3d(1, 0, 0, 180deg)'
  })),
  rule(/^q-transition--flip-down-leave-to$/, () => ({
    transform: 'perspective(400px) rotate3d(1, 0, 0, -180deg)'
  })),
  rule(/^q-transition--flip-down-enter-to$/, () => ({
    transform: 'perspective(400px) rotate3d(1, 1, 0, 0deg)'
  })),
  rule(/^q-transition--flip-down-leave-from$/, () => ({
    transform: 'perspective(400px) rotate3d(1, 1, 0, 0deg)'
  }))
]
