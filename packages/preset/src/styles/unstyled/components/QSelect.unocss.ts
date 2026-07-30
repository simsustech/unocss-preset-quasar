import type { Preflight, Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { makeQSelectShortcuts } from '../../shared/components/QSelect.unocss.js'
import { bindSpec } from '../../_spec.js'

const s = bindSpec('unstyled')
const { preflights, shortcuts } = makeQSelectShortcuts(s)
export { shortcuts, preflights }
