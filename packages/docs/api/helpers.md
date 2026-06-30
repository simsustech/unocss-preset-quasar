# Helpers

Internal utilities exported from `_helpers.ts` for use in shortcut definitions. These replace repetitive boilerplate with declarative calls.

## `qe()` <Badge text="tagged template" />

Escapes BEM double-underscores for UnoCSS selector syntax. UnoCSS treats `_` as space and `__` as a literal underscore. Quasar uses BEM (`__`) for element separators.

```ts
import { qe } from 'path/to/_helpers'

// Without qe (manual escaping):
;`[&.q-btn\\_\\_content]:(flex items-center)`

// With qe (auto-escaped):
qe`[&.${'q-btn__content'}]:(flex items-center)`

// Also works as a plain function:
qe('.q-btn__content--hidden') // → '.q-btn\\_\\_content--hidden'
```

## `componentClass(name, fallback)`

Shortcut handler that checks for a theme override, falling back to a literal class string.

```ts
import { componentClass } from 'path/to/_helpers'

// Signature
function componentClass(
  name: string,
  fallback: string
): DynamicShortcutMatcher<QuasarTheme>

// Usage
;[
  /^q-avatar$/,
  componentClass('q-avatar', 'relative inline-block rounded-full')
]
```

Checks `theme.quasar.components['q-avatar']` first. If the consumer has configured a theme override for that class, it's used. Otherwise, the fallback string is returned.

## `staticClass(classes)`

Shortcut handler that always returns the same classes. No theme override lookup.

```ts
import { staticClass } from 'path/to/_helpers'

// Signature
function staticClass(classes: string): DynamicShortcutMatcher<QuasarTheme>

// Usage
;[/^q-card__section$/, staticClass('relative')]
```

Equivalent to `([, c], { theme }) => 'relative'` but more concise.

## `componentCtxClass(name, fallbackFn)`

Like `componentClass` but the fallback is a function that receives the theme context. Use when the fallback depends on theme values.

```ts
import { componentCtxClass } from 'path/to/_helpers'

// Signature
function componentCtxClass(
  name: string,
  fallback: (ctx: { theme: QuasarTheme }) => string
): DynamicShortcutMatcher<QuasarTheme>

// Usage
;[
  /^q-fab$/,
  componentCtxClass('q-fab', ({ theme }) => `z-${theme.quasar.z.fab}`)
]
```

## Pattern

All three helpers follow the same pattern:

1. Check `theme.quasar.components[name]` for a consumer override
2. If override exists, return it
3. If no override, compute/return the fallback

This lets consumers override individual component classes via the theme without forking the preset.
