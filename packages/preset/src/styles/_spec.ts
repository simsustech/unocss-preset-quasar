/**
 * _spec.ts — Spec interpolation helper
 *
 * Resolves StyleSpec token references (e.g. "color.primary",
 * "shape.cornerFull", "elevation.level2") into CSS values at
 * shortcut-build time.
 *
 * Each style module calls `bindSpec(spec)` to create a scoped `s()`
 * helper, then uses it inside template strings:
 *
 *   s`color.primary`         → resolved value at build time
 *   s('shape.cornerLarge')   → '16px' (or whatever the spec says)
 *
 * Nested/dotted paths work: `s('tokens.color.primary')` and
 * `s('color.primary')` both resolve.
 *
 * Missing refs return 'inherit' so they never produce empty/undefined.
 *
 * @module Styles
 */

import type { StyleSpec } from '../spec/types.js'
import { getStyleSpec } from '../spec/index.js'

interface SpecNodeMap {
  [key: string]: SpecNode
}
type SpecNode = string | number | SpecNodeMap

/**
 * Create a scoped spec-resolver for one style.
 *
 * Accepts either a StyleSpec object or a string name ('md3', 'md2', 'unstyled')
 * which is resolved via the spec registry.
 *
 * @param spec - The StyleSpec to bind or a style name string.
 * @returns An `s()` function that resolves dotted paths against the spec.
 */
export function bindSpec(spec: StyleSpec | string): SpecResolver {
  if (typeof spec === 'string') {
    spec = getStyleSpec(spec)
  }

  const cache = new Map<string, string>()

  function resolve(path: string): string {
    const cached = cache.get(path)
    if (cached !== undefined) return cached

    let value: string | undefined

    if (path.startsWith('darkTokens.')) {
      const rest = path.slice('darkTokens.'.length)
      value = resolveFromObj(spec.darkTokens as Record<string, SpecNode>, rest)
    }

    if (value === undefined) {
      value = resolveFromObj(
        spec.tokens as unknown as Record<string, SpecNode>,
        path
      )
    }

    if (value === undefined) {
      value = resolveFromObj(
        { tokens: spec.tokens } as Record<string, SpecNode>,
        path
      )
    }

    if (value === undefined) {
      value = resolveFromObj(spec as unknown as Record<string, SpecNode>, path)
    }

    const result = value ?? 'inherit'
    cache.set(path, result)
    return result
  }

  /**
   * Tagged-template / function hybrid:
   *
   *   s`color.primary`           → resolves the string "color.primary"
   *   s('color.primary')          → same
   *   s`border-radius: ${s('shape.cornerFull')}` → resolves both
   */
  function s(
    strings: TemplateStringsArray | string,
    ...values: unknown[]
  ): string {
    if (Array.isArray(strings) && 'raw' in strings) {
      let result = ''
      for (let i = 0; i < strings.length; i++) {
        result += strings[i]
        if (i < values.length) {
          result += String(values[i])
        }
      }
      return resolve(result)
    }

    if (typeof strings === 'string') return resolve(strings)
    return 'inherit'
  }

  return s
}

/**
 * Resolve a dotted path against an object tree.
 * Returns undefined when any segment is missing.
 */
function resolveFromObj(
  obj: Record<string, SpecNode>,
  path: string
): string | undefined {
  const parts = path.split('.')
  let current: SpecNode | undefined = obj

  for (const part of parts) {
    if (current === undefined || current === null) return undefined
    if (typeof current === 'string' || typeof current === 'number')
      return undefined
    current = (current as Record<string, SpecNode>)[part]
  }

  if (current === undefined || current === null) return undefined
  return String(current)
}

export type SpecResolver = ReturnType<typeof bindSpec>
