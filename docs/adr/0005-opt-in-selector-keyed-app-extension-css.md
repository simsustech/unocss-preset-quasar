# 0005 — App-extension CSS is opt-in, selector-keyed rules

Status: accepted (2026-09-23)

## Context

Three third-party Quasar UI libraries ship their own stylesheets:
`@quasar/quasar-ui-qcalendar` (nine SCSS files), `@quasar/quasar-ui-qmarkdown`
(its stylesheet plus Prism's theme) and `@quasar/quasar-ui-qmediaplayer`. Their
classes (`.q-calendar`, `.q-calendar-month__day`, `.q-markdown`, `.q-media`) are
part of the library's own markup, so an app that installs the library gets the
markup but, under this preset, none of the CSS.

Three placements were considered: a separate package, preflights that emit the
libraries' CSS as text (the pattern the preset already uses for media-query and
keyframe families), and rules inside this preset behind an option.

## Decision

Port each library into `src/app-extensions/<library>/` as **selector-keyed
rules**, and gate every rule, preflight and shortcut behind a new
`QuasarPreset({ appExtensions })` option, default `[]`.

- **Opt-in, not automatic.** The libraries' CSS is thousands of lines; an app
  that uses one component of one library should not carry the rest. Declaring
  nothing produces byte-identical output to the preset before this change, and
  `test/app-extensions-scaffold.test.ts` asserts both directions.
- **Rules, not preflights.** A rule composes with `symbols.selector`, so the
  nested selectors these libraries are full of (`&__day`, `&--range`,
  `.q-calendar__scroll::-webkit-scrollbar-thumb`) stay in the preset's normal
  cascade and participate in the two-layer unstyled contract and in
  `mergeDuplicateRules`. `getCSS` text preflights get none of that, and this
  repository's AGENTS.md already asks for `getCSS` to stay minimal — the places
  it is used are the ones a rule body cannot express (at-rules, keyframes).
- **Selectors stay upstream's.** `.q-calendar`, `.q-markdown`, `.q-media` and
  every modifier are emitted as the library spells them, so library templates
  need no changes. The _tokens_ do not: they are re-namespaced into this
  preset's own namespace (`--q-calendar-*`, `--q-mediaplayer-*`), because the
  preset owns those defaults, and themed through the same style tokens and colour
  roles the rest of the preset uses (see ADR 0004).
- **The vocabulary follows.** `scripts/generate-quasar-classes.mjs` scrapes the
  installed libraries per component root, so mentioning `<q-calendar-month>`
  generates that view's classes the way `<q-btn>` generates Quasar's. The
  libraries' versions are recorded in the generated file's header, so a
  dependency bump fails `--check` until the vocabulary is regenerated.

## Consequences

- The libraries' dark fast paths (`.q-dark div`, `.body--dark div`,
  `.q-calendar--dark`, `.q-media--dark`) are **not** ported: they restated the
  same declarations with `-dark` values, and the tokens already flip on
  `body.body--dark`. Declarations that a token flip does _not_ reproduce (the
  scheduler's range-edge border resets, the mini calendar's week-wrapper reset)
  are emitted as `body.body--dark` yields instead;
  `test/app-extensions-coverage.test.ts` asserts both directions.
- Prism's syntax palette stays literal, like the media player's canvas: a code
  highlighter and a video surface are content, not theme surfaces. The structural
  colours around them are themed. The two-layer unstyled contract still applies —
  anything stated as a literal gets a `body.quasar-style-unstyled` reset, which
  `test/app-extensions-unstyled.test.ts` walks in the emitted sheet.
- A consumer theming a ported library overrides `--q-<library>-*`, not upstream's
  `--calendar-*` / `--mediaplayer-*` names. That is a breaking change for anyone
  who themed via upstream's variables, which is why the change is a minor rather
  than a patch release.
