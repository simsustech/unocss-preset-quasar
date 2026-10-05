# CONTEXT — glossary

- **field container** — the painted/outlined surface of a QField (`.q-field__control` plus its
  `:before` frame); its corner shape is variant-scoped: filled and standard take
  `md.sys.shape.corner.extra-small` top-only with a `none` bottom edge, outlined and standout
  take extra-small on all four vertices. _Avoid:_ "border" (the bottom edge is the state
  line/underline), "standard box", "default border".
