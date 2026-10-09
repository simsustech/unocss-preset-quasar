// Legacy entrypoint retained for compatibility with prior handoff notes.
// Root matchers are not safely generatable: paint semantics vary by component
// and state. Use this explicit check plus the emitted-sheet contract tests.
import './check-unstyled-roots.mjs'
