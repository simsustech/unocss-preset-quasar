---
'unocss-preset-quasar': patch
---

Restore Quasar's screen breakpoints and move the component size scale off
Quasar's reserved names.

`--q-size-{xs,sm,md,lg,xl}` belongs to Quasar — `ui/src/css/core/size.sass`
defines it as `0 / 600px / 1024px / 1440px / 1920px`, and the Screen plugin
parses those declarations out of the stylesheet to build `$q.screen`. This
preset replaces `quasar.css` for consumers who build with `disableSass: true`,
but it emitted none of them: the component size scale squatted on the same
names (`--q-size-sm: 24px`, `--q-size-md: 40px`, `--q-size-lg: 56px`, no
`xs`/`xl`). `parseInt('24')` then made every viewport report as `xl`, so
`$q.screen.gt.sm` was true on a 390px phone — drawers opened over the whole
page, the scrim covered the content, and the sticky FAB was unclickable.

The five breakpoint literals are now stated at `:root` (the same mechanism as
the shape roles), and the component scale has been renamed to
`--q-comp-icon/-sm/-md/-lg`. The Unstyled entry keeps its `--q-comp-*: 0`, and
the dark blocks carry no `--q-size-*`. Consumers reading `--q-size-sm` for the
*component* value must switch to `--q-comp-sm`; consumers reading the
*breakpoint* name now get Quasar's value, which is the point.
