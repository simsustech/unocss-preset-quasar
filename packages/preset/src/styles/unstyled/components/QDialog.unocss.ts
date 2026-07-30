import type { Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { makeQDialogShortcuts } from '../../shared/components/QDialog.unocss.js'
import { bindSpec } from '../../_spec.js'

const s = bindSpec('unstyled')
export const shortcuts = makeQDialogShortcuts(s)
