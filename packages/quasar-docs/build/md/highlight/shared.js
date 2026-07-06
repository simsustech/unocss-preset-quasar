import { addClassToHast } from 'shiki/core'

import {
  transformerNotationDiff,
  transformerNotationFocus,
  transformerNotationHighlight
} from '@shikijs/transformers'

import quasarLight from './themes/quasar-light.json' with { type: 'json' }
import quasarDark from './themes/quasar-dark.json' with { type: 'json' }

import { regionFoldTransformer } from './region-fold-transformer.js'

export const themes = [quasarLight, quasarDark]
export const themeOptions = {
  themes: { light: 'quasar-light', dark: 'quasar-dark' },
  defaultColor: false
}

const docCodePreTransformer = {
  name: 'docs:doc-code',
  pre(node) {
    addClassToHast(node, 'doc-code')
  }
}

// Build-only transformers (eg. twoslash) are injected via this hook so
// they don't leak Node imports into the browser bundle. `md-plugin-codeblock.js`
// passes them in but `DocCode` does not.
export function buildFenceTransformers(buildOnly = []) {
  return [
    docCodePreTransformer,
    ...buildOnly,
    transformerNotationHighlight(),
    transformerNotationFocus(),
    transformerNotationDiff(),
    regionFoldTransformer()
  ]
}

// Used by the release-notes pipeline (build-only).
export function buildBareTransformers() {
  return [docCodePreTransformer]
}

// Used exclusively the the client runtime through DocCode.vue.
export function buildClientTransformers() {
  return [
    docCodePreTransformer,
    transformerNotationHighlight(),
    transformerNotationFocus(),
    transformerNotationDiff(),
    regionFoldTransformer()
  ]
}
