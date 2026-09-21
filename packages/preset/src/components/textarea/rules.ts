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
        [symbols.selector]: (sel) => `${sel} .q-field__control`,
        'min-height': '56px',
        height: 'auto'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__control-container`,
        'padding-top': '2px',
        'padding-bottom': '2px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__native`,
        'line-height': '18px',
        'padding-top': '17px',
        'min-height': '52px',
        resize: 'vertical'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__prefix`,
        'line-height': '18px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__suffix`,
        'line-height': '18px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__shadow`,
        top: '2px',
        bottom: '2px'
      }
      // Labelled: the container reserves the label's line, so the native box
      // starts below it.
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--labeled .q-field__control-container`,
        'padding-top': '26px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.q-field--labeled .q-field__native`,
        'padding-top': '1px',
        'min-height': '26px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.q-field--labeled .q-field__prefix`,
        'padding-top': '0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.q-field--labeled .q-field__suffix`,
        'padding-top': '0'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.q-field--labeled .q-field__shadow`,
        top: '26px'
      }
      // Dense: 36px control, 24px native when labelled.
      yield {
        [symbols.selector]: (sel) => `${sel}.q-field--dense .q-field__control`,
        'min-height': '36px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.q-field--dense .q-field__native`,
        'padding-top': '9px',
        'min-height': '36px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--dense.q-field--labeled .q-field__control-container`,
        'padding-top': '14px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--dense.q-field--labeled .q-field__native`,
        'padding-top': '3px',
        'min-height': '24px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--dense.q-field--labeled .q-field__prefix`,
        'padding-top': '2px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--dense.q-field--labeled .q-field__suffix`,
        'padding-top': '2px'
      }
      yield {
        [symbols.selector]: (sel) =>
          `${sel}.q-field--dense.q-field--labeled .q-field__shadow`,
        top: '14px'
      }
      yield {
        [symbols.selector]: (sel) => `${sel}.disabled .q-field__native`,
        resize: 'none'
      }
    }
  ],
  [
    /^q-textarea--autogrow$/,
    function* (_, { symbols }) {
      // Autogrow measures the box itself, so the user handle must go.
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__native`,
        resize: 'none'
      }
    }
  ],
  [
    /^q-textarea\.disabled$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (sel) => `${sel} .q-field__native`,
        resize: 'none'
      }
    }
  ]
] as Rule[]
