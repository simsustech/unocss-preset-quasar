# Supported Libraries

Each library is ported as selector-keyed rules under `src/app-extensions/<name>/`. Declare the ones you use; everything else stays out of your CSS.

## `qcalendar` — `@quasar/quasar-ui-qcalendar`

Package: `@quasar/quasar-ui-qcalendar` · Ported: ~3,200 lines of rules.

| View                                    | Covered surface                                                 |
| --------------------------------------- | --------------------------------------------------------------- |
| `QCalendarMonth` / `QCalendarMonthMini` | Grid cells, day labels, range/highlight states, `-mini` density |
| `QCalendarDay`                          | Timed rows, now-line, hour labels                               |
| `QCalendarAgenda`                       | Agenda rows, interval styling                                   |
| `QCalendarScheduler`                    | Lanes, resource columns, range-edge border resets               |
| `QCalendarResource`                     | Resource rows and labels                                        |
| `QCalendarTask`                         | Task columns, chevrons, deadline styling                        |
| transitions                             | The library's own view transitions                              |

- **Selectors are upstream's** — `.q-calendar-month__day`, `.q-calendar-scheduler__resource`, … templates need no changes.
- **Tokens** are re-namespaced to `--q-calendar-*` and themed through the preset's style tokens and color roles.
- **Dark mode**: the library's `.q-dark` / `.body--dark` fast paths are not ported — the token flip covers them. Declarations a flip cannot reproduce (scheduler range-edge border resets, the mini calendar's week-wrapper reset) are emitted under `body.body--dark` directly.

## `qmarkdown` — `@quasar/quasar-ui-qmarkdown`

Package: `@quasar/quasar-ui-qmarkdown` · Ported: one rules file (~650 lines).

- Component layout for `.q-markdown` and its parts; the stylesheet's custom properties already ship scoped to `.q-markdown` and namespaced `--q-markdown-*`, so they ride the root rule with no extra preflight.
- **Prism's syntax palette is ported literally.** A code highlighter's colors are content, not theme surfaces — they do not follow `sourceColor` or the active style. The structural colors around the code block are themed as usual, and every literal still gets its `body.quasar-style-unstyled` reset.

## `qmediaplayer` — `@quasar/quasar-ui-qmediaplayer`

Package: `@quasar/quasar-ui-qmediaplayer` · Ported: rules (~250 lines) plus a variables preflight.

- Player chrome, controls, timeline and `.q-media` layout.
- **The video canvas is literal**, like Prism's palette: a video surface is content. Structural chrome around it is themed.
- Tokens live under `--q-mediaplayer-*` and follow the active style.

## Version pinning

The generated class vocabulary (`src/generated/quasar-classes.ts`) records the scraped version of each library in its header. Bumping a library in the preset's dependencies fails the generator's `--check` until the vocabulary is regenerated — the extractor and the port cannot drift apart silently.

## Checklist for a declared library

- [ ] Name listed in `QuasarPreset({ appExtensions })`
- [ ] Library installed in the app (markup + vocabulary come from the installed version)
- [ ] Dark mode verified on `body.body--dark` — no library dark class needed
- [ ] If you use `Unstyled`: literals from the port are reset only when `Unstyled` is listed (see [Unstyled](/styles/unstyled))
