import type { Rule } from '@unocss/core'

export const iconRules = [
  [
    /^q-icon$/,
    () => ({
      display: 'inline-flex',
      'align-items': 'center',
      'justify-content': 'center',
      width: '1em',
      height: '1em',
      'font-size': 'var(--q-size-icon)',
      'line-height': 1,
      'flex-shrink': 0
    })
  ],
  [
    /^q-icon--left$/,
    () => ({
      'margin-right': 'var(--q-space-sm)'
    })
  ],
  [
    /^q-icon--right$/,
    () => ({
      'margin-left': 'var(--q-space-sm)'
    })
  ],
  [
    /^q-icon:before$/,
    () => ({
      // Pseudo-element
    })
  ],
  [
    /^q-icon:after$/,
    () => ({
      // Pseudo-element
    })
  ],
  [
    /^q-icon$/,
    function* (_, { symbols }) {
      yield {
        [symbols.selector]: (_sel) => `.q-icon:before, .q-icon:after`,
        width: '100%',
        height: '100%',
        display: 'flex !important',
        'align-items': 'center',
        'justify-content': 'center'
      }
    }
  ][
    (/^material-icons$/,
    function* () {
      yield {
        userSelect: 'none',
        WebkitUserSelect: 'none',
        cursor: 'inherit',
        fontSize: 'inherit',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        verticalAlign: 'middle'
      }
    })
  ],
  [
    /^material-icons-outlined$/,
    function* () {
      yield {
        userSelect: 'none',
        WebkitUserSelect: 'none',
        cursor: 'inherit',
        fontSize: 'inherit',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        verticalAlign: 'middle'
      }
    }
  ],
  [
    /^material-icons-round$/,
    function* () {
      yield {
        userSelect: 'none',
        WebkitUserSelect: 'none',
        cursor: 'inherit',
        fontSize: 'inherit',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        verticalAlign: 'middle'
      }
    }
  ],
  [
    /^material-icons-sharp$/,
    function* () {
      yield {
        userSelect: 'none',
        WebkitUserSelect: 'none',
        cursor: 'inherit',
        fontSize: 'inherit',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        verticalAlign: 'middle'
      }
    }
  ],
  [
    /^material-symbols-outlined$/,
    function* () {
      yield {
        userSelect: 'none',
        WebkitUserSelect: 'none',
        cursor: 'inherit',
        fontSize: 'inherit',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        verticalAlign: 'middle'
      }
    }
  ],
  [
    /^material-symbols-rounded$/,
    function* () {
      yield {
        userSelect: 'none',
        WebkitUserSelect: 'none',
        cursor: 'inherit',
        fontSize: 'inherit',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        verticalAlign: 'middle'
      }
    }
  ],
  [
    /^material-symbols-sharp$/,
    function* () {
      yield {
        userSelect: 'none',
        WebkitUserSelect: 'none',
        cursor: 'inherit',
        fontSize: 'inherit',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        verticalAlign: 'middle'
      }
    }
  ]
] as Rule[]
