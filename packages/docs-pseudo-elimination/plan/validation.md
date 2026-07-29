---
layout: doc
---

# Validation Criteria

## Visual Regression

- **Tool:** Playwright `page.screenshot()` + `cmp` byte comparison
- **Baseline:** Screenshots in `packages/app/public/screenshots/{style}/{mode}/{device}/{component}/`
- **Pass condition:** `cmp baseline.svg new.svg` exits 0 (byte-identical)
- **Failure:** Screenshot diff attached to test report

## Computed-Style Regression

- **Tool:** `pseudoStyles()` / `computedStyles()` helpers in harness
- **Properties checked:** All CSS properties affecting layout, color, spacing, transform, opacity
- **Pass condition:** Every property value matches baseline exactly
- **Failure:** JSON diff attached showing expected vs received

## Functional Tests

| Test       | Description                                    |
| ---------- | ---------------------------------------------- |
| Open/close | Component opens and closes correctly           |
| Focus/blur | `:focus-visible` styles apply/remove correctly |
| Keyboard   | ESC, Tab, Arrow keys work as expected          |
| Hover      | Hover states trigger correctly                 |
| Disabled   | Disabled state renders correctly               |
| Dark mode  | All variants work in dark theme                |

## Accessibility

- **Tool:** axe-core via Playwright
- **Criteria:** Zero new violations introduced
- **Check:** Role, aria attributes, focus order, color contrast

## Bundle Size

- **Metric:** CSS output size (gzipped)
- **Target:** ≤ baseline (fewer atoms = smaller output)
- **Measurement:** `vite build` → analyze `dist/assets/*.css.gz`

## CI Pipeline

```yaml
# .github/workflows/pseudo-elimination.yml
jobs:
  visual-regression:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
      - name: Install deps
        run: pnpm install --frozen-lockfile
      - name: Build Quasar
        run: cd ~/Projects/quasar && pnpm --filter quasar build
      - name: Copy to harness
        run: cp ~/Projects/quasar/ui/dist/quasar.* ~/Projects/quasar-testing-harness/node_modules/.pnpm/quasar@2.20.0/node_modules/quasar/dist/
      - name: Run tests
        run: cd ~/Projects/quasar-testing-harness && pnpm playwright test
      - name: Upload diffs
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: screenshot-diffs
          path: test-results/
```

## Per-Component Sign-off

A component is **done** when:

- [ ] Quasar core modified (render fn + SASS)
- [ ] Preset shortcuts updated
- [ ] Build passes (`pnpm --filter quasar build`)
- [ ] All visual tests pass (3 styles × N variants)
- [ ] Computed-style regression passes
- [ ] Functional tests pass
- [ ] axe-core passes
- [ ] Bundle size ≤ baseline
- [ ] Screenshots committed to `packages/app/public/screenshots/`
