import type { Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { makeQBtnDropdownShortcuts } from '../../shared/components/QBtnDropdown.unocss.js'
import { bindSpec } from '../../_spec.js'

const s = bindSpec('unstyled')
export const shortcuts = makeQBtnDropdownShortcuts(s)
