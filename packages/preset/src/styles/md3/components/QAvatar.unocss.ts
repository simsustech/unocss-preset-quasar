import { makeQAvatarShortcuts } from '../../shared/components/QAvatar.unocss.js'
import { bindSpec } from '../../_spec.js'

const s = bindSpec('md3')
const shortcuts = makeQAvatarShortcuts(s)

export { shortcuts }
