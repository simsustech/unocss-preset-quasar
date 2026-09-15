import { generateColorTokens } from './theme/colors.js'

const kebab = (s: string) => s.replace(/([A-Z])/g, '-$1').toLowerCase()

const previous = new Map<string, string>()

function target(): HTMLElement | null {
  if (typeof document === 'undefined') return null
  return document.documentElement
}

/**
 * Re-derive the Material tonal palettes from a new source color and
 * override the `--q-*` color custom properties at `:root`.
 * Every component recolors instantly through the CSS var chain —
 * no reload, no per-component JS.
 */
export function applySourceColor(sourceColor: string): void {
  const el = target()
  if (!el) return
  const colors = generateColorTokens(sourceColor)
  const entries: Record<string, string> = {}
  for (const [key, value] of Object.entries(colors.light))
    entries[`--q-${kebab(key)}`] = value as string
  for (const [key, value] of Object.entries(colors.quasar))
    entries[`--q-${key}`] = value as string
  for (const [prop, value] of Object.entries(entries)) {
    if (!previous.has(prop)) previous.set(prop, el.style.getPropertyValue(prop))
    el.style.setProperty(prop, value)
  }
}

/** Restore the build-time palette (remove runtime overrides). */
export function resetSourceColor(): void {
  const el = target()
  if (!el) return
  for (const [prop, value] of previous) {
    if (value) el.style.setProperty(prop, value)
    else el.style.removeProperty(prop)
  }
  previous.clear()
}
