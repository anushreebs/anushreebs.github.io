# Baseline and Structure Implementation Plan

**Goal:** Establish a verified baseline and separate page composition, project showcases, and the review simulation without redesigning or changing behavior.

**Architecture:** Keep the current React/Vite application. Move existing component bodies into focused modules, sharing only existing primitives and hash navigation. Preserve DOM structure, copy, CSS, effects, and reducer behavior.

**Tech stack:** React, strict TypeScript, Vite, Node test runner.

**Spec:** User-approved Phase 1 in this session: baseline and structure only; no visual redesign, system-wide installations, or machine-setting changes. Phase 2 requires separate approval.

## Constraints and decisions

- Execute locally in the existing clean workspace; no dependency changes, commit, push, or deployment.
- Missing tools were caused by sandbox visibility: installed tools work outside it. Use approved elevated commands rather than modify the machine.
- This is a behavior-preserving extraction, verified against the original source and rendered HTML rather than new implementation-mirroring tests.
- Keep project content in its existing JSX during this phase; a new content schema is unnecessary for this extraction.

## Tasks

- [x] Diagnose environment; record versions, clean Git status, test and build baseline.
- [x] Save temporary original source and server-rendered HTML for comparison.
- [x] Extract existing Arrow and ConceptChips into src/PortfolioPrimitives.tsx.
- [x] Extract revealHashTarget into src/hashNavigation.ts without changing behavior.
- [x] Extract project components into src/ProjectShowcases.tsx, exporting ProductPreview and the three case components.
- [x] Extract WorkflowExample and InterfaceStudy into src/InterfaceStudy.tsx; preserve the reducer and its interface.
- [x] Keep src/App.tsx responsible for page composition, navigation, and contact behavior.
- [x] Add the existing test suite to CI before the build (workflow edited; remote CI not run).
- [x] Verify exact component-body preservation, identical server-rendered HTML, unchanged CSS/content/reducer/assets, all tests, production build, and git diff --check.
- [x] Record results and stop before Phase 2.

## Review focus

Preserve hash navigation into nested disclosures, menu Escape/focus behavior, reduced-motion effects, review validation/undo/reset, and all prototype/AI limitations. Server-rendered equality does not exercise browser effects; exact source-body comparison supplements it, and browser testing remains necessary for the later visual phases.

## Baseline

- Git HEAD: d5971a7; working tree clean before work.
- Node v24.21.0; npm 11.19.0; Git 2.46.2.
- npm test: 11 passed, 0 failed.
- npm run build: passed (TypeScript and Vite).
- Production assets: CSS 67.54 kB (12.66 kB gzip); JS 276.95 kB (82.85 kB gzip).
- No tools installed or machine settings changed.

## Completion results

- npm test: 11 passed, 0 failed after extraction.
- npm run build: TypeScript and Vite passed after extraction.
- All 16 original function bodies match exactly, excluding the export keyword added to module interfaces.
- Vite SSR plus React renderToStaticMarkup: 49,121 bytes of rendered HTML match the original exactly.
- git diff --exit-code for stylesheets, content, reducer, evidence components, entry point, public assets, metadata, dependency manifests, and tests: passed.
- git diff --check: passed.
- Production assets after extraction: CSS 67.54 kB (12.66 kB gzip); JS 276.94 kB (82.81 kB gzip).
- A first temporary comparison script assumed TypeScript exposed ScriptTarget.Latest; that script failed. Replaced it with direct source comparison, which passed. Application tests/builds did not fail.
- No browser interaction or visual regression run; identical markup and function bodies establish the scope of preservation, not a full browser audit.
- GitHub Actions remains configured for Node 22; local checks used installed Node 24. Remote CI was not triggered.
- Next: with approval, implement the visual foundation (tokens, typography, header, hero, and immediate professional credibility). No Phase 2 changes made.
