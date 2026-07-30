import type { Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { makeQInputShortcuts } from '../../shared/components/QInput.unocss.js'
import { bindSpec } from '../../_spec.js'

const s = bindSpec('unstyled')
export const shortcuts = makeQInputShortcuts(s)
