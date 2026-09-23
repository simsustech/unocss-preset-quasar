import type { Rule } from '@unocss/core'

/**
 * `QMarkdown.scss` — ported from the library's own stylesheet.
 *
 * Structural colours read the preset's tokens, which are themed and
 * scheme-aware, so upstream's palette literals and its `-dark` twins are not
 * carried. Upstream's dark fast path (17 selectors across
 * `.q-dark div`, `.body--dark div` and `.q-calendar--dark`) is dropped for
 * the same reason; the residue a token flip does not reproduce is emitted as a
 * `body.body--dark` yield.
 */

export const qmarkdownRules = [
  [
    /^q-markdown$/u,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .token.comment, ${selector} .token.block-comment, ${selector} .token.prolog, ${selector} .token.doctype, ${selector} .token.cdata`,
        color: '#7d8b99'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} .token.punctuation`,
        color: '#5f6364'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} .token.important`,
        'font-weight': 'normal'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} .token.bold`,
        // quasar: upstream's own value, not a forked role
        'font-weight': 'bold'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} .token.italic`,
        'font-style': 'italic'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} .token.entity`,
        cursor: 'help'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .token.property, ${selector} .token.tag, ${selector} .token.boolean, ${selector} .token.number, ${selector} .token.function-name, ${selector} .token.constant, ${selector} .token.symbol, ${selector} .token.deleted`,
        color: '#c92c2c'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .token.selector, ${selector} .token.attr-name, ${selector} .token.string, ${selector} .token.char, ${selector} .token.function, ${selector} .token.builtin, ${selector} .token.inserted`,
        color: '#2f9c0a'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} .token.operator`,
        color: '#ff2211'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .token.entity, ${selector} .token.url, ${selector} .token.variable`,
        color: '#a67f59'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .token.atrule, ${selector} .token.attr-value, ${selector} .token.keyword, ${selector} .token.class-name`,
        color: '#1990b8'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .token.regex, ${selector} .token.important`,
        color: '#e90'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .language-css .token.string, ${selector} .style .token.string`,
        color: '#a67f59',
        background: 'rgba(255, 255, 255, 0.5)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} .namespace`,
        opacity: '0.7'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} .token.tab:not(:empty):before, ${selector} .token.cr:before, ${selector} .token.lf:before`,
        color: '#e0d7d1'
      }
      // .q-markdown
      yield {
        '--q-markdown-link-color':
          'var(--qpress-color-primary, var(--q-primary, #1976d2))',
        '--q-markdown-link-hover-color':
          'color-mix(in srgb, var(--q-markdown-link-color) 82%, currentColor)',
        '--q-markdown-link-external-icon':
          "url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%3E%3Cpath%20d=%27M14%203v2h3.59L7.76%2014.83l1.41%201.41L19%206.41V10h2V3m-2%2016H5V5h7V3H5a2%202%200%200%200-2%202v14a2%202%200%200%200%202%202h14a2%202%200%200%200%202-2v-7h-2z%27/%3E%3C/svg%3E')",
        '--q-markdown-link-external-icon-display': 'inline-block',
        '--q-markdown-link-external-icon-size': '0.875em',
        '--q-markdown-link-external-icon-gap': '0.2em',
        position: 'relative'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--inline`,
        display: 'inline'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} details > summary`,
        display: 'list-item'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} code, ${selector} pre`,
        'font-family': 'Consolas, Monaco, Andale Mono, Ubuntu Mono, monospace'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} pre`,
        // quasar: upstream's own value, not a forked role
        'border-radius': '4px',
        padding: '5px',
        margin: '0',
        'background-size': '1.5em 1.5em',
        'background-origin': 'content-box',
        'background-attachment': 'local',
        'max-height': 'inherit',
        height: 'inherit',
        display: 'block',
        overflow: 'auto',
        position: 'relative',
        'font-size': '12px',
        background: '#eceff1',
        color: 'var(--q-on-surface)',
        'text-align': 'left',
        'white-space': 'pre',
        'word-spacing': 'normal',
        'word-break': 'normal',
        'word-wrap': 'normal',
        'line-height': '1.5em',
        'tab-size': '4',
        hyphens: 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} pre code`,
        'border-radius': '0',
        width: 'max-content'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--heading-h1`,
        // quasar: upstream's own value, not a forked role
        'font-size': '2rem !important',
        'line-height': '2rem !important',
        padding: '1rem 0',
        'font-weight': '500',
        margin: '0 0 1rem'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--heading-h2`,
        // quasar: upstream's own value, not a forked role
        'font-size': '1.5rem !important',
        'line-height': '1.5rem !important',
        padding: '0.5rem 0',
        'font-weight': '500',
        margin: '1rem 0 1rem'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--heading-h3`,
        // quasar: upstream's own value, not a forked role
        'font-size': '1.1rem !important',
        'line-height': '1.1rem !important',
        padding: '0.45rem 0',
        margin: '1rem 0 1rem'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--heading-h4`,
        // quasar: upstream's own value, not a forked role
        'font-size': '1rem !important',
        'line-height': '1rem !important',
        padding: '0.25rem 0',
        margin: '1rem 0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--heading-h5`,
        // quasar: upstream's own value, not a forked role
        'font-size': '0.9rem !important',
        margin: '1rem 0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--heading-h6`,
        // quasar: upstream's own value, not a forked role
        'font-size': '0.8rem !important',
        margin: '1rem 0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--heading .q-markdown--link`,
        color: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--heading--anchor-link`,
        cursor: 'pointer'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--heading--anchor-link:after`,
        content: '" #"',
        opacity: '0',
        transition: 'opacity 0.2s'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--heading--anchor-link:hover:after`,
        opacity: '1'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--title-heavy`,
        'border-bottom': '3px solid #ccc'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--title-light`,
        'border-bottom': '1px solid #ccc'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--image`,
        'max-width': '100%',
        height: 'auto'
      }
      yield {
        [symbols.selector]: (selector) => `${selector} :where(a)`,
        color: 'var(--q-markdown-link-color)',
        'text-decoration-color':
          'color-mix(in srgb, var(--q-markdown-link-color) 64%, transparent)',
        'text-underline-offset': '0.16em',
        transition: 'color 0.2s, opacity 0.2s, text-decoration-color 0.2s'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector} :where(a):focus-visible, ${selector} :where(a):hover`,
        color: 'var(--q-markdown-link-hover-color)',
        'text-decoration-color': 'currentColor',
        opacity: '0.92'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--link`,
        color: 'var(--q-markdown-link-color)',
        // quasar: upstream's own value, not a forked role
        'font-weight': '500',
        'text-decoration': 'none',
        outline: '0',
        'text-align': 'center',
        'border-bottom':
          '1px solid color-mix(in srgb, var(--q-markdown-link-color) 56%, transparent)',
        transition: 'border-color 0.2s, color 0.2s, opacity 0.2s'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--link:focus-visible, ${selector}--link:hover`,
        color: 'var(--q-markdown-link-hover-color)',
        'border-bottom-color': 'currentColor',
        opacity: '0.92'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--link-local`,
        'font-family': 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--link-external`,
        'font-family': 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--link-external:after`,
        content: '""',
        display: 'var(--q-markdown-link-external-icon-display)',
        width: 'var(--q-markdown-link-external-icon-size)',
        height: 'var(--q-markdown-link-external-icon-size)',
        'margin-inline-start': 'var(--q-markdown-link-external-icon-gap)',
        padding: '0',
        'vertical-align': '-0.1em',
        'background-color': 'currentColor',
        '-webkit-mask-image': 'var(--q-markdown-link-external-icon)',
        'mask-image': 'var(--q-markdown-link-external-icon)',
        '-webkit-mask-position': 'center',
        'mask-position': 'center',
        '-webkit-mask-repeat': 'no-repeat',
        'mask-repeat': 'no-repeat',
        '-webkit-mask-size': 'contain',
        'mask-size': 'contain'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--token`,
        'white-space': 'nowrap',
        background: 'var(--q-surface-container)',
        color: 'var(--q-on-surface)',
        border: '#616161 solid 1px',
        // quasar: upstream's own value, not a forked role
        padding: '1px 2px',
        'font-family': 'inherit',
        'border-radius': '4px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--note`,
        margin: '14px 0',
        // quasar: upstream's own value, not a forked role
        padding: '10px',
        'font-size': '1em',
        'letter-spacing': '0.5px',
        background: '#eceff1',
        color: 'var(--q-on-surface)',
        'font-weight': '400'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--note > p:last-child, ${selector}--note .q-markdown--note:last-child`,
        'margin-bottom': '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--note--`,
        'border-left':
          '10px solid rgb(68.0392156863%, 68.0392156863%, 68.0392156863%)',
        // quasar: upstream's own value, not a forked role
        'border-radius': '8px 0 0 8px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--note-- .q-markdown--link`,
        color: 'rgb(48.0392156863%, 48.0392156863%, 48.0392156863%)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--note--info`,
        'border-left':
          '10px solid rgb(57.2465581977%, 76.1802252816%, 94.9103045474%)',
        // quasar: upstream's own value, not a forked role
        'border-radius': '8px 0 0 8px',
        color: 'var(--q-on-surface-variant)',
        background: '#bbdefb'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--note--info .q-markdown--link`,
        color: 'rgb(21.5018773467%, 56.2653316646%, 90.6549853984%)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--note--info .q-markdown--note-title`,
        color: 'rgb(21.5018773467%, 56.2653316646%, 90.6549853984%)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--note--tip`,
        'border-left':
          '10px solid rgb(55.2822341058%, 82.3648247178%, 56.5418894831%)',
        // quasar: upstream's own value, not a forked role
        'border-radius': '8px 0 0 8px',
        color: 'var(--q-on-surface-variant)',
        background: '#c8e6c9'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--note--tip .q-markdown--link`,
        color: 'rgb(27.6173499703%, 70.0297088532%, 29.5900178253%)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--note--tip .q-markdown--note-title`,
        color: 'rgb(27.6173499703%, 70.0297088532%, 29.5900178253%)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--note--warning`,
        'border-left': '10px solid rgb(100%, 67.7357203751%, 50.1960784314%)',
        // quasar: upstream's own value, not a forked role
        'border-radius': '8px 0 0 8px',
        color: 'var(--q-on-surface-variant)',
        background: '#ffe0b2'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--note--warning .q-markdown--link`,
        color: 'rgb(100%, 41.8226768968%, 10.1960784314%)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--note--warning .q-markdown--note-title`,
        color: 'rgb(100%, 41.8226768968%, 10.1960784314%)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--note--danger`,
        'border-left': '10px solid rgb(100%, 35.6862745098%, 42.6841410139%)',
        // quasar: upstream's own value, not a forked role
        'border-radius': '8px 0 0 8px',
        color: 'var(--q-on-surface-variant)',
        background: '#ffcdd2'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--note--danger .q-markdown--link`,
        color: 'rgb(86.2371615313%, 34.939309057%, 34.939309057%)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--note--danger .q-markdown--note-title`,
        color: 'rgb(86.2371615313%, 34.939309057%, 34.939309057%)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--note-title`,
        // quasar: upstream's own value, not a forked role
        'font-weight': '800',
        'margin-left': '-4px',
        'margin-right': '-4px',
        padding: '0 4px',
        'margin-bottom': '4px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--table`,
        width: 'fit-content',
        'margin-bottom': '16px',
        'border-collapse': 'collapse',
        'max-width': '100%',
        'border-width': '1px',
        'border-style': 'solid',
        'border-color': '#9e9e9e'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--line-numbers-wrapper`,
        display: 'flex',
        'justify-content': 'flex-start',
        // quasar: upstream's own value, not a forked role
        'font-size': '12px',
        margin: '0 0 1em 0',
        background: '#eceff1',
        color: 'var(--q-on-surface)',
        'font-family':
          'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
        'border-radius': '4px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--line-numbers`,
        // quasar: upstream's own value, not a forked role
        padding: '5px',
        'text-align': 'right'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--line-number`,
        color: '#9e9e9e',
        margin: '0',
        position: 'relative',
        'text-align': 'left',
        'white-space': 'pre',
        'word-spacing': 'normal',
        'word-break': 'normal',
        'word-wrap': 'normal',
        // quasar: upstream's own value, not a forked role
        'line-height': '1.5',
        'tab-size': '4',
        hyphens: 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--code-wrapper`,
        width: '100%',
        'min-width': '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--code, ${selector}--code__inner`,
        margin: '0',
        position: 'relative',
        'text-align': 'left',
        'white-space': 'pre',
        'word-spacing': 'normal',
        'word-break': 'normal',
        'word-wrap': 'normal',
        // quasar: upstream's own value, not a forked role
        'line-height': '1.5',
        'tab-size': '4',
        hyphens: 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--code`,
        overflow: 'visible',
        padding: '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--code__inner`,
        'max-height': 'inherit',
        height: 'inherit',
        display: 'block',
        overflow: 'auto'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--table`,
        'border-color': 'var(--q-separator-color)',
        background: 'var(--q-surface-container)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--table thead`,
        background: 'var(--q-separator-color)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--table thead tr th`,
        // quasar: upstream's own value, not a forked role
        padding: '8px',
        'border-width': '1px',
        'border-style': 'solid',
        background: 'var(--q-surface-container-low)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--table tbody`,
        background: 'var(--q-surface-container)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--table tbody td, ${selector}--table tbody th`,
        // quasar: upstream's own value, not a forked role
        padding: '8px',
        'border-width': '1px',
        'border-style': 'solid'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--table tbody tr:nth-child(odd)`,
        background: 'var(--q-separator-color)'
      }
      yield {
        [symbols.selector]: (selector) => `blockquote${selector}--link`,
        background: 'transparent'
      }
      yield {
        [symbols.selector]: (selector) => `blockquote${selector}--note`,
        'border-width': '1px 8px 1px 8px',
        // quasar: upstream's own value, not a forked role
        'border-radius': '8px',
        'border-style': 'solid',
        'border-color': '#9e9e9e #009688'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__copy`,
        position: 'absolute',
        top: '15px',
        right: '15px'
      }
      // Dark-only in upstream: .q-markdown
      yield {
        [symbols.selector]: (selector) => `body.body--dark ${selector}`,
        '--q-markdown-link-color': 'var(--qpress-color-primary, #4fc3f7)',
        '--q-markdown-link-hover-color':
          'color-mix( in srgb, var(--q-markdown-link-color) 76%, var(--qpress-text-primary, #f5f5f5) )',
        color: 'var(--q-surface-container-low)'
      }
      // Dark-only in upstream: .q-markdown code
      yield {
        [symbols.selector]: (selector) => `body.body--dark ${selector} code`,
        background: 'var(--q-on-surface-variant)',
        color: 'var(--q-surface-container-low)'
      }
      // Dark-only in upstream: .q-markdown blockquote.q-markdown--note
      yield {
        [symbols.selector]: (selector) =>
          `body.body--dark ${selector} blockquote.q-markdown--note`,
        'border-color': '#9e9e9e #9e9e9e',
        background: '#1d1d1d',
        color: 'var(--q-surface-container-low)'
      }
      // Dark-only in upstream: .q-markdown pre
      yield {
        [symbols.selector]: (selector) => `body.body--dark ${selector} pre`,
        background: '#1d1d1d'
      }
      // Dark-only in upstream: .q-markdown pre code
      yield {
        [symbols.selector]: (selector) =>
          `body.body--dark ${selector} pre code`,
        background: '#1d1d1d'
      }
      // Dark-only in upstream: .q-markdown .q-markdown--line-numbers-wrapper
      yield {
        [symbols.selector]: (selector) =>
          `body.body--dark ${selector} .q-markdown--line-numbers-wrapper`,
        background: '#1d1d1d',
        color: 'var(--q-surface-container-low)'
      }
      // Dark-only in upstream: .q-markdown .q-markdown--token
      yield {
        [symbols.selector]: (selector) =>
          `body.body--dark ${selector} .q-markdown--token`,
        background: '#9e9e9e',
        color: 'var(--q-on-surface)',
        border: '#e0e0e0 solid 1px'
      }
      // Dark-only in upstream: .q-markdown .q-markdown--code
      yield {
        [symbols.selector]: (selector) =>
          `body.body--dark ${selector} .q-markdown--code`,
        background: '#1d1d1d',
        color: 'var(--q-on-surface)'
      }
      // Dark-only in upstream: .q-markdown .q-markdown--note
      yield {
        [symbols.selector]: (selector) =>
          `body.body--dark ${selector} .q-markdown--note`,
        background: 'var(--q-on-surface)',
        color: 'white',
        'border-top': '1px solid #424242',
        'border-bottom': '1px solid #424242'
      }
      // Dark-only in upstream: .q-markdown .q-markdown--note--
      yield {
        [symbols.selector]: (selector) =>
          `body.body--dark ${selector} .q-markdown--note--`,
        'border-left': '10px solid #9e9e9e'
      }
      // Dark-only in upstream: .q-markdown .q-markdown--note--info
      yield {
        [symbols.selector]: (selector) =>
          `body.body--dark ${selector} .q-markdown--note--info`,
        'border-left': '10px solid #01579b'
      }
      // Dark-only in upstream: .q-markdown .q-markdown--note--tip
      yield {
        [symbols.selector]: (selector) =>
          `body.body--dark ${selector} .q-markdown--note--tip`,
        'border-left': '10px solid #33691e'
      }
      // Dark-only in upstream: .q-markdown .q-markdown--note--warning
      yield {
        [symbols.selector]: (selector) =>
          `body.body--dark ${selector} .q-markdown--note--warning`,
        'border-left': '10px solid #e65100'
      }
      // Dark-only in upstream: .q-markdown .q-markdown--note--danger
      yield {
        [symbols.selector]: (selector) =>
          `body.body--dark ${selector} .q-markdown--note--danger`,
        'border-left': '10px solid #b71c1c'
      }
      // Dark-only in upstream: .q-markdown .q-markdown--table thead tr th
      yield {
        [symbols.selector]: (selector) =>
          `body.body--dark ${selector} .q-markdown--table thead tr th`,
        'background-color': '#1d1d1d'
      }
      // Dark-only in upstream: .q-markdown .q-markdown--table tbody
      yield {
        [symbols.selector]: (selector) =>
          `body.body--dark ${selector} .q-markdown--table tbody`,
        'background-color': '#1d1d1d'
      }
      // Dark-only in upstream: .q-markdown .q-markdown--table tbody tr:nth-child(2n+1)
      yield {
        [symbols.selector]: (selector) =>
          `body.body--dark ${selector} .q-markdown--table tbody tr:nth-child(2n+1)`,
        'background-color': 'var(--q-on-surface-variant)'
      }
    }
  ]
] as Rule[]
