import { describe, expect, it } from 'vitest'
import { quasarComponentExtractor } from '../src/extractor.js'

/**
 * The vocabulary generator now also scrapes the three app-extension packages,
 * so a page that mentions `<q-markdown>` gets the markdown classes generated
 * without a safelist entry — the same mechanism `<q-btn>` uses.
 *
 * The roots are the tags a consumer writes. The class names below are the ones
 * the installed packages actually declare (`q-calendar-month__day`, not
 * `q-calendar__day`: v5 names each view's classes after the view).
 */

const classes = (code: string): string[] => {
  const extracted = quasarComponentExtractor.extract!({ code })
  return Array.isArray(extracted) ? extracted : []
}

describe('app-extension components reach the vocabulary', () => {
  it('derives the month view from <q-calendar-month>', () => {
    const found = classes('<q-calendar-month :model-value="today" />')

    expect(found).toContain('q-calendar-month')
    expect(found).toContain('q-calendar-month__day')
    // `q-calendar` is a prefix of the tag, so the shared vocabulary comes too.
    expect(found).toContain('q-calendar__button')
  })

  it('derives the other calendar views from their tags', () => {
    expect(classes('<q-calendar-day />')).toContain('q-calendar-day__day')
    expect(classes('<q-calendar-agenda />')).toContain('q-calendar-agenda')
    expect(classes('<q-calendar-resource />')).toContain('q-calendar-resource')
    expect(classes('<q-calendar-scheduler />')).toContain(
      'q-calendar-scheduler'
    )
    expect(classes('<q-calendar-task />')).toContain('q-calendar-task')
  })

  it('derives q-markdown from <q-markdown>, PascalCase included', () => {
    expect(classes('<q-markdown :src="doc" />')).toContain('q-markdown--code')
    expect(classes('<QMarkdown :src="doc" />')).toContain('q-markdown')
  })

  it('derives the media player from <q-media-player>', () => {
    // The tag is `q-media-player`; the classes it applies are `q-media*`.
    const found = classes('<q-media-player :src="url" />')

    expect(found).toContain('q-media')
    expect(found).toContain('q-media--dark')
  })

  it('derives nothing for a tag no source defines', () => {
    expect(classes('<q-not-a-library />')).toEqual([])
  })
})
