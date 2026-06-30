/**
 * This gets filled in by client-runtime.js.
 *
 * The purpose of this file is to be able to render code blocks
 * synchronously in the browser when the language has already
 * been loaded. The generated chunks ensure minimum overhead,
 * since client-runtime can this way be loaded only on demand,
 * regardless of where DocCode is sync imported.
 *
 * Usage is runtimeLangHighlighterMap[langName](code) to get
 * the highlighted code.
 */
export const runtimeLangHighlighterMap = {}
