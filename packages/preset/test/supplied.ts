import { quasarSafelist } from '../src/safelist.js'
import {
  componentClasses,
  globalClasses
} from '../src/generated/quasar-classes.js'

const vocabulary = new Set(Object.values(componentClasses).flat())

/**
 * Is this class supplied by some mechanism?
 *
 * The safelist holds only what nothing can extract, so asserting safelist
 * membership tests the wrong thing — and used to pass only because the list
 * carried everything. A class also reaches the sheet through the component
 * extractor (mentioning `<q-btn>` brings in that component's whole vocabulary),
 * Quasar's runtime globals (the body/platform classes it applies itself), and the
 * value extractor (an icon or transition name in the markup).
 */
export const isSupplied = (name: string): boolean =>
  quasarSafelist.includes(name) ||
  globalClasses.includes(name) ||
  vocabulary.has(name) ||
  /^i-[a-z0-9]+-/.test(name) ||
  /^q-transition--/.test(name)

/** Where it comes from, for assertion messages. */
export const suppliedBy = (name: string): string => {
  if (quasarSafelist.includes(name)) return 'safelist'
  if (globalClasses.includes(name)) return 'runtime globals'
  if (vocabulary.has(name)) return 'a component vocabulary'
  if (/^i-[a-z0-9]+-/.test(name)) return 'the value extractor (icon)'
  if (/^q-transition--/.test(name)) return 'the value extractor (transition)'
  return 'nothing'
}
