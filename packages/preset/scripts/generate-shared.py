#!/usr/bin/env python3
"""
Generate shared component templates + style wrappers.

Reads md3 and md2 component files, creates shared templates in
src/styles/shared/components/ and replaces md3/md2 files with thin wrappers.

Strategy:
  Phase 1: Read ALL original files into memory first
  Phase 2: Generate shared templates from memory (never re-read)
  Phase 3: Write wrappers for md3 and md2  
  Phase 4: Verify by running tests
"""

import os
import re
import shutil
from pathlib import Path

BASE = '/home/stefan/Projects/unocss-preset-quasar/packages/preset/src/styles'
SHARED = f'{BASE}/shared/components'
MD3 = f'{BASE}/md3/components'
MD2 = f'{BASE}/md2/components'

os.makedirs(SHARED, exist_ok=True)


def read_file(path):
    with open(path) as f:
        return f.read()


def write_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w') as f:
        f.write(content)
    print(f"  Wrote {path}")


def camel_case(s):
    """Convert kebab-case to camelCase"""
    parts = s.split('-')
    return parts[0] + ''.join(p.capitalize() for p in parts[1:])


def component_name(filename):
    return filename.replace('.unocss.ts', '')


def make_func_name(comp):
    return f"make{comp}Shortcuts"


# ─── Categorization ──────────────────────────────────────────────

IDENTICAL = {
    'QAvatar', 'QBtnDropdown', 'QChatMessage', 'QExpansionItem',
    'QFile', 'QImg', 'QInnerLoading', 'QKnob', 'QPagination',
    'QParallax', 'QPopupEdit', 'QPullToRefresh', 'QRating',
    'QResponsive', 'QScrollarea', 'QSelect', 'QSeparator',
    'QSkeleton', 'QSpinner', 'QUploader', 'QVideo', 'QVirtualScroll'
}

DIFFERENT_VALUES = {
    'QAjaxBar', 'QBadge', 'QBanner', 'QBar', 'QCircularProgress',
    'QColorPicker', 'QFab', 'QFooter', 'QForm', 'QHeader', 'QIcon',
    'QInput', 'QIntersection', 'QOptionGroup', 'QPage', 'QPageSticky',
    'QSlider', 'QSpace', 'QSplitter', 'QTabPanel', 'QTimeline',
    'QToolbar', 'QTooltip', 'QTree'
}

DIFFERENT_STRUCTURE = {
    'QBtnToggle', 'QCard', 'QCarousel', 'QCheckbox', 'QChip',
    'QDate', 'QDialog', 'QDrawer', 'QEditor', 'QField', 'QItem',
    'QLayout', 'QLinearProgress', 'QMenu', 'QRadio', 'QSlideItem',
    'QStepper', 'QTable', 'QTabs', 'QTime', 'QToggle'
}

# Note: QBtn is ALREADY migrated - don't touch its files
# Note: QBreadcrumbs is different_structure but we handle it specially


def categorize(comp_name):
    if comp_name in IDENTICAL:
        return 'identical'
    elif comp_name in DIFFERENT_VALUES:
        return 'different_values'
    elif comp_name in DIFFERENT_STRUCTURE:
        return 'different_structure'
    return 'unknown'


# ─── Theme variable replacement ─────────────────────────────────

THEME_VAR_PATTERN = re.compile(
    r'\$(light|dark|shape-corner)-([a-zA-Z][a-zA-Z0-9-]*)'
)


def _theme_var_replacer(match):
    ns = match.group(1)
    name = match.group(2)
    camel = camel_case(name)
    
    if ns == 'light':
        path = f"color.{camel}"
    elif ns == 'dark':
        path = f"darkTokens.color.{camel}"
    elif ns == 'shape-corner':
        path = f"shape.corner{camel[0].upper() + camel[1:]}"
    else:
        return match.group(0)
    
    # Produce: ${s('path.here')}
    return f"${{{s_call(path)}}}"


def s_call(path):
    return f"s('{path}')"


def replace_theme_vars(text):
    """Replace $light-xxx, $dark-xxx, $shape-corner-xxx with s() calls."""
    return THEME_VAR_PATTERN.sub(_theme_var_replacer, text)


# ─── Shared template generators ──────────────────────────────────

def gen_shared_identical(comp_name, md3_content):
    """
    For identical components: wrap the original code in a make*Shortcuts function.
    The function body is the original file minus imports and export line.
    """
    func_name = make_func_name(comp_name)
    lines = md3_content.split('\n')
    
    # Extract imports, rewrite paths for shared location
    import_lines = []
    body_lines = []
    for line in lines:
        if line.startswith('import '):
            import_lines.append(line)
        elif 'export { shortcuts }' in line or 'export const shortcuts' in line:
            continue
        else:
            body_lines.append(line)
    
    body = '\n'.join(body_lines)
    
    # Build output using string concatenation to avoid f-string { } conflicts with JS
    parts = []
    parts.append(f"""/**
 * {comp_name}.unocss.ts — Shared {comp_name} style template
 *
 * Spec-driven version: uses the bound spec resolver `s()` to
 * interpolate token values at shortcut-build time.
 *
 * Each style module calls `{func_name}(bindSpec(spec))` and
 * merges the result into its own shortcut list.
 *
 * @module Styles
 */

""")
    for imp in import_lines:
        # Fix import paths - from '../../../theme.js' stays same for shared
        # from '../../_helpers.js' stays same for shared
        parts.append(imp + '\n')
    
    # Use a template without .format() to avoid KeyError from TypeScript { } in body
    template_lines = [
        "import type { SpecResolver } from '../../_spec.js'",
        '',
        '/**',
        f' * Generate {comp_name} shortcuts bound to a specific style\'s spec.',
        ' *',
        ' * @param s - The bound spec resolver from `bindSpec(spec)`.',
        ' * @returns An array of UnoCSS shortcuts.',
        ' */',
        f'export function {func_name}(s: SpecResolver): Shortcut<QuasarTheme>[] {{',
        indent_body(body, 2),
        '}',
        ''
    ]
    parts.append('\n'.join(template_lines))
    
    return ''.join(parts)


def gen_shared_different(comp_name, md3_content):
    """
    For components that differ: use the md3 version as base but replace
    UnoCSS theme variables with s() calls.
    """
    func_name = make_func_name(comp_name)
    lines = md3_content.split('\n')
    
    import_lines = []
    body_lines = []
    for line in lines:
        if line.startswith('import '):
            import_lines.append(line)
        elif 'export { shortcuts }' in line or 'export const shortcuts' in line:
            continue
        else:
            body_lines.append(line)
    
    # Join body then replace theme variables
    body = '\n'.join(body_lines)
    body = replace_theme_vars(body)
    
    parts = []
    parts.append(f"""/**
 * {comp_name}.unocss.ts — Shared {comp_name} style template
 *
 * Spec-driven version: uses the bound spec resolver `s()` to
 * interpolate token values at shortcut-build time.
 *
 * Each style module calls `{func_name}(bindSpec(spec))` and
 * merges the result into its own shortcut list.
 *
 * @module Styles
 */

""")
    for imp in import_lines:
        parts.append(imp + '\n')
    
    template_lines = [
        "import type { SpecResolver } from '../../_spec.js'",
        '',
        '/**',
        f' * Generate {comp_name} shortcuts bound to a specific style\'s spec.',
        ' *',
        ' * @param s - The bound spec resolver from `bindSpec(spec)`.',
        ' * @returns An array of UnoCSS shortcuts.',
        ' */',
        f'export function {func_name}(s: SpecResolver): Shortcut<QuasarTheme>[] {{',
        indent_body(body, 2),
        '}',
        ''
    ]
    parts.append('\n'.join(template_lines))
    
    return ''.join(parts)


def indent_body(body, spaces):
    """Indent every line of body by `spaces` spaces, except blank lines."""
    if not body.strip():
        return body
    indent = ' ' * spaces
    result = []
    for line in body.split('\n'):
        if line.strip():
            result.append(indent + line)
        else:
            result.append('')
    return '\n'.join(result)


# ─── Wrapper generators ─────────────────────────────────────────

def gen_wrapper(comp_name, style):
    """Generate a thin wrapper file."""
    func_name = make_func_name(comp_name)
    
    parts = []
    parts.append(f"""/**
 * {comp_name}.unocss.ts — {style} style wrapper
 *
 * Thin wrapper that binds the {style} spec to the shared template.
 *
 * @module Styles
 */

import {{ {func_name} }} from '../../shared/components/{comp_name}.unocss.js'
import {{ bindSpec, type SpecResolver }} from '../../_spec.js'

const s: SpecResolver = bindSpec('{style}')
export const shortcuts = {func_name}(s)
""")
    return ''.join(parts)


# ─── Main processing ─────────────────────────────────────────────

def main():
    # Phase 1: Read ALL files into memory first
    md3_files = sorted(os.listdir(MD3))
    
    print(f"Phase 1: Reading {len(md3_files)} md3 component files...")
    md3_originals = {}
    for filename in md3_files:
        if not filename.endswith('.unocss.ts'):
            continue
        md3_originals[filename] = read_file(f'{MD3}/{filename}')
    
    md2_originals = {}
    for filename in sorted(os.listdir(MD2)):
        if not filename.endswith('.unocss.ts'):
            continue
        md2_originals[filename] = read_file(f'{MD2}/{filename}')
    
    print(f"  Read {len(md3_originals)} md3 and {len(md2_originals)} md2 files")
    
    # Phase 2-3: Generate and write
    print(f"\nPhase 2-3: Generating shared templates and wrappers...")
    
    for filename in sorted(md3_originals.keys()):
        comp_name = component_name(filename)
        md3_content = md3_originals[filename]
        
        if filename not in md2_originals:
            print(f"  SKIP {filename}: no md2 version")
            continue
        
        md2_content = md2_originals[filename]
        is_identical = (md3_content == md2_content)
        cat = categorize(comp_name)
        
        print(f"\n  --- {comp_name} ({cat}) ---")
        
        # Skip QBtn - already migrated
        if comp_name == 'QBtn':
            print(f"    Already migrated (shared template exists)")
            continue
        
        # Generate shared template
        if is_identical or cat == 'identical':
            shared = gen_shared_identical(comp_name, md3_content)
        elif cat in ('different_values', 'different_structure'):
            shared = gen_shared_different(comp_name, md3_content)
        else:
            # Unknown: try different_values approach
            shared = gen_shared_different(comp_name, md3_content)
        
        # Write shared template
        shared_path = f'{SHARED}/{filename}'
        write_file(shared_path, shared)
        
        # Write md3 wrapper
        md3_wrapper = gen_wrapper(comp_name, 'md3')
        write_file(f'{MD3}/{filename}', md3_wrapper)
        
        # Write md2 wrapper
        md2_wrapper = gen_wrapper(comp_name, 'md2')
        write_file(f'{MD2}/{filename}', md2_wrapper)
        
        if cat == 'different_structure':
            print(f"    ⚠️  Structural differences - may need review")
    
    print(f"\n{'='*60}")
    print(f"Generation complete!")
    print(f"Shared templates: {SHARED}/")
    print(f"md3 wrappers: {MD3}/")
    print(f"md2 wrappers: {MD2}/")


if __name__ == '__main__':
    main()
