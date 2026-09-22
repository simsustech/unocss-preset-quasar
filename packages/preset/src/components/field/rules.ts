import type { Rule } from '@unocss/core'

export const fieldRules = [
  [
    /^q-field$/,
    function* (_, { symbols }) {
      // .q-field
      yield {
        display: 'flex',
        'flex-direction': 'column',
        position: 'relative'
      }
      yield { 'font-size': '14px' }
      yield {
        [symbols.selector]: (selector) =>
          `body.quasar-style-unstyled ${selector}`,
        background: 'none',
        color: 'inherit'
      }
      // Reference: `.q-field ::-ms-clear, .q-field ::-ms-reveal { display: none }`.
      // Deliberately NOT emitted. `::-ms-clear`/`::-ms-reveal` are invalid
      // selectors outside IE/legacy Edge, and one invalid selector discards the
      // whole rule it appears in — Chrome throws away the reference rule for the
      // same reason, so nothing renders differently. What does differ is our
      // equal-declaration merging: it folds every `display: none` rule into a
      // single selector list, and these two selectors silently killed 29
      // unrelated declarations with it (`.hidden`, `.q-field__after:empty`,
      // `.q-tabs--not-scrollable .q-tabs__arrow`, `.q-drawer--mini
      // .q-mini-drawer-hide`, both `.q-drawer--*/q-mini-drawer-only` rules, the
      // stepper and date rules …). `test/no-invalid-selectors.test.ts` guards it.
      yield {
        [symbols.selector]: (selector) => `${selector}__control`,
        display: 'flex',
        'align-items': 'center',
        position: 'relative',
        'border-radius': 'var(--q-radius-sm)',
        'min-height': 'var(--q-size-md)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__control:before`,
        content: '""',
        position: 'absolute',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        'pointer-events': 'none',
        'border-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__control:after`,
        content: '""',
        position: 'absolute',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        'pointer-events': 'none'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}__control`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__control`,
        color: 'var(--q-primary)',
        'outline-style': 'none',
        display: 'flex',
        'flex-direction': 'row',
        width: '100%',
        height: '56px',
        'max-width': '100%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__label`,
        position: 'absolute',
        transform: 'translateY(-50%)',
        'pointer-events': 'none'
        // `left`/`top`/`transition` come from the yield below: it carries the
        // reference's own values (`left: 0`, `top: 18px`,
        // `transition: transform 0.36s ...`), and the fold made this first yield
        // win, which put the floated label at the control's centre and collided
        // with the value text in every field.
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__label`,
        'font-size': 'var(--q-body-large-size)',
        // quasar: 1.25 is Quasar's label line-height, not a type role
        'line-height': '1.25',
        'letter-spacing': 'var(--q-body-large-tracking)',
        'font-weight': 'var(--fontWeight-normal)',
        'max-width': '100%',
        'transform-origin': 'left top',
        color: 'var(--q-on-surface-variant)',
        'text-decoration': 'inherit',
        'text-transform': 'inherit',
        transition:
          'transform 0.36s var(--q-easing-standard), max-width 0.324s var(--q-easing-standard)',
        'backface-visibility': 'hidden',
        left: '0',
        top: '18px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__label--floating`,
        top: '8px',
        transform: 'translateY(0)',
        // quasar: relative scaling: an absolute role size would change nested contexts
        'font-size': '0.75em'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__native`,
        width: '100%',
        border: 'none',
        outline: 'none',
        background: 'transparent'
        // No `padding` here. This yield used to carry the hand-rolled
        // `padding: 16px 12px 8px`, which fought the reference's per-variant
        // padding (`padding-inline: 0` on the base native, `padding-top: 24px;
        // padding-bottom: 8px` for `--labeled`): the shorthand's 12px inline
        // padding won on every field, so the native sat 12px in from the
        // reference position.
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}__native`,
        color: '#fff'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__native`,
        // The native control is exactly the MD3 body-large role (16px/24px, 400
        // and Roboto), so it takes the role token instead of restating it. The
        // declaration order matters: the `font` shorthand resets letter-spacing,
        // so the tracking is declared after it (UnoCSS keeps a yield's
        // declaration order, it only reorders yields).
        font: 'var(--q-body-large)',
        'letter-spacing': 'var(--q-body-large-tracking)',
        'padding-inline': '0',
        'outline-style': 'none !important',
        'border-radius': '0',
        'border-style': 'none',
        'background-color': 'transparent',
        width: '100%',
        'min-width': '0',
        'user-select': 'auto',
        '-webkit-user-select': 'auto',
        'text-decoration': 'inherit',
        'text-transform': 'inherit',
        color: 'var(--q-on-surface)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__native[type='file']`,
        // quasar: Quasar's file-input line-height
        'line-height': '1em'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__native:-webkit-autofill`,
        'margin-top': '1px',
        'margin-bottom': '1px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__native::placeholder`,
        color: 'transparent'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__native:focus-visible`,
        'outline-style': 'none !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__native:invalid`,
        'outline-style': 'none !important',
        'box-shadow': 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__native[type='color'] + .q-field__label`,
        scale: '0.75',
        transform: 'translateY(-40%)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__native[type='date'] + .q-field__label`,
        scale: '0.75',
        transform: 'translateY(-40%)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__native[type='datetime-local'] + .q-field__label`,
        scale: '0.75',
        transform: 'translateY(-40%)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__native[type='month'] + .q-field__label`,
        scale: '0.75',
        transform: 'translateY(-40%)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__native[type='time'] + .q-field__label`,
        scale: '0.75',
        transform: 'translateY(-40%)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__native[type='week'] + .q-field__label`,
        scale: '0.75',
        transform: 'translateY(-40%)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__native:-webkit-autofill + .q-field__label`,
        scale: '0.75',
        transform: 'translateY(-40%)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__bottom`,
        display: 'flex',
        'justify-content': 'space-between',
        // quasar: this value is Quasar's own, not a forked token
        'min-height': '20px',
        padding: '4px 12px 0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__bottom`,
        'font-size': 'var(--q-body-small-size)',
        // quasar: Quasar's message line-height
        'line-height': '1',
        'margin-top': '4px',
        'padding-inline': 'var(--q-space-md)',
        'padding-bottom': '0',
        'background-color': 'transparent',
        color: 'var(--q-on-surface-variant)',
        'backface-visibility': 'hidden'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__bottom--animated`,
        left: '0',
        right: '0',
        bottom: '0',
        transition: 'color 0.3s, opacity 0.3s'
      }
      yield {
        [symbols.selector]: (selector: string) =>
          `${selector}--filled .q-field__control`,
        'background-color': 'var(--q-surface-container-highest)',
        // quasar.sass &--filled: `border-radius: $generic-border-radius
        // $generic-border-radius 0 0`. The MD3 filled text field rounds its top
        // corners only (4dp), so a filled field is not a square box.
        'border-radius':
          'var(--q-corner-extra-small) var(--q-corner-extra-small) 0 0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--filled .q-field__control:before`,
        background: 'rgba(0, 0, 0, 0.05)',
        'border-bottom': '1px solid rgba(0, 0, 0, 0.42)',
        opacity: '0',
        transition:
          'opacity 0.36s var(--q-easing-standard), background 0.36s var(--q-easing-standard)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--filled .q-field__control:hover:before`,
        opacity: '1'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--filled .q-field__control:after`,
        height: '2px',
        top: 'auto',
        'transform-origin': 'center bottom',
        transform: 'scale3d(0, 1, 1)',
        background: 'currentColor',
        transition: 'transform 0.36s var(--q-easing-standard)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--filled.q-field--highlighted .q-field__control:before`,
        opacity: '1',
        background: 'rgba(0, 0, 0, 0.12)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--filled.q-field--highlighted .q-field__control:after`,
        transform: 'scale3d(1, 1, 1)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--filled.q-field--dark .q-field__control, ${selector}--filled.q-field--dark .q-field__control:before`,
        background: 'rgba(255, 255, 255, 0.07)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--filled.q-field--dark.q-field--highlighted .q-field__control:before`,
        background: 'rgba(255, 255, 255, 0.1)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--filled.q-field--readonly .q-field__control:before`,
        opacity: '1',
        background: 'transparent',
        'border-bottom-style': 'dashed'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.body--dark ${selector}--filled > .q-field__inner > .q-field__control`,
        color: 'var(--q-on-surface-variant)',
        'background-color': 'var(--q-surface-container-highest)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--filled > .q-field__inner > .q-field__control`,
        color: 'var(--q-on-surface-variant)',
        'padding-inline': 'var(--q-space-lg)',
        'padding-block': '0',
        'border-top-left-radius': '4px',
        'border-top-right-radius': '4px',
        'border-bottom-left-radius': '0px',
        'border-bottom-right-radius': '0px',
        'background-color': 'rgba(0, 0, 0, 0.05)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--filled .q-field__control:before`,
        'background-color': 'rgba(0, 0, 0, 0.05)',
        opacity: '0%',
        'border-bottom': '1px solid rgba(0, 0, 0, 0.42)',
        transition:
          'opacity 0.36s var(--q-easing-standard), background 0.36s var(--q-easing-standard)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--filled .q-field__control:after`,
        'background-color': 'currentColor',
        height: '2px',
        'transform-origin': 'center bottom',
        transform: 'scale3d(0, 1, 1)',
        transition: 'transform 0.36s var(--q-easing-standard)',
        top: 'auto'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--filled > * > .q-field--highlighted .q-field__control:before`,
        'background-color': 'rgba(0, 0, 0, 0.12)',
        opacity: '100%'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--filled.q-field--readonly .q-field__control:before`,
        'background-color': 'transparent',
        opacity: '100%',
        'border-bottom-style': 'dashed'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--filled > * > .q-field--highlighted .q-field__control:after`,
        transform: 'scale3d(1, 1, 1)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--filled.q-field--rounded .q-field__control`,
        'border-top-left-radius': '28px',
        'border-top-right-radius': '28px',
        'border-bottom-left-radius': '0',
        'border-bottom-right-radius': '0'
      }
      // The field's surface belongs to `.q-field__control`, never to the root.
      // These four variants used to paint the whole field — root included — so
      // every `--standard` field (the interaction app's login form, the agenda's
      // filters, …) rendered as a grey slab: the background covered the
      // `.q-field__bottom` hint strip too, and `--outlined` drew its border on
      // the root, a pixel outside the control the reference outlines.
      // The reference has no root-level rule for any of them:
      //   `.q-field--standard .q-field__control`  carries the surface,
      //   `.q-field--standout .q-field__control`  already carried it here,
      //   `.q-field--outlined .q-field__control:before` draws the outline,
      //   `.body--dark .q-field--* .q-field__control` handle dark mode.
      // `test/field-root-surface.test.ts` keeps the root bare.
      yield {
        [symbols.selector]: (selector: string) =>
          `${selector}--outlined .q-field__control`,
        'border-radius': 'var(--q-corner-extra-small)',
        padding: '0 12px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--outlined .q-field__control:before`,
        border: '1px solid rgba(0, 0, 0, 0.24)',
        transition: 'border-color 0.36s var(--q-easing-standard)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--outlined .q-field__control:hover:before`,
        'border-color': '#000'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--outlined .q-field__control:after`,
        height: 'inherit',
        'border-radius': 'inherit',
        border: '2px solid transparent',
        transition: 'border-color 0.36s var(--q-easing-standard)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--outlined.q-field--highlighted .q-field__control:hover:before`,
        'border-color': 'transparent'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--outlined.q-field--highlighted .q-field__control:after`,
        'border-color': 'currentColor',
        'border-width': '2px',
        transform: 'scale3d(1, 1, 1)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--outlined.q-field--readonly .q-field__control:before`,
        'border-style': 'dashed'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--outlined .q-field__control`,
        'padding-inline': 'var(--q-space-md)',
        'padding-block': '0',
        'border-radius': 'var(--q-corner-extra-small)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--outlined .q-field__control:before`,
        'border-color': 'rgba(0, 0, 0, 0.24)',
        'border-style': 'solid',
        'border-width': '1px',
        transition: 'border-color 0.36s var(--q-easing-standard)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--outlined .q-field__control:after`,
        'border-color': 'transparent',
        'border-style': 'solid',
        height: 'inherit',
        'border-radius': 'inherit',
        'border-width': '2px',
        transition: 'border-color 0.36s var(--q-easing-standard)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--outlined.q-field--rounded .q-field__control`,
        'border-radius': 'var(--q-corner-extra-large)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--outlined .q-field__input:-webkit-autofill`,
        'margin-top': '1px',
        'margin-bottom': '1px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--outlined .q-field__native:-webkit-autofill`,
        'margin-top': '1px',
        'margin-bottom': '1px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--standard .q-field__control:before`,
        'border-bottom': '1px solid rgba(0, 0, 0, 0.24)',
        transition: 'border-color 0.36s var(--q-easing-standard)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--standard .q-field__control:hover:before`,
        'border-color': '#000'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--standard .q-field__control:after`,
        height: '2px',
        top: 'auto',
        'border-bottom-left-radius': 'inherit',
        'border-bottom-right-radius': 'inherit',
        'transform-origin': 'center bottom',
        transform: 'scale3d(0, 1, 1)',
        background: 'currentColor',
        transition: 'transform 0.36s var(--q-easing-standard)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--standard.q-field--highlighted .q-field__control:after`,
        transform: 'scale3d(1, 1, 1)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--standard.q-field--readonly .q-field__control:before`,
        'border-bottom-style': 'dashed'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.body--dark ${selector}--standard .q-field__control`,
        'background-color': 'var(--q-surface-container-highest)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--standard .q-field__control`,
        'padding-inline': 'var(--q-space-md)',
        'background-color': 'var(--q-surface-container-highest)',
        'border-top-left-radius': 'inherit',
        'border-top-right-radius': 'inherit'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--standard .q-field__control:after`,
        'background-color': 'currentColor',
        height: '2px',
        'transform-origin': 'center bottom',
        'border-bottom-left-radius': 'inherit',
        'border-bottom-right-radius': 'inherit',
        transform: 'scale3d(0, 1, 1)',
        transition: 'transform 0.36s var(--q-easing-standard)',
        top: 'auto'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--standard .q-field__bottom`,
        'padding-left': '0',
        'padding-right': '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--standard.q-field--dense .q-field__control`,
        'padding-left': '0',
        'padding-right': '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dark .q-field__control:before`,
        // Roles, not white literals: the dark field edge is on-surface-variant
        // at 60%, and the hover state takes it at full strength.
        'border-color':
          'color-mix(in oklab, var(--dark-on-surface-variant) 60%, transparent)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dark .q-field__control:hover:before`,
        'border-color': 'var(--dark-on-surface-variant)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dark .q-field__native`,
        color: 'var(--q-on-surface-variant)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dark .q-field__prefix`,
        color: 'var(--q-on-surface-variant)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dark .q-field__suffix`,
        color: 'var(--q-on-surface-variant)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dark .q-field__input`,
        color: 'var(--q-on-surface-variant)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dark .q-field__bottom`,
        color: 'var(--q-on-surface-variant)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dark .q-field__marginal`,
        color: 'var(--q-on-surface-variant)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dark:not(.q-field--highlighted) .q-field__label`,
        color: 'var(--q-on-surface-variant)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dense`,
        // quasar: this value is Quasar's own, not a forked token
        'min-height': '32px'
      }
      yield {
        [symbols.selector]: (selector: string) =>
          `${selector}--dense .q-field__label`,
        'font-size': 'var(--q-body-medium-size)',
        top: '10px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dense .q-field__bottom`,
        // quasar: Quasar's dense supporting size: neither body-small nor a label role
        'font-size': '11px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-field__marginal .q-avatar`,
        'font-size': 'var(--q-size-icon)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-field__control`,
        height: '40px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--dense .q-field__shadow`,
        top: '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-field__append + .q-field__append`,
        'padding-left': '2px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-field--with-bottom`,
        // quasar: this value is Quasar's own, not a forked token
        'padding-bottom': '19px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense.q-field--float .q-field__label`,
        transform: 'translateY(-40%)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense.q-field--labeled.q-field--dense .q-field__native`,
        // quasar: this value is Quasar's own, not a forked token
        'padding-top': '14px',
        'padding-bottom': '2px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense.q-field--labeled.q-field--dense .q-field__prefix`,
        // quasar: this value is Quasar's own, not a forked token
        'padding-top': '14px',
        'padding-bottom': '2px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense.q-field--labeled.q-field--dense .q-field__suffix`,
        // quasar: this value is Quasar's own, not a forked token
        'padding-top': '14px',
        'padding-bottom': '2px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-field__native + .q-field__label`,
        // quasar: relative scaling: an absolute role size would change nested contexts
        'font-size': '0.75em',
        transform: 'translateY(-40%) scale(0.75)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-field__native[type='color'] + .q-field__label`,
        scale: '0.75',
        transform: 'translateY(-40%)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-field__input[type='color'] + .q-field__label`,
        scale: '0.75',
        transform: 'translateY(-40%)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-field__native[type='date'] + .q-field__label`,
        scale: '0.75',
        transform: 'translateY(-40%)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-field__input[type='date'] + .q-field__label`,
        scale: '0.75',
        transform: 'translateY(-40%)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-field__native[type='datetime-local'] + .q-field__label`,
        scale: '0.75',
        transform: 'translateY(-40%)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-field__input[type='datetime-local'] + .q-field__label`,
        scale: '0.75',
        transform: 'translateY(-40%)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-field__native[type='month'] + .q-field__label`,
        scale: '0.75',
        transform: 'translateY(-40%)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-field__input[type='month'] + .q-field__label`,
        scale: '0.75',
        transform: 'translateY(-40%)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-field__native[type='time'] + .q-field__label`,
        scale: '0.75',
        transform: 'translateY(-40%)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-field__input[type='time'] + .q-field__label`,
        scale: '0.75',
        transform: 'translateY(-40%)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-field__native[type='week'] + .q-field__label`,
        scale: '0.75',
        transform: 'translateY(-40%)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-field__input[type='week'] + .q-field__label`,
        scale: '0.75',
        transform: 'translateY(-40%)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-field__native:-webkit-autofill + .q-field__label`,
        scale: '0.75',
        transform: 'translateY(-40%)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--dense .q-field__input:-webkit-autofill + .q-field__label`,
        scale: '0.75',
        transform: 'translateY(-40%)'
      }
      yield {
        [symbols.selector]: (selector: string) =>
          `${selector}--labeled .q-field__native, ${selector}--labeled .q-field__prefix, ${selector}--labeled .q-field__suffix`,
        'line-height': 'var(--q-body-large-line-height)',
        'padding-top': 'var(--q-space-xl)',
        'padding-bottom': 'var(--q-space-sm)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--labeled:not(.q-field--float) .q-field__native::placeholder`,
        color: 'transparent'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--labeled:not(.q-field--float) .q-field__input::placeholder`,
        color: 'transparent'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--labeled .q-field__shadow`,
        top: '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--labeled:not(.q-field--float) .q-field__prefix`,
        opacity: '0%'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--labeled:not(.q-field--float) .q-field__suffix`,
        opacity: '0%'
      }
      yield {
        [symbols.selector]: (selector: string) =>
          `${selector}--float .q-field__label`,
        'max-width': '133%',
        transform: 'translateY(-40%) scale(0.75)',
        transition:
          'transform 0.36s var(--q-easing-standard), max-width 0.396s var(--q-easing-standard)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--error`,
        color: 'var(--q-error)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--error .q-field__bottom`,
        color: 'var(--q-negative)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--error .q-field__label`,
        animation: 'q-field-label 0.36s'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--disabled`,
        opacity: '0.6',
        cursor: 'not-allowed'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--disabled .q-field__inner`,
        cursor: 'not-allowed'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--disabled .q-field__control`,
        'pointer-events': 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--disabled .q-placeholder`,
        opacity: '100% !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--disabled .q-field__control > div`,
        'outline-color': 'transparent !important',
        opacity: '60% !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--disabled .q-field__control > div *`,
        'outline-color': 'transparent !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--readonly .q-placeholder`,
        opacity: '100% !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--readonly.q-field--labeled .q-field__native`,
        cursor: 'default'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--readonly.q-field--labeled .q-field__input`,
        cursor: 'default'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--readonly.q-field--float .q-field__native`,
        cursor: 'text'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--readonly.q-field--float .q-field__input`,
        cursor: 'text'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--auto-height`,
        'min-height': 'auto'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--auto-height .q-field__native`,
        // quasar: Quasar's tight auto-height line
        'line-height': '18px',
        'min-height': 'var(--q-size-lg)',
        'align-items': 'center'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--auto-height .q-field__prefix`,
        // quasar: Quasar's tight auto-height line
        'line-height': '18px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--auto-height .q-field__suffix`,
        // quasar: Quasar's tight auto-height line
        'line-height': '18px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--auto-height .q-field__control`,
        height: 'auto',
        'min-height': 'var(--q-size-lg)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--auto-height.q-field--labeled .q-field__control-container`,
        'padding-top': 'var(--q-space-xl)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--auto-height.q-field--labeled .q-field__native`,
        'padding-top': '0',
        'min-height': 'var(--q-size-sm)',
        // Quasar orders these two the other way round in sass (`&--labeled` at
        // 2673, `&--auto-height` at 2742), so on a field that is both, the
        // auto-height rule's `line-height: 18px` is the one that applies — a
        // select in auto-height mode keeps the tighter line. UnoCSS emits the
        // yields of one rule alphabetically, and `--auto-height` sorts before
        // `--labeled`, so relying on order here would hand the win to the
        // labeled rule's 24px. Expressing it on the compound keeps the cascade
        // identical to quasar.css without depending on emission order.
        // quasar: Quasar's tight auto-height line
        'line-height': '18px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--auto-height.q-field--dense .q-field__control`,
        'min-height': 'var(--q-size-md)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--auto-height.q-field--dense .q-field__native`,
        'min-height': 'var(--q-size-md)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--auto-height.q-field--dense.q-field--labeled .q-field__native`,
        'min-height': 'var(--q-size-sm)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--auto-height.q-field--dense.q-field--labeled .q-field__control-container`,
        // quasar: this value is Quasar's own, not a forked token
        'padding-top': '10px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--auto-height .q-field__shadow`,
        top: '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--auto-height.q-field--dense .q-field__shadow`,
        top: '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--auto-height.q-field--labeled .q-field__shadow`,
        top: '24px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--auto-height.q-field--dense.q-field--labeled .q-field__shadow`,
        top: '14px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--item-aligned`,
        'align-items': 'center'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--item-aligned`,
        'padding-inline': 'var(--q-space-lg)',
        'padding-block': 'var(--q-space-sm)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--item-aligned .q-field__before`,
        'min-width': '56px'
      }
      // `--borderless` needs no root rule: it removes padding from the bottom
      // hint and the dense control (`.q-field--borderless .q-field__bottom`,
      // `.q-field--borderless.q-field--dense .q-field__control`), which the
      // preset emits, and no field root carries a border any more.
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--borderless .q-field__bottom`,
        'padding-left': '0',
        'padding-right': '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--borderless.q-field--dense .q-field__control`,
        'padding-left': '0',
        'padding-right': '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--rounded`,
        'border-radius': 'var(--q-radius-xl)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}--square`,
        'border-radius': '0'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--square .q-field__control`,
        // quasar: this value is Quasar's own, not a forked token
        'border-radius': '0 !important'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--standout .q-field__control:before`,
        background: 'rgba(0, 0, 0, 0.07)',
        opacity: '0',
        transition:
          'opacity 0.36s var(--q-easing-standard), background 0.36s var(--q-easing-standard)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--standout .q-field__control:hover:before`,
        opacity: '1'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--standout.q-field--readonly .q-field__control:before`,
        opacity: '1',
        background: 'transparent',
        border: '1px dashed rgba(0, 0, 0, 0.24)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--standout.q-field--dark .q-field__control:before`,
        background: 'rgba(255, 255, 255, 0.07)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--standout.q-field--highlighted .q-field__control`,
        'box-shadow':
          '0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--standout.q-field--dark.q-field--readonly .q-field__control:before`,
        'border-color': 'rgba(255, 255, 255, 0.24)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--standout .q-field__control`,
        'padding-inline': 'var(--q-space-md)',
        'padding-block': '0',
        'border-radius': 'var(--q-corner-extra-small)',
        'background-color': 'var(--q-surface-container-highest)',
        transition:
          'box-shadow 0.36s var(--q-easing-standard), background-color 0.36s var(--q-easing-standard)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--standout.q-field--highlighted .q-field__native`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--standout.q-field--highlighted .q-field__prefix`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--standout.q-field--highlighted .q-field__suffix`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--standout.q-field--highlighted .q-field__append`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--standout.q-field--highlighted .q-field__prepend`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--standout.q-field--highlighted .q-field__input`,
        color: 'var(--q-on-surface)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--standout.q-field--dark.q-field--highlighted .q-field__native`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--standout.q-field--dark.q-field--highlighted .q-field__prefix`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--standout.q-field--dark.q-field--highlighted .q-field__suffix`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--standout.q-field--dark.q-field--highlighted .q-field__append`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--standout.q-field--dark.q-field--highlighted .q-field__prepend`,
        color: 'var(--q-primary)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--standout.q-field--dark.q-field--highlighted .q-field__input`,
        color: 'var(--q-on-surface)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--standout.q-field--dark.q-field--highlighted .q-field__input > .q-btn-item`,
        color: 'var(--q-on-surface)',
        'align-self': 'stretch'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--standout .q-field__control:before`,
        'background-color': 'rgba(0, 0, 0, 0.07)',
        opacity: '0%',
        transition:
          'opacity 0.36s var(--q-easing-standard), background 0.36s var(--q-easing-standard)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--standout.q-field--dark .q-field__control`,
        'background-color': 'var(--q-surface-container-highest)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--standout.q-field--dark.q-field--highlighted .q-field__control`,
        'background-color': 'var(--q-surface-container-highest)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--standout.q-field--dark .q-field__control:before`,
        'background-color': 'rgba(255, 255, 255, 0.07)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--standout.q-field--readonly .q-field__control:before`,
        'border-color': 'rgba(0, 0, 0, 0.24)',
        'border-style': 'dashed',
        'background-color': 'transparent',
        opacity: '100%',
        'border-width': '1px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--standout.q-field--rounded .q-field__control`,
        'border-radius': 'var(--q-corner-extra-large)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--standout.q-field--dark.q-field--readonly .q-field__control:before`,
        'background-color': 'transparent',
        'border-style': 'dashed'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__marginal`,
        height: '56px',
        // The reference states this as a role; this black-54% literal was the
        // parity copy and won over `var(--q-on-surface-variant)`.
        'font-size': 'var(--q-size-icon)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__marginal > * + *`,
        'margin-left': '2px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__marginal .q-avatar`,
        // quasar: Quasar's dense avatar size
        'font-size': '32px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__marginal`,
        'font-size': 'var(--q-size-icon)',
        color: 'var(--q-on-surface-variant)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__before`,
        'padding-right': '12px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__before`,
        'padding-right': '12px',
        flex: '0 1 auto'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__prepend`,
        'padding-right': '12px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__prepend`,
        'padding-right': '12px',
        flex: '0 1 auto'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__after`,
        'padding-left': '12px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__after:empty`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__after`,
        'padding-left': '12px',
        flex: '0 1 auto'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__append`,
        'padding-left': '12px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__append:empty`,
        display: 'none'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__append + .q-field__append`,
        'padding-left': '2px'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.body--dark ${selector}__append > .q-icon`,
        color: 'var(--q-on-surface-variant)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__append > .q-icon`,
        color: 'var(--q-on-surface-variant)',
        cursor: 'pointer !important'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__append`,
        'padding-left': '12px',
        flex: '0 1 auto'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__inner`,
        'text-align': 'left'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__messages`,
        // quasar: Quasar's message line-height
        'line-height': '1'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__messages > div`,
        'word-break': 'break-word',
        'word-wrap': 'break-word',
        'overflow-wrap': 'break-word'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__messages > div + div`,
        'margin-top': '4px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__counter`,
        'padding-left': '8px',
        // quasar: Quasar's counter line-height
        'line-height': '1'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__control-container`,
        height: 'inherit'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.q-field--auto-height ${selector}__control-container`,
        'padding-top': '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__control-container`,
        height: 'inherit',
        'flex-grow': '1000',
        'align-items': 'center'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__shadow`,
        top: '8px',
        opacity: '0',
        overflow: 'hidden',
        'white-space': 'pre-wrap',
        transition: 'opacity 0.36s var(--q-easing-standard)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__shadow + .q-field__native::placeholder`,
        transition: 'opacity 0.36s var(--q-easing-standard)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__shadow + .q-field__native:focus::placeholder`,
        opacity: '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__prefix`,
        'font-weight': 'var(--fontWeight-normal)',
        // quasar: Quasar's prefix/suffix line-box alignment
        'line-height': '28px',
        'letter-spacing': 'var(--q-body-large-tracking)',
        'text-decoration': 'inherit',
        'text-transform': 'inherit',
        border: 'none',
        'border-radius': '0',
        background: 'none',
        color: 'rgba(0, 0, 0, 0.87)',
        outline: '0',
        padding: '6px 0',
        transition: 'opacity 0.36s var(--q-easing-standard)',
        'white-space': 'nowrap',
        'padding-right': '4px'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}__prefix`,
        color: '#fff'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__prefix`,
        // quasar: Quasar's prefix/suffix line-box alignment
        'line-height': '28px',
        'letter-spacing': 'var(--q-body-large-tracking)',
        'font-weight': 'var(--fontWeight-normal)',
        'padding-inline': '0',
        'padding-block': '6px',
        'padding-right': '4px',
        'outline-style': 'none',
        'border-radius': '0',
        'border-style': 'none',
        'background-color': 'transparent',
        'white-space': 'nowrap',
        'text-decoration': 'inherit',
        'text-transform': 'inherit',
        color: 'var(--q-on-surface)',
        transition: 'opacity 0.36s var(--q-easing-standard)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.q-field--auto-height.q-field--labeled ${selector}__prefix`,
        'padding-top': '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__suffix`,
        'font-weight': 'var(--fontWeight-normal)',
        // quasar: Quasar's prefix/suffix line-box alignment
        'line-height': '28px',
        'letter-spacing': 'var(--q-body-large-tracking)',
        'text-decoration': 'inherit',
        'text-transform': 'inherit',
        border: 'none',
        'border-radius': '0',
        background: 'none',
        color: 'rgba(0, 0, 0, 0.87)',
        outline: '0',
        padding: '6px 0',
        transition: 'opacity 0.36s var(--q-easing-standard)',
        'white-space': 'nowrap',
        'padding-left': '4px'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}__suffix`,
        color: '#fff'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__suffix`,
        // quasar: Quasar's prefix/suffix line-box alignment
        'line-height': '28px',
        'letter-spacing': 'var(--q-body-large-tracking)',
        'font-weight': 'var(--fontWeight-normal)',
        'padding-inline': '0',
        'padding-block': '6px',
        'padding-left': '4px',
        'outline-style': 'none',
        'border-radius': '0',
        'border-style': 'none',
        'background-color': 'transparent',
        'white-space': 'nowrap',
        'text-decoration': 'inherit',
        'text-transform': 'inherit',
        color: 'var(--q-on-surface)',
        transition: 'opacity 0.36s var(--q-easing-standard)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.q-field--auto-height.q-field--labeled ${selector}__suffix`,
        'padding-top': '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__input`,
        'font-weight': 'var(--fontWeight-normal)',
        'line-height': 'var(--q-body-large-line-height)',
        'letter-spacing': 'var(--q-body-large-tracking)',
        'text-decoration': 'inherit',
        'text-transform': 'inherit',
        border: 'none',
        'border-radius': '0',
        background: 'none',
        color: 'rgba(0, 0, 0, 0.87)',
        outline: '0 !important',
        padding: '0',
        width: '100%',
        'min-width': '0',
        'user-select': 'auto',
        '-webkit-user-select': 'auto',
        height: '0',
        'min-height': 'var(--q-size-sm)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__input:autofill`,
        'animation-name': 'q-autofill',
        'animation-fill-mode': 'both'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__input:invalid`,
        'box-shadow': 'none'
      }
      yield {
        [symbols.selector]: (selector) => `.body--dark ${selector}__input`,
        color: '#fff'
      }
      yield {
        [symbols.selector]: (selector) =>
          `.body--dark .q-field--standout.q-field--dark.q-field--highlighted ${selector}__input > .q-btn-item`,
        color: 'var(--q-on-surface)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__input`,
        'line-height': 'var(--q-body-large-line-height)',
        'letter-spacing': 'var(--q-body-large-tracking)',
        'font-weight': 'var(--fontWeight-normal)',
        'padding-inline': '0',
        // quasar: this value is Quasar's own, not a forked token
        'padding-block': '6px',
        'outline-style': 'none !important',
        'border-radius': '0',
        'border-style': 'none',
        'background-color': 'transparent',
        'min-width': '0',
        color: 'var(--q-on-surface)'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__input:-webkit-autofill`,
        'margin-top': '1px',
        'margin-bottom': '1px'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__input::placeholder`,
        color: 'transparent'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__input[type='color'] + .q-field__label`,
        scale: '0.75',
        transform: 'translateY(-40%)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__input[type='date'] + .q-field__label`,
        scale: '0.75',
        transform: 'translateY(-40%)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__input[type='datetime-local'] + .q-field__label`,
        scale: '0.75',
        transform: 'translateY(-40%)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__input[type='month'] + .q-field__label`,
        scale: '0.75',
        transform: 'translateY(-40%)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__input[type='time'] + .q-field__label`,
        scale: '0.75',
        transform: 'translateY(-40%)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__input[type='week'] + .q-field__label`,
        scale: '0.75',
        transform: 'translateY(-40%)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}__input:-webkit-autofill + .q-field__label`,
        scale: '0.75',
        transform: 'translateY(-40%)'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--highlighted .q-field__label`,
        color: 'currentColor'
      }
      yield {
        [symbols.selector]: (selector) =>
          `${selector}--highlighted .q-field__shadow`,
        opacity: '50%'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__focusable-action`,
        opacity: '0.6',
        cursor: 'pointer',
        outline: '0 !important',
        border: '0',
        color: 'inherit',
        background: 'transparent',
        padding: '0'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__focusable-action:hover`,
        opacity: '1'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}__focusable-action:focus`,
        opacity: '1'
      }
    }
  ]
] as Rule[]
