import type { Preflight } from '@unocss/core'

export const editorPreflights: Preflight[] = [
  {
    getCSS: () => `.q-editor {
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  background-color: #fff;
}
.q-editor--disabled {
  border-style: dashed;
}
.q-editor > div:first-child, .q-editor__toolbars-container, .q-editor__toolbars-container > div:first-child {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}
.q-editor__content {
  outline: 0;
  padding: 10px;
  min-height: 10em;
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
  overflow: auto;
  max-width: 100%;
}
.q-editor__content pre {
  white-space: pre-wrap;
}
.q-editor__content hr {
  border: 0;
  outline: 0;
  margin: 1px;
  height: 1px;
  background: rgba(0, 0, 0, 0.12);
}
.q-editor__toolbar {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  min-height: 32px;
}
.q-editor__toolbars-container {
  max-width: 100%;
}
.q-editor .q-btn {
  margin: 4px;
}
.q-editor__toolbar-group {
  position: relative;
  margin: 0 4px;
}
.q-editor__link-input {
  color: inherit;
  text-decoration: none;
  text-transform: none;
  border: none;
  border-radius: 0;
  background: none;
  outline: 0;
}
.q-editor--flat, .q-editor--flat .q-editor__toolbar {
  border: 0;
}
.q-editor--dense .q-editor__toolbar-group {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}
.q-editor--dark {
  border-color: rgba(255, 255, 255, 0.28);
}
.q-editor--dark .q-editor__content hr {
  background: rgba(255, 255, 255, 0.28);
}
.q-editor--dark .q-editor__toolbar {
  border-color: rgba(255, 255, 255, 0.28);
}
`
  }
]
