# Phase 4B Hiring-Impact Refinement Implementation Plan

> Execute inline using superpowers:executing-plans, test-driven-development, and verification-before-completion. The user explicitly approved implementation, the information architecture, and the final visual-approval boundary; do not insert new design gates or commits.

**Goal:** Put real professional credibility early in an evidence-led portfolio while preserving the approved hero and case-study interactions.
**Architecture:** Keep the client-only React application and existing reducer. Add one compact project-index component, render Experience before the existing case studies, and place the existing Interface Study inside a native optional disclosure. Add presentation-level focus recovery only.
**Tech stack:** Existing React, strict TypeScript, CSS, Vite, Node/Chrome tests; no dependencies.
**Spec:** User’s Phase 4B request supplied in this conversation, following the Phase 4A audit in chat (no repository audit file found).

## Constraints and rulings
- Work in the named existing repository; preserve the dirty tree and untracked implementation. No branch switch, worktree replacement, commit, push, deployment, dependency or workflow changes.
- Branch `main`, HEAD `3224214658b841ff0baff6f269c70100f220e4bf`; initial Git status and byte-for-byte source/test/doc snapshots recorded outside the repository in this chat’s `work/phase4b-baseline`.
- User-supplied execution scope overrides additional skill approval/worktree/commit steps. This is a bounded presentation refinement, not an architecture rewrite.
- Keep #work as the selected-work destination (now the compact preview), #experience and all project/evidence anchors. Optional exercise must open for direct #interface-study and descendant deep links.
- Preserve titles/dates. Employment refinements may reorganize current content.ts facts and existing toolkit verification facts; no added ownership, metrics, or outcomes.
- Preserve evidence components and reducer bytes. No SEO, social preview, CSS consolidation, final polish, or deployment.

## Review focus
- Closed optional content must stay out of keyboard navigation and open on deep links.
- Disabled decision buttons must hand focus to Undo; validation must focus the invalid field; undo/reset return focus predictably.
- 320px labels and long project names must wrap without clipping; new controls >=44px.
- Preview links must reach the correct distinct project, with visible keyboard focus.
- Regenerated legacy screenshots must not overwrite unrelated prior review evidence; restore baseline copies after verification and retain new Phase 4B captures.

## Task 1 — Baseline and regression
- [x] Record Git/source baseline, run unit/type/build/browser checks; diagnose runner failures before claiming pass.
- [x] Add standalone keyboard regression to tests/phase4b.browser.mjs and existing browser runner. Exercise real focus+Enter, approval/rejection to Undo, undo/reset, invalid date/reason and editing. Watch the decision-focus assertion fail before implementation.

## Task 2 — Reading order and professional evidence
Files: src/App.tsx, src/SelectedWorkPreview.tsx (new), src/content.ts, src/phase4b.css (new).
- [x] Add browser assertions for hero → #work → #experience → #case-studies; three preview links and optional closed exercise. Observe expected missing-order failure.
- [x] Render a compact editorial three-row index with sage/blue/rose rules, problem, contribution, one decision and direct anchor links.
- [x] Move Experience immediately after index; retain titles/dates and present contribution plus supported engineering/testing context. Keep unknown constraints/outcomes out of copy and list them in review.
- [x] Keep hero unchanged; number Experience 03, detailed studies 04. Scope compact experience styles and case-study spacing to Phase 4B.

## Task 3 — Copy, optional exercise and focus
Files: src/InterfaceStudy.tsx, src/ResearchFlowCase.tsx, src/CollaboratorCase.tsx, src/BloomCase.tsx, src/phase4b.css.
- [x] Consolidate repeated qualifications in showcase summaries without editing preserved evidence or interactive behavior. Keep contextual synthetic/simulation labels and concise evidence limits.
- [x] Keep Bloom primary; wrap original exercise in native details with summary and stable #interface-study inside. Preserve independent mounted reducer instances.
- [x] Add field/approval/undo refs and focus effects to standalone view. Undo and reset return to Approve; edits retain focus; invalid approval focuses the relevant field. Reducer unchanged.
- [x] Recheck ResearchFlow demo with bounded observation. Keep its URLs and add reliable local #rf-architecture evidence fallback; describe cold-start observation accurately.

## Task 4 — Verification and review delivery
Files: tests/phase4b.browser.mjs, tests/browser-foundation.smoke.mjs, docs/visual-review/phase-4b-review.md, docs/CODEX_HANDOFF.md.
- [x] Extend browser checks for requested widths, order, anchors, keyboard/focus, reduced motion, actual contrast, and six requested screenshots. Preserve all existing suites.
- [x] Run npm test, npx tsc --project tsconfig.app.json --noEmit, npm run build, npm run test:browser, git diff --check, git status --short.
- [x] Inspect actual six captures; repair only Phase 4B issues and rerun relevant checks.
- [x] Record exact changed files, factual sources, red/green evidence, demo results, limitations, Git baseline/final state and screenshot paths. Append handoff update without discarding history.
- [x] Verify reducer, evidence, hero, workflow, metadata, and lockfile unchanged. Stop for visual approval; no next phase.

## Execution ledger

- Baseline matched handoff/source map. Preserved the dirty tree; no repository audit file existed, so Phase 4A findings were taken from the conversation.
- Browser launch diagnosis: default Chrome aborts in macOS application registration; ordinary multiprocess headless shell is denied Mach rendezvous registration. Existing installed headless shell works in explicit single-process mode. No installation or machine setting changes.
- RED: new standalone keyboard test on saved pre-task source failed at approval-to-Undo focus. GREEN: full suite passes after presentation-only refs/effects.
- Review: independent reviewer identified base CSS overriding intended spacing. RED 72px vs 40px at 320; GREEN after loading Phase 4B CSS after foundation. No other actionable review findings.
- Ruling: native closed details may retain descendant geometry. Verify exclusion by real Tab from summary rather than getClientRects(), which is not a tab-order oracle.
- All prescribed checks passed; six final screenshots visually reviewed. Original evidence/reducer/hero/deployment/dependency files byte-preserved. Legacy generated review artifacts restored from exact pre-task snapshots.
- No commits/pushes/deployment. Phase 4B ends at pending visual approval.
