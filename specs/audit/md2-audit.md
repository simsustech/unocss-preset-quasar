# md2 audit — rows (AUD-MD2-*)

Ground truth per the corrected **Authority model**: `specs/md2/*.json` (MD2 machine spec,
authoritative per AGENTS.md) decides every metric it declares; `quasar/dist/quasar.css`
applies **only where the spec is silent**; a measured no-overlap invariant governs
geometry the spec never contemplates.

Buckets: `spec-declared` · `dist-only` · `invariant` · `palette-driven` · `preset-policy` · `uncovered`.

Registers: `test-results/frontend-audit{,-dark}/<viewport>/*.png` (md2, 123 + 52) against the
md3 baseline of the same routes and seed.

**Where that baseline lives now, because these paths are the first thing to rot.** In the
final state of this run those two directories hold the **md3** captures again (they were
restored byte-identically, verified with `diff -r`), so the md3 baseline is
`packages/api/test-results/frontend-audit{,-dark}/` in petboarding — the same place the
capture commands write. The copies this run kept are `/tmp/pb-md3-frontend-audit{,-dark}/`
(baseline) and `/tmp/pb-md2-postfix-frontend-audit{,-dark}/` (md2 after both fixes); both are
`/tmp`, so re-shoot rather than rely on them. Two crop files cited below
(`/tmp/cmp-dark-top.png`, `/tmp/tg-cmp2.png`) are transient run evidence — re-create them with
`magick` from the registers named beside each row.

**Sources used:** `specs/md2/*.json` (the MD2 machine spec) and `quasar/dist/quasar.css`. The
plan also named `specs/reference/normalized/md2-*.json`; those exist but were **not** used, and
that is not an omission to paper over — the spec plus dist decided every row, and the
normalized reference set carries none of the metrics that were at stake.

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

**Fix (as shipped):** a dedicated metric value rather than the style-varying space scale,
applied to both paths in both entries — `--q-field-labeled-padding-top`, **28px in md2** and
24px in md3. The value is the _invariant's_, not dist's: measured on this geometry dist's own
24px still intersects the floated label by up to 1.2px, while 28px clears it by +1.8px. (The
assertion lives in `packages/preset/test/field-native-cascade.test.ts`; the measurements are
the traffic-light table in the evaluation for this run.) **Do not** raise md2's
`--q-space-xl`: it is used across every component and would reshape every md2 screen.

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

**Verified at the gate:** the fix takes one 64px side for both dimensions
(`--q-btn-round-min-width` + `--q-btn-round-height`), which the live re-measurement confirms —
**0 of 56** round instances non-square, every one 64×64, with `min-height` still resolving to
the 48dp floor and `--fab` untouched at 56×56. See the sweep section below, which reports the
same thing sheet-side: md2 `64px x 64px square` against md3's `3em x 48px NOT SQUARE`.

**What that verification does NOT cover — corrected after a late crop check.** Those numbers are
scoped to `.q-btn--round` and `.q-btn--fab`. **This row's own evidence element is a different
selector.** The occupancy day cells the row cites are

```
q-btn q-btn--outline q-btn--rectangle q-btn--rounded q-btn--actionable …   64x48   border-radius: 28px
```

— not `--round` at all, so neither the arbiter citation above nor the fix touches them. Measured
live: md2 `64 × 48` with a 28px radius, i.e. a **stadium/pill** (fully round ends, flat middle),
against md3's `≈45 × 45` (a circle, because md3's `--q-btn-min-width` is `auto` and the cell is
sized by its content). The crop pair (`/tmp/occ-cmp.png`) shows exactly that, and re-making it
after the fix is what exposed this.

**So this row is half addressed, and the plan's diagnosis named the wrong rule.** The `--round`
family is genuinely fixed. The day cell's shape comes from the base sizing instead: md2's
`--q-btn-min-width: 64px` (the md2 spec's `buttons.*.min_width_px: 64`, which _is_ spec-correct
for an `--outline` button) against the 48dp height floor — a spec width and a policy height that
cannot both be circular. Whether md2's pill is therefore _acceptable_ (the spec asks a 64px
outlined button; the policy asks 48px) or a _defect_ (both md3 and dist render this control
content-sized and round) is an open design call, not something this run may settle by itself.
**Left unfixed and recorded here**, because fixing it would have to decide that call and could
involve the app's markup — out of scope for a harness-only run.

**Assessment, so the call can be made in one read (added after this run closed).**

_Cause, measured._ `packages/app/src/pages/admin/OccupancyPage.vue:59` renders the day grid as
`<q-btn rounded>` — the app's own markup, not Quasar's `q-date` internals (that is a separate
popup on line 20). `rounded` gives `border-radius: 28px`; the base button rule then applies
md2's `--q-btn-min-width: 64px`, while the height is the 48dp floor → 64×48 → a stadium.

_No arbiter is violated._ dist's `.q-btn--rounded` states only `border-radius: 28px`, and dist
declares **no** `min-width` anywhere in the `.q-btn` family (checked). md2's 64px is the md2
spec's `buttons.*.min_width_px: 64`, and in the spec that value sits beside
`padding_left_right_px` and `typography_token` in the _contained / outlined / text_ variants —
i.e. text buttons. The spec states no sizing for a rounded/icon button at all. md3 is
content-sized because its `--q-btn-min-width` is `auto`; dist matches that.

_Options._

1. **Scope the spec width to text buttons** — `min-width: auto` for `--rounded`/`--rectangle`
   in md2 (a token, not a rule fork). Blast radius is every rounded/rectangle button in any md2
   consumer (≈20 `rounded` usages across petboarding's components alone), so it needs its own
   visual pass; it is the principled reading of the spec.
2. **Accept it** — a 64px-wide, 48px-tall outlined button is spec width plus policy height, and
   the stadium is the arithmetic consequence of the app asking for `rounded`. Close the row as
   expected md2 behaviour.
3. **Change the app** — the date grid could use `round` instead of `rounded`, which would make
   md2's cells circular without touching the preset. Petboarding is the harness here (nothing is
   committed in it), and this row is about the preset's md2 path, so option 3 belongs to the app.

_Recommendation:_ option 1 if the spec's `min_width_px` is meant for text buttons (its structure
says so), option 2 if it is meant for every button — and that is a reading of the spec, not
something this audit can decide by itself.

_Settled (2026-09-30) — by reading the spec itself, which is what the recommendation above was
waiting on._ The MD2 source answers which section governs this element:

- **Buttons** (m2.material.io/components/buttons): four types — text, outlined, contained, toggle —
  measurement diagrams stating height `36` and `min-width: 64dp`, plus the container rule "set the
  button's width to the size of the text label with 16dp padding": a floor under label+padding _for
  action buttons_. The spec's own `border_radius_px: 4` means MD2 knows no pill at all.
- **Date pickers** (m2.material.io/components/date-pickers): a calendar day has its own redline —
  "Date bounding box: 40 x 40dp", "Selected date: 36 x 36dp", "Padding between dates: 4dp"
  (mobile), touch targets "as large as possible … minimum … 32 x 32dp".
- **Implementations**: Quasar v1.22.10 — the md2-era build, fetched from unpkg this day — has
  **zero** `min-width` rules in any `.q-btn` rule (92 in the file, none on buttons), and dist
  v2.33.2 declares none either.

So the condition resolves **for option 1, in its `--rounded` half only**:

- The day cell is a _date_, not an action button: the button floor was never its section, and both
  real Quasar builds render such cells content-sized. Chain per ADR 0008 — spec silent → dist →
  content width.
- **The `--rectangle` half of the drafted option is wrong, and the class assembly proves it.**
  `quasar.umd.js` builds the shape as
  `round ? 'round' : \`rectangle${rounded ? ' q-btn--rounded' : …}\``—`q-btn--rectangle`sits on
*every* non-round button, i.e. on the spec's own text/outlined/contained. Scoping the release
there would delete`min_width_px` from dialog actions and plain label buttons.

**Implemented** (red→green, four new assertions in `test/buttons-spec.test.ts`): `.q-btn--rounded`
states `min-width: auto`, and the fab/mini-fab rules re-assert their size token with `!important` —
the same treatment this file already gives their radius, because Quasar adds `q-btn--rounded` to
every fab and `--rounded` emits after `--fab`. `--rectangle` is untouched and keeps the 64.

**Verified.** Unit: 15/15 in buttons-spec, suite otherwise unchanged (the one red is the recorded
floor pair), tsc / lint / format:check / build / sweep all clean, every status read without pipe
masking. Real-engine cascade over the generated md2 CSS: pill `0px` (released — `auto` computes to
zero on an inline box), plain `64px`, round `64px`, fab `56px` = `--q-fab-size`, mini `40px` =
`--q-fab-mini-size`, min-height 48 on every non-fab — 6/6. Live md2 (app rebuilt against the
worktree, DB reseeded): **35 day cells at 48×48 (×22) and 40×48 (×13), radius 28px,
`min-width: auto`** against the measured 64×48 stadium; the rail's real `<q-btn fab>` measures
**56×56 with `min-width: 56px`** despite carrying `--rounded` (the `!important` holds in the real
app); round buttons 64×64; plain label buttons keep `min-width: 64px`. By-eye: both audit suites
re-captured (123 light / 52 dark; 10/10 + 4/4) and the three-way crop (`/tmp/cmp-days-3way.png`:
pre-fix md2 | md3 | md2-after) shows md2's cells circular — md3's shape, md2's `currentColor`
(AUD-MD2-003's expected divergence) — with the 40-wide cells on MD2's own 40dp date box.

---

## AUD-MD2-003 — occupancy day cells lose their colour (resolved: expected divergence)

**Bucket:** `dist-only` — the md2 spec declares no day-cell colour, and dist states the answer:
`currentColor`.

md3 paints in-month day cells as tonal circles (light-blue fill, blue text); md2 paints
them white with near-black text and a thin outline.

**Disposition: expected divergence — no fix.** Step 5 read the tokens behind the colour, and
md2 is the _arbiter-faithful_ style here: `btnFlatColor: currentColor` and
`btnOutlineBorder: 1px solid currentColor`, against md3's `var(--q-primary)` and
`1px solid var(--q-outline)`. dist says `.q-btn--outline:before { border: 1px solid
currentColor }` and declares **no** `color` at all — so md2 mirrors dist and **md3 is the
style that deviates** toward the accent. md2 has no tonal containers by design. "Fixing"
this row would mean breaking md2's fidelity to dist.

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

**Disposition: expected divergence — no fix.** Step 5 read the tokens: md2's active track is
`color-mix(in oklab, var(--q-secondary) 50%, transparent)` with `toggleThumbBgActive:
var(--q-secondary)`, and md2's own comment at that token cites quasar.css — geometry
`toggleTrackHeight: 0.35em`, `toggleTrackBorderRadius: 0.175em`, i.e. dist's
`.q-toggle__track { height: 0.35em; border-radius: 0.175em; background: currentColor }`.
md3's active track is solid `var(--q-primary)`. So md2 is again the dist-faithful style, and
the "grey" reading was that 50% mix over a dark surface — not a dropped colour.
**Caveat recorded rather than resolved:** the _on_ state is legible but unemphatic in dark
mode. That is a real usability question, and it belongs to md2's accent policy
(ADR 0008 item 4) — not to an arbiter mismatch, so this run does not touch it.

---

## AUD-MD2-005 — daycare progress labels bunch (resolved: out of scope, app-side)

**Bucket:** `uncovered` — resolved **out of scope**: no preset metric is implicated.

**Measured (step 2, dark registers):** on `desktop/admin-daycare.png` the segmented
subscription bar's labels (Approved / Cancelled / Pending / Rejected / Reserved) sit at even
spacing across the full-width fill in md3, but in md2 they are **clustered into the left
half** while the fill still spans the full width — labels no longer align with their
segments.

**Resolution (step 6): out of scope — the app owns this layout.** The five labels come from
`packages/app/src/components/daycare/DaycareLegend.vue`, which renders `q-badge` + text and
uses **no** preset spacing token (no `--q-space-*`, no gap/flex/width declarations at all),
so md2's compressed scale cannot be its cause and dist states nothing about the bar. The
register difference is app-side layout reacting to md2's smaller typography. It stays
recorded and unfixed because petboarding is the rendering harness (nothing is committed
there) and the row implicates no arbiter declaration.

---

## Harness artifact (not a defect, but it affects every dark register)

`screenshots-dark.spec.ts`'s `setDark()` opens the overflow menu, clicks `.q-menu .q-toggle`,
then waits for `body--dark` — **without closing the menu**. Every dark register therefore
captures the menu panel open over the page. Verified as harness behaviour, not an md2
finding: the md3 dark baseline (`/tmp/pb-md3-frontend-audit-dark/mobile/home.png`) shows the
identical open panel (`/tmp/cmp-dark-top.png`). It does make the dark registers harder to
read, and it is a petboarding-side fix (out of scope — nothing is committed there).

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

| observation                                                                                                                                                                                                                                                     | bucket                      | basis                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 48dp control floor (`--q-control-height: 48px`) vs the spec's md2 button `height_px: 36`                                                                                                                                                                        | `preset-policy`             | a11y policy; the spec's own `bounding_touch_target_px: 48`. The run does not resolve the tension by editing either value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| generated palette identical in both styles (`--light-surface-container-high` `#e9e8eb`, `--dark-surface-container-high` `#292a2d`)                                                                                                                              | `palette-driven`            | md3 contrast fixes survive                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| md2 identity differences (`uppercase`, 4px radii, 3-layer shadows, `--q-comp-md` 48 vs 40, `--q-item-dense-min-height` 48 vs 28)                                                                                                                                | `spec-declared`/`uncovered` | documented divergence                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `q-btn--fab` 56×56 (spec `default: 56`)                                                                                                                                                                                                                         | `spec-declared`             | correct                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| the two reference-parity mismatches at HEAD: `.q-field--auto-height.q-field--dense .q-field__control\|min-height` and `.q-field--auto-height.q-field--dense .q-field__native\|min-height` (dist 40px, ours `var(--q-control-height)` = 48px in **both** styles) | `preset-policy` (ADR 0008)  | this is the 48dp floor of the row above, applied to dense controls — a deliberate a11y raise, not drift. It makes `test/parity-coverage.test.ts` red at HEAD until the ratchet baseline records it; the md3 run chose to record rather than rewrite, and this run leaves that choice intact. **This is not only local redness.** `.github/workflows/ci.yaml:47` runs `pnpm run test`, and that is the same suite — so the branch's CI is red until the two entries are recorded or the divergence is fixed in `src/`. The recording is what unblocks a green CI; nothing about the fix itself is in question, since the divergence is the deliberate 48dp floor. |

Recording it is `node scripts/parity-report.mjs --update`, which regenerates `test/fixtures/parity-baseline.json` (the ratchet; `test/parity-report.txt` is the report, not the ratchet). The `field` module carries no `target: 0`, so that update both adds these two entries and clears the gate; `node scripts/parity-report.mjs --module field` prints the detail (`40px (ref) vs var(--q-control-height) (ours)`). |
| `print-*` registers byte-identical md2 vs md3 | — | print styles do not use the preset |
| pixel pairing cannot rank defects: every screen differs 7–10% globally, and per-tile mask IoU collapses to ~0 because md2/md3 set text at different line-heights | — | method note; live measurement is the only evidence |
| `docs/styles/material-design-2.md` cites removed `src/spec/md2.spec.ts`, `src/core/_tokenDerive.ts` | — | docs reconciliation declined this run — accepted risk |
| AUD-MD2-003 — occupancy day cells lose their colour (md2 `currentColor`, md3 `--q-primary`) | `dist-only` | expected divergence: md2's `btnFlatColor: currentColor` **is** dist's value (dist declares no `color`); md3 is the deviating style — see the row's section |
| AUD-MD2-004 — an active toggle's track is unemphatic in dark mode (md2 `color-mix(oklab, secondary 50%, transparent)`, md3 `--q-primary`) | `dist-only` | expected divergence, same direction as 003; the usability caveat is recorded in the row's section and belongs to md2's accent policy (ADR 0008 item 4) |
| AUD-MD2-005 — daycare legend labels bunch in md2 | `uncovered` → **out of scope** | app-side (`DaycareLegend.vue` uses no preset token); petboarding is the harness, and no arbiter declaration is implicated |
| AUD-MD2-006 — banner (dense) top padding 8px vs dist 12px | `preset-policy` | md2's compressed space scale; spacing, not a clearance metric — no clipping observed (see the sweep section) |
| AUD-MD2-007 — stepper nav top padding 16px vs dist 24px | `preset-policy` | same mechanism and same disposition as 006; found by the sweep, so a future run need not re-derive it |
| **AUD-MD2-002's evidence element — occupancy day cells** (`--rectangle --rounded`, was 64×48 r=28px = a stadium) | **resolved — fixed** (option 1, `--rounded` half) | settled by reading MD2: buttons state 64dp for label action buttons while the date-picker section sizes dates 40×40dp (36×36dp selected, 4dp apart), and both real Quasar builds (v1.22.10, dist v2.33.2) declare no button min-width — so `.q-btn--rounded` now states `min-width: auto`, scoped away from `--rectangle` because QBtn's assembly puts that class on every non-round button. Live: 35 cells 48×48/40×48, rail fab 56×56 pinned `!important`, round 64×64, plain buttons keep 64; three-way crop `/tmp/cmp-days-3way.png` |

---

## Visual re-verification of the fix (post-fix registers, by eye)

Every earlier claim in this file rested on live DOM measurement. This pass looked at the
_rendering_ instead, which is how the AUD-MD2-002 discrepancy above was found. What was
checked, and what it showed:

| row         | register(s) compared (md2 post-fix vs md3)                                       | what the eye confirms                                                                                                                                                                                                                                                                                                                                          |
| ----------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AUD-MD2-001 | `desktop/flow-pet-edit-dialog.png`, `mobile/flow-customer-pet-create-dialog.png` | the floated label sits clear above its value — `Species*`/`Dog`, `Name*`/`name2`, `Gender*`/`Male`, `Sterilized*`/`Yes`, `Birth date*`/`02-02-2020` — matching md3. The row's cited register is valid: the _mobile_ create dialog does show a filled `Species*`/`Dog` (the desktop one is empty apart from that). Fix confirmed visually, not just numerically |
| AUD-MD2-002 | `desktop/admin-occupancy.png`                                                    | the `--round` family is circular; **the row's own evidence element is not** — see the correction in the row above                                                                                                                                                                                                                                              |
| AUD-MD2-004 | `frontend-audit-dark/mobile/home.png` (user-menu switch, 4×)                     | md2's _on_ track is grey with a grey thumb and halo against md3's blue — the recorded disposition holds                                                                                                                                                                                                                                                        |
| AUD-MD2-005 | `mobile/account-daycare.png`                                                     | the vaccination banner's text fits its box at both widths (5 lines, last line inside) — no clipping                                                                                                                                                                                                                                                            |

**One claim downgraded, not confirmed.** AUD-MD2-006 says "no clipping observed" for the
_dense_ banner variant. The banner I could find in the registers
(`mobile/account-daycare.png`) is not established to be the dense one, so that assertion
stays **measured-but-not-looked-at**: the sheet comparison (md2 `padding-top: 8px` vs dist
`12px`) is solid, the "no clipping" half is not visually confirmed. Recorded rather than
left to read as verified.
