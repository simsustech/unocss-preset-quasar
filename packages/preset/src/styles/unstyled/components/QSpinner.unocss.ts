import type { Preflight, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { makeQSpinnerShortcuts } from '../../shared/components/QSpinner.unocss.js'
import { bindSpec } from '../../_spec.js'

const s = bindSpec('unstyled')
const { preflights, shortcuts } = makeQSpinnerShortcuts(s)
export { shortcuts, preflights }
