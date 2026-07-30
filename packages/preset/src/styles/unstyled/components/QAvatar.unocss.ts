import type { Shortcut } from '@unocss/core'
import type { QuasarTheme } from '../../../theme.js'
import { makeQAvatarShortcuts } from '../../shared/components/QAvatar.unocss.js'
import { bindSpec } from '../../_spec.js'

const s = bindSpec('unstyled')
export const shortcuts = makeQAvatarShortcuts(s)
