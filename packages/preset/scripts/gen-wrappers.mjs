/**
 * Generate thin wrapper files for all md3 and md2 components.
 * Each wrapper imports from the shared spec-driven template and
 * binds the style-specific spec.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'

const SHARED_DIR = new URL('../src/styles/shared/components/', import.meta.url)
  .pathname
const MD3_DIR = new URL('../src/styles/md3/components/', import.meta.url)
  .pathname
const MD2_DIR = new URL('../src/styles/md2/components/', import.meta.url)
  .pathname

const components = [
  'QAjaxBar',
  'QAvatar',
  'QBadge',
  'QBanner',
  'QBar',
  'QBreadcrumbs',
  'QBtn',
  'QBtnDropdown',
  'QBtnToggle',
  'QCard',
  'QCarousel',
  'QChatMessage',
  'QCheckbox',
  'QChip',
  'QCircularProgress',
  'QColorPicker',
  'QDate',
  'QDialog',
  'QDrawer',
  'QEditor',
  'QExpansionItem',
  'QFab',
  'QField',
  'QFile',
  'QFooter',
  'QForm',
  'QHeader',
  'QIcon',
  'QImg',
  'QInnerLoading',
  'QInput',
  'QIntersection',
  'QItem',
  'QKnob',
  'QLayout',
  'QLinearProgress',
  'QMenu',
  'QOptionGroup',
  'QPage',
  'QPageSticky',
  'QPagination',
  'QParallax',
  'QPopupEdit',
  'QPullToRefresh',
  'QRadio',
  'QRating',
  'QResponsive',
  'QScrollarea',
  'QSelect',
  'QSeparator',
  'QSkeleton',
  'QSlideItem',
  'QSlider',
  'QSpace',
  'QSpinner',
  'QSplitter',
  'QStepper',
  'QTable',
  'QTabPanel',
  'QTabs',
  'QTimeline',
  'QTime',
  'QToggle',
  'QToolbar',
  'QTooltip',
  'QTree',
  'QUploader',
  'QVideo',
  'QVirtualScroll'
]

/**
 * Analyze a shared template to determine its return type
 * and the make-function name.
 */
function analyzeShared(name) {
  const filePath = `${SHARED_DIR}${name}.unocss.ts`
  if (!existsSync(filePath)) {
    return null
  }
  const content = readFileSync(filePath, 'utf-8')

  // Check if it has a make* function
  const makeMatch = content.match(/export function (make\w+Shortcuts)\(/)
  if (!makeMatch) {
    // No make function - exports shortcuts directly
    return { type: 'direct' }
  }

  const fnName = makeMatch[1]
  const hasBoth = content.includes('return { preflights, shortcuts }')

  return {
    type: hasBoth ? 'both' : 'shortcuts',
    fnName
  }
}

/**
 * Generate a wrapper file for one component in one style.
 */
function genWrapper(name, style) {
  const analysis = analyzeShared(name)
  if (!analysis) {
    console.error(`ERROR: Shared template not found for ${name}`)
    return
  }

  const dir = style === 'md3' ? MD3_DIR : MD2_DIR
  const filePath = `${dir}${name}.unocss.ts`

  if (analysis.type === 'direct') {
    // Simple re-export
    const content = `import { shortcuts } from '../../shared/components/${name}.unocss.js'

export { shortcuts }
`
    writeFileSync(filePath, content)
    console.log(`  ${name}.unocss.ts (direct re-export)`)
    return
  }

  const { fnName, type } = analysis
  const s = `bindSpec('${style}')`

  if (type === 'shortcuts') {
    const content = `import { ${fnName} } from '../../shared/components/${name}.unocss.js'
import { bindSpec } from '../../_spec.js'

const s = ${s}
export const shortcuts = ${fnName}(s)
`
    writeFileSync(filePath, content)
    console.log(`  ${name}.unocss.ts (shortcuts)`)
  } else {
    // both - returns { preflights, shortcuts }
    const content = `import { ${fnName} } from '../../shared/components/${name}.unocss.js'
import { bindSpec } from '../../_spec.js'

const s = ${s}
export const { preflights, shortcuts } = ${fnName}(s)
`
    writeFileSync(filePath, content)
    console.log(`  ${name}.unocss.ts (preflights + shortcuts)`)
  }
}

// Generate all wrappers
console.log('=== Generating md3 wrappers ===')
for (const name of components) {
  genWrapper(name, 'md3')
}

console.log()
console.log('=== Generating md2 wrappers ===')
for (const name of components) {
  genWrapper(name, 'md2')
}

console.log()
console.log('Done!')
