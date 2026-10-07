---
'unocss-preset-quasar': patch
---

Float the label for native types (color, date, datetime-local, month, time,
week, autofill — and file, which Quasar's own list omits) from the label side
(`.q-field__label:has(+ …)`), the quasar.prod.css form. The previous
native-side adjacency (`native + label`) could never match: Quasar renders the
label before the control, so date/time/file labels stayed unfloated in the
harness captures.
