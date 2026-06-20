import { createHighlighterCoreSync } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'

import { runtimeLangHighlighterMap } from './client-store.js'
import { buildClientTransformers, themeOptions, themes } from './shared.js'

const transformers = buildClientTransformers()
const langHighlighter = createHighlighterCoreSync({
  engine: createJavaScriptRegexEngine(),
  themes,
  langs: []
})

/**
 * Register the "text" highlighter from the get-go
 * (which just renders without highlighting)
 * for the default case where no language is specified.
 */
runtimeLangHighlighterMap.text = (code) => renderCode(code, 'text')

function renderCode(code, lang) {
  return langHighlighter.codeToHtml(code.trim(), {
    lang,
    transformers,
    ...themeOptions
  })
}

/**
 * We enforce a chunk for each language
 * and we load it on demand only.
 *
 * !! Keep in sync with `build-langs.js`
 */
const loaderMap = {
  /**
   * There is also the "text" language, which is the default
   * to be used when no language is specified. It's needed because
   * it produces the shiki wrapper HTML structure even for plain text
   * and blends in seamlessly with the rest of the codeblocks.
   */

  bash: () => import('@shikijs/langs/bash'),
  js: () => import('@shikijs/langs/javascript'),
  ts: () => import('@shikijs/langs/typescript'),
  yaml: () => import('@shikijs/langs/yaml'),
  sass: () => import('@shikijs/langs/sass'),
  scss: () => import('@shikijs/langs/scss'),
  css: () => import('@shikijs/langs/css'),
  json: () => import('@shikijs/langs/json'),
  xml: () => import('@shikijs/langs/xml'),
  nginx: () => import('@shikijs/langs/nginx'),
  html: () => import('@shikijs/langs/html')

  /**
   * Use "html" lang instead. The "vue" lang imports
   * a lot of other languages that we don't need, and
   * the highlighting is mostly the same!
   */
  // vue: () => import('@shikijs/langs/vue')
}

const loaderPromises = {}
const supportedRuntimeLangs = new Set(Object.keys(loaderMap))

export async function lazyLoadLanguage(lang) {
  if (runtimeLangHighlighterMap[lang]) return

  if (!supportedRuntimeLangs.has(lang)) {
    throw new Error(`Unsupported language for runtime highlighting: ${lang}`)
  }

  loaderPromises[lang] ??= langHighlighter
    .loadLanguage(loaderMap[lang])
    .then(() => {
      runtimeLangHighlighterMap[lang] = (content) => renderCode(content, lang)
      loaderPromises[lang] = null
    })

  await loaderPromises[lang]
}
