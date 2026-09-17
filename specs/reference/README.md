# Reference specs (downloaded)

Authoritative online sources for components the hand-written `specs/*.json` files did not cover,
captured so the preset can be checked against real implementations instead of guesswork.

Fetched: **2026-09-17** (UTC) via `curl` from `raw.githubusercontent.com`.

## Layout

```text
specs/reference/
├── README.md                    ← this file: provenance, verification, caveats
├── normalized/                  ← the specs in the repo's own flat style (the useful part)
│   ├── md3-switches.json
│   ├── md3-lists.json
│   ├── md3-dividers.json
│   ├── md2-switches.json
│   ├── md2-lists.json
│   └── md2-dividers.json
└── raw/                         ← verbatim upstream sources (evidence, do not edit)
    ├── MANIFEST.sha256
    ├── flutter/{switch,switch_theme,list_tile,divider,divider_theme}.dart.txt
    └── compose-material3/{Switch,ListItem,Divider}.kt.txt
        └── tokens/{SwitchTokens,ListTokens,DividerTokens}.kt.txt
```

`normalized/` uses the same conventions as the existing specs: flat snake_case keys, `_px` suffixes
for measurements, `md.sys.*` / `md.comp.*` token references instead of literal colours, and
`*_typography_style` for type roles.

## Why these sources

The M3 site (`m3.material.io`) is a client-rendered SPA and scrapes empty, and the archived MD2 site
is likewise unreachable. The two production implementations below are stable, fetchable, and encode
the spec numbers directly — and they **agree exactly** on every switch/list/divider value used here,
which is why they are treated as authoritative.

| Source                            | Path                                                                                                                                                                    | Licence      |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| Flutter (framework)               | `packages/flutter/lib/src/material/{switch,switch_theme,list_tile,divider,divider_theme}.dart`                                                                          | BSD-3-Clause |
| Jetpack Compose Material 3 (AOSP) | `compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/{Switch,ListItem,Divider}.kt` and `.../tokens/{SwitchTokens,ListTokens,DividerTokens}.kt` | Apache-2.0   |

Exact URLs:

- `https://raw.githubusercontent.com/flutter/flutter/master/packages/flutter/lib/src/material/<file>`
- `https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/<file>`
- `.../androidx/compose/material3/tokens/<file>`

Raw copies are kept only as evidence; they are **not** part of any shipped artefact.

## Verification

```bash
cd specs/reference/raw && sha256sum -c MANIFEST.sha256
```

Caveat: the raw copies are stored with a `.txt` suffix because the workspace lint hooks rewrite
`.kt`/`.dart` files on write (ktlint/dartfmt reformat them, which silently corrupts evidence).
The manifest was generated from the pristine originals and all 11 files verified byte-exact.
If a hook ever reformats one, `sha256sum -c` will flag it — re-fetch from the URL above.

## Cross-implementation divergences (recorded, not resolved)

- **Switch handle colour (M3):** Flutter's `_SwitchDefaultsM3` uses `md.sys.color.outline` for the
  unselected handle; older generated `SwitchTokens` used `on-surface-variant`. `outline` is used.
- **List item content padding:** Flutter M3 = start 16 / end 24; Compose = 16 / 16. Flutter's 24 is
  the newer figure.
- **M2 switch track width:** MD2 design spec = 36px, Flutter M2 implementation = 33px. Quasar's MD2
  switch uses 36px, so the design-spec value is listed first.

## Promoting into the canonical specs

The repo's canonical spec files live on `main` (`specs/*.json`, plus `specs/md2/`). These were
downloaded from a branch worktree, so `normalized/` is kept self-contained. To fold them into the
canonical set:

1. Move `normalized/md3-switches.json`'s body over the `switches` block of `specs/selection_components.json`
   (the existing block only has chassis/thumb diameters; this adds outline width, colours, state
   layers, disabled set and motion).
2. Add `specs/lists.json` and `specs/dividers.json` from `normalized/md3-lists.json` /
   `normalized/md3-dividers.json`.
3. Add `lists` and `dividers` keys to `specs/md2/core_component_design_specifications.json` from the
   `md2-*.json` files here.
