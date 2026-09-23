import { symbols } from '@unocss/core'
import type { Rule } from '@unocss/core'

/**
 * The unstyled resets for the ported qmarkdown sheet — one per rule whose theming
 * value is a literal (the Prism palette, upstream's own greys and surfaces).
 *
 * They live with the style, not with the extension: the switch is listing
 * `Unstyled`, and an app that declares qmarkdown without it keeps its syntax
 * colours. Each yield states the sub-selectors it targets; the style's scope
 * prefixes every member of those groups (see `rules/scope.ts`).
 */
export const qmarkdownRules: Rule[] = [
  [
    /^q-markdown$/u,
    function* () {
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .token.comment, ${selector} .token.block-comment, ${selector} .token.prolog, ${selector} .token.doctype, ${selector} .token.cdata`,
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} .token.punctuation`,
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .token.property, ${selector} .token.tag, ${selector} .token.boolean, ${selector} .token.number, ${selector} .token.function-name, ${selector} .token.constant, ${selector} .token.symbol, ${selector} .token.deleted`,
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .token.selector, ${selector} .token.attr-name, ${selector} .token.string, ${selector} .token.char, ${selector} .token.function, ${selector} .token.builtin, ${selector} .token.inserted`,
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} .token.operator`,
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .token.entity, ${selector} .token.url, ${selector} .token.variable`,
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .token.atrule, ${selector} .token.attr-value, ${selector} .token.keyword, ${selector} .token.class-name`,
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .token.regex, ${selector} .token.important`,
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .language-css .token.string, ${selector} .style .token.string`,
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .token.tab:not(:empty):before, ${selector} .token.cr:before, ${selector} .token.lf:before`,
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--note-- .q-markdown--link`,
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--note--info .q-markdown--link`,
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--note--info .q-markdown--note-title`,
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--note--tip .q-markdown--link`,
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--note--tip .q-markdown--note-title`,
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--note--warning .q-markdown--link`,
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--note--warning .q-markdown--note-title`,
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--note--danger .q-markdown--link`,
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--note--danger .q-markdown--note-title`,
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--table`,
        'border-color': 'currentColor'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--line-number`,
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `blockquote${selector}--note`,
        'border-color': 'currentColor'
      }
      yield {
        [symbols.selector]: (selector) =>
          `body.body--dark ${selector} blockquote.q-markdown--note`,
        'border-color': 'currentColor'
      }
      yield {
        [symbols.selector]: (selector) =>
          `body.body--dark ${selector} .q-markdown--table thead tr th`,
        'background-color': 'transparent'
      }
      yield {
        [symbols.selector]: (selector) =>
          `body.body--dark ${selector} .q-markdown--table tbody`,
        'background-color': 'transparent'
      }
    }
  ]
]
