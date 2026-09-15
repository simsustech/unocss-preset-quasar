import { describe, it, expect } from 'vitest'
import { orientationRules } from '../src/core/orientation/rules.js'
import { touchRules } from '../src/core/touch/rules.js'
import { mouseRules } from '../src/core/mouse/rules.js'
import { typographyRules } from '../src/core/typography/rules.js'
import { transitionsRules } from '../src/core/transitions/rules.js'
import { helpersRules } from '../src/core/helpers/rules.js'

/** Helper: find a rule by its regex test and invoke the matcher */
function matchRule(
  rules: any[],
  selector: string
): Record<string, any> | undefined {
  for (const entry of rules) {
    const regex = entry[0]
    const matcher = entry[1]
    if (
      regex instanceof RegExp &&
      regex.test(selector) &&
      typeof matcher === 'function'
    ) {
      return (matcher as unknown as () => Record<string, any>)()
    }
  }
  return undefined
}

describe('orientationRules', () => {
  it('flip-horizontal scales X by -1', () => {
    expect(matchRule(orientationRules, 'flip-horizontal')!.transform).toBe(
      'scaleX(-1)'
    )
  })
  it('flip-vertical scales Y by -1', () => {
    expect(matchRule(orientationRules, 'flip-vertical')!.transform).toBe(
      'scaleY(-1)'
    )
  })
})

describe('touchRules', () => {
  it('q-touch disables user selection', () => {
    expect(matchRule(touchRules, 'q-touch')!['user-select']).toBe('none')
  })
  it('q-touch-x sets pan-x', () => {
    expect(matchRule(touchRules, 'q-touch-x')!['touch-action']).toBe('pan-x')
  })
})

describe('mouseRules', () => {
  it('pointer-events-all enables all', () => {
    expect(matchRule(mouseRules, 'pointer-events-all')!['pointer-events']).toBe(
      'all'
    )
  })
  it('scroll sets overflow auto', () => {
    expect(matchRule(mouseRules, 'scroll')!.overflow).toBe('auto')
  })
  it('cursor-pointer sets pointer', () => {
    expect(matchRule(mouseRules, 'cursor-pointer')!.cursor).toBe('pointer')
  })
})

describe('typographyRules', () => {
  it('text-h1 sets 6rem size', () => {
    expect(matchRule(typographyRules, 'text-h1')!['font-size']).toBe('6rem')
  })
  it('text-center sets center alignment', () => {
    expect(matchRule(typographyRules, 'text-center')!['text-align']).toBe(
      'center'
    )
  })
  it('text-uppercase sets uppercase transform', () => {
    expect(
      matchRule(typographyRules, 'text-uppercase')!['text-transform']
    ).toBe('uppercase')
  })
  it('text-weight-bold sets 700', () => {
    expect(matchRule(typographyRules, 'text-weight-bold')!['font-weight']).toBe(
      700
    )
  })
})

describe('transitionsRules', () => {
  it('slide-right-enter-from translates -100%', () => {
    expect(
      matchRule(transitionsRules, 'q-transition--slide-right-enter-from')!
        .transform
    ).toBe('translate3d(-100%, 0, 0)')
  })
  it('fade-enter-from sets opacity 0', () => {
    expect(
      matchRule(transitionsRules, 'q-transition--fade-enter-from')!.opacity
    ).toBe(0)
  })
  it('scale-enter-from scales to 0', () => {
    expect(
      matchRule(transitionsRules, 'q-transition--scale-enter-from')!.transform
    ).toBe('scale3d(0, 0, 1)')
  })
})

describe('helpersRules', () => {
  it('rounded-borders sets 4px radius', () => {
    expect(matchRule(helpersRules, 'rounded-borders')!['border-radius']).toBe(
      '4px'
    )
  })
  it('no-transition disables transition', () => {
    expect(matchRule(helpersRules, 'no-transition')!.transition).toBe('none')
  })
  it('q-link removes underline', () => {
    expect(matchRule(helpersRules, 'q-link')!['text-decoration']).toBe('none')
  })
})
