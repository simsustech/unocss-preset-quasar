import { describe, it, expect } from 'vitest'
import md3 from '../src/spec/md3.spec.js'
import type { StyleSpec } from '../src/spec/types.js'

describe('MD3 StyleSpec', () => {
  it('conforms to StyleSpec schema', () => {
    const spec: StyleSpec = md3
    expect(spec.style).toBe('md3')
    expect(spec.label).toBeTruthy()
    expect(spec.tokens.color.primary).toBeDefined()
    expect(spec.tokens.shape.cornerMedium).toBeDefined()
    expect(spec.tokens.typography.bodyMedium).toBeDefined()
    expect(spec.tokens.elevation.level0).toBeDefined()
    expect(spec.tokens.sizing.spaceMd).toBeDefined()
    expect(spec.tokens.motion.durationShort).toBeDefined()
    expect(spec.layout.breakpoints.sm).toBeDefined()
    expect(spec.accessibility.contrast.wcag.aa.standardText).toBe(4.5)
    expect(spec.features.structuralKey).toBe('md3')
  })

  it('has dark tokens', () => {
    expect(md3.darkTokens).toBeDefined()
    expect(md3.darkTokens!.color).toBeDefined()
    expect(md3.darkTokens!.color!.primary).toBe('var(--dark-primary)')
  })

  it('has component specs', () => {
    expect(Object.keys(md3.components).length).toBeGreaterThan(0)
    expect(md3.components.QBtn).toBeDefined()
    expect(md3.components.QBtn.selector).toBe('.q-btn')
    expect(md3.components.QBtn.base.length).toBeGreaterThan(0)
  })

  it('QBtn base contains token references that resolve', () => {
    // Every isTokenRef value must start with a token category path
    for (const decl of md3.components.QBtn.base) {
      if (decl.isTokenRef) {
        expect(decl.value).toMatch(
          /^(color|shape|typography|elevation|sizing|motion|darkTokens)\./
        )
      }
    }
  })

  it('QBtn has standard variant with 28px radius (md3 signature)', () => {
    const standard = md3.components.QBtn.variants?.standard
    expect(standard).toBeDefined()
    const radiusDecl = standard!.base.find(
      (d) => d.property === 'border-radius'
    )
    expect(radiusDecl).toBeDefined()
    expect(radiusDecl!.value).toBe('28px')
  })

  it('QBtn has outline, flat, push, rounded, round, square, dense, fab, fab-mini variants', () => {
    const variants = md3.components.QBtn.variants!
    const expectedVariants = [
      'standard',
      'outline',
      'flat',
      'push',
      'rounded',
      'round',
      'square',
      'dense',
      'fab',
      'fab-mini'
    ]
    for (const v of expectedVariants) {
      expect(variants[v]).toBeDefined()
    }
  })

  it('QBtn pseudo-elements are defined', () => {
    expect(md3.components.QBtn.pseudo).toBeDefined()
    expect(md3.components.QBtn.pseudo!.before).toBeDefined()
  })

  it('QBtn children are defined', () => {
    expect(md3.components.QBtn.children).toBeDefined()
    expect(md3.components.QBtn.children!.content).toBeDefined()
    expect(md3.components.QBtn.children!.progress).toBeDefined()
    expect(md3.components.QBtn.children!['progress-indicator']).toBeDefined()
  })

  it('accessibility section has APCA values', () => {
    expect(md3.accessibility.contrast.apca).toBeDefined()
    expect(md3.accessibility.contrast.apca!.bodyText).toBe('Lc 75')
  })
})
