/**
 * QMarkdown's rules need no variable preflight: its custom properties are
 * scoped to `.q-markdown` upstream and already namespaced (`--q-markdown-*`), so
 * they ride the root rule.
 */
export { qmarkdownRules } from './rules.js'
