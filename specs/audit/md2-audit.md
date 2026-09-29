# md2 audit — rows (AUD-MD2-*)

Ground truth per the corrected **Authority model**: `specs/md2/*.json` (MD2 machine spec,
authoritative per AGENTS.md) decides every metric it declares; `quasar/dist/quasar.css`
applies **only where the spec is silent**; a measured no-overlap invariant governs
geometry the spec never contemplates.

Buckets: `spec-declared` · `dist-only` · `invariant` · `palette-driven` · `preset-policy` · `uncovered`.

Registers: `test-results/frontend-audit{,-dark}/<viewport>/*.png` (md2, 123 + 52) against
`/tmp/pb-md3-frontend-audit{,-dark}/` (md3 baseline, same routes/seed).

---

## AUD-MD2-001 — a floated label collides with its value

**Bucket:** `invariant` (label ∩ value is wrong in any style) + `dist-only` corroboration
(md2 spec silent; dist states `padding-top: 24px`).

**Measured (live md2, `/employee/pets/2` → `[data-testid=edit-button]` dialog, desktop
1440×900)** — every _floated_ labeled field intersects its value box; resting labels on
empty fields are normal and excluded:

| field                        | classes                            | native `padding-top` | native `line-height` | label box | value box | label∩value |
| ---------------------------- | ---------------------------------- | -------------------- | -------------------- | --------- | --------- | ----------- |
| Name*                        | `--standard --float`               | 16px                 | 24px                 | 224–239   | 218–266   | 560px²      |
| Breed*                       | `--standard --auto-height --float` | 0px                  | 18px                 | 320–335   | 326–358   | 323px²      |
| Birth date*                  | `--standard --float --auto-height` | 0px                  | 18px                 | 416–431   | 422–446   | 517px²      |
| Gender*                      | `--standard --auto-height --float` | 0px                  | 18px                 | 507–522   | 513–539   | 392px²      |
| Sterilized*                  | `--standard --auto-height --float` | 0px                  | 18px                 | 599–614   | 605–631   | 497px²      |
| Chemical sterilization dates | `--standard --float --auto-height` | 0px                  | 18px                 | 784–799   | 790–814   | 1290px²     |
| Food                         | `--standard --float --auto-height` | 0px                  | 18px                 | 968–983   | 974–1038  | 247px²      |
| Category*                    | `--standard --auto-height --float` | 0px                  | 18px                 | 1319–1334 | 1325–1351 | 482px²      |
| Deceased                     | `--standard --auto-height --float` | 0px                  | 18px                 | 1773–1788 | 1779–1805 | 474px²      |

Every floated label carries `transform: matrix(0.75, 0, 0, 0.75, 0, ·)` and
`font-size: 16px` (box height 15px) — the float itself works; only the value's clearance
is missing.

**Mechanism (two parts, both measured):**

1. the preset's labeled-native push-down is `padding-top: var(--q-space-xl)`
   (`packages/preset/src/components/field/rules.ts`) — md2's `--q-space-xl` is **16px**
   while md3's is **24px**, so md2 inherits a compressed scale where dist states an
   absolute 24px;
2. the labeled **select / auto-height** path resolves to `padding-top: 0px`
   (`line-height: 18px`) — **in every style**, so this half is a _shared_ defect, not
   an md2-only one. dist's rule is
   `.q-field--labeled .q-field__native, … { line-height: 24px; padding-top: 24px; padding-bottom: 8px }`.

**Fix direction:** a dedicated metric value (24px) rather than the style-varying space
scale, applied to both paths in both entries. **Do not** raise md2's `--q-space-xl`:
it is used across every component and would reshape every md2 screen.

---

## AUD-MD2-002 — round buttons render as ellipses

**Bucket:** `dist-only` for the geometry invariant, `spec-declared` for the width
(the md2 spec's `min_width_px: 64` is **not** the defect).

**Measured (live md2, full route sweep, 2 viewports + 4 sessions):** 178 round instances,
**non-square in every bucket** — height pinned at 48px while the width follows the
button's own font size, because the preset emits `min-width: 3em` (font-relative)
against `min-height: var(--q-control-height)` (absolute):

| count | kind           | w×h   | resolved `min-width` | resolved `min-height` | font-size |
| ----- | -------------- | ----- | -------------------- | --------------------- | --------- |
| 61    | `q-btn--round` | 34×48 | 33.6px               | 48px                  | 14px      |
| 56    | `q-btn--round` | 42×48 | 42px                 | 48px                  | 14px      |
| 54    | `q-btn--round` | 24×48 | 24px                 | 48px                  | 10px      |
| 20    | `q-btn--fab`   | 56×56 | 56px                 | 56px                  | 14px      |
| 5     | `q-btn--round` | 30×48 | 30px                 | 48px                  | 10px      |
| 2     | `q-btn--round` | 19×48 | 19.2px               | 48px                  | 8px       |
| 1     | `q-btn--fab`   | 54×54 | 56px                 | 56px                  | 14px      |

`desktop/admin` alone: **54 of 56** round instances non-square; distinct widths
19, 24, 30, 34, 42. `border-radius: 50%` on all → ellipse.

**Spec:** `buttons.*.min_width_px: 64` (so the 64px value is correct and the width must
not shrink below it); **spec silent on round geometry**, so dist applies:
`.q-btn--round { min-width: 3em; min-height: 3em }` — the invariant is
_equal dimensions ⇒ circle_. `.q-btn--fab` already resolves 56×56 (matches the spec's
`default: 56`) and must stay untouched.

**Consequence to verify at the gate:** the decided fix (one 64px side for both
dimensions) raises today's 19–42px widths to 64px. `--fab` untouched.

---

## AUD-MD2-003 — occupancy day cells lose their colour (confirm-first)

**Bucket:** `uncovered` — the md2 spec declares no day-cell colour; the arbiter question
is whether md2's flat/outline button keeps a `primary` text colour.

md3 paints in-month day cells as tonal circles (light-blue fill, blue text); md2 paints
them white with near-black text and a thin outline. md2 has no tonal containers, so this
is likely _expected md2_. Step 5 confirms against the spec/dist before disposing.

**Dark-mode evidence added (step 2):** comparing `frontend-audit-dark/desktop/admin-occupancy.png`
against `/tmp/pb-md3-frontend-audit-dark/desktop/admin-occupancy.png` (same route, same seed,
both under `body--dark`), md3 paints the in-month day cells as **dark** circles while md2
paints them **lighter** circles on the same dark surface. The divergence is present in dark
mode too, not just light — so the row is colour, not contrast.

---

## AUD-MD2-004 — an active toggle's track is not the accent colour

**Bucket:** `uncovered` + `spec-declared` (the md2 spec fixes the switch _geometry_ but not
the track colour; `design_token_pipeline` maps `secondary` to "accent color for floating
action components, **selections**, and highlights").

**Measured (step 2, dark registers):** the Dark-mode switch inside the user menu is ON in
both captures, and at 4× magnification (`/tmp/tg-cmp2.png`, md3 above / md2 below):

|     | track                    | thumb                            |
| --- | ------------------------ | -------------------------------- |
| md3 | wide **light-blue** pill | dark navy circle with moon glyph |
| md2 | **grey** pill            | grey circle                      |

So md2's _on_ state is grey — at a glance indistinguishable from _off_.

**Geometry is correct and not part of this row:** the md2 spec states
`switches: track_width_px 36, track_height_px 14, thumb_diameter_px 20`; the md2 switch is
visibly smaller than md3's, which matches the spec.

**Mechanism (hypothesis, to confirm at step 6):** dist styles the track with
`background: currentColor; opacity: 0.38` and no dark override — so the track's colour is
whatever the toggle's text colour resolves to. If md2 does not inherit the accent for the
checked state, the track falls back to the theme's default text colour. Step 6 compares the
**emitted sheet for both styles** on the toggle rule to identify which side diverges.

---

## AUD-MD2-005 — daycare progress labels bunch (candidate, scope unproven)

**Bucket:** `uncovered` — candidate only; **scope is not yet established**.

**Measured (step 2, dark registers):** on `desktop/admin-daycare.png` the segmented
subscription bar's labels (Approved / Cancelled / Pending / Rejected / Reserved) sit at even
spacing across the full-width fill in md3, but in md2 they are **clustered into the left
half** while the fill still spans the full width — labels no longer align with their
segments.

**Why flagged rather than fixed:** petboarding is the rendering harness, not the deliverable.
If the bunching comes from app-side CSS it is **out of scope** for this run. It only enters
scope if step 6 shows the app's spacing is expressed through a style-varying preset token
(md2's compressed `--q-space-*`) — which would make it the same class as AUD-MD2-001. Step 6
resolves the scope question before anything is touched.

---

## Harness artifact (not a defect, but it affects every dark register)

`screenshots-dark.spec.ts`'s `setDark()` opens the overflow menu, clicks `.q-menu .q-toggle`,
then waits for `body--dark` — **without closing the menu**. Every dark register therefore
captures the menu panel open over the page. Verified as harness behaviour, not an md2
finding: the md3 dark baseline (`/tmp/pb-md3-frontend-audit-dark/mobile/home.png`) shows the
identical open panel (`/tmp/cmp-dark-top.png`). It does make the dark registers harder to
read, and it is a petboarding-side fix (out of scope — nothing is committed there).

---

---

## Sweep results — `specs/audit/md2-value-sweep.mjs`

Mechanical pass over the same two defect classes, run against the **built** preset
(the precedent's loader: `dist` resolved from the preset package, then the
`.pnpm/quasar@<version>` walk). It compares every dist statement of two forms —
class (A) a _circular_ block that keeps `min-width === min-height` (dist's way of
saying "a circle"), class (B) `padding-top` stated as an absolute length — against
both emitted sheets, resolving `var(--q-*)` through each sheet's own token block.
Every divergence must name a bucket or the script exits 1.

```
(A) q-btn--round    dist 3em x 3em      md2 64px x 64px square  | md3 3em x 48px NOT SQUARE
(B) q-banner--dense dist 12px           md2 8px    md3 12px
    q-field--labeled dist 24px          md2 28px   md3 24px
    q-field--auto-height dist 24px      md2 28px   md3 24px
    q-field--auto-height dist 14px      md2 10px   md3 10px
    q-stepper__nav dist 24px            md2 16px   md3 24px
summary: 1 shape divergence(s), 5 metric divergence(s), 0 undispositioned
```

Two notes on the script's own first cut, kept because they are part of the record:
class (A) had to require a **circular** radius — dist's `.q-btn--dense` also keeps
both dimensions at 2.4em, but a 4px radius makes that a minimum size, not a shape
claim. And it must read `height` before `min-height`, because the AUD-MD2-002 fix
deliberately keeps `min-height` on the 48dp floor token and puts the square in
`height`; reading `min-height` alone misreported md2 as `64x48`.

---

## AUD-MD2-006 — banner (dense) top padding is compressed

**Bucket:** `preset-policy` — md2's spacing scale is compressed by design.
**Found by:** the sweep (class B).

dist states `.q-banner--dense … { padding-top: 12px }`; md2 emits `8px`
(`--q-space-sm`), md3 `12px`. This is the same _mechanism_ as AUD-MD2-001 — an
absolute dist value expressed through a style-varying scale — but not the same
_class_: no clearance invariant is at stake, nothing clips (verified in the light
and dark registers), and md2's tighter scale is its documented identity
(`--q-space-md` 8 vs 12, `--q-space-xl` 16 vs 24). Recorded as intentional.

---

## AUD-MD2-007 — stepper nav top padding is compressed

**Bucket:** `preset-policy` — same as AUD-MD2-006. **Found by:** the sweep (class B).

dist states `.q-stepper__nav … { padding-top: 24px }`; md2 emits `16px`, md3 `24px`.
The 24px here is _spacing_, not a clearance metric, so md2's compressed scale
applies. No overlap or clipping was observed on the stepper route. Recorded as
intentional, with the mechanism named so a future run does not re-derive it.

---

## Shared deviation, recorded (not an md2 finding)

`.q-field--auto-height … { padding-top: 14px }` in dist vs **10px in both styles**.
The two entries agree with each other, so this is a pre-existing divergence from
dist — not an md2 defect — and it is left alone rather than changed inside an
md2-scoped run. The sweep buckets it `preset-policy` for exactly that reason.

---

## md3's round button is equally oval (recorded for an md3 run)

The sweep reports md3 `q-btn--round` as `3em x 48px` — **NOT SQUARE** — i.e. the
same ellipse AUD-MD2-002 describes. md2 was fixed to `64x64` (spec-declared); md3
was deliberately left byte-identical because this run's scope is the md2 path and
its gate forbids moving md3's rendering. Recorded here so the finding is not lost.

---

## Recorded, no fix

| observation                                                                                                                                                                                                                                                     | bucket                      | basis                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 48dp control floor (`--q-control-height: 48px`) vs the spec's md2 button `height_px: 36`                                                                                                                                                                        | `preset-policy`             | a11y policy; the spec's own `bounding_touch_target_px: 48`. The run does not resolve the tension by editing either value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| generated palette identical in both styles (`--light-surface-container-high` `#e9e8eb`, `--dark-surface-container-high` `#292a2d`)                                                                                                                              | `palette-driven`            | md3 contrast fixes survive                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| md2 identity differences (`uppercase`, 4px radii, 3-layer shadows, `--q-comp-md` 48 vs 40, `--q-item-dense-min-height` 48 vs 28)                                                                                                                                | `spec-declared`/`uncovered` | documented divergence                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `q-btn--fab` 56×56 (spec `default: 56`)                                                                                                                                                                                                                         | `spec-declared`             | correct                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| the two reference-parity mismatches at HEAD: `.q-field--auto-height.q-field--dense .q-field__control\|min-height` and `.q-field--auto-height.q-field--dense .q-field__native\|min-height` (dist 40px, ours `var(--q-control-height)` = 48px in **both** styles) | `preset-policy` (ADR 0008)  | this is the 48dp floor of the row above, applied to dense controls — a deliberate a11y raise, not drift. It makes `test/parity-coverage.test.ts` red at HEAD until the ratchet baseline records it; the md3 run chose to record rather than rewrite, and this run leaves that choice intact. Recording it is `node scripts/parity-report.mjs --update`, which regenerates `test/fixtures/parity-baseline.json` (the ratchet; `test/parity-report.txt` is the report, not the ratchet). The `field` module carries no `target: 0`, so that update both adds these two entries and clears the gate; `node scripts/parity-report.mjs --module field` prints the detail (`40px (ref) vs var(--q-control-height) (ours)`). The md3 run chose to record rather than rewrite, and this run leaves that choice intact. |
| `print-*` registers byte-identical md2 vs md3                                                                                                                                                                                                                   | —                           | print styles do not use the preset                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| pixel pairing cannot rank defects: every screen differs 7–10% globally, and per-tile mask IoU collapses to ~0 because md2/md3 set text at different line-heights                                                                                                | —                           | method note; live measurement is the only evidence                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `docs/styles/material-design-2.md` cites removed `src/spec/md2.spec.ts`, `src/core/_tokenDerive.ts`                                                                                                                                                             | —                           | docs reconciliation declined this run — accepted risk                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
