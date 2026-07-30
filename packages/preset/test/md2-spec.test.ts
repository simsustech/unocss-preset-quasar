import { describe, it, expect } from 'vitest'
import md2 from '../src/spec/md2.spec.js'
import type { StyleSpec } from '../src/spec/types.js'

describe('MD2 StyleSpec', () => {
  it('conforms to StyleSpec schema', () => {
    const spec: StyleSpec = md2
    expect(spec.style).toBe('md2')
    expect(spec.label).toBeTruthy()
    expect(spec.tokens.color.primary).toBeDefined()
    expect(spec.tokens.shape.cornerSmall).toBe('4px') // md2: sharp corners
    expect(spec.tokens.typography.bodyMedium).toBeDefined()
    expect(spec.tokens.elevation.level2).toBeDefined()
    expect(spec.accessibility.contrast.wcag.aa.standardText).toBe(4.5)
    expect(spec.features.structuralKey).toBe('md2')
  })

  it('has md2-specific token values (sharp corners, uppercase)', () => {
    expect(md2.tokens.shape.cornerExtraSmall).toBe('3px')
    expect(md2.tokens.shape.cornerSmall).toBe('4px') // md2: 4px default
    expect(md2.tokens.shape.cornerMedium).toBe('7px') // md2: 7px
    expect(md2.features.component?.QBtn?.uppercase).toBe(true)
  })

  it('has md2-specific elevation values', () => {
    // MD2 elevations use two-layer shadow syntax
    expect(md2.tokens.elevation.level1).toContain('rgba')
    expect(md2.tokens.elevation.level1).toContain(',')
  })

  it('has md2-specific state opacities (lower hover, higher pressed)', () => {
    expect(md2.tokens.typography.hoverOpacity).toBe('0.04')
    expect(md2.tokens.typography.pressedOpacity).toBe('0.16')
    expect(md2.tokens.typography.draggedOpacity).toBe('0.08')
  })

  it('has component specs', () => {
    expect(Object.keys(md2.components).length).toBeGreaterThan(0)
    expect(md2.components.QBtn).toBeDefined()
    expect(md2.components.QBtn.selector).toBe('.q-btn')
  })

  it('QBtn has text-transform uppercase (md2 convention)', () => {
    const uppercaseDecl = md2.components.QBtn.base.find(
      (d) => d.property === 'text-transform'
    )
    expect(uppercaseDecl).toBeDefined()
    expect(uppercaseDecl!.value).toBe('uppercase')
  })

  it('QBtn has 4px border-radius by default (md2 sharp corners)', () => {
    const radiusDecl = md2.components.QBtn.base.find(
      (d) => d.property === 'border-radius'
    )
    expect(radiusDecl).toBeDefined()
    expect(radiusDecl!.value).toBe('4px')
  })

  it('QBtn has transparent background and inherit color', () => {
    const bg = md2.components.QBtn.base.find(
      (d) => d.property === 'background-color'
    )
    expect(bg).toBeDefined()
    expect(bg!.value).toBe('transparent')

    const color = md2.components.QBtn.base.find((d) => d.property === 'color')
    expect(color).toBeDefined()
    expect(color!.value).toBe('inherit')
  })

  it('QBtn variants match md2 expectations (no outline color override)', () => {
    const outline = md2.components.QBtn.variants?.outline
    expect(outline).toBeDefined()
    // md2 outline uses currentColor, not primary color
    expect(
      outline!.pseudo?.before?.some((d) => d.value.includes('currentColor'))
    ).toBe(true)
  })

  it('QBtn pseudo and children are defined', () => {
    expect(md2.components.QBtn.pseudo).toBeDefined()
    expect(md2.components.QBtn.pseudo!.before).toBeDefined()
    expect(md2.components.QBtn.children).toBeDefined()
    expect(md2.components.QBtn.children!.content).toBeDefined()
    expect(md2.components.QBtn.children!.progress).toBeDefined()
    expect(md2.components.QBtn.children!['progress-indicator']).toBeDefined()
  })

  it('has no APCA section (md2 does not specify APCA)', () => {
    expect(md2.accessibility.contrast.apca).toBeUndefined()
  })

  it('QBtn base contains only non-token-ref or valid token references', () => {
    for (const decl of md2.components.QBtn.base) {
      if (decl.isTokenRef) {
        expect(decl.value).toMatch(
          /^(color|shape|typography|elevation|sizing|motion|darkTokens)\./
        )
      }
    }
  })
})
