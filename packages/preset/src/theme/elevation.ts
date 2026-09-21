/**
 * Material elevation, per style.
 *
 * The rules reference two spellings: the `.elevation-N` utilities state
 * `--q-elevation-level<n>`, and the component rules state `--q-elevation-<n>`.
 * The token block emits the first (from the style entries' `elevation`
 * category); the preflight states the second as an alias of it, so both resolve
 * to whatever the active style says.
 *
 * md3 — from the spec corpus, `specs/elevation_shapes_and_structural_anatomy.json`:
 *
 *   level_1  { blur_px: 3,  y_offset_px: 1, spread_px: 0, opacity_ambient: 0.2 }
 *   level_2  { blur_px: 6,  y_offset_px: 2, spread_px: 0, opacity_ambient: 0.2 }
 *   level_3  { blur_px: 10, y_offset_px: 4, spread_px: 0, opacity_ambient: 0.3 }
 *   level_4  { blur_px: 14, y_offset_px: 6, spread_px: 0, opacity_ambient: 0.3 }
 *   level_5  { blur_px: 20, y_offset_px: 8, spread_px: 0, opacity_ambient: 0.3 }
 *
 * The colour is `--q-shadow-color` (black in light, white in dark) rather than a
 * literal, so md3's dark elevation stays white-ish as the spec intends.
 *
 * md2 — Quasar's own scale, `src/css/variables.sass` (`$shadow-1` … `$shadow-5`),
 * which is also the md2 spec's three-layer table:
 *
 *   $shadow-1 : 0 1px 3px umbra,  0 1px 1px penumbra,   0 2px 1px -1px ambient
 *   $shadow-2 : 0 1px 5px umbra,  0 2px 2px penumbra,   0 3px 1px -2px ambient
 *   $shadow-3 : 0 1px 8px umbra,  0 3px 4px penumbra,   0 3px 3px -2px ambient
 *   $shadow-4 : 0 2px 4px -1px umbra, 0 4px 5px penumbra, 0 1px 10px ambient
 *   $shadow-5 : 0 3px 5px -1px umbra, 0 5px 8px penumbra, 0 1px 14px ambient
 *
 * The umbra/penumbra/ambient are our existing `--q-shadow-*` tokens (whose
 * percentages are Quasar's: 20/14/12), so md2 needs no new values.
 *
 * The values that were here before were neither table: a two-layer
 * materializecss-style scale (`0 3px 6px rgba(0,0,0,0.16), …`), and md3's were
 * literal black, so dark mode would have shadowed with black on black.
 */
import type { ElevationTokens } from './types.js'

/** md3: the spec's vectors, with the ambient opacity as a percentage. */
export const md3Elevation: ElevationTokens = {
  elevationLevel0: 'none',
  elevationLevel1: shadow(1, 3, '20%'),
  elevationLevel2: shadow(2, 6, '20%'),
  elevationLevel3: shadow(4, 10, '30%'),
  elevationLevel4: shadow(6, 14, '30%'),
  elevationLevel5: shadow(8, 20, '30%')
}

/** md2: Quasar's `$shadow-N` expansion over the `--q-shadow-*` primitives. */
export const md2Elevation: ElevationTokens = {
  elevationLevel0: 'none',
  elevationLevel1: layers('0 1px 3px', '0 1px 1px', '0 2px 1px -1px'),
  elevationLevel2: layers('0 1px 5px', '0 2px 2px', '0 3px 1px -2px'),
  elevationLevel3: layers('0 1px 8px', '0 3px 4px', '0 3px 3px -2px'),
  elevationLevel4: layers('0 2px 4px -1px', '0 4px 5px', '0 1px 10px'),
  elevationLevel5: layers('0 3px 5px -1px', '0 5px 8px', '0 1px 14px')
}

/** `0 1px 3px 0 color-mix(in srgb, var(--q-shadow-color) 20%, transparent)` */
function shadow(y: number, blur: number, ambient: string): string {
  return `0 ${y}px ${blur}px 0 color-mix(in srgb, var(--q-shadow-color) ${ambient}, transparent)`
}

function layers(umbra: string, penumbra: string, ambient: string): string {
  return [
    `${umbra} var(--q-shadow-umbra)`,
    `${penumbra} var(--q-shadow-penumbra)`,
    `${ambient} var(--q-shadow-ambient)`
  ].join(', ')
}
