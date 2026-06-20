## Auto-generated signatures

<!-- Updated by gen-context.js -->

You are a coding assistant with complete knowledge of this codebase.
The following code signatures were extracted by SigMap v7.24.1 on 2026-06-19T16:51:02.864Z.

<!-- sigmap: version=7.24.1 -->

These signatures represent every public function, class, and type in the project.
Refer to them when answering questions about code structure, APIs, and implementation.

## Code Signatures

## SigMap commands

| When                                   | Command                          |
| -------------------------------------- | -------------------------------- |
| Before answering a question about code | `sigmap ask "<your question>"`   |
| To rank files by topic                 | `sigmap --query "<topic>"`       |
| After changing config or source dirs   | `sigmap validate`                |
| To verify an AI answer is grounded     | `sigmap judge --response <file>` |

Always run `sigmap ask` (or `sigmap --query`) before searching for files relevant to a task.

## deps

```
packages/preset/src/index.ts ← theme, styles/_scope, styles/index, core/index
packages/preset/src/styles/_helpers.ts ← theme
packages/preset/src/styles/_scope.ts ← theme, index
packages/preset/src/styles/index.ts ← theme, md2/index, md3/index, unstyled/index
```

## changes (last 5 commits — 2 days ago)

```
packages/preset/src/styles/_helpers.ts        +if  +string  +preserves  +strings
packages/preset/src/styles/_scope.ts          +splitTopLevelCommas  +wrapPreWithBodyClass  +wrapBlock  +guard
```

## packages

### packages/preset/src/index.ts

```
export interface QuasarPresetOptions  :28-34
export function splitCode(code) → string[]  :1779-1781
```

### packages/preset/src/styles/\_helpers.ts

```
export const qe = (strings, ...values) =>  :21-30
export const componentCtxClass = (name, fallback) =>  :72-80
```

### packages/preset/src/styles/\_scope.ts

```
export function wrapPreWithBodyClass(css, bodyClass) → string  :52-99
export function scopeStyle(style, bodyClass) → QuasarStyle  :248-285
```

### packages/preset/src/styles/index.ts

```
export interface QuasarStyle  :16-36
```

### packages/preset/src/theme.ts

```
export interface QuasarTheme  :53-243
```
