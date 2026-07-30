import type { Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { makeQChipShortcuts } from '../../shared/components/QChip.unocss.js'
import { bindSpec } from '../../_spec.js'

const s = bindSpec('unstyled')
export const shortcuts = makeQChipShortcuts(s)
