import type { Rule } from '@unocss/core'

/**
 * QTextarea — its own rule module, because the control's geometry differs from
 * QInput's: the native box grows (`height: auto`, `resize: vertical`) and the
 * labelled padding is measured from the top of the control rather than centred.
 *
 * Quasar adds `.q-textarea` to the QField root, so every rule here hangs on that
 * class and describes the field's descendants. Reference: quasar.css.
 */
export const textareaRules = [
  [
    /^q-textarea$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (selector) => `${selector} .q-field__control`,
        'min-height': 'var(--q-comp-lg)',
        height: 'auto'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .q-field__control-container`,
        // quasar: this value is Quasar's own, not a forked token
        'padding-top': '2px',
        'padding-bottom': '2px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} .q-field__native`,
        // quasar: this value is Quasar's own, not a forked token
        'line-height': '18px',
        'padding-top': '17px',
        'min-height': '52px',
        resize: 'vertical'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} .q-field__prefix`,
        // quasar: this value is Quasar's own, not a forked token
        'line-height': '18px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} .q-field__suffix`,
        // quasar: this value is Quasar's own, not a forked token
        'line-height': '18px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} .q-field__shadow`,
        top: '2px',
        bottom: '2px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}.q-field--labeled .q-field__control-container`,
        // quasar: this value is Quasar's own, not a forked token
        'padding-top': '26px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}.q-field--labeled .q-field__native`,
        // quasar: this value is Quasar's own, not a forked token
        'padding-top': '1px',
        'min-height': '26px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}.q-field--labeled .q-field__prefix`,
        'padding-top': '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}.q-field--labeled .q-field__suffix`,
        'padding-top': '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}.q-field--labeled .q-field__shadow`,
        top: '26px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}.q-field--dense .q-field__control`,
        // quasar: this value is Quasar's own, not a forked token
        'min-height': '36px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}.q-field--dense .q-field__native`,
        // quasar: this value is Quasar's own, not a forked token
        'padding-top': '9px',
        'min-height': '36px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}.q-field--dense.q-field--labeled .q-field__control-container`,
        // quasar: this value is Quasar's own, not a forked token
        'padding-top': '14px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}.q-field--dense.q-field--labeled .q-field__native`,
        // quasar: this value is Quasar's own, not a forked token
        'padding-top': '3px',
        'min-height': 'var(--q-comp-sm)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}.q-field--dense.q-field--labeled .q-field__prefix`,
        // quasar: this value is Quasar's own, not a forked token
        'padding-top': '2px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}.q-field--dense.q-field--labeled .q-field__suffix`,
        // quasar: this value is Quasar's own, not a forked token
        'padding-top': '2px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}.q-field--dense.q-field--labeled .q-field__shadow`,
        top: '14px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}.disabled .q-field__native`,
        resize: 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--autogrow .q-field__native`,
        resize: 'none'
      }
      // AUD-026 repair: this compound state cannot be a candidate, so it rides in
      // the emitted selector (dist: `.q-textarea.disabled .q-field__native
      // { resize: none }`, stated beside the mobile form).
      yield {
        [symbols.selector]: (sel: string) => `${sel}.disabled .q-field__native`,
        resize: 'none'
      }
    }
  ]
] as Rule[]
