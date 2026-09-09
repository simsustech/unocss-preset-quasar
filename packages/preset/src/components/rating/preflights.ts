import type { Preflight } from '@unocss/core'

export const ratingPreflights: Preflight[] = [
  {
    getCSS: () => `.q-rating {
  color: #ffeb3b;
  vertical-align: middle;
}
.q-rating__icon-container {
  height: 1em;
  outline: 0;
}
.q-rating__icon-container + .q-rating__icon-container {
  margin-left: 2px;
}
.q-rating__icon {
  color: currentColor;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  position: relative;
  opacity: 0.4;
  transition: transform 0.2s ease-in, opacity 0.2s ease-in, color 0.2s ease-in;
}
.q-rating__icon--hovered {
  transform: scale(1.3);
}
.q-rating__icon--active {
  opacity: 1;
}
.q-rating__icon--exselected {
  opacity: 0.7;
}
.q-rating--no-dimming .q-rating__icon {
  opacity: 1;
}
.q-rating--editable .q-rating__icon-container {
  cursor: pointer;
}
`
  }
]
