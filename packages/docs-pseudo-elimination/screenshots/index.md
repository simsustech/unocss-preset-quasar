---
layout: doc
---

# Screenshots: Before/After Comparison

## Methodology

| Aspect          | Tool                                          | Baseline Location                                                      |
| --------------- | --------------------------------------------- | ---------------------------------------------------------------------- |
| Visual          | Playwright `page.screenshot()`                | `packages/app/public/screenshots/{style}/{mode}/{device}/{component}/` |
| Computed Styles | `pseudoStyles()` / `computedStyles()` helpers | `test-output/` JSON                                                    |
| Byte Comparison | `cmp` / `pixelmatch`                          | CI artifact                                                            |

---

## QDate Calendar

### Default View (md3, light, desktop)

| Baseline                                            | After Pseudo-Element Removal                           | Diff                                                 |
| --------------------------------------------------- | ------------------------------------------------------ | ---------------------------------------------------- |
| ![baseline](/screenshots/qdate/q-date__default.svg) | ![after](/screenshots/qdate/q-date__default-after.svg) | ![diff](/screenshots/qdate/q-date__default-diff.svg) |

**Key Areas to Verify:**

- [ ] Day cell dashed borders (Pattern A)
- [ ] Range highlight background (Pattern B)
- [ ] Range start/end borders (Pattern B from/to)
- [ ] Edit range borders (Pattern C)
- [ ] Week corner rounding (first-in-week / last-in-week)

### Range Selection (md3, light)

| Baseline                                          | After                                                | Diff                                               |
| ------------------------------------------------- | ---------------------------------------------------- | -------------------------------------------------- |
| ![baseline](/screenshots/qdate/q-date__range.svg) | ![after](/screenshots/qdate/q-date__range-after.svg) | ![diff](/screenshots/qdate/q-date__range-diff.svg) |

### Edit Range (md3, light)

| Baseline                                               | After                                                     | Diff                                                    |
| ------------------------------------------------------ | --------------------------------------------------------- | ------------------------------------------------------- |
| ![baseline](/screenshots/qdate/q-date__edit-range.svg) | ![after](/screenshots/qdate/q-date__edit-range-after.svg) | ![diff](/screenshots/qdate/q-date__edit-range-diff.svg) |

### Dark Mode (md3, dark)

| Baseline                                         | After                                               | Diff                                              |
| ------------------------------------------------ | --------------------------------------------------- | ------------------------------------------------- |
| ![baseline](/screenshots/qdate/q-date__dark.svg) | ![after](/screenshots/qdate/q-date__dark-after.svg) | ![diff](/screenshots/qdate/q-date__dark-diff.svg) |

---

## Automated Comparison Script

```bash
#!/bin/bash
# compare-screenshots.sh

BASELINE_DIR="packages/app/public/screenshots"
AFTER_DIR="test-results/screenshots-after"
DIFF_DIR="test-results/diffs"

mkdir -p "$AFTER_DIR" "$DIFF_DIR"

for baseline in "$BASELINE_DIR"/md3/light/desktop/*/*.svg; do
  name=$(basename "$baseline")
  after="$AFTER_DIR/$(dirname "${baseline#$BASELINE_DIR/}")/$name"
  diff="$DIFF_DIR/$(dirname "${baseline#$BASELINE_DIR/}")/${name%.svg}-diff.svg"

  if [ -f "$after" ]; then
    if cmp -s "$baseline" "$after"; then
      echo "✅ $name: IDENTICAL"
    else
      # Generate visual diff with pixelmatch
      npx pixelmatch "$baseline" "$after" "$diff" 0.1 "#ff0000" true
      echo "❌ $name: DIFFERENT (see $diff)"
    fi
  else
    echo "⚠️ $name: NO AFTER IMAGE"
  fi
done
```

---

## CI Integration

```yaml
# .github/workflows/visual-regression.yml
jobs:
  visual-regression:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - run: pnpm install --frozen-lockfile
      - run: cd ~/Projects/quasar && pnpm --filter quasar build
      - run: cp ~/Projects/quasar/ui/dist/quasar.* ~/Projects/quasar-testing-harness/node_modules/.pnpm/quasar@2.20.0/node_modules/quasar/dist/
      - run: cd ~/Projects/quasar-testing-harness && pnpm playwright test --project=chromium
      - name: Upload diffs
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: visual-diffs
          path: test-results/
```

---

## Screenshot Naming Convention

```
{component}__{variant}.svg
```

Examples:

- q-date\_\_default.svg
- q-date\_\_range.svg
- q-date\_\_edit-range.svg
- q-date\_\_dark.svg

---

## Diff Thresholds

| Metric                | Threshold    | Action      |
| --------------------- | ------------ | ----------- |
| Pixel difference      | 0 pixels     | Fail if > 0 |
| CSS property mismatch | 0 properties | Fail if > 0 |
| Bundle size increase  | 0 bytes      | Warn if > 0 |
| New axe violations    | 0            | Fail if > 0 |

---

## Manual Verification Checklist

Per component after pseudo-element removal:

- [ ] Open in browser, inspect DevTools → Elements → No `::before`/`::after` on component classes
- [ ] Hover states work (transition timing matches)
- [ ] Focus states work (keyboard navigation)
- [ ] Dark mode colors correct
- [ ] RTL layout works (if applicable)
- [ ] Print preview shows all elements
- [ ] Screen reader announces correctly (axe-core)
