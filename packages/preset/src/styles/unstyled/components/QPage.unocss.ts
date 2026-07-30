import type { Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { makeQPageShortcuts } from '../../shared/components/QPage.unocss.js'
import { bindSpec } from '../../_spec.js'

const s = bindSpec('unstyled')
export const shortcuts = makeQPageShortcuts(s)
