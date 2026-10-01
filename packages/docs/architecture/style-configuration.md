# Styles & Scoping

`QuasarPreset()` refuses to guess which styles an app wants: called without `styles` or `style`, it throws. A default would either ship token blocks and resets for styles the app never switches to, or make `setStyle()` a silent no-op — both are surprises an app should choose deliberately.

## The baseline rule

`styles` is an ordered list. **The first entry is the baseline**: its tokens land on `body` and its rules ship unscoped. Every other entry ships only as a `body.quasar-style-{name}` diff block:

```ts
QuasarPreset({ styles: [MaterialDesign3, MaterialDesign2, Unstyled] })
//          md3 = baseline ──┘        md2 = switch block ──┘   unstyled ──┘
```

Consequences that follow from that one rule:

| Situation                   | Result                                                                         |
| --------------------------- | ------------------------------------------------------------------------------ |
| Style not listed            | Ships neither its tokens nor its rules                                         |
| `setStyle('<unlisted>')`    | Silently stays on the baseline — a runtime helper cannot see build-time config |
| `Unstyled` listed **first** | Its literal resets apply unconditionally, no body class involved               |
| Single-style app            | `style: MaterialDesign3` — shorthand for `styles: [entry]`                     |

## Tree-shaking

Everything a style owns ships only when the style is listed. Before this model, every app paid for all three styles unconditionally: measured on the preflight layer alone, an md3-only app carried 45,949 B where 25,635 B would do — 44 % of the layer was styles it could never reach.

The same applies to rules. A style owns _the declarations tokens cannot express_ — `Unstyled`'s literal resets are the main example: a ported rule that states `background: …` cannot be neutralised by flipping a token, so the reset is a rule, and the reset ships iff the entry is listed.

## Per-style rule scoping

At assembly, each listed non-baseline entry's rules are passed through `src/rules/scope.ts`, which prefixes **every top-level comma member** of each yielded selector:

```css
/* Unstyled listed second; md3 is baseline */
body.quasar-style-unstyled .q-btn:before { background: none }
body.quasar-style-unstyled .q-card, body.quasar-style-unstyled .q-card__section { … }
```

The baseline's rules pass through untouched — their scope is `body` already. Prefixing per comma member (not just the first selector) is what keeps a rule that yields `.a, .b` from leaking its second member into every style.

## Token blocks

Each entry's `tokens` is a `TokenBlock` minus the color block (colors are shared — they derive from `sourceColor`, not from the style):

| Category     | Example                              | Varies per style?               |
| ------------ | ------------------------------------ | ------------------------------- |
| `shape`      | `cornerMedium: '12px'`               | yes                             |
| `typography` | `labelSmall: '500 11px/16px Roboto'` | yes                             |
| `elevation`  | `elevationLevel1: '0 1px 3px …'`     | yes                             |
| `sizing`     | `spaceMd: '12px'`                    | yes                             |
| `motion`     | `durationMedium: '300ms'`            | yes                             |
| `component`  | `btnRadius: 'var(--q-radius-xl)'`    | yes                             |
| color        | —                                    | no — derived from `sourceColor` |

A token value may be a `DarkPair` (`{ light, dark }`) when the two schemes genuinely differ (see md2's toggle track).

## Custom entries

An app can derive an entry instead of using the built-ins:

```ts
import { MaterialDesign3 } from 'unocss-preset-quasar/styles'

const myStyle = {
  name: 'my',
  tokens: {
    ...MaterialDesign3.tokens,
    shape: { ...MaterialDesign3.tokens.shape, radiusXl: '8px' }
  }
}

QuasarPreset({ styles: [myStyle, MaterialDesign2] })
// setStyle('my') works; setStyle('md3') does not — md3 was not listed
```

The entry's `name` becomes the body class suffix (`body.quasar-style-my`), so it must be a valid class fragment. Missing token categories are defaulted to safe values, never left undefined.

## What is _not_ style-scoped

Preset policies that are deliberately identical across styles — the generated palette, the 48 dp control-height floor, the screen breakpoints — do not vary and are not tokens a style may fork. Divergences there are recorded, not fixed; see [Decisions](/architecture/decisions) (ADR-0008).
