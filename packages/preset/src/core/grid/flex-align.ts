import type { ComponentRule } from '../../rules/types.js'

/**
 * Quasar's flex alignment utilities — `align-items`, `justify-content`,
 * `align-content` and `align-self` — verbatim from quasar.css.
 *
 * These are not optional polish: Quasar's own components apply them at runtime.
 * The Notify plugin puts `items-start`/`items-end`/`items-center` on
 * `.q-notifications__list`, which is what makes a notification shrink to its
 * content and sit on the correct side of the stack. Without the rule,
 * `align-items` stays `stretch` and every notification stretched the full
 * viewport width, covering the page beneath it.
 *
 * They are also the standard Quasar layout idiom in markup
 * (`<div class="row items-center justify-between">`), so their absence silently
 * broke user layouts too.
 *
 * Kept in its own module rather than inlined into `gridRules` so the generated
 * entries cannot widen that array's element type, which broke the
 * destructured-parameter inference of the gutter rules there.
 */
const FLEX_ALIGN: [cls: string, property: string, value: string][] = [
  ['items-start', 'align-items', 'flex-start'],
  ['items-end', 'align-items', 'flex-end'],
  ['items-center', 'align-items', 'center'],
  ['items-baseline', 'align-items', 'baseline'],
  ['items-stretch', 'align-items', 'stretch'],
  ['justify-start', 'justify-content', 'flex-start'],
  ['justify-end', 'justify-content', 'flex-end'],
  ['justify-center', 'justify-content', 'center'],
  ['justify-between', 'justify-content', 'space-between'],
  ['justify-around', 'justify-content', 'space-around'],
  ['justify-evenly', 'justify-content', 'space-evenly'],
  ['content-start', 'align-content', 'flex-start'],
  ['content-end', 'align-content', 'flex-end'],
  ['content-center', 'align-content', 'center'],
  ['content-stretch', 'align-content', 'stretch'],
  ['content-between', 'align-content', 'space-between'],
  ['content-around', 'align-content', 'space-around'],
  ['self-start', 'align-self', 'flex-start'],
  ['self-end', 'align-self', 'flex-end'],
  ['self-center', 'align-self', 'center'],
  ['self-baseline', 'align-self', 'baseline'],
  ['self-stretch', 'align-self', 'stretch']
]

export const gridFlexAlignRules: ComponentRule[] = FLEX_ALIGN.map(
  ([cls, property, value]) => [
    new RegExp(`^${cls}$`),
    () => ({ [property]: value })
  ]
)
