import { Preflight, Rule, Shortcut } from '@unocss/core'
import { QuasarTheme } from '../theme.js'
import {
  preflights as ColorPreflights,
  shortcuts as ColorShortcuts
} from './colors.unocss.js'
import {
  preflights as DarkPreflights,
  shortcuts as DarkShortcuts
} from './dark.unocss.js'
import {
  shortcuts as ElevationShortcuts,
  rules as ElevationRules
} from './elevation.unocss.js'
import { shortcuts as FlexShortcuts } from './flex.unocss.js'
import {
  rules as HelperRules,
  preflights as HelperPreflights,
  shortcuts as HelperShortcuts
} from './helpers.unocss.js'
import {
  preflights as MousePreflights,
  shortcuts as MouseShortcuts,
  rules as MouseRules
} from './mouse.unocss.js'
import { shortcuts as OrientationShortcuts } from './orientation.unocss.js'
import { shortcuts as PositionShortcuts } from './position.unocss.js'
import {
  preflights as SizePreflights,
  shortcuts as SizeShortcuts
} from './size.unocss.js'
import { shortcuts as TouchShortcuts } from './touch.unocss.js'
import {
  preflights as TransitionPreflights,
  shortcuts as TransitionsShortcuts
} from './transitions.unocss.js'
import {
  preflights as TypographyPreflights,
  shortcuts as TypographyShortcuts
} from './typography.unocss.js'
import {
  rules as VisibilityRules,
  preflights as VisibilityPreflights,
  shortcuts as VisibilityShortcuts
} from './visibility.unocss.js'
import { preflights as ShapePreflights } from './shape.unocss.js'
import { preflights as ResetPreflights } from './reset.css.js'

export const preflights: Preflight<QuasarTheme>[] = (
  [] as Preflight<QuasarTheme>[]
).concat(
  ResetPreflights,
  ColorPreflights,
  DarkPreflights,
  HelperPreflights,
  MousePreflights,
  TypographyPreflights,
  VisibilityPreflights,
  TransitionPreflights,
  SizePreflights,
  ShapePreflights
)

export const rules = ([] as Rule<QuasarTheme>[]).concat(
  MouseRules,
  HelperRules,
  ElevationRules,
  VisibilityRules
)

export const shortcuts = ([] as Shortcut<QuasarTheme>[]).concat(
  ColorShortcuts,
  DarkShortcuts,
  FlexShortcuts,
  HelperShortcuts,
  MouseShortcuts,
  OrientationShortcuts,
  PositionShortcuts,
  SizeShortcuts,
  TouchShortcuts,
  TransitionsShortcuts,
  TypographyShortcuts,
  VisibilityShortcuts,
  ElevationShortcuts
)
