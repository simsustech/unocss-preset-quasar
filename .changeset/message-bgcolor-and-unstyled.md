---
'unocss-preset-quasar': patch
---

Let QChatMessage's `bgColor` prop actually recolour the bubble, and reset
q-message under `unstyled`.

`QChatMessage` documents `bgColor`, which adds a `text-<color>` class; the bubble
is meant to be filled from `currentColor`, so changing the colour changes the
fill. The preset broke that chain: `.q-message-text` did set
`background-color: currentColor`, but `--sent`/`--received` then overrode it with
a hard `background-color` role token, so only the tail (which still reads
`currentColor`) recoloured and `bgColor` was a no-op. Quasar's own
`.q-message-text--sent { color: #e0e0e0 }` declares the colour and nothing else;
the preset now matches, using the scheme tokens (`var(--q-on-primary)`,
`var(--q-surface-container-high)`).

`q-message` was also missing from the `unstyled` resets — with 63 other
components present it was the one that stayed fully painted. The reset now
neutralises the root and the `--sent`/`--received` members that carry the colour.
