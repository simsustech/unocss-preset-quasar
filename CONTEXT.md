# CONTEXT — glossary

- **field container** — the painted/outlined surface of a QField (`.q-field__control` plus its
  `:before` frame); its corner shape is variant-scoped: filled and standard take
  `md.sys.shape.corner.extra-small` top-only with a `none` bottom edge, outlined and standout
  take extra-small on all four vertices. _Avoid:_ "border" (the bottom edge is the state
  line/underline), "standard box", "default border".

- **dialog inner vs card** — `.q-dialog__inner` is the transparent full-viewport positioning box (no size clamp, no surface); the dialog's surface is its card. _Avoid:_ "dialog panel", "inner dialog".

- **preset icon provider** — the preset-provided, library-parameterised Quasar icon set
  (`QuasarPreset({ iconSet })` / `quasarIconSet()`), so an app does not hand-write nested icon-set
  literals. _Avoid:_ "hand-written icon map".

- **transition family** — the `q-transition--<name>` base class of a Quasar transition
  (`slide-left`, `jump-right`, `fade`); the six **phases** are `-enter-from`, `-enter-active`,
  `-enter-to`, `-leave-from`, `-leave-active`, `-leave-to` (only from/to carry declarations).
  _Avoid:_ "animation", "transition name".

- **internal transition** — a transition Quasar composes itself, with no `transition-*` prop in the
  consumer's markup (QDate's month slide and label jump). _Avoid:_ "hardcoded transition".

- **class icon** — a glyph drawn by the `.q-icon` element _itself_: `presetIcons` masks the icon
  SVG into the element's box (`mask-size: 100% 100%`, `background-color: currentColor`), so the
  element is the glyph. Distinct from a **font glyph**, which the icon font paints through
  `.q-icon`'s `::before` inside a box that may be larger than the glyph. _Avoid:_ "mask icon"
  (only one of the two mechanisms this preset can emit), "iconify icon" (names the source, not the
  rendering).
